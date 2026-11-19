"use server";

// ============================================================
//  subscribeEmail — server action for all email-capture CTAs
// ============================================================
//  Validates email, checks honeypot, upserts into `subscribers`
//  (on conflict email do nothing / merge tags), fires a Resend
//  welcome email (best-effort, never blocks the signup).
//
//  Gracefully degrades when the `subscribers` table doesn't exist
//  yet (migration not applied) — returns success so users never see
//  a 500.
// ============================================================

import {
  FREE_GUIDE_PDF_URL,
  FREE_GUIDE_SOURCES,
  GOAL_TRACKER_HTML_URL,
  GOAL_TRACKER_SOURCES,
  SCIENCE_DROP_SOURCE_PREFIX,
} from "./subscribe-constants";

// ---------- types ------------------------------------------

export type SubscribeResult =
  | { status: "ok" }
  | { status: "already_subscribed" }
  | { status: "invalid_email"; message: string }
  | { status: "honeypot" }
  | { status: "error"; message: string };

export type SubscribeInput = {
  email: string;
  name?: string;
  phone?: string;
  smsConsent?: boolean;
  source: string;
  // honeypot — hidden field, must be empty
  website?: string;
  // UTM + GA4 attribution passed from the client via hidden fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gaClientId?: string;
};

// ---------- Supabase helpers (mirrors app/apply/application.ts) --

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function getSupabaseConfig(
  env: Record<string, string | undefined> = process.env,
) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return { url: normalizeSupabaseUrl(url), key };
}

// ---------- validation ---------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

// Sanitize gaClientId: allow only GA4 format (digits.digits)
function cleanGaClientId(raw: string | undefined): string | null {
  const s = (raw ?? "").trim();
  return s && /^\d+\.\d+$/.test(s) ? s : null;
}

function cleanStr(s: string | undefined, max = 160): string {
  return (s ?? "").trim().slice(0, max);
}

function cleanPhone(raw: string | undefined): string | null {
  const phone = (raw ?? "").trim();
  if (!phone) return null;
  return /^[+()\d\s.-]{7,24}$/.test(phone) ? phone : null;
}

// ---------- Supabase upsert ----------------------------------

type UpsertResult =
  | { stored: true; alreadySubscribed: boolean }
  | { stored: false; reason: "missing_env" | "table_missing" | "request_failed" };

async function upsertSubscriber(input: {
  email: string;
  name: string | null;
  phone: string | null;
  smsConsent: boolean;
  source: string;
  tags: string[];
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  gaClientId: string | null;
  includePhoneFields?: boolean;
}): Promise<UpsertResult> {
  const config = getSupabaseConfig();
  if (!config) {
    console.warn(
      "subscribe.store: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY unset — skipping durable capture",
    );
    return { stored: false, reason: "missing_env" };
  }

  const payload = {
    email: input.email,
    name: input.name,
    source: input.source,
    tags: input.tags,
    utm_source: input.utmSource,
    utm_medium: input.utmMedium,
    utm_campaign: input.utmCampaign,
    ga_client_id: input.gaClientId,
    consented: true,
    ...(input.includePhoneFields === false || !input.phone
      ? {}
      : {
          phone: input.phone,
          sms_consented_at:
            input.phone && input.smsConsent ? new Date().toISOString() : null,
        }),
  };

  try {
    // POST with upsert: on conflict (email) do nothing so we don't
    // overwrite existing rows. The Prefer header merges the response.
    const res = await fetch(
      `${config.url}/rest/v1/subscribers?on_conflict=email`,
      {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        // Return the row so we can tell whether it was inserted or
        // was already there (http 201 = new, http 200 = existing).
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
      },
    );

    if (res.status === 200 || res.status === 201) {
      const body = await res.json().catch(() => []);
      // PostgREST can return either 200 or 201 for an ignored conflict. The
      // representation is the reliable distinction: a new row is returned,
      // while an ignored duplicate produces an empty array.
      const alreadySubscribed = Array.isArray(body) && body.length === 0;

      // A returning email subscriber may be adding SMS permission for the first
      // time. The duplicate-safe insert above deliberately preserves their
      // existing profile, so update only the newly consented phone fields.
      if (alreadySubscribed && input.phone && input.smsConsent) {
        const update = await fetch(
          `${config.url}/rest/v1/subscribers?email=eq.${encodeURIComponent(input.email)}`,
          {
            method: "PATCH",
            headers: {
              apikey: config.key,
              Authorization: `Bearer ${config.key}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              phone: input.phone,
              sms_consented_at: new Date().toISOString(),
            }),
          },
        );

        if (!update.ok) {
          const updateBody = await update.text().catch(() => "");
          console.error(
            `subscribe.store: phone consent update ${update.status} — ${updateBody.slice(0, 240)}`,
          );
          return { stored: false, reason: "request_failed" };
        }
      }

      return { stored: true, alreadySubscribed };
    }

    // 404 or PostgREST PGRST204 typically means table doesn't exist yet
    if (res.status === 404) {
      const body = await res.text().catch(() => "");
      console.warn(
        `subscribe.store: subscribers table not found (migration pending) — ${body.slice(0, 120)}`,
      );
      return { stored: false, reason: "table_missing" };
    }

    const body = await res.text().catch(() => "");
    console.error(
      `subscribe.store: supabase ${res.status} — ${body.slice(0, 240)}`,
    );
    return { stored: false, reason: "request_failed" };
  } catch (err) {
    console.error("subscribe.store: fetch failed", err);
    return { stored: false, reason: "request_failed" };
  }
}

// ---------- Resend welcome email ----------------------------

function buildFreeGuideHtml(greeting: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6">
      <p>${greeting},</p>
      <p>Here it is — <strong>The 5-Day Reset</strong>, a simple 5-day plan to restart
         training and nutrition without making it complicated.</p>
      <p style="margin:20px 0">
        <a href="${FREE_GUIDE_PDF_URL}"
           style="display:inline-block;background:#841717;color:#f5f1eb;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px">
          Download The 5-Day Reset &#x2192;
        </a>
      </p>
      <p>What&apos;s inside:</p>
      <ul style="padding-left:20px;margin:8px 0">
        <li>Day-by-day plan: movement, protein target, sleep, one habit</li>
        <li>Kris&apos;s recomposition framework (same as 1:1 clients)</li>
        <li>Five principles worth keeping for the long haul</li>
        <li>What to do after Day 5</li>
      </ul>
      <p style="margin-top:16px">Run it. If you want structure after the 5 days,
         the <a href="https://gainsfromgeebs.com/memberships/science-based-community">$24.99 science-based community</a>
         is the next step — or <a href="https://gainsfromgeebs.com/apply">apply for 1:1 coaching</a>
         if you want Kris in your corner every week.</p>
      <p>&#x2014; Kris</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
      <p style="font-size:12px;color:#6b7280">
        You&apos;re receiving this because you requested the free guide at gainsfromgeebs.com.
        Reply to unsubscribe anytime.
      </p>
    </div>
  `;
}

function buildNewsletterHtml(greeting: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6">
      <p>${greeting},</p>
      <p>You&apos;re in. Every week Kris shares one actionable insight on training,
         recomposition, and building the body you actually want &mdash; without the
         noise.</p>
      <p>In the meantime, here are three guides worth bookmarking:</p>
      <ul>
        <li><a href="https://gainsfromgeebs.com/blog/body-recomposition-for-men">Body recomposition for men</a></li>
        <li><a href="https://gainsfromgeebs.com/blog/how-to-fix-skinny-fat">How to fix skinny fat</a></li>
        <li><a href="https://gainsfromgeebs.com/tools/tdee-calculator">Free TDEE calculator</a></li>
      </ul>
      <p>If you want a program built for your actual week, <a href="https://gainsfromgeebs.com/apply">apply for 1:1 coaching</a>.</p>
      <p>&#x2014; Kris</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
      <p style="font-size:12px;color:#6b7280">
        You&apos;re receiving this because you signed up at gainsfromgeebs.com.
        Reply to unsubscribe anytime.
      </p>
    </div>
  `;
}

function buildScienceDropHtml(greeting: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6">
      <p>${greeting},</p>
      <p>You&apos;re in for the <strong>Weekly Science Drop</strong>: one useful peer-reviewed finding from Kris, translated into a training, nutrition, sleep, or recovery action you can actually use.</p>
      <p>Start with the live source hub:</p>
      <ul>
        <li><a href="https://gainsfromgeebs.com/science">Peer-reviewed fitness science library</a></li>
        <li><a href="https://gainsfromgeebs.com/science/protein-body-composition-studies">Protein and body-composition studies</a></li>
        <li><a href="https://gainsfromgeebs.com/science/sleep-and-fat-loss-studies">Sleep and fat-loss studies</a></li>
        <li><a href="https://gainsfromgeebs.com/science/cardio-longevity-studies">Cardio and longevity studies</a></li>
      </ul>
      <p>The rule: research is useful only when it changes the next behavior. If you want that turned into a plan, <a href="https://gainsfromgeebs.com/apply">apply for 1:1 coaching</a>.</p>
      <p>&#x2014; Kris</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
      <p style="font-size:12px;color:#6b7280">
        You&apos;re receiving this because you requested the Weekly Science Drop at gainsfromgeebs.com.
        Reply to unsubscribe anytime.
      </p>
    </div>
  `;
}

function buildGoalTrackerHtml(greeting: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6">
      <p>${greeting},</p>
      <p>Here it is — <strong>The Geebs Goal Weight Forecast</strong>, a browser-based ETA, calorie, and macro tool you can save to your computer and use offline.</p>
      <p style="margin:20px 0">
        <a href="${GOAL_TRACKER_HTML_URL}"
           style="display:inline-block;background:#841717;color:#f5f1eb;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px">
          Open the goal forecast &#x2192;
        </a>
      </p>
      <p>What it does:</p>
      <ul style="padding-left:20px;margin:8px 0">
        <li>Estimates how long your goal weight may take</li>
        <li>Calculates calories, macros, and a simple grocery-list structure</li>
        <li>Shows when to hold calories versus adjust after a stalled trend</li>
        <li>Audits protein, workouts, steps, sleep, recovery, and the biggest blocker behind that ETA</li>
        <li>Generates an anonymous goal-weight ETA check-in you can paste into Reddit for feedback</li>
        <li>Saves locally, with export/import backup if needed</li>
      </ul>
      <p style="margin-top:16px">Use it for a week. If the same blocker keeps stretching the ETA, <a href="https://gainsfromgeebs.com/apply">apply for 1:1 coaching</a> and Kris can build the plan around your actual week.</p>
      <p>&#x2014; Kris</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
      <p style="font-size:12px;color:#6b7280">
        You&apos;re receiving this because you requested the free goal-weight forecast at gainsfromgeebs.com.
        Reply to unsubscribe anytime.
      </p>
    </div>
  `;
}

async function sendWelcomeEmail(email: string, name: string | null, source: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  // `||` not `??` — see app/apply/notify.ts: an env var set to an empty string is a
  // real state, and `??` keeps it, which then fails the falsy guard below.
  const from = process.env.SUBSCRIBE_EMAIL_FROM || process.env.APPLY_NOTIFY_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("subscribe.resend: RESEND_API_KEY or SUBSCRIBE_EMAIL_FROM unset — skipping welcome email");
    return;
  }

  const firstName = name ? name.split(/\s+/)[0] : null;
  const greeting = firstName ? `Hey ${firstName}` : "Hey";

  const isFreeGuide = FREE_GUIDE_SOURCES.has(source) || source.startsWith("week-plan-reset:");
  const isGoalTracker = GOAL_TRACKER_SOURCES.has(source);
  const isScienceDrop = source === SCIENCE_DROP_SOURCE_PREFIX || source.startsWith(`${SCIENCE_DROP_SOURCE_PREFIX}:`);
  const subject = isFreeGuide
    ? "Your 5-Day Reset is ready to download"
    : isGoalTracker
      ? "Your Geebs Goal Weight Forecast is ready"
      : isScienceDrop
        ? "You're in — Weekly Science Drop from Geebs"
        : "You're in — weekly training insights from Kris";
  const html = isFreeGuide
    ? buildFreeGuideHtml(greeting)
    : isGoalTracker
      ? buildGoalTrackerHtml(greeting)
      : isScienceDrop
        ? buildScienceDropHtml(greeting)
        : buildNewsletterHtml(greeting);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `subscribe.resend: ${res.status} — ${body.slice(0, 200)}`,
      );
    }
  } catch (err) {
    console.error("subscribe.resend: send failed (non-blocking)", err);
  }
}

// ---------- main action -------------------------------------

export async function subscribeEmail(input: SubscribeInput): Promise<SubscribeResult> {
  // Honeypot: bots fill the hidden 'website' field; humans never see it.
  if (input.website) {
    console.warn("subscribe.honeypot: tripped");
    // Silently succeed from the bot's perspective.
    return { status: "honeypot" };
  }

  const email = (input.email ?? "").trim().toLowerCase();
  if (!email || !validateEmail(email)) {
    return { status: "invalid_email", message: "Enter a valid email address." };
  }

  const name = cleanStr(input.name) || null;
  const phone = cleanPhone(input.phone);
  if (input.phone?.trim() && !phone) {
    return { status: "error", message: "Enter a valid phone number." };
  }
  if (phone && !input.smsConsent) {
    return { status: "error", message: "Confirm text-message consent or leave phone blank." };
  }
  const source = cleanStr(input.source) || "unknown";
  const utmSource = cleanStr(input.utmSource) || null;
  const utmMedium = cleanStr(input.utmMedium) || null;
  const utmCampaign = cleanStr(input.utmCampaign) || null;
  const gaClientId = cleanGaClientId(input.gaClientId);

  // Build tags from source (additive)
  const tags: string[] = [source];

  let result = await upsertSubscriber({
    email,
    name,
    phone,
    smsConsent: Boolean(input.smsConsent),
    source,
    tags,
    utmSource,
    utmMedium,
    utmCampaign,
    gaClientId,
  });

  // A code deploy can briefly precede the additive phone migration. Preserve
  // the email, but never tell the visitor their phone was captured when the
  // live table cannot store it yet.
  if (phone && !result.stored) {
    result = await upsertSubscriber({
      email,
      name,
      phone: null,
      smsConsent: false,
      source,
      tags,
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      includePhoneFields: false,
    });
    return {
      status: "error",
      message: result.stored
        ? "Your email was saved, but phone updates are temporarily unavailable. Please try the phone field again later."
        : "We could not save your details yet. Please try again in a moment.",
    };
  }

  if (result.stored && result.alreadySubscribed) {
    return { status: "already_subscribed" };
  }

  // Fire welcome email best-effort. Even if Supabase is down, still try.
  if (result.stored) {
    void sendWelcomeEmail(email, name, source);
  } else if (result.reason === "table_missing") {
    // Table not migrated yet. Log and return success anyway — never block.
    console.warn("subscribe: subscribers table not yet created; returning ok to user");
    void sendWelcomeEmail(email, name, source);
    return { status: "ok" };
  } else if (result.reason === "missing_env") {
    // No Supabase configured. Still send welcome and return ok.
    void sendWelcomeEmail(email, name, source);
    return { status: "ok" };
  } else {
    // Supabase error. Best-effort: still return ok to user (don't surface DB errors).
    console.error("subscribe: Supabase write failed; returning ok to user anyway");
    void sendWelcomeEmail(email, name, source);
    return { status: "ok" };
  }

  return { status: "ok" };
}

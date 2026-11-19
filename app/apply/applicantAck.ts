// The acknowledgement the APPLICANT receives.
//
// Until now, a finished application told Kris (Telegram, and an email since the
// notify-from fix) and told the applicant nothing at all. They saw a thank-you
// screen, closed the tab, and held no record that anything had happened — no
// receipt, no address to reply to, nothing to show a partner who asks "did you
// actually send it?". Measured 2026-09-25 against production: 26 real people
// have submitted this form and not one of them was ever emailed by it.
//
// Same invariant as every other channel in this directory: the row is committed
// and the redirect computed before this runs, and every failure path returns a
// status instead of throwing. A mail outage costs a courtesy, never an
// application. It is deliberately NOT part of the "was anybody told" aggregate
// in notify.ts — that check is about KRIS being told, which is the state that
// loses money, and folding a courtesy email into it would let a working
// applicant ack mask a dead owner channel.
//
// WHAT IT DOES NOT SAY. No date, no response time, and no promise that everyone
// gets a reply — none of those are things this repo can keep. A date mailed to
// an applicant is a promise. It names only what the flow actually did with
// them, which is why there are two variants and not one: someone routed to the
// calendar and someone routed to the lighter plans were told different things
// on screen, and an email that contradicts the screen is worse than silence.

import type { SubmissionLead } from "./application";

export type ApplicantAckStatus = "sent" | "skipped" | "failed";

const SITE_URL = "https://gainsfromgeebs.com";
const REPLY_TO = "kris@titanforgefit.com";

function firstNameOf(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? "";
  return first.length > 0 && first.length <= 40 ? first : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The one sentence that differs, and the only branch in this file. */
function nextStepSentence(disqualified: boolean): string {
  return disqualified
    ? `Based on what you told me, 1:1 coaching isn't the right starting point right now, so I've pointed you at the options that are: ${SITE_URL}/packages`
    : "If it's a fit, you'll hear from me with a calendar link so we can talk it through.";
}

export function buildApplicantAckText(
  lead: SubmissionLead,
  disqualified: boolean,
): string {
  const first = firstNameOf(lead.name);
  return [
    first ? `Hey ${first},` : "Hey,",
    "",
    "Your application is in. I read every one of these myself.",
    "",
    nextStepSentence(disqualified),
    "",
    "Nothing else is needed from you right now. If anything changes, or you got something wrong in the form, just reply to this email.",
    "",
    "— Kris",
    "Geebs Coaching",
    "",
    `You're receiving this because you applied at ${SITE_URL}/apply.`,
  ].join("\n");
}

export function buildApplicantAckHtml(
  lead: SubmissionLead,
  disqualified: boolean,
): string {
  const first = firstNameOf(lead.name);
  const greeting = first ? `Hey ${escapeHtml(first)},` : "Hey,";
  const next = disqualified
    ? `Based on what you told me, 1:1 coaching isn't the right starting point right now, so I've pointed you at the options that are: <a href="${SITE_URL}/packages" style="color:#b3121b;">the plans that fit</a>.`
    : "If it's a fit, you'll hear from me with a calendar link so we can talk it through.";

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#1b1b1b;max-width:520px;">
      <p>${greeting}</p>
      <p>Your application is in. I read every one of these myself.</p>
      <p>${next}</p>
      <p>Nothing else is needed from you right now. If anything changes, or you got something wrong in the form, just reply to this email.</p>
      <p>— Kris<br />Geebs Coaching</p>
      <p style="font-size:13px;color:#6b6b6b;margin-top:28px;">
        You're receiving this because you applied at
        <a href="${SITE_URL}/apply" style="color:#6b6b6b;">${SITE_URL.replace("https://", "")}/apply</a>.
      </p>
    </div>
  `;
}

/**
 * Send it. Never throws.
 *
 * The sender resolution mirrors sendEmailNotification in ./notify.ts on purpose:
 * `||` and not `??`, because an env var set to an empty string is a real state
 * that nullish coalescing keeps and the falsy guard then rejects — the exact bug
 * that left the owner email unset in production for months.
 */
export async function sendApplicantAck(
  lead: SubmissionLead,
  disqualified: boolean,
): Promise<ApplicantAckStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.APPLY_NOTIFY_EMAIL_FROM || process.env.SUBSCRIBE_EMAIL_FROM;
  const to = lead.email?.trim();

  if (!apiKey || !from || !to) {
    return "skipped";
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: REPLY_TO,
        subject: "Got your application — Kris",
        text: buildApplicantAckText(lead, disqualified),
        html: buildApplicantAckHtml(lead, disqualified),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `apply.ack: resend ${res.status} — ${body.slice(0, 200)}`,
      );
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("apply.ack: send failed", err);
    return "failed";
  }
}

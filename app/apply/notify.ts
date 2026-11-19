// Notifications for /apply submissions.
// Env-gated: missing notification channels log and return, so a
// misconfigured deploy never breaks the form submission itself.

import {
  isLowerCostFirstLead,
  selectedPackageForLead,
  type SubmissionLead,
} from "./application";
import {
  PACKAGE_SELECTED_INVESTMENT,
  packageIntentLabel,
} from "@/lib/packageIntent";
import { bandLabel, pitchLines } from "@/lib/investmentBands";
import { sendApplicantAck, type ApplicantAckStatus } from "./applicantAck";

type NotifyContext = {
  applicationId: string;
  applicationStored: boolean;
  applicationStoreReason?: string;
};

type NotifyChannelStatus = "sent" | "skipped" | "failed";

export type NotifySubmissionResult = {
  telegram: NotifyChannelStatus;
  email: NotifyChannelStatus;
  /**
   * The applicant's own acknowledgement. Reported separately from the two owner
   * channels above and deliberately NOT counted in the "was anybody told" check
   * below: that check exists to catch a lead nobody can act on, and a courtesy
   * email to the applicant must never be able to satisfy it.
   */
  applicant: ApplicantAckStatus;
};

const LABEL_MAP: Record<string, Record<string, string>> = {
  goal: {
    fat_loss: "Fat loss",
    muscle_gain: "Muscle gain",
    mobility: "Mobility",
    performance: "Performance",
    confidence: "Confidence",
  },
  consistency: {
    never: "Barely / never",
    occasional: "Occasionally",
    mostly: "Mostly consistent",
    always: "Dialed in already",
  },
  ready_to_commit: {
    yes: "Ready if it fits",
    talk_it_through: "Need to talk it through",
    no: "Not ready yet",
  },
};

function pretty(key: keyof typeof LABEL_MAP, value: string): string {
  return LABEL_MAP[key]?.[value] ?? value;
}

/**
 * The band, and what Kris can sell against it.
 *
 * He closes on the call, so the notification carries the plans and their
 * prepay terms rather than making him look them up mid-conversation. Package
 * pickers are the one case with no band to read: the card they tapped is the
 * answer.
 */
function investmentLine(lead: SubmissionLead): string {
  return lead.monthly_investment === PACKAGE_SELECTED_INVESTMENT
    ? "Picked a package on the site"
    : bandLabel(lead.monthly_investment);
}

function pitchBlock(lead: SubmissionLead): string[] {
  if (lead.monthly_investment === PACKAGE_SELECTED_INVESTMENT) return [];
  const lines = pitchLines(lead.monthly_investment);
  return lines.length ? ["", "What fits their budget:", ...lines.map((l) => `  ${l}`)] : [];
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function notificationStatus(lead: SubmissionLead, disqualified: boolean): string {
  if (lead.age_18_plus === "yes" && isLowerCostFirstLead(lead)) {
    return "LOWER-COST -> /apply/lower-cost";
  }

  return disqualified
    ? "BELOW CALL FLOOR -> /packages"
    : "QUALIFIED -> Calendly";
}

function packageLabelForLead(lead: SubmissionLead): string {
  return packageIntentLabel(selectedPackageForLead(lead));
}

function buildPlainText(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): string {
  const storageLine = context.applicationStored
    ? "Stored: yes"
    : `Stored: no (${context.applicationStoreReason ?? "unknown"})`;
  const packageLabel = packageLabelForLead(lead);

  return [
    notificationStatus(lead, disqualified),
    "gainsfromgeebs.com /apply",
    `Application ID: ${context.applicationId}`,
    storageLine,
    "",
    lead.name,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    lead.ig_handle ? `Instagram: ${lead.ig_handle}` : "",
    packageLabel ? `Package interest: ${packageLabel}` : "",
    "",
    `Goal: ${pretty("goal", lead.goal)}`,
    `Consistency (90d): ${pretty("consistency", lead.consistency)}`,
    `Willing to invest: ${investmentLine(lead)}`,
    `Ready: ${pretty("ready_to_commit", lead.ready_to_commit)}`,
    lead.context ? `Context: ${lead.context}` : "",
    ...pitchBlock(lead),
  ]
    .filter(Boolean)
    .join("\n");
}

function buildTelegramHtml(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): string {
  const status = disqualified
    ? "🟡 BELOW CALL FLOOR → /packages"
    : "🟢 QUALIFIED → Calendly";
  const outcomeStatus = lead.age_18_plus === "yes" && isLowerCostFirstLead(lead)
    ? "🟠 LOWER-COST → /apply/lower-cost"
    : status;
  const storageLine = context.applicationStored
    ? "Stored: <b>yes</b>"
    : `Stored: <b>no</b> (${escapeHtml(context.applicationStoreReason ?? "unknown")})`;
  const packageLabel = packageLabelForLead(lead);

  const lines = [
    `<b>${outcomeStatus}</b>`,
    `<b>gainsfromgeebs.com /apply</b>`,
    `<code>${escapeHtml(context.applicationId)}</code>`,
    storageLine,
    ``,
    `<b>${escapeHtml(lead.name)}</b>`,
    `📧 <code>${escapeHtml(lead.email)}</code>`,
    `📱 <code>${escapeHtml(lead.phone)}</code>`,
    lead.ig_handle ? `📷 ${escapeHtml(lead.ig_handle)}` : "",
    packageLabel ? `Package: <b>${escapeHtml(packageLabel)}</b>` : "",
    ``,
    `Goal: <b>${pretty("goal", lead.goal)}</b>`,
    `Consistency (90d): ${pretty("consistency", lead.consistency)}`,
    `Willing to invest: <b>${escapeHtml(investmentLine(lead))}</b>`,
    `Ready: ${pretty("ready_to_commit", lead.ready_to_commit)}`,
    lead.context ? `\n💬 <i>${escapeHtml(lead.context)}</i>` : "",
    ...pitchBlock(lead).map((l) => escapeHtml(l)),
  ].filter(Boolean);

  return lines.join("\n");
}

function buildEmailHtml(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): string {
  const packageLabel = packageLabelForLead(lead);
  const rows = [
    ["Application ID", context.applicationId],
    [
      "Stored",
      context.applicationStored
        ? "yes"
        : `no (${context.applicationStoreReason ?? "unknown"})`,
    ],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Instagram", lead.ig_handle || "-"],
    ["Package interest", packageLabel || "-"],
    ["Goal", pretty("goal", lead.goal)],
    ["Consistency", pretty("consistency", lead.consistency)],
    ["Investment", investmentLine(lead)],
    ["Ready", pretty("ready_to_commit", lead.ready_to_commit)],
    ["Context", lead.context || "-"],
  ];

  return `
    <h2>${escapeHtml(notificationStatus(lead, disqualified))}</h2>
    <p><strong>gainsfromgeebs.com /apply</strong></p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="font-weight:bold;border:1px solid #ddd">${escapeHtml(label)}</td>
              <td style="border:1px solid #ddd">${escapeHtml(value)}</td>
            </tr>`,
        )
        .join("")}
    </table>
    ${pitchHtml(lead)}
  `;
}

/**
 * The plans and prepay terms, as a block Kris can read on a phone while the
 * call is ringing. Empty for a package picker, whose choice is already above.
 */
function pitchHtml(lead: SubmissionLead): string {
  if (lead.monthly_investment === PACKAGE_SELECTED_INVESTMENT) return "";
  const lines = pitchLines(lead.monthly_investment);
  if (lines.length === 0) return "";
  return `
    <h3>What fits their budget</h3>
    <ul>
      ${lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}
    </ul>
  `;
}

async function sendTelegramNotification(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): Promise<NotifyChannelStatus> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_OWNER_CHAT_ID;

  if (!token || !chatId) {
    return "skipped";
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramHtml(lead, disqualified, context),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!res.ok) {
      console.error(`apply.notify: telegram request failed (${res.status})`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("apply.notify: telegram send failed", err);
    return "failed";
  }
}

async function sendEmailNotification(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): Promise<NotifyChannelStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  // Falls back to the newsletter sender, which mirrors what app/lib/subscribe.ts
  // already does in the other direction (SUBSCRIBE_EMAIL_FROM ?? APPLY_NOTIFY_EMAIL_FROM).
  //
  // WHY IT MATTERS. Resend only accepts a `from` on a verified domain, and
  // SUBSCRIBE_EMAIL_FROM is the one already verified and sending in production.
  // Requiring a second, separately-set variable is why applications sent no email
  // at all: APPLY_NOTIFY_EMAIL_FROM has never been set, so this returned "skipped"
  // on every real submission since the feature was written, and Telegram was the
  // only channel. One unset variable, silently, on the money path.
  //
  // `||`, not `??`. An env var present but EMPTY is a real state — a blank value in
  // the Vercel UI, or a stubbed "" — and `"" ?? fallback` keeps the empty string,
  // which is falsy, so the guard below skips and no email is sent. Nullish
  // coalescing only rescues null/undefined. Caught by the test for this change.
  const from =
    process.env.APPLY_NOTIFY_EMAIL_FROM || process.env.SUBSCRIBE_EMAIL_FROM;
  const to = process.env.APPLY_NOTIFY_EMAIL_TO;

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
        to: to.split(",").map((email) => email.trim()).filter(Boolean),
        subject: `${notificationStatus(lead, disqualified)} - Geebs application`,
        text: buildPlainText(lead, disqualified, context),
        html: buildEmailHtml(lead, disqualified, context),
      }),
    });

    if (!res.ok) {
      console.error(`apply.notify: resend request failed (${res.status})`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("apply.notify: resend send failed", err);
    return "failed";
  }
}

export async function notifySubmission(
  lead: SubmissionLead,
  disqualified: boolean,
  context: NotifyContext,
): Promise<NotifySubmissionResult> {
  const [telegram, email, applicant] = await Promise.all([
    sendTelegramNotification(lead, disqualified, context),
    sendEmailNotification(lead, disqualified, context),
    sendApplicantAck(lead, disqualified),
  ]);

  // Logged on its own line for the same reason the owner channels are: a state
  // that is invisible is a state nobody fixes. `skipped` here means the sender
  // env is unset, which is a configuration choice; `failed` means Resend was
  // asked to deliver and did not, and the applicant is sitting with no receipt.
  if (applicant === "failed") {
    console.error(
      "apply.ack: the applicant was NOT acknowledged for a stored application",
    );
  }

  // The bad state is not "unconfigured", it is "an application was stored and
  // nobody was told" — and until now that state produced no aggregate log at all.
  //
  // Measured in production 2026-09-23: APPLY_NOTIFY_EMAIL_FROM and
  // APPLY_NOTIFY_EMAIL_TO are not set, so sendEmailNotification returns "skipped"
  // on every submission and Telegram is the only live channel. A Telegram failure
  // logged one line inside the sender and returned "failed" to a caller that
  // discards the result, so the application sat in Supabase, correctly stored,
  // with nothing anywhere saying it had not been delivered. One channel with a
  // silent failure mode is the shape of a lost lead, and this funnel had 28 people
  // reach question one.
  //
  // The three cases are kept separate because a "skip" and a "failure" are not the
  // same event and must not share a branch. A skip is a configuration choice; a
  // failure is a channel that was asked to deliver and did not. Collapsing them is
  // what hid the original bug.
  const channels = { telegram, email };
  const delivered = Object.values(channels).some((c) => c === "sent");
  const broken = Object.entries(channels).filter(([, c]) => c === "failed");

  if (!delivered) {
    console.error(
      `apply.notify: NOBODY WAS NOTIFIED of a stored application - telegram=${telegram} email=${email}`,
    );
  } else if (broken.length > 0) {
    // Something got through, but a channel that was configured still failed. Left
    // silent in the first version of this fix, which meant the thesis above held
    // for one channel and not the other: with an email fallback configured, a
    // failing Resend send alongside a working Telegram send produced no log at
    // all. Unreachable in production only until that fallback is set.
    console.error(
      `apply.notify: delivered, but a configured channel failed - ${broken
        .map(([name]) => name)
        .join(", ")} (telegram=${telegram} email=${email})`,
    );
  } else {
    // Not an error: a single configured channel is the current production shape.
    // Logged so that "we only have one channel" stays a visible choice rather than
    // an unnoticed default. Checked in BOTH directions — the first version looked
    // only at email, so an unconfigured Telegram alongside a working email said
    // nothing, which is the same blind spot one channel over.
    const unconfigured = Object.entries(channels)
      .filter(([, c]) => c === "skipped")
      .map(([name]) => name);
    if (unconfigured.length > 0) {
      console.warn(
        `apply.notify: delivered on one channel only - not configured: ${unconfigured.join(", ")}`,
      );
    }
  }

  return { telegram, email, applicant };
}

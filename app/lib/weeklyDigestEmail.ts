// ============================================================
//  weeklyDigestEmail — the retention / bring-back machinery
// ============================================================
//  Builds the "Weekly Science Drop" bring-back email that pulls
//  people back to the site (and the /free/daily habit surface)
//  once a week — the third DAU lever after the daily-return
//  surface and content distribution.
//
//  HARD-STOP SAFETY: this module NEVER generates coaching prose.
//  It renders ONLY already-published, human-approved copy from a
//  `ScienceDigestIssue` (title / summary / coachingTheme /
//  claimGuardrail) authored through the science digest pipeline —
//  the same content already live at /science/weekly-digest. The
//  only strings this file introduces are transactional chrome
//  ("Read the full digest", "Reply to unsubscribe anytime"),
//  matching the register of the existing Resend welcome emails.
//
//  This module is PURE: no network, no "use server", no send. It
//  produces { subject, html, text }. Actually SENDING to the
//  subscriber list is a separate, GATED step — see
//  docs/weekly-digest-email.md. Nothing here calls Resend.
// ============================================================

import type { ScienceDigestIssue } from "@/data/scienceDigestIssues";

const SITE_URL = "https://gainsfromgeebs.com";
const DAILY_PATH = "/free/daily";

export type WeeklyDigestEmail = {
  /** Subject line — the issue's approved title, verbatim. */
  subject: string;
  /** Full HTML body (inline-styled, email-client safe). */
  html: string;
  /** Plain-text fallback body. */
  text: string;
};

/** Minimal HTML-escape for interpolating approved copy into markup. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Pick the most recent published digest issue.
 *
 * Issue `id` is a `YYYY-MM-DD` date string, so lexicographic max === newest.
 * Deterministic; throws (rather than returning undefined) on an empty list so
 * a misconfigured send fails loudly instead of mailing a blank digest.
 */
export function pickLatestDigestIssue(
  issues: readonly ScienceDigestIssue[],
): ScienceDigestIssue {
  if (issues.length === 0) {
    throw new Error("pickLatestDigestIssue: no published digest issues");
  }
  return issues.reduce((latest, issue) =>
    issue.id > latest.id ? issue : latest,
  );
}

/**
 * Build the bring-back email for a given (already-approved) digest issue.
 * Pure — all human-facing coaching copy comes from `issue`; the rest is
 * transactional chrome. Never mutates, never sends.
 */
export function buildWeeklyDigestEmail(
  issue: ScienceDigestIssue,
): WeeklyDigestEmail {
  const issueUrl = `${SITE_URL}${issue.path}`;
  const dailyUrl = `${SITE_URL}${DAILY_PATH}`;
  const subject = issue.title;

  const text = [
    "This week's Science Drop is live.",
    "",
    issue.title,
    issue.dateLabel,
    "",
    issue.summary,
    "",
    `The coaching move: ${issue.coachingTheme}`,
    "",
    `Honest limits: ${issue.claimGuardrail}`,
    "",
    `Read the full digest: ${issueUrl}`,
    `Want one study every day? ${dailyUrl}`,
    "",
    "— Geebs Coaching",
    "Reply to unsubscribe anytime.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#111;color:#f4efe6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#c9a24b;margin:0 0 8px;">This week's Science Drop</p>
    <h1 style="font-size:24px;line-height:1.25;margin:0 0 4px;color:#f4efe6;">${esc(issue.title)}</h1>
    <p style="font-size:13px;color:#f4efe6;opacity:0.6;margin:0 0 20px;">${esc(issue.dateLabel)}</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;color:#f4efe6;opacity:0.9;">${esc(issue.summary)}</p>
    <p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#c9a24b;margin:0 0 6px;">The coaching move</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;color:#f4efe6;opacity:0.9;">${esc(issue.coachingTheme)}</p>
    <div style="border:1px solid rgba(201,162,75,0.35);border-radius:8px;padding:16px 18px;margin:0 0 24px;">
      <p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#c9a24b;margin:0 0 6px;">Honest limits</p>
      <p style="font-size:14px;line-height:1.6;margin:0;color:#f4efe6;opacity:0.85;">${esc(issue.claimGuardrail)}</p>
    </div>
    <p style="margin:0 0 12px;">
      <a href="${esc(issueUrl)}" style="color:#f4efe6;font-size:15px;text-decoration:underline;text-underline-offset:3px;">Read the full digest &rarr;</a>
    </p>
    <p style="margin:0 0 28px;">
      <a href="${esc(dailyUrl)}" style="color:#c9a24b;font-size:15px;text-decoration:underline;text-underline-offset:3px;">Want one study every day? See today's finding &rarr;</a>
    </p>
    <hr style="border:none;border-top:1px solid rgba(244,239,230,0.15);margin:0 0 16px;" />
    <p style="font-size:12px;line-height:1.5;color:#f4efe6;opacity:0.55;margin:0;">
      &mdash; Geebs Coaching. You are getting this because you asked for the weekly finding.
      Reply to unsubscribe anytime.
    </p>
  </div>
</body>
</html>`;

  return { subject, html, text };
}

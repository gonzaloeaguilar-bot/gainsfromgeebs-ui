"use client";

// ============================================================
//  NewsletterSignup — the site-wide email ask.
//
//  It no longer renders a bare email field. Every ask on the site now leads
//  with a real coaching tip and only then asks for name, email and phone
//  together (see TipCapture). The props are unchanged so the thirteen call
//  sites keep working; `heading` and `subheading` are accepted and ignored,
//  because the invitation is now a single question in one voice.
// ============================================================

import TipCapture from "@/components/TipCapture";
import type { TipThemeId } from "@/lib/dailyTips";

type NewsletterSignupProps = {
  source: string;
  variant?: "default" | "compact";
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  showName?: boolean;
  /** When set, a successful subscribe also counts as a lead of this kind.
      Without it TipCapture fires newsletter_signup and NOTHING else, so the
      capture is invisible in the funnel -- which is how the memberships money
      page ended up with an email capture that could never register a lead. */
  leadType?: string;
};

/** Hand over a card that matches what the reader is already reading. */
function themeForSource(source: string): TipThemeId {
  const s = source.toLowerCase();
  if (/protein|macro|nutrition|calorie|diet|food|eat/.test(s)) return "nutrition";
  if (/consistency|recovery|sleep|habit|reset|stress|weekend/.test(s)) return "recovery";
  return "training";
}

export default function NewsletterSignup({
  source,
  variant = "default",
  leadType,
}: NewsletterSignupProps) {
  return (
    <TipCapture
      source={source}
      leadType={leadType}
      theme={themeForSource(source)}
      question="Want a useful coaching tip before you go?"
      compact={variant === "compact"}
    />
  );
}

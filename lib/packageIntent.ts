export const PACKAGE_INTENT_LABELS = {
  premium_1on1_video: "VIP 1:1 Coaching",
  standard_check_in: "Standard Check-In Coaching",
  weekly_review: "Weekly Review Coaching",
  nutrition_only: "Nutrition Only",
  app_community: "Science-Based Community",
  consultation_call: "One-Time Consultation Call",
  undecided_1on1: "1:1 Coaching - package TBD",
} as const;

export type PackageIntent = keyof typeof PACKAGE_INTENT_LABELS;

export function normalizePackageIntent(
  value: string | null | undefined,
): PackageIntent | "" {
  const key = String(value || "").trim();
  return key in PACKAGE_INTENT_LABELS ? (key as PackageIntent) : "";
}

/**
 * The catalog offer behind each package card, so a picked package can be
 * priced. Without this, "they picked a package" is a fact with no number
 * attached, and every downstream rule has to guess.
 */
export const PACKAGE_INTENT_OFFER_IDS: Partial<Record<PackageIntent, string>> = {
  premium_1on1_video: "vip-1on1",
  standard_check_in: "standard-check-in",
  weekly_review: "weekly-review",
  app_community: "science-based-community",
  consultation_call: "one-time-consultation",
  // undecided_1on1 has no single offer by definition.
};

export function inferPackageIntentFromInvestment(
  value: string | null | undefined,
): PackageIntent | "" {
  const key = String(value || "").trim();

  if (key === "under_100" || key === "0_100") {
    return "app_community";
  }

  if (key === "100_200") {
    return "consultation_call";
  }

  // Below the main coaching floor: the lighter plans are the conversation.
  if (key === "100_400" || key === "300_500" || key === "200_500") {
    return "weekly_review";
  }

  if (
    key === "400_plus" ||
    key === "500_plus" ||
    key === "500_1k" ||
    key === "1k_plus"
  ) {
    return "premium_1on1_video";
  }

  if (key === "not_sure_value_clear") {
    return "undecided_1on1";
  }

  return "";
}

export function packageIntentLabel(value: string | null | undefined): string {
  const key = normalizePackageIntent(value);
  return key ? PACKAGE_INTENT_LABELS[key] : "";
}

export function packageIntentNote(value: string | null | undefined): string {
  const label = packageIntentLabel(value);
  return label ? `Package interest: ${label}` : "";
}

export function applyPackageHref(packageIntent: PackageIntent): string {
  const params = new URLSearchParams({
    package: packageIntent,
    utm_source: "site",
    utm_medium: "packages",
    utm_campaign: "package_interest",
    utm_content: packageIntent,
  });

  return `/apply?${params.toString()}`;
}

/**
 * Applicants who arrive from a package card have already told us which offer
 * they want, so /apply never asks them the "what would help most right now?"
 * fit question. This is the investment value stored for those leads: it is
 * deliberately NOT one of the budget bands, so the below-call disqualification
 * bands in application.ts cannot catch a lead who picked a paid package.
 */
export const PACKAGE_SELECTED_INVESTMENT = "package_selected";

/**
 * The step-3 fields derived from a chosen package. Returns null when no valid
 * package is selected, in which case the fit question is asked as before.
 */
export function nextStepFieldsForPackage(
  value: string | null | undefined,
): { next_step_choice: string; monthly_investment: string; ready_to_commit: string } | null {
  const intent = normalizePackageIntent(value);
  if (!intent) return null;

  return {
    next_step_choice: `package:${intent}`,
    monthly_investment: PACKAGE_SELECTED_INVESTMENT,
    ready_to_commit: "yes",
  };
}

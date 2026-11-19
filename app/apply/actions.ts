"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createPartialApplication,
  createSiteApplicationId,
  disqualificationReasonsForLead,
  finalizeApplication,
  isLowerCostFirstLead,
  isSyntheticTestLead,
  isTestApplicationLead,
  isValidApplicationId,
  normalizeApplyAttribution,
  selectedPackageForLead,
  storeSiteApplication,
  updateApplicationStep1,
  updateApplicationStep2,
  updateApplicationStep3,
  type NormalizedApplyAttribution,
  type RequestMetadata,
  type SubmissionLead,
} from "./application";
import {
  createApplicationReceipt,
  verifyApplicationReceipt,
} from "./applicationReceipt";
import { notifySubmission } from "./notify";
import {
  PACKAGE_SELECTED_INVESTMENT,
  normalizePackageIntent,
} from "@/lib/packageIntent";
import {
  BAND_AT_OR_ABOVE_FLOOR,
  BAND_BELOW_FLOOR,
  BAND_NOT_SURE,
  BAND_SELF_SERVE,
} from "@/lib/investmentBands";

// The $90 self-paced program was retired 2026-08-21. Applicants who do not
// qualify for 1:1 now land on the packages page, which still carries the
// $24.99 community and the $100 one-time consultation call.
const DISQUALIFIED_FALLBACK_URL = "/packages";
const LOWER_COST_OPTIONS_URL = "/apply/lower-cost";
const SAVE_ERROR_MESSAGE =
  "We couldn't save your application. Your answers are still here — please try again.";
const ACCESS_ERROR_MESSAGE =
  "This application session expired or could not be verified. Return to the first step and try again.";

const GOALS = new Set([
  "fat_loss",
  "muscle_gain",
  "mobility",
  "performance",
  "confidence",
]);
const CONSISTENCY = new Set(["never", "occasional", "mostly", "always"]);
/**
 * Every band value the server will accept, current and retired.
 *
 * The retired ones stay because a draft saved before a rename still posts the
 * value it was saved with, and rejecting it would strand a half-finished
 * application. The current ones are imported rather than retyped: this list
 * living apart from the form's own options is what let the form start sending
 * "400_plus" while the server still only knew "500_plus" — every step-3 save
 * rejected, the applicant shown "we couldn't save that choice", on the last
 * screen of the funnel.
 */
const INVESTMENT = new Set<string>([
  BAND_AT_OR_ABOVE_FLOOR,
  BAND_BELOW_FLOOR,
  BAND_SELF_SERVE,
  BAND_NOT_SURE,
  PACKAGE_SELECTED_INVESTMENT,
  // Retired, still parsed.
  "0_100",
  "100_200",
  "200_500",
  "500_1k",
  "1k_plus",
  "lower_cost_first",
  "300_500",
  "500_plus",
]);
const READINESS = new Set(["yes", "talk_it_through", "no"]);

export type ApplyFormState = {
  errors?: Record<string, string>;
  message?: string;
};

export type Step1ActionResult =
  | { ok: true; applicationId: string; editReceipt: string }
  | { ok: false; errors: Record<string, string>; message?: string };

export type Step2ActionResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string>; message?: string };

export type Step3AutosaveActionResult = Step2ActionResult;

export type FinalizeApplicationActionResult =
  | {
      ok: true;
      applicationId: string;
      completionEventId: string;
      capture: Record<string, string>;
      newlyCompleted: boolean;
      outcome: "qualified" | "lower_cost" | "downsell";
      redirectTo: string;
      selectedPackage: string;
      isTest: boolean;
    }
  | { ok: false; errors: Record<string, string>; message: string };

function getStr(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function getRequestMetadata(): Promise<RequestMetadata> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  return {
    userAgent: requestHeaders.get("user-agent") ?? undefined,
    referer: requestHeaders.get("referer") ?? undefined,
    forwardedFor: forwardedFor || undefined,
  };
}

function attributionFromForm(formData: FormData): NormalizedApplyAttribution {
  return normalizeApplyAttribution({
    sourcePath: getStr(formData, "source_path"),
    landingPath: getStr(formData, "landing_path"),
    utmSource: getStr(formData, "utm_source"),
    utmMedium: getStr(formData, "utm_medium"),
    utmCampaign: getStr(formData, "utm_campaign"),
    utmContent: getStr(formData, "utm_content"),
    sourceCreativeId: getStr(formData, "source_creative_id"),
    currentUtmSource: getStr(formData, "current_utm_source"),
    currentUtmMedium: getStr(formData, "current_utm_medium"),
    currentUtmCampaign: getStr(formData, "current_utm_campaign"),
    currentUtmContent: getStr(formData, "current_utm_content"),
    currentSourceCreativeId: getStr(
      formData,
      "current_source_creative_id",
    ),
    testRunId: getStr(formData, "test_run_id"),
    gaClientId: getStr(formData, "ga_client_id"),
    gaSessionId: getStr(formData, "ga_session_id"),
    analyticsConsent: getStr(formData, "analytics_consent"),
    entrySource: getStr(formData, "entry_source"),
    entryContent: getStr(formData, "entry_content"),
    bridgeVersion: getStr(formData, "bridge_version"),
  });
}

function leadFromForm(formData: FormData): SubmissionLead {
  return {
    name: getStr(formData, "name"),
    email: getStr(formData, "email"),
    phone: getStr(formData, "phone"),
    ig_handle: getStr(formData, "ig_handle"),
    age_18_plus: getStr(formData, "age_18_plus"),
    email_marketing_consent: getStr(formData, "email_marketing_consent"),
    sms_marketing_consent: getStr(formData, "sms_marketing_consent"),
    goal: getStr(formData, "goal"),
    consistency: getStr(formData, "consistency"),
    monthly_investment: getStr(formData, "monthly_investment"),
    ready_to_commit: getStr(formData, "ready_to_commit"),
    context: getStr(formData, "context").slice(0, 2000),
    selected_package: normalizePackageIntent(
      getStr(formData, "selected_package"),
    ),
  };
}

function contactErrors(lead: SubmissionLead): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = "Please add your name.";
  if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.email = "Add a real email so Kris can reach you.";
  }
  if (!lead.phone || lead.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Add a phone — Kris confirms before the call.";
  }
  if (lead.age_18_plus !== "yes") {
    errors.age_18_plus = "Confirm you're 18 or older.";
  }
  return errors;
}

function fullLeadErrors(lead: SubmissionLead): Record<string, string> {
  const errors = contactErrors(lead);
  if (!GOALS.has(lead.goal)) errors.goal = "Pick one.";
  if (!CONSISTENCY.has(lead.consistency)) {
    errors.consistency = "Pick where you're at.";
  }
  if (!INVESTMENT.has(lead.monthly_investment)) {
    errors.monthly_investment = "Pick the closest option.";
  }
  if (!READINESS.has(lead.ready_to_commit)) {
    errors.ready_to_commit = "Pick where you're at.";
  }
  return errors;
}

function validApplicationAccess(applicationId: string, editReceipt: string) {
  return (
    isValidApplicationId(applicationId) &&
    verifyApplicationReceipt(applicationId, editReceipt)
  );
}

function bookingRedirectPath(
  applicationId: string,
  editReceipt: string,
  date?: string,
  month?: string,
): string {
  const params = new URLSearchParams({
    application_id: applicationId,
    receipt: editReceipt,
  });
  if (date) params.set("date", date);
  if (month) params.set("month", month);
  return `/apply/book?${params.toString()}`;
}

function lowerCostOptionsPath(applicationId: string): string {
  const params = new URLSearchParams({ application_id: applicationId });
  return `${LOWER_COST_OPTIONS_URL}?${params.toString()}`;
}

function outcomeForLead(lead: SubmissionLead) {
  const reasons = disqualificationReasonsForLead(lead);
  if (isLowerCostFirstLead(lead)) return "lower_cost" as const;
  if (reasons.length > 0) return "downsell" as const;
  return "qualified" as const;
}

function redirectForOutcome(
  outcome: "qualified" | "lower_cost" | "downsell",
  applicationId: string,
  editReceipt: string,
  date?: string,
  month?: string,
): string {
  if (outcome === "qualified") {
    return bookingRedirectPath(applicationId, editReceipt, date, month);
  }
  if (outcome === "lower_cost") return lowerCostOptionsPath(applicationId);
  return DISQUALIFIED_FALLBACK_URL;
}

export async function createPartialApplicationAction(
  formData: FormData,
): Promise<Step1ActionResult> {
  const suppliedId = getStr(formData, "application_id");
  if (!isValidApplicationId(suppliedId)) {
    return {
      ok: false,
      errors: { application_id: "Application could not be initialized." },
      message: "Refresh this page and try again.",
    };
  }

  if (getStr(formData, "website")) {
    console.warn("apply.honeypot: tripped on step 1");
    const fakeReceipt = createApplicationReceipt(suppliedId);
    return fakeReceipt
      ? { ok: true, applicationId: suppliedId, editReceipt: fakeReceipt }
      : { ok: false, errors: {}, message: SAVE_ERROR_MESSAGE };
  }

  const lead = leadFromForm(formData);
  const errors = contactErrors(lead);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const attribution = attributionFromForm(formData);
  const existingReceipt = getStr(formData, "edit_receipt");
  const existingDraft = verifyApplicationReceipt(suppliedId, existingReceipt);
  const result = existingDraft
    ? await updateApplicationStep1({ applicationId: suppliedId, step1: lead })
    : await createPartialApplication({
        applicationId: suppliedId,
        step1: lead,
        attribution,
        metadata: await getRequestMetadata(),
      });
  const stored = "created" in result ? result.created : result.updated;
  const storeReason = "reason" in result ? result.reason : null;
  const editReceipt = stored
    ? createApplicationReceipt(suppliedId)
    : "";

  console.log(
    JSON.stringify({
      event: "apply.step1",
      application_id: suppliedId,
      stored,
      store_reason: stored ? null : storeReason,
      save_kind: existingDraft ? "verified_update" : "idempotent_create",
      is_test: isTestApplicationLead(lead),
      timestamp: new Date().toISOString(),
    }),
  );

  if (!stored || !editReceipt) {
    return { ok: false, errors: {}, message: SAVE_ERROR_MESSAGE };
  }
  return { ok: true, applicationId: suppliedId, editReceipt };
}

export async function updateStep2Action(
  applicationId: string,
  editReceipt: string,
  formData: FormData,
): Promise<Step2ActionResult> {
  if (!validApplicationAccess(applicationId, editReceipt)) {
    return {
      ok: false,
      errors: { application_id: "Application could not be verified." },
      message: ACCESS_ERROR_MESSAGE,
    };
  }

  const goal = getStr(formData, "goal");
  const consistency = getStr(formData, "consistency");
  const errors: Record<string, string> = {};
  if (!GOALS.has(goal)) errors.goal = "Pick one.";
  if (!CONSISTENCY.has(consistency)) errors.consistency = "Pick where you're at.";
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const result = await updateApplicationStep2({
    applicationId,
    step2: { goal, consistency },
  });
  if (!result.updated) {
    return { ok: false, errors: {}, message: SAVE_ERROR_MESSAGE };
  }
  return { ok: true };
}

export async function updateStep3Action(
  applicationId: string,
  editReceipt: string,
  formData: FormData,
): Promise<Step3AutosaveActionResult> {
  if (!validApplicationAccess(applicationId, editReceipt)) {
    return {
      ok: false,
      errors: { application_id: "Application could not be verified." },
      message: ACCESS_ERROR_MESSAGE,
    };
  }

  const monthlyInvestment = getStr(formData, "monthly_investment");
  const readyToCommit = getStr(formData, "ready_to_commit");
  const errors: Record<string, string> = {};
  if (!INVESTMENT.has(monthlyInvestment)) {
    errors.monthly_investment = "Pick the closest option.";
  }
  if (!READINESS.has(readyToCommit)) {
    errors.ready_to_commit = "Pick where you're at.";
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const result = await updateApplicationStep3({
    applicationId,
    step3: {
      monthly_investment: monthlyInvestment,
      ready_to_commit: readyToCommit,
    },
    lead: leadFromForm(formData),
  });
  if (!result.updated) {
    return { ok: false, errors: {}, message: SAVE_ERROR_MESSAGE };
  }
  return { ok: true };
}

export async function finalizeApplicationAction(
  applicationId: string,
  editReceipt: string,
  formData: FormData,
): Promise<FinalizeApplicationActionResult> {
  if (!validApplicationAccess(applicationId, editReceipt)) {
    return {
      ok: false,
      errors: { application_id: "Application could not be verified." },
      message: ACCESS_ERROR_MESSAGE,
    };
  }

  const lead = leadFromForm(formData);
  const errors = fullLeadErrors(lead);
  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      message: "Fix the highlighted fields and try again.",
    };
  }

  const attribution = attributionFromForm(formData);
  const storage = await finalizeApplication({
    applicationId,
    lead,
    attribution,
  });
  const proposedOutcome = outcomeForLead(lead);
  const proposedPackage = selectedPackageForLead(lead);
  const proposedIsTest = isTestApplicationLead(lead);
  const outcome = storage.stored ? storage.outcome : proposedOutcome;
  const selectedPackage = storage.stored
    ? storage.selectedPackage
    : proposedPackage;
  const isTest = storage.stored ? storage.isTest : proposedIsTest;

  console.log(
    JSON.stringify({
      event: "apply.submission",
      application_id: applicationId,
      application_stored: storage.stored,
      application_store_reason: storage.stored ? null : storage.reason,
      newly_completed: storage.stored ? storage.newlyCompleted : false,
      outcome,
      selected_package: selectedPackage || null,
      is_test: isTest,
      timestamp: new Date().toISOString(),
    }),
  );

  if (!storage.stored) {
    return { ok: false, errors: {}, message: SAVE_ERROR_MESSAGE };
  }

  // Same split as the other call site: `isTest` now also covers internal operator
  // addresses so the funnel numbers exclude them, but the alert must still fire for a
  // real person's address — including ours — or the only way to check it is to wait
  // for a stranger.
  if (storage.newlyCompleted && !isSyntheticTestLead(lead)) {
    await notifySubmission(lead, outcome !== "qualified", {
      applicationId,
      applicationStored: true,
    });
  }

  const date = getStr(formData, "calendar_date") || getStr(formData, "date");
  const month = getStr(formData, "calendar_month") || getStr(formData, "month");

  return {
    ok: true,
    applicationId,
    completionEventId: storage.completionEventId,
    capture: storage.capture,
    newlyCompleted: storage.newlyCompleted,
    outcome,
    redirectTo: redirectForOutcome(outcome, applicationId, editReceipt, date, month),
    selectedPackage,
    isTest,
  };
}

// Compatibility action for older callers. It follows the same fail-closed,
// notification, and PII-safe booking rules as the progressive form.
export async function submitApplication(
  _previous: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  if (getStr(formData, "website")) redirect(DISQUALIFIED_FALLBACK_URL);

  const lead = leadFromForm(formData);
  const errors = fullLeadErrors(lead);
  if (Object.keys(errors).length > 0) {
    return { errors, message: "Fix the highlighted fields and try again." };
  }

  const applicationId = createSiteApplicationId();
  const attribution = attributionFromForm(formData);
  const outcome = outcomeForLead(lead);
  const storage = await storeSiteApplication({
    applicationId,
    lead,
    disqualified: outcome !== "qualified",
    attribution,
    metadata: await getRequestMetadata(),
  });
  const editReceipt = storage.stored
    ? createApplicationReceipt(applicationId)
    : "";

  if (!storage.stored || !editReceipt) {
    return { errors: {}, message: SAVE_ERROR_MESSAGE };
  }
  // isSyntheticTestLead, not isTestApplicationLead: an internal address is excluded
  // from the NUMBERS but must still produce the email, or nobody can ever verify the
  // alert works by submitting the form themselves.
  if (!isSyntheticTestLead(lead)) {
    await notifySubmission(lead, outcome !== "qualified", {
      applicationId,
      applicationStored: true,
    });
  }

  const date = getStr(formData, "calendar_date") || getStr(formData, "date");
  const month = getStr(formData, "calendar_month") || getStr(formData, "month");
  redirect(redirectForOutcome(outcome, applicationId, editReceipt, date, month));
}

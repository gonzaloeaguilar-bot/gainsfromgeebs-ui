import {
  applicationCapturePayload,
  normalizeApplicationCapture,
  completionCaptureParameters,
  type CaptureInput,
} from "@/lib/applicationCapture";
import {
  inferPackageIntentFromInvestment,
  normalizePackageIntent,
  packageIntentNote,
} from "@/lib/packageIntent";
import {
  BAND_AT_OR_ABOVE_FLOOR,
  BAND_NOT_SURE,
  bandIsSelfServe,
  effectiveBand,
} from "@/lib/investmentBands";

export type SubmissionLead = {
  name: string;
  email: string;
  phone: string;
  ig_handle: string;
  age_18_plus: string;
  email_marketing_consent?: string;
  sms_marketing_consent?: string;
  goal: string;
  consistency: string;
  monthly_investment: string;
  ready_to_commit: string;
  context: string;
  selected_package?: string;
};

export type RequestMetadata = {
  userAgent?: string;
  referer?: string;
  forwardedFor?: string;
};

export type ApplyAttribution = CaptureInput & {
  sourcePath?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  sourceCreativeId?: string;
  currentUtmSource?: string;
  currentUtmMedium?: string;
  currentUtmCampaign?: string;
  currentUtmContent?: string;
  currentSourceCreativeId?: string;
  testRunId?: string;
  // GA4 _ga cookie client_id — the join key that links a GA4 session to a
  // server-side site_applications row. Read client-side, passed as a hidden
  // form field. Nullable: missing when GA hasn't loaded or cookies are blocked.
  gaClientId?: string;
};

export type DisqualificationReason =
  | "under_18"
  | "budget_below_call"
  | "not_ready";

export type ActivationSegment =
  | "qualified_no_booking"
  | "downsell_minor"
  | "downsell_budget"
  | "downsell_not_ready"
  | "downsell_budget_not_ready"
  | "downsell_other";

export type ActivationStatus = "candidate" | "suppressed";
export type SubmissionMode = "live" | "test";

export type StoreSiteApplicationResult =
  | { stored: true }
  | { stored: false; reason: "missing_env" | "request_failed" | "not_found" };

export type FinalizeApplicationResult =
  | {
      stored: true;
      newlyCompleted: boolean;
      completionEventId: string;
      capture: Record<string, string>;
      outcome: "qualified" | "lower_cost" | "downsell";
      selectedPackage: string;
      isTest: boolean;
    }
  | { stored: false; reason: "missing_env" | "request_failed" | "not_found" };

export type CompletedApplicationForBooking = {
  applicationId: string;
  name: string;
  email: string;
  /** The applicant's own Instagram handle, for Calendly's first custom question. */
  igHandle: string;
  selectedPackage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  /** First-touch landing page, path only: the query string is dropped so no
   *  click id or stray parameter rides into analytics. */
  landingPath: string;
  // Captured ad/creative identifier (source_creative_id). Forwarded to Calendly
  // as utm_id so a booked call traces back to the specific ad/creative, not just
  // the channel. Empty when the visit carried no creative/click id.
  sourceCreativeId: string;
  gaClientId: string;
  isTest: boolean;
};

// --- Progressive-save types ---

export type ApplicationStatus = "partial" | "qualified" | "downsell";

export type Step1Data = {
  name: string;
  email: string;
  phone: string;
  ig_handle: string;
  age_18_plus: string;
  email_marketing_consent?: string;
  sms_marketing_consent?: string;
  selected_package?: string;
};

export type Step2Data = {
  goal: string;
  consistency: string;
};

export type Step3Data = {
  monthly_investment?: string;
  ready_to_commit?: string;
};

export type CreatePartialApplicationResult =
  | { created: true; applicationId: string }
  | { created: false; reason: "missing_env" | "request_failed" };

export type UpdatePartialApplicationResult =
  | { updated: true }
  | { updated: false; reason: "missing_env" | "request_failed" | "not_found" };

export const SITE_APPLICATION_UTM_PREFIX = "site_application:";
export const APPLICATION_SUBMITTED_EVENT_PREFIX = "application_submitted:";
export const BOOKING_STARTED_EVENT_PREFIX = "booking_started:";

const SUPABASE_TABLE = "site_applications";
const E2E_MEMORY_STORE_FLAG = "GEEBS_E2E_TEST_MODE";

type MemoryApplicationRow = Record<string, unknown> & { id: string };

declare global {
  // Test-only storage for Playwright's local production server. It is never
  // enabled in Vercel and prevents QA from touching live customer data.
  var __geebsE2eApplications: Map<string, MemoryApplicationRow> | undefined;
}

function memoryApplicationStore(): Map<string, MemoryApplicationRow> | null {
  if (
    process.env[E2E_MEMORY_STORE_FLAG] !== "1" ||
    process.env.VERCEL_ENV === "production"
  ) {
    return null;
  }

  globalThis.__geebsE2eApplications ||= new Map();
  return globalThis.__geebsE2eApplications;
}
export const EMAIL_MARKETING_CONSENT_TEXT =
  "Send me training resources and coaching updates by email. I can unsubscribe anytime.";
export const SMS_MARKETING_CONSENT_TEXT =
  "I agree to receive coaching follow-up and occasional training texts from Geebs/Titan Forge at this number. Msg/data rates may apply. Reply STOP to opt out.";

/**
 * Submitting the application IS the consent, from 2026-09-21.
 *
 * The two checkboxes above used to live in an optional fold that came off the
 * form: nobody opened it, and Gonzalo's read was that it added friction for
 * nothing. Consent is now given by pressing Submit, which is a normal pattern
 * — and the thing that makes it lawful rather than assumed is that the
 * sentence is ON the screen, next to the button, before it is pressed.
 *
 * So this constant is used TWICE and must stay that way: once to render the
 * line under the submit button, and once as the text stored beside the lead.
 * What the applicant read is what the record says they agreed to. If the
 * wording on screen and the wording in the database ever drift apart, the
 * record stops being evidence of anything.
 */
export const APPLY_SUBMIT_CONSENT_LINE =
  "By submitting, you agree Kris can follow up by email and text.";

/**
 * The rest, one tap away rather than in front of the button.
 *
 * Gonzalo, 2026-09-21: the full paragraph read as "long scary text" under a
 * button someone is about to press. The short line carries the substance —
 * who contacts you and how — and this carries the terms, behind a quiet
 * toggle.
 */
export const APPLY_SUBMIT_CONSENT_DETAIL =
  "Coaching follow-up only, at the email and number above. Msg & data rates may apply. Reply STOP to opt out of texts, unsubscribe anytime from email.";

/**
 * What gets stored is BOTH, joined — because both were available at the moment
 * the button was pressed, and the record has to be the whole of what was on
 * offer to read, not just the half that fit on the screen.
 */
export const APPLY_SUBMIT_CONSENT_TEXT = `${APPLY_SUBMIT_CONSENT_LINE} ${APPLY_SUBMIT_CONSENT_DETAIL}`;
const DEFAULT_ATTRIBUTION = {
  sourcePath: "/apply",
  utmSource: "gainsfromgeebs",
  utmMedium: "apply_form",
  utmCampaign: "v1",
} as const;
const OPTIONAL_APPLICATION_COLUMNS = [
  "ga_session_id",
  "form_version",
  "source_hostname",
  "analytics_consent",
  "entry_source",
  "entry_content",
  "bridge_version",
  "email_marketing_consent",
  "sms_marketing_consent",
  "marketing_consent_at",
  "marketing_consent_source",
  "email_marketing_consent_text",
  "sms_marketing_consent_text",
] as const;

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function getSupabaseConfig(env: Record<string, string | undefined> = process.env) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;

  if (!url || !key) return null;

  return {
    url: normalizeSupabaseUrl(url),
    key,
  };
}

type SupabasePayload = Record<string, unknown>;

function withoutColumns(
  payload: SupabasePayload,
  columns: readonly string[],
): SupabasePayload {
  const rest = { ...payload };
  for (const column of columns) {
    delete rest[column];
  }
  return rest;
}

async function sendSupabasePayload(
  url: string,
  init: Omit<RequestInit, "body">,
  payload: SupabasePayload,
  errorLabel: string,
): Promise<Response> {
  let currentPayload = payload;
  let unavailableColumns: string[] = [];

  for (let attempt = 0; attempt <= OPTIONAL_APPLICATION_COLUMNS.length; attempt += 1) {
    const res = await fetch(url, {
      ...init,
      body: JSON.stringify(currentPayload),
    });

    if (res.ok) return res;

    const body = await res.text().catch(() => "");
    let schemaError = false;
    let schemaMessage = "";
    try {
      const error = JSON.parse(body);
      schemaError = error.code === "PGRST204" || error.code === "42703";
      schemaMessage = typeof error.message === "string" ? error.message : "";
    } catch { /* Non-JSON failures must never trigger metadata removal. */ }
    const missingColumns = OPTIONAL_APPLICATION_COLUMNS.filter(
      (column) =>
        Object.prototype.hasOwnProperty.call(currentPayload, column) &&
        schemaError && (schemaMessage.includes(`'${column}'`) || schemaMessage.includes(`"${column}"`)),
    );

    if (!missingColumns.length) {
      // PostgREST constraint errors can echo the rejected row. Never send the
      // response body to logs because application rows contain contact data.
      console.error(`${errorLabel}: supabase request failed (${res.status})`);
      return res;
    }

    unavailableColumns = [...unavailableColumns, ...missingColumns];
    console.warn(
      `${errorLabel}: optional column unavailable (${missingColumns.join(", ")}) - metadata capture degraded; migration required; retrying without only unavailable column(s)`,
    );
    currentPayload = withoutColumns(payload, unavailableColumns);
  }

  return fetch(url, {
    ...init,
    body: JSON.stringify(currentPayload),
  });
}

async function returnedRows(response: Response): Promise<SupabasePayload[]> {
  try {
    const body = await response.json();
    return Array.isArray(body) ? (body as SupabasePayload[]) : [];
  } catch {
    return [];
  }
}

export function createSiteApplicationId(): string {
  return crypto.randomUUID();
}

export function applicationUtmContent(applicationId: string): string {
  return `${SITE_APPLICATION_UTM_PREFIX}${applicationId}`;
}

export function applicationSubmittedEventId(applicationId: string): string {
  return `${APPLICATION_SUBMITTED_EVENT_PREFIX}${applicationId}`;
}

export function bookingStartedEventId(applicationId: string): string {
  return `${BOOKING_STARTED_EVENT_PREFIX}${applicationId}`;
}

function finalizedRowResult(
  applicationId: string,
  row: SupabasePayload,
  newlyCompleted: boolean,
): Extract<FinalizeApplicationResult, { stored: true }> | null {
  const status = String(row.status || "");
  if (!row.completed_at || (status !== "qualified" && status !== "downsell")) {
    return null;
  }

  return {
    stored: true,
    newlyCompleted,
    capture: completionCaptureParameters(row),
    completionEventId: applicationSubmittedEventId(applicationId),
    // Read through the shared predicate, never against a literal band value.
    //
    // This is the outcome PRODUCTION uses: actions.ts takes storage.outcome
    // whenever the row was stored, and falls back to the lead-derived one only
    // when the write failed. Comparing to "lower_cost_first" here meant the
    // renamed band ("under_100") stopped matching, so someone who said they
    // were under $100 a month was sent to /packages instead of the community
    // they can actually buy — on the one path that runs for every real
    // applicant, while the predicate I had updated only guarded the fallback.
    outcome:
      status === "qualified"
        ? "qualified"
        : isLowerCostFirstLead({
              monthly_investment: String(row.monthly_investment || ""),
              selected_package: String(row.selected_package || ""),
            })
          ? "lower_cost"
          : "downsell",
    selectedPackage: String(row.selected_package || ""),
    isTest: Boolean(row.is_test),
  };
}

export function isValidApplicationId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

/**
 * A throwaway address that is obviously not a person. Reserved domains only.
 *
 * Kept separate from isTestApplicationLead on purpose: this one gates whether a
 * NOTIFICATION is sent, so submitting with your own real address still emails you.
 * Losing that would make it impossible to check the alert works end to end, which is
 * the only way anyone ever finds out that it does not.
 */
export function isSyntheticTestLead(
  lead: Pick<SubmissionLead, "email">,
): boolean {
  const email = lead.email.trim().toLowerCase();
  const domain = email.split("@").at(-1) || "";
  return (
    ["example.com", "example.net", "example.org"].includes(domain) ||
    domain.endsWith(".test") ||
    domain.endsWith(".invalid")
  );
}

/**
 * Should this row be excluded from the funnel numbers?
 *
 * WHY THIS WIDENED. Measured against production on 2026-09-23: of 64 rows in
 * site_applications not already flagged is_test, 33 were OURS — Gonzalo's and Kris's
 * own submissions while building and checking the form. More than half the table was
 * internal, so every completion and drop-off rate over it was inflated roughly
 * twofold. The old predicate only caught reserved domains, so a real address used for
 * a real test landed as a genuine lead, and the first read of that table this session
 * reported 12 new coaching applications in a week that were all one person testing.
 *
 * Operator addresses come from INTERNAL_APPLICATION_EMAILS rather than being written
 * here, so nobody's personal address lives in the source, and adding one is config.
 */
export function isTestApplicationLead(
  lead: Pick<SubmissionLead, "email">,
): boolean {
  if (isSyntheticTestLead(lead)) return true;

  const email = lead.email.trim().toLowerCase();
  if (!email) return false;

  return (process.env.INTERNAL_APPLICATION_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .includes(email);
}

export function submissionModeForLead(
  lead: Pick<SubmissionLead, "email">,
): SubmissionMode {
  return isTestApplicationLead(lead) ? "test" : "live";
}

function hasConsent(value: string | undefined): boolean {
  return value === "yes";
}

function marketingConsentPayload(
  input: Pick<
    SubmissionLead | Step1Data,
    "email_marketing_consent" | "sms_marketing_consent"
  >,
  capturedAt: string,
): SupabasePayload {
  const emailConsent = hasConsent(input.email_marketing_consent);
  const smsConsent = hasConsent(input.sms_marketing_consent);

  return {
    email_marketing_consent: emailConsent,
    sms_marketing_consent: smsConsent,
    marketing_consent_at: emailConsent || smsConsent ? capturedAt : null,
    marketing_consent_source: emailConsent || smsConsent ? "apply_final_step" : null,
    /* The stored text is the sentence the applicant actually read, and on this
       form that is the line under the submit button. This function only ever
       serves /apply; the per-channel wording above still belongs to the
       checkbox captures elsewhere (PackageLeadCapture, TipCapture), and rows
       written before 2026-09-21 keep whichever text was shown at the time. */
    email_marketing_consent_text: emailConsent ? APPLY_SUBMIT_CONSENT_TEXT : null,
    sms_marketing_consent_text: smsConsent ? APPLY_SUBMIT_CONSENT_TEXT : null,
  };
}

export function selectedPackageForLead(lead: SubmissionLead): string {
  const explicitPackage = normalizePackageIntent(lead.selected_package);
  if (explicitPackage) return explicitPackage;
  if (isLowerCostFirstLead(lead)) return "";

  return (
    inferPackageIntentFromInvestment(lead.monthly_investment) ||
    (lead.ready_to_commit === "talk_it_through" ? "consultation_call" : "")
  );
}

/**
 * Someone who can buy something online today without waiting for Kris.
 *
 * Under $100 a month means the community is the only thing that fits, and the
 * community has a checkout — so they go straight to it rather than into a
 * queue for a call that was never going to sell them anything.
 */
export function isLowerCostFirstLead(
  lead: Pick<SubmissionLead, "monthly_investment"> &
    Partial<Pick<SubmissionLead, "selected_package">>,
): boolean {
  return bandIsSelfServe(effectiveBand(lead));
}

function isConsultationLead(lead: SubmissionLead): boolean {
  return selectedPackageForLead(lead) === "consultation_call";
}

export function contextWithPackageIntent(lead: SubmissionLead): string {
  const packageNote = packageIntentNote(selectedPackageForLead(lead));
  const userContext = lead.context.trim();

  return [packageNote, userContext].filter(Boolean).join("\n\n");
}

export function disqualificationReasonsForLead(
  lead: SubmissionLead,
): DisqualificationReason[] {
  const reasons: DisqualificationReason[] = [];
  const consultationLead = isConsultationLead(lead);

  if (lead.age_18_plus !== "yes") reasons.push("under_18");
  // The call floor is the price of the cheapest main coaching tier, read from
  // the catalog — not a number chosen here. Kris closes on the call, so the
  // only question this gate asks is whether there is something on the main
  // line this person could say yes to.
  //
  // The old rule disqualified anything under $500 and so refused a call to
  // someone ready to pay $400 for Standard, which is a live, sellable plan.
  const band = effectiveBand(lead);
  if (
    !consultationLead &&
    band !== BAND_AT_OR_ABOVE_FLOOR &&
    band !== BAND_NOT_SURE
  ) {
    reasons.push("budget_below_call");
  }
  if (
    !consultationLead &&
    (lead.ready_to_commit === "no" || lead.ready_to_commit === "talk_it_through")
  ) {
    reasons.push("not_ready");
  }

  return reasons;
}

export function isDisqualifiedLead(lead: SubmissionLead): boolean {
  return disqualificationReasonsForLead(lead).length > 0;
}

export function activationSegmentForLead(
  lead: SubmissionLead,
): ActivationSegment {
  const reasons = disqualificationReasonsForLead(lead);

  if (reasons.length === 0) return "qualified_no_booking";
  if (reasons.includes("under_18")) return "downsell_minor";

  const belowBudget = reasons.includes("budget_below_call");
  const notReady = reasons.includes("not_ready");
  if (belowBudget && notReady) return "downsell_budget_not_ready";
  if (belowBudget) return "downsell_budget";
  if (notReady) return "downsell_not_ready";

  return "downsell_other";
}

export function activationStatusForLead(lead: SubmissionLead): ActivationStatus {
  return disqualificationReasonsForLead(lead).includes("under_18")
    ? "suppressed"
    : "candidate";
}

function cleanAttributionValue(value: string | undefined, fallback: string): string {
  const clean = String(value || "").trim().slice(0, 160);
  return clean || fallback;
}

function cleanSourcePath(value: string | undefined): string {
  const clean = String(value || "").trim().slice(0, 1024);
  return clean.startsWith("/") ? clean : DEFAULT_ATTRIBUTION.sourcePath;
}

function cleanOptionalAttributionValue(
  value: string | undefined,
  maxLength = 160,
): string {
  return String(value || "").trim().slice(0, maxLength);
}

export type NormalizedApplyAttribution = ReturnType<typeof normalizeApplicationCapture> & {
  sourcePath: string;
  landingPath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  sourceCreativeId: string;
  currentUtmSource: string;
  currentUtmMedium: string;
  currentUtmCampaign: string;
  currentUtmContent: string;
  currentSourceCreativeId: string;
  testRunId: string;
  gaClientId: string | null;
};

export function normalizeApplyAttribution(
  attribution: ApplyAttribution | NormalizedApplyAttribution = {},
): NormalizedApplyAttribution {
  // Sanitize gaClientId: allow only GA4 client_id format (digits + dot + digits).
  // Rejects injected values or oversized strings before they reach Supabase.
  const capture = normalizeApplicationCapture(attribution);
  const rawClientId = String(attribution.gaClientId || "").trim();
  const gaClientId =
    capture.analyticsConsent !== "denied" && rawClientId && /^\d{1,20}\.\d{1,20}$/.test(rawClientId) ? rawClientId : null;

  return {
    sourcePath: cleanSourcePath(attribution.sourcePath),
    landingPath: cleanSourcePath(
      attribution.landingPath || attribution.sourcePath,
    ),
    utmSource: cleanAttributionValue(
      attribution.utmSource,
      DEFAULT_ATTRIBUTION.utmSource,
    ),
    utmMedium: cleanAttributionValue(
      attribution.utmMedium,
      DEFAULT_ATTRIBUTION.utmMedium,
    ),
    utmCampaign: cleanAttributionValue(
      attribution.utmCampaign,
      DEFAULT_ATTRIBUTION.utmCampaign,
    ),
    utmContent: cleanOptionalAttributionValue(attribution.utmContent, 160),
    sourceCreativeId: cleanOptionalAttributionValue(
      attribution.sourceCreativeId,
      160,
    ),
    currentUtmSource: cleanAttributionValue(
      attribution.currentUtmSource || attribution.utmSource,
      DEFAULT_ATTRIBUTION.utmSource,
    ),
    currentUtmMedium: cleanAttributionValue(
      attribution.currentUtmMedium || attribution.utmMedium,
      DEFAULT_ATTRIBUTION.utmMedium,
    ),
    currentUtmCampaign: cleanAttributionValue(
      attribution.currentUtmCampaign || attribution.utmCampaign,
      DEFAULT_ATTRIBUTION.utmCampaign,
    ),
    currentUtmContent: cleanOptionalAttributionValue(
      attribution.currentUtmContent || attribution.utmContent,
      160,
    ),
    currentSourceCreativeId: cleanOptionalAttributionValue(
      attribution.currentSourceCreativeId || attribution.sourceCreativeId,
      160,
    ),
    testRunId: cleanOptionalAttributionValue(attribution.testRunId, 120),
    gaClientId,
    ...capture,
  };
}

export function buildSiteApplicationPayload({
  applicationId,
  lead,
  disqualified,
  attribution = {},
  metadata = {},
  createdAt = new Date().toISOString(),
}: {
  applicationId: string;
  lead: SubmissionLead;
  disqualified: boolean;
  attribution?: ApplyAttribution | NormalizedApplyAttribution;
  metadata?: RequestMetadata;
  createdAt?: string;
}) {
  const disqualification_reasons = disqualificationReasonsForLead(lead);
  const isDownsell = disqualified || disqualification_reasons.length > 0;
  const normalizedAttribution = normalizeApplyAttribution(attribution);
  const selected_package = selectedPackageForLead(lead);
  const is_test = isTestApplicationLead(lead);

  return {
    id: applicationId,
    created_at: createdAt,
    updated_at: createdAt,
    started_at: createdAt,
    completed_at: createdAt,
    last_completed_step: 3,
    status: isDownsell ? "downsell" : "qualified",
    disqualified: isDownsell,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    ig_handle: lead.ig_handle || null,
    age_18_plus: lead.age_18_plus === "yes",
    ...marketingConsentPayload(lead, createdAt),
    goal: lead.goal,
    consistency: lead.consistency,
    monthly_investment: lead.monthly_investment,
    ready_to_commit: lead.ready_to_commit,
    disqualification_reasons,
    activation_segment: activationSegmentForLead(lead),
    activation_status: activationStatusForLead(lead),
    context: contextWithPackageIntent(lead) || null,
    selected_package: selected_package || null,
    utm_source: normalizedAttribution.utmSource,
    utm_medium: normalizedAttribution.utmMedium,
    utm_campaign: normalizedAttribution.utmCampaign,
    utm_content: applicationUtmContent(applicationId),
    source_path: normalizedAttribution.sourcePath,
    landing_path: normalizedAttribution.landingPath,
    source_utm_content: normalizedAttribution.utmContent || null,
    source_creative_id: normalizedAttribution.sourceCreativeId || null,
    current_utm_source: normalizedAttribution.currentUtmSource,
    current_utm_medium: normalizedAttribution.currentUtmMedium,
    current_utm_campaign: normalizedAttribution.currentUtmCampaign,
    current_utm_content: normalizedAttribution.currentUtmContent || null,
    current_source_creative_id:
      normalizedAttribution.currentSourceCreativeId || null,
    submission_event_id: applicationSubmittedEventId(applicationId),
    is_test,
    submission_mode: submissionModeForLead(lead),
    test_run_id: is_test ? normalizedAttribution.testRunId || null : null,
    // GA4 join key: links this Supabase row to the GA4 session that submitted
    // the form. Null when the _ga cookie was absent or blocked.
    ga_client_id: normalizedAttribution.gaClientId,
    ...applicationCapturePayload(normalizedAttribution),
    user_agent: metadata.userAgent || null,
    referer: metadata.referer || null,
    forwarded_for: metadata.forwardedFor || null,
  };
}

// ---------------------------------------------------------------------------
// Progressive-save helpers
// ---------------------------------------------------------------------------

/**
 * Creates a partial `site_applications` row immediately when the user
 * completes step 1 (contact info). Status = "partial", last_completed_step = 1.
 * This is the abandonment-capture row — if the user never returns, we still
 * have their email and phone.
 */
export async function createPartialApplication({
  applicationId,
  step1,
  attribution,
  metadata,
}: {
  applicationId: string;
  step1: Step1Data;
  attribution?: ApplyAttribution | NormalizedApplyAttribution;
  metadata?: RequestMetadata;
}): Promise<CreatePartialApplicationResult> {
  const normalizedAttribution = normalizeApplyAttribution(attribution);
  const now = new Date().toISOString();
  const is_test = isTestApplicationLead(step1);

  const payload = {
    id: applicationId,
    created_at: now,
    updated_at: now,
    started_at: now,
    status: "partial" as ApplicationStatus,
    last_completed_step: 1,
    // Contact fields
    name: step1.name,
    email: step1.email,
    phone: step1.phone,
    ig_handle: step1.ig_handle || null,
    age_18_plus: step1.age_18_plus === "yes",
    ...marketingConsentPayload(step1, now),
    selected_package: normalizePackageIntent(step1.selected_package) || null,
    // Unset qualifier fields — filled in later steps
    goal: null,
    consistency: null,
    monthly_investment: null,
    ready_to_commit: null,
    context: null,
    disqualified: null,
    disqualification_reasons: [],
    activation_segment: null,
    activation_status: null,
    // Attribution
    utm_source: normalizedAttribution.utmSource,
    utm_medium: normalizedAttribution.utmMedium,
    utm_campaign: normalizedAttribution.utmCampaign,
    utm_content: applicationUtmContent(applicationId),
    source_path: normalizedAttribution.sourcePath,
    landing_path: normalizedAttribution.landingPath,
    source_utm_content: normalizedAttribution.utmContent || null,
    source_creative_id: normalizedAttribution.sourceCreativeId || null,
    current_utm_source: normalizedAttribution.currentUtmSource,
    current_utm_medium: normalizedAttribution.currentUtmMedium,
    current_utm_campaign: normalizedAttribution.currentUtmCampaign,
    current_utm_content: normalizedAttribution.currentUtmContent || null,
    current_source_creative_id:
      normalizedAttribution.currentSourceCreativeId || null,
    submission_event_id: null,
    is_test,
    submission_mode: submissionModeForLead(step1),
    test_run_id: is_test ? normalizedAttribution.testRunId || null : null,
    ga_client_id: normalizedAttribution.gaClientId,
    ...applicationCapturePayload(normalizedAttribution),
    // Request metadata
    user_agent: metadata?.userAgent || null,
    referer: metadata?.referer || null,
    forwarded_for: metadata?.forwardedFor || null,
  };

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const current = memoryStore.get(applicationId);
    if (!current) {
      memoryStore.set(applicationId, payload);
      return { created: true, applicationId };
    }
    const sameDraft =
      current.status === "partial" &&
      !current.completed_at &&
      current.name === payload.name &&
      current.email === payload.email &&
      current.phone === payload.phone;
    return sameDraft
      ? { created: true, applicationId }
      : { created: false, reason: "request_failed" };
  }

  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "apply.store: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY unset - skipping partial capture",
    );
    return { created: false, reason: "missing_env" };
  }

  try {
    const res = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?on_conflict=id&select=id`,
      {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
      },
      payload,
      "apply.store.partial",
    );

    if (!res.ok) {
      return { created: false, reason: "request_failed" };
    }

    const insertedRows = await returnedRows(res);
    if (insertedRows.length === 1) {
      return { created: true, applicationId };
    }

    // A retry after a lost Step-1 response legitimately finds the same row.
    // Only issue another edit receipt when the still-partial row matches the
    // original contact tuple; a caller cannot claim an unrelated UUID.
    const verify = await fetch(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&select=id,name,email,phone,status,completed_at&limit=1`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (!verify.ok) return { created: false, reason: "request_failed" };
    const existingRows = await returnedRows(verify);
    const existing = existingRows[0];
    const sameDraft =
      existingRows.length === 1 &&
      existing.status === "partial" &&
      !existing.completed_at &&
      existing.name === step1.name &&
      existing.email === step1.email &&
      existing.phone === step1.phone;
    return sameDraft
      ? { created: true, applicationId }
      : { created: false, reason: "request_failed" };
  } catch (err) {
    console.error("apply.store.partial: supabase insert failed", err);
    return { created: false, reason: "request_failed" };
  }
}

export async function updateApplicationStep1({
  applicationId,
  step1,
}: {
  applicationId: string;
  step1: Step1Data;
}): Promise<UpdatePartialApplicationResult> {
  const now = new Date().toISOString();
  const isTest = isTestApplicationLead(step1);
  const payload: SupabasePayload = {
    updated_at: now,
    last_completed_step: 1,
    name: step1.name,
    email: step1.email,
    phone: step1.phone,
    ig_handle: step1.ig_handle || null,
    age_18_plus: step1.age_18_plus === "yes",
    ...marketingConsentPayload(step1, now),
    selected_package: normalizePackageIntent(step1.selected_package) || null,
    is_test: isTest,
    submission_mode: submissionModeForLead(step1),
  };

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const current = memoryStore.get(applicationId);
    if (!current || current.completed_at) {
      return { updated: false, reason: "not_found" };
    }
    memoryStore.set(applicationId, { ...current, ...payload });
    return { updated: true };
  }

  const config = getSupabaseConfig();
  if (!config) return { updated: false, reason: "missing_env" };

  try {
    const response = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&completed_at=is.null&select=id`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      payload,
      "apply.store.step1_update",
    );
    if (!response.ok) return { updated: false, reason: "request_failed" };
    const rows = await returnedRows(response);
    return rows.length === 1
      ? { updated: true }
      : { updated: false, reason: "not_found" };
  } catch (error) {
    console.error("apply.store.step1_update: supabase patch failed", error);
    return { updated: false, reason: "request_failed" };
  }
}

/**
 * Updates an existing partial row for step 2 (goals + baseline).
 * Status stays "partial", last_completed_step advances to 2.
 */
export async function updateApplicationStep2({
  applicationId,
  step2,
}: {
  applicationId: string;
  step2: Step2Data;
}): Promise<UpdatePartialApplicationResult> {
  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const current = memoryStore.get(applicationId);
    if (!current || current.completed_at) {
      return { updated: false, reason: "not_found" };
    }
    memoryStore.set(applicationId, {
      ...current,
      updated_at: new Date().toISOString(),
      last_completed_step: 2,
      goal: step2.goal,
      consistency: step2.consistency,
    });
    return { updated: true };
  }

  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "apply.store: SUPABASE_URL unset - skipping step-2 update",
    );
    return { updated: false, reason: "missing_env" };
  }

  const payload = {
    updated_at: new Date().toISOString(),
    last_completed_step: 2,
    goal: step2.goal,
    consistency: step2.consistency,
  };

  try {
    const res = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&completed_at=is.null&select=id`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      payload,
      "apply.store.step2",
    );

    if (!res.ok) {
      return { updated: false, reason: "request_failed" };
    }

    const rows = await returnedRows(res);
    return rows.length === 1
      ? { updated: true }
      : { updated: false, reason: "not_found" };
  } catch (err) {
    console.error("apply.store.step2: supabase patch failed", err);
    return { updated: false, reason: "request_failed" };
  }
}

/**
 * Captures Step 3 selections as soon as the visitor makes them. Status stays
 * partial until the final submit succeeds, but the row now tells us whether
 * investment, commitment, or both were selected before abandonment.
 */
export async function updateApplicationStep3({
  applicationId,
  step3,
  lead,
}: {
  applicationId: string;
  step3: Step3Data;
  lead?: SubmissionLead;
}): Promise<UpdatePartialApplicationResult> {
  const monthlyInvestment = String(step3.monthly_investment || "").trim();
  const readyToCommit = String(step3.ready_to_commit || "").trim();
  const payload: SupabasePayload = {
    updated_at: new Date().toISOString(),
  };

  if (monthlyInvestment) {
    payload.monthly_investment = monthlyInvestment;
  }
  if (readyToCommit) {
    payload.ready_to_commit = readyToCommit;
  }
  if (monthlyInvestment && readyToCommit) {
    payload.last_completed_step = 3;
    if (lead) {
      const disqualification_reasons = disqualificationReasonsForLead(lead);
      payload.disqualified = disqualification_reasons.length > 0;
      payload.disqualification_reasons = disqualification_reasons;
      payload.activation_segment = activationSegmentForLead(lead);
      payload.activation_status = activationStatusForLead(lead);
    }
  }

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const current = memoryStore.get(applicationId);
    if (!current || current.completed_at) {
      return { updated: false, reason: "not_found" };
    }
    memoryStore.set(applicationId, { ...current, ...payload });
    return { updated: true };
  }

  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "apply.store: SUPABASE_URL unset - skipping step-3 update",
    );
    return { updated: false, reason: "missing_env" };
  }

  try {
    const res = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&completed_at=is.null&select=id`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      payload,
      "apply.store.step3",
    );

    if (!res.ok) {
      return { updated: false, reason: "request_failed" };
    }

    const rows = await returnedRows(res);
    return rows.length === 1
      ? { updated: true }
      : { updated: false, reason: "not_found" };
  } catch (err) {
    console.error("apply.store.step3: supabase patch failed", err);
    return { updated: false, reason: "request_failed" };
  }
}

/**
 * Finalizes a partial row after step 3 (investment + commitment).
 * Runs full qualification logic, promotes status to "qualified" or "downsell",
 * sets completed_at, last_completed_step = 3.
 */
export async function finalizeApplication({
  applicationId,
  lead,
  attribution = {},
}: {
  applicationId: string;
  lead: SubmissionLead;
  attribution?: ApplyAttribution | NormalizedApplyAttribution;
}): Promise<FinalizeApplicationResult> {
  const disqualification_reasons = disqualificationReasonsForLead(lead);
  const isDownsell = disqualification_reasons.length > 0;
  const now = new Date().toISOString();
  const selected_package = selectedPackageForLead(lead);
  const normalizedAttribution = normalizeApplyAttribution(attribution);
  const completionEventId = applicationSubmittedEventId(applicationId);
  const is_test = isTestApplicationLead(lead);

  const payload = {
    updated_at: now,
    completed_at: now,
    last_completed_step: 3,
    status: isDownsell ? "downsell" : "qualified",
    disqualified: isDownsell,
    // Update all lead fields in case step1/step2 patches were partial
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    ig_handle: lead.ig_handle || null,
    age_18_plus: lead.age_18_plus === "yes",
    ...marketingConsentPayload(lead, now),
    goal: lead.goal,
    consistency: lead.consistency,
    monthly_investment: lead.monthly_investment,
    ready_to_commit: lead.ready_to_commit,
    context: contextWithPackageIntent(lead) || null,
    selected_package: selected_package || null,
    disqualification_reasons,
    activation_segment: activationSegmentForLead(lead),
    activation_status: activationStatusForLead(lead),
    landing_path: normalizedAttribution.landingPath,
    source_utm_content: normalizedAttribution.utmContent || null,
    source_creative_id: normalizedAttribution.sourceCreativeId || null,
    current_utm_source: normalizedAttribution.currentUtmSource,
    current_utm_medium: normalizedAttribution.currentUtmMedium,
    current_utm_campaign: normalizedAttribution.currentUtmCampaign,
    current_utm_content: normalizedAttribution.currentUtmContent || null,
    current_source_creative_id:
      normalizedAttribution.currentSourceCreativeId || null,
    ...applicationCapturePayload(attribution, true),
    submission_event_id: completionEventId,
    is_test,
    submission_mode: submissionModeForLead(lead),
    test_run_id: is_test ? normalizedAttribution.testRunId || null : null,
  };

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const current = memoryStore.get(applicationId);
    if (!current) return { stored: false, reason: "not_found" };
    if (current.completed_at) {
      return (
        finalizedRowResult(applicationId, current, false) ||
        { stored: false, reason: "not_found" }
      );
    }
    const finalized = { ...current, ...payload };
    memoryStore.set(applicationId, finalized);
    return (
      finalizedRowResult(applicationId, finalized, true) ||
      { stored: false, reason: "request_failed" }
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "apply.store: SUPABASE_URL unset - skipping finalize",
    );
    return { stored: false, reason: "missing_env" };
  }

  try {
    const res = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&completed_at=is.null&select=*`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      payload,
      "apply.store.finalize",
    );

    if (!res.ok) {
      return { stored: false, reason: "request_failed" };
    }

    const rows = await returnedRows(res);
    if (rows.length === 1) {
      return (
        finalizedRowResult(applicationId, rows[0], true) ||
        { stored: false, reason: "request_failed" }
      );
    }

    const verify = await fetch(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&select=*&limit=1`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (!verify.ok) return { stored: false, reason: "request_failed" };
    const existingRows = await returnedRows(verify);
    if (existingRows.length === 1) {
      const existingResult = finalizedRowResult(
        applicationId,
        existingRows[0],
        false,
      );
      if (existingResult) return existingResult;
    }

    return { stored: false, reason: "not_found" };
  } catch (err) {
    console.error("apply.store.finalize: supabase patch failed", err);
    return { stored: false, reason: "request_failed" };
  }
}

/** "/?utm_source=ig&fbclid=…" -> "/". Anything that is not a site path -> "". */
export function landingPathOnly(raw: unknown): string {
  const value = String(raw ?? "").trim();
  if (!value.startsWith("/") || value.startsWith("//")) return "";
  return value.split(/[?#]/)[0].slice(0, 120);
}

export async function getCompletedApplicationForBooking(
  applicationId: string,
): Promise<CompletedApplicationForBooking | null> {
  if (!isValidApplicationId(applicationId)) return null;

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const row = memoryStore.get(applicationId);
    if (!row || row.status !== "qualified" || !row.completed_at) return null;
    return {
      applicationId,
      name: String(row.name || ""),
      email: String(row.email || ""),
      igHandle: String(row.ig_handle || ""),
      selectedPackage: String(row.selected_package || ""),
      utmSource: String(row.utm_source || ""),
      utmMedium: String(row.utm_medium || ""),
      utmCampaign: String(row.utm_campaign || ""),
      landingPath: landingPathOnly(row.landing_path),
      sourceCreativeId: String(row.source_creative_id || ""),
      gaClientId: String(row.ga_client_id || ""),
      isTest: Boolean(row.is_test),
    };
  }

  const config = getSupabaseConfig();
  if (!config) return null;

  try {
    const response = await fetch(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&status=eq.qualified&completed_at=not.is.null&select=id,name,email,ig_handle,selected_package,utm_source,utm_medium,utm_campaign,landing_path,source_creative_id,ga_client_id,is_test&limit=1`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (!response.ok) return null;
    const rows = await returnedRows(response);
    if (rows.length !== 1) return null;
    const row = rows[0];
    return {
      applicationId,
      name: String(row.name || ""),
      email: String(row.email || ""),
      igHandle: String(row.ig_handle || ""),
      selectedPackage: String(row.selected_package || ""),
      utmSource: String(row.utm_source || ""),
      utmMedium: String(row.utm_medium || ""),
      utmCampaign: String(row.utm_campaign || ""),
      landingPath: landingPathOnly(row.landing_path),
      sourceCreativeId: String(row.source_creative_id || ""),
      gaClientId: String(row.ga_client_id || ""),
      isTest: Boolean(row.is_test),
    };
  } catch (error) {
    console.error("apply.booking.verify: lookup failed", error);
    return null;
  }
}

/**
 * The other half of claimApplicationBookingStart: the booking actually
 * happened.
 *
 * Until 2026-09-26 nothing on this site ever wrote it. The row carried
 * booking_scheduled_at, booked_at, booking_status and the two calendly_* uris
 * from migration 045, and every one of them stayed null on all 35 real
 * applications, because the flow redirected to calendly.com and the reader was
 * gone. The `bookings` table has 27 rows and none of them is an origin_type of
 * site_application.
 *
 * With the calendar embedded in the page, Calendly posts
 * `calendly.event_scheduled` to us, so the moment is ours to record.
 *
 * Idempotent by construction, not by convention: the PATCH filters on
 * booking_scheduled_at=is.null, so a replayed message — a double post, a
 * refresh, a second listener — updates zero rows and returns claimed:false.
 * This deliberately does NOT write the `bookings` table: the Railway
 * reconciler owns that artifact and two writers on one artifact is a defect we
 * have already paid for once.
 *
 * And it is not a claim that an application equals a booking. It records what
 * Calendly said happened, with Calendly's own uris attached so the reconciler
 * can agree or disagree with us later.
 */
export async function claimApplicationBookingScheduled(
  applicationId: string,
  calendly: { eventUri?: string; inviteeUri?: string },
): Promise<{ claimed: boolean }> {
  if (!isValidApplicationId(applicationId)) return { claimed: false };

  const now = new Date().toISOString();
  const patch: Record<string, string> = {
    booking_scheduled_at: now,
    booked_at: now,
    booking_status: "booked",
  };
  if (calendly.eventUri) patch.calendly_scheduled_event_uri = calendly.eventUri;
  if (calendly.inviteeUri) patch.calendly_invitee_uri = calendly.inviteeUri;

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const row = memoryStore.get(applicationId);
    if (!row || row.is_test || row.booking_scheduled_at) return { claimed: false };
    memoryStore.set(applicationId, { ...row, ...patch });
    return { claimed: true };
  }

  const config = getSupabaseConfig();
  if (!config) return { claimed: false };

  try {
    const response = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&completed_at=not.is.null&is_test=eq.false&booking_scheduled_at=is.null&select=id`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      patch,
      "apply.booking.scheduled",
    );
    if (!response) return { claimed: false };
    const rows = await returnedRows(response);
    return { claimed: rows.length === 1 };
  } catch (error) {
    console.error("apply.booking.scheduled: supabase patch failed", error);
    return { claimed: false };
  }
}

export async function claimApplicationBookingStart(
  applicationId: string,
): Promise<{ claimed: boolean; eventId: string }> {
  const eventId = bookingStartedEventId(applicationId);
  if (!isValidApplicationId(applicationId)) return { claimed: false, eventId };

  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    const row = memoryStore.get(applicationId);
    if (
      !row ||
      row.status !== "qualified" ||
      !row.completed_at ||
      row.is_test ||
      row.booking_started_at
    ) {
      return { claimed: false, eventId };
    }
    memoryStore.set(applicationId, {
      ...row,
      booking_started_at: new Date().toISOString(),
      booking_started_event_id: eventId,
    });
    return { claimed: true, eventId };
  }

  const config = getSupabaseConfig();
  if (!config) return { claimed: false, eventId };

  try {
    const response = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(applicationId)}&status=eq.qualified&completed_at=not.is.null&is_test=eq.false&booking_started_at=is.null&select=id`,
      {
        method: "PATCH",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      {
        booking_started_at: new Date().toISOString(),
        booking_started_event_id: eventId,
      },
      "apply.booking.start",
    );
    if (!response.ok) return { claimed: false, eventId };
    const rows = await returnedRows(response);
    return { claimed: rows.length === 1, eventId };
  } catch (error) {
    console.error("apply.booking.start: claim failed", error);
    return { claimed: false, eventId };
  }
}

/**
 * The booking event, and what its numbered question slots MEAN.
 *
 * Calendly addresses custom questions positionally — `a1` is "the first question on
 * this event", nothing more. That made a silent data bug possible: `a1` carried the
 * package note while question 1 was "What is your Instagram @?", so every site booking
 * overwrote the applicant's handle (observed live 2026-09-23).
 *
 * The URL and the slot map are declared TOGETHER on purpose. A different event has a
 * different question order, so changing `url` without restating `instagramSlot` is the
 * same bug with different operands — and Calendly gives no runtime signal when an
 * answer lands in the wrong box. A test asserts this pairing is still the one that was
 * verified against the live form.
 *
 * ⚠️ A website-only event type has been proposed to Kris, on which question 1 would be
 * "Age and Occupation". If that ships, this map MUST be updated in the same change.
 */
export const CALENDLY_BOOKING_EVENT = {
  url: "https://calendly.com/kristitan/assessment",
  /** Slot of "What is your Instagram @?" — verified against the live form 2026-09-23. */
  instagramSlot: "a1",
  verifiedOn: "2026-09-23",
} as const;

/**
 * The same booking URL with NO personal data in it, plus the prefill object
 * Calendly's widget accepts separately.
 *
 * The redirect could carry name and email in the query string because that URL
 * only ever existed as a Location header. The embed cannot: `/apply/book` is a
 * server component, so anything handed to a client component is serialised into
 * the RSC payload inside the page's own HTML, where every third-party script,
 * extension and session recorder on the page can read it. Independent review
 * 2026-09-27 called this the blocking defect of the embed, and it was right.
 *
 * So the URL keeps only the attribution the reconciler matches on, and the
 * identity rides in `prefill`, which the widget writes straight into the iframe
 * without it touching our document.
 */
export function buildCalendlyEmbed(
  application: CompletedApplicationForBooking,
  options?: { month?: string; date?: string },
): { url: string; prefill: Record<string, unknown> } {
  const calendlyUrl = "https://calendly.com/kristitan/assessment";
  const [firstName, ...rest] = application.name.split(/\s+/);

  const params = new URLSearchParams({
    utm_source: application.utmSource || "site",
    utm_medium: application.utmMedium || "apply",
    utm_campaign: application.utmCampaign || "apply_funnel",
    utm_content: applicationUtmContent(application.applicationId),
  });
  if (application.sourceCreativeId) {
    params.set("utm_id", application.sourceCreativeId);
  }
  if (application.selectedPackage) {
    params.set("utm_term", application.selectedPackage);
  }
  const month = options?.month || (options?.date ? options.date.slice(0, 7) : undefined);
  if (month) {
    params.set("month", month);
  }
  if (options?.date) {
    params.set("date", options.date);
  }

  const prefill: Record<string, unknown> = {
    name: application.name,
    email: application.email,
  };
  if (firstName) prefill.firstName = firstName;
  if (rest.length) prefill.lastName = rest.join(" ");
  if (application.selectedPackage) {
    prefill.customAnswers = { a1: packageIntentNote(application.selectedPackage) };
  }

  return { url: `${calendlyUrl}?${params.toString()}`, prefill };
}

export function buildCalendlyBookingUrl(
  application: CompletedApplicationForBooking,
  options?: { month?: string; date?: string },
): string {
  const calendlyUrl = CALENDLY_BOOKING_EVENT.url;
  const [firstName, ...rest] = application.name.split(/\s+/);
  // Channel attribution flows first-touch from resolveApplyAttribution (ig /
  // youtube / search / direct). If a row somehow carried no source, fall back to
  // a legible site/apply pair rather than an empty utm — never invent a granular
  // source. name/email are Calendly prefill (intended); no other contact PII is
  // added to the URL.
  const params = new URLSearchParams({
    name: application.name,
    email: application.email,
    utm_source: application.utmSource || "site",
    utm_medium: application.utmMedium || "apply",
    utm_campaign: application.utmCampaign || "apply_funnel",
    utm_content: applicationUtmContent(application.applicationId),
  });
  if (firstName) params.set("first_name", firstName);
  if (rest.length) params.set("last_name", rest.join(" "));
  // Forward the captured ad/creative id so a booked call traces back to the
  // specific ad/creative, not just the channel. GA4 reads this as utm_id.
  if (application.sourceCreativeId) {
    params.set("utm_id", application.sourceCreativeId);
  }
  if (application.gaClientId) params.set("ga_client_id", application.gaClientId);
  // a1 is Calendly's FIRST CUSTOM QUESTION, not a free-form note field. On the
  // "Body Re-comp Assessment" event that question is "What is your Instagram @?",
  // so writing the package note here put "Package interest: VIP 1:1 Coaching" into
  // the Instagram box — observed live on 2026-09-23. Kris lost the handle AND the
  // package intent arrived mislabelled as one.
  //
  // The handle is already collected on /apply, so a1 now carries the answer the
  // question actually asks. The package intent travels as utm_term, where it does
  // not overwrite an answer, and it also reaches Kris in the application
  // notification email (app/apply/notify.ts) regardless.
  if (application.igHandle) {
    params.set(CALENDLY_BOOKING_EVENT.instagramSlot, application.igHandle);
  }
  if (application.selectedPackage) {
    params.set("utm_term", application.selectedPackage);
  }
  const month = options?.month || (options?.date ? options.date.slice(0, 7) : undefined);
  if (month) {
    params.set("month", month);
  }
  if (options?.date) {
    params.set("date", options.date);
  }
  return `${calendlyUrl}?${params.toString()}`;
}

export async function storeSiteApplication({
  applicationId,
  lead,
  disqualified,
  attribution,
  metadata,
}: {
  applicationId: string;
  lead: SubmissionLead;
  disqualified: boolean;
  attribution?: ApplyAttribution | NormalizedApplyAttribution;
  metadata?: RequestMetadata;
}): Promise<StoreSiteApplicationResult> {
  const memoryStore = memoryApplicationStore();
  if (memoryStore) {
    if (memoryStore.has(applicationId)) {
      return { stored: false, reason: "request_failed" };
    }
    memoryStore.set(
      applicationId,
      buildSiteApplicationPayload({
        applicationId,
        lead,
        disqualified,
        attribution,
        metadata,
      }),
    );
    return { stored: true };
  }

  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "apply.store: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY unset - skipping durable application capture",
    );
    return { stored: false, reason: "missing_env" };
  }

  const payload = buildSiteApplicationPayload({
    applicationId,
    lead,
    disqualified,
    attribution,
    metadata,
  });

  try {
    const res = await sendSupabasePayload(
      `${config.url}/rest/v1/${SUPABASE_TABLE}?select=id`,
      {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      },
      payload,
      "apply.store",
    );

    if (!res.ok) {
      return { stored: false, reason: "request_failed" };
    }

    const rows = await returnedRows(res);
    return rows.length === 1
      ? { stored: true }
      : { stored: false, reason: "request_failed" };
  } catch (err) {
    console.error("apply.store: supabase insert failed", err);
    return { stored: false, reason: "request_failed" };
  }
}

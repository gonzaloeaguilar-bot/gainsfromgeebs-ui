"use client";

import { takeApplyHandoff } from "@/lib/applyHandoff";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  createPartialApplicationAction,
  finalizeApplicationAction,
  updateStep2Action,
  updateStep3Action,
} from "./actions";
import {
  APPLY_SUBMIT_CONSENT_DETAIL,
  APPLY_SUBMIT_CONSENT_LINE,
} from "./application";
import {
  nextStepFieldsForPackage,
  normalizePackageIntent,
  packageIntentLabel,
} from "@/lib/packageIntent";
import { resolveApplyAttribution } from "@/lib/applySourceAttribution";
import {
  coachingFromPrice,
  coachingMonthlyRange,
  priceLabel,
  termMonths,
} from "@/lib/offerCatalog";
import {
  BAND_AT_OR_ABOVE_FLOOR,
  BAND_BELOW_FLOOR,
  BAND_NOT_SURE,
  BAND_SELF_SERVE,
} from "@/lib/investmentBands";

import {
  normalizeApplicationCapture,
  readGaSessionId,
  type GaGet,
} from "@/lib/applicationCapture";

const GOAL_OPTIONS = [
  { value: "fat_loss", label: "Fat loss" },
  { value: "muscle_gain", label: "Muscle gain" },
  { value: "performance", label: "Performance" },
  { value: "confidence", label: "Confidence" },
];

const CONSISTENCY_OPTIONS = [
  { value: "never", label: "Barely / never" },
  { value: "occasional", label: "Occasionally" },
  { value: "mostly", label: "Mostly consistent" },
];

// These send the CURRENT band constants — 400_plus, 100_400, under_100 and
// not_sure_value_clear. An earlier draft of this change kept the old values
// (500_plus, 300_500, lower_cost_first) to protect attribution, and this
// comment still described that when the rename landed a few commits later.
// The retired names are still parsed everywhere they are read, so stored rows
// and saved drafts keep their meaning; nothing writes them any more.
//
// What changed for the person is the point of all of it: they used to pick a
// preference and be silently scored into a budget band nobody showed them.
// Now the number is on the screen next to the choice, so the answer means
// something.
//
// The ask is willingness, never income. The DM bot migrated away from an income
// gate on purpose (titan-dm-agent issue #650) and two regression tests now
// forbid the old "you working right now" phrasing — employment does not predict
// purchase, and asking for a salary on a public form reads as invasive. The
// shape below matches the bot's INVESTMENT_READINESS_QUESTION: conditional on
// fit, willing and able, right now.
// A floor, not a range: "$400+" anchors up and leaves the prepay terms as the
// way the number comes down, instead of inviting someone to negotiate from the
// bottom of a range. Both values are read from the catalog.
const coachingFrom = coachingFromPrice();
// What the lighter plans start at — Weekly Review sits below the main line, so
// it is named as lighter rather than as a cheaper Standard. Without this the
// screen would read "$400+" and then list a $300 plan under it.
const lighterFrom = coachingMonthlyRange().min;
const prepayMonths = termMonths("standard-check-in");

const NEXT_STEP_OPTIONS = [
  {
    value: "strategy_call",
    label: "Ready to invest at that level now",
    description: `VIP 1:1, ${priceLabel("vip-1on1")}.`,
    monthly_investment: BAND_AT_OR_ABOVE_FLOOR,
    ready_to_commit: "yes",
  },
  {
    value: "standard_fit",
    label: "Ready, but I'd want the lower end",
    // Gonzalo, refining his own fix: keep each number in its own place. The
    // top note now speaks only for Standard coaching ($400+); this is the one
    // spot that names the lighter option, plainly, without repeating $400.
    description: `Lighter options starting at $${lighterFrom} a month.`,
    monthly_investment: BAND_BELOW_FLOOR,
    ready_to_commit: "yes",
  },
  {
    value: "lower_cost_first",
    label: "Interested, but not at that level yet",
    description: `Join the ${priceLabel("science-based-community")} community today.`,
    monthly_investment: BAND_SELF_SERVE,
    ready_to_commit: "talk_it_through",
  },
  {
    value: "not_sure",
    label: "Not sure until I talk to Kris",
    description: "Kris points you to the right one.",
    monthly_investment: BAND_NOT_SURE,
    ready_to_commit: "talk_it_through",
  },
] as const;

// Every figure shown to an applicant is computed from the offer catalog, so a
// price change there moves this copy too. Nothing here is typed by hand.

function step3FieldsFromChoice(value: string) {
  const option = NEXT_STEP_OPTIONS.find((item) => item.value === value);
  return {
    monthly_investment: option?.monthly_investment ?? "",
    ready_to_commit: option?.ready_to_commit ?? "",
  };
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p
      id={id}
      className="mt-1.5 text-[13px] text-[#ff8a8a]"
      role="alert"
    >
      {msg}
    </p>
  );
}

function FormMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      className="text-[14px] text-[#ff8a8a]"
      data-form-message
      role="alert"
      tabIndex={-1}
    >
      {message}
    </p>
  );
}

function PackageIntentBanner({ label }: { label: string }) {
  if (!label) return null;

  return (
    // One line. It is a confirmation of something the visitor just tapped,
    // not a section — and in the sheet the two-line version was the last 25px
    // between the submit button and the fold.
    /* py-1.5 on a short viewport: in the sheet on a real iPhone this row was
       the last 7px between the submit button and the fold. It is a
       confirmation of something the visitor just tapped, so it earns one line
       and not a pixel more. */
    <div className="apply-intent flex flex-wrap items-baseline gap-x-2 rounded-xl border border-line bg-ink3/40 px-4 py-2.5">
      <span className="eyebrow text-mute">Package interest</span>
      <span className="text-[15px] text-bone">{label}</span>
    </div>
  );
}

type CalendarPickData = {
  date?: string;
  start_time?: string;
};

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatCalendarPickDisplay(
  raw: string | CalendarPickData | null | undefined,
): string {
  if (!raw) return "";
  const iso = typeof raw === "string" ? raw : raw.start_time || raw.date || "";
  if (!iso) return "";

  // If already formatted like "Wed Oct 1, 11:15"
  if (/^[A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d+/.test(iso)) {
    return iso;
  }

  try {
    const d = new Date(iso);
    if (!isNaN(d.getTime())) {
      const weekday = WEEKDAY_NAMES[d.getDay()];
      const month = MONTH_NAMES[d.getMonth()];
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${weekday} ${month} ${day}, ${hours}:${minutes}`;
    }
  } catch {
    // fallback
  }

  if (typeof raw === "object" && raw.date) {
    try {
      const [y, m, d] = raw.date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      const weekday = WEEKDAY_NAMES[dateObj.getDay()];
      const month = MONTH_NAMES[dateObj.getMonth()];
      return `${weekday} ${month} ${d}`;
    } catch {
      return raw.date;
    }
  }

  return typeof raw === "string" ? raw : "";
}

function CalendarPickBanner({ pick }: { pick?: string }) {
  if (!pick) return null;

  return (
    <div
      className="calendar-pick-banner flex flex-wrap items-baseline gap-x-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-amber-200"
      data-calendar-pick-banner
    >
      <span className="eyebrow text-amber-400">Held for you</span>
      <span className="text-[14px] font-medium text-bone">
        Your pick: {pick}
      </span>
    </div>
  );
}

// Reads the GA4 client_id from the _ga cookie.
// Format: GA1.1.<client_id> → returns the "<digits>.<digits>" portion.
function readGaClientId(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("_ga="));
  if (!match) return "";
  const raw = match.slice("_ga=".length);
  const parts = raw.split(".");
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : "";
}

// Wizard step state — client-only, lives in useState.
type WizardStep = 1 | 2 | 3;

type Step1Fields = {
  name: string;
  email: string;
  phone: string;
  ig_handle: string;
  age_18_plus: string; // "yes" | ""
  email_marketing_consent: string;
  sms_marketing_consent: string;
};

type Step2Fields = {
  goal: string;
  consistency: string;
};

type Step3Fields = {
  next_step_choice: string;
  monthly_investment: string;
  ready_to_commit: string;
  context: string;
};

type Step3Errors = Record<string, string>;

const EMPTY_STEP1: Step1Fields = {
  name: "",
  email: "",
  phone: "",
  ig_handle: "",
  age_18_plus: "",
  email_marketing_consent: "",
  sms_marketing_consent: "",
};
const EMPTY_STEP2: Step2Fields = { goal: "", consistency: "" };
const EMPTY_STEP3: Step3Fields = {
  next_step_choice: "",
  monthly_investment: "",
  ready_to_commit: "",
  context: "",
};

type Attribution = {
  source_path: string;
  landing_path: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  source_creative_id: string;
  current_utm_source: string;
  current_utm_medium: string;
  current_utm_campaign: string;
  current_utm_content: string;
  current_source_creative_id: string;
  test_run_id: string;
  ga_client_id: string;
  ga_session_id: string;
  analytics_consent: string;
  entry_source: string;
  entry_content: string;
  bridge_version: string;
};

const DEFAULT_ATTRIBUTION: Attribution = {
  source_path: "/apply",
  landing_path: "/apply",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  source_creative_id: "",
  current_utm_source: "",
  current_utm_medium: "",
  current_utm_campaign: "",
  current_utm_content: "",
  current_source_creative_id: "",
  test_run_id: "",
  ga_client_id: "",
  ga_session_id: "",
  analytics_consent: "unknown",
  entry_source: "",
  entry_content: "",
  bridge_version: "",
};

const APPLY_DRAFT_KEY = "geebs_apply_draft_v2";

type ApplyDraft = {
  step: WizardStep;
  applicationId: string;
  editReceipt: string;
  selectedPackage: string;
  variant: "contact_first" | "goals_first";
  step1Data: Step1Fields;
  step2Data: Step2Fields;
  step3Data: Step3Fields;
  attribution: Attribution;
};

function readDraft(): ApplyDraft | null {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(APPLY_DRAFT_KEY) || "");
    if (!parsed || typeof parsed !== "object") return null;
    if (![1, 2, 3].includes(parsed.step)) return null;
    return parsed as ApplyDraft;
  } catch {
    return null;
  }
}

/** Progress indicator — "Step N of <total>" */
/**
 * The same two controls, in the same place, on all three steps: the way out on
 * the left, the way on to the right.
 *
 * Asked for by Gonzalo from a screenshot of step 3, plus "the continue CTA is
 * too small on step 1". Both are the same defect — the three steps had three
 * different action rows. Measured in production on the Safari engine before
 * this change, at iPhone 14 width:
 *
 *   step 1  Continue  140px   btn btn-primary
 *   step 2  Continue  342px   btn btn-primary w-full sm:w-auto
 *   step 3  Submit    219px   btn btn-primary
 *
 * The primary takes the rest of the row (flex-1) rather than a fixed width, so
 * it is the big target on every step without being pinned to a full width that
 * leaves no room for the control beside it.
 */
/**
 * One control, the full width of the step, and the last thing on it.
 *
 * Gonzalo, 2026-09-21, looking at step 2 in production: "yo solo quiero que los
 * CTAs corran de lado a lado", "nada debería salir después del CTA", and the
 * way back belongs "en la parte superior derecha".
 *
 * So the escape hatch moved into the step header (see StepIndicator) and this
 * is the primary alone. A step now reads: the question, then one button across
 * the screen, and nothing competing with it underneath.
 */
function ActionRow({ label, busy }: { label: string; busy: boolean }) {
  return (
    <div className="apply-actions pt-0 sm:pt-2">
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={busy}
      >
        {label}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

/**
 * The step counter, and the way out of the step, top right.
 *
 * Back is not a peer of Continue — it is pressed rarely, and putting it beside
 * the primary either shrinks the primary or puts a second red-adjacent target
 * next to the one that matters. Up here it sits where a reader already looks to
 * work out where they are, which is the same moment they want to step back.
 * Step 1 has nothing to go back to, so it gets Exit instead.
 */
function StepIndicator({
  step,
  total = 3,
  onBack,
  busy = false,
}: {
  step: WizardStep;
  total?: number;
  onBack?: () => void;
  busy?: boolean;
}) {
  const steps = ([1, 2, 3] as WizardStep[]).slice(0, total);
  return (
    /* gap and connectors tighten on a phone: at 375 the dots, the counter and
       Back together overflowed the row, and both bits of text wrapped to two
       lines. */
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-8">
      {steps.map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span
            className={[
              "w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-semibold leading-none",
              n < step
                ? "bg-cloudText text-[#0a0a0a]"
                : n === step
                  ? "bg-bone text-[#0a0a0a]"
                  : "bg-line2 text-mute",
            ].join(" ")}
          >
            {n < step ? "✓" : n}
          </span>
          {n < total && (
            <span
              className={[
                "block h-px w-5 sm:w-8",
                n < step ? "bg-cloudText" : "bg-line2",
              ].join(" ")}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
      <span className="ml-1 eyebrow text-mute whitespace-nowrap sr-only sm:not-sr-only">
        Step {step} of {total}
      </span>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="btn btn-secondary btn-compact ml-auto shrink-0 whitespace-nowrap disabled:opacity-50"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      ) : (
        <Link
          href="/"
          className="btn btn-secondary btn-compact ml-auto shrink-0 whitespace-nowrap"
        >
          Exit
        </Link>
      )}
    </div>
  );
}

export default function ApplyForm() {
  const [step, setStep] = useState<WizardStep>(1);
  const [applicationId, setApplicationId] = useState<string>("");
  const [editReceipt, setEditReceipt] = useState<string>("");
  const [step1Data, setStep1Data] = useState<Step1Fields>(EMPTY_STEP1);
  const [step2Data, setStep2Data] = useState<Step2Fields>(EMPTY_STEP2);
  const [step3Data, setStep3Data] = useState<Step3Fields>(EMPTY_STEP3);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const [consentOpen, setConsentOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [calendarPick, setCalendarPick] = useState<CalendarPickData | null>(null);
  const [attributionData, setAttributionData] = useState<Attribution>(
    DEFAULT_ATTRIBUTION,
  );
  const lastStep3AutosaveRef = useRef("");
  const stepSubmitLockRef = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const draftLoadedRef = useRef(false);

  // Wizard order. SHIPPED 2026-09-17: goals-first is now the only arm (goals ->
  // contact -> invest; step 1 is two tap-only questions, no typing).
  //
  // The A/B that was meant to decide this ran from 2026-07-22 and could never
  // be read. GA4 Data API over 2026-07-22..2026-09-16 returns
  // customEvent:apply_variant = "(not set)" on 268 of 269
  // apply_variant_assigned events — one usable data point in eight weeks,
  // because the custom dimension was registered after collection began and
  // GA4 does not backfill.
  //
  // Meanwhile the SSR default was contact_first, so every visitor was served
  // the arm this file already identified as the leak (see the 2026-07-22 note
  // below), and BigQuery portfolio.ga4_event_daily shows the cost: 197
  // sessions saw the form in 60d and 33 started it (17%), while 7 of the 9
  // stored applications reached step 3 — people who start, finish.
  //
  // Original 2026-07-22 finding, unchanged and still the basis for shipping:
  // 28d GA4 showed 36 form impressions but only ~4 humans ever started the
  // form — asking name/email/phone up front was the leak.
  //
  // The type keeps both values so stored/cookie reads from the holdout era
  // parse cleanly; nothing assigns contact_first any more.
  const [variant, setVariant] = useState<"contact_first" | "goals_first">(
    "goals_first",
  );

  // A step transition is the only thing that clears the submit lock on a
  // success path. Handlers clear it themselves only when they fail and the
  // step does NOT change, so a second rapid tap can never advance twice.
  useEffect(() => {
    stepSubmitLockRef.current = false;
  }, [step]);

  // Attribution — captured once on mount, forwarded on every step.
  const attributionRef = useRef<Attribution>(DEFAULT_ATTRIBUTION);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageIntent = normalizePackageIntent(params.get("package"));
    const draft = readDraft();

    let pickFromSession: CalendarPickData | null = null;
    try {
      const stored = window.sessionStorage.getItem("geebs_calendar_pick");
      if (stored) {
        pickFromSession = JSON.parse(stored);
      }
    } catch {}
    const pickFromUrl = params.get("pick");
    if (pickFromUrl || pickFromSession) {
      const pickObj: CalendarPickData = pickFromSession || {
        date: pickFromUrl?.includes("T")
          ? pickFromUrl.split("T")[0]
          : pickFromUrl || "",
        start_time: pickFromUrl || "",
      };
      // Reads the URL query and sessionStorage, neither of which exists on
      // the server, so this cannot be a lazy initial value without a
      // hydration mismatch on the one form this funnel depends on.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCalendarPick(pickObj);
    }

    const resolvedAttribution = resolveApplyAttribution({
      pathname: window.location.pathname,
      search: window.location.search,
      referrer: document.referrer,
      currentOrigin: window.location.origin,
      storage: window.sessionStorage,
    });
    const capture = normalizeApplicationCapture({
      entrySource: params.get("entry_source"),
      entryContent: params.get("entry_content"),
      bridgeVersion: params.get("bridge_version"),
    });
    const resolved: Attribution = {
      ga_session_id: "",
      analytics_consent: "unknown",
      entry_source: capture.entrySource || "",
      entry_content: capture.entryContent || "",
      bridge_version: capture.bridgeVersion || "",
      source_path: resolvedAttribution.source_path,
      landing_path: resolvedAttribution.landing_path,
      utm_source: resolvedAttribution.utm_source,
      utm_medium: resolvedAttribution.utm_medium,
      utm_campaign: resolvedAttribution.utm_campaign,
      utm_content: resolvedAttribution.utm_content,
      source_creative_id: resolvedAttribution.source_creative_id,
      current_utm_source: resolvedAttribution.current_utm_source,
      current_utm_medium: resolvedAttribution.current_utm_medium,
      current_utm_campaign: resolvedAttribution.current_utm_campaign,
      current_utm_content: resolvedAttribution.current_utm_content,
      current_source_creative_id:
        resolvedAttribution.current_source_creative_id,
      test_run_id: resolvedAttribution.test_run_id,
      ga_client_id: readGaClientId(),
    };
    const nextAttribution: Attribution = draft
      ? {
          ...DEFAULT_ATTRIBUTION,
          ...draft.attribution,
          analytics_consent: "unknown",
          ...(resolved.entry_source ? { entry_source: resolved.entry_source, entry_content: resolved.entry_content, bridge_version: resolved.bridge_version } : {}),
          source_path: resolved.source_path,
          current_utm_source: resolved.current_utm_source,
          current_utm_medium: resolved.current_utm_medium,
          current_utm_campaign: resolved.current_utm_campaign,
          current_utm_content: resolved.current_utm_content,
          current_source_creative_id: resolved.current_source_creative_id,
          test_run_id: resolved.test_run_id || draft.attribution.test_run_id,
          ga_client_id: resolved.ga_client_id || draft.attribution.ga_client_id,
        }
      : resolved;
    attributionRef.current = nextAttribution;
    const goalParam = params.get("goal");
    const initialGoal =
      draft?.step2Data?.goal ||
      (goalParam === "recomp"
        ? "performance"
        : goalParam &&
            ["fat_loss", "muscle_gain", "performance", "confidence"].includes(
              goalParam,
            )
          ? goalParam
          : "");
    const initialConsistency = draft?.step2Data?.consistency || "";
    const barrierParam = params.get("barrier");
    const daysParam = params.get("days");
    // What the entry page already learned (the recomp calculator's result,
    // which the reader saw listed as "What Kris will see" before clicking).
    // Read from sessionStorage, never the URL — see lib/applyHandoff.ts.
    const handoff = takeApplyHandoff(params.get("entry_content"));
    const initialContext =
      draft?.step3Data?.context ||
      (barrierParam
        ? `Primary barrier: ${barrierParam}${daysParam ? `, target days: ${daysParam}` : ""}`
        : handoff);

    const raf = window.requestAnimationFrame(() => {
      setApplicationId(draft?.applicationId || crypto.randomUUID());
      setEditReceipt(draft?.editReceipt || "");
      setStep(draft?.step || 1);
      setStep1Data(draft?.step1Data || EMPTY_STEP1);
      setStep2Data(
        draft?.step2Data || {
          goal: initialGoal,
          consistency: initialConsistency,
        },
      );
      setStep3Data(
        draft?.step3Data || {
          ...EMPTY_STEP3,
          context: initialContext,
        },
      );
      // A draft saved during the holdout era carries variant="contact_first".
      // Honouring it would re-serve the retired arm to the people most likely
      // to convert — the ones who already started an application — so the
      // stored arm is deliberately ignored.
      setVariant("goals_first");
      setSelectedPackage(packageIntent || draft?.selectedPackage || "");
      setAttributionData(nextAttribution);
      draftLoadedRef.current = true;
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!draftLoadedRef.current || !applicationId || isNavigating) return;
    const draft: ApplyDraft = {
      step,
      applicationId,
      editReceipt,
      selectedPackage,
      variant,
      step1Data,
      step2Data,
      step3Data,
      attribution: attributionData,
    };
    try {
      window.sessionStorage.setItem(APPLY_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Privacy modes can block storage; the mounted form still retains data.
    }
  }, [
    applicationId,
    attributionData,
    editReceipt,
    isNavigating,
    selectedPackage,
    step,
    step1Data,
    step2Data,
    step3Data,
    variant,
  ]);

  useEffect(() => {
    if (!draftLoadedRef.current) return;
    const raf = window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>("[data-step-heading]")
        ?.focus();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [step]);

  const calendarPickLabel = formatCalendarPickDisplay(calendarPick);
  const calendarDate =
    calendarPick?.date ||
    (calendarPick?.start_time?.includes("T")
      ? calendarPick.start_time.split("T")[0]
      : "");
  const calendarMonth = calendarDate ? calendarDate.slice(0, 7) : "";

  // Analytics event helper — prefers the site wrapper so events inherit the
  // same route/page context as click tracking; falls back to raw gtag.
  const fireEvent = useCallback(
    (eventName: string, params?: Record<string, string>) => {
      try {
        if (
          typeof window !== "undefined" &&
          typeof window.geebsTrackEvent === "function"
        ) {
          window.geebsTrackEvent(eventName, {
            ...params,
            ...(calendarPick ? { calendar_pick: "true" } : {}),
            source_path: attributionRef.current.source_path,
            utm_source: attributionRef.current.utm_source,
            utm_medium: attributionRef.current.utm_medium,
            utm_campaign: attributionRef.current.utm_campaign,
            test_run_id: attributionRef.current.test_run_id,
            submission_mode: attributionRef.current.test_run_id ? "test" : "live",
          });
          return;
        }
        // Deliberately NO raw-gtag fallback. A second writer bypasses the shared
        // parameter block and the contract leg, which is how one site ends up
        // with two vocabularies. If geebsTrackEvent is absent the tag has not
        // booted (or the visitor opted out) and the event is correctly dropped.
      } catch {
        // GA blocked — not a critical path, swallow silently.
      }
    },
    [calendarPick],
  );

  const showErrors = useCallback(
    (nextErrors: Record<string, string>, message = "") => {
      setErrors(nextErrors);
      setGlobalMessage(message);

      // Fire form_error event for the first error field
      if (Object.keys(nextErrors).length > 0) {
        const firstName = Object.keys(nextErrors)[0];
        const errorMessage = nextErrors[firstName] || "";
        // Contract params are lowercase slugs, never human copy: the message
        // is collapsed to an error_code so the values stay groupable in GA4.
        const errorCode = errorMessage
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .slice(0, 40) || "invalid";
        fireEvent("form_error", {
          form_id: "apply",
          field: firstName,
          error_code: errorCode,
          step: String(step),
        });
      }

      window.requestAnimationFrame(() => {
        const firstName = Object.keys(nextErrors)[0];
        const safeFieldName = firstName?.replace(/[^a-z0-9_]/gi, "");
        const target = firstName
          ? formRef.current?.querySelector<HTMLElement>(
              `[name="${safeFieldName}"]`,
            )
          : null;
        (target || formRef.current?.querySelector<HTMLElement>("[data-form-message]"))
          ?.focus();
      });
    },
    [fireEvent, step],
  );

  // Fire view_apply on first mount.
  useEffect(() => {
    fireEvent("view_apply");
  }, [fireEvent]);

  // Single arm. Persist it and log the entry so the start-rate denominator
  // survives, and actively overwrite the holdout-era value: a returning
  // visitor with apply_wizard_variant="contact_first" in localStorage would
  // otherwise stay pinned to the retired arm for the 90-day cookie life and
  // never see this fix.
  useEffect(() => {
    const v: "contact_first" | "goals_first" = "goals_first";
    try {
      if (window.localStorage.getItem("apply_wizard_variant") !== v) {
        window.localStorage.setItem("apply_wizard_variant", v);
      }
      document.cookie = `apply_wizard_variant=${v}; path=/; max-age=7776000; samesite=lax`;
    } catch {
      // Storage unavailable (private mode, blocked cookies). The arm is a
      // constant now, so there is nothing to recover — render it anyway.
    }
    // Apply the variant after paint rather than synchronously in the effect —
    // the form is below the fold so there's no visible flash, and this avoids
    // the cascading-render lint on synchronous setState-in-effect.
    const raf = window.requestAnimationFrame(() => setVariant(v));

    // Denominator event for the experiment. gtag loads afterInteractive, so it
    // may not be ready at mount — poll briefly and fire exactly once when it is
    // (so neither arm loses assignments to a load race or double-counts).
    let fired = false;
    const tryFire = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (fired || typeof (window as any).gtag !== "function") return fired;
      fired = true;
      fireEvent("apply_variant_assigned", { apply_variant: v });
      return true;
    };
    let poll: ReturnType<typeof setInterval> | undefined;
    let stop: ReturnType<typeof setTimeout> | undefined;
    if (!tryFire()) {
      poll = setInterval(() => {
        if (tryFire() && poll) clearInterval(poll);
      }, 300);
      stop = setTimeout(() => {
        if (poll) clearInterval(poll);
      }, 6000);
    }
    return () => {
      window.cancelAnimationFrame(raf);
      if (poll) clearInterval(poll);
      if (stop) clearTimeout(stop);
    };
  }, [fireEvent]);

  // Applicants who arrive from a package card have already answered the fit
  // question by picking an offer, so that step is cut: the wizard is two steps
  // and the contact step submits the application.
  const packageNextStep = nextStepFieldsForPackage(selectedPackage);

  // Step content order for the active arm. Without a chosen package both arms
  // end on "invest".
  const order = packageNextStep
    ? variant === "goals_first"
      ? (["goals", "contact"] as const)
      : (["contact", "goals"] as const)
    : variant === "goals_first"
      ? (["goals", "contact", "invest"] as const)
      : (["contact", "goals", "invest"] as const);
  const totalSteps = order.length;
  // A draft saved before a package was picked can carry step 3; the package
  // flow only has two, so the rendered step is clamped rather than left empty.
  const visibleStep = Math.min(step, totalSteps) as WizardStep;
  const current = order[visibleStep - 1];
  const contactIsFinalStep = Boolean(packageNextStep) && current === "contact";
  const selectedPackageLabel = packageIntentLabel(selectedPackage);

  // -------------------------------------------------------------------------
  // Shared post-finalize handling: analytics de-dup, draft cleanup, redirect.
  // Used by the final step in both the 3-step and the 2-step (package) flows.
  // -------------------------------------------------------------------------
  function completeSubmission(
    result: Extract<
      Awaited<ReturnType<typeof finalizeApplicationAction>>,
      { ok: true }
    >,
  ) {
    const eventKey = `geebs_application_submitted:${result.completionEventId}`;
    let alreadyTracked = false;
    try {
      alreadyTracked = window.sessionStorage.getItem(eventKey) === "1";
      if (!alreadyTracked) window.sessionStorage.setItem(eventKey, "1");
    } catch {
      // Analytics idempotency degrades to the deterministic event ID.
    }
    if (result.newlyCompleted && !alreadyTracked) {
      fireEvent(
        result.isTest ? "application_test_submitted" : "application_submitted",
        {
          ...result.capture,
          application_id: result.applicationId,
          event_id: result.completionEventId,
          application_outcome: result.outcome,
          selected_package: result.selectedPackage,
          submission_mode: result.isTest ? "test" : "live",
        },
      );
    }

    setIsNavigating(true);
    try {
      window.sessionStorage.removeItem(APPLY_DRAFT_KEY);
    } catch {
      // The result is already stored; navigation can continue.
    }
    window.location.assign(result.redirectTo);
  }

  // -------------------------------------------------------------------------
  // Contact step — creates the partial application row (reachable-lead
  // capture). Step 1 in control, step 2 in goals-first. If goals were already
  // collected (goals-first), persist them onto the new row immediately.
  // -------------------------------------------------------------------------
  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stepSubmitLockRef.current) return;
    stepSubmitLockRef.current = true;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const nextApplicationId = applicationId || crypto.randomUUID();
    const nextStep1Data: Step1Fields = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      ig_handle:
        fd.get("ig_handle") === null
          ? step1Data.ig_handle
          : ((fd.get("ig_handle") as string) ?? ""),
      age_18_plus: (fd.get("age_18_plus") as string) ?? "",
      /* PRESSING THE BUTTON IS THE CONSENT, from 2026-09-21.
 
         It used to be two checkboxes inside an optional fold that came off the
         form. Consent is given here instead — on the step that hands over the
         email address and the phone number, under a button whose own line says
         so, in the words of APPLY_SUBMIT_CONSENT_TEXT, which is also the text
         stored beside the lead. Read it once: it has to keep saying what the
         screen says. */
      email_marketing_consent: "yes",
      sms_marketing_consent: "yes",
    };
    setApplicationId(nextApplicationId);
    setStep1Data(nextStep1Data);

    const gaSessionId = await readGaSessionId(
      (window as unknown as { gtag?: GaGet }).gtag,
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim(),
    );
    attributionRef.current = { ...attributionRef.current, ga_session_id: gaSessionId || "" };
    setAttributionData(attributionRef.current);
    // Thread the stable draft ID, verified edit receipt, and attribution.
    fd.set("application_id", nextApplicationId);
    fd.set("edit_receipt", editReceipt);
    fd.set("selected_package", selectedPackage);
    for (const [k, v] of Object.entries(attributionRef.current)) {
      fd.set(k, v);
    }

    startTransition(async () => {
      try {
        const result = await createPartialApplicationAction(fd);
        if (!result.ok) {
          stepSubmitLockRef.current = false;
          showErrors(result.errors, result.message);
          return;
        }
        setEditReceipt(result.editReceipt);

        // Goals-first already collected answers; this save is required too.
        if (step2Data.goal && step2Data.consistency) {
          const goalsFd = new FormData();
          goalsFd.set("goal", step2Data.goal);
          goalsFd.set("consistency", step2Data.consistency);
          const goalsResult = await updateStep2Action(
            result.applicationId,
            result.editReceipt,
            goalsFd,
          );
          if (!goalsResult.ok) {
            stepSubmitLockRef.current = false;
            showErrors(goalsResult.errors, goalsResult.message);
            return;
          }
        }
        setErrors({});
        setGlobalMessage("");
        fireEvent("application_contact_saved", {
          apply_variant: variant,
          step_content: "contact",
          selected_package: selectedPackage,
        });

        // Package flow: the picked offer answers the fit question, so this is
        // the last step — finalize here instead of advancing to it.
        if (packageNextStep && contactIsFinalStep) {
          const finalFd = new FormData();
          finalFd.set("name", nextStep1Data.name);
          finalFd.set("email", nextStep1Data.email);
          finalFd.set("phone", nextStep1Data.phone);
          finalFd.set("ig_handle", nextStep1Data.ig_handle);
          finalFd.set("age_18_plus", nextStep1Data.age_18_plus);
          finalFd.set(
            "email_marketing_consent",
            nextStep1Data.email_marketing_consent,
          );
          finalFd.set(
            "sms_marketing_consent",
            nextStep1Data.sms_marketing_consent,
          );
          finalFd.set("goal", step2Data.goal);
          finalFd.set("consistency", step2Data.consistency);
          finalFd.set("context", (fd.get("context") as string) ?? "");
          finalFd.set("next_step_choice", packageNextStep.next_step_choice);
          finalFd.set("monthly_investment", packageNextStep.monthly_investment);
          finalFd.set("ready_to_commit", packageNextStep.ready_to_commit);
          finalFd.set("selected_package", selectedPackage);
          if (calendarDate) finalFd.set("calendar_date", calendarDate);
          if (calendarMonth) finalFd.set("calendar_month", calendarMonth);
          for (const [k, v] of Object.entries(attributionRef.current)) {
            finalFd.set(k, v);
          }
          setStep3Data({
            next_step_choice: packageNextStep.next_step_choice,
            monthly_investment: packageNextStep.monthly_investment,
            ready_to_commit: packageNextStep.ready_to_commit,
            context: (fd.get("context") as string) ?? "",
          });

          fireEvent("application_submit_attempted", {
            apply_variant: variant,
            selected_package: selectedPackage,
          });
          fireEvent("submit_apply", {
            apply_variant: variant,
            selected_package: selectedPackage,
          });

          const finalResult = await finalizeApplicationAction(
            nextApplicationId,
            result.editReceipt,
            finalFd,
          );
          if (!finalResult.ok) {
            stepSubmitLockRef.current = false;
            showErrors(finalResult.errors as Step3Errors, finalResult.message);
            return;
          }
          completeSubmission(finalResult);
          return;
        }

        stepSubmitLockRef.current = false;
        setStep((currentStep) => (currentStep + 1) as WizardStep);
      } catch {
        stepSubmitLockRef.current = false;
        showErrors({}, "We couldn't reach the server. Your answers are still here — please try again.");
      }
    });
  }

  // -------------------------------------------------------------------------
  // Goals step — goal + baseline. Control: row exists, persist via the server
  // action. goals-first: runs before contact (no row yet), so validate
  // client-side and stash; the contact step persists it.
  // -------------------------------------------------------------------------
  function submitGoals(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stepSubmitLockRef.current) return;
    stepSubmitLockRef.current = true;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const goal = (fd.get("goal") as string) ?? "";
    const consistency = (fd.get("consistency") as string) ?? "";
    setStep2Data({ goal, consistency });

    startTransition(async () => {
      try {
        if (editReceipt) {
          const result = await updateStep2Action(
            applicationId,
            editReceipt,
            fd,
          );
          if (!result.ok) {
            stepSubmitLockRef.current = false;
            showErrors(result.errors, result.message);
            return;
          }
        } else {
          // Goals-first runs before contact. Validate locally; the contact
          // action persists these answers before it advances.
          const nextErrors: Record<string, string> = {};
          if (!goal) nextErrors.goal = "Pick one.";
          if (!consistency) nextErrors.consistency = "Pick where you're at.";
          if (Object.keys(nextErrors).length > 0) {
            stepSubmitLockRef.current = false;
            showErrors(nextErrors);
            return;
          }
        }
        setErrors({});
        setGlobalMessage("");
        fireEvent("application_goals_saved", {
          apply_variant: variant,
          step_content: "goals",
        });
        // Do NOT release the lock here. Goals-first has no await on this path,
        // so startTransition runs this callback synchronously inside the click
        // handler; releasing here let a double-tap run submitGoals twice and
        // skip straight past the contact step to investment. The contact step
        // never showed this because its awaited server action created the gap.
        // The lock is released by the step-change effect instead.
        setStep((currentStep) => (currentStep + 1) as WizardStep);
      } catch {
        stepSubmitLockRef.current = false;
        showErrors({}, "We couldn't reach the server. Your answers are still here — please try again.");
      }
    });
  }

  // -------------------------------------------------------------------------
  // Investment step — final submit (always step 3 in both arms).
  // -------------------------------------------------------------------------
  function submitInvest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stepSubmitLockRef.current) return;
    stepSubmitLockRef.current = true;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nextStepChoice = (fd.get("next_step_choice") as string) ?? "";
    const resolvedStep3 = step3FieldsFromChoice(nextStepChoice);
    const monthlyInvestment = resolvedStep3.monthly_investment;
    const readyToCommit = resolvedStep3.ready_to_commit;

    setStep3Data({
      next_step_choice: nextStepChoice,
      monthly_investment: monthlyInvestment,
      ready_to_commit: readyToCommit,
      context: (fd.get("context") as string) ?? "",
    });
    fd.set("monthly_investment", monthlyInvestment);
    fd.set("ready_to_commit", readyToCommit);

    // Forward all prior-step values + attribution as hidden fields.
    fd.set("name", step1Data.name);
    fd.set("email", step1Data.email);
    fd.set("phone", step1Data.phone);
    fd.set("ig_handle", step1Data.ig_handle);
    fd.set("age_18_plus", step1Data.age_18_plus);
    fd.set("email_marketing_consent", step1Data.email_marketing_consent);
    fd.set("sms_marketing_consent", step1Data.sms_marketing_consent);
    fd.set("goal", step2Data.goal);
    fd.set("consistency", step2Data.consistency);
    fd.set("selected_package", selectedPackage);
    if (calendarDate) fd.set("calendar_date", calendarDate);
    if (calendarMonth) fd.set("calendar_month", calendarMonth);
    for (const [k, v] of Object.entries(attributionRef.current)) {
      fd.set(k, v);
    }

    startTransition(async () => {
      fireEvent("application_submit_attempted", {
        apply_variant: variant,
        selected_package: selectedPackage,
      });
      // Canonical funnel event (GA4 event spec): the apply submit step. Fires
      // on the final-step submit action; mirrors application_submit_attempted
      // under the spec name so the visits->apply step is measurable.
      fireEvent("submit_apply", {
        apply_variant: variant,
        selected_package: selectedPackage,
      });
      try {
        const result = await finalizeApplicationAction(
          applicationId,
          editReceipt,
          fd,
        );
        if (!result.ok) {
          stepSubmitLockRef.current = false;
          showErrors(result.errors as Step3Errors, result.message);
          return;
        }

        completeSubmission(result);
      } catch {
        stepSubmitLockRef.current = false;
        showErrors({}, "We couldn't reach the server. Your answers are still here — please try again.");
      }
    });
  }

  function handleStep3Change(e: React.ChangeEvent<HTMLFormElement>) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== "next_step_choice") {
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const nextStepChoice = (fd.get("next_step_choice") as string) ?? "";
    const resolvedStep3 = step3FieldsFromChoice(nextStepChoice);
    const monthlyInvestment = resolvedStep3.monthly_investment;
    const readyToCommit = resolvedStep3.ready_to_commit;
    const autosaveKey = `${applicationId}|${nextStepChoice}|${monthlyInvestment}|${readyToCommit}`;

    setStep3Data({
      next_step_choice: nextStepChoice,
      monthly_investment: monthlyInvestment,
      ready_to_commit: readyToCommit,
      context: step3Data.context,
    });
    fd.set("monthly_investment", monthlyInvestment);
    fd.set("ready_to_commit", readyToCommit);

    fireEvent("apply_step3_selection", {
      apply_variant: variant,
      field_name: "next_step_choice",
      field_completed: nextStepChoice ? "yes" : "no",
    });

    if (!editReceipt || autosaveKey === lastStep3AutosaveRef.current) {
      return;
    }
    lastStep3AutosaveRef.current = autosaveKey;

    void updateStep3Action(applicationId, editReceipt, fd)
      .then((result) => {
        if (!result.ok) {
          lastStep3AutosaveRef.current = "";
          showErrors(result.errors, result.message);
        }
        fireEvent(
          result.ok
            ? "application_fit_choice_saved"
            : "application_fit_choice_save_failed",
          {
            apply_variant: variant,
            monthly_investment_present: monthlyInvestment ? "yes" : "no",
            ready_to_commit_present: readyToCommit ? "yes" : "no",
          },
        );
      })
      .catch(() => {
        lastStep3AutosaveRef.current = "";
        showErrors({}, "We couldn't save that choice yet. Your answer is still here.");
      });
  }

  /* THE OPTIONAL BLOCK IS GONE. Gonzalo, 2026-09-21, twice: "we do not need
     that optional details box at all".
 
     It held the Instagram handle, a free-text context field and the two
     marketing consents, immediately above the primary button on the contact
     step, and he read it as exactly what it was — a second thing to deal with
     in front of the one that matters.
 
     WHAT LEAVES WITH IT, on the record rather than discovered later: Kris's
     lead email loses the Instagram line (notify.ts still prints it, it will
     just be empty), the free-text context is no longer collected, and nobody
     can opt in to email or SMS marketing from the application. The server
     still accepts all four fields, so nothing breaks and re-adding a control
     for any of them is a UI change alone. */


  // Shared hidden honeypot (only needed on step 1 where bots would interact).
  const Honeypot = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor="website">Website (leave empty)</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );

  // -------------------------------------------------------------------------
  // Step 1 — Contact info
  // -------------------------------------------------------------------------
  if (current === "contact") {
    return (
      <form data-form-id="apply_wizard"
        ref={formRef}
        onSubmit={submitContact}
        /* Phone value is mine, desktop is #622's. The sheet has to end inside
           a 844px viewport and every gap counts there; on a wider screen there
           is room for the looser rhythm. */
        className="space-y-3 sm:space-y-8"
        data-analytics-form="apply"
        data-analytics-form-name="coaching_application"
        data-apply-step={visibleStep}
        data-apply-step-content="contact"
        noValidate
      >
        {Honeypot}
        <input type="hidden" name="application_id" value={applicationId} />
        <input type="hidden" name="edit_receipt" value={editReceipt} />
        <input type="hidden" name="selected_package" value={selectedPackage} />
        <input type="hidden" name="calendar_date" value={calendarDate} />
        <input type="hidden" name="calendar_month" value={calendarMonth} />
        <StepIndicator
          step={visibleStep}
          total={totalSteps}
          busy={isPending || isNavigating}
          onBack={
            visibleStep > 1
              ? () => {
                  setErrors({});
                  setGlobalMessage("");
                  setStep((s) => (s - 1) as WizardStep);
                }
              : undefined
          }
        />
        <h2 className="sr-only" data-step-heading tabIndex={-1}>
          Contact details
        </h2>
        <PackageIntentBanner label={selectedPackageLabel} />
        <CalendarPickBanner pick={calendarPickLabel} />

        <fieldset className="space-y-5">
          <legend className="eyebrow text-cloudText">Contact</legend>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-[14px] text-bone/85 mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="apply-input"
                placeholder="First Last"
                defaultValue={step1Data.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <FieldError id="name-error" msg={errors.name} />
            </div>
            <div>
              <label htmlFor="email" className="block text-[14px] text-bone/85 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="apply-input"
                placeholder="you@email.com"
                defaultValue={step1Data.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <FieldError id="email-error" msg={errors.email} />
            </div>
          </div>

          {/* Phone and the age gate share a row: two short fields that each took
              a full band, and step 1 has to fit above the dock on a 375px
              screen. The age column is `auto` so it takes exactly the width its
              own sentence needs — at a fixed ratio "I'm 18 or older." wrapped
              to two lines and left the two boxes different heights. The tel
              field takes what is left, which is the right way round: one of
              these is a sentence of known length, the other is a field. */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-5">
            <div>
              <label htmlFor="phone" className="block text-[14px] text-bone/85 mb-2">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className="apply-input"
                placeholder="(555) 555-5555"
                defaultValue={step1Data.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : "phone-help"}
              />
              <FieldError id="phone-error" msg={errors.phone} />
            </div>

            {/* Age gate. The spacer mirrors the label above it so the checkbox
                starts level with the phone input — it is the same type metrics
                rather than a magic offset, so it cannot drift when the label
                size changes. */}
            <div>
              <span
                aria-hidden="true"
                className="block text-[14px] mb-2 select-none"
              >
                &nbsp;
              </span>
              <label className="apply-radio cursor-pointer">
              <input
                type="checkbox"
                name="age_18_plus"
                value="yes"
                required
                defaultChecked={step1Data.age_18_plus === "yes"}
                aria-invalid={Boolean(errors.age_18_plus)}
                aria-describedby={
                  errors.age_18_plus ? "age_18_plus-error" : undefined
                }
                style={{
                  appearance: "auto",
                  accentColor: "#B91C1C",
                  width: "18px",
                  height: "18px",
                  margin: 0,
                  flexShrink: 0,
                }}
              />
                <span className="text-[15px]">I&apos;m 18 or older.</span>
              </label>
              <FieldError id="age_18_plus-error" msg={errors.age_18_plus} />
            </div>

            {/* Full width under both columns, not inside the phone cell: in a
                half-width column this one line wrapped to two and gave back
                most of the height the shared row saved. aria-describedby binds
                by id, so the hint still belongs to the phone field. */}
            <p
              id="phone-help"
              className="col-span-2 -mt-2 text-[12.5px] text-mute sm:-mt-1"
            >
              Kris texts to confirm before the call.
            </p>
          </div>
        </fieldset>

        <FormMessage message={globalMessage} />

        <div className="pt-2">
          <ActionRow
            busy={isPending || isNavigating}
            label={
              isPending
                ? contactIsFinalStep
                  ? "Sending…"
                  : "Saving…"
                : contactIsFinalStep
                  ? "Submit application"
                  : "Continue"
            }
          />
          {/* The one line allowed to follow the button, and it is load-bearing:
              this is the disclosure that makes pressing the button a consent
              rather than an assumption. It is stored verbatim beside the lead
              (see APPLY_SUBMIT_CONSENT_TEXT), so the wording here and the
              wording in the record cannot drift. */}
          {/* One line, with the terms behind a tap. The full paragraph under a
              button someone is about to press reads as a warning, not as
              information — so the substance stays visible and the rest opens.
              Both strings are joined into APPLY_SUBMIT_CONSENT_TEXT, which is
              what gets stored: the record is everything that was available to
              read, not only the half that fit. */}
          <p
            className="mt-3 text-[12.5px] leading-[1.45] text-mute"
            data-apply-consent
          >
            {APPLY_SUBMIT_CONSENT_LINE}{" "}
            <button
              type="button"
              className="underline underline-offset-2 hover:text-bone"
              onClick={() => setConsentOpen((open) => !open)}
              aria-expanded={consentOpen}
              aria-controls="apply-consent-detail"
            >
              {consentOpen ? "Hide" : "Details"}
            </button>
          </p>
          <p
            id="apply-consent-detail"
            hidden={!consentOpen}
            className="mt-1.5 text-[12px] leading-[1.45] text-mute"
            data-apply-consent-detail
          >
            {APPLY_SUBMIT_CONSENT_DETAIL}
          </p>
        </div>
      </form>
    );
  }

  // -------------------------------------------------------------------------
  // Step 2 — Goals + baseline
  // -------------------------------------------------------------------------
  if (current === "goals") {
    return (
      <form data-form-id="apply_wizard"
        ref={formRef}
        onSubmit={submitGoals}
        /* Phone value is mine, desktop is #622's. The sheet has to end inside
           a 844px viewport and every gap counts there; on a wider screen there
           is room for the looser rhythm. */
        className="space-y-3 sm:space-y-8"
        data-analytics-form="apply"
        data-analytics-form-name="coaching_application"
        data-apply-step={visibleStep}
        data-apply-step-content="goals"
        noValidate
      >
        <input type="hidden" name="selected_package" value={selectedPackage} />
        <input type="hidden" name="calendar_date" value={calendarDate} />
        <input type="hidden" name="calendar_month" value={calendarMonth} />
        <StepIndicator
          step={visibleStep}
          total={totalSteps}
          busy={isPending || isNavigating}
          onBack={
            visibleStep > 1
              ? () => {
                  setErrors({});
                  setGlobalMessage("");
                  setStep((s) => (s - 1) as WizardStep);
                }
              : undefined
          }
        />
        <h2 className="sr-only" data-step-heading tabIndex={-1}>
          Goals and current consistency
        </h2>
        <PackageIntentBanner label={selectedPackageLabel} />
        <CalendarPickBanner pick={calendarPickLabel} />

        {/* Q1 — goal */}
        <fieldset
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? "goal-error" : undefined}
        >
          <legend className="block">
            <span className="eyebrow text-cloudText">01 · Goal</span>
            <span className="block mt-2 text-[18px] md:text-[20px] text-bone leading-snug">
              What matters most right now?
            </span>
          </legend>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {GOAL_OPTIONS.map((o) => (
              <label key={o.value} className="apply-radio">
                <input
                  type="radio"
                  name="goal"
                  value={o.value}
                  required
                  defaultChecked={step2Data.goal === o.value}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
          <FieldError id="goal-error" msg={errors.goal} />
        </fieldset>

        {/* Q2 — consistency */}
        <fieldset
          aria-invalid={Boolean(errors.consistency)}
          aria-describedby={
            errors.consistency ? "consistency-error" : undefined
          }
        >
          <legend className="block">
            <span className="eyebrow text-cloudText">02 · Where you&apos;re at</span>
            <span className="block mt-2 text-[18px] md:text-[20px] text-bone leading-snug">
              How consistent have you been the last 90 days?
            </span>
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {CONSISTENCY_OPTIONS.map((o) => (
              <label key={o.value} className="apply-radio">
                <input
                  type="radio"
                  name="consistency"
                  value={o.value}
                  required
                  defaultChecked={step2Data.consistency === o.value}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
          <FieldError id="consistency-error" msg={errors.consistency} />
        </fieldset>

        <FormMessage message={globalMessage} />

        <ActionRow
          busy={isPending || isNavigating}
          label={isPending ? "Saving…" : "Continue"}
        />
      </form>
    );
  }

  // -------------------------------------------------------------------------
  // Step 3 — Investment + commitment
  // -------------------------------------------------------------------------
  return (
    <form data-form-id="apply_wizard"
      ref={formRef}
      onSubmit={submitInvest}
      onChange={handleStep3Change}
      className="space-y-3 sm:space-y-5"
      data-analytics-form="apply"
      data-analytics-form-name="coaching_application"
      data-apply-step={visibleStep}
      data-apply-step-content="investment"
      data-apply-final-step="true"
      noValidate
    >
      <input type="hidden" name="selected_package" value={selectedPackage} />
      <input type="hidden" name="application_id" value={applicationId} />
      <input type="hidden" name="name" value={step1Data.name} />
      <input type="hidden" name="email" value={step1Data.email} />
      <input type="hidden" name="phone" value={step1Data.phone} />
      <input type="hidden" name="age_18_plus" value={step1Data.age_18_plus} />
      <input type="hidden" name="goal" value={step2Data.goal} />
      <input type="hidden" name="consistency" value={step2Data.consistency} />
      <input type="hidden" name="source_path" value={attributionData.source_path} />
      <input type="hidden" name="utm_source" value={attributionData.utm_source} />
      <input type="hidden" name="utm_medium" value={attributionData.utm_medium} />
      <input type="hidden" name="utm_campaign" value={attributionData.utm_campaign} />
      <input type="hidden" name="ga_client_id" value={attributionData.ga_client_id} />
      <input type="hidden" name="calendar_date" value={calendarDate} />
      <input type="hidden" name="calendar_month" value={calendarMonth} />
      <StepIndicator
          step={visibleStep}
          total={totalSteps}
          busy={isPending || isNavigating}
          onBack={
            visibleStep > 1
              ? () => {
                  setErrors({});
                  setGlobalMessage("");
                  setStep((s) => (s - 1) as WizardStep);
                }
              : undefined
          }
        />
      <h2 className="sr-only" data-step-heading tabIndex={-1}>
        Final fit choice
      </h2>
      <PackageIntentBanner label={selectedPackageLabel} />
      <CalendarPickBanner pick={calendarPickLabel} />

      {/* Compact on a phone. Real Safari gives an iPhone 14 a 664px web view,
          not the 844px device screen, and this step has to end above the dock
          inside that. The words are Kris's and are unchanged; the box around
          them stops taking 120px. */}
      <div className="rounded-xl border border-line bg-ink3/45 px-3.5 py-2 sm:px-4 sm:py-3">
        <p className="text-[13px] leading-[1.4] text-bone/85 sm:text-[14.5px] sm:leading-relaxed">
          {/* Gonzalo, looking at this beside the option list below: "we say
              400+ a month but there is a 300 option?" — then, refining his own
              fix: name each price once, in one place. This note speaks only
              for STANDARD coaching now ($400+); the $300 Weekly Review line
              lives in the option below ("Lighter options starting at $300 a
              month") instead of being repeated here. Two numbers, two labels,
              no overlap. */}
          Standard coaching runs{" "}
          <strong className="text-bone">${coachingFrom}+ USD a month</strong>{" "}
          depending on how much of Kris you want, and the rate drops further
          when you pay up front for {prepayMonths.slice(0, -1).join(", ")} or{" "}
          {prepayMonths[prepayMonths.length - 1]} months.
        </p>
      </div>

      <input
        type="hidden"
        name="monthly_investment"
        value={step3Data.monthly_investment}
      />
      <input
        type="hidden"
        name="ready_to_commit"
        value={step3Data.ready_to_commit}
      />
      {/* What the entry page already learned (calculator result, barrier).
          The submit reads `context` from this form; with no field here every
          prefill was silently dropped at the last step. */}
      <input type="hidden" name="context" value={step3Data.context} />

      {/* Q3 — next step */}
      <fieldset
        aria-invalid={Boolean(
          errors.monthly_investment || errors.ready_to_commit,
        )}
        aria-describedby={
          errors.monthly_investment || errors.ready_to_commit
            ? "fit-choice-error"
            : undefined
        }
      >
        <legend className="block">
          <span className="block text-[17px] leading-snug text-bone sm:text-[18px] md:text-[20px]">
            If it turned out to be the right fit, where are you?
          </span>
          <span className="block mt-0.5 text-[13.5px] text-mute sm:mt-1 sm:text-[14px]">
            No payment here &mdash; every answer has a route.
          </span>
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-2.5">
          {NEXT_STEP_OPTIONS.map((o) => (
            <label key={o.value} className="apply-radio">
              <input
                type="radio"
                name="next_step_choice"
                value={o.value}
                required
                defaultChecked={step3Data.next_step_choice === o.value}
              />
              <span>
                <span className="block">{o.label}</span>
                <span className="mt-1 block text-[13px] leading-snug text-mute">
                  {o.description}
                </span>
              </span>
            </label>
          ))}
        </div>
        <FieldError
          id="fit-choice-error"
          msg={errors.monthly_investment || errors.ready_to_commit}
        />
      </fieldset>

      <FormMessage message={globalMessage} />

      <ActionRow
        busy={isPending || isNavigating}
        label={isPending ? "Sending…" : "Submit application"}
      />
      {/* ONE line after the button, and it is the whole tail of this step:
          what happens next plus the privacy note, merged.
 
          They were two paragraphs. Moving them above the button — which is
          where a reason-to-press belongs — pushed the button 35px below the
          fold on a 664px Safari viewport, and a submit button you cannot see is
          worse than a footnote you read late. Merged and left underneath, the
          step ends inside the screen and nothing bulky follows the CTA. */}
      <p className="mt-3 text-[12.5px] leading-[1.45] text-mute">
        If a call is the right next step, you&apos;ll get Kris&apos;s calendar.
        We&apos;ll only use your details to follow up about coaching.
      </p>
    </form>
  );
}

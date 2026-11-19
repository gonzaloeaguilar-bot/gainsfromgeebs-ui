/** Application-only capture. Consent cannot be certified: the site has no CMP
 * or analytics-consent store. Never derive it from GA/marketing consent.
 * Unknown preserves the site's existing GA behavior; a denial removes identity.
 */
export const APPLICATION_FORM_VERSION = "apply-progressive-2026-09-05";
export const APPLICATION_SOURCE_HOSTNAME = "gainsfromgeebs.com";
export type AnalyticsConsent = "granted" | "denied" | "unknown";
export type CaptureInput = {
  gaSessionId?: unknown;
  analyticsConsent?: unknown;
  sourceHostname?: unknown;
  formVersion?: unknown;
  entrySource?: unknown;
  entryContent?: unknown;
  bridgeVersion?: unknown;
};

export function normalizeGaSessionId(value: unknown): string | null {
  const text = typeof value === "string" || typeof value === "number" ? String(value) : "";
  return /^[1-9]\d{0,15}$/.test(text) && Number.isSafeInteger(Number(text)) ? text : null;
}

function safeIdentifier(value: unknown, max: number): string | null {
  return typeof value === "string" && value.length <= max &&
    /^[a-z][a-z0-9_-]*$/.test(value) ? value : null;
}

export function normalizeApplicationCapture(input: CaptureInput = {}) {
  // A posted grant is not evidence of consent. Accept denial conservatively.
  const analyticsConsent: AnalyticsConsent = input.analyticsConsent === "denied" ? "denied" : "unknown";
  const entrySource = input.entrySource === "qualified_content" ? "qualified_content" : null;
  return {
    gaSessionId: analyticsConsent === "denied" ? null : normalizeGaSessionId(input.gaSessionId),
    analyticsConsent,
    sourceHostname: APPLICATION_SOURCE_HOSTNAME,
    formVersion: APPLICATION_FORM_VERSION,
    entrySource,
    entryContent: entrySource ? safeIdentifier(input.entryContent, 120) : null,
    bridgeVersion: entrySource ? safeIdentifier(input.bridgeVersion, 64) : null,
  };
}

export function applicationCapturePayload(input: CaptureInput = {}, partial = false) {
  const value = normalizeApplicationCapture(input);
  if (partial) {
    // Creation fixes the session, form version and bridge for this application.
    // Later requests (including resumed drafts) cannot silently reattribute it.
    // A denial is the only override and removes both previously stored IDs.
    return value.analyticsConsent === "denied"
      ? { analytics_consent: "denied", ga_client_id: null, ga_session_id: null }
      : {};
  }
  return {
    source_hostname: value.sourceHostname,
    form_version: value.formVersion,
    ga_session_id: value.gaSessionId,
    analytics_consent: value.analyticsConsent,
    ...(value.analyticsConsent === "denied" ? { ga_client_id: null } : {}),
    entry_source: value.entrySource,
    entry_content: value.entryContent,
    bridge_version: value.bridgeVersion,
  };
}

export type GaGet = (command: "get", target: string, field: "session_id", callback: (value: unknown) => void) => void;

/** Only the documented gtag get API; never infer sessions from cookie/client ID.
 * A blocked/absent tag or missing callback must not block submission.
 * https://developers.google.com/tag-platform/gtagjs/reference#get
 */
export function readGaSessionId(gtag: GaGet | undefined, target: string | undefined, consent: AnalyticsConsent = "unknown"): Promise<string | null> {
  if (consent === "denied" || !gtag || !target) return Promise.resolve(null);
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 200);
    try {
      gtag("get", target, "session_id", (value) => {
        clearTimeout(timer);
        resolve(normalizeGaSessionId(value));
      });
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/** Analytics gets only metadata confirmed by the persisted row, never contact
 * fields or a claim that a compatibility fallback stored an absent column. */
export function completionCaptureParameters(row: Record<string, unknown>): Record<string, string> {
  const params: Record<string, string> = {};
  if (row.source_hostname === APPLICATION_SOURCE_HOSTNAME) params.source_hostname = row.source_hostname;
  const version = safeIdentifier(row.form_version, 64);
  if (version) params.form_version = version;
  if (["granted", "denied", "unknown"].includes(String(row.analytics_consent))) params.analytics_consent = String(row.analytics_consent);
  if (row.entry_source === "qualified_content") {
    params.entry_source = row.entry_source;
    const content = safeIdentifier(row.entry_content, 120);
    const bridge = safeIdentifier(row.bridge_version, 64);
    if (content) params.entry_content = content;
    if (bridge) params.bridge_version = bridge;
  }
  return params;
}

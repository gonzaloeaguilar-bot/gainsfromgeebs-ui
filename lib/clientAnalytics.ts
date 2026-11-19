"use client";

type AnalyticsParams = Record<string, boolean | number | string | undefined>;

declare global {
  interface Window {
    geebsTrackEvent?: (
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
    /* Events fired before GoogleAnalytics.tsx runs (Script strategy
     * afterInteractive) land here and are flushed the moment geebsTrackEvent
     * is defined. Without it, everything emitted during first paint — most
     * visibly the intro's brand_moment_shown — was dropped: complete fired
     * 2.7s later and landed, shown fired on mount and did not. Measured
     * 2026-09-27: 0 brand_moment_shown against 337 complete over 28 days. */
    __geebsEventQueue?: [string, Record<string, unknown>][];
  }
}

const TEST_RUN_KEY = "geebs:test_run_id";

/**
 * A controlled test run must not leave one event that looks live.
 *
 * Stamped HERE, on the caller side, and again inside the writer in
 * GoogleAnalytics.tsx. That is not redundancy: the e2e funnel spy replaces
 * window.geebsTrackEvent and records what each CALLER passed, so anything the
 * writer adds afterwards is invisible to it — and in production a caller that
 * reaches the writer directly still needs the stamp. Both ends, same two keys,
 * same value.
 *
 * It survives the navigation to /apply/book, where the URL no longer carries
 * the parameter.
 */
function testRunStamp(): AnalyticsParams {
  if (typeof window === "undefined") return {};
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("test_run_id");
    if (fromUrl) window.sessionStorage.setItem(TEST_RUN_KEY, fromUrl);
    const runId = fromUrl || window.sessionStorage.getItem(TEST_RUN_KEY);
    return runId ? { submission_mode: "test", test_run_id: runId } : {};
  } catch {
    return {};   // blocked storage must never break measurement
  }
}

// coach_companion experiment (PR #763): stamp the visitor's arm on every
// event, so applications and leads can be split by arm in GA4. The arm lives
// in localStorage (set by CoachCompanion on the first blog visit); visitors
// who never reached a blog post carry no arm and are excluded from the read.
function companionArmStamp(): { coach_companion_arm?: string } {
  try {
    const arm = window.localStorage.getItem("geebs_companion_holdout");
    return arm === "control" || arm === "treatment"
      ? { coach_companion_arm: arm }
      : {};
  } catch {
    return {};   // blocked storage must never break measurement
  }
}

export function trackClientEvent(
  eventName: string,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined") return;

  const payload = { ...params, ...testRunStamp(), ...companionArmStamp() };

  if (window.geebsTrackEvent) {
    window.geebsTrackEvent(eventName, payload);
    return;
  }

  // GA has not initialised yet. Queue rather than drop; GoogleAnalytics.tsx
  // flushes this the instant it defines geebsTrackEvent. Capped so a page that
  // never loads GA (a blocker, a failed script) cannot grow it without bound.
  const queue = (window.__geebsEventQueue ??= []);
  if (queue.length < 100) queue.push([eventName, payload]);
}

/**
 * Carries what a page already learned (the recomp calculator's result) into
 * the application, WITHOUT putting it in the URL. /apply links open as a
 * sheet that copies the link's query into the address bar, and anything there
 * can reach third-party tags and screenshots. Body numbers stay in this tab's
 * sessionStorage.
 *
 * The value is written when the result renders, not on click: apply links are
 * intercepted on the capture phase (ApplySourceTracker → ApplySheet), so a
 * click handler on the button is not guaranteed to run before the form
 * mounts. It is tagged with the `entry_content` of the link that carries it,
 * and ApplyForm only takes it when the application was opened from that same
 * entry — a later application from any other link never inherits it.
 */
export const APPLY_HANDOFF_KEY = "geebs:apply_handoff";
const MAX = 400;

export function writeApplyHandoff(entryContent: string, text: string): void {
  try {
    window.sessionStorage.setItem(
      APPLY_HANDOFF_KEY,
      JSON.stringify({ entryContent, text: text.trim().slice(0, MAX) }),
    );
  } catch {
    // Blocked storage: the application still opens, just without the numbers.
  }
}

export function takeApplyHandoff(entryContent: string | null): string {
  if (!entryContent) return "";
  try {
    const raw = window.sessionStorage.getItem(APPLY_HANDOFF_KEY);
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { entryContent?: string; text?: string };
    if (parsed.entryContent !== entryContent) return "";
    window.sessionStorage.removeItem(APPLY_HANDOFF_KEY);
    return String(parsed.text || "").trim().slice(0, MAX);
  } catch {
    return "";
  }
}

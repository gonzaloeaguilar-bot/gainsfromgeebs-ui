/**
 * Cross-brand analytics contract for Gains From Geebs.
 *
 * Every brand emits the SAME event names with the SAME parameter block; the
 * brand specificity lives in parameters (~/.claude/durable/ANALYTICS_CONTRACT.md).
 * This site had grown 36 private event names — apply_form_qualified_submit_attempt,
 * commercial_active_dwell, spotify_playlist_click — so not one funnel question
 * could be asked across FLAS, Geebs, DuPont, Haveo or EaseForward.
 *
 * DUAL EMIT, deliberately. GA4 key events on property 538698079 are keyed to the
 * legacy names (apply_form_qualified_submit_attempt, booking_started,
 * application_submitted, site_application_submitted, calendar_booking_click,
 * qualify_lead, close_convert_lead, purchase — read live from the Admin API on
 * 2026-09-19). Renaming in place would have silently zeroed those conversions.
 * The legacy leg keeps flowing untouched; the contract leg rides alongside under
 * a DIFFERENT name. Retire the legacy leg only once the key events and every
 * report are repointed.
 *
 * Source of truth is analytics-legacy-map.json at the repo root — edit that file,
 * not this one. The gate (~/.claude/durable/analytics-gate.py) reads the same file.
 */
import legacyMap from "../analytics-legacy-map.json";

export type ContractMapping = {
  /** Contract event emitted alongside the legacy name. */
  event: string;
  /** Static params merged into the contract leg only. */
  params?: Record<string, string>;
  /** Legacy param name -> contract param name, contract leg only. */
  rename?: Record<string, string>;
  /**
   * Legacy leg only. The same interaction already produced this contract event
   * through another legacy name (or through the shared delegated layer), so a
   * second emit would write one counter twice.
   */
  mirror?: boolean;
};

export const BRAND = "geebs";

export const CONTRACT_MAP: Record<string, ContractMapping> = Object.fromEntries(
  Object.entries(legacyMap as Record<string, unknown>).filter(
    ([key]) => !key.startsWith("_"),
  ),
) as Record<string, ContractMapping>;

/** Events the site's own layer owns, so the shared delegated module must not
 *  also write them. One writer per event name. */
export const SHARED_MODULE_DISABLE = [
  // The site's inline layer already sends the canonical page_view (with the
  // DNT opt-out, safe URL scrubbing and send_to). A second one would double
  // every session's landing page.
  "page_view",
  "form_start",
  "form_step",
  "form_error",
  "form_submit",
] as const;

/** Contract page_type values (closed set). */
export function contractPageType(pathname: string): string {
  const path = (pathname || "/").replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (/^\/(privacy|terms|legal|disclaimer|accessibility)/.test(path)) return "legal";
  if (/^\/apply/.test(path) || /^\/contact/.test(path)) return "form";
  if (path === "/blog" || path === "/science" || path === "/guides" || path === "/resources" || path === "/vs" || path === "/for" || path === "/nutrition" || path === "/tools")
    return "listing";
  if (/^\/(blog|science|guides|resources)\//.test(path)) return "blog";
  if (/^\/locations($|\/)/.test(path)) return "location";
  if (/^\/(vs|for|nutrition|tools)\//.test(path)) return "service";
  if (path.split("/").filter(Boolean).length === 1) return "service";
  return "other";
}

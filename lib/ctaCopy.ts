/**
 * Contextual primary-CTA copy, in ONE place.
 *
 * WHY THIS FILE EXISTS
 * "Apply for 1:1 coaching" was the label on 110 call-to-action buttons across 97
 * files — home page to blog footer, identical wording on every surface. A man who
 * just finished a body-recomposition calculator and a man reading a study abstract
 * were asked the same question in the same words.
 *
 * WHY cta_id IS EXPLICIT AND NEVER DERIVED FROM THE LABEL
 * The shared delegated layer derives the event's identity from the label when no
 * data-cta is present:
 *
 *     cta_id: slug(el.getAttribute("data-cta") || el.id || label || el.tagName)
 *     — public/analytics/track.js:316
 *
 * So on main, EDITING THE COPY SILENTLY RENAMES THE METRIC. Before/after is then
 * two differently-named series and no comparison is possible. Every entry below
 * carries a stable `id` that does not change when `label` is rewritten — that is
 * what makes a copy test answerable at all.
 *
 * cta_text / cta_id / cta_position were registered as GA4 custom dimensions on
 * property 538698079 on 2026-09-22. They were already being COLLECTED by track.js
 * and were invisible in every report because nothing had registered them. GA4 does
 * not backfill, so data starts on the registration date — this file's labels can
 * only be compared forward from 2026-09-22, never against history.
 *
 * ADDING A SURFACE: add an entry, keep `id` stable forever, and put the offer's
 * price NOWHERE in the label (prices come from the offer catalog only).
 */

export type CtaSurface = {
  /** Stable measurement identity. NEVER edit this once it has shipped. */
  id: string;
  /** The words on the button. Safe to rewrite; the id keeps the series intact. */
  label: string;
  /** Where it goes. `/apply` unless the surface sells something else. */
  href: string;
};

/**
 * Longest-prefix match wins, so `/for/software-engineers` takes the engineer
 * entry and `/for/anything-else` falls back to the `/for` entry.
 *
 * Copy voice: Kris asks to map the thing to the person ("comment GAINS if you
 * want me to map this to you"), so the on-site ask mirrors that verb rather than
 * the administrative "apply".
 */
const SURFACES: Array<{ prefix: string } & CtaSurface> = [
  // Home — 2,257 views / 90d at 5.1% click-through, the largest single leak on
  // the site. "Apply" describes the paperwork; this describes the outcome.
  { prefix: "/", id: "home_primary", label: "Get coached by Kris", href: "/apply" },

  // Packages — 16.6%, already the best-converting surface. The label changes to
  // match the page's job (pick one) without touching the winning structure.
  { prefix: "/packages", id: "packages_primary", label: "Get started with Kris", href: "/apply" },

  // Calculators — the visitor is holding a number they did not have a minute ago.
  // 10.1% on the body-recomp calculator with a generic label; the number is the hook.
  { prefix: "/tools", id: "tool_primary", label: "Turn these numbers into a plan", href: "/apply" },

  // The method page already says it in its own body copy: "If you want the
  // method applied to your week, apply."
  { prefix: "/geebs-method", id: "method_primary", label: "Get the method applied to your week", href: "/apply" },
  { prefix: "/methodology", id: "methodology_primary", label: "Get the method applied to your week", href: "/apply" },

  { prefix: "/results", id: "results_primary", label: "Get results like these", href: "/apply" },

  // Audience hubs — the page already named who the reader is; the button should
  // not go vague again.
  { prefix: "/for", id: "for_primary", label: "Get a plan built for your schedule", href: "/apply" },
  { prefix: "/for/software-engineers", id: "for_engineers_primary", label: "Get a plan that fits a dev week", href: "/apply" },
  { prefix: "/for/busy-professionals", id: "for_busy_primary", label: "Get a plan for a full calendar", href: "/apply" },
  { prefix: "/for/new-dads", id: "for_newdads_primary", label: "Get a plan that survives a newborn", href: "/apply" },
  { prefix: "/for/men-over-40", id: "for_over40_primary", label: "Get a plan for training after 40", href: "/apply" },
  { prefix: "/for/skinny-fat-men", id: "for_skinnyfat_primary", label: "Get a recomp plan for your body", href: "/apply" },
  { prefix: "/for/weight-loss", id: "for_weightloss_primary", label: "Get a fat-loss plan for your week", href: "/apply" },

  // Reading surfaces — someone mid-article has a question, not a buying intent.
  // Kris's own DM verb, which is the ask that actually converts for this brand.
  { prefix: "/guides", id: "guide_primary", label: "Get this mapped to you", href: "/apply" },
  { prefix: "/blog", id: "blog_primary", label: "Get this mapped to you", href: "/apply" },
  { prefix: "/science", id: "science_primary", label: "Get this mapped to you", href: "/apply" },
  { prefix: "/nutrition", id: "nutrition_primary", label: "Get this mapped to you", href: "/apply" },

  // Cost/worth-it intent is already price-aware and mid-decision.
  { prefix: "/guides/how-much-does-an-online-fitness-coach-cost", id: "guide_cost_primary", label: "See what coaching would cost you", href: "/packages" },

  { prefix: "/vs", id: "vs_primary", label: "Get coached by a human", href: "/apply" },
  { prefix: "/locations", id: "location_primary", label: "Get coached by Kris", href: "/apply" },
  { prefix: "/faq", id: "faq_primary", label: "Get coached by Kris", href: "/apply" },
  { prefix: "/about", id: "about_primary", label: "Get coached by Kris", href: "/apply" },
];

/** The label used when a surface has no entry of its own. */
export const DEFAULT_CTA: CtaSurface = {
  id: "default_primary",
  label: "Get coached by Kris",
  href: "/apply",
};

function normalize(pathname: string): string {
  const path = (pathname || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
  return path || "/";
}

/**
 * Longest matching prefix, so a specific audience page beats the `/for` group
 * and the `/` entry only ever matches the home page itself.
 */
export function ctaForPath(pathname: string): CtaSurface {
  const path = normalize(pathname);
  let best: CtaSurface = DEFAULT_CTA;
  let bestLen = -1;

  for (const s of SURFACES) {
    const prefix = normalize(s.prefix);
    const matches = prefix === "/" ? path === "/" : path === prefix || path.startsWith(`${prefix}/`);
    if (matches && prefix.length > bestLen) {
      best = { id: s.id, label: s.label, href: s.href };
      bestLen = prefix.length;
    }
  }
  return best;
}

/** Every registered surface, for the test that guards id uniqueness. */
export function allCtaSurfaces(): Array<{ prefix: string } & CtaSurface> {
  return SURFACES;
}

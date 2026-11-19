/**
 * The Titan Forge x Gains From Geebs coaching scholarship, surfaced on the
 * Geebs pages that actually earn search traffic.
 *
 * Why this exists: the scholarship only ever reached people through Instagram.
 * When IG posting stopped on 2026-09-06, applications stopped on 2026-09-07 and
 * the intake sat at zero for eight days. Geebs earns ~19,900 Google impressions
 * a month against Titan's ~2,300, so the durable, non-social path to the
 * application runs through these pages.
 *
 * EVERY offer term below is quoted verbatim from the live public page at
 * https://titanforgefit.com/coaching-intensive (read 2026-09-15). Offer terms,
 * pricing and scarcity mechanics are Kris-gated (autonomy.md L3) — do not
 * invent, round, or "improve" any of these strings. If the Titan page changes,
 * change it here to match; never the other way round.
 */

export const SCHOLARSHIP_URL = "https://titanforgefit.com/coaching-intensive";

/** Verbatim from the live Titan Forge page. See the file header before editing. */
export const SCHOLARSHIP_TERMS = {
  spots: "Up to 3 scholarships",
  duration: "30 days of 1:1 coaching",
  applyCost: "Applying is free.",
  selectedCost: "Selected applicants pay $50 before the 30-day program begins.",
  timeToApply: "about 3 minutes",
  coaches: "Steve Ginevan, PhD (strength) and Kris Oddo (nutrition)",
  cadence: "weekly 30-minute coach check-ins",
} as const;

/**
 * Pages that either RANK or are CITED BY AI ENGINES, so the scholarship appears
 * where people already arrive from search.
 *
 * Two independent evidence sources, both re-pulled 2026-09-15:
 *
 * RANKED — Semrush organic_positions, best position <= 20, ordered by volume:
 *   /tools/body-recomposition-calculator     1 kw  pos 20  vol 2400
 *   /blog/how-to-fix-skinny-fat             11 kw  pos  1  vol 2310
 *   /blog/body-recomposition-for-women       6 kw  pos 11  vol 1540
 *   /blog/how-to-build-muscle-for-skinny-guys 4 kw pos  6  vol  500
 *   /guides/how-much-does-an-online-fitness-coach-cost 5 kw pos 1 vol 370
 *   /blog/is-online-fitness-coaching-worth-it 2 kw  pos  1  vol  120
 *   /blog/how-to-lose-the-dad-bod            2 kw  pos  1  vol  100
 *   /for/skinny-fat-men                      1 kw  pos  1  vol   70
 *
 * CITED — live Perplexity sonar reads via OpenRouter, 12/12 prompts answered.
 * These are pages an AI engine actually hands to a buyer:
 *   /blog/best-online-fitness-coaches-for-busy-men  <- "best online fitness coach for men over 35"
 *   /guides/how-much-does-an-online-fitness-coach-cost <- "how much does an online fitness coach cost"
 *   /blog/is-online-fitness-coaching-worth-it       <- "is online fitness coaching worth it"
 *   /vs/hiring-a-personal-trainer                   <- "online fitness coach vs personal trainer"
 *
 * Two of those cited pages also rank at position 1, which is why they carry the
 * most weight here. Note /blog/is-online-fitness-coaching-worth-it was briefly
 * used as a NEGATIVE control in an earlier revision of this work -- it ranks
 * position 1 and is cited by Perplexity. Assumed-dead pages must be checked
 * against the data before being treated as dead.
 *
 * Deliberately excluded: /about (position 17, brand page, not commercial) and
 * /science/questions/can-pre-workout-at-night-hurt-sleep (position 15, purely
 * informational intent). The scholarship ribbon carries this offer on every page.
 *
 * An explicit path list, not a prefix match: a prefix allowlist silently misses
 * a route the moment it moves, and would also paint the callout across pages
 * that earn nothing.
 */
export const SCHOLARSHIP_MONEY_PAGES: readonly string[] = [
  // ranked and cited
  "/guides/how-much-does-an-online-fitness-coach-cost",
  "/blog/is-online-fitness-coaching-worth-it",
  // cited by AI engines
  "/blog/best-online-fitness-coaches-for-busy-men",
  "/vs/hiring-a-personal-trainer",
  // ranked
  "/blog/how-to-fix-skinny-fat",
  "/blog/how-to-build-muscle-for-skinny-guys",
  "/blog/body-recomposition-for-women",
  "/blog/how-to-lose-the-dad-bod",
  "/for/skinny-fat-men",
  "/tools/body-recomposition-calculator",
  "/tools/macro-calculator",
];

export function isScholarshipMoneyPage(pathname: string): boolean {
  return SCHOLARSHIP_MONEY_PAGES.includes(pathname);
}

/**
 * Cross-domain attribution. Without these the click lands on Titan as
 * "(direct) / (none)" and this whole lane stays unmeasurable — which is exactly
 * how the site ended up unable to prove where applications came from.
 */
export function scholarshipHref(placement: string, sourcePath: string): string {
  const params = new URLSearchParams({
    utm_source: "gainsfromgeebs",
    utm_medium: "referral",
    // Same campaign as the scholarship ribbon so every Geebs -> Titan
    // scholarship click rolls up as one lane in GA4; placement lives in
    // utm_content, which is what separates the money pages from the hero.
    utm_campaign: "geebs_titanforge_intensive_bridge",
    utm_content: `${placement}:${sourcePath.replace(/^\//, "").replace(/\//g, "_") || "home"}`,
  });
  return `${SCHOLARSHIP_URL}?${params.toString()}`;
}

/** Matches the homepage bar, so both placements report as one event. */
export const SCHOLARSHIP_ANALYTICS_EVENT = "titanforge_intensive_referral_click";

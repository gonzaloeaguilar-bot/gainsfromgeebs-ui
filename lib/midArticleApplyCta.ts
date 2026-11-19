/**
 * Mid-article "apply" callouts, keyed by blog slug.
 *
 * Every blog post already gets an apply CTA in the header and in the closing
 * "Ready to build your custom plan?" section (app/blog/[slug]/page.tsx). Both
 * sit at the edges of the page, so a reader who arrives from Google, reads
 * the framework, and leaves before the footer never sees either one.
 *
 * This is the highest-intent moment in the article, not the top or the
 * bottom: the reader now knows WHAT to do and is about to hit the long
 * execution sections (workout splits, macro math, a month-by-month table).
 * That is exactly the point Kris would say "or I just build this for you."
 *
 * Only posts listed here get the mid-article insert — see
 * lib/blogPostPresentation.ts#splitBodyAfterHeading for how the split works.
 * `afterHeading` must match a `##` heading's rendered text exactly (the same
 * comparison used to build the article's table of contents); if the article
 * copy changes that heading's wording, update this value too or the insert
 * silently stops appearing (the split function returns null and the page
 * falls back to rendering the body whole).
 */

export type MidArticleApplyCta = {
  /** The `##` heading text this callout renders immediately after. */
  afterHeading: string;
  /** Stable measurement id — never edit once shipped (see lib/ctaCopy.ts). */
  ctaId: string;
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  /** A lighter second door for a reader not ready to apply yet. */
  secondary?: { label: string; href: string; ctaId: string };
};

export const MID_ARTICLE_APPLY_CTA_BY_SLUG: Record<string, MidArticleApplyCta> = {
  "how-to-fix-skinny-fat": {
    afterHeading: "The 4-step framework to fix skinny fat",
    ctaId: "blog_skinnyfat_midarticle_primary",
    eyebrow: "Want Kris to run this for you?",
    title: "You have the four pillars. Next is fitting them into your actual week.",
    body:
      "Lifting days, protein floor, calorie target, and cardio, sized to your schedule and checked every week instead of guessed once and left alone.",
    label: "Map this to my week",
    secondary: {
      label: "Not sure recomp fits you? Run your numbers first",
      href: "/tools/body-recomposition-calculator",
      ctaId: "blog_skinnyfat_midarticle_calculator",
    },
  },
};

export function midArticleApplyCtaForSlug(
  slug: string,
): MidArticleApplyCta | null {
  return MID_ARTICLE_APPLY_CTA_BY_SLUG[slug] ?? null;
}

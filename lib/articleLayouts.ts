/**
 * Answer-first layouts for the few posts that carry the search traffic.
 *
 * The generic post template stacks a quick-answer card, takeaways, figures,
 * packs and an email box above the article: on /blog/how-to-fix-skinny-fat
 * that was 5,705px (6.8 phone screens) before the first section, the first
 * picture sat 4,586px down, and the whole page ran 37.7 phone screens.
 *
 * A post listed here keeps every word and every heading (so titles, canonical,
 * JSON-LD and anchors are unchanged) but renders differently: a one-screen lead
 * with the answer, a real photo and one next step; the sections as native
 * <details> rows so depth is one tap away and still in the server HTML.
 */

export type ArticleLayout = {
  /** Primary next step in the lead. The calculator is the one tool on the site
   *  that holds attention (75s, 65.6% engaged, GA4 audit 2026-09-17). */
  calculator: { label: string; ctaId: string };
  /** Kris's own start and finish, from /about, which already publishes both. */
  figure: {
    before: { src: string; alt: string; position: string; label: string };
    after: { src: string; alt: string; position: string; label: string };
    caption: string;
  };
  /** Render a one-tap "what does coaching cost" fold under the quick answer. */
  costFold?: boolean;
  /** `##` headings that render as closed rows. Everything else opens. */
  closedSections: string[];
  /** `##` headings whose bullet list is a table of contents the page already
   *  has, so only the prose under it renders. */
  omitListUnder: string[];
};

export const ARTICLE_LAYOUT_BY_SLUG: Record<string, ArticleLayout> = {
  "how-to-fix-skinny-fat": {
    costFold: true,
    calculator: { label: "Run your numbers", ctaId: "blog_skinnyfat_lead_calculator" },
    figure: {
      before: {
        src: "/about/kris-before.jpg",
        alt: "Kris Oddo before building significant muscle",
        position: "50% 30%",
        label: "Before",
      },
      after: {
        src: "/about/kris-after-shredded.jpg",
        alt: "Kris Oddo after years of structured strength training and nutrition",
        position: "50% 14%",
        label: "After",
      },
      caption: "Kris's own start: lean, under-muscled, and still learning the process.",
    },
    closedSections: [
      "Why skinny fat develops specifically in men",
      "Male skinny-fat diagnostic benchmarks: body fat and waist metrics",
      "The skinny-fat workout plan: lift first, cardio second",
      "The skinny-fat nutrition plan: protein floor and calorie targets",
      "Recomposition timeline for skinny-fat men: month-by-month expectations",
      "Progress tracking: why scale weight lies during recomposition",
      "More questions",
    ],
    omitListUnder: ["In this guide"],
  },
};

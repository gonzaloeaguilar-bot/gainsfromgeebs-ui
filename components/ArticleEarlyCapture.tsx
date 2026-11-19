import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

type ArticleEarlyCaptureProps = {
  /** Article slug, used for attribution + UTM. */
  slug: string;
  /**
   * Attribution prefix written to subscribers.source. Defaults to the blog
   * surface; pass "science-early" / "guide-early" so each surface is
   * separable in the subscribers table.
   */
  sourcePrefix?: string;
  /** Eyebrow above the heading. */
  eyebrow?: string;
  /** Heading. Keep it site/marketing voice — never coaching prose. */
  heading?: string;
  /** One paragraph under the heading. */
  body?: string;
  /** The next step. Defaults to the body-recomposition calculator. */
  cta?: { href: string; label: string; detail: string };
};

/**
 * Early, in-read capture block for /blog articles.
 *
 * Measured 2026-09-17 on /blog/how-to-fix-skinny-fat at 375px: the page is
 * 35,874px (44.2 phone screens) and the ONLY email capture sits at 82% of the
 * page — screen 36 of 44. Sitewide only 84 sessions of 3,255 ever reach the 25%
 * scroll mark (portfolio.ga4_event_param_daily, percent_scrolled), so that
 * capture is below the point 97% of readers never reach. Result: 20 subscribers
 * all-time across every capture on the site.
 *
 * This block renders directly after Key Takeaways (~screen 2.2), inside the
 * part of the page people actually read.
 *
 * The next step is the body-recomposition calculator, not the application.
 * Measured: 690 sessions across the three biggest ranking pages produced 2
 * apply step-continues, while the calculator is the only content page with any
 * step-continues at all. Applying is a later rung, not the first ask.
 *
 * Copy is site/marketing voice only (no coaching prose), matching
 * GuideRetentionCTA, so the Kris-voice hard-stop is respected. It promises
 * nothing the site does not already deliver: a calculator that exists and a
 * weekly email that is already sent.
 */
export default function ArticleEarlyCapture({
  slug,
  sourcePrefix = "blog-early",
  eyebrow = "Before you read on",
  heading = "The plan below works off your numbers. Get them first.",
  body = "Protein targets and calories depend on your bodyweight, not an average. The calculator gives you both in about a minute, so the rest of this article is something you can actually follow.",
  cta,
}: ArticleEarlyCaptureProps) {
  const calcHref =
    `/tools/body-recomposition-calculator?utm_source=site&utm_medium=article_early` +
    `&utm_campaign=article_early_capture&utm_content=${encodeURIComponent(slug)}`;
  const link = cta ?? {
    href: calcHref,
    label: "Body recomposition calculator \u2192",
    detail:
      "Your maintenance calories and protein floor, from your own height, weight, and activity. Free, no account.",
  };

  return (
    <>
      <section
        aria-labelledby={`your-numbers-${slug}`}
        className="rounded-[6px] border border-line2 px-5 py-6 md:px-6"
      >
        <p className="eyebrow text-cloudText">{eyebrow}</p>
        <h2
          id={`your-numbers-${slug}`}
          className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
        >
          {heading}
        </h2>
        <p className="mt-4 text-[16px] leading-[1.65] text-mute max-w-[60ch]">
          {body}
        </p>

        <div className="mt-6 divide-y divide-line2 border-y border-line2 text-[15px]">
          <Link
            href={link.href}
            data-analytics-event="article_cta_click"
            className="group grid min-h-20 gap-1 py-4 no-underline"
          >
            <span className="font-semibold text-bone group-hover:text-cloudText">
              {link.label}
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">
              {link.detail}
            </span>
          </Link>
        </div>

        <div className="mt-8">
          <NewsletterSignup
            source={`${sourcePrefix}:${slug}`}
            heading="Weekly training insights"
          />
        </div>
      </section>
      <div className="hair my-10 md:my-14" />
    </>
  );
}

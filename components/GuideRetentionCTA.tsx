import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

type GuideRetentionCTAProps = {
  /** Guide slug, e.g. "what-does-an-online-fitness-coach-do". Used for attribution + UTM. */
  guide: string;
};

/**
 * Retention / daily-return CTA for standalone /guides pages.
 *
 * These decision/buyer-intent guides pull real search traffic but are
 * one-and-done: a visitor reads the answer and leaves, so retention is ~0.
 * This block converts that one-time reach into a returning audience — a link
 * to the daily "Daily Finding" habit surface (/free/daily) plus weekly email
 * capture — mirroring the pattern already shipped on the free calculators
 * (ToolRetentionCTA) and blog posts (RelatedGuides).
 *
 * Copy is site/marketing voice only (no coaching prose), so the Kris-voice
 * hard-stop is respected.
 */
export default function GuideRetentionCTA({ guide }: GuideRetentionCTAProps) {
  const dailyHref = `/free/daily?utm_source=site&utm_medium=guide&utm_campaign=guide_retention&utm_content=${guide}`;

  return (
    <>
      <div className="hair my-10" />

      <section aria-labelledby={`keep-going-${guide}`}>
        <p className="eyebrow text-cloudText">Come back tomorrow</p>
        <h2
          id={`keep-going-${guide}`}
          className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
        >
          A guide answers one question. The habit is what changes your body.
        </h2>
        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-mute max-w-[60ch]">
          You have the answer you came for. Staying on track is the daily
          part — so we publish one evidence-based training and nutrition
          finding every day, plus a weekly email that keeps the useful stuff
          in front of you.
        </p>

        <div className="mt-6 divide-y divide-line2 border-y border-line2 text-[15px]">
          <Link
            href={dailyHref}
            className="group grid min-h-20 gap-1 py-4 no-underline"
          >
            <span className="font-semibold text-bone group-hover:text-cloudText">
              The Daily Finding →
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">
              A new, already-vetted study broken down in plain language — a
              fresh one every day. Bookmark it and check back.
            </span>
          </Link>
        </div>

        <div className="mt-8">
          <NewsletterSignup source={`guide:${guide}`} />
        </div>
      </section>
    </>
  );
}

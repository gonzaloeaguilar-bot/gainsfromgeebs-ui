import Link from "next/link";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";
import {
  aggregateProof,
  clientResults,
  publicReviews,
} from "@/data/clientResults";

type MoneyPageProofProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
};

const defaultIntro =
  "These pages should not rely on generic coaching claims. Geebs keeps named client stories, public reviews, and methodology pages connected so a skeptical buyer can verify what sits behind the pitch.";

export default function MoneyPageProof({
  eyebrow = "Proof",
  title = "What backs the claims on this page",
  intro = defaultIntro,
}: MoneyPageProofProps) {
  const aggregate = aggregateProof[0];
  const featuredResults = clientResults
    .filter((result) => result.permission === "explicit")
    .slice(0, 2);
  const featuredReview = publicReviews[0];

  return (
    <section
      aria-labelledby="money-page-proof"
      data-analytics-source="money_page_proof"
      /* Never folded. PageFolds was collapsing this on both of the site's top
         money pages, so the evidence a buyer needs in order to accept the
         price shipped behind a "+" with its body hidden. Proof that has to be
         clicked for is not proof at the moment it is needed. */
      data-no-fold
    >
      <p className="eyebrow text-cloudText">{eyebrow}</p>
      <h2
        id="money-page-proof"
        className="display mt-4 text-bone text-[24px] md:text-[30px] leading-[1.1]"
      >
        {title}
      </h2>
      <p className="mt-5 max-w-[64ch] text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
        {intro}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {aggregate && (
          <article className="rounded-2xl border border-line2 bg-white/[0.02] p-5">
            <p className="eyebrow text-cloudText">{aggregate.label}</p>
            <p className="display mt-3 text-[32px] leading-none text-bone">
              {aggregate.value}
            </p>
            <p className="mt-3 text-[16px] leading-[1.6] text-mute">
              {aggregate.detail}
            </p>
          </article>
        )}

        {featuredResults.map((result) => {
          const quote = result.homepageQuote ?? result.quote;

          return (
            <article
              key={result.id}
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5"
            >
              <p className="eyebrow text-cloudText">{result.outcome}</p>
              <h3 className="mt-3 text-[17px] font-semibold leading-[1.4] text-bone">
                {result.headline}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-mute">
                “{quote}”
              </p>
              <p className="mt-4 text-[13px] text-mute2">{result.name}</p>
            </article>
          );
        })}

        {featuredReview && (
          <article className="rounded-2xl border border-line2 bg-white/[0.02] p-5">
            <p className="eyebrow text-cloudText">
              {featuredReview.source} - {featuredReview.rating}/5
            </p>
            <h3 className="mt-3 text-[17px] font-semibold leading-[1.4] text-bone">
              Public review mentioning Kris directly
            </h3>
            <p className="mt-3 text-[16px] leading-[1.65] text-mute">
              “{featuredReview.quote}”
            </p>
            <p className="mt-4 text-[13px] text-mute2">
              {featuredReview.name} - {featuredReview.dateLabel}
            </p>
          </article>
        )}
      </div>

      <div className="mt-6 divide-y divide-line2 border-y border-line2">
        <Link
          href="/results"
          className="group grid min-h-20 gap-1 py-4 no-underline"
        >
          <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
            Inspect the full results archive
          </span>
          <span className="text-[13.5px] leading-[1.55] text-mute">
            Named client stories, transformation photos, message screenshots,
            and public review context live on one proof page.
          </span>
        </Link>
        <Link
          href="/about"
          className="group grid min-h-20 gap-1 py-4 no-underline"
        >
          <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
            Verify the coach and credential
          </span>
          <span className="text-[13.5px] leading-[1.55] text-mute">
            Kris Oddo, NASM-CPT, founder page, and Geebs entity context are
            linked directly for buyers and search systems.
          </span>
        </Link>
        <Link
          href="/methodology"
          className="group grid min-h-20 gap-1 py-4 no-underline"
        >
          <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
            Read how the coaching method works
          </span>
          <span className="text-[13.5px] leading-[1.55] text-mute">
            Training, nutrition, recovery, and accountability are spelled out
            beyond the marketing summary.
          </span>
        </Link>
      </div>

      <CoachingDecisionVideo
        source="money_page_proof"
        title="Meet Kris before you decide."
        body="Hear how Kris handles the application call, what he looks for, and how he decides whether 1:1 coaching is a fit."
        className="mt-6 max-w-[620px]"
      />
    </section>
  );
}

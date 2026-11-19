import type { Metadata } from "next";

const SITE_URL = "https://gainsfromgeebs.com";

// Direct Google Business Profile write-review deep link. Set once the GBP
// exists (none does yet — see [[geebs-gbp-viability-2026-06-11]]). Until then
// the page renders an honest "coming soon" state rather than a dead link.
const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim();

// Internal page for existing clients — keep it out of the index.
export const metadata: Metadata = {
  title: "Leave a Review | Geebs Coaching",
  description:
    "Share your experience with Geebs Coaching. A quick way for current clients to leave a Google review.",
  alternates: { canonical: `${SITE_URL}/review-us` },
  robots: { index: false, follow: false },
};

// Keyword prompts clients can naturally weave into honest feedback. These are
// suggestions only — no incentive, no gating of negative reviews (which would
// violate Google's review policies). They simply nudge local-relevant phrasing
// when a client already wants to say something nice.
const KEYWORD_PROMPTS = [
  "Denver personal trainer",
  "online fitness coach",
  "custom macro plan",
  "body recomposition coaching",
  "weekly check-ins & accountability",
];

export default function ReviewUsPage() {
  const reviewConfigured = Boolean(GOOGLE_REVIEW_URL);

  return (
    <main className="bg-grain relative flex min-h-screen items-center justify-center px-6 py-16 md:py-24">
      <section className="w-full max-w-[560px] text-center">
        <p className="eyebrow text-cloudText">Geebs Coaching</p>
        <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[44px] leading-[1.08]">
          Enjoying your coaching? Leave a quick review.
        </h1>
        <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute mx-auto max-w-[46ch]">
          Your honest feedback helps other people in Denver find real 1:1
          coaching. It takes about 60 seconds.
        </p>

        {/* Split-action panel */}
        <div className="mt-10 rounded-2xl border border-line2 bg-ink3/40 p-7 md:p-9 text-left">
          {/* Top action — route straight to Google */}
          <div className="text-center">
            {reviewConfigured ? (
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center text-[16px]"
                data-analytics-event="review_cta_click"
                data-analytics-source="review-us"
              >
                Leave a Google review
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <>
                <span
                  className="btn btn-primary w-full justify-center text-[16px] cursor-not-allowed opacity-60"
                  aria-disabled="true"
                >
                  Google review link coming soon
                </span>
                <p className="mt-3 text-[13px] text-mute2 leading-[1.5]">
                  Our Google Business Profile is being set up. Check back shortly
                  — or reply to Kris directly and he&apos;ll share the link.
                </p>
              </>
            )}
          </div>

          <div className="hair my-7" />

          {/* Context helper — keyword prompts */}
          <div>
            <p className="text-bone text-[15px] font-semibold">
              A small favor while you write:
            </p>
            <p className="mt-2 text-[14px] text-mute leading-[1.6]">
              If it fits your honest experience, mentioning a few of these helps
              our local visibility so the right people find Kris:
            </p>
            <ul className="mt-4 grid gap-2.5">
              {KEYWORD_PROMPTS.map((kw) => (
                <li
                  key={kw}
                  className="flex items-start gap-2.5 text-[14.5px] text-bone/90"
                >
                  <span aria-hidden="true" className="text-cloudText shrink-0">
                    ★
                  </span>
                  <span>&ldquo;{kw}&rdquo;</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12.5px] text-mute2 leading-[1.55]">
              Only share what&apos;s true for you — an honest review is worth far
              more than a perfect one.
            </p>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-mute2">
          Thank you for training with Geebs Coaching.
        </p>
      </section>
    </main>
  );
}

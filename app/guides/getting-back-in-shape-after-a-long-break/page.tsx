import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import QuestionHubSections from "@/components/QuestionHubSections";
import { backInShapeHub } from "@/data/backInShapeHubs";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

/*
 * The hub for niche #3 of geebs-next-niches-2026-10 ("getting back in shape
 * after a break"), the story booked DM leads raise most often relative to all
 * leads. The old /blog/getting-back-in-shape-after-30 post was merged in here
 * and now 301s to this URL (next.config.ts), so one page carries the head term.
 *
 * The six cited sections come from data/backInShapeHubs.ts, where every number
 * is from the abstract. The prose below them is coaching advice and carries no
 * study figures; do not add one here without a source.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/getting-back-in-shape-after-a-long-break";
const TITLE = "Getting Back in Shape After a Long Break: What the Research Says";
const DESCRIPTION =
  "Fell off, used to be in shape, starting again at 30 or later? Six questions answered from the research: muscle memory, how fast it comes back, why restarts stall, and how not to fall off again.";
const UPDATED = backInShapeHub.updated;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Getting back in shape after a long break — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// Advice-only questions. The cited questions are the hub sections, and they
// join the FAQ schema below because they are visible answers too.
const faqs = [
  {
    q: "Should I start with cardio or weights when getting back in shape?",
    a: "Weights first, two or three short full-body sessions a week, with walking or easy cardio on top if you like it. Lifting is what decides whether the weight you lose is fat or muscle; cardio on its own changes the scale more than the mirror.",
  },
  {
    q: "What if I have gym anxiety after a long time away?",
    a: "Walk in with the session written down so you never stand there wondering what to do next, keep it short, and go at a quieter hour for the first few weeks if that helps. Having a plan is usually what takes the edge off.",
  },
  {
    q: "Is getting back in shape after 30 different?",
    a: "The on-ramp is, the destination is not. Recovery between hard sessions is a little slower and old injuries speak up more, so start with fewer days and lighter loads, and add the next step only when the last one feels easy.",
  },
  {
    q: "Do I need a coach to restart after a long break?",
    a: "No. Plenty of people restart well on a simple program. Coaching earns its keep when your last two or three restarts ended the same way, when accountability was the reason you stopped, or when you want the first month set from where you are now.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ...backInShapeHub.facts.map((fact) => ({ q: fact.q, a: fact.answer })),
    ...faqs,
  ].map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: TITLE,
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  image: [{ "@type": "ImageObject", url: `${SITE_URL}/social-preview-coaching.jpg` }],
  datePublished: "2026-06-10",
  dateModified: UPDATED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  citation: backInShapeHub.facts.map((fact) => fact.source.href),
  about: [
    { "@type": "Thing", name: "Getting back in shape after a break" },
    { "@type": "Thing", name: "Muscle memory" },
    { "@type": "Thing", name: "Returning to training after time off" },
  ],
};

const APPLY_HREF =
  "/apply?entry_source=qualified_content&entry_content=back_in_shape_hub&utm_source=site&utm_medium=guide&utm_campaign=back_in_shape";

const paragraph = "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]";

export default function GettingBackInShapePage() {
  return (
    <>
      <JsonLd id="restart-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="restart-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Getting back in shape after a long break
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            If you fell off and you used to be in shape, you are not starting
            from zero: strength and size come back faster the second time.
            Start lighter than you remember, train two to four short sessions a
            week, and protect the habit for the first six weeks. Most restarts
            fail on the routine, not the muscle.
          </p>
          <p className="mt-4 text-[13px] text-mute2">
            Kris Oddo, NASM-CPT, is a 1:1 online fitness coach. Starting again
            after time off is a story he hears often in his DMs.
          </p>
        </header>

        <QuestionHubSections hub={backInShapeHub} />

        <div className="hair my-10 md:my-14" />

        <ArticleEarlyCapture slug="getting-back-in-shape-after-a-long-break" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What should the first four weeks look like?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two to three full-body strength sessions a week, 30 to 45 minutes,
            every set stopped with a few reps left. No maxing out and no
            punishment finishers. The goal of week one is a session you recover
            from easily, not a hard one.
          </p>
          <details className="article-details">
            <summary>The rest of the first month</summary>
            <div className="article-details-body">
              <p className={paragraph}>
                Add load or a set in week three, and only because weeks one and
                two felt easy to recover from. Soreness should be there, not in
                charge. If sitting down on day two hurts, the first week was too
                much.
              </p>
              <p className={paragraph}>
                Set a protein target from day one and hit it most days; that
                matters more than getting the rest of the food perfect. The{" "}
                <Link href="/tools/body-recomposition-calculator" className="underline hover:text-bone">
                  body recomposition calculator
                </Link>{" "}
                gives you the number. For the exercises, the{" "}
                <Link href="/blog/beginner-strength-training-for-men" className="underline hover:text-bone">
                  beginner strength training guide
                </Link>{" "}
                is a good starting plan even if you are not a beginner.
              </p>
            </div>
          </details>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is it too late to restart lifting at 50?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No. In a trial of 29 men averaging 70, lifting 3 times a week for 6 months raised leg
            strength 43% and thigh muscle area 9% (J Gerontol A Biol Sci Med Sci, 2013, PMID
            23223011). If men near 70 can add muscle, a restart at 50 is not too late.
          </p>
          <details className="article-details">
            <summary>How much lifting does a restart need?</summary>
            <div className="article-details-body">
              <p className={paragraph}>
                A review of 151 trials in 6,306 adults aged 60 and over found that a low weekly
                volume was most effective for lean mass and muscle size, while moderate or high
                volume was needed for the biggest strength gains (Sports Med, 2025, PMID 39405023).
                Start small, then add sets as the routine holds.
              </p>
              <p className={paragraph}>
                What this does not prove: these studies are in men older than 50, and a trial
                average is not a promise for any one person. Start light and add load gradually.
              </p>
            </div>
          </details>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            When does a coach help with a restart?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            When the last few restarts ended the same way. If you keep falling
            off around the same point, the problem is the plan around the
            training, and that is the part a coach changes.
          </p>
          <details className="article-details">
            <summary>What coaching with Kris changes</summary>
            <div className="article-details-body">
              <p className={paragraph}>
                Kris starts from where you are now, not where you were before the
                break: your schedule, your old injuries, your equipment. He
                builds the first month to be finishable, then raises it every
                week the routine holds, and he is there in the weeks the
                motivation is not. See{" "}
                <Link href="/methodology" className="underline hover:text-bone">
                  how Kris coaches
                </Link>{" "}
                or{" "}
                <Link href="/for/accountability" className="underline hover:text-bone">
                  coaching for accountability
                </Link>
                .
              </p>
              <p className={paragraph}>
                If you played a sport and the body you remember is a decade old,{" "}
                <Link href="/for/former-athletes" className="underline hover:text-bone">
                  coaching for former athletes
                </Link>{" "}
                is the version written for you. If the break came with a big life
                change,{" "}
                <Link
                  href="/for/men-starting-over-after-a-breakup-or-divorce"
                  className="underline hover:text-bone"
                >
                  starting over after a breakup or divorce
                </Link>{" "}
                covers that restart.
              </p>
            </div>
          </details>
        </section>

        <FAQSection faqs={faqs} heading="More questions about starting again" />

        <section className="mt-12">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            A restart built around where you are now
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Tell Kris how long you have been off and what got in the way last
            time. He sets the first month from that.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-cta="guide_primary"
              data-cta-position="bottom"
            >
              Send it to Kris
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/packages" className="btn btn-secondary">
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <CoachingDecisionVideo
          className="mt-10"
          source="getting_back_in_shape_after_a_long_break"
          eyebrow="Considering coaching?"
          title="Watch this before you decide."
          body="Kris explains what he looks for, what happens after an application, and how he decides whether 1:1 coaching is a fit."
          decisionHref="/coaching?utm_source=site&utm_medium=guide&utm_campaign=getting_back_in_shape_after_a_long_break"
          decisionLabel="See how 1:1 coaching works"
        />

        <GuideRetentionCTA guide="getting-back-in-shape-after-a-long-break" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Coaching by Kris Oddo, NASM-CPT. Last updated{" "}
            <time dateTime={UPDATED}>{UPDATED}</time>.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

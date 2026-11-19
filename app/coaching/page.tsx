import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import PageByline from "@/components/PageByline";
import VslEmbedFrame from "@/components/VslEmbedFrame";
import CoachingObstacleRouter from "@/components/CoachingObstacleRouter";
import TransformationProofRail from "@/components/TransformationProofRail";
import RailBenefits from "@/vendor/rail-kit/RailBenefits";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/coaching";
const DATE_MODIFIED = "2026-10-20";

export const metadata: Metadata = {
  title: "1:1 Online Fitness Coaching | Gains From Geebs",
  description:
    "1:1 online fitness coaching with Kris Oddo, NASM-CPT: custom training, nutrition guidance, form feedback, and accountability built around real life.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "1:1 Online Fitness Coaching | Gains From Geebs",
    description:
      "See how 1:1 online fitness coaching with Kris works, what support is included, and the permissioned client proof behind Gains From Geebs.",
    siteName: "Gains From Geebs",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Gains From Geebs 1:1 online fitness coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1:1 Online Fitness Coaching | Gains From Geebs",
    description:
      "Custom training, nutrition guidance, form feedback, and accountability with Kris Oddo, NASM-CPT.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is included in 1:1 online fitness coaching?",
    a: "Coaching is built around your training plan, nutrition guidance, exercise cues and form feedback, plus a level of accountability that matches the option you choose. Kris uses the information from your week to adjust the next one instead of leaving you with a static template.",
  },
  {
    q: "Can online coaching work if my schedule keeps changing?",
    a: "Yes, if the plan is built around the time and equipment you actually have. A missed workout, travel week, or hard work stretch should lead to a practical adjustment, not an all-or-nothing reset. The application is where Kris learns what your week really looks like before recommending a fit.",
  },
  {
    q: "Are the client results on this page typical?",
    a: "No individual result is promised or typical. The examples are shared with permission and describe those clients' own experiences. Starting point, consistency, health, training history, recovery, and follow-through all affect what happens for any individual person.",
  },
  {
    q: "Do I need to pick a coaching package before I apply?",
    a: "No. You can apply without choosing a package first. Kris uses the application and fit conversation to understand your goal, schedule, support needs, and whether one of the coaching options makes sense.",
  },
];

const decisionFaqs = [
  {
    q: "Can this work if my schedule changes every week?",
    a: "Yes. The plan starts with the days, equipment, travel, and work demands you actually have. When a week changes, the next move is adjusted instead of asking you to restart from scratch.",
  },
  {
    q: "What happens after I apply?",
    a: "You start with a short fit application. Kris reviews what you want to change, what your week looks like, and the support you need before recommending whether coaching is a fit.",
  },
  {
    q: "Do I need to choose a package before I apply?",
    a: "No. You do not need to pick a package first. The application gives Kris enough context to recommend the right next step, or tell you honestly if coaching is not the best fit right now.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}${SLUG}#service`,
  name: "Gains From Geebs 1:1 Online Fitness Coaching",
  serviceType: "Online fitness coaching",
  description:
    "1:1 online fitness coaching with custom training, nutrition guidance, form feedback, and accountability from Kris Oddo, NASM-CPT.",
  url: `${SITE_URL}${SLUG}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${SLUG}#webpage`,
  url: `${SITE_URL}${SLUG}`,
  name: "1:1 Online Fitness Coaching | Gains From Geebs",
  description:
    "A public explanation of 1:1 online fitness coaching with Kris Oddo, NASM-CPT, including how coaching works and permissioned client proof.",
  dateModified: DATE_MODIFIED,
  about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Strength training" },
    { "@type": "Thing", name: "Nutrition coaching" },
  ],
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: `${SITE_URL}/coaching/kris-client-coaching-close.jpg`,
    caption: "Kris Oddo coaching a client through a gym training session",
  },
};

export default function CoachingPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="coaching-service-schema" data={serviceSchema} />
      <JsonLd id="coaching-page-schema" data={pageSchema} />
      <JsonLd id="coaching-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[1040px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24">
        <section
          className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,390px)] md:items-start md:gap-12"
          aria-labelledby="coaching-heading"
        >
          <div className="max-w-[680px]">
            <p className="eyebrow text-cloudText">
              1:1 online fitness coaching
            </p>
            <h1
              id="coaching-heading"
              className="display mt-4 max-w-[14ch] text-[36px] leading-[1.04] text-bone sm:text-[50px] md:max-w-[18ch] md:text-[62px]"
            >
              Coaching that fits real life.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.55] text-bone/85 md:text-[18px]">
              A custom plan, nutrition guidance, and weekly adjustments around
              your actual schedule.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/apply"
                className="btn btn-primary"
                data-cta="coaching_primary"
                data-cta-position="hero"
                data-analytics-source="coaching_hero"
                data-analytics-link-kind="primary"
              >
                Get coached
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-4 text-[13px] leading-[1.55] text-mute2">
              Start with a short application. No payment is taken there.
            </p>
            <RailBenefits
              className="mt-6 [--rail-benefits-gap:.45rem] [--rail-benefits-title-size:16px]"
              label="What coaching includes"
              source="coaching_hero_includes"
              benefits={[
                {
                  id: "training",
                  title: "Training built for your week",
                  body: "",
                },
                {
                  id: "nutrition",
                  title: "Clear nutrition guidance",
                  body: "",
                },
                {
                  id: "adjustments",
                  title: "Weekly adjustments when life changes",
                  body: "",
                },
              ]}
            />
          </div>
          <figure
            className="tcard-coaching-product border-y border-line2 py-7 md:col-start-2 md:row-start-1 md:py-0 md:border-y-0"
            aria-labelledby="coaching-vsl"
          >
            <p className="eyebrow text-cloudText">Prefer a walkthrough?</p>
            <h2
              id="coaching-vsl"
              className="display mt-3 text-[24px] leading-[1.1] text-bone md:text-[28px]"
            >
              Hear how coaching works from Kris.
            </h2>
            <VslEmbedFrame />
            <figcaption className="mt-3 text-[15px] leading-[1.55] text-mute2">
              Watch Kris explain what happens after you apply.
            </figcaption>
          </figure>
        </section>

        <section
          className="mt-10 border-y border-line2 py-10 md:mt-14 md:py-14"
          aria-labelledby="proof-heading"
          data-no-fold="true"
        >
          <div className="max-w-[680px]">
            <p className="eyebrow text-cloudText">Permissioned client proof</p>
            <h2
              id="proof-heading"
              className="display mt-3 text-[30px] leading-[1.08] text-bone md:text-[40px]"
            >
              Proof clients chose to share.
            </h2>
          </div>

          <div className="mt-8">
            <TransformationProofRail />
            <p className="mt-4 max-w-[64ch] text-[13px] leading-[1.6] text-mute2">
              These are real client examples and messages shared with
              permission. They show general coaching experiences, not an
              age-specific result set or a promise about what any new client
              will experience. Photos are shown exactly as each client shared
              them. Individual results vary.
            </p>
          </div>

          <details className="results-fold mt-6">
            <summary>Read the proof and permission notes</summary>
            <div className="max-w-[64ch] text-[15px] leading-[1.65] text-mute">
              <p className="mt-4">
                Named client outcomes and transformation photos are published
                only when they have a permission record in the results library.
                Where a client chose to remain anonymous, the page says so and
                does not add a timeline or measurement the client did not share.
              </p>
              <p className="mt-4">
                <Link
                  href="/results"
                  className="text-bone underline underline-offset-4"
                >
                  Read the full client results library
                </Link>{" "}
                for each published story, its context, and the original proof.
              </p>
            </div>
          </details>
        </section>

        <FAQSection
          faqs={decisionFaqs}
          eyebrow="Before you apply"
          heading="A few questions people ask first."
        />

        <details className="results-fold mt-10 md:mt-14">
          <summary>
            See how coaching works, who it is for, and common questions
          </summary>
          <div className="pt-2">
            <section
              className="tcard-coaching-product grid gap-5 border-y border-line2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-9"
              aria-labelledby="coaching-answer"
            >
              <div>
                <p className="eyebrow text-cloudText">The fuller answer</p>
                <h2
                  id="coaching-answer"
                  className="display mt-3 text-[26px] leading-[1.1] text-bone md:text-[32px]"
                >
                  What does 1:1 online fitness coaching actually change?
                </h2>
              </div>
              <p className="max-w-[58ch] text-[16px] leading-[1.7] text-bone/85">
                The goal is not another workout library. You get a plan built
                around your available days, equipment, training history, and
                goal, with nutrition guidance and accountability connected to
                that plan. Kris stays close enough to the week to change the
                next move when reality changes instead of asking you to start
                over on Monday.
              </p>
            </section>

            <CoachingObstacleRouter />

            <section
              className="mt-8 border-t border-line2 pt-6"
              aria-labelledby="coaching-not-fit"
            >
              <h2
                id="coaching-not-fit"
                className="display text-[22px] leading-[1.12] text-bone md:text-[27px]"
              >
                When coaching is not the next step
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-mute">
                If you mainly want a starting point, begin with the free
                calculator. If you are comparing support levels, read the cost
                guide before you apply. Coaching should solve a real support
                problem, not add another commitment you do not need.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
                <Link
                  href="/tools/body-recomposition-calculator"
                  className="text-bone underline underline-offset-4"
                >
                  Get a free starting point
                </Link>
                <Link
                  href="/guides/how-much-does-an-online-fitness-coach-cost"
                  className="text-bone underline underline-offset-4"
                >
                  Read the cost guide
                </Link>
              </div>
            </section>

            <section
              id="how-it-works"
              className="mt-12 md:mt-16"
              aria-labelledby="how-it-works-heading"
            >
              <p className="eyebrow text-cloudText">The coaching process</p>
              <h2
                id="how-it-works-heading"
                className="display mt-3 max-w-[20ch] text-[30px] leading-[1.08] text-bone md:text-[40px]"
              >
                Built around the work you can repeat.
              </h2>
              <div className="mt-7 grid gap-4 md:grid-cols-3 md:gap-5">
                <details className="results-fold group" open>
                  <summary>01 / Your starting point</summary>
                  <div className="mt-4">
                    <p className="eyebrow text-cloudText">
                      01 / Your starting point
                    </p>
                    <h3 className="display mt-3 text-[21px] leading-[1.15] text-bone">
                      The plan starts with your real week.
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-[1.7] text-mute">
                      Before a program is built, Kris needs the constraints: how
                      many days you can train, the equipment you can use, what
                      has worked or hurt before, and where food or recovery
                      tends to fall apart. That gives the plan a chance to
                      survive contact with your actual life.
                    </p>
                  </div>
                </details>
                <details className="results-fold group">
                  <summary>02 / The weekly work</summary>
                  <div className="mt-4">
                    <p className="eyebrow text-cloudText">
                      02 / The weekly work
                    </p>
                    <h3 className="display mt-3 text-[21px] leading-[1.15] text-bone">
                      Training and nutrition point in the same direction.
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-[1.7] text-mute">
                      Your training is custom rather than copied from a generic
                      split. Nutrition guidance supports the training and the
                      goal without asking for a perfect life. Form feedback and
                      clear exercise cues keep the work understandable when you
                      are in the gym on your own.
                    </p>
                  </div>
                </details>
                <details className="results-fold group">
                  <summary>03 / The adjustment</summary>
                  <div className="mt-4">
                    <p className="eyebrow text-cloudText">
                      03 / The adjustment
                    </p>
                    <h3 className="display mt-3 text-[21px] leading-[1.15] text-bone">
                      A miss becomes information, not a failed month.
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-[1.7] text-mute">
                      The useful part of coaching is what happens when plans
                      meet a hard week. Kris reviews what happened and helps
                      adjust the next step: move a workout, change an exercise,
                      simplify meals, or reset the target without throwing away
                      the rest of the work.
                    </p>
                  </div>
                </details>
              </div>
            </section>

            <section
              className="mt-14 border-y border-line2 py-8 md:mt-20 md:py-10"
              aria-labelledby="coaching-baseline"
            >
              <p className="eyebrow text-cloudText">Free starting point</p>
              <h2
                id="coaching-baseline"
                className="display mt-3 max-w-[24ch] text-[28px] leading-[1.1] text-bone md:text-[36px]"
              >
                Get a clear starting point before you decide whether coaching is
                the next step.
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                Use the free body recomposition calculator to see a practical
                calories and protein starting point. It does not replace
                individual coaching, but it gives you a clearer first question
                to bring to the application.
              </p>
              <Link
                href="/tools/body-recomposition-calculator?utm_source=coaching&utm_medium=lead_magnet"
                className="mt-6 inline-block text-[15px] font-semibold text-bone underline underline-offset-4"
                data-cta="coaching_lead_magnet"
                data-cta-position="coaching_baseline"
              >
                Get the free starting point
              </Link>
            </section>

            <section
              className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] md:gap-12"
              aria-labelledby="fit-heading"
            >
              <div>
                <p className="eyebrow text-cloudText">Who this is for</p>
                <h2
                  id="fit-heading"
                  className="display mt-3 text-[30px] leading-[1.08] text-bone md:text-[40px]"
                >
                  Coaching for the person who is done guessing.
                </h2>
                <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                  This is for adults who want to build muscle, lose fat, improve
                  how they move, or get consistent again but need more than a
                  template to make the work stick. It can make sense in your
                  30s, 40s, 50s, or beyond; the deciding factor is not an age
                  bracket. It is whether a coach-led plan and regular adjustment
                  solve the problem you actually have.
                </p>
              </div>
              <aside className="rounded-xl border border-cloudText/30 bg-cloudText/[0.07] p-6">
                <p className="eyebrow text-cloudText">Before you apply</p>
                <p className="mt-3 text-[16px] leading-[1.65] text-bone">
                  You do not need to know the right package. Start with the
                  goal, schedule, and support you need. Kris will use that to
                  decide whether coaching is a fit.
                </p>
                <Link
                  href="/packages"
                  className="mt-5 inline-block text-[15px] font-semibold text-bone underline underline-offset-4"
                >
                  Compare coaching options
                </Link>
              </aside>
            </section>

            <FAQSection faqs={faqs} heading="Questions before you apply" />
          </div>
        </details>

        <section
          className="mt-12 rounded-2xl border border-line2 bg-black/20 px-6 py-8 md:mt-16 md:px-9 md:py-10"
          aria-labelledby="coaching-next-step"
        >
          <p className="eyebrow text-cloudText">A clear next step</p>
          <h2
            id="coaching-next-step"
            className="display mt-3 max-w-[22ch] text-[28px] leading-[1.1] text-bone md:text-[36px]"
          >
            Tell Kris what you want to change and what your week looks like.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-mute">
            The application takes about two minutes. It is a fit check, not a
            checkout. If coaching makes sense, Kris will guide the next step.
          </p>
          <div className="mt-7">
            <Link
              href="/apply"
              className="btn btn-primary"
              data-cta="coaching_primary"
              data-cta-position="bottom"
              data-analytics-source="coaching_close"
              data-analytics-link-kind="primary"
            >
              Get coached
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
      <PageByline
        updated={DATE_MODIFIED}
        className="mx-auto max-w-[1040px] px-6 pb-10 md:px-10"
      />
    </main>
  );
}

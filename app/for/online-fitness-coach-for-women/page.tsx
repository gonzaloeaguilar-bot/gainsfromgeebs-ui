import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import AuthorityProof from "@/components/AuthorityProof";
import KrisTrainingBroll from "@/components/KrisTrainingBroll";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { krisTrainingVideoSchema } from "@/data/krisMedia";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/online-fitness-coach-for-women";

// This page has no articleSchema, so the /for sweep skipped it and the section
// read 20 of 21 rather than 21 of 21. The crumb name comes from the page's own
// openGraph title instead of an invented string.
const BREADCRUMB_TITLE = "Online Fitness Coach for Women";
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: BREADCRUMB_TITLE,
});

export const metadata: Metadata = {
  title: "Online Fitness Coach for Women | Geebs Coaching",
  description:
    "1:1 online fitness coaching for women. Custom strength training, practical nutrition, recovery habits, and daily accountability with Kris Oddo.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Women",
    description:
      "1:1 online coaching for women built around strength training, nutrition, recovery, and accountability for real weeks.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for women — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Women",
    description:
      "Custom strength training, practical nutrition, and daily accountability with Kris Oddo.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Coaching for women who want strength, shape, and consistency",
    paras: [
      "Geebs Coaching is not men-only. Kris coaches women who want a stronger, leaner body without bouncing between random workouts, crash diets, and plans that fall apart the first busy week.",
      "The work is built around the same Geebs Method: hard individualized weight training, nutrition that supports the training, recovery habits, and daily accountability. The difference is not a pink version of a plan. It is a coach adjusting the work around your body, your schedule, your equipment, your food preferences, and the weeks you actually live.",
    ],
  },
  {
    h2: "What the coaching week looks like",
    paras: [
      "Training usually starts with three to four focused resistance-training sessions per week. The goal is to train hard enough to create a real stimulus, progress over time, and build the muscle that changes how your body looks, not just how much it weighs.",
      "Nutrition is macro-aware without turning food into a full-time job. Protein comes first, carbs support training, fats stay practical, and the plan gets adjusted around dinners out, travel, stress, and the days where cooking is not happening.",
      "Accountability is daily. Kris checks in, catches missed workouts, adjusts around schedule changes, and keeps the week from turning into an all-or-nothing spiral. If a session gets missed, the answer is not to quit. The answer is to move it, adjust it, and keep the week alive.",
    ],
  },
  {
    h2: "Who this is for",
    paras: [
      "This is for women who have enough information but not enough structure. You may already know that strength training, protein, sleep, and steps matter. The issue is making those pieces work together for long enough to see the body change.",
      "It is a fit if you want a coach who handles programming, nutrition targets, accountability, and weekly adjustments instead of handing you a template and hoping you stay on track. It is also a fit if you want to stop using the scale as the only scorecard and start tracking strength, photos, measurements, energy, and how clothes fit.",
    ],
  },
  {
    h2: "What this is not",
    paras: [
      "This is not a crash diet, a detox, a tiny-food meal plan, or a cardio-only weight-loss plan. Kris does not need you to train like an influencer or eat a perfect menu to make progress.",
      "It is also not medical care. If you need diagnosis, treatment, pregnancy-specific programming, postpartum clearance, or hormone-related medical guidance, that belongs with a qualified clinician. Coaching can still support training and nutrition once the right boundaries are clear.",
    ],
  },
];

const faqs = [
  {
    q: "Does Kris coach women?",
    a: "Yes. Geebs Coaching is for men and women. Some pages on the site target male-specific search terms, but the 1:1 coaching practice is not limited to men.",
  },
  {
    q: "What does online fitness coaching for women include?",
    a: "It includes custom strength training, nutrition targets, daily accountability, weekly check-ins, and program adjustments from Kris. The plan is built around your schedule, equipment, training history, food preferences, and real constraints.",
  },
  {
    q: "Will strength training make women bulky?",
    a: "No. Strength training builds the muscle that creates shape, improves performance, and supports fat loss. The final look depends on training, nutrition, genetics, and time; most women need consistent hard training and enough protein before muscle gain becomes visually obvious.",
  },
  {
    q: "Is this a meal plan?",
    a: "No. Nutrition is macro-aware and protein-first, but it is built to survive normal life. The goal is to teach food decisions that support training instead of locking you into a perfect meal plan you cannot keep.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Women",
  description:
    "1:1 online fitness coaching for women. Custom strength training, nutrition guidance, recovery habits, daily accountability, and weekly check-ins with Kris Oddo.",
  provider: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "Audience",
    audienceType: "Women seeking online fitness coaching",
  },
  url: `${SITE_URL}${SLUG}`,
};

export default function OnlineFitnessCoachForWomenPage() {
  return (
    <>
      <JsonLd id="online-coach-women-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="online-coach-women-service-schema" data={serviceSchema} />
      <JsonLd
        id="online-coach-women-training-video-schema"
        data={krisTrainingVideoSchema}
      />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for women
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            1:1 coaching for women who want strength training, nutrition, and
            accountability built around the week they actually have.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <KrisTrainingBroll />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <AuthorityProof compact />

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Where to start
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/blog/body-recomposition-for-women"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for women
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How to build muscle and lose fat without chasing the scale.
              </span>
            </Link>
            <Link
              href="/blog/strength-training-for-women-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Strength training for women beginners
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The simple training priorities before the plan gets complicated.
              </span>
            </Link>
            <Link
              href="/geebs-method"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                The Geebs Method
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Kris&apos;s full coaching system: training, nutrition, recovery,
                and accountability.
              </span>
            </Link>
            <Link
              href="/resources/online-fitness-coaching-cost-faq"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coaching cost FAQ
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What changes the price of 1:1 coaching, and when a lower-touch
                plan is enough.
              </span>
            </Link>
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Is online fitness coaching worth it?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The buying guide for deciding between apps, self-guided plans,
                and 1:1 coaching.
              </span>
            </Link>
            <Link
              href="/for/busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Coaching built around packed calendars and real weeks.
              </span>
            </Link>
            <Link
              href="/for/remote-workers"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For remote workers
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Structure for days where the commute is ten steps.
              </span>
            </Link>
            <Link
              href="/vs/hiring-a-personal-trainer"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online coaching vs hiring a personal trainer
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                An honest comparison for someone deciding between the two.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Price before the ask. Nine of twelve money pages never stated a

            coaching price; on these 21 the only figure was the community at

            67-91% depth. */}

        <CoachingPriceLine />


        {/* Early, in-read. These 21 audience pages carried no capture at

            all, and two of them are the highest buying-intent pages on the

            site by human search demand. */}

        <ArticleEarlyCapture
          slug="online-fitness-coach-for-women"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <dl className="mt-6">
            {faqs.map((f) => (
              <div key={f.q} className="mt-7 first:mt-0">
                <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Get a plan built around your week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you want Kris to build the training, nutrition, and accountability
            structure around your real week, start with the short application. If
            1:1 is not the right fit, the 90-day program is the lower-touch path.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/does-lifting-help-during-weight-loss"
              className="underline hover:text-bone"
            >
              whether lifting helps during weight loss
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-much-protein-for-body-recomposition"
              className="underline hover:text-bone"
            >
              how much protein body recomposition takes
            </Link>
            , and{" "}
            <Link
              href="/science/questions/do-creatine-and-lifting-change-body-composition"
              className="underline hover:text-bone"
            >
              what creatine plus lifting does for body composition
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_primary">
              Get a plan built for your schedule
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <HubRetentionCTA hub="online-fitness-coach-for-women" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-03.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

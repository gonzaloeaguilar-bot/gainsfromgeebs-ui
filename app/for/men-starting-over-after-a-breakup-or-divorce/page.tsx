import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { fitSeoTitle } from "@/lib/seoMetadata";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/men-starting-over-after-a-breakup-or-divorce";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-08-10";

export const metadata: Metadata = {
  title: fitSeoTitle(
    "Getting Back in Shape After a Breakup or Divorce | Geebs Coaching",
  ),
  description:
    "Fitness and routine coaching for men navigating a breakup or divorce — a structured restart for training and nutrition, not relationship advice.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Getting Back in Shape After a Breakup or Divorce: A Fitness Restart",
    description:
      "Use a major life transition as a structural reset point for training and single-person nutrition instead of letting it become months of drift.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Getting back in shape after a breakup or divorce — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Back in Shape After a Breakup or Divorce",
    description:
      "A simple 3-day workout routine and single-person nutrition framework built for men navigating a major life reset.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Why this is actually a workable restart point, not a bad time to start",
    paras: [
      "A breakup or divorce changes your daily environment completely. Old routines disrupt, and while that causes temporary chaos, it also breaks the automatic triggers tied to past habits. When daily cues disappear, building a new physical training structure is easier than trying to alter an established, stagnant routine.",
      "A major life transition disrupts established daily triggers, creating a unique structural window to anchor new health habits before new unproductive defaults take hold.",
      "Training during a major schedule shift works because it builds a new baseline while old routines are already disrupted. Waiting for things to settle down usually means months of drift before trying to build momentum from a standing start. Honest limit: Physical training provides structural momentum and stress relief, but it does not replace sleep recovery, fix nutrition on its own, or resolve emotional grief.",
    ],
  },
  {
    h2: "Building a routine when your schedule just changed completely",
    paras: [
      "When your schedule shifts dramatically, attempting a complicated five-day or six-day workout split usually leads to burnout. A simple three-session full-body strength structure establishes non-negotiable anchors without overwhelming your calendar.",
      "Complexity breaks during a major life transition; a simple three-session full-body structure survives when everything else is in flux.",
      "Focusing on progressive resistance training three days a week for 45 minutes keeps training effective and predictable. Fixed days like Monday, Wednesday, and Friday structure open evenings while allowing full recovery buffers between workouts.",
    ],
  },
  {
    h2: "Cooking and eating for one — nutrition without relying on someone else's habits",
    paras: [
      "Transitioning from shared meals or frequent takeout to single-person meal prep often leads to erratic eating or reliance on convenience food. Building a minimal grocery system around high-protein anchors like chicken breast, lean beef, eggs, and Greek yogurt simplifies daily decisions.",
      "Single-person nutrition relies on automated grocery staples and high-protein defaults rather than complicated recipes.",
      "Targeting a moderate calorie deficit with 0.7–1.0 grams of protein per pound of bodyweight preserves muscle while driving fat loss. Pre-portioning simple staple meals twice a week eliminates decision fatigue on busy weeknights.",
    ],
  },
  {
    h2: "Avoiding the stress-eating/drinking spiral without treating it as a crisis",
    paras: [
      "Stress and open evenings can trigger increased calorie intake through alcohol or comfort food. Viewing a high-calorie evening as a failure often leads to a week of off-track eating, whereas treating it as a temporary data point keeps your momentum intact.",
      "A single evening of stress-eating or drinking slows fat loss temporarily, but returning immediately to standard calorie targets prevents a temporary slip from compounding into weeks of drift.",
      "Coaching establishes a practical framework: keep daily protein targets steady, maintain hydration, and resume normal training sessions immediately without resorting to extreme crash diets or compensatory cardio.",
    ],
  },
  {
    h2: "Using newly available evenings and weekends for consistent training",
    paras: [
      "After a breakup or divorce, newly open hours on weeknights and weekends can feel unstructured, increasing susceptibility to idle scrolling or irregular sleep patterns. Scheduling gym sessions into those specific blocks turns unstructured time into physical progress.",
      "Anchoring newly available weeknight and weekend hours to scheduled gym sessions converts unstructured downtime into measurable physical strength and composition improvements.",
      "Mapping workouts directly into open calendar slots establishes training as a key daily anchor. This provides physical stimulus for muscle retention and creates a consistent weekly rhythm.",
    ],
  },
  {
    h2: "What 90 days looks like during a major life transition",
    paras: [
      "Over a 90-day coaching timeline, consistent training yields predictable physical progression: noticeable fat loss, improved muscle definition around shoulders and back, and a baseline routine that runs reliably.",
      "Ninety days of consistent full-body training and structured nutrition delivers visible body recomposition and restores internal control during a major life reset.",
      "Weeks 1–4 establish baseline movement patterns and protein consistency. Weeks 5–8 deliver measurable strength gains and waist reduction. Weeks 9–12 solidify body recomposition results that improve posture, energy, and physical confidence.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is it a bad idea to start a fitness program right after a breakup or divorce?",
    a: "Usually the opposite — a changed schedule and routine is disruptive either way; channeling it into training gives structure during a period that otherwise tends toward drift.",
  },
  {
    q: "How do I stay consistent when everything else in my life just changed?",
    a: "Keep the program simple and non-negotiable — 3 sessions a week, a clear nutrition target — while everything else is in flux. Complexity is what breaks during a life transition, not effort.",
  },
  {
    q: "I've been stress-eating or drinking more since the breakup — does that ruin my progress?",
    a: "It slows it, doesn't erase it. Nutrition coaching accounts for real patterns, not an idealized version of your week, and adjusts targets accordingly rather than demanding perfection immediately.",
  },
  {
    q: "I'm cooking for myself for the first time in years — where do I start?",
    a: "Simple, repeatable meals built around a protein target beat complicated recipes. The goal is consistency, not culinary skill.",
  },
  {
    q: "Is this page about dating or fitness?",
    a: "Fitness and routine only. The life change is the context for why the schedule and habits shifted — the coaching itself is training and nutrition, not relationship advice.",
  },
  {
    q: "How long before I feel like myself again, physically?",
    a: "Visible strength and composition changes in 8-12 weeks of consistent training, similar to any structured start — the timeline doesn't change because of the trigger, only the reason someone started.",
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

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Getting Back in Shape After a Breakup or Divorce: A Fitness Restart, Not a Life Overhaul",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Getting Back in Shape After a Breakup or Divorce: A Fitness Restart, Not a Life Overhaul",
  description:
    "A fitness restart built around schedule shifts, single-person nutrition, and routine structure for men navigating a breakup or divorce.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Fitness restart after breakup" },
    { "@type": "Thing", name: "Single-person nutrition system" },
    { "@type": "Thing", name: "Body recomposition routines" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fitness Coaching for Men Navigating a Major Life Transition",
  serviceType: "fitness coaching for men navigating a major life transition",
  description:
    "1:1 online coaching for men navigating a breakup or divorce — simple 3x/week workouts, single-person nutrition systems, and weekly accountability.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${SITE_URL}${SLUG}`,
};

export default function MenStartingOverPage() {
  return (
    <>
      <JsonLd id="men-starting-over-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="men-starting-over-article-schema" data={articleSchema} />
      <JsonLd id="men-starting-over-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Getting Back in Shape After a Breakup or Divorce: A Fitness Restart, Not a Life Overhaul
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A breakup or divorce changes two things that directly affect fitness: the schedule (evenings and weekends that used to revolve around someone else are now open) and the coping pattern (stress-eating, drinking more, or just not having the energy to cook properly). Both cut in a direction that either derails fitness completely or, handled deliberately, becomes the most consistent stretch of training a lot of men ever have — the newly-freed time is real, even if it doesn&apos;t feel like an opportunity at first. This page isn&apos;t relationship advice; it&apos;s about using a genuinely disruptive life change as the structural reset point for training and nutrition instead of letting it become another few months of drift. Coaching here means building a simple, repeatable routine around a schedule that&apos;s actively changing, with nutrition that doesn&apos;t rely on someone else&apos;s cooking or grocery habits, and accountability that doesn&apos;t depend on motivation being high every single week — because right after a major life change, it usually isn&apos;t.
          </p>
        </header>

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

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/for/new-dads"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For new dads
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Another major life transition trigger — how to keep training simple when time and schedule undergo an abrupt shift.
              </span>
            </Link>
            <Link
              href="/blog/how-to-stay-consistent-with-diet-on-weekends"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to stay consistent with diet on weekends
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Practical strategies for managing social schedule shifts without resetting your diet every Monday.
              </span>
            </Link>
            <Link
              href="/blog/why-you-cant-stay-consistent-with-the-gym"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Why you can&apos;t stay consistent with the gym
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The structural reasons workouts fall off during busy or stressful life periods — and how to fix them.
              </span>
            </Link>
            <Link
              href="/resources/bad-week-adjustment-loop"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Bad-week adjustment loop
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How to handle chaotic or off-track weeks without spiraling into long-term drift.
              </span>
            </Link>
            <Link
              href="/guides/getting-back-in-shape-after-a-long-break"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Getting back in shape after a long break
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                A step-by-step roadmap for rebuilding strength and nutrition habits after months or years away from training.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        {/* Price before the ask. Nine of twelve money pages never stated a
            coaching price; on these 21 the only figure was the community at
            67-91% depth. */}
        <CoachingPriceLine />

        {/* Early, in-read. These 21 audience pages carried no capture at
            all, and two of them are the highest buying-intent pages on the
            site by human search demand. */}
        <ArticleEarlyCapture
          slug="men-starting-over-after-a-breakup-or-divorce"
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

        {/* Proof module & CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            A fitness restart built around your changing life.
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            When life changes drastically, rigid plans fail. 1:1 coaching provides a simple 3-day weekly strength program adaptable to a changing schedule, single-person nutrition systems, and direct weekly accountability. Entry options start with the $100 one-time consultation call or personalized 1:1 coaching.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or apply for 1:1 coaching — three questions, under two minutes.
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

        <HubRetentionCTA hub="men-starting-over-after-a-breakup-or-divorce" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import MoneyPageProof from "@/components/MoneyPageProof";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { fitSeoTitle } from "@/lib/seoMetadata";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/accountability";

export const metadata: Metadata = {
  title: fitSeoTitle("Fitness Accountability Coaching — When Consistency Is the Real Problem | Geebs Coaching"),
  description:
    "1:1 fitness accountability coaching with Kris Oddo (NASM-CPT): daily check-ins, weekly review, and a human who notices before drift becomes another restart.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Fitness Accountability Coaching — When Consistency Is the Real Problem",
    description:
      "Accountability coaching for men who have the plan but not the follow-through. Daily check-ins, weekly review, 1:1 with Kris Oddo.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Fitness accountability coaching by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Accountability Coaching — When Consistency Is the Real Problem",
    description:
      "1:1 fitness accountability coaching — for when the plan is not the problem.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "The program was never the problem",
    paras: [
      "Most men who hire a fitness coach have already tried multiple programs. They know what to eat. They know they should lift three days a week. They have had a gym membership for years. The problem is not knowledge or even willpower — it is having a system that holds them accountable to what they already know.",
      "Consistency is the variable that separates the men who get results from the men who restart every few months with a new plan. When consistency is the real constraint, fixing the program is the wrong solution. Fixing the accountability system is the right one.",
      "Geebs Coaching is built around this. The daily check-ins, the weekly review, and the direct access to Kris are not add-ons to the program. They are the product. The training and nutrition are the vehicle. Accountability is what makes it drive.",
    ],
  },
  {
    h2: "What daily accountability actually looks like",
    paras: [
      "Daily accountability is not motivational messages. It is a practical check-in around the actual day: where training fits, what meals look like, how sleep and recovery went, and whether anything needs to shift before tomorrow.",
      "Kris reads those check-ins and responds. If a workout got skipped, he knows before you have decided whether to write it off. If nutrition fell apart Tuesday, the adjustment happens Wednesday — not at the end of the week when the damage is done.",
      "That real-time feedback loop is what separates 1:1 coaching from an app that logs your data without anyone actually looking at it.",
    ],
  },
  {
    h2: "Accountability versus motivation",
    paras: [
      "Motivation is a feeling. Accountability is a system. You cannot build a fitness plan on motivation because motivation is not available on demand — it is highest when you start, lowest when you need it most.",
      "Accountability does not require you to feel motivated. It requires you to check in, which you can do whether or not you feel like training. That daily friction of a real coach expecting to hear from you is a different mechanism than re-reading a motivational quote and hoping it sticks.",
      "The research on this is consistent: supervised, coach-led training has dramatically higher adherence rates than self-guided training. The difference is not the program. It is the external accountability loop.",
    ],
  },
  {
    h2: "What happens when you go dark",
    paras: [
      "With an app or a generic program, going dark is invisible. You stop logging, the streak resets, and no one notices until you decide to come back — if you do.",
      "With a 1:1 coach, going dark is a signal. Kris notices. The check-in that did not come in triggers a message, a conversation about what happened, and a recalibration. The goal is not to shame anyone for a hard week — it is to prevent a hard week from becoming a hard month.",
      "That is the specific failure mode that sinks most men who train alone: a hard week leads to two, which becomes a silent quit. A coach catches it at the week.",
    ],
  },
  {
    h2: "Why apps and streaks fail",
    paras: [
      "Streaks are gamification. They measure logging, not progress. Most fitness apps optimized for streak maintenance are not optimizing for body composition change — they are optimizing for daily opens.",
      "An accountability system built on a streak fails the moment the streak breaks, which is the exact moment the person most needs to stay in the game. A coach does not reset the relationship when you miss a day.",
      "This is not a knock on fitness apps for what they are good at. Tracking is useful. Logging is useful. But if the problem is consistency, the streak mechanic is not the fix — a human who notices and responds is.",
    ],
  },
  {
    h2: "How long until consistency becomes self-sustaining",
    paras: [
      "Most clients who start Geebs Coaching for accountability reasons find that the need for external accountability decreases over four to six months — not because the coaching is fading, but because the habits are becoming internal. The goal is not to create indefinite dependency on a coach. It is to build the pattern until it runs without external support.",
      "Most clients stay for four to nine months. Some graduate to running their own programming; many re-sign for a second or third block while in a new training phase. The measure of successful accountability coaching is not years of retention — it is the client knowing what to do and being able to do it.",
    ],
  },
];

const faqs = [
  {
    q: "What does daily fitness accountability actually look like?",
    a: "A daily check-in around the practical questions: where training fits today, how nutrition went, how sleep was, and whether anything needs adjusting before tomorrow. Kris reads and responds. If something fell off, the adjustment happens in real time — not at the end-of-week review when the week is already gone.",
  },
  {
    q: "Is accountability coaching the same as motivation coaching?",
    a: "No. Motivation is a feeling that comes and goes; accountability is a system you can use regardless of how you feel. The daily check-in does not require motivation. It requires showing up to the system, which is a lower bar than needing to feel ready to train.",
  },
  {
    q: "What happens if I stop checking in?",
    a: "Kris notices. A missed check-in triggers a message, not a streak reset. The goal is to catch the hard week before it becomes a hard month — which is the specific failure mode that ends most solo training attempts. Going dark is a signal, not a default.",
  },
  {
    q: "Does accountability coaching feel like being nagged?",
    a: "The framing is practical, not motivational. Check-ins are about logistics — where training fits, how meals went — not about reading you a speech. Most clients describe the accountability as a useful external pressure, not pressure that feels intrusive.",
  },
  {
    q: "Why do fitness apps and streaks fail for consistency?",
    a: "Streaks measure logging, not progress, and they reset the moment you miss a day — which is the exact moment you most need the system to hold. A coach does not reset the relationship when you skip a workout. The streak mechanic fails at the failure mode it was supposed to prevent.",
  },
  {
    q: "How long before I can stay consistent on my own?",
    a: "Most clients find the external accountability need decreases over four to six months as the habits become internal. The goal is for the pattern to eventually run without needing a coach to check in — not to create indefinite dependency. The coaching works itself toward graduation.",
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
  title: "Fitness Accountability Coaching — When Consistency Is the Real Problem",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Fitness Accountability Coaching — When Consistency Is the Real Problem",
  description:
    "1:1 fitness accountability coaching for men: daily check-ins, weekly review, and a human who catches drift before it becomes another restart.",
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
  datePublished: "2026-06-10",
  dateModified: "2026-11-08",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Fitness accountability coaching" },
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Consistency coaching" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Fitness accountability coaching",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach, NASM-CPT",
    url: `${SITE_URL}/about`,
  },
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "1:1 online fitness accountability coaching: daily check-ins, weekly review, real-time plan adjustments, and a coach who notices before drift becomes another restart.",
  url: `${SITE_URL}${SLUG}`,
};

export default function AccountabilityPage() {
  return (
    <>
      <JsonLd id="accountability-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="accountability-article-schema" data={articleSchema} />
      <JsonLd id="accountability-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Fitness accountability coaching — when consistency is the real
            problem
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            You already know what to do. The missing piece is a coach who
            notices before a hard week becomes a silent quit — daily check-ins,
            weekly review, and a real human on the other end.
          </p>
          <ProofStrip className="mt-6" />
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

        <MoneyPageProof
          eyebrow="Proof trail"
          title="What backs the accountability claim"
          intro="Accountability pages need more than the promise of daily check-ins. These are the visible results, public reviews, and methodology pages that show the coaching is a real operating system, not just a sales label."
        />

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Read the full accountability guide
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The deeper dive on what accountability coaching is, the adherence
            research behind it, and how it differs from motivation is in the{" "}
            <Link
              href="/blog/fitness-accountability-coach"
              className="underline hover:text-bone"
            >
              fitness accountability coach guide
            </Link>
            . Related:{" "}
            <Link
              href="/blog/why-you-cant-stay-consistent-with-the-gym"
              className="underline hover:text-bone"
            >
              why you can&apos;t stay consistent with the gym
            </Link>
            .
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/vs/fitness-apps"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                1:1 coaching vs fitness apps
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Why the adherence gap between apps and coaching is the whole
                story.
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
                When the calendar is the accountability problem.
              </span>
            </Link>
            <Link
              href="/for/men-who-travel-for-work"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For men who travel for work
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Accountability coaching that survives the road.
              </span>
            </Link>
            <Link
              href="/resources/high-protein-fast-food-guide"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Eating out without restarting the week
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                A practical restaurant-order guide, plus the human review that
                keeps one rushed meal from becoming an all-or-nothing spiral.
              </span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/apply?utm_source=site&utm_medium=accountability&utm_campaign=contextual_cta&utm_content=accountability_primary"
              className="btn btn-primary"
              data-cta="accountability_primary"
              data-analytics-source="accountability"
            >
              Get a plan that survives busy weeks
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/blog/fitness-accountability-coach"
              className="btn btn-secondary"
            >
              Read the accountability guide
              <span aria-hidden="true">→</span>
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
          slug="accountability"
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

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Stop restarting. Start building.
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            1:1 coaching is application-based — three questions, under two
            minutes. If 1:1 is not the right fit yet, the $100 one-time
            consultation call is available without an application.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/should-you-track-strength-while-losing-weight"
              className="underline hover:text-bone"
            >
              whether you should track strength while losing weight
            </Link>{" "}
            and{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how many weekly sets it takes to build muscle
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

        <HubRetentionCTA hub="accountability" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-12.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

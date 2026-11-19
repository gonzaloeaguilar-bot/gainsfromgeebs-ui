import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/software-engineers";

export const metadata: Metadata = {
  title: "Online Fitness Coaching for Software Engineers | Geebs Coaching",
  description:
    "1:1 online fitness coaching for software engineers and developers: strength training adapted to desk work, nutrition support, daily accountability with NASM-CPT coach.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Fitness Coaching for Software Engineers",
    description:
      "Coach-led fitness for software engineers and developers: strength training, nutrition, and accountability built around desk work.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Fitness coaching for software engineers by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Coaching for Software Engineers",
    description:
      "1:1 online fitness coaching for developers and tech workers who sit all day.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Coding changes the fitness problem",
    paras: [
      "Software engineers do not usually fail because they lack information. They fail because the work rewards long blocks of sitting, intense focus, late fixes, skipped meals, and a nervous system that stays switched on after the laptop closes.",
      "A normal fitness plan treats the week like time and energy are stable. A developer week is often different: deep work, meetings, on-call, launches, debugging, and context switching. The plan has to fit that reality.",
      "Geebs Coaching is 1:1 online fitness coaching for people in software, engineering, and tech who want structure without turning fitness into another overloaded system.",
    ],
  },
  {
    h2: "What developers usually need",
    paras: [
      "Most software engineers need fewer moving parts: three focused lifting days, a clear progression model, protein targets, and default meals that work when the day gets eaten by code.",
      "The goal is to counter the desk-bound pattern without pretending a standing desk is a full training plan. Walking, mobility, and better work breaks help, but strength training is the anchor.",
      "Kris builds the program around gym access, schedule, recovery, and the actual week. The plan should survive a sprint, a production issue, or a week where deep work took more out of you than expected.",
    ],
  },
  {
    h2: "The support layer matters",
    paras: [
      "Developers are good at optimizing systems, but that can become a trap. You can spend months researching the perfect split while the body stays the same.",
      "Coaching creates a constraint: the plan is chosen, the work is reviewed, and the next week gets adjusted instead of endlessly redesigned. You still learn the why, but you do not have to be your own coach.",
      "For a technical person, the value is not hype. It is a clear system, daily accountability, weekly feedback, and a human who notices when the plan is drifting.",
    ],
  },
];

const faqs = [
  {
    q: "What does fitness coaching for software engineers include?",
    a: "Fitness coaching for software engineers at Geebs Coaching includes a strength program built around desk work and gym access, protein and nutrition defaults that survive sprint weeks, daily accountability messages, and a weekly check-in that adjusts the plan from real data. Kris Oddo, NASM-CPT, coaches 1:1 — it is one named coach, not an app.",
  },
  {
    q: "Is online fitness coaching good for software engineers?",
    a: "Yes, when it is built around desk work, deep work, and unpredictable tech schedules. The plan needs clear lifting structure, simple nutrition defaults, daily accountability, and weekly adjustment when the work week changes.",
  },
  {
    q: "How many days should a software engineer train?",
    a: "Three focused resistance-training days per week is the best default for many software engineers. It creates enough stimulus without fighting the calendar every day.",
  },
  {
    q: "Can coaching help if I sit all day?",
    a: "Coaching can help by building a plan around the reality of desk work: strength training, walking targets, nutrition defaults, and accountability that keeps the work from drifting.",
  },
  {
    q: "Is this only for remote developers?",
    a: "No. It works for remote, hybrid, and office-based developers. The main constraint is the same: long sedentary work blocks and a week that can get consumed by technical work.",
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

// Breadcrumb coverage across /for was 0 of 21 pages (measured 2026-09-23).
// The /for hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Fitness Coaching for Software Engineers",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fitness Coaching for Software Engineers",
  description:
    "1:1 online fitness coaching for software engineers, developers, and tech workers.",
  author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: "2026-05-22",
  dateModified: "2026-06-12",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Fitness coaching for software engineers" },
    { "@type": "Thing", name: "Developer fitness" },
    { "@type": "Thing", name: "Online fitness coaching" },
  ],
};

export default function SoftwareEngineersPage() {
  return (
    <>
      <JsonLd id="software-engineers-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="software-engineers-article-schema" data={articleSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coaching for software engineers
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A 1:1 coaching process for developers, engineers, and tech workers
            who sit all day, overthink the plan, and need the structure to
            survive real work.
          </p>
          <ProofStrip className="mt-6" />
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            What fitness coaching for software engineers looks like
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Fitness coaching for software engineers works when it is built
            around the actual job: three focused strength sessions that survive
            sprints and on-call, protein and meal defaults for days eaten by
            code, daily accountability so the plan does not silently drift, and
            a weekly review that adjusts from real data instead of a redesign.
            That is how Kris Oddo, NASM-CPT, coaches developers 1:1 at Geebs
            Coaching &mdash; one named coach who knows your week, not an app.
          </p>
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
          slug="software-engineers"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />


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

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Start with the developer path
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Read the{" "}
            <Link
              href="/blog/workout-plan-for-software-engineers"
              className="underline hover:text-bone"
            >
              software engineer workout plan
            </Link>
            , the{" "}
            <Link
              href="/blog/workout-plan-for-programmers"
              className="underline hover:text-bone"
            >
              workout plan for programmers
            </Link>
            , the{" "}
            <Link
              href="/blog/strength-training-for-desk-workers"
              className="underline hover:text-bone"
            >
              desk-worker strength guide
            </Link>
            , or compare{" "}
            <Link href="/vs/chatgpt" className="underline hover:text-bone">
              Geebs vs ChatGPT self-coaching
            </Link>
            .
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how many sets it takes to build muscle
            </Link>
            , and{" "}
            <Link
              href="/science/questions/is-lifting-good-for-metabolic-health"
              className="underline hover:text-bone"
            >
              what lifting does for metabolic health
            </Link>
            .
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link href="/for/remote-workers" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">For remote workers</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Structure for days where the commute is ten steps.</span>
            </Link>
            <Link href="/for/busy-professionals" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">For busy professionals</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Coaching built around packed calendars and real weeks.</span>
            </Link>
            <Link href="/guides/how-much-does-an-online-fitness-coach-cost" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Online fitness coach cost guide</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Compare coaching tiers, what 1:1 includes, and how pricing scales with support.</span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_engineers_primary">
              Get a plan that fits a dev week
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/for/remote-workers" className="btn btn-secondary">
              Remote worker coaching
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <HubRetentionCTA hub="software-engineers" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-12.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

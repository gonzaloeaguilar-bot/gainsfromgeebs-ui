import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/founders";

export const metadata: Metadata = {
  title: "Fitness Coaching for Founders | 1:1 Coaching for Startups",
  description:
    "1:1 fitness coaching for founders who need training adapted to startup hours, volatile weeks, and unpredictable schedules. NASM-CPT Kris Oddo.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Fitness Coaching for Founders",
    description:
      "Coach-led 1:1 fitness coaching for founders who need a plan that bends with unpredictable work.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Fitness coaching for founders by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Coaching for Founders",
    description:
      "1:1 coaching for founders and entrepreneurs with volatile weeks.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "The founder week is not normal",
    paras: [
      "A startup founder does not have a clean week. Startup hours change, pressure is uneven, meals get pushed, sleep gets traded, and the work can expand into every empty space. A normal fitness plan does not survive that pattern for long.",
      "The answer is not pretending you have the calendar of a college athlete. The answer is a plan with fewer moving parts, clear defaults, and weekly adjustment when the business changes the week and decision fatigue is already high.",
      "Geebs Coaching is built for founders who need fitness to run inside a demanding life, not outside of it.",
    ],
  },
  {
    h2: "What founders usually need",
    paras: [
      "Founders usually do not need novelty. They need a simple program executed long enough to work: three or four training sessions, progressive overload, protein targets, calorie direction, and enough recovery to repeat it.",
      "The hard part is not knowing what matters. It is keeping the plan alive when the week gets loud. That is where the check-in and adjustment cadence matters.",
      "Kris builds the plan, reads the week, and adjusts the next one. The coaching is designed to remove the restart cycle.",
    ],
  },
  {
    h2: "A coach as a constraint",
    paras: [
      "When nobody is watching, founders can always find a reason to move the workout, skip the meal, or restart Monday. The business always has another task.",
      "A coach creates a constraint that the business does not create on its own. You have a plan, a check-in, and a person reviewing whether the work actually happened.",
      "That is the value: not motivation, not hype, and not more information. It is a system that keeps health from being the thing that silently gets spent.",
    ],
  },
  {
    h2: "What to compare before you hire anyone",
    paras: [
      "Founders tend to evaluate a coach the way they evaluate a hire, which is the right instinct pointed at the wrong questions. Credentials and audience size predict very little. What predicts whether this works is the coach's operating model.",
      "Ask how many clients they carry and who personally reads your check-in. A coach holding two hundred clients cannot review two hundred sets of weekly data, so at that volume you are buying a template and a support queue. Ask what happens to the plan the week you only train once — if the answer is not immediate and specific, they have not coached somebody through a fundraise.",
      "Then ask what leaving looks like. A coach who expects you to eventually not need them will describe it. An offer built to retain you indefinitely is a subscription with coaching language on it, and founders are unusually good at spotting that distinction in other markets and unusually bad at spotting it in this one.",
    ],
  },
  {
    h2: "When a coach is the wrong purchase this quarter",
    paras: [
      "Skip it during a fundraise or a launch crunch. Not because training does not matter then, but because a coaching relationship you cannot engage with converts into guilt, and guilt is worse for adherence than having no plan. Run something minimal and self-directed, and hire when your attention returns.",
      "Skip it if you have never finished a structured programme. The diagnostic is free and it is usually humbling: most founders discover the problem was never programme design.",
      "And skip it if you are buying it as a commitment device. This is the common failure among people who can easily afford it — the decision feels like progress, the plan lands, and the quarter passes unchanged. If a gym membership or an app has already failed this way for you, a larger invoice does not change the mechanism.",
    ],
  },
  {
    h2: "What the research actually says about founder-shaped failure",
    paras: [
      "The failure founders describe — knowing exactly what to do and not doing it — is documented. Deslippe and colleagues (2023, PMID 36782207) reviewed 35 qualitative studies and found adherence is governed at three levels: individual attitudes, environmental support and accountability, and the design of the intervention itself. Only the third is something you can buy, which is why delivery format matters more than programme novelty.",
      "Spiteri and colleagues (2019, PMID 31141447) reached the same place across 55 articles: adherence tracks goal setting, accountability, self-regulation and anticipating barriers rather than motivation. For a founder, anticipating barriers is the whole job — the barriers are known in advance and arrive on schedule.",
      "On whether remote coaching is a real substitute: Fyfe and colleagues (2022, PMID 35751032) ran a remotely monitored home-based resistance protocol and reported adherence of 81% to 97% with full retention and no safety events.",
    ],
  },
  {
    h2: "Honest limits of that evidence",
    paras: [
      "The Deslippe review (2023, PMID 36782207) drew 46% of its studies from North America and its mixed-sex studies were 86% female. The mechanisms it identifies generalise well; the samples were not founders.",
      "The Spiteri review (2019, PMID 31141447) covered middle-aged and older adults, 50 to 64 and 65 to 70. Younger founders share the resource constraints and may weight motivators differently.",
      "The Fyfe trial (2022, PMID 35751032) was a four-week feasibility pilot in community-dwelling older adults using brief exercise-snacking bouts, and its authors said longer randomised trials are needed. We cite it as evidence that remote delivery can sustain adherence, not as proof of a muscle outcome for a 35-year-old founder.",
    ],
  },
];

const faqs = [
  {
    q: "What does fitness coaching for founders include?",
    a: "Fitness coaching for founders at Geebs Coaching includes a strength plan built around volatile startup hours, protein and nutrition defaults that survive long days and travel, daily accountability messages, and a weekly check-in that adjusts volume and targets based on what the business actually did to your week. Kris Oddo, NASM-CPT, coaches 1:1 — one named coach, not an app.",
  },
  {
    q: "Is online fitness coaching good for founders?",
    a: "Yes, if it is truly adaptive. Founders need a plan that can handle unpredictable weeks, travel, late meetings, and inconsistent meals without collapsing.",
  },
  {
    q: "How much time does a founder need to train?",
    a: "Most founder plans can be built around three focused sessions per week. The goal is not maximal gym time; it is enough high-quality training repeated consistently.",
  },
  {
    q: "Can coaching work during a launch or fundraising period?",
    a: "Yes, but the plan may need to downshift temporarily. Kris adjusts training volume and nutrition targets around high-pressure periods instead of treating them like normal weeks.",
  },
  {
    q: "What if I travel often?",
    a: "Travel is handled with hotel-gym, bodyweight, or dumbbell substitutions plus simple nutrition defaults for airports, restaurants, and inconsistent schedules.",
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
  title: "Fitness Coaching for Founders",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fitness Coaching for Founders",
  description:
    "1:1 online fitness coaching for founders and entrepreneurs with volatile work weeks.",
  author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: "2026-05-22",
  dateModified: "2026-07-11",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Founder fitness" },
    { "@type": "Thing", name: "Fitness coaching for entrepreneurs" },
    { "@type": "Thing", name: "Online fitness coaching" },
  ],
};

export default function FoundersPage() {
  return (
    <>
      <JsonLd id="founders-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="founders-article-schema" data={articleSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coaching for founders
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A 1:1 coaching process for founders and entrepreneurs who need
            training, nutrition, and accountability that can survive volatile
            work weeks.
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
            What fitness coaching for founders looks like
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Fitness coaching for founders works when it is built around the
            actual startup week: a strength plan that survives fundraising,
            launches, and late-night sprints; protein and nutrition defaults
            for days eaten by the business; daily accountability so the plan
            does not quietly get dropped; and a weekly review that adjusts
            volume and targets based on what your week actually looked like.
            That is how Kris Oddo, NASM-CPT, coaches founders 1:1 at Geebs
            Coaching &mdash; one named coach who adapts the plan when the
            business changes the week.
          </p>
        </section>

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

        {/* Price before the ask. Nine of twelve money pages never stated a

            coaching price; on these 21 the only figure was the community at

            67-91% depth. */}

        <CoachingPriceLine />


        {/* Early, in-read. These 21 audience pages carried no capture at

            all, and two of them are the highest buying-intent pages on the

            site by human search demand. */}

        <ArticleEarlyCapture
          slug="founders"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Common questions</h2>
          <dl className="mt-6">
            {faqs.map((f) => (
              <div key={f.q} className="mt-7 first:mt-0">
                <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">{f.q}</dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Founder-specific next reads
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Start with the{" "}
            <Link href="/blog/how-to-get-in-shape-with-a-60-hour-work-week" className="underline hover:text-bone">
              60-hour work week guide
            </Link>
            , the{" "}
            <Link href="/blog/fitness-plan-for-men-who-travel-for-work" className="underline hover:text-bone">
              travel fitness plan
            </Link>
            , or the{" "}
            <Link href="/for/executives" className="underline hover:text-bone">
              executive coaching page
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
              href="/science/questions/does-poor-sleep-cause-cravings"
              className="underline hover:text-bone"
            >
              whether poor sleep drives cravings
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
            <Link href="/for/busy-professionals" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">For busy professionals</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Coaching built around packed calendars and real weeks.</span>
            </Link>
            <Link href="/for/high-income-professionals" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Premium coaching</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Direct coach judgment for people who are done buying apps.</span>
            </Link>
            <Link href="/vs/hiring-a-personal-trainer" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Online coaching vs hiring a personal trainer</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">An honest comparison for someone deciding between the two.</span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_primary">
              Get a plan built for your schedule
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See the methodology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <HubRetentionCTA hub="founders" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-07-11.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

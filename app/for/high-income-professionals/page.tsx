import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/high-income-professionals";

export const metadata: Metadata = {
  title: "Fitness Coaching for High Income Men | Private 1:1 Coaching",
  description:
    "1:1 fitness coaching for high-income men who want a real coach, not an app. Custom programming, daily accountability, weekly calls with NASM-CPT Kris Oddo.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Premium Online Fitness Coaching",
    description:
      "Private 1:1 fitness coaching for high-income professionals who want a coach-led process.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Premium online fitness coaching by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Online Fitness Coaching",
    description:
      "Private 1:1 coaching for high-income professionals.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "For people who are done buying apps",
    paras: [
      "High-income professionals usually do not need the cheapest fitness option. They need the one that actually gets used, adapts to their calendar, and has a real person making decisions with them.",
      "Apps can count reps, store workouts, and send reminders. They cannot understand why your week changed, whether your travel schedule killed recovery, or how to adjust nutrition after three client dinners.",
      "Geebs Coaching is positioned as a premium 1:1 process: custom training, nutrition guidance, daily accountability, and weekly check-ins with Kris Oddo.",
    ],
  },
  {
    h2: "What premium means here",
    paras: [
      "Premium does not mean complicated. It means personal. One coach knows the plan, the check-ins, the schedule, the sticking points, and the tradeoffs.",
      "The programming is built around the same fundamentals that work for everyone: progressive overload, protein, calories pointed at the goal, recovery, and consistency.",
      "The premium layer is the fit: the work is shaped around the way a high-responsibility professional actually lives.",
    ],
  },
  {
    h2: "The investment is handled on the call",
    paras: [
      "Exact package options are covered on the strategy call after Kris understands the goal, schedule, and support level. The point is not to sell a generic price sheet; it is to decide whether the coach-led path fits.",
      "If a real 3-6 month investment is not realistic right now, the $100 one-time consultation call is the cleaner starting point. If you want direct coach judgment and daily accountability, the application is the next step.",
    ],
  },
  {
    h2: "Who this is not for",
    paras: [
      "This is not for someone looking for a cheap template or a casual app subscription. The application asks about age, budget, and readiness because 1:1 coaching only works when you can commit.",
      "If the budget or timing is not right, the $100 one-time consultation call is the cleaner starting point. If you want coach-led adjustment and accountability, the 1:1 application is the gate.",
    ],
  },
  {
    h2: "How to judge any premium offer in five minutes",
    paras: [
      "If price is not the constraint, waste is. The risk is never overpaying slightly, it is buying something you will not use — so the questions worth asking are about attention, not features.",
      "Delete every feature a free programme also provides: app access, exercise libraries, check-in forms, community. What remains is what you are actually buying. Then ask how many clients the coach carries and who reads your weekly check-in, because attention is the only input that does not scale and it is what the price tracks.",
      "Finally ask what happens the week you manage one session instead of four. A coach who has worked with people on your schedule answers immediately. A coach selling positioning answers in adjectives.",
    ],
  },
  {
    h2: "What the research says about why the expensive tier can still fail",
    paras: [
      "Paying more does not buy adherence by itself. Deslippe and colleagues (2023, PMID 36782207) reviewed 35 qualitative studies and found adherence is governed at three levels — individual attitudes, environmental support and accountability, and the design of the intervention. Price is not among them; delivery format is.",
      "Spiteri and colleagues (2019, PMID 31141447) found across 55 articles that adherence tracks goal setting, accountability, self-regulation and anticipating barriers. For somebody with a demanding calendar, the anticipating is the part worth paying for, because the barriers are predictable.",
      "Fyfe and colleagues (2022, PMID 35751032) reported 81% to 97% adherence with full retention in a remotely monitored home-based resistance protocol, which is the evidence that remote delivery is a real format rather than a discount version of in-person training.",
    ],
  },
  {
    h2: "Honest limits of that evidence",
    paras: [
      "The Deslippe review (2023, PMID 36782207) took 46% of its studies from North America, and mixed-sex studies skewed 86% female. Accountability and self-regulation generalise; the samples were not high earners.",
      "The Spiteri review (2019, PMID 31141447) focused on adults aged 50 to 64 and 65 to 70. The constraints rhyme with a demanding career but the populations are not the same.",
      "The Fyfe trial (2022, PMID 35751032) was a four-week feasibility pilot in older adults, and its authors called for longer randomised trials before extending the adaptations. It supports remote delivery holding adherence; it is not proof of a body-composition outcome at your age or training history.",
    ],
  },
];

const faqs = [
  {
    q: "What is the best fitness coaching for high income men?",
    a: "For high-income men, the best fitness coaching is private and coach-led: one named coach who builds the program around travel, client dinners, and a packed calendar, handles daily accountability, and adjusts the plan weekly. That is the model Kris Oddo, NASM-CPT, runs at Geebs Coaching — a 1:1 process gated by an application, not an app subscription.",
  },
  {
    q: "What is premium online fitness coaching?",
    a: "Premium online fitness coaching is a private, coach-led process instead of a generic app or template. The plan is customized, supported daily, reviewed weekly, and adjusted around the client's actual schedule, progress, and constraints.",
  },
  {
    q: "Is Geebs Coaching for high-income professionals?",
    a: "Yes. The 1:1 offer is designed for clients who are ready to invest real money, time, and attention into a coach-led process. Exact package options are covered on the strategy call.",
  },
  {
    q: "Why not just use a fitness app?",
    a: "Apps can be useful, but they do not carry context or accountability the same way a coach does. Kris handles the daily accountability, reads the check-ins, and adjusts the plan.",
  },
  {
    q: "What happens if someone is not ready for 1:1?",
    a: "The application routes people who are not ready for 1:1 toward the $24.99/month community and the $100 one-time consultation call, which are lower-commitment starting points.",
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
  title: "Premium Online Fitness Coaching",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Premium Online Fitness Coaching",
  description:
    "Premium 1:1 online fitness coaching for high-income professionals.",
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
    { "@type": "Thing", name: "Premium online fitness coaching" },
    { "@type": "Thing", name: "Private fitness coach" },
    { "@type": "Thing", name: "High-income professionals" },
  ],
};

export default function HighIncomeProfessionalsPage() {
  return (
    <>
      <JsonLd id="premium-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="premium-article-schema" data={articleSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Premium online fitness coaching
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A private 1:1 coaching process for high-income professionals who
            want a real coach, daily accountability, and a plan built around
            the life they actually live.
          </p>
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
            Fitness coaching for high income men
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Fitness coaching for high-income men works best when it is private
            and coach-led: one named coach who builds the program around
            travel, client dinners, and a packed calendar, handles daily
            accountability, and adjusts the plan weekly from real data. That is
            the model Kris Oddo, NASM-CPT, runs at Geebs Coaching &mdash; a 1:1
            process gated by an application, not another app subscription.
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
          slug="high-income-professionals"
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
            Start with the right fit
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you are an executive or founder, see the{" "}
            <Link href="/for/executives" className="underline hover:text-bone">
              executive coaching page
            </Link>{" "}
            or{" "}
            <Link href="/for/founders" className="underline hover:text-bone">
              founder coaching page
            </Link>
            . Qualified 1:1 applicants book a strategy call after the form.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Prefer the peer-reviewed evidence first? See{" "}
            <Link
              href="/science/questions/is-lifting-good-for-metabolic-health"
              className="underline hover:text-bone"
            >
              what lifting does for metabolic health
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-strength-training-help-you-age-better"
              className="underline hover:text-bone"
            >
              whether strength training helps you age better
            </Link>
            , and{" "}
            <Link
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
            </Link>
            .
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link href="/for/busy-professionals" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">For busy professionals</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Coaching built around packed calendars and real weeks.</span>
            </Link>
            <Link href="/vs/hiring-a-personal-trainer" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Online coaching vs hiring a personal trainer</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">An honest comparison for someone deciding between the two.</span>
            </Link>
            <Link href="/guides/how-much-does-an-online-fitness-coach-cost" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Online fitness coach cost guide</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Compare coaching tiers, what 1:1 includes, and how pricing scales with support.</span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_primary">
              Get a plan built for your schedule
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/vs/chatgpt" className="btn btn-secondary">
              Compare vs AI self-coaching
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <HubRetentionCTA hub="high-income-professionals" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-12.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import ProofStrip from "@/components/ProofStrip";
import SkinnyFatCalculator from "@/components/SkinnyFatCalculator";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/skinny-fat-transformation-coach-denver";
const faqs = [
  { q: "Should a skinny-fat transformation start with a bulk or a cut?", a: "The starting choice depends on your actual baseline, not a blanket bulk-or-cut rule. Coaching begins with your lifting experience, appetite, schedule, and body-composition goal, then sets a calorie and protein starting point. Strength, adherence, measurements, photos, and recovery guide the next adjustment." },
  { q: "How is skinny-fat progress measured?", a: "Skinny-fat progress is measured with more than scale weight. Workout reliability, lift performance, the way clothes fit, appetite, body measurements, photos, and recovery all add useful context. The scale still matters when it helps explain the trend, but it does not get total control over each decision." },
  { q: "What makes skinny-fat coaching sustainable?", a: "Sustainable coaching builds training around days you can reliably complete and sets decision rules before the mirror or scale creates panic. Nutrition starts with calories and protein rather than an extreme reset. The plan is reviewed as a trend, then adjusted only when the feedback tells a consistent story." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export const metadata: Metadata = {
  title: "Skinny-Fat Transformation Coach in Denver | Stop Guessing Bulk or Cut",
  description:
    "Skinny-fat transformation coaching in Denver. Build a more athletic physique with a body-recomposition approach without extremes.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Skinny-Fat Transformation Coach in Denver",
    description: "Stop guessing whether to bulk or cut.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Denver skinny-fat transformation coaching by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinny-Fat Transformation Coach in Denver",
    description: "Stop guessing whether to bulk or cut.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h2: "Stop restarting the same debate",
    paras: [
      "The bulk-or-cut question matters, but it is rarely solved by picking the most aggressive option. Before changing calories, we look at the things that determine whether either phase will work: are you training with enough structure? Is your protein consistency high enough? Are sleep and stress undoing the plan?",
      "For many people, the first win is not a dramatic bulk or cut. It is establishing a steady recomposition phase long enough to train well and collect useful feedback."
    ],
  },
  {
    h2: "What a skinny-fat transformation actually asks of you",
    paras: [
      "It does not ask for a 12-week identity change. It asks for repeatable training, nutrition that is firm enough to create progress and flexible enough to survive real life, and a way to respond when a week goes sideways.",
      "The Geebs Method centers on four connected levers: Individualized hard training, nutrition that supports training, recovery habits, and daily accountability."
    ],
  },
  {
    h2: "Your plan is not a generic “lean bulk” template",
    paras: [
      "Online advice often treats everyone as the same beginner with the same appetite, schedule, lifting background, and body-composition goal. Your coaching plan starts with your actual baseline. We select a calorie and protein starting point, build training around the days you can reliably complete, and set decision rules before the scale or mirror makes you panic.",
      "Then we review the trend. If strength, adherence, body measurements, photos, and recovery tell a consistent story, we make a measured adjustment."
    ],
  },
];

export default function SkinnyFatDenverPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="skinny-fat-denver-faq-schema" data={faqSchema} />
      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Denver, Colorado</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Sustainable Skinny-Fat Transformation Coaching
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            “Should I bulk or cut?” becomes a trap when you do not feel lean enough to gain weight and do not feel muscular enough to diet harder. We help Denver clients build a more athletic physique with a proven body-recomposition approach.
          </p>
          <ProofStrip className="mt-6" />
        </header>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <SkinnyFatCalculator />
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

        <section aria-labelledby="skinny-fat-denver-faq-heading">
          <h2 id="skinny-fat-denver-faq-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Skinny-fat transformation questions</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">{faqs.map((faq) => <div key={faq.q} className="py-5"><h3 className="text-[17px] font-semibold text-bone">{faq.q}</h3><p className="mt-3 text-[15.5px] leading-[1.7] text-mute">{faq.a}</p></div>)}</div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Progress beyond the scale
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A skinny-fat transformation often looks subtle before it looks dramatic: more reliable workouts, better lift performance, clothes fitting differently, a steadier appetite, and less “I ruined it” thinking. We use the scale when it is useful, but it gets a vote—not total control.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Want the background first? The{" "}
            <Link href="/skinny-fat" className="underline hover:text-bone">
              skinny-fat guide
            </Link>{" "}
            covers the waist test, the protein target and the 3-day workout, with every related guide linked.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

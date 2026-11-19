import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import NutritionGuideLinks from "@/components/NutritionGuideLinks";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const faqs = [
  { q: "What do these nutrition guides cover?", a: "These nutrition guides turn human research into practical choices about food and supplements. Each guide explains what the research found, what you can do with it, and what the evidence does not prove. The aim is useful context, not turning one ingredient into the whole plan." },
  { q: "Can a supplement replace training and nutrition?", a: "No, a supplement cannot replace the foundations of your plan. Training, enough protein, sleep, and consistency still carry the larger job. Use the supplement guides to make a more informed choice without expecting one product to compensate for a system that is not working." },
  { q: "Where can I read the studies behind these guides?", a: "Use the study library when you want to read the supporting research. The nutrition pages give you the plain-English takeaway, while the science library keeps the study-level context and honest limits available. You can move between the two depending on how much detail you need." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export const metadata: Metadata = {
  title: "Nutrition and Supplement Evidence Guides | Geebs",
  description:
    "Plain-English nutrition and supplement guides: what human research found, what to do with it, and what the evidence does not prove.",
  alternates: { canonical: `${SITE_URL}/nutrition` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/nutrition`,
    title: "Nutrition and Supplement Evidence Guides",
    description:
      "Use the evidence without turning food or supplements into the whole plan.",
    siteName: "Geebs Coaching",
  },
  robots: { index: true, follow: true },
};

export default function NutritionGuidesPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="nutrition-faq-schema" data={faqSchema} />
      <section className="mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
        <p className="eyebrow text-cloudText">Nutrition evidence</p>
        <h1 className="display mt-4 max-w-[18ch] text-[40px] leading-[1.02] text-bone md:text-[62px]">
          Use the research. Keep the whole plan in view.
        </h1>
        <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.75] text-bone/85">
          These guides translate human research into useful choices without
          pretending one food or supplement can replace training, protein,
          sleep, or consistency.
        </p>
        <NutritionGuideLinks />
        <section
          className="mt-14 border-y border-line2 py-10 md:py-12"
          aria-labelledby="supplements-and-the-rest-of-the-week"
        >
          <p className="eyebrow text-cloudText">A useful boundary</p>
          <h2
            id="supplements-and-the-rest-of-the-week"
            className="display mt-4 max-w-[24ch] text-[28px] leading-[1.08] text-bone md:text-[38px]"
          >
            A supplement can fill a gap. It cannot run your week for you.
          </h2>
          <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.7] text-bone/85">
            Start with the specific question: protein powder, creatine,
            magnesium, or omega-3. Then look at what keeps breaking first.
            If meals, sleep, training, travel, or follow-through change every
            week, another product is unlikely to solve the bigger problem.
          </p>
          <div className="mt-7 grid gap-3 border-y border-line2 sm:grid-cols-2">
            <Link
              href="/science/protein-powder-vs-whole-food-protein"
              className="group border-b border-line2 py-4 text-[15.5px] font-semibold text-bone no-underline sm:border-b-0 sm:border-r"
            >
              Protein powder and food
              <span className="mt-1 block text-[13.5px] font-normal leading-[1.5] text-mute group-hover:text-bone">
                When convenience supports a real protein target.
              </span>
            </Link>
            <Link
              href="/science/creatine-and-hair-loss"
              className="group border-b border-line2 py-4 text-[15.5px] font-semibold text-bone no-underline sm:border-b-0"
            >
              Creatine
              <span className="mt-1 block text-[13.5px] font-normal leading-[1.5] text-mute group-hover:text-bone">
                What the hair-loss question does and does not show.
              </span>
            </Link>
            <Link
              href="/science/magnesium"
              className="group border-b border-line2 py-4 text-[15.5px] font-semibold text-bone no-underline sm:border-b-0 sm:border-r"
            >
              Magnesium
              <span className="mt-1 block text-[13.5px] font-normal leading-[1.5] text-mute group-hover:text-bone">
                Evidence before a sleep or recovery purchase.
              </span>
            </Link>
            <Link
              href="/science/omega-3-and-hormones"
              className="group py-4 text-[15.5px] font-semibold text-bone no-underline"
            >
              Omega-3
              <span className="mt-1 block text-[13.5px] font-normal leading-[1.5] text-mute group-hover:text-bone">
                A guide to the hormone claims around fish oil.
              </span>
            </Link>
          </div>
          <p className="mt-7 max-w-[68ch] text-[15.5px] leading-[1.7] text-mute">
            If you already know the basics but the plan keeps disappearing when
            work gets busy, read about{" "}
            <Link href="/for/accountability" className="underline hover:text-bone">
              coaching for accountability
            </Link>
            . The work is not finding a magic stack. It is building a plan
            that can survive a normal imperfect week.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/apply?utm_source=nutrition&utm_medium=owned_content&utm_campaign=supplement_accountability&utm_content=supplement_bridge"
              className="btn btn-primary"
              data-cta="nutrition_supplement_accountability_apply"
              data-cta-position="supplement_accountability_bridge"
            >
              Get a plan built around your real week
            </Link>
            <Link href="/for/accountability" className="btn btn-secondary">
              See how accountability coaching works
            </Link>
          </div>
        </section>
        <section className="mt-14" aria-labelledby="nutrition-faq-heading">
          <h2 id="nutrition-faq-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Nutrition guide questions</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            {faqs.map((faq) => <div key={faq.q} className="py-5"><h3 className="text-[17px] font-semibold text-bone">{faq.q}</h3><p className="mt-3 max-w-[68ch] text-[15.5px] leading-[1.7] text-mute">{faq.a}</p></div>)}
          </div>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/science" className="btn btn-secondary">
            Browse the study library
          </Link>
          <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
            Get this mapped to you
          </Link>
        </div>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

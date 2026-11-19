import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Link from "next/link";
import DayBuilderForm from "./DayBuilderForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/perfect-day-builder";
const DATE_MODIFIED = "2026-08-02";

export const metadata: Metadata = {
  title: "Perfect Day of Eating Builder — Gram Targets, Free | Geebs",
  description:
    "Build a full day of eating in grams from your bodyweight, goal, and how you eat. Free, no signup, and honest about which targets have evidence behind them.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Perfect Day of Eating Builder — Gram Targets, Free",
    description:
      "Enter bodyweight, goal, and how you eat. Get a full day in grams, meal by meal, with honest notes on what the evidence supports.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free perfect day of eating builder by The Geebs Method",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Day of Eating Builder — Free, Gram-Level",
    description:
      "A full day of eating in grams from your bodyweight and goal. No signup.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  name: "Perfect Day of Eating Builder",
  url: `${SITE_URL}${SLUG}`,
  isAccessibleForFree: true,
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    hasCredential: "NASM-CPT",
    url: `${SITE_URL}/about`,
  },
  description:
    "Free builder that turns bodyweight, goal, eating pattern, and meal count into a full day of eating with gram-level portions and honest evidence notes.",
  dateModified: DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the perfect day of eating builder decide the amounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Protein is set from your bodyweight and goal, using the same targets published on the Geebs macro calculator and methodology page. Fat is set as a floor, a share of calories, rather than something to minimise. Carbohydrate fills what remains. Foods are then portioned to hit those numbers and rounded to five grams, because nobody weighs food to the gram.",
      },
    },
    {
      "@type": "Question",
      name: "Will this meal plan raise my testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No plan can promise that, and this one does not. Choosing the hormone-supportive priority keeps fat at a floor instead of cutting it and favours foods like olive oil and whole eggs. The strongest single piece of evidence there is one small controlled trial on swapping butter for olive oil, which is promising rather than settled. Sleep, training, and body composition matter more than any food swap.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to eat exactly these foods?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The foods are an example of how to hit the numbers, not a prescription. Swap any item for something with a similar role and similar macros. The targets are the point; the specific foods are interchangeable, which is also why the builder can generate a different day on request.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable if I am vegetarian or pescatarian?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose your eating pattern and the builder only draws from foods that fit it. Vegetarian and pescatarian days are built from the same targets, using eggs, dairy, tofu, legumes, and fish where allowed.",
      },
    },
    {
      "@type": "Question",
      name: "Is the calorie estimate accurate if I leave the field blank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a rough estimate from bodyweight and goal, useful as a starting point but not a measurement. If you want a better number, run the TDEE calculator first and enter the result. Either way, treat the first week as data collection and adjust from what actually happens on the scale and in the gym.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/perfect-day-builder",
  title: "Perfect day of eating builder",
});

export default function PerfectDayBuilderPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="perfect-day-software-schema" data={softwareSchema} />
      <JsonLd id="perfect-day-faq-schema" data={faqSchema} />
      <JsonLd id="perfect-day-builder-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Perfect day of eating builder
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Tell it your bodyweight, your goal, and how you actually eat. It
            builds a full day in grams — meal by meal — and tells you which
            parts of it the evidence genuinely supports.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-mute max-w-[60ch]">
            No signup, no email required to see your plan, and no claim that a
            grocery list will fix your hormones.
          </p>
        </header>

        <div className="hair my-10" />

        <DayBuilderForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How the numbers are set
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Protein comes from your bodyweight and goal, using the same targets
            as the{" "}
            <Link href="/tools/macro-calculator" className="underline hover:text-bone">
              macro calculator
            </Link>{" "}
            so the tools cannot contradict each other. Fat is treated as a{" "}
            <b>floor</b> rather than something to cut — that is the part most
            aggressive diets get wrong. Carbohydrate fills what is left.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Your priority changes emphasis, not the arithmetic. Hormone-supportive
            days lean on olive oil and whole eggs; longevity days lean on oily
            fish, legumes, and vegetables; muscle days push protein hardest. The
            evidence behind each of those leans is graded, and the honest limits
            are printed with every plan rather than buried.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Food composition values are rounded reference figures for raw
            weights. They are for portioning, not clinical precision. For how
            studies get selected and graded on this site, see{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the methodology
            </Link>
            , and for the research behind specific foods, the{" "}
            <Link href="/nutrition/growth-hormone-foods" className="underline hover:text-bone">
              nutrition library
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5]">
                  {entry.name}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Built by Kris Oddo, NASM-CPT. Last reviewed {DATE_MODIFIED}. General
            nutrition information only — not medical advice, and not a diagnosis
            or treatment for any condition.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

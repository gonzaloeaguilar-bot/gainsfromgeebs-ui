import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import OneRmForm from "./OneRmForm";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "1RM Calculator — Estimate Your One-Rep Max + Training Loads",
  description:
    "Free 1RM calculator. Estimate your one-rep max from any set using the Epley and Brzycki formulas, and get a training-load table for every rep target. No signup.",
  alternates: { canonical: `${SITE_URL}/tools/1rm-calculator` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/1rm-calculator`,
    title: "1RM Calculator — One-Rep Max Estimator",
    description:
      "Estimate your one-rep max from any set, and get a training-load table for every rep target.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "1RM calculator by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "1RM Calculator — One-Rep Max Estimator",
    description:
      "Estimate your one-rep max and get a training-load table for every rep target.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to estimate your one-rep max",
  description:
    "Estimate a one-rep max from a completed set using the Epley and Brzycki formulas, then derive training loads.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter a recent set",
      text: "Enter the weight you lifted and the number of clean reps you completed, from a hard set you actually did. Use 1-12 reps.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Read your estimated 1RM",
      text: "The calculator averages the Epley and Brzycki formulas to estimate your one-rep max. It is most accurate from sets of 1-6 reps.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Use the training-load table",
      text: "The table shows what to load for common rep targets as a percentage of your 1RM — for programming strength and muscle-building work.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a one-rep max (1RM)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your one-rep max is the heaviest weight you can lift for a single clean repetition of an exercise. It is the standard reference point for programming strength training — most programs prescribe working loads as a percentage of 1RM.",
      },
    },
    {
      "@type": "Question",
      name: "How does a 1RM calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It estimates your one-rep max from a set you have actually completed — a weight and a rep count. This calculator averages two validated formulas, Epley (weight x (1 + reps/30)) and Brzycki (weight x 36 / (37 - reps)), then builds a table of training loads at common rep targets as a percentage of the estimate.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is a 1RM estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most accurate when the input set is in the 1-6 rep range. Accuracy drops as reps climb, because higher-rep sets depend more on conditioning and rep endurance than on pure strength. Treat the number as a close estimate, not a tested max, and re-estimate from a fresh hard set every few weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Should I test my actual one-rep max?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most clients training for body composition, no. A true 1RM test carries injury risk and a recovery cost with little practical benefit. An estimate from a hard set of 3-6 reps is enough to program from. Competitive powerlifters test their max; general lifters are better off estimating.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use my 1RM for training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the percentage table. Strength work generally sits around 85-95% of 1RM for low reps; muscle-building work sits around 70-80% for moderate reps. Pick the weight next to your target rep count, then adjust based on how the set actually feels — the estimate gets you close, the set tells you the rest.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/1rm-calculator",
  title: "1RM calculator",
});

export default function OneRmPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="1rm-howto-schema" data={howToSchema} />
      <JsonLd id="1rm-faq-schema" data={faqSchema} />
      <JsonLd id="1rm-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            1RM calculator
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Estimate your one-rep max from any set using the Epley and Brzycki
            formulas, and get a training-load table for every rep target. No
            signup. No email gate.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <OneRmForm />
        </div>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How it works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The calculator takes a set you have actually done and runs it
            through two validated estimators — Epley (weight × (1 + reps/30))
            and Brzycki (weight × 36 ÷ (37 − reps)) — then averages them. From
            that 1RM it builds a table of training loads at standard
            percentages.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            It is an estimate, most accurate from low-rep sets (1-6). Use it to
            set programming loads and to track strength over time — re-run it
            from a fresh hard set every few weeks rather than testing a true max.
          </p>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Want a coach to program the loads for you?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A 1RM is just a number. The work is turning it into a week of
            training that progresses — knowing when to add load, when to hold,
            and when to back off. That is what 1:1 coaching with Kris is for.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/blog/progressive-overload-explained"
              className="btn btn-secondary"
            >
              Progressive overload guide
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ToolRetentionCTA tool="1rm-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-05-22. Formulas:
            Epley (1985) and Brzycki, M. (1993). Strength testing — predicting a
            one-rep max from reps to fatigue. <i>JOPERD</i>, 64(1), 88-90.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import BodyFatForm from "./BodyFatForm";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Body Fat Calculator for Men — U.S. Navy Method",
  description:
    "Free body fat percentage calculator using the U.S. Navy method — just a tape measure. Get your body fat %, category, and fat/lean mass split. No signup, no email gate.",
  alternates: { canonical: `${SITE_URL}/tools/body-fat-calculator` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/body-fat-calculator`,
    title: "Body Fat Calculator — U.S. Navy Method",
    description:
      "Estimate your body fat percentage with a tape measure using the U.S. Navy method.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Body fat calculator by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat Calculator — U.S. Navy Method",
    description:
      "Estimate your body fat percentage with a tape measure — Navy method.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate body fat with the U.S. Navy method",
  description:
    "Estimate body fat percentage from neck, waist, and height measurements using the U.S. Navy circumference method.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Take your measurements",
      text: "With a tape measure, relaxed: waist circumference at the navel, neck circumference just below the larynx, and your height. Keep the tape snug, not compressing.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter measurements and bodyweight",
      text: "Enter height, neck, waist in inches, plus your current bodyweight in pounds.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your result",
      text: "The calculator returns estimated body fat percentage, a category, and your fat-mass and lean-mass split.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the Navy body fat calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The U.S. Navy method estimates body fat from circumference measurements rather than skinfold calipers or a scan. For men, it uses neck and waist circumference and height in a logarithmic formula: %BF = 86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76, with all measurements in inches.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the Navy body fat method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is typically within about 3-4 percentage points of a DEXA scan for most men — good enough to track progress, not precise enough to treat as an exact number. Its real strength is consistency: measure the same way every few weeks and the trend is reliable, even if the absolute figure is an estimate.",
      },
    },
    {
      "@type": "Question",
      name: "What is a healthy body fat percentage for men?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reference ranges for men: essential fat is roughly 2-5%, athletic is about 6-13%, fitness is about 14-17%, average is about 18-24%, and 25% or higher is above average. Visible abs typically start to appear in the low-to-mid teens. For men 25-40, the average band is the most common starting point.",
      },
    },
    {
      "@type": "Question",
      name: "How do I measure my waist and neck correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Measure relaxed, not flexed or sucked in. Take the waist at the level of the navel, and the neck just below the larynx with the tape sloping slightly down to the front. Keep the tape snug against the skin without compressing it, and measure at the same time of day each time for consistent tracking.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a NASM body fat calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator was built and is maintained by Kris Oddo, a NASM-certified personal trainer (NASM-CPT), and uses the U.S. Navy circumference method — a tape-measure approach NASM-certified coaches commonly use in practice because it needs no calipers or scan. NASM itself is a certification body, not a single formula: NASM-CPTs assess body fat with circumference methods like this one, skinfold calipers, or bioelectrical impedance depending on the setting.",
      },
    },
    {
      "@type": "Question",
      name: "How do I lower my body fat percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a sustained, modest calorie deficit while resistance training and keeping protein high — that loses fat while protecting lean mass, so your body fat percentage drops without you just getting smaller. That is body recomposition. Crash diets lower bodyweight but often raise body fat percentage by burning muscle.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/body-fat-calculator",
  title: "Body fat calculator",
});

export default function BodyFatPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="bodyfat-howto-schema" data={howToSchema} />
      <JsonLd id="bodyfat-faq-schema" data={faqSchema} />
      <JsonLd id="body-fat-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Body fat calculator
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Estimate your body fat percentage with the U.S. Navy method — just a
            tape measure, no calipers or scan. Returns your body fat %,
            category, and fat/lean mass split. No signup. No email gate.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <BodyFatForm />
        </div>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How it works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The U.S. Navy method estimates body fat from circumference
            measurements. For men it runs neck, waist, and height through a
            logarithmic formula — no calipers, no scan, just a tape measure. It
            is the most accessible estimate that still tracks reliably.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            Treat the number as an estimate, accurate to within a few points.
            Its value is the trend: measure the same way every few weeks and
            watch the direction. A flat scale with a falling waist measurement
            is exactly what body recomposition looks like.
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Looking for a NASM body fat calculator?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            NASM is a certification body, not a single formula — NASM-certified
            trainers assess body fat with whatever method fits the setting:
            circumference formulas like the U.S. Navy method used here,
            skinfold calipers, or bioelectrical impedance. This calculator was
            built and is maintained by Kris Oddo, NASM-CPT, and uses the
            tape-measure approach because it is the method you can repeat at
            home with consistent results.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            The category ranges it returns (essential, athletic, fitness,
            average, above average) match the reference bands NASM-certified
            coaches commonly work from, so you can bring the number straight
            into a conversation with any trainer.
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Related tools and guides
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2 text-[15px]">
            <Link
              href="/tools/macro-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Macro calculator for body recomposition
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Calculate daily protein, carbs, and fat targets based on your
                body fat percentage, weight, and phase.
              </span>
            </Link>
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Check whether your body fat percentage and lifting background
                make you a viable candidate for recomposition.
              </span>
            </Link>
            <Link
              href="/tools/tdee-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Find your maintenance and fat-loss calorie targets before
                planning your nutrition.
              </span>
            </Link>
            <Link
              href="/tools/calorie-deficit-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Calorie deficit calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Estimate projected weekly fat loss across mild, standard, and
                aggressive deficits.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Want a coach to bring the number down?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Lowering body fat without losing the muscle under it is the actual
            skill — a modest deficit, real training, enough protein, run long
            enough. That is what 1:1 coaching with Kris is built around.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/blog/body-recomposition-for-men"
              className="btn btn-secondary"
            >
              Body recomposition guide
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ToolRetentionCTA tool="body-fat-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-07-06. Method:
            U.S. Navy circumference body-fat equation (Hodgdon &amp; Beckett,
            1984). An estimate — not a substitute for a DEXA scan.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import KrisNote from "@/components/KrisNote";
import TdeeForm from "./TdeeForm";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title:
    "TDEE Calculator — Maintenance, Cut, and Bulk Calories",
  description:
    "Calculate your TDEE (Total Daily Energy Expenditure) using the Mifflin-St Jeor equation. Get your maintenance, cut, recomp, and bulk calorie targets. Free, no signup.",
  alternates: { canonical: `${SITE_URL}/tools/tdee-calculator` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/tdee-calculator`,
    title: "TDEE Calculator — Mifflin-St Jeor, Cut/Recomp/Bulk Targets",
    description:
      "Free TDEE calculator using the Mifflin-St Jeor equation. Returns maintenance, cut, recomp, and bulk targets.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "TDEE calculator by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator — Mifflin-St Jeor, Cut/Recomp/Bulk Targets",
    description:
      "Free TDEE calculator using the Mifflin-St Jeor equation.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate your TDEE",
  description:
    "Calculate Total Daily Energy Expenditure using the Mifflin-St Jeor equation, then derive cut, recomp, and bulk targets.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your stats",
      text: "Enter sex, age, current bodyweight in pounds, and height in feet and inches.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select activity level",
      text: "Pick the activity multiplier that best matches your weekly training and movement: sedentary (1.2x), light (1.375x), moderate (1.55x), active (1.725x), or very active (1.9x).",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your results",
      text: "BMR is your resting baseline. TDEE is your maintenance. Cut is TDEE minus 500 kcal. Recomp is TDEE minus 200 kcal. Bulk is TDEE plus 250 kcal.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE stands for Total Daily Energy Expenditure — the total calories your body burns in a day including resting metabolism, daily movement, and exercise. It is the calorie target for maintaining your current weight. Cuts go below TDEE, bulks go above.",
      },
    },
    {
      "@type": "Question",
      name: "Which BMR equation does this TDEE calculator use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mifflin-St Jeor. It is the most accurate BMR equation for the general population per research validation, and it is the default used by registered dietitians. The formula is: 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5 (for males) or − 161 (for females).",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is a TDEE calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Within roughly ±10% for most people. TDEE calculators estimate; they do not measure. Use the calculated number as a starting point, then adjust based on 2-3 weeks of actual weight trend data. If you are losing or gaining faster than expected, your real TDEE is different from the estimate.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between cut, recomp, and bulk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cut = sustained calorie deficit for fat loss (typically TDEE minus 300-500 kcal). Recomp = small deficit or near-maintenance with high protein, aiming to lose fat and gain muscle simultaneously; works best for newer or returning lifters. Bulk = sustained calorie surplus for muscle gain (typically TDEE plus 200-400 kcal). The right choice depends on body composition starting point and training history.",
      },
    },
    {
      "@type": "Question",
      name: "Should I eat the same calories every day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the calculated number as a weekly average. Day-to-day variation is normal and expected. If you eat 200 kcal under on Monday and 200 kcal over on Wednesday, the week averages out. Hit the weekly total; don't stress single days.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/tdee-calculator",
  title: "TDEE calculator",
});

export default function TdeePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="tdee-howto-schema" data={howToSchema} />
      <JsonLd id="tdee-faq-schema" data={faqSchema} />
      <JsonLd id="tdee-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            TDEE calculator
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Uses the Mifflin-St Jeor equation — the most validated BMR formula
            for the general population. Returns your maintenance, cut, recomp,
            and bulk calorie targets. No signup. No email gate.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <TdeeForm />
        </div>

        <KrisNote>
          Your calorie number is a starting target, not a verdict. I care more
          about what your weight trend, hunger, sleep, and training look like
          after two real weeks than what any calculator says on day one.
        </KrisNote>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How it works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            BMR is calculated via Mifflin-St Jeor: 10 × weight (kg) + 6.25 ×
            height (cm) − 5 × age + 5 (male) or − 161 (female). TDEE
            multiplies BMR by an activity factor (1.2 sedentary up to 1.9 very
            active). Cut subtracts 500 kcal, recomp subtracts 200 kcal, bulk
            adds 250 kcal.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            These are starting estimates, accurate to roughly ±10%. Run the
            number for 2-3 weeks, then adjust based on actual weight trend.
            Losing faster than expected? Add 100-200 kcal. Not moving? Subtract
            200 kcal. The calculator is a starting point, not a finish line.
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
                Split your calculated TDEE calories into daily protein, carb,
                and fat targets for cutting, recomp, or lean bulking.
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
                Estimate whether simultaneous muscle gain and fat loss fits your
                current training experience and body fat.
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
                Turn your maintenance calories into mild, standard, or
                aggressive fat-loss deficit targets.
              </span>
            </Link>
            <Link
              href="/tools/body-fat-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body fat calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Estimate your body fat percentage with the U.S. Navy tape-measure
                method to refine your target calorie intake.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Want a coach who calibrates this for you?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The hard part is not the equation. It is the weekly adjustment:
            reading your weight trend, your training data, your stress, and
            your sleep, then knowing what to change. That is what 1:1 coaching
            with Kris is for.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/tools/macro-calculator" className="btn btn-secondary">
              Macro calculator
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ToolRetentionCTA tool="tdee-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-05-21. Equation:
            Mifflin, M. D., et al. (1990). A new predictive equation for
            resting energy expenditure in healthy individuals.{" "}
            <i>American Journal of Clinical Nutrition</i>, 51(2), 241-247.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

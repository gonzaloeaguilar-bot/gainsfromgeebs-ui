import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import CalorieDeficitForm from "./CalorieDeficitForm";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator for Men — Fat-Loss Targets",
  description:
    "Free calorie deficit calculator. Get your maintenance calories, then mild, standard, and aggressive deficit targets with projected weekly fat loss. No signup.",
  alternates: { canonical: `${SITE_URL}/tools/calorie-deficit-calculator` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/calorie-deficit-calculator`,
    title: "Calorie Deficit Calculator — Fat-Loss Targets",
    description:
      "Maintenance calories plus mild, standard, and aggressive deficit targets with projected weekly loss.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Calorie deficit calculator by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Deficit Calculator — Fat-Loss Targets",
    description:
      "Maintenance calories plus mild, standard, and aggressive deficit targets.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate your calorie deficit",
  description:
    "Find maintenance calories with the Mifflin-St Jeor equation, then set a mild, standard, or aggressive deficit for fat loss.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your stats",
      text: "Enter sex, age, bodyweight in pounds, height in feet and inches, and your weekly activity level.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Read your maintenance calories",
      text: "The calculator finds your BMR via Mifflin-St Jeor and multiplies by an activity factor to get your TDEE — the calories that hold your current weight.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pick a deficit",
      text: "Choose mild (250 below maintenance, about 0.5 lb/week), standard (500 below, about 1 lb/week), or aggressive (750 below, about 1.5 lb/week). Do not eat below your BMR for sustained periods.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A calorie deficit means eating fewer calories than your body burns in a day. It is the underlying mechanism of all fat loss — when intake is below expenditure, the body makes up the difference from stored energy, including body fat. Paired with resistance training and adequate protein, that lost weight comes predominantly from fat.",
      },
    },
    {
      "@type": "Question",
      name: "How big should my calorie deficit be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most men, 250 to 500 calories below maintenance per day — a mild to standard deficit — is the sustainable range. A 750-calorie aggressive deficit can be used for short stretches, especially at higher body fat, but it is harder to sustain and risks muscle loss. Never sit below your BMR for sustained periods.",
      },
    },
    {
      "@type": "Question",
      name: "How much weight will I lose in a calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roughly one pound of fat per 3,500-calorie cumulative deficit. So a 500-calorie daily deficit projects to about 1 pound per week, 250 per day to about 0.5 pound, and 750 per day to about 1.5 pounds. These are estimates — actual loss varies, so adjust based on a 2-3 week weight trend.",
      },
    },
    {
      "@type": "Question",
      name: "Is a bigger calorie deficit faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Faster on the scale, but not better. Too aggressive a deficit strips muscle along with fat, tanks training performance, and is very hard to sustain — which usually ends in regain. A moderate deficit you can hold for months reaches a better, more lasting result than a steep one you quit. Steady is the genuinely fast route.",
      },
    },
    {
      "@type": "Question",
      name: "Why am I not losing weight in a calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually the deficit is smaller than you think — untracked calories from oils, drinks, bites, and weekend meals quietly close the gap. It can also be normal 1-2 week fluctuation from water and food volume. Track intake honestly, judge by a 2-3 week weight trend rather than day to day, and recalibrate if the trend is flat.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/calorie-deficit-calculator",
  title: "Calorie deficit calculator",
});

export default function CalorieDeficitPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="deficit-howto-schema" data={howToSchema} />
      <JsonLd id="deficit-faq-schema" data={faqSchema} />
      <JsonLd id="calorie-deficit-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Calorie deficit calculator
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Find your maintenance calories, then a mild, standard, or aggressive
            deficit target — each with the fat loss it projects per week. Built
            for clients who want a practical starting point. No signup. No
            email gate.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <CalorieDeficitForm />
        </div>

        <aside
          className="mt-6 rounded-[6px] border border-line2 bg-ink3/35 px-5 py-4"
          aria-labelledby="deficit-stall-heading"
        >
          <h2 id="deficit-stall-heading" className="text-bone font-semibold text-[16px]">
            Scale not moving after three weeks?
          </h2>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
            Before you cut further, check the usual causes: under-logged food,
            water from training, a deficit that shrank as you got lighter, and
            less daily movement.{" "}
            <Link href="/guides/why-am-i-not-losing-weight-in-a-calorie-deficit" className="underline hover:text-bone" data-cta="deficit_calc_stall_guide">
              Read why you are not losing weight in a calorie deficit
            </Link>
            .
          </p>
        </aside>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How it works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The calculator finds your BMR with the Mifflin-St Jeor equation,
            multiplies by an activity factor for your TDEE (maintenance), then
            subtracts a deficit: 250, 500, or 750 calories. Projected weekly
            loss assumes roughly 3,500 calories per pound of fat.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            These are starting estimates, accurate to about ±10%. Run a deficit
            for 2-3 weeks, then adjust to your actual weight trend — losing
            faster than projected, eat a little more; flat, trim a little. The
            calculator points the direction; your trend confirms the number.
            The method behind the number, step by step, is in{" "}
            <Link
              href="/guides/how-many-calories-should-a-man-eat-to-lose-weight"
              className="underline hover:text-bone"
            >
              how many calories a man should eat to lose weight
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Does a calorie deficit work differently after 35?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Less than you were told. Doubly labeled water data from people aged 8 days to 95 years
            found that, after adjusting for fat free mass, daily energy expenditure stayed stable
            from age 20 to 60 (Science, 2021, PMID 34385400). Your metabolism is probably not the
            reason the number on the scale stopped moving at 38.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Nor does the diet label decide it. In 609 adults aged 18 to 50 (average age 40) followed
            for 12 months, weight change was 5.3 kg lost on low fat and 6.0 kg on low carb, a 0.7 kg
            gap (JAMA, 2018, PMID 29466592). Pick the one you can keep eating.
          </p>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute max-w-[64ch]">
            What this does not prove: the energy figures are averages, so your own number can sit
            above or below them, and the calculator above is still an estimate.
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
                Turn your calorie deficit into daily protein, carbohydrate, and
                fat targets to protect muscle during fat loss.
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
                Calculate your total daily energy expenditure and explore
                maintenance, cut, recomp, and bulk targets.
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
                Determine whether building muscle in a slight deficit is viable
                for your training level and body fat.
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
                Estimate body fat percentage using the U.S. Navy tape-measure
                method to guide your deficit pace.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Want a coach to calibrate the deficit for you?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The number is the easy part. The work is the weekly adjustment —
            reading your weight trend, training, sleep, and stress, then knowing
            what to change so you lose fat without losing muscle. That is what
            1:1 coaching with Kris is for.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/tools/tdee-calculator" className="btn btn-secondary">
              TDEE calculator
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ToolRetentionCTA tool="calorie-deficit-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-11-05. BMR
            equation: Mifflin, M. D., et al. (1990).{" "}
            <i>American Journal of Clinical Nutrition</i>, 51(2), 241-247.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

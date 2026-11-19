import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import KrisNote from "@/components/KrisNote";
import CoachCompanion from "@/components/CoachCompanion";
import Link from "next/link";
import MacroForm from "./MacroForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/macro-calculator";
const DATE_MODIFIED = "2026-10-27";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=tool&utm_campaign=macro_calculator&utm_content=macro_calculator_bottom_cta";
const COMPANION_SHORT_ANSWER =
  "Use the calculator to set a starting target for protein, carbs, and fat. Follow those targets for three to four weeks, then adjust from your weight trend, training performance, hunger, and recovery instead of changing the numbers after one day.";
const COMPANION_FAQS = [
  {
    q: "Which goal should I choose?",
    a: "Choose cut for fat loss, recomp when you want to lose fat while building or preserving muscle near maintenance, and bulk when muscle gain is the priority.",
  },
  {
    q: "Do I need to hit every number exactly?",
    a: "No. Keep protein consistent and treat carbs and fats as flexible targets. Your weekly pattern matters more than one perfect day.",
  },
  {
    q: "When should I change my macros?",
    a: "Hold the same targets for three to four weeks unless your energy or recovery is clearly suffering. Then use the trend, not a single weigh-in, to make a small adjustment.",
  },
];

export const metadata: Metadata = {
  title: "Macro Calculator for Cutting, Recomp & Bulk | Geebs",
  description:
    "Free macro calculator for cutting, lean bulking, or maintenance. Turn your calories and bodyweight into daily protein, carbs, and fat targets. No signup.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Macro Calculator for Cutting, Recomp & Bulk | Geebs",
    description:
      "Calculate daily protein, carbs, and fats for cutting, lean bulking, or maintenance. Protein first, fats by phase, carbs fill the rest.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free macro calculator by The Geebs Method — no signup required",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Calculator for Cutting, Recomp & Bulk | Geebs",
    description:
      "Free macro calculator for cutting, lean bulking, or maintenance. No signup.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  name: "Macro Calculator",
  url: `${SITE_URL}${SLUG}`,
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  description:
    "Free macro calculator that turns calories, bodyweight, and goal into daily protein, carbs, and fat targets for body recomposition, cutting, or lean bulking.",
  dateModified: DATE_MODIFIED,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate macros for body recomposition",
  description:
    "Calculate daily protein, carbs, and fat targets for body recomposition, cutting, or lean bulking based on calories, bodyweight, and goal.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set your daily calories",
      text: "Enter your daily calorie target. If you don't know your TDEE, run the TDEE calculator first.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter bodyweight",
      text: "Protein is calculated per pound of bodyweight per goal: 1.0 g/lb for cut, 0.9 g/lb for recomp, 0.8 g/lb for bulk.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pick your goal",
      text: "Cut (fat loss), recomp (lean gain), or bulk (muscle gain). Each shifts protein and fat allocation.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Read your macros",
      text: "Protein and fat are set first. Carbs fill the remaining calories. Target the weekly total, not each day exactly.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this a body recomposition macro calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose recomp when you want protein high enough to support muscle retention or gain while calories stay near maintenance. The calculator sets protein first, uses a moderate fat target, and lets carbs fill the remaining calories for training performance.",
      },
    },
    {
      "@type": "Question",
      name: "How much protein per pound of bodyweight should I eat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "0.8 to 1.0 grams per pound of bodyweight per day for resistance trainees. The International Society of Sports Nutrition Position Stand (Jäger et al., 2017) supports 1.4-2.0 g/kg (roughly 0.6-0.9 g/lb) for general resistance training, with the upper end (around 1.0 g/lb) appropriate during a fat-loss phase to preserve muscle.",
      },
    },
    {
      "@type": "Question",
      name: "Should I eat more protein on a cut?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. During a calorie deficit, higher protein helps preserve lean muscle and increases satiety. This macro calculator uses 1.0 g/lb on a cut, 0.9 g/lb on recomp, and 0.8 g/lb on a bulk. The protein floor goes up as calories go down.",
      },
    },
    {
      "@type": "Question",
      name: "Why do my calories not equal protein plus carbs plus fat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Protein and carbs are 4 kcal/g, fat is 9 kcal/g. The math is: (protein g × 4) + (carb g × 4) + (fat g × 9) = total kcal. Rounding to whole grams may show a 5-15 kcal difference; that is normal and not a problem in practice.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to hit my macros exactly every day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Target the weekly average. If protein is 30 g low one day and 30 g high the next, the week averages out. Day-to-day variation is expected. The point is the weekly trend, not perfection on any single day.",
      },
    },
    {
      "@type": "Question",
      name: "How should I split protein across the day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Split into 3-5 meals of roughly equal protein. For a 200 g daily target, that's 40 g across 5 meals or 50 g across 4 meals. Evenly distributed protein maximizes muscle protein synthesis stimulation throughout the day per leucine-threshold research.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/macro-calculator",
  title: "Macro calculator for cutting, recomp, and bulk",
});

export default function MacroPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="macro-howto-schema" data={howToSchema} />
      <JsonLd id="macro-faq-schema" data={faqSchema} />
      <JsonLd id="macro-software-schema" data={softwareSchema} />
      <JsonLd id="macro-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <ScholarshipCallout sourcePath="/tools/macro-calculator" />
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Macro calculator for cutting, recomp, and bulk
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Macro calculator for body recomposition, cutting, and lean bulk.
            Use this tool to split your daily calories into protein, carbs, and
            fat based on your bodyweight and phase. Protein follows ISSN
            guidance (Jäger et al., 2017), fats shift by phase, and carbs fill
            the rest. Free, no signup, no email gate.
          </p>
        </header>

        <section
          className="mt-8 rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5 md:px-6"
          aria-labelledby="macro-answer"
        >
          <p className="eyebrow text-cloudText">What it calculates</p>
          <h2
            id="macro-answer"
            className="mt-3 display text-bone text-[22px] md:text-[27px] leading-[1.12]"
          >
            Protein first, fats by phase, carbs with the calories left
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Enter your calorie target, bodyweight, and goal. The calculator
            sets a practical protein target, assigns dietary fat based on
            whether you are cutting, recomping, or lean bulking, then converts
            the remaining calories into carbs for training performance.
          </p>
          <div className="mt-5 grid gap-3 text-[14px] leading-[1.55] text-mute sm:grid-cols-3">
            <p>
              <strong className="block text-bone">What macros are</strong>
              Protein (4 kcal/g), carbs (4 kcal/g), and fats (9 kcal/g) make up your total daily calories.
            </p>
            <p>
              <strong className="block text-bone">How split is chosen</strong>
              Protein by bodyweight and goal (0.8–1.0 g/lb), fat at 25–30%, carbs fill the remainder.
            </p>
            <p>
              <strong className="block text-bone">What to do with result</strong>
              Hit protein daily, track weekly averages, and adjust after 2–3 weeks of trend data.
            </p>
          </div>
        </section>

        <div className="mt-10 md:mt-14">
          <MacroForm />
        </div>

        <section
          className="mt-8 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] px-5 py-5 md:px-6"
          aria-labelledby="macro-next-step"
        >
          <p className="eyebrow text-cloudText">Use your result</p>
          <h2 id="macro-next-step" className="mt-3 display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Your first seven days: repeatable beats perfect
          </h2>
          <ol className="mt-4 grid gap-3 text-[15px] leading-[1.65] text-bone/85 md:grid-cols-3">
            <li><strong className="text-bone">1. Save protein.</strong> Build each day around the protein target before worrying about the rest.</li>
            <li><strong className="text-bone">2. Repeat meals.</strong> Use two or three meals you can make on a workday and average the week.</li>
            <li><strong className="text-bone">3. Review one trend.</strong> After two weeks, compare bodyweight, waist, and gym performance before changing calories.</li>
          </ol>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-mute">
            Still deciding which phase fits? Start with the {" "}
            <Link href="/tools/body-recomposition-calculator" className="underline hover:text-bone">
              body recomposition calculator
            </Link>{" "}
            for a calorie target and a practical read on recomp versus a cut or bulk.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
            Scale not moving after three weeks?{" "}
            <Link href="/guides/why-am-i-not-losing-weight-in-a-calorie-deficit" className="underline hover:text-bone" data-cta="macro_page_deficit_stall">
              Why you are not losing weight in a calorie deficit
            </Link>{" "}
            walks through the checks to run first.
          </p>
        </section>

        <KrisNote>
          I would rather see protein hit consistently and the rest averaged
          across the week than watch someone quit because they missed one
          perfect macro day.
        </KrisNote>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How the body recomposition math works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Protein is set first based on bodyweight and goal: 1.0 g/lb on a
            cut, 0.9 g/lb on recomp, 0.8 g/lb on a bulk. Fat is set as a
            percentage of total calories: 25% on a cut, 27% on recomp, 30% on
            a bulk. Carbs fill the remaining calories.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            For recomp, the calculator keeps protein high and fat moderate so
            the plan supports hard training without turning into a crash diet.
            If you are trying to lose fat and build muscle at the same time,
            start with recomp calories from the TDEE calculator, then use this
            page to split those calories into protein, carbs, and fats.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            Why protein goes up during a cut: lower calories means more
            relative emphasis on preserving muscle. Why fat percentage shifts:
            hormone production and satiety both benefit from adequate fat at
            different calorie levels. Carbs are flexible because performance
            tolerance varies — some clients do well on lower carbs, others
            need more for training intensity.
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            When to choose cut, recomp, or bulk
          </h2>
          <div className="mt-6 grid gap-5 text-[15px] md:text-[16px] leading-[1.65] text-mute">
            <p>
              Choose <span className="text-bone">cut</span> if your main goal
              is fat loss and your waist trend needs to move down.
            </p>
            <p>
              Choose <span className="text-bone">recomp</span> if you are
              newer to structured lifting, coming back after time off, or
              carrying enough body fat that you can train hard near maintenance
              while improving body composition.
            </p>
            <p>
              Choose <span className="text-bone">bulk</span> if you are already
              lean enough and need a controlled calorie surplus to add muscle.
            </p>
          </div>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Related tools and guides
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2 text-[15px]">
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Start here if you still need calories, protein, and an honest
                read on whether recomp is the right phase.
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
                Find your maintenance, cut, recomp, and bulk calorie targets
                before splitting them into macros.
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
                Estimate your body fat percentage with the U.S. Navy tape method
                to pick the right calorie and protein target.
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
                Calculate mild, standard, and aggressive deficit calories for fat
                loss before setting your macro split.
              </span>
            </Link>
            <Link
              href="/resources/how-to-calculate-macros-for-body-recomposition"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body recomposition macros guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Learn when to adjust calories, protein, carbs, or fats after
                three to four weeks of trend data.
              </span>
            </Link>
            <Link
              href="/blog/how-much-protein-to-lose-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                How much protein to lose fat
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Use this if protein is the macro you keep missing or guessing.
              </span>
            </Link>
            <Link
              href="/results"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Client results and transformations
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                See what happens when nutrition targets are adjusted alongside
                training, steps, sleep, and weekly accountability.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            The calculator is a starting point
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Macros are the easy part. The hard part is reading your week —
            sleep, training quality, weight trend, hunger, stress — and
            knowing when to shift protein up, fat down, or carbs around
            training. That is what 1:1 coaching with Kris adds. The calculator
            gets you 80%; coaching gets you the last 20%, which is where most
            people stall.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See the full methodology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ScholarshipSection sourcePath="/tools/macro-calculator" />
        <ToolRetentionCTA tool="macro-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}. Protein
            recommendations per Jäger, R., et al. (2017). International Society
            of Sports Nutrition Position Stand: protein and exercise.{" "}
            <i>JISSN</i>, 14(1), 20.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit scholarship={false} />
      <CoachCompanion
        slug="macro-calculator"
        title="Macro Calculator"
        shortAnswer={COMPANION_SHORT_ANSWER}
        takeoverAnswer="Use these targets for 3–4 weeks, then adjust from your results."
        faqs={COMPANION_FAQS}
        topic="your macro targets"
        pageType="tool"
      />
    </main>
  );
}

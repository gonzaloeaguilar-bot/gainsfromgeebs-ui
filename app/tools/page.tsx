import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools";
const DATE_MODIFIED = "2026-08-18";

export const metadata: Metadata = {
  title: "Free Fitness Calculators & Tools — No Signup | Geebs Coaching",
  description:
    "Free fitness calculators and training tools: TDEE, macros, body recomposition, body fat percentage, calorie deficit, 1RM, daily habits, and meal planning. No signup required.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Free Fitness Calculators & Tools — No Signup | Geebs Coaching",
    description:
      "Free fitness calculators and training tools: TDEE, macros, body recomposition, body fat percentage, calorie deficit, 1RM, daily habits, and meal planning.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free fitness calculators and tools by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Fitness Calculators & Tools — No Signup | Geebs Coaching",
    description:
      "Free fitness calculators and training tools for TDEE, macros, body recomposition, body fat, calorie deficits, and training loads.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

interface ToolItem {
  href: string;
  name: string;
  category: string;
  description: string;
}

const tools: ToolItem[] = [
  {
    href: "/tools/tdee-calculator",
    name: "TDEE calculator",
    category: "Energy & Calories",
    description:
      "Calculates your Total Daily Energy Expenditure using the Mifflin-St Jeor equation to establish your maintenance, cut, recomp, and bulk calorie targets.",
  },
  {
    href: "/tools/macro-calculator",
    name: "Macro calculator",
    category: "Nutrition",
    description:
      "Splits your daily calories into protein, fat, and carbohydrate gram targets for cutting, body recomposition, or lean bulking.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    name: "Body recomposition calculator",
    category: "Body Composition",
    description:
      "Estimates whether simultaneous fat loss and muscle gain fits your starting point, with calorie targets and protein goals.",
  },
  {
    href: "/tools/calorie-deficit-calculator",
    name: "Calorie deficit calculator",
    category: "Fat Loss",
    description:
      "Finds your maintenance baseline and projects weekly fat loss across mild, standard, and aggressive deficit targets.",
  },
  {
    href: "/tools/body-fat-calculator",
    name: "Body fat calculator",
    category: "Measurements",
    description:
      "Estimates your body fat percentage and lean mass split using the U.S. Navy circumference method with a standard tape measure.",
  },
  {
    href: "/tools/1rm-calculator",
    name: "1RM calculator",
    category: "Strength & Loading",
    description:
      "Estimates your one-rep max from any completed set and builds a percentage-based training load table for your working sets.",
  },
  {
    href: "/tools/body-3d",
    name: "Interactive 3D body",
    category: "Training",
    description:
      "Rotate a real 3D body, zoom into any muscle group, and get Kris's coaching tip plus the study behind it. The most hands-on way to learn what you train.",
  },
  {
    href: "/tools/muscle-map",
    name: "Muscle map",
    category: "Training",
    description:
      "Tap any muscle on a 3D body to see the exercises Kris programs for it, with sets and reps, and the guides to read next.",
  },
  {
    href: "/tools/perfect-day-builder",
    name: "Perfect day of eating builder",
    category: "Meal Planning",
    description:
      "Builds a full day of eating in gram-level food portions matched to your bodyweight, meal frequency, and dietary preferences.",
  },
  {
    href: "/tools/daily-habit-tracker",
    name: "Daily habit & routine tracker",
    category: "Consistency",
    description:
      "Tracks daily nutrition, movement, hydration, and recovery habits directly in your browser with private local progress and streak tracking.",
  },
  {
    href: "/tools/daily-protein-tracker",
    name: "Daily protein & meal tracker",
    category: "Nutrition & Habits",
    description:
      "Tracks daily protein targets and calculates optimal gram distribution across 3 to 5 meals with private local streak tracking.",
  },
  {
    href: "/tools/daily-hydration-tracker",
    name: "Daily hydration & fluid tracker",
    category: "Hydration & Habits",
    description:
      "Calculates daily fluid targets based on bodyweight and training, and logs intake across 4 daily windows with local streak tracking.",
  },
  {
    href: "/tools/daily-readiness-tracker",
    name: "Daily workout readiness tracker",
    category: "Recovery & Habits",
    description:
      "Calculates daily workout readiness, autoregulates training volume and RPE, and tracks recovery consistency with local streak tracking.",
  },
  {
    href: "/tools/daily-step-tracker",
    name: "Daily step & NEAT energy tracker",
    category: "Movement & Habits",
    description:
      "Calculates daily step floors, estimates non-exercise calorie expenditure, and tracks walking volume with private local streak tracking.",
  },
  {
    href: "/tools/online-trainer-education-cost",
    name: "Online trainer education cost calculator",
    category: "Industry & Education",
    description:
      "Totals first-year certification packages, study materials, exam fees, and ongoing renewals across NASM, ACE, ISSA, and NSCA.",
  },
];

export default function ToolsHubPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="tools-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-mute2">
          <Link href="/" className="hover:text-bone">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-bone/80">Tools</span>
        </nav>

        <header className="max-w-[760px]">
          <p className="eyebrow text-cloudText">Free fitness tools</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[54px] leading-[1.05]">
            Free fitness calculators and tools
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17.5px] leading-[1.65] text-mute max-w-[62ch]">
            Practical calculators for calories, macros, body recomposition, strength loads, and daily habits. Free to use with zero signups, email gates, or app downloads.
          </p>
        </header>

        <div className="mt-10 md:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="group relative flex flex-col rounded-xl border border-line2 bg-ink3/35 p-6 transition-colors hover:border-cloudText/50 hover:bg-ink3/60"
            >
              <span className="eyebrow text-cloudText">{tool.category}</span>
              <h2 className="display mt-3 text-[22px] md:text-[24px] leading-[1.15] text-bone">
                <Link
                  href={tool.href}
                  className="group-hover:text-cloudText transition-colors no-underline"
                >
                  {tool.name}
                </Link>
              </h2>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-mute flex-1">
                {tool.description}
              </p>
              <div className="mt-5 pt-3 border-t border-line2/50">
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-bone/80 hover:text-bone transition-colors"
                >
                  <span>{tool.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="hair my-12 md:my-16" />

        <section className="max-w-[760px]">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.15]">
            Calculators give you starting numbers — execution does the rest
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85">
            A calculator gets you a realistic starting point in under two minutes. The real work is what happens in weeks three through twelve: reading your weight trend, managing hunger, protecting sleep, and adjusting training when life gets busy.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/geebs-method" className="btn btn-secondary">
              The Geebs Method
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Created by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}. Calculators provide starting estimates for healthy adults. Not medical advice.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Link from "next/link";
import DailyHabitTrackerForm from "./DailyHabitTrackerForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/daily-habit-tracker";
const DATE_MODIFIED = "2026-08-12";

export const metadata: Metadata = {
  title: "Daily Habit & Routine Tracker — Interactive Progress | Geebs",
  description:
    "Interactive daily habit checklist and streak tracker for body recomposition habits. Track protein, training, hydration, and sleep locally with zero friction.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Daily Habit & Routine Tracker — Interactive Progress | Geebs",
    description:
      "Daily habit checklist and streak tracker for nutrition, movement, hydration, and recovery. Free, interactive, no login required.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free daily habit and routine tracker by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Habit & Routine Tracker — Free & Interactive",
    description:
      "Track core daily habits, build streaks, and stay consistent. Free, local storage.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  name: "Daily Habit & Routine Tracker",
  url: `${SITE_URL}${SLUG}`,
  isAccessibleForFree: true,
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  description:
    "Interactive habit surface to track daily nutrition, movement, hydration, and recovery goals. Includes streak tracking and local progress storage.",
  dateModified: DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is my progress saved in the daily habit tracker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your daily habit check-ins and streaks are saved directly in your web browser's local storage. No account, registration, or server sync is required.",
      },
    },
    {
      "@type": "Question",
      name: "How is the daily streak calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your current streak represents consecutive calendar days with at least one completed habit. If you miss a day, the active streak resets while your total active check-in count remains preserved.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add my own custom daily habits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the inline 'Add your own daily habit' form to create custom daily goals. Custom habits persist across visits on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Why focus on daily habits over weekly targets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Long-term body recomposition is built on repeatable daily behaviors. Daily tracking builds consistency across key inputs like protein intake, movement, hydration, and sleep.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/daily-habit-tracker",
  title: "Daily habit & routine tracker",
});

export default function DailyHabitTrackerPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="daily-habit-software-schema" data={softwareSchema} />
      <JsonLd id="daily-habit-faq-schema" data={faqSchema} />
      <JsonLd id="daily-habit-tracker-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free habit surface</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Daily habit &amp; routine tracker
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Track core daily behaviors for nutrition, movement, hydration, and recovery.
            Build consistency with real-time streak tracking and local progress storage.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bone/60 max-w-[60ch]">
            Free, no account needed. All check-in data stays locally on your device.
          </p>
        </header>

        <div className="hair my-10" />

        <DailyHabitTrackerForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Why daily habit tracking works
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Body recomposition outcomes depend on consistent execution of foundational behaviors.
            Tracking core daily habits — such as hitting your protein target, completing planned movement,
            reaching hydration goals, and protecting recovery windows — provides immediate visual feedback.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
            Pair this habit surface with our free{" "}
            <Link href="/tools/macro-calculator" className="underline hover:text-bone">
              macro calculator
            </Link>{" "}
            and{" "}
            <Link href="/tools/perfect-day-builder" className="underline hover:text-bone">
              perfect day meal builder
            </Link>{" "}
            to establish precise intake targets for your goals.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5]">
                  {entry.name}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="mt-14 text-[13px] text-bone/50 leading-[1.6]">
          <p>
            General fitness habit tracking tool only. Not medical advice, and not intended to diagnose or treat any health condition. Last updated {DATE_MODIFIED}.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

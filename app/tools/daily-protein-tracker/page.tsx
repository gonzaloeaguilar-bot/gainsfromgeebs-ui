import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Link from "next/link";
import DailyProteinTrackerForm from "./DailyProteinTrackerForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/daily-protein-tracker";
const DATE_MODIFIED = "2026-08-19";

export const metadata: Metadata = {
  title: "Daily Protein & Meal Distribution Tracker — Free Tool | Geebs",
  description:
    "Interactive daily protein tracker and meal distribution calculator for muscle building and fat loss. Track per-meal intake and maintain your streak locally.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Daily Protein & Meal Distribution Tracker — Free Tool | Geebs",
    description:
      "Track daily protein targets and per-meal distribution with local streak history. Free, interactive, no login required.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free daily protein intake and meal distribution tracker by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Protein Tracker — Free & Interactive",
    description:
      "Track daily protein intake, distribute grams across meals, and build your consistency streak.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  "name": "Daily Protein & Meal Distribution Tracker",
  "url": `${SITE_URL}${SLUG}`,
  "isAccessibleForFree": true,
  "publisher": { "@type": "Organization", "name": "Geebs Coaching", "url": SITE_URL },
  "description":
    "Interactive habit surface to track daily protein gram targets, distribute intake across 3-5 meals, and log progress with local streak tracking.",
  "dateModified": DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is the daily protein target calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Targets are based on established sports nutrition ranges (Morton et al., 2018): 0.82g/lb (1.8g/kg) for standard body recomposition, 0.90g/lb (2.0g/kg) for hypertrophy, and 1.00g/lb (2.2g/kg) for preserving lean mass during an energy deficit.",
      },
    },
    {
      "@type": "Question",
      "name": "Why distribute protein across multiple meals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reaching the leucine threshold (approximately 2.5g to 3.0g of leucine or 25g to 40g of complete protein per meal) triggers muscle protein synthesis (MPS). Distributing total daily protein across 3 to 5 meals sustains amino acid availability throughout the day.",
      },
    },
    {
      "@type": "Question",
      "name": "How does the daily protein streak work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A day counts toward your active streak when your total logged protein reaches at least 90% of your daily goal. All streak calculations and daily history are stored securely in your web browser local storage.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need to create an account to save my protein log?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All inputs, daily meal entries, and streak records persist automatically in your browser local storage with zero account creation or cloud sync required.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/daily-protein-tracker",
  title: "Daily protein & meal tracker",
});

export default function DailyProteinTrackerPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="daily-protein-software-schema" data={softwareSchema} />
      <JsonLd id="daily-protein-faq-schema" data={faqSchema} />
      <JsonLd id="daily-protein-tracker-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free protein tracker</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Daily protein &amp; meal tracker
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Track your daily protein target and distribute grams across your meal windows.
            Build consistency with real-time streak tracking and local progress storage.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bone/60 max-w-[60ch]">
            Free, interactive, and private. All data is saved directly on your device.
          </p>
        </header>

        <div className="hair my-10" />

        <DailyProteinTrackerForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The science of daily protein distribution
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Hitting total daily protein is the primary driver of nitrogen balance, recovery, and skeletal muscle retention.
            However, meal distribution also plays a supportive role. Consuming sufficient protein (25g to 40g) at each meal
            ensures sufficient essential amino acids to stimulate muscle protein synthesis across 24-hour cycles.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
            Pair this daily tracker with our free{" "}
            <Link href="/tools/macro-calculator" className="underline hover:text-bone">
              macro calculator
            </Link>{" "}
            and{" "}
            <Link href="/tools/perfect-day-builder" className="underline hover:text-bone">
              perfect day meal builder
            </Link>{" "}
            to establish matching carbohydrate and fat targets for your training goals.
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
            General nutritional utility and habit tracking tool only. Not medical advice, and not intended to diagnose or treat any medical condition. Last updated {DATE_MODIFIED}.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

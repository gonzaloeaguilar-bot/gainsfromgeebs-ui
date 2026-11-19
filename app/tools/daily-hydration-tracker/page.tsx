import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Link from "next/link";
import DailyHydrationTrackerForm from "./DailyHydrationTrackerForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/daily-hydration-tracker";
const DATE_MODIFIED = "2026-08-22";

export const metadata: Metadata = {
  title: "Daily Hydration & Electrolyte Tracker — Free Tool | Geebs",
  description:
    "Interactive daily water and fluid intake tracker with electrolyte guidance. Calculate hydration targets based on body weight, training intensity, and creatine with local streak tracking.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Daily Hydration & Electrolyte Tracker — Free Tool | Geebs",
    description:
      "Track daily fluid targets and timing windows with local streak history. Free, interactive, no login required.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free daily hydration and electrolyte intake tracker by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Hydration Tracker — Free & Interactive",
    description:
      "Track daily water intake, distribute fluids across workout windows, and build your consistency streak.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  "name": "Daily Hydration & Electrolyte Tracker",
  "url": `${SITE_URL}${SLUG}`,
  "isAccessibleForFree": true,
  "publisher": { "@type": "Organization", "name": "Geebs Coaching", "url": SITE_URL },
  "description":
    "Interactive habit surface to calculate daily water and fluid targets, distribute intake across key daily timing windows, and log progress with local streak tracking.",
  "dateModified": DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is the daily hydration target calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Baseline fluid needs are calculated at approximately 0.55 ounces per pound of body weight (around 35 ml per kg). Additional fluid increments are added for resistance training volume (16 to 32 oz / 500 to 1000 ml), warm climate sweat loss (+12 oz / 350 ml), and creatine monohydrate supplementation (+16 oz / 500 ml).",
      },
    },
    {
      "@type": "Question",
      "name": "Why distribute fluid intake across distinct time windows?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pacing fluid intake across morning, peri-workout, afternoon, and evening windows prevents sudden fluid overload, maintains plasma volume during lifting, and allows a gentle evening taper to prevent sleep disruptions.",
      },
    },
    {
      "@type": "Question",
      "name": "How does the daily hydration streak work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A day counts toward your active streak when your total logged fluid intake reaches at least 90% of your daily calculated goal. All streak calculations and daily history are stored securely in your web browser local storage.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need an account to save my water intake log?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All inputs, quick additions, and streak records persist automatically in your browser local storage with zero account creation or cloud sync required.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/daily-hydration-tracker",
  title: "Daily hydration & fluid tracker",
});

export default function DailyHydrationTrackerPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="daily-hydration-software-schema" data={softwareSchema} />
      <JsonLd id="daily-hydration-faq-schema" data={faqSchema} />
      <JsonLd id="daily-hydration-tracker-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free hydration tool</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Daily hydration &amp; fluid tracker
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Calculate your daily fluid requirement and log intake across waking, training, and recovery windows.
            Build consistency with real-time streak tracking and private local storage.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bone/60 max-w-[60ch]">
            Free, interactive, and private. All data is saved directly on your device.
          </p>
        </header>

        <div className="hair my-10" />

        <DailyHydrationTrackerForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The science of daily fluid &amp; electrolyte pacing
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Hydration status directly influences cellular hydration, blood plasma volume, and neuromuscular excitation.
            Even mild dehydration (1–2% loss of body mass from fluids) can elevate heart rate at a given workload, reduce
            maximal strength expression, and accelerate perceived exertion during resistance training.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
            Pair this daily tracker with our free{" "}
            <Link href="/tools/daily-protein-tracker" className="underline hover:text-bone">
              daily protein tracker
            </Link>{" "}
            and{" "}
            <Link href="/tools/macro-calculator" className="underline hover:text-bone">
              macro calculator
            </Link>{" "}
            to align your nutrition, hydration, and recovery protocols.
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

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Link from "next/link";
import DailyReadinessTrackerForm from "./DailyReadinessTrackerForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/daily-readiness-tracker";
const DATE_MODIFIED = "2026-08-23";

export const metadata: Metadata = {
  title: "Daily Workout Readiness & Recovery Score Tracker — Free Tool | Geebs",
  description:
    "Interactive daily readiness assessment to calculate neuromuscular recovery, sleep quality, muscle soreness, and training volume adjustments with local streak tracking.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Daily Workout Readiness & Recovery Score Tracker — Free Tool | Geebs",
    description:
      "Calculate your daily workout readiness score and autoregulate training volume and intensity with local streak tracking.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free daily workout readiness and recovery score tracker by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Workout Readiness Tracker — Free & Interactive",
    description:
      "Assess sleep, muscle soreness, systemic fatigue, and fueling to get real-time training intensity recommendations.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  "name": "Daily Workout Readiness & Recovery Tracker",
  "url": `${SITE_URL}${SLUG}`,
  "isAccessibleForFree": true,
  "publisher": { "@type": "Organization", "name": "Geebs Coaching", "url": SITE_URL },
  "description":
    "Interactive habit surface to calculate daily workout readiness, autoregulate resistance training volume and RPE, and log consistency with local streak tracking.",
  "dateModified": DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is the daily workout readiness score calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The readiness score evaluates five physiological and recovery domains: sleep duration and quality (up to 30 points), muscle soreness and joint integrity (up to 25 points), central nervous system energy level (up to 25 points), and fueling, hydration, and non-training stress (up to 20 points), totaling a score from 0 to 100.",
      },
    },
    {
      "@type": "Question",
      "name": "What is autoregulation in resistance training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Autoregulation is the practice of adjusting training loads, volume, or intensity in real time based on day-to-day recovery state. Rather than rigidly following fixed weights when severely fatigued, autoregulating via RPE or readiness scores prevents overtraining and reduces injury risk while maximizing long-term adaptation.",
      },
    },
    {
      "@type": "Question",
      "name": "Should I still train if my readiness score is in the reduced or recovery tier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A score in the reduced tier (50–69) indicates elevated fatigue: training is still productive if you moderate volume by 20–30% and maintain 2–3 reps in reserve. A score in the recovery tier (<50) suggests prioritizing active recovery, light mobility work, low-intensity zone 2 walking, or a full rest day to allow systemic recovery.",
      },
    },
    {
      "@type": "Question",
      "name": "Are my daily readiness logs stored privately?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All daily check-ins, score histories, and active streak metrics are stored entirely in your web browser local storage with zero server transmission or account creation required.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/daily-readiness-tracker",
  title: "Daily workout readiness & recovery tracker",
});

export default function DailyReadinessTrackerPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="daily-readiness-software-schema" data={softwareSchema} />
      <JsonLd id="daily-readiness-faq-schema" data={faqSchema} />
      <JsonLd id="daily-readiness-tracker-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free training &amp; recovery tool</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Daily workout readiness &amp; recovery tracker
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Assess sleep quality, systemic fatigue, muscle soreness, and fueling to calculate your daily readiness score and autoregulate your training intensity.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bone/60 max-w-[60ch]">
            Free, interactive, and private. Data is preserved directly on your device with local streak tracking.
          </p>
        </header>

        <div className="hair my-10" />

        <DailyReadinessTrackerForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The science of daily readiness &amp; autoregulation
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Neuromuscular adaptation and muscle protein synthesis depend on balancing training stimulus with systemic recovery capacity. Central nervous system fatigue, cumulative sleep loss, and elevated life stress all reduce motor unit recruitment and impair force production.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
            Pair this readiness check-in with our{" "}
            <Link href="/tools/daily-hydration-tracker" className="underline hover:text-bone">
              daily hydration tracker
            </Link>
            ,{" "}
            <Link href="/tools/daily-protein-tracker" className="underline hover:text-bone">
              daily protein tracker
            </Link>
            , and{" "}
            <Link href="/tools/1rm-calculator" className="underline hover:text-bone">
              1RM calculator
            </Link>{" "}
            to manage training volume, nutrition pacing, and progressive overload.
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
            General fitness and habit tracking utility. Not medical advice, and not intended to diagnose, treat, or prevent any injury or medical condition. Last updated {DATE_MODIFIED}.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

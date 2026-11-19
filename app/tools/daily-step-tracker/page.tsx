import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import DailyStepTrackerForm from "./DailyStepTrackerForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/daily-step-tracker";
const DATE_MODIFIED = "2026-09-23";

export const metadata: Metadata = {
  title: "Daily Step & NEAT Calorie Tracker — Free Movement Tool | Geebs",
  description:
    "Interactive daily step counter and NEAT energy expenditure calculator. Calculate daily step targets by goal, log daily walking volume, and build consistency with local streak tracking.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Daily Step & NEAT Calorie Tracker — Free Movement Tool | Geebs",
    description:
      "Calculate your daily step floor and NEAT energy expenditure with private browser streak tracking.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free daily step and NEAT calorie tracker by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Step & NEAT Calorie Tracker — Free & Interactive",
    description:
      "Track daily steps, calculate NEAT calorie expenditure, and maintain daily walking streaks.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  "name": "Daily Step & NEAT Calorie Tracker",
  "url": `${SITE_URL}${SLUG}`,
  "isAccessibleForFree": true,
  "publisher": { "@type": "Organization", "name": "Geebs Coaching", "url": SITE_URL },
  "description":
    "Interactive habit surface to calculate daily step floors, estimate NEAT energy expenditure, pace daily walking, and track consistency with local streak tracking.",
  "dateModified": DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is NEAT energy expenditure estimated from steps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non-Exercise Activity Thermogenesis (NEAT) from walking is estimated using standard metabolic equations based on body mass. On average, a 150-lb individual burns approximately 0.04 to 0.05 kcal per step (around 40–50 kcal per 1,000 steps). Heavier individuals expend proportionally more kinetic energy to displace body mass across distance.",
      },
    },
    {
      "@type": "Question",
      "name": "Why is daily step consistency more effective than weekend cardio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily step volume elevates energy expenditure steadily throughout the week without producing central nervous system fatigue or muscle damage that would interfere with resistance training recovery. Furthermore, daily postprandial walking improves continuous insulin sensitivity and glucose clearance compared to sporadic high-intensity workouts.",
      },
    },
    {
      "@type": "Question",
      "name": "What is a realistic step target for sedentary desk workers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sedentary desk jobs typically yield 2,500 to 4,000 baseline steps per day without intentional movement. Establishing an initial floor of 7,000 to 8,500 steps by adding two 15-minute walking blocks creates a sustainable 200–300 kcal daily expenditure increase without requiring dedicated gym time.",
      },
    },
    {
      "@type": "Question",
      "name": "Are my daily step logs stored privately on my device?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All step entries, goal settings, and streak metrics are preserved directly in your browser local storage with zero server transmission or login required.",
      },
    },
  ],
};

const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Daily step & NEAT energy tracker",
});

export default function DailyStepTrackerPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="daily-step-software-schema" data={softwareSchema} />
      <JsonLd id="daily-step-faq-schema" data={faqSchema} />
      <JsonLd id="daily-step-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free movement &amp; habit tool</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Daily step &amp; NEAT energy tracker
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Calculate your personalized step target, estimate non-exercise calorie expenditure, and track daily walking consistency with private streak tracking.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-bone/60 max-w-[60ch]">
            Free, interactive, and private. Data is preserved directly on your device with local streak tracking.
          </p>
        </header>

        <div className="hair my-10" />

        <DailyStepTrackerForm />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The role of NEAT in body recomposition &amp; fat loss
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Non-Exercise Activity Thermogenesis (NEAT) represents the energy expended for everything we do that is not sleeping, eating, or dedicated exercise. During a calorie deficit, the nervous system often downregulates spontaneous fidgeting, posture maintenance, and incidental movement as a protective adaptation against weight loss.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/70 max-w-[64ch]">
            Maintaining a conscious step floor prevents metabolic adaptation from eroding your planned caloric deficit. Pair this daily step tracker with our{" "}
            <Link href="/tools/calorie-deficit-calculator" className="underline hover:text-bone">
              calorie deficit calculator
            </Link>
            ,{" "}
            <Link href="/tools/daily-protein-tracker" className="underline hover:text-bone">
              daily protein tracker
            </Link>
            , and{" "}
            <Link href="/tools/daily-readiness-tracker" className="underline hover:text-bone">
              daily workout readiness tracker
            </Link>{" "}
            to keep your energy balance and recovery synchronized.
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
            General fitness and movement habit tracking utility. Not medical advice. Consult a physician before undertaking significant increases in physical activity. Last updated {DATE_MODIFIED}.
          </p>
        </footer>
      </article>
    </main>
  );
}

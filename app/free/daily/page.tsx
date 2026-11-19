import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import { backfilledScienceStudies } from "@/data/scienceLibrary";
import DailyHabitCheckIn from "./DailyHabitCheckIn";
import { pickDailyStudy, utcDayLabel } from "./logic";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/free/daily";
const LAUNCHED = "2026-07-27";

// Roll the selection over shortly after UTC midnight without going fully
// dynamic — the page stays cacheable but refreshes to the new day's study.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Today's Finding | One Study a Day | Geebs Coaching",
  description:
    "A new peer-reviewed training or nutrition finding every day, with the practical takeaway and an honest note on what the study does not prove. Free, no login.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Today's Finding | One Study a Day | Geebs Coaching",
    description:
      "One vetted study a day: what it found, what to do with it, and what it does not prove. Come back tomorrow for a new one.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Finding | One Study a Day | Geebs Coaching",
    description:
      "A fresh peer-reviewed finding every day, with the practical takeaway and honest limits.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DailyFindingPage() {
  const today = new Date();
  const study = pickDailyStudy(backfilledScienceStudies, today);
  const dayLabel = utcDayLabel(today);
  const studyPath = `/science/studies/${study.id}`;
  const readableDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Today's Finding",
    url: `${SITE_URL}${SLUG}`,
    datePublished: LAUNCHED,
    dateModified: dayLabel,
    description:
      "A new peer-reviewed training or nutrition finding every day, with the practical takeaway and an honest note on what the study does not prove.",
    isPartOf: {
      "@type": "WebSite",
      name: "Geebs Coaching",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ScholarlyArticle",
      headline: study.title,
      name: study.shortTitle,
      url: `${SITE_URL}${studyPath}`,
      ...(study.doiUrl ? { sameAs: study.doiUrl } : {}),
    },
  };

  return (
    <main className="bg-grain min-h-screen">
      <JsonLd id="daily-finding-schema" data={jsonLd} />

      <div className="mx-auto max-w-[820px] px-5 py-14 md:py-20">
        <header>
          <p className="eyebrow text-cloudText">Today&apos;s Finding · {readableDate}</p>
          <h1 className="display mt-3 text-[30px] leading-[1.1] text-bone md:text-[42px]">
            One study a day.
          </h1>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.7] text-bone/85">
            A new peer-reviewed finding every day &mdash; what it found, what to do
            with it, and what it does <em>not</em> prove. Check back tomorrow for the
            next one.
          </p>
        </header>

        <article className="mt-10 rounded-lg border border-cloudText/25 bg-cloudText/[0.05] p-6 md:p-8">
          <p className="eyebrow text-cloudText">{study.topic}</p>
          <h2 className="mt-3 text-[24px] font-semibold leading-[1.2] text-bone md:text-[30px]">
            {study.shortTitle}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-bone/80">
            {study.title}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 text-[15px] text-bone/85 sm:grid-cols-2">
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Evidence
              </dt>
              <dd className="mt-1">{study.evidenceType}</dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Source
              </dt>
              <dd className="mt-1">
                {study.journal}. {study.year}. {study.authors}.
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-4 text-[14px]">
            <a
              className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
              href={study.sourceUrl}
            >
              PubMed
            </a>
            {study.doiUrl ? (
              <a
                className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                href={study.doiUrl}
              >
                DOI
              </a>
            ) : null}
          </div>
        </article>

        <section aria-labelledby="takeaway-heading" className="mt-10">
          <p className="eyebrow text-cloudText">Kris&apos;s practical takeaway</p>
          <h2
            id="takeaway-heading"
            className="mt-3 text-[22px] font-semibold leading-[1.2] text-bone md:text-[26px]"
          >
            Here&apos;s what to do with it.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[16px] leading-[1.7] text-bone/88">
            {study.coachTakeaway}
          </p>
        </section>

        <section
          aria-labelledby="limits-heading"
          className="mt-8 rounded-lg border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
        >
          <p className="eyebrow text-cloudText">Honest limits</p>
          <h2
            id="limits-heading"
            className="mt-3 text-[20px] font-semibold leading-[1.2] text-bone md:text-[22px]"
          >
            What this study does not prove.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-bone/85">
            {study.claimGuardrail}
          </p>
        </section>

        <div className="mt-8">
          <Link
            href={studyPath}
            className="text-[15px] text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
          >
            Read the full breakdown &rarr;
          </Link>
        </div>

        <DailyHabitCheckIn />

        <section className="mt-14 border-t border-cloudText/20 pt-10">
          <NewsletterSignup
            source="free-tool:daily-finding"
            heading="Never miss a finding"
            subheading="Get the best study of the week in your inbox, with Kris's practical takeaway and a clear note on what it does and does not prove. No spam, unsubscribe anytime."
            ctaLabel="Get the drop"
            showName
          />
        </section>

        <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75">
          <Link className="hover:text-cloudText" href="/science">
            Browse the full science library
          </Link>
          <Link className="hover:text-cloudText" href="/free/goal-tracker">
            Free goal-weight forecast
          </Link>
          <Link className="hover:text-cloudText" href="/tools/daily-habit-tracker">
            Daily habit tracker
          </Link>
          <Link className="hover:text-cloudText" href="/tools/macro-calculator">
            Macro calculator
          </Link>
        </nav>
      </div>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

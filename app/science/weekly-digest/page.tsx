import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import { resolveScienceDigestEntries } from "@/data/scienceDigests";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/weekly-digest";
const TITLE = "Weekly Science Drop Archive | Geebs Science";
const DESCRIPTION =
  "Reviewed Geebs Science Drop archive: peer-reviewed study groups turned into practical coaching moves, honest limits, and exact fitness science answers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching Weekly Science Drop archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const entries = resolveScienceDigestEntries();

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${SLUG}#collection`,
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  isPartOf: { "@id": `${SITE_URL}/science#collection` },
  about: [
    { "@type": "Thing", name: "peer-reviewed fitness science" },
    { "@type": "Thing", name: "weekly science newsletter" },
    { "@type": "Thing", name: "sleep and cravings research" },
    { "@type": "Thing", name: "protein and body recomposition research" },
    { "@type": "Thing", name: "cardio and longevity research" },
  ],
  hasPart: entries.map((entry) => ({
    "@type": "CreativeWork",
    name: entry.title,
    description: entry.summary,
    url: `${SITE_URL}${SLUG}/${entry.id}`,
    about: entry.keywords,
  })),
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}${SLUG}#drop-index`,
  name: "Geebs Weekly Science Drop archive",
  itemListElement: entries.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.title,
    item: {
      "@type": "CreativeWork",
      name: entry.title,
      description: entry.summary,
      url: `${SITE_URL}${SLUG}/${entry.id}`,
      about: entry.keywords,
    },
  })),
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
      name: "Science Library",
      item: `${SITE_URL}/science`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Weekly Science Drop Archive",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Weekly Science Drop archive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is the weekly review of new research. Each drop turns peer-reviewed studies into a practical coaching move, an exact answer page, and honest limits.",
      },
    },
    {
      "@type": "Question",
      name: "Is this medical advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The archive is fitness and coaching education. It does not diagnose, treat, or promise individual outcomes.",
      },
    },
  ],
};

export default function WeeklyScienceDigestPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="weekly-science-digest-collection-schema" data={collectionSchema} />
      <JsonLd id="weekly-science-digest-item-list-schema" data={itemListSchema} />
      <JsonLd id="weekly-science-digest-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="weekly-science-digest-faq-schema" data={faqSchema} />

      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24">
        <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-bone" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-bone" href="/science">
                Science
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cloudText">Weekly digest</li>
          </ol>
        </nav>

        <header className="max-w-[840px]">
          <p className="eyebrow text-cloudText">Past Science Drops</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            Practical science you can use this week.
          </h1>
          <p className="mt-6 max-w-[72ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Pick a topic that sounds like your week. Each Science Drop gives you
            Kris&apos;s plain-English takeaway, one step to try, honest limits, and
            links to the original studies.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source="weekly_digest_header"
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/fresh-research" className="btn btn-secondary">
              See fresh research
            </Link>
            <Link href="/science/weekly-digest/2026-07-06" className="btn btn-secondary">
              Latest issue
            </Link>
            <Link href="/science/questions" className="btn btn-secondary">
              Browse answers
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="digest-system-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Find your next step</p>
          <h2
            id="digest-system-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Start with the problem you are trying to solve.
          </h2>
          <p className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Sleep, protein, cardio, cravings, creatine, or fat loss—open the topic
            that fits, try the practical step, and use the honest limits to keep
            one study in perspective.
          </p>
        </section>

        <section aria-labelledby="digest-index-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">Past Science Drops</p>
              <h2
                id="digest-index-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                {entries.length} practical science breakdowns.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
              Each one links to common questions and the original PubMed studies.
            </p>
          </div>

          <div className="mt-6 grid gap-5">
            {entries.map((entry) => (
              <article
                key={entry.id}
                id={entry.id}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  {entry.eyebrow}
                </p>
                <h3 className="mt-3 text-[24px] font-semibold leading-[1.12] tracking-normal text-bone md:text-[30px]">
                  <Link className="hover:underline" href={`/science/weekly-digest/${entry.id}`}>
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.65] text-bone/85">
                  {entry.summary}
                </p>
                <dl className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                      Try this
                    </dt>
                    <dd className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                      {entry.coachingMove}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                      Honest limits
                    </dt>
                    <dd className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                      {entry.claimGuardrail}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                      Questions this research helps answer
                    </p>
                    <div className="mt-3 grid gap-2">
                      {entry.questions.map((question) => (
                        <Link
                          key={question.slug}
                          href={`/science/questions/${question.slug}`}
                          className="rounded-md border border-line2 px-3 py-2.5 text-[14px] leading-[1.45] text-bone hover:border-bone/35"
                        >
                          {question.h1}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                      Original studies
                    </p>
                    <div className="mt-3 grid gap-2">
                      {entry.studies.slice(0, 4).map((study) => (
                        <a
                          key={study.id}
                          href={study.sourceUrl}
                          className="rounded-md border border-line2 px-3 py-2.5 text-[14px] leading-[1.45] text-bone hover:border-bone/35"
                        >
                          {study.shortTitle}{" "}
                          <span className="text-mute">
                            {study.pubmedId ? `PMID ${study.pubmedId}` : study.year}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/science/weekly-digest/${entry.id}`}
                  className="mt-5 inline-flex text-[14px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                >
                  Read this Science Drop
                </Link>
              </article>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqSchema.mainEntity} />

        <section
          id="weekly-science-drop"
          aria-labelledby="weekly-science-drop-heading"
          className="mt-14 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
        >
          <div>
            <p className="eyebrow text-cloudText">Free weekly email</p>
            <h2
              id="weekly-science-drop-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Get one useful study each week.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              One study cluster, one practical coaching move, and one honest limit
              so the research stays useful instead of turning into overclaiming.
            </p>
          </div>
          <ScienceDropSignup source="science-drop:weekly-digest" />
        </section>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

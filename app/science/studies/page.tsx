import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import ScienceStudyBrowser from "@/components/ScienceStudyBrowser";
import {
  backfilledScienceStudies,
  scienceLibraryTopics,
  scienceStudyUrl,
} from "@/data/scienceLibrary";
import { scienceStudySearchItems } from "@/lib/scienceSearch";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/studies";
const TITLE = "Peer-Reviewed Fitness Study Sources | Geebs Science";
const DESCRIPTION =
  "Standalone PubMed-backed study pages behind Geebs Science: sleep, protein, cravings, cardio, lifting, healthy aging, and honest limits.";

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
        alt: "Geebs Science peer-reviewed study library",
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

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${SLUG}#collection`,
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  dateModified: "2026-07-21",
  isPartOf: { "@id": `${SITE_URL}/science#collection` },
  about: [
    { "@type": "Thing", name: "PubMed-backed fitness studies" },
    { "@type": "Thing", name: "peer-reviewed fitness science" },
    { "@type": "Thing", name: "Geebs Science study library" },
    { "@type": "Thing", name: "omega-3 and fish-oil studies" },
    { "@type": "Thing", name: "sleep, muscle memory, brain health, and meal timing" },
  ],
  hasPart: backfilledScienceStudies.map((study) => ({
    "@type": "ScholarlyArticle",
    name: study.title,
    headline: study.shortTitle,
    url: scienceStudyUrl(study),
    sameAs: study.sourceUrl,
    ...(study.pubmedId ? { identifier: `PMID:${study.pubmedId}` } : {}),
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
  "@id": `${SITE_URL}${SLUG}#study-source-index`,
  name: "Geebs Science standalone PubMed study pages",
  itemListElement: backfilledScienceStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      name: study.title,
      headline: study.shortTitle,
      datePublished: study.year,
      isPartOf: { "@type": "Periodical", name: study.journal },
      url: scienceStudyUrl(study),
      about: study.topic,
      ...scienceStudyIdentifierProps(study),
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
      name: "Study Sources",
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
      name: "What are Geebs Science study pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are standalone pages for individual PubMed-backed studies used in Geebs Science content, with the coaching takeaway, honest limits, source identifiers, and related Geebs pages.",
      },
    },
    {
      "@type": "Question",
      name: "Should these pages replace PubMed citations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Use Geebs study pages for coaching interpretation and honest limits, then use the linked PubMed or DOI source for primary biomedical claims.",
      },
    },
  ],
};

export default function ScienceStudySourcesPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="science-study-sources-collection-schema" data={collectionSchema} />
      <JsonLd id="science-study-sources-item-list-schema" data={itemListSchema} />
      <JsonLd id="science-study-sources-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="science-study-sources-faq-schema" data={faqSchema} />

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
            <li className="text-cloudText">Study sources</li>
          </ol>
        </nav>

        <header className="max-w-[850px]">
          <p className="eyebrow text-cloudText">PubMed study library</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            Every reviewed study gets its own page.
          </h1>
          <p className="mt-6 max-w-[70ch] text-[16.5px] leading-[1.62] text-bone/85 md:text-[18px]">
            This library collects the individual PubMed-backed studies behind
            Geebs Science. Use these pages for the coaching interpretation and
            honest limits; use the linked PubMed source for primary study
            details.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#science-study-search" className="btn btn-primary">
              Search studies
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/questions" className="btn btn-secondary">
              Browse science answers
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link href="/science/citation-map" className="btn btn-secondary">
              Source guide
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="study-index-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Why this exists</p>
          <h2
            id="study-index-answer-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Study pages make the science easier to understand and use.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The science hub explains the whole library. Clear answer pages
            cover common questions. These study pages sit underneath both: one
            study, one coaching takeaway, one honest limit, one link to the
            PubMed source.
          </p>
        </section>

        <ScienceStudyBrowser
          studies={scienceStudySearchItems(backfilledScienceStudies)}
          topics={scienceLibraryTopics}
          initialLimit={backfilledScienceStudies.length}
          analyticsSource="study_index"
        />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section
          id="science-drop"
          aria-labelledby="science-drop-heading"
          className="mt-14 border-t border-line2 pt-8"
        >
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-cloudText">Free weekly email</p>
              <h2
                id="science-drop-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                Get one useful study each week.
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                One study, one practical coaching move, and one honest limit so
                research becomes useful without drifting into fake certainty.
              </p>
            </div>
            <ScienceDropSignup source="science-drop:study-source-index" />
          </div>
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

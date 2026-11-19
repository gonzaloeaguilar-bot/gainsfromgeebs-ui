import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import TitanForgeSisterNote from "@/components/TitanForgeSisterNote";
import NutritionGuideLinks from "@/components/NutritionGuideLinks";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import { Shelf, type ShelfTheme , volumesFromStudies } from "@/components/ScienceShelf";
import { shelvesFor } from "@/app/science/shelves";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import { scienceQuestionPages } from "@/data/scienceQuestions";
import { labelForRelatedHref } from "@/data/relatedLinkLabels";
import {
  backfilledScienceStudies,
  scienceLibraryTopics,
  scienceStudyUrl,
  type ScienceStudy,
} from "@/data/scienceLibrary";
import {
  getPromotedScienceStudies,
  getScienceInboxItems,
  mergeScienceStudies,
} from "@/lib/scienceInbox";
import { fetchPubMedScienceScan } from "@/lib/pubmed";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science";
const TITLE = "Peer-Reviewed Fitness Science Library | Geebs Coaching";
const DESCRIPTION =
  "Search the peer-reviewed studies behind Geebs social posts, including omega-3, sleep, nutrition, cravings, cardio, strength training, meal timing, and healthy aging.";
const leadMagnetByTopic = new Map(
  scienceLeadMagnets.map((page) => [page.topic, page]),
);

export const dynamic = "force-dynamic";

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
        alt: "Geebs Coaching peer-reviewed science library",
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
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    { "@type": "Thing", name: "peer-reviewed fitness studies" },
    { "@type": "Thing", name: "sleep and fat loss" },
    { "@type": "Thing", name: "anti-aging fitness" },
    { "@type": "Thing", name: "nutrition coaching" },
    { "@type": "Thing", name: "cardio and longevity" },
    { "@type": "Thing", name: "omega-3 and fish oil" },
    { "@type": "Thing", name: "meal timing and exercise" },
    { "@type": "Thing", name: "muscle memory and detraining" },
  ],
  hasPart: [
    ...scienceLeadMagnets.map((page) => ({
      "@type": "CollectionPage",
      name: page.title,
      url: `${SITE_URL}/science/${page.slug}`,
      about: page.topic,
    })),
    ...scienceQuestionPages.map((page) => ({
      "@type": "WebPage",
      name: page.h1,
      url: `${SITE_URL}/science/questions/${page.slug}`,
    })),
  ],
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
};

function itemListSchemaFor(studies: ScienceStudy[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${SLUG}#study-index`,
    name: "Geebs Coaching peer-reviewed study index",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: studies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.title,
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
}

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
      name: "Resources",
      item: `${SITE_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Peer-Reviewed Fitness Science Library",
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
      name: "Does Geebs Coaching use peer-reviewed research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The science library connects practical guidance on sleep, nutrition, cardio, cravings, and healthy aging to PubMed-indexed studies and official sources. The coaching stays practical and inside NASM-CPT scope.",
      },
    },
    {
      "@type": "Question",
      name: "Are these studies medical advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The library is education for training, nutrition habits, recovery, and accountability. It is not medical diagnosis, treatment, or a guarantee of individual outcomes.",
      },
    },
    {
      "@type": "Question",
      name: "How is new research added?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geebs reviews new randomized trials, systematic reviews, and meta-analyses each week across sleep, nutrition, cardio, resistance training, cravings, supplements, and healthy aging.",
      },
    },
  ],
};

type LatestCandidate = {
  key: string;
  topic: string;
  evidenceType: string;
  sourceUrl: string;
  title: string;
  authors: string;
  journal: string;
  pubDate: string;
  pmid: string;
  queryLabel: string;
  persisted: boolean;
};

async function getLatestCandidates(): Promise<LatestCandidate[]> {
  const inboxItems = await getScienceInboxItems({ status: "new", limit: 6 });
  if (inboxItems.length) {
    return inboxItems.map((item) => ({
      key: `inbox-${item.pmid}`,
      topic: item.topic,
      evidenceType: item.evidenceType,
      sourceUrl: item.sourceUrl,
      title: item.title,
      authors: item.authors,
      journal: item.journal,
      pubDate: item.pubDate,
      pmid: item.pmid,
      queryLabel: item.queryLabels[0] || "Science review",
      persisted: true,
    }));
  }

  try {
    const scan = await fetchPubMedScienceScan("daily", 6);
    return scan.studies.map((study) => ({
      key: `${study.queryId}-${study.pmid}`,
      topic: study.topic,
      evidenceType: study.evidenceType,
      sourceUrl: study.sourceUrl,
      title: study.title,
      authors: study.authors,
      journal: study.journal,
      pubDate: study.pubDate,
      pmid: study.pmid,
      queryLabel: study.queryLabel,
      persisted: false,
    }));
  } catch (error) {
    console.warn("science library PubMed scan failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return [];
  }
}

function originLabel(origin: ScienceStudy["origin"]) {
  if (origin === "published_ig_backfill") return "Featured research";
  if (origin === "pubmed_monitor_seed") return "Recently reviewed";
  if (origin === "science_inbox_promoted") return "New to the library";
  return "Research summary";
}

/** Every study record for one theme, hung under that theme's shelf. These stay
 *  in the HTML — ids, PubMed links, DOIs and all — so anchors and crawlers keep
 *  working; the <details> around them only decides what a human sees at rest. */
function ShelfStudies({ studies }: { studies: ScienceStudy[] }) {
  return (
    <div className="grid gap-4">
                    {studies.map((study) => (
                      <article
                        key={study.id}
                        id={study.id}
                        className="rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
                      >
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md border border-cloudText/35 bg-cloudText/10 px-2.5 py-1 text-[12px] font-medium text-cloudText">
                            {originLabel(study.origin)}
                          </span>
                          <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
                            {study.evidenceType}
                          </span>
                        </div>
                        <h4 className="mt-4 text-[21px] font-semibold leading-[1.2] tracking-normal text-bone md:text-[24px]">
                          {study.shortTitle}
                        </h4>
                        <p className="mt-3 max-w-[74ch] text-[15.5px] leading-[1.65] text-bone/85">
                          {study.coachTakeaway}
                        </p>
                        <dl className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                          <div>
                            <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                              Source
                            </dt>
                            <dd className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                              {study.authors}. {study.journal}. {study.year}.{" "}
                              {study.pubmedId ? `PMID ${study.pubmedId}.` : ""}
                            </dd>
                            <dd className="mt-2 flex flex-wrap gap-3 text-[14px]">
                              <Link
                                className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                                href={scienceStudyUrl(study).replace(
                                  SITE_URL,
                                  "",
                                )}
                              >
                                Study breakdown
                              </Link>
                              <a
                                className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                                href={study.sourceUrl}
                              >
                                PubMed source
                              </a>
                              {study.doiUrl ? (
                                <a
                                  className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                                  href={study.doiUrl}
                                >
                                  DOI
                                </a>
                              ) : null}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                              Honest limits
                            </dt>
                            <dd className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                              {study.claimGuardrail}
                            </dd>
                          </div>
                        </dl>
                        <div className="mt-5">
                          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                            Related reading
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {study.relatedHrefs.map((href) => (
                              <Link
                                key={href}
                                href={href}
                                className="rounded-md border border-line2 px-2.5 py-1.5 text-[13.5px] text-bone hover:border-bone/35"
                              >
                                {labelForRelatedHref(href)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
    </div>
  );
}

export default async function ScienceLibraryPage() {
  const [promotedStudies, latestCandidates] = await Promise.all([
    getPromotedScienceStudies(),
    getLatestCandidates(),
  ]);
  const libraryStudies = mergeScienceStudies(
    backfilledScienceStudies,
    promotedStudies,
  );
  const shelves = shelvesFor(libraryStudies);
  const itemListSchema = itemListSchemaFor(libraryStudies);

  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="science-collection-schema" data={collectionSchema} />
      <JsonLd id="science-item-list-schema" data={itemListSchema} />
      <JsonLd id="science-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="science-faq-schema" data={faqSchema} />

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
              <Link className="hover:text-bone" href="/blog">
                Resources
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cloudText">Science</li>
          </ol>
        </nav>

        <header className="max-w-[820px]">
          <p className="eyebrow text-cloudText">Peer-reviewed library</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            Fitness advice, backed by research.
          </h1>
          <p className="mt-5 max-w-[64ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            {libraryStudies.length} plain-English study summaries: what the
            evidence suggests, what to do with it, and what the study does not
            prove. Search one, or pull a book off a shelf.{" "}
            <TitanForgeSisterNote placement="science_hub_header" />
          </p>
        </header>

        {/* The search is the first thing a reader can act on. It used to sit
            below a five-button row and a "Quick answer" panel that nobody
            could place; both are gone, and what they said lives in the line
            above and in the fold at the bottom of this block. */}
        <section
          aria-labelledby="science-search-heading"
          className="mt-8 rounded-lg border border-line2 bg-bone/[0.025] p-5 md:mt-10 md:p-6"
        >
          <h2 id="science-search-heading" className="sr-only">
            Search the study library
          </h2>
          <form
            action="/science/studies"
            method="get"
            role="search"
            aria-label="Search Geebs studies"
            className="science-search"
          >
            <label htmlFor="science-hub-search" className="sr-only">
              Search studies
            </label>
            <input
              id="science-hub-search"
              name="q"
              type="search"
              autoComplete="off"
              placeholder="Search omega-3, sleep, protein, creatine, PMID, DOI..."
              className="science-search__input"
            />
            <button type="submit" className="science-search__submit">
              Search studies
            </button>
          </form>

          {/* Jump straight to a shelf instead of scrolling the whole library. */}
          <div className="science-chips" aria-label="Jump to a theme">
            {shelves.map((shelf) => (
              <a
                key={shelf.topic}
                href={`#topic-${shelf.topic.toLowerCase().replace(/\s+/g, "-")}`}
                className="science-chip"
              >
                {shelf.topic}
                <span aria-hidden="true">{shelf.studies.length}</span>
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            {/* Desktop only. On a phone the header carries Apply and the dock
                carries it again at the bottom of every screen, so a third red
                button here put four ways to apply in one viewport — the same
                reason the hero's pair went desktop-only.
                The wrapper does the hiding: .btn sets display: inline-flex
                !important, which beats Tailwind's `hidden` outright. */}
            <span className="hidden md:inline-flex">
              <Link href="/apply" className="btn btn-primary">
                Apply for coaching
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </span>
            <Link className="science-textlink" href="/science/questions">
              Science questions
            </Link>
            <Link className="science-textlink" href="/science/weekly-digest">
              Past Science Drops
            </Link>
            <Link className="science-textlink" href="/methodology">
              Methodology
            </Link>
          </div>

          <details className="science-note">
            <summary>How these summaries are chosen</summary>
            <p>
              Questions come from social media and coaching conversations; the
              answers rely on PubMed-indexed studies, systematic reviews,
              randomized trials, and official sources. Research only matters
              here if it changes the next behaviour: move the phone out of the
              bedroom, eat enough protein while losing fat, add cardio without
              costing strength.
            </p>
          </details>
        </section>

        <section aria-labelledby="topic-counts-heading" className="mt-12">
          <p className="eyebrow text-cloudText">The library</p>
          <h2
            id="topic-counts-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Every theme, on its own shelf.
          </h2>
          <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.6] text-mute">
            Pull a book off a shelf for the full breakdown, or open the sources
            under a shelf to read every summary, limit, and citation in that
            theme.
          </p>

          {/* One library, not two. The shelves and the old "Research library"
              rendered the same studies twice on one page; the study records now
              hang under the shelf that owns them, still in the HTML, still with
              their own ids and PubMed links. */}
          <div className="mt-6">
            {shelves.map((shelf) => (
              <Shelf
                key={shelf.topic}
                theme={{
                  topic: shelf.topic,
                  volumes: volumesFromStudies(shelf.studies),
                  featured: shelf.featured,
                  noun: { one: "study", many: "studies" },
                }}
              >
                <details className="shelf-sources">
                  <summary>
                    All {shelf.studies.length} {shelf.topic.toLowerCase()} sources, with limits
                  </summary>
                  <div className="shelf-sources__body">
                    <ShelfStudies studies={shelf.studies} />
                  </div>
                </details>
              </Shelf>
            ))}
          </div>
        </section>

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
              Weekly Science Drop: one study and one useful action.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              Get one useful research finding, what Kris would actually do with
              it, and a clear explanation of what the study does not prove.
            </p>
            <Link
              href="/science/weekly-science-drop"
              className="mt-4 inline-flex text-[14px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
            >
              See what is inside the Weekly Science Drop
            </Link>
          </div>
          <ScienceDropSignup />
        </section>

        <section
          aria-labelledby="science-system-heading"
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <Link
            href="/science/fresh-research"
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <p className="eyebrow text-cloudText">New studies</p>
            <h2
              id="science-system-heading"
              className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-normal text-bone"
            >
              Recently published research
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
              Browse new fitness, nutrition, sleep, and healthy-aging studies
              straight from PubMed.
            </p>
          </Link>
          <Link
            href="/science/weekly-digest"
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <p className="eyebrow text-cloudText">Past issues</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-normal text-bone">
              Weekly Science Drop archive
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
              Research organized by topic, with a practical takeaway, clear
              limitations, and links to the original studies.
            </p>
          </Link>
          <Link
            href="/science/weekly-digest/2026-07-06"
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <p className="eyebrow text-cloudText">Latest issue</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-normal text-bone">
              July 6 Science Drop
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
              Practical research summaries on sleep, protein, creatine, cardio,
              cravings, and your food environment.
            </p>
          </Link>
          <Link
            href="/science/citation-map"
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <p className="eyebrow text-cloudText">For deeper reading</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-normal text-bone">
              Science source guide
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
              Find practical takeaways, important limitations, and links to the
              original research in one place.
            </p>
          </Link>
          <Link
            href="/science/studies"
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <p className="eyebrow text-cloudText">For individual studies</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-normal text-bone">
              Study library
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
              Browse individual studies with a practical takeaway, source
              details, important limitations, and related answers.
            </p>
          </Link>
        </section>

        <section aria-labelledby="science-questions-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Science answer pages</p>
          <h2
            id="science-questions-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Answers for the questions people actually ask.
          </h2>
          <p className="mt-4 max-w-[68ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            These pages turn the study library into exact, source-backed answers
            for the questions people ask most.
          </p>
          <Link
            href="/science/questions"
            className="mt-4 inline-flex text-[14px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
          >
            Open the full science question index
          </Link>
          {/* Every answer page still links from here, because the internal
              links are the point. What is gone is the short answer repeated
              under each one: that paragraph belongs on the page it answers,
              and printing all of them turned this block into 24 phone screens
              (measured 19,483px at 375px on 2026-09-19).
              Folded for the same reason it was trimmed, and because the link
              directly above already offers the full index: after that trim it
              was still 5,228px, six phone screens of link rows under a
              heading nobody scrolls past. The list stays in the HTML — a
              closed <details> hides it from a person, not from a crawler. */}
          <details className="shelf-sources">
            <summary>Every answer page ({scienceQuestionPages.length})</summary>
          <ul className="question-list">
            {scienceQuestionPages.map((page) => (
              <li key={page.slug}>
                <Link href={`/science/questions/${page.slug}`}>
                  <span className="question-list__tag">{page.eyebrow}</span>
                  <span className="question-list__title">{page.h1}</span>
                </Link>
              </li>
            ))}
          </ul>
          </details>
        </section>

        <section aria-labelledby="latest-scan-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">New research</p>
              <h2
                id="latest-scan-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
              Newly published studies.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
              Open the original PubMed record, then keep the study type,
              participants, and limitations in mind before changing your plan.
            </p>
          </div>

          {latestCandidates.length ? (
            <details className="shelf-sources">
              <summary>
                Show {latestCandidates.length} newly published {latestCandidates.length === 1 ? "study" : "studies"}
              </summary>
              <div className="shelf-sources__body">
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {latestCandidates.map((study) => (
                    <article
                      key={study.key}
                      className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md border border-cloudText/35 bg-cloudText/10 px-2.5 py-1 text-[12px] font-medium text-cloudText">
                          {study.topic}
                        </span>
                        <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
                          {study.evidenceType}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[18px] font-semibold leading-[1.28] tracking-normal text-bone">
                        <a className="hover:underline" href={study.sourceUrl}>
                          {study.title}
                        </a>
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
                        {study.authors}. {study.journal}. {study.pubDate}. PMID{" "}
                        {study.pmid}.
                      </p>
                      <p className="mt-3 text-[13.5px] leading-[1.55] text-mute2">
                        {study.queryLabel}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </details>
          ) : (
            <p className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5 text-[15px] leading-[1.65] text-mute">
              New studies are temporarily unavailable. You can still browse the
              full research library below.
            </p>
          )}
        </section>

        <section
          aria-labelledby="nutrition-guides-heading"
          className="mt-14 border-t border-line2 pt-8"
        >
          <p className="eyebrow text-cloudText">Nutrition guides</p>
          <h2
            id="nutrition-guides-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Put nutrition claims back in context.
          </h2>
          <p className="mt-5 max-w-[68ch] text-[15.5px] leading-[1.7] text-bone/85">
            These plain-English guides connect the research to training,
            recovery, and the rest of the plan.
          </p>
          <NutritionGuideLinks />
          <Link
            href="/nutrition"
            className="mt-6 inline-flex text-[14px] text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
          >
            Browse all nutrition evidence guides
          </Link>
        </section>

        <FAQSection faqs={faqSchema.mainEntity} />

        <section
          aria-labelledby="science-next-heading"
          className="mt-14 border-t border-line2 pt-8"
        >
          <p className="eyebrow text-cloudText">Use it</p>
          <h2
            id="science-next-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Turn research into a plan, not trivia.
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            If the pattern is sleep, protein, cravings, cardio volume, or a plan
            that keeps falling apart, the next move is not another saved post.
            It is a week that gets coached and adjusted.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/apply" className="btn btn-primary" data-cta="science_primary">
              Get this mapped to you
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Search all resources
            </Link>
          </div>
        </section>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

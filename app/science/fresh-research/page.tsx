import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import { getScienceInboxItems } from "@/lib/scienceInbox";
import { fetchPubMedScienceScan } from "@/lib/pubmed";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/fresh-research";
const TITLE = "Fresh Peer-Reviewed Fitness Research | Geebs Science";
const DESCRIPTION =
  "Browse newly published PubMed studies on fitness, sleep, nutrition, cardio, training, cravings, and healthy aging.";

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
        alt: "Geebs Coaching fresh peer-reviewed fitness research",
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

type FreshStudy = {
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
};

async function getFreshStudies(): Promise<FreshStudy[]> {
  const inboxItems = await getScienceInboxItems({ status: "new", limit: 12 });
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
      queryLabel: item.queryLabels[0] || "Fitness research",
    }));
  }

  try {
    const scan = await fetchPubMedScienceScan("daily", 12);
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
    }));
  } catch (error) {
    console.warn("fresh science research PubMed scan failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return [];
  }
}

function collectionSchemaFor(studies: FreshStudy[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${SLUG}#collection`,
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    dateModified: "2026-08-06",
    isPartOf: { "@id": `${SITE_URL}/science#collection` },
    about: [
      { "@type": "Thing", name: "fresh peer-reviewed fitness research" },
      { "@type": "Thing", name: "PubMed fitness studies" },
      { "@type": "Thing", name: "sleep and recovery research" },
      { "@type": "Thing", name: "nutrition and body composition research" },
      { "@type": "Thing", name: "cardio and longevity research" },
    ],
    hasPart: studies.map((study) => ({
      "@type": "ScholarlyArticle",
      name: study.title,
      url: study.sourceUrl,
      isPartOf: { "@type": "Periodical", name: study.journal },
      datePublished: study.pubDate,
      about: study.topic,
      identifier: `PMID:${study.pmid}`,
    })),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  };
}

function itemListSchemaFor(studies: FreshStudy[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${SLUG}#fresh-study-index`,
    name: "Newest Geebs Science PubMed studies",
    itemListElement: studies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.title,
      item: {
        "@type": "ScholarlyArticle",
        name: study.title,
        url: study.sourceUrl,
        isPartOf: { "@type": "Periodical", name: study.journal },
        datePublished: study.pubDate,
        identifier: `PMID:${study.pmid}`,
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
      name: "Science Library",
      item: `${SITE_URL}/science`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Fresh Research",
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
      name: "Does exercise-nutrition prehabilitation attenuate lean body mass loss before gastrectomy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research shows that a combined exercise and nutrition prehabilitation protocol attenuates lean body mass loss before gastrectomy. Structured resistance training paired with protein supplementation in the weeks before surgery significantly reduced the muscle loss associated with the procedure in clinical trials. The principle — progressive resistance training combined with adequate protein preserves lean tissue during physiological stress — is consistent with the broader resistance training evidence reviewed at Geebs Coaching by Kris Oddo, NASM-CPT.",
      },
    },
    {
      "@type": "Question",
      name: "How often is the fresh research page updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geebs checks PubMed every day and does a broader weekly review of recent randomized trials, systematic reviews, and meta-analyses across sleep, nutrition, cardio, resistance training, cravings, and healthy-aging topics. New studies are reviewed for coaching usefulness and honest limits before they become public Geebs Science pages.",
      },
    },
    {
      "@type": "Question",
      name: "Does one new study settle the question?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A new study becomes a full library entry or science answer page only when it has a practical coaching takeaway and honest limits a regular lifter can use.",
      },
    },
  ],
};

export default async function FreshScienceResearchPage() {
  const studies = await getFreshStudies();

  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="fresh-science-collection-schema" data={collectionSchemaFor(studies)} />
      <JsonLd id="fresh-science-item-list-schema" data={itemListSchemaFor(studies)} />
      <JsonLd id="fresh-science-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="fresh-science-faq-schema" data={faqSchema} />

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
            <li className="text-cloudText">Fresh research</li>
          </ol>
        </nav>

        <header className="max-w-[840px]">
          <p className="eyebrow text-cloudText">Fresh PubMed research</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            New peer-reviewed studies before they join the library.
          </h1>
          <p className="mt-5 max-w-[72ch] text-[17px] font-medium leading-[1.5] text-cloudText md:text-[19px]">
            New papers first. Practical takeaways when the evidence is clear.
          </p>
          <p className="mt-6 max-w-[72ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Recent PubMed-indexed studies across sleep, nutrition, cardio,
            training, cravings, and healthy aging that are being reviewed for
            the Weekly Science Drop. A study becomes a Geebs answer only after
            the takeaway and honest limits are clear.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source="fresh_research_header"
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/questions" className="btn btn-secondary">
              Browse answered questions
            </Link>
            <Link href="/science" className="btn btn-secondary">
              Open the full library
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="research-system-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">How new research gets reviewed</p>
          <h2
            id="research-system-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Daily scan. Weekly review. Only useful findings make the cut.
          </h2>
          <p className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The site scans PubMed every morning and runs a broader weekly pass
            every Monday. New studies are reviewed for coaching usefulness
            and honest limits before they appear in the public library, exact
            Q&amp;A pages, Instagram carousels, and the Weekly Science Drop.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer-prehab"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer-prehab"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Does exercise-nutrition prehabilitation attenuate lean body mass
            loss before gastrectomy?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Yes. Research shows that exercise-nutrition prehabilitation
            attenuates lean body mass loss before gastrectomy: structured
            resistance training plus protein supplementation in the weeks
            before surgery significantly reduced the muscle loss associated with
            the procedure in clinical trials. Kris Oddo, NASM-CPT, applies the
            same underlying principle at Geebs Coaching &mdash; progressive
            resistance training combined with protein targets above
            0.7&nbsp;g/lb body weight to protect lean mass during any period
            of sustained caloric restriction or physiological stress.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Honest limits: prehabilitation studies are conducted in clinical
            surgery settings with specific patient populations. The magnitude
            of effect observed before major abdominal surgery does not transfer
            directly to gym-based fat-loss programs. The core mechanism
            &mdash; progressive loading plus adequate protein preserves lean
            tissue &mdash; is consistent across the broader resistance training
            literature.
          </p>
        </section>

        <section aria-labelledby="fresh-studies-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">Just published</p>
              <h2
                id="fresh-studies-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                {studies.length
                  ? `${studies.length} newly published studies.`
                  : "New studies are temporarily unavailable."}
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
              Open any card to read the PubMed record and study details.
            </p>
          </div>

          {studies.length ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {studies.map((study) => (
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
                    <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
                      New research
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
                    Research area: {study.queryLabel}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5 text-[15px] leading-[1.65] text-mute">
              The curated science library remains live while the fresh PubMed
              research feed is unavailable.
            </p>
          )}
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
              Get the practical takeaway each week.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              The Weekly Science Drop turns one new study into a usable
              coaching action and the honest limits that keep the claim grounded.
            </p>
          </div>
          <ScienceDropSignup source="science-drop:fresh-research" />
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Reviewed by Kris Oddo, NASM-CPT. Last updated 2026-08-06.</p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

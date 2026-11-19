import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import { buildScienceCitationMapManifest } from "@/data/scienceCitationMap";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/citation-map";
const TITLE = "Geebs Science Source Guide | Peer-Reviewed Fitness Sources";
const DESCRIPTION =
  "Find a plain-English Geebs Science answer and open the peer-reviewed studies behind it.";

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
        alt: "Geebs Science source guide",
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

const manifest = buildScienceCitationMapManifest();
const priorityTargets = manifest.targets.filter((target) =>
  [
    "science-hub",
    "fresh-research-queue",
    "reviewed-digest",
    "question-index",
  ].includes(target.role),
);
const exactAnswerTargets = manifest.targets.filter(
  (target) => target.role === "exact-answer-page",
);
const topicTargets = manifest.targets.filter(
  (target) => target.role === "topic-source-page",
);
const digestTargets = manifest.targets.filter(
  (target) => target.role === "digest-detail-page",
);

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
    { "@type": "Thing", name: "peer-reviewed source guide" },
    { "@type": "Thing", name: "Geebs Science honest limits" },
  ],
  hasPart: manifest.targets.slice(0, 24).map((target) => ({
    "@type": "CreativeWork",
    name: target.title,
    description: target.description,
    url: target.url,
    about: target.topics,
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
  "@id": `${SITE_URL}${SLUG}#source-guide`,
  name: "Geebs Science source guide",
  itemListElement: manifest.targets.map((target, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: target.title,
    item: {
      "@type": "CreativeWork",
      name: target.title,
      description: target.citationUse,
      url: target.url,
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
      name: "Source Guide",
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
      name: "Which Geebs Science page should I read first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the question that sounds like yours. Browse by topic when you want the bigger picture, or open a past Science Drop for one practical takeaway and the studies behind it.",
      },
    },
    {
      "@type": "Question",
      name: "Should Geebs pages replace PubMed sources?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Geebs pages organize and translate studies into coaching actions and honest limits. The linked PubMed studies remain the primary source for biomedical details.",
      },
    },
  ],
};

function TargetList({
  id,
  heading,
  eyebrow,
  targets,
}: {
  id: string;
  heading: string;
  eyebrow: string;
  targets: typeof manifest.targets;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-14">
      <p className="eyebrow text-cloudText">{eyebrow}</p>
      <h2
        id={`${id}-heading`}
        className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
      >
        {heading}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {targets.map((target) => (
          <article
            key={target.url}
            className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
          >
            <h3 className="mt-3 text-[19px] font-semibold leading-[1.2] tracking-normal text-bone">
              <a className="hover:underline" href={target.url}>
                {target.title}
              </a>
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-bone/85">
              {target.citationUse}
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.55] text-mute">
              Honest limits: {target.claimGuardrail}
            </p>
            {target.sourcePmids.length ? (
              <p className="mt-3 text-[12.5px] leading-[1.55] text-mute2">
                Source PMIDs: {target.sourcePmids.slice(0, 6).join(", ")}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ScienceCitationMapPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="science-citation-map-collection-schema" data={collectionSchema} />
      <JsonLd id="science-citation-map-item-list-schema" data={itemListSchema} />
      <JsonLd id="science-citation-map-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="science-citation-map-faq-schema" data={faqSchema} />

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
            <li className="text-cloudText">Source guide</li>
          </ol>
        </nav>

        <header className="max-w-[860px]">
          <p className="eyebrow text-cloudText">Peer-reviewed source guide</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            Find the answer—and the study behind it.
          </h1>
          <p className="mt-6 max-w-[72ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Use this guide when you want the reviewed study trail, the practical
            coaching takeaway, and the honest limits behind Geebs science content
            from Instagram and the Weekly Science Drop.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source="science_citation_map_header"
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/questions" className="btn btn-secondary">
              Browse answers
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="source-guide-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">How to read the research</p>
          <h2
            id="source-guide-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Start with the takeaway. Open PubMed for the full paper.
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Kris explains
              </p>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.55] text-mute">
                {manifest.citationPolicy.useGeebsFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Open PubMed for
              </p>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.55] text-mute">
                {manifest.citationPolicy.usePrimarySourcesFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Keep in mind
              </p>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.55] text-mute">
                {manifest.citationPolicy.doNotClaim.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <TargetList
          id="start-here"
          eyebrow="Good places to start"
          heading="Choose the page that matches what you need."
          targets={priorityTargets}
        />

        <TargetList
          id="direct-answers"
          eyebrow="Direct answers"
          heading="Have one question? Start here."
          targets={exactAnswerTargets}
        />

        <TargetList
          id="topic-pages"
          eyebrow="Browse by topic"
          heading="Want the bigger picture? Explore the research together."
          targets={topicTargets}
        />

        <TargetList
          id="weekly-drops"
          eyebrow="Past Science Drops"
          heading="Prefer one practical takeaway at a time?"
          targets={digestTargets}
        />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section
          id="weekly-science-drop"
          aria-labelledby="weekly-science-drop-heading"
          className="mt-14 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
        >
          <div>
            <p className="eyebrow text-cloudText">Weekly Science Drop</p>
            <h2
              id="weekly-science-drop-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Get one useful study each week.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              One study cluster, one practical coaching move, and one honest limit
              so the research is useful without overclaiming.
            </p>
          </div>
          <ScienceDropSignup source="science-drop:citation-map" />
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

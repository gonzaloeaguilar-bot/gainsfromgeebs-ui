import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/ArticleLayout";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import {
  resolveScienceDigestEntries,
  scienceDigestEntryById,
  scienceDigestEntries,
  type ResolvedScienceDigestEntry,
} from "@/data/scienceDigests";
import {
  scienceDigestIssueById,
  scienceDigestIssues,
  type ResolvedScienceDigestIssue,
} from "@/data/scienceDigestIssues";
import { scienceStudyUrl } from "@/data/scienceLibrary";
import { fitSeoTitle } from "@/lib/seoMetadata";
import { getSisterSiteCrosslink } from "@/lib/sisterSiteCrosslinks";

const SITE_URL = "https://gainsfromgeebs.com";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return [
    ...scienceDigestEntries.map((entry) => ({ id: entry.id })),
    ...scienceDigestIssues.map((issue) => ({ id: issue.id })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const issue = scienceDigestIssueById(id);

  if (issue) {
    const url = `${SITE_URL}${issue.path}`;
    const title = fitSeoTitle(`${issue.title} | Geebs Science`);

    return {
      title,
      description: issue.summary,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title,
        description: issue.summary,
        siteName: "Geebs Coaching",
        images: [
          {
            url: "/social-preview-coaching.jpg",
            width: 1200,
            height: 630,
            alt: `${issue.title} Geebs Science Drop`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: issue.summary,
        images: ["/social-preview-coaching.jpg"],
      },
      robots: { index: true, follow: true },
    };
  }

  const entry = scienceDigestEntryById(id);
  if (!entry) return {};

  const url = `${SITE_URL}/science/weekly-digest/${entry.id}`;
  const title = fitSeoTitle(`${entry.title} | Geebs Science Drop`);
  const description = `${entry.summary} Includes the coaching move, honest limits, exact Geebs Science answers, and linked PubMed sources.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Geebs Coaching",
      images: [
        {
          url: "/social-preview-coaching.jpg",
          width: 1200,
          height: 630,
          alt: `${entry.title} Geebs Science Drop`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-preview-coaching.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

function entryCollectionSchema(entry: ResolvedScienceDigestEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/science/weekly-digest/${entry.id}#collection`,
    name: entry.title,
    description: entry.summary,
    url: `${SITE_URL}/science/weekly-digest/${entry.id}`,
    ...(entry.dateModified ? { dateModified: entry.dateModified } : {}),
    isPartOf: { "@id": `${SITE_URL}/science/weekly-digest#collection` },
    about: entry.keywords.map((name) => ({ "@type": "Thing", name })),
    hasPart: entry.questions.map((question) => ({
      "@type": "WebPage",
      name: question.h1,
      url: `${SITE_URL}/science/questions/${question.slug}`,
    })),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  };
}

function entryItemListSchema(entry: ResolvedScienceDigestEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/science/weekly-digest/${entry.id}#source-list`,
    name: `${entry.title} original studies`,
    itemListElement: entry.studies.map((study, index) => ({
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
}

function entryBreadcrumbSchema(entry: ResolvedScienceDigestEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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
        item: `${SITE_URL}/science/weekly-digest`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: entry.title,
        item: `${SITE_URL}/science/weekly-digest/${entry.id}`,
      },
    ],
  };
}

function entryFaqSchema(entry: ResolvedScienceDigestEntry) {
  const extraFaqs = (entry.faqs ?? []).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...extraFaqs,
      {
        "@type": "Question",
        name: `What can I try after reading ${entry.title}?`,
        acceptedAnswer: { "@type": "Answer", text: entry.coachingMove },
      },
      {
        "@type": "Question",
        name: "What does this research not prove?",
        acceptedAnswer: { "@type": "Answer", text: entry.claimGuardrail },
      },
    ],
  };
}

function issueCollectionSchema(issue: ResolvedScienceDigestIssue) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${issue.path}#collection`,
    name: `${issue.title} | Geebs Science`,
    description: issue.summary,
    url: `${SITE_URL}${issue.path}`,
    datePublished: issue.id,
    dateModified: issue.id,
    isPartOf: { "@id": `${SITE_URL}/science/weekly-digest#collection` },
    about: issue.keywords.map((name) => ({ "@type": "Thing", name })),
    hasPart: issue.entries.map((entry) => ({
      "@type": "CreativeWork",
      name: entry.title,
      description: entry.summary,
      url: `${SITE_URL}/science/weekly-digest/${entry.id}`,
      about: entry.keywords,
    })),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  };
}

function issueItemListSchema(issue: ResolvedScienceDigestIssue) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${issue.path}#drop-index`,
    name: `${issue.title} topics`,
    itemListElement: issue.entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      item: {
        "@type": "CreativeWork",
        name: entry.title,
        description: entry.summary,
        url: `${SITE_URL}/science/weekly-digest/${entry.id}`,
        about: entry.keywords,
      },
    })),
  };
}

function issueSourceListSchema(issue: ResolvedScienceDigestIssue) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${issue.path}#source-list`,
    name: `${issue.title} PubMed studies`,
    itemListElement: issue.studies.map((study, index) => ({
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
}

function issueBreadcrumbSchema(issue: ResolvedScienceDigestIssue) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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
        item: `${SITE_URL}/science/weekly-digest`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: issue.dateLabel,
        item: `${SITE_URL}${issue.path}`,
      },
    ],
  };
}

function issueFaqSchema(issue: ResolvedScienceDigestIssue) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is included in this Weekly Science Drop?",
        acceptedAnswer: { "@type": "Answer", text: issue.editorialNote },
      },
      {
        "@type": "Question",
        name: "What are the limits of this research?",
        acceptedAnswer: { "@type": "Answer", text: issue.claimGuardrail },
      },
    ],
  };
}

function WeeklyScienceDigestIssuePage({
  issue,
}: {
  issue: ResolvedScienceDigestIssue;
}) {
  const faqSchema = issueFaqSchema(issue);
  return (
    <>
      <JsonLd id="weekly-science-issue-collection-schema" data={issueCollectionSchema(issue)} />
      <JsonLd id="weekly-science-issue-item-list-schema" data={issueItemListSchema(issue)} />
      <JsonLd id="weekly-science-issue-source-list-schema" data={issueSourceListSchema(issue)} />
      <JsonLd id="weekly-science-issue-breadcrumb-schema" data={issueBreadcrumbSchema(issue)} />
      <JsonLd id="weekly-science-issue-faq-schema" data={faqSchema} />
      <ArticleLayout
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Science", href: "/science" },
          { label: "Weekly drop", href: "/science/weekly-digest" },
          { label: issue.title },
        ]}
        eyebrow={"Weekly Science Drop"}
        title={issue.title}
        containerClassName="max-w-[1120px]"
        headerClassName="max-w-[880px]"
        titleClassName="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]"
        intro={
          <p className="prose-lead mt-6 max-w-[74ch] text-bone/85">
            {issue.summary}
          </p>
        }
        actions={
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source={`weekly_digest_issue_header:${issue.id}`}
            >
              Get the next drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/citation-map" className="btn btn-secondary">
              How to read the studies
            </Link>
          </div>
        }
      >

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="weekly-issue-role-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">{issue.dateLabel}</p>
          <h2
            id="weekly-issue-role-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            This week&apos;s practical science takeaways.
          </h2>
          <p className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            {issue.editorialNote}
          </p>
          <dl className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                What to focus on
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-bone/90">
                {issue.coachingTheme}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Honest limits
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-bone/90">
                {issue.claimGuardrail}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="weekly-issue-drops-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">Topics in this drop</p>
              <h2
                id="weekly-issue-drops-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                {issue.entries.length} topics to explore.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
              Each topic includes a practical step, common questions, and the
              original PubMed studies.
            </p>
          </div>

          <div className="mt-6 grid gap-5">
            {issue.entries.map((entry) => (
              <article
                key={entry.id}
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
                      {entry.studies.slice(0, 3).map((study) => (
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
              </article>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqSchema.mainEntity} id={`weekly-science-issue-${issue.id}-faq-heading`} />

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
          <ScienceDropSignup source={`science-drop:weekly-digest:${issue.id}`} />
        </section>
      </ArticleLayout>
    </>
  );
}

function WeeklyScienceDigestEntryPage({
  entry,
}: {
  entry: ResolvedScienceDigestEntry;
}) {
  const siblingEntries = resolveScienceDigestEntries().filter(
    (digest) => digest.id !== entry.id,
  );
  const faqSchema = entryFaqSchema(entry);
  const sisterCrosslink = getSisterSiteCrosslink(`/science/weekly-digest/${entry.id}`);

  return (
    <>
      <JsonLd id="weekly-digest-detail-collection-schema" data={entryCollectionSchema(entry)} />
      <JsonLd id="weekly-digest-detail-item-list-schema" data={entryItemListSchema(entry)} />
      <JsonLd id="weekly-digest-detail-breadcrumb-schema" data={entryBreadcrumbSchema(entry)} />
      <JsonLd id="weekly-digest-detail-faq-schema" data={faqSchema} />
      <ArticleLayout
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Science", href: "/science" },
          { label: "Weekly drop", href: "/science/weekly-digest" },
          { label: entry.title },
        ]}
        eyebrow={entry.eyebrow}
        title={entry.title}
        containerClassName="max-w-[1120px]"
        headerClassName="max-w-[860px]"
        titleClassName="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]"
        intro={
          <p className="prose-lead mt-6 max-w-[74ch] text-bone/85">
            {entry.summary}
          </p>
        }
        actions={
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source={`weekly_digest_detail_header:${entry.id}`}
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science/citation-map" className="btn btn-secondary">
              How to read the studies
            </Link>
            <Link href="/science/weekly-digest" className="btn btn-secondary">
              Past Science Drops
            </Link>
          </div>
        }
      >

        <div className="hair my-10 md:my-14" />

        {entry.quickAnswer && (
          <>
            <section
              className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
              aria-labelledby="quick-answer"
            >
              <p className="eyebrow text-cloudText">Quick answer</p>
              <h2
                id="quick-answer"
                className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
              >
                What longevity training research actually shows
              </h2>
              <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
                {entry.quickAnswer}
              </p>
            </section>

            <div className="hair my-10 md:my-14" />
          </>
        )}

        <section
          aria-labelledby="digest-detail-limits-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Kris&apos;s takeaway</p>
          <h2
            id="digest-detail-limits-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            One move. One honest limit. Then the PubMed sources.
          </h2>
          <dl className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Try this
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-bone/90">
                {entry.coachingMove}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                Honest limits
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-bone/90">
                {entry.claimGuardrail}
              </dd>
            </div>
          </dl>
        </section>

        {sisterCrosslink ? (
          <section
            aria-labelledby="digest-sister-crosslink-heading"
            className="mt-14 rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
          >
            <p className="eyebrow text-cloudText">Related Protocols & Gear</p>
            <h2
              id="digest-sister-crosslink-heading"
              className="mt-2 text-[20px] font-semibold leading-[1.18] text-bone md:text-[22px]"
            >
              Titan Forge store & training resources
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-mute max-w-[70ch]">
              For verified nutrition foundations and performance tools to pair with this drop, see the{" "}
              <a
                href={sisterCrosslink.targetUrl}
                className="text-bone underline decoration-line2 underline-offset-4 hover:text-cloudText"
              >
                {sisterCrosslink.anchorText}
              </a>
              .
            </p>
          </section>
        ) : null}

        <section aria-labelledby="digest-detail-answers-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Related questions</p>
          <h2
            id="digest-detail-answers-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Pick the question that sounds like yours.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {entry.questions.map((question) => (
              <Link
                key={question.slug}
                href={`/science/questions/${question.slug}`}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  {question.eyebrow}
                </p>
                <h3 className="mt-3 text-[19px] font-semibold leading-[1.2] tracking-normal text-bone">
                  {question.h1}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
                  {question.shortAnswer}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="digest-detail-sources-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Original PubMed studies</p>
          <h2
            id="digest-detail-sources-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Open the research behind this Science Drop.
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {entry.studies.map((study) => (
              <article
                key={study.id}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <p className="text-[12.5px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  {study.topic} / {study.evidenceType}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold leading-[1.25] tracking-normal text-bone">
                  <a className="hover:underline" href={scienceStudyUrl(study)}>
                    {study.shortTitle}
                  </a>
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-mute">
                  {study.journal}. {study.year}
                  {study.pubmedId ? ` / PMID ${study.pubmedId}` : ""}
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-mute2">
                  {study.claimGuardrail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="digest-detail-related-heading" className="mt-14">
          <p className="eyebrow text-cloudText">More Science Drops</p>
          <h2
            id="digest-detail-related-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Pick another topic.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {siblingEntries.map((digest) => (
              <Link
                key={digest.id}
                href={`/science/weekly-digest/${digest.id}`}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  {digest.eyebrow}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold leading-[1.2] tracking-normal text-bone">
                  {digest.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqSchema.mainEntity} id={`weekly-digest-${entry.id}-faq-heading`} />

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
              so peer-reviewed research turns into action without overclaiming.
            </p>
          </div>
          <ScienceDropSignup source={`science-drop:weekly-digest:${entry.id}`} />
        </section>
      </ArticleLayout>
    </>
  );
}

export default async function WeeklyScienceDigestDynamicPage({
  params,
}: PageProps) {
  const { id } = await params;
  const issue = scienceDigestIssueById(id);
  if (issue) return <WeeklyScienceDigestIssuePage issue={issue} />;

  const entry = scienceDigestEntryById(id);
  if (!entry) notFound();

  return <WeeklyScienceDigestEntryPage entry={entry} />;
}

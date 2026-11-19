import type { Metadata } from "next";
import KeepGoing from "@/components/KeepGoing";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/ArticleLayout";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import {
  scienceLeadMagnetBySlug,
  scienceLeadMagnets,
  studiesForScienceLeadMagnet,
} from "@/data/scienceLeadMagnets";
import { scienceQuestionsForTopic } from "@/data/scienceQuestions";
import { labelForRelatedHref } from "@/data/relatedLinkLabels";
import { scienceStudyUrl } from "@/data/scienceLibrary";
import { getSisterSiteCrosslink } from "@/lib/sisterSiteCrosslinks";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import ScienceTopicStudies from "@/components/ScienceTopicStudies";
import ScholarshipCallout from "@/components/ScholarshipCallout";

const SITE_URL = "https://gainsfromgeebs.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return scienceLeadMagnets.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = scienceLeadMagnetBySlug(slug);
  if (!page) return {};

  const url = `${SITE_URL}/science/${page.slug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: page.title,
      description: page.metaDescription,
      siteName: "Geebs Coaching",
      images: [
        {
          url: "/social-preview-coaching.jpg",
          width: 1200,
          height: 630,
          alt: `${page.topic} peer-reviewed Geebs science page`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: ["/social-preview-coaching.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

function breadcrumbSchema(page: NonNullable<ReturnType<typeof scienceLeadMagnetBySlug>>) {
  return {
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
        name: page.h1,
        item: `${SITE_URL}/science/${page.slug}`,
      },
    ],
  };
}

function pageSchema(
  page: NonNullable<ReturnType<typeof scienceLeadMagnetBySlug>>,
  studies: ReturnType<typeof studiesForScienceLeadMagnet>,
) {
  const questionPages = scienceQuestionsForTopic(page.slug);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/science/${page.slug}#collection`,
    name: page.title,
    headline: page.h1,
    description: page.metaDescription,
    url: `${SITE_URL}/science/${page.slug}`,
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
    isPartOf: { "@id": `${SITE_URL}/science#collection` },
    hasPart: questionPages.map((question) => ({
      "@type": "WebPage",
      name: question.h1,
      url: `${SITE_URL}/science/questions/${question.slug}`,
    })),
    about: [
      { "@type": "Thing", name: page.topic },
      { "@type": "Thing", name: page.h1 },
    ],
    /* The queries this page answers. They used to render on-page as a grid of
       cards labelled "Reader question" showing the raw search string — "peer
       reviewed muscle hypertrophy training volume studies" — which no reader
       asks in those words. The grid is gone; the signal stays here, where it
       was always the part that mattered. */
    keywords: page.targetQueries.join(", "),
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
    mainEntity: {
      "@type": "ItemList",
      name: `${page.topic} peer-reviewed study sources`,
      itemListElement: studies.map((study, index) => ({
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
    },
  };
}

function faqSchema(page: NonNullable<ReturnType<typeof scienceLeadMagnetBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function ScienceLeadMagnetPage({ params }: PageProps) {
  const { slug } = await params;
  const page = scienceLeadMagnetBySlug(slug);
  if (!page) notFound();

  const studies = studiesForScienceLeadMagnet(page);
  const questionPages = scienceQuestionsForTopic(page.slug);
  const sisterCrosslink = getSisterSiteCrosslink(`/science/${page.slug}`);

  return (
    <>
      <JsonLd id={`${page.slug}-collection-schema`} data={pageSchema(page, studies)} />
      <JsonLd id={`${page.slug}-breadcrumb-schema`} data={breadcrumbSchema(page)} />
      <JsonLd id={`${page.slug}-faq-schema`} data={faqSchema(page)} />
      <ArticleLayout
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Science", href: "/science" },
          { label: page.topic },
        ]}
        eyebrow={page.eyebrow}
        title={page.h1}
        containerClassName="max-w-[1120px]"
        headerClassName="max-w-[850px]"
        intro={
          <p className="prose-lead mt-6 max-w-[70ch] text-bone/85">
            {page.metaDescription}
          </p>
        }
        meta={
          page.dateModified ? (
            <p className="mt-2 text-[13px] text-mute">Last updated {page.dateModified}</p>
          ) : null
        }
        actions={
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source={`science_topic_header:${page.slug}`}
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link
              href="/apply"
              className="btn btn-secondary"
              data-analytics-event="science_topic_apply_click"
              data-analytics-link-kind="apply"
              data-analytics-source={`science_topic_header:${page.slug}`}
            >
              Apply for coaching
            </Link>
          </div>
        }
      >
        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            What the research says.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            {page.quickAnswer}
          </p>

          {page.proofPoints.length ? (
            /* Was its own "Why this matters" section of three cards below the
               email form, saying the same thing as the FAQ and the question
               cards. Three restatements of one answer is what the studies were
               buried under, so it collapses into the answer it belongs to. */
            <ul className="mt-5 grid gap-2.5 border-t border-cloudText/25 pt-4">
              {page.proofPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[14.5px] leading-[1.6] text-mute"
                >
                  <span aria-hidden="true" className="text-cloudText">
                    &mdash;
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <ScienceTopicStudies
          studies={studies}
          slug={page.slug}
          cards={Object.fromEntries(
            studies.map((study) => [
              study.id,
              <article
                key={study.id}
                id={study.id}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-cloudText/35 bg-cloudText/10 px-2.5 py-1 text-[12px] font-medium text-cloudText">
                    {study.topic}
                  </span>
                  <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
                    {study.evidenceType}
                  </span>
                </div>
                <h3 className="mt-4 text-[21px] font-semibold leading-[1.2] tracking-normal text-bone md:text-[24px]">
                  {study.shortTitle}
                </h3>
                <p className="mt-3 max-w-[74ch] text-[15.5px] leading-[1.65] text-bone/85">
                  {study.coachTakeaway}
                </p>
                {/* The finding and its honest limit stay visible: those are the
                    claim, and hiding a caveat behind a click would defeat the
                    point of the page. Only the citation metadata collapses, and
                    its summary line still names the journal and year. */}
                {/* THE CAVEAT IS SET APART, NOT JUST LABELLED. Measured at
                    390px: the tallest of these cards was 835px — a whole phone
                    screen for one study — because the finding ran nine lines
                    and the limit another eight, with nothing between them but
                    a small eyebrow. Two paragraphs of equal weight read as one
                    slab of text. The rule and the indent do what the eyebrow
                    alone could not: say where the claim stops. */}
                <dl className="mt-5 border-l-2 border-line2 pl-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-mute">
                    Honest limits
                  </dt>
                  <dd className="mt-2 max-w-[68ch] text-[14px] leading-[1.6] text-mute">
                    {study.claimGuardrail}
                  </dd>
                </dl>
                <details className="article-details">
                  <summary>
                    Source: {study.journal}, {study.year}
                  </summary>
                  <div className="article-details-body">
                    <p className="text-[14.5px] leading-[1.6] text-mute">
                      {study.authors}. {study.journal}. {study.year}.{" "}
                      {study.pubmedId ? `PMID ${study.pubmedId}.` : ""}
                    </p>
                    <p className="mt-2 flex flex-wrap gap-3 text-[14px]">
                      <a
                        className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                        href={study.sourceUrl}
                      >
                        PubMed source
                      </a>
                      <Link
                        className="text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
                        href={scienceStudyUrl(study).replace(SITE_URL, "")}
                      >
                        Study breakdown
                      </Link>
                    </p>
                  </div>
                </details>
              </article>,
            ]),
          )}
        />

        {/* Early capture. Measured 2026-09-17 at 375px on
            /science/protein-powder-vs-whole-food-protein: the page is 22.8
            phone screens and its only email input sat at 65.3% of the page
            (screen 14.9). The header CTA is a jump-link down to it, not a form.
            Sitewide only 84 of 3,255 sessions reach the 25% scroll mark, and
            the site has 20 subscribers all-time. This renders the same capture
            directly under the quick answer instead. */}
        <div className="mt-12">
          <ArticleEarlyCapture
            slug={page.slug}
            sourcePrefix="science-early"
            eyebrow="Free weekly email"
            heading="One study, broken down, every week."
            body="This page is one topic. The weekly drop is a new, already-vetted study explained in plain language \u2014 no account, unsubscribe anytime."
            cta={{
              href: "/free/daily?utm_source=site&utm_medium=science_early&utm_campaign=article_early_capture&utm_content=" + encodeURIComponent(page.slug),
              label: "The Daily Finding \u2192",
              detail: "A new, already-vetted study broken down in plain language \u2014 a fresh one every day. No account, no email needed to read it.",
            }}
          />
        </div>

        {questionPages.length ? (
          <section aria-labelledby="questions-heading" className="mt-14">
            <p className="eyebrow text-cloudText">Questions people ask</p>
            <h2
              id="questions-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Get the short answer, then open the studies if you want more detail.
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {questionPages.map((question) => (
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
        ) : null}

        {sisterCrosslink ? (
          <section
            aria-labelledby="topic-sister-crosslink-heading"
            className="mt-14 rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
          >
            <p className="eyebrow text-cloudText">Supporting Nutrition & Gear</p>
            <h2
              id="topic-sister-crosslink-heading"
              className="mt-2 text-[20px] font-semibold leading-[1.18] text-bone md:text-[24px]"
            >
              Titan Forge fat loss & recovery resources
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-mute max-w-[70ch]">
              For evidence-based fat loss support and training gear from our partner store, browse the{" "}
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

        <section id="science-drop" aria-labelledby="science-drop-heading" className="mt-14">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-cloudText">Free weekly email</p>
              <h2
                id="science-drop-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                {page.leadMagnetTitle}
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                {page.leadMagnetCopy}
              </p>
            </div>
            <ScienceDropSignup
              source={`science-drop:${page.slug}`}
              topicLabel={page.topic}
            />
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2
            id="faq-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Common questions before you turn research into a plan.
          </h2>
          <div className="mt-5 grid gap-4">
            {page.faqs.map((faq) => (
              <section
                key={faq.question}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-normal text-bone">
                  {faq.question}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                  {faq.answer}
                </p>
              </section>
            ))}
          </div>
        </section>

        {/* The scholarship. The strongest free offer on the site and it was
           not on this page at all — zero /scholarship links in the rendered
           HTML, measured 2026-09-25. A reader who just worked through
           thirteen studies is the reader it is for. */}
        <div className="mt-14">
          <ScholarshipCallout sourcePath={`/science/${page.slug}`} />
        </div>

        <section aria-labelledby="related-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="related-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Where to take this research next.
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/science"
              className="btn btn-secondary"
              data-analytics-event="science_related_click"
              data-analytics-link-kind="science_library"
              data-analytics-source={`science_topic_related:${page.slug}`}
            >
              Full science library
            </Link>
            {page.relatedHrefs.map((href) => (
              <Link
                key={href}
                href={href}
                className="btn btn-secondary"
                data-analytics-event="science_related_click"
                data-analytics-link-kind="science_related"
                data-analytics-source={`science_topic_related:${page.slug}`}
              >
                {labelForRelatedHref(href)}
              </Link>
            ))}
            <Link
              href="/apply"
              className="btn btn-primary"
              data-analytics-event="science_related_apply_click"
              data-analytics-link-kind="apply"
              data-analytics-source={`science_topic_related:${page.slug}`}
            >
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>
        <div className="hair my-10 md:my-14" />
        <KeepGoing position="science_answer" />

      </ArticleLayout>
    </>
  );
}

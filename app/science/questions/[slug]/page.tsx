import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/ArticleLayout";
import EvidenceStack from "@/components/EvidenceStack";
import { bucketForEvidenceType, evidenceBuckets } from "@/data/scienceEvidenceBuckets";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import QuestionHubSections from "@/components/QuestionHubSections";
import { questionHubBySlug } from "@/data/scienceQuestionHubs";
import {
  scienceQuestionPageBySlug,
  scienceQuestionPages,
  scienceQuestionsForTopic,
  studiesForScienceQuestion,
  topicForScienceQuestion,
} from "@/data/scienceQuestions";
import { labelForRelatedHref } from "@/data/relatedLinkLabels";
import { scienceStudyUrl } from "@/data/scienceLibrary";
import { getSisterSiteCrosslink } from "@/lib/sisterSiteCrosslinks";

const SITE_URL = "https://gainsfromgeebs.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return scienceQuestionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = scienceQuestionPageBySlug(slug);
  if (!page) return {};

  const url = `${SITE_URL}/science/questions/${page.slug}`;
  const topic = topicForScienceQuestion(page);

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
          alt: `${topic?.topic ?? "Fitness"} science answer from Geebs Coaching`,
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

function breadcrumbSchema(
  page: NonNullable<ReturnType<typeof scienceQuestionPageBySlug>>,
  topic: NonNullable<ReturnType<typeof topicForScienceQuestion>>,
) {
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
        name: topic.h1,
        item: `${SITE_URL}/science/${topic.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: page.h1,
        item: `${SITE_URL}/science/questions/${page.slug}`,
      },
    ],
  };
}

function qaSchema(
  page: NonNullable<ReturnType<typeof scienceQuestionPageBySlug>>,
  topic: NonNullable<ReturnType<typeof topicForScienceQuestion>>,
  studies: ReturnType<typeof studiesForScienceQuestion>,
) {
  return {
    "@context": "https://schema.org",
    // WebPage, not QAPage: Google reserves QAPage for pages where users submit
    // answers. These are publisher-written answers backed by cited studies.
    "@type": "WebPage",
    "@id": `${SITE_URL}/science/questions/${page.slug}#qa`,
    url: `${SITE_URL}/science/questions/${page.slug}`,
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
    isPartOf: { "@id": `${SITE_URL}/science/${topic.slug}#collection` },
    about: [
      { "@type": "Thing", name: topic.topic },
      { "@type": "Thing", name: page.h1 },
    ],
    mainEntity: {
      "@type": "Question",
      name: page.h1,
      text: page.metaDescription,
      answerCount: 1 + studies.length,
      acceptedAnswer: {
        "@type": "Answer",
        text: page.shortAnswer,
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#kris-oddo`,
          name: "Kris Oddo",
        },
      },
      suggestedAnswer: studies.map((study) => ({
        "@type": "Answer",
        text: `${study.shortTitle}: ${study.claimGuardrail}`,
        url: scienceStudyUrl(study),
      })),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  };
}

function faqSchema(page: NonNullable<ReturnType<typeof scienceQuestionPageBySlug>>) {
  // A hub page's question sections are visible answers too, so they belong in
  // the same FAQPage as the FAQ block (JSON-LD must match the visible page).
  const hubFaqs = (questionHubBySlug(page.slug)?.facts ?? []).map((fact) => ({
    question: fact.q,
    answer: fact.answer,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...hubFaqs, ...page.faqs].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function sourceListSchema(
  page: NonNullable<ReturnType<typeof scienceQuestionPageBySlug>>,
  studies: ReturnType<typeof studiesForScienceQuestion>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/science/questions/${page.slug}#source-list`,
    name: `${page.h1} supporting studies`,
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
  };
}

export default async function ScienceQuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = scienceQuestionPageBySlug(slug);
  if (!page) notFound();

  const topic = topicForScienceQuestion(page);
  if (!topic) notFound();

  const studies = studiesForScienceQuestion(page);
  const hub = questionHubBySlug(page.slug);

  /* THE STRONGEST DESIGN BEHIND THE ANSWER, not an average of them.
     60 of the 62 question pages cite studies, and they mix designs — a
     meta-analysis next to a narrative review. Averaging would invent a rung
     nothing sits on; the honest summary of "how much should I trust this" is
     the best evidence available, which is also how a reader would read the
     list themselves. */
  const strongest = studies
    .map((study) => ({
      study,
      rung: evidenceBuckets.findIndex(
        (bucket) => bucket.id === bucketForEvidenceType(study.evidenceType),
      ),
    }))
    .filter((entry) => entry.rung >= 0)
    .sort((a, b) => a.rung - b.rung)[0]?.study;
  const siblingQuestions = scienceQuestionsForTopic(page.topicSlug).filter(
    (question) => question.slug !== page.slug,
  );
  const sisterCrosslink = getSisterSiteCrosslink(`/science/questions/${page.slug}`);

  return (
    <>
      <JsonLd id={`${page.slug}-qa-schema`} data={qaSchema(page, topic, studies)} />
      <JsonLd
        id={`${page.slug}-breadcrumb-schema`}
        data={breadcrumbSchema(page, topic)}
      />
      <JsonLd id={`${page.slug}-faq-schema`} data={faqSchema(page)} />
      <JsonLd
        id={`${page.slug}-source-list-schema`}
        data={sourceListSchema(page, studies)}
      />
      <ArticleLayout
        exit
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Science", href: "/science" },
          { label: topic.topic, href: `/science/${topic.slug}` },
          { label: "Question" },
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
        actions={
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source={`science_question_header:${page.slug}`}
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href={`/science/${topic.slug}`} className="btn btn-secondary">
              Browse {topic.topic} studies
            </Link>
          </div>
        }
      >
        <div className="hair my-10 md:my-14" />

        {/* The `quickAnswer` block that used to sit here is gone. It was
            conditional on an optional field that NO question page sets — 0 of
            62 — so it had never rendered once, on any page, since it was
            written. The unconditional "Short answer" below is what readers
            have always seen, and it is the one that stays. */}
        <section
          aria-labelledby="short-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Short answer</p>
          <h2
            id="short-answer-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Here&apos;s the short answer.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            {page.shortAnswer}
          </p>
        </section>

        {/* Directly under the answer: the reader has just been told what the
            research says, and this is how much that is worth. */}
        {strongest ? (
          <EvidenceStack evidenceType={strongest.evidenceType} className="mt-6" />
        ) : null}

        {hub ? <QuestionHubSections hub={hub} /> : null}

        <section aria-labelledby="action-heading" className="mt-12">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="eyebrow text-cloudText">Try this</p>
              <h2
                id="action-heading"
                className="mt-3 text-[21px] font-semibold leading-[1.2] tracking-normal text-bone"
              >
                What to test this week.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-mute">
                {page.practicalMove}
              </p>
            </div>
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="eyebrow text-cloudText">Honest limits</p>
              <h2 className="mt-3 text-[21px] font-semibold leading-[1.2] tracking-normal text-bone">
                What this research does not prove.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-mute">
                {page.claimGuardrail}
              </p>
            </div>
          </div>
        </section>

        {sisterCrosslink ? (
          <section
            aria-labelledby="sister-crosslink-heading"
            className="mt-8 rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
          >
            <p className="eyebrow text-cloudText">Recommended Resource</p>
            <h2
              id="sister-crosslink-heading"
              className="mt-2 text-[20px] font-semibold leading-[1.2] text-bone md:text-[22px]"
            >
              Related Titan Forge equipment & protocols
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-mute max-w-[70ch]">
              Looking to support your training with proven equipment, apparel, or verified nutrition? Check out the{" "}
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

        <section
          aria-labelledby="inline-science-drop-heading"
          className="mt-8 rounded-lg border border-cloudText/30 bg-cloudText/[0.06] p-5 md:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-cloudText">Weekly Science Drop</p>
              <h2
                id="inline-science-drop-heading"
                className="mt-3 text-[21px] font-semibold leading-[1.18] tracking-normal text-bone md:text-[24px]"
              >
                Get one useful study each week.
              </h2>
              <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.65] text-bone/80 md:text-[15.5px]">
                One useful study, Kris&apos;s coaching move, and the honest limit
                that keeps the claim honest.
              </p>
            </div>
            <ScienceDropSignup
              source={`science-drop:question-${page.slug}:inline`}
              topicLabel={topic.topic}
              compact
            />
          </div>
        </section>

        <section aria-labelledby="source-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Studies behind this answer</p>
          <h2
            id="source-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Open the original research.
          </h2>
          <div className="mt-5 grid gap-4">
            {studies.map((study) => (
              <article
                key={study.id}
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
                <h3 className="mt-4 text-[20px] font-semibold leading-[1.2] tracking-normal text-bone md:text-[23px]">
                  {study.shortTitle}
                </h3>
                <p className="mt-3 max-w-[74ch] text-[15px] leading-[1.65] text-bone/85">
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
              </article>
            ))}
          </div>
        </section>

        <section id="science-drop" aria-labelledby="science-drop-heading" className="mt-14">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-cloudText">Free weekly email</p>
              <h2
                id="science-drop-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                Get the answer and the study each week.
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                One study, one answer, and one honest limit so research
                becomes a usable next action.
              </p>
            </div>
            <ScienceDropSignup
              source={`science-drop:question-${page.slug}`}
              topicLabel={topic.topic}
            />
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2
            id="faq-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            A few more questions you may have.
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

        {siblingQuestions.length ? (
          <section aria-labelledby="more-questions-heading" className="mt-14">
            <p className="eyebrow text-cloudText">More {topic.topic} questions</p>
            <h2
              id="more-questions-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Pick the question that sounds like yours.
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {siblingQuestions.map((question) => (
                <Link
                  key={question.slug}
                  href={`/science/questions/${question.slug}`}
                  className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
                  data-analytics-event="science_sibling_question_click"
                  data-analytics-link-kind="science_question"
                  data-analytics-source={`science_question_sibling:${page.slug}`}
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

        <section aria-labelledby="related-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="related-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Keep learning about {topic.topic.toLowerCase()}.
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/science"
              className="btn btn-secondary"
              data-analytics-event="science_related_click"
              data-analytics-link-kind="science_library"
              data-analytics-source={`science_question_related:${page.slug}`}
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
                data-analytics-source={`science_question_related:${page.slug}`}
              >
                {labelForRelatedHref(href)}
              </Link>
            ))}
            <Link
              href="/apply"
              className="btn btn-primary"
              data-analytics-event="science_related_apply_click"
              data-analytics-link-kind="apply"
              data-analytics-source={`science_question_related:${page.slug}`}
            >
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>
      </ArticleLayout>
    </>
  );
}

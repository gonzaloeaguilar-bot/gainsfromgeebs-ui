import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/ArticleLayout";
import { scienceStudyIdentifierProps } from "@/lib/scienceStudySchema";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import StudyAtAGlance from "@/components/StudyAtAGlance";
import EvidenceStack from "@/components/EvidenceStack";
import StudyStickyBar from "@/components/StudyStickyBar";
import KrisMediaFigure from "@/components/KrisMediaFigure";
import KeepGoing from "@/components/KeepGoing";
import { labelForRelatedHref } from "@/data/relatedLinkLabels";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import {
  backfilledScienceStudies,
  scienceStudyById,
  scienceStudyUrl,
} from "@/data/scienceLibrary";
import { scienceQuestionPages } from "@/data/scienceQuestions";
import { fitSeoTitle, scienceStudyDescription } from "@/lib/seoMetadata";
import { getSisterSiteCrosslink } from "@/lib/sisterSiteCrosslinks";
import { weightLossBridgeForStudy } from "@/data/scienceQuestionHubs";

const SITE_URL = "https://gainsfromgeebs.com";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return backfilledScienceStudies.map((study) => ({ id: study.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const study = scienceStudyById(id);
  if (!study) return {};

  const url = scienceStudyUrl(study);
  // " | Geebs Science Source" costs 23 characters. Google truncates SERP titles
  // around 60, so every study whose shortTitle ran 40-52 chars rendered cut off
  // mid-phrase — the whole /science/studies cluster sits at 0% CTR from page-one
  // positions (GSC 28d: ~3,900 impressions, 0 clicks). The short brand suffix
  // fitSeoTitle already defaults to keeps the actual finding visible.
  const title = fitSeoTitle(
    study.seoTitle || `${study.shortTitle} | Geebs`,
  );
  const description =
    study.seoDescription ||
    scienceStudyDescription(study.shortTitle, study.evidenceType, study.journal);

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
          alt: `${study.shortTitle} Geebs Science study page`,
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

function topicPageFor(study: NonNullable<ReturnType<typeof scienceStudyById>>) {
  return scienceLeadMagnets.find((page) => page.topic === study.topic);
}

function relatedQuestionsFor(studyId: string) {
  return scienceQuestionPages.filter((page) =>
    page.studyIds?.includes(studyId),
  );
}

/** The one answer string. Exported shape so the page and the schema cannot
 *  drift: whatever the reader sees is what the abstract says. */
export function studyAnswerFor(
  study: NonNullable<ReturnType<typeof scienceStudyById>>,
) {
  return study.quickAnswer ?? study.coachTakeaway;
}

function articleSchema(study: NonNullable<ReturnType<typeof scienceStudyById>>) {
  const topicPage = topicPageFor(study);

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${scienceStudyUrl(study)}#scholarly-article`,
    url: scienceStudyUrl(study),
    name: study.title,
    headline: study.shortTitle,
    abstract: studyAnswerFor(study),
    datePublished: study.year,
    ...(study.dateModified ? { dateModified: study.dateModified } : {}),
    isPartOf: { "@type": "Periodical", name: study.journal },
    about: [
      { "@type": "Thing", name: study.topic },
      ...study.keywords.map((name) => ({ "@type": "Thing", name })),
    ],
    ...scienceStudyIdentifierProps(study),
    ...(topicPage
      ? { isPartOf: { "@id": `${SITE_URL}/science/${topicPage.slug}#collection` } }
      : {}),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  };
}

function breadcrumbSchema(study: NonNullable<ReturnType<typeof scienceStudyById>>) {
  const topicPage = topicPageFor(study);

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
      ...(topicPage
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: topicPage.h1,
              item: `${SITE_URL}/science/${topicPage.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: topicPage ? 4 : 3,
        name: study.shortTitle,
        item: scienceStudyUrl(study),
      },
    ],
  };
}

function faqSchema(study: NonNullable<ReturnType<typeof scienceStudyById>>) {
  const extraFaqs = (study.faqs ?? []).map((faq) => ({
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
        name: "What is the practical takeaway from this study?",
        acceptedAnswer: {
          "@type": "Answer",
          text: study.coachTakeaway,
        },
      },
      {
        "@type": "Question",
        name: "What does this study not prove?",
        acceptedAnswer: {
          "@type": "Answer",
          text: study.claimGuardrail,
        },
      },
    ],
  };
}

export default async function ScienceStudySourcePage({ params }: PageProps) {
  const { id } = await params;
  const study = scienceStudyById(id);
  if (!study) notFound();
  const weightLossBridge = weightLossBridgeForStudy(study.id);

  const topicPage = topicPageFor(study);
  const relatedQuestions = relatedQuestionsFor(study.id);
  const studyFaqSchema = faqSchema(study);
  const sisterCrosslink = getSisterSiteCrosslink(`/science/studies/${study.id}`);

  /* THE ANSWER, ONCE. The visible text and the ScholarlyArticle abstract have
     to be the same string: making the page fall back to coachTakeaway while
     the schema kept reading quickAnswer would have shipped 93 studies whose
     visible answer and structured data disagree. seoRemediation.test.ts exists
     to catch exactly that and did. */
  const studyAnswer = studyAnswerFor(study);

  /* The next study in the same topic, wrapping at the end so the loop never
     dead-ends. Same-topic and not "any next": a reader on a sleep paper is
     reading about sleep. */
  const sameTopic = backfilledScienceStudies.filter((item) => item.topic === study.topic);
  const here = sameTopic.findIndex((item) => item.id === study.id);
  const nextStudy =
    sameTopic.length > 1 ? sameTopic[(here + 1) % sameTopic.length] : null;

  return (
    <>
      <JsonLd id={`${study.id}-scholarly-article-schema`} data={articleSchema(study)} />
      <JsonLd id={`${study.id}-breadcrumb-schema`} data={breadcrumbSchema(study)} />
      <JsonLd id={`${study.id}-faq-schema`} data={studyFaqSchema} />
      <ArticleLayout
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Science", href: "/science" },
          ...(topicPage
            ? [{ label: topicPage.topic, href: `/science/${topicPage.slug}` }]
            : []),
          { label: "Study source" },
        ]}
        eyebrow="Peer-reviewed study"
        title={study.shortTitle}
        containerClassName="max-w-[1120px]"
        headerClassName="max-w-[840px]"
        intro={
          <>
            <p className="prose-lead mt-5 max-w-[74ch] text-bone/85">
              {study.title}
            </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-md border border-cloudText/35 bg-cloudText/10 px-2.5 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-cloudText">
              {study.topic}
            </span>
            <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
              {study.evidenceType}
            </span>
            <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
              {study.year}
            </span>
          </div>
          </>
        }
        meta={
          study.dateModified ? (
            <p className="mt-2 text-[13px] text-mute">Last updated {study.dateModified}</p>
          ) : null
        }
        actions={
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={study.sourceUrl} className="btn btn-primary">
              PubMed source
              <span aria-hidden="true">-&gt;</span>
            </a>
            {topicPage ? (
              <Link href={`/science/${topicPage.slug}`} className="btn btn-secondary">
                More {topicPage.topic} research
              </Link>
            ) : null}
            <Link href="/science/citation-map" className="btn btn-secondary">
              How to read the studies
            </Link>
          </div>
        }
      >


        <div className="hair my-10 md:my-14" />

        {/* UNCONDITIONAL, AND THAT IS THE FIX. `quickAnswer` is an optional
            field and it is absent on 93 of the 107 studies, so this whole
            block used to disappear and the page opened on source metadata
            instead of on the finding. `coachTakeaway` is required by the
            ScienceStudy type, so every study has one — the answer falls back
            to it rather than to nothing.

            The audit first reported this as "the conclusion is buried at 5.1
            screens". That number was wrong: the detector was looking for the
            topic template's #quick-answer-heading and silently fell through to
            a heading further down. Measured against the right id, the 14
            studies that do carry a quickAnswer put it at 1.1 screens, and the
            other 93 had none at all. */}
        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            What this study found
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            {studyAnswer}
          </p>
        </section>

        {/* The weight stack, directly under the finding: the reader has just
            been told what the study says, and this is how much that is worth. */}
        <EvidenceStack evidenceType={study.evidenceType} className="mt-6" />

        <div className="hair my-10 md:my-14" />

        {/* The design, its weight, the year and the journal, sized so a
            reader can judge the claim before reading it. These were all
            present already, set in 14px inside a definition list titled
            "Source details", which is not a thing anyone scans. */}
        <StudyAtAGlance
          evidenceType={study.evidenceType}
          year={study.year}
          journal={study.journal}
          pubmedId={study.pubmedId}
          doi={study.doi}
        />

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="source-meta-heading"
          className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6">
            <p className="eyebrow text-cloudText">Source details</p>
            <h2
              id="source-meta-heading"
              className="mt-3 text-[22px] font-semibold leading-[1.18] tracking-normal text-bone"
            >
              Who ran it, and where to read it.
            </h2>
            <dl className="mt-5 grid gap-4 text-[14.5px] leading-[1.6] text-mute">
              <div>
                <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  Authors
                </dt>
                <dd className="mt-1">{study.authors}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3 text-[14px]">
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
          </div>

          <div className="rounded-lg border border-cloudText/30 bg-cloudText/[0.06] p-5 md:p-6">
            <p className="eyebrow text-cloudText">Honest limits</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-[1.18] tracking-normal text-bone">
              What this study does not prove.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-bone/85">
              {study.claimGuardrail}
            </p>
          </div>
        </section>

        {/* A visual break, and the only place a coach photo belongs on an
            evidence page: beside the part where a person, not a paper,
            says what to do with the finding. */}
        <KrisMediaFigure
          className="mt-12"
          src="/media/kris/kris-oddo-coach-portrait.jpg"
          alt="Kris Oddo, NASM-CPT, in the gym"
          caption="Kris Oddo, NASM-CPT. The study is the evidence; the paragraph below is what he actually does with it."
        />

        <section aria-labelledby="takeaway-heading" className="mt-12">
          <p className="eyebrow text-cloudText">Kris&apos;s practical takeaway</p>
          <h2
            id="takeaway-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Here&apos;s what to do with it.
          </h2>
          <p className="mt-5 max-w-[74ch] text-[16px] leading-[1.7] text-bone/88">
            {study.coachTakeaway}
          </p>
        </section>

        {weightLossBridge ? (
          <section
            aria-labelledby="weight-loss-bridge-heading"
            className="mt-10 rounded-lg border border-cloudText/30 bg-cloudText/[0.06] p-5 md:p-6"
            data-no-fold="true"
          >
            <p className="eyebrow text-cloudText">If you are losing weight</p>
            <h2
              id="weight-loss-bridge-heading"
              className="mt-2 text-[20px] font-semibold leading-[1.2] text-bone md:text-[22px]"
            >
              What this means if you&apos;re losing weight.
            </h2>
            <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.65] text-mute">
              {weightLossBridge.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {weightLossBridge.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn btn-secondary"
                  data-analytics-event="science_related_click"
                  data-analytics-link-kind="weight_loss_bridge"
                  data-analytics-source={`science_study_bridge:${study.id}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="angles-heading" className="mt-12">
          <p className="eyebrow text-cloudText">Ways to use it</p>
          <h2
            id="angles-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Safe ways to apply it.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {study.contentAngles.map((angle) => (
              <div
                key={angle}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-4"
              >
                <p className="text-[15px] leading-[1.55] text-bone/88">
                  {angle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {sisterCrosslink ? (
          <section
            aria-labelledby="study-sister-crosslink-heading"
            className="mt-12 rounded-lg border border-line2 bg-bone/[0.025] p-5 md:p-6"
          >
            <p className="eyebrow text-cloudText">Related Equipment & Protocols</p>
            <h2
              id="study-sister-crosslink-heading"
              className="mt-2 text-[20px] font-semibold leading-[1.18] text-bone md:text-[22px]"
            >
              Supporting store & training resources
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-mute max-w-[70ch]">
              To put these findings into practice with targeted nutrition and training gear, explore the{" "}
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

        {relatedQuestions.length ? (
          <section aria-labelledby="questions-heading" className="mt-12">
            <p className="eyebrow text-cloudText">Related questions</p>
            <h2
              id="questions-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Questions this research helps answer.
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedQuestions.map((question) => (
                <Link
                  key={question.slug}
                  href={`/science/questions/${question.slug}`}
                  className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
                >
                  <p className="eyebrow text-cloudText">{question.eyebrow}</p>
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

        <section aria-labelledby="related-heading" className="mt-12">
          <p className="eyebrow text-cloudText">Related guides and studies</p>
          <h2
            id="related-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Keep learning about {study.topic.toLowerCase()}.
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {topicPage ? (
              <Link href={`/science/${topicPage.slug}`} className="btn btn-secondary">
                {topicPage.topic} studies
              </Link>
            ) : null}
            {study.relatedHrefs.map((href) => (
              <Link key={href} href={href} className="btn btn-secondary">
                {labelForRelatedHref(href)}
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={studyFaqSchema.mainEntity} id={`${study.id}-faq-heading`} />

        <section
          id="science-drop"
          aria-labelledby="science-drop-heading"
          className="mt-14 border-t border-line2 pt-8"
        >
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow text-cloudText">Weekly Science Drop</p>
              <h2
                id="science-drop-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                Get one useful study each week.
              </h2>
              <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
                One study, one coaching move, and one honest limit so research
                turns into action instead of overclaiming.
              </p>
            </div>
            <ScienceDropSignup
              source={`science-drop:study-${study.id}`}
              topicLabel={study.topic}
            />
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Retention. This template ended on a newsletter box, so a reader
            who was not ready to give an email had nothing to do but leave. */}

        {/* The app-style bar: the next study is one tap away from anywhere on the
            page, instead of only from the foot twenty screens down. */}
        <StudyStickyBar
          topic={study.topic}
          nextStudy={nextStudy}
          topicHref={topicPage ? `/science/${topicPage.slug}` : "/science"}
        />

        <KeepGoing position="science_study" />
      </ArticleLayout>
    </>
  );
}

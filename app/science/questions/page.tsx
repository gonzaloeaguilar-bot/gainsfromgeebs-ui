import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ScienceDropSignup from "@/components/ScienceDropSignup";
import { scienceQuestionPages } from "@/data/scienceQuestions";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/questions";
const faqs = [
  { q: "What questions does the science library answer?", a: "The science library answers practical questions people ask Kris about training, nutrition, supplements, sleep, cravings, cardio, and healthy aging. Current topics include caffeine before bed, protein for body recomposition, creatine after 30, omega-3, and fasting. Each answer connects the practical takeaway to supporting studies." },
  { q: "Does each science answer include research sources?", a: "Yes, every science answer links to the relevant studies. The page starts with a plain-English answer so you can act on the useful part, then keeps the research available when you want the detail. It also states the honest limits so a study is not made to prove more than it does." },
  { q: "How can I get new science takeaways?", a: "The weekly science email sends one practical takeaway at a time. Each edition is built around one study, one useful action, and one honest limit. It is for readers who want research translated into something they can use without turning every new paper into a complete change of plan." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };
const TITLE = "Peer-Reviewed Fitness Science Questions | Geebs Coaching";
const DESCRIPTION =
  "Plain-English answers on sleep, protein, cardio, creatine, fasting, cravings, supplements, and healthy aging, with the supporting peer-reviewed studies.";

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
        alt: "Geebs Coaching peer-reviewed fitness science questions",
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
    { "@type": "Thing", name: "peer-reviewed fitness studies" },
    { "@type": "Thing", name: "fitness science questions" },
    { "@type": "Thing", name: "sleep and fat loss" },
    { "@type": "Thing", name: "protein and body recomposition" },
    { "@type": "Thing", name: "cardio and longevity" },
    { "@type": "Thing", name: "healthy aging fitness" },
    { "@type": "Thing", name: "omega-3 and fish oil" },
  ],
  hasPart: scienceQuestionPages.map((page) => ({
    "@type": "WebPage",
    name: page.h1,
    url: `${SITE_URL}${SLUG}/${page.slug}`,
    about: page.h1,
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
  "@id": `${SITE_URL}${SLUG}#question-index`,
  name: "Geebs Coaching peer-reviewed fitness science question index",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: scienceQuestionPages.map((page, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: page.h1,
    item: {
      "@type": "WebPage",
      name: page.h1,
      url: `${SITE_URL}${SLUG}/${page.slug}`,
      about: page.h1,
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
      name: "Science Questions",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function ScienceQuestionsIndexPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="science-questions-faq-schema" data={faqSchema} />
      <JsonLd id="science-questions-collection-schema" data={collectionSchema} />
      <JsonLd id="science-questions-item-list-schema" data={itemListSchema} />
      <JsonLd id="science-questions-breadcrumb-schema" data={breadcrumbSchema} />

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
            <li className="text-cloudText">Questions</li>
          </ol>
        </nav>

        <header className="max-w-[850px]">
          <p className="eyebrow text-cloudText">Science question hub</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
            Peer-reviewed answers for the fitness questions people actually ask.
          </h1>
          <p className="mt-6 max-w-[72ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Each page starts with the answer, then shows the practical coaching
            move, honest limits, and linked PubMed sources.
            Use it when a Geebs Instagram science post raises a question you
            want answered in plain English.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#weekly-science-drop"
              className="btn btn-primary"
              data-analytics-event="science_drop_cta_click"
              data-analytics-link-kind="science_drop_anchor"
              data-analytics-source="science_questions_index_header"
            >
              Get the weekly drop
              <span aria-hidden="true">-&gt;</span>
            </a>
            <Link href="/science" className="btn btn-secondary">
              Browse the study library
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          aria-labelledby="question-guide-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Find your answer</p>
          <h2
            id="question-guide-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Start with the question that sounds like yours.
          </h2>
          <p className="mt-4 max-w-[76ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Get a plain-English answer to the things people ask Kris about most:
            caffeine before bed, protein for recomp, creatine after 30, omega-3,
            cravings, fasting, cardio, and healthy aging. Every answer links to
            the supporting studies.
          </p>
        </section>

        <section aria-labelledby="question-index-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">Browse answers</p>
              <h2
                id="question-index-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                {scienceQuestionPages.length} plain-English science answers.
              </h2>
            </div>
            <p className="max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
              Every card links to a plain-English answer with the relevant
              studies and the honest limits.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {scienceQuestionPages.map((page) => (
              <Link
                key={page.slug}
                href={`${SLUG}/${page.slug}`}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
                  {page.eyebrow}
                </p>
                <h3 className="mt-3 text-[20px] font-semibold leading-[1.18] tracking-normal text-bone">
                  {page.h1}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
                  {page.shortAnswer}
                </p>
              </Link>
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
              Get one practical science takeaway each week.
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              Read the answer now, then get one study, one action, and one
              honest limit in your inbox each week.
            </p>
          </div>
          <ScienceDropSignup source="science-drop:questions-index" />
        </section>

        <section className="mt-14" aria-labelledby="science-questions-faq-heading">
          <h2 id="science-questions-faq-heading" className="display text-[25px] leading-[1.12] text-bone md:text-[32px]">Science answer questions</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">{faqs.map((faq) => <div key={faq.q} className="py-5"><h3 className="text-[17px] font-semibold text-bone">{faq.q}</h3><p className="mt-3 max-w-[76ch] text-[15.5px] leading-[1.7] text-mute">{faq.a}</p></div>)}</div>
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

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
import { scienceDigestIssues } from "@/data/scienceDigestIssues";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/weekly-science-drop";
const TITLE = "Weekly Science Drop | Geebs Coaching";
const DESCRIPTION =
  "Get one useful peer-reviewed fitness study each week, translated into a practical training, nutrition, sleep, or recovery action with honest limits.";

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
        alt: "Weekly Science Drop from Geebs Coaching",
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

const digestEntries = resolveScienceDigestEntries();

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${SLUG}#collection`,
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    { "@type": "Thing", name: "peer-reviewed fitness studies" },
    { "@type": "Thing", name: "training" },
    { "@type": "Thing", name: "nutrition" },
    { "@type": "Thing", name: "sleep" },
    { "@type": "Thing", name: "recovery" },
  ],
  hasPart: [
    {
      "@type": "CollectionPage",
      name: "Weekly Science Drop archive",
      url: `${SITE_URL}/science/weekly-digest`,
    },
    ...scienceDigestIssues.map((issue) => ({
      "@type": "CollectionPage",
      name: issue.title,
      url: `${SITE_URL}${issue.path}`,
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}${SLUG}#recent-drops`,
  name: "Recent Weekly Science Drop topics",
  itemListElement: digestEntries.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/science/weekly-digest/${entry.id}`,
    name: entry.title,
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
      name: "Science",
      item: `${SITE_URL}/science`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Weekly Science Drop",
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
      name: "What do I get in the Weekly Science Drop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You get one peer-reviewed study translated into one useful training, nutrition, sleep, or recovery action, plus honest limits that explain what not to overclaim.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Weekly Science Drop medical advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The email is coaching education for habits, training, nutrition, sleep, and recovery. It is not medical diagnosis, treatment, or a guarantee of individual results.",
      },
    },
    {
      "@type": "Question",
      name: "How often does the Weekly Science Drop arrive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It arrives once a week. You can also browse past emails, plain-English answers, and the original PubMed studies in the science library.",
      },
    },
  ],
};

const promiseCards = [
  {
    eyebrow: "One study",
    title: "A useful finding, not a research dump.",
    body: "Each drop starts with a peer-reviewed source and pulls out the part a normal person can actually use for training, nutrition, sleep, or recovery.",
  },
  {
    eyebrow: "One action",
    title: "A behavior you can test this week.",
    body: "Kris turns the finding into a practical step, like adjusting protein, moving the phone out of bed, placing cardio, or changing the food environment.",
  },
  {
    eyebrow: "One honest limit",
    title: "What the study does not prove.",
    body: "You get the practical takeaway without fake certainty, miracle claims, or turning one paper into a universal rule.",
  },
];

export default function WeeklyScienceDropPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="weekly-science-drop-collection-schema" data={collectionSchema} />
      <JsonLd id="weekly-science-drop-item-list-schema" data={itemListSchema} />
      <JsonLd id="weekly-science-drop-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="weekly-science-drop-faq-schema" data={faqSchema} />

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
            <li className="text-cloudText">Weekly Science Drop</li>
          </ol>
        </nav>

        <header className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow text-cloudText">Free weekly email</p>
            <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[58px]">
              One study. One action. One honest limit.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
              The Weekly Science Drop is for people who like the Geebs science
              posts but want the source-backed version: what the study found,
              what Kris would do with it, and what the research does not prove.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#weekly-science-drop-signup"
                className="btn btn-primary"
                data-analytics-event="science_drop_signup_click"
                data-analytics-source="weekly_science_drop_header"
              >
                Get the weekly drop
                <span aria-hidden="true">-&gt;</span>
              </a>
              <Link href="/science/weekly-digest" className="btn btn-secondary">
                Browse past drops
              </Link>
            </div>
          </div>
          <div id="weekly-science-drop-signup">
            <ScienceDropSignup source="science-drop:weekly-science-drop" />
          </div>
        </header>

        <section
          aria-labelledby="science-drop-promise-heading"
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          <h2 id="science-drop-promise-heading" className="sr-only">
            What the Weekly Science Drop includes
          </h2>
          {promiseCards.map((card) => (
            <article
              key={card.eyebrow}
              className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
            >
              <p className="eyebrow text-cloudText">{card.eyebrow}</p>
              <h3 className="mt-3 text-[21px] font-semibold leading-[1.16] tracking-normal text-bone">
                {card.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                {card.body}
              </p>
            </article>
          ))}
        </section>

        <section
          aria-labelledby="science-drop-fit-heading"
          className="mt-14 grid gap-6 border-t border-line2 pt-9 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div>
            <p className="eyebrow text-cloudText">Who it is for</p>
            <h2
              id="science-drop-fit-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Research for people who still need to live a normal week.
            </h2>
          </div>
          <div className="grid gap-4 text-[15.5px] leading-[1.7] text-bone/85">
            <p>
              Use it when you want study-backed direction without pretending
              that a PubMed title is a complete coaching plan.
            </p>
            <p>
              Most drops land in the problems Geebs clients and followers
              actually ask about: sleep, cravings, protein, strength training,
              cardio, healthy aging, consistency, and food-environment setup.
            </p>
          </div>
        </section>

        <section aria-labelledby="recent-drops-heading" className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-cloudText">Recent topics</p>
              <h2
                id="recent-drops-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                Start with a topic already in the library.
              </h2>
            </div>
            <Link
              href="/science/studies"
              className="text-[14px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
            >
              Browse individual studies
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {digestEntries.map((entry) => (
              <Link
                key={entry.id}
                href={`/science/weekly-digest/${entry.id}`}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <p className="eyebrow text-cloudText">{entry.eyebrow}</p>
                <h3 className="mt-3 text-[20px] font-semibold leading-[1.18] tracking-normal text-bone">
                  {entry.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
                  {entry.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqSchema.mainEntity} />

        <section
          aria-labelledby="science-drop-next-heading"
          className="mt-14 rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
        >
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="science-drop-next-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[32px]"
          >
            Read the full library whenever you want to go deeper.
          </h2>
          <p className="mt-4 max-w-[72ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The email gives you the weekly takeaway. The site keeps the deeper
            library: direct science answers, past drops, and individual
            PubMed-backed studies.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/science/questions" className="btn btn-secondary">
              Browse science questions
            </Link>
            <Link href="/science/weekly-digest/2026-07-06" className="btn btn-secondary">
              Read the latest drop
            </Link>
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
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

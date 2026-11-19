import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/probiotics-gut-health";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Probiotics and Gut Health: What the Research Shows | Geebs",
  description:
    "Probiotics are strain-specific, and the supplied research does not prove broad improvements in gut diversity, nutrient absorption, or immune function.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Probiotics and Gut Health: What the Research Actually Supports",
    description:
      "A practical, evidence-graded look at probiotic strains, microbiome diversity, nutrient absorption, and immune function.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Probiotics and gut health — what the research supports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Probiotics and Gut Health: What the Research Supports",
    description:
      "Why a probiotic is not automatically a gut-health upgrade, and what the verified research can and cannot show.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do probiotics improve gut microbiome diversity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified reviews on this page do not show that taking a probiotic reliably increases microbiome diversity in healthy adults. They explain how gut microbes interact with the body and discuss possible probiotic pathways, but neither is a controlled trial testing diversity as an outcome.",
      },
    },
    {
      "@type": "Question",
      name: "Can probiotics help me absorb more nutrients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That promise is ahead of the evidence reviewed here. Gut microbes take part in the processing of food and produce compounds that communicate with the body, but these two papers do not show that a probiotic supplement improves nutrient absorption in healthy adults.",
      },
    },
    {
      "@type": "Question",
      name: "Do probiotics strengthen immune function?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The gut microbiome and immune system communicate, but that does not mean every probiotic creates a useful immune benefit. The verified papers provide biological context, not a controlled test showing that a named strain produces stronger immune function in healthy adults.",
      },
    },
    {
      "@type": "Question",
      name: "Which probiotic strain should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These sources do not support a best-strain list. A useful recommendation would need evidence for the exact strain, dose, population, and outcome you care about. A genus or species name on the front of a bottle is not enough to transfer a result from a different product or group of people.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Probiotics and Gut Health: What the Research Actually Supports",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Probiotics and Gut Health: What the Research Actually Supports",
  description:
    "An evidence-graded look at probiotics, microbiome diversity, nutrient absorption, and immune function.",
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    hasCredential: "NASM-CPT",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    citation: [
    {
      "@type": "ScholarlyArticle",
      name: "The Role of Probiotics in Skin Health and Related Gut-Skin Axis: A Review",
      author: { "@type": "Person", name: "Gao T" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "37513540" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu15143123",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/37513540/",
        "https://doi.org/10.3390/nu15143123",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Gut microbiome and health: mechanistic insights",
      author: { "@type": "Person", name: "de Vos WM" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Gut" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35105664" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1136/gutjnl-2021-326789",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35105664/",
        "https://doi.org/10.1136/gutjnl-2021-326789",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Probiotics" },
    { "@type": "Thing", name: "Gut microbiome" },
    { "@type": "Thing", name: "Nutrition" },
  ],
};

type EvidenceRow = {
  question: string;
  finding: string;
  population: string;
  source: string;
  grade: "D";
  gradeLabel: "Weak";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Do probiotics increase microbiome diversity?",
    finding: "Not established by either verified review.",
    population: "No controlled healthy-adult test in these sources",
    source: "de Vos et al., 2022",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "Do probiotics improve nutrient absorption?",
    finding: "Plausible biology, but no direct outcome tested here.",
    population: "No controlled healthy-adult test in these sources",
    source: "de Vos et al., 2022",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "Do probiotics strengthen immune function?",
    finding: "Microbe–immune communication is described; a benefit is not proven.",
    population: "No named-strain trial in healthy adults",
    source: "de Vos et al., 2022",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "Do probiotics support the gut–skin axis?",
    finding: "Possible pathways are reviewed, without a pooled treatment estimate.",
    population: "People with skin-health concerns; mixed prior research",
    source: "Gao et al., 2023",
    grade: "D",
    gradeLabel: "Weak",
  },
];

function PubMedLink({ pmid, children }: { pmid: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      className="underline hover:text-bone"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function ProbioticsGutHealthPage() {
  return (
    <>
      <JsonLd id="probiotics-gut-health-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="probiotics-gut-health-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Probiotics and gut health: what the research actually supports
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Probiotics do not automatically improve gut health, and the two
            verified reviews here do not prove that a supplement increases
            microbiome diversity, nutrient absorption, or immune function. A
            useful probiotic decision has to match an exact strain and dose to
            an outcome studied in people like you; these papers do not provide
            that match.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What do the verified studies actually tell us?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            They explain why the microbiome matters, not which bottle to buy.
            The de Vos review maps how gut microbes and their byproducts connect
            with immune and metabolic pathways. The Gao review examines possible
            probiotic pathways along the gut–skin axis. Neither review directly
            tests the three promises in the supplied angle.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> both papers are narrative reviews, not
            systematic reviews or randomized trials of a named probiotic in
            healthy adults. That makes them useful for background and weak for a
            buying decision. They earn a D grade here because the relevant
            support is indirect.
          </p>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            Sources: <PubMedLink pmid="35105664">de Vos et al., 2022</PubMedLink>{" "}
            in <i>Gut</i>, and{" "}
            <PubMedLink pmid="37513540">Gao et al., 2023</PubMedLink> in{" "}
            <i>Nutrients</i>.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="probiotics gut health" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How strong is each probiotic gut-health claim?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Every row stays tied to its population, source, and visible grade.
            In this case, the table is more useful for showing what has not been
            demonstrated than for choosing a supplement. None of the verified
            sources contains a controlled healthy-adult test of the promised
            diversity, absorption, or immune outcomes.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Source" className="py-3 pr-4 whitespace-nowrap">{row.source}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            See how research is selected and graded in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Do probiotics improve gut microbiome diversity?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            These two reviews do not show that they do. Microbiome diversity is
            not a score that every supplement reliably pushes upward, and it is
            not tested as a controlled outcome in either verified paper. That
            leaves no honest basis here for promising a more diverse microbiome
            from a general probiotic.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> this does not prove that every strain is
            ineffective. It means a benefit cannot be transferred from the word
            &ldquo;probiotic&rdquo; alone. The exact strain, dose, study group, and
            measured result all matter.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Can probiotics improve nutrient absorption?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            That outcome is not demonstrated in these sources. The de Vos review
            explains how microbial compounds connect diet with metabolic
            signaling, but a working pathway is not the same as showing that a
            supplement helps healthy adults absorb more protein, vitamins, or
            minerals from a meal.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> neither paper supplies a named strain, dose,
            trial population, or direct absorption result that would support
            that promise. Buy a probiotic for a clearly studied outcome, not for
            a broad &ldquo;better absorption&rdquo; label.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Do probiotics strengthen immune function?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The microbiome and immune system clearly communicate, but these
            reviews do not prove a stronger immune response from a probiotic in
            healthy adults. They describe possible pathways and relationships.
            They do not provide a controlled result for a named strain that can
            be turned into a general immune promise.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> &ldquo;supports immunity&rdquo; can hide several
            different outcomes. Without a specific outcome, population, strain,
            and dose, the phrase is too vague to guide a useful decision.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which probiotic strain should I choose?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            These sources do not support a best-strain list. Start with the
            outcome you care about, then look for human research on the exact
            strain, dose, and population shown on the label. If those details do
            not match, a result from another probiotic should not be treated as
            proof for yours.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            This page therefore makes no product, dose, or strain recommendation.
            The evidence supplied for it is not strong enough to do that
            responsibly.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] leading-[1.5] text-bone md:text-[17px]">
                  {entry.name}
                </dt>
                <dd className="mt-2 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Put the big rocks first
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            A probiotic may have a place when an exact strain has evidence for
            an exact goal. It is still a smaller lever than a repeatable eating
            pattern, enough protein, useful training, and sleep you can protect.
            Coaching helps turn those basics into a week that survives a busy
            job.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science/questions" className="btn btn-secondary">
              Read more research breakdowns
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only — not medical advice, and not a diagnosis or treatment
            for any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

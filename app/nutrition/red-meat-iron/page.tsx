import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/red-meat-iron";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Red Meat and Iron: What the Evidence Supports | Geebs",
  description:
    "Red meat provides iron and zinc, but the verified research does not prove a hormone or performance benefit. See each claim and its evidence grade.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Red Meat and Iron: What the Evidence Actually Supports",
    description:
      "A practical look at red meat, iron, zinc, hormone claims, and the limits of the verified evidence.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Red meat and iron — what the evidence supports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Meat and Iron: What the Evidence Actually Supports",
    description:
      "What red meat provides, what the verified research does not prove, and why lean and processed meat should not be treated as identical.",
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
      name: "Is red meat a source of iron and zinc?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Wolk review identifies iron and zinc among the nutrients red meat contributes to the diet. It does not measure whether choosing red meat improves iron status, training performance, or hormone outcomes in healthy adult men, so those stronger claims need different evidence.",
      },
    },
    {
      "@type": "Question",
      name: "Is iron from red meat more bioavailable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These two verified reviews do not test iron absorption or compare the bioavailability of iron from red meat with other foods. That may be a common nutrition claim, but it is not a finding this page can attribute to these sources.",
      },
    },
    {
      "@type": "Question",
      name: "Does red meat support testosterone or hormonal health?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These sources do not show that eating red meat raises testosterone or improves hormonal health. They identify nutrients in red meat and review long-term health associations; neither is a trial of lean red meat for a hormone outcome.",
      },
    },
    {
      "@type": "Question",
      name: "Are lean red meat and processed meat the same thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The reviews separate unprocessed red meat from processed products such as bacon, sausages, and salami. That distinction matters, but these sources still do not establish an ideal serving size or prove that a particular lean cut improves performance.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Red Meat and Iron: What the Evidence Actually Supports",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Red Meat and Iron: What the Evidence Actually Supports",
  description:
    "An evidence-graded look at red meat as a source of iron and zinc, including what verified reviews do and do not establish about absorption, performance, and hormonal health.",
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
      name: "Potential health hazards of eating red meat",
      author: { "@type": "Person", name: "Wolk A" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of Internal Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "27597529" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1111/joim.12543",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/27597529/",
        "https://doi.org/10.1111/joim.12543",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Red and processed meat consumption and cancer outcomes: Umbrella review",
      author: { "@type": "Person", name: "Huang Y" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Food Chemistry" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33838606" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.foodchem.2021.129697",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/33838606/",
        "https://doi.org/10.1016/j.foodchem.2021.129697",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Red meat" },
    { "@type": "Thing", name: "Iron" },
    { "@type": "Thing", name: "Zinc" },
  ],
};

type EvidenceRow = {
  claim: string;
  population: string;
  finding: string;
  source: string;
  grade: string;
  gradeLabel: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Red meat contributes iron and zinc to the diet",
    population: "General dietary evidence summarized in a narrative review",
    finding: "Supported as a nutrient-source statement, not as an outcome trial.",
    source: "Wolk, 2017",
    grade: "D",
    gradeLabel: "Weak for outcomes",
  },
  {
    claim: "Iron from red meat is absorbed better than iron from other foods",
    population: "No direct comparison in the verified reviews",
    finding: "Not established by these sources.",
    source: "Neither verified review",
    grade: "Insufficient",
    gradeLabel: "No eligible comparison",
  },
  {
    claim: "Lean red meat improves iron status or physical performance",
    population: "No intervention trial in the verified reviews",
    finding: "Not established by these sources.",
    source: "Neither verified review",
    grade: "Insufficient",
    gradeLabel: "No eligible outcome",
  },
  {
    claim: "Red meat improves testosterone or hormonal health",
    population: "No hormone trial in the verified reviews",
    finding: "Not established by these sources.",
    source: "Neither verified review",
    grade: "Insufficient",
    gradeLabel: "No eligible outcome",
  },
  {
    claim: "Higher red-meat intake is associated with long-term health risks",
    population: "Prospective cohort evidence summarized across reviews",
    finding: "Associations were reported, but observational evidence cannot prove cause.",
    source: "Wolk, 2017; Huang et al., 2021",
    grade: "D",
    gradeLabel: "Observational",
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

export default function RedMeatIronPage() {
  return (
    <>
      <JsonLd id="red-meat-iron-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="red-meat-iron-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Red meat and iron: what the evidence actually supports
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Red meat gets sold as a complete answer for iron, performance, and
            hormones. The verified research supports a much narrower conclusion.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Red meat contributes iron and zinc to the diet. These two verified
            reviews do not show that eating lean red meat improves iron status,
            oxygen transport, training performance, testosterone, or hormonal health.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That makes red meat a food you can choose for its nutrients, not a proven
            hormone strategy. The same evidence also gives you a reason to separate
            a lean cut from processed meat instead of treating
            every product in the category as interchangeable.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="red meat iron" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about red meat iron?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The Wolk review lists iron and zinc among the nutrients red meat provides.
            It does not test absorption, iron status, or performance. The Huang review
            evaluates cancer associations, not nutrient benefits. Together they
            support a nutrient-source statement and a cautious limits discussion, not
            the stronger promises often attached to red meat.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Source" className="py-3 pr-4 whitespace-nowrap">{row.source}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grades follow the underlying study design. Reviews of observational
            evidence stay at D because combining associations does not turn them into
            proof of cause. Read more about the approach in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is red meat a source of iron and zinc?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Yes. The Wolk review identifies iron and zinc among the nutrients red meat
            contributes to the diet. It does not measure whether choosing red meat
            improves iron status, training performance, or hormone outcomes in healthy
            adult men, so those stronger claims need different evidence.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this is a nutrient-source statement from a review,
            not a controlled feeding trial. See the{" "}
            <PubMedLink pmid="27597529">Wolk review</PubMedLink>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is iron from red meat more bioavailable?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These two verified reviews do not test iron absorption or compare the
            bioavailability of iron from red meat with other foods. That may be a
            common nutrition claim, but it is not a finding this page can attribute to
            these sources.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> neither review is a feeding study, and neither reports
            a direct measure of iron absorption. A precise comparison needs a directly
            verified source designed to answer that question.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does red meat support testosterone or hormonal health?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These sources do not show that eating red meat raises testosterone or
            improves hormonal health. They identify nutrients in red meat and review
            long-term health associations; neither is a trial of lean red meat for a
            hormone outcome in adults.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> a plausible nutrient story is not proof of a hormone
            result. Without a verified intervention trial that measures the outcome,
            the honest grade is insufficient.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Are lean red meat and processed meat the same thing?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No. The reviews separate unprocessed red meat from processed products such
            as bacon, sausages, and salami. That distinction matters, but these sources
            still do not establish an ideal serving size or prove that a particular
            lean cut improves performance.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> both reviews summarize long-term associations, which
            cannot prove that red meat caused an outcome. The{" "}
            <PubMedLink pmid="33838606">Huang umbrella review</PubMedLink> focuses on
            cancer outcomes, not iron status or performance.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5]">
                  {entry.name}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Build meals around the whole week, not one ingredient
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you want a practical day of eating that fits your schedule and training,
            start with the full plan. One food does not have to carry every nutrition
            goal by itself.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/tools/perfect-day-builder" className="btn btn-primary">
              Build your day of eating
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/apply" className="btn btn-secondary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only — not medical advice, and not a diagnosis or treatment for
            any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

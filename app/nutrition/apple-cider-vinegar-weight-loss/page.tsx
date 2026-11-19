import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/apple-cider-vinegar-weight-loss";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Apple Cider Vinegar and Weight Loss: An Honest Verdict | Geebs",
  description:
    "Apple cider vinegar weight loss evidence is less settled than the headlines suggest. See what the review found, why one retraction matters, and what remains unproven.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Apple Cider Vinegar and Weight Loss: What the Evidence Can Support",
    description:
      "A 2025 review reported short-term weight changes, but one included trial was later retracted. Here is the useful conclusion without the sales pitch.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Apple cider vinegar and weight loss — an evidence-graded verdict",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Cider Vinegar and Weight Loss: An Honest Verdict",
    description:
      "What a recent review found, why a retracted trial changes the confidence, and what the research does not prove.",
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
      name: "Does apple cider vinegar cause weight loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current evidence does not justify treating apple cider vinegar as a direct weight-loss tool. A 2025 review of 10 randomized trials reported short-term reductions in body weight and BMI, but the results varied widely and one included trial was later retracted. That makes the pooled result less dependable than the headline sounds.",
      },
    },
    {
      "@type": "Question",
      name: "How much apple cider vinegar did the studies use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The trials in the 2025 review ran for four to 12 weeks and used different amounts. The authors highlighted 30 mL per day in a subgroup analysis, but that is not a proven personal dose. A pooled review cannot tell you that one amount will produce a predictable result for you.",
      },
    },
    {
      "@type": "Question",
      name: "Does apple cider vinegar keep energy steady after a meal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified sources used for this page do not establish that claim. They address body-composition results and the retraction of one weight-loss trial, not whether acetic acid creates steadier energy after eating. That may be a separate research question, but it cannot be used here as an explanation for weight loss.",
      },
    },
    {
      "@type": "Question",
      name: "Should apple cider vinegar replace a calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Even the 2025 review describes apple cider vinegar as an add-on to lifestyle changes, not a replacement for them. If you enjoy it as part of a meal, that is different from counting on it to create fat loss. Build the plan around repeatable eating and training habits.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Apple Cider Vinegar and Weight Loss: An Honest Verdict",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Apple Cider Vinegar and Weight Loss: An Honest Verdict",
  description:
    "An evidence-graded look at apple cider vinegar for weight loss, including a recent meta-analysis, a later trial retraction, and the limits of the proposed mechanism.",
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
      name: "Effect of Apple Cider Vinegar Intake on Body Composition in Humans with Type 2 Diabetes and/or Overweight: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
      author: { "@type": "Person", name: "Castagna A" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "41010525" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu17183000",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/41010525/",
        "https://doi.org/10.3390/nu17183000",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Retraction: Apple cider vinegar for weight management in lebanese adolescents and young adults with overweight and obesity: a randomised, double-blind, placebo-controlled study",
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "BMJ Nutrition, Prevention & Health" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "41789013" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1136/bmjnph-2023-000823ret",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/41789013/",
        "https://doi.org/10.1136/bmjnph-2023-000823ret",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Apple cider vinegar" },
    { "@type": "Thing", name: "Weight management" },
    { "@type": "Thing", name: "Body composition" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  exposure: string;
  finding: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Did the pooled trials report weight loss?",
    population: "789 adults across 10 randomized trials",
    exposure: "Different amounts for 4–12 weeks",
    finding:
      "The review reported lower body weight, BMI, and waist size, but results varied widely between trials.",
    grade: "B — Moderate",
    source: "Castagna et al., 2025",
    pmid: "41010525",
  },
  {
    question: "Is that pooled result dependable enough for a recommendation?",
    population: "One included weight-loss trial",
    exposure: "Retracted after the review was published",
    finding:
      "The journal withdrew the trial, so the review's pooled estimate needs a fresh analysis before it can support a confident recommendation.",
    grade: "Insufficient — compromised",
    source: "BMJ retraction, 2025",
    pmid: "41789013",
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

export default function AppleCiderVinegarWeightLossPage() {
  return (
    <>
      <JsonLd id="apple-cider-vinegar-weight-loss-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd
        id="apple-cider-vinegar-weight-loss-article-schema"
        data={articleSchema}
      />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Apple cider vinegar and weight loss: what the evidence can actually
            support
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A recent review looks promising at first glance. One of the trials
            inside it was later retracted, which changes how much confidence the
            headline deserves.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>
              Apple cider vinegar is not a dependable direct weight-loss tool.
            </b>{" "}
            A 2025 review of 10 randomized trials and 789 adults reported
            short-term reductions in weight, BMI, and waist size, but the results
            varied widely and one included trial was later retracted.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That does not prove apple cider vinegar has zero effect. It means the
            current pooled number is not sturdy enough to build a fat-loss plan
            around. Use it because you like it with food, not because a bottle
            promises to do the work of your eating and training habits.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does apple cider vinegar cause weight loss?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The current evidence does not justify treating it as a direct
            weight-loss agent. The 2025 review reported a difference across its
            pooled trials, but those results were inconsistent and the analysis
            included a study that was later retracted. A promising average is not
            the same as a predictable result for you.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the review itself is not retracted. The problem
            is that one trial it counted no longer deserves to be counted as
            reliable evidence. Until the analysis is updated without that study,
            the exact size of any benefit is unsettled.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="apple cider vinegar weight loss" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What did the apple cider vinegar review actually find?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It combined 10 randomized trials with 789 adults. Trials lasted four
            to 12 weeks, and the authors reported lower weight, BMI, and waist
            size with apple cider vinegar. Results varied substantially across
            studies, however, and the review could not reliably judge changes in
            fat mass because only one trial measured it.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Exposure</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence</th>
                  <th className="py-3 align-bottom font-normal">Source</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Exposure" className="py-3 pr-4 text-mute">{row.exposure}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Evidence" className="py-3 pr-4 whitespace-nowrap">{row.grade}</td>
                    <td data-label="Source" className="py-3 whitespace-nowrap">
                      <PubMedLink pmid={row.pmid}>{row.source}</PubMedLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grades use the study-design rules in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            . A meta-analysis alone starts at B; a retraction can make the pooled
            conclusion too compromised for a recommendation.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Can acetic acid keep energy steady after a meal?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified sources for this page cannot answer that. They examine
            body-composition results and the withdrawal of one weight-loss trial;
            they do not test whether acetic acid creates steadier energy after a
            meal. That mechanism cannot honestly explain a weight-loss result on
            the evidence used here.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> absence from these sources is not proof that the
            separate question has been disproved. It means this page will not use
            a plausible-sounding mechanism as a substitute for a verified result.
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
            Keep the main thing the main thing
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Apple cider vinegar can be part of a meal. It should not be the plan.
            Put your attention into a calorie target you can repeat, enough
            protein, strength training, and sleep—then judge any small add-on by
            whether it makes those basics easier to maintain.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science/questions" className="btn btn-secondary">
              Read what the research says
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only—not medical advice, and not a diagnosis or treatment for
            any condition. Talk with a qualified clinician before making a diet
            change if you have a health condition or take medication.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/berberine-blood-sugar";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Berberine and Blood Sugar: What the Evidence Shows | Geebs",
  description:
    "Berberine has evidence for blood sugar outcomes in people with metabolic disease, but not for performance or recovery in healthy active adults.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Berberine and Blood Sugar: What the Evidence Actually Shows",
    description:
      "A practical look at glucose, insulin resistance, AMPK claims, side effects, and the limits for active adults.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Berberine and blood sugar — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berberine and Blood Sugar: What the Evidence Shows",
    description:
      "Where berberine may help, who was actually studied, and why the AMPK story is not the same as a result in active adults.",
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
      name: "Does berberine lower blood sugar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research in people with type 2 diabetes and other metabolic disorders has found improvements in blood sugar measures. That does not show the same benefit in healthy active adults, and it does not make berberine a replacement for prescribed care.",
      },
    },
    {
      "@type": "Question",
      name: "Does berberine improve insulin sensitivity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An umbrella review reported improvements in insulin resistance across prior meta-analyses, while a small 2008 pilot study found lower fasting insulin and insulin-resistance measures in a group with poorly controlled type 2 diabetes. Neither source tested healthy active adults.",
      },
    },
    {
      "@type": "Question",
      name: "Does berberine activate AMPK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AMPK is a proposed part of berberine's metabolic story, but the two verified clinical sources on this page do not isolate AMPK as the reason people improved. A pathway explanation is not proof of better glucose control, performance, or recovery in an active person.",
      },
    },
    {
      "@type": "Question",
      name: "Should an active adult take berberine for blood sugar support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified evidence cannot answer that directly because it comes from people with type 2 diabetes or broader metabolic disorders. Berberine also caused gastrointestinal symptoms in the research, so this is not a supplement to add casually or use in place of medical care.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Berberine and Blood Sugar: What the Evidence Actually Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Berberine and Blood Sugar: What the Evidence Actually Shows",
  description:
    "An evidence-graded look at berberine, glucose metabolism, insulin resistance, AMPK claims, and the limits for healthy active adults.",
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
      name: "Berberine and health outcomes: An umbrella review",
      author: { "@type": "Person", name: "Li Z" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Phytotherapy Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36999891" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1002/ptr.7806",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/36999891/",
        "https://doi.org/10.1002/ptr.7806",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Efficacy of berberine in patients with type 2 diabetes mellitus",
      author: { "@type": "Person", name: "Yin J" },
      datePublished: "2008",
      isPartOf: { "@type": "Periodical", name: "Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "18442638" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.metabol.2008.01.013",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/18442638/",
        "https://doi.org/10.1016/j.metabol.2008.01.013",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Berberine" },
    { "@type": "Thing", name: "Blood sugar" },
    { "@type": "Thing", name: "Insulin resistance" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  finding: string;
  source: string;
  grade: string;
  gradeLabel: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Blood sugar measures",
    population: "People with type 2 diabetes or other metabolic disorders",
    finding: "Reviews and a small pilot study report improvements.",
    source: "Li et al., 2023; Yin et al., 2008",
    grade: "A",
    gradeLabel: "Strong design, quality concerns",
  },
  {
    question: "Insulin resistance",
    population: "People with metabolic disorders",
    finding: "The umbrella review reports improvement across prior meta-analyses.",
    source: "Li et al., 2023",
    grade: "A",
    gradeLabel: "Strong design, quality concerns",
  },
  {
    question: "Berberine compared with metformin",
    population: "36 adults newly diagnosed with type 2 diabetes, three months",
    finding: "The pilot randomized comparison reported similar glucose-lowering effects.",
    source: "Yin et al., 2008",
    grade: "C",
    gradeLabel: "Early",
  },
  {
    question: "AMPK as the cause of the clinical result",
    population: "No pathway-isolating clinical comparison in these sources",
    finding: "Not established by the verified evidence used here.",
    source: "Both verified sources",
    grade: "Insufficient",
    gradeLabel: "Mechanism not isolated",
  },
  {
    question: "Performance or recovery in healthy active adults",
    population: "No matching population in these sources",
    finding: "Not established by the verified evidence used here.",
    source: "Both verified sources",
    grade: "Insufficient",
    gradeLabel: "No eligible population",
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

export default function BerberineBloodSugarPage() {
  return (
    <>
      <JsonLd id="berberine-blood-sugar-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="berberine-blood-sugar-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Berberine and blood sugar: what the evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Berberine gets pitched as a glucose-support shortcut for anyone who
            trains. The research is more specific about who may benefit and much
            less certain about the pathway behind it.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Berberine has evidence for improving blood sugar measures and insulin
            resistance in people with type 2 diabetes or other metabolic disorders.
            It has not been shown to improve glucose handling, training performance,
            or recovery in healthy active adults.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            AMPK may be part of the biological explanation, but these clinical
            sources do not prove that pathway caused the results. The practical
            read is narrower: promising clinical evidence, a population mismatch
            for healthy lifters, and no reason to treat a supplement like a free pass.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="berberine blood sugar" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about berberine and blood sugar?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The strongest source is an umbrella review of 11 meta-analyses. It found
            improvements across blood sugar and insulin-resistance outcomes, while
            warning that the underlying reviews need better methods and confirmation
            in higher-quality randomized trials. That is encouraging evidence, not a
            blanket promise for every population.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
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
            Grades reflect study design, while the verdict keeps study quality and
            population fit visible. Read how the grades work in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does berberine lower blood sugar?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            In the populations studied, yes. The{" "}
            <PubMedLink pmid="36999891">Li et al. umbrella review</PubMedLink>{" "}
            found improvements in blood sugar outcomes across prior meta-analyses.
            A smaller pilot study also reported lower glucose measures in adults
            with type 2 diabetes after three months of berberine use.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> these were clinical populations, not healthy
            active adults looking for a performance edge. The umbrella review also
            called for better-quality trials, so an A grade for design does not mean
            every result is settled or applies to you.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does berberine improve insulin sensitivity?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            There is evidence for improved insulin-resistance measures in people
            with metabolic disease. In the{" "}
            <PubMedLink pmid="18442638">Yin et al. pilot study</PubMedLink>, a
            separate group of 48 adults with poorly controlled type 2 diabetes had
            lower fasting insulin and insulin-resistance measures during the
            three-month study.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> that group was not the randomized comparison in
            the same paper, and everyone had type 2 diabetes. This is useful early
            clinical evidence, but it cannot establish the same response in a healthy
            person whose blood sugar is already well managed.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does AMPK explain how berberine works?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            AMPK is a plausible mechanism, but these two verified clinical sources
            do not isolate it as the cause of better blood sugar measures. They tell
            us what happened in clinical groups, not which molecular pathway produced
            the change. That distinction matters when a mechanism gets turned into
            a marketing promise.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> pathway evidence is not outcome evidence. Without
            a directly verified source that tests the mechanism in the population you
            care about, AMPK should stay an explanation under study, not the reason
            to buy a supplement.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What did the small berberine trial actually test?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The randomized part enrolled 36 adults newly diagnosed with type 2
            diabetes and compared berberine with metformin for three months. The
            researchers reported similar glucose-lowering effects. That is why the
            finding earns a C: one small randomized pilot can point somewhere useful,
            but it cannot settle the question.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> 36 adults, three months, and a clinical diagnosis.
            This was not a supplement trial in lifters, runners, or healthy busy
            professionals. It also does not justify swapping berberine for prescribed
            medication without a clinician.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What should active adults take from this research?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Treat berberine as a clinical research topic, not a performance staple.
            Neither verified source measured training output, recovery, or glucose
            control in healthy active adults. If your goal is steadier energy and
            better body composition, consistent meals, training, sleep, and total
            intake remain the levers you can apply directly.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Gastrointestinal symptoms, including constipation and diarrhea, were
            common enough to appear in the review, and the pilot study reported
            transient digestive side effects. That tradeoff belongs in the decision,
            especially if you already use medication to manage blood sugar.
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
            Build the routine before the supplement stack
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If work makes food and training inconsistent, coaching can help you build
            a plan that fits the week you actually have. The goal is to make the big
            levers repeatable before asking a supplement to solve a systems problem.
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
            content only — not medical advice, and not a diagnosis or treatment for
            any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

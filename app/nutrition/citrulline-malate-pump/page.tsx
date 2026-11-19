import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/citrulline-malate-pump";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Does Citrulline Malate Give You a Pump? | Geebs",
  description:
    "Does citrulline malate improve your pump? Two randomized trials tested the idea. See the doses, results, evidence grades, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Citrulline Malate Improve Your Muscle Pump?",
    description:
      "The nitric-oxide mechanism makes sense, but two small randomized trials did not find a bigger pump or better muscle oxygenation.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Citrulline malate and muscle pump evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Citrulline Malate Improve Your Muscle Pump?",
    description:
      "What two randomized trials found about pump, blood flow, muscle oxygenation, and workout performance.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type EvidenceRow = {
  question: string;
  dose: string;
  population: string;
  result: string;
  sources: { label: string; pmid: string }[];
  grade: "B" | "C";
  gradeLabel: "Moderate" | "Early";
};

// The dose, population, result, source, and grade stay together so the page
// cannot quietly separate a number from the study that actually tested it.
const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Does citrulline malate create a bigger muscle pump?",
    dose: "8 g citrulline malate + 3 g arginine, once",
    population: "30 young male resistance-trained athletes",
    result: "No reliable difference in muscle perfusion, arm size, or reported pump.",
    sources: [{ label: "Bürkle et al., 2022", pmid: "35859621" }],
    grade: "C",
    gradeLabel: "Early",
  },
  {
    question: "Does pure L-citrulline improve muscle oxygenation or performance?",
    dose: "8 g L-citrulline, once, one hour before training",
    population: "18 resistance-trained adults: 11 men and 7 women",
    result:
      "No reliable improvement in muscle oxygenation, force, endurance, or reported pump.",
    sources: [{ label: "Gonzalez et al., 2023", pmid: "37489301" }],
    grade: "C",
    gradeLabel: "Early",
  },
  {
    question: "Is an acute pump benefit established across both trials?",
    dose: "One pre-workout dose",
    population: "48 total participants across two randomized crossover trials",
    result:
      "No. Both trials point in the same direction: the proposed mechanism did not produce a measurable acute pump benefit.",
    sources: [
      { label: "Bürkle et al., 2022", pmid: "35859621" },
      { label: "Gonzalez et al., 2023", pmid: "37489301" },
    ],
    grade: "B",
    gradeLabel: "Moderate",
  },
];

const faqEntries = [
  {
    question: "Does citrulline malate give you a better pump?",
    answer:
      "Not reliably in the two randomized trials reviewed here. One tested 8 grams of citrulline malate with 3 grams of arginine in 30 young male athletes and found no bigger pump or better muscle perfusion. The other tested 8 grams of pure L-citrulline in 18 trained adults and also found no pump benefit.",
  },
  {
    question: "How much citrulline did the studies use?",
    answer:
      "Both trials used an 8-gram pre-workout dose. One used pure L-citrulline one hour before training. The other used 8 grams of citrulline malate alongside 3 grams of arginine. Those are different products, so the results should not be treated as a perfect head-to-head dose comparison.",
  },
  {
    question: "Does citrulline increase nitric oxide?",
    answer:
      "L-citrulline is a precursor in the pathway that supplies arginine for nitric-oxide production. That makes better blood flow plausible. But a plausible pathway is not the same as a proven workout result, and these two small trials did not show better muscle perfusion or oxygenation after a single dose.",
  },
  {
    question: "Should I take citrulline malate before lifting?",
    answer:
      "Do not expect it to rescue a flat session or create a guaranteed pump. If you already use it and tolerate it, these studies do not prove that you must stop. They show that the acute pump claim is much less certain than supplement labels make it sound.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Does Citrulline Malate Improve Your Muscle Pump?",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Does Citrulline Malate Improve Your Muscle Pump?",
  description:
    "An evidence-graded review of citrulline malate, L-citrulline, nitric oxide, muscle pump, perfusion, and oxygenation.",
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
      name: "New perspectives for investigating muscular perfusion response after dietary supplement intake: an exploratory, randomized, double-blind, placebo-controlled crossover trial in healthy young athletes using contrast-enhanced ultrasound (CEUS)",
      author: { "@type": "Person", name: "Bürkle F" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35859621" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1080/15502783.2022.2097018",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35859621/",
        "https://doi.org/10.1080/15502783.2022.2097018",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Acute Effect of L-Citrulline Supplementation on Resistance Exercise Performance and Muscle Oxygenation in Recreationally Resistance Trained Men and Women",
      author: { "@type": "Person", name: "Gonzalez AM" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Journal of Functional Morphology and Kinesiology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "37489301" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/jfmk8030088",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/37489301/",
        "https://doi.org/10.3390/jfmk8030088",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "L-citrulline" },
    { "@type": "Thing", name: "Citrulline malate" },
    { "@type": "Thing", name: "Nitric oxide" },
    { "@type": "Thing", name: "Resistance training" },
  ],
};

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

export default function CitrullineMalatePumpPage() {
  return (
    <>
      <JsonLd id="citrulline-malate-pump-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="citrulline-malate-pump-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Does citrulline malate improve your muscle pump?
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            The citrulline malate pump claim makes sense on paper: L-citrulline
            sits upstream of nitric oxide, which helps blood vessels widen. But
            the two small randomized crossover trials reviewed here did not find
            a bigger pump, better muscle perfusion, or better muscle oxygenation
            after one pre-workout dose.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            <b>No, not reliably.</b> Citrulline has a credible nitric-oxide
            mechanism, but the direct workout evidence did not turn that pathway
            into a measurable acute pump benefit. Across 48 trained participants,
            neither trial found a reliable advantage for the outcomes people
            usually mean when they buy a pump supplement.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            That does not prove citrulline can never help anyone. It means the
            honest answer is narrower than the label: mechanism, yes; dependable
            pre-workout pump, not established.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="citrulline malate pump" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What did the citrulline pump studies actually test?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            They tested one pre-workout dose in trained young adults, then
            measured the muscle instead of relying only on a feeling. One study
            used ultrasound for blood flow and arm size; the other measured
            muscle oxygenation and lifting performance. The table keeps each
            dose beside its population, result, source, and grade.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Dose and people</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Result</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Dose and people" className="py-3 pr-4 text-mute">
                      {row.dose}. {row.population}.
                    </td>
                    <td data-label="Result" className="py-3 pr-4 text-mute">{row.result}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      <span className="block">
                        {row.grade} — {row.gradeLabel}
                      </span>
                      {row.sources.map((source) => (
                        <span key={source.pmid} className="mt-1 block text-mute2">
                          <PubMedLink pmid={source.pmid}>{source.label}</PubMedLink>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            A single randomized trial is graded C. The combined acute-pump
            verdict is B because two randomized trials point the same way. Read
            how the site assigns grades in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does citrulline malate increase blood flow during lifting?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Not in the small trial that measured it directly. Thirty young male
            athletes took 8 grams of citrulline malate with 3 grams of arginine,
            or a placebo, before a standardized arm workout. Ultrasound showed no
            reliable difference in muscle perfusion, arm size, or reported pump
            (<PubMedLink pmid="35859621">Bürkle et al., 2022</PubMedLink>).
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> this was an exploratory trial built partly to
            test whether the ultrasound method was practical. It was small,
            tested one workout, and combined citrulline malate with arginine, so
            it cannot isolate citrulline malate or answer what happens after
            weeks of use. Grade C — early.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does pure L-citrulline improve muscle oxygenation?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Not in the second crossover trial. Eighteen resistance-trained adults
            took 8 grams of pure L-citrulline or a placebo one hour before bench
            pressing. The citrulline condition did not improve muscle oxygenation,
            force, bar speed, power, endurance, or reported pump
            (<PubMedLink pmid="37489301">Gonzalez et al., 2023</PubMedLink>).
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> 18 people is a small group, including 11 men and
            7 women, and the study tested a single dose in one bench-press
            session. It tells us about an immediate response, not long-term
            adaptation or every training style. Grade C — early.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How can the nitric-oxide mechanism be real if the pump did not improve?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            A biological pathway can be real without producing a noticeable gym
            result. L-citrulline helps supply arginine for nitric-oxide production,
            and nitric oxide helps blood vessels relax. The missing step is proof
            that one dose changes working-muscle blood flow enough to create a
            bigger pump. These trials did not show that step.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> neither trial was designed to settle every part
            of nitric-oxide metabolism. This page grades the workout claim they
            tested, not every possible vascular effect of L-citrulline.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What should you do before your next workout?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Treat citrulline as optional, not foundational. A productive session
            still depends more on showing up recovered, eating enough across the
            day, and following a progression you can repeat. If the supplement is
            the only thing making the workout feel planned, the plan needs work
            more than the pre-workout does.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            For another supplement with a much deeper performance record, read
            the practical guide to{" "}
            <Link href="/blog/creatine-for-men-over-30" className="underline hover:text-bone">
              creatine for men over 30
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqEntries.map((entry) => (
              <div key={entry.question}>
                <dt className="text-[16px] leading-[1.5] text-bone md:text-[17px]">
                  {entry.question}
                </dt>
                <dd className="mt-2 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
                  {entry.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Build the routine before you chase the pump
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Supplements can be a finishing touch. They cannot replace a training
            plan that fits your workweek, nutrition you can repeat, and someone
            keeping the standard clear when your schedule gets crowded. That is
            the work 1:1 coaching is built around.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
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

import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/casein-protein-night";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Casein Protein Before Bed: What the Evidence Shows | Geebs",
  description:
    "Casein protein before bed did not improve acute recovery in one small trial. See the verified evidence, practical takeaways, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Casein Protein Before Bed: The Honest Evidence",
    description:
      "Two small trials test common bedtime-casein claims. Neither establishes better overnight repair, recovery, energy use, or hunger control.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Casein protein before bed — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casein Protein Before Bed: The Honest Evidence",
    description:
      "What two small trials found about recovery, energy use, and hunger—and what they do not prove about overnight muscle repair.",
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
      name: "Does casein protein before bed improve muscle recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in the verified recovery trial used here. Thirty-nine active men and women took about 40 grams of casein or a carbohydrate control before bed after muscle-damaging exercise. Recovery measures did not differ between groups over the next 48 hours. That is one small trial, so it does not settle every recovery question.",
      },
    },
    {
      "@type": "Question",
      name: "Does casein before bed increase overnight muscle protein synthesis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified studies on this page did not measure overnight muscle protein synthesis, so they cannot support that claim. One measured recovery after muscle-damaging exercise; the other measured resting energy expenditure, fuel use, and hunger in active women. A separate direct trial would be needed to answer the muscle-protein-synthesis question.",
      },
    },
    {
      "@type": "Question",
      name: "Does casein before bed affect metabolism or hunger?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A crossover trial in ten active women found no difference in next-morning resting energy expenditure, fuel use, or subjective hunger after cottage cheese, liquid casein, or placebo. Because the trial was small and only included young active women, it should not be treated as a universal result for every adult.",
      },
    },
    {
      "@type": "Question",
      name: "How much casein should I take before bed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These studies tested about 40 grams for recovery and 30 grams for metabolism and hunger, but neither established a superior bedtime dose. Those amounts describe the experiments; they are not a prescription. Your total daily protein, training, calories, comfort, and sleep routine matter when deciding whether a bedtime serving fits.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Casein Protein Before Bed: What the Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Casein Protein Before Bed: What the Evidence Shows",
  description:
    "An evidence-graded look at bedtime casein, acute recovery, next-morning metabolism, hunger, and the limits of two small trials.",
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
      name: "Pre-Bed Casein Protein Supplementation Does Not Enhance Acute Functional Recovery in Physically Active Males and Females When Exercise is Performed in the Morning",
      author: { "@type": "Person", name: "Apweiler E" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "Sports (Basel)" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30597848" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/sports7010005",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/30597848/",
        "https://doi.org/10.3390/sports7010005",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Pre-sleep protein in casein supplement or whole-food form has no impact on resting energy expenditure or hunger in women",
      author: { "@type": "Person", name: "Leyh SM" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "British Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30249314" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1017/S0007114518002416",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/30249314/",
        "https://doi.org/10.1017/S0007114518002416",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Casein protein" },
    { "@type": "Thing", name: "Exercise recovery" },
    { "@type": "Thing", name: "Pre-sleep nutrition" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  dose: string;
  finding: string;
  verdict: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Does bedtime casein improve acute functional recovery?",
    population: "39 active men and women; 48-hour follow-up",
    dose: "About 40 g before bed",
    finding:
      "Strength, jump height, soreness, pain threshold, and mood recovery did not differ from a carbohydrate control.",
    verdict: "No added recovery benefit in this trial.",
    grade: "C — Early",
    source: "Apweiler et al., 2018",
    pmid: "30597848",
  },
  {
    question: "Does bedtime casein change next-morning metabolism or hunger?",
    population: "10 active women; randomized crossover trial",
    dose: "30 g before bed",
    finding:
      "Resting energy expenditure, fuel use, and subjective hunger did not differ after cottage cheese, liquid casein, or placebo.",
    verdict: "No difference in this small trial.",
    grade: "C — Early",
    source: "Leyh et al., 2018",
    pmid: "30249314",
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

export default function CaseinProteinNightPage() {
  return (
    <>
      <JsonLd id="casein-protein-night-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="casein-protein-night-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Casein protein before bed: what the evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Bedtime casein gets framed as an automatic upgrade for overnight
            muscle repair. The two verified trials here do not establish that
            promise, and one found no added recovery benefit.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>Casein protein before bed is optional, not proven necessary.</b>{" "}
            In one small trial, about 40 grams before bed did not improve
            strength, jumping, soreness, pain threshold, or mood recovery versus
            carbohydrate over 48 hours. A second small trial found no
            next-morning metabolism or hunger advantage.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Neither verified study measured overnight muscle protein synthesis.
            If casein helps you reach a sensible daily protein intake, it can be
            a convenient food choice. These studies do not show that taking it
            at night optimizes structural repair.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does casein protein before bed improve recovery?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Not in the verified recovery trial. Thirty-nine active men and women
            performed muscle-damaging exercise, then took about 40 grams of
            casein or carbohydrate before bed. Strength, jump height, soreness,
            pain threshold, and mood recovery did not differ between groups over
            the following 48 hours.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this was one small trial in active adults, and
            it measured short-term functional recovery after morning exercise.
            It does not answer every question about long-term muscle growth,
            evening training, older adults, or diets that are short on protein.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="casein protein night" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What do the casein-before-bed studies actually show?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Both verified studies are small randomized trials, so each earns a C
            grade. One tested 48-hour recovery in active men and women. The other
            tested next-morning energy expenditure, fuel use, and hunger in ten
            active women. Neither measured overnight muscle protein synthesis or
            long-term muscle gain.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Dose</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Grade</th>
                  <th className="py-3 align-bottom font-normal">Source</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Dose" className="py-3 pr-4 text-mute whitespace-nowrap">{row.dose}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Grade" className="py-3 pr-4 whitespace-nowrap">{row.grade}</td>
                    <td data-label="Source" className="py-3 whitespace-nowrap">
                      <PubMedLink pmid={row.pmid}>{row.source}</PubMedLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grades follow the study-design rules in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            . One randomized trial is early evidence, even when its result is
            clear within that specific experiment.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does casein before bed increase muscle protein synthesis?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These two studies cannot answer that question because neither
            measured overnight muscle protein synthesis. The recovery study
            measured physical function, soreness, pain threshold, and mood. The
            women&apos;s crossover trial measured resting energy expenditure,
            fuel use, and hunger. Those outcomes cannot stand in for direct
            muscle-protein measurements.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> a plausible story about slow digestion and
            amino acids is still a mechanism, not proof that bedtime casein
            improves overnight repair or long-term growth. The supplied evidence
            does not verify that claim, so this page does not make it.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does bedtime casein change metabolism or hunger?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Not in the verified crossover trial. Ten active women consumed
            cottage cheese, liquid casein, or placebo before sleep. Researchers
            found no differences in next-morning resting energy expenditure,
            fuel use, or subjective hunger. Cottage cheese and liquid casein
            also produced similar metabolic responses.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> ten young active women are not a stand-in for
            all adults, and this study did not test muscle recovery or growth.
            It only tells us that the measured metabolism and hunger outcomes
            were similar under these short laboratory conditions.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How much casein should you take before bed?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These studies used about 40 grams for the recovery comparison and 30
            grams for metabolism and hunger. Neither amount proved superior, so
            they should be read as study details rather than a prescription. If
            a bedtime serving helps you meet your daily protein target, choose an
            amount that fits your total intake.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the verified trials do not establish an ideal
            dose, timing window, or long-term muscle-building advantage. Comfort
            and sleep quality matter too; a feeding that disrupts sleep is a poor
            trade, regardless of the protein label.
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
            Build the whole day before optimizing bedtime
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Bedtime casein can be convenient, but these trials do not make it a
            special recovery requirement. For more on how bedtime meals impact body composition, see our breakdown on the <Link href="/science/eating-late-at-night-weight-gain-myth" className="text-cloudText underline hover:text-bone">eating late at night weight gain myth</Link>. Start with enough protein across the
            day, progressive training, calories that match your goal, and sleep
            you can repeat. Then decide whether a late protein serving makes the
            routine easier.
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
            any condition. Talk with a qualified clinician if you have a health
            condition, take medication, or need individual nutrition guidance.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

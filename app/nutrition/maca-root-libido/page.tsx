import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/maca-root-libido";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Maca Root and Libido: What the Evidence Shows | Geebs",
  description:
    "Maca root may support subjective libido in a narrow clinical setting. See the studied dose, evidence grade, and what the research does not prove.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Maca Root and Libido: The Honest Evidence",
    description:
      "One small dose-finding trial suggests a possible libido benefit, but it does not prove a testosterone effect or a benefit in healthy men.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Maca root and libido — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maca Root and Libido: The Honest Evidence",
    description:
      "The studied dose, the narrow pilot result, and the limits that supplement claims often leave out.",
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
      name: "Does maca root help libido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Possibly, but the direct evidence is early. A 12-week dose-finding trial in 20 people with SSRI-related sexual dysfunction found improvement at 3 grams per day on sexual-function scores, while the 1.5-gram group did not. The trial had no placebo group, and only three participants were men.",
      },
    },
    {
      "@type": "Question",
      name: "Does maca root raise testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified trial on this page did not establish that. It measured self-reported sexual function and libido, not a mechanism involving circulating testosterone. A subjective benefit can be worth studying without assuming that maca changes androgen levels.",
      },
    },
    {
      "@type": "Question",
      name: "How much maca root was studied for libido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Researchers compared 1.5 grams with 3 grams per day for 12 weeks. Improvement on the main sexual-function scores appeared in the 3-gram group, not the 1.5-gram group. That is one pilot result, not a settled dose recommendation for healthy adults.",
      },
    },
    {
      "@type": "Question",
      name: "How long does maca root take to affect libido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study ran for 12 weeks and does not support a precise promise about when someone should notice a change. It also cannot tell us whether any effect lasts after stopping, works with repeated long-term use, or applies outside SSRI-related sexual dysfunction.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Maca Root and Libido: What the Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Maca Root and Libido: What the Evidence Shows",
  description:
    "An evidence-graded look at maca root and subjective libido, including the studied dose and the limits of the available human evidence.",
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
      name: "A double-blind, randomized, pilot dose-finding study of maca root (L. meyenii) for the management of SSRI-induced sexual dysfunction",
      author: { "@type": "Person", name: "Dording CM" },
      datePublished: "2008",
      isPartOf: { "@type": "Periodical", name: "CNS Neuroscience & Therapeutics" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "18801111" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1111/j.1755-5949.2008.00052.x",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/18801111/",
        "https://doi.org/10.1111/j.1755-5949.2008.00052.x",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Maca root" },
    { "@type": "Thing", name: "Libido" },
    { "@type": "Thing", name: "Sexual well-being" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  dose: string;
  duration: string;
  finding: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Can maca support subjective libido in SSRI-related dysfunction?",
    population: "20 adults; 17 women and 3 men; 10 completed",
    dose: "1.5 g/day or 3 g/day",
    duration: "12 weeks",
    finding:
      "Sexual-function scores improved in the 3 g group; libido improved overall but not clearly by dose.",
    grade: "C — Early",
    source: "Dording et al., 2008",
    pmid: "18801111",
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

export default function MacaRootLibidoPage() {
  return (
    <>
      <JsonLd id="maca-root-libido-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="maca-root-libido-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Maca root and libido: what the evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Maca often gets described as a hormone booster. The verified human
            evidence here is narrower: a small pilot trial measured subjective
            sexual function in people taking antidepressants, not a testosterone
            response in healthy men.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>
              Maca root may support subjective libido in some people with
              SSRI-related sexual dysfunction, but the evidence is early and
              highly specific.
            </b>{" "}
            The verified trial does not show that maca raises testosterone or
            that it improves libido in healthy adult men.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That distinction matters. A person can report better sexual
            well-being without proving a hormone mechanism. The honest position
            is to keep the subjective result and drop the bigger androgen claim
            until direct human evidence supports it.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="maca root libido" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the research say about maca root and libido?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            One 12-week randomized dose-finding trial assigned 20 adults with
            SSRI-related sexual dysfunction to 1.5 or 3 grams of maca daily. The
            higher-dose group improved on sexual-function scores, while the
            lower-dose group did not. Libido improved overall, but not clearly
            according to dose.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Dose</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Duration</th>
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
                    <td data-label="Dose" className="py-3 pr-4 text-mute">{row.dose}</td>
                    <td data-label="Duration" className="py-3 pr-4 text-mute">{row.duration}</td>
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
            . One randomized trial is early evidence, especially when the sample
            is small and there is no placebo group.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does maca root raise testosterone to improve libido?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            This trial does not establish that mechanism. It measured
            self-reported sexual function and libido, not a change in circulating
            testosterone. The result is therefore compatible with a subjective
            benefit that does not depend on higher androgen levels, but it cannot
            prove why any change happened.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this source cannot support a testosterone claim
            in either direction. It also cannot tell us whether mood, expectancy,
            medication effects, or another pathway explains the reported change.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What maca root dose was studied for libido?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Researchers compared 1.5 grams with 3 grams per day for 12 weeks.
            Improvement on the main sexual-function scores appeared in the
            3-gram group, not the 1.5-gram group. That records what happened in
            one pilot trial; it does not establish a standard dose for healthy
            adults.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> only 10 of the 20 enrolled participants
            completed the study, 17 participants were women, and everyone
            received maca. Without a placebo group, the trial cannot show how
            much of the change came from maca itself.
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
            Keep a possible benefit in proportion
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Maca is not a proven hormone strategy. If libido or sexual function
            has changed, medication, sleep, stress, relationship context, and
            health conditions deserve more attention than a supplement-first
            answer. Use this trial as an early signal, not a diagnosis or a
            promise.
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
            any condition. Talk with a qualified clinician before using a
            supplement if you have a health condition or take medication.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

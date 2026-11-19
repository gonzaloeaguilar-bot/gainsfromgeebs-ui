import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/mct-oil-energy";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "MCT Oil for Energy: What the Evidence Shows | Geebs",
  description:
    "MCT oil is rapidly metabolized and can provide substrate for ketone production. See what that means for energy, focus, and the limits of the evidence.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "MCT Oil for Energy: The Honest Evidence",
    description:
      "MCT oil can provide a rapid substrate for ketone production. That mechanism is real; a reliable cognitive boost in healthy adults is not established.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "MCT oil and energy — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCT Oil for Energy: The Honest Evidence",
    description:
      "The ketone mechanism, the cognitive claim, and what one verified review can and cannot tell us.",
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
      name: "Does MCT oil give you energy quickly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MCTs have shorter fatty-acid chains than long-chain fats and follow a faster route to the liver, where they can be oxidized and used to form ketones. That supports the rapid-energy mechanism. The verified source is a narrative review, however, so it does not prove that a spoonful reliably improves how energetic a healthy adult feels.",
      },
    },
    {
      "@type": "Question",
      name: "Does MCT oil improve focus or mental energy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That is not established by the verified evidence used here. The review explains how MCTs are rapidly metabolized and can form ketones, but a plausible fuel pathway is not the same as a demonstrated improvement in focus, memory, or work performance in healthy adults.",
      },
    },
    {
      "@type": "Question",
      name: "How much MCT oil should I take for energy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified review does not establish a cognitive-energy dose, so this page does not invent one. Product serving sizes are not proof of an effective amount. If you choose to try MCT oil, treat it as a food that adds calories and pay attention to tolerance rather than assuming more will work better.",
      },
    },
    {
      "@type": "Question",
      name: "Can MCT oil replace carbs or metabolic flexibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A rapid ketone substrate is one fuel option, not a replacement for the ability to use carbohydrate and fat across work, training, meals, and recovery. MCT oil also cannot make up for poor sleep, inconsistent meals, or an overall intake that does not support your training.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "MCT Oil for Energy: What the Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MCT Oil for Energy: What the Evidence Shows",
  description:
    "An evidence-graded look at MCT oil, rapid ketone production, cognitive-energy claims, and the limits of the available evidence.",
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
      name: "Triglycerides of medium-chain fatty acids: a concise review",
      author: { "@type": "Person", name: "Jadhav HB" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Journal of Food Science and Technology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35761969" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1007/s13197-022-05499-w",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35761969/",
        "https://doi.org/10.1007/s13197-022-05499-w",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Medium-chain triglycerides" },
    { "@type": "Thing", name: "Ketones" },
    { "@type": "Thing", name: "Energy metabolism" },
  ],
};

type EvidenceRow = {
  question: string;
  evidence: string;
  finding: string;
  verdict: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Are MCTs rapidly metabolized and available for ketone formation?",
    evidence: "Narrative review of MCT structure, digestion, and metabolism",
    finding:
      "Their shorter chains and route to the liver support faster oxidation and ketone formation than long-chain fats.",
    verdict: "Mechanism supported; a felt energy benefit was not directly tested.",
    grade: "D — Weak",
    source: "Jadhav et al., 2023",
    pmid: "35761969",
  },
  {
    question: "Does MCT oil reliably improve focus in healthy adults?",
    evidence: "No direct cognitive trial in the verified source",
    finding:
      "The fuel pathway is described, but focus, memory, and work performance were not established.",
    verdict: "Not established.",
    grade: "Insufficient",
    source: "Jadhav et al., 2023",
    pmid: "35761969",
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

export default function MctOilEnergyPage() {
  return (
    <>
      <JsonLd id="mct-oil-energy-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="mct-oil-energy-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            MCT oil for energy: what the evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            MCT oil gets marketed as instant brain fuel. The faster route to
            ketone production is real, but the leap from that mechanism to
            better focus or all-day energy in healthy adults is not established.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>MCT oil can provide a rapid substrate for ketone production.</b>{" "}
            That gives the body another fuel source, but the verified evidence
            does not show a reliable cognitive-energy boost in healthy adults.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Use it, if at all, as a small nutrition tool—not as a replacement for
            sleep, regular meals, training, or the ability to use both
            carbohydrate and fat. The mechanism is plausible; the performance
            promise is ahead of the evidence.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="mct oil energy" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about MCT oil energy?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The evidence used here supports the metabolism story, not a proven
            productivity result. A narrative review explains that MCTs take a
            faster route to the liver and can form ketones. Because it is not a
            controlled cognitive trial, that mechanism earns a D grade and the
            focus claim remains unestablished.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence</th>
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
                    <td data-label="Evidence" className="py-3 pr-4 text-mute">{row.evidence}</td>
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
            . Mechanistic evidence without a direct human performance trial is
            weak evidence for a performance outcome.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How does MCT oil turn into ketone energy?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            MCTs contain shorter fatty-acid chains than long-chain dietary fats.
            After digestion, those fatty acids travel through the portal vein to
            the liver, where they can be oxidized and used to form ketones. That
            route explains why MCT oil is considered a faster fuel substrate,
            not why everyone will feel a mental lift.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the verified source is a narrative review, not a
            randomized trial measuring energy or cognition in healthy adults. It
            supports the pathway, but it cannot tell us how large, noticeable,
            or repeatable an effect will be.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does MCT oil improve focus or mental energy?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified evidence does not establish a focus benefit in healthy
            adults. It explains rapid metabolism and ketone formation, but it
            does not demonstrate better memory, attention, or work output. A
            different fuel reaching the bloodstream is a mechanism; improved
            cognitive performance is a separate claim that needs direct trials.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> feeling more alert after changing breakfast can
            also reflect meal size, caffeine, sleep, expectations, or normal
            day-to-day variation. This source cannot separate those effects.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Can MCT oil replace metabolic flexibility?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No. MCT oil offers one fast route to a fuel substrate; metabolic
            flexibility means handling different fuels across meals, training,
            work, and recovery. A supplement cannot replace consistent sleep,
            adequate food, or training. If those foundations are unstable,
            adding MCT oil does not solve the larger energy problem.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Think of MCT oil as optional, not foundational. It adds dietary fat
            and calories, and the verified source does not establish that it
            improves long-term fuel flexibility in healthy adults.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How much MCT oil should you use for energy?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified review does not establish an effective dose for focus
            or mental energy, so there is no evidence-based number to give here.
            A label serving is a manufacturer instruction, not proof of a
            cognitive benefit. More oil also means more calories, without a
            guarantee of better performance.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this page does not turn a metabolism review into
            dosing advice. If you use MCT oil, individual tolerance and the rest
            of your diet matter more than chasing a stronger ketone response.
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
            Build reliable energy before adding a shortcut
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            MCT oil has a credible rapid-fuel mechanism, but it belongs behind
            sleep, consistent meals, and a training plan you can recover from.
            Those habits build reliable energy across the week. A spoonful of oil
            cannot do that job for you.
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
            supplement if you have a health condition, take medication, or have
            concerns about how it fits your diet.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

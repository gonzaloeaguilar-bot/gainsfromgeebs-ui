import TitanProductInline from "@/components/TitanProductInline";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import { productContextForPath } from "@/lib/productContext";
import type { Metadata } from "next";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/l-theanine-focus";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "L-Theanine, Caffeine, and Focus: What the Evidence Shows | Geebs",
  description:
    "L-theanine with caffeine may sharpen attention for a demanding task. See the studied dose, evidence grade, and what the research does not prove.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "L-Theanine With Caffeine for Focus: The Honest Evidence",
    description:
      "One small trial found a short-term attention benefit. Here is the dose, the result, and the limit most supplement claims leave out.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "L-theanine and caffeine for focus — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L-Theanine With Caffeine for Focus: The Honest Evidence",
    description:
      "The studied dose, the short-term attention result, and what has not been proven.",
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
      name: "Does L-theanine with caffeine improve focus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may help with a demanding attention task. In one placebo-controlled trial of 44 young adults, 97 mg of L-theanine with 40 mg of caffeine improved task-switching accuracy and self-reported alertness. It did not improve every test, and one small acute trial is early evidence rather than a settled result.",
      },
    },
    {
      "@type": "Question",
      name: "What L-theanine-to-caffeine ratio was studied?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The trial used 97 mg of L-theanine with 40 mg of caffeine, or roughly a 2.4-to-1 ratio. That tells us what researchers tested once; it does not establish a perfect ratio for every person, product, or workday.",
      },
    },
    {
      "@type": "Question",
      name: "Does L-theanine remove caffeine jitters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified sources do not establish that claim. The small trial measured blood pressure and heart rate, but its PubMed abstract does not report a clear anti-jitter result. A broader sports-nutrition position stand says the added value of ingredients beyond caffeine still needs better study.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the focus effect last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The trial checked participants 20 and 70 minutes after the dose. That is useful for a short work block, but it does not prove steady focus across an afternoon, repeated daily use, or a lasting change in cognitive performance.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "L-Theanine With Caffeine for Focus: What the Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "L-Theanine With Caffeine for Focus: What the Evidence Shows",
  description:
    "An evidence-graded look at L-theanine with caffeine for focus, including the studied dose and the limits of the available human evidence.",
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
      name: "The combination of L-theanine and caffeine improves cognitive performance and increases subjective alertness",
      author: { "@type": "Person", name: "Giesbrecht T" },
      datePublished: "2010",
      isPartOf: { "@type": "Periodical", name: "Nutritional Neuroscience" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21040626" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1179/147683010X12611460764840",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/21040626/",
        "https://doi.org/10.1179/147683010X12611460764840",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "International society of sports nutrition position stand: energy drinks and energy shots",
      author: { "@type": "Person", name: "Jagim AR" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36862943" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1080/15502783.2023.2171314",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/36862943/",
        "https://doi.org/10.1080/15502783.2023.2171314",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "L-theanine" },
    { "@type": "Thing", name: "Caffeine" },
    { "@type": "Thing", name: "Attention" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  dose: string;
  finding: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Can the pair help with an acute attention task?",
    population: "44 young adults",
    dose: "97 mg L-theanine + 40 mg caffeine; checked at 20 and 70 minutes",
    finding:
      "Better task-switching accuracy and alertness, but no improvement on several other cognitive tests.",
    grade: "C — Early",
    source: "Giesbrecht et al., 2010",
    pmid: "21040626",
  },
  {
    question: "Is the L-theanine add-on proven across energy drinks?",
    population: "Broad energy-drink literature",
    dose: "Products and caffeine doses varied",
    finding:
      "Caffeine has established benefits; the added value of other ingredients remains uncertain.",
    grade: "Insufficient — not established",
    source: "Jagim et al., 2023",
    pmid: "36862943",
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

export default async function LTheanineFocusPage() {
  return (
    <>
      <JsonLd id="l-theanine-focus-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="l-theanine-focus-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            L-theanine with caffeine for focus: what the evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            The combination gets sold as calm, sustained focus. The human evidence
            is narrower: one small trial found a short-term benefit on a demanding
            attention task, but it did not prove an all-day effect or a calmer
            nervous-system response.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>L-theanine paired with caffeine may sharpen focus for a short,
            demanding task.</b> In one placebo-controlled trial of 44 young adults,
            97 mg of L-theanine with 40 mg of caffeine improved task-switching
            accuracy and self-reported alertness.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That is useful, but it is not proof of steady performance across a
            workday. The study also found no improvement in visual search, choice
            reaction time, or mental rotation, so the honest takeaway is
            task-specific and early—not a blanket cognitive upgrade.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="l theanine focus" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about L-theanine and caffeine for focus?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The direct evidence is one small acute trial, which earns a C rather
            than a confident recommendation. A broader position stand supports
            caffeine as the main performance ingredient in energy drinks, while
            saying the added benefit of ingredients such as L-theanine still needs
            to be determined.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Dose</th>
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
            . One trial is early evidence; a broad claim without direct trials
            stays insufficient.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What L-theanine and caffeine dose was actually studied?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Researchers used 97 mg of L-theanine with 40 mg of caffeine, then
            tested participants 20 and 70 minutes later. That roughly 2.4-to-1
            ratio is a record of one experiment, not a universal formula or a
            reason to keep increasing either ingredient.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the participants were 44 young adults, the study
            was acute, and it did not compare multiple ratios. It cannot tell us
            the best dose for a 40-year-old professional, repeated daily use, or
            someone who is sensitive to caffeine.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does L-theanine make caffeine feel steady without jitters?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified sources do not establish that promise. The small trial
            measured blood pressure and heart rate, but its PubMed abstract does
            not report a clear result showing reduced physical arousal. The 2023
            position stand likewise says benefits added by non-caffeine
            ingredients remain uncertain.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> a subjective report that a combination feels
            smoother is not the same as evidence that it changes sympathetic
            activity. If caffeine disrupts your sleep or makes you uncomfortable,
            adding another ingredient does not erase that signal.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How long can L-theanine with caffeine sustain focus?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The trial gives us a 70-minute window, not an all-day answer.
            Participants were assessed 20 and 70 minutes after taking the pair,
            so the evidence fits a short work block. It does not show that focus
            stays elevated for hours or improves with repeated use.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For sustainable performance, sleep remains the bigger lever. If a
            late caffeine dose costs you sleep, the short-term alertness trade is
            usually poor; see{" "}
            <Link
              href="/blog/sleep-and-fat-loss-for-busy-professionals"
              className="underline hover:text-bone"
            >
              the practical sleep guide for busy professionals
            </Link>
            .
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
            Use the smallest lever that gets the job done
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you already tolerate a modest caffeine dose, the studied pairing
            may be worth a careful test for one demanding work block. Keep the
            result in perspective: it cannot replace sleep, a clear plan, or the
            consistent habits that make both work and training easier to execute.
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
            supplement if you have a health condition, take medication, or react
            strongly to caffeine.
          </p>
        </footer>
        <TitanProductInline
          context={productContextForPath("/nutrition/l-theanine-focus")}
          source="geebs_nutrition_l_theanine_focus"
          className="mt-14"
        />
      </ArticleShell>
    </>
  );
}

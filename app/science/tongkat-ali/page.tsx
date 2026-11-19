import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import TitanForgeShopNote from "@/components/TitanForgeShopNote";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/tongkat-ali";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-10-08";

export const metadata: Metadata = {
  title: "Tongkat Ali Dosage: 200 mg a Day Is What the Trials Used",
  description:
    "Tongkat ali dosage from the human trials: 200 mg a day of a standardized extract in most of them, 100 to 600 mg overall, for 2 weeks to 6 months. PubMed IDs for each.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Tongkat Ali Dosage: 200 mg a Day Is What the Trials Used",
    description:
      "Tongkat ali has one legitimate trial behind it, but evidence is still early. Read what the research actually found, who was studied, and the dosage used.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Tongkat Ali and Testosterone — what research actually found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tongkat Ali Dosage: 200 mg a Day Is What the Trials Used",
    description:
      "Tongkat ali dosage from the human trials: 200 mg a day of a standardized extract in most of them, 100 to 600 mg overall. PubMed IDs for each.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  population: string;
  dose: string;
  duration: string;
  effect: string;
  grade: string;
  pmid?: string;
  doi?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    population: "Men ~47yo, diagnosed androgen deficiency (45 men, 4 arms)",
    dose: "200mg/day standardized extract",
    duration: "6 months",
    effect: "Erectile-function scores improved, most when paired with training 3x a week",
    grade: "B",
    pmid: "33541567",
    doi: "10.1016/j.maturitas.2020.12.002",
  },
  {
    population: "Men 50-70, testosterone under 300 ng/dL (105 men)",
    dose: "100mg or 200mg/day standardized water extract",
    duration: "12 weeks",
    effect: "Total T rose vs. placebo at week 12 on 100mg, and from week 4 on 200mg",
    grade: "B",
    pmid: "34262417",
  },
  {
    population: "Men with late-onset hypogonadism (76 men, no placebo)",
    dose: "200mg/day standardized water extract",
    duration: "1 month",
    effect: "Share with normal testosterone went from 35.5% to 90.8%",
    grade: "C",
    pmid: "21671978",
  },
  {
    population: "Active seniors 57-72 (13 men, 12 women, no placebo)",
    dose: "400mg/day extract",
    duration: "5 weeks",
    effect: "Total and free T and grip strength rose",
    grade: "C",
    pmid: "23754792",
  },
  {
    population: "Healthy young men ~24yo (32 men)",
    dose: "600mg/day",
    duration: "2 weeks",
    effect: "Total and free T rose vs. placebo; LH and FSH did not change",
    grade: "C",
    pmid: "33559971",
  },
];

const faqs = [
  {
    question: "Does tongkat ali actually raise testosterone?",
    answer:
      "In men who start low, the pooled evidence says yes: a 2022 meta-analysis of five randomized trials found a significant rise in total testosterone, confirmed in the hypogonadism subgroup (PMID 36013514). Evidence in men with normal levels is thin.",
  },
  {
    question: "What is the right tongkat ali dosage?",
    answer:
      "The trials used 100 to 600 mg a day, and 200 mg a day of a standardized water extract is the most studied dose, including the 12-week trial in men 50 to 70 (PMID 34262417) and the 6-month trial (PMID 33541567). No trial set a ceiling or compared timing. Product standardization varies widely between brands.",
  },
  {
    question: "Should a healthy man with normal testosterone take it?",
    answer:
      "The evidence doesn't directly support that use case — the trial studied men with diagnosed deficiency.",
  },
  {
    question: "Is this the same as a \"testosterone booster\" supplement?",
    answer:
      "Not exactly — most mass-market \"boosters\" have no dedicated trial at all. Tongkat ali has one legitimate trial behind it, which is unusual for this category, but \"one trial\" is still early-stage evidence.",
  },
  {
    question: "Is it safe?",
    answer:
      "This run did not source a dedicated long-term safety trial — check with a doctor before starting, especially alongside any medication.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tongkat Ali Dosage: 200 mg a Day Is What the Trials Used",
  description:
    "An evidence-graded read on Tongkat Ali (Eurycoma longifolia) research, 200mg dosage data, aging male trial results, and podcast supplement claims.",
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
      url: `${SITE_URL}/social-preview-coaching.jpg`,
    },
  ],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "A 6-month, double-blind, placebo-controlled, randomized trial to evaluate the effect of Eurycoma longifolia (Tongkat Ali) and concurrent training on erectile function and testosterone levels in androgen deficiency of aging males (ADAM).",
      author: { "@type": "Person", name: "Leitão AE" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Maturitas" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33541567" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1016/j.maturitas.2020.12.002" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33541567/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of Eurycoma longifolia standardised aqueous root extract-Physta on testosterone levels and quality of life in ageing male subjects.",
      author: { "@type": "Person", name: "Chinnappan SM" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Food Nutr Res" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "34262417" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/34262417/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Standardised water-soluble extract of Eurycoma longifolia, Tongkat ali, as testosterone booster for managing men with late-onset hypogonadism?",
      author: { "@type": "Person", name: "Tambi MI" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "Andrologia" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "21671978" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/21671978/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Tongkat Ali as a potential herbal supplement for physically active male and female seniors: a pilot study.",
      author: { "@type": "Person", name: "Henkel RR" },
      datePublished: "2014",
      isPartOf: { "@type": "Periodical", name: "Phytother Res" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "23754792" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23754792/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The effect of Eurycoma Longifolia on the regulation of reproductive hormones in young males.",
      author: { "@type": "Person", name: "Chan KQ" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Andrologia" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "33559971" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33559971/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Eurycoma longifolia (Jack) Improves Serum Total Testosterone in Men: A Systematic Review and Meta-Analysis of Clinical Trials.",
      author: { "@type": "Person", name: "Leisegang K" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Medicina (Kaunas)" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "36013514" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/36013514/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Tongkat Ali" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Nutrition" },
  ],
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
      name: "Tongkat Ali",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function TongkatAliSciencePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="article-schema" data={articleSchema} />
      <JsonLd id="faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[850px] px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
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
            <li className="text-cloudText">Tongkat Ali</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Compound Entity Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Tongkat Ali and Testosterone: What One Real Trial Actually Found
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer Block */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            The tongkat ali dosage used in human trials is 200 mg a day of a standardized root extract, with a studied range of 100 to 600 mg.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The longest trial gave 200 mg a day for 6 months to 45 men around 47 with diagnosed age-related androgen deficiency; erectile-function scores improved, most in the men who also trained three times a week (Leitão et al. 2021, PMID 33541567). A 12-week trial in 105 men aged 50 to 70 with testosterone under 300 ng/dL found a rise on both 100 mg and 200 mg, earlier on 200 mg (Chinnappan et al. 2021, PMID 34262417). A 2022 meta-analysis pooled five randomized trials and found a significant rise in total testosterone, mostly driven by men who were low to begin with (Leisegang et al. 2022, PMID 36013514). What none of this shows: that a man with normal testosterone gains anything, or that more than 200 mg works better.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-actual-research" className="mt-12">
          <h2
            id="h2-actual-research"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What does the actual research show?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The strongest trial evaluating tongkat ali for male hormonal health comes from Leitão et al. 2021 (PMID 33541567). Researchers conducted a 6-month double-blind placebo-controlled study in middle-aged men with diagnosed age-related androgen deficiency. It had four arms: placebo or 200 mg of extract, each with or without training three times a week. Erectile-function scores improved, and the best result came from the extract plus training. It is one trial of 45 men, so it reads as promising, not settled.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            A 6-month, four-arm trial found that 200 mg a day of tongkat ali extract plus training three times a week gave the largest improvement in erectile function in men with age-related androgen deficiency.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-studied-dose" className="mt-12">
          <h2
            id="h2-studied-dose"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What dose was studied?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Five human trials give the working range. 200 mg a day is the dose with the most data: the 6-month placebo trial, the 12-week trial in men 50 to 70, and a 1-month trial in 76 men with late-onset hypogonadism (Tambi et al. 2012, PMID 21671978). 100 mg a day also moved testosterone, but only by week 12. 400 mg a day was used for 5 weeks in active seniors (Henkel et al. 2014, PMID 23754792) and 600 mg a day for 2 weeks in young men (Chan et al. 2021, PMID 33559971); both were small. Every trial used a standardized water extract taken once daily, not raw root powder, so a label that does not state its extract standard is not the product that was tested. One more thing to weigh: the 12-week trial lists the extract maker among its author affiliations.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            200 mg a day of a standardized extract is the most-tested tongkat ali dose: it was used for 1 month, 12 weeks and 6 months in three separate trials.
          </blockquote>

          {/* Dosage Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Population studied</th>
                  <th className="p-3 font-semibold md:p-4">Dose</th>
                  <th className="p-3 font-semibold md:p-4">Duration</th>
                  <th className="p-3 font-semibold md:p-4">Result</th>
                  <th className="p-3 font-semibold md:p-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.population} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.population}</td>
                    <td className="p-3 md:p-4">{row.dose}</td>
                    <td className="p-3 md:p-4">{row.duration}</td>
                    <td className="p-3 md:p-4">
                      {row.effect}
                      {row.pmid && (
                        <span className="mt-1 block text-[12px] text-mute">
                          PMID:{" "}
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-bone"
                          >
                            {row.pmid}
                          </a>
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-normal-testosterone" className="mt-12">
          <h2
            id="h2-normal-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does it work for men with normal testosterone, not just deficiency?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The strongest trial specifically examined men with clinically diagnosed age-related androgen deficiency rather than young, healthy men with normal baseline testosterone. Extrapolating these positive outcomes to men with healthy endocrine function is currently unsupported by direct clinical evidence, representing a clear boundary of the research.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Clinical trial data for tongkat ali applies specifically to men with diagnosed age-related deficiency; benefits cannot be assumed for healthy men with normal baseline testosterone levels.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-podcast-attention" className="mt-12">
          <h2
            id="h2-podcast-attention"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Why is everyone talking about it right now?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Tongkat ali experienced a surge in popularity due to frequent coverage across health and optimization podcasts. While media attention often inflates supplement expectations, tongkat ali differs from typical internet trends because it is supported by a legitimate 6-month randomized controlled trial rather than purely speculative claims.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Podcast popularity has amplified interest in tongkat ali, but unlike most viral supplements, it possesses a published, placebo-controlled 6-month clinical trial in androgen-deficient men.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            While tongkat ali has a well-designed single clinical trial, the research does NOT show that healthy men with normal testosterone levels will experience hormonal gains. Furthermore, long-term multi-year safety data and broad multi-center replications are still lacking. This page is educational only and does not constitute medical advice.
          </p>
        </section>

        <TitanForgeShopNote
          ingredient="tongkat ali"
          pageSlug="/science/tongkat-ali"
          note="No. The Titan Forge shop has no tongkat ali product, and we would not put one next to a hormone study anyway: a page about what a study found should not double as a page that sells you the thing. What the catalog does carry is the basics: protein and creatine."
        />

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.04] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">
                  {faq.question}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Citations Module */}
        <section aria-labelledby="sources-heading" className="mt-14">
          <h2
            id="sources-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Verified PubMed &amp; DOI Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Leitão AE, Vieira MCS, Pelegrini A, da Silva EL, Guimarães ACA. (2021)
              </p>
              <p className="text-[13px] text-mute">
                A 6-month, double-blind, placebo-controlled, randomized trial to evaluate the effect of Eurycoma longifolia (Tongkat Ali) and concurrent training on erectile function and testosterone levels in androgen deficiency of aging males (ADAM). <em>Maturitas</em> 145: 78-85.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/33541567/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 33541567
                </a>
                <a
                  href="https://doi.org/10.1016/j.maturitas.2020.12.002"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1016/j.maturitas.2020.12.002
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Chinnappan SM et al. (2021)</p>
              <p className="text-[13px] text-mute">
                Effect of Eurycoma longifolia standardised aqueous root extract-Physta on testosterone levels and quality of life in ageing male subjects. <em>Food Nutr Res</em>.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/34262417/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 34262417
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Tambi MI et al. (2012)</p>
              <p className="text-[13px] text-mute">
                Standardised water-soluble extract of Eurycoma longifolia, Tongkat ali, as testosterone booster for managing men with late-onset hypogonadism? <em>Andrologia</em>.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/21671978/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 21671978
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Henkel RR et al. (2014)</p>
              <p className="text-[13px] text-mute">
                Tongkat Ali as a potential herbal supplement for physically active male and female seniors: a pilot study. <em>Phytother Res</em>.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/23754792/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 23754792
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Chan KQ et al. (2021)</p>
              <p className="text-[13px] text-mute">
                The effect of Eurycoma Longifolia on the regulation of reproductive hormones in young males. <em>Andrologia</em>.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/33559971/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 33559971
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Leisegang K et al. (2022)</p>
              <p className="text-[13px] text-mute">
                Eurycoma longifolia (Jack) Improves Serum Total Testosterone in Men: A Systematic Review and Meta-Analysis of Clinical Trials. <em>Medicina (Kaunas)</em>.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/36013514/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 36013514
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Linking Footer */}
        <section aria-labelledby="internal-links-heading" className="mt-14">
          <h2
            id="internal-links-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Related Nutrition &amp; Hormonal Science
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Testosterone Nutrition Hub</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based nutrition and lifestyle levers for male hormone optimization.
              </p>
            </Link>
            <Link
              href="/science/boron"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Boron &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence breakdown on boron supplementation, SHBG mechanisms, and trial outcomes.
              </p>
            </Link>
            <Link
              href="/nutrition/ashwagandha-vs-tongkat-ali"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Ashwagandha vs Tongkat Ali</p>
              <p className="mt-1 text-[13px] text-mute">
                Head-to-head comparison of trial populations, evidence grades, and cortisol mechanisms.
              </p>
            </Link>
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Deficiency restoration, dosage bounds, and clinical evidence breakdown.
              </p>
            </Link>
          </div>
        </section>

        {/* Footer Medical Disclaimer */}
        <footer className="mt-14 border-t border-cloudText/20 pt-6 text-[13px] leading-[1.6] text-mute">
          <p>
            This content is produced by Kris Oddo (NASM-CPT) for informational and educational purposes only. It is not intended to provide medical advice or to substitute for medical diagnosis or treatment. Consult a licensed physician before starting any new dietary supplement or altering your healthcare routine.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

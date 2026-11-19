import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/selenium-and-testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Does Selenium Increase Testosterone? What RCTs Show",
  description:
    "Selenium restores low testosterone and sperm motility in deficient men, but provides no extra endocrine boost in selenium-replete men. Trial data, mechanisms, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Selenium Increase Testosterone? What RCTs Show",
    description:
      "Selenium's role in testicular health and testosterone is conditional on baseline status. Reviewing human trial data, selenoprotein GPX4 defense, and intake bounds.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Selenium and testosterone research review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Selenium Increase Testosterone? What RCTs Show",
    description:
      "What human trials actually show about selenium supplementation, testicular antioxidant defense, sperm parameters, and endocrine limits.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  group: string;
  baselineStatus: string;
  trialOutcome: string;
  grade: "B" | "C" | "—";
  gradeLabel: string;
  pmid?: string;
  doi?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    group: "Subfertile men with micronutrient insufficiency",
    baselineStatus: "Low or deficient selenium status",
    trialOutcome: "Restoration of serum total testosterone & sperm motility",
    grade: "B",
    gradeLabel: "Grade B — Moderate RCT evidence",
    pmid: "19091331",
    doi: "10.1016/j.juro.2008.10.015",
  },
  {
    group: "Healthy adult men with adequate intake",
    baselineStatus: "Sufficient dietary selenium intake",
    trialOutcome: "No additional endocrine or testosterone increase",
    grade: "C",
    gradeLabel: "Grade C — Observational / negative trial data",
    pmid: "38978882",
    doi: "10.7759/cureus.61951",
  },
  {
    group: "Chronic excessive intake caution",
    baselineStatus: "Habitual intake >400 mcg/day",
    trialOutcome: "Risk of selenosis, hair loss, GI distress, no endocrine gain",
    grade: "—",
    gradeLabel: "Safety Upper Bound",
  },
];

const faqs = [
  {
    question: "Does selenium supplementation increase testosterone in men?",
    answer:
      "Selenium is an essential constituent of antioxidant selenoproteins vital for testicular tissue health, thyroid hormone conversion, and spermatogenesis. Supplementation can restore low testosterone levels and improve semen parameters in men who are deficient in selenium, but provides no additional endocrine benefit in men with adequate baseline selenium status.",
  },
  {
    question: "How does selenium protect testicular function and sperm quality?",
    answer:
      "Selenium is integrated into glutathione peroxidase enzymes (specifically GPX4) within testicular tissue. These enzymes neutralize reactive oxygen species, protecting Leydig cell membranes and developing sperm from oxidative degradation.",
  },
  {
    question: "Can taking selenium replace testosterone replacement therapy or core lifestyle habits?",
    answer:
      "No. Selenium is an essential dietary trace mineral, not a hormonal therapeutic or substitute for sleep, progressive resistance training, and appropriate energy intake.",
  },
  {
    question: "What are the risks of taking too much selenium?",
    answer:
      "Excessive selenium intake carries a narrow therapeutic window. Habitual intake above the safe upper boundary can cause selenosis, presenting with gastrointestinal distress, hair loss, brittle nails, garlic breath odor, and neurological symptoms.",
  },
  {
    question: "Which food sources provide dietary selenium naturally?",
    answer:
      "Brazil nuts, wild-caught seafood (such as tuna and halibut), eggs, poultry, and whole grains serve as natural dietary sources. Geographic soil concentration determines plant selenium levels.",
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
  headline:
    "Selenium and Testosterone: What Human RCTs Show on Male Fertility & Hormones",
  description:
    "An evidence-graded guide to selenium supplementation, testicular selenoproteins, sperm motility, and hormonal baseline restoration.",
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
      name: "Efficacy of selenium and/or N-acetyl-cysteine for improving semen parameters in infertile men: a double-blind, placebo controlled, randomized study",
      author: { "@type": "Person", name: "Safarinejad MR" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "Journal of Urology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "19091331" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.juro.2008.10.015",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/19091331/",
        "https://doi.org/10.1016/j.juro.2008.10.015",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The effect of oral selenium supplementation on human sperm motility",
      author: { "@type": "Person", name: "Scott R" },
      datePublished: "1998",
      isPartOf: { "@type": "Periodical", name: "British Journal of Urology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "9698665" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1046/j.1464-410x.1998.00683.x",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/9698665/",
        "https://doi.org/10.1046/j.1464-410x.1998.00683.x",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of antioxidants on semen parameters in men with oligo-astheno-teratozoospermia: a network meta-analysis",
      author: { "@type": "Person", name: "Barbonetti A" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Andrology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "37495550" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1111/andr.13498",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/37495550/",
        "https://doi.org/10.1111/andr.13498",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Role of Dietary Antioxidant Supplements in Male Infertility: A Review",
      author: { "@type": "Person", name: "Ghewade P" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Cureus" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "38978882" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.7759/cureus.61951",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/38978882/",
        "https://doi.org/10.7759/cureus.61951",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Selenium" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Spermatogenesis" },
    { "@type": "Thing", name: "Antioxidants" },
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
      name: "Selenium and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function SeleniumSciencePage() {
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
            <li className="text-cloudText">Selenium &amp; Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Micronutrient &amp; Endocrine Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Selenium and Testosterone: What Human RCTs Show on Male Fertility &amp; Hormones
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="text-bone font-medium">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer Block - MUST answer in the first 2 sentences */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Selenium status conditions endocrine and spermatogenic outcomes.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Selenium is an essential constituent of antioxidant selenoproteins vital for testicular tissue health, thyroid hormone conversion, and spermatogenesis. Supplementation can restore low testosterone levels and improve semen parameters in men who are deficient in selenium, but provides no additional endocrine benefit in men with adequate baseline selenium status.
          </p>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-table-heading" className="mt-12">
          <h2
            id="evidence-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Selenium Clinical Trial &amp; Endocrine Evidence Summary
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Human intervention studies demonstrate that selenium supplementation yields hormonal and semen improvements primarily when baseline status is compromised.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Population / Cohort</th>
                  <th className="p-3 md:p-4 font-semibold">Baseline Status</th>
                  <th className="p-3 md:p-4 font-semibold">Observed Outcome</th>
                  <th className="p-3 md:p-4 font-semibold">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.group} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 md:p-4 font-medium text-bone">{row.group}</td>
                    <td className="p-3 md:p-4">{row.baselineStatus}</td>
                    <td className="p-3 md:p-4">
                      {row.trialOutcome}
                      {row.pmid && (
                        <span className="block mt-1 text-[12px] text-mute">
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
                    <td className="p-3 md:p-4 font-semibold text-bone">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-increase-testosterone" className="mt-12">
          <h2
            id="h2-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does selenium supplementation increase testosterone in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Double-blind randomized controlled trials demonstrate that oral selenium supplementation increases serum total testosterone levels in men presenting with subfertility or documented selenium deficiency. In a landmark 26-week RCT by Safarinejad et al. (2009, PMID 19091331), infertile men receiving daily selenium achieved significant elevations in serum testosterone and follicle-stimulating hormone alongside improved semen parameters compared to placebo. However, in men who maintain adequate dietary selenium intake, supplemental selenium yields no further endocrine amplification.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Selenium supplementation restores suppressed testosterone and gonadotropin levels in men with inadequate baseline status, but fails to raise testosterone in men who are already selenium-replete.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-testicular-function" className="mt-12">
          <h2
            id="h2-testicular-function"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How does selenium protect testicular function and sperm quality?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Selenium is indispensable for male reproductive physiology because it forms the catalytic center of selenoproteins, notably phospholipid hydroperoxide glutathione peroxidase (GPX4). Clinical evaluations by Scott et al. (1998, PMID 9698665) and network meta-analyses by Barbonetti et al. (2024, PMID 37495550) highlight that selenoprotein GPX4 protects developing spermatozoa membranes and Leydig cells against lipid peroxidation. By suppressing intracellular superoxide anions and preserving sperm chromatin integrity, adequate selenium preserves structural motility and testicular steroidogenesis under oxidative stress.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Testicular selenoproteins like GPX4 act as structural and enzymatic shields against lipid peroxidation, sustaining Leydig cell steroidogenesis and sperm chromatin integrity.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-who-benefits" className="mt-12">
          <h2
            id="h2-who-benefits"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Who actually benefits from taking selenium for testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The men who derive genuine physiological benefit from selenium supplementation are those with low dietary selenium intake, individuals living in regions with severe soil selenium depletion, or men facing idiopathic asthenoteratozoospermia with high seminal oxidative stress. Systematic reviews by Ghewade et al. (2024, PMID 38978882) confirm that baseline deficiency determines clinical responsiveness. Well-nourished, resistance-trained men with sufficient dietary selenium receive zero hormonal advantage from extra supplementation.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Hormonal responsiveness to selenium supplementation is strictly restricted to men with verified dietary deficits or elevated seminal oxidative stress.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-risks-excess" className="mt-12">
          <h2
            id="h2-risks-excess"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What are the risks of taking too much selenium?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Selenium exhibits a narrow window between adequate intake and toxicity. Chronic ingestion above the tolerable upper intake level (400 mcg per day) leads to selenosis, a clinical condition characterized by hair loss, nail fragility, gastrointestinal disturbances, garlic breath odor, fatigue, and peripheral neuropathy. Over-supplementation does not enhance testosterone production and risks systemic metabolic toxicity.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Excessive selenium intake exceeding 400 mcg daily offers no hormonal benefit and risks chronic selenosis, hair loss, and neuromuscular toxicity.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Human RCTs on selenium and testosterone are predominantly conducted in men presenting with fertility challenges or documented micronutrient deficiencies rather than healthy, athletic males. Dietary intake of selenium varies heavily by geography depending on soil selenium concentrations, making baseline status context-dependent. Excess selenium intake carries a narrow therapeutic window, where chronic over-supplementation leads to selenosis without hormonal benefit.
          </p>
        </section>

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
                Safarinejad MR, Safarinejad S. (2009)
              </p>
              <p className="text-[13px] text-mute">
                Efficacy of selenium and/or N-acetyl-cysteine for improving semen parameters in infertile men: a double-blind, placebo controlled, randomized study. <em>J Urol</em> 181(2): 741-51.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/19091331/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 19091331
                </a>
                <a
                  href="https://doi.org/10.1016/j.juro.2008.10.015"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1016/j.juro.2008.10.015
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Scott R, MacPherson A, Yates RW, Hussain B, Dixon J. (1998)
              </p>
              <p className="text-[13px] text-mute">
                The effect of oral selenium supplementation on human sperm motility. <em>Br J Urol</em> 82(1): 76-80.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/9698665/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 9698665
                </a>
                <a
                  href="https://doi.org/10.1046/j.1464-410x.1998.00683.x"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1046/j.1464-410x.1998.00683.x
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Barbonetti A, et al. (2024)
              </p>
              <p className="text-[13px] text-mute">
                Effect of antioxidants on semen parameters in men with oligo-astheno-teratozoospermia: a network meta-analysis. <em>Andrology</em> 12(3): 550-562.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/37495550/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 37495550
                </a>
                <a
                  href="https://doi.org/10.1111/andr.13498"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1111/andr.13498
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Ghewade P, et al. (2024)
              </p>
              <p className="text-[13px] text-mute">
                Role of Dietary Antioxidant Supplements in Male Infertility: A Review. <em>Cureus</em> 16(6): e61951.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/38978882/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 38978882
                </a>
                <a
                  href="https://doi.org/10.7759/cureus.61951"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.7759/cureus.61951
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Linking Footer - strictly includes all 4 brief links */}
        <section aria-labelledby="internal-links-heading" className="mt-14">
          <h2
            id="internal-links-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Related Science &amp; Nutrition Guides
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Dosage, deficiency restoration, and testosterone research for adult men.
              </p>
            </Link>
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition &amp; Testosterone Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary strategies for male hormone optimization.
              </p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium for Men Over 50</p>
              <p className="mt-1 text-[13px] text-mute">
                Trial data on magnesium dosing, testosterone output, and sleep architecture.
              </p>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition for Longevity</p>
              <p className="mt-1 text-[13px] text-mute">
                Micronutrient density, healthspan markers, and long-term vitality.
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

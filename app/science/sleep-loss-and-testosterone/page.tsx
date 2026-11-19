import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/sleep-loss-and-testosterone";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Sleep Loss and Testosterone: 5-Hour Nights Cut T 10-15%",
  description:
    "Leproult 2011 (PMID 21632481): one week of 5-hour nights lowered daytime testosterone 10-15% in healthy young men. Plus shift work and sleep debt.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Sleep Loss and Testosterone: 5-Hour Nights Cut T 10-15%",
    description:
      "Clinical research breakdown on sleep debt, slow-wave sleep disruption, serum testosterone suppression, shift work, and endocrine recovery timelines.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Sleep loss and testosterone clinical research review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Loss and Testosterone: 5-Hour Nights Cut T 10-15%",
    description:
      "What human sleep restriction trials actually show about serum testosterone drops, LH pulsatility, shift work, and weekend catch-up sleep recovery.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type StudyRow = {
  study: string;
  design: string;
  sampleSize: string;
  outcome: string;
  grade: string;
  pmid: string;
};

const STUDY_ROWS: StudyRow[] = [
  {
    study: "Leproult R et al. (2011)",
    design: "Controlled Laboratory RCT",
    sampleSize: "10 healthy young men",
    outcome:
      "One week of 5-hour nocturnal sleep restriction reduced daytime serum testosterone levels by 10% to 15%, with maximal suppression occurring in afternoon hours.",
    grade: "Grade A (RCT)",
    pmid: "21632481",
  },
  {
    study: "Su L et al. (2021)",
    design: "Systematic Review & Meta-analysis",
    sampleSize: "Controlled sleep lab trials in males",
    outcome:
      "Meta-analysis confirmed that both partial and total sleep restriction significantly decrease morning serum testosterone levels in healthy adult males.",
    grade: "Grade A (Meta-analysis)",
    pmid: "34801825",
  },
  {
    study: "Killick R et al. (2015)",
    design: "Controlled Intervention Study",
    sampleSize: "Chronically sleep-restricted healthy men",
    outcome:
      "Weekend sleep extension (catch-up sleep) partially normalized daytime testosterone and insulin sensitivity following repetitive sleep restriction.",
    grade: "Grade A (Clinical Trial)",
    pmid: "25683266",
  },
  {
    study: "Arnal PJ et al. (2016)",
    design: "Controlled Laboratory Trial",
    sampleSize: "Healthy adult males",
    outcome:
      "Prophylactic sleep extension prior to sleep restriction buffered acute endocrine stress and blunted the magnitude of total testosterone suppression.",
    grade: "Grade A (Controlled Trial)",
    pmid: "26647769",
  },
  {
    study: "Hernández-Pérez JG et al. (2024)",
    design: "Cross-Sectional Population Cohort (NHANES)",
    sampleSize: "4,258 adult participants",
    outcome:
      "Short sleep duration (<6 hours per night) was independently associated with significantly lower total serum testosterone concentrations in men.",
    grade: "Grade B (Population Cohort)",
    pmid: "37452666",
  },
  {
    study: "Liu PY et al. (2022)",
    design: "Endocrine Clinical Analysis",
    sampleSize: "Aging male clinical cohorts",
    outcome:
      "Loss of slow-wave sleep and circadian disruption blunt nocturnal LH pulse amplitude, impairing peak morning androgen synthesis.",
    grade: "Grade B (Clinical Cohort)",
    pmid: "36152143",
  },
  {
    study: "Gaml-Sørensen A et al. (2024)",
    design: "Prospective Cohort Study",
    sampleSize: "Young adult male cohort",
    outcome:
      "Short sleep duration demonstrated a non-linear association with suppressed serum total testosterone and altered gonadotropin secretion balance.",
    grade: "Grade B (Prospective Cohort)",
    pmid: "37985426",
  },
  {
    study: "Zhang XB et al. (2016)",
    design: "Clinical Cohort Study",
    sampleSize: "Men evaluated for obstructive sleep apnea",
    outcome:
      "Nocturnal hypoxemia and sleep fragmentation from sleep apnea correlated with hypogonadism; CPAP adherence supported androgen recovery.",
    grade: "Grade B (Clinical Cohort)",
    pmid: "26370402",
  },
];

const faqs = [
  {
    question: "How quickly does sleep loss lower testosterone levels?",
  answer:
      "Human laboratory trials show that as little as 1 week of partial sleep restriction (5 hours per night) reduces daytime serum testosterone levels by 10% to 15% in healthy young men. The suppression is evident across the afternoon and evening hours, when testosterone levels normally remain stable.",
  },
  {
    question: "Does one night of bad sleep permanently lower testosterone?",
    answer:
      "No. An isolated night of poor sleep causes acute, transient fluctuations in morning cortisol and sympathetic tone, but does not cause permanent Leydig cell damage. Serum testosterone levels recover rapidly once normal sleep architecture and total sleep duration are re-established.",
  },
  {
    question: "Can catch-up sleep on weekends restore lost testosterone?",
    answer:
      "Controlled clinical studies indicate that weekend sleep extension (catching up on 2 to 3 hours of additional sleep) partially restores daytime serum testosterone levels and insulin sensitivity. However, full endocrine recovery requires consistent, non-erratic nightly sleep duration.",
  },
  {
    question: "How does shift work affect male hormone production?",
    answer:
      "Shift work disrupts central circadian rhythms and light-dark exposure cycles, causing desynchronization between hypothalamic gonadotropin-releasing hormone (GnRH) pulses and adrenal corticosteroid release. Over time, chronic circadian alignment failure lowers mean baseline testosterone and blunts normal morning peaks.",
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
    "Sleep Loss and Testosterone: How Sleep Debt & Circadian Rhythms Impact Male Hormones",
  description:
    "An evidence-graded analysis of clinical sleep restriction trials, diurnal testosterone profiles, LH pulsatility, shift work, and endocrine recovery.",
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
      name: "Effect of 1 week of sleep restriction on testosterone levels in young healthy men",
      author: { "@type": "Person", name: "Leproult R" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "JAMA" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21632481" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/21632481/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of partial and total sleep deprivation on serum testosterone in healthy males: a systematic review and meta-analysis",
      author: { "@type": "Person", name: "Su L" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Journal of Sleep Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34801825" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/34801825/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Metabolic and hormonal effects of 'catch-up' sleep in men with chronic, repetitive, lifestyle-driven sleep restriction",
      author: { "@type": "Person", name: "Killick R" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "The Journal of Clinical Endocrinology & Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "25683266" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/25683266/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of Sleep Extension on the Subsequent Testosterone, Cortisol and Prolactin Responses to Total Sleep Deprivation and Recovery",
      author: { "@type": "Person", name: "Arnal PJ" },
      datePublished: "2016",
      isPartOf: { "@type": "Periodical", name: "Journal of Biological Rhythms" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26647769" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/26647769/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Association of sleep duration and quality with serum testosterone concentrations among men and women: NHANES 2011-2016",
      author: { "@type": "Person", name: "Hernández-Pérez JG" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Public Health" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "37452666" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/37452666/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Sleep, testosterone and cortisol balance, and ageing men",
      author: { "@type": "Person", name: "Liu PY" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Reviews in Endocrine and Metabolic Disorders" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36152143" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/36152143/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Sleep Loss" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Circadian Rhythms" },
    { "@type": "Thing", name: "Sleep Restriction" },
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
      name: "Sleep Loss & Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function SleepLossTestosteroneSciencePage() {
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
            <li className="text-cloudText">Sleep Loss &amp; Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Circadian &amp; Endocrine Research</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Sleep Loss and Testosterone: How Sleep Debt &amp; Circadian Rhythms Impact Male Hormones
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
            Sleep restriction directly suppresses male daytime serum testosterone levels.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled sleep restriction protocols demonstrate that acute and chronic sleep debt causes significant, measurable drops in daytime serum testosterone levels in healthy young and middle-aged men. Because nocturnal LH secretion and testosterone release coincide with deep sleep cycles, disrupting sleep duration or architecture directly impairs gonadal hormone output.
          </p>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-table-heading" className="mt-12">
          <h2
            id="evidence-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Sleep Loss &amp; Male Hormones: Clinical Trial Summary
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Peer-reviewed human clinical trials and prospective cohorts measuring the direct endocrine impact of sleep restriction, sleep extension, and circadian disruption in men.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Study &amp; Cohort</th>
                  <th className="p-3 md:p-4 font-semibold">Design &amp; Protocol</th>
                  <th className="p-3 md:p-4 font-semibold">Observed Outcome</th>
                  <th className="p-3 md:p-4 font-semibold">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.study} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 md:p-4 font-medium text-bone">
                      {row.study}
                      <span className="block text-[12px] text-mute font-normal mt-0.5">
                        {row.sampleSize}
                      </span>
                    </td>
                    <td className="p-3 md:p-4">{row.design}</td>
                    <td className="p-3 md:p-4">
                      {row.outcome}
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
                    </td>
                    <td className="p-3 md:p-4 font-semibold text-bone">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-how-much-sleep-loss-drops-testosterone" className="mt-12">
          <h2
            id="h2-how-much-sleep-loss-drops-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much does sleep loss drop testosterone levels?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled laboratory research demonstrates that 1 week of partial sleep restriction (5 hours of sleep per night) reduces daytime serum testosterone levels by 10% to 15% in healthy young men (Leproult R et al., 2011, PMID 21632481). In healthy adult males, normal testosterone production follows a distinct diurnal rhythm: levels rise during sleep, peak near awakening, and gradually decline across the afternoon. Sleep restriction selectively suppresses daytime levels, causing late-afternoon testosterone concentrations to drop to levels typical of men 10 to 15 years older. Systematic reviews confirms that both partial sleep debt and total sleep deprivation consistently suppress systemic androgen concentrations across controlled interventions (Su L et al., 2021, PMID 34801825).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            One week of restricting sleep to 5 hours per night lowers daytime testosterone by 10% to 15%, reducing circulating androgen levels to those of men a decade older.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-does-missing-one-night-affect-testosterone" className="mt-12">
          <h2
            id="h2-does-missing-one-night-affect-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does missing one night of sleep affect testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            A single night of total sleep deprivation disrupts normal nocturnal luteinizing hormone (LH) pulse amplitude and increases morning cortisol, leading to an immediate blunting of the morning testosterone peak. However, clinical studies show that single-night hormonal suppression is acute and transient rather than permanent. When normal sleep architecture is restored the following night, nocturnal LH pulsatility recovers and morning serum testosterone levels return toward baseline (Liu PY et al., 2022, PMID 36152143). Endocrine dysfunction becomes chronic primarily when sleep restriction is repeated over consecutive weeks or months.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            A single night of poor sleep causes transient morning hormonal blunting, but baseline testosterone production recovers rapidly once normal sleep architecture is resumed.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-can-catching-up-on-sleep-restore-testosterone" className="mt-12">
          <h2
            id="h2-can-catching-up-on-sleep-restore-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Can catching up on sleep restore suppressed testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Intervention trials tracking hormonal recovery timelines show that sleep extension protocols (such as weekend catch-up sleep) can partially reverse the endocrine and metabolic impairments caused by chronic sleep debt. In controlled clinical evaluations of sleep-restricted men, adding 2 to 3 hours of recovery sleep over consecutive nights partially normalized daytime serum testosterone and improved insulin sensitivity (Killick R et al., 2015, PMID 25683266). Furthermore, prophylactic sleep extension before an acute sleep debt buffers the severity of total testosterone suppression (Arnal PJ et al., 2016, PMID 26647769). Sustained restoration of 7 to 9 hours of nightly sleep is required for full endocrine stabilization.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Weekend catch-up sleep partially restores daytime testosterone levels, but sustained baseline hormone production requires consistent, unfragmented nightly sleep.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-sleep-apnea-and-shift-work" className="mt-12">
          <h2
            id="h2-sleep-apnea-and-shift-work"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How does sleep apnea and shift work impact male hormones?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Obstructive sleep apnea (OSA) and irregular shift work cause chronic, severe disruption to male hormonal health through distinct physiological pathways. OSA induces repetitive nocturnal hypoxemia and continuous sleep fragmentation, preventing patients from entering slow-wave (deep) sleep when nocturnal LH pulses are highest (Zhang XB et al., 2016, PMID 26370402). Shift work disrupts central master clock signaling in the suprachiasmatic nucleus, causing chronic circadian desynchronization between adrenal cortisol release and gonadal steroidogenesis. Population studies confirm that men with regular sleep disruption or short sleep duration under 6 hours show higher rates of functional hypogonadism (Hernández-Pérez JG et al., 2024, PMID 37452666).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Nocturnal oxygen desaturation from sleep apnea and circadian disruption from shift work suppress LH pulse amplitude, impairing long-term testicular hormone output.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Laboratory sleep restriction models reflect controlled acute, severe sleep deprivation rather than real-world erratic sleep patterns over decades. Inter-individual variation in sleep architecture, slow-wave sleep retention, and endocrine tolerance remains substantial among healthy men. Furthermore, sleep deprivation interventions co-induce metabolic changes like altered insulin sensitivity and elevated sympathetic tone, making isolated endocrine attribution complex.
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
                Leproult R, Van Cauter E. (2011)
              </p>
              <p className="text-[13px] text-mute">
                Effect of 1 week of sleep restriction on testosterone levels in young healthy men. <em>JAMA</em> 305(21): 2173-4.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/21632481/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 21632481
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Su L et al. (2021)
              </p>
              <p className="text-[13px] text-mute">
                Effect of partial and total sleep deprivation on serum testosterone in healthy males: a systematic review and meta-analysis. <em>J Sleep Res</em> 30(6): e13425.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/34801825/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 34801825
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Killick R et al. (2015)
              </p>
              <p className="text-[13px] text-mute">
                Metabolic and hormonal effects of &apos;catch-up&apos; sleep in men with chronic, repetitive, lifestyle-driven sleep restriction. <em>J Clin Endocrinol Metab</em> 100(10): 3758-67.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/25683266/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 25683266
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Arnal PJ et al. (2016)
              </p>
              <p className="text-[13px] text-mute">
                Effect of Sleep Extension on the Subsequent Testosterone, Cortisol and Prolactin Responses to Total Sleep Deprivation and Recovery. <em>J Biol Rhythms</em> 31(1): 82-93.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/26647769/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 26647769
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Hernández-Pérez JG et al. (2024)
              </p>
              <p className="text-[13px] text-mute">
                Association of sleep duration and quality with serum testosterone concentrations among men and women: NHANES 2011-2016. <em>Public Health</em> 228: 14-21.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/37452666/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 37452666
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Liu PY et al. (2022)
              </p>
              <p className="text-[13px] text-mute">
                Sleep, testosterone and cortisol balance, and ageing men. <em>Rev Endocr Metab Disord</em> 23(6): 1323-1339.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/36152143/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 36152143
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Gaml-Sørensen A et al. (2024)
              </p>
              <p className="text-[13px] text-mute">
                Sleep duration and biomarkers of fecundity in young men: a cross-sectional study from a population-based cohort. <em>Human Reproduction</em> 39(7): 1542-1552.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/37985426/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 37985426
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Zhang XB et al. (2016)
              </p>
              <p className="text-[13px] text-mute">
                Erectile Dysfunction and Sexual Hormone Levels in Men With Obstructive Sleep Apnea: Efficacy of Continuous Positive Airway Pressure. <em>Tohoku J Exp Med</em> 238(1): 39-45.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/26370402/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 26370402
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
            Related Science &amp; Nutrition Guides
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition &amp; Testosterone Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary strategies and nutrient optimization for male hormones.
              </p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium &amp; Sleep Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Clinical research on magnesium supplementation, sleep latency, and androgen balance.
              </p>
            </Link>
            <Link
              href="/science/vitamin-d"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Vitamin D &amp; Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">
                Secosteroid hormone receptors, seasonal endocrine variation, and trial findings.
              </p>
            </Link>
            <Link
              href="/science/ashwagandha-and-cortisol"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Ashwagandha &amp; Cortisol Science</p>
              <p className="mt-1 text-[13px] text-mute">
                HPA axis regulation, stress biomarker reduction, and sleep architecture studies.
              </p>
            </Link>
          </div>
        </section>

        {/* Footer Medical Disclaimer */}
        <footer className="mt-14 border-t border-cloudText/20 pt-6 text-[13px] leading-[1.6] text-mute">
          <p>
            This content is produced by Kris Oddo (NASM-CPT) for informational and educational purposes only. It is not intended to provide medical advice or to substitute for medical diagnosis or treatment. Consult a licensed physician before starting any new sleep or dietary intervention or altering your healthcare routine.
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

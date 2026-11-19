import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import TitanProductInline from "@/components/TitanProductInline";
import { productContextForPath } from "@/lib/productContext";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/creatine-and-hair-loss";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Does Creatine Cause Hair Loss? The DHT Study, Explained",
  description:
    "The creatine and hair loss link rests on one 2009 study: DHT rose 56% in 20 rugby players during loading. It was never replicated. What that means.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Creatine Cause Hair Loss? The DHT Study, Explained",
    description:
      "Does creatine monohydrate cause hair loss or increase DHT? Read an evidence-graded breakdown of the 2009 rugby study versus subsequent clinical trials.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Creatine and Hair Loss evidence breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Creatine Cause Hair Loss? The DHT Study, Explained",
    description:
      "Evidence breakdown of creatine monohydrate, dihydrotestosterone (DHT) kinetics, follicle miniaturization, and clinical trials.",
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
  doi?: string;
};

const STUDY_ROWS: StudyRow[] = [
  {
    study: "van der Merwe J et al. (2009)",
    design: "Randomized Crossover Trial (3 weeks)",
    sampleSize: "20 male rugby players",
    outcome: "Serum DHT increased 56% during 7-day loading (25g/d) and 40% during maintenance (5g/d); total testosterone remained unchanged.",
    grade: "Grade B (Single RCT)",
    pmid: "19741313",
    doi: "10.1097/JSM.0b013e3181b8b52f",
  },
  {
    study: "Antonio J et al. (2021)",
    design: "Systematic Review & Evidence Analysis",
    sampleSize: "12 clinical trials reviewed",
    outcome: "Comprehensive review of 12 clinical trials examining creatine and testosterone/DHT; 12 out of 12 subsequent studies observed no significant increase in total testosterone, free testosterone, or DHT.",
    grade: "Grade A (Systematic Review)",
    pmid: "33557850",
    doi: "10.1186/s12970-021-00412-w",
  },
  {
    study: "Kreider RB et al. (2017)",
    design: "ISSN Safety & Efficacy Position Stand",
    sampleSize: "Multiple clinical cohorts",
    outcome: "Evaluated safety markers across hundreds of resistance-trained subjects; concluded no evidence linking standard creatine dosing to systemic androgen disruption or abnormal hair thinning.",
    grade: "Grade A (Position Stand)",
    pmid: "28615996",
    doi: "10.1186/s12970-017-0173-z",
  },
  {
    study: "Hoffman JR et al. (2006)",
    design: "Randomized Controlled Trial (10 weeks)",
    sampleSize: "33 male strength athletes",
    outcome: "Creatine monohydrate supplementation produced significant strength gains without changing resting serum testosterone or endocrine profiles.",
    grade: "Grade A (RCT)",
    pmid: "17136944",
  },
  {
    study: "Volek JS et al. (1997)",
    design: "Randomized Controlled Trial (7 days)",
    sampleSize: "13 resistance-trained males",
    outcome: "High-dose creatine loading (25g/d for 7 days) produced no changes in baseline total testosterone or cortisol concentrations.",
    grade: "Grade A (RCT)",
    pmid: "9216554",
  },
];

const faqs = [
  {
    question: "Does creatine monohydrate directly cause hair loss or baldness?",
    answer:
      "No clinical trial has ever demonstrated that creatine monohydrate directly causes hair loss, follicle miniaturization, or scalp shedding. The idea stems entirely from indirect serum DHT measurements in a single 2009 study.",
  },
  {
    question: "Why do people say creatine increases DHT?",
    answer:
      "In 2009, a single 3-week study on 20 rugby players found that creatine loading elevated serum dihydrotestosterone (DHT) levels. However, twelve subsequent clinical trials measuring male sex hormones failed to replicate this increase.",
  },
  {
    question: "Should men with male pattern baldness in their family avoid creatine?",
    answer:
      "Current clinical evidence does not indicate that men predisposed to androgenic alopecia need to avoid creatine monohydrate. Hair loss is primarily driven by genetic hair follicle sensitivity to circulating androgens, not by creatine supplementation.",
  },
  {
    question: "Does creatine increase total or free testosterone?",
    answer:
      "Multiple clinical trials measuring total testosterone and free testosterone before and after creatine loading show no statistically significant changes in circulating testosterone levels.",
  },
  {
    question: "What is the recommended dose of creatine for muscle performance without side effects?",
    answer:
      "Standard clinical dosing is 3 to 5 grams of creatine monohydrate daily. A loading phase of 20 grams daily for 5-7 days is optional, but taking 3-5 grams per day consistently saturates muscle creatine stores within 3-4 weeks without requiring high loading doses.",
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
  headline: "Creatine and Hair Loss: What the Clinical Research Actually Shows",
  description:
    "The creatine and hair loss link rests on one 2009 study: DHT rose 56% in 20 rugby players during loading. It was never replicated. What that means.",
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
      name: "Three weeks of creatine monohydrate supplementation affects dihydrotestosterone to testosterone ratio in college-aged rugby players",
      author: { "@type": "Person", name: "van der Merwe J" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "Clinical Journal of Sport Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "19741313" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1097/JSM.0b013e3181b8b52f" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/19741313/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?",
      author: { "@type": "Person", name: "Antonio J" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33557850" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1186/s12970-021-00412-w" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33557850/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
      author: { "@type": "Person", name: "Kreider RB" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28615996" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1186/s12970-017-0173-z" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/28615996/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Creatine Monohydrate" },
    { "@type": "Thing", name: "Dihydrotestosterone" },
    { "@type": "Thing", name: "Hair Loss" },
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
      name: "Creatine and Hair Loss",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default async function CreatineHairLossSciencePage() {
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
            <li className="text-cloudText">Creatine and Hair Loss</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Clinical Evidence Breakdown</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Creatine and Hair Loss: What the Clinical Research Actually Shows
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
            Clinical evidence connecting creatine to hair loss stems from a single 2009 trial that observed elevated DHT levels in rugby players, a finding never replicated in subsequent trials.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Clinical evidence connecting creatine monohydrate to hair loss stems from a single 2009 trial that observed elevated serum DHT levels in rugby players, a finding that has not been replicated in subsequent trials. Multiple clinical studies show that creatine does not alter serum total testosterone, free testosterone, or directly cause follicle miniaturization in men.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-creatine-hair-loss" className="mt-12">
          <h2
            id="h2-creatine-hair-loss"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does creatine monohydrate cause hair loss or male pattern baldness?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            No clinical trial has demonstrated that creatine monohydrate causes hair thinning, follicle miniaturization, or male pattern baldness. Across decades of sports science research, creatine has been evaluated in hundreds of clinical trials involving thousands of resistance-trained athletes. None of these trials recorded hair loss as a adverse clinical finding.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Across more than 40 clinical trials and 7 randomized controlled studies, creatine monohydrate supplementation has shown zero direct causal link to follicle miniaturization, hair loss, or male pattern baldness.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Hair loss in men is primarily driven by androgenic alopecia, a genetic sensitivity of hair follicles to dihydrotestosterone (DHT). While circulating hormones play a role, local follicle receptor density and enzyme expression in the scalp determine whether follicle miniaturization occurs. Creatine monohydrate itself is an amino acid derivative stored in skeletal muscle to generate adenosine triphosphate (ATP) during short bursts of high-intensity contraction; it possesses no direct biological mechanism for disrupting hair follicle cycles.
          </p>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-creatine-dht" className="mt-12">
          <h2
            id="h2-creatine-dht"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does creatine increase DHT (dihydrotestosterone) levels?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Widespread concern regarding creatine and DHT originates from a 2009 study by van der Merwe et al. (PMID 19741313). In this 3-week crossover trial, 20 rugby players supplemented with 25g per day of creatine for 7 days followed by 5g per day for 14 days. Researchers observed a 56% increase in serum DHT levels during the loading phase and a 40% elevation during the maintenance phase, while total testosterone remained unchanged.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            The hypothesis that creatine elevates DHT originates entirely from a single 2009 trial in 20 rugby players, whereas 12 subsequent clinical trials found no change in total testosterone, free testosterone, or DHT levels.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            However, context is critical: the baseline DHT level in the creatine group was 23% lower than the placebo group before supplementation began. Even after the reported increase, DHT levels remained well within normal physiological ranges. Crucially, as highlighted in a 2021 systematic review by Antonio et al. (PMID 33557850), 12 subsequent clinical trials investigating creatine supplementation and male sex hormones observed no significant changes in total testosterone, free testosterone, or DHT.
          </p>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-clinical-research" className="mt-12">
          <h2
            id="h2-clinical-research"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What does the clinical research say about creatine and hair thinning?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Comprehensive reviews by the International Society of Sports Nutrition (ISSN, PMID 28615996) conclude that creatine monohydrate is one of the most thoroughly tested dietary supplements in existence, with a well-established safety profile. Multiple controlled trials measuring endocrine markers—including total testosterone, free testosterone, growth hormone, and cortisol—consistently show that standard creatine supplementation does not disrupt endocrine homeostasis.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Systematic clinical evaluations confirm that while creatine reliably increases intramuscular phosphocreatine stores and athletic power, it does not alter circulating androgen biomarkers or hair follicle density.
          </blockquote>

          {/* Clinical Evidence Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Study</th>
                  <th className="p-3 font-semibold md:p-4">Design &amp; Sample</th>
                  <th className="p-3 font-semibold md:p-4">Primary Findings</th>
                  <th className="p-3 font-semibold md:p-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.study} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.study}</td>
                    <td className="p-3 md:p-4">
                      {row.design} ({row.sampleSize})
                    </td>
                    <td className="p-3 md:p-4">
                      {row.outcome}
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
                    </td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-avoid-creatine" className="mt-12">
          <h2
            id="h2-avoid-creatine"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Should men prone to male pattern baldness avoid creatine?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            For men with a genetic predisposition to male pattern baldness, avoiding creatine monohydrate is generally unnecessary based on current medical literature. Androgenic alopecia is governed by 5-alpha reductase activity within scalp follicles and local androgen receptor sensitivity, rather than normal fluctuations in dietary amino acid metabolites.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            For men genetically predisposed to androgenic alopecia, daily creatine monohydrate supplementation remains clinically safe, with hair thinning governed by local follicle receptor sensitivity rather than oral creatine intake.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Athletes seeking to maximize muscle strength, power output, and cognitive fatigue resistance can take 3 to 5 grams of creatine monohydrate daily. If hair thinning is experienced, clinical evaluation should focus on verified drivers such as male pattern baldness, severe calorie restriction, micronutrient deficiencies (such as iron or zinc), or physiological stress.
          </p>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px]">
            <li>
              Direct scalp biopsy data measuring intra-follicular DHT concentrations during creatine supplementation is absent from current literature.
            </li>
            <li>
              Men with high genetic susceptibility to androgenic alopecia have unique scalp androgen receptor sensitivity that systemic blood panels may not fully capture.
            </li>
            <li>
              Observational self-reports on internet forums introduce significant recall bias and confounding variables like high physiological stress, intense weight cuts, or concurrent anabolic compound use.
            </li>
          </ul>
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
                van der Merwe J, Brooks NE, Myburgh KH. (2009)
              </p>
              <p className="text-[13px] text-mute">
                Three weeks of creatine monohydrate supplementation affects dihydrotestosterone to testosterone ratio in college-aged rugby players. <em>Clin J Sport Med</em> 19(5): 399-404.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/19741313/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 19741313
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Antonio J, Candow DG, Forbes SC, et al. (2021)
              </p>
              <p className="text-[13px] text-mute">
                Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? <em>J Int Soc Sports Nutr</em> 18(1): 13.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/33557850/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 33557850
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Kreider RB, Kalman DS, Antonio J, et al. (2017)
              </p>
              <p className="text-[13px] text-mute">
                International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. <em>J Int Soc Sports Nutr</em> 14: 18.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/28615996/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 28615996
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Hoffman JR, Ratamess NA, Kang J, et al. (2006)
              </p>
              <p className="text-[13px] text-mute">
                Effect of creatine and beta-alanine supplementation on performance and endocrine responses in strength/power athletes. <em>Int J Sport Nutr Exerc Metab</em> 16(4): 430-46.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/17136944/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 17136944
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Volek JS, Boetes M, Bush JA, et al. (1997)
              </p>
              <p className="text-[13px] text-mute">
                Response of testosterone and cortisol concentrations to high-intensity resistance exercise following creatine supplementation. <em>J Strength Cond Res</em> 11(3): 182-7.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/9216554/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 9216554
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
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Deficiency restoration, dosage bounds, and clinical evidence breakdown.
              </p>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Building Muscle After 40</p>
              <p className="mt-1 text-[13px] text-mute">
                Training volume, protein synthesis, and recovery protocols for mature lifters.
              </p>
            </Link>
            <Link
              href="/science/tongkat-ali"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Tongkat Ali Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Aging male trial findings, dosage data, and clinical research analysis.
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
        <TitanProductInline
          context={productContextForPath("/science/creatine-and-hair-loss")}
          source="geebs_science_creatine_and_hair_loss"
          className="mt-14"
        />
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/soy-and-testosterone-myth";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Soy and Testosterone: What the Research Actually Shows",
  description:
    "Comprehensive meta-analyses of clinical trials demonstrate that neither soy protein nor soy isoflavones lower total testosterone or elevate estrogen in adult men.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Soy and Testosterone: What the Research Actually Shows",
    description:
      "Meta-analyses of clinical trials show soy protein and isoflavones do not lower testosterone or raise estrogen in men. Here is the evidence breakdown.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Soy and Testosterone evidence breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soy and Testosterone: What the Research Actually Shows",
    description:
      "What clinical trials reveal about soy protein, phytoestrogens, total testosterone, free testosterone, and male sex hormones.",
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
    study: "Reed KE et al. (2021)",
    design: "Expanded Meta-Analysis (41 RCTs)",
    sampleSize: "1,753 adult men",
    outcome: "No significant effect on total testosterone, free testosterone, or circulating estradiol regardless of dose or duration",
    grade: "Grade A (Meta-Analysis)",
    pmid: "33383165",
  },
  {
    study: "Hamilton-Reeves JM et al. (2010)",
    design: "Systematic Review & Meta-Analysis (15 RCTs)",
    sampleSize: "32 treatment arms",
    outcome: "No changes in total testosterone, free testosterone, SHBG, or estradiol across soy food or purified isoflavone interventions",
    grade: "Grade A (Meta-Analysis)",
    pmid: "19524224",
  },
  {
    study: "Kraemer WJ et al. (2013)",
    design: "Randomized Controlled Trial (Acute RT)",
    sampleSize: "10 resistance-trained men",
    outcome: "Soy and whey protein isolate supplementation both supported post-exercise recovery without suppressing circulating androgen response",
    grade: "Grade A (RCT)",
    pmid: "24015701",
  },
  {
    study: "Dillingham BL et al. (2005)",
    design: "Randomized Crossover Trial (57 days)",
    sampleSize: "35 healthy adult men",
    outcome: "High vs. low isoflavone soy protein isolates showed minor physiological fluctuations without clinical suppression of male sex hormones",
    grade: "Grade A (RCT)",
    pmid: "15735098",
  },
];

const faqs = [
  {
    question: "Does eating soy protein lower total or free testosterone in men?",
    answer:
      "No. Comprehensive meta-analyses evaluating over 40 clinical trials found no statistically significant effect of soy protein or soy isoflavones on total testosterone or free testosterone levels in adult men.",
  },
  {
    question: "Do soy isoflavones increase circulating estrogen levels in male lifters?",
    answer:
      "Clinical trial data consistently show that soy isoflavone consumption does not increase serum estradiol or estrone concentrations in men. Phytoestrogens bind preferentially to estrogen receptor-beta rather than receptor-alpha, producing non-feminizing tissue response.",
  },
  {
    question: "Can men build muscle effectively using soy protein isolate?",
    answer:
      "Yes. Soy protein isolate is a complete protein containing all essential amino acids. While whey protein exhibits a slightly higher leucine content per gram, clinical trials demonstrate that total daily protein intake remains the primary driver of hypertrophy.",
  },
  {
    question: "Why do some online sources claim soy causes hormone disruption?",
    answer:
      "Hormone disruption claims stem primarily from early animal rodent models with higher isoflavone metabolism rates, along with isolated human case reports involving extreme daily consumption far exceeding normal dietary levels.",
  },
  {
    question: "Does gut microbiota affect how soy is digested and metabolized?",
    answer:
      "Yes. The metabolism of daidzein into equol depends on specific intestinal bacterial strains, which are present in roughly 30% to 50% of adult populations. However, meta-analyses show hormone safety regardless of equol producer status.",
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
  headline: "Soy and Testosterone: What the Research Actually Shows",
  description:
    "Comprehensive meta-analyses of clinical trials demonstrate that neither soy protein nor soy isoflavones lower total testosterone or elevate estrogen in adult men.",
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
      name: "Neither soy nor isoflavone intake affects male reproductive hormones: An expanded and updated meta-analysis of clinical studies",
      author: { "@type": "Person", name: "Reed KE" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Reproductive Toxicology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33383165" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33383165/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Clinical studies show no effects of soy protein or isoflavones on reproductive hormones in men: results of a meta-analysis",
      author: { "@type": "Person", name: "Hamilton-Reeves JM" },
      datePublished: "2010",
      isPartOf: { "@type": "Periodical", name: "Fertility and Sterility" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "19524224" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/19524224/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The effects of soy and whey protein supplementation on acute hormonal responses to resistance exercise in men",
      author: { "@type": "Person", name: "Kraemer WJ" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "Journal of the American College of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "24015701" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/24015701/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Soy protein isolates of varying isoflavone content exert minor effects on serum reproductive hormones in healthy young men",
      author: { "@type": "Person", name: "Dillingham BL" },
      datePublished: "2005",
      isPartOf: { "@type": "Periodical", name: "The Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "15735098" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/15735098/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Soy Protein" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Phytoestrogens" },
    { "@type": "Thing", name: "Endocrine Health" },
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
      name: "Soy and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function SoyAndTestosteroneSciencePage() {
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
            <li className="text-cloudText">Soy and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Standalone Science Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Soy and Testosterone: What the Research Actually Shows
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Direct Answer Box (First 2 sentences exact per brief) */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Clinical trial meta-analyses confirm soy intake does not suppress male testosterone.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Comprehensive meta-analyses of clinical trials demonstrate that neither soy protein nor soy isoflavones lower total testosterone, free testosterone, or elevate circulating estrogen in adult men. Phytoestrogens bind preferentially to estrogen receptor-beta rather than receptor-alpha, exerting distinct tissue-specific effects without suppressing testicular androgen synthesis.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-does-soy-lower-testosterone" className="mt-12">
          <h2
            id="h2-does-soy-lower-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does eating soy protein lower testosterone in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The claim that consuming soy protein suppresses male androgen production is refuted by robust clinical research. In the most comprehensive meta-analysis to date,{" "}
            <span className="text-bone font-medium">Reed KE et al. (2021)</span> evaluated 41 randomized controlled trials (PMID: 33383165) encompassing 1,753 adult men. The researchers examined total testosterone, free testosterone, bioavailable testosterone, and sex hormone-binding globulin (SHBG) across varying intake levels and trial durations ranging from weeks to over a year.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The meta-analysis revealed no statistically significant change in circulating total testosterone or free testosterone concentrations in men consuming isolated soy protein, soy foods, or purified isoflavones. These results expanded upon earlier findings by{" "}
            <span className="text-bone font-medium">Hamilton-Reeves JM et al. (2010)</span> (PMID: 19524224), which synthesized 15 randomized controlled trials across 32 treatment arms and similarly observed zero suppressive effect on male androgen status.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Randomized controlled trials in human males consistently demonstrate that standard dietary consumption of soy protein and isoflavones does not lower serum total or free testosterone levels.&quot;
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-do-isoflavones-increase-estrogen" className="mt-12">
          <h2
            id="h2-do-isoflavones-increase-estrogen"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Do soy isoflavones increase estrogen levels?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Another widespread concern is that plant compounds in soy raise circulating female sex hormones in men. However, blood markers from randomized clinical trials show no elevation of serum estradiol or estrone following soy protein or isoflavone ingestion.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            In controlled clinical interventions like <span className="text-bone font-medium">Dillingham BL et al. (2005)</span> (PMID: 15735098), young adult men consumed low-isoflavone and high-isoflavone soy protein isolates daily over 57-day periods. Serum estradiol levels remained stable and within physiological normal reference ranges, confirming that dietary isoflavones do not act as circulating estrogen boosters in male physiology. If you are optimizing baseline hormonal health, explore our broader review on <Link href="/nutrition/testosterone" className="text-cloudText underline hover:text-bone">testosterone nutrition fundamentals</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Consuming soy protein isolates containing high concentrations of isoflavones does not elevate circulating serum estradiol or estrone levels in healthy adult men.&quot;
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-why-phytoestrogens-confused" className="mt-12">
          <h2
            id="h2-why-phytoestrogens-confused"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Why are plant phytoestrogens confused with human estrogen?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The confusion stems from semantic and structural similarities between plant-derived polyphenol compounds (isoflavones such as genistein and daidzein) and endogenous human 17beta-estradiol. Although phytoestrogens possess a molecular structure capable of binding to human estrogen receptors, their receptor binding affinity and physiological activity differ fundamentally from human hormones.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Phytoestrogens bind preferentially to Estrogen Receptor-Beta (ER-beta), which is expressed primarily in tissues such as bone, vascular endothelium, and prostate, rather than Estrogen Receptor-Alpha (ER-alpha), which drives classical feminizing responses. Furthermore, their binding affinity for ER-alpha is orders of magnitude weaker than endogenous estradiol, allowing them to function as Selective Estrogen Receptor Modulators (SERMs) rather than direct estrogen mimics.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Plant phytoestrogens are non-steroidal polyphenols with preferential affinity for ER-beta, exerting tissue-specific modulation rather than mimicking circulating human estrogen.&quot;
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-can-lifters-use-soy" className="mt-12">
          <h2
            id="h2-can-lifters-use-soy"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Can male lifters use soy protein without disrupting hormones?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            For male lifters focused on muscle hypertrophy and body composition, soy protein isolate serves as an effective quality protein source that fits into structured nutritional plans. Clinical exercise trials, such as <span className="text-bone font-medium">Kraemer WJ et al. (2013)</span> (PMID: 24015701), examined resistance-trained men supplementing with soy protein or whey protein during acute resistance training. The study confirmed that soy supplementation supported acute muscle recovery without blunting post-exercise testosterone responses.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            While individual protein sources vary in essential amino acid density, hitting your total daily protein target remains the governing variable for muscle protein synthesis. Lifters balancing daily macronutrient requirements can consult our research guides on <Link href="/science/how-much-protein-per-kg" className="text-cloudText underline hover:text-bone">how much protein per kg you actually need</Link>, evaluate <Link href="/nutrition/soy-protein-hormones" className="text-cloudText underline hover:text-bone">soy protein and muscle building</Link>, compare <Link href="/science/protein-powder-vs-whole-food-protein" className="text-cloudText underline hover:text-bone">protein powder versus whole food protein</Link>, see how <Link href="/science/cruciferous-vegetables-and-hormone-metabolism" className="text-cloudText underline hover:text-bone">cruciferous vegetables affect estrogen metabolism</Link>, review strategies for <Link href="/guides/how-to-build-muscle-on-a-plant-based-diet-for-men" className="text-cloudText underline hover:text-bone">building muscle on plant-based diets</Link>, and check overall targets for <Link href="/nutrition/longevity" className="text-cloudText underline hover:text-bone">nutrition and longevity</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Resistance-trained men can utilize soy protein isolate to support muscle recovery and training adaptations without blunting post-workout androgen signaling.&quot;
            </p>
          </div>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="h2-evidence-summary" className="mt-12">
          <h2
            id="h2-evidence-summary"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Clinical Trial Evidence Summary
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[14px] text-bone/90 border-collapse">
              <thead>
                <tr className="border-b border-white/20 bg-white/[0.04]">
                  <th className="p-3 font-semibold text-bone">Study & Citation</th>
                  <th className="p-3 font-semibold text-bone">Design</th>
                  <th className="p-3 font-semibold text-bone">Sample Size</th>
                  <th className="p-3 font-semibold text-bone">Primary Outcome</th>
                  <th className="p-3 font-semibold text-bone">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-medium text-bone">
                      {row.study}
                      <br />
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-cloudText hover:underline"
                      >
                        PMID: {row.pmid}
                      </a>
                    </td>
                    <td className="p-3 text-mute">{row.design}</td>
                    <td className="p-3 text-mute">{row.sampleSize}</td>
                    <td className="p-3 text-bone/85">{row.outcome}</td>
                    <td className="p-3 font-medium text-cloudText">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Note */}
        <section aria-labelledby="h2-honest-limits" className="mt-12">
          <h2
            id="h2-honest-limits"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Honest limits of the research
          </h2>
          <div className="mt-4 rounded-[6px] border border-white/10 bg-white/[0.02] p-5 space-y-3 text-[15px] leading-[1.65] text-bone/80">
            <p>
              While clinical trials overwhelmingly demonstrate endocrine safety, scientific rigor requires acknowledging clear boundary conditions in the current literature:
            </p>
            <ul className="list-disc list-inside space-y-2 text-mute">
              <li>
                <strong className="text-bone">Extreme Outlier Consumption:</strong> Published case reports documenting isolated hormonal anomalies involved extreme intake levels (e.g., 3+ liters of soy milk daily over extended periods). These extreme anecdotal cases do not reflect normal dietary patterns evaluated in controlled human trials.
              </li>
              <li>
                <strong className="text-bone">Microbiota Variations (Equol Status):</strong> Individual gut microbiota differences dictate whether daidzein is converted into equol, a more active isoflavone metabolite. While meta-analyses show hormone safety across whole cohorts, individual metabolic responses can vary based on gut flora composition.
              </li>
              <li>
                <strong className="text-bone">Processed Food Confounders:</strong> Controlled studies evaluate whole soy foods or purified soy protein isolates. Their findings do not necessarily apply to heavily ultra-processed food products containing low-grade soy fillers combined with high refined fats and sugars.
              </li>
            </ul>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ Section */}
        <section aria-labelledby="h2-faqs">
          <h2
            id="h2-faqs"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-[16px] font-semibold leading-[1.5] text-bone md:text-[17px]">
                  {faq.question}
                </dt>
                <dd className="mt-2 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Call to Action */}
        <section className="rounded-[6px] border border-cloudText/30 bg-cloudText/[0.05] p-6 md:p-8">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Grounded Nutrition Built Around Real Science
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Whether your goals center on fat loss, muscle building, or long-term healthspan, our 1:1 online coaching establishes evidence-based training and nutrition protocols tailored to your schedule—without restrictive food anxiety.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="science_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science" className="btn btn-secondary">
              Browse Science Library
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational content only — not medical advice, and not a diagnosis or treatment for any condition.
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

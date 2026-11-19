import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/cruciferous-vegetables-and-hormone-metabolism";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Cruciferous Vegetables and Estrogen: How I3C and DIM Work",
  description:
    "Clinical evidence on how indole-3-carbinol (I3C) and diindolylmethane (DIM) from cruciferous vegetables alter hepatic estrogen hydroxylation, urinary metabolites, and testosterone availability.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Cruciferous Vegetables and Estrogen: How I3C and DIM Work",
    description:
      "Controlled trial evidence evaluating cruciferous vegetables, I3C, and DIM on hepatic estrogen clearance, SHBG, and testosterone levels in men.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Cruciferous Vegetables and Hormone Metabolism evidence breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cruciferous Vegetables and Estrogen: How I3C and DIM Work",
    description:
      "Human clinical data on broccoli, Brussels sprouts, DIM, and indole-3-carbinol for male hormone metabolism.",
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
    study: "Michnovicz JJ et al. (1997)",
    design: "Controlled Clinical Intervention",
    sampleSize: "Human clinical cohort",
    outcome:
      "Oral indole-3-carbinol significantly increased urinary 2-hydroxyestrone excretion, favoring 2-hydroxylation over 16alpha-hydroxylation.",
    grade: "Grade A (RCT/Clinical)",
    pmid: "9168187",
  },
  {
    study: "Fowke JH et al. (2000)",
    design: "Dietary Intervention Trial",
    sampleSize: "Controlled Brassica diet cohort",
    outcome:
      "Whole Brassica vegetable consumption altered urinary estrogen metabolite ratios toward 2-hydroxyestrone in healthy subjects.",
    grade: "Grade A (Controlled Trial)",
    pmid: "10952093",
  },
  {
    study: "Dalessandri KM et al. (2004)",
    design: "Pilot Clinical Trial",
    sampleSize: "Clinical trial cohort",
    outcome:
      "Purified 3,3'-diindolylmethane (DIM) supplementation elevated urinary 2-OHE1/16alpha-OHE1 ratios without adverse hormonal events.",
    grade: "Grade B (Clinical Trial)",
    pmid: "15623462",
  },
  {
    study: "Gee JR et al. (2016)",
    design: "Placebo-Controlled Biomarker Trial",
    sampleSize: "Randomized human cohort",
    outcome:
      "Formulated DIM (BR-DIM) modulated tissue biomarkers and estrogen metabolism pathways in human subjects.",
    grade: "Grade A (Placebo-Controlled)",
    pmid: "26313229",
  },
  {
    study: "Williams DE (2021)",
    design: "Systematic Literature Review",
    sampleSize: "Comprehensive human/preclinical dataset",
    outcome:
      "Reviewed glucobrassicin breakdown to I3C and DIM, confirming phase I/II hepatic enzyme induction without serum androgen surge.",
    grade: "Grade A (Systematic Review)",
    pmid: "34660663",
  },
];

const faqs = [
  {
    question: "Do cruciferous vegetables lower total estrogen levels in men?",
    answer:
      "Cruciferous vegetables alter how the liver metabolizes estrogen rather than eliminating estrogen entirely. Glucosinolates like indole-3-carbinol promote hepatic 2-hydroxylation, converting estradiol into 2-hydroxyestrone—a weaker, less active metabolite—rather than 16alpha-hydroxyestrone.",
  },
  {
    question: "Can DIM or indole-3-carbinol boost free testosterone?",
    answer:
      "Clinical trial evidence does not show that eating cruciferous vegetables or taking DIM directly increases total or free testosterone levels. While optimizing estrogen clearance prevents excess estradiol accumulation, it does not stimulate testicular Leydig cell testosterone production.",
  },
  {
    question: "How does broccoli change estrogen clearance in the liver?",
    answer:
      "Chewing raw or lightly cooked broccoli releases myrosinase, an enzyme that breaks down glucobrassicin into indole-3-carbinol (I3C). In the stomach, acid condensation forms diindolylmethane (DIM), which induces cytochrome P450 enzymes (CYP1A1/CYP1A2) in the liver to favor 2-hydroxyestrone formation.",
  },
  {
    question: "Is taking a high-dose DIM supplement safe for male lifters?",
    answer:
      "Moderate dietary or low supplemental doses (100–200 mg/day) are generally well tolerated in studies. However, very high doses of purified DIM can display bi-phasic effects, potentially acting as an estrogen antagonist at lower doses and a weak agonist at higher concentrations.",
  },
  {
    question: "How should cruciferous vegetables be cooked to preserve active compounds?",
    answer:
      "Light steaming (for 3 to 4 minutes) preserves the active myrosinase enzyme required to convert glucobrassicin into I3C. Prolonged boiling deactivates myrosinase, reducing bioactive yield unless paired with raw cruciferous sources like mustard seed powder.",
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
  headline: "Cruciferous Vegetables and Hormone Metabolism: What the Science Shows",
  description:
    "Clinical evidence on how indole-3-carbinol (I3C) and diindolylmethane (DIM) from cruciferous vegetables alter hepatic estrogen hydroxylation, urinary metabolites, and testosterone availability.",
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
      name: "Changes in levels of urinary estrogen metabolites after oral indole-3-carbinol treatment in humans",
      author: { "@type": "Person", name: "Michnovicz JJ" },
      datePublished: "1997",
      isPartOf: { "@type": "Periodical", name: "Journal of the National Cancer Institute" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "9168187" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/9168187/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Brassica vegetable consumption shifts estrogen metabolism in healthy postmenopausal women",
      author: { "@type": "Person", name: "Fowke JH" },
      datePublished: "2000",
      isPartOf: { "@type": "Periodical", name: "Cancer Epidemiology, Biomarkers & Prevention" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "10952093" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/10952093/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Pilot study: effect of 3,3'-diindolylmethane supplements on urinary hormone metabolites in postmenopausal women with a history of early-stage breast cancer",
      author: { "@type": "Person", name: "Dalessandri KM" },
      datePublished: "2004",
      isPartOf: { "@type": "Periodical", name: "Nutrition and Cancer" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "15623462" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/15623462/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Phase Ib placebo-controlled, tissue biomarker trial of diindolylmethane (BR-DIMNG) in patients with prostate cancer who are undergoing prostatectomy",
      author: { "@type": "Person", name: "Gee JR" },
      datePublished: "2016",
      isPartOf: { "@type": "Periodical", name: "European Journal of Cancer Prevention" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26313229" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/26313229/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Indoles Derived From Glucobrassicin: Cancer Chemoprevention by Indole-3-Carbinol and 3,3'-Diindolylmethane",
      author: { "@type": "Person", name: "Williams DE" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Frontiers in Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34660663" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/34660663/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Cruciferous Vegetables" },
    { "@type": "Thing", name: "Estrogen Metabolism" },
    { "@type": "Thing", name: "Diindolylmethane" },
    { "@type": "Thing", name: "Indole-3-Carbinol" },
    { "@type": "Thing", name: "Testosterone" },
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
      name: "Cruciferous Vegetables & Hormone Metabolism",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function CruciferousVegetablesHormoneMetabolismPage() {
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
            <li className="text-cloudText">Cruciferous Vegetables & Hormone Metabolism</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Standalone Science Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Cruciferous Vegetables and Hormone Metabolism: What the Science Shows
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Direct Answer Box */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Cruciferous vegetables alter hepatic estrogen hydroxylation, not baseline androgen synthesis.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Cruciferous vegetables contain glucosinolates like indole-3-carbinol that alter estrogen metabolism in humans, favoring the formation of less active estrogen metabolites over potent estrogens. While this shift optimizes hepatic hormone clearance, clinical evidence does not show that eating cruciferous vegetables directly boosts serum testosterone levels.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-do-cruciferous-vegetables-lower-estrogen" className="mt-12">
          <h2
            id="h2-do-cruciferous-vegetables-lower-estrogen"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Do cruciferous vegetables lower estrogen in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Cruciferous vegetables do not shut down endogenous estrogen production; instead, they shift the biochemical pathways through which the liver clears circulating estrogens. In a landmark clinical study,{" "}
            <span className="font-medium text-bone">Michnovicz JJ et al. (1997)</span> demonstrated that oral consumption of indole-3-carbinol (PMID: 9168187) markedly increases phase I 2-hydroxylation of estradiol. This metabolic shift increases the urinary ratio of 2-hydroxyestrone (2-OHE1) relative to 16alpha-hydroxyestrone (16alpha-OHE1).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The 2-hydroxyestrone metabolite exhibits weak receptor affinity and rapid clearance, whereas 16alpha-hydroxyestrone is a potent, tissue-reactive estrogen metabolite. By directing parent estrogens toward 2-hydroxylation, cruciferous vegetable compounds facilitate favorable hormone breakdown without causing systemic estrogen deficiency in adult men.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-[15px] italic text-cloudText">
            Cruciferous vegetable consumption shifts hepatic phase I hydroxylation, elevating the urinary ratio of 2-hydroxyestrone to 16alpha-hydroxyestrone without shutting down endogenous estrogen synthesis.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-how-dim-and-i3c-affect-hormones" className="mt-12">
          <h2
            id="h2-how-dim-and-i3c-affect-hormones"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How do DIM and indole-3-carbinol affect hormone metabolism?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Glucobrassicin, the glucosinolate precursor present in broccoli, Brussels sprouts, cabbage, and kale, undergoes enzymatic breakdown by myrosinase into indole-3-carbinol (I3C). Upon exposure to gastric acid during digestion, I3C rapidly condensates into lipophilic bioactive compounds, predominantly 3,3&apos;-diindolylmethane (DIM).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            In human trials evaluating Brassica vegetable intake, such as{" "}
            <span className="font-medium text-bone">Fowke JH et al. (2000)</span> (PMID: 10952093) and clinical DIM supplementation by{" "}
            <span className="font-medium text-bone">Dalessandri KM et al. (2004)</span> (PMID: 15623462), DIM functions as an agonist for the aryl hydrocarbon receptor (AhR). AhR activation selectively induces cytochrome P450 enzymes—specifically CYP1A1 and CYP1A2—which catalyze hepatic estradiol 2-hydroxylation.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-[15px] italic text-cloudText">
            Indole-3-carbinol is converted in the stomach to diindolylmethane (DIM), which acts as a selective cytochrome P450 inducer, enhancing 2-hydroxylation of estradiol in human liver cells.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-can-broccoli-increase-testosterone" className="mt-12">
          <h2
            id="h2-can-broccoli-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Can broccoli and Brussels sprouts increase free testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Fitness internet lore frequently asserts that eating broccoli or taking DIM supplements acts as a natural &quot;testosterone booster&quot; by eliminating estrogen. However, controlled clinical data do not support this mechanism. As systematic reviews by{" "}
            <span className="font-medium text-bone">Williams DE (2021)</span> (PMID: 34660663) confirm, altering hepatic estrogen metabolite ratios does not stimulate testicular Leydig cells to increase total testosterone synthesis or alter sex hormone-binding globulin (SHBG) binding affinity.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            While optimizing hepatic hormone clearance prevents excessive peripheral estrogen accumulation in individuals with high body fat or impaired liver function, it does not elevate free serum testosterone above baseline in healthy, lean men. For actionable nutritional strategies for hormone health, see our detailed guide on{" "}
            <Link href="/nutrition/testosterone" className="underline text-cloudText hover:text-bone">
              testosterone and nutrition
            </Link>{" "}
            and our analysis of essential minerals like{" "}
            <Link href="/science/zinc" className="underline text-cloudText hover:text-bone">
              zinc for hormone support
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-[15px] italic text-cloudText">
            Altering peripheral estrogen clearance pathways does not stimulate testicular Leydig cell testosterone production or significantly raise circulating free testosterone levels in healthy men.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-whole-vegetables-vs-dim-supplements" className="mt-12">
          <h2
            id="h2-whole-vegetables-vs-dim-supplements"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is eating whole cruciferous vegetables better than taking DIM supplements?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Whole cruciferous vegetables deliver a complex matrix of glucosinolates, dietary fiber, vitamin C, and active plant enzymes. To maximize bioactive I3C and DIM yield, raw or lightly steamed vegetables preserve plant myrosinase activity. Prolonged high-heat boiling deactivates myrosinase, reducing conversion unless consumed alongside raw myrosinase sources such as mustard greens or radish.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Conversely, purified DIM supplements bypass enzymatic digestion to deliver standardized doses (100–300 mg). Clinical trials, including biomarker studies by{" "}
            <span className="font-medium text-bone">Gee JR et al. (2016)</span> (PMID: 26313229), confirm that low-to-moderate supplemental doses are well tolerated. However, high pharmacological doses of purified DIM risk bi-phasic receptor interaction, acting as an estrogen receptor antagonist at lower levels while demonstrating weak agonist activity at excessive concentrations. For broader lifestyle strategies, explore our guide to{" "}
            <Link href="/nutrition/longevity" className="underline text-cloudText hover:text-bone">
              nutrition and healthspan
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-[15px] italic text-cloudText">
            Whole cruciferous vegetables supply active myrosinase enzymes and dietary fiber alongside glucobrassicin, whereas high-dose DIM supplements risk bi-phasic receptor interactions.
          </blockquote>
        </section>

        {/* Clinical Studies Summary Table */}
        <section aria-labelledby="studies-table-heading" className="mt-14">
          <h2
            id="studies-table-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Human Clinical Trials & Evidence Matrix
          </h2>
          <p className="mt-3 text-[14.5px] text-mute">
            Grade A = Randomized Controlled Trials / Controlled Clinical Interventions; Grade B = Pilot / Cohort Studies.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-white/10 text-cloudText">
                  <th className="pb-3 pr-4 font-semibold">Study</th>
                  <th className="pb-3 pr-4 font-semibold">Design</th>
                  <th className="pb-3 pr-4 font-semibold">Cohort</th>
                  <th className="pb-3 pr-4 font-semibold">Outcome</th>
                  <th className="pb-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-bone/85">
                {STUDY_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4 font-medium text-bone whitespace-nowrap">
                      {row.study}
                    </td>
                    <td className="py-3.5 pr-4 whitespace-nowrap">{row.design}</td>
                    <td className="py-3.5 pr-4 whitespace-nowrap">{row.sampleSize}</td>
                    <td className="py-3.5 pr-4">{row.outcome}</td>
                    <td className="py-3.5 font-medium text-cloudText whitespace-nowrap">
                      {row.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Section */}
        <section
          aria-labelledby="honest-limits-heading"
          className="mt-14 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.05] p-6"
        >
          <h2
            id="honest-limits-heading"
            className="display text-[20px] leading-[1.15] text-bone md:text-[24px]"
          >
            Honest Limits of the Research
          </h2>
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[15px] leading-[1.65] text-bone/85">
            <li>
              <strong className="text-bone">Urinary Metabolites vs. Functional Outcomes:</strong> Clinical human trials primarily evaluate urinary estrogen metabolite ratios (2-OHE1 to 16alpha-OHE1) rather than direct functional androgen endpoints like muscle mass, physical strength, or libido.
            </li>
            <li>
              <strong className="text-bone">Bi-Phasic Receptor Effects:</strong> Pharmacological doses of isolated DIM supplements exhibit bi-phasic hormonal responses, acting as an estrogen antagonist at moderate concentrations and a weak agonist at excessive doses.
            </li>
            <li>
              <strong className="text-bone">Preparation & Enzymatic Yield:</strong> Food preparation significantly alters bioactive yield; prolonged boiling deactivates native plant myrosinase, reducing whole-vegetable glucobrassicin conversion.
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-[6px] border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-[17px] font-semibold text-bone">{faq.question}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-bone/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-12" />

        {/* Related Science & Guidance */}
        <section aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="display text-[20px] leading-[1.15] text-bone md:text-[24px]"
          >
            Related Evidence & Resources
          </h2>
          <ul className="mt-4 space-y-2.5 text-[15px] text-cloudText">
            <li>
              &rarr;{" "}
              <Link href="/nutrition/testosterone" className="underline hover:text-bone">
                Testosterone and Nutrition for Busy Professionals
              </Link>
            </li>
            <li>
              &rarr;{" "}
              <Link href="/science/zinc" className="underline hover:text-bone">
                Zinc for Hormone Support and Immune Function
              </Link>
            </li>
            <li>
              &rarr;{" "}
              <Link href="/nutrition/longevity" className="underline hover:text-bone">
                Nutrition and Healthspan Strategies
              </Link>
            </li>
          </ul>
        </section>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

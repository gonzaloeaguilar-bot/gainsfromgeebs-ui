import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/eggs-and-testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "How Many Eggs a Day for Testosterone? What Research Shows",
  description:
    "In a 12-week RCT, 30 lifters eating 3 whole eggs a day had higher testosterone than an egg-white group. What that means for how many eggs you eat.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "How Many Eggs a Day for Testosterone? What Research Shows",
    description:
      "Clinical trial evidence comparing whole eggs vs egg whites on serum testosterone, dietary cholesterol, and muscle building adaptations.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Whole Eggs and Testosterone evidence breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Many Eggs a Day for Testosterone? What Research Shows",
    description:
      "What randomized trials reveal about whole egg consumption, dietary cholesterol, serum testosterone, and muscle recovery.",
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
    study: "Bagheri R et al. (2021)",
    design: "Randomized Controlled Trial (12 weeks)",
    sampleSize: "30 resistance-trained young men",
    outcome:
      "Whole egg consumption (3 eggs/day) during resistance training maintained higher serum testosterone levels and yielded greater body composition improvements than protein-matched egg whites.",
    grade: "Grade A (RCT)",
    pmid: "33306586",
  },
  {
    study: "van Vliet S et al. (2017)",
    design: "Randomized Crossover Trial (Acute MPS)",
    sampleSize: "10 resistance-trained young men",
    outcome:
      "Whole egg ingestion stimulated postprandial muscle protein synthesis 45% more effectively than protein-matched egg white ingestion immediately post-workout.",
    grade: "Grade A (Crossover RCT)",
    pmid: "28978542",
  },
  {
    study: "Abou Sawan S et al. (2018)",
    design: "Randomized Controlled Trial (mTOR Signaling)",
    sampleSize: "10 resistance-trained young men",
    outcome:
      "Whole egg ingestion, but not egg white ingestion, enhanced post-exercise mTOR complex 1 colocalization with lysosomes to drive anabolic signaling.",
    grade: "Grade A (Mechanistic RCT)",
    pmid: "30133322",
  },
  {
    study: "Santos HO et al. (2021)",
    design: "Systematic Review & Narrative Synthesis",
    sampleSize: "Systematic synthesis of clinical trials",
    outcome:
      "Whole egg yolk lipids, phosphatidic acid, and micronutrients (choline, vitamin D, selenium) provide a synergistic bio-active matrix supporting muscle adaptation.",
    grade: "Grade B (Systematic Review)",
    pmid: "34504041",
  },
];

const faqs = [
  {
    question: "Do whole eggs increase testosterone levels compared to egg whites?",
    answer:
      "A 12-week randomized trial in resistance-trained men found that consuming 3 whole eggs daily maintained higher serum testosterone levels and produced greater increases in body composition compared to protein-matched egg whites. However, evidence remains limited to a single direct human RCT.",
  },
  {
    question: "Does dietary cholesterol from egg yolks turn directly into testosterone?",
    answer:
      "Cholesterol is the biochemical substrate used by Leydig cells in the testes to synthesize testosterone. While dietary cholesterol provides raw material, rate-limiting enzymes and luteinizing hormone (LH) signaling strictly regulate steroidogenesis, meaning extra dietary cholesterol does not endlessly multiply hormone output.",
  },
  {
    question: "Are whole eggs better for muscle growth than egg whites?",
    answer:
      "Yes. Clinical trial data demonstrate that whole eggs stimulate post-exercise muscle protein synthesis 45% more than isonitrogenous egg whites. Micronutrients, lipids, and phosphatidic acid in the egg yolk interact within the intact food matrix to amplify cellular anabolic signaling.",
  },
  {
    question: "How many eggs per day can you eat without harming blood lipids?",
    answer:
      "Clinical studies show that consuming 1 to 3 whole eggs daily does not adversely alter blood lipid ratios in the majority of healthy individuals. Endogenous hepatic cholesterol synthesis downregulates to maintain homeostasis, though hyper-responders may see modest LDL-C increases.",
  },
  {
    question: "Should you remove egg yolks when trying to lose fat?",
    answer:
      "Not necessarily. While egg whites offer pure lean protein with fewer calories, whole egg yolks contain essential fat-soluble vitamins, choline, selenium, and healthy fats that enhance satiety and nutrient density during calorie-restricted training phases.",
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
  headline: "Whole Eggs and Testosterone: What the Research Actually Shows",
  description:
    "In a 12-week RCT, 30 lifters eating 3 whole eggs a day had higher testosterone than an egg-white group. What that means for how many eggs you eat.",
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
      name: "Whole Egg Vs. Egg White Ingestion During 12 weeks of Resistance Training in Trained Young Males: A Randomized Controlled Trial",
      author: { "@type": "Person", name: "Bagheri R" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Journal of Strength and Conditioning Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33306586" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33306586/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Consumption of whole eggs promotes greater stimulation of postexercise muscle protein synthesis than consumption of isonitrogenous amounts of egg whites in young men",
      author: { "@type": "Person", name: "van Vliet S" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "The American Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28978542" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/28978542/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Whole egg, but not egg white, ingestion induces mTOR colocalization with the lysosome after resistance exercise",
      author: { "@type": "Person", name: "Abou Sawan S" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "The American Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30133322" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/30133322/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The Effect of Whole Egg Intake on Muscle Mass: Are the Yolk and Its Nutrients Important?",
      author: { "@type": "Person", name: "Santos HO" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "International Journal of Sport Nutrition and Exercise Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34504041" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/34504041/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Whole Eggs" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Dietary Cholesterol" },
    { "@type": "Thing", name: "Muscle Protein Synthesis" },
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
      name: "Whole Eggs and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function WholeEggsAndTestosteroneSciencePage() {
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
            <li className="text-cloudText">Whole Eggs and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Standalone Science Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Whole Eggs and Testosterone: What the Research Actually Shows
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
            Controlled clinical trial evidence evaluating whole eggs vs egg whites remains limited to a single trial.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled clinical evidence specifically isolating egg consumption&apos;s effect on serum testosterone relies on a single randomized trial comparing whole eggs against egg whites in resistance-trained men. While whole eggs provide dietary cholesterol, micronutrients, and superior post-workout protein synthesis, claiming that eating eggs significantly boosts serum testosterone beyond baseline correction is unproven.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-do-whole-eggs-increase-testosterone" className="mt-12">
          <h2
            id="h2-do-whole-eggs-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Do whole eggs increase testosterone levels compared to egg whites?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The question of whether whole eggs elevate serum testosterone superiorly to egg whites was addressed in a landmark 12-week intervention by{" "}
            <span className="text-bone font-medium">Bagheri R et al. (2021)</span> (PMID: 33306586). In this randomized controlled trial, 30 resistance-trained young men followed a structured weightlifting program while consuming either 3 whole eggs per day (delivering 18g protein and 17g lipid fat) or an isonitrogenous quantity of egg whites (18g protein, 0g fat).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            At the end of 12 weeks, both groups achieved significant strength and muscle mass gains. However, the whole egg group demonstrated significantly higher circulating serum testosterone concentrations and greater improvements in body composition (fat-free mass gains and body fat reduction) compared to the egg white group. While encouraging, this trial represents the sole randomized study isolating whole eggs versus egg whites under exercise conditions. If you are reviewing overall morning meal structures, check our ranked guide on <Link href="/guides/best-breakfasts-for-testosterone-ranked" className="text-cloudText underline hover:text-bone">best breakfasts for testosterone</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;A 12-week randomized trial in resistance-trained men found that daily whole egg ingestion maintained higher serum testosterone and increased fat-free mass compared to protein-matched egg whites.&quot;
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-does-cholesterol-turn-into-testosterone" className="mt-12">
          <h2
            id="h2-does-cholesterol-turn-into-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does the cholesterol in egg yolks turn into testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Biochemically, cholesterol is the essential precursor molecule for all steroid hormone synthesis. In Leydig cells within the testes, cholesterol is transported across mitochondrial membranes via the Steroidogenic Acute Regulatory (StAR) protein, where enzyme cleavage converts it into pregnenolone and ultimately testosterone.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            However, consuming extra dietary cholesterol from egg yolks does not automatically drive unbounded testosterone production. Intracellular steroidogenesis is tightly governed by hypothalamic-pituitary-gonadal (HPG) axis feedback and luteinizing hormone (LH) signaling. While eliminating dietary fat can impair baseline hormone production, extra dietary cholesterol beyond physiological needs does not act as a pharmacological stimulant. Explore the foundational mechanics in our <Link href="/nutrition/testosterone" className="text-cloudText underline hover:text-bone">testosterone and nutrition overview</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Dietary cholesterol serves as the biochemical precursor for testosterone, but intracellular steroidogenesis is regulated by LH signaling rather than acute dietary cholesterol overload.&quot;
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-are-whole-eggs-better-for-muscle" className="mt-12">
          <h2
            id="h2-are-whole-eggs-better-for-muscle"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Are whole eggs better for muscle building and recovery than egg whites?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Beyond endocrine markers, acute muscle protein synthesis (MPS) studies provide strong mechanistic evidence favoring whole eggs. In a landmark crossover study by <span className="text-bone font-medium">van Vliet S et al. (2017)</span> (PMID: 28978542), resistance-trained men consumed either whole eggs (18g protein, 17g fat) or egg whites (18g protein, 0g fat) immediately after resistance exercise.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Despite equal leucine and protein content, whole egg ingestion stimulated postprandial muscle protein synthesis 45% more effectively than egg whites. Subsequent research by <span className="text-bone font-medium">Abou Sawan S et al. (2018)</span> (PMID: 30133322) confirmed that non-protein nutrients inside the egg yolk—including phosphatidic acid, vitamins, minerals, and microRNAs—enhance mTOR complex 1 lysosomal colocalization. For more on micronutrient density, review our report on <Link href="/science/vitamin-d" className="text-cloudText underline hover:text-bone">vitamin D research and androgen support</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Consuming whole eggs post-exercise stimulates muscle protein synthesis 45% more effectively than protein-matched egg whites due to synergistic whole-food nutrient matrix interactions.&quot;
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-how-many-eggs-per-day" className="mt-12">
          <h2
            id="h2-how-many-eggs-per-day"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How many eggs per day can you eat without harming cholesterol blood markers?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Concerns surrounding daily egg intake stem from historical guidelines focusing on dietary cholesterol content. However, systematic reviews of lipid biomarker trials—synthesized by <span className="text-bone font-medium">Santos HO et al. (2021)</span> (PMID: 34504041)—demonstrate that eating 1 to 3 whole eggs per day does not increase cardiovascular risk factors in healthy, active populations.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            In response to dietary cholesterol intake, hepatic HMG-CoA reductase activity downregulates endogenous cholesterol synthesis in roughly 70% of individuals (&quot;hypo-responders&quot;). In the remaining 30% (&quot;hyper-responders&quot;), both LDL-C and HDL-C rise proportionally, maintaining a stable total-to-HDL cholesterol ratio without negatively altering atherogenic particle balance.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Consuming 1 to 3 whole eggs daily does not adversely alter blood lipid ratios in most healthy individuals, as dietary cholesterol suppresses endogenous hepatic synthesis.&quot;
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
                  <th className="p-3 font-semibold text-bone">Study &amp; Citation</th>
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
              While clinical research supports the nutrient density of whole eggs, scientific accuracy requires framing the clear boundaries of current data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-mute">
              <li>
                <strong className="text-bone">Single Long-Term RCT:</strong> Only one randomized trial specifically isolates whole eggs versus egg whites for 12 weeks on endocrine and muscle adaptation outcomes. More long-term interventional trials are needed before declaring egg yolks a definitive hormone booster.
              </li>
              <li>
                <strong className="text-bone">Lipid Response Heterogeneity:</strong> Dietary cholesterol from egg yolks affects individuals differently; hyper-responders experience elevation in both LDL and HDL cholesterol, requiring personal lipid panel monitoring.
              </li>
              <li>
                <strong className="text-bone">Dietary Context Dependency:</strong> Baseline diet quality, total calorie intake, and energy balance heavily dictate whether adding whole eggs provides a noticeable physiological benefit or simply adds dietary calories.
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
            Whether your goals center on muscle hypertrophy, body composition, or long-term healthspan, our 1:1 online coaching establishes evidence-based training and nutrition protocols tailored to your lifestyle.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="science_primary">
              Get this mapped to you
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/science" className="btn btn-secondary">
              Browse Science Library
              <span aria-hidden="true">&rarr;</span>
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

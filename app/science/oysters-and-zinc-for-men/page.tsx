import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/oysters-and-zinc-for-men";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Oyster Extract and Zinc for Men: Testosterone Evidence",
  description:
    "A medium oyster holds about 5 to 10 mg of zinc, so 2 to 3 cover a man's 11 mg a day. What oysters and oyster extract do, and don't do, for testosterone.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Oyster Extract and Zinc for Men: Testosterone Evidence",
    description:
      "Clinical research breakdown evaluating oyster consumption, oyster extract supplements, zinc bioavailability, and male endocrine function.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Oysters and Zinc for Men evidence breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oyster Extract and Zinc for Men: Testosterone Evidence",
    description:
      "What clinical trials reveal about oyster intake, oyster extract, elemental zinc bioavailability, and serum testosterone restoration.",
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
    study: "Prasad AS et al. (1996)",
    design: "Controlled Interventional Study",
    sampleSize: "40 healthy adult males",
    outcome:
      "Dietary zinc restriction significantly decreased serum testosterone in young men, whereas zinc supplementation for 6 months restored serum testosterone in deficient elderly men.",
    grade: "Grade B (Interventional Trial)",
    pmid: "8875519",
  },
  {
    study: "Solomons NW et al. (1979)",
    design: "Human Bioavailability Crossover Study",
    sampleSize: "9 healthy adult volunteers",
    outcome:
      "Oysters provided high bioavailable zinc causing rapid plasma zinc elevation, but co-ingesting phytate-rich foods (corn tortillas, black beans) significantly inhibited absorption.",
    grade: "Grade B (Bioavailability Trial)",
    pmid: "458251",
  },
  {
    study: "Solomons NW et al. (1981)",
    design: "Human Bioavailability Crossover Study",
    sampleSize: "8 healthy adult volunteers",
    outcome:
      "Elemental zinc from Atlantic oysters resisted absorption inhibition from nonheme ferrous iron, unlike inorganic zinc sulfate salts.",
    grade: "Grade B (Bioavailability Trial)",
    pmid: "7223699",
  },
  {
    study: "Koehler K et al. (2009)",
    design: "Randomized Double-Blind Controlled Trial",
    sampleSize: "14 trained athletic men",
    outcome:
      "High-dose zinc supplementation in zinc-adequate trained men produced no significant changes in serum free or total testosterone levels.",
    grade: "Grade A (RCT)",
    pmid: "17882141",
  },
];

const faqs = [
  {
    question: "Do oysters actually boost testosterone in men?",
    answer:
      "Oysters contain exceptional concentrations of bioavailable zinc, which is required for testicular steroidogenesis. However, clinical trials show that zinc increases testosterone only in men who are deficient. In zinc-sufficient men, eating oysters does not elevate testosterone beyond normal baseline levels.",
  },
  {
    question: "Is oyster extract supplement as effective as eating whole oysters?",
    answer:
      "Freeze-dried oyster extract supplements contain concentrated zinc and amino acids from shellfish, but human clinical trial evidence comparing extract powders to whole oysters or standard zinc picolinate is minimal. Supplement quality also varies in actual mineral yield and heavy metal testing.",
  },
  {
    question: "Is the zinc in oysters better absorbed than zinc supplements?",
    answer:
      "Human bioavailability research demonstrates that organic zinc bound within the food matrix of oysters is readily absorbed and resists competition from iron. However, inorganic zinc chelates (like zinc glycinate or picolinate) achieve comparable systemic absorption without the phytate inhibition caused when oysters are eaten with grains or beans.",
  },
  {
    question: "How many oysters do you need to eat to get enough zinc for testosterone support?",
    answer:
      "A serving of 2 to 3 raw Eastern oysters provides approximately 16 to 30 mg of elemental zinc, exceeding 100% of the 11 mg daily recommended intake for adult men. Consuming oysters 1 to 2 times per week easily maintains zinc repleteness without requiring daily supplementation.",
  },
  {
    question: "Can eating oysters cause heavy metal toxicity or high sodium intake?",
    answer:
      "Oysters naturally bioaccumulate trace minerals as well as cadmium, lead, and mercury depending on harvest waters. While occasional consumption is safe for healthy adults, daily high-volume consumption or unvetted extract supplements risk heavy metal accumulation and excess sodium exposure.",
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
  headline: "Oysters and Zinc for Men: Bioavailability, Testosterone, and Research",
  description:
    "A medium oyster holds about 5 to 10 mg of zinc, so 2 to 3 cover a man's 11 mg a day. What oysters and oyster extract do, and don't do, for testosterone.",
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
      name: "Zinc status and serum testosterone levels of healthy adults",
      author: { "@type": "Person", name: "Prasad AS" },
      datePublished: "1996",
      isPartOf: { "@type": "Periodical", name: "Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "8875519" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/8875519/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Studies on the bioavailability of zinc in man. II. Absorption of zinc from organic and inorganic sources",
      author: { "@type": "Person", name: "Solomons NW" },
      datePublished: "1979",
      isPartOf: { "@type": "Periodical", name: "Journal of Laboratory and Clinical Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "458251" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/458251/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Studies on the bioavailability of zinc in humans: effects of heme and nonheme iron on the absorption of zinc",
      author: { "@type": "Person", name: "Solomons NW" },
      datePublished: "1981",
      isPartOf: { "@type": "Periodical", name: "The American Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "7223699" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/7223699/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Serum testosterone and urinary excretion of steroid hormone metabolites after administration of a high-dose zinc supplement",
      author: { "@type": "Person", name: "Koehler K" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "European Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "17882141" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/17882141/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Oysters" },
    { "@type": "Thing", name: "Zinc Bioavailability" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Leydig Cells" },
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
      name: "Oysters and Zinc for Men",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function OystersAndZincForMenSciencePage() {
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
            <li className="text-cloudText">Oysters &amp; Zinc</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Seafood &amp; Mineral Bioavailability</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Oysters and Zinc for Men: Bioavailability, Testosterone, and Research
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Quick Answer Block */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Oysters restore zinc levels, but do not supercharge testosterone in healthy men.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Human clinical trial evidence directly testing oyster consumption or oyster extract on testosterone levels is extremely thin, limited to just two small intervention studies. While oysters are exceptionally rich in bioavailable zinc, their reputed hormonal benefits stem entirely from correcting underlying zinc deficiencies rather than any unique compounds inherent to oysters.
          </p>
        </section>

        {/* Study Table */}
        <section aria-labelledby="studies-table-heading" className="mt-12">
          <h2
            id="studies-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Clinical Research &amp; Bioavailability Evidence Table
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Human clinical trials evaluating elemental zinc restriction, oyster mineral bioavailability, and serum steroidogenesis markers in males.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Study</th>
                  <th className="p-3 font-semibold md:p-4">Design &amp; Cohort</th>
                  <th className="p-3 font-semibold md:p-4">Key Outcome</th>
                  <th className="p-3 font-semibold md:p-4">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.study} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">
                      {row.study}
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
                    <td className="p-3 md:p-4">
                      <div>{row.design}</div>
                      <div className="text-[12px] text-mute">{row.sampleSize}</div>
                    </td>
                    <td className="p-3 md:p-4">{row.outcome}</td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-do-oysters-boost-t" className="mt-12">
          <h2
            id="h2-do-oysters-boost-t"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Do oysters actually boost testosterone in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The historical reputation of oysters as a testosterone booster relies heavily on culinary folklore rather than direct endocrine trials. Zinc is a required structural cofactor for luteinizing hormone receptor activity and 3β-hydroxysteroid dehydrogenase enzyme function in testicular Leydig cells. Controlled human restriction trials (Prasad et al. 1996, PMID 8875519) demonstrate that when men become zinc deficient, serum testosterone drops substantially, and restoring zinc intake normalizes hormone output. However, in men who already consume sufficient zinc, extra zinc intake from oysters or supplements does not raise testosterone further (Koehler et al. 2009, PMID 17882141).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Oysters support testosterone production exclusively by supplying elemental zinc to correct a deficiency, not by acting as an automatic hormonal booster in zinc-sufficient men.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-oyster-extract-supplements" className="mt-12">
          <h2
            id="h2-oyster-extract-supplements"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What does the clinical research say about oyster extract supplements?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Commercial oyster extract supplements are produced by freeze-drying whole oyster meat to concentrate trace minerals, taurine, and glycogen. While animal model studies indicate that oyster peptides can support Leydig cell viability under induced oxidative stress, direct human clinical trials evaluating commercial oyster extract on serum testosterone are extremely sparse, consisting of only two small intervention trials without active comparison against simple inorganic zinc salts. Furthermore, freeze-dried extracts show wide batch-to-batch variation in elemental mineral concentrations.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Clinical trial evidence for freeze-dried oyster extract is sparse and limited to small cohort studies that fail to demonstrate advantages over standard bioavailable zinc salts.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-zinc-bioavailability" className="mt-12">
          <h2
            id="h2-zinc-bioavailability"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is the zinc in oysters better absorbed than zinc supplements?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Human metabolic bioavailability trials (Solomons et al. 1979, PMID 458251; Solomons et al. 1981, PMID 7223699) confirm that elemental zinc bound within whole Atlantic oysters is absorbed efficiently by human intestinal enterocytes and is resistant to inhibition by nonheme iron. However, the same trials show that co-ingesting phytates—such as those found in corn tortillas or black beans—dramatically impairs zinc absorption from oysters. Chelated zinc supplements (such as zinc picolinate or bisglycinate) offer predictable elemental dosing without phytate binding risks when taken on an empty stomach.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            The organic zinc in oysters is highly bioavailable and resists iron competition, but phytates from co-ingested grains can still inhibit total mineral absorption.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-how-many-oysters" className="mt-12">
          <h2
            id="h2-how-many-oysters"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How many oysters would you need to eat for hormonal benefits?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Raw Eastern oysters contain approximately 5 to 10 mg of elemental zinc per medium oyster, meaning a small serving of 2 to 3 oysters supplies 15 to 30 mg of zinc—well above the 11 mg daily recommended intake for adult males. Because the body regulates systemic zinc homeostasis by adjusting intestinal zip-transporters, eating massive quantities of oysters does not linearly increase serum testosterone. Eating 2 to 4 oysters once or twice per week is more than adequate to maintain optimal zinc status for endocrine health.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Consuming two to three raw oysters provides over 100% of a man&apos;s daily 11 mg zinc requirement, making whole oysters an efficient dietary source for maintaining zinc repleteness.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <ul className="mt-2 space-y-1.5 list-disc pl-5 text-[14px]">
            <li>
              Only two randomized human trials explicitly isolate oyster intake, making broad clinical efficacy claims scientifically unjustified.
            </li>
            <li>
              Oyster extracts suffer from natural variability in heavy metal content and batch-to-batch mineral concentration.
            </li>
            <li>
              Trial cohorts are small and frequently lack control groups consuming equivalent inorganic zinc doses.
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
            Verified PubMed Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Prasad AS, Mantzoros CS, Beck FW, Hess JW, Brewer GJ. (1996)
              </p>
              <p className="text-[13px] text-mute">
                Zinc status and serum testosterone levels of healthy adults. <em>Nutrition</em> 12(5): 344-8.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/8875519/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 8875519
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Solomons NW, Jacob RA, Lo GS, Sandstead HH. (1979)
              </p>
              <p className="text-[13px] text-mute">
                Studies on the bioavailability of zinc in man. II. Absorption of zinc from organic and inorganic sources. <em>J Lab Clin Med</em> 94(2): 335-43.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/458251/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 458251
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Solomons NW, Jacob RA. (1981)
              </p>
              <p className="text-[13px] text-mute">
                Studies on the bioavailability of zinc in humans: effects of heme and nonheme iron on the absorption of zinc. <em>Am J Clin Nutr</em> 34(4): 475-82.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/7223699/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 7223699
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Koehler K, Parr MK, Geyer H, Mester J, Schänzer W. (2009)
              </p>
              <p className="text-[13px] text-mute">
                Serum testosterone and urinary excretion of steroid hormone metabolites after administration of a high-dose zinc supplement. <em>Eur J Clin Nutr</em> 63(1): 65-70.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/17882141/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 17882141
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Links Section (Linked to required target pages) */}
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
              <p className="font-semibold text-bone">Zinc for Men Over 40 &amp; 50</p>
              <p className="mt-1 text-[13px] text-mute">
                Dosage guidelines, deficiency restoration, and trial evidence in older males.
              </p>
            </Link>
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition &amp; Testosterone Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary levers, fat thresholds, and micronutrient support.
              </p>
            </Link>
            <Link
              href="/guides/best-breakfasts-for-testosterone-ranked"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Best Breakfasts for Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">
                Five realistic breakfast options ranked strictly by clinical evidence quality.
              </p>
            </Link>
            <Link
              href="/science/selenium-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Selenium &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Human trial evidence on trace mineral status and male endocrine health.
              </p>
            </Link>
            <Link
              href="/science/eggs-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Whole Eggs &amp; Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">
                What randomized clinical trials show about egg yolk lipids and protein synthesis.
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

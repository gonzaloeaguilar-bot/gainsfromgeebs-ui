import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/pomegranate-and-testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Pomegranate Juice and Testosterone: What Trials Show",
  description:
    "Pomegranate juice supports nitric oxide and blood flow, but trials show no reliable rise in serum testosterone. The study table and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Pomegranate Juice and Testosterone: What Trials Show",
    description:
      "Clinical evidence breakdown on pomegranate juice, ellagitannins, serum testosterone, nitric oxide protection, and male vascular health.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Pomegranate and testosterone clinical evidence review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomegranate Juice and Testosterone: What Trials Show",
    description:
      "What human trials actually show about pomegranate juice, extract supplements, serum testosterone elevation, and nitric oxide bioactivity.",
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
  doi: string;
};

const STUDY_ROWS: StudyRow[] = [
  {
    study: "Forest CP et al. (2007)",
    design: "Randomized Double-Blind Placebo-Controlled Crossover Trial",
    sampleSize: "61 adult men with mild-to-moderate ED",
    outcome:
      "Pomegranate juice consumption trended toward improved International Index of Erectile Function scores; no direct serum testosterone elevation was observed.",
    grade: "Grade A (RCT Crossover)",
    pmid: "17568759",
    doi: "10.1038/sj.ijir.3901570",
  },
  {
    study: "Pandit SL et al. (2022)",
    design: "Randomized Double-Blind Placebo-Controlled Study",
    sampleSize: "120 aging male participants",
    outcome:
      "Standardized pomegranate rind and cocoa seed extract blend reduced aging male symptom scores and modestly supported free testosterone restoration relative to placebo.",
    grade: "Grade A (RCT)",
    pmid: "35928723",
    doi: "10.7150/ijms.73645",
  },
  {
    study: "Ammar A et al. (2020)",
    design: "Double-Blind Placebo-Controlled Crossover Trial",
    sampleSize: "9 elite weightlifters",
    outcome:
      "Natural polyphenol-rich pomegranate juice attenuated post-exercise oxidative stress and acute muscle damage without altering systemic testosterone trajectories.",
    grade: "Grade A (RCT)",
    pmid: "32143716",
    doi: "10.1186/s12970-020-00345-w",
  },
  {
    study: "Stockton A et al. (2017)",
    design: "Double-Blind Placebo-Controlled Randomized Clinical Trial",
    sampleSize: "129 healthy adult volunteers",
    outcome:
      "Pomegranate extract intake for 4 weeks significantly reduced systolic blood pressure and salivary cortisol without altering serum total testosterone.",
    grade: "Grade A (RCT)",
    pmid: "29152243",
    doi: "10.1017/jns.2017.36",
  },
  {
    study: "Tsang C et al. (2012)",
    design: "Controlled Human Intervention Study",
    sampleSize: "28 healthy adult subjects",
    outcome:
      "Pure pomegranate juice consumption reduced urinary glucocorticoid excretion and blood pressure, confirming systemic vascular benefits rather than testicular stimulation.",
    grade: "Grade B (Controlled Trial)",
    pmid: "25191556",
    doi: "10.1017/jns.2012.10",
  },
];

const faqs = [
  {
    question: "Does pomegranate juice increase testosterone in men?",
    answer:
      "Pomegranate juice and polyphenol extracts provide potent antioxidant benefits that support nitric oxide availability and endothelial function, but clinical trials show inconsistent effects on direct serum testosterone elevation. While some acute trials note modest increases in salivary testosterone, larger clinical studies indicate that primary benefits are vascular rather than direct gonadal stimulation.",
  },
  {
    question: "What does the clinical research say about pomegranate extract?",
    answer:
      "Controlled human studies show that standardized pomegranate ellagitannin extracts lower markers of systemic oxidative stress and reduce salivary cortisol levels. In aging cohorts with elevated oxidative stress, extract blends demonstrate modest support for free testosterone preservation, though effect sizes remain smaller than those driven by lifestyle fundamentals like sleep and exercise.",
  },
  {
    question: "How does pomegranate impact blood flow and nitric oxide?",
    answer:
      "Pomegranate polyphenols—specifically punicalagins and ellagic acid—act as powerful free radical scavengers that prevent the oxidative inactivation of vascular nitric oxide. By preserving endogenous nitric oxide bioactivity, pomegranate intake enhances endothelial function and flow-mediated dilation.",
  },
  {
    question: "Is pomegranate juice better than extract supplements for male health?",
    answer:
      "Whole pomegranate juice delivers active polyphenols alongside naturally occurring vitamins, but introduces substantial liquid sugar calories. Concentrated ellagitannin extract capsules provide equivalent antioxidant bioactivity without added fructose, making extracts preferable for men monitoring total caloric intake.",
  },
  {
    question: "Can drinking pomegranate juice replace medical care or core training habits?",
    answer:
      "No. Pomegranate juice and extracts serve as dietary sources of antioxidant polyphenols. They are not medical therapies or functional replacements for progressive resistance training, adequate total energy intake, sufficient sleep, and physician-supervised healthcare.",
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
    "Pomegranate and Testosterone: What Clinical Research Shows on Hormones & Blood Flow",
  description:
    "An evidence-graded examination of human clinical trials evaluating pomegranate juice, ellagitannin extracts, serum testosterone, and vascular nitric oxide bioactivity.",
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
      name: "Efficacy and safety of pomegranate juice on erectile dysfunction: a randomized, double-blind, placebo-controlled crossover study",
      author: { "@type": "Person", name: "Forest CP" },
      datePublished: "2007",
      isPartOf: { "@type": "Periodical", name: "International Journal of Impotence Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "17568759" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1038/sj.ijir.3901570",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/17568759/",
        "https://doi.org/10.1038/sj.ijir.3901570",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A proprietary blend of standardized Punica granatum fruit rind and Theobroma cocoa seed extracts mitigates aging males' symptoms: A randomized, double-blind, placebo-controlled study",
      author: { "@type": "Person", name: "Pandit SL" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "International Journal of Medical Sciences" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35928723" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.7150/ijms.73645",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35928723/",
        "https://doi.org/10.7150/ijms.73645",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effects of natural polyphenol-rich pomegranate juice on the acute and delayed response of Homocysteine and steroidal hormones following weightlifting exercises: a double-blind, placebo-controlled trial",
      author: { "@type": "Person", name: "Ammar A" },
      datePublished: "2020",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "32143716" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12970-020-00345-w",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/32143716/",
        "https://doi.org/10.1186/s12970-020-00345-w",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of pomegranate extract on blood pressure and anthropometry in adults: a double-blind placebo-controlled randomised clinical trial",
      author: { "@type": "Person", name: "Stockton A" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of Nutritional Science" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29152243" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1017/jns.2017.36",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/29152243/",
        "https://doi.org/10.1017/jns.2017.36",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Intake of polyphenol-rich pomegranate pure juice influences urinary glucocorticoids, blood pressure and homeostasis model assessment of insulin resistance in human volunteers",
      author: { "@type": "Person", name: "Tsang C" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "Journal of Nutritional Science" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "25191556" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1017/jns.2012.10",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/25191556/",
        "https://doi.org/10.1017/jns.2012.10",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Pomegranate" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Nitric Oxide" },
    { "@type": "Thing", name: "Endothelial Function" },
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
      name: "Pomegranate and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function PomegranateSciencePage() {
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
            <li className="text-cloudText">Pomegranate &amp; Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Polyphenol &amp; Vascular Research</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Pomegranate and Testosterone: What Clinical Research Shows on Hormones &amp; Blood Flow
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
            Pomegranate supports vascular nitric oxide, but does not directly surge serum testosterone.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Pomegranate juice and polyphenol extracts provide potent antioxidant benefits that support nitric oxide availability and endothelial function, but clinical trials show inconsistent effects on direct serum testosterone elevation. While some acute trials note modest increases in salivary testosterone, larger clinical studies indicate that primary benefits are vascular rather than direct gonadal stimulation.
          </p>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-table-heading" className="mt-12">
          <h2
            id="evidence-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Pomegranate Human Clinical Trial Summary
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Controlled human interventions evaluating pomegranate juice and standardized ellagitannin extracts across vascular, hormonal, and exercise recovery outcomes.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Study &amp; Cohort</th>
                  <th className="p-3 md:p-4 font-semibold">Design &amp; Duration</th>
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
        <section aria-labelledby="h2-does-pomegranate-increase-testosterone" className="mt-12">
          <h2
            id="h2-does-pomegranate-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does pomegranate juice increase testosterone in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled clinical research demonstrates that regular consumption of pomegranate juice does not cause a sustained surge in serum total or free testosterone in healthy adult men. While early unblinded pilot trials reported temporary increases in salivary androgen markers following acute intake, rigorous double-blind trials—such as those by Stockton et al. (2017, PMID 29152243) and Ammar et al. (2020, PMID 32143716)—confirm that serum testosterone levels remain essentially unchanged. Pomegranate intake primarily impacts peripheral vascular tone rather than central gonadotropin secretion or direct testicular steroidogenesis.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Clinical trials demonstrate that while pomegranate polyphenols support vascular nitric oxide, they do not produce significant or sustained elevations in serum total testosterone in healthy men.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-clinical-research-extract" className="mt-12">
          <h2
            id="h2-clinical-research-extract"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What does the clinical research say about pomegranate extract?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Standardized pomegranate fruit rind extracts—rich in punicalagins, ellagic acid, and gallic acid—have been evaluated in double-blind placebo-controlled human trials. In a 56-day RCT by Pandit SL et al. (2022, PMID 35928723), aging men receiving a standardized pomegranate and cocoa extract blend experienced improvements in symptom inventory scores alongside modest support for free testosterone restoration. The underlying mechanism appears linked to reduced systemic oxidative degradation of Leydig cell membranes rather than direct androgen receptor activation.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Standardized pomegranate extract blends can reduce oxidative stress markers and age-related symptoms, but gains in free testosterone remain minimal and baseline-dependent.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-blood-flow-nitric-oxide" className="mt-12">
          <h2
            id="h2-blood-flow-nitric-oxide"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How does pomegranate impact blood flow and nitric oxide?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The primary validated physiological benefit of pomegranate consumption in men centers on endothelial function and nitric oxide bioactivity. Ellagitannins in pomegranate act as potent superoxide scavengers, preventing reactive oxygen species from breaking down vascular nitric oxide into peroxynitrite. In a randomized crossover trial by Forest CP et al. (2007, PMID 17568759), men with mild-to-moderate erectile dysfunction showed positive trends in erectile scores driven by enhanced flow-mediated dilation. Similar human trials by Tsang C et al. (2012, PMID 25191556) confirmed reduced systolic blood pressure and improved systemic vascular reactivity.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Pomegranate&apos;s primary male health contribution operates through endothelial protection and nitric oxide preservation, enhancing flow-mediated dilation rather than direct Leydig cell stimulation.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-juice-vs-extract" className="mt-12">
          <h2
            id="h2-juice-vs-extract"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is pomegranate juice better than extract supplements for male health?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Choosing between whole pomegranate juice and concentrated extract capsules depends on caloric management and daily carbohydrate targets. Fresh or pure pomegranate juice delivers natural polyphenols alongside potassium and vitamin C, but a standard 8-ounce glass contains approximately 30 grams of carbohydrates and 130 calories. For men in a weight loss cut or managing tight energy budgets, encapsulated ellagitannin extract supplements deliver dense antioxidant compounds without extra liquid sugar calories.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Whole pomegranate juice provides active ellagitannins alongside dietary sugars, whereas concentrated extracts deliver dense polyphenols without additional caloric load.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Early trials claiming dramatic salivary androgen spikes failed to replicate consistently in broader serum-based clinical cohorts. High natural sugar content in pomegranate juice can alter calorie balance if consumed in large quantities without dietary adjustment. Studies vary significantly between whole juice administration and concentrated ellagitannin extract capsules.
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
                Forest CP, Padma-Nathan H, Lakin MM. (2007)
              </p>
              <p className="text-[13px] text-mute">
                Efficacy and safety of pomegranate juice on erectile dysfunction: a randomized, double-blind, placebo-controlled crossover study. <em>Int J Impot Res</em> 19(6): 564-7.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/17568759/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 17568759
                </a>
                <a
                  href="https://doi.org/10.1038/sj.ijir.3901570"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1038/sj.ijir.3901570
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Pandit SL, Yaligar D, Halemane M, Bhat A. (2022)
              </p>
              <p className="text-[13px] text-mute">
                A proprietary blend of standardized Punica granatum fruit rind and Theobroma cocoa seed extracts mitigates aging males&apos; symptoms: A randomized, double-blind, placebo-controlled study. <em>Int J Med Sci</em> 19(8): 1290-1299.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/35928723/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 35928723
                </a>
                <a
                  href="https://doi.org/10.7150/ijms.73645"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.7150/ijms.73645
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Ammar A, et al. (2020)
              </p>
              <p className="text-[13px] text-mute">
                Effects of natural polyphenol-rich pomegranate juice on the acute and delayed response of Homocysteine and steroidal hormones following weightlifting exercises: a double-blind, placebo-controlled trial. <em>J Int Soc Sports Nutr</em> 17(1): 15.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32143716/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 32143716
                </a>
                <a
                  href="https://doi.org/10.1186/s12970-020-00345-w"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1186/s12970-020-00345-w
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Stockton A, Farhat G, McDougall GJ, Al-Dujaili EAS. (2017)
              </p>
              <p className="text-[13px] text-mute">
                Effect of pomegranate extract on blood pressure and anthropometry in adults: a double-blind placebo-controlled randomised clinical trial. <em>J Nutr Sci</em> 6: e39.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/29152243/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 29152243
                </a>
                <a
                  href="https://doi.org/10.1017/jns.2017.36"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1017/jns.2017.36
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Tsang C, Smail NF, Almoosawi S, Davidson I, Al-Dujaili EA. (2012)
              </p>
              <p className="text-[13px] text-mute">
                Intake of polyphenol-rich pomegranate pure juice influences urinary glucocorticoids, blood pressure and homeostasis model assessment of insulin resistance in human volunteers. <em>J Nutr Sci</em> 1: e9.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/25191556/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 25191556
                </a>
                <a
                  href="https://doi.org/10.1017/jns.2012.10"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1017/jns.2012.10
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Linking Footer - strictly includes brief links */}
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
                Evidence-based dietary strategies for male hormone optimization.
              </p>
            </Link>
            <Link
              href="/science/olive-oil"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Olive Oil &amp; Endocrine Health</p>
              <p className="mt-1 text-[13px] text-mute">
                Extra virgin olive oil, Leydig cell lipid composition, and hormone research.
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
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Dosage, deficiency restoration, and testosterone research for adult men.
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

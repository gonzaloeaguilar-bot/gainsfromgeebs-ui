import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/walnuts-and-male-fertility";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Walnuts and Sperm Count: What the Two Trials Found",
  description:
    "Two randomized trials in healthy young men: daily walnuts improved sperm motility and vitality. Why the evidence is still thin, and its honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Walnuts and Sperm Count: What the Two Trials Found",
    description:
      "Clinical evidence breakdown on walnut supplementation, alpha-linolenic acid, sperm motility, vitality, morphology, and male reproductive health.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Walnuts and male fertility clinical evidence review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walnuts and Sperm Count: What the Two Trials Found",
    description:
      "What randomized controlled human trials actually show about daily walnut intake, sperm cell membrane lipidomics, and male fertility.",
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
    study: "Robbins WA et al. (2012)",
    design: "Randomized Parallel Two-Group Controlled Trial",
    sampleSize: "117 healthy young men (ages 21–35)",
    outcome:
      "75 g/day whole walnuts for 12 weeks significantly improved sperm motility, vitality, and morphology without altering sperm concentration.",
    grade: "Grade A (RCT)",
    pmid: "22895856",
    doi: "10.1095/biolreprod.112.101634",
  },
  {
    study: "Salas-Huetos A et al. (2018)",
    design: "Randomized Controlled Trial (FERTINUTS)",
    sampleSize: "119 healthy young men (ages 18–35)",
    outcome:
      "60 g/day mixed nut supplementation (including 30 g walnuts) for 14 weeks significantly increased total sperm count, motility, vitality, and normal morphology while reducing sperm DNA fragmentation.",
    grade: "Grade A (RCT)",
    pmid: "30475967",
    doi: "10.1093/ajcn/nqy181",
  },
  {
    study: "Salas-Huetos A et al. (2021)",
    design: "Randomized Controlled Trial (Epigenetic Analysis)",
    sampleSize: "72 healthy men from FERTINUTS cohort",
    outcome:
      "Nut supplementation induced subtle epigenetic modulations in sperm DNA, establishing 36 differentially methylated genomic regions.",
    grade: "Grade A (RCT Epigenetic Analysis)",
    pmid: "32966683",
    doi: "10.1111/andr.12911",
  },
  {
    study: "Salas-Huetos A et al. (2019)",
    design: "Systematic Review of Human Evidence",
    sampleSize: "Human intervention and observational cohorts",
    outcome:
      "Confirmed that plant-based omega-3 fatty acids and antioxidants enhance sperm membrane fluidity, but emphasized that evidence remains restricted to healthy young cohorts.",
    grade: "Grade B (Systematic Review)",
    pmid: "31375368",
    doi: "10.1016/j.repbio.2019.07.005",
  },
];

const faqs = [
  {
    question: "Do walnuts improve sperm quality and motility in men?",
    answer:
      "Yes, randomized controlled trials demonstrate that adding 75 grams of whole walnuts daily to a Western-style diet significantly improves sperm motility, vitality (percentage of live sperm), and normal morphology over 12 weeks in healthy young men. However, current evidence is limited to non-clinical cohorts of healthy males and does not establish walnuts as a standalone cure for clinical infertility.",
  },
  {
    question: "How do the omega-3 fats in walnuts affect sperm cell membranes?",
    answer:
      "Walnuts are exceptionally rich in alpha-linolenic acid (ALA), a plant-based omega-3 fatty acid, as well as polyphenol antioxidants. When consumed regularly, ALA and its metabolites integrate into the phospholipid bilayer of sperm cell membranes, decreasing lipid peroxidation and preserving the cellular fluidity necessary for sperm motility and fertilization.",
  },
  {
    question: "Does eating walnuts increase testosterone or just sperm health?",
    answer:
      "Clinical dietary trials show that walnut consumption improves semen analysis parameters and sperm cell membrane fatty acid composition without causing significant changes in serum total testosterone, luteinizing hormone (LH), or follicle-stimulating hormone (FSH). The benefits are localized to cellular membrane integrity and antioxidant protection rather than endocrine stimulation.",
  },
  {
    question: "How many walnuts were used in clinical fertility studies?",
    answer:
      "The landmark human clinical trial by Robbins et al. used 75 grams of whole shelled walnuts daily (approximately 2.5 ounces or two handfuls), supplying about 460 calories and 6 grams of plant-based ALA. In the FERTINUTS trial by Salas-Huetos et al., participants consumed 60 grams of mixed nuts daily, including 30 grams of walnuts.",
  },
  {
    question: "Can eating walnuts replace medical fertility care or lifestyle changes?",
    answer:
      "No. Walnuts provide high-quality polyunsaturated fatty acids and antioxidants, but dietary nut supplementation is not a substitute for medical evaluation, treatment of underlying clinical subfertility, or core health practices such as maintaining healthy body fat levels, exercising regularly, and prioritizing adequate sleep.",
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
  headline: "Walnuts and Male Fertility: What Clinical Research Shows on Sperm Quality & ALA",
  description:
    "An evidence-graded examination of human clinical trials evaluating walnut dietary supplementation, sperm motility, vitality, membrane lipidomics, and honest clinical limits.",
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
      name: "Walnuts improve semen quality in men consuming a Western-style diet: randomized control dietary intervention trial",
      author: { "@type": "Person", name: "Robbins WA" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "Biology of Reproduction" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "22895856" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1095/biolreprod.112.101634",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/22895856/",
        "https://doi.org/10.1095/biolreprod.112.101634",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of nut consumption on semen quality and functionality in healthy men consuming a Western-style diet: a randomized controlled trial",
      author: { "@type": "Person", name: "Salas-Huetos A" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "The American Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30475967" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1093/ajcn/nqy181",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/30475967/",
        "https://doi.org/10.1093/ajcn/nqy181",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Sperm DNA methylation changes after short-term nut supplementation in healthy men consuming a Western-style diet",
      author: { "@type": "Person", name: "Salas-Huetos A" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Andrology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "32966683" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1111/andr.12911",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/32966683/",
        "https://doi.org/10.1111/andr.12911",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Diet and sperm quality: Nutrients, foods and dietary patterns",
      author: { "@type": "Person", name: "Salas-Huetos A" },
      datePublished: "2019",
      isPartOf: { "@type": "Periodical", name: "Reproductive Biology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "31375368" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.repbio.2019.07.005",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/31375368/",
        "https://doi.org/10.1016/j.repbio.2019.07.005",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Walnuts" },
    { "@type": "Thing", name: "Sperm Motility" },
    { "@type": "Thing", name: "Alpha-Linolenic Acid" },
    { "@type": "Thing", name: "Male Fertility" },
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
      name: "Walnuts and Male Fertility",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function WalnutsAndMaleFertilitySciencePage() {
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
            <li className="text-cloudText">Walnuts &amp; Male Fertility</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Dietary Lipidomics &amp; Semen Quality</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Walnuts and Male Fertility: What Clinical Research Shows on Sperm Quality &amp; ALA
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
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
            Walnuts improve sperm motility and vitality, but evidence is thin and restricted to healthy cohorts.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Human trial data on walnuts and male fertility is thin, resting on just two randomized controlled trials in healthy young males. While daily walnut intake improves sperm motility, vitality, and cellular lipid profiles due to their alpha-linolenic acid (ALA) and antioxidant content, evidence is insufficient to declare walnuts a standalone clinical treatment for subfertility.
          </p>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-table-heading" className="mt-12">
          <h2
            id="evidence-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Walnut Clinical Trial &amp; Human Study Summary
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Controlled human interventions evaluating whole walnut and mixed nut supplementation across semen parameters, membrane lipidomics, and sperm DNA integrity.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Study &amp; Cohort</th>
                  <th className="p-3 font-semibold md:p-4">Design &amp; Duration</th>
                  <th className="p-3 font-semibold md:p-4">Observed Outcome</th>
                  <th className="p-3 font-semibold md:p-4">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.study} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">
                      {row.study}
                      <span className="mt-0.5 block text-[12px] font-normal text-mute">
                        {row.sampleSize}
                      </span>
                    </td>
                    <td className="p-3 md:p-4">{row.design}</td>
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

        {/* Section 1 */}
        <section aria-labelledby="h2-do-walnuts-improve-sperm-quality" className="mt-12">
          <h2
            id="h2-do-walnuts-improve-sperm-quality"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Do walnuts improve sperm quality and motility in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In a randomized controlled trial published in <em>Biology of Reproduction</em>, Robbins et al. (2012, PMID 22895856) assigned 117 healthy young men consuming a Western-style diet to either add 75 grams of whole walnuts daily or avoid tree nuts completely for 12 weeks. At the conclusion of the intervention, men consuming walnuts demonstrated statistically significant improvements in sperm motility, vitality (percentage of live cells), and normal morphologic structure compared to the control arm. Similarly, the 14-week FERTINUTS randomized trial by Salas-Huetos et al. (2018, PMID 30475967) observed improvements in total sperm count, motility, and vitality following daily supplementation with 60 grams of mixed nuts (including 30 grams of walnuts).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Randomized trials show that 75 grams of daily walnuts improve sperm motility and vitality in young men, but these gains reflect dietary polyunsaturated fat optimization rather than a cure for clinical infertility.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-omega-3-fats-sperm-membranes" className="mt-12">
          <h2
            id="h2-omega-3-fats-sperm-membranes"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How do the omega-3 fats in walnuts affect sperm cell membranes?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Sperm cell plasma membranes require high concentrations of polyunsaturated fatty acids (PUFAs) to maintain membrane fluidity, acrosome reaction capability, and flagellar motility. Walnuts are uniquely concentrated in alpha-linolenic acid (ALA)—a essential 18-carbon plant-based omega-3 fatty acid—alongside tocopherols and polyphenols. Clinical fatty acid profiling from trial cohorts demonstrates that daily walnut intake significantly increases serum ALA levels and shifts the overall omega-6 to omega-3 ratio in sperm membranes. This structural fatty acid enrichment attenuates lipid peroxidation, protecting membrane phospholipids against reactive oxygen species.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Alpha-linolenic acid (ALA) and antioxidants in walnuts integrate into sperm cell phospholipid membranes, shielding lipids from peroxidative damage and preserving membrane fluidity essential for fertilization.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-walnuts-testosterone-vs-sperm-health" className="mt-12">
          <h2
            id="h2-walnuts-testosterone-vs-sperm-health"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does eating walnuts increase testosterone or just sperm health?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Endocrine evaluations conducted during walnut dietary intervention trials show that walnut consumption does not cause significant changes in circulating total testosterone, free testosterone, luteinizing hormone (LH), or follicle-stimulating hormone (FSH) in healthy men. While healthy dietary fats are essential for steroidogenesis, adding 75 grams of walnuts to an already adequate diet operates at the cellular lipid level rather than triggering central pituitary-gonadal signaling. Walnuts improve semen parameters by upgrading sperm membrane architecture and reducing oxidative stress, not by raising serum androgen levels.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Walnut consumption improves semen parameters and membrane fatty acid profiles without altering serum total testosterone, LH, or FSH levels.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-how-many-walnuts-in-clinical-studies" className="mt-12">
          <h2
            id="h2-how-many-walnuts-in-clinical-studies"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How many walnuts were used in clinical fertility studies?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The primary human trial by Robbins et al. utilized a dosage of 75 grams of whole shelled walnuts per day (approximately 2.5 ounces, or two generous handfuls). This daily serving provides roughly 460 calories, 42 grams of total fat, and 6 grams of plant-based ALA. In the 14-week FERTINUTS trial (Salas-Huetos et al. 2018), participants consumed 60 grams of mixed nuts daily, comprising 30 grams of walnuts, 15 grams of almonds, and 15 grams of hazelnuts. Men adding whole nuts to their daily routine must substitute them for refined carbohydrate or saturated fat sources to prevent unwanted energy surplus and belly fat accumulation.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Clinical trials utilized 75 grams of walnuts per day (about 2.5 ounces or 460 calories), requiring intentional replacement of dietary saturated fats to prevent unintentional weight gain.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Only two clinical trials exist, both conducted in non-clinical cohorts of young, healthy males rather than subfertile men seeking medical treatment. Both landmark trials received partial funding from agricultural trade organizations (the California Walnut Board), warranting an objective reading of effect sizes. Additionally, walnuts supply plant-based alpha-linolenic acid (ALA) rather than preformed marine EPA/DHA, which exhibit higher enzymatic conversion efficiency into cell membrane phospholipids.
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
                Robbins WA, Xun L, FitzGerald LZ, Esguerra S, Henning SM, Carpenter CL. (2012)
              </p>
              <p className="text-[13px] text-mute">
                Walnuts improve semen quality in men consuming a Western-style diet: randomized control dietary intervention trial. <em>Biol Reprod</em> 87(4): 101.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/22895856/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 22895856
                </a>
                <a
                  href="https://doi.org/10.1095/biolreprod.112.101634"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  DOI: 10.1095/biolreprod.112.101634
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Salas-Huetos A, Bulló M, Salas-Salvadó J, et al. (2018)
              </p>
              <p className="text-[13px] text-mute">
                Effect of nut consumption on semen quality and functionality in healthy men consuming a Western-style diet: a randomized controlled trial. <em>Am J Clin Nutr</em> 108(5): 953-962.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/30475967/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 30475967
                </a>
                <a
                  href="https://doi.org/10.1093/ajcn/nqy181"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  DOI: 10.1093/ajcn/nqy181
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Salas-Huetos A, James ER, Salas-Salvadó J, Bulló M, Aston KI, Carrell DT, Jenkins TG. (2021)
              </p>
              <p className="text-[13px] text-mute">
                Sperm DNA methylation changes after short-term nut supplementation in healthy men consuming a Western-style diet. <em>Andrology</em> 9(1): 260-268.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32966683/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 32966683
                </a>
                <a
                  href="https://doi.org/10.1111/andr.12911"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  DOI: 10.1111/andr.12911
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Salas-Huetos A, Bulló M, Salas-Salvadó J. (2019)
              </p>
              <p className="text-[13px] text-mute">
                Diet and sperm quality: Nutrients, foods and dietary patterns. <em>Reprod Biol</em> 19(3): 219-224.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/31375368/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  PubMed PMID: 31375368
                </a>
                <a
                  href="https://doi.org/10.1016/j.repbio.2019.07.005"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cloudText underline hover:text-bone"
                >
                  DOI: 10.1016/j.repbio.2019.07.005
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
              href="/science/omega-3-and-hormones"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Omega-3 &amp; Hormones Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Fatty acid biology, Leydig cell membrane fluidity, and testicular function.
              </p>
            </Link>
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition &amp; Testosterone Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary fat and micronutrient targets for male hormone health.
              </p>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition for Longevity</p>
              <p className="mt-1 text-[13px] text-mute">
                Polyphenol density, metabolic risk markers, and long-term healthspan.
              </p>
            </Link>
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Male Fertility Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Spermatogenesis, seminal plasma mineral concentrations, and clinical evidence.
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

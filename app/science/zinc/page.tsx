import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import TitanForgeShopNote from "@/components/TitanForgeShopNote";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/zinc";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-10-08";

export const metadata: Metadata = {
  title: "Zinc for Men Over 40: Dosage and Testosterone Evidence",
  description:
    "Men need 11 mg of zinc a day. Zinc restores testosterone in deficient men but does not raise it further when levels are adequate. Dose and limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Zinc for Men Over 40 and 50: Dosage, Testosterone, and Research",
    description:
      "Zinc's testosterone link is real but conditional: supplementation restores testosterone in deficient men, not in those with sufficient levels.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Zinc for Men Over 40 and 50 — what the research shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinc for Men Over 40 and 50: Dosage, Testosterone, and Research",
    description:
      "What zinc does for testosterone restoration, dosage guidelines, upper limits, and what the evidence actually supports.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  group: string;
  rda: string;
  range: string;
  grade: "B" | "—";
  gradeLabel: string;
  pmid?: string;
  doi?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    group: "Healthy adult men, general",
    rda: "11mg/day",
    range: "n/a (deficiency-dependent)",
    grade: "—",
    gradeLabel: "—",
  },
  {
    group: "Men with confirmed deficiency",
    rda: "11mg/day floor",
    range: "supplementation studied up to ~40mg/day short-term",
    grade: "B",
    gradeLabel: "Grade B — Moderate trial evidence",
    pmid: "8875519",
    doi: "10.1016/s0899-9007(96)80058-x",
  },
  {
    group: "Upper intake caution",
    rda: "—",
    range: "avoid habitual intake above ~40mg/day without clinical guidance",
    grade: "—",
    gradeLabel: "—",
  },
];

const faqs = [
  {
    question: "Should every man over 50 take a zinc supplement?",
    answer:
      "No — only if diet or a blood test suggests you're actually low. Supplementing without a reason to believe you're deficient hasn't been shown to add benefit.",
  },
  {
    question: "What's the right zinc dose for testosterone support?",
    answer:
      "Research on deficient men has generally used doses in the 15-40mg/day range short-term. This isn't a personal prescription — check with a doctor, especially at the higher end.",
  },
  {
    question: "Can too much zinc cause problems?",
    answer:
      "Yes — habitually high zinc intake can interfere with copper absorption. More is not automatically better.",
  },
  {
    question: "What foods are naturally high in zinc?",
    answer:
      "Red meat, shellfish (especially oysters), pumpkin seeds, and legumes are the common whole-food sources.",
  },
  {
    question: "Does zinc matter more than protein or sleep for testosterone?",
    answer:
      "No. Zinc is a conditional, deficiency-dependent lever. Training, protein, sleep, and body composition have much stronger evidence behind them.",
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
    "Zinc for Men Over 40 and 50: Dosage, Testosterone, and What the Research Shows",
  description:
    "An evidence-graded guide to zinc supplementation, deficiency restoration, testosterone links, and safety upper bounds in adult men.",
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
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/s0899-9007(96)80058-x",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/8875519/",
        "https://doi.org/10.1016/s0899-9007(96)80058-x",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Serum testosterone and urinary excretion of steroid hormone metabolites after administration of a high-dose zinc supplement",
      author: { "@type": "Person", name: "Koehler K" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "European Journal of Clinical Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "17882141" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1038/sj.ejcn.1602899",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/17882141/",
        "https://doi.org/10.1038/sj.ejcn.1602899",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Zinc" },
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
      name: "Zinc",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function ZincSciencePage() {
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
            <li className="text-cloudText">Zinc</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Compound Entity Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Zinc for Men Over 40 and 50: Dosage, Testosterone, and What the
            Research Shows
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="text-bone font-medium">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
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
            Men need 11 mg of zinc a day, and the upper limit is 40 mg a day from food and supplements combined.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Zinc only raised testosterone in men who were short on it. In older men with marginal zinc deficiency, about 30 mg a day of zinc gluconate for six months took serum testosterone from 8.3 to 16.0 nmol/L (Prasad et al. 1996, PMID 8875519). In 14 regularly training men who already ate 12 to 23 mg a day, a high-dose zinc supplement raised blood zinc but did not change total or free testosterone (Koehler et al. 2009, PMID 17882141). So the dose that matters is the one that gets you to 11 mg, and going past 40 mg a day for long stretches risks copper deficiency. Intake numbers: NIH Office of Dietary Supplements zinc fact sheet.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Zinc&apos;s testosterone link is real but conditional: the research shows
            zinc supplementation restores testosterone in men who are actually
            deficient — it does not reliably raise testosterone further in men
            who already get enough. Zinc deficiency becomes more common with age,
            especially in men eating a limited diet or dealing with GI issues that
            reduce absorption. Before adding a zinc supplement, the more useful
            question is whether you&apos;re likely low in the first place (limited red
            meat/shellfish intake, certain medications, digestive conditions) —
            not whether zinc is &quot;good for testosterone&quot; in general.
          </p>
        </section>

        {/* Dosage Table */}
        <section aria-labelledby="dosage-table-heading" className="mt-12">
          <h2
            id="dosage-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Zinc Intake & Restoration Evidence Table
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Controlled human trials demonstrate that zinc restoration works when deficiency is present, while supplementation in zinc-replete men yields no extra testosterone output.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Group</th>
                  <th className="p-3 md:p-4 font-semibold">Typical RDA</th>
                  <th className="p-3 md:p-4 font-semibold">Studied &quot;restoration&quot; range</th>
                  <th className="p-3 md:p-4 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.group} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 md:p-4 font-medium text-bone">{row.group}</td>
                    <td className="p-3 md:p-4">{row.rda}</td>
                    <td className="p-3 md:p-4">
                      {row.range}
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
        <section aria-labelledby="h2-raise-t" className="mt-12">
          <h2
            id="h2-raise-t"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does zinc actually raise testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled trials (Prasad et al. 1996, PMID 8875519) confirm that zinc restriction significantly reduces serum testosterone in healthy men, whereas zinc supplementation in zinc-deficient men restores testosterone back to baseline. However, trials in zinc-adequate men (Koehler et al. 2009, PMID 17882141) show no additional hormonal increase from extra zinc intake.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Zinc supplementation restores suppressed testosterone levels in men with inadequate zinc status, but adding more zinc to an already zinc-sufficient diet produces no additional hormonal benefit.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-dosage-50" className="mt-12">
          <h2
            id="h2-dosage-50"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much zinc should a man over 50 take?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The standard recommended dietary allowance for adult men is 11 mg per day from all food and supplement sources. Clinical studies examining deficiency correction have safely evaluated short-term daily intake between 15 mg and 40 mg under medical supervision.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Daily zinc intake for adult men has an established dietary floor of 11 mg, while research on deficiency restoration uses 15 to 40 mg daily short-term under supervision.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-deficiency" className="mt-12">
          <h2
            id="h2-deficiency"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How do I know if I&apos;m actually zinc-deficient?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Evaluating your dietary pattern and requesting a serum zinc blood test with a physician are the only reliable ways to confirm deficiency. Assuming deficiency based solely on age or training volume risks unnecessary supplementation and potential copper depletion at elevated doses.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Dietary patterns and targeted serum testing provide a far more accurate assessment of zinc status than assuming deficiency based on age or exercise volume alone.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-more-better" className="mt-12">
          <h2
            id="h2-more-better"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is more zinc always better?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            No — excess zinc intake habitually exceeding 40 mg per day impairs intestinal copper absorption, leading to secondary copper deficiency, anemia, and immune system impairment. High-dose zinc supplementation should never be maintained long-term without clinical monitoring.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Habitual zinc intake exceeding 40 mg per day impairs copper absorption and can induce secondary copper deficiency and immune dysregulation.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Zinc is a conditional, deficiency-dependent lever, not an automatic testosterone booster. If your dietary zinc intake is already adequate, adding more zinc will not raise testosterone levels further and habitually exceeding 40 mg per day risks copper depletion and impaired immune function. This page is for educational purposes only and is not medical advice or a substitute for medical diagnosis or treatment.
          </p>
        </section>

        <TitanForgeShopNote
          ingredient="zinc"
          pageSlug="/science/zinc"
          note="Not as a stand-alone product. The Titan Forge shop has no plain zinc supplement, and the blends that contain some are built for other jobs, so we do not point you to them. What the catalog does carry is the basics: protein and creatine."
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
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 8875519
                </a>
                <a
                  href="https://doi.org/10.1016/s0899-9007(96)80058-x"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1016/s0899-9007(96)80058-x
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
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 17882141
                </a>
                <a
                  href="https://doi.org/10.1038/sj.ejcn.1602899"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1038/sj.ejcn.1602899
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
              href="/science/zinc-picolinate-vs-gluconate"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc Picolinate vs. Gluconate</p>
              <p className="mt-1 text-[13px] text-mute">
                Head-to-head absorption trials, bioavailability, and testosterone evidence.
              </p>
            </Link>
            <Link
              href="/science/oysters-and-zinc-for-men"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Oysters &amp; Zinc Bioavailability</p>
              <p className="mt-1 text-[13px] text-mute">
                Evaluating whole oysters vs extracts, bioavailability, and testosterone research.
              </p>
            </Link>
            <Link
              href="/science/selenium-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Selenium &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Human RCT trial data, selenoprotein GPX4 defense, and baseline restoration.
              </p>
            </Link>
            <Link
              href="/science/boron"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Boron &amp; Testosterone Research</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-graded read on boron studies, SHBG mechanisms, and dosage.
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
              href="/science/vitamin-d"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Vitamin D &amp; Testosterone Evidence</p>
              <p className="mt-1 text-[13px] text-mute">
                Comparing conflicting trials on vitamin D intake and male hormone levels.
              </p>
            </Link>
            <Link
              href="/nutrition/ashwagandha-vs-tongkat-ali"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Ashwagandha vs Tongkat Ali</p>
              <p className="mt-1 text-[13px] text-mute">
                Compare cortisol regulation, stress adaptation, and hormonal research.
              </p>
            </Link>
            <Link
              href="/blog/protein-intake-for-weight-loss-and-muscle-gain"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Protein Intake for Muscle &amp; Fat Loss</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based protein target calculations for body recomposition.
              </p>
            </Link>
            <Link
              href="/nutrition/growth-hormone-foods"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Foods &amp; Growth Hormone</p>
              <p className="mt-1 text-[13px] text-mute">
                What peer-reviewed research shows about nutrition and growth hormone.
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

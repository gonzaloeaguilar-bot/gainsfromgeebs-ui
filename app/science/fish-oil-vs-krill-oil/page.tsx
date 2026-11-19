import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/fish-oil-vs-krill-oil";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Fish Oil vs. Krill Oil: Bioavailability, Dose Matching, and Evidence Comparison",
  description:
    "Head-to-head human research comparing krill oil and fish oil bioavailability, phospholipid versus triglyceride structures, inflammation markers, and practical cost efficiency.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Fish Oil vs. Krill Oil: Bioavailability and Evidence Comparison",
    description:
      "What human RCTs show regarding krill oil phospholipids vs fish oil triglycerides, absorption rates, inflammatory markers, and dose matching.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Fish Oil vs Krill Oil Science Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Oil vs. Krill Oil: Bioavailability and Evidence Comparison",
    description:
      "Evidence-based head-to-head analysis of krill oil vs fish oil for omega-3 bioavailability and inflammatory control.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ComparisonRow = {
  feature: string;
  krillOil: string;
  fishOil: string;
  evidenceGrade: string;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Primary chemical structure",
    krillOil: "Phospholipid-bound EPA/DHA (phosphatidylcholine)",
    fishOil: "Triglyceride or ethyl ester EPA/DHA",
    evidenceGrade: "Grade A — Established biochemistry",
  },
  {
    feature: "Acute absorption per gram of oil",
    krillOil: "Higher plasma concentration per gram ingested",
    fishOil: "Standard plasma response per gram ingested",
    evidenceGrade: "Grade B — Multiple human crossover RCTs",
  },
  {
    feature: "Steady-state tissue index at equal dose",
    krillOil: "Equivalent red blood cell omega-3 index when EPA/DHA dose is matched",
    fishOil: "Equivalent red blood cell omega-3 index when EPA/DHA dose is matched",
    evidenceGrade: "Grade B — 4-week to 7-week human RCTs",
  },
  {
    feature: "Cost per gram of active EPA+DHA",
    krillOil: "Higher cost per gram of yield",
    fishOil: "Lower cost per gram of yield",
    evidenceGrade: "Grade A — Market market analysis",
  },
  {
    feature: "Secondary bioactive compounds",
    krillOil: "Contains natural astaxanthin and choline",
    fishOil: "Typically refined for pure EPA/DHA",
    evidenceGrade: "Grade A — Compositional analysis",
  },
];

const faqs = [
  {
    question: "Is krill oil really better absorbed than regular fish oil?",
    answer:
      "Krill oil shows slightly higher acute plasma bioavailability per gram of oil because its EPA and DHA are bound in phospholipids rather than triglycerides. However, when total EPA and DHA dosage is matched, long-term red blood cell omega-3 index increases are equivalent between fish oil and krill oil.",
  },
  {
    question: "Does krill oil cause fewer fishy burps?",
    answer:
      "Yes, for many individuals. Because phospholipid-bound fatty acids mix readily with water in gastric fluid rather than floating on top of stomach contents, krill oil generally reduces reflux and fishy aftertaste.",
  },
  {
    question: "Do I need to take as much krill oil as fish oil to get the same benefit?",
    answer:
      "Per gram of total oil capsule, krill oil delivers fewer total milligrams of EPA and DHA than concentrated fish oil. While the phospholipid form is absorbed slightly more efficiently per gram, matching biological endpoints typically requires consuming a comparable total weight of active omega-3 fatty acids.",
  },
  {
    question: "Which supplement is better for lowering C-reactive protein and inflammation?",
    answer:
      "Head-to-head clinical trials show that both marine oils effectively reduce systemic inflammatory markers like hs-CRP and blood triglycerides when adequate EPA and DHA doses are provided. Neither source demonstrates superior anti-inflammatory efficacy when total active fatty acid intake is equalized.",
  },
  {
    question: "Why is fish oil used more often in major cardiovascular clinical trials?",
    answer:
      "Standardized fish oil concentrates provide high doses of EPA and DHA (1,000mg to 4,000mg daily) at a cost-effective price point, making them the pragmatic choice for large, long-term cardiovascular endpoint trials.",
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
  headline: "Fish Oil vs. Krill Oil: Bioavailability, Dose Matching, and Evidence Comparison",
  description:
    "Head-to-head human research comparing krill oil and fish oil bioavailability, phospholipid versus triglyceride structures, inflammation markers, and practical cost efficiency.",
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
      name: "Similar eicosapentaenoic acid and docosahexaenoic acid plasma levels achieved with fish oil or krill oil in a randomized double-blind four-week bioavailability study",
      author: { "@type": "Person", name: "Yurko-Mauro K" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "Lipids in Health and Disease" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26328782" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12944-015-0109-z",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/26328782/",
        "https://doi.org/10.1186/s12944-015-0109-z",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Bioavailability of fatty acids from krill oil, krill meal and fish oil in healthy subjects--a randomized, single-dose, cross-over trial",
      author: { "@type": "Person", name: "Köhler A" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "Lipids in Health and Disease" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "25884846" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12944-015-0015-4",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/25884846/",
        "https://doi.org/10.1186/s12944-015-0015-4",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Incorporation of EPA and DHA into plasma phospholipids in response to different omega-3 fatty acid formulations--a comparative bioavailability study of fish oil vs. krill oil",
      author: { "@type": "Person", name: "Schuchardt JP" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Lipids in Health and Disease" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21854650" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/1476-511X-10-145",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/21854650/",
        "https://doi.org/10.1186/1476-511X-10-145",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Comparison of bioavailability of krill oil versus fish oil and health effect",
      author: { "@type": "Person", name: "Ulven SM" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "Vascular Health and Risk Management" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26357480" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.2147/VHRM.S85165",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/26357480/",
        "https://doi.org/10.2147/VHRM.S85165",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Fish Oil" },
    { "@type": "Thing", name: "Krill Oil" },
    { "@type": "Thing", name: "Omega-3 Fatty Acids" },
    { "@type": "Thing", name: "Bioavailability" },
    { "@type": "Thing", name: "Inflammation" },
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
      name: "Fish Oil vs Krill Oil",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function FishOilVsKrillOilSciencePage() {
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
            <li className="text-cloudText">Fish Oil vs. Krill Oil</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Marine Lipid Biochemistry</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Fish Oil vs. Krill Oil: Bioavailability, Dose Matching, and Bioactive Comparison
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Direct Answer Block */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Head-to-head evidence on bioavailability and practical EPA/DHA delivery.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Krill oil delivers EPA and DHA bound in phospholipids, which yields slightly higher tissue bioavailability per gram compared to the ethyl ester or triglyceride forms typical of fish oil. However, standard fish oil provides a significantly higher total dose of omega-3s per serving at a lower cost, achieving equivalent biological effects when overall EPA and DHA intake is matched.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="absorption-heading" className="mt-12">
          <h2
            id="absorption-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is krill oil better absorbed than fish oil?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Acute pharmacokinetics studies demonstrate that per gram of raw oil, krill oil produces a sharper initial spike in plasma EPA and DHA concentration than fish oil (Schuchardt et al. 2011, PMID 21854650; Köhler et al. 2015, PMID 25884846). Because krill fatty acids are structurally linked to phospholipids, they integrate directly into aqueous intestinal fluid without requiring extensive emulsification by bile salts.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            However, when examining multi-week steady-state accumulation, randomized double-blind trials show a different pattern. Yurko-Mauro et al. 2015 (PMID 26328782) evaluated 4 weeks of dose-matched supplementation in healthy subjects and found no statistically significant difference in final red blood cell omega-3 index or plasma phospholipid levels between fish oil and krill oil. While krill oil enters plasma slightly faster in the acute postprandial window, overall tissue incorporation over weeks of daily use depends on total EPA and DHA intake rather than oil source.
          </p>
          <blockquote className="my-5 rounded-r-lg border-l-2 border-cloudText/60 bg-bone/[0.03] py-3 pl-4 pr-3 text-[15px] italic text-bone/90">
            &ldquo;Krill oil exhibits faster acute absorption per gram of oil, but long-term tissue omega-3 levels are equivalent when total EPA and DHA intake is matched.&rdquo;
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="inflammation-heading" className="mt-12">
          <h2
            id="inflammation-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does krill oil or fish oil lower inflammation more effectively?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Clinical trials measuring systemic inflammatory markers—including high-sensitivity C-reactive protein (hs-CRP), interleukin-6 (IL-6), and tumor necrosis factor-alpha (TNF-&alpha;)—indicate that both marine oil sources lower baseline inflammatory signaling when adequate long-chain omega-3 doses are consumed (Ulven et al. 2015, PMID 26357480).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Neither supplement displays superior anti-inflammatory potency when active fatty acid doses are equalized. Krill oil contains astaxanthin, a xanthophyll carotenoid with antioxidant properties, but human clinical trials have not demonstrated that this secondary compound translates into enhanced systemic anti-inflammatory outcomes compared to standard fish oil providing equal EPA and DHA milligrams.
          </p>
          <blockquote className="my-5 rounded-r-lg border-l-2 border-cloudText/60 bg-bone/[0.03] py-3 pl-4 pr-3 text-[15px] italic text-bone/90">
            &ldquo;Head-to-head trials show equal reductions in systemic inflammatory cytokines when active EPA and DHA doses are equalized.&rdquo;
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="structure-heading" className="mt-12">
          <h2
            id="structure-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What structural differences separate phospholipid and triglyceride omega-3s?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            The fundamental distinction between krill oil and fish oil lies in molecular architecture. Standard fish oils contain long-chain fatty acids attached to a glycerol backbone as triglycerides or re-esterified triglycerides (or as ethyl esters in purified pharmaceutical concentrates). In contrast, krill oil fatty acids are predominantly bound to phospholipids, specifically phosphatidylcholine.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Phospholipids possess amphiphilic properties: a hydrophilic phosphate head combined with hydrophobic fatty acid tails. This configuration allows krill oil to self-emulsify in gastric fluids, forming micro-dispersion droplets that digest smoothly. Fish oil triglycerides require pancreatic lipase and bile acids for breakdown before intestinal wall transport can occur.
          </p>
          <blockquote className="my-5 rounded-r-lg border-l-2 border-cloudText/60 bg-bone/[0.03] py-3 pl-4 pr-3 text-[15px] italic text-bone/90">
            &ldquo;Phospholipid binding gives krill oil self-emulsifying properties in water, whereas fish oil triglycerides require bile salts for gastrointestinal digestion.&rdquo;
          </blockquote>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Feature</th>
                  <th className="p-3 font-semibold md:p-4">Krill Oil</th>
                  <th className="p-3 font-semibold md:p-4">Fish Oil</th>
                  <th className="p-3 font-semibold md:p-4">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-bone/[0.02]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.feature}</td>
                    <td className="p-3 md:p-4">{row.krillOil}</td>
                    <td className="p-3 md:p-4">{row.fishOil}</td>
                    <td className="p-3 text-mute md:p-4">{row.evidenceGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="cardiovascular-heading" className="mt-12">
          <h2
            id="cardiovascular-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Which marine oil source is best for overall health and cardiovascular support?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Selecting between fish oil and krill oil depends on practical dosing efficiency and tolerance rather than biological superiority. Fish oil concentrates supply substantially more EPA and DHA per capsule—often 600mg to 1,000mg of active fatty acids per 1,200mg capsule—making it straightforward and affordable to reach therapeutic targets (such as 2g to 4g daily for hypertriglyceridemia).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85">
            Krill oil typically contains 120mg to 240mg of combined EPA and DHA per 1,000mg capsule because a significant portion of the capsule mass consists of phospholipid backbones. Consequently, achieving a 2g daily EPA+DHA target with krill oil requires taking up to 10 to 15 softgels daily, significantly increasing financial cost. Krill oil is best suited for individuals who experience gastrointestinal discomfort or reflux with fish oil softgels.
          </p>
          <blockquote className="my-5 rounded-r-lg border-l-2 border-cloudText/60 bg-bone/[0.03] py-3 pl-4 pr-3 text-[15px] italic text-bone/90">
            &ldquo;Standard fish oil remains the most cost-efficient choice for hitting daily EPA and DHA targets, while krill oil provides a comfortable alternative for reflux-sensitive users.&rdquo;
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-labelledby="honest-limits-heading"
          className="mt-12 rounded-[6px] border border-amber-500/30 bg-amber-500/[0.05] p-5 md:p-6"
        >
          <p className="eyebrow text-amber-400">Honest Limits &amp; Guardrails</p>
          <h2
            id="honest-limits-heading"
            className="display mt-2 text-[20px] leading-[1.15] text-bone md:text-[24px]"
          >
            What the research does NOT prove.
          </h2>
          <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.65] text-bone/85">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">&bull;</span>
              <span>
                <strong>Sponsorship influence in trials:</strong> Commercial funding is prevalent in head-to-head marine oil comparative studies. Trials evaluating bioavailability must be scrutinized for whether test doses were matched by total oil mass or by active EPA/DHA content.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">&bull;</span>
              <span>
                <strong>Baseline dietary variability:</strong> Differences in baseline seafood intake and background dietary fat among study participants introduce variability in red blood cell omega-3 index responsiveness across short trial periods.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">&bull;</span>
              <span>
                <strong>Lack of long-term endpoint trials:</strong> Major clinical trials evaluating hard cardiovascular outcomes (such as reductions in myocardial infarction or stroke) have been conducted almost exclusively using concentrated fish oil formulations rather than krill oil.
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ Block */}
        <section aria-labelledby="faq-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2
            id="faq-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <section
                key={faq.question}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-normal text-bone">
                  {faq.question}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                  {faq.answer}
                </p>
              </section>
            ))}
          </div>
        </section>

        {/* Sources & Links */}
        <section aria-labelledby="sources-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">Peer-Reviewed Sources</p>
          <h2
            id="sources-heading"
            className="display mt-3 text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Primary Citations
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Yurko-Mauro K, et al.</strong> (2015). <em>Similar eicosapentaenoic acid and docosahexaenoic acid plasma levels achieved with fish oil or krill oil in a randomized double-blind four-week bioavailability study.</em> Lipids in Health and Disease, 14:99.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/26328782/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  26328782
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.1186/s12944-015-0109-z"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.1186/s12944-015-0109-z
                </a>
              </p>
            </div>

            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Köhler A, et al.</strong> (2015). <em>Bioavailability of fatty acids from krill oil, krill meal and fish oil in healthy subjects--a randomized, single-dose, cross-over trial.</em> Lipids in Health and Disease, 14:19.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/25884846/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  25884846
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.1186/s12944-015-0015-4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.1186/s12944-015-0015-4
                </a>
              </p>
            </div>

            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Schuchardt JP, et al.</strong> (2011). <em>Incorporation of EPA and DHA into plasma phospholipids in response to different omega-3 fatty acid formulations--a comparative bioavailability study of fish oil vs. krill oil.</em> Lipids in Health and Disease, 10:145.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/21854650/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  21854650
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.1186/1476-511X-10-145"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.1186/1476-511X-10-145
                </a>
              </p>
            </div>

            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Ulven SM, et al.</strong> (2015). <em>Comparison of bioavailability of krill oil versus fish oil and health effect.</em> Vascular Health and Risk Management, 11:511-524.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/26357480/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  26357480
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.2147/VHRM.S85165"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.2147/VHRM.S85165
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[18px] font-semibold text-bone">Internal Resources &amp; Related Pages</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/science/omega-3-and-hormones" className="btn btn-secondary">
                Omega-3 &amp; Hormones
              </Link>
              <Link href="/nutrition/longevity" className="btn btn-secondary">
                Longevity &amp; Performance Hub
              </Link>
              <Link href="/science/olive-oil" className="btn btn-secondary">
                Olive Oil Science
              </Link>
              <Link href="/nutrition/testosterone" className="btn btn-secondary">
                Testosterone Hub
              </Link>
              <Link href="/apply" className="btn btn-primary">
                Apply for coaching &rarr;
              </Link>
            </div>
          </div>
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

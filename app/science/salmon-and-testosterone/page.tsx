import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/salmon-and-testosterone";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Does Salmon Increase Testosterone? What Science Shows",
  description:
    "Only one randomized trial has tested salmon on testosterone. Salmon supplies vitamin D, omega-3s and selenium, but it is not a direct testosterone driver.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Salmon Increase Testosterone? What Science Shows",
    description:
      "Controlled clinical evidence examining whole salmon consumption, omega-3s, vitamin D, and selenium on serum testosterone in men.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Salmon and Testosterone science breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Salmon Increase Testosterone? What Science Shows",
    description:
      "What clinical trial evidence and nutritional research show about whole salmon consumption and male hormone levels.",
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
    study: "Ito et al. (2024)",
    design: "Cross-Sectional Cohort Study (Hitachi Health Study II)",
    sampleSize: "Adult Japanese males",
    outcome:
      "Higher dietary fish intake was positively associated with baseline serum total testosterone levels, but dietary fish consumption alone did not prevent age-related androgen decline.",
    grade: "Grade C (Cross-Sectional)",
    pmid: "38584675",
  },
  {
    study: "Jensen et al. (2020)",
    design: "Observational Cohort Study",
    sampleSize: "1,679 young Danish men",
    outcome:
      "Fish oil supplement intake was associated with higher total and free testosterone levels and higher free testosterone to LH ratios compared to non-supplemented controls.",
    grade: "Grade B (Observational)",
    pmid: "31951274",
  },
  {
    study: "Pilz et al. (2011)",
    design: "Randomized Controlled Trial (1 year)",
    sampleSize: "54 vitamin-D deficient men",
    outcome:
      "Daily vitamin D supplementation significantly elevated total testosterone, free testosterone, and bioactive testosterone levels in men with low baseline vitamin D.",
    grade: "Grade A (RCT)",
    pmid: "21154195",
  },
  {
    study: "Safarinejad et al. (2009)",
    design: "Randomized Controlled Trial (26 weeks)",
    sampleSize: "468 infertile men",
    outcome:
      "Daily selenium supplementation increased serum total testosterone, LH, and FSH levels while improving sperm concentration and motility.",
    grade: "Grade A (RCT)",
    pmid: "19091331",
  },
];

const faqs = [
  {
    question: "Does eating salmon increase testosterone levels in men?",
    answer:
      "Controlled clinical trial evidence testing whole salmon consumption on serum testosterone is thin, backed by just one randomized intervention study. While salmon provides high concentrations of vitamin D, omega-3 fatty acids, and selenium that support overall endocrine health, eating salmon does not act as an immediate testosterone driver in healthy men.",
  },
  {
    question: "What nutrients in salmon support male hormone production?",
    answer:
      "Salmon is rich in vitamin D3, EPA and DHA omega-3 fatty acids, selenium, and high-quality protein. Vitamin D and selenium serve as essential cofactors in Leydig cell steroidogenesis, while omega-3s reduce systemic inflammation and support testicular cell membrane fluidity.",
  },
  {
    question: "Is whole salmon better for testosterone than taking fish oil supplements?",
    answer:
      "Whole salmon provides a complex food matrix containing fat-soluble vitamin D3, bioavailable selenium, and complete protein alongside omega-3 fats. While fish oil supplements deliver concentrated EPA and DHA, whole salmon provides broader nutritional support for endocrine and metabolic health.",
  },
  {
    question: "How often should men eat fatty fish for optimal hormone health?",
    answer:
      "Consuming 2 to 3 servings of fatty fish like wild salmon per week (roughly 12 to 16 ounces total) provides sufficient omega-3 fatty acids and vitamin D to support baseline hormone production without excess caloric or heavy metal exposure.",
  },
  {
    question: "Does farmed salmon have the same hormonal benefits as wild salmon?",
    answer:
      "Wild salmon generally contains higher natural vitamin D levels and a more favorable omega-3 to omega-6 ratio compared to farmed salmon. Farmed salmon often has higher total fat content but may contain higher concentrations of persistent environmental contaminants.",
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
  headline: "Salmon and Testosterone: What the Science Actually Shows",
  description:
    "Only one randomized trial has tested salmon on testosterone. Salmon supplies vitamin D, omega-3s and selenium, but it is not a direct testosterone driver.",
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
      name: "Association between Fish Intake and Serum Testosterone Levels in Older Males: The Hitachi Health Study II",
      author: { "@type": "Person", name: "Ito A" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "38584675" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/38584675/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Associations of Fish Oil Supplement Use With Testicular Function in Young Men",
      author: { "@type": "Person", name: "Tina Kold Jensen" },
      datePublished: "2020",
      isPartOf: { "@type": "Periodical", name: "JAMA Network Open" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "31951274" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/31951274/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of vitamin D supplementation on testosterone levels in men",
      author: { "@type": "Person", name: "Pilz S" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Hormone and Metabolic Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21154195" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/21154195/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Efficacy of selenium and/or N-acetyl-cysteine for improving semen parameters in infertile men: a double-blind, placebo controlled, randomized study",
      author: { "@type": "Person", name: "Safarinejad MR" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "The Journal of Urology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "19091331" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/19091331/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Salmon" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Omega-3 Fatty Acids" },
    { "@type": "Thing", name: "Vitamin D" },
    { "@type": "Thing", name: "Selenium" },
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
      name: "Salmon and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function SalmonAndTestosteroneSciencePage() {
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
            <li className="text-cloudText">Salmon and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Standalone Science Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Salmon and Testosterone: What the Science Actually Shows
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
            Controlled clinical trial evidence testing whole salmon consumption on serum testosterone is thin, backed by just one randomized intervention study.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled clinical trial evidence testing whole salmon consumption on serum testosterone is thin, backed by just one randomized intervention study. While salmon provides high concentrations of vitamin D, omega-3 fatty acids, and selenium that support overall endocrine health, eating salmon does not act as an immediate testosterone driver in healthy men.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-does-eating-salmon-increase-testosterone" className="mt-12">
          <h2
            id="h2-does-eating-salmon-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does eating salmon increase testosterone levels in men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Despite popular claims online framing whole salmon as an anabolic superfood, direct human interventional trials measuring serum androgen shifts following salmon feeding remain sparse. The primary clinical observational data in adult men come from studies like the Hitachi Health Study II by <span className="text-bone font-medium">Ito et al. (2024)</span> (PMID: 38584675), which tracked dietary seafood frequency against circulating total testosterone.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            While frequent fish consumption correlates positively with baseline testosterone levels compared to low-seafood diets, whole salmon consumption does not trigger acute spikes in free or total testosterone in eugonadal men. Salmon functions as a high-density nutrient vehicle that prevents micronutrient deficiencies rather than an acute endocrine stimulant. For broader dietary hormone strategies, explore our guide on <Link href="/nutrition/testosterone" className="text-cloudText underline hover:text-bone">nutrition for testosterone maintenance</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Controlled trial evidence specifically testing whole salmon on testosterone is minimal, showing that while fatty fish supports baseline endocrine health, it does not act as an acute androgen stimulant in healthy men.&quot;
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-what-nutrients-in-salmon-support-hormones" className="mt-12">
          <h2
            id="h2-what-nutrients-in-salmon-support-hormones"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What nutrients in salmon support male hormone production?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Salmon provides a powerful combination of three critical micronutrients and fats necessary for testicular steroidogenesis:
          </p>
          <ul className="mt-4 list-disc list-inside space-y-2 text-[15.5px] text-bone/85">
            <li>
              <strong className="text-bone">Vitamin D3:</strong> A 100g portion of wild salmon delivers 500–600 IU of preformed vitamin D3. In randomized trials by <span className="text-bone font-medium">Pilz et al. (2011)</span> (PMID: 21154195), correcting vitamin D deficiency increased total testosterone levels by 25%.
            </li>
            <li>
              <strong className="text-bone">Omega-3 Fatty Acids (EPA &amp; DHA):</strong> Long-chain n-3 polyunsaturated fats integrate into testicular cell membranes, optimizing luteinizing hormone receptor sensitivity and lowering systemic inflammatory markers.
            </li>
            <li>
              <strong className="text-bone">Selenium:</strong> Salmon supplies approximately 35–45 mcg of selenium per serving. As demonstrated by <span className="text-bone font-medium">Safarinejad et al. (2009)</span> (PMID: 19091331), adequate selenium supports glutathione peroxidase activity in Leydig cells, protecting testicular tissue from oxidative damage.
            </li>
          </ul>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            To understand how vitamin D acts on androgen receptors, read our detailed analysis on <Link href="/science/vitamin-d" className="text-cloudText underline hover:text-bone">vitamin D supplementation and testosterone</Link>. If you take your omega-3s as capsules instead, compare <Link href="/science/fish-oil-vs-krill-oil" className="text-cloudText underline hover:text-bone">fish oil versus krill oil</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Whole salmon provides an intact matrix of vitamin D3, EPA/DHA omega-3s, and bioavailable selenium that protects Leydig cell function and supports steroidogenesis.&quot;
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-is-whole-salmon-better-than-fish-oil" className="mt-12">
          <h2
            id="h2-is-whole-salmon-better-than-fish-oil"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is whole salmon better for testosterone than taking fish oil supplements?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Large-scale observational research by <span className="text-bone font-medium">Jensen et al. (2020)</span> (PMID: 31951274) in 1,679 young men found that supplemental fish oil use was associated with higher total testosterone and larger testicular volume. However, supplemental fish oil delivers isolated ethyl ester or triglyceride EPA/DHA without the co-factors found in whole food.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Whole salmon supplies complete protein rich in essential amino acids, fat-soluble vitamin D3, and trace minerals inside an intact lipid matrix that enhances intestinal absorption. While fish oil pills offer convenience for omega-3 index target maintenance, whole salmon provides superior total nutritional value. Review the full mechanisms in our breakdown of <Link href="/science/omega-3-and-hormones" className="text-cloudText underline hover:text-bone">omega-3 fatty acids and male hormone health</Link>.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Whole salmon provides fat-soluble vitamin D and selenium alongside omega-3 fatty acids, offering a natural food matrix that isolated fish oil supplements cannot replicate.&quot;
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-how-often-should-men-eat-fatty-fish" className="mt-12">
          <h2
            id="h2-how-often-should-men-eat-fatty-fish"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How often should men eat fatty fish for optimal hormone health?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            For men aiming to optimize hormone health and cardiovascular recovery, dietary guidelines recommend consuming 2 to 3 servings (6 oz per serving, or 12–18 oz total) of wild or sustainably farmed fatty fish per week. This intake level yields roughly 1,500 to 2,500 mg of combined EPA and DHA per week alongside substantial dietary vitamin D and selenium.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Consuming salmon more than 4 times per week is generally safe, though choosing wild-caught Pacific salmon minimizes exposure to bioaccumulated environmental polychlorinated biphenyls (PCBs) and heavy metals that can occur in certain farmed varieties.
          </p>
          <div className="my-6 rounded-[6px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14px] font-semibold tracking-wide text-cloudText uppercase">
              Quotable Evidence Statement
            </p>
            <p className="mt-2 text-[16px] italic text-bone">
              &quot;Eating 2 to 3 servings of fatty fish per week provides optimal EPA, DHA, and vitamin D to maintain baseline endocrine health without excessive heavy metal accumulation.&quot;
            </p>
          </div>
        </section>

        {/* Evidence Summary Table */}
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
              While salmon is a nutrient-dense food supporting endocrine function, scientific rigour requires highlighting clear limitations in current research:
            </p>
            <ul className="list-disc list-inside space-y-2 text-mute">
              <li>
                <strong className="text-bone">Single Isolated RCT:</strong> Only one direct human randomized controlled trial specifically isolates whole salmon feeding for male hormonal outcomes, meaning broader claims rely heavily on observational data and nutrient-specific trials.
              </li>
              <li>
                <strong className="text-bone">Wild vs. Farmed Variation:</strong> Farmed and wild salmon differ significantly in omega-3 concentration, vitamin D density, fat composition, and environmental contaminant exposure.
              </li>
              <li>
                <strong className="text-bone">Dietary Confounding:</strong> In free-living observational studies, men who consume more fish often maintain healthier overall diets and lifestyles, complicating efforts to isolate salmon as a single variable.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="h2-frequently-asked-questions" className="mt-12">
          <h2
            id="h2-frequently-asked-questions"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-[6px] border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">{faq.question}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation links */}
        <section className="mt-16 border-t border-white/10 pt-8">
          <p className="eyebrow text-cloudText">Related Science Reviews</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/science/omega-3-and-hormones"
              className="rounded-[6px] border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
            >
              <p className="text-[15px] font-medium text-bone">Omega-3 &amp; Hormones</p>
              <p className="mt-1 text-[13px] text-mute">Testicular health and inflammation evidence.</p>
            </Link>
            <Link
              href="/science/vitamin-d"
              className="rounded-[6px] border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
            >
              <p className="text-[15px] font-medium text-bone">Vitamin D &amp; Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">RCT evidence on androgen baseline restoration.</p>
            </Link>
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
            >
              <p className="text-[15px] font-medium text-bone">Nutrition &amp; Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">Pragmatic dietary strategies for men.</p>
            </Link>
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

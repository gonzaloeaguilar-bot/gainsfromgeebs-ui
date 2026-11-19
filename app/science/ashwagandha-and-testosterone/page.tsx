import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/ashwagandha-and-testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Ashwagandha and Testosterone: RCTs and Meta-Analysis",
  description:
    "Clinical trials show standardized Ashwagandha root extract modestly raises total testosterone in men under stress or training. RCT findings, doses, and limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Ashwagandha and Testosterone: RCTs and Meta-Analysis",
    description:
      "Peer-reviewed evidence on how standardized Ashwagandha root extract affects male testosterone, cortisol reduction, LH levels, and muscle strength.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwagandha and Testosterone — peer-reviewed research review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwagandha and Testosterone: Clinical Trial Evidence and Mechanisms",
    description:
      "What randomized double-blind placebo-controlled human trials show regarding Ashwagandha root extract, testosterone changes, and cortisol suppression.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TrialRow = {
  extract: string;
  population: string;
  doseProtocol: string;
  duration: string;
  observedEffect: string;
  grade: string;
  pmid: string;
  authorYear: string;
};

const TRIAL_ROWS: TrialRow[] = [
  {
    extract: "KSM-66 Full-Spectrum Extract",
    population: "57 resistance-trained healthy young males (ages 18–50)",
    doseProtocol: "300 mg twice daily (600 mg/day)",
    duration: "8 weeks",
    observedEffect: "+96.2 ng/dL total testosterone increase vs +18.0 ng/dL placebo (p < 0.001); significant strength & muscle size gains",
    grade: "Grade A (Human RCT)",
    pmid: "26609282",
    authorYear: "Wankhede et al. (2015)",
  },
  {
    extract: "Shoden Standardized Extract",
    population: "50 overweight males (ages 40–70) with mild fatigue",
    doseProtocol: "350 mg daily (21 mg withanolide glycosides)",
    duration: "16 weeks (crossover)",
    observedEffect: "+14.7% total testosterone increase (p = 0.010) and +18.0% DHEA-S increase (p = 0.005) vs placebo",
    grade: "Grade A (Crossover RCT)",
    pmid: "30854916",
    authorYear: "Lopresti et al. (2019)",
  },
  {
    extract: "Standardized Root Extract",
    population: "46 oligospermic males with low baseline testosterone",
    doseProtocol: "225 mg three times daily (675 mg/day)",
    duration: "90 days",
    observedEffect: "+17.0% increase in serum total testosterone and +34.0% increase in LH alongside improved sperm parameters",
    grade: "Grade B (Human RCT)",
    pmid: "24371462",
    authorYear: "Ambiye et al. (2013)",
  },
  {
    extract: "Standardized Root Extract",
    population: "50 adult males evaluating vitality and sexual well-being",
    doseProtocol: "300 mg twice daily (600 mg/day)",
    duration: "8 weeks",
    observedEffect: "+15.0% to 20.0% total testosterone elevation with concurrent reduction in stress scores",
    grade: "Grade B (Human RCT)",
    pmid: "35873404",
    authorYear: "Chauhan et al. (2022)",
  },
  {
    extract: "KSM-66 Full-Spectrum Extract",
    population: "64 adult males and females with chronic psychological stress",
    doseProtocol: "300 mg twice daily (600 mg/day)",
    duration: "60 days",
    observedEffect: "-27.9% reduction in serum cortisol levels, dampening HPA-axis inhibition of gonadal steroidogenesis",
    grade: "Grade A (Human RCT)",
    pmid: "23439798",
    authorYear: "Chandrasekhar et al. (2012)",
  },
  {
    extract: "Systematic Review of Botanical Supplements",
    population: "Meta-analysis of human trials evaluating herbal androgen modulators",
    doseProtocol: "Various standardized dosages",
    duration: "Systematic review",
    observedEffect: "Ashwagandha and Fenugreek identified as the only botanicals with consistent RCT evidence for raising serum testosterone",
    grade: "Grade A (Systematic Review)",
    pmid: "33150931",
    authorYear: "Smith et al. (2021)",
  },
];

const faqs = [
  {
    question: "Does Ashwagandha actually increase testosterone levels?",
    answer:
      "Yes. Multiple double-blind, placebo-controlled human trials demonstrate that standardized Ashwagandha root extract modestly increases serum total testosterone levels in men. Gains typically range between 14% and 20% over 8 to 12 weeks, with the largest increases observed in men undergoing resistance training or managing high chronic stress.",
  },
  {
    question: "How long does it take for Ashwagandha to increase testosterone?",
    answer:
      "Clinical trials measuring serum hormonal changes evaluate participants at 8 to 12 weeks of daily supplementation. Statistically significant elevations in total testosterone, DHEA-S, and luteinizing hormone (LH) emerge gradually after 4 to 8 weeks of consistent daily intake.",
  },
  {
    question: "What is the clinical dosage of Ashwagandha for testosterone?",
    answer:
      "Most positive human RCTs utilize 500 mg to 600 mg daily of standardized full-spectrum root extract (such as KSM-66) or 350 mg daily of high-potency extract (such as Shoden), taken in divided doses with meals.",
  },
  {
    question: "Does Ashwagandha boost testosterone in healthy young men?",
    answer:
      "In healthy young men engaged in structured resistance training, an 8-week trial of 600 mg/day KSM-66 produced a significant average testosterone increase of 96.2 ng/dL alongside enhanced strength and muscle recovery. However, gains in non-training, low-stress young men are less pronounced.",
  },
  {
    question: "Does Ashwagandha lower cortisol to raise testosterone?",
    answer:
      "Yes. One primary physiological mechanism is stress reduction. Ashwagandha attenuates hyperactive hypothalamic-pituitary-adrenal (HPA) axis activity, lowering serum cortisol by up to 27.9%. Because high cortisol directly inhibits Leydig cell steroidogenesis, lowering stress hormones frees testicular tissue to synthesize androgenic steroids.",
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
  headline: "Ashwagandha and Testosterone: Clinical Trial Evidence, Dosages, and Mechanisms",
  description:
    "Clinical trials indicate that standardized Ashwagandha root extract modestly increases serum total testosterone levels in men, particularly those engaged in resistance training or experiencing chronic stress. The mechanism operates primarily through HPA-axis stress reduction and Leydig cell antioxidant protection rather than direct pituitary hyper-stimulation.",
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
      name: "Examining the effect of Withania somnifera supplementation on muscle strength and recovery: a randomized controlled trial",
      author: { "@type": "Person", name: "Wankhede S" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26609282" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/26609282/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A Randomized, Double-Blind, Placebo-Controlled, Crossover Study Examining the Hormonal and Vitality Effects of Ashwagandha (Withania somnifera) in Aging, Overweight Males",
      author: { "@type": "Person", name: "Lopresti AL" },
      datePublished: "2019",
      isPartOf: { "@type": "Periodical", name: "American Journal of Men's Health" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30854916" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/30854916/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Clinical Evaluation of the Spermatogenic Activity of the Root Extract of Ashwagandha (Withania somnifera) in Oligospermic Males: A Pilot Study",
      author: { "@type": "Person", name: "Ambiye VR" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "Evidence-Based Complementary and Alternative Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "24371462" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/24371462/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of standardized root extract of ashwagandha (Withania somnifera) on well-being and sexual performance in adult males: A randomized controlled trial",
      author: { "@type": "Person", name: "Chauhan S" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Health Science Reports" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35873404" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/35873404/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults",
      author: { "@type": "Person", name: "Chandrasekhar K" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "Indian Journal of Psychological Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "23439798" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23439798/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Examining the Effects of Herbs on Testosterone Concentrations in Men: A Systematic Review",
      author: { "@type": "Person", name: "Smith SJ" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Advances in Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33150931" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33150931/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Ashwagandha" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Endocrinology" },
    { "@type": "Thing", name: "Men's Health" },
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
      name: "Ashwagandha and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function AshwagandhaAndTestosteroneSciencePage() {
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
            <li className="text-cloudText">Ashwagandha and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Physiological Topic Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Ashwagandha and Testosterone: Clinical Trial Evidence, Dosages, and Mechanisms
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
            Clinical trials show standardized Ashwagandha modestly increases serum total testosterone in men.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Clinical trials indicate that standardized Ashwagandha root extract modestly increases serum total testosterone levels in men, particularly those engaged in resistance training or experiencing chronic stress. The mechanism operates primarily through HPA-axis stress reduction and Leydig cell antioxidant protection rather than direct pituitary hyper-stimulation.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-does-ashwagandha-actually-increase-testosterone" className="mt-12">
          <h2
            id="h2-does-ashwagandha-actually-increase-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does Ashwagandha actually increase testosterone levels?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Double-blind, placebo-controlled human clinical trials confirm that standardized Ashwagandha root extract (<em>Withania somnifera</em>) produces statistically significant increases in serum total testosterone, free testosterone, and DHEA-S in adult males. Rather than acting as an exogenous androgen or direct gonadotropin secretagogue, Ashwagandha modulates testicular steroidogenesis through two main physiological pathways.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Standardized Ashwagandha root extract increases male serum total testosterone primarily by blunting cortisol-driven HPA axis inhibition and protecting testicular Leydig cell steroidogenesis.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            First, high chronic stress elevates cortisol, which suppresses hypothalamic gonadotropin-releasing hormone (GnRH) and directly inhibits Leydig cell enzyme activity in the testes. Clinical research by Chandrasekhar et al. (2012) (PMID 23439798) demonstrated that 600 mg daily of full-spectrum root extract reduced serum cortisol levels by 27.9%. By dampening this stress response, Ashwagandha restores baseline luteinizing hormone (LH) signaling. Second, root withanolides exhibit potent antioxidant properties within testicular tissue, shielding enzymatic pathways required to synthesize testosterone from cholesterol.
          </p>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-how-much-of-a-boost" className="mt-12">
          <h2
            id="h2-how-much-of-a-boost"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much of a testosterone boost can men expect from Ashwagandha?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In placebo-controlled human trials, the magnitude of testosterone elevation typically ranges from 14% to 20% over baseline levels over an 8- to 12-week intervention period. In a seminal trial by Wankhede et al. (2015) (PMID 26609282), resistance-trained young men taking 600 mg daily of KSM-66 root extract experienced an average serum total testosterone increase of 96.2 ng/dL, compared to an 18.0 ng/dL change in the placebo group.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Across double-blind human RCTs, standardized Ashwagandha extract supplementation produces a modest 14% to 20% increase in serum total testosterone over 8 to 12 weeks.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Similarly, a 16-week crossover study in overweight males aged 40–70 by Lopresti et al. (2019) (PMID 30854916) demonstrated a 14.7% greater increase in total testosterone and an 18.0% increase in DHEA-S relative to placebo. These findings confirm that while Ashwagandha offers meaningful physiological support for male vitality, it produces modest, physiological adjustments rather than synthetic hormone replacement levels.
          </p>

          {/* Clinical Evidence Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Extract Type</th>
                  <th className="p-3 font-semibold md:p-4">Population</th>
                  <th className="p-3 font-semibold md:p-4">Daily Dosage</th>
                  <th className="p-3 font-semibold md:p-4">Hormonal & Physical Findings</th>
                  <th className="p-3 font-semibold md:p-4">Study Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {TRIAL_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.extract}</td>
                    <td className="p-3 md:p-4">{row.population}</td>
                    <td className="p-3 md:p-4">{row.doseProtocol}</td>
                    <td className="p-3 md:p-4">
                      {row.observedEffect}{" "}
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cloudText underline hover:text-bone"
                      >
                        ({row.authorYear}, PMID {row.pmid})
                      </a>
                    </td>
                    <td className="p-3 font-mono text-[12px] md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-young-healthy-men" className="mt-12">
          <h2
            id="h2-young-healthy-men"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is Ashwagandha effective for young healthy men with normal testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In young men with healthy baseline testosterone who are not under significant physical or mental stress, Ashwagandha provides more modest hormonal shifts than in stressed or infertile cohorts. However, when combined with structured progressive resistance training, trial data shows notable adaptations.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            For healthy young men undergoing intense training, Ashwagandha enhances muscle strength and recovery by accelerating muscle damage repair alongside modest androgen elevation.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In the 8-week resistance training RCT (PMID 26609282), young men taking 600 mg daily not only saw total testosterone rise, but also achieved significantly greater increases in 1-RM bench press strength (46.0 kg vs 26.4 kg in placebo) and leg extension strength, alongside significantly lower post-exercise serum creatine kinase levels (indicating reduced muscle tissue breakdown). Thus, young lifters benefit primarily through improved stress tolerance and accelerated muscular recovery.
          </p>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-compare-to-other-supplements" className="mt-12">
          <h2
            id="h2-compare-to-other-supplements"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How does Ashwagandha compare to other testosterone supplements?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In a comprehensive systematic review of botanical supplements for male androgen levels by Smith et al. (2021) (PMID 33150931), Ashwagandha and Fenugreek were highlighted as the only herbal extracts backed by consistent, high-quality human RCT evidence demonstrating serum testosterone increases. In contrast, widely marketed ingredients like Tribulus terrestris and D-aspartic acid have failed to show consistent testosterone increases in healthy men across clinical trials.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Systematic reviews identify Ashwagandha as one of only two botanical extracts with consistent double-blind RCT proof of elevating male testosterone.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Unlike essential micronutrients such as <Link className="text-cloudText underline hover:text-bone" href="/science/zinc">Zinc</Link>, which only raise testosterone if a baseline deficiency is corrected, Ashwagandha actively modulates cortisol stress signals even when micronutrient status is adequate. For men building comprehensive lifestyle plans, addressing baseline sleep, training intensity, and nutrition through guides like <Link className="text-cloudText underline hover:text-bone" href="/nutrition/testosterone">Testosterone Nutrition Principles</Link> and training for <Link className="text-cloudText underline hover:text-bone" href="/nutrition/muscle-after-40">Muscle Adaptation After 40</Link> remains the prerequisite foundation before adding targeted botanicals.
          </p>
        </section>

        {/* Honest Limits Section */}
        <section
          aria-labelledby="honest-limits-heading"
          className="mt-12 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.04] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Honest limits & evidence bounds</p>
          <h2
            id="honest-limits-heading"
            className="display mt-2 text-[20px] leading-[1.15] text-bone md:text-[24px]"
          >
            What clinical trials do NOT show about Ashwagandha
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-[1.65] text-bone/85">
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Extract Standardization Matters:</strong> The positive RCTs evaluated specific proprietary root extracts (KSM-66, Shoden, Sensoril) standardized for withanolide content (typically 5% to 35%). Unstandardized crude root powders or low-quality raw supplements cannot be assumed to yield identical clinical outcomes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Short Trial Durations:</strong> Existing double-blind human studies span 8 to 16 weeks. Long-term multi-year effects, continuous safety profiles beyond 6 months, and potential receptor desensitization remain unstudied in controlled trials.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Baseline Variance:</strong> Participants experiencing severe baseline stress, poor sleep, or reproductive dysfunction demonstrate larger percentage gains in serum testosterone than non-stressed, healthy young men with optimal baseline hormones.
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <p className="eyebrow text-cloudText">Frequently asked questions</p>
          <h2
            id="faq-heading"
            className="display mt-2 text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Ashwagandha and Testosterone FAQ
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.03] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">{faq.question}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="hair my-12" />

        <footer className="rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] p-6 text-center md:p-8">
          <h2 className="display text-[22px] text-bone md:text-[26px]">
            Looking for structured, evidence-based coaching?
          </h2>
          <p className="mt-2 text-[15px] text-bone/80">
            Cut through supplement hype with personalized training, lifestyle protocols, and direct accountability.
          </p>
          <div className="mt-5">
            <Link
              href="/for/online-fitness-coach-for-men"
              className="inline-block rounded-[4px] bg-bone px-6 py-3 text-[14px] font-semibold text-grain transition-colors hover:bg-bone/90"
            >
              Explore 1-on-1 Coaching
            </Link>
          </div>
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

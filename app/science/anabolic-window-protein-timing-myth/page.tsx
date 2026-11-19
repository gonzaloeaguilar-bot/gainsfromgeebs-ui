import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import TitanProductInline from "@/components/TitanProductInline";
import { productContextForPath } from "@/lib/productContext";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/anabolic-window-protein-timing-myth";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Is the Anabolic Window a Myth? Protein Timing, Explained",
  description:
    "Total daily protein matters more than a shake within 30 minutes of training. What the ISSN position stand and timing trials say about when to eat protein.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Is the Anabolic Window a Myth? Protein Timing, Explained",
    description:
      "Total daily protein matters more than a shake within 30 minutes of training. What the ISSN position stand and timing trials say about when to eat protein.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Anabolic window protein timing myth science review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is the Anabolic Window a Myth? Protein Timing, Explained",
    description:
      "Clinical trials show total daily protein intake and regular distribution drive hypertrophy, refuting the rigid 30-minute post-workout window.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  study: string;
  population: string;
  protocol: string;
  outcome: string;
  grade: string;
  pmid: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    study: "Schoenfeld et al. (2013)",
    population: "23 human RCTs (252 participants)",
    protocol: "Meta-analysis of pre/post protein timing vs delayed intake",
    outcome: "No significant effect of timing on hypertrophy when total daily protein is matched",
    grade: "Grade A — Systematic Review & Meta-Analysis",
    pmid: "24299050",
  },
  {
    study: "Aragon & Schoenfeld (2013)",
    population: "Resistance-trained adults (narrative review)",
    protocol: "Evaluation of post-exercise nutrient timing kinetics",
    outcome: "Anabolic window extends 4-6 hours around workouts depending on pre-workout meal timing",
    grade: "Grade A — Clinical Review",
    pmid: "23360586",
  },
  {
    study: "Areta et al. (2013)",
    population: "24 resistance-trained men (RCT)",
    protocol: "80g whey protein over 12h recovery: 20g q3h vs 10g q1.5h vs 40g q6h",
    outcome: "Intermediate distribution (20g every 3 hours) maximized myofibrillar protein synthesis",
    grade: "Grade A — Isotope Tracer RCT",
    pmid: "23459753",
  },
  {
    study: "Kerksick et al. (2017)",
    population: "ISSN Expert Consensus Panel",
    protocol: "Comprehensive position stand on nutrient timing research",
    outcome: "Meeting total daily protein targets (1.4-2.0 g/kg) is far more vital than immediate post-workout intake",
    grade: "Grade A — Position Stand",
    pmid: "28919842",
  },
  {
    study: "Morton et al. (2018)",
    population: "49 RCTs (1,863 participants)",
    protocol: "Meta-regression of protein supplementation and hypertrophy",
    outcome: "Total protein intake strongly dictates muscle mass gains, dampening timing effect sizes",
    grade: "Grade A — Meta-Regression RCT",
    pmid: "28698222",
  },
];

const faqs = [
  {
    question: "Is the 30-minute post-workout anabolic window real?",
    answer:
      "Clinical trials show that the rigid 30-minute post-workout anabolic window is unsupported for lifters consuming regular protein-containing meals. Muscle protein synthesis remains sensitized to protein intake for hours after resistance exercise.",
  },
  {
    question: "What happens if you do not consume protein immediately after working out?",
    answer:
      "If total daily protein intake is sufficient and you ate a protein meal within 2 to 4 hours before training, delaying post-workout protein ingestion by 1 to 2 hours has no negative impact on muscle growth or strength adaptations.",
  },
  {
    question: "Does protein timing matter for muscle growth?",
    answer:
      "Protein timing plays a secondary role relative to total daily protein volume. However, distributing total daily protein into evenly spaced doses of 0.4 to 0.55 g/kg every 3 to 4 hours provides optimal stimulation for muscle protein synthesis.",
  },
  {
    question: "Is post-workout protein timing more important if training fasted?",
    answer:
      "Yes. Training in a fasted state leaves muscle tissue in a negative net protein balance. In this scenario, consuming 20 to 40 grams of high-quality protein promptly after exercise is important to reverse muscle protein breakdown.",
  },
  {
    question: "How much protein should you eat per meal to build muscle?",
    answer:
      "Research recommends consuming approximately 0.40 to 0.55 grams of protein per kilogram of body weight per meal across 3 to 5 daily meals to maximize total daily muscle protein synthesis.",
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
  headline: "Anabolic Window Myth: Protein Timing vs Total Daily Protein Science",
  description:
    "Total daily protein matters more than a shake within 30 minutes of training. What the ISSN position stand and timing trials say about when to eat protein.",
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
      name: "The effect of protein timing on muscle strength and hypertrophy: a meta-analysis",
      author: { "@type": "Person", name: "Schoenfeld BJ" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "24299050" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/24299050/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Nutrient timing revisited: is there a post-exercise anabolic window?",
      author: [{ "@type": "Person", name: "Aragon AA" }, { "@type": "Person", name: "Schoenfeld BJ" }],
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "23360586" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23360586/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis",
      author: { "@type": "Person", name: "Areta JL" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "The Journal of Physiology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "23459753" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23459753/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "International society of sports nutrition position stand: nutrient timing",
      author: { "@type": "Person", name: "Kerksick CM" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28919842" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/28919842/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
      author: { "@type": "Person", name: "Morton RW" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "British Journal of Sports Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28698222" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/28698222/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Anabolic Window" },
    { "@type": "Thing", name: "Protein Timing" },
    { "@type": "Thing", name: "Muscle Protein Synthesis" },
    { "@type": "Thing", name: "Hypertrophy" },
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
      name: "Anabolic Window Myth",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default async function AnabolicWindowSciencePage() {
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
            <li className="text-cloudText">Anabolic Window Myth</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Nutritional Physiology &amp; Hypertrophy Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Anabolic Window Myth: Protein Timing vs. Total Daily Protein Science
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer Block (First 2 sentences) */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            The classic 30-minute post-workout anabolic window is unsupported by clinical trials when total daily protein is matched.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The classic concept of an urgent, 30-minute post-workout anabolic window is unsupported by clinical trials when total daily protein intake is adequately matched. Muscle protein synthesis remains elevated for hours following resistance training, making total daily protein volume and regular dose distribution far more critical than post-exercise timing speed.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-anabolic-window-myth" className="mt-12">
          <h2
            id="h2-anabolic-window-myth"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is the post-workout anabolic window a myth?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            For decades, popular fitness culture asserted that lifters must consume protein within 30 minutes of finishing a workout to prevent muscle breakdown and maximize muscle growth. However, modern clinical nutrition research refutes this narrow window for individuals meeting total daily protein needs.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In a comprehensive systematic review and meta-analysis of 23 randomized controlled trials (Schoenfeld et al., 2013, PMID 24299050), researchers evaluated muscle hypertrophy outcomes in participants consuming protein immediately post-workout versus those delaying intake. When total daily protein intake was statistically controlled across groups, immediate post-workout protein timing produced no statistically significant additive effect on muscle cross-sectional area or strength gains. The apparent benefits observed in earlier un-equated trials were driven entirely by higher overall protein intake in the timing groups, rather than the timing of the dose itself.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Clinical meta-analyses confirm that when total daily protein intake is matched, consuming protein immediately post-workout provides no significant added muscle growth over delaying ingestion by several hours.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-how-long-after-workout" className="mt-12">
          <h2
            id="h2-how-long-after-workout"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How long after a workout do you actually have to eat protein?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The practical window for post-workout protein intake is determined by amino acid digestion kinetics and the timing of your pre-workout meal. A mixed protein-containing meal consumed 1 to 2 hours before exercise continues releasing essential amino acids into the bloodstream throughout and after your training session.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In a landmark review on nutrient timing kinetics (Aragon &amp; Schoenfeld, 2013, PMID 23360586), clinical evidence showed that the true anabolic window spans roughly 4 to 6 hours around a resistance training session. If a pre-workout meal containing 0.4 to 0.5 g/kg of protein is eaten 1 to 2 hours prior to training, post-workout protein intake can safely occur up to 1 to 2 hours after training without compromising net muscle protein balance. Resistance training elevates intracellular muscle protein synthesis sensitivity for at least 24 hours post-exercise, eliminating the need for panicked post-workout supplement rushing.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            The true anabolic window extends 4 to 6 hours around a resistance training session, providing substantial flexibility for protein consumption before or after exercise.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-timing-vs-total-protein" className="mt-12">
          <h2
            id="h2-timing-vs-total-protein"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does protein timing matter if total daily protein is high enough?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Total daily protein intake remains the overarching nutritional variable governing long-term muscle hypertrophy and body recomposition. When total intake reaches optimal physiological thresholds, subtle differences in dose timing become negligible for the majority of lifters.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            A large-scale meta-regression analyzing 49 resistance training studies (Morton et al., 2018, PMID 28698222) revealed that protein supplementation significantly boosted fat-free mass gains up to a total intake threshold of approximately 1.62 g/kg/day (with upper confidence intervals reaching 2.2 g/kg/day). Beyond total daily intake volume, the official position stand of the International Society of Sports Nutrition (Kerksick et al., 2017, PMID 28919842) emphasizes that hitting daily protein targets far outweighs precise timing protocols for driving training adaptations.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Total daily protein volume is the single primary nutritional driver of resistance training adaptations, rendering precise meal timing secondary for non-fasted lifters.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-space-protein-intake" className="mt-12">
          <h2
            id="h2-space-protein-intake"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How should you space your protein intake throughout the day?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            While immediate post-workout urgency is unnecessary, protein distribution across waking hours does influence daily muscle protein synthesis (MPS) rates. Ingesting single massive doses or skewing intake heavily toward one evening meal produces lower total 24-hour MPS compared to evenly distributed protein boluses.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Acute isotope tracer studies (Areta et al., 2013, PMID 23459753) examined myofibrillar protein synthesis across 12 hours of exercise recovery. Participants consuming 20g of whey protein every 3 hours achieved significantly higher total MPS rates than those taking either small frequent 10g doses every 1.5 hours or large 40g doses every 6 hours. To optimize muscle growth, lifters should target 3 to 5 meals per day spaced 3 to 4 hours apart, with each meal supplying 0.40 to 0.55 g/kg of high-quality protein (equivalent to roughly 30 to 45g for an 80kg individual).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Distributing protein into 3 to 5 distinct doses of 0.4 to 0.55 g/kg across the day optimizes muscle protein synthesis far more effectively than concentrating intake around workouts.
          </blockquote>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-summary-heading" className="mt-14">
          <h2
            id="evidence-summary-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Clinical Evidence Summary: Protein Timing &amp; Hypertrophy
          </h2>
          <p className="mt-2 text-[14px] text-mute">
            Key human randomized controlled trials and meta-analyses evaluating post-workout protein timing and dose distribution.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-cloudText/20 bg-cloudText/[0.05] text-bone font-medium">
                  <th className="p-3">Study &amp; Reference</th>
                  <th className="p-3">Cohort</th>
                  <th className="p-3">Protocol</th>
                  <th className="p-3">Primary Outcome</th>
                  <th className="p-3">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/10 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-cloudText/[0.02]">
                    <td className="p-3 font-medium text-bone">
                      {row.study}
                      <br />
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[12px] text-cloudText underline hover:text-bone"
                      >
                        PMID {row.pmid}
                      </a>
                    </td>
                    <td className="p-3">{row.population}</td>
                    <td className="p-3">{row.protocol}</td>
                    <td className="p-3">{row.outcome}</td>
                    <td className="p-3 text-[12px] text-cloudText">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-labelledby="honest-limits-heading"
          className="mt-14 rounded-[6px] border border-cloudText/25 bg-cloudText/[0.04] p-5 md:p-6"
        >
          <p className="eyebrow text-cloudText">Clinical methodology &amp; limits</p>
          <h2
            id="honest-limits-heading"
            className="display mt-2 text-[20px] leading-[1.18] text-bone md:text-[24px]"
          >
            Honest limits of current protein timing research
          </h2>
          <div className="mt-4 space-y-3 text-[14.5px] leading-[1.65] text-bone/85">
            <p>
              While clinical data strongly refutes the strict 30-minute window, several physiological edge cases and methodological limits exist:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-mute">
              <li>
                <strong className="text-bone">Fasted training exceptions:</strong> Fasted training scenarios present a unique condition where immediate post-workout nutrient delivery becomes moderately more time-sensitive because muscle tissue experiences net negative protein balance prior to exercise.
              </li>
              <li>
                <strong className="text-bone">Extreme athletic populations:</strong> Studies on elite bodybuilders operating at extreme physiological limits with ultra-high training volumes may not fully generalize to recreational lifters.
              </li>
              <li>
                <strong className="text-bone">Study duration constraints:</strong> Acute nitrogen balance and muscle biopsy studies often rely on short intervention periods relative to multi-year training adaptation required for visible lean mass changes.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.03] p-5"
              >
                <h3 className="font-semibold text-bone text-[16px] md:text-[17px]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-bone/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Citations Section */}
        <section aria-labelledby="citations-heading" className="mt-14">
          <h2
            id="citations-heading"
            className="display text-[20px] leading-[1.15] text-bone md:text-[24px]"
          >
            Peer-Reviewed Citations &amp; References
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Schoenfeld BJ, Aragon AA, Krieger JW. (2013)
              </p>
              <p className="text-[13px] text-mute">
                The effect of protein timing on muscle strength and hypertrophy: a meta-analysis. <em>J Int Soc Sports Nutr</em> 10(1): 53.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/24299050/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 24299050
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Aragon AA, Schoenfeld BJ. (2013)
              </p>
              <p className="text-[13px] text-mute">
                Nutrient timing revisited: is there a post-exercise anabolic window? <em>J Int Soc Sports Nutr</em> 10(1): 5.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/23360586/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 23360586
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Areta JL, et al. (2013)
              </p>
              <p className="text-[13px] text-mute">
                Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis. <em>J Physiol</em> 591(9): 2319-31.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/23459753/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 23459753
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Kerksick CM, et al. (2017)
              </p>
              <p className="text-[13px] text-mute">
                International society of sports nutrition position stand: nutrient timing. <em>J Int Soc Sports Nutr</em> 14: 33.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/28919842/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 28919842
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Morton RW, et al. (2018)
              </p>
              <p className="text-[13px] text-mute">
                A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. <em>Br J Sports Med</em> 52(6): 376-384.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/28698222/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 28698222
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
              href="/science/how-much-protein-per-kg"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Protein Target Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Optimal protein intake per kg for hypertrophy and body recomposition.
              </p>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Building Muscle After 40</p>
              <p className="mt-1 text-[13px] text-mute">
                Overcoming anabolic resistance and optimizing protein intake in mature lifters.
              </p>
            </Link>
            <Link
              href="/guides/best-breakfasts-for-testosterone-ranked"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Best Breakfasts Ranked</p>
              <p className="mt-1 text-[13px] text-mute">
                High-protein morning meals designed for testosterone and body composition.
              </p>
            </Link>
            <Link
              href="/science/fresh-research"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Fresh Science Research Hub</p>
              <p className="mt-1 text-[13px] text-mute">
                Latest peer-reviewed exercise physiology and clinical nutrition breakdowns.
              </p>
            </Link>
          </div>
        </section>
        <TitanProductInline
          context={productContextForPath("/science/anabolic-window-protein-timing-myth")}
          source="geebs_science_anabolic_window_protein_timing_myth"
          className="mt-14"
        />
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

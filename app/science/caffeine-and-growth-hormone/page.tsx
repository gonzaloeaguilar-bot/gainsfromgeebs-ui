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
const SLUG = "/science/caffeine-and-growth-hormone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Does Caffeine Affect Growth Hormone? Timing Matters",
  description:
    "How caffeine pre-workout affects acute growth hormone pulses, why late-day caffeine suppresses nocturnal GH pulses via sleep disruption, and practical timing.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Caffeine Affect Growth Hormone? Timing Matters",
    description:
      "What human trials show regarding caffeine intake, acute growth hormone pulses during exercise, and nocturnal GH secretion during sleep.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Caffeine and growth hormone research guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Caffeine Affect Growth Hormone? Timing Matters",
    description:
      "Evidence-graded analysis of caffeine's impact on acute exercise growth hormone pulses and nocturnal sleep spikes.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TableRow = {
  context: string;
  effect: string;
  mechanism: string;
  grade: string;
};

const COMPARISON_ROWS: TableRow[] = [
  {
    context: "Pre-Workout Caffeine Intake",
    effect: "Attenuates acute post-exercise GH peak despite higher effort",
    mechanism: "Elevated circulating free fatty acids exert feedback inhibition on pituitary GH release",
    grade: "Grade A — Human RCT (Wu et al. 2010)",
  },
  {
    context: "Late-Day Caffeine Intake",
    effect: "Suppresses nocturnal pulsatile GH release",
    mechanism: "Blocks adenosine receptors, reducing deep slow-wave sleep duration",
    grade: "Grade A — Systematic Review & Meta-Analysis (Gardiner et al. 2023)",
  },
  {
    context: "Nocturnal Sleep Architecture",
    effect: "Drives ~70% of total daily growth hormone secretion",
    mechanism: "Slow-wave sleep (N3) triggers hypothalamic GHRH release and GH pulses",
    grade: "Grade A — Human Clinical Physiology (Van Cauter & Copinschi 2000)",
  },
];

const faqs = [
  {
    question: "Does taking caffeine before a workout increase growth hormone?",
    answer:
      "Controlled human trial data show that pre-workout caffeine does not increase acute growth hormone spikes after resistance exercise. In fact, high-dose caffeine (6 mg/kg) elevated free fatty acid levels, which blunted the post-workout growth hormone peak compared to placebo.",
  },
  {
    question: "How does evening caffeine hurt growth hormone secretion?",
    answer:
      "Caffeine inhibits adenosine receptors in the brain, reducing total slow-wave (deep) sleep duration. Because the largest surge of growth hormone occurs during early deep sleep stages, truncating slow-wave sleep directly reduces total nocturnal growth hormone secretion.",
  },
  {
    question: "Does a temporary growth hormone spike build more muscle?",
    answer:
      "No. Transient post-workout growth hormone spikes are normal physiological responses to exercise stress, but research shows acute systemic hormone elevations do not drive long-term hypertrophy. Progressive overload, sufficient protein, and total energy balance remain the primary drivers of muscle growth.",
  },
  {
    question: "What is the best caffeine cutoff time to protect growth hormone?",
    answer:
      "Most adults need a caffeine cutoff 8 to 10 hours before sleep to allow plasma concentrations to decline sufficiently for undisturbed slow-wave sleep. Fast metabolizers may tolerate a shorter window, while slow metabolizers need up to 12 hours.",
  },
  {
    question: "Does caffeine elevate cortisol while affecting growth hormone?",
    answer:
      "Yes. Acute caffeine ingestion elevates circulating cortisol alongside catecholamines. While catecholamines increase energy mobilization, high cortisol can oppose anabolic signaling pathways if recovery and sleep are inadequate.",
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
    "Caffeine & Growth Hormone: Pre-Workout Spikes vs. Sleep Disruption",
  description:
    "How caffeine pre-workout affects acute growth hormone pulses, why late-day caffeine suppresses nocturnal GH pulses via sleep disruption, and practical timing.",
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
      name: "Caffeine attenuates acute growth hormone response to a single bout of resistance exercise",
      author: [{ "@type": "Person", name: "Wu BH" }, { "@type": "Person", name: "Lin JC" }],
      datePublished: "2010",
      isPartOf: { "@type": "Periodical", name: "Journal of Sports Science & Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "24149694" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/24149694/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The effect of caffeine on subsequent sleep: A systematic review and meta-analysis",
      author: { "@type": "Person", name: "Gardiner C, Weakley J, Burke LM" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Sleep Medicine Reviews" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36870101" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.smrv.2023.101764",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/36870101/",
        "https://doi.org/10.1016/j.smrv.2023.101764",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Interrelationships between growth hormone and sleep",
      author: [{ "@type": "Person", name: "Van Cauter E" }, { "@type": "Person", name: "Copinschi G" }],
      datePublished: "2000",
      isPartOf: { "@type": "Periodical", name: "Growth Hormone & IGF Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "10984255" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/s1096-6374(00)80011-8",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/10984255/",
        "https://doi.org/10.1016/s1096-6374(00)80011-8",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Caffeine" },
    { "@type": "Thing", name: "Growth Hormone" },
    { "@type": "Thing", name: "Slow-Wave Sleep" },
    { "@type": "Thing", name: "Exercise Physiology" },
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
      name: "Caffeine & Growth Hormone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default async function CaffeineGrowthHormonePage() {
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
            <li className="text-cloudText">Caffeine &amp; Growth Hormone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Endocrinology &amp; Sleep Science</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Caffeine &amp; Growth Hormone: Pre-Workout Spikes vs. Sleep Disruption
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
            How caffeine alters exercise endocrinology and nocturnal pulses.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Acute caffeine administration prior to exercise can augment or alter the exercise-induced pulse of human growth hormone, largely mediated by free fatty acid mobilization and sympathetic nervous system activation. However, taking caffeine late in the day disrupts deep slow-wave sleep, suppressing the natural nocturnal growth hormone pulses that account for the majority of daily GH secretion.
          </p>
        </section>

        {/* Study Comparison Table */}
        <section aria-labelledby="evidence-summary-heading" className="mt-12">
          <h2
            id="evidence-summary-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Evidence Summary: Exercise vs. Sleep Effects
          </h2>
          <p className="mt-3 text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            Human trials evaluate caffeine through two distinct physiological lenses: acute exercise stress versus nocturnal sleep architecture.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-line2 text-bone font-semibold">
                  <th className="pb-3 pr-4">Context</th>
                  <th className="pb-3 pr-4">Hormonal Impact</th>
                  <th className="pb-3 pr-4">Mediating Pathway</th>
                  <th className="pb-3">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line2/50 text-bone/85">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.context}>
                    <td className="py-3.5 pr-4 font-medium text-bone">{row.context}</td>
                    <td className="py-3.5 pr-4">{row.effect}</td>
                    <td className="py-3.5 pr-4">{row.mechanism}</td>
                    <td className="py-3.5 text-mute">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="pre-workout-heading" className="mt-12">
          <h2
            id="pre-workout-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Does taking caffeine before a workout increase growth hormone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Pre-workout caffeine is widely used to lower rate of perceived exertion and increase total training volume. However, controlled exercise physiology trials demonstrate that pre-workout caffeine does not produce a higher acute peak in circulating growth hormone.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            In a randomized controlled trial (Wu et al. 2010, PMID 24149694), healthy men ingested either 6 mg/kg caffeine or placebo 60 minutes prior to a standardized resistance exercise session. While training effort remained high, caffeine ingestion led to significantly elevated free fatty acid (FFA) concentrations in serum. Because circulating free fatty acids exert negative feedback on pituitary somatotropes, the acute post-exercise growth hormone spike was actually blunted compared to placebo.
          </p>
          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[15px] font-semibold text-bone">
              Standalone claim: Pre-workout caffeine alters acute endocrine responses during training, but elevated free fatty acids can actually attenuate peak post-exercise growth hormone release.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="nocturnal-heading" className="mt-12">
          <h2
            id="nocturnal-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            How does caffeine affect nocturnal growth hormone release during sleep?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            While daytime exercise causes small, transient growth hormone surges, the major volume of daily human growth hormone secretion occurs during sleep. Clinical sleep endocrinology research (Van Cauter &amp; Copinschi 2000, PMID 10984255) establishes that up to 70% of daily growth hormone release occurs in pulsatile bursts tied directly to stage 3 non-REM slow-wave sleep (SWS).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Caffeine acts as a central adenosine receptor antagonist. A comprehensive systematic review and meta-analysis of polysomnography trials (Gardiner et al. 2023, PMID 36870101) showed that caffeine taken close to sleep significantly reduces slow-wave sleep duration and delays sleep onset. By reducing deep slow-wave sleep, late-day caffeine suppresses the primary natural pulse generator for growth hormone.
          </p>
          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[15px] font-semibold text-bone">
              Standalone claim: The vast majority of daily growth hormone is secreted during deep slow-wave sleep, making sleep architecture far more consequential for hormonal recovery than pre-workout stimulant intake.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="mechanism-heading" className="mt-12">
          <h2
            id="mechanism-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Does caffeine stimulate growth hormone directly or through exercise intensity?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            In human vivo studies, caffeine does not act as a direct pituitary growth hormone secretagogue. Instead, its physiological downstream effects occur indirectly through central nervous system stimulation, catecholamine surge (epinephrine and norepinephrine), and metabolic substrate shift.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            When caffeine increases exercise capacity, higher movement velocity and metabolic load can trigger systemic stress responses. However, elevated catecholamines and cortisol run in parallel with lipolysis. The resulting mobilization of free fatty acids acts as an endogenous brake on pituitary growth hormone release, demonstrating that caffeine operates through autonomic pathways rather than direct endocrine stimulation.
          </p>
          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[15px] font-semibold text-bone">
              Standalone claim: Caffeine does not directly stimulate pituitary growth hormone synthesis in humans; its exercise endocrinology effects stem from sympathetic activation, catecholamine release, and altered energy metabolite flux.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="timing-heading" className="mt-12">
          <h2
            id="timing-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            How should lifters time caffeine to protect natural growth hormone pulses?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            To balance the athletic performance benefits of caffeine with uncompromised hormonal recovery, caffeine intake should be structured around half-life metabolism. Caffeine has an average elimination half-life of 5 to 7 hours in healthy adults, though metabolic clearance varies between individuals based on CYP1A2 enzyme activity.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Stopping caffeine intake 8 to 10 hours before bedtime allows central nervous system levels to drop sufficiently prior to sleep onset. This timing preserves deep slow-wave sleep duration, safeguarding the physiological surge of growth hormone that supports recovery, tissue repair, and metabolic health.
          </p>
          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[15px] font-semibold text-bone">
              Standalone claim: Protecting nocturnal growth hormone pulses requires establishing an individual caffeine cutoff window that prevents adenosine receptor blockage during slow-wave sleep cycles.
            </p>
          </div>
        </section>

        {/* Honest Limits Section */}
        <section aria-labelledby="limits-heading" className="mt-12">
          <h2
            id="limits-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Honest Limits of the Research
          </h2>
          <div className="mt-4 rounded-md border border-line2 bg-bone/[0.02] p-5">
            <ul className="space-y-3 text-[15px] leading-[1.65] text-bone/85">
              <li className="flex items-start gap-2.5">
                <span className="text-cloudText font-bold">•</span>
                <span>
                  <strong>Transient Spikes vs. Hypertrophy:</strong> Acute post-exercise spikes in growth hormone are systemic stress markers and do not correlate directly with long-term muscle protein synthesis or regional hypertrophy.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cloudText font-bold">•</span>
                <span>
                  <strong>Metabolic Clearance Differences:</strong> Individual genetic variations in CYP1A2 expression create wide differences in caffeine clearance rates, making standard hourly cutoff rules an estimate rather than a universal guarantee.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cloudText font-bold">•</span>
                <span>
                  <strong>Cortisol Confounding:</strong> High doses of caffeine elevate cortisol alongside catecholamines. When recovery is compromised, persistent cortisol elevation can oppose anabolic pathways regardless of acute growth hormone status.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-section-heading" className="mt-14">
          <h2
            id="faq-section-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-line2 bg-bone/[0.015] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">
                  {faq.question}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-mute">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Citations */}
        <section aria-labelledby="citations-heading" className="mt-14">
          <h2
            id="citations-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Primary Citations
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Wu BH, Lin JC.</strong> (2010). <em>Caffeine attenuates acute growth hormone response to a single bout of resistance exercise.</em> Journal of Sports Science &amp; Medicine, 9(2):262-269.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/24149694/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  24149694
                </a>
              </p>
            </div>
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Gardiner C, Weakley J, Burke LM, et al.</strong> (2023). <em>The effect of caffeine on subsequent sleep: A systematic review and meta-analysis.</em> Sleep Medicine Reviews, 69:101764.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/36870101/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  36870101
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.1016/j.smrv.2023.101764"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.1016/j.smrv.2023.101764
                </a>
              </p>
            </div>
            <div className="rounded-lg border border-line2 bg-bone/[0.025] p-5">
              <p className="text-[14.5px] leading-[1.6] text-bone/90">
                <strong>Van Cauter E, Copinschi G.</strong> (2000). <em>Interrelationships between growth hormone and sleep.</em> Growth Hormone &amp; IGF Research, 10 Suppl B:S57-62.
              </p>
              <p className="mt-2 text-[13.5px] text-mute">
                PMID:{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/10984255/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10984255
                </a>{" "}
                | DOI:{" "}
                <a
                  href="https://doi.org/10.1016/s1096-6374(00)80011-8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline underline-offset-4 hover:text-cloudText"
                >
                  10.1016/s1096-6374(00)80011-8
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[18px] font-semibold text-bone">Internal Resources &amp; Related Pages</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/nutrition/caffeine-performance"
                className="btn btn-secondary"
              >
                Caffeine &amp; Athletic Performance
              </Link>
              <Link
                href="/nutrition/muscle-after-40"
                className="btn btn-secondary"
              >
                Muscle After 40
              </Link>
              <Link
                href="/nutrition/longevity"
                className="btn btn-secondary"
              >
                Longevity &amp; Performance Hub
              </Link>
              <Link
                href="/guides/best-breakfasts-for-testosterone-ranked"
                className="btn btn-secondary"
              >
                Best Breakfasts for Testosterone
              </Link>
              <Link href="/apply" className="btn btn-primary">
                Apply for coaching &rarr;
              </Link>
            </div>
          </div>
        </section>
        <TitanProductInline
          context={productContextForPath("/science/caffeine-and-growth-hormone")}
          source="geebs_science_caffeine_and_growth_hormone"
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

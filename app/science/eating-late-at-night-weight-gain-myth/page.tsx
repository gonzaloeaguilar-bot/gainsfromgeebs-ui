import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/eating-late-at-night-weight-gain-myth";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Does Eating Late at Night Cause Weight Gain? (What Human RCTs Show)",
  description:
    "Evaluating meal timing and body fat gain across human metabolic trials, energy expenditure, pre-bed protein ingestion, and appetite regulation.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Does Eating Late at Night Cause Weight Gain? (What Human RCTs Show)",
    description:
      "What metabolic chamber RCTs show about late-night meal timing, 24-hour energy expenditure, fat balance, and pre-sleep protein ingestion.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Late night eating weight gain myth science review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Eating Late at Night Cause Weight Gain? (What Human RCTs Show)",
    description:
      "Direct experimental evidence on late eating, circadian energy expenditure, pre-bed protein, and calorie balance.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type StudyRow = {
  study: string;
  design: string;
  grade: string;
  population: string;
  intake: string;
  finding: string;
  pmid: string;
};

const STUDY_ROWS: StudyRow[] = [
  {
    study: "Ruddick-Collins et al. (2022)",
    design: "Randomized Crossover Trial (4 weeks)",
    grade: "Grade A (Human RCT Crossover)",
    population: "30 adults with overweight or obesity",
    intake: "Morning-heavy (45% breakfast) vs. Evening-heavy (45% dinner), calorie-equated",
    finding:
      "Total 24-hour energy expenditure, resting metabolic rate, and body composition changes were identical between morning-heavy and evening-heavy diets.",
    pmid: "36087576",
  },
  {
    study: "Vujović et al. (2022)",
    design: "Controlled Inpatient Crossover Trial",
    grade: "Grade A (Human RCT Crossover)",
    population: "16 adults with overweight or obesity",
    intake: "Early eating vs. Late eating (4 hours delayed), strictly isocaloric",
    finding:
      "Late eating suppressed 24-hour leptin, increased ghrelin-to-leptin ratio, decreased waking energy expenditure, and altered adipose gene expression favoring fat storage.",
    pmid: "36198293",
  },
  {
    study: "Res et al. (2012)",
    design: "Randomized Controlled Trial",
    grade: "Grade A (Human RCT)",
    population: "16 healthy young men",
    intake: "40g casein protein pre-bed vs. placebo post-exercise",
    finding:
      "Pre-bed protein was effectively digested and absorbed overnight, increasing muscle protein synthesis by 22% compared to placebo.",
    pmid: "22330017",
  },
  {
    study: "Snijders et al. (2015)",
    design: "12-Week Randomized Controlled Trial",
    grade: "Grade A (12-Week RCT)",
    population: "44 resistance-trained young men",
    intake: "27.5g protein pre-bed supplement vs. non-caloric placebo daily",
    finding:
      "Presleep protein supplementation significantly increased muscle quadriceps area and strength gains over 12 weeks of training without increasing body fat mass.",
    pmid: "25926415",
  },
  {
    study: "Bandín et al. (2015)",
    design: "Randomized Crossover Trial",
    grade: "Grade B (Randomized Crossover Trial)",
    population: "10 healthy women",
    intake: "Early vs. Late meal timing protocol",
    finding:
      "Late meal consumption decreased resting energy expenditure and carbohydrate oxidation, impairing glucose tolerance.",
    pmid: "25311083",
  },
];

const faqs = [
  {
    question: "Does eating food right before bed automatically turn into body fat?",
    answer:
      "No. Body fat storage is governed by total daily energy balance over time, not the time on the clock. If total daily calories match your energy expenditure, calories consumed at night do not inherently turn into extra fat.",
  },
  {
    question: "Why do so many diet plans advise against eating after 8 PM?",
    answer:
      "Cutting off food late at night works as a practical rule for many people because it eliminates late-night snacking on calorie-dense foods like ice cream, chips, or high-calorie snacks, effectively reducing total daily calorie intake.",
  },
  {
    question: "Is it beneficial to eat protein before going to sleep?",
    answer:
      "Yes. Clinical trials demonstrate that consuming 30–40 grams of slow-digesting protein (such as casein or cottage cheese) before sleep provides sustained amino acid delivery, supporting overnight muscle protein synthesis and recovery without causing body fat accumulation.",
  },
  {
    question: "Does eating late slow down your metabolic rate overnight?",
    answer:
      "Metabolic chamber studies show that total 24-hour energy expenditure remains nearly identical whether calories are loaded in the morning or evening when total daily calories are strictly matched. However, late meals can temporarily reduce waking resting metabolic rate and shift gut hormone signals.",
  },
  {
    question: "How does late eating affect sleep quality and insulin sensitivity?",
    answer:
      "Large, high-fat or high-carbohydrate meals consumed within one hour of sleep can impair sleep architecture and reduce next-morning insulin sensitivity due to natural circadian rhythms in glucose tolerance.",
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
  headline: "Does Eating Late at Night Cause Weight Gain? (What Human RCTs Show)",
  description:
    "Clinical trial evidence directly comparing morning versus late-night meal timing under strict calorie-equated conditions shows eating late at night does not inherently increase body fat gain under energy balance.",
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
      name: "Timing of daily calorie loading affects appetite and hunger responses without changes in energy metabolism in healthy subjects with obesity",
      author: { "@type": "Person", name: "Ruddick-Collins LC" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Cell Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36087576" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/36087576/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Late isocaloric eating increases hunger, decreases energy expenditure, and modifies metabolic pathways in adults with overweight and obesity",
      author: { "@type": "Person", name: "Vujović N" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Cell Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36198293" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/36198293/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Protein ingestion before sleep improves postexercise overnight recovery",
      author: { "@type": "Person", name: "Res PT" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "Medicine and Science in Sports and Exercise" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "22330017" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/22330017/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Protein Ingestion before Sleep Increases Muscle Mass and Strength Gains during Prolonged Resistance-Type Exercise Training in Healthy Young Men",
      author: { "@type": "Person", name: "Snijders T" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "The Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "25926415" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/25926415/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Meal timing affects glucose tolerance, substrate oxidation and circadian-related variables: A randomized, crossover trial",
      author: { "@type": "Person", name: "Bandín C" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "International Journal of Obesity" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "25311083" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/25311083/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Meal Timing" },
    { "@type": "Thing", name: "Energy Expenditure" },
    { "@type": "Thing", name: "Pre-bed Protein Ingestion" },
    { "@type": "Thing", name: "Circadian Rhythm and Metabolism" },
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
      name: "Eating Late at Night Weight Gain Myth",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

function PubMedLink({ pmid, children }: { pmid: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-bone text-sky-400"
    >
      {children}
    </a>
  );
}

export default function EatingLateAtNightWeightGainMythPage() {
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
            <li className="text-cloudText">Eating Late at Night Weight Gain Myth</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="eyebrow text-cloudText">Peer-Reviewed Energy Balance &amp; Chronobiology Analysis</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Does Eating Late at Night Actually Make You Gain Weight?
          </h1>
        </header>

        {/* Direct Answer Block - First 2 Sentences */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
            Direct Answer
          </h2>
          <p className="text-[17px] leading-[1.65] text-bone font-medium">
            Clinical trial evidence directly comparing morning versus late-night meal timing under strict calorie-equated conditions is thin, relying on a single tightly controlled crossover study. Under strict energy balance, eating late at night does not inherently increase body fat gain, though late-night eating frequently promotes excess calorie intake due to appetite regulation shifts and mindless snacking.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-cloudText">
            While metabolic chamber research confirms that 24-hour calorie burning is identical whether food is eaten early or late, late-night meals can alter appetite hormones like leptin and ghrelin, making calorie adherence significantly harder in real-world settings.
          </p>
        </section>

        {/* H2 Section 1 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Does eating late at night actually make you gain more fat?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The belief that calories consumed after a specific time automatically store as body fat stems from misinterpreting human energy metabolism. In a tightly controlled randomized crossover trial by <PubMedLink pmid="36087576">Ruddick-Collins et al. (2022)</PubMedLink> (PMID 36087576), subjects completed two 4-week dietary phases: one morning-heavy (45% of daily calories at breakfast) and one evening-heavy (45% of daily calories at dinner), while total daily calories, protein, and physical activity were strictly matched.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Human crossover trials under strict calorie control confirm that shifting calories from morning to late evening does not alter 24-hour energy expenditure or accelerate body fat storage.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The study demonstrated that 24-hour energy expenditure, resting metabolic rate, and body composition changes were identical between the morning-heavy and evening-heavy diets. Thermodynamic law dictates that body mass balance is dictated by total daily energy intake relative to total daily energy expenditure, regardless of meal timing.
          </p>
        </section>

        {/* H2 Section 2 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            How does eating before bed affect your metabolism and digestion?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            While late eating does not alter 24-hour total energy expenditure, it does exert measurable effects on circadian metabolic pathways and appetite regulation. In an inpatient clinical study by <PubMedLink pmid="36198293">Vujović et al. (2022)</PubMedLink> (PMID 36198293), researchers evaluated identical meals eaten either early in the day or 4 hours later in the evening under strict light, sleep, and physical activity controls.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Late meal timing suppresses 24-hour satiety hormone levels and lowers waking resting energy expenditure, creating physiological conditions that encourage overeating.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Late eating significantly decreased the 24-hour concentration of leptin (the satiety hormone), increased the ratio of ghrelin to leptin, and lowered waking resting energy expenditure. Furthermore, gene expression in subcutaneous adipose tissue shifted toward increased lipid deposition (adipogenesis) and decreased lipolysis. Additionally, research by <PubMedLink pmid="25311083">Bandín et al. (2015)</PubMedLink> (PMID 25311083) confirmed that late dinner timing alters glucose tolerance and substrate oxidation.
          </p>
        </section>

        {/* H2 Section 3 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Is eating protein before sleep good or bad for muscle building?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            While large high-fat or high-carbohydrate meals late at night can disrupt sleep architecture, consuming slow-digesting protein before bed is a well-validated strategy for muscle preservation and strength development. In a landmark clinical trial by <PubMedLink pmid="22330017">Res et al. (2012)</PubMedLink> (PMID 22330017), healthy young men ingested 40 grams of casein protein 30 minutes before sleep following evening resistance training.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Presleep slow-digesting protein ingestion effectively stimulates overnight muscle protein synthesis and long-term hypertrophy without increasing body fat accumulation.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The study found that presleep casein was efficiently digested and absorbed throughout the night, elevating circulating plasma amino acids and increasing overnight muscle protein synthesis by 22%. Building on these acute findings, a 12-week clinical intervention by <PubMedLink pmid="25926415">Snijders et al. (2015)</PubMedLink> (PMID 25926415) demonstrated that resistance-trained men supplementing with 27.5g of protein before sleep gained significantly greater muscle mass and quadriceps cross-sectional area compared to placebo, with zero increase in body fat.
          </p>
        </section>

        {/* H2 Section 4 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Why do people gain weight when they eat late at night?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            If eating late does not inherently decrease 24-hour calorie burning, why is late-night eating consistently correlated with body fat gain in population studies? The answer lies in behavioral habits, hyper-palatable food availability, and appetite signaling rather than thermodynamic metabolic shutdown.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Late-night weight gain in free-living conditions is driven by unmonitored calorie surpluses from ultra-processed snacks and altered hunger cues, not clock-dependent fat storage.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Late-night eating usually occurs while relaxing, watching screens, or socializing, when decision fatigue is high and self-control is depleted. Most late-night snacks consist of highly palatable, energy-dense foods combining fats and refined carbohydrates. When combined with late-night alcohol intake, total daily energy intake routinely exceeds energy expenditure, producing a calorie surplus that drives body fat accumulation.
          </p>
        </section>

        {/* Summary Evidence Table */}
        <section className="mb-12">
          <h2 className="text-[22px] font-bold leading-tight text-bone mb-4">
            Summary of Human Meal Timing &amp; Metabolism Studies
          </h2>
          <div className="overflow-x-auto rounded-xl border border-bone/15">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-bone/[0.025] text-bone border-b border-bone/15">
                <tr>
                  <th className="px-4 py-3 font-semibold">Study &amp; Citation</th>
                  <th className="px-4 py-3 font-semibold">Study Design</th>
                  <th className="px-4 py-3 font-semibold">Population &amp; Protocol</th>
                  <th className="px-4 py-3 font-semibold">Key Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone/10 text-cloudText">
                {STUDY_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-bone/[0.025]">
                    <td className="px-4 py-3 font-medium text-bone">
                      <PubMedLink pmid={row.pmid}>{row.study}</PubMedLink>
                      <div className="text-xs text-sky-400 font-mono mt-0.5">{row.grade}</div>
                    </td>
                    <td className="px-4 py-3">{row.design}</td>
                    <td className="px-4 py-3">
                      <div>{row.population}</div>
                      <div className="text-xs text-mute mt-0.5">{row.intake}</div>
                    </td>
                    <td className="px-4 py-3 text-cloudText">{row.finding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Note */}
        <section className="mb-12 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Honest Limits: What the Evidence Does NOT Show
          </h2>
          <ul className="space-y-3 text-[15px] leading-[1.6] text-cloudText">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Controlled metabolic trials are limited:</strong> Only one clinical trial strictly controls energy intake in a metabolic ward environment to isolate timing from calorie surplus.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Circadian effects on insulin sensitivity:</strong> Circadian misalignment and sleep quality can impair next-morning insulin sensitivity when large, high-fat meals are eaten immediately before sleep.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Observational confounding in free-living studies:</strong> Real-world observational data is heavily confounded by late-night hyper-palatable snack availability and alcohol co-ingestion.
              </span>
            </li>
          </ul>
        </section>

        {/* Internal Links */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h3 className="text-[18px] font-semibold text-bone mb-4">
            Related Science &amp; Nutrition Guides
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/science/how-much-protein-per-kg"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">How Much Protein Per Kg</p>
              <p className="mt-1 text-xs text-mute">Settling protein intake targets with meta-analytic research ceilings.</p>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Nutrition Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Building Muscle After 40</p>
              <p className="mt-1 text-xs text-mute">Protein targets, muscle preservation, and recovery timing after 40.</p>
            </Link>
            <Link
              href="/guides/best-breakfasts-for-testosterone-ranked"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Nutrition Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Best Breakfasts Ranked</p>
              <p className="mt-1 text-xs text-mute">Morning meal timing, macronutrients, and hormone optimization.</p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-bone/15 bg-bone/[0.025] p-6">
                <h3 className="text-[18px] font-semibold text-bone">{faq.question}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-cloudText">{faq.answer}</p>
              </div>
            ))}
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

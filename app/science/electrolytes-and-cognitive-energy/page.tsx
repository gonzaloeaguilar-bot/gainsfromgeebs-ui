import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/electrolytes-and-cognitive-energy";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Electrolytes and Cognitive Energy: What Clinical Trials Show",
  description:
    "Evaluating clinical evidence on fluid-electrolyte balance, serum sodium, potassium, magnesium, and mental alertness, executive function, and fatigue during cognitive tasks.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Electrolytes and Cognitive Energy: What Clinical Trials Show",
    description:
      "Clinical evidence breakdown on fluid-electrolyte balance, serum sodium, potassium, magnesium, and mental alertness during cognitive tasks.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Electrolytes and cognitive energy clinical research review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electrolytes and Cognitive Energy: What Clinical Trials Show",
    description:
      "What peer-reviewed RCTs show about fluid deficits, electrolyte supplementation, executive function, and perceived mental fatigue.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TableRow = {
  study: string;
  design: string;
  grade: string;
  population: string;
  protocol: string;
  finding: string;
  pmid: string;
};

const STUDY_ROWS: TableRow[] = [
  {
    study: "Wittbrodt MT et al. (2018)",
    design: "Meta-Analysis of 33 Studies",
    grade: "Grade A — Systematic Review & Meta-Analysis",
    population: "Healthy adults across cognitive test batteries",
    protocol: "Dehydration (>1% body mass deficit) vs rehydrated control",
    finding:
      "Dehydration significantly impairs cognitive performance, with executive function, attention, and motor coordination showing the largest deficits.",
    pmid: "29933347",
  },
  {
    study: "Ganio MS et al. (2011)",
    design: "Double-Blind Crossover RCT",
    grade: "Grade A — Double-Blind RCT",
    population: "26 healthy young men",
    protocol: "Mild dehydration (~1.4% fluid loss) vs. fluid replacement",
    finding:
      "Mild fluid deficit degraded visual vigilance, working memory, and increased subjective fatigue and task anxiety without altering gross motor tasks.",
    pmid: "21736786",
  },
  {
    study: "Armstrong LE et al. (2012)",
    design: "Double-Blind Crossover RCT",
    grade: "Grade A — Double-Blind RCT",
    population: "25 healthy young women",
    protocol: "Mild dehydration (~1.36% body mass loss) induced by exercise/diuretic",
    finding:
      "Mild fluid loss caused degraded mood, lower concentration, and increased headache frequency during cognitive endurance testing.",
    pmid: "22190027",
  },
  {
    study: "Zhang J et al. (2021)",
    design: "Randomized Controlled Trial",
    grade: "Grade A — Human RCT",
    population: "136 young adult men and women",
    protocol: "12-hour water restriction followed by 500 mL water rehydration",
    finding:
      "Rehydration rapidly restored short-term memory, attention scores, and subjective alertness to baseline levels following fluid deprivation.",
    pmid: "34684650",
  },
  {
    study: "Zhang J et al. (2018)",
    design: "Randomized Controlled Trial",
    grade: "Grade A — Human RCT",
    population: "114 healthy young adults",
    protocol: "Controlled fluid deprivation and rehydration monitoring",
    finding:
      "Fluid status directly modulated processing speed and alertness scales, confirming cognitive recovery upon restoring fluid-electrolyte balance.",
    pmid: "30720789",
  },
];

const faqs = [
  {
    question: "Do electrolytes actually give you mental energy?",
    answer:
      "Electrolytes do not act as cellular stimulants like caffeine. However, key minerals like sodium, potassium, and magnesium maintain neuronal membrane potential and plasma volume. Correcting a fluid or electrolyte deficit restores baseline alertness, processing speed, and executive function.",
  },
  {
    question: "How does mild dehydration cause brain fog and fatigue?",
    answer:
      "A fluid deficit as small as 1 to 2% of body mass increases plasma osmolality and reduces cerebral blood volume, triggering cellular stress responses in cortical regions. This manifests subjectively as brain fog, slower reaction times, and heightened mental fatigue during demanding cognitive tasks.",
  },
  {
    question: "Which electrolytes matter most for focus and mental clarity?",
    answer:
      "Sodium is the critical extracellular ion maintaining serum volume and blood pressure. Potassium and magnesium regulate nerve impulse transmission and intracellular cellular energy (ATP) stability. Deficits in any of these three disrupt neural signaling and perceived alertness.",
  },
  {
    question: "Should you take electrolytes for work or study session focus?",
    answer:
      "If you are well-hydrated and consuming a nutrient-dense diet, supplemental electrolytes offer no additional boost to executive function. However, if you train hard, sweat heavily, follow a ketogenic/low-carb diet, or drink coffee all day without adequate mineral intake, electrolytes prevent cognitive dips caused by mild fluid-mineral depletion.",
  },
  {
    question: "Is drinking plain water enough to restore mental clarity?",
    answer:
      "For mild thirst in everyday office environments, plain water is typically sufficient. However, after prolonged sweating, intense workouts, or prolonged fasting, drinking large volumes of plain water without electrolytes can dilute serum sodium (hyponatremia), worsening fatigue rather than restoring mental clarity.",
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
  headline: "Electrolytes and Cognitive Energy: What Clinical Trials Show",
  description:
    "Evaluating clinical evidence on fluid-electrolyte balance, serum sodium, potassium, magnesium, and mental alertness, executive function, and fatigue during cognitive tasks.",
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
      name: "Dehydration Impairs Cognitive Performance: A Meta-analysis",
      author: { "@type": "Person", name: "Wittbrodt MT" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "Medicine and Science in Sports and Exercise" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29933347" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/29933347/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Mild dehydration impairs cognitive performance and mood of men",
      author: { "@type": "Person", name: "Ganio MS" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "The British Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21736786" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/21736786/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Mild dehydration affects mood in healthy young women",
      author: { "@type": "Person", name: "Armstrong LE" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "The Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "22190027" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/22190027/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effects of Water Restriction and Supplementation on Cognitive Performances and Mood among Young Adults in Baoding, China: A Randomized Controlled Trial (RCT)",
      author: { "@type": "Person", name: "Zhang J" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34684650" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/34684650/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The Effects of Hydration Status on Cognitive Performances among Young Adults in Hebei, China: A Randomized Controlled Trial (RCT)",
      author: { "@type": "Person", name: "Zhang J" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "International Journal of Environmental Research and Public Health" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30720789" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/30720789/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Electrolytes and Cognition" },
    { "@type": "Thing", name: "Dehydration and Executive Function" },
    { "@type": "Thing", name: "Serum Sodium and Potassium Balance" },
    { "@type": "Thing", name: "Mental Alertness and Fatigue" },
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
      name: "Electrolytes and Cognitive Energy",
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

export default function ElectrolytesCognitiveEnergyPage() {
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
            <li className="text-cloudText">Electrolytes &amp; Cognitive Energy</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="eyebrow text-cloudText">Peer-Reviewed Evidence Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Electrolytes and Cognitive Energy: What Clinical Trials Show
          </h1>
        </header>

        {/* Answer Block - First 2 Sentences */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
            Direct Answer
          </h2>
          <p className="text-[17px] leading-[1.65] text-bone font-medium">
            Mild dehydration and acute electrolyte depletion measurably impair executive function, reaction time, and perceived alertness during sustained mental tasks. Electrolyte supplementation restores baseline cognitive performance when fluid or mineral deficits exist, but offers no additional brain-boosting effect in well-hydrated, electrolyte-replete individuals.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-cloudText">
            The belief that electrolyte supplements provide direct central stimulant energy stems from confusing deficit resolution with performance enhancement. When cellular hydration or serum ion balance dips below baseline, neuronal action potentials and cerebral perfusion slow down. Restoring fluid and mineral balance removes this brake, bringing executive processing and alertness back to normal operating capacity.
          </p>
        </section>

        {/* H2 Section 1 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Do electrolytes actually give you mental energy?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Electrolytes do not supply calories or block adenosine receptors like caffeine. Instead, mineral ions—primarily sodium, potassium, calcium, and magnesium—act as essential catalysts that regulate plasma volume, cellular osmolality, and nerve impulse transmission. In a comprehensive meta-analysis of 33 human studies by <PubMedLink pmid="29933347">Wittbrodt MT et al. (2018)</PubMedLink> (PMID 29933347), researchers confirmed that body water deficits greater than 1% significantly impair cognitive performance, with attention, executive function, and motor coordination showing the sharpest drops.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Electrolytes restore baseline executive function and mental clarity by correcting fluid and ionic deficits, rather than stimulating central nervous system activity like caffeine.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            When you take electrolytes during a cognitive slump, any noticeable rise in alertness is the physiological relief of reversing subclinical dehydration or mineral loss. If your body is already in optimal fluid and electrolyte balance, taking extra sodium or potassium produces zero measurable gain in working memory or processing speed.
          </p>
        </section>

        {/* H2 Section 2 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            How does mild dehydration cause brain fog and fatigue?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Even minor fluid losses—between 1% and 2% of total body mass—alter central nervous system mechanics before severe physical thirst registers. In a double-blind crossover trial in healthy young men by <PubMedLink pmid="21736786">Ganio MS et al. (2011)</PubMedLink> (PMID 21736786), mild dehydration (~1.4% fluid deficit) impaired visual vigilance and working memory while significantly increasing subjective fatigue and task anxiety.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;A fluid deficit of just 1% to 2% reduces cerebral perfusion and increases neural effort, causing perceived brain fog and visual vigilance fatigue during mental work.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Similarly, a controlled trial in healthy young women by <PubMedLink pmid="22190027">Armstrong LE et al. (2012)</PubMedLink> (PMID 22190027) showed that mild fluid deficits degrades mood, degrades concentration, and increases headache frequency. When plasma osmolality rises, cellular volume shrinks, forcing brain regions to work harder to execute standard cognitive tasks. In randomized controlled rehydration trials by <PubMedLink pmid="34684650">Zhang J et al. (2021)</PubMedLink> (PMID 34684650) and <PubMedLink pmid="30720789">Zhang J et al. (2018)</PubMedLink> (PMID 30720789), restoring fluid balance rapidly normalized short-term memory, attention scores, and subjective fatigue ratings.
          </p>
        </section>

        {/* H2 Section 3 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Which electrolytes matter most for focus and alertness?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Neural firing and mental clarity depend on maintaining exact ion gradients across neuronal membranes:
          </p>
          <ul className="mt-3 space-y-2 text-[15px] leading-[1.65] text-cloudText list-disc pl-6">
            <li>
              <strong className="text-bone">Sodium:</strong> The primary extracellular cation regulating vascular volume and blood pressure. Adequate sodium prevents cerebral hypoperfusion during long work desk sessions.
            </li>
            <li>
              <strong className="text-bone">Potassium:</strong> Works in tandem with sodium via the Na+/K+-ATPase pump to maintain resting membrane potential across cortical neurons.
            </li>
            <li>
              <strong className="text-bone">Magnesium:</strong> Regulates NMDA receptor activation and stabilizes ATP complexes required for brain energy production. Learn more in our clinical review on <Link href="/science/magnesium" className="underline hover:text-bone text-sky-400">magnesium science and sleep quality</Link>.
            </li>
          </ul>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Sodium maintains vascular blood flow to the brain, while potassium and magnesium govern nerve signal conduction and cellular ATP synthesis.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Maintaining mineral balance supports systemic health and cellular resilience, which is essential for long-term healthspan as covered in our guide to <Link href="/nutrition/longevity" className="underline hover:text-bone text-sky-400">longevity nutrition strategies</Link> and maintaining high energy when training for <Link href="/nutrition/muscle-after-40" className="underline hover:text-bone text-sky-400">muscle retention after 40</Link>.
          </p>
        </section>

        {/* H2 Section 4 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Should you take electrolytes for work or study session focus?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Whether supplemental electrolytes improve your focus during deep work depends entirely on your current hydration and mineral state:
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Electrolyte supplements benefit focus during desk work primarily when sweating, fasting, low-carb dieting, or heavy coffee intake creates a genuine mineral deficit.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            If you exercise in the morning, sit in air-conditioned offices drinking multiple cups of coffee (a mild diuretic), or follow a low-carb diet that accelerates renal sodium excretion, you are prone to mild electrolyte depletion by mid-afternoon. Replacing sodium, potassium, and magnesium with water during work sessions prevents cognitive slumps. Conversely, if you are sedentary and consume well-salted whole foods, plain water is completely sufficient.
          </p>
        </section>

        {/* Summary Evidence Table */}
        <section className="mb-12">
          <h2 className="text-[22px] font-bold leading-tight text-bone mb-4">
            Summary of Key Human Studies &amp; Evidence Grades
          </h2>
          <div className="overflow-x-auto rounded-xl border border-bone/15">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-bone/[0.025] text-bone border-b border-bone/15">
                <tr>
                  <th className="px-4 py-3 font-semibold">Study &amp; Citation</th>
                  <th className="px-4 py-3 font-semibold">Study Design</th>
                  <th className="px-4 py-3 font-semibold">Population &amp; Protocol</th>
                  <th className="px-4 py-3 font-semibold">Cognitive &amp; Mood Finding</th>
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
                      <div className="text-xs text-mute mt-0.5">{row.protocol}</div>
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
          <ul className="space-y-3 text-[15px] leading-[1.65] text-cloudText list-disc pl-5">
            <li>
              <strong className="text-bone">Acute stress protocols vs. desk work:</strong> Most clinical trials induce fluid deficits via heat exposure, fluid restriction, or strenuous exercise. Results do not guarantee that subtle afternoon sluggishness at a desk is always caused by dehydration.
            </li>
            <li>
              <strong className="text-bone">Deficit restoration vs. supra-physiological boosting:</strong> Studies consistently show cognitive benefits come from reversing a deficit. Taking excess mineral doses beyond dietary requirements yields no additional cognitive enhancement.
            </li>
            <li>
              <strong className="text-bone">Confounding energy factors:</strong> Perceived mental energy is heavily influenced by sleep hygiene, caffeine intake, stress, and blood glucose stability. Electrolytes address fluid-mineral deficits but cannot compensate for chronic sleep deprivation.
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-6">
                <h3 className="text-[18px] font-semibold text-bone mb-2">{faq.question}</h3>
                <p className="text-[15px] leading-[1.65] text-cloudText">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Link Section / Next Reads */}
        <section className="rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h3 className="text-lg font-bold text-bone mb-3">Related Science &amp; Nutrition Guides</h3>
          <p className="text-[15px] text-cloudText mb-4">
            Explore more clinical breakdowns on mineral performance, healthspan, and training nutrition:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/science/magnesium"
              className="flex-1 p-4 rounded-lg border border-bone/10 bg-bone/[0.025] hover:border-sky-400/40 transition-colors"
            >
              <div className="text-xs font-semibold text-sky-400 mb-1">SCIENCE REVIEW</div>
              <div className="text-bone font-medium text-sm">Magnesium Science &amp; Sleep</div>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="flex-1 p-4 rounded-lg border border-bone/10 bg-bone/[0.025] hover:border-sky-400/40 transition-colors"
            >
              <div className="text-xs font-semibold text-sky-400 mb-1">NUTRITION GUIDE</div>
              <div className="text-bone font-medium text-sm">Longevity &amp; Healthspan Strategies</div>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="flex-1 p-4 rounded-lg border border-bone/10 bg-bone/[0.025] hover:border-sky-400/40 transition-colors"
            >
              <div className="text-xs font-semibold text-sky-400 mb-1">NUTRITION GUIDE</div>
              <div className="text-bone font-medium text-sm">Muscle Retention After 40</div>
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

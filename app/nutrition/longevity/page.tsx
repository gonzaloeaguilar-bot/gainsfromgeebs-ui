import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/longevity";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Nutrition for Longevity: What Actually Has Evidence Behind It | Geebs",
  description:
    "An evidence-based look at nutrition for longevity: body composition, muscle mass, olive oil, protein targets, and omega-3s, separated from supplement hype.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Nutrition for Longevity: What Actually Has Evidence Behind It",
    description:
      "What the human research actually supports for long-term healthspan: body composition, muscle mass, olive oil, protein targets, and sensible omega-3 intake.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Nutrition for longevity evidence guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrition for Longevity: What Actually Has Evidence Behind It",
    description:
      "Cut through longevity supplement hype: what human research proves for body composition, muscle retention, olive oil, and protein targets.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

function PubMedLink({ pmid, children }: { pmid: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-bone text-mute"
    >
      {children}
    </a>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the single highest-leverage nutrition change for longevity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There isn't one silver bullet — but maintaining muscle mass and a reasonable body-fat range through adequate protein and consistent training has the broadest evidence base.",
      },
    },
    {
      "@type": "Question",
      name: "Should I be taking longevity supplements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most marketed \"longevity stacks\" don't have the trial depth of the basics (protein, training, sleep, a MUFA-forward diet). Healthy skepticism is the right default.",
      },
    },
    {
      "@type": "Question",
      name: "Is this the same as an anti-aging diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This page avoids \"anti-aging\" framing on purpose — the goal is function and performance over time, not appearance-based claims.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from the testosterone or muscle-after-40 pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They overlap (protein, olive oil, training) but this page frames the same levers around long-term function rather than a single hormone or age bracket.",
      },
    },
    {
      "@type": "Question",
      name: "Does coaching factor into a longevity nutrition plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the consistency piece (training + nutrition sustained for years, not weeks) is where 1:1 coaching does more than any single food choice.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Nutrition for Longevity: What Actually Has Evidence Behind It",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nutrition for Longevity: What Actually Has Evidence Behind It",
  description:
    "An evidence-based look at nutrition for longevity: body composition, muscle mass, olive oil, protein targets, and omega-3s, separated from supplement hype.",
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
      name: "Muscle mass index as a predictor of longevity in older adults",
      author: { "@type": "Person", name: "Srikanthan P" },
      datePublished: "2014",
      isPartOf: { "@type": "Periodical", name: "The American Journal of Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "24791917" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1016/j.amjmed.2014.02.007" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/24791917/",
        "https://doi.org/10.1016/j.amjmed.2014.02.007",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Primary Prevention of Cardiovascular Disease with a Mediterranean Diet Supplemented with Extra-Virgin Olive Oil or Nuts",
      author: { "@type": "Person", name: "Estruch R" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "New England Journal of Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29897866" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1056/NEJMoa1800389" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/29897866/",
        "https://doi.org/10.1056/NEJMoa1800389",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
      author: { "@type": "Person", name: "Morton RW" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "British Journal of Sports Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28698222" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1136/bjsports-2017-097608" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28698222/",
        "https://doi.org/10.1136/bjsports-2017-097608",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Marine Omega-3 Supplementation and Cardiovascular Disease: An Updated Meta-Analysis of 13 Randomized Trials Involving 127 477 Participants",
      author: { "@type": "Person", name: "Hu Y" },
      datePublished: "2019",
      isPartOf: { "@type": "Periodical", name: "Journal of the American Heart Association" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "31567003" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1161/JAHA.119.013543" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/31567003/",
        "https://doi.org/10.1161/JAHA.119.013543",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Nutrition for longevity" },
    { "@type": "Thing", name: "Muscle mass and healthspan" },
    { "@type": "Thing", name: "Monounsaturated fats and cardiovascular health" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Longevity-Focused Online Fitness Coaching for Men",
  serviceType: "longevity-focused online coaching for men",
  provider: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  areaServed: "Worldwide",
  description:
    "Structured 1:1 online fitness coaching for men focused on long-term healthspan, progressive strength training, body composition management, and sustainable nutrition habits.",
  offers: {
    "@type": "Offer",
    price: "90.00",
    priceCurrency: "USD",
    description: "90-day entry program for long-term health and strength",
  },
};

type ClaimRow = {
  claim: string;
  verdict: string;
  grade: string;
  gradeLabel: string;
  population: string;
  pmid?: string;
  doi?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    claim: "Higher muscle mass relative to height predicts lower all-cause mortality in aging adults",
    verdict: "Holds up. Prospective cohort tracking confirms muscle mass index inversely correlates with mortality.",
    grade: "B",
    gradeLabel: "Moderate (Prospective Cohort)",
    population: "3,659 adults over 16 years of follow-up",
    pmid: "24791917",
    doi: "10.1016/j.amjmed.2014.02.007",
  },
  {
    claim: "Replacing saturated fat with extra virgin olive oil reduces major cardiovascular events",
    verdict: "Holds up. Large multi-center trial demonstrates lower cardiovascular event rates.",
    grade: "A",
    gradeLabel: "Strong (RCT)",
    population: "7,447 adults at high cardiovascular risk across 4.8 years",
    pmid: "29897866",
    doi: "10.1056/NEJMoa1800389",
  },
  {
    claim: "Daily protein intake of ~1.6 g/kg (0.8 g/lb) optimizes muscle retention during lifting",
    verdict: "Holds up. Meta-analysis of 49 trials confirms ceiling for resistance training adaptations.",
    grade: "A",
    gradeLabel: "Strong (Meta-Analysis)",
    population: "1,863 adults across 49 clinical trials",
    pmid: "28698222",
    doi: "10.1136/bjsports-2017-097608",
  },
  {
    claim: "Marine omega-3 supplementation reduces risk of fatal myocardial infarction and coronary events",
    verdict: "Holds up. Systematic review of 13 trials shows clear inverse relationship with dose.",
    grade: "A",
    gradeLabel: "Strong (Meta-Analysis of RCTs)",
    population: "127,477 participants across 13 randomized trials",
    pmid: "31567003",
    doi: "10.1161/JAHA.119.013543",
  },
];

export default function Page() {
  return (
    <main className="bg-grain relative min-h-screen text-bone antialiased">
      <JsonLd id="article-schema" data={articleSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="faq-schema" data={faqSchema} />
      <JsonLd id="service-schema" data={serviceSchema} />

      <article className="mx-auto max-w-[760px] px-4 py-12 md:px-6 md:py-20">
        <header className="space-y-4">
          <p className="eyebrow text-cloudText">Nutrition &amp; Healthspan</p>
          <h1 className="display text-bone text-[32px] md:text-[44px] font-bold leading-[1.15] tracking-tight">
            Nutrition for Longevity: What Actually Has Evidence Behind It
          </h1>
          <div className="flex items-center gap-3 text-[13px] text-mute">
            <span>By Kris Oddo, NASM-CPT</span>
            <span>•</span>
            <span>Last updated {REVIEWED}</span>
          </div>
        </header>

        <div className="hair my-8 md:my-10" />

        {/* Lead Answer Block */}
        <section className="prose-section">
          <p className="text-[17px] md:text-[18.5px] leading-[1.7] text-bone/90 font-medium">
            &quot;Longevity nutrition&quot; content online splits into two failure modes: aggressive supplement-stacking with weak evidence, or vague advice with no specificity. This page stays in the space that has real support and connects it to what a busy professional can actually execute: a body-composition range that isn&apos;t chronically over-fat (the strongest, most consistent longevity-adjacent lever nutrition and training can influence together), a monounsaturated-fat-forward eating pattern (olive oil over butter — see the olive-oil research), adequate protein to preserve muscle mass as a function reserve with age (not just an aesthetic goal), and omega-3 intake for cardiometabolic/inflammation markers. It deliberately does not chase individual &quot;longevity compound&quot; trends — that&apos;s a different, faster-decaying content category (see the tongkat ali page for how this site handles trend compounds).
          </p>
        </section>

        <div className="hair my-10" />

        {/* Evidence table */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every claim on this page, graded
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Grades reflect the strength of study design behind each claim, not marketing confidence. Randomized controlled trials and meta-analyses receive top grades, while cohort studies provide supportive observational context.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText border-b border-bone/10">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">
                      {row.claim}
                      {row.pmid && (
                        <span className="block mt-1 text-[13px] text-mute">
                          Source: <PubMedLink pmid={row.pmid}>PMID {row.pmid}</PubMedLink>
                        </span>
                      )}
                    </td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            How study designs are graded is detailed in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 1 — What actually predicts long-term health */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What actually predicts long-term health that nutrition can influence?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Long-term healthspan prediction comes down to body composition and muscle mass as a functional reserve, not a single miracle nutrient. Prospective research (
            <PubMedLink pmid="24791917">Srikanthan et al., 2014</PubMedLink>, The American Journal of Medicine) confirms that higher muscle mass relative to height strongly predicts lower all-cause mortality in aging adults.
          </p>

          <div className="my-6 rounded-lg border-l-2 border-cloudText bg-bone/[0.025] p-4 md:p-5">
            <p className="text-[15px] md:text-[16px] italic leading-[1.65] text-bone">
              &quot;Muscle mass functions as a metabolic reserve in aging, making muscle retention one of the highest-leverage long-term health outcomes nutrition and strength training can support.&quot;
            </p>
          </div>

          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Prospective cohort studies demonstrate clear associations between muscle mass and survival, but muscle retention requires continuous resistance training and adequate protein. Nutrition alone cannot preserve muscle without a physical training stimulus.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 2 — Olive oil over butter pattern */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does the olive-oil-over-butter pattern matter for longevity, not just testosterone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Yes. While individual short-term trials examine dietary fat and testosterone, the landmark PREDIMED trial (
            <PubMedLink pmid="29897866">Estruch et al., 2018</PubMedLink>, New England Journal of Medicine) established that a Mediterranean eating pattern rich in extra virgin olive oil significantly reduces major cardiovascular events across thousands of participants. For the complete evidence breakdown on monounsaturated fats, see our guide on{" "}
            <Link
              href="/science/olive-oil"
              className="underline hover:text-bone"
            >
              olive oil research and evidence
            </Link>
            .
          </p>

          <div className="my-6 rounded-lg border-l-2 border-cloudText bg-bone/[0.025] p-4 md:p-5">
            <p className="text-[15px] md:text-[16px] italic leading-[1.65] text-bone">
              &quot;Replacing saturated fats with extra virgin olive oil improves cardiometabolic risk markers across major clinical trials, regardless of short-term hormonal fluctuations.&quot;
            </p>
          </div>

          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Substituting olive oil for butter improves cardiovascular risk profiles, but adding extra virgin olive oil to an unmanaged calorie surplus will still cause fat gain. Total energy balance remains the foundational rule.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 3 — Protein target */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How does protein target change the longevity conversation?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            In the longevity conversation, protein is not an aesthetic goal — it is the essential nutrient required to preserve muscle mass as a functional reserve with age. Comprehensive meta-analyses (
            <PubMedLink pmid="28698222">Morton et al., 2018</PubMedLink>, British Journal of Sports Medicine) show that targeting approximately 1.6 grams of protein per kilogram of bodyweight (0.8 g/lb) daily maximizes muscle retention during training. Read our full analysis on{" "}
            <Link
              href="/science/how-much-protein-per-kg"
              className="underline hover:text-bone"
            >
              how much protein per kg
            </Link>
            .
          </p>

          <div className="my-6 rounded-lg border-l-2 border-cloudText bg-bone/[0.025] p-4 md:p-5">
            <p className="text-[15px] md:text-[16px] italic leading-[1.65] text-bone">
              &quot;Preserving muscle mass as you age requires targeting roughly 1.6 grams of protein per kilogram of bodyweight daily to overcome age-related shifts in muscle protein synthesis.&quot;
            </p>
          </div>

          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Eating adequate protein provides the necessary amino acid building blocks, but protein alone will not maintain lean mass if total calories are severely deficient or if resistance exercise is absent.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 4 — Longevity supplements */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What about supplements marketed for longevity specifically?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Healthy skepticism is the correct default for marketed &quot;longevity stacks.&quot; Most trendy compound supplements lack long-term human trial depth compared to foundational basics like protein, training, and marine omega-3 fatty acids (
            <PubMedLink pmid="31567003">Hu et al., 2019</PubMedLink>, Journal of the American Heart Association). For an example of how this site evaluates hype versus evidence, compare our review of{" "}
            <Link
              href="/science/tongkat-ali"
              className="underline hover:text-bone"
            >
              tongkat ali evidence
            </Link>
            .
          </p>

          <div className="my-6 rounded-lg border-l-2 border-cloudText bg-bone/[0.025] p-4 md:p-5">
            <p className="text-[15px] md:text-[16px] italic leading-[1.65] text-bone">
              &quot;Most proprietary longevity supplement stacks lack human trial data, while core interventions like protein intake, omega-3s, and regular lifting carry decades of clinical proof.&quot;
            </p>
          </div>

          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Marine omega-3 supplementation shows modest cardiovascular benefits in large meta-analyses, but no pill can compensate for poor sleep, lack of exercise, or chronic over-eating.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 5 — Training fit */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How does training fit into a &apos;longevity nutrition&apos; plan?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Nutrition and training exist in a symbiotic relationship: nutrition supplies the energy and raw materials, while progressive resistance training provides the mechanical stimulus that directs those nutrients toward muscle retention. Neither works in isolation. Men looking to build long-term strength should explore our dedicated guide for{" "}
            <Link
              href="/for/men-over-40"
              className="underline hover:text-bone"
            >
              online fitness coaching for men over 40
            </Link>
            .
          </p>

          <div className="my-6 rounded-lg border-l-2 border-cloudText bg-bone/[0.025] p-4 md:p-5">
            <p className="text-[15px] md:text-[16px] italic leading-[1.65] text-bone">
              &quot;Nutrition provides the raw materials and recovery environment, but progressive strength training delivers the signal that tells your body to maintain muscle and functional capacity over decades.&quot;
            </p>
          </div>

          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Training too frequently without sufficient recovery or nutrition leads to joint stress and burnout. Managing <Link href="/science/studies/resistance-training-dose-response-meta-regression-2026" className="underline hover:text-bone">training volume and intensity</Link> to match your recovery capacity is essential after 40.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ Section */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5] font-semibold">
                  {entry.name}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Proof Module & CTA */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section className="rounded-xl border border-line2 bg-bone/[0.025] p-6 md:p-8">
          <p className="eyebrow text-cloudText">Proof &amp; Coaching</p>
          <h2 className="display mt-2 text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Longevity performance coaching built for the long haul
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Real healthspan gains come from habits sustained for years, not 30-day crash programs. Our 1:1 online coaching provides busy professionals with individualized lifting programming, evidence-graded nutrition targets, and continuous weekly accountability.
          </p>
          <ul className="mt-4 space-y-2 text-[14.5px] md:text-[15.5px] text-bone/80">
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Joint-friendly progressive strength routines (3–4 days/week)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Protein and energy targets tailored to body composition goals
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Direct 1:1 check-ins with Kris Oddo, NASM-CPT
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Sustainable habits designed for busy executive schedules
            </li>
          </ul>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/for/men-over-40" className="btn btn-secondary">
              See program for men over 40
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational content only — not medical advice, and not a diagnosis or treatment for any condition.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

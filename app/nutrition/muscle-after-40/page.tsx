import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/muscle-after-40";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Building Muscle After 40: The Diet That Actually Works | Geebs",
  description:
    "What actually changes nutritionally for men building muscle after 40 — protein requirements, creatine evidence, calorie targets, and realistic recomp expectations.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Building Muscle After 40: The Diet That Actually Works",
    description:
      "What actually changes nutritionally for men over 40: protein needs, creatine benefits, calorie management, and staying consistent.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Building muscle after 40 diet guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Muscle After 40: The Diet That Actually Works",
    description:
      "What changes nutritionally after 40 — protein requirements, creatine evidence, calorie targets, and realistic recomp expectations.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is muscle loss after 40 inevitable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some gradual decline in muscle mass (sarcopenia) is typical without intervention, but resistance training and adequate protein substantially change that trajectory. Age-related muscle loss is largely a consequence of reduced activity and protein intake rather than an unchangeable biological decline.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need more protein than I did in my 20s?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not dramatically more. The same range of roughly 1.6 grams of protein per kilogram of bodyweight (0.7–0.8 g/lb) per day maximizes muscle building and retention at any age. What matters more after 40 is hitting that target consistently day after day.",
      },
    },
    {
      "@type": "Question",
      name: "Is creatine worth adding after 40?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, even more so than at age 25. Research demonstrates a larger relative benefit in lean mass and strength gains for older adults who combine creatine monohydrate supplementation with structured resistance training.",
      },
    },
    {
      "@type": "Question",
      name: "Why does it feel harder to build muscle now than it used to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recovery capacity and life consistency (sleep quality, work stress, family obligations) shift more than the fundamental cellular biology of muscle-building. Shorter recovery windows mean missing protein or sleep for several days causes more friction than it did at 25.",
      },
    },
    {
      "@type": "Question",
      name: "What's the fastest way to see progress at this age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistency over months rather than a perfect single week. This is where 1:1 coaching earns its keep: having a dedicated coach track your nutrition and training weekly and adjust variables before a bad stretch turns into a lost quarter.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Building Muscle After 40: The Diet That Actually Works",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Muscle After 40: The Diet That Actually Works",
  description:
    "An evidence-based look at what changes nutritionally for men over 40: protein needs, creatine benefits, calorie management, and staying consistent.",
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
      name: "Effect of creatine supplementation during resistance training on lean tissue mass and muscular strength in older adults: a meta-analysis",
      author: { "@type": "Person", name: "Chilibeck PD" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Open Access Journal of Sports Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29138605" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.2147/OAJSM.S123529" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/29138605/",
        "https://doi.org/10.2147/OAJSM.S123529",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Muscle building after 40" },
    { "@type": "Thing", name: "Nutrition for men over 40" },
    { "@type": "Thing", name: "Protein requirements" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Muscle-Building Coaching for Men Over 40",
  serviceType: "online muscle-building coaching for men over 40",
  provider: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  areaServed: "Worldwide",
  description:
    "Structured 1:1 online coaching for men over 40 returning to serious training, providing progressive workout programming, customized nutrition targets, and weekly accountability.",
  offers: {
    "@type": "Offer",
    price: "90.00",
    priceCurrency: "USD",
    description: "90-day entry program for men over 40",
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
    claim: "Daily protein target of ~1.6 g/kg (0.8 g/lb) maximizes muscle gains after 40",
    verdict: "Holds up. Upper limit for muscle adaptation does not spike with age.",
    grade: "A",
    gradeLabel: "Strong",
    population: "1,863 adults across 49 clinical trials",
    pmid: "28698222",
    doi: "10.1136/bjsports-2017-097608",
  },
  {
    claim: "Creatine supplementation produces larger relative muscle gains in older adults",
    verdict: "Holds up. Meta-analysis shows increased lean mass and strength vs placebo.",
    grade: "A",
    gradeLabel: "Strong",
    population: "721 older adults across 22 trials",
    pmid: "29138605",
    doi: "10.2147/OAJSM.S123529",
  },
  {
    claim: "Resistance training substantially blunts age-related muscle loss (sarcopenia)",
    verdict: "Holds up. Training stimulus drives protein synthesis at any age.",
    grade: "A",
    gradeLabel: "Strong",
    population: "Adults over 40 undergoing progressive lifting",
  },
  {
    claim: "Metabolic rate slowdown is driven by muscle drift and activity, not biological age",
    verdict: "Holds up. TDEE decline correlates with movement drift and lean mass loss.",
    grade: "B",
    gradeLabel: "Moderate",
    population: "Healthy middle-aged men",
  },
  {
    claim: "Shorter recovery windows make day-to-day protein consistency more critical",
    verdict: "Real mechanism. Missing protein targets for several days causes greater friction.",
    grade: "B",
    gradeLabel: "Moderate",
    population: "Adults 35-50 in active resistance training",
  },
];

function PubMedLink({ pmid, children }: { pmid: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      className="underline hover:text-bone"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function MuscleAfter40Page() {
  return (
    <>
      <JsonLd id="muscle-after-40-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="muscle-after-40-article-schema" data={articleSchema} />
      <JsonLd id="muscle-after-40-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Building Muscle After 40: The Diet That Actually Works
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            When recovery slows down and work demands mount, men wonder how their nutrition needs to adapt after 40. Here is what the research actually supports for protein, creatine, calories, and recomp targets.
          </p>
        </header>

        <div className="hair my-10" />

        {/* Answer block (~180w) */}
        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Search data for the <b>building muscle after 40 diet</b> shows clear demand from men who already train and want to know what changes nutritionally once recovery slows down. The honest answer: not much changes structurally. Protein requirements do not spike dramatically with age, but day-to-day consistency matters significantly more because recovery windows shrink — missing protein targets for a few consecutive days causes more friction at 45 than it did at 25.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Creatine&apos;s marginal benefit is genuinely larger in this age range, with meta-analytic evidence demonstrating superior relative lean mass and strength gains in older adults performing resistance training. At the same time, calorie management gets less forgiving because daily activity levels and total muscle mass — the primary driver of basal metabolic rate — tend to drift downward without deliberate tracking and maintenance.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            This page connects the daily protein target, the evidence for creatine, and realistic calorie expectations into one clear framework — and bridges to structured coaching for the part food alone cannot solve: progressive training stimulus and the accountability to stay consistent across months rather than weeks.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Evidence table */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every claim on this page, graded
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Grades reflect the strength of study design behind each claim, not marketing confidence. Systematic reviews and randomized controlled trials receive top grades.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
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

        {/* H2 1 — do you lose muscle after 40 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Do you lose muscle after 40, and how fast?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Search trends for <i>do you lose muscle after 40</i> reflect a very real concern among middle-aged lifters. The honest reality: age-related muscle loss (sarcopenia) accelerates gradually if unaddressed, typical estimates placing unmanaged loss at 3% to 8% per decade after 30. However, structured progressive resistance training and high protein intake substantially blunt this trajectory, keeping muscle tissue fully responsive to loading.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Muscle loss is not a fixed fate you must accept, but recovering from heavy sessions requires more deliberate programming after 40. Read our full breakdown on{" "}
            <Link
              href="/blog/training-after-35-men"
              className="underline hover:text-bone"
            >
              training after 35 for men
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 2 — protein requirement */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How much protein do you actually need after 40?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Many men searching <i>how to prevent muscle loss after 40</i> assume protein requirements skyrocket with age. The landmark meta-analysis of 49 trials (
            <PubMedLink pmid="28698222">Morton et al., 2018</PubMedLink>, British Journal of Sports Medicine) confirms that the ~1.6 g/kg/day (0.8 g/lb) protein ceiling maximizes resistance-training adaptations across adult age groups. Overshooting past 2.2 g/kg yields diminishing returns.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> What changes after 40 is not the theoretical target, but the penalty for inconsistency. Under-ingesting protein for days at a time compromises recovery far more at 45 than at 25. For practical macro setups, explore{" "}
            <Link
              href="/blog/protein-intake-for-weight-loss-and-muscle-gain"
              className="underline hover:text-bone"
            >
              protein intake for weight loss and muscle gain
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 3 — creatine */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does creatine matter more after 40?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Yes. A systematic meta-analysis of 22 trials in older adults (
            <PubMedLink pmid="29138605">Chilibeck et al., 2017</PubMedLink>, Open Access Journal of Sports Medicine) demonstrated that creatine monohydrate supplementation combined with resistance training produced significantly greater increases in lean tissue mass (+1.4 kg over control) and upper/lower body strength than lifting alone.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Creatine is a high-confidence support, not a replacement for lifting or protein. For a detailed 5g/day protocol, see our guide on{" "}
            <Link
              href="/blog/creatine-for-men-over-30"
              className="underline hover:text-bone"
            >
              creatine for men over 30
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 4 — calorie targets */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How should calorie targets change with age?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Calorie needs do not drop automatically because of a birthday. Rather, total daily energy expenditure (TDEE) drifts down primarily because desk jobs and life load reduce neat physical activity and lean muscle mass. Maintaining or rebuilding muscle mass preserves your baseline metabolic rate.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> Calculate your actual maintenance before setting a deficit or slight surplus. Use our free{" "}
            <Link
              href="/tools/tdee-calculator"
              className="underline hover:text-bone"
            >
              TDEE calculator
            </Link>{" "}
            to establish your baseline.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 5 — week of eating */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does a week of eating look like for muscle after 40?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A successful week of eating after 40 revolves around simple, repeatable defaults: 30–45g of protein per meal across 3 to 4 meals, hydrated training sessions, and a predictable calorie range. Instead of rigid restriction, build a sustainable structure that absorbs business travel, client dinners, and weekend events.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Why the per-meal split matters more after 40 is covered in{" "}
            <Link
              href="/science/meal-frequency-for-muscle-after-40"
              className="underline hover:text-bone"
            >
              meal frequency for muscle after 40
            </Link>
            . To map out your exact macronutrient distribution for body recomposition, step through our guide on{" "}
            <Link
              href="/resources/how-to-calculate-macros-for-body-recomposition"
              className="underline hover:text-bone"
            >
              how to calculate macros for body recomposition
            </Link>
            .
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
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5]">
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
            Built for professionals returning to serious training
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Our typical client is a 42–48 professional returning to structured lifting after a multi-year gap. You do not need a radical overhaul or extreme restrictions; you need progressive training programming, clear protein targets, and weekly 1:1 accountability.
          </p>
          <ul className="mt-4 space-y-2 text-[14.5px] md:text-[15.5px] text-bone/80">
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Customized lifting routines fitted to 3–4 days per week
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Macro targets adjusted weekly based on scale &amp; strength trends
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> Direct 1:1 check-ins with Kris Oddo, NASM-CPT
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cloudText">✓</span> $100 one-time consultation call to map your first 90 days
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
      </ArticleShell>
    </>
  );
}

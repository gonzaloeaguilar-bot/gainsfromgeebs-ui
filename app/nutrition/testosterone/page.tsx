import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Testosterone and Nutrition for Busy Professional Men Over 35 | Geebs",
  description:
    "An evidence-graded guide to testosterone and nutrition for men over 35: what olive oil, zinc, magnesium, and vitamin D actually do, and where the real levers live.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Testosterone and Nutrition for Busy Professional Men Over 35",
    description:
      "What the trial evidence actually shows for dietary swaps, minerals, and vitamin D — and why training, sleep, and body composition remain the foundation.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Testosterone and nutrition guide for men over 35",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testosterone and Nutrition for Busy Professional Men Over 35",
    description:
      "Evidence-graded look at diet, olive oil, zinc, magnesium, and vitamin D for adult men.",
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
      name: "Can diet alone fix suppressed testosterone levels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Nutrition is one input among several, alongside sleep, resistance training, body composition, and overall health history. Anyone concerned about clinically low levels should consult a physician for proper medical evaluation. This page covers structure-function nutrition, not medical diagnosis or treatment.",
      },
    },
    {
      "@type": "Question",
      name: "Is the olive-oil-for-testosterone claim legit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is one controlled trial in 60 healthy adult men over 3 weeks showing a measurable increase in testosterone and luteinizing hormone when swapping butter for extra virgin olive oil. It is promising evidence, but remains a single trial graded C (Early) rather than a settled massive-scale finding.",
      },
    },
    {
      "@type": "Question",
      name: "Should I take a zinc or magnesium supplement for testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only if you are actually deficient. Research shows zinc and magnesium help restore baseline hormone production in men with insufficient dietary intake or heavy physical stress. Adding more on top of an already-sufficient diet does not yield extra benefits.",
      },
    },
    {
      "@type": "Question",
      name: "Is vitamin D worth taking for testosterone specifically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The clinical evidence is mixed. While an early small study suggested a benefit, a larger, later randomized controlled trial (Lerchbaum et al., 2017) found no significant effect on testosterone in healthy men. Vitamin D remains important for bone and overall health, but testosterone alone is not the strongest reason to take it.",
      },
    },
    {
      "@type": "Question",
      name: "What about boron or tongkat ali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boron evidence is weak and inconsistent in small human trials. Tongkat ali has one well-designed trial showing promising hormonal support in stressed subjects, but requires broader replication before being considered a primary intervention.",
      },
    },
    {
      "@type": "Question",
      name: "If nutrition is only a modest lever, what actually moves the needle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistent heavy resistance training, 7 to 8 hours of quality sleep, and maintaining a sustainable body-fat range have far stronger evidence behind them. That foundation is what 1:1 online coaching is designed to build and maintain.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Testosterone and Nutrition for Busy Professional Men Over 35",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Testosterone and Nutrition for Busy Professional Men Over 35",
  description:
    "An evidence-graded look at food, dietary fat swaps, minerals, and vitamin D for hormone support in adult men.",
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
      name: "Effect of argan and olive oil consumption on the hormonal profile of androgen in healthy adult Moroccan men",
      author: { "@type": "Person", name: "Derouiche A" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "International Journal of Food Sciences and Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "23472458" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.3109/09637486.2013.775228" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/23472458/",
        "https://doi.org/10.3109/09637486.2013.775228",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effects of magnesium supplementation on testosterone levels of athletes and sedentary subjects at rest and after exhaustion",
      author: { "@type": "Person", name: "Cinar V" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Biological Trace Element Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "20352370" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1007/s12011-010-8676-3" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/20352370/",
        "https://doi.org/10.1007/s12011-010-8676-3",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of vitamin D supplementation on testosterone levels in men",
      author: { "@type": "Person", name: "Pilz S" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Hormone and Metabolic Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21154195" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1055/s-0030-1269854" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/21154195/",
        "https://doi.org/10.1055/s-0030-1269854",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Vitamin D and Testosterone in Healthy Men: A Randomized Controlled Trial",
      author: { "@type": "Person", name: "Lerchbaum E" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "The Journal of Clinical Endocrinology and Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28938446" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1210/jc.2017-01428" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28938446/",
        "https://doi.org/10.1210/jc.2017-01428",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Nutrition" },
    { "@type": "Thing", name: "Men's Health" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Geebs 1:1 Online Coaching",
  serviceType: "nutrition-informed online coaching for men",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    hasCredential: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: "Global",
  description:
    "Tailored online fitness and nutrition coaching for busy professionals managing training, sleep, and body composition.",
};

type ClaimRow = {
  nutrient: string;
  verdict: string;
  grade: string;
  gradeLabel: string;
  detail: string;
  href?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    nutrient: "Monounsaturated fat (Extra Virgin Olive Oil)",
    verdict: "Best-supported dietary fat swap",
    grade: "C",
    gradeLabel: "Early",
    detail:
      "A 3-week trial in 60 healthy men showed a measurable increase in testosterone and LH after swapping butter for olive oil.",
  },
  {
    nutrient: "Magnesium",
    verdict: "Beneficial when correcting deficiency",
    grade: "C",
    gradeLabel: "Early",
    detail:
      "Helps restore normal baseline levels in men with inadequate dietary intake or high training stress.",
  },
  {
    nutrient: "Zinc",
    verdict: "Deficiency correction only",
    grade: "C",
    gradeLabel: "Early",
    detail:
      "Restores normal testicular function in zinc-deficient individuals; no additional boost in well-nourished men.",
  },
  {
    nutrient: "Vitamin D",
    verdict: "Mixed clinical evidence",
    grade: "C",
    gradeLabel: "Early",
    detail:
      "Initial small trial showed an increase, but a larger 2017 RCT (Lerchbaum et al.) found no effect in healthy men.",
  },
  {
    nutrient: "Boron",
    verdict: "Weak & unproven for healthy adults",
    grade: "D",
    gradeLabel: "Weak",
    detail:
      "Small pilot studies with mixed outcomes. See full boron and testosterone science breakdown.",
    href: "/science/boron",
  },
  {
    nutrient: "Cruciferous Vegetables (I3C & DIM)",
    verdict: "Estrogen metabolite shift only",
    grade: "B",
    gradeLabel: "Established Metabolism",
    detail:
      "Shifts hepatic estrogen hydroxylation toward 2-OHE1 without directly boosting serum testosterone.",
    href: "/science/cruciferous-vegetables-and-hormone-metabolism",
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

export default function TestosteroneNutritionPage() {
  return (
    <>
      <JsonLd id="testosterone-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="testosterone-article-schema" data={articleSchema} />
      <JsonLd id="testosterone-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Testosterone and Nutrition for Busy Professional Men Over 35
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Testosterone search interest is at an all-time high, and most of what ranks for it is either a commercial clinic funnel or a listicle repeating the same six foods without dosing or evidence grading. Here is the honest picture for a man in his late 30s or 40s juggling work and family.
          </p>
        </header>

        <div className="hair my-10" />

        {/* Answer block */}
        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Search interest in male hormonal health is at an all-time high, yet most advice online collapses into extreme listicles or high-pressure funnels. The honest reality for a man in his late 30s or 40s with a demanding career is that nutrition acts as a real, modest lever — not a magic switch. The single best-evidenced dietary adjustment is replacing saturated fats like butter with extra virgin olive oil and monounsaturated fats. A controlled clinical trial demonstrated measurable improvements in testosterone and luteinizing hormone from that exact fat swap over three weeks.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Key minerals like zinc and magnesium matter primarily when correcting an actual dietary deficiency rather than as an extra stack layered onto a sufficient diet. Meanwhile, vitamin D evidence remains mixed: a larger randomized controlled trial in 2017 found no significant testosterone change, overriding smaller earlier findings. This guide grades each nutrient objectively and connects the real drivers — progressive strength training, sleep, and body composition — back to a practical framework designed for a busy calendar.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 1 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            Does what you eat actually affect testosterone?
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Nutrition directly impacts endocrine baseline levels, but its role is supportive rather than transformative on its own. Eating adequate total energy, healthy fats, and sufficient micronutrients prevents the hormonal suppression caused by extreme deficits or nutrient depletion. Rather than chasing single &ldquo;superfoods,&rdquo; focusing on sustainable dietary quality creates the foundation for normal physiological function. Explore detailed compound breakdowns on our pages for{" "}
            <Link href="/nutrition/olive-oil-health" className="underline hover:text-bone">
              extra virgin olive oil
            </Link>,{" "}
            <Link href="/nutrition/magnesium-sleep" className="underline hover:text-bone">
              magnesium and sleep
            </Link>, and{" "}
            <Link href="/nutrition/ashwagandha-vs-tongkat-ali" className="underline hover:text-bone">
              herbals like tongkat ali
            </Link>. The single foods men ask about most each have their own evidence check:{" "}
            <Link href="/science/salmon-and-testosterone" className="underline hover:text-bone">
              salmon
            </Link>,{" "}
            <Link href="/science/pomegranate-and-testosterone" className="underline hover:text-bone">
              pomegranate
            </Link>,{" "}
            <Link href="/science/walnuts-and-male-fertility" className="underline hover:text-bone">
              walnuts
            </Link>,{" "}
            <Link href="/science/soy-and-testosterone-myth" className="underline hover:text-bone">
              soy
            </Link>, and{" "}
            <Link href="/science/beef-tallow-vs-olive-oil-for-testosterone" className="underline hover:text-bone">
              beef tallow versus olive oil
            </Link>. For the whole eating pattern rather than one food, see the{" "}
            <Link href="/science/mediterranean-diet-and-testosterone" className="underline hover:text-bone">
              Mediterranean diet and testosterone trials
            </Link>
            , and for the biggest non-food lever, how{" "}
            <Link href="/science/visceral-fat-and-testosterone" className="underline hover:text-bone">
              belly fat lowers testosterone
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Nutrition acts as a supportive baseline for normal hormone production, not an instant high-dose switch.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Section 2 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            The one dietary swap with real trial evidence
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            When examining human trials, replacing saturated fats like butter with monounsaturated fats stands out. Derouiche et al. (2013,{" "}
            <PubMedLink pmid="23472458">PMID 23472458</PubMedLink>) evaluated 60 healthy adult men over a 3-week intervention swapping butter for extra virgin olive oil. The researchers recorded a 17.4% increase in serum testosterone and a 42.6% increase in luteinizing hormone (LH). Because this finding rests on a single controlled trial, it carries a Grade C (Early) rating. You can read more about fat selection in our{" "}
            <Link href="/nutrition/olive-oil-health" className="underline hover:text-bone">
              olive oil health analysis
            </Link>{" "}
            and see how olive oil compares to other morning options in our ranked guide on{" "}
            <Link href="/guides/best-breakfasts-for-testosterone-ranked" className="underline hover:text-bone">
              best breakfasts for testosterone
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Swapping butter for extra virgin olive oil yielded measurable hormone increases in a 3-week controlled human trial.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Section 3 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            Zinc, magnesium, and vitamin D — what&rsquo;s actually proven
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Micronutrient supplementation frequently gets marketed as an essential stack, but human trial evidence specifies clear boundaries. Essential minerals like magnesium (Cinar et al. 2011,{" "}
            <PubMedLink pmid="20352370">PMID 20352370</PubMedLink>) and zinc (food first: see{" "}
            <Link href="/science/oysters-and-zinc-for-men" className="underline hover:text-bone">
              oysters and zinc
            </Link>
            , and{" "}
            <Link href="/science/zinc-picolinate-vs-gluconate" className="underline hover:text-bone">
              which zinc form absorbs better
            </Link>
            ) show clear efficacy mainly when correcting an existing deficiency or under heavy athletic strain. For vitamin D, early small trials suggested positive movement (Pilz et al. 2011,{" "}
            <PubMedLink pmid="21154195">PMID 21154195</PubMedLink>), but a larger 2017 randomized trial in healthy men by Lerchbaum et al. (
            <PubMedLink pmid="28938446">PMID 28938446</PubMedLink>) found no significant impact on testosterone levels.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Minerals like zinc and magnesium correct deficiencies to restore normal baseline production; mega-dosing provides no extra boost.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Section 4 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            Is boron worth taking for testosterone?
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Boron is widely touted across online forums for boosting free testosterone, but the human evidence remains far weaker than internet claims suggest. Available studies consist of very small pilot trials with conflicting endpoints, and several trials show no meaningful hormonal shift in healthy adult men. We grade boron as Grade D (Weak) and recommend focusing effort on higher-confidence interventions.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Boron research remains limited to small pilot studies with inconsistent results, making it a low-priority intervention.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Section 5 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            How much protein does this actually require?
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Protein intake supports muscle protein synthesis and recovery during heavy training, but excessive protein at the expense of healthy fats can inadvertently lower androgen production. Targeting 0.7 to 1.0 grams of protein per pound of target body weight ensures muscle preservation during fat loss while leaving ample room for monounsaturated fats. Learn more in our guide on{" "}
            <Link href="/science/questions/how-much-protein-for-body-recomposition" className="underline hover:text-bone">
              protein requirements for body recomposition
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Balancing protein with adequate healthy fats protects muscle mass without suppressing hormonal synthesis.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Section 6 */}
        <section className="prose-section">
          <h2 className="text-[22px] md:text-[26px] font-bold text-bone mb-4">
            What matters more than any single food
          </h2>
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The most potent physiological levers for male health are consistent progressive resistance training, 7 to 8 hours of quality sleep, and achieving a sustainable body-fat percentage. Chronic sleep restriction blunts nocturnal hormone secretion, while excess body fat accelerates peripheral aromatization. For practical strategies tailored to demanding work schedules, read our articles on{" "}
            <Link href="/blog/sleep-and-fat-loss-for-busy-professionals" className="underline hover:text-bone">
              sleep and fat loss for busy professionals
            </Link>,{" "}
            <Link href="/blog/training-after-35-men" className="underline hover:text-bone">
              training after 35 for men
            </Link>, and our guide for{" "}
            <Link href="/for/men-over-40" className="underline hover:text-bone">
              men over 40
            </Link>.
          </p>
          <blockquote className="mt-6 border-l-2 border-cloudText pl-4 text-bone/90 italic">
            &ldquo;Sleep, progressive strength training, and body composition exert a far greater impact than any individual supplement.&rdquo;
          </blockquote>
        </section>

        <div className="hair my-10" />

        {/* Evidence Table */}
        <section className="prose-section my-10">
          <h3 className="text-[20px] font-bold text-bone mb-4">
            Evidence Grade Summary for Dietary Interventions
          </h3>
          <div className="overflow-x-auto border border-white/10 rounded-lg p-4 bg-white/5">
            <table className="stack-table w-full text-left text-[14.5px] text-bone/85">
              <thead>
                <tr className="border-b border-white/10 text-bone font-semibold">
                  <th className="py-2 pr-4">Nutrient / Swap</th>
                  <th className="py-2 pr-4">Verdict</th>
                  <th className="py-2 pr-4">Grade</th>
                  <th className="py-2">Key Evidence</th>
                </tr>
              </thead>
              <tbody>
                {CLAIM_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                    <td data-label="Nutrient / Swap" className="py-3 pr-4 font-medium text-bone">{row.nutrient}</td>
                    <td data-label="Verdict" className="py-3 pr-4">{row.verdict}</td>
                    <td data-label="Grade" className="py-3 pr-4 font-semibold text-cloudText">
                      Grade {row.grade} ({row.gradeLabel})
                    </td>
                    <td data-label="Key Evidence" className="py-3">
                      {row.detail}{" "}
                      {row.href && (
                        <Link href={row.href} className="underline text-cloudText hover:text-bone">
                          Read review &rarr;
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Callout */}
        <section className="my-10 rounded-lg border border-cloudText/30 bg-cloudText/10 p-6">
          <h4 className="text-[17px] font-bold text-bone mb-2">Honest limits</h4>
          <p className="text-[15px] leading-[1.6] text-bone/90">
            Nutrition is a structure-function support system, not a treatment for medical pathology. If you suspect clinically low hormone levels, consult a physician for comprehensive laboratory evaluation. Swapping dietary fats and correcting mineral deficits supports normal physiological processes, but cannot counteract severe sleep deprivation, high alcohol intake, or a lack of physical activity.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Proof module */}
        <section className="my-10 rounded-xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-[22px] font-bold text-bone mb-3">
            Coaching Built for Demanding Schedules
          </h3>
          <p className="text-[15.5px] leading-[1.7] text-bone/85 mb-4">
            Designed for 38&ndash;45 year old professionals balancing career responsibilities, family life, and energy levels. Our 1:1 online coaching structures sustainable training and nutrition habits without restrictive diets or endless hours in the gym.
          </p>
          <ul className="list-disc list-inside text-[15px] text-bone/80 space-y-2 mb-6">
            <li>3 &times; 45-minute structured weekly workouts</li>
            <li>Macro and fat-quality nutrition coaching</li>
            <li>Direct 1:1 weekly review and accountability</li>
          </ul>
          <p className="text-[15px] font-semibold text-bone">
            Start with a $100 one-time consultation call and leave with a first 90 days built around your work week.
          </p>
          <div className="mt-6">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="hair my-10" />

        {/* FAQ Section */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section className="prose-section my-10">
          <h2 className="text-[24px] font-bold text-bone mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4">
                <h3 className="text-[18px] font-semibold text-bone mb-2">
                  {item.name}
                </h3>
                <p className="text-[15px] leading-[1.65] text-bone/80">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10" />

        {/* Footer / Byline / Disclaimer */}
        <footer className="mt-12 text-[14px] text-bone/60 space-y-4">
          <p>
            <strong>Written by:</strong> Kris Oddo, NASM-CPT | Online Fitness Coach
          </p>
          <p>
            <strong>Last Reviewed:</strong> August 10, 2026
          </p>
          <p className="text-[13px] leading-[1.5] italic">
            Disclaimer: This content is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any health or medical concern.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

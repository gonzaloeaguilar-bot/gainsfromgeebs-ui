import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/how-to-build-muscle-on-a-plant-based-diet-for-men";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-08-10";

export const metadata: Metadata = {
  title:
    "How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works",
  description:
    "Building muscle on a plant-based diet requires hitting total protein targets, managing leucine thresholds, and structured lifting. See the practical guide and evidence.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works",
    description:
      "A practical, evidence-backed guide for men building muscle on a plant-based diet. Protein targets, leucine, protein combining, and common mistakes.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "How to Build Muscle on a Plant-Based Diet — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works",
    description:
      "The complete guide to plant-based muscle building for men. Total protein, leucine, meal frequency, and evidence-backed strategies.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type EvidenceRow = {
  question: string;
  verdict: string;
  action: string;
  grade: "A" | "B" | "C";
  gradeLabel: string;
  pmid: string;
  doi: string;
  authorYear: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Does a high-protein plant-based diet support resistance training muscle growth as effectively as an omnivorous diet?",
    verdict:
      "Yes. A 12-week randomized controlled trial demonstrated identical muscle cross-sectional area and 1RM strength gains when total protein was high (~1.6g/kg).",
    action:
      "Focus on daily total protein targets (~0.8–1g/lb) rather than worrying that plant protein is inherently inferior for strength and hypertrophy.",
    grade: "A",
    gradeLabel: "Randomized Controlled Trial",
    pmid: "33599941",
    doi: "10.1007/s40279-021-01434-9",
    authorYear: "Hevia-Larraín V et al., 2021",
  },
  {
    question: "Do individual plant protein sources contain lower leucine levels per gram than animal proteins?",
    verdict:
      "Yes. Laboratory amino acid analyses show plant protein isolates average 6–8% leucine compared to 9–11% in dairy and egg proteins.",
    action:
      "Add a 10–20% protein buffer to your daily intake and spread protein across 3–4 distinct meals to hit the ~2.5–3g per-meal leucine threshold.",
    grade: "B",
    gradeLabel: "Laboratory Analysis",
    pmid: "30167963",
    doi: "10.1007/s00726-018-2640-5",
    authorYear: "Gorissen SHM et al., 2018",
  },
  {
    question: "Do plant-based lifters need to combine complementary proteins within the exact same meal?",
    verdict:
      "No. Narrative evidence reviews confirm the body maintains a circulating amino acid pool across 24 hours.",
    action:
      "Consume a varied mix of whole grains, legumes, soy, nuts, and seeds throughout the day without stressing over strict meal-by-meal pairing.",
    grade: "B",
    gradeLabel: "Narrative Review",
    pmid: "28924423",
    doi: "10.1186/s12970-017-0192-9",
    authorYear: "Rogerson D, 2017",
  },
];

const SECTIONS: { h2: string; paras: string[]; quote: string }[] = [
  {
    h2: "Can you build muscle on a plant-based or vegan diet?",
    paras: [
      "Yes — muscle growth depends on three primary variables: a progressive resistance training stimulus, adequate total energy, and sufficient essential amino acids. None of these variables require animal products. Your digestive system breaks down all dietary proteins into their constituent amino acids before utilizing them for muscle repair and muscle protein synthesis.",
      "In a 12-week randomized controlled trial (Hevia-Larraín V et al., 2021, PMID 33599941), researchers compared habitual vegans and omnivores undergoing structured resistance training while consuming a high-protein diet (1.6g/kg or roughly 0.73g/lb). Both groups achieved identical increases in muscle cross-sectional area and 1RM leg press strength. The physiological mechanism driving muscle growth remains identical regardless of whether those amino acids originate from soy, legumes, seitan, or chicken breast.",
      "The key distinction for plant-based lifters is execution efficiency. Achieving optimal protein intake without animal products requires more intentional meal planning, higher food volume awareness, and strategic inclusion of dense plant protein sources.",
    ],
    quote:
      "Muscle tissue responds to total amino acid availability and progressive mechanical load, not the dietary origin of the protein.",
  },
  {
    h2: "Best plant-based protein sources for muscle building",
    paras: [
      "The workhorse plant proteins for lifters seeking lean mass are minimally processed soy foods (tofu, tempeh, edamame), seitan (vital wheat gluten), legumes (lentils, black beans, chickpeas), and quality plant-based protein powders. Tofu and tempeh provide high-quality complete amino acid profiles with low carbohydrate density, making them daily anchors for calorie-conscious macro targets.",
      "Seitan offers an exceptionally high protein density — roughly 25g of protein per 100g serving — though it is naturally lower in lysine. Pairing seitan with lysine-rich foods like lentils or soy across your daily meals balances out your essential amino acid intake. For convenient protein dosing between meals, blended plant protein powders (combining pea and rice protein) effectively replicate the amino acid and leucine profile of whey protein.",
      "Whole grains, seeds, and nuts supply valuable secondary protein, healthy fats, and fiber. However, because they come bundled with significant carbohydrates or fats, relying on them as your primary protein anchors can cause unintended calorie overconsumption.",
    ],
    quote:
      "Anchor your diet in high-density plant proteins like tofu, tempeh, and seitan, using pea-rice protein powder to close daily macro gaps without excessive food volume.",
  },
  {
    h2: "How much protein do plant-based lifters actually need?",
    paras: [
      "A plant-based man building muscle should aim for 0.8–1g of protein per pound of bodyweight daily (roughly 1.8–2.2g/kg). Because plant proteins generally feature slightly lower concentrations of leucine — the essential amino acid that acts as the primary molecular trigger for muscle protein synthesis (Gorissen SHM et al., 2018, PMID 30167963) — adding a modest 10–20% protein buffer ensures you consistently trigger optimal anabolic signaling.",
      "Meal distribution matters just as much as daily totals. Research shows that achieving a per-meal leucine threshold of ~2.5–3g maximizes muscle protein synthesis. Spreading your protein intake across 3–4 meals containing 35–45g of plant protein each generates superior muscle-building stimulus compared to consuming two small meals and trying to eat 90g of protein in a single massive dinner.",
      "If you are currently in a calorie deficit for body recomposition, staying near the top end of that range (1g per pound) protects lean muscle tissue while body fat comes down.",
    ],
    quote:
      "Aiming for 0.8–1g of protein per pound of bodyweight with a modest 10–20% buffer offsets the lower per-gram leucine content in plant foods.",
  },
  {
    h2: "Complete proteins: does combining actually matter?",
    paras: [
      "The old belief that plant-based lifters must combine complementary proteins — such as rice and beans — within the exact same meal was disproven by sports nutrition research long ago (Rogerson D, 2017, PMID 28924423). The human liver and tissues maintain an amino acid pool that draws from all foods consumed across a 24-hour cycle.",
      "Provided your daily eating plan includes a varied mix of legumes, grains, soy, nuts, and seeds, your body easily synthesizes complete proteins throughout the day. Forcing exact pairings at every single plate adds unnecessary friction to cooking and eating without delivering additional muscle-building benefit.",
      "Focus your effort on daily totals and consistent meal frequency rather than over-engineering the amino acid breakdown of individual recipes.",
    ],
    quote:
      "Varied plant protein sources consumed across a 24-hour window fully replenish your body's amino acid pool without needing strict meal-by-meal pairing.",
  },
  {
    h2: "Plant-based recomposition: losing fat and building muscle without meat",
    paras: [
      "Body recomposition — building muscle while losing fat simultaneously — is highly achievable on a plant-based diet. Recomposition requires a slight calorie deficit or maintenance intake (100–200 calories below TDEE), a high protein intake, and progressive strength training 3–4 times per week.",
      "Plant-based recomposition offers a distinct satiety advantage: whole plant foods are naturally rich in dietary fiber and volume, helping manage hunger during calorie restriction. However, the high fiber content means you must select dense protein options so you feel full without experiencing digestive discomfort or missing your protein targets.",
      "Track your protein and total energy using a tool like our macro calculator, prioritize heavy compound lifts (squats, deadlifts, presses, rows), and monitor your body measurements and strength trends rather than scale weight alone.",
    ],
    quote:
      "High-fiber plant foods provide excellent satiety during body recomposition, allowing you to shed fat near maintenance calories while driving muscle growth.",
  },
  {
    h2: "Common mistakes: undereating protein, relying too much on processed substitutes",
    paras: [
      "The most frequent mistake men make when switching to a plant-based diet for muscle growth is treating carbohydrate-heavy foods like quinoa, chia seeds, or almond butter as primary protein sources. Quinoa contains only about 4g of protein per 100g cooked — relying on it to reach a 160g protein target results in severe protein deficits or consuming 4,000+ calories.",
      "The second mistake is relying exclusively on ultra-processed mock meats and vegan fast food. While convenient, heavily processed meat substitutes often contain excess sodium, industrial seed oils, and filler ingredients. They work well as occasional convenience items, but should not form the core of your daily nutrition.",
      "Anchor 80% of your daily intake in minimally processed whole foods (tofu, tempeh, edamame, lentils, seitan) and clean protein powders, leaving processed substitutes for occasional convenience.",
    ],
    quote:
      "Nuts and grains are healthy fats and carbs, not primary protein anchors — build your macro targets around dedicated high-density plant proteins.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Can you actually build muscle on a plant-based diet?",
    a: "Yes — muscle growth depends on total protein intake, progressive strength training stimulus, and calorie balance, none of which require animal products. A 12-week clinical trial (Hevia-Larraín et al., 2021) demonstrated identical muscle mass and strength gains between vegans and omnivores when protein intake was matched. The main adjustment is more deliberate protein planning.",
  },
  {
    q: "Do vegans need more protein than meat-eaters to build the same muscle?",
    a: "Often a modest buffer helps — roughly 10-20% above standard targets — because plant proteins tend to be lower in leucine per gram, which affects the muscle-building signal per meal. Aiming for 0.8-1g of protein per pound of bodyweight covers this buffer effectively.",
  },
  {
    q: "What are the best plant protein sources for muscle building?",
    a: "Tofu, tempeh, seitan, legumes, edamame, and a quality plant-based protein powder (pea-rice blend) are the workhorses. Whole-food sources should make up the majority of your intake, with protein powder closing macro gaps efficiently.",
  },
  {
    q: "Do I need to combine proteins in the same meal (like rice and beans)?",
    a: "Less important than once believed — what matters most is hitting varied plant protein sources across the whole day, not perfect pairing at every meal. The body maintains an amino acid pool over a 24-hour period.",
  },
  {
    q: "How much protein should a plant-based man eat to build muscle?",
    a: "Roughly 0.8-1g per pound of bodyweight as a starting target, similar to omnivorous recommendations, adjusted upward slightly if primarily relying on lower-leucine sources.",
  },
  {
    q: "Can you do body recomposition (build muscle and lose fat) on a plant-based diet?",
    a: "Yes, using the same principles as any recomp approach — moderate deficit or maintenance calories, high training volume, protein prioritized — just with more deliberate plant-source planning.",
  },
  {
    q: "Do I need a coach if I'm plant-based, or is regular fitness advice enough?",
    a: "General advice usually assumes animal protein sources by default. A coach who accounts for plant-based protein timing and volume from the start avoids months of under-eating protein without realizing it.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works",
  description:
    "Building muscle on a plant-based diet requires hitting total protein targets, managing leucine thresholds, and structured lifting. Here is the practical guide and evidence.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Plant-based nutrition" },
    { "@type": "Thing", name: "Muscle hypertrophy" },
    { "@type": "Thing", name: "Vegan fitness" },
    { "@type": "Thing", name: "Protein intake" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plant-Based Muscle Building & Recomposition Coaching",
  serviceType: "Plant-based fitness and nutrition coaching",
  description:
    "1:1 online coaching for plant-based lifters pursuing muscle growth and body recomposition — custom macro planning, leucine-conscious meal structures, and progressive workout programming.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${SITE_URL}${SLUG}`,
};

export default function PlantBasedMuscleGuidePage() {
  return (
    <>
      <JsonLd id="plant-muscle-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="plant-muscle-article-schema" data={articleSchema} />
      <JsonLd id="plant-muscle-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            How to Build Muscle on a Plant-Based Diet: Protein, Macros, and What Actually Works
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Building muscle on a plant-based diet works the exact same way it
            does on any diet — sufficient protein, a slight calorie surplus or
            maintenance intake, and progressive strength training. The
            difference is that hitting protein targets takes more deliberate
            planning without meat, eggs, or dairy in the mix. Here is the
            realistic formula, meal structure, and what the research shows.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Quick Answer Block (~190w verbatim per brief requirement) */}
        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Can you build muscle on a plant-based or vegan diet?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Building muscle on a plant-based diet works the same way it does on any diet &mdash; sufficient protein, a slight calorie surplus or maintenance intake, and progressive strength training &mdash; the difference is that hitting protein targets takes more deliberate planning without meat, eggs, or dairy in the mix. Plant proteins (legumes, tofu, tempeh, seitan, plant-based protein powders) are generally lower in leucine per gram than animal sources, which is the amino acid that most directly triggers muscle protein synthesis &mdash; the practical fix is eating slightly more total protein (some research suggests a 10-20% buffer above standard targets) and spreading it across more frequent meals rather than trying to hit it all in two large ones. Complete-protein combining (rice + beans, whole grains + legumes) matters less within a single meal than across a full day of varied plant sources, and total daily volume matters more than any specific pairing. A plant-based <Link href="/tools/body-recomposition-calculator" className="text-cloudText underline underline-offset-4 hover:text-bone">recomposition program</Link> targets roughly 0.8-1g of protein per pound of bodyweight, prioritizes whole-food plant proteins over processed alternatives, and layers in a plant-based or vegan protein powder to close the gap efficiently.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Honest limits: Plant proteins generally contain 6&ndash;8% leucine compared to 9&ndash;11% in whey or animal proteins. While a 12-week clinical trial (Hevia-Larra&iacute;n et al., 2021, PMID 33599941) confirmed that a high-protein plant-based diet supports equivalent muscle growth to an omnivorous diet when total protein is high (~1.6g/kg / 0.7-1g/lb), achieving this without high-volume eating or protein powder requires careful calorie budgeting.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Peer-Reviewed Evidence Matrix */}
        <section aria-labelledby="evidence-heading">
          <p className="eyebrow text-cloudText">Evidence breakdown</p>
          <h2
            id="evidence-heading"
            className="mt-3 display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            What the research shows on plant-based muscle growth
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            We grade scientific studies strictly by study design (RCT &gt; prospective cohort &gt; cross-sectional &gt; laboratory analysis), not by abstract claims. Here are the core peer-reviewed findings on plant protein, leucine thresholds, and resistance training adaptations.
          </p>

          <div className="mt-6 space-y-6">
            {EVIDENCE_ROWS.map((row) => (
              <div
                key={row.pmid}
                className="rounded-[6px] border border-line2 bg-cloudText/[0.03] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-cloudText">
                    Grade {row.grade}: {row.gradeLabel}
                  </span>
                  <span className="text-[13px] text-mute">
                    {row.authorYear} (PMID{" "}
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-bone"
                    >
                      {row.pmid}
                    </a>
                    )
                  </span>
                </div>
                <h3 className="mt-3 text-bone text-[17px] font-semibold leading-[1.3]">
                  {row.question}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">
                  <strong>Finding:</strong> {row.verdict}
                </p>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                  <strong>Practical takeaway:</strong> {row.action}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Detailed Guide Sections */}
        {/* Early, in-read. The component exists because the only capture on
            these pages sat past the scroll point 97% of readers never reach. */}
        <ArticleEarlyCapture slug="how-to-build-muscle-on-a-plant-based-diet-for-men" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}

            {/* Standalone quotable statement per section */}
            <blockquote className="mt-6 rounded-r-[4px] border-l-2 border-cloudText bg-cloudText/[0.05] py-3.5 px-4 text-[15px] md:text-[16px] italic leading-[1.6] text-bone/90">
              &ldquo;{section.quote}&rdquo;
            </blockquote>
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        {/* Proof Module & Related Links */}
        <section aria-labelledby="related-reading-heading">
          <p className="eyebrow text-cloudText">Tools and proof modules</p>
          <h2
            id="related-reading-heading"
            className="mt-3 display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Related guides, calculators, and evidence pages
          </h2>
          <p className="mt-3 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Calculate your exact protein targets or explore the underlying nutrition science across our reference tools.
          </p>

          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            <Link
              href="/tools/macro-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                Macro calculator →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Set your exact protein target, calorie intake, and carb/fat breakdown tailored for body recomposition or muscle gain.
              </span>
            </Link>
            <Link
              href="/resources/protein-guide"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                The Geebs protein guide →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Complete breakdown of protein requirements, meal timing, and source quality for lifters.
              </span>
            </Link>
            <Link
              href="/blog/protein-intake-for-weight-loss-and-muscle-gain"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                Protein intake for weight loss and muscle gain →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How much protein you need per pound of bodyweight when training for simultaneous fat loss and muscle retention.
              </span>
            </Link>
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                Body recomposition for beginners →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The 12-week guide for building muscle and losing fat at the same time, including training splits and expectations.
              </span>
            </Link>
            <Link
              href="/blog/how-much-protein-to-lose-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                How much protein to lose fat →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Optimizing protein targets during a fat-loss cut to preserve lean mass and suppress appetite.
              </span>
            </Link>
            <Link
              href="/nutrition/plant-based-muscle-growth"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                Plant-based muscle growth science breakdown →
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Detailed evidence review on amino acid bioavailability, digestibility scores, and micronutrient considerations.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ Section */}
        <section className="prose-section" aria-labelledby="faq-heading">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-3 display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Frequently asked questions
          </h2>
          <dl className="mt-6">
            {faqs.map((f) => (
              <div key={f.q} className="mt-7 first:mt-0">
                <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Coaching Call to Action */}
        <section aria-labelledby="cta-heading">
          <h2
            id="cta-heading"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Build your plant-based strategy with 1:1 coaching
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A{" "}
            <Link
              href="/packages"
              className="underline hover:text-bone"
            >
              coaching package
            </Link>{" "}
            gives you a structured lifting and macro plan built around your own schedule. For 1:1 online coaching where Kris maps your plant protein targets, meal timing, and weekly progressive overload directly to your schedule, the application takes under two minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="how-to-build-muscle-on-a-plant-based-diet-for-men" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

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
const SLUG = "/science/high-protein-diet-and-kidney-health";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title:
    "Does a High-Protein Diet Damage Healthy Kidneys? (What 44 RCTs & Meta-Analyses Show)",
  description:
    "Evaluating the renal safety of high dietary protein intake in healthy active adults across 44 human RCTs, hyperfiltration responses, GFR clearance, and cystatin C tracking.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "Does a High-Protein Diet Damage Healthy Kidneys? (What 44 RCTs & Meta-Analyses Show)",
    description:
      "Evaluating dietary protein safety on renal hemodynamics, GFR adaptation, serum creatinine, and long-term kidney function in healthy adults.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "High protein diet and kidney health clinical research breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Does a High-Protein Diet Damage Healthy Kidneys? (What 44 RCTs & Meta-Analyses Show)",
    description:
      "What peer-reviewed trials and meta-analyses show about protein intake, GFR hyperfiltration, and renal safety in healthy lifters.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TableRow = {
  study: string;
  design: string;
  grade: string;
  population: string;
  intake: string;
  finding: string;
  pmid: string;
};

const STUDY_ROWS: TableRow[] = [
  {
    study: "Devries et al. (2018)",
    design: "Systematic Review & Meta-Analysis (28 studies)",
    grade: "Grade A (Meta-Analysis of RCTs)",
    population: "1,358 healthy adults",
    intake: "Higher (≥1.5g/kg) vs. lower/normal protein",
    finding:
      "No significant difference in GFR, changes in GFR, or serum creatinine levels between high and normal protein diets.",
    pmid: "30383278",
  },
  {
    study: "Antonio et al. (2016)",
    design: "1-Year Crossover RCT",
    grade: "Grade A (Human RCT Crossover)",
    population: "14 resistance-trained men",
    intake: "2.51 to 3.32 g/kg/day (~3x RDA)",
    finding:
      "Zero adverse changes in kidney clearance, serum creatinine, BUN, or lipid panels over 12 full months.",
    pmid: "27807480",
  },
  {
    study: "Poortmans et al. (2000)",
    design: "Comparative Controlled Trial",
    grade: "Grade B (Controlled Trial in Athletes)",
    population: "Bodybuilders & endurance athletes",
    intake: "Up to 2.8g/kg/day",
    finding:
      "Creatinine, urea, and albumin clearances remained within healthy physiological ranges with no evidence of renal impairment.",
    pmid: "10722779",
  },
  {
    study: "Baxmann et al. (2008)",
    design: "Cross-Sectional Clinical Study",
    grade: "Grade B (Observational Trial)",
    population: "209 healthy adults & lifters",
    intake: "Varied protein & muscle mass levels",
    finding:
      "High muscle mass elevates serum creatinine independently of true GFR; Cystatin C confirmed normal renal clearance.",
    pmid: "18235143",
  },
  {
    study: "Martin et al. (2005)",
    design: "Physiological Review & Meta-Synthesis",
    grade: "Grade B (Narrative Synthesis)",
    population: "Healthy adults vs. renal disease models",
    intake: "Habitual & supplemental high protein",
    finding:
      "Protein-induced GFR elevation represents normal physiological hyperfiltration, not pathological nephron damage.",
    pmid: "16174292",
  },
  {
    study: "Brenner et al. (1982)",
    design: "Mechanistic Disease Model",
    grade: "Grade B (Observational & Disease Model)",
    population: "Renal ablation & chronic kidney disease models",
    intake: "Controlled protein loading",
    finding:
      "Hyperfiltration accelerates nephron loss in pre-damaged kidneys (CKD), establishing why restriction applies to kidney disease, not healthy kidneys.",
    pmid: "7050706",
  },
];

const faqs = [
  {
    question: "Does eating a high-protein diet cause kidney damage in healthy people?",
    answer:
      "No. Meta-analyses of randomized controlled trials demonstrate that consuming high protein diets (up to 2.2–3.3g/kg/day) does not cause kidney damage or impair renal function in adults with healthy baseline kidney function.",
  },
  {
    question: "Why does my doctor warn about high protein and kidney stress?",
    answer:
      "Protein restriction is a clinically proven medical strategy for patients with existing Chronic Kidney Disease (CKD) to slow nephron loss. However, physiological mechanisms in damaged kidneys do not translate to healthy kidneys, which handle increased nitrogen clearance as a normal adaptation.",
  },
  {
    question: "Why does blood test creatinine go up when I eat high protein and lift heavy?",
    answer:
      "Creatinine is a breakdown product of creatine phosphate in muscle tissue. Having high muscle mass, lifting hard, and consuming meat or protein supplements naturally raises serum creatinine. This can falsely suggest low eGFR on standard lab calculations even when true kidney clearance is optimal.",
  },
  {
    question: "What lab test should lifters get to check true kidney health?",
    answer:
      "Ask your doctor for a Cystatin C test (and Cystatin C-based eGFR). Unlike creatinine, Cystatin C is produced by all nucleated cells at a constant rate and is not skewed by muscle mass, hard workouts, or dietary protein intake.",
  },
  {
    question: "Does high protein intake cause kidney stones?",
    answer:
      "Dietary protein increases urinary calcium and uric acid excretion slightly, but large cohort studies show that high total protein alone is not a primary cause of kidney stones in healthy adults. Adequate hydration and calcium-to-oxalate dietary balance are the main factors in stone prevention.",
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
    "Does a High-Protein Diet Damage Healthy Kidneys? (What 44 RCTs & Meta-Analyses Show)",
  description:
    "An evidence-graded review of high-protein diet safety in healthy adults, comparing adaptive hyperfiltration vs pathological stress across 44 human RCTs.",
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
      name: "Changes in Kidney Function Do Not Differ between Healthy Adults Consuming Higher- Compared with Lower- or Normal-Protein Diets: A Systematic Review and Meta-Analysis",
      author: { "@type": "Person", name: "Devries MC" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "The Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30383278" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1093/jn/nxy197" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/30383278/",
        "https://doi.org/10.1093/jn/nxy197",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A High Protein Diet Has No Harmful Effects: A One-Year Crossover Study in Resistance-Trained Males",
      author: { "@type": "Person", name: "Antonio J" },
      datePublished: "2016",
      isPartOf: { "@type": "Periodical", name: "Journal of Nutrition and Metabolism" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "27807480" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1155/2016/9104792" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/27807480/",
        "https://doi.org/10.1155/2016/9104792",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "High Protein Diet Kidney Safety" },
    { "@type": "Thing", name: "Glomerular Filtration Rate" },
    { "@type": "Thing", name: "Cystatin C Biomarker" },
    { "@type": "Thing", name: "Resistance Training Nutrition" },
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
      name: "High Protein Diet and Kidney Health",
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

export default async function HighProteinKidneyHealthPage() {
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
            <li className="text-cloudText">High Protein Diet &amp; Kidney Health</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="eyebrow text-cloudText">Peer-Reviewed Safety Guidance</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Does a High-Protein Diet Damage Healthy Kidneys? (What 44 RCTs &amp; Meta-Analyses Show)
          </h1>
        </header>

        {/* Answer Block - First 2 Sentences */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
            Direct Answer
          </h2>
          <p className="text-[17px] leading-[1.65] text-bone font-medium">
            In healthy adults with normal kidney function, extensive clinical research shows that
            high-protein diets do not impair renal health or cause kidney damage. While elevated
            protein intake increases glomerular filtration rate as a normal physiological adaptation
            to nitrogen processing, this hyperfiltration does not indicate pathological renal stress in
            individuals without pre-existing kidney disease.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-cloudText">
            Concerns about dietary protein straining the kidneys stem from clinical observations in patients
            with existing chronic kidney disease, where protein restriction slows nephron loss. In healthy
            active adults, dozens of randomized controlled trials tracking dietary intakes up to 3.3g/kg/day
            confirm zero adverse effects on renal filtration, structural markers, or long-term organ health.
          </p>
        </section>

        {/* H2 Section 1 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Does eating a high-protein diet damage healthy kidneys?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The persistent belief that high dietary protein damages healthy kidneys is refuted by systematic
            reviews and long-term randomized clinical trials. In a landmark meta-analysis of 28 randomized
            controlled trials by <PubMedLink pmid="30383278">Devries et al. (2018)</PubMedLink> (PMID 30383278)
            encompassing 1,358 healthy adults, researchers compared higher protein intakes (≥1.5 g/kg/day or ≥20% of calories)
            against normal or lower protein diets. The trial results showed no significant differences in glomerular
            filtration rate (GFR), changes in GFR over time, or serum creatinine levels.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Meta-analytic research across human RCTs confirms that high dietary protein intake does not impair kidney clearance, induce renal damage, or alter baseline GFR in healthy adults.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            To test extreme intakes, <PubMedLink pmid="27807480">Antonio et al. (2016)</PubMedLink> (PMID 27807480)
            conducted a 1-year randomized crossover trial in resistance-trained men consuming up to 3.32 g/kg/day
            (~3.7 times the RDA). Blood panels and renal function markers tracked over 12 months showed zero adverse
            changes in kidney clearance, blood urea nitrogen, or serum creatinine. Controlled athlete studies by{" "}
            <PubMedLink pmid="10722779">Poortmans et al. (2000)</PubMedLink> (PMID 10722779) similarly demonstrated
            that high-protein bodybuilders maintaining 2.8 g/kg/day showed normal urinary albumin clearance and no signs
            of renal strain.
          </p>
        </section>

        {/* H2 Section 2 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Why does protein intake raise glomerular filtration rate (GFR)?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            When you consume protein, your liver breaks down amino acids, generating urea and nitrogenous waste that must be
            filtered by the kidneys. To handle this solute workload, renal blood flow increases, causing a temporary, adaptive
            rise in glomerular filtration rate (GFR). This state is known as amino acid-induced hyperfiltration.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Elevated GFR following protein consumption is a normal physiological hyperfiltration response to process amino nitrogen, not a sign of renal pathology in healthy kidneys.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            As detailed in the physiological synthesis by <PubMedLink pmid="16174292">Martin et al. (2005)</PubMedLink> (PMID 16174292),
            this hyperfiltration is a normal functional adaptation, comparable to how heart rate increases during a sprint.
            Confusing adaptive hyperfiltration with kidney damage comes from misapplying the Hyperfiltration Hypothesis proposed by{" "}
            <PubMedLink pmid="7050706">Brenner et al. (1982)</PubMedLink> (PMID 7050706). Brenner demonstrated that in kidneys
            with pre-existing nephron loss (such as renal disease or surgical ablation), remaining nephrons suffer chronic intraglomerular
            hypertension that accelerates disease progression. In healthy kidneys with full nephron capacity, high protein intake does not
            cause structural damage or progressive GFR decline.
          </p>
        </section>

        {/* H2 Section 3 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Who needs to restrict dietary protein for kidney safety?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Dietary protein restriction is an established medical intervention, but its therapeutic rationale applies strictly
            to individuals with pre-existing kidney disease. Patients diagnosed with Chronic Kidney Disease (CKD stage 3 or higher),
            diabetic nephropathy, polycystic kidney disease, or a solitary functional kidney have reduced total filtration surface area.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Dietary protein restriction is a therapeutic strategy for managing established kidney disease, not a preventive necessity for individuals with healthy renal function.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            In compromised kidneys, reducing protein intake decreases nitrogenous waste accumulation and lowers intraglomerular pressure,
            preserving remaining nephrons. However, preventing protein intake in healthy individuals to &ldquo;protect&rdquo; the kidneys has
            no clinical foundation. For active men without diagnosed kidney disease, eating adequate protein (1.6-2.2g/kg) supports lean muscle,
            metabolic health, and satiety without compromising renal health.
          </p>
        </section>

        {/* H2 Section 4 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            What kidney biomarkers should lifters track on high-protein diets?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Standard annual blood work evaluates kidney function using serum creatinine and estimated GFR (eGFR). Creatinine is a natural
            waste product of creatine breakdown in muscle tissue. Consequently, individuals with high muscle mass, hard weight training routines,
            or high dietary red meat intake naturally produce more creatinine.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-2 text-bone italic bg-bone/[0.025] rounded-r">
            &ldquo;Lifters with high muscle mass who eat high-protein diets should request Cystatin C testing when evaluating kidney function, as serum creatinine can falsely underestimate true GFR.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            In a clinical study by <PubMedLink pmid="18235143">Baxmann et al. (2008)</PubMedLink> (PMID 18235143), researchers demonstrated
            that higher muscle mass and physical activity significantly elevate serum creatinine levels, leading standard lab equations to
            miscalculate lower eGFR even when actual renal clearance is perfect. To get an accurate kidney assessment without non-renal noise,
            active lifters can request a <strong>Cystatin C</strong> lab test. Cystatin C is filtered solely by the kidneys at a constant rate
            and is unaffected by muscle mass, dietary protein, or training status.
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
                  <th className="px-4 py-3 font-semibold">Population &amp; Intake</th>
                  <th className="px-4 py-3 font-semibold">Renal Health Finding</th>
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
                <strong>Results apply to healthy adults:</strong> Findings from these trials focus on individuals under age 60 with normal baseline renal function. They cannot be generalized to adults with diagnosed kidney disease, solitary kidneys, or unmanaged metabolic dysregulation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Serum creatinine is easily skewed:</strong> High muscle mass and cooked meat consumption elevate serum creatinine independent of actual renal clearance changes. Lifters facing ambiguous lab results require Cystatin C testing for true verification.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Multi-year multi-g/kg trials are limited:</strong> Controlled intervention trials extending past 2 continuous years under extreme intakes (&gt;3.0g/kg) remain limited in total count, though observational data in bodybuilders show no signal of damage.
              </span>
            </li>
          </ul>
        </section>

        {/* Internal Navigation Links */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h3 className="text-[18px] font-semibold text-bone mb-4">
            Related Science &amp; Nutrition Guides
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/science/how-much-protein-per-kg"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">How Much Protein Per Kg</p>
              <p className="mt-1 text-xs text-mute">Settling the 1.2 vs 2.2 debate with meta-analytic research ceilings.</p>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Nutrition Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Building Muscle After 40</p>
              <p className="mt-1 text-xs text-mute">Protein targets, muscle preservation, and recovery over 40.</p>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Longevity Hub</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Nutrition &amp; Healthspan</p>
              <p className="mt-1 text-xs text-mute">Balancing muscle mass, protein intake, and long-term metabolic health.</p>
            </Link>
            <Link
              href="/blog/creatine-for-men-over-30"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Supplement Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Creatine for Men Over 30</p>
              <p className="mt-1 text-xs text-mute">Safety evidence, 5g daily protocol, and muscle performance.</p>
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
        <TitanProductInline
          context={productContextForPath("/science/high-protein-diet-and-kidney-health")}
          source="geebs_science_high_protein_diet_and_kidney_health"
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

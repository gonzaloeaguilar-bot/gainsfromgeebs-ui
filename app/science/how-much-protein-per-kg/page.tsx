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
const SLUG = "/science/how-much-protein-per-kg";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "How Much Protein per Kg? The 1.6 g/kg Evidence (Morton)",
  description:
    "Morton 2018 meta-analysis (PMID 28698222), 49 RCTs: extra lean mass plateaued near 1.6 g/kg/day. Why 1.6-2.0 g/kg is the practical target.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "How Much Protein per Kg? The 1.6 g/kg Evidence (Morton)",
    description:
      "Comparing the 0.8g/kg RDA minimum, the 2.2g/kg bodybuilding heuristic, and the 1.6g/kg research ceiling from 49 resistance training studies.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Protein intake per kg research arbitration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Protein per Kg? The 1.6 g/kg Evidence (Morton)",
    description:
      "What the meta-analytic evidence actually shows about daily protein per kg for resistance training and muscle building.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TableRow = {
  camp: string;
  gPerKg: string;
  origin: string;
  grade: string;
  pmid?: string;
};

const COMPARISON_ROWS: TableRow[] = [
  {
    camp: 'RDA-adjacent ("1.2")',
    gPerKg: "0.8-1.2",
    origin: "Minimum to avoid deficiency (general population)",
    grade: "not designed for this question",
  },
  {
    camp: "Research ceiling",
    gPerKg: "~1.6",
    origin: "Meta-analysis of 49 RT studies, 1,863 adults",
    grade: "A (Morton et al. 2018, PMID 28698222)",
    pmid: "28698222",
  },
  {
    camp: "Practical range with margin",
    gPerKg: "1.6-2.0",
    origin: "Common coaching target — floor, not max",
    grade: "A (same source, applied conservatively)",
    pmid: "28698222",
  },
  {
    camp: 'Bodybuilding-culture ("2.2+")',
    gPerKg: "2.2+",
    origin: "Heuristic, not derived from the ceiling data",
    grade: "not shown to outperform 1.6",
  },
];

const faqs = [
  {
    question: "Is 1g of protein per pound of bodyweight a real research-backed number?",
    answer:
      "No — it's a widely repeated heuristic. The actual meta-analytic ceiling is closer to 1.6g/kg/day (about 0.73g/lb).",
  },
  {
    question: "Is the RDA (0.8g/kg) enough if I'm lifting seriously?",
    answer:
      "No — the RDA is a deficiency-prevention minimum, not a muscle-building target. It predates and isn't designed to answer this question.",
  },
  {
    question: "Is there any downside to eating more than 1.6g/kg?",
    answer:
      "Not really, for most healthy people — it's just not shown to add further lean-mass benefit. It becomes a personal-preference/adherence question past that point, not an evidence question.",
  },
  {
    question: "Does this number change if I'm over 40?",
    answer:
      "The research suggests protein-supplementation efficacy declines somewhat with age — all the more reason to hit the target consistently rather than assume you're covered.",
  },
  {
    question: "How does this connect to calorie targets?",
    answer:
      "Protein is set first as a floor; calories, carbs, and fat get built around it — see the macro calculator for the full picture.",
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
  headline: "How Much Protein Do You Actually Need Per Kilogram? (Ending the 1.2 vs. 2.2 Debate)",
  description:
    "An evidence-graded arbitration comparing 0.8-1.2g/kg RDA guidelines, 2.2g/kg gym heuristics, and the 1.6g/kg research ceiling from Morton et al. 2018.",
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
  ],
  about: [
    { "@type": "Thing", name: "Protein Intake Per Kg" },
    { "@type": "Thing", name: "Resistance Training Nutrition" },
    { "@type": "Thing", name: "Muscle Building Evidence" },
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
      name: "How Much Protein Per Kg",
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

export default async function ProteinPerKgSciencePage() {
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
            <li className="text-cloudText">How Much Protein Per Kg</li>
          </ol>
        </nav>

        <header className="mb-10">
          <p className="eyebrow text-cloudText">Peer-Reviewed Nutrition Arbitration</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            How Much Protein Do You Actually Need Per Kilogram? (Ending the 1.2 vs. 2.2 Debate)
          </h1>
        </header>

        {/* Answer Block */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
            Direct Answer
          </h2>
          <p className="text-[17px] leading-[1.65] text-bone">
            The protein debate online has three camps: the RDA-adjacent &ldquo;0.8-1.2g/kg is
            plenty&rdquo; camp, the bodybuilding-culture &ldquo;1g per pound (2.2g/kg) or you&apos;re
            leaving gains on the table&rdquo; camp, and what the actual meta-analytic evidence shows
            — a ceiling around 1.6g/kg/day, above which additional protein doesn&apos;t produce
            more resistance-training-induced lean mass in the pooled data. The RDA figure is a
            minimum-to-avoid-deficiency number, not a muscle-building target — it was never
            designed to answer this question. The 2.2g/kg figure isn&apos;t wrong so much as
            unnecessary for most people — it doesn&apos;t hurt, but the evidence doesn&apos;t show
            it outperforming 1.6g/kg for building or preserving muscle. The practical target for
            most men training seriously: 1.6-2.0g/kg/day, treated as a floor to hit consistently
            rather than a number to maximize.
          </p>
        </section>

        {/* H2 Sub-intent 1 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Where does the &apos;0.8g/kg&apos; number actually come from?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            That&apos;s the RDA, calculated to prevent deficiency in the general population — not a
            muscle-building target. The official Recommended Dietary Allowance of 0.8 grams per
            kilogram of body weight (or ~0.36g/lb) was established by nutrition governing bodies to
            satisfy the basic amino acid requirements of 97.5% of sedentary adults and avoid nitrogen
            imbalance.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-1 text-bone italic">
            &ldquo;The RDA figure of 0.8g/kg was calculated to prevent physiological deficiency in
            sedentary adults, not to optimize muscle building during resistance training.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Applying 0.8g/kg to someone lifting weights three to five days a week confuses a zero-deficiency
            baseline with an adaptation target. While 0.8-1.2g/kg keeps a non-lifter out of nitrogen
            deficit, it falls well short of the rate required to maximize muscle protein synthesis under
            heavy mechanical tension.
          </p>
        </section>

        {/* H2 Sub-intent 2 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Where does &apos;1g per pound&apos; (2.2g/kg) come from?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            It is a bodybuilding culture heuristic, not derived from the meta-analytic ceiling. For
            decades, gym culture promoted &ldquo;1 gram of protein per pound of body weight&rdquo; (2.2g/kg)
            because the math was simple, memorable, and guaranteed that lifters would never fall short of
            their amino acid needs.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-1 text-bone italic">
            &ldquo;The 1g per pound (2.2g/kg) target is a bodybuilding cultural heuristic that provides a
            convenient safety buffer, not a requirement derived from meta-analytic data.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            While eating 2.2g/kg is generally safe for healthy individuals, treating it as an absolute floor
            creates unnecessary dietary friction. Research demonstrates that intake levels above 1.6-2.0g/kg
            do not yield measurable additional muscle mass for the vast majority of natural lifters.
          </p>
        </section>

        {/* H2 Sub-intent 3 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            What does the actual research say the ceiling is?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The comprehensive meta-analysis by{" "}
            <PubMedLink pmid="28698222">Morton et al., 2018</PubMedLink> (PMID 28698222), evaluated 49
            randomized controlled resistance training trials involving 1,863 healthy adult participants.
            The statistical ceiling identified across the pooled data was approximately ~1.6g/kg/day (0.73g/lb).
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-1 text-bone italic">
            &ldquo;Meta-analytic evidence from 49 resistance training studies confirms that 1.6g/kg/day is
            the average intake ceiling beyond which extra protein yields diminishing muscle-building
            returns.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Beyond 1.6g/kg/day, the upper bound of the 95% confidence interval in the Morton meta-analysis reached
            2.2g/kg/day, but the average point of diminishing returns flattened at 1.62g/kg. Consuming more than
            this amount did not lead to statistically significant increases in resistance-training-induced fat-free
            mass accretion.
          </p>
        </section>

        {/* H2 Sub-intent 4 */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            Does the target change with age or training experience?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            The Morton meta-analysis found protein-supplementation efficacy decreases with age and increases
            with training experience — highly relevant for lifters managing training recovery over 40. Older
            adults experience anabolic resistance, meaning higher per-meal leucine thresholds are required to
            trigger equivalent muscle protein synthesis rates.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-1 text-bone italic">
            &ldquo;Anabolic resistance in older adults makes hitting a consistent protein floor around 1.6-2.0g/kg/day
            more critical, even though total responsiveness to extra supplementation declines with age.&rdquo;
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Because anabolic sensitivity diminishes with age, hitting a reliable floor of 1.6-2.0g/kg/day becomes
            even more essential for men over 40 to preserve lean tissue during fat loss or recomp phases. See our
            full guide on{" "}
            <Link href="/nutrition/muscle-after-40" className="underline text-sky-400 hover:text-bone">
              building muscle after 40
            </Link>{" "}
            for age-adjusted protein distribution strategies.
          </p>
        </section>

        {/* H2 Sub-intent 5 & Table */}
        <section className="mb-12">
          <h2 className="text-[26px] font-bold leading-tight text-bone sm:text-[30px]">
            So what number should I actually use?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-cloudText">
            Aim for 1.6-2.0g/kg/day (0.73-0.91g/lb) as a consistent daily floor rather than a number to maximize.
            This gives you the full meta-analytic benefit plus a conservative safety margin for high-stress or deficit days.
          </p>
          <div className="mt-4 border-l-2 border-sky-400/60 pl-4 py-1 text-bone italic">
            &ldquo;Setting your daily protein target between 1.6g/kg and 2.0g/kg treats the research ceiling as a
            consistent floor while avoiding unnecessary dietary restriction.&rdquo;
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-bone/15">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-bone/[0.025] text-bone border-b border-bone/15">
                <tr>
                  <th className="px-4 py-3 font-semibold">Camp</th>
                  <th className="px-4 py-3 font-semibold">g/kg/day</th>
                  <th className="px-4 py-3 font-semibold">Where it comes from</th>
                  <th className="px-4 py-3 font-semibold">Evidence grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone/10 text-cloudText">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-bone/[0.025]">
                    <td className="px-4 py-3 font-medium text-bone">{row.camp}</td>
                    <td className="px-4 py-3 text-sky-400 font-mono">{row.gPerKg}</td>
                    <td className="px-4 py-3">{row.origin}</td>
                    <td className="px-4 py-3">
                      {row.pmid ? (
                        <span>
                          {row.grade.split("(PMID")[0]}
                          (<PubMedLink pmid={row.pmid}>PMID {row.pmid}</PubMedLink>)
                        </span>
                      ) : (
                        row.grade
                      )}
                    </td>
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
                <strong>1.6g/kg is a population mean:</strong> Individual variance exists. Lifters in severe calorie
                deficits or at very low body fat levels may benefit from leaning toward 2.0-2.2g/kg to maximize muscle retention.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Protein alone does not build muscle:</strong> Without progressive resistance training generating
                mechanical tension, excess protein is oxidized for energy rather than converted into contractile tissue.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Extremely high intake (2.2g/kg+) is not harmful:</strong> High-protein diets in healthy individuals
                with normal kidney function show no adverse health effects — see our breakdown on{" "}
                <Link href="/science/high-protein-diet-and-kidney-health" className="underline text-sky-400 hover:text-bone">
                  high-protein diets and kidney health
                </Link>.
              </span>
            </li>
          </ul>
        </section>

        {/* Proof & Navigation Links */}
        <section className="mb-12 rounded-xl border border-bone/15 bg-bone/[0.025] p-6 sm:p-8">
          <h3 className="text-[18px] font-semibold text-bone mb-4">
            Next steps &amp; related resources
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/tools/macro-calculator"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Interactive Tool</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Macro Calculator</p>
              <p className="mt-1 text-xs text-mute">Calculate your personal protein floor and calorie targets.</p>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Persona Hub</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Building Muscle After 40</p>
              <p className="mt-1 text-xs text-mute">Age-specific adjustments for anabolic resistance and recovery.</p>
            </Link>
            <Link
              href="/science/questions/how-much-protein-for-body-recomposition"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Q&amp;A</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Protein for Recomposition</p>
              <p className="mt-1 text-xs text-mute">How protein supports satiety and lean-mass during recomp.</p>
            </Link>
            <Link
              href="/science/anabolic-window-protein-timing-myth"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Review</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Anabolic Window Myth</p>
              <p className="mt-1 text-xs text-mute">Protein timing vs total daily protein distribution science.</p>
            </Link>
            <Link
              href="/blog/how-much-protein-to-lose-fat"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Guide</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Protein to Lose Fat</p>
              <p className="mt-1 text-xs text-mute">Practical fat-loss protein strategies without muscle loss.</p>
            </Link>
            <Link
              href="/science/protein-powder-vs-whole-food-protein"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Evidence</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Protein Powder vs. Whole Food</p>
              <p className="mt-1 text-xs text-mute">Comparing powders vs intact whole food matrices for muscle growth &amp; satiety.</p>
            </Link>
            <Link
              href="/science/meal-frequency-for-muscle-after-40"
              className="group block rounded-lg border border-bone/10 bg-bone/[0.025] p-4 transition-all hover:border-sky-400/50 hover:bg-bone/[0.025]"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Science Evidence</span>
              <p className="mt-1 font-medium text-bone group-hover:text-sky-400">Meal Frequency After 40</p>
              <p className="mt-1 text-xs text-mute">Optimal meal patterns and leucine thresholds to overcome anabolic resistance.</p>
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
          context={productContextForPath("/science/how-much-protein-per-kg")}
          source="geebs_science_how_much_protein_per_kg"
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

import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/mediterranean-diet-and-testosterone";
const PUBLISHED = "2026-08-11";
const REVIEWED = "2026-08-11";

export const metadata: Metadata = {
  title: "Mediterranean Diet and Testosterone: Clinical Evidence Breakdown",
  description:
    "Clinical trial breakdown evaluating how a Mediterranean dietary pattern rich in olive oil, fish, and whole foods impacts serum testosterone, insulin sensitivity, and male hormonal health.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Mediterranean Diet and Testosterone: Clinical Evidence Breakdown",
    description:
      "Clinical trial breakdown evaluating how a Mediterranean dietary pattern rich in olive oil, fish, and whole foods impacts serum testosterone, insulin sensitivity, and male hormonal health.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Mediterranean Diet and Testosterone Science Breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediterranean Diet and Testosterone: Clinical Evidence Breakdown",
    description:
      "Clinical trial breakdown evaluating how a Mediterranean dietary pattern rich in olive oil, fish, and whole foods impacts serum testosterone, insulin sensitivity, and male hormonal health.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type StudyRow = {
  dietComparison: string;
  design: string;
  duration: string;
  hormoneImpact: string;
  metabolicImpact: string;
  pmid: string;
  citation: string;
};

const STUDY_ROWS: StudyRow[] = [
  {
    dietComparison: "Virgin Olive Oil vs. Butter (MUFA vs. SFA)",
    design: "Randomized Crossover Trial (n=60 men)",
    duration: "3 weeks",
    hormoneImpact: "Serum total testosterone +17.4%, LH +42.6%",
    metabolicImpact: "Improved HDL-C and antioxidant status",
    pmid: "23472458",
    citation: "Derouiche et al. (2013)",
  },
  {
    dietComparison: "Low-Fat Diet (<20% fat) vs. High-Fat Diet (>35% fat)",
    design: "Systematic Review & Meta-Analysis (6 trials)",
    duration: "2–10 weeks",
    hormoneImpact: "Low-fat diets reduced total testosterone by ~10–15%",
    metabolicImpact: "Adequate dietary fat required for steroidogenesis",
    pmid: "33741447",
    citation: "Whittaker et al. (2021)",
  },
  {
    dietComparison: "Mediterranean Diet vs. Standard Care Control Diet",
    design: "Randomized Controlled Trial (n=180 adults)",
    duration: "2 years",
    hormoneImpact: "Restored baseline endocrine function via metabolic repair",
    metabolicImpact: "Significant reductions in hs-CRP and insulin resistance",
    pmid: "15383512",
    citation: "Esposito et al. (2004)",
  },
  {
    dietComparison: "High-Fat/Low-Fiber vs. Low-Fat/High-Fiber",
    design: "Controlled Crossover Trial (n=43 men)",
    duration: "10 weeks",
    hormoneImpact: "13% higher total testosterone on higher-fat diet",
    metabolicImpact: "MUFA and SFA intake positively correlated with androgens",
    pmid: "8942407",
    citation: "Dorgan et al. (1996)",
  },
  {
    dietComparison: "Dietary Fat Subtypes (MUFA, SFA, PUFA) & Hormones",
    design: "Cross-Sectional Human Trial (n=30 men)",
    duration: "Cross-sectional",
    hormoneImpact: "MUFA & SFA intake positively correlated with resting T",
    metabolicImpact: "Excess PUFA inversely correlated with free T",
    pmid: "9029197",
    citation: "Volek et al. (1997)",
  },
  {
    dietComparison: "Olive Oil MUFAs vs. Seed Oils in Testicular Leydig Cells",
    design: "Mechanistic Ex Vivo & Animal Model",
    duration: "60 days",
    hormoneImpact: "Preserved 3β-HSD and 17β-HSD enzyme activity",
    metabolicImpact: "Protected testicular membranes against oxidative stress",
    pmid: "19130109",
    citation: "Hurtado et al. (2009)",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the Mediterranean diet increase testosterone levels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mediterranean diet supports optimal testosterone production primarily by improving insulin sensitivity, reducing systemic inflammation, and providing adequate monounsaturated fats. While it does not act as a pharmacological androgen booster, replacing ultra-processed Western foods or restrictive low-fat diets with a Mediterranean framework helps restore baseline hormonal health.",
      },
    },
    {
      "@type": "Question",
      name: "Why are monounsaturated fats in olive oil beneficial for male hormones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monounsaturated fatty acids (MUFAs), abundantly found in extra virgin olive oil, serve as optimal lipid substrates for testicular Leydig cell membrane fluidity and steroidogenic enzyme activity (3β-HSD and 17β-HSD). Clinical trial data (Derouiche et al., 2013, PMID 23472458) showed a 17.4% increase in serum testosterone when swapping baseline saturated butter for virgin olive oil.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Mediterranean diet better for testosterone than a low-fat diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A meta-analysis of dietary interventions (Whittaker et al., 2021, PMID 33741447) confirmed that low-fat diets (<20% daily calories from fat) decrease total testosterone levels by 10% to 15% in men compared to moderate-to-high fat diets like the Mediterranean diet.",
      },
    },
    {
      "@type": "Question",
      name: "How long on a Mediterranean diet before hormonal improvements occur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Controlled dietary crossover trials demonstrate measurable hormonal shifts within 3 to 10 weeks of optimizing fat quality and total energy balance. Long-term systemic inflammatory reductions (hs-CRP) and insulin sensitivity improvements typically peak over 3 to 6 months.",
      },
    },
    {
      "@type": "Question",
      name: "Can switching to a Mediterranean diet fix clinical low testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dietary optimization can resolve secondary testosterone suppression caused by metabolic syndrome, systemic inflammation, or severe fat restriction. However, primary testicular failure or organic hypogonadism requires medical evaluation rather than dietary intervention alone.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mediterranean Diet and Testosterone: Clinical Evidence Breakdown",
  description:
    "Clinical evidence evaluating how a Mediterranean dietary pattern rich in olive oil, fish, and whole foods affects serum testosterone, insulin sensitivity, and male metabolic health.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    hasCredential: "NASM-CPT",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  image: [`${SITE_URL}/social-preview-coaching.jpg`],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "Effect of argan and olive oil consumption on the hormonal profile of androgens among healthy adult Moroccan men",
      author: { "@type": "Person", name: "Derouiche A" },
      datePublished: "2013",
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "23472458" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23472458/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Low-fat diets and testosterone in men: Systematic review and meta-analysis of intervention studies",
      author: { "@type": "Person", name: "Whittaker J" },
      datePublished: "2021",
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "33741447" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33741447/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effect of a Mediterranean-style diet on endothelial dysfunction and markers of vascular inflammation in the metabolic syndrome: a randomized trial",
      author: { "@type": "Person", name: "Esposito K" },
      datePublished: "2004",
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "15383512" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/15383512/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Mediterranean Diet" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Olive Oil" },
    { "@type": "Thing", name: "Monounsaturated Fat" },
    { "@type": "Thing", name: "Insulin Sensitivity" },
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
      name: "Mediterranean Diet and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function MediterraneanDietTestosteronePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="med-diet-faq-schema" data={faqSchema} />
      <JsonLd id="med-diet-article-schema" data={articleSchema} />
      <JsonLd id="med-diet-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[850px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28">
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
            <li className="text-cloudText">Mediterranean Diet &amp; Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Science Library</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">
            Mediterranean Diet and Testosterone: Clinical Evidence Breakdown
          </h1>
          <p className="mt-6 max-w-[70ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            An objective clinical review examining how adopting a whole-food Mediterranean dietary pattern impacts serum total testosterone, sex hormone-binding globulin (SHBG), insulin sensitivity, and testicular steroidogenesis.
          </p>
          <p className="mt-3 text-[13px] text-mute">Last updated August 11, 2026</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="btn btn-primary"
              data-analytics-event="med_diet_apply_click"
              data-analytics-source="med_diet_header"
            >
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link
              href="/science/olive-oil"
              className="btn btn-secondary"
              data-analytics-event="med_diet_olive_oil_click"
              data-analytics-source="med_diet_header"
            >
              Olive oil study breakdown
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Answer Block */}
        <section
          aria-labelledby="answer-block-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-6 md:px-7 md:py-7"
        >
          <p className="eyebrow text-cloudText">Quick Answer</p>
          <h2
            id="answer-block-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            The honest evidence in two sentences.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The Mediterranean diet supports optimal testosterone production primarily by improving insulin sensitivity, reducing systemic inflammation, and providing adequate monounsaturated fats. While it does not act as a pharmacological androgen booster, replacing ultra-processed Western foods or restrictive low-fat diets with a Mediterranean framework helps restore baseline hormonal health.
          </p>
        </section>

        {/* H2 1 */}
        <section aria-labelledby="does-med-diet-increase-t-heading" className="mt-12 md:mt-16">
          <h2
            id="does-med-diet-increase-t-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Does the Mediterranean diet increase testosterone levels?
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Men evaluating dietary strategies for hormonal optimization often ask whether a Mediterranean diet directly raises circulating serum testosterone. Human clinical trials demonstrate that adopting a Mediterranean framework elevates total and free testosterone in men who previously consumed restrictive low-fat diets or inflammatory Western diets rich in refined sugars and ultra-processed fats.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Rather than functioning as a direct pharmacological booster, the Mediterranean diet resolves metabolic friction. In a landmark 2-year randomized intervention trial (Esposito et al., 2004, PMID 15383512), a Mediterranean diet rich in extra virgin olive oil, vegetables, legumes, and omega-3 fatty acids produced significant reductions in high-sensitivity C-reactive protein (hs-CRP) and improved insulin sensitivity. Because chronic visceral inflammation and hyperinsulinemia impair pituitary gonadotropin signaling and suppress testicular Leydig cell function, clearing metabolic dysregulation restores natural endogenous androgen output.
          </p>

          <blockquote className="mt-6 rounded-[6px] border-l-2 border-cloudText/70 bg-white/[0.03] p-5 text-[15px] italic leading-[1.65] text-bone/90">
            &ldquo;Adopting a whole-food Mediterranean diet restores baseline testosterone production by resolving systemic inflammation and insulin resistance rather than acting as a artificial hormonal stimulant.&rdquo;
          </blockquote>
        </section>

        {/* H2 2 */}
        <section aria-labelledby="why-mufa-olive-oil-heading" className="mt-12 md:mt-16">
          <h2
            id="why-mufa-olive-oil-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Why are monounsaturated fats in olive oil beneficial for male hormones?
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Monounsaturated fatty acids (MUFAs), particularly oleic acid found in extra virgin olive oil and nuts, play a pivotal role in maintaining testicular membrane architecture and steroidogenic activity.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            In a randomized controlled crossover study in healthy young men (Derouiche et al., 2013, PMID 23472458), replacing baseline dietary butter with 25g/day of extra virgin olive oil for 3 weeks led to a 17.4% increase in serum total testosterone and a 42.6% rise in luteinizing hormone (LH). At the cellular level, mechanistic research (Hurtado et al., 2009, PMID 19130109) shows that MUFA-rich olive oil enhances the activity of key testicular enzymes—specifically 3&beta;-hydroxysteroid dehydrogenase (3&beta;-HSD) and 17&beta;-hydroxysteroid dehydrogenase (17&beta;-HSD)—which convert cholesterol into testosterone inside Leydig cells.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Furthermore, cross-sectional dietary evaluations in men (Volek et al., 1997, PMID 9029197) confirmed that higher daily intakes of monounsaturated and saturated fatty acids correlate positively with resting testosterone levels, whereas polyunsaturated fat overconsumption yields an inverse relationship.
          </p>

          <blockquote className="mt-6 rounded-[6px] border-l-2 border-cloudText/70 bg-white/[0.03] p-5 text-[15px] italic leading-[1.65] text-bone/90">
            &ldquo;Monounsaturated fatty acids from extra virgin olive oil optimize testicular Leydig cell membrane fluidity and preserve key steroidogenic enzymes required for converting cholesterol into testosterone.&rdquo;
          </blockquote>
        </section>

        {/* H2 3 */}
        <section aria-labelledby="med-diet-vs-low-fat-heading" className="mt-12 md:mt-16">
          <h2
            id="med-diet-vs-low-fat-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Is the Mediterranean diet better for testosterone than a low-fat diet?
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            A persistent myth in conventional nutritional advice is that low-fat diets are superior for cardiovascular and hormonal health. However, clinical evidence demonstrates that severe fat restriction suppresses testicular androgen synthesis.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            A comprehensive systematic review and meta-analysis of dietary intervention trials (Whittaker et al., 2021, PMID 33741447) analyzed low-fat diets (&lt;20% of calories from fat) against higher-fat dietary patterns. The meta-analysis revealed that low-fat diets consistently reduced serum total testosterone by 10% to 15% in men. Controlled feeding crossover trials by Dorgan et al. (1996, PMID 8942407) similarly found that men consuming a high-fat diet had 13% higher total testosterone levels than when maintained on a low-fat, high-fiber intake.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Because the Mediterranean diet derives 35% to 40% of total calories from unrefined fats—primarily monounsaturated fats from extra virgin olive oil, nuts, and wild fish—it provides the necessary lipid substrate for steroidogenesis without compromising cardiovascular atherogenic markers like ApoB.
          </p>

          <blockquote className="mt-6 rounded-[6px] border-l-2 border-cloudText/70 bg-white/[0.03] p-5 text-[15px] italic leading-[1.65] text-bone/90">
            &ldquo;Replacing restrictive low-fat diets with a Mediterranean dietary pattern prevents the 10% to 15% drop in total testosterone caused by inadequate lipid intake while protecting cardiovascular health.&rdquo;
          </blockquote>
        </section>

        {/* Evidence Table */}
        <section aria-labelledby="evidence-table-heading" className="mt-12 md:mt-16">
          <h3
            id="evidence-table-heading"
            className="display text-[20px] leading-[1.2] text-bone md:text-[24px]"
          >
            Clinical Trial Evidence Summary
          </h3>
          <p className="mt-2 text-[14px] text-mute">
            Human dietary intervention studies evaluating fat quality, metabolic markers, and serum testosterone.
          </p>

          <div className="mt-5 overflow-x-auto rounded-[6px] border border-cloudText/20">
            <table className="w-full text-left text-[13.5px] text-bone/85">
              <thead className="bg-white/[0.05] text-[12px] uppercase tracking-wider text-cloudText">
                <tr>
                  <th className="px-4 py-3">Dietary Comparison</th>
                  <th className="px-4 py-3">Study Design</th>
                  <th className="px-4 py-3">Hormonal Impact</th>
                  <th className="px-4 py-3">Metabolic / Lipid Profile</th>
                  <th className="px-4 py-3">Citation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15">
                {STUDY_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-bone">{row.dietComparison}</td>
                    <td className="px-4 py-3 text-mute">{row.design}</td>
                    <td className="px-4 py-3 text-bone/90">{row.hormoneImpact}</td>
                    <td className="px-4 py-3 text-bone/80">{row.metabolicImpact}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-cloudText">
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-bone"
                      >
                        {row.citation} (PMID {row.pmid})
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* H2 4 */}
        <section aria-labelledby="timeline-improvements-heading" className="mt-12 md:mt-16">
          <h2
            id="timeline-improvements-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            How long on a Mediterranean diet before hormonal improvements occur?
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            The timeline for observing hormonal adaptations depends on whether changes stem from direct fatty acid availability or broader systemic metabolic repair.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-bone/85 md:text-[16.5px]">
            Short-term crossover trials (Derouiche et al., 2013, PMID 23472458; Dorgan et al., 1996, PMID 8942407) show that swapping fat quality or adjusting fat quantity alters circulating total testosterone within 3 to 10 weeks. However, deeper improvements in free testosterone, SHBG regulation, and pituitary LH sensitivity driven by insulin sensitization and inflammatory reduction (Esposito et al., 2004, PMID 15383512) unfold over 3 to 6 months of sustained dietary adherence.
          </p>

          <blockquote className="mt-6 rounded-[6px] border-l-2 border-cloudText/70 bg-white/[0.03] p-5 text-[15px] italic leading-[1.65] text-bone/90">
            &ldquo;While dietary fat swaps yield acute androgen responses within 3 to 4 weeks, complete endocrine recovery driven by inflammatory and insulin resolution requires 3 to 6 months of dietary consistency.&rdquo;
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-labelledby="honest-limits-heading"
          className="mt-12 rounded-[6px] border border-amber-500/30 bg-amber-500/[0.05] p-5 md:mt-16 md:p-6"
        >
          <p className="eyebrow text-amber-400">Honest Limits of Current Science</p>
          <h3
            id="honest-limits-heading"
            className="display mt-1 text-[20px] leading-[1.2] text-bone md:text-[22px]"
          >
            What the research does NOT show.
          </h3>
          <ul className="mt-4 space-y-3 text-[14.5px] leading-[1.65] text-bone/85">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span>
                <strong>Confounding by weight loss &amp; caloric deficit:</strong> Hormonal improvements observed when transitioning to a whole-food Mediterranean pattern are frequently confounded by concurrent body fat reduction and energy deficit.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span>
                <strong>Self-reporting error in long-term observational studies:</strong> Outside of tightly controlled feeding trials, long-term dietary compliance relies on self-reported dietary recalls, which carry inherent reporting bias.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span>
                <strong>Baseline metabolic health dictates effect size:</strong> Lean, metabolically healthy individuals with optimal baseline testosterone exhibit significantly smaller dietary-induced endocrine shifts than men presenting with baseline insulin resistance or obesity.
              </span>
            </li>
          </ul>
        </section>

        {/* Internal Links */}
        <section aria-labelledby="related-links-heading" className="mt-12 md:mt-16">
          <h3
            id="related-links-heading"
            className="display text-[20px] leading-[1.2] text-bone md:text-[24px]"
          >
            Explore Related Science &amp; Guides
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Link
              href="/science/olive-oil"
              className="rounded-[6px] border border-cloudText/20 bg-white/[0.02] p-4 transition hover:border-cloudText/50"
            >
              <p className="text-[12px] uppercase tracking-wider text-cloudText">Science Breakdown</p>
              <p className="mt-1 text-[15px] font-semibold text-bone">Olive Oil &amp; Testosterone Study</p>
              <p className="mt-2 text-[13px] text-mute">Full analysis of the Derouiche et al. (2013) RCT.</p>
            </Link>

            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-white/[0.02] p-4 transition hover:border-cloudText/50"
            >
              <p className="text-[12px] uppercase tracking-wider text-cloudText">Nutrition Guide</p>
              <p className="mt-1 text-[15px] font-semibold text-bone">Testosterone Nutrition Guide</p>
              <p className="mt-2 text-[13px] text-mute">Evidence-based dietary fat and micronutrient protocols.</p>
            </Link>

            <Link
              href="/nutrition/longevity"
              className="rounded-[6px] border border-cloudText/20 bg-white/[0.02] p-4 transition hover:border-cloudText/50"
            >
              <p className="text-[12px] uppercase tracking-wider text-cloudText">Longevity Science</p>
              <p className="mt-1 text-[15px] font-semibold text-bone">Dietary Fats &amp; Longevity</p>
              <p className="mt-2 text-[13px] text-mute">Managing ApoB and metabolic health for healthspan.</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section aria-labelledby="faq-heading" className="mt-14 md:mt-20">
          <p className="eyebrow text-cloudText">Frequently Asked Questions</p>
          <h2
            id="faq-heading"
            className="display mt-2 text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Questions on Mediterranean diet and male hormones.
          </h2>

          <div className="mt-8 space-y-6">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[6px] border border-cloudText/25 bg-white/[0.02] p-5 md:p-6"
              >
                <h3 className="text-[17px] font-semibold text-bone">{item.name}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bone/80">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="mt-16 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.05] p-6 text-center md:mt-24 md:p-10">
          <h2 className="display text-[24px] text-bone md:text-[32px]">
            Ready to optimize your diet, training, and hormonal health?
          </h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-[15px] text-bone/80">
            Get personalized 1-on-1 coaching designed for busy men who want sustainable muscle building, fat loss, and longevity.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching -&gt;
            </Link>
          </div>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

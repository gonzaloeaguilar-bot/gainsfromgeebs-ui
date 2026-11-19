import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/alcohol-and-testosterone";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Alcohol and Testosterone: Acute vs. Chronic Effects and Recovery Kinetics",
  description:
    "Heavy or chronic alcohol intake suppresses testosterone via Leydig cell impairment, while moderate drinking has transient effects. Peer-reviewed research and recovery kinetics.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Alcohol and Testosterone: Acute vs. Chronic Effects and Recovery Kinetics",
    description:
      "Peer-reviewed evidence on how acute alcohol administration and chronic drinking affect male testosterone production, Leydig cells, and hormonal recovery.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Alcohol and Testosterone — peer-reviewed research review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alcohol and Testosterone: Acute vs. Chronic Effects and Recovery Kinetics",
    description:
      "What peer-reviewed clinical trials show regarding alcohol intake, Leydig cell suppression, LH pulsatility, and post-abstinence hormonal recovery.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  exposure: string;
  doseProtocol: string;
  duration: string;
  observedEffect: string;
  grade: string;
  pmid: string;
  authorYear: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    exposure: "Controlled Moderate Drinking",
    doseProtocol: "40g/day ethanol (~3 standard drinks)",
    duration: "3 weeks",
    observedEffect: "6.8% reduction in serum testosterone in adult males",
    grade: "Grade A (RCT Crossover)",
    pmid: "15166654",
    authorYear: "Sierksma et al. (2004)",
  },
  {
    exposure: "Low-Dose Acute Ethanol",
    doseProtocol: "0.5 g/kg body weight (~2-3 drinks)",
    duration: "Acute (hours post-ingestion)",
    observedEffect: "Transient slight testosterone increase via hepatic NAD+/NADH shift",
    grade: "Grade B (Human Intervention)",
    pmid: "12711931",
    authorYear: "Sarkola et al. (2003)",
  },
  {
    exposure: "High-Dose Acute Intoxication",
    doseProtocol: "1.5 g/kg body weight (heavy intoxication)",
    duration: "12-24 hours post-ingestion",
    observedEffect: "20-50% suppression of serum testosterone and LH pulsatility disruption",
    grade: "Grade B (Human Trial)",
    pmid: "6443186",
    authorYear: "Välimäki et al. (1984)",
  },
  {
    exposure: "Acute Ethanol Administration",
    doseProtocol: "High ethanol bolus",
    duration: "Acute monitoring",
    observedEffect: "Direct suppression of pituitary-gonadal hormone secretion",
    grade: "Grade B (Human Trial)",
    pmid: "894528",
    authorYear: "Mendelson et al. (1977)",
  },
  {
    exposure: "Chronic Heavy Alcohol Abuse",
    doseProtocol: "Habitual heavy consumption",
    duration: "Long-term (>1-5+ years)",
    observedEffect: "Leydig cell atrophy, severe chronic hypogonadism, antioxidant depletion",
    grade: "Grade C (Cohort Study)",
    pmid: "17193902",
    authorYear: "Maneesh et al. (2006)",
  },
  {
    exposure: "Abstinence & Hormonal Recovery",
    doseProtocol: "Complete alcohol cessation",
    duration: "Weeks to months",
    observedEffect: "Partial to full recovery of gonadal axis function and testosterone output",
    grade: "Grade C (Clinical Trial)",
    pmid: "6402410",
    authorYear: "Van-Thiel et al. (1983)",
  },
];

const faqs = [
  {
    question: "Does a single beer drop your testosterone?",
    answer:
      "No. Low acute alcohol intake (roughly 0.5 g/kg or 1-2 standard drinks) does not suppress serum testosterone. In fact, low acute doses temporarily alter liver NAD+/NADH redox ratios, causing a brief, non-functional uptick in circulating free testosterone before returning to baseline.",
  },
  {
    question: "How long does testosterone stay suppressed after heavy drinking?",
    answer:
      "Following heavy acute intoxication (1.5 g/kg ethanol), serum testosterone levels begin dropping within 2-4 hours and typically remain suppressed for 12 to 24 hours as ethanol and acetaldehyde metabolites clear the liver and testicular tissues.",
  },
  {
    question: "Does moderate daily drinking impair testosterone long-term?",
    answer:
      "Controlled clinical trials show that consuming ~40 grams of alcohol daily (about 3 standard drinks) over 3 weeks results in a modest ~6.8% decline in plasma testosterone levels in healthy adult men.",
  },
  {
    question: "Can Leydig cell function recover after quitting alcohol?",
    answer:
      "Yes. Unless permanent testicular tissue fibrosis has developed from decades of severe alcoholism, hypothalamic-pituitary-gonadal axis signaling and Leydig cell steroidogenesis show significant recovery within weeks to months of sustained abstinence.",
  },
  {
    question: "Why does alcohol impair testosterone and muscle building at the same time?",
    answer:
      "Alcohol exerts a dual suppression: it directly damages testicular Leydig cells and blunts pituitary LH release, while simultaneously suppressing nocturnal growth hormone pulses, disrupting REM sleep, and impairing muscle protein synthesis (mTORC1 signaling).",
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
  headline: "Alcohol and Testosterone: Acute vs. Chronic Effects and Recovery Kinetics",
  description:
    "Heavy or chronic alcohol consumption directly suppresses testosterone production by impairing Leydig cell function and hypothalamic-pituitary-gonadal axis signaling. Low to moderate acute alcohol intake produces minimal or transient effects.",
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
      name: "Effect of moderate alcohol consumption on plasma dehydroepiandrosterone sulfate, testosterone, and estradiol levels in middle-aged men and postmenopausal women: a diet-controlled intervention study",
      author: { "@type": "Person", name: "Sierksma A" },
      datePublished: "2004",
      isPartOf: { "@type": "Periodical", name: "British Journal of Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "15166654" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/15166654/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Testosterone increases in men after a low dose of alcohol",
      author: [{ "@type": "Person", name: "Sarkola T" }, { "@type": "Person", name: "Eriksson CJ" }],
      datePublished: "2003",
      isPartOf: { "@type": "Periodical", name: "Alcoholism: Clinical and Experimental Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "12711931" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/12711931/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Sex hormones and adrenocortical steroids in men acutely intoxicated with ethanol",
      author: { "@type": "Person", name: "Välimäki MJ" },
      datePublished: "1984",
      isPartOf: { "@type": "Periodical", name: "Alcoholism: Clinical and Experimental Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "6443186" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/6443186/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effects of acute alcohol intake on pituitary-gonadal hormones in normal human males",
      author: { "@type": "Person", name: "Mendelson JH" },
      datePublished: "1977",
      isPartOf: { "@type": "Periodical", name: "Journal of Pharmacology and Experimental Therapeutics" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "894528" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/894528/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Alcohol abuse-duration dependent decrease in plasma testosterone and antioxidants in males",
      author: { "@type": "Person", name: "Maneesh M" },
      datePublished: "2006",
      isPartOf: { "@type": "Periodical", name: "Indian Journal of Clinical Biochemistry" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "17193902" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/17193902/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Recovery of sexual function in abstinent alcoholic men",
      author: { "@type": "Person", name: "Van Thiel DH" },
      datePublished: "1983",
      isPartOf: { "@type": "Periodical", name: "Gastroenterology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "6402410" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/6402410/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Alcohol" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Endocrinology" },
    { "@type": "Thing", name: "Men's Health" },
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
      name: "Alcohol and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function AlcoholAndTestosteroneSciencePage() {
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
            <li className="text-cloudText">Alcohol and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Physiological Topic Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Alcohol and Testosterone: Acute vs. Chronic Effects and Recovery Kinetics
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer Block */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            How alcohol impacts male hormonal output depends on dose, frequency, and sleep timing.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Heavy or chronic alcohol consumption directly suppresses testosterone production by impairing Leydig cell function and hypothalamic-pituitary-gonadal axis signaling. Low to moderate acute alcohol intake produces minimal or transient effects, though drinking close to sleep or workout recovery impairs nocturnal hormone pulsatility and muscle repair.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-does-alcohol-lower-testosterone" className="mt-12">
          <h2
            id="h2-does-alcohol-lower-testosterone"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does drinking alcohol lower testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Clinical evidence demonstrates that alcohol suppresses testosterone through multiple distinct physiological pathways. Ethanol acts as a direct gonadal toxin that impairs testicular Leydig cells—the primary site of androgen synthesis in males—by disrupting key steroidogenic enzymes (such as 3β-HSD and 17β-HSD) and increasing oxidative stress within testicular tissue. Simultaneously, ethanol metabolism generates acetaldehyde and alters cellular redox states, inhibiting the central release of luteinizing hormone (LH) and follicle-stimulating hormone (FSH) from the anterior pituitary gland.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Ethanol directly impairs testicular Leydig cell steroidogenesis while suppressing hypothalamic gonadotropin-releasing hormone pulsatility in human males.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Controlled human interventions confirm this dual-action suppression. In clinical studies evaluating heavy acute intoxication (PMID 6443186; PMID 894528), high doses of ethanol triggered acute drops in circulating serum testosterone alongside blunted LH secretion. In chronic heavy drinkers (PMID 17193902), prolonged alcohol abuse leads to duration-dependent testicular atrophy and persistent hypogonadism.
          </p>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-how-long-after-drinking" className="mt-12">
          <h2
            id="h2-how-long-after-drinking"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How long after drinking does testosterone drop?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The timeline of testosterone suppression following ethanol consumption depends directly on the peak blood alcohol concentration (BAC) achieved. Following heavy acute intake (1.5 g/kg ethanol, equivalent to roughly 7-9 standard drinks in a short window), circulating testosterone levels begin to decline within 2 to 4 hours post-ingestion. Suppression typically peaks between 10 and 16 hours after drinking—frequently coinciding with the morning hangover phase—and can remain suppressed for 24 hours or longer until ethanol metabolites are fully cleared from liver and peripheral tissues.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Testosterone suppression following heavy acute drinking peaks 10 to 16 hours post-ingestion and can persist for up to 24 hours during systemic clearance.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Furthermore, when alcohol consumption occurs close to bedtime, it disrupts slow-wave sleep (SWS) architecture. Because the majority of nocturnal testosterone and growth hormone pulses occur during deep SWS sleep stages, alcohol-induced sleep fragmentation exacerbates the hormonal suppression beyond the direct toxic effect of ethanol itself.
          </p>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-moderate-drinking-effects" className="mt-12">
          <h2
            id="h2-moderate-drinking-effects"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does moderate drinking affect testosterone levels?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The impact of moderate alcohol consumption (1 to 3 standard drinks) is far milder than heavy bingeing, but controlled intervention trials show measurable effects over extended periods. In a 3-week diet-controlled randomized crossover trial by Sierksma et al. (2004) (PMID 15166654), healthy men consuming 40 grams of alcohol daily (~3 standard drinks) experienced a modest 6.8% reduction in total plasma testosterone levels compared to an alcohol-free control period.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            A 3-week diet-controlled intervention of 40g alcohol daily produced a modest 6.8% drop in serum testosterone in healthy adult men.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Interestingly, acute low-dose ethanol administration (~0.5 g/kg, or about 2 drinks) can cause a brief, transient increase in measured circulating free testosterone (Sarkola et al., 2003, PMID 12711931). This acute phenomenon is driven by shifts in the hepatic NAD+/NADH ratio during alcohol oxidation, which transiently alters androgen metabolism in the liver rather than stimulating new testicular synthesis. This acute spike is short-lived and does not translate into enhanced anabolic capacity or physiological benefit.
          </p>

          {/* Dosage & Intervention Evidence Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Exposure level</th>
                  <th className="p-3 font-semibold md:p-4">Dose / Protocol</th>
                  <th className="p-3 font-semibold md:p-4">Timeline</th>
                  <th className="p-3 font-semibold md:p-4">Observed hormonal effect</th>
                  <th className="p-3 font-semibold md:p-4">Evidence grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.exposure}</td>
                    <td className="p-3 md:p-4">{row.doseProtocol}</td>
                    <td className="p-3 md:p-4">{row.duration}</td>
                    <td className="p-3 md:p-4">
                      {row.observedEffect}
                      <span className="mt-1 block text-[12px] text-mute">
                        {row.authorYear} | PMID:{" "}
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-bone"
                        >
                          {row.pmid}
                        </a>
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-testosterone-recovery" className="mt-12">
          <h2
            id="h2-testosterone-recovery"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Can testosterone levels recover after reducing alcohol intake?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Hormonal recovery kinetics following alcohol reduction or complete cessation depend on the duration and severity of previous drinking habits. Following acute binge drinking, testosterone levels spontaneously normalize within 24 to 36 hours as systemic ethanol is eliminated and normal sleep architecture is restored. If you are cutting back now, the training and eating side of that change is what our{" "}
            <Link href="/for/men-cutting-back-on-drinking" className="underline hover:text-bone">
              coaching for men cutting back on drinking
            </Link>{" "}
            is built for.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Gonadal axis suppression from chronic drinking is largely reversible upon sustained abstinence, with Leydig cell output recovering over several weeks to months.
          </blockquote>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            For chronic heavy drinkers, clinical recovery trials (Van-Thiel et al., 1983, PMID 6402410) demonstrate that sustained alcohol abstinence leads to significant improvements in gonadotropin responsiveness, LH pulsatility, and circulating serum testosterone within weeks to months. Provided irreversible end-stage testicular fibrosis or severe hepatic cirrhosis has not occurred, the hypothalamic-pituitary-gonadal axis exhibits substantial regenerative potential once ethanol-induced oxidative stress is removed.
          </p>
        </section>

        {/* Mandatory Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <ul className="mt-2 space-y-2 list-disc list-inside text-bone/85">
            <li>
              Dosing definitions across literature vary widely between weight-adjusted lab protocols (e.g., g/kg ethanol in controlled clinical settings) and self-reported social drinking.
            </li>
            <li>
              Confounding lifestyle factors like sleep restriction, nutrient deficiencies, and elevated cortisol frequently accompany heavy drinking habits in free-living conditions.
            </li>
            <li>
              Most acute intervention studies focus on young healthy males, which may not translate directly to older cohorts or individuals with pre-existing metabolic conditions.
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.04] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">
                  {faq.question}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Citations Module */}
        <section aria-labelledby="sources-heading" className="mt-14">
          <h2
            id="sources-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Verified PubMed &amp; Clinical Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Sierksma A, et al. (2004)
              </p>
              <p className="text-[13px] text-mute">
                Effect of moderate alcohol consumption on plasma dehydroepiandrosterone sulfate, testosterone, and estradiol levels in middle-aged men and postmenopausal women: a diet-controlled intervention study. <em>Br J Nutr</em> 91(5): 787-95.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/15166654/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 15166654
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Sarkola T, Eriksson CJ. (2003)
              </p>
              <p className="text-[13px] text-mute">
                Testosterone increases in men after a low dose of alcohol. <em>Alcohol Clin Exp Res</em> 27(4): 682-5.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/12711931/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 12711931
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Välimäki MJ, et al. (1984)
              </p>
              <p className="text-[13px] text-mute">
                Sex hormones and adrenocortical steroids in men acutely intoxicated with ethanol. <em>Alcohol Clin Exp Res</em> 8(1): 89-93.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/6443186/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 6443186
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Mendelson JH, Mello NK, Ellingboe J. (1977)
              </p>
              <p className="text-[13px] text-mute">
                Effects of acute alcohol intake on pituitary-gonadal hormones in normal human males. <em>J Pharmacol Exp Ther</em> 202(3): 676-82.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/894528/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 894528
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Maneesh M, et al. (2006)
              </p>
              <p className="text-[13px] text-mute">
                Alcohol abuse-duration dependent decrease in plasma testosterone and antioxidants in males. <em>Indian J Clin Biochem</em> 21(2): 13-7.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/17193902/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 17193902
                </a>
              </div>
            </li>

            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Van-Thiel DH, et al. (1983)
              </p>
              <p className="text-[13px] text-mute">
                Recovery of sexual function in abstinent alcoholic men. <em>Gastroenterology</em> 84(4): 677-82.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/6402410/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 6402410
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Linking Footer */}
        <section aria-labelledby="internal-links-heading" className="mt-14">
          <h2
            id="internal-links-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Related Nutrition &amp; Hormonal Science
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Testosterone Nutrition Hub</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based nutrition and lifestyle levers for male hormone optimization.
              </p>
            </Link>
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                How zinc deficiency impacts male hormone levels and what clinical trials show.
              </p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium &amp; Free Testosterone</p>
              <p className="mt-1 text-[13px] text-mute">
                Research on magnesium supplementation, sleep quality, and free androgen status.
              </p>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Nutrition &amp; Longevity Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                Macro and micronutrient strategies for healthspan, performance, and vital aging.
              </p>
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

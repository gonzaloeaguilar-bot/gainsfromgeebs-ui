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
const SLUG = "/science/caffeine-tolerance-and-fatigue";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Caffeine Tolerance and Afternoon Fatigue: Adenosine Receptor Science",
  description:
    "Daily caffeine intake upregulates central adenosine receptors, reducing alertness and driving afternoon fatigue. Science-backed evidence and reset protocols.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Caffeine Tolerance and Afternoon Fatigue: Adenosine Receptor Science",
    description:
      "Daily caffeine intake upregulates central adenosine receptors, reducing alertness and driving afternoon fatigue. Science-backed evidence and reset protocols.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Caffeine tolerance, adenosine receptors, and afternoon fatigue science review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caffeine Tolerance and Afternoon Fatigue: Adenosine Receptor Science",
    description:
      "How daily caffeine intake leads to adenosine receptor upregulation, rebound afternoon fatigue, and evidence-graded reset strategies.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  study: string;
  population: string;
  protocol: string;
  outcome: string;
  grade: string;
  pmid: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    study: "Beaumont et al. (2017)",
    population: "Healthy active adults (double-blind RCT)",
    protocol: "1.5–3.0 mg/kg daily caffeine over 28 days",
    outcome: "Tolerance to ergogenic endurance benefits developed progressive loss of acute effect",
    grade: "Grade A — Double-blind RCT",
    pmid: "27762662",
  },
  {
    study: "Ruiz-Moreno et al. (2020)",
    population: "Trained cyclists (controlled trial)",
    protocol: "3 mg/kg daily caffeine over 20 consecutive days",
    outcome: "Progressive attenuation of performance gains at ventilatory threshold over 20 days",
    grade: "Grade B — Controlled trial",
    pmid: "33321978",
  },
  {
    study: "Juliano & Griffiths (2004)",
    population: "Habitual caffeine consumers (systematic review)",
    protocol: "Caffeine withdrawal and wash-out monitoring",
    outcome: "Withdrawal peaks 24–48 hours; adenosine receptor sensitivity restores in 7–14 days",
    grade: "Grade A — Systematic review",
    pmid: "15448977",
  },
  {
    study: "Guest et al. (2018)",
    population: "Male endurance athletes (double-blind RCT)",
    protocol: "2–4 mg/kg caffeine evaluated by CYP1A2 genotype",
    outcome: "Fast metabolizers (AA) derive strong ergogenic gains; slow metabolizers exhibit delayed clearance",
    grade: "Grade A — Double-blind RCT",
    pmid: "29509641",
  },
];

const faqs = [
  {
    question: "Why does coffee stop giving you energy after daily use?",
    answer:
      "Daily caffeine intake upregulates adenosine receptors in the central nervous system. As receptor density increases, your baseline adenosine binding capacity expands, requiring larger caffeine doses simply to block the extra receptors and feel baseline alertness.",
  },
  {
    question: "How long does it take to reset caffeine sensitivity?",
    answer:
      "Systematic reviews of human withdrawal protocols indicate that central adenosine receptor binding and vascular sensitivity normalize within 7 to 14 days of caffeine reduction or cessation.",
  },
  {
    question: "Why do I experience severe afternoon fatigue after morning coffee?",
    answer:
      "As morning caffeine is cleared from blood plasma (half-life of 4 to 6 hours), accumulated adenosine rapidly binds to the upregulated receptors. This sudden receptor occupancy triggers a severe afternoon rebound fatigue crash.",
  },
  {
    question: "Is tapering caffeine better than stopping cold turkey?",
    answer:
      "Yes. Controlled clinical trials demonstrate that gradually tapering caffeine intake over 1 to 2 weeks significantly reduces withdrawal headaches, fatigue, and cognitive dips compared to abrupt cessation.",
  },
  {
    question: "Does caffeine tolerance reduce exercise performance benefits?",
    answer:
      "Double-blind randomized controlled trials show that daily caffeine consumption progressively dampens caffeine's acute performance-boosting effects on endurance and power output compared to non-habituated use.",
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
  headline: "Caffeine Tolerance and Afternoon Fatigue: Adenosine Receptor Science",
  description:
    "Daily caffeine intake upregulates central adenosine receptors, reducing alertness and driving afternoon fatigue. Science-backed evidence and reset protocols.",
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
      name: "Chronic ingestion of a low dose of caffeine induces tolerance to the performance benefits of caffeine",
      author: { "@type": "Person", name: "Beaumont R" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of Sports Sciences" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "27762662" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/27762662/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Time Course and Magnitude of Tolerance to the Ergogenic Effect of Caffeine on the Second Ventilatory Threshold",
      author: { "@type": "Person", name: "Ruiz-Moreno C" },
      datePublished: "2020",
      isPartOf: { "@type": "Periodical", name: "Frontiers in Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33321978" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/33321978/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A critical review of caffeine withdrawal: empirical validation of symptoms and signs, incidence, severity, and associated features",
      author: [{ "@type": "Person", name: "Juliano LM" }, { "@type": "Person", name: "Griffiths RR" }],
      datePublished: "2004",
      isPartOf: { "@type": "Periodical", name: "Psychopharmacology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "15448977" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/15448977/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Caffeine, CYP1A2 Genotype, and Endurance Performance in Athletes",
      author: { "@type": "Person", name: "Guest N" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "Medicine and Science in Sports and Exercise" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29509641" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/29509641/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Caffeine Tolerance" },
    { "@type": "Thing", name: "Adenosine Receptors" },
    { "@type": "Thing", name: "Afternoon Fatigue" },
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
      name: "Caffeine Tolerance & Fatigue",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default async function CaffeineToleranceSciencePage() {
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
            <li className="text-cloudText">Caffeine Tolerance &amp; Fatigue</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Neurobiology &amp; Performance Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Caffeine Tolerance and Afternoon Fatigue: Adenosine Receptor Science
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
            Chronic caffeine use upregulates adenosine receptors, reducing acute alertness and driving afternoon fatigue.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Regular caffeine consumption leads to central nervous system tolerance through the upregulation of adenosine receptors, reducing caffeine&apos;s acute alertness and performance-boosting effects. Over time, higher intake is required simply to prevent withdrawal symptoms like fatigue and brain fog, making periodic caffeine resets or strategic timing necessary to restore sensitivity.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-daily-use" className="mt-12">
          <h2
            id="h2-daily-use"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Why does coffee stop giving you energy after daily use?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Caffeine operates primarily as a competitive antagonist at central A1 and A2A adenosine receptors. When you consume caffeine, it binds to these receptors without activating them, blocking endogenous adenosine from signalling sleep pressure to the brain. In response to continuous blockade, the central nervous system upregulates receptor density—creating additional adenosine binding sites. Over days to weeks of daily use, standard doses no longer yield heightened alertness; instead, they become necessary just to return to baseline function.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Double-blind randomized controlled trials demonstrate that habituated caffeine consumers experience a progressive decline in ergogenic performance benefits. In a 28-day trial evaluating daily caffeine intake (Beaumont et al., 2017, PMID 27762662), participants developed clear tolerance to caffeine&apos;s acute endurance benefits within four weeks. Similarly, trials measuring respiratory thresholds (Ruiz-Moreno et al., 2020, PMID 33321978) confirmed that daily administration gradually attenuates acute performance gains.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Chronic caffeine consumption causes the brain to upregulate adenosine receptors, requiring higher doses to achieve the initial alert state while leaving normal daily caffeine intake mostly neutralizing withdrawal symptoms.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-afternoon-fatigue" className="mt-12">
          <h2
            id="h2-afternoon-fatigue"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How does caffeine tolerance cause afternoon fatigue?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The afternoon crash is a direct neurochemical outcome of caffeine clearance combined with upregulated receptor capacity. Caffeine has an average elimination half-life of 4 to 6 hours in healthy adults. During the morning hours when plasma caffeine concentrations are high, adenosine continues to accumulate in extracellular brain tissue.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            As caffeine is metabolized by the liver, it vacates the adenosine receptors. Because daily caffeine consumption increases total receptor density, the accumulated pool of adenosine suddenly binds across an expanded field of available receptors. Cognitive receptor trials (Rogers et al., 2010, PMID 20520601) demonstrate altered alerting responses in habituated users. Controlled cerebral blood flow research (Addicott et al., 2009, PMID 19219847) shows that this sudden wave of adenosine binding creates a sharp rebound in sleepiness, perceived physical effort, and mental fatigue by mid-afternoon.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Afternoon fatigue in regular caffeine users is intensified when caffeine clears from elevated adenosine receptors, leaving accumulated adenosine to bind all at once in a rebound sleep pressure surge.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-reset-sensitivity" className="mt-12">
          <h2
            id="h2-reset-sensitivity"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How long does it take to reset your caffeine sensitivity?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Reversing adenosine receptor upregulation requires a sustained reduction in central receptor blockade. Clinical wash-out studies demonstrate that adenosine receptor availability and neurovascular responses begin re-sensitizing within a few days of intake reduction, with full baseline restoration typically occurring over 7 to 14 days.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            A landmark systematic review of caffeine withdrawal protocols (Juliano &amp; Griffiths, 2004, PMID 15448977) found that acute withdrawal symptoms—such as lethargy, headache, and decreased alertness—peak between 24 and 48 hours following cessation. As the brain downregulates excess adenosine receptors back to normal physiological levels over the second week, subjective energy stabilizes, sleep quality improves, and caffeine&apos;s acute ergogenic sensitivity is restored (Pickering et al., 2019, PMID 30173351).
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Adenosine receptor density begins normalizing within 7 to 14 days of caffeine reduction or cessation, restoring baseline sensitivity and clearing withdrawal-induced brain fog.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-taper-without-headaches" className="mt-12">
          <h2
            id="h2-taper-without-headaches"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What is the best way to taper caffeine without withdrawal headaches?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Abruptly stopping caffeine triggers acute cerebral vasodilation, which is the primary driver of caffeine withdrawal headaches. Because caffeine causes mild vasoconstriction in cerebral blood vessels, sudden removal leads to a rapid surge in cerebral blood flow velocity, accompanied by systemic muscle fatigue and mood disturbances.
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            To avoid severe withdrawal symptoms while restoring receptor sensitivity, clinical protocols recommend a progressive step-down taper over 10 to 14 days rather than abrupt cold-turkey cessation. Reducing daily intake by roughly 25% to 50% every few days allows vascular tone and adenosine receptor populations to adapt smoothly. Furthermore, individual clearance rates vary significantly based on hepatic CYP1A2 gene expression (Guest et al., 2018, PMID 29509641), meaning slow metabolizers may benefit from an extended taper window.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Gradually tapering daily caffeine intake over 1 to 2 weeks minimizes withdrawal headaches, fatigue, and performance dips compared to abrupt cold-turkey cessation.
          </blockquote>

          {/* Clinical Evidence Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Study</th>
                  <th className="p-3 font-semibold md:p-4">Population &amp; Protocol</th>
                  <th className="p-3 font-semibold md:p-4">Reported Outcome</th>
                  <th className="p-3 font-semibold md:p-4">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.pmid} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">
                      {row.study}
                      <span className="mt-1 block text-[12px] text-mute">
                        PMID:{" "}
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
                    <td className="p-3 md:p-4">
                      <div>{row.population}</div>
                      <div className="mt-1 text-[12.5px] text-mute">{row.protocol}</div>
                    </td>
                    <td className="p-3 md:p-4">{row.outcome}</td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Genetic variations in CYP1A2 enzyme activity dictate caffeine clearance rates, creating wide differences in tolerance development speed between fast and slow metabolizers. Separating caffeine withdrawal fatigue from underlying chronic sleep debt requires strict sleep-laboratory controls. Subjective fatigue measures in free-living conditions can be influenced by diet, stress, and circadian rhythm alignment.
          </p>
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
            Verified PubMed &amp; Peer-Reviewed Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Beaumont R, Cordery P, Funnell M, Merson S, James LJ, Watson P. (2017)
              </p>
              <p className="text-[13px] text-mute">
                Chronic ingestion of a low dose of caffeine induces tolerance to the performance benefits of caffeine. <em>J Sports Sci</em> 35(19): 1920-1927.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/27762662/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 27762662
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Ruiz-Moreno C, Lara B, Salinero JJ, et al. (2020)
              </p>
              <p className="text-[13px] text-mute">
                Time Course and Magnitude of Tolerance to the Ergogenic Effect of Caffeine on the Second Ventilatory Threshold. <em>Front Nutr</em> 7: 610013.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/33321978/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 33321978
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Juliano LM, Griffiths RR. (2004)
              </p>
              <p className="text-[13px] text-mute">
                A critical review of caffeine withdrawal: empirical validation of symptoms and signs, incidence, severity, and associated features. <em>Psychopharmacology (Berl)</em> 176(1): 1-29.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/15448977/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 15448977
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Guest N, Corey P, Vescovi J, El-Sohemy A. (2018)
              </p>
              <p className="text-[13px] text-mute">
                Caffeine, CYP1A2 Genotype, and Endurance Performance in Athletes. <em>Med Sci Sports Exerc</em> 50(8): 1570-1578.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/29509641/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 29509641
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
            Related Nutrition &amp; Performance Science
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/caffeine-performance"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Caffeine &amp; Exercise Performance</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence guide on pre-workout dosing, timing bounds, and endurance gains.
              </p>
            </Link>
            <Link
              href="/nutrition/l-theanine-focus"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">L-Theanine &amp; Caffeine for Focus</p>
              <p className="mt-1 text-[13px] text-mute">
                Cognitive trial evidence, studied ratios, and jitter mitigation limits.
              </p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium Science for Recovery</p>
              <p className="mt-1 text-[13px] text-mute">
                Dosage guidelines, sleep onset trial data, and mineral adequacy.
              </p>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Longevity &amp; Performance Nutrition</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary frameworks for energy, healthspan, and body composition.
              </p>
            </Link>
            <Link
              href="/guides/best-breakfasts-for-testosterone-ranked"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Best Breakfasts for Testosterone Ranked</p>
              <p className="mt-1 text-[13px] text-mute">
                Morning macronutrient strategies for sustained energy and hormonal health.
              </p>
            </Link>
          </div>
        </section>

        {/* Footer Medical Disclaimer */}
        <footer className="mt-14 border-t border-cloudText/20 pt-6 text-[13px] leading-[1.6] text-mute">
          <p>
            This content is produced by Kris Oddo (NASM-CPT) for informational and educational purposes only. It is not intended to provide medical advice or to substitute for medical diagnosis or treatment. Consult a licensed physician before altering your caffeine intake, dietary supplements, or health routine.
          </p>
        </footer>
        <TitanProductInline
          context={productContextForPath("/science/caffeine-tolerance-and-fatigue")}
          source="geebs_science_caffeine_tolerance_and_fatigue"
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

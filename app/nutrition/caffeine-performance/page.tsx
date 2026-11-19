import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/caffeine-performance";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Caffeine and Athletic Performance: Dose, Timing, Limits | Geebs",
  description:
    "How caffeine affects endurance and strength, why adenosine matters, and how to choose a pre-workout dose without assuming more is better.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Caffeine and Athletic Performance: What the Research Supports",
    description:
      "A practical, evidence-graded guide to caffeine dose, timing, endurance, strength, and the limits that matter.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Caffeine and athletic performance research guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caffeine and Athletic Performance: What the Research Supports",
    description:
      "The useful dose range, common timing, likely mechanism, and honest limits.",
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
      name: "Does caffeine improve athletic performance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often, but not for everyone. A 2021 position stand found that caffeine can produce small to moderate improvements across endurance, muscular endurance, movement speed, strength, sprinting, jumping, and throwing. Endurance has the most consistent support, while the size of the benefit and the side effects vary between people.",
      },
    },
    {
      "@type": "Question",
      name: "How much caffeine should I take before exercise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best-supported range is 3–6 mg per kg of bodyweight, commonly taken about 60 minutes before exercise. The same review says lower doses may work, but the minimum effective dose is still unclear. Start near the bottom of the range because more caffeine is not automatically more useful.",
      },
    },
    {
      "@type": "Question",
      name: "How does caffeine work during exercise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caffeine acts mainly by blocking adenosine receptors in the central nervous system. Adenosine normally contributes to sleep pressure and reduced alertness, so blocking its signal can increase stimulation and help sustain effort. That is a mechanism, not proof that every athlete or every type of workout will improve.",
      },
    },
    {
      "@type": "Question",
      name: "Is a higher caffeine dose better for performance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The 2021 position stand reports that very high doses, such as 9 mg per kg, bring a high rate of side effects and do not appear necessary for a performance benefit. The goal is the lowest dose that helps your session without creating unwanted side effects or a worse night of sleep.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Caffeine and Athletic Performance: What the Research Supports",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Caffeine and Athletic Performance: What the Research Supports",
  description:
    "An evidence-graded guide to caffeine's effects on endurance and strength, its likely mechanism, practical dosing, and individual limits.",
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
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    citation: [
    {
      "@type": "ScholarlyArticle",
      name: "International society of sports nutrition position stand: caffeine and exercise performance",
      author: { "@type": "Person", name: "Guest NS" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33388079" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12970-020-00383-4",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/33388079/",
        "https://doi.org/10.1186/s12970-020-00383-4",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Caffeine: cognitive and physical performance enhancer or psychoactive drug?",
      author: { "@type": "Person", name: "Cappelletti S" },
      datePublished: "2015",
      isPartOf: { "@type": "Periodical", name: "Current Neuropharmacology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "26074744" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.2174/1570159X13666141210215655",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/26074744/",
        "https://doi.org/10.2174/1570159X13666141210215655",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Caffeine" },
    { "@type": "Thing", name: "Athletic performance" },
    { "@type": "Thing", name: "Adenosine receptors" },
  ],
};

type EvidenceRow = {
  question: string;
  practicalAnswer: string;
  evidence: string;
  grade: "B" | "D";
  gradeLabel: "Moderate" | "Weak";
  source: "Guest et al., 2021" | "Cappelletti et al., 2015";
  pmid: "33388079" | "26074744";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Endurance performance",
    practicalAnswer: "The most consistently supported use.",
    evidence: "Broad review of controlled exercise research",
    grade: "B",
    gradeLabel: "Moderate",
    source: "Guest et al., 2021",
    pmid: "33388079",
  },
  {
    question: "Strength and muscular endurance",
    practicalAnswer: "Small to moderate benefits are possible.",
    evidence: "Benefits appear in many, but not all, studies",
    grade: "B",
    gradeLabel: "Moderate",
    source: "Guest et al., 2021",
    pmid: "33388079",
  },
  {
    question: "3–6 mg/kg before exercise",
    practicalAnswer: "The best-supported performance range.",
    evidence: "Commonly effective across the reviewed research",
    grade: "B",
    gradeLabel: "Moderate",
    source: "Guest et al., 2021",
    pmid: "33388079",
  },
  {
    question: "Adenosine receptor blockade",
    practicalAnswer: "A credible explanation for central stimulation.",
    evidence: "Mechanistic review, not an outcome trial",
    grade: "D",
    gradeLabel: "Weak",
    source: "Cappelletti et al., 2015",
    pmid: "26074744",
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

export default function CaffeinePerformancePage() {
  return (
    <>
      <JsonLd id="caffeine-performance-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="caffeine-performance-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Caffeine and athletic performance: what the research supports
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Caffeine can help a hard session, but the useful question is not
            whether it works in general. It is whether the dose improves your
            output without costing you sleep, focus, or recovery later.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Caffeine can improve athletic performance, with the most consistent
            support for endurance and smaller possible benefits for strength and
            muscular endurance. It works mainly by blocking adenosine receptors
            in the central nervous system, increasing stimulation and making it
            easier to sustain effort.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            The best-supported range is 3–6 mg per kg of bodyweight, commonly
            taken about 60 minutes before exercise. That is a research range,
            not a target you need to max out. The useful dose is the lowest one
            that helps without making the rest of your day worse.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="caffeine performance" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What does the evidence say about caffeine athletic performance?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The clearest result is not that caffeine improves every workout. It
            is that endurance responds most consistently, while strength,
            muscular endurance, speed, and power can improve by smaller amounts.
            The 2021 position stand also stresses that people respond
            differently, so your own training quality and side effects still
            matter.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Practical answer</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Grade</th>
                  <th className="py-3 align-bottom font-normal">Source</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Practical answer" className="py-3 pr-4 text-mute">{row.practicalAnswer}</td>
                    <td data-label="Evidence" className="py-3 pr-4 text-mute">{row.evidence}</td>
                    <td data-label="Grade" className="py-3 pr-4 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                    <td data-label="Source" className="py-3 whitespace-nowrap">
                      <PubMedLink pmid={row.pmid}>{row.source}</PubMedLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            Grades reflect study design. The performance source reviews a broad
            body of exercise research, while the adenosine row is a mechanism
            rather than a direct performance test. Read how the grades work in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How does caffeine improve athletic performance?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Caffeine blocks adenosine receptors in the central nervous system.
            Adenosine normally contributes to sleep pressure and reduced
            alertness, so blocking that signal increases stimulation and can
            help you sustain effort. Cappelletti and colleagues review this
            mechanism alongside caffeine&apos;s cognitive and physical effects (
            <PubMedLink pmid="26074744">PMID 26074744</PubMedLink>).
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> a credible mechanism explains why an effect
            could happen; it does not prove that every performance change comes
            from that pathway. The review is also not a new exercise trial, so
            the mechanism earns a D — Weak grade on its own.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How much caffeine should you take before training?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The best-supported range is 3–6 mg per kg of bodyweight, with about
            60 minutes before exercise being the most common timing. Guest and
            colleagues note that doses as low as 2 mg/kg may work, but the
            minimum effective dose remains unclear (
            <PubMedLink pmid="33388079">PMID 33388079</PubMedLink>).
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            Start near the bottom of the range and judge the whole day, not just
            the workout. A better session is a poor trade if a late dose breaks
            your sleep. For the rest of the meal and training setup, see{" "}
            <Link
              href="/blog/pre-post-workout-nutrition-men"
              className="underline hover:text-bone"
            >
              pre- and post-workout nutrition for men
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does caffeine help endurance more than strength?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Yes, based on the consistency of the reviewed evidence. Aerobic
            endurance shows the most dependable benefit, while muscular
            strength and muscular endurance can improve by smaller amounts.
            That makes caffeine a useful option for long sessions and demanding
            conditioning, but still a possible aid rather than a guaranteed
            result.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the position stand says benefits appear in many
            but not all studies. Training status, habitual intake, genetics, and
            side effects can change the response, and the review does not give
            you a personal result in advance. For an evidence breakdown of how daily
            use leads to adenosine receptor upregulation and rebound tiredness, see{" "}
            <Link
              href="/science/caffeine-tolerance-and-fatigue"
              className="underline hover:text-bone"
            >
              caffeine tolerance and afternoon fatigue
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Is more caffeine better for performance?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            No. The position stand reports that very high doses, including 9
            mg/kg, bring a high rate of side effects and do not appear necessary
            for a performance benefit. Treat 3–6 mg/kg as a studied range, not a
            challenge, and use less when less produces a good session.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            Sleep disruption and anxiety are part of the performance decision,
            not separate concerns. If caffeine helps one workout but damages
            recovery for the next one, the weekly trade is negative.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] leading-[1.5] text-bone md:text-[17px]">
                  {entry.name}
                </dt>
                <dd className="mt-2 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Use caffeine as a tool, not the plan
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Caffeine can sharpen a session. It cannot replace a program you can
            repeat, enough food to recover, or sleep you protect. Coaching is
            where those pieces get built around your actual workweek instead of
            one perfect day on paper.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science/caffeine-and-growth-hormone" className="btn btn-secondary">
              Caffeine &amp; Growth Hormone
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science/questions" className="btn btn-secondary">
              Read what the research says
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only — not medical advice, and not a diagnosis or treatment
            for any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

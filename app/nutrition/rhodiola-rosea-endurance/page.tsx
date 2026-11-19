import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/rhodiola-rosea-endurance";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Rhodiola Rosea for Endurance: What the Evidence Shows | Geebs",
  description:
    "Rhodiola rosea may modestly improve endurance, but the research does not prove that it lowers perceived effort. See the evidence, doses, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Rhodiola Rosea and Endurance: What the Evidence Actually Shows",
    description:
      "A practical, evidence-graded look at endurance results, proposed stress effects, study doses, and what the research still cannot tell us.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Rhodiola rosea and endurance evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhodiola Rosea and Endurance: What the Evidence Shows",
    description:
      "The endurance findings look promising. The stress-response and perceived-effort claims are less settled.",
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
      name: "Does Rhodiola rosea improve endurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Possibly, by a modest amount. A 2025 meta-analysis of 26 randomized trials involving 668 healthy participants found average improvements in VO2 max, time to exhaustion, and time-trial performance. The studies varied in dose, duration, and participant training status, so the result is encouraging rather than a guarantee for any one person.",
      },
    },
    {
      "@type": "Question",
      name: "Does Rhodiola make exercise feel easier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified endurance meta-analysis does not establish that. It found better performance outcomes, but did not report a pooled result for perceived exertion. Lasting longer and feeling that the same pace is easier are different claims, and the current evidence on this page supports only the first one.",
      },
    },
    {
      "@type": "Question",
      name: "How much Rhodiola was used in endurance studies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Doses and schedules varied across the 26 trials. A subgroup taking more than 600 mg per day showed larger average VO2 max improvements, but that comparison was not a direct dose-finding trial. It should not be read as proof that more is better or as a personal dose recommendation.",
      },
    },
    {
      "@type": "Question",
      name: "Is Rhodiola an adaptogen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rhodiola rosea is commonly classified as a plant adaptogen. A broad 2021 review describes adaptogens as substances studied for helping the body remain stable under physical stress. That label explains the research interest; it does not prove a specific stress-response mechanism caused the endurance results.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Rhodiola Rosea for Endurance: What the Evidence Actually Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rhodiola Rosea for Endurance: What the Evidence Actually Shows",
  description:
    "An evidence-graded look at Rhodiola rosea, endurance performance, proposed adaptogen effects, study doses, and the limits of the current research.",
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
      name: "The effect of Rhodiola rosea supplementation on endurance performance and related biomarkers: a systematic review and meta-analysis",
      author: { "@type": "Person", name: "Wang X" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Frontiers in Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "41080184" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3389/fnut.2025.1645346",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/41080184/",
        "https://doi.org/10.3389/fnut.2025.1645346",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Plant Adaptogens-History and Future Perspectives",
      author: { "@type": "Person", name: "Todorova V" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34445021" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu13082861",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/34445021/",
        "https://doi.org/10.3390/nu13082861",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Rhodiola rosea" },
    { "@type": "Thing", name: "Endurance exercise" },
    { "@type": "Thing", name: "Adaptogens" },
  ],
};

type EvidenceRow = {
  claim: string;
  population: string;
  doseAndDuration: string;
  verdict: string;
  grade: "B" | "D";
  gradeLabel: "Moderate" | "Weak";
  source: {
    label: string;
    pmid: "41080184" | "34445021";
  };
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Rhodiola improves endurance performance",
    population: "668 healthy participants across 26 randomized trials; mean age 22",
    doseAndDuration: "Varied doses; mean study duration 33 days",
    verdict:
      "Modest average improvements in VO2 max, time to exhaustion, and time-trial performance.",
    grade: "B",
    gradeLabel: "Moderate",
    source: { label: "Wang et al., 2025", pmid: "41080184" },
  },
  {
    claim: "More than 600 mg per day works better",
    population: "Subgroup within the same 26-trial review",
    doseAndDuration: "More than 600 mg per day; schedules varied",
    verdict:
      "A larger VO2 max change appeared in this subgroup, but it was not a direct dose-comparison trial.",
    grade: "B",
    gradeLabel: "Moderate",
    source: { label: "Wang et al., 2025", pmid: "41080184" },
  },
  {
    claim: "Lower perceived exertion during exercise",
    population: "No pooled perceived-exertion result in the verified endurance review",
    doseAndDuration: "Not established",
    verdict:
      "Not proven by these sources. Better performance does not automatically mean exercise felt easier.",
    grade: "D",
    gradeLabel: "Weak",
    source: { label: "Wang et al., 2025", pmid: "41080184" },
  },
  {
    claim: "Stress-response changes explain the endurance result",
    population: "Broad adaptogen literature, not a direct mechanism trial during exercise",
    doseAndDuration: "Not established",
    verdict:
      "Plausible framing, not a demonstrated cause of the endurance improvements.",
    grade: "D",
    gradeLabel: "Weak",
    source: { label: "Todorova et al., 2021", pmid: "34445021" },
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

export default function RhodiolaRoseaEndurancePage() {
  return (
    <>
      <JsonLd id="rhodiola-endurance-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="rhodiola-endurance-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Rhodiola rosea for endurance: what the evidence actually shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Rhodiola is usually sold as an adaptogen that helps you handle stress
            and delay fatigue. The performance evidence is promising, but that
            explanation runs ahead of what the trials have actually proved.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            <b>Rhodiola rosea may modestly improve endurance performance.</b> The
            best verified source here combines 26 randomized trials and reports
            better average results for VO2 max, time to exhaustion, and
            time-trial performance.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It does <b>not</b> show that Rhodiola makes hard work feel easier, and
            it does not prove that changing the stress response caused the
            performance gains. Think of it as a potentially useful extra after
            training, sleep, and fueling are handled — not as a substitute for
            them.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What does the evidence say about Rhodiola rosea and endurance?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The strongest verified evidence is a 2025 review of 26 randomized
            trials involving 668 healthy participants. It found modest average
            improvements in VO2 max, time to exhaustion, and time-trial
            performance. That earns a B — moderate — because it is one
            meta-analysis, not a settled body of repeated reviews.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            The participants were young on average — age 22 — and the mean study
            duration was 33 days. That makes the finding relevant to exercise,
            but less direct for a 40-year-old professional trying to improve a
            long training block.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="rhodiola rosea endurance" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which Rhodiola endurance claims hold up?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Performance outcomes have moderate support. The popular explanation
            — that Rhodiola controls the stress response, lowers effort, and
            therefore delays fatigue — is not one proven chain. The table keeps
            the participant group, dose context, verdict, grade, and verified
            source together so the claim cannot outrun the study.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">People and dose</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="People and dose" className="py-3 pr-4 text-mute">
                      {row.population}. {row.doseAndDuration}.
                    </td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">
                      {row.verdict}{" "}
                      <PubMedLink pmid={row.source.pmid}>{row.source.label}</PubMedLink>
                    </td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            The grading rules and study-selection process are explained in the{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does Rhodiola reduce perceived exertion or delay fatigue?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The review supports a longer time to exhaustion on average, which is
            a fair way to describe delayed performance fatigue. It does not
            provide a pooled result showing lower perceived exertion. Lasting
            longer and feeling that the same pace is easier are separate claims;
            only the first is supported here.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the common claim is stronger than the verified
            source. An unreported outcome is not a finding. If future randomized
            trials directly measure perceived effort, that claim can be graded
            on its own evidence.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How might Rhodiola work as an adaptogen?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Rhodiola rosea is commonly grouped with plant adaptogens — substances
            studied for helping the body stay stable under physical stress. A
            broad review by Todorova and colleagues explains that category and
            its history. It does not prove that one specific stress pathway
            produced the endurance improvements in the newer trials.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> mechanism is the weakest part of the story.
            The 2025 endurance review found changes in several exercise-related
            markers, but a collection of marker changes does not establish one
            clean cause-and-effect pathway.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How much Rhodiola did the endurance studies use?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Doses and schedules varied across the 26 trials. A subgroup using
            more than 600 mg per day showed a larger average VO2 max change, but
            that was not a trial designed to compare doses head to head. It is a
            clue for future research, not proof that more works better.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the review itself reports meaningful
            differences between studies. Extracts, training status, dose, and
            timing were not uniform, so this evidence does not produce a clean
            personal protocol.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Is Rhodiola worth adding to an endurance plan?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It can be a reasonable experiment after the basics are consistent.
            The evidence suggests a modest possible benefit, not a dramatic one.
            If sleep, training progression, carbohydrate intake, or recovery is
            unreliable, those remain the bigger levers and make it difficult to
            tell whether a supplement changed anything.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            For the training and food basics around longer sessions, read{" "}
            <Link
              href="/blog/pre-post-workout-nutrition-men"
              className="underline hover:text-bone"
            >
              pre- and post-workout nutrition for men
            </Link>
            .
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
            Build the engine before adding the extra
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            A supplement can only add to a plan that already works. If you want
            help turning training, food, sleep, and recovery into one system that
            fits a demanding week, that is what 1:1 coaching is built to do.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
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

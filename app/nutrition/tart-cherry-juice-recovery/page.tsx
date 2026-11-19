import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/tart-cherry-juice-recovery";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Tart Cherry Juice for Recovery: What Holds Up | Geebs",
  description:
    "Tart cherry juice recovery research explained with an evidence grade, verified PubMed source, studied timing, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Tart Cherry Juice for Recovery: What the Research Shows",
    description:
      "Tart cherry juice may help soreness, strength recovery, and exercise-related stress markers, but the evidence and timing need context.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Tart cherry juice and muscle recovery — what the research shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tart Cherry Juice for Recovery: What Holds Up",
    description:
      "The promising recovery finding, the commonly studied timing, and why daily use is not automatically better.",
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
      name: "Does tart cherry juice help muscle recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may help after unusually hard training or competition. A 2017 literature review reported less soreness, faster strength recovery, and lower inflammation and oxidative-stress markers across strength and endurance research. The source is a narrative review, not a meta-analysis, so the evidence is promising rather than settled.",
      },
    },
    {
      "@type": "Question",
      name: "When should I drink tart cherry juice for recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2017 review says most studies used 8 to 12 ounces of juice, or 1 ounce of concentrate, twice daily. The common schedule started four to five days before the event and continued for two to three days afterward. That describes the research; it is not one proven dose for every product or person.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use tart cherry juice every day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically. The review suggests tart cherry juice may fit best when short-term recovery is the priority and warns that it may not be ideal during the adaptation-building stage of training. That concern is not a precise rule, but it is a reason to use it for a defined purpose instead of by default all year.",
      },
    },
    {
      "@type": "Question",
      name: "Are anthocyanins the reason tart cherry juice may help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified review describes tart cherry juice as rich in antioxidant and anti-inflammatory polyphenols, but it does not isolate anthocyanins as the proven cause of the recovery findings. Whole juice contains multiple compounds, so the available source cannot tell us that one compound produced the result.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Tart Cherry Juice for Recovery: What the Research Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tart Cherry Juice for Recovery: What the Research Shows",
  description:
    "An evidence-graded look at tart cherry juice for soreness, strength recovery, and exercise-related oxidative stress, with studied timing and clear limits.",
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
      name: "Tart Cherry Juice in Athletes: A Literature Review and Commentary",
      author: { "@type": "Person", name: "Vitale KC" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Current Sports Medicine Reports" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28696985" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1249/JSR.0000000000000385",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28696985/",
        "https://doi.org/10.1249/JSR.0000000000000385",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Tart cherry juice" },
    { "@type": "Thing", name: "Muscle recovery" },
    { "@type": "Thing", name: "Oxidative stress" },
  ],
};

type EvidenceRow = {
  claim: string;
  verdict: string;
  populationAndProtocol: string;
  source: string;
  grade: "C";
  gradeLabel: "Early";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Tart cherry juice can support soreness and strength recovery",
    verdict: "Promising across the strength and endurance research summarized.",
    populationAndProtocol: "Athletes in studies covered by a narrative review",
    source: "Vitale et al., 2017 — PMID 28696985",
    grade: "C",
    gradeLabel: "Early",
  },
  {
    claim: "Tart cherry juice can lower exercise-related stress markers",
    verdict: "Promising for inflammation and oxidative-stress blood markers.",
    populationAndProtocol: "Strength and endurance exercise studies in the review",
    source: "Vitale et al., 2017 — PMID 28696985",
    grade: "C",
    gradeLabel: "Early",
  },
  {
    claim: "A short loading period is the commonly studied approach",
    verdict: "Common research pattern, not one proven prescription.",
    populationAndProtocol:
      "8–12 oz juice or 1 oz concentrate twice daily; 4–5 days before and 2–3 days after",
    source: "Vitale et al., 2017 — PMID 28696985",
    grade: "C",
    gradeLabel: "Early",
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

export default function TartCherryJuiceRecoveryPage() {
  return (
    <>
      <JsonLd id="tart-cherry-recovery-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="tart-cherry-recovery-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Tart cherry juice for recovery: what the research shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Tart cherry juice has a reasonable short-term use case after unusually
            hard training or competition. The recovery findings are promising,
            but the verified source is a narrative review, so the claim needs
            tighter limits than most supplement labels give it.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Tart cherry juice recovery research suggests it may reduce soreness,
            help strength return sooner, and lower some blood markers of
            inflammation and oxidative stress after demanding exercise. The best
            fit is a short recovery window when returning to performance matters
            more than squeezing out every training adaptation.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The evidence is early, not conclusive. The verified 2017 source is a
            literature review and commentary rather than a systematic review or
            meta-analysis, and its abstract does not provide one standardized
            product or protocol that works for everyone.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the review describes tart cherry juice as a
            polyphenol-rich food, but it does not prove that anthocyanins alone
            caused the results. It also warns that heavy antioxidant support may
            not be ideal during the stage of training where adaptation is the
            priority.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="tart cherry juice recovery" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which tart cherry juice recovery claims hold up?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The verified review supports a narrow, promising recovery case: less
            soreness, faster strength recovery, and lower exercise-related stress
            markers. It does not support a guaranteed result or year-round use.
            Each row stays at C because the source is a narrative review, not the
            kind of pooled analysis required for a stronger grade.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">
                    Population and protocol
                  </th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Population and protocol" className="py-3 pr-4">{row.populationAndProtocol}</td>
                    <td data-label="Source" className="py-3 pr-4">{row.source}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] text-mute2">
            Grades reflect study design. Read how sources are selected in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does tart cherry juice help muscle recovery?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It may help after unusually hard training or competition. The verified
            <PubMedLink pmid="28696985"> Vitale et al., 2017 review</PubMedLink> in
            Current Sports Medicine Reports reports less soreness and faster
            strength recovery across strength and endurance research. That makes
            tart cherry juice an optional recovery tool, not a replacement for
            sleep, food, or sensible programming.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> this is a narrative review and commentary. It
            does not pool the studies statistically, and the PubMed abstract does
            not list the size of each trial. That is why the recovery claim stays
            at C — Early rather than being presented as settled.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How might tart cherry juice affect oxidative stress?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The review reports lower blood markers of inflammation and oxidative
            stress after exercise. That is consistent with tart cherry juice
            supplying antioxidant and anti-inflammatory polyphenols, but a marker
            change does not guarantee that you will feel less sore or perform
            better in the next session.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the verified source does not isolate
            anthocyanins from the rest of the juice, so it cannot establish one
            compound as the cause. It also does not show that pushing oxidative
            stress as low as possible is a useful goal during normal training.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What dose and timing did athletes use?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Most studies in the review used 8 to 12 ounces of juice, or 1 ounce
            of concentrate, twice daily. The common schedule started four to five
            days before the event and continued for two to three days afterward,
            which makes this a short planned block rather than an everyday rule.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> timing and dose varied across the research. The
            review reports what was commonly studied; it does not prove that the
            same volume, concentrate strength, or schedule is right for every
            product and every athlete.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Should you drink tart cherry juice all year?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Not by default. The review frames tart cherry juice as most useful
            when recovery and a quick return to performance are the priorities,
            such as a competition or a multi-day event. It also says the drink
            may not be ideal during the adaptation-building stage of training.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            That is not proof that daily use blocks progress. It is a reason to
            define the job before adding the product: use it around an unusually
            demanding recovery window, then reassess instead of assuming more is
            always better.
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
            Use recovery tools for a defined job
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Tart cherry juice may be useful when several hard sessions or an
            event make short-term recovery the priority. It still sits behind the
            basics: enough sleep, enough food, and training that fits the rest of
            your week. Coaching is where those pieces become a plan you can
            repeat.
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

import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/psyllium-husk-fiber";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Psyllium Husk Fiber: What a Verified Trial Shows | Geebs",
  description:
    "Psyllium husk fiber may help with hard stool, but the verified trial has important limits. See the evidence grade and what it does not prove.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Psyllium Husk Fiber: What a Verified Trial Actually Shows",
    description:
      "A practical, evidence-graded look at psyllium-containing fiber formulas and regularity, including what the study did not establish.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Psyllium husk fiber evidence explained",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psyllium Husk Fiber: What a Verified Trial Actually Shows",
    description:
      "The hard-stool signal, the limits of a multi-ingredient trial, and the claims this evidence cannot support.",
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
      name: "Is psyllium proven to increase bowel movement frequency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not by the trial reviewed here. The four-week study found no time-by-group effect for bowel movement frequency. It did find a hard-stool signal across the active formulas, but those formulas combined fibers or probiotics with other ingredients, so the result does not isolate psyllium by itself.",
      },
    },
    {
      "@type": "Question",
      name: "Was the constipation trial a psyllium-only study?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Psyllium appeared in two active formulas, and oligosaccharides were included in every active group. One formula also combined wheat bran with psyllium. That makes the trial useful as an early signal for psyllium-containing formulas, but not as proof that psyllium alone caused the result.",
      },
    },
    {
      "@type": "Question",
      name: "Does this evidence show that psyllium lowers cholesterol or blood sugar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The verified trial measured constipation symptoms and gut bacteria, not blood lipids or blood sugar. Those outcomes need their own correctly matched evidence, so this page does not use the constipation study to make either claim.",
      },
    },
    {
      "@type": "Question",
      name: "Is this page medical advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This page explains one study for educational purposes. It does not diagnose or treat constipation or any other condition. Talk with a qualified clinician if symptoms persist, worsen, or affect your daily life.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Psyllium Husk Fiber: What a Verified Trial Actually Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Psyllium Husk Fiber: What a Verified Trial Actually Shows",
  description:
    "An evidence-graded look at psyllium-containing fiber formulas and constipation symptoms, with the study's limits stated plainly.",
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
      name: "Effects of dietary fibers or probiotics on functional constipation symptoms and roles of gut microbiota: a double-blinded randomized placebo trial",
      author: { "@type": "Person", name: "Lai H" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Gut Microbes" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "37078654" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1080/19490976.2023.2197837",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/37078654/",
        "https://doi.org/10.1080/19490976.2023.2197837",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Psyllium husk fiber" },
    { "@type": "Thing", name: "Dietary fiber" },
    { "@type": "Thing", name: "Bowel regularity" },
  ],
};

type EvidenceRow = {
  claim: string;
  population: string;
  protocol: string;
  finding: string;
  source: string;
  grade: "C";
  gradeLabel: "Early";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim:
      "Psyllium-containing fiber formulas may help relieve hard stool in adults with functional constipation",
    population: "250 adults randomized; 242 completed",
    protocol: "Four weeks; psyllium appeared in two multi-ingredient arms",
    finding:
      "Hard-stool signal, but no time-by-group effect for frequency, stool score, or straining",
    source: "Lai et al., 2023",
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

export default function PsylliumHuskFiberPage() {
  return (
    <>
      <JsonLd id="psyllium-husk-fiber-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="psyllium-husk-fiber-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Psyllium husk fiber: what a verified trial actually shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Psyllium gets discussed as if every benefit is equally settled. This
            page keeps the useful signal, drops what the study cannot support,
            and shows exactly where the remaining trial is strong or limited.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Psyllium husk fiber may support easier stool passage, but the verified
            trial behind this page does not prove that psyllium alone improves
            bowel movement frequency. In 250 adults with functional constipation,
            four weeks of multi-ingredient formulas containing psyllium showed a
            hard-stool signal, while the main group-by-time comparisons for
            frequency, stool score, and straining were not different.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="psyllium husk fiber" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How strong is the evidence for psyllium husk fiber and regularity?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It is early evidence, graded C. The study was randomized and
            placebo-controlled, which is useful, but it lasted four weeks and did
            not test psyllium alone. The fairest conclusion is that
            psyllium-containing formulas may help with hard stool, not that
            psyllium reliably changes every measure of bowel function.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Protocol</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Protocol" className="py-3 pr-4 text-mute">{row.protocol}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Source" className="py-3 pr-4 whitespace-nowrap">
                      <PubMedLink pmid="37078654">{row.source}</PubMedLink>
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
            Grades come from study design. A single randomized trial is grade C,
            even when the result sounds promising. See how the site handles
            evidence in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> psyllium appeared in two multi-ingredient arms,
            and every active formula also included oligosaccharides. The trial
            therefore cannot tell us how much of the hard-stool signal came from
            psyllium itself.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does psyllium husk fiber help with constipation?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Maybe, especially for hard stool, but the verified result is narrower
            than a blanket yes. The active formulas improved stool consistency
            over four weeks, while the main comparisons for bowel movement
            frequency, stool score, and straining did not separate from placebo
            over time. That is a useful signal, not a guarantee.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What did the psyllium trial actually test?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Researchers randomized 250 adults with functional constipation to
            five groups for four weeks; 242 completed the study. Psyllium was one
            ingredient in two active formulas, one paired with wheat bran, and
            oligosaccharides appeared across the active groups. That design tests
            formulas, not a clean psyllium-only intervention.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            The source is Lai et al. in <i>Gut Microbes</i> (2023), DOI{" "}
            <a
              href="https://doi.org/10.1080/19490976.2023.2197837"
              className="underline hover:text-bone"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              10.1080/19490976.2023.2197837
            </a>{" "}
            and <PubMedLink pmid="37078654">PMID 37078654</PubMedLink>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does psyllium husk fiber lower cholesterol?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Not based on the study reviewed here. The verified trial measured
            constipation symptoms and gut bacteria, not blood lipids. So this
            page does not claim psyllium lowers cholesterol. That question needs
            its own correctly matched evidence rather than borrowing a result
            from a study that did not measure it.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does psyllium husk fiber control blood sugar?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            This trial cannot answer that question. It did not measure fasting
            glucose, post-meal glucose, or longer-term blood sugar control.
            Because the evidence verified for this page is about constipation,
            the practical conclusion stops there. A blood-sugar claim would need
            a separate, correctly matched human study.
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
            Keep the conclusion as narrow as the evidence
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The verified study gives you one reasonable takeaway:
            psyllium-containing formulas may help with hard stool. It does not
            prove a psyllium-only dose, a cholesterol result, or better blood
            sugar control. If you want more evidence explained this way, the
            research library keeps the source attached to the claim.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/science/questions" className="btn btn-primary">
              Read the research library
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/apply" className="btn btn-secondary" data-cta="nutrition_primary">
              Get this mapped to you
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

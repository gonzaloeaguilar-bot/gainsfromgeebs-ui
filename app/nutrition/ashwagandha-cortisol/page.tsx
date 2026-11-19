import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/ashwagandha-cortisol";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Ashwagandha for Cortisol and Stress: What Holds Up | Geebs",
  description:
    "Ashwagandha, cortisol, and stress explained without the hormone-balancing hype: what human trials found, the doses tested, and the honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Ashwagandha for Cortisol and Stress: What Holds Up",
    description:
      "Human trials suggest a modest stress and cortisol signal. Here is what that does and does not mean for a demanding week.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwagandha, cortisol, and stress evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwagandha for Cortisol and Stress",
    description:
      "The human evidence, the dose tested, and why lower cortisol is not the same as broad hormone balance.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type EvidenceRow = {
  design: string;
  population: string;
  protocol: string;
  finding: string;
  grade: "B" | "C";
  gradeLabel: "Moderate" | "Early";
  title: string;
  author: string;
  year: string;
  journal: string;
  pmid: string;
  doi: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    design: "Systematic review and meta-analysis of 9 randomized trials",
    population: "558 adults across the included trials",
    protocol: "Different ashwagandha formulations and protocols",
    finding:
      "Lower reported stress, anxiety scores, and serum cortisol than placebo across the pooled trials",
    grade: "B",
    gradeLabel: "Moderate",
    title:
      "Effects of Ashwagandha (Withania Somnifera) on stress and anxiety: A systematic review and meta-analysis",
    author: "Arumugam V, et al.",
    year: "2024",
    journal: "Explore (NY)",
    pmid: "39348746",
    doi: "10.1016/j.explore.2024.103062",
  },
  {
    design: "Randomized, double-blind, placebo-controlled trial",
    population: "60 healthy adults who reported high stress",
    protocol: "240 mg standardized extract once daily for 60 days",
    finding:
      "A larger drop in morning cortisol and one anxiety score than placebo; the second stress scale did not show a reliable difference",
    grade: "C",
    gradeLabel: "Early",
    title:
      "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract: A randomized, double-blind, placebo-controlled study",
    author: "Lopresti AL, et al.",
    year: "2019",
    journal: "Medicine (Baltimore)",
    pmid: "31517876",
    doi: "10.1097/MD.0000000000017186",
  },
];

const META_ANALYSIS = EVIDENCE_ROWS[0];
const LOPRESTI_TRIAL = EVIDENCE_ROWS[1];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does ashwagandha lower cortisol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may lower cortisol in adults under stress. A 2024 meta-analysis of nine randomized trials found a pooled reduction in serum cortisol versus placebo, and a 60-person trial found a larger reduction in morning cortisol after 60 days. The evidence is promising, but the studies do not prove that everyone needs lower cortisol.",
      },
    },
    {
      "@type": "Question",
      name: "How much ashwagandha was used in the cortisol trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2019 trial used 240 mg of a standardized extract once daily for 60 days. That is a study-specific protocol, not a universal dose. Extracts can differ, and the meta-analysis pooled different formulations and protocols, so the label amount alone does not make two products equivalent.",
      },
    },
    {
      "@type": "Question",
      name: "Does lower cortisol mean better hormonal balance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Cortisol changes through the day and has useful roles in energy, alertness, and training. These studies measured stress outcomes and cortisol under specific conditions; they did not establish broad hormonal balance. A lower reading is not automatically better, and it is not a home diagnostic test.",
      },
    },
    {
      "@type": "Question",
      name: "Can ashwagandha replace sleep or stress-management habits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A supplement cannot protect your sleep window, change an overloaded calendar, or replace training and nutrition basics. If you try it, treat it as one controlled experiment on top of those foundations. The current evidence supports a possible assist, not a substitute for the habits that make demanding weeks manageable.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Ashwagandha for Cortisol and Stress: What Holds Up",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ashwagandha for Cortisol and Stress: What Holds Up",
  description:
    "An evidence-graded look at ashwagandha, cortisol, and perceived stress, including the protocols studied and the limits of hormone-balance claims.",
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
    citation: EVIDENCE_ROWS.map((source) => ({
    "@type": "ScholarlyArticle",
    name: source.title,
    author: { "@type": "Person", name: source.author.replace(/,? et al\.?$/, "") },
    datePublished: source.year,
    isPartOf: { "@type": "Periodical", name: source.journal },
    identifier: [
      { "@type": "PropertyValue", propertyID: "PMID", value: source.pmid },
      { "@type": "PropertyValue", propertyID: "DOI", value: source.doi },
    ],
    sameAs: [
      `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`,
      `https://doi.org/${source.doi}`,
    ],
  })),
  about: [
    { "@type": "Thing", name: "Ashwagandha" },
    { "@type": "Thing", name: "Cortisol" },
    { "@type": "Thing", name: "Stress" },
  ],
};

function PubMedLink({ source }: { source: EvidenceRow }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`}
      className="underline hover:text-bone"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {source.author.replace(", et al.", " et al.")}, {source.year}
    </a>
  );
}

export default function AshwagandhaCortisolPage() {
  return (
    <>
      <JsonLd id="ashwagandha-cortisol-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="ashwagandha-cortisol-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Ashwagandha for cortisol and stress
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            <b>
              Ashwagandha may modestly lower perceived stress and cortisol in
              adults who already feel stressed.
            </b>{" "}
            The human evidence is promising, but it does not prove broad
            &ldquo;hormonal balance&rdquo; or make a supplement a substitute for
            sleep, training, and a manageable workload.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The best current summary pooled nine randomized trials with 558
            participants. Ashwagandha formulations performed better than placebo
            on reported stress, anxiety scores, and serum cortisol (
            <PubMedLink source={META_ANALYSIS} />). That earns a B, or moderate,
            evidence grade: useful enough to consider, not strong enough to
            promise a predictable result.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The practical frame matters. Cortisol is not a toxin you need to
            crush. It helps you wake up, focus, train, and respond to pressure.
            The useful question is whether a supplement helps you handle a hard
            stretch without making the rest of your routine worse.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="ashwagandha cortisol" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the human evidence on ashwagandha and cortisol show?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It shows a real but bounded signal. A 2024 meta-analysis found lower
            stress scores and serum cortisol across nine randomized trials, while
            one 60-day trial found a larger morning-cortisol drop than placebo.
            Different extracts and study protocols keep this from becoming a
            universal promise for every product or person. For a full analysis of human RCTs and HPA axis kinetics, see our detailed review on{" "}
            <Link href="/science/ashwagandha-and-cortisol" className="underline hover:text-bone">
              Ashwagandha and cortisol science
            </Link>
            .
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14px] md:text-[15px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Who and what</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 align-bottom font-normal">Grade</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.pmid} className="border-t border-bone/10 align-top">
                    <td data-label="Evidence" className="py-3 pr-4 min-w-[210px]">
                      <b>{row.design}</b>
                      <span className="block mt-1 text-mute">{row.journal}</span>
                      <PubMedLink source={row} />
                      <span aria-hidden="true"> · </span>
                      <a
                        href={`https://doi.org/${row.doi}`}
                        className="underline hover:text-bone"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        DOI
                      </a>
                    </td>
                    <td data-label="Who and what" className="py-3 pr-4 min-w-[220px]">
                      {row.population}
                      <span className="block mt-1 text-mute">{row.protocol}</span>
                    </td>
                    <td data-label="Finding" className="py-3 pr-4 min-w-[260px] text-mute">
                      {row.finding}
                    </td>
                    <td data-label="Grade" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grade B means a meta-analysis without enough separate support to call
            the result strong. Grade C means one randomized trial. The full rubric
            is in the{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does lower cortisol mean better stress resilience?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Not automatically. The studies support a possible improvement in
            stress measures alongside a cortisol change, but they do not show
            that the cortisol change caused better performance at work, better
            recovery, or broader hormone balance. Cortisol also follows a daily
            rhythm, so one lower reading is not the whole system.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the meta-analysis grouped different
            formulations and protocols. It found an average signal across trials,
            not proof that every extract works the same way. It also called for
            better long-term safety information.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What dose of ashwagandha was tested for stress and cortisol?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The clearest single trial used 240 mg of a standardized extract once
            daily for 60 days in 60 healthy adults with high self-reported stress.
            It found a larger morning-cortisol reduction and improvement on one
            anxiety scale versus placebo; a second stress scale did not show a
            reliable difference (
            <PubMedLink source={LOPRESTI_TRIAL} />).
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> that is one product-specific protocol for two
            months, not a universal dosing rule. All 60 participants completed
            the trial and no adverse events were reported, but that does not
            establish long-term safety or make every extract interchangeable.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Should you use ashwagandha during a demanding stretch?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Use it only as an optional experiment after the basics are stable.
            Keep your sleep window, training, meals, and caffeine consistent;
            change one variable; and judge whether daily function improves. The
            evidence supports a possible assist with stress, not permission to
            keep adding pressure while a capsule absorbs the cost.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Four trials in the meta-analysis reported mild to moderate adverse
            events, and long-term safety still needs more study. If you use
            medication or are trying to address persistent symptoms, discuss the
            supplement with a qualified clinician instead of treating it as a
            home test.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <dl className="mt-6 space-y-7">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <dt className="text-[16px] md:text-[17px] text-bone leading-[1.5]">
                  {entry.name}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {entry.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Build a routine that can carry the week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Supplements are the edge. A repeatable training and nutrition system
            is the foundation. If you are also comparing ashwagandha with another
            popular supplement, read the evidence-graded{" "}
            <Link
              href="/nutrition/ashwagandha-vs-tongkat-ali"
              className="underline hover:text-bone"
            >
              ashwagandha versus tongkat ali guide
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See how evidence gets graded
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
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

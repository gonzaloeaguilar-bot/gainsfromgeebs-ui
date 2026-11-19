import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/soy-protein-hormones";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Soy Protein and Hormones: What the Research Shows | Geebs",
  description:
    "Soy protein supports muscle protein synthesis without changing measured testosterone or estrogen levels in men. See the evidence and its limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Soy Protein and Hormones: What the Research Actually Shows",
    description:
      "A practical, evidence-graded look at soy protein, male hormones, and the muscle-building response to resistance exercise.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Soy protein and hormones evidence explained",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soy Protein and Hormones: What the Research Actually Shows",
    description:
      "What soy does for muscle protein synthesis, what it does not do to male hormones, and where the evidence stops.",
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
      name: "Does soy protein lower testosterone in men?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best verified evidence here says no. A 2021 meta-analysis found no effect of soy protein, soy foods, or isoflavones on total testosterone or free testosterone in men. That conclusion also held when the researchers looked at dose and study duration.",
      },
    },
    {
      "@type": "Question",
      name: "Does soy protein raise estrogen in men?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The same meta-analysis found no effect on estradiol or estrone in men. Soy isoflavones are often called phytoestrogens, but their name and structure do not mean that eating soy protein raises circulating estrogen in the way people often assume.",
      },
    },
    {
      "@type": "Question",
      name: "Can soy protein support muscle growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Soy protein can support the muscle-building process. In one acute study, soy isolate stimulated muscle protein synthesis at rest and after resistance exercise in young men. The study measured a short-term response, however, so it does not prove a specific amount of long-term lean-mass gain.",
      },
    },
    {
      "@type": "Question",
      name: "Is soy protein as effective as whey after training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in the one acute study reviewed here. Both soy and whey stimulated muscle protein synthesis, but whey produced the larger response after resistance exercise. That finding came from only six men per protein group and cannot settle every long-term comparison between the two.",
      },
    },
    {
      "@type": "Question",
      name: "Is this page medical advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This page explains nutrition studies for educational purposes. It is not medical advice and does not diagnose or treat a hormone concern or any other condition. Talk with a qualified clinician about symptoms, laboratory results, or treatment decisions.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Soy Protein and Hormones: What the Research Actually Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Soy Protein and Hormones: What the Research Actually Shows",
  description:
    "An evidence-graded look at soy protein, male reproductive hormones, and muscle protein synthesis after resistance exercise.",
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
      name: "Neither soy nor isoflavone intake affects male reproductive hormones: An expanded and updated meta-analysis of clinical studies",
      author: { "@type": "Person", name: "Reed KE" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Reproductive Toxicology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33383165" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.reprotox.2020.12.019",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/33383165/",
        "https://doi.org/10.1016/j.reprotox.2020.12.019",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men",
      author: { "@type": "Person", name: "Tang JE" },
      datePublished: "2009",
      isPartOf: { "@type": "Periodical", name: "Journal of Applied Physiology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "19589961" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1152/japplphysiol.00076.2009",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/19589961/",
        "https://doi.org/10.1152/japplphysiol.00076.2009",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Soy protein" },
    { "@type": "Thing", name: "Male reproductive hormones" },
    { "@type": "Thing", name: "Muscle protein synthesis" },
  ],
};

type EvidenceRow = {
  claim: string;
  population: string;
  protocol: string;
  finding: string;
  source: string;
  pmid: "33383165" | "19589961";
  grade: "B" | "C";
  gradeLabel: "Moderate" | "Early";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Soy protein and isoflavones do not alter measured male reproductive hormones",
    population:
      "41 clinical studies; outcome totals ranged from 239 to 1,753 men",
    protocol: "Meta-analysis of soy foods, soy protein, and isoflavone exposure",
    finding:
      "No effect on total or free testosterone, estradiol, estrone, or SHBG",
    source: "Reed et al., 2021",
    pmid: "33383165",
    grade: "B",
    gradeLabel: "Moderate",
  },
  {
    claim: "Soy isolate can stimulate muscle protein synthesis after resistance exercise",
    population: "18 healthy young men; six per protein group",
    protocol:
      "One exercise bout followed by whey, casein, or soy with 10 g essential amino acids",
    finding:
      "Soy stimulated the acute response; whey produced the larger post-exercise response",
    source: "Tang et al., 2009",
    pmid: "19589961",
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

export default function SoyProteinHormonesPage() {
  return (
    <>
      <JsonLd id="soy-protein-hormones-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="soy-protein-hormones-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Soy protein and hormones: what the research actually shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Soy can be a useful plant-based protein without forcing you to trade
            muscle support for your hormone health. The useful answer is less
            dramatic than the online argument: it supports the muscle-building
            process, and the stronger evidence does not show a change in men&apos;s
            testosterone or estrogen levels.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Soy protein provides the essential amino acids used to build and
            repair muscle, and a controlled feeding study found that soy isolate
            stimulated muscle protein synthesis after resistance exercise. A
            separate meta-analysis found no effect from soy protein, soy foods,
            or isoflavones on measured testosterone or estrogen levels in men.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            That makes soy a reasonable protein option, not a hormone hack. The
            muscle study measured an acute response in 18 young men, so it does
            not prove a specific long-term lean-mass gain or show that soy and
            whey perform identically over months of training.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="soy protein hormones" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How strong is the evidence on soy protein and hormones?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The hormone finding is moderate evidence because it comes from one
            meta-analysis of clinical studies. The muscle finding is early
            evidence because it comes from one small, acute study. Keeping those
            grades separate prevents a strong hormone conclusion from making the
            long-term muscle conclusion look more settled than it is.
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
                      <PubMedLink pmid={row.pmid}>{row.source}</PubMedLink>
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
            Grades come from study design, not how reassuring a result sounds.
            See the full approach in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the hormone meta-analysis combined different
            soy foods, proteins, isoflavone extracts, doses, and study lengths.
            The muscle study was a one-meal experiment in young men, with only
            six people assigned to each protein group.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does soy protein lower testosterone or raise estrogen in men?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The strongest verified source on this page says no. Reed et al.
            combined 41 clinical studies and found no effect on total or free
            testosterone, estradiol, estrone, or sex hormone-binding globulin.
            The result also held when the researchers separated studies by dose
            and duration.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            Read the source in <i>Reproductive Toxicology</i>: DOI{" "}
            <a
              href="https://doi.org/10.1016/j.reprotox.2020.12.019"
              className="underline hover:text-bone"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              10.1016/j.reprotox.2020.12.019
            </a>{" "}
            and <PubMedLink pmid="33383165">PMID 33383165</PubMedLink>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Can soy protein support muscle and lean mass?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It can support the muscle-building process. Tang et al. gave 18
            healthy young men whey, casein, or soy isolate after one resistance
            exercise session, with six men per group. Soy stimulated muscle
            protein synthesis at rest and after exercise, but the experiment did
            not measure months of lean-mass change.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            Read the source in <i>Journal of Applied Physiology</i>: DOI{" "}
            <a
              href="https://doi.org/10.1152/japplphysiol.00076.2009"
              className="underline hover:text-bone"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              10.1152/japplphysiol.00076.2009
            </a>{" "}
            and <PubMedLink pmid="19589961">PMID 19589961</PubMedLink>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Is soy protein a complete protein?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Soy isolate delivered the essential amino acids needed for the study
            and produced a measurable muscle protein synthesis response. In the
            experiment, each protein drink supplied an equivalent 10 grams of
            essential amino acids. That supports using soy as a complete
            plant-based protein, while keeping the result tied to soy isolate.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Is soy protein as effective as whey after training?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Not in this acute comparison. Both proteins stimulated muscle protein
            synthesis, but whey produced the larger response after exercise. The
            practical conclusion is not that soy fails; it is that one small,
            one-meal study found a stronger immediate response to whey and cannot
            settle every long-term training outcome.
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
            Use soy for protein, not for a hormone outcome
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            If soy fits your meals, preferences, and digestion, the evidence here
            gives you no reason to avoid it over a testosterone or estrogen fear.
            Treat it as one practical way to get protein consistently — see our full <Link href="/science/soy-and-testosterone-myth" className="text-cloudText underline hover:text-bone">meta-analytic breakdown on the soy and testosterone myth</Link>. Your
            training, total diet, and repeatable routine still do the heavy
            lifting.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/science/soy-and-testosterone-myth" className="btn btn-primary">
              Read the soy & testosterone study review
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/science/questions" className="btn btn-secondary">
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

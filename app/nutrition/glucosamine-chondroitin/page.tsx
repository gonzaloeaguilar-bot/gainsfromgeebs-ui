import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/glucosamine-chondroitin";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Glucosamine Chondroitin Joints: What Research Shows | Geebs",
  description:
    "Glucosamine and chondroitin for joints, graded honestly: what osteoarthritis reviews found, common study doses, and the limits for healthy lifters.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Glucosamine and Chondroitin for Joints: What the Research Shows",
    description:
      "The evidence is mostly from people with osteoarthritis, not healthy adults in hard training blocks. Here is what that means before you buy a bottle.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Glucosamine and chondroitin for joints — what the research shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glucosamine and Chondroitin for Joints: What Holds Up",
    description:
      "Mixed osteoarthritis findings, no direct high-impact training proof, and the common doses reported in human studies.",
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
      name: "Do glucosamine and chondroitin protect joints during heavy training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified reviews do not establish that. Their evidence comes mainly from people with osteoarthritis or joint pain, not healthy adults completing a high-impact training cycle. That means they cannot tell us whether the supplements preserve cartilage, prevent an injury, or make a healthy joint more resilient under load.",
      },
    },
    {
      "@type": "Question",
      name: "Do glucosamine and chondroitin help joint pain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The clinical evidence is mixed. A 2018 systematic review and meta-analysis found glucosamine and chondroitin were ineffective or produced small effects of unclear practical importance for osteoarthritis. A broader 2025 systematic review reported mostly positive findings across a mixed collection of human studies, which is why a guaranteed result would overstate the evidence.",
      },
    },
    {
      "@type": "Question",
      name: "How much glucosamine and chondroitin was commonly studied?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2025 review reported that the most common combined daily amounts were 1,500 mg of glucosamine and 1,200 mg of chondroitin. That describes the studies; it is not a personal dose recommendation. Products, populations, and study designs varied, so a familiar label amount does not guarantee the same result for you.",
      },
    },
    {
      "@type": "Question",
      name: "Are glucosamine and chondroitin proven to rebuild cartilage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The 2018 review found a small structural result for chondroitin in osteoarthritis, but judged it too small to be clearly meaningful in practice. Neither verified review proves that taking glucosamine and chondroitin rebuilds cartilage in healthy adults or offsets the stress of repeated impact training.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Glucosamine and Chondroitin for Joints: What the Research Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Glucosamine and Chondroitin for Joints: What the Research Shows",
  description:
    "An evidence-graded look at glucosamine and chondroitin for joint pain, cartilage claims, study doses, and high-impact training.",
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
      name: "The Safety and Efficacy of Glucosamine and/or Chondroitin in Humans: A Systematic Review",
      author: { "@type": "Person", name: "Baden KER" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "40647198" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu17132093",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/40647198/",
        "https://doi.org/10.3390/nu17132093",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Dietary supplements for treating osteoarthritis: a systematic review and meta-analysis",
      author: { "@type": "Person", name: "Liu X" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "British Journal of Sports Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29018060" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1136/bjsports-2016-097333",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/29018060/",
        "https://doi.org/10.1136/bjsports-2016-097333",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Glucosamine" },
    { "@type": "Thing", name: "Chondroitin" },
    { "@type": "Thing", name: "Joint health" },
  ],
};

type EvidenceRow = {
  claim: string;
  verdict: string;
  population: string;
  source: string;
  grade: "A" | "B" | "D";
  gradeLabel: "Strong" | "Moderate" | "Weak";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Glucosamine or chondroitin produces a meaningful long-term pain benefit",
    verdict: "Did not hold up in the 2018 pooled analysis.",
    population: "People with hand, hip, or knee osteoarthritis",
    source: "Liu et al., 2018 — PMID 29018060",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "Chondroitin produces a clearly meaningful structural improvement",
    verdict: "A small change was found, but it was not clearly meaningful in practice.",
    population: "People with osteoarthritis",
    source: "Liu et al., 2018 — PMID 29018060",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "1,500 mg glucosamine plus 1,200 mg chondroitin is a common study dose",
    verdict: "Holds up as a description of the reviewed studies, not a prescription.",
    population: "Mixed human studies, mostly osteoarthritis and joint pain",
    source: "Baden et al., 2025 — PMID 40647198",
    grade: "B",
    gradeLabel: "Moderate",
  },
  {
    claim: "The combination protects healthy joints during high-impact training",
    verdict: "Not established by either verified review.",
    population: "No healthy high-impact training population was established",
    source: "Evidence boundary from both verified reviews",
    grade: "D",
    gradeLabel: "Weak",
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

export default function GlucosamineChondroitinPage() {
  return (
    <>
      <JsonLd id="glucosamine-chondroitin-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="glucosamine-chondroitin-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Glucosamine and chondroitin for joints: what the research actually shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            The pitch for these joint supplements usually jumps from what
            cartilage contains to what a capsule can do. Human research does not
            make that jump so cleanly, especially for healthy adults training
            hard.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Glucosamine and chondroitin are not proven to protect cartilage or
            make healthy joints more resilient during a high-impact training
            cycle. The two verified reviews studied mostly people with
            osteoarthritis or joint pain, and the more focused 2018 analysis
            found either no benefit or effects too small to clearly matter.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            That does not mean every person will notice nothing. It means the
            research cannot support a promise that the combination reinforces a
            healthy lifter&rsquo;s cartilage. If you try it, treat it as an optional
            experiment around the basics, not protection that lets you ignore
            load management, sleep, or pain that changes how you move.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the research base is clinical and mixed. It does
            not directly test healthy adults through a hard training block, so
            claims about impact resilience or injury prevention go beyond the
            evidence.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="glucosamine chondroitin" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which glucosamine and chondroitin claims actually hold up?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The reviews support a narrow conclusion: the supplements have been
            studied extensively in osteoarthritis, but results are mixed and do
            not transfer cleanly to healthy lifters. The table keeps each
            population, source, verdict, and evidence grade together so the
            clinical findings do not turn into a training promise.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Population" className="py-3 pr-4">{row.population}</td>
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
            Grades reflect study design and how directly the population answers
            the claim. Read how sources are selected in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Do glucosamine and chondroitin protect joints during heavy training?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The two verified reviews do not establish that. Their evidence comes
            mainly from people with osteoarthritis or joint pain, not healthy
            adults completing a high-impact training cycle. That means they
            cannot tell us whether the supplements preserve cartilage, prevent
            an injury, or make a healthy joint more resilient under load.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> a plausible building-block story is still a
            mechanism, not a demonstrated training outcome. Keep weekly load,
            exercise selection, technique, sleep, and recovery capacity ahead of
            a supplement when you plan a demanding block.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What did the reviews find for joint pain and cartilage?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The clinical picture is mixed. <PubMedLink pmid="29018060">Liu et
            al., 2018</PubMedLink> found glucosamine and chondroitin were either
            ineffective or produced small effects of unclear practical
            importance. The review also found a small structural change with
            chondroitin, but judged it too small to be clearly meaningful.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <PubMedLink pmid="40647198">Baden et al., 2025</PubMedLink> reviewed
            146 human studies and reached a more favorable overall conclusion,
            with most work centered on osteoarthritis and joint pain. The
            different conclusions are a reason to avoid certainty, not a reason
            to select whichever review matches the bottle label.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How much glucosamine and chondroitin was commonly studied?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The 2025 review reported that the most common combined daily amounts
            were 1,500 mg of glucosamine and 1,200 mg of chondroitin. That
            describes the studies; it is not a personal dose recommendation.
            Products, populations, and study designs varied, so a familiar label
            amount does not guarantee the same result for you.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> neither review establishes a dose for protecting
            healthy joints during impact training. If you are considering a
            concentrated supplement, compare the exact product with the research
            and review it with a clinician or pharmacist when your health or
            medication makes that decision less straightforward.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Are glucosamine and chondroitin proven to rebuild cartilage?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            No. The 2018 review found a small structural result for chondroitin in
            osteoarthritis, but judged it too small to be clearly meaningful in
            practice. Neither verified review proves that taking glucosamine and
            chondroitin rebuilds cartilage in healthy adults or offsets the
            stress of repeated impact training.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            This is the line between a structure-function explanation and a
            treatment claim. Cartilage biology can explain why researchers are
            interested in these compounds; it cannot promise that a capsule
            repairs tissue or lets you train through a joint problem.
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
            Keep the basics ahead of the bottle
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            A supplement cannot make a poorly managed training block resilient.
            Build around <Link href="/science/studies/resistance-training-dose-response-meta-regression-2026" className="underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText">recoverable weekly volume</Link>, exercise choices your joints
            tolerate, enough food and protein, and sleep you can repeat. Coaching
            is where those pieces get adjusted to your actual schedule and
            feedback.
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

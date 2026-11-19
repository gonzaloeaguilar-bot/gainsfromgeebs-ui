import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/turmeric-curcumin-inflammation";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Turmeric, Curcumin, and Inflammation: What Holds Up | Geebs",
  description:
    "Turmeric, curcumin, and inflammation explained with evidence grades, verified PubMed sources, and clear limits for training and joint claims.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Turmeric, Curcumin, and Inflammation: What the Research Shows",
    description:
      "Curcumin can shift several inflammatory markers, but the research does not prove faster training recovery or better joint mobility.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Turmeric, curcumin, and inflammation — what the research shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turmeric, Curcumin, and Inflammation: What Holds Up",
    description:
      "The supported inflammatory-marker finding, the limits for training and joints, and why formulation matters.",
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
      name: "Does curcumin reduce inflammation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 2023 systematic review and meta-analysis of 66 randomized trials found lower CRP, TNF-alpha, and IL-6 with turmeric or curcumin supplementation, but no reliable change in IL-1 beta. That supports an effect on several blood markers; it does not prove that curcumin fixes soreness, an injury, or a medical condition.",
      },
    },
    {
      "@type": "Question",
      name: "Is turmeric spice the same as a curcumin supplement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Turmeric is the whole rhizome or spice, while curcumin is one of its compounds. The trials pooled different products, doses, and formulations, so a result from a supplement cannot be treated as proof that adding a small amount of turmeric to food produces the same exposure or effect.",
      },
    },
    {
      "@type": "Question",
      name: "Does curcumin improve joint mobility during heavy training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These sources do not establish that. The strongest source pooled inflammatory blood markers across many adult populations; it did not test joint mobility during a heavy training cycle. Curcumin may change some markers without producing a noticeable recovery or mobility benefit, so do not use the marker result as a performance promise.",
      },
    },
    {
      "@type": "Question",
      name: "How much curcumin should I take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These sources do not establish one dose that works for every product or person. The trials varied in dose, duration, population, and formulation. If you are considering a concentrated supplement, review the exact label with a clinician or pharmacist, especially if you take medication or have a medical condition.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Turmeric, Curcumin, and Inflammation: What the Research Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Turmeric, Curcumin, and Inflammation: What the Research Shows",
  description:
    "An evidence-graded review of turmeric and curcumin for inflammatory markers, with clear limits for training recovery and joint mobility claims.",
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
      name: "Antioxidant and anti-inflammatory effects of curcumin/turmeric supplementation in adults: A GRADE-assessed systematic review and dose-response meta-analysis of randomized controlled trials",
      author: { "@type": "Person", name: "Dehzad MJ" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Cytokine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "36804260" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.cyto.2023.156144",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/36804260/",
        "https://doi.org/10.1016/j.cyto.2023.156144",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Turmeric and Curcumin: From Traditional to Modern Medicine",
      author: { "@type": "Person", name: "Akaberi M" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Advances in Experimental Medicine and Biology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34331682" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1007/978-3-030-56153-6_2",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/34331682/",
        "https://doi.org/10.1007/978-3-030-56153-6_2",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Turmeric" },
    { "@type": "Thing", name: "Curcumin" },
    { "@type": "Thing", name: "Inflammatory response" },
  ],
};

type EvidenceRow = {
  claim: string;
  verdict: string;
  population: string;
  source: string;
  grade: "A" | "D";
  gradeLabel: "Strong" | "Weak";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    claim: "Turmeric or curcumin supplementation lowers CRP, TNF-alpha, and IL-6",
    verdict: "Holds up across the pooled randomized trials.",
    population: "Adults across 66 randomized trials",
    source: "Dehzad et al., 2023 — PMID 36804260",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "Turmeric or curcumin reliably lowers IL-1 beta",
    verdict: "Did not hold up in the pooled result.",
    population: "Adults across 66 randomized trials",
    source: "Dehzad et al., 2023 — PMID 36804260",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "Curcumin improves joint mobility during heavy training",
    verdict: "Not established by these sources.",
    population: "No heavy-training population was tested",
    source: "Evidence boundary from both verified sources",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    claim: "A kitchen dose of turmeric works like a studied curcumin product",
    verdict: "Not established; the products and exposure are not interchangeable.",
    population: "Trials used varied supplements and formulations",
    source: "Dehzad et al., 2023; Akaberi et al., 2021",
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

export default function TurmericCurcuminInflammationPage() {
  return (
    <>
      <JsonLd id="turmeric-curcumin-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="turmeric-curcumin-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Turmeric, curcumin, and inflammation: what the research shows
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            The best evidence is for changes in inflammatory blood markers, not
            for a guaranteed change in soreness, recovery, or joint mobility.
            Here is what holds up, what remains untested, and why the product in
            the bottle matters.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Curcumin supplementation can support the body&rsquo;s inflammatory
            response by lowering several blood markers, including CRP, TNF-alpha,
            and IL-6. That conclusion comes from a 2023 systematic review and
            meta-analysis of 66 randomized trials, so the evidence for the marker
            change is strong.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The practical claim needs a hard boundary: these sources do not show
            that curcumin improves joint mobility during a heavy training cycle,
            shortens recovery, or makes an injury heal faster. They also do not
            show that a spoonful of turmeric spice gives the same exposure as the
            concentrated products used in trials.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> a blood-marker change is not the same thing as a
            result you can feel in the gym. Treat curcumin as an optional support,
            not as a substitute for load management, sleep, food quality, or an
            evaluation when a joint keeps hurting.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="turmeric curcumin inflammation" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which turmeric and curcumin claims actually hold up?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The strongest claim is narrow: supplementation lowered three common
            inflammatory markers across pooled randomized trials. The same review
            found no reliable change in IL-1 beta, and neither verified source
            tested heavy-training recovery. The table keeps the population,
            source, verdict, and study-design grade together.
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
            Does curcumin reduce inflammation?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            It can lower several inflammatory blood markers. The strongest source
            here, <PubMedLink pmid="36804260">Dehzad et al., 2023</PubMedLink> in
            Cytokine, pooled 66 randomized trials and found lower CRP, TNF-alpha,
            and IL-6 with turmeric or curcumin supplementation. IL-1 beta did not
            show a reliable difference.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the trials covered different adult populations,
            products, doses, and durations. A pooled marker result does not tell
            you which product will help a healthy lifter, whether you will feel a
            difference, or whether taking more produces a better result.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Is turmeric spice the same as a curcumin supplement?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            No. Turmeric is the whole rhizome or spice; curcumin is one compound
            within it. The broader <PubMedLink pmid="34331682">Akaberi et al.,
            2021</PubMedLink> review describes that distinction, while the pooled
            trials used varied supplements and formulations. A kitchen serving
            cannot be assumed to match a studied product.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            This is why a label saying only &ldquo;turmeric&rdquo; does not tell
            you enough. Look for the amount of curcuminoids and the exact
            formulation, then compare that product with the one used in the
            research instead of treating every capsule as interchangeable.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Does curcumin improve joint mobility during heavy training?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            These sources do not establish that. The meta-analysis measured
            inflammatory and oxidative-stress markers across adult populations;
            it did not test joint mobility during a heavy training block. The
            broader review discusses clinical interest in knee osteoarthritis,
            but that population does not transfer to healthy lifters.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> do not turn a marker finding into a recovery
            promise. If a joint is limiting your range of motion or changing how
            you train, adjust the load and get it assessed rather than using a
            supplement to train through the signal.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How much curcumin should you take?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            These sources do not establish one dose for every person or product.
            The trials varied by dose, duration, population, and formulation, so
            copying one milligram number would create false precision. If you are
            considering a concentrated supplement, start with the exact label and
            review it with a clinician or pharmacist.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            That matters more if you take medication or have a medical condition.
            This page is educational, not medical advice, and it does not diagnose
            or treat pain, inflammation, or any other condition.
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
            Keep the supplement in its proper place
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Curcumin may be a useful extra, but it is not the foundation of a
            training plan. Sleep, sensible programming, enough protein, and a
            workload you can recover from still do the heavy lifting. Coaching is
            where those pieces get fitted to your actual week.
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

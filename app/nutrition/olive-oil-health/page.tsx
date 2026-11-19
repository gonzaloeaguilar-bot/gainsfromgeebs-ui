import type { Metadata } from "next";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/olive-oil-health";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Olive Oil Health Benefits: What the Research Shows | Geebs",
  description:
    "Extra virgin olive oil provides monounsaturated fat and polyphenols. See what human research supports for cardiovascular health, with every claim graded.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Olive Oil Health Benefits: What the Research Actually Supports",
    description:
      "How extra virgin olive oil fits a heart-supportive diet, what its polyphenols may do, and where the evidence stops.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Extra virgin olive oil health benefits and evidence grades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olive Oil Health Benefits: What the Research Supports",
    description:
      "The cardiovascular evidence, the polyphenol mechanism, and the honest limits in one practical guide.",
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
      name: "What are the main health benefits of extra virgin olive oil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The clearest support is cardiovascular. A 2025 systematic review of 17 clinical studies found that virgin olive oil, including extra virgin olive oil, was associated with improvements in markers tied to cardiovascular function. Extra virgin olive oil also supplies monounsaturated oleic acid and polyphenols, but it should be treated as one useful part of an overall eating pattern, not a stand-alone fix.",
      },
    },
    {
      "@type": "Question",
      name: "Is extra virgin olive oil healthier than regular olive oil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Extra virgin olive oil is the better default when you want the polyphenol side of the evidence because processing and storage affect how much of those compounds remains. The practical choice is a bottle you will use consistently, store away from heat and light, and finish while it still tastes fresh.",
      },
    },
    {
      "@type": "Question",
      name: "How much olive oil should I use each day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These two sources do not establish one universal daily dose for every healthy adult. Use extra virgin olive oil as part of an overall eating pattern that fits your goals. The research does not show that simply pouring more creates a larger benefit.",
      },
    },
    {
      "@type": "Question",
      name: "Are olive oil polyphenol benefits proven in people?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not to the degree the mechanism is often presented. A 2018 review describes credible antioxidant activity, but it also says much of the evidence comes from laboratory models and calls for better human trials. That is why the cellular-resilience claim is graded D — Weak on this page.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Olive Oil Health Benefits: What the Research Actually Supports",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Olive Oil Health Benefits: What the Research Actually Supports",
  description:
    "An evidence-graded guide to extra virgin olive oil, cardiovascular function, monounsaturated fat, and polyphenols.",
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
      name: "Potential Health Benefits of Olive Oil and Plant Polyphenols",
      author: { "@type": "Person", name: "Gorzynik-Debicka M" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "International Journal of Molecular Sciences" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "29495598" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/ijms19030686",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/29495598/",
        "https://doi.org/10.3390/ijms19030686",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Exploring the Benefits of Extra Virgin Olive Oil on Cardiovascular Health Enhancement and Disease Prevention: A Systematic Review",
      author: { "@type": "Person", name: "Ussia S" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "40507112" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu17111843",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/40507112/",
        "https://doi.org/10.3390/nu17111843",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Extra virgin olive oil" },
    { "@type": "Thing", name: "Cardiovascular health" },
    { "@type": "Thing", name: "Polyphenols" },
    { "@type": "Thing", name: "Monounsaturated fat" },
  ],
};

type ClaimRow = {
  claim: string;
  population: string;
  finding: string;
  source: string;
  pmid: string;
  grade: "A" | "D";
  gradeLabel: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    claim: "Virgin olive oil supports cardiovascular function as part of a balanced diet",
    population: "Participants across 17 clinical studies",
    finding:
      "The studies reported improvements in markers involved in cardiovascular and metabolic pathways.",
    source: "Ussia et al., 2025",
    pmid: "40507112",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "Olive oil polyphenols help cells handle oxidative stress",
    population: "Mostly laboratory and cell models",
    finding:
      "The mechanism is plausible, but the review says better human trials are still needed.",
    source: "Gorzynik-Debicka et al., 2018",
    pmid: "29495598",
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

export default function OliveOilHealthPage() {
  return (
    <>
      <JsonLd id="olive-oil-health-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="olive-oil-health-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            Olive oil health benefits: what the research actually supports
          </h1>
          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Extra virgin olive oil gives you monounsaturated fat plus a mix of
            polyphenols. The cardiovascular case is useful and practical; the
            cellular-mechanism claims need more restraint.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The best-supported <b>olive oil health benefits</b> are tied to
            cardiovascular function when extra virgin or virgin olive oil is
            part of a balanced eating pattern. A 2025 systematic review found
            improvements across cardiovascular and metabolic markers in 17
            clinical studies, while a separate review explains why its
            monounsaturated oleic acid and polyphenols are biologically
            interesting.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            The useful move is simple: use extra virgin olive oil in place of
            butter or other saturated-fat-heavy choices, not on top of an
            unchanged diet. It is a food, not a supplement, and the research
            does not show that simply pouring more creates a larger benefit.
            For a full breakdown of the controlled trial examining butter swaps
            and androgen markers, see our{" "}
            <Link href="/science/olive-oil" className="underline hover:text-bone">
              olive oil and testosterone study breakdown
            </Link>
            , and for the oils people swap it against, the{" "}
            <Link href="/science/beef-tallow-vs-olive-oil-for-testosterone" className="underline hover:text-bone">
              beef tallow versus olive oil comparison
            </Link>{" "}
            and{" "}
            <Link href="/free/seed-oils" className="underline hover:text-bone">
              what holds up about seed oils
            </Link>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Which olive oil health claims have the strongest evidence?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Cardiovascular support is the strongest claim here because it comes
            from a systematic review of clinical studies. The oxidative-stress
            explanation is useful context, but much of that evidence comes from
            laboratory models. The grade follows the study design, not how good
            the mechanism sounds.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full border-collapse text-left text-[14.5px] md:text-[15.5px]">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">What the research found</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="What the research found" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Source" className="py-3 pr-4">
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
            The grading method is explained in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How does extra virgin olive oil support cardiovascular function?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            A 2025 systematic review identified 17 clinical studies and reported
            improvements in markers involved in cardiovascular and metabolic
            pathways with virgin olive oil consumption, including extra virgin
            olive oil. The practical point is substitution: it works best as
            part of a balanced diet, not as an add-on with no other changes.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the review included different study designs and
            participant groups, and its authors called for larger multicenter
            clinical studies. It supports a heart-conscious eating pattern; it
            does not prove that olive oil alone prevents or treats a condition.
            See the original paper from{" "}
            <PubMedLink pmid="40507112">Ussia et al.</PubMedLink>
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What do olive oil polyphenols actually do?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Polyphenols such as hydroxytyrosol and oleuropein help explain extra
            virgin olive oil&apos;s resistance to oxidation and may help protect
            blood lipids from oxidative damage. That gives the food a credible
            cellular-resilience mechanism, but a mechanism is not the same as a
            guaranteed long-term outcome in a person.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b>{" "}
            <PubMedLink pmid="29495598">
              Gorzynik-Debicka et al.
            </PubMedLink>{" "}
            describe a body of evidence that is largely based on cell and
            laboratory models. Their review explicitly says better human trials
            are needed, so this claim stays at D — Weak.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Why does the monounsaturated fat matter?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Olive oil&apos;s main fatty acid is monounsaturated oleic acid. That
            composition makes it a practical replacement for butter and other
            saturated-fat-heavy choices. The benefit depends on what it
            replaces: adding several tablespoons without changing anything else
            raises calories without creating a special health effect.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <b>Honest limits:</b> the composition is well established, but these
            two sources do not isolate monounsaturated fat from polyphenols and
            the rest of the Mediterranean eating pattern. Do not turn one part
            of a food into a promise about the whole body.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How should you use extra virgin olive oil this week?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Keep it boring and useful: dress vegetables with it or use it
            instead of butter when the flavor works. Store the bottle away from
            heat and light because processing, storage, and packaging affect its
            polyphenol content. Measure it if calorie control matters.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            These studies do not establish one perfect dose for every healthy
            adult. The best amount is the one that improves the overall pattern
            without quietly pushing your daily calories past the target you are
            trying to hold.
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
            Make the useful swap, then move on
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Extra virgin olive oil is a strong default, but it is still one
            ingredient. The bigger result comes from building meals you can
            repeat through travel, deadlines, and busy weeks. That is the work
            1:1 coaching helps organize.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See how the research is graded
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

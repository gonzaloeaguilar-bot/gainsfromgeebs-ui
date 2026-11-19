import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/mediterranean-diet-healthspan";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Mediterranean Diet and Healthspan: What We Know | Geebs",
  description:
    "The Mediterranean diet is linked with lower age-related inflammation, but direct proof that it extends healthspan is limited. See the evidence and a practical plate.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Mediterranean Diet and Healthspan: The Honest Evidence",
    description:
      "A Mediterranean eating pattern is associated with lower inflammatory markers. Here is what two verified reviews support, and what they do not prove.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Mediterranean diet and healthspan — what the evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediterranean Diet and Healthspan: The Honest Evidence",
    description:
      "Lower age-related inflammation is plausible and supported by associations. A longer healthy life is not yet a proven result.",
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
      name: "Does the Mediterranean diet increase healthspan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may support more years of good metabolic function, but the two verified sources do not prove that it extends healthspan. They connect the pattern with lower inflammatory markers and discuss pathways tied to aging. Both are narrative reviews, and much of the Mediterranean-diet evidence they summarize is observational.",
      },
    },
    {
      "@type": "Question",
      name: "Which foods make a Mediterranean eating pattern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Build most meals around vegetables, fruit, whole grains, beans, nuts, fish, and olive oil. Those foods work as a pattern, not as a collection of miracle ingredients. The verified inflammation review specifically associates higher intake of whole grains, vegetables, fruit, nuts, and fish with lower inflammation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you need to avoid red meat on a Mediterranean diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No single food decides whether the overall pattern is useful. The practical move is to make plant foods, fish, and olive oil routine while keeping less nutritious choices less frequent. The verified reviews do not establish an exact red-meat limit, so this page does not invent one.",
      },
    },
    {
      "@type": "Question",
      name: "Is a Mediterranean diet enough to preserve muscle as you age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A Mediterranean pattern can organize food quality, but preserving muscle still requires enough protein, progressive resistance training, and adequate total energy. One verified review specifically warns that some dietary approaches may reduce lean mass, which is a reason not to turn healthy eating into chronic under-eating.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Mediterranean Diet and Healthspan: What the Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mediterranean Diet and Healthspan: What the Evidence Shows",
  description:
    "An evidence-graded look at the Mediterranean dietary pattern, age-related inflammation, metabolic health, and the limits of healthspan claims.",
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
      name: "The role of nutrition in inflammaging",
      author: { "@type": "Person", name: "Di Giosia P" },
      datePublished: "2022",
      isPartOf: { "@type": "Periodical", name: "Ageing Research Reviews" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35219904" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.arr.2022.101596",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35219904/",
        "https://doi.org/10.1016/j.arr.2022.101596",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Nutrition and dietary restrictions in cancer prevention",
      author: { "@type": "Person", name: "Mishra A" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Biochimica et Biophysica Acta. Reviews on Cancer" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "38147966" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.bbcan.2023.189063",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/38147966/",
        "https://doi.org/10.1016/j.bbcan.2023.189063",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Mediterranean diet" },
    { "@type": "Thing", name: "Healthspan" },
    { "@type": "Thing", name: "Healthy aging" },
  ],
};

type EvidenceRow = {
  question: string;
  evidence: string;
  finding: string;
  verdict: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Is the Mediterranean pattern linked with lower age-related inflammation?",
    evidence: "Narrative review of nutrition and age-related inflammation",
    finding:
      "Healthy diets, including the Mediterranean pattern, were associated with lower inflammatory markers.",
    verdict: "Useful association; not proof that the diet caused the difference.",
    grade: "D — Weak",
    source: "Di Giosia et al., 2022",
    pmid: "35219904",
  },
  {
    question: "Does the Mediterranean diet extend healthspan or lifespan?",
    evidence: "Narrative review of dietary patterns, aging, and cancer",
    finding:
      "The review describes possible benefits but says most Mediterranean-diet cancer evidence is epidemiological.",
    verdict: "Plausible support; a longer healthy life was not directly established.",
    grade: "D — Weak",
    source: "Mishra et al., 2024",
    pmid: "38147966",
  },
  {
    question: "Does the pattern guarantee cellular resilience?",
    evidence: "Mechanisms discussed in a narrative review",
    finding:
      "Inflammation and nutrient-sensing pathways are relevant to aging, but no direct cellular-resilience outcome was tested.",
    verdict: "Mechanism only; not an established personal outcome.",
    grade: "D — Weak",
    source: "Di Giosia et al., 2022",
    pmid: "35219904",
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

export default function MediterraneanDietHealthspanPage() {
  return (
    <>
      <JsonLd id="mediterranean-diet-healthspan-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="mediterranean-diet-healthspan-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Mediterranean diet and healthspan: what the evidence shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            This way of eating gives you a repeatable structure: more plants,
            whole grains, beans, nuts, fish, and olive oil. The evidence connects
            that pattern with healthier aging signals, but it does not let us
            promise extra years of healthy life.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>A Mediterranean dietary pattern can support metabolic health by
            making minimally processed plant foods, fish, and olive oil your
            default.</b> The verified research links this pattern with lower
            age-related inflammatory markers, but it does not prove that the
            diet extends healthspan or makes your cells more resilient.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The useful takeaway is not a superfood list. It is a meal pattern you
            can repeat for years while still eating enough protein and total
            food to train, recover, and preserve muscle.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="mediterranean diet healthspan" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about Mediterranean diet healthspan?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two narrative reviews support a cautious answer. One links healthy
            dietary patterns with lower markers of age-related inflammation; the
            other discusses aging and dietary pathways but says most
            Mediterranean-diet evidence it covers is epidemiological. Neither
            directly tests whether following the pattern adds healthy years to
            a person&apos;s life.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Grade</th>
                  <th className="py-3 align-bottom font-normal">Source</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Evidence" className="py-3 pr-4 text-mute">{row.evidence}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Grade" className="py-3 pr-4 whitespace-nowrap">{row.grade}</td>
                    <td data-label="Source" className="py-3 whitespace-nowrap">
                      <PubMedLink pmid={row.pmid}>{row.source}</PubMedLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grades follow the study-design rules in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            . Narrative synthesis and mechanisms are weak evidence for a direct
            healthspan outcome.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How might a Mediterranean diet support healthy aging?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The clearest thread is lower chronic inflammation. Di Giosia and
            colleagues associate Mediterranean-style eating and greater intake
            of whole grains, vegetables, fruit, nuts, and fish with lower
            inflammatory markers. That makes the pattern a sensible long-term
            default, while leaving cause, effect size, and individual response
            unresolved.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this is a narrative review summarizing
            associations and mechanisms, not a randomized healthspan trial. It
            cannot tell you how many healthy years the pattern adds, or whether
            lower inflammatory markers translate into a noticeable benefit for
            one person.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What should a Mediterranean plate look like?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Start with a protein you can portion consistently, add vegetables or
            fruit, choose beans or whole grains for carbohydrate, and use olive
            oil or nuts for fat. Fish can rotate in regularly. This turns the
            research pattern into an ordinary meal without requiring imported
            foods, perfect recipes, or a restrictive menu.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The pattern matters more than whether every plate looks
            Mediterranean. A bean bowl, salmon with rice and vegetables, or
            yogurt with fruit and nuts can all move your week in the same
            direction.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is a Mediterranean diet enough for lifelong strength?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No eating pattern preserves muscle by itself. You still need
            progressive resistance training, enough protein, and enough total
            energy to recover. Mishra and colleagues also caution that dietary
            approaches can carry lean-mass tradeoffs. For healthspan, food
            quality and muscle preservation should work together rather than
            compete.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the review does not provide a Mediterranean
            protein target or prove a specific lean-mass effect from this
            pattern. Its warning is a reason to avoid chronic under-eating, not
            a reason to reject the diet.
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
            Make the pattern fit your real week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The advantage of Mediterranean-style eating is not novelty. It is a
            flexible structure you can use at home, at lunch, and while
            traveling. Coaching can help you fit that structure around protein,
            training, and the schedule you actually keep.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
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

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only—not medical advice, and not a diagnosis or treatment for
            any condition. Talk with a qualified clinician if you have a health
            condition or need help changing your diet.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

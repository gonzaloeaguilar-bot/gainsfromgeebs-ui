import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/plant-based-muscle-growth";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Plant Based Muscle Growth: What the Evidence Says | Geebs",
  description:
    "A plant-based diet can support muscle growth when protein intake is sufficient and sources are varied. See the practical plan and honest evidence limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Plant Based Muscle Growth: A Practical Evidence Review",
    description:
      "How protein amount, variety, and essential amino acids fit into a plant-based muscle-building plan.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Plant-based foods arranged for a muscle-building meal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant Based Muscle Growth: What the Evidence Says",
    description:
      "The useful answer on protein amount, varied sources, amino acids, and the limits of current research.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type EvidenceRow = {
  question: string;
  verdict: string;
  action: string;
  grade: "D";
  gradeLabel: "Weak";
  pmid: string;
  doi: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Can a varied plant-based diet support muscle growth?",
    verdict:
      "Yes, when total protein is sufficient and food choices cover essential amino acids.",
    action:
      "Build meals around legumes, soy foods, grains, nuts, and seeds instead of relying on one source.",
    grade: "D",
    gradeLabel: "Weak",
    pmid: "39982647",
    doi: "10.1007/s13668-025-00628-1",
  },
  {
    question: "Does a vegan athlete need deliberate nutrition planning?",
    verdict:
      "Yes. Protein, energy, vitamin B12, iron, zinc, calcium, iodine, vitamin D, and omega-3 intake all deserve attention.",
    action:
      "Use a repeatable meal structure and review nutrients that are easy to miss rather than improvising every day.",
    grade: "D",
    gradeLabel: "Weak",
    pmid: "28924423",
    doi: "10.1186/s12970-017-0192-9",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can you build muscle on a fully plant-based diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Current reviews conclude that a well-planned plant-based diet can meet an athlete's needs and support muscle protein synthesis and strength when total protein is sufficient and sources are varied. The direct long-term evidence for muscle growth remains limited, especially in elite athletes and older adults.",
      },
    },
    {
      "@type": "Question",
      name: "Do plant proteins need to be combined in the same meal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. The practical goal is a varied diet across the day. Legumes tend to complement grains, while soy foods, nuts, and seeds add more options. You do not need to turn every plate into an amino-acid math problem, but repeating only one narrow protein source is a poor plan.",
      },
    },
    {
      "@type": "Question",
      name: "Is plant protein automatically equal to animal protein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Plant proteins can have lower digestibility or less of certain essential amino acids, and the 2025 review notes advantages for animal-protein supplementation in some research. That does not make plant-based muscle growth impossible. It means protein amount, variety, food preparation, and the complete diet matter.",
      },
    },
    {
      "@type": "Question",
      name: "What should a plant-based muscle-building meal include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with a substantial protein source such as tofu, tempeh, lentils, beans, or a mixed plant-protein product. Add a grain or starchy carbohydrate, vegetables, and enough total food to support training. Rotate sources through the week so the overall amino acid and micronutrient profile stays broad.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Plant Based Muscle Growth: What the Evidence Says",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Plant Based Muscle Growth: What the Evidence Says",
  description:
    "A practical, evidence-graded guide to protein amount, source variety, and essential amino acids on a plant-based diet.",
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
      name: "Vegan diets: practical advice for athletes and exercisers",
      author: { "@type": "Person", name: "Rogerson D" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "Journal of the International Society of Sports Nutrition" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28924423" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12970-017-0192-9",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28924423/",
        "https://doi.org/10.1186/s12970-017-0192-9",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The Impact of Plant-Based Proteins on Muscle Mass and Strength Performance: A Comprehensive Review",
      author: { "@type": "Person", name: "López-Moreno M" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Current Nutrition Reports" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "39982647" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1007/s13668-025-00628-1",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/39982647/",
        "https://doi.org/10.1007/s13668-025-00628-1",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Plant-based diet" },
    { "@type": "Thing", name: "Muscle growth" },
    { "@type": "Thing", name: "Dietary protein" },
  ],
};

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

export default function PlantBasedMuscleGrowthPage() {
  return (
    <>
      <JsonLd id="plant-muscle-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="plant-muscle-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Plant based muscle growth: what actually matters
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            You can build muscle without animal protein. The work is making total
            protein, food variety, training, and enough calories consistent.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>A well-planned plant-based diet can support muscle growth.</b> Get
            enough total protein, eat a range of protein sources across the day,
            and use resistance training to give that protein a job. Variety helps
            cover the essential amino acids your body cannot make on its own.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That does not mean every plant protein is identical to every animal
            protein. Digestibility and amino acid amounts differ. It means a
            complete daily pattern can do the job when it is built deliberately,
            instead of expecting one food or powder to carry the whole plan.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="plant based muscle growth" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence support right now?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two relevant reviews support a practical conclusion: plant-based
            eating can meet athletic needs, and varied protein sources in
            sufficient amounts can support muscle protein synthesis and strength.
            Neither source is a meta-analysis or a randomized trial in the exact
            audience for this page, so both claims receive a D grade.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14px] md:text-[15px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">What to do</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.pmid} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4 min-w-[190px]">
                      {row.question}
                      <span className="block mt-2">
                        <PubMedLink pmid={row.pmid}>PMID {row.pmid}</PubMedLink>
                        <span aria-hidden="true"> · </span>
                        <a
                          href={`https://doi.org/${row.doi}`}
                          className="underline hover:text-bone"
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                        >
                          DOI
                        </a>
                      </span>
                    </td>
                    <td data-label="Verdict" className="py-3 pr-4 min-w-[240px]">{row.verdict}</td>
                    <td data-label="What to do" className="py-3 pr-4 min-w-[260px] text-mute">{row.action}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grade D means the specific claim is supported here by review-level
            guidance without a qualifying meta-analysis or direct randomized
            trial. See the full grading approach in the{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Do plant proteins provide all essential amino acids?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Plant foods contain essential amino acids, but their amounts and
            digestibility vary by source. The useful move is variety: combine
            legumes, soy foods, grains, nuts, and seeds across the day. Cooking,
            fermentation, and other processing methods can also improve how much
            protein your body can use.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the 2025 comprehensive review supports this
            strategy but also notes lower digestibility and amino acid quality in
            some plant proteins, plus gaps in long-term research. It specifically
            calls for more work in elite athletes and older adults (
            <PubMedLink pmid="39982647">López-Moreno et al., 2025</PubMedLink>).
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How should you build a plant-based muscle meal?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Start with a meaningful protein anchor such as tofu, tempeh, lentils,
            beans, or a mixed plant-protein product. Add a grain or starchy
            carbohydrate, vegetables, and enough total food to fuel training.
            Rotate your anchors through the week so one narrow source does not
            define your whole diet.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Rogerson&apos;s review argues that a carefully managed vegan diet can
            meet most athletes&apos; needs, while flagging protein, total energy, and
            several micronutrients for attention (
            <PubMedLink pmid="28924423">Rogerson, 2017</PubMedLink>). That is a
            planning guide, not proof that one menu produces a certain amount of
            muscle.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is plant protein equal to animal protein for muscle growth?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The honest answer is not in every comparison. The 2025 review notes
            that animal-protein supplementation has produced greater lean-mass
            and strength gains in some research, while sufficient, varied plant
            protein can still support muscle protein synthesis and strength. Your
            whole diet matters more than a label on one scoop.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> these reviews do not establish perfect
            equivalence for every protein, dose, age group, or training level.
            They support feasibility with thoughtful planning. They do not prove
            that source never matters or that every plant-based diet is
            automatically adequate.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What else do people ask about plant based muscle growth?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Most questions come back to the same three decisions: whether a
            fully plant-based approach can work, whether proteins must be paired
            at each meal, and how much source quality matters. These short answers
            use the same wording as the structured FAQ data search engines see.
          </p>
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
            What should you do next?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Pick three or four protein anchors you will actually eat, spread them
            across repeatable meals, and make your training progression the main
            event. If work makes that consistency difficult, coaching can turn
            the principle into a plan that survives your calendar.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/guides/how-to-build-muscle-on-a-plant-based-diet-for-men"
              className="btn btn-secondary"
            >
              See the plant-based guide
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

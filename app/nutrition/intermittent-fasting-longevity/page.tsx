import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/intermittent-fasting-longevity";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Intermittent Fasting Longevity: What Human Evidence Shows | Geebs",
  description:
    "Intermittent fasting can be a practical meal-timing tool, but human longevity benefits independent of energy balance remain unproven.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Intermittent Fasting and Longevity: The Honest Evidence",
    description:
      "Meal timing can help organize eating and influence short-term metabolism. It has not been shown to extend human lifespan on its own.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Intermittent fasting and longevity — what human evidence shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intermittent Fasting and Longevity: The Honest Evidence",
    description:
      "What fasting changes, what it may help with, and why a longer human life remains an unproven promise.",
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
      name: "Does intermittent fasting make you live longer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That has not been demonstrated in humans. The verified reviews connect fasting with metabolic changes, health-risk markers, and longer lifespan in some animal models. They do not show that intermittent fasting extends human lifespan, especially after separating meal timing from calorie intake, weight change, diet quality, and other habits.",
      },
    },
    {
      "@type": "Question",
      name: "Is a 16:8 schedule better for longevity than a 12-hour overnight fast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified sources do not establish a best eating window for human longevity. A tighter window is not automatically better. Start with a schedule that helps you eat consistently without hurting training, sleep, or adequate nutrition; the evidence does not justify turning a practical routine into a lifespan guarantee.",
      },
    },
    {
      "@type": "Question",
      name: "Does intermittent fasting work without eating fewer calories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasting changes when fuel is available, so timing has real metabolic effects. These reviews do not isolate a durable human longevity benefit from eating fewer calories or losing weight, though. If a fasting schedule helps, the benefit may come partly from making total intake easier to manage.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most practical way to try time-restricted eating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the least restrictive window that improves your routine. A consistent overnight break from eating is easier to sustain than repeated long fasts, and it should still leave room for enough protein, food quality, training fuel, and recovery. Longer or more severe fasts are not required for a sensible meal-timing habit.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Intermittent Fasting Longevity: What Human Evidence Shows",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Intermittent Fasting Longevity: What Human Evidence Shows",
  description:
    "An evidence-graded look at intermittent fasting, metabolic regulation, energy balance, and the unproven claim of longer human lifespan.",
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
      name: "Health Benefits of Intermittent Fasting",
      author: { "@type": "Person", name: "Reddy BL" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Microbial Physiology" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "38955141" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1159/000540068",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/38955141/",
        "https://doi.org/10.1159/000540068",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Intermittent and periodic fasting, longevity and disease",
      author: { "@type": "Person", name: "Longo VD" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Nature Aging" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35310455" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1038/s43587-020-00013-3",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35310455/",
        "https://doi.org/10.1038/s43587-020-00013-3",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Intermittent fasting" },
    { "@type": "Thing", name: "Time-restricted eating" },
    { "@type": "Thing", name: "Longevity" },
    { "@type": "Thing", name: "Metabolic health" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  finding: string;
  verdict: string;
  grade: string;
  source: string;
  pmid: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Does fasting change short-term fuel use and health-risk markers?",
    population: "Narrative review of animal and human research",
    finding:
      "Fasting changes fuel availability, and human studies report changes in weight and several metabolic risk markers.",
    verdict:
      "Useful metabolic signal, but the review cannot isolate meal timing from energy intake and weight change.",
    grade: "D — Weak",
    source: "Longo et al., 2021",
    pmid: "35310455",
  },
  {
    question: "Does intermittent fasting extend human lifespan?",
    population: "Narrative review spanning model organisms, animals, and humans",
    finding:
      "The review discusses longer lifespan in animal models and health effects in humans, not a demonstrated human lifespan extension.",
    verdict: "Not established in humans.",
    grade: "D — Weak",
    source: "Reddy et al., 2024",
    pmid: "38955141",
  },
  {
    question: "Is meal timing a longevity lever independent of energy balance?",
    population: "Narrative review of fasting methods and aging research",
    finding:
      "Human risk-factor changes are reported, while the share caused by weight loss versus fasting itself remains unclear.",
    verdict: "Still speculative.",
    grade: "D — Weak",
    source: "Longo et al., 2021",
    pmid: "35310455",
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

export default function IntermittentFastingLongevityPage() {
  return (
    <>
      <JsonLd id="intermittent-fasting-longevity-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd
        id="intermittent-fasting-longevity-article-schema"
        data={articleSchema}
      />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Intermittent fasting longevity: what human evidence actually shows
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Time-restricted eating can be a practical way to organize meals and
            manage intake. That does not mean it has been shown to make humans
            live longer on its own.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>
              Intermittent fasting is a meal-timing tool, not a proven human
              longevity treatment.
            </b>{" "}
            It changes when your body has incoming fuel and may help you control
            total intake. The verified reviews do not show that fasting extends
            human lifespan independently of calories, weight change, diet quality,
            sleep, and training.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The practical case is simpler: if a consistent eating window cuts out
            late, unplanned eating without making recovery or nutrition worse, it
            can make a good routine easier to follow. You do not need to attach a
            lifespan promise to use that tool.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="intermittent fasting longevity" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does intermittent fasting mean for longevity?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It means separating a useful routine from a much bigger promise.
            Fasting changes fuel use and may improve some health-risk markers,
            while animal studies explore lifespan effects. The two verified
            reviews do not demonstrate that an eating window extends human life,
            especially after accounting for energy balance and weight change.
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
                    <td data-label="Evidence" className="py-3 pr-4 text-mute">{row.population}</td>
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
            Both sources are narrative reviews. Under the site&apos;s study-design
            rules, animal findings, mechanisms, and human risk-factor evidence are
            weak support for a human longevity outcome. Read more in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Can time-restricted eating improve metabolic health?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It can change short-term metabolism, and the reviewed human studies
            report changes in weight and several health-risk markers. That makes
            meal timing worth considering as a practical tool. It does not tell us
            how much of the effect came from the clock itself, eating fewer
            calories, losing weight, or changing food choices.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> a better risk marker is not the same as a longer
            life. These reviews combine different fasting schedules, populations,
            and outcomes, so they cannot supply one universal result for a healthy
            adult with a demanding schedule.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does intermittent fasting extend human lifespan?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No verified human trial here demonstrates a longer lifespan. The
            longevity case comes largely from model organisms, rodents, biological
            pathways, and changes in human risk factors. Those lines of evidence
            can justify more research, but they cannot prove that fasting adds
            years to a person&apos;s life.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> even animal results are not uniform across every
            species, strain, age, or fasting method. Translating them into a human
            lifespan promise would skip the hardest part of the evidence.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Do the benefits come from meal timing or eating less?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified reviews cannot cleanly separate those effects. A shorter
            eating window may change daily fuel patterns, but it can also remove
            an evening meal or snack and lower total intake. Weight change, food
            quality, sleep, and activity can move at the same time, making an
            independent longevity effect difficult to identify.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> if fasting helps you manage calories without
            tracking every bite, that is still useful. It just does not prove that
            the fasting hours delivered a separate anti-aging benefit.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What is a practical intermittent fasting schedule?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Start with the least restrictive schedule that improves consistency.
            A regular overnight break from eating can reduce unplanned late meals
            without forcing your entire workday around food. Keep enough room for
            protein, training fuel, and recovery. A tighter window is not more
            valuable if it makes the rest of the plan harder.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the verified sources describe time-restricted
            feeding as eating within a daily window, but they do not establish one
            best schedule for longevity. Longer or more severe fasts can carry
            tradeoffs and may require clinical supervision.
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
            Make the schedule serve the plan
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Meal timing works best when it makes good nutrition easier, not when it
            becomes another rule to fight. Coaching can help you fit meals,
            training, and recovery around the job and family schedule you actually
            have.
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
            any condition. Talk with a qualified clinician before changing your
            eating schedule if you have a health condition, take medication, have
            a history of disordered eating, or are pregnant or breastfeeding.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

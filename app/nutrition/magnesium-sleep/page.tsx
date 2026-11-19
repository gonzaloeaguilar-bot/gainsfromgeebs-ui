import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/magnesium-sleep";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Magnesium for Sleep: Glycinate vs Threonate Evidence | Geebs",
  description:
    "Magnesium may help some older adults fall asleep sooner, but the evidence does not prove that glycinate or threonate improves deep sleep or recovery.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Magnesium for Sleep: What the Research Actually Supports",
    description:
      "A clear look at magnesium glycinate, threonate, sleep onset, total sleep time, and the limits of the evidence.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Magnesium for sleep — what the research supports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnesium for Sleep: What the Research Actually Supports",
    description:
      "What magnesium may help, what glycinate and threonate claims outrun, and where the evidence is still thin.",
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
      name: "Does magnesium help you sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maybe, but the evidence is limited. A meta-analysis of three randomized trials in 151 older adults with insomnia found a shorter time to fall asleep, while the evidence for longer total sleep time was not reliable. The trials had moderate-to-high risk of bias, so magnesium is not a proven sleep fix.",
      },
    },
    {
      "@type": "Question",
      name: "Is magnesium glycinate or threonate better for sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The two verified reviews do not answer that question. They evaluate magnesium intake or supplementation broadly and do not establish that glycinate or threonate is the better form for sleep. A form-specific recommendation would go beyond these sources.",
      },
    },
    {
      "@type": "Question",
      name: "Does magnesium increase deep sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These reviews do not establish that magnesium increases deep sleep or improves sleep architecture. Their findings cover measures such as sleep onset, total sleep time, sleep quality, and observational links with sleep patterns. That is not enough to promise deeper sleep.",
      },
    },
    {
      "@type": "Question",
      name: "Will magnesium improve next-day recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified sources do not show that magnesium improves next-day training recovery. One review considered daytime sleepiness and related sleep measures, but that is different from proving better workout recovery, readiness, or performance the next day.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Magnesium for Sleep: Glycinate vs Threonate and the Evidence",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Magnesium for Sleep: Glycinate vs Threonate and the Evidence",
  description:
    "An evidence-graded look at magnesium for sleep, including what research does and does not show about glycinate, threonate, deep sleep, and recovery.",
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
      name: "The Role of Magnesium in Sleep Health: a Systematic Review of Available Literature",
      author: { "@type": "Person", name: "Arab A" },
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Biological Trace Element Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "35184264" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1007/s12011-022-03162-1",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/35184264/",
        "https://doi.org/10.1007/s12011-022-03162-1",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Oral magnesium supplementation for insomnia in older adults: a Systematic Review & Meta-Analysis",
      author: { "@type": "Person", name: "Mah J" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "BMC Complementary Medicine and Therapies" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33865376" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1186/s12906-021-03297-z",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/33865376/",
        "https://doi.org/10.1186/s12906-021-03297-z",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Magnesium" },
    { "@type": "Thing", name: "Sleep" },
    { "@type": "Thing", name: "Recovery" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  finding: string;
  source: string;
  grade: string;
  gradeLabel: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Falling asleep sooner",
    population: "151 older adults with insomnia across three randomized trials",
    finding: "The pooled result favored magnesium, but the evidence quality was low to very low.",
    source: "Mah et al., 2021",
    grade: "B",
    gradeLabel: "Moderate design, low certainty",
  },
  {
    question: "Longer total sleep time",
    population: "Older adults with insomnia",
    finding: "The pooled improvement was not reliable.",
    source: "Mah et al., 2021",
    grade: "B",
    gradeLabel: "Moderate design, no clear benefit",
  },
  {
    question: "Better sleep patterns with higher magnesium status",
    population: "Adults in observational studies",
    finding: "The review found associations, which cannot prove magnesium caused the difference.",
    source: "Arab et al., 2023",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "Glycinate or threonate works better",
    population: "No form-specific comparison in the verified reviews",
    finding: "Not established by these sources.",
    source: "Both verified reviews",
    grade: "Insufficient",
    gradeLabel: "No eligible comparison",
  },
  {
    question: "Deeper sleep or better next-day recovery",
    population: "No direct evidence in the verified reviews",
    finding: "Not established by these sources.",
    source: "Both verified reviews",
    grade: "Insufficient",
    gradeLabel: "No eligible outcome",
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

export default function MagnesiumSleepPage() {
  return (
    <>
      <JsonLd id="magnesium-sleep-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="magnesium-sleep-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Magnesium for sleep: glycinate, threonate, and what the evidence supports
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Magnesium gets talked about like a guaranteed shortcut to deeper sleep and
            better recovery. The research is more modest, especially when you ask which
            form actually works.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Magnesium may help some older adults with insomnia fall asleep sooner, but
            the overall evidence is limited and uncertain. The verified research does
            not show that glycinate or threonate improves deep-sleep architecture or
            next-day recovery.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That makes this a possible small assist, not a proven sleep fix. These
            reviews cannot tell you whether a supplement would change your sleep at all,
            much less which form to choose.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="magnesium sleep" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about magnesium for sleep?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two systematic reviews point in the same cautious direction: observational
            links look promising, while intervention results remain uncertain. One
            meta-analysis pooled three randomized trials in 151 older adults with
            insomnia and found faster sleep onset, but every trial carried a
            moderate-to-high risk of bias.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Finding" className="py-3 pr-4 text-mute">{row.finding}</td>
                    <td data-label="Source" className="py-3 pr-4 whitespace-nowrap">{row.source}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grades reflect study design. They do not erase problems inside a study,
            which is why the table also keeps the authors&apos; low-certainty warning in
            view. Read more about the grading approach in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does magnesium help you fall asleep faster?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It may help a narrow group. The Mah and Pitre meta-analysis found a
            shorter sleep-onset time after supplementation in older adults with
            insomnia. That is useful evidence, but it does not tell us that a healthy
            40-year-old professional will get the same result or that one magnesium
            form is responsible.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the analysis included only three randomized trials
            and 151 people. The authors rated the evidence low to very low quality and
            every trial had a moderate-to-high risk of bias. See the{" "}
            <PubMedLink pmid="33865376">Mah and Pitre review</PubMedLink>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does magnesium increase total or deep sleep?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The evidence does not show a reliable increase in total sleep time, and
            these sources do not establish an improvement in deep sleep. One pooled
            analysis favored magnesium for total sleep time, but the difference was
            not reliable. Claims about better sleep architecture go beyond what these
            reviews can support.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the broader{" "}
            <PubMedLink pmid="35184264">Arab et al. review</PubMedLink> found
            associations between magnesium status and several sleep measures in
            observational studies, while randomized trials remained uncertain.
            Association is not proof that magnesium caused better sleep.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is magnesium glycinate or threonate better for sleep?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These two verified reviews cannot pick a winner. They evaluate magnesium
            intake or supplementation broadly, not a clean head-to-head comparison of
            glycinate and threonate. Product labels and form-specific marketing may
            sound precise, but that precision is not present in the evidence used on
            this page.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this is an evidence gap, not proof that the forms are
            identical. It means a recommendation for one over the other needs a
            different, directly verified source.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Will magnesium improve next-day recovery?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified sources do not answer that performance question. They examine
            sleep measures, including sleep onset, sleep duration, and daytime
            sleepiness, but they do not prove better training readiness or recovery the
            next day. Feeling less tired and recovering better from training are not
            interchangeable outcomes.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> no direct recovery outcome means no recovery claim.
            Protect the basics you can measure first: enough time in bed, consistent
            training, and nutrition that supports the work.
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
            Build the sleep routine before the supplement stack
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If work keeps pushing sleep to the edge of your day, coaching can help you
            fit training, food, and recovery into the schedule you actually have —
            without pretending a supplement can carry the whole plan.
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
            content only — not medical advice, and not a diagnosis or treatment for
            any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

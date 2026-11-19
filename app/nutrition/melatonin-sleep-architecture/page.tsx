import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/melatonin-sleep-architecture";
const PUBLISHED = "2026-08-03";
const REVIEWED = "2026-08-03";

export const metadata: Metadata = {
  title: "Melatonin Sleep Architecture: What It Actually Does | Geebs",
  description:
    "Melatonin helps time the sleep-wake cycle, but it does not replace consistent sleep habits. See what research says about REM, NREM, and sleep onset.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Melatonin Sleep Architecture: What It Actually Does",
    description:
      "How melatonin helps align sleep timing, what receptor research suggests about REM and NREM sleep, and where the evidence stops.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Melatonin and sleep architecture — what the research supports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melatonin Sleep Architecture: What It Actually Does",
    description:
      "Melatonin is a timing signal, not a replacement for a consistent sleep routine. Here is what the evidence supports.",
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
      name: "Does melatonin change sleep architecture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may influence sleep architecture through MT1 and MT2 receptors, which researchers connect with REM and NREM sleep. But the verified source is a narrative review that draws partly on animal and receptor research. It does not prove that taking a melatonin supplement reliably increases deep sleep or improves a healthy adult's nightly sleep stages.",
      },
    },
    {
      "@type": "Question",
      name: "Is melatonin a sleeping pill or a body-clock signal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think of melatonin first as a body-clock signal. Researchers describe it as a regulator of the sleep-wake cycle, with effects tied to when melatonin rises and how its receptors respond. That is different from treating it like a sedative that can force sleep regardless of light exposure, schedule, stress, or time in bed.",
      },
    },
    {
      "@type": "Question",
      name: "Can melatonin help you fall asleep sooner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It may support sleep onset when body-clock timing is part of the problem, but these two reviews do not establish a specific benefit, dose, or schedule for healthy adults. They support melatonin's role in sleep timing and regulation. They do not justify a promise that a supplement will make every person fall asleep faster.",
      },
    },
    {
      "@type": "Question",
      name: "Can melatonin replace healthy sleep habits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. These reviews explain melatonin biology; they do not show that a supplement cancels out an inconsistent bedtime, bright light late at night, too little time in bed, or a sleep environment that keeps waking you. Protect those basics first, then treat melatonin as a possible timing aid rather than the foundation of your sleep plan.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Melatonin Sleep Architecture: What It Actually Does",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Melatonin Sleep Architecture: What It Actually Does",
  description:
    "An evidence-graded look at melatonin as a circadian timing signal, what receptor research suggests about REM and NREM sleep, and why sleep habits still come first.",
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
      name: "Melatonin, Melatonin Receptors and Sleep: Moving Beyond Traditional Views",
      author: { "@type": "Person", name: "Comai S" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Journal of Pineal Research" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "39400423" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1111/jpi.13011",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/39400423/",
        "https://doi.org/10.1111/jpi.13011",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Melatonin Moderates the Triangle of Chronic Pain, Sleep Architecture and Immunometabolic Traffic",
      author: { "@type": "Person", name: "Chaudhry SR" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Biomedicines" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "34440187" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/biomedicines9080984",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/34440187/",
        "https://doi.org/10.3390/biomedicines9080984",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Melatonin" },
    { "@type": "Thing", name: "Sleep architecture" },
    { "@type": "Thing", name: "Circadian rhythm" },
  ],
};

type EvidenceRow = {
  question: string;
  evidenceBase: string;
  finding: string;
  source: string;
  grade: "D" | "Insufficient";
  gradeLabel: string;
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Melatonin helps regulate sleep-wake timing",
    evidenceBase: "Narrative review of human, animal, and receptor research",
    finding:
      "Supported as biology, but the review does not establish a supplement dose or the size of a sleep-onset benefit.",
    source: "Comai et al., 2024",
    grade: "D",
    gradeLabel: "Weak, mechanistic",
  },
  {
    question: "MT1 and MT2 receptors may shape REM and NREM sleep",
    evidenceBase: "Narrative review drawing partly on receptor and knockout-mouse studies",
    finding:
      "A plausible receptor-level role, not proof that a supplement improves sleep stages in healthy adults.",
    source: "Comai et al., 2024",
    grade: "D",
    gradeLabel: "Weak, mechanistic",
  },
  {
    question: "Melatonin connects sleep physiology with pain and immune signaling",
    evidenceBase: "Narrative review of mixed preclinical and human literature",
    finding:
      "The pathways overlap, but dedicated randomized trials of the combined claim were not available.",
    source: "Chaudhry et al., 2021",
    grade: "D",
    gradeLabel: "Weak, mechanistic",
  },
  {
    question: "A melatonin supplement replaces consistent sleep habits",
    evidenceBase: "Not tested by either verified review",
    finding: "Not established. A timing signal cannot create enough time in bed or a stable routine.",
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

export default function MelatoninSleepArchitecturePage() {
  return (
    <>
      <JsonLd id="melatonin-sleep-architecture-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="melatonin-sleep-architecture-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Melatonin sleep architecture: what it actually does
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Melatonin gets treated like an off switch for sleep. Its better-supported
            role is as a timing signal that helps your body line up sleep with the
            night.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Melatonin works mainly as a chronobiotic: a signal that helps align your
            circadian rhythm with the intended sleep window. It may support sleep onset
            and influence REM and NREM sleep through its receptors, but it does not
            replace enough time in bed, a consistent schedule, or control of late-night
            light.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That distinction matters. The two verified papers explain how melatonin
            participates in sleep regulation and sleep architecture; neither gives us
            a strong trial-based reason to promise deeper sleep, a specific dose, or a
            reliable result for every healthy adult.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="melatonin sleep architecture" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about melatonin and sleep architecture?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The evidence supports melatonin as part of the system that times sleep and
            may shape REM and NREM activity through MT1 and MT2 receptors. But these
            sources are narrative reviews built partly from animal and receptor work,
            so they explain plausible biology better than they prove a supplement
            improves nightly sleep stages.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Evidence base</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Evidence base" className="py-3 pr-4 text-mute">{row.evidenceBase}</td>
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
            Grades reflect study design. Narrative and mechanism-focused reviews cannot
            earn the same grade as randomized trials. Read how the grades work in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is melatonin a sleeping pill or a body-clock signal?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Think of it first as a body-clock signal. The Comai and Gobbi review
            describes melatonin as a regulator of the sleep-wake cycle whose effects
            depend on MT1 and MT2 receptors across brain regions involved in sleep.
            That is different from a sedative that simply forces you unconscious on
            demand.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the{" "}
            <PubMedLink pmid="39400423">Comai and Gobbi review</PubMedLink> combines
            human, animal, and receptor research. It gives a useful model of sleep
            regulation, but it does not establish a practical supplement dose or
            quantify how much sooner a healthy adult will fall asleep.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Can melatonin help you fall asleep sooner?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            It may support sleep onset when body-clock timing is part of the problem,
            because melatonin helps signal the intended sleep window. These reviews do
            not establish a specific benefit, dose, or schedule for healthy adults,
            though. They support the timing role without promising that every person
            will fall asleep faster.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> neither verified paper is a randomized trial of a
            melatonin supplement in healthy professionals. That means this page cannot
            tell you how many minutes it saves, which dose to take, or whether the same
            result applies when stress, caffeine, or an inconsistent schedule is the
            bigger issue.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does melatonin reliably increase deep sleep?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These sources do not prove that taking melatonin reliably increases deep
            sleep. They discuss possible roles for MT1 receptors in REM sleep and MT2
            receptors in NREM sleep, but much of that case comes from receptor and
            animal research. A mechanism is useful context, not a guaranteed outcome.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the{" "}
            <PubMedLink pmid="34440187">Chaudhry et al. review</PubMedLink> also says
            much of the literature behind its combined sleep, pain, and immune-signaling
            model is experimental, with sparse dedicated clinical research. That is a
            reason to keep the claim narrow.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Can melatonin replace healthy sleep habits?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No. A timing signal cannot create enough time in bed, hold your wake time
            steady, dim bright light at night, or fix a room that keeps waking you.
            Build those sleep-hygiene basics first, then view melatonin as a possible
            assist when timing is the actual problem—not the foundation of the plan.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> neither review compares melatonin with a complete sleep
            routine. The practical order here is a coaching judgment, not a head-to-head
            trial result. If you are already working on sleep, the{" "}
            <Link href="/nutrition/magnesium-sleep" className="underline hover:text-bone">
              magnesium and sleep evidence review
            </Link>{" "}
            uses the same evidence-first approach.
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
            Build a sleep routine that survives a busy week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If work keeps pushing sleep, training, and meals into random hours,
            coaching can help you build a routine around the schedule you actually have
            without pretending one supplement can carry the plan.
          </p>
          <div className="mt-7">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
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

import type { Metadata } from "next";
import EvidenceVerdict from "@/components/EvidenceVerdict";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/beta-alanine-recovery";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Beta-Alanine and Recovery: What It Actually Helps | Geebs",
  description:
    "Beta-alanine raises muscle carnosine and may help you sustain hard 1–4 minute efforts. Here is what that means for training, recovery, dose, and side effects.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Beta-Alanine and Recovery: What It Actually Helps",
    description:
      "Where beta-alanine fits: muscle carnosine, hard 1–4 minute efforts, practical dosing, and the honest limits of the evidence.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Beta-alanine, muscular endurance, and recovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beta-Alanine and Recovery: What It Actually Helps",
    description:
      "A practical, evidence-graded look at beta-alanine for hard 1–4 minute efforts.",
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
      name: "Does beta-alanine help recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Its clearest role is helping muscle handle the acid buildup that comes with hard efforts, not serving as a general recovery fix. The practical payoff is the possibility of sustaining high-intensity work a little longer, especially when an effort lasts roughly 1–4 minutes. The verified source does not establish that beta-alanine reduces soreness or speeds recovery between training days.",
      },
    },
    {
      "@type": "Question",
      name: "How does beta-alanine work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beta-alanine combines with histidine to increase carnosine inside skeletal muscle. Carnosine helps buffer hydrogen ions that build up during hard exercise. That mechanism is why beta-alanine is discussed for muscular endurance during high-intensity efforts rather than for easy aerobic work or everyday energy.",
      },
    },
    {
      "@type": "Question",
      name: "What dose of beta-alanine is used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The verified review describes 2–6 grams per day, split into smaller doses to reduce tingling. That is a range reported in a narrative review, not a personalized prescription. Start with the evidence quality, your training demands, and a conversation with a qualified clinician if you have a medical condition or take medication.",
      },
    },
    {
      "@type": "Question",
      name: "Why does beta-alanine make my skin tingle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tingling sensation is called paresthesia. The verified review recommends dividing the daily amount into smaller doses to minimize it. Tingling is not evidence that the supplement is working better, so there is no reason to chase a stronger sensation.",
      },
    },
    {
      "@type": "Question",
      name: "Who is beta-alanine most relevant for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is most relevant when training includes hard efforts that last about 1–4 minutes, such as demanding intervals or sustained high-rep work. If your program is mostly easy cardio or short sets with long rests, this page's verified evidence gives you less reason to expect a meaningful payoff.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Beta-Alanine and Recovery: What It Actually Helps",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Beta-Alanine and Recovery: What It Actually Helps",
  description:
    "An evidence-graded guide to beta-alanine, muscle carnosine, high-intensity muscular endurance, practical dosing, and the limits of recovery claims.",
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
      name: "The Top 5 Can't-Miss Sport Supplements",
      author: { "@type": "Person", name: "Antonio J" },
      datePublished: "2024",
      isPartOf: { "@type": "Periodical", name: "Nutrients" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "39408214" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/nu16193247",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/39408214/",
        "https://doi.org/10.3390/nu16193247",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Beta-alanine" },
    { "@type": "Thing", name: "Muscle carnosine" },
    { "@type": "Thing", name: "Muscular endurance" },
  ],
};

type EvidenceRow = {
  question: string;
  population: string;
  amountOrEffort: string;
  verdict: string;
  source: string;
  grade: "D";
  gradeLabel: "Weak";
};

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    question: "Does it raise muscle carnosine?",
    population: "Active adults discussed across a narrative review",
    amountOrEffort: "2–6 g beta-alanine daily",
    verdict: "Supported as the mechanism behind its performance role.",
    source: "Antonio et al., 2024",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "When might performance improve?",
    population: "People doing high-intensity exercise",
    amountOrEffort: "Efforts lasting about 1–4 minutes",
    verdict: "This is the window the review identifies as most relevant.",
    source: "Antonio et al., 2024",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "How can tingling be reduced?",
    population: "Adults using beta-alanine",
    amountOrEffort: "Split a 2–6 g daily amount into smaller doses",
    verdict: "Divided doses are recommended to minimize paresthesia.",
    source: "Antonio et al., 2024",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    question: "Does it improve broad workout recovery?",
    population: "Healthy active adults",
    amountOrEffort: "No verified recovery protocol",
    verdict: "Not established by the source used on this page.",
    source: "Antonio et al., 2024",
    grade: "D",
    gradeLabel: "Weak",
  },
];

function PubMedLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="https://pubmed.ncbi.nlm.nih.gov/39408214/"
      className="underline hover:text-bone"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default function BetaAlanineRecoveryPage() {
  return (
    <>
      <JsonLd id="beta-alanine-recovery-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="beta-alanine-recovery-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Beta-alanine and recovery: what it actually helps
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Beta-alanine gets filed under recovery because it can help you hold
            onto muscular endurance when training gets uncomfortable. Its actual
            role is narrower: it raises muscle carnosine, which helps buffer the
            hydrogen ions produced during hard efforts.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>Beta-alanine is best supported as a muscular-endurance aid, not a
            general recovery supplement.</b> It increases carnosine inside
            skeletal muscle, which helps buffer hydrogen ions during
            high-intensity work and may help you sustain efforts lasting roughly
            1–4 minutes.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That makes it more relevant for hard intervals, conditioning rounds,
            and sustained high-rep work than for soreness, easy cardio, or a
            normal strength set with a long rest. The verified source for this
            page does not establish faster recovery between training days.
          </p>
        </section>

        <div className="hair my-10" />

        {/* The grade was the last column of a six-column table. It is

            the only thing most readers came for. */}

        <EvidenceVerdict rows={EVIDENCE_ROWS} subject="beta alanine recovery" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does the evidence say about beta-alanine and recovery?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The clearest finding is about performance during hard efforts, not
            broad recovery afterward. A 2024 narrative review in Nutrients (
            <PubMedLink>Antonio et al., PMID 39408214</PubMedLink>) describes
            higher muscle carnosine, hydrogen-ion buffering, and performance
            improvements centered on high-intensity efforts lasting 1–4 minutes.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this is a narrative review, not a systematic
            review, meta-analysis, or randomized trial. It does not provide one
            pooled number for the size of the benefit, and it does not prove that
            beta-alanine reduces soreness or improves day-to-day recovery. Under
            this library&apos;s
            grading rules, every claim below stays at D — weak.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Question</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Population</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Amount or effort</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Source</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {EVIDENCE_ROWS.map((row) => (
                  <tr key={row.question} className="border-t border-bone/10 align-top">
                    <td data-label="Question" className="py-3 pr-4">{row.question}</td>
                    <td data-label="Population" className="py-3 pr-4 text-mute">{row.population}</td>
                    <td data-label="Amount or effort" className="py-3 pr-4 text-mute">{row.amountOrEffort}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
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
            The grade follows the study design, not how plausible the mechanism
            sounds. Read the full grading approach in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How does beta-alanine help muscular endurance?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Beta-alanine combines with histidine to raise carnosine inside
            skeletal muscle. Carnosine helps buffer the hydrogen ions that build
            up when the effort is hard enough to rely heavily on anaerobic
            glycolysis. In plain English: it may help you keep producing useful
            work for a little longer before the burn forces output down.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That is a performance mechanism. It should not be confused with
            rebuilding muscle tissue, replacing sleep, or making a poorly planned
            week easier to recover from.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Which workouts fit the 1–4 minute window?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Think hard bike or rower intervals, conditioning circuits, and
            sustained high-rep work where one effort stays difficult for about a
            minute or longer. Those sessions create the kind of hydrogen-ion
            buildup that makes extra muscle buffering relevant. A five-second
            sprint or a comfortable 40-minute walk is a different demand.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The supplement is only worth considering if that training demand
            appears often enough in your program. For ordinary strength progress,
            the broader foundation still matters more. The same principle applies
            to{" "}
            <Link
              href="/blog/creatine-for-men-over-30"
              className="underline hover:text-bone"
            >
              choosing creatine for your actual training goal
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How much beta-alanine does the review describe?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The verified review describes 2–6 grams per day, divided into smaller
            doses to reduce paresthesia — the familiar skin-tingling sensation.
            That number belongs to the review&apos;s summary of common use. It is not
            a personalized prescription and does not make a weak evidence grade
            stronger.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Tingling is a side effect, not a scorecard. A stronger sensation does
            not mean a better workout, and divided doses are the practical way
            the review suggests minimizing it.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Is beta-alanine worth adding for recovery?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Add it only when the real goal is repeated high-intensity performance
            and your program regularly asks for hard 1–4 minute efforts. Do not
            buy it because the word recovery appears on a label. This page&apos;s
            verified evidence does not show a general benefit for soreness,
            sleep, or recovery between training days.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> the page has one verified, directly relevant
            narrative review. A stronger recommendation would need a systematic
            review or multiple randomized trials tied to the exact outcome you
            care about. Until then, treat beta-alanine as an optional performance
            tool for a specific kind of work.
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
            Put the supplement in the right place
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Supplements work best when they solve a real programming need. If
            your training, meals, and recovery week are still inconsistent, that
            is where the bigger return lives. Coaching helps you build that week
            around the job and life you actually have.
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
            content only — not medical advice, and not a diagnosis or treatment
            for any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

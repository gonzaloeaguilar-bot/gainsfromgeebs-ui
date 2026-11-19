import type { Metadata } from "next";
import Link from "next/link";

import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/ashwagandha-vs-tongkat-ali";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Ashwagandha vs Tongkat Ali for Testosterone | Geebs",
  description:
    "Ashwagandha and tongkat ali each have one relevant randomized trial. Here is what they found, who was studied, and why neither supplement is settled.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Ashwagandha vs Tongkat Ali for Testosterone: An Honest Comparison",
    description:
      "Both supplements have a real trial behind them. Neither has enough evidence to call the question settled.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwagandha versus tongkat ali evidence comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwagandha vs Tongkat Ali for Testosterone",
    description:
      "The relevant trial for each supplement, the evidence grade, and the limits Reddit threads tend to skip.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type TrialRow = {
  supplement: string;
  population: string;
  dose: string;
  duration: string;
  finding: string;
  grade: "C";
  gradeLabel: "Early";
  pmid: string;
  doi: string;
};

const TRIAL_ROWS: TrialRow[] = [
  {
    supplement: "Ashwagandha",
    population: "57 overweight men, ages 40–70, with mild fatigue",
    dose: "Extract delivering 21 mg withanolide glycosides daily",
    duration: "8 weeks per crossover period",
    finding:
      "A 14.7% greater testosterone increase than placebo; no between-group benefit for fatigue, vigor, or sexual well-being",
    grade: "C",
    gradeLabel: "Early",
    pmid: "30854916",
    doi: "10.1177/1557988319835985",
  },
  {
    supplement: "Tongkat ali",
    population: "45 men, average age 47, with age-related androgen deficiency",
    dose: "200 mg Eurycoma longifolia daily",
    duration: "6 months",
    finding:
      "The combination with concurrent training increased total testosterone and improved erectile function; the strongest results came from the combined group",
    grade: "C",
    gradeLabel: "Early",
    pmid: "33541567",
    doi: "10.1016/j.maturitas.2020.12.002",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is ashwagandha or tongkat ali better for testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is not enough evidence to name a winner. Each supplement has one relevant randomized trial, the studies used different populations and designs, and neither trial compared ashwagandha with tongkat ali. Both therefore receive a C, or early, evidence grade.",
      },
    },
    {
      "@type": "Question",
      name: "What do Reddit experiences prove about these supplements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A personal report can tell you what one person noticed, but it cannot separate the supplement from training, sleep, diet, expectations, or normal hormone variation. Reddit can surface useful questions. It cannot replace a controlled trial or show which supplement works better.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take ashwagandha and tongkat ali together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These two trials did not test the supplements together, so they cannot establish the benefit or safety of a stack. Adding both also makes it harder to know what caused any change. Discuss supplements with a qualified clinician if you take medication or have symptoms you are trying to address.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use a testosterone supplement before fixing sleep and training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No supplement trial makes inconsistent sleep, training, protein intake, or calorie control irrelevant. Build those basics first. If symptoms make you concerned about your hormones, get medical evaluation instead of trying to diagnose the issue from a supplement response.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Ashwagandha vs Tongkat Ali for Testosterone: An Honest Comparison",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ashwagandha vs Tongkat Ali for Testosterone: An Honest Comparison",
  description:
    "A head-to-head reading of the relevant randomized trial for each supplement, with visible evidence grades and practical limits.",
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
      name: "A Randomized, Double-Blind, Placebo-Controlled, Crossover Study Examining the Hormonal and Vitality Effects of Ashwagandha (Withania somnifera) in Aging, Overweight Males",
      author: { "@type": "Person", name: "Lopresti AL" },
      datePublished: "2019",
      isPartOf: { "@type": "Periodical", name: "American Journal of Men's Health" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "30854916" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1177/1557988319835985",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/30854916/",
        "https://doi.org/10.1177/1557988319835985",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A 6-month, double-blind, placebo-controlled, randomized trial to evaluate the effect of Eurycoma longifolia (Tongkat Ali) and concurrent training on erectile function and testosterone levels in androgen deficiency of aging males (ADAM)",
      author: { "@type": "Person", name: "Leitão AE" },
      datePublished: "2021",
      isPartOf: { "@type": "Periodical", name: "Maturitas" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "33541567" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1016/j.maturitas.2020.12.002",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/33541567/",
        "https://doi.org/10.1016/j.maturitas.2020.12.002",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Ashwagandha" },
    { "@type": "Thing", name: "Tongkat ali" },
    { "@type": "Thing", name: "Testosterone" },
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

export default function AshwagandhaVsTongkatAliPage() {
  return (
    <>
      <JsonLd id="ashwagandha-tongkat-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="ashwagandha-tongkat-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Ashwagandha vs tongkat ali for testosterone
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Both have a real human trial behind them. Neither has enough evidence
            to call the question settled, and no trial has compared them directly.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>There is no evidence-based winner between ashwagandha and tongkat
            ali for testosterone.</b> Each has one relevant randomized trial, so
            each earns a C, or early, evidence grade. Ashwagandha has the cleaner
            supplement-versus-placebo signal; tongkat ali was tested alongside a
            training comparison in men with age-related androgen deficiency.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That is enough to make both interesting, not enough to choose one from
            a Reddit thread and expect a predictable result. The studies involved
            different men, doses, durations, and designs. A cross-study comparison
            is not a head-to-head contest.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What did each testosterone trial actually test?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The ashwagandha trial studied overweight men with mild fatigue. The
            tongkat ali trial studied men with age-related androgen deficiency
            and included concurrent training. Those population and design
            differences matter more than comparing the headline result from one
            abstract with the headline result from the other.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14px] md:text-[15px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Trial</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Dose and duration</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Finding</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {TRIAL_ROWS.map((row) => (
                  <tr key={row.supplement} className="border-t border-bone/10 align-top">
                    <td data-label="Trial" className="py-3 pr-4 min-w-[180px]">
                      <b>{row.supplement}</b>
                      <span className="block mt-1 text-mute">{row.population}</span>
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
                    </td>
                    <td data-label="Dose and duration" className="py-3 pr-4 min-w-[180px]">
                      {row.dose}
                      <span className="block mt-1 text-mute">{row.duration}</span>
                    </td>
                    <td data-label="Finding" className="py-3 pr-4 min-w-[260px] text-mute">{row.finding}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            Grade C means one randomized trial. Grades come from study design,
            not from how exciting the result sounds. Read the full grading method
            in the{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does ashwagandha raise testosterone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            One randomized crossover trial says it may. Lopresti and colleagues
            enrolled 57 overweight men ages 40–70 with mild fatigue. After eight
            weeks, the ashwagandha period produced a 14.7% greater testosterone
            increase than placebo. The extract delivered 21 mg of withanolide
            glycosides per day (
            <PubMedLink pmid="30854916">Lopresti et al., 2019</PubMedLink>).
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> 50 men completed the first eight-week period and
            43 completed the full 16-week crossover. The trial found no reliable
            between-group improvement in fatigue, vigor, or sexual well-being.
            One small trial in a specific group is a signal to study, not a
            settled outcome for healthy men generally. Read the full deep-dive in our guide to{" "}
            <Link href="/science/ashwagandha-and-testosterone" className="underline hover:text-bone">
              Ashwagandha and Testosterone clinical trial evidence
            </Link>.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does tongkat ali raise testosterone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            One six-month randomized trial found that 200 mg of tongkat ali,
            combined with concurrent training, increased total testosterone and
            improved erectile function. It enrolled 45 men averaging 47 years
            old with age-related androgen deficiency, and the strongest results
            appeared in the combined supplement-and-training group (
            <PubMedLink pmid="33541567">Leitão et al., 2021</PubMedLink>).
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this was a four-arm study in a clinical
            population, not a clean comparison with ashwagandha or a trial in
            healthy men choosing between supplements. The groups were small,
            training was part of the design, and the best-performing group did
            both. That cannot predict what tongkat ali would do for you.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Which one should a busy man try first?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Neither is the first lever. Before testing a supplement, get several
            weeks of consistent sleep, resistance training, protein intake, and
            calorie control. That gives you a stable baseline and works on the
            outcomes most people actually want: better training, recovery, and
            body composition.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            If you still run an experiment, change one thing at a time and do not
            treat how you feel as proof of a hormone change. If symptoms concern
            you, talk to a clinician rather than using a supplement as a home
            diagnostic test. For another example of evidence grading over online
            hype, see{" "}
            <Link
              href="/nutrition/growth-hormone-foods"
              className="underline hover:text-bone"
            >
              foods and growth hormone
            </Link>
            .
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
            Build the foundation before chasing the edge
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A supplement can be an experiment. It cannot organize a training
            week, protect your sleep when work runs late, or make your nutrition
            consistent. That is the work coaching is built to solve.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="nutrition_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See how evidence gets graded
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

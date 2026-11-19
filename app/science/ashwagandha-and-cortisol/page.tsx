import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import TitanForgeShopNote from "@/components/TitanForgeShopNote";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/ashwagandha-and-cortisol";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-10-08";

const TITLE = "Ashwagandha and Cortisol: What 23 Trials Found, and the Dose";
const DESCRIPTION =
  "Does ashwagandha lower cortisol? In stressed adults, yes: a 2026 meta-analysis of 23 trials found a clear drop. Trials used 240 to 600 mg a day for 8 to 13 weeks. PubMed IDs for each.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Ashwagandha and cortisol: what the human trials found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type Source = {
  pmid: string;
  doi?: string;
  firstAuthor: string;
  year: string;
  journal: string;
  title: string;
};

/** Every figure on this page is read from these abstracts (PubMed, 2026-10-08). */
const SOURCES: Source[] = [
  {
    pmid: "41740946",
    doi: "10.1055/a-2802-8363",
    firstAuthor: "Fornalik M",
    year: "2026",
    journal: "Planta Med",
    title: "Hormonal Modulation with Withania somnifera: Systematic Review and Meta-Analysis of Randomized-controlled Trials.",
  },
  {
    pmid: "40746175",
    doi: "10.1177/02601060251363647",
    firstAuthor: "Albalawi AA",
    year: "2025",
    journal: "Nutr Health",
    title: "Dual impact of Ashwagandha: Significant cortisol reduction but no effects on perceived stress - A systematic review and meta-analysis.",
  },
  {
    pmid: "23439798",
    doi: "10.4103/0253-7176.106022",
    firstAuthor: "Chandrasekhar K",
    year: "2012",
    journal: "Indian J Psychol Med",
    title: "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults.",
  },
  {
    pmid: "32021735",
    doi: "10.7759/cureus.6466",
    firstAuthor: "Salve J",
    year: "2019",
    journal: "Cureus",
    title: "Adaptogenic and Anxiolytic Effects of Ashwagandha Root Extract in Healthy Adults: A Double-blind, Randomized, Placebo-controlled Clinical Study.",
  },
  {
    pmid: "31517876",
    doi: "10.1097/MD.0000000000017186",
    firstAuthor: "Lopresti AL",
    year: "2019",
    journal: "Medicine (Baltimore)",
    title: "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract: A randomized, double-blind, placebo-controlled study.",
  },
  {
    pmid: "34858513",
    doi: "10.1155/2021/8254344",
    firstAuthor: "Gopukumar K",
    year: "2021",
    journal: "Evid Based Complement Alternat Med",
    title: "Efficacy and Safety of Ashwagandha Root Extract on Cognitive Functions in Healthy, Stressed Adults: A Randomized, Double-Blind, Placebo-Controlled Study.",
  },
  {
    pmid: "31991029",
    doi: "10.1111/liv.14393",
    firstAuthor: "Björnsson HK",
    year: "2020",
    journal: "Liver Int",
    title: "Ashwagandha-induced liver injury: A case series from Iceland and the US Drug-Induced Liver Injury Network.",
  },
];

type TrialRow = {
  study: string;
  people: string;
  dose: string;
  length: string;
  cortisol: string;
  pmid: string;
};

const TRIALS: TrialRow[] = [
  {
    study: "Lopresti et al. 2019",
    people: "60 stressed, healthy adults",
    dose: "240 mg once a day",
    length: "60 days",
    cortisol: "Morning cortisol fell more than on placebo (P < .001)",
    pmid: "31517876",
  },
  {
    study: "Salve et al. 2019",
    people: "60 stressed, healthy adults",
    dose: "250 mg or 600 mg a day, split in two",
    length: "8 weeks",
    cortisol: "Fell on both doses (250 mg: P < 0.05; 600 mg: P < 0.0001)",
    pmid: "32021735",
  },
  {
    study: "Gopukumar et al. 2021",
    people: "130 stressed, healthy adults",
    dose: "300 mg sustained-release, once a day",
    length: "90 days",
    cortisol: "Lower than placebo at the end (P = 0.0443)",
    pmid: "34858513",
  },
  {
    study: "Chandrasekhar et al. 2012",
    people: "64 adults with chronic stress",
    dose: "300 mg twice a day (600 mg)",
    length: "60 days",
    cortisol: "Fell substantially vs. placebo (P = 0.0006)",
    pmid: "23439798",
  },
];

const faqs = [
  {
    question: "Does ashwagandha lower cortisol?",
    answer:
      "In stressed adults, the pooled trials say yes. A 2026 meta-analysis of 23 randomized trials (1,706 people) found a clear drop in cortisol (PMID 41740946), and a 2025 meta-analysis of 7 cortisol trials found an average fall of 1.16 µg/dL (PMID 40746175).",
  },
  {
    question: "How much ashwagandha lowers cortisol?",
    answer:
      "The trials that lowered cortisol used 240 to 600 mg a day of a root extract, either once a day or split morning and evening. In the only trial that compared doses, both 250 mg and 600 mg a day lowered cortisol, with the stronger result on 600 mg (PMID 32021735).",
  },
  {
    question: "How long does ashwagandha take to lower cortisol?",
    answer:
      "The trials measured cortisol at 8 weeks, 60 days and 90 days. None of them tested whether it drops sooner, so 8 weeks is the shortest timeline with evidence behind it.",
  },
  {
    question: "If my cortisol drops, will I feel less stressed?",
    answer:
      "Not necessarily. Single trials reported lower stress scores, but when a 2025 meta-analysis pooled them, cortisol fell while perceived stress did not change in a reliable way (PMID 40746175).",
  },
  {
    question: "Who should not take ashwagandha?",
    answer:
      "Talk to a doctor first if you are pregnant, have a thyroid or liver condition, or take any medication. A case series described five people who developed liver injury after taking ashwagandha supplements (PMID 31991029), and the 2026 meta-analysis found a small rise in the thyroid hormone T4 (PMID 41740946).",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
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
      url: `${SITE_URL}/social-preview-coaching.jpg`,
    },
  ],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  citation: SOURCES.map((source) => ({
    "@type": "ScholarlyArticle",
    name: source.title,
    author: { "@type": "Person", name: source.firstAuthor },
    datePublished: source.year,
    isPartOf: { "@type": "Periodical", name: source.journal },
    identifier: [
      { "@type": "PropertyValue", propertyID: "PMID", value: source.pmid },
      ...(source.doi ? [{ "@type": "PropertyValue", propertyID: "DOI", value: source.doi }] : []),
    ],
    sameAs: [`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`],
  })),
  about: [
    { "@type": "Thing", name: "Ashwagandha" },
    { "@type": "Thing", name: "Cortisol" },
    { "@type": "Thing", name: "Stress" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Science", item: `${SITE_URL}/science` },
    { "@type": "ListItem", position: 3, name: "Ashwagandha and Cortisol", item: `${SITE_URL}${SLUG}` },
  ],
};

const H2 = "display text-[24px] leading-[1.12] text-bone md:text-[30px]";
const BODY = "mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]";

function Pmid({ id }: { id: string }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`}
      target="_blank"
      rel="noreferrer"
      className="underline hover:text-bone"
    >
      PMID {id}
    </a>
  );
}

export default function AshwagandhaCortisolSciencePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="article-schema" data={articleSchema} />
      <JsonLd id="faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[850px] px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-bone" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-bone" href="/science">
                Science
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cloudText">Ashwagandha and Cortisol</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Supplement evidence review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Ashwagandha and Cortisol: What 23 Trials Found, and the Dose
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer first: the whole question in one screen. */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            Yes. In stressed adults, ashwagandha lowered cortisol in trials that used 240 to 600 mg a day for 8 to 13 weeks.
          </h2>
          <p className={BODY}>
            The strongest single number: a 2026 meta-analysis pooled 23 randomized, placebo-controlled trials with 1,706 people and found a clear drop in cortisol, with a hint that extracts richer in withanolides may do more (Fornalik et al. 2026, <Pmid id="41740946" />). A 2025 meta-analysis of the 7 trials that measured cortisol directly put the average fall at 1.16 µg/dL (Albalawi 2025, <Pmid id="40746175" />). Two things the same research does not show: that the drop makes people feel less stressed (that result was not reliable once trials were pooled), and that a man with normal cortisol gains anything. The cortisol trials below all enrolled adults who were stressed to begin with.
          </p>
        </section>

        <section aria-labelledby="h2-does-it-lower" className="mt-12">
          <h2 id="h2-does-it-lower" className={H2}>
            Does ashwagandha actually lower cortisol?
          </h2>
          <p className={BODY}>
            In the trials, yes, and the result has held up when they are pooled. Each trial below gave a root extract or a placebo to stressed adults and measured blood cortisol before and after. All four found cortisol lower on ashwagandha than on placebo. The 2026 meta-analysis that pooled 23 trials reached the same answer and added two details worth knowing: the effect may be larger with extracts higher in withanolides, the compounds the extracts are standardized to, and testosterone rose in men (by 57 ng/dL on average) but not in women (<Pmid id="41740946" />). The trials are small, and at least one, Gopukumar et al., lists authors employed by supplement companies. That does not make the results wrong, but it is a reason to read them as promising rather than settled.
          </p>
        </section>

        <section aria-labelledby="h2-dose" className="mt-12">
          <h2 id="h2-dose" className={H2}>
            How much ashwagandha lowers cortisol?
          </h2>
          <p className={BODY}>
            The trials that lowered cortisol used 240 to 600 mg a day of a root extract. The lowest was 240 mg once a day for 60 days (<Pmid id="31517876" />). The only trial that tested two doses side by side gave 250 mg or 600 mg a day for 8 weeks: both lowered cortisol, and 600 mg did so more strongly (<Pmid id="32021735" />). Some trials split the dose morning and evening and some gave it once a day. None compared timing, so there is no evidence that one beats the other.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[620px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Trial</th>
                  <th className="p-3 font-semibold md:p-4">Who</th>
                  <th className="p-3 font-semibold md:p-4">Dose</th>
                  <th className="p-3 font-semibold md:p-4">Length</th>
                  <th className="p-3 font-semibold md:p-4">Cortisol result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {TRIALS.map((row) => (
                  <tr key={row.pmid}>
                    <td className="p-3 font-medium text-bone md:p-4">
                      {row.study}
                      <span className="mt-1 block text-[12px] text-mute">
                        <Pmid id={row.pmid} />
                      </span>
                    </td>
                    <td className="p-3 md:p-4">{row.people}</td>
                    <td className="p-3 md:p-4">{row.dose}</td>
                    <td className="p-3 md:p-4">{row.length}</td>
                    <td className="p-3 md:p-4">{row.cortisol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="h2-how-long" className="mt-12">
          <h2 id="h2-how-long" className={H2}>
            How long does it take to lower cortisol?
          </h2>
          <p className={BODY}>
            Eight weeks is the shortest timeline with evidence behind it. The trials checked cortisol at the end of 8 weeks, 60 days or 90 days, and Salve et al. measured it only at the start and at week 8 (<Pmid id="32021735" />). That design can show cortisol was lower by week 8. It cannot show whether it started falling in week 2 or week 7. So a claim that ashwagandha lowers cortisol &quot;in days&quot; is not something these trials tested. If you are judging whether it works for you, give it the same window the studies did before deciding.
          </p>
        </section>

        <section aria-labelledby="h2-feel" className="mt-12">
          <h2 id="h2-feel" className={H2}>
            Will lower cortisol make you feel less stressed?
          </h2>
          <p className={BODY}>
            Not reliably, and this is the most useful thing on the page. Several single trials reported better scores on stress questionnaires alongside lower cortisol. But when the 2025 meta-analysis pooled six trials that measured perceived stress, the change was not reliable (SMD -0.355, P = 0.40), even though cortisol in the same body of research fell clearly (<Pmid id="40746175" />). A lab number moving and a person feeling different are two separate results. If stress is the real problem, a supplement sits on top of sleep, training load and the rest of your week, not in place of them.
          </p>
        </section>

        <section aria-labelledby="h2-safety" className="mt-12">
          <h2 id="h2-safety" className={H2}>
            Is ashwagandha safe to take for cortisol?
          </h2>
          <p className={BODY}>
            The trials above reported mild or no side effects over 8 to 13 weeks, but they were short and small. Outside the trials, a case series described five people, aged 21 to 62, who developed jaundice and liver injury 2 to 12 weeks after starting ashwagandha supplements; their liver tests returned to normal within 1 to 5 months in the four who were followed up (Björnsson et al. 2020, <Pmid id="31991029" />). The 2026 meta-analysis also found a small rise in the thyroid hormone T4 (<Pmid id="41740946" />). So: if you are pregnant, have a thyroid or liver condition, or take any medication, talk to a doctor before you start.
          </p>
        </section>

        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            The cortisol trials are small (60 to 130 people), short (8 to 13 weeks), done in adults who were stressed at the start, and at least one lists authors employed by supplement makers. Products differ in extract and withanolide content, so a result from one extract does not transfer to every bottle. This page reports what the studies found. It is not medical advice and it is not a reason to treat a health condition yourself.
          </p>
        </section>

        <TitanForgeShopNote
          ingredient="ashwagandha"
          pageSlug={SLUG}
          note="It does, and we keep it off this site on purpose. A page about what a cortisol study found should not double as a page that sells you the pill. What we do link is the rest of the catalog: protein, creatine and the basics."
        />

        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="display text-[24px] leading-[1.12] text-bone md:text-[30px]">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.04] p-5">
                <h3 className="display text-[18px] leading-[1.25] text-bone">{faq.question}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-bone/85">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sources-heading" className="mt-14">
          <h2 id="sources-heading" className="display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            {SOURCES.map((source) => (
              <li key={source.pmid} className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
                <p className="font-medium text-bone">
                  {source.firstAuthor} et al. ({source.year})
                </p>
                <p className="text-[13px] text-mute">
                  {source.title} <em>{source.journal}</em>.
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-cloudText hover:text-bone"
                  >
                    PubMed PMID: {source.pmid}
                  </a>
                  {source.doi && (
                    <a
                      href={`https://doi.org/${source.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-cloudText hover:text-bone"
                    >
                      DOI: {source.doi}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="internal-links-heading" className="mt-14">
          <h2 id="internal-links-heading" className="display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Related reads
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/science/ashwagandha-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Ashwagandha and testosterone</p>
              <p className="mt-1 text-[13px] text-mute">What the trials in men found, and who was studied.</p>
            </Link>
            <Link
              href="/nutrition/ashwagandha-vs-tongkat-ali"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Ashwagandha vs tongkat ali</p>
              <p className="mt-1 text-[13px] text-mute">Two different supplements, two different jobs.</p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium dosage for men</p>
              <p className="mt-1 text-[13px] text-mute">420 mg a day, and the 350 mg limit for pills.</p>
            </Link>
            <Link
              href="/science/sleep-loss-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Sleep loss and testosterone</p>
              <p className="mt-1 text-[13px] text-mute">Why sleep comes before any supplement.</p>
            </Link>
          </div>
        </section>

        <footer className="mt-14 border-t border-cloudText/20 pt-6 text-[13px] leading-[1.6] text-mute">
          <p>
            Written by Kris Oddo (NASM-CPT) for education only. It is not medical advice and does not replace a diagnosis or treatment from a licensed physician. Check with your doctor before starting any supplement.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />
    </main>
  );
}

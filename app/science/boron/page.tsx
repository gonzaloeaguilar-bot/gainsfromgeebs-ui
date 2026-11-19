import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import TitanForgeShopNote from "@/components/TitanForgeShopNote";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/boron";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-10-08";

export const metadata: Metadata = {
  title: "Boron and Testosterone: What the Research Actually Shows",
  description:
    "An evidence-graded read on boron supplementation, testosterone claims, SHBG mechanisms, and what peer-reviewed research actually demonstrates in men.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Boron and Testosterone: What the Research Actually Shows",
    description:
      "Boron gets recommended constantly in testosterone content, but peer-reviewed evidence is weak, inconsistent, and underpowered. Honest read and study breakdown.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Boron and Testosterone — what the research actually shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boron and Testosterone: What the Research Actually Shows",
    description:
      "What boron does for free testosterone, SHBG mechanisms, postmenopausal research misapplications, and honest evidence grades.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  population: string;
  dose: string;
  duration: string;
  effect: string;
  grade: string;
  pmid?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    population: "Healthy men (small trial)",
    dose: "~6-10mg/day",
    duration: "~1 week",
    effect: "Free-T increase reported (magnitude flagged pending verification)",
    grade: "D",
  },
  {
    population: "Male bodybuilders",
    dose: "~2.5mg/day",
    duration: "7 weeks",
    effect: "No effect vs placebo",
    grade: "D",
  },
  {
    population: "Postmenopausal women",
    dose: "3mg/day",
    duration: "short-term",
    effect: "Altered estrogen/testosterone metabolism (mechanism study, PMID 3678698)",
    grade: "D (women only, not male-applicable)",
    pmid: "3678698",
  },
];

const faqs = [
  {
    question: "Does boron actually raise testosterone?",
    answer:
      "The evidence is weak and inconsistent — a couple of very small, short trials in men reported an increase; at least one found nothing. It's not something to build a nutrition plan around.",
  },
  {
    question: "What's a safe boron dose if I want to try it?",
    answer:
      "Doses studied in men have generally been in the single-digit milligrams per day. This isn't medical advice — check with a doctor before adding any supplement, especially if you're on medication.",
  },
  {
    question: "Does boron lower SHBG?",
    answer:
      "There's a plausible mechanism, but this run didn't find a dedicated, well-powered trial confirming it in men. Treat this as unproven until better evidence exists.",
  },
  {
    question: "Why do I see a specific \"28% increase\" number everywhere online?",
    answer:
      "That figure traces back to a small early trial and gets repeated without the context of its size and duration. We're holding that exact number until it's re-verified against the original study.",
  },
  {
    question: "Should boron be part of a testosterone-focused nutrition plan?",
    answer:
      "Given the weak evidence, no — not before training consistency, sleep, protein, and the better-evidenced levers (see the testosterone hub) are handled.",
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
  headline: "Boron and Testosterone: What the Research Actually Shows",
  description:
    "An evidence-graded read on boron supplementation, testosterone claims, SHBG mechanisms, and what peer-reviewed research actually demonstrates in men.",
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
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "Effect of dietary boron on mineral, estrogen, and testosterone metabolism in postmenopausal women",
      author: { "@type": "Person", name: "Nielsen FH" },
      datePublished: "1987",
      isPartOf: { "@type": "Periodical", name: "FASEB Journal" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "3678698" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/3678698/"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Comparative effects of daily and weekly boron supplementation on plasma steroid hormones and proinflammatory cytokines.",
      author: { "@type": "Person", name: "Naghii MR" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "J Trace Elem Med Biol" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "21129941" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/21129941/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Boron" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Nutrition" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Science",
      item: `${SITE_URL}/science`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Boron",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function BoronSciencePage() {
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
            <li className="text-cloudText">Boron</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Compound Entity Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Boron and Testosterone: What the Research Actually Shows
          </h1>
          <p className="mt-4 text-[13px] text-mute">
            By <span className="font-medium text-bone">Kris Oddo</span>, NASM-CPT | Reviewed {REVIEWED}
          </p>
        </header>

        <div className="hair my-8" />

        {/* Answer Block */}
        <section
          aria-labelledby="quick-answer-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-5 md:p-7"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="quick-answer-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            There is no daily requirement for boron, and the adult upper limit is 20 mg a day; the trial behind most testosterone claims used 10 mg a day for one week.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            That trial gave 8 healthy men 10 mg of boron with breakfast for seven days. Free testosterone rose and estradiol fell by day 7 (Naghii et al. 2011, PMID 21129941). Eight men and one week is a starting point, not proof, and nobody has shown the change lasts or matters for muscle. The Food and Nutrition Board found too little data to set a recommended intake for boron at all; its upper limit for adults is 20 mg a day (NIH Office of Dietary Supplements boron fact sheet).
          </p>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Boron gets recommended constantly in testosterone-supplement content, and the evidence doesn&apos;t support the confidence. A couple of small trials in men found short-term increases in free testosterone with doses around 6-10mg/day; at least one trial in male bodybuilders found no effect at a lower dose over seven weeks. The most-cited &quot;boron raises testosterone&quot; studies are small, short, and haven&apos;t been meaningfully replicated at scale. There&apos;s also a well-documented mechanistic study in postmenopausal women (not men) that gets misapplied to male-testosterone claims — worth knowing if you see it cited. Honest read: boron is a low-cost, low-risk mineral with genuinely inconclusive evidence for testosterone in men. It&apos;s not on the list of things coaching would prioritize before training, sleep, and protein are dialed in.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-boron-studies" className="mt-12">
          <h2
            id="h2-boron-studies"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What did the boron-and-testosterone studies actually find?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Research on boron and male testosterone shows mixed, inconsistent outcomes across small pilot trials. While a couple of short-term human studies reported temporary elevations in free testosterone using 6 to 10 mg per day over one week, longer trials in trained weightlifters showed zero hormonal changes. Claims asserting exact percentage jumps trace back to single small cohorts that lack large-scale replication.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Human trials on boron and male testosterone are small, short, and inconsistent, with pilot findings of short-term free testosterone increases failing to replicate in longer resistance-trained cohorts.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-boron-dosage" className="mt-12">
          <h2
            id="h2-boron-dosage"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much boron should a man take, if any?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Supplemental boron doses evaluated in male testosterone research typically range from 2.5 to 10 mg per day. Because human evidence is graded D due to small sample sizes and conflicting results, there is no established optimal dose for hormonal enhancement. Men choosing to experiment generally remain under 10 mg daily.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Supplemental boron dosing for male health lacks an established clinical guideline, as available trials range from 2.5 to 10 mg daily with an overall D evidence grade.
          </blockquote>

          {/* Dosage Table */}
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 font-semibold md:p-4">Study population</th>
                  <th className="p-3 font-semibold md:p-4">Dose</th>
                  <th className="p-3 font-semibold md:p-4">Duration</th>
                  <th className="p-3 font-semibold md:p-4">Reported effect</th>
                  <th className="p-3 font-semibold md:p-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.population} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 font-medium text-bone md:p-4">{row.population}</td>
                    <td className="p-3 md:p-4">{row.dose}</td>
                    <td className="p-3 md:p-4">{row.duration}</td>
                    <td className="p-3 md:p-4">
                      {row.effect}
                      {row.pmid && (
                        <span className="mt-1 block text-[12px] text-mute">
                          PMID:{" "}
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-bone"
                          >
                            {row.pmid}
                          </a>
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-semibold text-bone md:p-4">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-boron-shbg" className="mt-12">
          <h2
            id="h2-boron-shbg"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does boron lower SHBG?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Some researchers hypothesize that boron may alter sex hormone-binding globulin (SHBG) binding affinity, theoretically freeing bound testosterone. However, this remains a mechanistic plausibility from preliminary blood chemistry observations rather than a proven clinical outcome. Dedicated, well-powered SHBG trials in adult men are still lacking before making definitive claims.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            A proposed SHBG-lowering mechanism for boron remains a theoretical hypothesis that requires dedicated, well-powered clinical trials in men before it can be considered proven.
          </blockquote>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="h2-womens-research" className="mt-12">
          <h2
            id="h2-womens-research"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            What does the women&apos;s-health boron research actually show, and does it apply to men?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            A frequently cited 1987 study by Nielsen et al. (PMID 3678698) examined dietary boron&apos;s role in mineral and steroid metabolism. However, this study evaluated postmenopausal women on a low-boron diet supplemented with 3 mg daily. It demonstrated altered estrogen and testosterone retention in mineral-depleted women, not male testosterone optimization.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            The landmark 1987 Nielsen study on boron and steroid metabolism was conducted in postmenopausal women on a mineral-restricted diet, making its findings non-applicable to male testosterone supplementation.
          </blockquote>
        </section>

        {/* Section 5 */}
        <section aria-labelledby="h2-worth-taking" className="mt-12">
          <h2
            id="h2-worth-taking"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is boron worth taking at all?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Boron is inexpensive and low-risk at standard dietary levels, but current research gives low confidence for meaningful testosterone gains. From a coaching perspective, supplementing boron is reasonable to skip unless recommended by a clinician. Priorities like progressive overload, high-quality sleep, and sufficient protein deliver far greater hormonal impact.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 text-[15px] italic text-bone/80">
            Boron is low-cost and low-risk, but given its weak evidence base, it ranks far below training consistency, adequate sleep, and total protein intake for male performance.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Boron is a low-confidence, evidence-grade D dietary mineral when it comes to male testosterone support. Small pilot studies showing short-term free testosterone changes have not been replicated in larger trials, and female metabolic research is frequently misquoted to sell male supplements. This page is for educational purposes only and is not medical advice.
          </p>
        </section>

        <TitanForgeShopNote
          ingredient="boron"
          pageSlug="/science/boron"
          note="Not as a stand-alone product. The Titan Forge shop has no plain boron supplement, so there is nothing to point you to. What the catalog does carry is the basics: protein and creatine."
        />

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.04] p-5"
              >
                <h3 className="text-[17px] font-semibold text-bone">
                  {faq.question}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Citations Module */}
        <section aria-labelledby="sources-heading" className="mt-14">
          <h2
            id="sources-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Verified PubMed &amp; DOI Sources
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-bone/80">
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Nielsen FH, Hunt CD, Mullen LM, Hunt JR. (1987)
              </p>
              <p className="text-[13px] text-mute">
                Effect of dietary boron on mineral, estrogen, and testosterone metabolism in postmenopausal women. <em>FASEB J</em> 1(5): 394-7.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/3678698/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 3678698
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Naghii MR et al. (2011)</p>
              <p className="text-[13px] text-mute">
                Comparative effects of daily and weekly boron supplementation on plasma steroid hormones and proinflammatory cytokines. <em>J Trace Elem Med Biol</em> 25(1): 54-8.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/21129941/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 21129941
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Internal Linking Footer */}
        <section aria-labelledby="internal-links-heading" className="mt-14">
          <h2
            id="internal-links-heading"
            className="display text-[22px] leading-[1.15] text-bone md:text-[26px]"
          >
            Related Nutrition &amp; Hormonal Science
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Testosterone Nutrition Hub</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based nutrition and lifestyle levers for male hormone optimization.
              </p>
            </Link>
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Deficiency restoration, dosage bounds, and clinical evidence breakdown.
              </p>
            </Link>
            <Link
              href="/science/tongkat-ali"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Tongkat Ali Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Aging male trial findings, 200mg dosage data, and podcast claim analysis.
              </p>
            </Link>
            <Link
              href="/nutrition/magnesium-sleep"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium for Sleep &amp; Recovery</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence breakdown on magnesium glycinate, sleep onset, and recovery.
              </p>
            </Link>
            <Link
              href="/science/olive-oil"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Olive Oil &amp; Health Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Cardiovascular research, polyphenols, and dietary lipid evidence.
              </p>
            </Link>
          </div>
        </section>

        {/* Footer Medical Disclaimer */}
        <footer className="mt-14 border-t border-cloudText/20 pt-6 text-[13px] leading-[1.6] text-mute">
          <p>
            This content is produced by Kris Oddo (NASM-CPT) for informational and educational purposes only. It is not intended to provide medical advice or to substitute for medical diagnosis or treatment. Consult a licensed physician before starting any new dietary supplement or altering your healthcare routine.
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

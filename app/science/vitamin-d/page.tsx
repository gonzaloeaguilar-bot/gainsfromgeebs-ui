import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/vitamin-d";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Vitamin D and Testosterone: Why Evidence Is Mixed",
  description:
    "An earlier 2011 trial showed testosterone gains with vitamin D, but a larger 2017 RCT found no difference versus placebo. Honest study breakdown and dosing.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Vitamin D and Testosterone: Why Evidence Is Mixed",
    description:
      "A conflicting trial history: small early studies suggested testosterone benefits, but a larger, more rigorous RCT found no effect in healthy men.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Vitamin D and Testosterone: Why Evidence Is Mixed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitamin D and Testosterone: Why Evidence Is Mixed",
    description:
      "Comparing the 2011 Pilz trial with the 2017 Lerchbaum trial on vitamin D and male testosterone. Honest grades, dosing, and general health role.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  trial: string;
  dose: string;
  duration: string;
  finding: string;
  grade: string;
  pmid: string;
  doi: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    trial: "Pilz et al. (2011, n=65 intervention)",
    dose: "3,300 IU/day",
    duration: "1 year",
    finding: "Statistically significant increase in total T",
    grade: "Grade C — Small single trial",
    pmid: "21154195",
    doi: "10.1055/s-0030-1269854",
  },
  {
    trial: "Lerchbaum et al. (2017, n=98 men)",
    dose: "20,000 IU/week (~2,850 IU/day equiv)",
    duration: "12 weeks",
    finding: "No significant difference in total or free T vs placebo",
    grade: "Grade B/C — Larger placebo-controlled RCT",
    pmid: "28938446",
    doi: "10.1210/jc.2017-01428",
  },
];

const faqs = [
  {
    question: "Does vitamin D increase testosterone?",
    answer:
      "The evidence is genuinely mixed; the larger, more recent trial found no effect.",
  },
  {
    question: "Should I still take vitamin D?",
    answer:
      "Yes, for general health reasons — just don't take it specifically expecting a testosterone bump.",
  },
  {
    question: "How much vitamin D is typical?",
    answer:
      "Common intake ranges from 600-2,000 IU/day; a blood test is the more precise way to dose for an actual deficiency.",
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
  headline: "Vitamin D and Testosterone: Why the Evidence Is More Mixed Than You've Heard",
  description:
    "An earlier 2011 trial showed testosterone gains with vitamin D, but a larger 2017 RCT found no difference versus placebo. Honest study breakdown and dosing.",
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
      name: "Effect of vitamin D supplementation on testosterone levels in men",
      author: { "@type": "Person", name: "Pilz S" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Horm Metab Res" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "21154195" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1055/s-0030-1269854",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/21154195/",
        "https://doi.org/10.1055/s-0030-1269854",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Vitamin D and Testosterone in Healthy Men: A Randomized Controlled Trial",
      author: { "@type": "Person", name: "Lerchbaum E" },
      datePublished: "2017",
      isPartOf: { "@type": "Periodical", name: "J Clin Endocrinol Metab" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28938446" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1210/jc.2017-01428",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28938446/",
        "https://doi.org/10.1210/jc.2017-01428",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Vitamin D" },
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
      name: "Vitamin D",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function VitaminDSciencePage() {
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
            <li className="text-cloudText">Vitamin D</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Compound Entity Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Vitamin D and Testosterone: Why the Evidence Is More Mixed Than You&apos;ve Heard
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
            Vitamin D and testosterone evidence is genuinely mixed, with larger RCTs contradicting earlier small findings.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Vitamin D and testosterone is a case where the honest answer runs against the popular claim. An earlier, smaller trial (65 men, 2011) found a real increase in total testosterone after a year of daily vitamin D. A larger, later, better-controlled trial (98 men, 2017) tested a higher weekly dose and found no significant difference in total testosterone versus placebo. When a bigger, more rigorous trial contradicts an earlier finding, the bigger trial generally carries more weight — this page says that plainly instead of quoting only the flattering study, which is what most testosterone-and-vitamin-D content online does.
          </p>
        </section>

        {/* Trial Comparison Table */}
        <section aria-labelledby="trial-table-heading" className="mt-12">
          <h2
            id="trial-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Key Human Trial Comparison: Vitamin D &amp; Testosterone
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Directly comparing the early positive study against the larger, modern placebo-controlled RCT.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Trial</th>
                  <th className="p-3 md:p-4 font-semibold">Dose &amp; Duration</th>
                  <th className="p-3 md:p-4 font-semibold">Hormonal Finding</th>
                  <th className="p-3 md:p-4 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.trial} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 md:p-4 font-medium text-bone">
                      {row.trial}
                      <span className="block mt-1 text-[12px] text-mute">
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
                    </td>
                    <td className="p-3 md:p-4">{row.dose} ({row.duration})</td>
                    <td className="p-3 md:p-4">{row.finding}</td>
                    <td className="p-3 md:p-4 font-semibold text-bone">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-does-vitd-raise-t" className="mt-12">
          <h2
            id="h2-does-vitd-raise-t"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does vitamin D raise testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In 2011, Pilz et al. (PMID 21154195) published a 1-year trial in 65 men receiving 3,300 IU of vitamin D3 daily, reporting significant increases in total testosterone, bioactive testosterone, and free testosterone. However, in 2017, Lerchbaum et al. (PMID 28938446) conducted a larger, double-blind randomized controlled trial in 98 healthy men using 20,000 IU of vitamin D3 weekly for 12 weeks and found no statistically significant changes in total or free testosterone compared to placebo. Overall, the evidence earns a C/D grade due to these contradictory human trial outcomes.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            While a small 2011 trial reported testosterone increases from vitamin D supplementation, a larger 2017 randomized controlled trial found no effect on testosterone levels in healthy men.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-dosage-guidelines" className="mt-12">
          <h2
            id="h2-dosage-guidelines"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much vitamin D should I take?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            General nutritional adequacy dosing ranges between 600 IU and 2,000 IU of vitamin D3 daily for adults with modest sun exposure. Higher therapeutic doses (such as 4,000 IU daily or weekly bolus dosing) are appropriate under medical supervision for confirmed clinical deficiency (20-hydroxyvitamin D levels below 20 ng/mL), rather than used as a targeted self-prescribed testosterone protocol.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            A daily intake of 600 to 2,000 IU maintains healthy blood levels for most men, while severe deficiency requires clinical testing rather than megadosing self-prescriptions.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-still-worth-taking" className="mt-12">
          <h2
            id="h2-still-worth-taking"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Is vitamin D still worth taking?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Yes — maintaining adequate serum vitamin D remains essential for bone mineral density, immune function, calcium homeostasis, and general endocrine health independent of the contested testosterone effect. Supplementing to prevent or correct deficiency is sound preventive medicine, even if expecting a major boost in muscle mass or testosterone from vitamin D alone is ungrounded.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Vitamin D remains essential for bone density and immune health, even if its reputation as a direct testosterone booster is unsupported by larger trials.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            Vitamin D is not a proven standalone testosterone treatment. The largest double-blind RCT (n=98) showed no change in testosterone versus placebo in men with normal baseline levels. Megadosing without blood work risks toxicity (hypercalcemia) at extreme levels over time. This page is educational and not medical advice or clinical diagnosis.
          </p>
        </section>

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
                Pilz S, Frisch S, Koertke H, Kuhn J, Dreier J, Obermayer-Pietsch B, Sommer W, Zittermann A. (2011)
              </p>
              <p className="text-[13px] text-mute">
                Effect of vitamin D supplementation on testosterone levels in men. <em>Horm Metab Res</em> 43(3): 223-5.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/21154195/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 21154195
                </a>
                <a
                  href="https://doi.org/10.1055/s-0030-1269854"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1055/s-0030-1269854
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">
                Lerchbaum E, Trummer C, Theiler G, Kollmann M, Schwetz V, Pilz S, Heijboer AC, Obermayer-Pietsch B. (2017)
              </p>
              <p className="text-[13px] text-mute">
                Vitamin D and Testosterone in Healthy Men: A Randomized Controlled Trial. <em>J Clin Endocrinol Metab</em> 102(11): 4292-4302.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/28938446/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 28938446
                </a>
                <a
                  href="https://doi.org/10.1210/jc.2017-01428"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1210/jc.2017-01428
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
            Related Nutrition &amp; Science Guides
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/nutrition/testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Testosterone Nutrition Hub</p>
              <p className="mt-1 text-[13px] text-mute">
                Evidence-based dietary priorities and micronutrients for natural testosterone support.
              </p>
            </Link>
            <Link
              href="/science/magnesium"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Magnesium for Men Over 50</p>
              <p className="mt-1 text-[13px] text-mute">
                Trial data on magnesium dosing, testosterone output, and sleep architecture.
              </p>
            </Link>
            <Link
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Research</p>
              <p className="mt-1 text-[13px] text-mute">
                Trial data on zinc deficiency restoration versus replete supplementation.
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

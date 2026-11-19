import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import TitanForgeShopNote from "@/components/TitanForgeShopNote";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/magnesium";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-10-08";

export const metadata: Metadata = {
  title: "Magnesium Dosage for Men: 420 mg a Day, 350 mg Max From Pills",
  description:
    "Magnesium dosing for men: 420 mg a day from all sources after 30 (400 mg at 19 to 30), and no more than 350 mg a day from supplements. What the trials used, with PubMed IDs.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Magnesium Dosage for Men: 420 mg a Day, 350 mg Max From Pills",
    description:
      "Magnesium shows a modest testosterone effect in small trial evidence, but its strongest practical role is in sleep quality and dietary mineral adequacy.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Magnesium for Men Over 50: Dosage, Testosterone, and Sleep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnesium Dosage for Men: 420 mg a Day, 350 mg Max From Pills",
    description:
      "Magnesium dosing for men: 420 mg a day from all sources after 30, and no more than 350 mg a day from supplements. What the trials used, with PubMed IDs.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type ClaimRow = {
  group: string;
  rda: string;
  range: string;
  grade: string;
  pmid?: string;
  doi?: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    group: "Sedentary adult men",
    rda: "420mg/day",
    range: "10mg/kg daily studied short-term",
    grade: "Grade C — Small trial evidence",
    pmid: "20352370",
    doi: "10.1007/s12011-010-8676-3",
  },
  {
    group: "Exercising men / athletes",
    rda: "420mg/day floor",
    range: "10mg/kg daily studied short-term",
    grade: "Grade C — Small trial evidence",
    pmid: "20352370",
    doi: "10.1007/s12011-010-8676-3",
  },
  {
    group: "Older adults with insomnia (46 people)",
    rda: "420mg/day",
    range: "500mg/day for 8 weeks, above the 350mg supplement cap",
    grade: "Grade C: Small trial evidence",
    pmid: "23853635",
  },
];

const faqs = [
  {
    question: "Is magnesium worth taking daily?",
    answer:
      "Only if food leaves you short. Men need 400 mg a day at 19 to 30 and 420 mg from 31 on, counting food and pills together. If you supplement, keep the pill part at 350 mg a day or less: that is the adult upper limit for supplemental magnesium set by the Food and Nutrition Board.",
  },
  {
    question: "Which form of magnesium is best?",
    answer:
      "Glycinate is commonly chosen for sleep/tolerance; citrate is a general-purpose, less expensive option.",
  },
  {
    question: "Does magnesium replace a testosterone-focused nutrition plan?",
    answer:
      "No — it's one modest, honestly-graded input among several.",
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
  headline: "Magnesium Dosage for Men: 420 mg a Day, 350 mg Max From Pills",
  description:
    "Magnesium shows a modest testosterone effect in deficient/exercising men (Grade C), but its strongest case is for sleep and daily mineral adequacy.",
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
      name: "Effects of magnesium supplementation on testosterone levels of athletes and sedentary subjects at rest and after exhaustion",
      author: { "@type": "Person", name: "Cinar V" },
      datePublished: "2011",
      isPartOf: { "@type": "Periodical", name: "Biol Trace Elem Res" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "20352370" },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1007/s12011-010-8676-3",
        },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/20352370/",
        "https://doi.org/10.1007/s12011-010-8676-3",
      ],
    },
    {
      "@type": "ScholarlyArticle",
      name: "The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial.",
      author: { "@type": "Person", name: "Abbasi B" },
      datePublished: "2012",
      isPartOf: { "@type": "Periodical", name: "J Res Med Sci" },
      identifier: [{ "@type": "PropertyValue", propertyID: "PMID", value: "23853635" }],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23853635/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Magnesium" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Sleep" },
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
      name: "Magnesium",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function MagnesiumSciencePage() {
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
            <li className="text-cloudText">Magnesium</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Compound Entity Review</p>
          <h1 className="display mt-4 text-[34px] leading-[1.06] text-bone sm:text-[42px] md:text-[52px]">
            Magnesium Dosage for Men: 420 mg a Day, 350 mg Max From Pills
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
            Men need 420 mg of magnesium a day from 31 on (400 mg at 19 to 30), and no more than 350 mg of that should come from supplements.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Most of the 420 mg should come from food: leafy greens, legumes, nuts, seeds and whole grains. A supplement fills the gap, usually 100 to 350 mg of elemental magnesium once a day. Above 350 mg from pills, diarrhea and cramping become more likely. On testosterone, one small trial found that 4 weeks of magnesium raised free and total testosterone in sedentary men and in tae kwon do athletes (Cinar et al. 2011, PMID 20352370); it is a grade C result, not a reason to megadose. On sleep, an 8-week trial in 46 older adults with insomnia found faster sleep onset and better sleep efficiency on 500 mg a day, though total sleep time did not differ from placebo (Abbasi et al. 2012, PMID 23853635).
          </p>
        </section>

        {/* Dose first: the number the "dosing magnesium" searcher came for. */}
        <section aria-labelledby="h2-dose-numbers" className="mt-12">
          <h2
            id="h2-dose-numbers"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much magnesium should a man take a day?
          </h2>
          <ul className="mt-5 space-y-3 text-[15.5px] leading-[1.65] text-bone/90 md:text-[16.5px]">
            <li><b className="text-bone">Total target:</b> 400 mg a day for men 19 to 30, and 420 mg a day from 31 on. That counts food and supplements together.</li>
            <li><b className="text-bone">Supplement ceiling:</b> 350 mg a day of magnesium from pills or powders. Food magnesium does not count toward it.</li>
            <li><b className="text-bone">Typical supplement dose:</b> 100 to 350 mg of elemental magnesium, once a day. The label&apos;s &quot;elemental&quot; number is the one that counts, not the weight of the whole compound.</li>
            <li><b className="text-bone">What the trials used:</b> 10 mg per kg of body weight for 4 weeks in the testosterone trial (PMID 20352370) and 500 mg a day for 8 weeks in the sleep trial (PMID 23853635). Both sit above the 350 mg cap and were run under study supervision, so they are not a home dose.</li>
          </ul>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute">
            Intake numbers: NIH Office of Dietary Supplements, Magnesium fact sheet for health professionals, Table 1 and the upper-limit section (
            <a className="underline hover:text-bone" href="https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" target="_blank" rel="noreferrer">ods.od.nih.gov</a>
            ). If you take medication or have kidney problems, ask your doctor before adding magnesium.
          </p>
        </section>

        {/* Dosage Table */}
        <section aria-labelledby="dosage-table-heading" className="mt-12">
          <h2
            id="dosage-table-heading"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Magnesium Evidence &amp; Dosing Summary
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-mute">
            Small trial evidence evaluates high-dose magnesium supplementation over four weeks, while dietary guidelines establish baseline daily needs.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[6px] border border-cloudText/25">
            <table className="w-full min-w-[580px] text-left text-[14px]">
              <thead className="border-b border-cloudText/25 bg-cloudText/[0.08] text-bone">
                <tr>
                  <th className="p-3 md:p-4 font-semibold">Group</th>
                  <th className="p-3 md:p-4 font-semibold">Recommended RDA</th>
                  <th className="p-3 md:p-4 font-semibold">Studied Range</th>
                  <th className="p-3 md:p-4 font-semibold">Evidence Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cloudText/15 text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.group} className="hover:bg-cloudText/[0.03]">
                    <td className="p-3 md:p-4 font-medium text-bone">{row.group}</td>
                    <td className="p-3 md:p-4">{row.rda}</td>
                    <td className="p-3 md:p-4">
                      {row.range}
                      {row.pmid && (
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
                      )}
                    </td>
                    <td className="p-3 md:p-4 font-semibold text-bone">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="h2-raise-t" className="mt-12">
          <h2
            id="h2-raise-t"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does magnesium raise testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            In a 2011 controlled trial by Cinar et al. (PMID 20352370), four weeks of daily magnesium supplementation (10 mg per kg body weight) increased both free and total testosterone levels in sedentary men and taekwondo athletes at rest and after exhaustion. The athletes who trained while supplementing experienced a higher relative increase than sedentary participants. However, because this trial was small (30 participants overall) and conducted over a short 4-week window, its evidence grade is C rather than A.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            Magnesium supplementation elevated free and total testosterone in both sedentary men and taekwondo athletes, but the trial was small (30 men, 4 weeks) and lacks wide replication at scale.
          </blockquote>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="h2-dosage-50" className="mt-12">
          <h2
            id="h2-dosage-50"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How much magnesium should a man over 50 take?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            The Recommended Dietary Allowance (RDA) for magnesium in men over 50 is 420 mg per day from all dietary and supplemental sources. Typical Western diets frequently fall short of this target due to lower intakes of leafy greens, nuts, and whole grains. For supplementation, keep elemental magnesium at 350 mg a day or less, the adult upper limit for magnesium from supplements. Magnesium glycinate is widely selected for higher intestinal tolerance and sleep support, whereas magnesium citrate is a general-purpose, cost-effective alternative.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            For men over 50, the 420 mg target is met mostly from food, with a supplement of 350 mg or less filling the gap.
          </blockquote>
        </section>

        {/* Section 3 */}
        <section aria-labelledby="h2-sleep-reframe" className="mt-12">
          <h2
            id="h2-sleep-reframe"
            className="display text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Does magnesium help with sleep, not just testosterone?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            Possibly, and this is a better reason to look at magnesium than testosterone. In a double-blind trial, 46 older adults with insomnia took 500 mg of magnesium or a placebo for 8 weeks. The magnesium group fell asleep faster, slept more efficiently and scored better on the insomnia severity index, and their serum cortisol fell; total sleep time did not differ from placebo (Abbasi et al. 2012, PMID 23853635). The dose was above the 350 mg supplement cap and the group was older adults with insomnia, so it does not tell a 35-year-old who sleeps fine what to expect.
          </p>
          <blockquote className="my-6 border-l-2 border-cloudText/60 pl-4 italic text-bone/80 text-[15px]">
            In one 8-week trial of older adults with insomnia, 500 mg of magnesium a day shortened sleep onset and improved sleep efficiency, without changing total sleep time.
          </blockquote>
        </section>

        {/* Honest Limits Note */}
        <section
          aria-label="Honest limits note"
          className="mt-10 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-5 text-[14.5px] leading-[1.65] text-bone/90"
        >
          <p className="font-semibold text-amber-200">Honest limits:</p>
          <p className="mt-1">
            The direct testosterone evidence for magnesium relies on a single small trial (n=30 over 4 weeks) and earns a Grade C rating. Supplementation will not produce dramatic hormonal changes in men who already meet their daily 420mg mineral intake through whole foods. Supplemental doses above 350 mg of elemental magnesium a day can cause diarrhea and cramping. This page is educational and does not constitute medical advice or clinical diagnosis.
          </p>
        </section>

        <TitanForgeShopNote
          ingredient="magnesium"
          pageSlug="/science/magnesium"
          note="Not as a stand-alone product. The Titan Forge shop has no plain magnesium supplement, and the blends that contain some are built for other jobs, like a pre-workout or a focus formula, so we do not point you to them. What the catalog does carry is the basics: protein and creatine."
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
                Cinar V, Polat Y, Baltaci AK, Mogulkoc R. (2011)
              </p>
              <p className="text-[13px] text-mute">
                Effects of magnesium supplementation on testosterone levels of athletes and sedentary subjects at rest and after exhaustion. <em>Biol Trace Elem Res</em> 140(1): 18-23.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/20352370/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  PubMed PMID: 20352370
                </a>
                <a
                  href="https://doi.org/10.1007/s12011-010-8676-3"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-cloudText hover:text-bone"
                >
                  DOI: 10.1007/s12011-010-8676-3
                </a>
              </div>
            </li>
            <li className="rounded-[4px] border border-cloudText/15 bg-cloudText/[0.03] p-3">
              <p className="font-medium text-bone">Abbasi B et al. (2012)</p>
              <p className="text-[13px] text-mute">
                The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial. <em>J Res Med Sci</em> 17(12): 1161-9.
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-[12px]">
                <a href="https://pubmed.ncbi.nlm.nih.gov/23853635/" target="_blank" rel="noreferrer" className="underline text-cloudText hover:text-bone">
                  PubMed PMID: 23853635
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
              href="/science/zinc"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Zinc &amp; Testosterone Research</p>
              <p className="mt-1 text-[13px] text-mute">
                Trial data on zinc deficiency restoration versus replete supplementation.
              </p>
            </Link>
            <Link
              href="/science/vitamin-d"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Vitamin D &amp; Testosterone Evidence</p>
              <p className="mt-1 text-[13px] text-mute">
                Comparing conflicting trials on vitamin D intake and male hormone levels.
              </p>
            </Link>
            <Link
              href="/blog/sleep-and-fat-loss-for-busy-professionals"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40"
            >
              <p className="font-semibold text-bone">Sleep &amp; Fat Loss Guide</p>
              <p className="mt-1 text-[13px] text-mute">
                How sleep duration and quality affect hunger, recovery, and body composition.
              </p>
            </Link>
            <Link
              href="/science/electrolytes-and-cognitive-energy"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40 sm:col-span-2"
            >
              <p className="font-semibold text-bone">Electrolytes &amp; Cognitive Energy</p>
              <p className="mt-1 text-[13px] text-mute">
                Evaluating clinical evidence on fluid-electrolyte balance, focus, alertness, and cognitive fatigue.
              </p>
            </Link>
            <Link
              href="/science/sleep-loss-and-testosterone"
              className="rounded-[6px] border border-cloudText/20 bg-cloudText/[0.05] p-4 transition hover:border-cloudText/40 sm:col-span-2"
            >
              <p className="font-semibold text-bone">Sleep Loss &amp; Testosterone Science</p>
              <p className="mt-1 text-[13px] text-mute">
                Controlled sleep restriction clinical trials, circadian rhythm disruption, and hormone recovery kinetics.
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

import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/science/olive-oil";
const PUBLISHED = "2026-08-10";
const REVIEWED = "2026-08-10";

export const metadata: Metadata = {
  title: "Olive Oil and Testosterone: The Butter-Swap Study, Explained",
  description:
    "The single controlled trial behind the olive oil and testosterone claim, explained with full study details, exact fat-swap protocols, and honest limits.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Olive Oil and Testosterone: The Butter-Swap Study, Explained",
    description:
      "The single controlled trial behind the olive oil and testosterone claim, explained with full study details, exact fat-swap protocols, and honest limits.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Olive oil and testosterone study breakdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olive Oil and Testosterone: The Butter-Swap Study, Explained",
    description:
      "The single controlled trial behind the olive oil and testosterone claim, explained with full study details, exact fat-swap protocols, and honest limits.",
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
      name: "Is the olive oil and testosterone study real?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it is a real published randomized controlled trial conducted in 60 healthy men in 2013 (Derouiche et al., PMID 23472458). It is not an internet myth, though because it is a single 3-week study, the exact percentage changes should be viewed as promising rather than settled science.",
      },
    },
    {
      "@type": "Question",
      name: "How much olive oil do I need for any effect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study used approximately 25 grams per day (roughly 2 tablespoons), replacing butter and saturated fat rather than adding extra olive oil on top of an already high-fat diet.",
      },
    },
    {
      "@type": "Question",
      name: "Should I take olive oil as a supplement instead of cooking with it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study used dietary virgin olive oil, not a concentrated capsule or supplement. Cooking with extra virgin olive oil or using it as a salad dressing is the studied approach.",
      },
    },
    {
      "@type": "Question",
      name: "Does this mean butter is bad for testosterone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The trial measured a comparative outcome (swapping butter for olive oil), not that butter itself damages testosterone in isolation. The honest framing is that virgin olive oil looks like the better fat swap for overall endocrine and cardiovascular profile.",
      },
    },
    {
      "@type": "Question",
      name: "Is olive oil worth prioritizing over other nutrition changes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For cardiovascular health and longevity, yes—those benefits are well established. For testosterone specifically, swapping saturated fat for virgin olive oil is a helpful, low-risk bonus, but total calorie balance, sleep, and progressive lifting remain the primary levers.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Olive Oil and Testosterone: The Butter-Swap Study, Explained",
  description:
    "The single controlled trial behind the olive oil and testosterone claim, explained with full study details, exact fat-swap protocols, and honest limits.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    hasCredential: "NASM-CPT",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  image: [`${SITE_URL}/social-preview-coaching.jpg`],
  datePublished: PUBLISHED,
  dateModified: REVIEWED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "Effect of argan and olive oil consumption on the hormonal profile of androgens among healthy adult Moroccan men",
      author: { "@type": "Person", name: "Derouiche A" },
      datePublished: "2013",
      isPartOf: { "@type": "Periodical", name: "Natural Product Communications" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "23472458" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/23472458/"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Olive oil" },
    { "@type": "Thing", name: "Testosterone" },
    { "@type": "Thing", name: "Luteinizing hormone" },
    { "@type": "Thing", name: "Monounsaturated fat" },
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
      name: "Olive Oil and Testosterone",
      item: `${SITE_URL}${SLUG}`,
    },
  ],
};

export default function OliveOilTestosteronePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* Progress mechanic: turns "how long is this" into visible progress. */}
      <ReadingProgress />
      <JsonLd id="olive-oil-faq-schema" data={faqSchema} />
      <JsonLd id="olive-oil-article-schema" data={articleSchema} />
      <JsonLd id="olive-oil-breadcrumb-schema" data={breadcrumbSchema} />

      <article className="mx-auto max-w-[850px] px-6 pt-14 pb-20 md:px-10 md:pt-24 md:pb-28">
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
            <li className="text-cloudText">Olive Oil and Testosterone</li>
          </ol>
        </nav>

        <header>
          <p className="eyebrow text-cloudText">Science Library</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">
            Olive Oil and Testosterone: The Butter-Swap Study, Explained
          </h1>
          <p className="mt-6 max-w-[70ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            The single controlled trial behind the online claim that olive oil boosts testosterone,
            broken down with exact fat-swap protocols, measured hormone markers, and honest study limits.
          </p>
          <p className="mt-3 text-[13px] text-mute">Last updated August 10, 2026</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="btn btn-primary"
              data-analytics-event="olive_oil_apply_click"
              data-analytics-source="olive_oil_header"
            >
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link
              href="/nutrition/olive-oil-health"
              className="btn btn-secondary"
              data-analytics-event="olive_oil_health_click"
              data-analytics-source="olive_oil_header"
            >
              Olive oil health benefits
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Answer Block */}
        <section
          aria-labelledby="answer-block-heading"
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-6 md:px-7 md:py-7"
        >
          <p className="eyebrow text-cloudText">Quick Answer</p>
          <h2
            id="answer-block-heading"
            className="display mt-2 text-[22px] leading-[1.15] text-bone md:text-[28px]"
          >
            What the research actually found.
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/90 md:text-[16.5px]">
            There is one real controlled trial behind the claim that olive oil boosts testosterone,
            and it is worth reading in full instead of trusting a one-line internet summary. Sixty
            healthy Moroccan men, ages 23 to 40, ate butter for two weeks, then were split into two
            groups—one switched to virgin olive oil and one to argan oil—for three more weeks. The
            olive-oil group saw testosterone rise about 17% and luteinizing hormone (the pituitary
            signal that drives testosterone production) rise about 43%. That is a real, measurable
            result from one trial, in one specific population, over three weeks. It has not been
            replicated at scale. The honest takeaway: swapping saturated fat for olive oil is a
            low-risk, well-established move for cardiovascular and longevity reasons regardless of the
            testosterone angle, and this trial adds a plausible bonus reason to make that swap rather
            than a guarantee.
          </p>
        </section>

        {/* H2 Sub-intent 1 */}
        <section aria-labelledby="study-measure-heading" className="mt-12 md:mt-16">
          <h2
            id="study-measure-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            What did the olive oil vs. butter study actually measure?
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Readers searching PubMed for an olive oil testosterone study are usually trying to verify
            whether the viral numbers come from a legitimate paper. The primary source is Derouiche et
            al. (2013), published in <i>Natural Product Communications</i> (PMID 23472458).
          </p>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The researchers evaluated 60 healthy young adult men across a controlled dietary intervention.
            After a 2-week baseline phase where all subjects consumed butter as their main added lipid,
            subjects were randomized to consume either virgin olive oil or argan oil for 3 weeks.
            Blood draws recorded a 17.4% increase in serum testosterone and a 42.6% surge in luteinizing
            hormone (LH) in the olive oil arm.
          </p>
          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
              Evidence Grade: C (Single RCT, Short Duration)
            </p>
            <blockquote className="mt-2 text-[15px] font-semibold leading-[1.6] text-bone">
              &ldquo;The 2013 Derouiche trial demonstrated that replacing butter with extra virgin olive
              oil for 21 days increased circulating testosterone by 17.4% and luteinizing hormone by
              42.6% in healthy young men.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* H2 Sub-intent 2 */}
        <section aria-labelledby="how-much-heading" className="mt-12 md:mt-16">
          <h2
            id="how-much-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            How much olive oil, and instead of what?
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The study participants consumed approximately 25 grams per day of virgin olive oil (roughly
            2 tablespoons). Crucially, this was a dietary swap: subjects replaced butter with olive oil,
            rather than simply adding extra oil to an already calorie-dense diet. If the question in
            your kitchen is the other cooking oils, see{" "}
            <Link href="/free/seed-oils" className="underline hover:text-bone">
              five seed oil claims checked against the research
            </Link>
            .
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-line2 text-[13px] font-medium uppercase tracking-[0.14em] text-cloudText">
                  <th className="py-3 px-4">Swap</th>
                  <th className="py-3 px-4">Amount studied</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Reported change</th>
                  <th className="py-3 px-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line2/50 text-bone/85">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-bone">Butter &rarr; virgin olive oil</td>
                  <td className="py-3.5 px-4">~25g/day (study amount)</td>
                  <td className="py-3.5 px-4">3 weeks</td>
                  <td className="py-3.5 px-4">T +17.4%, LH +42.6%</td>
                  <td className="py-3.5 px-4 font-semibold text-cloudText">C</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-bone">Butter &rarr; argan oil (comparison arm)</td>
                  <td className="py-3.5 px-4">~25g/day</td>
                  <td className="py-3.5 px-4">3 weeks</td>
                  <td className="py-3.5 px-4">Smaller/different hormonal profile than olive oil arm</td>
                  <td className="py-3.5 px-4 font-semibold text-cloudText">C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
              Key takeaway
            </p>
            <blockquote className="mt-2 text-[15px] font-semibold leading-[1.6] text-bone">
              &ldquo;The studied protocol replaced approximately 25 grams per day of butter with virgin
              olive oil, meaning the hormonal changes occurred from swapping dietary fat sources rather
              than adding extra calories to an existing diet.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* H2 Sub-intent 3 */}
        <section aria-labelledby="other-fats-heading" className="mt-12 md:mt-16">
          <h2
            id="other-fats-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Does olive oil raise testosterone more than other healthy fats?
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            The trial compared virgin olive oil to butter (a saturated fat source), not to other
            monounsaturated-fat options like avocado oil, macadamia nuts, or high-oleic sunflower oil.
            Therefore, current data shows that swapping saturated fat for monounsaturated fat improves the
            hormonal profile, but it does not prove olive oil is uniquely superior to all other MUFA sources.
          </p>

          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
              Honest limits
            </p>
            <blockquote className="mt-2 text-[15px] font-semibold leading-[1.6] text-bone">
              &ldquo;Because the primary trial compared olive oil to butter rather than to other
              monounsaturated fats, current evidence shows that swapping saturated fat for monounsaturated
              fat supports testosterone, but does not prove olive oil is superior to other healthy MUFA
              sources.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* H2 Sub-intent 4 */}
        <section aria-labelledby="diet-reason-heading" className="mt-12 md:mt-16">
          <h2
            id="diet-reason-heading"
            className="display text-[26px] leading-[1.12] text-bone md:text-[34px]"
          >
            Is this reason enough to add olive oil to my diet?
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            Yes, but for established cardiovascular and longevity reasons first. Extra virgin olive oil is
            rich in oleic acid and anti-inflammatory polyphenols. The 17% testosterone increase observed in
            this 3-week study is a legitimate, welcome bonus, but should be treated as a supportive lever
            alongside sleep, heavy compound lifting, and calorie management.
          </p>

          <div className="mt-6 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-cloudText">
              Practical framing
            </p>
            <blockquote className="mt-2 text-[15px] font-semibold leading-[1.6] text-bone">
              &ldquo;Extra virgin olive oil earns its place in a high-performance diet through established
              cardiovascular and metabolic benefits, while its potential androgen-supportive effect serves
              as a plausible secondary advantage.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* Proof Module */}
        <section aria-labelledby="proof-module-heading" className="mt-12 md:mt-16 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">Broader Context</p>
          <h2
            id="proof-module-heading"
            className="display mt-2 text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            How this fits your overall nutrition and longevity strategy
          </h2>
          <p className="mt-4 max-w-[74ch] text-[15.5px] leading-[1.7] text-bone/85">
            Optimizing endocrine health requires looking at total diet structure, sleep architecture, and
            training stimulus. Explore our evidence-graded guides to see how fat swaps fit into a complete
            physique and longevity protocol:
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/nutrition/testosterone"
              className="btn btn-secondary text-[14px]"
            >
              Testosterone nutrition guide &rarr;
            </Link>
            <Link
              href="/nutrition/longevity"
              className="btn btn-secondary text-[14px]"
            >
              Longevity & healthspan guide &rarr;
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">FAQ</p>
          <h2
            id="faq-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Frequently asked questions about olive oil and testosterone
          </h2>
          <div className="mt-6 grid gap-4">
            {faqSchema.mainEntity.map((faq) => (
              <section
                key={faq.name}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-normal text-bone">
                  {faq.name}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                  {faq.acceptedAnswer.text}
                </p>
              </section>
            ))}
          </div>
        </section>

        {/* Keep Going / Internal Links */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section aria-labelledby="related-heading" className="mt-14 border-t border-line2 pt-8">
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="related-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Where to take this research next
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/science" className="btn btn-secondary">
              Full science library
            </Link>
            <Link href="/nutrition/testosterone" className="btn btn-secondary">
              Testosterone nutrition (N2)
            </Link>
            <Link href="/nutrition/longevity" className="btn btn-secondary">
              Longevity nutrition (N13)
            </Link>
            <Link href="/science/boron" className="btn btn-secondary">
              Boron study breakdown (N5)
            </Link>
            <Link href="/science/zinc" className="btn btn-secondary">
              Zinc study breakdown (N6)
            </Link>
            <Link href="/nutrition/olive-oil-health" className="btn btn-secondary">
              Olive oil health benefits
            </Link>
            <Link href="/science/beef-tallow-vs-olive-oil-for-testosterone" className="btn btn-secondary">
              Beef tallow vs olive oil breakdown
            </Link>
            <Link href="/science/mediterranean-diet-and-testosterone" className="btn btn-secondary">
              Mediterranean diet &amp; testosterone
            </Link>
            <Link href="/science/pomegranate-and-testosterone" className="btn btn-secondary">
              Pomegranate &amp; testosterone
            </Link>
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="hair my-10 md:my-14" />
      {/* Retention: these pages ended with nothing to do. */}
      <KeepGoing position="science_page" />

    </main>
  );
}

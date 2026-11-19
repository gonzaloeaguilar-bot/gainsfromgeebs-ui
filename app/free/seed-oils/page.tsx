import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";

import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/free/seed-oils";
const PUBLISHED = "2026-08-13";
const REVIEWED = "2026-08-13";

export const metadata: Metadata = {
  title: "Seed Oils: Myth or Fact? The Free Guide | Geebs Coaching",
  description:
    "Five seed oil claims from the internet, checked against 2023-2026 research. What holds up, what does not, and what to actually do in your kitchen. Free, no login.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Seed Oils: Myth or Fact? The Free Guide",
    description:
      "Five viral seed oil claims scored against randomized trials and a 221,000-person study. Two are true. Three are not.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Cooking oils on a kitchen counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seed Oils: Myth or Fact? The Free Guide",
    description:
      "The five claims, the verdicts, the studies, and the three kitchen rules that actually matter.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type Claim = {
  id: string;
  claim: string;
  verdict: "Myth" | "Fact";
  short: string;
  doi: string;
  source: string;
};

const CLAIMS: Claim[] = [
  {
    id: "inflammation",
    claim: "Seed oils are inflammatory and wrecking your health.",
    verdict: "Myth",
    short:
      "Randomized trials show linoleic acid — the main fat in seed oils — does not raise inflammation markers.",
    doi: "10.3389/fnut.2026.1799601",
    source: "Frontiers in Nutrition, 2026 — meta-analysis of randomized trials",
  },
  {
    id: "butter",
    claim: "Swapping butter for plant oils is better for your heart.",
    verdict: "Fact",
    short:
      "A 221,054-person study linked plant-based oils to 16% lower total mortality compared with butter.",
    doi: "10.1001/jamainternmed.2025.0205",
    source: "JAMA Internal Medicine, 2025 — Zhang et al.",
  },
  {
    id: "fat-gain",
    claim: "Seed oils are the reason you are gaining fat.",
    verdict: "Myth",
    short:
      "No human trial shows seed oils cause fat gain on their own. Total calories are still the driver.",
    doi: "10.1093/nutrit/nuae205",
    source: "Nutrition Reviews, 2025 — narrative review",
  },
  {
    id: "cooking",
    claim: "How you cook with an oil matters more than which oil you pick.",
    verdict: "Fact",
    short:
      "High heat and repeated frying generate harmful aldehydes in every oil tested — seed or not.",
    doi: "10.3390/foods14030513",
    source: "Foods, 2025 — NMR spectroscopy study",
  },
  {
    id: "cholesterol",
    claim: "Seed oils destroy your cholesterol.",
    verdict: "Myth",
    short:
      "A meta-analysis of 40 randomized trials found linoleic acid lowered LDL cholesterol.",
    doi: "10.3390/foods12112129",
    source: "Foods, 2023 — meta-analysis of 40 randomized trials",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are seed oils bad for you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The strongest current evidence does not support the idea that seed oils are harmful on their own. A 2026 meta-analysis of randomized trials found that omega-6 intake did not raise inflammation markers, a 2023 meta-analysis of 40 randomized trials found that linoleic acid lowered LDL cholesterol, and a 2025 review concluded seed oils are not the culprit in cardiometabolic disease. The bigger levers are your overall diet, your calories, and how hot and how often you cook the oil.",
      },
    },
    {
      "@type": "Question",
      name: "Do seed oils cause inflammation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In randomized trials, no. A 2026 meta-analysis in Frontiers in Nutrition pooled randomized trials and found omega-6 fatty acid intake did not increase inflammation markers such as CRP, IL-6, or TNF-alpha. The pro-inflammatory label came from how omega-6 behaves in a lab pathway, not from what happened when researchers actually fed it to people.",
      },
    },
    {
      "@type": "Question",
      name: "Is butter healthier than seed oils?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not on the mortality data. A 2025 JAMA Internal Medicine study following 221,054 people linked higher plant-based oil intake to 16% lower total mortality compared with higher butter intake. That does not mean you must throw out butter. It means the swap goes the other way from what the viral posts claim.",
      },
    },
    {
      "@type": "Question",
      name: "Are seed oils making me gain fat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No human trial shows seed oils cause fat gain independent of calories. Seed oils happen to be in most ultra-processed food, and ultra-processed food is easy to overeat. The oil is a passenger. The calories are the driver.",
      },
    },
    {
      "@type": "Question",
      name: "What is the healthiest oil to cook with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "How you use the oil matters more than which bottle you buy. A 2025 study using NMR spectroscopy found harmful aldehydes formed in every oil tested under high heat and repeated frying. Use fresh oil, keep the temperature moderate, do not reuse frying oil for days, and store the bottle out of direct sunlight.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Seed Oils: Myth or Fact? The Free Guide",
  description:
    "Five viral seed oil claims checked against randomized trials, a 40-trial meta-analysis, and a 221,054-person cohort — plus the kitchen rules that actually matter.",
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
      name: "Regulation of inflammation by omega-3 and omega-6 fatty acids: a meta-analysis of randomized trials",
      datePublished: "2026",
      isPartOf: { "@type": "Periodical", name: "Frontiers in Nutrition" },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3389/fnut.2026.1799601",
        },
      ],
      sameAs: ["https://doi.org/10.3389/fnut.2026.1799601"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Butter and Plant-Based Oils Intake and Mortality",
      author: { "@type": "Person", name: "Zhang Y" },
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "JAMA Internal Medicine" },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1001/jamainternmed.2025.0205",
        },
      ],
      sameAs: ["https://doi.org/10.1001/jamainternmed.2025.0205"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Are Seed Oils the Culprit in Cardiometabolic and Chronic Diseases? A Narrative Review",
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Nutrition Reviews" },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.1093/nutrit/nuae205",
        },
      ],
      sameAs: ["https://doi.org/10.1093/nutrit/nuae205"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Analysis of the Generation of Harmful Aldehydes in Edible Oils During Sunlight Exposure and Deep-Frying Using High-Field Proton Nuclear Magnetic Resonance Spectroscopy",
      datePublished: "2025",
      isPartOf: { "@type": "Periodical", name: "Foods" },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/foods14030513",
        },
      ],
      sameAs: ["https://doi.org/10.3390/foods14030513"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "Effects of Dietary Linoleic Acid on Blood Lipid Profiles: A Systematic Review and Meta-Analysis of 40 Randomized Controlled Trials",
      datePublished: "2023",
      isPartOf: { "@type": "Periodical", name: "Foods" },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.3390/foods12112129",
        },
      ],
      sameAs: ["https://doi.org/10.3390/foods12112129"],
    },
  ],
  about: [
    { "@type": "Thing", name: "Seed oils" },
    { "@type": "Thing", name: "Linoleic acid" },
    { "@type": "Thing", name: "Dietary fat" },
  ],
};

function DoiLink({ doi, children }: { doi: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://doi.org/${doi}`}
      className="underline hover:text-bone"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  );
}

function VerdictPill({ verdict }: { verdict: Claim["verdict"] }) {
  return (
    <span className="inline-block rounded-full border border-line2 px-3 py-1 text-[12px] uppercase tracking-[0.14em] text-bone">
      {verdict}
    </span>
  );
}

export default function SeedOilsGuidePage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="seed-oils-faq-schema" data={faqSchema} />
      <JsonLd id="seed-oils-article-schema" data={articleSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free guide · Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Seed oils: myth or fact?
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Five claims you have seen online, scored against the actual
            research. Two hold up. Three do not. No email required — the whole
            thing is on this page.
          </p>
        </header>

        <div className="hair my-10" />

        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <b>
              The short version: seed oils are not the villain the internet made
              them.
            </b>{" "}
            Randomized trials do not show them raising inflammation, a 40-trial
            meta-analysis found the main fat in them lowers LDL cholesterol, and
            a 221,054-person study put plant oils ahead of butter on mortality.
            What does matter is how hot you cook, how often you reuse the oil,
            and how many calories the food it is sitting in adds up to.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Read the five verdicts, keep score, then use the three kitchen rules
            at the bottom. That is the whole guide.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The scorecard
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Every verdict below links to the study it came from, so you can
            check the work instead of taking anyone&apos;s word for it.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-[14px] md:text-[15px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 pr-4 align-bottom font-normal">
                    What the research found
                  </th>
                  <th className="py-3 align-bottom font-normal">Source</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {CLAIMS.map((row) => (
                  <tr key={row.id} className="border-t border-bone/10 align-top">
                    <td className="py-3 pr-4 min-w-[210px]">{row.claim}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <VerdictPill verdict={row.verdict} />
                    </td>
                    <td className="py-3 pr-4 min-w-[260px] text-mute">
                      {row.short}
                    </td>
                    <td className="py-3 min-w-[190px] text-[13.5px] text-mute2">
                      {row.source}
                      <span className="block mt-2">
                        <DoiLink doi={row.doi}>DOI {row.doi}</DoiLink>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Do seed oils cause inflammation?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            This is the claim that went the furthest, and it is the weakest. A
            2026 meta-analysis of randomized trials found that omega-6 intake
            did not raise inflammation markers like CRP, IL-6, or TNF-alpha (
            <DoiLink doi="10.3389/fnut.2026.1799601">
              Frontiers in Nutrition, 2026
            </DoiLink>
            ). The scary version came from a lab pathway on paper, not from what
            happened when people actually ate the stuff.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The internet took a real chemistry lesson and turned it into a
            horror story. Your diet pattern matters. One ingredient does not
            carry that much weight.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Butter or plant oils?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A 2025 JAMA Internal Medicine study followed 221,054 people and
            linked higher plant-based oil intake to 16% lower total mortality
            compared with higher butter intake (
            <DoiLink doi="10.1001/jamainternmed.2025.0205">
              Zhang et al., 2025
            </DoiLink>
            ).
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Nobody is telling you to throw out the butter. But if you were told
            the swap goes butter-first, the data says the opposite.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Are seed oils why you are gaining fat?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            No human trial shows seed oils causing fat gain independent of
            calories. A 2025 review in Nutrition Reviews went through the
            cardiometabolic case against them and concluded the evidence does
            not support it (
            <DoiLink doi="10.1093/nutrit/nuae205">Nutrition Reviews, 2025</DoiLink>
            ).
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The fat-gain story is really an ultra-processed food story — and the
            3,000 calories inside it. Not the oil it was fried in. If you want
            the calorie side handled properly, start with the{" "}
            <Link
              href="/tools/calorie-deficit-calculator"
              className="underline hover:text-bone"
            >
              calorie deficit calculator
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The part nobody posts about: how you cook
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A 2025 study used NMR spectroscopy to track what happens to edible
            oils under sunlight and deep-frying, and found harmful aldehydes
            forming in every oil tested — seed or otherwise (
            <DoiLink doi="10.3390/foods14030513">Foods, 2025</DoiLink>). Heat and
            reuse are the variables, not the label on the bottle.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Do not demonize the oil. Demonize leaving the same oil in the pan
            for a week at full blast.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What about cholesterol?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A meta-analysis of 40 randomized trials found dietary linoleic acid
            lowered LDL cholesterol (
            <DoiLink doi="10.3390/foods12112129">Foods, 2023</DoiLink>). Saturated
            fat raises LDL. That is still the textbook, and seed oils do not
            flip it.
          </p>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Three rules to use tonight
          </h2>
          <ol className="mt-6 space-y-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <li>
              <b>Cook cooler, cook fresh.</b> Moderate heat, fresh oil, and no
              reusing the same frying oil for days. This is the variable with
              actual evidence behind it.
            </li>
            <li>
              <b>Store it dark.</b> The same 2025 study found sunlight exposure
              degrades oil too. Cupboard, not windowsill.
            </li>
            <li>
              <b>Count the meal, not the ingredient.</b> If the food is
              ultra-processed and easy to overeat, that is your problem to
              solve. Swapping the oil inside it changes nothing.
            </li>
          </ol>
        </section>

        <div className="hair my-10" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Honest limits
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The mortality finding comes from an observational cohort, so it
            shows an association rather than proof that swapping butter for
            plant oil extends your life. The 2025 seed oil paper is a narrative
            review, not a meta-analysis. The inflammation and cholesterol
            verdicts rest on pooled randomized trials, which is the strongest
            evidence here — but pooled trials still average over different
            doses, diets, and people. None of this is medical advice, and none
            of it says an oil-heavy ultra-processed diet is a good idea.
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

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Want the rest of your diet handled this way?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Seed oils are a small decision dressed up as a big one. The big ones
            are calories, protein, training, and doing it on a week that already
            has a job and a family in it. That is what 1:1 coaching is for.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="default_primary">
              Get coached by Kris
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/nutrition" className="btn btn-secondary">
              More nutrition guides
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="seed-oils" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last reviewed {REVIEWED}. Educational
            content only — not medical advice, and not a diagnosis or treatment
            for any condition.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

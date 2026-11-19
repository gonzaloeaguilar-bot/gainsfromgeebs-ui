import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/nutrition/growth-hormone-foods";
const PUBLISHED = "2026-08-02";
const REVIEWED = "2026-08-02";

export const metadata: Metadata = {
  title: "Foods That Increase Growth Hormone: What Research Shows | Geebs",
  description:
    "Most growth hormone food lists repeat claims that do not hold up. What the research actually supports for adult men — with the evidence grade for each claim.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Foods That Increase Growth Hormone Naturally — What the Research Actually Shows",
    description:
      "Sleep and meal timing have real mechanisms behind them. Most 'growth hormone foods' do not. Each claim graded by the strength of the evidence behind it.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Foods and growth hormone — what the research shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foods That Increase Growth Hormone — What the Research Actually Shows",
    description:
      "The two levers with real evidence, the myths that keep getting repeated, and the honest limits of each.",
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
      name: "Can a food or supplement meaningfully raise my growth hormone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not reliably. Sleep quality and consistent hard training are the two levers with real evidence behind them. Most food-based growth hormone claims online stretch a mechanism that does not hold up outside a laboratory setting — the most common error is treating an intravenous arginine test, which is a clinical diagnostic procedure, as if it were the same thing as eating a handful of almonds.",
      },
    },
    {
      "@type": "Question",
      name: "Is fasting a good way to boost growth hormone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is real physiology behind it. A 1988 study in the Journal of Clinical Investigation (Ho et al., PMID 3127426) found that a five-day fast amplified pulsatile growth hormone secretion in six healthy men. But that is an extreme, short-term laboratory finding in a very small group, not a sustainable strategy if you are training hard and working a demanding job. The recovery and training-quality costs are not worth it for most people.",
      },
    },
    {
      "@type": "Question",
      name: "Does eating before bed hurt growth hormone release?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A large, high-sugar meal close to bedtime can blunt the nighttime growth hormone pulse, because an insulin spike suppresses growth hormone release. The practical takeaway is to keep the last meal of the day reasonable in size and not sugar-heavy. This is a mechanistic argument rather than a finding from a dedicated trial in adult men, so treat it as a sensible default rather than a proven intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Do growth hormone boosting supplements actually work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most over-the-counter products marketed as human growth hormone releasers have weak or absent human evidence at the doses actually sold. Sleep and training remain the higher-confidence levers, and they cost nothing.",
      },
    },
    {
      "@type": "Question",
      name: "How does growth hormone connect to actual muscle and body composition results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Growth hormone is one small piece of a much larger system. The things that reliably drive visible change are training consistency, adequate protein, and calorie management. Chasing growth hormone through food is a distraction from the levers that actually move body composition.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Foods That Increase Growth Hormone Naturally (What the Research Actually Shows)",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Foods That Increase Growth Hormone Naturally (What the Research Actually Shows)",
  description:
    "An evidence-graded look at whether food raises growth hormone in adult men, which levers have real support, and which popular claims do not.",
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
      name: "Fasting enhances growth hormone secretion and amplifies the complex rhythms of growth hormone secretion in man",
      author: { "@type": "Person", name: "Ho KY" },
      datePublished: "1988",
      isPartOf: { "@type": "Periodical", name: "The Journal of Clinical Investigation" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "3127426" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1172/JCI113450" },
      ],
      sameAs: ["https://pubmed.ncbi.nlm.nih.gov/3127426/", "https://doi.org/10.1172/JCI113450"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
      author: { "@type": "Person", name: "Morton RW" },
      datePublished: "2018",
      isPartOf: { "@type": "Periodical", name: "British Journal of Sports Medicine" },
      identifier: [
        { "@type": "PropertyValue", propertyID: "PMID", value: "28698222" },
        { "@type": "PropertyValue", propertyID: "DOI", value: "10.1136/bjsports-2017-097608" },
      ],
      sameAs: [
        "https://pubmed.ncbi.nlm.nih.gov/28698222/",
        "https://doi.org/10.1136/bjsports-2017-097608",
      ],
    },
  ],
  about: [
    { "@type": "Thing", name: "Growth hormone" },
    { "@type": "Thing", name: "Nutrition" },
    { "@type": "Thing", name: "Sleep" },
  ],
};

type ClaimRow = {
  claim: string;
  verdict: string;
  grade: string;
  gradeLabel: string;
};

const CLAIM_ROWS: ClaimRow[] = [
  {
    claim: "Deep sleep drives the biggest daily growth hormone pulse",
    verdict: "Holds up. This is the lever worth protecting.",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "Eating enough protein supports the training this system responds to",
    verdict:
      "Holds up as a foundation, but protein is not a growth hormone lever in itself.",
    grade: "A",
    gradeLabel: "Strong",
  },
  {
    claim: "A big sugary meal right before bed blunts the nighttime pulse",
    verdict: "Real mechanism, thin direct evidence in adult men. Sensible default.",
    grade: "C",
    gradeLabel: "Early",
  },
  {
    claim: "Multi-day fasting raises pulsatile growth hormone",
    verdict:
      "Real finding, but from a five-day fast in six men. Not a practical habit.",
    grade: "B",
    gradeLabel: "Moderate",
  },
  {
    claim: "High-arginine foods (nuts, dairy) spike growth hormone",
    verdict:
      "Does not hold up. Confuses an intravenous clinical test with eating food.",
    grade: "D",
    gradeLabel: "Weak",
  },
  {
    claim: "Milk raises growth hormone in adult men",
    verdict:
      "Does not hold up. The studies people cite are in children, on a different growth axis.",
    grade: "D",
    gradeLabel: "Weak",
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

export default function GrowthHormoneFoodsPage() {
  return (
    <>
      <JsonLd id="gh-foods-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="gh-foods-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Nutrition</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Foods that increase growth hormone naturally (what the research
            actually shows)
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Most lists of &ldquo;growth hormone foods&rdquo; repeat the same
            handful of claims without mentioning that they come from clinical
            tests that have nothing to do with eating. Here is what actually has
            support, what does not, and how strong the evidence is for each.
          </p>
        </header>

        <div className="hair my-10" />

        {/* Answer block */}
        <section className="prose-section">
          <p className="text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two things move this system in a way you can act on: <b>sleep</b> and{" "}
            <b>the timing and size of your last meal</b>. The largest growth
            hormone pulse of your day happens during your first deep-sleep cycle,
            so a short or broken night costs you more than any food swap gains
            you. A large, sugar-heavy meal right before bed spikes insulin, which
            blunts that pulse.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Almost everything else in the typical article is weaker than it
            sounds. Multi-day fasting does raise pulsatile growth hormone —
            that is a real laboratory finding — but it comes from a five-day
            fast, which is not a strategy for anyone training hard and holding
            down a demanding job. And the &ldquo;eat these high-arginine
            foods&rdquo; advice is a straightforward mix-up: the arginine that
            raises growth hormone does so as an intravenous clinical test, not
            as a handful of almonds.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Growth hormone is also a smaller lever than the internet implies.
            Training consistency, protein, and calorie control are what visibly
            change a physique — spend your attention on those first.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Evidence table */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every claim on this page, graded
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Grades come from the strength of the study designs behind each claim,
            not from how confident anyone feels about it. A single small trial
            gets labelled as a single small trial.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="stack-table w-full text-left text-[14.5px] md:text-[15.5px] border-collapse">
              <thead>
                <tr className="text-cloudText">
                  <th className="py-3 pr-4 align-bottom font-normal">Claim</th>
                  <th className="py-3 pr-4 align-bottom font-normal">Verdict</th>
                  <th className="py-3 align-bottom font-normal">Evidence</th>
                </tr>
              </thead>
              <tbody className="text-bone/85">
                {CLAIM_ROWS.map((row) => (
                  <tr key={row.claim} className="border-t border-bone/10 align-top">
                    <td data-label="Claim" className="py-3 pr-4">{row.claim}</td>
                    <td data-label="Verdict" className="py-3 pr-4 text-mute">{row.verdict}</td>
                    <td data-label="Evidence" className="py-3 whitespace-nowrap">
                      {row.grade} — {row.gradeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
            How these grades are assigned, and how studies get selected in the
            first place, is described in{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the coaching methodology
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 1 — protein */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does eating high-protein foods actually raise growth hormone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Not directly. Protein intake supports the training adaptation that
            growth hormone partly mediates, which is why it belongs in the
            conversation at all — but eating a steak does not produce a
            meaningful growth hormone response. The evidence for protein is
            strong for what it actually does: a meta-analysis of 49 studies
            covering 1,863 adults (
            <PubMedLink pmid="28698222">Morton et al., 2018</PubMedLink>, British
            Journal of Sports Medicine) found protein supplementation improves
            resistance-training gains in muscle mass and strength, with no
            further benefit past roughly 1.6 g per kg of bodyweight per day.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> that is a finding about muscle, not about
            growth hormone. Treat protein as the foundation that makes hard
            training work, not as a hormonal lever. More on the practical
            targets in{" "}
            <Link
              href="/blog/protein-intake-for-weight-loss-and-muscle-gain"
              className="underline hover:text-bone"
            >
              protein intake for weight loss and muscle gain
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 2 — fasting */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does fasting increase growth hormone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Yes, measurably — in a laboratory. The classic study here (
            <PubMedLink pmid="3127426">Ho et al., 1988</PubMedLink>, Journal of
            Clinical Investigation) put six healthy men through a five-day fast
            and found growth hormone secretion was enhanced and its pulsatile
            rhythm amplified. The physiology is real and it is why fasting keeps
            appearing in these articles.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> six men, five days, no food. That is a
            mechanistic study, not a recommendation. If you are training for body
            composition and working a demanding job, a multi-day fast costs you
            training quality, recovery, and focus — and the study says nothing
            about whether skipping breakfast does anything comparable.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 3 — sleep */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What role does sleep play, if this is supposed to be about food?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The honest answer is that sleep outranks every food question on this
            page. The largest growth hormone pulse of the day is tied to
            slow-wave sleep, early in the night. No food swap outperforms fixing
            a five-hour sleep window, and no supplement compensates for one.
            The one drink that does matter here is coffee: see{" "}
            <Link
              href="/science/caffeine-and-growth-hormone"
              className="underline hover:text-bone"
            >
              how late-day caffeine affects night-time growth hormone
            </Link>
            .
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            If your sleep is the constraint — which for most working clients it
            is —{" "}
            <Link
              href="/blog/sleep-and-fat-loss-for-busy-professionals"
              className="underline hover:text-bone"
            >
              sleep and fat loss for busy professionals
            </Link>{" "}
            is the more useful page to read next.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 4 — late eating */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Does eating late at night blunt growth hormone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            This is the one food-timing lever with a mechanism worth respecting.
            Insulin suppresses growth hormone release, so a large high-glycemic
            meal immediately before bed works against the pulse that arrives with
            your first deep-sleep cycle. Keeping the last meal moderate and not
            sugar-dominant is a reasonable default.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <b>Honest limits:</b> this is reasoning from mechanism, not from a
            dedicated trial in adult men measuring overnight growth hormone after
            different evening meals. It is a sensible habit, not a proven
            intervention, and it is nowhere near as important as total daily
            intake.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 5 — dairy myth */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Do dairy and milk raise growth hormone?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Not in a way that matters for an adult man trying to change his body
            composition. The studies usually cited for this look at milk intake
            and the growth axis in <i>children</i>, where the entire hormonal
            context is different. Carrying that finding across to a 40-year-old
            professional is not something the research supports.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Milk is a genuinely useful food — convenient, high in protein, easy
            to hit targets with. That is the reason to drink it. The hormone
            claim is not.
          </p>
        </section>

        <div className="hair my-10" />

        {/* H2 6 — aging bridge */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What actually happens to growth hormone as men age?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Output declines gradually with age, alongside recovery capacity. That
            is normal, and it is not something a grocery list reverses. What
            changes outcomes for men in their late thirties and forties is
            unglamorous: training hard enough to demand adaptation, protecting
            sleep, eating enough protein, and staying consistent through the
            weeks when work gets loud.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            None of this is medical advice, and none of it diagnoses or treats a
            condition. If you think something hormonal is genuinely wrong, that
            is a conversation for your doctor and a blood panel, not an article.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
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

        {/* CTA */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            The part that actually moves the needle
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you came here looking for a food that fixes your hormones, the
            honest answer is that no such food exists — and the men who change
            their bodies are the ones who get training, protein, and sleep
            consistent for long enough to matter. That is what 1:1 coaching is
            actually for. The application is three questions and takes under two
            minutes.
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
            content only — not medical advice, and not a diagnosis or treatment
            for any condition.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

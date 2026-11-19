import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/body-recomposition-program-for-men";
const DATE_PUBLISHED = "2026-08-11";
const DATE_MODIFIED = "2026-08-11";

export const metadata: Metadata = {
  title: "Body Recomposition Program for Men: Protocol & Guide",
  description:
    "Body recomposition requires matching progressive resistance training with a near-maintenance calorie intake and elevated protein distribution. Complete protocol for men.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Body Recomposition Program for Men: Building Muscle While Losing Fat",
    description:
      "A pragmatic protocol for men to build muscle and drop body fat simultaneously through progressive training and structured protein intake.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Body recomposition program for men — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Recomposition Program for Men",
    description:
      "Build muscle and lose fat at the same time: progressive overload, protein distribution, and tracking metrics.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Can men actually gain muscle and lose fat at the same time?",
    paras: [
      "Simultaneous tissue adaptation occurs when the anabolic stimulus of heavy progressive lifting is supported by sufficient dietary protein, forcing the body to draw remaining energy needs from stored body fat. Peer-reviewed research confirms that building muscle while losing fat is not restricted to absolute beginners. Randomized trials in resistance-trained men demonstrate significant muscle gain alongside fat loss when progressive resistance training is paired with high protein intake during neutral or mild energy deficits.",
      "The biological mechanism relies on nutrient partitioning. Resistance training signals muscle protein synthesis, signaling the body to retain and construct muscle tissue. When total energy intake is set near maintenance or in a conservative deficit, body fat oxidation fills the energy gap required to support basal metabolism and daily activity. A systematic review by Barakat et al. (2020, doi: 10.1519/SSC.0000000000000584) highlights that trained athletes achieve measurable recomposition when training stimulus and protein intake are optimized.",
      "In a clinical trial by Longland et al. (2016, PMID: 26817506), young men undergoing intense resistance training and high protein intake (2.4 g/kg/day) gained lean mass while losing substantial body fat during a caloric deficit. Simultaneous recomposition is driven by stimulus quality and protein availability rather than energy excess.",
    ],
  },
  {
    h2: "How should I set my nutrition for body recomposition?",
    paras: [
      "A large calorie deficit shuts down muscle protein synthesis before fat loss accelerates, producing a smaller but still soft physique. For body recomposition, calorie intake should be established near estimated total daily energy expenditure (TDEE) or within a modest 100–200 calorie deficit. This provides adequate substrate for recovery while maintaining a steady rate of fat oxidation.",
      "Protein requirement is the cornerstone of the nutrition protocol. A meta-analysis by Morton et al. (2018, PMID: 28698222) indicates that total protein intake between 1.6 g/kg and 2.2 g/kg (0.7–1.0 g per pound of body weight) maximizes muscle retention and growth during resistance training. Distributing this protein evenly across 3 to 5 meals optimizes muscle protein synthesis throughout the day.",
      "As demonstrated by Areta et al. (2013, PMID: 23459753), consuming 20–40 grams of high-quality protein every 3 to 4 hours stimulates myofibrillar protein synthesis rates more effectively than skewed or single-meal distributions. Carbohydrates are allocated around workout windows to fuel high-intensity lifting performance, while dietary fats supply baseline hormonal support.",
    ],
  },
  {
    h2: "What type of workout program works best for recomposition?",
    paras: [
      "Progressive overload provides the non-negotiable biological signal that preserves and builds lean tissue when energy balance is neutral or slightly negative. A recomposition workout program for men centers on multi-joint compound exercises — squats, deadlifts, overhead presses, bench presses, and rows — performed 3 to 4 days per week.",
      "Full-body or upper/lower training splits allow each muscle group to be trained twice per week, maintaining high frequency without causing excessive systemic fatigue. Volume should be targeted between 10 and 20 working sets per muscle group per week, staying within 1 to 3 reps of muscular failure (RIR 1–3).",
      "Cardiovascular exercise serves as an energy expenditure tool rather than the primary driver of body composition. Low-impact steady-state (LISS) cardio or daily step targets (8,000–10,000 steps) support recovery and metabolic health without interfering with strength gains or lifting performance.",
    ],
  },
  {
    h2: "How do I track progress when the scale is not moving?",
    paras: [
      "When building muscle and losing fat at equal rates, scale weight remains stationary while body volume and circumference metrics shift dramatically. Judging recomposition solely by total body weight leads to premature plan changes and frustration. A flat scale reading combined with increasing gym strength and a shrinking waistline is the primary indicator of successful recomposition.",
      "Track progress using a combination of weekly waist circumference measurements, bi-weekly standardized photos, and progressive overload logs in the gym. If training weights increase across key compound movements while waist dimensions decrease, lean mass is increasing as fat mass decreases.",
      "Consistent sleep (7–9 hours per night) and stress management are necessary recovery variables. Elevated cortisol and chronic sleep deprivation impair insulin sensitivity and increase muscle breakdown, hindering body recomposition even when training and nutrition targets are met.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is body recomposition for men?",
    a: "Body recomposition for men is the process of simultaneously building muscle mass and dropping body fat. It relies on matching progressive resistance training with a near-maintenance calorie intake and elevated daily protein distribution.",
  },
  {
    q: "Can experienced male lifters achieve body recomposition?",
    a: "Yes, though the rate of progress is slower than in beginners or returning lifters. Experienced men require higher precision in progressive overload, protein distribution, and sleep recovery to achieve simultaneous muscle gain and fat loss.",
  },
  {
    q: "How many calories should a man eat for body recomposition?",
    a: "Calorie targets should sit near maintenance TDEE or in a conservative 100–200 calorie deficit. Severe caloric restriction accelerates muscle breakdown and undermines training performance.",
  },
  {
    q: "How much protein is required for male body recomposition?",
    a: "Research supports 0.7–1.0 grams of protein per pound of body weight (1.6–2.2 g/kg) daily, distributed evenly across 3 to 5 meals.",
  },
  {
    q: "Why is the scale not changing during body recomposition?",
    a: "Because muscle tissue density and fat loss balance out total mass. Focus on strength increases, waist circumference measurements, and progress photos rather than body weight alone.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Body Recomposition Program for Men: Protocol & Guide",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Body Recomposition Program for Men: Protocol & Guide",
  description:
    "Body recomposition requires matching progressive resistance training with a near-maintenance calorie intake and elevated protein distribution.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Body recomposition" },
    { "@type": "Thing", name: "Resistance training" },
    { "@type": "Thing", name: "Muscle hypertrophy" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Body Recomposition Coaching for Men",
  serviceType: "Body recomposition coaching for men",
  description:
    "Structured 1:1 online coaching for men targeting simultaneous muscle building and fat loss through custom programming and data-driven nutrition tracking.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${SITE_URL}${SLUG}`,
};

export default function RecompProgramForMenPage() {
  return (
    <>
      <JsonLd id="recomp-men-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="recomp-men-article-schema" data={articleSchema} />
      <JsonLd id="recomp-men-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Body recomposition program for men: build muscle while losing fat
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Body recomposition requires matching progressive resistance training with a near-maintenance calorie intake and elevated protein distribution. It is most effective for individuals returning to training, structured lifters optimizing nutrition, or those carrying higher body fat levels.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="honest-limits-heading"
        >
          <p className="eyebrow text-cloudText">Honest limits</p>
          <h2
            id="honest-limits-heading"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            What body recomposition does not guarantee
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Advanced lifters near their genetic ceiling experience substantially slower rates of simultaneous tissue adaptation and often require dedicated focal training phases; progress demands consistent recovery and adherence over extended periods.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Early, in-read. The component exists because the only capture on

            these pages sat past the scroll point 97% of readers never reach. */}

        <ArticleEarlyCapture slug="body-recomposition-program-for-men" sourcePrefix="guide-early" />


        <div className="hair my-10 md:my-14" />


        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        {/* Related resources & internal links */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related guides and resources
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/science/how-much-protein-per-kg"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much protein per kg for muscle building and fat loss?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Evidence-based protein target calculations for optimal muscle synthesis and recomposition.
              </span>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Building muscle after 40
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Optimizing protein distribution, recovery, and training volume for lifters over 40.
              </span>
            </Link>
            <Link
              href="/for/men-who-hate-the-gym"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Fitness coaching for men who hate traditional gym environments
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Minimalist, high-yield resistance protocols designed for efficiency and consistency.
              </span>
            </Link>
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Calculate your recomp viability, maintenance intake, and daily protein targets.
              </span>
            </Link>
            <Link
              href="/tools/macro-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Macro calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Set exact protein, carb, and fat targets for your body composition goals.
              </span>
            </Link>
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for beginners
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                A 12-week foundation guide for men starting out on simultaneous muscle building and fat loss.
              </span>
            </Link>
            <a
              href="https://titanforgefit.com/collections/body-recomposition-and-progress"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Titan Forge body recomposition and progress collection
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Browse verified recomposition supplements, progress tools, and training gear on Titan Forge.
              </span>
            </a>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Frequently asked questions
          </h2>
          <dl className="mt-6">
            {faqs.map((f) => (
              <div key={f.q} className="mt-7 first:mt-0">
                <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Build your body recomposition protocol with coaching
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Get structured 1:1 online coaching with custom training programs, precise nutrition targets, and weekly accountability with Kris Oddo, NASM-CPT.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/tools/body-recomposition-calculator"
              className="btn btn-secondary"
            >
              Calculate your targets
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="body-recomposition-program-for-men" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

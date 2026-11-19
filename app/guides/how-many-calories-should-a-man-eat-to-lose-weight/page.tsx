import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/how-many-calories-should-a-man-eat-to-lose-weight";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-08-10";

export const metadata: Metadata = {
  title:
    "How Many Calories Should a Man Eat to Lose Weight? (A Real Starting Number)",
  description:
    "How to calculate a man's calorie deficit target using TDEE minus 15-20%, prioritize protein, and adjust as body weight drops. No generic 2,000-calorie guesses.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "How Many Calories Should a Man Eat to Lose Weight? (A Real Starting Number, Not a Guess)",
    description:
      "Most men lose weight fastest eating 15-20% below their maintenance TDEE, not an arbitrary 1,500 or 2,000 calories. Here is how to find your actual target.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "How many calories should a man eat to lose weight guide — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Many Calories Should a Man Eat to Lose Weight? (A Real Starting Number, Not a Guess)",
    description:
      "Calculate your real calorie deficit based on TDEE, height, weight, and activity. Skip the generic 2,000 calorie rules.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: {
  h2: string;
  quotable: string;
  paras: string[];
  citation?: { text: string; pmid?: string; detail?: string };
}[] = [
  {
    h2: "Calculate your real number: TDEE minus a sustainable deficit",
    quotable:
      "A sustainable calorie deficit is calculated as a percentage of your individual maintenance burn, never chosen as an arbitrary fixed intake.",
    paras: [
      "Your Total Daily Energy Expenditure (TDEE) represents the total number of calories your body burns in 24 hours. TDEE is made up of your Basal Metabolic Rate (the energy required to stay alive at rest), the Thermic Effect of Food (energy spent digesting nutrients), Exercise Activity Thermogenesis (workout burn), and Non-Exercise Activity Thermogenesis (walking, standing, and daily movement).",
      "To produce steady, predictable fat loss, subtract 15 to 20 percent from your calculated TDEE. For a man with a maintenance burn of 2,600 calories, a 20 percent deficit sets daily intake at 2,080 calories. This creates a net energy gap of 520 calories per day — mathematically equal to roughly one pound of fat loss per week without overwhelming appetite signals or wrecking gym performance.",
      "Before setting a deficit target, verify your baseline maintenance calories by logging your food at estimated maintenance for 10 to 14 days. If body weight remains stable over two weeks, your calculated baseline is accurate. From there, subtract your 15–20% margin using interactive tools like our TDEE calculator and calorie deficit calculator.",
    ],
    citation: {
      text: "In a randomized controlled trial published in the American Journal of Clinical Nutrition, Longland TM et al. (2016) demonstrated that a controlled energy deficit combined with high protein and resistance training drives substantial body fat reduction while protecting lean tissue mass.",
      pmid: "26817506",
      detail:
        "Randomized trial design evaluating energy deficits in young men subjected to intense exercise, showing that structural energy deficits retain lean mass when protein is controlled.",
    },
  },
  {
    h2: "Why generic numbers (1,500, 2,000 calories) don't work for most men",
    quotable:
      "Generic calorie guidelines treat two men with a 50-pound weight difference and completely different activity levels as if their cellular energy needs were identical.",
    paras: [
      "Popular diet advice frequently recommends standard numbers: 'Men should eat 2,000 calories to lose weight' or 'Drop to 1,500 calories for fast results.' These round numbers ignore basic human energy physics. A 6'2\", 220-pound man working a construction job burns upwards of 3,200 calories per day, whereas a 5'8\", 170-pound desk worker may burn 2,250 calories per day.",
      "If both men adopt a 1,500-calorie daily target, the smaller man operates in a reasonable 750-calorie deficit. But the larger, active man suffers an extreme 1,700-calorie deficit (a 53% drop below maintenance). Within two weeks, the larger man experiences severe lethargy, rapid muscle tissue breakdown, elevated cortisol, extreme hunger cravings, and an inevitable binge cycle.",
      "Conversely, if a 5'7\", 160-pound man aiming to lean out adopts a generic 2,000-calorie intake when his maintenance requirement is only 2,100 calories, his net daily deficit is a negligible 100 calories. Scale weight will barely budge over a month, leading to the false conclusion that his metabolism is broken.",
    ],
  },
  {
    h2: "How much of a deficit is sustainable vs too aggressive?",
    quotable:
      "Deficits exceeding 25 to 30 percent accelerate muscle tissue breakdown and trigger subconscious energy-saving movement drops that stall progress within weeks.",
    paras: [
      "A moderate calorie deficit (15% to 20% below maintenance) produces a target weight loss rate of 0.5% to 1.0% of total body weight per week. For a 200-pound man, this equals 1 to 2 pounds per week. Moderate deficits protect muscle tissue, maintain gym strength, keep hormonal function stable, and allow enough dietary volume to manage hunger.",
      "An aggressive calorie deficit (25% to 35%+ below maintenance) yields faster initial scale drops, but much of that initial loss consists of stored muscle glycogen, bound intracellular water, and muscle tissue. Severe energy restriction causes the central nervous system to reduce non-exercise physical movement (NEAT), lowering daily step count and spontaneous fidgeting.",
      "For sustainable body recomposition, reserve aggressive short-term deficits for individuals with higher initial body fat levels (above 25% body fat). Men under 18% body fat who attempt 30%+ deficits experience rapid strength losses in the weight room and early fat-loss plateaus.",
    ],
    citation: {
      text: "In a systematic review of caloric restriction in resistance-trained individuals published in the International Journal of Sport Nutrition and Exercise Metabolism, Helms ER et al. (2014) established that slower rates of weight loss (0.5% to 1.0% of body mass per week) preserve significantly more muscle mass than rapid restriction.",
      pmid: "24092765",
      detail:
        "Systematic review of dietary protein and energy restriction literature, demonstrating superior lean body mass retention when energy deficits are kept moderate.",
    },
  },
  {
    h2: "Protein targets while losing weight — the number that matters more than total calories",
    quotable:
      "Without sufficient dietary protein during a calorie deficit, up to half of scale weight loss comes from muscle tissue rather than belly fat.",
    paras: [
      "When total calorie intake is restricted, your body searches for alternative energy sources. If dietary protein is inadequate, liver and muscle tissue undergo gluconeogenesis — breaking down muscle proteins into amino acids to burn for energy. Prioritizing protein protects lean muscle tissue while forcing the body to draw energy from belly fat reserves.",
      "The optimal protein target for men in a calorie deficit is 0.8 to 1.0 grams per pound of total bodyweight (or 1.8 to 2.2 grams per kilogram). For a 190-pound man, this equals 150 to 190 grams of protein daily. Men with higher body fat can base this calculation on their estimated target lean body mass.",
      "Protein also carries a higher Thermic Effect of Food (TEF) than carbohydrates or fats, burning roughly 20% to 30% of its ingested calories during digestion. Furthermore, high protein intake suppresses ghrelin (the hunger hormone), making a calorie deficit far easier to sustain without constant cravings.",
    ],
    citation: {
      text: "In a randomized controlled trial published in the FASEB Journal, Pasiakos SM et al. (2013) found that consuming twice the Recommended Dietary Allowance of protein during a energy deficit spared muscle mass and sustained muscle protein synthesis.",
      pmid: "23739654",
      detail:
        "Randomized controlled trial evaluating muscle protein synthesis during energy deficits at varying protein intakes, confirming high protein prevents lean mass loss.",
    },
  },
  {
    h2: "How often should you recalculate your calorie target?",
    quotable:
      "As body weight decreases, daily energy requirements shrink, meaning a calorie intake that created a deficit in month one becomes maintenance by month three.",
    paras: [
      "Energy expenditure is not static. When a 210-pound man loses 15 pounds, his smaller body requires fewer calories to walk, move, breathe, and exercise. A daily intake of 2,100 calories that initially produced a 500-calorie deficit may now represent his new maintenance requirement at 195 pounds.",
      "To prevent weight-loss plateaus, recalculate your TDEE every 10 to 15 pounds of weight loss, or every 4 to 6 weeks. If your weekly average scale weight remains flat across 3 consecutive weeks under verified tracking, lower daily intake by 100 to 150 calories or add 1,500 daily steps to restore the 15–20% energy gap.",
      "Avoid lowering calories endlessly. If daily intake drops below 14 times your body weight in pounds and progress stalls, execute a 1-to-2 week diet break at updated maintenance calories to reduce physiological stress before resuming a moderate deficit.",
    ],
  },
  {
    h2: "What happens if the number is wrong",
    quotable:
      "When scale progress stalls despite accurate target calculations, the culprit is almost always portion estimation drift or unlogged liquid calories rather than a broken metabolism.",
    paras: [
      "If you calculate your daily calorie target, follow it for three weeks, and see zero change on the scale or in waist measurements, run a data audit before slashing calories further. Common causes include unlogged cooking oils, salad dressings, liquid calories, unweighed snacks, and weekend eating spikes that erase weekday deficits.",
      "Weigh all food on a digital scale in grams for 5 consecutive days to audit intake accuracy. In addition, monitor morning scale weight as a weekly median rather than panicking over daily fluid spikes caused by sodium or workout inflammation.",
      "If your food logging is 100% verified on a digital scale, your daily step count is consistent, and scale weight remains unchanged for 21 days, your starting TDEE estimate was slightly high. Lower your daily target by 120 to 150 calories to re-establish fat loss.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "How many calories should a man eat a day to lose weight?",
    a: "There is no single universal calorie number for all men. A sustainable starting target is 15% to 20% below your individual Total Daily Energy Expenditure (TDEE). Calculate your TDEE based on your height, weight, age, and activity level, then subtract 300 to 500 calories for steady fat loss.",
  },
  {
    q: "Is 1,500 calories enough for a man to lose weight?",
    a: "For smaller or sedentary men, 1,500 calories may be appropriate. For most average-to-larger or active men, 1,500 calories is an aggressive deficit that risks excessive muscle loss, severe fatigue, and rebound bingeing. A moderate deficit relative to your TDEE is significantly more sustainable.",
  },
  {
    q: "How do I find my actual maintenance calories?",
    a: "Estimate your baseline using a TDEE calculator that accounts for height, current weight, age, and activity level. Then, track your daily food intake and body weight for 14 days at that number. If your weight remains flat, you have confirmed your true maintenance baseline.",
  },
  {
    q: "How much protein should I eat while losing weight?",
    a: "Aim for 0.8 to 1.0 grams of protein per pound of body weight daily (1.8 to 2.2 g/kg). Maintaining high protein during a calorie deficit protects muscle tissue, elevates metabolic rate via digestion, and keeps hunger manageable.",
  },
  {
    q: "Should my calorie target change as I lose weight?",
    a: "Yes. As you lose body mass, your maintenance calories drop. Recalculate your TDEE every 10 to 15 pounds of weight loss (or every 4 to 6 weeks) to prevent your calorie deficit from quietly shrinking to zero.",
  },
  {
    q: "What if I'm eating the 'right' number and not losing weight?",
    a: "This is usually caused by portion estimation drift (unlogged oils, condiments, or handfuls of snacks) or short-term fluid retention masking fat loss. Audit your intake for 5 days using a digital food scale before assuming your calculated number is wrong.",
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
  title: "How Many Calories Should a Man Eat to Lose Weight? (A Real Starting Number, Not a Guess)",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How Many Calories Should a Man Eat to Lose Weight? (A Real Starting Number, Not a Guess)",
  description:
    "How to calculate a man's calorie deficit target using TDEE minus 15-20%, prioritize protein, and adjust as body weight drops.",
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
    { "@type": "Thing", name: "Calorie deficit for men" },
    { "@type": "Thing", name: "TDEE calculator" },
    { "@type": "Thing", name: "Fat loss calories" },
    { "@type": "Thing", name: "Protein intake for fat loss" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Male Nutrition & Fat Loss Coaching",
  serviceType: "Male nutrition and fat loss coaching",
  description:
    "1:1 online fitness and nutrition coaching for men to calculate TDEE, set sustainable calorie deficits, and build muscle while losing fat.",
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

export default function MaleCalorieDeficitGuidePage() {
  return (
    <>
      <JsonLd id="male-calories-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="male-calories-article-schema" data={articleSchema} />
      <JsonLd id="male-calories-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            How Many Calories Should a Man Eat to Lose Weight? (A Real Starting
            Number, Not a Guess)
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Most men lose weight fastest &mdash; and most sustainably &mdash; eating
            roughly 15-20% below their maintenance calories (TDEE), not an
            arbitrary round number like 1,500 or 2,000. The generic answer
            (&quot;men should eat 2,000 calories to lose weight&quot;) ignores that
            maintenance calories vary enormously based on height, current weight,
            age, and activity level &mdash; a 6&apos;2&quot; 220-lb man in a
            physical job and a 5&apos;8&quot; 170-lb man at a desk job have
            completely different starting points, and using the same target for both
            wastes months. The actual process: calculate maintenance (TDEE) based on
            your real numbers, subtract 15-20% for a sustainable deficit, prioritize
            protein at roughly 0.8-1g per pound of bodyweight to preserve muscle
            while losing fat, and adjust the number every few weeks as weight
            changes shift what maintenance actually is. A deficit that&apos;s too
            aggressive (30%+) accelerates initial loss but usually costs more muscle
            and triggers the rebound most crash diets end in.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Quick Answer Box */}
        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            How to set your male weight-loss calorie target
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Calculate your TDEE based on height, weight, age, and weekly activity.
            Subtract 15% to 20% to set your daily intake baseline. Set protein at
            0.8 to 1.0g per pound of bodyweight to preserve muscle, keep daily steps
            consistent, and recalculate your numbers every 10 to 15 pounds of weight
            loss. Kris Oddo, NASM-CPT, programs these exact calorie and macro targets
            for clients at Geebs Coaching.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Honest limits: Calculated TDEE targets are baseline estimates derived from
            population equations (such as Mifflin-St Jeor). Individual daily energy
            expenditure varies by &plusmn;10&ndash;15% due to non-exercise movement and
            metabolic variance, requiring 2 to 3 weeks of weight trend tracking to
            confirm your true baseline.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Sections */}
        {/* Early, in-read. The component exists because the only capture on
            these pages sat past the scroll point 97% of readers never reach. */}
        <ArticleEarlyCapture slug="how-many-calories-should-a-man-eat-to-lose-weight" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>

            <blockquote className="my-5 rounded-r-[4px] border-l-2 border-cloudText bg-cloudText/[0.06] px-4 py-3 text-[15px] italic text-bone/90">
              &ldquo;{section.quotable}&rdquo;
            </blockquote>

            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}

            {section.citation && (
              <div className="mt-5 rounded-[4px] border border-line2 bg-ink/50 px-4 py-3 text-[13.5px] leading-[1.6] text-mute max-w-[64ch]">
                <p className="font-medium text-bone/90">
                  Evidence note (Study Design: {section.citation.pmid ? "Human Clinical / Trial Data" : "Controlled Observational / Physiology Data"}):
                </p>
                <p className="mt-1">{section.citation.text}</p>
                {section.citation.pmid && (
                  <p className="mt-1 text-[12.5px] text-cloudText">
                    PubMed Reference: PMID {section.citation.pmid}
                  </p>
                )}
                {section.citation.detail && (
                  <p className="mt-1 text-[12.5px] text-mute2">
                    {section.citation.detail}
                  </p>
                )}
              </div>
            )}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        {/* Proof Module */}
        <section className="rounded-[6px] border border-line2 bg-ink/70 p-6 md:p-8">
          <p className="eyebrow text-cloudText">Interactive Deficit Tools</p>
          <h2 className="mt-2 display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Find your exact calorie starting number
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Skip static guesswork and generic rules. Calculate your maintenance
            calories (TDEE) based on your real physical measurements and establish a
            sustainable daily deficit.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/tdee-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator &rarr;
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Calculate your total daily energy expenditure based on height,
                weight, age, and activity.
              </p>
            </Link>
            <Link
              href="/tools/calorie-deficit-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                Calorie deficit calculator &rarr;
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Set a daily calorie and macro deficit target tailored to your fat
                loss rate goals.
              </p>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related reading */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and resource paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/tools/tdee-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Find your baseline maintenance energy expenditure to establish an
                accurate starting deficit.
              </span>
            </Link>
            <Link
              href="/tools/calorie-deficit-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Calorie deficit calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Calculate a 15-20% daily energy deficit tailored to your body fat
                and activity level.
              </span>
            </Link>
            <Link
              href="/guides/why-am-i-not-losing-weight-in-a-calorie-deficit"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Why am I not losing weight in a calorie deficit?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The complete data audit for when scale progress stalls: tracking drift,
                adaptive thermogenesis, and fluid masking.
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
                How beginners build muscle and lose fat simultaneously without
                relying on scale weight alone.
              </span>
            </Link>
            <Link
              href="/blog/how-much-protein-to-lose-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much protein to lose fat
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Optimal daily protein guidelines for preserving muscle mass and
                managing hunger during caloric restriction.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ Section */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
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
            Get your exact numbers mapped to your real week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A{" "}
            <Link
              href="/packages"
              className="underline hover:text-bone"
            >
              coaching package
            </Link>{" "}
            gives you a structured plan for tracking and progressive overload.
            For 1:1 online coaching with custom TDEE calculations, macro planning,
            and weekly data audits from Kris Oddo, NASM-CPT, application takes under
            two minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="how-many-calories-should-a-man-eat-to-lose-weight" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

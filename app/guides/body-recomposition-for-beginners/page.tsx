import type { Metadata } from "next";
import StatCards from "@/components/StatCards";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";

/**
 * The three numbers this guide actually prescribes.
 *
 * Defined once and used by both the summary cards and the quick-answer
 * paragraph, so the page cannot end up stating the protein target two ways.
 * Same discipline as the market bands on the coaching-cost guide.
 */
const RECOMP_RECIPE = {
  sessions: { value: "Three", unit: "a week", label: "Full-body sessions" },
  protein: { value: "0.7\u20131", unit: "g per lb", label: "Daily protein" },
  deficit: { value: "100\u2013200", unit: "kcal below maintenance", label: "The deficit" },
} as const;

const SLUG = "/guides/body-recomposition-for-beginners";
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-07-22";

export const metadata: Metadata = {
  title: "Body Recomp for Beginners: The Basics + a 3-Day Plan",
  description:
    "Body recomposition for beginners: learn the 3-day workout plan, protein and calorie targets, and how to build muscle and lose fat without extreme diets.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Body Recomp for Beginners: The Basics + a 3-Day Plan",
    description:
      "Body recomposition for beginners: learn the 3-day workout plan, protein and calorie targets, and how to build muscle and lose fat without extreme diets.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Body recomposition for beginners — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Recomp for Beginners: The Basics + a 3-Day Plan",
    description:
      "Body recomposition for beginners: learn the 3-day workout plan, protein and calorie targets, and how to build muscle and lose fat without extreme diets.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Can a beginner do body recomposition?",
    paras: [
      "Body recomposition — building muscle and losing fat simultaneously — is technically easier for beginners than for trained athletes. Untrained muscle grows rapidly even in a slight calorie deficit, because the body has not yet adapted to resistance training. If you have never lifted consistently, you are in the best physiological position you will ever be to recomp.",
      "The catch is not the biology. It is the approach. Most beginners fail recomposition not because the physiology does not work, but because they go too hard, too fast — crushing soreness in week one, confused about macros, and off the plan by week three. The beginner recomp formula is boring on purpose: 3 full-body resistance training sessions a week, a calorie intake near maintenance, and a protein target of 0.7–1g per pound of bodyweight. That is the whole plan.",
      "Progress comes from adding weight to the bar every week, not from eating less and running more. The first 8–12 weeks are largely invisible in the mirror — strength rises, body composition shifts, and the scale barely moves. That is the process working, not failing.",
    ],
  },
  {
    h2: "Is body recomposition only for beginners?",
    paras: [
      "No — but beginners have the most to gain from it. The beginner advantage is real: untrained muscle responds to any stimulus with new growth, even in a mild deficit, because the training signal is so novel. After 12–18 months of consistent lifting, the body becomes more efficient and the recomp window narrows. At that point, dedicated bulking or cutting cycles produce faster results than simultaneous recomposition.",
      "Experienced lifters can still recomp — the rate is just slower and the programming needs to be more precise. If you are returning after a long break, you also have access to faster-than-expected recomp through muscle memory effects, even if you are technically not a first-time beginner.",
    ],
  },
  {
    h2: "What to eat for body recomposition as a beginner",
    paras: [
      "Protein is the non-negotiable. Hit 0.7–1g per pound of bodyweight every day. For a 185-lb man, that is roughly 130–185g of protein. Everything else — calories, carbs, fat split — matters much less at the beginner stage. Use the macro calculator to set a starting target.",
      "Calorie intake should sit near maintenance — typically 100–200 calories below TDEE at most. Eating too little sends a signal that pushes the body toward muscle catabolism before fat. A large deficit is the beginner's most common mistake, and it produces exactly the wrong result: you get smaller and still soft.",
      "A beginner recomp meal plan does not need to be complicated. Protein at every meal — eggs, chicken, Greek yogurt, cottage cheese, lean beef, protein shakes — starchy carbs around training, vegetables filling the plate. The framework is simple because the beginner phase does not require the precision that the advanced phase does.",
    ],
  },
  {
    h2: "Body recomposition workout plan for beginners",
    paras: [
      "Three full-body sessions per week. That is the template. Monday-Wednesday-Friday, Tuesday-Thursday-Saturday, or any combination with a rest day between each session. The split matters less than the consistency.",
      "Each session is built around compound movements: squat pattern, hip hinge, push, pull, carry. These movements hit the most muscle tissue per unit of effort and drive the most adaptation. Isolation work — curls, lateral raises — is accessory, not the foundation.",
      "Progressive overload is the mechanism. Add weight or reps every session when you can move the current load cleanly. The beginner's advantage is that progress comes fast — a 5-lb plate increase per session is realistic in the early weeks. When progress stalls, that is when programming precision matters more, which is also when coaching earns its value.",
    ],
  },
  {
    h2: "How long does body recomposition take for beginners?",
    paras: [
      "Strength changes are measurable within 2–4 weeks. The first gains are mostly neurological — your nervous system learns to recruit muscle more efficiently before the muscle tissue itself grows. This is why beginners feel stronger quickly even before visible change.",
      "Mirror changes appear around 8–12 weeks of consistent training and nutrition. The window is wide because it depends on starting body fat, protein intake, sleep, and training consistency. Most men in the 15–25% body fat range see noticeable shape change within 10–12 weeks.",
      "Anyone promising visible results in 4 weeks is selling the restart cycle, not the actual result. The restart cycle is what you have probably already experienced — the aggressive start, the early results, the stall, the quit, the restart. The boring 12-week version that compounds over time is what actually changes the body.",
    ],
  },
  {
    h2: "When does a beginner need a coach for recomposition?",
    paras: [
      "Not always — a beginner who is self-motivated, knows how to add weight progressively, and can track protein reasonably accurately can run a basic recomp for the first 3–6 months on their own. The $24.99/month community is a low-commitment starting point for lifters who just want shared accountability and discussion.",
      "Coaching becomes more valuable when: the scale has not moved and neither has the mirror after 8 weeks; form is uncertain enough that injury risk is rising; the plan keeps breaking on hard weeks; or you have tried the DIY version twice and quit. The feedback loop that a coach provides — weekly data review, programming adjustments, and someone noticing when things are off — is the mechanism that converts a good beginner phase into a durable long-term result.",
      "Most clients who engage coaching during the beginner phase exit it more advanced than those who try to figure it out alone. Not because the information is secret, but because adherence with accountability is structurally different from adherence without it.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Can you gain muscle in a calorie deficit?",
    a: "Yes — beginners can gain muscle in a mild calorie deficit, and this is precisely what body recomposition is. Untrained muscle responds to resistance training with rapid growth even when calories sit slightly below maintenance, because the training signal is so novel. The requirement is a high protein intake (0.7–1g per pound of bodyweight), a modest deficit (100–200 calories below TDEE at most), and three progressive strength sessions per week. Kris Oddo, NASM-CPT, coaches beginners through this formula at Geebs Coaching. Advanced lifters with years of training history have a much narrower window for simultaneous muscle gain and fat loss.",
  },
  {
    q: "Can a complete beginner do body recomposition?",
    a: "Yes — and better than most trained athletes. Beginners build muscle even in a mild calorie deficit because untrained muscle responds to any resistance training stimulus with rapid growth. The catch is the approach, not the biology: 3 sessions per week, near-maintenance calories, and a high protein target. That is the whole formula.",
  },
  {
    q: "How many calories should a beginner eat for recomp?",
    a: "Near maintenance — typically 100–200 calories below TDEE. Eating too little drives muscle loss before fat loss. A large deficit is the most common beginner mistake. Use the macro calculator to set a starting point, then adjust based on what the first 4 weeks show.",
  },
  {
    q: "Do I need to track macros as a beginner?",
    a: "Protein tracking matters most. Hit 0.7–1g per pound of bodyweight every day. Total calorie tracking becomes more important after the beginner phase, when results slow and precision produces more progress. For the first 3 months, protein is the number that moves the needle.",
  },
  {
    q: "Will the scale move during recomp?",
    a: "Probably not much — and that is the goal. The scale staying flat while the mirror improves is what recomposition looks like from the outside. Weight is not the right metric for this process. Body measurements, strength progress, and how your clothes fit are more useful signals.",
  },
  {
    q: "How long does beginner recomposition take to see results?",
    a: "Strength in 2–4 weeks. Mirror changes in 8–12 weeks of consistency. Anyone promising visible results faster is selling a restart cycle, not a sustainable result.",
  },
  {
    q: "Should I bulk or cut instead of recomp as a beginner?",
    a: "For most men in the 15–25% body fat range, recomposition is the right starting approach — it builds muscle while the fat comes down simultaneously. Cut first only if you are significantly overweight (30%+ body fat). Bulk first only if you are extremely lean and underweight. For everyone in the middle, recomp wins.",
  },
  {
    q: "When does recomp stop working?",
    a: "After 6–18 months of consistent training, newbie gains slow and the simultaneous recomp window narrows. At that point, deliberate bulk and cut cycles produce faster results. That transition is also when programming precision matters most — and when coaching pays the most dividends.",
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
  title: "Body Recomposition for Beginners: Can You Build Muscle and Lose Fat at the Same Time?",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Body Recomposition for Beginners: Can You Build Muscle and Lose Fat at the Same Time?",
  description:
    "The beginner recomp formula, why beginners are the best candidates, realistic timelines, and when coaching accelerates the process.",
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
    { "@type": "Thing", name: "Beginner fitness" },
    { "@type": "Thing", name: "Building muscle and losing fat" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Body Recomposition Coaching for Beginners",
  serviceType: "Body recomposition coaching for beginners",
  description:
    "1:1 online coaching for beginners pursuing simultaneous muscle gain and fat loss — the beginner recomp formula with weekly adjustments from a named coach.",
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

export default function RecompBeginnerPage() {
  return (
    <>
      <JsonLd id="recomp-beginner-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="recomp-beginner-article-schema" data={articleSchema} />
      <JsonLd id="recomp-beginner-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Body recomposition for beginners: can you actually build muscle and
            lose fat at the same time?
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Body recomposition is technically <em>easier</em> for beginners
            than for trained athletes — untrained muscle grows even in a slight
            calorie deficit. If you have never lifted consistently, you are in
            the best position you will ever be to recomp. Here is the formula,
            the realistic timeline, and when coaching accelerates the process.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Can you gain muscle in a calorie deficit?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Yes &mdash; beginners can gain muscle in a mild calorie deficit.
            This is body recomposition: untrained muscle grows from resistance
            training even when calories sit slightly below maintenance, because
            the training signal is so new that the body prioritizes muscle
            building ahead of pure energy conservation. Kris Oddo, NASM-CPT,
            coaches this formula through Geebs Coaching with {RECOMP_RECIPE.sessions.value.toLowerCase()} full-body
            sessions per week, a protein target of {RECOMP_RECIPE.protein.value}&thinsp;g per
            pound of bodyweight, and a modest deficit of {RECOMP_RECIPE.deficit.value} calories
            below maintenance.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Honest limits: the window for gaining muscle in a calorie deficit
            narrows significantly after 12&ndash;18 months of consistent
            training. Experienced lifters typically need a dedicated bulk to add
            meaningful muscle mass. Beginners are the exception, not the rule.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* The recipe, hoisted. All three numbers were already in the quick
            answer, inside one sixty-word sentence, which is not where someone
            who came here to find out what to do actually finds them. */}
        <StatCards
          sectionId="recomp_beginner_recipe"
          heading="What a beginner recomp actually runs on"
          stats={[
            {
              label: RECOMP_RECIPE.sessions.label,
              value: RECOMP_RECIPE.sessions.value,
              unit: RECOMP_RECIPE.sessions.unit,
              detail:
                "Full-body, so every muscle gets the new training signal several times a week. That signal is the reason this works at all.",
            },
            {
              label: RECOMP_RECIPE.protein.label,
              value: RECOMP_RECIPE.protein.value,
              unit: RECOMP_RECIPE.protein.unit,
              emphasis: true,
              detail:
                "Hit this before anything else. Calories can flex around your week; protein is what protects the muscle you are trying to build.",
            },
            {
              label: RECOMP_RECIPE.deficit.label,
              value: RECOMP_RECIPE.deficit.value,
              unit: RECOMP_RECIPE.deficit.unit,
              detail:
                "Modest on purpose. A large deficit removes the energy the new muscle is being built from, which turns a recomp into a plain cut.",
            },
          ]}
          footnote="Beginners are the exception, not the rule: the window narrows a lot after 12 to 18 months of consistent training."
        />

        <div className="hair my-10 md:my-14" />

        {/* Early, in-read. The component exists because the only capture on

            these pages sat past the scroll point 97% of readers never reach. */}

        <ArticleEarlyCapture slug="body-recomposition-for-beginners" sourcePrefix="guide-early" />


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

        <section className="rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] px-5 py-5 md:px-6" aria-labelledby="beginner-start">
          <p className="eyebrow text-cloudText">Start this week</p>
          <h2 id="beginner-start" className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]">
            The first three decisions are enough
          </h2>
          <ol className="mt-4 grid gap-3 text-[15px] leading-[1.65] text-bone/85 md:grid-cols-3">
            <li><strong className="text-bone">Pick three days.</strong> Put full-body lifting on the calendar with a rest day between sessions.</li>
            <li><strong className="text-bone">Set one food target.</strong> Start with protein, then use calories as a steady starting point instead of a crash diet.</li>
            <li><strong className="text-bone">Track three signals.</strong> Weekly average weight, waist, and your main lifts tell you more than any single weigh-in.</li>
          </ol>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-mute">
            Get your personal starting numbers with the {" "}
            <Link href="/tools/body-recomposition-calculator" className="underline hover:text-bone">body recomposition calculator</Link>,
            see a realistic timeline in{" "}
            <Link href="/guides/how-long-to-see-results-working-out" className="underline hover:text-bone">how long it takes to see results</Link>
            , and get a target date from the free{" "}
            <Link href="/free/forecast" className="underline hover:text-bone">body recomposition forecast</Link>.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related reading */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/guides/body-recomposition-program-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition program for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Actionable protocol for men: progressive resistance training, near-maintenance calories, protein distribution, and progress tracking metrics.
              </span>
            </Link>
            <Link
              href="/blog/body-recomposition-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The deeper breakdown of the recomp method for men who have some
                training history — macros, programming, and what the advanced
                phase looks like.
              </span>
            </Link>
            <Link
              href="/blog/body-recomposition-for-women"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for women
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How the same recomp formula applies to women — training
                frequency, protein targets, and why the scale is a poor
                progress tool during recomp.
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
                Get a recomp viability read, calorie target, and protein goal
                based on your training experience and body fat — takes 60
                seconds.
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
                Set your protein target and calorie starting point — the two
                numbers that determine whether beginner recomp actually works.
              </span>
            </Link>
            <Link
              href="/for/skinny-fat-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Coaching for skinny-fat men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Skinny-fat is where beginner recomp is most powerful — build
                the muscle your frame is missing while the soft midsection
                comes down.
              </span>
            </Link>
            <Link
              href="/blog/how-to-fix-skinny-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to fix skinny fat
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Why the scale looks fine but the mirror does not, and the
                muscle-first fix that gets a beginner recomp started.
              </span>
            </Link>
            <Link
              href="/blog/cut-vs-recomp-vs-bulk"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Cut vs recomp vs bulk: which is right for you?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The decision framework for choosing between the three paths —
                body fat percentage, training age, and goal alignment.
              </span>
            </Link>
            <Link
              href="/science/questions/should-you-cut-or-recomp-first"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Should you cut or recomp first?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                A peer-reviewed answer for choosing the first phase without
                overcorrecting into a crash diet or a hard bulk.
              </span>
            </Link>
            <Link
              href="/guides/how-to-build-muscle-on-a-plant-based-diet-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to build muscle on a plant-based diet
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Protein targets, leucine thresholds, and meal structuring for plant-based muscle building and recomposition.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much does a fitness coach cost?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Honest 2026 pricing for 1:1 coaching, monthly packages, and the
                cost-per-result framing.
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
                Review targeted supplements, tracking protocols, and training gear from Titan Forge designed for recomposition phases.
              </span>
            </a>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
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
            Start with structure, not guesswork
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The{" "}
            <Link href="/memberships/science-based-community" className="underline hover:text-bone">
              $24.99/month science-based community
            </Link>{" "}
            is the low-commitment entry point — a room of lifters working
            through the same beginner phase. For 1:1 coaching with weekly
            adjustments from Kris, the application is three questions and under
            two minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply?utm_source=site&utm_medium=guide&utm_campaign=beginner_recomp&utm_content=beginner_recomp_bottom_cta" className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="body-recomposition-for-beginners" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

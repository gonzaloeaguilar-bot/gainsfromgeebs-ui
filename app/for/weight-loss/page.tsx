import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/weight-loss";
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-07-03";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=weight_loss_bottom_cta";

export const metadata: Metadata = {
  title: "Online Weight-Loss Coaching for Men | Lose Fat, Keep Muscle",
  description:
    "1:1 online weight-loss coaching for men who want the scale down and the mirror better: modest deficit, high protein, strength training, and weekly adjustments.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "Online Weight-Loss Coaching for Men — Fat Loss Without the Skinny-Soft Ending",
    description:
      "Most weight-loss programs make you a smaller, softer version of yourself. Geebs coaches fat loss through recomposition so the scale drops AND the mirror improves.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online weight-loss coaching for men — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Weight-Loss Coaching for Men",
    description:
      "Fat loss coaching through recomposition — the scale drops and the mirror improves. Kris Oddo, NASM-CPT.",
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
      name: "How much weight can I realistically lose with online coaching?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Honest answer: most men lose 0.5–1 lb per week under consistent conditions at a modest deficit with high protein and strength training. That is 4–8 lb per month of real fat — not water weight or muscle. Anyone promising faster results is not accounting for muscle retention. Coaching does not guarantee a number; it builds the conditions where the right number is likely.",
      },
    },
    {
      "@type": "Question",
      name: "Should I do more cardio or more lifting to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lifting with a calorie deficit wins for men who do not want to end up smaller and softer. Strength training preserves and builds muscle while the deficit runs. Cardio burns calories in the session but does not change body composition the way resistance training does. Low-intensity cardio — walks, easy cycling — is a useful supplement, not the primary tool.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to count calories to lose fat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tracking is the most reliable way to know what you are actually eating, but rigid calorie counting is not the only path. Coaching uses flexible macro targets and consistency signals rather than obsessive logging. There are practical ways to create and hold a deficit without tracking every gram.",
      },
    },
    {
      "@type": "Question",
      name: "Will I lose muscle while trying to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You will lose some muscle in any calorie deficit if you are not actively training and eating enough protein. With a modest deficit (200–300 calories below maintenance), protein at or above 0.8g per pound of bodyweight, and consistent strength training, muscle loss is minimal and many clients simultaneously add muscle while losing fat. That is what recomposition means.",
      },
    },
    {
      "@type": "Question",
      name: "What about weekends and alcohol — do I have to give them up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The coaching approach accounts for real social eating and occasional drinking without treating any deviation as a failure. The goal is managing the weekly calorie average, not maintaining a perfect daily streak.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a generic weight-loss program or app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic programs do not adjust to your week. If your calorie deficit is too aggressive and you are losing muscle, they do not catch it. If your deficit has eroded over time and you have stalled, they do not see it. 1:1 coaching with weekly data review identifies those patterns and corrects them before they become a months-long plateau.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when I hit a fat-loss plateau?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plateaus are diagnostic, not final. Common causes: the calorie deficit has eroded as bodyweight has dropped, protein has drifted below the target, or training intensity has dropped. Weekly check-ins catch these patterns early. A plateau in week three looks different from a plateau in week twelve and is treated differently.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Online Weight-Loss Coaching for Men — Fat Loss Without the Skinny-Soft Ending",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Online Weight-Loss Coaching for Men — Fat Loss Without the Skinny-Soft Ending",
  description:
    "Fat loss through recomposition — how Geebs coaches the scale down without the skinny-soft result standard weight-loss programs produce.",
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
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
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online weight-loss coaching" },
    { "@type": "Thing", name: "Fat loss through body recomposition" },
    { "@type": "Thing", name: "Men's fat-loss coaching" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Weight-Loss Coaching for Men",
  serviceType: "Online weight-loss coaching for men",
  description:
    "1:1 online fat-loss coaching through body recomposition — modest deficit, high protein, progressive strength training so the scale drops and the mirror improves.",
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

export default function WeightLossPage() {
  return (
    <>
      <JsonLd id="weight-loss-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="weight-loss-article-schema" data={articleSchema} />
      <JsonLd id="weight-loss-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online weight-loss coaching for men — fat loss without the
            skinny-soft ending
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Most weight-loss programs make you a smaller, softer version of
            yourself. Geebs coaches fat loss through recomposition — strength
            training, high protein, and a modest deficit — so the scale drops
            and the mirror improves at the same time.
          </p>
          <ProofStrip className="mt-6" />
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
            Online weight-loss coaching for men: the short version
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            The best online weight-loss coaching for men is not a crash diet or
            cardio-only plan. It uses a modest calorie deficit, high protein,
            progressive strength training, and weekly adjustments so fat comes
            down while muscle stays. Kris Oddo, NASM-CPT, coaches the process
            as body recomposition first: the scale should trend down, but the
            mirror and strength log need to improve too.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Use the{" "}
            <Link
              href="/tools/body-recomposition-calculator"
              className="underline hover:text-bone"
            >
              body recomposition calculator
            </Link>{" "}
            for a starting calorie and protein target, or compare support
            levels in the{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              online fitness coaching cost guide
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Section 1 */}
        {/* Price before the ask. Nine of twelve money pages never stated a
            coaching price; on these 21 the only figure was the community at
            67-91% depth. */}
        <CoachingPriceLine />

        {/* Early, in-read. These 21 audience pages carried no capture at
            all, and two of them are the highest buying-intent pages on the
            site by human search demand. */}
        <ArticleEarlyCapture
          slug="weight-loss"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Why most weight-loss programs leave you smaller and softer
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The standard weight-loss playbook — eat less, do cardio, repeat —
            produces a predictable result: you end up a smaller, softer version
            of yourself. The scale drops. The mirror does not improve. You have
            lost muscle alongside fat, which is why the physique looks worse at
            a lower bodyweight than it did before the cut.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            This is not a willpower failure. It is a method failure. Aggressive
            deficits without resistance training and adequate protein burn
            through muscle as readily as fat. The body does not distinguish
            between the two when the conditions favor breakdown.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The fix is fat loss through recomposition: a modest calorie deficit,
            a high protein target, and three strength sessions per week to
            preserve and build muscle while the deficit runs. The scale drops.
            Strength goes up or holds. The mirror improves, often before the
            number on the scale moves significantly.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 2 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Fat loss coaching through the recomp method
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The Geebs approach to fat loss is not a different system — it is the
            core recomposition method with fat loss as the primary objective.
            Training stays at three quality sessions per week, progressive and
            strength-focused. Protein targets stay high. The deficit is modest:
            200–300 calories below maintenance, not a crash.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            What coaching adds is the feedback loop. A deficit that is too
            aggressive stalls muscle retention. A deficit that is too small
            stalls fat loss. Weekly check-ins against real data — body weight
            trends, training performance, energy levels, sleep — allow the
            calorie target to adjust dynamically rather than staying fixed at a
            number that made sense week one.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Most clients who have struggled with weight loss before were either
            doing too much (cardio-heavy, aggressive deficit, no strength
            training) or too little (inconsistent tracking, no protein target).
            Coaching identifies which and corrects it without starting over from
            scratch.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 3 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Weight-loss coaching for busy professionals
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The most common reason fat loss stalls for professional men is not
            diet composition or program design — it is adherence under
            real-week pressure. Late nights, client dinners, travel, compressed
            schedules, and low sleep all degrade the best-designed plan.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Coaching for busy professionals means the plan is built to survive
            your actual week, not a hypothetical perfect one. Nutrition targets
            use flexible macros so a client dinner or a weekend without weighing
            food does not become a failure event. Training sessions are 45
            minutes and three days a week so a missed day is recoverable.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The daily accountability check-in is where most of the fat-loss work
            happens: it catches the week drifting before it becomes a full
            derailment, recalibrates when a business trip changes everything, and
            provides a consistent signal that the plan is working even when the
            scale is in its normal weekly fluctuation range.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 4 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Cardio vs lifting for fat loss — the honest answer
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Cardio burns calories during the session. Lifting builds muscle, and
            muscle raises your resting metabolic rate. For men trying to lose
            fat without ending up skinny-soft, the arithmetic favors lifting with
            a calorie deficit over cardio with a calorie deficit — every time.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That does not mean cardio is useless. Low-intensity cardio (walks,
            easy cycling) can increase the weekly calorie deficit without
            meaningfully interfering with recovery. It becomes problematic when
            it competes with recovery capacity for strength training or when it
            is used as a substitute for managing calories.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The Geebs approach uses strength training as the foundation and
            treats cardio as optional supplemental activity, not the primary
            fat-loss driver. Clients who dislike cardio still lose fat. Clients
            who enjoy walking add it in. Neither group uses HIIT as the core of
            a weight-loss strategy.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 5 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What realistic fat loss looks like week to week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            At a 200–300 calorie daily deficit with high protein and consistent
            strength training, most men lose 0.5–1 lb per week on a bodyweight
            trend basis. The scale moves less predictably day to day — water,
            salt, sleep, and stress all swing the daily number by 2–4 lb — which
            is why week-to-week trend data is the metric that matters, not the
            daily weigh-in.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Progress is measured across multiple variables: scale weight trend,
            training performance (strength held or progressed means muscle is
            being retained), energy levels, and how clothes fit. Fat loss that
            preserves muscle looks dramatically different from fat loss that does
            not, even at the same bodyweight reduction.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The honest range is 0.5–1 lb of actual fat per week under good
            conditions. Faster rates almost always involve muscle loss. Slower
            rates usually mean the deficit is smaller than assumed — which
            coaching diagnoses and corrects.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 6 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Weekends, alcohol, and eating out while losing fat
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The most predictable fat-loss stall pattern: perfect adherence
            Monday–Thursday, then an untracked weekend that wipes out the weekly
            deficit. Four good days plus three bad ones adds up to maintenance
            or slight surplus, not fat loss.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The coaching approach does not require weekend abstinence or tracking
            every restaurant meal. It requires understanding your calorie anchor
            — what a maintenance day actually looks like — and navigating
            deviations deliberately rather than pretending they are not
            happening.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For a full breakdown of managing alcohol and social eating within a
            fat-loss plan, see the guide on{" "}
            <Link
              href="/blog/alcohol-fitness-men"
              className="underline hover:text-bone"
            >
              alcohol and fitness for men
            </Link>
            . The short version: alcohol itself is not catastrophic; the food
            eaten alongside it usually is.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 7 */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Fat loss without losing muscle — the protein and training floor
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Two non-negotiables for fat loss that actually looks good: protein at
            or above 0.8–1g per pound of bodyweight, and three sessions per week
            of progressive strength training. Remove either and the deficit runs
            through muscle as readily as fat.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            High protein has a secondary benefit beyond muscle retention: it is
            the most satiating macronutrient, which means high-protein diets are
            easier to maintain in a deficit than low-protein ones. The hunger is
            genuinely lower. Coaching sets protein targets first and builds
            calorie targets around them.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For more on how protein intake works for fat loss specifically, see
            the blog post on{" "}
            <Link
              href="/blog/how-much-protein-to-lose-fat"
              className="underline hover:text-bone"
            >
              how much protein to lose fat
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Get a starting calorie target, protein goal, and honest
                12-week recomp read from your current stats.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coaching cost guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Compare 1:1 coaching, self-guided programs, and cheaper app
                options before you apply.
              </span>
            </Link>
            <Link
              href="/for/skinny-fat-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For skinny-fat men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If the problem is soft middle with thin arms — not just scale
                weight — the recomp approach is tailored for that specifically.
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
                The protein target that preserves muscle in a deficit and why it
                is the most important single variable in fat loss.
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
                Find your maintenance calories and calculate a modest daily
                deficit based on your current weight and activity level.
              </span>
            </Link>
            <Link
              href="/blog/calorie-deficit-without-counting-everything"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Calorie deficit without counting everything
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How to create and hold a consistent deficit using anchoring and
                flexible tracking instead of obsessive logging.
              </span>
            </Link>
            <Link
              href="/blog/alcohol-fitness-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Alcohol and fitness for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How to manage drinking without destroying fat-loss progress —
                the practical framework, not an abstinence pitch.
              </span>
            </Link>
            <Link
              href="/for/busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If a packed calendar is the consistency problem, this page
                covers how coaching is structured around that constraint.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions about weight-loss coaching
          </h2>
          <dl className="mt-6">
            <div className="mt-7 first:mt-0">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                How much weight can I realistically lose with online coaching?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Honest answer: most men lose 0.5–1 lb per week under consistent
                conditions at a modest deficit with high protein and strength
                training. That is 4–8 lb per month of real fat — not water
                weight or muscle. Anyone promising faster results is not
                accounting for muscle retention. Coaching does not guarantee a
                number; it builds the conditions where the right number is
                likely.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                Should I do more cardio or more lifting to lose weight?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Lifting with a calorie deficit wins for men who do not want to
                end up smaller and softer. Strength training preserves and builds
                muscle while the deficit runs. Cardio burns calories in the
                session but does not change body composition the way resistance
                training does. Low-intensity cardio — walks, easy cycling — is a
                useful supplement, not the primary tool.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                Do I have to count calories to lose fat?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Tracking is the most reliable way to know what you are actually
                eating, but rigid calorie counting is not the only path. Coaching
                uses flexible macro targets and consistency signals rather than
                obsessive logging. For more on this approach, see the guide on{" "}
                <Link
                  href="/blog/calorie-deficit-without-counting-everything"
                  className="underline hover:text-bone"
                >
                  creating a calorie deficit without counting everything
                </Link>
                .
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                Will I lose muscle while trying to lose weight?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                You will lose some muscle in any calorie deficit if you are not
                actively training and eating enough protein. With a modest
                deficit (200–300 calories below maintenance), protein at or above
                0.8g per pound of bodyweight, and consistent strength training,
                muscle loss is minimal and many clients simultaneously add muscle
                while losing fat. That is what recomposition means.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                What about weekends and alcohol — do I have to give them up?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                No. The coaching approach accounts for real social eating and
                occasional drinking without treating any deviation as a failure.
                The goal is managing the weekly calorie average, not maintaining
                a perfect daily streak. See the full breakdown on{" "}
                <Link
                  href="/blog/alcohol-fitness-men"
                  className="underline hover:text-bone"
                >
                  alcohol and fitness for men
                </Link>
                .
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                How is this different from a generic weight-loss program or app?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Generic programs do not adjust to your week. If your calorie
                deficit is too aggressive and you are losing muscle, they do not
                catch it. If your deficit has eroded over time and you have
                stalled, they do not see it. 1:1 coaching with weekly data review
                identifies those patterns and corrects them before they become a
                months-long plateau.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                What happens when I hit a fat-loss plateau?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Plateaus are diagnostic, not final. Common causes: the calorie
                deficit has eroded as bodyweight has dropped (maintenance goes
                down, so the deficit shrinks), protein has drifted below the
                target, or training intensity has dropped. Weekly check-ins catch
                these patterns early. A plateau in week three looks different
                from a plateau in week twelve and is treated differently.
              </dd>
            </div>
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Fat loss that looks good, not just lighter
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or the full{" "}
            <Link
              href="/blog/body-recomposition-for-men"
              className="underline hover:text-bone"
            >
              body recomposition method
            </Link>
            . 1:1 coaching is application-based — three questions, under two
            minutes. The strategy call covers your history, current situation,
            and what a realistic starting point looks like.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Want the peer-reviewed evidence behind the method? Start with{" "}
            <Link
              href="/science/questions/does-lifting-help-during-weight-loss"
              className="underline hover:text-bone"
            >
              whether lifting helps during weight loss
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-do-you-avoid-losing-muscle-while-dieting"
              className="underline hover:text-bone"
            >
              how to avoid losing muscle while dieting
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-protein-help-you-stay-full"
              className="underline hover:text-bone"
            >
              whether protein actually keeps you full
            </Link>
            , and{" "}
            <Link
              href="/science/questions/how-much-cardio-for-fat-loss"
              className="underline hover:text-bone"
            >
              how much cardio fat loss really needs
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="for_weightloss_primary">
              Get a fat-loss plan for your week
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

        <HubRetentionCTA hub="weight-loss" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

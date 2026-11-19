import type { Metadata } from "next";
import ComparisonPage from "../_shared/ComparisonPage";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Geebs vs Future: 1:1 Coach or App-Based Training?",
  description:
    "Geebs (1:1 NASM-CPT) vs Future (app-based $199/mo): custom programming, dedicated coach, weekly check-ins, nutrition coaching included.",
  alternates: { canonical: `${SITE_URL}/vs/future` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/vs/future`,
    title: "Geebs Coaching vs Future",
    description:
      "1:1 coach-led vs app-based — which fits better, and when.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching vs Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geebs Coaching vs Future",
    description:
      "1:1 coach-led vs app-based personal training.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function VsFuturePage() {
  return (
    <ComparisonPage
      slug="future"
      dateModified="2026-06-10"
      eyebrow="Comparison"
      h1="Geebs Coaching vs Future"
      lede="Future is an app-based personal training service that pairs you with a remote coach for around $199/month. Geebs Coaching is 1:1 online coaching with Kris Oddo (NASM-CPT) — application required, fully customized programming, daily accountability, and weekly check-ins. Here is how they actually differ for working clients."
      competitorName="Future"
      competitorTagline="app-based remote training"
      keyDifferences={[
        {
          point: "Who coaches you",
          geebs: "Kris Oddo personally — same coach every week, no reassignments.",
          competitor: "A coach matched from a pool; the platform can reassign you.",
        },
        {
          point: "Nutrition coaching",
          geebs: "Included — macro targets and a habit framework built into 1:1.",
          competitor: "Training-focused; nutrition varies by coach and is not guaranteed.",
        },
        {
          point: "Programming",
          geebs: "Fully custom to your schedule, equipment, history, and weekly data.",
          competitor: "Coach-built in the app; template quality varies by coach.",
        },
        {
          point: "Entry gate & price",
          geebs: "Application required; quoted on the call (real investment, not $99/mo).",
          competitor: "No application; ~$199/month subscription.",
        },
      ]}
      rows={[
        {
          dimension: "Format",
          geebs: "1:1 online coaching, application required.",
          competitor: "App-based with daily messaging from a remote coach.",
        },
        {
          dimension: "Who coaches you",
          geebs: "Kris Oddo personally. Every program, daily message, check-in, adjustment.",
          competitor:
            "A coach matched from a pool. Coach can be reassigned by the platform.",
        },
        {
          dimension: "Pricing",
          geebs:
            "Quoted on the strategy call after the application. Real money — not designed for $99/mo budgets.",
          competitor: "~$199/month, sometimes with promotional discounts.",
        },
        {
          dimension: "Programming style",
          geebs:
            "Custom programming built around your gym access, schedule, training history, and goals.",
          competitor:
            "Coach builds workouts in the Future app; templates vary by coach.",
        },
        {
          dimension: "Check-in cadence",
          geebs: "Daily accountability + weekly structured check-in with Kris.",
          competitor: "Daily messaging from the coach via the app.",
        },
        {
          dimension: "Nutrition coaching",
          geebs:
            "Macro targets and habit framework included in 1:1 coaching.",
          competitor:
            "Not a core focus. Some coaches offer nutrition guidance; not guaranteed.",
        },
        {
          dimension: "Application required",
          geebs: "Yes. Filters fit before the strategy call.",
          competitor: "No. Sign up and get matched.",
        },
        {
          dimension: "Best for",
          geebs:
            "People who have tried apps/programs and want a coach who actually knows them.",
          competitor:
            "People who want lightweight remote accountability via app messaging.",
        },
      ]}
      whenGeebs={[
        "You have already tried apps and they did not stick.",
        "You want fully custom programming, not template-driven workouts.",
        "You want one coach who learns you over months, not a rotating cast.",
        "Nutrition matters to you — not just training.",
      ]}
      whenCompetitor={[
        "You want lightweight, lower-cost accountability.",
        "You are okay with app-mediated communication rather than direct messaging.",
        "Training-only is enough — you handle nutrition on your own.",
        "You are not ready to apply or commit to a longer coaching relationship.",
      ]}
      bottomLine="Future is a fine entry point for app-based remote training. Geebs is the next step up for people who have already tried that layer and want a real 1:1 relationship with a single coach. The application gate is intentional — it filters fit so the call is the work, not a sales pitch."
      faqs={[
        {
          q: "How much does Geebs Coaching cost compared to Future?",
          a: "Geebs Coaching is positioned as a real investment, not a $99/month subscription. Exact package options are covered on the strategy call after the application. Future is around $199/month with no application step. If pricing is the main issue, the Geebs $24.99/month community and $100 one-time consultation call are the entry-level alternatives.",
        },
        {
          q: "Do I get a dedicated coach with both?",
          a: "With Geebs, your coach is always Kris Oddo. With Future, you are matched to a coach from a pool and the platform can reassign you. Continuity of relationship is structurally different between the two.",
        },
        {
          q: "Which one includes nutrition coaching?",
          a: "Geebs Coaching includes macro-target nutrition coaching as a core part of 1:1. Future is primarily training-focused; nutrition support varies by coach and is not guaranteed.",
        },
        {
          q: "Can I switch from Future to Geebs?",
          a: "Yes. Many Geebs clients have used Future or similar apps before. Bringing prior training data to the strategy call helps Kris build a better starting program quickly.",
        },
        {
          q: "Does Future assign you a dedicated coach you keep long-term?",
          a: "Future matches you to a coach from a pool, and the platform can reassign coaches. With Geebs, your coach is always Kris Oddo — no reassignments. That continuity matters because the coaching relationship accumulates context: your patterns, your schedule, your sticking points. A reassigned coach starts that process over.",
        },
        {
          q: "Is Future app coaching enough for body recomposition?",
          a: "Future is primarily training-focused; nutrition support varies by coach and is not guaranteed. Body recomposition — losing fat while building muscle — requires tight nutrition coaching alongside training, and weekly adjustment against your actual data. If that combination is what you need, it is worth comparing what each format actually delivers before committing.",
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import ComparisonPage from "../_shared/ComparisonPage";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Geebs Coaching vs Caliber — 1:1 Coach vs Fitness App",
  description:
    "Geebs Coaching vs Caliber: compare 1:1 online coaching, app coaching, customization, accountability, pricing, and who each is built for.",
  alternates: { canonical: `${SITE_URL}/vs/caliber` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/vs/caliber`,
    title: "Geebs Coaching vs Caliber",
    description:
      "App-first with optional coaching vs 1:1 coach-led — which works when you are tired of self-coaching.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching vs Caliber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geebs Coaching vs Caliber",
    description:
      "App-first fitness coaching vs 1:1 coach-led programming.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function VsCaliberPage() {
  return (
    <ComparisonPage
      slug="caliber"
      dateModified="2026-06-10"
      eyebrow="Comparison"
      h1="Geebs Coaching vs Caliber"
      lede="Caliber is a strong app-first fitness product with a free tier and optional premium remote coaching. Geebs Coaching is 1:1 online coaching with Kris Oddo (NASM-CPT): application required, no app subscription, direct coach judgment, and daily accountability when the problem is no longer workout access."
      competitorName="Caliber"
      competitorTagline="fitness app with optional coaching"
      keyDifferences={[
        {
          point: "Core model",
          geebs: "1:1 coach-led from day one — no app tier to outgrow.",
          competitor: "App-first with a free tier; coaching is a premium add-on.",
        },
        {
          point: "Coach attention",
          geebs: "Kris Oddo personally — daily accountability and weekly check-ins.",
          competitor: "Premium-tier coach matched to you; attention depends on coach load.",
        },
        {
          point: "Bad-week handling",
          geebs: "Kris adjusts the week from real check-in context (sleep, travel, adherence).",
          competitor: "App keeps the plan available; support depends on the premium tier.",
        },
        {
          point: "Pricing",
          geebs: "Quoted on the call — a real investment, not a subscription.",
          competitor: "Free app; premium coaching starts around $200/month.",
        },
      ]}
      rows={[
        {
          dimension: "Format",
          geebs: "1:1 online coaching, application required.",
          competitor:
            "Workout app (free tier) with optional premium remote coaching add-on.",
        },
        {
          dimension: "Coach attention",
          geebs:
            "Kris Oddo personally. Daily accountability, weekly check-ins, direct messaging, and every adjustment from him.",
          competitor:
            "On the premium tier, you are matched to a remote coach. Attention depends on coach load.",
        },
        {
          dimension: "Pricing",
          geebs: "Quoted on the strategy call. Real investment, not a subscription.",
          competitor:
            "Free app. Premium coaching tier starts around $200/month depending on plan.",
        },
        {
          dimension: "Programming",
          geebs:
            "Fully custom based on training history, schedule, equipment, recovery, nutrition, and weekly adherence data.",
          competitor:
            "App templates with coach customization on premium tier; varies.",
        },
        {
          dimension: "What happens on a bad week",
          geebs:
            "Kris adjusts the week from real check-in context: missed workouts, meals, sleep, travel, soreness, schedule, and adherence.",
          competitor:
            "The app keeps the structure available. Coaching support depends on the premium plan and coach touchpoints.",
        },
        {
          dimension: "Application required",
          geebs: "Yes.",
          competitor: "No.",
        },
        {
          dimension: "Nutrition",
          geebs: "Included — macro targets, habit framework, daily accountability, weekly review.",
          competitor: "Limited; nutrition is not the product.",
        },
        {
          dimension: "Stickiness",
          geebs:
            "4-9 month average tenure. Clients graduate, not get retained forever.",
          competitor:
            "App subscription model — designed for indefinite retention.",
        },
        {
          dimension: "Feedback loop",
          geebs:
            "Human review of the client's week, with training and nutrition changed before drift becomes another restart.",
          competitor:
            "Useful workout logging and structure; feedback depth depends on whether you use the premium coaching layer.",
        },
        {
          dimension: "Best for",
          geebs:
            "People who have used apps for months and need a coach who actually knows them.",
          competitor:
            "People starting out who want a structured app + optional coaching.",
        },
      ]}
      whenGeebs={[
        "You have already tried Caliber or similar apps and the missing piece is not another workout library.",
        "You want one coach who learns your patterns across training, food, sleep, schedule, and adherence.",
        "You want nutrition coaching alongside training.",
        "You want accountability that responds when the week gets messy, not just a plan waiting in an app.",
        "You are willing to apply and commit to a higher-touch coaching relationship.",
      ]}
      whenCompetitor={[
        "You are early in your training journey and want a structured app.",
        "You prefer a subscription model over an upfront commitment.",
        "Lightweight remote coaching is enough for now.",
        "You are not ready to apply or commit to 1:1.",
      ]}
      bottomLine="Caliber is useful, especially for people who mainly need structure, logging, and a lower-friction app. Geebs is for clients who have already tried that layer and realized the bottleneck is doing this alone. The application gate exists because Kris needs to diagnose whether the real issue is programming, nutrition, accountability, schedule, or readiness before a strategy call makes sense."
      faqs={[
        {
          q: "Is Geebs Coaching more expensive than Caliber?",
          a: "Yes. Caliber has a free app tier and a premium coaching tier starting around $200/month. Geebs Coaching is positioned as a higher-touch 1:1 investment, with exact package options covered on the strategy call after the application. The lower-cost Geebs options are the $24.99/month Science-Based Community and the $100 one-time consultation call.",
        },
        {
          q: "Why an application instead of just signing up?",
          a: "The application filters fit. The Geebs methodology only works for clients who are ready to commit time and budget; surfacing that early saves a wasted strategy call. Applicants who are not the right fit get routed to the $24.99/month Science-Based Community or the $100 one-time consultation call.",
        },
        {
          q: "Does Geebs include the workout app like Caliber does?",
          a: "Geebs programming is delivered through FitBudd, the same platform used for the 90-day program. Caliber bundles training inside their own app. Both let you log workouts on your phone.",
        },
        {
          q: "Can I do Caliber and Geebs together?",
          a: "There is no reason to. Geebs gives you a full program, nutrition coaching, daily accountability, weekly check-ins, and direct access to Kris. Running both adds noise without benefit.",
        },
        {
          q: "Who should skip Geebs and just use Caliber?",
          a: "Use Caliber if you want a free or low-cost app, you are still learning workout basics, or you are not ready for direct accountability. Geebs is better suited for people who already know apps can help but still need a coach to manage adherence, nutrition, and adjustments.",
        },
        {
          q: "Does Caliber include nutrition coaching?",
          a: "Not as a core feature. Caliber is primarily a training app; nutrition is not the product. Geebs Coaching includes macro-target nutrition and habit coaching as a core part of 1:1, because for most clients nutrition is where results are actually won or lost.",
        },
        {
          q: "Is Caliber good for men who want to lose fat and build muscle at the same time?",
          a: "Caliber gives you structure for training; body recomposition also requires tight nutrition coaching and weekly adjustment against your actual data. If you have tried app-based structure and the missing piece is adaptation and nutrition accountability, that is the gap 1:1 coaching fills.",
        },
      ]}
    />
  );
}

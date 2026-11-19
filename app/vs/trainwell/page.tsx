import type { Metadata } from "next";
import ComparisonPage from "../_shared/ComparisonPage";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Geebs Coaching vs Trainwell — 1:1 Coach vs App-Based Training",
  description:
      "Geebs Coaching vs Trainwell: compare named-coach accountability with Trainwell's app-based remote personal training model.",
  alternates: { canonical: `${SITE_URL}/vs/trainwell` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/vs/trainwell`,
    title: "Geebs Coaching vs Trainwell",
    description:
      "Named 1:1 coach vs app-based remote training — an honest comparison.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching vs Trainwell",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geebs Coaching vs Trainwell",
    description:
      "1:1 named coach vs Trainwell's app-based remote training — an honest comparison.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function VsTrainwellPage() {
  return (
    <ComparisonPage
      slug="trainwell"
      dateModified="2026-10-27"
      eyebrow="Comparison"
      h1="Geebs Coaching vs Trainwell"
      lede="Trainwell (formerly CoPilot) is an app-based remote personal training service with a dedicated certified coach. Its public site lists $149 USD per month, billed in three-month increments, plus taxes; it also describes a 14-day trial. Geebs Coaching is 1:1 online coaching with Kris Oddo, NASM-CPT, built around custom training, nutrition guidance, and accountability across your week. Check Trainwell's site for its current terms and pricing."
      competitorName="Trainwell"
      competitorTagline="app-based remote personal training"
      rows={[
        {
          dimension: "Format",
          geebs: "1:1 online coaching, application required. One named coach throughout.",
          competitor:
            "App-based remote personal training: onboarding begins with a quiz, then trainer selection and coaching through the Trainwell app.",
        },
        {
          dimension: "Coach continuity",
          geebs:
            "Kris Oddo, personally. The same coach who builds your program reads your check-ins and adjusts the plan — no handoffs.",
          competitor:
            "Trainwell says you work with a dedicated certified coach and can switch trainers in the app.",
        },
        {
          dimension: "Pricing",
          geebs: "Quoted on the strategy call. The $100 one-time consultation call and the $24.99/month community are the public entry points.",
          competitor:
            "Trainwell's public site lists $149 USD/month, billed in three-month increments, plus taxes. Its 14-day trial includes a trainer call, a custom plan, and near-daily communication. Verify current terms at trainwell.net.",
        },
        {
          dimension: "How workouts are delivered",
          geebs:
            "Custom program built around your training history, schedule, equipment, and weekly adherence data.",
          competitor:
            "Workouts are delivered through the Trainwell app, which Trainwell says tracks sets, pacing, and range of motion and includes trainer voice guidance.",
        },
        {
          dimension: "Daily accountability",
          geebs:
            "Daily check-ins with Kris around meals, training, sleep, and schedule. He adjusts in real time, before the week drifts.",
          competitor:
            "Trainwell describes near-daily communication during its trial. Confirm the communication cadence that applies to your plan before enrolling.",
        },
        {
          dimension: "Application required",
          geebs: "Yes — four qualifying questions and a strategy call.",
          competitor: "No application is described. Signup starts with a quiz, trainer selection, and account setup.",
        },
        {
          dimension: "Nutrition",
          geebs: "Included — macro targets, habit framework, daily accountability, weekly review.",
          competitor: "Trainwell says trainers offer nutrition guidance, healthy-eating tips, mindful-eating support, and habit tracking; it says they do not provide specific meal plans.",
        },
        {
          dimension: "Coach selection",
          geebs: "One coach. No matching algorithm.",
          competitor:
            "Trainwell says the quiz helps you find a trainer, then you choose a trainer and can switch in the app.",
        },
        {
          dimension: "Platform dependency",
          geebs:
            "Programming delivered through FitBudd. Communication via direct messaging.",
          competitor:
            "App-centric experience. Workouts, coach communication, and tracking live inside the Trainwell app.",
        },
        {
          dimension: "Best for",
          geebs:
            "People who want one named coach who learns their patterns — training, nutrition, schedule, and recovery — and adjusts across all of it.",
          competitor: "People who want a structured app experience with a dedicated human trainer and in-workout guidance.",
        },
      ]}
      whenGeebs={[
        "You want one named coach who stays consistent across training, nutrition, sleep, and schedule.",
        "You want nutrition guidance integrated with your training plan and weekly review.",
        "You want accountability that responds to your actual week.",
        "You are willing to apply and commit to a higher-touch relationship.",
        "You have tried an app-based plan and want a single coach who learns your patterns over time.",
      ]}
      whenCompetitor={[
        "You want an app-first experience with real trainer voices guiding your workouts.",
        "You like the option to select and switch trainers in an app.",
        "You prefer a lower-friction onboarding (quiz and match, no application).",
        "A structured app platform with human-trainer overlay is enough for your current situation.",
        "You want a 14-day free trial before committing.",
      ]}
      bottomLine="Trainwell is an app-based remote training option with a dedicated coach, workout guidance, and the option to switch trainers. Geebs is a one-coach model: Kris builds the program, provides nutrition guidance, and reviews accountability across the week. Neither is universally better; choose the model whose communication, training delivery, nutrition scope, and price fit your needs."
      faqs={[
        {
          q: "Is Geebs Coaching more expensive than Trainwell?",
          a: "Geebs does not publish 1:1 package prices; exact options are covered on the strategy call. Trainwell's public site lists $149 USD/month billed in three-month increments, plus taxes. Geebs also offers a $100 one-time consultation call and a $24.99/month community; check both sites for current terms.",
        },
        {
          q: "How is Geebs different from Trainwell if both use a remote trainer?",
          a: "Trainwell is an app-based remote personal training service: its onboarding begins with a quiz, then trainer selection, and it lets members switch trainers in the app. Geebs is one named coach — Kris Oddo — for the coaching relationship, with training, nutrition guidance, and accountability coordinated together.",
        },
        {
          q: "Does Trainwell include nutrition coaching?",
          a: "Trainwell says trainers provide nutrition guidance, healthy-eating tips, mindful-eating support, and habit tracking, but not specific meal plans. Geebs provides fitness-nutrition guidance such as macro targets, habit structure, and accountability around meals; it is not medical nutrition therapy.",
        },
        {
          q: "Can I switch coaches at Geebs like I can switch trainers on Trainwell?",
          a: "Geebs Coaching is Kris Oddo. There is no coach network to switch within — the model is one named coach for the full relationship. If that is not what you want, Trainwell's trainer-switch feature may be a better fit.",
        },
        {
          q: "Trainwell offers a 14-day free trial. Does Geebs?",
          a: "Geebs does not offer a free trial for 1:1 coaching. The strategy call is the entry point — it lets both sides confirm fit before any commitment. The $100 one-time consultation call is available without an application for those who want Kris's eyes on their situation before a strategy call.",
        },
      ]}
    />
  );
}

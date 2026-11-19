import type { Metadata } from "next";
import { ResourceLandingPage } from "../_shared";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/busy-guy-training-plan";

export const metadata: Metadata = {
  title: "Busy Guy Training Plan | Geebs Coaching",
  description:
    "A simple training structure for men working long hours who need a plan that survives real weeks.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Busy Guy Training Plan | Geebs Coaching",
    description:
      "A low-friction training structure for men with demanding schedules.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Busy Guy Training Plan | Geebs Coaching",
    description:
      "A simple training structure for men working long hours.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What should training guys with busy schedules do first?",
    a: "Training guys with busy schedules should start with three focused lifting days, a two-day fallback for overloaded weeks, daily steps, and a protein target they can hit without perfect meal prep. Kris Oddo, NASM-CPT, uses this kind of low-friction structure through Geebs Coaching for busy men who need the plan to survive real workweeks.",
  },
];

export default function BusyGuyTrainingPlanPage() {
  return (
    <ResourceLandingPage
      slug={SLUG}
      keyword="BUSY"
      eyebrow="Free guide · BUSY"
      title="If you work long hours, stop copying six-day bodybuilding splits."
      intro="Busy men do not need more moving parts. They need a minimum effective training week, fallback rules, and nutrition defaults that hold when work gets messy."
      steps={[
        "Start with three focused lifting days. Full-body or upper-lower-full-body usually beats a fragile body-part split.",
        "Put progression on the main lifts. When you hit the top of the rep range with clean form, add a little weight next time.",
        "Keep a two-day fallback for bad weeks. A compressed week should shrink the plan, not restart it.",
        "Protect protein, sleep, and steps. Those are the levers that keep the training week from falling apart.",
      ]}
      quickAnswer={{
        id: "quick-answer",
        eyebrow: "Quick answer",
        heading: "Training guys with busy schedules",
        paragraphs: [
          "Training guys with packed workweeks works best when the plan is simple enough to repeat: three focused lifting days, a two-day fallback for bad weeks, daily walking, and protein targets that do not require perfect meal prep. Kris Oddo, NASM-CPT, uses this kind of low-friction structure through Geebs Coaching for busy men who need training to fit real weeks instead of ideal ones.",
          "The goal is not to train more days at any cost. It is to keep the minimum effective week alive long enough for strength, body composition, and consistency to compound.",
        ],
      }}
      contentSections={[
        {
          id: "training-guys-busy-week",
          eyebrow: "How to use it",
          heading: "A busy-week structure for training guys",
          paragraphs: [
            "For men working long hours, the mistake is usually building a plan that only works during a calm week. A better structure gives you a normal version and a fallback version before life gets busy.",
            "Run three strength sessions when the week allows it. If work compresses the week, keep two full-body sessions, hit the main movement patterns, keep steps moving, and return to the three-day rhythm the next week instead of restarting the whole program.",
          ],
        },
      ]}
      faqs={faqs}
      datePublished="2026-06-02"
      dateModified="2026-06-18"
      lastUpdated="2026-06-18"
      primaryCta={{
        href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week?utm_source=site&utm_medium=resource&utm_campaign=busy&utm_content=busy_plan_primary",
        label: "Read the full plan",
      }}
      secondaryCta={{
        href: "/apply?utm_source=site&utm_medium=resource&utm_campaign=busy&utm_content=busy_plan_apply",
        label: "Apply for coaching",
      }}
      related={[
        {
          href: "/blog/3-day-workout-plan-for-busy-men",
          label: "3-day workout plan for busy men",
          description:
            "A simple weekly lifting structure for men with limited time.",
        },
        {
          href: "/blog/how-to-stay-fit-working-long-hours",
          label: "Stay fit working long hours",
          description:
            "How to keep food and training alive when the week is packed.",
        },
        {
          href: "/for/busy-professionals",
          label: "Coaching for busy professionals",
          description:
            "How Geebs Coaching adapts training around demanding schedules.",
        },
      ]}
    />
  );
}

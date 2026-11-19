import type { Metadata } from "next";
import { ResourceLandingPage } from "../_shared";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/bad-week-adjustment-loop";

export const metadata: Metadata = {
  title: "Busy-Week Training Reset | Geebs Coaching",
  description:
    "A simple busy-week training reset with normal, compressed, and travel-week versions: shrink the plan, protect protein, and stop restarting.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Busy-Week Training Reset | Geebs Coaching",
    description:
      "A practical reset with normal, compressed, and travel-week versions.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Busy-Week Training Reset | Geebs Coaching",
    description:
      "A practical reset with normal, compressed, and travel-week versions.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function BadWeekAdjustmentLoopPage() {
  return (
    <ResourceLandingPage
      slug={SLUG}
      keyword="STICK"
      eyebrow="Free guide · STICK"
      title="Your plan did not fail. Your week changed and nobody adjusted it."
      intro="The Busy-Week Training Reset is the Geebs answer for missed lifts, late work nights, travel, client dinners, low sleep, and the urge to restart on Monday. Choose the version that matches this week. The goal is not to erase the week. It is to make the next useful move obvious."
      steps={[
        "Name the actual break: missed workout, low steps, restaurant meals, poor sleep, travel, stress, or all of the above. Vague guilt does not create a useful adjustment.",
        "Shrink the training week instead of restarting it. If four sessions are gone, recover two hard full-body sessions or one upper and one lower session.",
        "Protect the floor: protein, hydration, one walk, and the next planned training window. Those four beat a perfect plan that you cannot execute.",
        "Use weekly averages for food. One high-calorie day is information; it is not a reason to starve the next day or throw out the week.",
        "Write the next adjustment before motivation returns. Move the workout, pick the meal default, set the bedtime target, and keep the week alive.",
      ]}
      quickAnswer={{
        id: "busy-week-reset-answer",
        eyebrow: "Quick answer",
        heading: "Use the version of training your week can actually hold.",
        paragraphs: [
          "A busy week does not need a brand-new plan. Keep the normal version when you have the time, use a compressed version when only two sessions fit, and use the travel version when equipment or meals are uncertain. The useful choice is the version you can complete this week.",
        ],
      }}
      contentSections={[
        {
          id: "normal-week-reset",
          eyebrow: "Normal week",
          heading: "Keep the plan simple when the week is mostly intact.",
          paragraphs: [
            "Use your planned training days, but keep the next session as the priority instead of trying to make the week perfect. Protect the basics: protein, hydration, one walk, and a realistic bedtime. If one session moves, move it once and continue from there.",
          ],
        },
        {
          id: "compressed-week-reset",
          eyebrow: "Compressed week",
          heading: "When only two sessions fit, make them count.",
          paragraphs: [
            "Use two full-body sessions or one upper and one lower session. Keep the main movement patterns, use the equipment you can reach, and stop there. Do not add punishment cardio or try to stack missed sessions together; a smaller week you finish gives you a real place to continue next week.",
          ],
        },
        {
          id: "travel-week-reset",
          eyebrow: "Travel week",
          heading: "Choose the next available training window, not the ideal gym.",
          paragraphs: [
            "Before the trip, identify the most likely place and time to train: a hotel gym, a short bodyweight session, or a walk with a few basic movements. Keep meals boring when you need to, aim for a protein choice at each meal, drink water, and resume the normal plan when you are home. Travel does not need to become a restart.",
          ],
        },
      ]}
      // ResourceLandingPage renders these visibly and emits matching FAQPage JSON-LD.
      faqs={[
        {
          q: "Should I restart my fitness plan after a bad week?",
          a: "No, make the next useful adjustment instead of restarting the whole plan. Name what actually broke, such as missed training, poor sleep, travel, or restaurant meals. Once the problem is specific, you can move a workout, choose the next meal, and keep the week alive.",
        },
        {
          q: "How should I change training when most of the week is gone?",
          a: "Shrink the training week to work you can still complete. If four planned sessions are gone, recover two hard full-body sessions or one upper and one lower session. A smaller week you finish is more useful than waiting for a perfect Monday to begin again.",
        },
        {
          q: "What should I protect when my routine falls apart?",
          a: "Protect a simple floor of protein, hydration, one walk, and the next planned training window. Those actions keep the plan moving without asking for a perfect recovery day. Write the adjustment down before motivation returns so the next move is already decided.",
        },
      ]}
      datePublished="2026-06-04"
      dateModified="2026-10-18"
      lastUpdated="2026-10-18"
      primaryCta={{
        href: "/blog/why-you-cant-stay-consistent-with-the-gym?utm_source=site&utm_medium=resource&utm_campaign=stick&utm_content=bad_week_primary",
        label: "Fix the consistency loop",
      }}
      secondaryCta={{
        href: "/apply?utm_source=site&utm_medium=resource&utm_campaign=stick&utm_content=bad_week_apply",
        label: "Apply for coaching",
      }}
      related={[
        {
          href: "/resources/busy-guy-training-plan",
          label: "Busy guy training plan",
          description:
            "A minimum effective training week for men with packed calendars.",
        },
        {
          href: "/blog/how-to-stay-fit-working-long-hours",
          label: "Stay fit working long hours",
          description:
            "Training, food, steps, and recovery rules for demanding weeks.",
        },
        {
          href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
          label: "Weekend diet consistency",
          description:
            "How to keep weekends from turning into a full reset cycle.",
        },
      ]}
    />
  );
}

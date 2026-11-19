import type { Metadata } from "next";
import { ResourceLandingPage } from "../_shared";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/online-fitness-coaching-fit-check";

export const metadata: Metadata = {
  title: "Online Fitness Coaching Fit Check | Geebs Coaching",
  description:
    "A practical fit check for deciding whether 1:1 online fitness coaching, a self-guided plan, or a simple reset is the right next step.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coaching Fit Check | Geebs Coaching",
    description:
      "Decide whether you need 1:1 coaching, a self-guided program, or a simpler reset before you apply.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coaching Fit Check | Geebs Coaching",
    description:
      "Decide whether you need 1:1 coaching, a self-guided program, or a simpler reset before you apply.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function OnlineFitnessCoachingFitCheckPage() {
  return (
    <ResourceLandingPage
      slug={SLUG}
      keyword="GAINS"
      eyebrow="Free guide · GAINS"
      title="You probably do not need another plan. You need to know whether coaching is the right lever."
      intro="This fit check helps busy adults decide whether 1:1 online coaching with Kris makes sense right now, or whether a self-guided program, calculator, or consistency reset is the better next move."
      steps={[
        "Choose 1:1 coaching if the plan keeps breaking in real life: missed lifts, low sleep, meals out, travel, inconsistent check-ins, or no one adjusting the week when it changes.",
        "Use a self-guided program if you mainly need structure, can execute without daily accountability, and are not ready for a higher-touch coaching commitment.",
        "Use free tools first if your biggest unknown is the starting math: calories, macros, body-fat estimate, strength targets, or a realistic timeline.",
        "Do not apply just because you feel motivated today. Apply when you are ready to be honest about the week, respond to accountability, and let the plan change when the data says it should.",
        "If you want direct coach judgment, weekly review, training adjustments, nutrition accountability, and a human who notices when momentum slips, that is the clearest 1:1 fit.",
      ]}
      // ResourceLandingPage renders these visibly and emits matching FAQPage JSON-LD.
      faqs={[
        {
          q: "When is 1:1 online fitness coaching a good fit?",
          a: "1:1 coaching is a good fit when your plan keeps breaking in real life and nobody is adjusting it. Missed lifts, low sleep, travel, meals out, and inconsistent check-ins are useful signals. The value is direct coach judgment, weekly review, and changes made while the week is happening.",
        },
        {
          q: "When should I choose a self-guided fitness program instead?",
          a: "Choose a self-guided program when you mainly need structure and can execute without daily accountability. It is the better fit if you are not ready for a higher-touch coaching commitment. You still get a plan, but you take responsibility for reviewing and adjusting your own week.",
        },
        {
          q: "Should I use free fitness tools before applying for coaching?",
          a: "Use free tools first when your biggest unknown is the starting math. A calculator can help with calories, macros, a body-fat estimate, strength targets, or a realistic timeline. Coaching makes more sense when the issue is execution and adjustment, not simply finding a starting number.",
        },
      ]}
      primaryCta={{
        href: "/apply?utm_source=site&utm_medium=resource&utm_campaign=gains&utm_content=fit_check_apply",
        label: "Apply for 1:1 coaching",
      }}
      secondaryCta={{
        href: "/resources/online-fitness-coaching-cost-faq?utm_source=site&utm_medium=resource&utm_campaign=gains&utm_content=fit_check_cost",
        label: "Read the cost FAQ",
      }}
      related={[
        {
          href: "/blog/is-online-fitness-coaching-worth-it",
          label: "Is online fitness coaching worth it?",
          description:
            "A deeper buying guide for deciding when coaching is worth paying for.",
        },
        {
          href: "/vs/chatgpt",
          label: "Geebs Coaching vs ChatGPT",
          description:
            "When AI is useful, and where human coaching still matters.",
        },
        {
          href: "/resources/bad-week-adjustment-loop",
          label: "Bad week adjustment loop",
          description:
            "A reset framework for the exact weeks that usually break a plan.",
        },
        {
          href: "/blog/how-to-hire-an-online-fitness-coach",
          label: "How to hire an online fitness coach",
          description:
            "What to look for in an online coach — credentials, check-in cadence, red flags, and the questions to ask before you pay.",
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { ResourceLandingPage } from "../_shared";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/diet-soda-cutting";

export const metadata: Metadata = {
  title: "Diet Soda and Cutting Guide | Geebs Coaching",
  description:
    "A practical diet soda guide for cutting, cravings, calories, and consistency.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Diet Soda and Cutting Guide | Geebs Coaching",
    description:
      "What matters more than blaming one drink: calories, protein, hunger, and consistency.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diet Soda and Cutting Guide | Geebs Coaching",
    description:
      "A practical guide to diet soda, cutting, cravings, and consistency.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DietSodaCuttingPage() {
  return (
    <ResourceLandingPage
      slug={SLUG}
      keyword="DEFICIT"
      eyebrow="Free guide · DEFICIT"
      title="Diet soda is not the thing making or breaking your cut."
      intro="If one zero-calorie drink is the center of the debate, the actual system probably needs work: calories, protein, hunger control, and weekend consistency."
      steps={[
        "Start with the calorie target. Fat loss still requires a deficit over time.",
        "Protect protein first so the cut does not turn into flat, softer weight loss.",
        "Watch what the drink does to your appetite. If it helps adherence, it can be useful. If it triggers snacking, adjust.",
        "Audit weekends, restaurants, and liquid calories before blaming diet soda.",
      ]}
      // ResourceLandingPage renders these visibly and emits matching FAQPage JSON-LD.
      faqs={[
        {
          q: "Does diet soda stop fat loss during a cut?",
          a: "Diet soda is not the thing that determines whether your cut works. Fat loss still requires a calorie deficit over time, with protein and consistent eating habits supporting the plan. Audit weekends, restaurant meals, and drinks with calories before blaming one zero-calorie drink.",
        },
        {
          q: "Can diet soda help with cravings?",
          a: "Diet soda can be useful if it helps you stick to your calorie target. Pay attention to what happens after you drink it: if it makes the plan easier, keep it in; if it reliably leads to more snacking, adjust. Your own appetite response matters more than a blanket rule.",
        },
        {
          q: "What matters more than cutting out diet soda?",
          a: "Your calorie target, protein intake, hunger control, and weekend consistency matter more than cutting out diet soda. Those are the parts of the system most likely to explain a stalled cut. Fix them first instead of turning one drink into the center of the plan.",
        },
      ]}
      primaryCta={{
        href: "/blog/diet-soda-and-fat-loss?utm_source=site&utm_medium=resource&utm_campaign=deficit&utm_content=diet_soda_primary",
        label: "Read the full guide",
      }}
      secondaryCta={{
        href: "/tools/calorie-deficit-calculator?utm_source=site&utm_medium=resource&utm_campaign=deficit&utm_content=diet_soda_calculator",
        label: "Set your deficit",
      }}
      related={[
        {
          href: "/blog/calorie-deficit-without-counting-everything",
          label: "Calorie deficit without counting everything",
          description:
            "How to create a deficit without making the plan miserable.",
        },
        {
          href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
          label: "Stay consistent on weekends",
          description:
            "The part of the week that usually explains the stalled cut.",
        },
        {
          href: "/tools/calorie-deficit-calculator",
          label: "Calorie deficit calculator",
          description:
            "Set a realistic pace for fat loss without crash dieting.",
        },
        {
          href: "/resources/online-fitness-coaching-cost-faq",
          label: "Online coaching cost FAQ",
          description:
            "When 1:1 accountability is worth paying for, and when a lower-cost plan is enough.",
        },
      ]}
    />
  );
}

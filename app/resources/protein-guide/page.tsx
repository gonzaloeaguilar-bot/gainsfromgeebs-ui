import type { Metadata } from "next";
import { ResourceLandingPage } from "../_shared";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/protein-guide";

export const metadata: Metadata = {
  title: "Simple Protein Guide | Geebs Coaching",
  description:
    "A simple protein target and execution guide for losing fat without flattening out.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Simple Protein Guide | Geebs Coaching",
    description:
      "Before supplements, get the protein target right. Start here.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Protein Guide | Geebs Coaching",
    description:
      "A simple protein target and execution guide for fat loss and recomposition.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function ProteinGuidePage() {
  return (
    <ResourceLandingPage
      slug={SLUG}
      keyword="PROTEIN"
      eyebrow="Free guide · PROTEIN"
      title="Before you worry about supplements, hit your protein."
      intro="Most men do not need a more complicated diet first. They need enough protein, repeatable meals, and a target they can hit on busy days."
      steps={[
        "Start around 0.8 grams of protein per pound of bodyweight per day. If you carry a lot of body fat, use goal bodyweight as the target.",
        "Anchor each meal with protein first: meat, eggs, Greek yogurt, cottage cheese, fish, or whey when the day gets tight.",
        "Use three or four protein hits per day instead of trying to rescue the number at night.",
        "Track it for two weeks. After that, you will know the portions by eye and the whole diet gets less chaotic.",
      ]}
      // ResourceLandingPage renders these visibly and emits matching FAQPage JSON-LD.
      faqs={[
        {
          q: "How much protein should I start with each day?",
          a: "Start around 0.8 grams of protein per pound of bodyweight each day. If you carry a lot of body fat, use your goal bodyweight instead. Treat that as a practical starting target, then make it easier to hit by spreading protein across three or four meals.",
        },
        {
          q: "Do I need protein supplements to hit the target?",
          a: "No, you do not need protein supplements to hit the target. Meat, eggs, Greek yogurt, cottage cheese, and fish can cover it through regular meals. Whey is simply a useful backup when the day gets tight and a full meal is not practical.",
        },
        {
          q: "Should I eat all my protein in one meal?",
          a: "No, split your protein across three or four meals instead of trying to rescue the number at night. Anchoring each meal with a protein source makes the daily target more repeatable. Track that pattern for two weeks, and the portions should become easier to judge by eye.",
        },
      ]}
      primaryCta={{
        href: "/tools/macro-calculator?utm_source=site&utm_medium=resource&utm_campaign=protein&utm_content=protein_guide_primary",
        label: "Estimate your macros",
      }}
      secondaryCta={{
        href: "/apply?utm_source=site&utm_medium=resource&utm_campaign=protein&utm_content=protein_guide_apply",
        label: "Apply for coaching",
      }}
      related={[
        {
          href: "/blog/how-much-protein-to-lose-fat",
          label: "How much protein to lose fat",
          description:
            "The deeper explanation behind the target and why it protects muscle during a cut.",
        },
        {
          href: "/blog/protein-intake-for-weight-loss-and-muscle-gain",
          label: "Protein for weight loss and muscle gain",
          description:
            "How protein changes across cutting, recomposition, and lean-gain phases.",
        },
        {
          href: "/tools/macro-calculator",
          label: "Macro calculator",
          description:
            "Turn calories and protein into a starting macro plan.",
        },
        {
          href: "/resources/online-fitness-coaching-cost-faq",
          label: "Online coaching cost FAQ",
          description:
            "What changes the price when nutrition, training, and accountability are coached 1:1.",
        },
      ]}
    />
  );
}

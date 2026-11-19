import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AssessmentForm from "./AssessmentForm";
import Takeover from "./Takeover";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Free Physique Assessment: Your First Phase and Starting Macros",
  description:
    "Start with one optional body photo or a few questions, then get a practical first-week plan for food, movement, training and recovery.",
  alternates: { canonical: `${SITE_URL}/assessment` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/assessment`,
    title: "Free Physique Assessment by Geebs Coaching",
    description:
      "Stop guessing what to eat. Find out where you are, which phase to run first, and what to start on.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free physique assessment by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Physique Assessment by Geebs Coaching",
    description:
      "Where you are, which phase to run first, and what to start on.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find your starting calories and first training phase",
  description:
    "Estimate body composition from tape measurements, reconcile reported intake against an observed weight trend, then select a starting phase and macro targets.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Answer one question at a time",
      text: "Use one optional photo with your permission, or choose the question route instead.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Get a practical first-week plan",
      text: "See food priorities, optional supplement backups, daily movement and a training split. Measurements remain optional when you want more precision.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Use the estimate as a starting point",
      text: "A photo result is a broad visual estimate, not a body scan, diagnosis or exact percentage.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Improve it when you are ready",
      text: "Choose the short question route when you want a more precise macro plan.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The body composition estimate appears with no signup at all. The phase plan, with starting calories and macros, asks for a first name and an email so we can send it to you. We never ask for your phone number.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to upload a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can choose the short question route instead. A photo result is a broad visual estimate, not a body scan or medical measurement.",
      },
    },
    {
      "@type": "Question",
      name: "Will it always tell me to eat less?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Of the five opening phases, only one is a fat loss block. If you have been dieting for months on a low intake, the assessment tells you to eat more first, because cutting further from there is what stalls people. If you do not know your current intake, it gives you a week of measuring instead of a deficit, because there is nothing to adjust from yet.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are planning estimates. Body fat comes from the U.S. Navy circumference method when you supply measurements, and energy requirements come from the Mifflin St Jeor equation with an activity multiplier. Both are population equations applied to one person, which is why the first phase is built around measuring your own response rather than trusting the starting figure.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my information?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A photo is processed only to create the requested result. It is not saved, published or used in marketing. Your email is used to send the plan and Kris's weekly notes, and you can unsubscribe at any time.",
      },
    },
  ],
};

// No BreadcrumbList here on purpose: /assessment is top level, not below a
// section hub, and buildSectionBreadcrumbSchema refuses to invent a parent.
export default function AssessmentPage() {
  return (
    <main className="relative">
      <JsonLd id="assessment-howto-schema" data={howToSchema} />
      <JsonLd id="assessment-faq-schema" data={faqSchema} />
      <Takeover>
        <AssessmentForm />
      </Takeover>
    </main>
  );
}

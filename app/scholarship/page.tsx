import MoneyPageKit from "@/components/MoneyPageKit";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const TITLE = "Fitness Coaching Scholarship | Geebs Coaching";
const DESCRIPTION =
  "Free 30-day coaching: apply for a coaching scholarship for 30 days of 1:1 coaching with Kris through the Titan Forge intensive. Up to three places, free to apply, open year-round.";

// Every fact on this page is taken from the scholarship block already live on
// the homepage and from titanforgefit.com/coaching-intensive. Nothing here
// introduces a price, a guarantee, a result claim, or a deadline.
const INTENSIVE_URL =
  "https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=scholarship_page";

const steps = [
  {
    step: "1. Apply",
    detail:
      "The application takes about three minutes and is free. If you are selected, a $50 deposit holds your spot.",
  },
  {
    step: "2. Review",
    detail:
      "Applications are read as they arrive. Up to three scholarship places are awarded.",
  },
  {
    step: "3. Start your 30 days",
    detail:
      "Selected applicants begin a 30-day 1:1 coaching intensive with weekly check-ins and a plan built around their own progress.",
  },
];

const faqs = [
  {
    q: "What is the Geebs coaching scholarship?",
    a: "Titan Forge runs a 30-day coaching intensive and Kris is one of the two coaches. Up to three scholarship places are awarded, and applications are open year-round.",
  },
  {
    q: "Does it cost anything to apply?",
    a: "No. Applying takes about three minutes and is free. If you are selected, a $50 deposit holds your spot.",
  },
  {
    q: "Is the coaching really free?",
    a: "Yes. The 30 days of 1:1 coaching are free. If you are selected, a $50 deposit holds your spot.",
  },
  {
    q: "When is the deadline to apply?",
    a: "There is no deadline. Applications are open year-round, so you can apply at any time rather than waiting for an enrolment window.",
  },
  {
    q: "How many scholarship spots are available?",
    a: "Up to three places are awarded.",
  },
  {
    q: "What does the 30-day intensive include?",
    a: "Thirty days of 1:1 coaching with a plan shaped around your own progress, including weekly check-ins.",
  },
  {
    q: "What if I am not selected for a scholarship?",
    a: "You can apply for regular 1:1 coaching with Geebs instead. The scholarship is one route in, not the only one.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const scholarshipSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: "Titan Forge 30-Day Coaching Intensive scholarship",
  description: DESCRIPTION,
  url: `${SITE_URL}/scholarship`,
  programType: "Coaching scholarship",
  timeToComplete: "P30D",
  provider: {
    "@type": "Organization",
    name: "Titan Forge Fitness",
    url: "https://titanforgefit.com",
  },
  offers: {
    "@type": "Offer",
    url: INTENSIVE_URL,
    price: 0,
    priceCurrency: "USD",
    description:
      "30 days of free 1:1 coaching with Kris. Applying is free. If you are selected, a $50 deposit holds your spot.",
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/scholarship` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/scholarship`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs coaching scholarship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function ScholarshipPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="scholarship-faq-schema" data={faqSchema} />
      <JsonLd id="scholarship-program-schema" data={scholarshipSchema} />

      <article className="mx-auto max-w-[860px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">
            Coaching scholarship &middot; up to 3 places
          </p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]">
            30 days of free 1:1 coaching with Kris.
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.65] text-bone/85 max-w-[64ch]">
            Kris is offering 30 days of free 1:1 coaching. Titan Forge runs the
            30-day coaching intensive and Kris is one of the two coaches. Up to
            three places are open, and applications are open year-round.
            Applying is free and takes about three minutes.
          </p>
          <p className="mt-3 text-[13px] leading-[1.6] text-mute">
            If you are selected, a $50 deposit holds your spot. No payment is
            taken in the application.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={INTENSIVE_URL}
              data-analytics-event="titanforge_intensive_referral_click"
              data-analytics-link-kind="titanforge_intensive_referral"
              className="btn btn-primary"
            >
              Apply for the scholarship
              <span aria-hidden="true">&rarr;</span>
            </a>
            <Link href="/apply" className="btn btn-secondary">
              Or apply for 1:1 coaching
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section aria-label="How the scholarship works" className="grid gap-5 sm:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-6"
            >
              <p className="text-bone text-[17px] font-medium">{item.step}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-mute">
                {item.detail}
              </p>
            </div>
          ))}
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="scholarship-faq-heading">
          <h2
            id="scholarship-faq-heading"
            className="display text-bone text-[26px] md:text-[34px] leading-[1.08]"
          >
            Common questions
          </h2>
          <dl className="mt-8 space-y-7">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-bone text-[17px] md:text-[18px] font-medium">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[15.5px] md:text-[16.5px] leading-[1.65] text-mute max-w-[64ch]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-label="Next step">
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Ready to put your name in? The application is free and takes about
            three minutes.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={INTENSIVE_URL} className="btn btn-primary">
              Apply for the scholarship
              <span aria-hidden="true">&rarr;</span>
            </a>
            <Link href="/geebs-method" className="btn btn-secondary">
              See how Geebs coaches
            </Link>
          </div>
        </section>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      {/* Someone who does not buy today left with only an email ask.
          Two free interactive surfaces are a reason to come back. */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16">
        <KeepGoing position="scholarship" />
      </div>

    </main>
  );
}

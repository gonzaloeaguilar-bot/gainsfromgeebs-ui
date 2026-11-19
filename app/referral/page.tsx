import MoneyPageKit from "@/components/MoneyPageKit";
import KeepGoing from "@/components/KeepGoing";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const TITLE = "Referral Program | Geebs Coaching";
const DESCRIPTION =
  "How Geebs Coaching referral credits work: refer serious clients who start coaching and earn free coaching months on your own plan.";

const rewards = [
  {
    refer: "1 referral",
    reward: "1 free month",
    detail: "One serious person signs up and starts coaching.",
  },
  {
    refer: "3 referrals",
    reward: "2 free months",
    detail: "Three started clients stack into a larger credit.",
  },
  {
    refer: "6 referrals",
    reward: "3 free months",
    detail: "Six started clients earn the largest stated credit.",
  },
];

const faqs = [
  {
    q: "How does the Geebs referral program work?",
    a: "Refer people who are a real fit for coaching. Once the person you referred starts, the referral counts toward free coaching months on your own plan.",
  },
  {
    q: "When does a referral count?",
    a: "A referral counts when the person starts coaching, not when they first inquire. The credit is tied to real clients, not raw leads.",
  },
  {
    q: "Is this a cash payout or a discount code?",
    a: "It is coaching credit, applied as free months on your active plan. It is not a public discount code or cash affiliate payout.",
  },
  {
    q: "Can referral credit stack with the prepay bonus?",
    a: "Yes. Referral credit can work alongside the prepay structure because both are ways active clients can lower their effective coaching cost.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/referral` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/referral`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching referral program",
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

export default function ReferralPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="referral-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[860px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Referral program</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]">
            Refer serious clients. Earn free coaching months.
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.65] text-bone/85 max-w-[64ch]">
            Geebs rewards honest word-of-mouth. If someone you refer starts
            coaching, the credit applies to your own active plan as free
            coaching months.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section aria-label="Referral rewards" className="grid gap-5 sm:grid-cols-3">
          {rewards.map((reward) => (
            <div
              key={reward.refer}
              className="rounded-2xl border border-line bg-ink3/35 p-6"
            >
              <p className="eyebrow text-cloudText text-[12px]">
                {reward.refer}
              </p>
              <h2 className="display mt-2 text-[24px] md:text-[28px] leading-[1.1] text-bone">
                {reward.reward}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-mute">
                {reward.detail}
              </p>
            </div>
          ))}
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div>
            <p className="eyebrow text-mute2">How it works</p>
            <h2 className="display mt-4 text-[28px] md:text-[38px] leading-[1.05] text-bone">
              Keep it honest. Let the application decide fit.
            </h2>
          </div>
          <div className="space-y-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute">
            <p>
              The right referral is someone who is ready to communicate, follow
              a plan, and take coaching seriously. You do not need to qualify
              them yourself; point them to the application and Kris will decide
              the right path.
            </p>
            <p>
              This is not a public discount-code program. It is a client credit
              for real word-of-mouth after a referred person starts coaching.
            </p>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <p className="eyebrow text-mute2">Common questions</p>
          <dl className="mt-6 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-[17px] md:text-[19px] font-medium text-bone">
                  {item.q}
                </dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/packages" className="btn btn-secondary">
              Compare packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
      {/* Shared foot of every page: someone about to refer a friend should be
          able to see what they are referring them to. */}
      <MoneyPageKit items={offerRailItems("article")} />
      {/* Someone who does not buy today left with only an email ask.
          Two free interactive surfaces are a reason to come back. */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16">
        <KeepGoing position="referral" />
      </div>

    </main>
  );
}

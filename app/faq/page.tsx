import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import EntityLine from "@/components/EntityLine";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "FAQ — Geebs Coaching | 1:1 Online Coaching with Kris Oddo",
  description:
    "Straight answers about Geebs Coaching: cost, payment plans, refunds, daily accountability, the app, training days, nutrition, and how to get started.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    title: "FAQ — Geebs Coaching",
    description:
      "Cost, payment plans, refunds, daily accountability, training, nutrition, and how to apply — answered straight.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Geebs Coaching",
    description:
      "Cost, payment plans, refunds, daily accountability, training, nutrition, and how to apply.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// Single source of truth — both the visible page and the FAQPage JSON-LD
// render from this. Answers are in Kris's own words (2026-05-21 voice notes).
// `link` renders as a visible read-more link only; JSON-LD stays plain text.
const FAQ_SECTIONS: {
  section: string;
  items: { q: string; a: string; link?: { href: string; label: string } }[];
}[] = [
  {
    section: "How the coaching works",
    items: [
      {
        q: "How does 1:1 coaching work?",
        a: "You fill out a short application. If it's a fit, you book a strategy call with Kris. If you both decide to move forward, your program is built and delivered through the FitBudd app, and you start. Every program, daily accountability touchpoint, check-in, and adjustment comes directly from Kris — no assistants, no team handoffs.",
      },
      {
        q: "How often will I talk to Kris?",
        a: "Throughout the week. The daily messages are where Kris helps you map the real day: did breakfast happen, when can you train, where do meals fit around work, and what needs to change tomorrow. The weekly call still matters because you both review the data workout by workout and adjust the next week from there.",
      },
      {
        q: "Can I message Kris between check-ins?",
        a: "Yes — direct messaging access, with no cap. Form videos, a question about a lift, a tough week at work that's affecting training, or a day where the meal timing is falling apart — Kris would rather you ask than guess. The point is for you to learn the why, not just follow instructions.",
      },
      {
        q: "What app is the coaching delivered through?",
        a: "FitBudd. Every 1:1 coaching tier runs through it — your training program, video demos for every lift, your weekly check-in form, and messaging all live in one place.",
      },
      {
        q: "How long do clients usually work with Kris?",
        a: "Most clients coach with Kris for 4 to 9 months. Coaching runs in 3 to 6 month blocks; most clients re-sign after their first block, and many eventually graduate to running their own programming once the habits and knowledge are built. The goal is self-sufficiency, not permanent dependency.",
      },
    ],
  },
  {
    section: "Money and commitment",
    items: [
      {
        q: "How much does 1:1 coaching cost?",
        a: "Exact package options are covered on the strategy call once Kris understands your goals, schedule, and fit. 1:1 is positioned as a real investment in a coach-led process, not an app subscription. If budget is the main constraint, the $24.99/month Science-Based Community and the $100 one-time consultation call are genuine starting points.",
        link: {
          href: "/guides/how-much-does-an-online-fitness-coach-cost",
          label: "See 2026 market price ranges by coaching type",
        },
      },
      {
        q: "Do you offer payment plans?",
        a: "Payment options may be available for qualified clients. Kris covers paid-in-full and monthly contract options on the strategy call so the plan matches the coaching term and support level.",
      },
      {
        q: "What is your refund policy?",
        a: "1:1 coaching is non-refundable. It's a commitment on both sides — Kris invests real time in building and running your program, and the coaching only works if you're in. The Science-Based Community is month-to-month and you can cancel any time.",
      },
      {
        q: "What if I've tried coaching or programs before and they didn't stick?",
        a: "That describes most of the men Kris coaches. Falling off the apps, the programs, and the influencer plans isn't a character flaw — it's what happens when you're doing it alone with no one who actually knows you and notices when you slip. A coach-led process exists precisely so you stop starting over.",
      },
      {
        q: "What if I'm not sure I can stay committed?",
        a: "It's one of the most common things men say before they start — and honestly, if you're worried about it, that usually means you take it seriously. The structure is what carries you on the weeks willpower doesn't: a program built for your real week, daily accountability when the day starts drifting, and a coach who notices. You don't have to be sure. You have to be willing to start.",
      },
    ],
  },
  {
    section: "Training, nutrition and getting started",
    items: [
      {
        q: "How many days a week will I train?",
        a: "Most clients start at 3 to 4 days a week. If staying consistent has been the problem, Kris starts you at 3 — once that's genuinely locked in, days get added. Experienced lifters who already train consistently can start higher. The number is set to what you'll actually do, not what looks good on paper.",
      },
      {
        q: "Do I have to follow a strict diet or give up foods I like?",
        a: "No banned-food list. Nutrition is built on macro targets — hit your protein, build the rest around it. The right diet is the one you'll actually keep, so it's built around your life rather than an idealized version of it.",
      },
      {
        q: "Do I need a gym, or can I train at home?",
        a: "Your program is built around the access you actually have — a commercial gym, a home setup, or something in between. Equipment is a constraint to design around, not a barrier to starting.",
      },
      {
        q: "Do you work with clients outside the US?",
        a: "Coaching is fully online, so local geography is not the constraint. Kris works remotely, and the strategy call is where fit, payment logistics, and coaching scope get confirmed for your situation.",
      },
      {
        q: "How do I get started?",
        a: "Fill out the application — three questions, plus contact info, under two minutes. If it's a fit, you'll book a strategy call with Kris on the next page. If 1:1 isn't the right path right now, you'll be pointed to the coaching packages page, including the $24.99/month community and the $100 one-time consultation call.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SECTIONS.flatMap((s) =>
    s.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    }))
  ),
};

const FAQCategory = "section";

export default function FaqPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="faq-page-schema" data={faqSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">FAQ</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Questions, answered straight
          </h1>
          <EntityLine className="mt-3" />
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            The honest version — cost, commitment, how the coaching actually
            runs. Anything specific to your situation gets answered on the
            strategy call.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {FAQ_SECTIONS.map((section, si) => (
          <FAQCategory key={section.section} className="prose-section">
            {si > 0 && <div className="hair my-10 md:my-14" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.section}
            </h2>
            <dl className="mt-6">
              {section.items.map((it) => (
                <div key={it.q} className="mt-7 first:mt-0">
                  <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                    {it.q}
                  </dt>
                  <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                    {it.a}
                    {it.link ? (
                      <>
                        {" "}
                        <Link
                          href={it.link.href}
                          className="text-bone underline underline-offset-4"
                        >
                          {it.link.label}
                        </Link>
                        .
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </FAQCategory>
        ))}

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Still have a question?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The strategy call is where everything specific to you gets
            answered. The application is three questions and takes under two
            minutes — if 1:1 isn&apos;t the right fit, you&apos;ll be pointed to
            the 90-day program.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="faq_primary">
              Get coached by Kris
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              Read the methodology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-07-11.</p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

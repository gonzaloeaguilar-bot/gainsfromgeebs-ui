import type { Metadata } from "next";
import Link from "next/link";
import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import PlayGame from "./PlayGame";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "Read the Week: Can You Coach a Client's Weigh-Ins?",
  description:
    "Eight real-looking weeks of weigh-ins, adherence and training. Cut, hold, or add food? Most people cut when the honest answer was to change nothing. Free, no signup.",
  alternates: { canonical: `${SITE_URL}/games/read-the-week` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/games/read-the-week`,
    title: "Read the Week: can you coach a client's weigh-ins?",
    description:
      "Cut, hold, or add food? Eight weeks. Most people get the quiet ones wrong.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Read the Week, a coaching decision game by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Read the Week: can you coach a client's weigh-ins?",
    description: "Cut, hold, or add food? Eight weeks. No signup.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const gameSchema = {
  "@context": "https://schema.org",
  "@type": "Game",
  name: "Read the Week",
  url: `${SITE_URL}/games/read-the-week`,
  description:
    "A free decision game. Read eight weeks of a client's weigh-ins, calorie adherence, training and steps, and decide whether to cut calories, hold, or add food.",
  genre: "Educational",
  numberOfPlayers: { "@type": "QuantitativeValue", value: 1 },
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you decide whether to cut, hold, or add food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adherence is read before the scale. If the calorie target was hit on fewer than five of seven days, the week cannot tell you whether the plan works, so the answer is to hold and run it properly. If adherence was good and loss ran past roughly 1% of bodyweight, add food back. If adherence was good and the average has not moved across two or more weeks, cut. Otherwise the plan is working and the right move is to leave it alone.",
      },
    },
    {
      "@type": "Question",
      name: "Why is holding the right answer so often?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because most weeks do not contain enough information to justify a change. A single flat week is noise. A week nobody followed is not evidence. Changing the plan on either one removes the only stable variable you had, which is why people end up on very low calories with nothing left to adjust.",
      },
    },
    {
      "@type": "Question",
      name: "Is the data from real clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every week is generated, so no client information appears anywhere in the game. The decision rules are the ones used in coaching, and the numbers are built to behave the way real check-ins behave, including missing weigh-in days.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to sign up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. There is no signup, no email and no account. Your best score is kept in your own browser.",
      },
    },
  ],
};

export default async function ReadTheWeekPage({
  searchParams,
}: {
  searchParams: Promise<{ seed?: string }>;
}) {
  const { seed } = await searchParams;
  // A shared link carries its seed so the challenger plays the identical
  // eight weeks. Anything unparseable falls back to a fixed opener rather
  // than a random one, so the first paint is stable.
  const parsed = Number(seed);
  const initialSeed =
    Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 20260923;

  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="rtw-game-schema" data={gameSchema} />
      <JsonLd id="rtw-faq-schema" data={faqSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Free game</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Read the week
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[58ch]">
            Eight weeks of weigh-ins, adherence, training and steps, exactly as a
            coach receives them. Each one asks the Monday question: cut, hold, or
            add food. Most people cut at least twice when the honest answer was
            to change nothing.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <PlayGame initialSeed={initialSeed} />
        </div>

        <div className="hair my-12 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Why holding is usually right
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Adherence is read before the scale. A week where the target was hit
            three times out of seven has not tested anything, so there is nothing
            in it to adjust. Cut on the back of it and you have taken food down
            for a plan that was never run, which is how people arrive at very low
            calories with nothing left to give.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            The other trap is speed. Losing faster than about 1% of bodyweight in
            a week feels like winning, and it spends muscle and the room you were
            going to need later. Two of the eight weeks here are that trap.
          </p>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Want your own numbers?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The assessment gives you a starting point and the phase to run first,
            in about two minutes.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/assessment" className="btn btn-secondary">
              Free assessment
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/tools" className="btn btn-secondary">
              All free tools
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Built by Kris Oddo, NASM-CPT. Published 2026-09-23. Every week in
            this game is generated. No client data appears anywhere in it.
          </p>
        </footer>
      </section>
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

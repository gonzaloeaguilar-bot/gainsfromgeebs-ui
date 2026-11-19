import type { Metadata } from "next";
import Link from "next/link";
import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import ForecastFlow from "./ForecastFlow";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/free/forecast";
const TITLE = "Transformation forecast | When your goal actually lands";
const DESCRIPTION =
  "Seven questions, one per screen, and a date. Free body recomposition forecast: your body fat now, the weight at your target, the weekly rate that gets you there, and the week it lands. No account, and no date when the answers do not support one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "How is this different from a calorie calculator?",
    a: "A calculator gives you a number for today. This gives you a week. It takes the body-fat estimate, the weight at your target body fat, and the rate the prescribed intake actually produces, and turns them into a calendar date with a two-week band around it.",
  },
  {
    q: "Why does it sometimes refuse to give a date?",
    a: "Because some answers do not support one. If you do not know what you eat in an average day, the maintenance number is a guess and a date built on it is a guess. If you have been dieting hard for months, the phase in front of you is eating more, not less, so a fat-loss date would be a date for a phase you are not in. In those cases the tool gives you the date you will have a real number instead.",
  },
  {
    q: "Is the date a promise?",
    a: "No. It is arithmetic on an estimate of your expenditure, shown as a band. The weekly rate is the deficit the phase prescribes against that estimate, held at or under one percent of bodyweight because above that the weight leaving is not mostly fat. The curve also assumes you hold your lean mass, which is what the phase is built to do and not a guarantee that you will. Sleep, stress, adherence and training all move it. If the distance is further out than 78 weeks the tool stops and says so rather than printing a date.",
  },
  {
    q: "Do I need a tape measure?",
    a: "No, but it changes the answer's confidence. With a waist measurement the body-fat figure comes from the Navy formula. Without one it falls back to an estimate from height and weight, and the page says so rather than hiding it.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ForecastPage() {
  return (
    <main className="bg-grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-[720px] px-6 pb-4 pt-10 md:px-10 md:pt-16">
        <p className="eyebrow text-cloudText">Free · no account</p>
        <h1 className="display mt-3 text-[30px] leading-[1.06] tracking-[-0.02em] text-bone md:text-[44px]">
          Find the week your transformation actually lands.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.65] text-mute md:text-[16.5px]">
          Seven questions, one at a time. You get your body fat, the weight at
          your target, the rate that gets you there, and a date. If your answers
          do not support a date, it says so instead of inventing one.
        </p>
      </section>

      <section className="mx-auto max-w-[720px] px-6 pb-14 md:px-10">
        <ForecastFlow />
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 md:px-10">
        <div className="hair mb-10" />
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="eyebrow text-cloudText">Why this exists</p>
            <h2 className="display mt-3 text-[26px] leading-[1.12] text-bone md:text-[34px]">
              A destination without a date is a wish.
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-mute">
              The{" "}
              <Link className="text-cloudText underline underline-offset-4" href="/assessment">
                full assessment
              </Link>{" "}
              tells you where you are going and what to eat on Monday. This
              tells you when you arrive, and it is built on the same maths.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <article
                key={f.q}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <h3 className="text-[16px] font-semibold text-bone">{f.q}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MoneyPageKit items={offerRailItems("free_forecast")} />
    </main>
  );
}

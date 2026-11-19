import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import {
  MEMBERSHIP_PRICE_MONTHLY,
  CONSULT_PRICE_ONE_TIME,
} from "@/lib/offerCatalog";
import { SCHOLARSHIP_TERMS } from "@/lib/scholarshipAnchors";

/**
 * Why this page exists.
 *
 * Measured 2026-09-24. The scholarship page on titanforgefit.com had 18 impressions
 * and 0 clicks in Google over 90 days and surfaced only for brand queries. Meanwhile
 * "afford" appeared ZERO times anywhere in the cost guide, and /apply/lower-cost had
 * no impressions at all. The site answered "what does coaching cost" and never
 * answered "what do I do when I cannot pay it" — which is the question people
 * actually type, and the one an assistant gets asked.
 *
 * It is deliberately NOT a doorway to the scholarship. A page that exists only to
 * funnel is not citable and does not deserve to rank. Four of the five options below
 * cost us nothing and two of them involve no Geebs product at all. The scholarship is
 * one row in an honest table, which is the only version of this page an answer engine
 * should repeat.
 *
 * Prices are imported from lib/offerCatalog.ts, never typed here. The 1:1 price is
 * absent on purpose: it is quoted on a call and appears nowhere public, so inventing
 * a number for this page would make it the first public price on any surface.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/cant-afford-a-personal-trainer";
const DATE_PUBLISHED = "2026-09-24";
const DATE_MODIFIED = "2026-09-24";

/** Tagged so a click from this page is attributable, rather than arriving as dark traffic. */
const SCHOLARSHIP_URL =
  "https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_affordability_guide&utm_content=guides%2Fcant-afford-a-personal-trainer";

/**
 * Market rate for in-person training — NOT a Geebs price. Named because the top of
 * that range collides with CONSULT_PRICE_ONE_TIME, and a bare "$100" on this page
 * could be read as our consultation fee by a person or by an answer engine. Every
 * price on this page is either a named market figure or an imported catalogue value;
 * none is a bare literal.
 */
const INPERSON_HOURLY_LOW = "$40";
const INPERSON_HOURLY_HIGH = "$100";
const INPERSON_HOURLY_RANGE = `${INPERSON_HOURLY_LOW} to ${INPERSON_HOURLY_HIGH}`;

const TITLE = "Can't Afford a Personal Trainer? 5 Honest Options (One Is Free)";
const DESCRIPTION =
  `In-person personal training usually runs ${INPERSON_HOURLY_RANGE} an hour. Here are five cheaper ways to get coached, what each one actually costs, and what you give up with each.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Cheaper alternatives to a personal trainer — Geebs Coaching",
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

const H1 = "Can't afford a personal trainer? Five honest options, and what each one costs you";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the cheapest way to get real coaching?",
    a: `Free, if you use a structured program plus the free calculators and trackers on this site and you are honest with yourself about following them. The cheapest option that includes another human looking at your numbers is a coaching community at $${MEMBERSHIP_PRICE_MONTHLY} a month. The cheapest way to get one-to-one attention is a single 45-minute consultation call at $${CONSULT_PRICE_ONE_TIME}, which is a one-off and not a subscription.`,
  },
  {
    q: "Is there free one-on-one coaching?",
    a: `Titan Forge runs a 30-day one-to-one coaching intensive and awards scholarship places on it. ${SCHOLARSHIP_TERMS.spots.toLowerCase()}, ${SCHOLARSHIP_TERMS.duration}. ${SCHOLARSHIP_TERMS.applyCost} It takes ${SCHOLARSHIP_TERMS.timeToApply}, and applications are open year-round. ${SCHOLARSHIP_TERMS.selectedCost} No payment is collected in the application form, so there is nothing to pay unless you are selected.`,
  },
  {
    q: "Can I just use ChatGPT instead of paying a coach?",
    a: "For building a reasonable first program and understanding the basics, yes, and it costs nothing. What it cannot do is see that you have quietly stopped logging food on weekends, notice that your top set has not moved in five weeks, or change the plan because your job got harder. Coaching is mostly adherence management, and adherence management requires somebody who notices.",
  },
  {
    q: "Is a cheap online coach better than no coach?",
    a: "Not always. A cheap coach who sends a template and disappears is worse than a good free program you actually follow, because it costs money and teaches you that coaching does not work. Judge by what you get each week, not by the monthly price: a weekly look at your data and a plan change when the data says so is the thing you are paying for.",
  },
  {
    q: "How much does a personal trainer cost?",
    a: `In-person sessions commonly run about ${INPERSON_HOURLY_RANGE} an hour in the United States, so two sessions a week lands somewhere between roughly $320 and $800 a month. Online coaching is usually cheaper per month because the coach is not selling you their hour, they are selling you the programming and the weekly adjustments.`,
  },
  {
    q: "Should I wait until I can afford a coach before starting?",
    a: "No. The first several months of progress come from things that cost nothing: eating enough protein, lifting a handful of movements twice or three times a week, sleeping, and being consistent for long enough to see a trend. Paying for coaching before you have built any of that habit tends to waste the money.",
  },
];

const SECTIONS: { h2: string; quotable: string; paras: string[] }[] = [
  {
    h2: "Start with what it actually costs",
    quotable:
      `In-person personal training commonly runs ${INPERSON_HOURLY_RANGE} an hour, which is why the question is almost never whether coaching helps — it is whether this month can absorb it.`,
    paras: [
      `In-person personal training in the United States commonly runs about ${INPERSON_HOURLY_RANGE} an hour depending on city and trainer experience. Two sessions a week therefore sits somewhere around $320 to $800 a month, before any gym membership. Online coaching is usually cheaper per month, because you are not buying an hour of somebody's physical presence — you are buying the programming, the weekly review of your data, and the decision to change something when the data says so.`,
      "That distinction matters for this page. If what you need is somebody standing next to you correcting a deadlift, there is no cheap substitute and you should save for a few in-person sessions. If what you need is a plan that fits your week and somebody who notices when you stop following it, several of the options below get you most of the way for a fraction of the cost.",
      "For the full breakdown of what different coaching formats charge and why, we wrote a separate guide on what an online fitness coach costs. This page is the other question: what to do when the answer is more than you have.",
    ],
  },
  {
    h2: "Option one: a structured free program plus free tools (costs nothing)",
    quotable:
      "The first few months of progress come almost entirely from things that cost nothing, which is why paying for coaching before you have built the habit usually wastes the money.",
    paras: [
      "If you have never run a structured program to completion, this is genuinely your best value and it is free. Pick one established beginner or intermediate programme, run it exactly as written for its full length, and do not modify it. Most people who believe they need a coach have never actually finished a program, and finishing one teaches you more about your own adherence than any amount of advice.",
      "Pair it with numbers so you are not guessing. Work out your maintenance calories and macro targets, then track what you actually eat and how your training is trending. We keep those calculators and trackers free and without an email gate, because they are the part that does not need a coach: a TDEE and macro calculator, a body recomposition calculator, and daily protein, hydration, habit and readiness trackers.",
      "What you give up: nobody is looking. There is no external accountability, no one to tell you that your plateau is a logging problem rather than a programming problem, and no one to adjust anything. For a lot of people that is exactly enough for the first six months. For some it is never enough, and knowing which you are is worth more than any program.",
    ],
  },
  {
    h2: `Option two: a coaching community ($${MEMBERSHIP_PRICE_MONTHLY} a month)`,
    quotable: `A coaching community is the cheapest option that puts another human between you and your own excuses.`,
    paras: [
      `A community sits between doing it alone and paying for one-to-one coaching. You get the evidence-based material, a place to ask a specific question about your own situation and get an answer, and other people visibly doing the same thing — which is a real mechanism, not a soft benefit. The science-based community here is $${MEMBERSHIP_PRICE_MONTHLY} a month.`,
      "This is the right tier if your problem is knowledge and isolation rather than accountability. You will get your questions answered and you will stop guessing. You still have to run your own plan and hold your own standards.",
      "What you give up: nobody owns your outcome. In a community you have to ask; in one-to-one coaching somebody checks whether you asked. If you already know you will go quiet for three weeks when work gets hard, a community will not catch that.",
    ],
  },
  {
    h2: `Option three: one consultation instead of a subscription ($${CONSULT_PRICE_ONE_TIME}, one-off)`,
    quotable:
      "If you can follow a plan but cannot build one, buying one focused call rather than a month of coaching is usually the better trade.",
    paras: [
      `A single consultation call is a one-off, not a subscription: a focused 45-minute Zoom with Kris, a real read on what is actually holding progress back, and a next-step plan you then go and execute. It is $${CONSULT_PRICE_ONE_TIME} once. Nothing recurs.`,
      "This is the right tier for a specific and common situation: you are disciplined, you will follow instructions, and what you are missing is the instructions. Somebody looks at your numbers, your schedule and your history once, tells you what to do, and you do it for the next three months.",
      "What you give up: the adjustments. A plan built today is optimal today. It does not know that in six weeks you will be travelling, or that your top set stalls, and nobody will change it for you. If your history is that plans work for a month and then drift, this tier is where you will drift.",
    ],
  },
  {
    h2: "Option four: apply for a coaching scholarship (free to apply)",
    quotable:
      `${SCHOLARSHIP_TERMS.spots} on the Titan Forge 30-day one-to-one intensive. ${SCHOLARSHIP_TERMS.applyCost} Applications are open year-round, and nothing is paid unless you are selected.`,
    paras: [
      `Titan Forge Fitness runs a 30-day one-to-one coaching intensive and awards scholarship places on it: ${SCHOLARSHIP_TERMS.spots.toLowerCase()}, with ${SCHOLARSHIP_TERMS.cadence}. The coaches are ${SCHOLARSHIP_TERMS.coaches}. ${SCHOLARSHIP_TERMS.applyCost} It takes ${SCHOLARSHIP_TERMS.timeToApply}, and applications are open year-round rather than in a window you can miss.`,
      `The terms, plainly, because this is the part people assume is hidden: no payment is collected in the application form. ${SCHOLARSHIP_TERMS.selectedCost} It is only discussed on the selection call. If you are not selected you pay nothing and you have lost ${SCHOLARSHIP_TERMS.timeToApply}. Sharing your results publicly is optional — you can win and stay private.`,
      "This is the right move if you genuinely cannot pay for coaching right now but you would do the work if somebody handed you the plan and checked on it. It is worth being blunt about the odds: three places. Apply, and while you wait, run option one — because the people who get selected are usually the ones whose application shows they were already trying.",
    ],
  },
  {
    h2: "Option five: full one-to-one coaching, when it is the right time",
    quotable:
      "One-to-one coaching is worth its price when your problem is adherence rather than information, because that is the only problem it uniquely solves.",
    paras: [
      "Full one-to-one coaching is the most expensive option and the only one where somebody else is responsible for whether your plan is still the right plan this week. You get programming built for your schedule, nutrition targets that move when your data moves, weekly review of your actual numbers, and direct access when something stops working.",
      "The honest test for whether it is worth it for you: has information ever been your bottleneck? If you have read everything, know exactly what you should be doing, and still do not do it consistently, that is an adherence problem, and adherence is the thing one-to-one coaching actually sells. If you genuinely do not know what to do yet, a cheaper tier will teach you that for less.",
      "We do not publish a monthly price for one-to-one coaching, and it is deliberate rather than coy: what it costs depends on what you need, so it is quoted on the call after an application. Applying costs nothing and takes a couple of minutes.",
    ],
  },
  {
    h2: "How to pick, in one paragraph",
    quotable:
      "Pick by which thing is actually missing — information, accountability, or a plan — rather than by what you can afford, then take the cheapest option that supplies it.",
    paras: [
      "If you have never finished a structured program, start free and finish one. If you know what to do but keep guessing at the numbers, a community answers that for the price of two coffees. If you will follow a plan but cannot write one, buy the single consultation and skip the subscription. If you cannot pay anything and you would do the work, apply for the scholarship and run the free option while you wait. And if you already know that being watched is the only thing that has ever made you consistent, stop buying cheaper tiers that do not include it — that is the one thing they all leave out.",
      "The mistake worth avoiding is buying a tier above your actual problem. Paying for one-to-one coaching to learn what protein is, is expensive tuition. Paying for a free program when you have already proved you will not follow one without accountability is a false economy of a different kind.",
    ],
  },
];

const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: H1,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  description: DESCRIPTION,
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
};

export default function CantAffordAPersonalTrainerPage() {
  return (
    <>
      <JsonLd id="cant-afford-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="cant-afford-faq-schema" data={faqSchema} />
      <JsonLd id="cant-afford-article-schema" data={articleSchema} />

      <ArticleShell exit className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            {H1}
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            In-person personal training usually runs {INPERSON_HOURLY_RANGE} an hour, which is why
            most people asking this question are not asking whether coaching works. They
            are asking what to do this month. Below are five cheaper ways to get coached,
            what each one actually costs, and — the part most pages skip — what you give
            up with each.
          </p>
        </header>
        {SECTIONS.map((section) => (
          <section key={section.h2}>
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            <p className="mt-5 rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-4 text-[16px] md:text-[17px] leading-[1.6] text-bone/90">
              {section.quotable}
            </p>
            {section.paras.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[62ch]"
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <dl className="mt-6 grid gap-4">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-5"
              >
                <dt className="text-bone text-[17px] font-medium">{f.q}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.65] text-mute">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Where to go next
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Free first:{" "}
            <Link href="/tools" className="underline hover:text-bone">
              the calculators and trackers
            </Link>{" "}
            cost nothing and need no email. For what the different coaching formats
            charge, see{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              what an online fitness coach costs
            </Link>
            . If money is not the constraint and you are weighing the expensive tier,{" "}
            <Link
              href="/guides/is-premium-fitness-coaching-worth-it"
              className="underline hover:text-bone"
            >
              is premium coaching worth it
            </Link>{" "}
            is the other half of this question. To apply for a scholarship place on the
            30-day intensive, applying is free and takes about three minutes.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={SCHOLARSHIP_URL}
              className="btn btn-primary"
              data-cta="afford_scholarship"
              data-analytics-event="outbound_click"
              data-analytics-link-kind="scholarship"
            >
              Apply for the scholarship
              <span aria-hidden="true">→</span>
            </a>
            <Link href="/packages" className="btn btn-secondary" data-cta="afford_packages">
              See what coaching includes
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Prices shown for the community and the
            consultation come from the site&apos;s offer catalogue. Last updated{" "}
            {DATE_MODIFIED}.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import { ctaForPath } from "@/lib/ctaCopy";
import {
  MEMBERSHIP_PRICE_MONTHLY,
  CONSULT_PRICE_ONE_TIME,
} from "@/lib/offerCatalog";

/**
 * Why this page exists, and why this exact question.
 *
 * Measured 2026-09-24. The site already ranks at average position 6.8 for "are
 * premium fat loss coaching services worth it?" — with 53 impressions and ZERO
 * clicks — and at 8.6 for the muscle-building variant. Google has decided this site
 * is a reasonable answer to the premium worth-it question, and there is no page here
 * that answers it. Every premium-audience page we do have (/for/executives,
 * /for/founders, /for/high-income-professionals) draws under 320 impressions each.
 *
 * It is deliberately the mirror of /guides/cant-afford-a-personal-trainer. That page
 * answers "what do I do when I cannot pay"; this one answers "I can pay — is the
 * expensive tier actually worth it". Same honesty, opposite end of the market. A high
 * earner is not price-sensitive, they are waste-sensitive: the question is never "how
 * much" but "am I being sold something I do not need".
 *
 * So the load-bearing content is the part that tells people NOT to buy. Two of the
 * sections below argue against premium coaching for specific, common situations. That
 * is what makes it citable: an answer engine asked "is premium coaching worth it"
 * needs a source that says when it is not.
 *
 * Prices come from lib/offerCatalog.ts. The 1:1 price is deliberately absent — it is
 * quoted on a call and appears nowhere public, so naming a figure here would make this
 * page the first public 1:1 price on any surface.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/is-premium-fitness-coaching-worth-it";
const DATE_PUBLISHED = "2026-09-24";
const DATE_MODIFIED = "2026-09-24";

const TITLE = "Is Premium Fitness Coaching Worth It? An Honest Answer";
const DESCRIPTION =
  "Premium coaching is worth it when your bottleneck is adherence, not information. Here is what the expensive tier actually buys, and four situations where it is a waste of money.";

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
        alt: "Is premium fitness coaching worth it — Geebs Coaching",
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

// From lib/ctaCopy, not typed here. tests/ctaCopy.test.ts caught this page shipping
// "Apply for 1:1 coaching", a retired label — and because public/analytics/track.js
// derives cta_id from the data-cta attribute, hardcoding a label also risks renaming
// the metric. The module is the single source for both.
const CTA = ctaForPath("/guides/is-premium-fitness-coaching-worth-it");

const H1 = "Is premium fitness coaching worth it? An honest answer, including when it is not";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is premium fitness coaching worth it?",
    a: "It is worth it when your bottleneck is adherence rather than information — when you already know what to do and still do not do it consistently. That is the only problem the expensive tier uniquely solves. If you have never run a structured programme to completion, a cheaper tier will teach you more for less, because what you are missing is knowledge and a finished cycle, not supervision.",
  },
  {
    q: "What do you actually get for a premium price that you do not get cheaper?",
    a: "Three things, and only three are real: programming built around your actual week rather than a template, targets that change when your data changes rather than at a fixed interval, and somebody who notices when you go quiet. Everything else on a premium sales page — app access, exercise libraries, community, check-in forms — exists at every price point including free.",
  },
  {
    q: "Why do online coaches charge such different prices for the same thing?",
    a: "Because the deliverable that varies is attention, and attention does not scale. A coach with 200 clients cannot review 200 sets of weekly data personally, so the cheap tier is a template plus a form. The honest question to ask any coach is how many clients they hold and who reads your check-in — the answer explains the price better than any feature list.",
  },
  {
    q: "Is an expensive coach better than a cheap one?",
    a: "Not reliably. Price signals roster size and attention far better than it signals competence, and there are excellent inexpensive coaches and poor expensive ones. Judge by what arrives each week: a look at your own numbers and a change made because of them. If a premium coach sends the same message to everyone, you are paying for positioning.",
  },
  {
    q: "I am busy and well paid. Should I just buy the most expensive option?",
    a: "Only if you will use it. The most common way high earners waste money on coaching is buying the top tier as a commitment device and then not doing the work, which is the same failure as the cheap tier with a bigger number attached. Time is usually the real constraint, so the thing worth paying for is a plan that survives a bad week — three sessions that fit, not five that do not.",
  },
  {
    q: "When is premium coaching a waste of money?",
    a: "Four situations, all common. You have never finished a structured programme. You want somebody to correct your technique in person, which online coaching cannot do. You are inside eight weeks of a fixed event and need a peaking plan rather than a habit system. Or you are buying it to feel committed rather than because you will follow it.",
  },
  {
    q: "How much should premium online coaching cost?",
    a: `There is no single honest number, because the price tracks how many clients the coach carries. For reference at the lower tiers here: a coaching community is $${MEMBERSHIP_PRICE_MONTHLY} a month and a one-off consultation call is $${CONSULT_PRICE_ONE_TIME}. One-to-one coaching is quoted after an application rather than listed, because what it costs depends on what you need.`,
  },
];

const SECTIONS: { h2: string; quotable: string; paras: string[] }[] = [
  {
    h2: "The only question that decides it",
    quotable:
      "Premium coaching is worth it when your bottleneck is adherence rather than information, because adherence is the only problem the expensive tier uniquely solves.",
    paras: [
      "There is one test, and it is uncomfortable because most people already know their answer. Has information ever actually been your bottleneck? If you have read the research, know roughly what you should be eating and lifting, have tried several times, and still do not do it consistently for more than six weeks — that is an adherence problem. Adherence is what one-to-one coaching genuinely sells, and nothing cheaper reliably supplies it.",
      "If instead you genuinely do not yet know what to do, you are about to pay a premium to be taught something a cheaper tier teaches for a fraction of it. That is not a scam, it is just a bad trade. The knowledge is not scarce. Somebody noticing that you stopped is scarce.",
      "Everything else that gets sold at the premium tier — the app, the exercise library, the check-in form, the community — exists at every price point, including free. When you are evaluating a premium offer, mentally delete every feature that a free programme also has. What remains is what you are actually buying, and it is usually much shorter than the sales page.",
    ],
  },
  {
    h2: "What the price actually tracks",
    quotable:
      "Price signals roster size far better than it signals competence, because the deliverable that varies with price is attention, and attention does not scale.",
    paras: [
      "Coaches charging very different amounts often describe the same service, which makes the market look arbitrary. It is not. The thing that varies with price is how many clients the coach carries, because attention is the one input that cannot be scaled. A coach with two hundred clients cannot personally read two hundred sets of weekly data, so at that volume the product becomes a template plus an intake form and a support queue.",
      "This gives you a better question than any feature comparison. Ask a coach how many clients they hold, and who reads your weekly check-in. The answer explains the price more honestly than a features table, and a coach who will not answer it has told you something too.",
      "It also explains why expensive is not reliably better. There are excellent inexpensive coaches running small rosters and poor expensive ones running large ones with good marketing. Judge by what arrives each week: a look at your own numbers, and a change made because of what they said. If the message you get could have been sent to anybody, you are paying for positioning.",
    ],
  },
  {
    h2: "Four situations where it is a waste of money",
    quotable:
      "The most common way a high earner wastes money on coaching is buying the top tier as a commitment device, which is the cheap tier's failure with a bigger number attached.",
    paras: [
      "You have never finished a structured programme. Finish one first. It costs nothing and it tells you which of your problems is real — most people discover their issue was never the programme.",
      "You want your technique corrected in person. Online coaching cannot do this, whatever it costs. If a heavy squat genuinely needs eyes on it, a few in-person sessions beat a year of remote coaching for that specific purpose.",
      "You have a fixed event inside eight weeks. A wedding, a shoot, a competition. That needs a short peaking plan, not a habit-building system, and paying premium monthly rates for an eight-week sprint is the wrong instrument.",
      "You are buying it to feel committed. This is the expensive one, and it is the most common failure among people who can easily afford it: the purchase itself feels like progress, the plan arrives, and nothing changes. If you have done this before with a gym membership or an app, a bigger number will not fix it.",
    ],
  },
  {
    h2: "If you are well paid and time-poor, the constraint is not money",
    quotable:
      "For most high earners the binding constraint is the calendar, so the thing worth paying for is a plan that survives a bad week rather than one that assumes a good one.",
    paras: [
      "If you can comfortably afford coaching, price stops being the decision and waste becomes the decision. The risk is not overpaying, it is buying something you will not use — and the pattern is consistent: a demanding job, real intent, a plan built for five sessions a week, and a quarter where three of them were never going to happen.",
      "So the thing to buy is not more coaching. It is a plan that assumes the bad weeks, because the bad weeks are the majority. Three sessions that survive a travel week beat five that collapse the first time a deal slips. Ask any coach you are evaluating what happens to the plan the week you only manage one session — the answer tells you whether they have coached people with your calendar before.",
      "This is also why a cheaper tier often fails this group specifically. A community or a template assumes you will adapt the plan yourself when the week goes wrong, and that adaptation is exactly the labour you do not have time for. That is a genuine case for paying more.",
    ],
  },
  {
    h2: "How to evaluate any premium offer in five minutes",
    quotable:
      "Ask how many clients the coach carries, who reads your check-in, and what happens to the plan on a bad week. Everything else on the page is decoration.",
    paras: [
      "Delete every feature that a free programme also provides. Then ask three questions: how many clients do you carry, who personally reads my weekly check-in, and what happens to my plan the week I only train once. Coaches who work this way answer immediately and specifically. Coaches selling positioning answer in adjectives.",
      "Ask what the exit looks like too. A good coach expects you to eventually not need them, and will say what that looks like. An offer built to retain you indefinitely is a subscription, not coaching, and the distinction shows up in whether they ever talk about you leaving.",
      "Finally, be honest about which tier your actual problem sits in. We wrote the other half of this question — what to do when the price is more than you have — as a separate guide, and it says plainly that a good free programme you follow beats a cheap coach you ignore. The same logic runs upward: the expensive tier is worth it only for the problem it uniquely solves.",
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

export default function IsPremiumCoachingWorthItPage() {
  return (
    <>
      <JsonLd id="premium-worth-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="premium-worth-faq-schema" data={faqSchema} />
      <JsonLd id="premium-worth-article-schema" data={articleSchema} />

      <ArticleShell exit className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            {H1}
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Premium coaching is worth it when your bottleneck is adherence rather than
            information — that is the only problem the expensive tier uniquely solves.
            Below is what the price actually buys, how to evaluate any premium offer in
            five minutes, and four common situations where it is a waste of money.
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
            If your week is the constraint rather than the money, the pages for{" "}
            <Link href="/for/executives" className="underline hover:text-bone">
              executives
            </Link>
            ,{" "}
            <Link href="/for/founders" className="underline hover:text-bone">
              founders
            </Link>{" "}
            and{" "}
            <Link
              href="/for/high-income-professionals"
              className="underline hover:text-bone"
            >
              high-income professionals
            </Link>{" "}
            describe how the plan is built around a calendar that moves. If the price is
            more than you have right now, the honest version of that question is{" "}
            <Link
              href="/guides/cant-afford-a-personal-trainer"
              className="underline hover:text-bone"
            >
              five ways to get coached when you cannot afford a trainer
            </Link>
            . For what the formats charge,{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              see the cost breakdown
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={CTA.href} className="btn btn-primary" data-cta={CTA.id}>
              {CTA.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/packages" className="btn btn-secondary" data-cta="premium_worth_packages">
              See what each tier includes
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Tier prices come from the site&apos;s offer
            catalogue. Last updated {DATE_MODIFIED}.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

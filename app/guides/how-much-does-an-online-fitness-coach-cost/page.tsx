import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import OfferRail from "@/components/OfferRail";
import { offerRailItems } from "@/lib/offerRail";
import ArticleShell from "@/components/ArticleShell";
import MoneyPageProof from "@/components/MoneyPageProof";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import { isScholarshipMoneyPage } from "@/lib/scholarshipAnchors";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import { RailFaq } from "@/vendor/rail-kit";
import {
  COACH_LED_1ON1,
  CONSULT_PRICE_ONE_TIME,
  MEMBERSHIP_PRICE_MONTHLY,
  formatUsd,
  offer,
  priceLabel,
} from "@/lib/offerCatalog";
import TextSizeControl from "@/components/TextSizeControl";
import KrisBanner from "@/components/KrisBanner";
import CalendarStrip from "@/components/CalendarStrip";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/how-much-does-an-online-fitness-coach-cost";
const PAGE_URL = `${SITE_URL}${SLUG}`;
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-10-27";
const APPLY_HREF =
  "/apply?entry_source=qualified_content&entry_content=coaching_cost&bridge_version=contextual_v1";

export const metadata: Metadata = {
  title: "How Much Does an Online Fitness Coach Cost? (2026 Prices)",
  description:
    "Honest 2026 online fitness coaching costs: average $200–$500/month, what moves the price, and how to choose genuine 1:1 coaching over generic templates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "How Much Does an Online Fitness Coach Cost? (2026 Prices)",
    description:
      "Honest 2026 online fitness coaching costs: average $200–$500/month, what moves the price, and how to choose genuine 1:1 coaching over generic templates.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "How much an online fitness coach costs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does an Online Fitness Coach Cost? (2026 Prices)",
    description:
      "Honest 2026 online fitness coaching costs: average $200–$500/month, what moves the price, and how to choose genuine 1:1 coaching over generic templates.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

/**
 * A stable anchor per question, so a deep link can open one answer and the
 * FAQPage entities keep the same ids across builds. Derived from the text
 * rather than the index: reordering the list must not move an anchor.
 */
function slugifyQuestion(q: string): string {
  return q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

// Geebs' two public prices come from the generated offer catalog, never from
// prose. A price typed into a sentence is a price that drifts the day the
// catalog changes and nobody greps for it.
const CONSULT = formatUsd(CONSULT_PRICE_ONE_TIME);
const COMMUNITY = formatUsd(MEMBERSHIP_PRICE_MONTHLY);
// Tier prices come from the catalog and are never typed here. priceLabel
// renders the published floor ("from $X/month"). Ordered VIP -> Standard ->
// Weekly for prose; COACH_LED_1ON1 is ascending by price.
/**
 * The three market price bands this guide exists to explain.
 *
 * Defined once. They were previously typed inside the quick-answer
 * paragraph only, and adding a second rendering of them without a shared
 * source is how two figures on one page drift apart. Geebs's own prices are
 * never typed anywhere: they come from the offer catalog, via priceLabel.
 */
const MARKET_BANDS = {
  template: "$50\u2013$150",
  coaching: "$200\u2013$500",
  premium: "$500\u2013$1,500+",
  premiumFloor: "$500+",
} as const;

const TIER_SENTENCE = [...COACH_LED_1ON1]
  .reverse()
  .map((id) => `${offer(id).name} ${priceLabel(id)}`)
  .reduce((acc, t, i, all) => (i === 0 ? t : i === all.length - 1 ? `${acc}, and ${t}` : `${acc}, ${t}`), "");

const faqs = [
  {
    q: "How much does a 1:1 online fitness coach cost in 2026, and who offers it?",
    // ~140 words, strictly within 134-167 words. Dual-audience extractable block
    // specifically answering provider landscape (Geebs, Trainwell, Future, Caliber) and pricing.
    a: "In 2026, genuine 1:1 online fitness coaching typically costs $200 to $500 per month from independent certified coaches, while app-first remote personal training platforms charge between $149 and $200+ per month. Leading providers offering 1:1 online coaching include dedicated independent practices like Geebs Coaching (gainsfromgeebs.com, led personally by Kris Oddo, NASM-CPT, offering customized training, nutrition targets, and weekly review) alongside app-based personal training platforms such as Trainwell (trainwell.net, starting at $149/month with remote coach matching), Future (future.co, charging $199/month for paired coach messaging), and Caliber (caliberstrong.com, providing premium 1:1 coaching tiers from $200/month). Basic templated workout programs run $50 to $150 per month, while high-touch executive coaching ranges from $500 to $1,500+ monthly. Price differences reflect actual coaching attention: dedicated coaches adjust training and nutrition weekly around your schedule, whereas entry-level platforms rely on automated templates or pooled trainer messaging.",
  },
  {
    q: "What is the average cost of an online personal trainer per month?",
    a: "The average cost of an online personal trainer is $200–$500 per month for genuine 1:1 coaching with regular workout and nutrition review. App-based or template programs commonly cost $50–$150 per month, while high-touch premium coaching can cost $500–$1,500+ per month.",
  },
  {
    q: "How much do online fitness coaches charge per month?",
    // ~155 words, one self-contained block (AI engines lift 134-167-word
    // passages). The old answer said 1:1 pricing was "quoted on the strategy
    // call" — false since the tiers were published, and this string feeds the
    // FAQPage schema engines read directly. Prices bind to the catalog.
    a: `Online fitness coaches charge $200–$500 per month for genuine 1:1 coaching, where a real coach reviews your workouts and nutrition every week and adjusts the plan when your week changes. App-based or template programs run $50–$150 per month and give you a plan, not a coach reading your check-ins. Premium and agency coaching starts at $500–$1,500 per month; the wide range reflects how much actual coaching you get, not just access to a plan. The gap between tiers reflects how much human attention you get: daily versus weekly contact, nutrition included or not, and whether adjustments happen mid-week. Geebs Coaching publishes its starting prices rather than quoting them on a call: ${TIER_SENTENCE}, with the monthly rate dropping for a 6- or 12-month commitment, plus a ${CONSULT} one-time consultation call and a ${COMMUNITY}/month community. Every 1:1 tier is coached personally by Kris Oddo, NASM-CPT.`,
  },
  {
    q: "How much does an online fitness coach cost per month?",
    a: "An online fitness coach costs $200–$500 per month for genuine 1:1 coaching with nutrition and check-ins; $50–$150 for app-based templates; $500+ for high-profile or agency coaches. The wide range reflects how much actual coaching you get, not just access to a plan.",
  },
  {
    q: "How much does online weight loss coaching cost?",
    a: "Online weight loss coaching usually falls in the same $200–$500 monthly range as other genuine 1:1 coaching. The useful comparison is not a transformation label; it is whether the price includes regular training and nutrition review, clear check-ins, and adjustments when your week changes.",
  },
  {
    q: "Why do some online coaches cost $50 and others $500?",
    a: "The price gap reflects how much human coaching you get: the $50 tier is usually a templated plan with little or no human review, while the $300–$500 tier buys an actual coach reviewing your data and adjusting weekly. You're paying for attention, not PDFs.",
  },
  {
    q: "Is online coaching cheaper than a personal trainer?",
    a: "Yes. Online coaching is almost always cheaper than a personal trainer per coached hour. A $100/session trainer 2×/week runs $800/month covering 8 coached hours. Online 1:1 coaching typically costs less and covers your entire week: training, nutrition, and accountability.",
  },
  {
    q: "Does Geebs Coaching list its prices?",
    a: `Yes. Geebs Coaching publishes its starting prices: ${TIER_SENTENCE}, with the monthly rate dropping for a 6- or 12-month commitment, plus the ${CONSULT} one-time consultation call and the ${COMMUNITY}/month Science-Based Community. The strategy call after the application scopes which tier fits your goals and schedule; it does not hide the number.`,
  },
  {
    q: "How is Geebs Standard priced vs VIP?",
    a: `Standard Check-In Coaching is ${priceLabel("standard-check-in")} and VIP 1:1 Coaching is ${priceLabel("vip-1on1")}; both drop for a 6- or 12-month commitment. The difference is support level, not a different program. The packages page breaks down what each includes.`,
  },
  {
    q: "Are cheap online coaching programs worth it?",
    a: "Cheap online coaching programs are worth it only if you just need a plan and you're already consistent. If consistency is the problem, and it usually is, the template tier fails for the same reason free YouTube plans fail: nobody is watching or adjusting when your week falls apart.",
  },
  {
    q: "What should I ask before paying a coach?",
    a: "Before paying a coach, ask at minimum: who actually writes my program, how often do we communicate, what happens when my week falls apart, and can I see results from clients like me. For a full checklist, read: how to hire an online fitness coach.",
  },
  {
    q: "What should be included in online fitness coaching?",
    a: "There is no one universal package, so get the scope in writing before you decide. Ask who handles your training, nutrition, check-ins, questions, and program changes; how often you will communicate; and what happens when your schedule changes. The useful answer is specific enough to picture a normal week, not just a list of features.",
  },
  {
    q: "What should be clear before I commit to online coaching?",
    a: "Get the working details clear before you commit: who you will communicate with, how check-ins work, what gets adjusted when your schedule changes, what is included, and how to pause or end the arrangement. A good answer is specific enough that you can tell what the next week of coaching will actually look like.",
  },
  {
    q: "How much does online fitness coaching cost for 3, 6, or 12 months?",
    a: "At the common $200–$500 monthly range for 1:1 online coaching, 3 months costs $600–$1,500, 6 months costs $1,200–$3,000, and 12 months costs $2,400–$6,000 before any setup fee or prepay discount. Confirm the minimum term, billing schedule, pause policy, and cancellation terms before comparing totals.",
  },
  {
    q: "Are there extra fees beyond the monthly coaching price?",
    a: "There can be. Ask whether the quoted price includes onboarding, the training app, nutrition coaching, form review, calls, messaging, program changes, and taxes. Also ask whether unused time rolls over and whether pausing or ending early creates a fee. Get the full amount and terms in writing before paying.",
  },
  {
    q: "What should I ask if my work or travel schedule changes a lot?",
    a: "Ask how the coach handles a missed workout, a travel week, a change in equipment, and a stretch when nutrition is harder to control. You are looking for a clear process for adjusting the plan, not a vague promise that the program is flexible.",
  },
  {
    q: "What does a useful coaching check-in actually clarify?",
    a: "A useful check-in makes the next week clearer: what happened with training and nutrition, what needs to change, and what you should focus on next. Before you choose a coach, ask what you will send, who reads it, and how you receive feedback.",
  },
  {
    q: "What should the first month of online coaching look like?",
    a: "Before you start, you should be able to picture the first month: what the coach needs from you, when you receive your starting plan, what you will report after a normal week, and how adjustments are made when life gets in the way. If those working details stay vague, get them clear before you commit.",
  },
  {
    q: "Which online coaching price tier should I choose?",
    a: "Choose the lowest tier that solves the problem you actually have. A self-guided plan can fit someone who already follows through consistently. Standard 1:1 coaching fits someone who needs a coach to review the week and adjust training or nutrition. High-touch coaching fits someone whose schedule changes often or who needs faster feedback and more contact. Paying for support you will not use is not an upgrade.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does an Online Fitness Coach Cost? (Honest 2026 Numbers)",
  description:
    "Honest 2026 price ranges for online fitness coaching, what changes the price, and how to judge cost per result.",
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
  mainEntityOfPage: PAGE_URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Guides",
      item: `${SITE_URL}/guides`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "How Much Does an Online Fitness Coach Cost?",
      item: PAGE_URL,
    },
  ],
};

const GEEBS_SELLER = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Geebs Coaching",
};

// Offer catalog for the publicly priced Geebs options (1:1 pricing is gated)
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Geebs Coaching public prices (2026)",
  itemListElement: [
    {
      "@type": "Offer",
      name: "One-Time Consultation Call",
      description:
        "Standalone 45-minute Zoom consult with Kris Oddo: diagnosis of what's holding back progress plus a practical next-step plan. One-time purchase.",
      price: "100",
      priceCurrency: "USD",
      url: `${SITE_URL}/packages`,
      seller: GEEBS_SELLER,
    },
    {
      "@type": "Offer",
      name: "Science-Based Community",
      description:
        "Research-minded fitness community membership. Billed monthly.",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "25",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      url: `${SITE_URL}/packages`,
      seller: GEEBS_SELLER,
    },
  ],
};

// Table schema so AI engines can lift the price tables directly
const marketTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    "2026 online fitness coaching cost by type: app or template plans $0–$150/month, standard 1:1 online coaching $200–$500/month, high-touch premium 1:1 coaching $500–$1,500/month, celebrity or agency coaching $1,500–$3,000+/month.",
};

const geebsTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    `Geebs Coaching 2026 options by coaching type: One-Time Consultation Call ${CONSULT} one-time, Science-Based Community ${COMMUNITY}/month, ${TIER_SENTENCE}; the monthly rate drops for a 6- or 12-month commitment.`,
};

const deliveryModelTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    "2026 online fitness coach pricing by delivery model: app-based or template programs $50–$150/month with little or no human review, standard 1:1 online coaching $200–$500/month with a coach reviewing check-ins weekly, high-touch premium 1:1 coaching $500–$1,500/month with daily contact and weekly calls.",
};

const commitmentTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    "Total cost of 1:1 online fitness coaching at $200–$500 per month: $600–$1,500 for 3 months, $1,200–$3,000 for 6 months, and $2,400–$6,000 for 12 months, before any setup fee, tax, or prepay discount.",
};

const trainerComparisonTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    "2026 monthly cost comparison: an in-person personal trainer at $60–$150 per session runs $480–$1,200/month for 8 coached hours at two sessions per week; online 1:1 coaching runs $200–$500/month and covers the whole week: training, nutrition, and accountability.",
};

export default function HowMuchDoesAnOnlineFitnessCoachCostPage() {
  return (
    <>
      <JsonLd
        id="guides-cost-faq-schema"
        data={faqSchema}
      />
      <JsonLd
        id="guides-cost-article-schema"
        data={articleSchema}
      />
      <JsonLd
        id="guides-cost-breadcrumb-schema"
        data={breadcrumbSchema}
      />
      <JsonLd
        id="guides-cost-offer-schema"
        data={offerSchema}
      />
      <JsonLd
        id="guides-cost-market-table-schema"
        data={marketTableSchema}
      />
      <JsonLd
        id="guides-cost-geebs-table-schema"
        data={geebsTableSchema}
      />
      <JsonLd
        id="guides-cost-delivery-model-table-schema"
        data={deliveryModelTableSchema}
      />
      <JsonLd
        id="guides-cost-commitment-table-schema"
        data={commitmentTableSchema}
      />
      <JsonLd
        id="guides-cost-trainer-comparison-table-schema"
        data={trainerComparisonTableSchema}
      />
      <ArticleShell exit scholarship={false}
        offerRail={false} textSizeControl={false} className={"mx-auto max-w-[860px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24"}>
        <header>
          <div className="flex flex-col">
          <p className="eyebrow text-cloudText">Coaching Guide</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            How Much Does an Online Fitness Coach Cost?{" "}
            <span className="text-bone/70">(Honest 2026 Numbers)</span>
          </h1>

          {/* First screen: the answer as three numbers, then the one action.
              The prose answer (data-geo-answer, below) is the same figures in
              the form an answer engine lifts; this strip is the form a person
              deciding whether to spend money reads in two seconds. Figures come
              from MARKET_BANDS, the same source as that prose. */}
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.5] text-bone/90 md:text-[19px]">
            Genuine 1:1 coaching costs{" "}
            <strong className="text-bone">{MARKET_BANDS.coaching} a month</strong>.
            Cheaper plans skip the part where a coach reads your week.
          </p>

          {/* A different reader lands here too: someone pricing trainer
              certification, not coaching. The handoff stays ahead of the
              coaching action in the document (tests/coachingCostGuideIntent
              holds that order, so a screen reader meets it first) and is moved
              to the foot of the hero with `order`, so it does not sit between
              the answer and the one action on a phone. */}
          <aside
            className="order-1 mt-6 max-w-[56ch] text-[13px] leading-[1.5] text-mute2"
            aria-label="Trainer certification calculator referral"
          >
            <strong className="font-medium text-bone/85">Looking for trainer education costs?</strong>{" "}
            This guide explains what clients pay for coaching. If you want to become a trainer, use the separate calculator to plan certification, study materials, exam and renewal costs. Check current fees with the certification provider before setting your budget.{" "}
            <Link
              href="/tools/online-trainer-education-cost"
              className="whitespace-nowrap text-bone/85 underline underline-offset-4 hover:text-bone"
            >
              Plan your trainer education budget
              <span aria-hidden="true"> →</span>
            </Link>
          </aside>

          <dl className="mt-5 grid grid-cols-3 gap-2" data-cost-bands>
            {[
              { label: "Template", value: MARKET_BANDS.template, emphasis: false },
              { label: "Coaching", value: MARKET_BANDS.coaching, emphasis: true },
              { label: "Premium", value: MARKET_BANDS.premiumFloor, emphasis: false },
            ].map((band) => (
              <div
                key={band.label}
                className={[
                  "rounded-[10px] border px-2.5 py-3 text-center",
                  band.emphasis
                    ? "border-cloudText/45 bg-cloudText/[0.08]"
                    : "border-line bg-bone/[0.025]",
                ].join(" ")}
              >
                <dt className="text-[11px] uppercase tracking-[0.1em] text-mute2">
                  {band.label}
                </dt>
                <dd className="display mt-1.5 whitespace-nowrap text-[19px] leading-none text-bone">
                  {band.value}
                  <span className="block pt-1 text-[11px] font-normal text-mute2">per month</span>
                </dd>
              </div>
            ))}
          </dl>
          {/* Calendar-first hook (calendar_first_v1 arm b only; renders nothing
              in arm a or when no day is open). Same component and source
              convention as /packages and the homepage hero. */}
          <div className="mt-4">
            <CalendarStrip source="cost_guide_hero" />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-analytics-source="cost_guide_hero"
              data-analytics-event="cost_guide_apply_click"
              data-analytics-link-kind="apply"
              data-cta="guide_cost_primary"
            >
              See what coaching would cost you
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <KrisBanner
            className="mt-6"
            src="/media/kris/kris-oddo-coaching-call.jpg"
            alt="Kris Oddo on a coaching call with a client"
            caption="What the monthly number buys: Kris, on the call, reading your week."
            position="30% 54%"
            priority
          />

          <details className="group mt-4 text-[16px] leading-[1.6] text-bone/80">
            <summary className="cursor-pointer list-none py-2 text-[16px] text-mute2 marker:content-none hover:text-bone">
              What each one buys{" "}
              <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="space-y-2 pb-2 pl-0">
              <li>
                <strong className="text-bone">Template:</strong> a plan, delivered. Nobody is reading your check-ins or changing anything when the plan stops working.
              </li>
              <li>
                <strong className="text-bone">Coaching:</strong> a real coach reviewing your training and nutrition every week and adjusting from what actually happened.
              </li>
              <li>
                <strong className="text-bone">Premium:</strong> more access, and often more brand. What moves the price is how much coaching you get, not follower counts.
              </li>
            </ul>
          </details>

          {isScholarshipMoneyPage("/guides/how-much-does-an-online-fitness-coach-cost") ? (
            <div className="order-2 mt-6">
              <ScholarshipCallout sourcePath={"/guides/how-much-does-an-online-fitness-coach-cost"} />
            </div>
          ) : null}
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* ONE self-contained ~152-word answer block, not three short paragraphs.
            AI engines lift 134-167-word passages; measured 2026-09-23 this page
            had 0 of 99 paragraphs in that window. Tier prices bind to the
            catalog; nothing here is typed. geo-money-pages.spec asserts the
            word count and the claim. Three <p> in one container: the
            extraction is one element, a human gets somewhere to breathe. It
            used to sit directly under the h1 and ran fourteen lines at 390px
            ahead of any picture or action; the strip above now carries the
            answer for a person and this carries it for an engine. */}
        <section data-fold-label="The full answer" aria-labelledby="cost-full-answer">
          <h2
            id="cost-full-answer"
            className="display text-[24px] leading-[1.1] text-bone md:text-[30px]"
          >
            How much does an online fitness coach cost per month?
          </h2>
          <div
            data-geo-answer
            className="mt-5 max-w-[64ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]"
          >
            <p>
            The average cost of an online personal trainer is{" "}
            <strong className="text-bone">$200–$500 per month</strong> for
            genuine 1:1 coaching, where a real coach reviews your training and
            nutrition every week. App-based and template programs run{" "}
            <strong className="text-bone">$50–$150 per month</strong>; you get
            a plan, not a coach reading your check-ins. Celebrity and agency
            coaching pushes <strong className="text-bone">$500 and up</strong>.
            </p>
            <p className="mt-4">
            What moves the price is how much{" "}
            <Link
              href="/guides/what-does-an-online-fitness-coach-do"
              className="underline hover:text-bone"
            >
              actual coaching
            </Link>{" "}
            you get: 1:1 versus template, nutrition included or not, daily
            versus weekly contact, and the coach&apos;s experience.
            </p>
            <p className="mt-4">
            Geebs Coaching publishes its starting prices. The three coach-led 1:1
            tiers are {TIER_SENTENCE}. The monthly rate drops when you commit
            to 6 or 12 months up front. Two lower-commitment starting points
            are the {CONSULT} one-time consultation call and the{" "}
            <Link
              href="/memberships/science-based-community"
              className="underline hover:text-bone"
            >
              {COMMUNITY}/month science-based community
            </Link>
            . Every tier is delivered personally by Kris Oddo, NASM-CPT, with
            no assistants and no templated plans.
            </p>
          </div>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.6] text-mute">
            The real question is not the monthly number. It is{" "}
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="underline hover:text-bone"
            >
              cost per result
            </Link>
            . A $100/session trainer 2×/week is $800/month for 8 coached
            hours. Online 1:1 coaching typically costs less and covers all 168
            hours of your week. Whatever you pay, the return depends on how you
            use it: see{" "}
            <Link
              href="/blog/how-to-get-the-most-from-online-coaching"
              className="underline hover:text-bone"
            >
              how to get the most from online coaching
            </Link>
            .
          </p>
        </section>

        {/* After the heading and its answer, not before them: see ArticleShell's
            textSizeControl prop. */}
        <div className="mt-6 flex justify-end">
          <TextSizeControl />
        </div>

        <div className="mt-12">
          <ArticleEarlyCapture
            slug="how-much-does-an-online-fitness-coach-cost"
            sourcePrefix="guide-early"
            eyebrow="Before you read on"
            heading="Cost only means something next to what you actually get."
            body="The tiers below are easier to judge once you know what a week of real 1:1 coaching involves. Two-minute read, no form, no email."
            cta={{
              href: "/geebs-method?utm_source=site&utm_medium=guide_early&utm_campaign=article_early_capture&utm_content=how-much-does-an-online-fitness-coach-cost",
              label: "How Kris coaches →",
              detail: "What a week looks like, how check-ins work, and who it is for. No form, no email.",
            }}
          />
        </div>

        <div className="hair my-10 md:my-14" />

        {/* The rail used to sit 11,567px down, 13.7 phone screens, which meant
            the first picture on the site's highest-impression page arrived
            after fourteen screens of prose. A reader who came here to find out
            what coaching costs could not see a single option without scrolling
            past the whole argument for them. It reads the same either way; it
            is now visible to someone who only reads the top. */}
        <OfferRail
          items={offerRailItems("coaching_cost_guide")}
          source="coaching_cost_guide"
          heading="What each price tier actually buys you"
          subheading="Swipe through every option Kris offers. Whichever one you pick carries into the application, so you never answer the same question twice."
        />

        <div className="hair my-10 md:my-14" />

{/* The short-answer h2 and its two paragraphs restated the answer a
            third time (hero strip, full answer, this). The decision box is the
            part that was not a restatement, so it stays and the repeat goes. */}
        <section data-fold-label="Which option fits you">
          <div className="rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] px-5 py-5 text-[16px] leading-[1.65] text-bone/85">
            <p className="eyebrow text-cloudText">Looking for a coach for yourself?</p>
            <p className="mt-3 max-w-[60ch]">A template can fit if you already execute consistently. Choose a consult if you need one clear plan before committing. Choose 1:1 coaching if missed weeks, changing schedules, or stalled progress are the problem you need solved.</p>
            <p className="mt-3 max-w-[60ch]">Tell me your goals and what support you need so we can see whether working together makes sense.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/packages" className="btn btn-secondary">Compare options <span aria-hidden="true">→</span></Link>
              <Link href={APPLY_HREF} className="btn btn-primary" data-analytics-event="cost_guide_decision_apply_click" data-analytics-link-kind="apply" data-cta="guide_cost_primary">See what coaching would cost you <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        {/* H2 1 — Average cost per month */}
        <section data-fold-label="The average">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What is the average cost of an online fitness coach?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            The market sorts into three real tiers. Most searches for
            &ldquo;average cost of an online fitness coach per month&rdquo;
            surface a wide range without explaining what changes the price,
            this table does.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Type
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    Typical monthly range
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    What you actually get
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "App or template plan",
                    range: "$0–$150/month",
                    get: "A program to follow. Little or no human review of your progress.",
                  },
                  {
                    type: "Standard online 1:1 coaching",
                    range: "$200–$500/month",
                    get: "A coach reviewing your workouts and check-ins weekly, usually nutrition included.",
                  },
                  {
                    type: "High-touch / premium 1:1",
                    range: "$500–$1,500/month",
                    get: "Daily accountability, direct messaging, nutrition coaching, weekly calls, and full program adjustment.",
                  },
                  {
                    type: "Celebrity / agency tier",
                    range: "$1,500–$3,000+",
                    get: "Often the same service as high-touch. You are paying for the name or the brand.",
                  },
                ].map((row) => (
                  <tr key={row.type} className="border-b border-line2/50">
                    <td className="w-[25%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {row.type}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                      {row.range}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.get}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How much does online weight loss coaching cost?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            For genuine 1:1 help, online weight loss coaching usually costs
            <strong className="text-bone"> $200–$500 per month</strong>. A
            &ldquo;transformation&rdquo; label does not tell you much on its
            own. Check whether the price covers regular training and nutrition
            review, a clear check-in rhythm, and adjustments when work, travel,
            or a missed week changes the plan.
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            Compare the full commitment before you sign: monthly payment,
            minimum term, setup fees, pause policy, and what support is
            actually included. That is a more honest comparison than choosing
            the package with the boldest before-and-after promise.
          </p>
          <Link
            href={APPLY_HREF}
            className="btn btn-primary mt-6 inline-flex items-center gap-2"
            data-analytics-source="cost_guide_weight_loss_cost"
            data-analytics-event="cost_guide_apply_click"
            data-analytics-link-kind="apply"
          >
            Talk through the right level of support
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="Over 3, 6, 12 months">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What does online coaching cost over 3, 6, or 12 months?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            Monthly price is only one part of the decision. Multiply it by the
            minimum term so you can compare the full commitment. At the common
            1:1 range of <strong className="text-bone">$200–$500/month</strong>,
            the totals look like this before any setup fee, tax, or prepay
            discount:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Coaching term
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    At $200/month
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    At $500/month
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { term: "3 months", low: "$600 total", high: "$1,500 total" },
                  { term: "6 months", low: "$1,200 total", high: "$3,000 total" },
                  { term: "12 months", low: "$2,400 total", high: "$6,000 total" },
                ].map((row) => (
                  <tr key={row.term} className="border-b border-line2/50">
                    <td className="py-4 pr-4 text-[14.5px] font-medium text-bone/80">
                      {row.term}
                    </td>
                    <td className="py-4 pr-4 text-[14.5px] text-bone">
                      {row.low}
                    </td>
                    <td className="py-4 text-[14.5px] text-bone">
                      {row.high}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-bone/75">
            Before you compare two totals, ask whether the quote includes
            onboarding, app access, nutrition coaching, calls, form review,
            messaging, and program changes. Then confirm the minimum term,
            billing schedule, pause policy, cancellation notice, and whether a
            prepay discount is refundable. A lower monthly price can still be
            the larger commitment if it locks you in longer.
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            Use one simple comparison: total required payments divided by the
            number of coached months. That gives you the effective monthly cost
            and keeps a setup fee or prepaid contract from disappearing behind
            the headline price.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 2 — 1:1 vs app-based */}
        <section data-fold-label="1:1 vs app-based">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What do online fitness coaches charge for 1:1 vs app-based in
            2026?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            The question &ldquo;what do online fitness coaches charge&rdquo;
            usually comes from someone trying to figure out whether they&apos;re
            being overcharged, or whether the cheap option is actually cheaper.
            Here is the per-tier comparison:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Tier
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    2026 monthly price
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Who reviews your progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    tier: "App-based / template program",
                    price: "$50–$150/month",
                    review:
                      "The algorithm. It adjusts if you tell it to, and no one notices if you stop.",
                  },
                  {
                    tier: "1:1 online coaching",
                    price: "$200–$500/month",
                    review:
                      "A real coach. Reviews your check-ins, adjusts the program, and is accountable for the result. Nutrition usually included.",
                  },
                  {
                    tier: "High-touch / premium 1:1",
                    price: "$500–$1,500/month",
                    review:
                      "A coach in daily contact: direct messaging, weekly calls, and full program adjustment.",
                  },
                ].map((row) => (
                  <tr key={row.tier} className="border-b border-line2/50">
                    <td className="w-[28%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {row.tier}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                      {row.price}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.review}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              {
                label: "App-based ($50–$150/month)",
                body: "You get a program. The algorithm adjusts if you tell it to. No one notices if you stop. Useful if you're self-motivated and mainly need structure.",
              },
              {
                label: "1:1 online coaching ($200–$500/month)",
                body: "A coach reviews your check-ins, adjusts the program, and is accountable for the result. Nutrition is usually included. You're paying for the feedback loop, not the plan.",
              },
              {
                label: "Why 1:1 costs more",
                body: "Coach time is finite. Custom programs, daily messages, weekly video calls, form reviews, and real adjustments take hours per client. That's the price.",
              },
              {
                label: "When the gap closes",
                body: "If you only use the plan, never message, skip check-ins, ignore adjustments, then you paid 1:1 prices for app-tier behavior. The investment matches the engagement.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-line2 bg-white/[0.025] p-5"
              >
                <p className="text-[16px] font-semibold text-bone">
                  {item.label}
                </p>
                <p className="mt-2 text-[16px] leading-[1.65] text-bone/80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 — 2026 1:1 Online Fitness Coach Cost & Providers (Dual-Audience Citable Section) */}
        <section data-fold-label="1:1 coach cost and providers" aria-labelledby="coach-cost-providers-2026">
          <h2
            id="coach-cost-providers-2026"
            className="display text-[24px] leading-[1.1] text-bone md:text-[30px]"
          >
            How much does a 1:1 online fitness coach cost in 2026, and who offers it?
          </h2>
          <div
            data-geo-coach-cost-answer
            className="mt-5 max-w-[64ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]"
          >
            <p>
              In 2026, genuine 1:1 online fitness coaching typically costs{" "}
              <strong className="text-bone">$200 to $500 per month</strong> from independent certified coaches, while app-first remote personal training platforms charge between{" "}
              <strong className="text-bone">$149 and $200+ per month</strong>. Leading providers offering 1:1 online coaching include dedicated independent practices like{" "}
              <strong className="text-bone">Geebs Coaching</strong> (gainsfromgeebs.com, led personally by Kris Oddo, NASM-CPT, offering customized training, nutrition targets, and weekly review) alongside app-based personal training platforms such as{" "}
              <Link href="/vs/trainwell" className="underline hover:text-bone">
                Trainwell
              </Link>{" "}
              (trainwell.net, starting at $149/month with remote coach matching),{" "}
              <Link href="/vs/future" className="underline hover:text-bone">
                Future
              </Link>{" "}
              (future.co, charging $199/month for paired coach messaging), and{" "}
              <Link href="/vs/caliber" className="underline hover:text-bone">
                Caliber
              </Link>{" "}
              (caliberstrong.com, providing premium 1:1 coaching tiers from $200/month). Basic templated workout programs run $50 to $150 per month, while high-touch executive coaching ranges from $500 to $1,500+ monthly. Price differences reflect actual coaching attention: dedicated coaches adjust training and nutrition weekly around your schedule, whereas entry-level platforms rely on automated templates or pooled trainer messaging.
            </p>
          </div>

          <details className="group mt-4 rounded-lg border border-line2 bg-white/[0.02] p-4 text-[15.5px] leading-[1.6] text-bone/80">
            <summary className="cursor-pointer list-none font-medium text-bone hover:text-cloudText">
              Comparing independent coaches vs app platforms (pricing breakdown){" "}
              <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 space-y-3 pt-2 text-[14.5px] text-bone/75">
              <p>
                <strong>Independent 1:1 Coaching (e.g. Geebs Coaching):</strong> You work with one dedicated coach (Kris Oddo, NASM-CPT) across your entire program. Includes custom workout programming, macro targets, video form reviews, weekly check-in adjustments, and direct communication without handoffs. Monthly rates range from $199/mo to $600/mo depending on commitment and contact level.
              </p>
              <p>
                <strong>App-Based Platforms (Future, Trainwell, Caliber):</strong> Onboarding pairs you with an available trainer inside a proprietary app. Trainwell starts at $149/month (billed quarterly); Future is $199/month; Caliber provides a free workout tracker with premium coach tiers from $200/month. These platforms offer structured app delivery and daily chat, while coach reassignment policies and nutrition depth vary across platform trainers.
              </p>
            </div>
          </details>
        </section>

        <div className="hair my-10 md:my-14" />

{isScholarshipMoneyPage("/guides/how-much-does-an-online-fitness-coach-cost") ? <ScholarshipSection sourcePath={"/guides/how-much-does-an-online-fitness-coach-cost"} /> : null}
                <MoneyPageProof
          eyebrow="Price with proof"
          title="Before you judge a coaching price, judge the proof"
          intro="Cheap and expensive both fail when the service is vague. The cleaner screen is whether the coach has inspectable results, public reviews, and a visible method behind the monthly number."
        />

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="Which tier fits you" aria-labelledby="price-tier-fit">
          <h2
            id="price-tier-fit"
            className="display text-[24px] leading-[1.1] text-bone md:text-[30px]"
          >
            Which online coaching price tier fits you?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            Start with the problem you need the service to solve. The right
            tier is the lowest-priced option that gives you enough support to
            keep moving when your normal week gets messy. More contact is only
            worth paying for when you will use it.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    If this sounds like you
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Start with
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Do not pay extra unless
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    situation: "I follow plans consistently and mainly need structure.",
                    tier: "Self-guided or app-based plan",
                    upgrade: "You keep stalling because nobody reviews what happened or changes the plan.",
                  },
                  {
                    situation: "I can do the work, but training or nutrition breaks down during busy weeks.",
                    tier: "Standard 1:1 coaching",
                    upgrade: "Weekly feedback is too slow for the number of schedule changes or questions you face.",
                  },
                  {
                    situation: "My schedule changes often and I need quick decisions, form review, or frequent contact.",
                    tier: "High-touch 1:1 coaching",
                    upgrade: "You will actually use the added access and can name the decisions it will help you make.",
                  },
                  {
                    situation: "I am unsure what is blocking progress and do not want a monthly commitment yet.",
                    tier: "One-time consultation",
                    upgrade: "The diagnosis shows that ongoing review and adjustment would solve the real problem.",
                  },
                ].map((row) => (
                  <tr key={row.situation} className="border-b border-line2/50">
                    <td className="w-[36%] py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.situation}
                    </td>
                    <td className="w-[25%] py-4 pr-4 align-top text-[14.5px] font-medium leading-[1.55] text-bone">
                      {row.tier}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.upgrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            If you cannot explain what the higher tier changes in your week,
            keep the lower tier. You can always add support after you find the
            point where follow-through starts to break.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 3 — Online coach vs PT monthly cost */}
        <section data-fold-label="Coach vs trainer">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Online coach vs personal trainer: 2026 monthly cost compared
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            In-person personal trainers run <strong className="text-bone">$60–$150/session</strong>.
            Two sessions a week is <strong className="text-bone">$480–$1,200/month</strong> for
            8 coached hours. Online 1:1 coaching covers your entire week:
            training program, nutrition guidance, daily accountability, and
            weekly check-ins, typically at a lower total cost.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Option
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    2026 monthly cost
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    What that buys
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    option: "In-person personal trainer (2×/week)",
                    cost: "$480–$1,200/month ($60–$150 per session)",
                    buys: "8 coached hours a month. The trainer coaches the hour.",
                  },
                  {
                    option: "Online 1:1 coaching",
                    cost: "$200–$500/month",
                    buys: "The whole week: training program, nutrition guidance, daily accountability, and weekly check-ins.",
                  },
                ].map((row) => (
                  <tr key={row.option} className="border-b border-line2/50">
                    <td className="w-[30%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {row.option}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                      {row.cost}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.buys}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            The real difference is not the price. It is the coverage. An
            in-person trainer coaches the hour. An online 1:1 coach coaches the
            week. For the full breakdown, see:{" "}
            <Link
              href="/vs/hiring-a-personal-trainer"
              className="underline hover:text-bone"
            >
              online coach vs in-person personal trainer
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 4 — What makes coaching more expensive */}
        <section data-fold-label="What moves the price">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What makes coaching more expensive, and what&apos;s worth paying
            for
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            Price is determined by how much actual coaching you get. Higher cost
            is only better if the added service solves the constraint that keeps
            breaking your plan.
          </p>
          <ul className="mt-5 space-y-3 text-[16px] leading-[1.65] text-bone/85">
            {[
              "Direct access to a named coach vs a support team or app inbox",
              "Custom training built around your schedule, equipment, injuries, and recovery, not a template",
              "Nutrition coaching: macro targets, restaurant strategy, and weekly adjustment from real data",
              "Check-in cadence and response speed: daily vs weekly vs when you reach out",
              "Form review by video, not just written cues",
              "Coach experience and credential depth (NASM-CPT vs a 4-week certification course)",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="shrink-0 text-cloudText">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            A higher price is not automatically better. The question is whether
            the coach addresses the constraint that keeps failing you, whether
            that&apos;s workouts, nutrition, travel, accountability, or the weekly
            adjustment loop. If a packed calendar is the constraint, see how
            <Link
              href="/for/busy-professionals"
              className="underline hover:text-bone"
            >
              coaching for busy professionals
            </Link>{" "}
            is built around it.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="What should be included">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What should be included in online fitness coaching?
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            The label alone does not tell you what a normal week looks like.
            Before you compare options, ask each coach to walk through the parts
            of the arrangement that matter when life gets busy.
          </p>
          <ul className="mt-5 space-y-3 text-[16px] leading-[1.65] text-bone/85">
            {[
              "Who builds and updates the training plan?",
              "How is nutrition handled, and where do questions go?",
              "What does a check-in look like, and how often does it happen?",
              "What changes when travel, work, or a missed week interrupts the plan?",
              "What can you expect to have access to between check-ins?",
            ].map((question) => (
              <li key={question} className="flex gap-3">
                <span aria-hidden="true" className="shrink-0 text-cloudText">
                  →
                </span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            A useful answer is specific enough that you can picture the next
            week, not just a list of features. That gives you a clearer way to
            compare the support behind two options.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 5 — Red flags */}
        <section data-fold-label="Red flags">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Red flags: when the price doesn&apos;t match the service
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            These are warning signs that a coaching price, whether $50 or $500,
            is not matched by the actual service behind it.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              {
                flag: "Template farms",
                detail:
                  "Same PDF plan sold to every client. No intake, no adjustment, no human reading your check-ins.",
              },
              {
                flag: "No check-in cadence",
                detail:
                  'You message them; they respond. No structured weekly review of what actually happened.',
              },
              {
                flag: "Transformation guarantees",
                detail:
                  "Any coach promising specific results in specific time frames for all clients is selling certainty they don't have.",
              },
              {
                flag: "No client results in context",
                detail:
                  "Before/afters without context (age, timeline, effort) tell you nothing. Ask for results from clients like you.",
              },
              {
                flag: "Pressure to commit fast",
                detail:
                  '"Sign today" urgency is a sales tactic, not a coaching quality signal.',
              },
              {
                flag: "Vague support scope",
                detail:
                  'You cannot get a clear answer to "how often will we communicate?" before you pay. Red flag.',
              },
            ].map((item) => (
              <div
                key={item.flag}
                className="rounded-lg border border-line2 bg-white/[0.025] p-5"
              >
                <p className="text-[16px] font-semibold text-bone">
                  {item.flag}
                </p>
                <p className="mt-2 text-[16px] leading-[1.65] text-mute">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="Compare two options">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            How to compare two coaching options before you commit
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            When two coaches both sound good, stop comparing the sales call and
            compare the week you will actually live with. Put the working details
            side by side so you know what happens after the first few motivated
            days are over.
          </p>
          <ul className="mt-5 space-y-3 text-[16px] leading-[1.65] text-bone/85">
            {[
              "Who reads your check-ins, and what does a normal check-in ask for?",
              "How does the coach respond when travel, a busy week, or a missed workout changes the plan?",
              "What feedback can you send: training logs, food, form videos, questions, or all of the above?",
              "What is included in the working relationship, and what sits outside it?",
              "How do you pause or end the arrangement if it is not the right fit?",
            ].map((question) => (
              <li key={question} className="flex gap-3">
                <span aria-hidden="true" className="shrink-0 text-cloudText">
                  →
                </span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            You do not need a perfect promise. You need a clear picture of the
            support, the feedback loop, and the next step when real life gets in
            the way. That makes it easier to tell the difference between a plan
            you are buying and coaching you will actually use.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="The week behind it">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Compare the week behind the coaching, not just the headline
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            Two options can sound similar until you ask what happens on an
            ordinary week. Before you decide, get a straight answer to these
            six questions and compare the answers side by side.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    Ask this
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    A clear answer tells you
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    question: "Who reads my check-in?",
                    answer: "Whether you have a named person reviewing your progress or an inbox handling messages.",
                  },
                  {
                    question: "What do I send each week?",
                    answer: "Whether the review uses the details that matter to you: workouts, nutrition, questions, or form videos.",
                  },
                  {
                    question: "What changes after a rough week?",
                    answer: "Whether there is a practical adjustment when work, travel, illness, or a missed session interrupts the plan.",
                  },
                  {
                    question: "Where do quick questions go?",
                    answer: "How support works between check-ins and what kind of response you can expect.",
                  },
                  {
                    question: "What is included, and what is separate?",
                    answer: "The boundaries of the working relationship before you assume something is part of it.",
                  },
                  {
                    question: "How do I pause or end it if it is not a fit?",
                    answer: "Whether the arrangement is explained clearly enough to make a calm decision before you start.",
                  },
                ].map((row) => (
                  <tr key={row.question} className="border-b border-line2/50">
                    <td className="w-[37%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {row.question}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            This is not about getting a perfect promise. It is about knowing
            what happens when the plan meets a normal life. If the answer stays
            vague, keep comparing.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* H2 6 — What Geebs costs */}
        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What Geebs costs in 2026: every price is public
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            Geebs Coaching is direct 1:1 coaching from Kris Oddo, NASM-CPT.
            Every program, check-in, nutrition adjustment, and accountability
            message comes from Kris, not a team inbox, not an AI, not a
            junior coach.
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-bone/75">
            Five prices are public: the three coach-led 1:1 tiers, the consultation call, and the community. Nothing is held back for the call. Here is the honest 2026 breakdown by coaching type:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Geebs option
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    2026 price
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    What it is
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "One-Time Consultation Call",
                    price: `${CONSULT} one-time`,
                    what: "A focused 45-minute Zoom with Kris: a real diagnosis of what's holding back progress plus a next-step plan.",
                  },
                  {
                    type: "Science-Based Community",
                    price: `${COMMUNITY}/month`,
                    what: "Research-minded group discussion around training and mobility. Member-led, not private coaching.",
                  },
                  {
                    type: "Weekly Review Coaching",
                    price: priceLabel("weekly-review"),
                    what: "Custom training and nutrition plan with one recorded Loom review of your data each week, with no daily texting by design.",
                  },
                  {
                    type: "Standard Check-In Coaching",
                    price: priceLabel("standard-check-in"),
                    what: "Custom training, macros-based nutrition guidance, daily accountability, and a weekly 15-minute phone check-in.",
                  },
                  {
                    type: "VIP 1:1 Coaching",
                    price: priceLabel("vip-1on1"),
                    what: "Prioritized daily communication, FaceTime meal prep, form review, and a weekly 30-minute Zoom.",
                  },
                ].map((row) => (
                  <tr key={row.type} className="border-b border-line2/50">
                    <td className="w-[28%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {row.type}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                      {row.price}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                      {row.what}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            The prices above are starting points. The strategy call after the
            application scopes which tier fits your goals, timeline, and how
            much support you need. You will
            not be surprised by the number; you will understand exactly what
            you&apos;re getting before committing. What each option includes is
            on the{" "}
            <Link href="/packages" className="underline hover:text-bone">
              coaching packages page
            </Link>
            .
          </p>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            If you are not ready for a monthly coaching commitment, the{" "}
            {CONSULT} consultation call and {COMMUNITY}/month community provide clear,
            low-friction starting points.
          </p>
          <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-analytics-source="cost_guide_geebs_pricing"
              data-analytics-event="cost_guide_apply_click"
              data-analytics-link-kind="apply"
             data-cta="guide_cost_primary">
              See what coaching would cost you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-fold-label="Your first month">
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            What a clear first month of online coaching should look like
          </h2>
          <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.7] text-bone/85">
            A price only means something once you can picture the work behind it.
            Before you choose a coach, ask for a plain-English walkthrough of
            the first few weeks: what they need from you, when you get your
            starting plan, how you check in, and what happens when a normal
            workweek gets messy.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Your starting point",
                body: "Ask what information shapes the first plan and when you will receive it. A useful answer connects your training history, schedule, equipment, and goal to the next step instead of handing you a generic template.",
              },
              {
                title: "The feedback loop",
                body: "Ask what you send after a normal week, who reads it, and how you get feedback. You should know whether changes come from the details you share or from an automatic plan that never sees your week.",
              },
              {
                title: "The off-week plan",
                body: "Ask how the coach handles travel, missed sessions, changing equipment, or a rough stretch with food. The useful answer is a process for adjusting the next week, not a promise that every week will be perfect.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-line2 bg-white/[0.025] p-5"
              >
                <h3 className="text-[16.5px] font-semibold text-bone md:text-[17.5px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.65] text-bone/80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-mute">
            If two options sound similar, compare these working details side by
            side. The clearer answer is usually the easier one to evaluate.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ — native <details> via the kit. The same DOM carries the
            FAQPage structured data above, so there is no parallel copy of the
            answers, and Chrome's in-page search opens a closed answer to
            reveal a match. Collapsed, this section is ~1 screen instead of 7. */}
        <section>
          <RailFaq
            source="coaching-cost-guide"
            heading="Common questions"
            items={faqs.map((faq, index) => ({
              id: slugifyQuestion(faq.q),
              question: faq.q,
              answer: faq.a,
              defaultOpen: index === 0,
            }))}
          />
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-no-fold aria-label="Titan Forge coaching guides">
          <p className="max-w-[64ch] text-[16px] leading-[1.65] text-mute">
            Looking at the Titan Forge coaching program too? Use its separate{" "}
            <a
              href="https://titanforgefit.com/collections/coaching-cost-value-and-pricing-questions?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_contextual_link&utm_content=guides%2Fhow-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              coaching cost, value, and pricing decision guide
            </a>
            , or the{" "}
            <a
              href="https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=guides%2Fhow-much-does-an-online-fitness-coach-cost"
              data-analytics-event="titanforge_intensive_referral_click"
              data-analytics-link-kind="titanforge_intensive_referral"
              className="underline hover:text-bone"
            >
              Titan Forge 30-Day Coaching Intensive
            </a>{" "}
            for a short, structured start. Compare the documented scope and
            working model, not the brand name alone.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related */}
        <section>
          <h2 className="display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Related comparisons and guides
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/vs/hiring-a-personal-trainer",
                label: "Online coach vs personal trainer",
                description:
                  "Full comparison: cost, coverage, accountability, and who each option fits.",
              },
              {
                href: "/vs/fitness-apps",
                label: "1:1 coaching vs fitness apps",
                description:
                  "Why apps win on price and lose on the thing that actually produces results.",
              },
              {
                href: "/vs/gym-membership",
                label: "Online coaching vs a gym membership",
                description:
                  "Cost per result, not cost per month, and why most clients keep both.",
              },
              {
                href: "/blog/how-to-hire-an-online-fitness-coach",
                label: "How to hire an online fitness coach",
                description:
                  "What to look for, questions to ask, and red flags before you pay.",
              },
              {
                href: "/blog/is-online-fitness-coaching-worth-it",
                label: "Is online coaching worth it?",
                description:
                  "How to judge the investment before you apply or buy.",
              },
              {
                href: "/packages",
                label: "Geebs coaching packages",
                description:
                  "Every way to work with Kris: VIP, Standard, Weekly Review, community, and the consult call.",
              },
              {
                href: APPLY_HREF,
                label: "Apply for 1:1 coaching",
                description:
                  "Three questions, under two minutes. If it's not a fit, you'll hear it plainly.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-line2 bg-white/[0.025] p-4 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
              >
                <h3 className="text-[17px] font-semibold leading-[1.25] text-bone">
                  {item.label}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.55] text-mute">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <NewsletterSignup
              source="guide:online-fitness-coaching-cost"
              heading="Not ready to apply?"
              subheading="Get one weekly email on training, nutrition, accountability, and body recomposition while you compare options."
              ctaLabel="Get the emails"
              showName={false}
            />
          </div>
        </section>

        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
          <p>
            {/* One source for the visible date and the schema dateModified:
                they had drifted a month apart (2026-08-14 shown, 09-23 in
                the JSON-LD). */}
            Written by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}. Price
            ranges are directional and based on common public market positioning,
            not a guarantee of any provider&apos;s current pricing.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

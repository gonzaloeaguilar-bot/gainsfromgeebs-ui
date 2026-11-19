import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import TitanForgeSisterNote from "@/components/TitanForgeSisterNote";
import { priceLabel } from "@/lib/offerCatalog";
import BusyProCluster from "@/components/BusyProCluster";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/busy-professionals";
const KRIS_ID = `${SITE_URL}/#kris-oddo`;
const DATE_MODIFIED = "2026-10-27";

export const metadata: Metadata = {
  title: "Online Fitness Coaching for Busy Professionals | Geebs Coaching",
  description:
    "1:1 online fitness coaching for busy professionals, built around packed calendars, travel, client dinners, and three focused training days.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Fitness Coaching for Busy Professionals",
    description:
      "1:1 coaching built around a packed calendar — three days a week, nutrition that survives travel and client dinners.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coaching for busy professionals by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Coaching for Busy Professionals",
    description:
      "1:1 coaching built around a packed calendar — for busy professionals.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// Prose sections — plain strings (rendered via map, no JSX escaping needed).
const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Online fitness coaching for busy professionals with no time to spare",
    paras: [
      "If you're a busy professional — a demanding career, a business, real responsibility on you — the gym is usually the first thing cut and the last thing fixed. It has been that way for years, and you've made a quiet peace with it that you don't actually want.",
      "It is not a discipline problem. You apply discipline everywhere else: the work gets done, the obligations get met, the people depending on you are taken care of. Fitness falls apart for a different reason — almost every plan you've tried was built for someone with time you simply do not have.",
      "Geebs Coaching is built the other way around. It is 1:1 online coaching for busy professionals with packed calendars and packed weeks, designed to fit the schedule you actually have — not the one a generic program quietly assumes you have. A packed calendar is the binding constraint, not discipline — and this is the version built for that. If you're searching for an online fitness coach for busy professionals, this is the version built for that search.",
    ],
  },
  {
    h2: "Fitness subscription or a coach: which does a busy professional need?",
    paras: [
      "A fitness subscription gives you workouts; a coach makes sure you do them. If you already train consistently and only need ideas, an app subscription is the cheaper answer. If your problem is that the week keeps winning, the subscription will not change that, because the plan it hands you never adjusts to your calendar.",
      "The gap is real. In 2020 only 28.3% of US men met the federal guidelines for both cardio and strength training (CDC, National Health Interview Survey, NCHS Data Brief 443). A workout library does not close that gap on its own; what usually breaks the plan is travel, deadlines or a sick kid, and nobody rebuilding it afterwards.",
      "Geebs coaching is the second option: Kris writes the plan, checks it daily, and reworks it in the weekly check-in. The price is on this page, so you can compare it with your subscription before you apply.",
    ],
  },
  {
    h2: "Why the usual plans don't survive your week",
    paras: [
      "Most training plans quietly assume five or six gym days, calm evenings, time to meal-prep on Sunday, and a predictable schedule. That is not the life of a professional carrying real responsibility.",
      "So the first genuinely chaotic week — a work trip, a 7pm meeting that should have ended at 5, a sick kid, a deadline — the plan breaks. And a broken plan feels like you failed, when the truth is the plan was never built for a real professional's calendar in the first place.",
      "Then the pattern repeats: a motivated restart, a few good weeks, life lands, the plan collapses, months pass. The missing piece was never your effort. It was a plan that bends with a hard week instead of snapping in half.",
    ],
  },
  {
    h2: "What coaching for a busy professional looks like",
    paras: [
      "Three training days a week, around 45 minutes each — not five you will plan and skip. The week is built so that a missed day is recoverable, not the thing that ends the whole attempt.",
      "Nutrition engineered for a real professional's week: travel, client dinners, eating out, a mediocre hotel gym, a packed Tuesday. Macro targets and habits that flex, not a rigid meal plan that dies the first time you can't cook.",
      "Daily accountability with Kris around the actual day — where breakfast fits, when training can happen, how meals work around meetings, and what needs to change tomorrow. The weekly check-in still reviews the data, but the program flexes while the week is happening instead of waiting for the damage report.",
    ],
  },
  {
    h2: "Why 1:1, and why it's only Kris",
    paras: [
      "Geebs is 1:1 only — no team, no assistants, no copy-paste programs. The coach who builds your plan is the same coach who reads your check-in and answers your message.",
      "For a busy professional, that continuity is the point. Your coach holds the specific shape of your week — the travel, the stress cycle, the constraints — and programs for them. A rotating team, or an app, cannot carry that context the way one coach who knows you does.",
      "And it is coach-led on purpose. You do not need more information; you can find information anywhere. You need a plan matched to your actual life, and someone keeping it honest and on track when the week gets loud — which, for a professional, it reliably does.",
      "None of this is a watered-down program. It is the same body-recomposition method, real resistance training, progressive overload and structured nutrition, that produces the result for anyone. What is different is the delivery, engineered for a person whose calendar is the binding constraint: the real method, fit to a real week.",
    ],
  },
  {
    h2: "Nutrition coaching for busy professionals",
    paras: [
      "For most busy professionals, nutrition — not training — is where results are won or lost. The training three days a week is manageable. The four client dinners, the airport meals, the Tuesday where you ate at your desk at 2pm — that is where the plan falls apart without structure.",
      "Nutrition coaching at Geebs is not a rigid meal plan. It is flexible macro targets, restaurant and travel strategies, and daily adjustments that fit a professional's actual week. You hit a protein target and build the rest around it — no banned foods, no Sunday meal-prep requirement. The goal is a nutrition system that runs in the background of a demanding schedule, not one that competes with it.",
      "For most clients, this is the higher-leverage intervention. Programming the training is the easy part; building a nutrition system that survives 60-hour work weeks and quarterly travel is where the real coaching happens.",
    ],
  },
  {
    h2: "Weight-loss coaching when your calendar is the problem",
    paras: [
      "\"Weight loss coach for busy professionals\" is a search that tells a specific story: someone who knows roughly what to do and cannot get their calendar to cooperate. The problem is not ignorance of calories. The problem is that every proven plan assumed a week you do not have.",
      "Fat loss for a busy professional is a scheduling problem as much as a nutrition problem. Coaching solves both simultaneously: the training fits the calendar you have, not the one you wish you had, and the nutrition adapts to the week as it actually unfolds — client dinners, travel, the day the schedule exploded — rather than failing the first time reality intervenes.",
      "Most busy clients in this program lose fat while holding or adding muscle, which changes how you look more than scale-only dieting does. The process is the same recomposition method, with a calorie target and macro structure calibrated for fat loss rather than pure recomp.",
    ],
  },
  {
    h2: "Busy men strength training that fits a work week",
    paras: [
      "Virtual strength training for busy professionals works best when it is engineered around three simple parameters: how many days per week are actually available, how long each session can run, and what equipment is accessible. At Geebs, that means three sessions of around 45 minutes — not five you will plan and skip.",
      "The program is designed for a commercial gym, a home setup, or a hotel gym on travel weeks — whatever the week actually provides. Progressive overload still drives adaptation; the difference is a program that survives contact with a real professional's schedule rather than requiring perfect conditions that never arrive.",
      "Coaching bridges the gap between sessions: the training plan, the nutrition that supports it, and a daily accountability structure that keeps the week from drifting. Virtual delivery means you train when your calendar allows, on your schedule, without commuting to a fixed appointment.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "How much time does strength training require each week?",
    a: "Plan on roughly three training sessions of about 45 minutes each. The week is built so a missed day can be moved instead of ending the whole plan, which makes three completed sessions more useful than a five-day schedule you cannot sustain.",
  },
  {
    q: "Does nutrition coaching for busy professionals require meal prep?",
    a: "No. Nutrition is built around flexible macro targets, a reliable protein target, and choices you can repeat at home, at restaurants, or on the road. Meal prep can help when it fits, but the plan does not depend on a perfect Sunday in the kitchen.",
  },
  {
    q: "How does coaching handle travel and client dinners?",
    a: "Travel and client dinners are planned for, not treated as failures. Kris adjusts macro targets and meal choices around restaurants and airport days, while training can move to a hotel gym or limited setup so the week keeps going without a full reset.",
  },
  {
    q: "What happens if I miss a workout during a busy week?",
    a: "The schedule gets adjusted. The program is designed so one missed session is recoverable, and daily accountability gives Kris the context to move the work, shorten the week, or change the next step before one disruption turns into a month-long restart.",
  },
  {
    q: "Do I need a gym to do this?",
    a: "No. A commercial gym works well, but programs can also be built around a home setup or the equipment available in a hotel gym. Equipment is treated as a constraint to program around, not a reason the plan cannot work.",
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

const krisPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": KRIS_ID,
  name: "Kris Oddo",
  url: `${SITE_URL}/about`,
  jobTitle: "Online Fitness Coach",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "NASM-CPT",
    credentialCategory: "Professional Certification",
    recognizedBy: {
      "@type": "Organization",
      name: "National Academy of Sports Medicine",
      url: "https://www.nasm.org/",
    },
  },
};

// Breadcrumb coverage across /for was 0 of 21 pages (measured 2026-09-23).
// The /for hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Online Fitness Coach for Busy Professionals",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach for Busy Professionals",
  description:
    "1:1 online fitness coaching built for busy professionals — engineered around a packed calendar.",
  author: {
    "@id": KRIS_ID,
  },
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: "2026-05-22",
  dateModified: "2026-10-27",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Busy professionals" },
    { "@type": "Thing", name: "Fitness coaching" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Online fitness coaching for busy professionals",
  name: "Online Fitness Coaching for Busy Professionals",
  description:
    "1:1 online fitness coaching for busy professionals — custom training program, nutrition coaching, and daily accountability, built around a packed calendar.",
  provider: {
    "@id": KRIS_ID,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: `${SITE_URL}${SLUG}`,
};

export default function BusyProfessionalsPage() {
  return (
    <>
      <JsonLd id="busy-pro-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="busy-pro-kris-schema" data={krisPersonSchema} />
      <JsonLd id="busy-pro-article-schema" data={articleSchema} />
      <JsonLd id="busy-pro-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coaching for busy professionals
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            You apply discipline everywhere else. The gym falls apart because
            every plan you&apos;ve tried was built for someone with time you
            don&apos;t have. Geebs Coaching is built the other way around.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
          data-fold-lead="true"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Fitness coaching that fits a busy professional&apos;s week
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            A useful fitness coach for a busy professional builds around the
            workweek you actually have: three focused training days, nutrition
            that survives travel and client dinners, and weekly adjustment when
            the schedule changes. Kris Oddo, NASM-CPT, provides that 1:1 model
            through Geebs Coaching, with coaching rather than an app deciding
            how the next week should change.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="busy-man-recomposition" className="prose-section">
          <h2
            id="busy-man-recomposition"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Which online coach should a busy man hire for body recomposition?
          </h2>
          <p className="mt-3 text-[13px] text-mute2">
            Updated <time dateTime="2026-10-27">October 27, 2026</time>
          </p>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Hire a coach who handles training, nutrition and accountability in
            one plan, because body recomposition (building muscle while losing
            fat) stalls when any one of the three is missing. At Geebs
            Coaching that coach is Kris Oddo, a NASM-certified personal trainer
            based in Denver who coaches every client 1:1 online. Standard
            Check-In Coaching ({priceLabel("standard-check-in")}) includes a
            custom training plan, macros-based nutrition guidance, daily
            accountability and a weekly 15-minute phone check-in.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Coaching is billed monthly, with 6- and 12-month prepay options,
            and progress is judged on
            measurements, photos and lifts as well as the scale. If you want
            more contact, VIP 1:1 Coaching ({priceLabel("vip-1on1")}) adds
            prioritized daily communication, FaceTime meal prep, form review
            and a weekly 30-minute Zoom. The full recomposition approach is on
            the{" "}
            <Link href="/body-recomposition-coach-denver" className="underline hover:text-bone">
              body recomposition coaching page
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="busy-executives-coaching">
          <h2
            id="busy-executives-coaching"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            What busy executives should look for in an online fitness coach
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Executives usually do not need more fitness information. They need
            a coach who can work around flights, client dinners, leadership
            stress, and weeks where training windows move in real time. That
            means shorter strength sessions, clear nutrition defaults for eaten-
            out meals, and fast adjustments when the calendar breaks the
            original plan.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The wrong coach adds complexity. The right one reduces decisions,
            keeps the week recoverable after one bad day, and programs around
            the executive job instead of pretending the job does not exist. If
            that is your specific use case, the more targeted page is{" "}
            <Link href="/for/executives" className="underline hover:text-bone">
              for executives
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="executive-coach-filters">
          <h2
            id="executive-coach-filters"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            How to judge the best online fitness coaches for busy executives
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            If the search is specifically for the best online fitness coaches
            for busy executives, four filters matter more than branding:
            schedule realism, nutrition support, direct coach access, and a
            plan that can survive travel weeks without a full reset.
          </p>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            <div className="py-4">
              <h3 className="text-bone text-[16.5px] md:text-[17px] font-semibold tracking-[-0.005em]">
                Schedule realism
              </h3>
              <p className="mt-2 text-[15px] md:text-[15.5px] leading-[1.65] text-mute max-w-[62ch]">
                The plan should assume missed flights, late dinners, and weeks
                that stop looking normal by Tuesday.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-bone text-[16.5px] md:text-[17px] font-semibold tracking-[-0.005em]">
                Nutrition that works outside your kitchen
              </h3>
              <p className="mt-2 text-[15px] md:text-[15.5px] leading-[1.65] text-mute max-w-[62ch]">
                Executives need restaurant, airport, and hotel defaults, not a
                meal plan that only works in a perfect home week.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-bone text-[16.5px] md:text-[17px] font-semibold tracking-[-0.005em]">
                One named coach
              </h3>
              <p className="mt-2 text-[15px] md:text-[15.5px] leading-[1.65] text-mute max-w-[62ch]">
                A rotating support team or app can miss the context that makes
                executive schedules hard. Direct coach access is the value.
              </p>
            </div>
            <div className="py-4">
              <h3 className="text-bone text-[16.5px] md:text-[17px] font-semibold tracking-[-0.005em]">
                Recovery after disruption
              </h3>
              <p className="mt-2 text-[15px] md:text-[15.5px] leading-[1.65] text-mute max-w-[62ch]">
                The right coach has a clear adjustment process for bad weeks so
                one trip does not turn into a month-long reset.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            More specific paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/for/executives"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For executives
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Private 1:1 coaching for high-responsibility calendars.
              </span>
            </Link>
            <Link
              href="/for/founders"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For founders
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Fitness built around startup hours and decision fatigue.
              </span>
            </Link>
            <Link
              href="/for/high-income-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Premium coaching
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Direct coach judgment for people who are done buying apps.
              </span>
            </Link>
            <Link
              href="/vs/hiring-a-personal-trainer"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online coaching vs hiring a personal trainer
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                An honest comparison for someone deciding between the two.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much does an online fitness coach cost?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Market ranges, what moves the price, and the lower-cost options.
              </span>
            </Link>
            <Link
              href="/blog/how-to-get-in-shape-with-a-60-hour-work-week"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Getting in shape with a 60-hour work week
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What actually changes when time is the binding constraint.
              </span>
            </Link>
            <Link
              href="/blog/sleep-and-fat-loss-for-busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Sleep and fat loss for busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Recovery as a lever, not an afterthought.
              </span>
            </Link>
            <Link
              href="/vs/gym-membership"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online coaching vs a gym membership
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Why a cheap membership without a plan isn&apos;t actually cheap.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        {/* Price before the ask. Nine of twelve money pages never stated a
            coaching price; on these 21 the only figure was the community at
            67-91% depth. */}
        <CoachingPriceLine />

        {/* Early, in-read. These 21 audience pages carried no capture at
            all, and two of them are the highest buying-intent pages on the
            site by human search demand. */}
        <ArticleEarlyCapture
          slug="busy-professionals"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Nutrition and strength coaching questions from busy professionals
          </h2>
          <dl className="mt-6">
            {faqs.map((f) => (
              <div key={f.q} className="mt-7 first:mt-0">
                <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </dt>
                <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            A plan built for the week you actually have
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or the full{" "}
            <Link
              href="/blog/body-recomposition-for-men"
              className="underline hover:text-bone"
            >
              body recomposition method
            </Link>
            . 1:1 coaching is application-based — three questions,
            under two minutes.{" "}
            <TitanForgeSisterNote placement="for_busy_professionals_cta" />
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see{" "}
            <Link
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how few weekly sets can still build muscle
            </Link>
            , and{" "}
            <Link
              href="/science/questions/can-caffeine-save-a-bad-night-of-sleep"
              className="underline hover:text-bone"
            >
              whether caffeine can save a bad night of sleep
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_busy_primary">
              Get a plan for a full calendar
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

        <BusyProCluster currentHref="/for/busy-professionals" />

        <HubRetentionCTA hub="busy-professionals" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import { priceLabel } from "@/lib/offerCatalog";
import type { Metadata } from "next";
import Link from "next/link";
import ProofStrip from "@/components/ProofStrip";
import SkinnyFatCalculator from "@/components/SkinnyFatCalculator";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/body-recomposition-coach-denver";
// Visible "updated" date and dateModified must move together.
const UPDATED_ISO = "2026-10-13";
const UPDATED_LABEL = "October 13, 2026";

// Every fact on this page is already published elsewhere on the site or in the
// offer catalog: NASM-CPT and the Denver base (lib/entity.ts, data/locations.ts),
// the in-person lane (/personal-training-denver), tier inclusions and prices
// (lib/offerCatalog via priceLabel). Do not add a figure that is not sourced there.
const STANDARD = priceLabel("standard-check-in");
const VIP = priceLabel("vip-1on1");
const CONSULT = priceLabel("one-time-consultation");

const faqs = [
  { q: "What does body recomposition coaching focus on?", a: "Body recomposition coaching focuses on building muscle while reducing body fat without relying on an extreme cut. The plan combines progressive resistance training, a useful calorie and protein starting point, and regular review of strength, adherence, measurements, photos, and recovery before changes are made." },
  { q: "Is body recomposition coaching only about the scale?", a: "No, the scale is only one part of the feedback. Clothes fitting differently, stronger lifts, body measurements, progress photos, recovery, and consistent execution can all show whether the plan is moving in the right direction. A short-term scale change does not automatically mean the plan has failed." },
  { q: "Can a Denver body recomposition coach guarantee a deadline?", a: "No responsible coach can guarantee a body transformation on a deadline. Your starting point, lifting experience, food habits, schedule, and follow-through all matter. Coaching creates a structured process and useful feedback, but it does not promise that every person will lose fat and gain muscle at the same rate." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Body recomposition coaching with nutrition support in Denver",
  serviceType: "Body recomposition coaching",
  url: `${SITE_URL}${SLUG}`,
  description:
    "1:1 body recomposition coaching with training, macros-based nutrition guidance and daily accountability from Kris Oddo, NASM-CPT, based in Denver. Delivered online, with limited in-person sessions in Denver for qualified clients.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-Certified Personal Trainer, Founder and Head Coach",
  },
  areaServed: [
    { "@type": "City", name: "Denver" },
    { "@type": "Country", name: "United States" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: `${SITE_URL}${SLUG}`,
  name: "Body recomposition coach in Denver with nutrition support",
  dateModified: UPDATED_ISO,
};

export const metadata: Metadata = {
  title: "Denver Body Recomposition Coach With Nutrition Support | Kris Oddo",
  description:
    "Body recomposition coaching with nutrition support from Denver-based Kris Oddo, NASM-CPT: custom training, macros-based nutrition and daily accountability. Online, with limited in-person sessions in Denver.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Denver Body Recomposition Coach With Nutrition Support",
    description: "1:1 body recomposition coaching with nutrition support from Denver-based Kris Oddo, NASM-CPT.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Denver body recomposition coaching by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver Body Recomposition Coach With Nutrition Support",
    description: "1:1 body recomposition coaching with nutrition support from Denver-based Kris Oddo, NASM-CPT.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// Question-headed, one fact each, 100-180 words. These are the sections a
// person scans and an answer engine quotes, so they stay open in the HTML.
const ANSWERS: { id: string; h2: string; paras: string[] }[] = [
  {
    id: "who",
    h2: "Who offers body recomposition coaching with nutrition support in Denver?",
    paras: [
      "Geebs Coaching is run out of Denver by Kris Oddo, a NASM-certified personal trainer and the founder and head coach. Every client works with Kris directly. There is no hand-off to a junior coach and no group program dressed up as 1:1.",
      "The coaching is built for body recomposition: building muscle and losing fat at the same time instead of choosing between a long cut and a long bulk. Training and nutrition are planned together, because a recomposition plan that only handles one of them usually stalls. Coaching is billed monthly, with 6- and 12-month prepay options, and the plan is judged over months as measurements, photos and lifts move together rather than on two weeks of scale weight.",
    ],
  },
  {
    id: "nutrition",
    h2: "What nutrition support is included?",
    paras: [
      `Nutrition is part of every 1:1 coaching tier, not an add-on. Standard Check-In Coaching (${STANDARD}) includes a custom plan, macros-based nutrition guidance, daily accountability and a weekly 15-minute phone check-in with Kris.`,
      `VIP 1:1 Coaching (${VIP}) is the most hands-on option: prioritized daily communication, hands-on FaceTime meal prep, a fully custom training plan, form review and a weekly 30-minute Zoom. For a recomposition goal the nutrition target is a calorie and protein starting point that supports hard training, then adjusted from your logged numbers and weekly trend instead of from one bad weigh-in. Meals stay protein-forward on every tier, which is part of the Geebs Method.`,
    ],
  },
  {
    id: "in-person",
    h2: "Is the coaching online or in person in Denver?",
    paras: [
      "The core offer is online 1:1 coaching, which works the same for a client in Capitol Hill, the Denver Tech Center or another state. Programming, nutrition, check-ins and messaging all run online, so the plan does not depend on which gym you use.",
      "Kris also offers limited premium in-person personal training in Denver for qualified local clients who want live session time on top of the online coaching. Availability, location and package options are confirmed after the application, not posted publicly. If you want hands-on sessions in Denver, say so on the application and it will be part of the strategy call.",
    ],
  },
  {
    id: "progress",
    h2: "How is body recomposition progress measured?",
    paras: [
      "Recomposition can leave the scale flat while your body changes, so the scale is never the only scoreboard. Each week Kris reviews trend weight, waist or fit measurements, progress photos, lifting performance, recovery and how closely the plan was followed.",
      "Changes are made from that weekly review, not from a single day. If lifts are climbing and the waist is coming down, a flat scale is a reason to keep going, not to cut calories harder. If nothing is moving after a few weeks of real adherence, that is when calories, training volume or the daily targets change. Every client gets a weekly check-in, which is where those decisions are made.",
    ],
  },
  {
    id: "start",
    h2: "How do I start, and is there a lower-cost option?",
    paras: [
      "Monthly 1:1 coaching starts with a short application. It asks what matters most to you right now, how consistent your training has been lately and where you stand if coaching turns out to be the right fit, and it tells Kris whether online coaching, the Denver in-person lane or something lighter is the right fit before anyone talks about a package. The whole application is only three questions and usually takes under two minutes to complete.",
      `If you are not ready for monthly coaching, the One-Time Consultation Call (${CONSULT}) is a focused 45-minute Zoom with Kris. It covers what is holding your progress back right now and gives guidance on training, nutrition, accountability or schedule, with no monthly commitment.`,
    ],
  },
];

// Depth for readers who want the why. Native <details>, server-rendered, so the
// text is in the served HTML whether or not it is expanded.
const DEPTH: { h3: string; paras: string[] }[] = [
  {
    h3: "Why the scale is a bad sole scoreboard",
    paras: [
      "Scale weight is one data point. It can move for many reasons, including food volume, hydration, sodium, training stress, and normal day-to-day variation. It does not tell the whole story about strength, measurements, photos, consistency, or how you feel in your clothes.",
      "That does not mean ignore the scale. It means stop letting one noisy number make every decision. Your coaching dashboard can include trend weight, waist or fit measurements, lifting performance, recovery, and the habits that make results repeatable.",
    ],
  },
  {
    h3: "The Geebs Method: no perfect-week requirement",
    paras: [
      "The Geebs Method combines individualized hard training, nutrition that supports that training, recovery habits, and daily accountability. It is designed for imperfect weeks: the work trip, the dinner out, the missed workout, the day you do not feel motivated.",
      "Your plan is built around the smallest set of actions that can keep moving even when the week is not ideal: strength training that builds capability, protein-forward meals, clear adjustment rules instead of panic changes, and coaching accountability.",
    ],
  },
  {
    h3: "What the first weeks of coaching look like",
    paras: [
      "Every client starts with an honest baseline: current routine, lifting experience, food habits, schedule, and the specific pattern that has made past attempts fall apart.",
      "There is no promise that every person will lose fat and gain muscle at the same rate, and no responsible coach can guarantee a transformation on a deadline. What we can build is a process that replaces reactionary dieting with consistent training and useful feedback.",
    ],
  },
];

const bodyFirst = "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]";
const bodyRest = "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]";

export default function BodyRecompDenverPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="body-recomp-denver-faq-schema" data={faqSchema} />
      <JsonLd id="body-recomp-denver-service-schema" data={serviceSchema} />
      <JsonLd id="body-recomp-denver-webpage-schema" data={webPageSchema} />
      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Denver, Colorado</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Body Recomposition Coach in Denver, With Nutrition Support
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Kris Oddo, a NASM-certified personal trainer based in Denver, coaches body recomposition 1:1: a custom training plan, macros-based nutrition guidance and daily accountability, with a weekly check-in. Coaching is online, with limited in-person sessions in Denver for qualified clients. Start with the application below.
          </p>
          <p className="mt-4 text-[13px] text-mute2">
            Updated <time dateTime={UPDATED_ISO}>{UPDATED_LABEL}</time>
          </p>
          <ProofStrip className="mt-6" />
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        {ANSWERS.map((section, si) => (
          <section key={section.id} id={section.id} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p key={pi} className={pi === 0 ? bodyFirst : bodyRest}>
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <SkinnyFatCalculator />
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="body-recomp-denver-depth-heading">
          <h2 id="body-recomp-denver-depth-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How the coaching works, in more depth
          </h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            {DEPTH.map((d) => (
              <details key={d.h3} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 marker:content-none">
                  <h3 className="prose-h3 font-semibold leading-[1.3] text-bone">{d.h3}</h3>
                  <span aria-hidden="true" className="shrink-0 text-[20px] leading-none text-mute transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                {d.paras.map((p, pi) => (
                  <p key={pi} className="pb-4 text-[15.5px] leading-[1.7] text-mute max-w-[64ch]">{p}</p>
                ))}
              </details>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="body-recomp-denver-faq-heading">
          <h2 id="body-recomp-denver-faq-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Body recomposition coaching questions</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 marker:content-none">
                  <h3 className="prose-h3 font-semibold leading-[1.3] text-bone">{faq.q}</h3>
                  <span aria-hidden="true" className="shrink-0 text-[20px] leading-none text-mute transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 text-[15.5px] leading-[1.7] text-mute">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            For people who have dieted before and do not want to do it again
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you have swung between being “perfect” Monday through Thursday and feeling like you blew it by the weekend, you do not need another more restrictive reset. You need a plan with room for normal meals, imperfect adherence, and a fast recovery after a disrupted day. For live sessions, see{" "}
            <Link href="/personal-training-denver" className="underline hover:text-bone">
              private personal training in Denver
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/packages" className="btn btn-secondary">
              Compare coaching options
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {UPDATED_ISO}.</p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";
import MoneyPageKit from "@/components/MoneyPageKit";
import Over40Proof from "@/components/Over40Proof";
import ProofStrip from "@/components/ProofStrip";
import SendKrisStep from "@/components/SendKrisStep";
import { offerRailItems } from "@/lib/offerRail";
import {
  OVER40_APPLY_HREF as APPLY_HREF,
  OVER40_FACTS as FACTS,
  OVER40_GROUPS as GROUPS,
  OVER40_HUB_HREF as SLUG,
  OVER40_UPDATED as UPDATED,
} from "@/data/over40Hub";

/**
 * The over-40 recomp hub (niche #2, men over 40 and the "dad bod").
 *
 * Answer first, one cited fact per question, depth behind native <details>
 * so every word is in the server HTML for crawlers that run no JavaScript,
 * and a link to every over-40 page. The facts and their sources live in
 * data/over40Hub.ts, where each figure was checked against its abstract.
 *
 * The withdrawn draft /blog/2026-08-09-the-complete-guide-to-anti-aging-
 * fitness-for-men-over-40 (fabricated citations, never served) redirects here.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const ALL_LINKS = GROUPS.flatMap((g) => g.links);

export const metadata: Metadata = {
  title: "Body Recomposition Over 40: Build Muscle, Lose the Dad Bod",
  description:
    "Can you build muscle and lose belly fat after 40? Six questions, one study each: muscle after 40, why the dad bod creeps on, testosterone, protein, training days and sleep.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Body Recomposition Over 40",
    description:
      "Build muscle and lose the dad bod after 40: what the research says about muscle, testosterone, protein, training days and sleep.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Body recomposition over 40 by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Recomposition Over 40",
    description: "Muscle, belly fat, testosterone, protein and sleep after 40, one study each.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}${SLUG}#page`,
      url: `${SITE_URL}${SLUG}`,
      name: "Body Recomposition Over 40: Build Muscle, Lose the Dad Bod",
      dateModified: UPDATED,
      about: { "@type": "Thing", name: "Body recomposition for men over 40" },
      author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: `${SITE_URL}/about` },
      citation: FACTS.map((fact) => fact.source.href),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ALL_LINKS.map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.label,
          url: `${SITE_URL}${link.href}`,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}${SLUG}#faq`,
      mainEntity: FACTS.map((fact) => ({
        "@type": "Question",
        name: fact.q,
        acceptedAnswer: { "@type": "Answer", text: fact.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Body recomposition over 40", item: `${SITE_URL}${SLUG}` },
      ],
    },
  ],
};

export default function BodyRecompositionOver40Page() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="over-40-hub-schema" data={pageSchema} />
      <article
        className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"
        data-analytics-source="over_40_hub"
      >
        <header>
          <p className="eyebrow text-cloudText">For men over 40</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Body recomposition over 40
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Yes, you can build muscle and lose the dad bod after 40. Lift your
            whole body three days a week, eat about 0.7 grams of protein per
            pound, keep calories a little under maintenance, and protect your
            sleep. It is slower than at 25, not closed.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-cta="over_40_hub_apply"
              data-cta-position="hero"
            >
              Get a plan built for you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/tools/body-recomposition-calculator"
              className="btn btn-secondary"
              data-cta="over_40_hub_calculator"
              data-cta-position="hero"
            >
              Get your protein target
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProofStrip className="mt-6" />
          <p className="mt-5 text-[13px] text-mute2">
            By Kris Oddo, NASM-CPT · Updated{" "}
            <time dateTime={UPDATED}>
              {new Date(`${UPDATED}T12:00:00Z`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {FACTS.map((fact, index) => (
          <section
            key={fact.id}
            id={fact.id}
            className="prose-section mt-10 first-of-type:mt-0"
            data-no-fold="true"
          >
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {fact.q}
            </h2>
            <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
              {fact.answer}
            </p>
            <details className="article-details" open={index === 0}>
              <summary>More on this</summary>
              <div className="article-details-body">
                {fact.more.map((para, pi) => (
                  <p
                    key={pi}
                    className="mt-3 first:mt-0 text-[15px] md:text-[16px] leading-[1.7] text-mute max-w-[64ch]"
                  >
                    {para}
                  </p>
                ))}
                <p className="mt-3 text-[13px] leading-[1.6] text-mute2">
                  Source:{" "}
                  <a
                    href={fact.source.href}
                    className="underline hover:text-bone"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fact.source.label}
                  </a>
                </p>
                <p className="mt-4">
                  <Link
                    href={fact.next.href}
                    className="text-[15px] font-semibold text-bone underline hover:text-cloudText"
                  >
                    {fact.next.label} →
                  </Link>
                </p>
              </div>
            </details>
          </section>
        ))}

        <Over40Proof className="mt-14" />

        <SendKrisStep
          className="mt-14"
          ctaId="over_40_hub_send_kris"
          position="bottom"
          eyebrow="Over 40 and starting again?"
          title="Send Kris your week and your history."
          body="Tell him your age, what you lift now, any old injuries, and how many days you can train. He builds the plan around that and adjusts it every week."
          label="Send it to Kris"
          href={APPLY_HREF}
        />

        <CoachingDecisionVideo
          className="mt-10"
          source="body_recomposition_over_40"
          eyebrow="Considering coaching?"
          title="Watch this before you decide."
          body="Kris explains what he looks for, what happens after an application, and how he decides whether 1:1 coaching is a fit."
          decisionHref="/coaching?utm_source=site&utm_medium=topic_hub&utm_campaign=body_recomposition_over_40"
          decisionLabel="See how 1:1 coaching works"
        />

        <div className="hair my-10 md:my-14" />

        <section id="every-guide" data-no-fold="true">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every over-40 guide on this site
          </h2>
          {GROUPS.map((group) => (
            <div key={group.id} className="mt-8">
              <h3 className="eyebrow text-cloudText">{group.heading}</h3>
              <div className="mt-2 divide-y divide-line2 border-y border-line2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group grid min-h-20 gap-1 py-4 no-underline"
                  >
                    <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                      {link.label}
                    </span>
                    <span className="text-[13.5px] leading-[1.55] text-mute">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </article>
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

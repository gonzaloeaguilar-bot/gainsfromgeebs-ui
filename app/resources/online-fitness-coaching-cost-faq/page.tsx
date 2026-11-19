import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/resources/online-fitness-coaching-cost-faq";
const PAGE_URL = `${SITE_URL}${SLUG}`;
// Canonical points to the promoted /guides/ page — this resource page is kept
// for backward compatibility but defers authority to the question-slug guide.
const CANONICAL_URL = `${SITE_URL}/guides/how-much-does-an-online-fitness-coach-cost`;
const DATE_PUBLISHED = "2026-06-03";
const DATE_MODIFIED = "2026-06-10";

export const metadata: Metadata = {
  title: "Online Fitness Coaching Cost FAQ | Geebs Coaching",
  description:
    "A practical cost FAQ for online fitness coaching: typical price ranges, what changes the price, when coaching is worth it, and lower-cost alternatives.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Online Fitness Coaching Cost FAQ",
    description:
      "Typical online fitness coaching cost ranges, what you should get for the price, and when a lower-cost option makes more sense.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coaching cost FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coaching Cost FAQ",
    description:
      "What online fitness coaching usually costs and how to judge whether it is worth it.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const priceBands = [
  {
    tier: "Low-cost app or template",
    range: "$0-$200/month",
    fit: "Best when you mainly need workout structure, logging, or a starter plan.",
    watchout:
      "You may still be self-coaching when travel, sleep, nutrition, or missed workouts disrupt the plan.",
  },
  {
    tier: "Standard online coaching",
    range: "$200-$500/month",
    fit: "Best when you want a coach reviewing workouts and giving periodic accountability.",
    watchout:
      "Check how much direct coach attention you actually get, and whether nutrition is included.",
  },
  {
    tier: "Hands-on 1:1 coaching",
    range: "$500-$1,500/month",
    fit: "Best when the coach is directly managing training, nutrition, accountability, and weekly adjustments.",
    watchout:
      "It only makes sense if you will use the access and execute consistently.",
  },
  {
    tier: "Premium transformation coaching",
    range: "$1,500-$3,000+",
    fit: "Best when the offer includes more support, more access to the coach, and a clear start-and-finish program.",
    watchout:
      "Avoid paying premium prices for generic templates, vague support, or guarantee language without clear terms.",
  },
];

const faqs = [
  {
    q: "How much does online fitness coaching usually cost?",
    a: "Most online fitness coaching falls somewhere between a low-cost app or template and a hands-on 1:1 coaching offer. App-first plans can be free or under $200 per month, standard online coaching often sits around $200-$500 per month, and hands-on 1:1 coaching can range from $500-$1,500+ per month depending on coach access, customization, nutrition support, and how often you check in.",
  },
  {
    q: "Why do some online fitness coaches charge more?",
    a: "Higher pricing usually comes from how much time the coach actually spends on you: custom training, nutrition coaching, direct messaging, weekly check-ins, form review, schedule adjustments, and a coach who manages missed weeks instead of only handing over a plan.",
  },
  {
    q: "How much does Geebs Coaching cost?",
    a: "Geebs Coaching package options are covered on the strategy call after the application because fit, timeline, support level, and commitment matter. The lower-cost Geebs options are the $24.99/month Science-Based Community and the $100 one-time consultation call.",
  },
  {
    q: "When is online fitness coaching worth the money?",
    a: "It is usually worth considering when you already know the basics but keep losing consistency, need nutrition accountability, have a volatile schedule, or want a coach adjusting the plan from real weekly data instead of another template.",
  },
  {
    q: "Who should choose a cheaper app or program instead?",
    a: "Choose a cheaper app, free calculator, or self-guided program if you are still learning the basics, cannot commit budget yet, do not want direct accountability, or mostly need a workout structure to follow.",
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
  headline: "Online Fitness Coaching Cost FAQ",
  description:
    "Typical online fitness coaching cost ranges, what affects price, and how to judge fit.",
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
      name: "Resources",
      item: `${SITE_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Online Fitness Coaching Cost FAQ",
      item: PAGE_URL,
    },
  ],
};

export default function OnlineFitnessCoachingCostFaqPage() {
  return (
    <>
      <JsonLd id="online-fitness-coaching-cost-faq-schema" data={faqSchema} />
      <JsonLd
        id="online-fitness-coaching-cost-article-schema"
        data={articleSchema}
      />
      <JsonLd
        id="online-fitness-coaching-cost-breadcrumb-schema"
        data={breadcrumbSchema}
      />
      <ArticleShell className={"mx-auto max-w-[860px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24"}>
        <header>
          <p className="eyebrow text-cloudText">Cost FAQ</p>
          <h1 className="display mt-4 text-[32px] leading-[1.05] text-bone sm:text-[40px] md:text-[52px]">
            How much does online fitness coaching cost?
          </h1>
          <p className="mt-6 max-w-[64ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            The useful answer is not one number. Online fitness coaching ranges
            from free app access to hands-on 1:1 coaching. The price only
            makes sense when you know what kind of support you are actually
            buying.
          </p>
          <div
            className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4"
            data-analytics-source="cost_faq_hero"
          >
            <Link
              href="/apply"
              className="btn btn-primary"
              data-analytics-event="cost_faq_cta_click"
              data-analytics-link-kind="apply"
             data-cta="default_primary">
              Get coached by Kris
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
              data-analytics-event="cost_faq_cta_click"
              data-analytics-link-kind="packages"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Typical online coaching price ranges
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Type
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    Typical range
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Best fit
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Watch out for
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceBands.map((band) => (
                  <tr key={band.tier} className="border-b border-line2/50">
                    <td className="w-[22%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                      {band.tier}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                      {band.range}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone/85">
                      {band.fit}
                    </td>
                    <td className="py-4 align-top text-[14.5px] leading-[1.55] text-mute">
                      {band.watchout}
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
            What changes the price?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              "Direct access to the coach versus support through a general app or team inbox.",
              "Custom training based on your schedule, equipment, injury history, recovery, and adherence.",
              "Nutrition coaching, macro targets, restaurant strategy, and weekly adjustment.",
              "How often you check in, daily accountability, form review, and how fast the coach responds when the week changes.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-line2 bg-white/[0.025] p-5"
              >
                <p className="text-[15px] leading-[1.65] text-bone/85">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute">
            A higher price is not automatically better. The real question is
            whether the coach fixes the thing that actually keeps breaking your
            plan: workouts, food, travel, sleep, accountability, or changing the
            plan each week when life changes. If you are still deciding whether
            to hire anyone at all, start here:{" "}
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="underline decoration-mute/40 underline-offset-4 transition hover:text-bone hover:decoration-bone/60"
              data-analytics-source="cost_faq_body_worth_it"
            >
              is online fitness coaching worth it?
            </Link>
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            Where Geebs fits
          </h2>
          <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-bone/85">
            Geebs Coaching is not the cheapest option, and it is not trying to be.
            It is for people who want direct 1:1 coaching from Kris Oddo,
            daily accountability, weekly check-ins, and training plus nutrition
            adjustments based on what actually happened that week.
          </p>
          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7] text-mute">
            Exact 1:1 package options are covered after the application on the
            strategy call. If the fit or budget is not there, the lower-cost
            path is the{" "}
            <Link
              href="/memberships/science-based-community"
              className="underline hover:text-bone"
              data-analytics-source="cost_faq_geebs_fit"
              data-analytics-event="cost_faq_cta_click"
              data-analytics-link-kind="science_community"
            >
              science-based community
            </Link>{" "}
            at $24.99/month, or a $100 one-time consultation call.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">
            FAQ
          </h2>
          <div className="mt-6 space-y-7">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-[16.5px] font-semibold text-bone md:text-[17.5px]">
                  {faq.q}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-mute md:text-[15.5px]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-[22px] leading-[1.15] text-bone md:text-[26px]">
            Related comparisons
          </h2>
          <div
            className="mt-6 grid gap-3 md:grid-cols-3"
            data-analytics-source="cost_faq_related_comparisons"
          >
            {[
              {
                href: "/blog/is-online-fitness-coaching-worth-it",
                label: "Is online coaching worth it?",
                description:
                  "How to judge cost, accountability, and when not to hire a coach.",
              },
              {
                href: "/blog/online-fitness-coach-vs-personal-trainer",
                label: "Online coach vs trainer",
                description:
                  "Compare schedule flexibility, accountability, nutrition, and cost.",
              },
              {
                href: "/vs/caliber",
                label: "Geebs vs Caliber",
                description:
                  "Compare app-first coaching with direct 1:1 coach-led support.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-line2 bg-white/[0.025] p-4 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
                data-analytics-event="cost_faq_related_click"
                data-analytics-link-kind="comparison"
              >
                <h3 className="text-[17px] font-semibold leading-[1.25] text-bone">
                  {item.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-mute">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <NewsletterSignup
              source="resource:online-fitness-coaching-cost-faq"
              heading="Not ready to apply?"
              subheading="Get one weekly email on training, nutrition, accountability, and body recomposition while you compare options."
              ctaLabel="Get the emails"
              showName={false}
            />
          </div>
        </section>

        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}. Price
            ranges are rough market estimates based on commonly published prices,
            not a guarantee of any provider&apos;s current pricing.
          </p>
        </footer>
      </ArticleShell>
    </>
  );
}

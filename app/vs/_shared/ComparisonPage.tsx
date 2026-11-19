// Shared layout for /vs/* comparison pages. Each page passes in:
//   - title, description, eyebrow, h1
//   - competitorName, competitorTagline
//   - comparison rows
//   - whenToPick (Geebs vs competitor)
//   - faqs (FAQPage schema items)

import JsonLd from "@/components/JsonLd";
import { COACH_JOB_TITLE, ORG_NAME } from "@/lib/entity";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import ArticleLayout from "@/components/ArticleLayout";
import MoneyPageProof from "@/components/MoneyPageProof";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import { isScholarshipMoneyPage } from "@/lib/scholarshipAnchors";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionView from "@/components/SectionView";
import KeepGoing from "@/components/KeepGoing";
import Link from "next/link";

export type ComparisonRow = {
  dimension: string;
  geebs: string;
  competitor: string;
};

export type ComparisonFaq = {
  q: string;
  a: string;
};

export type ComparisonSection = {
  h2: string;
  paras: (string | React.ReactNode)[];
};

// Curated TL;DR rendered high on the page under a "Key Differences Summary"
// heading. Kept short and plain-language so readers can compare quickly before
// the full side-by-side table.
export type KeyDifference = {
  point: string;
  geebs: string;
  competitor: string;
};

export type QuickAnswer = {
  heading: string;
  body: string;
};

export type ComparisonPageProps = {
  slug: string;
  dateModified?: string;
  eyebrow: string;
  h1: string;
  lede: string;
  ledeCostSummary?: string;
  quickAnswer?: QuickAnswer;
  competitorName: string;
  competitorTagline: string;
  keyDifferences?: KeyDifference[];
  rows: ComparisonRow[];
  whenGeebs: string[];
  whenCompetitor: string[];
  bottomLine: string;
  faqs: ComparisonFaq[];
  extraSections?: ComparisonSection[];
};

const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_DATE_MODIFIED = "2026-05-21";
const COMPARISON_LINKS = [
  {
    href: "/vs/future",
    label: "Geebs vs Future",
    description: "Coach-led 1:1 support compared with app-based coaching.",
  },
  {
    href: "/vs/caliber",
    label: "Geebs vs Caliber",
    description: "Custom coach attention compared with app-first training.",
  },
  {
    href: "/vs/hiring-a-personal-trainer",
    label: "Geebs vs a personal trainer",
    description: "Online accountability compared with local session-based training.",
  },
  {
    href: "/vs/chatgpt",
    label: "Geebs vs ChatGPT",
    description: "Human coaching judgment compared with self-coaching through AI.",
  },
  {
    href: "/vs/fitness-apps",
    label: "Geebs vs fitness apps",
    description: "1:1 coaching versus self-guided app programs — price, adherence, and who each fits.",
  },
  {
    href: "/vs/trainwell",
    label: "Geebs vs Trainwell",
    description: "Named 1:1 coach compared with Trainwell's trainer-marketplace app model.",
  },
  {
    href: "/vs/ai-fitness-coach",
    label: "Geebs vs AI fitness coaches",
    description: "1:1 human coaching versus the AI fitness coaching category — what AI gets right and where the adherence gap still matters.",
  },
  {
    href: "/vs/gym-membership",
    label: "Geebs vs a gym membership",
    description: "A cheap membership vs a coached plan — cost per result, not cost per month.",
  },
  {
    href: "/vs/group-fitness-classes",
    label: "Geebs vs group fitness classes",
    description: "1:1 coaching compared with F45, Orangetheory, and CrossFit-style class formats.",
  },
  {
    href: "/vs/diy-workout-plan",
    label: "Geebs vs a DIY workout plan",
    description: "Coaching compared with free YouTube plans, Reddit routines, and self-programming.",
  },
];

export default function ComparisonPage(props: ComparisonPageProps) {
  const {
    slug,
    dateModified,
    eyebrow,
    h1,
    lede,
    ledeCostSummary,
    quickAnswer,
    competitorName,
    competitorTagline,
    keyDifferences,
    rows,
    whenGeebs,
    whenCompetitor,
    bottomLine,
    faqs,
    extraSections,
  } = props;
  const contentDate = dateModified ?? DEFAULT_DATE_MODIFIED;
  const comparisonLinks = COMPARISON_LINKS.filter(
    (item) => item.href !== `/vs/${slug}`,
  );
  const applyHref = `/apply?utm_source=site&utm_medium=comparison_page&utm_campaign=vs_${slug.replace(
    /-/g,
    "_",
  )}_apply&utm_content=comparison_bottom_cta`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: lede,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
      name: "Kris Oddo",
      jobTitle: COACH_JOB_TITLE,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
      url: SITE_URL,
    },
    datePublished: "2026-05-21",
    dateModified: contentDate,
    mainEntityOfPage: `${SITE_URL}/vs/${slug}`,
  };

  // Breadcrumb coverage in /vs was 0 of 10 (measured 2026-09-23). All ten pages
  // render through this component, so the trail is derived here once rather than
  // hand-copied into ten files that would drift apart.
  const breadcrumbSchema = buildSectionBreadcrumbSchema({
    siteUrl: SITE_URL,
    path: `/vs/${slug}`,
    title: h1,
  });

  return (
    <>
      <JsonLd id={`vs-${slug}-faq-schema`} data={faqSchema} />
      <JsonLd id={`vs-${slug}-article-schema`} data={articleSchema} />
      <JsonLd id={`vs-${slug}-breadcrumb-schema`} data={breadcrumbSchema} />
      <ArticleLayout
        eyebrow={eyebrow}
        title={h1}
        containerAs="article"
        containerClassName="max-w-[820px]"
        headerClassName=""
        titleClassName="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]"
        intro={
          <>
            <p className="prose-lead mt-6 max-w-[62ch] text-bone/85">{lede}</p>
            {ledeCostSummary && (
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/80 md:text-[16.5px]">
                {ledeCostSummary}
              </p>
            )}
          </>
        }
      >
{isScholarshipMoneyPage(`/vs/${slug}`) ? <ScholarshipCallout sourcePath={`/vs/${slug}`} /> : null}


        {quickAnswer && (
          <>
            <div className="hair my-10 md:my-14" />
            <section
              className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
              aria-labelledby="quick-answer"
            >
              <p className="eyebrow text-cloudText">Quick answer</p>
              <h2
                id="quick-answer"
                className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
              >
                {quickAnswer.heading}
              </h2>
              <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
                {quickAnswer.body}
              </p>
            </section>
          </>
        )}

        {keyDifferences && keyDifferences.length > 0 && (
          <>
            <div className="hair my-10 md:my-14" />
            {/* Key Differences Summary — concise TL;DR table placed high on the page. */}
            <SectionView sectionId="vs_key_differences">
            <section>
              <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
                Key Differences Summary
              </h2>
              <p className="mt-3 text-[14.5px] text-mute2 max-w-[62ch]">
                The short version of Geebs Coaching vs {competitorName}.
              </p>
              {/* Three columns of prose inside a horizontally scrolling box is
                  the worst thing a phone can be handed: the third column, which
                  is the competitor being compared, sits off the edge of the
                  screen entirely.

                  The TABLE IS KEPT. It is the correct semantics for a
                  comparison and it is what a crawler and an answer engine read.
                  It is the LAYOUT that becomes cards under md, one row per
                  card, with each value labelled. One DOM, no duplicated copy,
                  no sideways scroll. */}
              <div className="mt-6">
                <table className="block w-full border-collapse text-left md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="border-b border-line">
                      <th className="py-3 pr-4 text-[13px] uppercase tracking-[0.08em] text-mute2 font-medium">
                        What matters
                      </th>
                      <th className="py-3 pr-4 text-[13px] uppercase tracking-[0.08em] text-bone font-medium">
                        Geebs Coaching
                      </th>
                      <th className="py-3 text-[13px] uppercase tracking-[0.08em] text-mute font-medium">
                        {competitorName}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {keyDifferences.map((diff) => (
                      <tr
                        key={diff.point}
                        className="mb-3 block rounded-[10px] border border-line p-4 last:mb-0 md:mb-0 md:table-row md:rounded-none md:border-0 md:border-b md:border-line2/50 md:p-0"
                      >
                        <td className="block align-top text-[15px] font-medium text-bone md:w-[28%] md:table-cell md:py-4 md:pr-4 md:text-[14.5px] md:text-bone/75">
                          {diff.point}
                        </td>
                        <td className="mt-3 block align-top text-[14.5px] leading-[1.55] text-bone/95 md:mt-0 md:table-cell md:py-4 md:pr-4">
                          <span className="mb-1 block text-[11.5px] uppercase tracking-[0.13em] text-cloudText md:hidden">
                            Geebs Coaching
                          </span>
                          {diff.geebs}
                        </td>
                        <td className="mt-3 block align-top text-[14.5px] leading-[1.55] text-mute md:mt-0 md:table-cell md:py-4">
                          <span className="mb-1 block text-[11.5px] uppercase tracking-[0.13em] text-mute2 md:hidden">
                            {competitorName}
                          </span>
                          {diff.competitor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            </SectionView>
          </>
        )}

        <div className="hair my-10 md:my-14" />

        {/* Comparison table */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Side by side
          </h2>
          <p className="mt-3 text-[14.5px] text-mute2 max-w-[62ch]">
            Geebs Coaching vs {competitorName} ({competitorTagline}).
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] uppercase tracking-[0.08em] text-mute2 font-medium">
                    Dimension
                  </th>
                  <th className="py-3 pr-4 text-[13px] uppercase tracking-[0.08em] text-bone font-medium">
                    Geebs Coaching
                  </th>
                  <th className="py-3 text-[13px] uppercase tracking-[0.08em] text-mute font-medium">
                    {competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.dimension} className="border-b border-line2/50">
                    <td className="py-4 pr-4 align-top text-[14.5px] text-bone/75 font-medium w-[28%]">
                      {row.dimension}
                    </td>
                    <td className="py-4 pr-4 align-top text-[14.5px] text-bone/95 leading-[1.55]">
                      {row.geebs}
                    </td>
                    <td className="py-4 align-top text-[14.5px] text-mute leading-[1.55]">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* When to pick which */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
              Pick Geebs if
            </h2>
            <ul className="mt-5 space-y-3 list-none text-[15px] md:text-[15.5px] leading-[1.6] text-bone/90">
              {whenGeebs.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="text-cloudText shrink-0">→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
              Pick {competitorName} if
            </h2>
            <ul className="mt-5 space-y-3 list-none text-[15px] md:text-[15.5px] leading-[1.6] text-mute">
              {whenCompetitor.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="text-mute2 shrink-0">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

{isScholarshipMoneyPage(`/vs/${slug}`) ? <ScholarshipSection sourcePath={`/vs/${slug}`} /> : null}
                <MoneyPageProof
          eyebrow="Proof trail"
          title="What backs the Geebs side of this comparison"
          intro="Comparison pages should connect the offer to proof, not just repeat feature claims. These are the public results, named testimonials, and coach-identity pages that support the Geebs side of the argument."
        />

        <div className="hair my-10 md:my-14" />

        {/* Bottom line */}
        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Bottom line
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {bottomLine}
          </p>
        </section>

        {extraSections && extraSections.length > 0 && (
          <>
            {extraSections.map((sec) => (
              <div key={sec.h2}>
                <div className="hair my-10 md:my-14" />
                <section>
                  <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
                    {sec.h2}
                  </h2>
                  {sec.paras.map((p, pi) => (
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
              </div>
            ))}
          </>
        )}

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Compare other options
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-bone/80 max-w-[62ch]">
            Most people comparing online coaching are choosing between an app,
            an in-person trainer, self-coaching, or a coach-led model. These
            comparisons keep the alternatives connected so you can judge the
            real tradeoff.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {comparisonLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
              >
                <p className="text-bone text-[16px] font-semibold">
                  {item.label}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Common questions
          </h2>
          <div className="mt-6 space-y-7">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-bone text-[16.5px] md:text-[17.5px] font-semibold tracking-[-0.005em]">
                  {f.q}
                </h3>
                <p className="mt-2 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Still evaluating?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
            If you are not ready to apply yet, use the pages that answer the
            real questions behind every comparison: how Kris coaches, what
            online coaching usually costs, whether it is worth paying for, and
            whether the method has proof behind it.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/methodology"
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
            >
              <p className="eyebrow text-cloudText">How it works</p>
              <p className="mt-2 text-bone text-[17px] font-semibold">
                Read the methodology
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                Training, nutrition, recovery, accountability, and why Geebs is
                built for a real work week.
              </p>
            </Link>
            <Link
              href="/results"
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
            >
              <p className="eyebrow text-cloudText">Proof</p>
              <p className="mt-2 text-bone text-[17px] font-semibold">
                Review client results
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                Real client results, reviews, and how the coaching actually works.
              </p>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
            >
              <p className="eyebrow text-cloudText">Cost</p>
              <p className="mt-2 text-bone text-[17px] font-semibold">
                Compare online coaching prices
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                See what changes the price, when 1:1 makes sense, and when a
                lower-cost path is the better fit.
              </p>
            </Link>
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
            >
              <p className="eyebrow text-cloudText">Buying guide</p>
              <p className="mt-2 text-bone text-[17px] font-semibold">
                Decide if online coaching is worth it
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                Use the fit checks before choosing an app, a self-guided plan,
                or high-touch 1:1 coaching.
              </p>
            </Link>
            <Link
              href="/blog/how-to-hire-an-online-fitness-coach"
              className="rounded-2xl border border-line2 bg-white/[0.02] p-5 no-underline transition-colors hover:border-line hover:bg-white/[0.04]"
            >
              <p className="eyebrow text-cloudText">Checklist</p>
              <p className="mt-2 text-bone text-[17px] font-semibold">
                How to hire an online fitness coach
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                Credentials, programming quality, check-in cadence, red flags
                — what to look for in an online coach before you pay.
              </p>
            </Link>
          </div>
          <div className="mt-8">
            <div className="hair my-10 md:my-14" />
            <KeepGoing position="vs_comparison" />

            <NewsletterSignup
              source={`vs:${slug}`}
              heading="Not ready to apply?"
              subheading={`Get one weekly email on training, nutrition, and body recomposition while you compare Geebs Coaching with ${competitorName}. No spam. Unsubscribe anytime.`}
              ctaLabel="Get the emails"
              showName={false}
            />
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Try Geebs Coaching
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The application is three questions and takes under two minutes. If
            it&apos;s not a fit, you&apos;ll get pointed to the 90-day program.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={applyHref} className="btn btn-primary" data-cta="vs_primary">
              Get coached by a human
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

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated {contentDate}. Comparison
            based on publicly listed features as of the date above.
          </p>
        </footer>
      </ArticleLayout>
    </>
  );
}

import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { fitSeoTitle } from "@/lib/seoMetadata";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/men-getting-married";
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-06-10";

export const metadata: Metadata = {
  title: fitSeoTitle(
    "Get in Shape Before Your Wedding: Online Fitness Coaching for Grooms | Geebs Coaching",
  ),
  description:
    "Deadline-driven coaching for grooms — realistic timelines by months out, no crash-diet framing, suit-fit confidence, and a plan built around your engagement chaos.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Get in Shape Before Your Wedding: Online Fitness Coaching for Grooms",
    description:
      "4–6 months of consistent coaching beats 6 weeks of crash dieting. Realistic groom fitness timelines and the plan that actually works.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Get in shape before your wedding — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Shape Before Your Wedding: Fitness Coaching for Grooms",
    description:
      "The mistake most grooms make: waiting too long. The fix: 4–6 months of coaching that survives engagement chaos.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "How long before your wedding should you start getting in shape?",
    paras: [
      "Four to six months minimum for visible, lasting results. Six to eight weeks out is enough time to look depleted, not lean. The wedding photos last forever — give the process enough runway to look real, not like a crash attempt.",
      "The timeline math: fat loss runs at roughly 0.5–1 lb per week in a sustainable deficit with strength training. At 6 months, that is 12–24 lbs of fat loss while preserving or adding muscle. At 6 weeks, that is 3–6 lbs lost while losing some muscle and showing up with a gaunt face in the photos.",
      "Starting early also means you can train through the engagement period — the busiest, most socially chaotic months most men will ever have. The earlier you start, the more runway the plan has to absorb bachelor parties, late nights, and three weekends of tasting menus in a row.",
    ],
  },
  {
    h2: "What works for grooms: lose fat, build muscle, or both?",
    paras: [
      "For most men getting married — typically 25–38 years old, some training history but inconsistent — the answer is body recomposition: lose fat and build muscle simultaneously. The same approach that works for men in their 30s who have never trained seriously.",
      "The groom goal is not just a lower scale number. It is a sharper shoulder-to-waist ratio, more definition through the neck and jaw, and the posture and energy that come from four to six months of consistent training. Crash dieting produces scale weight. Strength training produces the visual result.",
      "The recomp method: 3×45-minute sessions per week, a modest calorie deficit, and protein at 0.7–1g per pound of bodyweight. Progressive strength training builds the shoulder-to-waist ratio that makes a suit look the way it is supposed to. The scale will move less than you expect. The mirror will change more.",
    ],
  },
  {
    h2: "Fitness plan for the engagement period (6+ months out)",
    paras: [
      "Six months out is the ideal starting window. The plan is straightforward: three full-body sessions per week, nutrition built around real life, weekly coaching check-ins to catch drift before it compounds.",
      "The engagement period has specific challenges generic programs ignore: dinner reservations every weekend, venue tours that run through meal windows, family events where the food is not in your control, and a social calendar that will not pause for your fitness plan. The coaching builds around this reality, not a fantasy version of your schedule.",
      "Progress at this stage is mostly invisible. Strength goes up, body composition shifts, and the scale barely moves. That is the process working. The visible results show up in the final 8–12 weeks when body fat has dropped enough for the changes to be apparent.",
    ],
  },
  {
    h2: "8–12 weeks out: realistic goals for the last sprint",
    paras: [
      "At 8 weeks out, the focus shifts from building to preserving. The heavy lifting — the training that builds the muscle and drives the fat loss — has already happened. The last two months are about consistency, not adding more intensity.",
      "What is realistic at 8 weeks: meaningful visual improvement if the previous 3–4 months were consistent. A noticeable change in suit fit, shoulder definition, and energy. Not a transformation if you are starting from nothing — that window has passed.",
      "Crash dieting at 8 weeks produces the wrong result. A large deficit depletes muscle, flattens the face, and produces the gaunt look that photographs badly. The correct approach at 8 weeks is maintenance or a very modest deficit, keeping training consistent, and sleeping.",
    ],
  },
  {
    h2: "Staying on track through bachelor parties and pre-wedding events",
    paras: [
      "The plan accounts for these. Bachelor party week, parents-visiting-from-out-of-town weekend, the three-course rehearsal dinner — the coaching framework treats these as recoverable events, not derailments.",
      "The practical approach: protein stays high even when calories vary. One heavy night does not undo four months of work. The mistake is treating event weekends as full pauses that lead to week-long resets. One coaching principle: the week after a hard weekend is not a restart, it is just Tuesday.",
      "A coach who knows your schedule can plan around these events in advance — pulling training forward, adjusting the nutrition week, and making sure the week of the wedding itself has a clear protocol rather than last-minute improvisation.",
    ],
  },
  {
    h2: "What the wedding suit fitting tells you about your real timeline",
    paras: [
      "Most men schedule their first suit fitting 4–6 months before the wedding — the same timeline that works for coaching. If you have a fitting already booked, that is your external accountability check.",
      "The suit fitting is useful data. If the jacket gaps across the back and the pants are tight at the waist, the direction is clear: build the back and shoulders while the waist comes down. 1:1 coaching gives you a program built toward that specific visual goal, not a generic fat-loss template.",
      "After the wedding: the coaching model is built for maintenance, not the restart cycle. Most men who arrive at their wedding in the best shape of their lives have a system they can continue — not a crash that snaps back the moment the deadline passes.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "How far in advance should a groom start a fitness program?",
    a: "Four to six months minimum for visible, lasting results. Six to eight weeks is enough time to look depleted, not lean. The wedding photos are permanent — give the process enough runway to produce a real result rather than a crash attempt.",
  },
  {
    q: "Can I build muscle and lose fat before my wedding?",
    a: "If you have been inconsistent, yes — that is body recomposition, and it works well for men who have not trained seriously before. The more lead time you have, the more substantial the result. At 6 months out, 15–20 lbs of fat loss while maintaining or adding muscle is realistic.",
  },
  {
    q: "What if I only have 8 weeks?",
    a: "Eight weeks of consistent training and good nutrition will make a difference — more energy, better posture, some visual change. The mistake at 8 weeks is extreme restriction, which produces a gaunt face in the photos, not the sharp look you want. Focus on body composition, not rapid scale weight.",
  },
  {
    q: "How do I stay on track through the bachelor party and pre-wedding events?",
    a: "The plan accounts for these events in advance. A weekend of celebration does not undo four months of work. The approach: keep protein high, treat the week after as normal rather than a restart, and have a clear protocol for the wedding week itself. A coach who knows your calendar builds around it rather than pretending it does not exist.",
  },
  {
    q: "What kind of training gives the best results for a wedding?",
    a: "Strength training with progressive overload, not marathon cardio. Resistance training builds the shoulder-to-waist ratio that makes a suit look the way it is supposed to. Protein preserves and builds muscle while the calorie deficit pulls fat. Cardio is supplemental, not the method.",
  },
  {
    q: "Is online coaching realistic during wedding planning?",
    a: "That is exactly when it is most valuable. A coach who adjusts the week when venue tours, engagement parties, and family events collide is the tool you need during the most logistically chaotic six months of your life. The coaching framework is built to survive imperfect weeks, not to require them.",
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

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Get in Shape Before Your Wedding: Online Fitness Coaching for Grooms",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Get in Shape Before Your Wedding: Online Fitness Coaching for Grooms",
  description:
    "Realistic timelines, no crash-diet framing, and a coaching model built around engagement chaos — for men who want to show up to their wedding looking their best.",
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
    about: [
    { "@type": "Thing", name: "Pre-wedding fitness" },
    { "@type": "Thing", name: "Groom fitness coaching" },
    { "@type": "Thing", name: "Getting in shape for wedding" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pre-Wedding Fitness Coaching for Men",
  serviceType: "Pre-wedding fitness coaching for men",
  description:
    "1:1 online coaching for grooms — deadline-driven programming, engagement-proof nutrition, and a coach who adjusts around the chaos of wedding planning.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  url: `${SITE_URL}${SLUG}`,
};

export default function MenGettingMarriedPage() {
  return (
    <>
      <JsonLd id="men-getting-married-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="men-getting-married-article-schema" data={articleSchema} />
      <JsonLd id="men-getting-married-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Get in shape before your wedding: online fitness coaching for grooms
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A wedding date is the one fitness deadline most men actually take
            seriously. The mistake: waiting too long, starting a crash program
            at 6 weeks out, and showing up depleted in the photos. The play
            that works is 4–6 months of consistent coaching — strength training
            that builds the frame, nutrition that survives the engagement
            calendar, and a coach who adjusts when the week explodes.
          </p>
        </header>

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

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/for/busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If the main constraint is a packed calendar — not just a
                wedding deadline — this page covers how coaching is built
                around professional time compression.
              </span>
            </Link>
            <Link
              href="/for/men-in-their-30s"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For men in their 30s
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Most grooms are in their 30s — the decade when the old
                approach stops working and a systematic coaching plan
                produces the fastest results.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much does a fitness coach cost?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Honest 2026 pricing for 1:1 coaching and the lower-cost
                options.
              </span>
            </Link>
            <Link
              href="/tools/macro-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Macro calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Set your protein target and calorie starting point — the two
                numbers that determine whether the pre-wedding plan actually
                works.
              </span>
            </Link>
            <Link
              href="/guides/getting-back-in-shape-after-a-long-break"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Getting back in shape after 30
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The honest re-entry guide — what actually changes after 30 and
                what a realistic restart timeline looks like.
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
          slug="men-getting-married"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
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
            The wedding is the deadline. The coaching is the plan.
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or apply for 1:1 coaching — three questions, under two minutes.
            The strategy call covers your timeline, your history, and what a
            realistic starting point looks like given how far out your wedding
            is.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/how-much-cardio-for-fat-loss"
              className="underline hover:text-bone"
            >
              how much cardio fat loss actually needs
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-do-you-avoid-losing-muscle-while-dieting"
              className="underline hover:text-bone"
            >
              how to avoid losing muscle while dieting for the date
            </Link>
            , and{" "}
            <Link
              href="/science/questions/is-hiit-better-than-steady-cardio-for-fat-loss"
              className="underline hover:text-bone"
            >
              whether HIIT beats steady cardio for fat loss
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_primary">
              Get a plan built for your schedule
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

        <HubRetentionCTA hub="men-getting-married" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/men-in-their-30s";

export const metadata: Metadata = {
  title: "Online Fitness Coach for Men in Their 30s | Geebs Coaching",
  description:
    "1:1 online fitness coaching for men in their 30s — recomposition, muscle, fat loss. The whole client base is men 25-40. Kris Oddo, NASM-CPT.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Men in Their 30s",
    description:
      "Coaching built for men in their 30s — recovery, recomposition, and real results when the old approach stops working.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for men in their 30s — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Men in Their 30s",
    description:
      "1:1 coaching for men in their 30s — the whole practice is men 25-40. Recomposition, muscle, fat loss.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Getting in shape in your 30s vs your 20s — what actually changes",
    paras: [
      "Your 30s are when the old approach stops working. Recovery slows slightly, time disappears entirely, and the you-can-eat-anything metabolic runway your 20s provided quietly closes. The gut is not the whole story — the gut is a symptom of a decade of not having a system.",
      "What changes: recovery demands a little more attention, programming needs to account for real life instead of assuming unlimited gym time, and the all-or-nothing approach that kind of worked at 25 now causes injuries and quitting. What does not change: progressive overload, protein, consistency — these produce results at any age.",
      "It is also, for many men, the easiest decade to fix. If you have never trained systematically, your 30s can produce dramatic recomposition because you are starting from a genuine baseline. The internet overstates how hard this decade is. The real obstacle is time and a plan that survives it.",
    ],
  },
  {
    h2: "Building muscle in your 30s",
    paras: [
      "Muscle is built in your 30s. If you have never trained seriously, you still have access to significant early-stage muscle gain — sometimes called newbie gains — and there is no age cap on that response in your 30s. Recovery and hormonal changes are real but marginal; the constraint is almost always programming and consistency, not biology.",
      "The coaching covers this directly: progressive overload structured to your training history, protein targets to support muscle protein synthesis, and recovery built into the program rather than treated as optional. More at the blog guide: how to build muscle in your 30s.",
    ],
  },
  {
    h2: "Losing belly fat in your 30s",
    paras: [
      "Belly fat in your 30s is a body composition problem, not a spot-reduction problem. The fix is a modest calorie deficit, a high protein intake, and resistance training — the combination that preserves muscle while the deficit pulls fat. Cardio is useful as a calorie lever but not the primary driver.",
      "Most men in their 30s who have tried to lose belly fat have tried calorie restriction without sufficient protein and without lifting, which produces scale weight loss but not the visual change they were looking for. The coaching fixes the ratio: the deficit is moderate, the protein is high, the training is progressive. See the full breakdown at the blog guide on losing belly fat in your 30s.",
    ],
  },
  {
    h2: "Why men in their 30s plateau on DIY plans",
    paras: [
      "DIY plans plateau for one of three reasons in this decade: career and family time compression means the plan requires more hours than the week actually has, so it collapses. Or the plan was built for outcomes but not for the week — nutrition that requires Sunday meal prep, training that assumes five gym days — and one hard week ends it.",
      "Or the plan is simply not progressive. The same workout done at the same weight for six months does not build a different body. Progressive overload is the mechanism; without it, the body has no reason to change.",
      "The coaching solves all three: three sessions a week that fit a real schedule, nutrition that does not require a perfect week, and programming that advances systematically against your actual data.",
    ],
  },
  {
    h2: "Body recomposition for men over 30",
    paras: [
      "Body recomposition — losing fat while gaining muscle simultaneously — works especially well for men in their 30s who have not trained systematically before. The combination of untrained muscle responding quickly and a modest deficit pulling fat produces visible changes that scale-only approaches never deliver.",
      "This is Geebs Coaching's core method. Three resistance training sessions a week with progressive overload, a protein target, a modest calorie deficit or maintenance depending on your starting point, and weekly adjustments against real data. Men 25-40 is the entire client base — not a segment. See skinny-fat men for the specific recomp case where you are already near your target weight but not the composition you want.",
    ],
  },
  {
    h2: "Body recomposition for men in their 30s — the starting point",
    paras: [
      "Body recomposition for men in their 30s starts with two numbers: a protein target (0.8–1g per pound of bodyweight) and a calorie target at or slightly below maintenance. Get those right, add 3 resistance training sessions a week with progressive overload, and you have the recomposition framework.",
      "What makes the 30s a strong decade for recomp: if you have never trained consistently, you have access to genuine beginner gains even under a small deficit. The newbie gains window is open. Men who have never trained seriously often see their most dramatic body composition changes in the first 12–16 weeks of a structured recomposition program.",
      "The macro calculator on this site gives you your starting protein and calorie targets. The body recomposition for men guide covers the training, nutrition, and timeline in full detail.",
    ],
  },
  {
    h2: "What a coached 90 days looks like at 32",
    paras: [
      "The typical client in their early 30s starts with 3 training sessions a week, a protein target around 0.8-1g per pound of bodyweight, and daily accountability through direct messaging with Kris. The first few weeks establish the pattern; by week 6-8 most clients report the nutrition is running close to automatic and the training is consistently happening.",
      "Visible body composition change — in the mirror, in how clothes fit — typically shows up around the 8-12 week mark for men who are consistent. The coaching block is 90 days minimum because that is the honest timeline for the pattern to hold. 1:1 coaching is application-based; pricing is quoted on the strategy call.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is it harder to get in shape in your 30s?",
    a: "Marginally, and far less than the internet claims. Recovery and hormones shift slightly, but the real obstacle is time and consistency. With structured training and nutrition, men in their 30s routinely make their best gains ever — particularly if they have never trained systematically before.",
  },
  {
    q: "Can I still build muscle in my 30s?",
    a: "Yes. If you have never trained seriously, your 30s can be your fastest muscle-gain period. Newbie gains are available at any starting age, and the hormonal environment in your 30s still fully supports muscle growth with the right training and protein.",
  },
  {
    q: "Should I train differently at 35 than at 25?",
    a: "Longer warm-ups, smarter exercise selection, more attention to recovery — yes. The fundamentals do not change: progressive overload, protein, consistent sleep. The delivery gets more precise, which is exactly what 1:1 coaching provides.",
  },
  {
    q: "Is 30+ too late to fix skinny fat?",
    a: "No. Recomposition — losing fat while gaining muscle — works especially well for skinny-fat men in their 30s. If that describes your situation, see the coaching page specifically for skinny-fat men.",
  },
  {
    q: "Do I need a coach or just a program?",
    a: "A program tells you what to do on perfect weeks. In your 30s the weeks are not perfect — a coach adapts the plan to the week you actually had, keeps nutrition on track through the hard stretches, and prevents the restart cycle that kills DIY attempts.",
  },
  {
    q: "How long until I see results in my 30s?",
    a: "Strength improvements in 2-4 weeks, visible mirror changes around 8-12 weeks of consistency. Timelines are honest here — the restart cycle comes from believing dishonest ones.",
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
  title: "Online Fitness Coach for Men in Their 30s",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach for Men in Their 30s",
  description:
    "1:1 online fitness coaching for men in their 30s — body recomposition, muscle building, fat loss, and coaching built for the decade when the old approach stops working.",
  author: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: SITE_URL,
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
  datePublished: "2026-06-10",
  dateModified: "2026-06-11",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Men in their 30s" },
    { "@type": "Thing", name: "Body recomposition" },
    { "@type": "Thing", name: "Body recomposition for men in their 30s" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Men in Their 30s",
  serviceType: "Online fitness coaching for men in their 30s",
  description:
    "1:1 online fitness coaching for men in their 30s — custom training, nutrition coaching, daily accountability, and weekly check-ins.",
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

export default function MenInTheir30sPage() {
  return (
    <>
      <JsonLd id="men-30s-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="men-30s-article-schema" data={articleSchema} />
      <JsonLd id="men-30s-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for men in their 30s
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Your 30s are when the old approach stops working — recovery slows
            slightly, time disappears entirely, and &ldquo;just play sports and
            eat whatever&rdquo; quietly becomes a gut. Geebs Coaching is 1:1
            coaching built for exactly this decade. Men 25-40 is the entire
            client base, not a segment.
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
              href="/blog/how-to-build-muscle-in-your-30s"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to build muscle in your 30s
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The mechanics of muscle building for men in their 30s — what
                changes, what stays the same, and how to program for it.
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
                Returning to training in your 30s — what actually matters and
                what the timeline looks like.
              </span>
            </Link>
            <Link
              href="/blog/how-to-lose-belly-fat-men-30s"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to lose belly fat in your 30s
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The specific fat-loss approach that works for men in their 30s
                — not the generic advice that ignores body composition.
              </span>
            </Link>
            <Link
              href="/for/skinny-fat-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For skinny-fat men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If you are near your target weight but the composition is
                wrong, recomposition coaching is the specific answer.
              </span>
            </Link>
            <Link
              href="/blog/online-fitness-coach-for-men-over-30"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coach for men over 30
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How online coaching specifically fits the constraints of men in
                their 30s and 40s.
              </span>
            </Link>
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Calculate your personalized recomp viability score, daily calorie
                target, and 12-week outlook.
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
                Get your starting protein and calorie targets for body
                recomposition in your 30s — free, no sign-up required.
              </span>
            </Link>
            <Link
              href="/blog/body-recomposition-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The complete recomposition guide — training, nutrition, macros,
                and what drives the result for male body recomposition.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coach cost
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Compare typical monthly coaching rates, what each tier includes,
                and what to look for before hiring a coach.
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
          slug="men-in-their-30s"
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
            Coaching built for this decade
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
            . 1:1 coaching is application-based — three questions, under two
            minutes. The $100 one-time consultation call is there if you want to
            start without an application.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Prefer the peer-reviewed evidence first? See{" "}
            <Link
              href="/science/questions/should-men-over-30-take-creatine"
              className="underline hover:text-bone"
            >
              whether men over 30 should take creatine
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how many weekly sets actually build muscle
            </Link>
            , and{" "}
            <Link
              href="/science/questions/does-strength-training-help-you-age-better"
              className="underline hover:text-bone"
            >
              what strength training does for how you age
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

        <CoachingDecisionVideo
          className="mt-10"
          source="men_in_their_30s"
          eyebrow="Considering coaching?"
          title="Watch this before you decide."
          body="Kris explains what he looks for, what happens after an application, and how he decides whether 1:1 coaching is a fit."
          decisionHref="/coaching?utm_source=site&utm_medium=audience_page&utm_campaign=men_in_their_30s"
          decisionLabel="See how 1:1 coaching works"
        />

        <HubRetentionCTA hub="men-in-their-30s" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-10.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

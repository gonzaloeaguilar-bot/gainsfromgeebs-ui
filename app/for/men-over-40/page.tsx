import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";
import Link from "next/link";
import TitanForgeSisterNote from "@/components/TitanForgeSisterNote";
import Over40Path from "@/components/Over40Path";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/men-over-40";

export const metadata: Metadata = {
  title: "Online Fitness Coach for Men Over 40 | Geebs Coaching",
  description:
    "1:1 online fitness coaching for men in their late 30s and 40s — smarter recovery, joint-friendly programming, real results. Kris Oddo, NASM-CPT.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Men Over 40",
    description:
      "Getting back in shape after 40 is the same fundamentals with smarter recovery — 1:1 coaching built for men in their late 30s and 40s.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for men over 40 — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Men Over 40",
    description:
      "1:1 coaching for men in their late 30s and 40s — smarter recovery, progressive training, honest timelines.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Getting back in shape after 40",
    paras: [
      "Getting back in shape after 40 is not a different sport. It is the same fundamentals — progressive overload, protein, consistency — with smarter recovery management layered in. What changes after 40: joints respond better to longer warm-ups, recovery demands more deliberate attention, and the all-or-nothing approach that kind of worked at 25 now causes injuries and quitting.",
      "What does not change: your capacity to build muscle, lose fat, and get substantially stronger is still there. Men in their late 30s and 40s respond strongly to structured strength training. The constraint is not capability; it is recovery management, programming precision, and a plan that accounts for your history.",
      "1:1 coaching matters more after 40 because the margins are tighter. A generic program copied from a 25-year-old's feed does not account for your old shoulder, your current sleep, or the fact that recovery at 44 looks different than recovery at 24. A coach who knows your week programs for all of it.",
    ],
  },
  {
    h2: "Getting back in shape after 35 (the honest version)",
    paras: [
      "The 35 inflection point is real — but it is overstated. Recovery does shift slightly in the mid-to-late 30s: soreness lingers a day longer, sleep quality matters more, and the same training volume that was manageable at 28 starts producing diminishing returns at 36. None of that means the capability is gone. It means the programming needs to respect what the body is actually telling you.",
      "Men in their mid-to-late 30s who have never trained seriously are still in the newbie-gains window for muscle growth. That window does not expire at 35 — it closes based on training age, not calendar age. If you have never followed a structured progressive program, 35 is not too late. It is still very early.",
      "What changes after 35 that the programming accounts for: longer warm-up protocols before heavy compound work, exercise selection that avoids unnecessary joint stress (trap bar deadlift over conventional for back-sensitive clients, for example), deliberate deload weeks built into the program rather than waiting for an injury to force rest, and recovery tracking that flags when the next week's load needs to pull back.",
    ],
  },
  {
    h2: "Online fitness coach for men over 35: what changes about the programming",
    paras: [
      "A 25-year-old and a 37-year-old can run the same three-day full-body program at similar volumes. What differs is how the program responds to feedback. At 35+, the programming needs to monitor joint load, recovery signals, and long-term progression more deliberately — not because the body has a lower ceiling, but because the margin for error on recovery is smaller.",
      "1:1 coaching matters more after 35 precisely because it is responsive. Generic programs are written for the average person at the average recovery capacity. A coach who knows your history — the old shoulder injury, the work month that is wrecking your sleep, the week where training load needs to drop 30% — programs for your actual situation rather than the average.",
      "The fundamentals do not change. Progressive overload, protein at 0.8–1g per pound of bodyweight, consistent sleep. The delivery becomes more precise because the margin between underdoing it and overdoing it narrows slightly as the decade progresses.",
    ],
  },
  {
    h2: "Building muscle after 40 — slower, not impossible",
    paras: [
      "Muscle is built at any age. After 40 the rate is somewhat slower and the demands on sleep, protein, and programming quality are higher — but none of those factors prevent meaningful muscle gain. Men in their 40s routinely make substantial physique changes with structured training for the first time in their lives.",
      "The mechanism is the same: progressive overload over time, protein above 0.8g per pound of bodyweight, adequate recovery. After 40 the recovery side of the equation simply carries more weight. A program that ignores recovery — or a week that ignores sleep — will stall faster than it would at 28.",
      "Coaching tracks the variables that actually predict results at this stage: progression over weeks, sleep quality, soreness patterns, and whether the training load is rising or just cycling. The weekly check-in catches the drift before it becomes a plateau.",
    ],
  },
  {
    h2: "Training around old injuries and cranky joints",
    paras: [
      "By 40, most men have something — a shoulder that clicks, a knee that does not love certain angles, a back that needs to be treated carefully. Generic programs do not account for any of this. 1:1 coaching does.",
      "The programming builds around your specific limitations: exercise selection that avoids the angles that hurt, load progressions that do not outrun your joints, warm-up protocols that prepare the tissue that needs it. The goal is not to work around injuries indefinitely but to build capacity gradually so you can handle more over time.",
      "Video form review is part of the process. Sending a set to Kris and getting cues back is not a workaround — it is the mechanism that catches the compensations that eventually become injuries.",
    ],
  },
  {
    h2: "Why crash programs fail harder at 40",
    paras: [
      "The all-or-nothing pattern — a hard reset, perfect eating, six days a week, then an injury or a stressful work month ends it — fails at any age but damages more at 40. Recovery takes longer, setbacks compound faster, and restarting from a lower base each time adds up.",
      "The coaching approach is the opposite: three quality sessions a week, progressive nutrition targets, a plan that accommodates hard months rather than pretending they will not happen. Boring is not a flaw in the method. Boring and consistent is exactly what produces the result.",
    ],
  },
  {
    h2: "Recovery: the variable that now decides results",
    paras: [
      "At 40, recovery is no longer a secondary concern. Sleep, stress load, training volume, and nutrition interact directly to determine how much the body adapts to training stimulus. Too much volume without recovery produces injury and stagnation. Too little volume produces nothing. The balance point shifts slightly toward recovery quality as the decade progresses.",
      "This is one of the core reasons 1:1 coaching is more valuable after 40: the coach can see when training load needs to pull back because the recovery data — sleep quality, energy levels, soreness persistence — says so. A self-guided program does not adjust dynamically. Weekly coaching does.",
    ],
  },
  {
    h2: "Fat loss after 40 without extreme dieting",
    paras: [
      "Fat loss after 40 follows the same mechanism it always has: a modest calorie deficit, a high protein intake, and resistance training to preserve muscle while the deficit runs. Extreme restriction does not work better at 40 — it works worse, because muscle loss accelerates under large deficits and recovery degrades.",
      "The coaching uses a moderate deficit — 200-300 calories below maintenance — with protein targets high enough to preserve muscle. Progress is measured by body composition, not just scale weight. The goal is a body that looks and performs better, which does not always mean a lower number on the scale.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Can I get back in shape at 40 (or 45)?",
    a: "Yes. Men in their late 30s and 40s respond strongly to structured strength training. The constraint is recovery management and programming precision, not capability. Getting back in shape after 40 is the same fundamentals as any age — with smarter recovery layered in.",
  },
  {
    q: "Is it too late to build muscle after 40?",
    a: "No. Muscle is built at any age. After 40 it is somewhat slower and demands better sleep, protein, and programming — exactly what coaching manages. Men in their 40s who have never trained systematically still have access to significant early-stage gains.",
  },
  {
    q: "Should men over 40 train differently?",
    a: "Longer warm-ups, smarter exercise selection, more deliberate recovery, and usually three quality sessions instead of six sloppy ones. The principles are identical: progressive overload, protein, consistency. The delivery gets more precise.",
  },
  {
    q: "What about testosterone?",
    a: "It falls slowly, not off a cliff. The Massachusetts Male Aging Study followed 1,156 men aged 40 to 70 and measured total testosterone dropping about 1.6% a year within each man, with androgen levels 10 to 15% higher in men free of chronic illness, obesity and heavy drinking (Feldman et al., 2002, PMID 11836290). Train, sleep and carry less body fat; anything beyond that is a conversation with your doctor, not a coaching pitch.",
  },
  {
    q: "I haven't trained in 15 years — where do I start?",
    a: "With less than you think: three short full-body sessions, a protein target, and a coach watching the ramp-up so enthusiasm does not outrun your tendons. Starting conservatively and progressing steadily beats an ambitious program that ends in injury in week three.",
  },
  {
    q: "Is online coaching safe for someone my age with no base?",
    a: "Programs start from your actual level, form is reviewed by video, and loads progress only when earned. That is safer than copying a 25-year-old's program off YouTube. The application and strategy call exist to understand your history and limitations before anything starts.",
  },
  {
    q: "Can a man over 35 still build serious muscle?",
    a: "Yes. Men in their mid-to-late 30s who have never trained systematically are still in the newbie-gains window — training age determines that window, not calendar age. The process takes slightly longer and demands more recovery attention than at 25, but the capacity for substantial muscle gain is fully intact. The testosterone-decline narrative is real but massively overstated in its practical effect on coached, progressive training.",
  },
  {
    q: "What is different about coaching someone over 35 vs a 25-year-old?",
    a: "More attention to exercise selection for joint health, longer deliberate warm-up protocols, planned deload weeks rather than waiting for an injury to force rest, and more emphasis on recovery monitoring. The programming fundamentals are identical. The delivery is more precise because the margin for recovery error narrows slightly after 35.",
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

// Breadcrumb coverage across /for was 0 of 21 pages (measured 2026-09-23).
// The /for hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Online Fitness Coach for Men Over 40",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach for Men Over 40",
  description:
    "Getting back in shape after 40 — the same fundamentals with smarter recovery. 1:1 coaching for men in their late 30s and 40s.",
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
  dateModified: "2026-10-13",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Men over 40 fitness" },
    { "@type": "Thing", name: "Getting back in shape after 40" },
    { "@type": "Thing", name: "Getting in shape after 35" },
    { "@type": "Thing", name: "Fitness for men in their late 30s" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Men Over 40",
  serviceType: "Online fitness coaching for men over 40",
  description:
    "1:1 online fitness coaching for men in their late 30s and 40s — recovery-smart programming, joint-friendly exercise selection, and real results.",
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

export default function MenOver40Page() {
  return (
    <>
      <JsonLd id="men-over-40-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="men-over-40-article-schema" data={articleSchema} />
      <JsonLd id="men-over-40-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for men over 40
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Getting back in shape after 40 is the same fundamentals with
            smarter recovery. What changes: joints need better warm-ups,
            recovery needs managing, and the all-or-nothing approach that
            &ldquo;worked&rdquo; at 25 now causes injuries and quitting.
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
              href="/for/men-in-their-30s"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For men in their 30s
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The same approach for men in the decade before — body
                recomposition, muscle building, and fat loss for 25-39.
              </span>
            </Link>
            <Link
              href="/blog/training-after-35-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                What changes about training after 35
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Testosterone drift, recovery demands, and fast-twitch fiber
                changes — the honest breakdown of the 35 inflection with
                the specific adjustments that keep results coming.
              </span>
            </Link>
            <Link
              href="/guides/getting-back-in-shape-after-a-long-break"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Getting back in shape after a long break
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Muscle memory, how fast it comes back, and the minimum week
                that keeps you from falling off again.
              </span>
            </Link>
            <Link
              href="/blog/creatine-for-men-over-30"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Creatine for men over 30
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What creatine does, the 5g/day protocol, and whether it is
                worth adding for men training in their 30s and 40s.
              </span>
            </Link>
            <Link
              href="/nutrition/muscle-after-40"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Building muscle after 40 diet
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What changes nutritionally after 40 — protein requirements, creatine evidence, calorie targets, and recomp expectations.
              </span>
            </Link>
            <Link
              href="/nutrition/longevity"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Nutrition for longevity evidence guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What evidence actually supports for long-term healthspan: body composition, muscle mass, olive oil, and protein targets.
              </span>
            </Link>
            <Link
              href="/for/busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If the main constraint is a packed calendar rather than age,
                this page covers that angle directly.
              </span>
            </Link>
            <a
              href="https://titanforgefit.com/collections/men-over-40-strength-and-recovery?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_contextual_link&utm_content=for%2Fmen-over-40"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Titan Forge&apos;s men-over-40 strength and recovery guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                A complementary Titan Forge decision guide covering training,
                recovery, protein, fat loss, and joint-aware progression after 40.
              </span>
            </a>
            <Link
              href="/blog/beginner-strength-training-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Beginner strength training for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The entry-level guide for men starting structured training
                for the first time — principles, not just exercises.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <Over40Path
          ctaId="for_men_over_40_send_kris"
          entryContent="for_men_over_40"
          eyebrow="Over 40 and starting again?"
          title="Send Kris your week and your history."
          body="Tell him your age, what you lift now, any old injuries, and how many days you can train. He builds the plan around that and adjusts it every week."
        />

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
          slug="men-over-40"
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
            Coaching built for where you are now
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
            minutes. The strategy call covers your history, limitations, and
            what a realistic starting point looks like.{" "}
            <TitanForgeSisterNote placement="for_men_over_40_cta" menOver40 />
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/does-protein-help-preserve-muscle-as-you-age"
              className="underline hover:text-bone"
            >
              whether protein preserves muscle as you age
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-strength-training-help-you-age-better"
              className="underline hover:text-bone"
            >
              whether strength training helps you age better
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-creatine-help-aging-adults"
              className="underline hover:text-bone"
            >
              what creatine does for aging adults
            </Link>
            , and{" "}
            <Link
              href="/science/questions/what-is-the-best-exercise-for-longevity"
              className="underline hover:text-bone"
            >
              the best exercise for longevity
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_over40_primary">
              Get a plan for training after 40
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
          source="men_over_40"
          eyebrow="Considering coaching?"
          title="Watch this before you decide."
          body="Kris explains what he looks for, what happens after an application, and how he decides whether 1:1 coaching is a fit."
          decisionHref="/coaching?utm_source=site&utm_medium=audience_page&utm_campaign=men_over_40"
          decisionLabel="See how 1:1 coaching works"
        />

        <HubRetentionCTA hub="men-over-40" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-10-13.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

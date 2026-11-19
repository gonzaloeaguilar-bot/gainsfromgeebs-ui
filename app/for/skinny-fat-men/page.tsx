import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import MoneyPageProof from "@/components/MoneyPageProof";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import KrisMediaFigure from "@/components/KrisMediaFigure";
import StatCards from "@/components/StatCards";
import JsonLd from "@/components/JsonLd";
import OfferRail from "@/components/OfferRail";
import { offerRailItems } from "@/lib/offerRail";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import { isScholarshipMoneyPage } from "@/lib/scholarshipAnchors";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";

/**
 * What this page actually prescribes.
 *
 * One source for the cards and the quick-answer paragraph. Note the protein
 * target differs from the beginners recomp guide (0.7-1) on purpose: that page
 * addresses untrained beginners, this one addresses skinny-fat men who need to
 * add muscle while holding a small deficit.
 */
const SKINNY_FAT_PLAN = {
  sessions: { value: "Three", unit: "a week", label: "Lifting sessions" },
  protein: { value: "0.8-1", unit: "g per lb", label: "Daily protein" },
  calories: { value: "Maintenance", unit: "or a small deficit", label: "Calories" },
} as const;

const SLUG = "/for/skinny-fat-men";
const DATE_MODIFIED = "2026-11-09";

export const metadata: Metadata = {
  title: "Skinny Fat Men: 3-Day Body Recomp Plan & Coaching | Geebs",
  description:
    "1:1 coaching for skinny fat men: 3-day full-body workouts, body recomp, 0.8–1.0g protein per pound, and maintenance calories to build muscle and lose belly fat in 2026.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Skinny Fat Men: 3-Day Body Recomp Plan & Coaching",
    description:
      "1:1 coaching for skinny fat men: 3-day full-body workouts, body recomp, 0.8–1.0g protein per pound, and maintenance calories to build muscle and lose belly fat in 2026.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "How to fix skinny fat for men with body recomposition coaching — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinny Fat Men: 3-Day Body Recomp Plan & Coaching",
    description:
      "1:1 coaching for skinny fat men: 3-day full-body workouts, body recomp, 0.8–1.0g protein per pound, and maintenance calories to build muscle and lose belly fat in 2026.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Can skinny fat be fixed?",
    paras: [
      "Yes, and faster than most expect. Skinny fat — thin arms, soft middle, normal-range weight — is the body type where standard advice fails twice: cutting makes you smaller and still soft; bulking adds fat to the gut first. Both approaches ignore the actual problem, which is low muscle mass.",
      "The fix is body recomposition: building muscle and losing fat at the same time. This is not a marketing claim — it is the measurable outcome of lifting 3 times a week with progressive overload, a modest deficit, and high protein. The scale barely moves. The mirror changes substantially. That is the recomp result.",
      "Skinny-fat men are prime recomposition candidates because untrained muscle responds quickly to progressive stimulus while a modest deficit pulls fat. If you have never lifted seriously, your recomp potential is at its highest right now.",
    ],
  },
  {
    h2: "How to fix being skinny fat",
    paras: [
      "The mechanism is recomposition: resistance training 3 times a week with progressive overload, protein at 0.8–1g per pound of bodyweight, and calories at or slightly below maintenance. Not a 500-calorie deficit — that is too aggressive for recomp and will slow muscle gain. The tighter margin is where most self-guided attempts fail.",
      "The sequence: compound movements — squat pattern, hinge, press, row — with progressive overload added weekly. Protein target hit every day. Calories moderate. Track body composition against strength gains, not the scale. Repeat consistently for 10–16 weeks. The scale barely moves; the mirror changes substantially.",
    ],
  },
  {
    h2: "How to cure skinny fat — what actually works vs what does not",
    paras: [
      "Cardio alone does not cure skinny fat — it removes some fat but leaves the muscle deficit intact, so you end up a lighter version of the same undefined shape. Restriction-only dieting does the same and often sacrifices muscle alongside fat, making body composition worse.",
      "What works: adding muscle through progressive resistance training while keeping the deficit small enough that muscle growth stays possible. That is the physiologically correct response to the skinny-fat body type. Most men who fix skinny fat are surprised how little the scale moves while the mirror changes substantially over 12 weeks.",
    ],
  },
  {
    h2: "Should skinny-fat men cut or bulk? (Neither first)",
    paras: [
      "The standard advice is to cut first or bulk first. For skinny-fat men, both options produce a worse body before they produce a better one — cutting makes you look smaller and still undefined; bulking adds fat you do not want to a frame that is already not where you want it.",
      "Recomposition with a small deficit — roughly 200-300 calories below maintenance — and 3 training sessions a week beats cut-then-bulk for this physique. You do not have to choose between being smaller or fatter before getting to the body you want. See the full breakdown at the cut vs recomp vs bulk guide.",
    ],
  },
  {
    h2: "How to stop being skinny fat",
    paras: [
      "Three things running together: progressive resistance training 3 times a week, a protein intake at or above 0.8g per pound of bodyweight, and a calorie target slightly below maintenance. Not below by 500+ calories — that is too aggressive for recomp and will slow muscle gain. The precision matters.",
      "This is exactly where 1:1 coaching earns its keep. Recomp has tighter margins than a simple cut or bulk. Calories, protein, and training progression need adjusting weekly against real data. That feedback loop — what actually happened this week versus what the plan assumed — is what coaching provides.",
      "The program is not complicated. Three sessions, one daily nutrition target, a weekly check-in where Kris reviews the data and adjusts. Most clients in this bracket see the scale stay relatively flat while the mirror changes meaningfully over 10-16 weeks.",
    ],
  },
  {
    h2: "Body recomposition for skinny fat — the method",
    paras: [
      "The Geebs method for skinny-fat men: progressive overload in the main compound lifts (squat pattern, hinge, push, pull), protein at 0.8-1g per pound of bodyweight, calorie target at or slightly below maintenance, and weekly adjustments against body composition data rather than scale weight alone.",
      "Scale weight is the wrong metric for recomposition. A 2 lb scale loss over 8 weeks that is entirely fat while muscle stays stable is a strong result. A 4 lb scale loss that includes muscle loss is not. Coaching tracks the right markers — how you look, how you perform, how your clothes fit — alongside the data.",
    ],
  },
  {
    h2: "Why cardio-only makes skinny fat worse",
    paras: [
      "Running and cardio reduce calories burned but do not add the training stimulus that builds muscle. A skinny-fat man who adds cardio without lifting loses some fat and some muscle, ending up lighter but with the same soft, undefined look — sometimes worse because the scale number hides the composition loss.",
      "Cardio has a legitimate role as a calorie lever and for cardiovascular health. But it is not the primary tool for skinny-fat recomposition. Resistance training is. Cardio supplements a lifting program; it does not replace it.",
    ],
  },
  {
    h2: "Macros for recomposition",
    paras: [
      "The two variables that determine recomp results are protein and total calories. Protein at 0.8-1g per pound of bodyweight preserves and builds muscle while the deficit pulls fat. Total calories at or slightly below maintenance — not aggressive restriction — keeps the training productive.",
      "The macro calculator on this site will give you starting numbers based on your bodyweight and goal. The coaching adjusts those numbers weekly against your actual data. First-pass targets are rarely perfect; weekly adjustment is what makes them work. More detail at the guide on body recomposition macros.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is a body recomposition plan for skinny fat men?",
    a: "A body recomposition plan for skinny fat men is usually three progressive lifting sessions per week, protein at roughly 0.8-1 gram per pound of bodyweight, calories at maintenance or a small deficit, and weekly adjustment from strength, photos, measurements, and recovery. Kris Oddo, NASM-CPT, applies that framework conservatively through Geebs Coaching.",
  },
  {
    q: "Can skinny fat actually be fixed?",
    a: "Yes, and faster than most expect. Skinny-fat men are prime recomposition candidates because untrained muscle grows quickly while a modest deficit pulls fat. The fix is recomposition — not cutting, not bulking, both at once.",
  },
  {
    q: "Should I lose the belly first or build muscle first?",
    a: "Neither in sequence. Recomposition with a small deficit and 3 weekly lifting sessions beats cut-then-bulk for skinny-fat physiques. You do not have to get smaller before you get better.",
  },
  {
    q: "Why am I skinny fat even though I'm not overweight?",
    a: "Low muscle mass, not high weight. Your BMI looks fine; your body composition does not. That is why scale-focused dieting never fixed it — losing weight without building muscle just makes you a smaller version of the same body.",
  },
  {
    q: "How long does fixing skinny fat take?",
    a: "Noticeable shape change in 10-16 weeks of consistent recomposition training and nutrition. The mirror changes before the scale does — expect the scale to barely move while your body composition improves substantially.",
  },
  {
    q: "Do I need a coach for this?",
    a: "Recomp has tighter margins than plain cutting or bulking — calories, protein, and training progression need adjusting against real weekly data. That feedback loop is what coaching provides. The $24.99/month community and $100 consult call are options for those who want lower-commitment starting points.",
  },
  {
    q: "Does this work if I've never lifted?",
    a: "Best-case scenario. Beginners recomp hardest and fastest. You have the highest untrained muscle response available, which is exactly the combination recomposition relies on.",
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
  title: "Skinny Fat Men: 3-Day Body Recomp Plan & Coaching",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Skinny Fat Men: 3-Day Body Recomp Plan & Coaching",
  description:
    "1:1 coaching for skinny fat men: 3-day full-body workouts, body recomp, 0.8–1.0g protein per pound, and maintenance calories to build muscle and lose belly fat in 2026.",
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
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Body recomposition" },
    { "@type": "Thing", name: "Skinny fat" },
    { "@type": "Thing", name: "Online fitness coaching" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Body Recomposition Coaching for Skinny-Fat Men",
  serviceType: "Body recomposition coaching for skinny-fat men",
  description:
    "1:1 online fitness coaching for skinny-fat men — recomposition training and nutrition coaching to build muscle and lose fat simultaneously.",
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

export default function SkinnyFatMenPage() {
  return (
    <>
      <JsonLd id="skinny-fat-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="skinny-fat-article-schema" data={articleSchema} />
      <JsonLd id="skinny-fat-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false}
        offerRail={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
{isScholarshipMoneyPage("/for/skinny-fat-men") ? <ScholarshipCallout sourcePath={"/for/skinny-fat-men"} /> : null}
                <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Body recomposition coaching for skinny-fat men
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Skinny fat is the one body type where standard advice fails twice —
            cutting makes you smaller and still soft, bulking adds fat to the
            gut first. The fix is body recomposition. If you have already tried
            both on your own, Kris uses your weekly training, nutrition, and
            progress data to adjust the plan before another month drifts by.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer: skinny fat body recomposition basics</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            A body recomposition plan for skinny fat men
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            A body recomposition plan for skinny fat men is usually{" "}
            {SKINNY_FAT_PLAN.sessions.value.toLowerCase()} progressive lifting
            sessions per week, protein at roughly {SKINNY_FAT_PLAN.protein.value}{" "}
            gram per pound of bodyweight, calories at maintenance or a small
            deficit, and weekly adjustment from strength, photos,
            measurements, and recovery instead of chasing scale weight alone.
            Kris Oddo, NASM-CPT, uses that framework conservatively through
            Geebs Coaching because skinny-fat men usually need more muscle
            while slowly pulling body fat down, not an aggressive cut or a
            sloppy bulk.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            The practical template is simple: squat or leg press, hinge, push,
            and pull three times per week; hit protein daily; keep the calorie
            deficit small enough that training performance can still improve.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* The plan, hoisted out of the sentence it was living in. Someone who
            searched "how to body recomp skinny fat" came for these three
            numbers, not for a paragraph that contains them. */}
        {/* Visual break before the plan cards. */}
        <KrisMediaFigure
          src="/media/kris/kris-oddo-gym-arrival.jpg"
          alt="Kris Oddo arriving at the gym"
          caption="Three sessions a week is the whole training requirement. Showing up is the part that decides it."
        />

        <div className="hair my-10 md:my-14" />

        <StatCards
          sectionId="skinny_fat_plan"
          heading="The plan, in three numbers"
          stats={[
            {
              label: SKINNY_FAT_PLAN.sessions.label,
              value: SKINNY_FAT_PLAN.sessions.value,
              unit: SKINNY_FAT_PLAN.sessions.unit,
              detail:
                "Squat or leg press, hinge, push, pull. Progressive, so the load goes up over time. That progression is what builds the muscle you are short of.",
            },
            {
              label: SKINNY_FAT_PLAN.protein.label,
              value: SKINNY_FAT_PLAN.protein.value,
              unit: SKINNY_FAT_PLAN.protein.unit,
              emphasis: true,
              detail:
                "Daily, not on average. This is the target that protects muscle while body fat comes down, and it is the one most people miss.",
            },
            {
              label: SKINNY_FAT_PLAN.calories.label,
              value: SKINNY_FAT_PLAN.calories.value,
              unit: SKINNY_FAT_PLAN.calories.unit,
              detail:
                "Small enough that training performance can still improve. An aggressive cut costs the muscle that fixes skinny fat in the first place.",
            },
          ]}
          footnote="Judge progress on strength, photos, measurements and recovery. Skinny-fat recomposition is the case where the scale is least useful."
        />

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

        <section aria-labelledby="recomp-plan">
          <h2
            id="recomp-plan"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Body recomposition plan for skinny fat men
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            If you want the plan in plain English, start here: train three days
            per week with progressive overload on a squat pattern, hinge, push,
            and pull; keep protein high every day; hold calories at maintenance
            or a small deficit; and review progress with photos, measurements,
            gym performance, and waist change instead of relying on the scale.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That plan works because skinny-fat men are usually under-muscled,
            not simply overweight. The training adds the missing stimulus, and
            the small deficit gives fat room to come down without crushing
            recovery.
          </p>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">
            {[
              {
                title: "1. Lift three times per week",
                body: "Build the week around full-body or upper/lower-biased sessions that repeat the main movement patterns and add load or reps over time.",
              },
              {
                title: "2. Keep protein high",
                body: "Use roughly 0.8-1 gram of protein per pound of bodyweight so muscle gain stays possible while fat comes down.",
              },
              {
                title: "3. Use a small calorie deficit",
                body: "Aim for maintenance or roughly 200-300 calories below it, not a hard cut that flattens training performance.",
              },
              {
                title: "4. Track the right markers",
                body: "Judge the plan with photos, waist, gym numbers, energy, and how clothes fit. Recomp often changes the mirror faster than the scale.",
              },
            ].map((item) => (
              <div key={item.title} className="py-4">
                <h3 className="text-bone text-[16.5px] md:text-[17px] font-semibold tracking-[-0.005em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] md:text-[15.5px] leading-[1.65] text-mute max-w-[62ch]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/blog/how-to-fix-skinny-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to fix skinny fat
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The full guide on skinny-fat recomposition — the mechanism,
                the programming, and what to expect.
              </span>
            </Link>
            <Link
              href="/blog/cut-vs-recomp-vs-bulk"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Cut vs recomp vs bulk
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                When to cut, when to bulk, and when recomposition is the right
                call — with a decision framework for each case.
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
                Estimate your recomp viability score, daily calorie target, and
                realistic 12-week expectation.
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
                Get your starting protein and calorie targets for
                recomposition — free, no sign-up required.
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
                Skinny fat is most common in men in their 30s — the decade
                when untrained muscle and a modest deficit combine for the
                strongest recomp results.
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
                The complete recomposition guide — training, nutrition, and
                what drives the result.
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
                Compare typical monthly coaching tiers, what each level includes,
                and how 1:1 pricing compares to templates.
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
          slug="skinny-fat-men"
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

        {/* The one money page on the site with no client proof at all.
            It sets offerRail={false} on the shell to avoid a duplicate offer
            rail, and renders a bare OfferRail instead of MoneyPageKit, so it
            also lost the proof MoneyPageKit carries. A page that ranks
            position 2.0 for "how to body recomp skinny fat" was asking for an
            application with nothing to believe. Same component the coaching
            cost guide uses, so the two top money pages now match. */}
        <MoneyPageProof
          eyebrow="Proof"
          title="What a skinny-fat recomp has actually produced"
          intro="Recomposition is the slowest thing to judge by eye, which is exactly why it needs numbers rather than adjectives. These are tracked clients, with permission, and the public reviews behind them."
        />

        <div className="hair my-10 md:my-14" />

        <OfferRail
          items={offerRailItems("skinny_fat_men_hub")}
          source="skinny_fat_men_hub"
        />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Start recomposition coaching
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you have already tried cutting or bulking without changing how
            you look, see{" "}
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
            , or{" "}
            <Link href="/skinny-fat" className="underline hover:text-bone">
              every skinny-fat guide on one page
            </Link>
            . 1:1 coaching is application-based — three questions, under two
            minutes.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the peer-reviewed evidence first, start with the
            research on{" "}
            <Link
              href="/science/questions/can-you-build-muscle-and-lose-fat-at-the-same-time"
              className="underline hover:text-bone"
            >
              whether you can build muscle and lose fat at the same time
            </Link>
            ,{" "}
            <Link
              href="/science/questions/should-you-cut-or-recomp-first"
              className="underline hover:text-bone"
            >
              whether to cut or recomp first
            </Link>
            , and{" "}
            <Link
              href="/science/questions/how-do-you-avoid-losing-muscle-while-dieting"
              className="underline hover:text-bone"
            >
              how to avoid losing muscle while dieting
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_skinnyfat_primary">
              Get a recomp plan for your body
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

{isScholarshipMoneyPage("/for/skinny-fat-men") ? <ScholarshipSection sourcePath={"/for/skinny-fat-men"} /> : null}
                <HubRetentionCTA hub="skinny-fat-men" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

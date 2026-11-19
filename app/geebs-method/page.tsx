import MoneyPageKit from "@/components/MoneyPageKit";
import EntityLine from "@/components/EntityLine";
import { ORG_NAME } from "@/lib/entity";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MethodLevers from "@/components/MethodLevers";
import { geebsMethodSchema } from "@/lib/geebsMethod";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import KrisTrainingBroll from "@/components/KrisTrainingBroll";
import { krisTrainingVideoSchema } from "@/data/krisMedia";
import PageByline from "@/components/PageByline";
import KeyTakeaways from "@/components/KeyTakeaways";
import ProofRail from "@/components/ProofRail";
import { aggregateProof, clientResults } from "@/data/clientResults";

const SITE_URL = "https://gainsfromgeebs.com";
// Single source for this page's freshness: the schema dateModified and the visible
// byline read the same constant so they cannot disagree.
//
// Bumped 2026-10-12: the full lever-by-lever breakdown that used to live at
// /blog/what-is-the-geebs-method was folded into this page (that URL now
// redirects here), and the section order was rebuilt against a phone-viewport
// pressure test: proof moved up from screen 6.6 to screen 2, the four levers
// moved into normal document flow, and "what it is not" moved up from 5.3.
const DATE_MODIFIED = "2026-10-12";
const SLUG = "/geebs-method";

export const metadata: Metadata = {
  title: "The Geebs Method | Kris Oddo's Coaching System",
  description:
    "The Geebs Method is Kris Oddo's coaching system for men and women: individualized hard training, nutrition that supports training, recovery, and daily accountability for imperfect weeks.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "The Geebs Method | Kris Oddo's Coaching System",
    description:
      "A coach-led system built around individualized hard training, nutrition that supports the work, recovery habits, and daily accountability.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "The Geebs Method by Kris Oddo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Geebs Method | Kris Oddo's Coaching System",
    description:
      "Training, nutrition, recovery, and daily accountability built for the weeks that do not go perfectly.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const methodSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "The Geebs Method",
  alternateName: "Geebs Method",
  url: `${SITE_URL}${SLUG}`,
  creator: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
  },
  description:
    "The Geebs Method is Kris Oddo's coach-led system for men and women. It combines individualized hard training, nutrition that supports training, recovery habits, and daily accountability for imperfect weeks.",
  about: [
    { "@type": "Thing", name: "body recomposition" },
    { "@type": "Thing", name: "strength training" },
    { "@type": "Thing", name: "nutrition coaching" },
    { "@type": "Thing", name: "accountability coaching" },
  ],
  datePublished: "2026-05-31",
  dateModified: DATE_MODIFIED,
};

// One FAQPage, merging the page's original five questions with the two
// unique questions the old /blog/what-is-the-geebs-method FAQ carried (why
// Kris named it, how training gets individualized). No duplicate FAQPage
// block ships on this page anymore.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The Geebs Method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Geebs Method is Kris Oddo's coaching system for men and women. It combines individualized hard training, nutrition that supports training, recovery habits, and daily accountability so the plan keeps moving when the client's week is not perfect.",
      },
    },
    {
      "@type": "Question",
      name: "Who is The Geebs Method for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Geebs Method is built for clients who want to lose fat, build muscle, and stay consistent but have not been able to keep results with apps, templates, or self-coaching alone.",
      },
    },
    {
      "@type": "Question",
      name: "Why did Kris name it the Geebs Method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A named method gives the coaching a clear anchor. A client is not just buying workouts, macros, or messages. They are buying a feedback loop that keeps those pieces connected while the week is happening.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Geebs Method individualize training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The plan is built around the actual client: body, schedule, equipment, training history, and limitations. If a client lacks a machine or a movement causes pain, the plan changes instead of forcing the same template on everyone.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Geebs Method a guaranteed transformation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Geebs Method is a coaching process, not a guaranteed outcome claim. Client results depend on execution, adherence, starting point, and life constraints.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a client misses a workout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A missed workout does not get ignored, and it does not automatically break the week. Kris notices the miss, moves the session when possible, and adjusts the week so the client gets back on track quickly.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a client goes over calories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Geebs Method looks at the full week, not one imperfect day. If a client with a 2,200-calorie target has two 2,400-calorie days, Kris brings later days down so the weekly average still points toward the goal.",
      },
    },
  ],
};

const checkpoints = [
  "If a workout gets missed, where can it move before the week is over?",
  "If calories run high for two days, how should the rest of the week adjust?",
  "Does this client know what high-effort training should feel like yet?",
  "Are protein, carbs, and fats supporting the training instead of fighting it?",
  "What needs to change now so one bad day does not become a full reset?",
];

// Screen 1, below the fold line: the four levers named plainly, in three
// bullets, before the reader scrolls past the first screen.
const keyTakeaways = [
  {
    title: "Four levers, run together",
    detail:
      "Training, nutrition, recovery, and daily accountability. Not four separate habits — one feedback loop Kris adjusts every week.",
  },
  {
    title: "Built for weeks that do not go perfectly",
    detail:
      "A missed workout moves. A high-calorie day gets balanced across the rest of the week instead of resetting it.",
  },
  {
    title: "Daily contact, not just a weekly call",
    detail:
      "Kris messages through the day so a miss gets caught while there is still time to fix the week, not after it is gone.",
  },
];

export default function GeebsMethodPage() {
  return (
    <main className="method-calm bg-grain relative min-h-screen">
      <JsonLd id="geebs-method-schema" data={methodSchema} />
      <JsonLd id="geebs-method-definedterm-schema" data={geebsMethodSchema()} />
      <JsonLd id="geebs-method-faq-schema" data={faqSchema} />
      <JsonLd id="geebs-method-training-video-schema" data={krisTrainingVideoSchema} />

      <article className="mx-auto max-w-[980px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        {/* Screen 1 — answer-first: what it is, who it's for, one claim, CTA. */}
        <header className="max-w-[760px]">
          <p className="eyebrow text-cloudText">The Geebs Method</p>
          <h1 className="display mt-4 text-bone text-[40px] sm:text-[50px] md:text-[62px] leading-[1.05]">
            Kris Oddo&apos;s 1:1 coaching system for people who can&apos;t stay
            consistent alone.
          </h1>
          <EntityLine className="mt-3" />
          <p className="mt-6 text-[16px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[62ch]">
            Four things, coached together: hard individualized training,
            nutrition that supports it, recovery, and daily accountability
            that catches a miss before the week is gone.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="method_primary">
              Get the method applied to your week
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <div className="mt-8 md:mt-10 max-w-[760px]">
          <KeyTakeaways takeaways={keyTakeaways} sectionId="geebs_method_key_takeaways" />
        </div>

        <div className="hair my-10 md:my-14" />

        {/* Screen 2 — proof: named clients, real numbers, Kris's own photos
            and training clips. Moved up from the bottom of the page because
            "is this real" is the first objection, not the last. */}
        <section
          aria-labelledby="aggregate-proof"
          className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:items-start md:gap-12"
        >
          <div className="max-w-[760px]">
            <p className="eyebrow text-cloudText">The record</p>
            <h2 id="aggregate-proof" className="display mt-3 text-balance text-[28px] md:text-[36px] leading-[1.1] text-bone">
              What clients actually get from it.
            </h2>
            <div className="mt-6 grid gap-4">
              {aggregateProof.map((item) => (
                <div key={item.label} className="border-y border-line2 py-5 md:py-8">
                  <p className="eyebrow text-cloudText">{item.label}</p>
                  <p className="display method-figure mt-3 text-bone">
                    {item.value}
                  </p>
                  <p className="mt-4 max-w-[34ch] text-[16px] leading-[1.55] text-mute">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <figure className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-2xl border border-line2 md:mt-0 md:block">
            <Image
              src="/coaching/kris-client-coaching-close.jpg"
              alt="Kris Oddo coaching a client through a machine press set in the gym"
              width={1200}
              height={1800}
              sizes="300px"
              className="h-full w-full object-cover"
            />
          </figure>
        </section>

        <div className="mt-8 md:mt-10">
          <ProofRail results={clientResults} aggregate={[]} source="geebs_method_page" />
        </div>

        <div className="mt-10 md:mt-14">
          <KrisTrainingBroll />
        </div>

        <div className="hair my-10 md:my-14" />

        {/* Screen 3 — the four levers, in normal document flow (not a hidden
            tab/accordion state): the overview grid, then each lever as its
            own question-shaped section with the real breakdown. 100-180
            words each, one concrete fact each, in the raw server-rendered
            HTML an AI crawler and a human both see on load. */}
        <section
          aria-labelledby="method-pillars"
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="md:col-span-2 max-w-[680px]">
            <p className="eyebrow text-cloudText">The operating idea</p>
            <h2
              id="method-pillars"
              className="display mt-3 text-[28px] md:text-[36px] leading-[1.06] text-bone"
            >
              Four levers, coached while life is happening.
            </h2>
            <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute max-w-[62ch]">
              The method is not a magic exercise list. It is training hard
              enough, eating to support the training, recovering well enough
              to repeat it, and having a coach who notices when the plan
              starts to slip.
            </p>
          </div>

          <div className="md:col-span-2">
            <MethodLevers />
          </div>
        </section>

        <section aria-labelledby="lever-1-heading" className="mt-10 max-w-[720px]">
          <h3 id="lever-1-heading" className="display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Lever 1: how does training get individualized?
          </h3>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
            Training starts with hard weight training: lifts, reps, sets, and
            execution improving over time. Kris treats hard training as the
            main engine of body composition change, not random calorie
            burning.
          </p>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute">
            The plan is built around the actual client: body, schedule,
            equipment, training history, and limitations. If a client lacks
            a machine, or a movement causes pain, the plan changes. The
            training standard stays high. The exercise does not.
          </p>
        </section>

        <section aria-labelledby="lever-2-heading" className="mt-10 max-w-[720px]">
          <h3 id="lever-2-heading" className="display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Lever 2: how does nutrition support the training?
          </h3>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
            Kris&apos;s starting point is roughly 0.8 grams of protein per
            pound of bodyweight a day. For a 200-pound client, that is about
            160 grams, spread across 3 to 5 meals, with carbs and fats built
            around that floor.
          </p>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute">
            The goal is not a perfect meal plan. It is a better relationship
            with food: knowing right from wrong with macros, cooking more,
            and feeling the difference when the body is fueled well.
          </p>
          <details className="group border-b border-line2 py-1 last:border-b-0">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText">
              <h3 className="prose-h3 font-semibold leading-[1.3] tracking-normal text-bone">
                How the macro math gets set for someone
              </h3>
              <span
                aria-hidden="true"
                className="shrink-0 text-[20px] leading-none text-mute transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="prose-small max-w-[64ch] pb-5 pr-10 text-mute">
              Most clients are in a fat-loss phase rather than a
              muscle-building block, so protein protects lean mass in a
              deficit without making the diet hard to stick to. See the{" "}
              <Link href="/methodology" className="underline hover:text-bone">
                methodology page
              </Link>{" "}
              for the research this range is anchored to.
            </p>
          </details>
        </section>

        <section aria-labelledby="lever-3-heading" className="mt-10 max-w-[720px]">
          <h3 id="lever-3-heading" className="display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Lever 3: what does recovery actually mean here?
          </h3>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
            Sleep, soreness, stress, and fatigue change how a client should
            train. Kris treats sleep as a training variable, not a soft
            suggestion, and nutrition as a major recovery lever alongside it.
          </p>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute">
            Recovery does not mean taking it easy forever. It means the
            client can train hard, recover from the work, and come back
            ready enough to repeat it the next week.
          </p>
        </section>

        <section aria-labelledby="lever-4-heading" className="mt-10 max-w-[720px]">
          <h3 id="lever-4-heading" className="display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Lever 4: what does daily accountability look like?
          </h3>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
            Kris messages in the morning, through the day, and at night, and
            adds calls when a client needs more. Daily contact keeps the
            week from becoming a mystery the way one weekly review can.
          </p>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute">
            A missed workout gets noticed. A nutrition issue gets discussed.
            A client who is drifting gets pulled back before the week turns
            into another restart.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Screen 4 — the biggest objection ("is this different from an
            app?"), moved up from screen 5.3. */}
        <section className="max-w-[760px]">
          <p className="eyebrow text-cloudText">What it is not</p>
          <h2 className="display mt-3 text-[28px] md:text-[36px] leading-[1.06] text-bone">
            Not an outcome promise. Not an app. Not a copied plan.
          </h2>
          <p className="mt-5 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85">
            The Geebs Method is a process, not a template. Every client
            starts with different training history, stress, sleep, and
            adherence. The promise is the coaching structure: Kris reads the
            week, adjusts the plan, and keeps the client from drifting.
          </p>
          <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute">
            It is also not built for someone who needs perfect before
            starting. A flawless meal plan, a flawless schedule, and a
            flawless week are the exact pattern this method is built to
            break.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Screen 5 — FAQ as native <details>, already served and open to
            crawlers in the raw HTML; collapsed only changes what a human
            sees first. */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <div className="hair my-10 md:my-14" />

        {/* Depth that would bloat the scroll: why it works, why Kris named
            it, imperfect weeks, the first 90 days, and autonomy. Still
            server-rendered, so the facts exist for a crawler on first byte;
            collapsed only changes what a scrolling human meets first. */}
        <details className="group rounded-lg border border-line2 bg-black/20 max-w-[760px]">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText">
            <h3 className="font-semibold leading-[1.3] tracking-normal text-bone text-[16px]">
              Read the full breakdown: why it works, imperfect weeks, and the first 90 days
            </h3>
            <span
              aria-hidden="true"
              className="shrink-0 text-[20px] leading-none text-mute transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <div className="mt-6 px-5 pb-5 md:px-6 md:pb-6">
            <h3 className="display text-bone text-[22px] md:text-[26px] leading-[1.1]">
              The plan is not supposed to be perfect.
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-bone/85">
              A spreadsheet can tell someone what to do. The Geebs Method is
              about what happens when the client misses a workout, goes over
              macros, sleeps poorly, or has a weekend that does not match
              the plan.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-mute">
              Kris still cares about the evidence: progressive overload,
              protein, recovery, and consistency. The difference is that a
              miss gets handled while there is still time to save the week.
              A skipped workout can move. A high-calorie day can balance
              across the week. The plan bends before it breaks.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-mute">
              That is also why Kris gave it a name. A client is not buying
              workouts, macros, or messages separately. They are buying the
              feedback loop that keeps those pieces connected.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-line2 bg-black/20 p-5">
            <p className="eyebrow text-cloudText">Weekly coaching checks</p>
            <ul className="mt-5 space-y-4">
              {checkpoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cloud"
                  />
                  <span className="text-[16px] leading-[1.65] text-bone/82">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="display text-bone text-[22px] md:text-[26px] leading-[1.1]">
              How the method handles a bad week
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-bone/85">
              The Geebs Method assumes clients will miss sometimes. If a
              workout gets missed, Kris looks for where it can move, often
              to the weekend. One miss should not read as the whole week
              being gone.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-mute">
              Nutrition works the same way. A client with a 2,200-calorie
              target who has two 2,400-calorie days can still manage the
              week by bringing later days down. The point is to stop an
              imperfect day from becoming a full reset.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="display text-bone text-[22px] md:text-[26px] leading-[1.1]">
              What a client should learn in 90 days
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-bone/85">
              Kris wants clients to leave with a better relationship with
              nutrition: understanding macros, knowing what a better food
              decision feels like, and seeing that eating well can make the
              body feel better. Not just look better.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-mute">
              He also wants clients to learn how hard they should be
              training. Someone who finishes a serious block still on
              autopilot has not learned the intensity standard yet, and that
              standard keeps working after the coaching ends.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="display text-bone text-[22px] md:text-[26px] leading-[1.1]">
              Building autonomy
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-bone/85">
              The method is designed to build a client&apos;s own capacity
              to manage progress: anticipating challenges, making informed
              training and nutrition decisions, and adapting the plan when
              life changes.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-[16px] leading-[1.7] text-mute">
              For the evidence and citations behind the four levers, read
              the{" "}
              <Link href="/methodology" className="underline hover:text-bone">
                methodology page
              </Link>
              . For pricing, see{" "}
              <Link
                href="/guides/how-much-does-an-online-fitness-coach-cost"
                className="underline hover:text-bone"
              >
                how much an online fitness coach costs
              </Link>
              {" "}and the{" "}
              <Link
                href="/resources/online-fitness-coaching-cost-faq"
                className="underline hover:text-bone"
              >
                online fitness coaching cost FAQ
              </Link>
              . If you are comparing the investment, read{" "}
              <Link
                href="/blog/is-online-fitness-coaching-worth-it"
                className="underline hover:text-bone"
              >
                whether online fitness coaching is worth it
              </Link>
              .
            </p>
          </div>
        </details>

        <div className="hair my-10 md:my-14" />

        {/* Screen 6 — single CTA. No second hero-banner restating the page. */}
        <section className="max-w-[760px]">
          <h2 className="display text-bone text-[28px] md:text-[36px] leading-[1.08]">
            If you want the method applied to your week, apply.
          </h2>
          <p className="mt-5 text-[16px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The application tells Kris where you are starting and whether
            1:1 coaching is the right next step.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="method_primary">
              Get the method applied to your week
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
      <div className="mx-auto max-w-[860px] px-6 md:px-10 pb-10">
        <PageByline updated={DATE_MODIFIED} />
      </div>
    </main>
  );
}

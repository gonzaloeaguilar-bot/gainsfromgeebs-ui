import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/men-who-travel-for-work";
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-10-19";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=men_who_travel_for_work_cta";

export const metadata: Metadata = {
  title: "Online Fitness Coach for Men Who Travel for Work | Geebs Coaching",
  description:
    "1:1 online fitness coaching for men who travel frequently for work — hotel-gym programming, road nutrition, timezone management, and daily accountability with NASM-CPT coach Kris Oddo.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Men Who Travel for Work",
    description:
      "Coach-led fitness for frequent business travelers: hotel-gym workouts, road nutrition, and a plan that survives 10 travel days a month.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for men who travel for work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Men Who Travel for Work",
    description:
      "1:1 coaching built for frequent business travelers — hotel gyms, airport eating, and zero predictability.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Travel does not break fitness — the plan does",
    paras: [
      "Business travel does not have to end your progress. What ends progress is a plan that was never built to survive it. Five gym days and a meal-prep schedule work until the first flight, and then the whole structure collapses because the plan had no contingency for the version of your life where you are actually living it.",
      "Frequent travelers — weekly flights, back-to-back conferences, monthly international trips — need a coaching system designed from the start around inconsistency. Not a program that tolerates some travel. A program that treats travel as the default environment, not the exception.",
      "Geebs Coaching is built for exactly this. The plan assumes you will be in a hotel gym with a cable machine and a few dumbbells sometimes. It assumes you will eat at airports, sit in rental cars, and run on six hours of sleep after a red-eye. That is not a problem to manage around. That is the environment the program was designed for.",
    ],
  },
  {
    h2: "Hotel-gym programming that still produces results",
    paras: [
      "A hotel gym is not an obstacle. It is a constraint, and constraints can be programmed around. The core of the Geebs method is progressive overload with whatever equipment is available — cables, dumbbells, a bench, bodyweight if nothing else.",
      "Every travel block in the program has a mapped alternative. The home gym version and the hotel version are planned in advance, not improvised the morning you land. You do not lose a week figuring out what to do. You open the app and follow the hotel protocol.",
      "The question is not whether you can train on the road. Most men can. The question is whether your program accounts for it systematically. A coach who adjusts the week in real time — before you land, not after you get back — is the difference between maintaining progress and restarting it.",
    ],
  },
  {
    h2: "Maintaining versus progressing — a real answer",
    paras: [
      "The honest answer for frequent travelers is this: maintaining is a valid and ambitious goal, and the line between maintaining and progressing is thinner than most programs admit. Clients who travel ten to fifteen days a month and follow a structured hotel protocol still build measurable strength and change their body composition. The gains are slower than a consistent-gym block. The alternative is the restart cycle.",
      "Coaching adjusts expectations and targets to the block in front of you. A heavy travel month calls for a maintenance-first target with whatever bonus progress the hotel sessions allow. A home stretch calls for pushing the progression. That calibration is what a coach does. An app gives you the same target regardless.",
    ],
  },
  {
    h2: "Eating at restaurants and airports — a practical framework",
    paras: [
      "Nutrition on the road does not require perfect choices. It requires a framework that works at an airport grab-and-go, a business dinner, or a hotel breakfast buffet. The Geebs nutrition approach on travel weeks is anchored to two simple targets: protein and rough calorie awareness. Not a rigid meal plan. Not a list of approved foods.",
      "Most airports have adequate protein options. Most client dinners have a protein anchor you can build a plate around. Most hotel breakfasts have eggs. The framework is to hit protein, avoid the obvious calorie traps, and let the week average out. That is different from trying to execute a strict plan in an environment that will not cooperate.",
    ],
  },
  {
    h2: "Timezone shifts, sleep disruption, and training recovery",
    paras: [
      "Jet lag and poor travel sleep change what your body can do in the gym. Acknowledging this is not an excuse — it is programming intelligence. A coach who knows you crossed four time zones yesterday programs a lower-intensity session, not a PR attempt.",
      "Recovery is a training variable. On brutal-travel weeks, the program reduces volume and prioritizes movement over maximum stimulus. The goal is to keep the habit intact, keep the body trained, and set up the home-gym block that follows for real progress.",
    ],
  },
  {
    h2: "Do I need a hotel with a gym?",
    paras: [
      "No. Ideally, yes — a cable machine and a set of adjustable dumbbells is the optimal hotel setup. But the program is designed to function without it. A bodyweight protocol, resistance bands, or a hotel gym with minimal equipment is enough to maintain training when a full gym is not available.",
      "Clients who travel to locations with no gym access use the low-equipment protocol. It is not a replacement for consistent progressive training, but it is far better than skipping the week and resuming from a reset. A week of bodyweight training and maintained nutrition is a good week on the road.",
    ],
  },
];

const faqs = [
  {
    q: "What are the best fitness coaches for travel-heavy schedules?",
    a: "The best fitness coaches for travel-heavy schedules build hotel-gym programming, road nutrition defaults, and recovery adjustments directly into the plan — not as afterthoughts. Kris Oddo, NASM-CPT, coaches frequent business travelers through Geebs Coaching with pre-planned hotel protocols, a road nutrition framework anchored to protein targets, and session adjustments calibrated to jet lag and sleep disruption.",
  },
  {
    q: "Can I make real progress with a fitness coach while traveling frequently?",
    a: "Yes, including on progress — not just maintenance. The plan is built around your travel calendar from the start. Home-gym blocks push progression; hotel weeks follow a mapped hotel protocol. Clients who travel ten or more days a month still build measurable strength and body composition change. Slower than a fully consistent block, but consistent beats the restart cycle.",
  },
  {
    q: "What does a hotel gym workout look like in this program?",
    a: "Every travel block has a pre-planned hotel-gym version mapped to the equipment a typical hotel gym has: cables, dumbbells, a bench, and bodyweight. You open the app and follow the hotel protocol — no improvising, no losing a workout to figuring out what to do. If the hotel has no gym, there is a low-equipment bodyweight alternative.",
  },
  {
    q: "How should I eat at airports and business dinners?",
    a: "The travel nutrition framework is anchored to two targets: protein and rough calorie awareness. Most airports have adequate protein options. Most business dinners have a protein anchor you can build a plate around. The approach does not require a rigid meal plan — it requires a simple framework that works in environments you cannot control.",
  },
  {
    q: "What about jet lag and losing sleep on red-eyes?",
    a: "Sleep disruption affects what your body can do in the gym, and the program adjusts for it. After a cross-timezone trip or a red-eye, the session is programmed lower-intensity — movement and habit maintenance, not a PR. Recovery is a training variable, not a personal failure.",
  },
  {
    q: "Should I try to maintain or progress during a heavy travel month?",
    a: "Maintenance is the target on a heavy travel block, with whatever bonus progress the hotel sessions allow. A home stretch with full gym access is when the program pushes harder. That calibration — adjusted block by block to your actual calendar — is what makes the plan survive a real travel schedule.",
  },
  {
    q: "Do I need a hotel with a gym to do this coaching?",
    a: "No, though it helps. The program has a low-equipment bodyweight protocol for hotels without gym access. A week of bodyweight training and maintained nutrition is still a good week on the road — far better than skipping and restarting.",
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
  title: "Online Fitness Coach for Men Who Travel for Work",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach for Men Who Travel for Work",
  description:
    "1:1 online fitness coaching for frequent business travelers — hotel-gym programming, road nutrition, and daily accountability.",
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
    { "@type": "Thing", name: "Online fitness coaching for business travelers" },
    { "@type": "Thing", name: "Hotel gym workout programming" },
    { "@type": "Thing", name: "Fitness for men who travel for work" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Online fitness coaching for men who travel for work",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach, NASM-CPT",
    url: `${SITE_URL}/about`,
  },
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "1:1 online fitness coaching for frequent business travelers: hotel-gym programming, road nutrition framework, timezone-aware recovery, and daily accountability.",
  url: `${SITE_URL}${SLUG}`,
};

export default function MenWhoTravelPage() {
  return (
    <>
      <JsonLd id="travel-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="travel-article-schema" data={articleSchema} />
      <JsonLd id="travel-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for men who travel for work
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Built for frequent business travelers: hotel-gym protocols, road
            nutrition, timezone-aware recovery, and a coach who adjusts the week
            before you land — not after you get back.
          </p>
          <ProofStrip className="mt-6" />
        </header>

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
            The best fitness coaches for travel-heavy schedules
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            The best fitness coaches for travel-heavy schedules build hotel-gym
            protocols, road nutrition frameworks, and recovery adjustments
            directly into the program &mdash; not as afterthoughts you figure
            out on the road yourself. Kris Oddo, NASM-CPT, coaches frequent
            business travelers through Geebs Coaching by pre-planning both the
            home-gym and the hotel-gym version of each training block,
            anchoring road nutrition to protein targets instead of a rigid meal
            plan, and adjusting session intensity around jet lag and travel
            sleep disruption.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            The key differentiator: a coach who accounts for your travel
            calendar before each week starts is categorically different from an
            app or static program that hands you the same template regardless
            of what the week actually looks like.
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

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Read the travel fitness guide
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The full breakdown of how to program travel weeks, structure road
            nutrition, and avoid the restart cycle is in the{" "}
            <Link
              href="/blog/fitness-plan-for-men-who-travel-for-work"
              className="underline hover:text-bone"
            >
              fitness plan for men who travel for work
            </Link>
            . Related reading: how to{" "}
            <Link
              href="/blog/how-to-lose-belly-fat-with-client-dinners"
              className="underline hover:text-bone"
            >
              manage fat loss on client dinners
            </Link>{" "}
            and our guide on{" "}
            <Link
              href="/nutrition/nutrition-for-frequent-business-travelers"
              className="underline hover:text-bone"
            >
              nutrition strategies for frequent business travelers
            </Link>
            .
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/tools/body-recomposition-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Estimate calories and protein for recomp before a travel-heavy
                coaching block.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coaching cost guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Compare support levels if you travel often and need more than a
                static workout app.
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
                Coaching built around packed calendars and real weeks.
              </span>
            </Link>
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
              href="/for/accountability"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Fitness accountability coaching
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                When consistency is the real problem, not the program.
              </span>
            </Link>
            <Link
              href="/for/men-over-40"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For men over 40
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Recovery-first programming for men in their late 30s and 40s.
              </span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="for_primary">
              Get a plan built for your schedule
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/blog/fitness-plan-for-men-who-travel-for-work"
              className="btn btn-secondary"
            >
              Read the travel fitness guide
              <span aria-hidden="true">→</span>
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
          slug="men-who-travel-for-work"
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
            A plan that survives the road
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            1:1 coaching is application-based — three questions, under two
            minutes. The $100 one-time consultation call is the lower-cost entry
            point if you are not ready to apply.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
            </Link>
            ,{" "}
            <Link
              href="/science/questions/can-caffeine-save-a-bad-night-of-sleep"
              className="underline hover:text-bone"
            >
              whether caffeine can save a bad night of sleep
            </Link>
            , and{" "}
            <Link
              href="/science/questions/does-protein-timing-matter-for-muscle"
              className="underline hover:text-bone"
            >
              whether protein timing matters when meals are irregular
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="for_primary">
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

        <HubRetentionCTA hub="men-who-travel-for-work" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

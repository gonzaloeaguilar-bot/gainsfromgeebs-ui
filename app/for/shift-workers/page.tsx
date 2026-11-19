import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import BusyProCluster from "@/components/BusyProCluster";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/shift-workers";
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-10-27";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=shift_workers_bottom_cta";

export const metadata: Metadata = {
  title:
    "Online Fitness Coach for Shift Workers | Night-Shift Fitness Plan",
  description:
    "1:1 coaching for shift workers, night-shift workers, and FIFO workers: training relative to wake time, meal prep around rotations, and recovery-aware programming.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Shift Workers | Night-Shift Fitness Plan",
    description:
      "Generic fitness programs assume a 9–5. Shift work doesn't. 1:1 coaching built for rotating schedules, night shifts, and FIFO workers.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for shift workers — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Shift Workers",
    description:
      "Your morning is 6pm. Generic plans don't account for that. 1:1 coaching that actually fits a rotating schedule.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Training on night shifts: when to work out if you sleep during the day",
    paras: [
      "The rule is simple: train within 2–4 hours of waking, regardless of what the clock says. If you sleep from 8am to 4pm, your training window is 4–6pm — the same relative position as a 6am waker training at 8am. The body does not care about the clock; it responds to its position in the wake-sleep cycle.",
      "The breakdown with generic programs is that they schedule sessions at fixed times — 6am, 7pm — that have no relationship to a shift worker's circadian position. A plan that tells a night-shift worker to train at 6am is telling them to train in the middle of their sleep window. That is why standard plans break immediately on a rotating schedule.",
      "The 1:1 coaching model adapts to your actual rotation every week. When the schedule rotates — day shifts one block, nights the next — the programming adjusts accordingly rather than holding a fixed session time that stops working the moment the shift changes.",
    ],
  },
  {
    h2: "Meal prep for a rotating schedule — what actually works",
    paras: [
      "Batch cooking is the only practical system for rotating schedules. Two or three cook sessions per week regardless of which shift is running: protein sources that work cold (hard-boiled eggs, Greek yogurt, cottage cheese, cooked chicken or beef), starchy carbs in containers, and vegetables that do not degrade quickly.",
      "The goal of meal prep for shift workers is removing decisions, not optimizing meal timing. When you finish a 12-hour night shift at 6am and need to eat before sleeping, the food needs to be there and ready — not something you cook while exhausted. The coaching framework builds around your actual food environment and your specific rotation.",
      "Meal timing relative to training matters; meal timing relative to the clock does not. Protein within 1–2 hours of training, adequate carbohydrate before and after — these principles hold whether your training session is at 4am, 4pm, or 2am after a night shift.",
    ],
  },
  {
    h2: "Sleep and shift work: managing recovery when your schedule rotates",
    paras: [
      "Rotating schedules create real recovery challenges. When a schedule flips from days to nights, sleep quality typically drops for several days as the circadian rhythm adjusts. During transition weeks, training volume is reduced and intensity expectations are lower — the programming reflects the recovery reality, not a fixed template.",
      "Total sleep is more important than perfect sleep architecture. The practical target is 7+ hours of total sleep regardless of when it falls. Shift workers who average 6 hours consistently show degraded recovery and training adaptation. That is the variable the coaching monitors — not by adding complexity, but by adjusting programming when low-sleep signals appear.",
      "Note: sleep disruption from shift work has real metabolic and health implications. The coaching handles the training and nutrition variables within its scope. Persistent sleep issues are a conversation with a physician, not a coaching problem.",
    ],
  },
  {
    h2: "Can shift workers make real fitness progress?",
    paras: [
      "Yes. The adaptation mechanisms — progressive overload, protein synthesis, fat oxidation — do not require a 9–5 schedule. What they require is consistency over time: progressive training, adequate protein, and sufficient sleep. Shift workers who achieve those three things build muscle and lose fat at roughly the same rate as their office-worker counterparts.",
      "FIFO (fly-in-fly-out) workers face a specific version of this challenge: extended blocks of on-site work, sometimes with access to camp or site gyms, followed by blocks of home time with normal gym access. The coaching accounts for both environments — programming that works in a basic site gym or a hotel fitness room, and a home-time plan that picks up where the on-site block left off.",
      "The failure mode for shift workers is not lack of capability — it is programs built for people with fixed schedules that snap the first time the rotation changes. The solution is a plan designed from the start around schedule variability.",
    ],
  },
  {
    h2: "Home gym vs commercial gym on a shift schedule",
    paras: [
      "Equipment access varies significantly across shift schedules. Night-shift workers may not have access to a commercial gym during their preferred training window. FIFO workers work in remote locations with limited or basic gym facilities. The coaching is equipment-flexible: programs are built around what you have, not what would be ideal.",
      "A basic home setup — adjustable dumbbells, a pull-up bar, and a mat — is sufficient for the first 6–12 months of progressive training. A commercial gym with a barbell and squat rack allows faster progression on compound lifts. The program version that will actually get done is the correct version, regardless of equipment.",
    ],
  },
  {
    h2: "What 90 days looks like on a rotating schedule",
    paras: [
      "The structure: three 45-minute full-body sessions per week, timed relative to wake-up rather than the clock. Weekly coaching check-in covers the past week session by session, the upcoming rotation, and any nutrition adjustments. Daily messaging handles the in-week planning questions.",
      "Months one to two are about establishing the habit within the rotation structure — session timing, meal prep rhythm, protein targets. Month three is where the compound progress from consistent training starts to show clearly. The schedule complexity that makes shift work difficult is manageable when the plan is built for it from the start.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "When should shift workers train?",
    a: "Within 2–4 hours of waking, whenever that is. Train relative to your sleep anchor, not the clock. If you sleep from 8am to 4pm, your training window is the afternoon — the same relative position as a morning workout for someone with a standard schedule. The body responds to circadian position, not time of day.",
  },
  {
    q: "Can you build muscle working night shifts?",
    a: "Yes. The mechanisms behind muscle adaptation do not require a standard schedule — they require progressive training, adequate protein, and sufficient total sleep. Shift workers who hit those three variables build muscle and lose fat at roughly the same rate as workers with fixed schedules. The constraint is sleep quality during rotation transitions, not the shift itself.",
  },
  {
    q: "How do I meal prep when my schedule rotates?",
    a: "Batch cook two to three times per week regardless of which shift is running. Prioritize protein sources that work cold and travel well: hard-boiled eggs, Greek yogurt, cooked chicken, cottage cheese. The goal is removing food decisions when you are exhausted at shift end — not optimizing meal timing to the minute.",
  },
  {
    q: "Is shift work causing my weight gain?",
    a: "Circadian disruption affects appetite regulation and can make overconsumption more likely — this is well-established. The practical lever is not fixing the circadian rhythm (you cannot, while working shifts) but building structure around the variables you control: consistent sleep totals, regular training, and a protein target that holds across rotations.",
  },
  {
    q: "Are standard online coaching programs built for shift workers?",
    a: "Most are not. They schedule sessions at fixed times and assume a consistent week. 1:1 coaching means the plan is rebuilt around your actual rotation — a different session schedule for day blocks versus night blocks, adjusted nutrition timing, and modified expectations during rotation-transition weeks when sleep quality drops.",
  },
  {
    q: "Do I need a gym membership?",
    a: "No. Programs are built around what you have — if your gym access varies by shift or site location, home-friendly and equipment-minimal alternatives are built into the plan. Consistency matters more than equipment quality, especially in the first 6–12 months.",
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
  title: "Online Fitness Coach for Shift Workers: Training Around a Rotating Schedule",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Online Fitness Coach for Shift Workers: Training Around a Rotating Schedule",
  description:
    "1:1 coaching built for shift workers and FIFO workers — rotating schedule session timing, meal prep on a variable timetable, and recovery management on broken sleep.",
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
    { "@type": "Thing", name: "Fitness coaching for shift workers" },
    { "@type": "Thing", name: "Night shift exercise" },
    { "@type": "Thing", name: "FIFO fitness" },
    { "@type": "Thing", name: "Rotating schedule training" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fitness Coaching for Shift Workers",
  serviceType: "Fitness coaching for shift workers",
  description:
    "1:1 online coaching for shift workers and FIFO workers — programming that adapts to rotating schedules, variable sleep, and equipment-flexible training environments.",
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

export default function ShiftWorkersPage() {
  return (
    <>
      <JsonLd id="shift-workers-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="shift-workers-article-schema" data={articleSchema} />
      <JsonLd id="shift-workers-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for shift workers: training around a rotating
            schedule
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A rotating, night, or 12-hour shift schedule is one of the hardest environments for
            consistent fitness — not because of discipline, but because generic
            plans are built for 9–5 and break the moment the rotation changes.
            You cannot meal prep the same way, train at 6am when you just
            finished nights, or follow a program that assumes your week looks
            the same every time. This is the coaching built for the schedule
            you actually have.
          </p>
          <ProofStrip className="mt-6" />
        </header>

        <div className="hair my-10 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer: a schedule-relative plan for gym shift scheduling</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Shift-worker fitness needs a schedule-relative plan
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            The best plan for night-shift, rotating, and 12-hour shift workers
            is built around wake time, not the clock. Train 2-4 hours after
            waking, keep protein ready before the shift ends, and reduce volume
            when the rotation changes and sleep gets worse. Kris Oddo,
            NASM-CPT, coaches shift workers by adjusting the training week to
            the actual rotation instead of forcing a fixed 6am or 7pm template.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Start with the{" "}
            <Link
              href="/tools/body-recomposition-calculator"
              className="underline hover:text-bone"
            >
              body recomposition calculator
            </Link>{" "}
            if you need calorie and protein targets for a rotating schedule,
            then use the application if you need a coach to adapt the week with
            you.
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
                If the main challenge is a packed calendar rather than a
                rotating schedule, this page covers the busy-professional
                version of the same problem.
              </span>
            </Link>
            <Link
              href="/for/men-who-travel-for-work"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For men who travel for work
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                FIFO workers move between on-site and home. This page covers
                the hotel gym, road nutrition, and variable-environment
                training problem.
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
                Estimate calories and protein for recomp when your wake/sleep
                timing changes by rotation.
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
                Compare coaching, self-guided programs, and apps before you
                choose the level of support that fits.
              </span>
            </Link>
            <Link
              href="/for/weight-loss"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Weight-loss coaching for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If shift work has turned into weight gain, this covers the fat
                loss and muscle-retention side of coaching.
              </span>
            </Link>
            <Link
              href="/blog/sleep-and-fat-loss-for-busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Sleep and fat loss
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How sleep quality and duration affect fat loss, muscle
                retention, and the recovery variables that determine training
                adaptation.
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
                Set your protein target and calorie baseline — the two
                numbers that hold regardless of which shift you are on.
              </span>
            </Link>
            <Link
              href="/for/remote-workers"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For remote workers
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If you work from home on a non-standard schedule, this page
                covers the WFH fitness challenges that overlap with shift work.
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
          slug="shift-workers"
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
            Coaching that adapts to your rotation, not a fixed schedule
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or apply for 1:1 coaching. The strategy call covers your rotation
            pattern, your equipment access, and what a realistic plan looks
            like for your specific schedule.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers on the sleep problem first,
            see{" "}
            <Link
              href="/science/questions/does-sleep-deprivation-make-you-eat-more"
              className="underline hover:text-bone"
            >
              whether sleep deprivation makes you eat more
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-caffeine-affect-sleep-even-if-you-fall-asleep"
              className="underline hover:text-bone"
            >
              whether caffeine degrades sleep even when you fall asleep fine
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
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
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

        <BusyProCluster currentHref="/for/shift-workers" />

        <HubRetentionCTA hub="shift-workers" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

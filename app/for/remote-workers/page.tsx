import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import BusyProCluster from "@/components/BusyProCluster";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/remote-workers";
const DATE_MODIFIED = "2026-11-16";

export const metadata: Metadata = {
  title: "CrossFit for Remote Workers: 3-Day Plan & Coaching | Geebs",
  description:
    "1:1 CrossFit for remote workers: 3-day 35-minute home workouts, dumbbell setups, and daily accountability to stop WFH weight gain and build lean muscle.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "CrossFit for Remote Workers: 3-Day Plan & Coaching",
    description:
      "A coach-led CrossFit and strength plan for remote workers: 3-day 35-minute home workouts, dumbbell setups, and real accountability to stay lean.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Fitness coaching for remote workers by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrossFit for Remote Workers: 3-Day Plan & Coaching",
    description:
      "1:1 CrossFit for remote workers: 3-day 35-minute home workouts, dumbbell setups, and real accountability to stop WFH weight gain.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "WFH makes the default worse",
    paras: [
      "Remote work removes friction in both directions. It removes the commute, but it also removes steps, schedule boundaries, and the little bits of movement that used to happen without thinking.",
      "The kitchen is close. The desk is always there. Work can bleed later into the day. That is why the WFH weight-gain loop is so common: fewer steps, more snacks, less separation, and no outside structure.",
      "Geebs Coaching is built for remote workers who need a plan that fits the home-office environment instead of pretending they still live inside a normal office rhythm.",
    ],
  },
  {
    h2: "The plan has to create boundaries",
    paras: [
      "A remote worker does not need a complicated program. They need clear defaults: training times that protect the calendar, protein anchors, walking targets, and simple food rules that make the kitchen less dangerous.",
      "The strongest remote-work plan usually starts with three lifting days, short daily walks, and repeatable meals. It should feel boring in the best way: easy to understand, hard to drift from.",
      "Daily accountability is where the plan stays real. Kris helps catch the drift while it is happening, then uses the weekly check-in to review what actually happened and adjust from the data instead of blaming motivation.",
    ],
  },
  {
    h2: "Remote does not mean alone",
    paras: [
      "The trap of remote work is that everything becomes self-managed. Work, food, movement, sleep, training, and accountability all depend on you noticing the drift early enough.",
      "Coaching adds an external review point. The plan is not just a document in an app; it is something a real coach checks, adjusts, and keeps connected to the goal.",
      "That support matters most when the house, job, and gym all blur together.",
    ],
  },
  {
    h2: "Remote worker fitness: making the home setup work",
    paras: [
      "Remote worker fitness is not just a scheduling problem — it is a setup problem. The home gym does not need to be elaborate. A pair of adjustable dumbbells, a pull-up bar, and enough floor space for a deadlift are enough to run a full progressive program without leaving the house.",
      "The remote worker advantage is zero commute to the gym. The program is built to use it: training windows can be tighter and closer to the home setup. A 35-minute session at home beats skipping a 75-minute round trip to a commercial gym three days a week.",
      "When the home setup is limited, the program maps to what is available. Accountability is the same regardless of equipment.",
    ],
  },
  {
    h2: "CrossFit and functional training for remote workers",
    paras: [
      "CrossFit for remote workers is less about finding a box and more about adapting high-intensity functional training to the WFH week. The same conditioning principles apply — compound movements, time-based effort, varied stimulus — but the program has to account for what is actually available at home and how much recovery capacity the work week leaves.",
      "The risk with CrossFit-style training for remote workers is stacking metabolic stress on top of deadline stress. A 1:1 coach adjusts volume and intensity in real time: when work is heavy, the program scales back conditioning and protects recovery; when the week opens up, it pushes harder.",
      "Geebs Coaching incorporates functional training into remote worker programs based on the client's equipment, schedule, and stress load. The goal is consistent training output over months — not peak sessions that crater adherence during the next crunch week.",
    ],
  },
  {
    h2: "Kickboxing for remote workers: does it count as training?",
    paras: [
      "Kickboxing is a good cardio choice for remote workers, but it does not replace lifting. A hard bag or pad session, where talking in full sentences is difficult, is vigorous exercise, and federal guidelines count vigorous minutes at double value: 75 minutes a week of vigorous activity meets the same target as 150 minutes of moderate activity (Physical Activity Guidelines for Americans, 2nd edition, 2018). Two hard 40-minute sessions cover the week's cardio.",
      "The same guidelines ask for muscle-strengthening work on at least two days a week, and kickboxing does not supply progressive load. In a remote worker's program it sits beside two or three lifting days, on days that do not ruin the next session, and it gets cut back first in a heavy work week.",
    ],
  },
  {
    h2: "Remote employee fitness programs: what this is and is not",
    paras: [
      "Geebs is not a company wellness vendor. It is one-to-one coaching for an individual remote employee: one person, one plan, one coach reviewing it. If you are searching for a remote staff fitness program to buy for a whole team, this is not that product.",
      "If you are the remote employee, the difference matters. Group programs hand everyone the same challenge; a 1:1 plan starts from your hours, your equipment and your steps. A useful floor: in a 15-cohort analysis of 47,471 adults, the risk of death kept falling up to about 8,000 to 10,000 steps a day for adults under 60 (Paluch et al., Lancet Public Health, 2022). Without a commute, a home-office day can end well short of that, so steps are the first number the plan sets.",
    ],
  },
];

const faqs = [
  {
    q: "Is CrossFit a good workout for remote workers?",
    a: "CrossFit for remote workers works when the program accounts for home setup and an unpredictable WFH week. Kris Oddo, NASM-CPT at Geebs Coaching, incorporates high-intensity functional training into 1:1 remote worker programs — scaled to available equipment and adjusted around heavy work weeks so conditioning stays consistent without adding more stress on top of deadline periods.",
  },
  {
    q: "Is kickboxing good exercise for remote workers?",
    a: "Yes, as cardio. A hard kickboxing session, where talking is difficult, counts as vigorous exercise, so 75 minutes a week of it meets the federal aerobic guideline. It does not provide the progressive load that builds muscle, so a remote worker's plan keeps two or three lifting days alongside it.",
  },
  {
    q: "Why do remote workers gain weight?",
    a: "Remote work can reduce daily steps, blur work-life boundaries, increase snacking access, and make training easier to postpone. The solution is a plan that rebuilds movement, meals, and training into the week.",
  },
  {
    q: "What is the best workout plan for remote workers?",
    a: "Three focused resistance-training days, daily walking targets, and simple nutrition defaults are the best starting point for most remote workers.",
  },
  {
    q: "Can online coaching work for work-from-home professionals?",
    a: "Yes. Online coaching fits remote work well because training, nutrition, check-ins, and messaging can all be managed around the client's real schedule.",
  },
  {
    q: "Is this different from coaching for busy professionals?",
    a: "The principles are the same, but the constraints are different. Remote workers usually need more boundary-setting, movement structure, and kitchen/snacking defaults.",
  },
  {
    q: "What is the minimum home equipment I need for a remote worker fitness program?",
    a: "A pair of adjustable dumbbells and a pull-up bar cover most of a solid home strength program. A full cable machine or barbell setup is better but not required. Programs are built around what you actually have — and can scale up if you add equipment.",
  },
  {
    q: "How do I separate work-from-workout when both happen in the same room?",
    a: "The plan creates a physical and time break: training happens at a set window in the day, not wedged between meetings or left for whenever. A brief transition — even a five-minute walk before and after — helps the brain switch modes. The bigger fix is a scheduled training block that does not compete with open calendar time.",
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
  title: "Fitness Coaching for Remote Workers",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CrossFit for Remote Workers: 3-Day Plan & Coaching",
  description:
    "1:1 CrossFit for remote workers: 3-day 35-minute home workouts, dumbbell setups, and daily accountability to stop WFH weight gain and build lean muscle.",
  author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
  datePublished: "2026-05-22",
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
  about: [
    { "@type": "Thing", name: "Fitness coaching for remote workers" },
    { "@type": "Thing", name: "CrossFit for remote workers" },
    { "@type": "Thing", name: "Work from home fitness" },
    { "@type": "Thing", name: "Online fitness coaching" },
  ],
};

export default function RemoteWorkersPage() {
  return (
    <>
      <JsonLd id="remote-workers-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="remote-workers-article-schema" data={articleSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Fitness coaching for remote workers
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            A 1:1 coaching process for work-from-home professionals who need
            structure, accountability, and a plan that stops the home-office
            drift.
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
            CrossFit for remote workers: what the training actually looks like
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            CrossFit for remote workers works when the program is built around
            two realities: the home setup and the WFH schedule. Geebs Coaching
            incorporates high-intensity functional training into 1:1 remote
            worker programs &mdash; scaled to the equipment you have, programmed
            around your actual work calendar, and adjusted weekly when sprint
            weeks or tight deadlines change your recovery capacity. Kris Oddo,
            NASM-CPT, coaches intensity and volume in real time so the
            conditioning stays consistent without burning out during
            high-stress work periods.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-no-fold="true" aria-labelledby="remote-worker-reset">
          <p className="eyebrow text-cloudText">Remote Worker Reset</p>
          <h2
            id="remote-worker-reset"
            className="mt-3 display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Stay in shape when your home is also your office
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The fix is not a perfect routine. It is three anchors that keep a
            normal work-from-home week from quietly becoming a no-movement
            week: protected lifting blocks, a short transition walk, and a
            fallback session for deadline days.
          </p>
          <div className="mt-6 divide-y divide-line2 border-y border-line2 text-[15px]">
            <div className="grid gap-1 py-4">
              <p className="font-semibold text-bone">1. Protect three lifting blocks</p>
              <p className="text-[13.5px] leading-[1.55] text-mute">Put them on the calendar before meetings expand into the evening.</p>
            </div>
            <div className="grid gap-1 py-4">
              <p className="font-semibold text-bone">2. Walk the work transition</p>
              <p className="text-[13.5px] leading-[1.55] text-mute">A short walk before or after work gives the day a boundary that a commute used to provide.</p>
            </div>
            <div className="grid gap-1 py-4">
              <p className="font-semibold text-bone">3. Keep a deadline-day version</p>
              <p className="text-[13.5px] leading-[1.55] text-mute">A shorter session protects the habit when a full workout is not realistic.</p>
            </div>
          </div>
          <details className="mt-5 border-b border-line2 pb-5 text-[15px] leading-[1.65] text-mute">
            <summary className="cursor-pointer font-semibold text-bone">What the fallback week can look like</summary>
            <p className="mt-4 max-w-[64ch]">
              Keep the same training days, but shorten each session to the first
              few movements you can finish with good form. Keep the walk and a
              repeatable meal ready. The goal is to make the next normal week
              easy to resume, not to make a stressful week prove your discipline.
            </p>
          </details>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Price before the ask. Nine of twelve money pages never stated a

            coaching price; on these 21 the only figure was the community at

            67-91% depth. */}

        <CoachingPriceLine />


        {/* Early, in-read. These 21 audience pages carried no capture at

            all, and two of them are the highest buying-intent pages on the

            site by human search demand. */}

        <ArticleEarlyCapture
          slug="remote-workers"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />


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

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Build structure back into the week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Start with the{" "}
            <Link
              href="/blog/how-to-stay-fit-working-from-home"
              className="underline hover:text-bone"
            >
              work-from-home fitness guide
            </Link>
            , compare workday movement gear in the{" "}
            <Link
              href="/blog/standing-desk-vs-walking-pad"
              className="underline hover:text-bone"
            >
              standing desk vs walking pad and fitness tracker guide
            </Link>
            , or visit the{" "}
            <Link
              href="/for/software-engineers"
              className="underline hover:text-bone"
            >
              software engineer coaching page
            </Link>
            . Qualified 1:1 applicants book a strategy call after the form.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            If you want the study-backed answers first, see the research on{" "}
            <Link
              href="/science/questions/does-phone-in-bed-hurt-sleep"
              className="underline hover:text-bone"
            >
              whether the phone in bed is hurting your sleep
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-sleep-extension-improve-metabolic-health"
              className="underline hover:text-bone"
            >
              what sleeping more does for metabolic health
            </Link>
            , and{" "}
            <Link
              href="/science/questions/is-lifting-good-for-metabolic-health"
              className="underline hover:text-bone"
            >
              what lifting does for metabolic health
            </Link>
            .
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link href="/for/busy-professionals" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">For busy professionals</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Coaching built around packed calendars and real weeks.</span>
            </Link>
            <Link href="/for/accountability" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Fitness accountability coaching</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">When consistency is the real problem — daily check-ins, weekly review.</span>
            </Link>
            <Link href="/vs/fitness-apps" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">1:1 coaching vs fitness apps</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">Why adherence gaps between apps and coaching determine who gets results.</span>
            </Link>
            <Link href="/vs/chatgpt" className="group grid min-h-20 gap-1 py-4 no-underline">
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">Coaching vs ChatGPT workout plans</span>
              <span className="text-[13.5px] leading-[1.55] text-mute">What an AI plan can and cannot do for a remote worker&apos;s week.</span>
            </Link>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/apply?utm_source=site&utm_medium=remote_worker_reset&utm_campaign=remote_worker_reset&utm_content=remote_worker_reset_apply"
              className="btn btn-primary"
              data-cta="remote_worker_reset_apply"
              data-analytics-source="remote_worker_reset"
            >
              See if 1:1 coaching fits your workday
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/blog/how-to-stay-fit-working-from-home" className="btn btn-secondary">
              WFH fitness guide
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <BusyProCluster currentHref="/for/remote-workers" />

        <HubRetentionCTA hub="remote-workers" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

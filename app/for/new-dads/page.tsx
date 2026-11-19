import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import Over40Path from "@/components/Over40Path";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/new-dads";

export const metadata: Metadata = {
  title: "Online Fitness Coaching for New Dads | Geebs Coaching",
  description:
    "1:1 online fitness coaching for new dads — 3×45-min sessions built around newborn chaos, sleep debt, and family meals. Kris Oddo, NASM-CPT.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coaching for New Dads",
    description:
      "Coaching built for a new dad's actual week — 3 sessions, flexible nutrition, a plan that survives a newborn schedule.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coaching for new dads by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coaching for New Dads",
    description:
      "1:1 coaching for new dads — 3 sessions a week, nutrition that fits family meals, a plan that bends with your schedule.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Why the dad bod happens (and why it's not discipline)",
    paras: [
      "The dad bod is not a willpower failure. It is 18 months of broken sleep, vanished gym windows, and meals eaten standing up while the baby cries. Training plans built for your pre-kid life snap the first week the baby does not sleep — which is most weeks, early on.",
      "The problem is not motivation. You had motivation at 25 and it built nothing lasting either, because motivation is not a system. The problem is that every plan you have seen assumed a predictable week, time to prep food, and the option to just go to the gym. New fatherhood removes all three at once.",
      "Geebs coaching is built for exactly this: 3×45-min sessions a week that survive a newborn schedule, nutrition that works at 11pm after bedtime duty, and a coach who reprograms the week when the week explodes. Kris coaches men 25-40 — prime new-dad years — 1:1, so the plan adjusts to your sleep debt, not a template's.",
    ],
  },
  {
    h2: "Training when you have 45 minutes and zero predictability",
    paras: [
      "The fix is not a shorter program — it is a better-engineered one. Three full-body sessions a week, around 45 minutes each, structured so a missed day is recoverable instead of the thing that ends the whole attempt. If Tuesday collapses, Wednesday is still there. If the whole week gets derailed, the program does not treat that as failure.",
      "Kris builds the training around what you actually have access to — a garage setup, home dumbbells, a commercial gym you can get to once the baby is down. Equipment flexibility is not a workaround; it is built into the program from the start.",
      "New dads are one of the strongest fits for this style of coaching: motivated, clear on what they want, and stuck not because of information but because no plan has ever assumed the week would be this unpredictable. That is the version this coaching solves for.",
    ],
  },
  {
    h2: "Losing the dad bod without fasting or giving up family dinners",
    paras: [
      "Fat loss is driven by nutrition — specifically a modest caloric deficit and a high protein target. Not fasting. Not cutting carbs entirely. Not a rigid meal plan that dies the first time dinner is whatever the family is having.",
      "The coaching uses flexible macro targets: a protein floor you hit most days and a calorie window you stay near most days, built around real family meals and the reality that sometimes you eat what is on the table at 9pm. That is not a cheat. That is the plan.",
      "Most new dads are surprised by how straightforward this is when the targets are actually calibrated to their week instead of a magazine template. The nutrition coaching does not require a perfect schedule. It requires weekly data and a coach adjusting against it.",
    ],
  },
  {
    h2: "Sleep deprivation, recovery, and what to expect",
    paras: [
      "Sleep deprivation matters for recovery, and the coaching accounts for it honestly. Volume is not identical every week. On brutal-sleep stretches, total weekly volume drops — not as a failure accommodation but as a deliberate programming decision. A fatigued body absorbs less training and risks more injury.",
      "What most new-dad clients report: energy improves within a few weeks of consistent training, even imperfect training. The mechanism is straightforward — exercise improves sleep quality when sleep quantity is constrained, and carrying less body fat reduces the systemic fatigue load. The goal is not to train through exhaustion; it is to stay in the game long enough for the schedule to stabilize.",
      "There are no medical claims here. What coaching offers is a plan that flexes instead of breaks, a coach who notices when the week was brutal, and adjustments that protect the long run.",
    ],
  },
  {
    h2: "Home, garage, or hotel gym — equipment-flexible programming",
    paras: [
      "New dads do not always have a gym membership. Priorities rearrange. The program is built around what you have — home dumbbells, a pull-up bar in the doorframe, a garage with a barbell, or a commercial gym on the days you can get there.",
      "Equipment flexibility is built into the programming from the start, not bolted on. Kris programs what fits your setup, adjusts when your setup changes, and never assigns a session that requires gear you do not have.",
      "If you are starting from zero, the coaching equipment list for a new dad is short: a pair of adjustable dumbbells and somewhere to stand covers the first months of programming. A doorframe pull-up bar and a couple of resistance bands extend it. A bench and a barbell are upgrades, not requirements — Kris programs around what is in the house before recommending anything new, and nothing on the plan ever requires gear you have not told him you own.",
    ],
  },
  {
    h2: "What 90 days looks like for a new dad",
    paras: [
      "The structure is consistent even when the weeks are not: three training sessions, a daily nutrition target, and weekly check-ins where Kris reviews the data and adjusts the next week. The 1:1 coaching is application-based; pricing is quoted on the strategy call after the application.",
      "Progress is tracked by the waist, photos and lifts every two to four weeks, because the scale barely moves while muscle goes on and fat comes off. Consistent does not mean perfect. It means most of the sessions, most of the nutrition targets, and a coach managing the gaps between.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Can I get back in shape with a newborn at home?",
    a: "Yes, if the plan assumes chaos instead of pretending it will not happen. Three flexible 45-minute sessions, recoverable missed days, and nutrition built around real family meals. The mistake is restarting a pre-kid program that needs perfect weeks.",
  },
  {
    q: "How do I lose the dad bod without living in the gym?",
    a: "Fat loss is driven by nutrition and 2-3 strength sessions a week, not gym hours. Coaching sets calorie and protein targets that fit family eating and keeps training short and progressive. The program does not require your gym to be the center of your life.",
  },
  {
    q: "I'm exhausted — won't training make it worse?",
    a: "Programming adjusts to your recovery. On brutal-sleep weeks volume drops and calories stay closer to maintenance, because short nights shift what a diet takes off away from fat: in a trial of adults averaging 41 on the same diet, 5.5 hours in bed a night instead of 8.5 cut the share of weight lost as fat by 55% and raised the loss of fat-free mass, which includes muscle, by 60% (Nedeltcheva et al., 2010, PMID 20921542). The plan flexes instead of breaking.",
  },
  {
    q: "Do I need a gym membership?",
    a: "No. Programs are built around what you have — home dumbbells, a garage setup, or a commercial gym. Equipment flexibility is not a workaround; it is built in from the start.",
  },
  {
    q: "What coaching equipment does a new dad actually need?",
    a: "A pair of adjustable dumbbells is enough to start coached training at home; a doorframe pull-up bar and resistance bands extend the programming. A bench and barbell are upgrades, not requirements. Kris builds the plan around what you already own before recommending any purchase.",
  },
  {
    q: "How is this different from a dad-bod workout app?",
    a: "Apps give every dad the same plan and never know your baby did not sleep. 1:1 coaching with Kris means the plan is rebuilt around your actual week, every week — not a generic template that assumes your week looks like everyone else's.",
  },
  {
    q: "How fast can I realistically lose the dad bod?",
    a: "There is no honest fixed number; it depends on how much fat you carry and how consistent the weeks are. Strength and the waist measurement usually move before the mirror. Consistent means most sessions and most nutrition targets, not a perfect record. Anyone promising faster is selling the restart cycle, not the result.",
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
  title: "Online Fitness Coaching for New Dads",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coaching for New Dads",
  description:
    "1:1 online fitness coaching for new dads — 3 sessions a week built around newborn chaos, sleep debt, and family meals.",
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
    { "@type": "Thing", name: "New dads fitness" },
    { "@type": "Thing", name: "Dad bod" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for New Dads",
  serviceType: "Online fitness coaching for new dads",
  description:
    "1:1 online fitness coaching for new dads — custom training and nutrition built around a newborn schedule, sleep debt, and family meals.",
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

export default function NewDadsPage() {
  return (
    <>
      <JsonLd id="new-dads-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="new-dads-article-schema" data={articleSchema} />
      <JsonLd id="new-dads-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coaching for new dads
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            The dad bod is not a discipline failure. It is broken sleep, zero
            gym windows, and every plan you try assuming a week you no longer
            have. This coaching is built for the week you actually have.
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

        {/* Related reading */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/blog/how-to-lose-the-dad-bod"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to lose the dad bod
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The mechanics of fat loss for dads — what actually drives it and
                what the timeline looks like.
              </span>
            </Link>
            <Link
              href="/blog/3-day-workout-plan-for-busy-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                3-day workout plan for busy men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The three-session structure in detail — what it looks like and
                why fewer sessions done consistently beats more sessions
                skipped.
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
                If the constraint is calendar more than sleep, the
                busy-professional page covers that angle directly.
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
                How sleep quality affects fat loss and what to do when you
                cannot control sleep quantity.
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
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <Over40Path
          ctaId="for_new_dads_send_kris"
          entryContent="for_new_dads"
          eyebrow="New dad, short on sleep?"
          title="Send Kris your week as it really is."
          body="Tell him how old the baby is, how many nights are broken, and which 45-minute windows you can actually train in. He builds the plan around that and adjusts it every week."
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
          slug="new-dads"
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
            A plan that survives a newborn schedule
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
            If you want the study-backed answers on the newborn-sleep problem
            first, see{" "}
            <Link
              href="/science/questions/does-sleep-deprivation-make-you-eat-more"
              className="underline hover:text-bone"
            >
              whether sleep deprivation makes you eat more
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-sleep-loss-hurt-workout-performance"
              className="underline hover:text-bone"
            >
              whether sleep loss hurts workout performance
            </Link>
            , and{" "}
            <Link
              href="/science/questions/can-caffeine-save-a-bad-night-of-sleep"
              className="underline hover:text-bone"
            >
              whether caffeine can save a bad night of sleep
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="for_newdads_primary">
              Get a plan that survives a newborn
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

        <HubRetentionCTA hub="new-dads" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-10-13.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

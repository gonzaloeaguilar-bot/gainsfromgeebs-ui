import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import MoneyPageProof from "@/components/MoneyPageProof";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/what-does-an-online-fitness-coach-do";

export const metadata: Metadata = {
  title: "What Does an Online Fitness Coach Actually Do? | Geebs Coaching",
  description:
    "What a good online fitness coach does day-to-day, what's included vs an app, what a coach can NOT do, and how to tell if you need one.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "What Does an Online Fitness Coach Actually Do?",
    description:
      "A straight answer — what an online fitness coach does day-to-day, what's included vs an app, what a good coach does that a template farm doesn't, and what a coach cannot do.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "What does an online fitness coach do — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Does an Online Fitness Coach Actually Do?",
    description:
      "Straight answer — what online coaching includes, what separates a real coach from a template farm, and when you actually need one.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often does an online fitness coach contact you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the coach and the package. At the more attentive end — which is what 1:1 coaching means — daily accountability check-ins and a weekly review call are standard. Daily contact covers training windows, nutrition questions, sleep, and recovery. The weekly call reviews the past seven days workout by workout and adjusts what is coming next. Template-based coaching services may only communicate weekly or less.",
      },
    },
    {
      "@type": "Question",
      name: "Does an online fitness coach write a meal plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good one does not write a rigid meal plan — they set macro targets and build flexible nutrition habits around your actual eating patterns. Rigid meal plans fail in the real world because they require perfect conditions. Macro targets with practical food strategies work in restaurants, on travel days, and on weekends. The coaching is about decisions and patterns, not following a PDF.",
      },
    },
    {
      "@type": "Question",
      name: "How does an online coach check your form without seeing you in person?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Video review. The client records sets and sends them through the coaching platform or direct message. The coach reviews and sends back specific cues — not generic technique tips, but corrections based on what that client is actually doing in that movement. Most online coaches offer same-day or next-session feedback. Form review via video catches real-world movement patterns more accurately than gym mirrors.",
      },
    },
    {
      "@type": "Question",
      name: "What happens week to week with an online fitness coach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Week one: intake, assessment, program built from scratch to current level. Weeks two through six: daily accountability, training sessions executed, weekly review call covers how the week went and what adjusts. Months two and three: program progresses, nutrition targets refine based on real data, plateaus are diagnosed and corrected. The pattern is assessment, execution, review, adjust — repeated every week for as long as coaching runs.",
      },
    },
    {
      "@type": "Question",
      name: "Is it awkward to work with an online fitness coach you've never met?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Less than most people expect. The coaching relationship is built through the work — daily check-ins, form review, weekly calls. It is conversational and task-focused, not clinical. Most clients report feeling comfortable within the first week because the contact is practical and responsive, not evaluative.",
      },
    },
  ],
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "What Does an Online Fitness Coach Actually Do?",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Does an Online Fitness Coach Actually Do?",
  description:
    "A straight answer — what an online fitness coach does day-to-day, what is included vs a fitness app, what a good coach does that a template farm does not, and what a coach cannot do.",
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
  dateModified: "2026-06-12",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "What does an online fitness coach do" },
    { "@type": "Thing", name: "Online personal training" },
  ],
};

export default function WhatDoesAnOnlineFitnessCoachDoPage() {
  return (
    <>
      <JsonLd id="coach-role-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="coach-role-article-schema" data={articleSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            What does an online fitness coach actually do?
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            The short version: an online fitness coach writes your program,
            guides your nutrition, reviews your form by video, and holds you
            accountable between sessions — all delivered remotely. The longer
            version is what separates a real coach from a template farm, and
            that distinction is worth understanding before you pay for either.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Section 0 — Entity disambiguation */}
        {/* Early, in-read: the only capture on these pages sat past the
            scroll point 97% of readers never reach. */}
        <ArticleEarlyCapture slug="what-does-an-online-fitness-coach-do" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What does an online FITNESS coach do (vs a career coach or life
            coach)?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            An online fitness coach works on your body — specifically training,
            nutrition, and physical accountability. The credential is typically a
            personal training certification (NASM-CPT, ISSA, ACE, or similar).
            The goal is physical: body composition, strength, fat loss, muscle
            building. A fitness coach is not a life coach (mindset, purpose,
            career direction) and not a career coach (professional advancement,
            job search, leadership). The word &ldquo;coach&rdquo; covers all
            three, which creates the confusion — but the disciplines, credentials,
            and scope of practice are completely separate. It is also not a
            registered dietitian; here is{" "}
            <Link
              href="/guides/online-fitness-coach-vs-nutritionist"
              className="underline hover:text-bone"
            >
              where a fitness coach ends and a nutritionist begins
            </Link>
            .
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            This page covers the fitness variety specifically: what a certified
            online fitness coach does day-to-day, what is included in the
            service, what separates a real coaching relationship from a template
            farm, and what a coach cannot do.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 1 — What a coach does day to day */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What an online fitness coach does day-to-day
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            At the start of coaching: a full intake — training history,
            limitations, equipment, schedule, goals — then a custom program
            built from scratch to where the client is today. Not a template
            modified to look custom. An actual program designed around that
            person&apos;s level, recovery capacity, and weekly constraints.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Day to day: an accountability check-in that covers training windows,
            nutrition questions, sleep, and any logistical problems with the
            week ahead. Clients send form videos; the coach reviews them and
            sends back specific cues before or between sessions. Questions get
            answered in real time through direct messaging.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Once a week: a review call that goes through every session of the
            past seven days — what happened, what the data showed, what adjusts.
            The program updates based on the review. The next week&apos;s
            targets are confirmed. Then it repeats.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 2 — vs app */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What&apos;s included vs a fitness app
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A fitness app gives you a program. A coach gives you a program that
            responds to what is actually happening in your life.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Apps do not adjust when your week falls apart. They do not catch
            that your form on Romanian deadlifts is loading your lower back
            instead of your hamstrings. They do not recalibrate your nutrition
            targets when your bodyweight has dropped enough that your maintenance
            calories have changed. They do not notice you missed three sessions
            and ask why.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            What apps do well: structured programming at low cost, no scheduling
            required, good enough for self-motivated experienced lifters who
            primarily need a program to follow. For a full comparison, see{" "}
            <Link
              href="/vs/fitness-apps"
              className="underline hover:text-bone"
            >
              1:1 coaching vs fitness apps
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 3 — What a GOOD coach does */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What a good coach does that a template farm does not
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The coaching industry has a quality range problem. At the low end:
            a PDF program with a name on it, weekly &ldquo;check-in&rdquo; forms
            that no one reads, and a generic macro calculator. At the high end:
            a coach who knows your week, adjusts your program based on how you
            are actually recovering, and catches the patterns — nutrition drift,
            sleep degradation, form breakdown — before they become plateaus or
            injuries.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The distinguishing behaviors of a good coach: they watch your form
            videos themselves (not a team), they respond to daily check-ins with
            actual adjustments (not automated acknowledgments), and they update
            your program based on the data from the past week, not a preset
            cycle. The program you have in week eight should look meaningfully
            different from the one you started with, because the coach has seen
            eight weeks of your data.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For a checklist of what to verify before hiring a coach, see{" "}
            <Link
              href="/blog/how-to-hire-an-online-fitness-coach"
              className="underline hover:text-bone"
            >
              how to hire an online fitness coach
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        <MoneyPageProof
          eyebrow="Proof trail"
          title="What this looks like in practice"
          intro="A real online coach should be easy to verify beyond generic promises. These examples show the result trail, public review trail, and coach-identity trail behind the daily-accountability claims on this page."
        />

        <div className="hair my-10" />

        {/* Section 4 — What a coach CANNOT do */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What an online coach cannot do — the honesty section
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            An online fitness coach cannot guarantee results. The coach builds
            the conditions; the client executes. A coach who guarantees a
            specific transformation outcome in a specific time frame is selling
            something other than coaching.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Online coaching cannot replace medical care. A coach can program
            around old injuries and recommend conservative load progressions, but
            diagnosing injuries, managing chronic conditions, or prescribing any
            medical intervention is outside the scope of coaching. If you have a
            persistent injury, see a doctor or physio before starting a program.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Online coaching cannot do the work. Accountability and structure can
            dramatically improve consistency — the data on supervised vs
            self-guided training adherence shows a real gap. But the client has
            to show up, execute, and be honest about what is happening. A coach
            can build the best restart plan in the world for someone who is not
            actually ready to commit. It will not work.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 5 — How to tell if you need one */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How to tell if you actually need a coach
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            You probably do not need a coach if: you are already consistent,
            you have a solid program, you understand progressive overload and
            nutrition well enough to adjust on your own, and accountability is
            not the variable that has been failing you. In that case, a good
            program or app is likely sufficient.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            You probably need a coach if: consistency is the main reason the
            previous approaches did not work; you have been training for a while
            and have stalled without knowing why; you are starting after a long
            break and want the ramp-up calibrated correctly; or you have enough
            complexity in your situation (travel, injuries, unpredictable
            schedule) that a static program reliably breaks down.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The test: if your honest answer to &ldquo;have I been consistent for
            more than eight weeks straight?&rdquo; is no — and the reason is
            internal, not an external event — that is the accountability gap
            coaching solves. For a fuller worth-it analysis, see{" "}
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="underline hover:text-bone"
            >
              is online fitness coaching worth it
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/blog/how-to-hire-an-online-fitness-coach"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to hire an online fitness coach
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The vetting checklist — what to verify, what questions to
                ask, and the red flags that separate real coaching from
                template farms.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How much does an online fitness coach cost?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Honest 2026 price ranges — what 1:1 coaching actually costs,
                what moves the price, and what the range reflects in quality.
              </span>
            </Link>
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Is online fitness coaching worth it?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The full worth-it analysis — who it works for, who should
                probably just use an app, and the adherence data behind
                coached vs self-guided training.
              </span>
            </Link>
            <Link
              href="/vs/fitness-apps"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                1:1 coaching vs fitness apps
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Where apps genuinely win, where they fail (the adherence
                gap), and who should use each.
              </span>
            </Link>
            <a
              href="https://titanforgefit.com/collections/fitness-coach-credentials-and-vetting"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Titan Forge fitness coach credentials and vetting guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Review credential requirements, screening checklists, and coaching standards on Titan Forge.
              </span>
            </a>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions about working with an online fitness coach
          </h2>
          <dl className="mt-6">
            <div className="mt-7 first:mt-0">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                How often does an online fitness coach contact you?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                It depends on the coach and the package. At the more attentive
                end — which is what 1:1 coaching means — daily accountability
                check-ins and a weekly review call are standard. Daily contact
                covers training windows, nutrition questions, sleep, and
                recovery. Template-based services may only communicate weekly
                or less.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                Does an online fitness coach write a meal plan?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                A good one does not write a rigid meal plan — they set macro
                targets and build flexible nutrition habits around your actual
                eating patterns. Rigid meal plans fail in the real world because
                they require perfect conditions. Macro targets with practical
                food strategies work in restaurants, on travel days, and on
                weekends.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                How does an online coach check your form without seeing you in
                person?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Video review. The client records sets and sends them through the
                coaching platform or direct message. The coach reviews and sends
                back specific cues — corrections based on what that client is
                actually doing in that movement, not generic tips. Most online
                coaches offer same-day or next-session feedback.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                What happens week to week with an online fitness coach?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Week one: intake, assessment, program built from scratch to
                current level. Weeks two through six: daily accountability,
                training sessions executed, weekly review call covers how the
                week went and what adjusts. Months two and three: program
                progresses, nutrition targets refine based on real data, plateaus
                are diagnosed and corrected. Assessment → execution → review →
                adjust, repeated every week.
              </dd>
            </div>

            <div className="mt-7">
              <dt className="text-bone text-[17px] md:text-[19px] font-medium tracking-[-0.01em]">
                Is it awkward to work with an online fitness coach you have
                never met?
              </dt>
              <dd className="mt-2.5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
                Less than most people expect. The coaching relationship is built
                through the work — daily check-ins, form review, weekly calls.
                It is conversational and task-focused. Most clients report
                feeling comfortable within the first week because the contact is
                practical and responsive, not evaluative.
              </dd>
            </div>
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            See it from the inside
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The best way to understand what coaching actually involves is to see
            how Kris runs it. Read{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the full coaching methodology
            </Link>{" "}
            or the{" "}
            <Link href="/geebs-method" className="underline hover:text-bone">
              Geebs Method overview
            </Link>
            . The application is three questions, under two minutes — the
            strategy call is where the real conversation about fit happens.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
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

        <GuideRetentionCTA guide="what-does-an-online-fitness-coach-do" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-12.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

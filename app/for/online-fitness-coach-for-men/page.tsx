import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import AuthorityProof from "@/components/AuthorityProof";
import KrisMediaFigure from "@/components/KrisMediaFigure";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/online-fitness-coach-for-men";

export const metadata: Metadata = {
  title: "Online Fitness Coach for Men 25-40 | Geebs Coaching",
  description:
    "1:1 online fitness coaching for men 25-40. Custom programming, nutrition coaching, daily accountability — built around the schedule you actually have. Apply with Kris Oddo.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Online Fitness Coach for Men 25-40",
    description:
      "1:1 online coaching for men 25-40 — training, nutrition, accountability, built around a real week.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for men 25-40 — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach for Men 25-40",
    description:
      "1:1 online coaching for men 25-40 with Kris Oddo. Custom training, nutrition, and daily accountability.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "What an online fitness coach for men 25-40 actually does",
    paras: [
      "An online fitness coach builds and adjusts your program, coaches your nutrition, and holds you accountable — all without requiring you to be at the same gym or in the same city. For men 25-40, that format turns out to be the right one for a specific reason: the problem is never just the gym session. It is the nutrition decisions at 7pm, the missed Wednesday training, the work trip that blows up the week. A coach who is present for all of that — not just the hour you are lifting — is what makes the difference.",
      "At Geebs, that means a fully custom training program built around your actual schedule and equipment, a nutrition framework matched to your week rather than an idealized one, daily accountability through direct messaging with Kris, and a weekly check-in that reviews the data and adjusts the next week. One coach. Not a team, not an app with a coach-shaped avatar — one person who knows your week.",
    ],
  },
  {
    h2: "Why men 25-40 specifically",
    paras: [
      "Men in their mid-20s through early 40s are in the most constrained window of their physical life: career momentum or business-building on one axis, the early onset of hormonal and metabolic shifts on the other, and usually less time than at any point before. The plans that worked at 22 — or would have, if you had run them — often don't survive contact with a real 2026 schedule.",
      "The metabolic reality is concrete: testosterone begins declining in most men around 30, muscle protein synthesis slows, and recovery time between sessions increases slightly. None of that makes results impossible — the opposite is true. It means the margin for bad programming is smaller, so the upside of a good program is bigger. A coach who programs for your actual biology and schedule is not a luxury for this demographic. It is the efficient path.",
      "Most men in this window have already tried the generic track: the gym membership, the app, the YouTube plan. They know roughly what to do. What they have not had is a coach who keeps the plan alive when the week gets loud — which, for men 25-40, it reliably does.",
    ],
  },
  {
    h2: "What makes online coaching work for this demographic",
    paras: [
      "Three things separate the men who get results from a coach from the men who do not. First, the coach knows them. Not from a form submitted once, but from months of weekly data, daily messages, and adjustments — the kind of knowledge that lets a coach change the program for a brutal work month before the month ends instead of waiting for the post-mortem.",
      "Second, the accountability is real. A check-in call that only happens once a week is useful, but it is not where the week is saved. Daily contact — where breakfast goes, when training can happen, how to handle the dinner that was not in the plan — is what keeps the week from drifting before the Friday call.",
      "Third, the coach covers the full week, not just the training sessions. For most men 25-40, nutrition is the constraint, not the gym. A coach who programs training but leaves nutrition to you is coaching half the problem.",
    ],
  },
  {
    h2: "How Geebs Coaching works",
    paras: [
      "The coaching is 1:1, application-based. After applying, a short strategy call with Kris confirms the fit before anything starts. From there: a fully custom training program built around your gym access, schedule, and history — typically three to four resistance training days per week. Not five you will plan and skip, three you will do.",
      "Nutrition is macro-target-based, not a rigid meal plan. You hit a protein floor and build the rest of the week around it — the approach that survives client dinners, travel, and the cooking-optional weeks a real professional has.",
      "Daily accountability means direct messaging with Kris around the actual plan for the day: where breakfast fits, when the gym can happen, what needs to change. The weekly check-in reviews the last seven days workout by workout and sets the next week. Programs are adjusted around real data, not theory.",
      "Coaching runs in 90-day blocks. That is the honest timeline for the habits to hold and the physique to begin reflecting the work. Weekly Review Coaching is the lighter option if you are self-driven; 1:1 is built for the man who wants a coach in his corner for the full run.",
    ],
  },
  {
    h2: "Who this is and is not for",
    paras: [
      "Geebs 1:1 coaching is for men in the 25-40 window who have already tried the self-guided layer — the apps, the templates, the YouTube plans — and the issue is not the information. The issue is a program that breaks the first hard week, no accountability when it matters, and nutrition left entirely to willpower. If that is the pattern, a coach changes the variable that was actually missing.",
      "It is not for men who are completely new to training and want supervision on every rep. A local in-person trainer is genuinely better for that starting point. It is also not for men whose only problem is not having a plan — a well-built program or the $24.99/month community is the right call there, and saves the money for a different season.",
      "The application exists specifically to surface this distinction before either side commits. Three questions, under two minutes.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What does an online fitness coach for men do?",
    a: "An online fitness coach builds your training program, coaches your nutrition, and holds you accountable — all remotely. For men 25-40, that means a custom program built around your actual schedule and equipment, a nutrition framework matched to your real week, daily accountability through direct messaging, and a weekly check-in that reviews performance and adjusts the next week. The coaching covers the full week, not just the training sessions.",
  },
  {
    q: "Is an online fitness coach worth it for men over 25?",
    a: "For men 25-40 who have already tried the self-guided layer — apps, templates, generic programs — and still cannot stay consistent, yes. The missing piece is rarely information; it is a plan that adapts when the week gets hard, daily accountability that keeps the week from drifting, and a coach who covers training and nutrition together. If consistency has genuinely never been your problem and you only need a structured plan, an app or a self-guided program is the smarter spend.",
  },
  {
    q: "How much does online fitness coaching cost for men?",
    a: "Real 1:1 online coaching is a professional-level investment, not an app subscription. At Geebs, exact package options are covered on the strategy call after the application. If budget is the main constraint right now, the $24.99/month community and the $100 one-time consultation call are the lower-cost ways in.",
  },
  {
    q: "How is online coaching different from a fitness app?",
    a: "A fitness app gives everyone the same logic and never changes for your specific week. Online 1:1 coaching means one coach who knows your travel, your stress cycle, your training history, and your exact constraints — and adjusts your program around all of it, in real time. The app is information. The coach is the system around the information.",
  },
  {
    q: "How many days per week does online coaching require?",
    a: "At Geebs, the training is built around three to four resistance training sessions per week, roughly 45 minutes each. Not five you will plan and skip — three you will execute. The program is designed so a missed session is recoverable, not the thing that ends the whole attempt.",
  },
  {
    q: "Can an online coach help with nutrition, not just training?",
    a: "At Geebs, nutrition is half the product. Training without nutrition coaching solves half the problem at most. The coaching covers a macro-target-based nutrition framework matched to your real week — client dinners, travel, eating out, cooking-optional nights — alongside the training program.",
  },
  {
    q: "How do I find a good online fitness coach for men?",
    a: "Look for three things: a coach who works 1:1 rather than at scale (no assistants, no templates with your name on), a coach who covers nutrition alongside training rather than training only, and a coach who has an application or intake process — not just an instant sign-up. The application exists because coaching only works when it is genuinely the right fit for both sides.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Men 25-40",
  description:
    "1:1 online fitness coaching for men 25-40. Custom training programs, macro-target nutrition coaching, daily accountability, and weekly check-ins. Application required.",
  provider: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "Audience",
    audienceType: "Men aged 25-40 seeking online fitness coaching",
  },
  url: `${SITE_URL}${SLUG}`,
};

// Breadcrumb coverage in this section was 0% (measured 2026-09-23). The section
// hub exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Online Fitness Coach for Men 25-40 — What It Is and How It Works",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach for Men 25-40 — What It Is and How It Works",
  description:
    "What an online fitness coach for men does, how Geebs Coaching works, who it is and is not for.",
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
  datePublished: "2026-05-29",
  dateModified: "2026-06-02",
  mainEntityOfPage: `${SITE_URL}${SLUG}`,
    about: [
    { "@type": "Thing", name: "Online fitness coaching" },
    { "@type": "Thing", name: "Men 25-40" },
    { "@type": "Thing", name: "Body recomposition" },
    { "@type": "Thing", name: "Personal training" },
  ],
};

export default function OnlineFitnessCoachForMenPage() {
  return (
    <>
      <JsonLd id="online-coach-men-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="online-coach-men-service-schema" data={serviceSchema} />
      <JsonLd id="online-coach-men-article-schema" data={articleSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach for men 25-40
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            1:1 coaching built around training, nutrition, and daily
            accountability — for men whose problem is not the plan, it&apos;s
            keeping it alive when the week gets loud.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <KrisMediaFigure
          src="/media/kris/kris-oddo-gym-headshot.jpg"
          alt="Kris Oddo in a gym setting for online fitness coaching"
          caption="The coaching is remote, but the standard is built in the gym: hard training, honest execution, and weekly adjustment."
          imageClassName="scale-125 object-cover object-[50%_58%]"
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

        <AuthorityProof compact />

        <div className="hair my-10 md:my-14" />

        {/* Related paths */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            More specific paths
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
                Coaching built around packed calendars, travel, and three focused
                training days.
              </span>
            </Link>
            <Link
              href="/for/software-engineers"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For software engineers
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Fitness built around sedentary jobs, deep-work schedules, and
                desk-heavy weeks.
              </span>
            </Link>
            <Link
              href="/for/founders"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                For founders
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Fitness built around startup hours, erratic schedules, and
                decision fatigue.
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
                Private 1:1 coaching for high-responsibility calendars and
                frequent travel.
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
          slug="online-fitness-coach-for-men"
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
            Get a plan built around your week
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
              body recomposition guide
            </Link>
            . If you want to compare coaching options first, see the{" "}
            <Link
              href="/blog/best-online-fitness-coaches-for-busy-men"
              className="underline hover:text-bone"
            >
              best online fitness coaches for busy men
            </Link>
            {" "}guide, or the honest breakdown of{" "}
            <Link
              href="/vs/hiring-a-personal-trainer"
              className="underline hover:text-bone"
            >
              online coaching vs hiring a personal trainer
            </Link>
            . The application is three questions and takes under two minutes. If
            1:1 is not the right fit, you will be pointed to the 90-day
            program. If cost is the open question, see the full{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              online fitness coach cost breakdown
            </Link>
            .
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Prefer the peer-reviewed evidence behind the method? See{" "}
            <Link
              href="/science/questions/can-you-build-muscle-and-lose-fat-at-the-same-time"
              className="underline hover:text-bone"
            >
              whether you can build muscle and lose fat at the same time
            </Link>
            ,{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how many weekly sets it takes to build muscle
            </Link>
            , and{" "}
            <Link
              href="/science/questions/should-men-over-30-take-creatine"
              className="underline hover:text-bone"
            >
              whether men over 30 should take creatine
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

        <HubRetentionCTA hub="online-fitness-coach-for-men" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-05-29.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

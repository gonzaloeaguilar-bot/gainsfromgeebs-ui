import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { GEEBS_METHOD_ID, geebsMethodSchema } from "@/lib/geebsMethod";
import Link from "next/link";
import KrisMediaFigure from "@/components/KrisMediaFigure";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "The Geebs Methodology | Training, Nutrition, Recovery",
  description:
    "How The Geebs Method coaches body recomposition with individualized hard training, nutrition that supports training, recovery, and daily accountability.",
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/methodology`,
    title: "The Geebs Methodology — Evidence-Based 1:1 Coaching",
    description:
      "The four levers Kris uses with clients: hard individualized training, nutrition that supports training, recovery, and daily accountability. Cited evidence.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching methodology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Geebs Methodology — Evidence-Based 1:1 Coaching",
    description:
      "Hard training, nutrition support, recovery, and accountability methodology from Kris Oddo, NASM-CPT.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// FAQPage schema for the methodology page — each Q&A pair is an AI-citation surface.
const methodologyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many days per week does Geebs Coaching recommend training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3 to 4 resistance training sessions per week is the recommended frequency for the majority of clients. Research by Schoenfeld and colleagues shows that for trained lifters, splitting weekly volume across 2 or more sessions per muscle group produces superior hypertrophy compared to training each muscle once per week. Most working clients can sustain 3-4 sessions consistently; 5-6 day splits typically break under real-life scheduling pressure.",
      },
    },
    {
      "@type": "Question",
      name: "How much protein does Geebs Coaching recommend for body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Geebs Coaching anchors most clients around 0.8 grams of protein per pound of bodyweight per day — for a 200-pound man, roughly 160 grams daily, distributed across 3-5 meals. Because most clients are in a fat-loss phase rather than a hard muscle-building block, protein is set to protect lean mass in a deficit without making the diet hard to stick to. This sits within the range supported by the International Society of Sports Nutrition Position Stand (Jäger et al., 2017), which recommends 1.4 to 2.0 grams per kilogram for resistance-trained individuals.",
      },
    },
    {
      "@type": "Question",
      name: "Does Geebs Coaching use cutting and bulking phases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the client's starting body composition and goals. For most working clients with 10-25 pounds to lose, a sustained moderate deficit with structured diet breaks works better than aggressive cuts. Research by Helms and colleagues supports the use of refeeds and diet breaks during prolonged dieting to mitigate metabolic adaptation and adherence drop-off. Aggressive recomposition phases are reserved for clients with appropriate training history and recovery capacity.",
      },
    },
    {
      "@type": "Question",
      name: "How often should clients adjust their training program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kris adjusts client programs from the weekly check-in data and the daily accountability messages in between. Every week, he and the client review the past seven days workout by workout, but the day-to-day messages catch the real constraints earlier: missed breakfast, missed workouts, work schedule, training window, sleep, recovery, meal timing, and calorie overages.",
      },
    },
    {
      "@type": "Question",
      name: "How does daily accountability work in Geebs Coaching?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Daily accountability is direct messaging with Kris around the client's actual day: the plan for breakfast, meal timing, when training fits, whether the client trains before work, after work, or only on days off, and how sleep and recovery are going. The weekly call reviews the data, but daily contact keeps the plan from drifting before the week is over. If a client misses a workout or goes over calories, Kris can adjust the rest of the week instead of treating it as a failed reset.",
      },
    },
    {
      "@type": "Question",
      name: "How does The Geebs Method handle imperfect weeks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The method assumes imperfect weeks. Missed workouts are moved when possible, nutrition is managed across the weekly average, and daily messaging gives Kris a chance to correct the plan before one bad day becomes a lost week.",
      },
    },
    {
      "@type": "Question",
      name: "What role does sleep play in the Geebs methodology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sleep is treated as a primary training variable, not a soft suggestion. Research from Dattilo and others links chronic sleep restriction to reduced muscle protein synthesis, impaired recovery, and increased lean mass loss during caloric deficit. Clients are coached to prioritize 7 to 9 hours of sleep per night; nutrition and training are programmed around their actual sleep reality, not an idealized version of it.",
      },
    },
    {
      "@type": "Question",
      name: "How does Geebs Coaching decide which research to publish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standing searches run against PubMed on a schedule, filtered to randomized controlled trials, systematic reviews, and meta-analyses published recently. Nothing that turns up is published automatically: a study only appears after a human opens the abstract and confirms the PMID, the DOI, and that the finding matches the summary. Strength of evidence is graded from the study designs themselves — a single trial is labelled as a single trial, pooled evidence across multiple trials earns a stronger grade, and observational or laboratory-only evidence is marked as weaker. Every page carries an Honest limits note stating what the evidence does not prove. Kris Oddo, NASM-CPT, writes the coaching interpretation; none of it is medical advice.",
      },
    },
  ],
};

// Article schema — signals authority + author to AI assistants + search.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "The Geebs Methodology — Training, Nutrition, and Recovery",
  description:
    "Evidence-based methodology for body recomposition coaching, by Kris Oddo, NASM-CPT.",
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
  datePublished: "2026-05-21",
  dateModified: "2026-06-03",
  mainEntityOfPage: `${SITE_URL}/methodology`,
  // Points at the one canonical Method entity (lib/geebsMethod.ts). Both pages
  // describe the same thing; this is what makes search and answer engines treat
  // them as one named entity instead of two competing definitions.
  about: { "@id": GEEBS_METHOD_ID },
  };

export default function MethodologyPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="methodology-faq-schema" data={methodologyFaqSchema} />
      <JsonLd id="methodology-article-schema" data={articleSchema} />
      <JsonLd id="methodology-definedterm-schema" data={geebsMethodSchema()} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Methodology</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            The Geebs Methodology for body recomposition
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            The Geebs Method is built around four levers — training,
            nutrition, recovery, and daily accountability — applied to working
            clients whose schedules don&apos;t fit textbook programs. Kris&apos;s voice-note
            definition is simple: hard training, nutrition that supports that
            training, recovery through sleep and food, and accountability that
            catches the miss before the week is gone. The references below are
            real research, not anecdote.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <KrisMediaFigure
          src="/media/kris/kris-oddo-back-training-physique.jpg"
          alt="Kris Oddo showing back development during a gym training session"
          caption="Kris's own training context. The methodology is a coaching process, not a guaranteed outcome claim."
          imageClassName="object-cover object-[50%_36%]"
        />

        <div className="hair my-10 md:my-14" />

        {/* Section 1 — Training */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            1. Training: progressive overload across 3-4 weekly sessions
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Most clients train 3 to 4 days per week, hitting each major muscle
            group at least twice. Research by Brad Schoenfeld and colleagues
            (2016, <i>Sports Medicine</i>) showed that splitting weekly
            training volume across 2 or more sessions per muscle group
            produces superior hypertrophy compared to a once-per-week split.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Why not 5-6 days? Because a 5-day split that gets executed at 60%
            adherence loses to a 3-day program executed at 95%. For working
            clients with kids, commutes, and inconsistent sleep, the cap on
            results is rarely the program — it&apos;s the gap between the
            program and what actually happens in a real week.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Kris also individualizes around equipment and limitations. If a
            client cannot access a movement, or a lift repeatedly aggravates
            something, the answer is not to force the same template. The plan
            changes while the training standard stays high.
          </p>
          <p className="mt-4 text-[14px] text-mute2 max-w-[64ch] leading-[1.6]">
            Reference: Schoenfeld, B. J., Ogborn, D., &amp; Krieger, J. W.
            (2016). Effects of resistance training frequency on measures of
            muscle hypertrophy: a systematic review and meta-analysis.{" "}
            <i>Sports Medicine</i>, 46(11), 1689-1697.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 2 — Nutrition */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            2. Nutrition: macro targets, not restriction
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Clients hit a protein target — around 0.8 grams per pound of
            bodyweight per day — then build the rest of their nutrition around
            that floor. Because most clients are in a fat-loss phase, protein
            is set to protect lean mass in a deficit. The International Society
            of Sports Nutrition Position Stand on Protein and Exercise (Jäger
            et al., 2017) supports this range for individuals doing resistance
            training. For a 200-pound man, that is roughly 160 grams of protein
            per day distributed across 3-5 meals.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Carbohydrates and fats are flexible. There is no banned-food list.
            For most working clients, the right approach is closer to &quot;hit
            protein, eat to satiety&quot; than &quot;no carbs after 6pm.&quot;
            Restriction-based plans fail under stress; macro-target plans
            adapt.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            In Kris&apos;s language, nutrition supports the training. The goal is
            not only to hit numbers, but to teach the client what good decisions
            look like: high protein, lower-fat choices when useful, quality
            carbs, and enough macro awareness to recover better and stop
            guessing.
          </p>
          <p className="mt-4 text-[14px] text-mute2 max-w-[64ch] leading-[1.6]">
            Reference: Jäger, R., Kerksick, C. M., Campbell, B. I., et al.
            (2017). International Society of Sports Nutrition Position Stand:
            protein and exercise.{" "}
            <i>Journal of the International Society of Sports Nutrition</i>,
            14(1), 20.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 3 — Recovery */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            3. Recovery: sleep is a training variable
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Sleep gets programmed like training does. Research by Dattilo and
            colleagues (2011) linked chronic sleep restriction to reduced
            muscle protein synthesis, impaired recovery, and increased lean
            mass loss during caloric deficit. The target is 7-9 hours per
            night, every night.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            When training fatigue builds up — lifts stalling, sleep slipping,
            motivation dropping — volume comes down for a stretch before it
            climbs again, timed to what the weekly check-in shows rather than a
            fixed calendar. Diet breaks (a planned return to maintenance
            calories) come roughly every 8-12 weeks of dieting per Helms et al.
            (2014). Recovery is not a reward for working hard — it is the
            mechanism through which work becomes results.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Kris treats nutrition as part of recovery too. Better food quality
            and enough protein do not just affect the scale. They change how the
            client feels, trains, and comes back for the next session.
          </p>
          <p className="mt-4 text-[14px] text-mute2 max-w-[64ch] leading-[1.6]">
            References: Dattilo, M., Antunes, H. K. M., Medeiros, A., et al.
            (2011). Sleep and muscle recovery: endocrinological and molecular
            basis for a new and promising hypothesis. <i>Medical Hypotheses</i>,
            77(2), 220-222. · Helms, E. R., Aragon, A. A., &amp; Fitschen,
            P. J. (2014). Evidence-based recommendations for natural
            bodybuilding contest preparation. <i>JISSN</i>, 11(1), 20.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Section 4 — Accountability */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            4. Accountability: daily first, weekly review second
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The weekly call matters, but it is not the thing that makes Geebs
            different. Most serious coaches review the week. Kris&apos;s edge is
            the daily accountability: messages about the plan for the day,
            whether breakfast happened, where meals fit around work, when the
            gym can realistically happen, and what needs to change tomorrow.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The weekly check-in still reviews the data workout by workout and
            adjusts the next week. The daily contact keeps the plan alive while
            the week is happening: if a client works 12 hours, trains only on
            days off, misses breakfast, or sleeps poorly, the plan changes
            around that reality instead of waiting until the next call to find
            out the week already fell apart.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            That includes bad-week handling. If a workout gets missed, Kris can
            move it to the weekend or compress the week. If calories run high
            for a day or two, the rest of the week can be adjusted so the weekly
            average still points in the right direction. The goal is not
            perfection. The goal is getting back on track before the client
            mentally starts over.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* How research gets chosen */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How the research on this site gets chosen
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Nothing here starts with an opinion and hunts for a study to back
            it up. Standing searches run against PubMed — the U.S. National
            Library of Medicine&apos;s database — on a set schedule, filtered to
            randomized trials, systematic reviews, and meta-analyses published
            recently. Nothing that turns up goes straight onto the site.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A study is only published here after a human opens the abstract and
            confirms the PMID, the DOI, and that the finding actually says what
            the summary claims. Studies that don&apos;t survive that check are
            thrown out. If a claim has no study behind it, it doesn&apos;t go on the
            page.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Strength of evidence is graded from the studies themselves, not
            from how confident anyone feels. One trial is labelled as one
            trial. Pooled evidence across several trials earns a stronger
            grade. Where the research is only observational or from a lab, the
            page says so. Every page also carries an{" "}
            <b>Honest limits</b> note describing what the evidence does not
            prove — because &quot;this helped a bit in one 12-week trial&quot; and
            &quot;this will fix your problem&quot; are very different sentences.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Kris Oddo (NASM-CPT) writes the coaching interpretation. None of it
            is medical advice, none of it diagnoses or treats a condition, and
            none of it replaces your doctor — especially if you take
            medication or have a diagnosed health condition.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Continuation Guarantee */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Continuation Guarantee
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Follow The Geebs Method and if you don&apos;t see results in 90 days, Kris keeps coaching you free until you do. This is not a refund guarantee — it&apos;s a commitment that Kris stays invested in your transformation.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Results depend on effort, consistency, and your starting point. But the structure is designed so that if you execute the work and the plan isn&apos;t landing, Kris adjusts it with you until it does.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <FAQSection faqs={methodologyFaqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Get the method applied to your week
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If this is the kind of coaching you want, the application is three
            questions and takes under two minutes. If it&apos;s not the right
            fit, the $100 one-time consultation call gets you Kris&apos;s read
            on your situation without a monthly commitment. For practical guides on the recomposition process, see{" "}
            <Link
              href="/geebs-method"
              className="underline hover:text-bone"
            >
              The Geebs Method
            </Link>
            ,{" "}
            <Link
              href="/blog/body-recomposition-for-men"
              className="underline hover:text-bone"
            >
              body recomposition for men
            </Link>
            {" "}and{" "}
            <Link
              href="/blog/how-to-fix-skinny-fat"
              className="underline hover:text-bone"
            >
              how to fix skinny fat
            </Link>
            ,{" "}
            <Link href="/vs/caliber" className="underline hover:text-bone">
              Geebs Coaching vs Caliber
            </Link>
            ,{" "}
            <Link
              href="/resources/online-fitness-coaching-cost-faq"
              className="underline hover:text-bone"
            >
              the online fitness coaching cost FAQ
            </Link>
            ,{" "}
            <Link
              href="/blog/is-online-fitness-coaching-worth-it"
              className="underline hover:text-bone"
            >
              whether online fitness coaching is worth it
            </Link>
            , or browse the{" "}
            <Link href="/blog" className="underline hover:text-bone">
              full resource center
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="methodology_primary">
              Get the method applied to your week
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

        {/* Named-author byline */}
        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-06-03. References
            cited from peer-reviewed journals.
          </p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

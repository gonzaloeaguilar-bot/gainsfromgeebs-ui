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
const SLUG = "/for/men-who-hate-the-gym";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-08-10";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=men_who_hate_the_gym_bottom_cta";

export const metadata: Metadata = {
  title: "Online Fitness Coaching for Men Who Hate Going to the Gym | Geebs Coaching",
  description:
    "1:1 online fitness coaching for men who hate the gym or deal with gym anxiety: build real strength and body recomposition at home or transition to a gym when ready.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "Online Fitness Coaching for Men Who Hate Going to the Gym | Geebs Coaching",
    description:
      "Build real strength and body recomposition at home without stepping into a commercial gym, or build the confidence and competence to walk into one on your terms.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for men who hate going to the gym — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coaching for Men Who Hate Going to the Gym",
    description:
      "Build real strength and body recomposition at home without stepping into a commercial gym. 1:1 online coaching by Kris Oddo, NASM-CPT.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Why does gym anxiety happen (and why is it so common)?",
    paras: [
      "Gym anxiety is rarely a lack of courage; it is almost always an information problem caused by being visibly lost. When you enter a crowded commercial gym without a structured plan, every decision — which exercise machine to pick, what weight to select, how many reps to perform — happens under public observation. That uncomfortable feeling of being watched is standard human psychology (the spotlight effect), but it hits men hardest when they lack certainty in their execution.",
      "Most men assume everyone else in the room is a seasoned regular judging their form or body composition. In reality, nearly every person in a gym is focused entirely on their own sets, music, or phone. Admitting that a commercial gym feels intimidating is uncomfortable for grown men, so many avoid training altogether rather than dealing with the friction.",
      "Understanding that gym anxiety stems from competence uncertainty rather than personal weakness is the first step toward solving it. Read the full guide on ",
    ],
  },
  {
    h2: "What equipment do you actually need to train effectively at home?",
    paras: [
      "Your muscles do not care whether tension comes from a ten-thousand-dollar commercial machine or a pair of adjustable dumbbells in your living room. Skeletal muscle responds strictly to mechanical tension, progressive resistance, and adequate metabolic stress. A basic home setup consisting of adjustable dumbbells, resistance bands, and a flat or incline bench is sufficient to stimulate progressive muscle hypertrophy across every major muscle group.",
      "The primary advantage of home training is the elimination of friction. Removing the commute, the crowded floor, and the waiting time between machine sets allows you to focus purely on exercise execution and progressive overload. You can adjust your workout environment, play your own music, and train at whatever pace fits your daily schedule.",
      "Scientific studies demonstrate that progressive resistance training drives hypertrophy regardless of equipment style; however, home workouts require strict effort tracking to ensure proximity to muscle failure without relying on heavy fixed machines. Learn more in our detailed breakdown of ",
    ],
  },
  {
    h2: "How do you build gym confidence before walking into a commercial facility?",
    paras: [
      "Confidence in the gym is not a personality trait you inherit; it is a side effect of knowing your exact plan before stepping through the door. Men who successfully transition from home workouts to commercial gyms do so by mastering their core movement patterns privately first. When you already know how to perform a goblet squat, a dumbbell row, or a Romanian deadlift with clean technique, the gym floor stops feeling like a stage.",
      "Building confidence requires removing improvisation. Walking into a facility with an explicit written plan — stating exact exercise choices, working weights, set targets, and warm-up routines — eliminates the awkward pauses that trigger self-consciousness.",
      "By establishing movement competence and progressive habits in a private environment, you convert gym attendance from an intimidating hurdle into a routine mechanical task. For step-by-step strategies, see our guide on ",
    ],
  },
  {
    h2: "Can you get real body recomposition results without joining a gym?",
    paras: [
      "Body recomposition is governed by progressive mechanical tension and nutritional precision, neither of which requires a gym membership card. Rebuilding your physique — dropping fat while adding dense lean muscle — depends on hitting a daily protein target (0.8–1.0 grams per pound of body weight), maintaining a structured calorie deficit or maintenance intake, and consistently applying progressive resistance to your lifts.",
      "Many men believe that effective body recomposition requires heavy barbell squat racks or specialized cable machinery. While commercial gyms offer variety and heavier loading capacity, progressive dumbbell variations, bodyweight progressions, and band tension provide ample stimulus for substantial physique changes over 12 to 52 weeks.",
      "Studies on resistance training adaptations confirm that muscle growth and fat loss occur reliably when effort and nutrition are dialed in, regardless of training venue. However, training at home requires honest effort assessment to ensure you push within 1–3 reps of muscular failure. Compare home and gym recomposition frameworks in ",
    ],
  },
  {
    h2: "How does video form review deliver coaching without in-person judgment?",
    paras: [
      "Asynchronous video form review gives you elite technique feedback without the awkwardness of an in-person trainer watching your every move. Traditional in-person training requires scheduling fixed appointment slots and performing exercises while a trainer stands directly over you, which often amplifies feeling self-conscious for men dealing with gym anxiety.",
      "With 1:1 online coaching, you film a quick clip of your work sets on your phone from your home space or quiet workout area and upload it directly to your coach. Kris reviews your bar path, joint angles, tempo, and range of motion, providing precise video and voice notes on what to adjust for your next session.",
      "This model combines private execution with professional oversight: you get expert verification that your technique is safe and effective without performing under public scrutiny.",
    ],
  },
  {
    h2: "When does it make sense to transition to a commercial gym?",
    paras: [
      "The gym is a convenient tool for heavy loading, not a mandatory prerequisite for getting into peak shape. Transitioning to a commercial gym only makes sense when your strength progression outgrows your home dumbbell capacity, or when you genuinely desire access to heavy barbells, leg presses, and specialized cable equipment.",
      "Many coaching clients elect to train exclusively at home permanently, achieving exceptional health and physique transformations without ever setting foot in a commercial gym. Others use 3 to 6 months of home coaching to build strength, lose initial body fat, and master movement form, then transition into a gym with total self-assurance.",
      "Either path — remaining home-only or eventually joining a gym — is treated with equal rigor. Explore how remote routines fit into busy lifestyle structures in ",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Can I get in shape without ever going to a gym?",
    a: "Yes. Home training with dumbbells or bands, progressed correctly, drives real strength and body composition change. A gym is one tool among several, not a requirement.",
  },
  {
    q: "Why do I feel anxious or self-conscious at the gym?",
    a: "Extremely common — usually a mix of not knowing the equipment, feeling watched, and comparison to more experienced lifters. It fades with competence, which is exactly what a clear program builds.",
  },
  {
    q: "How does online coaching help with gym anxiety specifically?",
    a: "By removing the guesswork that causes it — a program that tells you exactly what to do, plus video form review, so you're not improvising in public while feeling watched.",
  },
  {
    q: "What equipment do I actually need to start at home?",
    a: "A pair of adjustable dumbbells and a bench covers most programs; resistance bands work as a lower-cost start. Programs are built around what you have.",
  },
  {
    q: "Will I eventually need to go to a gym to keep progressing?",
    a: "Not necessarily — home training can progress for a long time with the right equipment additions. Some clients transition to a gym later for access to heavier loads; it's not required.",
  },
  {
    q: "Is this different from a general beginner program?",
    a: "Yes — the FAQ set and programming here center on the anxiety/logistics barrier specifically, not just \"never trained before.\" See also: body recomposition for beginners.",
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
  title: "Online Fitness Coaching for Men Who Hate Going to the Gym",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Online Fitness Coaching for Men Who Hate Going to the Gym",
  description:
    "1:1 online fitness coaching for men who hate the gym or deal with gym anxiety: build real strength and body recomposition at home or transition to a gym when ready.",
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
    { "@type": "Thing", name: "Gym anxiety in men" },
    { "@type": "Thing", name: "Home strength training" },
    { "@type": "Thing", name: "Online fitness coaching for home workouts" },
    { "@type": "Thing", name: "Body recomposition without a gym" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Men Who Hate Going to the Gym",
  serviceType: "online fitness coaching for home training / gym-anxious men",
  description:
    "1:1 online fitness coaching for home training and gym-anxious men — custom dumbbell and home programming, video form review, equipment-flexible routines, and daily accountability.",
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

export default function MenWhoHateTheGymPage() {
  return (
    <>
      <JsonLd id="men-who-hate-gym-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="men-who-hate-gym-article-schema" data={articleSchema} />
      <JsonLd id="men-who-hate-gym-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online Fitness Coaching for Men Who Hate Going to the Gym
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Most men who &ldquo;hate the gym&rdquo; don&apos;t actually hate training — they hate feeling watched, not knowing what to do with equipment, or walking into a room where everyone else looks experienced. Geebs Coaching provides 1:1 structure and video form review to build real strength at home, or to walk into any gym with complete confidence.
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
            The gym is a tool, not a requirement for getting in shape
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Most men who &ldquo;hate the gym&rdquo; don&apos;t actually hate training — they hate feeling watched, not knowing what to do with the equipment, or walking into a room where everyone else looks like they know what they&apos;re doing. That discomfort is common enough that it has a name (gym anxiety), and it&apos;s also completely solvable without forcing yourself into a commercial gym at all. Home training with dumbbells, resistance bands, or a modest garage setup can build real strength and drive real body recomposition — the gym is a tool, not a requirement.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For men who do want to eventually walk into a commercial gym with confidence, 1:1 coaching removes the guesswork that causes the anxiety in the first place: knowing exactly what to do, how much weight to use, and having a coach reviewing your form by video instead of guessing you&apos;re doing it right. Either path — home-only or gym-eventually — is coached the same way: a program built around what you&apos;ll actually do consistently, not what you feel obligated to do.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Client Archetype & Program Structure Proof Module */}
        <section className="rounded-[6px] border border-line2 bg-line2/10 px-5 py-5 md:px-6 md:py-6">
          <p className="eyebrow text-cloudText">Proof &amp; archetype</p>
          <h2 className="mt-2 display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Built for home-only &amp; gym-anxious lifters
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/85">
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Client Archetype:</strong> Home-training-only client with visible body recomposition results, or a gym-anxious starter seeking structured, private guidance without public judgment.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Program Structure:</strong> Equipment-flexible programming tailored around adjustable dumbbells, bands, or garage setups, incorporating video form reviews to build exercise competence.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Entry Options:</strong> 1:1 online coaching with direct daily access to Kris Oddo, NASM-CPT, or a $100 one-time consultation call for self-starters who want direction without a monthly commitment.
              </span>
            </li>
          </ul>
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
          slug="men-who-hate-the-gym"
          sourcePrefix="audience-early"
          cta={{
            href: "/tools/body-recomposition-calculator",
            label: "Body recomposition calculator \u2192",
            detail: "Your maintenance calories and protein floor. Free, no account.",
          }}
        />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[0].h2}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {SECTIONS[0].paras[0]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[0].paras[1]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[0].paras[2]}
            <Link
              href="/blog/gym-anxiety-for-men"
              className="underline hover:text-bone"
            >
              gym anxiety for men
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[1].h2}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {SECTIONS[1].paras[0]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[1].paras[1]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[1].paras[2]}
            <Link
              href="/blog/how-to-build-muscle-at-home"
              className="underline hover:text-bone"
            >
              how to build muscle at home
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[2].h2}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {SECTIONS[2].paras[0]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[2].paras[1]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[2].paras[2]}
            <Link
              href="/blog/how-to-build-confidence-in-the-gym"
              className="underline hover:text-bone"
            >
              building confidence in the gym
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[3].h2}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {SECTIONS[3].paras[0]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[3].paras[1]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[3].paras[2]}
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="underline hover:text-bone"
            >
              body recomposition for beginners
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[4].h2}
          </h2>
          {SECTIONS[4].paras.map((p, pi) => (
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

        <div className="hair my-10 md:my-14" />

        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            {SECTIONS[5].h2}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {SECTIONS[5].paras[0]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[5].paras[1]}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {SECTIONS[5].paras[2]}
            <Link
              href="/for/remote-workers"
              className="underline hover:text-bone"
            >
              online fitness coaching for remote workers
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
              href="/blog/gym-anxiety-for-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Gym anxiety: a straight guide for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Why the gym feels intimidating, why nobody is watching you, and the specific steps that remove the pressure.
              </span>
            </Link>
            <Link
              href="/blog/how-to-build-confidence-in-the-gym"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to build confidence in the gym
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Build gym confidence with a simple plan, exercise tracking, repeatable workouts, and less guessing.
              </span>
            </Link>
            <Link
              href="/blog/how-to-build-muscle-at-home"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to build muscle at home
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The equipment, progression rules, and consistency setups that build real muscle without a gym membership.
              </span>
            </Link>
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for beginners
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The fundamentals of losing fat while building muscle simultaneously — macros, resistance, and timeline expectations.
              </span>
            </Link>
            <Link
              href="/for/remote-workers"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Fitness coaching for remote workers
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                1:1 online coaching for work-from-home professionals building effective home workouts around a desk schedule.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
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
            Coaching built around what you&apos;ll actually do
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or apply for 1:1 coaching. The $100 one-time consultation call is there if you want to start without an application.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[60ch]">
            Prefer the peer-reviewed evidence first? See{" "}
            <Link
              href="/science/questions/how-many-sets-to-build-muscle"
              className="underline hover:text-bone"
            >
              how many weekly sets actually build muscle
            </Link>
            ,{" "}
            <Link
              href="/science/questions/does-strength-training-help-you-age-better"
              className="underline hover:text-bone"
            >
              what strength training does for how you age
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

        <HubRetentionCTA hub="men-who-hate-the-gym" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/online-fitness-coach-vs-nutritionist";
const PAGE_URL = `${SITE_URL}${SLUG}`;
const DATE_PUBLISHED = "2026-06-10";
const DATE_MODIFIED = "2026-07-10";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=guide&utm_campaign=coach_vs_nutritionist_apply&utm_content=guide_bottom_cta";

export const metadata: Metadata = {
  title:
    "Online Fitness Coach vs Nutritionist: Which Do You Need? | Geebs Coaching",
  description:
    "What a fitness coach does vs what a nutritionist (RD) does, when you need which, when you need both, and how Geebs handles nutrition within coaching scope — macro targets and habits, not medical diets.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Online Fitness Coach vs Nutritionist: Which Do You Need?",
    description:
      "Scope-of-practice honest comparison: what a fitness coach does vs an RD or nutritionist, when you need each, and what coaching covers vs what requires a registered dietitian.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach vs nutritionist — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coach vs Nutritionist: Which Do You Need?",
    description:
      "Honest comparison: fitness coach vs nutritionist scope, credentials, when you need each, and what Geebs covers.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is the difference between a fitness coach and a nutritionist?",
    a: "A fitness coach (typically NASM-CPT or similar credential) programs your training and provides nutrition guidance within scope: macro targets, protein goals, meal timing, and habit-based food decisions. A registered dietitian (RD) or licensed nutritionist handles medical nutrition therapy — therapeutic diets for conditions like diabetes, kidney disease, eating disorders, or post-surgical nutrition. The overlap is in general healthy-eating habits and macros; the dividing line is clinical medical nutrition.",
  },
  {
    q: "Can a fitness coach give nutrition advice?",
    a: "Yes — within scope. A certified fitness coach can set calorie and macro targets, recommend high-protein eating strategies, advise on meal timing and food choices for training, and coach general healthy-eating habits. What falls outside scope: prescribing therapeutic diets for diagnosed medical conditions, diagnosing nutritional deficiencies, or providing medical nutrition therapy. For general fitness nutrition — fat loss, muscle building, body recomposition — a good coach covers most of what most people need.",
  },
  {
    q: "Do I need a nutritionist or a fitness coach for weight loss?",
    a: "For most people pursuing fat loss through training, a fitness coach with nutrition coaching is the right starting point. A coach sets a calorie target, a protein goal, and guides the food habits that support training. A registered dietitian is the right call when weight loss is complicated by a medical condition, metabolic disorder, medication interactions, or when a physician has specifically recommended medical nutrition therapy.",
  },
  {
    q: "What does 'nutrition coaching' mean with Geebs Coaching?",
    a: "Macro targets based on your bodyweight and goal, practical food strategies for restaurants and travel, high-protein eating habits, daily check-ins around meals, and weekly adjustments against real progress data. This is habit-based fitness nutrition — not a rigid meal plan, not a therapeutic diet. It covers the nutrition side of body recomposition, fat loss, and muscle building for healthy adults.",
  },
  {
    q: "When do I need both a fitness coach and a nutritionist?",
    a: "When you have both a training goal and a medical nutrition condition running at the same time. Example: a man with Type 2 diabetes who wants to lose 40 lb and build muscle — the training and habit-based nutrition side is the coach's lane; the diabetes management and carbohydrate exchange protocol is the dietitian's lane. The two do not conflict; they coordinate.",
  },
  {
    q: "Is a nutritionist the same as a registered dietitian (RD)?",
    a: "No. In most US states, 'nutritionist' is an unprotected title — anyone can use it. 'Registered Dietitian' (RD) or 'Registered Dietitian Nutritionist' (RDN) is a federally protected credential requiring a nutrition degree, supervised clinical hours, and a national board exam. If you need medical nutrition therapy, verify the professional is an RD or RDN, not just a self-styled 'nutritionist.'",
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
  title: "Online Fitness Coach vs Nutritionist: Which Do You Need?",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Fitness Coach vs Nutritionist: Which Do You Need?",
  description:
    "What a fitness coach does vs a registered dietitian, when you need each, when you need both, and what nutrition coaching actually covers within fitness coach scope.",
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
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: PAGE_URL,
    about: [
    { "@type": "Thing", name: "Online fitness coach" },
    { "@type": "Thing", name: "Nutritionist" },
    { "@type": "Thing", name: "Registered dietitian" },
    { "@type": "Thing", name: "Nutrition coaching" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching with Nutrition Guidance",
  serviceType: "Online fitness coaching with nutrition coaching",
  description:
    "1:1 online fitness coaching by Kris Oddo, NASM-CPT — custom training plus habit-based nutrition coaching (macro targets, protein goals, food strategies). Not medical nutrition therapy.",
  provider: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "NASM-CPT",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "United States" },
  url: PAGE_URL,
};

export default function FitnessCoachVsNutritionistPage() {
  return (
    <>
      <JsonLd id="coach-vs-nutritionist-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="coach-vs-nutritionist-article-schema" data={articleSchema} />
      <JsonLd id="coach-vs-nutritionist-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online fitness coach vs nutritionist: which do you need?
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Short answer: for body recomposition, fat loss, or muscle building,
            a fitness coach with nutrition coaching covers most of what most
            people need. A registered dietitian (RD) is the right choice when
            your nutrition needs are clinical — a medical condition, therapeutic
            diet, or physician referral. Here is the honest scope-of-practice
            breakdown.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Early, in-read: the only capture on these pages sat past the

            scroll point 97% of readers never reach. */}

        <ArticleEarlyCapture slug="online-fitness-coach-vs-nutritionist" sourcePrefix="guide-early" />


        <div className="hair my-10 md:my-14" />


        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Fitness coach vs nutritionist: quick comparison
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            If the goal is changing body composition with training, start with
            a fitness coach. If the goal includes medical nutrition therapy,
            start with an RD or RDN. This is the clean comparison.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Decision point
                  </th>
                  <th className="py-3 pr-4 text-[13px] font-medium uppercase tracking-[0.08em] text-bone">
                    Online fitness coach
                  </th>
                  <th className="py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-mute2">
                    Nutritionist / RD
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line2/50">
                  <td className="w-[26%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                    Best for
                  </td>
                  <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                    Fat loss, muscle gain, body recomposition, training
                    consistency, and weekly accountability.
                  </td>
                  <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                    Medical nutrition therapy, clinical diet needs, and
                    condition-specific nutrition planning.
                  </td>
                </tr>
                <tr className="border-b border-line2/50">
                  <td className="w-[26%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                    Nutrition scope
                  </td>
                  <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                    Calories, macros, protein goals, meal timing, food habits,
                    and adjustments for training progress.
                  </td>
                  <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                    Therapeutic diets, clinical nutrition assessment, and
                    physician-referred nutrition care.
                  </td>
                </tr>
                <tr className="border-b border-line2/50">
                  <td className="w-[26%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                    Training support
                  </td>
                  <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                    Included: workouts, progression, exercise swaps, recovery,
                    form feedback, and adherence coaching.
                  </td>
                  <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                    Usually not included unless the provider is also separately
                    qualified to coach training.
                  </td>
                </tr>
                <tr className="border-b border-line2/50">
                  <td className="w-[26%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                    Credential signal
                  </td>
                  <td className="py-4 pr-4 align-top text-[14.5px] leading-[1.55] text-bone">
                    Fitness certification such as NASM-CPT, plus visible client
                    results and a clear coaching method.
                  </td>
                  <td className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80">
                    RD or RDN for clinical nutrition. The word
                    &ldquo;nutritionist&rdquo; alone may not be protected.
                  </td>
                </tr>
                <tr>
                  <td className="w-[26%] py-4 pr-4 align-top text-[14.5px] font-medium text-bone/80">
                    Use both when
                  </td>
                  <td
                    colSpan={2}
                    className="py-4 align-top text-[14.5px] leading-[1.55] text-bone/80"
                  >
                    You have a medical nutrition condition and a fitness goal:
                    the RD handles the clinical parameters; the coach handles
                    training, adherence, and habit-based execution.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* What each does */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What an online fitness coach does — and what falls outside scope
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A certified fitness coach (NASM-CPT or similar) programs your
            training and provides nutrition guidance within the fitness scope of
            practice: macro targets, protein goals, meal timing, food choices
            that support training, and habit-based accountability around eating.
            This covers the nutrition side of fat loss, muscle building, and
            body recomposition for healthy adults.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            What falls outside a coach&apos;s scope: medical nutrition therapy,
            therapeutic diets for diagnosed conditions (diabetes, kidney
            disease, eating disorders, post-surgical care), prescribing
            supplements for deficiencies, or providing nutrition advice that
            requires clinical assessment. If your nutrition needs are tied to a
            medical condition, an RD is the right professional — not a fitness
            coach.
          </p>
        </section>

        <div className="hair my-10" />

        {/* What a nutritionist / RD does */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What a registered dietitian (RD) does — and the credential
            distinction
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            A Registered Dietitian (RD) or Registered Dietitian Nutritionist
            (RDN) is a federally protected credential in the United States.
            Earning it requires a nutrition-focused bachelor&apos;s or
            master&apos;s degree, 1,200+ hours of supervised clinical practice,
            and passing a national board exam. RDs are licensed to provide
            medical nutrition therapy — the clinical practice of using food and
            nutrition to manage disease.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Important: &ldquo;nutritionist&rdquo; is an unprotected title in
            most US states. Anyone can call themselves a nutritionist without a
            credential. If you need clinical nutrition care, verify the
            professional holds the RD or RDN credential specifically — not just
            a nutrition certification.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            RDs also work with healthy populations — sports nutrition, weight
            management, general eating habits — but their unique value and legal
            scope is the clinical layer. For general fitness nutrition, many
            clients do not need an RD.
          </p>
        </section>

        <div className="hair my-10" />

        {/* When each */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            When you need a fitness coach, when you need an RD, and when both
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            <strong className="text-bone">Start with a fitness coach when:</strong> your
            goal is body recomposition, fat loss, muscle building, or general
            fitness — and you do not have a medical condition that requires
            therapeutic nutrition. A coach with nutrition coaching handles the
            macros, habits, and training integration you need.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <strong className="text-bone">See an RD when:</strong> you have a
            diagnosed condition where nutrition is part of medical management —
            Type 2 diabetes, CKD, heart disease, an eating disorder history, or
            a physician referral for medical nutrition therapy. An RD can also
            work alongside your coach for complex cases.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            <strong className="text-bone">Use both when:</strong> you have a
            medical nutrition condition AND a fitness goal. The lanes do not
            conflict — the RD manages the clinical side, the coach manages
            training and habit-based nutrition within the parameters the RD
            sets.
          </p>
        </section>

        <div className="hair my-10" />

        {/* Cost comparison */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Cost comparison: fitness coach vs nutritionist
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Registered dietitian sessions typically run $100–$200 per session
            for private-pay; insurance may cover RD services for specific
            medical conditions. A typical nutrition counseling engagement is 4–8
            sessions.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            Online 1:1 fitness coaching with nutrition guidance runs
            $200–$500/month for genuine 1:1 with daily contact. This includes
            the training program AND the nutrition coaching — macro targets,
            daily check-ins, food strategy, weekly adjustments. It is a
            continuous coaching relationship, not per-session.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            For the full cost breakdown of coaching tiers, see{" "}
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="underline hover:text-bone"
            >
              how much does an online fitness coach cost
            </Link>
            .
          </p>
        </section>

        <div className="hair my-10" />

        {/* How Geebs handles nutrition */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            How Geebs Coaching handles nutrition — what is included and what is
            not
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Nutrition coaching is core to the Geebs program — not a bolt-on.
            Kris Oddo (NASM-CPT) sets macro targets based on your bodyweight
            and goal, builds flexible food strategies around your real eating
            patterns (restaurants, travel, family meals), and adjusts targets
            weekly against your actual progress data.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            This is habit-based fitness nutrition — not a rigid meal plan, not
            a therapeutic diet. For most clients pursuing fat loss, recomposition,
            or muscle building without a concurrent medical condition, this
            covers the nutrition side of the goal completely.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            What Geebs coaching does not do: prescribe therapeutic diets for
            medical conditions, provide medical nutrition therapy, or diagnose
            nutritional deficiencies. If you have a condition that requires
            clinical nutrition care, the honest answer is to see an RD first and
            bring their parameters into the coaching relationship.
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
              href="/guides/what-does-an-online-fitness-coach-do"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                What does an online fitness coach do?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                What coaching includes day-to-day, what is covered vs an app,
                and what a coach cannot do.
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
                Honest 2026 price ranges for 1:1, app-based, and premium
                coaching.
              </span>
            </Link>
            <Link
              href="/for/busy-professionals"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Nutrition coaching for busy professionals
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Flexible macro targets and food strategies that survive
                restaurants, travel, and client dinners.
              </span>
            </Link>
            <Link
              href="/blog/how-to-hire-an-online-fitness-coach"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How to hire an online fitness coach
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The vetting checklist — what to ask, what credentials matter,
                and the red flags to avoid.
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
                Compare coach certifications, vetting standards, and credential criteria on Titan Forge.
              </span>
            </a>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ */}
        <section className="prose-section">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions: fitness coach vs nutritionist
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
            Coaching that covers training and nutrition together
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Geebs 1:1 coaching is built around both — custom training and
            habit-based nutrition in one program, from one coach. See{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              how Kris coaches
            </Link>{" "}
            or start with the{" "}
            <Link
              href="/memberships/science-based-community"
              className="underline hover:text-bone"
            >
              $24.99/month science-based community
            </Link>{" "}
            if you want a lower-commitment way in before applying.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-analytics-source="coach_vs_nutritionist_bottom"
              data-analytics-event="coach_vs_nutritionist_apply_click"
              data-analytics-link-kind="apply"
             data-cta="guide_primary">
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

        <GuideRetentionCTA guide="online-fitness-coach-vs-nutritionist" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-06-15.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

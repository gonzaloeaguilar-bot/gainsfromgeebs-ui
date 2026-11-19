import type { Metadata } from "next";
import CoachingPriceLine from "@/components/CoachingPriceLine";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import HubRetentionCTA from "@/components/HubRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import { BACK_IN_SHAPE_HUB_HREF, RESTART_SOURCES } from "@/data/backInShapeHubs";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/former-athletes";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-10-13";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=former_athletes_bottom_cta";

export const metadata: Metadata = {
  title:
    "Online Fitness Coaching for Former Athletes | Geebs Coaching",
  description:
    "1:1 online fitness coaching for former high-school and college athletes returning to training: calibrate intensity, rebuild a strength base, and leverage muscle memory without re-injury.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "Online Fitness Coaching for Former Athletes: Getting Back the Body You Used to Have",
    description:
      "Former athletes have muscle memory, but training like you are 19 again leads to injury. 1:1 coaching to rebuild your strength base safely.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Online fitness coach for former athletes — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Fitness Coaching for Former Athletes",
    description:
      "Getting back the body you used to have. 1:1 coaching that leverages muscle memory while respecting where your body is today.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Why the comeback attempt usually fails in the first month",
    paras: [
      "The primary reason former athletes fail during a fitness comeback is pacing, not willpower. When you have a history of competitive sports, your mental threshold for hard effort was forged during two-a-days, heavy conditioning drills, and high-intensity practice. Returning to the gym after five to fifteen years at a desk with that same aggressive mindset creates a sharp mismatch between what your mind demands and what your connective tissue can handle.",
      "Attempting to jump directly into five high-volume lifting sessions or intense metabolic circuits leads to predictable failure: severe joint soreness, flared tendonitis, or overwhelming systemic fatigue within three weeks. You end up forced into an unplanned rest period, reinforcing the frustrating belief that your body is permanently past its prime. The mistake is treating a detrained body like an active athlete on day one.",
      "The obstacle for a former athlete is rarely lack of effort; it is applying high-school intensity to a body that has spent ten years at a desk.",
    ],
  },
  {
    h2: "Old sports injuries that flare up when you start training again",
    paras: [
      "Most former athletes carry a lingering roster of old competitive injuries: an AC joint separation from football, a meniscus tear from basketball, or chronic lower back tightness from years of heavy squatting or pitching. When you pause training for years, the supporting musculature around those compromised joints weakens, leaving old injury sites vulnerable to aggravation when heavy loading resumes.",
      "Pushing through joint pain with the old competitive mindset — 'no pain, no gain' — is the fastest way to derail a comeback. Modern coaching handles old injuries through deliberate exercise modification: substituting movement variations that load target muscles without compressing irritated joints, adjusting range of motion, and pacing progression around joint readiness rather than raw ambition.",
      "Training around an old injury is a long-term strategy; training through an old injury is just setting up your next forced break.",
    ],
  },
  {
    h2: "Muscle memory: the real advantage former athletes have",
    paras: [
      "The genuine advantage former athletes possess over complete beginners is physiological and neurological: muscle memory is a documented biological reality. When you trained intensely in your youth, your muscle fibers acquired additional cell nuclei. Research shows these cell nuclei persist even through extended periods of detraining, allowing returning athletes to rebuild muscle volume and strength significantly faster than a novice building tissue for the first time.",
      "Alongside cell nucleus retention, former athletes retain movement literacy. Your central nervous system remembers how to hinge, squat, brace, and recruit motor units efficiently. Once initial joint adaptation and conditioning are re-established, your body responds rapidly to progressive overload, turning an 8 to 12-week consistency block into substantial physical recomposition.",
      "Former athletes do not start from scratch; prior training leaves a permanent cellular foundation that accelerates every week of smart retraining.",
    ],
  },
  {
    h2: "Strength training vs sport conditioning — why they're not the same thing",
    paras: [
      "Many former athletes confuse sport-specific conditioning with general strength training and body recomposition. High-school or collegiate practice relied heavily on sport conditioning: suicide sprints, gassers, and high-rep exhaustion drills designed to build sport endurance and mental toughness under fatigue. Applying that style of training to a post-athletic body with fat loss or muscle gain goals is counterproductive.",
      "General strength training focuses on controlled movement, progressive overload on key compound lifts, and sufficient recovery between sets to maximize muscle recruitment. For fat loss and recomposition, heavy structured lifting paired with a modest calorie deficit produces far superior body composition changes than exhausting cardio circuits. Re-learning how to train for longevity and physique rather than sport performance is essential.",
      "Sport conditioning was designed for game-day endurance; structured strength training is designed to build muscle and burn fat sustainably for life.",
    ],
  },
  {
    h2: "Rebuilding a base without re-injuring yourself",
    paras: [
      "A successful comeback requires an explicit base-building phase before ramping up intensity or heavy loading. For the first 4 to 6 weeks, training focuses on submaximal weights, mastering movement tempo, strengthening stabilizer muscles, and establishing consistent recovery habits. This phase prepares tendons, ligaments, and joints for the heavier demands to come.",
      "Gradual progression protects against the restart-and-crash cycle. By keeping 2 to 3 reps in reserve on major lifts and prioritizing movement quality, you stimulate muscle growth while giving connective tissue adequate time to adapt. Base-building feels conservative to someone used to max-effort sports, but it is the prerequisite for long-term consistency.",
      "Building a solid strength base for six weeks earns you the right to train hard for the next six years without blowing out a joint.",
    ],
  },
  {
    h2: "What 90 days looks like for a former athlete",
    paras: [
      "The client archetype for this program is a former high-school or college athlete who has spent 8 to 15 years in a desk job and wants to reclaim their athletic build. A coached 90-day transformation begins with an assessment of your injury history, current schedule, and equipment access. Phase one (Weeks 1–4) establishes a 3-day full-body lifting routine, baseline protein targets (0.8–1g per lb), and movement calibration.",
      "Phase two (Weeks 5–8) introduces progressive overload as muscle memory kicks in, increasing strength numbers while managing joint comfort. Phase three (Weeks 9–12) refines body composition through precise nutrition adjustments and targeted lifting intensity. 1:1 coaching offers direct daily access to Kris for real-time plan adjustments; if you are not ready for that, a $100 one-time consultation call gets you the plan without the monthly commitment.",
      "A structured 90-day comeback is paced so the first month builds the base the next two depend on.",
    ],
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "I used to be an athlete — why does getting back in shape feel so much harder now?",
    a: "Because the instinct is to train at your old intensity immediately, but a body that has been detrained for 8 to 15 years cannot handle the recovery demands of 19-year-old training. The frustration is usually a pacing problem, not an irreversible decline.",
  },
  {
    q: "Do I have an advantage over someone who never trained?",
    a: "Yes, though it is smaller than the gym legend. In a 2024 study (Cumming et al., PMID 39159314), muscle kept the extra nuclei it built during training through 16 weeks off, but regrowth was not clearly faster. In a 2024 trial (Halonen et al., PMID 39364857), strength and size came back faster in the first 5 weeks of retraining. The risk is using that head start to skip the base-building phase and get hurt.",
  },
  {
    q: "How do I deal with an old sports injury when I start training again?",
    a: "Program around it, not through it. That means selecting exercise variations that target the muscle without compressing the joint, using deliberate loading progressions, and accepting that 'playing through pain' at 19 and training smart at 32 are opposite strategies.",
  },
  {
    q: "Should I train the way I did for my sport?",
    a: "No. Sport conditioning was designed for competitive field or court demands. General strength training and nutrition coaching are built for long-term health, muscle retention, and fat loss, which is far more sustainable for post-athletic life.",
  },
  {
    q: "How fast will I get back to my old shape?",
    a: "Faster than a true beginner. The habit itself took about six weeks of four sessions a week in a study of new gym members (Kaushal & Rhodes, PMID 25851609), and strength returns fastest in the first few weeks back. Years off take longer than months off, so pace the first month to where you are now.",
  },
  {
    q: "Is it too late if I haven't trained in 10+ years?",
    a: "No. The comeback is about pacing intensity to your current physical capacity today, not whether the window has closed. Start with two or three short sessions a week and build from there.",
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
  title: "Online Fitness Coaching for Former Athletes: Getting Back the Body You Used to Have",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Online Fitness Coaching for Former Athletes: Getting Back the Body You Used to Have",
  description:
    "1:1 online fitness coaching for former athletes returning to training after a long break. Rebuild strength, protect old injuries, and leverage muscle memory.",
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
    { "@type": "Thing", name: "Fitness coaching for former athletes" },
    { "@type": "Thing", name: "Muscle memory in detrained athletes" },
    { "@type": "Thing", name: "Returning to training after sports" },
    { "@type": "Thing", name: "Body recomposition for ex-athletes" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Fitness Coaching for Former Athletes",
  serviceType: "fitness coaching for former athletes",
  description:
    "1:1 online fitness coaching for former high school and college athletes — base-building, injury-conscious programming, progressive load management, and daily accountability.",
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

export default function FormerAthletesPage() {
  return (
    <>
      <JsonLd id="former-athletes-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="former-athletes-article-schema" data={articleSchema} />
      <JsonLd id="former-athletes-service-schema" data={serviceSchema} />
      <ArticleShell exit compactExit scholarship={false} className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Who it&apos;s for</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Online Fitness Coaching for Former Athletes: Getting Back the Body You Used to Have
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Former athletes have a specific problem generic beginners don&apos;t:
            you already know what &ldquo;in shape&rdquo; feels like, which makes being
            out of shape now feel worse, not better. Geebs Coaching is 1:1 coaching
            built to calibrate intensity, protect old injuries, and leverage your
            muscle memory for a safe comeback.
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
            Former athletes need calibrated pacing, not 19-year-old intensity
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Former athletes have a specific problem generic beginners don&apos;t:
            you already know what &ldquo;in shape&rdquo; feels like, which makes being
            out of shape now feel worse, not better. The instinct is to train
            like you did at 19 — max effort, high volume, conditioning drills —
            and that instinct is usually what causes the shin splints, the tweaked
            shoulder, or the burnout that ends the comeback in three weeks.
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            The body that could recover from two-a-days at 20 needs a different
            approach at 30 or 35: rebuilding a strength base methodically,
            respecting old injuries that never fully resolved, and separating
            &ldquo;I used to be athletic&rdquo; from &ldquo;I currently train.&rdquo;
            The advantage former athletes have is real — muscle memory and
            movement literacy make the comeback faster than a true beginner&apos;s —
            but only if the program respects where the body actually is now, not
            where memory says it should be. Coaching here means calibrating
            intensity to current capacity while rebuilding toward what used to be
            normal.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Client Archetype & Program Structure Proof Module */}
        <section className="rounded-[6px] border border-line2 bg-line2/10 px-5 py-5 md:px-6 md:py-6">
          <p className="eyebrow text-cloudText">Proof &amp; archetype</p>
          <h2 className="mt-2 display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Built for former high-school &amp; college athletes
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/85">
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Client Archetype:</strong> Former high-school or college
                athlete, desk job now, 8–15 years detrained, looking to rebuild
                muscle and lose fat without blowing out old joints.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Program Structure:</strong> Progressive base-building phase
                (Weeks 1–4) before ramping up lifting intensity, protecting old
                injuries while leveraging muscle memory.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cloudText font-bold">•</span>
              <span>
                <strong>Entry Options:</strong> 1:1 coaching with direct daily
                access to Kris Oddo, NASM-CPT, or a $100 one-time consultation
                call for self-starters who want direction without a monthly
                commitment.
              </span>
            </li>
          </ul>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Evidence for the comeback (niche #3, 2026-10-13). Every figure is
            from the abstract; the full six questions live on the hub. */}
        <section
          className="rounded-[6px] border border-line2 bg-line2/10 px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="comeback-evidence"
          data-no-fold="true"
        >
          <p className="eyebrow text-cloudText">What the research says</p>
          <h2
            id="comeback-evidence"
            className="mt-2 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            You used to be in shape. Here is what that buys you.
          </h2>
          <ul className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/85">
            <li>
              <strong>It comes back faster.</strong> Adults who lifted for 10
              weeks, stopped for 10 and restarted gained strength and size faster
              in their first 5 weeks back than people starting fresh.{" "}
              <a href={RESTART_SOURCES.halonen.href} className="underline hover:text-bone" target="_blank" rel="noopener noreferrer">
                Halonen et al., 2024
              </a>
            </li>
            <li>
              <strong>A few missed weeks are not a reset.</strong> Men who took 3
              weeks off after every 6 weeks of training ended 24 weeks with the
              same gains as men who never stopped.{" "}
              <a href={RESTART_SOURCES.ogasawara.href} className="underline hover:text-bone" target="_blank" rel="noopener noreferrer">
                Ogasawara et al., 2013
              </a>
            </li>
            <li>
              <strong>The routine is the hard part.</strong> New gym members
              needed at least four sessions a week for six weeks before exercise
              became a habit.{" "}
              <a href={RESTART_SOURCES.kaushal.href} className="underline hover:text-bone" target="_blank" rel="noopener noreferrer">
                Kaushal &amp; Rhodes, 2015
              </a>
            </li>
          </ul>
          <p className="mt-5">
            <Link
              href={BACK_IN_SHAPE_HUB_HREF}
              className="text-[15px] font-semibold text-bone underline hover:text-cloudText"
            >
              Getting back in shape after a long break: the six questions →
            </Link>
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
              href="/blog/how-fast-do-you-lose-muscle-detraining"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                How fast do you lose muscle when you stop training?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The science of detraining, muscle memory at the cellular level, and
                why returning to shape happens faster than the original build.
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
                The structured guide to restarting training after multi-year gaps —
                pacing intensity, joint care, and baseline setting.
              </span>
            </Link>
            <Link
              href="/for/men-in-their-30s"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Online fitness coach for men in their 30s
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Coaching tailored for men balancing busy work schedules, recovery,
                and body recomposition in their 30s.
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
                The fundamentals of losing fat while building muscle simultaneously —
                macros, progressive resistance, and timeline expectations.
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
                Calculate your protein target and calorie baseline to start your
                recomposition phase today.
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
          slug="former-athletes"
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
            Coaching built for a sustainable comeback
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

        <HubRetentionCTA hub="former-athletes" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

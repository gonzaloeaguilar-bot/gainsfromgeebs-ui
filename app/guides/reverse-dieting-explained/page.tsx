import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/reverse-dieting-explained";
const DATE_PUBLISHED = "2026-08-10";
const DATE_MODIFIED = "2026-08-10";

export const metadata: Metadata = {
  title: "Reverse Dieting Explained: Raise Calories Without Fat Regain",
  description:
    "Reverse dieting is the deliberate, gradual increase of calories after a cut — usually 50-100 calories a week — to find maintenance without rapid fat regain.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title:
      "Reverse Dieting Explained: How to Raise Calories Back Up Without Regaining the Fat You Lost",
    description:
      "Learn the step-by-step 50-100 kcal protocol to increase your intake after a cut, recalibrate your metabolism, and prevent post-diet weight spikes.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Reverse Dieting Explained guide — Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Reverse Dieting Explained: How to Raise Calories Back Up Without Regaining the Fat You Lost",
    description:
      "A structured protocol for transitioning out of a calorie deficit: weekly increases, biofeedback monitoring, and post-cut maintenance strategy.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: {
  h2: string;
  quotable: string;
  paras: string[];
  citation?: { text: string; pmid?: string; detail?: string };
}[] = [
  {
    h2: "What reverse dieting actually is (and isn't)",
    quotable:
      "Reverse dieting is a structured transition tool to restore energy intake after a deficit, not a magical protocol that repairs a broken metabolic furnace.",
    paras: [
      "Reverse dieting is the deliberate, planned process of stepping up your daily energy intake week by week once a fat loss phase ends. Rather than leaping immediately from a 1,800-calorie deficit back to eating whatever you want, you increase daily targets by small increments — typically 50 to 100 calories per day each week — until you reach a stable post-diet maintenance level.",
      "The primary purpose of a reverse diet is to restore daily calories and dietary flexibility while keeping scale weight and body fat stable. During an extended calorie deficit, your body adapts by slowing down thyroid hormone conversion, reducing spontaneous movement (NEAT), and optimizing energy efficiency. Jumping calories up rapidly outpaces this adaptation, causing extra calories to be stored as body fat before your expenditure recalibrates.",
      "Crucially, reverse dieting is an adaptive recovery process, not metabolic repair. Your metabolism was never 'broken' or 'damaged' during your cut; it simply executed a normal physiological defense mechanism against starvation. A structured reverse diet gives your metabolic rate, hunger signals, and daily activity levels room to normalize alongside rising intake.",
    ],
    citation: {
      text: "In a landmark sports nutrition review, Trexler ET et al. (2014) documented that sustained energy restriction induces adaptive thermogenesis, suppressed thyroid signaling, and reduced total daily energy expenditure, requiring a structured energy intake restoration post-cut.",
      pmid: "24571926",
      detail:
        "Systematic review evidence demonstrates that metabolic adaptation lowers expenditure beyond fat-free mass changes, making gradual energy restoration useful for stabilizing post-diet body composition.",
    },
  },
  {
    h2: "Reverse dieting after a cut: the practical protocol",
    quotable:
      "The goal of a post-cut reverse diet is to increase daily energy intake by 50 to 100 calories per week while keeping weekly weight trends stable.",
    paras: [
      "To execute a practical post-cut reverse diet, begin with the exact daily intake you used during the final week of your cut. In week one of the reverse, add 50 to 100 calories per day to your target. For example, if your cutting target was 1,800 calories, your week-one reverse target becomes 1,850 to 1,900 calories per day.",
      "Distribute these added calories primarily into carbohydrates and dietary fats while holding your daily protein steady at 0.7 to 1.0 grams per pound of bodyweight. Carbs directly support muscle glycogen restoration and thyroid hormone signaling (T3), while healthy fats support endocrine recovery.",
      "Hold each weekly calorie level for 7 to 14 days while tracking your morning scale weight and weekly waist measurements. If your 7-day average weight remains stable or fluctuates by less than 0.5 pounds, add another 50 to 100 calories per day for the following week. Continue this step-wise progression until you reach a comfortable maintenance intake.",
    ],
  },
  {
    h2: "How fast should you raise calories?",
    quotable:
      "Increasing calories by 50 to 100 kcal per week balances metabolic recalibration against unnecessary diet prolongation.",
    paras: [
      "The speed at which you raise calories depends on your deficit severity, current body fat percentage, and psychological fatigue. A conservative rate (+50 calories/day each week) is best after deep or prolonged cuts, or for individuals who are hyper-sensitive to initial scale swings.",
      "A moderate rate (+75 to 100 calories/day each week) works best for most lifters finishing standard 8-to-16-week cuts. This pace restores energy, mood, and gym performance within 4 to 6 weeks without triggering rapid fat accumulation.",
      "An aggressive jump (+200 to 300 calories/day immediately in week one) is reserved for individuals experiencing severe physiological exhaustion or those returning from a short mini-cut. While an immediate jump restores energy faster, it carries a higher probability of temporary water retention and initial scale spikes.",
    ],
  },
  {
    h2: "Signs you need a reverse diet vs signs you don't",
    quotable:
      "Extended deficits and substantial weight loss warrant a structured reverse diet, while short 4-week cuts usually allow an immediate return to estimated maintenance.",
    paras: [
      "You need a structured reverse diet if you have completed an extended deficit of 12 weeks or longer, lost more than 10 to 15 percent of your starting body weight, or suffer from persistent fatigue, intense food cravings, and low daily step counts. In these scenarios, adaptive thermogenesis is pronounced, making a gradual intake ramp essential.",
      "Conversely, you do not need a reverse diet if you only completed a brief 3-to-4-week mini-cut, executed a minor 200-calorie deficit, or are transitioning directly into an intentional muscle-building phase (bulk) where minor fat gain is acceptable.",
      "For lifters finishing standard fat loss phases, running a 4-to-6-week reverse diet provides a controlled bridge between cutting and long-term maintenance or body recomposition.",
    ],
  },
  {
    h2: "Common mistakes: raising calories too fast, tracking too loosely",
    quotable:
      "Inaccurate food logging during a reverse diet turns a planned 75-calorie increase into an accidental 400-calorie surplus.",
    paras: [
      "The single most common reverse dieting mistake is treating the end of a cut as an permission-free cheat week. Jumping from a strict deficit directly into unmeasured restaurant meals rapidly overshoots your current maintenance requirement, filling empty fat cells while your metabolic expenditure is still adapted to lower intake.",
      "The second mistake is abandoning portion accuracy. Increasing intake by 75 calories per week requires precise logging on a digital food scale. If you stop weighing peanut butter or cooking oils, measurement drift will easily erase your planned progression and cause rapid weight gain.",
      "The third mistake is mistaking water and glycogen storage for fat gain. As carbohydrate intake rises, your muscles store additional glycogen and bound water (roughly 3 grams of water per gram of stored glycogen). Scale weight will often rise by 1 to 3 pounds in the first 10 days of a reverse diet; this is intramuscular fluid recovery, not new body fat.",
    ],
  },
  {
    h2: "Reverse dieting vs just eating at maintenance immediately",
    quotable:
      "Jumping immediately to estimated maintenance often overshoots actual energy needs because post-cut TDEE is lower than standard formulas predict.",
    paras: [
      "A frequent debate in nutrition coaching is whether to reverse diet gradually or jump straight to estimated maintenance intake on day one post-cut. Standard TDEE formulas base maintenance estimates on static equations (such as Harris-Benedict or Katch-McArdle) that fail to account for individual adaptive thermogenesis.",
      "When someone jumps straight to their calculated 'formula maintenance', they frequently enter a 200-to-400-calorie surplus because their real, post-cut energy expenditure is temporarily suppressed. A gradual reverse diet acts as a self-correcting intake audit: by stepping up intake incrementally, you discover your true live maintenance intake in real-time.",
      "For individuals struggling with extreme diet fatigue, a hybrid approach — jumping immediately to a conservative baseline (100 to 200 calories below estimated maintenance) and then stepping up by 50 calories per week — combines rapid psychological relief with controlled physical trend monitoring.",
    ],
    citation: {
      text: "In clinical metabolic research published in the International Journal of Obesity, Rosenbaum M et al. (2010) established that post-weight-loss energy expenditure drops by 300 to 500 kcal/day beyond changes in lean body mass, demonstrating why standard maintenance formulas overshoot post-cut energy requirements.",
      pmid: "20935667",
      detail:
        "Human clinical trials confirm that adaptive thermogenesis persists during weight maintenance, reinforcing the utility of gradual intake titration.",
    },
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is reverse dieting?",
    a: "Reverse dieting is a structured, gradual increase in daily calories after a cut — usually 50 to 100 calories per week — designed to raise energy intake back to maintenance without triggering rapid post-diet fat regain.",
  },
  {
    q: "Do I need to reverse diet after every cut?",
    a: "Not necessarily. Short, moderate cuts (3 to 4 weeks) usually do not produce heavy metabolic adaptation and allow an immediate return to estimated maintenance. Extended or aggressive cuts (12+ weeks) benefit most from a structured reverse diet.",
  },
  {
    q: "How much should I increase calories each week?",
    a: "Commonly 50 to 100 calories per day each week, adjusted based on weekly scale weight medians and waist measurements. Faster increases risk unneeded fat regain, while overly slow increases unnecessarily prolong diet restriction.",
  },
  {
    q: "Will I gain fat during a reverse diet?",
    a: "Some initial scale increase is normal and expected — typically 1 to 3 pounds of water and muscle glycogen refilling, not fat mass. Tracking weekly waist measurements alongside scale weight distinguishes fluid recovery from true fat gain.",
  },
  {
    q: "How is reverse dieting different from just eating at maintenance immediately?",
    a: "Jumping straight to formula-calculated maintenance often overshoots actual energy needs because post-cut metabolism is adapted downward. The gradual approach lets metabolic expenditure and daily activity catch up as calories rise.",
  },
  {
    q: "When should I stop increasing calories?",
    a: "Stop increasing calories when your daily intake reaches a comfortable, sustainable maintenance level where scale weight and waist measurements hold flat, or when you reach the starting intake target for your next phase.",
  },
  {
    q: "Do I need a coach for this, or can I do it myself?",
    a: "Reverse dieting is trackable solo with consistent daily logging and digital food scale use. However, interpreting trend data — distinguishing water retention from fat regain and setting weekly micro-adjustments — is where self-guided reverse diets frequently stall.",
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
  title: "Reverse Dieting Explained: How to Raise Calories Back Up Without Regaining the Fat You Lost",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Reverse Dieting Explained: How to Raise Calories Back Up Without Regaining the Fat You Lost",
  description:
    "The step-by-step guide to post-cut reverse dieting: weekly calorie increases, biofeedback tracking, and finding maintenance without rapid fat regain.",
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
    { "@type": "Thing", name: "Reverse dieting" },
    { "@type": "Thing", name: "Calorie maintenance" },
    { "@type": "Thing", name: "Post-cut diet transition" },
    { "@type": "Thing", name: "Adaptive thermogenesis" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Post-Cut Reverse Dieting and Online Coaching",
  serviceType: "Post-cut reverse dieting and online coaching",
  description:
    "1:1 online fitness and nutrition coaching to guide post-cut reverse dieting, set weekly calorie increases, and audit post-diet maintenance transition.",
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

export default function ReverseDietingExplainedPage() {
  return (
    <>
      <JsonLd id="reverse-dieting-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="reverse-dieting-article-schema" data={articleSchema} />
      <JsonLd id="reverse-dieting-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Reverse Dieting Explained: How to Raise Calories Back Up Without
            Regaining the Fat You Lost
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Reverse dieting is the deliberate, gradual increase of calories after
            a calorie deficit — usually 50 to 100 calories per week — to restore
            your maintenance intake without rapid fat regain. Instead of jumping
            immediately back to pre-diet eating levels on the day a cut ends, a
            structured reverse diet allows adaptive thermogenesis to recalibrate
            as your energy intake rises.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {/* Quick Answer Box */}
        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            How reverse dieting works post-cut
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Reverse dieting is the deliberate, gradual increase of calories after
            a cut — usually 50-100 calories a week — instead of jumping straight
            back to &quot;normal&quot; eating the day a diet ends. The point isn&apos;t
            to eat more forever; it&apos;s to find your new maintenance calories
            without the rapid fat regain that happens when someone goes from a
            1,800-calorie deficit straight to eating whatever they want. After a
            sustained deficit, metabolism has adapted downward (this is normal,
            not damage), and jumping calories up too fast outpaces that adaptation,
            so the extra energy gets stored as fat before the body recalibrates. A
            structured reverse diet — small weekly increases, tracked weight and
            measurements, adjusting based on the trend — lets metabolism catch
            back up while calories rise, which is the difference between &quot;the
            diet&apos;s over, I gained it all back&quot; and &quot;I&apos;m eating
            more and holding my results.&quot; It&apos;s most useful after an
            aggressive or extended cut, less necessary after a short, moderate
            one.
          </p>
          <p className="mt-4 text-[14.5px] md:text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">
            Honest limits: Reverse dieting does not repair &quot;damaged&quot;
            metabolism, nor does it allow you to eat unlimited calories without
            gaining fat. Metabolic adaptation is a normal physiological response,
            not permanent damage. If intake exceeds real energy expenditure, fat
            gain will occur regardless of how gradual your previous adjustments
            were.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Sections */}
        {/* Early, in-read. The component exists because the only capture on
            these pages sat past the scroll point 97% of readers never reach. */}
        <ArticleEarlyCapture slug="reverse-dieting-explained" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>

            <blockquote className="my-5 rounded-r-[4px] border-l-2 border-cloudText bg-cloudText/[0.06] px-4 py-3 text-[15px] italic text-bone/90">
              &ldquo;{section.quotable}&rdquo;
            </blockquote>

            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}

            {section.citation && (
              <div className="mt-5 rounded-[4px] border border-line2 bg-ink/50 px-4 py-3 text-[13.5px] leading-[1.6] text-mute max-w-[64ch]">
                <p className="font-medium text-bone/90">
                  Evidence note (Study Design:{" "}
                  {section.citation.pmid
                    ? "Peer-Reviewed Systematic / Clinical Evidence"
                    : "Controlled Observational Data"}
                  ):
                </p>
                <p className="mt-1">{section.citation.text}</p>
                {section.citation.pmid && (
                  <p className="mt-1 text-[12.5px] text-cloudText">
                    PubMed Reference: PMID {section.citation.pmid}
                  </p>
                )}
                {section.citation.detail && (
                  <p className="mt-1 text-[12.5px] text-mute2">
                    {section.citation.detail}
                  </p>
                )}
              </div>
            )}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        {/* Proof Module */}
        <section className="rounded-[6px] border border-line2 bg-ink/70 p-6 md:p-8">
          <p className="eyebrow text-cloudText">Interactive Post-Cut Tools</p>
          <h2 className="mt-2 display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Verify your post-cut maintenance baseline
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Avoid guessing your post-cut intake targets. Use our free
            calculators to estimate updated TDEE requirements at your new body
            weight and structure your macronutrient breakdown during the reverse.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/tdee-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator →
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Calculate your updated maintenance energy requirement based on
                your post-cut body weight and activity level.
              </p>
            </Link>
            <Link
              href="/tools/macro-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                Macro calculator →
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Set carbohydrate and fat increases while maintaining your protein
                floor during a reverse diet.
              </p>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Related reading */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related reading and resource paths
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for beginners
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                How beginners build muscle and lose fat at the same time, and how
                to transition from a cut to a recomp.
              </span>
            </Link>
            <Link
              href="/tools/tdee-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Find your updated maintenance calorie target at your current
                post-cut weight.
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
                Balance protein, carbs, and fats as daily calories ramp up.
              </span>
            </Link>
            <Link
              href="/guides/why-am-i-not-losing-weight-in-a-calorie-deficit"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Why am I not losing weight in a calorie deficit?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The tracking, activity, and fluid audit for when fat loss stalls
                mid-cut.
              </span>
            </Link>
            <Link
              href="/blog/cut-vs-recomp-vs-bulk"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                Cut vs recomp vs bulk: which is right for you?
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Decide whether your post-reverse phase should focus on maintenance,
                recomposition, or a lean bulk.
              </span>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* FAQ Section */}
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
            Transition out of your cut with a structured plan
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A{" "}
            <Link
              href="/packages"
              className="underline hover:text-bone"
            >
              coaching package
            </Link>{" "}
            gives you a structured framework for progressive overload and macro tracking.
            For 1:1 online coaching with weekly trend reviews and post-cut intake
            adjustments from Kris Oddo, NASM-CPT, application takes under two minutes.
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

        <GuideRetentionCTA guide="reverse-dieting-explained" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

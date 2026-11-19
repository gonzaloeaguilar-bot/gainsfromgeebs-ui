import type { Metadata } from "next";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import GuideRetentionCTA from "@/components/GuideRetentionCTA";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit";
const DATE_PUBLISHED = "2026-08-10";
// Rebuilt 2026-10-13 (niche #5, geebs-next-niches-2026-10): answer first, one
// PubMed-verified fact per cause, depth in native <details>, and the
// /blog/fat-loss-plateau-men post merged in (it now 301s here).
const DATE_MODIFIED = "2026-10-13";
const DATE_LABEL = "October 13, 2026";

const TITLE = "Calorie Deficit but Not Losing Weight? 6 Real Reasons";
const HEADLINE = "In a calorie deficit but not losing weight? The 6 real reasons";
const DESCRIPTION =
  "Calorie deficit but not losing weight? It is usually under-logged food, water, a deficit that shrank as you got lighter, or a recomp. How to check each.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: HEADLINE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Calorie deficit but not losing weight guide, Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HEADLINE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

type Section = {
  id: string;
  h2: string;
  /** 100-180 words across the visible paragraphs, carrying the one cited fact. */
  paras: string[];
  source: { label: string; pmid: string };
  /** Depth for readers who want it. Native <details>, so it is in the served HTML. */
  more?: { summary: string; paras: string[] };
};

const SECTIONS: Section[] = [
  {
    id: "are-you-in-a-deficit",
    h2: "Are you actually in a calorie deficit?",
    paras: [
      "Often not, and not because anyone is lying. In a classic study, people who said they could not lose weight on 1,200 calories a day were measured properly. Their metabolism was normal, within 5% of what their body size predicted. But they under-reported what they ate by 47% on average and over-reported their exercise by 51% (Lichtman et al., 1992, PMID 1454084).",
      "Small things do it. A tablespoon of cooking oil is about 120 calories, two tablespoons of peanut butter about 190, a handful of almonds while you cook about 160. Together that is a typical 400 to 500 calorie deficit gone, without one obvious slip.",
      "The check: for five days, weigh everything you eat on a food scale in grams, including oil, sauces, drinks and bites. If the scale starts moving, the deficit was never real.",
    ],
    source: { label: "Lichtman et al., 1992, N Engl J Med", pmid: "1454084" },
    more: {
      summary: "Why tracking drifts after the first few weeks",
      paras: [
        "In week one of a diet most people weigh peanut butter and measure oil. By week five, portions are judged by eye, coffee creamer goes unlogged, dressing is poured from the bottle, and weekend bites off a partner's plate are forgotten. That is estimation fatigue, not a lack of discipline.",
        "Restaurant meals and weekends are where most of the gap hides. If your weekday logging is tight but Saturday and Sunday are guesses, your weekly average deficit can be half of what your app shows.",
      ],
    },
  },
  {
    id: "water-and-glycogen",
    h2: "Can water and glycogen hide fat loss on the scale?",
    paras: [
      "Yes, for one to three weeks at a time. Your muscles store carbohydrate as glycogen, and each gram of glycogen is stored with at least 3 grams of water (Fernández-Elías et al., 2015, PMID 25911631). Start a new training plan, eat a bigger carb day, or have a salty restaurant dinner, and a couple of pounds of water can sit on top of real fat loss.",
      "New or harder training adds to it. Sore, recovering muscle holds extra fluid while it repairs, which is why people often see the scale stall or rise in the first weeks of lifting while their waist is already coming down.",
      "The check: weigh in most mornings after the bathroom and compare weekly averages, not single days. Add a waist measurement at the navel once a week. If the waist is falling while the weight is flat, fat loss is happening underneath the water.",
    ],
    source: { label: "Fernández-Elías et al., 2015, Eur J Appl Physiol", pmid: "25911631" },
  },
  {
    id: "deficit-shrinks",
    h2: "Does your deficit shrink as you lose weight?",
    paras: [
      "Yes. A lighter body costs less to run. In the Mifflin-St Jeor equation, the formula most calculators use, resting burn drops by 10 calories for every kilogram you lose (Mifflin et al., 1990, PMID 2305711), and the cost of moving a lighter body drops too.",
      "Here is how that stalls people. Twenty pounds is about 9 kg, so a man going from 210 to 190 pounds loses roughly 90 calories of resting burn, and around 150 to 250 a day once the cheaper cost of moving a lighter body is added. If he still eats the 2,000 calories that gave him a 500 deficit at the start, it is now closer to 250 to 350, and weight loss slows to a crawl.",
      "Eating less than you used to is also not the same as a deficit. Dropping from 3,100 to 2,400 calories is 700 fewer, but if maintenance is 2,200 you are still above it. The check: recalculate your maintenance at your current weight, not your starting weight.",
    ],
    source: { label: "Mifflin et al., 1990, Am J Clin Nutr", pmid: "2305711" },
  },
  {
    id: "neat-drop",
    h2: "Why does your daily movement drop when you diet?",
    paras: [
      "Because the body defends its fat stores, and the easiest place to save energy is the movement you do not think about: walking, fidgeting, standing, taking the stairs. Rosenbaum and colleagues measured people who had lost at least 10% of their weight and found that total daily burn, and especially the energy spent on movement, stayed lower than expected, even more than a year later (2008, PMID 18842775).",
      "You do not notice it happening. You sit down sooner, pace less on calls, and drive instead of walk. Over a day that can take a real bite out of the deficit you set in the kitchen.",
      "The check: look at your step count. If it has slid from 9,000 to 5,000 since you started dieting, that is your stall. Set a floor, for example 8,000 steps a day, and hold it before you cut food again.",
    ],
    source: { label: "Rosenbaum et al., 2008, Am J Clin Nutr", pmid: "18842775" },
    more: {
      summary: "How big daily movement can be",
      paras: [
        "In an overfeeding study, 16 people ate 1,000 extra calories a day for eight weeks. About two-thirds of the rise in their daily burn came from this everyday, non-exercise movement, and differences in it explained a tenfold difference in how much fat they gained (Levine et al., 1999, PMID 9880251). That study ran in the other direction, but it shows how much this part of your day can swing.",
        "This drop is modest and reversible. It does not break your metabolism and it does not stop fat loss. It narrows the deficit, which is why protecting steps works better than eating less and less.",
      ],
    },
  },
  {
    id: "recomp",
    h2: "Could you be recomposing instead of stalling?",
    paras: [
      "If you lift, yes, especially as a beginner or after a break. Losing fat while gaining muscle can leave the scale flat while your body changes. In a 10-week trial, a group eating at maintenance with high protein and four lifting days a week lost 1.41 kg of fat and gained 0.97 kg of fat-free mass, so their weight barely moved (Vargas-Molina et al., 2026, PMID 41940947).",
      "That is not a plateau, it is the result you want, and quitting or slashing calories at this point is the most common way people throw it away.",
      "The check: are your lifts going up and your waist coming down while the scale holds? Then keep going. The body recomposition calculator shows whether recomp is likely for your starting point, and the women's recomp guide covers what the same-weight scale looks like in practice.",
    ],
    source: { label: "Vargas-Molina et al., 2026, Eur J Appl Physiol", pmid: "41940947" },
  },
  {
    id: "cut-further",
    h2: "Should you cut calories further when the scale stalls?",
    paras: [
      "Only after the checks above, and then by a little. If your logging is verified, your steps are steady and your weekly average and waist have been flat for three weeks, drop 100 to 150 calories a day and keep everything else the same for two more weeks.",
      "Keep protein high when you do. In a trial of 40 young men eating about 40% below their needs for four weeks while lifting and doing intervals, the group on 2.4 g of protein per kg lost 4.8 kg of fat and gained 1.2 kg of lean mass. The group on half that protein lost 3.5 kg of fat and gained almost no lean mass (Longland et al., 2016, PMID 26817506).",
      "What not to do: slash 500 calories and add an hour of cardio at once. That deepens hunger and fatigue, cuts your daily movement further, and usually ends in a binge.",
    ],
    source: { label: "Longland et al., 2016, Am J Clin Nutr", pmid: "26817506" },
    more: {
      summary: "How to tell a real plateau from noise",
      paras: [
        "Weight loss is a staircase, not a slope. Sodium, late meals, poor sleep, stress and digestion can swing morning weight by a few pounds overnight. A flat scale for less than two weeks is usually normal variation.",
        "Call it a real plateau when all three hold for 21 days: your weekly average weight is flat, your waist at the navel has not changed, and your food has been weighed, not estimated. Then make one change, wait two weeks, and read the trend again.",
      ],
    },
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Why am I in a calorie deficit but not losing weight?",
    a: "The usual reasons are food that is not being logged, water held by muscles after training or a high-carb or salty day, a deficit that has shrunk because you are lighter now, a drop in everyday movement, or a recomp where fat loss and muscle gain cancel out on the scale. Check them in that order before you cut calories again.",
  },
  {
    q: "How long can you be in a calorie deficit and not lose weight?",
    a: "Water can hide fat loss for one to three weeks. If your weekly average weight and your waist have both been flat for three full weeks while your food is weighed rather than estimated, the deficit is gone and it is time for a small adjustment of 100 to 150 calories a day.",
  },
  {
    q: "Can working out make the scale go up even in a deficit?",
    a: "Yes, for a while. New or harder training makes muscles hold extra water while they recover, and they store more glycogen, which brings water with it. A rise of a few pounds in the first weeks of lifting is common even while body fat is falling.",
  },
  {
    q: "Is my metabolism broken?",
    a: "Almost never. When people who said they could not lose weight were measured properly, their metabolism was within 5% of the predicted value; the gap was in how much they thought they ate and moved. Your daily burn does drop as you get lighter and move less, but that is modest and reversible.",
  },
  {
    q: "Should I eat more if I am not losing weight in a deficit?",
    a: "Not as a first move. Eating more only helps if a very aggressive deficit is making you move less, sleep worse and skip training. For most people the fix is verifying intake and protecting steps. After a long cut, a planned week or two at maintenance can be a reasonable reset.",
  },
  {
    q: "Do women stop losing weight in a deficit around their period?",
    a: "Many women see their weight rise for a few days around a period, mostly from water. Compare the same point in each cycle, or use weekly averages, and the trend is easier to read.",
  },
  {
    q: "When is a stall a reason to get a coach?",
    a: "When you have weighed your food for two weeks or more, kept your steps and training steady, and your three-week average and waist are still flat with no clear cause. A coach reviews your logs, steps and training together and changes one thing at a time instead of cutting harder.",
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
  title: HEADLINE,
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
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
    { "@type": "Thing", name: "Calorie deficit" },
    { "@type": "Thing", name: "Fat loss plateau" },
    { "@type": "Thing", name: "Weight loss stall" },
    { "@type": "Thing", name: "Adaptive thermogenesis" },
  ],
  citation: SECTIONS.map((s) => `https://pubmed.ncbi.nlm.nih.gov/${s.source.pmid}/`),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fat Loss Plateau Audit and Online Coaching",
  serviceType: "Fat loss plateau audit and online coaching",
  description:
    "1:1 online fitness and nutrition coaching to diagnose weight loss plateaus, audit tracking accuracy, and adjust calorie/macro targets.",
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

const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=guide&utm_campaign=deficit_not_losing&utm_content=deficit_guide_cta";

const RELATED: { href: string; title: string; blurb: string }[] = [
  {
    href: "/tools/calorie-deficit-calculator",
    title: "Calorie deficit calculator",
    blurb: "Reset your daily target at your current weight, not your starting weight.",
  },
  {
    href: "/tools/macro-calculator",
    title: "Macro calculator",
    blurb: "Turn the calorie target into protein, carbs and fat you can actually log.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    title: "Body recomposition calculator",
    blurb: "Check whether a flat scale is likely to be a recomp for your starting point.",
  },
  {
    href: "/blog/calorie-deficit-without-counting-everything",
    title: "How to stay in a calorie deficit without counting everything",
    blurb: "Simple structure for people who will not weigh food forever.",
  },
  {
    href: "/blog/how-much-protein-to-lose-fat",
    title: "How much protein to lose fat",
    blurb: "The daily protein that protects muscle and keeps hunger manageable in a deficit.",
  },
  {
    href: "/blog/body-recomposition-for-women",
    title: "Body recomposition for women",
    blurb: "What the same-weight scale looks like when fat comes off and muscle goes on.",
  },
  {
    href: "/guides/strength-training-plateau",
    title: "Strength training plateau",
    blurb: "When the lifts stall too, the training side of the audit.",
  },
  {
    href: "/guides/reverse-dieting-explained",
    title: "Reverse dieting explained",
    blurb: "How to bring calories back up after a long cut without rapid regain.",
  },
];

export default function CalorieDeficitPlateauGuidePage() {
  return (
    <>
      <JsonLd id="deficit-plateau-faq-schema" data={faqSchema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="deficit-plateau-article-schema" data={articleSchema} />
      <JsonLd id="deficit-plateau-service-schema" data={serviceSchema} />
      <ArticleShell exit className={"mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"}>
        <header>
          <p className="eyebrow text-cloudText">Guide</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            {HEADLINE}
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            If you are in a calorie deficit but not losing weight, one of three
            things is almost always true. The deficit is not real, because food
            goes under-logged. The deficit was real but shrank, because you are
            lighter and moving less. Or the scale is hiding fat loss behind water
            or new muscle. Check them in that order before you eat less.
          </p>
          <p className="mt-4 text-[13px] text-mute2">
            Updated <time dateTime={DATE_MODIFIED}>{DATE_LABEL}</time> · Written by Kris Oddo, NASM-CPT
          </p>
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
            What to do when the scale will not move in a deficit
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15.5px] md:text-[16.5px] leading-[1.65] text-bone/90 max-w-[64ch]">
            <li>Weigh every food for five days, including oil, sauces and drinks.</li>
            <li>Read weekly average weight and your waist, not single mornings.</li>
            <li>Recalculate maintenance at your current weight.</li>
            <li>Hold a daily step floor, for example 8,000.</li>
            <li>If you lift, check whether your lifts are rising while your waist falls.</li>
            <li>Only after three flat weeks, cut 100 to 150 calories and keep protein high.</li>
          </ol>
          <nav aria-label="Reasons in this guide" className="mt-5 text-[14px] leading-[1.6] text-mute">
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="underline decoration-line2 underline-offset-4 hover:text-bone">
                    {s.h2}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* Early, in-read. The component exists because the only capture on
            these pages sat past the scroll point 97% of readers never reach. */}
        <ArticleEarlyCapture slug="why-am-i-not-losing-weight-in-a-calorie-deficit" sourcePrefix="guide-early" />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.id} id={section.id} className="prose-section scroll-mt-24" aria-labelledby={`${section.id}-h`}>
            {si > 0 && <div className="hair my-10" />}
            <h2 id={`${section.id}-h`} className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
              >
                {p}
              </p>
            ))}
            <p className="mt-3 text-[12.5px] text-cloudText">
              Source:{" "}
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${section.source.pmid}/`}
                className="underline decoration-line2 underline-offset-4"
                rel="noopener"
              >
                {section.source.label}, PMID {section.source.pmid}
              </a>
            </p>
            {section.more ? (
              <details className="mt-5 rounded-[4px] border border-line2 bg-ink/50 px-4 py-3">
                <summary className="cursor-pointer text-[15px] font-semibold text-bone">
                  {section.more.summary}
                </summary>
                {section.more.paras.map((p, pi) => (
                  <p key={pi} className="mt-3 text-[14.5px] leading-[1.65] text-mute max-w-[64ch]">
                    {p}
                  </p>
                ))}
              </details>
            ) : null}
            {section.id === "recomp" ? (
              <p className="mt-4 text-[14.5px] leading-[1.65] text-mute max-w-[64ch]">
                Run the{" "}
                <Link href="/tools/body-recomposition-calculator" className="underline decoration-line2 underline-offset-4 hover:text-bone">
                  body recomposition calculator
                </Link>{" "}
                or read{" "}
                <Link href="/blog/body-recomposition-for-women" className="underline decoration-line2 underline-offset-4 hover:text-bone">
                  body recomposition for women
                </Link>
                .
              </p>
            ) : null}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="deficit-honest-limits">
          <h2 id="deficit-honest-limits" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Honest limits
          </h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] md:text-[16px] leading-[1.65] text-bone/85 max-w-[64ch]">
            <li>The under-reporting study measured 10 people who described themselves as diet-resistant, so the 47% figure is an upper example, not an average for everyone who tracks.</li>
            <li>The protein trial ran four weeks in young men on a hard deficit with six training days a week. The direction holds more widely; the exact numbers may not.</li>
            <li>The drop in daily burn after weight loss was measured in a small in-patient study. It is real but varies a lot from person to person.</li>
            <li>Medical conditions and some medicines affect weight. If you have weighed your food, held your steps and still see no change for months, talk to your doctor.</li>
          </ul>
        </section>

        <div className="hair my-10 md:my-14" />

        <section className="rounded-[6px] border border-line2 bg-ink/70 p-6 md:p-8" aria-labelledby="deficit-tools">
          <p className="eyebrow text-cloudText">Check your numbers</p>
          <h2 id="deficit-tools" className="mt-2 display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Reset the target before you cut further
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Your maintenance calories at today&apos;s weight are lower than at
            the start. Recalculate before you decide anything.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/calorie-deficit-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                Calorie deficit calculator <span aria-hidden="true">→</span>
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                A daily target from your current weight, activity and goal rate.
              </p>
            </Link>
            <Link
              href="/tools/tdee-calculator"
              className="group rounded-[4px] border border-line2 bg-ink2 p-5 no-underline hover:border-cloudText transition-colors"
            >
              <h3 className="text-[17px] font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator <span aria-hidden="true">→</span>
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Your maintenance calories at your current body weight.
              </p>
            </Link>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="deficit-related">
          <h2 id="deficit-related" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Related tools and guides
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="group grid min-h-20 gap-1 py-4 no-underline">
                <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">{r.title}</span>
                <span className="text-[13.5px] leading-[1.55] text-mute">{r.blurb}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqs} id="deficit-faq-heading" />

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="deficit-coaching">
          <h2 id="deficit-coaching" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            When a stall is a coaching problem, not a willpower problem
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            If you have run every check here and the trend is still flat, the
            next step is someone reading your logs, steps and training together.
            Kris Oddo, NASM-CPT, reviews that data weekly with 1:1 clients and
            changes one thing at a time instead of cutting harder. The
            application takes a few minutes and Kris reviews every one.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="guide_primary">
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/packages" className="btn btn-secondary">
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <GuideRetentionCTA guide="why-am-i-not-losing-weight-in-a-calorie-deficit" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated {DATE_LABEL}.</p>
        </footer>
      </ArticleShell>
    </>
  );
}

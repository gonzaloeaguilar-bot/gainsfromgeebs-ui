import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import KrisNote from "@/components/KrisNote";
import Link from "next/link";
import RecompForm from "./RecompForm";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/body-recomposition-calculator";
const DATE_MODIFIED = "2026-10-13";
const DATE_LABEL = "October 13, 2026";
const APPLY_HREF =
  "/apply?utm_source=site&utm_medium=money_page&utm_campaign=money_page_apply&utm_content=body_recomposition_calculator_bottom_cta";

export const metadata: Metadata = {
  title: "Body Recomp Calculator: Free Calories & Protein Targets",
  description:
    "Free body recomposition calculator: get your recomp calorie target, protein goal (0.8–1 g/lb), and whether recomp fits your starting point. No signup.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Body Recomp Calculator: Free Calories & Protein Targets",
    description:
      "Free body recomposition calculator: get your recomp calorie target, protein goal (0.8–1 g/lb), and whether recomp fits your starting point. No signup.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Free body recomposition calculator by Geebs Coaching — no signup required",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Recomp Calculator: Free Calories & Protein Targets",
    description:
      "Free body recomposition calculator: get your recomp calorie target, protein goal (0.8–1 g/lb), and whether recomp fits your starting point. No signup.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const softwareSchema = {
  "@context": "https://schema.org",
  // WebPage, not SoftwareApplication: Google requires a rating or review on
  // SoftwareApplication and we publish no ratings for our free tools.
  "@type": "WebPage",
  name: "Body Recomposition Calculator",
  url: `${SITE_URL}${SLUG}`,
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  description:
    "Free calculator that gives a recomposition viability read, daily calorie target (TDEE via Mifflin-St Jeor × activity with a 10–15% deficit), protein goal (0.8–1 g/lb), and a realistic 12-week expectation based on training experience and body fat percentage.",
  dateModified: DATE_MODIFIED,
};

const answerSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${SLUG}#recomp-calculator-answer`,
  url: `${SITE_URL}${SLUG}`,
  name: "Body Recomposition Calculator Answer",
  mainEntity: {
    "@type": "Question",
    name: "What does a body recomposition calculator do?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "A body recomposition calculator estimates maintenance calories with Mifflin-St Jeor, applies a conservative 10-15% deficit, sets protein around 0.8-1.0 grams per pound of bodyweight, and checks training experience plus body fat to tell you whether recomp, a cut, or a lean bulk is the better starting phase.",
    },
  },
  reviewedBy: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    url: `${SITE_URL}/about`,
  },
  dateModified: DATE_MODIFIED,
};

const calculatorFormulaSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}${SLUG}#calculator-formula`,
  name: "How the body recomposition calculator sets your targets",
  description:
    "The calculator estimates BMR with Mifflin-St Jeor, converts BMR to TDEE with a training-day activity multiplier, starts recomp calories at 88% of TDEE, sets protein at 0.8-1.0 g/lb, and uses training age plus body fat to choose recomp, cut, or lean bulk.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Body recomposition calculator",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Estimate maintenance",
      text: "Use Mifflin-St Jeor to estimate BMR, then multiply by the activity factor that matches weekly lifting days.",
    },
    {
      "@type": "HowToStep",
      name: "Set recomp calories",
      text: "Start calories at about 88% of estimated TDEE, which is a conservative 12% deficit.",
    },
    {
      "@type": "HowToStep",
      name: "Set protein",
      text: "Use 0.9 grams per pound for most recomp candidates and 0.8 grams per pound when recomp is unlikely.",
    },
    {
      "@type": "HowToStep",
      name: "Choose the phase",
      text: "Use training experience and body fat percentage to decide whether recomp, a focused cut, or a lean bulk is the better starting phase.",
    },
  ],
  // reviewedBy is a WebPage property; on a HowTo it is an invalid field.
  author: { "@id": `${SITE_URL}/#kris-oddo` },
  dateModified: DATE_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does height affect body recomposition calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Height is used directly in the Mifflin-St Jeor BMR formula: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5 for males. A taller man at the same bodyweight and age will have a higher BMR and therefore a higher TDEE and recomp calorie target. A 6'0\" (183 cm) man burns roughly 80–100 more calories per day at rest than a 5'7\" (170 cm) man of equal weight and age. That difference flows directly into your recomp calorie target — enter your actual measured height for the most accurate result.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a body recomposition calculator for women?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose Female in the calculator, or open it from the women's link, and it uses the female Mifflin-St Jeor formula (minus 161 instead of plus 5) and female body-fat ranges to judge whether recomp suits you. A woman new to lifting at 22% body fat or more, or returning to lifting at 20% or more, gets a strong-candidate verdict. You get a daily calorie target, a protein target of 0.8 to 0.9 g per pound, and a 12-week expectation.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build muscle and lose fat at the same time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this is called body recomposition. It works most reliably for newer lifters (under 12 months of consistent training), people returning after a break, and those with sufficient body fat to fuel new muscle growth even in a slight calorie deficit. Advanced, already-lean athletes have a much narrower recomp window and typically get better results from dedicated cut or bulk phases.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories should I eat for body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 10–15% deficit below your TDEE (Total Daily Energy Expenditure) is the standard recomposition target. This is enough of a deficit to draw on stored fat while keeping training fueled and muscle-building possible. The calculator uses the Mifflin-St Jeor equation to estimate TDEE, then applies a ~12% deficit as the starting recomp calorie target. Adjust based on 3–4 weeks of real trend data.",
      },
    },
    {
      "@type": "Question",
      name: "How much protein do I need for body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "0.8 to 1.0 grams per pound of bodyweight per day. The International Society of Sports Nutrition Position Stand (Jäger et al., 2017) supports 1.4–2.0 g/kg (roughly 0.6–0.9 g/lb) for general resistance training, with the upper end appropriate during a fat-loss phase. This calculator uses 0.9 g/lb for recomp candidates as a practical middle target. Hit protein before adjusting anything else.",
      },
    },
    {
      "@type": "Question",
      name: "How long does body recomposition take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strength and performance changes appear within 4–6 weeks. Visible body composition changes typically become noticeable around 8–12 weeks for beginners. The scale often stays flat or moves slowly — this is correct. Recomposition is measured by the mirror, measurements, and strength logs, not primarily by weight. Realistic timelines are 3–6 months for meaningful change in beginners; slower for trained athletes.",
      },
    },
    {
      "@type": "Question",
      name: "Who should not do body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Very lean individuals (under 10% body fat for men, under 18% for women) generally do not have enough fat reserves to fuel muscle-building in a deficit — a lean bulk is more appropriate. Highly trained athletes (2+ years of consistent lifting) also see slower recomp returns and often produce better results from phased cutting and bulking cycles. This calculator flags these cases with an honest recommendation.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if my weight does not change during body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A flat bathroom scale is standard during successful body recomposition. If your bodyweight remains unchanged over 4–6 weeks while your waist circumference at the navel drops and your strength logs on compound lifts increase, you are gaining muscle while losing fat at similar rates. Keep following your daily calorie and protein targets for at least 8–12 weeks before evaluating whether to adjust calories or switch phases.",
      },
    },
    {
      "@type": "Question",
      name: "Should I do cardio while doing body recomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep progressive resistance training 3–4 days per week as your foundation. Cardio should be kept moderate and low-impact, such as daily walking, so it does not interfere with lifting recovery or cause unnecessary muscle breakdown. Your calorie target already creates the deficit needed for fat loss, so excessive cardio is unnecessary and often counterproductive.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the calculator recommend a 10–15% deficit instead of a larger cut?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A conservative 10–15% deficit provides enough energy restriction to draw on stored body fat while preserving the training performance and protein synthesis required to build or maintain muscle. Deficits greater than 20% degrade training quality and recovery, which shifts weight loss away from fat and toward muscle tissue.",
      },
    },
    {
      "@type": "Question",
      name: "How should I allocate carbs and fats after hitting my protein target?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once you secure your daily protein target (0.8–1.0 g/lb), set dietary fat at a baseline of 0.3–0.4 g/lb (around 20–25% of total calories) to support hormonal health and joint recovery. Allocate the remaining daily calories to carbohydrates to fuel lifting intensity and support glycogen stores during resistance training.",
      },
    },
    {
      "@type": "Question",
      name: "When should I adjust my body recomposition calorie target?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep your starting calorie numbers unchanged for the first 4–6 weeks to collect clean baseline data. If you are dropping more than 1–1.5 lbs per week, increase daily intake by 100–150 calories from carbohydrates to prevent muscle loss. If your waist measurement, scale weight, and gym strength are all completely unchanged after 6 weeks, reduce daily intake by 100–150 calories or add 1,500 daily steps.",
      },
    },
    {
      "@type": "Question",
      name: "Can I do body recomposition with dumbbells or home workouts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Muscle tissue responds to progressive mechanical tension, not specific gym machinery. As long as your home or dumbbell sessions apply progressive overload—by adding repetitions, using heavier dumbbells, or increasing time under tension near muscular fatigue across compound movements—the stimulus for recomposition remains fully effective.",
      },
    },
  ],
};

// Breadcrumb coverage in /tools was 2 of 13 (measured 2026-09-23). The hub at
// /tools exists, so the hierarchy is real and simply was not expressed.
const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: "/tools/body-recomposition-calculator",
  title: "Body recomp calculator",
});

export default function RecompCalculatorPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="recomp-calc-software-schema" data={softwareSchema} />
      <JsonLd id="recomp-calc-answer-schema" data={answerSchema} />
      <JsonLd id="recomp-calc-formula-schema" data={calculatorFormulaSchema} />
      <JsonLd id="recomp-calc-faq-schema" data={faqSchema} />
      <JsonLd id="body-recomposition-calculator-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[720px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <ScholarshipCallout sourcePath="/tools/body-recomposition-calculator" />
        <header>
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Body recomp calculator
          </h1>
          <p className="mt-5 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[60ch]">
            This body recomposition calculator tells you whether building
            muscle and losing fat at the same time is realistic for your
            starting point. Enter your stats to get a recomp viability read,
            daily calorie goal, protein target, and a realistic 12-week
            expectation. Free, no signup, no email gate.
          </p>
          <p className="mt-3 text-[13px] text-mute2">
            Updated <time dateTime={DATE_MODIFIED}>{DATE_LABEL}</time> · Written by Kris Oddo, NASM-CPT
          </p>
        </header>

        <section
          className="mt-8 rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5 md:px-6"
          aria-labelledby="recomp-answer"
        >
          <p className="eyebrow text-cloudText">What the calculator provides</p>
          <h2
            id="recomp-answer"
            className="mt-3 display text-bone text-[22px] md:text-[27px] leading-[1.12]"
          >
            Calories, protein, and whether recomp is the right phase
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-bone/85 max-w-[62ch]">
            The calculator estimates your maintenance calories with Mifflin-St
            Jeor, sets a conservative recomp calorie target, gives a daily
            protein goal, then tells you whether you are a strong, possible, or
            unlikely body-recomposition candidate based on body fat, training
            age, and planned training days.
          </p>
          <div className="mt-5 grid gap-3 text-[14px] leading-[1.55] text-mute sm:grid-cols-3">
            <p>
              <strong className="block text-bone">Best fit</strong>
              Beginners, returners, and higher-body-fat lifters.
            </p>
            <p>
              <strong className="block text-bone">Usually not ideal</strong>
              Very lean or already-trained lifters chasing faster muscle gain.
            </p>
            <p>
              <strong className="block text-bone">Next step</strong>
              Use the result to choose recomp, cut, lean bulk, or coaching.
            </p>
          </div>
        </section>

        <div className="mt-10 md:mt-14">
          <RecompForm />
        </div>

        <KrisNote>
          The calculator tells you where to start. The hard part is week three
          when the scale has not moved and you do not know if that means it is
          working or not. It is usually working.
        </KrisNote>

        <section
          className="mt-8 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] px-5 py-5 md:px-6"
          aria-labelledby="recomp-result-plan"
        >
          <p className="eyebrow text-cloudText">After the calculator</p>
          <h2 id="recomp-result-plan" className="mt-3 display text-bone text-[22px] md:text-[27px] leading-[1.12]">
            Turn your result into a two-week starting plan
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Keep the calorie and protein target unchanged for two weeks, lift three times, and record a daily weigh-in plus one waist measurement each week. Then use the trend — not one day of scale noise — to decide whether anything needs adjusting.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/tools/macro-calculator" className="btn btn-secondary">
              Split calories into macros <span aria-hidden="true">→</span>
            </Link>
            <Link href="/guides/body-recomposition-for-beginners" className="btn btn-secondary">
              Get the 3-day beginner plan <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="hair my-12 md:my-14" />

        <section id="women" aria-labelledby="recomp-women" className="scroll-mt-24">
          <p className="eyebrow text-cloudText">Body recomposition calculator for women</p>
          <h2
            id="recomp-women"
            className="mt-3 display text-bone text-[22px] md:text-[27px] leading-[1.12]"
          >
            How does the calculator work for women?
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-bone/85 max-w-[62ch]">
            Choose Female and the calculator changes two things. It estimates
            your maintenance calories with the female version of Mifflin-St
            Jeor, which subtracts 161 calories where the male version adds 5,
            and it judges your recomp chances on female body-fat ranges. A
            woman new to lifting at 22% body fat or more, or returning after a
            break at 20% or more, gets a strong-candidate verdict.
          </p>
          <p className="mt-4 text-[15px] md:text-[16px] leading-[1.7] text-bone/85 max-w-[62ch]">
            The training side does not change. Roberts and colleagues pooled
            studies that put men and women on the same lifting program and
            found no reliable difference in muscle growth, with women gaining
            more relative upper-body strength (2020, PMID 32218059). Same
            lifts, same progressive overload, same protein per pound.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/tools/body-recomposition-calculator?sex=female" className="btn btn-secondary" data-cta="recomp_calc_female_preset">
              Use the female setting <span aria-hidden="true">→</span>
            </a>
            <Link href="/blog/body-recomposition-for-women" className="btn btn-secondary">
              Read the women&apos;s recomp guide <span aria-hidden="true">→</span>
            </Link>
          </div>
          <details className="mt-5 rounded-[6px] border border-line2 bg-ink3/35 px-5 py-4">
            <summary className="cursor-pointer text-bone font-semibold text-[15px]">
              Why the scale may not move for women on a recomp
            </summary>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-bone/85">
              In a 10-week trial, the group eating at maintenance with high
              protein lost 1.41 kg of fat and gained 0.97 kg of fat-free mass,
              so body weight barely changed while body composition did
              (Vargas-Molina et al., 2026, PMID 41940947). Many women also see
              water swings around their period. Track a weekly average weight,
              your waist and your lifts for four weeks before you change the
              calorie target, and see{" "}
              <Link href="/for/online-fitness-coach-for-women" className="underline decoration-line2 underline-offset-4">
                online fitness coaching for women
              </Link>{" "}
              if you want Kris to adjust it with you.
            </p>
          </details>
        </section>
        <div className="hair my-12 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="recomp-calculator-answer"
        >
          <p className="eyebrow text-cloudText">Direct answer</p>
          <h2
            id="recomp-calculator-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            What does a body recomp calculator tell you?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            A useful body recomposition calculator gives you four answers:
            estimated maintenance calories, a modest recomp calorie target,
            a daily protein target, and whether your starting point makes recomp
            realistic. This calculator uses Mifflin-St Jeor for maintenance,
            applies a 12% deficit, sets protein at 0.8–1.0 grams per pound of
            bodyweight, then reads body fat, training history, and weekly
            lifting days before recommending recomp, a focused cut, or a lean
            bulk.
          </p>
          <div className="mt-5 divide-y divide-line2 border-y border-line2 text-[14.5px] leading-[1.6] text-bone/85">
            <p className="py-3">
              <strong className="text-bone">Formula:</strong> BMR from
              Mifflin-St Jeor × activity multiplier = estimated TDEE; recomp
              calories start at about 88% of TDEE.
            </p>
            <p className="py-3">
              <strong className="text-bone">Protein:</strong> most recomp
              candidates start around 0.9 g/lb; already-lean or unlikely recomp
              cases start closer to 0.8 g/lb.
            </p>
            <p className="py-3">
              <strong className="text-bone">Decision rule:</strong> beginners,
              returners, and lifters with enough body fat are better recomp
              candidates; very lean or advanced lifters usually need a clearer
              cut or lean-bulk phase.
            </p>
          </div>
        </section>

        <div className="hair my-12 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="calculator-formula"
        >
          <p className="eyebrow text-cloudText">Calculator formula</p>
          <h2
            id="calculator-formula"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            How does the calculator set your calories and protein?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            The body recomp calculator follows one sequence: estimate BMR with
            Mifflin-St Jeor, multiply by training-day activity, set recomp
            calories at 88% of that maintenance estimate, set protein from
            bodyweight, then use body fat and lifting history to decide whether
            recomp is the right phase.
          </p>
          <div className="mt-5 grid gap-3 text-[14.5px] leading-[1.6] text-bone/85 sm:grid-cols-2">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <strong className="block text-bone">Maintenance calories</strong>
              BMR = 10 × weight kg + 6.25 × height cm − 5 × age, then +5 for
              men or −161 for women. TDEE = BMR × activity multiplier.
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <strong className="block text-bone">Recomp calories</strong>
              Starting target = TDEE × 0.88. That puts the plan inside the
              conservative 10–15% deficit range.
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <strong className="block text-bone">Protein target</strong>
              Most recomp candidates get 0.9 g/lb of bodyweight. If the verdict
              says recomp is unlikely, the calculator uses 0.8 g/lb.
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <strong className="block text-bone">Phase choice</strong>
              New and returning lifters with enough body fat usually get recomp.
              Lean or highly trained lifters usually get cut or lean-bulk
              guidance instead.
            </div>
          </div>
          <p className="mt-5 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            Example: a 190 lb, 5&rsquo;10&rdquo;, 30-year-old man lifting 3 days
            per week with 20% body fat lands near 2,834 maintenance calories,
            2,493 recomp calories, and 171 g protein. The calculator marks
            that profile as a strong recomp candidate because he is new to
            structured lifting and has enough stored body fat to support a
            modest deficit.
          </p>
        </section>

        <div className="hair my-12 md:my-14" />

        <section
          className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
          aria-labelledby="quick-answer"
        >
          <p className="eyebrow text-cloudText">Quick answer</p>
          <h2
            id="quick-answer"
            className="mt-3 display text-bone text-[23px] md:text-[29px] leading-[1.12]"
          >
            Does height change your recomp calories?
          </h2>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/90 max-w-[64ch]">
            Height is a direct input to the Mifflin-St Jeor equation that
            powers this calculator. For males, BMR = 10 × weight (kg) +
            6.25 × height (cm) − 5 × age + 5. A 6&rsquo;0&rdquo; (183 cm)
            man has a materially higher maintenance calorie number than a
            5&rsquo;7&rdquo; (170 cm) man at the same weight and age — that
            difference flows through directly to your recomp calorie target and
            protein goal. Enter your actual height, not a rough estimate, so
            the starting numbers are accurate before week one. This is how
            Kris Oddo, NASM-CPT, approaches client intake at Geebs Coaching
            &mdash; real inputs produce real targets, not generic app defaults.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Where do the calculator’s numbers come from?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            TDEE is calculated via the Mifflin-St Jeor equation — the most
            validated BMR formula for the general population (Mifflin et al.,
            1990). BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age +
            5 (male) or − 161 (female). TDEE multiplies BMR by an activity
            factor derived from your weekly training days (1.375 for 1–2 days,
            1.55 for 3–4, 1.725 for 5, 1.9 for 6).
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            The recomp calorie target applies a 12% deficit to TDEE — within
            the 10–15% range that research identifies as the sweet spot for
            simultaneous fat loss and muscle-building. Below 10% and the body
            prioritizes muscle before fat. Above 20% and training quality
            degrades. Protein is set at 0.9 g/lb (0.8 g/lb if recomp is
            unlikely) per ISSN guidance (Jäger et al., 2017).
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            The viability judgment uses training experience and body fat
            estimate as primary signals. Beginners and returning lifters have a
            genuine physiological advantage — untrained or re-trained muscle
            grows faster in response to novel stimulus, even in a deficit.
            Trained, already-lean individuals face diminishing returns from
            simultaneous recomp.
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            How accurate is a body recomp calculator?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            These numbers are starting estimates, accurate to roughly ±10%.
            TDEE calculators estimate — they do not measure. Individual
            variation in metabolism, training intensity, sleep, and stress all
            affect real calorie needs. Run the targets for 3–4 weeks, then
            adjust based on what your mirror, measurements, and strength logs
            actually show.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            No promised numbers for lb of fat lost or muscle gained — those
            depend on execution, sleep, consistency, and starting point. What
            is reliable: beginners following high-protein near-maintenance
            training consistently for 12 weeks will see real changes in body
            composition and strength.
          </p>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="use-your-result">
          <p className="eyebrow text-cloudText">Put the numbers to work</p>
          <h2
            id="use-your-result"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            What should you do with your result in the first three weeks?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Pick the calorie and protein targets the calculator gives you, then
            make the first three weeks boring. Keep meals, training days, and
            weigh-in conditions consistent enough that you can tell what the
            plan is doing. Changing calories every time the scale bumps up or
            down turns a useful starting point into guesswork.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <p className="eyebrow text-cloudText">1. Set the floor</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Hit the protein target daily and log your morning bodyweight
                under the same conditions when you can.
              </p>
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <p className="eyebrow text-cloudText">2. Train to progress</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Use a repeatable lifting plan and write down your sets, reps,
                and loads so strength has a chance to tell its side of the
                story.
              </p>
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-4 py-4">
              <p className="eyebrow text-cloudText">3. Review the trend</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                After three weeks, compare your weight trend, waist
                measurement, photos, and gym log before making one small
                adjustment.
              </p>
            </div>
          </div>
          <p className="mt-5 text-[15px] text-mute max-w-[60ch] leading-[1.65]">
            A flat scale does not settle the question by itself. If your waist
            is coming down while your lifts are stable or improving, stay with
            the plan long enough to collect another week of data. If every
            signal has stalled, adjust one variable at a time so you know what
            helped.
          </p>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="interpret-verdict">
          <p className="eyebrow text-cloudText">Next steps by result</p>
          <h2
            id="interpret-verdict"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            What does your recomp verdict mean?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Your viability classification indicates whether your body can build
            muscle while losing fat efficiently, or whether a dedicated cut or
            lean bulk will produce faster results.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Strong candidate: New or returning lifter with fat to lose
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                <strong>What to do:</strong> Eat at your calculated recomp
                calories and hit your daily protein. Follow a progressive
                strength routine 3–4 days per week.
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                <strong>Best next step:</strong> Read our{" "}
                <Link
                  href="/guides/body-recomposition-for-beginners"
                  className="text-cloudText underline hover:text-bone"
                >
                  beginner body recomposition guide
                </Link>{" "}
                to set up your training splits and progression rules, follow
                the full{" "}
                <Link
                  href="/guides/body-recomposition-program-for-men"
                  className="text-cloudText underline hover:text-bone"
                >
                  body recomposition program for men
                </Link>
                , or get a target date from the free{" "}
                <Link
                  href="/free/forecast"
                  className="text-cloudText underline hover:text-bone"
                >
                  body recomposition forecast
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Possible candidate: Intermediate lifter or moderate body fat
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                <strong>What to do:</strong> Keep your deficit conservative
                (10–12%) and judge progress by gym performance and waist
                measurements rather than rapid scale drops.
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                <strong>Best next step:</strong> Use the{" "}
                <Link
                  href="/resources/how-to-calculate-macros-for-body-recomposition"
                  className="text-cloudText underline hover:text-bone"
                >
                  recomp macros resource
                </Link>{" "}
                to balance carbs and fats around your training sessions.
              </p>
            </div>

            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Better alternative: Already lean or advanced lifter
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                <strong>What to do:</strong> Simultaneous recomp delivers
                diminishing returns when lean. If you want more muscle, eat in a
                slight surplus (+200–300 kcal). If you want to lose fat, run a
                focused 8–12 week cut.
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                <strong>Best next step:</strong> Check your maintenance level
                with the{" "}
                <Link
                  href="/tools/tdee-calculator"
                  className="text-cloudText underline hover:text-bone"
                >
                  TDEE calculator
                </Link>{" "}
                or consider{" "}
                <Link
                  href={APPLY_HREF}
                  className="text-cloudText underline hover:text-bone"
                >
                  1:1 coaching
                </Link>{" "}
                for individualized programming.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="recomp-progress-signals">
          <p className="eyebrow text-cloudText">Measuring progress</p>
          <h2
            id="recomp-progress-signals"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            How do you know recomp is working if the scale is flat?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            When you build muscle and lose fat at the same time, the bathroom scale can stay unchanged for weeks. Relying solely on scale weight leads many lifters to abandon a working plan prematurely. Track these three objective signals instead:
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                1. Navel waist circumference decreases
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Measure around your waist at the level of your belly button once a week under identical morning conditions. When your waist measurement decreases while your bodyweight stays flat, abdominal and visceral fat is reducing while lean muscle tissue is preserved or growing.
              </p>
            </div>

            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                2. Compound strength holds or progresses
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Log your working sets, repetitions, and weights across your primary compound exercises. In a steep calorie deficit, strength typically drops. If your strength across 3–4 weekly lifting sessions holds steady or increases over 4–6 weeks, your calorie deficit is conservative enough to support muscle tissue.
              </p>
            </div>

            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                3. Standardized monthly progress photos show shape changes
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Take front, side, and back photos every 4 weeks using consistent lighting and framing. Visual changes in abdominal tightness and shoulder definition often become clearly apparent between weeks 8–12 even when your morning bodyweight has barely moved.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="recomp-training-cardio">
          <p className="eyebrow text-cloudText">Training guidance</p>
          <h2
            id="recomp-training-cardio"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            How much lifting and cardio should you do while recomping?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Your calculator targets set the nutritional foundation, but training is what directs those calories toward muscle building rather than fat storage. Balance your training around two clear priorities:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Prioritize lifting 3–4 days per week
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Progressive resistance training provides the mechanical tension required to signal muscle growth. Center sessions around compound exercises like presses, squats, hinges, and rows with consistent progressive overload.
              </p>
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Keep cardio low-impact and moderate
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Treat cardio as a health and recovery support rather than a method to burn off calories. Daily walking or light conditioning supports expenditure without generating excess fatigue that detracts from your primary lifting sessions.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="recomp-macro-split">
          <p className="eyebrow text-cloudText">Macronutrient balance</p>
          <h2
            id="recomp-macro-split"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            How should you split carbs and fat after protein?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Once your protein floor is secured at 0.8–1.0 g/lb, distribute your remaining daily calories between dietary fats and carbohydrates to maximize recovery and performance:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Maintain a dietary fat baseline of 0.3–0.4 g/lb
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Dietary fats are vital for hormone production and joint recovery. Setting dietary fats to approximately 20–25% of total calories ensures essential fatty acid intake without taking away from the energy needed for lifting sessions.
              </p>
            </div>
            <div className="rounded-[6px] border border-line2 bg-ink3/35 px-5 py-5">
              <h3 className="text-bone font-semibold text-[16px]">
                Allocate remaining calories to complex carbohydrates
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                Carbohydrates fuel high-tension strength training and restore muscle glycogen. Eating complex carbs around your training window helps preserve lifting intensity even while in a slight calorie deficit.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        <section aria-labelledby="recomp-adjustment-rules">
          <p className="eyebrow text-cloudText">Progressive adjustments</p>
          <h2
            id="recomp-adjustment-rules"
            className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
          >
            When should you change your recomp calories?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Run your calculator numbers consistently for 4 weeks before changing any variables. If an adjustment is warranted after evaluating your weekly trend data, follow these guidelines:
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                If weight drops faster than 1.5 lbs per week: Add 100–150 calories
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                A rapid scale drop indicates the calorie deficit is too aggressive, risking muscle loss. Add 100–150 daily calories (primarily from carbohydrates) to slow the rate of loss and protect your lean muscle tissue.
              </p>
            </div>

            <div className="rounded-[6px] border border-line2 bg-ink3/35 p-5">
              <h3 className="text-bone font-semibold text-[16px]">
                If waist and lifts are completely flat after 6 weeks: Make one small adjustment
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">
                If your navel waist measurement, gym numbers, and scale weight show zero change after 6 consistent weeks, your current intake is matching maintenance. Reduce daily intake by 100–150 calories or increase daily steps by 1,500–2,000 steps while keeping your protein target constant.
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            Related tools and guides
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2 text-[15px]">
            <Link
              href="/guides/body-recomposition-for-beginners"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body recomposition for beginners
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The formula, realistic timelines, and why beginners are the best
                candidates for simultaneous fat loss and muscle gain.
              </span>
            </Link>
            <Link
              href="/for/weight-loss"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Online weight-loss coaching for men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If the result says cut or recomp, this explains how coaching
                keeps the scale moving without sacrificing muscle.
              </span>
            </Link>
            <Link
              href="/blog/how-to-fix-skinny-fat"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                How to fix skinny fat
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                The full guide for skinny fat men — why it happens, the workout
                plan, and the diet that pairs with your calculator numbers.
              </span>
            </Link>
            <Link
              href="/for/skinny-fat-men"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Coaching for skinny-fat men
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Skinny-fat is where beginner recomp is most powerful — build
                the muscle your frame is missing while the soft midsection
                comes down.
              </span>
            </Link>
            <Link
              href="/guides/how-much-does-an-online-fitness-coach-cost"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Online fitness coaching cost guide
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Compare 1:1 coaching, self-guided programs, and fitness apps
                before deciding how much support you need.
              </span>
            </Link>
            <Link
              href="/resources/how-to-calculate-macros-for-body-recomposition"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body recomposition macros resource
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Turn your calorie target into protein, carbs, and fats, then
                learn how to adjust when weight and measurements disagree.
              </span>
            </Link>
            <Link
              href="/results"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Client results and transformations
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                See what body-composition progress looks like when training,
                nutrition, and weekly adjustments are managed together.
              </span>
            </Link>
            <Link
              href="/tools/tdee-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                TDEE calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Verify your maintenance calorie number with the standalone TDEE
                tool — same Mifflin-St Jeor formula, with cut / recomp / bulk
                targets.
              </span>
            </Link>
            <Link
              href="/tools/macro-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Macro calculator for body recomposition
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Split your recomp calorie target into daily protein, carbs, and
                fat targets based on your bodyweight and phase.
              </span>
            </Link>
            <Link
              href="/vs/fitness-apps"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                1:1 coaching vs fitness apps
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                If you already know the numbers but struggle to follow them,
                compare app-based tracking with weekly human coaching.
              </span>
            </Link>
            <Link
              href="/tools/body-fat-calculator"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Body fat calculator
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Not sure of your body fat percentage? Use tape measurements to
                estimate — the single most useful input for recomp viability.
              </span>
            </Link>
            <a
              href="https://titanforgefit.com/collections/body-recomposition-and-progress"
              className="group grid min-h-20 gap-1 py-4 no-underline"
            >
              <span className="font-semibold text-bone group-hover:text-cloudText">
                Titan Forge body recomposition and progress collection
              </span>
              <span className="text-[13.5px] leading-[1.55] text-mute">
                Explore dedicated body recomposition supplements and progress gear on Titan Forge to support your training.
              </span>
            </a>
          </div>
        </section>

        <div className="hair my-10" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.15]">
            The calculator is the easy part
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The numbers take 90 seconds. The hard part is weeks 3 through 12 —
            reading your weight trend, adjusting protein when life gets busy,
            keeping training progressive when motivation drops, and knowing
            what a flat scale actually means for your composition. That is what
            1:1 coaching with Kris is for.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href={APPLY_HREF} className="btn btn-primary" data-cta="tool_primary">
              Turn these numbers into a plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See the full methodology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <ScholarshipSection sourcePath="/tools/body-recomposition-calculator" />
        <ToolRetentionCTA tool="body-recomposition-calculator" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated {DATE_MODIFIED}. BMR
            equation: Mifflin, M. D., et al. (1990). A new predictive equation
            for resting energy expenditure in healthy individuals.{" "}
            <i>American Journal of Clinical Nutrition</i>, 51(2), 241–247.
            Protein target: Jäger, R., et al. (2017). International Society of
            Sports Nutrition Position Stand: protein and exercise.{" "}
            <i>JISSN</i>, 14(1), 20. Estimates for healthy adults. Not medical
            advice.
          </p>
        </footer>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} exit scholarship={false} />
    </main>
  );
}

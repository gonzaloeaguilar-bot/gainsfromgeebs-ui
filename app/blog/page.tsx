import { existsSync } from "node:fs";
import BlogLanes from "@/components/BlogLanes";
import { deriveCategory } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import ScienceHubFeature from "@/components/ScienceHubFeature";
import ProblemPicker from "@/components/ProblemPicker";
import ResourceCenterNav from "@/components/ResourceCenterNav";
import { resolveProblemPacks } from "@/lib/problemPacks";
import ResourceBrowser, {
  ResourceFilterProvider,
  ResourceFilterContent,
} from "@/components/ResourceBrowser";
import { getAllBlogPosts, getDerivedBlogResources } from "@/lib/blog";

const SITE_URL = "https://gainsfromgeebs.com";

const quickStartRoutes = [
  {
    cue: "Busy",
    href: "/resources/busy-guy-training-plan",
    label: "Busy-week training plan",
    description:
      "Use this when the week is packed and the plan needs to survive work, travel, or low energy.",
  },
  {
    cue: "Protein",
    href: "/resources/protein-guide",
    label: "Simple protein guide",
    description:
      "Use this when nutrition needs one clear anchor before calories, macros, or meal timing.",
  },
  {
    cue: "Consistency",
    href: "/resources/bad-week-adjustment-loop",
    label: "Bad-week adjustment loop",
    description:
      "Use this when missed workouts or calorie overages need a reset instead of a restart.",
  },
  {
    cue: "Coaching",
    href: "/resources/online-fitness-coaching-fit-check",
    label: "Coaching fit check",
    description:
      "Use this when someone needs to decide between 1:1 coaching, a program, an app, or self-coaching.",
  },
];

const quickStartRouteSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/blog#quick-start-resources`,
  name: "Geebs Coaching quick-start resources",
  description:
    "Helpful starting points for busy schedules, protein, consistency, and coaching fit.",
  itemListElement: quickStartRoutes.map((route, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${route.cue}: ${route.label}`,
    url: `${SITE_URL}${route.href}`,
    description: route.description,
  })),
};

const recommendedResourceRoutes = [
  {
    href: "/for/online-fitness-coach-for-men",
    label: "Online Fitness Coach For Men",
    category: "Men's coaching",
  },
  {
    href: "/for/skinny-fat-men",
    label: "Online Fitness Coach For Skinny-Fat Men",
    category: "Body recomposition",
  },
  {
    href: "/guides/body-recomposition-for-beginners",
    label: "Body Recomposition For Beginners",
    category: "Body recomposition",
  },
  {
    href: "/guides/how-much-does-an-online-fitness-coach-cost",
    label: "How Much Does An Online Fitness Coach Cost",
    category: "Coaching decisions",
  },
  {
    href: "/guides/what-does-an-online-fitness-coach-do",
    label: "What Does An Online Fitness Coach Do",
    category: "Coaching decisions",
  },
  {
    href: "/guides/online-fitness-coach-vs-nutritionist",
    label: "Online Fitness Coach Vs Nutritionist",
    category: "Coaching decisions",
  },
  {
    href: "/vs/fitness-apps",
    label: "Geebs Vs Fitness Apps",
    category: "Comparisons",
  },
  {
    href: "/vs/trainwell",
    label: "Geebs Vs Trainwell",
    category: "Comparisons",
  },
  {
    href: "/science/questions/does-poor-sleep-cause-cravings",
    label: "Does Poor Sleep Cause Cravings",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-sleep-deprivation-make-you-eat-more",
    label: "Does Sleep Deprivation Make You Eat More",
    category: "Science questions",
  },
  {
    href: "/science/questions/how-much-protein-for-body-recomposition",
    label: "How Much Protein For Body Recomposition",
    category: "Science questions",
  },
  {
    href: "/science/questions/can-you-build-muscle-and-lose-fat-at-the-same-time",
    label: "Can You Build Muscle And Lose Fat At The Same Time",
    category: "Science questions",
  },
  {
    href: "/science/questions/should-you-cut-or-recomp-first",
    label: "Should You Cut Or Recomp First",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-cardio-hurt-muscle-growth",
    label: "Does Cardio Hurt Muscle Growth",
    category: "Science questions",
  },
  {
    href: "/science/questions/cardio-or-weights-for-fat-loss",
    label: "Cardio Or Weights For Fat Loss",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-strength-training-help-you-age-better",
    label: "Does Strength Training Help You Age Better",
    category: "Science questions",
  },
  {
    href: "/science/questions/do-cravings-mean-you-are-deficient",
    label: "Do Cravings Mean You Are Deficient",
    category: "Science questions",
  },
  {
    href: "/science/questions/why-do-i-crave-snacks-at-night",
    label: "Why Do I Crave Snacks At Night",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-caffeine-before-bed-hurt-sleep",
    label: "Does Caffeine Before Bed Hurt Sleep",
    category: "Science questions",
  },
  {
    href: "/science/questions/can-pre-workout-at-night-hurt-sleep",
    label: "Can Pre-Workout At Night Hurt Sleep",
    category: "Science questions",
  },
  {
    href: "/science/questions/is-intermittent-fasting-better-than-calorie-restriction",
    label: "Is Intermittent Fasting Better Than Calorie Restriction",
    category: "Science questions",
  },
  {
    href: "/science/questions/will-intermittent-fasting-cause-muscle-loss",
    label: "Will Intermittent Fasting Cause Muscle Loss",
    category: "Science questions",
  },
  {
    href: "/science/questions/should-men-over-30-take-creatine",
    label: "Should Men Over 30 Take Creatine",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-creatine-work-without-lifting",
    label: "Does Creatine Work Without Lifting",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-resistance-training-help-brain-health-as-you-age",
    label: "Does Resistance Training Help Brain Health As You Age",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-creatine-help-brain-health-as-you-age",
    label: "Does Creatine Help Brain Health As You Age",
    category: "Science questions",
  },
  {
    href: "/science/questions/are-ultra-processed-foods-bad-for-fat-loss",
    label: "Are Ultra-Processed Foods Bad For Fat Loss",
    category: "Science questions",
  },
  {
    href: "/science/questions/is-hiit-better-than-steady-cardio-for-fat-loss",
    label: "Is HIIT Better Than Steady Cardio For Fat Loss",
    category: "Science questions",
  },
  {
    href: "/science/questions/how-much-cardio-for-fat-loss",
    label: "How Much Cardio For Fat Loss",
    category: "Science questions",
  },
  {
    href: "/science/questions/how-to-lose-fat-without-losing-muscle",
    label: "How To Lose Fat Without Losing Muscle",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-phone-in-bed-hurt-sleep",
    label: "Does Phone In Bed Hurt Sleep",
    category: "Science questions",
  },
  {
    href: "/science/questions/does-protein-help-you-stay-full",
    label: "Does Protein Help You Stay Full",
    category: "Science questions",
  },
  {
    href: "/science/questions/is-lifting-enough-for-longevity",
    label: "Is Lifting Enough For Longevity",
    category: "Science questions",
  },
  {
    href: "/science/questions/what-is-the-best-exercise-for-longevity",
    label: "Best Exercise For Longevity",
    category: "Science questions",
  },
  {
    href: "/science/fresh-research",
    label: "Fresh Peer-Reviewed Fitness Research",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest",
    label: "Weekly Science Drop Archive",
    category: "Science library",
  },
  {
    href: "/science/weekly-science-drop",
    label: "Weekly Science Drop Email",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/2026-07-06",
    label: "Latest Weekly Science Drop Issue",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/sleep-screens-cravings",
    label: "Phones, Caffeine, Sleep, And Late-Night Cravings",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/protein-satiety-recomposition",
    label: "Protein, Fullness, And Body Recomposition",
    category: "Science library",
  },
  {
    href: "/science/questions/does-protein-help-preserve-muscle-as-you-age",
    label: "Protein And Muscle As You Age",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/lifting-cardio-longevity",
    label: "Lifting, Cardio, And Longevity",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/food-environment-calorie-control",
    label: "Cravings, Food Environment, Fasting, And Calorie Control",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/creatine-strength-aging",
    label: "Creatine, Lifting, And Aging",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/cardio-dose-fat-loss",
    label: "Cardio Dose, HIIT, And Fat Loss",
    category: "Science library",
  },
  {
    href: "/science/weekly-digest/muscle-retention-fat-loss",
    label: "Fat Loss Without Dieting Muscle Off",
    category: "Science library",
  },
  {
    href: "/science/citation-map",
    label: "Geebs Science Source Guide",
    category: "Science library",
  },
  {
    href: "/for/men-in-their-30s",
    label: "Online Fitness Coach For Men In Their 30s",
    category: "Men's coaching",
  },
  {
    href: "/for/men-over-40",
    label: "Online Fitness Coach For Men Over 40",
    category: "Men's coaching",
  },
  {
    href: "/for/new-dads",
    label: "Online Fitness Coach For New Dads",
    category: "Men's coaching",
  },
  {
    href: "/for/weight-loss",
    label: "Online Fitness Coach For Weight Loss",
    category: "Weight loss",
  },
  {
    href: "/for/accountability",
    label: "Fitness Accountability Coaching",
    category: "Accountability",
  },
  {
    href: "/blog/best-online-fitness-coaches-for-busy-men",
    label: "Best Online Fitness Coaches For Busy Men",
    category: "Coaching decisions",
  },
  {
    href: "/blog/is-online-fitness-coaching-worth-it",
    label: "Is Online Fitness Coaching Worth It",
    category: "Coaching decisions",
  },
  {
    href: "/blog/body-recomposition-before-and-after-men",
    label: "Body Recomposition Before And After Men",
    category: "Body recomposition",
  },
  {
    href: "/blog/cut-vs-recomp-vs-bulk",
    label: "Cut Vs Recomp Vs Bulk",
    category: "Body recomposition",
  },
  {
    href: "/blog/how-to-fix-skinny-fat",
    label: "How To Fix Skinny Fat",
    category: "Body recomposition",
  },
];

const priorityDecisionRoutes = [
  {
    href: "/for/skinny-fat-men",
    label: "Coaching for skinny-fat men",
    description:
      "High-intent service page for men deciding whether they need recomp coaching, a cut, or a more deliberate build phase.",
  },
  {
    href: "/guides/body-recomposition-for-beginners",
    label: "Body recomposition for beginners",
    description:
      "The cleanest decision guide for whether recomp is realistic and what the first 12 weeks should actually look like.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    label: "Body recomposition calculator",
    description:
      "Fast self-assessment for calories, protein, and whether a recomp phase makes sense for your current profile.",
  },
  {
    href: "/guides/how-much-does-an-online-fitness-coach-cost",
    label: "How much does an online fitness coach cost?",
    description:
      "Buying-intent guide for price ranges, what changes the investment, and when 1:1 is worth it.",
  },
  {
    href: "/guides/what-does-an-online-fitness-coach-do",
    label: "What does an online fitness coach do?",
    description:
      "Plain-English explanation of what a real coach handles beyond workouts: accountability, feedback, nutrition, and adjustment.",
  },
  {
    href: "/vs/fitness-apps",
    label: "Geebs vs fitness apps",
    description:
      "Use the comparison when the question is whether coaching solves more than another app can.",
  },
];

const recommendedResourceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/blog#recommended-resources`,
  name: "Geebs Coaching recommended resources",
  description:
    "A curated path through Geebs Coaching guides, comparisons, tools, and science resources.",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: recommendedResourceRoutes.map((route, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: route.label,
    url: `${SITE_URL}${route.href}`,
    additionalType: route.category,
  })),
};

export const metadata: Metadata = {
  title: "Fitness Resource Center | Geebs Coaching",
  description:
    "Search Geebs Coaching's free calculators and training, nutrition, consistency, and body recomposition guides.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Fitness Resource Center | Geebs Coaching",
    description:
      "Free calculators plus training, nutrition, consistency, and body recomposition guides from Geebs Coaching.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching fitness guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Resource Center | Geebs Coaching",
    description:
      "Free calculators and practical fitness guides from Kris Oddo.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

function ResourceBrowserFallback() {
  return <p className="mt-6 text-mute">Search resources</p>;
}

const guideClusters = [
  {
    title: "Coaching decisions",
    links: [
      {
        href: "/for/online-fitness-coach-for-men",
        label: "Online fitness coach for men",
      },
      {
        href: "/guides/what-does-an-online-fitness-coach-do",
        label: "What does an online fitness coach do?",
      },
      {
        href: "/guides/how-much-does-an-online-fitness-coach-cost",
        label: "How much does coaching cost?",
      },
      {
        href: "/vs/fitness-apps",
        label: "Geebs vs fitness apps",
      },
      {
        href: "/blog/is-online-fitness-coaching-worth-it",
        label: "Is online fitness coaching worth it?",
      },
      {
        href: "/blog/best-online-fitness-coaches-for-busy-men",
        label: "Best online fitness coaches for busy men",
      },
      {
        href: "/blog/online-fitness-coach-vs-personal-trainer",
        label: "Online coach vs personal trainer",
      },
      {
        href: "/blog/fitness-accountability-coach",
        label: "Fitness accountability coach",
      },
    ],
  },
  {
    title: "Busy professional weeks",
    links: [
      {
        href: "/blog/3-day-workout-plan-for-busy-men",
        label: "3-day workout plan for busy men",
      },
      {
        href: "/blog/workout-plan-for-busy-executives",
        label: "Workout plan for busy executives",
      },
      {
        href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
        label: "Fitness with a 60-hour work week",
      },
      {
        href: "/blog/fitness-plan-for-men-who-travel-for-work",
        label: "Fitness plan for work travel",
      },
      {
        href: "/blog/fitness-coach-for-busy-professionals",
        label: "Fitness coach for busy professionals",
      },
      {
        href: "/blog/sleep-and-fat-loss-for-busy-professionals",
        label: "Sleep and fat loss",
      },
    ],
  },
  {
    title: "Desk and software work",
    links: [
      {
        href: "/blog/workout-plan-for-software-engineers",
        label: "Workout plan for software engineers",
      },
      {
        href: "/blog/best-gym-routine-for-software-engineers",
        label: "Best gym routine for software engineers",
      },
      {
        href: "/blog/how-to-stay-fit-working-from-home",
        label: "Stay fit working from home",
      },
      {
        href: "/blog/standing-desk-vs-walking-pad",
        label: "Standing desk vs fitness tracker",
      },
      {
        href: "/blog/strength-training-for-desk-workers",
        label: "Desk-worker strength guide",
      },
    ],
  },
  {
    title: "Recomposition decisions",
    links: [
      {
        href: "/guides/body-recomposition-for-beginners",
        label: "Body recomposition for beginners",
      },
      {
        href: "/tools/body-recomposition-calculator",
        label: "Body recomposition calculator",
      },
      {
        href: "/for/skinny-fat-men",
        label: "Coaching for skinny-fat men",
      },
      {
        href: "/blog/cut-vs-recomp-vs-bulk",
        label: "Cut vs recomp vs bulk",
      },
      {
        href: "/blog/how-long-to-see-results-working-out",
        label: "How long to see results",
      },
      {
        href: "/blog/body-recomposition-before-and-after-men",
        label: "Body recomposition before and after",
      },
      {
        href: "/blog/body-recomposition-coach-denver",
        label: "Body recomposition coach in Denver",
      },
      {
        href: "/blog/calorie-deficit-without-counting-everything",
        label: "Calorie deficit without counting everything",
      },
    ],
  },
  {
    title: "Fat loss without extremes",
    links: [
      {
        href: "/blog/how-to-lose-the-dad-bod",
        label: "How to lose the dad bod",
      },
      {
        href: "/blog/how-to-lose-belly-fat-men-30s",
        label: "Lose belly fat in your 30s",
      },
      {
        href: "/blog/how-to-lose-belly-fat-sitting-all-day",
        label: "Lose belly fat sitting all day",
      },
      {
        href: "/blog/diet-soda-and-fat-loss",
        label: "Diet soda and fat loss",
      },
      {
        href: "/blog/weight-loss-for-men-who-hate-dieting",
        label: "Weight loss for men who hate dieting",
      },
    ],
  },
  {
    title: "Training execution",
    links: [
      {
        href: "/blog/progressive-overload-explained",
        label: "Progressive overload explained",
      },
      {
        href: "/blog/are-you-training-hard-enough",
        label: "Are you training hard enough?",
      },
      {
        href: "/blog/how-to-build-muscle-for-skinny-guys",
        label: "Build muscle for skinny guys",
      },
      {
        href: "/blog/how-to-build-muscle-at-home",
        label: "Build muscle at home",
      },
      {
        href: "/blog/beginner-strength-training-for-men",
        label: "Beginner strength training for men",
      },
    ],
  },
  {
    title: "Consistency resets",
    links: [
      {
        href: "/free/goal-tracker",
        label: "Goal weight forecast",
      },
      {
        href: "/blog/morning-routine-for-men-25-40",
        label: "Morning routine for men 25-40",
      },
      {
        href: "/blog/why-you-cant-stay-consistent-with-the-gym",
        label: "Why you cannot stay consistent",
      },
      {
        href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
        label: "Stay consistent with diet on weekends",
      },
      {
        href: "/blog/how-to-build-confidence-in-the-gym",
        label: "Build confidence in the gym",
      },
    ],
  },
  {
    title: "Coaching by context",
    links: [
      {
        href: "/blog/online-fitness-coach-denver",
        label: "Online fitness coach in Denver",
      },
      {
        href: "/blog/online-fitness-coach-for-men-over-30",
        label: "Online fitness coach for men over 30",
      },
      {
        href: "/guides/getting-back-in-shape-after-a-long-break",
        label: "Getting back in shape after a long break",
      },
      {
        href: "/blog/how-to-build-muscle-in-your-30s",
        label: "Build muscle in your 30s",
      },
      {
        href: "/blog/gym-anxiety-for-men",
        label: "Gym anxiety for men",
      },
    ],
  },
];

function GuideClusters() {
  return (
    <section
      aria-labelledby="guide-clusters-heading"
      className="mt-14 border-t border-line2 pt-9 md:mt-16 md:pt-10"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">Browse by goal</p>
        <h2
          id="guide-clusters-heading"
          className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
        >
          Pick the path closest to the problem.
        </h2>
      </div>

      <div className="mt-6 grid gap-7 md:grid-cols-2">
        {guideClusters.map((cluster) => (
          <div key={cluster.title}>
            <h3 className="text-[17px] font-semibold tracking-normal text-bone">
              {cluster.title}
            </h3>
            <ul className="mt-3 divide-y divide-line2 border-y border-line2">
              {cluster.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-12 items-center justify-between gap-3 py-2.5 text-[14.5px] font-medium text-bone/82 transition-colors hover:text-bone"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-cloud">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickStartRoutes() {
  return (
    <section
      aria-labelledby="quick-start-routes-heading"
      className="mt-14 border-t border-line2 pt-9 md:mt-16 md:pt-10"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">Popular shortcuts</p>
        <h2
          id="quick-start-routes-heading"
          className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
        >
          Four quick ways to find the right Geebs resource.
        </h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.65] text-mute">
          Start with the problem you want to solve today: a packed schedule,
          protein, consistency, or deciding whether coaching fits.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickStartRoutes.map((route) => (
          <Link
            key={route.cue}
            href={route.href}
            className="block rounded-lg border border-line2 bg-bone/[0.025] p-4 transition-colors hover:border-cloud/50 hover:bg-bone/[0.04]"
          >
            <p className="text-[13px] font-semibold tracking-[0.12em] text-cloudText">
              {route.cue}
            </p>
            <h3 className="mt-2 text-[17px] font-semibold leading-[1.25] tracking-normal text-bone">
              {route.label}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-mute">
              {route.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PriorityDecisionRoutes() {
  return (
    <section
      aria-labelledby="priority-decision-routes-heading"
      className="mt-10 border-y border-line2 py-7 md:mt-12 md:py-8"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">Thinking about coaching?</p>
        <h2
          id="priority-decision-routes-heading"
          className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[30px]"
        >
          Start with the pages that answer buying and fit questions directly.
        </h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.65] text-mute">
          These are the strongest next-click pages for skinny-fat, recomp,
          coaching cost, coaching fit, and app-vs-coach decisions.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {priorityDecisionRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="block rounded-lg border border-line2 bg-bone/[0.025] p-4 transition-colors hover:border-cloud/50 hover:bg-bone/[0.04]"
          >
            <h3 className="text-[17px] font-semibold leading-[1.25] tracking-normal text-bone">
              {route.label}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-mute">
              {route.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ResourceApplyPath() {
  return (
    <section
      aria-labelledby="resource-apply-path-heading"
      data-analytics-source="resource_center_apply_path"
      className="mt-8 py-2"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="eyebrow text-cloudText">Need the plan built for you?</p>
          <h2
            id="resource-apply-path-heading"
            className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[30px]"
          >
            Apply for 1:1 coaching when the guides are not enough.
          </h2>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.65] text-mute">
            If your schedule, travel, training history, or accountability needs
            are the real blocker, use the application path instead of browsing
            another guide.
          </p>
        </div>
        <Link
          href="/apply?utm_source=site&utm_medium=resource_center&utm_campaign=blog_resource_center&utm_content=resource_center_apply_path"
          className="btn btn-primary w-full justify-center md:w-auto"
          data-analytics-event="resource_center_apply_click"
          data-analytics-link-kind="apply"
         data-cta="blog_primary">
          Get this mapped to you
        </Link>
      </div>
    </section>
  );
}

const allArticles = [
  {
    "href": "/blog/3-day-workout-plan-for-busy-men",
    "label": "3-Day Workout Plan for Busy Men"
  },
  {
    "href": "/blog/alcohol-fitness-men",
    "label": "Alcohol and Fat Loss for Men: How to Drink Without Wrecking Your Progress"
  },
  {
    "href": "/blog/are-you-training-hard-enough",
    "label": "Are You Training Hard Enough? (Most Men Aren't)"
  },
  {
    "href": "/blog/beginner-strength-training-for-men",
    "label": "Beginner Strength Training for Men"
  },
  {
    "href": "/blog/best-gym-routine-for-software-engineers",
    "label": "Best Gym Routine for Software Engineers: How to Choose"
  },
  {
    "href": "/blog/best-online-fitness-coaches-for-busy-men",
    "label": "Best Online Fitness Coaches for Busy Men (2026) \u2014 An Honest List"
  },
  {
    "href": "/blog/body-recomposition-before-and-after-men",
    "label": "Body Recomposition Before and After for Men"
  },
  {
    "href": "/blog/body-recomposition-coach-denver",
    "label": "Body Recomposition Coach in Denver | Geebs Coaching"
  },
  {
    "href": "/blog/body-recomposition-for-men",
    "label": "How to Fix Body Composition: Men's Recomposition Guide | Geebs"
  },
  {
    "href": "/blog/body-recomposition-for-women",
    "label": "Body Recomposition for Women: Build Muscle and Lose Fat"
  },
  {
    "href": "/blog/body-recomposition-macros",
    "label": "Body Recomposition Macros | Protein, Calories, Carbs, Fat"
  },
  {
    "href": "/blog/calorie-deficit-without-counting-everything",
    "label": "Calorie Deficit Without Counting Everything"
  },
  {
    "href": "/blog/creatine-for-men-over-30",
    "label": "Creatine for Men Over 30"
  },
  {
    "href": "/blog/cut-vs-recomp-vs-bulk",
    "label": "Cut vs Recomp vs Bulk | How to Choose"
  },
  {
    "href": "/blog/diet-soda-and-fat-loss",
    "label": "Diet Soda and Fat Loss | What Actually Matters"
  },
  {
    "href": "/blog/do-you-need-a-coach-if-you-already-train",
    "label": "Do You Need a Coach If You Already Train? An Honest Answer"
  },
  {
    "href": "/blog/fitness-accountability-coach",
    "label": "Fitness Accountability Coach | When Structure Beats Motivation"
  },
  {
    "href": "/blog/fitness-coach-for-busy-professionals",
    "label": "Fitness Coach for Busy Professionals | Geebs Coaching"
  },
  {
    "href": "/blog/fitness-coach-for-software-engineers",
    "label": "Fitness Coach for Software Engineers | 1:1 Online Coaching"
  },
  {
    "href": "/blog/fitness-plan-for-founders",
    "label": "Fitness Plan for Founders"
  },
  {
    "href": "/blog/fitness-plan-for-men-who-travel-for-work",
    "label": "Fitness Plan for Men Who Travel for Work | Hotel Gym Guide"
  },
  {
    "href": "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
    "label": "Get in Shape With a 60-Hour Work Week | Busy Men's Fitness Plan"
  },
  {
    "href": "/guides/getting-back-in-shape-after-a-long-break",
    "label": "Getting Back in Shape After a Long Break"
  },
  {
    "href": "/blog/gym-anxiety-for-men",
    "label": "Gym Anxiety: A Straight Guide for Men"
  },
  {
    "href": "/blog/how-fast-do-you-lose-muscle-detraining",
    "label": "How Fast Do You Lose Muscle When You Stop Training? (Detraining, Explained)"
  },
  {
    "href": "/blog/how-long-to-see-results-working-out",
    "label": "How Long Does It Take to See Results From Working Out?"
  },
  {
    "href": "/blog/how-much-cardio-for-fat-loss-men",
    "label": "How Much Cardio Do You Actually Need to Lose Fat?"
  },
  {
    "href": "/blog/how-much-protein-to-lose-fat",
    "label": "How Much Protein to Lose Fat (Without Losing Muscle)"
  },
  {
    "href": "/blog/how-to-build-confidence-in-the-gym",
    "label": "How to Build Confidence in the Gym"
  },
  {
    "href": "/blog/how-to-build-muscle-at-home",
    "label": "How to Build Muscle at Home (Honestly)"
  },
  {
    "href": "/blog/how-to-build-muscle-for-skinny-guys",
    "label": "How to Build Muscle for Skinny Guys \u2014 The Hardgainer's Guide"
  },
  {
    "href": "/blog/how-to-build-muscle-in-your-30s",
    "label": "How to Build Muscle in Your 30s | Training and Nutrition Guide"
  },
  {
    "href": "/blog/how-to-find-an-online-fitness-coach-for-men",
    "label": "How to Find an Online Fitness Coach for Men | No-Nonsense Guide"
  },
  {
    "href": "/blog/how-to-get-the-most-from-online-coaching",
    "label": "How to Get the Most Out of Online Coaching | Geebs"
  },
  {
    "href": "/blog/how-to-hire-an-online-fitness-coach",
    "label": "How to Hire an Online Fitness Coach: A Checklist for Men"
  },
  {
    "href": "/blog/how-to-lose-belly-fat-men-30s",
    "label": "How to Lose Belly Fat for Men in Your 30s | Age-Calibrated Guide"
  },
  {
    "href": "/blog/how-to-lose-belly-fat-sitting-all-day",
    "label": "How to Lose Belly Fat When You Sit All Day | NEAT, Desk Work, and Fat Loss"
  },
  {
    "href": "/blog/how-to-lose-belly-fat-with-client-dinners",
    "label": "How to Lose Belly Fat With Client Dinners | Social Eating Strategy for Men"
  },
  {
    "href": "/blog/how-to-lose-fat-without-losing-muscle-men",
    "label": "How to Lose Fat Without Losing Muscle (Men's Cutting Guide)"
  },
  {
    "href": "/blog/how-to-lose-the-dad-bod",
    "label": "How to Lose the Dad Bod: A Real-Life Guide for Men 25-40"
  },
  {
    "href": "/blog/how-to-stay-consistent-with-diet-on-weekends",
    "label": "How to Stay Consistent With Your Diet on Weekends"
  },
  {
    "href": "/blog/how-to-stay-fit-working-from-home",
    "label": "How to Stay Fit Working From Home | WFH Fitness Day Structure"
  },
  {
    "href": "/blog/how-to-stay-fit-working-long-hours",
    "label": "How to Stay Fit Working Long Hours"
  },
  {
    "href": "/blog/intermittent-fasting-men-over-30",
    "label": "Intermittent Fasting for Men Over 30: Does It Actually Work?"
  },
  {
    "href": "/blog/is-online-fitness-coaching-worth-it",
    "label": "Is Online Fitness Coaching Worth It? (And Does It Actually Work?)"
  },
  {
    "href": "/blog/morning-routine-for-men-25-40",
    "label": "Morning Routine for Men 25-40 | Evidence-Based Guide"
  },
  {
    "href": "/blog/nutrition-coach-for-busy-professionals",
    "label": "Nutrition Coach for Busy Professionals | Flexible Fat Loss"
  },
  {
    "href": "/blog/online-fitness-coach-for-men-over-30",
    "label": "Online Fitness Coach for Men Over 30"
  },
  {
    "href": "/blog/online-fitness-coach-denver",
    "label": "Online Fitness Coach in Denver | Geebs Coaching"
  },
  {
    "href": "/blog/online-fitness-coach-vs-personal-trainer",
    "label": "Online Fitness Coach vs Personal Trainer | Which Fits?"
  },
  {
    "href": "/blog/progressive-overload-explained",
    "label": "Progressive Overload, Explained: How to Actually Do It"
  },
  {
    "href": "/blog/protein-intake-for-weight-loss-and-muscle-gain",
    "label": "Protein Intake for Weight Loss and Muscle Gain"
  },
  {
    "href": "/blog/questions-to-ask-an-online-fitness-coach",
    "label": "Questions to Ask an Online Fitness Coach Before You Sign Up | Geebs"
  },
  {
    "href": "/blog/how-to-fix-skinny-fat",
    "label": "How to Fix Skinny Fat for Men: Build Muscle & Lose Fat"
  },
  {
    "href": "/blog/sleep-and-fat-loss-for-busy-professionals",
    "label": "Sleep and Fat Loss for Busy Professionals"
  },
  {
    "href": "/blog/standing-desk-vs-walking-pad",
    "label": "Standing Desk vs Fitness Tracker: What Should You Buy First?"
  },
  {
    "href": "/blog/strength-training-for-desk-workers",
    "label": "Strength Training for Desk Workers | Program, Posture, Posterior Chain"
  },
  {
    "href": "/blog/strength-training-for-women-beginners",
    "label": "Strength Training for Women Beginners | Geebs Coaching"
  },
  {
    "href": "/blog/weight-loss-for-men-who-hate-dieting",
    "label": "Weight Loss for Men Who Hate Dieting"
  },
  {
    "href": "/blog/training-after-35-men",
    "label": "What Changes About Training After 35 (And What Doesn't) | Geebs"
  },
  {
    "href": "/blog/pre-post-workout-nutrition-men",
    "label": "What to Eat Before and After a Workout (Simple Rules for Men)"
  },
  {
    "href": "/blog/why-you-cant-stay-consistent-with-the-gym",
    "label": "Why You Can't Stay Consistent With the Gym (It's Not Willpower)"
  },
  {
    "href": "/blog/workout-plan-for-busy-executives",
    "label": "Workout Plan for Busy Executives | 3 Days a Week"
  },
  {
    "href": "/blog/workout-plan-for-programmers",
    "label": "Bodyweight Exercises for Developers: Workout Plan | Geebs"
  },
  {
    "href": "/blog/workout-plan-for-software-engineers",
    "label": "Workout Plan for Software Engineers: Complete Weekly Schedule"
  }
];


function AllArticlesGrid() {
  const articles = Array.from(new Map([
    ...allArticles.map(article => [article.href, article] as const),
    ...getAllBlogPosts().map(post => [`/blog/${post.slug}`, { href: `/blog/${post.slug}`, label: post.title }] as const),
  ]).values()).sort((a, b) => a.label.localeCompare(b.label));
  return (
    <section
      aria-labelledby="all-articles-heading"
      className="mt-14 border-t border-line2 pt-9 md:mt-16 md:pt-10"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">Full library</p>
        <h2
          id="all-articles-heading"
          className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
        >
          All articles A-Z.
        </h2>
      </div>

      <div className="mt-6">
        <ul className="divide-y divide-line2 border-b border-line2">
          {articles.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className="flex min-h-12 items-center justify-between gap-3 py-2.5 text-[14.5px] font-medium text-bone/82 transition-colors hover:text-bone"
              >
                <span>{article.label}</span>
                <span aria-hidden="true" className="text-cloud">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LatestPosts() {
  const posts = getAllBlogPosts();

  if (posts.length === 0) return null;

  // Group by the category the library already derives. Ordered by size, so the
  // lane with the most in it is the one a reader meets first.
  const byCategory = new Map<string, typeof posts>();
  for (const post of posts) {
    const category = deriveCategory(post);
    const bucket = byCategory.get(category);
    if (bucket) bucket.push(post);
    else byCategory.set(category, [post]);
  }
  const lanes = [...byCategory.entries()]
    .map(([category, list]) => ({
      category,
      posts: [...list]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          // Hero art lives by filename convention, not in frontmatter, so it is
          // detected rather than declared. 13 of the 70 posts have one today.
          hero: existsSync(`public/blog/${post.slug}/hero.jpg`)
            ? `/blog/${post.slug}/hero.jpg`
            : undefined,
        })),
    }))
    .sort((a, b) => b.posts.length - a.posts.length);
  
  return (
    <section
      aria-labelledby="latest-posts-heading"
      className="mt-14 border-t border-line2 pt-9 md:mt-16 md:pt-10"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">The library</p>
        <h2
          id="latest-posts-heading"
          className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
        >
          Every post, by topic.
        </h2>
      </div>

      <BlogLanes lanes={lanes} />
    </section>
  );
}

export default async function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const extraItems = getDerivedBlogResources(posts);

  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="geebs-quick-start-routes-schema" data={quickStartRouteSchema} />
      <JsonLd
        id="geebs-recommended-resource-routes-schema"
        data={recommendedResourceSchema}
      />
      <section className="mx-auto max-w-[980px] px-6 md:px-10 pt-8 md:pt-14 pb-40 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Learning hub</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]">
            What&apos;s holding you back?
          </h1>
          <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-mute">
            Articles, science and practical tools. Choose a topic to see what to read next.
          </p>
        </header>

        <ResourceCenterNav />
        <ScienceHubFeature />
        <ProblemPicker packs={resolveProblemPacks()} />
        <ResourceFilterProvider>
          <Suspense fallback={<ResourceBrowserFallback />}>
            <ResourceBrowser extraItems={extraItems} />
          </Suspense>
          <ResourceFilterContent>
            <div className="resource-folds resource-folds--posts">
              <details id="resource-all-posts">
                <summary>All {posts.length} posts</summary>
                <div>
                  <AllArticlesGrid />
                  <LatestPosts />
                </div>
              </details>
            </div>
            <ResourceApplyPath />
            <div className="resource-folds">
              <details>
                <summary>Thinking about coaching?</summary>
                <div>
                  <PriorityDecisionRoutes />
                </div>
              </details>
              <details>
                <summary>Popular shortcuts</summary>
                <div>
                  <QuickStartRoutes />
                </div>
              </details>
              <details>
                <summary>Browse by goal</summary>
                <div>
                  <GuideClusters />
                </div>
              </details>
            </div>
          </ResourceFilterContent>
        </ResourceFilterProvider>
      </section>
    </main>
  );
}

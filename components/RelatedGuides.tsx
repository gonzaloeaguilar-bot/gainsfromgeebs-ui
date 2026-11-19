import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import ScienceDropSignup from "@/components/ScienceDropSignup";

type Guide = {
  href: string;
  title: string;
  summary: string;
};

const GUIDES: Guide[] = [
  {
    href: "/geebs-method",
    title: "What is The Geebs Method?",
    summary: "Kris's coaching system for imperfect weeks, in plain English.",
  },
  {
    href: "/blog/body-recomposition-for-men",
    title: "Body recomposition for men",
    summary: "The cornerstone guide for building muscle while losing fat.",
  },
  {
    href: "/blog/body-recomposition-for-women",
    title: "Body recomposition for women",
    summary: "Build muscle and lose fat without chasing the scale alone.",
  },
  {
    href: "/blog/strength-training-for-women-beginners",
    title: "Strength training for women beginners",
    summary: "A simple way to start lifting and progress with confidence.",
  },
  {
    href: "/blog/how-to-fix-skinny-fat",
    title: "How to fix skinny fat",
    summary: "Why the scale looks fine but the mirror does not.",
  },
  {
    href: "/blog/how-to-lose-the-dad-bod",
    title: "How to lose the dad bod",
    summary: "A real-week plan for the soft middle and lost definition.",
  },
  {
    href: "/blog/how-to-lose-belly-fat-men-30s",
    title: "How to lose belly fat in your 30s",
    summary: "The straight answer on stubborn belly fat and what moves it.",
  },
  {
    href: "/blog/progressive-overload-explained",
    title: "Progressive overload, explained",
    summary: "The principle that keeps training from turning into maintenance.",
  },
  {
    href: "/guides/strength-training-plateau",
    title: "Strength training plateau",
    summary: "Why your lifts stopped going up and how to break the stall.",
  },
  {
    href: "/blog/are-you-training-hard-enough",
    title: "Are you training hard enough?",
    summary: "How to tell whether your sets are actually creating a stimulus.",
  },
  {
    href: "/blog/how-much-protein-to-lose-fat",
    title: "How much protein to lose fat",
    summary: "The protein target that helps preserve muscle while leaning out.",
  },
  {
    href: "/blog/how-to-build-muscle-for-skinny-guys",
    title: "How to build muscle for skinny guys",
    summary: "A hardgainer-focused path for adding size without guesswork.",
  },
  {
    href: "/blog/how-to-build-muscle-at-home",
    title: "How to build muscle at home",
    summary: "The honest gear, progression, and consistency tradeoffs.",
  },
  {
    href: "/blog/how-to-build-muscle-in-your-30s",
    title: "How to build muscle in your 30s",
    summary: "Training, recovery, and nutrition for muscle gain after 30.",
  },
  {
    href: "/guides/getting-back-in-shape-after-a-long-break",
    title: "Getting back in shape after a long break",
    summary: "Muscle memory, the first month, and how not to fall off again.",
  },
  {
    href: "/blog/why-you-cant-stay-consistent-with-the-gym",
    title: "Why you can't stay consistent",
    summary: "The consistency failure pattern most men keep repeating.",
  },
  {
    href: "/blog/gym-anxiety-for-men",
    title: "Gym anxiety for men",
    summary: "How to stop feeling watched, lost, or out of place in the gym.",
  },
  {
    href: "/for/men-who-hate-the-gym",
    title: "Coaching for men who hate the gym",
    summary: "Build real strength and body recomposition at home without stepping into a commercial gym.",
  },
  {
    href: "/blog/is-online-fitness-coaching-worth-it",
    title: "Is online fitness coaching worth it?",
    summary: "A buying guide for deciding when coaching is worth paying for.",
  },
  {
    href: "/blog/morning-routine-for-men-25-40",
    title: "Morning routine for men 25-40",
    summary: "The evidence-backed anchors that survive a real workday.",
  },
  {
    href: "/blog/3-day-workout-plan-for-busy-men",
    title: "3-day workout plan for busy men",
    summary: "A three-day lifting plan built for crowded workweeks.",
  },
  {
    href: "/blog/workout-plan-for-busy-executives",
    title: "Workout plan for busy executives",
    summary: "Three focused lifting days for packed calendars.",
  },
  {
    href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
    title: "Get in shape with a 60-hour work week",
    summary: "The minimum effective plan for demanding schedules.",
  },
  {
    href: "/blog/fitness-plan-for-men-who-travel-for-work",
    title: "Fitness plan for men who travel for work",
    summary: "Training and nutrition defaults for road weeks.",
  },
  {
    href: "/blog/how-to-lose-belly-fat-with-client-dinners",
    title: "Lose belly fat with client dinners",
    summary: "Restaurant rules that keep fat loss moving.",
  },
  {
    href: "/blog/workout-plan-for-software-engineers",
    title: "Workout plan for software engineers",
    summary: "Three lifting days, walks, and simple food defaults.",
  },
  {
    href: "/blog/how-to-stay-fit-working-from-home",
    title: "How to stay fit working from home",
    summary: "WFH structure for training, walking, and kitchen rules.",
  },
  {
    href: "/blog/strength-training-for-desk-workers",
    title: "Strength training for desk workers",
    summary: "A lifting plan for men who sit most of the day.",
  },
  {
    href: "/blog/how-to-lose-belly-fat-sitting-all-day",
    title: "Lose belly fat sitting all day",
    summary: "Fat-loss defaults for desk-heavy and remote workdays.",
  },
  {
    href: "/blog/standing-desk-vs-walking-pad",
    title: "Standing desk vs walking pad",
    summary: "What helps remote-worker fitness, and what still needs training.",
  },
  {
    href: "/blog/best-gym-routine-for-software-engineers",
    title: "Best gym routine for software engineers",
    summary: "A tactical three-day lifting routine for developers.",
  },
  {
    href: "/blog/best-online-fitness-coaches-for-busy-men",
    title: "Best online fitness coaches for busy men (2026)",
    summary: "An honest breakdown of well-regarded coaches and how to pick.",
  },
  {
    href: "/blog/how-long-to-see-results-working-out",
    title: "How long to see results from working out",
    summary: "The honest week-by-week breakdown — what changes inside your body vs. what you can see.",
  },
  {
    href: "/blog/creatine-for-men-over-30",
    title: "Creatine for men over 30",
    summary: "What it does, why your 30s is when it matters, and the 5g/day protocol.",
  },
  {
    href: "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    title: "Calorie deficit but not losing weight?",
    summary: "Under-logged food, water, a shrinking deficit, less daily movement, or a recomp: how to check each.",
  },
  {
    href: "/blog/alcohol-fitness-men",
    title: "Alcohol and fat loss for men",
    summary: "The mechanics of drinking and fat loss — and a protocol for keeping a social life.",
  },
  {
    href: "/blog/how-to-hire-an-online-fitness-coach",
    title: "How to hire an online fitness coach",
    summary: "The 8-point checklist for credentials, programming, pricing, and red flags — before you pay.",
  },
  {
    href: "/blog/cut-vs-recomp-vs-bulk",
    title: "Cut vs. recomp vs. bulk",
    summary: "How to choose the right phase based on body fat, training history, and consistency.",
  },
  {
    href: "/blog/training-after-35-men",
    title: "What changes about training after 35",
    summary: "The honest breakdown of testosterone drift, recovery demands, and the fundamentals that stay identical.",
  },
  {
    href: "/blog/intermittent-fasting-men-over-30",
    title: "Intermittent fasting for men over 30",
    summary: "Why it works for some, fails for others, and the protein caveat most guides skip.",
  },
  {
    href: "/blog/how-much-cardio-for-fat-loss-men",
    title: "How much cardio for fat loss",
    summary: "The honest answer on how much cardio men who lift actually need — and when more starts working against you.",
  },
  {
    href: "/guides/body-recomposition-for-beginners",
    title: "Body recomposition for beginners",
    summary: "The decision guide for when recomp makes sense, what to expect, and what to do first.",
  },
  {
    href: "/guides/how-to-build-muscle-on-a-plant-based-diet-for-men",
    title: "Build muscle on a plant-based diet",
    summary: "Protein targets, leucine thresholds, and meal structuring for plant-based muscle growth.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    title: "Body recomposition calculator",
    summary: "Check calories, protein, and whether recomp is realistic for your current body-fat and training profile.",
  },
  {
    href: "/for/skinny-fat-men",
    title: "Online fitness coach for skinny-fat men",
    summary: "The service page for skinny-fat men who need a real recomp path instead of another generic split.",
  },
  {
    href: "/guides/what-does-an-online-fitness-coach-do",
    title: "What does an online fitness coach do?",
    summary: "The plain-English breakdown of what 1:1 coaching actually includes beyond workouts.",
  },
  {
    href: "/guides/how-much-does-an-online-fitness-coach-cost",
    title: "How much does an online fitness coach cost?",
    summary: "The buying guide for pricing, what changes the investment, and when 1:1 is worth it.",
  },
  {
    href: "/vs/fitness-apps",
    title: "Geebs vs fitness apps",
    summary: "Compare 1:1 coaching with app-first options when the issue is execution, not information.",
  },
  {
    href: "/blog/how-to-find-an-online-fitness-coach-for-men",
    title: "How to find an online fitness coach for men",
    summary: "What to look for, where to search, red flags to avoid, and how to vet a coach before you commit.",
  },
  {
    href: "/blog/do-you-need-a-coach-if-you-already-train",
    title: "Do you need a coach if you already train?",
    summary: "An honest answer on when coaching adds real value for men who already lift consistently.",
  },
  {
    href: "/science/sleep-and-fat-loss-studies",
    title: "Sleep and fat-loss studies",
    summary:
      "Peer-reviewed sleep, phone, caffeine, appetite, and fat-loss studies behind the coaching takeaways.",
  },
  {
    href: "/science/protein-body-composition-studies",
    title: "Protein and body-composition studies",
    summary:
      "Source-linked protein, satiety, lean-mass, and body-composition research translated into coaching actions.",
  },
  {
    href: "/science/cardio-longevity-studies",
    title: "Cardio and longevity studies",
    summary:
      "Peer-reviewed cardio, resistance-training, cardiorespiratory-fitness, and longevity research.",
  },
  {
    href: "/science/anti-aging-fitness-studies",
    title: "Anti-aging fitness studies",
    summary:
      "Source-linked healthy-aging, strength, cardio, sleep, and fitness-span research without biohacking theater.",
  },
  {
    href: "/science/cravings-appetite-studies",
    title: "Cravings and appetite studies",
    summary:
      "Peer-reviewed cravings, appetite, sleep restriction, snack-intake, protein, and food-default research.",
  },
];

const RELATED: Record<string, string[]> = {
  "/geebs-method": [
    "/blog/body-recomposition-for-men",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
    "/blog/is-online-fitness-coaching-worth-it",
  ],
  "/blog/body-recomposition-for-men": [
    "/guides/body-recomposition-for-beginners",
    "/tools/body-recomposition-calculator",
    "/for/skinny-fat-men",
    "/science/protein-body-composition-studies",
    "/geebs-method",
    "/blog/how-to-lose-the-dad-bod",
    "/blog/how-to-build-muscle-in-your-30s",
  ],
  "/blog/body-recomposition-for-women": [
    "/guides/body-recomposition-for-beginners",
    "/tools/body-recomposition-calculator",
    "/science/protein-body-composition-studies",
    "/blog/strength-training-for-women-beginners",
    "/geebs-method",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/strength-training-for-women-beginners": [
    "/blog/body-recomposition-for-women",
    "/blog/progressive-overload-explained",
    "/blog/are-you-training-hard-enough",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/how-to-fix-skinny-fat": [
    "/for/skinny-fat-men",
    "/guides/body-recomposition-for-beginners",
    "/tools/body-recomposition-calculator",
    "/blog/body-recomposition-for-men",
    "/blog/cut-vs-recomp-vs-bulk",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
  ],
  "/blog/how-to-lose-the-dad-bod": [
    "/blog/how-to-lose-belly-fat-men-30s",
    "/blog/body-recomposition-for-men",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
  ],
  "/blog/how-to-lose-belly-fat-men-30s": [
    "/blog/how-to-lose-the-dad-bod",
    "/blog/how-much-protein-to-lose-fat",
    "/science/cravings-appetite-studies",
    "/blog/how-to-lose-belly-fat-sitting-all-day",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
  ],
  "/blog/progressive-overload-explained": [
    "/guides/strength-training-plateau",
    "/blog/are-you-training-hard-enough",
    "/blog/how-long-to-see-results-working-out",
    "/blog/body-recomposition-for-men",
  ],
  "/guides/strength-training-plateau": [
    "/blog/progressive-overload-explained",
    "/blog/are-you-training-hard-enough",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/are-you-training-hard-enough": [
    "/blog/progressive-overload-explained",
    "/blog/body-recomposition-for-men",
    "/blog/how-to-build-muscle-for-skinny-guys",
    "/blog/how-much-cardio-for-fat-loss-men",
  ],
  "/blog/how-much-protein-to-lose-fat": [
    "/science/protein-body-composition-studies",
    "/guides/body-recomposition-for-beginners",
    "/tools/body-recomposition-calculator",
    "/blog/body-recomposition-for-men",
    "/blog/how-to-lose-belly-fat-men-30s",
    "/blog/creatine-for-men-over-30",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
  ],
  "/blog/how-to-build-muscle-for-skinny-guys": [
    "/blog/progressive-overload-explained",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/how-to-fix-skinny-fat",
  ],
  "/blog/how-to-build-muscle-at-home": [
    "/blog/progressive-overload-explained",
    "/blog/how-to-build-muscle-for-skinny-guys",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
  ],
  "/blog/how-to-build-muscle-in-your-30s": [
    "/science/anti-aging-fitness-studies",
    "/science/protein-body-composition-studies",
    "/blog/progressive-overload-explained",
    "/blog/body-recomposition-for-men",
    "/blog/how-to-build-muscle-at-home",
    "/blog/creatine-for-men-over-30",
    "/blog/training-after-35-men",
  ],
  "/blog/why-you-cant-stay-consistent-with-the-gym": [
    "/guides/getting-back-in-shape-after-a-long-break",
    "/blog/gym-anxiety-for-men",
    "/blog/morning-routine-for-men-25-40",
    "/blog/are-you-training-hard-enough",
  ],
  "/blog/gym-anxiety-for-men": [
    "/for/men-who-hate-the-gym",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
    "/blog/morning-routine-for-men-25-40",
    "/blog/is-online-fitness-coaching-worth-it",
  ],
  "/blog/is-online-fitness-coaching-worth-it": [
    "/guides/what-does-an-online-fitness-coach-do",
    "/guides/how-much-does-an-online-fitness-coach-cost",
    "/vs/fitness-apps",
    "/blog/body-recomposition-for-men",
    "/blog/best-online-fitness-coaches-for-busy-men",
    "/blog/how-to-hire-an-online-fitness-coach",
  ],
  "/blog/morning-routine-for-men-25-40": [
    "/science/sleep-and-fat-loss-studies",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/body-recomposition-for-men",
  ],
  "/blog/3-day-workout-plan-for-busy-men": [
    "/blog/workout-plan-for-busy-executives",
    "/blog/progressive-overload-explained",
    "/blog/best-gym-routine-for-software-engineers",
  ],
  "/blog/workout-plan-for-busy-executives": [
    "/blog/3-day-workout-plan-for-busy-men",
    "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
    "/blog/progressive-overload-explained",
  ],
  "/blog/how-to-get-in-shape-with-a-60-hour-work-week": [
    "/blog/workout-plan-for-busy-executives",
    "/blog/workout-plan-for-software-engineers",
    "/blog/why-you-cant-stay-consistent-with-the-gym",
  ],
  "/blog/fitness-plan-for-men-who-travel-for-work": [
    "/blog/workout-plan-for-busy-executives",
    "/blog/how-to-build-muscle-at-home",
    "/blog/how-to-lose-belly-fat-with-client-dinners",
  ],
  "/blog/how-to-lose-belly-fat-with-client-dinners": [
    "/blog/how-to-lose-belly-fat-men-30s",
    "/science/cravings-appetite-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    "/blog/alcohol-fitness-men",
  ],
  "/blog/workout-plan-for-software-engineers": [
    "/blog/best-gym-routine-for-software-engineers",
    "/blog/strength-training-for-desk-workers",
    "/blog/how-to-stay-fit-working-from-home",
  ],
  "/blog/how-to-stay-fit-working-from-home": [
    "/blog/standing-desk-vs-walking-pad",
    "/blog/how-to-lose-belly-fat-sitting-all-day",
    "/blog/workout-plan-for-software-engineers",
  ],
  "/blog/strength-training-for-desk-workers": [
    "/blog/best-gym-routine-for-software-engineers",
    "/blog/workout-plan-for-software-engineers",
    "/blog/progressive-overload-explained",
  ],
  "/blog/how-to-lose-belly-fat-sitting-all-day": [
    "/blog/how-to-stay-fit-working-from-home",
    "/blog/standing-desk-vs-walking-pad",
    "/blog/how-to-lose-belly-fat-men-30s",
  ],
  "/blog/standing-desk-vs-walking-pad": [
    "/blog/how-to-stay-fit-working-from-home",
    "/blog/how-to-lose-belly-fat-sitting-all-day",
    "/blog/strength-training-for-desk-workers",
  ],
  "/blog/best-gym-routine-for-software-engineers": [
    "/blog/workout-plan-for-software-engineers",
    "/blog/3-day-workout-plan-for-busy-men",
    "/blog/strength-training-for-desk-workers",
  ],
  "/blog/best-online-fitness-coaches-for-busy-men": [
    "/blog/how-to-find-an-online-fitness-coach-for-men",
    "/guides/what-does-an-online-fitness-coach-do",
    "/guides/how-much-does-an-online-fitness-coach-cost",
    "/vs/fitness-apps",
    "/blog/is-online-fitness-coaching-worth-it",
    "/blog/how-to-hire-an-online-fitness-coach",
    "/blog/body-recomposition-for-men",
  ],
  "/blog/how-long-to-see-results-working-out": [
    "/blog/progressive-overload-explained",
    "/guides/getting-back-in-shape-after-a-long-break",
    "/science/protein-body-composition-studies",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/creatine-for-men-over-30": [
    "/science/anti-aging-fitness-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/how-to-build-muscle-in-your-30s",
    "/blog/how-to-fix-skinny-fat",
    "/blog/progressive-overload-explained",
    "/blog/training-after-35-men",
  ],
  "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit": [
    "/blog/how-to-lose-belly-fat-men-30s",
    "/science/cravings-appetite-studies",
    "/science/sleep-and-fat-loss-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/how-to-fix-skinny-fat",
    "/blog/creatine-for-men-over-30",
    "/blog/alcohol-fitness-men",
    "/blog/intermittent-fasting-men-over-30",
  ],
  "/blog/alcohol-fitness-men": [
    "/blog/how-to-lose-belly-fat-with-client-dinners",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    "/science/sleep-and-fat-loss-studies",
    "/blog/how-to-fix-skinny-fat",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/how-to-hire-an-online-fitness-coach": [
    "/guides/what-does-an-online-fitness-coach-do",
    "/guides/how-much-does-an-online-fitness-coach-cost",
    "/vs/fitness-apps",
    "/blog/is-online-fitness-coaching-worth-it",
    "/blog/best-online-fitness-coaches-for-busy-men",
    "/geebs-method",
  ],
  "/blog/cut-vs-recomp-vs-bulk": [
    "/guides/body-recomposition-for-beginners",
    "/tools/body-recomposition-calculator",
    "/for/skinny-fat-men",
    "/blog/body-recomposition-for-men",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/training-after-35-men": [
    "/science/anti-aging-fitness-studies",
    "/science/cardio-longevity-studies",
    "/blog/how-to-build-muscle-in-your-30s",
    "/blog/creatine-for-men-over-30",
    "/blog/progressive-overload-explained",
    "/guides/getting-back-in-shape-after-a-long-break",
    "/blog/intermittent-fasting-men-over-30",
  ],
  "/blog/intermittent-fasting-men-over-30": [
    "/blog/calorie-deficit-without-counting-everything",
    "/science/protein-body-composition-studies",
    "/science/cravings-appetite-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/pre-post-workout-nutrition-men",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    "/blog/training-after-35-men",
  ],
  "/blog/how-much-cardio-for-fat-loss-men": [
    "/science/cardio-longevity-studies",
    "/guides/body-recomposition-for-beginners",
    "/blog/calorie-deficit-without-counting-everything",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/are-you-training-hard-enough",
    "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    "/tools/body-recomposition-calculator",
  ],
  "/blog/how-to-find-an-online-fitness-coach-for-men": [
    "/blog/best-online-fitness-coaches-for-busy-men",
    "/blog/how-to-hire-an-online-fitness-coach",
    "/blog/is-online-fitness-coaching-worth-it",
    "/blog/do-you-need-a-coach-if-you-already-train",
    "/guides/what-does-an-online-fitness-coach-do",
    "/guides/how-much-does-an-online-fitness-coach-cost",
  ],
  "/blog/do-you-need-a-coach-if-you-already-train": [
    "/blog/how-to-find-an-online-fitness-coach-for-men",
    "/blog/is-online-fitness-coaching-worth-it",
    "/blog/best-online-fitness-coaches-for-busy-men",
    "/blog/how-to-hire-an-online-fitness-coach",
  ],
  "/blog/sleep-and-fat-loss-for-busy-professionals": [
    "/science/sleep-and-fat-loss-studies",
    "/science/cravings-appetite-studies",
    "/blog/how-to-stay-fit-working-long-hours",
    "/blog/body-recomposition-macros",
    "/for/busy-professionals",
  ],
  "/blog/protein-intake-for-weight-loss-and-muscle-gain": [
    "/science/protein-body-composition-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/tools/macro-calculator",
    "/blog/body-recomposition-for-men",
  ],
  "/blog/body-recomposition-macros": [
    "/science/protein-body-composition-studies",
    "/resources/how-to-calculate-macros-for-body-recomposition",
    "/tools/macro-calculator",
    "/blog/how-much-protein-to-lose-fat",
  ],
  "/blog/diet-soda-and-fat-loss": [
    "/science/cravings-appetite-studies",
    "/blog/how-to-stay-consistent-with-diet-on-weekends",
    "/resources/diet-soda-cutting",
    "/blog/calorie-deficit-without-counting-everything",
  ],
  "/blog/how-fast-do-you-lose-muscle-detraining": [
    "/science/anti-aging-fitness-studies",
    "/guides/getting-back-in-shape-after-a-long-break",
    "/blog/progressive-overload-explained",
    "/blog/training-after-35-men",
  ],
  "/blog/how-to-lose-fat-without-losing-muscle-men": [
    "/science/protein-body-composition-studies",
    "/science/cardio-longevity-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/how-much-cardio-for-fat-loss-men",
  ],
  "/blog/calorie-deficit-without-counting-everything": [
    "/science/cravings-appetite-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/body-recomposition-macros",
    "/tools/calorie-deficit-calculator",
  ],
  "/blog/pre-post-workout-nutrition-men": [
    "/science/protein-body-composition-studies",
    "/blog/how-much-protein-to-lose-fat",
    "/blog/body-recomposition-macros",
    "/blog/progressive-overload-explained",
  ],
};

const SCIENCE_HREFS = new Set([
  "/science/sleep-and-fat-loss-studies",
  "/science/protein-body-composition-studies",
  "/science/cardio-longevity-studies",
  "/science/anti-aging-fitness-studies",
  "/science/cravings-appetite-studies",
]);

function guideFor(href: string) {
  return GUIDES.find((guide) => guide.href === href);
}

export default function RelatedGuides({ current }: { current: string }) {
  const related = (RELATED[current] ?? [])
    .map(guideFor)
    .filter((guide): guide is Guide => Boolean(guide));
  const scienceRelated = related.filter((guide) => SCIENCE_HREFS.has(guide.href));
  const nonScienceRelated = related.filter(
    (guide) => !SCIENCE_HREFS.has(guide.href),
  );
  const servicePage = current.includes("-for-women")
    ? {
        href: "/for/online-fitness-coach-for-women",
        title: "Online fitness coach for women",
        summary:
          "The service page for women: how 1:1 coaching works and when it is the right fit.",
      }
    : {
        href: "/for/online-fitness-coach-for-men",
        title: "Online fitness coach for men 25-40",
        summary:
          "The primary service page: who Geebs is for, how 1:1 coaching works, and when it is not the right option.",
      };

  // Build a blog-specific source for attribution: 'blog:<slug>'
  const slug = current.startsWith("/blog/") ? current.slice(6) : current.replace(/^\//, "");
  const newsletterSource = `blog:${slug}`;
  const scienceDropSource = `science-drop:blog-${slug}`;
  const applyHref = `/apply?utm_source=site&utm_medium=blog_article&utm_campaign=blog_article_next_steps&utm_content=${encodeURIComponent(slug)}`;
  const dailyHref = `/free/daily?utm_source=site&utm_medium=blog_article&utm_campaign=blog_daily_return&utm_content=${encodeURIComponent(slug)}`;

  return (
    <section aria-labelledby="related-guides" className="mt-12 md:mt-14">
      <div
        className="border-y border-line2 py-6"
        data-analytics-source="blog_article_apply_path"
      >
        <p className="eyebrow text-cloudText">Coaching fit</p>
        <h2 className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.1]">
          Want this built around your real week?
        </h2>
        <p className="mt-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/80">
          Use the guide as a baseline. If your schedule, food, or consistency
          keeps breaking the plan, Kris can map the training and nutrition to
          the week you actually live.
        </p>
        <Link
          href={applyHref}
          className="mt-5 inline-flex text-[14px] font-semibold uppercase tracking-[0.08em] text-cloudText underline decoration-line2 underline-offset-4 transition hover:text-bone"
          data-analytics-event="blog_article_apply_click"
          data-analytics-link-kind="apply"
        >
          Apply for 1:1 coaching
        </Link>
      </div>

      {/* Newsletter opt-in — above related guides on every blog post */}
      <div className="mb-10">
        {scienceRelated.length > 0 ? (
          <ScienceDropSignup source={scienceDropSource} compact />
        ) : (
          <NewsletterSignup
            source={newsletterSource}
            variant="default"
            heading="Weekly training insights"
            subheading="One email a week on training, recomposition, and building the body you actually want. No spam. Unsubscribe anytime."
            ctaLabel="Subscribe"
            showName={false}
          />
        )}
      </div>

      {/* Daily-return habit surface — invite blog readers back every day.
          The article is the deep read; /free/daily is the daily habit that
          turns one-time search reach into a returning audience. Site chrome
          only (no coaching prose), non-gating — mirrors ToolRetentionCTA. */}
      <div className="mb-10" data-analytics-source="blog_article_daily_return">
        <p className="eyebrow text-cloudText">Come back tomorrow</p>
        <h2 className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.1]">
          One study a day beats one long read.
        </h2>
        <p className="mt-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/80 max-w-[60ch]">
          This guide is the deep dive. The Daily Finding is the habit — one
          already-vetted study broken down in plain language, a fresh one every
          day. Bookmark it and check back.
        </p>
        <div className="mt-5 divide-y divide-line2 border-y border-line2 text-[15px]">
          <Link
            href={dailyHref}
            className="group grid min-h-20 gap-1 py-4 no-underline"
            data-analytics-event="blog_article_daily_finding_click"
            data-analytics-link-kind="daily_finding"
          >
            <span className="font-semibold text-bone group-hover:text-cloudText">
              The Daily Finding →
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">
              A new, already-vetted study every day — plain-language takeaways
              you can actually use.
            </span>
          </Link>
        </div>
      </div>

      {scienceRelated.length > 0 && (
        <>
          <div className="hair mb-8" />
          <p className="eyebrow text-cloudText">Supporting studies</p>
          <h2 className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Peer-reviewed research behind this guide
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            {scienceRelated.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group grid min-h-20 gap-1 py-4 text-left no-underline"
                data-analytics-event="related_science_click"
                data-analytics-link-kind="science_source"
              >
                <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                  {guide.title}
                </span>
                <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
                  {guide.summary}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {nonScienceRelated.length > 0 && (
        <>
          <div className="hair my-8" />
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="related-guides"
            className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Related guides
          </h2>
          <div className="mt-5 divide-y divide-line2 border-y border-line2">
            {nonScienceRelated.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group grid min-h-20 gap-1 py-4 text-left no-underline"
              >
                <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                  {guide.title}
                </span>
                <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
                  {guide.summary}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      <div
        className="mt-8"
        data-analytics-source="blog_proof_next_steps"
      >
        <div className="hair my-8" />
        <p className="eyebrow text-cloudText">Proof and next steps</p>
        <h2 className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.1]">
          Connect the guide to the coaching system
        </h2>
        <div className="mt-5 divide-y divide-line2 border-y border-line2">
          <Link
            href={servicePage.href}
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="service_page"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              {servicePage.title}
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              {servicePage.summary}
            </span>
          </Link>
          <Link
            href="/guides/what-does-an-online-fitness-coach-do"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="decision_guide"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              What does an online fitness coach do?
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              The plain-English guide to workouts, nutrition support, feedback,
              accountability, and what 1:1 coaching is actually supposed to do.
            </span>
          </Link>
          <Link
            href="/guides/how-much-does-an-online-fitness-coach-cost"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="cost_guide"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              How much does an online fitness coach cost?
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              The buyer-intent guide for pricing, what changes the investment,
              and when 1:1 is worth paying for.
            </span>
          </Link>
          <Link
            href="/vs/fitness-apps"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="comparison"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              Geebs vs fitness apps
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              Use the comparison when the question is whether a coach is actually
              better for you than another app or template.
            </span>
          </Link>
          <Link
            href="/methodology"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="methodology"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              Geebs coaching methodology
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              The cited training, nutrition, recovery, and accountability system
              behind the advice.
            </span>
          </Link>
          <Link
            href="/geebs-method"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="geebs_method"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              The Geebs Method
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              The branded method page tying the coaching system to Kris Oddo.
            </span>
          </Link>
          <Link
            href="/results"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="results"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              Client results and proof
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              Permissioned client stories, message proof, public review context,
              and result disclaimers in one place.
            </span>
          </Link>
          <Link
            href="/apply"
            className="group grid min-h-20 gap-1 py-4 text-left no-underline"
            data-analytics-event="related_proof_click"
            data-analytics-link-kind="apply"
          >
            <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
              Apply for 1:1 coaching
            </span>
            <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
              Three questions to see whether the coaching fit is strong enough for
              a strategy call.
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

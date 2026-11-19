import { scienceDigestEntries } from "@/data/scienceDigests";
import { scienceDigestIssues } from "@/data/scienceDigestIssues";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import { backfilledScienceStudies } from "@/data/scienceLibrary";
import { scienceQuestionPages } from "@/data/scienceQuestions";
import { getRegisteredPages, toResourceItem } from "@/lib/pageRegistry";
import { RETAILER_SHOPPING_GUIDES } from "@/data/retailShoppingGuides";

export type ResourceType = "guide" | "tool";

export type ResourceItem = {
  title: string;
  href: string;
  category: string;
  description: string;
  type: ResourceType;
  searchTerms: string[];
};

export const freeTools: ResourceItem[] = [
  {
    title: "Today's Finding",
    href: "/free/daily",
    category: "Consistency",
    description:
      "One vetted study a day: what it found, the practical takeaway, and an honest note on what it does not prove. Free, no login. Come back tomorrow for a new one.",
    type: "tool",
    searchTerms: [
      "study of the day",
      "daily research",
      "todays finding",
      "one study a day",
      "daily study",
      "research card",
      "peer reviewed daily",
      "fitness science daily",
      "nutrition study daily",
      "daily science drop",
      "what does the research say",
      "evidence based fitness",
    ],
  },
  {
    title: "Goal Weight Forecast",
    href: "/free/goal-tracker",
    category: "Consistency",
    description:
      "Use a no-login forecast to estimate time to goal weight, calories, macros, and weekly adjustments.",
    type: "tool",
    searchTerms: [
      "goal tracker",
      "fitness tracker",
      "fitness restart audit",
      "12 week fitness forecast",
      "fitness growth forecast",
      "bodyweight forecast",
      "90 day forecast",
      "goal weight forecast",
      "time to goal weight",
      "goal weight ETA",
      "weight loss timeline",
      "calorie forecast",
      "macro forecast",
      "tdee forecast",
      "grocery list",
      "reddit check-in",
      "weekly check-in",
      "falling off",
      "consistency",
      "workouts",
      "protein",
      "offline html",
    ],
  },
  {
    title: "Muscle map",
    href: "/tools/muscle-map",
    category: "Training",
    description:
      "Tap any muscle on an interactive 3D body to see the exercises Kris programs for it, with sets and reps, and what to read next.",
    type: "tool",
    searchTerms: [
      "muscle map",
      "muscle anatomy",
      "which exercises for",
      "3d body",
      "what exercises work which muscle",
      "muscle groups",
      "anatomy chart",
      "best exercise for chest",
      "best exercise for back",
      "interactive muscle diagram",
    ],
  },
  {
    title: "Body recomposition calculator",
    href: "/tools/body-recomposition-calculator",
    category: "Body recomposition",
    description:
      "Get a recomp viability read, calorie target, protein goal, and 12-week expectation based on your training history and body fat.",
    type: "tool",
    searchTerms: [
      "body recomposition",
      "recomp",
      "build muscle lose fat",
      "recomp calculator",
      "body recomp",
      "skinny fat",
      "simultaneous fat loss muscle gain",
    ],
  },
  {
    title: "TDEE calculator",
    href: "/tools/tdee-calculator",
    category: "Calories",
    description:
      "Find your maintenance, cut, recomp, and bulk calorie targets. Free, no signup.",
    type: "tool",
    searchTerms: ["calories", "maintenance", "cut", "bulk", "recomp", "fat loss"],
  },
  {
    title: "Macro calculator",
    href: "/tools/macro-calculator",
    category: "Nutrition",
    description:
      "Estimate body recomposition, cut, or lean-bulk macros from your goal and calorie target.",
    type: "tool",
    searchTerms: [
      "macros",
      "protein",
      "carbs",
      "fat",
      "nutrition",
      "body recomposition macro calculator",
      "body recomp",
      "ripped body macro calculator",
    ],
  },
  {
    title: "Calorie deficit calculator",
    href: "/tools/calorie-deficit-calculator",
    category: "Fat loss",
    description:
      "Set a realistic deficit and pace for fat loss without crash dieting.",
    type: "tool",
    searchTerms: ["deficit", "fat loss", "weight loss", "calories"],
  },
  {
    title: "Body fat calculator",
    href: "/tools/body-fat-calculator",
    category: "Body recomposition",
    description:
      "Use tape measurements to estimate body fat and track the right trend.",
    type: "tool",
    searchTerms: ["body fat", "recomposition", "measurements", "waist"],
  },
  {
    title: "1RM calculator",
    href: "/tools/1rm-calculator",
    category: "Training",
    description:
      "Estimate your one-rep max and set smarter strength-training loads.",
    type: "tool",
    searchTerms: ["strength", "lifting", "one rep max", "progressive overload"],
  },
];

export const guides: ResourceItem[] = [

  {
    title: "Peer-reviewed fitness science library",
    href: "/science",
    category: "Science",
    description:
      "The PubMed-linked study library behind Geebs science content: sleep, anti-aging, nutrition, cravings, cardio, and strength training.",
    type: "guide",
    searchTerms: [
      "science",
      "peer reviewed studies",
      "pubmed",
      "research",
      "anti aging",
      "sleep studies",
      "fitness studies",
      "nutrition studies",
      "cardio studies",
      "evidence based fitness",
      "SCIENCE",
    ],
  },
  {
    title: "Peer-reviewed fitness science questions",
    href: "/science/questions",
    category: "Science",
    description:
      "Plain-English answers to common fitness questions, with practical steps, honest limits, and the original PubMed studies.",
    type: "guide",
    searchTerms: [
      "science questions",
      "fitness science questions",
      "peer reviewed answers",
      "pubmed",
      "FAQ",
      "weekly science drop",
    ],
  },
  {
    title: "Fresh peer-reviewed fitness research",
    href: "/science/fresh-research",
    category: "Science",
    description:
      "Browse newly published PubMed research on sleep, nutrition, cardio, training, cravings, and healthy aging.",
    type: "guide",
    searchTerms: [
      "fresh research",
      "new fitness studies",
      "new PubMed studies",
      "weekly science drop",
      "peer reviewed research",
      "fitness research updates",
      "sleep nutrition cardio studies",
      "evidence based fitness",
    ],
  },
  {
    title: "Weekly Science Drop archive",
    href: "/science/weekly-digest",
    category: "Science",
    description:
      "Browse past Science Drops with Kris's practical takeaway, one action to try, honest limits, and the original peer-reviewed studies.",
    type: "guide",
    searchTerms: [
      "weekly science drop",
      "science digest",
      "fitness research digest",
      "reviewed science studies",
      "weekly fitness study breakdowns",
      "honest fitness study limits",
      "science newsletter archive",
      "evidence based fitness",
    ],
  },
  {
    title: "Weekly Science Drop",
    href: "/science/weekly-science-drop",
    category: "Science",
    description:
      "A free weekly Geebs email that turns one peer-reviewed fitness study into one practical action and one honest note on what the study does not prove.",
    type: "guide",
    searchTerms: [
      "weekly science drop",
      "fitness science email",
      "fitness research newsletter",
      "peer reviewed fitness studies",
      "one study one action one honest limit",
      "PubMed fitness research",
      "evidence based fitness",
      "sleep nutrition cardio training studies",
    ],
  },
  ...scienceDigestIssues.map((issue): ResourceItem => ({
    title: issue.title,
    href: issue.path,
    category: "Science",
    description: issue.summary,
    type: "guide",
    searchTerms: [
      issue.dateLabel,
      ...issue.keywords,
      ...issue.targetQueries,
      "dated science drop",
      "science newsletter issue",
    ],
  })),
  {
    title: "Geebs Science source guide",
    href: "/science/citation-map",
    category: "Science",
    description:
      "Reader-friendly guide to the best Geebs Science pages for exact peer-reviewed fitness answers, Weekly Science Drop summaries, and honest limits on what each study proves.",
    type: "guide",
    searchTerms: [
      "science source guide",
      "peer reviewed fitness source guide",
      "science sources",
      "weekly science drop",
      "study limits explained",
    ],
  },
  {
    title: "Peer-reviewed study library",
    href: "/science/studies",
    category: "Science",
    description:
      "Search every PubMed-backed Geebs Science study, with plain-English takeaways, honest limits, and original source links.",
    type: "guide",
    searchTerms: [
      "study library",
      "PubMed studies",
      "peer reviewed study index",
      "science source index",
      "original study sources",
      "honest study limits",
      "PMID",
    ],
  },
  ...scienceDigestEntries.map((entry): ResourceItem => ({
    title: entry.title,
    href: `/science/weekly-digest/${entry.id}`,
    category: "Science",
    description: entry.summary,
    type: "guide",
    searchTerms: [
      entry.eyebrow,
      ...entry.keywords,
      "weekly science drop",
      "reviewed science drop",
      "fitness study breakdown",
      "honest study limit",
    ],
  })),
  ...scienceLeadMagnets.map((page): ResourceItem => ({
    title: page.title.replace(" | Geebs Science", ""),
    href: `/science/${page.slug}`,
    category: "Science",
    description: page.metaDescription,
    type: "guide",
    searchTerms: [
      page.topic.toLowerCase(),
      ...page.searchIntent,
      ...page.targetQueries,
      "weekly science drop",
      "peer reviewed studies",
      "pubmed",
      "evidence based fitness",
    ],
  })),
  ...scienceQuestionPages.map((page): ResourceItem => ({
    title: page.h1,
    href: `/science/questions/${page.slug}`,
    category: "Science",
    description: page.metaDescription,
    type: "guide",
    searchTerms: [
      ...page.targetQueries,
      "question",
      "weekly science drop",
      "peer reviewed studies",
      "pubmed",
      "evidence based fitness",
    ],
  })),
  ...backfilledScienceStudies.map((study): ResourceItem => ({
    title: study.shortTitle,
    href: `/science/studies/${study.id}`,
    category: "Science",
    description: `${study.evidenceType} from ${study.journal}: ${study.coachTakeaway}`,
    type: "guide",
    searchTerms: [
      study.title,
      study.shortTitle,
      study.authors,
      study.journal,
      study.year,
      ...(study.pubmedId ? [`PMID ${study.pubmedId}`, study.pubmedId] : []),
      ...(study.doi ? [`DOI ${study.doi}`, study.doi] : []),
      study.topic.toLowerCase(),
      study.evidenceType,
      ...study.keywords,
      ...study.contentAngles,
      "study page",
      "PubMed study",
      "peer reviewed study",
    ],
  })),
  {
    title: "Online fitness coaching cost FAQ",
    href: "/resources/online-fitness-coaching-cost-faq",
    category: "Coaching",
    description:
      "A practical breakdown of online fitness coaching cost ranges, what changes the price, and when a lower-cost option makes more sense.",
    type: "guide",
    searchTerms: [
      "online fitness coaching cost",
      "online coach cost",
      "fitness coach price",
      "fitness coaching pricing",
      "personal trainer cost",
      "coaching cost",
      "cost",
      "pricing",
      "budget",
      "worth it",
    ],
  },
  {
    title: "Online fitness coaching fit check",
    href: "/resources/online-fitness-coaching-fit-check",
    category: "Coaching",
    description:
      "Decide whether you need 1:1 coaching, a self-guided program, free tools, or a consistency reset before you apply.",
    type: "guide",
    searchTerms: [
      "online fitness coaching fit",
      "do I need a fitness coach",
      "should I hire an online fitness coach",
      "fitness coach application",
      "1:1 coaching",
      "coach vs program",
      "coach vs ChatGPT",
      "human accountability",
      "GAINS",
    ],
  },
  {
    title: "How to calculate macros for body recomposition",
    href: "/resources/how-to-calculate-macros-for-body-recomposition",
    category: "Nutrition",
    description:
      "A step-by-step macro setup for recomp: maintenance calories, protein, small deficit, fats, carbs, and weekly adjustments.",
    type: "guide",
    searchTerms: [
      "macros",
      "body recomposition",
      "body recomp",
      "macro calculator",
      "protein",
      "calories",
      "MACROS",
    ],
  },
  {
    title: "Simple protein guide",
    href: "/resources/protein-guide",
    category: "Nutrition",
    description:
      "A quick protein target and execution guide for men trying to lose fat without flattening out.",
    type: "guide",
    searchTerms: ["protein", "nutrition", "fat loss", "macros", "PROTEIN"],
  },
  {
    title: "Busy guy training plan",
    href: "/resources/busy-guy-training-plan",
    category: "Busy professionals",
    description:
      "A low-friction training structure for men working long hours who need a plan that survives real weeks.",
    type: "guide",
    searchTerms: ["busy", "training", "workout plan", "long hours", "BUSY"],
  },
  {
    title: "Bad week adjustment loop",
    href: "/resources/bad-week-adjustment-loop",
    category: "Consistency",
    description:
      "A practical reset framework for missed workouts, meals out, travel, low sleep, and busy weeks.",
    type: "guide",
    searchTerms: [
      "bad week",
      "missed workout",
      "consistency",
      "busy week",
      "fitness reset",
      "falling off",
      "accountability",
      "STICK",
      "BUSY",
    ],
  },
  {
    title: "Diet soda and cutting guide",
    href: "/resources/diet-soda-cutting",
    category: "Fat loss",
    description:
      "A practical guide to diet soda, calorie deficits, cravings, and consistency while cutting.",
    type: "guide",
    searchTerms: ["diet soda", "deficit", "cutting", "fat loss", "DEFICIT"],
  },
  {
    title: "How to get the most out of online coaching",
    href: "/blog/how-to-get-the-most-from-online-coaching",
    category: "Coaching",
    description:
      "The habits, communication patterns, and mindset shifts that separate men who get results from online coaching from men who waste the investment.",
    type: "guide",
    searchTerms: [
      "online coaching",
      "get the most from coaching",
      "coaching results",
      "how to use a fitness coach",
      "coaching check-in",
      "online fitness coach tips",
      "coaching communication",
      "GETMOST",
    ],
  },
  {
    title: "What is The Geebs Method?",
    href: "/geebs-method",
    category: "Coaching",
    description:
      "Kris Oddo's system for hard training, nutrition support, recovery habits, and accountability when weeks are not perfect.",
    type: "guide",
    searchTerms: [
      "geebs method",
      "method",
      "coaching",
      "accountability",
      "missed workout",
      "bad week",
    ],
  },
  {
    title: "Body recomposition for men",
    href: "/blog/body-recomposition-for-men",
    category: "Body recomposition",
    description:
      "How to lose fat and build muscle without bouncing between crash cuts and dirty bulks.",
    type: "guide",
    searchTerms: ["fat loss", "muscle gain", "skinny fat", "recomp", "men"],
  },
  {
    title: "Body recomposition for women",
    href: "/blog/body-recomposition-for-women",
    category: "Body recomposition",
    description:
      "How women can build muscle and lose fat without letting the scale be the only scorecard.",
    type: "guide",
    searchTerms: ["fat loss", "muscle gain", "strength training", "recomp", "women"],
  },
  {
    title: "Strength training for women beginners",
    href: "/blog/strength-training-for-women-beginners",
    category: "Training",
    description:
      "A simple beginner lifting guide for women: repeatable sessions, hard sets, and progression.",
    type: "guide",
    searchTerms: ["women", "beginner", "strength training", "lifting", "progressive overload"],
  },
  {
    title: "How to fix skinny fat",
    href: "/blog/how-to-fix-skinny-fat",
    category: "Body recomposition",
    description:
      "The training and nutrition shift that fixes the soft-and-small middle ground.",
    type: "guide",
    searchTerms: ["skinny fat", "muscle gain", "fat loss", "recomp"],
  },
  {
    title: "How to lose the dad bod",
    href: "/blog/how-to-lose-the-dad-bod",
    category: "Fat loss",
    description:
      "A practical plan for men who want to stop treating the dad bod like destiny.",
    type: "guide",
    searchTerms: ["fat loss", "belly fat", "weight loss", "dad bod"],
  },
  {
    title: "How to lose belly fat in your 30s",
    href: "/blog/how-to-lose-belly-fat-men-30s",
    category: "Fat loss",
    description:
      "What actually changes after 30 and what still comes down to execution.",
    type: "guide",
    searchTerms: ["belly fat", "men 30s", "fat loss", "weight loss"],
  },
  {
    title: "Why you can't stay consistent with the gym",
    href: "/blog/why-you-cant-stay-consistent-with-the-gym",
    category: "Consistency",
    description:
      "Why willpower is the wrong fix and what makes training hold under real life.",
    type: "guide",
    searchTerms: ["motivation", "discipline", "habits", "accountability"],
  },
  {
    title: "How fast do you lose muscle when you stop training?",
    href: "/blog/how-fast-do-you-lose-muscle-detraining",
    category: "Restarting",
    description:
      "The real detraining timeline: when muscle loss actually starts, what muscle memory means, and why the comeback is faster than the original build.",
    type: "guide",
    searchTerms: [
      "detraining",
      "muscle loss",
      "stop training",
      "break from gym",
      "muscle memory",
      "BREAK",
      "restart",
    ],
  },
  {
    title: "How to build muscle in your 30s",
    href: "/blog/how-to-build-muscle-in-your-30s",
    category: "Muscle gain",
    description:
      "The training, protein, and recovery priorities that matter most after 30.",
    type: "guide",
    searchTerms: ["muscle gain", "hypertrophy", "protein", "men 30s"],
  },
  {
    title: "How to build muscle for skinny guys",
    href: "/blog/how-to-build-muscle-for-skinny-guys",
    category: "Muscle gain",
    description:
      "A muscle-building guide for men who feel like they have always been the skinny one.",
    type: "guide",
    searchTerms: ["muscle gain", "skinny", "bulk", "protein"],
  },
  {
    title: "Progressive overload, explained",
    href: "/blog/progressive-overload-explained",
    category: "Training",
    description:
      "How to progress lifts without turning every session into a max-out test.",
    type: "guide",
    searchTerms: ["training", "strength", "lifting", "progression"],
  },
  {
    title: "Are you training hard enough?",
    href: "/blog/are-you-training-hard-enough",
    category: "Training",
    description:
      "How to tell the difference between productive effort and junk volume.",
    type: "guide",
    searchTerms: ["training", "effort", "volume", "strength"],
  },
  {
    title: "How much protein to lose fat",
    href: "/blog/how-much-protein-to-lose-fat",
    category: "Nutrition",
    description:
      "Kris's practical protein target for fat loss and body recomposition phases.",
    type: "guide",
    searchTerms: ["protein", "nutrition", "fat loss", "macros"],
  },
  {
    title: "Gym anxiety for men",
    href: "/blog/gym-anxiety-for-men",
    category: "Mindset",
    description:
      "How to get started when the gym feels like everyone is watching.",
    type: "guide",
    searchTerms: ["gym anxiety", "beginner", "confidence", "mindset"],
  },
  {
    title: "How to build muscle at home",
    href: "/blog/how-to-build-muscle-at-home",
    category: "Training",
    description:
      "What works when you do not have a full commercial gym setup.",
    type: "guide",
    searchTerms: ["home workout", "training", "muscle gain", "equipment"],
  },
  {
    title: "Is online fitness coaching worth it?",
    href: "/blog/is-online-fitness-coaching-worth-it",
    category: "Coaching",
    description:
      "A straight answer on cost, fit, and who should not hire an online coach.",
    type: "guide",
    searchTerms: ["coaching", "cost", "online coach", "accountability"],
  },
  {
    title: "Workout plan for busy executives",
    href: "/blog/workout-plan-for-busy-executives",
    category: "Busy professionals",
    description:
      "How to train when calendar volatility is the default.",
    type: "guide",
    searchTerms: ["busy executives", "busy professionals", "workout plan"],
  },
  {
    title: "How to get in shape with a 60-hour work week",
    href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
    category: "Busy professionals",
    description:
      "A realistic plan for demanding weeks, late nights, and low bandwidth.",
    type: "guide",
    searchTerms: ["busy professionals", "work week", "consistency"],
  },
  {
    title: "Fitness plan for men who travel for work",
    href: "/blog/fitness-plan-for-men-who-travel-for-work",
    category: "Busy professionals",
    description:
      "How to keep training and food from falling apart every time you travel.",
    type: "guide",
    searchTerms: ["travel", "business travel", "busy professionals"],
  },
  {
    title: "How to lose belly fat with client dinners",
    href: "/blog/how-to-lose-belly-fat-with-client-dinners",
    category: "Busy professionals",
    description:
      "Fat loss for men whose calendar includes restaurants and business meals.",
    type: "guide",
    searchTerms: ["client dinners", "restaurants", "fat loss", "travel"],
  },
  {
    title: "Workout plan for software engineers",
    href: "/blog/workout-plan-for-software-engineers",
    category: "Desk work",
    description:
      "A simple training week for developers, engineers, and tech workers.",
    type: "guide",
    searchTerms: ["software engineers", "developers", "desk work", "training"],
  },
  {
    title: "Workout plan for programmers",
    href: "/blog/workout-plan-for-programmers",
    category: "Desk work",
    description:
      "A three-day lifting plan for programmers and developers who sit all day.",
    type: "guide",
    searchTerms: [
      "programmers",
      "developers",
      "coding",
      "desk work",
      "workout plan",
    ],
  },
  {
    title: "Best gym routine for software engineers",
    href: "/blog/best-gym-routine-for-software-engineers",
    category: "Desk work",
    description:
      "How to pair strength training with long blocks of focused work.",
    type: "guide",
    searchTerms: ["software engineers", "developers", "strength training"],
  },
  {
    title: "Best online fitness coaches for busy men (2026)",
    href: "/blog/best-online-fitness-coaches-for-busy-men",
    category: "Coaching",
    description:
      "An honest breakdown of online fitness coaches for busy men and men 25-40 in 2026 and how to pick.",
    type: "guide",
    searchTerms: [
      "best online fitness coach for busy men",
      "best online fitness coaches for men",
      "online coach",
      "coaching",
      "busy men",
      "best coaches",
      "find a coach",
    ],
  },
  {
    title: "How to stay fit working from home",
    href: "/blog/how-to-stay-fit-working-from-home",
    category: "Remote work",
    description:
      "Rules for steps, food, and boundaries when home is also the office.",
    type: "guide",
    searchTerms: ["remote work", "work from home", "steps", "nutrition"],
  },
  {
    title: "How to lose belly fat sitting all day",
    href: "/blog/how-to-lose-belly-fat-sitting-all-day",
    category: "Desk work",
    description:
      "The movement and nutrition levers that matter when your job is seated.",
    type: "guide",
    searchTerms: ["desk work", "belly fat", "sitting", "fat loss"],
  },
  {
    title: "Standing desk vs walking pad",
    href: "/blog/standing-desk-vs-walking-pad",
    category: "Desk work",
    description:
      "Which work-from-home tool actually moves the needle for fat loss.",
    type: "guide",
    searchTerms: ["walking pad", "standing desk", "remote work", "steps"],
  },
  {
    title: "Strength training for desk workers",
    href: "/blog/strength-training-for-desk-workers",
    category: "Desk work",
    description:
      "A strength approach for men who spend most of the day folded into a chair.",
    type: "guide",
    searchTerms: ["desk work", "strength training", "posture", "training"],
  },
  {
    title: "Morning routine for men 25-40",
    href: "/blog/morning-routine-for-men-25-40",
    category: "Habits",
    description:
      "A morning routine that supports training without becoming another full-time job.",
    type: "guide",
    searchTerms: ["morning routine", "habits", "sleep", "consistency"],
  },
  {
    title: "How long to see results working out",
    href: "/guides/how-long-to-see-results-working-out",
    category: "Training",
    description:
      "A realistic, week-by-week breakdown of what actually changes inside your body, and why the mirror is the last place to look.",
    type: "guide",
    searchTerms: ["results", "timeline", "gym results", "how long", "muscle gain", "men 30s"],
  },
  {
    title: "Body recomposition for beginners",
    href: "/guides/body-recomposition-for-beginners",
    category: "Body recomposition",
    description:
      "The straight guide for beginner recomp: why beginners are prime candidates, the 3-session template, realistic timelines, and when coaching speeds it up.",
    type: "guide",
    searchTerms: [
      "body recomposition for beginners",
      "beginner recomp",
      "build muscle lose fat beginner",
      "recomp beginner",
      "skinny fat beginner",
      "body recomposition guide",
    ],
  },
  {
    title: "Getting back in shape after a long break",
    href: "/guides/getting-back-in-shape-after-a-long-break",
    category: "Restarting",
    description:
      "Six questions answered from the research for anyone starting again after months or years off: muscle memory, how fast it comes back, and how not to fall off again.",
    type: "guide",
    searchTerms: [
      "getting back in shape after a long break",
      "restart fitness after break",
      "back to gym after years",
      "how to start working out again",
      "fitness comeback",
      "getting back in shape after 30",
      "muscle memory",
      "restart guide",
    ],
  },
  {
    title: "How much does an online fitness coach cost?",
    href: "/guides/how-much-does-an-online-fitness-coach-cost",
    category: "Coaching",
    description:
      "Honest 2026 online fitness coaching pricing: what changes the price, what to compare, and when 1:1 coaching is worth it.",
    type: "guide",
    searchTerms: [
      "how much does an online fitness coach cost",
      "online fitness coach cost",
      "fitness coach pricing",
      "how much is online coaching",
      "coach cost guide",
      "coaching worth it",
    ],
  },
  {
    title: "Online fitness coach vs nutritionist",
    href: "/guides/online-fitness-coach-vs-nutritionist",
    category: "Coaching",
    description:
      "A scope-of-practice comparison of a fitness coach versus a registered dietitian: when you need each, when you need both, and what Geebs covers.",
    type: "guide",
    searchTerms: [
      "online fitness coach vs nutritionist",
      "fitness coach vs dietitian",
      "coach or nutritionist",
      "registered dietitian vs coach",
      "nutrition coaching comparison",
      "rd vs cpt",
    ],
  },
  {
    title: "What does an online fitness coach do?",
    href: "/guides/what-does-an-online-fitness-coach-do",
    category: "Coaching",
    description:
      "A direct answer on what an online fitness coach actually does day-to-day, what is included, and what a good coach does that an app does not.",
    type: "guide",
    searchTerms: [
      "what does an online fitness coach do",
      "what is online fitness coaching",
      "what does a fitness coach do",
      "online coach explained",
      "coach vs app",
      "what is included in coaching",
    ],
  },
  {
    title: "Online fitness coach in Denver",
    href: "/blog/online-fitness-coach-denver",
    category: "Busy professionals",
    description:
      "How Denver clients can work with Kris through online coaching, with limited local in-person options.",
    type: "guide",
    searchTerms: [
      "denver",
      "online fitness coach denver",
      "personal training denver",
      "body recomposition coach denver",
    ],
  },
  {
    title: "Cut vs recomp vs bulk",
    href: "/blog/cut-vs-recomp-vs-bulk",
    category: "Body recomposition",
    description:
      "Cut, recomp, or bulk: how to choose the right calorie and training phase based on body fat, training history, and consistency.",
    type: "guide",
    searchTerms: ["cut", "recomp", "bulk", "body recomposition", "macros"],
  },
  {
    title: "Fitness coach for busy professionals",
    href: "/blog/fitness-coach-for-busy-professionals",
    category: "Busy professionals",
    description:
      "How busy professionals can use 1:1 online coaching to make training, nutrition, and accountability fit demanding work weeks.",
    type: "guide",
    searchTerms: ["busy professionals", "fitness coach", "online coaching"],
  },
  {
    title: "Body recomposition before and after for men",
    href: "/blog/body-recomposition-before-and-after-men",
    category: "Body recomposition",
    description:
      "What body recomposition before-and-after changes usually mean for men: waist, strength, scale weight, photos, and consistency.",
    type: "guide",
    searchTerms: ["body recomposition", "before and after", "men", "fat loss"],
  },
  {
    title: "Online fitness coach vs personal trainer",
    href: "/blog/online-fitness-coach-vs-personal-trainer",
    category: "Coaching",
    description:
      "Online fitness coach vs personal trainer: how to choose based on accountability, form feedback, nutrition, schedule, and cost.",
    type: "guide",
    searchTerms: ["online fitness coach", "personal trainer", "comparison"],
  },
  {
    title: "Body recomposition coach in Denver",
    href: "/blog/body-recomposition-coach-denver",
    category: "Busy professionals",
    description:
      "Body recomposition coaching for Denver clients who want online 1:1 support, nutrition accountability, and limited local in-person options.",
    type: "guide",
    searchTerms: ["denver", "body recomposition coach", "online fitness coach"],
  },
  {
    title: "Body recomposition macros",
    href: "/blog/body-recomposition-macros",
    category: "Body recomposition",
    description:
      "Body recomposition macros for men: how to set protein, calories, carbs, and fats when the goal is losing fat and building muscle.",
    type: "guide",
    searchTerms: ["body recomposition macros", "macros", "protein", "fat loss"],
  },
  {
    title: "Online fitness coach for men over 30",
    href: "/blog/online-fitness-coach-for-men-over-30",
    category: "Online coaching",
    description:
      "Online fitness coaching for men over 30 who want to lose fat, build muscle, regain consistency, and stop restarting.",
    type: "guide",
    searchTerms: ["online fitness coach for men over 30", "men over 30", "fat loss", "muscle"],
  },
  {
    title: "How to stay fit working long hours",
    href: "/blog/how-to-stay-fit-working-long-hours",
    category: "Busy professionals",
    description:
      "How to stay fit while working long hours: realistic training, nutrition, steps, and recovery for professionals with demanding schedules.",
    type: "guide",
    searchTerms: ["stay fit working long hours", "busy professionals", "workout plan"],
  },
  {
    title: "Protein intake for weight loss and muscle gain",
    href: "/blog/protein-intake-for-weight-loss-and-muscle-gain",
    category: "Nutrition",
    description:
      "How to think about protein intake when you want weight loss and muscle gain at the same time, without turning nutrition into a second job.",
    type: "guide",
    searchTerms: ["protein intake", "weight loss", "muscle gain", "body recomposition"],
  },
  {
    title: "3-day workout plan for busy men",
    href: "/blog/3-day-workout-plan-for-busy-men",
    category: "Busy professionals",
    description:
      "A practical 3-day workout plan for busy men who want to build muscle, lose fat, and stop missing sessions when the week gets crowded.",
    type: "guide",
    searchTerms: ["3 day workout plan", "busy men", "workout plan", "fat loss"],
  },
  {
    title: "Nutrition coach for busy professionals",
    href: "/blog/nutrition-coach-for-busy-professionals",
    category: "Nutrition",
    description:
      "Nutrition coaching for busy professionals who need fat loss, protein, restaurant strategy, and accountability without a brittle meal plan.",
    type: "guide",
    searchTerms: ["nutrition coach for busy professionals", "fat loss nutrition", "protein"],
  },
  {
    title: "Fitness plan for founders",
    href: "/blog/fitness-plan-for-founders",
    category: "Founders",
    description:
      "A practical fitness plan for founders who need strength, fat loss, and energy without pretending the calendar is predictable.",
    type: "guide",
    searchTerms: ["fitness plan for founders", "founder fitness", "busy entrepreneurs"],
  },
  {
    title: "Fitness coach for software engineers",
    href: "/blog/fitness-coach-for-software-engineers",
    category: "Software engineers",
    description:
      "Fitness coaching for software engineers who sit for long hours, miss training windows, and need a plan that survives deep work and deadlines.",
    type: "guide",
    searchTerms: ["fitness coach for software engineers", "software engineer fitness", "programmer workout"],
  },
  {
    title: "Sleep and fat loss for busy professionals",
    href: "/blog/sleep-and-fat-loss-for-busy-professionals",
    category: "Lifestyle",
    description:
      "How sleep affects fat loss for busy professionals through hunger, training quality, stress, recovery, and weekly consistency.",
    type: "guide",
    searchTerms: ["sleep and fat loss", "busy professionals", "recovery", "stress"],
  },
  {
    title: "Calorie deficit without counting everything",
    href: "/blog/calorie-deficit-without-counting-everything",
    category: "Nutrition",
    description:
      "How to create a calorie deficit without tracking every bite by using protein targets, portions, meal defaults, and weekly trend reviews.",
    type: "guide",
    searchTerms: ["calorie deficit without counting", "fat loss", "protein", "portion control"],
  },
  {
    title: "Fitness accountability coach",
    href: "/blog/fitness-accountability-coach",
    category: "Online coaching",
    description:
      "What a fitness accountability coach does for people who know what to do but keep losing consistency with training and nutrition.",
    type: "guide",
    searchTerms: ["fitness accountability coach", "accountability", "consistency", "online coach"],
  },
  {
    title: "Beginner strength training for men",
    href: "/blog/beginner-strength-training-for-men",
    category: "Strength training",
    description:
      "A beginner strength-training guide for men who want to build muscle, lose fat, gain confidence, and stop guessing in the gym.",
    type: "guide",
    searchTerms: ["beginner strength training for men", "beginner lifting", "build muscle", "confidence"],
  },
  {
    title: "How to stay consistent with your diet on weekends",
    href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
    category: "Nutrition",
    description:
      "A practical weekend diet consistency guide for people who eat well Monday through Thursday but lose progress Friday through Sunday.",
    type: "guide",
    searchTerms: ["weekend diet", "diet consistency", "fat loss", "weekend eating"],
  },
  {
    title: "How to build confidence in the gym",
    href: "/blog/how-to-build-confidence-in-the-gym",
    category: "Mindset",
    description:
      "How to build gym confidence with a simple plan, exercise tracking, repeatable workouts, and less guessing.",
    type: "guide",
    searchTerms: ["gym confidence", "build confidence in the gym", "gym anxiety", "beginner workout"],
  },
  {
    title: "Diet soda and fat loss",
    href: "/blog/diet-soda-and-fat-loss",
    category: "Nutrition",
    description:
      "A practical guide to diet soda and fat loss: calories, cravings, protein, consistency, and what to track before blaming one drink.",
    type: "guide",
    searchTerms: ["diet soda", "fat loss", "calorie deficit", "cravings"],
  },
  {
    title: "Weight loss for men who hate dieting",
    href: "/blog/weight-loss-for-men-who-hate-dieting",
    category: "Fat loss",
    description:
      "Weight-loss guidance for men who hate dieting: simple protein, calorie awareness, training, steps, and accountability without extremes.",
    type: "guide",
    searchTerms: ["weight loss for men", "hate dieting", "fat loss", "calorie deficit"],
  },
  {
    title: "Creatine for men over 30",
    href: "/blog/creatine-for-men-over-30",
    category: "Nutrition",
    description:
      "What creatine monohydrate does, why it matters more in your 30s, and the simple 5g/day protocol, with no stack required.",
    type: "guide",
    searchTerms: [
      "creatine",
      "creatine for men over 30",
      "should I take creatine",
      "creatine monohydrate",
      "supplements",
      "nutrition",
      "men 30s",
      "muscle gain",
      "CREATINE",
    ],
  },
  {
    title: "Calorie deficit but not losing weight? (plateau guide)",
    href: "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
    category: "Nutrition",
    description:
      "Why the scale stalls in a calorie deficit: under-logged food, water and glycogen, a deficit that shrank, less daily movement, or a recomp, plus what breaks a real plateau.",
    type: "guide",
    searchTerms: [
      "fat loss plateau",
      "weight loss plateau",
      "fat loss stalled",
      "plateau men",
      "why did I stop losing weight",
      "adaptive thermogenesis",
      "NEAT",
      "diet break",
      "fat loss",
      "men 30s",
      "PLATEAU",
    ],
  },
  {
    title: "Alcohol and fat loss for men",
    href: "/blog/alcohol-fitness-men",
    category: "Nutrition",
    description:
      "How alcohol affects fat oxidation, sleep, and muscle for men 30+, and the practical protocol for keeping a social life without wrecking your progress.",
    type: "guide",
    searchTerms: [
      "alcohol and fat loss",
      "alcohol fitness men",
      "can you drink and lose weight",
      "alcohol and muscle",
      "drinking and dieting",
      "alcohol calories",
      "social life fat loss",
      "alcohol sleep recovery",
      "fat loss men 30s",
      "DRINKS",
    ],
  },
  {
    title: "How to lose fat without losing muscle",
    href: "/blog/how-to-lose-fat-without-losing-muscle-men",
    category: "Fat loss",
    description:
      "The practical cutting protocol for men: deficit size, protein floor, and training minimum to lose fat without losing the muscle you built.",
    type: "guide",
    searchTerms: [
      "how to lose fat without losing muscle",
      "cutting without losing muscle",
      "fat loss muscle retention",
      "calorie deficit men",
      "cutting protocol men",
      "lose weight without losing muscle",
      "fat loss men 30s",
      "protein during cut",
      "CUT",
    ],
  },
  {
    title: "How to hire an online fitness coach",
    href: "/blog/how-to-hire-an-online-fitness-coach",
    category: "Coaching",
    description:
      "The 8-point checklist for evaluating any online fitness coach before you pay: credentials, programming, check-in cadence, pricing, and the red flags that kill progress.",
    type: "guide",
    searchTerms: [
      "how to hire an online fitness coach",
      "find an online fitness coach",
      "what to look for in an online coach",
      "online coaching credentials",
      "online fitness coach checklist",
      "hire a personal trainer online",
      "online coaching pricing",
      "best online fitness coach for men",
      "coaching red flags",
      "NASM online coach",
    ],
  },
  {
    title: "Do you need a coach if you already train?",
    href: "/blog/do-you-need-a-coach-if-you-already-train",
    category: "Coaching",
    description:
      "If you already train consistently, do you actually need an online coach? When coaching adds real value (plateaus, recomposition walls), when you can keep doing it yourself, and how to tell the difference.",
    type: "guide",
    searchTerms: [
      "do you need a coach if you already train",
      "do i need a personal trainer if i already go to the gym",
      "is a fitness coach worth it if i already lift",
      "do i need a coach or can i do it myself",
      "online coach for experienced lifters",
      "coach for training plateau",
      "do experienced lifters need a coach",
    ],
  },
  {
    title: "What to eat before and after a workout",
    href: "/blog/pre-post-workout-nutrition-men",
    category: "Nutrition",
    description:
      "Five simple rules for pre and post-workout nutrition for men: what to eat, when to eat it, and why the anabolic window is wider than you have been told.",
    type: "guide",
    searchTerms: [
      "pre workout nutrition",
      "post workout nutrition",
      "what to eat before a workout",
      "what to eat after a workout",
      "workout nutrition men",
      "peri workout nutrition",
      "anabolic window",
      "protein timing",
      "pre workout meal",
      "post workout meal",
      "fasted training",
      "nutrition timing",
      "FUEL",
    ],
  },
  {
    title: "What changes about training after 35",
    href: "/blog/training-after-35-men",
    category: "Training",
    description:
      "The honest breakdown of what actually shifts after 35: testosterone drift, recovery demands and muscle fiber changes, plus the adjustments that keep results coming.",
    type: "guide",
    searchTerms: [
      "training after 35",
      "fitness after 35",
      "working out after 35",
      "men over 35 training",
      "testosterone after 35",
      "muscle building after 35",
      "recovery after 35",
      "men 35 fitness",
      "body changes at 35",
      "AFTER35",
    ],
  },
  {
    title: "Intermittent fasting for men over 30",
    href: "/blog/intermittent-fasting-men-over-30",
    category: "Fat loss",
    description:
      "The honest answer on whether intermittent fasting works for fat loss in men over 30: what the research says, where it fails, and the protein caveat most guides skip.",
    type: "guide",
    searchTerms: [
      "intermittent fasting men over 30",
      "intermittent fasting fat loss men",
      "does intermittent fasting work",
      "16:8 fasting men",
      "time restricted feeding",
      "intermittent fasting muscle loss",
      "IF for men",
      "fasting fat loss",
      "intermittent fasting 30s",
      "FASTING",
    ],
  },
  {
    title: "How much cardio for fat loss",
    href: "/blog/how-much-cardio-for-fat-loss-men",
    category: "Fat loss",
    description:
      "The honest answer on how much cardio men who lift actually need for fat loss: LISS vs HIIT, the concurrent training interference problem, and when more cardio starts working against you.",
    type: "guide",
    searchTerms: [
      "how much cardio to lose fat",
      "cardio for fat loss men",
      "do I need cardio to lose weight",
      "HIIT vs LISS fat loss",
      "best cardio for fat loss",
      "cardio without losing muscle",
      "how much cardio per week",
      "cardio and lifting",
      "Zone 2 cardio fat loss",
      "CARDIO",
    ],
  },
  {
    title: "How to find an online fitness coach for men",
    href: "/blog/how-to-find-an-online-fitness-coach-for-men",
    category: "Coaching",
    description:
      "How to find a real online fitness coach as a man 25–40: what to look for, where to search, red flags, and how to vet a coach before you commit.",
    type: "guide",
    searchTerms: [
      "how to find an online fitness coach",
      "how to find an online personal trainer",
      "find a fitness coach for men",
      "what to look for in an online coach",
      "how to hire a fitness coach",
      "online personal trainer for men",
      "FIND",
    ],
  },
  {
    title: "Questions to ask an online fitness coach before you sign up",
    href: "/blog/questions-to-ask-an-online-fitness-coach",
    category: "Coaching",
    description:
      "The 7 questions every man should ask before committing to an online coach. Covers intake, check-ins, nutrition, communication, and red-flag answers to walk away from.",
    type: "guide",
    searchTerms: [
      "questions to ask an online fitness coach",
      "what to ask an online personal trainer",
      "how to interview an online fitness coach",
      "online coach red flags",
      "vetting an online fitness coach",
      "before signing up with a coach",
      "ASK",
    ],
  },
];

const rawResourceItems: ResourceItem[] = [
  ...freeTools,
  ...guides,
  {
    title: "High-Protein Grocery Shopping Guides",
    href: "/resources/grocery-shopping-guides",
    category: "Nutrition",
    description:
      "Store-by-store grocery guides: what lean beef, chicken, produce, and staples to buy at Costco, Walmart, Publix, BJ's, and more.",
    type: "guide",
    searchTerms: [
      "grocery shopping guides",
      "grocery store protein",
      "high protein grocery list",
      "what to buy at the grocery store",
      "costco protein",
      "walmart protein",
      "publix protein",
      "bjs protein",
    ],
  },
  ...RETAILER_SHOPPING_GUIDES.map((g) => ({
    title: `${g.retailerName} High-Protein Grocery Guide`,
    href: `/resources/${g.slug}-high-protein-grocery-guide`,
    category: "Nutrition",
    description: g.tagline,
    type: "guide" as const,
    searchTerms: [
      g.retailerName.toLowerCase(),
      `${g.slug} grocery guide`,
      `${g.slug} protein`,
      "grocery guide",
      "grocery list",
      "protein shopping list",
    ],
  })),
];
const registeredResourceItems = getRegisteredPages().map(toResourceItem);

const seenResourceHrefs = new Set<string>();
const mergedResourceItems: ResourceItem[] = [];

for (const item of rawResourceItems) {
  if (!seenResourceHrefs.has(item.href)) {
    seenResourceHrefs.add(item.href);
    mergedResourceItems.push(item);
  }
}

for (const item of registeredResourceItems) {
  if (!seenResourceHrefs.has(item.href)) {
    seenResourceHrefs.add(item.href);
    mergedResourceItems.push(item);
  }
}

export const resourceItems: ResourceItem[] = mergedResourceItems;


export const resourceTopics = [
  "All",
  "Free tools",
  "Fat loss",
  "Muscle gain",
  "Training",
  "Science",
  "Nutrition",
  "Desk work",
  "Busy professionals",
] as const;

export type ResourceTopic = (typeof resourceTopics)[number];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function filterResourceItems(
  items: ResourceItem[],
  query: string,
  topic: ResourceTopic,
) {
  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    const matchesTopic =
      topic === "All" ||
      (topic === "Free tools"
        ? item.type === "tool"
        : item.category === topic || item.searchTerms.includes(normalize(topic)));

    if (!matchesTopic) return false;
    if (!terms.length) return true;

    const searchable = normalize(
      [
        item.title,
        item.category,
        item.description,
        item.type,
        ...item.searchTerms,
      ].join(" "),
    );

    return terms.every((term) => searchable.includes(term));
  });
}

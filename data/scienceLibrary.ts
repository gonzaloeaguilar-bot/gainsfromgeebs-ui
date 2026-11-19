import { socialScienceStudies } from "@/data/socialScienceStudies";

export type ScienceTopic =
  | "Anti-aging"
  | "Cardio"
  | "Cravings"
  | "Fitness"
  | "Nutrition"
  | "Peptides"
  | "Sleep"
  | "Supplements";

export type ScienceStudy = {
  id: string;
  title: string;
  shortTitle: string;
  topic: ScienceTopic;
  evidenceType: string;
  year: string;
  journal: string;
  authors: string;
  pubmedId?: string;
  doi?: string;
  sourceUrl: string;
  doiUrl?: string;
  origin:
    | "published_ig_backfill"
    | "site_backfill"
    | "pubmed_monitor_seed"
    | "science_inbox_promoted";
  coachTakeaway: string;
  claimGuardrail: string;
  contentAngles: string[];
  relatedHrefs: string[];
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  quickAnswer?: string;
  dateModified?: string;
  faqs?: { question: string; answer: string }[];
};

export type ScienceScanQuery = {
  id: string;
  cadence: "daily" | "weekly";
  topic: ScienceTopic;
  label: string;
  query: string;
};

const evidenceFilter =
  '("randomized controlled trial"[Publication Type] OR "systematic review"[Publication Type] OR "meta-analysis"[Publication Type])';

const recentPublicationFilter =
  '("2024/01/01"[Date - Publication] : "3000"[Date - Publication])';
const coachingRelevanceExclusion =
  'NOT (cancer[Title/Abstract] OR carcinoma[Title/Abstract] OR tumor[Title/Abstract] OR tumour[Title/Abstract] OR neoplasm[Title/Abstract] OR myeloma[Title/Abstract] OR chemotherapy[Title/Abstract] OR postoperative[Title/Abstract] OR surgery[Title/Abstract] OR surgical[Title/Abstract] OR trauma[Title/Abstract])';

export const scienceScanQueries: ScienceScanQuery[] = [
  {
    id: "daily-sleep-recovery",
    cadence: "daily",
    topic: "Sleep",
    label: "Sleep, screens, caffeine, recovery",
    query: `((sleep[Title/Abstract] OR caffeine[Title/Abstract] OR smartphone[Title/Abstract] OR "screen time"[Title/Abstract] OR circadian[Title/Abstract]) AND (appetite[Title/Abstract] OR recovery[Title/Abstract] OR "fat loss"[Title/Abstract] OR "sleep quality"[Title/Abstract] OR exercise[Title/Abstract] OR performance[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "daily-nutrition-body-composition",
    cadence: "daily",
    topic: "Nutrition",
    label: "Protein, satiety, body composition",
    query: `((protein[Title/Abstract] OR satiety[Title/Abstract] OR "ultra-processed"[Title/Abstract] OR "time restricted feeding"[Title/Abstract] OR "essential amino acid"[Title/Abstract]) AND ("weight loss"[Title/Abstract] OR "muscle mass"[Title/Abstract] OR appetite[Title/Abstract] OR "body composition"[Title/Abstract] OR strength[Title/Abstract] OR fitness[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "daily-training-cardio-longevity",
    cadence: "daily",
    topic: "Cardio",
    label: "Training, cardio, longevity",
    query: `(("resistance training"[Title/Abstract] OR "aerobic exercise"[Title/Abstract] OR exercise[Title/Abstract] OR "physical activity"[Title/Abstract]) AND (longevity[Title/Abstract] OR mortality[Title/Abstract] OR "cardiorespiratory fitness"[Title/Abstract] OR "body composition"[Title/Abstract] OR performance[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-anti-aging-fitness",
    cadence: "weekly",
    topic: "Anti-aging",
    label: "Anti-aging, biological age, fitness span",
    query: `(("biological age"[Title/Abstract] OR aging[Title/Abstract] OR "healthy aging"[Title/Abstract] OR longevity[Title/Abstract]) AND ("resistance training"[Title/Abstract] OR "aerobic exercise"[Title/Abstract] OR protein[Title/Abstract] OR sleep[Title/Abstract] OR fitness[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-community-questions",
    cadence: "weekly",
    topic: "Fitness",
    label: "Fitness habits, consistency, and behavior change",
    query: `((fitness[Title/Abstract] OR "strength training"[Title/Abstract] OR "body recomposition"[Title/Abstract] OR "fat loss"[Title/Abstract] OR exercise[Title/Abstract]) AND (adherence[Title/Abstract] OR supervision[Title/Abstract] OR "behavior change"[Title/Abstract] OR accountability[Title/Abstract] OR coaching[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-resistance-training-programming",
    cadence: "weekly",
    topic: "Fitness",
    label: "Resistance training, hypertrophy, strength programming",
    query: `(("resistance training"[Title/Abstract] OR hypertrophy[Title/Abstract] OR "muscle growth"[Title/Abstract] OR strength[Title/Abstract] OR "training volume"[Title/Abstract]) AND (sets[Title/Abstract] OR frequency[Title/Abstract] OR load[Title/Abstract] OR "advanced training"[Title/Abstract] OR "dose response"[Title/Abstract] OR programming[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-peptides-body-composition",
    cadence: "weekly",
    topic: "Peptides",
    label: "Peptides, GLP-1s, lean mass, recovery",
    query: `((semaglutide[Title/Abstract] OR tirzepatide[Title/Abstract] OR "GLP-1"[Title/Abstract] OR collagen[Title/Abstract] OR peptide[Title/Abstract]) AND ("lean mass"[Title/Abstract] OR "muscle mass"[Title/Abstract] OR "body composition"[Title/Abstract] OR "fat loss"[Title/Abstract] OR recovery[Title/Abstract] OR strength[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-glp1-muscle-preservation",
    cadence: "weekly",
    topic: "Peptides",
    label: "GLP-1 nutrition, protein, resistance training, lean mass",
    query: `(("GLP-1"[Title/Abstract] OR semaglutide[Title/Abstract] OR tirzepatide[Title/Abstract] OR incretin[Title/Abstract]) AND ("lean mass"[Title/Abstract] OR "fat-free mass"[Title/Abstract] OR "muscle mass"[Title/Abstract] OR protein[Title/Abstract] OR "resistance exercise"[Title/Abstract] OR nutrition[Title/Abstract]) AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-satiety-food-environment",
    cadence: "weekly",
    topic: "Nutrition",
    label: "Satiety, fiber, eating speed, ultra-processed foods",
    query: `((satiety[Title/Abstract] OR fiber[Title/Abstract] OR "eating rate"[Title/Abstract] OR "ultra-processed"[Title/Abstract] OR "food environment"[Title/Abstract]) AND ("energy intake"[Title/Abstract] OR appetite[Title/Abstract] OR "weight loss"[Title/Abstract] OR "body weight"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-creatine-aging-cognition",
    cadence: "weekly",
    topic: "Anti-aging",
    label: "Creatine, aging, cognition, strength",
    query: `((creatine[Title/Abstract] OR "creatine supplementation"[Title/Abstract]) AND (aging[Title/Abstract] OR "older adults"[Title/Abstract] OR cognition[Title/Abstract] OR strength[Title/Abstract] OR "muscle mass"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-supplements-training-recovery",
    cadence: "weekly",
    topic: "Supplements",
    label: "Omega-3, fish oil, training, and recovery",
    query: `(("omega-3"[Title/Abstract] OR "fish oil"[Title/Abstract] OR EPA[Title/Abstract] OR DHA[Title/Abstract]) AND (exercise[Title/Abstract] OR training[Title/Abstract] OR recovery[Title/Abstract] OR strength[Title/Abstract] OR "muscle protein synthesis"[Title/Abstract] OR "body composition"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-cardiorespiratory-fitness-aging",
    cadence: "weekly",
    topic: "Cardio",
    label: "Cardiorespiratory fitness, biological age, mortality",
    query: `(("cardiorespiratory fitness"[Title/Abstract] OR "VO2"[Title/Abstract] OR "biological age"[Title/Abstract] OR "DNA methylation"[Title/Abstract]) AND (mortality[Title/Abstract] OR aging[Title/Abstract] OR longevity[Title/Abstract] OR exercise[Title/Abstract] OR "physical activity"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-diet-muscle-retention",
    cadence: "weekly",
    topic: "Fitness",
    label: "Dieting, lifting, protein, and muscle retention",
    query: `(("dietary weight loss"[Title/Abstract] OR "energy restriction"[Title/Abstract] OR dieting[Title/Abstract] OR "weight loss"[Title/Abstract]) AND ("resistance exercise"[Title/Abstract] OR "resistance training"[Title/Abstract] OR protein[Title/Abstract] OR "fat-free mass"[Title/Abstract] OR "lean mass"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-glp1-nutrition-risk",
    cadence: "weekly",
    topic: "Peptides",
    label: "GLP-1 nutrition risk, lean mass, and monitoring",
    query: `(("GLP-1"[Title/Abstract] OR semaglutide[Title/Abstract] OR tirzepatide[Title/Abstract] OR incretin[Title/Abstract]) AND (nutrition[Title/Abstract] OR protein[Title/Abstract] OR micronutrient[Title/Abstract] OR deficiency[Title/Abstract] OR "body composition"[Title/Abstract] OR "fat-free mass"[Title/Abstract] OR "lean mass"[Title/Abstract]) AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-diet-testosterone-men",
    cadence: "weekly",
    topic: "Nutrition",
    label: "Diet, dietary fat, and testosterone in men",
    query: `((diet[Title/Abstract] OR "dietary fat"[Title/Abstract] OR "olive oil"[Title/Abstract] OR "energy availability"[Title/Abstract] OR "low fat diet"[Title/Abstract]) AND (testosterone[Title/Abstract] OR androgen[Title/Abstract] OR "sex hormone binding globulin"[Title/Abstract]) AND (men[Title/Abstract] OR male[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-micronutrients-testosterone",
    cadence: "weekly",
    topic: "Supplements",
    label: "Zinc, magnesium, boron, vitamin D and androgen status",
    query: `((zinc[Title/Abstract] OR magnesium[Title/Abstract] OR boron[Title/Abstract] OR "vitamin D"[Title/Abstract]) AND (testosterone[Title/Abstract] OR androgen[Title/Abstract] OR "muscle strength"[Title/Abstract] OR "sex hormone binding globulin"[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-growth-hormone-nutrition",
    cadence: "weekly",
    topic: "Anti-aging",
    label: "Growth hormone, IGF-1, fasting, protein, and sleep",
    query: `(("growth hormone"[Title/Abstract] OR somatotropin[Title/Abstract] OR "IGF-1"[Title/Abstract] OR "insulin-like growth factor"[Title/Abstract]) AND (fasting[Title/Abstract] OR nutrition[Title/Abstract] OR protein[Title/Abstract] OR "amino acid"[Title/Abstract] OR sleep[Title/Abstract] OR exercise[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-protein-muscle-over-40",
    cadence: "weekly",
    topic: "Nutrition",
    label: "Protein dose, leucine, and muscle in middle-aged men",
    query: `((protein[Title/Abstract] OR leucine[Title/Abstract] OR "amino acid"[Title/Abstract] OR "protein distribution"[Title/Abstract]) AND ("middle-aged"[Title/Abstract] OR "older men"[Title/Abstract] OR "anabolic resistance"[Title/Abstract] OR sarcopenia[Title/Abstract]) AND ("muscle protein synthesis"[Title/Abstract] OR "lean mass"[Title/Abstract] OR strength[Title/Abstract] OR hypertrophy[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-whole-foods-hormone-health",
    cadence: "weekly",
    topic: "Nutrition",
    label: "Whole foods, dietary patterns, and hormone health in men",
    query: `(("dietary pattern"[Title/Abstract] OR "Mediterranean diet"[Title/Abstract] OR eggs[Title/Abstract] OR "red meat"[Title/Abstract] OR seafood[Title/Abstract] OR "whole grains"[Title/Abstract]) AND (testosterone[Title/Abstract] OR "metabolic health"[Title/Abstract] OR "body composition"[Title/Abstract] OR inflammation[Title/Abstract]) AND (men[Title/Abstract] OR male[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
  {
    id: "weekly-herbal-supplements-androgen",
    cadence: "weekly",
    topic: "Supplements",
    label: "Herbal supplements marketed for testosterone and vitality",
    query: `(("Eurycoma longifolia"[Title/Abstract] OR "tongkat ali"[Title/Abstract] OR ashwagandha[Title/Abstract] OR "Withania somnifera"[Title/Abstract] OR fenugreek[Title/Abstract]) AND (testosterone[Title/Abstract] OR strength[Title/Abstract] OR "body composition"[Title/Abstract] OR fatigue[Title/Abstract] OR stress[Title/Abstract]) AND ${evidenceFilter} AND ${recentPublicationFilter} AND ${coachingRelevanceExclusion})`,
  },
];

const baseScienceStudies: ScienceStudy[] = [
  {
    id: "phone-in-bed-sleep-wearables",
    title:
      "Leave your smartphone out of bed: quantitative analysis of smartphone use effect on sleep",
    shortTitle: "Phone in bed is not neutral",
    topic: "Sleep",
    evidenceType: "Wearable and app-data analysis",
    year: "2022",
    journal: "Personal and Ubiquitous Computing",
    authors: "Kheirinejad et al.",
    pubmedId: "36405389",
    doi: "10.1007/s00779-022-01694-w",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/36405389/",
    doiUrl: "https://doi.org/10.1007/s00779-022-01694-w",
    origin: "published_ig_backfill",
    coachTakeaway:
      "One of the easiest sleep upgrades is environmental: keep the phone out of bed before trying to optimize supplements.",
    claimGuardrail:
      "This study can inform a sleep-routine experiment, but it cannot diagnose insomnia or guarantee that removing your phone will fix your sleep.",
    contentAngles: [
      "Your body keeps receipts from bedtime",
      "Charge your phone outside the bedroom",
      "Better sleep can make fat loss easier",
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/resources/bad-week-adjustment-loop",
    ],
    keywords: ["sleep", "phone", "screen time", "bedtime", "recovery"],
  },
  {
    id: "evening-ereader-circadian-sleep",
    title:
      "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness",
    shortTitle: "Bright screens can push sleep later",
    topic: "Sleep",
    evidenceType: "Controlled crossover study",
    year: "2015",
    journal: "Proceedings of the National Academy of Sciences",
    authors: "Chang et al.",
    pubmedId: "25535358",
    doi: "10.1073/pnas.1418490112",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/25535358/",
    doiUrl: "https://doi.org/10.1073/pnas.1418490112",
    origin: "published_ig_backfill",
    coachTakeaway:
      "A shutdown routine is not soft advice; it protects the next day's training quality, hunger control, and decision-making.",
    claimGuardrail:
      "The study tested light-emitting screens before bed; it does not show that every evening screen affects sleep equally.",
    contentAngles: [
      "Your nighttime scrolling has a morning cost",
      "Recovery starts before the workout",
      "A bedtime rule beats another motivation quote",
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/blog/how-to-stay-fit-working-long-hours",
    ],
    keywords: ["sleep", "screens", "circadian", "melatonin", "recovery"],
  },
  {
    id: "restricting-bedtime-phone-use-rct",
    title:
      "Effect of restricting bedtime mobile phone use on sleep, arousal, mood, and working memory: a randomized pilot trial",
    shortTitle: "Restricting phone use before bed helped sleep",
    topic: "Sleep",
    evidenceType: "Randomized pilot trial",
    year: "2020",
    journal: "PLOS ONE",
    authors: "He et al.",
    pubmedId: "32040492",
    doi: "10.1371/journal.pone.0228756",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/32040492/",
    doiUrl: "https://doi.org/10.1371/journal.pone.0228756",
    origin: "published_ig_backfill",
    coachTakeaway:
      "Start with one concrete sleep behavior instead of a 14-step protocol: keep your phone away from bed for a fixed window.",
    claimGuardrail:
      "This was a pilot trial, so its size and findings do not establish a universal cure.",
    contentAngles: [
      "The one sleep rule to test for seven nights",
      "Better sleep without buying anything",
      "Phone away, routine up",
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/free/goal-tracker",
    ],
    keywords: ["sleep", "mobile phone", "randomized trial", "bedtime"],
  },
  {
    id: "caffeine-six-hours-before-bed-rct",
    title:
      "Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed",
    shortTitle: "Late caffeine can still hit sleep",
    topic: "Sleep",
    evidenceType: "Randomized controlled trial",
    year: "2013",
    journal: "Journal of Clinical Sleep Medicine",
    authors: "Drake et al.",
    pubmedId: "24235903",
    doi: "10.5664/jcsm.3170",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/24235903/",
    doiUrl: "https://doi.org/10.5664/jcsm.3170",
    origin: "published_ig_backfill",
    coachTakeaway:
      "If you use pre-workout late, the first recovery fix may be an earlier caffeine cutoff rather than a new sleep supplement.",
    claimGuardrail:
      "There is no single caffeine cutoff that fits everyone; timing, amount, and personal response all matter.",
    contentAngles: [
      "Your pre-workout may still be working at bedtime",
      "Try an earlier caffeine cutoff",
      "Energy today versus sleep tonight",
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/blog/are-you-training-hard-enough",
    ],
    keywords: ["caffeine", "sleep", "preworkout", "recovery"],
  },
  {
    id: "sleep-restriction-food-intake-appetite",
    title:
      "Effects of sleep restriction on food intake and appetite under free-living conditions",
    shortTitle: "Short sleep can raise snack drive",
    topic: "Cravings",
    evidenceType: "Randomized crossover trial",
    year: "2023",
    journal: "Nutrients",
    authors: "Sato-Mito et al.",
    pubmedId: "37562755",
    doi: "10.3390/nu15153377",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37562755/",
    doiUrl: "https://doi.org/10.3390/nu15153377",
    origin: "published_ig_backfill",
    coachTakeaway:
      "When night cravings spike after poor sleep, check your sleep before blaming discipline or assuming you have a deficiency.",
    claimGuardrail:
      "The findings point to higher appetite and snacking risk, but they do not prove that sleep is the only cause of cravings.",
    contentAngles: [
      "10 PM cravings are not random",
      "Start with sleep before discipline",
      "Look for the pattern behind cravings",
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/blog/how-to-stay-consistent-with-diet-on-weekends",
    ],
    keywords: ["sleep restriction", "appetite", "cravings", "snacking"],
  },
  {
    id: "sleep-curtailment-snack-intake",
    title:
      "Sleep curtailment is accompanied by increased intake of calories from snacks",
    shortTitle: "Sleep loss can shift snack calories",
    topic: "Cravings",
    evidenceType: "Controlled sleep-curtailment study",
    year: "2009",
    journal: "The American Journal of Clinical Nutrition",
    authors: "Nedeltcheva et al.",
    pubmedId: "19056602",
    doi: "10.3945/ajcn.2008.26574",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/19056602/",
    doiUrl: "https://doi.org/10.3945/ajcn.2008.26574",
    origin: "published_ig_backfill",
    coachTakeaway:
      "If the plan falls apart at night, the fix may be protecting sleep and snack defaults earlier in the day.",
    claimGuardrail:
      "The study links sleep loss with snack intake, but it does not show that sleeping more automatically causes fat loss.",
    contentAngles: [
      "Tonight's snack choices can start with last night's sleep",
      "Bad sleep makes the pantry louder",
      "Plan the late-night default",
    ],
    relatedHrefs: [
      "/resources/diet-soda-cutting",
      "/blog/weight-loss-for-men-who-hate-dieting",
    ],
    keywords: ["sleep", "snacks", "calories", "carbohydrates", "appetite"],
  },
  {
    id: "protein-satiety-review",
    title:
      "Protein, weight management, and satiety",
    shortTitle: "Protein can help you feel fuller",
    topic: "Nutrition",
    evidenceType: "Narrative review",
    year: "2008",
    journal: "The American Journal of Clinical Nutrition",
    authors: "Paddon-Jones et al.",
    pubmedId: "18469287",
    doi: "10.1093/ajcn/87.5.1558S",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/18469287/",
    doiUrl: "https://doi.org/10.1093/ajcn/87.5.1558S",
    origin: "published_ig_backfill",
    coachTakeaway:
      "Before debating advanced macros, make dinner high-protein enough to reduce the late-night runway.",
    claimGuardrail:
      "Protein is not magic, and its effect on fullness varies from person to person.",
    contentAngles: [
      "Protein before willpower",
      "A simple way to feel fuller",
      "Dinner decides the snack battle",
    ],
    relatedHrefs: [
      "/resources/protein-guide",
      "/blog/how-much-protein-to-lose-fat",
    ],
    keywords: ["protein", "satiety", "weight management", "nutrition"],
  },
  {
    id: "food-cue-reactivity-meta-analysis",
    title:
      "Food cue reactivity and craving predict eating and weight gain: a meta-analytic review",
    shortTitle: "Your food environment keeps prompting you",
    topic: "Cravings",
    evidenceType: "Meta-analysis",
    year: "2016",
    journal: "Obesity Reviews",
    authors: "Boswell and Kober",
    pubmedId: "26644270",
    doi: "10.1111/obr.12354",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26644270/",
    doiUrl: "https://doi.org/10.1111/obr.12354",
    origin: "published_ig_backfill",
    coachTakeaway:
      "Your kitchen setup matters. Foods kept in sight can create repeated cravings and decisions.",
    claimGuardrail:
      "Food cues can raise craving and decision load, but they do not force anyone to eat.",
    contentAngles: [
      "Your counter is a prompt",
      "Make the easy option the helpful option",
      "Craving is often a setup problem",
    ],
    relatedHrefs: [
      "/blog/calorie-deficit-without-counting-everything",
      "/blog/how-to-stay-consistent-with-diet-on-weekends",
    ],
    keywords: ["food cues", "cravings", "environment", "weight gain"],
  },
  {
    id: "ultra-processed-diet-inpatient-rct",
    title:
      "Ultra-processed diets cause excess calorie intake and weight gain: an inpatient randomized controlled trial",
    shortTitle: "Food environment changes intake",
    topic: "Nutrition",
    evidenceType: "Inpatient randomized controlled trial",
    year: "2019",
    journal: "Cell Metabolism",
    authors: "Hall et al.",
    pubmedId: "31105044",
    doi: "10.1016/j.cmet.2019.05.008",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/31105044/",
    doiUrl: "https://doi.org/10.1016/j.cmet.2019.05.008",
    origin: "published_ig_backfill",
    coachTakeaway:
      "You do not need a perfect diet to benefit from better food defaults; food processing and availability can change how much you eat without noticing.",
    claimGuardrail:
      "This study does not show that every processed food is harmful. It highlights how food defaults can change calorie intake.",
    contentAngles: [
      "Same person, different food environment",
      "Stop making every meal a decision",
      "The default diet matters",
    ],
    relatedHrefs: [
      "/blog/calorie-deficit-without-counting-everything",
      "/resources/diet-soda-cutting",
    ],
    keywords: ["ultra-processed food", "calories", "weight gain", "RCT"],
  },
  {
    id: "resistance-training-mortality-2026",
    title:
      "Long-term resistance training with all-cause and cause-specific mortality: assessing dose-response and joint associations with aerobic physical activity",
    shortTitle: "Lifting can support healthy aging",
    topic: "Anti-aging",
    evidenceType: "Prospective cohort analysis",
    year: "2026",
    journal: "British Journal of Sports Medicine",
    authors: "Zhang et al.",
    pubmedId: "42230125",
    doi: "10.1136/bjsports-2025-110503",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42230125/",
    doiUrl: "https://doi.org/10.1136/bjsports-2025-110503",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Resistance training supports staying strong and capable as you age; it is not only about appearance.",
    claimGuardrail:
      "This was observational research. It found an association with mortality risk, not proof that lifting guarantees a longer life.",
    contentAngles: [
      "Muscle is not vanity",
      "Anti-aging starts under the bar",
      "Cardio plus lifting beats one-note fitness",
    ],
    relatedHrefs: [
      "/methodology",
      "/blog/training-after-35-men",
      "/blog/how-much-cardio-for-fat-loss-men",
    ],
    keywords: ["resistance training", "mortality", "longevity", "health span"],
  },
  {
    id: "physical-activity-variety-mortality-2026",
    title:
      "Physical activity types, variety, and mortality: results from two prospective cohort studies",
    shortTitle: "A mix of movement is linked with long-term health",
    topic: "Cardio",
    evidenceType: "Prospective cohort studies",
    year: "2026",
    journal: "BMJ Medicine",
    authors: "Han et al.",
    pubmedId: "41574252",
    doi: "10.1136/bmjmed-2025-001513",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41574252/",
    doiUrl: "https://doi.org/10.1136/bmjmed-2025-001513",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Cardio, daily steps, lifting, and sport can work together in the same plan.",
    claimGuardrail:
      "This observational evidence links movement variety with health outcomes, but it cannot prescribe exercise for a medical condition.",
    contentAngles: [
      "Do more than one kind of movement",
      "Steps, lifting, cardio: all count",
      "Healthy aging needs more than one kind of exercise",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/standing-desk-vs-walking-pad",
    ],
    keywords: ["physical activity", "mortality", "variety", "cardio"],
  },
  {
    id: "protein-resistance-training-meta-2022",
    title:
      "Systematic review and meta-analysis of protein intake to support muscle mass and function in healthy adults",
    shortTitle: "Protein supports the training signal",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis",
    year: "2022",
    journal: "Journal of Cachexia, Sarcopenia and Muscle",
    authors: "Tagawa et al.",
    pubmedId: "35187864",
    doi: "10.1002/jcsm.12922",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/35187864/",
    doiUrl: "https://doi.org/10.1002/jcsm.12922",
    origin: "site_backfill",
    coachTakeaway:
      "Adequate protein can support lean mass and strength when it is paired with training.",
    claimGuardrail:
      "Protein alone is not a complete physique plan; resistance training and the rest of your diet still matter.",
    contentAngles: [
      "Protein works because the training asks for it",
      "Hit the boring target",
      "Macros are support, not magic",
    ],
    relatedHrefs: [
      "/resources/protein-guide",
      "/tools/macro-calculator",
      "/blog/protein-intake-for-weight-loss-and-muscle-gain",
    ],
    keywords: ["protein", "resistance training", "lean mass", "strength"],
  },
  {
    id: "aerobic-vs-resistance-older-adults-meta-2024",
    title:
      "Effect of aerobic training versus resistance training for improving cardiorespiratory fitness and body composition in middle-aged to older adults",
    shortTitle: "Cardio and lifting solve different problems",
    topic: "Cardio",
    evidenceType: "Systematic review and meta-analysis of RCTs",
    year: "2024",
    journal: "Archives of Gerontology and Geriatrics",
    authors: "An et al.",
    pubmedId: "38878596",
    doi: "10.1016/j.archger.2024.105530",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38878596/",
    doiUrl: "https://doi.org/10.1016/j.archger.2024.105530",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "A strong plan does not argue cardio versus weights forever. It assigns each tool to the outcome it supports.",
    claimGuardrail:
      "Neither cardio nor resistance training is universally better; the right mix depends on the person, goal, and ability to stay consistent.",
    contentAngles: [
      "Stop asking cardio or weights",
      "Use the right tool for the job",
      "Strength and cardio support different parts of health",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/training-after-35-men",
    ],
    keywords: ["aerobic training", "resistance training", "body composition"],
  },
  {
    id: "muscle-strengthening-mortality-meta-2022",
    title:
      "Muscle-strengthening activities are associated with lower risk and mortality in major non-communicable diseases",
    shortTitle: "Strength work is health work",
    topic: "Anti-aging",
    evidenceType: "Systematic review and meta-analysis",
    year: "2022",
    journal: "British Journal of Sports Medicine",
    authors: "Momma et al.",
    pubmedId: "35228201",
    doi: "10.1136/bjsports-2021-105061",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/35228201/",
    doiUrl: "https://doi.org/10.1136/bjsports-2021-105061",
    origin: "site_backfill",
    coachTakeaway:
      "Anti-aging is the reason to lift that feels responsible, not vain.",
    claimGuardrail:
      "This association does not prove that resistance training prevents or treats disease.",
    contentAngles: [
      "The least vain thing you can do is build strength",
      "Muscle is adult health insurance",
      "Strength training is not optional after 30",
    ],
    relatedHrefs: [
      "/methodology",
      "/blog/how-to-build-muscle-in-your-30s",
    ],
    keywords: ["muscle strengthening", "mortality", "anti-aging", "health"],
  },
  {
    id: "higher-protein-deficit-intense-exercise",
    title:
      "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss",
    shortTitle: "High protein protects the cut",
    topic: "Nutrition",
    evidenceType: "Randomized controlled trial",
    year: "2016",
    journal: "The American Journal of Clinical Nutrition",
    authors: "Longland et al.",
    pubmedId: "26817506",
    doi: "10.3945/ajcn.115.119339",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26817506/",
    doiUrl: "https://doi.org/10.3945/ajcn.115.119339",
    origin: "site_backfill",
    seoTitle: "Higher vs Lower Protein During a Deficit (Longland 2016)",
    seoDescription:
      "Longland 2016 RCT (AJCN, PMID 26817506): higher protein in an energy deficit with intense exercise gave more lean mass gain and fat loss. Summary.",
    coachTakeaway:
      "A cut should protect training and lean mass. Protein is the first macro to defend.",
    claimGuardrail:
      "This was a specific short-term protocol with intense exercise, so its simultaneous lean-gain and fat-loss result will not apply to everyone.",
    contentAngles: [
      "Do not diet the muscle off",
      "Protein is the cut's seatbelt",
      "A controlled deficit beats a crash diet",
    ],
    relatedHrefs: [
      "/blog/how-to-lose-fat-without-losing-muscle-men",
      "/tools/macro-calculator",
    ],
    keywords: ["protein", "energy deficit", "fat loss", "lean mass"],
  },
  {
    id: "concurrent-training-interference-meta",
    title:
      "Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises",
    shortTitle: "Cardio dose can interfere with lifting",
    topic: "Cardio",
    evidenceType: "Meta-analysis",
    year: "2012",
    journal: "Journal of Strength and Conditioning Research",
    authors: "Wilson et al.",
    pubmedId: "22002517",
    doi: "10.1519/JSC.0b013e31823a3e2d",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/22002517/",
    doiUrl: "https://doi.org/10.1519/JSC.0b013e31823a3e2d",
    origin: "site_backfill",
    coachTakeaway:
      "Cardio belongs in the plan, but the dose, mode, and placement should not wreck the lifting stimulus.",
    claimGuardrail:
      "The findings do not make cardio harmful; exercise order, total volume, and recovery determine how cardio and lifting work together.",
    contentAngles: [
      "Cardio is a tool, not the plan",
      "Protect the lifts during a cut",
      "LISS before punishment cardio",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
    ],
    keywords: ["cardio", "concurrent training", "hypertrophy", "strength"],
  },
  {
    id: "intermittent-fasting-weight-loss-review",
    title: "Intermittent fasting and weight loss: Systematic review",
    shortTitle: "Fasting works when it helps the deficit",
    topic: "Nutrition",
    evidenceType: "Systematic review",
    year: "2020",
    journal: "Canadian Family Physician",
    authors: "Welton et al.",
    pubmedId: "32060194",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/32060194/",
    origin: "site_backfill",
    coachTakeaway:
      "Intermittent fasting can provide a helpful structure, but it does not create a magic metabolic advantage.",
    claimGuardrail:
      "Fasting does not outperform calorie restriction for everyone. Its fit depends on appetite, schedule, protein intake, and health context; medical use belongs with a clinician.",
    contentAngles: [
      "Fasting is a schedule, not a spell",
      "The deficit still decides",
      "Use fasting only if it makes the week easier",
    ],
    relatedHrefs: [
      "/blog/intermittent-fasting-men-over-30",
      "/tools/calorie-deficit-calculator",
    ],
    keywords: ["intermittent fasting", "weight loss", "calorie restriction"],
  },
  {
    id: "time-restricted-feeding-resistance-trained-men",
    title:
      "Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males",
    shortTitle: "16:8 can work when training and protein stay intact",
    topic: "Nutrition",
    evidenceType: "Clinical trial",
    year: "2016",
    journal: "Journal of Translational Medicine",
    authors: "Moro et al.",
    pubmedId: "27737674",
    doi: "10.1186/s12967-016-1044-0",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27737674/",
    doiUrl: "https://doi.org/10.1186/s12967-016-1044-0",
    origin: "site_backfill",
    coachTakeaway:
      "A fasting window can coexist with lifting, but only if the plan still protects training quality and daily protein.",
    claimGuardrail:
      "This specific protocol was tested in trained men, so the result may not apply to other people, medical contexts, or fasting schedules.",
    contentAngles: [
      "Fasting without low-protein mistakes",
      "The eating window is not the whole plan",
      "Protect the lifts first",
    ],
    relatedHrefs: [
      "/blog/intermittent-fasting-men-over-30",
      "/resources/protein-guide",
    ],
    keywords: ["time restricted feeding", "intermittent fasting", "protein", "strength"],
  },
  {
    id: "time-restricted-feeding-young-men-rct",
    title:
      "Time-restricted feeding in young men performing resistance training: A randomized controlled trial",
    shortTitle: "Time-restricted eating is a structure, not a guarantee",
    topic: "Nutrition",
    evidenceType: "Randomized controlled trial",
    year: "2017",
    journal: "European Journal of Sport Science",
    authors: "Tinsley et al.",
    pubmedId: "27550719",
    doi: "10.1080/17461391.2016.1223173",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27550719/",
    doiUrl: "https://doi.org/10.1080/17461391.2016.1223173",
    origin: "site_backfill",
    coachTakeaway:
      "Time-restricted eating is useful only if it still lets you eat enough protein and train consistently.",
    claimGuardrail:
      "One fasting protocol will not fit every lifter; the schedule details and your ability to follow them shape the result.",
    contentAngles: [
      "The fasting window has to fit your training",
      "Protein still has to fit",
      "Consistency beats diet identity",
    ],
    relatedHrefs: [
      "/blog/intermittent-fasting-men-over-30",
      "/blog/pre-post-workout-nutrition-men",
    ],
    keywords: ["time restricted feeding", "resistance training", "fasting"],
  },
  {
    id: "creatine-resistance-training-older-adults-meta",
    title:
      "Effect of creatine supplementation during resistance training on lean tissue mass and muscular strength in older adults: a meta-analysis",
    shortTitle: "Creatine supports lifting, it does not replace it",
    topic: "Anti-aging",
    evidenceType: "Meta-analysis",
    year: "2017",
    journal: "Open Access Journal of Sports Medicine",
    authors: "Chilibeck et al.",
    pubmedId: "29138605",
    doi: "10.2147/OAJSM.S123529",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29138605/",
    doiUrl: "https://doi.org/10.2147/OAJSM.S123529",
    origin: "site_backfill",
    coachTakeaway:
      "Creatine is worth discussing for adults who lift, but the supplement sits behind the actual training, protein, and recovery stack.",
    claimGuardrail:
      "This evidence applies to supplement use in generally healthy adults. Kidney disease, medication concerns, and other medical questions belong with a clinician.",
    contentAngles: [
      "The boring supplement that actually has research",
      "Creatine plus lifting, not creatine instead of lifting",
      "After 30, support the training signal",
    ],
    relatedHrefs: [
      "/blog/creatine-for-men-over-30",
      "/science/anti-aging-fitness-studies",
    ],
    keywords: ["creatine", "resistance training", "lean mass", "strength"],
  },
  {
    id: "water-resistance-training-brain-health-aging-rct-2026",
    title:
      "Preserving brain health in aging: structural and biochemical benefits of water based resistance training, a randomized controlled trial",
    shortTitle: "Resistance training supported brain-health markers",
    topic: "Anti-aging",
    evidenceType: "Randomized controlled trial",
    year: "2026",
    journal: "BMC Geriatrics",
    authors: "Hosseini et al.",
    pubmedId: "41975304",
    doi: "10.1186/s12877-026-07413-x",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41975304/",
    doiUrl: "https://doi.org/10.1186/s12877-026-07413-x",
    origin: "science_inbox_promoted",
    coachTakeaway:
      "For older adults, resistance training may support brain health and daily function as well as muscle.",
    claimGuardrail:
      "This small trial tested water-based training in older women; it does not prove that every form of lifting reverses brain aging.",
    contentAngles: [
      "Strength training is healthy-aging work",
      "Brain health needs movement, not only supplements",
      "Low-impact resistance training still counts",
    ],
    relatedHrefs: [
      "/science/anti-aging-fitness-studies",
      "/science/questions/does-strength-training-help-you-age-better",
      "/blog/training-after-35-men",
    ],
    keywords: ["healthy aging", "resistance training", "brain health", "older adults"],
  },
  {
    id: "creatine-resistance-training-neuroplasticity-aging-rct-2026",
    title:
      "Effects of high-load, velocity-intentional variable resistance training combined with creatine supplementation on neuroplasticity, oxidative stress, inflammation, physical function, cognitive performance and quality of life in older adults: A randomized, double-blind, placebo-controlled trial",
    shortTitle: "Creatine worked best behind hard resistance training",
    topic: "Anti-aging",
    evidenceType: "Randomized, double-blind, placebo-controlled trial",
    year: "2026",
    journal: "Experimental Gerontology",
    authors: "Fernandez-Garrido et al.",
    pubmedId: "41941966",
    doi: "10.1016/j.exger.2026.113122",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41941966/",
    doiUrl: "https://doi.org/10.1016/j.exger.2026.113122",
    origin: "science_inbox_promoted",
    coachTakeaway:
      "Creatine belongs behind the boring hierarchy: train hard, progress the lifts, then use creatine as support.",
    claimGuardrail:
      "This study combined creatine with training in older adults, so it does not establish creatine as a stand-alone anti-aging treatment.",
    contentAngles: [
      "Creatine is support, not the plan",
      "Power training matters as you age",
      "Supplements make more sense behind training",
    ],
    relatedHrefs: [
      "/blog/creatine-for-men-over-30",
      "/science/questions/should-men-over-30-take-creatine",
      "/science/weekly-digest/creatine-strength-aging",
    ],
    keywords: ["creatine", "resistance training", "healthy aging", "strength"],
  },
  {
    id: "protein-lean-mass-function-older-adults-review-2026",
    title:
      "Evidence on protein intake on lean body mass and function in community-dwelling adults aged 50 years and over living with multiple long-term conditions: Systematic review",
    shortTitle: "Protein evidence is thinner in medically complex adults",
    topic: "Nutrition",
    evidenceType: "Systematic review",
    year: "2026",
    journal: "Clinical Nutrition ESPEN",
    authors: "Ahmed et al.",
    pubmedId: "42105861",
    doi: "10.1016/j.clnesp.2026.103323",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42105861/",
    doiUrl: "https://doi.org/10.1016/j.clnesp.2026.103323",
    origin: "science_inbox_promoted",
    coachTakeaway:
      "Keep the protein floor practical, but be honest when evidence is limited for older adults with multiple conditions.",
    claimGuardrail:
      "The review found limited and indirect evidence, especially for older adults with multiple medical conditions.",
    contentAngles: [
      "Protein advice still needs context",
      "Protein still has limits",
      "A steady protein target beats a magic macro",
    ],
    relatedHrefs: [
      "/resources/protein-guide",
      "/science/questions/how-much-protein-for-body-recomposition",
      "/science/protein-body-composition-studies",
    ],
    keywords: ["protein", "lean mass", "older adults", "muscle function"],
  },
  {
    id: "hiit-vs-moderate-cardio-body-composition-rct",
    title:
      "High-Intensity Interval Training and Isocaloric Moderate-Intensity Continuous Training Result in Similar Improvements in Body Composition and Fitness in Obese Individuals",
    shortTitle: "HIIT is not automatically better",
    topic: "Cardio",
    evidenceType: "Randomized controlled trial",
    year: "2016",
    journal: "International Journal of Sport Nutrition and Exercise Metabolism",
    authors: "Martins et al.",
    pubmedId: "26479856",
    doi: "10.1123/ijsnem.2015-0078",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26479856/",
    doiUrl: "https://doi.org/10.1123/ijsnem.2015-0078",
    origin: "site_backfill",
    coachTakeaway:
      "When calorie burn is similar, the best cardio format is often the one you can repeat and recover from.",
    claimGuardrail:
      "Neither HIIT nor steady cardio is universally superior; population, dose, consistency, and recovery all matter.",
    contentAngles: [
      "Stop worshiping HIIT",
      "Steady cardio is not lazy",
      "Pick the cardio you can recover from",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
    ],
    keywords: ["HIIT", "steady cardio", "body composition", "fitness"],
  },
  {
    id: "calorie-restriction-or-exercise-rct",
    title:
      "Calorie restriction or exercise: effects on coronary heart disease risk factors. A randomized, controlled trial",
    shortTitle: "The energy gap still matters",
    topic: "Cardio",
    evidenceType: "Randomized controlled trial",
    year: "2007",
    journal: "American Journal of Physiology-Endocrinology and Metabolism",
    authors: "Fontana et al.",
    pubmedId: "17389710",
    doi: "10.1152/ajpendo.00102.2007",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/17389710/",
    doiUrl: "https://doi.org/10.1152/ajpendo.00102.2007",
    origin: "site_backfill",
    coachTakeaway:
      "Cardio can create part of the energy gap, but it does not override the need for a stable nutrition setup.",
    claimGuardrail:
      "Exercise and diet can both create an energy deficit, but they are not interchangeable for every person or goal.",
    contentAngles: [
      "Cardio is one tool, not the whole plan",
      "The deficit still has to exist",
      "Do not out-cardio a broken diet",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/tools/calorie-deficit-calculator",
    ],
    keywords: ["cardio", "calorie restriction", "exercise", "fat loss"],
  },
  {
    id: "glp1-body-composition-network-meta-2025",
    title:
      "Effect of glucagon-like peptide-1 receptor agonists and co-agonists on body composition: Systematic review and network meta-analysis",
    shortTitle: "GLP-1 weight loss still needs a muscle-protection plan",
    topic: "Peptides",
    evidenceType: "Systematic review and network meta-analysis",
    year: "2025",
    journal: "Metabolism: Clinical and Experimental",
    authors: "Karakasis et al.",
    pubmedId: "39719170",
    doi: "10.1016/j.metabol.2024.156113",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39719170/",
    doiUrl: "https://doi.org/10.1016/j.metabol.2024.156113",
    origin: "site_backfill",
    coachTakeaway:
      "If you use a GLP-1, protein, lifting, daily function, and sustainable habits still matter while your weight drops.",
    claimGuardrail:
      "Medication choice, dosing, and medical-risk decisions belong with a qualified clinician; this evidence only describes body-composition outcomes.",
    contentAngles: [
      "Weight loss is not the whole body-composition story",
      "Protect the muscle while the scale moves",
      "GLP-1 users still need a training plan",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/resources/protein-guide",
      "/methodology",
    ],
    keywords: ["GLP-1", "semaglutide", "tirzepatide", "lean mass", "body composition"],
  },
  {
    id: "tirzepatide-body-composition-surmount1-2025",
    title:
      "Body composition changes during weight reduction with tirzepatide in the SURMOUNT-1 study of adults with obesity or overweight",
    shortTitle: "Tirzepatide changes fat and lean mass",
    topic: "Peptides",
    evidenceType: "Randomized trial body-composition analysis",
    year: "2025",
    journal: "Diabetes, Obesity and Metabolism",
    authors: "Look et al.",
    pubmedId: "39996356",
    doi: "10.1111/dom.16275",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39996356/",
    doiUrl: "https://doi.org/10.1111/dom.16275",
    origin: "site_backfill",
    coachTakeaway:
      "Weight loss supported by medication still needs the basics: lift, eat enough protein, track strength, and keep the goal bigger than scale loss.",
    claimGuardrail:
      "Group-level body-composition results are not individual medical advice. Medication and side-effect decisions belong with your prescriber.",
    contentAngles: [
      "Fast weight loss needs a muscle plan",
      "Lower appetite does not replace strength and nutrition",
      "Track strength, not just scale weight",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/should-you-lift-while-on-glp-1",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
      "/tools/macro-calculator",
    ],
    keywords: ["tirzepatide", "body composition", "lean mass", "fat mass"],
  },
  {
    id: "semaglutide-lean-mass-systematic-review-2024",
    title:
      "A systematic review of the effect of semaglutide on lean mass: insights from clinical trials",
    shortTitle: "Semaglutide lean-mass data needs context",
    topic: "Peptides",
    evidenceType: "Systematic review",
    year: "2024",
    journal: "Expert Opinion on Pharmacotherapy",
    authors: "Bikou et al.",
    pubmedId: "38629387",
    doi: "10.1080/14656566.2024.2343092",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38629387/",
    doiUrl: "https://doi.org/10.1080/14656566.2024.2343092",
    origin: "site_backfill",
    coachTakeaway:
      "If medication supports weight loss, the rest of your plan still needs to preserve strength, protein intake, daily movement, and long-term eating skills.",
    claimGuardrail:
      "This study does not provide personal semaglutide, contraindication, or dosing guidance. Those decisions require clinician-led care.",
    contentAngles: [
      "The muscle question behind Ozempic headlines",
      "Lean mass is why lifting stays in the plan",
      "A smaller body still needs strong habits",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/resources/protein-guide",
    ],
    keywords: ["semaglutide", "lean mass", "muscle loss", "body composition"],
  },
  {
    id: "incretin-resistance-exercise-body-composition-2024",
    title:
      "Incretin-Based Weight Loss Pharmacotherapy: Can Resistance Exercise Optimize Changes in Body Composition?",
    shortTitle: "Resistance exercise belongs beside GLP-1 care",
    topic: "Peptides",
    evidenceType: "Clinical perspective",
    year: "2024",
    journal: "Diabetes Care",
    authors: "Locatelli et al.",
    pubmedId: "38687506",
    doi: "10.2337/dci23-0100",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38687506/",
    doiUrl: "https://doi.org/10.2337/dci23-0100",
    origin: "site_backfill",
    coachTakeaway:
      "If your appetite is lower and body weight is dropping, resistance training becomes more important, not less.",
    claimGuardrail:
      "This review concerns exercise and body-composition support; it is not a substitute for medical supervision or medication management.",
    contentAngles: [
      "Do not diet away the engine",
      "Lift while the scale drops",
      "Track strength while using a GLP-1",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/should-you-lift-while-on-glp-1",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
      "/methodology",
    ],
    keywords: ["GLP-1", "resistance exercise", "body composition", "lean mass"],
  },
  {
    id: "collagen-peptides-muscle-damage-fatigue-review-2024",
    title:
      "The Effects of Collagen Peptides as a Dietary Supplement on Muscle Damage Recovery and Fatigue Responses: An Integrative Review",
    shortTitle: "Collagen peptides are not a muscle-building shortcut",
    topic: "Peptides",
    evidenceType: "Integrative review",
    year: "2024",
    journal: "Nutrients",
    authors: "Inacio et al.",
    pubmedId: "39408370",
    doi: "10.3390/nu16193403",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39408370/",
    doiUrl: "https://doi.org/10.3390/nu16193403",
    origin: "site_backfill",
    coachTakeaway:
      "Collagen may fit a recovery or tendon-and-joint plan, but it is not a muscle-building shortcut. Training, total protein, and calories still drive physique changes.",
    claimGuardrail:
      "Collagen peptides are not a proven replacement for complete protein or progressive resistance training when muscle growth is the goal.",
    contentAngles: [
      "Collagen is not whey",
      "Recovery supplement, not muscle shortcut",
      "Tendons and training still need load",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/do-collagen-peptides-build-muscle",
      "/resources/protein-guide",
    ],
    keywords: ["collagen peptides", "recovery", "fatigue", "muscle damage"],
  },
  {
    id: "caffeine-subsequent-sleep-meta-2023",
    title: "The effect of caffeine on subsequent sleep: A systematic review and meta-analysis",
    shortTitle: "Caffeine timing has a real sleep cost",
    topic: "Sleep",
    evidenceType: "Systematic review and meta-analysis",
    year: "2023",
    journal: "Sleep Medicine Reviews",
    authors: "Gardiner et al.",
    pubmedId: "36870101",
    doi: "10.1016/j.smrv.2023.101764",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/36870101/",
    doiUrl: "https://doi.org/10.1016/j.smrv.2023.101764",
    origin: "site_backfill",
    coachTakeaway:
      "A regular person does not need a complicated sleep stack before testing caffeine timing, dose, and pre-workout habits.",
    claimGuardrail:
      "There is no universal caffeine cutoff; timing and personal response need to be tested individually.",
    contentAngles: [
      "Your afternoon caffeine can become tonight's recovery problem",
      "Pre-workout has a bedtime receipt",
      "Caffeine timing affects recovery",
    ],
    relatedHrefs: [
      "/science/sleep-and-fat-loss-studies",
      "/science/questions/does-caffeine-affect-sleep-even-if-you-fall-asleep",
      "/blog/sleep-and-fat-loss-for-busy-professionals",
    ],
    keywords: ["caffeine", "sleep", "preworkout", "recovery"],
  },
  {
    id: "aerobic-exercise-weight-loss-dose-response-2024",
    title:
      "Aerobic Exercise and Weight Loss in Adults: A Systematic Review and Dose-Response Meta-Analysis",
    shortTitle: "Cardio helps fat loss, but dose matters",
    topic: "Cardio",
    evidenceType: "Systematic review and dose-response meta-analysis",
    year: "2024",
    journal: "JAMA Network Open",
    authors: "Jayedi et al.",
    pubmedId: "39724371",
    doi: "10.1001/jamanetworkopen.2024.52185",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39724371/",
    doiUrl: "https://doi.org/10.1001/jamanetworkopen.2024.52185",
    origin: "site_backfill",
    coachTakeaway:
      "Cardio can support weight loss, but the useful dose is one you can recover from and repeat, not the hardest session possible.",
    claimGuardrail:
      "Cardio does not override nutrition, and more is not always better. Recovery, injury risk, and consistency set the useful dose.",
    contentAngles: [
      "Cardio volume should be recoverable",
      "The dose matters more than the punishment",
      "Fat loss cardio should be repeatable",
    ],
    relatedHrefs: [
      "/science/cardio-longevity-studies",
      "/science/questions/is-cardio-or-weights-better-for-fat-loss",
      "/blog/how-much-cardio-for-fat-loss-men",
    ],
    keywords: ["aerobic exercise", "weight loss", "fat loss", "dose response"],
  },
  {
    id: "concurrent-resistance-aerobic-fat-loss-meta-2025",
    title:
      "Comparison of concurrent, resistance, or aerobic training on body fat loss: a systematic review and meta-analysis",
    shortTitle: "Fat-loss training works best when tools are combined well",
    topic: "Fitness",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "Journal of the International Society of Sports Nutrition",
    authors: "Lafontant et al.",
    pubmedId: "40405489",
    doi: "10.1080/15502783.2025.2507949",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40405489/",
    doiUrl: "https://doi.org/10.1080/15502783.2025.2507949",
    origin: "site_backfill",
    coachTakeaway:
      "A regular fat-loss plan should usually protect lifting while using cardio as a support tool, not turning every workout into calorie punishment.",
    claimGuardrail:
      "The review does not identify one best workout for everyone. Training status, recovery, food intake, and schedule determine the right mix.",
    contentAngles: [
      "Weights plus cardio beats the false choice",
      "Build the plan, do not chase burn",
      "Fat loss training needs recovery too",
    ],
    relatedHrefs: [
      "/science/questions/is-cardio-or-weights-better-for-fat-loss",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
      "/tools/calorie-deficit-calculator",
    ],
    keywords: ["fat loss", "resistance training", "aerobic training", "concurrent training"],
  },
  {
    id: "whey-protein-sarcopenia-rct-meta-2024",
    title:
      "Improving sarcopenia in older adults: a systematic review and meta-analysis of randomized controlled trials of whey protein supplementation with or without resistance training",
    shortTitle: "Whey works best when paired with training context",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis of RCTs",
    year: "2024",
    journal: "The Journal of Nutrition, Health and Aging",
    authors: "Li et al.",
    pubmedId: "38350303",
    doi: "10.1016/j.jnha.2024.100184",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38350303/",
    doiUrl: "https://doi.org/10.1016/j.jnha.2024.100184",
    origin: "site_backfill",
    coachTakeaway:
      "For older adults, protein is not just a macro target. It can support daily function when paired with resistance training.",
    claimGuardrail:
      "Sarcopenia is a medical condition, so screening and treatment decisions belong with qualified clinicians.",
    contentAngles: [
      "Protein is aging infrastructure",
      "Whey is a tool, not the whole plan",
      "Keep strength in the protein conversation",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/questions/how-much-protein-for-body-recomposition",
      "/resources/protein-guide",
    ],
    keywords: ["whey protein", "sarcopenia", "older adults", "resistance training"],
  },
  {
    id: "creatine-body-composition-meta-2024",
    title:
      "The Effect of Creatine Supplementation on Resistance Training-Based Changes to Body Composition: A Systematic Review and Meta-analysis",
    shortTitle: "Creatine can support lifting-driven body composition",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis",
    year: "2024",
    journal: "Journal of Strength and Conditioning Research",
    authors: "Desai et al.",
    pubmedId: "39074168",
    doi: "10.1519/JSC.0000000000004862",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39074168/",
    doiUrl: "https://doi.org/10.1519/JSC.0000000000004862",
    origin: "site_backfill",
    coachTakeaway:
      "Creatine may support repeated hard training, strength, and lean-mass outcomes, but it does not replace progressive overload.",
    claimGuardrail:
      "Creatine is neither mandatory nor magic. People with kidney disease or other medical concerns should ask a clinician before using it.",
    contentAngles: [
      "Creatine helps the work work",
      "Supplement the training, do not replace it",
      "The boring creatine take is the best one",
    ],
    relatedHrefs: [
      "/science/questions/should-men-over-30-take-creatine",
      "/science/questions/do-creatine-and-lifting-change-body-composition",
      "/blog/creatine-for-men-over-30",
    ],
    keywords: ["creatine", "body composition", "resistance training", "lean mass"],
  },
  {
    id: "exercise-cognition-umbrella-review-2025",
    title:
      "Effectiveness of exercise for improving cognition, memory and executive function: a systematic umbrella review and meta-meta-analysis",
    shortTitle: "Exercise is brain-aging work too",
    topic: "Anti-aging",
    evidenceType: "Umbrella review and meta-meta-analysis",
    year: "2025",
    journal: "British Journal of Sports Medicine",
    authors: "Singh et al.",
    pubmedId: "40049759",
    doi: "10.1136/bjsports-2024-108589",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40049759/",
    doiUrl: "https://doi.org/10.1136/bjsports-2024-108589",
    origin: "site_backfill",
    seoTitle: "Exercise for Cognition, Memory and Executive Function (2025)",
    seoDescription:
      "Singh 2025 umbrella review (BJSM, PMID 40049759): does exercise improve cognition, memory and executive function? Findings, takeaway and limits.",
    coachTakeaway:
      "Regular exercise supports more than abs or scale weight. It also helps protect cognition, confidence, and the ability to stay capable.",
    claimGuardrail:
      "Exercise supports general health, but it does not guarantee better memory or treat cognitive disease.",
    contentAngles: [
      "Train for your future brain",
      "Anti-aging is not just skin and supplements",
      "Exercise is capacity work",
    ],
    relatedHrefs: [
      "/science/anti-aging-fitness-studies",
      "/science/questions/is-exercise-good-for-brain-aging",
      "/blog/training-after-35-men",
    ],
    keywords: ["exercise", "cognition", "brain aging", "anti-aging"],
  },
  {
    id: "resistance-training-prescription-overview-reviews-2026",
    title:
      "American College of Sports Medicine Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews",
    shortTitle: "Muscle growth needs a real prescription, not random workouts",
    topic: "Fitness",
    evidenceType: "Position stand and overview of reviews",
    year: "2026",
    journal: "Medicine and Science in Sports and Exercise",
    authors: "Currier et al.",
    pubmedId: "41843416",
    doi: "10.1249/MSS.0000000000003897",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41843416/",
    doiUrl: "https://doi.org/10.1249/MSS.0000000000003897",
    origin: "site_backfill",
    seoTitle: "ACSM 2026 Position Stand: Resistance Training Prescription",
    seoDescription:
      "Currier 2026 ACSM position stand (PMID 41843416), 137 reviews: ≥10 weekly sets per muscle for growth, ≥80% 1RM for strength. Plain-English summary.",
    quickAnswer:
      "Currier et al. (2026, Medicine and Science in Sports and Exercise, PMID 41843416, DOI 10.1249/MSS.0000000000003897) authored the American College of Sports Medicine (ACSM) Position Stand synthesizing 137 systematic reviews covering more than 30,000 healthy adults. Resistance training significantly improved maximal strength, muscle hypertrophy, power, endurance, contraction velocity, gait speed, balance, and multiple physical function outcomes compared with no exercise. For specific goals: voluntary maximal strength was enhanced by heavier loads (≥80% 1RM), complete range of motion, 2-3 sets per exercise, placing priority exercises early in sessions, and training ≥2 sessions per week. Muscle hypertrophy was enhanced by higher weekly volumes (≥10 sets per muscle group per week) and eccentric overload. Power was enhanced by moderate loads (30%-70% 1RM), lower-to-moderate volume (≤24 repetitions per exercise), and power-focused movement speed. Training to failure, equipment type, periodization model, and advanced set structures did not consistently alter primary outcomes, confirming that progressive loading and weekly volume drive results.",
    dateModified: "2026-09-15",
    coachTakeaway:
      "For a regular lifter, the lesson is not to chase novelty or overcomplicate advanced tactics. Build the week around progressive overload with enough hard sets (≥10 sets per muscle group per week for growth), heavier compound work (≥80% 1RM for strength) at least twice per week, full range of motion, and adequate recovery between sessions.",
    claimGuardrail:
      "These broad evidence synthesis recommendations establish general dose-response trends across healthy adults. They do not prescribe an inflexible single routine or replace individualized adjustments for injury history, training experience, or specific athletic requirements.",
    contentAngles: [
      "Random workouts are not a muscle plan",
      "The boring training variables still matter",
      "Progressive structure beats exercise confusion",
    ],
    relatedHrefs: [
      "/science/muscle-training-studies",
      "/science/questions/how-many-sets-to-build-muscle",
      "/methodology",
    ],
    keywords: ["resistance training", "hypertrophy", "strength", "programming"],
    faqs: [
      {
        question:
          "What did the 2026 ACSM resistance training prescription position stand find?",
        answer:
          "The 2026 ACSM position stand synthesized 137 systematic reviews with over 30,000 participants (Currier et al., PMID 41843416). Resistance training improved strength, hypertrophy, power, endurance, gait speed, balance, and physical function compared with no exercise. Maximal strength benefited most from heavier loads (≥80% 1RM), 2-3 sets per exercise, and training at least twice weekly. Hypertrophy benefited most from higher weekly volume (≥10 sets per muscle group weekly) and eccentric overload.",
      },
      {
        question:
          "What is the optimal resistance training prescription for hypertrophy according to the 2026 ACSM review?",
        answer:
          "According to the 2026 ACSM overview of reviews (PMID 41843416), muscle hypertrophy is primarily enhanced by higher weekly set volumes (≥10 sets per muscle group per week) and exercises with eccentric overload. Factors like equipment type (machines vs free weights), periodization models, and training to momentary failure showed similar muscle growth as long as weekly volume and effort were matched.",
      },
      {
        question:
          "How does load selection differ between muscle strength and physical performance in the ACSM guidelines?",
        answer:
          "The ACSM overview found that maximal voluntary strength is maximized with heavier loads (≥80% 1RM) performed for 2-3 sets early in workouts at least 2 sessions per week. In contrast, power and explosive physical performance are maximized with moderate loads (30%-70% 1RM), lower-to-moderate volume (≤24 total repetitions per exercise), and intentional fast concentric movement velocity.",
      },
    ],
  },
  {
    id: "resistance-training-dose-response-meta-regression-2026",
    title:
      "The Resistance Training Dose Response: Meta-Regressions Exploring the Effects of Weekly Volume and Frequency on Muscle Hypertrophy and Strength Gains",
    shortTitle: "More sets can help, but recoverable volume wins",
    topic: "Fitness",
    evidenceType: "Systematic review and meta-regression",
    year: "2026",
    journal: "Sports Medicine",
    authors: "Pelland et al.",
    pubmedId: "41343037",
    doi: "10.1007/s40279-025-02344-w",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41343037/",
    doiUrl: "https://doi.org/10.1007/s40279-025-02344-w",
    origin: "site_backfill",
    seoTitle: "The Resistance Training Dose Response (Pelland 2026)",
    seoDescription:
      "Pelland 2026 (PMID 41343037), 67 studies, 2,058 people: more weekly sets meant more muscle and strength, with diminishing returns. What it means.",
    quickAnswer:
      "PMID 41343037 pooled 67 resistance-training studies with 2,058 participants. Its meta-regressions found that more weekly set volume was associated with greater muscle growth and strength, but with diminishing returns—especially for strength. Higher training frequency had a clear positive relationship with strength, also with diminishing returns, while its relationship with muscle growth was compatible with a negligible effect. The study supports adding recoverable weekly volume, not chasing a universal set target.",
    dateModified: "2026-08-14",
    coachTakeaway:
      "Use frequency to spread productive sets across the week, then add volume only while performance and recovery hold up. The paper found a dose-response, not a universal set target.",
    claimGuardrail:
      "This meta-regression shows associations across programs, not one ideal set count for every lifter. The 2,058 participants were 79.1% male and averaged about 25 years old, so the estimates may not transfer equally to women, older adults, or every exercise and training history.",
    contentAngles: [
      "Your best volume is recoverable volume",
      "Sets only count if performance can progress",
      "Training frequency is a scheduling tool",
    ],
    relatedHrefs: [
      "/science/muscle-training-studies",
      "/science/questions/how-many-sets-to-build-muscle",
      "/blog/are-you-training-hard-enough",
    ],
    keywords: ["training volume", "hypertrophy", "frequency", "strength"],
    faqs: [
      {
        question: "What did PMID 41343037 find about resistance-training volume?",
        answer:
          "Across 67 studies and 2,058 participants, higher weekly set volume was associated with greater muscle growth and strength. Both relationships showed diminishing returns, and the diminishing returns were more pronounced for strength.",
      },
      {
        question: "Did PMID 41343037 find that training more often builds more muscle?",
        answer:
          "Not clearly. The frequency result for muscle growth was compatible with a negligible effect. Higher frequency had a clearer positive relationship with strength, but that relationship also showed diminishing returns.",
      },
      {
        question: "How should lifters apply this dose-response study?",
        answer:
          "Treat weekly volume as a dial rather than a fixed target. Use training frequency to distribute productive sets, add volume gradually, and stop adding work when performance, joints, soreness, or recovery worsen.",
      },
    ],
  },
  {
    id: "advanced-resistance-training-systems-meta-2026",
    title:
      "Effects of Advanced Resistance Training Systems on Muscle Hypertrophy and Strength in Recreationally Trained Adults: A Systematic Review and Meta-Analysis",
    shortTitle: "Advanced lifting methods are tools, not requirements",
    topic: "Fitness",
    evidenceType: "Systematic review and meta-analysis",
    year: "2026",
    journal: "Journal of Functional Morphology and Kinesiology",
    authors: "Tsartsapakis et al.",
    pubmedId: "41718208",
    doi: "10.3390/jfmk11010080",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41718208/",
    doiUrl: "https://doi.org/10.3390/jfmk11010080",
    origin: "site_backfill",
    coachTakeaway:
      "Drop sets, supersets, and other advanced methods can save time or add variety, but they do not replace progressive basics.",
    claimGuardrail:
      "Advanced methods are not superior for everyone; they need to fit your goal, schedule, joints, and ability to recover.",
    contentAngles: [
      "Advanced techniques are not magic",
      "Use intensity methods for a reason",
      "Time-saving is different from better",
    ],
    relatedHrefs: [
      "/science/studies/resistance-training-dose-response-meta-regression-2026",
      "/science/muscle-training-studies",
      "/science/questions/are-advanced-lifting-techniques-worth-it",
      "/blog/are-you-training-hard-enough",
    ],
    keywords: ["advanced resistance training", "drop sets", "hypertrophy", "strength"],
  },
  {
    id: "time-restricted-eating-calorie-restriction-meta-2026",
    title:
      "Systematic Review and Meta-analysis of Randomized Clinical Trials Comparing Time-Restricted Eating With and Without Caloric Restriction for Weight Loss",
    shortTitle: "Time-restricted eating still has to solve calories",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis of randomized trials",
    year: "2026",
    journal: "Nutrition Reviews",
    authors: "Fernandes-Alves et al.",
    pubmedId: "40298934",
    doi: "10.1093/nutrit/nuaf053",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40298934/",
    doiUrl: "https://doi.org/10.1093/nutrit/nuaf053",
    origin: "site_backfill",
    coachTakeaway:
      "Eating windows can help structure your day, but they do not bypass energy intake, protein needs, or consistency.",
    claimGuardrail:
      "Time-restricted eating is one dietary structure, not a uniquely superior fat-loss method or universal metabolic shortcut.",
    contentAngles: [
      "Fasting windows are structure, not magic",
      "Calories still count inside the window",
      "Use the eating window you can follow consistently",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/questions/is-time-restricted-eating-better-for-fat-loss",
      "/tools/macro-calculator",
    ],
    keywords: ["time-restricted eating", "weight loss", "caloric restriction", "fat loss"],
  },
  {
    id: "intermittent-fasting-overweight-obesity-cochrane-2026",
    title: "Intermittent fasting for adults with overweight or obesity",
    shortTitle: "Intermittent fasting is a structure, not a guarantee",
    topic: "Nutrition",
    evidenceType: "Cochrane systematic review",
    year: "2026",
    journal: "Cochrane Database of Systematic Reviews",
    authors: "Garegnani et al.",
    pubmedId: "41692034",
    doi: "10.1002/14651858.CD015610.pub2",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41692034/",
    doiUrl: "https://doi.org/10.1002/14651858.CD015610.pub2",
    origin: "site_backfill",
    coachTakeaway:
      "If fasting makes meals simpler, use it. If it creates rebound eating, low protein, or poor training, it is the wrong tool for that person.",
    claimGuardrail:
      "Intermittent fasting is not required for fat loss or obesity treatment. Medical weight management belongs with qualified clinicians.",
    contentAngles: [
      "Fasting only works if the week works",
      "Meal timing should reduce friction",
      "Do not trade breakfast for rebound eating",
    ],
    relatedHrefs: [
      "/science/questions/is-intermittent-fasting-better-than-calorie-restriction",
      "/science/questions/is-time-restricted-eating-better-for-fat-loss",
      "/blog/weight-loss-for-men-who-hate-dieting",
    ],
    keywords: ["intermittent fasting", "overweight", "obesity", "weight loss"],
  },
  {
    id: "intermittent-fasting-body-composition-meta-2025",
    title:
      "The impact of intermittent fasting on body composition and cardiometabolic outcomes in overweight and obese adults: a systematic review and meta-analysis of randomized controlled trials",
    shortTitle: "Fasting outcomes still need protein and training context",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis of RCTs",
    year: "2025",
    journal: "Nutrition Journal",
    authors: "Wang et al.",
    pubmedId: "40731344",
    doi: "10.1186/s12937-025-01178-6",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40731344/",
    doiUrl: "https://doi.org/10.1186/s12937-025-01178-6",
    origin: "site_backfill",
    coachTakeaway:
      "For body composition, fasting should be judged by the whole plan: calories, protein, lifting performance, sleep, hunger, and consistency.",
    claimGuardrail:
      "Fasting alone does not protect lean mass; resistance training and adequate protein still do most of that work.",
    contentAngles: [
      "The window is not the whole diet",
      "Fasting needs a muscle plan too",
      "Judge a diet by whether you can follow it",
    ],
    relatedHrefs: [
      "/science/questions/will-intermittent-fasting-cause-muscle-loss",
      "/science/questions/is-time-restricted-eating-better-for-fat-loss",
      "/resources/protein-guide",
    ],
    keywords: ["intermittent fasting", "body composition", "protein", "weight loss"],
  },
  {
    id: "time-restricted-eating-exercise-meta-2024",
    title:
      "The Effect of Time-Restricted Eating Combined with Exercise on Body Composition and Metabolic Health: A Systematic Review and Meta-Analysis",
    shortTitle: "Time-restricted eating works best when the training week still works",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis",
    year: "2024",
    journal: "Advances in Nutrition",
    authors: "Dai et al.",
    pubmedId: "38897385",
    doi: "10.1016/j.advnut.2024.100262",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38897385/",
    doiUrl: "https://doi.org/10.1016/j.advnut.2024.100262",
    origin: "site_backfill",
    coachTakeaway:
      "Combining an eating window with exercise only makes sense if the window still leaves enough fuel and protein to train well.",
    claimGuardrail:
      "Time-restricted eating does not fit everyone who trains; some people perform better with a wider meal schedule.",
    contentAngles: [
      "Your eating window should not sabotage training",
      "Fuel the sessions you want to keep",
      "Your meal timing has to be livable",
    ],
    relatedHrefs: [
      "/science/questions/is-time-restricted-eating-better-for-fat-loss",
      "/science/questions/will-intermittent-fasting-cause-muscle-loss",
      "/tools/macro-calculator",
    ],
    keywords: ["time-restricted eating", "exercise", "body composition", "metabolic health"],
  },
  {
    id: "ultra-processed-food-weight-gain-rct-2024",
    title:
      "Ultra-processed foods cause weight gain and increased energy intake associated with reduced chewing frequency: A randomized, open-label, crossover study",
    shortTitle: "Ultra-processed foods can make overeating easier",
    topic: "Nutrition",
    evidenceType: "Randomized crossover feeding study",
    year: "2024",
    journal: "Diabetes, Obesity and Metabolism",
    authors: "Hamano et al.",
    pubmedId: "39267249",
    doi: "10.1111/dom.15922",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39267249/",
    doiUrl: "https://doi.org/10.1111/dom.15922",
    origin: "site_backfill",
    coachTakeaway:
      "The practical move is not purity. It is to notice which foods make calories disappear too easily and build meals that require more chewing, protein, and fullness.",
    claimGuardrail:
      "Not every packaged food causes fat gain. Food texture, energy density, protein, fiber, and the rest of your diet all matter.",
    contentAngles: [
      "Some foods make the deficit harder",
      "Chewing and fullness are part of nutrition",
      "Change your food setup without labeling foods good or bad",
    ],
    relatedHrefs: [
      "/science/cravings-appetite-studies",
      "/science/questions/do-ultra-processed-foods-make-fat-loss-harder",
      "/science/questions/are-ultra-processed-foods-bad-for-fat-loss",
    ],
    keywords: ["ultra-processed foods", "energy intake", "weight gain", "satiety"],
  },
  {
    id: "bpc157-orthopaedic-sports-systematic-review-2025",
    title: "Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review",
    shortTitle: "BPC-157 has hype, but human evidence is still limited",
    topic: "Peptides",
    evidenceType: "Systematic review",
    year: "2025",
    journal: "HSS Journal",
    authors: "Vasireddi et al.",
    pubmedId: "40756949",
    doi: "10.1177/15563316251355551",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40756949/",
    doiUrl: "https://doi.org/10.1177/15563316251355551",
    origin: "site_backfill",
    coachTakeaway:
      "BPC-157 recovery claims online run ahead of verified human clinical outcomes, and its use requires medical oversight.",
    claimGuardrail:
      "Human evidence for BPC-157 is limited, and sourcing, dosing, safety, and regulatory questions belong with qualified medical professionals.",
    contentAngles: [
      "Peptide hype needs human evidence",
      "Recovery shortcuts can create risk",
      "Do not outsource rehab to an internet peptide",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/does-bpc-157-work-for-injuries",
      "/science/questions/are-injectable-peptides-safe-for-recovery",
    ],
    keywords: ["BPC-157", "peptides", "injury recovery", "sports medicine"],
  },
  {
    id: "injectable-peptide-therapy-sports-medicine-primer-2026",
    title: "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians",
    shortTitle: "Injectable peptides need clinician-level caution",
    topic: "Peptides",
    evidenceType: "Clinical primer",
    year: "2026",
    journal: "American Journal of Sports Medicine",
    authors: "Mayfield et al.",
    pubmedId: "41476424",
    doi: "10.1177/03635465251357593",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41476424/",
    doiUrl: "https://doi.org/10.1177/03635465251357593",
    origin: "site_backfill",
    coachTakeaway:
      "Injectable peptides are not a routine fitness habit. Recovery decisions should start with diagnosis, rehab, sleep, nutrition, and qualified care.",
    claimGuardrail:
      "This review cannot establish personal dosing, sourcing, legality, or safety for injectable peptides; those questions belong with a qualified clinician.",
    contentAngles: [
      "Injectable is not the same as safe",
      "Recovery needs a diagnosis first",
      "Peptide questions belong with qualified clinicians",
    ],
    relatedHrefs: [
      "/science/peptides-body-composition-studies",
      "/science/questions/are-injectable-peptides-safe-for-recovery",
      "/science/questions/does-bpc-157-work-for-injuries",
    ],
    keywords: ["injectable peptides", "sports medicine", "recovery", "BPC-157"],
  },
  {
    id: "glp1-body-composition-review-2025",
    title: "Effect of GLP-1 receptor agonists on body composition",
    shortTitle: "GLP-1 body-composition changes need a muscle plan",
    topic: "Peptides",
    evidenceType: "Clinical review",
    year: "2025",
    journal: "Current Opinion in Endocrinology, Diabetes, and Obesity",
    authors: "Bhandarkar, Bhat, and Kapoor",
    pubmedId: "41076575",
    doi: "10.1097/MED.0000000000000934",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41076575/",
    doiUrl: "https://doi.org/10.1097/MED.0000000000000934",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "If your weight is changing quickly on a GLP-1, plan for resistance training, adequate protein, and strength tracking rather than reacting with fear.",
    claimGuardrail:
      "This review does not provide personal GLP-1 dosing, contraindication, or side-effect guidance; those decisions belong in clinician-led care.",
    contentAngles: [
      "Weight loss still needs a muscle strategy",
      "Do not let appetite suppression become under-fueling",
      "Track strength while the scale drops",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/science/questions/do-glp-1s-cause-muscle-loss",
    ],
    keywords: ["GLP-1", "body composition", "lean mass", "fat loss"],
  },
  {
    id: "glp1-nutrition-priorities-advisory-2025",
    title:
      "Nutritional priorities to support GLP-1 therapy for obesity: A joint Advisory from the American College of Lifestyle Medicine, the American Society for Nutrition, the Obesity Medicine Association, and The Obesity Society",
    shortTitle: "GLP-1 nutrition still needs protein and habits",
    topic: "Peptides",
    evidenceType: "Joint advisory",
    year: "2025",
    journal: "Obesity",
    authors: "Mozaffarian et al.",
    pubmedId: "40445127",
    doi: "10.1002/oby.24336",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40445127/",
    doiUrl: "https://doi.org/10.1002/oby.24336",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "A GLP-1 can reduce appetite, but the nutrition plan still has to protect protein, micronutrient quality, training fuel, and long-term routines.",
    claimGuardrail:
      "Nutrition and training support can complement clinician-led treatment, but they cannot replace medication management or medical care.",
    contentAngles: [
      "Less hunger is not the whole nutrition plan",
      "Protein becomes easier to miss when appetite drops",
      "Medication support still needs lifestyle structure",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/resources/protein-guide",
    ],
    keywords: ["GLP-1", "nutrition", "protein", "obesity"],
  },
  {
    id: "glp1-nutrition-support-review-2025",
    title:
      "Nutrition support whilst on glucagon-like peptide-1 based therapy. Is it necessary?",
    shortTitle: "GLP-1 users may need nutrition support, not less structure",
    topic: "Peptides",
    evidenceType: "Narrative review",
    year: "2025",
    journal: "Current Opinion in Clinical Nutrition and Metabolic Care",
    authors: "Chavez, Carrasco Barria, and Leon-Sanz",
    pubmedId: "40401903",
    doi: "10.1097/MCO.0000000000001130",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40401903/",
    doiUrl: "https://doi.org/10.1097/MCO.0000000000001130",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "If your appetite is suppressed, the challenge can shift from eating less to eating enough nutrient-dense food often enough.",
    claimGuardrail:
      "Medication use, very low intake, or health conditions may require coordinated care with a clinician or registered dietitian.",
    contentAngles: [
      "Appetite down does not mean nutrition solved",
      "Build meals around protein first",
      "Do not trade weight loss for poor fueling",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/tools/macro-calculator",
    ],
    keywords: ["GLP-1", "nutrition support", "protein", "lean mass"],
  },
  {
    id: "lean-prep-glp1-protein-resistance-protocol-2026",
    title:
      "LEAN mass Preservation with Resistance Exercise and Protein during semaglutide and tirzepatide therapy (LEAN-PREP study): a protocol for a randomised controlled trial",
    shortTitle: "Researchers are testing protein plus lifting during GLP-1 therapy",
    topic: "Peptides",
    evidenceType: "Randomized controlled trial protocol",
    year: "2026",
    journal: "BMJ Open",
    authors: "Alawadhi et al.",
    pubmedId: "42020128",
    doi: "10.1136/bmjopen-2026-116911",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42020128/",
    doiUrl: "https://doi.org/10.1136/bmjopen-2026-116911",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "This study will test whether resistance exercise and protein can protect muscle during GLP-1-supported weight loss, but results are not available yet.",
    claimGuardrail:
      "This publication describes a trial protocol, not completed results, so effectiveness is still unknown.",
    contentAngles: [
      "The next GLP-1 question is muscle preservation",
      "Protein and lifting are being formally tested",
      "Do not wait for perfect evidence to protect basics",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/science/questions/should-you-lift-while-on-glp-1",
    ],
    keywords: ["GLP-1", "semaglutide", "tirzepatide", "resistance exercise", "protein"],
  },
  {
    id: "glp1-muscle-function-cell-reports-2026",
    title:
      "Weight loss with GLP-1 medicines does not result in a disproportionate loss of muscle mass or function in obese mice and humans",
    shortTitle: "GLP-1 use does not automatically mean muscle loss",
    topic: "Peptides",
    evidenceType: "Preclinical and human body-composition study",
    year: "2026",
    journal: "Cell Reports Medicine",
    authors: "Langer et al.",
    pubmedId: "41850248",
    doi: "10.1016/j.xcrm.2026.102665",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41850248/",
    doiUrl: "https://doi.org/10.1016/j.xcrm.2026.102665",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Rapid weight loss deserves strength and protein support, but evidence does not show that GLP-1 use automatically destroys muscle.",
    claimGuardrail:
      "The findings are limited to this study design and do not establish medication safety. Strength, food intake, and function should be monitored with clinician oversight.",
    contentAngles: [
      "Do not panic, measure function",
      "Muscle protection is still a behavior plan",
      "The scale is not the only GLP-1 metric",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
    ],
    keywords: ["GLP-1", "muscle function", "body composition", "lean mass"],
  },
  {
    id: "sleep-deprivation-performance-meta-2025",
    title:
      "Effects of sleep deprivation on sports performance and perceived exertion in athletes and non-athletes: a systematic review and meta-analysis",
    shortTitle: "Bad sleep can make training feel harder",
    topic: "Sleep",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "Frontiers in Physiology",
    authors: "Kong et al.",
    pubmedId: "40236824",
    doi: "10.3389/fphys.2025.1544286",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40236824/",
    doiUrl: "https://doi.org/10.3389/fphys.2025.1544286",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "If the same workout suddenly feels brutal, check your sleep before rewriting your whole program.",
    claimGuardrail:
      "One bad night does not make training useless, but sleep can help you decide when to adjust the day's training load.",
    contentAngles: [
      "Your workout may feel heavier because sleep was lighter",
      "A harder-feeling workout can signal poor recovery",
      "Bad sleep calls for smarter training, not quitting",
    ],
    relatedHrefs: [
      "/science/sleep-performance-studies",
      "/science/questions/does-sleep-loss-hurt-workout-performance",
      "/blog/sleep-and-fat-loss-for-busy-professionals",
    ],
    keywords: ["sleep deprivation", "performance", "perceived exertion", "recovery"],
  },
  {
    id: "caffeine-sleep-restriction-hiit-performance-2026",
    title:
      "Caffeine intake reverses the impairment of sleep restriction on high-intensity exercise performance",
    shortTitle: "Caffeine can mask poor sleep, but it is not recovery",
    topic: "Sleep",
    evidenceType: "Randomized crossover exercise study",
    year: "2026",
    journal: "European Journal of Applied Physiology",
    authors: "Sales et al.",
    pubmedId: "40640600",
    doi: "10.1007/s00421-025-05888-x",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40640600/",
    doiUrl: "https://doi.org/10.1007/s00421-025-05888-x",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Caffeine may help a bad-sleep session feel possible, but it should not become the plan for chronic recovery debt.",
    claimGuardrail:
      "The findings do not support high or late caffeine intake or training through exhaustion. Timing and tolerance are individual.",
    contentAngles: [
      "Caffeine is a tool, not a sleep replacement",
      "Do not borrow energy every night",
      "Feeling more alert is not the same as recovering",
    ],
    relatedHrefs: [
      "/science/sleep-performance-studies",
      "/science/questions/can-caffeine-save-a-bad-night-of-sleep",
      "/science/questions/does-caffeine-affect-sleep-even-if-you-fall-asleep",
    ],
    keywords: ["caffeine", "sleep restriction", "exercise performance", "recovery"],
  },
  {
    id: "creatine-cognition-aging-review-2026",
    title: "Creatine and Cognition in Aging: A Systematic Review of Evidence in Older Adults",
    shortTitle: "Creatine's aging story is not just muscle",
    topic: "Anti-aging",
    evidenceType: "Systematic review",
    year: "2026",
    journal: "Nutrition Reviews",
    authors: "Marshall et al.",
    pubmedId: "40971619",
    doi: "10.1093/nutrit/nuaf135",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40971619/",
    doiUrl: "https://doi.org/10.1093/nutrit/nuaf135",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Creatine is a well-studied support tool around training and aging, not a brain-hacking miracle.",
    claimGuardrail:
      "Creatine does not guarantee cognitive improvement. Kidney disease, medications, and other clinical concerns warrant medical guidance before use.",
    contentAngles: [
      "Creatine is boring in the best way",
      "Aging support still starts with training",
      "A supplement study does not prove a miracle",
    ],
    relatedHrefs: [
      "/science/creatine-aging-studies",
      "/science/questions/does-creatine-help-brain-aging",
      "/blog/creatine-for-men-over-30",
    ],
    keywords: ["creatine", "cognition", "aging", "older adults"],
  },
  {
    id: "creatine-exercise-older-adults-meta-2025",
    title:
      "Impact of creatine supplementation and exercise training in older adults: a systematic review and meta-analysis",
    shortTitle: "Creatine works best as training support",
    topic: "Anti-aging",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "European Review of Aging and Physical Activity",
    authors: "Sharifian et al.",
    pubmedId: "41062952",
    doi: "10.1186/s11556-025-00384-9",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41062952/",
    doiUrl: "https://doi.org/10.1186/s11556-025-00384-9",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Creatine belongs next to a progressive training plan. The supplement is not the stimulus; the workouts still are.",
    claimGuardrail:
      "Creatine does not replace lifting or nutrition. Your health history may make clinician input important before supplement use.",
    contentAngles: [
      "Creatine does not train for you",
      "Use creatine alongside a consistent plan",
      "Older adults still need progressive work",
    ],
    relatedHrefs: [
      "/science/creatine-aging-studies",
      "/science/questions/does-creatine-help-aging-adults",
      "/science/questions/do-creatine-and-lifting-change-body-composition",
    ],
    keywords: ["creatine", "exercise", "older adults", "strength"],
  },
  {
    id: "resistance-training-diabetes-health-meta-2025",
    title:
      "Resistance training enhances metabolic and muscular health and reduces systemic inflammation in middle-aged and older adults with type 2 diabetes: a meta-analysis",
    shortTitle: "Strength training is metabolic health work too",
    topic: "Fitness",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "Diabetes Research and Clinical Practice",
    authors: "Wang, Fan, and Wang",
    pubmedId: "41106502",
    doi: "10.1016/j.diabres.2025.112941",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41106502/",
    doiUrl: "https://doi.org/10.1016/j.diabres.2025.112941",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Even if bodybuilding is not your goal, lifting can support muscle, daily function, and metabolic health.",
    claimGuardrail:
      "This review does not provide diabetes treatment advice. People with diabetes need clinician-guided exercise and nutrition decisions.",
    contentAngles: [
      "Lifting is not just for aesthetics",
      "Muscle is metabolic insurance",
      "Strength work belongs in adult health plans",
    ],
    relatedHrefs: [
      "/science/muscle-training-studies",
      "/science/questions/is-lifting-good-for-metabolic-health",
      "/methodology",
    ],
    keywords: ["resistance training", "metabolic health", "muscle", "inflammation"],
  },
  {
    id: "resistance-training-sarcopenia-women-meta-2026",
    title:
      "Effects of resistance training on muscle mass, strength, and physical function in older women with sarcopenia: a systematic review and meta-analysis",
    shortTitle: "Older women still respond to resistance training",
    topic: "Anti-aging",
    evidenceType: "Systematic review and meta-analysis",
    year: "2026",
    journal: "Frontiers in Public Health",
    authors: "Zhou et al.",
    pubmedId: "41668861",
    doi: "10.3389/fpubh.2025.1735899",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41668861/",
    doiUrl: "https://doi.org/10.3389/fpubh.2025.1735899",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Progressive resistance training can support muscle, strength, and daily function for women as they age.",
    claimGuardrail:
      "Sarcopenia requires clinical diagnosis and care. This evidence supports strength training as a general fitness habit, not as a substitute for treatment.",
    contentAngles: [
      "Muscle is not just a men's fitness topic",
      "Strength supports independence",
      "Start where function is today",
    ],
    relatedHrefs: [
      "/science/anti-aging-fitness-studies",
      "/science/questions/does-strength-training-help-you-age-better",
      "/for/online-fitness-coach-for-women",
    ],
    keywords: ["resistance training", "sarcopenia", "older women", "strength"],
  },
  {
    id: "cereal-fiber-satiety-review-2026",
    title: "Cereal Fibers and Satiety: A Systematic Review",
    shortTitle: "Fiber helps fullness without diet drama",
    topic: "Nutrition",
    evidenceType: "Systematic review",
    year: "2026",
    journal: "Nutrition Reviews",
    authors: "Machalias et al.",
    pubmedId: "40644449",
    doi: "10.1093/nutrit/nuaf083",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40644449/",
    doiUrl: "https://doi.org/10.1093/nutrit/nuaf083",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Fiber is a practical satiety lever: add foods that make meals more filling before trying to win every craving with willpower.",
    claimGuardrail:
      "No single fiber source fixes appetite or weight loss. Fiber tolerance, total calories, protein, and food preferences all matter.",
    contentAngles: [
      "Fullness is a food-design problem",
      "Fiber makes the plan easier to keep",
      "Add structure before adding restriction",
    ],
    relatedHrefs: [
      "/science/satiety-food-environment-studies",
      "/science/questions/does-fiber-help-with-satiety",
      "/science/cravings-appetite-studies",
    ],
    keywords: ["fiber", "satiety", "appetite", "nutrition"],
  },
  {
    id: "protein-supplements-strength-network-meta-2026",
    title:
      "Which Protein-Based Dietary Supplements Most Effectively Enhance Fat-Free Mass and Strength Gains in Healthy Adults Undergoing Resistance Training? A Network Meta-Analysis",
    shortTitle: "Protein supplements are support, not the program",
    topic: "Nutrition",
    evidenceType: "Systematic review and network meta-analysis",
    year: "2026",
    journal: "Translational Sports Medicine",
    authors: "Drummond et al.",
    pubmedId: "41635649",
    doi: "10.1155/tsm2/5557511",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41635649/",
    doiUrl: "https://doi.org/10.1155/tsm2/5557511",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Supplement comparisons are less important than the base pattern: resistance training, enough total protein, and consistency.",
    claimGuardrail:
      "This network meta-analysis does not establish one universal supplement ranking. Study quality, diet, dose, and training all affect the result.",
    contentAngles: [
      "The best protein is the one that helps you hit the plan",
      "Supplements can make protein more convenient",
      "Protein powder does not replace a good training plan",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/questions/which-protein-supplement-is-best-for-muscle",
      "/resources/protein-guide",
    ],
    keywords: ["protein supplements", "fat-free mass", "strength", "resistance training"],
  },
  {
    id: "ultraprocessed-eating-rate-rct-2026",
    title:
      "Eating rate has sustained effects on energy intake from ultraprocessed diets: a 2-week ad libitum dietary randomized controlled crossover trial",
    shortTitle: "Eating speed can change calorie intake",
    topic: "Nutrition",
    evidenceType: "Randomized controlled crossover trial",
    year: "2026",
    journal: "American Journal of Clinical Nutrition",
    authors: "Forde et al.",
    pubmedId: "41314613",
    doi: "10.1016/j.ajcnut.2025.11.012",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41314613/",
    doiUrl: "https://doi.org/10.1016/j.ajcnut.2025.11.012",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "A mechanical change can make fat loss easier: slower, higher-chew meals can help you notice fullness before calories overshoot.",
    claimGuardrail:
      "The study does not make every ultra-processed food harmful. Eating rate, texture, protein, fiber, and calorie density all matter.",
    contentAngles: [
      "Calories can disappear faster than fullness arrives",
      "Chewing is underrated fat-loss design",
      "Make slower meals your default",
    ],
    relatedHrefs: [
      "/science/satiety-food-environment-studies",
      "/science/questions/does-eating-speed-matter-for-fat-loss",
      "/science/questions/do-ultra-processed-foods-make-fat-loss-harder",
    ],
    keywords: ["ultra-processed foods", "eating rate", "energy intake", "satiety"],
  },
  {
    id: "physical-activity-biological-age-dnam-meta-2026",
    title:
      "Physical activity and biological age measured by DNA methylation clocks: a systematic review and meta-analysis",
    shortTitle: "Physical activity remains central to healthy aging",
    topic: "Anti-aging",
    evidenceType: "Systematic review and meta-analysis",
    year: "2026",
    journal: "The Lancet Healthy Longevity",
    authors: "Shan et al.",
    pubmedId: "42068988",
    doi: "10.1016/j.lanhl.2026.100835",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42068988/",
    doiUrl: "https://doi.org/10.1016/j.lanhl.2026.100835",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Physical activity remains one of the most practical ways to support healthy aging.",
    claimGuardrail:
      "Exercise does not reverse aging, and DNA methylation age does not directly predict how long an individual will live.",
    contentAngles: [
      "Anti-aging still starts with movement",
      "Do not buy biohacking theater before walking and lifting",
      "Biological age is not a magic score",
    ],
    relatedHrefs: [
      "/science/anti-aging-fitness-studies",
      "/science/questions/can-exercise-slow-biological-aging",
      "/methodology",
    ],
    keywords: ["physical activity", "biological age", "DNA methylation", "anti-aging"],
  },
  {
    id: "exercise-training-crf-older-adults-meta-2026",
    title:
      "The Effect of Aerobic, Resistance, and Combined Exercise Training on Cardiorespiratory Fitness in Healthy People Aged 60 years and Over: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
    shortTitle: "Older adults can still build fitness capacity",
    topic: "Cardio",
    evidenceType: "Systematic review and meta-analysis of randomized trials",
    year: "2026",
    journal: "Biological Research for Nursing",
    authors: "Azimkhani et al.",
    pubmedId: "40501026",
    doi: "10.1177/10998004251348605",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40501026/",
    doiUrl: "https://doi.org/10.1177/10998004251348605",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Cardio capacity is trainable later in life. The plan does not need punishment cardio; it needs repeatable aerobic and strength exposure.",
    claimGuardrail:
      "This study does not provide exercise prescriptions for clinical conditions. Older adults with complex medical needs should follow qualified medical guidance.",
    contentAngles: [
      "Fitness span is trainable",
      "Capacity matters after 60 too",
      "Combine strength and aerobic work intelligently",
    ],
    relatedHrefs: [
      "/science/cardio-longevity-studies",
      "/science/questions/should-you-prioritize-cardio-for-longevity",
      "/blog/how-much-cardio-for-fat-loss-men",
    ],
    keywords: ["cardiorespiratory fitness", "older adults", "aerobic exercise", "resistance training"],
  },
  {
    id: "cardiorespiratory-fitness-mortality-overview-2024",
    title:
      "Cardiorespiratory fitness is a strong and consistent predictor of morbidity and mortality among adults: an overview of meta-analyses representing over 20.9 million observations from 199 unique cohort studies",
    shortTitle: "Cardio fitness is a major health signal",
    topic: "Cardio",
    evidenceType: "Overview of meta-analyses",
    year: "2024",
    journal: "British Journal of Sports Medicine",
    authors: "Lang et al.",
    pubmedId: "38599681",
    doi: "10.1136/bjsports-2023-107849",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38599681/",
    doiUrl: "https://doi.org/10.1136/bjsports-2023-107849",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "For lifters who hate cardio, this is the adult-health argument: cardiorespiratory fitness is not just about burning calories.",
    claimGuardrail:
      "This association does not establish one cardio prescription for everyone, but it supports training cardiorespiratory capacity consistently.",
    contentAngles: [
      "Cardio is not just a calorie tool",
      "Better aerobic fitness supports long-term health",
      "Build capacity without wrecking lifting",
    ],
    relatedHrefs: [
      "/science/cardio-longevity-studies",
      "/science/questions/should-you-prioritize-cardio-for-longevity",
      "/science/questions/is-lifting-enough-for-longevity",
    ],
    keywords: ["cardiorespiratory fitness", "mortality", "longevity", "cardio"],
  },
  {
    id: "crf-bmi-mortality-meta-2025",
    title:
      "Cardiorespiratory fitness, body mass index and mortality: a systematic review and meta-analysis",
    shortTitle: "Fitness matters even when body weight is imperfect",
    topic: "Cardio",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "British Journal of Sports Medicine",
    authors: "Weeldreyer et al.",
    pubmedId: "39537313",
    doi: "10.1136/bjsports-2024-108748",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39537313/",
    doiUrl: "https://doi.org/10.1136/bjsports-2024-108748",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Health progress is bigger than scale weight. Improving fitness capacity is a meaningful target while body composition changes.",
    claimGuardrail:
      "Better fitness does not erase the importance of body composition, medical risk, or clinician advice; both fitness and weight need context.",
    contentAngles: [
      "Get fitter while you get leaner",
      "The scale is not the only health signal",
      "Conditioning is worth training",
    ],
    relatedHrefs: [
      "/science/cardio-longevity-studies",
      "/science/questions/should-you-prioritize-cardio-for-longevity",
      "/science/questions/cardio-or-weights-for-fat-loss",
    ],
    keywords: ["cardiorespiratory fitness", "BMI", "mortality", "health"],
  },
  {
    id: "carbohydrate-intake-hypertrophy-meta-2026",
    title: "The Effect of Carbohydrate Intake on Muscle Hypertrophy: A Systematic Review and Meta-analysis",
    shortTitle: "Carbs support training, but they are not a hypertrophy switch",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis",
    year: "2026",
    journal: "Sports Medicine",
    authors: "Henselmans, Varvik, and Izquierdo",
    pubmedId: "41712097",
    doi: "10.1007/s40279-025-02341-z",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41712097/",
    doiUrl: "https://doi.org/10.1007/s40279-025-02341-z",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Carbs can fuel training and make a plan easier to follow. They do not replace progressive lifting or sufficient protein.",
    claimGuardrail:
      "A high-carbohydrate target does not fit everyone. Goals, calories, preferences, training volume, and digestion determine the useful amount.",
    contentAngles: [
      "Carbs fuel the work, they do not do the work",
      "Muscle growth still needs lifting",
      "Stop arguing macros without checking performance",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/questions/do-you-need-carbs-to-build-muscle",
      "/blog/pre-post-workout-nutrition-men",
    ],
    keywords: ["carbohydrates", "hypertrophy", "muscle growth", "nutrition"],
  },
  {
    id: "protein-timing-adaptations-meta-2025",
    title: "Does Protein Ingestion Timing Affect Exercise-Induced Adaptations? A Systematic Review with Meta-Analysis",
    shortTitle: "Protein timing is secondary to total intake",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "Nutrients",
    authors: "Casuso and Goossens",
    pubmedId: "40647175",
    doi: "10.3390/nu17132070",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40647175/",
    doiUrl: "https://doi.org/10.3390/nu17132070",
    origin: "pubmed_monitor_seed",
    quickAnswer:
      "This 2025 systematic review and meta-analysis by Casuso and Goossens (Nutrients, PMID 40647175) found that total daily protein intake has a stronger influence on muscle and strength adaptations than the specific timing of protein around workouts. The post-workout anabolic window exists but is narrower than commonly believed. Kris Oddo, NASM-CPT and founder of Geebs Coaching, applies this conservatively: build a reliable daily protein habit first — roughly 0.7–1 g per pound of bodyweight — and refine timing only after that floor is consistent.",
    dateModified: "2026-07-18",
    coachTakeaway:
      "If your schedule is busy, first make daily protein consistent. Fine-tune timing after that foundation is reliable.",
    claimGuardrail:
      "Protein timing can matter, but it is usually less important than total daily intake, training quality, and consistency.",
    contentAngles: [
      "Daily protein beats perfect timing",
      "The anabolic window is not a panic window",
      "Make protein boring and repeatable",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/questions/does-protein-timing-matter-for-muscle",
      "/blog/pre-post-workout-nutrition-men",
    ],
    keywords: ["protein timing", "muscle", "hypertrophy", "nutrition"],
    faqs: [
      {
        question:
          "Does protein ingestion timing affect exercise-induced adaptations? A systematic review with meta-analysis",
        answer:
          "A 2025 systematic review and meta-analysis by Casuso and Goossens published in Nutrients (PMID 40647175) found that protein ingestion timing has a modest effect on exercise-induced muscle adaptations compared to total daily protein intake. Meeting your daily protein target consistently — around 0.7–1 g per pound of bodyweight — matters more than whether you eat protein immediately before or after training. At Geebs Coaching, Kris Oddo, NASM-CPT, recommends building a repeatable daily protein routine before optimizing narrow post-workout windows.",
      },
    ],
  },
  {
    id: "sleep-extension-overweight-short-sleep-2026",
    title:
      "Sleep Extension Improves Sleep Health but Not Insulin Sensitivity in People With Overweight or Obesity Who Maintain Habitual Short Sleep Schedules",
    shortTitle: "More sleep helped sleep health, not every metabolic marker",
    topic: "Sleep",
    evidenceType: "Randomized controlled trial",
    year: "2026",
    journal: "Diabetes Care",
    authors: "Beals et al.",
    pubmedId: "41564347",
    doi: "10.2337/dc25-2083",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41564347/",
    doiUrl: "https://doi.org/10.2337/dc25-2083",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "If you regularly sleep too little, extending sleep may improve consistency and recovery readiness, but it will not guarantee better insulin sensitivity.",
    claimGuardrail:
      "Adding an hour of sleep did not fix metabolism in this trial; sleep health improved without better insulin sensitivity or glycemic control.",
    contentAngles: [
      "Sleep supports recovery, but it does not change every lab marker",
      "Add sleep before adding complexity",
      "Short sleepers need a realistic bedtime experiment",
    ],
    relatedHrefs: [
      "/science/sleep-and-fat-loss-studies",
      "/science/sleep-performance-studies",
      "/science/questions/does-sleep-extension-improve-metabolic-health",
    ],
    keywords: ["sleep extension", "sleep health", "insulin sensitivity", "obesity"],
  },
  {
    id: "incretin-lean-mass-lifestyle-meta-2026",
    title:
      "Lean Mass Changes With Incretin Therapy Versus Lifestyle Intervention: A Systematic Review and Meta-Analysis of Randomised Controlled Trials",
    shortTitle: "GLP-1 weight loss needs a muscle plan",
    topic: "Peptides",
    evidenceType: "Systematic review and meta-analysis of randomized trials",
    year: "2026",
    journal: "Diabetes, Obesity and Metabolism",
    authors: "Eisa and Barood",
    pubmedId: "41877354",
    doi: "10.1111/dom.70666",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41877354/",
    doiUrl: "https://doi.org/10.1111/dom.70666",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Significant weight loss often includes some lean-mass loss, and resistance training plus adequate protein can improve that outcome.",
    claimGuardrail:
      "These findings are not an argument against medication. Medication decisions stay clinician-led while training, protein, and strength monitoring support muscle retention.",
    contentAngles: [
      "The GLP-1 plan needs lifting",
      "Weight loss is not just scale loss",
      "Muscle preservation is a process",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/glp-1-nutrition-risks-studies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
    ],
    keywords: ["glp-1", "incretin", "lean mass", "fat-free mass", "resistance training"],
  },
  {
    id: "glp1-body-composition-network-meta-2026",
    title:
      "Comparative Effects of Individual Glucagon-Like Peptide-1 Receptor Agonist-Based Medications on Direct Measurement of Body Composition Among Adults With Overweight or Obesity With or Without Type 2 Diabetes: A Systematic Review and Network Meta-Analysis of Randomised Controlled Trials",
    shortTitle: "GLP-1s lower fat, but lean mass still needs attention",
    topic: "Peptides",
    evidenceType: "Systematic review and network meta-analysis of randomized trials",
    year: "2026",
    journal: "Diabetes, Obesity and Metabolism",
    authors: "Wachiraphansakul et al.",
    pubmedId: "42209204",
    doi: "10.1111/dom.70884",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42209204/",
    doiUrl: "https://doi.org/10.1111/dom.70884",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "Fat loss can improve while strength, protein intake, and lean-mass monitoring still need attention.",
    claimGuardrail:
      "This analysis cannot choose a medication or dose for an individual or predict side effects. Those decisions belong in clinician-managed care.",
    contentAngles: [
      "Body composition beats scale-only thinking",
      "Fat loss still needs a strength signal",
      "GLP-1 weight loss still needs strength and nutrition support",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/science/questions/should-you-track-strength-while-losing-weight",
    ],
    keywords: ["glp-1", "body composition", "lean mass", "fat mass", "semaglutide", "tirzepatide"],
  },
  {
    id: "incretin-nonpharm-body-composition-review-2026",
    title:
      "Effect of Incretin-Based and Nonpharmacologic Weight Loss on Body Composition: A Systematic Review",
    shortTitle: "Fat loss and muscle loss must be separated",
    topic: "Peptides",
    evidenceType: "Systematic review",
    year: "2026",
    journal: "Annals of Internal Medicine",
    authors: "Batsis et al.",
    pubmedId: "41996180",
    doi: "10.7326/ANNALS-25-00478",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41996180/",
    doiUrl: "https://doi.org/10.7326/ANNALS-25-00478",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "When your weight is moving quickly, track strength, protein intake, daily function, and body-composition trends instead of watching the scale alone.",
    claimGuardrail:
      "A home scale cannot diagnose muscle loss. Body-composition methods vary, and medical interpretation belongs with clinicians.",
    contentAngles: [
      "Fast weight loss needs more than a scale",
      "Track what the scale cannot tell you",
      "Function is part of the outcome",
    ],
    relatedHrefs: [
      "/science/glp-1-muscle-preservation-studies",
      "/science/questions/should-you-track-strength-while-losing-weight",
      "/science/questions/how-do-you-avoid-losing-muscle-while-dieting",
    ],
    keywords: ["incretin", "glp-1", "body composition", "fat-free mass", "skeletal muscle"],
  },
  {
    id: "resistance-exercise-diet-weight-loss-meta-2025",
    title:
      "Effect of resistance exercise on body composition, muscle strength and cardiometabolic health during dietary weight loss in people living with overweight or obesity: a systematic review and meta-analysis",
    shortTitle: "Lifting protects muscle during fat loss",
    topic: "Fitness",
    evidenceType: "Systematic review and meta-analysis",
    year: "2025",
    journal: "BMJ Open Sport & Exercise Medicine",
    authors: "Binmahfoz et al.",
    pubmedId: "40909191",
    doi: "10.1136/bmjsem-2024-002363",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40909191/",
    doiUrl: "https://doi.org/10.1136/bmjsem-2024-002363",
    origin: "pubmed_monitor_seed",
    seoTitle: "Resistance Exercise During Dietary Weight Loss: 2025 Meta",
    seoDescription:
      "Binmahfoz 2025 (BMJ, PMID 40909191), 25 RCTs: lifting while dieting protected lean mass and strength and raised fat loss, not scale weight loss.",
    coachTakeaway:
      "During a diet phase, lifting may not make the scale drop faster, but it can improve fat-mass loss, protect fat-free mass, and preserve strength. Keep the plan simple: lift two to four days per week, keep protein high enough to support training, avoid crash-dieting, and judge progress by strength, measurements, and how clothes fit instead of scale weight alone.",
    claimGuardrail:
      "The strongest findings were body composition and strength outcomes. The review did not show that resistance exercise makes the scale drop faster, fixes every cardiometabolic marker, or guarantees the same response for every person living with overweight or obesity.",
    contentAngles: [
      "Lift while dieting, even if the scale is slower",
      "Fat loss should not cost all your strength",
      "Diet plus lifting beats scale-only dieting",
    ],
    relatedHrefs: [
      "/science/diet-muscle-retention-studies",
      "/science/questions/does-lifting-help-during-weight-loss",
      "/science/questions/how-to-lose-fat-without-losing-muscle",
    ],
    keywords: ["dietary weight loss", "resistance exercise", "fat-free mass", "fat mass", "muscle strength"],
    quickAnswer:
      "Binmahfoz et al. (2025, BMJ Open Sport & Exercise Medicine, PMID 40909191, DOI 10.1136/bmjsem-2024-002363) reviewed 25 randomized trials in people living with overweight or obesity. Adding resistance exercise to dietary weight loss did not meaningfully increase total bodyweight loss, but it protected fat-free mass (SMD 0.40), increased fat-mass loss (SMD -0.36), and improved muscle strength (SMD 2.36) compared with diet alone. Cardiometabolic changes were less consistent, so the most defensible answer is this: lift while dieting to make more of the weight loss come from fat and less from muscle, not because lifting magically makes the scale fall faster.",
    dateModified: "2026-09-14",
    faqs: [
      {
        question:
          "What did the study on the effect of resistance exercise on body composition, muscle strength and cardiometabolic health during dietary weight loss find?",
        answer:
          "Binmahfoz et al. (2025, BMJ Open Sport & Exercise Medicine, PMID 40909191) found that combining resistance exercise with dietary weight loss improved fat-mass loss, protected fat-free mass, and improved muscle strength compared with diet alone in adults living with overweight or obesity. The study did not show a meaningful extra drop in total bodyweight, which is why the practical win is better body composition rather than a faster scale drop.",
      },
      {
        question:
          "Does resistance exercise improve cardiometabolic health during dietary weight loss?",
        answer:
          "The review included cardiometabolic outcomes, but the clearer and more reliable signal was for body composition and strength: more fat-mass loss, better fat-free-mass protection, and stronger muscle performance. Treat cardiometabolic changes as a possible benefit that still depends on the whole plan, not as the main promise of lifting during weight loss.",
      },
      {
        question:
          "Should you lift weights while dieting if the scale does not move faster?",
        answer:
          "Yes. Scale weight only tells you total mass. During dietary weight loss, resistance exercise gives your body a reason to keep muscle and strength while the calorie deficit pulls from stored fat. That is why a smart diet phase tracks strength, waist measurements, photos, energy, and consistency alongside bodyweight.",
      },
    ],
  },
  {
    id: "plant-animal-protein-muscle-meta-2025",
    title:
      "Effect of Plant Versus Animal Protein on Muscle Mass, Strength, Physical Performance, and Sarcopenia: A Systematic Review and Meta-analysis of Randomized Controlled Trials",
    shortTitle: "Protein source matters less than the whole plan, but quality still matters",
    topic: "Nutrition",
    evidenceType: "Systematic review and meta-analysis of randomized trials",
    year: "2025",
    journal: "Nutrition Reviews",
    authors: "Reid-McCann et al.",
    pubmedId: "39813010",
    doi: "10.1093/nutrit/nuae200",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39813010/",
    doiUrl: "https://doi.org/10.1093/nutrit/nuae200",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "You can build a strong plant-based plan, but protein amount, source variety, leucine content, and daily consistency may need extra attention.",
    claimGuardrail:
      "The review found small differences in muscle mass and no clear difference in strength or performance, so it does not make animal protein universally necessary.",
    contentAngles: [
      "Plant protein can work, but plan it",
      "Choose plant protein sources deliberately",
      "Do not let ideology underfeed muscle",
    ],
    relatedHrefs: [
      "/science/protein-body-composition-studies",
      "/science/diet-muscle-retention-studies",
      "/science/questions/is-plant-protein-as-good-as-animal-protein-for-muscle",
    ],
    keywords: ["plant protein", "animal protein", "muscle mass", "strength", "sarcopenia"],
  },
  {
    id: "glp1-nutritional-deficiency-review-2026",
    title:
      "Micronutrient and Nutritional Deficiencies Associated With GLP-1 Receptor Agonist Therapy: A Narrative Review",
    shortTitle: "Low appetite can create nutrition gaps",
    topic: "Peptides",
    evidenceType: "Narrative review",
    year: "2026",
    journal: "Clinical Obesity",
    authors: "Urbina et al.",
    pubmedId: "41549912",
    doi: "10.1111/cob.70070",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/41549912/",
    doiUrl: "https://doi.org/10.1111/cob.70070",
    origin: "pubmed_monitor_seed",
    coachTakeaway:
      "When appetite drops hard, the nutrition plan has to protect protein, fluids, fiber, calcium/iron-rich foods, and clinician-directed lab follow-up when risk is present.",
    claimGuardrail:
      "This is not a diagnosis or supplement prescription. The review is mainly observational, and lab testing or supplementation belongs with qualified clinicians.",
    contentAngles: [
      "Low appetite still needs nutrition standards",
      "Lower appetite does not make food quality optional",
      "Protein and micronutrients are not optional",
    ],
    relatedHrefs: [
      "/science/glp-1-nutrition-risks-studies",
      "/science/questions/do-glp-1s-cause-nutrient-deficiencies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
    ],
    keywords: ["glp-1", "nutrition", "micronutrient", "deficiency", "protein", "calcium", "iron"],
  },
  {
    id: "daily-steps-health-outcomes-meta-2025",
    title:
      "Daily steps and health outcomes in adults: a systematic review and dose-response meta-analysis",
    shortTitle: "7,000 steps a day captures most of the benefit",
    topic: "Cardio",
    evidenceType: "Systematic review and dose-response meta-analysis",
    year: "2025",
    journal: "Lancet Public Health",
    authors: "Ding et al.",
    pubmedId: "40713949",
    doi: "10.1016/S2468-2667(25)00164-1",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40713949/",
    doiUrl: "https://doi.org/10.1016/S2468-2667(25)00164-1",
    origin: "site_backfill",
    coachTakeaway:
      "If you are sitting at 2,000 to 4,000 steps, getting to about 7,000 is the move that matters most. Past that, more walking still helps, but you do not need to chase 10,000 to earn the health benefit.",
    claimGuardrail:
      "The studies are observational, so they show an association between steps and lower risk, not proof that steps alone caused it. The authors also note few studies per outcome and no age-specific analysis.",
    contentAngles: [
      "You do not need 10,000 steps",
      "7,000 is the realistic target",
      "The first extra steps count the most",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/standing-desk-vs-walking-pad",
      "/blog/how-to-lose-belly-fat-sitting-all-day",
    ],
    keywords: ["steps per day", "daily steps", "10000 steps", "7000 steps", "walking", "mortality"],
    quickAnswer:
      "Ding et al. (2025, Lancet Public Health, PMID 40713949) pooled 57 studies from 35 cohorts. For all-cause mortality, heart disease, dementia and falls, the benefit curved and flattened around 5,000 to 7,000 steps a day. Compared with 2,000 steps, 7,000 steps a day was linked to a 47% lower risk of death from any cause. The authors say 10,000 is still a fine target for active people, but 7,000 is a realistic goal that already brings meaningful benefit.",
  },
  {
    id: "daily-steps-mortality-15-cohorts-2022",
    title: "Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts",
    shortTitle: "Step targets differ before and after 60",
    topic: "Cardio",
    evidenceType: "Meta-analysis of 15 cohorts",
    year: "2022",
    journal: "Lancet Public Health",
    authors: "Paluch et al.",
    pubmedId: "35247352",
    doi: "10.1016/S2468-2667(21)00302-9",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/35247352/",
    doiUrl: "https://doi.org/10.1016/S2468-2667(21)00302-9",
    origin: "site_backfill",
    coachTakeaway:
      "Under 60, aim for 8,000 to 10,000 steps a day. Over 60, 6,000 to 8,000 already gets most of the benefit. Pick the range for your age and build toward it a week at a time.",
    claimGuardrail:
      "Observational data from 47,471 adults. It links more steps to lower risk of death; it does not prove steps alone caused the difference.",
    contentAngles: [
      "Your step goal depends on your age",
      "Why under-60 men should aim higher",
      "Build steps a week at a time",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/for/men-over-40",
      "/blog/what-eight-hours-of-sitting-actually-does-to-your-body",
    ],
    keywords: ["steps per day", "steps by age", "daily steps", "walking", "mortality"],
    quickAnswer:
      "Paluch et al. (2022, Lancet Public Health, PMID 35247352) combined 15 cohorts covering 47,471 adults. Risk of death kept falling as steps rose until about 6,000 to 8,000 steps a day in adults 60 and older, and 8,000 to 10,000 steps a day in adults under 60. The top quarter (about 10,900 steps) had a 53% lower risk than the bottom quarter (about 3,500 steps).",
  },
  {
    id: "daily-steps-mortality-cvd-jacc-2023",
    title: "Relationship of Daily Step Counts to All-Cause Mortality and Cardiovascular Events",
    shortTitle: "Benefits start around 2,600 steps a day",
    topic: "Cardio",
    evidenceType: "Systematic review and dose-response meta-analysis",
    year: "2023",
    journal: "Journal of the American College of Cardiology",
    authors: "Stens et al.",
    pubmedId: "37676198",
    doi: "10.1016/j.jacc.2023.07.029",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37676198/",
    doiUrl: "https://doi.org/10.1016/j.jacc.2023.07.029",
    origin: "site_backfill",
    coachTakeaway:
      "Even a small bump from a very low baseline counts. Then walk with some pace: a brisker cadence was linked to extra benefit on top of the step count.",
    claimGuardrail:
      "Pooled observational data from 111,309 people. Results varied by device, with stronger associations for hip-worn accelerometers than pedometers or wrist trackers.",
    contentAngles: [
      "Every step off the couch counts",
      "Walk like you have somewhere to be",
      "The heart benefit peaks earlier than you think",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/how-to-lose-belly-fat-sitting-all-day",
    ],
    keywords: ["steps per day", "cadence", "walking pace", "heart health", "cardiovascular"],
    quickAnswer:
      "Stens et al. (2023, JACC, PMID 37676198) analysed 12 studies and 111,309 people. Compared with 2,000 steps a day, benefits became significant at about 2,600 steps for mortality and 2,800 for heart disease, and kept improving up to about 8,800 and 7,200 steps respectively. A moderate-to-fast walking cadence added benefit beyond total steps.",
  },
  {
    id: "step-count-mortality-meta-2023",
    title:
      "The association between daily step count and all-cause and cardiovascular mortality: a meta-analysis",
    shortTitle: "Every extra 1,000 steps counts",
    topic: "Cardio",
    evidenceType: "Meta-analysis of 17 cohorts",
    year: "2023",
    journal: "European Journal of Preventive Cardiology",
    authors: "Banach et al.",
    pubmedId: "37555441",
    doi: "10.1093/eurjpc/zwad229",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37555441/",
    doiUrl: "https://doi.org/10.1093/eurjpc/zwad229",
    origin: "site_backfill",
    coachTakeaway:
      "Stop treating steps as pass or fail. Adding 1,000 a day, about ten minutes of walking, is a real upgrade even if you never hit a round number.",
    claimGuardrail:
      "Observational cohorts from 226,889 people; the per-1,000-step figure is an average association, not a guaranteed individual result.",
    contentAngles: [
      "1,000 more steps beats a perfect goal you skip",
      "Ten minutes of walking is a real upgrade",
      "Stop treating steps as pass or fail",
    ],
    relatedHrefs: [
      "/blog/standing-desk-vs-walking-pad",
      "/tools/daily-habit-tracker",
    ],
    keywords: ["1000 steps", "daily steps", "walking", "cardiovascular mortality"],
    quickAnswer:
      "Banach et al. (2023, European Journal of Preventive Cardiology, PMID 37555441) pooled 17 cohorts with 226,889 people followed for a median of 7.1 years. Each extra 1,000 steps a day was linked to a 15% lower risk of death from any cause, and each extra 500 steps to a 7% lower risk of cardiovascular death.",
  },
  {
    id: "step-count-intensity-mortality-jama-2020",
    title: "Association of Daily Step Count and Step Intensity With Mortality Among US Adults",
    shortTitle: "8,000 steps beat 4,000, pace aside",
    topic: "Cardio",
    evidenceType: "Prospective cohort study",
    year: "2020",
    journal: "JAMA",
    authors: "Saint-Maurice et al.",
    pubmedId: "32207799",
    doi: "10.1001/jama.2020.1382",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/32207799/",
    doiUrl: "https://doi.org/10.1001/jama.2020.1382",
    origin: "site_backfill",
    coachTakeaway:
      "Total volume is the lever. If you only have one thing to track, track daily steps, not how fast each one was.",
    claimGuardrail:
      "A single US cohort of 4,840 adults with about a week of accelerometer data; association, not causation.",
    contentAngles: [
      "Volume first, speed second",
      "Doubling your steps changes the picture",
      "Track one number: daily steps",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/resources/busy-guy-training-plan",
    ],
    keywords: ["8000 steps", "step intensity", "daily steps", "walking", "mortality"],
    quickAnswer:
      "Saint-Maurice et al. (2020, JAMA, PMID 32207799) followed 4,840 US adults who wore accelerometers. Taking 8,000 steps a day was linked to significantly lower mortality than 4,000. Once total steps were accounted for, step intensity was not significantly linked to mortality.",
  },
  {
    id: "step-volume-intensity-older-women-2019",
    title: "Association of Step Volume and Intensity With All-Cause Mortality in Older Women",
    shortTitle: "Where the 10,000-step myth breaks",
    topic: "Cardio",
    evidenceType: "Prospective cohort study",
    year: "2019",
    journal: "JAMA Internal Medicine",
    authors: "Lee et al.",
    pubmedId: "31141585",
    doi: "10.1001/jamainternmed.2019.0899",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/31141585/",
    doiUrl: "https://doi.org/10.1001/jamainternmed.2019.0899",
    origin: "site_backfill",
    coachTakeaway:
      "10,000 is a round number, not a research threshold. The benefit here flattened around 7,500, so pick a target you will actually hit every day.",
    claimGuardrail:
      "The study followed women around age 72. It is useful for showing the curve flattens, but do not apply its exact numbers to younger men.",
    contentAngles: [
      "10,000 steps is a round number, not science",
      "The benefit curve flattens",
      "Pick a target you will actually hit",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/standing-desk-vs-walking-pad",
    ],
    keywords: ["10000 steps myth", "daily steps", "walking", "mortality", "older adults"],
    quickAnswer:
      "Lee et al. (2019, JAMA Internal Medicine, PMID 31141585) followed 16,741 women with a mean age of 72. About 4,400 steps a day was linked to lower mortality than about 2,700, and the benefit kept rising before leveling off around 7,500 steps a day. Step intensity was not clearly linked to mortality after accounting for total steps.",
  },
  {
    id: "daily-steps-dementia-uk-2022",
    title:
      "Association of Daily Step Count and Intensity With Incident Dementia in 78 430 Adults Living in the UK",
    shortTitle: "Steps and lower dementia risk",
    topic: "Anti-aging",
    evidenceType: "Prospective cohort study",
    year: "2022",
    journal: "JAMA Neurology",
    authors: "Del Pozo Cruz et al.",
    pubmedId: "36066874",
    doi: "10.1001/jamaneurol.2022.2672",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/36066874/",
    doiUrl: "https://doi.org/10.1001/jamaneurol.2022.2672",
    origin: "site_backfill",
    coachTakeaway:
      "Walking is brain training you can do on a phone call. Close to 10,000 steps was linked to the lowest dementia risk, and brisker steps showed stronger links.",
    claimGuardrail:
      "Observational UK Biobank data; it links steps to lower dementia risk but cannot prove walking prevents dementia.",
    contentAngles: [
      "Your steps are also for your brain",
      "Take the call on a walk",
      "Brisk beats slow for the brain too",
    ],
    relatedHrefs: [
      "/for/men-over-40",
      "/blog/what-eight-hours-of-sitting-actually-does-to-your-body",
    ],
    keywords: ["steps and dementia", "brain health", "daily steps", "walking", "aging"],
    quickAnswer:
      "Del Pozo Cruz et al. (2022, JAMA Neurology, PMID 36066874) followed 78,430 UK adults for about 7 years. The lowest dementia risk was seen at about 9,800 steps a day (49% lower), and about 3,800 steps a day captured half of that benefit. Steps taken at higher intensity showed stronger associations.",
  },
  {
    id: "neat-resistance-to-fat-gain-1999",
    title: "Role of nonexercise activity thermogenesis in resistance to fat gain in humans",
    shortTitle: "Everyday movement decides fat gain",
    topic: "Cardio",
    evidenceType: "Controlled overfeeding study",
    year: "1999",
    journal: "Science",
    authors: "Levine et al.",
    pubmedId: "9880251",
    doi: "10.1126/science.283.5399.212",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/9880251/",
    doiUrl: "https://doi.org/10.1126/science.283.5399.212",
    origin: "site_backfill",
    coachTakeaway:
      "The movement outside the gym, walking, standing, pacing, is a bigger fat-loss lever than most guys think. Steps are the easiest way to track it.",
    claimGuardrail:
      "Sixteen non-obese volunteers were overfed for 8 weeks. The study is about resisting fat gain while overeating, not about fat loss while dieting.",
    contentAngles: [
      "Your non-gym hours matter more than you think",
      "Why some people eat more and stay lean",
      "Steps are the easiest way to track everyday movement",
    ],
    relatedHrefs: [
      "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
      "/blog/standing-desk-vs-walking-pad",
    ],
    keywords: ["NEAT", "non-exercise activity thermogenesis", "fat gain", "daily movement", "steps"],
    quickAnswer:
      "Levine et al. (1999, Science, PMID 9880251) overfed 16 non-obese volunteers by 1,000 calories a day for 8 weeks. Two-thirds of the rise in daily energy burn came from non-exercise activity (NEAT): fidgeting, posture and everyday movement. Differences in NEAT explained a 10-fold difference in how much fat people stored.",
  },
  {
    id: "walking-leg-muscle-hypertrophy-review-2013",
    title: "Possibility of leg muscle hypertrophy by ambulation in older adults: a brief review",
    shortTitle: "Can walking build leg muscle?",
    topic: "Fitness",
    evidenceType: "Narrative review",
    year: "2013",
    journal: "Clinical Interventions in Aging",
    authors: "Ozaki et al.",
    pubmedId: "23573066",
    doi: "10.2147/CIA.S43837",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/23573066/",
    doiUrl: "https://doi.org/10.2147/CIA.S43837",
    origin: "site_backfill",
    coachTakeaway:
      "Walking can add some leg muscle when you are older or starting from low activity. It does not replace lifting: walk for health and fat loss, lift to build muscle.",
    claimGuardrail:
      "This review covers older adults only. Do not extend it to younger or already-trained men without separate evidence.",
    contentAngles: [
      "Does walking build muscle? Sometimes",
      "Walk for health, lift for muscle",
      "Why walking helps more after 50",
    ],
    relatedHrefs: [
      "/for/men-over-40",
      "/resources/busy-guy-training-plan",
    ],
    keywords: ["does walking build muscle", "walking", "leg muscle", "hypertrophy", "older adults"],
    quickAnswer:
      "Ozaki et al. (2013, Clinical Interventions in Aging, PMID 23573066) reviewed whether walking can build leg muscle in older adults. Walking, jogging or intermittent running for over six months can increase leg muscle size in older adults, and daily moderate-intensity walking was linked to larger, stronger lower-body muscles. The evidence is limited to older adults.",
  },
  {
    id: "how-many-steps-enough-adults-2011",
    title: "How many steps/day are enough? For adults",
    shortTitle: "7,000-8,000 steps meets the guideline",
    topic: "Cardio",
    evidenceType: "Expert review",
    year: "2011",
    journal: "International Journal of Behavioral Nutrition and Physical Activity",
    authors: "Tudor-Locke et al.",
    pubmedId: "21798015",
    doi: "10.1186/1479-5868-8-79",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/21798015/",
    doiUrl: "https://doi.org/10.1186/1479-5868-8-79",
    origin: "site_backfill",
    coachTakeaway:
      "If you hit 7,000 to 8,000 steps most days, you are roughly covering the minimum activity guideline without a single gym session. Lifting then comes on top.",
    claimGuardrail:
      "A translation of time-based guidelines into steps, not an outcome trial. It sets a minimum, not an ideal.",
    contentAngles: [
      "The guideline in steps, not minutes",
      "Your minimum is 7,000 to 8,000",
      "Steps cover cardio, lifting still comes on top",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/tools/daily-habit-tracker",
    ],
    keywords: ["how many steps a day", "steps guideline", "150 minutes", "daily steps", "walking"],
    quickAnswer:
      "Tudor-Locke et al. (2011, IJBNPA, PMID 21798015) translated physical activity guidelines into steps. Estimates that include normal daily activity equal 7,100 to 11,000 steps a day, and the minimum amount of moderate activity people accumulate in daily life works out to about 7,000 to 8,000 steps a day.",
  },
  {
    id: "who-2020-physical-activity-guidelines",
    title: "World Health Organization 2020 guidelines on physical activity and sedentary behaviour",
    shortTitle: "WHO: 150-300 active minutes a week",
    topic: "Cardio",
    evidenceType: "International guideline",
    year: "2020",
    journal: "British Journal of Sports Medicine",
    authors: "Bull et al.",
    pubmedId: "33239350",
    doi: "10.1136/bjsports-2020-102955",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/33239350/",
    doiUrl: "https://doi.org/10.1136/bjsports-2020-102955",
    origin: "site_backfill",
    coachTakeaway:
      "The official baseline for adults is 150 to 300 minutes of moderate activity a week plus regular muscle-strengthening work. Daily walking is the easiest way to cover the first part.",
    claimGuardrail:
      "Population guidelines set a baseline for health; they are not a personal fat-loss or muscle-building prescription.",
    contentAngles: [
      "What WHO actually recommends",
      "Walk most days, lift regularly",
      "Sitting less counts too",
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/what-eight-hours-of-sitting-actually-does-to-your-body",
    ],
    keywords: ["WHO guidelines", "150 minutes", "physical activity guidelines", "sedentary", "walking"],
  },
];

export const backfilledScienceStudies: ScienceStudy[] = [
  ...baseScienceStudies,
  ...socialScienceStudies,
];

export const scienceLibraryTopics = [
  "All",
  "Anti-aging",
  "Cardio",
  "Cravings",
  "Fitness",
  "Nutrition",
  "Peptides",
  "Sleep",
  "Supplements",
] as const;

export function studiesByTopic(topic: (typeof scienceLibraryTopics)[number]) {
  if (topic === "All") return backfilledScienceStudies;
  return backfilledScienceStudies.filter((study) => study.topic === topic);
}

export function scienceStudyById(id: string) {
  return backfilledScienceStudies.find((study) => study.id === id);
}

export function scienceStudyUrl(study: ScienceStudy) {
  return `https://gainsfromgeebs.com/science/studies/${study.id}`;
}

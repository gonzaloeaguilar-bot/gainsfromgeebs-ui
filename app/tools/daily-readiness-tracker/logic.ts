export type SleepDuration = "under_6" | "6_to_7" | "7_to_8" | "over_8";
export type SleepQuality = "poor" | "fair" | "good" | "excellent";
export type MuscleSoreness = "none" | "mild" | "moderate" | "severe";
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;
export type JointComfort = "stiff" | "moderate" | "good";
export type NutritionHydration = "poor" | "moderate" | "optimal";
export type StressLevel = "high" | "moderate" | "low";

export interface ReadinessInputs {
  sleepHours: SleepDuration;
  sleepQuality: SleepQuality;
  muscleSoreness: MuscleSoreness;
  energyLevel: EnergyLevel;
  jointComfort: JointComfort;
  nutritionHydration: NutritionHydration;
  stressLevel: StressLevel;
}

export interface ReadinessScoreResult {
  totalScore: number;
  tier: "optimal" | "moderate" | "reduced" | "recovery";
  tierLabel: string;
  trainingGuidance: string;
  rpeRecommendation: string;
  categoryScores: {
    sleep: { score: number; max: number; pct: number };
    muscleAndJoints: { score: number; max: number; pct: number };
    energy: { score: number; max: number; pct: number };
    lifestyle: { score: number; max: number; pct: number };
  };
  primaryLimiter: string;
  actionableAdjustment: string;
}

export interface RotatingReadinessTip {
  dayName: string;
  topic: string;
  tip: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const ROTATING_READINESS_TIPS: RotatingReadinessTip[] = [
  {
    dayName: "Sunday Focus",
    topic: "Central Nervous System (CNS) Recovery & Rest Days",
    tip: "Heavy compound lifting creates systemic fatigue in the central nervous system that takes 48–72 hours to fully dissipate. Taking designated rest days maintains long-term neuromuscular recruitment efficiency.",
    sourceLabel: "Magnesium & Muscle Recovery",
    sourceUrl: "/nutrition/magnesium-sleep",
  },
  {
    dayName: "Monday Focus",
    topic: "Sleep Deprivation & Muscle Protein Synthesis",
    tip: "Restricting sleep to under 6 hours impairs skeletal muscle protein synthesis and reduces testosterone expression while elevating cortisol, reducing training adaptation capacity.",
    sourceLabel: "Sleep Architecture & Recovery",
    sourceUrl: "/nutrition/melatonin-sleep-architecture",
  },
  {
    dayName: "Tuesday Focus",
    topic: "Intra-Workout Hydration & Strength Retention",
    tip: "A fluid deficit of just 2% body mass reduces voluntary muscle strength and accelerates perceived exertion during resistance training. Ensuring adequate fluid intake restores neuromuscular power.",
    sourceLabel: "Daily Hydration Tracker",
    sourceUrl: "/tools/daily-hydration-tracker",
  },
  {
    dayName: "Wednesday Focus",
    topic: "Delayed Onset Muscle Soreness (DOMS) vs Systemic Fatigue",
    tip: "Local muscle soreness reflects microtrauma and inflammatory remodeling rather than systemic central fatigue. Mild soreness is safe to train through; severe soreness warrants modifying exercise selection.",
    sourceLabel: "Tart Cherry Juice & Muscle Recovery",
    sourceUrl: "/nutrition/tart-cherry-juice-recovery",
  },
  {
    dayName: "Thursday Focus",
    topic: "Protein Distribution & Overnight Tissue Repair",
    tip: "Distributing protein across 3 to 5 distinct daily meals (0.4–0.5g/kg per meal) maintains continuous amino acid availability for overnight muscle repair and recovery.",
    sourceLabel: "Daily Protein Tracker",
    sourceUrl: "/tools/daily-protein-tracker",
  },
  {
    dayName: "Friday Focus",
    topic: "Autoregulation & RPE During Fatigue",
    tip: "Using Rating of Perceived Exertion (RPE) allows you to adjust daily loads according to real-time readiness. Leaving 1–2 reps in reserve (RIR) sustains progressive overload without burning out.",
    sourceLabel: "Training Intensity & Progression Guide",
    sourceUrl: "/blog/are-you-training-hard-enough",
  },
  {
    dayName: "Saturday Focus",
    topic: "Active Recovery & Low-Intensity Movement",
    tip: "Low-intensity movement (such as zone 2 walking or easy cycling) increases capillary blood flow to recovering tissues without adding additional mechanical damage or systemic fatigue.",
    sourceLabel: "Cardio & Longevity Research",
    sourceUrl: "/science/cardio-longevity-studies",
  },
];

export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateReadinessScore(inputs: ReadinessInputs): ReadinessScoreResult {
  // 1. Sleep score (max 30 points)
  let sleepHoursPoints = 18;
  if (inputs.sleepHours === "under_6") sleepHoursPoints = 6;
  else if (inputs.sleepHours === "6_to_7") sleepHoursPoints = 12;
  else if (inputs.sleepHours === "7_to_8") sleepHoursPoints = 18;
  else if (inputs.sleepHours === "over_8") sleepHoursPoints = 20;

  let sleepQualityPoints = 8;
  if (inputs.sleepQuality === "poor") sleepQualityPoints = 2;
  else if (inputs.sleepQuality === "fair") sleepQualityPoints = 5;
  else if (inputs.sleepQuality === "good") sleepQualityPoints = 8;
  else if (inputs.sleepQuality === "excellent") sleepQualityPoints = 10;

  const sleepScore = sleepHoursPoints + sleepQualityPoints; // 8 to 30

  // 2. Muscle & Joint Recovery (max 25 points)
  let sorenessPoints = 16;
  if (inputs.muscleSoreness === "severe") sorenessPoints = 4;
  else if (inputs.muscleSoreness === "moderate") sorenessPoints = 10;
  else if (inputs.muscleSoreness === "mild") sorenessPoints = 15;
  else if (inputs.muscleSoreness === "none") sorenessPoints = 18;

  let jointPoints = 6;
  if (inputs.jointComfort === "stiff") jointPoints = 2;
  else if (inputs.jointComfort === "moderate") jointPoints = 5;
  else if (inputs.jointComfort === "good") jointPoints = 7;

  const muscleJointScore = sorenessPoints + jointPoints; // 6 to 25

  // 3. Systemic Energy & CNS (max 25 points)
  const energyScore = inputs.energyLevel * 5; // 5 to 25

  // 4. Lifestyle & Fueling (max 20 points)
  let nutritionPoints = 8;
  if (inputs.nutritionHydration === "poor") nutritionPoints = 3;
  else if (inputs.nutritionHydration === "moderate") nutritionPoints = 6;
  else if (inputs.nutritionHydration === "optimal") nutritionPoints = 10;

  let stressPoints = 8;
  if (inputs.stressLevel === "high") stressPoints = 3;
  else if (inputs.stressLevel === "moderate") stressPoints = 7;
  else if (inputs.stressLevel === "low") stressPoints = 10;

  const lifestyleScore = nutritionPoints + stressPoints; // 6 to 20

  const totalScore = Math.max(0, Math.min(100, sleepScore + muscleJointScore + energyScore + lifestyleScore));

  const sleepPct = Math.round((sleepScore / 30) * 100);
  const muscleJointPct = Math.round((muscleJointScore / 25) * 100);
  const energyPct = Math.round((energyScore / 25) * 100);
  const lifestylePct = Math.round((lifestyleScore / 20) * 100);

  let tier: ReadinessScoreResult["tier"] = "moderate";
  let tierLabel = "Standard Volume & Steady Progression";
  let trainingGuidance = "Training capacity is solid. Complete your scheduled session with standard working sets, keeping 1–2 reps in reserve.";
  let rpeRecommendation = "Target RPE 7.5–8.5 (1–2 reps in reserve on working sets)";

  if (totalScore >= 85) {
    tier = "optimal";
    tierLabel = "Optimal Readiness & Peak Capacity";
    trainingGuidance = "High recovery capacity. Green light for progressive overload, heavy compound lifts, or testing top working sets.";
    rpeRecommendation = "Target RPE 8.0–9.0 (0–2 reps in reserve on primary movements)";
  } else if (totalScore >= 70) {
    tier = "moderate";
    tierLabel = "Standard Volume & Steady Progression";
    trainingGuidance = "Training capacity is solid. Complete your scheduled session with standard working sets, keeping 1–2 reps in reserve.";
    rpeRecommendation = "Target RPE 7.5–8.5 (1–2 reps in reserve on working sets)";
  } else if (totalScore >= 50) {
    tier = "reduced";
    tierLabel = "Moderate Load & Technical Focus";
    trainingGuidance = "Elevated systemic fatigue. Consider reducing total working sets by 20–30% or substituting heavy axial loads with machines.";
    rpeRecommendation = "Target RPE 6.5–7.5 (2–3 reps in reserve; avoid sets to muscular failure)";
  } else {
    tier = "recovery";
    tierLabel = "Recovery Priority or Deload";
    trainingGuidance = "High cumulative fatigue detected. Prioritize active recovery, 30–45 minutes of light zone 2 walking, mobility work, or an extra rest day.";
    rpeRecommendation = "Active recovery, light mobility, or RPE <6 (restorative movement only)";
  }

  // Find lowest category percentage as primary limiter
  const categories = [
    { name: "Sleep & Circadian Recovery", pct: sleepPct, tip: "Sleep duration or restfulness was low. Extend rest intervals to 2.5–3 minutes between heavy sets and plan an earlier bedtime tonight." },
    { name: "Muscle & Joint Recovery", pct: muscleJointPct, tip: "Elevated muscle soreness or joint stiffness. Add 5–8 minutes of targeted dynamic warm-up sets and prioritize hydration." },
    { name: "Energy & Central Nervous System", pct: energyPct, tip: "Systemic energy is depressed. Autoregulate daily weights based on bar speed rather than forcing fixed numbers." },
    { name: "Fueling & Lifestyle Stress", pct: lifestylePct, tip: "Nutrition, hydration, or daily stress is lagging. Consume 20–30g of protein with 16 oz of water before lifting." },
  ];

  categories.sort((a, b) => a.pct - b.pct);
  const primaryLimiter = categories[0].name;
  const actionableAdjustment = categories[0].tip;

  return {
    totalScore,
    tier,
    tierLabel,
    trainingGuidance,
    rpeRecommendation,
    categoryScores: {
      sleep: { score: sleepScore, max: 30, pct: sleepPct },
      muscleAndJoints: { score: muscleJointScore, max: 25, pct: muscleJointPct },
      energy: { score: energyScore, max: 25, pct: energyPct },
      lifestyle: { score: lifestyleScore, max: 20, pct: lifestylePct },
    },
    primaryLimiter,
    actionableAdjustment,
  };
}

export function calculateReadinessStreak(
  history: Record<string, number>,
  todayKey: string = getTodayKey()
): {
  currentStreak: number;
  totalLoggedDays: number;
  sevenDayAverage: number;
  optimalDays: number;
} {
  const loggedKeys = Object.keys(history).filter((k) => history[k] > 0);
  const totalLoggedDays = loggedKeys.length;
  const optimalDays = Object.values(history).filter((score) => score >= 70).length;

  let currentStreak = 0;
  const [todayY, todayM, todayD] = todayKey.split("-").map(Number);
  const checkDate = new Date(todayY, todayM - 1, todayD);

  const todayLogged = (history[todayKey] || 0) > 0;
  if (!todayLogged) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const key = getTodayKey(checkDate);
    if ((history[key] || 0) > 0) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // 7-day average
  let sum = 0;
  let count = 0;
  const avgDate = new Date(todayY, todayM - 1, todayD);
  for (let i = 0; i < 7; i++) {
    const k = getTodayKey(avgDate);
    if (k in history && history[k] > 0) {
      sum += history[k];
      count += 1;
    }
    avgDate.setDate(avgDate.getDate() - 1);
  }

  const currentScore = history[todayKey] || 0;
  const sevenDayAverage = count > 0 ? Math.round(sum / count) : currentScore;

  return {
    currentStreak,
    totalLoggedDays,
    sevenDayAverage,
    optimalDays,
  };
}

export function getRotatingReadinessTip(date: Date = new Date()): RotatingReadinessTip {
  const dayIndex = date.getDay();
  return ROTATING_READINESS_TIPS[dayIndex] || ROTATING_READINESS_TIPS[0];
}

export function formatDailyReadinessSummary(
  result: ReadinessScoreResult,
  streak: number,
  sevenDayAvg: number,
  dateKey: string = getTodayKey()
): string {
  const lines = [
    `Daily Workout Readiness Check-In — ${dateKey}`,
    `Readiness Score: ${result.totalScore}/100 (${result.tierLabel})`,
    `Training Recommendation: ${result.rpeRecommendation}`,
    `Active Check-In Streak: ${streak} day${streak === 1 ? "" : "s"} · 7-Day Average: ${sevenDayAvg}/100`,
    "",
    "Category Breakdown:",
    `• Sleep & Rest: ${result.categoryScores.sleep.score}/${result.categoryScores.sleep.max} (${result.categoryScores.sleep.pct}%)`,
    `• Muscle & Joints: ${result.categoryScores.muscleAndJoints.score}/${result.categoryScores.muscleAndJoints.max} (${result.categoryScores.muscleAndJoints.pct}%)`,
    `• Systemic Energy: ${result.categoryScores.energy.score}/${result.categoryScores.energy.max} (${result.categoryScores.energy.pct}%)`,
    `• Lifestyle & Fueling: ${result.categoryScores.lifestyle.score}/${result.categoryScores.lifestyle.max} (${result.categoryScores.lifestyle.pct}%)`,
    "",
    `Recovery Action: ${result.actionableAdjustment}`,
    "",
    "Tracked via Gains from Geebs Daily Readiness Tracker (https://gainsfromgeebs.com/tools/daily-readiness-tracker)",
  ];
  return lines.join("\n");
}

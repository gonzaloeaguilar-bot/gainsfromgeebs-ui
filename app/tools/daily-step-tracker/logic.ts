export type StepGoalType = "recomp" | "fat_loss" | "maintenance" | "cardio_health" | "custom";
export type WeightUnit = "lbs" | "kg";
export type BaselineActivity = "sedentary" | "light" | "moderate";

export interface StepPacingSlot {
  id: string;
  name: string;
  subtitle: string;
  targetSteps: number;
  loggedSteps: number;
}

export interface StepTrackerInputs {
  bodyWeight: number;
  unit: WeightUnit;
  goalType: StepGoalType;
  customTarget: number;
  baselineActivity: BaselineActivity;
}

export interface StepCalculationResult {
  dailyStepTarget: number;
  neatCaloriesBurned: number;
  targetNeatCalories: number;
  progressPct: number;
  tier: "starting" | "progressing" | "goal_reached" | "surpassed";
  tierLabel: string;
  pacingSlots: StepPacingSlot[];
}

export interface StreakInfo {
  currentStreak: number;
  totalLoggedDays: number;
  totalGoalDays: number;
  sevenDayAverage: number;
  totalStepsLogged: number;
}

export interface RotatingStepTip {
  dayName: string;
  topic: string;
  tip: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const ROTATING_STEP_TIPS: RotatingStepTip[] = [
  {
    dayName: "Sunday Focus",
    topic: "Weekly Step Consistency & NEAT Baseline",
    tip: "Non-Exercise Activity Thermogenesis (NEAT) accounts for up to 15-30% of daily energy expenditure. Hitting consistent daily step minimums avoids large metabolic expenditure swings between weekdays and weekends.",
    sourceLabel: "Calorie Deficit & Energy Balance Guide",
    sourceUrl: "/guides/how-many-calories-should-a-man-eat-to-lose-weight",
  },
  {
    dayName: "Monday Focus",
    topic: "Postprandial Walking & Glucose Disposal",
    tip: "A 10-15 minute walk immediately following a carbohydrate-containing meal increases GLUT4 translocation in skeletal muscle, lowering postprandial blood glucose and insulin spikes without systemic fatigue.",
    sourceLabel: "Nutrient Partitioning & Timing",
    sourceUrl: "/science/eating-late-at-night-weight-gain-myth",
  },
  {
    dayName: "Tuesday Focus",
    topic: "Step Volume & All-Cause Mortality",
    tip: "Meta-analyses demonstrate substantial reductions in all-cause cardiovascular mortality as daily steps increase up to 7,500–10,000 steps per day, with diminishing returns beyond 12,000 steps for sedentary adults.",
    sourceLabel: "Cardio & Longevity Research",
    sourceUrl: "/science/cardio-longevity-studies",
  },
  {
    dayName: "Wednesday Focus",
    topic: "Low-Impact Recovery vs HIIT Interference",
    tip: "Zone 1 walking does not produce central nervous system fatigue or muscle damage, making it the ideal activity to elevate caloric expenditure during a fat loss phase without impairing heavy resistance training.",
    sourceLabel: "Cardio vs Weights for Fat Loss",
    sourceUrl: "/science/questions/cardio-or-weights-for-fat-loss",
  },
  {
    dayName: "Thursday Focus",
    topic: "Breaking Up Prolonged Sedentary Time",
    tip: "Accumulating steps in brief 2-3 minute movement breaks every hour maintains endothelial function and metabolic rate better than sitting continuously for 8 hours followed by a single evening walk.",
    sourceLabel: "Standing Desk & Movement Strategy",
    sourceUrl: "/blog/standing-desk-vs-walking-pad",
  },
  {
    dayName: "Friday Focus",
    topic: "Step Target Autoregulation During Cuts",
    tip: "As body mass decreases during an extended calorie deficit, unconscious NEAT drops. Setting an explicit daily step floor prevents metabolic adaptation from stalling fat loss.",
    sourceLabel: "Fat Loss Plateau Troubleshooting",
    sourceUrl: "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
  },
  {
    dayName: "Saturday Focus",
    topic: "Hydration & Electrolytes During High Step Counts",
    tip: "Sustained daily walking above 10,000 steps increases fluid and sodium requirements, especially in warm environments. Balancing fluid intake supports neuromuscular recovery and cellular hydration.",
    sourceLabel: "Electrolytes & Energy Metabolism",
    sourceUrl: "/science/electrolytes-and-cognitive-energy",
  },
];

export function getTodayKey(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateDailyStepTarget(
  goalType: StepGoalType,
  baselineActivity: BaselineActivity,
  customTarget?: number
): number {
  if (goalType === "custom" && customTarget && customTarget > 0) {
    return Math.max(2000, Math.min(40000, Math.round(customTarget)));
  }

  let base = 8000;

  switch (goalType) {
    case "fat_loss":
      base = 10000;
      break;
    case "recomp":
      base = 8500;
      break;
    case "cardio_health":
      base = 10000;
      break;
    case "maintenance":
    default:
      base = 7500;
      break;
  }

  if (baselineActivity === "sedentary") {
    // Sedentary desk jobs: moderate initial ramp to prevent burnout
    base = Math.max(6500, base - 1000);
  } else if (baselineActivity === "moderate") {
    base += 1500;
  }

  return base;
}

export function estimateNeatCalories(steps: number, weightInLbs: number): number {
  if (steps <= 0 || weightInLbs <= 0) return 0;
  // Standard exercise science formula: ~0.04 to 0.05 kcal per step per 150 lbs of bodyweight
  // Kcal per step ≈ (weight in lbs / 150) * 0.042
  const kcalPerStep = (weightInLbs / 150) * 0.042;
  return Math.round(steps * kcalPerStep);
}

export function getPacingSlots(dailyTarget: number, loggedSteps: number = 0): StepPacingSlot[] {
  // Split daily target into 4 sensible daily pacing windows:
  // 1. Morning Routine (25%)
  // 2. Midday / Lunch Walk (30%)
  // 3. Evening / Post-Dinner (25%)
  // 4. Incidental Daily NEAT (20%)
  const morningTarget = Math.round(dailyTarget * 0.25);
  const lunchTarget = Math.round(dailyTarget * 0.3);
  const eveningTarget = Math.round(dailyTarget * 0.25);
  const incidentalTarget = dailyTarget - (morningTarget + lunchTarget + eveningTarget);

  return [
    {
      id: "morning",
      name: "Morning Movement",
      subtitle: "Morning walk or early commute",
      targetSteps: morningTarget,
      loggedSteps: 0,
    },
    {
      id: "lunch",
      name: "Midday & Lunch",
      subtitle: "Post-lunch walk or movement breaks",
      targetSteps: lunchTarget,
      loggedSteps: 0,
    },
    {
      id: "evening",
      name: "Evening Wind-Down",
      subtitle: "Post-dinner stroll or evening steps",
      targetSteps: eveningTarget,
      loggedSteps: 0,
    },
    {
      id: "incidental",
      name: "Incidental NEAT",
      subtitle: "Stairs, errands, and pacing",
      targetSteps: incidentalTarget,
      loggedSteps: 0,
    },
  ];
}

export function calculateStepProgress(
  inputs: StepTrackerInputs,
  currentSteps: number
): StepCalculationResult {
  const weightLbs =
    inputs.unit === "kg" ? Math.round(inputs.bodyWeight * 2.20462) : inputs.bodyWeight;

  const dailyStepTarget = calculateDailyStepTarget(
    inputs.goalType,
    inputs.baselineActivity,
    inputs.customTarget
  );

  const neatCaloriesBurned = estimateNeatCalories(currentSteps, weightLbs);
  const targetNeatCalories = estimateNeatCalories(dailyStepTarget, weightLbs);

  const progressPct = dailyStepTarget > 0 ? Math.min(100, Math.round((currentSteps / dailyStepTarget) * 100)) : 0;

  let tier: StepCalculationResult["tier"] = "starting";
  let tierLabel = "Getting Started";

  if (currentSteps >= dailyStepTarget * 1.15) {
    tier = "surpassed";
    tierLabel = "Target Exceeded (+15%)";
  } else if (currentSteps >= dailyStepTarget) {
    tier = "goal_reached";
    tierLabel = "Daily Target Reached";
  } else if (progressPct >= 50) {
    tier = "progressing";
    tierLabel = "Over Halfway";
  }

  const pacingSlots = getPacingSlots(dailyStepTarget, currentSteps);

  return {
    dailyStepTarget,
    neatCaloriesBurned,
    targetNeatCalories,
    progressPct,
    tier,
    tierLabel,
    pacingSlots,
  };
}

export function calculateStepStreak(
  history: Record<string, number>,
  targetSteps: number,
  todayKeyString: string
): StreakInfo {
  const dates = Object.keys(history).sort();
  if (dates.length === 0) {
    return {
      currentStreak: 0,
      totalLoggedDays: 0,
      totalGoalDays: 0,
      sevenDayAverage: 0,
      totalStepsLogged: 0,
    };
  }

  let totalStepsLogged = 0;
  let totalGoalDays = 0;
  const totalLoggedDays = dates.length;

  for (const date of dates) {
    const steps = history[date] || 0;
    totalStepsLogged += steps;
    // Count as goal day if reached >= 90% of daily target
    if (steps >= targetSteps * 0.9) {
      totalGoalDays += 1;
    }
  }

  // Calculate 7-day average from most recent 7 days up to today
  const [todayY, todayM, todayD] = todayKeyString.split("-").map(Number);
  const baseDate = new Date(todayY, todayM - 1, todayD);
  const last7Dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(todayY, todayM - 1, todayD - i);
    last7Dates.push(getTodayKey(d));
  }

  let last7Sum = 0;
  let last7Count = 0;
  for (const dStr of last7Dates) {
    if (history[dStr] !== undefined && history[dStr] > 0) {
      last7Sum += history[dStr];
      last7Count += 1;
    }
  }
  const sevenDayAverage = last7Count > 0 ? Math.round(last7Sum / last7Count) : 0;

  // Streak calculation: work backwards day by day from today
  let streak = 0;
  const checkDate = new Date(todayY, todayM - 1, todayD);

  // If today is not yet met (steps < 90% target), check if yesterday was met to keep streak alive
  const todaySteps = history[todayKeyString] || 0;
  const todayMet = todaySteps >= targetSteps * 0.9;

  if (!todayMet) {
    // Move checkDate to yesterday
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dStr = getTodayKey(checkDate);
    const steps = history[dStr] || 0;
    if (steps >= targetSteps * 0.9) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    currentStreak: streak,
    totalLoggedDays,
    totalGoalDays,
    sevenDayAverage,
    totalStepsLogged,
  };
}

export function getRotatingStepTip(d: Date = new Date()): RotatingStepTip {
  const dayIndex = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
  return ROTATING_STEP_TIPS[dayIndex % ROTATING_STEP_TIPS.length];
}

export function formatDailyStepSummary(
  inputs: StepTrackerInputs,
  stepsLogged: number,
  targetSteps: number,
  neatBurn: number,
  streak: number,
  sevenDayAvg: number,
  todayDateStr: string
): string {
  const pct = targetSteps > 0 ? Math.round((stepsLogged / targetSteps) * 100) : 0;
  return [
    `Daily Step & NEAT Log — ${todayDateStr}`,
    `Steps: ${stepsLogged.toLocaleString()} / ${targetSteps.toLocaleString()} (${pct}% of target)`,
    `Estimated NEAT Burn: ~${neatBurn.toLocaleString()} kcal`,
    `Active Streak: ${streak} day${streak === 1 ? "" : "s"}`,
    `7-Day Average: ${sevenDayAvg.toLocaleString()} steps/day`,
    `Goal Mode: ${inputs.goalType.replace("_", " ")}`,
    `Tracked via Gains from Geebs Daily Step Tracker (https://gainsfromgeebs.com/tools/daily-step-tracker)`,
  ].join("\n");
}

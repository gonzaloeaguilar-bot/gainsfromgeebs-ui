export type ProteinGoalTier = "recomp" | "hypertrophy" | "cutting" | "custom";
export type WeightUnit = "lbs" | "kg";
export type MealCount = 3 | 4 | 5;

export interface MealSlot {
  id: string;
  name: string;
  targetGrams: number;
  loggedGrams: number;
}

export interface ProteinTrackerState {
  bodyWeight: number;
  unit: WeightUnit;
  tier: ProteinGoalTier;
  customTarget: number;
  mealCount: MealCount;
  dailyTarget: number;
  loggedMeals: Record<string, number>;
  history: Record<string, number>;
}

export interface RotatingTip {
  dayName: string;
  topic: string;
  tip: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const ROTATING_PROTEIN_TIPS: RotatingTip[] = [
  {
    dayName: "Sunday Focus",
    topic: "Weekly Protein Consistency",
    tip: "Hitting your daily protein target across all 7 days prevents weekday-weekend intake fluctuations. Keeping high-protein staples ready reduces daily meal planning friction.",
    sourceLabel: "Nutrition & Muscle Recovery",
    sourceUrl: "/science/how-much-protein-per-kg",
  },
  {
    dayName: "Monday Focus",
    topic: "Protein Pacing & Distribution",
    tip: "Distributing protein across 3 to 5 meals stimulates muscle protein synthesis (MPS) multiple times throughout the day compared to consuming the majority of your intake in a single sitting.",
    sourceLabel: "Protein Distribution Meta-Analysis",
    sourceUrl: "/science/meal-frequency-for-muscle-after-40",
  },
  {
    dayName: "Tuesday Focus",
    topic: "The Leucine Threshold",
    tip: "Each meal ideally contains 2.5g to 3.0g of leucine (roughly 25g to 40g of high-quality complete protein) to fully trigger the mTOR pathway and maximize anabolic signaling.",
    sourceLabel: "Anabolic Signaling Evidence",
    sourceUrl: "/science/anabolic-window-protein-timing-myth",
  },
  {
    dayName: "Wednesday Focus",
    topic: "Whole Food Thermic Effect",
    tip: "Whole food protein sources (poultry, fish, lean beef, eggs, tofu) carry a higher thermic effect of food (TEF) and greater satiety per calorie than liquid shakes, making them ideal during fat loss phases.",
    sourceLabel: "Protein Powder vs Whole Food",
    sourceUrl: "/science/protein-powder-vs-whole-food-protein",
  },
  {
    dayName: "Thursday Focus",
    topic: "Preserving Lean Mass in a Deficit",
    tip: "During an energy deficit, protein requirements increase to 0.82–1.0g per pound (1.8–2.2g/kg) to protect skeletal muscle mass from breakdown while fat stores are oxidized.",
    sourceLabel: "Protein Intake for Body Recomposition",
    sourceUrl: "/resources/how-to-calculate-macros-for-body-recomposition",
  },
  {
    dayName: "Friday Focus",
    topic: "Peri-Workout Nutrient Timing",
    tip: "Consuming a balanced protein and carbohydrate meal within 2 to 3 hours before or after resistance training optimizes amino acid delivery to working muscle fibers.",
    sourceLabel: "Protein Timing Research",
    sourceUrl: "/science/anabolic-window-protein-timing-myth",
  },
  {
    dayName: "Saturday Focus",
    topic: "Satiety & Hunger Management",
    tip: "Protein is the most satiating macronutrient per calorie. Front-loading 30g+ of protein at your first meal helps stabilize appetite and reduce evening cravings.",
    sourceLabel: "High Protein Intake & Satiety",
    sourceUrl: "/guides/how-many-calories-should-a-man-eat-to-lose-weight",
  },
];

export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateDailyProteinTarget(
  bodyWeight: number,
  unit: WeightUnit,
  tier: ProteinGoalTier,
  customTarget: number = 150
): number {
  if (tier === "custom") {
    return Math.max(30, Math.min(400, Math.round(customTarget || 150)));
  }

  const weightLbs = unit === "kg" ? bodyWeight * 2.20462 : bodyWeight;
  const safeWeight = Math.max(80, Math.min(450, weightLbs));

  let multiplier = 0.82;
  if (tier === "hypertrophy") multiplier = 0.90;
  if (tier === "cutting") multiplier = 1.00;

  const calculated = Math.round(safeWeight * multiplier);
  return Math.max(50, Math.min(350, calculated));
}

export function getMealSlotDefinitions(
  dailyTarget: number,
  mealCount: MealCount
): MealSlot[] {
  if (mealCount === 3) {
    const p1 = Math.round(dailyTarget * 0.33);
    const p2 = Math.round(dailyTarget * 0.33);
    const p3 = dailyTarget - (p1 + p2);
    return [
      { id: "meal-1", name: "Meal 1 (Breakfast)", targetGrams: p1, loggedGrams: 0 },
      { id: "meal-2", name: "Meal 2 (Lunch)", targetGrams: p2, loggedGrams: 0 },
      { id: "meal-3", name: "Meal 3 (Dinner)", targetGrams: p3, loggedGrams: 0 },
    ];
  }

  if (mealCount === 4) {
    const p1 = Math.round(dailyTarget * 0.25);
    const p2 = Math.round(dailyTarget * 0.25);
    const p3 = Math.round(dailyTarget * 0.25);
    const p4 = dailyTarget - (p1 + p2 + p3);
    return [
      { id: "meal-1", name: "Meal 1 (Breakfast)", targetGrams: p1, loggedGrams: 0 },
      { id: "meal-2", name: "Meal 2 (Lunch)", targetGrams: p2, loggedGrams: 0 },
      { id: "meal-3", name: "Meal 3 (Post-Workout / Snack)", targetGrams: p3, loggedGrams: 0 },
      { id: "meal-4", name: "Meal 4 (Dinner)", targetGrams: p4, loggedGrams: 0 },
    ];
  }

  const p1 = Math.round(dailyTarget * 0.20);
  const p2 = Math.round(dailyTarget * 0.20);
  const p3 = Math.round(dailyTarget * 0.20);
  const p4 = Math.round(dailyTarget * 0.20);
  const p5 = dailyTarget - (p1 + p2 + p3 + p4);
  return [
    { id: "meal-1", name: "Meal 1 (Breakfast)", targetGrams: p1, loggedGrams: 0 },
    { id: "meal-2", name: "Meal 2 (Mid-Day)", targetGrams: p2, loggedGrams: 0 },
    { id: "meal-3", name: "Meal 3 (Pre/Post Workout)", targetGrams: p3, loggedGrams: 0 },
    { id: "meal-4", name: "Meal 4 (Dinner)", targetGrams: p4, loggedGrams: 0 },
    { id: "meal-5", name: "Meal 5 (Evening Snack)", targetGrams: p5, loggedGrams: 0 },
  ];
}

export function calculateStreak(
  history: Record<string, number>,
  dailyTarget: number,
  todayKey: string = getTodayKey()
): {
  currentStreak: number;
  totalGoalDays: number;
  totalLoggedDays: number;
  sevenDayAverage: number;
} {
  const entries = Object.values(history).filter((grams) => grams > 0);
  const totalLoggedDays = entries.length;

  const threshold = Math.max(1, Math.round(dailyTarget * 0.9));
  const goalDays = entries.filter((grams) => grams >= threshold);
  const totalGoalDays = goalDays.length;

  let currentStreak = 0;
  const [todayY, todayM, todayD] = todayKey.split("-").map(Number);
  const checkDate = new Date(todayY, todayM - 1, todayD);

  const todayLogged = history[todayKey] || 0;
  const todayMet = todayLogged >= threshold;

  if (!todayMet) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const key = getTodayKey(checkDate);
    const grams = history[key] || 0;
    if (grams >= threshold) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  let sevenDaySum = 0;
  let sevenDayCount = 0;
  const avgDate = new Date(todayY, todayM - 1, todayD);
  for (let i = 0; i < 7; i++) {
    const k = getTodayKey(avgDate);
    if (k in history) {
      sevenDaySum += history[k];
      sevenDayCount += 1;
    }
    avgDate.setDate(avgDate.getDate() - 1);
  }

  const sevenDayAverage = sevenDayCount > 0 ? Math.round(sevenDaySum / sevenDayCount) : todayLogged;

  return {
    currentStreak,
    totalGoalDays,
    totalLoggedDays,
    sevenDayAverage,
  };
}

export function getRotatingProteinTip(date: Date = new Date()): RotatingTip {
  const dayIndex = date.getDay();
  return ROTATING_PROTEIN_TIPS[dayIndex] || ROTATING_PROTEIN_TIPS[0];
}

export function formatDailyProteinSummary(
  currentGrams: number,
  targetGrams: number,
  meals: MealSlot[],
  streak: number,
  dateKey: string = getTodayKey()
): string {
  const pct = Math.round((currentGrams / (targetGrams || 1)) * 100);
  const lines = [
    `Daily Protein Log — ${dateKey}`,
    `Total: ${currentGrams}g / ${targetGrams}g (${pct}% of goal)`,
    `Active streak: ${streak} day${streak === 1 ? "" : "s"}`,
    "",
    "Meal Breakdown:",
    ...meals.map((m) => `• ${m.name}: ${m.loggedGrams}g / ${m.targetGrams}g target`),
    "",
    "Tracked via Gains from Geebs Daily Protein Tracker (https://gainsfromgeebs.com/tools/daily-protein-tracker)",
  ];
  return lines.join("\n");
}

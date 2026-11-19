export type HydrationUnit = "oz" | "ml";
export type WeightUnit = "lbs" | "kg";
export type ActivityLevel = "sedentary" | "moderate" | "intense";
export type ClimateFactor = "temperate" | "hot";

export interface HydrationSlot {
  id: string;
  name: string;
  subtitle: string;
  targetAmount: number;
  loggedAmount: number;
}

export interface RotatingHydrationTip {
  dayName: string;
  topic: string;
  tip: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const ROTATING_HYDRATION_TIPS: RotatingHydrationTip[] = [
  {
    dayName: "Sunday Focus",
    topic: "Daily Fluid Turnover & Cellular Balance",
    tip: "Maintaining adequate baseline fluid turnover supports cellular metabolic efficiency and nutrient delivery across training and rest days alike.",
    sourceLabel: "Electrolytes & Cellular Energy",
    sourceUrl: "/science/electrolytes-and-cognitive-energy",
  },
  {
    dayName: "Monday Focus",
    topic: "Creatine Monohydrate & Intracellular Water",
    tip: "Creatine increases intracellular water retention inside muscle fibers, drawing fluid into myocytes. Ensuring an extra 16 oz (500 ml) of fluid daily supports optimal creatine uptake.",
    sourceLabel: "Creatine Hydration & Performance",
    sourceUrl: "/science/creatine-and-hair-loss",
  },
  {
    dayName: "Tuesday Focus",
    topic: "Sodium, Potassium & Muscle Contraction",
    tip: "Action potentials in skeletal muscle depend on sodium and potassium gradients. Pairing adequate water with dietary sodium maintains neuromuscular firing capacity during heavy compound lifting.",
    sourceLabel: "Electrolytes & Performance Research",
    sourceUrl: "/science/electrolytes-and-cognitive-energy",
  },
  {
    dayName: "Wednesday Focus",
    topic: "Dehydration & Strength Output",
    tip: "A fluid deficit of just 2% of body mass can reduce 1RM strength output, power production, and training volume capacity while elevating perceived exertion.",
    sourceLabel: "Strength Plateau Troubleshooting",
    sourceUrl: "/guides/strength-training-plateau",
  },
  {
    dayName: "Thursday Focus",
    topic: "Evening Hydration Tapering & Sleep",
    tip: "Front-loading your daily fluid intake during daylight hours and tapering 1 to 2 hours before bed minimizes sleep disruptions from nighttime bathroom awakenings.",
    sourceLabel: "Sleep Architecture & Recovery",
    sourceUrl: "/nutrition/melatonin-sleep-architecture",
  },
  {
    dayName: "Friday Focus",
    topic: "Pre-Workout Plasma Volume & Pumps",
    tip: "Adequate hydration 60–90 minutes before training increases circulating blood plasma volume, enhancing muscular pump and vascular nutrient delivery during resistance sets.",
    sourceLabel: "Nitric Oxide & Plasma Volume",
    sourceUrl: "/nutrition/citrulline-malate-pump",
  },
  {
    dayName: "Saturday Focus",
    topic: "Magnesium & Sweat Electrolyte Balance",
    tip: "Heavy training in warm conditions depletes trace minerals alongside water. Consuming mineral-rich whole foods or magnesium supports cellular hydration and muscular relaxation.",
    sourceLabel: "Magnesium & Muscle Recovery",
    sourceUrl: "/nutrition/magnesium-sleep",
  },
];

export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateDailyHydrationTarget(
  bodyWeight: number,
  weightUnit: WeightUnit = "lbs",
  activityLevel: ActivityLevel = "moderate",
  climate: ClimateFactor = "temperate",
  takingCreatine: boolean = false,
  customTarget: number = 100,
  useCustomTarget: boolean = false,
  hydrationUnit: HydrationUnit = "oz"
): number {
  if (useCustomTarget) {
    if (hydrationUnit === "ml") {
      return Math.max(1200, Math.min(8000, Math.round(customTarget || 3000)));
    }
    return Math.max(40, Math.min(260, Math.round(customTarget || 100)));
  }

  const weightLbs = weightUnit === "kg" ? bodyWeight * 2.20462 : bodyWeight;
  const safeWeight = Math.max(80, Math.min(450, weightLbs));

  // Base: 0.55 oz per lb of body weight
  const baseOz = safeWeight * 0.55;

  let activityAddOz = 0;
  if (activityLevel === "moderate") activityAddOz = 16;
  if (activityLevel === "intense") activityAddOz = 32;

  const climateAddOz = climate === "hot" ? 12 : 0;
  const creatineAddOz = takingCreatine ? 16 : 0;

  const totalOz = Math.round(baseOz + activityAddOz + climateAddOz + creatineAddOz);
  const boundedOz = Math.max(45, Math.min(250, totalOz));

  if (hydrationUnit === "ml") {
    const rawMl = boundedOz * 29.5735;
    const roundedMl = Math.round(rawMl / 50) * 50;
    return Math.max(1300, Math.min(7500, roundedMl));
  }

  return boundedOz;
}

export function getHydrationSlotDefinitions(
  dailyTarget: number,
  hydrationUnit: HydrationUnit = "oz"
): HydrationSlot[] {
  const p1 = Math.round(dailyTarget * 0.25);
  const p2 = Math.round(dailyTarget * 0.30);
  const p3 = Math.round(dailyTarget * 0.30);
  const p4 = dailyTarget - (p1 + p2 + p3);

  const unitLabel = hydrationUnit;

  return [
    {
      id: "slot-morning",
      name: "Morning Rehydration",
      subtitle: `Waking window (target ~${p1}${unitLabel})`,
      targetAmount: p1,
      loggedAmount: 0,
    },
    {
      id: "slot-midday",
      name: "Pre-Workout & Mid-Day",
      subtitle: `Pre-training priming (target ~${p2}${unitLabel})`,
      targetAmount: p2,
      loggedAmount: 0,
    },
    {
      id: "slot-afternoon",
      name: "Post-Workout & Afternoon",
      subtitle: `Recovery & fluid balance (target ~${p3}${unitLabel})`,
      targetAmount: p3,
      loggedAmount: 0,
    },
    {
      id: "slot-evening",
      name: "Evening Wind-Down",
      subtitle: `Tapered intake (target ~${p4}${unitLabel})`,
      targetAmount: p4,
      loggedAmount: 0,
    },
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
  const entries = Object.values(history).filter((amount) => amount > 0);
  const totalLoggedDays = entries.length;

  const threshold = Math.max(1, Math.round(dailyTarget * 0.9));
  const goalDays = entries.filter((amount) => amount >= threshold);
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
    const amount = history[key] || 0;
    if (amount >= threshold) {
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

export function getRotatingHydrationTip(date: Date = new Date()): RotatingHydrationTip {
  const dayIndex = date.getDay();
  return ROTATING_HYDRATION_TIPS[dayIndex] || ROTATING_HYDRATION_TIPS[0];
}

export function formatDailyHydrationSummary(
  currentAmount: number,
  targetAmount: number,
  hydrationUnit: HydrationUnit,
  slots: HydrationSlot[],
  streak: number,
  dateKey: string = getTodayKey()
): string {
  const pct = Math.round((currentAmount / (targetAmount || 1)) * 100);
  const unit = hydrationUnit;
  const lines = [
    `Daily Hydration Log — ${dateKey}`,
    `Total: ${currentAmount}${unit} / ${targetAmount}${unit} (${pct}% of target)`,
    `Active streak: ${streak} day${streak === 1 ? "" : "s"}`,
    "",
    "Time Window Breakdown:",
    ...slots.map((s) => `• ${s.name}: ${s.loggedAmount}${unit} / ${s.targetAmount}${unit} target`),
    "",
    "Tracked via Gains from Geebs Daily Hydration Tracker (https://gainsfromgeebs.com/tools/daily-hydration-tracker)",
  ];
  return lines.join("\n");
}

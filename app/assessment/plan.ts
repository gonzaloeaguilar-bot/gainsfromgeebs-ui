/**
 * "Your plan" - the personal layer that sits under the assessment estimate.
 *
 * Pure functions only. Nothing here reads the DOM, the network or the URL, and
 * nothing here sends an answer anywhere.
 *
 * Sourcing rule: every statement below traces to copy already on this site
 * (see the SOURCE comments). If a fact is not in existing Geebs content, it is
 * not here. The restaurant numbers come only from data/fastFoodGuide.ts and are
 * never typed in this file.
 *
 * Wording rule: "supports", "commonly low in", "worth considering". Never a
 * disease claim, never a dose beyond the label-standard ranges on our pages.
 */

import {
  publishedFastFoodGuides,
  type FastFoodGuide,
} from "@/data/fastFoodGuide";
import type { Goal, Phase, Sex } from "./logic";
import { SUPPLEMENT_BACKUP } from "./plan-supplements";

export const PLAN_DISCLAIMER =
  "Not medical advice; check with your doctor if you take medication or are pregnant.";

export type SleepBand = "under_6" | "6_to_7" | "7_to_9" | "over_9";
export type EatingOutFreq = "rarely" | "weekly" | "often";

export type PlanInput = {
  goal: Goal;
  sex: Sex;
  age: number;
  phase: Phase;
  weightLb: number;
  trainingDays: number;
  dailySteps: number;
  sleep: SleepBand;
  plantBased: boolean;
  eatingOut: EatingOutFreq;
};

/* ------------------------------------------------------------------ */
/* 1. Micronutrient support                                            */
/* ------------------------------------------------------------------ */

export type NutrientId =
  | "protein"
  | "vitamin_d"
  | "magnesium"
  | "omega_3"
  | "iron"
  | "b12";

export type NutrientFlag = {
  id: NutrientId;
  name: string;
  /** One plain sentence on why it is on your list. */
  why: string;
  /** Food first. */
  food: string;
  /** Backup only. Null when our content gives no label-standard range. */
  supplement: string | null;
};

/**
 * Which nutrients are worth a look for this person.
 *
 * Not flagged on purpose: fiber. Our pages carry no fiber target and no fiber
 * food list, so there is nothing sourced to say.
 */
export function microFlags(input: PlanInput): NutrientFlag[] {
  const flags: NutrientFlag[] = [];

  // SOURCE: app/nutrition/longevity, app/nutrition/muscle-after-40 (about 0.8 g
  // per lb for muscle retention). Flag when you are cutting, 40 or older, or
  // plant-based, because those are the three places protein slips first.
  if (input.phase === "fat_loss" || input.age >= 40 || input.plantBased) {
    flags.push({
      id: "protein",
      name: "Protein",
      why: "Protein supports keeping muscle while you diet and as you get older. It is the one to get right first.",
      food: input.plantBased
        ? "Plant protein sources at every meal, with a protein shake to close the gap."
        : "Eggs, chicken, Greek yogurt, cottage cheese or lean beef at every meal.",
      supplement: null,
    });
  }

  // SOURCE: app/science/vitamin-d. The page gives a 600-2,000 IU/day common
  // range and says a blood test is the precise way to dose. No food list on
  // the page, so none is invented here.
  flags.push({
    id: "vitamin_d",
    name: "Vitamin D",
    why: "Vitamin D is worth checking. It supports bone and general health. It is not a testosterone shortcut.",
    food: "Our pages do not list food sources for vitamin D, so start with a blood test if you want a real answer.",
    supplement: null,
  });

  // SOURCE: app/science/magnesium. Food list and 100-350 mg elemental once a
  // day for a pill. Sleep line from app/nutrition/magnesium-sleep, which says
  // the evidence is limited and only in older adults, so it is gated to 50+
  // and short sleepers and worded as "may".
  flags.push({
    id: "magnesium",
    name: "Magnesium",
    why:
      input.sleep === "under_6" || input.sleep === "6_to_7"
        ? input.age >= 50
          ? "Magnesium may help you fall asleep a bit faster at your age. The evidence is limited, so think of it as a small extra."
          : "Magnesium is worth considering if greens, beans and nuts are rare on your plate."
        : "Magnesium is worth considering if greens, beans and nuts are rare on your plate.",
    food: "Leafy greens, beans and lentils, nuts, seeds and whole grains.",
    supplement: null,
  });

  // SOURCE: app/science/omega-3-and-hormones. Fatty fish two to three times a
  // week; supplement is the fallback; common range 1-3 g/day combined EPA and
  // DHA; high doses can thin the blood, so check with a doctor on blood thinners.
  flags.push({
    id: "omega_3",
    name: "Omega-3",
    why: "Omega-3 is worth considering if fish is not on your plate twice a week.",
    food: "Fatty fish such as wild salmon, mackerel or sardines, two to three times a week.",
    supplement: null,
  });

  // SOURCE: app/nutrition/red-meat-iron says red meat adds iron and zinc and
  // that iron STATUS is not proven either way. So: food only, no dose, no claim
  // that women are low.
  if (input.sex === "female") {
    flags.push({
      id: "iron",
      name: "Iron",
      why: "Iron is worth keeping an eye on. Ask your doctor about a blood test before you add anything.",
      food: "Red meat is one source. If you eat little of it, plan other iron foods on purpose.",
      supplement: null,
    });
  }

  // SOURCE: app/nutrition/plant-based-muscle-growth lists B12 among the things
  // that "deserve attention" for plant-based lifters. No dose on any page, so
  // no dose here.
  if (input.plantBased) {
    flags.push({
      id: "b12",
      name: "Vitamin B12",
      why: "Vitamin B12 deserves attention on a plant-based plan.",
      food: "Our pages do not list B12 food sources, so ask your doctor or get a blood test before you guess.",
      supplement: null,
    });
  }

  return flags.map((f) => ({ ...f, supplement: SUPPLEMENT_BACKUP[f.id] }));
}

/* ------------------------------------------------------------------ */
/* 2. Longevity priorities by age band                                 */
/* ------------------------------------------------------------------ */

export type AgeBand = "under_30" | "30_39" | "40_49" | "50_plus";

export function ageBand(age: number): AgeBand {
  if (age < 30) return "under_30";
  if (age < 40) return "30_39";
  if (age < 50) return "40_49";
  return "50_plus";
}

export type LongevityPriority = {
  id: "muscle" | "protein" | "strength" | "sleep" | "steps";
  title: string;
  line: string;
};

const GOAL_FOCUS: Record<Goal, string> = {
  lose_fat: "While you lose fat, keep the lifting heavy so the weight that comes off is fat.",
  visible_abs: "Getting visibly lean means keeping muscle while the fat comes off.",
  get_lean: "Getting as lean as you can only works if the muscle stays.",
  build_muscle: "You are building, so progressive lifting is the whole point.",
};

/**
 * Five priorities, ordered by what matters most at this age and goal.
 *
 * SOURCES
 * - Muscle loss of 3% to 8% per decade after 30, slowed by lifting plus
 *   protein: app/nutrition/muscle-after-40.
 * - Muscle mass relative to height and lower all-cause mortality (Srikanthan
 *   2014), and "nutrition alone cannot preserve muscle without training":
 *   app/nutrition/longevity.
 * - About 0.8 g per lb: app/nutrition/longevity, muscle-after-40.
 * - 7 to 9 hours of sleep: app/methodology, app/science/sleep-loss-and-
 *   testosterone.
 * - Steps: 7,500 to 10,000 a day range in app/tools/daily-step-tracker, and
 *   "set a floor, for example 8,000" in the stall guide.
 */
export function longevityPriorities(input: PlanInput): LongevityPriority[] {
  const band = ageBand(input.age);
  const focus = GOAL_FOCUS[input.goal];
  const proteinFloor = Math.round(input.weightLb * 0.8);

  const muscle: LongevityPriority = {
    id: "muscle",
    title: "Hold on to your muscle",
    line:
      band === "under_30"
        ? `Bank muscle now. Unmanaged loss runs 3% to 8% a decade after 30, and what you build now is what you start from. ${focus}`
        : band === "30_39"
          ? `Muscle loss of 3% to 8% a decade starts after 30 if nobody manages it. Lifting plus protein blunts it. ${focus}`
          : `Unmanaged muscle loss of 3% to 8% a decade after 30 adds up. Lifting plus protein blunts it. More muscle for your height is linked to lower all-cause mortality. ${focus}`,
  };

  const protein: LongevityPriority = {
    id: "protein",
    title: "Protein at every meal",
    line:
      band === "50_plus"
        ? `Aim for about ${proteinFloor} g a day (0.8 g per lb), spread over three to five real meals. Small 15 g snacks leave older muscle under the amount it needs per meal.`
        : band === "40_49"
          ? `Aim for about ${proteinFloor} g a day (0.8 g per lb), spread over three to five meals. Older muscle needs a bigger dose per meal to respond.`
          : `Aim for about ${proteinFloor} g a day (0.8 g per lb) and spread it across the day instead of one big dinner.`,
  };

  const strength: LongevityPriority = {
    id: "strength",
    title: "Strength training",
    line:
      input.trainingDays === 0
        ? "Start with two lifting days a week. Food alone cannot keep muscle without training."
        : input.trainingDays < 3
          ? `You train ${input.trainingDays} day${input.trainingDays === 1 ? "" : "s"} a week. Moving to three keeps more muscle, and food alone cannot do that job.`
          : `You already train ${input.trainingDays} days. Keep it progressive, and keep it going as the years add up.`,
  };

  const sleepLine =
    input.sleep === "under_6"
      ? "You are under 6 hours. The target is 7 to 9. Short sleep works against muscle and recovery, so this is your biggest lever right now."
      : input.sleep === "6_to_7"
        ? "You are close. The target is 7 to 9 hours. Add an hour before you add anything else."
        : input.sleep === "7_to_9"
          ? "You are in the 7 to 9 hour range. Protect it."
          : "You are sleeping over 9 hours. The target is 7 to 9, so hold your bedtime steady rather than chasing more.";
  const sleep: LongevityPriority = {
    id: "sleep",
    title: "Sleep",
    line: sleepLine,
  };

  const steps: LongevityPriority = {
    id: "steps",
    title: "Steps",
    line: input.dailySteps < 5000
      ? `You average about ${input.dailySteps.toLocaleString()} steps. Start with ${Math.min(7500, input.dailySteps + 2000).toLocaleString()} a day for two weeks, then reassess. A sudden 10,000-step jump is not the point.`
      : input.dailySteps < 7500
        ? `You average about ${input.dailySteps.toLocaleString()} steps. Build toward a ${Math.min(8000, input.dailySteps + 1500).toLocaleString()}-step floor before adding harder cardio.`
        : input.phase === "fat_loss"
          ? `You average about ${input.dailySteps.toLocaleString()} steps. Keep an ${Math.max(8000, input.dailySteps).toLocaleString()}-step floor while you diet; consistency matters more than a perfect number.`
          : `You average about ${input.dailySteps.toLocaleString()} steps. Keep that base. The research range on our step tracker is 7,500 to 10,000.`,
  };

  // Order by what moves the needle at this age.
  const order: LongevityPriority[] =
    band === "under_30"
      ? [strength, protein, sleep, muscle, steps]
      : band === "30_39"
        ? [strength, protein, muscle, sleep, steps]
        : [muscle, strength, protein, sleep, steps];

  // A short sleeper leads with sleep regardless of age.
  if (input.sleep === "under_6") {
    return [sleep, ...order.filter((p) => p.id !== "sleep")];
  }
  return order;
}

/* ------------------------------------------------------------------ */
/* 3. Foods: protein per meal and staples by phase                     */
/* ------------------------------------------------------------------ */

export type FoodsPlan = {
  mealsPerDay: number;
  proteinPerMealG: number;
  perMealRange: string;
  staples: string[];
  note: string;
};

export const MEALS_PER_DAY = 3;

/**
 * SOURCES
 * - 25 to 40 g of complete protein per meal, spread over 3 to 5 meals, and
 *   about 0.40 g/kg per meal (35 to 45 g) for men over 40: protein pages.
 * - Staples (eggs, chicken, Greek yogurt, cottage cheese, lean beef, protein
 *   shakes, starchy carbs around training, vegetables filling the plate):
 *   app/guides beginner recomp plan and app/for/shift-workers.
 * Our pages do not give a different food list per phase, so the staples change
 * only in where the carbs and plate volume sit.
 */
export function foodsPlan(
  input: PlanInput,
  dailyProteinG: number,
): FoodsPlan {
  const perMeal = Math.round(dailyProteinG / MEALS_PER_DAY);
  const older = input.age >= 40;

  const protein = input.plantBased
    ? ["Plant protein sources", "Protein shake"]
    : ["Eggs", "Chicken", "Greek yogurt", "Cottage cheese", "Lean beef", "Protein shake"];

  const byPhase: Record<Phase, { carbs: string; note: string }> = {
    fat_loss: {
      carbs: "Vegetables filling most of the plate, starchy carbs around training",
      note: "While you cut, protein and vegetables carry the meal.",
    },
    refuel: {
      carbs: "Starchy carbs around training, vegetables on the side",
      note: "Refuel means you eat more, not less. Protein stays at every meal.",
    },
    maintenance: {
      carbs: "Starchy carbs around training, vegetables on the side",
      note: "Hold the same protein and let the rest of the plate stay simple.",
    },
    lean_build: {
      carbs: "Starchy carbs around training, vegetables on the side",
      note: "Protein at every meal, with carbs doing the work around your lifting.",
    },
    baseline: {
      carbs: "Starchy carbs around training, vegetables on the side",
      note: "Baseline means we first need to see what you eat. Keep meals normal, with protein at each one.",
    },
  };
  const p = byPhase[input.phase];

  return {
    mealsPerDay: MEALS_PER_DAY,
    proteinPerMealG: perMeal,
    perMealRange: older
      ? "The usual guide is 35 to 45 g per meal if you are over 40 (about 0.4 g per kg of bodyweight)."
      : "The usual guide is 25 to 40 g of complete protein per meal.",
    staples: [...protein, p.carbs],
    note: p.note,
  };
}

/* ------------------------------------------------------------------ */
/* 4. Eating out                                                       */
/* ------------------------------------------------------------------ */

export type PlaceType =
  | "burgers"
  | "chicken"
  | "bowls"
  | "sandwiches"
  | "coffee";

export const PLACE_TYPES: { id: PlaceType; label: string; slugs: string[] }[] = [
  {
    id: "burgers",
    label: "Burger places",
    slugs: ["mcdonalds", "wendys", "burger-king", "culvers", "in-n-out"],
  },
  {
    id: "chicken",
    label: "Chicken places",
    slugs: ["chick-fil-a", "popeyes", "raising-canes"],
  },
  {
    id: "bowls",
    label: "Bowls and salads",
    slugs: ["chipotle", "panera", "panda-express"],
  },
  {
    id: "sandwiches",
    label: "Sandwich shops",
    slugs: ["jimmy-johns", "arbys", "panera"],
  },
  { id: "coffee", label: "Coffee stops", slugs: ["starbucks", "dunkin"] },
];

export type EatingOutPick = {
  slug: string;
  chain: string;
  order: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  watch: string;
  sourceUrl: string;
};

function toPick(g: FastFoodGuide): EatingOutPick {
  return {
    slug: g.slug,
    chain: g.chain,
    order: g.order,
    calories: g.calories,
    protein: g.protein,
    carbs: g.carbs,
    fat: g.fat,
    watch: g.watch,
    sourceUrl: g.sourceUrl,
  };
}

export type MealBudget = { calories: number; proteinG: number };

/** Per-meal budget from the day's calories and protein. */
export function mealBudget(
  dailyCalories: number,
  dailyProteinG: number,
  meals: number = MEALS_PER_DAY,
): MealBudget {
  return {
    calories: Math.round(dailyCalories / meals),
    proteinG: Math.round(dailyProteinG / meals),
  };
}

/**
 * Up to three orders from verified guides only. Every pick is at or under the
 * per-meal calorie budget. Best protein first, so the pick that covers the most
 * of your per-meal protein leads.
 *
 * Pass a place type id to get its chains, or a chain slug to get that chain.
 * Returns [] when nothing fits, and the caller says so.
 */
export function eatingOutPicks(
  key: PlaceType | string,
  budget: MealBudget,
  guides: FastFoodGuide[] = publishedFastFoodGuides,
): EatingOutPick[] {
  const place = PLACE_TYPES.find((p) => p.id === key);
  const pool = place
    ? guides.filter((g) => place.slugs.includes(g.slug))
    : guides.filter((g) => g.slug === key);

  return pool
    .filter((g) => g.verifiedCurrentSource === true)
    .filter((g) => g.calories <= budget.calories)
    .sort((a, b) => b.protein - a.protein || a.calories - b.calories)
    .slice(0, 3)
    .map(toPick);
}

/** Place types that have at least one fit, so the picker never shows a dead end. */
export function placeTypesWithFits(
  budget: MealBudget,
  guides: FastFoodGuide[] = publishedFastFoodGuides,
): { id: PlaceType; label: string }[] {
  return PLACE_TYPES.filter(
    (p) => eatingOutPicks(p.id, budget, guides).length > 0,
  ).map(({ id, label }) => ({ id, label }));
}

export function eatingOutIntro(freq: EatingOutFreq): string {
  return freq === "often"
    ? "You eat out a lot, so this part of the plan matters most."
    : freq === "weekly"
      ? "You eat out about once a week. Pick the place, get the order."
      : "You rarely eat out, so keep this for the days it happens.";
}

/* ------------------------------------------------------------------ */
/* Everything at once                                                  */
/* ------------------------------------------------------------------ */

export type Plan = {
  micro: NutrientFlag[];
  longevity: LongevityPriority[];
  foods: FoodsPlan;
  budget: MealBudget;
  disclaimer: string;
};

export function buildPlan(
  input: PlanInput,
  dailyCalories: number,
  dailyProteinG: number,
): Plan {
  return {
    micro: microFlags(input),
    longevity: longevityPriorities(input),
    foods: foodsPlan(input, dailyProteinG),
    budget: mealBudget(dailyCalories, dailyProteinG),
    disclaimer: PLAN_DISCLAIMER,
  };
}

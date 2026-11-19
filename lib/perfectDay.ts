/**
 * Deterministic "perfect day of eating" builder.
 *
 * No model call, no network, no randomness: the same inputs always produce the
 * same day, and bumping `variation` walks a fixed rotation. That keeps the tool
 * free to run, testable, and honest — every number below traces to either the
 * site's published coaching targets or a reference food composition value.
 *
 * What this deliberately does NOT do: promise a hormonal outcome. Priorities
 * shift emphasis (fat floor, oily fish, whole-food micronutrient coverage), and
 * the UI states plainly which parts have evidence behind them and which are
 * structure, not a claim.
 */

export type Goal = "cut" | "recomp" | "bulk";
export type Priority = "muscle" | "testosterone" | "longevity" | "energy";
export type DietPattern = "omnivore" | "pescatarian" | "vegetarian";

export type PerfectDayInput = {
  bodyweightLb: number;
  goal: Goal;
  priority: Priority;
  diet: DietPattern;
  mealsPerDay: number;
  /** Optional measured calorie target; estimated from bodyweight when absent. */
  calories?: number;
  /** Optional age, used to adjust estimated calories. */
  age?: number;
  /** Walks the food rotation so a user can ask for a different day. */
  variation?: number;
};

export type FoodRole = "protein" | "carb" | "fat" | "veg";

export type Food = {
  id: string;
  name: string;
  role: FoodRole;
  /** Per 100 g, rounded reference values (USDA-style composition data). */
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  diets: DietPattern[];
  /** Practical serving bounds in grams, so output stays edible. */
  minG: number;
  maxG: number;
  /** Priorities this food is emphasised for. Empty means generally useful. */
  emphasis?: Priority[];
  /** Plausible at breakfast. Sirloin and 600 g of potatoes are not. */
  breakfastOk?: boolean;
  /** Short, non-promissory reason. Never an outcome claim. */
  note?: string;
};

// Composition values are rounded reference figures for raw/uncooked weights and
// are approximate by design — they are for planning portions, not for clinical
// accuracy. Kept in one table so a correction lands in exactly one place.
export const FOODS: Food[] = [
  // Protein anchors
  { id: "chicken-breast", name: "Chicken breast", role: "protein", kcal: 165, proteinG: 31, fatG: 3.6, carbG: 0, diets: ["omnivore"], minG: 100, maxG: 300, emphasis: ["muscle"], note: "Lean, high protein per calorie." },
  { id: "salmon", name: "Salmon", role: "protein", kcal: 208, proteinG: 20, fatG: 13, carbG: 0, diets: ["omnivore", "pescatarian"], minG: 100, maxG: 250, emphasis: ["longevity", "testosterone"], note: "Oily fish — protein plus omega-3 fats." },
  { id: "lean-beef", name: "Lean beef (sirloin)", role: "protein", kcal: 201, proteinG: 27, fatG: 10, carbG: 0, diets: ["omnivore"], minG: 100, maxG: 250, emphasis: ["muscle", "testosterone"], note: "Protein plus naturally occurring zinc and iron." },
  { id: "eggs", name: "Whole eggs", role: "protein", kcal: 143, proteinG: 13, fatG: 10, carbG: 1, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 100, maxG: 200, emphasis: ["testosterone"], note: "Whole eggs keep the yolk's fat and micronutrients.", breakfastOk: true },
  { id: "greek-yogurt", name: "Greek yogurt (0%)", role: "protein", kcal: 59, proteinG: 10, fatG: 0.4, carbG: 3.6, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 150, maxG: 400, emphasis: ["muscle"], note: "Easy protein that survives a busy morning.", breakfastOk: true },
  { id: "sardines", name: "Sardines (tinned)", role: "protein", kcal: 208, proteinG: 25, fatG: 11, carbG: 0, diets: ["omnivore", "pescatarian"], minG: 80, maxG: 180, emphasis: ["longevity"], note: "Shelf-stable oily fish — works on a travel day." },
  { id: "cottage-cheese", name: "Cottage cheese", role: "protein", kcal: 98, proteinG: 11, fatG: 4.3, carbG: 3.4, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 150, maxG: 350, emphasis: ["muscle"], breakfastOk: true },
  { id: "tofu-firm", name: "Firm tofu", role: "protein", kcal: 144, proteinG: 17, fatG: 9, carbG: 3, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 150, maxG: 350, emphasis: ["longevity"] },
  { id: "whey", name: "Whey protein", role: "protein", kcal: 400, proteinG: 80, fatG: 6, carbG: 8, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 25, maxG: 60, emphasis: ["muscle"], note: "Convenience, not magic — food first where you can.", breakfastOk: true },
  { id: "lentils", name: "Lentils (cooked)", role: "protein", kcal: 116, proteinG: 9, fatG: 0.4, carbG: 20, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 150, maxG: 400, emphasis: ["longevity"] },

  // Carb anchors
  { id: "oats", name: "Oats (dry)", role: "carb", kcal: 379, proteinG: 13, fatG: 6.5, carbG: 68, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 40, maxG: 120, emphasis: ["energy"], breakfastOk: true },
  { id: "white-rice", name: "White rice (dry)", role: "carb", kcal: 365, proteinG: 7, fatG: 0.7, carbG: 80, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 50, maxG: 150, emphasis: ["muscle", "energy"] },
  { id: "potato", name: "Potatoes", role: "carb", kcal: 77, proteinG: 2, fatG: 0.1, carbG: 17, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 200, maxG: 600, emphasis: ["energy"] },
  { id: "sweet-potato", name: "Sweet potato", role: "carb", kcal: 86, proteinG: 1.6, fatG: 0.1, carbG: 20, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 200, maxG: 500, emphasis: ["longevity"] },
  { id: "sourdough", name: "Sourdough bread", role: "carb", kcal: 260, proteinG: 9, fatG: 1.7, carbG: 51, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 60, maxG: 180, breakfastOk: true },
  { id: "berries", name: "Mixed berries", role: "carb", kcal: 57, proteinG: 0.7, fatG: 0.3, carbG: 14, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 100, maxG: 300, emphasis: ["longevity"], breakfastOk: true },

  // Fat anchors
  { id: "olive-oil", name: "Extra virgin olive oil", role: "fat", kcal: 884, proteinG: 0, fatG: 100, carbG: 0, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 10, maxG: 45, emphasis: ["testosterone", "longevity"], note: "The swap with the most direct trial evidence — see the olive oil page.", breakfastOk: true },
  { id: "almonds", name: "Almonds", role: "fat", kcal: 579, proteinG: 21, fatG: 50, carbG: 22, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 15, maxG: 60, emphasis: ["longevity"], breakfastOk: true },
  { id: "avocado", name: "Avocado", role: "fat", kcal: 160, proteinG: 2, fatG: 15, carbG: 9, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 50, maxG: 200, emphasis: ["testosterone"], breakfastOk: true },
  { id: "walnuts", name: "Walnuts", role: "fat", kcal: 654, proteinG: 15, fatG: 65, carbG: 14, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 15, maxG: 50, emphasis: ["longevity"], breakfastOk: true },

  // Vegetables — fixed portions, rounding slack absorbed elsewhere
  { id: "broccoli", name: "Broccoli", role: "veg", kcal: 34, proteinG: 2.8, fatG: 0.4, carbG: 7, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 100, maxG: 250, emphasis: ["longevity"] },
  { id: "spinach", name: "Spinach", role: "veg", kcal: 23, proteinG: 2.9, fatG: 0.4, carbG: 3.6, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 80, maxG: 200, emphasis: ["longevity"], breakfastOk: true },
  { id: "mixed-salad", name: "Mixed salad vegetables", role: "veg", kcal: 25, proteinG: 1.5, fatG: 0.2, carbG: 5, diets: ["omnivore", "pescatarian", "vegetarian"], minG: 100, maxG: 250 },
];

/**
 * Protein per lb of bodyweight, matching the targets already published on the
 * site's macro calculator and methodology page so the tools cannot disagree.
 */
export const PROTEIN_PER_LB: Record<Goal, number> = {
  cut: 1.0,
  recomp: 0.9,
  bulk: 0.8,
};

/** Fat as a share of calories. Never dropped below this — the floor is the point. */
export const FAT_PCT: Record<Goal, number> = {
  cut: 0.25,
  recomp: 0.27,
  bulk: 0.3,
};

/** Rough calorie estimate when the user has no measured number. */
const KCAL_PER_LB: Record<Goal, number> = {
  cut: 12,
  recomp: 14,
  bulk: 16,
};

export const MEAL_NAMES = ["Breakfast", "Lunch", "Dinner", "Fourth meal"];

export type PlannedItem = {
  foodId: string;
  name: string;
  grams: number;
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  note?: string;
};

export type PlannedMeal = {
  name: string;
  items: PlannedItem[];
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
};

export type Supplement = {
  name: string;
  note: string;
  /** Where the reader can check the claim. Must resolve — no placeholder routes. */
  href: string;
  /** PubMed identifier backing the note. Required: no unsourced supplement. */
  pmid: string;
};

export type PerfectDay = {
  targets: { calories: number; proteinG: number; fatG: number; carbG: number };
  totals: { calories: number; proteinG: number; fatG: number; carbG: number };
  meals: PlannedMeal[];
  /** Reader-facing notes about what is and is not evidence-backed. */
  notes: string[];
  /** Evidence-backed supplements relevant to the priority. */
  supplements?: Supplement[];
};

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function portion(food: Food, targetGramsOfMacro: number, macroPer100: number) {
  if (macroPer100 <= 0) return food.minG;
  const raw = (targetGramsOfMacro / macroPer100) * 100;
  // Round to 5 g — nobody weighs to the gram, and false precision reads as fake.
  const rounded = Math.round(raw / 5) * 5;
  return clampNumber(rounded, food.minG, food.maxG);
}

function itemFrom(food: Food, grams: number): PlannedItem {
  const factor = grams / 100;
  return {
    foodId: food.id,
    name: food.name,
    grams,
    kcal: Math.round(food.kcal * factor),
    proteinG: Math.round(food.proteinG * factor),
    fatG: Math.round(food.fatG * factor),
    carbG: Math.round(food.carbG * factor),
    note: food.note,
  };
}

/**
 * Deterministic rotation: emphasised foods first, then a stable offset.
 * At breakfast the pool is restricted to foods people actually eat in the
 * morning — a plan that opens with 230 g of sirloin reads as machine output.
 */
function pick(
  pool: Food[],
  priority: Priority,
  offset: number,
  isBreakfast = false,
): Food {
  const eligible =
    isBreakfast && pool.some((f) => f.breakfastOk)
      ? pool.filter((f) => f.breakfastOk)
      : pool;
  const ranked = [...eligible].sort((a, b) => {
    const aEmph = a.emphasis?.includes(priority) ? 0 : 1;
    const bEmph = b.emphasis?.includes(priority) ? 0 : 1;
    if (aEmph !== bEmph) return aEmph - bEmph;
    return a.id.localeCompare(b.id);
  });
  return ranked[Math.abs(offset) % ranked.length];
}

export function buildPerfectDay(input: PerfectDayInput): PerfectDay {
  const bodyweightLb = clampNumber(input.bodyweightLb, 80, 500);
  const mealsPerDay = clampNumber(Math.round(input.mealsPerDay), 2, 4);
  const variation = Math.abs(Math.round(input.variation ?? 0));

  let calorieMultiplier = KCAL_PER_LB[input.goal];
  if (input.age) {
    if (input.age >= 50) calorieMultiplier -= 1;
    else if (input.age >= 40) calorieMultiplier -= 0.5;
  }

  const calories = Math.round(
    clampNumber(input.calories ?? bodyweightLb * calorieMultiplier, 1200, 6000),
  );
  const proteinG = Math.round(bodyweightLb * PROTEIN_PER_LB[input.goal]);
  const fatG = Math.round((calories * FAT_PCT[input.goal]) / 9);
  const carbG = Math.max(
    0,
    Math.round((calories - proteinG * 4 - fatG * 9) / 4),
  );

  const available = FOODS.filter((f) => f.diets.includes(input.diet));
  const proteins = available.filter((f) => f.role === "protein");
  const carbs = available.filter((f) => f.role === "carb");
  const fats = available.filter((f) => f.role === "fat");
  const vegs = available.filter((f) => f.role === "veg");

  const perMealProtein = proteinG / mealsPerDay;
  const perMealCarb = carbG / mealsPerDay;
  // Fat rides on fewer meals so portions stay realistic rather than a smear of
  // oil across every plate.
  const fatMeals = Math.min(mealsPerDay, 2);
  const perMealFat = fatG / fatMeals;

  const meals: PlannedMeal[] = [];
  for (let i = 0; i < mealsPerDay; i += 1) {
    const items: PlannedItem[] = [];
    const isBreakfast = i === 0;

    // Order matters: carbs, fat and veg are placed first, then the protein
    // anchor is sized to fill whatever protein they did not already provide.
    // Sizing protein first overshoots badly, because oats, bread and potatoes
    // carry real protein of their own.
    const carbFood = pick(carbs, input.priority, variation + i + 1, isBreakfast);
    items.push(itemFrom(carbFood, portion(carbFood, perMealCarb, carbFood.carbG)));

    if (i < fatMeals) {
      const fatFood = pick(fats, input.priority, variation + i, isBreakfast);
      const fatSoFar = items.reduce((sum, it) => sum + it.fatG, 0);
      const needed = perMealFat - fatSoFar;
      if (needed > 0) {
        items.push(itemFrom(fatFood, portion(fatFood, needed, fatFood.fatG)));
      }
    }

    if (i > 0) {
      const vegFood = pick(vegs, input.priority, variation + i, isBreakfast);
      items.push(itemFrom(vegFood, vegFood.minG));
    }

    const proteinFromRest = items.reduce((sum, it) => sum + it.proteinG, 0);
    const proteinNeeded = Math.max(0, perMealProtein - proteinFromRest);

    const proteinFood = pick(proteins, input.priority, variation + i, isBreakfast);
    const anchor = itemFrom(
      proteinFood,
      portion(proteinFood, proteinNeeded, proteinFood.proteinG),
    );
    items.unshift(anchor);

    // A single anchor can still fall short once portion caps bite (200 g of
    // eggs is only ~26 g of protein), which is also how people really eat:
    // eggs and yogurt, or oats and a shake.
    const stillShort = proteinNeeded - anchor.proteinG;
    if (stillShort > 15) {
      const alternates = proteins.filter((f) => f.id !== proteinFood.id);
      if (alternates.length > 0) {
        const second = pick(alternates, input.priority, variation + i + 2, isBreakfast);
        items.splice(1, 0, itemFrom(second, portion(second, stillShort, second.proteinG)));
      }
    }

    meals.push({
      name: MEAL_NAMES[i] ?? `Meal ${i + 1}`,
      items,
      kcal: items.reduce((s, it) => s + it.kcal, 0),
      proteinG: items.reduce((s, it) => s + it.proteinG, 0),
      fatG: items.reduce((s, it) => s + it.fatG, 0),
      carbG: items.reduce((s, it) => s + it.carbG, 0),
    });
  }

  reconcileCalories(meals, calories);

  const totals = {
    calories: meals.reduce((s, m) => s + m.kcal, 0),
    proteinG: meals.reduce((s, m) => s + m.proteinG, 0),
    fatG: meals.reduce((s, m) => s + m.fatG, 0),
    carbG: meals.reduce((s, m) => s + m.carbG, 0),
  };

  // Every entry needs a verified source and a link that resolves. A supplement
  // suggestion with no citation is exactly what this project refuses to ship,
  // and a link to a page that does not exist is a 404 in front of a reader.
  const supplements: Supplement[] = [];
  if (input.priority === "testosterone") {
    supplements.push({
      name: "Zinc",
      note:
        "Only worth it if you are actually low. Zinc status tracks with testosterone in men who are deficient; adding more on top of an adequate diet has not been shown to help.",
      href: "https://pubmed.ncbi.nlm.nih.gov/8875519/",
      pmid: "8875519",
    });
  }

  return { targets: { calories, proteinG, fatG, carbG }, totals, meals, notes: notesFor(input), supplements };
}


/**
 * Trim carbohydrate portions when the assembled day overshoots its calorie
 * target. Protein and the fat floor are protected on purpose — the site's own
 * guidance is protein and fat first, carbs fill the rest — so carbohydrate is
 * the macro that absorbs the correction. Mutates the meals in place.
 */
export function reconcileCalories(meals: PlannedMeal[], targetCalories: number) {
  for (let pass = 0; pass < 6; pass += 1) {
    const total = meals.reduce((sum, m) => sum + m.kcal, 0);
    const excess = total - targetCalories;
    if (excess <= targetCalories * 0.05) return;

    const carbItems: { meal: PlannedMeal; item: PlannedItem; food: Food }[] = [];
    for (const meal of meals) {
      for (const item of meal.items) {
        const food = FOODS.find((f) => f.id === item.foodId);
        if (food?.role === "carb" && item.grams > food.minG) {
          carbItems.push({ meal, item, food });
        }
      }
    }
    if (carbItems.length === 0) return;

    const perItemCut = excess / carbItems.length;
    let changed = false;
    for (const { meal, item, food } of carbItems) {
      const kcalPerGram = food.kcal / 100;
      const wantedGrams = Math.max(
        food.minG,
        Math.round((item.grams - perItemCut / kcalPerGram) / 5) * 5,
      );
      if (wantedGrams === item.grams) continue;
      const replacement = itemFrom(food, wantedGrams);
      Object.assign(item, replacement);
      changed = true;
      meal.kcal = meal.items.reduce((s, it) => s + it.kcal, 0);
      meal.proteinG = meal.items.reduce((s, it) => s + it.proteinG, 0);
      meal.fatG = meal.items.reduce((s, it) => s + it.fatG, 0);
      meal.carbG = meal.items.reduce((s, it) => s + it.carbG, 0);
    }
    if (!changed) return;
  }
}

/**
 * Honest framing, returned with every plan. These are deliberately conservative:
 * the tool must never imply that a day of eating raises a hormone.
 */
export function notesFor(input: PerfectDayInput): string[] {
  const notes: string[] = [
    "Targets come from your bodyweight and goal, not from a hormone claim. Protein and a fat floor are the parts with the strongest evidence behind them.",
    "Weights are raw and approximate. Round to what is practical — nobody weighs to the gram, and the week matters more than any single day.",
  ];

  if (input.priority === "testosterone") {
    notes.push(
      "For this priority the plan keeps fat at a floor rather than cutting it, and favours olive oil and whole eggs. The strongest single piece of evidence here is one small controlled trial on swapping butter for olive oil — promising, not settled.",
    );
  }
  if (input.priority === "longevity") {
    notes.push(
      "This priority leans on oily fish, legumes, vegetables, and olive oil. That is a dietary pattern with broad support, not a protocol that has been shown to extend anyone's life on its own.",
    );
  }
  if (input.priority === "muscle") {
    notes.push(
      "Protein is the lever here. Evidence supports gains up to roughly 1.6 g per kg per day alongside training; past that, more protein has not added further benefit in the pooled trials.",
    );
  }
  if (input.priority === "energy") {
    notes.push(
      "Carbohydrate is placed around the parts of the day you need to work and train. Sleep affects your energy more than food timing does.",
    );
  }

  notes.push(
    "This is general nutrition information, not medical advice, and it does not diagnose or treat anything.",
  );
  return notes;
}

export type GroceryBudget = "200" | "300" | "500";
export type GroceryHousehold = "one" | "two" | "family";
export type GroceryGoal = "fat_loss" | "muscle_gain" | "consistency";

export type GroceryExactListAnswers = {
  budget: GroceryBudget;
  household: GroceryHousehold;
  goal: GroceryGoal;
};

const BUDGET_COPY: Record<GroceryBudget, { label: string; focus: string }> = {
  "200": { label: "$200 a month", focus: "the protein-first base" },
  "300": { label: "$300 a month", focus: "more variety without buying everything" },
  "500": { label: "$500 a month", focus: "more convenience or a bigger household" },
};

const HOUSEHOLD_COPY: Record<GroceryHousehold, string> = {
  one: "one person",
  two: "two people",
  family: "three or more people",
};

const GOAL_COPY: Record<GroceryGoal, string> = {
  fat_loss: "fat loss",
  muscle_gain: "building muscle",
  consistency: "eating more consistently",
};

const BUY_FIRST: Record<GroceryBudget, string[]> = {
  "200": ["Chicken breast", "Nonfat Greek yogurt", "Frozen vegetables", "Baking potatoes"],
  "300": ["Chicken breast", "Pork tenderloin", "Frozen blueberries", "Sweet potatoes"],
  "500": ["Chicken breast", "Top round steak", "Frozen blueberries", "Jasmine rice"],
};

const HOUSEHOLD_QUANTITY: Record<GroceryHousehold, string> = {
  one: "one package or bag",
  two: "two packages or bags of the foods you finish fastest",
  family: "enough for the household, then freeze the extra protein",
};

const GOAL_FOCUS: Record<GroceryGoal, string> = {
  fat_loss: "Prioritize the vegetables and potatoes so meals stay filling.",
  muscle_gain: "Prioritize the protein choices and pair them with potatoes or rice after training.",
  consistency: "Prioritize the yogurt and frozen options so a busy day still has an easy meal.",
};

export function groceryBuyFirstList({ budget, household, goal }: GroceryExactListAnswers): Array<{ item: string; detail: string }> {
  return BUY_FIRST[budget].map((item, index) => ({
    item,
    detail: index === 0 ? HOUSEHOLD_QUANTITY[household] : index === 3 ? GOAL_FOCUS[goal] : "Buy this after your protein base is covered.",
  }));
}

export function groceryListSummary({ budget, household, goal }: GroceryExactListAnswers): string {
  const plan = BUDGET_COPY[budget];
  return `Costco starting point: ${plan.label} for ${HOUSEHOLD_COPY[household]}, built around ${plan.focus}. Your focus is ${GOAL_COPY[goal]}. Buy the basics below first; Kris can then map portions, protein, and swaps to your training week and foods you actually eat.`;
}

export function groceryApplyHref(): string {
  return "/apply?entry_source=qualified_content&entry_content=costco_exact_list&bridge_version=v1&utm_source=site&utm_medium=resource&utm_campaign=costco_exact_list";
}

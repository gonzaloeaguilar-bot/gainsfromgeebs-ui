// ============================================================
//  /assessment engine
//
//  Pure functions, no React, no network. Everything the results
//  screen renders comes from assess() so the whole prescription is
//  testable without a browser.
//
//  Design rule carried from the coaching side: this must be willing
//  to tell someone NOT to diet. A plan that always prescribes a
//  deficit is a sales script, not an assessment. Three of the five
//  phases below open with something other than a cut, and two of
//  them are reached specifically because the inputs do not justify
//  one.
// ============================================================

export type Sex = "male" | "female";

export type Goal = "lose_fat" | "visible_abs" | "get_lean" | "build_muscle";

export type WeightTrend =
  | "down_fast"
  | "down_slow"
  | "steady"
  | "up_slow"
  | "up_fast";

export type DietHistory =
  | "not_dieting"
  | "under_1_month"
  | "1_3_months"
  | "3_6_months"
  | "6_plus_months"
  | "years_on_off";

export type Phase =
  | "baseline"
  | "fat_loss"
  | "refuel"
  | "maintenance"
  | "lean_build";

/** How much the body-fat number can be trusted. Drives whether a
 *  surplus or an aggressive deficit is allowed at all. */
export type Confidence = "measured" | "estimated";

export type Macros = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type Input = {
  goal: Goal;
  sex: Sex;
  age: number;
  heightIn: number;
  weightLb: number;
  /** Tape measurements, in inches. Absent means we fall back to an
   *  estimate and the confidence drops. */
  waistIn?: number;
  neckIn?: number;
  hipIn?: number;
  weightTrend: WeightTrend;
  /** Average daily intake. null means "I do not know", which is a
   *  real and common answer, and it changes the prescription. */
  currentCalories: number | null;
  dietHistory: DietHistory;
  trainingDays: number;
};

export type Result = {
  bodyFatPct: number;
  confidence: Confidence;
  leanMassLb: number;
  fatMassLb: number;
  targetBodyFatPct: number;
  /** Estimated weight at the target body fat, as a range. */
  goalWeightLowLb: number;
  goalWeightHighLb: number;
  fatToLoseLb: number;
  estimatedTdee: number;
  /** What we believe they are actually eating now, after the trend
   *  cross-check. Equals currentCalories when it is credible. */
  workingBaseline: number;
  baselineIsReported: boolean;
  intakeFlag: string | null;
  phase: Phase;
  phaseLabel: string;
  firstMove: string;
  why: string;
  weekOne: string;
  nextPhase: string;
  higherCarb: Macros;
  higherFat: Macros;
  /** Set when a guardrail moved the prescription away from what the
   *  goal alone would have produced. Shown to the user verbatim. */
  guardrail: string | null;
};

// ---------- unit helpers ------------------------------------

const lbToKg = (lb: number) => lb * 0.45359237;
const inToCm = (inches: number) => inches * 2.54;

// ---------- body fat ----------------------------------------

/** The same [2, 60] clamp /tools/body-fat-calculator applies. A
 *  circumference regression run on an extreme or mistyped measurement
 *  can return a percentage that is not physically possible, and the
 *  two surfaces must not disagree about what to do with it. */
function clampBodyFat(bf: number): number | null {
  if (!Number.isFinite(bf)) return null;
  return Math.max(2, Math.min(60, bf));
}

/** U.S. Navy circumference method, the same estimator already used by
 *  /tools/body-fat-calculator. Kept identical on purpose so a client
 *  who uses both surfaces does not get two different numbers. */
export function navyBodyFat(
  sex: Sex,
  heightIn: number,
  waistIn: number,
  neckIn: number,
  hipIn?: number,
): number | null {
  if (sex === "male") {
    if (waistIn <= neckIn) return null;
    const bf =
      86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    return clampBodyFat(bf);
  }
  if (!hipIn) return null;
  if (waistIn + hipIn <= neckIn) return null;
  const bf =
    163.205 * Math.log10(waistIn + hipIn - neckIn) -
    97.684 * Math.log10(heightIn) -
    78.387;
  return clampBodyFat(bf);
}

/** Deurenberg BMI fallback. Deliberately only used when no tape
 *  measurement is given, and it forces confidence to "estimated",
 *  because a population regression cannot see an individual. */
function bmiBodyFat(sex: Sex, age: number, weightLb: number, heightIn: number) {
  const bmi = lbToKg(weightLb) / Math.pow(inToCm(heightIn) / 100, 2);
  const sexFactor = sex === "male" ? 1 : 0;
  const raw = 1.2 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
  return Math.max(2, Math.min(60, raw));
}

// ---------- targets -----------------------------------------

const TARGET_BF: Record<Sex, Record<Goal, number>> = {
  male: { lose_fat: 15, visible_abs: 12, get_lean: 10, build_muscle: 14 },
  female: { lose_fat: 25, visible_abs: 22, get_lean: 20, build_muscle: 24 },
};

const ACTIVITY_BY_DAYS: Record<number, number> = {
  0: 1.25,
  1: 1.375,
  2: 1.375,
  3: 1.55,
  4: 1.55,
  5: 1.725,
  6: 1.9,
};

// ---------- intake credibility ------------------------------

/** A reported intake and a weight trend can contradict each other.
 *  Someone "eating 1,800" while gaining a pound a week is not lying,
 *  they are under-recording, and prescribing a cut from 1,800 would
 *  set a target they have never actually hit. We widen the baseline
 *  toward the estimate instead and say why out loud.
 */
function reconcileIntake(
  reported: number | null,
  tdee: number,
  trend: WeightTrend,
): { working: number; reported: boolean; flag: string | null } {
  if (reported === null) {
    return { working: Math.round(tdee), reported: false, flag: null };
  }

  const gaining = trend === "up_fast" || trend === "up_slow";
  const losing = trend === "down_fast" || trend === "down_slow";

  if (gaining && reported < tdee * 0.95) {
    return {
      working: Math.round((reported + tdee) / 2),
      reported: false,
      flag: "Your reported intake sits below your estimated requirement, but your weight is going up. That combination usually means some food is going unrecorded, so we start from a midpoint between the two rather than from a number you have not actually been eating.",
    };
  }

  if (losing && reported > tdee * 1.05) {
    return {
      working: Math.round((reported + tdee) / 2),
      reported: false,
      flag: "Your reported intake is above your estimated requirement while your weight is falling. We start from a midpoint, then let two weeks of real data settle where maintenance actually sits.",
    };
  }

  return { working: Math.round(reported), reported: true, flag: null };
}

// ---------- macros ------------------------------------------

/** Protein is set per pound of bodyweight and held constant across
 *  both splits. Calories and protein are the plan; the carb and fat
 *  arrangement is preference, which is why two versions are shown
 *  rather than one "optimal" one. */
function buildMacros(
  calories: number,
  weightLb: number,
  phase: Phase,
  carbBias: "carb" | "fat",
): Macros {
  const perLb = phase === "fat_loss" ? 1.0 : 0.9;
  const proteinG = Math.round(weightLb * perLb);
  const proteinKcal = proteinG * 4;
  const remaining = Math.max(calories - proteinKcal, 200);

  const fatShare = carbBias === "carb" ? 0.25 : 0.45;
  const fatG = Math.round((remaining * fatShare) / 9);
  const carbsG = Math.round((remaining - fatG * 9) / 4);

  return { calories: Math.round(calories), proteinG, carbsG, fatG };
}

// ---------- the floor ---------------------------------------

/** Nobody gets sent below this. 10 kcal per pound of bodyweight, and
 *  never under the estimated BMR. When a goal-driven deficit would
 *  cross it, the deficit is the thing that gives way, not the floor,
 *  and the user is told that happened. */
function calorieFloor(weightLb: number, bmr: number): number {
  return Math.max(Math.round(weightLb * 10), Math.round(bmr));
}

function mifflinBmr(sex: Sex, age: number, weightLb: number, heightIn: number) {
  const sexAdj = sex === "male" ? 5 : -161;
  return 10 * lbToKg(weightLb) + 6.25 * inToCm(heightIn) - 5 * age + sexAdj;
}

// ---------- main --------------------------------------------

const LONG_DIET: DietHistory[] = ["3_6_months", "6_plus_months", "years_on_off"];

export function assess(input: Input): Result {
  const {
    goal,
    sex,
    age,
    heightIn,
    weightLb,
    waistIn,
    neckIn,
    hipIn,
    weightTrend,
    currentCalories,
    dietHistory,
    trainingDays,
  } = input;

  // --- composition
  const measured =
    waistIn && neckIn
      ? navyBodyFat(sex, heightIn, waistIn, neckIn, hipIn)
      : null;
  const confidence: Confidence = measured === null ? "estimated" : "measured";
  const bodyFatPct =
    measured === null ? bmiBodyFat(sex, age, weightLb, heightIn) : measured;

  const bfRounded = Math.round(bodyFatPct * 10) / 10;
  const fatMassLb = Math.round((weightLb * bfRounded) / 100);
  const leanMassLb = Math.round(weightLb - fatMassLb);

  const targetBodyFatPct = TARGET_BF[sex][goal];
  // Lean mass is treated as held, which is the point of the protein and
  // training prescription. The range is +/- 3% to avoid a false precision
  // a circumference estimate cannot support.
  //
  // Low is the LEANER end, so it is the lighter weight, which means it
  // comes from the lower body-fat bound. Deriving low from target + 3
  // reads naturally and is wrong: it renders as "191 to 178 lb".
  const goalWeightLowLb = Math.round(
    leanMassLb / (1 - (targetBodyFatPct - 3) / 100),
  );
  const goalWeightHighLb = Math.round(
    leanMassLb / (1 - (targetBodyFatPct + 3) / 100),
  );
  // Measured against the target itself rather than either edge of the
  // range, so this number means the same thing as the target shown beside it.
  const goalWeightAtTarget = leanMassLb / (1 - targetBodyFatPct / 100);
  const fatToLoseLb = Math.max(Math.round(weightLb - goalWeightAtTarget), 0);

  // --- energy
  const bmr = mifflinBmr(sex, age, weightLb, heightIn);
  const activity = ACTIVITY_BY_DAYS[Math.min(Math.max(trainingDays, 0), 6)] ?? 1.55;
  const estimatedTdee = Math.round(bmr * activity);
  const floor = calorieFloor(weightLb, bmr);

  const { working, reported, flag } = reconcileIntake(
    currentCalories,
    estimatedTdee,
    weightTrend,
  );

  const longDiet = LONG_DIET.includes(dietHistory);
  const suppressed = currentCalories !== null && currentCalories < estimatedTdee * 0.8;
  const alreadyAtTarget = bfRounded <= targetBodyFatPct + 1;
  const wantsMuscle = goal === "build_muscle";

  let phase: Phase;
  let guardrail: string | null = null;

  if (currentCalories === null) {
    // No intake number means there is nothing to adjust FROM. Every
    // prescription below is a change to a baseline, so the baseline has
    // to exist first.
    phase = "baseline";
  } else if (suppressed && longDiet) {
    phase = "refuel";
    guardrail =
      "You have been dieting for a while on an intake well below your estimated requirement. Cutting further from here is the move that stalls people, so your first phase eats more, not less.";
  } else if (working - 300 < floor) {
    phase = "maintenance";
    guardrail = `A useful deficit from your current intake would put you under ${floor.toLocaleString()} calories, which is too low to run or to learn anything from. We hold intake steady and let training and steps do the work first.`;
  } else if (wantsMuscle && confidence === "estimated") {
    phase = "maintenance";
    guardrail =
      "Without a tape measurement your body-fat estimate is too rough to justify a surplus, so we start at maintenance. Two weeks of weight data will tell us whether to push up.";
  } else if (wantsMuscle && bfRounded > targetBodyFatPct + 6) {
    phase = "fat_loss";
    guardrail =
      "You picked muscle, and you will build more of it from a leaner starting point. We run a controlled fat loss phase first, then build.";
  } else if (wantsMuscle) {
    phase = "lean_build";
  } else if (alreadyAtTarget) {
    phase = "maintenance";
    guardrail =
      "You are already at or near the body fat you picked. There is nothing to cut toward, so the job changes to holding it while training gets better.";
  } else {
    phase = "fat_loss";
  }

  // --- calories for the chosen phase
  let calories: number;
  switch (phase) {
    case "baseline":
      calories = working;
      break;
    case "fat_loss":
      calories = Math.max(Math.round(working - (longDiet ? 300 : 400)), floor);
      break;
    case "refuel":
      calories = Math.round(working + 250);
      break;
    case "maintenance":
      calories = working;
      break;
    case "lean_build":
      calories = Math.round(working + 200);
      break;
  }

  const copy = phaseCopy(phase, {
    calories,
    working,
    targetBodyFatPct,
    goalWeightLowLb,
    goalWeightHighLb,
    confidence,
  });

  return {
    bodyFatPct: bfRounded,
    confidence,
    leanMassLb,
    fatMassLb,
    targetBodyFatPct,
    goalWeightLowLb,
    goalWeightHighLb,
    fatToLoseLb,
    estimatedTdee,
    workingBaseline: working,
    baselineIsReported: reported,
    intakeFlag: flag,
    phase,
    phaseLabel: copy.label,
    firstMove: copy.firstMove,
    why: copy.why,
    weekOne: copy.weekOne,
    nextPhase: copy.nextPhase,
    higherCarb: buildMacros(calories, weightLb, phase, "carb"),
    higherFat: buildMacros(calories, weightLb, phase, "fat"),
    guardrail,
  };
}

// ---------- phase copy --------------------------------------

type CopyCtx = {
  calories: number;
  working: number;
  targetBodyFatPct: number;
  goalWeightLowLb: number;
  goalWeightHighLb: number;
  confidence: Confidence;
};

function phaseCopy(phase: Phase, ctx: CopyCtx) {
  const cals = ctx.calories.toLocaleString();

  switch (phase) {
    case "baseline":
      return {
        label: "Phase 1: find your real starting number",
        firstMove: `Eat ${cals} calories a day and do not change anything else yet.`,
        why: "You told us you are not sure what you currently eat, which is the most honest answer on the form and the reason we are not handing you a deficit. Every adjustment after this one is a change to a known number. Right now there is no known number, so the first job is to produce one.",
        weekOne:
          "Log everything you eat, including the parts you would normally leave out. Weigh yourself every morning after the bathroom and before food, then average the seven days. Keep steps and training where they already are. This week produces data, not change.",
        nextPhase:
          "With one honest week of intake and a seven-day weight average, the next phase becomes obvious: if weight held, that number is your maintenance and a deficit gets built from it. If it moved, we know which direction to correct.",
      };

    case "fat_loss":
      return {
        label: "Phase 1: a controlled fat loss block",
        firstMove: `Drop to ${cals} calories a day, hold protein daily, and keep your steps where they are.`,
        why: `This is the smallest change that will move body fat, taken from what you are already eating rather than from a generic number. We are not cutting to the lowest intake you can survive, because that leaves nowhere to go when progress slows. The room to keep adjusting is the plan.`,
        weekOne:
          "Hit calories and protein every day. Weigh in each morning and compare seven-day averages, never single days. Push for the same or better numbers in training. If the average has not moved after two full weeks, that is when something changes, not before.",
        nextPhase: `As you get closer to ${ctx.targetBodyFatPct}% the adjustments get smaller and less frequent, and slower loss becomes the correct speed rather than a problem. The phase after this one raises food back up and teaches you to hold the result, which is the part most diets skip.`,
      };

    case "refuel":
      return {
        label: "Phase 1: refuel before any more fat loss",
        firstMove: `Raise intake to ${cals} calories a day, mostly through carbohydrate, and hold it.`,
        why: "Long dieting on a low intake is the state in which cutting harder stops working. Training quality falls, recovery falls, adherence falls, and the scale stops responding anyway. Eating more here is not a break from the plan, it is the phase that makes the next deficit work.",
        weekOne:
          "Add food gradually rather than all at once. Expect the scale to jump in the first few days, because more food and more carbohydrate means more water and more gut content, and neither is fat. Judge this phase on multi-week averages, energy and training numbers.",
        nextPhase:
          "Once weight, performance and adherence are steady at the higher intake, you have a real baseline to diet from, with room to cut. That is when a fat loss block goes back on the table.",
      };

    case "maintenance":
      return {
        label: "Phase 1: hold intake, raise the quality of the work",
        firstMove: `Stay at ${cals} calories a day and put the effort into training and daily movement instead.`,
        why: ctx.confidence === "estimated"
          ? "Based on what your inputs support, pushing in either direction is not justified yet. Holding intake steady while training gets sharper is the move with the least downside and the most information."
          : "An aggressive push in either direction is not warranted from where you are. We hold calories, drive training quality, and let a few weeks of real data pick the direction.",
        weekOne:
          "Eat the same number daily, keep steps consistent, and chase progressive overload in the gym. Weigh in every morning and build the weekly average. Confirm that this number really is maintenance before treating it as one.",
        nextPhase:
          "Two consistent weeks of flat weight confirms maintenance. From there we either step into a deficit or a small surplus, with a number you have proven rather than one we guessed.",
      };

    case "lean_build":
      return {
        label: "Phase 1: a controlled lean build",
        firstMove: `Move up to ${cals} calories a day and hold the surplus consistently.`,
        why: "Your body fat leaves room to add size without giving away the look you already have. A small, boring surplus held for months builds more than a large one held for three weeks, because the large one adds fat you then have to diet off.",
        weekOne:
          "Hit calories and protein daily, keep steps steady, and push progressive overload. You are looking for a small, controlled climb on the weekly average, not a jump. Add more food only once the average goes flat.",
        nextPhase: `Watch body fat as you build. When it drifts past roughly ${ctx.targetBodyFatPct + 4}%, a short fat loss block sharpens conditioning and you go back to building from a leaner base.`,
      };
  }
}

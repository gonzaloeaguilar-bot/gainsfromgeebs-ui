export type Sex = "male" | "female";
export type Experience = "new" | "returning" | "trained";
export type TrainingDays = 1 | 2 | 3 | 4 | 5 | 6;
export type RecompVerdict = "strong" | "possible" | "unlikely";

export type Result = {
  tdee: number;
  recompCalories: number;
  proteinGrams: number;
  weightLb: number;
  verdict: RecompVerdict;
  verdictHeadline: string;
  verdictDetail: string;
  expectation12wk: string;
};

type VerdictCopy = {
  verdict: RecompVerdict;
  headline: string;
  detail: string;
  expectation: string;
};

// Activity multipliers by weekly training days (Mifflin-St Jeor convention)
const ACTIVITY_BY_DAYS: Record<TrainingDays, number> = {
  1: 1.375,
  2: 1.375,
  3: 1.55,
  4: 1.55,
  5: 1.725,
  6: 1.9,
};

function lbToKg(lb: number): number {
  return lb * 0.45359237;
}

function inToCm(inches: number): number {
  return inches * 2.54;
}

function bodyFatThresholdsFor(sex: Sex) {
  if (sex === "female") {
    return {
      newStrong: 22,
      returningStrong: 20,
      trainedPossible: 26,
      leanBulk: 18,
      trainedLean: 23,
    };
  }

  return {
    newStrong: 15,
    returningStrong: 12,
    trainedPossible: 18,
    leanBulk: 10,
    trainedLean: 15,
  };
}

export function getVerdict(
  sex: Sex,
  experience: Experience,
  bodyFatPct: number,
): VerdictCopy {
  const thresholds = bodyFatThresholdsFor(sex);

  if (experience === "new" && bodyFatPct >= thresholds.newStrong) {
    return {
      verdict: "strong",
      headline: "Strong recomp candidate",
      detail:
        "You have two key advantages: training is a new stimulus so muscle grows even in a small deficit, and extra body fat gives you the energy reserves to fuel that growth. This is the best physiological window for simultaneous fat loss and muscle gain. A 10–15% deficit with high protein and consistent resistance training is the right approach.",
      expectation:
        "Over 12 weeks expect real strength progress, a noticeable shift in how you look and feel, and a scale that moves slowly or not at all. The mirror and the bar improve before the scale does — that is the process working, not failing.",
    };
  }

  if (experience === "returning" && bodyFatPct >= thresholds.returningStrong) {
    return {
      verdict: "strong",
      headline: "Strong recomp candidate",
      detail:
        "Returning lifters regain muscle faster than they originally built it — muscle memory is real. Combined with a body fat percentage that leaves room to maneuver, a modest deficit with high protein will produce simultaneous fat loss and muscle recovery faster than the typical beginner expects.",
      expectation:
        "Over 12 weeks expect noticeable strength and muscle recovery — often to your previous baseline and beyond. Body composition will shift visibly. The scale may stay flat even as the mirror improves, which is the goal.",
    };
  }

  if (experience === "trained" && bodyFatPct >= thresholds.trainedPossible) {
    return {
      verdict: "possible",
      headline: "Recomp is possible, but slower",
      detail:
        "Trained athletes can recomp, but the rate slows significantly after 12–18 months of consistent lifting. At this body fat level, a small deficit and high protein can still produce visible improvements — it will just take longer to see than it would for a newer lifter. Patient, consistent execution is the key variable.",
      expectation:
        "Over 12 weeks expect modest fat reduction and maintained or slightly improved muscle. Strength may plateau or grow slowly. The biggest win is body composition shift rather than scale movement.",
    };
  }

  if (bodyFatPct < thresholds.leanBulk) {
    return {
      verdict: "unlikely",
      headline: "Lean bulk likely better than recomp",
      detail:
        "At low body fat levels, there is not enough stored energy to fuel simultaneous muscle growth without eating at a surplus. A controlled lean bulk — a modest calorie surplus with high protein — will produce better muscle-building results. A cut is rarely appropriate when already lean.",
      expectation:
        "At this body fat percentage, prioritize a lean bulk: add 200–300 kcal above TDEE, keep protein at 0.8–1 g/lb, and focus on progressive overload in training. Recomp becomes viable again after building a solid strength base.",
    };
  }

  if (experience === "trained" && bodyFatPct < thresholds.trainedLean) {
    return {
      verdict: "unlikely",
      headline: "Dedicated cut or lean bulk is more efficient",
      detail:
        "Experienced, already-lean lifters are the hardest population to recomp effectively. Deliberate phases — cut or lean bulk — tend to produce faster, clearer results than trying to do both at once. Recomp is not impossible here, but the rate is slow enough that most coaches recommend phased approaches.",
      expectation:
        "If you choose to recomp anyway, expect very slow progress — measured in months, not weeks. A dedicated 8–12 week cut followed by a lean bulk will likely produce faster visible change.",
    };
  }

  return {
    verdict: "possible",
    headline: "Recomp is viable — manage expectations",
    detail:
      "Your profile sits in a middle range where recomposition can work, but progress will be slower than for newer lifters. High protein, consistent resistance training, and patience are the non-negotiables. If progress stalls after 8 weeks, consider a more deliberate cut or bulk phase.",
    expectation:
      "Over 12 weeks expect gradual body composition shift: slow fat reduction, maintained or growing muscle. The scale may not move much. Use measurements, progress photos, and strength logs as your primary progress signals.",
  };
}

export function calculate(
  sex: Sex,
  age: number,
  weightLb: number,
  heightInches: number,
  bodyFatPct: number,
  experience: Experience,
  trainingDays: TrainingDays,
): Result {
  const w = lbToKg(weightLb);
  const h = inToCm(heightInches);
  const sexAdj = sex === "male" ? 5 : -161;
  const bmr = 10 * w + 6.25 * h - 5 * age + sexAdj;
  const tdee = bmr * ACTIVITY_BY_DAYS[trainingDays];
  const recompCalories = Math.round(tdee * 0.88);
  const { verdict, headline, detail, expectation } = getVerdict(
    sex,
    experience,
    bodyFatPct,
  );
  const proteinMultiplier = verdict === "unlikely" ? 0.8 : 0.9;
  const proteinGrams = Math.round(weightLb * proteinMultiplier);

  return {
    tdee: Math.round(tdee),
    recompCalories,
    proteinGrams,
    weightLb,
    verdict,
    verdictHeadline: headline,
    verdictDetail: detail,
    expectation12wk: expectation,
  };
}

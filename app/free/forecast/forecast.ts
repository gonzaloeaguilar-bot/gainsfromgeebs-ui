import type { Result } from "@/app/assessment/logic";

/**
 * The one thing /assessment does not answer: when.
 *
 * `assess()` already returns where a person is going — lean mass, target body
 * fat, goal weight, and the calories that get them there. It stops before the
 * calendar, so everything here is arithmetic on its output. Nothing is
 * recalculated and nothing is guessed.
 *
 * The refusal is the product. Cruz Brooks's roadmap always prints a date; two
 * of the five phases `assess()` can return are reached precisely because the
 * answers do not support one, and a date computed on an invented maintenance
 * number is an invented date. When we cannot say when, we say what we can:
 * the date the person will HAVE the number.
 */

/** 3,500 kcal per pound of fat. A modelling constant, not a law of the body,
 *  and the reason the output is a band and never a day. */
const KCAL_PER_LB = 3500;

/** Nobody is forecast faster than this. Above roughly 1% of bodyweight a week
 *  the weight leaving is not mostly fat, so a faster line would be a prettier
 *  chart describing a worse outcome. */
const MAX_WEEKLY_FRACTION = 0.01;

/** A forecast longer than this stops being a plan and becomes a horoscope. */
const MAX_WEEKS = 78;

export type ForecastPoint = {
  week: number;
  weightLb: number;
  bodyFatPct: number;
};

export type Forecast =
  | {
      kind: "dated";
      weeklyRateLb: number;
      weeks: number;
      /** Midpoint, and the two-week band around it. */
      target: Date;
      earliest: Date;
      latest: Date;
      curve: ForecastPoint[];
      /** Present when the honest answer is "further out than we will draw". */
      truncatedAt: number | null;
    }
  | {
      kind: "undated";
      /** Why no date, in the reader's terms. */
      reason: string;
      /** What they get instead, and when. */
      nextDate: Date;
      nextDateMeans: string;
    };

function addWeeks(from: Date, weeks: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + Math.round(weeks * 7));
  return d;
}

/**
 * @param result  the untouched output of assess()
 * @param weightLb  today's weight, as entered
 * @param today  injected so the function stays pure and testable
 */
export function forecast(
  result: Result,
  weightLb: number,
  today: Date,
): Forecast {
  if (result.phase === "baseline") {
    return {
      kind: "undated",
      reason:
        "You said you do not know what you eat in a day, which is the most honest answer on the form and the reason we are not handing you a date. A date built on a guessed calorie number is a guessed date.",
      nextDate: addWeeks(today, 1),
      nextDateMeans:
        "One week of eating the way you already eat, weighing in every morning. That gives you a real maintenance number, and the forecast opens on its own.",
    };
  }

  if (result.phase === "refuel") {
    return {
      kind: "undated",
      reason:
        "You have been dieting on a low intake for a while. Cutting from here is the state in which cutting stops working, so the phase in front of you is eating more, not less. A fat-loss date would be a date for a phase you are not in.",
      nextDate: addWeeks(today, 4),
      nextDateMeans:
        "Four weeks of eating more while training hard. Then a cut starts from a real maintenance and the date becomes worth printing.",
    };
  }

  if (result.phase === "maintenance" || result.phase === "lean_build") {
    return {
      kind: "undated",
      reason:
        "What you asked for is muscle, and muscle does not arrive on a schedule the way fat leaves. Anyone printing you a date for it is selling you one.",
      nextDate: addWeeks(today, 6),
      nextDateMeans:
        "Six weeks is when the lifts tell you whether the surplus is working. That is the first honest checkpoint, and it is a measurement, not a finish line.",
    };
  }

  // fat_loss: the only phase that earns a date.
  //
  // The deficit is measured against ESTIMATED EXPENDITURE, not against what the
  // reader said they eat. assess() prescribes `workingBaseline - 400` as an
  // iterative two-week probe — its own copy says "if the average has not moved
  // after two full weeks, that is when something changes". Extrapolating that
  // probe to a calendar date turns a relative adjustment into a claimed
  // physiological rate: a reader reporting 4,000 kcal against a 2,900 TDEE
  // would have been forecast losing 0.8 lb a week while actually gaining, and
  // a reader reporting 2,500 against 2,908 would have been told twice the time
  // they need. Both errors were unbounded. Expenditure is the only baseline
  // that makes the number mean anything.
  const prescribed = result.higherCarb.calories;
  const dailyDeficit = Math.max(0, result.estimatedTdee - prescribed);
  const uncapped = (dailyDeficit * 7) / KCAL_PER_LB;
  const ceiling = weightLb * MAX_WEEKLY_FRACTION;
  const weeklyRateLb = Math.round(Math.min(uncapped, ceiling) * 10) / 10;

  if (weeklyRateLb <= 0 || result.fatToLoseLb <= 0) {
    return {
      kind: "undated",
      reason:
        "At the intake this phase prescribes you are already close enough to the target that a countdown would be noise.",
      nextDate: addWeeks(today, 4),
      nextDateMeans:
        "Four weeks of holding this intake tells you whether you are where you think you are.",
    };
  }

  const rawWeeks = Math.ceil(result.fatToLoseLb / weeklyRateLb);

  if (rawWeeks > MAX_WEEKS) {
    // Previously this printed today + 78 weeks as the headline date, with a
    // one-week band around a date the function knew was wrong, and put the
    // caveat BELOW the email form. A 300 lb reader at 35% targeting 15% lands
    // here, which is the core audience, not an edge case.
    return {
      kind: "undated",
      reason: `From here it is more than ${MAX_WEEKS} weeks of steady fat loss to that target, and a line drawn that far out is a horoscope. The distance is real; the date is not something anyone can honestly give you today.`,
      nextDate: addWeeks(today, 12),
      nextDateMeans:
        "Twelve weeks is the first honest checkpoint. Run the block, weigh in, and the remaining distance gets forecast from numbers instead of estimates.",
    };
  }

  const weeks = rawWeeks;
  const truncatedAt = null;

  const curve: ForecastPoint[] = [];
  for (let week = 0; week <= weeks; week += 1) {
    const lost = Math.min(result.fatToLoseLb, weeklyRateLb * week);
    const w = weightLb - lost;
    // Lean mass is held flat on purpose: this phase is built to protect it,
    // and a curve that quietly spends it would forecast a worse body at the
    // same weight.
    curve.push({
      week,
      weightLb: Math.round(w * 10) / 10,
      bodyFatPct:
        Math.round(((w - result.leanMassLb) / w) * 1000) / 10,
    });
  }

  return {
    kind: "dated",
    weeklyRateLb,
    weeks,
    target: addWeeks(today, weeks),
    earliest: addWeeks(today, Math.max(1, weeks - 1)),
    latest: addWeeks(today, weeks + 1),
    curve,
    truncatedAt,
  };
}

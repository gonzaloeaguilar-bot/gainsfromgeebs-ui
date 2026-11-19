// ============================================================
//  Read the Week
//
//  Eight rounds. Each one shows a client's week exactly as a coach
//  receives it, and asks the only question that matters on a Monday:
//  cut, hold, or add food.
//
//  The teaching sits in the scoring. The most common wrong answer is
//  cutting a week that was never actually run, and the game says so
//  every time it happens. That is the whole argument for coaching,
//  made by letting someone get it wrong rather than by claiming it.
//
//  Scenarios are generated from a seed so a shared link replays the
//  identical eight weeks. "I got 6 of 8" is only a challenge if the
//  other person gets the same eight weeks.
// ============================================================

export type Move = "cut" | "hold" | "add";

export type Week = {
  /** Daily weigh-ins, Monday first. Some days are missing on purpose. */
  weighIns: (number | null)[];
  thisAvg: number;
  lastAvg: number;
  /** Days out of 7 the calorie target was hit. */
  caloriesHit: number;
  targetCalories: number;
  avgSteps: number;
  stepTarget: number;
  sessionsDone: number;
  sessionsPlanned: number;
  weeksInPhase: number;
  bodyweight: number;
};

export type Round = {
  week: Week;
  answer: Move;
  headline: string;
  because: string;
};

// ---------- deterministic RNG -------------------------------

/** mulberry32. Small, fast, and identical in every browser, which is
 *  the only property that matters here: a shared seed has to replay
 *  the same eight weeks or the score means nothing. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;

// ---------- the rule ----------------------------------------

/** The order matters, and it is the lesson.
 *
 *  Adherence is read BEFORE the scale. A week that was not run cannot
 *  tell you whether the plan works, so there is nothing to change: the
 *  only honest move is to hold and run it properly. Changing the plan
 *  on the back of a week nobody followed is the single most common
 *  self-coaching mistake, and it is why people end up on 1,200
 *  calories wondering why nothing moves. */
export function correctMove(w: Week): { move: Move; headline: string; because: string } {
  const adherence = w.caloriesHit / 7;
  const drop = w.lastAvg - w.thisAvg;
  const dropPct = (drop / w.bodyweight) * 100;

  if (adherence < 0.7) {
    return {
      move: "hold",
      headline: "Hold. This week was not run.",
      because: `Calories were hit on ${w.caloriesHit} of 7 days. A week that was not followed cannot tell you whether the plan works, so there is nothing in it to adjust. Changing the number here is how people end up cutting again and again on data they never actually produced. Run this same week properly, then decide.`,
    };
  }

  if (w.sessionsDone < w.sessionsPlanned - 1) {
    return {
      move: "hold",
      headline: "Hold. Training is the gap, not the food.",
      because: `Only ${w.sessionsDone} of ${w.sessionsPlanned} sessions happened. Cutting calories to compensate for missed training trades muscle for a faster scale, which is the opposite of the goal. Get the sessions back first.`,
    };
  }

  if (dropPct > 1.1) {
    return {
      move: "add",
      headline: "Add food. This is faster than it should be.",
      because: `Down ${round1(drop)} lb, about ${round1(dropPct)}% of bodyweight in a week. Past roughly 1% the extra loss starts coming from muscle, and the intake has nowhere left to go when progress stalls later. Add food back and keep the deficit sustainable.`,
    };
  }

  if (dropPct < 0.15 && w.weeksInPhase >= 2) {
    return {
      move: "cut",
      headline: "Cut. Two honest weeks, no movement.",
      because: `Adherence was good and the average moved ${round1(drop)} lb across ${w.weeksInPhase} weeks. That is the one situation that justifies taking calories down: the plan was run, and it is no longer producing. A small cut, then two more weeks of data.`,
    };
  }

  return {
    move: "hold",
    headline: "Hold. It is working.",
    because: `Down ${round1(drop)} lb, roughly ${round1(dropPct)}% of bodyweight, on ${w.caloriesHit} of 7 days. That is the rate you want. The hardest thing a coach does is leave a working plan alone, and changing something here buys nothing except a variable you can no longer read.`,
  };
}

// ---------- scenario generation -----------------------------

type Shape = "not_run" | "too_fast" | "stalled" | "on_track" | "missed_training";

const SHAPES: Shape[] = [
  "on_track",
  "not_run",
  "too_fast",
  "stalled",
  "on_track",
  "not_run",
  "missed_training",
  "stalled",
];

function buildWeek(shape: Shape, r: () => number): Week {
  const bodyweight = Math.round(165 + r() * 70);
  const targetCalories = Math.round((2000 + r() * 700) / 10) * 10;
  const stepTarget = [7000, 8000, 10000][Math.floor(r() * 3)];
  const sessionsPlanned = 3 + Math.floor(r() * 3);

  let drop: number;
  let caloriesHit: number;
  let sessionsDone = sessionsPlanned;
  let weeksInPhase = 1 + Math.floor(r() * 4);
  let avgSteps = Math.round((stepTarget * (0.9 + r() * 0.25)) / 100) * 100;

  switch (shape) {
    case "not_run":
      // Adherence is the story. The scale is deliberately ambiguous so
      // the only readable signal is the one being tested.
      caloriesHit = 2 + Math.floor(r() * 3);
      drop = (r() - 0.35) * 2.2;
      avgSteps = Math.round((stepTarget * (0.6 + r() * 0.3)) / 100) * 100;
      break;
    case "too_fast":
      caloriesHit = 6 + Math.floor(r() * 2);
      drop = bodyweight * (0.013 + r() * 0.008);
      break;
    case "stalled":
      caloriesHit = 6 + Math.floor(r() * 2);
      drop = r() * 0.2 - 0.05;
      weeksInPhase = 2 + Math.floor(r() * 3);
      break;
    case "missed_training":
      caloriesHit = 6 + Math.floor(r() * 2);
      sessionsDone = Math.max(0, sessionsPlanned - 2 - Math.floor(r() * 2));
      drop = bodyweight * (0.004 + r() * 0.004);
      break;
    default:
      caloriesHit = 6 + Math.floor(r() * 2);
      drop = bodyweight * (0.004 + r() * 0.005);
  }

  const thisAvg = round1(bodyweight);
  const lastAvg = round1(bodyweight + drop);

  // Daily readings scatter around the average. Two days are dropped at
  // random, because real check-ins have holes and reading through them
  // is part of the skill.
  const weighIns: (number | null)[] = [];
  for (let i = 0; i < 7; i++) {
    const noise = (r() - 0.5) * 2.4;
    weighIns.push(round1(thisAvg + noise + (drop / 7) * (3 - i) * 0.25));
  }
  const missing = shape === "not_run" ? 2 : Math.floor(r() * 2);
  for (let m = 0; m < missing; m++) {
    weighIns[Math.floor(r() * 7)] = null;
  }

  return {
    weighIns,
    thisAvg,
    lastAvg,
    caloriesHit,
    targetCalories,
    avgSteps,
    stepTarget,
    sessionsDone,
    sessionsPlanned,
    weeksInPhase,
    bodyweight: thisAvg,
  };
}

export const ROUND_COUNT = SHAPES.length;

/** Builds the eight rounds for a seed. Pure: same seed, same game. */
export function buildGame(seed: number): Round[] {
  const r = rng(seed);
  // Shape order is shuffled per seed so the run is not memorisable,
  // while the mix stays balanced: no player gets eight identical weeks.
  const shapes = [...SHAPES];
  for (let i = shapes.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [shapes[i], shapes[j]] = [shapes[j], shapes[i]];
  }

  return shapes.map((shape) => {
    const week = buildWeek(shape, r);
    const { move, headline, because } = correctMove(week);
    return { week, answer: move, headline, because };
  });
}

/** A seed short enough to live in a URL and be read aloud. */
export function newSeed(): number {
  return Math.floor(Math.random() * 1_000_000);
}

export function verdictFor(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "Perfect. You read every week the way a coach would.";
  if (pct >= 0.75)
    return "Strong. You caught most of them, including at least one week that only looked like it needed a change.";
  if (pct >= 0.5)
    return "Middle of the pack, which is where most people land. The weeks that catch everyone out are the ones where the honest answer is to change nothing.";
  return "This is the hard part of doing it alone. Most of these weeks look like they are asking for a change, and most of them are not.";
}

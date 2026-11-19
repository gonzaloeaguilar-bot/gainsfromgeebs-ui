/**
 * Pure logic for the Daily Habit & Routine Tracker.
 * No side effects or DOM dependencies, fully unit-testable.
 */

export interface HabitItem {
  id: string;
  label: string;
  category: "nutrition" | "training" | "recovery" | "habit";
  isCustom?: boolean;
}

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: "protein",
    label: "Hit daily protein target (0.7–1.0g per lb target weight)",
    category: "nutrition",
  },
  {
    id: "activity",
    label: "Complete planned workout or 30+ min active movement",
    category: "training",
  },
  {
    id: "hydration",
    label: "Reach daily hydration floor (80–120 oz water)",
    category: "nutrition",
  },
  {
    id: "sleep",
    label: "Protect 7–8 hour sleep and recovery window",
    category: "recovery",
  },
  {
    id: "nutrition",
    label: "Eat at least 2 whole-food, protein-first meals",
    category: "nutrition",
  },
];

export const ROTATING_DAILY_FOCUS: { topic: string; tip: string }[] = [
  {
    topic: "Sunday Focus: Recovery & Mobility",
    tip: "Prioritize low-intensity movement, joint mobility, and setting up your environment for the upcoming week.",
  },
  {
    topic: "Monday Focus: Progressive Resistance",
    tip: "Focus on logbook accuracy. Record every weight and rep to ensure progressive overload over time.",
  },
  {
    topic: "Tuesday Focus: Protein Distribution",
    tip: "Distribute your total daily protein across 3 to 4 distinct feeding windows to maximize muscle protein synthesis.",
  },
  {
    topic: "Wednesday Focus: Hydration & Electrolytes",
    tip: "Drink fluid early in the day and maintain steady sodium/water intake to support training performance.",
  },
  {
    topic: "Thursday Focus: Sleep Hygiene",
    tip: "Keep a consistent bed and wake time to stabilize circadian rhythm and optimize recovery hormones.",
  },
  {
    topic: "Friday Focus: Daily Step Count",
    tip: "Maintain non-exercise activity thermogenesis (NEAT) by interspersing short walking breaks throughout work hours.",
  },
  {
    topic: "Saturday Focus: Meal Preparation",
    tip: "Prep high-protein staples in advance to make consistent nutrition frictionless during busy days.",
  },
];

/**
 * Returns date formatted as YYYY-MM-DD in local time.
 */
export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates current streak (consecutive days with at least 1 completed habit)
 * and total active check-in days from a completion history map.
 */
export function calculateStreak(
  history: Record<string, string[]>,
  todayKeyString: string = getTodayKey()
): { currentStreak: number; totalActiveDays: number } {
  const dates = Object.keys(history).filter((k) => (history[k]?.length ?? 0) > 0);
  const totalActiveDays = dates.length;

  if (totalActiveDays === 0) {
    return { currentStreak: 0, totalActiveDays: 0 };
  }

  const dateSet = new Set(dates);
  let streak = 0;

  // Check today first
  const today = new Date(todayKeyString + "T00:00:00");
  const cursor = new Date(today);

  // If today has completed habits, start counting from today.
  // If today has no completed habits yet, check yesterday to keep streak alive.
  if (!dateSet.has(todayKeyString)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = getTodayKey(cursor);
    if (dateSet.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak: streak, totalActiveDays };
}

/**
 * Gets rotating focus topic based on day of week (0-6).
 */
export function getDailyFocus(date: Date = new Date()): { topic: string; tip: string } {
  const dayOfWeek = date.getDay();
  return ROTATING_DAILY_FOCUS[dayOfWeek] || ROTATING_DAILY_FOCUS[0];
}

/**
 * Formats daily progress for clipboard sharing.
 */
export function formatProgressSummary(
  completedCount: number,
  totalCount: number,
  streak: number,
  dateKey: string
): string {
  return `Geebs Daily Tracker (${dateKey}): ${completedCount}/${totalCount} habits complete. Current streak: ${streak} day${streak === 1 ? "" : "s"}. https://gainsfromgeebs.com/tools/daily-habit-tracker`;
}

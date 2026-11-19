import type { ScienceStudy } from "@/data/scienceLibrary";

// ============================================================
//  Daily Finding — deterministic day → study selection
//
//  The /free/daily page is a daily-return habit surface: one
//  already-published, vetted study per calendar day, rotating
//  through the science library. Selection is pure + deterministic
//  so the server (ISR) and any test agree for a given day, and
//  consecutive days advance by exactly one (cycling the pool).
//
//  NOTE: this file only SELECTS existing, human-approved study
//  content (coachTakeaway / claimGuardrail authored through the
//  science pipeline). It never generates coaching prose.
// ============================================================

/** Whole days since the Unix epoch in UTC — stable for a full calendar day. */
export function daySeed(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000);
}

/** UTC date label, e.g. "2026-07-27". */
export function utcDayLabel(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Deterministically pick one item for a given UTC day.
 * Same day → same item; consecutive days advance by one; the pool cycles.
 */
export function pickDailyStudy(
  studies: readonly ScienceStudy[],
  date: Date,
): ScienceStudy {
  if (studies.length === 0) {
    throw new Error("pickDailyStudy: empty study pool");
  }
  const seed = daySeed(date);
  const idx = ((seed % studies.length) + studies.length) % studies.length;
  return studies[idx];
}

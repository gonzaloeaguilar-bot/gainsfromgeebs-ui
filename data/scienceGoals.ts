/**
 * The goals a reader of a science topic page is actually here for.
 *
 * This is the second of the two gamification mechanics the vault's own audit
 * found measured backing for — "entrada → salida personalizada", input turned
 * into an answer about you (see busqueda-mecanicas-juego-2026-09-20, which
 * concluded that of all gamification only a visible progress meter and a
 * personalised output hold up, and that everything else on offer out there is
 * a game engine, not a brand-site component).
 *
 * The match is on the study's own keywords and takeaway text, never on a
 * hand-maintained list of study ids: a new study lands in the library weekly
 * and a list would silently stop covering it.
 */
export type ScienceGoal = {
  id: string;
  label: string;
  /** Said back to the reader once they pick. Names what to change, not a promise. */
  readout: string;
  /** Lowercased substrings matched against keywords + takeaway + title. */
  match: string[];
};

export const scienceGoals: ScienceGoal[] = [
  {
    id: "build",
    label: "Build muscle",
    readout:
      "Then the studies that decide your week are the volume and frequency ones: enough hard sets to progress, spread across the week, only added while performance still holds.",
    match: [
      "hypertroph", "volume", "set", "frequency", "strength", "overload",
      "progressive", "muscle growth", "resistance training", "advanced",
    ],
  },
  {
    id: "cut",
    label: "Lose fat, keep muscle",
    readout:
      "Then lifting is the part of the diet that protects what you already built. Judge the phase by strength and measurements, not by how fast the scale moves.",
    match: [
      "fat loss", "fat-loss", "weight loss", "deficit", "diet", "cardio",
      "body composition", "fat mass", "fat-free", "obesity", "metabolic",
      "satiety", "appetite", "protein",
    ],
  },
  {
    id: "return",
    label: "Come back after a break",
    readout:
      "Then the detraining and muscle-memory studies are yours: you are not starting from zero, and a small repeatable dose beats waiting for a perfect week.",
    match: [
      "detrain", "retrain", "muscle memory", "myonucle", "break", "layoff",
      "reduced training", "maintenance", "comeback", "preserve",
    ],
  },
];

export function scoreStudyForGoal(
  study: { keywords?: readonly string[]; coachTakeaway?: string; shortTitle?: string; title?: string },
  goal: ScienceGoal,
): number {
  const haystack = [
    ...(study.keywords ?? []),
    study.coachTakeaway ?? "",
    study.shortTitle ?? "",
    study.title ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return goal.match.reduce(
    (score, needle) => (haystack.includes(needle) ? score + 1 : score),
    0,
  );
}

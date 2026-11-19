import type { ScienceStudy } from "@/data/scienceLibrary";

/**
 * Food and compound entities for the nutrition library.
 *
 * Every entity here must be backed by studies that already passed the normal
 * review path (PubMed scan -> inbox review -> promoted study). Nothing is
 * authored from memory: `studyIds` are the promoted studies that support the
 * entry, and the evidence grade is derived from those studies rather than
 * assigned by hand.
 */

export type NutritionOutcome =
  | "Testosterone"
  | "Growth hormone"
  | "Longevity"
  | "Muscle";

export type NutritionEntityKind = "food" | "compound";

/** A-D grade plus an explicit "not enough evidence" bucket. */
export type EvidenceGrade = "A" | "B" | "C" | "D" | "Insufficient";

export type NutritionDoseRow = {
  /** What the reader actually eats or takes, e.g. "Creatine monohydrate". */
  form: string;
  /** Amount in whole units a reader can measure, e.g. "3-5 g". */
  amount: string;
  /** When it is taken, or "Any time" when timing does not matter. */
  timing: string;
  /** One plain sentence on what the amount is for. */
  note: string;
};

export type NutritionEntity = {
  slug: string;
  name: string;
  kind: NutritionEntityKind;
  /** Alternate names people search for. */
  aliases: string[];
  outcomes: NutritionOutcome[];
  /** Promoted study ids from the science library. */
  studyIds: string[];
  /** One-sentence mechanism in plain English. */
  mechanism: string;
  /** What the evidence does NOT show. Required — every entity states its limits. */
  honestLimits: string;
  doses: NutritionDoseRow[];
  /** Why this matters for a man juggling work, travel, and training. */
  practicalNote: string;
  relatedHrefs: string[];
  keywords: string[];
  faqs?: { question: string; answer: string }[];
  dateModified?: string;
};

/**
 * Study designs ranked by how much confidence a single study earns.
 * Matched case-insensitively against `ScienceStudy.evidenceType`.
 */
const DESIGN_TIERS: { tier: 3 | 2 | 1; patterns: RegExp }[] = [
  { tier: 3, patterns: /meta-analysis|systematic review|umbrella review/i },
  {
    tier: 2,
    patterns: /randomi[sz]ed|randomised|randomized|\brct\b|crossover|controlled trial/i,
  },
  {
    tier: 1,
    patterns: /cohort|observational|cross-sectional|case-control|mechanistic|animal|in vitro|analysis|survey/i,
  },
];

export function studyDesignTier(evidenceType: string): 0 | 1 | 2 | 3 {
  for (const { tier, patterns } of DESIGN_TIERS) {
    if (patterns.test(evidenceType)) return tier;
  }
  return 0;
}

/**
 * Derive an evidence grade from the supporting studies.
 *
 * A — at least one meta-analysis/systematic review, plus 2+ supporting studies.
 * B — a meta-analysis alone, or 2+ randomized trials.
 * C — one randomized trial.
 * D — only observational or mechanistic work.
 * Insufficient — nothing promoted yet.
 *
 * The rubric is deliberately blunt: it cannot be argued with, and it stops a
 * page claiming more confidence than its citations support.
 */
export function gradeFromStudies(studies: Pick<ScienceStudy, "evidenceType">[]): EvidenceGrade {
  if (studies.length === 0) return "Insufficient";

  const tiers = studies.map((study) => studyDesignTier(study.evidenceType));
  const pooled = tiers.filter((tier) => tier === 3).length;
  const randomized = tiers.filter((tier) => tier === 2).length;
  const supporting = tiers.filter((tier) => tier >= 1).length;

  if (pooled >= 1 && supporting >= 3) return "A";
  if (pooled >= 1 || randomized >= 2) return "B";
  if (randomized === 1) return "C";
  if (supporting >= 1) return "D";
  return "Insufficient";
}

/** Reader-facing label for a grade. Never shown as a bare letter. */
export const EVIDENCE_GRADE_LABELS: Record<EvidenceGrade, string> = {
  A: "Strong — pooled trial evidence",
  B: "Moderate — repeated trial evidence",
  C: "Early — one trial",
  D: "Weak — observational or lab work only",
  Insufficient: "Not enough evidence yet",
};

/**
 * Entities are added one at a time as their studies clear review, so this list
 * grows with the library instead of being pre-populated with unsourced claims.
 */
export const nutritionEntities: NutritionEntity[] = [];

export function nutritionEntityBySlug(slug: string) {
  return nutritionEntities.find((entity) => entity.slug === slug);
}

export function nutritionEntitiesByOutcome(outcome: NutritionOutcome) {
  return nutritionEntities.filter((entity) => entity.outcomes.includes(outcome));
}

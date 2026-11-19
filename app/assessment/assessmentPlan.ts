export type PhotoFocus = "fat_loss" | "recomp" | "build";

export const SCIENCE_SOURCES = {
  protein_fat_loss: { label: "Protein during fat loss: Stokes et al. (PMID 29414855)", href: "/blog/how-much-protein-to-lose-fat" },
  protein_age: { label: "Protein and lifting after 40", href: "/nutrition/muscle-after-40" },
  plant_protein: { label: "Plant-based muscle nutrition", href: "/nutrition/plant-based-muscle-growth" },
  omega3: { label: "Food-first omega-3 guidance", href: "/science/omega-3-and-hormones" },
  magnesium: { label: "Food-first magnesium guidance", href: "/science/magnesium" },
  steps: { label: "Daily step target evidence", href: "/tools/daily-step-tracker" },
  training: { label: "Strength training and muscle retention", href: "/nutrition/muscle-after-40" },
  cardio: { label: "Cardio and lifting: what each is for", href: "/science/cardio-longevity-studies" },
  sleep: { label: "Sleep, appetite and recovery evidence", href: "/science/sleep-and-fat-loss-studies" },
  peptides: { label: "GLP-1s and peptides: muscle-protection evidence", href: "/science/peptides-body-composition-studies" },
} as const;

type SourceId = keyof typeof SCIENCE_SOURCES;
type RawItem = { item?: unknown; why?: unknown; sourceId?: unknown };
export type AssessmentPlan = {
  summary: string;
  food: Array<{ item: string; why: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] }>;
  supplements: Array<{ item: string; why: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] }>;
  movement: string;
  agePriority: string;
  split: string[];
  guide: Array<{ area: "food" | "lifting" | "cardio" | "steps" | "sleep"; action: string; why: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] }>;
  peptideGuide?: { action: string; why: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] };
  meals: Array<{ name: string; ingredients: string; howTo: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] }>;
  workouts: Array<{ day: string; exercises: string[]; why: string; evidence: (typeof SCIENCE_SOURCES)[SourceId] }>;
};

function item(value: RawItem, kind: "food" | "supplement") {
  if (typeof value.item !== "string" || typeof value.why !== "string" || typeof value.sourceId !== "string" || !(value.sourceId in SCIENCE_SOURCES)) return null;
  const normalized = value.item.toLowerCase();
  if (kind === "food") {
    const matches: Record<SourceId, RegExp> = {
      protein_fat_loss: /protein|chicken|turkey|egg|fish|salmon|beef|yogurt|cottage cheese|tofu|tempeh|seitan|soy|lentil|bean|pea/,
      protein_age: /protein|chicken|turkey|egg|fish|salmon|beef|yogurt|cottage cheese|tofu|tempeh|seitan|soy|lentil|bean|pea/,
      plant_protein: /tofu|tempeh|soy|lentil|bean|pea|seitan|edamame/,
      omega3: /salmon|sardine|mackerel|trout|anchov|walnut|chia|flax/,
      magnesium: /leafy|spinach|kale|bean|lentil|whole grain|oat|brown rice|nut|seed|pumpkin/,
      steps: /$^/,
      training: /$^/,
    };
    if (!matches[value.sourceId as SourceId].test(normalized)) return null;
  }
  if (kind === "supplement" && !((value.sourceId === "magnesium" && /magnesium/.test(normalized)) || (value.sourceId === "omega3" && /omega.?3|fish oil|algae/.test(normalized)))) return null;
  return { item: value.item.slice(0, 120), why: value.why.slice(0, 300), evidence: SCIENCE_SOURCES[value.sourceId as SourceId] };
}

export function parseAssessmentPlan(value: unknown): AssessmentPlan | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.summary !== "string" || typeof raw.movement !== "string" || typeof raw.agePriority !== "string" || !Array.isArray(raw.food) || !Array.isArray(raw.supplements) || !Array.isArray(raw.split) || !Array.isArray(raw.guide) || !Array.isArray(raw.meals) || !Array.isArray(raw.workouts)) return null;
  const food = raw.food.map((entry) => item(entry as RawItem, "food")).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const supplements = raw.supplements.map((entry) => item(entry as RawItem, "supplement")).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const split = raw.split.filter((entry): entry is string => typeof entry === "string").map((entry) => entry.slice(0, 160));
  const guide = raw.guide.map((entry) => {
    const row = entry as Record<string, unknown>;
    if (!['food', 'lifting', 'cardio', 'steps', 'sleep'].includes(String(row.area)) || typeof row.action !== 'string' || typeof row.why !== 'string' || typeof row.sourceId !== 'string' || !(row.sourceId in SCIENCE_SOURCES)) return null;
    return { area: row.area as AssessmentPlan['guide'][number]['area'], action: row.action.slice(0, 180), why: row.why.slice(0, 280), evidence: SCIENCE_SOURCES[row.sourceId as SourceId] };
  }).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const peptide = raw.peptideGuide as Record<string, unknown> | undefined;
  const peptideGuide = peptide && typeof peptide.action === 'string' && typeof peptide.why === 'string' && peptide.sourceId === 'peptides'
    ? { action: peptide.action.slice(0, 180), why: peptide.why.slice(0, 280), evidence: SCIENCE_SOURCES.peptides }
    : undefined;
  const meals = raw.meals.map((entry) => { const row = entry as Record<string, unknown>; return typeof row.name === 'string' && typeof row.ingredients === 'string' && typeof row.howTo === 'string' && typeof row.sourceId === 'string' && row.sourceId in SCIENCE_SOURCES ? { name: row.name.slice(0, 100), ingredients: row.ingredients.slice(0, 260), howTo: row.howTo.slice(0, 300), evidence: SCIENCE_SOURCES[row.sourceId as SourceId] } : null; }).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const workouts = raw.workouts.map((entry) => { const row = entry as Record<string, unknown>; const exercises = Array.isArray(row.exercises) ? row.exercises.filter((x): x is string => typeof x === 'string').slice(0, 5).map((x) => x.slice(0, 100)) : []; return typeof row.day === 'string' && typeof row.why === 'string' && row.sourceId === 'training' && exercises.length >= 2 ? { day: row.day.slice(0, 100), exercises, why: row.why.slice(0, 260), evidence: SCIENCE_SOURCES.training } : null; }).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  if (food.length < 3 || food.length > 5 || supplements.length > 3 || split.length < 2 || split.length > 5 || guide.length !== 5 || new Set(guide.map((row) => row.area)).size !== 5 || meals.length < 2 || meals.length > 3 || workouts.length !== trainingDaysFromSplit(split)) return null;
  return { summary: raw.summary.slice(0, 260), food, supplements, movement: raw.movement.slice(0, 260), agePriority: raw.agePriority.slice(0, 260), split, guide, peptideGuide, meals, workouts };
}

function trainingDaysFromSplit(split: string[]) { return split.length; }

import type { ClientResult } from "@/data/clientResults";

/**
 * The one-line attribution under a client story: who he is, and enough of his
 * life for a reader to recognise himself.
 *
 * /results already assembled this inline while the homepage rail printed the
 * bare name, so the same person read as "Jhoan Rincon" in one place and
 * "Jhoan Rincon · 46 · 3 months coached" in another. One function now, used by
 * both, so a field added to the data file appears on every surface at once.
 *
 * Every part is optional and absent parts are dropped, never rendered as an
 * empty separator — a story with only a name still reads as just the name.
 */
export function clientMetaLabel(result: ClientResult): string {
  return [
    result.name,
    result.age ? String(result.age) : null,
    result.occupation ?? null,
    result.coachingLength ??
      (result.monthsCoached ? `${result.monthsCoached} months coached` : null),
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * The outcome line, with the waist change appended when the client reported
 * one. Kept separate from the label because the outcome is the claim and the
 * label is the attribution; they sit in different places on both surfaces.
 */
export function clientOutcomeLine(result: ClientResult): string {
  return result.waistInches
    ? `${result.outcome} · waist ${result.waistInches}`
    : result.outcome;
}

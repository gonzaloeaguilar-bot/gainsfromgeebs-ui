/**
 * Four honest buckets over the library's evidence types.
 *
 * WHY NOT THE RAW TYPES. Rendering one chip per distinct `evidenceType` put
 * eight chips and 380px of controls — 45% of a phone screen — above the first
 * study on /science/muscle-training-studies, and five of those eight had a
 * count of 1 or 2. One of them read "Controlled training, detraining, and
 * retraining study 1". That is a taxonomy dump, not a filter: the reader meets
 * eight research-design terms before a sentence of science, and every chip but
 * two narrows twelve studies to one.
 *
 * The buckets are ordered by evidential weight, strongest first, because that
 * is the question a reader actually has — "how much should I trust this" —
 * and because it is the one axis the data genuinely carries.
 */
export type EvidenceBucket = {
  id: string;
  label: string;
  /** Lowercase substrings tested against the study's evidenceType. */
  match: string[];
};

/* Order matters: the first bucket whose match hits wins, so the stronger
   designs are claimed before the looser ones. "Systematic review and
   meta-analysis of randomized trials" is a review, not a trial. */
export const evidenceBuckets: EvidenceBucket[] = [
  {
    id: "reviews",
    label: "Reviews of many studies",
    match: ["meta-analysis", "meta-regression", "systematic review", "umbrella", "overview of reviews", "position stand"],
  },
  { id: "trials", label: "Controlled trials", match: ["randomized", "randomised", "controlled", "trial", "rct"] },
  { id: "observational", label: "Observational", match: ["cohort", "cross-sectional", "observational", "survey", "analysis"] },
  { id: "narrative", label: "Narrative reviews", match: ["narrative", "review", "commentary", "editorial"] },
];

export function bucketForEvidenceType(evidenceType: string): string {
  const needle = evidenceType.toLowerCase();
  const hit = evidenceBuckets.find((bucket) =>
    bucket.match.some((term) => needle.includes(term)),
  );
  // Never invent a bucket for something that matches none of them: an
  // unmatched study stays visible under "All", which is the safe direction.
  return hit?.id ?? "other";
}

// ============================================================
//  Evidence tier
//
//  Turns the free-text evidenceType already on every study into a
//  position on the standard evidence hierarchy, so a reader can tell
//  in one glance whether they are looking at pooled randomised data
//  or at one narrative review.
//
//  This is the single most useful fact on a study page and it was
//  buried in a metadata list. It is also the only "big number" these
//  pages can honestly carry: the library holds no sample sizes and no
//  effect sizes, and inventing them onto peer-reviewed claims to fill
//  a nice-looking stat card is not a trade worth making.
// ============================================================

export type EvidenceTier = 1 | 2 | 3 | 4;

export type TierInfo = {
  tier: EvidenceTier;
  /** Short label shown in the card. */
  label: string;
  /** One sentence a non-specialist can act on. */
  meaning: string;
};

const TIERS: Record<EvidenceTier, Omit<TierInfo, "tier">> = {
  1: {
    label: "Strongest evidence",
    meaning:
      "This pools results from many separate studies, so it carries more weight than any single trial on its own.",
  },
  2: {
    label: "Strong evidence",
    meaning:
      "A controlled trial, where people were randomly assigned. That is the design that can actually show cause rather than coincidence.",
  },
  3: {
    label: "Moderate evidence",
    meaning:
      "An observational study. It can show that two things travel together, but not that one caused the other.",
  },
  4: {
    label: "Early or limited evidence",
    meaning:
      "A review, a lab study, or an analysis of collected data. Useful for direction, not strong enough to settle a question.",
  },
};

/** Order matters. "Systematic review and meta-analysis of randomized trials"
 *  must land on tier 1, not tier 2, so the pooled patterns are tested first. */
const RULES: { test: RegExp; tier: EvidenceTier }[] = [
  { test: /meta-analysis|meta-regression|umbrella review|overview of (reviews|meta-analyses)|position stand|systematic review/i, tier: 1 },
  { test: /randomi[sz]ed|randomi[sz]ed controlled|crossover trial|placebo-controlled/i, tier: 2 },
  { test: /cohort|prospective|longitudinal|case-control/i, tier: 3 },
];

export function evidenceTier(evidenceType: string): TierInfo {
  for (const rule of RULES) {
    if (rule.test.test(evidenceType)) {
      return { tier: rule.tier, ...TIERS[rule.tier] };
    }
  }
  // Narrative reviews, advisories, preclinical and wearable-data work all
  // land here. Defaulting DOWN is the safe direction: overstating the
  // strength of a study is the one error this component must never make.
  return { tier: 4, ...TIERS[4] };
}

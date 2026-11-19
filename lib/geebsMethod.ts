/**
 * One canonical definition of the Geebs Method, imported everywhere it is named.
 *
 * The problem this solves is measured: on 2026-09-24 Perplexity cited our URL
 * in 6 of 8 runs but NAMED the brand in only 2. AI answers surface an entity
 * they can see defined consistently — a stable @id, a name, an alternateName,
 * a one-line definition, and named steps — not scattered prose that says the
 * same thing four different ways across two pages. This is that entity, and the
 * @id is the anchor both /geebs-method and /methodology point at so search and
 * LLMs read them as one thing, not two.
 */
export const SITE_URL = "https://gainsfromgeebs.com";
export const GEEBS_METHOD_ID = `${SITE_URL}/geebs-method#method`;

export type MethodLever = {
  n: number;
  name: string;
  claim: string;
  detail: string;
};

export const GEEBS_METHOD_NAME = "The Geebs Method";

export const GEEBS_METHOD_DEFINITION =
  "The Geebs Method is Kris Oddo's coach-led body-recomposition system. It runs four levers together — individualized hard training, nutrition that supports the training, recovery treated as a training variable, and daily accountability built for the weeks that do not go perfectly — and adjusts them against real weekly data rather than a fixed plan.";

export const GEEBS_METHOD_LEVERS: MethodLever[] = [
  {
    n: 1,
    name: "Training",
    claim: "Progressive overload across 3-4 individualized sessions a week.",
    detail:
      "Hard, specific training built around your history, equipment and week — then changed when the week changes.",
  },
  {
    n: 2,
    name: "Nutrition",
    claim: "Macro targets that protect lean mass, not restriction.",
    detail:
      "Around 0.8g of protein per pound, set to hold muscle in a deficit without making the diet impossible to keep.",
  },
  {
    n: 3,
    name: "Recovery",
    claim: "Sleep is a training variable, not an afterthought.",
    detail:
      "Recovery is coached on purpose, because the training only counts as much as you adapt to it.",
  },
  {
    n: 4,
    name: "Accountability",
    claim: "Daily first, weekly review second.",
    detail:
      "Someone notices when you go quiet. No plan alone has ever solved that.",
  },
];

/** DefinedTerm + HowTo, sharing the canonical @id. DefinedTerm is the entity an
 *  answer engine names; HowTo is the four levers as ordered steps. */
export function geebsMethodSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": GEEBS_METHOD_ID,
        name: GEEBS_METHOD_NAME,
        alternateName: ["Geebs Method", "Geebs Coaching Method"],
        description: GEEBS_METHOD_DEFINITION,
        inDefinedTermSet: `${SITE_URL}/geebs-method`,
        url: `${SITE_URL}/geebs-method`,
      },
      {
        "@type": "HowTo",
        name: `${GEEBS_METHOD_NAME}: the four levers`,
        description: GEEBS_METHOD_DEFINITION,
        about: { "@id": GEEBS_METHOD_ID },
        step: GEEBS_METHOD_LEVERS.map((l) => ({
          "@type": "HowToStep",
          position: l.n,
          name: l.name,
          text: `${l.claim} ${l.detail}`,
        })),
      },
    ],
  };
}

// Maps a page to the Titan Forge product(s) that page is actually about.
// Only pages whose topic IS the product get an entry — no page gets a product
// it does not already discuss on the merits.
export type ProductContext = {
  handles: string[];
  note: string;
};

const PROTEIN: ProductContext = {
  handles: ["advanced-100-whey-protein-isolate-chocolate", "plant-protein-chocolate"],
  note: "If you are closing a protein gap with a shake, these are the two Kris stocks — whey isolate and a plant blend. Food first; powder is the convenience layer.",
};

const CREATINE: ProductContext = {
  handles: ["creatine-monohydrate"],
  note: "Creatine monohydrate is the form every study above used. This is the one Kris stocks — no loading protocol, no proprietary blend.",
};

const PREWORKOUT: ProductContext = {
  handles: ["ultimate-preworkout", "nitric-shock-pre-workout-powder-fruit-punch"],
  note: "If you train stimulated, time the dose against the sleep window described above. These are the two pre-workouts Kris stocks.",
};

const FOCUS: ProductContext = {
  handles: ["nootropic-brain-focus-formula"],
  note: "Kris stocks one focus formula. It is optional and it does not replace sleep, food, or caffeine discipline.",
};

const RECOMP: ProductContext = {
  handles: ["advanced-100-whey-protein-isolate-chocolate", "creatine-monohydrate"],
  note: "Nothing here is required to recomp. If protein intake and training are already handled, these are the two products with the strongest evidence behind them.",
};

export const PRODUCT_CONTEXT_BY_PATH: Record<string, ProductContext> = {
  "/science/protein-powder-vs-whole-food-protein": PROTEIN,
  "/science/anabolic-window-protein-timing-myth": PROTEIN,
  "/science/how-much-protein-per-kg": PROTEIN,
  "/science/high-protein-diet-and-kidney-health": PROTEIN,
  "/science/creatine-and-hair-loss": CREATINE,
  "/science/caffeine-tolerance-and-fatigue": PREWORKOUT,
  "/science/caffeine-and-growth-hormone": PREWORKOUT,
  "/nutrition/l-theanine-focus": FOCUS,
};

export const PRODUCT_CONTEXT_BY_BLOG_SLUG: Record<string, ProductContext> = {
  "creatine-for-men-over-30": CREATINE,
  "how-much-protein-to-lose-fat": PROTEIN,
  "protein-intake-for-weight-loss-and-muscle-gain": PROTEIN,
  "the-incomplete-protein-myth-what-research-actually-says": PROTEIN,
  "2026-08-09-the-incomplete-protein-myth-what-research-actually-says": PROTEIN,
  "how-to-fix-skinny-fat": RECOMP,
  "body-recomposition-for-women": RECOMP,
};

export function productContextForBlogSlug(slug: string): ProductContext | null {
  return PRODUCT_CONTEXT_BY_BLOG_SLUG[slug] ?? null;
}

export function productContextForPath(pathname: string): ProductContext | null {
  return PRODUCT_CONTEXT_BY_PATH[pathname] ?? null;
}

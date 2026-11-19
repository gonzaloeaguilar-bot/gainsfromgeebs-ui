const RELATED_LINK_LABELS: Record<string, string> = {
  "/blog/are-you-training-hard-enough": "Are you training hard enough?",
  "/blog/calorie-deficit-without-counting-everything":
    "Calorie deficit without counting everything",
  "/blog/creatine-for-men-over-30": "Creatine for men over 30",
  "/blog/diet-soda-and-fat-loss": "Diet soda and fat loss",
  "/blog/how-much-cardio-for-fat-loss-men": "How much cardio for fat loss",
  "/blog/how-to-build-muscle-in-your-30s": "Build muscle in your 30s",
  "/blog/how-to-lose-fat-without-losing-muscle-men":
    "Lose fat without losing muscle",
  "/blog/how-to-stay-consistent-with-diet-on-weekends":
    "Stay consistent on weekends",
  "/blog/how-to-stay-fit-working-long-hours":
    "Stay fit working long hours",
  "/blog/intermittent-fasting-men-over-30": "Intermittent fasting over 30",
  "/blog/protein-intake-for-weight-loss-and-muscle-gain":
    "Protein for fat loss and muscle gain",
  "/blog/sleep-and-fat-loss-for-busy-professionals":
    "Sleep and fat loss for busy professionals",
  "/blog/training-after-35-men": "Training after 35",
  "/blog/weight-loss-for-men-who-hate-dieting":
    "Weight loss without hating dieting",
  "/guides/how-much-does-an-online-fitness-coach-cost":
    "Online fitness coach cost guide",
  "/methodology": "The Geebs Method",
  "/resources/bad-week-adjustment-loop": "Bad-week adjustment loop",
  "/resources/diet-soda-cutting": "Diet soda cutting guide",
  "/resources/protein-guide": "Protein guide",
  "/science/anti-aging-fitness-studies": "Anti-aging fitness studies",
  "/science/cardio-longevity-studies": "Cardio and longevity studies",
  "/science/creatine-and-hair-loss": "Creatine and hair loss",
  "/science/cravings-appetite-studies": "Cravings and appetite studies",
  "/science/high-protein-diet-and-kidney-health":
    "High-protein diet and kidney health",
  "/science/omega-3-fish-oil-studies": "Omega-3 and fish-oil studies",
  "/science/omega-3-and-hormones": "Omega-3 intake for men's health",
  "/science/fish-oil-vs-krill-oil": "Fish oil vs. krill oil comparison",
  "/science/protein-body-composition-studies":
    "Protein and body-composition studies",
  "/science/questions/does-fish-oil-build-muscle":
    "Does fish oil build muscle?",
  "/science/questions/does-omega-3-help-workout-recovery":
    "Does omega-3 help workout recovery?",
  "/science/questions/what-omega-3-dose-did-exercise-studies-test":
    "What omega-3 amount did studies test?",
  "/science/studies/omega3-inflammation-recovery-meta-2026":
    "Omega-3 recovery meta-analysis",
  "/science/studies/omega3-protein-synthesis-meta-2025":
    "Omega-3 and protein-synthesis review",
  "/science/studies/resistance-training-dose-response-meta-regression-2026":
    "Resistance-training dose-response meta-regression",
  "/science/sleep-and-fat-loss-studies": "Sleep and fat-loss studies",
  "/science/soy-and-testosterone-myth": "Soy and testosterone research review",
  "/science/eggs-and-testosterone": "Whole eggs and testosterone clinical review",
  "/science/cruciferous-vegetables-and-hormone-metabolism":
    "Cruciferous vegetables and hormone metabolism",
  "/science/meal-frequency-for-muscle-after-40":
    "Meal frequency for muscle after 40",
  "/science/oysters-and-zinc-for-men": "Oysters and zinc clinical review",
  "/science/zinc-picolinate-vs-gluconate": "Zinc picolinate vs. gluconate review",
  "/science/sleep-loss-and-testosterone": "Sleep loss and testosterone research review",
  "/science/eating-late-at-night-weight-gain-myth":
    "Eating late at night weight gain research review",
  "/for/glp-1-users": "Keep your muscle on a GLP-1",
  "/skinny-fat": "Skinny fat: the full guide",
  "/science/questions/how-to-lose-fat-without-losing-muscle":
    "Lose fat without losing muscle",
  "/tools/body-recomposition-calculator": "Body recomposition calculator",
  "/tools/calorie-deficit-calculator": "Calorie deficit calculator",
  "/tools/macro-calculator": "Macro calculator",
};

function fallbackLabelForHref(href: string) {
  const lastSegment = href.split("/").filter(Boolean).at(-1) ?? href;

  return lastSegment
    .split("-")
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join(" ");
}

export function labelForRelatedHref(href: string) {
  return RELATED_LINK_LABELS[href] ?? fallbackLabelForHref(href);
}

/**
 * The muscle groups the 3D body can zoom into, and what Kris attaches to each.
 *
 * Deliberately the major groups plus the hand, not all 600 muscles — the
 * decision on 2026-09-27 was 80% of the value at 20% of the mobile weight. Each
 * entry carries a coach tip in Kris's voice, the training content we already
 * publish, and the science keywords that pull matching studies from
 * data/scienceLibrary.ts, so nothing here invents a claim the site cannot back.
 *
 * `target` and `orbit` are model-viewer camera coordinates: where the camera
 * looks and where it sits when this group is selected. They are calibrated to
 * the FINAL anatomical GLB; against the interim placeholder they are indicative.
 */
export type BodyGroup = {
  id: string;
  name: string;
  region: "front" | "back" | "arm" | "hand" | "leg" | "core";
  tip: string;
  /** camera-target "x y z" and camera-orbit "theta phi radius" for the zoom. */
  target: string;
  orbit: string;
  /** Content we already publish, mapped by hand. */
  hrefs: { label: string; href: string }[];
  /** Matched against ScienceStudy.keywords to surface real studies. */
  scienceKeywords: string[];
};

export const BODY_GROUPS: BodyGroup[] = [
  {
    id: "chest",
    name: "Chest",
    region: "front",
    tip: "Press with your shoulder blades pinned back and down. If you feel it in the front of your shoulder instead of the chest, drop the weight and fix the setup before you add it back.",
    target: "0m 1.32m 0.12m",
    orbit: "0deg 78deg 1.2m",
    hrefs: [
      { label: "How to build muscle in your 30s", href: "/blog/how-to-build-muscle-in-your-30s" },
      { label: "Body recomposition for beginners", href: "/guides/body-recomposition-for-beginners" },
    ],
    scienceKeywords: ["hypertrophy", "resistance training", "muscle", "protein"],
  },
  {
    id: "back",
    name: "Back / Lats",
    region: "back",
    tip: "Pull to your hip pocket, not your chin. Lead with the elbow and let the lat do the work — a back that grows is a back you learn to feel.",
    target: "0m 1.28m -0.12m",
    orbit: "180deg 82deg 1.3m",
    hrefs: [
      { label: "Fix skinny-fat", href: "/tools/body-recomposition-calculator" },
      { label: "Strength training plateau", href: "/guides/strength-training-plateau" },
    ],
    scienceKeywords: ["resistance training", "hypertrophy", "strength"],
  },
  {
    id: "shoulders",
    name: "Shoulders",
    region: "front",
    tip: "Most shoulders are overworked at the front and asleep at the rear. Add rear-delt volume before you chase more pressing.",
    target: "0.2m 1.44m 0.02m",
    orbit: "25deg 72deg 1.0m",
    hrefs: [{ label: "How to build muscle at home", href: "/blog/how-to-build-muscle-at-home" }],
    scienceKeywords: ["hypertrophy", "resistance training"],
  },
  {
    id: "arms",
    name: "Arms",
    region: "arm",
    tip: "Biceps and triceps grow from full range under control, not from swinging. Slow the lowering half and they catch up fast.",
    target: "0.3m 1.12m 0.04m",
    orbit: "40deg 82deg 0.9m",
    hrefs: [{ label: "How to build muscle for skinny guys", href: "/blog/how-to-build-muscle-for-skinny-guys" }],
    scienceKeywords: ["hypertrophy", "muscle", "resistance training"],
  },
  {
    id: "hand",
    name: "Hand & grip",
    region: "hand",
    tip: "Grip is the first thing to fail on a heavy pull and the last thing most people train. Hold the top of your last rep for a five-count and it stops being the limiter.",
    target: "0.33m 0.72m 0.05m",
    orbit: "45deg 88deg 0.7m",
    hrefs: [{ label: "Strength training plateau", href: "/guides/strength-training-plateau" }],
    scienceKeywords: ["strength", "resistance training"],
  },
  {
    id: "core",
    name: "Core",
    region: "core",
    tip: "Abs are built in the kitchen and braced in every lift. Train them, but the visible part is a body-fat outcome — that is what the forecast is for.",
    target: "0m 1.08m 0.13m",
    orbit: "0deg 84deg 1.1m",
    hrefs: [
      { label: "See your transformation date", href: "/free/forecast" },
      { label: "Body recomposition calculator", href: "/tools/body-recomposition-calculator" },
    ],
    scienceKeywords: ["body composition", "fat loss", "protein"],
  },
  {
    id: "legs",
    name: "Legs / Quads",
    region: "leg",
    tip: "The legs are half your muscle and most of your hormonal response to training. Skip them and you leave results on the table everywhere else.",
    target: "0m 0.5m 0.1m",
    orbit: "0deg 90deg 1.5m",
    hrefs: [{ label: "How to build muscle in your 30s", href: "/blog/how-to-build-muscle-in-your-30s" }],
    scienceKeywords: ["hypertrophy", "resistance training", "strength"],
  },
  {
    id: "glutes",
    name: "Glutes / Hamstrings",
    region: "back",
    tip: "Hinge from the hip with a flat back and you train the whole posterior chain — the engine for everything from sprinting to standing up at 70.",
    target: "0m 0.68m -0.13m",
    orbit: "180deg 92deg 1.4m",
    hrefs: [{ label: "Getting back in shape after a long break", href: "/guides/getting-back-in-shape-after-a-long-break" }],
    scienceKeywords: ["resistance training", "strength", "anti-aging"],
  },
];

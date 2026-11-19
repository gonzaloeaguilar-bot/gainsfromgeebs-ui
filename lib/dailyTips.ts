// The daily coaching cards. Shared so every place that asks for an email can
// hand over something useful first instead of showing a bare field.

export type TipThemeId = "training" | "nutrition" | "recovery";

export type Tip = {
  title: string;
  body: string;
  action: string;
  href: string;
};

export type TipTheme = {
  id: TipThemeId;
  number: string;
  label: string;
  prompt: string;
  tips: readonly Tip[];
};

export const TIP_THEMES: readonly TipTheme[] = [
  {
    id: "training",
    number: "01",
    label: "Training",
    prompt: "Make the week work",
    tips: [
      {
        title: "Build a fallback week",
        body: "Keep a two-day full-body version of your normal plan ready. A busy week should shrink your training, not erase it.",
        action: "Put two 45-minute sessions on this week's calendar.",
        href: "/resources/busy-guy-training-plan",
      },
      {
        title: "Progress one thing",
        body: "Pick one main lift and earn the top of its rep range with clean form before adding a little weight.",
        action: "Write down today's load and reps before you leave.",
        href: "/blog/3-day-workout-plan-for-busy-men",
      },
      {
        title: "Protect the minimum",
        body: "Three focused lifting days usually beat a six-day split that collapses when work gets loud.",
        action: "Choose the three days you can repeat for the next month.",
        href: "/resources/busy-guy-training-plan",
      },
    ],
  },
  {
    id: "nutrition",
    number: "02",
    label: "Nutrition",
    prompt: "Simplify your food",
    tips: [
      {
        title: "Lead every meal with protein",
        body: "Choosing the protein first removes one decision and makes the rest of the meal easier to build.",
        action: "Pick tomorrow's three protein anchors tonight.",
        href: "/resources/protein-guide",
      },
      {
        title: "Use a practical target",
        body: "A useful starting point is about 0.8 grams of protein per pound of bodyweight, or goal bodyweight if needed.",
        action: "Estimate your target, then divide it across three or four meals.",
        href: "/resources/protein-guide",
      },
      {
        title: "Stop rescuing the day at night",
        body: "Three or four protein servings across the day are easier to repeat than chasing the full number before bed.",
        action: "Add one reliable protein serving to your first meal.",
        href: "/blog/how-much-protein-to-lose-fat",
      },
    ],
  },
  {
    id: "recovery",
    number: "03",
    label: "Reset",
    prompt: "Recover a rough week",
    tips: [
      {
        title: "Name what actually broke",
        body: "Missed training, poor sleep, travel, and restaurant meals need different fixes. Vague guilt gives you nothing to adjust.",
        action: "Write the one disruption that mattered most this week.",
        href: "/resources/bad-week-adjustment-loop",
      },
      {
        title: "Protect your floor",
        body: "Protein, hydration, one walk, and the next training window keep a difficult week alive without demanding perfection.",
        action: "Choose the easiest of those four and do it next.",
        href: "/resources/bad-week-adjustment-loop",
      },
      {
        title: "Do not punish one high day",
        body: "One high-calorie day is information, not a reason to starve tomorrow or abandon the week.",
        action: "Return to your normal next meal instead of compensating.",
        href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
      },
    ],
  },
] as const;

/** Index of the card shown today for a theme. Rotates once per UTC day. */
export function dailyIndex(theme: TipThemeId): number {
  const now = new Date();
  const day = Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000,
  );
  const themeOffset = TIP_THEMES.findIndex((item) => item.id === theme);
  return (day + themeOffset) % 3;
}

export function todaysTip(theme: TipThemeId): Tip {
  const found = TIP_THEMES.find((item) => item.id === theme) ?? TIP_THEMES[0];
  return found.tips[dailyIndex(found.id)];
}

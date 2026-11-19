// The busy-professional cluster: every page the site has for men whose job is
// the constraint (long hours, a desk, shifts, working from home). Rendered as
// one shared block so each page links to the rest of the cluster and to /apply.
// Built 2026-10-07 (ROI item 7): the Semrush 10-06 export had these pages
// ranking for 24 keywords, but they linked to each other only by accident.

export type ClusterLink = { href: string; label: string; detail: string };

export const BUSY_PRO_HUBS: ClusterLink[] = [
  { href: "/for/busy-professionals", label: "Coaching for busy professionals", detail: "Three 45-minute sessions a week, built around your calendar." },
  { href: "/for/remote-workers", label: "Coaching for remote workers", detail: "Structure for the work-from-home week: steps, meals, training times." },
  { href: "/for/shift-workers", label: "Coaching for shift workers", detail: "Training, meals and sleep on nights and rotating shifts." },
  { href: "/for/executives", label: "Coaching for executives", detail: "When the calendar, travel and dinners decide the week." },
];

export const BUSY_PRO_GUIDES: ClusterLink[] = [
  { href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week", label: "Getting in shape on a 60-hour week", detail: "The weekly template that survives long hours." },
  { href: "/blog/3-day-workout-plan-for-busy-men", label: "3-day workout plan for busy men", detail: "Three lifting days, what each one covers." },
  { href: "/blog/how-to-stay-fit-working-from-home", label: "Staying fit working from home", detail: "A day structure for the home office." },
  { href: "/blog/strength-training-for-desk-workers", label: "Strength training for desk workers", detail: "What sitting all day does to your training, and the fix." },
  { href: "/blog/standing-desk-vs-walking-pad", label: "Standing desk vs walking pad", detail: "Real calorie numbers for each one." },
  { href: "/blog/best-online-fitness-coaches-for-busy-men", label: "How to pick an online coach", detail: "What to compare when your week is full." },
];

const ALL = new Set([...BUSY_PRO_HUBS, ...BUSY_PRO_GUIDES].map((l) => l.href));

/** Busy/desk posts that carry the block but are not listed in it. */
const EXTRA_MEMBERS = [
  "/blog/how-to-stay-fit-working-long-hours",
  "/blog/workout-plan-for-programmers",
  "/blog/workout-plan-for-busy-executives",
  "/blog/what-eight-hours-of-sitting-actually-does-to-your-body",
  "/blog/sleep-and-fat-loss-for-busy-professionals",
  "/blog/nutrition-coach-for-busy-professionals",
  "/blog/fitness-coach-for-busy-professionals",
];

/** True when the page belongs to the cluster and should render the block. */
export function inBusyProCluster(href: string): boolean {
  return ALL.has(href) || EXTRA_MEMBERS.includes(href);
}

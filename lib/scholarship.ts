/**
 * The scholarship offer, in one place.
 *
 * It used to live inline in components/ScholarshipBar.tsx, which was fine while
 * the homepage block was the only place it appeared. The ribbon's sheet now
 * states the same offer, and two copies of a live offer — three spots, no
 * a $50 deposit only if selected — is how they end up disagreeing about the terms.
 */
export const SCHOLARSHIP = {
  eyebrow: "Coaching scholarship · up to 3 spots",
  heading: "30 days of free coaching with Kris. 3 spots open.",
  body: "Kris is offering 30 days of free 1:1 coaching. Titan Forge runs the 30-day coaching intensive and Kris is one of its two coaches. Up to three places are open and applications are open year-round. Applying is free and takes about three minutes. If you are selected, a $50 deposit holds your spot.",
  /** One line for the full-screen sheet, where the photograph does the rest. */
  short:
    "Up to three spots. Three minutes to apply. If selected, a $50 deposit holds your spot.",
  applyUrl:
    "https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=homepage_hero_scholarship",
  applyLabel: "Apply for the scholarship",
  secondaryHref: "/apply",
  secondaryLabel: "Or apply for 1:1 coaching",
  detailsHref: "/scholarship",
  detailsLabel: "How the scholarship works",
  /** The same link where a line of small print has to hold two of them. */
  detailsShortLabel: "How it works",
} as const;

/**
 * The scholarship sheet A/B: two complete versions, picture and words
 * together, rather than a 2x2. At 2026-09-29 the offer drew 4 apply clicks
 * in 28 days (GA4 538698079), so every extra arm would halve an already
 * thin sample; two arms is the most this traffic can ever read.
 *
 * Facts are identical in both. Only the framing and the photograph change.
 */
export const SCHOLARSHIP_EXPERIMENT_ID = "scholarship_sheet_v1";

export const SCHOLARSHIP_VARIANTS = {
  a: {
    image: { src: "/coaching/kris-weekly-review-coach.jpg", alt: "Kris Oddo smiling, arms crossed, in the gym" },
    focus: "center 22%",
    heading: SCHOLARSHIP.heading,
    short: SCHOLARSHIP.short,
  },
  b: {
    image: { src: "/coaching/kris-standard-checkin-coach.jpg", alt: "Kris Oddo smiling, leaning on a bar in the gym" },
    focus: "center 24%",
    heading: "Train with Kris for 30 days. The coaching is free.",
    short: "Three spots. Three minutes to apply. If picked, a $50 deposit holds your spot.",
  },
} as const;

export type ScholarshipVariant = keyof typeof SCHOLARSHIP_VARIANTS;


// Reading paths: a named, ordered series of pages the site already has, so a
// reader who lands on one article sees a finishable track instead of a random
// "related guides" grid. Titles are resolved from the post's own frontmatter —
// never retyped here, so a renamed post cannot drift out of sync.
import { getAllBlogPosts } from "./blog";

export type ReadingPathStep = {
  href: string;
  title: string;
  description: string;
  /** Minutes, used only as a reader-facing estimate. */
  minutes: number;
};

export type ReadingPath = {
  id: string;
  title: string;
  promise: string;
  steps: ReadingPathStep[];
  /** Where a reader lands once the whole path is read. */
  finish: { href: string; label: string; blurb: string };
};

/** Non-blog steps carry their own copy — there is no frontmatter to read. */
const MANUAL_STEPS: Record<string, { title: string; description: string; minutes: number }> = {
  "/tools/body-recomposition-calculator": {
    title: "Body Recomposition Calculator",
    description:
      "Put your own numbers in and get the calorie and protein targets the rest of the path is talking about.",
    minutes: 3,
  },
  "/guides/how-much-does-an-online-fitness-coach-cost": {
    title: "What online coaching actually costs",
    description:
      "Every price tier, what each one buys, and how to tell an expensive coach from a vague one.",
    minutes: 9,
  },
};

const PATH_DEFINITIONS: {
  id: string;
  title: string;
  promise: string;
  hrefs: string[];
  finish: ReadingPath["finish"];
}[] = [
  {
    id: "skinny-fat-fix",
    title: "The Skinny-Fat Fix",
    promise:
      "Five reads that take you from 'why do I look soft at this weight' to knowing exactly which numbers to run.",
    hrefs: [
      "/blog/how-to-fix-skinny-fat",
      "/blog/cut-vs-recomp-vs-bulk",
      "/blog/body-recomposition-macros",
      "/tools/body-recomposition-calculator",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
    ],
    finish: {
      href: "/apply",
      label: "Get Kris to run your numbers",
      blurb:
        "You have the whole picture now. The last piece is someone checking your plan against your real week.",
    },
  },
  {
    id: "busy-schedule",
    title: "Training Around a Full Schedule",
    promise:
      "Five reads for the week you actually have, not the week a program assumes you have.",
    hrefs: [
      "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
      "/blog/3-day-workout-plan-for-busy-men",
      "/blog/how-to-stay-consistent-with-diet-on-weekends",
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/blog/why-you-cant-stay-consistent-with-the-gym",
    ],
    finish: {
      href: "/apply",
      label: "Build this around your calendar",
      blurb:
        "The plan only holds if it survives your actual schedule. That is the part Kris builds with you.",
    },
  },
  {
    id: "desk-job",
    title: "The Desk-Job Body",
    promise:
      "Five reads on what sitting all day does to you and the small, specific changes that undo it.",
    hrefs: [
      "/blog/what-eight-hours-of-sitting-actually-does-to-your-body",
      "/blog/strength-training-for-desk-workers",
      "/blog/standing-desk-vs-walking-pad",
      "/blog/how-to-stay-fit-working-from-home",
      "/blog/workout-plan-for-programmers",
    ],
    finish: {
      href: "/apply",
      label: "Get a plan built around your desk",
      blurb:
        "You know what the desk costs you now. Kris turns that into a week of training, steps and meals that fits your hours.",
    },
  },
];

export function estimateMinutes(description: string): number {
  // Blog frontmatter has no reading time; 7 minutes is the floor the templates
  // already use for a standard post. Deliberately coarse — it is an estimate
  // shown to a reader, never a metric.
  return description.length > 160 ? 9 : 7;
}

/** Server-side: resolve a path's steps against real posts. Unknown hrefs are dropped. */
export function resolveReadingPath(id: string): ReadingPath | null {
  const def = PATH_DEFINITIONS.find((p) => p.id === id);
  if (!def) return null;

  const bySlug = new Map(getAllBlogPosts().map((p) => [`/blog/${p.slug}`, p]));

  const steps = def.hrefs.flatMap<ReadingPathStep>((href) => {
    const manual = MANUAL_STEPS[href];
    if (manual) return [{ href, ...manual }];

    const post = bySlug.get(href);
    if (!post) return [];
    return [
      {
        href,
        title: post.title,
        description: post.description,
        minutes: estimateMinutes(post.description),
      },
    ];
  });

  if (steps.length < 2) return null;
  return { id: def.id, title: def.title, promise: def.promise, steps, finish: def.finish };
}

/** The path a given page belongs to, or null. Used to decide what to render. */
export function readingPathForHref(href: string): ReadingPath | null {
  for (const def of PATH_DEFINITIONS) {
    if (def.hrefs.includes(href)) return resolveReadingPath(def.id);
  }
  return null;
}

export function allReadingPathIds(): string[] {
  return PATH_DEFINITIONS.map((p) => p.id);
}

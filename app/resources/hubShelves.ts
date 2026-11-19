import { resourceItems } from "@/data/resources";
import { backfilledScienceStudies, type ScienceStudy } from "@/data/scienceLibrary";

/**
 * The library's shelves, derived from the routes that exist.
 *
 * NOT `hubCategories()`. That is the homepage's curated menu — five categories
 * of three to eleven hand-picked links — and shelving it produced rows that
 * were a third spines and two thirds empty board, because a shelf only reads
 * as a shelf when it is full. `/science` gets away with it because a theme
 * there holds sixteen to eighteen volumes.
 *
 * `resourceItems` is the real corpus: the same one the site search reads, so
 * the library and the search box cannot drift apart.
 *
 * Shelved by href prefix rather than by the hand-written `category` field,
 * which has twenty values and a long tail of ones — "Founders" (1), "Habits"
 * (1), "Calories" (1). Those are search facets, not shelves.
 */
export type HubShelf = {
  id: string;
  title: string;
  blurb: string;
  items: { title: string; href: string }[];
  /** Stood face-out at the end of the row. */
  featured?: { href: string; label: string; go: string };
  noun: { one: string; many: string };
};

const SECTIONS: {
  id: string;
  title: string;
  blurb: string;
  match: (href: string) => boolean;
  noun: { one: string; many: string };
}[] = [
  {
    id: "guides",
    title: "Guides",
    blurb: "The long answers, written to be read once and used.",
    match: (h) => h.startsWith("/guides") || h.startsWith("/resources/"),
    noun: { one: "guide", many: "guides" },
  },
  {
    id: "nutrition",
    title: "Nutrition",
    blurb: "What to eat, what a supplement does, and what it does not.",
    match: (h) => h.startsWith("/nutrition") || h.startsWith("/supplements"),
    noun: { one: "page", many: "pages" },
  },
  {
    id: "for",
    title: "Who it is for",
    blurb: "The same method, read from where you actually are.",
    match: (h) => h.startsWith("/for/"),
    noun: { one: "page", many: "pages" },
  },
  {
    id: "tools",
    title: "Calculators and trackers",
    blurb: "Free, no email asked for, your numbers stay in the browser.",
    match: (h) => h.startsWith("/tools") || h.startsWith("/free") || h.startsWith("/games") || h.startsWith("/assessment"),
    noun: { one: "tool", many: "tools" },
  },
  {
    id: "vs",
    title: "How coaching compares",
    blurb: "Straight comparisons, including where coaching is the wrong answer.",
    match: (h) => h.startsWith("/vs/"),
    noun: { one: "comparison", many: "comparisons" },
  },
];

export function hubShelves(): HubShelf[] {
  const seen = new Set<string>();
  const shelves: HubShelf[] = [];

  for (const section of SECTIONS) {
    const items = resourceItems
      .filter((item) => section.match(item.href) && !seen.has(item.href))
      .map((item) => {
        seen.add(item.href);
        return { title: item.title, href: item.href };
      });
    if (items.length < 2) continue;
    shelves.push({
      id: section.id,
      title: section.title,
      blurb: section.blurb,
      items,
      noun: section.noun,
    });
  }

  /* SCIENCE IS ONE SHELF, NOT A SECOND LIBRARY.
     It is a room off this one: 233 summaries across eight themes, which no
     single row could hold. So the spines here are the eight theme pages and
     the face-out opens the room. Putting the studies themselves on this shelf
     would have made /science a rival front door to the same books — the
     duplication this hub exists to end. */
  const themes = [...new Set(backfilledScienceStudies.map((study: ScienceStudy) => study.topic))].sort();
  shelves.splice(2, 0, {
    id: "science",
    title: "The science library",
    blurb: `${backfilledScienceStudies.length} peer-reviewed summaries, each with its source and its limits.`,
    items: themes.map((topic) => ({
      title: topic,
      href: `/science#topic-${topic.toLowerCase().replace(/\s+/g, "-")}`,
    })),
    featured: {
      href: "/science",
      label: "The whole library",
      go: `${backfilledScienceStudies.length} studies, eight shelves`,
    },
    noun: { one: "theme", many: "themes" },
  });

  return shelves;
}

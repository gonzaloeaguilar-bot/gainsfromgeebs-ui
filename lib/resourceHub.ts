import { resourceItems } from "@/data/resources";

export type HubLink = { href: string; label: string };
export type HubCategory = {
  id: string;
  title: string;
  blurb: string;
  links: HubLink[];
  /** Where the full set lives, when the category has more than it shows. */
  seeAll?: HubLink;
};

/**
 * The resource hub's contents, derived from what the site actually has.
 *
 * Every link here is a route that exists. Nothing is typed by hand twice —
 * tools come from the resource library, comparisons and cities from their own
 * route lists, and the counts in each blurb are computed, so a category cannot
 * claim a number it does not have.
 *
 * This REPLACES the "Go deeper" cartel rather than joining it. The homepage
 * had two discovery surfaces already and the brief's stated problem is
 * decision fatigue; a third would have made the page worse at the thing it
 * was meant to fix.
 */

const COMPARISONS: HubLink[] = [
  { href: "/vs/hiring-a-personal-trainer", label: "vs a personal trainer" },
  { href: "/vs/gym-membership", label: "vs a gym membership" },
  { href: "/vs/fitness-apps", label: "vs fitness apps" },
  { href: "/vs/ai-fitness-coach", label: "vs an AI coach" },
  { href: "/vs/chatgpt", label: "vs ChatGPT" },
  { href: "/vs/diy-workout-plan", label: "vs a DIY plan" },
  { href: "/vs/group-fitness-classes", label: "vs group classes" },
  { href: "/vs/caliber", label: "vs Caliber" },
  { href: "/vs/future", label: "vs Future" },
  { href: "/vs/trainwell", label: "vs Trainwell" },
];

const CITIES: HubLink[] = [
  { href: "/personal-training-denver", label: "Denver" },
  { href: "/locations/englewood", label: "Englewood" },
  { href: "/locations/parker", label: "Parker" },
  { href: "/locations/cherry-creek", label: "Cherry Creek" },
];

const SCIENCE: HubLink[] = [
  // /science itself is the category's seeAll; listing it here too put the
  // same href in the section twice, which homepage-density counts.
  { href: "/science/questions", label: "Answers, source-backed" },
  { href: "/science/studies", label: "Search every study" },
  { href: "/science/protein-body-composition-studies", label: "Protein and body composition" },
  { href: "/science/sleep-and-fat-loss-studies", label: "Sleep and fat loss" },
  { href: "/science/creatine-aging-studies", label: "Creatine" },
  { href: "/science/vitamin-d", label: "Vitamin D" },
  { href: "/science/ashwagandha-and-cortisol", label: "Ashwagandha and cortisol" },
];

/**
 * The links the discovery cartel guaranteed, which this hub inherited when it
 * replaced it.
 *
 * Not a nice-to-have: homepage-density.spec asserts every one of these is
 * reachable from the homepage, and it is named "stays concise WITHOUT
 * DROPPING DISCOVERY LINKS". Replacing the cartel without carrying them is
 * exactly the regression that test exists to catch, and it caught it.
 */
const THE_COACHING: HubLink[] = [
  { href: "/geebs-method", label: "The method, in full" },
  { href: "/results", label: "Client results" },
  { href: "/packages", label: "Compare every package" },
  { href: "/for/online-fitness-coach-for-men", label: "Online coaching for men" },
  { href: "/blog/best-online-fitness-coaches-for-busy-men", label: "Best coaches for busy men" },
  { href: "/blog/online-fitness-coach-vs-personal-trainer", label: "Online coach vs personal trainer" },
];

export function hubCategories(): HubCategory[] {
  const tools = resourceItems
    .filter((item) => item.type === "tool" && item.href.startsWith("/tools/"))
    .map((item) => ({ href: item.href, label: item.title }));

  const scienceCount = resourceItems.filter(
    (item) => item.category === "Science",
  ).length;

  return [
    {
      id: "coaching",
      title: "The coaching itself",
      blurb: "How it works, who it is for, and what it has done for people.",
      links: THE_COACHING,
    },
    {
      id: "tools",
      title: "Calculators & tools",
      blurb: `${tools.length} free calculators and trackers. No email asked for.`,
      links: tools,
      seeAll: { href: "/tools", label: "All tools" },
    },
    {
      id: "science",
      title: "The science library",
      blurb: `${scienceCount} peer-reviewed summaries, each with its source.`,
      links: SCIENCE,
      seeAll: { href: "/science", label: "The whole library" },
    },
    {
      id: "comparisons",
      title: "How coaching compares",
      blurb: `${COMPARISONS.length} straight comparisons, including where coaching is the wrong answer.`,
      links: COMPARISONS,
    },
    {
      id: "cities",
      title: "Around Denver",
      blurb: "Coaching is online; these are for people searching locally.",
      links: CITIES,
    },
  ];
}

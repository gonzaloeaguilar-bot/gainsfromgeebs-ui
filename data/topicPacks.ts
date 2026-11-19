import { freeTools, resourceItems } from "@/data/resources";

/**
 * Article packs: the library, dealt out like trading cards.
 *
 * A pack is a hand-picked run of 5 articles around one problem. Every card
 * points at a page that already exists — the href is the only thing written
 * here, and the title and summary are read out of the resource registry at
 * module load, so a renamed or deleted page fails loudly at build time
 * instead of shipping a dead card. `tests/topicPacks.test.ts` asserts it.
 */

export type CardRarity = "common" | "rare" | "epic" | "legendary";

export interface PackCardSeed {
  href: string;
  /** Why this card is worth the tap. Written for the reader, not the index. */
  hook: string;
  rarity: CardRarity;
}

export interface TopicPackSeed {
  id: string;
  name: string;
  /** One line on the sealed pack: who this pack is for. */
  promise: string;
  cards: PackCardSeed[];
}

export interface PackCard extends PackCardSeed {
  title: string;
}

export interface TopicPack extends Omit<TopicPackSeed, "cards"> {
  cards: PackCard[];
}

export const rarityLabels: Record<CardRarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const packSeeds: TopicPackSeed[] = [
  {
    id: "recomp",
    name: "Recomp Starter",
    promise: "For the guy who is not fat and not lean, and is sick of both.",
    cards: [
      {
        href: "/blog/how-to-fix-skinny-fat",
        hook: "The exact order to fix it: lift first, eat second, cardio last.",
        rarity: "epic",
      },
      {
        href: "/guides/body-recomposition-for-beginners",
        hook: "What the first 12 weeks actually look like, week by week.",
        rarity: "rare",
      },
      {
        href: "/blog/cut-vs-recomp-vs-bulk",
        hook: "Pick the phase that matches your body, not your mood.",
        rarity: "rare",
      },
      {
        href: "/blog/body-recomposition-macros",
        hook: "Protein, calories, and where most recomp attempts leak.",
        rarity: "common",
      },
      {
        href: "/tools/body-recomposition-calculator",
        hook: "Your numbers in under a minute. No login.",
        rarity: "legendary",
      },
    ],
  },
  {
    id: "fat-loss",
    name: "Fat Loss Fundamentals",
    promise: "For losing the gut without losing the muscle you built.",
    cards: [
      {
        href: "/blog/how-to-lose-fat-without-losing-muscle-men",
        hook: "The deficit size that keeps your strength on the bar.",
        rarity: "epic",
      },
      {
        href: "/blog/how-to-lose-belly-fat-men-30s",
        hook: "What changes after 30, and what is just an excuse.",
        rarity: "rare",
      },
      {
        href: "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
        hook: "Five honest reasons the scale is stuck.",
        rarity: "rare",
      },
      {
        href: "/blog/weight-loss-for-men-who-hate-dieting",
        hook: "A plan for men who will not track every bite.",
        rarity: "common",
      },
      {
        href: "/tools/calorie-deficit-calculator",
        hook: "Your calorie target, calculated instead of guessed.",
        rarity: "legendary",
      },
    ],
  },
  {
    id: "busy",
    name: "Busy Week Survival",
    promise: "For 60-hour weeks, travel, client dinners, and no time.",
    cards: [
      {
        href: "/blog/3-day-workout-plan-for-busy-men",
        hook: "Three sessions a week that still move the needle.",
        rarity: "epic",
      },
      {
        href: "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
        hook: "Where the hours actually come from.",
        rarity: "rare",
      },
      {
        href: "/blog/how-to-lose-belly-fat-with-client-dinners",
        hook: "How to order, drink, and still wake up on plan.",
        rarity: "rare",
      },
      {
        href: "/blog/fitness-plan-for-men-who-travel-for-work",
        hook: "A hotel-room plan that does not need a real gym.",
        rarity: "common",
      },
      {
        href: "/resources/bad-week-adjustment-loop",
        hook: "The reset to run when the week falls apart.",
        rarity: "legendary",
      },
    ],
  },
  {
    id: "desk",
    name: "Desk Job Damage Control",
    promise: "For the men who sit for nine hours and feel it everywhere.",
    cards: [
      {
        href: "/blog/how-to-lose-belly-fat-sitting-all-day",
        hook: "Why sitting costs you calories you never notice.",
        rarity: "epic",
      },
      {
        href: "/blog/strength-training-for-desk-workers",
        hook: "The posterior chain work that undoes the chair.",
        rarity: "rare",
      },
      {
        href: "/blog/workout-plan-for-software-engineers",
        hook: "A full week built around a screen-shaped schedule.",
        rarity: "rare",
      },
      {
        href: "/blog/standing-desk-vs-walking-pad",
        hook: "Which one is worth the money. Honest answer.",
        rarity: "common",
      },
      {
        href: "/blog/best-gym-routine-for-software-engineers",
        hook: "The routine to run after a full day of sitting.",
        rarity: "legendary",
      },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition Without Tracking",
    promise: "For eating well without weighing rice on a kitchen scale.",
    cards: [
      {
        href: "/blog/how-much-protein-to-lose-fat",
        hook: "One number that fixes most diets on its own.",
        rarity: "epic",
      },
      {
        href: "/blog/calorie-deficit-without-counting-everything",
        hook: "A deficit you can hold without an app open at dinner.",
        rarity: "rare",
      },
      {
        href: "/blog/how-to-stay-consistent-with-diet-on-weekends",
        hook: "Friday to Sunday is where the week gets erased.",
        rarity: "rare",
      },
      {
        href: "/blog/alcohol-fitness-men",
        hook: "What drinking really costs, in plain numbers.",
        rarity: "common",
      },
      {
        href: "/blog/pre-post-workout-nutrition-men",
        hook: "Simple rules for before and after the session.",
        rarity: "legendary",
      },
    ],
  },
  {
    id: "coaching",
    name: "Should You Hire a Coach",
    promise: "For deciding between a coach, an app, and doing it yourself.",
    cards: [
      {
        href: "/guides/how-much-does-an-online-fitness-coach-cost",
        hook: "Real price ranges and what changes them.",
        rarity: "epic",
      },
      {
        href: "/guides/what-does-an-online-fitness-coach-do",
        hook: "What a coach handles beyond writing workouts.",
        rarity: "rare",
      },
      {
        href: "/vs/fitness-apps",
        hook: "Where an app stops being enough.",
        rarity: "rare",
      },
      {
        href: "/blog/questions-to-ask-an-online-fitness-coach",
        hook: "Ask these before you hand anyone your card.",
        rarity: "common",
      },
      {
        href: "/resources/online-fitness-coaching-fit-check",
        hook: "A two-minute check on whether coaching fits you at all.",
        rarity: "legendary",
      },
    ],
  },
];

const titlesByHref = new Map<string, string>(
  [...freeTools, ...resourceItems].map((item) => [item.href, item.title]),
);

export function getTopicPacks(): TopicPack[] {
  return packSeeds.map((pack) => ({
    ...pack,
    cards: pack.cards.map((card) => {
      const title = titlesByHref.get(card.href);
      if (!title) {
        throw new Error(
          `Article pack "${pack.id}" points at ${card.href}, which is not a registered page.`,
        );
      }
      return { ...card, title };
    }),
  }));
}

export const totalPackCards = packSeeds.reduce(
  (sum, pack) => sum + pack.cards.length,
  0,
);

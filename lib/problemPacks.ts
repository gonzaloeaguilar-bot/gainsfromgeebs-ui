import { getTopicPacks, type TopicPack } from "@/data/topicPacks";
import { freeTools, resourceItems } from "@/data/resources";
import { getAllBlogPosts } from "@/lib/blog";
import { estimateMinutes } from "@/lib/readingPaths";
import { existsSync } from "node:fs";

export type ProblemPack = Omit<TopicPack, "cards"> & {
  problem: string;
  image: string;
  label: string;
  cards: (TopicPack["cards"][number] & { minutes: number })[];
};
const problems = [
  ["recomp", "Soft at this weight", "/packs/recomp.jpg", "Recomp"],
  ["fat-loss", "The gut won't go", "/coaching/kris-client-training-session.jpg", "Fat loss"],
  ["busy", "No time", "/coaching/kris-community-coach.jpg", "Busy weeks"],
  ["nutrition", "What to eat", "/coaching/kris-nutrition-only-coach.jpg", "No tracking"],
  ["desk", "Desk job is wrecking me", "/packs/desk.jpg", "Desk job"],
  ["coaching", "Is a coach worth it?", "/coaching/kris-client-coaching-close.jpg", "Coaching"],
];

export function problemStepTitle(page: { title: string; shortTitle?: string }): string {
  return page.shortTitle?.trim() || page.title.split(" | ")[0].replace(/\s*\([^()]*\)\s*$/, "").trim();
}

export function resolveProblemPacks(packs = getTopicPacks()): ProblemPack[] {
  const posts = new Map(getAllBlogPosts().map(post => [`/blog/${post.slug}`, post]));
  const pages = new Map([...freeTools, ...resourceItems].map(page => [page.href, page]));
  return problems.flatMap(([id, problem, image, label]) => {
    const pack = packs.find(pack => pack.id === id);
    if (!pack) return [];
    return [{ ...pack, problem, image, label, cards: pack.cards.flatMap(card => {
      const page = posts.get(card.href) ?? (existsSync(`app${card.href}/page.tsx`) ? pages.get(card.href) : undefined);
      return page?.title ? [{ ...card, title: problemStepTitle(page), minutes: estimateMinutes(page.description) }] : [];
    }) }];
  });
}

import type { TopicPack } from "@/data/topicPacks";

export function isPackComplete(pack: Pick<TopicPack, "cards">, read: readonly string[]) {
  return pack.cards.length > 0 && pack.cards.every(card => read.includes(card.href));
}

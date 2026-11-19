import { getRegisteredPages } from "@/lib/pageRegistry";

const REGISTRY_STOP_WORDS = new Set([
  "about",
  "actually",
  "and",
  "can",
  "does",
  "for",
  "from",
  "how",
  "read",
  "the",
  "what",
  "where",
  "with",
]);

function normalizeRegistryPhrase(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length >= 3 && !REGISTRY_STOP_WORDS.has(term))
    .join(" ");
}

export function findRegisteredPageAnswer(userMessage: string) {
  const normalizedMessage = normalizeRegistryPhrase(userMessage);
  if (normalizedMessage.split(" ").length < 2) return null;

  // Search terms are curated per page. Requiring a complete multi-word phrase
  // avoids sending broad questions such as "how coaching works" to a loosely
  // related article merely because several common words overlap.
  const matches = getRegisteredPages()
    .filter(
      (page) =>
        typeof page.title === "string" &&
        typeof page.description === "string" &&
        typeof page.href === "string" &&
        Array.isArray(page.searchTerms),
    )
    .flatMap((page) =>
      page.searchTerms
        .map(normalizeRegistryPhrase)
        .filter(
          (phrase) =>
            phrase.split(" ").length >= 2 && normalizedMessage.includes(phrase),
        )
        .map((phrase) => ({ page, phraseLength: phrase.length })),
    )
    .sort((a, b) => b.phraseLength - a.phraseLength);

  const ranked = matches[0];
  if (!ranked) return null;
  return {
    message: ranked.page.description.toLowerCase(),
    ctaUrl: ranked.page.href,
    ctaText: `Open ${ranked.page.title}`,
    quickReplies: [
      "How 1:1 coaching works",
      "See client results",
      "Ask another question",
    ],
  };
}

import knowledge from "@/data/generated/chatKnowledge.json";

export interface WebsitePageContext {
  title: string;
  url: string;
  summary: string;
  visibleContent: string;
}

export interface WebsiteKnowledgeSource {
  title: string;
  href: string;
}

interface KnowledgeChunk extends WebsiteKnowledgeSource {
  id: string;
  text: string;
  terms: string[];
}

export interface WebsiteKnowledgeMatch extends KnowledgeChunk {
  score: number;
  currentPage: boolean;
}

const STOP_WORDS = new Set([
  "about", "after", "also", "and", "are", "can", "could", "does", "for",
  "from", "have", "here", "how", "into", "just", "more", "page", "show",
  "that", "the", "their", "there", "this", "what", "when", "where", "which",
  "with", "would", "you", "your",
]);

const DEICTIC = /\b(this page|on here|here|above|what does this|summari[sz]e this)\b/i;

function clean(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max)
    : "";
}

function safePath(value: unknown): string {
  const raw = clean(value, 500);
  if (!raw) return "/";
  try {
    const parsed = new URL(raw, "https://gainsfromgeebs.com");
    if (parsed.hostname !== "gainsfromgeebs.com" && parsed.hostname !== "www.gainsfromgeebs.com") return "/";
    return parsed.pathname || "/";
  } catch {
    return raw.startsWith("/") ? raw.split(/[?#]/)[0] : "/";
  }
}

export function sanitizeWebsitePageContext(value: unknown): WebsitePageContext | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const context = {
    title: clean(input.title, 200),
    url: safePath(input.url),
    summary: clean(input.summary, 600),
    visibleContent: clean(input.visibleContent, 8_000),
  };
  return context.title || context.summary || context.visibleContent ? context : null;
}

function tokens(value: string): string[] {
  return Array.from(new Set(value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/)
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token))));
}

function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[], phrase: string): number {
  const title = chunk.title.toLowerCase();
  const terms = chunk.terms.join(" ").toLowerCase();
  const text = chunk.text.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (title.includes(token)) score += 7;
    if (terms.includes(token)) score += 5;
    if (text.includes(token)) score += 1;
  }
  if (phrase.length >= 8 && title.includes(phrase)) score += 16;
  if (phrase.length >= 12 && terms.includes(phrase)) score += 12;
  return score;
}

export function findWebsiteKnowledge(
  query: string,
  pageContext?: WebsitePageContext | null,
  limit = 4,
): WebsiteKnowledgeMatch[] {
  const queryTokens = tokens(query);
  if (!queryTokens.length && !DEICTIC.test(query)) return [];
  const phrase = query.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const currentHref = pageContext?.url || "/";
  const candidates: KnowledgeChunk[] = (knowledge.chunks as KnowledgeChunk[]).slice();
  if (pageContext?.visibleContent) {
    candidates.unshift({
      id: `${currentHref}#current`,
      title: pageContext.title || "Current page",
      href: currentHref,
      text: [pageContext.summary, pageContext.visibleContent].filter(Boolean).join(" ").slice(0, 3_200),
      terms: [],
    });
  }

  const deictic = DEICTIC.test(query);
  const ranked = candidates.map((chunk) => {
    const currentPage = chunk.href === currentHref;
    let score = scoreChunk(chunk, queryTokens, phrase);
    if (currentPage && deictic) score += 30;
    else if (currentPage && score > 0) score += 4;
    return { ...chunk, score, currentPage };
  }).filter((chunk) => chunk.score >= (deictic ? 1 : 7))
    .sort((a, b) => b.score - a.score || Number(b.currentPage) - Number(a.currentPage));

  const bestScore = ranked[0]?.score || 0;
  const seen = new Set<string>();
  return ranked.filter((chunk) => {
    // A loose token such as "loss" must not turn an exact hair-loss answer
    // into a list of unrelated fat-loss pages.
    if (chunk.score < Math.max(7, bestScore * 0.45)) return false;
    if (seen.has(chunk.href)) return false;
    seen.add(chunk.href);
    return true;
  }).slice(0, limit);
}

export function websiteKnowledgeAnswer(match: WebsiteKnowledgeMatch): string {
  const text = match.text.replace(/\s+/g, " ").trim();
  const sentence = text.match(/^.{80,420}?[.!?](?:\s|$)/)?.[0] || text.slice(0, 360);
  return sentence.trim().toLowerCase();
}

export const websiteKnowledgeStats = {
  pages: knowledge.pages,
  passages: knowledge.chunks.length,
};

import sitemap from "../../sitemap";
import { buildScienceCitationTargets } from "@/data/scienceCitationMap";

const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_FEED_UPDATED = new Date("2026-07-21T00:00:00.000Z");

function toDate(value: Date | string | undefined) {
  if (value instanceof Date) return value;
  if (value) return new Date(value);
  return DEFAULT_FEED_UPDATED;
}

function itemId(url: string, role: string) {
  return `${role}:${new URL(url).pathname.replace(/^\/+/, "") || "home"}`;
}

export function buildScienceJsonFeed() {
  const sitemapByUrl = new Map(sitemap().map((route) => [route.url, route]));

  const items = buildScienceCitationTargets()
    .filter((target) => sitemapByUrl.has(target.url))
    .map((target) => {
      const updatedAt = toDate(sitemapByUrl.get(target.url)?.lastModified);

      return {
        id: itemId(target.url, target.role),
        type: target.role,
        title: target.title,
        url: target.url,
        description: target.description,
        updatedAt: updatedAt.toISOString(),
        citationUse: target.citationUse,
        topics: target.topics,
        targetQueries: target.targetQueries,
        schemaTypes: target.schemaTypes,
        claimGuardrail: target.claimGuardrail,
        sourcePmids: target.sourcePmids,
        sourceCount: target.sourcePmids.length,
        priority: target.priority,
      };
    })
    .sort((a, b) => {
      const priorityDiff = b.priority - a.priority;
      if (priorityDiff !== 0) return priorityDiff;
      return a.url.localeCompare(b.url);
    });
  const updatedAt = items.reduce<Date>((latest, item) => {
    const itemUpdated = new Date(item.updatedAt);
    return itemUpdated.getTime() > latest.getTime() ? itemUpdated : latest;
  }, DEFAULT_FEED_UPDATED);

  return {
    name: "Geebs Science source feed",
    canonicalUrl: `${SITE_URL}/science`,
    feedUrl: `${SITE_URL}/science/feed.json`,
    rssFeedUrl: `${SITE_URL}/science/feed.xml`,
    citationMapUrl: `${SITE_URL}/science/citation-map.json`,
    updatedAt: updatedAt.toISOString(),
    publisher: {
      name: "Geebs Coaching",
      url: SITE_URL,
    },
    usage: {
      useFor: [
        "Finding Geebs Science pages for peer-reviewed fitness questions",
        "Choosing the best Geebs Science page for a specific study question",
        "Finding past Science Drop pages with supporting PubMed studies",
      ],
      usePrimarySourcesFor: [
        "Medical, disease, diagnosis, or treatment claims",
        "Study-design details beyond the Geebs plain-English summary",
        "Population-specific biomedical conclusions that require medical expertise",
      ],
      doNotClaim: [
        "Geebs Science is medical advice",
        "One study proves a guaranteed coaching outcome",
        "A study still under review is a reviewed Geebs recommendation",
      ],
    },
    itemCount: items.length,
    items,
  };
}

export function GET() {
  return new Response(JSON.stringify(buildScienceJsonFeed(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

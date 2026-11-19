import sitemap from "../sitemap";
import { freeTools, guides } from "@/data/resources";

const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_FEED_UPDATED = new Date("2026-06-04T00:00:00.000Z");

type FeedItem = {
  title: string;
  url: string;
  description: string;
  updatedAt: Date;
};

const NON_CANONICAL_HREFS = new Set(["/resources/online-fitness-coaching-cost-faq"]);

const feedResources = [...guides, ...freeTools].filter(({ href }) => {
  if (NON_CANONICAL_HREFS.has(href)) return false;
  return (
    href.startsWith("/blog/") ||
    href.startsWith("/guides/") ||
    href.startsWith("/resources/") ||
    href.startsWith("/science/") ||
    href.startsWith("/tools/") ||
    href === "/science" ||
    href === "/free/goal-tracker" ||
    href === "/free/daily"
  );
});

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function slugTitle(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .at(-1)!
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toDate(value: Date | string | undefined) {
  if (value instanceof Date) return value;
  if (value) return new Date(value);
  return DEFAULT_FEED_UPDATED;
}

function itemXml(item: FeedItem) {
  const updated = item.updatedAt.toUTCString();

  return [
    "    <item>",
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.url)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(item.url)}</guid>`,
    `      <description>${escapeXml(item.description)}</description>`,
    `      <pubDate>${escapeXml(updated)}</pubDate>`,
    "    </item>",
  ].join("\n");
}

export async function buildResourceFeed() {
  const routes = await sitemap();
  const sitemapByUrl = new Map(routes.map((route) => [route.url, route]));

  const items: FeedItem[] = feedResources
    .map(({ title, href, description }) => {
      const url = `${SITE_URL}${href}`;
      const sitemapRoute = sitemapByUrl.get(url);

      return {
        title: title || slugTitle(href),
        url,
        description,
        updatedAt: toDate(sitemapRoute?.lastModified),
      };
    })
    .filter((item) => sitemapByUrl.has(item.url));

  // Same rule as the sitemap: a post that defers to another canonical page
  // is not a URL we want crawled from the feed.
  const dynamicPosts = await import("@/lib/blog").then(m =>
    m.getAllBlogPosts().filter((post) => !post.canonical),
  );
  const dynamicItems = dynamicPosts.map(post => ({
    title: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    description: post.description,
    updatedAt: new Date(post.lastModified || post.date)
  }));
  
  items.push(...dynamicItems);

  items.sort((a, b) => {
      const updatedDiff = b.updatedAt.getTime() - a.updatedAt.getTime();
      if (updatedDiff !== 0) return updatedDiff;
      return a.url.localeCompare(b.url);
    });
  const feedUpdated = items.reduce<Date>(
    (latest, item) =>
      item.updatedAt.getTime() > latest.getTime() ? item.updatedAt : latest,
    DEFAULT_FEED_UPDATED,
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Geebs Coaching fitness guides and tools</title>",
    `    <link>${SITE_URL}/blog</link>`,
    "    <description>Recent Geebs Coaching guides, resources, and tools for 1:1 online fitness coaching, body recomposition, nutrition, and consistency.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${feedUpdated.toUTCString()}</lastBuildDate>`,
    "    <ttl>360</ttl>",
    ...items.map(itemXml),
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export async function GET() {
  const feed = await buildResourceFeed();
  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

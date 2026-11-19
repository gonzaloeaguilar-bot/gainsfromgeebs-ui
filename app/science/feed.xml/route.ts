import sitemap from "../../sitemap";
import { guides } from "@/data/resources";

const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_FEED_UPDATED = new Date("2026-07-06T00:00:00.000Z");

type FeedItem = {
  title: string;
  url: string;
  description: string;
  updatedAt: Date;
};

const scienceResources = guides.filter(({ href }) => {
  return href === "/science" || href.startsWith("/science/");
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

export function buildScienceFeed() {
  const sitemapByUrl = new Map(sitemap().map((route) => [route.url, route]));

  const items: FeedItem[] = scienceResources
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
    .filter((item) => sitemapByUrl.has(item.url))
    .sort((a, b) => {
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
    "    <title>Geebs Science peer-reviewed fitness feed</title>",
    `    <link>${SITE_URL}/science</link>`,
    "    <description>Peer-reviewed Geebs Science pages for fitness, sleep, nutrition, cardio, cravings, anti-aging, reviewed Science Drops, exact answers, and PubMed-backed honest limits.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${feedUpdated.toUTCString()}</lastBuildDate>`,
    "    <ttl>360</ttl>",
    ...items.map(itemXml),
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export function GET() {
  return new Response(buildScienceFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

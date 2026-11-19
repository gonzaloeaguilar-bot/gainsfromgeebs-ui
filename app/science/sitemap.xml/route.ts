import sitemap from "../../sitemap";

const SITE_URL = "https://gainsfromgeebs.com";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function scienceSitemapRoutes() {
  return sitemap()
    .filter((route) => {
      const pathname = new URL(route.url).pathname;
      return pathname === "/science" || pathname.startsWith("/science/");
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}

export function buildScienceSitemap() {
  const routes = scienceSitemapRoutes();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => {
      const lastModified =
        route.lastModified instanceof Date
          ? route.lastModified.toISOString()
          : new Date(route.lastModified || "2026-07-06T00:00:00.000Z").toISOString();

      return [
        "  <url>",
        `    <loc>${escapeXml(route.url)}</loc>`,
        `    <lastmod>${escapeXml(lastModified)}</lastmod>`,
        route.changeFrequency
          ? `    <changefreq>${escapeXml(route.changeFrequency)}</changefreq>`
          : "",
        typeof route.priority === "number"
          ? `    <priority>${route.priority.toFixed(2)}</priority>`
          : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    }),
    "</urlset>",
  ].join("\n");
}

export function GET() {
  return new Response(buildScienceSitemap(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
      "X-Geebs-Sitemap-Scope": `${SITE_URL}/science`,
    },
  });
}

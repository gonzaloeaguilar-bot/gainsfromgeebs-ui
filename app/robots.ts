import type { MetadataRoute } from "next";

// robots.txt — explicit allows for AI crawlers + standard search bots.
// Per [[reference-meta-cross-platform-crawl]] + [[seo-geo]] best practice
// (2025-2026): the major AI assistants honor robots.txt user-agent
// directives. Allowing them by name surfaces our content in their answers.
//
// Blocked: nothing. This is a public marketing site. The application page is
// kept out of search with page metadata, not robots.txt, so crawlers can read
// the noindex directive instead of reporting it as blocked.

const SITE_URL = "https://gainsfromgeebs.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Generic — all bots
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit AI assistant allows
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/media-sitemap.xml`,
      `${SITE_URL}/feed.xml`,
      `${SITE_URL}/science/sitemap.xml`,
      `${SITE_URL}/science/feed.xml`,
    ],
    host: SITE_URL,
  };
}

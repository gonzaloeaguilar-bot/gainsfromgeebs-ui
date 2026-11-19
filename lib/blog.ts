import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { resourceItems, type ResourceItem } from "@/data/resources";

export interface BlogPost {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  date: string;
  lastModified?: string;
  category?: string;
  tags?: string[];
  /** Site path of the page this post defers to (rel=canonical). */
  canonical?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  training: "Training",
  "fat-loss": "Fat loss",
  nutrition: "Nutrition",
  "muscle-gain": "Muscle gain",
  "desk-work": "Desk work",
  "busy-professionals": "Busy professionals",
  science: "Science",
  coaching: "Coaching",
  consistency: "Consistency",
  restarting: "Restarting",
  habits: "Habits",
  mindset: "Mindset",
};

export function deriveCategory(post: BlogPost): string {
  if (post.category) {
    const norm = post.category.trim().toLowerCase();
    if (CATEGORY_MAP[norm]) return CATEGORY_MAP[norm];
    const words = norm.replace(/-/g, " ").split(" ");
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  if (post.tags && post.tags.length > 0) {
    for (const tag of post.tags) {
      const norm = tag.trim().toLowerCase();
      if (CATEGORY_MAP[norm]) return CATEGORY_MAP[norm];
    }
  }
  return "Training";
}

export function blogPostToResourceItem(post: BlogPost): ResourceItem {
  const category = deriveCategory(post);
  const searchTerms = Array.from(
    new Set(
      [
        post.title,
        ...post.slug.split("-"),
        ...(post.category ? [post.category] : []),
        ...(post.tags || []),
      ].filter(Boolean),
    ),
  );

  return {
    title: post.title,
    href: `/blog/${post.slug}`,
    category,
    description: post.description,
    type: "guide",
    searchTerms,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) {
      continue;
    }

    // Ignore template
    if (file.includes("template.mdx")) {
      continue;
    }

    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Unpublished drafts never reach the index, sitemap, or search
    if (data.draft === true) {
      continue;
    }

    const slug = file.replace(/\.mdx?$/, "");

    posts.push({
      slug,
      title: data.title || slug,
      shortTitle: typeof data.shortTitle === "string" ? data.shortTitle : undefined,
      description: data.description || data.seo_description || "",
      date: data.date || new Date().toISOString(),
      lastModified: data.lastModified || data.date || new Date().toISOString(),
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      canonical:
        typeof data.canonical === "string" && data.canonical.startsWith("/")
          ? data.canonical
          : undefined,
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getDerivedBlogResources(posts?: BlogPost[]): ResourceItem[] {
  const allPosts = posts || getAllBlogPosts();
  return allPosts.map(blogPostToResourceItem);
}

export function getMergedResourceItems(
  extraPosts?: BlogPost[],
): ResourceItem[] {
  const derived = getDerivedBlogResources(extraPosts);
  const existingHrefs = new Set(resourceItems.map((item) => item.href));
  const newItems = derived.filter((item) => !existingHrefs.has(item.href));
  return [...resourceItems, ...newItems];
}


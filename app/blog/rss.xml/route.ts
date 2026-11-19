import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://gainsfromgeebs.com";

export async function GET() {
  const blogDir = path.join(process.cwd(), "content/blog");
  let files: string[] = [];
  
  if (fs.existsSync(blogDir)) {
    files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  }

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fileContent = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data } = matter(fileContent);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Geebs Coaching Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Fitness guides, body recomposition advice, and training plans for busy men.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

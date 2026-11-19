import { resourceItems } from "@/data/resources";

/**
 * The search index, served as one static file.
 *
 * Built from resourceItems — the same 384-entry corpus /resources searches,
 * so the header finds exactly what the results page finds and there is no
 * second library to keep in step.
 *
 * It was the 123-entry page registry first, and a probe caught what that
 * meant: searching "macros" returned two results and neither was the macro
 * calculator, because only two registered pages mention the word at all. The
 * same query over this corpus returns twelve, the calculator among them.
 *
 * Fetched once when somebody opens search, rather than shipped to everyone
 * who loads a page and never uses it. Descriptions are left out: a result row
 * shows a title and a category, and carrying the prose took the file from
 * 60KB to 231KB to render nothing.
 *
 * force-static so it is built with the site and served from the edge, not
 * computed per request.
 */
export const dynamic = "force-static";

export type SearchIndexEntry = {
  title: string;
  href: string;
  category: string;
  terms: string[];
};

export function GET() {
  const entries: SearchIndexEntry[] = resourceItems.map((item) => ({
    title: item.title,
    href: item.href,
    category: item.category,
    terms: item.searchTerms,
  }));

  return Response.json(entries, {
    headers: { "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}

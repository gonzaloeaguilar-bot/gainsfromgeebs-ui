/**
 * BreadcrumbList for a page one level below a section hub.
 *
 * WHY. The 2026-09-23 GEO audit found breadcrumb coverage at 30%. The real shape is
 * worse than that average: measured by section, /for had 0 of 21 pages, /nutrition
 * 0 of 31, /vs 0 of 10, /guides 1 of 13, /tools 2 of 13. Every one of those sections
 * has a real hub page, so the hierarchy exists and simply is not expressed — which is
 * what a breadcrumb is for, and what helps an assistant place a page in a site.
 *
 * WHAT IS DELIBERATELY NOT COVERED. The homepage gets no BreadcrumbList: it is the
 * root and there is no trail to express. Top-level pages (/about, /faq, /results,
 * /geebs-method) get none either — a two-item "Home > About" trail is valid markup
 * that conveys nothing Google will display. Coverage percentages counted those as
 * gaps; they are not.
 *
 * WHY THIS IS NOT APPLIED BY SCRIPT TO ALL 85 PAGES. components/ArticleShell.tsx
 * carries an explicit warning about exactly that: "The 71 hand-written pages under
 * /nutrition, /for and /guides each carry a bespoke header written as literal JSX;
 * rewriting those by script is exactly where a migration breaks quietly." The shell
 * receives no path or title, so it cannot derive a trail on its own. This file is the
 * one-line-per-page mechanism; pages are wired deliberately, highest-traffic first,
 * and the remaining count is reported rather than left invisible.
 */

const SECTION_LABELS: Record<string, string> = {
  for: "Who it is for",
  guides: "Guides",
  nutrition: "Nutrition",
  tools: "Free tools",
  vs: "Comparisons",
  science: "Science",
  locations: "Locations",
  memberships: "Memberships",
  blog: "Resources",
};

export function sectionLabel(section: string): string {
  return SECTION_LABELS[section] ?? section;
}

/**
 * @param siteUrl origin, no trailing slash
 * @param path    page path beginning with a slash, e.g. "/for/software-engineers"
 * @param title   the page's own H1-equivalent name
 */
export function buildSectionBreadcrumbSchema({
  siteUrl,
  path,
  title,
}: {
  siteUrl: string;
  path: string;
  title: string;
}) {
  const clean = path.replace(/\/+$/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts.length < 2) {
    throw new Error(
      `sectionBreadcrumb: "${path}" is not below a section hub — top-level pages and the homepage take no BreadcrumbList`,
    );
  }

  const section = parts[0];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionLabel(section),
        item: `${siteUrl}/${section}`,
      },
      { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}${clean}` },
    ],
  };
}

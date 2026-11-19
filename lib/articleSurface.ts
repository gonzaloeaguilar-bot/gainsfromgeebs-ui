/**
 * Derive the content surface classification from a URL pathname.
 *
 * Surfaces covered:
 * - blog: /blog and /blog/*
 * - science-question: /science/questions and /science/questions/*
 * - science-study: /science/studies and /science/studies/*
 * - science-digest: /science/weekly-digest and /science/weekly-digest/*
 * - science-topic: /science and /science/* (topics)
 * - vs: /vs and /vs/*
 * - locations: /locations and /locations/*
 * - nutrition: /nutrition and /nutrition/*
 * - for: /for and /for/*
 * - guides: /guides and /guides/*
 * - resources: /resources and /resources/*
 */
export function deriveArticleSurface(pathname: string): string {
  const path = (pathname || "/").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (path === "/blog" || path.startsWith("/blog/")) return "blog";
  if (path === "/science/questions" || path.startsWith("/science/questions/")) return "science-question";
  if (path === "/science/studies" || path.startsWith("/science/studies/")) return "science-study";
  if (path === "/science/weekly-digest" || path.startsWith("/science/weekly-digest/")) return "science-digest";
  if (path === "/science" || path.startsWith("/science/")) return "science-topic";
  if (path === "/vs" || path.startsWith("/vs/")) return "vs";
  if (path === "/locations" || path.startsWith("/locations/")) return "locations";
  if (path === "/nutrition" || path.startsWith("/nutrition/")) return "nutrition";
  if (path === "/for" || path.startsWith("/for/")) return "for";
  if (path === "/guides" || path.startsWith("/guides/")) return "guides";
  if (path === "/resources" || path.startsWith("/resources/")) return "resources";
  return "other";
}

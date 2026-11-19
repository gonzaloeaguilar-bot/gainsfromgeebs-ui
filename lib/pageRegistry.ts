import type { MetadataRoute } from "next";
import registeredPages from "@/data/pages";
import type { ResourceItem, ResourceType } from "@/data/resources";

export interface PageSitemapConfig {
  changeFrequency?: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority?: number;
  lastModified?: string | Date;
}

export interface PageRegistration {
  title: string;
  href: string;
  category: string;
  description: string;
  type: ResourceType;
  searchTerms: string[];
  sitemap?: PageSitemapConfig;
}

export function toResourceItem(page: PageRegistration): ResourceItem {
  return {
    title: page.title,
    href: page.href,
    category: page.category,
    description: page.description,
    type: page.type,
    searchTerms: page.searchTerms,
  };
}

export function getRegisteredPages(): PageRegistration[] {
  return registeredPages;
}

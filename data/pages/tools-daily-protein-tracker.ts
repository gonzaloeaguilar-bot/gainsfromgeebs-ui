import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Daily protein & meal distribution tracker",
  href: "/tools/daily-protein-tracker",
  category: "Tools",
  description:
    "Interactive daily protein intake tracker and meal distribution calculator. Track grams across 3-5 daily meals with local streak history and zero login.",
  type: "tool",
  searchTerms: [
    "daily protein tracker",
    "protein intake tracker",
    "meal protein distribution",
    "protein pacing calculator",
    "daily protein calculator",
    "body recomposition protein goal",
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: "2026-08-19",
  },
};

export default page;

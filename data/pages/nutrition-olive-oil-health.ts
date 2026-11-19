import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Olive Oil Health Benefits: What the Research Shows",
  href: "/nutrition/olive-oil-health",
  category: "Nutrition",
  description: "Extra virgin olive oil provides monounsaturated fat and polyphenols. See what human research supports for cardiovascular health, with every claim graded.",
  type: "guide",
  searchTerms: [
      "olive",
      "oil",
      "health",
      "benefits",
      "what",
      "the",
      "research",
      "shows",
      "nutrition"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-02",
  },
};

export default page;

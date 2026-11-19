import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Nutrition and Supplement Evidence Guides",
  href: "/nutrition",
  category: "Nutrition",
  description: "Plain-English nutrition and supplement guides: what human research found, what to do with it, and what the evidence does not prove.",
  type: "guide",
  searchTerms: [
      "nutrition",
      "and",
      "supplement",
      "evidence",
      "guides"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-03",
  },
};

export default page;

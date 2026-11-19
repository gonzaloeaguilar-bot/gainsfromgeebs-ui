import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Testosterone and nutrition for men over 35",
  href: "/nutrition/testosterone",
  category: "Nutrition",
  description: "An evidence-graded look at diet and testosterone for busy professional men: what olive oil, zinc, magnesium, and vitamin D actually do, and where the real levers live.",
  type: "guide",
  searchTerms: [
      "testosterone",
      "testosterone diet",
      "testosterone foods",
      "nutrition for testosterone",
      "best diet for testosterone",
      "zinc testosterone",
      "magnesium testosterone",
      "vitamin d testosterone",
      "olive oil testosterone"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

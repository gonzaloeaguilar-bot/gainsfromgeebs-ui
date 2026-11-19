import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Red Meat and Iron: What the Evidence Supports",
  href: "/nutrition/red-meat-iron",
  category: "Nutrition",
  description: "Red meat provides iron and zinc, but the verified research does not prove a hormone or performance benefit. See each claim and its evidence grade.",
  type: "guide",
  searchTerms: [
      "red",
      "meat",
      "and",
      "iron",
      "what",
      "the",
      "evidence",
      "supports",
      "nutrition"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-02",
  },
};

export default page;

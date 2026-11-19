import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Caffeine and Athletic Performance: Dose, Timing, Limits",
  href: "/nutrition/caffeine-performance",
  category: "Nutrition",
  description: "How caffeine affects endurance and strength, why adenosine matters, and how to choose a pre-workout dose without assuming more is better.",
  type: "guide",
  searchTerms: [
      "caffeine",
      "and",
      "athletic",
      "performance",
      "dose",
      "timing",
      "limits",
      "nutrition"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-02",
  },
};

export default page;

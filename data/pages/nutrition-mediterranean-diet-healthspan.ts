import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Mediterranean Diet and Healthspan: What We Know",
  href: "/nutrition/mediterranean-diet-healthspan",
  category: "Nutrition",
  description: "The Mediterranean diet is linked with lower age-related inflammation, but direct proof that it extends healthspan is limited. See the evidence and a practical plate.",
  type: "guide",
  searchTerms: [
      "mediterranean",
      "diet",
      "and",
      "healthspan",
      "what",
      "know",
      "nutrition"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-03",
  },
};

export default page;

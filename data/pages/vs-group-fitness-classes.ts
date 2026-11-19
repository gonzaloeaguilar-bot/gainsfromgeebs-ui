import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "1:1 Online Coaching vs Group Fitness Classes (F45, Orangetheory, CrossFit-Style)",
  href: "/vs/group-fitness-classes",
  category: "Coaching",
  description: "Group fitness classes offer community and energy, but lack individualization. Compare cost, schedule flexibility, injury scaling, and results before deciding.",
  type: "guide",
  searchTerms: [
    "group fitness classes",
    "F45 vs online coaching",
    "Orangetheory vs online coach",
    "CrossFit vs personal coach",
    "online coaching vs group fitness",
    "group workout vs 1:1 coach",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

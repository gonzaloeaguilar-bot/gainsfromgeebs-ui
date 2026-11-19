import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Free fitness calculators & tools",
  href: "/tools",
  category: "Tools",
  description:
    "Free fitness calculators and training tools: TDEE, macros, body recomposition, body fat percentage, calorie deficit, 1RM, daily habits, and meal planning with zero signup.",
  type: "tool",
  searchTerms: [
    "fitness calculators",
    "fitness tools",
    "workout calculators",
    "calorie calculator",
    "macro calculator",
    "body recomposition calculator",
    "tdee calculator",
    "1rm calculator",
    "body fat calculator",
    "habit tracker",
    "free fitness tools",
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.85,
    lastModified: "2026-08-18",
  },
};

export default page;

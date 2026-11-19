import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Daily step & NEAT energy tracker",
  href: "/tools/daily-step-tracker",
  category: "Tools",
  description:
    "Interactive daily step counter and NEAT energy expenditure calculator. Calculate daily step targets by goal, log daily walking volume, and build consistency with local streak tracking.",
  type: "tool",
  searchTerms: [
    "daily step tracker",
    "neat calorie calculator",
    "walking calorie expenditure",
    "step target calculator",
    "daily walking habit tracker",
    "neat energy expenditure",
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: "2026-09-23",
  },
};

export default page;

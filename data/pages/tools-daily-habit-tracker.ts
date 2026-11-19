import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Daily habit & routine tracker",
  href: "/tools/daily-habit-tracker",
  category: "Tools",
  description:
    "Interactive daily habit checklist and streak tracker for body recomposition habits. Track protein, training, hydration, and sleep locally with zero friction.",
  type: "tool",
  searchTerms: [
    "daily habit tracker",
    "fitness habit tracker",
    "body recomposition habit tracker",
    "daily workout checklist",
    "protein habit tracker",
    "streak tracker fitness",
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: "2026-08-12",
  },
};

export default page;

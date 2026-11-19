import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Daily hydration & electrolyte tracker",
  href: "/tools/daily-hydration-tracker",
  category: "Tools",
  description:
    "Interactive daily water and fluid intake tracker with electrolyte guidance. Calculate hydration targets based on bodyweight, sweat rate, and creatine with local streak tracking.",
  type: "tool",
  searchTerms: [
    "daily hydration tracker",
    "water intake tracker",
    "daily fluid calculator",
    "hydration goal calculator",
    "electrolyte fluid tracker",
    "creatine water intake calculator",
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: "2026-08-22",
  },
};

export default page;

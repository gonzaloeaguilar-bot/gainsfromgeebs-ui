import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Daily workout readiness & recovery tracker",
  href: "/tools/daily-readiness-tracker",
  category: "Tools",
  description:
    "Interactive daily readiness assessment to calculate neuromuscular recovery, sleep quality, muscle soreness, and training volume adjustments with local streak tracking.",
  type: "tool",
  searchTerms: [
    "daily workout readiness tracker",
    "recovery score calculator",
    "training readiness assessment",
    "rpe autoregulation calculator",
    "workout recovery tracker",
    "daily fatigue tracker",
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: "2026-08-23",
  },
};

export default page;

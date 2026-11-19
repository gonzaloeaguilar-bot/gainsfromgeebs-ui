import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coach for Shift Workers | Night-Shift Fitness Plan",
  href: "/for/shift-workers",
  category: "Busy professionals",
  description: "1:1 coaching for shift workers, night-shift workers, and FIFO workers: training relative to wake time, meal prep around rotations, and recovery-aware programming.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coach",
      "for",
      "shift",
      "workers",
      "nightshift",
      "plan",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-07-03",
  },
};

export default page;

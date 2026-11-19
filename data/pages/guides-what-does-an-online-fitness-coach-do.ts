import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "What does an online fitness coach do?",
  href: "/guides/what-does-an-online-fitness-coach-do",
  category: "Coaching",
  description: "A direct answer on what an online fitness coach actually does day-to-day, what is included, and what a good coach does that an app does not.",
  type: "guide",
  searchTerms: [
      "what does an online fitness coach do",
      "what is online fitness coaching",
      "what does a fitness coach do",
      "online coach explained",
      "coach vs app",
      "what is included in coaching"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-12",
  },
};

export default page;

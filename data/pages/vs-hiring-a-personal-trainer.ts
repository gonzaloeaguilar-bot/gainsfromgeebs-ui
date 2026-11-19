import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coach vs In-Person Personal Trainer",
  href: "/vs/hiring-a-personal-trainer",
  category: "Coaching",
  description: "Online fitness coach vs in-person personal trainer: cost, accountability, scheduling, customization, and who each is built for.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coach",
      "inperson",
      "personal",
      "trainer",
      "hiring",
      "coaching"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-07-05",
  },
};

export default page;

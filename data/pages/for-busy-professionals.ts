import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coaching for Busy Professionals",
  href: "/for/busy-professionals",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for busy professionals, built around packed calendars, travel, client dinners, and three focused training days.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coaching",
      "for",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-27",
  },
};

export default page;

import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coach for Men Who Travel for Work",
  href: "/for/men-who-travel-for-work",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for men who travel frequently for work — hotel-gym programming, road nutrition, timezone management, and daily accountability with NASM-CPT coach Kris Oddo.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coach",
      "for",
      "men",
      "who",
      "travel",
      "work",
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

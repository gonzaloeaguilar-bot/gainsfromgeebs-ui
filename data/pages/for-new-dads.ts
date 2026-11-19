import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coaching for New Dads",
  href: "/for/new-dads",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for new dads — 3×45-min sessions built around newborn chaos, sleep debt, and family meals. Kris Oddo, NASM-CPT.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coaching",
      "for",
      "new",
      "dads",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-07-06",
  },
};

export default page;

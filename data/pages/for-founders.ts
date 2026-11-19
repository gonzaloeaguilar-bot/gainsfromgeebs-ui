import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Fitness Coaching for Founders",
  href: "/for/founders",
  category: "Busy professionals",
  description: "1:1 fitness coaching for founders who need training adapted to startup hours, volatile weeks, and unpredictable schedules. NASM-CPT Kris Oddo.",
  type: "guide",
  searchTerms: [
      "fitness",
      "coaching",
      "for",
      "founders",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: "2026-06-23",
  },
};

export default page;

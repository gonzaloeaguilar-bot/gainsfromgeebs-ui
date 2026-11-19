import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coach for Men Over 40",
  href: "/for/men-over-40",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for men in their late 30s and 40s — smarter recovery, joint-friendly programming, real results. Kris Oddo, NASM-CPT.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coach",
      "for",
      "men",
      "over",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-10",
  },
};

export default page;

import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coach for Men in Their 30s",
  href: "/for/men-in-their-30s",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for men in their 30s — recomposition, muscle, fat loss. The whole client base is men 25-40. Kris Oddo, NASM-CPT.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coach",
      "for",
      "men",
      "their",
      "30s",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coaching for Software Engineers",
  href: "/for/software-engineers",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for software engineers and developers: strength training adapted to desk work, nutrition support, daily accountability with NASM-CPT coach.",
  type: "guide",
  searchTerms: [
      "online",
      "fitness",
      "coaching",
      "for",
      "software",
      "engineers",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: "2026-06-12",
  },
};

export default page;

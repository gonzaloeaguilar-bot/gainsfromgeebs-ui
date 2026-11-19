import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "AI Fitness Coach vs Human Coach: What AI Gets Right (and Where It Falls Apart)",
  href: "/vs/ai-fitness-coach",
  category: "Coaching",
  description: "Honest comparison of AI fitness coaching apps vs 1:1 human coaching. AI solves the program problem. It has not solved the adherence problem. Who needs which.",
  type: "guide",
  searchTerms: [
      "fitness",
      "coach",
      "human",
      "what",
      "gets",
      "right",
      "and",
      "where",
      "falls",
      "apart",
      "coaching"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-10",
  },
};

export default page;

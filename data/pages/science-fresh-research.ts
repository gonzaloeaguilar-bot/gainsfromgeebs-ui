import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Fresh peer-reviewed fitness research",
  href: "/science/fresh-research",
  category: "Science",
  description: "Browse newly published PubMed research on sleep, nutrition, cardio, training, cravings, and healthy aging.",
  type: "guide",
  searchTerms: [
      "fresh research",
      "new fitness studies",
      "new PubMed studies",
      "weekly science drop",
      "peer reviewed research",
      "fitness research updates",
      "sleep nutrition cardio studies",
      "evidence based fitness"
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.81,
    lastModified: "2026-08-06",
  },
};

export default page;

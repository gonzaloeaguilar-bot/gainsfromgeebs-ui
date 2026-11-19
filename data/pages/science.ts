import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Peer-reviewed fitness science library",
  href: "/science",
  category: "Science",
  description: "The PubMed-linked study library behind Geebs science content: sleep, anti-aging, nutrition, cravings, cardio, and strength training.",
  type: "guide",
  searchTerms: [
      "science",
      "peer reviewed studies",
      "pubmed",
      "research",
      "anti aging",
      "sleep studies",
      "fitness studies",
      "nutrition studies",
      "cardio studies",
      "evidence based fitness",
      "SCIENCE"
  ],
  sitemap: {
    changeFrequency: "daily",
    priority: 0.84,
    lastModified: "2026-07-21",
  },
};

export default page;

import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Peer-reviewed fitness science questions",
  href: "/science/questions",
  category: "Science",
  description: "Plain-English answers to common fitness questions, with practical steps, honest limits, and the original PubMed studies.",
  type: "guide",
  searchTerms: [
      "science questions",
      "fitness science questions",
      "peer reviewed answers",
      "pubmed",
      "FAQ",
      "weekly science drop"
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-07-21",
  },
};

export default page;

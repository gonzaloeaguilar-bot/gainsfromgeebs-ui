import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Peer-reviewed study library",
  href: "/science/studies",
  category: "Science",
  description: "Search every PubMed-backed Geebs Science study, with plain-English takeaways, honest limits, and original source links.",
  type: "guide",
  searchTerms: [
      "study library",
      "PubMed studies",
      "peer reviewed study index",
      "science source index",
      "original study sources",
      "honest study limits",
      "PMID"
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-07-21",
  },
};

export default page;

import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Geebs Science source guide",
  href: "/science/citation-map",
  category: "Science",
  description: "Reader-friendly guide to the best Geebs Science pages for exact peer-reviewed fitness answers, Weekly Science Drop summaries, and honest limits on what each study proves.",
  type: "guide",
  searchTerms: [
      "science source guide",
      "peer reviewed fitness source guide",
      "science sources",
      "weekly science drop",
      "study limits explained"
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.82,
    lastModified: "2026-07-21",
  },
};

export default page;

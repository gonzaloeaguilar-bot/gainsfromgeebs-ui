import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Weekly Science Drop",
  href: "/science/weekly-science-drop",
  category: "Science",
  description: "A free weekly Geebs email that turns one peer-reviewed fitness study into one practical action and one honest note on what the study does not prove.",
  type: "guide",
  searchTerms: [
      "weekly science drop",
      "fitness science email",
      "fitness research newsletter",
      "peer reviewed fitness studies",
      "one study one action one honest limit",
      "PubMed fitness research",
      "evidence based fitness",
      "sleep nutrition cardio training studies"
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.83,
    lastModified: "2026-07-21",
  },
};

export default page;

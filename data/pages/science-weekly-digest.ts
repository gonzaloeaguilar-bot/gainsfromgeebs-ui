import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Weekly Science Drop archive",
  href: "/science/weekly-digest",
  category: "Science",
  description: "Browse past Science Drops with Kris's practical takeaway, one action to try, honest limits, and the original peer-reviewed studies.",
  type: "guide",
  searchTerms: [
      "weekly science drop",
      "science digest",
      "fitness research digest",
      "reviewed science studies",
      "weekly fitness study breakdowns",
      "honest fitness study limits",
      "science newsletter archive",
      "evidence based fitness"
  ],
  sitemap: {
    changeFrequency: "weekly",
    priority: 0.81,
    lastModified: "2026-07-21",
  },
};

export default page;

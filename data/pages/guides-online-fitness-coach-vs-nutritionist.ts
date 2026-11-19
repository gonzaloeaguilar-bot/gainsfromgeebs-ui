import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online fitness coach vs nutritionist",
  href: "/guides/online-fitness-coach-vs-nutritionist",
  category: "Coaching",
  description: "A scope-of-practice comparison of a fitness coach versus a registered dietitian: when you need each, when you need both, and what Geebs covers.",
  type: "guide",
  searchTerms: [
      "online fitness coach vs nutritionist",
      "fitness coach vs dietitian",
      "coach or nutritionist",
      "registered dietitian vs coach",
      "nutrition coaching comparison",
      "rd vs cpt"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-07-10",
  },
};

export default page;

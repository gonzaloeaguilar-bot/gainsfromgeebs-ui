import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Soy and Testosterone: What the Research Actually Shows",
  href: "/science/soy-and-testosterone-myth",
  category: "Science",
  description:
    "Comprehensive meta-analyses of clinical trials demonstrate that neither soy protein nor soy isoflavones lower total testosterone or elevate estrogen in adult men.",
  type: "guide",
  searchTerms: [
    "soy testosterone",
    "does soy lower testosterone",
    "soy isoflavones estrogen men",
    "phytoestrogens testosterone",
    "soy protein isolate testosterone",
    "Reed 2021",
    "PMID 33383165",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

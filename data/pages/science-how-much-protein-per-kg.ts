import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title:
    "How Much Protein Do You Actually Need Per Kilogram? (Ending the 1.2 vs. 2.2 Debate)",
  href: "/science/how-much-protein-per-kg",
  category: "Science",
  description:
    "Settling the 0.8g/kg RDA vs. 2.2g/kg bodybuilding debate with the meta-analytic research ceiling (~1.6g/kg/day) from Morton et al. 2018.",
  type: "guide",
  searchTerms: [
    "protein intake per kg for men",
    "protein intake per kg to build muscle",
    "protein intake per kg calculator",
    "how much protein per kg",
    "1.6 g/kg protein",
    "2.2 g/kg protein",
    "Morton 2018",
    "PMID 28698222",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

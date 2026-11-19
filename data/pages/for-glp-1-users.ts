import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Keep Your Muscle While You're on a GLP-1",
  href: "/for/glp-1-users",
  category: "Fat loss",
  description:
    "About 25% of the weight lost on GLP-1s is lean mass. Lifting and protein coaching that works alongside your prescriber, never on the medication. Kris Oddo, NASM-CPT.",
  type: "guide",
  searchTerms: [
    "glp-1",
    "glp1",
    "ozempic",
    "semaglutide",
    "tirzepatide",
    "wegovy",
    "mounjaro",
    "muscle",
    "loss",
    "keep",
    "protein",
    "lifting",
    "weight",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-10-08",
  },
};

export default page;

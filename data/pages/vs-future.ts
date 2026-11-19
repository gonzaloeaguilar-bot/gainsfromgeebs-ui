import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Geebs vs Future: 1:1 Coach or App-Based Training?",
  href: "/vs/future",
  category: "Coaching",
  description: "Geebs (1:1 NASM-CPT) vs Future (app-based $199/mo): custom programming, dedicated coach, weekly check-ins, nutrition coaching included.",
  type: "guide",
  searchTerms: [
      "geebs",
      "future",
      "coach",
      "appbased",
      "training",
      "coaching"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-06-03",
  },
};

export default page;

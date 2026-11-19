import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Fitness Coaching for Executives",
  href: "/for/executives",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for executives, CEOs, and high-responsibility professionals who need training and nutrition built around packed and volatile calendars.",
  type: "guide",
  searchTerms: [
      "fitness",
      "coaching",
      "for",
      "executives",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-08-10",
  },
};

export default page;

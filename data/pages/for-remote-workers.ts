import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Fitness Coaching for Remote Workers",
  href: "/for/remote-workers",
  category: "Busy professionals",
  description: "1:1 online fitness coaching for remote workers and work-from-home professionals who want to stop the WFH weight-gain loop.",
  type: "guide",
  searchTerms: [
      "fitness",
      "coaching",
      "for",
      "remote",
      "workers",
      "busy",
      "professionals"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-29",
  },
};

export default page;

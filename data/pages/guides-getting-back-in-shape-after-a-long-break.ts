import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Getting back in shape after a long break",
  href: "/guides/getting-back-in-shape-after-a-long-break",
  category: "Restarting",
  description: "The restart guide for men coming back after months or years off: how to ramp safely, avoid week-two failure, and choose between DIY and coaching.",
  type: "guide",
  searchTerms: [
      "getting back in shape after a long break",
      "restart fitness after break",
      "back to gym after years",
      "how to start working out again",
      "fitness comeback",
      "restart guide"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-06-10",
  },
};

export default page;

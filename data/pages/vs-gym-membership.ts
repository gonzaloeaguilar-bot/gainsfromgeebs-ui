import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Coaching vs a Gym Membership: What Actually Gets You Results",
  href: "/vs/gym-membership",
  category: "Coaching",
  description: "A gym membership gives you equipment. It doesn't give you a plan, or notice when you stop showing up. Compare cost, program, and accountability before you decide.",
  type: "guide",
  searchTerms: [
      "online",
      "coaching",
      "gym",
      "membership",
      "what",
      "actually",
      "gets",
      "you",
      "results"
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-07-25",
  },
};

export default page;

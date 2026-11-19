import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coaching for Former Athletes",
  href: "/for/former-athletes",
  category: "Busy professionals",
  description:
    "1:1 online fitness coaching for former athletes getting back in shape after years off. Calibrate intensity, rebuild a strength base, and leverage muscle memory without re-injury.",
  type: "guide",
  searchTerms: [
    "online",
    "fitness",
    "coaching",
    "former",
    "athletes",
    "ex athlete",
    "out of shape",
    "muscle memory",
    "sports injuries",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-10-13",
  },
};

export default page;

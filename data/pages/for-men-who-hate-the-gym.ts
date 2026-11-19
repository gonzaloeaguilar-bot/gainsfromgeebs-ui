import type { PageRegistration } from "@/lib/pageRegistry";

const page: PageRegistration = {
  title: "Online Fitness Coaching for Men Who Hate Going to the Gym",
  href: "/for/men-who-hate-the-gym",
  category: "Busy professionals",
  description:
    "1:1 online fitness coaching for men who hate the gym or deal with gym anxiety: build real strength and body recomposition at home or transition to a gym when ready.",
  type: "guide",
  searchTerms: [
    "online",
    "fitness",
    "coaching",
    "men who hate the gym",
    "gym anxiety",
    "home workout",
    "home training",
    "body recomposition",
    "workout at home",
  ],
  sitemap: {
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
};

export default page;

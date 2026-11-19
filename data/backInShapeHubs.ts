import type { QuestionHub } from "@/data/scienceQuestionHubs";

/**
 * Niche #3 of geebs-next-niches-2026-10: getting back in shape after a break.
 *
 * Why this niche: in the DM bot (2,361 leads since 2026-05-05), the restart
 * story ("fell off", "used to", "starting again") shows up in 14% of booked
 * leads against 5% of all leads, the strongest booked-lead signal in the set.
 * Search is barely measured: Semrush 2026-10-06 lists 2 keywords we rank for.
 * Headings below use that phrasing; no lead's words or details are quoted.
 *
 * EVERY NUMBER BELOW was read from the PubMed abstract of the cited paper on
 * 2026-10-08 (efetch, PMIDs in the source labels). Do not add a figure without
 * opening its abstract first.
 */

const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

export const RESTART_SOURCES = {
  cumming: {
    label: "Cumming et al., 2024, Journal of Physiology (PMID 39159314)",
    href: pubmed("39159314"),
  },
  halonen: {
    label: "Halonen et al., 2024, Scandinavian Journal of Medicine & Science in Sports (PMID 39364857)",
    href: pubmed("39364857"),
  },
  ogasawara: {
    label: "Ogasawara et al., 2013, European Journal of Applied Physiology (PMID 23053130)",
    href: pubmed("23053130"),
  },
  kaushal: {
    label: "Kaushal & Rhodes, 2015, Journal of Behavioral Medicine (PMID 25851609)",
    href: pubmed("25851609"),
  },
  grgic: {
    label: "Grgic et al., 2022, Journal of Sport and Health Science (PMID 33497853)",
    href: pubmed("33497853"),
  },
  mpampoulis: {
    label: "Mpampoulis et al., 2024, Sports (PMID 39058089)",
    href: pubmed("39058089"),
  },
} as const;

export const BACK_IN_SHAPE_HUB_HREF = "/guides/getting-back-in-shape-after-a-long-break";
export const BACK_IN_SHAPE_QUESTION_HREF = "/science/questions/how-long-does-it-take-to-get-back-in-shape";
export const FORMER_ATHLETES_HREF = "/for/former-athletes";
export const DETRAINING_POST_HREF = "/blog/how-fast-do-you-lose-muscle-detraining";
export const CONSISTENCY_POST_HREF = "/blog/why-you-cant-stay-consistent-with-the-gym";

/** Rendered on the guide, which is the hub (the old /blog after-30 post 301s here). */
export const backInShapeHub: QuestionHub = {
  slug: "getting-back-in-shape-after-a-long-break",
  updated: "2026-11-05",
  heading: "Six questions people ask when they start again.",
  campaign: "back_in_shape",
  facts: [
    {
      id: "used-to-be-in-shape",
      q: "I used to be in shape. Is muscle memory real?",
      answer:
        "Partly, and the honest version still helps. In a 2024 study, 12 untrained men and women trained one arm for 10 weeks, then stopped for 16. The muscle fibres shrank, but the extra nuclei they had built stayed: the trained arm kept 33% more of them in its type 2 fibres.",
      more: [
        "When both arms were then trained for 10 more weeks, the arm that had trained before ended with larger type 2 fibres than the arm that never had. But the size it gained during retraining was not clearly bigger, so the researchers call the practical benefit unproven.",
        "What that means for a comeback: you are not starting from zero, and the muscle you built leaves a lasting trace. It does not mean the work gets skipped. Treat muscle memory as a head start, not a shortcut.",
      ],
      source: RESTART_SOURCES.cumming,
      next: { href: DETRAINING_POST_HREF, label: "How fast you lose muscle when you stop" },
    },
    {
      id: "how-fast-it-comes-back",
      q: "I fell off for a few months. How fast does it come back?",
      answer:
        "Faster than it took the first time. In a 2024 trial, 55 untrained adults around 32 years old lifted twice a week. One group trained for 10 weeks, stopped for 10, then trained 10 more. Their strength and size dropped during the break, then climbed back quickly.",
      more: [
        "In the first 5 weeks back, leg press strength and thigh and arm muscle size rose more in the returning group than in a group at the same stage of building them for the first time. By the end, both groups had the same results.",
        "The authors' own conclusion is that people should not worry much about occasional short breaks over a lifetime of lifting. These were beginners on a supervised program, so years off will take longer. The direction holds.",
      ],
      source: RESTART_SOURCES.halonen,
      next: { href: BACK_IN_SHAPE_QUESTION_HREF, label: "How long it takes to get back in shape" },
    },
    {
      id: "missed-a-few-weeks",
      q: "I missed three weeks. Did I lose everything?",
      answer:
        "No. In a 2013 trial, 14 young men did the bench press three times a week for 24 weeks. Half trained straight through; the other half took 3 weeks off after every 6 weeks of training. After 24 weeks, gains in chest and triceps size and in strength were the same.",
      more: [
        "The group with breaks gained faster each time it came back, which is how the totals came out even. That is the useful thing to know when a trip, a sick kid or a hard month knocks you out of the gym.",
        "The risk in three missed weeks is not the muscle. It is the story you tell yourself afterwards: that you fell off again and might as well wait for a better month. The body forgives three weeks. The restart is the part to protect.",
      ],
      source: RESTART_SOURCES.ogasawara,
      next: { href: DETRAINING_POST_HREF, label: "What a break actually costs you" },
    },
    {
      id: "keep-falling-off",
      q: "Why do I keep falling off after a couple of weeks?",
      answer:
        "Usually because the plan never became a habit. In a 12-week study of 111 new gym members, it took at least four exercise sessions a week for six weeks before exercise became a habit. Consistency and a routine that was simple to follow predicted who built one.",
      more: [
        "A routine that people enjoyed, and the right setting, also predicted the habit. Willpower was not one of the things measured. The people who stuck with it had made showing up easy, not heroic.",
        "So the first goal of a restart is attendance, not intensity: short sessions you finish, at the same times, in the same place. The four do not all need to be lifting. Two or three lifting days plus a walk or a ride add up, and once showing up is automatic, the training and the food can tighten.",
      ],
      source: RESTART_SOURCES.kaushal,
      next: { href: CONSISTENCY_POST_HREF, label: "Why you can't stay consistent with the gym" },
    },
    {
      id: "how-hard-starting-again",
      q: "How hard should I train when I'm starting again?",
      answer:
        "Easier than your memory says. A review of 15 studies found no reliable difference in strength or muscle growth between sets taken to failure and sets stopped short of it. You do not need to empty the tank to make progress.",
      more: [
        "For a restart, that is permission to stop each set with two or three reps left for the first few weeks. You still progress, you recover in time for the next session, and you avoid the soreness that makes week two feel impossible.",
        "The studies in the review were in young adults, and trained lifters did see slightly more growth from going to failure. That is a later tool. In month one, the job is to leave every session able to come back for the next one.",
      ],
      source: RESTART_SOURCES.grgic,
      next: { href: "/blog/beginner-strength-training-for-men", label: "A simple full-body plan to restart with" },
    },
    {
      id: "dont-fall-off-again",
      q: "What is the least I can do so I don't fall off again?",
      answer:
        "Less than you think. After 12 weeks of training, young women who dropped to one session a week kept their leg strength and muscle size for 12 more weeks. Those training once every two weeks still kept 90 to 95% of what they had built.",
      more: [
        "So a bad month does not need to be a zero month. One full-body session a week held the line in this study, and once every two weeks lost only a little.",
        "Plan that week before it comes. Agree with yourself, or your coach, on a 30-minute minimum session you will do when work, kids or travel take over. People who fall off usually had an all-or-nothing plan. People who stay in shape have a floor.",
      ],
      source: RESTART_SOURCES.mpampoulis,
      next: { href: FORMER_ATHLETES_HREF, label: "Coaching for former athletes" },
    },
  ],
  sendKris: {
    ctaId: "back_in_shape_hub_send_kris",
    entryContent: "back_in_shape_hub",
    eyebrow: "Starting again?",
    title: "Tell Kris where you fell off.",
    body: "Kris builds your first month around the week you actually have now, then raises it as the habit holds. You are not starting from zero.",
    label: "Send it to Kris",
  },
  links: [
    {
      href: BACK_IN_SHAPE_QUESTION_HREF,
      label: "How long does it take to get back in shape?",
      description: "Three timelines: the habit, the strength, and a short break.",
    },
    {
      href: FORMER_ATHLETES_HREF,
      label: "Coaching for former athletes",
      description: "If you played a sport and the body you remember is ten years old.",
    },
    {
      href: DETRAINING_POST_HREF,
      label: "How fast do you lose muscle when you stop training?",
      description: "What a break really costs, week by week.",
    },
    {
      href: CONSISTENCY_POST_HREF,
      label: "Why you can't stay consistent with the gym",
      description: "The planning problem behind most restarts that stall.",
    },
  ],
};

/** The question page: "How long does it take to get back in shape?" */
export const howLongBackInShape: QuestionHub = {
  slug: "how-long-does-it-take-to-get-back-in-shape",
  updated: "2026-10-13",
  heading: "Three timelines, one study each.",
  campaign: "back_in_shape",
  facts: [
    {
      id: "until-it-sticks",
      q: "How long until going to the gym stops feeling like a fight?",
      answer:
        "About six weeks, if you go often. A study that followed 111 new gym members for 12 weeks found exercise became a habit only after at least four sessions a week for six weeks. Below that, it stayed something people had to talk themselves into.",
      more: [
        "The members who built the habit fastest kept their routine consistent and simple, and the setting fit their life. That is why a restart plan should look boring for the first six weeks: the same days, the same short sessions.",
        "If six weeks sounds long, count it in sessions: about 24. Every one you finish makes the next one easier to start, which is the real milestone before any change shows up in the mirror.",
      ],
      source: RESTART_SOURCES.kaushal,
      next: { href: BACK_IN_SHAPE_HUB_HREF, label: "The full restart guide" },
    },
    {
      id: "until-strength-returns",
      q: "How long until my strength comes back after months off?",
      answer:
        "The first five weeks do the most. In a 2024 trial of adults around 32, people who lifted for 10 weeks, stopped for 10 and then restarted gained strength and size faster in their first 5 weeks back than a group at the same point of its first program.",
      more: [
        "Both groups lifted twice a week under supervision, and both ended at the same place after their training. The break cost them strength and size, and the comeback paid it back quickly.",
        "Two caveats. These were people new to lifting, and the break was 10 weeks, not years. After a longer layoff, expect the same shape of curve over a longer stretch: the fastest gains early, then a steadier climb.",
      ],
      source: RESTART_SOURCES.halonen,
      next: { href: DETRAINING_POST_HREF, label: "How fast muscle is lost, and regained" },
    },
    {
      id: "after-a-short-break",
      q: "How long does it take after just a few weeks off?",
      answer:
        "About as long as the training you would have done anyway. In a 24-week trial, young men who took 3 weeks off after every 6 weeks of bench training ended with the same muscle size and strength as men who never stopped.",
      more: [
        "The trick was that each 6-week block after a break produced faster gains than the same stretch in the group that kept going. Over three cycles, the difference disappeared.",
        "So after a short break, there is no need to repeat a beginner phase. Start a little lighter for a week, then go back to your normal plan. What costs people months is not the three weeks off, it is waiting for a perfect moment to restart.",
      ],
      source: RESTART_SOURCES.ogasawara,
      next: { href: FORMER_ATHLETES_HREF, label: "Coaching for former athletes" },
    },
  ],
  sendKris: {
    ctaId: "back_in_shape_question_send_kris",
    entryContent: "back_in_shape_how_long_question",
    eyebrow: "Want your own timeline?",
    title: "Send Kris how long you've been off.",
    body: "Kris looks at where you were, how long the break was and the week you have now, then sets a first month you can actually finish.",
    label: "Send it to Kris",
  },
  links: [
    {
      href: BACK_IN_SHAPE_HUB_HREF,
      label: "Getting back in shape after a long break",
      description: "The six questions people ask when they start again.",
    },
    {
      href: DETRAINING_POST_HREF,
      label: "How fast do you lose muscle when you stop training?",
      description: "What the break cost, and what muscle memory does and does not do.",
    },
    {
      href: "/guides/how-long-to-see-results-working-out",
      label: "How long to see results from working out",
      description: "If this is your first time training, not a comeback.",
    },
    {
      href: "/for/men-starting-over-after-a-breakup-or-divorce",
      label: "Starting over after a breakup or divorce",
      description: "When the break came with a life change, not just a busy year.",
    },
  ],
};

export const backInShapeHubs: QuestionHub[] = [backInShapeHub, howLongBackInShape];

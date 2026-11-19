/**
 * Niche #2 of geebs-next-niches-2026-10: men over 40 and the "dad bod".
 *
 * Semrush 2026-10-06: the dad-bod cluster is the easiest in the set (KD 16).
 * GSC 2026-07-08 to 10-06: /blog/how-to-lose-the-dad-bod had 1,624
 * impressions at position 13.9 and 10 clicks; "online fitness coach for men
 * over 40" (39 impressions, position 16.2) landed on a listicle, not on
 * /for/men-over-40, which had 22 impressions. All three audience pages are
 * indexed (URL Inspection, 2026-10-08), so the gap was relevance, not
 * indexation: no page tied the over-40 story to the recomp method, the
 * calculator and the application.
 *
 * EVERY NUMBER BELOW was read from the PubMed abstract of the cited paper on
 * 2026-10-08 (efetch, PMIDs in the source labels). Do not add a figure without
 * opening its abstract first.
 */

import type { HubFact } from "./scienceQuestionHubs";
import { SOURCES as HUB_SOURCES } from "./scienceQuestionHubs";

const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

export const OVER40_SOURCES = {
  peterson: {
    label: "Peterson et al., 2011, Medicine & Science in Sports & Exercise (PMID 20543750)",
    href: pubmed("20543750"),
  },
  janssen: {
    label: "Janssen et al., 2000, Journal of Applied Physiology (PMID 10904038)",
    href: pubmed("10904038"),
  },
  feldman: {
    label: "Feldman et al., 2002, Journal of Clinical Endocrinology & Metabolism (PMID 11836290)",
    href: pubmed("11836290"),
  },
  nedeltcheva: {
    label: "Nedeltcheva et al., 2010, Annals of Internal Medicine (PMID 20921542)",
    href: pubmed("20921542"),
  },
  schoenfeld2019: {
    label: "Schoenfeld et al., 2019, Journal of Sports Sciences (PMID 30558493)",
    href: pubmed("30558493"),
  },
  recchia: {
    label: "Recchia et al., 2023, British Journal of Sports Medicine (PMID 36669870)",
    href: pubmed("36669870"),
  },
  morton: HUB_SOURCES.morton,
} as const;

export const OVER40_HUB_HREF = "/body-recomposition-over-40";
export const OVER40_UPDATED = "2026-10-13";
export const OVER40_ENTRY_CONTENT = "body_recomp_over_40";
export const OVER40_APPLY_HREF = `/apply?entry_source=qualified_content&entry_content=${OVER40_ENTRY_CONTENT}&utm_source=site&utm_medium=hub&utm_campaign=men_over_40`;

export const OVER40_FACTS: HubFact[] = [
  {
    id: "can-you-build-muscle-after-40",
    q: "Can you still build muscle after 40?",
    answer:
      "Yes. A review of 49 studies and 1,328 adults aged 50 and over found that lifting added an average of 1.1 kg of lean mass. Higher-volume programs added more, and the oldest people gained a little less, so starting at 40 beats starting at 60.",
    more: [
      "Those were people ten or more years older than you, most of them new to lifting. If they gain muscle, a man in his 40s has more room, not less. The same review found that age shaved a little off the gain; it did not erase it.",
      "The practical reading: the window has not closed, but it rewards starting now and doing enough work. Three full-body sessions a week, with a few hard sets per muscle, is where most men over 40 start.",
    ],
    source: OVER40_SOURCES.peterson,
    next: { href: "/nutrition/muscle-after-40", label: "Eating to build muscle after 40" },
  },
  {
    id: "why-the-dad-bod-creeps-on",
    q: "Why does the dad bod creep on in your 30s and 40s?",
    answer:
      "Mostly because muscle quietly drops while fat goes up. MRI scans of 468 adults showed muscle as a share of body weight starting to fall in the third decade of life (your 20s), while the absolute loss only became noticeable at the end of the fifth, and mostly in the legs.",
    more: [
      "So a man can weigh the same at 42 as at 28 and look softer: less muscle holding the shape, more fat around the middle. The scale cannot show the trade.",
      "That is why the fix is not just eating less. Eat less without lifting and you lose some of the muscle you have left. Lift while you eat a little less, and the weight that comes off is mostly fat. That is a recomp.",
    ],
    source: OVER40_SOURCES.janssen,
    next: { href: "/blog/how-to-lose-the-dad-bod", label: "How to lose the dad bod" },
  },
  {
    id: "does-testosterone-drop-after-40",
    q: "Does testosterone really drop after 40, and does it matter?",
    answer:
      "It drops slowly. Following 1,156 men aged 40 to 70 for 7 to 10 years, the Massachusetts Male Aging Study measured total testosterone falling about 1.6% a year within each man. Men without chronic illness, obesity or heavy drinking had androgen levels 10 to 15% higher.",
    more: [
      "A slow decline is not a cliff. It is a reason to control what you can: carry less body fat, drink less, sleep more, and lift. The study's healthy-man difference points the same way.",
      "Anything beyond that, like symptoms, blood work or therapy, is a conversation with your doctor. Kris coaches the training and the food; he does not diagnose or treat hormones.",
    ],
    source: OVER40_SOURCES.feldman,
    next: { href: "/nutrition/muscle-after-40", label: "What to eat for muscle after 40" },
  },
  {
    id: "how-much-protein-after-40",
    q: "How much protein do you need after 40?",
    answer:
      "Aim for about 1.6 g per kg of bodyweight a day, roughly 0.7 g per pound. A review of 49 trials found muscle gains from lifting stopped improving past 1.62 g per kg, and that extra protein helped a little less as age went up.",
    more: [
      "That age effect is a reason to hit the number every day, not to skip it. For a 200-pound man, 1.6 g per kg is about 145 grams: four meals of 35 to 40 grams.",
      "If the number feels high, eat the protein first at each meal and let the rest of the plate fill in around it. Hitting it most days matters far more than the timing.",
    ],
    source: OVER40_SOURCES.morton,
    next: { href: "/tools/body-recomposition-calculator", label: "Get your protein and calorie numbers" },
  },
  {
    id: "how-often-to-train-after-40",
    q: "How many days a week should you lift after 40?",
    answer:
      "Three is enough for most men. A review of 25 studies found that, for the same weekly amount of work, how many days you split it across made no meaningful difference to muscle growth. Pick the frequency you will still be doing in March.",
    more: [
      "For a man with a job and kids, that usually means three full-body sessions of about 45 minutes. If a week falls apart, two sessions that cover the whole body still keep the work going.",
      "What matters more after 40 is that the work is hard enough and that you recover from it: stop each set with one or two clean reps left, and add a rep or a little weight when your form holds.",
    ],
    source: OVER40_SOURCES.schoenfeld2019,
    next: { href: "/for/new-dads", label: "Training on a newborn schedule" },
  },
  {
    id: "does-sleep-matter-for-fat-loss",
    q: "Does sleep change how much fat you lose on a diet?",
    answer:
      "It can. In a trial of adults averaging 41 years old on the same diet, 5.5 hours in bed a night instead of 8.5 cut the share of weight lost as fat by 55% (0.6 kg of fat against 1.4 kg) and raised the loss of fat-free mass, which includes muscle, by 60%.",
    more: [
      "It was a small, two-week study of 10 people, so take the size of the effect with care. The direction matches what most dads already feel: short nights leave you hungrier, and more of what the diet takes off is lean mass instead of fat.",
      "You cannot always fix the nights with a young child. You can protect the hours you control: a set bedtime, no screens in the last half hour, and keeping caffeine to the morning.",
    ],
    source: OVER40_SOURCES.nedeltcheva,
    next: { href: "/science/questions/does-sleep-deprivation-make-you-eat-more", label: "Does sleep loss make you eat more?" },
  },
];

export type Over40Link = { href: string; label: string; description: string };

export const OVER40_GROUPS: { id: string; heading: string; links: Over40Link[] }[] = [
  {
    id: "plans",
    heading: "The plans",
    links: [
      {
        href: "/blog/how-to-lose-the-dad-bod",
        label: "How to lose the dad bod",
        description: "Why it creeps on, the belly specifically, and the three-day plan.",
      },
      {
        href: "/skinny-fat",
        label: "Skinny fat, explained",
        description: "Normal weight, soft middle: the waist test and the recomp fix.",
      },
      {
        href: "/blog/body-recomposition-for-men",
        label: "Body recomposition for men",
        description: "The full method for building muscle and losing fat at the same time.",
      },
      {
        href: "/nutrition/muscle-after-40",
        label: "Muscle after 40: what to eat",
        description: "Protein, meals and the food side of keeping muscle as you age.",
      },
    ],
  },
  {
    id: "tools",
    heading: "Check your numbers",
    links: [
      {
        href: "/tools/body-recomposition-calculator",
        label: "Body recomposition calculator",
        description: "Your protein target and calorie starting point in under a minute.",
      },
      {
        href: "/tools/body-fat-calculator",
        label: "Body fat calculator",
        description: "An estimate from a few tape measurements, to track as a trend.",
      },
    ],
  },
  {
    id: "coaching",
    heading: "Coaching for men over 40",
    links: [
      {
        href: "/for/men-over-40",
        label: "1:1 coaching for men over 40",
        description: "Training around old injuries, slower recovery and a full week.",
      },
      {
        href: "/for/new-dads",
        label: "Coaching for new dads",
        description: "A plan built for broken sleep and 45-minute windows.",
      },
    ],
  },
];

/**
 * The one client result on file with an age over 40 (data/clientResults.ts,
 * permission "explicit"). Shown with his own outcome line; no weight or body
 * fat number is attributed to him because he never gave one.
 */
export const OVER40_PROOF_RESULT_ID = "jhoan-rincon-3-months-technique-health";

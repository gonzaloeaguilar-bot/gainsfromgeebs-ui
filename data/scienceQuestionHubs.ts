/**
 * Hub sections for the science question pages that lead a niche.
 *
 * A question page normally carries one short answer, a practical move and the
 * studies. A HUB question page also carries 5-7 question-shaped sections, each
 * with one cited fact, depth behind native <details> (server HTML, so crawlers
 * that run no JavaScript still read it), Kris's byline, and a send-it-to-Kris
 * step. Only pages listed here change; every other question page renders
 * exactly as before.
 *
 * Niche #1 of geebs-next-niches-2026-10 ("losing fat without losing muscle",
 * with a GLP-1 page inside it). Semrush 2026-10-06: 8 verified keywords,
 * 2,910 searches a month, best position 25. GSC 2026-07-08 to 10-06: the hub
 * URL had 620 impressions at position 24.4 and 0 clicks.
 *
 * EVERY NUMBER BELOW was read from the PubMed abstract of the cited paper on
 * 2026-10-08 (efetch, PMIDs in the source labels). Do not add a figure without
 * opening its abstract first.
 */

import { backInShapeHubs } from "@/data/backInShapeHubs";

export type HubFact = {
  id: string;
  q: string;
  /** Visible at rest: the answer, carrying the fact. */
  answer: string;
  /** Behind the fold: the depth. */
  more: string[];
  source: { label: string; href: string };
  next: { href: string; label: string };
};

export type QuestionHub = {
  slug: string;
  updated: string;
  heading: string;
  /** utm_campaign on the send-it-to-Kris link; defaults to the niche #1 value. */
  campaign?: string;
  facts: HubFact[];
  sendKris: {
    ctaId: string;
    entryContent: string;
    eyebrow: string;
    title: string;
    body: string;
    label: string;
  };
  links: { href: string; label: string; description: string }[];
};

const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

export const SOURCES = {
  longland: {
    label: "Longland et al., 2016, American Journal of Clinical Nutrition (PMID 26817506)",
    href: pubmed("26817506"),
  },
  binmahfoz: {
    label: "Binmahfoz et al., 2025, BMJ Open Sport & Exercise Medicine (PMID 40909191)",
    href: pubmed("40909191"),
  },
  morton: {
    label: "Morton et al., 2018, British Journal of Sports Medicine (PMID 28698222)",
    href: pubmed("28698222"),
  },
  garthe: {
    label:
      "Garthe et al., 2011, International Journal of Sport Nutrition and Exercise Metabolism (PMID 21558571)",
    href: pubmed("21558571"),
  },
  wilson: {
    label: "Wilson et al., 2012, Journal of Strength and Conditioning Research (PMID 22002517)",
    href: pubmed("22002517"),
  },
  karakasis: {
    label: "Karakasis et al., 2025, Metabolism (PMID 39719170)",
    href: pubmed("39719170"),
  },
  look: {
    label: "Look et al., 2025, Diabetes, Obesity and Metabolism (PMID 39996356)",
    href: pubmed("39996356"),
  },
  locatelli: {
    label: "Locatelli et al., 2024, Diabetes Care (PMID 38687506)",
    href: pubmed("38687506"),
  },
  mozaffarian: {
    label: "Mozaffarian et al., 2025, Obesity, joint advisory of four societies (PMID 40445127)",
    href: pubmed("40445127"),
  },
} as const;

export const FAT_LOSS_HUB_HREF = "/science/questions/how-to-lose-fat-without-losing-muscle";
export const GLP1_PAGE_HREF = "/for/glp-1-users";
export const RECOMP_CALCULATOR_HREF = "/tools/body-recomposition-calculator";

const fatLossHub: QuestionHub = {
  slug: "how-to-lose-fat-without-losing-muscle",
  updated: "2026-10-08",
  heading: "Six questions, one study each.",
  facts: [
    {
      id: "is-it-possible",
      q: "Can you really lose fat without losing muscle?",
      answer:
        "Yes. In a 4-week trial, 40 young men ate about 40% below their needs while lifting and doing intervals six days a week. The group eating 2.4 g of protein per kg gained 1.2 kg of lean mass and lost 4.8 kg of fat.",
      more: [
        "The group eating half that protein (1.2 g per kg) gained almost no lean mass (0.1 kg) and lost less fat (3.5 kg). Same deficit, same training. The only difference was protein.",
        "These were young, fit men on a steep, short diet, so do not expect those exact numbers. The direction is what carries over: hard lifting plus high protein lets the body take the energy it is missing from fat, not from muscle.",
      ],
      source: SOURCES.longland,
      next: { href: "/science/how-much-protein-per-kg", label: "How much protein per kg, explained" },
    },
    {
      id: "does-lifting-matter",
      q: "Do you need to lift weights if the goal is fat loss?",
      answer:
        "Yes, and the scale will not show you why. Across 25 trials of people dieting to lose weight, adding resistance training made no real difference to scale weight (0.32 kg) but protected fat-free mass and increased fat loss.",
      more: [
        "That is the whole argument in one result. Two people can lose the same number of pounds, and the one who lifted lost more of it as fat. The reviewers rated the evidence on fat loss as high certainty and on fat-free mass as moderate certainty.",
        "Strength went up too in the lifting groups. In coaching that means two to four full-body sessions a week during a cut; the goal is to keep your lifts, not to set records.",
      ],
      source: SOURCES.binmahfoz,
      next: {
        href: "/science/questions/does-lifting-help-during-weight-loss",
        label: "Does lifting help during weight loss?",
      },
    },
    {
      id: "how-much-protein",
      q: "How much protein do you need to keep muscle in a deficit?",
      answer:
        "Aim for about 1.6 g per kg of bodyweight a day, which is roughly 0.7 g per pound. A review of 49 trials and 1,863 people found that muscle gains from lifting stopped improving past 1.62 g per kg.",
      more: [
        "In a deficit it can make sense to go a little higher, because protein also keeps you full, and the trial in the first answer used 2.4 g per kg. For a 200-pound man, 1.6 g per kg is about 145 grams a day: four meals of 35 to 40 grams.",
        "Hitting the number most days matters far more than the timing. If you cannot hit it, eat the protein first at each meal and let the rest of the plate fill in around it.",
      ],
      source: SOURCES.morton,
      next: { href: RECOMP_CALCULATOR_HREF, label: "Get your protein and calorie numbers" },
    },
    {
      id: "how-fast",
      q: "How fast can you lose fat without losing muscle?",
      answer:
        "Slower than most people try. In a trial of 24 athletes lifting four times a week, those losing 0.7% of bodyweight a week gained 2.1% lean mass. Those losing 1.4% a week gained none (minus 0.2%), for the same total weight lost.",
      more: [
        "Both groups lost about 5.5% of their bodyweight; the slow group just took longer (8.5 weeks against 5.3) and ate 19% below their needs instead of 30%.",
        "For a 200-pound man, 0.7% a week is about 1.4 pounds. In practice that is a deficit of a few hundred calories a day, not a crash diet. These were elite athletes, so treat the rate as a ceiling to stay under, not a target.",
      ],
      source: SOURCES.garthe,
      next: { href: "/tools/calorie-deficit-calculator", label: "Work out a deficit that size" },
    },
    {
      id: "cardio",
      q: "Will cardio burn your muscle?",
      answer:
        "Not if you choose it well. A review of 21 studies found that running, but not cycling, cut into the muscle and strength gained from lifting, and that longer and more frequent cardio sessions took more away.",
      more: [
        "So cardio is a dose, not a danger. Daily steps, walking and easy cycling support fat loss without competing with the lifting. Long, frequent runs are the version that costs you.",
        "A workable default during a cut is 8,000 to 10,000 steps a day plus one or two easy 20 to 30 minute rides or walks a week. If you love running, keep it, but keep the lifting first in your week and do not add miles at the same time as you cut calories.",
      ],
      source: SOURCES.wilson,
      next: { href: "/blog/how-much-cardio-for-fat-loss-men", label: "How much cardio for fat loss" },
    },
    {
      id: "glp-1",
      q: "What if you are losing weight on a GLP-1?",
      answer:
        "Then this matters more, not less. A review of 22 trials and 2,258 people found that lean mass made up about 25% of the weight lost on GLP-1 medications, so lifting and protein decide how much of the rest is fat.",
      more: [
        "Weight drops faster on these medications, and appetite drops with it, which makes protein easy to miss. The same review found the share of the body that is lean mass did not get worse, so this is a reason to train, not a reason to panic.",
        "The medication is your prescriber's call. The training and the protein are the part a coach can help with, and they are the part that decides what the weight loss looks like in the mirror.",
      ],
      source: SOURCES.karakasis,
      next: { href: GLP1_PAGE_HREF, label: "Keep your muscle while you're on a GLP-1" },
    },
  ],
  sendKris: {
    ctaId: "fat_loss_hub_send_kris",
    entryContent: "fat_loss_keep_muscle_hub",
    eyebrow: "Want it set for you?",
    title: "Send Kris where you are starting from.",
    body: "Kris sets your deficit, protein and lifting from your actual numbers, then adjusts them every week so the weight that comes off is fat.",
    label: "Send it to Kris",
  },
  links: [
    {
      href: "/skinny-fat",
      label: "Skinny fat: what it is and how men fix it",
      description: "If you are not heavy but soft, the plan is a recomp, not a diet.",
    },
    {
      href: RECOMP_CALCULATOR_HREF,
      label: "Body recomposition calculator",
      description: "Your protein target and calorie starting point in under a minute.",
    },
    {
      href: GLP1_PAGE_HREF,
      label: "Keep your muscle on a GLP-1",
      description: "Lifting and protein coaching that works alongside your prescriber.",
    },
    {
      href: "/blog/how-to-lose-fat-without-losing-muscle-men",
      label: "The men's cutting guide",
      description: "Kris's week-by-week version: deficit size, protein floor, training minimum.",
    },
  ],
};

const glp1ProteinLifting: QuestionHub = {
  slug: "should-you-use-protein-and-lifting-on-glp-1",
  updated: "2026-10-08",
  heading: "What this means if you are losing weight.",
  facts: [
    {
      id: "how-much-is-muscle",
      q: "How much of the weight lost on a GLP-1 is muscle?",
      answer:
        "About a quarter of it is lean mass. In the SURMOUNT-1 body-scan substudy, people on tirzepatide lost 21.3% of their bodyweight over 72 weeks, and about 75% of what they lost was fat and 25% was lean mass.",
      more: [
        "The placebo group, who lost far less, had the same 75/25 split. That is the honest reading: the medication did not single out muscle, but it made the total so large that the lean share is a real amount of tissue.",
        "Lean mass on a scan is not only muscle (it includes water and organs), which is another reason to track strength alongside the scan.",
      ],
      source: SOURCES.look,
      next: { href: "/science/questions/do-glp-1s-cause-muscle-loss", label: "Do GLP-1s cause muscle loss?" },
    },
    {
      id: "can-lifting-offset-it",
      q: "Can lifting offset that loss?",
      answer:
        "It is the best tool there is, though direct GLP-1 trials are still running. A 2024 review in Diabetes Care put incretin-drug lean-mass loss at about 10%, or 6 kg, and found supervised lifting for over 10 weeks adds about 3 kg of lean mass.",
      more: [
        "The same review found strength gains of about 25% from that kind of training, in men and women, and its authors recommend tailored resistance training alongside these medications.",
        "A trial testing protein plus lifting during semaglutide and tirzepatide treatment (LEAN-PREP) has published its protocol but not its results, so nobody can yet promise a number. Lifting is still the safe bet while the evidence comes in.",
      ],
      source: SOURCES.locatelli,
      next: { href: "/science/questions/should-you-lift-while-on-glp-1", label: "Should you lift while on a GLP-1?" },
    },
    {
      id: "what-the-advisory-says",
      q: "What do the medical societies recommend?",
      answer:
        "Resistance training and enough protein. A 2025 joint advisory from four obesity and nutrition societies lists muscle and bone loss among the main problems with GLP-1s, and preserving them through resistance training and diet as a priority.",
      more: [
        "It also lists a check of muscle strength, function and body composition at the start of treatment among its priorities, and notes these medications cut weight by 5% to 18% in trials, and that many people stop taking them and regain weight. Muscle you keep on the way down is muscle you still have if that happens.",
        "Nothing here is dosing advice. Starting, stopping or changing a medication belongs with your prescriber.",
      ],
      source: SOURCES.mozaffarian,
      next: { href: GLP1_PAGE_HREF, label: "Coaching for people on a GLP-1" },
    },
  ],
  sendKris: {
    ctaId: "glp1_question_send_kris",
    entryContent: "glp1_protein_lifting_question",
    eyebrow: "On a GLP-1 now?",
    title: "Send Kris your training and your week.",
    body: "Kris builds the lifting and the protein around your appetite and your schedule. Your prescriber keeps the medication.",
    label: "Send it to Kris",
  },
  links: [
    {
      href: GLP1_PAGE_HREF,
      label: "Keep your muscle while you're on a GLP-1",
      description: "What coaching changes, and what stays with your prescriber.",
    },
    {
      href: FAT_LOSS_HUB_HREF,
      label: "How to lose fat without losing muscle",
      description: "The six questions, one study each.",
    },
    {
      href: RECOMP_CALCULATOR_HREF,
      label: "Body recomposition calculator",
      description: "Your protein target in under a minute.",
    },
  ],
};

export const questionHubs: QuestionHub[] = [fatLossHub, glp1ProteinLifting, ...backInShapeHubs];

export function questionHubBySlug(slug: string): QuestionHub | undefined {
  return questionHubs.find((hub) => hub.slug === slug);
}

export function applyHrefForHub(hub: QuestionHub): string {
  return `/apply?entry_source=qualified_content&entry_content=${hub.sendKris.entryContent}&utm_source=site&utm_medium=hub&utm_campaign=${hub.campaign ?? "fat_loss_keep_muscle"}`;
}

/**
 * The GLP-1 and diet-plus-lifting study pages pull research traffic (GSC,
 * 2026-07-08 to 10-06: the 2025 resistance-exercise meta-analysis had 51,404
 * impressions and 4 clicks, the SURMOUNT-1 page 718 and 0) with no route from
 * the finding to what a reader should do. These
 * study ids get a "what this means if you're losing weight" block linking the
 * fat-loss hub and the GLP-1 page.
 */
const GLP1_BODY_COMPOSITION_STUDIES = new Set([
  "glp1-body-composition-network-meta-2025",
  "glp1-body-composition-network-meta-2026",
  "glp1-body-composition-review-2025",
  "tirzepatide-body-composition-surmount1-2025",
  "semaglutide-lean-mass-systematic-review-2024",
  "incretin-resistance-exercise-body-composition-2024",
  "incretin-lean-mass-lifestyle-meta-2026",
]);

const DIET_LIFTING_STUDIES = new Set([
  "resistance-exercise-diet-weight-loss-meta-2025",
  "higher-protein-deficit-intense-exercise",
]);

export function weightLossBridgeForStudy(
  studyId: string,
): { body: string; links: { href: string; label: string }[] } | null {
  if (GLP1_BODY_COMPOSITION_STUDIES.has(studyId)) {
    return {
      body: "On a GLP-1, about a quarter of the weight that comes off is lean mass. Lifting and enough protein are what you control: they decide how much of the rest is fat. The medication stays with your prescriber.",
      links: [
        { href: GLP1_PAGE_HREF, label: "Keep your muscle on a GLP-1" },
        { href: FAT_LOSS_HUB_HREF, label: "Lose fat without losing muscle" },
      ],
    };
  }
  if (DIET_LIFTING_STUDIES.has(studyId)) {
    return {
      body: "In a calorie deficit, lifting and protein decide whether the weight you lose is fat or muscle. The scale cannot show the difference, so track your lifts and your waist as well.",
      links: [
        { href: FAT_LOSS_HUB_HREF, label: "Lose fat without losing muscle" },
        { href: RECOMP_CALCULATOR_HREF, label: "Get your protein target" },
      ],
    };
  }
  return null;
}

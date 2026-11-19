import {
  scienceQuestionPageBySlug,
  studiesForScienceQuestion,
  type ScienceQuestionPage,
} from "@/data/scienceQuestions";
import type { ScienceStudy } from "@/data/scienceLibrary";

export type ScienceDigestEntry = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  coachingMove: string;
  claimGuardrail: string;
  questionSlugs: string[];
  keywords: string[];
  quickAnswer?: string;
  dateModified?: string;
  faqs?: { question: string; answer: string }[];
};

export type ResolvedScienceDigestEntry = ScienceDigestEntry & {
  questions: ScienceQuestionPage[];
  studies: ScienceStudy[];
};

export const scienceDigestEntries: ScienceDigestEntry[] = [
  {
    id: "sleep-screens-cravings",
    eyebrow: "Sleep and cravings drop",
    title: "Phones, caffeine, sleep, and late-night cravings",
    summary:
      "Bedtime screens, late caffeine, and short sleep can all make late-night cravings harder to manage. Start with the pattern before blaming willpower.",
    coachingMove:
      "Run a seven-night sleep setup test: phone away from bed, caffeine cutoff, and a simple late-night snack log.",
    claimGuardrail:
      "One sleep habit will not explain every craving. Sleep quality, appetite signals, stress, food availability, and repeated habits can all matter.",
    questionSlugs: [
      "does-phone-in-bed-hurt-sleep",
      "does-caffeine-before-bed-hurt-sleep",
      "does-poor-sleep-cause-cravings",
    ],
    keywords: [
      "sleep studies",
      "phone in bed",
      "caffeine before bed",
      "cravings",
      "fat loss",
    ],
  },
  {
    id: "protein-satiety-recomposition",
    eyebrow: "Protein and recomp drop",
    title: "Protein, fullness, and body recomposition",
    summary:
      "Protein can help with fullness, recovery, and lean-mass retention during fat loss or recomposition, but it still works alongside training and total calories.",
    coachingMove:
      "Set a protein floor first, then adjust calories, carbs, fats, and meal timing around adherence instead of chasing a perfect macro split.",
    claimGuardrail:
      "Protein is not magic. Training creates the adaptation signal, and total calories still shape fat loss.",
    questionSlugs: [
      "does-protein-help-you-stay-full",
      "how-much-protein-for-body-recomposition",
    ],
    keywords: [
      "protein",
      "satiety",
      "body recomposition",
      "lean mass",
      "nutrition studies",
    ],
  },
  {
    id: "lifting-cardio-longevity",
    eyebrow: "Training and longevity drop",
    title: "Lifting, cardio, and longevity without the false choice",
    summary:
      "Strength training and cardio solve different problems. Pair them to support body composition, recovery, fitness, and long-term health.",
    coachingMove:
      "Keep lifting as the main progressive stimulus, then add steps and low-impact cardio at a dose that does not crush leg training or recovery.",
    claimGuardrail:
      "Lifting does not replace conditioning, and cardio does not automatically cost muscle. Dose, timing, and recovery matter.",
    questionSlugs: [
      "is-lifting-enough-for-longevity",
      "does-cardio-hurt-muscle-growth",
      "is-hiit-better-than-steady-cardio-for-fat-loss",
      "does-strength-training-help-you-age-better",
    ],
    keywords: [
      "cardio",
      "strength training",
      "longevity",
      "muscle growth",
      "healthy aging",
    ],
    quickAnswer:
      "Longevity training research points consistently to the same conclusion: combining strength training with aerobic conditioning produces better health-span outcomes than either alone. Studies on lean mass preservation, VO2 max, and all-cause mortality show these are complementary habits, not competing priorities. Kris Oddo, NASM-CPT, structures Geebs Coaching programs around this evidence base — keeping progressive lifting as the primary stimulus and adding low-impact cardio at a dose that does not compromise recovery or training quality.",
    dateModified: "2026-07-15",
    faqs: [
      {
        question: "What does longevity training research show?",
        answer:
          "Longevity training research consistently shows that combining strength training with aerobic conditioning is better for health-span than either alone. Studies on lean mass preservation, VO2 max, and all-cause mortality point to progressive lifting as the primary stimulus, with cardio added at a recovery-friendly dose. Kris Oddo, NASM-CPT, builds Geebs Coaching programs around this evidence base rather than treating lifting and cardio as a tradeoff.",
      },
    ],
  },
  {
    id: "food-environment-calorie-control",
    eyebrow: "Cravings and food environment drop",
    title: "Cravings, food environment, fasting, and calorie control",
    summary:
      "Cravings and overeating can build from short sleep, low protein, easy food cues, ultra-processed defaults, and a setup that is hard to repeat.",
    coachingMove:
      "Audit the environment before blaming discipline: visible trigger foods, protein gaps, meal spacing, and whether fasting is helping adherence or creating rebound pressure.",
    claimGuardrail:
      "Cravings do not automatically mean a deficiency, and no single diet style wins for everyone. Use the setup you can repeat.",
    questionSlugs: [
      "do-cravings-mean-you-are-deficient",
      "are-ultra-processed-foods-bad-for-fat-loss",
      "is-intermittent-fasting-better-than-calorie-restriction",
    ],
    keywords: [
      "cravings",
      "ultra-processed foods",
      "intermittent fasting",
      "calorie restriction",
      "food environment",
    ],
  },
  {
    id: "creatine-strength-aging",
    eyebrow: "Creatine and strength drop",
    title: "Creatine, lifting, and aging without supplement hype",
    summary:
      "Creatine can support strength and lean mass, but it makes the most sense after progressive lifting, enough protein, sleep, and recovery are in place.",
    coachingMove:
      "Keep the hierarchy boring: progressive lifting first, enough protein second, sleep and recovery third, then creatine if it fits your health context.",
    claimGuardrail:
      "Creatine is not an age-proofing shortcut. If you have kidney disease, take medication, or have medical concerns, ask a clinician before using it.",
    questionSlugs: ["should-men-over-30-take-creatine"],
    keywords: [
      "creatine",
      "strength training",
      "anti-aging",
      "lean mass",
      "supplement studies",
    ],
  },
  {
    id: "cardio-dose-fat-loss",
    eyebrow: "Cardio and fat-loss drop",
    title: "How much cardio, HIIT, and steady work belong in a fat-loss plan",
    summary:
      "Cardio works best when the dose and format fit your lifting, recovery, joints, hunger, and schedule.",
    coachingMove:
      "Start with steps and easy repeatable cardio, then add harder intervals only if lifting performance, hunger, joints, and sleep still hold.",
    claimGuardrail:
      "HIIT, steady cardio, and weekly cardio targets are not universally best. Recovery cost, adherence, nutrition, and your starting point change the fit.",
    questionSlugs: [
      "how-much-cardio-for-fat-loss",
      "is-hiit-better-than-steady-cardio-for-fat-loss",
      "does-cardio-hurt-muscle-growth",
    ],
    keywords: [
      "cardio dose",
      "fat loss",
      "HIIT",
      "steady cardio",
      "lifting recovery",
    ],
  },
  {
    id: "muscle-retention-fat-loss",
    eyebrow: "Fat loss and muscle drop",
    title: "Losing fat without dieting the muscle off",
    summary:
      "Protect protein and resistance training during fat loss, then use a controlled deficit and recoverable cardio to improve the odds of keeping muscle.",
    coachingMove:
      "Protect the protein floor and the lifting signal before chasing a bigger deficit or more cardio.",
    claimGuardrail:
      "Recomposition is not guaranteed. Your starting point, training history, protein, deficit size, and recovery shape what is realistic.",
    questionSlugs: [
      "how-to-lose-fat-without-losing-muscle",
      "does-protein-help-you-stay-full",
      "how-much-protein-for-body-recomposition",
    ],
    keywords: [
      "fat loss",
      "muscle retention",
      "protein",
      "resistance training",
      "body recomposition",
    ],
  },
];

export function scienceDigestEntryById(id: string) {
  return resolveScienceDigestEntries().find((entry) => entry.id === id);
}

export function resolveScienceDigestEntries(): ResolvedScienceDigestEntry[] {
  return scienceDigestEntries.map((entry) => {
    const questions = entry.questionSlugs
      .map((slug) => scienceQuestionPageBySlug(slug))
      .filter((page): page is ScienceQuestionPage => Boolean(page));
    const studiesById = new Map<string, ScienceStudy>();

    for (const question of questions) {
      for (const study of studiesForScienceQuestion(question)) {
        studiesById.set(study.id, study);
      }
    }

    return {
      ...entry,
      questions,
      studies: Array.from(studiesById.values()),
    };
  });
}

import {
  backfilledScienceStudies,
  type ScienceStudy,
  type ScienceTopic,
} from "@/data/scienceLibrary";

export type ScienceLeadMagnet = {
  slug: string;
  topic: ScienceTopic;
  title: string;
  h1: string;
  metaDescription: string;
  eyebrow: string;
  quickAnswer: string;
  dateModified?: string;
  leadMagnetTitle: string;
  leadMagnetCopy: string;
  searchIntent: string[];
  targetQueries: string[];
  proofPoints: string[];
  faqs: { question: string; answer: string }[];
  relatedHrefs: string[];
};

export const scienceLeadMagnets: ScienceLeadMagnet[] = [
  {
    slug: "sleep-and-fat-loss-studies",
    topic: "Sleep",
    title: "Sleep and Fat-Loss Studies | Peer-Reviewed Geebs Science",
    h1: "Sleep and fat-loss studies for people who keep blaming discipline.",
    metaDescription:
      "Peer-reviewed sleep, phone, caffeine, appetite, and fat-loss studies with practical changes you can try and honest study limits.",
    eyebrow: "Sleep science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Poor sleep does not magically erase fat loss, but it can make the plan harder to execute by changing hunger, cravings, training quality, and decision-making. Start with the behaviors the studies make actionable: phone placement, caffeine timing, and a repeatable shutdown routine.",
    leadMagnetTitle: "Get the weekly sleep and recovery science drop",
    leadMagnetCopy:
      "One study, one practical sleep behavior, and one honest limit so you do not overreact to research headlines.",
    searchIntent: [
      "sleep and fat loss studies",
      "does poor sleep cause cravings",
      "phone before bed sleep research",
      "caffeine before bed study",
    ],
    targetQueries: [
      "peer reviewed sleep and fat loss studies",
      "sleep restriction appetite randomized trial",
      "smartphone use in bed sleep study",
    ],
    proofPoints: [
      "Phone-in-bed and evening light studies support changing the sleep environment before buying another recovery product.",
      "Sleep restriction research gives a better explanation for late-night cravings than a generic discipline story.",
      "Caffeine timing evidence is especially useful if you take pre-workout late in the day.",
    ],
    faqs: [
      {
        question: "Can better sleep directly cause fat loss?",
        answer:
          "Not by itself. Better sleep can improve appetite control, training quality, and decision-making, which can make a fat-loss plan easier to follow.",
      },
      {
        question: "What is the first sleep habit Geebs would test?",
        answer:
          "Move the phone away from the bed and set a caffeine cutoff. Those are simple behaviors with enough evidence behind them to test before adding complexity.",
      },
      {
        question: "Are these sleep studies medical advice?",
        answer:
          "No. They cover everyday sleep and recovery habits. Insomnia, sleep apnea, and other sleep disorders need care from a qualified clinician.",
      },
    ],
    relatedHrefs: [
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/blog/how-to-stay-fit-working-long-hours",
      "/resources/bad-week-adjustment-loop",
    ],
  },
  {
    slug: "protein-body-composition-studies",
    topic: "Nutrition",
    title: "Protein and Body-Composition Studies | Geebs Science",
    h1: "Protein and body-composition studies without macro folklore.",
    metaDescription:
      "Peer-reviewed protein, satiety, fat-loss, lean-mass, and body-composition studies translated into practical nutrition choices.",
    eyebrow: "Protein science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Protein is not a magic physique lever, but it is one of the most reliable supports for satiety, lean-mass retention, and training adaptation. Set a protein floor that fits your body and routine, then adjust the rest of the diet around what you can sustain.",
    leadMagnetTitle: "Get the weekly protein and body-composition science drop",
    leadMagnetCopy:
      "A weekly study breakdown on protein, appetite, muscle retention, and practical diet structure.",
    searchIntent: [
      "protein body composition studies",
      "high protein diet fat loss lean mass study",
      "protein satiety peer reviewed",
      "how much protein for recomposition research",
    ],
    targetQueries: [
      "peer reviewed protein body composition studies",
      "protein satiety weight management review",
      "high protein energy deficit lean mass randomized trial",
    ],
    proofPoints: [
      "Protein studies support setting a floor, not pretending macros alone build a physique.",
      "Satiety evidence explains why protein is a compliance tool during fat loss.",
      "Energy-deficit studies show why protein matters most when training and dieting overlap.",
    ],
    faqs: [
      {
        question: "Does protein build muscle without training?",
        answer:
          "No. Protein supports the adaptation; training creates the reason for the body to adapt.",
      },
      {
        question: "Is high protein always better?",
        answer:
          "Not automatically. A useful target depends on body size, diet phase, food preference, training, and what you can sustain.",
      },
      {
        question: "Why does Geebs emphasize protein so often?",
        answer:
          "Because it is practical. Protein helps protect lean mass, improves meal structure, and gives busy people a repeatable first target.",
      },
    ],
    relatedHrefs: [
      "/resources/protein-guide",
      "/tools/macro-calculator",
      "/blog/protein-intake-for-weight-loss-and-muscle-gain",
    ],
  },
  {
    slug: "cardio-longevity-studies",
    topic: "Cardio",
    title: "Cardio and Longevity Studies | Geebs Science",
    h1: "Cardio and longevity studies for lifters who only want to lift.",
    metaDescription:
      "Peer-reviewed cardio, resistance training, cardiorespiratory fitness, and longevity studies translated into practical programming takeaways.",
    eyebrow: "Cardio science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "The research does not say lifters should abandon strength work. It says cardio and resistance training solve different problems. A good program uses cardio for health, capacity, and conditioning while protecting the lifting stimulus.",
    leadMagnetTitle: "Get the weekly cardio and longevity science drop",
    leadMagnetCopy:
      "A weekly study breakdown on conditioning, heart health, longevity, and how to place cardio without wrecking lifting.",
    searchIntent: [
      "cardio longevity studies",
      "cardiorespiratory fitness mortality research",
      "cardio vs weights body composition study",
      "does cardio interfere with muscle growth meta analysis",
    ],
    targetQueries: [
      "peer reviewed cardio longevity studies",
      "aerobic exercise resistance training body composition meta analysis",
      "concurrent training interference meta analysis",
    ],
    proofPoints: [
      "Cardiorespiratory fitness evidence gives cardio a health role beyond calorie burn.",
      "Concurrent-training research helps place cardio so it supports, rather than competes with, lifting.",
      "Comparative studies show why the question is not cardio or weights; it is how each tool is programmed.",
    ],
    faqs: [
      {
        question: "Should I do cardio if my goal is muscle?",
        answer:
          "Usually yes, but the dose and placement matter. The goal is enough cardio for health and capacity without stealing recovery from the main lifts.",
      },
      {
        question: "Is cardio best for fat loss?",
        answer:
          "Cardio can help, but nutrition and strength training still do the heavy lifting for body composition.",
      },
      {
        question: "What kind of cardio does Geebs usually start with?",
        answer:
          "For many busy people, low-impact zone 2 or step targets are easier to recover from than punishment cardio.",
      },
    ],
    relatedHrefs: [
      "/blog/how-much-cardio-for-fat-loss-men",
      "/blog/training-after-35-men",
      "/blog/how-to-lose-fat-without-losing-muscle-men",
    ],
  },
  {
    slug: "muscle-training-studies",
    topic: "Fitness",
    title: "Muscle and Strength Training Studies | Geebs Science",
    h1: "Muscle and strength training studies without program-hopping.",
    metaDescription:
      "Peer-reviewed resistance-training, hypertrophy, strength, volume, frequency, and advanced lifting-method studies translated into practical programming takeaways.",
    eyebrow: "Muscle science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "The research does not reward random exercise novelty. For regular people, the practical levers are enough hard sets, recoverable weekly volume, smart load selection, progression, and a plan that fits the rest of life.",
    leadMagnetTitle: "Get the weekly muscle and strength science drop",
    leadMagnetCopy:
      "A weekly source-backed breakdown of training volume, hypertrophy, strength, recovery, and what to actually change in the gym.",
    searchIntent: [
      "how many sets to build muscle research",
      "resistance training volume hypertrophy meta analysis",
      "advanced lifting techniques study",
      "strength training prescription evidence",
    ],
    targetQueries: [
      "peer reviewed muscle hypertrophy training volume studies",
      "resistance training dose response meta regression",
      "advanced resistance training systems meta analysis",
      "ACSM resistance training prescription hypertrophy",
    ],
    proofPoints: [
      "Training volume matters only when it is recoverable and progressive.",
      "Advanced methods can be useful tools, but they are not a replacement for simple progressive training.",
      "Strength and hypertrophy prescriptions overlap, but load, sets, frequency, and recovery should match the goal.",
    ],
    faqs: [
      {
        question: "How many sets do I need to build muscle?",
        answer:
          "There is no universal number. The useful answer is enough weekly hard sets to progress, but not so much that sleep, joints, soreness, or performance collapse.",
      },
      {
        question: "Are drop sets and supersets better?",
        answer:
          "Not automatically. They can save time or add intensity, but most people should earn them after the basic program is already consistent.",
      },
      {
        question: "What should a regular lifter change first?",
        answer:
          "Track exercises, loads, reps, and weekly set volume before changing everything. If the logbook is not moving, the program needs structure before it needs novelty.",
      },
    ],
    relatedHrefs: [
      "/science/questions/how-many-sets-to-build-muscle",
      "/science/questions/are-advanced-lifting-techniques-worth-it",
      "/science/questions/does-cardio-hurt-muscle-growth",
      "/methodology",
    ],
  },
  {
    slug: "anti-aging-fitness-studies",
    topic: "Anti-aging",
    title: "Anti-Aging Fitness Studies | Geebs Science",
    h1: "Anti-aging fitness studies without biohacking theater.",
    metaDescription:
      "Peer-reviewed anti-aging, healthy-aging, muscle-strengthening, aerobic fitness, and longevity studies translated into practical training actions.",
    eyebrow: "Anti-aging science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Recent studies on longevity, aging, and fitness consistently point to the same practical levers: strength training, aerobic conditioning, protein intake, and sleep quality. The research does not support exotic biohacks — it supports building and keeping muscle and maintaining cardio capacity over time. That is why Geebs programs prioritize muscle and conditioning over shortcuts.",
    leadMagnetTitle: "Get the weekly anti-aging fitness science drop",
    leadMagnetCopy:
      "A weekly study translated into one boring-but-powerful longevity action you can train around.",
    searchIntent: [
      "anti aging fitness studies",
      "strength training longevity research",
      "muscle strengthening mortality meta analysis",
      "healthy aging exercise studies",
    ],
    targetQueries: [
      "peer reviewed anti aging fitness studies",
      "muscle strengthening mortality systematic review",
      "exercise biological age study",
    ],
    proofPoints: [
      "Muscle-strengthening research supports treating lifting as adult health work.",
      "Cardio and fitness-span studies connect conditioning to health, not just aesthetics.",
      "Sleep and protein research make anti-aging practical instead of supplement-first.",
    ],
    faqs: [
      {
        question:
          "What do recent studies on longevity, aging, and fitness exercise science show?",
        answer:
          "Strength training and aerobic conditioning are consistently among the highest-return practical habits for healthy aging. The research supports building and keeping muscle, maintaining cardio capacity, eating enough protein, and sleeping reliably — not chasing exotic biohacks.",
      },
      {
        question: "Does exercise reverse aging?",
        answer:
          "No. Training, cardio capacity, sleep, and nutrition can support healthier aging markers and better function, but they do not reverse aging.",
      },
      {
        question: "What is the first anti-aging fitness habit?",
        answer:
          "Build and keep muscle. Strength training is the simplest high-leverage place to start.",
      },
      {
        question: "Is this medical advice?",
        answer:
          "No. It covers fitness habits, not treatment or diagnosis.",
      },
    ],
    relatedHrefs: [
      "/methodology",
      "/blog/how-to-build-muscle-in-your-30s",
      "/blog/training-after-35-men",
    ],
  },
  {
    slug: "cravings-appetite-studies",
    topic: "Cravings",
    title: "Cravings and Appetite Studies | Geebs Science",
    h1: "Cravings and appetite studies for people tired of willpower advice.",
    metaDescription:
      "Peer-reviewed cravings, appetite, sleep restriction, snack intake, protein, and food environment studies translated into practical changes.",
    eyebrow: "Cravings science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Cravings are not always a character flaw. Sleep, protein, food cues, and defaults can change the odds of overeating. Check the pattern and change the next default instead of assuming a craving proves a deficiency.",
    leadMagnetTitle: "Get the weekly cravings and appetite science drop",
    leadMagnetCopy:
      "A weekly study breakdown on appetite, cravings, sleep, protein, and food environment without fake deficiency claims.",
    searchIntent: [
      "cravings appetite studies",
      "sleep restriction snack intake study",
      "protein satiety cravings research",
      "why do I crave sugar at night studies",
    ],
    targetQueries: [
      "peer reviewed cravings appetite studies",
      "sleep curtailment snack intake study",
      "protein satiety weight management review",
    ],
    proofPoints: [
      "Sleep studies explain why cravings often spike after short sleep.",
      "Protein and satiety research gives a practical first nutrition target.",
      "Changing food defaults avoids unsupported ideas like every craving meaning a deficiency.",
    ],
    faqs: [
      {
        question: "Do cravings mean I am deficient in something?",
        answer:
          "Not necessarily. A single deficiency explanation is usually too simple. Start by checking sleep, protein, meal timing, stress, and the food environment.",
      },
      {
        question: "What is the first craving fix Geebs would test?",
        answer:
          "Protect protein earlier in the day and change the late-night food default before relying on willpower.",
      },
      {
        question: "Can sleep affect cravings?",
        answer:
          "Yes. Studies connect sleep restriction with changes in appetite and snack intake. If cravings become predictable, check whether short or inconsistent sleep is part of the pattern.",
      },
    ],
    relatedHrefs: [
      "/blog/how-to-stay-consistent-with-diet-on-weekends",
      "/resources/diet-soda-cutting",
      "/blog/weight-loss-for-men-who-hate-dieting",
    ],
  },
  {
    slug: "peptides-body-composition-studies",
    topic: "Peptides",
    title: "Peptides, GLP-1, and Body-Composition Studies | Geebs Science",
    h1: "Peptides and body-composition studies without miracle claims.",
    metaDescription:
      "Peer-reviewed GLP-1, semaglutide, tirzepatide, collagen peptide, lean-mass, fat-loss, and recovery studies translated into practical training and nutrition takeaways.",
    eyebrow: "Peptides science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Peptides are not one thing. GLP-1 medications belong under clinician-led care; collagen peptides sit closer to recovery and connective-tissue support. In either case, protect strength training, protein, recovery, and long-term habits instead of treating a peptide as the whole plan.",
    leadMagnetTitle: "Get the weekly peptides and body-composition science drop",
    leadMagnetCopy:
      "A weekly source-backed breakdown of GLP-1s, collagen peptides, lean mass, recovery, and where the evidence stops.",
    searchIntent: [
      "GLP-1 lean mass studies",
      "semaglutide muscle loss research",
      "tirzepatide body composition study",
      "collagen peptides muscle recovery study",
    ],
    targetQueries: [
      "peer reviewed GLP-1 lean mass studies",
      "semaglutide lean mass systematic review",
      "tirzepatide body composition SURMOUNT-1",
      "collagen peptides muscle damage fatigue review",
    ],
    proofPoints: [
      "GLP-1 body-composition studies make strength training and protein more important, not optional.",
      "Lean-mass data should lead to clear training and nutrition priorities instead of fear-based medication takes.",
      "Collagen peptide evidence fits recovery and connective-tissue questions better than muscle-growth promises.",
    ],
    faqs: [
      {
        question: "Does Geebs give peptide or GLP-1 medical advice?",
        answer:
          "No. Medication decisions, dosing, contraindications, and side effects belong with qualified clinicians. Geebs focuses on the training, protein, and habits that support body composition.",
      },
      {
        question: "Should someone lift while taking a GLP-1?",
        answer:
          "That is usually the practical fitness question. If appetite and body weight are dropping, resistance training, protein, and strength tracking help protect function and body composition.",
      },
      {
        question: "Do collagen peptides build muscle like whey protein?",
        answer:
          "No. Collagen peptides are not a complete replacement for total protein and resistance training. Their evidence fits recovery and connective-tissue questions better than muscle growth.",
      },
    ],
    relatedHrefs: [
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/science/questions/should-you-lift-while-on-glp-1",
      "/science/questions/do-collagen-peptides-build-muscle",
      "/resources/protein-guide",
    ],
  },
  {
    slug: "glp-1-muscle-preservation-studies",
    topic: "Peptides",
    title: "GLP-1 Muscle Preservation Studies | Geebs Science",
    h1: "GLP-1 muscle preservation studies without panic headlines.",
    metaDescription:
      "Peer-reviewed GLP-1, semaglutide, tirzepatide, lean-mass, protein, resistance-training, and body-composition studies translated into practical muscle-protection steps.",
    eyebrow: "GLP-1 muscle science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "GLP-1 medications can change appetite and body weight fast, so protecting function matters: resistance training, enough protein, strength tracking, and clinician-led medication care. The goal is not fear. The goal is not treating the medication as the whole plan.",
    leadMagnetTitle: "Get the weekly GLP-1 muscle-preservation science drop",
    leadMagnetCopy:
      "A weekly source-backed breakdown of GLP-1 body-composition research, protein, lifting, and where the evidence stops.",
    searchIntent: [
      "GLP-1 muscle preservation studies",
      "semaglutide protein resistance training lean mass",
      "tirzepatide muscle loss research",
      "how to preserve muscle on GLP-1",
    ],
    targetQueries: [
      "peer reviewed GLP-1 muscle preservation studies",
      "GLP-1 nutrition support protein lean mass",
      "resistance exercise protein semaglutide tirzepatide trial",
      "GLP-1 body composition muscle function study",
    ],
    proofPoints: [
      "Recent GLP-1 reviews and advisories make nutrition support a practical issue, not a vanity issue.",
      "Trial protocols are now directly testing resistance exercise and protein during semaglutide and tirzepatide therapy.",
      "Track strength, protein, and function while qualified clinicians manage medication decisions.",
    ],
    faqs: [
      {
        question: "Does Geebs tell people how to use GLP-1s?",
        answer:
          "No. Medication decisions, dosing, side effects, and contraindications belong with qualified clinicians. Geebs focuses on the training and nutrition steps that support body composition.",
      },
      {
        question: "What should a regular person protect while losing weight on a GLP-1?",
        answer:
          "Strength training, protein intake, recovery, hydration, and function. The scale is not the only signal that matters.",
      },
      {
        question: "Is muscle loss guaranteed on a GLP-1?",
        answer:
          "No. Lean-mass change needs nuance. The practical response is not panic; it is a structured plan that protects muscle and tracks performance.",
      },
    ],
    relatedHrefs: [
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/science/questions/do-glp-1s-cause-muscle-loss",
      "/science/questions/should-you-lift-while-on-glp-1",
      "/resources/protein-guide",
    ],
  },
  {
    slug: "sleep-performance-studies",
    topic: "Sleep",
    title: "Sleep and Workout Performance Studies | Geebs Science",
    h1: "Sleep and workout performance studies for people training on real-life recovery.",
    metaDescription:
      "Peer-reviewed sleep restriction, caffeine, exercise performance, recovery, and perceived-exertion studies translated into practical training decisions.",
    eyebrow: "Sleep performance science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Bad sleep does not mean you should quit training, but it can change how hard the same workout feels. Use sleep as recovery data: adjust load, volume, caffeine timing, and expectations instead of pretending every session happens in a perfect week.",
    leadMagnetTitle: "Get the weekly sleep and performance science drop",
    leadMagnetCopy:
      "One sleep/performance study, one practical training adjustment, and one honest study limit each week.",
    searchIntent: [
      "does sleep loss hurt workout performance",
      "sleep deprivation exercise performance meta analysis",
      "caffeine after poor sleep workout study",
      "bad sleep training recovery research",
    ],
    targetQueries: [
      "peer reviewed sleep workout performance studies",
      "sleep deprivation perceived exertion meta analysis",
      "caffeine sleep restriction high intensity exercise study",
    ],
    proofPoints: [
      "Sleep-deprivation performance research supports adjusting training expectations when recovery is poor.",
      "Caffeine may rescue some performance acutely, but it is not a recovery plan.",
      "Perceived exertion can be treated as useful feedback, not weakness.",
    ],
    faqs: [
      {
        question: "Should I train after a bad night of sleep?",
        answer:
          "Often yes, but the session may need a lower volume, simpler exercise selection, or more realistic performance targets.",
      },
      {
        question: "Can caffeine fix bad sleep?",
        answer:
          "It can help some people perform acutely, but it does not replace sleep or fix chronic recovery debt.",
      },
      {
        question: "What should I change first?",
        answer:
          "Keep the habit alive, then adjust the session: fewer hard sets, lower RPE, or a walk instead of forcing a max-effort day.",
      },
    ],
    relatedHrefs: [
      "/science/questions/does-sleep-loss-hurt-workout-performance",
      "/science/questions/can-caffeine-save-a-bad-night-of-sleep",
      "/blog/sleep-and-fat-loss-for-busy-professionals",
      "/resources/bad-week-adjustment-loop",
    ],
  },
  {
    slug: "creatine-aging-studies",
    topic: "Anti-aging",
    title: "Creatine and Aging Studies | Geebs Science",
    h1: "Creatine and aging studies without supplement miracle claims.",
    metaDescription:
      "Peer-reviewed creatine, resistance training, cognition, older-adult, strength, and healthy-aging studies translated into practical takeaways.",
    eyebrow: "Creatine aging science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Creatine is useful because it is boring: it can support training and may have aging-related evidence worth watching, but it does not replace lifting, protein, sleep, or medical context. Treat it as support for the plan, not the plan.",
    leadMagnetTitle: "Get the weekly creatine and aging science drop",
    leadMagnetCopy:
      "A weekly study breakdown on creatine, strength, cognition, aging, and what regular people should actually do with it.",
    searchIntent: [
      "creatine aging studies",
      "creatine cognition older adults systematic review",
      "creatine exercise older adults meta analysis",
      "does creatine help aging adults",
    ],
    targetQueries: [
      "peer reviewed creatine aging studies",
      "creatine cognition aging systematic review",
      "creatine exercise older adults meta analysis",
    ],
    proofPoints: [
      "Recent reviews connect creatine with aging, exercise, and cognition questions, but the practical base still starts with training.",
      "Creatine can support training, but it is not an anti-aging shortcut.",
      "Supplement decisions still need health-history context, especially for people with complex medical histories.",
    ],
    faqs: [
      {
        question: "Does creatine reverse aging?",
        answer:
          "No. Creatine may support training and some aging-related outcomes when the basics are already in place, but it does not reverse aging.",
      },
      {
        question: "Does creatine work without lifting?",
        answer:
          "It may affect some outcomes, but for body composition and strength the training stimulus is still the main event.",
      },
      {
        question: "Is creatine medical advice?",
        answer:
          "No. People with kidney disease, medications, pregnancy, or clinical concerns should ask a qualified clinician.",
      },
    ],
    relatedHrefs: [
      "/science/questions/does-creatine-help-aging-adults",
      "/science/questions/does-creatine-help-brain-aging",
      "/science/questions/do-creatine-and-lifting-change-body-composition",
      "/blog/creatine-for-men-over-30",
      "/science/creatine-and-hair-loss",
    ],
  },
  {
    slug: "satiety-food-environment-studies",
    topic: "Nutrition",
    title: "Satiety and Food Environment Studies | Geebs Science",
    h1: "Satiety and food environment studies without clean-eating moralizing.",
    metaDescription:
      "Peer-reviewed satiety, fiber, eating-rate, ultra-processed-food, appetite, and calorie-intake studies translated into practical fat-loss defaults.",
    eyebrow: "Satiety science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Fat loss gets easier when meals create fullness before calories run away. The practical moves are not purity rules: add protein and fiber, slow down easy-to-overeat foods, and design the environment so default meals do more of the work.",
    leadMagnetTitle: "Get the weekly satiety and food-environment science drop",
    leadMagnetCopy:
      "One study on fullness, eating speed, food texture, or calorie control translated into one usable nutrition move.",
    searchIntent: [
      "satiety food environment studies",
      "fiber satiety systematic review",
      "eating speed ultra processed food energy intake",
      "does eating speed matter for fat loss",
    ],
    targetQueries: [
      "peer reviewed satiety fiber food environment studies",
      "cereal fiber satiety systematic review",
      "ultra processed eating rate randomized crossover trial",
      "food texture eating speed energy intake study",
    ],
    proofPoints: [
      "Fiber and satiety research gives a practical add-first lever for fat loss.",
      "Eating-rate research explains why some foods make calorie control harder without needing moral language.",
      "Food-environment changes are often easier to keep than stricter willpower rules.",
    ],
    faqs: [
      {
        question: "Do I have to eat clean to lose fat?",
        answer:
          "No. The useful question is which meals help you feel full and which foods repeatedly make calories hard to control.",
      },
      {
        question: "Does eating slower matter?",
        answer:
          "It can. Slower, higher-chew meals can give fullness signals more time to catch up and make portions easier to notice.",
      },
      {
        question: "What is the first food-environment fix?",
        answer:
          "Build default meals around protein, fiber, and portion clarity before relying on late-night willpower.",
      },
    ],
    relatedHrefs: [
      "/science/questions/does-fiber-help-with-satiety",
      "/science/questions/does-eating-speed-matter-for-fat-loss",
      "/science/questions/do-ultra-processed-foods-make-fat-loss-harder",
      "/science/cravings-appetite-studies",
    ],
  },
  {
    slug: "diet-muscle-retention-studies",
    topic: "Fitness",
    title: "Preserve Lean Mass During Weight Loss: Study Library",
    h1: "Diet and muscle-retention studies for people who want fat loss without getting weaker.",
    metaDescription:
      "Peer-reviewed resistance-training, protein, diet-phase, fat-free-mass, strength, and body-composition studies translated into practical fat-loss steps.",
    eyebrow: "Muscle retention science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "During fat loss, the scale is not the only outcome. Resistance training, enough protein, and strength tracking help protect the tissue and performance you actually want to keep while body weight comes down.",
    leadMagnetTitle: "Get the weekly diet and muscle-retention science drop",
    leadMagnetCopy:
      "One study on dieting, lifting, protein, or lean-mass retention plus one practical action you can use.",
    searchIntent: [
      "how to avoid losing muscle while dieting studies",
      "resistance training during weight loss meta analysis",
      "diet fat free mass strength research",
      "protein source muscle retention study",
    ],
    targetQueries: [
      "peer reviewed diet muscle retention studies",
      "resistance exercise dietary weight loss fat free mass meta analysis",
      "plant versus animal protein muscle mass randomized trial meta analysis",
      "how to lose fat without losing strength research",
    ],
    proofPoints: [
      "Diet plus resistance exercise can protect fat-free mass and strength better than diet-only weight loss.",
      "Protein source and quality matter most when the plan is already under pressure from dieting and training.",
      "Strength tracking gives regular people a practical signal the scale cannot provide.",
    ],
    faqs: [
      {
        question: "Can I lose fat without losing muscle?",
        answer:
          "You can reduce the risk. The practical plan is resistance training, sufficient protein, sleep, and avoiding crash-diet behavior that makes training collapse.",
      },
      {
        question: "Should I lift while dieting?",
        answer:
          "Yes for most people. Lifting gives the body a reason to keep muscle and gives you useful feedback through performance.",
      },
      {
        question: "Is protein source the main thing?",
        answer:
          "No. Total intake, training, calories, and adherence come first. Source quality matters when it helps you hit the target without underfeeding muscle.",
      },
    ],
    relatedHrefs: [
      "/science/questions/how-do-you-avoid-losing-muscle-while-dieting",
      "/science/questions/does-lifting-help-during-weight-loss",
      "/science/questions/is-plant-protein-as-good-as-animal-protein-for-muscle",
      "/science/protein-body-composition-studies",
    ],
  },
  {
    slug: "glp-1-nutrition-risks-studies",
    topic: "Peptides",
    title: "GLP-1 Nutrition and Muscle-Risk Studies | Geebs Science",
    h1: "GLP-1 nutrition and muscle-risk studies without medication advice.",
    metaDescription:
      "Peer-reviewed GLP-1, incretin, lean-mass, micronutrient, protein, appetite, and body-composition research translated into practical training and nutrition priorities.",
    eyebrow: "GLP-1 nutrition science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "When appetite drops hard, the problem is simple but important: do not let the plan become low-protein, low-fluid, low-micronutrient weight loss. Clinicians handle medication; your fitness plan should protect meals, lifting, hydration, and strength.",
    leadMagnetTitle: "Get the weekly GLP-1 nutrition-risk science drop",
    leadMagnetCopy:
      "A weekly source-backed note on GLP-1 body composition, protein, micronutrients, and honest study limits.",
    searchIntent: [
      "GLP-1 nutrient deficiency studies",
      "semaglutide micronutrient deficiency review",
      "GLP-1 protein intake lean mass research",
      "nutrition support while using GLP-1 medication",
    ],
    targetQueries: [
      "peer reviewed GLP-1 nutrition deficiency studies",
      "GLP-1 receptor agonist micronutrient deficiency review",
      "incretin therapy lean mass body composition systematic review",
      "semaglutide tirzepatide protein lean mass nutrition support",
    ],
    proofPoints: [
      "Recent GLP-1 nutrition reviews make low appetite a nutrition-planning issue, not a reason to ignore food quality.",
      "Body-composition reviews support tracking strength, function, protein, and lean-mass risk while weight changes quickly.",
      "Medication decisions stay with clinicians; your fitness plan should focus on meals, lifting, hydration, and keeping strength.",
    ],
    faqs: [
      {
        question: "Does Geebs prescribe GLP-1 nutrition or supplements?",
        answer:
          "No. Lab testing, deficiency diagnosis, supplementation, dosing, and medication decisions belong with qualified clinicians.",
      },
      {
        question: "What should someone protect when appetite is low?",
        answer:
          "Protein, fluids, fiber, micronutrient-dense foods, and enough training energy to keep strength from free-falling.",
      },
      {
        question: "Is this saying GLP-1s are bad?",
        answer:
          "No. GLP-1 medications can be useful under clinician-managed care. Training, protein, hydration, and nutrient-dense meals still matter while appetite and weight change.",
      },
    ],
    relatedHrefs: [
      "/science/questions/do-glp-1s-cause-nutrient-deficiencies",
      "/science/questions/should-you-use-protein-and-lifting-on-glp-1",
      "/science/questions/should-you-track-strength-while-losing-weight",
      "/science/glp-1-muscle-preservation-studies",
    ],
  },
  {
    slug: "omega-3-fish-oil-studies",
    topic: "Supplements",
    title: "Omega-3 and Fish-Oil Studies | Geebs Science",
    h1: "Omega-3 and fish-oil studies without supplement hype.",
    metaDescription:
      "Peer-reviewed omega-3, fish-oil, EPA, DHA, workout-recovery, strength, and protein-synthesis studies translated into practical takeaways and honest limits.",
    eyebrow: "Omega-3 science email",
    dateModified: "2026-07-21",
    quickAnswer:
      "Omega-3 is not a shortcut for training, protein, or sleep. The useful research is more specific: some studies report modest recovery and exercise benefits, one pooled analysis found no increase in muscle protein synthesis, and the results depend on the population, product, amount, and study length. Use the source details to understand what was tested, not as a personal supplement prescription.",
    leadMagnetTitle: "Get the weekly supplement science drop",
    leadMagnetCopy:
      "One source-backed supplement finding, one practical takeaway, and one honest limit — without miracle claims.",
    searchIntent: [
      "omega-3 workout recovery studies",
      "fish oil muscle growth research",
      "EPA DHA exercise meta analysis",
      "omega-3 resistance training study",
    ],
    targetQueries: [
      "does omega-3 help workout recovery",
      "does fish oil build muscle",
      "what omega-3 dose did exercise studies test",
      "peer reviewed EPA DHA training studies",
    ],
    proofPoints: [
      "The recovery evidence includes a meta-analysis of 41 randomized controlled trials, not just a single before-and-after story.",
      "The protein-synthesis review found no clear increase in muscle protein synthesis. A limited whole-body signal is not proof of muscle gain.",
      "The exercise meta-analysis reported a mixed result: modest changes in some outcomes, no extra change in body weight or lean mass, and a small LDL increase.",
    ],
    faqs: [
      {
        question: "Does fish oil replace protein or training?",
        answer:
          "No. Resistance training creates the adaptation signal and enough protein supports it. Omega-3 research sits around that foundation; it does not replace it.",
      },
      {
        question: "Is an amount used in a study a personal omega-3 recommendation?",
        answer:
          "No. They report what the studies tested. Product choice and personal dosing should account for health history, medications, diet, and qualified medical guidance. If you take warfarin or another anticoagulant, ask a clinician or pharmacist about interactions first.",
      },
      {
        question: "Why list EPA and DHA instead of total fish-oil milligrams?",
        answer:
          "Because EPA and DHA are the amounts the studies report. The large number on the front of a fish-oil bottle may not equal the combined EPA and DHA amount on the supplement facts panel.",
      },
    ],
    relatedHrefs: [
      "/science/questions/does-omega-3-help-workout-recovery",
      "/science/questions/does-fish-oil-build-muscle",
      "/science/questions/what-omega-3-dose-did-exercise-studies-test",
      "/methodology",
    ],
  },
];

export function scienceLeadMagnetBySlug(slug: string) {
  return scienceLeadMagnets.find((page) => page.slug === slug);
}

export function studiesForScienceLeadMagnet(page: ScienceLeadMagnet): ScienceStudy[] {
  const topicStudies = backfilledScienceStudies.filter(
    (study) => study.topic === page.topic,
  );

  const studiesMatching = (keywords: string[]) =>
    backfilledScienceStudies.filter((study) => {
      const haystack = [
        study.id,
        study.title,
        study.shortTitle,
        study.coachTakeaway,
        ...study.keywords,
        ...study.relatedHrefs,
      ]
        .join(" ")
        .toLowerCase();

      return keywords.some((keyword) => haystack.includes(keyword));
    });

  const studiesByIds = (studyIds: string[]) => {
    const idSet = new Set(studyIds);
    return backfilledScienceStudies.filter((study) => idSet.has(study.id));
  };

  if (page.slug === "glp-1-muscle-preservation-studies") {
    return studiesMatching([
      "glp-1",
      "semaglutide",
      "tirzepatide",
      "lean mass",
      "fat-free mass",
    ]);
  }

  if (page.slug === "sleep-performance-studies") {
    return studiesMatching([
      "sleep restriction",
      "sleep deprivation",
      "performance",
      "perceived exertion",
      "caffeine",
    ]);
  }

  if (page.slug === "creatine-aging-studies") {
    return studiesMatching(["creatine"]);
  }

  if (page.slug === "satiety-food-environment-studies") {
    return studiesMatching([
      "satiety",
      "fiber",
      "eating rate",
      "ultra-processed",
      "energy intake",
    ]);
  }

  if (page.slug === "diet-muscle-retention-studies") {
    return studiesByIds([
      "resistance-exercise-diet-weight-loss-meta-2025",
      "plant-animal-protein-muscle-meta-2025",
      "protein-resistance-training-meta-2022",
      "higher-protein-deficit-intense-exercise",
      "concurrent-resistance-aerobic-fat-loss-meta-2025",
    ]);
  }

  if (page.slug === "glp-1-nutrition-risks-studies") {
    return studiesByIds([
      "glp1-nutritional-deficiency-review-2026",
      "incretin-lean-mass-lifestyle-meta-2026",
      "glp1-body-composition-network-meta-2026",
      "incretin-nonpharm-body-composition-review-2026",
      "glp1-body-composition-network-meta-2025",
      "glp1-nutrition-priorities-advisory-2025",
    ]);
  }

  if (page.topic === "Cravings") {
    return [
      ...topicStudies,
      ...backfilledScienceStudies.filter((study) =>
        study.keywords.some((keyword) =>
          ["sleep", "protein", "satiety", "appetite"].includes(keyword),
        ),
      ),
    ].filter(
      (study, index, studies) =>
        studies.findIndex((candidate) => candidate.id === study.id) === index,
    );
  }

  return topicStudies;
}

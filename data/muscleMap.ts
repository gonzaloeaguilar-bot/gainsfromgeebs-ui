/**
 * Kris's muscle map — what he recommends for each muscle, and what to read.
 *
 * Every exercise, prescription and cue below is taken from a PUBLISHED Geebs
 * post (never a draft), and `source` names that post's slug so the claim can be
 * checked. Nothing here is invented: if a muscle has thin coverage on the blog,
 * it has a short list here. tests/muscleMap.test.ts fails the build if a slug
 * stops resolving to a published post or a cue stops appearing in its source.
 *
 * The body is a Blender render of BodyParts3D (CC BY-SA 2.1 JP, Database Center
 * for Life Science) and Z-Anatomy (CC BY-SA 4.0, Gauthier Kervyn) meshes. The
 * render script lives in .ai/muscle-map-render/; data/muscleMapIds.json is its
 * output (ID colour per muscle group, pixels per side).
 */

export type MuscleId =
  | "chest"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "abs"
  | "quads"
  | "calves"
  | "traps"
  | "back"
  | "lower-back"
  | "glutes"
  | "hamstrings";

export type OrganId = "brain" | "heart" | "liver" | "stomach" | "belly";

export type Exercise = {
  name: string;
  /** Sets and reps exactly as the source post prescribes, when it does. */
  prescription?: string;
  /** Published blog slug the exercise is recommended in. */
  source: string;
};

export type Reel = { id: string; title: string; url: string };

export type BodyPart<Id extends string> = {
  id: Id;
  name: string;
  /** Plain-language name of what it is, for people who do not know anatomy. */
  plain: string;
  /** A line from the source post, verbatim. */
  cue: { text: string; source: string };
  exercises: Exercise[];
  reels?: Reel[];
  /** Published blog slugs, strongest first. */
  articles: string[];
};

export const muscles: BodyPart<MuscleId>[] = [
  {
    id: "chest",
    name: "Chest",
    plain: "Pecs",
    cue: {
      text: "Build every session around multi-joint movements",
      source: "how-to-fix-skinny-fat",
    },
    exercises: [
      { name: "Dumbbell flat bench press", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Incline dumbbell bench press", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Dips", source: "how-to-fix-skinny-fat" },
      { name: "Push-ups", source: "how-to-build-muscle-at-home" },
    ],
    reels: [
      { id: "DQowX28jr1i", title: "Fix your pec deck setup", url: "https://www.instagram.com/reel/DQowX28jr1i/" },
      { id: "DPwm0MzDsNt", title: "A chest workout you can start", url: "https://www.instagram.com/reel/DPwm0MzDsNt/" },
    ],
    articles: ["how-to-fix-skinny-fat", "how-to-build-muscle-at-home", "progressive-overload-explained"],
  },
  {
    id: "shoulders",
    name: "Shoulders",
    plain: "Delts, front and back",
    cue: {
      text: "do not skip the overhead press because it feels awkward",
      source: "strength-training-for-desk-workers",
    },
    exercises: [
      { name: "Overhead dumbbell press", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Dumbbell lateral raises", prescription: "3 sets of 12–15", source: "how-to-fix-skinny-fat" },
      { name: "Cable face pulls", prescription: "3 sets of 12–15", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["strength-training-for-desk-workers", "how-to-fix-skinny-fat", "3-day-workout-plan-for-busy-men"],
  },
  {
    id: "biceps",
    name: "Biceps",
    plain: "Front of the upper arm",
    cue: {
      text: "only sixty to ninety seconds on isolation exercises",
      source: "3-day-workout-plan-for-busy-men",
    },
    exercises: [
      { name: "Biceps work on upper-body day", source: "how-to-fix-skinny-fat" },
      { name: "Lat pulldown or pull-ups", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Chest-supported row", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["3-day-workout-plan-for-busy-men", "how-to-fix-skinny-fat", "how-to-build-muscle-for-skinny-guys"],
  },
  {
    id: "triceps",
    name: "Triceps",
    plain: "Back of the upper arm",
    cue: {
      text: "only sixty to ninety seconds on isolation exercises",
      source: "3-day-workout-plan-for-busy-men",
    },
    exercises: [
      { name: "Dips", source: "how-to-fix-skinny-fat" },
      { name: "Triceps work on upper-body day", source: "how-to-fix-skinny-fat" },
      { name: "Overhead dumbbell press", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Dumbbell flat bench press", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["how-to-fix-skinny-fat", "3-day-workout-plan-for-busy-men", "how-to-build-muscle-at-home"],
  },
  {
    id: "forearms",
    name: "Forearms and grip",
    plain: "Lower arm and hands",
    cue: {
      text: "If you only have one day, train squat or hinge, press, pull, and carry.",
      source: "3-day-workout-plan-for-busy-men",
    },
    exercises: [
      { name: "Loaded carries", source: "strength-training-for-desk-workers" },
      { name: "Lat pulldown or pull-ups", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Romanian deadlift", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["3-day-workout-plan-for-busy-men", "strength-training-for-desk-workers"],
  },
  {
    id: "abs",
    name: "Abs and obliques",
    plain: "Your core, front and sides",
    cue: {
      text: "anti-flexion trunk work (dead bugs, rollouts, loaded carries)",
      source: "strength-training-for-desk-workers",
    },
    exercises: [
      { name: "Planks", prescription: "3 sets of 45s", source: "how-to-fix-skinny-fat" },
      { name: "Hanging leg raises", prescription: "3 sets of 10–12", source: "how-to-fix-skinny-fat" },
      { name: "Abdominal rollout", source: "how-to-fix-skinny-fat" },
      { name: "Dead bugs", source: "strength-training-for-desk-workers" },
    ],
    articles: ["strength-training-for-desk-workers", "how-to-lose-belly-fat-men-30s", "workout-plan-for-busy-executives"],
  },
  {
    id: "quads",
    name: "Quads",
    plain: "Front of the thigh",
    cue: {
      text: "Split squats and Bulgarian split squats to open the anterior hip capsule and train hip stabilizers under load.",
      source: "what-eight-hours-of-sitting-actually-does-to-your-body",
    },
    exercises: [
      { name: "Goblet squat", prescription: "3 sets of 6–8", source: "how-to-fix-skinny-fat" },
      { name: "Bulgarian split squat", prescription: "3 sets of 10–12 per leg", source: "how-to-fix-skinny-fat" },
      { name: "Leg press or hack squat", prescription: "3 sets of 10–12", source: "how-to-fix-skinny-fat" },
      { name: "Walking lunges", source: "how-to-fix-skinny-fat" },
      { name: "Step-ups", source: "strength-training-for-desk-workers" },
    ],
    articles: ["3-day-workout-plan-for-busy-men", "how-to-fix-skinny-fat", "strength-training-for-women-beginners"],
  },
  {
    id: "calves",
    name: "Calves",
    plain: "Back of the lower leg",
    cue: {
      text: "Add weight only when you can hit the top end of the target rep range",
      source: "how-to-fix-skinny-fat",
    },
    exercises: [{ name: "Calf raises", source: "how-to-fix-skinny-fat" }],
    articles: ["how-to-fix-skinny-fat", "progressive-overload-explained"],
  },
  {
    id: "traps",
    name: "Traps",
    plain: "Between the neck and shoulders",
    cue: {
      text: "Chest-supported rows and face pulls to counteract forward-shoulder rounding.",
      source: "what-eight-hours-of-sitting-actually-does-to-your-body",
    },
    exercises: [
      { name: "Cable face pulls", prescription: "3 sets of 12–15", source: "how-to-fix-skinny-fat" },
      { name: "Chest-supported row", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Loaded carries", source: "strength-training-for-desk-workers" },
    ],
    articles: ["what-eight-hours-of-sitting-actually-does-to-your-body", "strength-training-for-desk-workers"],
  },
  {
    id: "back",
    name: "Upper back and lats",
    plain: "The wide muscles behind the arms",
    cue: {
      text: "Pull-ups require scapular depression and retraction through a full range",
      source: "strength-training-for-desk-workers",
    },
    exercises: [
      { name: "Chest-supported row", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Lat pulldown or pull-ups", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Cable seated row", prescription: "3 sets of 10–12", source: "how-to-fix-skinny-fat" },
      { name: "Barbell row", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["strength-training-for-desk-workers", "how-to-build-muscle-at-home", "how-to-fix-skinny-fat"],
  },
  {
    id: "lower-back",
    name: "Lower back",
    plain: "Spinal erectors",
    cue: {
      text: "focus on opening your hips and engaging your posterior chain",
      source: "what-eight-hours-of-sitting-actually-does-to-your-body",
    },
    exercises: [
      { name: "Romanian deadlift", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Romanian deadlift or trap bar deadlift", prescription: "3 sets of 6–8", source: "how-to-fix-skinny-fat" },
      { name: "Bodyweight glute bridges", source: "what-eight-hours-of-sitting-actually-does-to-your-body" },
      { name: "Standing hip extensions", source: "what-eight-hours-of-sitting-actually-does-to-your-body" },
    ],
    articles: ["what-eight-hours-of-sitting-actually-does-to-your-body", "strength-training-for-desk-workers", "standing-desk-vs-walking-pad"],
  },
  {
    id: "glutes",
    name: "Glutes",
    plain: "Your backside",
    cue: {
      text: "Romanian deadlifts and barbell hip thrusts to restore full glute and hamstring power.",
      source: "what-eight-hours-of-sitting-actually-does-to-your-body",
    },
    exercises: [
      { name: "Hip thrusts", source: "strength-training-for-desk-workers" },
      { name: "Glute bridges", source: "strength-training-for-desk-workers" },
      { name: "Romanian deadlift", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Bulgarian split squat", prescription: "3 sets of 10–12 per leg", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["strength-training-for-desk-workers", "what-eight-hours-of-sitting-actually-does-to-your-body"],
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    plain: "Back of the thigh",
    cue: {
      text: "Romanian deadlifts and barbell hip thrusts to restore full glute and hamstring power.",
      source: "what-eight-hours-of-sitting-actually-does-to-your-body",
    },
    exercises: [
      { name: "Romanian deadlift", prescription: "3 sets of 8–10", source: "how-to-fix-skinny-fat" },
      { name: "Trap bar deadlift", prescription: "3 sets of 6–8", source: "how-to-fix-skinny-fat" },
      { name: "Hamstring curl", source: "how-to-fix-skinny-fat" },
    ],
    articles: ["3-day-workout-plan-for-busy-men", "how-to-fix-skinny-fat", "workout-plan-for-software-engineers"],
  },
];

export const organs: BodyPart<OrganId>[] = [
  {
    id: "brain",
    name: "Brain and sleep",
    plain: "Recovery, cravings, drive",
    cue: {
      text: "When sleep is restricted, reduce your lifting volume instead of attempting maximum effort on exhausted joints and depleted energy stores.",
      source: "sleep-and-fat-loss-for-busy-professionals",
    },
    exercises: [],
    articles: ["sleep-and-fat-loss-for-busy-professionals", "why-you-cant-stay-consistent-with-the-gym", "morning-routine-for-men-25-40"],
  },
  {
    id: "heart",
    name: "Heart",
    plain: "Cardio and conditioning",
    cue: {
      text: "Start with two or three 20 to 30 minute LISS sessions per week on non-lifting days.",
      source: "how-much-cardio-for-fat-loss-men",
    },
    exercises: [],
    articles: ["how-much-cardio-for-fat-loss-men", "standing-desk-vs-walking-pad"],
  },
  {
    id: "liver",
    name: "Liver",
    plain: "Alcohol and fat loss",
    cue: {
      text: "Fat oxidation stops while your body processes alcohol",
      source: "alcohol-fitness-men",
    },
    exercises: [],
    articles: ["alcohol-fitness-men"],
  },
  {
    id: "stomach",
    name: "Stomach",
    plain: "Hunger, protein, portions",
    cue: {
      text: "Anchor every main meal with one to two palm-sized portions of lean protein to preserve muscle and manage hunger during fat loss.",
      source: "calorie-deficit-without-counting-everything",
    },
    exercises: [],
    articles: ["calorie-deficit-without-counting-everything", "how-much-protein-to-lose-fat", "diet-soda-and-fat-loss"],
  },
  {
    id: "belly",
    name: "Belly fat",
    plain: "The fat around your middle",
    cue: {
      text: "Expect belly fat to be the last place you lose fat, so judge progress by total weight and waist trends over 12 weeks.",
      source: "how-to-lose-belly-fat-men-30s",
    },
    exercises: [],
    articles: ["how-to-lose-belly-fat-men-30s", "how-to-lose-belly-fat-sitting-all-day", "how-to-lose-belly-fat-with-client-dinners"],
  },
];

export type ClientResult = {
  id: string;
  name: string;
  age?: number;
  /** What he does for a living, in the client's own words, short: "Software
   *  engineer", "Teacher", "Business owner". Both competitors running paid
   *  traffic at this ICP label every case study with one, because a reader
   *  recognising his own job is the cheapest identification a proof card can
   *  buy. Optional: a story without it renders exactly as it does today. */
  occupation?: string;
  /** Waist change as the client reported it, e.g. "41 to 32 inches". Scale
   *  weight alone under-reports a recomposition, and waist is the number both
   *  competitors lead with. Verbatim from the client, never derived. */
  waistInches?: string;
  monthsCoached?: number;
  coachingLength?: string;
  headline: string;
  quote: string;
  homepageQuote?: string;
  outcome: string;
  imageBefore?: string;
  imageAfter?: string;
  screenshot?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
  permission: "explicit" | "anonymous";
};

export type AggregateProof = {
  label: string;
  value: string;
  detail: string;
};

export type ClientMessageProof = {
  id: string;
  name: string;
  label: string;
  headline: string;
  context: string;
  screenshot: string;
  screenshotWidth: number;
  screenshotHeight: number;
};

export type ClientTransformationPhoto = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ClientTransformationProof = {
  id: string;
  name: string;
  label: string;
  headline: string;
  context: string;
  photos: ClientTransformationPhoto[];
};

export type PublicReview = {
  id: string;
  name: string;
  source: string;
  rating: number;
  dateLabel: string;
  quote: string;
  context?: string;
};

export const aggregateProof: AggregateProof[] = [
  {
    label: "Tracked 16-week average",
    value: "25 lb",
    detail:
      "Average fat loss across 15 completed clients tracked over 16 weeks. Individual results vary.",
  },
];

export const clientTransformationProof: ClientTransformationProof[] = [
  {
    id: "joe-first-month",
    name: "Joe",
    label: "Transformation photos",
    headline: "Joe's first month.",
    context:
      "Shared with Joe's permission. In his own words: \u201CI'm really happy with how the first month went and think you are on point with your coaching. Thanks so much I'm excited for the next couple months.\u201D Joe gave the two photos as \u201C200 lbs\u201D and \u201C185 lbs,\u201D one month apart. Weights are as Joe reported them.",
    photos: [
      {
        id: "joe-before-after",
        label: "Before and after - one month apart",
        src: "/results/client-win-joe-15lb-1month.jpg",
        width: 1200,
        height: 1732,
        alt: "Geebs Coaching client Joe before and after photos one month apart with his message about the first month of coaching",
      },
    ],
  },
  {
    id: "new-program-results",
    name: "Anonymous client",
    label: "Transformation photos",
    headline: "Loving the results so far.",
    context:
      "Shared with permission and without the client's name. His message: \u201CLoving the results I'm seeing so far with the new program! Appreciate you as always brotha.\u201D No timeline or weight figures were shared.",
    photos: [
      {
        id: "new-program-before-after",
        label: "Before and after",
        src: "/results/client-win-new-program-results.jpg",
        width: 1200,
        height: 1859,
        alt: "Anonymous Geebs Coaching client before and after photos with his message about results on the new program",
      },
    ],
  },
  {
    id: "conor-three-months",
    name: "Conor",
    label: "Transformation photos",
    headline: "Conor after three months.",
    context:
      "Shared with Conor's permission. In his own words: \u201CThese results are real man, all thanks to the attention that you give me. You've really helped me a lot through this process!\u201D Kris's note on the photos: \u201CConor put 5 pounds of muscle on in 3 months.\u201D",
    photos: [
      {
        id: "conor-before-after",
        label: "Before and after - three months apart",
        src: "/results/client-win-conor-5lb-muscle-3mo.jpg",
        width: 1200,
        height: 1878,
        alt: "Geebs Coaching client Conor before and after photos three months apart with his message about the coaching process",
      },
    ],
  },
  {
    id: "sam-strength-confidence",
    name: "Sam",
    label: "Transformation photos",
    headline: "Sam fell back in love with the gym.",
    context:
      "Shared with Sam's permission. In his own words: \u201CThese workouts have helped me build strength, confidence, and the physique I was working toward. The intentional structure and intensity of the program has made me fall in love with the gym again.\u201D No timeline or weight figures were shared.",
    photos: [
      {
        id: "sam-before-after",
        label: "Before and after",
        src: "/results/client-win-sam-strength-confidence.jpg",
        width: 1200,
        height: 1883,
        alt: "Geebs Coaching client Sam before and after photos with his message about building strength and confidence",
      },
    ],
  },
  {
    id: "traveling-transformation",
    name: "Anonymous client",
    label: "Transformation photos",
    headline: "Front, side and back, before and after.",
    context:
      "Shared with permission and without the client's name. Published without a timeline or any weight figure, because an unnamed client cannot stand behind a number attributed to him. The photos are shown exactly as he shared them.",
    photos: [
      {
        id: "traveling-grid",
        label: "Before and after - side and back views",
        src: "/results/client-win-traveling-transformation.jpg",
        width: 1200,
        height: 1486,
        alt: "Anonymous Geebs Coaching client side and back before and after transformation photos",
      },
    ],
  },
  {
    id: "anonymous-four-photo-transformation",
    name: "Anonymous client",
    label: "Transformation photos",
    headline: "A visible before-and-after transformation.",
    context:
      "Shared anonymously without the client's name, exact timeline, or measurement claims.",
    photos: [
      {
        id: "before-front",
        label: "Before - front",
        src: "/results/anonymous-transformation-before-front.jpg",
        width: 720,
        height: 1280,
        alt: "Anonymous Geebs client before body recomposition transformation front view",
      },
      {
        id: "before-side",
        label: "Before - side",
        src: "/results/anonymous-transformation-before-side.jpg",
        width: 720,
        height: 1280,
        alt: "Anonymous Geebs client before body recomposition transformation side view",
      },
      {
        id: "after-front",
        label: "After - front",
        src: "/results/anonymous-transformation-after-front.jpg",
        width: 965,
        height: 1280,
        alt: "Anonymous Geebs client after body recomposition transformation front view",
      },
      {
        id: "after-mirror",
        label: "After - mirror",
        src: "/results/anonymous-transformation-after-mirror.jpg",
        width: 860,
        height: 1280,
        alt: "Anonymous Geebs client after body recomposition transformation mirror view",
      },
    ],
  },
];

export const clientMessageProof: ClientMessageProof[] = [
  {
    id: "anthony-online-accountability",
    name: "Anthony",
    label: "Accountability text",
    headline: "Ready to track every day.",
    context:
      "A live nutrition push where Kris lays out the food plan and Anthony commits to tracking, prep, and workout updates.",
    screenshot: "/results/anthony-online-accountability-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 400,
  },
  {
    id: "jordan-miller-training-reaction",
    name: "Jordan",
    label: "Training reaction",
    headline: "Pushed hard and feeling amazing.",
    context:
      "Post-session feedback after Kris pushed the workout intensity and Jordan came back feeling good from the work.",
    screenshot: "/results/jordan-miller-training-reaction-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 640,
  },
  {
    id: "janica-winn-gymrat-prayer",
    name: "Janica",
    label: "Client culture",
    headline: "The Gymrat Prayer.",
    context:
      "A client-side training-culture message that shows the relationship around the work, not a transformation claim.",
    screenshot: "/results/janica-winn-gymrat-prayer-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 670,
  },
];

export const publicReviews: PublicReview[] = [
  {
    id: "google-jake-ross-kris-next-level",
    name: "Jake Ross",
    source: "Google review",
    rating: 5,
    dateLabel: "11 months ago",
    quote:
      "Great staff. Even greater experience. Would definitely recommend to anyone looking to improve themselves. Kris is the person you want to take it to that next level.",
    context: "Titan Forge training environment review",
  },
  {
    id: "google-michael-s-kris-great-coach",
    name: "Michael S",
    source: "Google review",
    rating: 5,
    dateLabel: "11 months ago",
    quote:
      "Titan Forge is awesome! Kris is a great coach and has pushed me harder than I ever thought possible!!!",
    context: "Titan Forge training environment review",
  },
  {
    id: "google-conor-mccutcheon-goals-reality",
    name: "Conor McCutcheon",
    source: "Google review",
    rating: 5,
    dateLabel: "11 months ago",
    quote:
      "Overall a great experience and crew over at titan forge. Kris and Steve really know what they're doing and are so devoted to making your goals reality.",
    context: "Titan Forge training environment review",
  },
  {
    id: "google-skyler-rauch-supportive",
    name: "Skyler Rauch",
    source: "Google review",
    rating: 5,
    dateLabel: "a year ago",
    quote:
      "The guys at Titan Forge are amazing! I've been training with Kris for the past month and I've honestly been having the best time. Everyone I've met is super friendly and so responsive and supportive! I couldn't imagine a better experience.",
    context: "Titan Forge training environment review",
  },
  {
    id: "google-evan-merrill-best-self",
    name: "Evan Merrill",
    source: "Google review",
    rating: 5,
    dateLabel: "11 months ago",
    quote:
      "Titan Forge Fitness is an excellent spot! Kris is a great person that will get you feeling and looking like your best self. Highly recommend",
    context: "Titan Forge training environment review",
  },
];

// Add only permissioned client results here. Do not fabricate names, outcomes,
// screenshots, weights, or before/after photos.
export const clientResults: ClientResult[] = [
  {
    id: "justin-online-2-months-10-lbs",
    name: "Justin",
    age: 24,
    coachingLength: "2 months coached",
    headline: "Down 10 pounds and carrying more confidence into daily life.",
    quote:
      "Since training with Kris, I've lost 10 lb, which has definitely given me more confidence. I'm also noticing changes in my daily life: I am not as tired during work and I can lift things easier than before.",
    homepageQuote:
      "I've lost 10 lb, which has definitely given me more confidence. I'm not as tired during work and I can lift things easier than before.",
    outcome: "2 months - down 10 lb, more confidence, more energy",
    screenshot: "/results/justin-online-weight-loss-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 530,
    permission: "explicit",
  },
  {
    id: "jon-miller-6-months-first-pull-ups",
    name: "Jon Miller",
    age: 27,
    coachingLength: "6 months coached",
    headline: "From zero pull-ups to five on his own.",
    quote:
      "Kris helped me improve my form and my confidence, and he kept me accountable with my diet. Before I couldn't do a single pull-up, and now I can do five all on my own.",
    homepageQuote:
      "Before I couldn't do a single pull-up, and now I can do five all on my own.",
    outcome: "6 months - better form, diet accountability, 5 pull-ups",
    screenshot: "/results/jon-miller-pull-up-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 400,
    permission: "explicit",
  },
  {
    id: "jhoan-rincon-3-months-technique-health",
    name: "Jhoan Rincon",
    age: 46,
    coachingLength: "3 months coached",
    headline: "Better technique, better health, and support to keep going.",
    quote:
      "Kris has a natural talent for coaching and for making me understand the proper technique for each exercise and exactly which muscles we are working. Most importantly, he changed the way I view my life, encouraging me to take better care of my body, my mind, and my health. Even though I do not have much free time, he helps me push myself to keep going and never lets me give up.",
    homepageQuote:
      "Kris changed the way I view my life. Even though I do not have much free time, he helps me push myself to keep going and never lets me give up.",
    outcome: "3 months - better technique, consistency, and health",
    screenshot: "/results/jhoan-rincon-coaching-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 900,
    permission: "explicit",
  },
  {
    id: "thomas-13-weeks-weight-gain",
    name: "Thomas",
    age: 19,
    coachingLength: "13 weeks coached",
    headline: "Thirteen weeks in, gaining weight and feeling better in his physique.",
    quote:
      "At first it was hard to maintain a calorie goal, much less a protein goal, but now it has been really easy because I have the accountability I need. I've gained weight, and without Kris guiding me on what exercises to do, I would not have had the slightest idea what to do at the gym. Now I can see a noticeable difference in my physique and I feel really good about myself.",
    homepageQuote:
      "Now I can see a noticeable difference in my physique and I feel really good about myself.",
    outcome: "13 weeks - gained weight, protein consistency, more confidence",
    screenshot: "/results/thomas-13-weeks-weight-gain-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 650,
    permission: "explicit",
  },
  {
    id: "jordan-miller-6-months-28-pull-ups",
    name: "Jordan Miller",
    age: 27,
    coachingLength: "6 months coached",
    headline: "From no pull-ups to a 28-rep best.",
    quote:
      "Kris has done a phenomenal job guiding me in building my chest and arms while helping me understand the proper form and intensity for each set. He has held me accountable with my diet and helped me understand the best meal choices for my goals. Since we started, I went from being unable to do a pull-up to doing multiple, with a best record of 28. My arms and shoulders have grown, and my peers have commented on my appearance.",
    homepageQuote:
      "I went from being unable to do a pull-up to doing multiple, with a best record of 28. My arms and shoulders have grown.",
    outcome: "6 months - chest and arm growth, diet accountability, 28-rep best",
    screenshot: "/results/jordan-miller-6-months-pull-ups-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 740,
    permission: "explicit",
  },
  {
    id: "juan-online-4-5-months",
    name: "Juan",
    age: 28,
    coachingLength: "4-5 months coached",
    headline: "Stronger, leaner, and training with a healthier mindset.",
    quote:
      "You have helped me increase my strength, my workout intensity, form, and now my nutrition. Since starting, I've slowly lost weight, gained more muscle, and developed a daily habit of working out with a positive/healthier mindset.",
    outcome: "4-5 months - strength, form, nutrition, and consistency",
    screenshot: "/results/juan-online-testimonial-cropped.jpg",
    screenshotWidth: 589,
    screenshotHeight: 320,
    permission: "explicit",
  },
  {
    id: "gonzalo-fort-lauderdale-11-weeks",
    name: "Gonzalo, Fort Lauderdale",
    headline: "Thank you for changing my life.",
    quote:
      "Your lifting philosophy, the eating protocol, the sauna, the cardio, is all stacking. Even sleep has been better. I am feeling FANTASTIC, way more energetic, like a million dollars.",
    outcome: "11 weeks in - stronger, sleeping better, more energetic",
    permission: "explicit",
  },
  {
    id: "client-36-lbs-under-200",
    name: "Anonymous client",
    headline: "Down 36 pounds and under 200 for the first time in years.",
    quote: "I feel good in the mirror. And thanks the encouragement.",
    outcome: "234 to 198 lb",
    screenshot: "/results/client-36-lbs-under-200-cropped.jpg",
    screenshotWidth: 1320,
    screenshotHeight: 1500,
    permission: "anonymous",
  },
];

export const hasClientResults = clientResults.length > 0;

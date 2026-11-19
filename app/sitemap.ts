import type { MetadataRoute } from "next";
import { hasClientResults } from "@/data/clientResults";
import { scienceDigestEntries } from "@/data/scienceDigests";
import { scienceDigestIssues } from "@/data/scienceDigestIssues";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import { backfilledScienceStudies } from "@/data/scienceLibrary";
import { scienceQuestionPages } from "@/data/scienceQuestions";
import { getRegisteredPages } from "@/lib/pageRegistry";
import { publishedFastFoodGuides } from "@/data/fastFoodGuide";
import { RETAILER_SHOPPING_GUIDES } from "@/data/retailShoppingGuides";

const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_LAST_MODIFIED = new Date("2026-05-24T00:00:00.000Z");
const UPDATED_2026_06_01 = new Date("2026-06-01T00:00:00.000Z");
const UPDATED_2026_06_03 = new Date("2026-06-03T00:00:00.000Z");
const UPDATED_2026_06_04 = new Date("2026-06-04T00:00:00.000Z");
const UPDATED_2026_06_10 = new Date("2026-06-10T00:00:00.000Z");
const UPDATED_2026_06_11 = new Date("2026-06-11T00:00:00.000Z");
const UPDATED_2026_06_12 = new Date("2026-06-12T00:00:00.000Z");
const UPDATED_2026_06_14 = new Date("2026-06-14T00:00:00.000Z");
const UPDATED_2026_06_15 = new Date("2026-06-15T00:00:00.000Z");
const UPDATED_2026_06_18 = new Date("2026-06-18T00:00:00.000Z");
const UPDATED_2026_06_19 = new Date("2026-06-19T00:00:00.000Z");
const UPDATED_2026_06_21 = new Date("2026-06-21T00:00:00.000Z");
const UPDATED_2026_06_23 = new Date("2026-06-23T00:00:00.000Z");
const UPDATED_2026_06_24 = new Date("2026-06-24T00:00:00.000Z");
const UPDATED_2026_06_29 = new Date("2026-06-29T00:00:00.000Z");
const UPDATED_2026_07_03 = new Date("2026-07-03T00:00:00.000Z");
const UPDATED_2026_07_04 = new Date("2026-07-04T00:00:00.000Z");
const UPDATED_2026_07_05 = new Date("2026-07-05T00:00:00.000Z");
const UPDATED_2026_07_06 = new Date("2026-07-06T00:00:00.000Z");
const UPDATED_2026_07_07 = new Date("2026-07-07T00:00:00.000Z");
const UPDATED_2026_07_10 = new Date("2026-07-10T00:00:00.000Z");
const UPDATED_2026_07_11 = new Date("2026-07-11T00:00:00.000Z");
const UPDATED_2026_07_21 = new Date("2026-07-21T00:00:00.000Z");
const UPDATED_2026_07_22 = new Date("2026-07-22T00:00:00.000Z");
const UPDATED_2026_07_25 = new Date("2026-07-25T00:00:00.000Z");
const UPDATED_2026_08_02 = new Date("2026-08-02T00:00:00.000Z");
const UPDATED_2026_08_03 = new Date("2026-08-03T00:00:00.000Z");
const UPDATED_2026_09_13 = new Date("2026-09-13T00:00:00.000Z");
const UPDATED_2026_08_06 = new Date("2026-08-06T00:00:00.000Z");
const UPDATED_2026_08_11 = new Date("2026-08-11T00:00:00.000Z");
const UPDATED_2026_08_13 = new Date("2026-08-13T00:00:00.000Z");
const UPDATED_2026_08_18 = new Date("2026-08-18T00:00:00.000Z");
const UPDATED_2026_08_27 = new Date("2026-08-27T00:00:00.000Z");
const UPDATED_2026_09_02 = new Date("2026-09-02T00:00:00.000Z");
const UPDATED_2026_10_13 = new Date("2026-10-13T00:00:00.000Z");
const UPDATED_2026_10_18 = new Date("2026-10-18T00:00:00.000Z");
const UPDATED_2026_10_19 = new Date("2026-10-19T00:00:00.000Z");
const UPDATED_2026_10_20 = new Date("2026-10-20T00:00:00.000Z");
const UPDATED_2026_10_27 = new Date("2026-10-27T00:00:00.000Z");
const UPDATED_2026_10_28 = new Date("2026-10-28T00:00:00.000Z");
const UPDATED_2026_11_04 = new Date("2026-11-04T00:00:00.000Z");
const UPDATED_2026_11_05 = new Date("2026-11-05T00:00:00.000Z");
const UPDATED_2026_11_06 = new Date("2026-11-06T00:00:00.000Z");
const UPDATED_2026_11_08 = new Date("2026-11-08T00:00:00.000Z");
const UPDATED_2026_11_09 = new Date("2026-11-09T00:00:00.000Z");
const UPDATED_2026_11_11 = new Date("2026-11-11T00:00:00.000Z");
const UPDATED_2026_11_14 = new Date("2026-11-14T00:00:00.000Z");
const UPDATED_2026_11_15 = new Date("2026-11-15T00:00:00.000Z");
const UPDATED_2026_11_16 = new Date("2026-11-16T00:00:00.000Z");
const UPDATED_2026_11_17 = new Date("2026-11-17T00:00:00.000Z");
const UPDATED_2026_10_22 = new Date("2026-10-22T00:00:00.000Z");
const UPDATED_2026_10_23 = new Date("2026-10-23T00:00:00.000Z");
const UPDATED_2026_10_24 = new Date("2026-10-24T00:00:00.000Z");

type SitemapRoute = {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
  lastModified?: Date;
};

const routes: SitemapRoute[] = [
  { path: "/memberships/science-based-community", changeFrequency: "monthly", priority: 0.9, lastModified: UPDATED_2026_08_11 },
  { path: "/supplements", changeFrequency: "daily", priority: 0.85, lastModified: UPDATED_2026_08_11 },
  {
    path: "/nutrition",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/ashwagandha-vs-tongkat-ali",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/apple-cider-vinegar-weight-loss",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/psyllium-husk-fiber",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/probiotics-gut-health",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/turmeric-curcumin-inflammation",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/citrulline-malate-pump",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/beta-alanine-recovery",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/rhodiola-rosea-endurance",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/caffeine-performance",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/l-theanine-focus",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/mct-oil-energy",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1.0,
    lastModified: UPDATED_2026_06_12,
  },
  {
    path: "/packages",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: UPDATED_2026_10_19,
  },
  {
    path: "/coaching",
    changeFrequency: "monthly",
    priority: 0.92,
    lastModified: UPDATED_2026_10_19,
  },
  {
    path: "/scholarship",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  // Trust pages. Both returned 404 and appeared in no sitemap before 2026-09-23,
  // while the site runs GA4 and collects name/email/phone through /apply.
  {
    path: "/contact",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/referral",
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_19,
  },
  {
    path: "/geebs-method",
    changeFrequency: "monthly",
    priority: 0.92,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/methodology",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/faq",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_11,
  },
  {
    path: "/for/busy-professionals",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_19,
  },
  { path: "/for/executives", changeFrequency: "monthly", priority: 0.85 },
  {
    path: "/for/founders",
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_23,
  },
  {
    path: "/for/high-income-professionals",
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_12,
  },
  {
    path: "/for/software-engineers",
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_12,
  },
  {
    path: "/for/remote-workers",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_11_16,
  },
  {
    path: "/for/online-fitness-coach-for-men",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/for/new-dads",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_13,
  },
  {
    path: "/for/men-in-their-30s",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/skinny-fat",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date("2026-10-07T00:00:00.000Z"),
  },
  {
    path: "/for/skinny-fat-men",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_11_09,
  },
  {
    path: "/for/men-over-40",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_13,
  },
  {
    path: "/body-recomposition-over-40",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: UPDATED_2026_10_13,
  },
  {
    path: "/for/men-getting-married",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_10,
  },
  {
    path: "/for/shift-workers",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_03,
  },
  {
    path: "/guides/body-recomposition-for-beginners",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_22,
  },
  {
    path: "/vs/ai-fitness-coach",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_19,
  },
  {
    path: "/guides/online-fitness-coach-vs-nutritionist",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_10,
  },
  {
    path: "/for/men-who-travel-for-work",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_19,
  },
  {
    path: "/for/accountability",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_11_08,
  },
  {
    path: "/for/online-fitness-coach-for-women",
    changeFrequency: "monthly",
    priority: 0.88,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/personal-training-denver",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  // Denver intent pages (2026-08-03) — distinct intents from
  // /personal-training-denver, each self-canonical.
  {
    path: "/body-recomposition-coach-denver",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_10_13,
  },
  {
    path: "/skinny-fat-transformation-coach-denver",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_08_03,
  },
  // Programmatic Colorado service-area pages (2026-06-15). Denver is omitted —
  // it canonicalizes to /personal-training-denver to avoid cannibalization.
  {
    path: "/locations/englewood",
    changeFrequency: "monthly",
    priority: 0.74,
    lastModified: UPDATED_2026_06_15,
  },
  {
    path: "/locations/parker",
    changeFrequency: "monthly",
    priority: 0.74,
    lastModified: UPDATED_2026_06_15,
  },
  {
    path: "/locations/cherry-creek",
    changeFrequency: "monthly",
    priority: 0.74,
    lastModified: UPDATED_2026_06_15,
  },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_04,
  },
  {
    path: "/science",
    changeFrequency: "daily",
    priority: 0.84,
    lastModified: UPDATED_2026_07_21,
  },
  {
    path: "/science/fresh-research",
    changeFrequency: "daily",
    priority: 0.81,
    lastModified: UPDATED_2026_08_06,
  },
  {
    path: "/science/weekly-digest",
    changeFrequency: "weekly",
    priority: 0.81,
    lastModified: UPDATED_2026_07_21,
  },
  {
    path: "/science/weekly-science-drop",
    changeFrequency: "weekly",
    priority: 0.83,
    lastModified: UPDATED_2026_07_21,
  },
  ...scienceDigestIssues.map((issue) => ({
    path: issue.path,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: UPDATED_2026_07_21,
  })),
  ...scienceDigestEntries.map((entry) => ({
    path: `/science/weekly-digest/${entry.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.79,
    lastModified: UPDATED_2026_07_21,
  })),
  {
    path: "/science/citation-map",
    changeFrequency: "weekly",
    priority: 0.82,
    lastModified: UPDATED_2026_07_21,
  },
  {
    path: "/science/questions",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_21,
  },
  {
    path: "/science/studies",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_21,
  },
  ...scienceLeadMagnets.map((page) => ({
    path: `/science/${page.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.82,
    lastModified: UPDATED_2026_07_21,
  })),
  ...scienceQuestionPages.map((page) => ({
    path: `/science/questions/${page.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.78,
    lastModified: UPDATED_2026_07_21,
  })),
  ...backfilledScienceStudies.map((study) => ({
    path: `/science/studies/${study.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.74,
    lastModified: UPDATED_2026_07_21,
  })),
  {
    path: "/resources/protein-guide",
    changeFrequency: "monthly",
    priority: 0.84,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/resources/high-protein-fast-food-guide",
    changeFrequency: "monthly",
    priority: 0.76,
    lastModified: UPDATED_2026_11_08,
  },
  {
    path: "/resources/fast-food",
    changeFrequency: "weekly",
    priority: 0.82,
    lastModified: UPDATED_2026_10_27,
  },
  {
    path: "/resources/eating-on-the-go",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_28,
  },
  {
    path: "/resources/den-airport-food-guide",
    changeFrequency: "weekly",
    priority: 0.78,
    lastModified: UPDATED_2026_10_28,
  },
  {
    path: "/resources/road-trip-food-guide",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_10_28,
  },
  {
    path: "/resources/convenience-store-protein-guide",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_10_28,
  },
  ...publishedFastFoodGuides.map((guide) => ({
    path: `/resources/fast-food/${guide.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.72,
    lastModified: UPDATED_2026_10_27,
  })),
  {
    path: "/resources/grocery-shopping-guides",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_11_08,
  },
  ...RETAILER_SHOPPING_GUIDES.map((guide) => ({
    path: `/resources/${guide.slug}-high-protein-grocery-guide`,
    changeFrequency: "monthly" as const,
    priority: guide.hasOfficialSourceData ? 0.82 : 0.7,
    lastModified: UPDATED_2026_11_08,
  })),
  {
    path: "/resources/how-to-calculate-macros-for-body-recomposition",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/resources/busy-guy-training-plan",
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: UPDATED_2026_06_18,
  },
  {
    path: "/resources/bad-week-adjustment-loop",
    changeFrequency: "monthly",
    priority: 0.84,
    lastModified: UPDATED_2026_10_18,
  },
  {
    path: "/resources/diet-soda-cutting",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/resources/online-fitness-coaching-fit-check",
    changeFrequency: "monthly",
    priority: 0.86,
    lastModified: UPDATED_2026_06_04,
  },
  {
    path: "/free/forecast",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/free/goal-tracker",
    changeFrequency: "monthly",
    priority: 0.84,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/free/daily",
    changeFrequency: "daily",
    priority: 0.86,
  },
  {
    path: "/free/seed-oils",
    changeFrequency: "monthly",
    priority: 0.86,
    lastModified: UPDATED_2026_08_13,
  },
  ...(hasClientResults
    ? [
        {
          path: "/results",
          changeFrequency: "monthly" as const,
          priority: 0.78,
        },
      ]
    : []),
  // Intent pages — Batch E (2026-06-10)
  {
    path: "/for/weight-loss",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_03,
  },
  {
    path: "/guides/getting-back-in-shape-after-a-long-break",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_10,
  },
  {
    path: "/guides/what-does-an-online-fitness-coach-do",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_12,
  },
  // Free tools (2026-08-02)
  {
    path: "/tools",
    changeFrequency: "weekly",
    priority: 0.85,
    lastModified: UPDATED_2026_08_18,
  },
  {
    path: "/tools/body-3d",
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    path: "/tools/perfect-day-builder",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/tools/daily-habit-tracker",
    changeFrequency: "daily",
    priority: 0.85,
    lastModified: UPDATED_2026_08_11,
  },
  // Nutrition library (2026-08-02) — evidence-graded outcome hubs
  {
    path: "/nutrition/growth-hormone-foods",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/magnesium-sleep",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/berberine-blood-sugar",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/olive-oil-health",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/red-meat-iron",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/soy-protein-hormones",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_02,
  },
  {
    path: "/nutrition/intermittent-fasting-longevity",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date("2026-08-03T00:00:00.000Z"),
  },
  {
    path: "/nutrition/mediterranean-diet-healthspan",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/plant-based-muscle-growth",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/tart-cherry-juice-recovery",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/melatonin-sleep-architecture",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date("2026-08-03T00:00:00.000Z"),
  },
  {
    path: "/nutrition/ashwagandha-cortisol",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/casein-protein-night",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/glucosamine-chondroitin",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  {
    path: "/nutrition/maca-root-libido",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_03,
  },
  // Intent pages — Batch C (2026-06-10)
  {
    path: "/guides/how-much-does-an-online-fitness-coach-cost",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_27,
  },
  {
    path: "/vs/fitness-apps",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_10,
  },
  {
    path: "/vs/trainwell",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_06_10,
  },
  {
    path: "/vs/future",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/vs/caliber",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_06_03,
  },
  {
    path: "/vs/hiring-a-personal-trainer",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_07_05,
  },
  {
    path: "/vs/gym-membership",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_25,
  },
  {
    path: "/vs/chatgpt",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_07_06,
  },
  {
    path: "/blog/why-you-cant-stay-consistent-with-the-gym",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/body-recomposition-for-men",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: UPDATED_2026_11_16,
  },
  {
    path: "/blog/body-recomposition-for-women",
    changeFrequency: "monthly",
    priority: 0.84,
    lastModified: UPDATED_2026_07_04,
  },
  {
    path: "/blog/strength-training-for-women-beginners",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_01,
  },
  {
    path: "/blog/how-to-fix-skinny-fat",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_11_08,
  },
  {
    path: "/blog/how-to-lose-the-dad-bod",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_13,
  },
  {
    path: "/blog/progressive-overload-explained",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-lose-belly-fat-men-30s",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/are-you-training-hard-enough",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-much-protein-to-lose-fat",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-build-muscle-for-skinny-guys",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/gym-anxiety-for-men",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-build-muscle-at-home",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-build-muscle-in-your-30s",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/is-online-fitness-coaching-worth-it",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_10_27,
  },
  {
    path: "/blog/workout-plan-for-busy-executives",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-get-in-shape-with-a-60-hour-work-week",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/fitness-plan-for-men-who-travel-for-work",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_08_18,
  },
  {
    path: "/blog/how-to-lose-belly-fat-with-client-dinners",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/online-fitness-coach-denver",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/workout-plan-for-software-engineers",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/workout-plan-for-programmers",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_11_17,
  },
  {
    path: "/blog/best-gym-routine-for-software-engineers",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/how-to-stay-fit-working-from-home",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-to-lose-belly-fat-sitting-all-day",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/standing-desk-vs-walking-pad",
    changeFrequency: "monthly",
    priority: 0.76,
    lastModified: UPDATED_2026_11_05,
  },
  {
    path: "/blog/strength-training-for-desk-workers",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-long-to-see-results-working-out",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/cut-vs-recomp-vs-bulk",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/fitness-coach-for-busy-professionals",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_07_07,
  },
  {
    path: "/blog/body-recomposition-before-and-after-men",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/online-fitness-coach-vs-personal-trainer",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/body-recomposition-coach-denver",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/body-recomposition-macros",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/online-fitness-coach-for-men-over-30",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/how-to-stay-fit-working-long-hours",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/protein-intake-for-weight-loss-and-muscle-gain",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/3-day-workout-plan-for-busy-men",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/nutrition-coach-for-busy-professionals",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_06_12,
  },
  {
    path: "/blog/fitness-plan-for-founders",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/fitness-coach-for-software-engineers",
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: UPDATED_2026_06_21,
  },
  {
    path: "/blog/sleep-and-fat-loss-for-busy-professionals",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/calorie-deficit-without-counting-everything",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/fitness-accountability-coach",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/beginner-strength-training-for-men",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/how-to-stay-consistent-with-diet-on-weekends",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/how-to-build-confidence-in-the-gym",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/diet-soda-and-fat-loss",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/weight-loss-for-men-who-hate-dieting",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blog/creatine-for-men-over-30",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/alcohol-fitness-men",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/do-you-need-a-coach-if-you-already-train",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_15,
  },
  {
    path: "/blog/how-to-find-an-online-fitness-coach-for-men",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_15,
  },
  {
    path: "/blog/questions-to-ask-an-online-fitness-coach",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_21,
  },
  {
    path: "/blog/how-to-get-the-most-from-online-coaching",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_24,
  },
  {
    path: "/blog/how-to-hire-an-online-fitness-coach",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blog/how-fast-do-you-lose-muscle-detraining",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_10,
  },
  {
    path: "/blog/pre-post-workout-nutrition-men",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_10,
  },
  {
    path: "/blog/training-after-35-men",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_11,
  },
  {
    path: "/blog/intermittent-fasting-men-over-30",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_11,
  },
  {
    path: "/blog/how-much-cardio-for-fat-loss-men",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_06_11,
  },
  {
    path: "/games/read-the-week",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/assessment",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/tools/body-recomposition-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_09_13,
  },
  {
    path: "/tools/tdee-calculator",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    path: "/tools/macro-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: UPDATED_2026_07_10,
  },
  {
    path: "/tools/1rm-calculator",
    changeFrequency: "yearly",
    priority: 0.75,
  },
  {
    path: "/tools/muscle-map",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/tools/calorie-deficit-calculator",
    changeFrequency: "yearly",
    priority: 0.75,
  },
  {
    path: "/tools/body-fat-calculator",
    changeFrequency: "yearly",
    priority: 0.75,
    lastModified: UPDATED_2026_07_06,
  },
];

import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const registeredRoutes: SitemapRoute[] = getRegisteredPages()
    .filter((page) => page.sitemap)
    .map((page) => ({
      path: page.href,
      changeFrequency: page.sitemap!.changeFrequency ?? "monthly",
      priority: page.sitemap!.priority ?? 0.8,
      lastModified: page.sitemap!.lastModified
        ? typeof page.sitemap!.lastModified === "string"
          ? new Date(page.sitemap!.lastModified)
          : page.sitemap!.lastModified
        : undefined,
    }));

  const seenSitemapPaths = new Set<string>();
  const mergedRoutes: SitemapRoute[] = [];

  for (const route of routes) {
    if (!seenSitemapPaths.has(route.path)) {
      seenSitemapPaths.add(route.path);
      mergedRoutes.push(route);
    }
  }

  for (const route of registeredRoutes) {
    if (!seenSitemapPaths.has(route.path)) {
      seenSitemapPaths.add(route.path);
      mergedRoutes.push(route);
    }
  }

  const baseRoutes = mergedRoutes.map(({ path, changeFrequency, priority, lastModified }) => ({
    // Homepage emits slash-less to match the rendered canonical (Next strips the
    // trailing slash with trailingSlash: false). Keeps canonical === sitemap loc.
    url: path ? `${SITE_URL}${path}` : SITE_URL,
    lastModified:
      lastModified ??
      (path.startsWith("/blog/") ? UPDATED_2026_06_04 : DEFAULT_LAST_MODIFIED),
    changeFrequency,
    priority,
  }));

  // A post that names another page as its canonical is not a URL we want
  // indexed, so it does not belong in the sitemap either.
  const dynamicPosts = getAllBlogPosts().filter((post) => !post.canonical);
  const dynamicRoutes = dynamicPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog posts can be present in the explicit route list and in the dynamic
  // blog collection. Emit one canonical URL only; duplicate <loc> entries
  // make sitemap counts misleading and give crawlers no additional signal.
  const seenUrls = new Set(baseRoutes.map((route) => route.url));

  return [
    ...baseRoutes,
    ...dynamicRoutes.filter((route) => {
      if (seenUrls.has(route.url)) return false;
      seenUrls.add(route.url);
      return true;
    }),
  ];
}

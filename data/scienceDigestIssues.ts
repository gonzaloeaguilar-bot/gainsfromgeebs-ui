import {
  resolveScienceDigestEntries,
  type ResolvedScienceDigestEntry,
} from "@/data/scienceDigests";
import type { ScienceStudy } from "@/data/scienceLibrary";

export type ScienceDigestIssue = {
  id: string;
  title: string;
  dateLabel: string;
  path: string;
  summary: string;
  editorialNote: string;
  coachingTheme: string;
  claimGuardrail: string;
  entryIds: string[];
  keywords: string[];
  targetQueries: string[];
};

export type ResolvedScienceDigestIssue = ScienceDigestIssue & {
  entries: ResolvedScienceDigestEntry[];
  studies: ScienceStudy[];
};

export const scienceDigestIssues: ScienceDigestIssue[] = [
  {
    id: "2026-07-06",
    title: "Weekly Science Drop: sleep, protein, creatine, cardio, and cravings",
    dateLabel: "July 6, 2026",
    path: "/science/weekly-digest/2026-07-06",
    summary:
      "Seven practical Science Drop topics covering sleep, protein, creatine, lifting, cardio, cravings, food environment, and calorie control, with the original PubMed studies linked.",
    editorialNote:
      "Each cluster in this issue has a coaching move, clear answers, honest limits, and linked PubMed sources.",
    coachingTheme:
      "Build the plan around behaviors people can actually repeat: sleep setup, protein floor, useful supplement context, paired lifting and cardio, and a food environment audit before blaming willpower.",
    claimGuardrail:
      "No single study, habit, supplement, diet style, or training mode explains every result. Your health history and starting point still matter, and the linked PubMed papers provide the full study details.",
    entryIds: [
      "sleep-screens-cravings",
      "protein-satiety-recomposition",
      "lifting-cardio-longevity",
      "food-environment-calorie-control",
      "creatine-strength-aging",
      "cardio-dose-fat-loss",
      "muscle-retention-fat-loss",
    ],
    keywords: [
      "weekly science drop",
      "peer reviewed fitness studies",
      "sleep and cravings",
      "protein and body recomposition",
      "creatine and strength",
      "lifting and cardio",
      "cardio for fat loss",
      "muscle retention",
      "food environment",
      "honest limits",
    ],
    targetQueries: [
      "weekly fitness science digest July 2026",
      "Geebs Science Drop sleep protein creatine cardio cravings",
      "peer reviewed fitness studies sleep protein creatine cardio cravings",
      "fitness science newsletter honest limits",
    ],
  },
];

function uniqueStudies(entries: ResolvedScienceDigestEntry[]) {
  const studiesById = new Map<string, ScienceStudy>();

  for (const entry of entries) {
    for (const study of entry.studies) {
      studiesById.set(study.id, study);
    }
  }

  return Array.from(studiesById.values());
}

export function resolveScienceDigestIssues(): ResolvedScienceDigestIssue[] {
  const entriesById = new Map(
    resolveScienceDigestEntries().map((entry) => [entry.id, entry]),
  );

  return scienceDigestIssues.map((issue) => {
    const entries = issue.entryIds
      .map((id) => entriesById.get(id))
      .filter((entry): entry is ResolvedScienceDigestEntry => Boolean(entry));

    return {
      ...issue,
      entries,
      studies: uniqueStudies(entries),
    };
  });
}

export function scienceDigestIssueById(id: string) {
  return resolveScienceDigestIssues().find((issue) => issue.id === id);
}

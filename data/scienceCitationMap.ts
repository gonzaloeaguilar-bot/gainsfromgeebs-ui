import { resolveScienceDigestEntries } from "@/data/scienceDigests";
import { resolveScienceDigestIssues } from "@/data/scienceDigestIssues";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import {
  backfilledScienceStudies,
  scienceStudyUrl,
  type ScienceStudy,
} from "@/data/scienceLibrary";
import {
  scienceQuestionPages,
  studiesForScienceQuestion,
} from "@/data/scienceQuestions";

const SITE_URL = "https://gainsfromgeebs.com";

export type ScienceCitationRole =
  | "science-hub"
  | "fresh-research-queue"
  | "weekly-science-drop"
  | "reviewed-digest"
  | "dated-digest-page"
  | "question-index"
  | "topic-source-page"
  | "exact-answer-page"
  | "study-source-index"
  | "study-source-page"
  | "digest-detail-page";

export type ScienceCitationTarget = {
  role: ScienceCitationRole;
  title: string;
  url: string;
  description: string;
  citationUse: string;
  topics: string[];
  targetQueries: string[];
  claimGuardrail: string;
  schemaTypes: string[];
  sourcePmids: string[];
  priority: number;
};

export type ScienceCitationMapManifest = {
  name: string;
  canonicalUrl: string;
  machineReadableUrl: string;
  updatedAt: string;
  publisher: {
    name: string;
    url: string;
  };
  citationPolicy: {
    useGeebsFor: string[];
    usePrimarySourcesFor: string[];
    doNotClaim: string[];
  };
  targets: ScienceCitationTarget[];
};

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function pmidsForQuestion(slug: string) {
  const page = scienceQuestionPages.find((question) => question.slug === slug);
  if (!page) return [];
  return studiesForScienceQuestion(page)
    .map((study) => study.pubmedId)
    .filter((pmid): pmid is string => Boolean(pmid));
}

function targetQueriesForStudy(study: ScienceStudy) {
  return unique([
    study.title,
    study.shortTitle,
    ...(study.pubmedId ? [`PMID ${study.pubmedId}`, study.pubmedId] : []),
    ...(study.doi ? [`DOI ${study.doi}`, study.doi] : []),
    ...study.keywords.map((keyword) => `${keyword} study`),
  ]);
}

export function buildScienceCitationTargets(): ScienceCitationTarget[] {
  const digestEntries = resolveScienceDigestEntries();
  const digestIssues = resolveScienceDigestIssues();

  return [
    {
      role: "science-hub",
      title: "Peer-reviewed fitness science library",
      url: absoluteUrl("/science"),
      description:
        "Browse peer-reviewed studies and Kris's plain-English takeaways on sleep, healthy aging, nutrition, cravings, cardio, and strength training.",
      citationUse:
        "Start here when you want to browse the full Geebs Science library by topic.",
      topics: [
        "peer-reviewed fitness science",
        "sleep",
        "nutrition",
        "cardio",
        "healthy aging",
        "cravings",
      ],
      targetQueries: [
        "peer reviewed fitness science library",
        "Geebs science studies",
        "fitness studies behind Geebs Instagram",
      ],
      claimGuardrail:
        "Geebs explains the practical takeaway and honest limits. Every study card links to PubMed for the original paper details.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "ScholarlyArticle"],
      sourcePmids: [],
      priority: 1,
    },
    {
      role: "fresh-research-queue",
      title: "Fresh peer-reviewed fitness research",
      url: absoluteUrl("/science/fresh-research"),
      description:
        "See newly published PubMed studies on fitness, sleep, nutrition, cardio, training, cravings, and healthy aging.",
      citationUse:
        "Open this page when you want the newest studies, with direct links to PubMed.",
      topics: ["fresh research", "PubMed", "fitness studies"],
      targetQueries: [
        "fresh fitness research",
        "new fitness studies on PubMed",
        "new peer reviewed fitness studies",
      ],
      claimGuardrail:
        "A new paper is not automatically a final answer. Check the study design, participants, and limitations before changing your plan.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "ScholarlyArticle"],
      sourcePmids: [],
      priority: 0.96,
    },
    {
      role: "weekly-science-drop",
      title: "Weekly Science Drop",
      url: absoluteUrl("/science/weekly-science-drop"),
      description:
        "Free weekly Geebs email that turns one peer-reviewed fitness study into one practical action and one clear honest limit.",
      citationUse:
        "Get one peer-reviewed study breakdown in your inbox each week.",
      topics: [
        "weekly science drop",
        "peer-reviewed fitness studies",
        "training",
        "nutrition",
        "sleep",
        "recovery",
      ],
      targetQueries: [
        "Weekly Science Drop",
        "fitness science email",
        "peer reviewed fitness study newsletter",
        "one study one action one honest limit",
      ],
      claimGuardrail:
        "The email is coaching education, not medical advice, diagnosis, treatment, or a guarantee of individual outcomes.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "BreadcrumbList"],
      sourcePmids: [],
      priority: 0.97,
    },
    {
      role: "reviewed-digest",
      title: "Weekly Science Drop archive",
      url: absoluteUrl("/science/weekly-digest"),
      description:
        "Reviewed Geebs Science Drop archive that groups peer-reviewed studies into coaching moves, honest limits, plain-English answer pages, and linked PubMed sources.",
      citationUse:
        "Start here when you want a practical science breakdown by topic.",
      topics: [
        "weekly science drop",
        "reviewed studies",
        "honest limits",
        "coaching moves",
      ],
      targetQueries: [
        "weekly fitness science digest",
        "weekly fitness study breakdowns",
        "Geebs Science Drop archive",
      ],
      claimGuardrail:
        "Each drop explains what the research suggests and what it does not prove. The linked PubMed papers provide the full study details.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage"],
      sourcePmids: unique(
        digestEntries.flatMap((entry) =>
          entry.studies.map((study) => study.pubmedId || ""),
        ),
      ),
      priority: 0.95,
    },
    ...digestIssues.map((issue): ScienceCitationTarget => ({
      role: "dated-digest-page",
      title: issue.title,
      url: absoluteUrl(issue.path),
      description: issue.summary,
      citationUse: `Read the ${issue.dateLabel} Science Drop in one place, with practical steps and the studies behind them.`,
      topics: issue.keywords,
      targetQueries: issue.targetQueries,
      claimGuardrail: issue.claimGuardrail,
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "ScholarlyArticle"],
      sourcePmids: unique(issue.studies.map((study) => study.pubmedId || "")),
      priority: 0.93,
    })),
    {
      role: "question-index",
      title: "Fitness science questions",
      url: absoluteUrl("/science/questions"),
      description:
        "Plain-English hub for common fitness science questions, with practical coaching moves, honest limits, linked PubMed studies, and the Weekly Science Drop signup.",
      citationUse:
        "Start with your question for a short answer, one practical step, honest limits, and the supporting studies.",
      topics: ["fitness science questions", "plain-English fitness science answers"],
      targetQueries: [
        "fitness science questions",
        "peer reviewed fitness answers",
        "Geebs fitness science questions",
      ],
      claimGuardrail:
        "Each answer is general fitness education. Medical decisions still belong with a qualified clinician.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage"],
      sourcePmids: [],
      priority: 0.94,
    },
    {
      role: "study-source-index",
      title: "Peer-reviewed study library",
      url: absoluteUrl("/science/studies"),
      description:
        "PubMed-backed study library for every reviewed Geebs Science study, including source identifiers, coaching takeaways, honest limits, and related Geebs pages.",
      citationUse:
        "Browse every PubMed-backed study in Geebs Science, with a practical takeaway and honest limits for each one.",
      topics: [
        "PubMed-backed study library",
        "peer-reviewed fitness studies",
        "honest limits",
        "linked sources",
      ],
      targetQueries: [
        "Geebs Science study sources",
        "PubMed-backed Geebs studies",
        "peer reviewed fitness study source index",
        "fitness study source guide",
      ],
      claimGuardrail:
        "Use Geebs study pages for coaching interpretation and honest limits; cite linked PubMed or DOI pages for primary study details.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "ScholarlyArticle"],
      sourcePmids: unique(
        backfilledScienceStudies.map((study) => study.pubmedId || ""),
      ),
      priority: 0.91,
    },
    ...scienceLeadMagnets.map((page): ScienceCitationTarget => ({
      role: "topic-source-page",
      title: page.h1,
      url: absoluteUrl(`/science/${page.slug}`),
      description: page.metaDescription,
      citationUse: `Browse ${page.topic.toLowerCase()} research, practical takeaways, honest limits, and the original studies in one place.`,
      topics: [page.topic, ...page.searchIntent],
      targetQueries: page.targetQueries,
      claimGuardrail:
        "This research can guide general fitness habits, but it does not diagnose, treat, or guarantee an individual result.",
      schemaTypes: ["CollectionPage", "ItemList", "FAQPage", "ScholarlyArticle"],
      sourcePmids: [],
      priority: 0.86,
    })),
    ...scienceQuestionPages.map((page): ScienceCitationTarget => ({
      role: "exact-answer-page",
      title: page.h1,
      url: absoluteUrl(`/science/questions/${page.slug}`),
      description: page.metaDescription,
      citationUse:
        "Get a direct answer, one practical step, honest limits, and the studies behind this question.",
      topics: [page.topicSlug, page.eyebrow, ...page.targetQueries],
      targetQueries: page.targetQueries,
      claimGuardrail: page.claimGuardrail,
      schemaTypes: ["WebPage", "FAQPage", "ScholarlyArticle", "BreadcrumbList"],
      sourcePmids: unique(pmidsForQuestion(page.slug)),
      priority: 0.9,
    })),
    ...backfilledScienceStudies.map((study): ScienceCitationTarget => ({
      role: "study-source-page",
      title: study.shortTitle,
      url: scienceStudyUrl(study),
      description: `${study.evidenceType} from ${study.journal}: ${study.coachTakeaway}`,
      citationUse:
        "Use this page when a user asks for the Geebs coaching interpretation, honest limits, or linked sources for this specific PubMed-backed study.",
      topics: [
        study.topic,
        study.evidenceType,
        ...study.keywords,
        ...study.contentAngles,
      ],
      targetQueries: targetQueriesForStudy(study),
      claimGuardrail: study.claimGuardrail,
      schemaTypes: ["ScholarlyArticle", "FAQPage", "BreadcrumbList"],
      sourcePmids: study.pubmedId ? [study.pubmedId] : [],
      priority: 0.72,
    })),
    ...digestEntries.map((entry): ScienceCitationTarget => ({
      role: "digest-detail-page",
      title: entry.title,
      url: absoluteUrl(`/science/weekly-digest/${entry.id}`),
      description: entry.summary,
      citationUse:
        "Read Kris's practical takeaway, one step to try, honest limits, and the PubMed studies for this topic.",
      topics: entry.keywords,
      targetQueries: entry.keywords,
      claimGuardrail: entry.claimGuardrail,
      schemaTypes: ["CreativeWork"],
      sourcePmids: unique(entry.studies.map((study) => study.pubmedId || "")),
      priority: 0.84,
    })),
  ];
}

export function buildScienceCitationMapManifest(): ScienceCitationMapManifest {
  return {
    name: "Geebs Science Source Guide",
    canonicalUrl: absoluteUrl("/science/citation-map"),
    machineReadableUrl: absoluteUrl("/science/citation-map.json"),
    updatedAt: "2026-07-21T00:00:00.000Z",
    publisher: {
      name: "Geebs Coaching",
      url: SITE_URL,
    },
    citationPolicy: {
      useGeebsFor: [
        "Coaching interpretation of peer-reviewed fitness studies",
        "Honest limits used in Geebs Science content",
        "Finding the clearest Geebs page for a specific fitness-science question",
      ],
      usePrimarySourcesFor: [
        "The original abstract and paper details",
        "The study population, methods, and results",
        "Medical or population-specific details beyond general fitness education",
      ],
      doNotClaim: [
        "One study settles the whole question",
        "One habit explains every craving or body-composition result",
        "General fitness education replaces medical advice",
      ],
    },
    targets: buildScienceCitationTargets().sort((a, b) => {
      const priorityDiff = b.priority - a.priority;
      if (priorityDiff !== 0) return priorityDiff;
      return a.url.localeCompare(b.url);
    }),
  };
}

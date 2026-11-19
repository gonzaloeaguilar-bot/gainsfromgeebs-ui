import type { ScienceStudy, ScienceTopic } from "@/data/scienceLibrary";

export type ScienceStudySearchItem = Pick<
  ScienceStudy,
  | "id"
  | "title"
  | "shortTitle"
  | "topic"
  | "evidenceType"
  | "year"
  | "journal"
  | "authors"
  | "coachTakeaway"
  | "claimGuardrail"
  | "keywords"
  | "pubmedId"
  | "doi"
  | "quickAnswer"
  | "faqs"
>;

export type ScienceStudySearchTopic = ScienceTopic | "All";

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchTextForStudy(study: ScienceStudySearchItem) {
  return normalizeSearchText(
    [
      study.title,
      study.shortTitle,
      study.topic,
      study.evidenceType,
      study.year,
      study.journal,
      study.authors,
      study.coachTakeaway,
      study.claimGuardrail,
      study.pubmedId ?? "",
      study.doi ?? "",
      study.quickAnswer ?? "",
      ...(study.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
      ...study.keywords,
    ].join(" "),
  );
}

export function scienceStudySearchItems(
  studies: ScienceStudy[],
): ScienceStudySearchItem[] {
  return studies.map((study) => ({
    id: study.id,
    title: study.title,
    shortTitle: study.shortTitle,
    topic: study.topic,
    evidenceType: study.evidenceType,
    year: study.year,
    journal: study.journal,
    authors: study.authors,
    coachTakeaway: study.coachTakeaway,
    claimGuardrail: study.claimGuardrail,
    keywords: study.keywords,
    pubmedId: study.pubmedId,
    doi: study.doi,
    quickAnswer: study.quickAnswer,
    faqs: study.faqs,
  }));
}

export function filterScienceStudyItems(
  studies: ScienceStudySearchItem[],
  query: string,
  topic: ScienceStudySearchTopic,
) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);

  return studies.filter((study) => {
    if (topic !== "All" && study.topic !== topic) return false;
    if (!terms.length) return true;

    const haystack = searchTextForStudy(study);
    const haystackTerms = new Set(haystack.split(" "));

    return terms.every((term) =>
      term.length <= 3 ? haystackTerms.has(term) : haystack.includes(term),
    );
  });
}

export function scienceStudySearchTopic(
  value: string | undefined,
  topics: readonly ScienceStudySearchTopic[],
): ScienceStudySearchTopic {
  return topics.includes(value as ScienceStudySearchTopic)
    ? (value as ScienceStudySearchTopic)
    : "All";
}

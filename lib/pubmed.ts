import {
  scienceScanQueries,
  type ScienceScanQuery,
  type ScienceTopic,
} from "@/data/scienceLibrary";

const PUBMED_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const PUBMED_STUDY_BASE = "https://pubmed.ncbi.nlm.nih.gov";
const MAX_SUMMARY_IDS = 12;
const MEMORY_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const NCBI_REQUEST_SPACING_MS = 400;

type PubMedSearchResponse = {
  esearchresult?: {
    idlist?: string[];
  };
};

type PubMedSummaryAuthor = {
  name?: unknown;
};

type PubMedArticleId = {
  idtype?: unknown;
  value?: unknown;
};

type PubMedSummaryItem = {
  uid?: string;
  title?: string;
  pubdate?: string;
  source?: string;
  fulljournalname?: string;
  authors?: PubMedSummaryAuthor[];
  pubtype?: string[];
  articleids?: PubMedArticleId[];
};

type PubMedSummaryResponse = {
  result?: {
    uids?: string[];
  } & Record<string, PubMedSummaryItem | string[] | undefined>;
};

export type PubMedStudyCandidate = {
  pmid: string;
  title: string;
  journal: string;
  pubDate: string;
  authors: string;
  evidenceType: string;
  topic: ScienceTopic;
  sourceUrl: string;
  doiUrl?: string;
  queryId: string;
  queryLabel: string;
};

export type PubMedScanResult = {
  cadence: ScienceScanQuery["cadence"];
  generatedAt: string;
  queries: Pick<ScienceScanQuery, "id" | "label" | "topic">[];
  studies: PubMedStudyCandidate[];
};

const memoryCache = new Map<
  ScienceScanQuery["cadence"],
  { expiresAt: number; result: PubMedScanResult }
>();

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withNcbiParams(path: "esearch.fcgi" | "esummary.fcgi", params: URLSearchParams) {
  const apiKey = process.env.NCBI_API_KEY?.trim();
  params.set("tool", "gainsfromgeebs_science_library");
  params.set("email", process.env.NCBI_CONTACT_EMAIL?.trim() || "kris@titanforgefit.com");
  if (apiKey) params.set("api_key", apiKey);
  return `${PUBMED_BASE}/${path}?${params.toString()}`;
}

function cleanTitle(title: string) {
  return title.replace(/\s+/g, " ").replace(/\.$/, "").trim();
}

function authorLabel(authors: PubMedSummaryAuthor[] | undefined) {
  const names = (authors ?? [])
    .map((author) => (typeof author.name === "string" ? author.name : ""))
    .filter(Boolean);

  if (!names.length) return "PubMed indexed authors";
  if (names.length === 1) return names[0];
  return `${names[0]} et al.`;
}

function doiUrl(articleIds: PubMedArticleId[] | undefined) {
  const doi = (articleIds ?? []).find(
    (item) => item.idtype === "doi" && typeof item.value === "string",
  )?.value;

  return typeof doi === "string" ? `https://doi.org/${doi}` : undefined;
}

function evidenceType(pubTypes: string[] | undefined) {
  const types = pubTypes ?? [];
  if (types.includes("Meta-Analysis") && types.includes("Systematic Review")) {
    return "Systematic review and meta-analysis";
  }
  if (types.includes("Meta-Analysis")) return "Meta-analysis";
  if (types.includes("Systematic Review")) return "Systematic review";
  if (types.includes("Randomized Controlled Trial")) {
    return "Randomized controlled trial";
  }
  return types[0] || "PubMed indexed study";
}

const excludedClinicalTitleTerms =
  /\b(cancer|carcinoma|tumou?r|neoplasm|myeloma|chemotherapy|postoperative|surgery|surgical|trauma|traumatic|esketamine|elotuzumab)\b/i;

const queryTitleRelevance: Record<string, RegExp> = {
  "daily-sleep-recovery":
    /\b(sleep|circadian|caffeine|smartphone|screen|recovery|exercise|performance|appetite)\b/i,
  "daily-nutrition-body-composition":
    /\b(protein|satiety|appetite|diet|feeding|amino acid|body composition|muscle|lean mass|strength|fitness|weight loss)\b/i,
  "daily-training-cardio-longevity":
    /\b(exercise|training|aerobic|resistance|physical activity|cardio|cardiorespiratory|fitness|body composition|mortality|longevity)\b/i,
  "weekly-anti-aging-fitness":
    /\b(aging|ageing|longevity|biological age|healthy aging|fitness|exercise|training|protein|sleep)\b/i,
  "weekly-community-questions":
    /\b(fitness|exercise|strength training|body recomposition|fat loss|adherence|behavior change|coaching|accountability)\b/i,
};

function isRelevantStudyCandidate(item: PubMedSummaryItem, query: ScienceScanQuery) {
  const title = typeof item.title === "string" ? item.title : "";
  if (excludedClinicalTitleTerms.test(title)) return false;

  const relevance = queryTitleRelevance[query.id];
  return relevance ? relevance.test(title) : true;
}

async function fetchJson<T>(url: string, revalidateSeconds: number): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`PubMed request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchPubMedIds(query: ScienceScanQuery, retmax: number) {
  const params = new URLSearchParams({
    db: "pubmed",
    term: query.query,
    retmode: "json",
    retmax: String(retmax),
    sort: "pub date",
  });
  const data = await fetchJson<PubMedSearchResponse>(
    withNcbiParams("esearch.fcgi", params),
    60 * 60 * 12,
  );

  return (data.esearchresult?.idlist ?? []).map((id) => ({
    id,
    query,
  }));
}

async function fetchPubMedSummaries(ids: string[], queryById: Map<string, ScienceScanQuery>) {
  if (!ids.length) return [];

  const params = new URLSearchParams({
    db: "pubmed",
    id: ids.slice(0, MAX_SUMMARY_IDS).join(","),
    retmode: "json",
  });
  const data = await fetchJson<PubMedSummaryResponse>(
    withNcbiParams("esummary.fcgi", params),
    60 * 60 * 12,
  );
  const result = data.result;
  const uids = result?.uids ?? [];

  return uids
    .map((uid): PubMedStudyCandidate | null => {
      const item = result?.[uid];
      const query = queryById.get(uid);
      if (!item || Array.isArray(item) || !query || !item.title) return null;
      if (!isRelevantStudyCandidate(item, query)) return null;

      return {
        pmid: uid,
        title: cleanTitle(item.title),
        journal: item.fulljournalname || item.source || "PubMed indexed journal",
        pubDate: item.pubdate || "Recent",
        authors: authorLabel(item.authors),
        evidenceType: evidenceType(item.pubtype),
        topic: query.topic,
        sourceUrl: `${PUBMED_STUDY_BASE}/${uid}/`,
        doiUrl: doiUrl(item.articleids),
        queryId: query.id,
        queryLabel: query.label,
      };
    })
    .filter((study): study is PubMedStudyCandidate => Boolean(study));
}

export async function fetchPubMedScienceScan(
  cadence: ScienceScanQuery["cadence"],
  limit = 9,
  options: { force?: boolean } = {},
): Promise<PubMedScanResult> {
  const cached = memoryCache.get(cadence);
  if (!options.force && cached && cached.expiresAt > Date.now()) {
    return cached.result;
  }

  const queries = scienceScanQueries.filter((query) => query.cadence === cadence);
  const found: { id: string; query: ScienceScanQuery }[][] = [];

  for (const query of queries) {
    try {
      found.push(
        await fetchPubMedIds(query, Math.max(3, Math.ceil(limit / 2))),
      );
    } catch (error) {
      console.warn("PubMed science scan query failed", {
        queryId: query.id,
        message: error instanceof Error ? error.message : "unknown",
      });
    }
    await wait(NCBI_REQUEST_SPACING_MS);
  }

  const queryById = new Map<string, ScienceScanQuery>();
  const ids: string[] = [];

  for (const row of found.flat()) {
    if (queryById.has(row.id)) continue;
    queryById.set(row.id, row.query);
    ids.push(row.id);
  }

  const studies = await fetchPubMedSummaries(ids.slice(0, limit), queryById);

  const result = {
    cadence,
    generatedAt: new Date().toISOString(),
    queries: queries.map(({ id, label, topic }) => ({ id, label, topic })),
    studies,
  };

  memoryCache.set(cadence, {
    expiresAt: Date.now() + MEMORY_CACHE_TTL_MS,
    result,
  });

  return result;
}

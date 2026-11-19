import type { ScienceStudy, ScienceTopic } from "@/data/scienceLibrary";
import type {
  PubMedScanResult,
  PubMedStudyCandidate,
} from "@/lib/pubmed";

const SUPABASE_TABLE = "science_inbox_items";
const SITE_URL = "https://gainsfromgeebs.com";
const DEFAULT_RELATED_HREFS = ["/science", "/methodology"];

export type ScienceInboxStatus = "new" | "reviewed" | "promoted" | "rejected";

export type ScienceInboxItem = {
  pmid: string;
  title: string;
  topic: ScienceTopic;
  evidenceType: string;
  journal: string;
  pubDate: string;
  authors: string;
  sourceUrl: string;
  doiUrl?: string;
  queryIds: string[];
  queryLabels: string[];
  cadences: PubMedScanResult["cadence"][];
  status: ScienceInboxStatus;
  firstSeenAt: string;
  lastSeenAt: string;
  seenCount: number;
  shortTitle?: string;
  coachTakeaway?: string;
  claimGuardrail?: string;
  contentAngles: string[];
  relatedHrefs: string[];
  keywords: string[];
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  promotedAt?: string;
  rejectedAt?: string;
};

type ScienceInboxRow = {
  pmid: string;
  title: string;
  topic: ScienceTopic;
  evidence_type: string;
  journal: string;
  pub_date: string;
  authors: string;
  source_url: string;
  doi_url: string | null;
  query_ids: string[] | null;
  query_labels: string[] | null;
  cadences: PubMedScanResult["cadence"][] | null;
  status: ScienceInboxStatus;
  first_seen_at: string;
  last_seen_at: string;
  seen_count: number | null;
  short_title: string | null;
  coach_takeaway: string | null;
  claim_guardrail: string | null;
  content_angles: string[] | null;
  related_hrefs: string[] | null;
  keywords: string[] | null;
  review_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  promoted_at: string | null;
  rejected_at: string | null;
};

type SupabasePayload = Record<string, unknown>;

export type ScienceInboxStoreResult =
  | {
      stored: true;
      inserted: number;
      updated: number;
      skipped: number;
      tableMissing: false;
    }
  | {
      stored: false;
      inserted: 0;
      updated: 0;
      skipped: number;
      tableMissing: boolean;
      reason: "missing_env" | "table_missing" | "request_failed";
    };

export type ScienceInboxUpdateInput = {
  status?: ScienceInboxStatus;
  shortTitle?: string;
  coachTakeaway?: string;
  claimGuardrail?: string;
  contentAngles?: string[];
  relatedHrefs?: string[];
  keywords?: string[];
  reviewNotes?: string;
  reviewedBy?: string;
};

export type ScienceInboxUpdateResult =
  | { updated: true; item: ScienceInboxItem }
  | {
      updated: false;
      reason:
        | "missing_env"
        | "table_missing"
        | "request_failed"
        | "not_found"
        | "invalid_promotion";
      message?: string;
    };

export type WeeklyScienceIssueSeed = {
  issueId: string;
  path: string;
  dateLabel: string;
  title: string;
  summary: string;
  editorialNote: string;
  coachingTheme: string;
  claimGuardrail: string;
  sourceCount: number;
  sourcePmids: string[];
  topics: ScienceTopic[];
  studies: Array<{
    pmid: string;
    title: string;
    shortTitle: string;
    topic: ScienceTopic;
    evidenceType: string;
    journal: string;
    sourceUrl: string;
    coachTakeaway: string;
    claimGuardrail: string;
    contentAngles: string[];
    relatedHrefs: string[];
    keywords: string[];
  }>;
};

export type WeeklySciencePublicationPlan = {
  generatedAt: string;
  targetIssueId: string;
  targetIssuePath: string;
  targetDateLabel: string;
  status:
    | "ready_for_issue_draft"
    | "needs_promoted_studies"
    | "needs_review"
    | "needs_fresh_scan";
  nextAction: string;
  statusCounts: Record<ScienceInboxStatus, number>;
  weeklyIssueSeed: WeeklyScienceIssueSeed | null;
};

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function getSupabaseConfig(env: Record<string, string | undefined> = process.env) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;

  if (!url || !key) return null;

  return {
    url: normalizeSupabaseUrl(url),
    key,
  };
}

function supabaseHeaders(key: string, prefer?: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function readSupabaseError(res: Response) {
  return (await res.text().catch(() => "")).slice(0, 240);
}

function isTableMissing(res: Response, body = "") {
  return res.status === 404 || body.includes("science_inbox_items");
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function nextMonday(from = new Date()) {
  const date = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()),
  );
  const day = date.getUTCDay();
  const daysUntilNextMonday = day === 1 ? 7 : (8 - day) % 7 || 7;
  date.setUTCDate(date.getUTCDate() + daysUntilNextMonday);
  return date;
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function listForTitle(values: string[]) {
  const cleaned = unique(values.map((value) => value.toLowerCase())).slice(0, 4);
  if (!cleaned.length) return "new reviewed studies";
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned.at(-1)}`;
}

function cleanString(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanStringArray(value: unknown, maxItems = 8, maxLength = 160) {
  if (!Array.isArray(value)) return [];
  return unique(
    value
      .map((item) => cleanString(item, maxLength))
      .filter(Boolean)
      .slice(0, maxItems),
  );
}

function yearFromPubDate(pubDate: string) {
  const match = pubDate.match(/\b(19|20)\d{2}\b/);
  return match?.[0] || "Recent";
}

function itemIdForPmid(pmid: string) {
  return `pubmed-${pmid}`;
}

function rowToItem(row: ScienceInboxRow): ScienceInboxItem {
  return {
    pmid: row.pmid,
    title: row.title,
    topic: row.topic,
    evidenceType: row.evidence_type,
    journal: row.journal,
    pubDate: row.pub_date,
    authors: row.authors,
    sourceUrl: row.source_url,
    doiUrl: row.doi_url || undefined,
    queryIds: row.query_ids ?? [],
    queryLabels: row.query_labels ?? [],
    cadences: row.cadences ?? [],
    status: row.status,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    seenCount: row.seen_count ?? 1,
    shortTitle: row.short_title || undefined,
    coachTakeaway: row.coach_takeaway || undefined,
    claimGuardrail: row.claim_guardrail || undefined,
    contentAngles: row.content_angles ?? [],
    relatedHrefs: row.related_hrefs ?? [],
    keywords: row.keywords ?? [],
    reviewNotes: row.review_notes || undefined,
    reviewedBy: row.reviewed_by || undefined,
    reviewedAt: row.reviewed_at || undefined,
    promotedAt: row.promoted_at || undefined,
    rejectedAt: row.rejected_at || undefined,
  };
}

export function scienceInboxItemToStudy(item: ScienceInboxItem): ScienceStudy {
  return {
    id: itemIdForPmid(item.pmid),
    title: item.title,
    shortTitle: item.shortTitle || item.title,
    topic: item.topic,
    evidenceType: item.evidenceType,
    year: yearFromPubDate(item.pubDate),
    journal: item.journal,
    authors: item.authors,
    pubmedId: item.pmid,
    sourceUrl: item.sourceUrl,
    doiUrl: item.doiUrl,
    origin: "science_inbox_promoted",
    coachTakeaway:
      item.coachTakeaway ||
      "Reviewed in the Geebs science inbox and approved as a practical coaching signal.",
    claimGuardrail:
      item.claimGuardrail ||
      "Keep the claim tied to the study design, population, and measured outcome.",
    contentAngles: item.contentAngles.length
      ? item.contentAngles
      : ["Fresh peer-reviewed study for a Geebs science post"],
    relatedHrefs: item.relatedHrefs.length
      ? item.relatedHrefs
      : DEFAULT_RELATED_HREFS,
    keywords: item.keywords.length
      ? item.keywords
      : [item.topic.toLowerCase(), "PubMed", "peer-reviewed"],
  };
}

async function fetchExistingRow(
  config: { url: string; key: string },
  pmid: string,
): Promise<ScienceInboxRow | null | "table_missing"> {
  const res = await fetch(
    `${config.url}/rest/v1/${SUPABASE_TABLE}?pmid=eq.${encodeURIComponent(
      pmid,
    )}&select=*`,
    {
      headers: supabaseHeaders(config.key),
    },
  );

  if (res.ok) {
    const rows = (await res.json().catch(() => [])) as ScienceInboxRow[];
    return rows[0] ?? null;
  }

  const body = await readSupabaseError(res);
  if (isTableMissing(res, body)) return "table_missing";

  console.error(`science_inbox.read: supabase ${res.status} ${body}`);
  return null;
}

function candidatePayload({
  candidate,
  cadence,
  existing,
}: {
  candidate: PubMedStudyCandidate;
  cadence: PubMedScanResult["cadence"];
  existing?: ScienceInboxRow | null;
}) {
  const now = new Date().toISOString();
  const queryIds = unique([...(existing?.query_ids ?? []), candidate.queryId]);
  const queryLabels = unique([
    ...(existing?.query_labels ?? []),
    candidate.queryLabel,
  ]);
  const cadences = unique([...(existing?.cadences ?? []), cadence]);

  return {
    pmid: candidate.pmid,
    title: candidate.title,
    topic: candidate.topic,
    evidence_type: candidate.evidenceType,
    journal: candidate.journal,
    pub_date: candidate.pubDate,
    authors: candidate.authors,
    source_url: candidate.sourceUrl,
    doi_url: candidate.doiUrl ?? null,
    query_ids: queryIds,
    query_labels: queryLabels,
    cadences,
    first_seen_at: existing?.first_seen_at ?? now,
    last_seen_at: now,
    seen_count: (existing?.seen_count ?? 0) + 1,
    payload: candidate,
    updated_at: now,
  };
}

async function insertCandidate(
  config: { url: string; key: string },
  payload: SupabasePayload,
) {
  return await fetch(`${config.url}/rest/v1/${SUPABASE_TABLE}`, {
    method: "POST",
    headers: supabaseHeaders(config.key, "return=minimal"),
    body: JSON.stringify(payload),
  });
}

async function patchCandidate(
  config: { url: string; key: string },
  pmid: string,
  payload: SupabasePayload,
) {
  return await fetch(
    `${config.url}/rest/v1/${SUPABASE_TABLE}?pmid=eq.${encodeURIComponent(
      pmid,
    )}`,
    {
      method: "PATCH",
      headers: supabaseHeaders(config.key, "return=minimal"),
      body: JSON.stringify(payload),
    },
  );
}

export async function storeScienceScanInInbox(
  scan: PubMedScanResult,
): Promise<ScienceInboxStoreResult> {
  const config = getSupabaseConfig();

  if (!config) {
    console.warn(
      "science_inbox.store: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY unset - skipping durable candidate capture",
    );
    return {
      stored: false,
      inserted: 0,
      updated: 0,
      skipped: scan.studies.length,
      tableMissing: false,
      reason: "missing_env",
    };
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const candidate of scan.studies) {
    try {
      const existing = await fetchExistingRow(config, candidate.pmid);
      if (existing === "table_missing") {
        return {
          stored: false,
          inserted: 0,
          updated: 0,
          skipped: scan.studies.length,
          tableMissing: true,
          reason: "table_missing",
        };
      }

      const payload = candidatePayload({
        candidate,
        cadence: scan.cadence,
        existing,
      });
      const res = existing
        ? await patchCandidate(config, candidate.pmid, payload)
        : await insertCandidate(config, payload);

      if (res.ok) {
        if (existing) updated += 1;
        else inserted += 1;
        continue;
      }

      const body = await readSupabaseError(res);
      if (isTableMissing(res, body)) {
        return {
          stored: false,
          inserted: 0,
          updated: 0,
          skipped: scan.studies.length,
          tableMissing: true,
          reason: "table_missing",
        };
      }

      skipped += 1;
      console.error(`science_inbox.store: supabase ${res.status} ${body}`);
    } catch (error) {
      skipped += 1;
      console.error("science_inbox.store: candidate write failed", error);
    }
  }

  return { stored: true, inserted, updated, skipped, tableMissing: false };
}

export async function getScienceInboxItems({
  status,
  limit = 12,
}: {
  status?: ScienceInboxStatus;
  limit?: number;
} = {}): Promise<ScienceInboxItem[]> {
  const config = getSupabaseConfig();
  if (!config) return [];

  const filters = status ? `status=eq.${status}&` : "";
  const res = await fetch(
    `${config.url}/rest/v1/${SUPABASE_TABLE}?${filters}select=*&order=last_seen_at.desc&limit=${limit}`,
    {
      headers: supabaseHeaders(config.key),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const body = await readSupabaseError(res);
    if (!isTableMissing(res, body)) {
      console.error(`science_inbox.list: supabase ${res.status} ${body}`);
    }
    return [];
  }

  const rows = (await res.json().catch(() => [])) as ScienceInboxRow[];
  return rows.map(rowToItem);
}

export async function getPromotedScienceStudies(limit = 24) {
  const items = await getScienceInboxItems({ status: "promoted", limit });
  return items.map(scienceInboxItemToStudy);
}

export async function buildWeeklySciencePublicationPlan({
  from = new Date(),
  limit = 24,
}: {
  from?: Date;
  limit?: number;
} = {}): Promise<WeeklySciencePublicationPlan> {
  const [newItems, reviewedItems, promotedItems, rejectedItems] =
    await Promise.all([
      getScienceInboxItems({ status: "new", limit }),
      getScienceInboxItems({ status: "reviewed", limit }),
      getScienceInboxItems({ status: "promoted", limit }),
      getScienceInboxItems({ status: "rejected", limit }),
    ]);
  const promotedStudies = promotedItems.map(scienceInboxItemToStudy);
  const weeklyIssueSeed = buildWeeklyScienceIssueSeed(promotedStudies, from);
  const targetIssueDate = weeklyIssueSeed
    ? new Date(`${weeklyIssueSeed.issueId}T00:00:00.000Z`)
    : nextMonday(from);
  const targetIssueId = weeklyIssueSeed?.issueId ?? isoDate(targetIssueDate);
  const statusCounts = {
    new: newItems.length,
    reviewed: reviewedItems.length,
    promoted: promotedItems.length,
    rejected: rejectedItems.length,
  };

  let status: WeeklySciencePublicationPlan["status"] = "needs_fresh_scan";
  let nextAction =
    "Run the daily and weekly PubMed scans, then review the strongest peer-reviewed studies for coaching usefulness.";

  if (weeklyIssueSeed) {
    status = "ready_for_issue_draft";
    nextAction =
      "Draft the dated Weekly Science Drop from the promoted studies, keeping one practical coaching move and one clear claim boundary per source.";
  } else if (reviewedItems.length) {
    status = "needs_promoted_studies";
    nextAction =
      "Promote reviewed studies that have a practical coaching takeaway, a claim boundary, and a source trail.";
  } else if (newItems.length) {
    status = "needs_review";
    nextAction =
      "Review new peer-reviewed candidates, reject weak fits, and promote the studies that answer real client questions.";
  }

  return {
    generatedAt: new Date().toISOString(),
    targetIssueId,
    targetIssuePath: `/science/weekly-digest/${targetIssueId}`,
    targetDateLabel: dateLabel(targetIssueDate),
    status,
    nextAction,
    statusCounts,
    weeklyIssueSeed,
  };
}

function validatePromotion(payload: SupabasePayload) {
  const required = ["short_title", "coach_takeaway", "claim_guardrail"];
  const missing = required.filter((field) => !cleanString(payload[field]));
  if (missing.length) {
    return `Promoted studies require ${missing.join(", ")}.`;
  }

  if (!cleanStringArray(payload.content_angles).length) {
    return "Promoted studies require at least one content angle.";
  }

  return "";
}

export async function updateScienceInboxItem(
  pmid: string,
  input: ScienceInboxUpdateInput,
): Promise<ScienceInboxUpdateResult> {
  const config = getSupabaseConfig();
  if (!config) return { updated: false, reason: "missing_env" };

  const existing = await fetchExistingRow(config, pmid);
  if (existing === "table_missing") {
    return { updated: false, reason: "table_missing" };
  }
  if (!existing) return { updated: false, reason: "not_found" };

  const now = new Date().toISOString();
  const status = input.status ?? existing.status;
  const payload: SupabasePayload = {
    updated_at: now,
    status,
  };

  if (input.shortTitle !== undefined) {
    payload.short_title = cleanString(input.shortTitle, 160) || null;
  }
  if (input.coachTakeaway !== undefined) {
    payload.coach_takeaway = cleanString(input.coachTakeaway, 700) || null;
  }
  if (input.claimGuardrail !== undefined) {
    payload.claim_guardrail = cleanString(input.claimGuardrail, 700) || null;
  }
  if (input.contentAngles !== undefined) {
    payload.content_angles = cleanStringArray(input.contentAngles, 6, 120);
  }
  if (input.relatedHrefs !== undefined) {
    payload.related_hrefs = cleanStringArray(input.relatedHrefs, 8, 160);
  }
  if (input.keywords !== undefined) {
    payload.keywords = cleanStringArray(input.keywords, 12, 80);
  }
  if (input.reviewNotes !== undefined) {
    payload.review_notes = cleanString(input.reviewNotes, 1000) || null;
  }
  if (input.reviewedBy !== undefined) {
    payload.reviewed_by = cleanString(input.reviewedBy, 120) || null;
  }

  if (status === "reviewed" && existing.status !== "reviewed") {
    payload.reviewed_at = now;
  }
  if (status === "promoted") {
    const promotionPayload = {
      ...existing,
      ...payload,
      short_title: payload.short_title ?? existing.short_title,
      coach_takeaway: payload.coach_takeaway ?? existing.coach_takeaway,
      claim_guardrail: payload.claim_guardrail ?? existing.claim_guardrail,
      content_angles: payload.content_angles ?? existing.content_angles,
    };
    const message = validatePromotion(promotionPayload);
    if (message) {
      return { updated: false, reason: "invalid_promotion", message };
    }
    payload.reviewed_at = existing.reviewed_at ?? now;
    payload.promoted_at = existing.promoted_at ?? now;
  }
  if (status === "rejected" && existing.status !== "rejected") {
    payload.rejected_at = now;
  }

  const res = await fetch(
    `${config.url}/rest/v1/${SUPABASE_TABLE}?pmid=eq.${encodeURIComponent(
      pmid,
    )}`,
    {
      method: "PATCH",
      headers: supabaseHeaders(config.key, "return=representation"),
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const body = await readSupabaseError(res);
    if (isTableMissing(res, body)) {
      return { updated: false, reason: "table_missing" };
    }
    console.error(`science_inbox.update: supabase ${res.status} ${body}`);
    return { updated: false, reason: "request_failed" };
  }

  const rows = (await res.json().catch(() => [])) as ScienceInboxRow[];
  const row = rows[0];
  if (!row) return { updated: false, reason: "not_found" };

  return { updated: true, item: rowToItem(row) };
}

export function mergeScienceStudies(
  staticStudies: ScienceStudy[],
  promotedStudies: ScienceStudy[],
) {
  const staticPmids = new Set(staticStudies.map((study) => study.pubmedId));
  const uniquePromoted = promotedStudies.filter(
    (study) => !study.pubmedId || !staticPmids.has(study.pubmedId),
  );

  return [...uniquePromoted, ...staticStudies];
}

export function buildWeeklyScienceIssueSeed(
  promotedStudies: ScienceStudy[],
  from = new Date(),
): WeeklyScienceIssueSeed | null {
  const uniqueStudies = unique(
    promotedStudies.filter((study) => study.pubmedId).map((study) => study.pubmedId!),
  )
    .map((pmid) => promotedStudies.find((study) => study.pubmedId === pmid))
    .filter((study): study is ScienceStudy => Boolean(study))
    .slice(0, 8);

  if (!uniqueStudies.length) return null;

  const issueDate = nextMonday(from);
  const issueId = isoDate(issueDate);
  const topics = unique(uniqueStudies.map((study) => study.topic));
  const topicList = listForTitle(topics);
  const sourcePmids = uniqueStudies
    .map((study) => study.pubmedId)
    .filter((pmid): pmid is string => Boolean(pmid));

  return {
    issueId,
    path: `/science/weekly-digest/${issueId}`,
    dateLabel: dateLabel(issueDate),
    title: `Weekly Science Drop: ${topicList}`,
    summary: `A reviewed Weekly Science Drop issue seed built from ${uniqueStudies.length} promoted PubMed-backed ${uniqueStudies.length === 1 ? "study" : "studies"} across ${topicList}.`,
    editorialNote:
      "Each source below gets one coaching move, one honest limit, and a linked PubMed source before this issue is published.",
    coachingTheme:
      "Turn each source into one practical behavior, one coaching interpretation, and one clear boundary on what the study does not prove.",
    claimGuardrail:
      "Do not claim one study proves a guaranteed result. Keep each takeaway tied to the study design, population, and measured outcome.",
    sourceCount: uniqueStudies.length,
    sourcePmids,
    topics,
    studies: uniqueStudies.map((study) => ({
      pmid: study.pubmedId!,
      title: study.title,
      shortTitle: study.shortTitle,
      topic: study.topic,
      evidenceType: study.evidenceType,
      journal: study.journal,
      sourceUrl: study.sourceUrl,
      coachTakeaway: study.coachTakeaway,
      claimGuardrail: study.claimGuardrail,
      contentAngles: study.contentAngles,
      relatedHrefs: study.relatedHrefs,
      keywords: study.keywords,
    })),
  };
}

export function scienceAdminAuthorized(request: Request) {
  const secret =
    process.env.SCIENCE_INBOX_SECRET?.trim() || process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization");

  return Boolean(secret) && authHeader === `Bearer ${secret}`;
}

export function scienceInboxApiExample(pmid: string) {
  return {
    method: "PATCH",
    url: `${SITE_URL}/api/science/inbox/${pmid}`,
    body: {
      status: "promoted",
      shortTitle: "Practical title Kris can say",
      coachTakeaway: "What this changes in coaching.",
      claimGuardrail: "What not to overclaim.",
      contentAngles: ["One IG carousel angle"],
      relatedHrefs: ["/science", "/methodology"],
      keywords: ["sleep", "fitness"],
    },
  };
}

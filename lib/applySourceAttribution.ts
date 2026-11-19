export const APPLY_CLICK_SOURCE_KEY = "geebs_apply_click_source";
export const LAST_NON_APPLY_PATH_KEY = "geebs_last_non_apply_path";
export const LANDING_PATH_KEY = "geebs_landing_path";
export const FIRST_TOUCH_ATTRIBUTION_KEY = "geebs_first_touch_attribution";
export const CURRENT_TOUCH_ATTRIBUTION_KEY = "geebs_current_touch_attribution";

type StorageLike = Pick<Storage, "getItem">;
type WritableStorageLike = Pick<Storage, "getItem" | "setItem">;

export type StoredApplyClickSource = {
  entry_path?: string;
  click_source?: string;
  link_kind?: string;
  target_path?: string;
  ts?: number;
};

export type StoredCampaignTouch = {
  landing_path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  source_creative_id?: string;
  ts?: number;
};

export type ResolvedApplyAttribution = {
  source_path: string;
  landing_path: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  source_creative_id: string;
  current_utm_source: string;
  current_utm_medium: string;
  current_utm_campaign: string;
  current_utm_content: string;
  current_source_creative_id: string;
  test_run_id: string;
};

function cleanInternalPath(value: string | null | undefined): string {
  const raw = String(value || "").trim();
  if (!raw.startsWith("/")) return "";
  if (raw.startsWith("//")) return "";

  try {
    const parsed = new URL(raw, "https://gainsfromgeebs.com");
    const safeParams = new URLSearchParams();
    const allowed = [
      "package",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "creative_id",
      "source_creative_id",
    ];
    for (const key of allowed) {
      const valueForKey = cleanCampaignValue(parsed.searchParams.get(key), 120);
      if (valueForKey) safeParams.set(key, valueForKey);
    }
    return `${parsed.pathname}${safeParams.toString() ? `?${safeParams}` : ""}`.slice(
      0,
      360,
    );
  } catch {
    return raw.split("?")[0].slice(0, 240);
  }
}

export function safeApplySourcePath(
  value: string | null | undefined,
): string {
  return cleanInternalPath(value);
}

function cleanCampaignValue(
  value: string | null | undefined,
  maxLength = 80,
): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_/-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, maxLength);
}

function hostFromUrl(value: string | null | undefined): string {
  try {
    return new URL(String(value || "")).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function sameOriginPathFromUrl(
  value: string | null | undefined,
  currentOrigin: string,
): string {
  try {
    const parsed = new URL(String(value || ""));
    if (parsed.origin !== new URL(currentOrigin).origin) return "";
    return cleanInternalPath(`${parsed.pathname}${parsed.search}`);
  } catch {
    return "";
  }
}

function safeJsonParse<T extends object>(value: string | null): T | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object"
      ? (parsed as T)
      : null;
  } catch {
    return null;
  }
}

export function readStoredApplyClickSource(
  storage: StorageLike | null | undefined,
): StoredApplyClickSource | null {
  return safeJsonParse<StoredApplyClickSource>(
    storage?.getItem(APPLY_CLICK_SOURCE_KEY) ?? null,
  );
}

export function readStoredCampaignTouch(
  storage: StorageLike | null | undefined,
  key: typeof FIRST_TOUCH_ATTRIBUTION_KEY | typeof CURRENT_TOUCH_ATTRIBUTION_KEY,
): StoredCampaignTouch | null {
  return safeJsonParse<StoredCampaignTouch>(storage?.getItem(key) ?? null);
}

function sourceAndMediumForReferrer(
  referrer: string | null | undefined,
  currentOrigin: string,
): { source: string; medium: string } {
  const referrerHost = hostFromUrl(referrer);
  const currentHost = hostFromUrl(currentOrigin);
  if (!referrerHost || referrerHost === currentHost) {
    return { source: "direct", medium: "direct" };
  }

  const socialHosts = ["instagram.com", "tiktok.com", "youtube.com", "youtu.be"];
  if (socialHosts.some((host) => referrerHost === host || referrerHost.endsWith(`.${host}`))) {
    return {
      source: referrerHost.replace(/\.com$/, ""),
      medium: "social",
    };
  }

  const searchHosts = ["google.", "bing.com", "search.yahoo.", "duckduckgo.com"];
  if (searchHosts.some((host) => referrerHost.includes(host))) {
    return { source: referrerHost, medium: "organic" };
  }

  return { source: referrerHost, medium: "referral" };
}

function touchFromLocation({
  pathname,
  search,
  referrer,
  currentOrigin,
  now,
}: {
  pathname: string;
  search: string;
  referrer?: string;
  currentOrigin: string;
  now: number;
}): StoredCampaignTouch {
  const params = new URLSearchParams(search);
  const referrerAttribution = sourceAndMediumForReferrer(referrer, currentOrigin);
  const source =
    cleanCampaignValue(params.get("utm_source")) || referrerAttribution.source;
  const medium =
    cleanCampaignValue(params.get("utm_medium")) || referrerAttribution.medium;
  const campaign = cleanCampaignValue(params.get("utm_campaign"));
  const content = cleanCampaignValue(params.get("utm_content"), 120);
  const creativeId = cleanCampaignValue(
    params.get("source_creative_id") || params.get("creative_id") || content,
    120,
  );

  return {
    landing_path: cleanInternalPath(`${pathname}${search}`) || "/",
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
    source_creative_id: creativeId,
    ts: now,
  };
}

export function rememberCampaignAttribution({
  pathname,
  search,
  referrer,
  currentOrigin,
  storage,
  now = Date.now(),
}: {
  pathname: string;
  search: string;
  referrer?: string;
  currentOrigin: string;
  storage: WritableStorageLike;
  now?: number;
}): { firstTouch: StoredCampaignTouch; currentTouch: StoredCampaignTouch } {
  const locationTouch = touchFromLocation({
    pathname,
    search,
    referrer,
    currentOrigin,
    now,
  });
  const existingFirst = readStoredCampaignTouch(
    storage,
    FIRST_TOUCH_ATTRIBUTION_KEY,
  );
  const params = new URLSearchParams(search);
  const hasExplicitCampaign = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "source_creative_id",
    "creative_id",
  ].some((key) => Boolean(params.get(key)));
  const referrerAttribution = sourceAndMediumForReferrer(referrer, currentOrigin);
  const hasExternalReferrer = referrerAttribution.medium !== "direct";
  const existingCurrent = readStoredCampaignTouch(
    storage,
    CURRENT_TOUCH_ATTRIBUTION_KEY,
  );

  const firstTouch = existingFirst || locationTouch;
  const currentTouch =
    hasExplicitCampaign || hasExternalReferrer || !existingCurrent
      ? locationTouch
      : existingCurrent;

  if (!existingFirst) {
    storage.setItem(FIRST_TOUCH_ATTRIBUTION_KEY, JSON.stringify(firstTouch));
  }
  storage.setItem(CURRENT_TOUCH_ATTRIBUTION_KEY, JSON.stringify(currentTouch));

  return { firstTouch, currentTouch };
}

export function resolveApplyAttribution({
  pathname,
  search,
  referrer,
  currentOrigin,
  storage,
}: {
  pathname: string;
  search: string;
  referrer?: string;
  currentOrigin: string;
  storage?: StorageLike | null;
}): ResolvedApplyAttribution {
  const params = new URLSearchParams(search);
  const storedClick = readStoredApplyClickSource(storage);
  const storedFirstTouch = readStoredCampaignTouch(
    storage,
    FIRST_TOUCH_ATTRIBUTION_KEY,
  );
  const storedCurrentTouch = readStoredCampaignTouch(
    storage,
    CURRENT_TOUCH_ATTRIBUTION_KEY,
  );
  const explicitEntryPath = cleanInternalPath(params.get("entry_path"));
  const explicitLandingPath = cleanInternalPath(params.get("landing_path"));
  const lastNonApplyPath = cleanInternalPath(
    storage?.getItem(LAST_NON_APPLY_PATH_KEY),
  );
  const sameOriginReferrerPath = sameOriginPathFromUrl(referrer, currentOrigin);
  const landingPath =
    explicitLandingPath || cleanInternalPath(storage?.getItem(LANDING_PATH_KEY));
  const entryPath =
    explicitEntryPath ||
    cleanInternalPath(storedClick?.entry_path) ||
    lastNonApplyPath ||
    (sameOriginReferrerPath.startsWith("/apply") ? "" : sameOriginReferrerPath);
  const clickSource =
    cleanCampaignValue(params.get("entry_source")) ||
    cleanCampaignValue(storedClick?.click_source);
  const linkKind =
    cleanCampaignValue(params.get("entry_link_kind")) ||
    cleanCampaignValue(storedClick?.link_kind);
  const referrerHost = hostFromUrl(referrer);
  const currentHost = hostFromUrl(currentOrigin);
  const externalReferrerHost =
    referrerHost && referrerHost !== currentHost ? referrerHost : "";
  const currentApplyPath = cleanInternalPath(`${pathname}${search}`) || "/apply";

  // Build source_path from an allowlist. Application contact fields, booking
  // destinations, and arbitrary query parameters must never reach analytics or
  // the attribution record.
  const sourcePathParams = new URLSearchParams();
  for (const key of [
    "package",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "creative_id",
    "source_creative_id",
    "test_run_id",
  ]) {
    const clean = cleanCampaignValue(params.get(key), 120);
    if (clean) sourcePathParams.set(key, clean);
  }
  if (entryPath && !sourcePathParams.has("entry_path")) {
    sourcePathParams.set("entry_path", entryPath);
  }
  if (clickSource && !sourcePathParams.has("entry_source")) {
    sourcePathParams.set("entry_source", clickSource);
  }
  if (linkKind && !sourcePathParams.has("entry_link_kind")) {
    sourcePathParams.set("entry_link_kind", linkKind);
  }
  if (
    landingPath &&
    landingPath !== entryPath &&
    landingPath !== currentApplyPath &&
    !sourcePathParams.has("landing_path")
  ) {
    sourcePathParams.set("landing_path", landingPath);
  }
  if (externalReferrerHost && !sourcePathParams.has("referrer_host")) {
    sourcePathParams.set("referrer_host", externalReferrerHost);
  }

  const instagramReferrer =
    externalReferrerHost === "instagram.com" ||
    externalReferrerHost.endsWith(".instagram.com");

  const entrySlug = cleanCampaignValue(
    entryPath.replace(/^\//, "").replace(/\//g, "_"),
  );
  const explicitTouch = touchFromLocation({
    pathname,
    search,
    referrer,
    currentOrigin,
    now: Date.now(),
  });
  const explicitCampaign = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "source_creative_id",
    "creative_id",
  ].some((key) => Boolean(params.get(key)));
  const fallbackTouch: StoredCampaignTouch = {
    ...explicitTouch,
    landing_path: landingPath || explicitTouch.landing_path,
    utm_source:
      explicitCampaign || externalReferrerHost
        ? explicitTouch.utm_source
        : entryPath
          ? "site"
          : "direct",
    utm_medium:
      explicitCampaign || externalReferrerHost
        ? explicitTouch.utm_medium
        : entryPath
          ? "internal"
          : "direct",
    utm_campaign:
      explicitTouch.utm_campaign ||
      (entrySlug ? `apply_from_${entrySlug}` : "direct_apply"),
  };
  const firstTouch = storedFirstTouch || fallbackTouch;
  const currentTouch = explicitCampaign
    ? explicitTouch
    : storedCurrentTouch || fallbackTouch;

  return {
    source_path: `${cleanInternalPath(pathname) || "/apply"}${
      sourcePathParams.toString() ? `?${sourcePathParams.toString()}` : ""
    }`,
    landing_path: cleanInternalPath(firstTouch.landing_path) || landingPath || "/apply",
    utm_source:
      cleanCampaignValue(firstTouch.utm_source) ||
      (instagramReferrer ? "instagram" : externalReferrerHost || (entryPath ? "site" : "direct")),
    utm_medium:
      cleanCampaignValue(firstTouch.utm_medium) ||
      (instagramReferrer ? "social" : externalReferrerHost ? "referral" : entryPath ? "internal" : "direct"),
    utm_campaign:
      cleanCampaignValue(firstTouch.utm_campaign) ||
      (entrySlug ? `apply_from_${entrySlug}` : "direct_apply"),
    utm_content: cleanCampaignValue(firstTouch.utm_content, 120),
    source_creative_id: cleanCampaignValue(firstTouch.source_creative_id, 120),
    current_utm_source: cleanCampaignValue(currentTouch.utm_source) || "direct",
    current_utm_medium: cleanCampaignValue(currentTouch.utm_medium) || "direct",
    current_utm_campaign: cleanCampaignValue(currentTouch.utm_campaign),
    current_utm_content: cleanCampaignValue(currentTouch.utm_content, 120),
    current_source_creative_id: cleanCampaignValue(
      currentTouch.source_creative_id,
      120,
    ),
    test_run_id: cleanCampaignValue(params.get("test_run_id"), 120),
  };
}

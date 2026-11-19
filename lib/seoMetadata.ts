export const SEO_TITLE_MAX_LENGTH = 75;

/** Keep rendered titles within Semrush's long-title boundary without splitting words. */
export function fitSeoTitle(
  title: string,
  suffix = " | Geebs",
  maxLength = SEO_TITLE_MAX_LENGTH,
) {
  if (title.length <= maxLength) return title;

  const unbranded = title.replace(/\s+\|\s+Geebs(?: Coaching| Science(?: Source| Drop)?)?$/, "");
  const available = maxLength - suffix.length;
  const candidate = unbranded.slice(0, available + 1);
  const lastWordBoundary = candidate.lastIndexOf(" ");
  const compact = (lastWordBoundary > available * 0.65
    ? candidate.slice(0, lastWordBoundary)
    : unbranded.slice(0, available)
  ).trimEnd();
  const clean = compact
    .replace(
      /(?:[\s,:;\-–—]+\b(?:a|an|and|for|in|not|of|on|or|the|to|vs\.?|whether|with)\b)+[,:;\-–—]*$/i,
      "",
    )
    .replace(/[,:;\-–—]+$/, "")
    .trimEnd();

  return `${clean || compact}${suffix}`;
}

/** Build a unique, bounded study description from the study-specific takeaway. */
export function scienceStudyDescription(
  shortTitle: string,
  evidenceType: string,
  journal: string,
  maxLength = 158,
) {
  const description = `${shortTitle}. ${evidenceType} from ${journal}. Read the coaching takeaway, honest limits, and PubMed source.`;
  if (description.length <= maxLength) return description;

  const candidate = description.slice(0, maxLength - 1);
  const lastWordBoundary = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, lastWordBoundary).trimEnd()}.`;
}

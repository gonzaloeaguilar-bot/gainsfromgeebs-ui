// IG DM funnel keyword → destination map.
//
// The custom Instagram DM bot (ManyChat / custom webhook) sends inbound
// messages here. When a known keyword is detected we return a tracked link to
// the matching on-site tool/resource so every DM-driven click is attributable
// in GA4 + Metricool via consistent UTM params.
//
// IMPORTANT: destinations are the REAL canonical routes on the site. The
// original funnel spec referenced bare paths like "/macro-calculator" and
// "/busy-guy-training-plan"; those 404 here. The live routes are
// "/tools/macro-calculator" and "/resources/busy-guy-training-plan". We emit
// slash-less paths (the site runs trailingSlash:false, so canonical URLs have
// no trailing slash) to avoid a redirect hop on the DM click.

export const IG_FUNNEL_UTM = {
  utm_source: "instagram",
  utm_medium: "dm_auto",
  utm_campaign: "ig_funnel",
} as const;

export const IG_HANDOFF_UTM = {
  utm_source: "instagram",
  utm_medium: "dm_handoff",
  utm_campaign: "coaching_handoff",
} as const;

export const SITE_URL = "https://gainsfromgeebs.com";

export type FunnelKeyword = "MACROS" | "RECOMP" | "INTENSITY" | "BUSY" | "DEFICIT";

type KeywordTarget = {
  /** Canonical on-site path (slash-less, no query). */
  path: string;
  /** Short DM reply copy sent alongside the link. */
  reply: string;
};

// Keyword → destination. Keys are uppercase; matching is case-insensitive.
export const FUNNEL_KEYWORDS: Record<FunnelKeyword, KeywordTarget> = {
  MACROS: {
    path: "/tools/macro-calculator",
    reply:
      "Here's your free body-recomposition macro calculator — protein, carbs, and fats for your goal:",
  },
  RECOMP: {
    path: "/tools/body-recomposition-calculator",
    reply:
      "Here's your free body-recomposition calculator — an honest read on whether you can build muscle and lose fat at once, plus a calorie + protein target:",
  },
  INTENSITY: {
    path: "/blog/are-you-training-hard-enough",
    reply:
      "Most people undertrain intensity without realizing it. Here's how to know if you're actually training hard enough:",
  },
  BUSY: {
    path: "/resources/busy-guy-training-plan",
    reply:
      "Here's the busy-guy training plan — built for a real work week, not a bodybuilder's schedule:",
  },
  DEFICIT: {
    path: "/tools/calorie-deficit-calculator",
    reply:
      "Here's your free calorie-deficit calculator — plug in your stats and get the exact calories for your cut, no guessing:",
  },
};

/** Build a fully-qualified tracked URL for a keyword target path. */
export function trackedUrl(path: string): string {
  const qs = new URLSearchParams(IG_FUNNEL_UTM).toString();
  return `${SITE_URL}${path}?${qs}`;
}

/**
 * Find the first funnel keyword present in arbitrary inbound text.
 * Whole-word, case-insensitive. Returns null if no keyword matches.
 */
export function detectKeyword(text: string | undefined | null): FunnelKeyword | null {
  if (!text) return null;
  const haystack = text.toUpperCase();
  for (const keyword of Object.keys(FUNNEL_KEYWORDS) as FunnelKeyword[]) {
    // Word-boundary match so "MACROS" doesn't fire inside "MACROSCOPE".
    const re = new RegExp(`\\b${keyword}\\b`);
    if (re.test(haystack)) {
      return keyword;
    }
  }
  return null;
}

export type FunnelResolution = {
  keyword: FunnelKeyword;
  url: string;
  reply: string;
};

export type DmHandoffResolution = {
  url: string;
  reply: string;
  stage: "coaching_application";
};

/** Resolve inbound text to a tracked destination, or null when no match. */
export function resolveFunnel(text: string | undefined | null): FunnelResolution | null {
  const keyword = detectKeyword(text);
  if (!keyword) return null;
  const target = FUNNEL_KEYWORDS[keyword];
  return {
    keyword,
    url: trackedUrl(target.path),
    reply: target.reply,
  };
}

/**
 * Resolve an explicit coaching request to the application, rather than making
 * a high-intent lead choose another resource keyword. This only describes the
 * next step for the DM platform; it does not send a message or create a lead.
 */
export function resolveDmHandoff(
  text: string | undefined | null,
): DmHandoffResolution | null {
  if (!text) return null;
  const isCoachingRequest = /\b(?:apply|application|coach(?:ing)?|work with (?:you|kris)|book(?:ing)?|schedule|consult(?:ation|ing)?|call)\b/i.test(
    text,
  );
  if (!isCoachingRequest) return null;

  const qs = new URLSearchParams(IG_HANDOFF_UTM).toString();
  return {
    url: `${SITE_URL}/apply?${qs}`,
    reply: "If you want to work with Kris, start your 1:1 coaching application here:",
    stage: "coaching_application",
  };
}

/**
 * Pull the user's message text out of the many shapes an inbound webhook
 * payload can take (ManyChat External Request, custom bot, raw form post).
 */
export function extractInboundText(payload: unknown): string | undefined {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return undefined;

  const p = payload as Record<string, unknown>;
  const candidates = [
    p.keyword,
    p.text,
    p.message,
    p.last_input_text, // ManyChat default field
    p.last_text_input,
    p.query,
    p.body,
    // ManyChat nested: { contact: { last_input_text } }
    (p.contact as Record<string, unknown> | undefined)?.last_input_text,
    // Generic messaging: { message: { text } }
    (p.message as Record<string, unknown> | undefined)?.text,
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c;
  }
  return undefined;
}

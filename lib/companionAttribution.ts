export const INSTAGRAM_DM_SESSION_KEY = "geebs_instagram_dm_session";

const INSTAGRAM_DM_MEDIA = new Set(["dm", "dm_auto", "dm_handoff"]);

export function isInstagramDmAttribution(search: string): boolean {
  const params = new URLSearchParams(search);
  const source = params.get("utm_source")?.trim().toLowerCase();
  const medium = params.get("utm_medium")?.trim().toLowerCase();

  return source === "instagram" && Boolean(medium && INSTAGRAM_DM_MEDIA.has(medium));
}

export function isCompanionConversionPath(pathname: string): boolean {
  return (
    pathname === "/apply" ||
    pathname.startsWith("/apply/") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/presentations/")
  );
}

export function hasDedicatedCoachCompanion(pathname: string): boolean {
  return (
    (pathname.startsWith("/blog/") && pathname !== "/blog") ||
    pathname === "/tools/macro-calculator"
  );
}

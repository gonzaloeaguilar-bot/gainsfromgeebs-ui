import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "gainsfromgeebs.com";
const WWW_HOST = `www.${CANONICAL_HOST}`;

function stalePathDestination(pathname: string): string | null {
  if (pathname === "/blog/aG93LW11Y2") {
    return "/blog/how-much-protein-to-lose-fat";
  }

  if (pathname === "/content-studio" || pathname.startsWith("/content-studio/")) {
    return "/";
  }

  if (pathname === "/resources/protein" || pathname === "/resources/protein-") {
    return "/resources/protein-guide";
  }

  return null;
}

export function canonicalizeSiteUrl(
  requestUrl: URL,
  headers: Headers,
): URL | null {
  const forwardedHost = headers.get("x-forwarded-host");
  const hostHeader = headers.get("host");
  const forwardedProto = headers.get("x-forwarded-proto");

  const host = (forwardedHost ?? hostHeader ?? requestUrl.host).toLowerCase();
  const hostname = host.split(":")[0];
  const protocol = (
    forwardedProto ?? requestUrl.protocol.replace(":", "")
  ).toLowerCase();

  const shouldNormalizeHost =
    hostname === CANONICAL_HOST || hostname === WWW_HOST;
  const shouldNormalizeProtocol = shouldNormalizeHost && protocol === "http";
  const destinationPath = stalePathDestination(requestUrl.pathname);

  if (!shouldNormalizeHost && !shouldNormalizeProtocol && !destinationPath) {
    return null;
  }

  if (
    destinationPath ||
    (shouldNormalizeHost && (hostname !== CANONICAL_HOST || protocol !== "https"))
  ) {
    const canonicalUrl = new URL(requestUrl.toString());
    if (destinationPath) {
      canonicalUrl.pathname = destinationPath;
      canonicalUrl.search = "";
      canonicalUrl.hash = "";
    }
    if (shouldNormalizeHost) {
      canonicalUrl.protocol = "https:";
      canonicalUrl.hostname = CANONICAL_HOST;
      canonicalUrl.port = "";
    }
    return canonicalUrl;
  }

  return null;
}

export function proxy(request: NextRequest) {
  const canonicalUrl = canonicalizeSiteUrl(request.nextUrl, request.headers);

  if (canonicalUrl) {
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

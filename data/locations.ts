// Colorado service-area markets for the programmatic /locations/[city] route.
//
// HONESTY MODEL (important): Geebs Coaching is a Denver-based, online-first 1:1
// coaching practice. Kris does NOT have a storefront or office in these
// suburbs. These pages target "online fitness coaching serving <city>" — a
// legitimate service-area framing — and the per-city LocalBusiness schema uses
// areaServed + serviceArea (geo + postal codes), NOT a fabricated street
// PostalAddress that would imply a physical location. That keeps the pages
// out of doorway/misrepresentation territory and avoids GBP/NAP conflicts
// (see [[geebs-gbp-viability-2026-06-11]] — no GBP exists yet).

export type CityLocation = {
  /** URL slug under /locations/. */
  slug: string;
  /** Display name (city or recognized market/neighborhood). */
  name: string;
  /** "City" for incorporated municipalities, "Neighborhood" for Cherry Creek. */
  kind: "City" | "Neighborhood";
  region: "CO";
  /** Representative postal codes for the service area (not a business address). */
  postalCodes: string[];
  /** Centroid coordinates for the service area. */
  lat: number;
  lng: number;
  /** Service radius (miles) used for the GeoCircle service boundary. */
  serviceRadiusMiles: number;
  /** Recognizable local landmarks / sub-areas — gives each page unique content. */
  landmarks: string[];
  /** Minutes / framing of proximity to the Denver hub. */
  proximity: string;
  /** One-paragraph localized intro (unique per market). */
  intro: string;
  /** Who this specific market tends to fit. */
  audience: string;
  /**
   * When true the page canonicalizes to an existing established page and is
   * kept out of the sitemap, to avoid cannibalizing it. Used for Denver, which
   * already owns /personal-training-denver.
   */
  canonicalTo?: string;
  noindex?: boolean;
};

const MI_TO_M = 1609.34;

export const CITY_LOCATIONS: Record<string, CityLocation> = {
  denver: {
    slug: "denver",
    name: "Denver",
    kind: "City",
    region: "CO",
    postalCodes: ["80202", "80203", "80205", "80218"],
    lat: 39.7392,
    lng: -104.9903,
    serviceRadiusMiles: 15,
    landmarks: ["LoDo", "RiNo", "Wash Park", "Capitol Hill", "the Highlands"],
    proximity: "the home base — Kris is based in Denver",
    intro:
      "Geebs Coaching is run out of Denver by Kris Oddo, NASM-CPT. Online 1:1 coaching is the core offer for Denver professionals who train around a real work week, with limited in-person sessions available for qualified local clients.",
    audience:
      "Denver executives, founders, and tech workers who want a coach who actually knows their schedule, not a template.",
    // Denver already has the dedicated /personal-training-denver money page.
    // Accept the route param but consolidate ranking signals there.
    canonicalTo: "/personal-training-denver",
    noindex: true,
  },
  englewood: {
    slug: "englewood",
    name: "Englewood",
    kind: "City",
    region: "CO",
    postalCodes: ["80110", "80112", "80113"],
    lat: 39.6478,
    lng: -104.9878,
    serviceRadiusMiles: 8,
    landmarks: [
      "the Englewood CityCenter",
      "Belleview Park",
      "the South Broadway corridor",
      "the DTC edge",
    ],
    proximity: "about 15 minutes south of downtown Denver",
    intro:
      "Online 1:1 fitness coaching for Englewood, Colorado — built for South-metro and Denver Tech Center professionals who sit in long days and want body recomposition without living in a gym. Coaching is delivered online by Denver-based Kris Oddo, NASM-CPT.",
    audience:
      "DTC professionals and Englewood locals who want structured training and nutrition that survives a desk-heavy week.",
  },
  parker: {
    slug: "parker",
    name: "Parker",
    kind: "City",
    region: "CO",
    postalCodes: ["80134", "80138"],
    lat: 39.5186,
    lng: -104.7614,
    serviceRadiusMiles: 10,
    landmarks: [
      "downtown Parker on Mainstreet",
      "the Parker Fieldhouse",
      "Salisbury Park",
      "the Cottonwood area",
    ],
    proximity: "about 30 minutes southeast of Denver in Douglas County",
    intro:
      "Online fitness coaching for Parker, Colorado — for Douglas County professionals and parents juggling commutes, kids, and a packed calendar who still want to get lean and strong. Coaching is delivered online by Denver-based Kris Oddo, NASM-CPT, so distance from a gym is never the bottleneck.",
    audience:
      "Parker professionals and busy parents who need a plan that flexes around family and a commute, not a rigid gym schedule.",
  },
  "cherry-creek": {
    slug: "cherry-creek",
    name: "Cherry Creek",
    kind: "Neighborhood",
    region: "CO",
    postalCodes: ["80206", "80209", "80246"],
    lat: 39.7196,
    lng: -104.953,
    serviceRadiusMiles: 5,
    landmarks: [
      "the Cherry Creek Shopping District",
      "Cherry Creek North",
      "the Cherry Creek Trail",
      "Pulaski Park",
    ],
    proximity: "just southeast of downtown Denver",
    intro:
      "Online 1:1 fitness coaching for Cherry Creek, Denver — premium body-recomposition coaching for high-income professionals who want a private, high-touch relationship rather than a crowded studio. Programming and accountability are delivered online by Kris Oddo, NASM-CPT.",
    audience:
      "Cherry Creek professionals who want discreet, premium coaching and are ready to invest in the higher-touch path.",
  },
};

export const CITY_SLUGS = Object.keys(CITY_LOCATIONS);

export function getCityLocation(slug: string): CityLocation | undefined {
  return CITY_LOCATIONS[slug];
}

/** Service radius converted to meters for schema.org GeoCircle.geoRadius. */
export function serviceRadiusMeters(city: CityLocation): number {
  return Math.round(city.serviceRadiusMiles * MI_TO_M);
}

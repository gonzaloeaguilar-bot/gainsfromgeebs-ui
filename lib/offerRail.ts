// The shared offer rail: one list of what Kris sells, built from the offer
// catalog (data/offers.json), rendered by components/OfferRail.tsx, and
// insertable on any page. Never hardcode a price or a package name here —
// both come from the catalog and from lib/packageIntent.
import { liveOffers, priceLabel, shopifyUrl, type Offer } from "./offerCatalog";
import { applyPackageHref, type PackageIntent } from "./packageIntent";

/**
 * Catalog id -> the /apply package the card pre-selects. An offer missing from
 * this map has no Geebs application lane (e.g. the Titan Forge intensive) and
 * is left out of the rail rather than pointed at a generic form.
 */
const APPLY_INTENT_BY_OFFER: Record<string, PackageIntent> = {
  "vip-1on1": "premium_1on1_video",
  "standard-check-in": "standard_check_in",
  "weekly-review": "weekly_review",
  "one-time-consultation": "consultation_call",
};

/** Display order, highest-touch first. Ids absent from the catalog are skipped. */
const RAIL_ORDER = [
  "vip-1on1",
  "standard-check-in",
  "weekly-review",
  "one-time-consultation",
  "science-based-community",
] as const;

/**
 * Card mark per offer. Kit icon names, chosen for what the offer IS, not for
 * decoration: the highest-touch tier gets the spark, the self-driven tier gets
 * the chart it is built around, the community gets people.
 */
const ICON_BY_OFFER: Record<string, string> = {
  "vip-1on1": "spark",
  "standard-check-in": "check",
  "weekly-review": "chart",
  "one-time-consultation": "chat",
  "science-based-community": "users",
};

/**
 * The poster art per offer. A rail of packages is scanned, not read, and a card
 * with no picture is a paragraph with a border around it — which is what these
 * were. Every file is a real photograph already in the repo; nothing here is a
 * stock image or a transformation claim.
 *
 * The coaching shots carry a client, so their alt text describes the coaching
 * context only, matching the disclosure CoachingPhotos already carries. The
 * physique shots are Kris himself.
 */
/**
 * The photograph on each tier card, chosen 2026-09-18 from the approved pool
 * at 00_CAROUSEL_GOLD/01_KRIS_BOTTOM_PROOF.
 *
 * Four of the six used to be shirtless physique shots — a back shot with the
 * face turned away on the community card, a post-cut physique on nutrition.
 * That pool is a SOCIAL asset library: of 75 files, the large majority are
 * mirror selfies and physique frames, which is right for a carousel and wrong
 * here. The hero copy on this page sells against "the apps and the influencer
 * plans", and a shelf of physique shots argues the other side of that.
 *
 * So every tier now shows Kris clothed, in a gym, working or approachable, and
 * each crop went through the face-safe rule in that folder's own
 * FACE_SAFE_CROP_POLICY.md: detect the face first, crop to 4:5 with the face
 * centre at 32% so it clears the overlay text band, then ASSERT it did rather
 * than trusting the arithmetic. The crop refuses and picks nothing if the face
 * would be clipped or fall behind the title.
 */
export const IMAGE_BY_OFFER: Record<string, { src: string; alt: string }> = {
  "vip-1on1": {
    src: "/coaching/kris-client-coaching-close.jpg",
    alt: "Kris Oddo watching a client use a chest press machine and cueing hand position during a training session",
  },
  "standard-check-in": {
    src: "/coaching/kris-standard-coaching-porch.jpg",
    alt: "Kris Oddo on his porch, on the phone with a client and talking with his hand, laptop open on the table",
  },
  "weekly-review": {
    src: "/coaching/kris-weekly-review-coach.jpg",
    alt: "Kris Oddo in the gym with his arms crossed, looking toward the camera",
  },
  "nutrition-only": {
    src: "/coaching/kris-nutrition-only-patio.jpg",
    alt: "Kris Oddo sitting back on a patio couch under a pergola on a bright afternoon",
  },
  "one-time-consultation": {
    src: "/coaching/kris-one-time-consult-porch.jpg",
    alt: "Kris Oddo on his porch taking a call, laptop open on the table beside him",
  },
  "science-based-community": {
    src: "/coaching/kris-community-coach.jpg",
    alt: "Kris Oddo walking through the gym with his bag and shaker",
  },
};

export type OfferRailItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  /**
   * Why this one, in a line — who it is for and what it gets them.
   *
   * This sits where the price used to. A price under a title on a rail you
   * are still scanning asks "can you afford it" before anyone has been told
   * what it is, and for the application tiers it said "quoted on the strategy
   * call", which is a sentence about our process, not about the reader. The
   * number is on the card's own detail sheet and on the application, where
   * someone has decided they want it.
   */
  whyThis: string;
  bullets: string[];
  href: string;
  cta: string;
  /**
   * Where the card itself points: /packages, carrying which tier was tapped.
   *
   * The rail intercepts this and opens the detail sheet in place, so the link
   * is rarely followed — but it has to lead somewhere real, because a
   * middle-click, a long-press and a failed hydration all follow it. Landing
   * on /packages with the rail open on that tier is that somewhere.
   *
   * It was `/packages#<id>` first, which read as a deep link and was not one:
   * /packages renders the rail and nothing else, so there has never been an
   * element with that id to scroll to.
   */
  detailsHref: string;
  /** Empty for a checkout card — only application cards carry a package. */
  packageIntent: PackageIntent | "";
  requiresApplication: boolean;
  icon?: string;
  /** Poster art. Absent only if an offer has no photograph in the repo. */
  image?: { src: string; alt: string };
};

function ctaLabel(o: Offer, intent: PackageIntent | ""): string {
  if (!intent) return `Join for ${priceLabel(o.id)}`;
  if (o.id === "one-time-consultation") return "Book the consultation";
  return `Start with ${o.name}`;
}

/**
 * Build the rail. `source` is the surface the rail sits on — it rides along as
 * utm_source on checkout links and as an analytics param, so a rail on a guide
 * page is distinguishable from the one on /packages.
 */
export function offerRailItems(source: string): OfferRailItem[] {
  const byId = new Map(liveOffers("geebs").map((o) => [o.id, o]));

  return RAIL_ORDER.flatMap((id) => {
    const o = byId.get(id);
    if (!o) return [];

    const intent = APPLY_INTENT_BY_OFFER[id] ?? "";
    if (!intent && o.purchase.type !== "shopify") return [];

    return [
      {
        id: o.id,
        eyebrow: o.eyebrow ?? "",
        title: o.name,
        description: o.shortDescription,
        price: priceLabel(o.id),
        whyThis: o.bestFor ?? o.bestForList?.[0] ?? o.shortDescription,
        bullets: (o.includes ?? []).slice(0, 3),
        href: intent ? applyPackageHref(intent) : shopifyUrl(o.id, source),
        detailsHref: `/packages?offer=${o.id}`,
        cta: ctaLabel(o, intent),
        packageIntent: intent,
        requiresApplication: Boolean(intent),
        icon: ICON_BY_OFFER[o.id],
        image: IMAGE_BY_OFFER[o.id],
      },
    ];
  });
}

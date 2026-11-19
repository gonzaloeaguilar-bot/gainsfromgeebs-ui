// Adapter over the generated shared catalog.
//
// lib/offerCatalog.generated.ts is produced from data/offers.json, which is
// vendored from gonzaloeaguilar-bot/offer-catalog — the single source of truth
// for every public Geebs / Titan Forge offer and price. Never hardcode a price
// on a surface; read it from here.
//
// Regenerate: npm run offers:sync
import {
  allOffers,
  liveOffers,
  offer,
  priceLabel,
  shopifyUrl,
  type Offer,
  type PricingTerm,
} from "./offerCatalog.generated";

export { allOffers, liveOffers, offer, priceLabel, shopifyUrl };
export type { Offer, PricingTerm };

/** Shape the existing membership sales page renders. */
export type MembershipOffer = {
  slug: string;
  productId: string;
  productHandle: string;
  productIntent: string;
  title: string;
  shortTitle: string;
  price: number;
  eyebrow: string;
  description: string;
  includes: string[];
  bestFor: string[];
};

function toMembershipOffer(o: Offer): MembershipOffer {
  if (o.purchase.type !== "shopify" || !o.purchase.shopifyHandle)
    throw new Error(`offer-catalog: "${o.id}" is not a Shopify membership`);
  if (o.pricing.amountUsd === undefined)
    throw new Error(`offer-catalog: "${o.id}" has no price to render`);
  return {
    slug: o.id,
    productId: o.shopifyProductId ?? "",
    // Prefer the handle the site already links to. Both resolve to the same
    // product, and a plumbing refactor must not change a live checkout URL.
    productHandle: o.legacyHandle ?? o.purchase.shopifyHandle,
    // Pinned in the catalog, never derived — deriving it would silently change
    // utm_content and break historical attribution.
    productIntent: o.analyticsIntent ?? o.id.replace(/-/g, "_"),
    title: o.fullName ?? o.name,
    shortTitle: o.name,
    price: o.pricing.amountUsd,
    eyebrow: o.eyebrow ?? "",
    description: o.shortDescription,
    includes: o.includes ?? [],
    bestFor: o.bestForList ?? [],
  };
}

/** Membership SKUs, keyed by catalog id. Retired offers can never appear here. */
export const membershipOffers: Record<string, MembershipOffer> = Object.fromEntries(
  liveOffers("geebs")
    .filter((o) => o.purchase.type === "shopify" && o.pricing.model === "monthly")
    .map((o) => [o.id, toMembershipOffer(o)]),
);

export function membershipCheckoutUrl(o: MembershipOffer, source: string) {
  const url = new URL(`https://shop.titanforgefit.com/products/${o.productHandle}`);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "membership_sales_page");
  url.searchParams.set("utm_campaign", "paid_membership");
  url.searchParams.set("utm_content", o.productIntent);
  return url.href;
}

export const MEMBERSHIP_PRICE_MONTHLY = offer("science-based-community").pricing.amountUsd!;
export const CONSULT_PRICE_ONE_TIME = offer("one-time-consultation").pricing.amountUsd!;

export function formatUsd(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

/* ---------------------------------------------------------------------------
 * Prepay terms.
 *
 * The monthly amount stays the anchor; a term is the total for paying that
 * many months up front. Every number below is computed from the catalog, so a
 * price change in the catalog moves the copy on every surface at once and no
 * page can quote a stale figure.
 * ------------------------------------------------------------------------- */

/** Prepay terms on an offer, or an empty list when it has none. */
export function terms(id: string): PricingTerm[] {
  return offer(id).pricing.terms ?? [];
}

/** The longest term — the one we lead with, because the year is the sell. */
export function bestTerm(id: string): PricingTerm | undefined {
  const all = terms(id);
  if (all.length === 0) return undefined;
  return all.reduce((a, b) => (b.months > a.months ? b : a));
}

/** e.g. "$6,750 for the year, $562/month". */
export function termLabel(id: string, months: number): string {
  const t = terms(id).find((x) => x.months === months);
  if (!t) throw new Error(`offer-catalog: "${id}" has no ${months}-month term`);
  const per = t.totalUsd / t.months;
  const span = months === 12 ? "the year" : `${months} months`;
  return `${usd(t.totalUsd)} for ${span}, ${usd(per)}/month`;
}

/** Whole-number percent saved against paying month to month. */
export function termSavingsPct(id: string, months: number): number {
  const monthly = offer(id).pricing.amountUsd;
  const t = terms(id).find((x) => x.months === months);
  if (!t || monthly === undefined)
    throw new Error(`offer-catalog: "${id}" has no ${months}-month saving to compute`);
  return Math.round((1 - t.totalUsd / (monthly * months)) * 100);
}

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/**
 * The cheapest and dearest monthly price across the coach-led 1:1 plans —
 * the honest range to put in front of someone before they apply.
 */
export function coachingMonthlyRange(): { min: number; max: number } {
  const amounts = COACH_LED_1ON1.map((id) => {
    const a = offer(id).pricing.amountUsd;
    if (a === undefined) throw new Error(`offer-catalog: "${id}" has no monthly price`);
    return a;
  });
  return { min: Math.min(...amounts), max: Math.max(...amounts) };
}

/**
 * The coach-led plans someone lands on after applying. Ordered cheapest first.
 *
 * nutrition-only came out 2026-09-20 when Kris stopped offering it. It is
 * retired in the catalog, and the catalog refuses to serve a retired offer —
 * so leaving it here was not a stale label, it threw.
 */
export const COACH_LED_1ON1 = [
  "weekly-review",
  "standard-check-in",
  "vip-1on1",
] as const;

/**
 * The main coaching line: daily accountability, a custom plan, a weekly call.
 * Weekly Review and Nutrition Only sit below it on purpose — they drop the
 * daily layer and the training respectively, so they are the lighter options
 * rather than a cheaper version of the same thing.
 */
export const COACHING_MAIN_TIERS = ["standard-check-in", "vip-1on1"] as const;

/**
 * The floor of the main coaching line — the "+" in "$400+ a month".
 *
 * Quoting a floor rather than a range is deliberate. A range invites someone
 * to anchor on its bottom and negotiate down from there; a floor anchors up,
 * and leaves the prepay terms and the lighter plans as the ways price comes
 * down — which is what Kris actually wants to be selling.
 */
export function coachingFromPrice(): number {
  return Math.min(
    ...COACHING_MAIN_TIERS.map((id) => {
      const a = offer(id).pricing.amountUsd;
      if (a === undefined) throw new Error(`offer-catalog: "${id}" has no monthly price`);
      return a;
    }),
  );
}

/** The prepay lengths on offer, shortest first — e.g. [6, 9, 12]. */
export function termMonths(id: string): number[] {
  return terms(id)
    .map((t) => t.months)
    .sort((a, b) => a - b);
}

/**
 * Schema.org price fields for an offer, or `{}` when the offer is not publicly
 * purchasable at a fixed price.
 *
 * WHY THIS IS A FUNCTION AND NOT A LITERAL. `/packages` emitted 6 `Offer` nodes and
 * not one carried a `price`, while "$24.99" rendered three times in the visible HTML
 * of the same page (measured 2026-09-23). A human saw the price; a parser saw a
 * product without one, so an assistant asked "how much is the Geebs community" could
 * not answer from structured data. It reads the vendored catalog rather than taking a
 * number, so a price can never be hand-typed onto a surface.
 *
 * THE DISCRIMINATOR IS `purchase.type`, NOT THE PRICING MODEL. A first attempt keyed
 * on `model === "quoted"` and would have published $750 for vip-1on1 — caught by
 * tests/offerPriceSchema.test.ts before it shipped. The catalog does hold amounts for
 * the 1:1 tiers ($750 / $400 / $300) but they are `isFloor` with
 * `purchase: "application"`: you apply and the fee is settled on the strategy call,
 * and `/packages` deliberately renders no price for them at all. Structured data must
 * not assert what the page does not — publishing a floor as a price would advertise a
 * fee the business does not advertise.
 *
 * So only `purchase.type === "shopify"` offers get a price: the $24.99/month
 * community and the $100 consultation call, both of which anyone can buy at a fixed
 * price today. Absence for everything else is the correct output, not a gap.
 */
export function offerPriceSchema(
  id: string,
): Record<string, string | number | Record<string, unknown>> {
  const o = offer(id); // throws on unknown or retired — fail closed
  const { model, amountUsd } = o.pricing;

  if (o.purchase.type !== "shopify") return {};
  if (typeof amountUsd !== "number") return {};

  const out: Record<string, string | number | Record<string, unknown>> = {
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  };

  if (model === "monthly") {
    // A recurring rate is a UnitPriceSpecification, not a bare price — otherwise
    // "$24.99" reads as a one-off charge.
    out.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: amountUsd,
      priceCurrency: "USD",
      unitCode: "MON",
      billingDuration: 1,
      billingIncrement: 1,
    };
  } else {
    out.price = amountUsd;
  }

  return out;
}

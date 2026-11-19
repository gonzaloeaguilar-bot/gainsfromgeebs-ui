import {
  COACH_LED_1ON1,
  COACHING_MAIN_TIERS,
  allOffers,
  coachingFromPrice,
  offer,
} from "./offerCatalog";
import {
  PACKAGE_INTENT_OFFER_IDS,
  PACKAGE_SELECTED_INVESTMENT,
  normalizePackageIntent,
} from "./packageIntent";

/**
 * What an applicant said they can invest, and what that means for routing.
 *
 * Three tiers, and the boundary between the first two is not a number typed
 * here — it is the floor of the main coaching line, read from the catalog. If
 * Standard's price moves, the line between "Kris sells them on a call" and
 * "send them the lighter plans" moves with it, because that is the same fact.
 *
 *   AT_OR_ABOVE_FLOOR  -> Kris's calendar. He closes on the call.
 *   BELOW_FLOOR        -> the lighter plans, with their details, so the
 *                         applicant sees what they can actually afford.
 *   SELF_SERVE         -> the community, which is payable online right now.
 *                         No call, no wait: they can buy it before they cool off.
 *
 * The old values (500_plus, 300_500, lower_cost_first) are still parsed, since
 * stored applications and Kris's inbox carry them. They are never written.
 */
export const BAND_AT_OR_ABOVE_FLOOR = "400_plus";
export const BAND_BELOW_FLOOR = "100_400";
export const BAND_SELF_SERVE = "under_100";
export const BAND_NOT_SURE = "not_sure_value_clear";

/** Retired band values, mapped to the tier they used to mean. */
const LEGACY_BANDS: Record<string, string> = {
  "500_plus": BAND_AT_OR_ABOVE_FLOOR,
  "500_1k": BAND_AT_OR_ABOVE_FLOOR,
  "1k_plus": BAND_AT_OR_ABOVE_FLOOR,
  // 300_500 straddled the $400 floor, which is why it had to be replaced. It
  // resolves DOWN: half of that band could not afford the call it was being
  // judged against, and the cost of a wasted call is Kris's time.
  "300_500": BAND_BELOW_FLOOR,
  "200_500": BAND_BELOW_FLOOR,
  "100_200": BAND_BELOW_FLOOR,
  "0_100": BAND_SELF_SERVE,
  lower_cost_first: BAND_SELF_SERVE,
};

export function normalizeBand(value: string): string {
  return LEGACY_BANDS[value] ?? value;
}

/**
 * The band for someone who picked a package card instead of answering.
 *
 * "package_selected" on its own is a placeholder — it records that a choice
 * happened without recording what it implies about money, so every rule that
 * reads it has to guess. Pricing the chosen package turns it back into a
 * number: pick VIP or Standard and you have cleared the floor; pick a lighter
 * plan and you have not.
 */
export function bandForSelectedPackage(selectedPackage: string): string {
  const intent = normalizePackageIntent(selectedPackage);
  const offerId = intent ? PACKAGE_INTENT_OFFER_IDS[intent] : undefined;
  // FAIL CLOSED. A package we cannot price must not hand out Kris's calendar.
  //
  // Two ways to get here: a retired package (nutrition_only went 2026-09-20,
  // and its ?package= links live on in old emails, bookmarks and the index)
  // or a junk parameter. Resolving either to "not sure" granted a call,
  // because the not-sure band is exempt from the budget gate — so an invalid
  // query string bought a calendar slot. Below the floor shows them the plans
  // that do exist, which is the worst case being a page instead of an hour of
  // Kris's day.
  //
  // Looked up through allOffers rather than offer(), which THROWS on a retired
  // id — arriving on an old link crashed rather than routed.
  if (!offerId) return BAND_BELOW_FLOOR;
  const found = allOffers.find((o) => o.id === offerId);
  const amount = found?.status === "live" ? found.pricing.amountUsd : undefined;
  if (amount === undefined) return BAND_BELOW_FLOOR;
  if (amount >= coachingFromPrice()) return BAND_AT_OR_ABOVE_FLOOR;
  return amount < 100 ? BAND_SELF_SERVE : BAND_BELOW_FLOOR;
}

/** The band to judge a lead by, resolving the package placeholder. */
export function effectiveBand(lead: {
  monthly_investment: string;
  selected_package?: string;
}): string {
  return lead.monthly_investment === PACKAGE_SELECTED_INVESTMENT
    ? bandForSelectedPackage(lead.selected_package ?? "")
    : normalizeBand(lead.monthly_investment);
}

/** Can this person be sold a 1:1 plan on a call? */
export function bandClearsCallFloor(value: string): boolean {
  return normalizeBand(value) === BAND_AT_OR_ABOVE_FLOOR;
}

/** Can this person just buy something online today, without Kris? */
export function bandIsSelfServe(value: string): boolean {
  return normalizeBand(value) === BAND_SELF_SERVE;
}

/** Human label for Kris's inbox. Derived, so a price change rewrites it. */
export function bandLabel(value: string): string {
  const floor = coachingFromPrice();
  const lighter = Math.min(
    ...COACH_LED_1ON1.filter(
      (id) => !COACHING_MAIN_TIERS.includes(id as never),
    ).map((id) => offer(id).pricing.amountUsd!),
  );
  switch (normalizeBand(value)) {
    case BAND_AT_OR_ABOVE_FLOOR:
      return `$${floor}+/month — can afford the main coaching line`;
    case BAND_BELOW_FLOOR:
      return `Under $${floor}/month — lighter plans from $${lighter}`;
    case BAND_SELF_SERVE:
      return "Under $100/month — community, payable online";
    case BAND_NOT_SURE:
      return "Not sure yet — wants to talk it through";
    default:
      return value;
  }
}

/**
 * The plans worth putting in front of this applicant, cheapest first.
 *
 * Kris closes on the call, so the notification has to arrive carrying what he
 * would otherwise have to go and look up: which plans this person can actually
 * afford, what they cost, and what the prepay terms do to that number.
 */
export function plansToPitch(band: string): readonly string[] {
  switch (normalizeBand(band)) {
    case BAND_AT_OR_ABOVE_FLOOR:
      return COACHING_MAIN_TIERS;
    case BAND_SELF_SERVE:
      return ["science-based-community"];
    case BAND_NOT_SURE:
      // No number to work from, so Kris gets the whole ladder and decides on
      // the call. Handing him only the cheap end would pre-lose the sale.
      return COACH_LED_1ON1;
    case BAND_BELOW_FLOOR:
    default:
      // Below the floor, the lighter plans are the real conversation.
      return COACH_LED_1ON1.filter(
        (id) => !COACHING_MAIN_TIERS.includes(id as never),
      );
  }
}

/**
 * Plain-text pitch lines for the notification — plan, monthly price, and every
 * prepay term with its effective monthly rate. All read from the catalog, so a
 * price or term change reaches Kris's inbox without anyone editing an email.
 */
export function pitchLines(band: string): string[] {
  // A price out of the catalog is quoted exactly — $24.99 is not $25. An
  // effective monthly rate is derived, not charged, so it rounds: "$333/mo"
  // is the talking point, "$333.33/mo" is noise.
  const exact = (n: number) =>
    Number.isInteger(n) ? `$${n.toLocaleString("en-US")}` : `$${n.toFixed(2)}`;
  const approx = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  return plansToPitch(band).map((id) => {
    const o = offer(id);
    const monthly = o.pricing.amountUsd;
    if (monthly === undefined) return o.name;
    const prepay = (o.pricing.terms ?? [])
      .map((t) => `${t.months}mo ${exact(t.totalUsd)} (${approx(t.totalUsd / t.months)}/mo)`)
      .join(" · ");
    return prepay
      ? `${o.name}: ${exact(monthly)}/mo — prepay ${prepay}`
      : `${o.name}: ${exact(monthly)}/mo`;
  });
}

// Re-export only. lib/offerCatalog.ts adapts the shared catalog; this module is
// kept so existing imports keep working.
export type { MembershipOffer } from "./offerCatalog";
export { membershipOffers, membershipCheckoutUrl } from "./offerCatalog";

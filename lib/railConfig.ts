import type { CtaVariant } from "@/vendor/rail-kit";

/**
 * One switch for how every rail on the site draws its call to action.
 * Change it here, not at each call site:
 *   "primary"   filled button (current)
 *   "secondary" outlined button
 *   "link"      quiet text-and-arrow
 *   "none"      no button; the card itself still navigates
 */
export const RAIL_CTA: CtaVariant = "primary";

/**
 * Card headlines are real headings on the rails whose cards ARE the content —
 * offers, proof, reading paths. A screen reader can then jump card to card
 * instead of hearing one long run of text. Browse rails keep a plain span: a
 * list of links is not an outline.
 */
export const RAIL_CARD_HEADING = "h3" as const;

/**
 * The position counter. It earns its place on a phone, where there are no
 * arrows and a single card fills the screen, so nothing else says how many
 * there are. English, because this site is English.
 */
export const RAIL_LABELS = {
  position: (from: number, to: number, total: number) =>
    total <= 1 ? "" : `${from === to ? from : `${from}–${to}`} of ${total}`,
};


"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Rail, type RailIconName, type RailItem } from "@/vendor/rail-kit";
import RailSweep from "@/components/RailSweep";
import { trackClientEvent } from "@/lib/clientAnalytics";
import RailProgress from "@/components/RailProgress";
import { RAIL_CARD_HEADING, RAIL_CTA, RAIL_LABELS } from "@/lib/railConfig";
import type { OfferRailItem } from "@/lib/offerRail";
import OfferDetailSheet from "@/components/OfferDetailSheet";

type Props = {
  items: OfferRailItem[];
  /** The surface this rail sits on, e.g. "coaching_cost_guide". */
  source: string;
  heading?: string;
  subheading?: string;
  /**
   * The card drawn as the suggested pick: accent border plus the kit's finite
   * three-pass sweep. Defaults to the middle tier, which is the one most people
   * are choosing between. Pass "" to highlight nothing.
   */
  highlightId?: string;
  /** Short homepage treatment; full package detail stays on /packages. */
  compact?: boolean;
  /** Let a page-level heading introduce the rail without repeating it. */
  showHeader?: boolean;
};

/**
 * The offer identity every rail event carries, from ONE place so the four call
 * sites below cannot drift apart.
 *
 * WHY item_id as well as offer_id (added 2026-10-13). `offer_id` has 28 days of
 * history and is a registered GA4 dimension, so it stays. But the CONTRACT name
 * for "which thing" is `item_id`, and until now `item_id` only ever existed on
 * the mirrored contract leg (`item_view` / `item_click`), copied by the rename
 * in analytics-legacy-map.json — never on `offer_card_view`, `offer_select` or
 * `offer_detail_open` themselves. Measured in property 538698079 over the 28
 * days to 2026-10-13: `offer_card_view` carried offer_id on 2,503 events and
 * item_id on NONE of them. Setting it at the call site puts the same value on
 * both legs, so one card is one id whichever event name you report on.
 *
 * The value is the OFFER CATALOG id (`vip-1on1`, `standard-check-in`, …), not
 * the render position and not an invented slug: it is what `offer_id` has
 * always held, what the contract leg already copies, and what
 * lib/offerRail.ts builds the card from.
 *
 * `selected_package` is the join to application data — it is the exact token
 * `/apply` stores inside `next_step_choice: "package:<intent>"` (see
 * lib/packageIntent.ts). It was only ever on the CLICK side, which is why
 * "which package did people LOOK at, and which did they CHOOSE" could not be
 * asked in one query. Now both sides carry it.
 */
function offerIdentityParams(item: OfferRailItem | undefined, id: string) {
  return {
    offer_id: id,
    item_id: id,
    item_category: "offer",
    selected_package: item?.packageIntent || "none",
  };
}

/**
 * Everything Kris sells, as a rail, on any page. The rail behaviour lives in
 * the shared rail-kit; this file owns only what is Geebs-specific — which
 * offers, what the cards say, and which events go to GA4.
 */
export default function OfferRail({
  items,
  source,
  heading,
  subheading,
  highlightId = "standard-check-in",
  compact = false,
  showHeader = true,
}: Props) {
  // Which cards this visitor has actually brought into view. A Set because the
  // rail fires onCardView per card, and swiping back and forth must not inflate
  // the count.
  const [seen, setSeen] = useState<Set<string>>(new Set());
  // The tier whose sheet is open, or null. Held here rather than in the URL
  // because the rail appears on many pages and a query param would have to be
  // cleaned up on every one of them.
  const [openId, setOpenId] = useState<string | null>(null);

  // Memoised so the click handler below keeps a stable identity across
  // renders, and so the rail is not rebuilding a Map on every one.
  const byId = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  /**
   * Upgrade the whole card surface into "open the detail", without nesting
   * anchors — which the kit refuses to do, correctly, because a link inside a
   * link is invalid and unusable with a screen reader.
   *
   * So the title stays a real link to /packages#id and this intercepts it. The
   * CTA anchor already stops propagation, so pressing "Start with VIP 1:1"
   * still goes to the application and never opens a sheet.
   */
  const openDetailFromCard = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Let the browser keep every shortcut that means "not here": new tab,
      // new window, download, and the middle click.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (!target || target.closest(".rail-card__cta")) return;
      const card = target.closest<HTMLElement>("[data-rail-card]");
      const id = card?.dataset.railCard;
      if (!id || !byId.has(id)) return;
      event.preventDefault();
      setOpenId(id);
      trackClientEvent("offer_detail_open", {
        rail_source: source,
        ...offerIdentityParams(byId.get(id), id),
      });
    },
    [byId, source],
  );

  /**
   * Open the sheet a link arrived asking for, so /packages?offer=vip-1on1 is a
   * real destination and not just a query string nothing reads.
   *
   * Reads location directly rather than useSearchParams, which opts the whole
   * subtree into client-side rendering and would drag every page carrying a
   * rail with it.
   */
  useEffect(() => {
    // Deferred a frame rather than set synchronously: a setState in an effect
    // body is what React's compiler lint rejects as a cascading render, and
    // the same deferral is how ApplyForm restores its draft.
    const raf = window.requestAnimationFrame(() => {
      const requested = new URLSearchParams(window.location.search).get("offer");
      if (requested && byId.has(requested)) setOpenId(requested);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [byId]);

  // Every hook above this line: an early return before them would change the
  // hook order between a rail with offers and a rail without.
  if (items.length === 0) return null;

  const railItems: RailItem[] = items.map((item) => {
    const common = {
      id: item.id,
      // The CARD points at the detail, the BUTTON points at the action. A card
      // in a rail of six is being compared, not bought — sending the whole
      // surface to the application assumed a decision that has not happened.
      href: item.detailsHref,
      title: item.title,
      // Why this one, not what it costs. See OfferRailItem.whyThis.
      subtitle: item.whyThis,
      // A card is scanned, not read. Where the catalog carries what the tier
      // includes, the bullets ARE the description: the title already says which
      // tier this is, and a paragraph on top of the list only pushed the button
      // off the bottom of the card. The prose still runs on /packages, and a
      // card with no bullets keeps it so it is never left blank.
      description: item.bullets.length > 0 ? undefined : item.description,
      badge: item.eyebrow || undefined,
      bullets: compact ? undefined : item.bullets,
      // An explicit action rather than the `cta` shorthand, which reuses the
      // card's own href — and the card's href is now the detail, not the form.
      actions: [{ label: item.cta, href: item.href, id: item.id }],
    };

    // A poster when there is a photograph for this offer: the title sits on the
    // art with its own scrim, the way a poster carries its own lockup. The
    // picture is the whole point — these cards were an unbroken column of text.
    if (item.image) {
      return {
        ...common,
        kind: "media",
        image: item.image,
        titleOverlay: true,
        // The rail reserves the box; Next owns the optimisation. The kit's own
        // class keeps the object-fit and the hover push-in.
        media: (
          <Image
            className="rail-card__image"
            src={item.image.src}
            alt={item.image.alt}
            width={600}
            height={450}
            sizes="(max-width: 700px) 86vw, 340px"
          />
        ),
      };
    }

    return {
      ...common,
      kind: "text",
      // Not a sequence — a number over these cards would be noise. The mark is
      // an icon instead, and only when the catalog has one for this offer.
      glyph: null,
      icon: item.icon as RailIconName | undefined,
    };
  });

  return (
    <RailSweep>
      <div onClick={openDetailFromCard}>
      <Rail
        /* mt only. The rail used to carry my-12 while its container carried
             section-y's 56px bottom padding and the next section opened with
             its own top padding: three rules each assuming they owned the
             spacing, stacking to a 204px void between the last card and "Where
             coaching gets specific" — a quarter of a phone screen of nothing,
             and it read as a gap rather than as breathing room. */
          className={`rail--cartel not-prose ${showHeader ? "mt-12" : "mt-7"}${compact ? " rail--cartel-compact" : ""}`}
        items={railItems}
        source={source}
        cta={RAIL_CTA}
        titleAs={RAIL_CARD_HEADING}
        labels={RAIL_LABELS}
        highlightId={highlightId || undefined}
        // Six offers with very different copy lengths left a hole above the
        // button on the short ones. The full text lives on /packages.
        descriptionLines={compact ? 3 : 5}
        eyebrow={showHeader ? "Ways to work with Kris" : undefined}
        heading={showHeader ? (heading ?? "Pick the way you want to work with Kris") : undefined}
        subheading={
          showHeader
            ? (subheading ??
              "Swipe through the options. Whichever one you pick carries into the application, so you never answer the same question twice.")
            : undefined
        }
        onImpression={({ itemCount }) =>
          trackClientEvent("offer_rail_impression", {
            rail_source: source,
            offer_count: itemCount,
          })
        }
        progressSlot={<RailProgress seen={seen.size} total={items.length} />}
        onCardView={({ id, index }) => {
          setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
          trackClientEvent("offer_card_view", {
            rail_source: source,
            ...offerIdentityParams(byId.get(id), id),
            card_index: index + 1,
          });
        }}
        onSelect={({ id, index, cardsViewed }) => {
          const offer = byId.get(id);
          trackClientEvent("offer_select", {
            rail_source: source,
            ...offerIdentityParams(offer, id),
            card_index: index + 1,
            requires_application: Boolean(offer?.requiresApplication),
            cards_viewed: cardsViewed,
          });
        }}
    />
      </div>
      <OfferDetailSheet
        item={openId ? (byId.get(openId) ?? null) : null}
        open={openId !== null}
        onClose={() => setOpenId(null)}
        source={source}
        onAction={(offerId) => {
          const offer = byId.get(offerId);
          trackClientEvent("offer_select", {
            rail_source: source,
            ...offerIdentityParams(offer, offerId),
            requires_application: Boolean(offer?.requiresApplication),
            from_detail_sheet: true,
          });
        }}
      />
    </RailSweep>
  );
}

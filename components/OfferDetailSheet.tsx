"use client";

import Image from "next/image";
import { RailSheet } from "@/vendor/rail-kit";
import type { OfferRailItem } from "@/lib/offerRail";

/**
 * A package card, opened.
 *
 * The rail is scanned. Each card gets a title, a picture, one line on why that
 * tier exists and a button — which is the right amount for choosing between
 * six things, and not enough for deciding on one. Anyone who wants to read
 * more had to leave for /packages and find their way back.
 *
 * So the card opens here instead: what it includes, who it is for, and the
 * price, on top of the page they were already reading.
 *
 * Built on the kit's RailSheet rather than a third overlay of our own. It is a
 * real <dialog>, so Escape closes it, focus is trapped and returned, and the
 * page behind is inert to a screen reader — all of which the hand-rolled
 * sheets in this repo had to implement by hand.
 */
export default function OfferDetailSheet({
  item,
  open,
  onClose,
  source,
  onAction,
}: {
  item: OfferRailItem | null;
  open: boolean;
  onClose: () => void;
  source: string;
  onAction?: (offerId: string) => void;
}) {
  if (!item) return null;

  return (
    <RailSheet
      open={open}
      onClose={onClose}
      source={source}
      title={item.title}
      badge={item.eyebrow || undefined}
      // The price belongs here, not on the card: by the time someone has
      // opened a tier they have decided they want to know.
      meta={item.price}
      description={
        <>
          <p>{item.whyThis}</p>
          {item.description && item.description !== item.whyThis ? (
            <p className="mt-3">{item.description}</p>
          ) : null}
        </>
      }
      media={
        item.image ? (
          <Image
            className="rail-sheet__image"
            src={item.image.src}
            alt={item.image.alt}
            width={900}
            height={675}
            sizes="(max-width: 700px) 92vw, 520px"
          />
        ) : undefined
      }
      actions={[{ label: item.cta, href: item.href, id: item.id }]}
      closeLabel={`Close ${item.title}`}
      onSelect={() => onAction?.(item.id)}
    >
      {item.bullets.length > 0 ? (
        <>
          <h3 className="eyebrow text-cloudText">What you get</h3>
          <ul className="mt-2 space-y-1.5 text-[15px] leading-[1.6] text-mute">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      ) : null}
    </RailSheet>
  );
}

"use client";

import { Rail, type RailIconName, type RailItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_CARD_HEADING, RAIL_CTA, RAIL_LABELS } from "@/lib/railConfig";

export type LinkRailItem = {
  href: string;
  label: string;
  text: string;
};

type Props = {
  items: LinkRailItem[];
  source: string;
  /** One mark for the whole group — these are a set, not six ideas. */
  icon?: RailIconName;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  className?: string;
};

/**
 * A group of internal links as a rail instead of a stacked list. Same links,
 * same copy, same crawlable markup — one screen of height instead of eight.
 */
export default function LinkRail({
  items,
  source,
  icon,
  eyebrow,
  heading,
  subheading,
  className,
}: Props) {
  if (items.length === 0) return null;

  const railItems: RailItem[] = items.map((item) => ({
    kind: "text",
    id: item.href,
    href: item.href,
    title: item.label,
    // A browse list, not a sequence — no number over the card.
    glyph: null,
    icon,
    description: item.text,
  }));

  return (
    <Rail
      className={className}
      items={railItems}
      source={source}
      cta={RAIL_CTA}
      size="sm"
      labels={RAIL_LABELS}
      eyebrow={eyebrow}
      heading={heading}
      subheading={subheading}
      onSelect={({ id, index }) =>
        trackClientEvent("link_rail_select", {
          rail_source: source,
          link_href: id,
          card_index: index + 1,
        })
      }
    />
  );
}

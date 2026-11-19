"use client";

import { Rail, type RailItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_CARD_HEADING, RAIL_LABELS } from "@/lib/railConfig";
import type { TitanSupplement } from "@/lib/titanSupplements";

/**
 * The supplement catalog as a rail.
 *
 * It used to be a three-item grid: three of the products, stacked into a column
 * on a phone, with the rest of the catalog reachable only through a text link.
 * A shelf is the one thing a rail is unambiguously right for, so this is the
 * same rail-kit the offers use, with the product photograph as the poster.
 *
 * Checkout stays on Shopify. Prices come from the live store through
 * getTitanSupplements and are never written into this file.
 */
/**
 * Ask Shopify's CDN for a card-sized image instead of the original.
 *
 * These are the only images on the site that do not go through next/image:
 * they are remote, and the rail kit draws its poster with a plain <img> on
 * purpose so the kit stays framework-agnostic. That left the homepage serving
 * store originals into a 298px slot — measured on production 2026-09-18, three
 * loaded cards cost 296 KB (127 + 88 + 80), one of them 2048px wide, against
 * 6-32 KB for every image the site optimizes itself.
 *
 * Shopify resizes from the URL, so a width parameter is the whole fix. 700px
 * covers the 340px card at 2x. Anything that is not a Shopify CDN URL is left
 * exactly as it came.
 */
function shopifyThumb(url: string): string {
  if (!url.includes("cdn.shopify.com")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.has("width")) return url;
    parsed.searchParams.set("width", "700");
    return parsed.toString();
  } catch {
    return url;
  }
}

export default function SupplementRail({
  items,
  source,
  heading = "Titan Forge supplements, priced live.",
  subheading,
}: {
  items: TitanSupplement[];
  source: string;
  heading?: string;
  subheading?: string;
}) {
  if (!items.length) return null;

  const railItems: RailItem[] = items.map((product) => ({
    kind: "media",
    id: product.handle,
    href: product.productUrl,
    title: product.title,
    badge: product.category || undefined,
    // The price IS the decision on a shelf, so it is drawn at its own size
    // under the title rather than tucked in beside it.
    meta: `$${product.price.toFixed(2)}`,
    metaPlacement: "block",
    image: product.imageUrl
      ? { src: shopifyThumb(product.imageUrl), alt: product.title }
      : { src: "/kris-hero.jpg", alt: "Titan Forge supplement" },
    cta: "View in the store",
  }));

  return (
    <Rail
      className="rail--shelf not-prose"
      items={railItems}
      source={source}
      titleAs={RAIL_CARD_HEADING}
      labels={RAIL_LABELS}
      cta="secondary"
      eyebrow="Fuel the work"
      heading={heading}
      subheading={
        subheading ??
        "Optional, never required. Training, food, protein and sleep come first. These are what Kris stocks once the basics are covered, and checkout stays on Shopify."
      }
      headerAction={{ label: "See the full catalog", href: "/supplements" }}
      onImpression={({ itemCount }) =>
        trackClientEvent("supplement_rail_impression", {
          rail_source: source,
          product_count: itemCount,
        })
      }
      onSelect={({ id, index }) =>
        trackClientEvent("shopify_product_click", {
          rail_source: source,
          product_handle: id,
          card_index: index + 1,
        })
      }
    />
  );
}

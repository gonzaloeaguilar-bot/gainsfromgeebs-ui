"use client";

import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";

/**
 * The supplement pages' route to the Titan Forge catalog.
 *
 * WHY IT SAYS "WE DON'T LINK A PRODUCT HERE". On 2026-10-08 the live shop
 * (shop.titanforgefit.com/products.json) had no single-ingredient magnesium,
 * zinc, boron or tongkat ali product, and the ashwagandha and "Alpha Energy"
 * products sit in HELD_HANDLES (lib/titanSupplements.ts), deliberately kept off
 * this site since #375. Putting a buy link beside a hormone study turns the
 * study into a product claim, so these pages point to the catalog and say why.
 * Nothing here claims what Kris personally takes: there is no record of it.
 */
export default function TitanForgeShopNote({
  ingredient,
  pageSlug,
  note,
}: {
  ingredient: string;
  pageSlug: string;
  note: string;
}) {
  return (
    <aside
      aria-labelledby="titan-forge-shop-note"
      className="mt-12 rounded-[6px] border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
    >
      <p className="eyebrow text-cloudText">From the Titan Forge shop</p>
      <h2
        id="titan-forge-shop-note"
        className="display mt-2 text-[20px] leading-[1.2] text-bone md:text-[24px]"
      >
        Does Titan Forge sell {ingredient}?
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-bone/85">{note}</p>
      <p className="mt-3 text-[13.5px] leading-[1.6] text-mute">
        Titan Forge is Kris&apos;s own brand, so weigh that when you read this.
        Check the label and your medications with a doctor or pharmacist before
        you buy any supplement.
      </p>
      <Link
        href="/supplements"
        className="btn btn-secondary mt-5 inline-flex"
        onClick={() =>
          trackClientEvent("item_click", {
            item_id: "titan_supplement_catalog",
            item_category: "supplement_catalog",
            list_name: "science_supplement_shop_note",
            item_position: 0,
            source: pageSlug,
          })
        }
      >
        See the catalog <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

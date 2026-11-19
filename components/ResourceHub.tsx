"use client";

import Link from "next/link";
import { RailShelf, type RailShelfItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import IntensiveInvite from "@/components/IntensiveInvite";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import type { HubCategory } from "@/lib/resourceHub";

/**
 * Everything the site knows, filed on a shelf.
 *
 * This REPLACES the "Go deeper" cartel. The homepage carried two discovery
 * surfaces already — that cartel and the article packs — and adding a third
 * would have made the page worse at the thing it was meant to fix. Same job,
 * named categories instead of a curated handful.
 *
 * RAILSHELF, NOT RAILDISCLOSURE (swapped 2026-09-22, Gonzalo: "do some other
 * design for this, we have new components adapted"). The kit's own docs draw
 * the line: a disclosure is a heading with a triangle, right for two or three
 * optional paragraphs; a shelf is for sections that are MATERIAL — a library
 * someone browses rather than reads. Five named categories of a coaching
 * site's whole content library is exactly that case, not the flat-fold case.
 * The blurb each category already carried (`hubCategories()` in
 * lib/resourceHub.ts) becomes the shelf's spine hint, so a category reads
 * without opening it instead of being buried a tap deep. The search field is
 * new: a five-item list didn't need one, but a filing cabinet does, and it
 * narrows to (and opens) the one matching shelf rather than making the
 * reader scan five spines by eye.
 *
 * CRAWLABILITY IS THE CONSTRAINT, and it is met the same way it was under
 * RailDisclosure: every link is a plain <a>, always in the DOM. RailShelf
 * hides its closed panel with the `hidden` attribute rather than unmounting
 * it — a fold that unmounts its links hides them from a crawler too.
 *
 * The hazard that comes with that: `[hidden]` is only display:none in the UA
 * sheet, and any author display beats it. A `grid` on the list inside would
 * render the panel wide open while aria-expanded said false — which is
 * exactly what /science was doing with 96 study cards before. The kit carries
 * `.rail-shelf__panel[hidden] { display: none !important }` for the same
 * reason it carries the equivalent rule for RailDisclosure, and the e2e test
 * asserts VISIBLE link count, not the attribute.
 */
export default function ResourceHub({
  categories,
}: {
  categories: HubCategory[];
}) {
  const items: RailShelfItem[] = categories.map((category) => ({
    id: category.id,
    label: category.title,
    badge: `${category.links.length}`,
    hint: category.blurb,
    searchText: `${category.title} ${category.blurb} ${category.links
      .map((l) => l.label)
      .join(" ")}`,
    children: (
      <>
        {/* No display utility on this list. A `grid` here would beat the
            panel's [hidden] and render the fold open — see the header. */}
        <ul className="mt-1 resource-hub__links">
          {category.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="resource-hub__link"
                onClick={() =>
                  trackClientEvent("resource_hub_click", {
                    hub_category: category.id,
                    result_href: link.href,
                  })
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {category.seeAll ? (
          <Link
            href={category.seeAll.href}
            className="resource-hub__all"
            onClick={() =>
              trackClientEvent("resource_hub_click", {
                hub_category: category.id,
                result_href: category.seeAll!.href,
              })
            }
          >
            {category.seeAll.label} →
          </Link>
        ) : null}
      </>
    ),
  }));

  return (
    <section
      aria-labelledby="resource-hub-heading"
      className="mx-auto max-w-[980px] px-6 py-9 md:px-10 md:py-20"
      data-resource-hub
      /* The role, not the component. homepage-density asserts the ten
         discovery links live inside whatever plays this part, and the cartel
         carried the same attribute — so the contract survives the swap. */
      data-homepage-discovery
    >
      <p className="eyebrow text-cloudText">Free resources</p>
      <h2
        id="resource-hub-heading"
        className="display mt-3 text-[28px] leading-[1.08] text-bone md:text-[38px]"
      >
        Everything here is free to read.
      </h2>
      <p className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65] text-mute md:text-[16.5px]">
        The calculators, the studies and the comparisons. Open whichever one you
        came for.
      </p>

      <div className="mt-8">
        <RailShelf
          items={items}
          source="homepage_resource_hub"
          search={{
            label: "Search what's here",
            placeholder: "Creatine, macro calculator, Denver...",
          }}
          onOpen={({ id }) =>
            trackClientEvent("resource_hub_toggle", {
              hub_category: id,
              hub_open: true,
            })
          }
          onSearch={({ query, matches }) =>
            // Canonical "search" event, not a new "resource_hub_*" name —
            // ANALYTICS_CONTRACT.md already defines this one with
            // search_term; inventing a hub-scoped variant is exactly the
            // per-surface drift the contract exists to prevent.
            query
              ? trackClientEvent("search", {
                  search_term: query,
                  search_results: matches,
                  surface: "resource_hub",
                })
              : undefined
          }
        />
      </div>

      {/* Carried over with the links. It was inside the cartel this replaced,
          and a layout change should not quietly delete a way out of the page. */}
      <div className="mt-10">
        <IntensiveInvite />
      </div>

      {/* THE PLAYLIST LIVES HERE ON PURPOSE, and this is the second time it
          has had to be put back. It used to sit inside <AboutKris />; #612
          cut that section from the homepage on 2026-09-19 to simplify the
          journey, and the playlist went with it as collateral — nobody chose
          to drop it. Same thing happened in May inside a Semrush cleanup.
          Gonzalo, both times: "the landing no longer shows the Spotify
          playlist, why?"

          So it no longer rides inside anything removable. It is nested in
          this band rather than given its own because homepage-density caps
          the page at five top-level bands and all five are taken; and it is
          the compact variant because the same test caps phone height at
          5,260px. resource-hub.spec asserts it is present, so the third
          removal fails CI instead of waiting for Gonzalo to notice.

          mt-8, not mt-10, and the compact variant's own padding is trimmed
          to match: measured 2026-09-23 the first cut landed at 5,262px on
          iPhone 14 emulation — 2px over — while passing CI, because CI
          measures on Pixel 5 (393px, 3px wider, a little less wrapping). A
          gate that is green on one phone and red on another by 2px is not
          headroom, so the spacing came off until it clears both. */}
      <SpotifyPlaylist className="mt-8" headingTag="h3" compact />
    </section>
  );
}

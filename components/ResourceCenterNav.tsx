"use client";

import Link from "next/link";
import { revealHubSection } from "@/lib/revealHubSection";
import { trackClientEvent } from "@/lib/clientAnalytics";

/**
 * The one row of visible browse options on the Resource Center.
 *
 * #720 reframed /blog around a problem picker and folded every browse path
 * behind a <details> — the topic chips (Science among them) went into "Filter
 * by topic", the posts went into "All N posts". The two destinations a returning
 * reader reaches for by name — the Science library and the full list of posts —
 * stopped being options you could see. This puts them back as plain, always-in-
 * the-DOM links above the fold, without reverting the problem-first intro.
 *
 * "All posts" is the one target that lives on this same page (in a fold), so it
 * opens that <details id="resource-all-posts"> and scrolls to it rather than
 * navigating away.
 */
const chip =
  "inline-flex min-h-11 shrink-0 items-center rounded-md border border-line2 bg-bone/[0.03] px-3.5 text-[14px] font-medium tracking-normal text-bone/72 transition-colors hover:border-bone/30 hover:text-bone";

const shared = { brand: "geebs", page_type: "blog", locale: "en", variant: "control" } as const;

export default function ResourceCenterNav() {
  function track(item: string, position: number) {
    trackClientEvent("item_click", {
      ...shared,
      list_name: "resource_center_browse",
      item_id: item,
      item_position: position,
    });
  }

  function openAllPosts() {
    track("/blog#all-posts", 2);
    const el = document.getElementById("resource-all-posts");
    if (el instanceof HTMLDetailsElement) {
      el.open = true;
      revealHubSection(el, el.querySelector("summary") ?? el);
    }
  }

  return (
    <nav
      aria-label="Browse the resource center"
      className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
    >
      <Link href="/science" className={chip} onClick={() => track("/science", 1)}>
        Science library
      </Link>
      <button type="button" className={chip} onClick={openAllPosts}>
        All posts
      </button>
      <Link href="/tools" className={chip} onClick={() => track("/tools", 3)}>
        Free tools
      </Link>
      <Link href="/packages" className={chip} onClick={() => track("/packages", 4)}>
        Compare coaching
      </Link>
    </nav>
  );
}

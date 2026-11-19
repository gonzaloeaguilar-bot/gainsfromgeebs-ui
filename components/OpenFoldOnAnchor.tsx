"use client";

import { useEffect } from "react";

/**
 * Opens the folded section a link points at.
 *
 * The section headings sit in the always-visible <summary>, so an anchor lands
 * correctly with no script at all. This only opens the row, so a reader who
 * taps a contents link or follows a deep link sees the section and not a
 * closed row.
 */
export default function OpenFoldOnAnchor() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const fold = document.getElementById(id)?.closest("details");
      if (fold && !fold.open) fold.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}

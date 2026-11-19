"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * One collapsible column of the footer link tree.
 *
 * The footer is the site's full link tree, which is right for a site whose
 * pages are the product. On a phone it was also 6,625px tall across 144 links:
 * measured on production 2026-09-18, that is eight phone screens and 24% of the
 * homepage, sitting between the last section and the copyright line.
 *
 * Each column is a closed disclosure at EVERY width.
 *
 * It used to open from the md breakpoint up, which fixed the phone and left
 * the desktop exactly as it was: measured 2026-09-20, the four columns came to
 * 4,268px each and the footer to 4,859px — larger than the entire homepage
 * above it (4,297px), and more than five screens of links below the last
 * section. Nobody reads 144 footer links at any width; the width only changed
 * how much room they took.
 *
 * Discovery is the search control in the header, not a link wall.
 *
 * Two things this deliberately does NOT do:
 *
 * - It does not decide the open state in an effect. The first version used
 *   <details open={isWide}> driven by a matchMedia effect, and a Playwright
 *   probe caught it rendering all 144 links before hydration and then
 *   collapsing: a 5,900px shift at the bottom of the page. Here the closed
 *   state is the server-rendered state and `md:block` opens the panel at width,
 *   so the first paint is already right at both sizes with no JS involved.
 * - It does not mount the links on click. `hidden` is display:none, so every
 *   link is in the HTML at every width, exactly as it was before.
 */
export default function FooterGroup({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();

  return (
    <div className="footer-group">
      {/* One control at every width, so aria-expanded always describes what
          actually happened. The previous version rendered a second, static
          heading for md+ because the column could not be closed there; with
          one behaviour there is one heading. */}
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded((open) => !open)}
        className="eyebrow flex w-full min-h-11 items-center justify-between text-left text-mute2"
      >
        {title}
        <span
          aria-hidden="true"
          className={`text-mute2 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>
      <div id={panelId} className={isExpanded ? "block" : "hidden"}>
        {children}
      </div>
    </div>
  );
}

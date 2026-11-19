"use client";

/**
 * The beat between pulling a book off the shelf and reading it.
 *
 * WHY THE KIT'S VEIL AND NOT A NEW ANIMATION. `rail-veil` is already in the
 * vendored motion.css and this site has never used it — 20 keyframes that were
 * dead code until motion.css was imported. Its own notes carry the decisions
 * that make it work and that a fresh attempt would get wrong: a 0.22s held
 * beat so the mark can actually register ("without it the mark appears and is
 * already leaving"), 0.8s total and not 1.05 because "a long dissolve reads as
 * the page being slow", and the mark growing 3.5% on the way out so it
 * dissolves into light rather than looking like someone turned it down.
 *
 * IT LIVES ON <html>. That is the kit's constraint, not a preference: the
 * plane has to exist before the new page's first frame, and this site does
 * client-side navigation, so the class is added on the click and taken off
 * after the animation rather than being rendered by the page being left.
 *
 * ONLY ON BOOKS. Marked links only — a spine, a face-out, a "Study breakdown".
 * A veil over every navigation is a slow site with a logo on it.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DURATION = 800;

export default function BookOpen() {
  const pathname = usePathname();

  /* THE TIMER OWNS THE VEIL, NOT THE ARRIVAL. The first version cleared it in
     an effect keyed on the pathname, which sounds safer and is wrong: a local
     navigation lands in about 400ms and the dissolve is 800, so the plane was
     yanked off screen halfway through its own animation. Filmed, it read ON at
     82ms and off by 556 — a veil that pops rather than dissolves.

     What that effect was actually guarding against is a class left behind when
     something went wrong, so that is all it does now: on mount, if the veil is
     somehow still on, take it off. */
  useEffect(() => {
    const stale = window.setTimeout(() => {
      document.documentElement.classList.remove("rail-veil");
    }, DURATION);
    return () => window.clearTimeout(stale);
  }, [pathname]);

  useEffect(() => {
    let timer: number | undefined;

    /* CAPTURE PHASE, and this is the whole reason the first version played
       nothing. next/link calls preventDefault() on its own element handler to
       take over the navigation, and that handler runs before a bubbling
       listener on document — so a `defaultPrevented` guard here was true on
       every single internal link and the veil never once fired. Filmed at
       110ms intervals it read "off" at every sample while the page changed
       underneath, which from outside is indistinguishable from a veil that
       does not exist. */
    function onClick(event: MouseEvent) {
      // Let the browser do its own thing for new tabs, downloads and modified
      // clicks; a veil over a navigation that is not happening here is a flash.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest?.(
        "a[data-book-open]",
      ) as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;

      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("/")) return;
      // Same page: there is no swap to cover.
      if (href.split("#")[0] === pathname) return;

      document.documentElement.classList.add("rail-veil");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        document.documentElement.classList.remove("rail-veil");
      }, DURATION);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

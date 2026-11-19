"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

const STORAGE_KEY_PREFIX = "geebs_ribbon:";
const OFFER_ID = "recomp_v1";
const DISMISS_DAYS = 14;

/**
 * The recomposition calculator ribbon at the top of the page.
 *
 * Client-mounted chrome (not server-rendered). The ribbon is a dismissible offer,
 * not content for crawlers. It mounts after hydration, reads dismissal from
 * localStorage, and handles its own scroll collapse/restore.
 *
 * Dismissal is stored as an ISO timestamp keyed to the offer id.
 * Storage blocked → show the ribbon (better to show than lose the offer).
 * New offer id is never suppressed by old dismissals.
 */

function isDismissed(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY_PREFIX + OFFER_ID);
    if (!stored) return false;
    const dismissedAt = new Date(stored).getTime();
    const now = new Date().getTime();
    // 14 days in milliseconds
    const expiry = dismissedAt + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    return now < expiry;
  } catch {
    // Storage blocked: show it. Losing the offer entirely is the worse failure.
    return false;
  }
}

export default function RecompRibbon() {
  const pathname = usePathname();
  const scrollStateRef = useRef({
    lastScrollY: 0,
    turnY: 0,
    dir: 0,
    isCollapsed: false,
  });
  const [state, setState] = useState({ mounted: false, dismissed: false });
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mount after hydration: read dismissal state (setState in effect is safe for mount-after-hydration pattern)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ mounted: true, dismissed: isDismissed() });
  }, []);

  // Sync collapsed state to ref so scroll handler reads current value
  useEffect(() => {
    scrollStateRef.current.isCollapsed = isCollapsed;
  }, [isCollapsed]);

  // Not on presentation decks (they are not the website), not on /apply (the
  // page IS the form: 44px of sticky strip took the Safari-sized 664px view
  // below what step 1 and step 3 need, measured by apply-step-fits.spec.ts),
  // and not on the calculator it promotes.
  const suppressed =
    pathname.startsWith("/presentations/") ||
    pathname === "/apply" ||
    pathname === "/coaching" ||
    pathname === "/week-plan" ||
    pathname.startsWith("/tools/body-recomposition-calculator");

  // Scroll behavior: only attach after mount and only if not dismissed/suppressed
  useEffect(() => {
    if (!state.mounted || suppressed || state.dismissed) return;

    const handleScroll = () => {
      const s = scrollStateRef.current;
      const scrollY = window.scrollY;
      if (scrollY === s.lastScrollY) return;
      const dir = scrollY > s.lastScrollY ? 1 : -1;

      // The point where the reader last turned around. Upward scrolling is
      // measured from HERE, because a slow swipe delivers many small scroll
      // events and a per-event delta never reaches 40px.
      if (dir !== s.dir) s.turnY = s.lastScrollY;
      s.dir = dir;

      // Scrolling down past 120px → collapse
      if (dir > 0 && scrollY > 120 && !s.isCollapsed) {
        s.isCollapsed = true;
        setIsCollapsed(true);
      }
      // Scrolling up 40px from the turn, or back near the top → restore
      else if (
        s.isCollapsed &&
        dir < 0 &&
        (s.turnY - scrollY >= 40 || scrollY <= 120)
      ) {
        s.isCollapsed = false;
        setIsCollapsed(false);
      }

      s.lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.mounted, state.dismissed, suppressed]);

  const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const now = new Date().toISOString();
      window.localStorage.setItem(STORAGE_KEY_PREFIX + OFFER_ID, now);
    } catch {
      // Storage blocked: show it again next page. That is the right failure.
    }

    // The ribbon's own state is the source of truth in this tab: localStorage
    // does not notify the tab that wrote it, and nothing else listens.
    setState((prev) => ({ ...prev, dismissed: true }));
    // The old ribbon's dismissal emitted nothing, so nobody could say whether it
    // worked. cta_click on the contract; the one writer adds the shared block.
    trackClientEvent("cta_click", {
      cta_id: "ribbon_dismiss",
      cta_text: "Dismiss",
      cta_position: "ribbon",
    });
  };

  // Don't render until mounted (after hydration), or if dismissed/suppressed
  if (!state.mounted || state.dismissed || suppressed) return null;

  return (
    <aside
      className="recomp-ribbon"
      data-collapsed={isCollapsed ? "true" : "false"}
      inert={isCollapsed}
      aria-label="Body recomposition calculator"
      data-analytics-source="recomp_ribbon"
    >
      <a
        href="/tools/body-recomposition-calculator"
        className="recomp-ribbon__link"
        data-analytics-event="cta_click"
        data-cta="ribbon_recomp"
        data-cta-position="ribbon"
      >
        <span className="recomp-ribbon__copy">
          Your recomp numbers, free.
          <span className="recomp-ribbon__more"> Takes a minute.</span>{" "}
          <span className="recomp-ribbon__action">Run it</span>
        </span>
      </a>
      <button
        type="button"
        className="recomp-ribbon__close"
        aria-label="Dismiss the recomposition calculator offer"
        onClick={handleDismiss}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </aside>
  );
}

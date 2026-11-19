"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RailStickyBar from "@/vendor/rail-kit/RailStickyBar";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  hasDedicatedCoachCompanion,
  INSTAGRAM_DM_SESSION_KEY,
  isInstagramDmAttribution,
} from "@/lib/companionAttribution";

/**
 * The mobile bar: one decision (Apply) and one quiet question (Ask Kris).
 *
 * Built on the shared RailStickyBar (art direction 2026-10-13). The kit part
 * reserves its own height with a measured spacer, so nothing writes
 * padding-bottom to <body> and no body class has to be toggled.
 *
 * WHY THE KIT'S `watch` PROP IS NOT USED. RailStickyBar shows the bar whenever
 * the watched element is NOT intersecting. On the homepage the hero CTA sits
 * below the fold at load, so "not intersecting" is true on arrival and the bar
 * would cover the opening frame. The contract here is "scrolled PAST the hero
 * CTA", i.e. its top edge is above the viewport, so the bar is mounted only
 * once that is true. Every page without #hero-primary-cta gets the bar on the
 * first frame after hydration; it is never in the served HTML.
 *
 * Ask Kris is the kit's anchor with a hash href. The click is cancelled in the
 * capture phase so the hash never reaches the address bar or scrolls the page,
 * and the chat is opened through the same event the rest of the site uses.
 *
 * Analytics go through trackClientEvent (contract name `cta_click`, shared
 * block added by the one writer). The old `mobile_dock_click` name was off the
 * contract.
 */

const ASK_HREF = "#ask-kris";
const SHIMMER_KEY = "geebs_dock_shimmer";

export default function DockBar() {
  const pathname = usePathname();

  // Decks are not the website. /apply keeps no dock: the page IS the form, and
  // the dock's primary action points at the page the reader is already on
  // (measured 2026-09-21: every step of the form ended underneath the bar).
  const suppressed =
    pathname.startsWith("/presentations/") ||
    pathname === "/apply" ||
    // The Week Plan is a focused guided flow. Its selected card owns the only
    // next action until free help has been delivered.
    pathname === "/week-plan" ||
    // The coaching landing page has one explicit hero decision. Adding a
    // fixed "Apply" plus "Ask Kris" pair turns the first visit into three
    // simultaneous conversion choices, especially on a phone.
    pathname === "/coaching";

  // null until the hero check has run. The bar is never part of the server
  // HTML and never painted before this is known: with an initial `true` it was
  // in the served markup on the homepage, flashed over the opening frame, and
  // its 65px spacer sat in the document until the observer hid it (measured as
  // +65px on a slow CI machine, 6,086 vs a 6,021 page).
  const [pastHeroCta, setPastHeroCta] = useState<boolean | null>(null);
  useEffect(() => {
    const cta = document.getElementById("hero-primary-cta");
    if (!cta || typeof IntersectionObserver !== "function") {
      // No hero on this page: the bar belongs from the first frame we know that.
      const raf = requestAnimationFrame(() => setPastHeroCta(true));
      return () => cancelAnimationFrame(raf);
    }
    // The observer reports the real state straight after observe(); until then
    // the bar stays out.
    const io = new IntersectionObserver(
      ([entry]) =>
        setPastHeroCta(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(cta);
    return () => io.disconnect();
  }, [pathname]);

  // The first-visit "Want the short version?" bubble over Ask Kris, ported from
  // the bar this replaces. Only on pages that have the coach companion.
  const [isDmSession, setIsDmSession] = useState(false);
  useEffect(() => {
    let next = false;
    try {
      next =
        isInstagramDmAttribution(window.location.search) ||
        sessionStorage.getItem(INSTAGRAM_DM_SESSION_KEY) === "true";
    } catch {
      next = isInstagramDmAttribution(window.location.search);
    }
    const raf = requestAnimationFrame(() => setIsDmSession(next));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  const hasCoachCompanion = hasDedicatedCoachCompanion(pathname) || isDmSession;

  const [showBubble, setShowBubble] = useState(false);
  useEffect(() => {
    if (!hasCoachCompanion) return;
    let raf = 0;
    try {
      if (localStorage.getItem("geebs_companion_holdout") === "control") return;
      const bubbleSeen = sessionStorage.getItem("geebs_companion_bubble_seen");
      const dmSeen = sessionStorage.getItem("geebs_companion_dm_seen");
      const isDm = isInstagramDmAttribution(window.location.search);
      if (!bubbleSeen && (!isDm || dmSeen)) {
        raf = requestAnimationFrame(() => setShowBubble(true));
        sessionStorage.setItem("geebs_companion_bubble_seen", "true");
      }
    } catch {
      // Restricted storage: no bubble, nothing else lost.
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasCoachCompanion]);
  useEffect(() => {
    if (!showBubble) return;
    const timer = setTimeout(() => setShowBubble(false), 6000);
    return () => clearTimeout(timer);
  }, [showBubble]);
  useEffect(() => {
    const hide = () => setShowBubble(false);
    window.addEventListener("geebs:open-companion", hide);
    return () => window.removeEventListener("geebs:open-companion", hide);
  }, []);
  const [companionOpen, setCompanionOpen] = useState(false);
  useEffect(() => {
    const onState = (e: Event) =>
      setCompanionOpen(Boolean((e as CustomEvent<{ open?: boolean }>).detail?.open));
    window.addEventListener("geebs:companion-state", onState);
    return () => window.removeEventListener("geebs:companion-state", onState);
  }, []);

  const visible = !suppressed && pastHeroCta === true;

  // One shimmer across the Apply pill, once per session, 600ms after the bar
  // first appears. Reduced motion gets a static brighter top edge instead
  // (CSS), so the mark survives without the travelling highlight.
  const [shimmer, setShimmer] = useState(false);
  useEffect(() => {
    if (!visible) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SHIMMER_KEY) === "1";
    } catch {
      seen = true; // cannot remember it, so never repeat it
    }
    if (seen) return;
    // Marked seen only when it actually plays: on the homepage the bar is
    // visible for one frame before the hero observer hides it, and consuming
    // the session's one shimmer in that frame meant it never played at all.
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SHIMMER_KEY, "1");
      } catch {
        // cannot remember it; it plays once per page load at worst
      }
      setShimmer(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    if (target?.closest(`a[href="${ASK_HREF}"]`)) event.preventDefault();
  };

  // Where the finger landed, so the press light blooms from the touch point.
  const onPointerDownCapture = (event: React.PointerEvent<HTMLDivElement>) => {
    const action = (event.target as Element | null)?.closest<HTMLElement>(
      ".rail-stickybar__action",
    );
    if (!action) return;
    const box = action.getBoundingClientRect();
    action.style.setProperty("--x", `${event.clientX - box.left}px`);
    action.style.setProperty("--y", `${event.clientY - box.top}px`);
  };

  const handleSelect = (info: { actionId: string }) => {
    if (info.actionId === "ask-kris") {
      setShowBubble(false);
      trackClientEvent("cta_click", {
        cta_id: "dock_ask_kris",
        cta_text: "Ask Kris",
        cta_position: "dock",
      });
      window.dispatchEvent(new CustomEvent("geebs:open-chat"));
    } else {
      trackClientEvent("cta_click", {
        cta_id: "dock_apply",
        cta_text: "Apply",
        cta_position: "dock",
      });
    }
  };

  return (
    <div
      className="geebs-dock md:hidden"
      data-shimmer={shimmer ? "on" : undefined}
      onClickCapture={onClickCapture}
      onPointerDownCapture={onPointerDownCapture}
    >
      {showBubble && hasCoachCompanion && !companionOpen && (
        <div
          onClick={() => {
            setShowBubble(false);
            window.dispatchEvent(new CustomEvent("geebs:open-companion"));
          }}
          role="status"
          aria-live="polite"
          data-companion-mobile-bubble
          className="geebs-dock__bubble companion-bubble-anim"
        >
          <span>Want the short version?</span>
          <span className="geebs-dock__bubble-arrow" aria-hidden="true">
            →
          </span>
        </div>
      )}
      <RailStickyBar
        label=""
        source="dock"
        actions={[
          { id: "apply", label: "Apply", href: "/apply" },
          { id: "ask-kris", label: "Ask Kris", href: ASK_HREF },
        ]}
        onSelect={handleSelect}
      />
    </div>
  );
}

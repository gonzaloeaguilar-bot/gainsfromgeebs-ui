"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import s from "./dayOne.module.css";
import { trackClientEvent } from "@/lib/clientAnalytics";
import DayOneBarbell from "./DayOneBarbell";

/* The reveal is deliberately shorter than a page transition. The boot
   failsafe still outlives it, so hydration can never strand the overlay.

   1150, NOT 1750. Measured on the shipped build: the bar finishes its push-in
   and the wordmark reaches full opacity at ~920ms on a phone and ~1040ms on
   desktop — and then the veil sat for another 800ms with nothing changing on
   it. That tail is not a beat, it is a wait. The art-direction pass put the
   whole moment at 1100ms and was right about the order of magnitude: "a long
   dissolve reads as the page being slow".

   The number is set from the last thing that actually moves (the subline at
   ~1040ms on the slower of the two viewports) plus a short hold, rather than
   chosen round. If a beat is added later, this moves with it — a duration that
   outlives its own animation is how the 800ms of nothing got here. */
const RUN_MS = 1150;

/* ─────────────────────────────────────────────────────────────────────────
   A module-scoped store rather than setState-in-an-effect.

   Two reasons, one of them enforced by lint: the decision can only be read on
   the client (so the server must render nothing), and once the moment has
   played it must stay played across a client-side navigation — component state
   would not survive the remount. Same shape as the FLAS tag drop.
   ──────────────────────────────────────────────────────────────────────── */
type Phase = "unresolved" | "playing" | "done";

let phase: Phase = "unresolved";
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Decided once per page load, on first client read. The decision itself
    (reduced motion, once per session, not on /apply) was already taken by
    DayOneBoot before the browser painted — this only reads the verdict. */
function getSnapshot(): Phase {
  if (phase === "unresolved") {
    phase = document.documentElement.hasAttribute("data-dayone") ? "playing" : "done";
  }
  return phase;
}

function getServerSnapshot(): Phase {
  // Ship the artwork in the HTML so the boot veil never has an empty frame.
  // CSS keeps it hidden unless DayOneBoot has set the pre-paint flag.
  return "playing";
}

/* One writer per site. Calling gtag directly from here bypassed the shared
   parameter block AND the contract leg, so the brand moment was invisible to
   every cross-brand query. Route it through the site's single emit path. */
function track(
  name: string,
  params: Record<string, boolean | number | string | undefined>,
) {
  try {
    trackClientEvent(name, params);
  } catch {
    /* analytics must never break the page */
  }
}

export default function DayOneLoader() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const started = useRef(0);
  const closed = useRef(false);

  const finish = useCallback((dismissedBy: string) => {
    if (closed.current) return;
    closed.current = true;
    document.documentElement.removeAttribute("data-dayone");
    phase = "done";
    emit();
    track("brand_moment_complete", {
      moment: "day_one",
      dismissed_by: dismissedBy,
      elapsed_ms: Math.round(performance.now() - started.current),
    });
  }, []);

  useEffect(() => {
    if (current !== "playing") return;
    started.current = performance.now();
    track("brand_moment_shown", { moment: "day_one" });

    const timer = window.setTimeout(() => finish("timeout"), RUN_MS);
    // Any intent to get on with it ends the moment — including the first Tab,
    // because an overlay covers the page but not its focus order.
    const onKey = () => finish("key");
    const onScroll = () => finish("scroll");
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("[data-dayone-skip]")) return;
      finish("tap");
    };
    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("wheel", onScroll, { once: true, passive: true });
    window.addEventListener("touchmove", onScroll, { once: true, passive: true });
    window.addEventListener("pointerdown", onPointer, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [current, finish]);

  return (
    <div className={s.overlay}>
      <div className={s.stage}>
        <DayOneBarbell />
        <div className={s.stamp}>GAINS FROM GEEBS</div>
        <div className={s.sub}>1:1 coaching by Kris Oddo</div>
      </div>
      <button
        type="button"
        className={s.skip}
        data-dayone-skip=""
        onClick={() => finish("skip")}
      >
        Skip
      </button>
    </div>
  );
}

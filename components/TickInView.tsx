"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Ticks each item of a checklist as the reader arrives at it.
 *
 * The list of what 1:1 includes is nine identical rows, and a column of nine
 * ticks that are all already ticked reads as a specification. Drawing each one
 * as its row comes into view makes it read as things being confirmed, which is
 * what the list is actually saying.
 *
 * Per row, not per list: a list this long does not fit on a phone screen, so
 * one observer on the container would fire while most of it is still below the
 * fold and the effect would be over before it was seen. Same reasoning as
 * PromoSweep and RailSweep — an animation that says something has to run when
 * the reader is there.
 *
 * Finite and one-shot. Under prefers-reduced-motion nothing is observed and
 * every row renders ticked from the start, because the ticks are content, not
 * decoration: the CSS draws them fully whenever the animation is not running.
 */
export default function TickInView({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = [...root.querySelectorAll<HTMLElement>("li")];
    if (!rows.length) return;

    root.dataset.ticking = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const row = entry.target as HTMLElement;
          // A small stagger inside a row group that enters together, so a
          // burst of rows reads as a sequence rather than a single flash.
          const index = rows.indexOf(row);
          row.style.setProperty("--tick-delay", `${Math.min(index, 3) * 90}ms`);
          row.dataset.ticked = "true";
          observer.unobserve(row);
        }
      },
      { threshold: 0.6 },
    );

    rows.forEach((row) => observer.observe(row));

    // Last resort, and it matters more here than it looks. For a checklist the
    // un-ticked state is merely faint, but this component also drives the
    // process steps, where the numeral sits at opacity 0 until its row is
    // seen. An observer that never fires — a throttled background tab, a row
    // taller than the viewport it is measured against — would leave the
    // numbers invisible. After three seconds every remaining row ticks anyway.
    const failsafe = window.setTimeout(() => {
      rows.forEach((row) => {
        if (!row.dataset.ticked) row.dataset.ticked = "true";
      });
    }, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

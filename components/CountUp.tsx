"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a proof number up when the reader reaches it.
 *
 * The numbers on this page are the argument — 25 lb across 15 clients, 7 named
 * stories, 5 public reviews — and they were drawn at 28-52px and then sat
 * there. Counting makes the eye stop on the digit rather than read past it, and
 * it costs nothing in trust, because the number it lands on is the number that
 * was rendered on the server.
 *
 * THE SERVER-RENDERED TEXT IS THE FINAL VALUE, not zero. A crawler, a reader
 * with JavaScript off, and anyone with prefers-reduced-motion all see the real
 * figure immediately; the animation only replaces it for the moment it runs.
 * Counting up from a zero that was in the HTML would mean shipping a page whose
 * proof reads "0" to anything that does not execute scripts.
 */
export default function CountUp({
  value,
  suffix = "",
  durationMs = 900,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            // ease-out: fast at first, settles on the value rather than
            // arriving at a constant speed and stopping dead
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(step);
            else setDisplay(null); // hand the DOM back to the server's text
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref}>
      {display === null ? value : display}
      {suffix}
    </span>
  );
}

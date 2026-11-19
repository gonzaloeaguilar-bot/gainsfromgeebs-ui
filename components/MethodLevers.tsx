"use client";

import { useEffect, useRef } from "react";
import { GEEBS_METHOD_LEVERS } from "@/lib/geebsMethod";

/**
 * The four levers, revealed one after another as the section enters view.
 *
 * The cinematic layer, held to the same discipline as the forecast curve: it
 * runs ONCE, only when the reader reaches it, and it earns its motion instead
 * of decorating — a system that adjusts four things together is easier to feel
 * as four beats arriving in sequence than as a static grid. Remove the motion
 * and the four levers, their claims and their detail are all still there and
 * still named; the reveal is the argument that they move together, not a
 * flourish on top of it.
 *
 * State lives in a data attribute so the transition never costs a React render,
 * and prefers-reduced-motion gets the whole thing at rest.
 */
export default function MethodLevers() {
  const ref = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.revealed = "true";
      return;
    }
    const reveal = () => {
      el.dataset.revealed = "true";
    };

    // Failsafe FIRST, and this is the load-bearing line: if the observer never
    // fires — a tall element that never crosses the threshold, a browser that
    // scrolls oddly, a disconnected callback — the content must still appear. A
    // reveal that can hide the section permanently is worse than no reveal at
    // all. Measured 2026-09-27: threshold 0.25 left the whole four-lever block
    // at opacity 0 after a scroll into view. So it appears within 1.2s no matter
    // what, and the observer only makes it arrive earlier and on cue.
    const failsafe = window.setTimeout(reveal, 1200);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            window.clearTimeout(failsafe);
            io.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <ol
      ref={ref}
      className="method-levers mt-8 grid gap-3 sm:gap-4"
      data-revealed="false"
    >
      {GEEBS_METHOD_LEVERS.map((lever) => (
        <li
          key={lever.name}
          className="method-lever rounded-xl border border-line2 bg-bone/[0.025] p-5 md:p-6"
          style={{ transitionDelay: `${(lever.n - 1) * 140}ms` }}
        >
          <div className="flex items-baseline gap-3">
            <span className="method-lever__n font-newsreader text-[26px] font-extrabold leading-none text-cloudText md:text-[32px]">
              {lever.n}
            </span>
            <h3 className="text-[19px] font-semibold text-bone md:text-[22px]">
              {lever.name}
            </h3>
          </div>
          <p className="mt-2 text-[16px] font-medium leading-[1.5] text-bone/90">
            {lever.claim}
          </p>
          <p className="mt-1.5 text-[16px] leading-[1.6] text-mute">
            {lever.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

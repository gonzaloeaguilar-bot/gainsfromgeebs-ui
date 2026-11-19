"use client";

import { useEffect, useRef } from "react";
import type { ForecastPoint } from "./forecast";

/**
 * The line draws itself once, left to right, as the date lands.
 *
 * This is the only motion on the page and it is load-bearing rather than
 * decorative: the claim the page makes IS a line falling over time, so drawing
 * it is the claim arriving. Remove it and the date, the numbers and the plan
 * are all still there — which is the test a scene has to pass before it earns
 * a second of someone's attention.
 *
 * The site already animates 236 elements with one shared 0.9s reveal. This does
 * not join them: it runs once, on a surface the reader asked for, and never on
 * scroll.
 */
export default function ForecastCurve({
  curve,
  startLabel,
  endLabel,
}: {
  curve: ForecastPoint[];
  startLabel: string;
  endLabel: string;
}) {
  const figureRef = useRef<HTMLElement | null>(null);

  /* The drawn state is an attribute on the element, not React state. Setting
     state inside an effect re-renders the whole result for a purely visual
     transition, and the lint rule that forbids it is right. The CSS keys on
     [data-drawn] instead, so the browser owns the animation start to finish. */
  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.drawn = "true";
      return;
    }
    // Two frames: one for the browser to accept the dashed start state, one to
    // animate away from it. A single frame lands both in the same style
    // recalculation and nothing moves.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        node.dataset.drawn = "true";
      }),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  if (curve.length < 2) return null;

  const weights = curve.map((p) => p.weightLb);
  const hi = Math.max(...weights);
  const lo = Math.min(...weights);
  const span = Math.max(1, hi - lo);
  const last = curve.length - 1;

  const points = curve.map((p, i) => {
    const x = (i / last) * 100;
    const y = 6 + ((hi - p.weightLb) / span) * 78;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = `M${points.join(" L")}`;
  const area = `${line} L100,92 L0,92 Z`;

  return (
    <figure ref={figureRef} className="forecast-figure mt-6 mb-0" data-drawn="false">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Projected weight from ${startLabel} to ${endLabel} over ${last} weeks`}
        className="h-[170px] w-full"
      >
        <defs>
          <linearGradient id="forecast-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E04B4B" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#E04B4B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="forecast-area" d={area} fill="url(#forecast-fill)" />
        {/* pathLength normalises the dash to the line's own length, so the
            timing is identical whether the forecast is 8 weeks or 60. */}
        <path
          className="forecast-line"
          d={line}
          fill="none"
          stroke="#E04B4B"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
        />
      </svg>
      <figcaption className="mt-3 flex justify-between text-[11.5px] text-mute2">
        <span>Today · {startLabel}</span>
        <span>{endLabel}</span>
      </figcaption>
    </figure>
  );
}

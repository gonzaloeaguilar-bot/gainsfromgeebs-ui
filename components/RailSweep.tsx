"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Starts a rail's attention sweep when the rail is first seen, instead of when
 * the page loads.
 *
 * The kit already draws the sweep, on the one suggested card, three passes and
 * then stop (vendor/rail-kit/rail.css). What it cannot know is WHEN the card
 * arrives in front of somebody. On this homepage the highlighted offer sits 2.9
 * screens down and the sweep lasts 3 x 2.6s = 7.8s from page load, so whether
 * anyone ever sees it is a race between the animation and the reader. Scrolled
 * synthetically in 1.8s it is still running; read at the pace the first three
 * screens actually take, it finished long ago.
 *
 * This is the same fix, and the same reasoning, as components/PromoSweep.tsx:
 * an animation that says "look here" has to run when the visitor is there.
 *
 * The mechanism is `animation-play-state`, not a class that re-declares the
 * animation. The kit owns the keyframes, the duration and the three-pass
 * count; the host sheet pauses it at load and lets it go on arrival. Nothing
 * here restates what the sweep looks like, so the kit stays the one place it
 * is defined — and the kit is hash-locked, so it has to be that way.
 *
 * Under prefers-reduced-motion the kit's sweep does not exist at all: the whole
 * rule sits inside a no-preference query. So there is nothing to pause, and
 * this component is inert rather than special-cased.
 */
export default function RailSweep({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ARMING IS SEPARATE FROM FIRING, and that separation is the safety.
    // The card entrance hides the cards until it plays, so if the trigger
    // never came the shelf would simply be blank. Arming only happens here,
    // inside an effect: no JavaScript means no data-armed, which means the CSS
    // that hides them never applies and the cards render normally.
    el.dataset.armed = "true";

    // Two thresholds, because the two gestures want different moments. The
    // cards should rise as soon as any of the rail is on screen; the attention
    // sweep should wait until enough of it is there to be worth pointing at.
    // One threshold at 0.35 for both left the cards invisible while the top of
    // a 765px-card rail was already in view.
    const entrance = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.seen = "true";
          entrance.disconnect();
        }
      },
      { threshold: 0.01 },
    );

    const sweep = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.swept = "true";
          // One shot. The sweep stops itself after three passes; this stops it
          // ever starting a second time on the way back up.
          sweep.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    entrance.observe(el);
    sweep.observe(el);

    // Last resort. An IntersectionObserver that never fires — a rail taller
    // than the viewport it is measured against, a browser that throttles
    // observers in a background tab — must not be able to leave the shelf
    // empty. After three seconds the cards come in regardless.
    const failsafe = window.setTimeout(() => {
      el.dataset.seen = "true";
    }, 3000);

    return () => {
      entrance.disconnect();
      sweep.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div ref={ref} className={`rail-sweep ${className}`.trim()}>
      {children}
    </div>
  );
}

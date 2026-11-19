"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fires the one-shot `.promo-sweep` highlight (app/globals.css) when a promo
 * block first reaches the screen.
 *
 * It is a wrapper rather than a change to the promos themselves because those
 * are server components on purpose — their click tracking is delegated, so they
 * carry no client JS of their own and should keep it that way. All this adds is
 * one observer and one attribute; nothing here moves layout, changes the
 * markup a crawler sees, or fires an analytics event.
 */
export default function PromoSweep({
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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.swept = "true";
          // One shot. The animation itself stops after three passes; this stops
          // it ever starting a second time on scroll-back.
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`promo-sweep rounded-[4px] ${className}`.trim()}>
      {children}
    </div>
  );
}

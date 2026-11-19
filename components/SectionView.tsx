"use client";

// ============================================================
//  SectionView
//
//  Fires the contract `section_view` event the first time a block of
//  content actually reaches the reader's screen. Wraps server-rendered
//  children and adds no markup of its own beyond one div, so the
//  content stays in the HTML for crawlers and for anyone without
//  JavaScript.
//
//  Reporting which sections are reached is the only way to tell a page
//  that is read from one that is merely loaded.
// ============================================================

import { useEffect, useRef } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

export default function SectionView({
  sectionId,
  children,
  className,
}: {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || firedRef.current) continue;
          firedRef.current = true;
          observer.disconnect();
          trackClientEvent("section_view", { section_id: sectionId });
        }
      },
      // Half of the block has to be on screen. A section that merely
      // scrolled past the bottom edge was not read.
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

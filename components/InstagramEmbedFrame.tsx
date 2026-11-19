"use client";

import { useEffect, useRef, useState } from "react";

type InstagramEmbedFrameProps = {
  src: string;
  title: string;
};

/**
 * Instagram's embed opens with its own white header: avatar, handle, "Original
 * audio", a blue "View profile" button. Measured 2026-09-18 in the live embed,
 * it is exactly 54px, and it drew a white band across the top of every card on
 * a page that is black everywhere else.
 *
 * It also ends with one: "View more on Instagram", a like count, and a comment
 * box. Cropping only the top pulled that bottom bar into view, so the window is
 * cut to the media band at both ends. The media is 1.25x the embed width
 * (measured in the live embed, constant across widths), so the window is that
 * height and the frame is offset by the header above it.
 *
 * What is left is the reel on Instagram's black field, which is the card's own
 * background. Nothing a visitor needs is hidden: the handle is in the section
 * heading and every card already carries its own "Open on Instagram" link.
 */
export default function InstagramEmbedFrame({
  src,
  title,
}: InstagramEmbedFrameProps) {
  const [isReady, setIsReady] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => setIsReady(true), 2500);

    return () => {
      clearTimeout(fallbackTimer);

      if (revealTimer.current) {
        clearTimeout(revealTimer.current);
      }
    };
  }, []);

  return (
    <div className="relative h-[408px] overflow-hidden bg-black sm:h-[675px]">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(245,241,235,0.08),rgba(245,241,235,0.015)_38%,rgba(185,28,28,0.16))] transition-opacity duration-300 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      />
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        onLoad={() => {
          revealTimer.current = setTimeout(() => setIsReady(true), 250);
        }}
        className="absolute left-1/2 top-[-54px] z-0 h-[470px] w-[326px] max-w-none -translate-x-1/2 border-0 bg-black sm:h-[740px] sm:w-[540px]"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}

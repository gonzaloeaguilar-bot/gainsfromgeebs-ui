"use client";

import { useEffect, useRef, useState } from "react";

const VSL_EMBED_BASE_URL = "https://www.youtube.com/embed/hvYzjVFVsZI";
const VSL_THUMBNAIL_URL = "https://i.ytimg.com/vi/hvYzjVFVsZI/hq2.jpg";

export default function VslEmbedFrame({
  className = "",
  presentation = "portrait",
  autoplayOnVisible = false,
}: {
  className?: string;
  /** Compact decision cards need a wide poster; the dedicated coaching page
   * keeps the full portrait player. */
  presentation?: "portrait" | "wide";
  /** Browsers only permit observer-driven video playback when muted. */
  autoplayOnVisible?: boolean;
}) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hasAutoplayed = useRef(false);

  function loadPlayer({ muted = false }: { muted?: boolean } = {}) {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      origin: window.location.origin,
    });
    if (muted) params.set("mute", "1");

    setEmbedSrc(`${VSL_EMBED_BASE_URL}?${params.toString()}`);
  }

  useEffect(() => {
    if (!autoplayOnVisible || embedSrc || !frameRef.current) return;
    // Mobile browsers frequently show a black YouTube iframe before a muted
    // autoplay session actually starts. Keep the useful poster and explicit
    // play control there; desktop still starts the contextual card on view.
    if (window.matchMedia("(max-width: 639px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAutoplayed.current) return;
        hasAutoplayed.current = true;
        loadPlayer({ muted: true });
        observer.disconnect();
      },
      { threshold: 0.65 },
    );
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [autoplayOnVisible, embedSrc]);

  return (
    <div
      ref={frameRef}
      data-autoplay-on-visible={autoplayOnVisible ? "true" : undefined}
      className={`overflow-hidden rounded-lg border border-line2 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div
        className={`relative w-full bg-black ${
          presentation === "wide" ? "aspect-video" : "aspect-[9/16]"
        }`}
      >
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title="Kris explains the Geebs Coaching application call"
            className="absolute inset-0 h-full w-full border-0 bg-black"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label="Play Kris's training call video"
            onClick={loadPlayer}
            className="group absolute inset-0 block h-full w-full overflow-hidden bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloudText"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.28)), url(${VSL_THUMBNAIL_URL})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/70 shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-105">
              <span
                aria-hidden="true"
                className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-bone"
              />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

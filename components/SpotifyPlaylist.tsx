"use client";

import { useState } from "react";

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/1J03SjoTzHp3blsRSvjjxB";
const EMBED_URL =
  "https://open.spotify.com/embed/playlist/1J03SjoTzHp3blsRSvjjxB?utm_source=generator&theme=0";

type SpotifyPlaylistProps = {
  className?: string;
  headingTag?: "h2" | "h3";
  /**
   * One column, shorter copy, top rule only. For a page that has a height
   * budget to keep (the homepage) rather than one this section anchors (/about).
   */
  compact?: boolean;
};

/**
 * The playlist is a facade until someone asks for it.
 *
 * The embed is a 352px iframe with its own scrollable track list, and it sits
 * seven screens into the homepage. A swipe that lands on it scrolls Spotify's
 * tracks instead of the page: verified 2026-09-18 on production, where three
 * page-scroll gestures moved the list from track 1 to 24 and the page not at
 * all. It also loaded eagerly, which put a third-party frame on the money page
 * for every visitor, almost none of whom came for the music.
 *
 * So it renders as a card that says what it is, and mounts the iframe only
 * after a click. Nobody scrolling past can be caught by it, and anyone who
 * actually wants the playlist is one tap away from the real thing.
 */
export default function SpotifyPlaylist({
  className = "",
  headingTag: Heading = "h2",
  compact = false,
}: SpotifyPlaylistProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="spotify-playlist"
      data-analytics-source="spotify_playlist"
      data-compact={compact ? "" : undefined}
      className={
        compact
          ? `scroll-mt-24 grid gap-4 border-t border-line2 pt-5 md:scroll-mt-28 md:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] md:gap-8 ${className}`
          : `scroll-mt-24 grid gap-6 border-y border-line2 py-7 md:scroll-mt-28 md:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] md:gap-8 ${className}`
      }
    >
      <div>
        <p className="eyebrow text-cloudText">Gym playlist</p>
        <Heading
          className={
            compact
              ? "display mt-3 text-[22px] leading-[1.12] text-bone md:text-[28px]"
              : "display mt-4 text-[26px] leading-[1.12] text-bone md:text-[34px]"
          }
        >
          The playlist Kris trains to.
        </Heading>
        {compact ? (
          <p className="mt-2 max-w-[42ch] text-[14.5px] leading-[1.6] text-mute">
            The lift-day playlist Kris keeps in rotation.
          </p>
        ) : (
          <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.65] text-mute">
            Kris shared the lift-day playlist he keeps in rotation. It is a small
            window into the training environment behind the coaching: consistent,
            high-energy, and built for showing up.
          </p>
        )}
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center text-[14px] font-semibold text-bone underline decoration-bone/30 underline-offset-4 hover:decoration-bone"
        >
          Open playlist on Spotify
        </a>
      </div>

      <div className="overflow-hidden rounded-lg border border-line2 bg-black">
        {open ? (
          <iframe
            src={EMBED_URL}
            title="Spotify playlist: Legendary"
            width="100%"
            height="352"
            loading="lazy"
            className="block w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-analytics-event="spotify_playlist_open"
            className="flex w-full items-center gap-4 px-5 py-6 text-left transition-colors hover:bg-white/[0.04]"
          >
            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1db954] text-black"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>
              <span className="block text-[15.5px] font-semibold text-bone">
                Play the playlist here
              </span>
              <span className="mt-1 block text-[13.5px] leading-[1.5] text-mute">
                Loads the Spotify player on this page. 26 tracks.
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

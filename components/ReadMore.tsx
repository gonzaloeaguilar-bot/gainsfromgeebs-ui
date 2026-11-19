"use client";

import { useState, type ReactNode } from "react";

/**
 * Keeps a long passage to its first paragraph until someone asks for the rest.
 *
 * The Kris biography ran to three paragraphs on the homepage. On a phone that
 * is most of a screen of continuous prose in the middle of a page whose job is
 * to sell coaching, and the part that does the selling — that he coaches
 * everyone personally, no team, no copy-paste — was in the last one, where the
 * fewest people reach.
 *
 * The rest is in the DOM either way, so it is indexed and findable, and the
 * control is a real button with aria-expanded rather than a link that goes
 * nowhere.
 */
export default function ReadMore({
  children,
  moreLabel = "Read more",
  lessLabel = "Show less",
  id,
}: {
  children: ReactNode;
  moreLabel?: string;
  lessLabel?: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id={id} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        data-analytics-event="read_more_toggle"
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-bone underline decoration-cloudText/50 underline-offset-4 transition-colors hover:decoration-bone"
      >
        {open ? lessLabel : moreLabel}
        <span aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"}>
          ⌄
        </span>
      </button>
    </>
  );
}

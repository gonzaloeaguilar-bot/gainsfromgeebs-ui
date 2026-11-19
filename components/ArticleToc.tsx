"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blogPostPresentation";

/**
 * Persistent contents rail for long guides.
 *
 * Desktop (xl and up): sticks beside the article and highlights the section
 * currently in view, so a 3,000-word guide reads as a short list of parts
 * rather than an unbroken column.
 *
 * Below xl: collapses to a normal <details> block at the top of the article.
 * The links are real anchors either way, so the list works with JS disabled
 * and stays crawlable.
 */
export default function ArticleToc({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    // Track every heading's position rather than the first intersecting entry:
    // with long sections, no heading is on screen for most of the scroll, so
    // "last heading above the fold line" is the honest reading of where we are.
    const pick = () => {
      const line = window.innerHeight * 0.28;
      let current = targets[0];
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el;
        else break;
      }
      setActiveId(current.id);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [headings]);

  if (headings.length < 4) return null;

  return (
    <>
      {/* Collapsed on small screens: one line, not a 14-item wall above the intro. */}
      <details className="article-toc-collapsed mb-10 rounded-lg border border-line2 bg-bone/[0.025] p-5 xl:hidden">
        <summary className="eyebrow cursor-pointer list-none text-cloudText marker:content-['']">
          In this guide
          <span className="ml-2 text-mute2 normal-case tracking-normal">
            ({headings.length} sections)
          </span>
        </summary>
        <ol className="mt-4 grid gap-2 md:grid-cols-2">
          {headings.map((heading, index) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                data-analytics-event="toc_link_clicked"
                data-analytics-section-id={heading.id}
                data-analytics-position={index + 1}
                className="text-[14.5px] leading-[1.5] text-bone/85 underline decoration-line2 underline-offset-4 hover:text-cloudText"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </details>

      {/* Persistent rail from xl up. */}
      <nav
        aria-label="Table of contents"
        className="article-toc-rail hidden xl:block"
      >
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <p className="eyebrow text-cloudText">In this guide</p>
          <ol className="mt-4 space-y-1 border-l border-line2">
            {headings.map((heading, index) => {
              const isActive = heading.id === activeId;
              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    data-analytics-event="toc_link_clicked"
                    data-analytics-section-id={heading.id}
                    data-analytics-position={index + 1}
                    aria-current={isActive ? "true" : undefined}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-[1.4] transition-colors ${
                      isActive
                        ? "border-cloudText font-semibold text-bone"
                        : "border-transparent text-mute hover:border-line2 hover:text-bone/85"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}

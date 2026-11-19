"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Rail, type RailItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_CARD_HEADING, RAIL_LABELS } from "@/lib/railConfig";
import type { ReadingPath as ReadingPathData } from "@/lib/readingPaths";

type Props = {
  path: ReadingPathData;
  /** The page the rail is rendered on — marked read once the reader stays. */
  currentHref?: string;
  /** Surface label for analytics, e.g. "blog_post" or "blog_index". */
  source: string;
};

const STORAGE_PREFIX = "geebs.readingPath.";
/** A page counts as read after this long on it — a visit is not a read. */
const READ_AFTER_MS = 25_000;

function storageKey(pathId: string) {
  return `${STORAGE_PREFIX}${pathId}`;
}

// Progress lives in localStorage and is read through an external store, so the
// server renders the empty state and the client swaps in real progress without
// a setState-in-effect hydration dance.
const EMPTY: string[] = [];
const cache = new Map<string, string[]>();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readSnapshot(pathId: string): string[] {
  const cached = cache.get(pathId);
  if (cached) return cached;
  let parsedList: string[] = EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey(pathId));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      parsedList = parsed.filter((v): v is string => typeof v === "string");
    }
  } catch {
    // Private mode or a corrupted value — the rail still renders, just without
    // progress. Never let storage break the page.
    parsedList = EMPTY;
  }
  cache.set(pathId, parsedList);
  return parsedList;
}

function markRead(pathId: string, href: string): string[] {
  const current = readSnapshot(pathId);
  if (current.includes(href)) return current;
  const next = [...current, href];
  cache.set(pathId, next);
  try {
    window.localStorage.setItem(storageKey(pathId), JSON.stringify(next));
  } catch {
    /* storage unavailable — progress is best-effort */
  }
  listeners.forEach((listener) => listener());
  return next;
}

/**
 * A finishable track of articles rendered as a horizontal rail of tall cards.
 * The gamified part is honest: a page is marked read only after real time on
 * it, progress lives in the reader's own browser, and finishing the path
 * reveals the next step rather than gating anything behind it.
 */
export default function ReadingPath({ path, currentHref, source }: Props) {
  const read = useSyncExternalStore(
    subscribe,
    () => readSnapshot(path.id),
    () => EMPTY,
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const celebrated = useRef(false);

  // Mark the current page read after real dwell — not on load.
  useEffect(() => {
    if (!hydrated || !currentHref) return;
    if (!path.steps.some((s) => s.href === currentHref)) return;
    if (read.includes(currentHref)) return;

    const timer = window.setTimeout(() => {
      const next = markRead(path.id, currentHref);
      trackClientEvent("reading_path_step_read", {
        path_id: path.id,
        path_step_href: currentHref,
        path_steps_read: next.length,
        path_step_total: path.steps.length,
      });
    }, READ_AFTER_MS);

    return () => window.clearTimeout(timer);
  }, [currentHref, hydrated, path.id, path.steps, read]);

  const total = path.steps.length;
  const readCount = path.steps.filter((s) => read.includes(s.href)).length;
  const complete = readCount >= total;
  const nextStep = path.steps.find((s) => !read.includes(s.href));

  useEffect(() => {
    if (!hydrated || !complete || celebrated.current) return;
    celebrated.current = true;
    trackClientEvent("reading_path_completed", {
      path_id: path.id,
      path_step_total: total,
    });
  }, [complete, hydrated, path.id, total]);

  const railItems: RailItem[] = path.steps.map((step, index) => {
    const isRead = hydrated && read.includes(step.href);
    const isCurrent = step.href === currentHref;
    return {
      kind: "text",
      id: step.href,
      href: step.href,
      title: step.title,
      glyph: String(index + 1).padStart(2, "0"),
      description: step.description,
      meta: isRead ? "\u2713 Read" : isCurrent ? "You are here" : `${step.minutes} min`,
      cta: isRead ? "Read again" : isCurrent ? "Reading now" : "Read this next",
    };
  });

  const progress = (
    <div className="mt-5" aria-live="polite">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line2">
        <div
          className="h-full rounded-full bg-cloud transition-[width] duration-500"
          style={{ width: `${hydrated ? (readCount / total) * 100 : 0}%` }}
        />
      </div>
      <p className="mt-2 text-[13px] text-mute2">
        {!hydrated
          ? `${total} reads in this path`
          : complete
            ? `Path complete \u2014 all ${total} read.`
            : `${readCount} of ${total} read${nextStep ? ` \u00b7 up next: ${nextStep.title}` : ""}`}
      </p>
    </div>
  );

  const finishCard =
    hydrated && complete ? (
      <Link
        href={path.finish.href}
        className="rail-card"
        data-rail-highlighted="true"
        onClick={() =>
          trackClientEvent("reading_path_finish_click", {
            path_id: path.id,
            rail_source: source,
          })
        }
      >
        <span className="rail-card__body">
          <span className="rail-card__head">
            <span className="rail-card__title">{path.finish.label}</span>
          </span>
          <p className="rail-card__description">{path.finish.blurb}</p>
          <span className="rail-card__cta">
            {path.finish.label} <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    ) : null;

  return (
    <Rail
      className="not-prose mt-12 border-t border-line2 pt-8"
      items={railItems}
      source={`reading_path_${path.id}`}
      // Reading is browsing, not buying: the outlined variant keeps the
      // hierarchy with the offer rails, which stay filled.
      cta="secondary"
      titleAs={RAIL_CARD_HEADING}
      labels={RAIL_LABELS}
      eyebrow="Reading path"
      heading={path.title}
      subheading={path.promise}
      highlightId={nextStep?.href}
      progressSlot={progress}
      tailSlot={finishCard}
      onSelect={({ id, index }) =>
        trackClientEvent("reading_path_step_click", {
          path_id: path.id,
          path_step_href: id,
          card_index: index + 1,
          path_steps_read: readCount,
          rail_source: source,
        })
      }
    />
  );
}

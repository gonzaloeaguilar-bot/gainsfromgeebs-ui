"use client";

import { useCallback, useSyncExternalStore } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { deriveArticleSurface } from "@/lib/articleSurface";

const SIZES = [
  { id: "normal", label: "A", title: "Normal text size", px: 13 },
  { id: "large", label: "A", title: "Large text size", px: 15 },
  { id: "larger", label: "A", title: "Larger text size", px: 17.5 },
] as const;

type SizeId = (typeof SIZES)[number]["id"];
const STORAGE_KEY = "geebs_text_size";
const DEFAULT: SizeId = "normal";

const isSize = (v: string | null): v is SizeId =>
  SIZES.some((s) => s.id === v);

// localStorage is external state, so it is read through useSyncExternalStore
// rather than an effect. Setting state synchronously inside an effect cascades
// renders, and a lazy useState initializer would desync from the server render.
// This also gives the server a defined snapshot instead of a guess.
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changing the preference should update this one.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): SizeId {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isSize(stored) ? stored : DEFAULT;
}

const getServerSnapshot = (): SizeId => DEFAULT;

/**
 * Reader-facing text size control for long guides.
 *
 * The site declares every font size in px, so a reader who has set a larger
 * text size in their browser or OS sees no change. This hands that control
 * back: it sets data-text-size on every .article-scope, and globals.css scales
 * the prose from one variable.
 *
 * The choice persists across articles, because a reader who needs larger text
 * needs it everywhere, not only where they found the control.
 */
export default function TextSizeControl() {
  const size = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const apply = useCallback((next: SizeId) => {
    localStorage.setItem(STORAGE_KEY, next);
    for (const scope of document.querySelectorAll<HTMLElement>(".article-scope")) {
      scope.dataset.textSize = next;
    }
    emit();
    trackClientEvent("text_size_changed", {
      size: next,
      surface: deriveArticleSurface(typeof window !== "undefined" ? window.location.pathname : ""),
    });
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[13px] text-mute2">Text size</span>
      <div className="text-size-control" role="group" aria-label="Article text size">
        {SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => apply(s.id)}
            aria-pressed={size === s.id}
            title={s.title}
            style={{ fontSize: `${s.px}px` }}
          >
            {s.label}
            <span className="sr-only"> {s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

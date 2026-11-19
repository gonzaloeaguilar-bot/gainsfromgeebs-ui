"use client";

import { useEffect, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

const STORAGE_PREFIX = "geebs-daily-check-in:";
const HABITS = [
  "Choose one meal to make simple today",
  "Set aside time to move",
  "Write down tomorrow's first step",
] as const;

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyHabitCheckIn() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const storageKey = `${STORAGE_PREFIX}${todayKey()}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCompleted(
              parsed.filter(
                (item): item is number =>
                  Number.isInteger(item) && item >= 0 && item < HABITS.length,
              ),
            );
          }
        }
      } catch {
        // The check-in remains usable when local storage is unavailable.
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  function toggleHabit(index: number) {
    const next = completed.includes(index)
      ? completed.filter((item) => item !== index)
      : [...completed, index].sort();

    setCompleted(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Saving locally is optional; the interaction still works for this visit.
    }
    trackClientEvent("daily_habit_check_in", {
      completed_count: next.length,
      habit_index: index + 1,
    });
  }

  const allComplete = completed.length === HABITS.length;

  return (
    <section
      aria-labelledby="daily-check-in-heading"
      className="mt-10 rounded-lg border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
    >
      <p className="eyebrow text-cloudText">Daily check-in</p>
      <h2
        id="daily-check-in-heading"
        className="mt-3 text-[22px] font-semibold leading-[1.2] text-bone md:text-[26px]"
      >
        Pick your next step.
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-bone/85">
        Check off what fits today. Your progress stays on this device and starts fresh tomorrow.
      </p>

      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Today&apos;s check-in</legend>
        {HABITS.map((habit, index) => {
          const id = `daily-habit-${index}`;
          return (
            <label
              key={id}
              htmlFor={id}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-cloudText/20 bg-black/10 px-4 py-3 text-[15px] leading-[1.4] text-bone transition hover:border-cloudText/50 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cloudText"
            >
              <input
                id={id}
                type="checkbox"
                checked={completed.includes(index)}
                onChange={() => toggleHabit(index)}
                disabled={!ready}
                className="h-5 w-5 shrink-0 accent-cloudText"
              />
              <span>{habit}</span>
            </label>
          );
        })}
      </fieldset>

      <p className="mt-4 text-[14px] text-bone/75" role="status" aria-live="polite">
        {allComplete
          ? "Today is saved on this device. Come back tomorrow for a fresh check-in."
          : `${completed.length} of ${HABITS.length} checked today.`}
      </p>
    </section>
  );
}

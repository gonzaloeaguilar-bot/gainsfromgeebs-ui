"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import {
  DEFAULT_HABITS,
  calculateStreak,
  formatProgressSummary,
  getDailyFocus,
  getTodayKey,
  type HabitItem,
} from "./logic";

const HISTORY_STORAGE_KEY = "geebs-daily-habits-history";
const CUSTOM_HABITS_STORAGE_KEY = "geebs-custom-habits";

export default function DailyHabitTrackerForm() {
  const [todayKey, setTodayKey] = useState<string>("");
  const [habits, setHabits] = useState<HabitItem[]>(DEFAULT_HABITS);
  const [history, setHistory] = useState<Record<string, string[]>>({});
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [newHabitText, setNewHabitText] = useState("");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = getTodayKey();
    // This state is intentionally initialized after mount so the server's
    // timezone cannot create a date-key hydration mismatch for the visitor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);

    try {
      // Load custom habits
      const savedCustom = localStorage.getItem(CUSTOM_HABITS_STORAGE_KEY);
      let customHabits: HabitItem[] = [];
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed)) {
          customHabits = parsed;
        }
      }
      setHabits([...DEFAULT_HABITS, ...customHabits]);

      // Load habit history
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (parsedHistory && typeof parsedHistory === "object") {
          setHistory(parsedHistory);
          if (Array.isArray(parsedHistory[key])) {
            setCompletedIds(parsedHistory[key]);
          }
        }
      }
    } catch {
      // LocalStorage fallback
    } finally {
      setReady(true);
    }
  }, []);

  function toggleHabit(habitId: string) {
    if (!todayKey) return;

    const nextCompleted = completedIds.includes(habitId)
      ? completedIds.filter((id) => id !== habitId)
      : [...completedIds, habitId];

    setCompletedIds(nextCompleted);

    const nextHistory = {
      ...history,
      [todayKey]: nextCompleted,
    };
    setHistory(nextHistory);

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
    } catch {
      // localStorage error fallback
    }

    trackClientEvent("daily_habit_toggled", {
      habit_id: habitId,
      completed: nextCompleted.includes(habitId),
      completed_count: nextCompleted.length,
      total_habits: habits.length,
    });
  }

  function handleAddCustomHabit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newHabitText.trim();
    if (!trimmed) return;

    const newHabit: HabitItem = {
      id: `custom-${Date.now()}`,
      label: trimmed,
      category: "habit",
      isCustom: true,
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    setNewHabitText("");

    const customOnly = updatedHabits.filter((h) => h.isCustom);
    try {
      localStorage.setItem(CUSTOM_HABITS_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // localStorage error fallback
    }

    trackClientEvent("custom_habit_added", {
      habit_label: trimmed,
    });
  }

  function handleRemoveCustomHabit(id: string) {
    const updatedHabits = habits.filter((h) => h.id !== id);
    setHabits(updatedHabits);
    const nextCompleted = completedIds.filter((item) => item !== id);
    setCompletedIds(nextCompleted);

    const customOnly = updatedHabits.filter((h) => h.isCustom);
    try {
      localStorage.setItem(CUSTOM_HABITS_STORAGE_KEY, JSON.stringify(customOnly));
      if (todayKey) {
        const nextHistory = { ...history, [todayKey]: nextCompleted };
        setHistory(nextHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
      }
    } catch {
      // localStorage error fallback
    }
  }

  function handleResetToday() {
    if (!todayKey) return;
    setCompletedIds([]);
    const nextHistory = { ...history, [todayKey]: [] };
    setHistory(nextHistory);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
    } catch {
      // localStorage fallback
    }
    trackClientEvent("daily_habits_reset", { date_key: todayKey });
  }

  async function handleCopySummary() {
    const summary = formatProgressSummary(
      completedIds.length,
      habits.length,
      streakData.currentStreak,
      todayKey
    );
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      trackClientEvent("daily_habits_summary_copied", {
        completed_count: completedIds.length,
      });
    } catch {
      // Clipboard fallback
    }
  }

  const streakData = calculateStreak(history, todayKey || getTodayKey());
  const dailyFocus = getDailyFocus();
  const progressPercent =
    habits.length > 0 ? Math.round((completedIds.length / habits.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Stats & Streak Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Current Streak</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? streakData.currentStreak : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              day{streakData.currentStreak === 1 ? "" : "s"}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">Consecutive active check-ins</p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Today&apos;s Progress</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${completedIds.length}/${habits.length}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              ({progressPercent}%)
            </span>
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full bg-cloudText transition-all duration-300 ease-out"
              style={{ width: `${ready ? progressPercent : 0}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Active Check-ins</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? streakData.totalActiveDays : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">total days</span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">Saved locally on your device</p>
        </div>
      </div>

      {/* Rotating Daily Focus Prompt */}
      <section
        aria-labelledby="daily-focus-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
      >
        <p className="eyebrow text-cloudText">Daily Habit Focus</p>
        <h2
          id="daily-focus-heading"
          className="mt-2 text-[20px] md:text-[22px] font-semibold text-bone"
        >
          {dailyFocus.topic}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">{dailyFocus.tip}</p>
      </section>

      {/* Interactive Habit Checklist */}
      <section aria-labelledby="checklist-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="checklist-heading" className="text-[20px] font-semibold text-bone">
            Today&apos;s Habit Checklist
          </h2>
          {completedIds.length > 0 && (
            <button
              type="button"
              onClick={handleResetToday}
              className="text-[13px] text-bone/60 underline hover:text-bone"
            >
              Reset today
            </button>
          )}
        </div>

        <fieldset className="space-y-3">
          <legend className="sr-only">Daily habits list</legend>
          {habits.map((habit) => {
            const isChecked = completedIds.includes(habit.id);
            const inputId = `habit-${habit.id}`;
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-cloudText/20 bg-black/10 px-4 py-3.5 transition hover:border-cloudText/40 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cloudText"
              >
                <label
                  htmlFor={inputId}
                  className="flex flex-1 min-h-11 cursor-pointer items-center gap-3.5 text-[15px] leading-[1.45] text-bone"
                >
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleHabit(habit.id)}
                    disabled={!ready}
                    className="h-5 w-5 shrink-0 accent-cloudText cursor-pointer"
                  />
                  <span className={isChecked ? "line-through text-bone/50" : "text-bone"}>
                    {habit.label}
                  </span>
                </label>

                {habit.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomHabit(habit.id)}
                    aria-label={`Remove custom habit: ${habit.label}`}
                    className="p-1 text-[13px] text-bone/40 hover:text-cloudText"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </fieldset>
      </section>

      {/* Add Custom Habit Form */}
      <form onSubmit={handleAddCustomHabit} className="rounded-xl border border-cloudText/20 bg-black/10 p-4">
        <label htmlFor="custom-habit-input" className="block text-[13.5px] font-medium text-bone/85 mb-2">
          Add your own daily habit
        </label>
        <div className="flex gap-2">
          <input
            id="custom-habit-input"
            type="text"
            placeholder="e.g. 10 minutes mobility or zero screens 30m before bed"
            value={newHabitText}
            onChange={(e) => setNewHabitText(e.target.value)}
            className="apply-input flex-1 min-w-0 !py-2.5 !text-[14px]"
          />
          <button
            type="submit"
            disabled={!newHabitText.trim()}
            className="btn btn-secondary whitespace-nowrap text-[13px] px-4 py-2.5 disabled:opacity-50"
          >
            Add habit
          </button>
        </div>
      </form>

      {/* Share / Copy Summary Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-cloudText/20">
        <button
          type="button"
          onClick={handleCopySummary}
          className="btn btn-secondary text-[13.5px] py-2.5 px-4"
        >
          {copied ? "✓ Copied to clipboard" : "Copy progress summary"}
        </button>

        <p className="text-[13px] text-bone/60">
          {completedIds.length === habits.length
            ? "All habits completed today! Progress saved locally."
            : `${completedIds.length} of ${habits.length} habits checked today.`}
        </p>
      </div>

      {/* Email Capture Block */}
      <section aria-labelledby="email-capture-heading" className="pt-6 border-t border-cloudText/20">
        <h3 id="email-capture-heading" className="sr-only">
          Email updates signup
        </h3>
        <ToolEmailCapture toolName="daily-habit-tracker" />
      </section>

      {/* Cross-navigation to related habit & science resources */}
      <nav aria-label="Related tools navigation" className="pt-6 border-t border-cloudText/20 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75">
        <Link className="hover:text-cloudText underline" href="/free/daily">
          Today&apos;s Science Finding &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/perfect-day-builder">
          Perfect Day Meal Builder &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/macro-calculator">
          Macro Calculator &rarr;
        </Link>
      </nav>
    </div>
  );
}

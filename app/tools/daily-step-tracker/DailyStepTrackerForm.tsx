"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  BaselineActivity,
  RotatingStepTip,
  StepGoalType,
  StepTrackerInputs,
  WeightUnit,
  calculateDailyStepTarget,
  calculateStepProgress,
  calculateStepStreak,
  formatDailyStepSummary,
  getRotatingStepTip,
  getTodayKey,
} from "./logic";

const STORAGE_KEY = "geebs_daily_step_tracker_v1";

interface StoredStepData {
  inputs: StepTrackerInputs;
  history: Record<string, number>;
  lastActiveDate: string;
}

const DEFAULT_INPUTS: StepTrackerInputs = {
  bodyWeight: 180,
  unit: "lbs",
  goalType: "recomp",
  customTarget: 10000,
  baselineActivity: "sedentary",
};

export default function DailyStepTrackerForm() {
  const [ready, setReady] = useState(false);
  const [todayKey, setTodayKey] = useState<string>("");
  const [inputs, setInputs] = useState<StepTrackerInputs>(DEFAULT_INPUTS);
  const [todaySteps, setTodaySteps] = useState<number>(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [customAddValue, setCustomAddValue] = useState<string>("");

  useEffect(() => {
    const key = getTodayKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredStepData = JSON.parse(raw);
        if (parsed.inputs) {
          setInputs(parsed.inputs);
        }
        if (parsed.history) {
          setHistory(parsed.history);
          if (parsed.history[key] !== undefined) {
            setTodaySteps(parsed.history[key]);
          }
        }
      }
    } catch {
      // Local storage fallback
    }
    setReady(true);
  }, []);

  const result = calculateStepProgress(inputs, todaySteps);
  const streakInfo = calculateStepStreak(history, result.dailyStepTarget, todayKey || getTodayKey());
  const rotatingTip: RotatingStepTip = getRotatingStepTip();

  function saveToStorage(nextInputs: StepTrackerInputs, nextHistory: Record<string, number>, key: string) {
    try {
      const payload: StoredStepData = {
        inputs: nextInputs,
        history: nextHistory,
        lastActiveDate: key,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage unavailable
    }
  }

  function updateInput<K extends keyof StepTrackerInputs>(field: K, value: StepTrackerInputs[K]) {
    const nextInputs = { ...inputs, [field]: value };
    setInputs(nextInputs);
    saveToStorage(nextInputs, history, todayKey);
  }

  function logSteps(newTotal: number) {
    const clamped = Math.max(0, Math.min(100000, Math.round(newTotal)));
    setTodaySteps(clamped);

    if (todayKey) {
      const nextHistory = { ...history, [todayKey]: clamped };
      setHistory(nextHistory);
      saveToStorage(inputs, nextHistory, todayKey);

      trackClientEvent("daily_step_tracker_logged", {
        steps: clamped,
        target: result.dailyStepTarget,
        date: todayKey,
      });
    }
  }

  function addSteps(delta: number) {
    logSteps(todaySteps + delta);
  }

  function handleCustomAdd(e: React.FormEvent) {
    e.preventDefault();
    const val = parseInt(customAddValue, 10);
    if (!isNaN(val) && val > 0) {
      addSteps(val);
      setCustomAddValue("");
    }
  }

  async function handleCopySummary() {
    const summary = formatDailyStepSummary(
      inputs,
      todaySteps,
      result.dailyStepTarget,
      result.neatCaloriesBurned,
      streakInfo.currentStreak,
      streakInfo.sevenDayAverage,
      todayKey || getTodayKey()
    );

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      trackClientEvent("daily_step_tracker_copied", {
        steps: todaySteps,
        target: result.dailyStepTarget,
      });
    } catch {
      // Fallback
    }
  }

  function getTierBadgeClass(tier: string) {
    switch (tier) {
      case "surpassed":
      case "goal_reached":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
      case "progressing":
        return "border-cloudText/30 bg-cloudText/10 text-cloudText";
      case "starting":
      default:
        return "border-bone/20 bg-bone/5 text-bone/70";
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Today's Step Count & Progress */}
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Today&apos;s Steps</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? todaySteps.toLocaleString() : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              / {ready ? result.dailyStepTarget.toLocaleString() : "—"}
            </span>
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full bg-cloudText transition-all duration-300 ease-out"
              style={{ width: `${ready ? result.progressPct : 0}%` }}
            />
          </div>
          <p className="mt-2 text-[12.5px] text-bone/60">
            {ready ? `${result.progressPct}% of daily target` : "Loading..."}
          </p>
        </div>

        {/* Estimated NEAT Burn */}
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Estimated NEAT Burn</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `~${result.neatCaloriesBurned}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">kcal</span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            Target burn: ~{ready ? result.targetNeatCalories : 0} kcal from non-exercise activity
          </p>
        </div>

        {/* Streak & 7-Day Average */}
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Active Goal Streak</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? streakInfo.currentStreak : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              day{streakInfo.currentStreak === 1 ? "" : "s"}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            7-day avg: {ready ? `${streakInfo.sevenDayAverage.toLocaleString()} steps` : "Private storage"}
          </p>
        </div>
      </div>

      {/* Rotating Science Focus */}
      <section
        aria-labelledby="step-science-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-cloudText">Movement &amp; NEAT Insight · {rotatingTip.dayName}</p>
          <Link
            href={rotatingTip.sourceUrl}
            className="text-[13px] text-cloudText underline hover:text-bone"
          >
            {rotatingTip.sourceLabel} &rarr;
          </Link>
        </div>
        <h2
          id="step-science-heading"
          className="mt-2 text-[19px] md:text-[21px] font-semibold text-bone"
        >
          {rotatingTip.topic}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">{rotatingTip.tip}</p>
      </section>

      {/* Interactive Step Logger Card */}
      <section
        aria-labelledby="step-logger-heading"
        className="rounded-2xl border border-cloudText/20 bg-black/10 p-5 md:p-6 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cloudText/15 pb-4">
          <div>
            <h2 id="step-logger-heading" className="text-[20px] font-semibold text-bone">
              Quick Step Log {todayKey ? `(${todayKey})` : ""}
            </h2>
            <p className="text-[13px] text-bone/60 mt-0.5">
              Tap buttons to increment your total or enter exact count from your watch or phone
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-[12.5px] font-medium border ${getTierBadgeClass(result.tier)}`}>
            {result.tierLabel}
          </span>
        </div>

        {/* Quick Increment Buttons */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2.5">
            Quick Add Steps
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: 500, label: "+500", sub: "Brief 5m stroll" },
              { val: 1000, label: "+1,000", sub: "~10m movement" },
              { val: 2500, label: "+2,500", sub: "~25m active walk" },
              { val: 5000, label: "+5,000", sub: "~45-50m session" },
            ].map((btn) => (
              <button
                key={btn.val}
                type="button"
                onClick={() => addSteps(btn.val)}
                className="min-h-[48px] rounded-xl border border-cloudText/20 bg-black/20 p-2.5 text-center transition flex flex-col items-center justify-center hover:border-cloudText hover:bg-cloudText/20 active:scale-[0.98]"
              >
                <span className="text-[15px] font-bold text-bone">{btn.label}</span>
                <span className="text-[11px] text-bone/50">{btn.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Adjust / Direct Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label htmlFor="direct-step-input" className="block text-[14px] font-medium text-bone mb-1.5">
              Set Total Steps for Today
            </label>
            <div className="flex gap-2">
              <input
                id="direct-step-input"
                type="number"
                min="0"
                max="100000"
                step="100"
                value={todaySteps || ""}
                placeholder="0"
                onChange={(e) => logSteps(parseInt(e.target.value, 10) || 0)}
                className="apply-input flex-1 min-w-0 !py-2.5 !text-[15px] font-mono"
              />
              <button
                type="button"
                onClick={() => logSteps(0)}
                className="btn btn-secondary text-[13px] py-2 px-3 whitespace-nowrap text-bone/60 hover:text-bone"
              >
                Reset
              </button>
            </div>
          </div>

          <form onSubmit={handleCustomAdd}>
            <label htmlFor="custom-add-input" className="block text-[14px] font-medium text-bone mb-1.5">
              Add Specific Step Count
            </label>
            <div className="flex gap-2">
              <input
                id="custom-add-input"
                type="number"
                min="1"
                max="50000"
                placeholder="e.g. 1500"
                value={customAddValue}
                onChange={(e) => setCustomAddValue(e.target.value)}
                className="apply-input flex-1 min-w-0 !py-2.5 !text-[15px] font-mono"
              />
              <button
                type="submit"
                className="btn btn-primary text-[13.5px] py-2 px-4 whitespace-nowrap"
              >
                + Add
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Configuration & Target Calculator */}
      <section
        aria-labelledby="config-heading"
        className="rounded-2xl border border-cloudText/20 bg-black/10 p-5 md:p-6 space-y-6"
      >
        <div className="border-b border-cloudText/15 pb-4">
          <h2 id="config-heading" className="text-[20px] font-semibold text-bone">
            Step Target &amp; NEAT Calculator Settings
          </h2>
          <p className="text-[13px] text-bone/60 mt-0.5">
            Adjust your goal mode and baseline activity to calculate realistic daily step targets
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Goal Mode */}
          <div>
            <label className="block text-[14px] font-medium text-bone mb-2">
              Primary Goal
            </label>
            <div className="space-y-2">
              {[
                { val: "fat_loss" as StepGoalType, label: "Fat Loss (10,000 steps)", sub: "Max NEAT for deficit" },
                { val: "recomp" as StepGoalType, label: "Body Recomposition (8,500 steps)", sub: "Balanced energy turnover" },
                { val: "maintenance" as StepGoalType, label: "Maintenance (7,500 steps)", sub: "Cardiometabolic baseline" },
                { val: "cardio_health" as StepGoalType, label: "Cardio Health (10,000 steps)", sub: "Longevity & insulin health" },
                { val: "custom" as StepGoalType, label: "Custom Target", sub: "Set custom floor" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateInput("goalType", opt.val)}
                  className={`w-full min-h-[44px] rounded-xl border p-2.5 text-left transition flex flex-col justify-center ${
                    inputs.goalType === opt.val
                      ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                      : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                  }`}
                >
                  <span className="text-[13.5px] font-semibold">{opt.label}</span>
                  <span className="text-[11px] text-bone/50">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Baseline Activity Level */}
          <div>
            <label className="block text-[14px] font-medium text-bone mb-2">
              Baseline Daily Activity
            </label>
            <div className="space-y-2">
              {[
                { val: "sedentary" as BaselineActivity, label: "Sedentary / Desk Job", sub: "< 4,000 incidental steps" },
                { val: "light" as BaselineActivity, label: "Lightly Active", sub: "4,000 – 7,000 standard steps" },
                { val: "moderate" as BaselineActivity, label: "Moderately Active", sub: "On feet frequently" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateInput("baselineActivity", opt.val)}
                  className={`w-full min-h-[44px] rounded-xl border p-2.5 text-left transition flex flex-col justify-center ${
                    inputs.baselineActivity === opt.val
                      ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                      : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                  }`}
                >
                  <span className="text-[13.5px] font-semibold">{opt.label}</span>
                  <span className="text-[11px] text-bone/50">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Body Weight & Custom Step Target */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="body-weight-input" className="text-[14px] font-medium text-bone">
                  Body Weight
                </label>
                <div className="inline-flex rounded-lg border border-cloudText/20 p-0.5 text-[12px]">
                  <button
                    type="button"
                    onClick={() => updateInput("unit", "lbs")}
                    className={`px-2 py-0.5 rounded ${inputs.unit === "lbs" ? "bg-cloudText text-black font-semibold" : "text-bone/70"}`}
                  >
                    lbs
                  </button>
                  <button
                    type="button"
                    onClick={() => updateInput("unit", "kg")}
                    className={`px-2 py-0.5 rounded ${inputs.unit === "kg" ? "bg-cloudText text-black font-semibold" : "text-bone/70"}`}
                  >
                    kg
                  </button>
                </div>
              </div>
              <input
                id="body-weight-input"
                type="number"
                min="60"
                max="500"
                value={inputs.bodyWeight || ""}
                onChange={(e) => updateInput("bodyWeight", parseFloat(e.target.value) || 0)}
                className="apply-input w-full !py-2.5 !text-[15px] font-mono"
              />
            </div>

            {inputs.goalType === "custom" && (
              <div>
                <label htmlFor="custom-target-input" className="block text-[14px] font-medium text-bone mb-1.5">
                  Custom Daily Step Floor
                </label>
                <input
                  id="custom-target-input"
                  type="number"
                  min="2000"
                  max="40000"
                  step="500"
                  value={inputs.customTarget || ""}
                  onChange={(e) => updateInput("customTarget", parseInt(e.target.value, 10) || 0)}
                  className="apply-input w-full !py-2.5 !text-[15px] font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Suggested Daily Pacing Windows */}
      <section
        aria-labelledby="pacing-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6 space-y-4"
      >
        <div className="border-b border-cloudText/15 pb-3">
          <h2 id="pacing-heading" className="text-[19px] md:text-[21px] font-semibold text-bone">
            Suggested Daily Step Distribution
          </h2>
          <p className="text-[13px] text-bone/65 mt-0.5">
            Breaking your {result.dailyStepTarget.toLocaleString()} step target into 4 daily windows makes consistency effortless
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {result.pacingSlots.map((slot) => (
            <div
              key={slot.id}
              className="rounded-xl border border-cloudText/20 bg-black/20 p-3.5 flex flex-col justify-between"
            >
              <div>
                <p className="text-[14px] font-semibold text-bone">{slot.name}</p>
                <p className="text-[11.5px] text-bone/55 mt-0.5">{slot.subtitle}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-cloudText/10 flex items-baseline justify-between">
                <span className="text-[18px] font-bold text-cloudText">
                  {slot.targetSteps.toLocaleString()}
                </span>
                <span className="text-[11.5px] text-bone/50">target steps</span>
              </div>
            </div>
          ))}
        </div>

        {/* Copy & Summary Actions */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-cloudText/15">
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn btn-secondary text-[13.5px] py-2.5 px-4 min-h-[44px]"
          >
            {copied ? "✓ Copied to clipboard" : "Copy step log summary"}
          </button>
          <span className="text-[12.5px] text-bone/60">
            Formatted for habit logs, Apple Health notes, or coaching check-ins
          </span>
        </div>
      </section>

      {/* Email Capture Block */}
      <section aria-labelledby="step-email-capture-heading" className="pt-6 border-t border-cloudText/20">
        <h3 id="step-email-capture-heading" className="sr-only">
          Daily Step Tracker email updates
        </h3>
        <ToolEmailCapture toolName="daily-step-tracker" />
      </section>

      {/* Related Tools Navigation */}
      <nav
        aria-label="Related tools navigation"
        className="pt-6 border-t border-cloudText/20 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75"
      >
        <Link className="hover:text-cloudText underline" href="/tools/daily-habit-tracker">
          Daily Habit &amp; Routine Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-hydration-tracker">
          Daily Hydration Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-protein-tracker">
          Daily Protein &amp; Meal Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-readiness-tracker">
          Daily Workout Readiness Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/calorie-deficit-calculator">
          Calorie Deficit Calculator &rarr;
        </Link>
      </nav>
    </div>
  );
}

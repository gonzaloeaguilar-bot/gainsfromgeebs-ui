"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  EnergyLevel,
  JointComfort,
  MuscleSoreness,
  NutritionHydration,
  ReadinessInputs,
  SleepDuration,
  SleepQuality,
  StressLevel,
  calculateReadinessScore,
  calculateReadinessStreak,
  formatDailyReadinessSummary,
  getRotatingReadinessTip,
  getTodayKey,
} from "./logic";

const STORAGE_KEY = "geebs_daily_readiness_tracker_v1";

interface StoredReadinessData {
  inputs: ReadinessInputs;
  history: Record<string, number>;
  lastActiveDate: string;
}

const DEFAULT_INPUTS: ReadinessInputs = {
  sleepHours: "7_to_8",
  sleepQuality: "good",
  muscleSoreness: "mild",
  energyLevel: 4,
  jointComfort: "good",
  nutritionHydration: "optimal",
  stressLevel: "low",
};

export default function DailyReadinessTrackerForm() {
  const [ready, setReady] = useState(false);
  const [todayKey, setTodayKey] = useState<string>("");
  const [inputs, setInputs] = useState<ReadinessInputs>(DEFAULT_INPUTS);
  const [history, setHistory] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  // Initialize from local storage
  useEffect(() => {
    const key = getTodayKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredReadinessData = JSON.parse(raw);
        if (parsed.inputs) {
          setInputs(parsed.inputs);
        }
        if (parsed.history) {
          setHistory(parsed.history);
          if (parsed.history[key] !== undefined && parsed.history[key] > 0) {
            setLoggedToday(true);
          }
        }
      }
    } catch {
      // Storage fallback
    }
    setReady(true);
  }, []);

  const result = calculateReadinessScore(inputs);
  const streakInfo = calculateReadinessStreak(history, todayKey || getTodayKey());
  const rotatingTip = getRotatingReadinessTip();

  function updateInput<K extends keyof ReadinessInputs>(field: K, value: ReadinessInputs[K]) {
    const nextInputs = { ...inputs, [field]: value };
    setInputs(nextInputs);

    // If already logged today, update today's score in history
    if (ready && todayKey && loggedToday) {
      const newScore = calculateReadinessScore(nextInputs).totalScore;
      const nextHistory = { ...history, [todayKey]: newScore };
      setHistory(nextHistory);
      saveToStorage(nextInputs, nextHistory, todayKey);
    }
  }

  function saveToStorage(nextInputs: ReadinessInputs, nextHistory: Record<string, number>, key: string) {
    try {
      const toSave: StoredReadinessData = {
        inputs: nextInputs,
        history: nextHistory,
        lastActiveDate: key,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Storage unavailable
    }
  }

  function handleSaveCheckIn() {
    if (!todayKey) return;
    const currentScore = result.totalScore;
    const nextHistory = { ...history, [todayKey]: currentScore };
    setHistory(nextHistory);
    setLoggedToday(true);
    saveToStorage(inputs, nextHistory, todayKey);

    trackClientEvent("readiness_tracker_saved", {
      score: currentScore,
      tier: result.tier,
      date: todayKey,
    });
  }

  async function handleCopySummary() {
    const summary = formatDailyReadinessSummary(
      result,
      streakInfo.currentStreak,
      streakInfo.sevenDayAverage,
      todayKey || getTodayKey()
    );

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      trackClientEvent("readiness_tracker_summary_copied", {
        score: result.totalScore,
        tier: result.tier,
      });
    } catch {
      // Fallback
    }
  }

  function getTierBadgeClass(tier: string) {
    switch (tier) {
      case "optimal":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
      case "moderate":
        return "border-cloudText/30 bg-cloudText/10 text-cloudText";
      case "reduced":
        return "border-amber-500/30 bg-amber-500/10 text-amber-300";
      case "recovery":
        return "border-rose-500/30 bg-rose-500/10 text-rose-300";
      default:
        return "border-cloudText/30 bg-cloudText/10 text-cloudText";
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Overview & Streak Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Readiness Score</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${result.totalScore}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">/ 100</span>
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full bg-cloudText transition-all duration-300 ease-out"
              style={{ width: `${ready ? result.totalScore : 0}%` }}
            />
          </div>
          <p className="mt-2 text-[12.5px] text-bone/60">
            {ready ? result.tierLabel : "Calculating..."}
          </p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Check-In Streak</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? streakInfo.currentStreak : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              day{streakInfo.currentStreak === 1 ? "" : "s"}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            {loggedToday ? "✓ Logged today" : "Log today to build streak"}
          </p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">7-Day Average</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${streakInfo.sevenDayAverage}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">/ 100</span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            {ready ? `${streakInfo.totalLoggedDays} check-in${streakInfo.totalLoggedDays === 1 ? "" : "s"} recorded` : "Private local storage"}
          </p>
        </div>
      </div>

      {/* Rotating Daily Science Focus */}
      <section
        aria-labelledby="readiness-science-focus-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-cloudText">Recovery Insight · {rotatingTip.dayName}</p>
          <Link
            href={rotatingTip.sourceUrl}
            className="text-[13px] text-cloudText underline hover:text-bone"
          >
            {rotatingTip.sourceLabel} &rarr;
          </Link>
        </div>
        <h2
          id="readiness-science-focus-heading"
          className="mt-2 text-[19px] md:text-[21px] font-semibold text-bone"
        >
          {rotatingTip.topic}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">{rotatingTip.tip}</p>
      </section>

      {/* Interactive Questionnaire Form */}
      <section
        aria-labelledby="assessment-heading"
        className="rounded-2xl border border-cloudText/20 bg-black/10 p-5 md:p-6 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cloudText/15 pb-4">
          <h2 id="assessment-heading" className="text-[20px] font-semibold text-bone">
            Daily Recovery &amp; Readiness Assessment {todayKey ? `(${todayKey})` : ""}
          </h2>
          <span className="text-[13px] text-bone/60">Tap options below to calculate</span>
        </div>

        {/* 1. Sleep Duration */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2">
            1. Sleep Duration (Last Night)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: "under_6" as SleepDuration, label: "< 6 hours", sub: "Restricted" },
              { val: "6_to_7" as SleepDuration, label: "6 – 7 hours", sub: "Borderline" },
              { val: "7_to_8" as SleepDuration, label: "7 – 8 hours", sub: "Optimal" },
              { val: "over_8" as SleepDuration, label: "8+ hours", sub: "Restorative" },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateInput("sleepHours", opt.val)}
                className={`min-h-[48px] rounded-xl border p-2.5 text-center transition flex flex-col items-center justify-center ${
                  inputs.sleepHours === opt.val
                    ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                    : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                }`}
              >
                <span className="text-[14px] font-semibold">{opt.label}</span>
                <span className="text-[11px] text-bone/50">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Sleep Quality */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2">
            2. Perceived Sleep Quality
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: "poor" as SleepQuality, label: "Poor", sub: "Frequent wakeups" },
              { val: "fair" as SleepQuality, label: "Fair", sub: "Light / broken" },
              { val: "good" as SleepQuality, label: "Good", sub: "Solid rest" },
              { val: "excellent" as SleepQuality, label: "Deep & Rested", sub: "Woke refreshed" },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateInput("sleepQuality", opt.val)}
                className={`min-h-[48px] rounded-xl border p-2.5 text-center transition flex flex-col items-center justify-center ${
                  inputs.sleepQuality === opt.val
                    ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                    : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                }`}
              >
                <span className="text-[14px] font-semibold">{opt.label}</span>
                <span className="text-[11px] text-bone/50">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Muscle Soreness */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2">
            3. Muscle Soreness (DOMS)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: "none" as MuscleSoreness, label: "None / Fresh", sub: "No soreness" },
              { val: "mild" as MuscleSoreness, label: "Mild Soreness", sub: "Noticeable on movement" },
              { val: "moderate" as MuscleSoreness, label: "Moderate Soreness", sub: "Affects range of motion" },
              { val: "severe" as MuscleSoreness, label: "High / Severe", sub: "Deeply sore or tender" },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateInput("muscleSoreness", opt.val)}
                className={`min-h-[48px] rounded-xl border p-2.5 text-center transition flex flex-col items-center justify-center ${
                  inputs.muscleSoreness === opt.val
                    ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                    : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                }`}
              >
                <span className="text-[14px] font-semibold">{opt.label}</span>
                <span className="text-[11px] text-bone/50">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Energy & CNS State */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2">
            4. Systemic Energy &amp; Drive (1 = Exhausted, 5 = Peak)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {([1, 2, 3, 4, 5] as EnergyLevel[]).map((lvl) => {
              const labels = ["Drained", "Low", "Moderate", "High", "Peak"];
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => updateInput("energyLevel", lvl)}
                  className={`min-h-[48px] rounded-xl border p-2 text-center transition flex flex-col items-center justify-center ${
                    inputs.energyLevel === lvl
                      ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                      : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                  }`}
                >
                  <span className="text-[16px] font-bold">{lvl}</span>
                  <span className="text-[10.5px] text-bone/50">{labels[lvl - 1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Joint Comfort */}
        <div>
          <label className="block text-[14px] font-medium text-bone mb-2">
            5. Joint Comfort &amp; Movement Integrity
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { val: "stiff" as JointComfort, label: "Achy / Stiff", sub: "Needs careful warm-up" },
              { val: "moderate" as JointComfort, label: "Standard / Minor", sub: "Normal baseline" },
              { val: "good" as JointComfort, label: "Fluid & Pain-Free", sub: "Full mobility" },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateInput("jointComfort", opt.val)}
                className={`min-h-[48px] rounded-xl border p-2.5 text-center transition flex flex-col items-center justify-center ${
                  inputs.jointComfort === opt.val
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

        {/* 6. Nutrition & Hydration & Stress (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-bone mb-2">
              6. Fueling &amp; Hydration (Past 24 Hours)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "poor" as NutritionHydration, label: "Under-fueled", sub: "Missed targets" },
                { val: "moderate" as NutritionHydration, label: "Moderate", sub: "Met baseline" },
                { val: "optimal" as NutritionHydration, label: "Optimal", sub: "High protein/fluid" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateInput("nutritionHydration", opt.val)}
                  className={`min-h-[48px] rounded-xl border p-2 text-center transition flex flex-col items-center justify-center ${
                    inputs.nutritionHydration === opt.val
                      ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                      : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                  }`}
                >
                  <span className="text-[13px] font-semibold">{opt.label}</span>
                  <span className="text-[10.5px] text-bone/50">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-bone mb-2">
              7. Non-Training Stress Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "high" as StressLevel, label: "High Stress", sub: "Work / life load" },
                { val: "moderate" as StressLevel, label: "Moderate", sub: "Manageable" },
                { val: "low" as StressLevel, label: "Low / Relaxed", sub: "Low friction" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateInput("stressLevel", opt.val)}
                  className={`min-h-[48px] rounded-xl border p-2 text-center transition flex flex-col items-center justify-center ${
                    inputs.stressLevel === opt.val
                      ? "border-cloudText bg-cloudText/20 text-bone ring-1 ring-cloudText"
                      : "border-cloudText/20 bg-black/20 text-bone/70 hover:border-cloudText/50 hover:text-bone"
                  }`}
                >
                  <span className="text-[13px] font-semibold">{opt.label}</span>
                  <span className="text-[10.5px] text-bone/50">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-cloudText/15">
          <button
            type="button"
            onClick={handleSaveCheckIn}
            className="btn btn-primary text-[14px] py-3 px-6 min-h-[46px]"
          >
            {loggedToday ? "✓ Update today's check-in" : "Save today's check-in"}
          </button>
          <span className="text-[13px] text-bone/60">
            {loggedToday ? "Saved to device storage" : "Tap save to lock streak for today"}
          </span>
        </div>
      </section>

      {/* Readiness Results & Recommendation Card */}
      <section
        aria-labelledby="results-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cloudText/15 pb-4">
          <div>
            <p className="eyebrow text-cloudText">Readiness Output</p>
            <h2 id="results-heading" className="text-[22px] md:text-[24px] font-semibold text-bone mt-1">
              Score: {result.totalScore}/100
            </h2>
          </div>
          <span
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border ${getTierBadgeClass(
              result.tier
            )}`}
          >
            {result.tierLabel}
          </span>
        </div>

        {/* Training Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-cloudText/20 bg-black/20 p-4">
            <h3 className="text-[14px] font-semibold text-cloudText uppercase tracking-wider">
              Training Recommendation
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-bone/90">
              {result.trainingGuidance}
            </p>
            <p className="mt-2.5 text-[13.5px] text-bone/70 border-t border-cloudText/10 pt-2 font-mono">
              {result.rpeRecommendation}
            </p>
          </div>

          <div className="rounded-xl border border-cloudText/20 bg-black/20 p-4">
            <h3 className="text-[14px] font-semibold text-cloudText uppercase tracking-wider">
              Primary Limiter &amp; Recovery Action
            </h3>
            <p className="mt-2 text-[14px] font-medium text-bone">
              Limiter: {result.primaryLimiter}
            </p>
            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-bone/85">
              {result.actionableAdjustment}
            </p>
          </div>
        </div>

        {/* Category Breakdown Bars */}
        <div className="rounded-xl border border-cloudText/15 bg-black/15 p-4 space-y-3">
          <h3 className="text-[13px] font-semibold text-bone/80 uppercase tracking-wider">
            Category Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-[12.5px] text-bone/75 mb-1">
                <span>Sleep ({result.categoryScores.sleep.score}/{result.categoryScores.sleep.max})</span>
                <span>{result.categoryScores.sleep.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-cloudText"
                  style={{ width: `${result.categoryScores.sleep.pct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] text-bone/75 mb-1">
                <span>Muscle/Joints ({result.categoryScores.muscleAndJoints.score}/{result.categoryScores.muscleAndJoints.max})</span>
                <span>{result.categoryScores.muscleAndJoints.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-cloudText"
                  style={{ width: `${result.categoryScores.muscleAndJoints.pct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] text-bone/75 mb-1">
                <span>Energy ({result.categoryScores.energy.score}/{result.categoryScores.energy.max})</span>
                <span>{result.categoryScores.energy.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-cloudText"
                  style={{ width: `${result.categoryScores.energy.pct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12.5px] text-bone/75 mb-1">
                <span>Fuel/Stress ({result.categoryScores.lifestyle.score}/{result.categoryScores.lifestyle.max})</span>
                <span>{result.categoryScores.lifestyle.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-cloudText"
                  style={{ width: `${result.categoryScores.lifestyle.pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copy / Export Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn btn-secondary text-[13.5px] py-2.5 px-4 min-h-[44px]"
          >
            {copied ? "✓ Copied to clipboard" : "Copy readiness log summary"}
          </button>
          <span className="text-[12.5px] text-bone/60">
            Formatted for workout notes, logs, or check-ins
          </span>
        </div>
      </section>

      {/* Email Capture Block */}
      <section aria-labelledby="readiness-email-capture-heading" className="pt-6 border-t border-cloudText/20">
        <h3 id="readiness-email-capture-heading" className="sr-only">
          Daily Readiness Tracker email updates
        </h3>
        <ToolEmailCapture toolName="daily-readiness-tracker" />
      </section>

      {/* Related tools navigation */}
      <nav
        aria-label="Related tools navigation"
        className="pt-6 border-t border-cloudText/20 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75"
      >
        <Link className="hover:text-cloudText underline" href="/tools/daily-hydration-tracker">
          Daily Hydration Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-protein-tracker">
          Daily Protein &amp; Meal Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-habit-tracker">
          Daily Habit Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/1rm-calculator">
          1RM &amp; Percentage Calculator &rarr;
        </Link>
      </nav>
    </div>
  );
}

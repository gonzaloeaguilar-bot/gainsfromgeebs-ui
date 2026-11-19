"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  MealCount,
  MealSlot,
  ProteinGoalTier,
  WeightUnit,
  calculateDailyProteinTarget,
  calculateStreak,
  formatDailyProteinSummary,
  getMealSlotDefinitions,
  getRotatingProteinTip,
  getTodayKey,
} from "./logic";

const STORAGE_KEY = "geebs_daily_protein_tracker_v1";

interface StoredData {
  bodyWeight: number;
  unit: WeightUnit;
  tier: ProteinGoalTier;
  customTarget: number;
  mealCount: MealCount;
  dailyTarget: number;
  loggedMeals: Record<string, number>;
  history: Record<string, number>;
  lastActiveDate: string;
}

export default function DailyProteinTrackerForm() {
  const [ready, setReady] = useState(false);
  const [unit, setUnit] = useState<WeightUnit>("lbs");
  const [bodyWeight, setBodyWeight] = useState<number>(180);
  const [tier, setTier] = useState<ProteinGoalTier>("recomp");
  const [customTarget, setCustomTarget] = useState<number>(150);
  const [mealCount, setMealCount] = useState<MealCount>(4);
  const [loggedMeals, setLoggedMeals] = useState<Record<string, number>>({
    "meal-1": 0,
    "meal-2": 0,
    "meal-3": 0,
    "meal-4": 0,
  });
  const [history, setHistory] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [customAddInput, setCustomAddInput] = useState<Record<string, string>>({});

  const todayKey = getTodayKey();

  // Load from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredData = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUnit(parsed.unit || "lbs");
        setBodyWeight(parsed.bodyWeight || 180);
        setTier(parsed.tier || "recomp");
        setCustomTarget(parsed.customTarget || 150);
        setMealCount(parsed.mealCount || 4);
        setHistory(parsed.history || {});

        // If today matches last active date, load loggedMeals; otherwise start fresh for today
        if (parsed.lastActiveDate === todayKey && parsed.loggedMeals) {
          setLoggedMeals(parsed.loggedMeals);
        } else {
          const freshSlots = getMealSlotDefinitions(
            calculateDailyProteinTarget(
              parsed.bodyWeight || 180,
              parsed.unit || "lbs",
              parsed.tier || "recomp",
              parsed.customTarget || 150
            ),
            parsed.mealCount || 4
          );
          const initialMap: Record<string, number> = {};
          freshSlots.forEach((s) => {
            initialMap[s.id] = 0;
          });
          setLoggedMeals(initialMap);
        }
      }
    } catch {
      // Ignore parse errors, fallback to default
    }
    setReady(true);
  }, [todayKey]);

  // Derive target
  const dailyTarget = calculateDailyProteinTarget(bodyWeight, unit, tier, customTarget);
  const mealDefinitions = getMealSlotDefinitions(dailyTarget, mealCount);

  // Total current grams
  const currentGrams = Object.values(loggedMeals).reduce((acc, g) => acc + (g || 0), 0);
  const progressPercent = dailyTarget > 0 ? Math.min(150, Math.round((currentGrams / dailyTarget) * 100)) : 0;

  // Persist state
  useEffect(() => {
    if (!ready) return;
    try {
      const updatedHistory = { ...history, [todayKey]: currentGrams };
      const toSave: StoredData = {
        bodyWeight,
        unit,
        tier,
        customTarget,
        mealCount,
        dailyTarget,
        loggedMeals,
        history: updatedHistory,
        lastActiveDate: todayKey,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Storage unavailable
    }
  }, [ready, bodyWeight, unit, tier, customTarget, mealCount, dailyTarget, loggedMeals, history, currentGrams, todayKey]);

  function handleAddGrams(mealId: string, amount: number) {
    setLoggedMeals((prev) => {
      const current = prev[mealId] || 0;
      const next = Math.max(0, current + amount);
      const updated = { ...prev, [mealId]: next };
      const newTotal = Object.values(updated).reduce((acc, g) => acc + (g || 0), 0);
      setHistory((h) => ({ ...h, [todayKey]: newTotal }));
      return updated;
    });

    trackClientEvent("protein_tracker_quick_add", {
      meal_id: mealId,
      amount,
      total_logged: currentGrams + amount,
    });
  }

  function handleResetMeal(mealId: string) {
    setLoggedMeals((prev) => {
      const updated = { ...prev, [mealId]: 0 };
      const newTotal = Object.values(updated).reduce((acc, g) => acc + (g || 0), 0);
      setHistory((h) => ({ ...h, [todayKey]: newTotal }));
      return updated;
    });
  }

  function handleResetDay() {
    const resetMap: Record<string, number> = {};
    mealDefinitions.forEach((m) => {
      resetMap[m.id] = 0;
    });
    setLoggedMeals(resetMap);
    setHistory((h) => ({ ...h, [todayKey]: 0 }));
    trackClientEvent("protein_tracker_reset_day");
  }

  async function handleCopySummary() {
    const slots: MealSlot[] = mealDefinitions.map((m) => ({
      ...m,
      loggedGrams: loggedMeals[m.id] || 0,
    }));
    const streakInfo = calculateStreak(history, dailyTarget, todayKey);
    const summary = formatDailyProteinSummary(
      currentGrams,
      dailyTarget,
      slots,
      streakInfo.currentStreak,
      todayKey
    );

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      trackClientEvent("protein_tracker_summary_copied", {
        current_grams: currentGrams,
        target_grams: dailyTarget,
      });
    } catch {
      // Clipboard fallback
    }
  }

  const streakData = calculateStreak(history, dailyTarget, todayKey);
  const rotatingTip = getRotatingProteinTip();

  return (
    <div className="space-y-8">
      {/* Top Overview & Streak Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Daily Protein Intake</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${currentGrams}g` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              / {dailyTarget}g
            </span>
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full bg-cloudText transition-all duration-300 ease-out"
              style={{ width: `${ready ? Math.min(100, progressPercent) : 0}%` }}
            />
          </div>
          <p className="mt-2 text-[12.5px] text-bone/60">
            {ready
              ? currentGrams >= dailyTarget
                ? "Daily protein goal reached!"
                : `${dailyTarget - currentGrams}g remaining today (${progressPercent}%)`
              : "Loading..."}
          </p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Protein Streak</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? streakData.currentStreak : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              day{streakData.currentStreak === 1 ? "" : "s"}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            Consecutive days hitting &ge;90% of goal
          </p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">7-Day Average</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${streakData.sevenDayAverage}g` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">/ day</span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            {ready ? `${streakData.totalGoalDays} total target days logged` : "Private local storage"}
          </p>
        </div>
      </div>

      {/* Target Setup Accordion */}
      <section
        aria-labelledby="target-settings-heading"
        className="rounded-2xl border border-cloudText/20 bg-black/10 p-5 md:p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="target-settings-heading" className="text-[18px] font-semibold text-bone">
              Target Configuration: {dailyTarget}g / day across {mealCount} meals
            </h2>
            <p className="mt-1 text-[13.5px] text-bone/60">
              Based on {bodyWeight} {unit} ({tier === "custom" ? "custom target" : tier === "recomp" ? "0.82g/lb body recomp" : tier === "hypertrophy" ? "0.90g/lb hypertrophy" : "1.00g/lb cutting preservation"})
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            aria-expanded={showConfig}
            className="btn btn-secondary text-[13px] px-3.5 py-2 shrink-0"
          >
            {showConfig ? "Hide settings" : "Edit target"}
          </button>
        </div>

        {showConfig && (
          <div className="mt-6 pt-6 border-t border-cloudText/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Weight Input */}
            <div>
              <label htmlFor="target-weight" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                Body weight
              </label>
              <div className="flex rounded-lg border border-cloudText/25 bg-black/20 overflow-hidden">
                <input
                  id="target-weight"
                  type="number"
                  min="60"
                  max="500"
                  value={bodyWeight || ""}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  className="w-full bg-transparent px-3 py-2 text-[14px] text-bone focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setUnit(unit === "lbs" ? "kg" : "lbs")}
                  className="px-3 py-2 text-[12px] font-semibold bg-cloudText/20 text-bone hover:bg-cloudText/30"
                >
                  {unit.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Tier Selector */}
            <div>
              <label htmlFor="target-tier" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                Goal tier
              </label>
              <select
                id="target-tier"
                value={tier}
                onChange={(e) => setTier(e.target.value as ProteinGoalTier)}
                className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText"
              >
                <option value="recomp">Recomp (0.82g/lb)</option>
                <option value="hypertrophy">Muscle Gain (0.90g/lb)</option>
                <option value="cutting">Cutting (1.00g/lb)</option>
                <option value="custom">Custom Target</option>
              </select>
            </div>

            {/* Custom Target (if custom) or Meal Count */}
            {tier === "custom" ? (
              <div>
                <label htmlFor="custom-target-input" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Custom daily grams
                </label>
                <input
                  id="custom-target-input"
                  type="number"
                  min="30"
                  max="400"
                  value={customTarget || ""}
                  onChange={(e) => setCustomTarget(Number(e.target.value))}
                  className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="meal-count-select" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Daily meal windows
                </label>
                <select
                  id="meal-count-select"
                  value={mealCount}
                  onChange={(e) => setMealCount(Number(e.target.value) as MealCount)}
                  className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText"
                >
                  <option value={3}>3 meals per day</option>
                  <option value={4}>4 meals per day</option>
                  <option value={5}>5 meals per day</option>
                </select>
              </div>
            )}

            {/* Meal count for custom */}
            {tier === "custom" && (
              <div>
                <label htmlFor="custom-meal-count" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Meal windows
                </label>
                <select
                  id="custom-meal-count"
                  value={mealCount}
                  onChange={(e) => setMealCount(Number(e.target.value) as MealCount)}
                  className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText"
                >
                  <option value={3}>3 meals</option>
                  <option value={4}>4 meals</option>
                  <option value={5}>5 meals</option>
                </select>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Rotating Daily Science Focus */}
      <section
        aria-labelledby="daily-science-focus-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-cloudText">Daily Protein Insight · {rotatingTip.dayName}</p>
          <Link
            href={rotatingTip.sourceUrl}
            className="text-[13px] text-cloudText underline hover:text-bone"
          >
            {rotatingTip.sourceLabel} &rarr;
          </Link>
        </div>
        <h2
          id="daily-science-focus-heading"
          className="mt-2 text-[19px] md:text-[21px] font-semibold text-bone"
        >
          {rotatingTip.topic}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.65] text-bone/85">{rotatingTip.tip}</p>
      </section>

      {/* Interactive Per-Meal Logging Cards */}
      <section aria-labelledby="meal-log-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="meal-log-heading" className="text-[20px] font-semibold text-bone">
            Today&apos;s Meal Logging ({todayKey})
          </h2>
          {currentGrams > 0 && (
            <button
              type="button"
              onClick={handleResetDay}
              className="text-[13px] text-bone/60 underline hover:text-bone min-h-[44px] flex items-center"
            >
              Reset today
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mealDefinitions.map((meal) => {
            const logged = loggedMeals[meal.id] || 0;
            const target = meal.targetGrams;
            const isMet = logged >= target;
            const customVal = customAddInput[meal.id] || "";

            return (
              <div
                key={meal.id}
                className={`rounded-xl border p-5 transition-all ${
                  isMet
                    ? "border-cloudText/50 bg-cloudText/[0.07]"
                    : "border-cloudText/20 bg-black/10"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[16.5px] font-semibold text-bone">{meal.name}</h3>
                  <span
                    className={`text-[13px] px-2.5 py-0.5 rounded-full font-medium ${
                      isMet
                        ? "bg-cloudText/20 text-cloudText"
                        : "bg-bone/10 text-bone/70"
                    }`}
                  >
                    Target: ~{target}g
                  </span>
                </div>

                {/* Logged display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[24px] font-bold text-bone">{logged}g</span>
                  <span className="text-[13px] text-bone/60">
                    {isMet
                      ? `(${logged - target >= 0 ? `+${logged - target}g` : ""} target met)`
                      : `(${target - logged}g to meal target)`}
                  </span>
                </div>

                {/* Quick Add Buttons - Mobile first with min 44px touch height */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[10, 20, 30, 40].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAddGrams(meal.id, amt)}
                      className="min-h-[44px] rounded-lg border border-cloudText/30 bg-cloudText/10 text-[13.5px] font-medium text-bone transition hover:bg-cloudText/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cloudText"
                      aria-label={`Add ${amt} grams to ${meal.name}`}
                    >
                      +{amt}g
                    </button>
                  ))}
                </div>

                {/* Custom Add Row */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    placeholder="Custom grams"
                    value={customVal}
                    onChange={(e) =>
                      setCustomAddInput((prev) => ({ ...prev, [meal.id]: e.target.value }))
                    }
                    className="apply-input flex-1 min-w-0 !py-2 !text-[13.5px]"
                    aria-label={`Custom grams for ${meal.name}`}
                  />
                  <button
                    type="button"
                    disabled={!customVal || Number(customVal) <= 0}
                    onClick={() => {
                      const val = Number(customVal);
                      if (val > 0) {
                        handleAddGrams(meal.id, val);
                        setCustomAddInput((prev) => ({ ...prev, [meal.id]: "" }));
                      }
                    }}
                    className="btn btn-secondary text-[12.5px] px-3 py-2 disabled:opacity-40 min-h-[40px]"
                  >
                    Add
                  </button>
                  {logged > 0 && (
                    <button
                      type="button"
                      onClick={() => handleResetMeal(meal.id)}
                      className="text-[12px] text-bone/40 hover:text-cloudText px-2 py-2 min-h-[40px]"
                      aria-label={`Clear ${meal.name}`}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Copy / Export Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cloudText/20">
        <button
          type="button"
          onClick={handleCopySummary}
          className="btn btn-secondary text-[13.5px] py-2.5 px-4 min-h-[44px]"
        >
          {copied ? "✓ Copied to clipboard" : "Copy daily protein summary"}
        </button>

        <p className="text-[13px] text-bone/60">
          {currentGrams >= dailyTarget
            ? `Daily goal achieved (${currentGrams}g / ${dailyTarget}g)! Streak saved.`
            : `${currentGrams}g of ${dailyTarget}g logged today. Saved locally.`}
        </p>
      </div>

      {/* Email Capture Block */}
      <section aria-labelledby="protein-email-capture-heading" className="pt-6 border-t border-cloudText/20">
        <h3 id="protein-email-capture-heading" className="sr-only">
          Daily Protein Tracker email updates
        </h3>
        <ToolEmailCapture toolName="daily-protein-tracker" />
      </section>

      {/* Related tools navigation */}
      <nav aria-label="Related tools navigation" className="pt-6 border-t border-cloudText/20 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75">
        <Link className="hover:text-cloudText underline" href="/tools/macro-calculator">
          Macro Calculator &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-habit-tracker">
          Daily Habit &amp; Routine Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/perfect-day-builder">
          Perfect Day Meal Builder &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/science/how-much-protein-per-kg">
          How Much Protein Per KG (Study Guide) &rarr;
        </Link>
      </nav>
    </div>
  );
}

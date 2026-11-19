"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  ActivityLevel,
  ClimateFactor,
  HydrationSlot,
  HydrationUnit,
  WeightUnit,
  calculateDailyHydrationTarget,
  calculateStreak,
  formatDailyHydrationSummary,
  getHydrationSlotDefinitions,
  getRotatingHydrationTip,
  getTodayKey,
} from "./logic";

const STORAGE_KEY = "geebs_daily_hydration_tracker_v1";

interface StoredData {
  bodyWeight: number;
  weightUnit: WeightUnit;
  hydrationUnit: HydrationUnit;
  activityLevel: ActivityLevel;
  climate: ClimateFactor;
  takingCreatine: boolean;
  customTarget: number;
  useCustomTarget: boolean;
  dailyTarget: number;
  loggedSlots: Record<string, number>;
  history: Record<string, number>;
  lastActiveDate: string;
}

export default function DailyHydrationTrackerForm() {
  const [ready, setReady] = useState(false);
  const [todayKey, setTodayKey] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [hydrationUnit, setHydrationUnit] = useState<HydrationUnit>("oz");
  const [bodyWeight, setBodyWeight] = useState<number>(180);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [climate, setClimate] = useState<ClimateFactor>("temperate");
  const [takingCreatine, setTakingCreatine] = useState<boolean>(true);
  const [useCustomTarget, setUseCustomTarget] = useState<boolean>(false);
  const [customTarget, setCustomTarget] = useState<number>(120);
  const [loggedSlots, setLoggedSlots] = useState<Record<string, number>>({
    "slot-morning": 0,
    "slot-midday": 0,
    "slot-afternoon": 0,
    "slot-evening": 0,
  });
  const [history, setHistory] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [customAddInput, setCustomAddInput] = useState<Record<string, string>>({});

  // Load from local storage after mount to prevent hydration mismatches
  useEffect(() => {
    const key = getTodayKey();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(key);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredData = JSON.parse(raw);
        setWeightUnit(parsed.weightUnit || "lbs");
        setHydrationUnit(parsed.hydrationUnit || "oz");
        setBodyWeight(parsed.bodyWeight || 180);
        setActivityLevel(parsed.activityLevel || "moderate");
        setClimate(parsed.climate || "temperate");
        setTakingCreatine(parsed.takingCreatine ?? true);
        setUseCustomTarget(parsed.useCustomTarget || false);
        setCustomTarget(parsed.customTarget || (parsed.hydrationUnit === "ml" ? 3500 : 120));
        setHistory(parsed.history || {});

        if (parsed.lastActiveDate === key && parsed.loggedSlots) {
          setLoggedSlots(parsed.loggedSlots);
        } else {
          const freshTarget = calculateDailyHydrationTarget(
            parsed.bodyWeight || 180,
            parsed.weightUnit || "lbs",
            parsed.activityLevel || "moderate",
            parsed.climate || "temperate",
            parsed.takingCreatine ?? true,
            parsed.customTarget || (parsed.hydrationUnit === "ml" ? 3500 : 120),
            parsed.useCustomTarget || false,
            parsed.hydrationUnit || "oz"
          );
          const freshSlots = getHydrationSlotDefinitions(freshTarget, parsed.hydrationUnit || "oz");
          const initialMap: Record<string, number> = {};
          freshSlots.forEach((s) => {
            initialMap[s.id] = 0;
          });
          setLoggedSlots(initialMap);
        }
      }
    } catch {
      // Storage access fallback
    }
    setReady(true);
  }, []);

  // Derived target and definitions
  const dailyTarget = calculateDailyHydrationTarget(
    bodyWeight,
    weightUnit,
    activityLevel,
    climate,
    takingCreatine,
    customTarget,
    useCustomTarget,
    hydrationUnit
  );

  const slotDefinitions = getHydrationSlotDefinitions(dailyTarget, hydrationUnit);
  const currentTotal = Object.values(loggedSlots).reduce((acc, v) => acc + (v || 0), 0);
  const progressPercent = dailyTarget > 0 ? Math.min(150, Math.round((currentTotal / dailyTarget) * 100)) : 0;

  // Persist state
  useEffect(() => {
    if (!ready || !todayKey) return;
    try {
      const updatedHistory = { ...history, [todayKey]: currentTotal };
      const toSave: StoredData = {
        bodyWeight,
        weightUnit,
        hydrationUnit,
        activityLevel,
        climate,
        takingCreatine,
        customTarget,
        useCustomTarget,
        dailyTarget,
        loggedSlots,
        history: updatedHistory,
        lastActiveDate: todayKey,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Storage unavailable
    }
  }, [
    ready,
    bodyWeight,
    weightUnit,
    hydrationUnit,
    activityLevel,
    climate,
    takingCreatine,
    customTarget,
    useCustomTarget,
    dailyTarget,
    loggedSlots,
    history,
    currentTotal,
    todayKey,
  ]);

  function handleAddFluid(slotId: string, amount: number) {
    if (!todayKey) return;
    setLoggedSlots((prev) => {
      const current = prev[slotId] || 0;
      const next = Math.max(0, current + amount);
      const updated = { ...prev, [slotId]: next };
      const newTotal = Object.values(updated).reduce((acc, v) => acc + (v || 0), 0);
      setHistory((h) => ({ ...h, [todayKey]: newTotal }));
      return updated;
    });

    trackClientEvent("hydration_tracker_quick_add", {
      slot_id: slotId,
      amount,
      unit: hydrationUnit,
      total_logged: currentTotal + amount,
    });
  }

  function handleResetSlot(slotId: string) {
    if (!todayKey) return;
    setLoggedSlots((prev) => {
      const updated = { ...prev, [slotId]: 0 };
      const newTotal = Object.values(updated).reduce((acc, v) => acc + (v || 0), 0);
      setHistory((h) => ({ ...h, [todayKey]: newTotal }));
      return updated;
    });
  }

  function handleResetDay() {
    if (!todayKey) return;
    const resetMap: Record<string, number> = {};
    slotDefinitions.forEach((s) => {
      resetMap[s.id] = 0;
    });
    setLoggedSlots(resetMap);
    setHistory((h) => ({ ...h, [todayKey]: 0 }));
    trackClientEvent("hydration_tracker_reset_day");
  }

  function handleToggleHydrationUnit(newUnit: HydrationUnit) {
    if (newUnit === hydrationUnit) return;
    if (newUnit === "ml") {
      // Convert oz to ml
      const newLogged: Record<string, number> = {};
      Object.keys(loggedSlots).forEach((k) => {
        newLogged[k] = Math.round((loggedSlots[k] * 29.5735) / 25) * 25;
      });
      setLoggedSlots(newLogged);
      if (useCustomTarget) {
        setCustomTarget(Math.round((customTarget * 29.5735) / 50) * 50);
      }
      setHydrationUnit("ml");
    } else {
      // Convert ml to oz
      const newLogged: Record<string, number> = {};
      Object.keys(loggedSlots).forEach((k) => {
        newLogged[k] = Math.round(loggedSlots[k] / 29.5735);
      });
      setLoggedSlots(newLogged);
      if (useCustomTarget) {
        setCustomTarget(Math.round(customTarget / 29.5735));
      }
      setHydrationUnit("oz");
    }
  }

  async function handleCopySummary() {
    const slots: HydrationSlot[] = slotDefinitions.map((s) => ({
      ...s,
      loggedAmount: loggedSlots[s.id] || 0,
    }));
    const streakInfo = calculateStreak(history, dailyTarget, todayKey || getTodayKey());
    const summary = formatDailyHydrationSummary(
      currentTotal,
      dailyTarget,
      hydrationUnit,
      slots,
      streakInfo.currentStreak,
      todayKey || getTodayKey()
    );

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      trackClientEvent("hydration_tracker_summary_copied", {
        current_amount: currentTotal,
        target_amount: dailyTarget,
        unit: hydrationUnit,
      });
    } catch {
      // Fallback
    }
  }

  const streakData = calculateStreak(history, dailyTarget, todayKey || getTodayKey());
  const rotatingTip = getRotatingHydrationTip();

  const quickAmounts =
    hydrationUnit === "oz"
      ? [
          { label: "+8 oz", val: 8, desc: "Glass" },
          { label: "+16 oz", val: 16, desc: "Pint/Bottle" },
          { label: "+24 oz", val: 24, desc: "Shaker" },
          { label: "+32 oz", val: 32, desc: "Large" },
        ]
      : [
          { label: "+250 ml", val: 250, desc: "Glass" },
          { label: "+500 ml", val: 500, desc: "Bottle" },
          { label: "+750 ml", val: 750, desc: "Shaker" },
          { label: "+1000 ml", val: 1000, desc: "Liter" },
        ];

  return (
    <div className="space-y-8">
      {/* Top Overview & Streak Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Daily Fluid Intake</p>
          <p className="mt-1.5 text-bone text-[26px] md:text-[32px] font-semibold">
            {ready ? `${currentTotal}${hydrationUnit}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">
              / {dailyTarget}{hydrationUnit}
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
              ? currentTotal >= dailyTarget
                ? "Daily hydration target achieved!"
                : `${dailyTarget - currentTotal}${hydrationUnit} remaining today (${progressPercent}%)`
              : "Loading..."}
          </p>
        </div>

        <div className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5">
          <p className="eyebrow text-cloudText">Hydration Streak</p>
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
            {ready ? `${streakData.sevenDayAverage}${hydrationUnit}` : "—"}
            <span className="text-[14px] text-bone/70 ml-1.5 font-normal">/ day</span>
          </p>
          <p className="mt-1 text-[12.5px] text-bone/60">
            {ready ? `${streakData.totalGoalDays} target days logged` : "Private local storage"}
          </p>
        </div>
      </div>

      {/* Target Setup Accordion */}
      <section
        aria-labelledby="target-settings-heading"
        className="rounded-2xl border border-cloudText/20 bg-black/10 p-5 md:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="target-settings-heading" className="text-[18px] font-semibold text-bone">
              Target Settings: {dailyTarget}{hydrationUnit} / day
            </h2>
            <p className="mt-1 text-[13.5px] text-bone/60">
              {useCustomTarget
                ? "Custom daily fluid target"
                : `${bodyWeight} ${weightUnit} · ${activityLevel} activity · ${climate} climate${takingCreatine ? " · +creatine" : ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            aria-expanded={showConfig}
            className="btn btn-secondary text-[13px] px-3.5 py-2 shrink-0 min-h-[44px]"
          >
            {showConfig ? "Hide settings" : "Edit target"}
          </button>
        </div>

        {showConfig && (
          <div className="mt-6 pt-6 border-t border-cloudText/15 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Fluid Unit Toggle */}
              <div>
                <label className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Display units
                </label>
                <div className="flex rounded-lg border border-cloudText/25 bg-black/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleToggleHydrationUnit("oz")}
                    className={`flex-1 py-2 text-[13px] font-semibold transition ${
                      hydrationUnit === "oz"
                        ? "bg-cloudText text-black"
                        : "text-bone/70 hover:text-bone"
                    }`}
                  >
                    Ounces (oz)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleHydrationUnit("ml")}
                    className={`flex-1 py-2 text-[13px] font-semibold transition ${
                      hydrationUnit === "ml"
                        ? "bg-cloudText text-black"
                        : "text-bone/70 hover:text-bone"
                    }`}
                  >
                    Milliliters (ml)
                  </button>
                </div>
              </div>

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
                    disabled={useCustomTarget}
                    className="w-full bg-transparent px-3 py-2 text-[14px] text-bone focus:outline-none disabled:opacity-40"
                  />
                  <button
                    type="button"
                    disabled={useCustomTarget}
                    onClick={() => setWeightUnit(weightUnit === "lbs" ? "kg" : "lbs")}
                    className="px-3 py-2 text-[12px] font-semibold bg-cloudText/20 text-bone hover:bg-cloudText/30 disabled:opacity-40"
                  >
                    {weightUnit.toUpperCase()}
                  </button>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label htmlFor="activity-level" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Daily training / activity
                </label>
                <select
                  id="activity-level"
                  value={activityLevel}
                  disabled={useCustomTarget}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText disabled:opacity-40"
                >
                  <option value="sedentary">Rest day / light walking</option>
                  <option value="moderate">30–60 min lifting / training</option>
                  <option value="intense">60–90+ min heavy training</option>
                </select>
              </div>

              {/* Climate */}
              <div>
                <label htmlFor="climate-factor" className="block text-[13px] font-medium text-bone/80 mb-1.5">
                  Climate &amp; sweat rate
                </label>
                <select
                  id="climate-factor"
                  value={climate}
                  disabled={useCustomTarget}
                  onChange={(e) => setClimate(e.target.value as ClimateFactor)}
                  className="w-full rounded-lg border border-cloudText/25 bg-black/20 px-3 py-2 text-[14px] text-bone focus:outline-none focus:border-cloudText disabled:opacity-40"
                >
                  <option value="temperate">Standard indoor / mild</option>
                  <option value="hot">Hot / humid / high sweat</option>
                </select>
              </div>
            </div>

            {/* Checkboxes & Custom Target Row */}
            <div className="pt-4 border-t border-cloudText/15 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-bone">
                <input
                  type="checkbox"
                  checked={takingCreatine}
                  disabled={useCustomTarget}
                  onChange={(e) => setTakingCreatine(e.target.checked)}
                  className="h-4 w-4 rounded accent-cloudText cursor-pointer disabled:opacity-40"
                />
                <span>Creatine supplement (+16 oz / 500 ml)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-bone">
                <input
                  type="checkbox"
                  checked={useCustomTarget}
                  onChange={(e) => setUseCustomTarget(e.target.checked)}
                  className="h-4 w-4 rounded accent-cloudText cursor-pointer"
                />
                <span>Set custom goal</span>
              </label>

              {useCustomTarget && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={hydrationUnit === "ml" ? 1000 : 30}
                    max={hydrationUnit === "ml" ? 8000 : 300}
                    step={hydrationUnit === "ml" ? 50 : 5}
                    value={customTarget || ""}
                    onChange={(e) => setCustomTarget(Number(e.target.value))}
                    className="w-28 rounded-lg border border-cloudText/25 bg-black/20 px-3 py-1.5 text-[14px] text-bone focus:outline-none focus:border-cloudText"
                  />
                  <span className="text-[13px] text-bone/70">{hydrationUnit} / day</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Rotating Daily Science Focus */}
      <section
        aria-labelledby="daily-science-focus-heading"
        className="rounded-2xl border border-cloudText/25 bg-cloudText/[0.05] p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-cloudText">Daily Hydration Insight · {rotatingTip.dayName}</p>
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

      {/* Interactive Time-Window Logging Cards */}
      <section aria-labelledby="time-window-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="time-window-heading" className="text-[20px] font-semibold text-bone">
            Today&apos;s Fluid Logging {todayKey ? `(${todayKey})` : ""}
          </h2>
          {currentTotal > 0 && (
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
          {slotDefinitions.map((slot) => {
            const logged = loggedSlots[slot.id] || 0;
            const target = slot.targetAmount;
            const isMet = logged >= target;
            const customVal = customAddInput[slot.id] || "";

            return (
              <div
                key={slot.id}
                className={`rounded-xl border p-5 transition-all ${
                  isMet
                    ? "border-cloudText/50 bg-cloudText/[0.07]"
                    : "border-cloudText/20 bg-black/10"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-[16.5px] font-semibold text-bone">{slot.name}</h3>
                    <p className="text-[12px] text-bone/55 mt-0.5">{slot.subtitle}</p>
                  </div>
                  <span
                    className={`text-[13px] px-2.5 py-0.5 rounded-full font-medium shrink-0 ${
                      isMet
                        ? "bg-cloudText/20 text-cloudText"
                        : "bg-bone/10 text-bone/70"
                    }`}
                  >
                    Target: ~{target}{hydrationUnit}
                  </span>
                </div>

                {/* Logged display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[24px] font-bold text-bone">
                    {logged}{hydrationUnit}
                  </span>
                  <span className="text-[13px] text-bone/60">
                    {isMet
                      ? `(${logged - target >= 0 ? `+${logged - target}${hydrationUnit}` : ""} window complete)`
                      : `(${target - logged}${hydrationUnit} to target)`}
                  </span>
                </div>

                {/* Quick Add Buttons - Mobile first with min 44px touch targets */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {quickAmounts.map((q) => (
                    <button
                      key={q.val}
                      type="button"
                      onClick={() => handleAddFluid(slot.id, q.val)}
                      className="min-h-[44px] rounded-lg border border-cloudText/30 bg-cloudText/10 text-[13.5px] font-medium text-bone transition hover:bg-cloudText/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cloudText flex flex-col items-center justify-center p-1"
                      aria-label={`Add ${q.val} ${hydrationUnit} to ${slot.name}`}
                    >
                      <span>{q.label}</span>
                      <span className="text-[10.5px] text-bone/50">{q.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Add Row */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    placeholder={`Custom ${hydrationUnit}`}
                    value={customVal}
                    onChange={(e) =>
                      setCustomAddInput((prev) => ({ ...prev, [slot.id]: e.target.value }))
                    }
                    className="apply-input flex-1 min-w-0 !py-2 !text-[13.5px]"
                    aria-label={`Custom ${hydrationUnit} for ${slot.name}`}
                  />
                  <button
                    type="button"
                    disabled={!customVal || Number(customVal) <= 0}
                    onClick={() => {
                      const val = Number(customVal);
                      if (val > 0) {
                        handleAddFluid(slot.id, val);
                        setCustomAddInput((prev) => ({ ...prev, [slot.id]: "" }));
                      }
                    }}
                    className="btn btn-secondary text-[12.5px] px-3 py-2 disabled:opacity-40 min-h-[40px]"
                  >
                    Add
                  </button>
                  {logged > 0 && (
                    <button
                      type="button"
                      onClick={() => handleResetSlot(slot.id)}
                      className="text-[12px] text-bone/40 hover:text-cloudText px-2 py-2 min-h-[40px]"
                      aria-label={`Clear ${slot.name}`}
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
          {copied ? "✓ Copied to clipboard" : "Copy daily hydration summary"}
        </button>

        <p className="text-[13px] text-bone/60">
          {currentTotal >= dailyTarget
            ? `Daily goal achieved (${currentTotal}${hydrationUnit} / ${dailyTarget}${hydrationUnit})! Streak saved.`
            : `${currentTotal}${hydrationUnit} of ${dailyTarget}${hydrationUnit} logged today. Saved locally.`}
        </p>
      </div>

      {/* Email Capture Block */}
      <section aria-labelledby="hydration-email-capture-heading" className="pt-6 border-t border-cloudText/20">
        <h3 id="hydration-email-capture-heading" className="sr-only">
          Daily Hydration Tracker email updates
        </h3>
        <ToolEmailCapture toolName="daily-hydration-tracker" />
      </section>

      {/* Related tools navigation */}
      <nav aria-label="Related tools navigation" className="pt-6 border-t border-cloudText/20 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/75">
        <Link className="hover:text-cloudText underline" href="/tools/daily-protein-tracker">
          Daily Protein &amp; Meal Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/daily-habit-tracker">
          Daily Habit &amp; Routine Tracker &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/tools/macro-calculator">
          Macro Calculator &rarr;
        </Link>
        <Link className="hover:text-cloudText underline" href="/science/electrolytes-and-cognitive-energy">
          Electrolytes &amp; Energy Science Guide &rarr;
        </Link>
      </nav>
    </div>
  );
}

"use client";

import { useState } from "react";
import ToolEmailCapture from "@/components/ToolEmailCapture";

type Sex = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const ACTIVITY_LABEL: Record<Activity, string> = {
  sedentary: "Sedentary (desk job, no exercise)",
  light: "Light (1-3 training sessions / week)",
  moderate: "Moderate (3-5 sessions / week)",
  active: "Active (6-7 sessions / week)",
  very_active: "Very active (twice-daily training)",
};

type Tier = { calories: number; weeklyLossLb: number; belowBmr: boolean };
type Result = {
  bmr: number;
  tdee: number;
  mild: Tier;
  standard: Tier;
  aggressive: Tier;
};

function lbToKg(lb: number): number {
  return lb * 0.45359237;
}
function inToCm(inches: number): number {
  return inches * 2.54;
}

function tier(tdee: number, bmr: number, deficit: number): Tier {
  const calories = Math.round(tdee - deficit);
  // ~3500 kcal per pound of fat.
  const weeklyLossLb = Math.round(((deficit * 7) / 3500) * 10) / 10;
  return { calories, weeklyLossLb, belowBmr: calories < bmr };
}

function calculate(
  sex: Sex,
  ageYears: number,
  weightLb: number,
  heightInches: number,
  activity: Activity,
): Result {
  const w = lbToKg(weightLb);
  const h = inToCm(heightInches);
  const sexAdj = sex === "male" ? 5 : -161;
  const bmr = 10 * w + 6.25 * h - 5 * ageYears + sexAdj;
  const tdee = bmr * ACTIVITY_MULTIPLIER[activity];
  const bmrR = Math.round(bmr);
  const tdeeR = Math.round(tdee);
  return {
    bmr: bmrR,
    tdee: tdeeR,
    mild: tier(tdeeR, bmrR, 250),
    standard: tier(tdeeR, bmrR, 500),
    aggressive: tier(tdeeR, bmrR, 750),
  };
}

export default function CalorieDeficitForm() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<string>("32");
  const [weight, setWeight] = useState<string>("190");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [result, setResult] = useState<Result | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(age);
    const w = Number(weight);
    const totalInches = Number(heightFt) * 12 + Number(heightIn);
    if (!a || !w || !totalInches) return;
    setResult(calculate(sex, a, w, totalInches, activity));
  }

  const tiers: { key: keyof Pick<Result, "mild" | "standard" | "aggressive">; label: string; note: string }[] = [
    { key: "mild", label: "Mild deficit", note: "Easiest to sustain. Good default for lower body fat or a long runway." },
    { key: "standard", label: "Standard deficit", note: "The reliable middle. Strong fat loss that most men can hold for months." },
    { key: "aggressive", label: "Aggressive deficit", note: "Faster, harder to sustain. Short stretches only, and never below your BMR." },
  ];

  return (
    <div>
      <form data-form-id="calc_calorie_deficit" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] text-bone/85 mb-2">Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`apply-radio justify-center ${sex === "male" ? "ring-1 ring-[#B91C1C]" : ""}`}
                onClick={() => setSex("male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`apply-radio justify-center ${sex === "female" ? "ring-1 ring-[#B91C1C]" : ""}`}
                onClick={() => setSex("female")}
              >
                Female
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="cd-age" className="block text-[14px] text-bone/85 mb-2">
              Age
            </label>
            <input
              id="cd-age"
              className="apply-input"
              type="number"
              min={14}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="cd-weight" className="block text-[14px] text-bone/85 mb-2">
              Weight (lb)
            </label>
            <input
              id="cd-weight"
              className="apply-input"
              type="number"
              min={50}
              max={600}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cd-ht-ft" className="block text-[14px] text-bone/85 mb-2">
              Height (ft)
            </label>
            <input
              id="cd-ht-ft"
              className="apply-input"
              type="number"
              min={3}
              max={8}
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cd-ht-in" className="block text-[14px] text-bone/85 mb-2">
              Height (in)
            </label>
            <input
              id="cd-ht-in"
              className="apply-input"
              type="number"
              min={0}
              max={11}
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cd-activity" className="block text-[14px] text-bone/85 mb-2">
            Activity level
          </label>
          <select
            id="cd-activity"
            className="apply-input"
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
          >
            {(Object.keys(ACTIVITY_LABEL) as Activity[]).map((k) => (
              <option key={k} value={k}>
                {ACTIVITY_LABEL[k]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Calculate deficit
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="hair mb-8" />
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your deficit targets
          </h2>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">Maintenance (TDEE)</p>
              <p className="mt-2 text-bone text-[28px] md:text-[34px] font-semibold">
                {result.tdee.toLocaleString()}{" "}
                <span className="text-[15px] text-mute font-normal">kcal/day</span>
              </p>
              <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
                Eat this to hold your current weight. A deficit goes below it.
              </p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">BMR (floor)</p>
              <p className="mt-2 text-bone text-[28px] md:text-[34px] font-semibold">
                {result.bmr.toLocaleString()}{" "}
                <span className="text-[15px] text-mute font-normal">kcal/day</span>
              </p>
              <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
                Resting burn. Don&apos;t sit below this for sustained periods.
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-bone text-[18px] md:text-[20px] font-semibold tracking-[-0.005em]">
            Pick a deficit
          </h3>
          <div className="mt-4 space-y-3">
            {tiers.map(({ key, label, note }) => {
              const t = result[key];
              return (
                <div
                  key={key}
                  className="rounded-xl border border-line bg-ink2/40 p-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <div className="min-w-[9rem]">
                    <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">
                      {label}
                    </p>
                    <p className="mt-1 text-bone text-[20px] md:text-[24px] font-semibold">
                      {t.calories.toLocaleString()}{" "}
                      <span className="text-[13px] text-mute font-normal">kcal/day</span>
                    </p>
                  </div>
                  <p className="text-[14px] text-bone/90">
                    ~{t.weeklyLossLb} lb / week
                    {t.belowBmr && (
                      <span className="block text-[12.5px] text-cloudText">
                        Below your BMR — too low to sustain.
                      </span>
                    )}
                  </p>
                  <p className="w-full text-[13px] text-mute leading-[1.5]">
                    {note}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="text-[14.5px] text-bone/85 leading-[1.6]">
              <b className="text-bone">Next step:</b> a deficit is calories; it
              still needs a protein target to protect muscle.{" "}
              <a href="/tools/macro-calculator" className="underline hover:text-bone">
                Run the macro calculator
              </a>{" "}
              to split it into protein, carbs, and fat — or apply for 1:1
              coaching and let Kris calibrate the whole thing to your weekly
              trend.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="/tools/macro-calculator" className="btn btn-secondary">
                Macro calculator
                <span aria-hidden="true">→</span>
              </a>
              <a href="/apply" className="btn btn-primary" data-cta="tool_primary">
                Turn these numbers into a plan
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Optional email capture — below result, never gates it */}
          <ToolEmailCapture toolName="calorie-deficit" />
        </div>
      )}
    </div>
  );
}

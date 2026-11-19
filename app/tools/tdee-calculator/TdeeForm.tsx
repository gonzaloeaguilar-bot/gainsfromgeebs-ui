"use client";

import { useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
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

type Result = {
  bmr: number;
  tdee: number;
  cut: number;
  recomp: number;
  bulk: number;
};

function lbToKg(lb: number): number {
  return lb * 0.45359237;
}
function inToCm(inches: number): number {
  return inches * 2.54;
}

function calculate(
  sex: Sex,
  ageYears: number,
  weightLb: number,
  heightInches: number,
  activity: Activity,
): Result {
  // Mifflin-St Jeor BMR (kg + cm + years)
  const w = lbToKg(weightLb);
  const h = inToCm(heightInches);
  const a = ageYears;
  const sexAdj = sex === "male" ? 5 : -161;
  const bmr = 10 * w + 6.25 * h - 5 * a + sexAdj;
  const tdee = bmr * ACTIVITY_MULTIPLIER[activity];
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    cut: Math.round(tdee - 500),
    recomp: Math.round(tdee - 200),
    bulk: Math.round(tdee + 250),
  };
}

export default function TdeeForm() {
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
    const nextResult = calculate(sex, a, w, totalInches, activity);
    setResult(nextResult);
    trackClientEvent("calculator_completed", {
      calculator_name: "tdee",
      calculator_path: "/tools/tdee-calculator",
      activity_level: activity,
      sex,
    });
  }

  return (
    <div>
      <form data-form-id="calc_tdee" onSubmit={onSubmit} className="space-y-6">
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
            <label htmlFor="age" className="block text-[14px] text-bone/85 mb-2">
              Age
            </label>
            <input
              id="age"
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
          <div className="col-span-1">
            <label htmlFor="weight" className="block text-[14px] text-bone/85 mb-2">
              Weight (lb)
            </label>
            <input
              id="weight"
              className="apply-input"
              type="number"
              min={50}
              max={600}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ht-ft" className="block text-[14px] text-bone/85 mb-2">
              Height (ft)
            </label>
            <input
              id="ht-ft"
              className="apply-input"
              type="number"
              min={3}
              max={8}
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ht-in" className="block text-[14px] text-bone/85 mb-2">
              Height (in)
            </label>
            <input
              id="ht-in"
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
          <label htmlFor="activity" className="block text-[14px] text-bone/85 mb-2">
            Activity level
          </label>
          <select
            id="activity"
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
          Calculate
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="hair mb-8" />
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your numbers
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">BMR</p>
              <p className="mt-2 text-bone text-[28px] md:text-[34px] font-semibold">
                {result.bmr.toLocaleString()}{" "}
                <span className="text-[15px] text-mute font-normal">kcal/day</span>
              </p>
              <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
                What your body burns at rest. Floor calorie target — never eat
                below this for sustained periods.
              </p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">TDEE (Maintenance)</p>
              <p className="mt-2 text-bone text-[28px] md:text-[34px] font-semibold">
                {result.tdee.toLocaleString()}{" "}
                <span className="text-[15px] text-mute font-normal">kcal/day</span>
              </p>
              <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
                Total daily energy expenditure. Eat this to maintain current
                weight.
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-bone text-[18px] md:text-[20px] font-semibold tracking-[-0.005em]">
            Goal targets
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-line bg-ink2/40 p-4">
              <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">Cut</p>
              <p className="mt-1.5 text-bone text-[19px] md:text-[22px] font-semibold">
                {result.cut.toLocaleString()}
              </p>
              <p className="text-[12px] text-mute mt-1">~1 lb/week loss</p>
            </div>
            <div className="rounded-xl border border-line bg-ink2/40 p-4">
              <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">Recomp</p>
              <p className="mt-1.5 text-bone text-[19px] md:text-[22px] font-semibold">
                {result.recomp.toLocaleString()}
              </p>
              <p className="text-[12px] text-mute mt-1">Slow lean gain</p>
            </div>
            <div className="rounded-xl border border-line bg-ink2/40 p-4">
              <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">Bulk</p>
              <p className="mt-1.5 text-bone text-[19px] md:text-[22px] font-semibold">
                {result.bulk.toLocaleString()}
              </p>
              <p className="text-[12px] text-mute mt-1">~0.5 lb/week gain</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="text-[14.5px] text-bone/85 leading-[1.6]">
              <b className="text-bone">Next step:</b> Pair these calories with
              a protein target.{" "}
              <a href="/tools/macro-calculator" className="underline hover:text-bone">
                Run the macro calculator
              </a>{" "}
              to split into protein / carbs / fat. Or apply for 1:1 coaching
              and let Kris build the whole plan around your real week.
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
          <ToolEmailCapture toolName="tdee" />
        </div>
      )}
    </div>
  );
}

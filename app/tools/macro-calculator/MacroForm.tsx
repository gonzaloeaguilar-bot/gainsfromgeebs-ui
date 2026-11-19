"use client";

import { useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import ToolEmailCapture from "@/components/ToolEmailCapture";

type Goal = "cut" | "recomp" | "bulk";

const RESULT_APPLY_HREF =
  "/apply?utm_source=site&utm_medium=tool&utm_campaign=macro_calculator&utm_content=macro_calculator_result_coaching_bridge";

const GOAL_LABEL: Record<Goal, string> = {
  cut: "Cut (fat loss)",
  recomp: "Recomp (lean gain)",
  bulk: "Bulk (muscle gain)",
};

// Goal-driven protein floor (g per lb of bodyweight) + fat floor (% of kcal)
const PROTEIN_PER_LB: Record<Goal, number> = {
  cut: 1.0,
  recomp: 0.9,
  bulk: 0.8,
};
const FAT_PCT: Record<Goal, number> = {
  cut: 0.25,
  recomp: 0.27,
  bulk: 0.3,
};

type Result = {
  calories: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  proteinKcal: number;
  fatKcal: number;
  carbKcal: number;
};

function calculate(
  calories: number,
  bodyweightLb: number,
  goal: Goal,
): Result {
  const proteinG = Math.round(bodyweightLb * PROTEIN_PER_LB[goal]);
  const proteinKcal = proteinG * 4;
  const fatKcal = Math.round(calories * FAT_PCT[goal]);
  const fatG = Math.round(fatKcal / 9);
  const carbKcal = calories - proteinKcal - fatKcal;
  const carbG = Math.max(0, Math.round(carbKcal / 4));
  return {
    calories,
    proteinG,
    fatG,
    carbG,
    proteinKcal,
    fatKcal,
    carbKcal: Math.max(0, carbKcal),
  };
}

export default function MacroForm() {
  const [calories, setCalories] = useState<string>("2500");
  const [weight, setWeight] = useState<string>("190");
  const [goal, setGoal] = useState<Goal>("recomp");
  const [result, setResult] = useState<Result | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const c = Number(calories);
    const w = Number(weight);
    if (!c || !w) return;
    setResult(calculate(c, w, goal));
    trackClientEvent("calculator_completed", {
      calculator_name: "macro",
      calculator_path: "/tools/macro-calculator",
      calculator_goal: goal,
    });
  }

  return (
    <div>
      <form data-form-id="calc_macro" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="calories" className="block text-[14px] text-bone/85 mb-2">
              Daily calories
            </label>
            <input
              id="calories"
              className="apply-input"
              type="number"
              min={1000}
              max={6000}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <p className="mt-1.5 text-[12.5px] text-mute2">
              Not sure?{" "}
              <a href="/tools/tdee-calculator" className="underline">
                Run TDEE calculator first
              </a>
              .
            </p>
          </div>
          <div>
            <label htmlFor="weight" className="block text-[14px] text-bone/85 mb-2">
              Bodyweight (lb)
            </label>
            <input
              id="weight"
              className="apply-input"
              type="number"
              min={80}
              max={500}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="goal" className="block text-[14px] text-bone/85 mb-2">
            Goal
          </label>
          <select
            id="goal"
            className="apply-input"
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
          >
            {(Object.keys(GOAL_LABEL) as Goal[]).map((k) => (
              <option key={k} value={k}>
                {GOAL_LABEL[k]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Calculate macros
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="hair mb-8" />
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your daily macros
          </h2>
          <p className="mt-3 text-[14.5px] text-mute max-w-[60ch]">
            Hit protein and fat first. Carbs fill the rest. Target the week, not
            each day.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-4">
              <p className="eyebrow text-cloudText">Protein</p>
              <p className="mt-1.5 text-bone text-[24px] md:text-[28px] font-semibold">
                {result.proteinG}
                <span className="text-[14px] text-mute font-normal"> g</span>
              </p>
              <p className="text-[12.5px] text-mute mt-1">
                {result.proteinKcal} kcal
              </p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-4">
              <p className="eyebrow text-cloudText">Fat</p>
              <p className="mt-1.5 text-bone text-[24px] md:text-[28px] font-semibold">
                {result.fatG}
                <span className="text-[14px] text-mute font-normal"> g</span>
              </p>
              <p className="text-[12.5px] text-mute mt-1">{result.fatKcal} kcal</p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-4">
              <p className="eyebrow text-cloudText">Carbs</p>
              <p className="mt-1.5 text-bone text-[24px] md:text-[28px] font-semibold">
                {result.carbG}
                <span className="text-[14px] text-mute font-normal"> g</span>
              </p>
              <p className="text-[12.5px] text-mute mt-1">
                {result.carbKcal} kcal
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="text-[14.5px] text-bone/85 leading-[1.65]">
              <b className="text-bone">Distribution:</b> split protein evenly
              across 3-5 meals. For a {result.proteinG}g target, that&apos;s
              roughly {Math.round(result.proteinG / 4)}-
              {Math.round(result.proteinG / 3)}g per meal. Fat lives mostly in
              whole-food sources (eggs, fatty fish, nuts, olive oil). Carbs
              cluster around training sessions for performance, or evenly
              spread if no specific training pattern.
            </p>
            <p className="mt-4 text-[14.5px] text-mute leading-[1.65]">
              These targets give you a starting point. Coaching is where Kris
              reads the weekly trend and adjusts them when training, hunger,
              sleep, or your schedule stops matching the calculator.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href={RESULT_APPLY_HREF} className="btn btn-primary" data-cta="tool_primary">
                Turn these numbers into a plan
                <span aria-hidden="true">→</span>
              </a>
              <a href="/methodology" className="btn btn-secondary">
                See the full methodology
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <p className="mt-4 text-[14px] leading-[1.6] text-mute">
            Scale not moving after three weeks on these numbers?{" "}
            <a href="/guides/why-am-i-not-losing-weight-in-a-calorie-deficit" className="underline hover:text-bone" data-cta="macro_result_deficit_stall">
              Check the six reasons a deficit stalls
            </a>{" "}
            before you cut calories again.
          </p>

          {/* Optional email capture — below result, never gates it */}
          <ToolEmailCapture toolName="macro" />
        </div>
      )}
    </div>
  );
}

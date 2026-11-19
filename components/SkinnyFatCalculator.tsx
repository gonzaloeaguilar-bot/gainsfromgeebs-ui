"use client";

import { useState } from "react";
import Link from "next/link";

type Goal = "recomp" | "build" | "lose";

type Results = {
  calorieLow: number;
  calorieHigh: number;
  proteinLow: number;
  proteinHigh: number;
  trainingDays: string;
  goalLabel: string;
};

const GOAL_LABELS: Record<Goal, string> = {
  recomp: "Body Recomposition",
  build: "Build Muscle",
  lose: "Lose Fat",
};

// Conservative planning multipliers (kcal per lb bodyweight).
const CALORIE_MULTIPLIERS: Record<Goal, [number, number]> = {
  recomp: [13, 15],
  build: [15, 17],
  lose: [11, 13],
};

function computeResults(weightLbs: number, goal: Goal, trainingDays: string): Results {
  const [calLow, calHigh] = CALORIE_MULTIPLIERS[goal];
  const round50 = (n: number) => Math.round(n / 50) * 50;
  return {
    calorieLow: round50(weightLbs * calLow),
    calorieHigh: round50(weightLbs * calHigh),
    proteinLow: Math.round(weightLbs * 0.7),
    proteinHigh: Math.round(weightLbs * 1.0),
    trainingDays,
    goalLabel: GOAL_LABELS[goal],
  };
}

export default function SkinnyFatCalculator() {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<Results | null>(null);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    trainingDays: "",
    primaryGoal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    const weightLbs = Number(formData.weight);
    const goal = (formData.primaryGoal || "recomp") as Goal;
    if (!Number.isFinite(weightLbs) || weightLbs <= 0) return;
    setResults(computeResults(weightLbs, goal, formData.trainingDays));
    setStep(3);
  };

  if (step === 3 && results) {
    return (
      <div className="bg-void border border-hairline p-6 md:p-8 rounded-lg mt-8 text-center">
        <h3 className="text-bone text-[22px] font-semibold mb-4">Your Recomp Starting Point</h3>
        <p className="text-bone/85 text-[15px] mb-2">
          Goal: {results.goalLabel} · Training {results.trainingDays} days/week
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-left max-w-[46ch] mx-auto">
          <div className="border border-hairline rounded p-4">
            <p className="text-mute text-[12px] uppercase tracking-wider mb-1">Daily calories</p>
            <p className="text-bone text-[20px] font-semibold">
              {results.calorieLow.toLocaleString()}–{results.calorieHigh.toLocaleString()} kcal
            </p>
          </div>
          <div className="border border-hairline rounded p-4">
            <p className="text-mute text-[12px] uppercase tracking-wider mb-1">Daily protein</p>
            <p className="text-bone text-[20px] font-semibold">
              {results.proteinLow}–{results.proteinHigh} g
            </p>
          </div>
        </div>
        <p className="text-mute text-[13px] mb-6 max-w-[46ch] mx-auto">
          This is a conservative planning estimate, not medical or nutrition treatment. Start in
          the middle of each range, hold it for two to three weeks, and adjust from what your
          trend weight and training actually do. The scale gets a vote, not total control.
        </p>
        <div
          className="pt-4 border-t border-hairline"
          data-analytics-source="skinny_fat_calculator"
        >
          <p className="text-bone font-medium mb-3">Want this adapted to your schedule?</p>
          <Link
            href="/apply"
            className="btn btn-primary inline-flex"
            data-analytics-event="lead_magnet_submit"
            data-analytics-link-kind="skinny_fat_calculator"
          >
            Apply for coaching <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-void border border-hairline p-6 md:p-8 rounded-lg mt-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-hairline">
        <div className="h-full bg-bone transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
      </div>

      <h3 className="text-bone text-[22px] font-semibold mb-2">The Skinny-Fat Fix Calculator</h3>
      <p className="text-mute text-[14.5px] mb-6">
        Get a conservative, understandable recomp starting point instead of a crash diet.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === 1 && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-bone/70 uppercase tracking-wider font-semibold">Primary Goal</label>
              <select
                required
                className="bg-transparent border border-hairline rounded px-4 py-2.5 text-bone focus:outline-none focus:border-bone/50 appearance-none"
                value={formData.primaryGoal}
                onChange={e => setFormData({...formData, primaryGoal: e.target.value})}
              >
                <option value="" disabled className="bg-void">Select a goal</option>
                <option value="recomp" className="bg-void">Body Recomposition</option>
                <option value="build" className="bg-void">Build Muscle</option>
                <option value="lose" className="bg-void">Lose Fat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] text-bone/70 uppercase tracking-wider font-semibold">Weight (lbs)</label>
                <input
                  required
                  type="number"
                  min="80"
                  max="500"
                  placeholder="e.g. 175"
                  className="bg-transparent border border-hairline rounded px-4 py-2.5 text-bone focus:outline-none focus:border-bone/50"
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] text-bone/70 uppercase tracking-wider font-semibold">Height</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 5'10"
                  className="bg-transparent border border-hairline rounded px-4 py-2.5 text-bone focus:outline-none focus:border-bone/50"
                  value={formData.height}
                  onChange={e => setFormData({...formData, height: e.target.value})}
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-bone/70 uppercase tracking-wider font-semibold">Training Days/Week</label>
            <select
              required
              className="bg-transparent border border-hairline rounded px-4 py-2.5 text-bone focus:outline-none focus:border-bone/50 appearance-none"
              value={formData.trainingDays}
              onChange={e => setFormData({...formData, trainingDays: e.target.value})}
            >
              <option value="" disabled className="bg-void">Select days</option>
              <option value="2" className="bg-void">2 days</option>
              <option value="3" className="bg-void">3 days</option>
              <option value="4" className="bg-void">4+ days</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-2">
          {step === 1 ? 'Next Step' : 'Get My Recomp Starting Point'}
        </button>

        {step === 2 && (
          <button type="button" onClick={() => setStep(1)} className="text-mute hover:text-bone text-[13px] mt-2">
            ← Back
          </button>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";

type Result = {
  bf: number;
  category: string;
  categoryNote: string;
  fatMass: number;
  leanMass: number;
};

function categoryFor(bf: number): { category: string; note: string } {
  if (bf < 6) return { category: "Essential fat", note: "Very lean — at or below the floor the body needs." };
  if (bf < 14) return { category: "Athletic", note: "Lean and defined — typical of consistent trainers." };
  if (bf < 18) return { category: "Fitness", note: "Fit and healthy — abs starting to show toward the lower end." };
  if (bf < 25) return { category: "Average", note: "Common range for men 25-40 — room to lean out." };
  return { category: "Above average", note: "Worth a structured fat-loss phase — the recomposition basics apply." };
}

function calculate(
  heightIn: number,
  neckIn: number,
  waistIn: number,
  weightLb: number,
): Result {
  // U.S. Navy method (men): %BF = 86.010 x log10(waist - neck)
  //   - 70.041 x log10(height) + 36.76. Measurements in inches.
  const raw =
    86.01 * Math.log10(waistIn - neckIn) -
    70.041 * Math.log10(heightIn) +
    36.76;
  const bf = Math.max(2, Math.min(60, raw));
  const fatMass = (weightLb * bf) / 100;
  const { category, note } = categoryFor(bf);
  return {
    bf: Math.round(bf * 10) / 10,
    category,
    categoryNote: note,
    fatMass: Math.round(fatMass * 10) / 10,
    leanMass: Math.round((weightLb - fatMass) * 10) / 10,
  };
}

export default function BodyFatForm() {
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  const [neck, setNeck] = useState<string>("15");
  const [waist, setWaist] = useState<string>("34");
  const [weight, setWeight] = useState<string>("190");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const totalHeight = Number(heightFt) * 12 + Number(heightIn);
    const n = Number(neck);
    const w = Number(waist);
    const lb = Number(weight);
    if (!totalHeight || !n || !w || !lb) {
      setError("Fill in every field.");
      setResult(null);
      return;
    }
    if (w <= n) {
      setError("Waist must be larger than neck — check your measurements.");
      setResult(null);
      return;
    }
    setError("");
    setResult(calculate(totalHeight, n, w, lb));
  }

  return (
    <div>
      <form data-form-id="calc_body_fat" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bf-ht-ft" className="block text-[14px] text-bone/85 mb-2">
              Height (ft)
            </label>
            <input
              id="bf-ht-ft"
              className="apply-input"
              type="number"
              min={3}
              max={8}
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bf-ht-in" className="block text-[14px] text-bone/85 mb-2">
              Height (in)
            </label>
            <input
              id="bf-ht-in"
              className="apply-input"
              type="number"
              min={0}
              max={11}
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="bf-neck" className="block text-[14px] text-bone/85 mb-2">
              Neck (in)
            </label>
            <input
              id="bf-neck"
              className="apply-input"
              type="number"
              min={8}
              max={30}
              step="0.25"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bf-waist" className="block text-[14px] text-bone/85 mb-2">
              Waist (in)
            </label>
            <input
              id="bf-waist"
              className="apply-input"
              type="number"
              min={20}
              max={70}
              step="0.25"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bf-weight" className="block text-[14px] text-bone/85 mb-2">
              Weight (lb)
            </label>
            <input
              id="bf-weight"
              className="apply-input"
              type="number"
              min={50}
              max={600}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <p className="text-[13px] text-mute2 leading-[1.55]">
          Measure with a tape, relaxed: waist at the navel, neck just below the
          larynx. Snug, not compressing.
        </p>

        {error && (
          <p className="text-[13.5px] text-cloudText leading-[1.5]">{error}</p>
        )}

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Calculate body fat
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="hair mb-8" />
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your body fat estimate
          </h2>

          <div className="mt-6 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="eyebrow text-cloudText">Estimated body fat</p>
            <p className="mt-2 text-bone text-[34px] md:text-[42px] font-semibold">
              {result.bf}
              <span className="text-[20px]">%</span>{" "}
              <span className="text-[15px] text-mute font-normal">
                · {result.category}
              </span>
            </p>
            <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
              {result.categoryNote}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-ink2/40 p-4">
              <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">
                Fat mass
              </p>
              <p className="mt-1.5 text-bone text-[19px] md:text-[22px] font-semibold">
                {result.fatMass.toLocaleString()} lb
              </p>
            </div>
            <div className="rounded-xl border border-line bg-ink2/40 p-4">
              <p className="text-[12px] text-mute2 uppercase tracking-[0.08em]">
                Lean mass
              </p>
              <p className="mt-1.5 text-bone text-[19px] md:text-[22px] font-semibold">
                {result.leanMass.toLocaleString()} lb
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="text-[14.5px] text-bone/85 leading-[1.6]">
              <b className="text-bone">What to do with it:</b>{" "}
              the Navy method
              is an estimate — its real value is tracking the trend every few
              weeks, not the exact number. To bring body fat down without losing
              the lean mass, that&apos;s a recomposition job — see{" "}
              <Link
                href="/blog/body-recomposition-for-men"
                className="underline hover:text-bone"
              >
                the body recomposition guide
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="/apply" className="btn btn-primary" data-cta="tool_primary">
                Turn these numbers into a plan
                <span aria-hidden="true">→</span>
              </a>
              <a href="/tools/tdee-calculator" className="btn btn-secondary">
                TDEE calculator
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Optional email capture — below result, never gates it */}
          <ToolEmailCapture toolName="body-fat" />
        </div>
      )}
    </div>
  );
}

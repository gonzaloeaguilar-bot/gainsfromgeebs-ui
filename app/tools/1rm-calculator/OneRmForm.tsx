"use client";

import { useState } from "react";
import Link from "next/link";
import ToolEmailCapture from "@/components/ToolEmailCapture";

// Common rep targets and their standard percentage of 1RM (Brzycki-aligned).
const REP_TARGETS = [1, 2, 3, 5, 8, 10, 12] as const;
const REP_PCT: Record<number, number> = {
  1: 100,
  2: 97,
  3: 94,
  5: 89,
  8: 81,
  10: 75,
  12: 70,
};

type Result = {
  oneRm: number;
  epley: number;
  brzycki: number;
  table: { reps: number; pct: number; weight: number }[];
};

function calculate(weightLb: number, reps: number): Result {
  // Epley: 1RM = w x (1 + reps/30). Brzycki: 1RM = w x 36 / (37 - reps).
  const epley = weightLb * (1 + reps / 30);
  const brzycki = (weightLb * 36) / (37 - reps);
  const oneRm = Math.round((epley + brzycki) / 2);
  const table = REP_TARGETS.map((r) => ({
    reps: r,
    pct: REP_PCT[r],
    weight: Math.round((oneRm * REP_PCT[r]) / 100),
  }));
  return {
    oneRm,
    epley: Math.round(epley),
    brzycki: Math.round(brzycki),
    table,
  };
}

export default function OneRmForm() {
  const [weight, setWeight] = useState<string>("185");
  const [reps, setReps] = useState<string>("5");
  const [result, setResult] = useState<Result | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const w = Number(weight);
    const r = Number(reps);
    if (!w || !r || r < 1 || r > 12) return;
    setResult(calculate(w, r));
  }

  return (
    <div>
      <form data-form-id="calc_1rm" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="weight"
              className="block text-[14px] text-bone/85 mb-2"
            >
              Weight lifted (lb)
            </label>
            <input
              id="weight"
              className="apply-input"
              type="number"
              min={1}
              max={1500}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reps" className="block text-[14px] text-bone/85 mb-2">
              Reps performed (1-12)
            </label>
            <input
              id="reps"
              className="apply-input"
              type="number"
              min={1}
              max={12}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
        </div>

        <p className="text-[13px] text-mute2 leading-[1.55]">
          Use a hard set you actually completed with clean form. The estimate is
          most accurate from sets of 1-6 reps.
        </p>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Estimate 1RM
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="hair mb-8" />
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your estimated 1RM
          </h2>

          <div className="mt-6 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="eyebrow text-cloudText">Estimated one-rep max</p>
            <p className="mt-2 text-bone text-[34px] md:text-[42px] font-semibold">
              {result.oneRm.toLocaleString()}{" "}
              <span className="text-[16px] text-mute font-normal">lb</span>
            </p>
            <p className="mt-1.5 text-[13.5px] text-mute leading-[1.5]">
              Average of the Epley ({result.epley.toLocaleString()} lb) and
              Brzycki ({result.brzycki.toLocaleString()} lb) formulas. An
              estimate — not a tested max.
            </p>
          </div>

          <h3 className="mt-10 text-bone text-[18px] md:text-[20px] font-semibold tracking-[-0.005em]">
            Training loads
          </h3>
          <p className="mt-2 text-[13.5px] text-mute leading-[1.5] max-w-[58ch]">
            What to load for common rep targets, as a percentage of your 1RM.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 text-[12px] uppercase tracking-[0.08em] text-mute2 font-medium">
                    Reps
                  </th>
                  <th className="py-3 pr-4 text-[12px] uppercase tracking-[0.08em] text-mute2 font-medium">
                    % of 1RM
                  </th>
                  <th className="py-3 text-[12px] uppercase tracking-[0.08em] text-bone font-medium">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row) => (
                  <tr key={row.reps} className="border-b border-line2/50">
                    <td className="py-3 pr-4 text-[14.5px] text-bone/75 font-medium">
                      {row.reps}
                    </td>
                    <td className="py-3 pr-4 text-[14.5px] text-mute">
                      {row.pct}%
                    </td>
                    <td className="py-3 text-[14.5px] text-bone/95 font-semibold">
                      {row.weight.toLocaleString()} lb
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="text-[14.5px] text-bone/85 leading-[1.6]">
              <b className="text-bone">How to use it:</b> strength work sits
              around 85-95% for low reps; muscle-building work sits around
              70-80% for moderate reps. Progressive overload means nudging these
              numbers up over time — see{" "}
              <Link
                href="/blog/progressive-overload-explained"
                className="underline hover:text-bone"
              >
                the progressive overload guide
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
          <ToolEmailCapture toolName="1rm" />
        </div>
      )}
    </div>
  );
}

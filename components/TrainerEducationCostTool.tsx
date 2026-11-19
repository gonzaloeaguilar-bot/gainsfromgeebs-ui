"use client";

import { useState } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { getTrainerEducationCostResult, type EducationCostResult } from "@/lib/trainerEducationCost";

export default function TrainerEducationCostTool() {
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<EducationCostResult | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(budget);
    if (!budget.trim() || !Number.isFinite(value) || value < 0) {
      setResult(null);
      setError("Enter a budget of $0 or more.");
      return;
    }
    setError("");
    setResult(getTrainerEducationCostResult(value));
    trackClientEvent("calculator_completed", { calculator_name: "trainer_education_cost", calculator_path: "/guides/how-much-does-an-online-fitness-coach-cost" });
  }

  return (
    <section className="mt-7 rounded-[6px] border border-line2 bg-ink3/40 p-5 md:p-6" aria-labelledby="trainer-education-cost-tool">
      <h3 id="trainer-education-cost-tool" className="text-[19px] font-semibold leading-[1.25] text-bone md:text-[21px]">Check your certification budget</h3>
      <p className="mt-2 max-w-[58ch] text-[14.5px] leading-[1.6] text-mute">Enter the amount you can set aside for a primary certification. This uses the $400–$2,000 range explained above; it does not include a degree program.</p>
      <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={onSubmit} noValidate>
        <div className="w-full sm:max-w-[250px]">
          <label htmlFor="trainer-education-budget" className="block text-[14px] text-bone/85">Your budget (USD)</label>
          <input id="trainer-education-budget" className="apply-input mt-2 w-full" type="number" inputMode="decimal" min="0" step="1" value={budget} onChange={(event) => setBudget(event.target.value)} aria-describedby={error ? "trainer-education-budget-error" : undefined} aria-invalid={Boolean(error)} />
        </div>
        <button type="submit" className="btn btn-primary">Check budget <span aria-hidden="true">→</span></button>
      </form>
      {error ? <p id="trainer-education-budget-error" className="mt-3 text-[14px] text-red-300" role="alert">{error}</p> : null}
      {result ? (
        <div className="mt-5 rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] p-4" aria-live="polite">
          <p className="text-[16px] font-semibold text-bone">{result.headline}</p>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-bone/85">{result.detail}</p>
          <p className="mt-3 text-[13.5px]">
            <Link
              href="/tools/online-trainer-education-cost"
              className="text-cloudText hover:text-bone underline"
            >
              Compare full NASM, ACE, ISSA &amp; NSCA fee tables →
            </Link>
          </p>
        </div>
      ) : null}
    </section>
  );
}

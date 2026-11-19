"use client";

import { useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  calculateEducationCost,
  parseCost,
  CERTIFICATION_PRESETS,
  type EducationCostInput,
  type EducationCostResult,
  type CertificationPreset,
} from "./logic";

const fields: { id: keyof EducationCostInput; label: string; hint: string }[] = [
  { id: "certification", label: "Certification or course fee", hint: "Required" },
  { id: "studyMaterials", label: "Study materials", hint: "Optional" },
  { id: "examOrRetest", label: "Exam or retest fees", hint: "Optional" },
  { id: "renewal", label: "Renewal or continuing education", hint: "Optional annual cost" },
];

const defaultPreset = CERTIFICATION_PRESETS[0];

const initialValues: Record<keyof EducationCostInput, string> = {
  certification: String(defaultPreset.certification),
  studyMaterials: String(defaultPreset.studyMaterials),
  examOrRetest: String(defaultPreset.examOrRetest),
  renewal: String(defaultPreset.renewal),
};

const initialResult: EducationCostResult = calculateEducationCost({
  certification: defaultPreset.certification,
  studyMaterials: defaultPreset.studyMaterials,
  examOrRetest: defaultPreset.examOrRetest,
  renewal: defaultPreset.renewal,
});

export default function EducationCostForm() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EducationCostResult | null>(initialResult);

  function updateValue(field: keyof EducationCostInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setError(null);
  }

  function applyPreset(preset: CertificationPreset) {
    setValues({
      certification: String(preset.certification),
      studyMaterials: String(preset.studyMaterials),
      examOrRetest: String(preset.examOrRetest),
      renewal: String(preset.renewal),
    });
    setError(null);
    const nextResult = calculateEducationCost({
      certification: preset.certification,
      studyMaterials: preset.studyMaterials,
      examOrRetest: preset.examOrRetest,
      renewal: preset.renewal,
    });
    setResult(nextResult);
    trackClientEvent("calculator_completed", {
      calculator_name: "online_trainer_education_cost",
      calculator_path: "/tools/online-trainer-education-cost",
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = Object.fromEntries(
      fields.map(({ id }) => [id, parseCost(String(formData.get(id) ?? ""))]),
    ) as Record<keyof EducationCostInput, number | null>;

    if (parsed.certification === 0) {
      setResult(null);
      setError("Enter the course or certification fee to calculate your budget.");
      return;
    }

    if (Object.values(parsed).some((value) => value === null)) {
      setResult(null);
      setError("Use whole-dollar amounts of zero or more in each cost field.");
      return;
    }

    const nextResult = calculateEducationCost(parsed as EducationCostInput);
    setResult(nextResult);
    trackClientEvent("calculator_completed", {
      calculator_name: "online_trainer_education_cost",
      calculator_path: "/tools/online-trainer-education-cost",
    });
  }

  return (
    <div>
      <div className="mb-6 rounded-xl border border-line2 bg-ink3/30 p-4">
        <p className="text-[14px] font-medium text-bone">Or start with a common certification benchmark:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CERTIFICATION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="rounded-lg border border-line2 bg-ink3/60 px-3 py-1.5 text-[13px] text-bone transition-colors hover:border-cloudText/50 hover:bg-ink3"
              onClick={() => applyPreset(preset)}
            >
              {preset.name} (${preset.certification})
            </button>
          ))}
        </div>
      </div>

      <form data-form-id="calc_education_cost" onSubmit={onSubmit} className="space-y-5" noValidate>
        <fieldset>
          <legend className="text-[16px] font-semibold text-bone">
            Add the costs you already know
          </legend>
          <p id="cost-input-help" className="mt-2 text-[14px] leading-[1.55] text-mute">
            This is your own budget total, not a quote. Leave an optional field blank when it does not apply.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map(({ id, label, hint }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-[14px] text-bone/85">
                  {label} <span className="text-mute">({hint})</span>
                </label>
                <div className="relative mt-2">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-mute">$</span>
                  <input
                    id={id}
                    name={id}
                    inputMode="decimal"
                    className="apply-input pl-8"
                    type="text"
                    value={values[id]}
                    onChange={(event) => updateValue(id, event.target.value)}
                    aria-describedby="cost-input-help"
                    aria-invalid={error ? true : undefined}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <p role="alert" aria-live="assertive" className={error ? "text-[14px] text-[#fca5a5]" : "sr-only"}>
          {error}
        </p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Calculate my budget <span aria-hidden="true">→</span>
        </button>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {result && (
          <section className="mt-10 border-t border-line pt-8" aria-labelledby="education-cost-result">
            <p className="eyebrow text-cloudText">Your estimate</p>
            <h2 id="education-cost-result" className="mt-3 display text-[26px] leading-[1.1] text-bone md:text-[32px]">
              Your first-year education budget
            </h2>
            <div className="mt-5 rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="text-[36px] font-semibold text-bone md:text-[44px]">
                ${result.firstYearTotal.toLocaleString()}
              </p>
              <p className="mt-2 max-w-[56ch] text-[14.5px] leading-[1.6] text-mute">
                Course fee, study materials, and exam costs you entered. Keep any optional recurring renewal cost separate from the first-year total.
              </p>
              {result.renewalTotal > 0 && (
                <p className="mt-4 border-t border-line pt-4 text-[15px] text-bone/85">
                  Ongoing annual budget: <strong className="text-bone">${result.renewalTotal.toLocaleString()}</strong>
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

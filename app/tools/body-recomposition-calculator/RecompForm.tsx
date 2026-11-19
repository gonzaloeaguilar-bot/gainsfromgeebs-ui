"use client";

import { useEffect, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import SendKrisStep from "@/components/SendKrisStep";
import {
  calculate,
  type Experience,
  type RecompVerdict,
  type Result,
  type Sex,
  type TrainingDays,
} from "./logic";

type Unit = "imperial" | "metric";

function kgToLb(kg: number): number {
  return kg / 0.45359237;
}

function cmToIn(cm: number): number {
  return cm / 2.54;
}

const VERDICT_STYLES: Record<
  RecompVerdict,
  { border: string; bg: string; eyebrowColor: string; eyebrow: string }
> = {
  strong: {
    border: "border-green-700/50",
    bg: "bg-green-950/30",
    eyebrowColor: "text-green-400",
    eyebrow: "Strong candidate",
  },
  possible: {
    border: "border-yellow-700/50",
    bg: "bg-yellow-950/20",
    eyebrowColor: "text-yellow-400",
    eyebrow: "Possible — slower rate",
  },
  unlikely: {
    border: "border-red-800/50",
    bg: "bg-red-950/20",
    eyebrowColor: "text-red-400",
    eyebrow: "Better alternative exists",
  },
};

const EXPERIENCE_LABEL: Record<Experience, string> = {
  new: "New to structured lifting (< 6 months)",
  returning: "Returning after a long break (6+ months off)",
  trained: "1+ year of consistent training",
};

const SEND_KRIS_TITLE: Record<RecompVerdict, string> = {
  strong: "You are a recomp candidate. Want Kris to run it with you?",
  possible: "Recomp can work for you, just slower. Want Kris to set the pace?",
  unlikely: "There is a better first phase for you. Want Kris to plan it?",
};

const EXPERIENCE_SHORT: Record<Experience, string> = {
  new: "New to lifting",
  returning: "Returning after a break",
  trained: "1+ year training",
};

/** The reader's result, as the chips shown back to them. */
export function resultSummary(r: Result, experience: Experience, trainingDays: string): string[] {
  return [
    VERDICT_STYLES[r.verdict].eyebrow,
    `${r.tdee.toLocaleString("en-US")} kcal maintenance`,
    `${r.recompCalories.toLocaleString("en-US")} kcal recomp target`,
    `${r.proteinGrams} g protein`,
    `${trainingDays} lifting days a week`,
    EXPERIENCE_SHORT[experience],
  ];
}

/** The result as one line in the application's notes for Kris. */
export function resultHandoff(r: Result, experience: Experience, trainingDays: string): string {
  return `From the body recomp calculator: ${resultSummary(r, experience, trainingDays).join(", ")}.`;
}

const SEND_KRIS_HREF =
  "/apply?entry_source=qualified_content&entry_content=recomp_calculator&bridge_version=send_kris_v1";

export default function RecompForm() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<Unit>("imperial");
  const [age, setAge] = useState<string>("30");
  // imperial fields
  const [weightLb, setWeightLb] = useState<string>("190");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  // metric fields
  const [weightKg, setWeightKg] = useState<string>("86");
  const [heightCm, setHeightCm] = useState<string>("178");
  // shared
  const [bodyFat, setBodyFat] = useState<string>("20");
  const [experience, setExperience] = useState<Experience>("new");
  const [trainingDays, setTrainingDays] = useState<string>("3");
  const [result, setResult] = useState<Result | null>(null);

  // The women's guide and the "for women" section link here with ?sex=female
  // (or #women). Preset the female setting with typical starting stats so the
  // first result a woman sees is computed on female body-fat ranges, not on
  // the 190 lb / 20% male default. Read after mount: the page is static.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sex") !== "female" && window.location.hash !== "#women") return;
    // One-time hydration from the URL; same pattern as the tracker forms.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSex("female");
    setWeightLb("150");
    setHeightFt("5");
    setHeightIn("5");
    setWeightKg("68");
    setHeightCm("165");
    setBodyFat("28");
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const a = Number(age);
    const bf = Number(bodyFat);
    const td = Number(trainingDays) as TrainingDays;
    if (!a || !bf || !td) return;

    let weightInLb: number;
    let heightInInches: number;

    if (unit === "imperial") {
      weightInLb = Number(weightLb);
      heightInInches = Number(heightFt) * 12 + Number(heightIn);
    } else {
      weightInLb = kgToLb(Number(weightKg));
      heightInInches = cmToIn(Number(heightCm));
    }

    if (!weightInLb || !heightInInches) return;

    const r = calculate(sex, a, weightInLb, heightInInches, bf, experience, td);
    setResult(r);

    trackClientEvent("calculator_completed", {
      calculator_name: "body-recomposition",
      calculator_path: "/tools/body-recomposition-calculator",
      experience,
      verdict: r.verdict,
      sex,
    });
  }

  const style = result ? VERDICT_STYLES[result.verdict] : null;

  return (
    <div>
      <form data-form-id="calc_body_recomposition" onSubmit={onSubmit} className="space-y-6">
        {/* Unit toggle */}
        <div>
          <label className="block text-[14px] text-bone/85 mb-2">Units</label>
          <div className="grid grid-cols-2 gap-2 max-w-[240px]">
            <button
              type="button"
              className={`apply-radio justify-center ${unit === "imperial" ? "ring-1 ring-[#B91C1C]" : ""}`}
              onClick={() => setUnit("imperial")}
            >
              Imperial (lb / ft)
            </button>
            <button
              type="button"
              className={`apply-radio justify-center ${unit === "metric" ? "ring-1 ring-[#B91C1C]" : ""}`}
              onClick={() => setUnit("metric")}
            >
              Metric (kg / cm)
            </button>
          </div>
        </div>

        {/* Sex + Age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] text-bone/85 mb-2">Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`apply-radio justify-center ${sex === "male" ? "ring-1 ring-[#B91C1C]" : ""}`}
                aria-pressed={sex === "male"}
                onClick={() => setSex("male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`apply-radio justify-center ${sex === "female" ? "ring-1 ring-[#B91C1C]" : ""}`}
                aria-pressed={sex === "female"}
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

        {/* Weight + Height */}
        {unit === "imperial" ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor="weight-lb" className="block text-[14px] text-bone/85 mb-2">
                Weight (lb)
              </label>
              <input
                id="weight-lb"
                className="apply-input"
                type="number"
                min={50}
                max={600}
                value={weightLb}
                onChange={(e) => setWeightLb(e.target.value)}
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
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight-kg" className="block text-[14px] text-bone/85 mb-2">
                Weight (kg)
              </label>
              <input
                id="weight-kg"
                className="apply-input"
                type="number"
                min={30}
                max={300}
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ht-cm" className="block text-[14px] text-bone/85 mb-2">
                Height (cm)
              </label>
              <input
                id="ht-cm"
                className="apply-input"
                type="number"
                min={120}
                max={230}
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Body fat */}
        <div>
          <label htmlFor="body-fat" className="block text-[14px] text-bone/85 mb-2">
            Body fat estimate (%)
          </label>
          <input
            id="body-fat"
            className="apply-input max-w-[160px]"
            type="number"
            min={3}
            max={60}
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
          />
          <p className="mt-2 text-[12.5px] text-mute2 leading-[1.6] max-w-[56ch]">
            Not sure?{" "}
            <a href="/tools/body-fat-calculator" className="underline">
              Use tape measurements to estimate
            </a>
            . Rough guide: visible abs = 10–14%, athletic = 15–19%, average = 20–25%, higher = 25%+.
            For women, add ~8% to each range.
          </p>
        </div>

        {/* Training experience */}
        <div>
          <label htmlFor="experience" className="block text-[14px] text-bone/85 mb-2">
            Training experience
          </label>
          <select
            id="experience"
            className="apply-input"
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
          >
            {(Object.keys(EXPERIENCE_LABEL) as Experience[]).map((k) => (
              <option key={k} value={k}>
                {EXPERIENCE_LABEL[k]}
              </option>
            ))}
          </select>
        </div>

        {/* Weekly training days */}
        <div>
          <label htmlFor="training-days" className="block text-[14px] text-bone/85 mb-2">
            Planned training days per week
          </label>
          <select
            id="training-days"
            className="apply-input max-w-[200px]"
            value={trainingDays}
            onChange={(e) => setTrainingDays(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((d) => (
              <option key={d} value={d}>
                {d} {d === 1 ? "day" : "days"}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Calculate
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {result && style && (
        <div className="mt-10">
          <div className="hair mb-8" />

          {/* Viability verdict */}
          <div className={`rounded-2xl border ${style.border} ${style.bg} p-6`}>
            <p className={`eyebrow ${style.eyebrowColor}`}>{style.eyebrow}</p>
            <h2 className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]">
              {result.verdictHeadline}
            </h2>
            <p className="mt-4 text-[15px] md:text-[15.5px] text-bone/80 leading-[1.7] max-w-[62ch]">
              {result.verdictDetail}
            </p>
          </div>

          {/* Calorie + protein targets */}
          <h3 className="mt-10 text-bone text-[18px] md:text-[20px] font-semibold tracking-[-0.005em]">
            Your targets
          </h3>
          <p className="mt-2 text-[13.5px] text-mute2 leading-[1.55]">
            Estimates for healthy adults. Not medical advice.
          </p>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">TDEE</p>
              <p className="mt-2 text-bone text-[26px] md:text-[30px] font-semibold">
                {result.tdee.toLocaleString()}
                <span className="text-[14px] text-mute font-normal"> kcal</span>
              </p>
              <p className="mt-1.5 text-[12.5px] text-mute leading-[1.5]">
                Your estimated maintenance calories.
              </p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">Recomp calories</p>
              <p className="mt-2 text-bone text-[26px] md:text-[30px] font-semibold">
                {result.recompCalories.toLocaleString()}
                <span className="text-[14px] text-mute font-normal"> kcal/day</span>
              </p>
              <p className="mt-1.5 text-[12.5px] text-mute leading-[1.5]">
                ~12% deficit from TDEE (10–15% range). Supports fat loss while fueling training.
              </p>
            </div>
            <div className="rounded-2xl border border-line2 bg-ink3/40 p-5">
              <p className="eyebrow text-cloudText">Daily protein</p>
              <p className="mt-2 text-bone text-[26px] md:text-[30px] font-semibold">
                {result.proteinGrams}
                <span className="text-[14px] text-mute font-normal"> g</span>
              </p>
              <p className="mt-1.5 text-[12.5px] text-mute leading-[1.5]">
                {result.verdict === "unlikely" ? "0.8" : "0.9"} g/lb bodyweight. Hit this first
                — calories flex, protein does not.
              </p>
            </div>
          </div>

          {/* 12-week expectation */}
          <div className="mt-6 rounded-2xl border border-line2 bg-ink3/40 p-5">
            <p className="eyebrow text-cloudText">Realistic 12-week expectation</p>
            <p className="mt-3 text-[15px] md:text-[15.5px] text-bone/85 leading-[1.7] max-w-[62ch]">
              {result.expectation12wk}
            </p>
          </div>

          {/* The next step sits HERE, straight after the numbers: 71 users
              finished this calculator in 28 days and 4 clicked an apply link
              that used to sit below the method note and three other buttons. */}
          <SendKrisStep
            className="mt-8"
            ctaId="recomp_result_send_kris"
            position="calculator_result"
            eyebrow="Next step"
            title={SEND_KRIS_TITLE[result.verdict]}
            body="Kris reads every application himself. These numbers go with yours, so you do not type them twice."
            label="Send Kris my numbers"
            href={SEND_KRIS_HREF}
            handoff={{
              entryContent: "recomp_calculator",
              text: resultHandoff(result, experience, trainingDays),
            }}
            summary={resultSummary(result, experience, trainingDays)}
          />

          {/* Method note */}
          <div className="mt-6 rounded-xl border border-line bg-ink2/30 px-5 py-4 text-[13px] text-mute2 leading-[1.6]">
            <strong className="text-mute">Method:</strong> TDEE via Mifflin-St Jeor × activity
            factor (1.375–1.9 by training days). Recomp target = TDEE × 0.88 (12% deficit). Protein
            = 0.9 g/lb for recomp candidates, 0.8 g/lb otherwise, per ISSN Position Stand (Jäger
            et al., 2017). Viability judgment uses training experience and body fat estimate as
            primary signals, consistent with current body composition research.
          </div>

          <div className="mt-6 rounded-[6px] border border-cloudText/30 bg-cloudText/[0.06] px-5 py-5">
            <p className="eyebrow text-cloudText">Use the result</p>
            <h3 className="mt-3 text-bone text-[18px] md:text-[20px] font-semibold">
              Your next move depends on the verdict
            </h3>
            <div className="mt-4 grid gap-3 text-[13.5px] leading-[1.6] text-mute sm:grid-cols-3">
              <p>
                <strong className="block text-bone">Strong candidate</strong>
                Run the recomp targets for 3-4 weeks, then adjust from scale,
                photos, measurements, and strength.
              </p>
              <p>
                <strong className="block text-bone">Possible</strong>
                Keep the deficit smaller and judge progress by training quality,
                not weekly scale drops.
              </p>
              <p>
                <strong className="block text-bone">Unlikely</strong>
                Pick a cleaner phase: cut first if body fat is high, lean bulk if
                you are already lean and trained.
              </p>
            </div>
          </div>

          {/* Further reading. The coaching step is above, next to the numbers. */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href="/results" className="btn btn-secondary">
              See client results
              <span aria-hidden="true">→</span>
            </a>
            <a href="/guides/body-recomposition-for-beginners" className="btn btn-secondary">
              Beginner recomp guide
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/resources/how-to-calculate-macros-for-body-recomposition"
              className="btn btn-secondary"
            >
              Set macro targets
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Optional email capture — below result, never gates it */}
          <ToolEmailCapture toolName="body-recomposition" />
        </div>
      )}
    </div>
  );
}

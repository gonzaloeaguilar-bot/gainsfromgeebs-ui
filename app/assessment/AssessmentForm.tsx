"use client";

// ============================================================
//  AssessmentForm
//
//  Two deliberate decisions, both different from how a competitor
//  page doing the same job is built:
//
//  1. The ESTIMATE is never gated. Body fat, lean mass and the goal
//     range appear the moment the questions are answered, the same
//     way every calculator on this site behaves. Asking for an email
//     before showing a number the person just supplied the inputs for
//     is the thing that makes these pages feel like a trade.
//
//  2. The PHASE PLAN is gated on a first name and an email. No phone
//     field: subscribeEmail rejects a phone without SMS consent, which
//     silently failed the gate and lost the lead.
// ============================================================

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import GuidedSteps, {
  ChoiceButton,
  ChoiceChips,
  ChoiceGroup,
  type GuidedStep,
} from "@/components/GuidedSteps";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { subscribeEmail } from "@/app/lib/subscribe";
import PlanSections from "./PlanSections";
import PhotoFirstAssessment from "./PhotoFirstAssessment";
import type { EatingOutFreq, PlanInput, SleepBand } from "./plan";
import {
  assess,
  type DietHistory,
  type Goal,
  type Result,
  type Sex,
  type WeightTrend,
} from "./logic";

const GOALS: { id: Goal; label: string }[] = [
  { id: "lose_fat", label: "Lose body fat" },
  { id: "visible_abs", label: "Get visibly lean" },
  { id: "get_lean", label: "Get as lean as I can" },
  { id: "build_muscle", label: "Build muscle" },
];

const TRENDS: { id: WeightTrend; label: string }[] = [
  { id: "down_fast", label: "Going down quickly" },
  { id: "down_slow", label: "Going down slowly" },
  { id: "steady", label: "Staying about the same" },
  { id: "up_slow", label: "Going up slowly" },
  { id: "up_fast", label: "Going up quickly" },
];

const HISTORY: { id: DietHistory; label: string }[] = [
  { id: "not_dieting", label: "I am not dieting right now" },
  { id: "under_1_month", label: "Less than a month" },
  { id: "1_3_months", label: "One to three months" },
  { id: "3_6_months", label: "Three to six months" },
  { id: "6_plus_months", label: "More than six months" },
  { id: "years_on_off", label: "On and off for years" },
];

const TRAINING_DAYS = [0, 1, 2, 3, 4, 5, 6];

const SLEEP: { id: SleepBand; label: string }[] = [
  { id: "under_6", label: "Under 6 hours" },
  { id: "6_to_7", label: "6 to 7 hours" },
  { id: "7_to_9", label: "7 to 9 hours" },
  { id: "over_9", label: "More than 9 hours" },
];

const EATING_OUT: { id: EatingOutFreq; label: string }[] = [
  { id: "rarely", label: "Rarely" },
  { id: "weekly", label: "About once a week" },
  { id: "often", label: "Several times a week" },
];

type Draft = {
  goal: Goal | null;
  sex: Sex | null;
  age: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  trend: WeightTrend | null;
  caloriesKnown: boolean | null;
  calories: string;
  history: DietHistory | null;
  trainingDays: number | null;
  dailySteps: string;
  sleep: SleepBand | null;
  plantBased: boolean | null;
  eatingOut: EatingOutFreq | null;
  peptideContext: "none" | "considering" | "prescribed_glp1" | "other" | null;
  waist: string;
  neck: string;
  hip: string;
  hasTape: boolean | null;
};

const EMPTY: Draft = {
  goal: null,
  sex: null,
  age: "",
  heightFt: "5",
  heightIn: "10",
  weight: "",
  trend: null,
  caloriesKnown: null,
  calories: "",
  history: null,
  trainingDays: null,
  dailySteps: "",
  sleep: null,
  plantBased: null,
  eatingOut: null,
  peptideContext: null,
  waist: "",
  neck: "",
  hip: "",
  hasTape: null,
};

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-bone/85 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })}
          onChange={(e) => onChange(e.target.value)}
          className="apply-input min-h-[64px] max-w-[190px] border-2 border-bone/45 bg-ink2 px-5 text-[24px] font-semibold text-bone placeholder:text-mute focus:border-cloud"
        />
        {suffix && <span className="text-[14px] text-mute">{suffix}</span>}
      </div>
    </div>
  );
}

export default function AssessmentForm() {
  const [started, setStarted] = useState(false);
  const [basicsCollected, setBasicsCollected] = useState(false);
  const [photoObservation, setPhotoObservation] = useState<string | null>(null);
  const [d, setD] = useState<Draft>(EMPTY);
  const [result, setResult] = useState<Result | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [split, setSplit] = useState<"carb" | "fat">("carb");
  const [selectedStat, setSelectedStat] = useState<"bodyFat" | "leanMass" | "targetBodyFat" | "goalWeight" | null>(null);
  const gateRef = useRef<HTMLElement>(null);

  // gate state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gateStatus, setGateStatus] = useState<
    "idle" | "loading" | "unlocked" | "error"
  >("idle");
  const [gateError, setGateError] = useState("");

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const heightInches =
    Number(d.heightFt || 0) * 12 + Number(d.heightIn || 0);

  const steps: GuidedStep[] = useMemo(
    () => {
      const allSteps: GuidedStep[] = [
      {
        id: "goal",
        question: "What are you actually trying to do?",
        help: "Pick the one that matters most right now. The plan is built around it.",
        isAnswered: d.goal !== null,
        render: () => (
          <ChoiceGroup>
            {GOALS.map((g) => (
              <ChoiceButton
                key={g.id}
                selected={d.goal === g.id}
                onClick={() => {
                  set("goal", g.id);
                }}
              >
                {g.label}
              </ChoiceButton>
            ))}
          </ChoiceGroup>
        ),
      },
      {
        id: "sex",
        question: "What is your sex?",
        help: "Energy requirements and body-fat ranges differ, so this changes the maths.",
        isAnswered: d.sex !== null,
        render: () => (
          <ChoiceGroup>
            {(["male", "female"] as Sex[]).map((s) => (
              <ChoiceButton
                key={s}
                selected={d.sex === s}
                onClick={() => {
                  set("sex", s);
                }}
              >
                {s === "male" ? "Male" : "Female"}
              </ChoiceButton>
            ))}
          </ChoiceGroup>
        ),
      },
      {
        id: "age",
        question: "How old are you?",
        help: "This gives your starting estimate the right context.",
        isAnswered: Number(d.age) >= 16 && Number(d.age) <= 90,
        render: () => <NumberField id="asmt-age" label="Age" value={d.age} onChange={(v) => set("age", v)} suffix="years" />,
      },
      {
        id: "height",
        question: "How tall are you?",
        isAnswered: heightInches >= 48 && heightInches <= 84,
        render: () => <div className="flex gap-4"><NumberField id="asmt-ft" label="Feet" value={d.heightFt} onChange={(v) => set("heightFt", v)} /><NumberField id="asmt-in" label="Inches" value={d.heightIn} onChange={(v) => set("heightIn", v)} /></div>,
      },
      {
        id: "weight",
        question: "What do you weigh?",
        help: "Your usual recent weight is more useful than one unusually high or low day.",
        isAnswered: Number(d.weight) >= 70 && Number(d.weight) <= 600,
        render: () => <NumberField id="asmt-weight" label="Bodyweight" value={d.weight} onChange={(v) => set("weight", v)} suffix="lb" />,
      },
      {
        id: "tape_choice",
        question: "Do you have a tape measure nearby?",
        help: "Optional. A waist and neck measurement makes the body-fat estimate more useful. No tape is completely fine.",
        isAnswered: d.hasTape !== null,
        render: () => (
          <div className="space-y-3">
            <ChoiceGroup>
              <ChoiceButton
                selected={d.hasTape === true}
                onClick={() => set("hasTape", true)}
              >
                <span className="flex flex-col text-left">
                  <span className="font-semibold text-bone">Yes: I can add two quick measurements</span>
                  <span className="text-[13px] text-mute font-normal mt-0.5">Adds 1 measurement step for higher precision (11 steps total)</span>
                </span>
              </ChoiceButton>
              <ChoiceButton
                selected={d.hasTape === false}
                onClick={() => set("hasTape", false)}
              >
                <span className="flex flex-col text-left">
                  <span className="font-semibold text-bone">No tape: use my basic estimate</span>
                  <span className="text-[13px] text-mute font-normal mt-0.5">Skips straight to lifting frequency (10 steps total)</span>
                </span>
              </ChoiceButton>
            </ChoiceGroup>
            {d.hasTape === true && (
              <div
                role="status"
                aria-live="polite"
                className="mt-3 rounded-[10px] border border-cloud/40 bg-cloud/10 p-3.5 text-[14px] text-bone/90 transition-all duration-300 animate-in fade-in"
              >
                <span className="font-semibold text-cloudText">+1 step added: </span>
                Total updated from 10 to 11 steps for waist and neck measurements.
              </div>
            )}
          </div>
        ),
      },
      ...(d.hasTape ? [{
        id: "tape_measurements",
        question: "Two quick measurements",
        help: "Measure your waist at the navel and your neck just below the larynx. For women, add hip at the widest point too.",
        isAnswered: Number(d.waist) > 0 && Number(d.neck) > 0 && (d.sex === "male" || Number(d.hip) > 0),
        render: () => <div className="grid gap-5"><NumberField id="asmt-waist" label="Waist at the navel" value={d.waist} onChange={(v) => set("waist", v)} suffix="in" /><NumberField id="asmt-neck" label="Neck, just below the larynx" value={d.neck} onChange={(v) => set("neck", v)} suffix="in" />{d.sex === "female" && <NumberField id="asmt-hip" label="Hip at the widest point" value={d.hip} onChange={(v) => set("hip", v)} suffix="in" />}</div>,
      }] : []),
      {
        id: "training_days",
        question: "How many days a week do you lift?",
        help: "Count resistance-training sessions, not walks or errands.",
        isAnswered: d.trainingDays !== null,
        render: () => <ChoiceChips label="Lifting days each week" selected={d.trainingDays} onSelect={(n) => set("trainingDays", n)} options={TRAINING_DAYS.map((n) => ({ value: n, label: n === 0 ? "Not yet" : String(n) }))} />,
      },
      {
        id: "daily_steps",
        question: "About how many steps do you get on a usual day?",
        help: "A phone or watch estimate is enough. This sets a movement target you can actually keep.",
        isAnswered: Number(d.dailySteps) >= 0 && Number(d.dailySteps) <= 50000,
        render: () => <NumberField id="asmt-steps" label="Usual daily steps" value={d.dailySteps} onChange={(v) => set("dailySteps", v)} suffix="steps" />,
      },
      {
        id: "sleep",
        question: "How much do you usually sleep?",
        help: "This changes the recovery and supplement conversation.",
        isAnswered: d.sleep !== null,
        render: () => <ChoiceGroup>{SLEEP.map((option) => <ChoiceButton key={option.id} selected={d.sleep === option.id} onClick={() => set("sleep", option.id)}>{option.label}</ChoiceButton>)}</ChoiceGroup>,
      },
      {
        id: "animal_foods",
        question: "Do you eat animal foods?",
        help: "This makes the food list fit your real life instead of a generic meal plan.",
        isAnswered: d.plantBased !== null,
        render: () => <ChoiceGroup><ChoiceButton selected={d.plantBased === false} onClick={() => set("plantBased", false)}>Yes: meat, fish, eggs or dairy</ChoiceButton><ChoiceButton selected={d.plantBased === true} onClick={() => set("plantBased", true)}>No: I am plant-based</ChoiceButton></ChoiceGroup>,
      },
      {
        id: "eating_out",
        question: "How often do you eat out?",
        help: "This helps keep the food plan realistic for your actual week.",
        isAnswered: d.eatingOut !== null,
        render: () => <ChoiceGroup>{EATING_OUT.map((option) => <ChoiceButton key={option.id} selected={d.eatingOut === option.id} onClick={() => set("eatingOut", option.id)}>{option.label}</ChoiceButton>)}</ChoiceGroup>,
      },
      {
        id: "peptides",
        question: "Any peptide or GLP-1 context?",
        help: "This only changes the safety notes. We never give dosing or sourcing advice.",
        isAnswered: d.peptideContext !== null,
        render: () => <ChoiceGroup>{[["none", "No: not part of my plan"], ["considering", "Considering one"], ["prescribed_glp1", "I use a prescribed GLP-1"], ["other", "I have another peptide question"]].map(([id, label]) => <ChoiceButton key={id} selected={d.peptideContext === id} onClick={() => set("peptideContext", id as Draft["peptideContext"])}>{label}</ChoiceButton>)}</ChoiceGroup>,
      },
      ];
      return basicsCollected
        ? allSteps.filter((step) => step.id !== "age" && step.id !== "height")
        : allSteps;
    },
    [basicsCollected, d, heightInches],
  );

  // Built in the browser from the quiz answers. Never put in a URL or an event.
  const planInput: PlanInput | null =
    result &&
    d.goal &&
    d.sex &&
    d.sleep &&
    d.plantBased !== null &&
    d.eatingOut &&
    d.trainingDays !== null &&
    Number.isFinite(Number(d.dailySteps))
      ? {
          goal: d.goal,
          sex: d.sex,
          age: Number(d.age),
          phase: result.phase,
          weightLb: Number(d.weight),
          trainingDays: d.trainingDays,
          sleep: d.sleep,
          plantBased: d.plantBased,
          eatingOut: d.eatingOut,
          dailySteps: Number(d.dailySteps),
        }
      : null;

  function onFinish() {
    if (
      d.goal === null ||
      d.sex === null ||
      d.trainingDays === null
    ) {
      return;
    }

    // The quick route asks only for facts that materially change the first
    // estimate. Defaults keep the result conservative; coaching can refine it.
    const completed: Draft & {
      goal: Goal;
      sex: Sex;
      trainingDays: number;
      dailySteps: string;
      trend: WeightTrend;
      history: DietHistory;
      sleep: SleepBand;
      plantBased: boolean;
      eatingOut: EatingOutFreq;
      caloriesKnown: boolean;
    } = {
      ...d,
      goal: d.goal,
      sex: d.sex,
      trainingDays: d.trainingDays,
      trend: d.trend ?? "steady" as WeightTrend,
      history: d.history ?? "not_dieting" as DietHistory,
      sleep: d.sleep ?? "7_to_9" as SleepBand,
      plantBased: d.plantBased ?? false,
      eatingOut: d.eatingOut ?? "weekly" as EatingOutFreq,
      dailySteps: d.dailySteps || "0",
      caloriesKnown: d.caloriesKnown ?? false,
    };
    setD(completed);

    const waist = Number(completed.waist);
    const neck = Number(completed.neck);
    const hip = Number(completed.hip);
    const haveTape = waist > 0 && neck > 0 && (completed.sex === "male" || hip > 0);

    const r = assess({
      goal: completed.goal,
      sex: completed.sex,
      age: Number(completed.age),
      heightIn: heightInches,
      weightLb: Number(completed.weight),
      waistIn: haveTape ? waist : undefined,
      neckIn: haveTape ? neck : undefined,
      hipIn: haveTape && completed.sex === "female" ? hip : undefined,
      weightTrend: completed.trend,
      currentCalories:
        completed.caloriesKnown === true && Number(completed.calories) > 0
          ? Number(completed.calories)
          : null,
      dietHistory: completed.history,
      trainingDays: completed.trainingDays,
    });

    setIsCalculating(true);
    window.setTimeout(() => {
      setResult(r);
      setIsCalculating(false);
      trackClientEvent("content_interaction", {
        interaction_id: "assessment_estimate",
        interaction_type: "disclosure",
        phase: r.phase,
        confidence: r.confidence,
      });
    }, 1150);
  }

  async function unlockPlan(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setGateStatus("error");
      setGateError("Enter a valid email address.");
      trackClientEvent("form_error", {
        form_id: "assessment_gate",
        error_code: "invalid_email",
        field: "email",
      });
      return;
    }

    setGateStatus("loading");
    setGateError("");

    const res = await subscribeEmail({
      email: cleanEmail,
      name: name.trim(),
      source: "assessment",
    });

    if (res.status === "ok" || res.status === "already_subscribed") {
      setGateStatus("unlocked");
      trackClientEvent("form_submit", { form_id: "assessment_gate" });
      // The conversion. Fired only after the server accepted it, and
      // carrying no personal detail, per the parameter rules.
      trackClientEvent("lead", {
        form_id: "assessment",
        lead_type: "assessment",
        phase: result?.phase,
      });
      return;
    }

    if (res.status === "invalid_email") {
      setGateStatus("error");
      setGateError(res.message);
      trackClientEvent("form_error", {
        form_id: "assessment_gate",
        error_code: "invalid_email",
        field: "email",
      });
      return;
    }

    setGateStatus("error");
    setGateError("Something went wrong on our end. Try that again.");
    trackClientEvent("form_error", {
      form_id: "assessment_gate",
      error_code: "server_error",
      field: "form",
    });
  }

  // ---------- questions ----------
  if (!result && !started) {
    return <PhotoFirstAssessment onUseQuestions={({ age, heightFt, heightIn }, observation) => {
      setD((previous) => ({ ...previous, age, heightFt, heightIn }));
      setPhotoObservation(observation ?? null);
      setBasicsCollected(true);
      setStarted(true);
    }} />;
  }

  if (isCalculating) {
    return <section aria-live="polite" className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center text-center"><span className="h-12 w-12 animate-spin rounded-full border-[3px] border-cloud/30 border-t-cloud" /><p className="eyebrow mt-8 text-cloudText">Your starting point</p><h2 className="display mt-3 max-w-[11ch] text-[36px] leading-[0.98] text-bone">Putting your numbers together.</h2><ul className="mt-6 space-y-2 text-[15px] leading-[1.5] text-mute"><li>Finding a sensible first phase</li><li>Setting simple starting targets</li><li>Keeping the first week realistic</li></ul></section>;
  }

  if (!result) {
    return (
      <GuidedSteps
        takeover
        formId="assessment"
        steps={steps}
        finishLabel="Show my numbers"
        onFinish={onFinish}
        firstStepNote={photoObservation ? <p className="mb-5 max-w-[33ch] border-l-2 border-cloud pl-4 text-[15px] leading-[1.5] text-bone/90"><strong className="text-bone">Photo read saved.</strong> {photoObservation} Almost there.</p> : undefined}
      />
    );
  }

  const macros = split === "carb" ? result.higherCarb : result.higherFat;

  // ---------- results ----------
  return (
    <div>
      {/* The estimate. Ungated, every time. */}
      <section aria-labelledby="asmt-estimate">
        <p className="eyebrow text-cloudText">Your numbers</p>
        <h2
          id="asmt-estimate"
          className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.15]"
        >
          Where you are starting from
        </h2>

        <p className="mt-4 max-w-[32ch] text-[17px] leading-[1.5] text-bone/85">Swipe or tap a number to see what it means for your next move.</p>
        <div data-assessment-results-rail className="mt-7 -mr-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pr-6 sm:mr-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pr-0">
          <button type="button" aria-expanded={selectedStat === "bodyFat"} onClick={() => setSelectedStat(selectedStat === "bodyFat" ? null : "bodyFat")} className="min-h-[202px] min-w-[300px] snap-start rounded-[16px] border border-line bg-ink2 p-6 text-left transition hover:border-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone sm:min-h-0 sm:min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.14em] text-mute2">
              Body fat
            </span>
            <span className="display mt-3 block text-bone text-[46px] leading-none">
              {result.bodyFatPct}%
            </span>
            <span className="mt-7 block text-[14px] text-mute">Tap for what this means</span>
          </button>
          <button type="button" aria-expanded={selectedStat === "leanMass"} onClick={() => setSelectedStat(selectedStat === "leanMass" ? null : "leanMass")} className="min-h-[202px] min-w-[300px] snap-start rounded-[16px] border border-line bg-ink2 p-6 text-left transition hover:border-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone sm:min-h-0 sm:min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.14em] text-mute2">
              Lean mass
            </span>
            <span className="display mt-3 block text-bone text-[46px] leading-none">
              {result.leanMassLb} lb
            </span>
            <span className="mt-7 block text-[14px] text-mute">Tap for what this means</span>
          </button>
          <button type="button" aria-expanded={selectedStat === "targetBodyFat"} onClick={() => setSelectedStat(selectedStat === "targetBodyFat" ? null : "targetBodyFat")} className="min-h-[202px] min-w-[300px] snap-start rounded-[16px] border border-line bg-ink2 p-6 text-left transition hover:border-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone sm:min-h-0 sm:min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.14em] text-mute2">
              Target body fat
            </span>
            <span className="display mt-3 block text-bone text-[46px] leading-none">
              {result.targetBodyFatPct}%
            </span>
            <span className="mt-7 block text-[14px] text-mute">Tap for what this means</span>
          </button>
          <button type="button" aria-expanded={selectedStat === "goalWeight"} onClick={() => setSelectedStat(selectedStat === "goalWeight" ? null : "goalWeight")} className="min-h-[202px] min-w-[300px] snap-start rounded-[16px] border border-line bg-ink2 p-6 text-left transition hover:border-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone sm:min-h-0 sm:min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.14em] text-mute2">
              Goal weight
            </span>
            <span className="display mt-3 block text-bone text-[46px] leading-none">
              {result.goalWeightLowLb} to {result.goalWeightHighLb} lb
            </span>
            <span className="mt-7 block text-[14px] text-mute">Tap for what this means</span>
          </button>
        </div>

        {selectedStat && <div aria-live="polite" className="mt-3 rounded-[14px] border border-cloud/40 bg-cloud/5 p-5 text-[16px] leading-[1.55] text-bone/90">{selectedStat === "bodyFat" && "This is your current planning estimate. It helps choose whether the first phase should focus on fat loss, recomposition, or building."}{selectedStat === "leanMass" && "This is the part of your weight that is not fat. Your lifting and protein targets are designed to protect it while your goal changes."}{selectedStat === "targetBodyFat" && "This is a planning range, not a required look. It gives the timeline a realistic destination instead of chasing a random scale number."}{selectedStat === "goalWeight" && "This is a useful range, not a deadline. Your waist, strength, sleep, and weekly average tell us whether the plan is working."}</div>}

        <details className="mt-5 text-[14px] leading-[1.6] text-mute2"><summary className="cursor-pointer text-bone underline underline-offset-4">How we got these numbers</summary><p className="mt-3 max-w-[62ch]">
          {result.confidence === "measured"
            ? "Body fat is estimated with the U.S. Navy circumference method from the measurements you entered. It is a planning estimate, not a body scan."
            : "You skipped the tape measurements, so body fat here comes from a height, weight and age formula. That is the roughest of the available methods. Measuring a waist and a neck takes a minute and will change this number."}{" "}
          None of these figures are medical measurements, and no body-fat
          percentage guarantees a particular look.
        </p></details>

        {result.intakeFlag && (
          <p className="mt-5 rounded-[10px] border border-line px-4 py-4 text-[14px] leading-[1.65] text-bone/85">
            {result.intakeFlag}
          </p>
        )}

        <section className="mt-7 overflow-hidden rounded-[14px] border border-line bg-ink2 p-5" aria-label="Your planning timeline">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cloudText">Your likely first timeline</p>
          <p className="display mt-2 text-[30px] leading-[1.05] text-bone">{result.fatToLoseLb > 0 ? `${result.fatToLoseLb} lb to plan for` : "Build from here"}</p>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.55] text-bone/85">{result.fatToLoseLb > 0 ? `At a deliberately steady pace of about 0.5% to 1% of bodyweight a week, that is roughly ${Math.max(4, Math.ceil(result.fatToLoseLb / (Number(d.weight) * 0.01)))} to ${Math.max(8, Math.ceil(result.fatToLoseLb / (Number(d.weight) * 0.005)))} weeks. Your weekly average and recovery decide the real pace.` : "Your first phase is about building a reliable baseline, then reassessing with real weekly averages."}</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-line" aria-label="A visual first-phase progress forecast"><div className="h-full w-[18%] rounded-full bg-cloud motion-safe:animate-[assessment-progress_1.1s_ease-out_both]" /></div>
          <ol className="mt-5 space-y-2 text-[15px] text-bone/90"><li className="rounded-[9px] border border-line px-4 py-3"><strong className="text-bone">Week 1:</strong> set your baseline.</li><li className="rounded-[9px] border border-line px-4 py-3"><strong className="text-bone">Each week:</strong> check your average.</li><li className="rounded-[9px] border border-line px-4 py-3"><strong className="text-bone">Then:</strong> adjust one lever.</li></ol>
        </section>
        <button type="button" onClick={() => gateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} className="btn btn-primary mt-7 w-full">Build my full report <span aria-hidden="true">→</span></button>
      </section>

      <div className="hair my-10" />

      {/* The plan. Gated on a name and an email. */}
      {gateStatus !== "unlocked" ? (
        <section ref={gateRef} aria-labelledby="asmt-gate">
          <h2
            id="asmt-gate"
            className="display text-bone text-[22px] md:text-[26px] leading-[1.18]"
          >
            Want the full report built around these numbers?
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.65] text-bone/85 max-w-[58ch]">
            You have your starting point. Add your name and email to reveal the practical part: your first phase, calories and macros, food list, lifting, cardio, steps, sleep, and the rule for when to adjust.
          </p>

          <form onSubmit={unlockPlan} className="mt-7 space-y-4" noValidate>
            <div>
              <label htmlFor="asmt-name" className="block text-[14px] text-bone/85 mb-2">
                First name
              </label>
              <input
                id="asmt-name"
                type="text"
                autoComplete="given-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="apply-input w-full"
              />
            </div>
            <div>
              <label htmlFor="asmt-email" className="block text-[14px] text-bone/85 mb-2">
                Email
              </label>
              <input
                id="asmt-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (gateStatus === "error") {
                    setGateStatus("idle");
                    setGateError("");
                  }
                }}
                className={`apply-input w-full ${gateStatus === "error" ? "border-cloudText focus:border-cloudText" : ""}`}
              />
            </div>
            <button
              type="submit"
              disabled={gateStatus === "loading"}
              className="btn btn-primary w-full sm:w-auto"
            >
              {gateStatus === "loading" ? "Building it..." : "Show my first phase"}
              <span aria-hidden="true">→</span>
            </button>
            {gateStatus === "error" && (
              <p className="text-[13px] font-medium text-cloudText" role="alert">
                {gateError}
              </p>
            )}
            <p className="text-[13px] text-mute2 leading-[1.6]">
              Your plan plus Kris&apos;s weekly notes on training and
              recomposition. Unsubscribe whenever you want.
            </p>
          </form>
        </section>
      ) : (
        <section aria-labelledby="asmt-plan">
          <p className="eyebrow text-cloudText">Your first phase</p>
          <h2
            id="asmt-plan"
            className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.15]"
          >
            {result.phaseLabel}
          </h2>

          {result.guardrail && (
            <p className="mt-6 rounded-[10px] border border-cloud/40 bg-cloud/5 px-4 py-4 text-[14.5px] leading-[1.65] text-bone">
              {result.guardrail}
            </p>
          )}

          <p className="mt-6 text-[17px] md:text-[18px] leading-[1.55] text-bone font-medium max-w-[56ch]">
            {result.firstMove}
          </p>

          <div className="mt-8 rounded-[10px] border border-line p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[12px] uppercase tracking-[0.14em] text-mute2">
                Starting targets
              </p>
              <div className="flex gap-2" role="group" aria-label="Macro split">
                {(["carb", "fat"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSplit(s);
                      trackClientEvent("content_interaction", {
                        interaction_id: "assessment_macro_split",
                        interaction_type: "disclosure",
                        split: s,
                      });
                    }}
                    aria-pressed={split === s}
                    className={[
                      "rounded-full border px-3 py-1.5 text-[12.5px]",
                      split === s
                        ? "border-cloud bg-cloud/10 text-bone"
                        : "border-line text-mute hover:text-bone",
                    ].join(" ")}
                  >
                    {s === "carb" ? "More carbs" : "More fat"}
                  </button>
                ))}
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                ["Calories", `${macros.calories.toLocaleString()}`],
                ["Protein", `${macros.proteinG} g`],
                ["Carbs", `${macros.carbsG} g`],
                ["Fat", `${macros.fatG} g`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12px] uppercase tracking-[0.14em] text-mute2">
                    {k}
                  </dt>
                  <dd className="display mt-2 text-bone text-[24px]">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[13.5px] leading-[1.6] text-mute2">
              Calories and protein are the plan. Carbs and fat move around your
              preference and your schedule, and neither arrangement is
              metabolically better than the other.
            </p>
          </div>

          <div className="mt-9 space-y-7">
            <div>
              <h3 className="display text-bone text-[19px] leading-[1.2]">
                Why this phase
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
                {result.why}
              </p>
            </div>
            <div>
              <h3 className="display text-bone text-[19px] leading-[1.2]">
                Week one
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
                {result.weekOne}
              </p>
            </div>
            <div>
              <h3 className="display text-bone text-[19px] leading-[1.2]">
                What comes after
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-bone/85 max-w-[62ch]">
                {result.nextPhase}
              </p>
            </div>
          </div>

          {planInput && (
            <>
              <div className="hair my-10" />
              <PlanSections
                input={planInput}
                dailyCalories={result.higherCarb.calories}
                dailyProteinG={result.higherCarb.proteinG}
              />
            </>
          )}

          <div className="hair my-10" />

          <section>
            <h3 className="display text-bone text-[21px] md:text-[25px] leading-[1.18]">
              Want Kris running the adjustments instead of you?
            </h3>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
              The starting number is the easy part. The work is the next twelve
              weeks: reading a weekly average, knowing which of calories, steps
              or training to change, and knowing when the right call is to
              change nothing. That is what one to one coaching is.
            </p>
            {/* Plain /apply on purpose. ApplySourceTracker in the layout
                rewrites every /apply link with entry_path, entry_source and
                entry_link_kind, which is the attribution the application
                actually reads. A hand-rolled ?source= param is not read by
                anything and would have made these calls unattributable. */}
            <div
              className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              data-analytics-source="assessment_results"
            >
              <Link
                href="/apply"
                className="btn btn-primary"
                data-cta="assessment_primary"
                onClick={() =>
                  trackClientEvent("cta_click", {
                    cta_id: "assessment_to_apply",
                    cta_text: "Have Kris build the next twelve weeks",
                    cta_position: "assessment_results",
                  })
                }
              >
                Have Kris build the next twelve weeks
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/geebs-method" className="btn btn-secondary">
                How the phases work
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </section>
      )}

      <div className="hair my-10" />
      <button
        type="button"
        onClick={() => {
          setResult(null);
          setGateStatus("idle");
          setD(EMPTY);
        }}
        className="text-[13.5px] text-mute underline underline-offset-4 hover:text-bone"
      >
        Start over
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import ToolEmailCapture from "@/components/ToolEmailCapture";
import {
  buildPerfectDay,
  type DietPattern,
  type Goal,
  type PerfectDay,
  type Priority,
  FOODS,
  type Food,
} from "@/lib/perfectDay";

const RESULT_APPLY_HREF =
  "/apply?utm_source=site&utm_medium=tool&utm_campaign=perfect_day_builder&utm_content=perfect_day_result_coaching_bridge";

const GOAL_LABEL: Record<Goal, string> = {
  cut: "Lose fat",
  recomp: "Recomp (lean out, hold muscle)",
  bulk: "Build muscle",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  muscle: "Muscle and strength",
  testosterone: "Hormone-supportive eating",
  longevity: "Longevity and healthspan",
  energy: "Energy through a long workday",
};

const DIET_LABEL: Record<DietPattern, string> = {
  omnivore: "Omnivore",
  pescatarian: "Pescatarian",
  vegetarian: "Vegetarian",
};

function Stat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-2xl border border-line2 bg-ink3/40 p-4">
      <p className="eyebrow text-cloudText">{label}</p>
      <p className="mt-1.5 text-bone text-[22px] md:text-[26px] font-semibold">
        {value}
        <span className="text-[14px] text-mute ml-1">{unit}</span>
      </p>
    </div>
  );
}

function getPriorityFoods(day: PerfectDay, priority: Priority): Food[] {
  const seen = new Set<string>();
  const priorityFoods: Food[] = [];
  for (const meal of day.meals) {
    for (const item of meal.items) {
      if (!seen.has(item.foodId)) {
        seen.add(item.foodId);
        const food = FOODS.find((f) => f.id === item.foodId);
        if (food?.emphasis?.includes(priority)) {
          priorityFoods.push(food);
        }
      }
    }
  }
  return priorityFoods;
}

export default function DayBuilderForm() {
  const [weight, setWeight] = useState("190");
  const [age, setAge] = useState("30");
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState<Goal>("recomp");
  const [priority, setPriority] = useState<Priority>("muscle");
  const [diet, setDiet] = useState<DietPattern>("omnivore");
  const [meals, setMeals] = useState("3");
  const [variation, setVariation] = useState(0);
  const [day, setDay] = useState<PerfectDay | null>(null);
  const [view, setView] = useState<"form" | "loading" | "result">("form");

  function build(nextVariation: number) {
    const bodyweightLb = Number(weight);
    if (!bodyweightLb) return;
    setView("loading");
    setTimeout(() => {
      const kcal = Number(calories);
      setDay(
        buildPerfectDay({
          bodyweightLb,
          goal,
          priority,
          diet,
          mealsPerDay: Number(meals),
          calories: kcal > 0 ? kcal : undefined,
          age: Number(age) || undefined,
          variation: nextVariation,
        }),
      );
      setVariation(nextVariation);
      setView("result");
    }, 1200);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    build(0);
    trackClientEvent("calculator_completed", {
      calculator_name: "perfect_day",
      calculator_path: "/tools/perfect-day-builder",
      calculator_goal: goal,
      calculator_priority: priority,
    });
  }

  function onShuffle() {
    build(variation + 1);
    trackClientEvent("tool_variation_requested", {
      calculator_name: "perfect_day",
      calculator_path: "/tools/perfect-day-builder",
      variation: String(variation + 1),
    });
  }

  return (
    <div>
      {view === "form" && (
        <form data-form-id="builder_perfect_day" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pd-weight" className="block text-[14px] text-bone/85 mb-2">
              Bodyweight (lb)
            </label>
            <input
              id="pd-weight"
              className="apply-input"
              type="number"
              min={80}
              max={500}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pd-age" className="block text-[14px] text-bone/85 mb-2">
              Age
            </label>
            <input
              id="pd-age"
              className="apply-input"
              type="number"
              min={18}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pd-calories" className="block text-[14px] text-bone/85 mb-2">
              Daily calories (optional)
            </label>
            <input
              id="pd-calories"
              className="apply-input"
              type="number"
              min={1200}
              max={6000}
              placeholder="Leave blank to estimate"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <p className="mt-1.5 text-[12.5px] text-mute2">
              Know your number?{" "}
              <Link href="/tools/tdee-calculator" className="underline">
                Run the TDEE calculator
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pd-goal" className="block text-[14px] text-bone/85 mb-2">
              Goal
            </label>
            <select
              id="pd-goal"
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
          <div>
            <label htmlFor="pd-priority" className="block text-[14px] text-bone/85 mb-2">
              What you care about most
            </label>
            <select
              id="pd-priority"
              className="apply-input"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              {(Object.keys(PRIORITY_LABEL) as Priority[]).map((k) => (
                <option key={k} value={k}>
                  {PRIORITY_LABEL[k]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pd-diet" className="block text-[14px] text-bone/85 mb-2">
              How you eat
            </label>
            <select
              id="pd-diet"
              className="apply-input"
              value={diet}
              onChange={(e) => setDiet(e.target.value as DietPattern)}
            >
              {(Object.keys(DIET_LABEL) as DietPattern[]).map((k) => (
                <option key={k} value={k}>
                  {DIET_LABEL[k]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pd-meals" className="block text-[14px] text-bone/85 mb-2">
              Meals per day
            </label>
            <select
              id="pd-meals"
              className="apply-input"
              value={meals}
              onChange={(e) => setMeals(e.target.value)}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Build my day
          <span aria-hidden="true">→</span>
        </button>
      </form>
      )}

      {view === "loading" && (
        <div className="py-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
          <div className="w-8 h-8 border-2 border-bone/20 border-t-bone rounded-full animate-spin mb-5" />
          <h2 className="text-bone text-[20px] font-medium">Building your perfect day...</h2>
          <p className="mt-2 text-mute text-[14.5px]">Crunching macros and matching evidence-backed foods.</p>
        </div>
      )}

      {view === "result" && day && (
        <div data-testid="perfect-day-result" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Your day of eating
          </h2>
          <p className="mt-3 text-[14.5px] text-mute max-w-[60ch]">
            Raw weights, rounded to something you can actually portion. Hit
            protein and the fat floor first — the rest is flexible.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Calories" value={day.totals.calories} unit="kcal" />
            <Stat label="Protein" value={day.totals.proteinG} unit="g" />
            <Stat label="Fat" value={day.totals.fatG} unit="g" />
            <Stat label="Carbs" value={day.totals.carbG} unit="g" />
          </div>
          <p className="mt-3 text-[13px] text-mute2">
            Targets: {day.targets.calories} kcal · {day.targets.proteinG} g protein ·{" "}
            {day.targets.fatG} g fat floor · {day.targets.carbG} g carbs.
          </p>

          {getPriorityFoods(day, priority).length > 0 && (
            <div className="mt-8 rounded-2xl border border-line2 bg-ink3/25 p-5">
              <h3 className="text-bone text-[17px] font-semibold">
                Why these foods? ({PRIORITY_LABEL[priority]})
              </h3>
              <ul className="mt-3 space-y-2.5">
                {getPriorityFoods(day, priority).map((food) => (
                  <li key={food.id} className="text-[14.5px] leading-[1.65] text-mute">
                    <span className="text-bone font-medium">{food.name}:</span>{" "}
                    {food.note || `Selected for ${PRIORITY_LABEL[priority].toLowerCase()}.`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {day.supplements && day.supplements.length > 0 && (
            <div className="mt-8 rounded-2xl border border-line2 bg-ink3/25 p-5">
              <h3 className="text-bone text-[17px] font-semibold">
                Worth checking, only if it applies to you
              </h3>
              <ul className="mt-3 space-y-2.5">
                {day.supplements.map((supp) => (
                  <li key={supp.name} className="text-[14.5px] leading-[1.65] text-mute">
                    <a
                      href={supp.href}
                      className="text-bone font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      {supp.name}
                    </a>
                    : {supp.note}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-8 space-y-6">
            {day.meals.map((meal) => (
              <div
                key={meal.name}
                className="rounded-2xl border border-line2 bg-ink3/40 p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-bone text-[17px] md:text-[18px]">{meal.name}</h3>
                  <p className="text-[13px] text-mute2 whitespace-nowrap">
                    {meal.kcal} kcal · {meal.proteinG}g P
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {meal.items.map((item) => (
                    <li key={item.foodId} className="text-[15px] leading-[1.6] text-bone/85">
                      <span className="text-bone">{item.grams} g</span> {item.name}
                      <span className="text-mute2 text-[13px]">
                        {" "}
                        — {item.kcal} kcal, {item.proteinG}g P
                      </span>
                      {item.note && (
                        <span className="block text-[13px] text-mute2 mt-0.5">
                          {item.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={onShuffle} className="btn btn-primary">
              Build me a different day
              <span aria-hidden="true">→</span>
            </button>
            <button type="button" onClick={() => setView("form")} className="btn btn-secondary">
              Edit my inputs
            </button>
          </div>

          <div className="mt-8 rounded-2xl border border-line2 bg-ink3/25 p-5">
            <p className="eyebrow text-cloudText">Honest limits</p>
            <ul className="mt-3 space-y-2.5">
              {day.notes.map((note) => (
                <li key={note} className="text-[14.5px] leading-[1.65] text-mute">
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2">
              How the evidence behind these targets is graded is described in{" "}
              <Link href="/methodology" className="underline hover:text-bone">
                the coaching methodology
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <ToolEmailCapture toolName="perfect-day" />
          </div>

          <div className="mt-10">
            <div className="hair mb-8" />
            <h2 className="display text-bone text-[22px] md:text-[26px] leading-[1.1]">
              A plan is the easy part
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
              Any tool can print a day. The hard part is the Tuesday you eat out,
              the week you travel, and the month work gets loud — which is what
              coaching actually adjusts for, week over week.
            </p>
            <div className="mt-6">
              <Link href={RESULT_APPLY_HREF} className="btn btn-primary" data-cta="tool_primary">
                Turn these numbers into a plan
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

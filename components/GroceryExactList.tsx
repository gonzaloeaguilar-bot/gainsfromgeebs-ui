"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { writeApplyHandoff } from "@/lib/applyHandoff";
import {
  groceryApplyHref,
  groceryBuyFirstList,
  groceryListSummary,
  type GroceryBudget,
  type GroceryExactListAnswers,
  type GroceryGoal,
  type GroceryHousehold,
} from "@/lib/groceryExactList";

type Choice<T extends string> = { value: T; label: string; detail: string };

const HOUSEHOLDS: Choice<GroceryHousehold>[] = [
  { value: "one", label: "Just me", detail: "One person" },
  { value: "two", label: "Two people", detail: "You shop for two" },
  { value: "family", label: "3+ people", detail: "A bigger household" },
];

const GOALS: Choice<GroceryGoal>[] = [
  { value: "fat_loss", label: "Lose fat", detail: "Keep meals filling" },
  { value: "muscle_gain", label: "Build muscle", detail: "Make protein easy" },
  { value: "consistency", label: "Be consistent", detail: "Make weekdays simpler" },
];

function ChoiceButtons<T extends string>({ choices, value, onChoose }: { choices: Choice<T>[]; value: T | null; onChoose: (value: T) => void }) {
  return (
    <div className="mt-5 grid gap-2 sm:grid-cols-3" role="group">
      {choices.map((choice) => {
        const selected = value === choice.value;
        return (
          <button
            key={choice.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChoose(choice.value)}
            className={`min-h-20 rounded-[14px] border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText ${selected ? "border-cloudText bg-cloudText/10" : "border-line2 bg-bone/[.025] hover:border-bone/45"}`}
          >
            <span className="block text-[17px] font-semibold leading-tight text-bone">{choice.label}</span>
            <span className="mt-1 block text-[14px] leading-5 text-bone/70">{choice.detail}</span>
          </button>
        );
      })}
    </div>
  );
}

export function GroceryExactList({ initialBudget }: { initialBudget: GroceryBudget }) {
  const budget = initialBudget;
  const [household, setHousehold] = useState<GroceryHousehold | null>(null);
  const [goal, setGoal] = useState<GroceryGoal | null>(null);
  const started = useRef(false);
  const completedKey = useRef("");
  const resultRef = useRef<HTMLDivElement>(null);
  const complete = Boolean(budget && household && goal);
  const answers = complete ? { budget, household, goal } as GroceryExactListAnswers : null;
  const summary = answers ? groceryListSummary(answers) : "";

  function start() {
    if (started.current) return;
    started.current = true;
    trackClientEvent("grocery_list_started", { form_id: "grocery_exact_list", retailer: "costco" });
  }

  function chooseHousehold(value: GroceryHousehold) {
    start();
    setHousehold(value);
  }

  function chooseGoal(value: GroceryGoal) {
    start();
    setGoal(value);
  }

  useEffect(() => {
    if (!budget || !household || !goal) return;
    const key = `${budget}:${household}:${goal}`;
    if (completedKey.current === key) return;
    completedKey.current = key;
    writeApplyHandoff("costco_exact_list", summary);
    trackClientEvent("grocery_list_completed", {
      form_id: "grocery_exact_list",
      retailer: "costco",
      monthly_budget: budget,
      household_size: household,
      goal,
    });
    resultRef.current?.focus();
  }, [budget, household, goal, summary]);

  return (
    <section className="mt-10 border-t border-line2 pt-8" aria-labelledby="exact-list-heading" data-no-fold="true" data-analytics-source="costco_exact_list">
      <div className="max-w-[35rem]">
        <p className="eyebrow text-cloudText">Make it yours</p>
        <h2 id="exact-list-heading" className="display mt-2 text-[36px] leading-[0.98] text-bone sm:text-[42px]">Tailor the ${budget} Costco plan.</h2>
        <p className="mt-3 text-[17px] leading-[1.45] text-bone/85">Two quick choices. You&apos;ll get a buy-first shortlist that fits your household and goal before you decide whether you want Kris to finish the full plan.</p>
      </div>

      {!household ? (
        <div className="mt-6 max-w-[42rem]">
          <p className="text-[15px] text-cloudText">Budget: ${budget} a month</p>
          <h3 className="mt-1 text-[20px] font-semibold leading-tight text-bone">Who are you shopping for?</h3>
          <ChoiceButtons choices={HOUSEHOLDS} value={household} onChoose={chooseHousehold} />
        </div>
      ) : null}

      {budget && household && !goal ? (
        <div className="mt-6 max-w-[42rem]">
          <p className="text-[15px] text-cloudText">${budget} a month for {household === "one" ? "one" : household === "two" ? "two" : "3+"} people</p>
          <h3 className="mt-1 text-[20px] font-semibold leading-tight text-bone">What would make food easier right now?</h3>
          <ChoiceButtons choices={GOALS} value={goal} onChoose={chooseGoal} />
          <button type="button" className="mt-5 text-[15px] font-semibold text-bone/75 underline underline-offset-4" onClick={() => setHousehold(null)}>Change household size</button>
        </div>
      ) : null}

      {answers ? (
        <div ref={resultRef} tabIndex={-1} className="mt-6 max-w-[42rem] border-l-2 border-cloudText pl-5 focus:outline-none">
          <p className="eyebrow text-cloudText">Your starting point</p>
          <p className="display mt-2 text-[25px] leading-[1.05] text-bone">Start with the {answers.budget === "200" ? "$200 protein-first plan" : answers.budget === "300" ? "$300 variety plan" : "$500 convenience plan"}.</p>
          <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.48] text-bone/85">{summary}</p>
          <div className="mt-5 border-y border-line2 py-4">
            <p className="font-semibold text-bone">This week, buy these first</p>
            <ul className="mt-3 grid gap-2 text-[16px] leading-6 text-bone/85 sm:grid-cols-2">
              {groceryBuyFirstList(answers).map(({ item, detail }) => <li key={item}><span className="font-semibold text-bone">{item}</span><span className="block text-[14px] leading-5 text-bone/70">{detail}</span></li>)}
            </ul>
          </div>
          <Link
            href={groceryApplyHref()}
            onClick={() => trackClientEvent("grocery_list_apply_click", { form_id: "grocery_exact_list", retailer: "costco", monthly_budget: answers.budget, household_size: answers.household, goal: answers.goal })}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-cloudText px-5 text-[16px] font-semibold text-void transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText"
            data-analytics-link-kind="apply"
            data-cta="costco_exact_list"
          >
            Have Kris finish my Costco list
          </Link>
          <p className="mt-3 text-[14px] leading-5 text-mute">You&apos;ll answer a few coaching questions next. No payment is required to apply.</p>
          <button type="button" className="mt-4 text-[15px] font-semibold text-bone/75 underline underline-offset-4" onClick={() => { completedKey.current = ""; setHousehold(null); setGoal(null); }}>Start over</button>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChoiceChips } from "@/components/GuidedSteps";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  buildPlan,
  eatingOutIntro,
  eatingOutPicks,
  placeTypesWithFits,
  type PlaceType,
  type PlanInput,
} from "./plan";

/*
 * "Your plan" under the estimate. Everything here is derived in the browser
 * from the quiz answers. Nothing is written to the URL, and the analytics
 * events below carry no answer: only that a section was seen or opened.
 */

const H3 = "display text-bone text-[19px] leading-[1.2]";
const BODY = "mt-3 text-[15.5px] leading-[1.7] text-bone/85 max-w-[62ch]";

export default function PlanSections({
  input,
  dailyCalories,
  dailyProteinG,
}: {
  input: PlanInput;
  dailyCalories: number;
  dailyProteinG: number;
}) {
  const plan = useMemo(
    () => buildPlan(input, dailyCalories, dailyProteinG),
    [input, dailyCalories, dailyProteinG],
  );
  const places = useMemo(() => placeTypesWithFits(plan.budget), [plan.budget]);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const picks = useMemo(
    () => (place ? eatingOutPicks(place, plan.budget) : []),
    [place, plan.budget],
  );
  const weeklyFoodCards = input.plantBased
    ? [
        { name: "Tofu or tempeh", amount: "4 to 6 portions", why: "A repeatable protein base for lunches and dinners." },
        { name: "Beans and lentils", amount: "5 to 7 cups cooked", why: "Protein, fiber and magnesium from real food." },
        { name: "Fortified soy yogurt", amount: "5 to 7 servings", why: "An easy breakfast or snack anchor." },
      ]
    : [
        { name: "Chicken or turkey", amount: `${Math.max(4, Math.ceil(dailyProteinG / 110))} portions`, why: "Lean, easy protein for the meals you repeat." },
        { name: "Salmon or sardines", amount: "2 to 3 meals", why: "Food-first omega-3 coverage across the week." },
        { name: "Greek yogurt or eggs", amount: "5 to 7 servings", why: "A simple protein option when cooking is not happening." },
      ];

  const seen = useRef(false);
  useEffect(() => {
    if (seen.current) return;
    seen.current = true;
    trackClientEvent("section_view", { section_id: "assessment_your_plan" });
  }, []);

  return (
    <section aria-labelledby="asmt-your-plan">
      <p className="eyebrow text-cloudText">Built from your answers</p>
      <h2
        id="asmt-your-plan"
        className="display mt-3 text-bone text-[24px] md:text-[30px] leading-[1.15]"
      >
        Your plan
      </h2>

      <p className="mt-3 max-w-[35ch] text-[16px] leading-[1.5] text-bone/85">
        Start with these three things. Everything else is here when you want it.
      </p>

      <div className="mt-6 space-y-7">
        <div>
          <h3 className={H3}>Your three priorities</h3>
          <ol className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 -mr-6 pr-6 sm:mr-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pr-0">
            {plan.longevity.slice(0, 3).map((p, index) => (
              <li key={p.id} className="min-w-[248px] snap-start rounded-[12px] border border-line bg-ink2 p-4 sm:min-w-0">
                <span className="text-[12px] font-semibold tracking-[0.14em] text-cloudText">0{index + 1}</span>
                <strong className="mt-2 block text-[17px] leading-[1.25] text-bone">{p.title}</strong>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-bone/80">{p.line}</p>
              </li>
            ))}
          </ol>
          <details
            className="mt-4"
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open) {
                trackClientEvent("item_click", {
                  item_id: "assessment_longevity_more",
                  list_name: "assessment_your_plan",
                });
              }
            }}
          >
            <summary className="cursor-pointer min-h-[44px] py-3 text-[14.5px] text-mute underline underline-offset-4">
              The other two
            </summary>
            <ol className="mt-2 space-y-4">
              {plan.longevity.slice(3).map((p) => (
                <li
                  key={p.id}
                  className="text-[15.5px] leading-[1.7] text-bone/85"
                >
                  <strong className="text-bone">{p.title}.</strong> {p.line}
                </li>
              ))}
            </ol>
          </details>
        </div>

        <div>
          <h3 className={H3}>Protein and staples</h3>
          <div className="mt-4 rounded-[12px] border border-line bg-ink2 p-5">
            <p className="text-[13px] uppercase tracking-[0.12em] text-mute">Aim per meal</p>
            <p className="display mt-1 text-[34px] leading-none text-bone">{plan.foods.proteinPerMealG} g</p>
            <p className="mt-2 text-[14.5px] leading-[1.5] text-bone/80">Across {plan.foods.mealsPerDay} meals. {plan.foods.perMealRange}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {plan.foods.staples.map((f) => (
              <li
                key={f}
                className="rounded-[10px] border border-line px-3 py-2 text-[14px] text-bone/85"
              >
                {f}
              </li>
            ))}
          </ul>
          <details className="mt-3">
            <summary className="cursor-pointer min-h-[44px] py-3 text-[14.5px] text-mute underline underline-offset-4">Why this is your starting target</summary>
            <p className="pb-2 text-[14.5px] leading-[1.6] text-bone/85">{plan.foods.note}</p>
          </details>
        </div>

        <div>
          <h3 className={H3}>Your simple food week</h3>
          <p className={BODY}>These are starting quantities, not a diagnosis or a rigid menu. Swipe, pick the foods you like, and open a card only when you want the why.</p>
          <ol className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 -mr-6 pr-6 sm:mr-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pr-0">
            {weeklyFoodCards.map((food, index) => <li key={food.name} className="min-h-[194px] min-w-[246px] snap-start rounded-[14px] border border-line bg-gradient-to-br from-ink2 to-[#291414] p-5 sm:min-w-0"><span className="text-[12px] font-semibold tracking-[0.14em] text-cloudText">BUY {index + 1}</span><strong className="mt-5 block text-[22px] leading-[1.05] text-bone">{food.name}</strong><p className="mt-3 text-[18px] font-semibold text-bone">{food.amount}</p><p className="mt-3 text-[14px] leading-[1.5] text-bone/80">{food.why}</p></li>)}
          </ol>
          <details className="mt-3"><summary className="cursor-pointer min-h-[44px] py-3 text-[14.5px] text-mute underline underline-offset-4">How to turn this into meals</summary><p className="pb-2 text-[14.5px] leading-[1.6] text-bone/85">Build two or three repeatable meals: a protein from this list, vegetables or fruit, then a starch around lifting if it helps you train. The target is the protein per meal above; food preference decides the exact recipe.</p></details>
        </div>

        <div>
          <h3 className={H3}>Nutrients worth a look</h3>
          <p className={BODY}>
            Food first. Open any one for the detail.
          </p>
          <div className="mt-4 space-y-3">
            {plan.micro.map((n) => (
              <details
                key={n.id}
                className="rounded-[10px] border border-line px-4"
                onToggle={(e) => {
                  if ((e.currentTarget as HTMLDetailsElement).open) {
                    trackClientEvent("item_click", {
                      item_id: `assessment_nutrient_${n.id}`,
                      list_name: "assessment_your_plan",
                    });
                  }
                }}
              >
                <summary className="cursor-pointer min-h-[48px] py-3 text-[15.5px] text-bone">
                  {n.name}
                </summary>
                <div className="pb-4 text-[15px] leading-[1.7] text-bone/85">
                  <p>{n.why}</p>
                  <p className="mt-2">
                    <strong className="text-bone">Food.</strong> {n.food}
                  </p>
                  {n.supplement && (
                    <p className="mt-2">
                      <strong className="text-bone">Backup.</strong>{" "}
                      {n.supplement}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2">
            {plan.disclaimer}
          </p>
        </div>

        <div>
          <h3 className={H3}>Eating out</h3>
          <p className={BODY}>
            {eatingOutIntro(input.eatingOut)} Each meal is about{" "}
            {plan.budget.calories} calories and {plan.budget.proteinG} g of
            protein. Pick a place and see orders that fit.
          </p>
          <div className="mt-4">
            <ChoiceChips
              label="Where are you eating"
              selected={place}
              onSelect={(v) => {
                setPlace(v);
                trackClientEvent("item_click", {
                  item_id: "assessment_eating_out_place",
                  list_name: "assessment_your_plan",
                });
              }}
              options={places.map((p) => ({ value: p.id, label: p.label }))}
            />
          </div>
          {place && picks.length === 0 && (
            <p className={BODY}>
              Nothing from that group fits one meal of your budget. Try another
              group.
            </p>
          )}
          {picks.length > 0 && (
            <ul className="mt-5 space-y-3">
              {picks.map((p) => (
                <li
                  key={p.slug}
                  className="rounded-[10px] border border-line px-4 py-4"
                >
                  <p className="text-[15.5px] text-bone">
                    <strong>{p.chain}:</strong> {p.order}
                  </p>
                  <p className="mt-1 text-[14.5px] text-bone/85">
                    {p.calories} cal, {p.protein} g protein, {p.carbs} g carbs,{" "}
                    {p.fat} g fat
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-mute2">
                    {p.watch}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

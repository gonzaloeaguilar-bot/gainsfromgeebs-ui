"use client";

import { useEffect, useRef, useState } from "react";
import RailList from "@/vendor/rail-kit/RailList";
import type { GroceryItem, RetailerGuide } from "@/data/retailShoppingGuides";
import { GroceryExactList } from "@/components/GroceryExactList";

const CATEGORY_LABEL: Record<GroceryItem["category"], string> = {
  meat: "Lean protein",
  poultry: "Lean protein",
  produce: "Fruit + veg",
  fruit: "Fruit",
  vegetables: "Vegetables",
  complex_carbs: "Complex carbs",
  staples_convenience: "Yogurt + milk",
};

function shortPlanName(name: string) {
  const [budget, focus] = name.split(":", 2);
  return { budget, focus: focus?.trim().replace(/^the\s+/i, "") ?? "Your Costco list" };
}

export function GroceryBudgetCart({ guide }: { guide: RetailerGuide }) {
  const [openPlan, setOpenPlan] = useState<string | null>(null);
  const [tailorBudget, setTailorBudget] = useState<"200" | "300" | "500" | null>(null);
  const tailorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!tailorBudget) return;
    window.requestAnimationFrame(() => {
      tailorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      tailorRef.current?.focus({ preventScroll: true });
    });
  }, [tailorBudget]);

  if (!guide.starterCart) return null;

  const picks = guide.starterCart.itemNames
    .map((name) => guide.items.find((item) => item.name === name))
    .filter((item): item is GroceryItem => Boolean(item));
  const upgradeByName = new Map(guide.starterCart.upgrades?.map((upgrade) => [upgrade.name, upgrade]));

  return (
    <section className="mt-8" aria-labelledby="budget-cart-heading" data-no-fold="true">
      <div className="max-w-[35rem]">
        <p className="eyebrow text-cloudText">Start with your budget</p>
        <h2 id="budget-cart-heading" className="display mt-2 text-[36px] leading-[0.98] text-bone sm:text-[42px]">What can you spend at Costco each month?</h2>
        <p className="mt-3 text-[17px] leading-[1.45] text-bone/85">Pick one budget. Open it. Buy that list before you add anything else.</p>
      </div>

      {guide.starterCart.plans?.length ? (
        <div className="mt-6 space-y-3" aria-label="Choose your Costco shopping plan">
          {guide.starterCart.plans.map((plan, index) => {
            const selectedItems = plan.itemNames
              .map((name) => guide.items.find((item) => item.name === name))
              .filter((item): item is GroceryItem => Boolean(item));
            const extraItems = plan.items.length
              ? plan.items
              : plan.itemNames.flatMap((name) => {
                  const upgrade = upgradeByName.get(name);
                  return upgrade ? [{ name: upgrade.name, price: upgrade.price, reason: upgrade.reason, sourceUrl: upgrade.sourceUrl }] : [];
                });
            const label = shortPlanName(plan.name);
            const isOpen = openPlan === plan.name;

            return (
              <details
                key={plan.name}
                className="assessment-plan-card overflow-hidden rounded-[14px] border border-line2 bg-bone/[.025] open:border-cloudText/50"
                open={isOpen}
                onToggle={(event) => {
                  const isNowOpen = event.currentTarget.open;
                  setOpenPlan((current) => (isNowOpen ? plan.name : current === plan.name ? null : current));
                }}
              >
                <summary>
                  <span className="min-w-0">
                    <span className="display block text-[25px] leading-none text-bone">{label.budget}</span>
                    <span className="mt-1 block text-[15px] leading-5 text-bone/75">{label.focus}</span>
                  </span>
                  <span className="grocery-choice-control">{isOpen ? "Close" : "Open"}</span>
                </summary>

                <div className="border-t border-line2 px-4 pb-5 pt-4 sm:px-5">
                  <p className="display text-[24px] leading-none text-bone">Your list: {plan.total}</p>
                  <p className="mt-2 max-w-[48ch] text-[16px] leading-[1.45] text-bone/80">{plan.forWho}</p>
                  <RailList
                    className="grocery-guide-plain-list mt-4"
                    source={`costco-monthly-plan-${index + 1}`}
                    items={[
                      ...selectedItems.map((item) => ({ id: item.name, title: item.name, description: item.practicalNotes, value: item.priceEstimate })),
                      ...extraItems.map((item) => ({ id: item.name, title: item.name, description: item.reason, value: item.price })),
                    ]}
                  />
                  {guide.slug === "costco" ? (
                    <button
                      type="button"
                      className="mt-4 text-[15px] font-semibold text-cloudText underline underline-offset-4"
                      onClick={() => setTailorBudget(label.budget.replace("$", "").replace("/month", "") as "200" | "300" | "500")}
                    >
                      Tailor this list to me
                    </button>
                  ) : null}
                  <p className="mt-4 text-[14px] leading-5 text-mute">{plan.note}</p>
                </div>
              </details>
            );
          })}
        </div>
      ) : (
        <RailList
          className="grocery-guide-plain-list mt-5"
          source="grocery-starter-cart"
          items={picks.map((item) => ({ id: item.name, title: item.name, description: CATEGORY_LABEL[item.category], value: item.priceEstimate }))}
        />
      )}

      {guide.starterCart.plans?.length ? (
        <details className="mt-6 border-t border-line2 pt-4">
          <summary className="cursor-pointer list-none text-[17px] font-semibold text-bone">Save more at Costco</summary>
          <div className="mt-4 grid gap-5 text-[16px] leading-[1.45] text-bone/80 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-bone">Baking potatoes — $6.69 for 10 lb</p>
              <p className="mt-1">Bake, microwave, or roast them beside chicken. Buy rice only if you have the storage and will cook it.</p>
            </div>
            <div>
              <p className="font-semibold text-bone">Frozen blueberries cost less per pound.</p>
              <p className="mt-1">Fresh: $8.84 for 18 oz. Frozen: $10.88 for 3 lb. Fresh is for this week; frozen wins when you will use the bag.</p>
            </div>
          </div>
        </details>
      ) : null}

      {guide.slug === "costco" && tailorBudget ? <div ref={tailorRef} tabIndex={-1} className="outline-none"><GroceryExactList key={tailorBudget} initialBudget={tailorBudget} /></div> : null}

      {!guide.starterCart.plans?.length && guide.starterCart.upgrades?.length ? (
        <details className="mt-5 border-t border-line2 pt-4">
          <summary className="cursor-pointer font-semibold text-bone">Have more budget?</summary>
          <RailList
            className="grocery-guide-plain-list mt-3"
            source="grocery-starter-upgrades"
            items={guide.starterCart.upgrades.map((upgrade) => ({ id: upgrade.name, title: upgrade.name, description: upgrade.reason, value: upgrade.price, href: upgrade.sourceUrl, chevron: true }))}
          />
        </details>
      ) : null}

      <details className="mt-5 text-xs leading-5 text-mute">
        <summary className="cursor-pointer font-semibold text-bone/80">Why this is an estimate</summary>
        <p className="mt-2">{guide.starterCart.note}</p>
      </details>
    </section>
  );
}

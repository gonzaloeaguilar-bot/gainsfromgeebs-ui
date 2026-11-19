"use client";

import Image from "next/image";
import { useState } from "react";
import RailList from "@/vendor/rail-kit/RailList";
import type { GroceryItem, RetailerGuide } from "@/data/retailShoppingGuides";

type Category = GroceryItem["category"];

const AISLES: Array<{ category: Category; label: string; eyebrow: string; description: string; quantity: string; image: string }> = [
  { category: "meat", label: "Beef + pork", eyebrow: "Lean meat", description: "A straightforward protein option when you want something other than chicken.", quantity: "Buy enough for 2–3 meals.", image: "/images/grocery-guides/aisles/lean-meat-picks.webp" },
  { category: "poultry", label: "Chicken", eyebrow: "Chicken aisle", description: "The repeatable, freezer-friendly protein base.", quantity: "Buy one pack; portion what you will not use in 3 days.", image: "/images/grocery-guides/aisles/chicken-picks.webp" },
  { category: "fruit", label: "Fruit", eyebrow: "Fruit aisle", description: "Buy fresh for this week; buy frozen when you want it to last.", quantity: "Buy one use-now fruit and one freezer-friendly option.", image: "/images/grocery-guides/aisles/fruit-picks.webp" },
  { category: "vegetables", label: "Vegetables", eyebrow: "Vegetable aisle", description: "Fresh for the next few days, frozen for the rest of the week.", quantity: "Buy one fresh choice and one frozen backup.", image: "/images/grocery-guides/aisles/produce-picks.webp" },
  { category: "complex_carbs", label: "Potatoes + rice", eyebrow: "Complex carbs", description: "The simple meal base that makes protein and vegetables into an actual dinner.", quantity: "Buy one carb you will cook, not every carb in the aisle.", image: "/images/grocery-guides/aisles/complex-carb-picks.webp" },
  { category: "produce", label: "Fruit + veg", eyebrow: "Produce", description: "Fresh for the next few days, frozen for the rest of the week.", quantity: "Buy one fresh choice and one frozen backup.", image: "/images/grocery-guides/aisles/produce-picks.webp" },
  { category: "staples_convenience", label: "Yogurt + easy meals", eyebrow: "Dairy + easy meals", description: "No-cook or fast options for the day cooking falls apart.", quantity: "Buy one grab-and-go backup for the week.", image: "/images/grocery-guides/aisles/easy-protein-picks.webp" },
];

export function GroceryGuideAisleCards({ guide }: { guide: RetailerGuide }) {
  const [openAisle, setOpenAisle] = useState<Category | null>(null);
  const guideCopy: Record<Category, string | undefined> = {
    meat: guide.meatGuide,
    poultry: guide.chickenGuide,
    fruit: guide.produceGuide,
    vegetables: guide.produceGuide,
    complex_carbs: "Potatoes, sweet potatoes, and rice are useful meal carbs. Pick the one you will actually prep and portion.",
    produce: guide.produceGuide,
    staples_convenience: guide.staplesGuide,
  };

  return (
    <section className="mt-10" aria-labelledby="aisle-picker-heading" data-no-fold="true">
      <div className="max-w-[35rem]">
        <p className="eyebrow text-cloudText">Shop by aisle</p>
        <h2 id="aisle-picker-heading" className="display mt-2 text-[36px] leading-[0.98] text-bone sm:text-[42px]">Open the aisle you&apos;re standing in.</h2>
        <p className="mt-3 text-[17px] leading-[1.45] text-bone/85">One aisle at a time. The food, the price, and the simple reason to buy it.</p>
      </div>

      <div className="mt-6 space-y-3">
        {AISLES.map((aisle) => {
          const picks = guide.items.filter((item) => item.category === aisle.category);
          if (!picks.length) return null;
          const isOpen = openAisle === aisle.category;

          return (
            <details
              key={aisle.category}
              className="assessment-plan-card overflow-hidden rounded-[14px] border border-line2 bg-bone/[.025] open:border-cloudText/50"
              open={isOpen}
              onToggle={(event) => {
                const isNowOpen = event.currentTarget.open;
                setOpenAisle((current) => (isNowOpen ? aisle.category : current === aisle.category ? null : current));
              }}
            >
              <summary>
                <span className="min-w-0">
                  <span className="eyebrow block text-cloudText">{aisle.eyebrow}</span>
                  <span className="display mt-1 block text-[25px] leading-none text-bone">{aisle.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="grocery-choice-control">{isOpen ? "Close" : "Open"}</span>
                  <span className="relative block h-[58px] w-[78px] overflow-hidden rounded-[9px] bg-line2 sm:h-[62px] sm:w-[96px]" aria-hidden="true">
                    <Image src={aisle.image} alt="" fill sizes="86px" className="object-cover" />
                  </span>
                </span>
              </summary>

              <div className="border-t border-line2 px-4 pb-5 pt-4 sm:px-5">
                <p className="text-[16px] leading-[1.45] text-bone/80">{guideCopy[aisle.category] ?? aisle.description}</p>
                <p className="mt-3 text-[15px] leading-5 text-bone/80"><span className="font-semibold text-bone">How much:</span> {aisle.quantity}</p>
                <RailList
                  className="grocery-guide-plain-list mt-4"
                  source={`grocery-aisle-${aisle.category}`}
                  items={picks.map((item) => ({ id: item.name, title: item.name, description: item.practicalNotes, value: item.priceEstimate }))}
                />
                <ul className="mt-4 space-y-2 border-t border-line2 pt-4 text-[14px] leading-5 text-mute">
                  {picks.map((item) => <li key={item.name}><span className="font-semibold text-bone/80">Swap for {item.name}:</span> {item.substitute}</li>)}
                </ul>
              </div>
            </details>
          );
        })}
      </div>

      <details className="mt-6 border-t border-line2 pt-4 text-sm">
        <summary className="cursor-pointer font-semibold text-bone">Price note and source details</summary>
        <div className="mt-3 space-y-2 text-xs leading-relaxed text-bone/75">
          <p><strong>Checked:</strong> {guide.localStoreLocation} on {guide.localSnapshotDate}.</p>
          <p>{guide.caveatNotes}</p>
        </div>
      </details>
    </section>
  );
}

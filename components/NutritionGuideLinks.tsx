import Link from "next/link";
import { nutritionGuides } from "@/data/nutritionGuides";

export default function NutritionGuideLinks() {
  return (
    <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {nutritionGuides.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className="rounded-lg border border-line2 px-4 py-3 text-[14px] leading-snug text-bone hover:border-bone/35"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

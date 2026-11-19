import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";
const nutritionFactsSource = "https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label";

export const metadata: Metadata = {
  title: "Road Trip Food Guide: Eat Well When You Stop | Geebs",
  description: "A practical road-trip eating guide: use the package label, make a protein-first stop, and return to your regular meals without turning the drive into an all-day food spiral.",
  alternates: { canonical: `${SITE_URL}/resources/road-trip-food-guide` },
};

export default function RoadTripFoodGuidePage() {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: "Road trip food guide", mainEntityOfPage: `${SITE_URL}/resources/road-trip-food-guide`, dateModified: "2026-10-28", author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo" } };

  return <main className="mx-auto max-w-[980px] px-6 pb-24 pt-14 md:px-10 md:pt-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <p className="eyebrow text-cloudText">Road-trip food guide</p>
    <h1 className="display mt-3 max-w-[13ch] text-[42px] leading-[.98] text-bone md:text-[68px]">A road trip needs a next meal, not a perfect food day.</h1>
    <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-bone/85">When the realistic stop is a gas station or drive-through, make the next choice clear: begin with a labeled protein option, add a produce or fiber choice when it is available, and keep the rest of the stop intentional.</p>

    <section className="mt-10 rounded-2xl border border-cloudText/35 bg-cloudText/[0.07] p-6">
      <p className="eyebrow text-cloudText">The five-minute stop</p>
      <h2 className="display mt-2 text-3xl text-bone">Read the serving size before you decide what the package means.</h2>
      <p className="mt-4 max-w-[64ch] leading-7 text-bone/85">The Nutrition Facts panel applies to one serving, not automatically the whole package. Compare the protein, fiber, saturated fat, sodium and added sugar on the exact item in your hand. The Food and Drug Administration&apos;s label guide explains how serving size and daily values work.</p>
      <a className="btn btn-primary mt-6 inline-flex" href={nutritionFactsSource} target="_blank" rel="noreferrer">Read the FDA label guide</a>
    </section>

    <section className="mt-14 grid gap-8 border-t border-line2 pt-8 md:grid-cols-2">
      <div><p className="eyebrow text-cloudText">If you need a meal</p><h2 className="display mt-3 text-3xl text-bone">Build the stop in that order.</h2><p className="mt-4 leading-7 text-bone/85">Pick the clearest protein option first. Then decide if you need a fruit, vegetable, bean or other fiber choice. If a full meal makes sense, choose it deliberately instead of stacking snacks, candy, chips and a sweet drink at the register.</p></div>
      <div><p className="eyebrow text-cloudText">If the next stop is soon</p><h2 className="display mt-3 text-3xl text-bone">Buy a bridge, not a buffet.</h2><p className="mt-4 leading-7 text-bone/85">A clearly labeled protein snack and water can carry you to a normal meal. That is not a rule to skip food; it is a way to avoid making a rushed stop do more work than it needs to.</p></div>
    </section>

    <section className="mt-14 border-t border-line2 pt-8"><p className="eyebrow text-cloudText">Use the guide that matches the stop</p><h2 className="display mt-3 text-3xl text-bone">A logo alone does not make the nutrition predictable.</h2><p className="mt-4 max-w-[64ch] leading-7 text-bone/85">Menus, package sizes and inventory change by store and location. Use the convenience-store guide for a checked Circle K and Holiday example, or the fast-food library for a currently checked restaurant order. For allergies, medical conditions or a strict target, use the current label or restaurant source and your clinician&apos;s guidance.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-3"><Link href="/resources/convenience-store-protein-guide" className="inline-flex text-cloudText underline underline-offset-4">Open the convenience-store guide</Link><Link href="/resources/fast-food" className="inline-flex text-cloudText underline underline-offset-4">Open restaurant guides</Link></div></section>

    <section className="mt-14 border-t border-line2 pt-8"><p className="eyebrow text-cloudText">The point</p><h2 className="display mt-3 text-3xl text-bone">The next normal meal is always available.</h2><p className="mt-4 max-w-[64ch] leading-7 text-bone/85">Long drives change timing. They do not require a punishment meal, a fast or an attempt to compensate later. Make one useful stop, then return to your normal meal rhythm when you can.</p><Link href="/resources/eating-on-the-go" className="mt-6 inline-flex text-cloudText underline underline-offset-4">Open the travel eating hub</Link></section>
  </main>;
}

import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";
const paths = [
  { title: "Fast-food stops", body: "Choose a repeatable protein-first order when the drive-through is the realistic option.", href: "/resources/fast-food", label: "Open restaurant guides" },
  { title: "Airport days", body: "Use the current terminal directory, then make one protein-forward choice that fits your gate and boarding time.", href: "/resources/den-airport-food-guide", label: "Open the airport guide" },
  { title: "Road trips", body: "Use a simple default: choose a labeled protein anchor, add a produce or fiber choice when available, drink water, then decide whether you need a full meal.", href: "/resources/road-trip-food-guide", label: "Open the road-trip guide" },
  { title: "Convenience stores", body: "7-Eleven, gas stations and travel centers need their own source-checked guides because packaged options change by location and season.", href: "/resources/convenience-store-protein-guide", label: "Open the convenience-store guide" },
];

export const metadata: Metadata = {
  title: "Eating Healthy While Traveling: Airport, Road Trip & Fast-Food Guide | Geebs",
  description: "Practical travel-eating guidance for airports, road trips, convenience stores and fast-food stops. Built around repeatable choices, not perfection.",
  alternates: { canonical: `${SITE_URL}/resources/eating-on-the-go` },
};

export default function EatingOnTheGoPage() {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: "Eating healthy while traveling", mainEntityOfPage: `${SITE_URL}/resources/eating-on-the-go`, author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo" }, dateModified: "2026-10-28" };
  return <main className="mx-auto max-w-[1080px] px-6 pb-24 pt-14 md:px-10 md:pt-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <p className="eyebrow text-cloudText">Travel eating guide</p>
    <h1 className="display mt-3 max-w-[13ch] text-[42px] leading-[.98] text-bone md:text-[68px]">Travel changes the options. It does not have to end the plan.</h1>
    <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-bone/85">Use the best realistic choice where you are: an airport terminal, a road-trip stop, a convenience store or a fast-food counter. Start with protein, read the complete order, and return to your normal next meal.</p>
    <section className="mt-10 rounded-2xl border border-cloudText/35 bg-cloudText/[0.07] p-6"><p className="eyebrow text-cloudText">The travel rule</p><h2 className="display mt-2 text-3xl text-bone">Make one useful decision. Do not turn one meal into a verdict.</h2><p className="mt-4 max-w-[64ch] leading-7 text-bone/85">A strict target, allergy or medical condition needs the restaurant&apos;s current source and your clinician&apos;s advice. These guides are general coaching education, not individualized medical nutrition care.</p></section>
    <section className="mt-14" aria-label="Travel eating paths"><div className="grid gap-4 md:grid-cols-2">{paths.map((path) => <article className="rounded-2xl border border-line2 bg-bone/[.025] p-6" key={path.title}><h2 className="display text-3xl text-bone">{path.title}</h2><p className="mt-4 min-h-[72px] leading-7 text-bone/80">{path.body}</p><Link className="mt-6 inline-flex text-cloudText underline underline-offset-4" href={path.href}>{path.label}</Link></article>)}</div></section>
    <section className="mt-14 border-t border-line2 pt-8"><p className="eyebrow text-cloudText">How these guides are built</p><h2 className="display mt-3 text-3xl text-bone">Menu source first. Kris&apos;s decision rule second.</h2><p className="mt-4 max-w-[64ch] leading-7 text-bone/85">A chain, terminal or store does not get a numeric recommendation until its current official information is checked. That keeps a changing menu from becoming a confident-looking but wrong promise.</p></section>
  </main>;
}

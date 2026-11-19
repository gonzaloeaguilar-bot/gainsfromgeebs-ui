import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedFastFoodGuides } from "@/data/fastFoodGuide";

const SITE_URL = "https://gainsfromgeebs.com";

export function generateStaticParams() {
  return publishedFastFoodGuides.map(({ slug }) => ({ chain: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chain: string }> }): Promise<Metadata> {
  const { chain } = await params;
  const guide = publishedFastFoodGuides.find((item) => item.slug === chain);
  if (!guide) return {};
  const title = `Best High-Protein Order at ${guide.chain} | Geebs`;
  return {
    title,
    description: `A repeatable ${guide.chain} order with published calories, protein, carbs and fat, plus the tradeoff to watch.`,
    alternates: { canonical: `${SITE_URL}/resources/fast-food/${guide.slug}` },
  };
}

export default async function FastFoodChainPage({ params }: { params: Promise<{ chain: string }> }) {
  const { chain } = await params;
  const guide = publishedFastFoodGuides.find((item) => item.slug === chain);
  if (!guide) notFound();
  const url = `${SITE_URL}/resources/fast-food/${guide.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Best high-protein order at ${guide.chain}`,
    mainEntityOfPage: url,
    dateModified: "2026-10-28",
    author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo" },
    publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  };
  return <main className="mx-auto max-w-[980px] px-6 pb-20 pt-14 md:px-10 md:pt-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <nav aria-label="Breadcrumb" className="text-sm text-mute"><Link href="/resources">Resources</Link> <span aria-hidden="true">/</span> <Link href="/resources/high-protein-fast-food-guide">Fast-food guide</Link></nav>
    <p className="eyebrow mt-8 text-cloudText">{guide.chain}</p>
    <h1 className="display mt-3 max-w-[14ch] text-[38px] leading-[1.03] text-bone md:text-[62px]">Order this at {guide.chain} when protein is the priority.</h1>
    <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.65] text-bone/85">The repeatable order: <strong>{guide.order}</strong>. These are the chain&apos;s standard U.S. menu numbers, not a promise about what any one meal will do for your body.</p>
    <section className="mt-10 grid gap-3 rounded-2xl border border-cloudText/35 bg-cloudText/[0.07] p-5 sm:grid-cols-4" aria-label="Published nutrition">
      {[["Calories", guide.calories], ["Protein", `${guide.protein}g`], ["Carbs", `${guide.carbs}g`], ["Fat", `${guide.fat}g`]].map(([label, value]) => <div key={String(label)}><p className="eyebrow text-cloudText">{label}</p><p className="display mt-2 text-3xl text-bone">{value}</p></div>)}
    </section>
    <section className="mt-12 grid gap-8 border-t border-line2 pt-8 md:grid-cols-2"><div><p className="eyebrow text-cloudText">How to order it</p><h2 className="display mt-3 text-3xl text-bone">Make it automatic.</h2><ol className="mt-5 grid gap-3">{guide.orderSteps.map((step, index) => <li className="rounded-xl border border-line2 p-4 text-bone/85" key={step}><span className="text-cloudText">{index + 1}. </span>{step}</li>)}</ol></div><div><p className="eyebrow text-cloudText">Before you tap checkout</p><h2 className="display mt-3 text-3xl text-bone">What changes the decision.</h2><p className="mt-5 leading-7 text-bone/85">{guide.watch}</p><p className="mt-4 leading-7 text-mute">{guide.priceNote}</p><a className="btn btn-primary mt-7 inline-flex" href={guide.orderUrl} target="_blank" rel="noreferrer">Open {guide.chain} ordering <span aria-hidden="true">→</span></a></div></section>
    <section className="mt-12 border-t border-line2 pt-8"><p className="eyebrow text-cloudText">Source</p><h2 className="display mt-3 text-3xl text-bone">Menu facts, not guesses.</h2><p className="mt-4 max-w-[64ch] leading-7 text-bone/85">Restaurant servings and recipes can change. Review the current nutrition information before ordering if you have an allergy, medical condition, or a strict target.</p><a href={guide.sourceUrl} className="mt-5 inline-block text-cloudText underline underline-offset-4" target="_blank" rel="noreferrer">Open {guide.chain}&apos;s nutrition source</a></section>
  </main>;
}

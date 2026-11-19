import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import { getTitanSupplements } from "@/lib/titanSupplements";

export const metadata: Metadata = {
  title: "Titan Forge Supplement Catalog | Gains From Geebs",
  description: "Browse the live Titan Forge supplement catalog from Gains From Geebs, with current Shopify prices, availability, and secure checkout.",
  alternates: { canonical: "https://gainsfromgeebs.com/supplements" },
};

export default async function SupplementsPage() {
  const products = await getTitanSupplements();
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <main className="bg-grain min-h-screen">
      <section className="mx-auto max-w-[1100px] px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-mute2">
          <Link href="/">Home</Link><span className="mx-2">/</span><span className="text-bone/80">Supplements</span>
        </nav>
        <header className="max-w-[800px]">
          <p className="eyebrow text-cloudText">Live Titan Forge catalog</p>
          <h1 className="display mt-4 text-[40px] leading-[1.03] text-bone sm:text-[54px] md:text-[66px]">Supplements that support the work.</h1>
          <p className="mt-6 max-w-[67ch] text-[17px] leading-[1.7] text-bone/84">Browse current Titan Forge supplements without leaving the Geebs ecosystem. Prices and availability come from the live Shopify catalog; checkout remains securely on Shopify.</p>
        </header>

        <aside className="mt-9 rounded-2xl border border-line2 bg-ink3/45 p-6 text-[14.5px] leading-[1.65] text-bone/78">
          <b className="text-bone">Foundation first.</b> Supplements do not replace training, adequate food and protein, sleep, hydration, recovery, or medical guidance. Review the current product label, ingredients, allergens, warnings, and medication context before purchase.
        </aside>

        {products.length ? (
          <>
            <p className="mt-10 text-[13px] text-mute2">{products.length} currently available products across {categories.length} categories</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-2xl border border-line bg-ink3/30">
                  <div className="aspect-square bg-bone/5">
                    {product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" loading="lazy" /> : null}
                  </div>
                  <div className="flex min-h-[280px] flex-col p-6">
                    <p className="eyebrow text-mute2">{product.category}</p>
                    <h2 className="display mt-4 text-[25px] leading-[1.08] text-bone">{product.title}</h2>
                    <p className="mt-4 line-clamp-3 text-[14px] leading-[1.6] text-mute">{product.description || "Review the current label, variants, and product details on Shopify."}</p>
                    <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                      <span className="display text-[25px] text-bone">${product.price.toFixed(2)}</span>
                      <a href={product.productUrl} className="btn btn-secondary" target="_blank" rel="noreferrer" data-analytics-event="shopify_product_click" data-analytics-source="geebs_supplement_catalog" data-analytics-link-kind="shop" data-product-handle={product.handle}>View product <span aria-hidden="true">→</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-line p-8 text-mute">The live catalog is temporarily unavailable. <a className="text-bone underline" href="https://shop.titanforgefit.com/collections/all">Open the Titan Forge store</a>.</div>
        )}
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { GroceryGuideStoreVisual } from "@/components/GroceryGuideStoreVisual";
import { RETAILER_SHOPPING_GUIDES } from "@/data/retailShoppingGuides";

const SITE_URL = "https://gainsfromgeebs.com";

export const metadata: Metadata = {
  title: "High-Protein Grocery Shopping Guides by Store | Geebs",
  description:
    "Find what meat cuts, chicken, fruit, vegetables, and convenience staples to buy at Costco, Walmart, Publix, BJ's, and more, with official-store source links and dated online price snapshots.",
  alternates: { canonical: `${SITE_URL}/resources/grocery-shopping-guides` },
  openGraph: {
    title: "High-Protein Grocery Shopping Guides by Store | Geebs",
    description:
      "Find what meat cuts, chicken, fruit, vegetables, and convenience staples to buy at Costco, Walmart, Publix, BJ's, and more.",
    url: `${SITE_URL}/resources/grocery-shopping-guides`,
    type: "website",
  },
};

export default function GroceryGuidesHubPage() {
  const publishedGuides = RETAILER_SHOPPING_GUIDES.filter((g) => g.hasOfficialSourceData);
  const scaffoldedGuides = RETAILER_SHOPPING_GUIDES.filter((g) => !g.hasOfficialSourceData);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "High-Protein Grocery Shopping Guides",
    description: "Store-specific high-protein grocery buying guides with verified prices and source records.",
    itemListElement: RETAILER_SHOPPING_GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${guide.retailerName} High-Protein Grocery Guide`,
      url: `${SITE_URL}/resources/${guide.slug}-high-protein-grocery-guide`,
    })),
  };

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-24 pt-12 md:px-10 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-mute">
        <Link href="/resources" className="hover:text-bone">
          Resources
        </Link>{" "}
        <span aria-hidden="true">/</span> <span>Grocery shopping guides</span>
      </nav>

      <header className="mt-6 max-w-[800px]">
        <p className="eyebrow text-cloudText">Grocery Shopping Guide Series</p>
        <h1 className="display mt-3 text-[40px] leading-[1.02] text-bone md:text-[64px]">
          Know what to buy before you step into the grocery store.
        </h1>
        <p className="mt-6 text-[18px] leading-[1.65] text-bone/85">
          Pick your grocery store. Each guide tells you what to buy, why it earns a place in a fitness-focused cart, how to use it, and what to grab instead if it is gone.
        </p>
        <p className="mt-4 text-sm leading-6 text-mute">
          Prices are dated official online snapshots and can change by store, membership, delivery method, and weekly promotion. Check your selected store before checkout.
        </p>
      </header>

      <div className="mt-10">
        <GroceryGuideStoreVisual
          retailerName="Costco Wholesale"
          tagline=""
          variant="hub"
        />
      </div>

      {/* Verified Guides Section */}
      {publishedGuides.length > 0 ? <section className="mt-14" aria-labelledby="verified-guides-heading">
        <div className="flex items-baseline justify-between gap-4 border-b border-line2 pb-4">
          <div>
            <p className="eyebrow text-cloudText">Store-by-store plans</p>
            <h2 id="verified-guides-heading" className="display mt-1 text-2xl text-bone md:text-3xl">
              Store-specific buying guides ({publishedGuides.length})
            </h2>
          </div>
          <span className="text-xs uppercase tracking-wider text-cloudText font-medium">
            Official source links included
          </span>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {publishedGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/resources/${guide.slug}-high-protein-grocery-guide`}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line2 bg-bone/[.025] transition hover:border-cloudText/70 hover:bg-bone/[.04]"
              >
                <div className="relative h-36 overflow-hidden border-b border-line2">
                  <GroceryGuideStoreVisual retailerName={guide.retailerName} tagline="" variant="card" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-cloudText">{guide.retailerName}</p>
                    <span className="text-xs text-mute font-mono">{guide.localSnapshotDate}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-bone group-hover:text-cloudText transition-colors">
                    {guide.tagline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-bone/75">
                    {guide.weeklyBudgetEstimate} • {guide.items.length} food picks with price context, practical use, and substitutions.
                  </p>
                </div>
                <div className="mx-6 mt-auto border-t border-line2/60 py-4 flex items-center justify-between text-sm text-cloudText">
                  <span>Open {guide.retailerName} guide</span>
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section> : null}

      {/* In-progress local cart capture */}
      <section className={publishedGuides.length > 0 ? "mt-16" : "mt-14"} aria-labelledby="upcoming-guides-heading">
        <div className="flex items-baseline justify-between gap-4 border-b border-line2 pb-4">
          <div>
            <p className="eyebrow text-mute">Upcoming verified store reads</p>
            <h2 id="upcoming-guides-heading" className="display mt-1 text-xl text-bone/80 md:text-2xl">
              Local cart reads still to come ({scaffoldedGuides.length})
            </h2>
          </div>
          <span className="text-xs text-mute">Awaiting Official Data Capture</span>
        </div>
        <p className="mt-4 max-w-[70ch] text-sm text-mute leading-relaxed">
          These guides are already sourced to official listings. A later local-cart pass will replace online snapshots with a named Fort Lauderdale-area store checkout view where the retailer allows it.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scaffoldedGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/resources/${guide.slug}-high-protein-grocery-guide`}
                className="group block h-full rounded-xl border border-line2/70 bg-bone/[.015] p-5 transition hover:border-line2 hover:bg-bone/[.03]"
              >
                <p className="eyebrow text-mute">{guide.retailerName}</p>
                <h3 className="mt-2 text-lg font-medium text-bone/90 group-hover:text-bone">
                  {guide.retailerName}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">
                  {guide.tagline}
                </p>
                <div className="mt-4 flex items-center text-xs text-cloudText/80">
                  <span>View status &amp; scope</span>
                  <span aria-hidden="true" className="ml-1">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Helpful Framework Details */}
      <section className="mt-16 border-t border-line2 pt-10">
        <h2 className="display text-2xl text-bone">How to use these grocery guides</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-line2 p-5 bg-bone/[.02]">
            <h3 className="font-semibold text-bone">1. Stick to the protein anchors</h3>
            <p className="mt-2 text-sm text-bone/80 leading-relaxed">
              Build each meal around a 25–40g whole food protein base (lean beef, chicken, tuna, or Greek yogurt) before picking sides.
            </p>
          </div>
          <div className="rounded-xl border border-line2 p-5 bg-bone/[.02]">
            <h3 className="font-semibold text-bone">2. High-volume produce</h3>
            <p className="mt-2 text-sm text-bone/80 leading-relaxed">
              Pick fruits and vegetables that survive in your fridge or freezer all week (apples, frozen berries, broccoli, baby spinach) so nothing rots in the crisper drawer.
            </p>
          </div>
          <div className="rounded-xl border border-line2 p-5 bg-bone/[.02]">
            <h3 className="font-semibold text-bone">3. Keep backup meals</h3>
            <p className="mt-2 text-sm text-bone/80 leading-relaxed">
              Every guide includes 1–2 frozen or shelf-stable fallbacks so when a busy evening goes sideways, you don&apos;t default to delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

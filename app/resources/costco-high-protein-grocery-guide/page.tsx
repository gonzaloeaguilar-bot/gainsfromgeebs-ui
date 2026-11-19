import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GroceryGuideAisleCards } from "@/components/GroceryGuideAisleCards";
import { GroceryBudgetCart } from "@/components/GroceryBudgetCart";
import { RETAILER_SHOPPING_GUIDES } from "@/data/retailShoppingGuides";

const SITE_URL = "https://gainsfromgeebs.com";
const RETAILER_SLUG = "costco";

export const metadata: Metadata = (() => {
  const guide = RETAILER_SHOPPING_GUIDES.find((item) => item.slug === RETAILER_SLUG);
  if (!guide) return {};
  const title = `${guide.retailerName} High-Protein Grocery Shopping Guide | Geebs`;
  const description = guide.hasOfficialSourceData
    ? `Aisle-by-aisle high-protein grocery buying list for ${guide.retailerName}: what lean beef, chicken, produce, and staples to buy with verified prices, macros, and substitutes.`
    : `${guide.retailerName} high-protein grocery shopping guide: official product capture status, planned aisle checklist, and protein standards.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/resources/${guide.slug}-high-protein-grocery-guide` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/resources/${guide.slug}-high-protein-grocery-guide`,
      type: "article",
    },
  };
})();

export default function RetailerGuidePage() {
  const guide = RETAILER_SHOPPING_GUIDES.find((item) => item.slug === RETAILER_SLUG);
  if (!guide) notFound();

  const url = `${SITE_URL}/resources/${guide.slug}-high-protein-grocery-guide`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${guide.retailerName} High-Protein Grocery Guide`,
    description: guide.tagline,
    mainEntityOfPage: url,
    dateModified: guide.localSnapshotDate || "2026-11-08",
    author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo" },
    publisher: { "@type": "Organization", name: "Geebs Coaching", url: SITE_URL },
  };

  return (
    <main className="mx-auto max-w-[980px] px-6 pb-24 pt-12 md:px-10 md:pt-20" data-own-folds>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-mute">
        <Link href="/resources" className="hover:text-bone">Resources</Link> <span aria-hidden="true">/</span> <Link href="/resources/grocery-shopping-guides" className="hover:text-bone">Grocery guides</Link> <span aria-hidden="true">/</span> <span>{guide.retailerName}</span>
      </nav>

      <header className="relative isolate mt-6 min-h-[230px] overflow-hidden rounded-2xl border border-line2 px-5 py-5 sm:min-h-[300px] sm:px-7 md:min-h-[480px] md:px-10 md:py-10">
        <Image
          src="/images/grocery-guides/costco-naples-exterior-mobile.webp"
          alt="Costco Wholesale exterior in Naples, Florida"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 0px"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/grocery-guides/costco-naples-exterior.webp"
          alt="Costco Wholesale exterior in Naples, Florida"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 980px"
          className="hidden object-cover md:block"
          style={{ objectPosition: "55% 56%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
        <div className="relative z-10 max-w-[660px]">
          <p className="eyebrow text-cloudText">{guide.retailerName}</p>
          <h1 className="display mt-2 max-w-[15ch] text-[30px] leading-[0.98] text-bone md:mt-3 md:text-[58px]">
            What to buy at {guide.retailerName} for high-protein eating.
          </h1>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.4] text-bone/90 md:mt-4 md:text-[17px] md:leading-[1.48]">{guide.tagline}</p>
        </div>
        <p className="absolute bottom-3 right-4 z-10 text-[10px] text-bone/55">
          Photo: <a className="underline underline-offset-2 hover:text-bone" href="https://commons.wikimedia.org/wiki/File:Costco_Naples.jpg">Chasetheg / Wikimedia Commons, CC BY-SA 4.0</a>
        </p>
      </header>

      <GroceryBudgetCart guide={guide} />
      <GroceryGuideAisleCards guide={guide} />

      {false && <>

      {!guide.hasOfficialSourceData && (
        <section className="mt-10 rounded-2xl border border-line2 bg-bone/[.02] p-6 text-sm text-bone/80">
          <p className="eyebrow text-cloudText">Data Integrity Standard</p>
          <h2 className="display mt-2 text-2xl text-bone">Official source capture in progress</h2>
          <p className="mt-4 leading-relaxed">{guide.statusNotice}</p>
          <p className="mt-3 text-mute leading-relaxed">
            We do not publish approximate macros or guessed shelf prices. Once this store&apos;s product catalogue, item codes, and current price units are captured, this page will update with the full aisle checklist, video trailer breakdown, and 7-day meal allocation.
          </p>
          <div className="mt-6">
            <Link href="/resources/grocery-shopping-guides" className="text-cloudText underline underline-offset-4 font-medium">
              Browse currently verified guides (Costco, Walmart, Publix, BJ&apos;s) →
            </Link>
          </div>
        </section>
      )}

      {guide.hasOfficialSourceData && guide.trailerStructure && (
        <section className="mt-12 rounded-2xl border border-cloudText/30 bg-cloudText/[0.05] p-6" aria-labelledby="trailer-heading">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-cloudText">Video Guide Breakdown</p>
            <span className="text-xs font-mono text-cloudText">47-second trailer structure</span>
          </div>
          <h2 id="trailer-heading" className="display mt-2 text-2xl text-bone">The {guide.retailerName} High-Protein Plan at a Glance</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line2 bg-bone/[.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cloudText">1. Hard Promise (0–3s)</p>
              <p className="mt-1 text-sm text-bone/90">{guide.trailerStructure.hook}</p>
            </div>
            <div className="rounded-xl border border-line2 bg-bone/[.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cloudText">2. Scope &amp; Foundations (3–10s)</p>
              <p className="mt-1 text-sm text-bone/90">{guide.trailerStructure.scope}</p>
            </div>
            <div className="rounded-xl border border-line2 bg-bone/[.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cloudText">3. Meal Structure (10–22s)</p>
              <p className="mt-1 text-sm text-bone/90">{guide.trailerStructure.mealStructure}</p>
            </div>
            <div className="rounded-xl border border-line2 bg-bone/[.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cloudText">4. Full-Day Example (22–32s)</p>
              <p className="mt-1 text-sm text-bone/90">{guide.trailerStructure.dayExample}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-line2 bg-bone/[.02] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-cloudText">5. The Payoff (32–47s)</p>
            <p className="mt-1 text-sm text-bone/90">{guide.trailerStructure.payoff}</p>
          </div>
        </section>
      )}

      {guide.hasOfficialSourceData && (
        <div className="mt-14 space-y-12">
          <section aria-labelledby="q-meat">
            <div className="border-b border-line2 pb-3">
              <p className="eyebrow text-cloudText">Aisle Guidance: Meat Counter</p>
              <h2 id="q-meat" className="display mt-1 text-2xl text-bone md:text-3xl">Which lean beef and meat cuts are worth buying at {guide.retailerName}?</h2>
            </div>
            <p className="mt-4 text-[16px] leading-7 text-bone/85">{guide.meatGuide}</p>
            {guide.items.filter((i) => i.category === "meat").map((item) => (
              <div key={item.name} className="mt-4 rounded-xl border border-line2 bg-bone/[.025] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-bone">{item.name}</h3>
                  <span className="font-mono text-sm font-semibold text-cloudText">{item.priceEstimate}</span>
                </div>
                <p className="mt-3 border-y border-line2/50 py-2 text-xs text-mute">Check the package nutrition label for the serving and macro details that match your specific item.</p>
                <p className="mt-3 text-sm text-bone/80"><strong className="text-bone">How to use it:</strong> {item.practicalNotes}</p>
                <p className="mt-2 text-xs text-mute"><strong className="text-bone/70">Substitute if out of stock:</strong> {item.substitute}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="q-chicken">
            <div className="border-b border-line2 pb-3">
              <p className="eyebrow text-cloudText">Aisle Guidance: Poultry</p>
              <h2 id="q-chicken" className="display mt-1 text-2xl text-bone md:text-3xl">Which chicken cuts and pack formats make sense at {guide.retailerName}?</h2>
            </div>
            <p className="mt-4 text-[16px] leading-7 text-bone/85">{guide.chickenGuide}</p>
            {guide.items.filter((i) => i.category === "poultry").map((item) => (
              <div key={item.name} className="mt-4 rounded-xl border border-line2 bg-bone/[.025] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-bone">{item.name}</h3>
                  <span className="font-mono text-sm font-semibold text-cloudText">{item.priceEstimate}</span>
                </div>
                <p className="mt-3 border-y border-line2/50 py-2 text-xs text-mute">Check the package nutrition label for the serving and macro details that match your specific item.</p>
                <p className="mt-3 text-sm text-bone/80"><strong className="text-bone">How to use it:</strong> {item.practicalNotes}</p>
                <p className="mt-2 text-xs text-mute"><strong className="text-bone/70">Substitute if out of stock:</strong> {item.substitute}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="q-produce">
            <div className="border-b border-line2 pb-3">
              <p className="eyebrow text-cloudText">Aisle Guidance: Fresh &amp; Frozen Produce</p>
              <h2 id="q-produce" className="display mt-1 text-2xl text-bone md:text-3xl">Which fruits and vegetables offer practical volume and shelf life?</h2>
            </div>
            <p className="mt-4 text-[16px] leading-7 text-bone/85">{guide.produceGuide}</p>
            {guide.items.filter((i) => i.category === "produce").map((item) => (
              <div key={item.name} className="mt-4 rounded-xl border border-line2 bg-bone/[.025] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-bone">{item.name}</h3>
                  <span className="font-mono text-sm font-semibold text-cloudText">{item.priceEstimate}</span>
                </div>
                <p className="mt-3 border-y border-line2/50 py-2 text-xs text-mute">Use the package nutrition label for serving and macro details; produce labels vary by item and preparation.</p>
                <p className="mt-3 text-sm text-bone/80"><strong className="text-bone">How to use it:</strong> {item.practicalNotes}</p>
                <p className="mt-2 text-xs text-mute"><strong className="text-bone/70">Substitute if out of stock:</strong> {item.substitute}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="q-staples">
            <div className="border-b border-line2 pb-3">
              <p className="eyebrow text-cloudText">Aisle Guidance: Pantry &amp; Fallbacks</p>
              <h2 id="q-staples" className="display mt-1 text-2xl text-bone md:text-3xl">Which staples, dairy, and fallback meals keep the plan workable?</h2>
            </div>
            <p className="mt-4 text-[16px] leading-7 text-bone/85">{guide.staplesGuide}</p>
            {guide.items.filter((i) => i.category === "staples_convenience").map((item) => (
              <div key={item.name} className="mt-4 rounded-xl border border-line2 bg-bone/[.025] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-bone">{item.name}</h3>
                  <span className="font-mono text-sm font-semibold text-cloudText">{item.priceEstimate}</span>
                </div>
                <p className="mt-3 border-y border-line2/50 py-2 text-xs text-mute">Check the package nutrition label for the serving and macro details that match your specific item.</p>
                <p className="mt-3 text-sm text-bone/80"><strong className="text-bone">How to use it:</strong> {item.practicalNotes}</p>
                <p className="mt-2 text-xs text-mute"><strong className="text-bone/70">Substitute if out of stock:</strong> {item.substitute}</p>
              </div>
            ))}
          </section>

          {guide.fullDayPlan && (
            <section aria-labelledby="q-full-day" className="rounded-2xl border border-line2 bg-bone/[.02] p-6">
              <div className="border-b border-line2 pb-3">
                <p className="eyebrow text-cloudText">Full-Day Eating Structure</p>
                <h2 id="q-full-day" className="display mt-1 text-2xl text-bone">Example full day of eating from this {guide.retailerName} basket</h2>
                <p className="mt-2 text-xs text-cloudText font-medium">Adjust portions to your own calorie and protein needs.</p>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="rounded-xl border border-line2/70 bg-bone/[.02] p-4">
                  <strong className="text-cloudText block text-xs uppercase tracking-wider">Breakfast</strong>
                  <p className="mt-1 text-bone/90">{guide.fullDayPlan.breakfast}</p>
                </div>
                <div className="rounded-xl border border-line2/70 bg-bone/[.02] p-4">
                  <strong className="text-cloudText block text-xs uppercase tracking-wider">Lunch</strong>
                  <p className="mt-1 text-bone/90">{guide.fullDayPlan.lunch}</p>
                </div>
                <div className="rounded-xl border border-line2/70 bg-bone/[.02] p-4">
                  <strong className="text-cloudText block text-xs uppercase tracking-wider">Dinner</strong>
                  <p className="mt-1 text-bone/90">{guide.fullDayPlan.dinner}</p>
                </div>
                <div className="rounded-xl border border-line2/70 bg-bone/[.02] p-4">
                  <strong className="text-cloudText block text-xs uppercase tracking-wider">Snack / Post-Training</strong>
                  <p className="mt-1 text-bone/90">{guide.fullDayPlan.snacksAndTraining}</p>
                </div>
              </div>
            </section>
          )}

          <section className="border-t border-line2 pt-8">
            <details className="group rounded-xl border border-line2 bg-bone/[.015] p-5 text-sm" open>
              <summary className="cursor-pointer font-semibold text-bone hover:text-cloudText">Official source provenance, date, and price caveats</summary>
              <div className="mt-4 space-y-3 text-bone/80 border-t border-line2/60 pt-4 text-xs leading-relaxed">
                <p><strong>Location and date checked:</strong> {guide.localStoreLocation} (Snapshot taken on {guide.localSnapshotDate}).</p>
                <p><strong>Caveat notes:</strong> {guide.caveatNotes}</p>
                <p><strong>Verification boundary:</strong> Prices, package sizes, and shelf availability are variable by store location and date. Never treat a shopping guide as a universal price contract. Verify current nutrition labels directly if you manage food allergies, dietary restrictions, or medical conditions.</p>
              </div>
            </details>
          </section>
        </div>
      )}

      </>}

      <div className="mt-16 border-t border-line2 pt-8 flex items-center justify-between text-sm">
        <Link href="/resources/grocery-shopping-guides" className="text-cloudText underline underline-offset-4">← Back to all grocery guides</Link>
        <Link href="/resources" className="text-mute hover:text-bone">All resources</Link>
      </div>
    </main>
  );
}

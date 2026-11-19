import Link from "next/link";
import MoneyPageKit from "@/components/MoneyPageKit";
import KeepGoing from "@/components/KeepGoing";
import NewsletterSignup from "@/components/NewsletterSignup";
import SupplementRail from "@/components/SupplementRail";
import { getTitanSupplements } from "@/lib/titanSupplements";
import { offerRailItems } from "@/lib/offerRail";
import {
  membershipCheckoutUrl,
  type MembershipOffer,
} from "@/lib/membershipOffers";

export default async function MembershipSalesPage({ offer }: { offer: MembershipOffer }) {
  const supplements = await getTitanSupplements();
  const checkoutUrl = membershipCheckoutUrl(offer, "gainsfromgeebs");

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: offer.title,
    description: offer.description,
    // An empty sku is invalid markup; omit it until the offer has a product id.
    ...(offer.productId ? { sku: offer.productId } : {}),
    brand: { "@type": "Brand", name: "Titan Forge Fitness" },
    offers: {
      "@type": "Offer",
      url: checkoutUrl,
      priceCurrency: "USD",
      price: offer.price.toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="bg-grain min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="mx-auto max-w-[1100px] px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-mute2">
          <Link href="/">Home</Link><span className="mx-2">/</span>
          <Link href="/packages">Memberships</Link><span className="mx-2">/</span>
          <span className="text-bone/80">{offer.shortTitle}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.18fr_.82fr] lg:items-start">
          <div>
            <p className="eyebrow text-cloudText">{offer.eyebrow}</p>
            <h1 className="display mt-4 max-w-[15ch] text-[40px] leading-[1.02] text-bone sm:text-[54px] md:text-[66px]">
              {offer.shortTitle}
            </h1>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-bone/84 md:text-[19px]">
              {offer.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={checkoutUrl}
                className="btn btn-primary"
                data-analytics-event="membership_checkout_click"
                data-analytics-source="membership_sales_page"
                data-analytics-link-kind="paid_membership"
                data-product-intent={offer.productIntent}
              >
                Join for ${offer.price.toFixed(2)}/month <span aria-hidden="true">→</span>
              </a>
              <span className="text-[13px] text-mute2">Secure checkout on Shopify</span>
            </div>
          </div>

          <aside className="rounded-2xl border border-line2 bg-ink3/55 p-6 md:p-8">
            <p className="eyebrow text-bone/70">What is included</p>
            <div className="mt-5 flex items-end gap-2">
              <span className="display text-[46px] text-bone">{`$${offer.price.toFixed(2)}`}</span>
              <span className="pb-2 text-[13px] text-mute2">per month</span>
            </div>
            <ul className="mt-7 space-y-4 text-[15px] leading-[1.55] text-bone/82">
              {offer.includes.map((item) => <li key={item} className="flex gap-3"><span className="text-cloudText">◆</span><span>{item}</span></li>)}
            </ul>
          </aside>
        </div>

        <div className="hair my-14 md:my-20" />

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow text-mute2">Best fit</p>
            <h2 className="display mt-4 text-[30px] text-bone md:text-[40px]">Choose this if…</h2>
            <ul className="mt-6 space-y-4 text-[15.5px] leading-[1.65] text-bone/80">
              {offer.bestFor.map((item) => <li key={item}>— {item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-ink3/25 p-6 md:p-8">
            <p className="eyebrow text-mute2">After checkout</p>
            <h2 className="display mt-4 text-[28px] text-bone">What happens next</h2>
            <ol className="mt-6 space-y-4 text-[15px] leading-[1.65] text-bone/80">
              <li><b className="text-bone">1.</b> Shopify confirms your monthly membership payment.</li>
              <li><b className="text-bone">2.</b> Keep the checkout email address accessible for membership instructions.</li>
              <li><b className="text-bone">3.</b> Titan Forge verifies the order and sends the Telegram access steps.</li>
            </ol>
            <p className="mt-6 text-[13px] leading-[1.6] text-mute2">This is a community/self-directed membership, not private coaching or medical care. Cancel through the store subscription controls.</p>
          </div>
        </section>

        {/* The rail, not the three-item grid. This page was one of the last two
            places still rendering the old strip, which showed 3 of the 11
            products with the rest behind a text link. */}
        <div className="mt-14 md:mt-20">
          <SupplementRail items={supplements} source="geebs_membership_sales" />
        </div>

        <section className="mt-14 rounded-2xl border border-line bg-ink2/45 p-7 md:mt-20 md:p-10">
          <p className="eyebrow text-mute2">Want a coach, not a community?</p>
          <h2 className="display mt-4 text-[29px] text-bone">Coaching packages</h2>
          <p className="mt-4 max-w-[65ch] text-[15.5px] leading-[1.65] text-mute">The membership is a room, not a coach. If you want a plan built for you — VIP, Standard Check-In, or Weekly Review — or a one-time $100 consultation with Kris, compare those on the packages page.</p>
          <Link href="/packages" className="btn btn-secondary mt-7">See coaching packages <span aria-hidden="true">→</span></Link>
        </section>
        {/* The only money page with no email capture at all.
            It sits BELOW the offer and below the coaching upsell on
            purpose: this page's job is the purchase, and a capture above
            the buy button competes with it. Here it is the fallback for
            someone who is not buying today. */}
        <div className="mt-14 md:mt-20">
          <NewsletterSignup
            source="membership_keep_in_touch"
            leadType="membership_keep_in_touch"
          />
        </div>
      </section>
      {/* Shared foot of every page. This sales page was one of three URLs in
          the sitemap that carried nothing from the component library. */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-4">
        <KeepGoing position="membership_sales" />
      </div>
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

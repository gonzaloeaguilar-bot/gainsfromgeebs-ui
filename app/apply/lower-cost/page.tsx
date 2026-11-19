import type { Metadata } from "next";
import Link from "next/link";

import { formatUsd, offer, priceLabel } from "@/lib/offerCatalog";
import { LowerCostPickNotice } from "@/components/LowerCostPickNotice";

// Prose uses the full label ("$24.99/month"); the price cards render the bare
// amount because they supply their own cadence line underneath it.
const CONSULT_PRICE_LABEL = priceLabel("one-time-consultation");
const COMMUNITY_PRICE_LABEL = priceLabel("science-based-community");
const CONSULT_AMOUNT = formatUsd(offer("one-time-consultation").pricing.amountUsd!);
const COMMUNITY_AMOUNT = formatUsd(offer("science-based-community").pricing.amountUsd!);
// The band this page steps someone up into, read from the plans themselves so
// it cannot drift away from what Standard and Weekly Review actually cost.
const STEP_UP_BAND = `$${offer("weekly-review").pricing.amountUsd}-$${offer("standard-check-in").pricing.amountUsd}/month`;

const SITE_URL = "https://gainsfromgeebs.com";
const PAGE_URL = `${SITE_URL}/apply/lower-cost`;
const SHOPIFY_CONSULT_CART_URL =
  "https://titanforgefit.com/cart/54275205234972:1";
const MEMBERSHIP_PRODUCTS = {
  community: {
    handle: "geebs-science-based-community",
    price: "24.99",
  },
} as const;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Lower-Cost Options | Geebs Coaching",
  description:
    `Choose a lower-cost Geebs next step, including the ${COMMUNITY_PRICE_LABEL} science-based community or the ${CONSULT_PRICE_LABEL} one-time consultation call with Kris.`,
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
};

function getSingleParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function oneTimeConsultHref(applicationId: string): string {
  const url = new URL(SHOPIFY_CONSULT_CART_URL);
  url.searchParams.set("utm_source", "site");
  url.searchParams.set("utm_medium", "apply_lower_cost");
  url.searchParams.set("utm_campaign", "one_time_consult_paid");
  url.searchParams.set("utm_content", "shopify_consult_checkout");
  url.searchParams.set("utm_term", "consultation_call");
  url.searchParams.set("attributes[source]", "gainsfromgeebs_apply_lower_cost");
  url.searchParams.set("attributes[product_intent]", "consultation_call");

  if (applicationId) {
    url.searchParams.set("attributes[application_id]", applicationId);
  }

  return url.href;
}

function membershipHref(
  product: (typeof MEMBERSHIP_PRODUCTS)[keyof typeof MEMBERSHIP_PRODUCTS],
  applicationId: string,
  intent: string,
): string {
  const url = new URL(`https://shop.titanforgefit.com/products/${product.handle}`);
  url.searchParams.set("utm_source", "gainsfromgeebs");
  url.searchParams.set("utm_medium", "apply_lower_cost");
  url.searchParams.set("utm_campaign", "paid_membership_downsell");
  url.searchParams.set("utm_content", intent);
  if (applicationId) url.searchParams.set("utm_term", applicationId);
  return url.href;
}

export default async function LowerCostOptionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const applicationId = getSingleParam((await searchParams).application_id);
  // Community first, consult second. Whoever lands here said they are under
  // $100 a month, and the community is the only thing on this page they can
  // buy at that number — and buy right now, online, without waiting for Kris.
  // Leading with the $100 call showed them the one option above what they had
  // just told us they could spend.
  const options = [
    {
      eyebrow: "Lowest cost",
      title: "Titan Forge Science-Based Community",
      price: COMMUNITY_AMOUNT,
      cadence: "per month",
      description:
        "Join the science-based Telegram community for practical training and nutrition discussion without private 1:1 coaching.",
      details: [
        "Science-based Telegram community",
        "Monthly recurring membership",
        "Access instructions follow checkout",
      ],
      href: membershipHref(
        MEMBERSHIP_PRODUCTS.community,
        applicationId,
        "community_24_99",
      ),
      cta: "Join the community",
      primary: true,
      productIntent: "science_community_24_99",
    },
    {
      eyebrow: "Direct guidance",
      title: "One-Time Consultation",
      price: CONSULT_AMOUNT,
      cadence: "one-time",
      description:
        "A paid call with Kris to diagnose what is stuck and leave with the next move.",
      details: [
        "Payment is handled up front before booking",
        "Training, nutrition, or accountability diagnosis",
        "No monthly coaching commitment required",
      ],
      href: oneTimeConsultHref(applicationId),
      cta: "Pay + book consult",
      primary: false,
    },

  ];

  return (
    <main className="bg-grain relative min-h-screen">
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pt-12 md:pt-20 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-mute2">
          <Link href="/" className="hover:text-bone">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <Link href="/apply" className="hover:text-bone">
            Apply
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-bone/80">Lower-cost options</span>
        </nav>

        <header className="max-w-[760px]">
          <LowerCostPickNotice />
          <p className="eyebrow text-cloudText">Lower-cost next step</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[58px] leading-[1.04]">
            Pick the option that matches where you are right now.
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.65] text-bone/85 max-w-[62ch]">
            Monthly 1:1 coaching is not the only way to get help from the
            Geebs system. These are the lower-cost paths when Standard or VIP
            support is not the move yet.
          </p>
        </header>

        <div className="mt-10 md:mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {options.map((option) => (
            <article
              key={option.title}
              className={`pathcard rounded-2xl border p-6 md:p-7 flex flex-col ${
                option.primary
                  ? "border-line2 bg-ink3/70"
                  : "border-line bg-ink3/30"
              }`}
            >
              <p
                className={
                  option.primary
                    ? "eyebrow text-cloudText"
                    : "eyebrow text-bone/70"
                }
              >
                {option.eyebrow}
              </p>

              <h2 className="display mt-5 text-[27px] md:text-[32px] leading-[1.05] text-bone">
                {option.title}
              </h2>

              <p className="mt-4 text-[15px] leading-[1.62] text-mute">
                {option.description}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <p className="display text-[42px] leading-none text-bone">
                  {option.price}
                </p>
                <p className="pb-1.5 text-[13px] text-mute2">
                  {option.cadence}
                </p>
              </div>

              <div className="hair my-6" />

              <ul className="mb-8 space-y-3 text-[14.5px] leading-[1.55] text-bone/82">
                {option.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                        option.primary ? "bg-cloudText" : "bg-bone/45"
                      }`}
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <a
                href={option.href}
                data-analytics-event={
                  "productIntent" in option
                    ? "membership_checkout_click"
                    : undefined
                }
                data-analytics-link-kind={
                  "productIntent" in option ? "paid_membership" : undefined
                }
                data-product-intent={
                  "productIntent" in option ? option.productIntent : undefined
                }
                className={`btn ${
                  option.primary ? "btn-primary" : "btn-secondary"
                } self-start mt-auto`}
              >
                {option.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="hair my-12 md:my-16" />

        <section className="max-w-[760px]">
          <p className="eyebrow text-mute2">Want coaching later?</p>
          <h2 className="display mt-4 text-[26px] md:text-[36px] leading-[1.08] text-bone">
            Standard and VIP are still there when the fit is right.
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute">
            If you become ready for {STEP_UP_BAND} coaching, Standard is the
            next lane. If you want the highest-touch support and are prepared
            for $500+/month, VIP is the fit conversation.
          </p>
        </section>
      </section>
    </main>
  );
}

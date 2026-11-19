import Link from "next/link";
import { COACH_LED_1ON1, offer, priceLabel } from "@/lib/offerCatalog";

/**
 * A one-tap answer to "what does this cost?" near the top of a long guide.
 *
 * Native <details>, so the words are in the served HTML for crawlers and a
 * reader is one tap from the number. Prices come from the offer catalog and
 * are never typed here; the full breakdown lives on the cost guide.
 */
export default function CoachingCostFold({ className = "" }: { className?: string }) {
  const tiers = [...COACH_LED_1ON1].reverse();
  return (
    <details className={`article-fold !mt-0 ${className}`} data-cost-fold>
      <summary>
        <h2 id="coaching-cost" className="display text-[23px] leading-[1.12] text-bone md:text-[29px]">
          What does coaching with Kris cost?
        </h2>
      </summary>
      <div className="article-fold-body">
        <p className="prose-body mt-3 text-bone/90">
          Kris publishes his starting prices. Each plan is coached personally by him, and the monthly rate drops if you pay for 6 or 12 months at once.
        </p>
        <ul className="prose-body mt-3 list-disc pl-5 text-bone/90">
          {tiers.map((id) => (
            <li key={id}>
              {offer(id).name}: {priceLabel(id)}
            </li>
          ))}
        </ul>
        <p className="prose-body mt-3 text-bone/90">
          Not sure which fits? Read the full{" "}
          <Link href="/guides/how-much-does-an-online-fitness-coach-cost" className="underline underline-offset-4">
            online coaching cost guide
          </Link>
          , which also shows what other coaches charge and what moves the price.
        </p>
      </div>
    </details>
  );
}

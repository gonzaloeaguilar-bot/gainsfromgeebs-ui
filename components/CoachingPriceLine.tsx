import Link from "next/link";
import SectionView from "@/components/SectionView";
import {
  CONSULT_PRICE_ONE_TIME,
  MEMBERSHIP_PRICE_MONTHLY,
  coachingFromPrice,
  formatUsd,
} from "@/lib/offerCatalog";

/**
 * What coaching costs, said early, on the pages that sell it.
 *
 * Measured across 12 money pages on 2026-09-24: nine never stated a coaching
 * price at all. On the 21 audience pages the only figure anywhere was the
 * $24.99 community, and it landed between 67% and 91% of the way down. So a
 * reader deciding whether to hire Kris got no price signal and had to leave
 * for /packages to find one.
 *
 * The page with the highest buying intent on the site is the cost guide, which
 * leads with price at 4%. That is the argument for this.
 *
 * A FLOOR, not a range, and not typed: `coachingFromPrice()` reads the
 * cheapest main coaching tier from the offer catalog. The catalog's own note
 * says why a floor -- a range invites someone to anchor on its bottom and
 * negotiate down, while a floor anchors up and leaves the prepay terms and the
 * lighter plans as the ways price comes down.
 *
 * Deliberately one line rather than a card: /for/busy-professionals sits
 * within ~11px of the page-height guard its fold test enforces.
 */
export default function CoachingPriceLine({
  sectionId = "coaching_price_line",
}: {
  sectionId?: string;
}) {
  const floor = formatUsd(coachingFromPrice());

  return (
    <SectionView sectionId={sectionId}>
      {/* Not folded: a price behind a click is not a published price. */}
      <p
        data-no-fold
        className="rounded-[10px] border border-line px-4 py-3.5 text-[15px] leading-[1.6] text-bone/85"
      >
        <span className="text-bone font-semibold">
          Coaching with Kris starts at {floor} a month.
        </span>{" "}
        A one-time consult is {formatUsd(CONSULT_PRICE_ONE_TIME)}, and the
        community is {formatUsd(MEMBERSHIP_PRICE_MONTHLY)} a month.{" "}
        <Link
          href="/packages"
          className="text-bone underline decoration-cloudText/60 underline-offset-4"
        >
          See what each one includes
        </Link>
        .
      </p>
    </SectionView>
  );
}

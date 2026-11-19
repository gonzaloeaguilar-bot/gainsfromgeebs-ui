"use client";

import { usePathname } from "next/navigation";
import OfferRail from "@/components/OfferRail";
import ProofRail from "@/components/ProofRail";
import { aggregateProof, clientResults, hasClientResults } from "@/data/clientResults";
import type { OfferRailItem } from "@/lib/offerRail";
import KeepGoing from "@/components/KeepGoing";
import ScholarshipCallout from "@/components/ScholarshipCallout";

/**
 * The shared foot of every article page.
 *
 * 168 pages, and until now five of them carried anything from the component
 * library. The other 163 ended on a paragraph and a full stop: a reader who
 * finished an article about protein or shift work had nothing in front of them
 * except the footer, on a site whose whole purpose is to sell coaching.
 *
 * This is the one block that belongs at the end of all of them, and it lives in
 * ArticleShell rather than in 63 page files, so it cannot drift page to page and
 * nobody has to remember to add it.
 *
 * The source is read from the pathname instead of being passed in, so a page
 * reports its own analytics without a per-page edit. That is the whole reason
 * this is a client component.
 */
export default function MoneyPageKit({
  items,
  exit = false,
  scholarship = true,
}: {
  items: OfferRailItem[];
  /**
   * THE WAY OUT, and it is opt-in because 52 pages already place their own.
   *
   * Measured on prod 2026-09-25 against the site's top pages by impressions,
   * using the component's real marker (`keep_going-heading`) and not the
   * words "keep going", which appear in blog prose and made a first pass
   * report this as present on 25 of 27 pages when it was on 2:
   *
   *   /blog/how-to-fix-skinny-fat          28,078 impressions   0
   *   /guides/how-much-does-an-...-cost     34,381 impressions   0
   *   /for/skinny-fat-men                    3,643 impressions   0
   *   /tools/macro-calculator                3,034 impressions   0
   *
   * /tools/macro-calculator and /guides/body-recomposition-for-beginners had
   * ZERO onward links below the fold. A reader who finished them had the
   * footer and nothing else, on a site whose whole point is that they read one
   * more thing and then decide they want a coach.
   *
   * It goes here rather than into ArticleShell because this foot is the one
   * thing blog, tools, guides, /for and /nutrition all already render — one
   * insertion point instead of four, and it cannot drift between them.
   */
  exit?: boolean;
  /**
   * Off where the page already places its own. /blog/[slug] decides per post
   * via isScholarshipMoneyPage, and rendering the foot's copy as well drew the
   * callout twice on the site's biggest blog page — caught by counting
   * [data-scholarship-callout] in the served HTML, not by reading either file.
   */
  scholarship?: boolean;
}) {
  const pathname = usePathname() || "/";

  // "/for/shift-workers" -> "for_shift_workers". Stable, readable in GA4, and
  // distinguishable from the rails that already sit inside specific pages.
  const source = `article${pathname.replace(/\//g, "_").replace(/-/g, "_")}`;

  return (
    <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">
      {/* PROOF BEFORE THE PRICES, added 2026-09-21, and this is the homepage's
          change inherited rather than copied.
 
          The homepage's fix was never "delete the rail" — it was that a choice
          between tiers must come AFTER something has earned it. Here the reader
          has just finished the argument, so the choice is earned; what was
          missing is the evidence beside it. These pages showed a price list
          with nothing to believe.
 
          NOT the three pillars. Those replaced the homepage grid because the
          homepage had not said what coaching is yet. This page just spent an
          article saying it. Measured 28d to 2026-09-20: this rail drew 7
          impressions and zero offer_select across ~71 pages, so the module was
          never the defect — almost nobody reaches the foot. Proof here is worth
          having for the few who do; it is not a claim that it fixes reach. */}
      {hasClientResults ? (
        <div className="mb-12 md:mb-16">
          <ProofRail
            results={clientResults.slice(0, 3)}
            aggregate={aggregateProof.slice(0, 3)}
            source={`${source}_proof`}
          />
        </div>
      ) : null}

      {/* No Kris chat card here (removed 2026-10-07): ~18 users saw it across
          the article kit 10-02 -> 10-07 and none clicked, it was the second
          "Ask Kris" control on every article (tests/e2e/site.spec.ts), and it
          pushed /for/busy-professionals past its 10-screen budget. It stays
          on /packages, at the "which option fits?" moment. */}

      {/* The heading must not repeat the eyebrow. OfferRail's own eyebrow is
          already "Ways to work with Kris", and setting the same words as the
          heading printed them twice, one above the other, on all 152 pages. */}
      <OfferRail
        items={items}
        source={source}
        heading="Pick the one that fits your week."
        subheading="You have read the argument. These are the options, and whichever one you pick carries into the application."
      />

      {/* AFTER the offers, not before. A reader who is ready picks a tier; the
          exit is for the larger number who are not, and putting it first would
          send them away from the thing they were about to read. */}
      {exit ? (
        <>
          {scholarship ? (
            <div className="mt-14">
              <ScholarshipCallout sourcePath={pathname} />
            </div>
          ) : null}
          <div className="mt-12">
            <KeepGoing position={source} />
          </div>
        </>
      ) : null}
    </div>
  );
}

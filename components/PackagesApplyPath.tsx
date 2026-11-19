"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { RailFaq, RailList, type RailFaqItem, type RailListItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  PACKAGES_APPLY_PATH_EXPERIMENT_ID,
  packagesApplyPathVariant,
  type PackagesApplyPathVariant,
} from "@/lib/packagesApplyPathExperiment";
import { formatUsd, offer } from "@/lib/offerCatalog";
import { applyPackageHref } from "@/lib/packageIntent";
import { aggregateProof, clientResults } from "@/data/clientResults";

const SOURCE = "packages_apply_path";

/**
 * The two named results shown beside the prices. Picked by id from the
 * permissioned results file, never retyped, so a number here can only be a
 * number a client gave. Both are on /results with their screenshots.
 */
const PROOF_IDS = [
  "justin-online-2-months-10-lbs",
  "jon-miller-6-months-first-pull-ups",
] as const;

function clientLine(id: string): RailListItem | null {
  const r = clientResults.find((c) => c.id === id && c.permission === "explicit");
  if (!r) return null;
  const who = [r.name, r.age, r.coachingLength].filter(Boolean).join(" · ");
  return {
    id: r.id,
    title: `“${r.homepageQuote ?? r.quote}”`,
    description: who,
    href: `/results#${r.id}`,
    chevron: true,
  };
}

const NEXT_STEPS: RailListItem[] = [
  {
    id: "apply",
    icon: "check",
    title: "1. A two-minute application",
    description: "Your goal, where you are now, and your budget. No payment.",
  },
  {
    id: "call",
    icon: "check",
    title: "2. A free 15-minute call with Kris",
    description: "If it looks like a fit, you pick a time on his calendar.",
  },
  {
    id: "decide",
    icon: "check",
    title: "3. You decide on the call",
    description: "Kris tells you which plan fits. You take it or you don't.",
  },
];

/** "$400", straight from the catalog; the rate words are added by the copy. */
function amount(id: string): string {
  const usd = offer(id).pricing.amountUsd;
  if (usd === undefined) throw new Error(`packages apply path: "${id}" has no price`);
  return formatUsd(usd);
}

// The questions qualified DM leads actually send about money, 07-01 -> 10-07:
// "how much", "can't afford it", "does the call cost". Every price is read
// from the catalog; the answers state only what other pages already state.
//
// Two, not three. "Do I have to pick a package before I apply?" was cut on
// 2026-10-13: the page FAQ already asks it ("Can I apply if I am not sure
// which package fits?"), the copy above the cards already says it, and the
// row put this arm 0.16 screens over the /packages height budget it shares
// with the control (homepage-density.spec.ts). The steps list lost its own
// heading for the same reason: the section h2 already says "what happens
// next".
const OBJECTIONS: RailFaqItem[] = [
  {
    id: "call_cost",
    question: "Do I pay anything to talk to Kris?",
    answer: (
      <p>
        No. The application and the 15-minute call are free. You only pay once
        you choose a plan, and you choose it after the call.
      </p>
    ),
  },
  {
    id: "too_much",
    question: `What if ${amount("standard-check-in")} a month is too much right now?`,
    answer: (
      <p>
        Then daily 1:1 is not the place to start. Weekly Review starts at{" "}
        {amount("weekly-review")} a month, a single call with Kris is{" "}
        {amount("one-time-consultation")}, and the community is{" "}
        {amount("science-based-community")} a month. Pick &ldquo;not
        sure&rdquo; in the application and Kris will point you to the one that
        fits your budget.
      </p>
    ),
  },
];

export function PackagesDecisionBlock() {
  const proof = PROOF_IDS.map(clientLine).filter(
    (item): item is RailListItem => item !== null,
  );
  const aggregate = aggregateProof[0];

  return (
    <section
      aria-labelledby="packages-apply-path-heading"
      className="mt-10"
      data-packages-apply-path
    >
      <p className="eyebrow text-cloudText">Before you tap Apply</p>
      <h2
        id="packages-apply-path-heading"
        className="display mt-1 text-[24px] leading-[1.1] text-bone md:text-[30px]"
      >
        Who it worked for, and what happens next.
      </h2>

      {aggregate && (
        <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.55] text-bone/85">
          <strong className="text-bone">{aggregate.value}</strong>{" "}
          {aggregate.detail.charAt(0).toLowerCase() + aggregate.detail.slice(1)}
        </p>
      )}

      <RailList
        className="mt-4"
        items={proof}
        source={`${SOURCE}_proof`}
        onSelect={({ id }) =>
          trackClientEvent("item_click", {
            item_id: id,
            list_name: `${SOURCE}_proof`,
          })
        }
      />

      <RailList
        className="mt-6"
        items={NEXT_STEPS}
        source={`${SOURCE}_steps`}
      />

      <div className="mt-5">
        <Link
          href={applyPackageHref("undecided_1on1")}
          className="btn btn-primary"
          data-cta="packages_apply_path_primary"
        >
          Start the two-minute application
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <RailFaq
        className="mt-8"
        heading="Questions about the price"
        items={OBJECTIONS}
        source={`${SOURCE}_objections`}
        onSelect={({ id, open }) => {
          if (open) {
            trackClientEvent("content_interaction", {
              interaction_id: `${SOURCE}_objections:${id}`,
              interaction_type: "disclosure",
            });
          }
        }}
      />
    </section>
  );
}

/**
 * The packages_apply_path_v1 split.
 *
 * Wraps the page body so every link click inside it carries experiment_id and
 * variant (GoogleAnalytics.tsx reads the nearest data-analytics-experiment).
 * The slots below swap content by arm after mount, all of it below the price
 * table and out of the first screen.
 */
export function PackagesApplyPathScope({ children }: { children: ReactNode }) {
  const variant = usePackagesApplyPathVariant();
  return (
    <div
      data-analytics-experiment={PACKAGES_APPLY_PATH_EXPERIMENT_ID}
      data-analytics-variant={variant ?? "unassigned"}
    >
      {children}
    </div>
  );
}

/**
 * One slot that differs by arm. Until the arm is known (server render, first
 * paint) it shows `a`, so the control page is what crawlers read.
 */
export function PackagesApplyPathSlot({ a, b }: { a: ReactNode; b: ReactNode }) {
  const variant = usePackagesApplyPathVariant();
  return <>{variant === "b" ? b : a}</>;
}

// One assignment, one exposure, however many components ask for the arm.
let assigned: PackagesApplyPathVariant | null = null;
let exposureSent = false;

function usePackagesApplyPathVariant(): PackagesApplyPathVariant | null {
  const [variant, setVariant] = useState<PackagesApplyPathVariant | null>(null);
  useEffect(() => {
    // Assigning persists the arm, so it cannot run during render: it would
    // bucket a visitor as a side effect of rendering and differ between
    // server and client. Same deferral as CalendarStrip.
    assigned ??= packagesApplyPathVariant();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(assigned);
    if (!exposureSent) {
      exposureSent = true;
      trackClientEvent("experiment_exposure", {
        experiment_id: PACKAGES_APPLY_PATH_EXPERIMENT_ID,
        variant: assigned,
      });
    }
  }, []);
  return variant;
}

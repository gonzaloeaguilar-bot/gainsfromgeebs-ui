"use client";

import { useState } from "react";
import Image from "next/image";
import { Rail, type RailItem } from "@/vendor/rail-kit";
import RailProgress from "@/components/RailProgress";
import RailSweep from "@/components/RailSweep";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_CARD_HEADING, RAIL_CTA, RAIL_LABELS } from "@/lib/railConfig";
import type { AggregateProof, ClientResult } from "@/data/clientResults";
import { clientMetaLabel } from "@/lib/clientMeta";

type Props = {
  results: ClientResult[];
  aggregate: AggregateProof[];
  source: string;
};

/**
 * Client proof as a rail: the tracked-average stat first, then the individual
 * results. Quotes are rendered verbatim — this component chooses layout, never
 * wording, and never adds a claim the data file does not carry.
 */
export default function ProofRail({ results, aggregate, source }: Props) {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const items: RailItem[] = results.map((result) => {
    const common = {
      id: result.id,
      // Not "/results": on the proof page itself that reloaded the page the
      // reader is already on, eight cards deep. Each card goes to its own
      // story, and the fold containing it opens on the hash.
      href: `/results#${result.id}`,
      title: result.headline,
      badge: result.coachingLength,
      subtitle: clientMetaLabel(result),
      description: `“${result.homepageQuote ?? result.quote}”`,
      cta: "See the full story",
    };

    return result.screenshot
      ? {
          ...common,
          kind: "media" as const,
          image: {
            src: result.screenshot,
            alt: `${result.name}'s coaching result shared with permission`,
          },
          media: (
            <Image
              className="rail-card__image"
              src={result.screenshot}
              alt={`${result.name}'s coaching result shared with permission`}
              width={result.screenshotWidth ?? 589}
              height={result.screenshotHeight ?? 1280}
              sizes="(max-width: 700px) 86vw, 340px"
            />
          ),
        }
      : { ...common, kind: "text" as const, glyph: null };
  });

  return (
    <RailSweep>
      {aggregate[0] && (
        <p className="mb-6 flex max-w-[720px] items-baseline gap-3 text-mute md:mb-8">
          <strong className="display shrink-0 text-[38px] leading-none text-bone md:text-[46px]">
            {aggregate[0].value}
          </strong>
          <span className="text-[14px] leading-[1.55] md:text-[15px]">
            {aggregate[0].detail}
          </span>
        </p>
      )}
      <Rail
        className="rail--proof"
        items={items}
        source={source}
        cta={RAIL_CTA}
        titleAs={RAIL_CARD_HEADING}
        labels={RAIL_LABELS}
        size="lg"
        showControls
        descriptionLines={2}
        highlightId={results[0]?.id}
        progressSlot={
          <RailProgress
            seen={seen.size}
            total={items.length}
            label="results seen"
          />
        }
        onCardView={({ id, index }) => {
          setSeen((previous) =>
            previous.has(id) ? previous : new Set(previous).add(id),
          );
          trackClientEvent("proof_card_view", {
            rail_source: source,
            proof_id: id,
            card_index: index + 1,
          });
        }}
        onSelect={({ id, index, cardsViewed }) =>
          trackClientEvent("proof_select", {
            rail_source: source,
            proof_id: id,
            card_index: index + 1,
            cards_viewed: cardsViewed,
          })
        }
      />
    </RailSweep>
  );
}

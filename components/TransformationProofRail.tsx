"use client";

import Image from "next/image";
import { useState } from "react";
import { Rail, type RailItem } from "@/vendor/rail-kit";
import RailProgress from "@/components/RailProgress";
import RailSweep from "@/components/RailSweep";
import { clientTransformationProof } from "@/data/clientResults";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_CARD_HEADING, RAIL_LABELS } from "@/lib/railConfig";

const SOURCE = "coaching_transformation_proof";

/**
 * Reuses the shared Rail instead of another hand-rolled carousel. It tracks
 * exposure, individual cards viewed, and result-library selections using the
 * same proof event contract as the existing site proof rail.
 */
export default function TransformationProofRail() {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const items: RailItem[] = clientTransformationProof.slice(0, 5).map((result) => {
    const photo = result.photos[0];
    if (!photo) {
      throw new Error(`Transformation proof ${result.id} has no lead photo.`);
    }

    return {
      id: result.id,
      kind: "media",
      href: `/results#${result.id}`,
      title: result.headline,
      subtitle: `${result.name} · shared with permission`,
      badge: photo.label,
      image: { src: photo.src, alt: photo.alt },
      media: (
        <Image
          className="rail-card__image"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 700px) 86vw, 340px"
        />
      ),
      cta: "Read the full result",
    };
  });

  return (
    <div data-section="coaching-transformation-proof">
      <RailSweep>
        <Rail
          className="rail--proof"
          items={items}
          source={SOURCE}
          cta="link"
          titleAs={RAIL_CARD_HEADING}
          labels={RAIL_LABELS}
          size="lg"
          variant="poster"
          showControls
          ariaLabel="Client transformation photos"
          highlightId={items[0]?.id}
          progressSlot={<RailProgress seen={seen.size} total={items.length} label="results seen" />}
          onImpression={({ itemCount }) =>
            trackClientEvent("proof_rail_impression", {
              rail_source: SOURCE,
              proof_count: itemCount,
            })
          }
          onCardView={({ id, index }) => {
            setSeen((previous) =>
              previous.has(id) ? previous : new Set(previous).add(id),
            );
            trackClientEvent("proof_card_view", {
              rail_source: SOURCE,
              proof_id: id,
              card_index: index + 1,
            });
          }}
          onSelect={({ id, index, cardsViewed }) =>
            trackClientEvent("proof_select", {
              rail_source: SOURCE,
              proof_id: id,
              card_index: index + 1,
              cards_viewed: cardsViewed,
            })
          }
        />
      </RailSweep>
    </div>
  );
}

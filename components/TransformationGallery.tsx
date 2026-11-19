import Image from "next/image";
import { clientTransformationProof } from "@/data/clientResults";

/**
 * The client transformation photos, shown as photos.
 *
 * One component, two surfaces: the /results hero and the homepage proof
 * section. It exists because the photos are the evidence a visitor actually
 * came for, and a second hand-rolled copy on the homepage would drift from
 * this one the first time either page changed.
 *
 * Phones swipe one card at a time with the next card peeking, so the swipe is
 * discoverable without an arrow; desktop lays them out. No client JS: the
 * scroller is CSS scroll-snap.
 */
export default function TransformationGallery({
  limit,
  priority = false,
  columns = 2,
}: {
  /** Show only the first N photos. Omit for all of them. */
  limit?: number;
  /** Set on the surface where this is the largest above-the-fold image. */
  priority?: boolean;
  columns?: 2 | 3;
}) {
  const photos = clientTransformationProof
    .flatMap((item) =>
      item.photos.map((photo) => ({ item, photo })),
    )
    .slice(0, limit ?? undefined);

  if (!photos.length) return null;

  return (
    <ul
      aria-label="Client transformation photos"
      tabIndex={0}
      className={`results-gallery -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 ${
        columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {photos.map(({ item, photo }, index) => (
        <li
          key={`${item.id}-${photo.id}`}
          className="w-[64vw] shrink-0 snap-center sm:w-[52vw] md:w-auto"
        >
          <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-line2 bg-black/20">
            {/* A fixed frame, because the sources are screenshots with
                different aspect ratios and a rail of ragged cards reads as an
                accident. The photo fills the frame and the caption line sits
                at the same height on every card. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                columns === 3
                  ? "(max-width: 768px) 64vw, 340px"
                  : "(max-width: 768px) 64vw, 400px"
              }
              priority={priority && index === 0}
              className="object-cover object-top"
            />
            </div>
            <figcaption className="mt-auto border-t border-line2 px-4 py-3">
              <span className="block text-[13.5px] leading-[1.45] text-bone/90">
                {item.headline}
              </span>
              <span className="mt-1 block text-[12px] text-mute2">
                {item.name}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

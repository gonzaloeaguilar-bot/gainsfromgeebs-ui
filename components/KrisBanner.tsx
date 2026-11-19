import Image from "next/image";

/**
 * A wide, tight crop of a real Kris photo, for the top of a long page.
 *
 * KrisMediaFigure is a 4:5 portrait card, which is the right shape for a visual
 * break halfway down a page and the wrong one for the first screen: on a phone
 * it is 480px tall and pushes the answer off the screen. This is the same photo
 * cropped to a banner, with the crop point chosen per photo so there is no dead
 * space above the head (the standing Kris crop rule).
 *
 * Real photographs only: callers pass a path under /media/kris.
 */
export default function KrisBanner({
  src,
  alt,
  caption,
  position = "50% 30%",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  /** CSS object-position: where in the photo the crop is anchored. */
  position?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-lg border border-line2 bg-black/20 ${className}`}
      data-kris-banner
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) calc(100vw - 48px), 860px"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <figcaption className="px-4 py-3 text-[13px] leading-[1.5] text-mute2">
        {caption}
      </figcaption>
    </figure>
  );
}

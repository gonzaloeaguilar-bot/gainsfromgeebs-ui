import Image from "next/image";

type KrisMediaFigureProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export default function KrisMediaFigure({
  src,
  alt,
  caption,
  className = "",
  imageClassName = "object-cover",
  sizes = "(max-width: 768px) calc(100vw - 48px), 720px",
}: KrisMediaFigureProps) {
  return (
    <figure
      className={`overflow-hidden rounded-lg border border-line2 bg-black/20 ${className}`}
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClassName}
        />
      </div>
      <figcaption className="border-t border-line2 px-4 py-3 text-[13px] leading-[1.55] text-mute2">
        {caption}
      </figcaption>
    </figure>
  );
}


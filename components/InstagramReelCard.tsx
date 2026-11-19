import InstagramEmbedFrame from "@/components/InstagramEmbedFrame";
import type { TrainingReel } from "@/data/trainingReels";

type InstagramReelCardProps = {
  reel: TrainingReel;
  compact?: boolean;
};

export default function InstagramReelCard({
  reel,
  compact = false,
}: InstagramReelCardProps) {
  const embedUrl = `${reel.url}embed/`;

  return (
    <article className="tcard reveal flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-cloudText">{reel.label}</p>
          <p className="text-[12px] leading-[1.4] text-mute2">
            {reel.placement}
          </p>
        </div>
        <h3
          className={
            compact
              ? "display mt-4 text-[24px] leading-[1.15] text-bone"
              : "display mt-5 text-[23px] md:text-[26px] leading-[1.15] text-bone"
          }
        >
          {reel.title}
        </h3>
        <p className="mt-4 text-[14.5px] md:text-[15px] leading-[1.65] text-mute">
          {reel.body}
        </p>
      </div>

      <div className="mt-6 -mx-7 overflow-hidden border-y border-line2 bg-black/30">
        <InstagramEmbedFrame
          src={embedUrl}
          title={`Instagram Reel: ${reel.title}`}
        />
      </div>

      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center text-[14px] font-semibold text-bone underline decoration-line2 underline-offset-4 hover:decoration-bone"
      >
        Open on Instagram <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

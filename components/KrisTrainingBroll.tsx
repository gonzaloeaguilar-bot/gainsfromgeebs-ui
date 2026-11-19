const videos = [
  {
    src: "/media/kris/videos/kris-oddo-lat-pulldown-broll.mp4",
    poster: "/media/kris/videos/kris-oddo-lat-pulldown-broll.jpg",
    label: "Machine pull-down work",
  },
  {
    src: "/media/kris/videos/kris-oddo-seated-row-broll.mp4",
    poster: "/media/kris/videos/kris-oddo-seated-row-broll.jpg",
    label: "Seated cable training",
  },
  {
    src: "/media/kris/videos/kris-oddo-dumbbell-training-broll.mp4",
    poster: "/media/kris/videos/kris-oddo-dumbbell-training-broll.jpg",
    label: "Dumbbell accessory work",
  },
];

type KrisTrainingBrollProps = {
  className?: string;
};

export default function KrisTrainingBroll({
  className = "",
}: KrisTrainingBrollProps) {
  return (
    <section
      aria-labelledby="kris-training-broll-title"
      className={`grid gap-5 ${className}`}
    >
      <div className="max-w-[680px]">
        <p className="eyebrow text-cloudText">Training context</p>
        <h2
          id="kris-training-broll-title"
          className="display mt-3 text-[26px] md:text-[34px] leading-[1.08] text-bone"
        >
          Real gym work behind the method.
        </h2>
        <p className="mt-4 text-[16px] md:text-[16.5px] leading-[1.7] text-mute max-w-[62ch]">
          Clips from Kris&apos;s own training. This is the work he coaches,
          not stock footage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {videos.map((video) => (
          <figure
            key={video.src}
            className="overflow-hidden rounded-lg border border-line2 bg-black/20"
          >
            <video
              className="aspect-[9/16] w-full object-cover"
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="metadata"
              controls
            />
            <figcaption className="border-t border-line2 px-4 py-3 text-[12px] uppercase tracking-[0.12em] text-mute2">
              {video.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

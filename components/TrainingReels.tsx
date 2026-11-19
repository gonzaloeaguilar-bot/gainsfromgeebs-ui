import InstagramReelCard from "@/components/InstagramReelCard";
import { trainingReels } from "@/data/trainingReels";

const IG_PROFILE_URL = "https://instagram.com/gainsfromgeebs";

export default function TrainingReels() {
  return (
    <section aria-labelledby="reels-title" className="relative">
      <div className="mx-auto max-w-[1260px] px-6 md:px-10 section-y">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 reveal">
            <p className="eyebrow text-mute2">Training reels</p>
            <h2
              id="reels-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[12ch]"
            >
              See Kris coach in <span className="display-accent">context</span>.
            </h2>
          </div>
          <div className="md:col-span-7 reveal border-y border-line2 py-7">
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-bone/85 max-w-[52ch]">
              Four curated clips, not an auto-feed. These are the ones that
              best show the coaching texture: consistency, progressive overload,
              practical training, and form correction.
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.65] text-mute max-w-[52ch]">
              Each clip plays right here, and each one links back to the post on
              Instagram if you want the comments.
            </p>
            <div className="mt-6">
              <a
                href={IG_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Watch Kris on Instagram
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* A rail, not a stack: four embeds side by side is one screen of
            height instead of four. Uses the shared rail scroller so the snap,
            edge fade and hidden scrollbar match every other rail on the site. */}
        <div className="rail__scroller mt-12 -mx-6 px-6 md:mx-0 md:px-0">
          {trainingReels.map((reel) => (
            <div
              key={reel.id}
              className="w-[82vw] shrink-0 snap-start sm:w-[360px]"
            >
              <InstagramReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

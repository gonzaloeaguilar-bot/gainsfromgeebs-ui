import Image from "next/image";

const coachingPhotos = [
  {
    src: "/coaching/kris-client-coaching-close.jpg",
    alt: "Kris Oddo watching a client use a chest press machine and cueing hand position during a training session",
    label: "Form cues in real time",
    figureClassName: "sm:col-span-3 sm:row-span-2",
    frameClassName: "aspect-[4/5] sm:aspect-auto sm:flex-1",
    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 60vw, 42vw",
  },
  {
    src: "/coaching/kris-client-form-cues.jpg",
    alt: "Kris Oddo giving a client close form guidance on a gym machine during a coaching session",
    label: "Real coaching context",
    figureClassName: "sm:col-span-2",
    frameClassName: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 40vw, 28vw",
  },
  {
    src: "/coaching/kris-client-training-session.jpg",
    alt: "Kris Oddo smiling with a client during a gym training session",
    label: "A coach who knows you",
    figureClassName: "sm:col-span-2",
    frameClassName: "aspect-[4/5]",
    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 40vw, 28vw",
  },
];

export default function CoachingPhotos() {
  return (
    <section aria-labelledby="coaching-photos-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4 reveal">
            <p className="eyebrow text-mute2">Real coaching context</p>
            <h2
              id="coaching-photos-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[12ch]"
            >
              Real eyes on <span className="display-accent">the work</span>.
            </h2>
            <p className="mt-6 text-[15.5px] md:text-[16.5px] text-mute leading-[1.65] max-w-[36ch]">
              Whether it is a local session, a form video, or a daily text
              inside FitBudd, Kris is looking at what is actually happening and
              changing the plan from there.
            </p>
            <div className="mt-8 hair max-w-[260px]" />
            <p className="mt-5 text-[13px] text-mute2 leading-[1.65] max-w-[34ch]">
              These photos show coaching context only. They are not client
              transformation claims or promised outcomes.
            </p>
          </div>

          {/* min-w-0 is load-bearing, not tidiness. A grid item defaults to
              min-width:auto, so this column was sized by its content: a flex
              row of three 76vw photos forced the track to 935px on a 375px
              viewport. The section's overflow-hidden then clipped it, so the
              strip looked like a carousel, had no internal overflow to scroll
              (scrollWidth === clientWidth === 935), and the third photo was
              unreachable by any gesture. Reported as "it's static there, I'm
              unable to flip it", and that is exactly what it was. */}
          <div className="md:col-span-8 reveal min-w-0">
            {/* A rail on phones, the original mosaic from sm up: three stacked
                340px photos were a third of this section's height.

                It used to borrow `.rail__scroller` from the rail kit for the
                phone layout. That class sets `display: flex` at the same
                specificity Tailwind's `sm:grid` uses and is declared later, so
                flex won at EVERY width and the mosaic never came back above the
                breakpoint. Measured on production at 1200px: `display: flex`.
                Nine months of desktop visitors saw a sideways strip that was
                only ever meant for a phone. Plain utilities now, so the
                breakpoint decides.

                `tabIndex` and the label are not decoration: a scrollable region
                whose only contents are images has nothing to tab to, so a
                keyboard user could not reach the second or third photo at all.
                axe reports it as `scrollable-region-focusable`, serious, and it
                is live right now. */}
            <div
              role="group"
              aria-label="Coaching context photos"
              tabIndex={0}
              className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudText sm:mx-0 sm:grid sm:grid-cols-5 sm:grid-rows-2 sm:items-stretch sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5"
            >
              {coachingPhotos.map((photo) => (
                <figure
                  key={photo.src}
                  className={`${photo.figureClassName} flex h-full w-[76vw] shrink-0 snap-start flex-col sm:w-auto`}
                >
                  <div className={`photo-slot relative w-full min-h-[260px] sm:min-h-[340px] overflow-hidden rounded-2xl border border-line2 bg-ink2 ${photo.frameClassName}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={photo.sizes}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[12px] tracking-[0.12em] uppercase text-mute2">
                    {photo.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

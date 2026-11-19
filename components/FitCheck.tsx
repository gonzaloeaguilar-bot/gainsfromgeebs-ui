const goodFit = [
  "You can train 3-5 days most weeks, even if the schedule is messy.",
  "You want a coach looking at your food, training, sleep, and follow-through.",
  "You are ready for a 3-6 month block, not another two-week reset.",
];

const notFit = [
  "You only want a cheap template or a plan to ignore privately.",
  "You will not answer check-ins, send context, or tell the truth when the week breaks.",
  "You need a quick fix before you are ready to change the routine that caused the problem.",
];

export default function FitCheck() {
  return (
    <section aria-labelledby="fit-check-title" className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 reveal">
            <p className="eyebrow text-mute2">Fit check</p>
            <h2
              id="fit-check-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[12ch]"
            >
              Who this is <span className="display-accent">actually for</span>.
            </h2>
            <p className="mt-6 text-[15.5px] md:text-[16.5px] text-mute leading-[1.65] max-w-[36ch]">
              The application exists so nobody wastes a call. 1:1 works when
              the client wants direct coaching, not just another file to
              download.
            </p>
          </div>

          <div className="md:col-span-8 reveal grid gap-6 sm:grid-cols-2">
            <FitList title="Strong fit" items={goodFit} />
            <FitList title="Not the fit" items={notFit} muted />
          </div>
        </div>
      </div>
    </section>
  );
}

function FitList({
  title,
  items,
  muted = false,
}: {
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <article className="border-y border-line2 py-6">
      <h3 className="display text-[24px] md:text-[28px] leading-[1.1] text-bone">
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-[1.6]">
            <span
              aria-hidden="true"
              className={muted ? "text-mute2" : "text-cloudText"}
            >
              →
            </span>
            <span className={muted ? "text-mute" : "text-bone/85"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

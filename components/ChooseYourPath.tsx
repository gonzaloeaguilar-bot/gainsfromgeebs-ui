export default function ChooseYourPath() {
  return (
    <section aria-labelledby="path-title" className="relative bg-ink2/40">
      <svg
        className="cloud-tiny"
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ top: "5%", left: "3%", ["--cloud-size" as string]: "100px", transform: "rotate(20deg)" }}
      >
        <path
          fill="currentColor"
          d="M30 110 Q10 100 15 80 Q5 60 25 50 Q30 25 60 30 Q75 10 100 25 Q125 5 145 30 Q175 25 180 55 Q195 75 175 95 Q180 115 150 115 L30 110 Z"
        />
      </svg>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">

        <div className="text-center reveal mb-14 md:mb-20">
          <p className="eyebrow text-mute2">Choose your path</p>
          <h2
            id="path-title"
            className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone"
          >
            Three ways to <span className="display-accent">start</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">

          {/* Card 1 — 1:1 */}
          <article className="pathcard reveal relative rounded-2xl border border-line2 bg-ink3/60 p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-cloudText">Full access</span>
              <span aria-hidden="true" className="text-mute2 text-[11px] tracking-[0.16em]">PRIMARY</span>
            </div>
            <h3 className="display mt-7 text-[30px] md:text-[38px] text-bone leading-[1.02]">
              1:1 Online <br />Coaching
            </h3>
            <p className="mt-5 text-[15.5px] text-mute leading-[1.6] max-w-[40ch]">
              Custom programming, daily accountability, and direct access to Kris. Three tiers — VIP, Standard Check-In, and Weekly Review. Application required.
            </p>

            <div className="hair my-8" />

            <ul className="text-[14px] text-mute space-y-2 mb-10">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Custom training &amp; nutrition
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Daily accountability texts
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Direct messaging with Kris
              </li>
            </ul>

            <a href="/apply" className="btn btn-primary self-start mt-auto">
              Apply
              <span aria-hidden="true">→</span>
            </a>
          </article>

          {/* Card 2 — one-time consult */}
          <article className="pathcard reveal relative rounded-2xl border border-line2 bg-ink3/60 p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-bone/70">One-time</span>
              <span aria-hidden="true" className="text-mute2 text-[11px] tracking-[0.16em]">$100</span>
            </div>
            <h3 className="display mt-7 text-[30px] md:text-[38px] text-bone leading-[1.02]">
              Consultation <br />Call
            </h3>
            <p className="mt-5 text-[15.5px] text-mute leading-[1.6] max-w-[40ch]">
              Not ready for monthly coaching, but you want Kris&apos;s eyes on the problem now.
            </p>

            <div className="hair my-8" />

            <ul className="text-[14px] text-mute space-y-2 mb-10">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                A focused 45-minute Zoom with Kris
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                A real diagnosis, not a template
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Clear next-step direction
              </li>
            </ul>

            <a href="/apply?package=consultation_call" className="btn btn-secondary self-start mt-auto">
              Book one-time guidance
              <span aria-hidden="true">&rarr;</span>
            </a>
          </article>

          {/* Card 3 — community */}
          <article className="pathcard reveal relative rounded-2xl border border-line2 bg-ink3/60 p-7 md:p-10 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-bone/70">Lowest commitment</span>
              <span aria-hidden="true" className="text-mute2 text-[11px] tracking-[0.16em]">$24.99/MO</span>
            </div>
            <h3 className="display mt-7 text-[30px] md:text-[38px] text-bone leading-[1.02]">
              Science-Based <br />Community
            </h3>
            <p className="mt-5 text-[15.5px] text-mute leading-[1.6] max-w-[40ch]">
              A practical Telegram community for lifters who want useful discussion and shared accountability.
            </p>

            <div className="hair my-8" />

            <ul className="text-[14px] text-mute space-y-2 mb-10">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Training, nutrition, and research discussion
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Shared accountability with other lifters
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cloud inline-block" />
                Monthly, cancel any time
              </li>
            </ul>

            <a href="/memberships/science-based-community" className="btn btn-secondary self-start mt-auto">
              See the community
              <span aria-hidden="true">&rarr;</span>
            </a>
          </article>

        </div>
      </div>
    </section>
  );
}

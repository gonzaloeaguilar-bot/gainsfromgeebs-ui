import TickInView from "@/components/TickInView";
const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WhatsIncluded() {
  return (
    <section aria-labelledby="included-title" className="relative">
      <svg
        className="cloud-tiny"
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ top: "8%", right: "4%", ["--cloud-size" as string]: "110px", transform: "rotate(-10deg)" }}
      >
        <path
          fill="currentColor"
          d="M30 110 Q10 100 15 80 Q5 60 25 50 Q30 25 60 30 Q75 10 100 25 Q125 5 145 30 Q175 25 180 55 Q195 75 175 95 Q180 115 150 115 L30 110 Z"
        />
      </svg>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5 reveal">
            <p className="eyebrow text-mute2">The service</p>
            <h2
              id="included-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[14ch]"
            >
              What you get with{" "}
              <span className="display-accent">1:1 coaching</span>.
            </h2>
            <p className="mt-6 text-[15.5px] text-mute leading-[1.65] max-w-[34ch]">
              One coach. One system. Built around your week, not someone else&apos;s template.
            </p>
          </div>

          <TickInView>
            <ul className="md:col-span-7 reveal">

              <li className="flex items-start gap-5 py-6 border-t border-line">
                <span aria-hidden="true" className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cloudText/15 text-cloudText">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">Custom training program</h3>
                  <p className="mt-1.5 text-[15px] text-mute leading-[1.55]">Built around your gym access, training history, and recovery.</p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6 border-t border-line">
                <span aria-hidden="true" className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cloudText/15 text-cloudText">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">Nutrition guidance</h3>
                  <p className="mt-1.5 text-[15px] text-mute leading-[1.55]">Specific to your work and life, not generic macros.</p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6 border-t border-line">
                <span aria-hidden="true" className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cloudText/15 text-cloudText">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">Daily accountability</h3>
                  <p className="mt-1.5 text-[15px] text-mute leading-[1.55]">Morning plan, meal timing, training window, sleep and recovery checked against your actual schedule.</p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6 border-t border-line">
                <span aria-hidden="true" className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cloudText/15 text-cloudText">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">Weekly check-in calls</h3>
                  <p className="mt-1.5 text-[15px] text-mute leading-[1.55]">Kris reviews the data with you and adjusts the next week from what actually happened.</p>
                </div>
              </li>

              <li className="flex items-start gap-5 py-6 border-t border-b border-line">
                <span aria-hidden="true" className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cloudText/15 text-cloudText">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="text-bone text-[17px] md:text-[18px] font-semibold tracking-[-0.005em]">FitBudd app and exercise demos</h3>
                  <p className="mt-1.5 text-[15px] text-mute leading-[1.55]">Your program, tracking, messaging, and lift demos live in one place.</p>
                </div>
              </li>

            </ul>
          </TickInView>
        </div>
      </div>
    </section>
  );
}

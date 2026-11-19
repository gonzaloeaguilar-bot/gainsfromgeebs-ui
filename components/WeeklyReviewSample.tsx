const reviewRows = [
  ["Training", "3 of 4 sessions complete", "Move lower day to Saturday; keep top sets the same."],
  ["Nutrition", "Protein hit 5 of 7 days", "Add one default breakfast so work mornings stop leaking."],
  ["Recovery", "Sleep dipped after late work nights", "Pull one accessory set until sleep is back above baseline."],
  ["Next week", "Keep the plan boring", "Repeat the week with fewer missed meals, not a harder split."],
];

export default function WeeklyReviewSample() {
  return (
    <section aria-labelledby="review-sample-title" className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4 reveal">
            <p className="eyebrow text-mute2">Weekly review</p>
            <h2
              id="review-sample-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[13ch]"
            >
              The plan changes from <span className="display-accent">real data</span>.
            </h2>
            <p className="mt-6 text-[15.5px] md:text-[16.5px] text-mute leading-[1.65] max-w-[36ch]">
              The weekly call is not a pep talk. Kris reviews what actually
              happened and adjusts the next week around the constraint.
            </p>
          </div>

          <div className="md:col-span-8 reveal">
            <div className="border-y border-line2">
              {reviewRows.map(([area, signal, adjustment]) => (
                <div
                  key={area}
                  className="grid gap-2 border-b border-line px-0 py-5 last:border-b-0 md:grid-cols-[120px_1fr_1.35fr] md:gap-6"
                >
                  <p className="eyebrow text-cloudText">{area}</p>
                  <p className="text-[15px] leading-[1.6] text-bone/85">
                    {signal}
                  </p>
                  <p className="text-[15px] leading-[1.6] text-mute">
                    {adjustment}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] leading-[1.6] text-mute2">
              Sample structure only. Client details and private check-ins stay private.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

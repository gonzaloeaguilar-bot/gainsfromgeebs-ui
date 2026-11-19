const steps = [
  {
    label: "01",
    title: "Submit the application",
    body: "Choose your goal, where you are now, and the support you want. Add your contact details, then tap Submit application.",
  },
  {
    label: "02",
    title: "Kris reviews fit",
    body: "Age, goal, investment readiness, and whether 1:1 is the right next step.",
  },
  {
    label: "03",
    title: "Book if it makes sense",
    body: "If a call fits, you'll see Kris's calendar. Otherwise, you'll see other ways to get support.",
  },
];

export default function ApplyNextSteps() {
  return (
    <section aria-labelledby="apply-next-title" className="mt-12 md:mt-16">
      <p className="eyebrow text-cloudText">What happens next</p>
      <h2
        id="apply-next-title"
        className="display mt-3 text-bone text-[26px] md:text-[34px] leading-[1.08]"
      >
        No mystery after you submit.
      </h2>
      <ol className="mt-6 grid gap-3">
        {steps.map((step) => (
          <li
            key={step.label}
            className="border-y border-line2 py-4 md:grid md:grid-cols-[72px_1fr] md:gap-5"
          >
            <span className="stepnum text-[34px] md:text-[40px]">
              {step.label}
            </span>
            <span>
              <span className="block text-[16px] md:text-[17px] font-semibold text-bone">
                {step.title}
              </span>
              <span className="mt-1.5 block text-[14.5px] md:text-[15px] leading-[1.6] text-mute">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

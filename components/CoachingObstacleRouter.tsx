import Link from "next/link";

const paths = [
  {
    href: "/resources/bad-week-adjustment-loop?utm_source=coaching&utm_medium=decision_router&utm_campaign=busy_week_reset",
    label: "My week gets too busy",
    description: "Keep a smaller version of the plan alive when work, family, or sleep changes the week.",
    kind: "busy_week_reset",
  },
  {
    href: "/guides/getting-back-in-shape-after-a-long-break?utm_source=coaching&utm_medium=decision_router&utm_campaign=restart",
    label: "I keep restarting",
    description: "Start again without trying to make up for every missed week at once.",
    kind: "restart_guide",
  },
  {
    href: "/tools/body-recomposition-calculator?utm_source=coaching&utm_medium=decision_router&utm_campaign=body_composition",
    label: "I want to change my body composition",
    description: "Get a practical starting point for calories and protein before you decide on support.",
    kind: "body_composition_tool",
  },
  {
    href: "/for/accountability?utm_source=coaching&utm_medium=decision_router&utm_campaign=consistency",
    label: "I know what to do, but I do not stay consistent",
    description: "See what useful accountability looks like when the plan is not the problem.",
    kind: "accountability_guide",
  },
  {
    href: "/for/men-who-travel-for-work?utm_source=coaching&utm_medium=decision_router&utm_campaign=travel",
    label: "Work travel keeps knocking me off track",
    description: "Use training and food rules that still work from a hotel, airport, or changing time zone.",
    kind: "travel_guide",
  },
  {
    href: "/for/former-athletes?utm_source=coaching&utm_medium=decision_router&utm_campaign=former_athlete",
    label: "I used to be the fit one",
    description: "Build your base again without trying to train like you did years ago on day one.",
    kind: "former_athlete_guide",
  },
];

export default function CoachingObstacleRouter() {
  return (
    <section
      className="mt-12 border-y border-line2 py-8 md:mt-16 md:py-10"
      aria-labelledby="coaching-obstacle-router-heading"
      data-analytics-source="coaching_obstacle_router"
    >
      <p className="eyebrow text-cloudText">Start with the actual problem</p>
      <h2
        id="coaching-obstacle-router-heading"
        className="display mt-3 max-w-[24ch] text-[28px] leading-[1.1] text-bone md:text-[36px]"
      >
        What keeps breaking your plan?
      </h2>
      <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
        Pick the situation that sounds most like your week. You can use a free
        answer first, then decide whether coaching would make the next step easier.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {paths.map((path) => (
          <Link
            key={path.kind}
            href={path.href}
            className="group flex min-h-11 flex-col justify-center rounded-lg border border-line2 bg-bone/[0.025] px-4 py-4 transition-colors hover:border-cloudText/60 hover:bg-bone/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloudText"
            data-analytics-link-kind={path.kind}
          >
            <span className="text-[16px] font-semibold leading-[1.3] tracking-normal text-bone">
              {path.label} <span aria-hidden="true">→</span>
            </span>
            <span className="mt-1 text-[14px] leading-[1.55] text-mute">{path.description}</span>
          </Link>
        ))}
      </div>

      <details className="mt-6 max-w-[66ch] border-t border-line2 pt-4 text-[14px] leading-[1.65] text-mute">
        <summary className="cursor-pointer font-semibold text-bone">Prefer to work on it yourself first?</summary>
        <p className="mt-3">
          Start with the free answer that matches your week. If you want a named
          coach to help make the plan work around real constraints, you can apply
          after you have had a look.
        </p>
        <Link
          href="/resources/online-fitness-coaching-fit-check?utm_source=coaching&utm_medium=decision_router&utm_campaign=self_guided_fit_check"
          className="mt-3 inline-block min-h-11 py-2 font-semibold text-bone underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloudText"
          data-analytics-link-kind="coaching_fit_check"
        >
          Take the coaching fit check <span aria-hidden="true">→</span>
        </Link>
      </details>
    </section>
  );
}

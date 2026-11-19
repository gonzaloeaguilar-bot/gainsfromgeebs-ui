import Link from "next/link";
import LinkRail from "@/components/LinkRail";

const moneyLinks = [
  {
    href: "/packages",
    label: "Coaching packages",
    text: "Compare the three 1:1 coaching tiers, the one-time consultation call, and the community.",
  },
  {
    href: "/geebs-method",
    label: "The Geebs Method",
    text: "Kris's named coaching system for hard training, nutrition support, recovery, and imperfect-week accountability.",
  },
  {
    href: "/results",
    label: "Client results",
    text: "Proof from clients who needed accountability, not another plan.",
  },
  {
    href: "/for/online-fitness-coach-for-men",
    label: "Online coach for men",
    text: "The primary 1:1 coaching page for men comparing Geebs with apps, templates, and self-coaching.",
  },
  {
    href: "/personal-training-denver",
    label: "Denver coaching",
    text: "Local intent for people who want Kris in the search result.",
  },
  {
    href: "/for/software-engineers",
    label: "Software engineers",
    text: "Desk-work positioning for developers and tech workers.",
  },
  {
    href: "/for/skinny-fat-men",
    label: "Skinny-fat men",
    text: "A high-intent coaching page for men who need a real recomp plan instead of another bulk-or-cut debate.",
  },
  {
    href: "/for/busy-professionals",
    label: "Busy professionals",
    text: "Time-starved positioning for people balancing work, family, and training.",
  },
];

const toolLinks = [
  {
    href: "/free/goal-tracker",
    label: "Goal weight forecast",
    text: "Estimate calories, macros, time to goal, and weekly adjustment timing.",
  },
  {
    href: "/tools/tdee-calculator",
    label: "TDEE calculator",
    text: "Start with maintenance, cut, recomp, and bulk calories.",
  },
  {
    href: "/tools/macro-calculator",
    label: "Macro calculator",
    text: "Turn calories into protein, carbs, and fats.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    label: "Body recomposition calculator",
    text: "Check whether recomp is realistic and get calorie and protein targets for your current profile.",
  },
  {
    href: "/blog/how-much-protein-to-lose-fat",
    label: "Protein guide",
    text: "Answer the nutrition question most fat-loss plans dodge.",
  },
  {
    href: "/guides/body-recomposition-for-beginners",
    label: "Recomp for beginners",
    text: "The guide for when body recomposition makes sense and what to do first.",
  },
  {
    href: "/blog/body-recomposition-for-men",
    label: "Body recomposition",
    text: "Lose fat and build muscle at the same time, with the recomposition framework.",
  },
  {
    href: "/blog/how-to-fix-skinny-fat",
    label: "How to fix skinny fat",
    text: "The guide for skinny fat men: why bulk-or-cut misses, and what the workout and diet actually look like.",
  },
  {
    href: "/resources/bad-week-adjustment-loop",
    label: "Bad week adjustment loop",
    text: "A reset path for missed workouts, travel, client dinners, and low sleep.",
  },
];

const comparisonLinks = [
  {
    href: "/vs/future",
    label: "Geebs vs Future",
    text: "Coach-led accountability vs app-first training.",
  },
  {
    href: "/vs/caliber",
    label: "Geebs vs Caliber",
    text: "1:1 execution support vs broader fitness-app coaching.",
  },
  {
    href: "/resources/online-fitness-coaching-cost-faq",
    label: "Coaching cost FAQ",
    text: "What changes the price of online coaching and when 1:1 is worth the investment.",
  },
  {
    href: "/guides/how-much-does-an-online-fitness-coach-cost",
    label: "Coach cost guide",
    text: "The promoted buying guide for coaching pricing, investment level, and fit.",
  },
  {
    href: "/guides/what-does-an-online-fitness-coach-do",
    label: "What a coach does",
    text: "Clarify whether you need information, accountability, programming, feedback, or all of it.",
  },
  {
    href: "/vs/fitness-apps",
    label: "Geebs vs fitness apps",
    text: "Compare 1:1 coaching with app-first tools when execution is the real blocker.",
  },
  {
    href: "/blog/best-online-fitness-coaches-for-busy-men",
    label: "Best coaches for busy men",
    text: "The direct guide for busy men comparing named online fitness coaches, platforms, and app-first options.",
  },
  {
    href: "/blog/is-online-fitness-coaching-worth-it",
    label: "Is coaching worth it?",
    text: "A buyer's guide for choosing between apps, self-guided plans, and 1:1 coaching.",
  },
  {
    href: "/vs/chatgpt",
    label: "Geebs vs ChatGPT",
    text: "Why knowing what to do is not the same as doing it.",
  },
];

export default function StartHere() {
  return (
    <section aria-labelledby="start-here-title" className="relative bg-ink/70">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-14">
          <div>
            <p className="eyebrow text-mute2">Browse everything</p>
            <h2
              id="start-here-title"
              className="display mt-4 text-[30px] sm:text-[38px] md:text-[46px] leading-[1.04] text-bone"
            >
              Every page, by the problem it solves.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-mute">
              Still reading rather than applying? Find the page closest to the
              problem in front of you: coaching options, free calculators, or
              an honest comparison against the alternatives.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <LinkRail
              items={moneyLinks}
              source="start_here_proof"
              icon="tag"
              eyebrow="Proof"
            />
            <LinkRail
              items={toolLinks}
              source="start_here_tools"
              icon="calculator"
              eyebrow="Tools"
            />
            <LinkRail
              items={comparisonLinks}
              source="start_here_compare"
              icon="compare"
              eyebrow="Compare"
            />
          </div>
        </div>

        <div className="mt-12 md:mt-14 border-t border-line pt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[14.5px] leading-[1.6] text-mute max-w-[52ch]">
            Free calculators, training guides, and nutrition breakdowns, all in one place.
          </p>
          <Link
            href="/blog"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-line2 px-4 text-[14px] font-medium text-bone/80 transition-colors hover:border-bone/30 hover:text-bone"
          >
            View all articles
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

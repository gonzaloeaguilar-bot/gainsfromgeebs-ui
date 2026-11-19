import { ctaForPath } from "@/lib/ctaCopy";
import Link from "next/link";
import TitanForgeSisterNote from "@/components/TitanForgeSisterNote";
import CoachingDecisionVideo from "@/components/CoachingDecisionVideo";

/** Sole call site is app/page.tsx, so the home surface resolves at module level.
 *  Copy lives in lib/ctaCopy.ts; the stable cta_id rides along as data-cta. */
const HOME_CTA = ctaForPath("/");

/**
 * What coaching with Kris actually is, in three pillars.
 *
 * Replaces the five-tier grid, and the grid's own numbers are why. Measured
 * in GA4 over the 28 days to 2026-09-20, re-checked at source 2026-09-21:
 * the homepage rail fired 31 offer_rail_impression and 124 offer_card_view,
 * and produced TWO offer_select. Across the whole site, three. The homepage
 * drew 483 views in that window, so the rail was seen by well under a tenth
 * of the people who landed on it and converted two of them. It was not a
 * conversion path, it was a question almost nobody reached, sitting in band
 * two above the proof.
 *
 * CORRECTION: the first version of this note said "seen 96 times and produced
 * ONE offer_select". 96 was view_apply on /apply, not a rail number — the
 * wrong row read out of the same report. The rail numbers are above. The
 * decision does not change; the figure was wrong and is not worth inheriting.
 *
 * So the homepage stops asking which tier and starts saying what the thing
 * is. Choosing a tier still happens — on /packages, where the cards now carry
 * a benefit line and a detail sheet, and inside the application, which asks
 * about investment directly.
 *
 * Three pillars and not five, and they link to /geebs-method rather than
 * restating it: that page and /methodology already exist, and a third telling
 * of the same argument is a third place to keep it true.
 *
 * The eyebrow names the method rather than describing the section. Measured on
 * the live homepage 2026-09-26: "The Geebs Method" appeared on / exactly twice,
 * both times as a 14px muted footer link — named in no H1, no H2 and no body
 * copy, while the two competitors running paid traffic at the same ICP put
 * their named system in a heading. The name belongs on the band that IS the
 * method. It replaces a line rather than adding one because
 * homepage-density.spec.ts caps this page at 5260px on a phone and the last
 * measurement left 18px of room.
 */

const PILLARS = [
  {
    title: "Training",
    body: "Built for your week, your equipment and your history, then changed when the week changes.",
  },
  {
    title: "Nutrition",
    body: "Macros you can hit on a Tuesday, not a protocol you abandon by Thursday.",
  },
  {
    title: "Accountability",
    body: "Someone who notices when you go quiet. No plan alone has ever solved that.",
  },
] as const;

export default function HowItWorks({ inBand = false }: { inBand?: boolean }) {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      /* inBand: shares a band with today's tip rather than opening its own.
         The tier grid it replaced did the same, and the homepage's density
         guard counts bands for a reason — a wrapper div is not a section. */
      className={
        inBand
          ? "mt-9 md:mt-12"
          : "mx-auto max-w-[1100px] px-6 py-14 md:px-10 md:py-20"
      }
      data-how-it-works
    >
      <p className="eyebrow text-cloudText">The Geebs Method</p>
      <h2
        id="how-it-works-heading"
        className="display mt-3 text-[28px] leading-[1.08] text-bone md:text-[38px]"
      >
        Three things, handled together.
      </h2>
      <p className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.65] text-mute md:text-[16.5px]">
        <TitanForgeSisterNote placement="home_how_it_works" compact />
      </p>

      {/* On a phone the three stack, so card chrome is 3x padding and 3x
          border for no separation a reader needs — the headings already do
          it. The cards come back at sm, where they sit side by side. */}
      <div className="mt-6 grid gap-4 sm:mt-9 sm:grid-cols-3 sm:gap-5">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="sm:rounded-xl sm:border sm:border-line sm:bg-ink3/40 sm:p-5 md:p-6"
          >
            <h3 className="text-[18px] font-semibold text-bone md:text-[21px]">
              {pillar.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-[1.55] text-mute sm:mt-3 sm:leading-[1.6]">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/apply"
          className="btn btn-primary"
          data-analytics-event="cta_click"
          data-analytics-link-kind="how_it_works_apply"
          data-cta={HOME_CTA.id}
        >
          {HOME_CTA.label}
          <span aria-hidden="true">→</span>
        </Link>
        {/* The plans still exist and are still one tap away. What changed is
            that the homepage no longer opens with a choice between five. */}
        <Link
          href="/packages"
          className="text-[14.5px] text-cloudText underline-offset-4 hover:underline"
          data-analytics-event="cta_click"
          data-analytics-link-kind="how_it_works_packages"
        >
          See the packages and prices
        </Link>
        <Link
          href="/geebs-method"
          className="text-[14.5px] text-mute underline-offset-4 hover:underline"
          data-analytics-event="cta_click"
          data-analytics-link-kind="how_it_works_method"
        >
          The method in full
        </Link>
      </div>

      <CoachingDecisionVideo
        source="homepage_method"
        title="Meet Kris before you decide."
        body="Watch Kris explain what he looks for and what happens after you apply for 1:1 coaching."
        className="mt-8 max-w-[620px]"
      />
    </section>
  );
}

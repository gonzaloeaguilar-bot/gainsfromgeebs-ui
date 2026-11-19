// ============================================================
//  KeepGoing
//
//  The end of a study page, a science answer or a comparison used to
//  be the end of the visit. Those templates carried a newsletter box
//  and nothing to DO, so a reader who was not ready to hand over an
//  email had one option: leave.
//
//  This offers the two interactive surfaces instead. Both are free,
//  neither asks for anything up front, and both end where the page
//  wanted the reader to go anyway.
//
//  Server-rendered. It is navigation, so it belongs in the HTML and in
//  the crawl, not in a client effect.
// ============================================================

import Link from "next/link";
import SectionView from "@/components/SectionView";
import KeepGoingLink from "@/components/KeepGoingLink";

export type KeepGoingItem = {
  href: string;
  eyebrow: string;
  title: string;
  detail: string;
  ctaId: string;
};

/** The default pair. The assessment answers "what about me", the game
 *  answers "could I actually call this myself", and both are replayable
 *  reasons to come back that cost the reader nothing. */
const DEFAULT_ITEMS: KeepGoingItem[] = [
  {
    href: "/assessment",
    eyebrow: "Two minutes",
    title: "Get your own numbers",
    detail:
      "Ten questions, one at a time. Your estimated body fat, lean mass and goal range, then the phase to run first and what to eat while you run it.",
    ctaId: "keep_going_assessment",
  },
  {
    href: "/games/read-the-week",
    eyebrow: "Free game",
    title: "Read a week like a coach",
    detail:
      "Eight real-looking weeks of weigh-ins. Cut, hold, or add food? Most people cut at least twice when the honest answer was to change nothing.",
    ctaId: "keep_going_game",
  },
];

export default function KeepGoing({
  items = DEFAULT_ITEMS,
  heading = "Keep going",
  sectionId = "keep_going",
  position,
  compact = false,
}: {
  items?: KeepGoingItem[];
  heading?: string;
  sectionId?: string;
  /** Where on the site this rendered, so the two surfaces can be told
   *  apart by the page that sent the reader. */
  position: string;
  /**
   * The same two exits, without the descriptions, for pages that cannot
   * afford 525px.
   *
   * /for/busy-professionals has a height gate with its reason written into it:
   * "10 screens, with ~280px of headroom. The next addition to this page
   * should come with a decision about what comes OFF it." Adding the exit put
   * it 518px over, and the gate was right to stop it.
   *
   * So this is the decision, and it had to be made twice. Dropping only the
   * detail line brought the page to 8,140 against a 8,120 limit — 20px over,
   * and 20px is not headroom: the same gate on /packages was failing every
   * branch because a threshold set on macOS was enforced on CI's Linux, which
   * renders this page taller. A fix that lands 20px inside a limit on my
   * machine is a fix that fails on theirs.
   *
   * So compact drops the eyebrow as well and sets the two exits on one row of
   * plain links. The reader still gets both destinations; what goes is three
   * lines of explanation on a page that has spent nine screens explaining.
   */
  compact?: boolean;
}) {
  return (
    <SectionView sectionId={sectionId}>
      {/* Not folded: this is the exit, and folding the exit is the same
          mistake as folding a summary. */}
      <section data-no-fold aria-labelledby={`${sectionId}-heading`}>
        <h2
          id={`${sectionId}-heading`}
          className={`display text-bone leading-[1.15] ${
            compact ? "text-[18px]" : "text-[22px] md:text-[26px]"
          }`}
        >
          {heading}
        </h2>
        <div
          className={
            compact
              ? "mt-3 flex flex-wrap gap-2"
              : "mt-6 grid gap-3 sm:grid-cols-2"
          }
        >
          {items.map((item) => (
            <KeepGoingLink key={item.href} item={item} position={position}>
              <Link
                href={item.href}
                className={`group block rounded-[10px] border border-line bg-bone/[0.025] transition-colors hover:border-bone/40 ${
                  compact ? "px-4 py-2.5" : "h-full p-5"
                }`}
                data-cta={item.ctaId}
              >
                {compact ? null : (
                  <p className="text-[11.5px] uppercase tracking-[0.13em] text-cloudText">
                    {item.eyebrow}
                  </p>
                )}
                <p
                  className={`display text-bone leading-[1.2] ${
                    compact ? "text-[16px]" : "mt-2.5 text-[19px]"
                  }`}
                >
                  {item.title}
                  <span aria-hidden="true" className="text-cloudText"> →</span>
                </p>
                {compact ? null : (
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
                    {item.detail}
                  </p>
                )}
              </Link>
            </KeepGoingLink>
          ))}
        </div>
      </section>
    </SectionView>
  );
}

"use client";

/**
 * How much of a rail someone has actually seen.
 *
 * The honest version of "gamification" for a coaching brand. No points, no
 * badges, no streak a visitor can lose: those turn a decision about paying a
 * coach into a slot machine, and the rail already refuses that elsewhere by
 * capping its own attention sweep at three passes.
 *
 * What it does instead is close a loop the rail already opens. The counter says
 * "1 of 6", which tells you where you are but not that there is more worth
 * swiping to. This fills as each new card is seen, so browsing the full set
 * reads as finishing something.
 *
 * It only appears once a second card has been seen. On first paint it would be
 * a progress bar at 1/6 before the visitor has done anything, which is a
 * scoreboard for someone who has not played.
 */
export default function RailProgress({
  seen,
  total,
  label = "options seen",
}: {
  seen: number;
  total: number;
  label?: string;
}) {
  if (total < 2 || seen < 2) return null;

  const pct = Math.min(100, Math.round((seen / total) * 100));
  const complete = seen >= total;

  return (
    <div className="mt-4 flex items-center gap-3">
      <div
        className="h-[3px] flex-1 overflow-hidden rounded-full bg-bone/12"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={seen}
        aria-label={`${seen} of ${total} ${label}`}
      >
        <div
          className="h-full rounded-full bg-cloudText transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="shrink-0 text-[12.5px] tabular-nums text-mute" aria-hidden="true">
        {complete ? "All options seen" : `${seen} of ${total}`}
      </p>
    </div>
  );
}

"use client";

// ============================================================
//  Read the Week, playable
//
//  Three jobs beyond being a game:
//
//  1. RETENTION. A best score and a days-played streak are kept in
//     localStorage, so there is a reason to come back tomorrow that is
//     not an email. Same mechanic the daily trackers already use.
//  2. SHARE. The result copies a link carrying the seed, so the person
//     who receives it plays the identical eight weeks. A score is only
//     a challenge if the other player gets the same game.
//  3. CONVERSION. Getting these wrong is the argument for coaching,
//     made by letting someone be wrong rather than by claiming it.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RailScore } from "@/vendor/rail-kit";
import {
  ROUND_COUNT,
  buildGame,
  newSeed,
  verdictFor,
  type Move,
  type Round,
} from "./logic";

const MOVES: { id: Move; label: string; sub: string }[] = [
  { id: "cut", label: "Cut calories", sub: "Take food down" },
  { id: "hold", label: "Hold everything", sub: "Change nothing" },
  { id: "add", label: "Add food", sub: "Take food up" },
];

const BEST_KEY = "geebs:rtw:best";
const DAYS_KEY = "geebs:rtw:days";

function readBest(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(BEST_KEY) || 0);
  } catch {
    return 0;
  }
}

/** Distinct days played, kept as a list of ISO dates so the count can
 *  never be inflated by replaying on the same day. */
function recordPlayDay(): number {
  if (typeof window === "undefined") return 1;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = window.localStorage.getItem(DAYS_KEY);
    const days: string[] = raw ? JSON.parse(raw) : [];
    if (!days.includes(today)) days.push(today);
    window.localStorage.setItem(DAYS_KEY, JSON.stringify(days.slice(-90)));
    return days.length;
  } catch {
    return 1;
  }
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warn" }) {
  return (
    <div>
      <dt className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">{label}</dt>
      <dd
        className={[
          "mt-1.5 text-[19px] leading-[1.2]",
          tone === "warn" ? "text-cloudText" : "text-bone",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}

export default function PlayGame({ initialSeed }: { initialSeed: number }) {
  const [seed, setSeed] = useState(initialSeed);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Move | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [daysPlayed, setDaysPlayed] = useState(0);
  const [copied, setCopied] = useState(false);

  const rounds = useMemo<Round[]>(() => buildGame(seed), [seed]);
  const round = rounds[Math.min(index, rounds.length - 1)];
  const finished = index >= rounds.length;

  // Best score is read at the end of a run, not on mount. Setting state
  // from a mount effect triggers a cascading render for a value nothing
  // shows until the final screen anyway.

  useEffect(() => {
    trackClientEvent("content_interaction", {
      interaction_id: "read_the_week_start",
      interaction_type: "game",
      seed,
    });
  }, [seed]);

  const pick = useCallback(
    (move: Move) => {
      if (picked) return;
      setPicked(move);
      const right = move === round.answer;
      if (right) setScore((s) => s + 1);
      trackClientEvent("content_interaction", {
        interaction_id: "read_the_week_answer",
        interaction_type: "game",
        round: index + 1,
        correct: right,
        picked: move,
        expected: round.answer,
      });
    },
    [index, picked, round],
  );

  const next = useCallback(() => {
    setPicked(null);
    setIndex((i) => {
      const n = i + 1;
      if (n >= ROUND_COUNT) {
        // Persist on completion only. A half-played run is not a score.
        const finalScore = score;
        try {
          if (finalScore > readBest()) {
            window.localStorage.setItem(BEST_KEY, String(finalScore));
            setBest(finalScore);
          }
        } catch {
          // A blocked store must never break the game.
        }
        setDaysPlayed(recordPlayDay());
        trackClientEvent("content_interaction", {
          interaction_id: "read_the_week_complete",
          interaction_type: "game",
          score: finalScore,
          rounds: ROUND_COUNT,
          seed,
        });
      }
      return n;
    });
  }, [score, seed]);

  const playAgain = useCallback(() => {
    const s = newSeed();
    setSeed(s);
    setIndex(0);
    setPicked(null);
    setScore(0);
    setCopied(false);
  }, []);

  const share = useCallback(async () => {
    const url = `https://gainsfromgeebs.com/games/read-the-week?seed=${seed}`;
    const text = `I scored ${score}/${ROUND_COUNT} reading a client's week like a coach. Same eight weeks, see how you do:`;
    trackClientEvent("share_click", { channel: "native", score });
    try {
      if (navigator.share) {
        await navigator.share({ title: "Read the Week", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
    } catch {
      // A dismissed share sheet is a normal outcome, not an error.
    }
  }, [score, seed]);

  // ---------- finished ----------
  if (finished) {
    return (
      // Bottom clearance for the site's sticky nav, which otherwise sits
      // on top of the last action. Same defect the assessment had.
      <div className="pb-28 sm:pb-8">
        <p className="eyebrow text-cloudText">Your score</p>

        {/* The kit's scoreboard rather than a hand-rolled one. Its whole
            argument is that a score without a record is a tally, and a tally
            cannot be beaten: the best and the days played were already tracked
            here and were rendered as a grey footnote under the number. */}
        <RailScore
          className="mt-4"
          label={`Read the Week, round ${ROUND_COUNT} of ${ROUND_COUNT}`}
          scoreLabel="This run"
          score={score}
          bestLabel="Your best"
          best={Math.max(best, score)}
          extra={daysPlayed > 1 ? [{ label: "Days played", value: daysPlayed }] : undefined}
          source="read-the-week"
        />

        <p className="mt-5 text-[15.5px] leading-[1.7] text-bone/85 max-w-[58ch]">
          {verdictFor(score, ROUND_COUNT)}
        </p>
        <p className="mt-3 text-[13.5px] text-mute2">
          Out of {ROUND_COUNT} weeks.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <button type="button" onClick={share} className="btn btn-primary">
            {copied ? "Link copied" : "Challenge someone"}
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" onClick={playAgain} className="btn btn-secondary">
            New week
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hair my-10" />

        <section data-analytics-source="game_results">
          <h2 className="display text-bone text-[21px] md:text-[25px] leading-[1.18]">
            This is the job, every Monday
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            Eight weeks took you a couple of minutes. Doing it on your own body
            means doing it every week for a year, with no answer key, while the
            week you are reading is the one you lived. Most people cut when the
            honest call was to leave it alone, and the cost is months.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/apply"
              className="btn btn-primary"
              data-cta="game_primary"
              onClick={() =>
                trackClientEvent("cta_click", {
                  cta_id: "read_the_week_to_apply",
                  cta_text: "Have Kris read your week",
                  cta_position: "game_results",
                })
              }
            >
              Have Kris read your week
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/assessment" className="btn btn-secondary">
              Get your own starting numbers
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // ---------- playing ----------
  const w = round.week;
  const delta = w.lastAvg - w.thisAvg;
  const adherenceWarn = w.caloriesHit < 5;
  const trainingWarn = w.sessionsDone < w.sessionsPlanned - 1;

  return (
    <div className="pb-28 sm:pb-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">
          Week {index + 1} of {ROUND_COUNT}
        </p>
        <p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">
          Score {score}
        </p>
      </div>
      <div
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={0}
        aria-valuemax={ROUND_COUNT}
        aria-label="Weeks played"
      >
        <div
          className="h-full rounded-full bg-cloud transition-[width] duration-300"
          style={{ width: `${((index + 1) / ROUND_COUNT) * 100}%` }}
        />
      </div>

      <div className="mt-7 rounded-[10px] border border-line p-5">
        <p className="text-[12px] uppercase tracking-[0.13em] text-mute2">
          Daily weigh-ins
        </p>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {w.weighIns.map((v, i) => (
            <div key={i} className="text-center">
              <div className="text-[10.5px] uppercase text-mute2">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </div>
              <div
                className={[
                  "mt-1 text-[12.5px] tabular-nums",
                  v === null ? "text-mute2" : "text-bone",
                ].join(" ")}
              >
                {v === null ? "--" : v.toFixed(1)}
              </div>
            </div>
          ))}
        </div>

        <div className="hair my-5" />

        <dl className="grid grid-cols-2 gap-x-5 gap-y-5">
          <Stat
            label="7-day average"
            value={`${w.thisAvg.toFixed(1)} lb`}
          />
          <Stat
            label="Last week"
            value={`${w.lastAvg.toFixed(1)} lb (${delta >= 0 ? "-" : "+"}${Math.abs(delta).toFixed(1)})`}
          />
          <Stat
            label="Calories hit"
            value={`${w.caloriesHit} of 7 days`}
            tone={adherenceWarn ? "warn" : undefined}
          />
          <Stat label="Target" value={`${w.targetCalories.toLocaleString()} kcal`} />
          <Stat
            label="Training"
            value={`${w.sessionsDone} of ${w.sessionsPlanned} sessions`}
            tone={trainingWarn ? "warn" : undefined}
          />
          <Stat
            label="Steps"
            value={`${w.avgSteps.toLocaleString()} / ${w.stepTarget.toLocaleString()}`}
          />
        </dl>
        <p className="mt-5 text-[13px] text-mute2">
          Week {w.weeksInPhase} of this phase.
        </p>
      </div>

      {!picked ? (
        <>
          <h2 className="display mt-8 text-bone text-[21px] md:text-[25px] leading-[1.18]">
            What do you change?
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            {MOVES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => pick(m.id)}
                className="min-h-[60px] w-full rounded-[10px] border border-line px-4 py-3.5 text-left transition-colors hover:border-bone/40"
              >
                <span className="block text-[15.5px] text-bone">{m.label}</span>
                <span className="block text-[13px] text-mute2">{m.sub}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8" role="status" aria-live="polite">
          <p
            className={[
              "text-[12.5px] uppercase tracking-[0.14em]",
              picked === round.answer ? "text-cloudText" : "text-mute2",
            ].join(" ")}
          >
            {picked === round.answer ? "Correct" : "Not this week"}
          </p>
          <h2 className="display mt-3 text-bone text-[21px] md:text-[25px] leading-[1.2]">
            {round.headline}
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            {round.because}
          </p>
          <button type="button" onClick={next} className="btn btn-primary mt-7 w-full sm:w-auto">
            {index + 1 >= ROUND_COUNT ? "See my score" : "Next week"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

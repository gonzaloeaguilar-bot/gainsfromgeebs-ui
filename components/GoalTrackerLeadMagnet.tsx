"use client";

import { useMemo, useRef, useState } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { GOAL_TRACKER_HTML_PATH } from "@/app/lib/subscribe-constants";
import { trackClientEvent } from "@/lib/clientAnalytics";

function getGaClientId(): string {
  if (typeof window === "undefined") return "";
  try {
    const ga = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_ga="))
      ?.split("=")?.[1];
    if (!ga) return "";
    const parts = ga.split(".");
    return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : "";
  } catch {
    return "";
  }
}

function getUtmParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

function getProteinTarget(bodyweight: number, goal: string) {
  if (!Number.isFinite(bodyweight) || bodyweight <= 0) return 0;
  const multiplier = goal === "lean-gain" ? 0.9 : 0.8;
  return Math.round(bodyweight * multiplier);
}

function getWorkoutTarget(days: number) {
  if (days <= 2) return "Start with 3 lifting days. Less than that is easy to skip.";
  if (days >= 6) return "Cap it at 5 hard days unless recovery is already locked in.";
  return `${days} lifting days is enough if you progress and repeat it.`;
}

function getGoalEta(bodyweight: number, goalWeight: number, goal: string) {
  if (
    !Number.isFinite(bodyweight) ||
    !Number.isFinite(goalWeight) ||
    bodyweight <= 0 ||
    goalWeight <= 0
  ) {
    return {
      eta: "--",
      note: "Enter current weight and goal weight to estimate the timeline.",
    };
  }

  const distance = Math.abs(bodyweight - goalWeight);
  if (distance < 1) {
    return {
      eta: "Goal reached",
      note: "You are within one pound. Make the game about holding the result.",
    };
  }

  const direction = goalWeight > bodyweight ? "gain" : "loss";
  const lowRate = direction === "gain" ? 0.0012 : 0.003;
  const highRate = direction === "gain" ? 0.003 : 0.007;
  const lowPace = bodyweight * lowRate;
  const highPace = bodyweight * highRate;
  const fastWeeks = Math.max(1, Math.ceil(distance / highPace));
  const slowWeeks = Math.max(fastWeeks, Math.ceil(distance / lowPace));
  const months =
    slowWeeks >= 9
      ? `${Math.round((fastWeeks / 4.345) * 10) / 10}-${Math.round((slowWeeks / 4.345) * 10) / 10} mo`
      : `${fastWeeks}-${slowWeeks} wk`;
  const goalNote =
    direction === "gain"
      ? "Lean gain pace assumes slow scale movement with lift progression."
      : "Fat-loss pace assumes consistency without crash dieting.";

  if (goal === "recomp" && distance <= 5) {
    return {
      eta: months,
      note: "This is close enough that photos, waist, and lifts matter as much as the scale.",
    };
  }

  return {
    eta: months,
    note: goalNote,
  };
}

export default function GoalTrackerLeadMagnet() {
  const [email, setEmail] = useState("");
  const [bodyweight, setBodyweight] = useState("185");
  const [goalWeight, setGoalWeight] = useState("170");
  const [workouts, setWorkouts] = useState("4");
  const [goal, setGoal] = useState("fat-loss");
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const preview = useMemo(() => {
    const bw = Number(bodyweight);
    const targetWeight = Number(goalWeight);
    const workoutDays = Number(workouts);
    const protein = getProteinTarget(bw, goal);
    const goalEta = getGoalEta(bw, targetWeight, goal);
    return {
      protein,
      goalEta,
      workoutNote: getWorkoutTarget(workoutDays),
      weeklyScore:
        protein > 0 && workoutDays >= 3 && workoutDays <= 5
          ? "Good starting plan"
          : "Needs one fix first",
    };
  }, [bodyweight, goal, goalWeight, workouts]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const honeypot =
      (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";
    if (honeypot) return;

    setStatus("loading");
    setErrorMsg("");

    trackClientEvent("goal_tracker_signup_attempt", {
      source: "goal-tracker",
      goal,
    });

    const result = await subscribeEmail({
      email,
      source: "goal-tracker",
      website: honeypot,
      utmSource: getUtmParam("utm_source"),
      utmMedium: getUtmParam("utm_medium"),
      utmCampaign: getUtmParam("utm_campaign"),
      gaClientId: getGaClientId(),
    });

    if (
      result.status === "ok" ||
      result.status === "already_subscribed" ||
      result.status === "honeypot"
    ) {
      setStatus("ready");
      trackClientEvent("goal_tracker_signup", {
        source: "goal-tracker",
        goal,
      });
      return;
    }

    if (result.status === "invalid_email") {
      setStatus("error");
      setErrorMsg(result.message);
      return;
    }

    setStatus("error");
    setErrorMsg("Something went wrong. Try again in a moment.");
  }

  return (
    <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-18">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow text-cloudText">Free goal-weight forecast</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[46px] md:text-[60px]">
            Find how long your goal weight will actually take.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            Add your stats, current weight, goal weight, steps, lifts, and a
            few weekly execution signals. The tool estimates your time to goal,
            calories, macros, adjustment timing, and a simple grocery list.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Goal ETA", "Weeks or months to target"],
              ["Calories", "TDEE + macro targets"],
              ["Adjustments", "Know when to change"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-4"
              >
                <p className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                  {label}
                </p>
                <p className="mt-2 text-[15px] font-medium text-bone">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <h2 className="text-[18px] font-semibold tracking-normal text-bone">
              Why this is different
            </h2>
            <ul className="mt-4 grid gap-3 text-[14.5px] leading-[1.55] text-mute">
              <li>Combines goal-weight ETA, TDEE, macros, and weekly trend data.</li>
              <li>Shows when to hold calories versus adjust after a stall.</li>
              <li>Adds a simple forecast graph and grocery-list anchors.</li>
              <li>Generates an anonymous ETA check-in you can paste for advice.</li>
              <li>Saves weeks locally, with export/import backup if needed.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-line2 bg-black/20 p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <label className="block">
              <span className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Current
              </span>
              <input
                type="number"
                min="80"
                max="450"
                value={bodyweight}
                onChange={(e) => setBodyweight(e.target.value)}
                className="apply-input mt-2 !py-3"
              />
            </label>

            <label className="block">
              <span className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Goal weight
              </span>
              <input
                type="number"
                min="80"
                max="450"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="apply-input mt-2 !py-3"
              />
            </label>

            <label className="block">
              <span className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Lift days
              </span>
              <input
                type="number"
                min="1"
                max="7"
                value={workouts}
                onChange={(e) => setWorkouts(e.target.value)}
                className="apply-input mt-2 !py-3"
              />
            </label>

            <label className="block">
              <span className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Goal
              </span>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="apply-input mt-2 !py-3"
              >
                <option value="fat-loss">Fat loss</option>
                <option value="recomp">Recomp</option>
                <option value="lean-gain">Lean gain</option>
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-line bg-bone/[0.03] p-4">
              <p className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Time to goal
              </p>
              <p className="mt-2 text-[30px] font-semibold leading-none text-bone">
                {preview.goalEta.eta}
              </p>
              <p className="mt-2 text-[13px] leading-[1.45] text-mute">
                {preview.goalEta.note}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-bone/[0.03] p-4 md:col-span-2">
              <p className="text-[12px] uppercase tracking-[0.12em] text-cloudText">
                Weekly quest
              </p>
              <p className="mt-2 text-[19px] font-semibold tracking-normal text-bone">
                {preview.weeklyScore}
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-mute">
                Protein target: {preview.protein || "--"}g/day.{" "}
                {preview.workoutNote}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-line2 pt-5">
            <h2 className="text-[20px] font-semibold tracking-normal text-bone">
              Open the calorie and goal forecast now
            </h2>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
              No account required. The forecast runs in your browser, calculates
              calories and macros, saves to your device, and works from the HTML
              file you download.
            </p>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-cloudText">
              On phone, use Open goal forecast in Safari or Chrome and add it to
              your home screen. Downloading the file works best on desktop.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={GOAL_TRACKER_HTML_PATH}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackClientEvent("goal_tracker_open_click", {
                    source: "goal-tracker",
                  })
                }
                className="btn btn-primary justify-center"
              >
                Open goal forecast
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={GOAL_TRACKER_HTML_PATH}
                download
                onClick={() =>
                  trackClientEvent("goal_tracker_download_click", {
                    source: "goal-tracker",
                  })
                }
                className="btn btn-secondary justify-center"
              >
                Download HTML file
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <h3 className="text-[17px] font-semibold tracking-normal text-bone">
                Want the backup link and updates?
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                Use it first. Email is optional if you want the forecast link
                sent to you and future Geebs updates.
              </p>

              {status === "ready" ? (
                <p
                  className="mt-4 rounded-lg border border-cloud/45 bg-cloud/10 p-4 text-[14px] font-medium text-bone"
                  role="status"
                >
                  Sent. The free download stays available above.
                </p>
              ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-5"
                noValidate
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="sr-only"
                  defaultValue=""
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="goal-tracker-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="goal-tracker-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="apply-input flex-1 !py-3 !text-[15px]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary justify-center px-6 py-3 sm:whitespace-nowrap"
                  >
                    {status === "loading"
                      ? "Sending..."
                      : "Email me the forecast"}
                  </button>
                </div>
                {status === "error" ? (
                  <p className="mt-3 text-[13px] text-cloudText" role="alert">
                    {errorMsg}
                  </p>
                ) : null}
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

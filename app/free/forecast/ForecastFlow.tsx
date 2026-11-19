"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { trackClientEvent } from "@/lib/clientAnalytics";
import GuidedSteps, {
  ChoiceButton,
  ChoiceChips,
  ChoiceGroup,
} from "@/components/GuidedSteps";
import RailStats from "@/vendor/rail-kit/RailStats";
import { assess, type Goal, type Sex, type WeightTrend } from "@/app/assessment/logic";
import { forecast } from "./forecast";
import ForecastCurve from "./ForecastCurve";

type Draft = {
  goal: Goal | null;
  sex: Sex | null;
  age: number | null;
  heightIn: number | null;
  weightLb: number | null;
  waistIn: number | null;
  neckIn: number | null;
  hipIn: number | null;
  trend: WeightTrend | null;
  calories: number | null;
  caloriesKnown: boolean | null;
  trainingDays: number | null;
};

const EMPTY: Draft = {
  goal: null,
  sex: null,
  age: null,
  heightIn: null,
  weightLb: null,
  waistIn: null,
  neckIn: null,
  hipIn: null,
  trend: null,
  calories: null,
  caloriesKnown: null,
  trainingDays: null,
};

const GOALS: { value: Goal; label: string }[] = [
  { value: "lose_fat", label: "Lose fat" },
  { value: "visible_abs", label: "See my abs" },
  { value: "get_lean", label: "Get lean at this weight" },
  { value: "build_muscle", label: "Build muscle" },
];

const TRENDS: { value: WeightTrend; label: string }[] = [
  { value: "down_slow", label: "Drifting down" },
  { value: "steady", label: "Holding steady" },
  { value: "up_slow", label: "Creeping up" },
  { value: "up_fast", label: "Up, and fast" },
];

/** Ranges wide enough never to argue with a real person, narrow enough that a
 *  typo cannot produce a confident date. assess() clamps body fat and nothing
 *  else, so -5 years old and 3 lb used to forecast fine. */
const LIMITS: Record<string, [number, number]> = {
  "f-age": [14, 90],
  "f-height": [48, 90],
  "f-weight": [70, 700],
  "f-waist": [18, 80],
  "f-neck": [8, 30],
  "f-hip": [24, 90],
  "f-cal": [800, 9000],
};

export function withinLimits(id: string, n: number | null): boolean {
  if (n === null) return false;
  const range = LIMITS[id];
  if (!range) return true;
  return n >= range[0] && n <= range[1];
}

function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number | null;
  onChange: (n: number | null) => void;
}) {
  const bad = value !== null && !withinLimits(id, value);
  return (
    <label htmlFor={id} className="mt-3 block">
      <span className="text-[13px] text-mute">{label}</span>
      <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-line2 bg-ink2 px-4">
        <input
          id={id}
          inputMode="decimal"
          value={value ?? ""}
          onChange={(e) => {
            const n = Number.parseFloat(e.target.value);
            onChange(Number.isFinite(n) ? n : null);
          }}
          aria-invalid={bad || undefined}
          className="min-h-[56px] w-full bg-transparent text-[17px] text-bone outline-none"
        />
        <span className="text-[13px] text-mute2">{suffix}</span>
      </span>
      {bad ? (
        <span role="alert" className="mt-1.5 block text-[13px] text-[#ff8a8a]">
          {`That is outside what this can forecast (${LIMITS[id][0]}-${LIMITS[id][1]} ${suffix}).`}
        </span>
      ) : null}
    </label>
  );
}

type GateStatus = "idle" | "loading" | "unlocked" | "error";

/** The week-by-week plan behind the date. The date itself is never gated —
 *  same rule as the twelve calculators and as /assessment's estimate: the
 *  answer someone came for is given, and the email buys what comes after it. */
function PlanGate() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<GateStatus>("idle");
  const [error, setError] = useState("");

  if (status === "unlocked") {
    return (
      <div className="mt-7 rounded-xl border border-line2 bg-ink3 p-5">
        <p className="eyebrow text-cloudText">On its way</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-bone/85">
          The week-by-week plan behind that date is in your inbox: starting
          calories, macros, the week-one instruction and the rule for when to
          change them.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-7 rounded-xl border border-line2 bg-ink3 p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError("");
        const res = await subscribeEmail({ email, source: "forecast", website });
        if (res.status === "honeypot") {
          // The trap sprang. Show the success state so the bot learns nothing,
          // and emit NOTHING: `lead` is the site's only conversion metric and
          // a bot must never move it. Same shape as ToolEmailCapture.
          setStatus("unlocked");
          return;
        }
        if (res.status === "ok" || res.status === "already_subscribed") {
          setStatus("unlocked");
          // No `phase` parameter. It is a derived health classification —
          // `refuel` means prolonged caloric restriction, `fat_loss` means
          // above target body fat — and joining that to a client id on the
          // same event as an email is health data in GA4. lead_type already
          // gives the segmentation.
          trackClientEvent("lead", {
            form_id: "transformation_forecast",
            lead_type: "forecast",
          });
          return;
        }
        setStatus("error");
        setError(res.status === "invalid_email" ? res.message : "That did not send. Try again in a moment.");
        trackClientEvent("form_error", {
          form_id: "transformation_forecast_gate",
          error_code: res.status,
          field: "email",
        });
      }}
    >
      <p className="eyebrow text-cloudText">The plan behind the date</p>
      <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.6] text-mute">
        Starting calories, macros, the week-one instruction and the rule for
        when to change them. The date above is yours either way.
      </p>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />
      <label htmlFor="forecast-email" className="mt-4 block">
        <span className="text-[13px] text-mute">Email</span>
        <input
          id="forecast-email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 min-h-[56px] w-full rounded-xl border border-line2 bg-ink2 px-4 text-[17px] text-bone outline-none"
        />
      </label>
      {error ? (
        <p role="alert" className="mt-2 text-[13.5px] text-[#ff8a8a]">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary mt-4 w-full">
        {status === "loading" ? "Sending..." : "Send me the plan"}
      </button>
    </form>
  );
}

export default function ForecastFlow() {
  const [d, setD] = useState<Draft>(EMPTY);
  const [done, setDone] = useState(false);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const result = useMemo(() => {
    if (!done || !d.goal || !d.sex || !d.age || !d.heightIn || !d.weightLb) {
      return null;
    }
    const r = assess({
      goal: d.goal,
      sex: d.sex,
      age: d.age,
      heightIn: d.heightIn,
      weightLb: d.weightLb,
      waistIn: d.waistIn ?? undefined,
      neckIn: d.neckIn ?? undefined,
      hipIn: d.hipIn ?? undefined,
      weightTrend: d.trend ?? "steady",
      currentCalories: d.caloriesKnown ? d.calories : null,
      // The lighter magnet does not ask diet history; /assessment does. Declaring
      // "not dieting" is the conservative choice: it is the only value that does
      // NOT unlock the refuel phase, so this flow can never tell someone to eat
      // more on the strength of a question it never asked.
      dietHistory: "not_dieting",
      trainingDays: d.trainingDays ?? 3,
    });
    return { r, f: forecast(r, d.weightLb, new Date()) };
  }, [done, d]);

  const steps = [
    {
      id: "goal",
      question: "What do you want to happen?",
      isAnswered: d.goal !== null,
      autoAdvance: true,
      render: (advance: () => void) => (
        <ChoiceGroup>
          {GOALS.map((g) => (
            <ChoiceButton
              key={g.value}
              selected={d.goal === g.value}
              onClick={() => {
                set("goal", g.value);
                advance();
              }}
            >
              {g.label}
            </ChoiceButton>
          ))}
        </ChoiceGroup>
      ),
    },
    {
      id: "sex",
      question: "Male or female?",
      help: "Body-fat ranges and energy needs differ, so it changes the maths.",
      isAnswered: d.sex !== null,
      autoAdvance: true,
      render: (advance: () => void) => (
        <ChoiceGroup>
          {(["male", "female"] as Sex[]).map((s) => (
            <ChoiceButton
              key={s}
              selected={d.sex === s}
              onClick={() => {
                set("sex", s);
                advance();
              }}
            >
              {s === "male" ? "Male" : "Female"}
            </ChoiceButton>
          ))}
        </ChoiceGroup>
      ),
    },
    {
      id: "body",
      question: "Age, height and today's weight.",
      help: "Today's weight, not the one you are aiming at.",
      isAnswered:
        withinLimits("f-age", d.age) &&
        withinLimits("f-height", d.heightIn) &&
        withinLimits("f-weight", d.weightLb),
      render: () => (
        <div>
          <NumberField id="f-age" label="Age" suffix="years" value={d.age} onChange={(n) => set("age", n)} />
          <NumberField id="f-height" label="Height" suffix="in" value={d.heightIn} onChange={(n) => set("heightIn", n)} />
          <NumberField id="f-weight" label="Weight" suffix="lb" value={d.weightLb} onChange={(n) => set("weightLb", n)} />
        </div>
      ),
    },
    {
      id: "tape",
      question: "Got a tape measure?",
      help:
        d.sex === "female"
          ? "Waist at the navel, neck under the Adam's apple, hips at the widest. All three, or none — the formula needs the set. Skip and the body-fat figure drops to an estimate, and the page will say so."
          : "Waist at the navel, neck just under the Adam's apple. Both, or neither — the formula needs the pair. Skip and the body-fat figure drops to an estimate, and the page will say so.",
      isAnswered: true,
      render: () => (
        <div>
          <NumberField id="f-waist" label="Waist" suffix="in" value={d.waistIn} onChange={(n) => set("waistIn", n)} />
          <NumberField id="f-neck" label="Neck" suffix="in" value={d.neckIn} onChange={(n) => set("neckIn", n)} />
          {d.sex === "female" ? (
            <NumberField id="f-hip" label="Hips" suffix="in" value={d.hipIn} onChange={(n) => set("hipIn", n)} />
          ) : null}
          <p className="mt-3 text-[13px] leading-[1.55] text-mute2">
            No tape? Leave them empty and continue.
          </p>
        </div>
      ),
    },
    {
      id: "trend",
      question: "What has the scale been doing?",
      isAnswered: d.trend !== null,
      autoAdvance: true,
      render: (advance: () => void) => (
        <ChoiceGroup>
          {TRENDS.map((t) => (
            <ChoiceButton
              key={t.value}
              selected={d.trend === t.value}
              onClick={() => {
                set("trend", t.value);
                advance();
              }}
            >
              {t.label}
            </ChoiceButton>
          ))}
        </ChoiceGroup>
      ),
    },
    {
      id: "intake",
      question: "Do you know what you eat in a day?",
      help: "The honest answer here decides whether we can give you a date at all.",
      isAnswered:
        d.caloriesKnown !== null &&
        (!d.caloriesKnown || withinLimits("f-cal", d.calories)),
      /* No auto-advance on this one, and not by oversight. GuidedSteps'
         `advance` guards on step.isAnswered read from the render captured at
         tap time — the trap its own docblock describes. "No idea" makes the
         step answered in the SAME tap, so calling advance() there evaluates
         the stale render and goes nowhere. The e2e caught it; the unit suite
         could not. Continue is enabled the moment a choice lands. */
      render: () => (
        <div>
          <ChoiceGroup>
            <ChoiceButton
              selected={d.caloriesKnown === false}
              onClick={() =>
                setD((p) => ({ ...p, caloriesKnown: false, calories: null }))
              }
            >
              No idea
            </ChoiceButton>
            <ChoiceButton
              selected={d.caloriesKnown === true}
              onClick={() => set("caloriesKnown", true)}
            >
              Yes, roughly
            </ChoiceButton>
          </ChoiceGroup>
          {d.caloriesKnown ? (
            <NumberField id="f-cal" label="Average day" suffix="kcal" value={d.calories} onChange={(n) => set("calories", n)} />
          ) : null}
        </div>
      ),
    },
    {
      id: "training",
      question: "Days a week you train.",
      isAnswered: d.trainingDays !== null,
      autoAdvance: true,
      render: (advance: () => void) => (
        <ChoiceChips
          label="Training days per week"
          selected={d.trainingDays}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: n, label: String(n) }))}
          onSelect={(v) => {
            set("trainingDays", Number(v));
            advance();
          }}
        />
      ),
    },
  ];

  if (!done || !result) {
    return (
      <GuidedSteps
        formId="transformation_forecast"
        steps={steps}
        finishLabel="Show me the date"
        onFinish={() => {
          setDone(true);
          trackClientEvent("form_submit", { form_id: "transformation_forecast" });
        }}
      />
    );
  }

  const { r, f } = result;
  const fmt = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (f.kind === "undated") {
    return (
      <section aria-live="polite">
        <p className="eyebrow text-cloudText">No date yet, and that is the answer</p>
        <h2 className="display mt-3 text-[27px] leading-[1.1] text-bone md:text-[34px]">
          {fmt(f.nextDate)} is the date we can actually give you.
        </h2>
        <p className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65] text-mute">{f.reason}</p>
        <p className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.65] text-bone/85">
          {f.nextDateMeans}
        </p>
        <RailStats
          className="mt-7"
          source="forecast_result"
          columns={3}
          tiles={[
            { id: "bf", value: `${r.bodyFatPct}%`, label: r.confidence === "measured" ? "Body fat, from tape" : "Body fat, estimated" },
            { id: "lean", value: `${r.leanMassLb} lb`, label: "Lean mass" },
            { id: "goal", value: `${r.goalWeightLowLb}-${r.goalWeightHighLb} lb`, label: `Weight at ${r.targetBodyFatPct}%` },
          ]}
        />
        <PlanGate />
      </section>
    );
  }

  return (
    <section aria-live="polite">
      <p className="eyebrow text-cloudText">Your forecast</p>
      <h2 className="display mt-3 text-[38px] leading-[1.02] tracking-[-0.02em] text-bone md:text-[52px]">
        {fmt(f.target)}
      </h2>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">
        Between {fmt(f.earliest)} and {fmt(f.latest)}. Never a single day: a
        forecast is a band, and anyone handing you one date is selling you one.
      </p>

      <ForecastCurve
        curve={f.curve}
        startLabel={`${f.curve[0].weightLb} lb`}
        endLabel={`${f.curve.at(-1)!.weightLb} lb`}
      />

      <p className="mt-6 text-[15px] leading-[1.65] text-mute">
        {`${f.curve[0].weightLb} lb today, ${r.goalWeightLowLb}-${r.goalWeightHighLb} lb at ${r.targetBodyFatPct}% body fat. `}
        {r.confidence === "measured"
          ? "Body fat from your own tape measurement."
          : "Body fat estimated without a tape. Measure once and this gets sharper."}
      </p>

      <RailStats
        className="mt-6"
        source="forecast_result"
        columns={3}
        tiles={[
          { id: "rate", value: `${f.weeklyRateLb} lb`, label: "Per week, sustained" },
          { id: "weeks", value: String(f.weeks), label: "Weeks" },
          { id: "bf", value: `${r.bodyFatPct}% → ${r.targetBodyFatPct}%`, label: "Body fat" },
        ]}
      />

      <p className="mt-6 text-[14.5px] leading-[1.65] text-mute">
        This date is what{" "}
        <Link href="/geebs-method" className="text-cloudText underline underline-offset-4">
          the Geebs Method
        </Link>{" "}
        is built to hit — the four levers adjusted against your real weekly data,
        not a fixed plan.
      </p>

      <PlanGate />

      {f.truncatedAt ? (
        <p className="mt-5 border-l-2 border-cloudText pl-3 text-[14px] leading-[1.6] text-bone/85">
          We stop drawing at {f.truncatedAt} weeks. Past that a line is a
          horoscope, not a plan.
        </p>
      ) : null}
    </section>
  );
}

"use client";

// ============================================================
//  GuidedSteps: one question per screen
//
//  Built for /assessment, written to be shared. Every calculator
//  under /tools currently renders all of its fields at once, which
//  asks someone to understand the whole form before answering any of
//  it. This shell asks one thing, takes the answer, and moves.
//
//  It owns navigation, progress, focus and the contract analytics
//  (form_start once, form_step per advance). A consumer supplies the
//  questions and decides when each one is answered, and nothing else.
//
//  Adopting it in an existing tool means splitting that tool's fields
//  into steps. No calculation changes.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

/** Which forms have already reported form_start, for this page load.
 *
 *  This lives at module scope rather than in a ref because a step's
 *  render function is invoked DURING render, so every function reachable
 *  from it must be incapable of touching a ref. The React compiler
 *  enforces that, and it is right to: a ref read during render is a bug
 *  waiting for a re-render to expose it. "Once per form per page load"
 *  is a page-lifetime fact anyway, which is exactly this scope. */
const startedForms = new Set<string>();

export type GuidedStep = {
  /** Stable slug, used as the analytics step value. Never display copy. */
  id: string;
  question: string;
  help?: string;
  /** False keeps Continue disabled and blocks advancing. */
  isAnswered: boolean;
  /** A single-tap choice advances by itself, so the tap is the whole
   *  interaction. Steps that take typing keep the Continue button. */
  autoAdvance?: boolean;
  render: (advance: () => void) => React.ReactNode;
};

type GuidedStepsProps = {
  formId: string;
  steps: GuidedStep[];
  /** Label for the final step's button. */
  finishLabel: string;
  onFinish: () => void;
  /** Full-screen mode: one big question, help tucked behind "Why we ask",
   *  no clearance for the site's bottom nav (the host hides it). */
  takeover?: boolean;
  /** Rendered instead of the steps once the flow is finished. */
  children?: React.ReactNode;
  /** A short acknowledgement shown only above the first live question. */
  firstStepNote?: React.ReactNode;
};

export default function GuidedSteps({
  formId,
  steps,
  finishLabel,
  onFinish,
  takeover = false,
  firstStepNote,
}: GuidedStepsProps) {
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRenderRef = useRef(true);

  const total = steps.length;
  const step = steps[Math.min(index, total - 1)];
  const isLast = index === total - 1;

  // form_start fires once, on the first real answer rather than on
  // mount. A page view is not a form interaction, and counting it as
  // one would make every completion rate look worse than it is.
  const markStarted = useCallback(() => {
    if (startedForms.has(formId)) return;
    startedForms.add(formId);
    trackClientEvent("form_start", { form_id: formId });
  }, [formId]);

  /** Moves off the current step. Carries no answered-check of its own:
   *  both callers below establish that separately, and a check here
   *  reads the wrong render.
   *
   *  That is not a theoretical concern. When auto-advance guarded on
   *  step.isAnswered, a single tap could never advance: the guard was
   *  evaluated in the closure captured at tap time, where the answer it
   *  was testing for had not been committed yet. Every choice screen was
   *  a dead end, and no unit test could see it because the whole defect
   *  lived in the gap between a tap and the next render. */
  const go = useCallback(
    (stepId: string, stepIndex: number) => {
      markStarted();
      trackClientEvent("form_step", {
        form_id: formId,
        step: stepId,
        step_number: stepIndex + 1,
        step_count: total,
      });
      if (stepIndex === total - 1) {
        onFinish();
        return;
      }
      setIndex((i) => Math.min(i + 1, total - 1));
    },
    [formId, markStarted, onFinish, total],
  );

  /** The Continue button. Here the answer IS committed, so the step's own
   *  validity is the right thing to trust. */
  const advance = useCallback(() => {
    if (!step.isAnswered) return;
    go(step.id, index);
  }, [go, index, step]);

  const back = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  /** Handed to each step. A choice step reports its answer and advances
   *  in the same gesture, so the tap is the whole interaction. The short
   *  timeout lets the selected state paint before the screen changes,
   *  otherwise the tap appears to do nothing and then teleport.
   *
   *  Defined here rather than inline in the JSX: built during render it
   *  closes over ref access, which the React compiler rightly refuses. */
  /** Handed to every step. A choice step calls it in the same gesture that
   *  records the answer, so the answer is taken as given rather than
   *  re-checked against a render that predates it.
   *
   *  The delay lets the selected state paint before the screen changes, so
   *  a tap is visibly received instead of appearing to teleport. */
  const onAnswered = useCallback(() => {
    const stepId = step.id;
    const stepIndex = index;
    const auto = step.autoAdvance;
    window.setTimeout(() => {
      if (auto) {
        go(stepId, stepIndex);
      } else {
        markStarted();
      }
    }, 140);
  }, [go, index, markStarted, step.autoAdvance, step.id]);

  // Moving the question into focus is what makes this usable with a
  // screen reader and on a phone, where the old screen has scrolled
  // away but focus would otherwise stay where it was.
  useEffect(() => () => void startedForms.delete(formId), [formId]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const percent = useMemo(
    () => Math.round(((index + 1) / total) * 100),
    [index, total],
  );

  return (
    <div
      data-form-id={formId}
      data-guided-steps
      // The site carries a sticky bottom nav. Without clearance it covers the
      // last option of a long step, which on question 9 meant the final
      // choice could be tapped only after scrolling past it.
      className={
        takeover
          ? "guided-steps flex min-h-[calc(var(--assessment-visible-height,100dvh)-64px)] flex-col pb-6"
          : "guided-steps pb-28 sm:pb-8"
      }
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2 transition-all duration-300">
          {index + 1} of {total}
        </p>
        {index > 0 && (
          <button
            type="button"
            onClick={back}
            className="text-[13px] text-mute underline underline-offset-4 hover:text-bone"
          >
            Back
          </button>
        )}
      </div>

      <div
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Assessment progress"
      >
        <div
          className="h-full rounded-full bg-cloud transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div data-guided-content className={takeover ? "mt-8 flex flex-1 flex-col justify-center" : "mt-8"}>
        {index === 0 && firstStepNote}
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={
            takeover
              ? "display text-bone text-[32px] sm:text-[40px] md:text-[48px] leading-[1.08] outline-none"
              : "display text-bone text-[22px] md:text-[27px] leading-[1.18] outline-none"
          }
        >
          {step.question}
        </h2>
        {step.help &&
          (takeover ? (
            <details className="mt-3 text-[13.5px] text-mute2">
              <summary className="cursor-pointer underline underline-offset-4">
                Why we ask
              </summary>
              <p className="mt-2 leading-[1.6] max-w-[52ch]">{step.help}</p>
            </details>
          ) : (
            <p className="mt-3 text-[14.5px] leading-[1.6] text-mute max-w-[52ch]">
              {step.help}
            </p>
          ))}

        <div className="mt-7">{step.render(onAnswered)}</div>

        {!step.autoAdvance && (
          <div data-guided-action>
            <button
            type="button"
            onClick={advance}
            disabled={!step.isAnswered}
            className="btn btn-primary mt-8 w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLast ? finishLabel : "Continue"}
            <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- choice primitives -------------------------------

/** The tap target used by every choice step. Full width, one per row,
 *  so it is reachable with a thumb and readable at a glance. */
export function ChoiceButton({
  selected,
  onClick,
  children,
  image,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "w-full rounded-[10px] border px-4 py-4 text-left text-[15.5px] leading-[1.4] transition-colors",
        image ? "min-h-[84px]" : "min-h-[56px]",
        "flex items-center justify-between gap-3",
        selected
          ? "border-cloud bg-cloud/10 text-bone"
          : "border-line bg-transparent text-bone/85 hover:border-bone/40",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-3">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            className="h-14 w-20 shrink-0 rounded-[7px] object-cover sm:h-16 sm:w-24"
          />
        ) : null}
        <span className="min-w-0">{children}</span>
      </span>
      <span
        aria-hidden="true"
        className={[
          "h-[18px] w-[18px] flex-shrink-0 rounded-full border",
          selected ? "border-cloud bg-cloud" : "border-line",
        ].join(" ")}
      />
    </button>
  );
}

export function ChoiceGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

/** Short, ordered options: a count, a rating, a number of days. Rendered as a
 *  wrapping row of chips rather than stacked rows, because seven full-width
 *  buttons turns picking a number into a scroll. Each chip still clears the
 *  24px AA tap-target floor with room over. */
export function ChoiceChips<T extends string | number>({
  options,
  selected,
  onSelect,
  label,
}: {
  options: { value: T; label: string }[];
  selected: T | null;
  onSelect: (v: T) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label={label}>
      {options.map((o) => {
        const isOn = selected === o.value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onSelect(o.value)}
            aria-pressed={isOn}
            className={[
              "min-h-[52px] min-w-[52px] flex-1 basis-[calc(33.333%-0.667rem)]",
              "rounded-[10px] border px-3 py-3 text-[15px] leading-[1.25] transition-colors",
              isOn
                ? "border-cloud bg-cloud/10 text-bone"
                : "border-line text-bone/85 hover:border-bone/40",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

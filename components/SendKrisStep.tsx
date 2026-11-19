"use client";

import { useEffect } from "react";
import RailCta from "@/vendor/rail-kit/RailCta";
import { writeApplyHandoff } from "@/lib/applyHandoff";

/**
 * The "send it to Kris" step on the pages Google sends the most people to.
 *
 * WHY THIS EXISTS (GA4 538698079, 2026-09-09 → 10-06)
 * Organic Search brought 545 sessions and 0 key events. The two biggest
 * search pages already HAD an apply link — it just sat where nobody chose it:
 *   - body-recomp calculator: 71 users finished the calculation, 4 clicked the
 *     apply button under the result (it came after a method note, a three-way
 *     explainer, and three equal-weight buttons).
 *   - skinny-fat guide: 129 users, 4 apply clicks.
 * This step is one decision with one button, placed where the reader has just
 * got the thing they came for, and it carries what they already told the page
 * into the application so nothing has to be typed twice.
 *
 * MEASUREMENT
 * `data-cta` / `data-cta-position` sit on the wrapper. Every click on an
 * /apply link is already measured by the site's own layer
 * (components/GoogleAnalytics.tsx → `apply_cta_clicked`, mirrored to the
 * contract `cta_click`), which reads these two attributes from the nearest
 * ancestor. Emitting a second cta_click here would double-count the click.
 * The button is a rail-kit RailCta, not `.btn`, so the blog's
 * `.article-scope .btn` heuristic does not also fire `article_cta_click`.
 *
 * COPY
 * The fineprint and the calculator's body repeat two facts /apply already
 * states on the page itself ("Two minutes, no payment", "Kris reads every
 * application himself"). Nothing here is a new claim.
 */
export type SendKrisStepProps = {
  /** Stable measurement id — never edit once shipped (see lib/ctaCopy.ts). */
  ctaId: string;
  position: string;
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  href: string;
  /** The reader's own numbers, shown back as "what Kris will see". */
  summary?: string[];
  secondary?: { label: string; href: string; ctaId: string };
  /**
   * Text handed to the application (lib/applyHandoff.ts), keyed to the
   * link's entry_content. Kept out of the URL on purpose; the reader sees it
   * as the `summary` chips.
   */
  handoff?: { entryContent: string; text: string };
  className?: string;
};

export const SEND_KRIS_FINEPRINT = "Two minutes, no payment.";

export default function SendKrisStep({
  ctaId,
  position,
  eyebrow,
  title,
  body,
  label,
  href,
  summary,
  secondary,
  handoff,
  className,
}: SendKrisStepProps) {
  const handoffEntry = handoff?.entryContent;
  const handoffText = handoff?.text;
  useEffect(() => {
    if (handoffEntry && handoffText) writeApplyHandoff(handoffEntry, handoffText);
  }, [handoffEntry, handoffText]);

  return (
    <aside
      aria-label="Send Kris your details"
      data-send-kris-step={ctaId}
      className={[
        "reader-scale-exempt rounded-2xl border border-[#B91C1C]/50 bg-[#B91C1C]/[0.07] p-5 md:p-7",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="eyebrow text-cloudText">{eyebrow}</p>
      <h2 className="mt-2 text-[21px] font-semibold leading-[1.15] text-bone md:text-[25px]">
        {title}
      </h2>
      <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.6] text-mute md:text-[16px]">
        {body}
      </p>
      {summary && summary.length > 0 ? (
        <p className="mt-4 text-[13.5px] leading-[1.6] text-mute">
          <span className="text-mute2">What Kris will see: </span>
          <span className="text-bone">{summary.join(" · ")}</span>
        </p>
      ) : null}
      <div className="mt-5" data-cta={ctaId} data-cta-position={position}>
        <RailCta
          label={label}
          href={href}
          fineprint={SEND_KRIS_FINEPRINT}
          variant="primary"
          size="md"
          block
          arrow
          source={ctaId}
        />
      </div>
      {secondary ? (
        <p className="mt-4 text-[14px] text-mute">
          <a
            href={secondary.href}
            className="underline decoration-line2 underline-offset-4 hover:text-bone"
            data-cta={secondary.ctaId}
            data-cta-position={position}
          >
            {secondary.label}
          </a>
        </p>
      ) : null}
    </aside>
  );
}

import Link from "next/link";
import VslEmbedFrame from "@/components/VslEmbedFrame";

type CoachingDecisionVideoProps = {
  source: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  decisionHref?: string;
  decisionLabel?: string;
  headingLevel?: 2 | 3;
  className?: string;
};

/**
 * A small, optional video decision aid for a reader considering 1:1 coaching.
 *
 * It deliberately stays out of general educational pages. The video answers
 * the question immediately before an application: who is the coach and what
 * happens after the click? The actual player is still click-to-load, so a
 * third-party iframe never arrives until the visitor chooses to watch.
 */
export default function CoachingDecisionVideo({
  source,
  eyebrow = "Before you apply",
  title = "Hear how Kris approaches the call.",
  body = "Kris explains what he looks for, what happens after your application, and how he decides whether coaching is a fit.",
  decisionHref = "/apply",
  decisionLabel = "Start your application",
  headingLevel = 3,
  className = "",
}: CoachingDecisionVideoProps) {
  const headingClass =
    "display mt-2 text-[20px] leading-[1.12] text-bone md:text-[24px]";

  return (
    <section
      aria-label="Kris explains the coaching call"
      data-coaching-decision-video="true"
      data-no-fold="true"
      className={`rounded-xl border border-line2 bg-black/20 p-4 md:p-5 ${className}`}
    >
      <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 sm:grid-cols-[136px_minmax(0,1fr)] sm:gap-5">
        <VslEmbedFrame presentation="wide" autoplayOnVisible />
        <div className="flex min-w-0 flex-col items-start">
          <p className="eyebrow text-cloudText">{eyebrow}</p>
          {headingLevel === 2 ? (
            <h2 className={headingClass}>{title}</h2>
          ) : (
            <h3 className={headingClass}>{title}</h3>
          )}
          <p className="mt-3 text-[14px] leading-[1.55] text-mute md:text-[15px]">
            {body}
          </p>
          <Link
            href={decisionHref}
            className="mt-4 text-[14px] font-semibold text-bone underline decoration-cloudText/60 underline-offset-4 hover:text-cloudText"
            data-analytics-source={`${source}_vsl`}
            data-analytics-link-kind="primary"
          >
            {decisionLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

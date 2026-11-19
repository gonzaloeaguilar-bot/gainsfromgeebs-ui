import { clientResults } from "@/data/clientResults";
import { OVER40_PROOF_RESULT_ID } from "@/data/over40Hub";

/**
 * One real client over 40, in his own words. Reads the record from
 * data/clientResults.ts instead of restating it, so the age, the outcome and
 * the quote can never drift from what the client gave permission to publish.
 * Renders nothing if the record is ever removed.
 */
export default function Over40Proof({ className = "" }: { className?: string }) {
  const result = clientResults.find((r) => r.id === OVER40_PROOF_RESULT_ID);
  if (!result || result.permission !== "explicit") return null;
  return (
    <figure className={`border-y border-line2 py-6 ${className}`} data-section="over40-proof">
      <p className="eyebrow text-cloudText">A client over 40</p>
      <blockquote className="mt-3 text-[16px] md:text-[17px] leading-[1.65] text-bone/90 max-w-[62ch]">
        &ldquo;{result.homepageQuote ?? result.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-[13.5px] leading-[1.55] text-mute">
        {result.name}, {result.age} · {result.outcome}
      </figcaption>
    </figure>
  );
}

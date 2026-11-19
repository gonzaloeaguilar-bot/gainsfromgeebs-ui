import Link from "next/link";
import { COACH_NAME, ENTITY_SENTENCE } from "@/lib/entity";

/**
 * One sentence naming the coach and the brand, placed as the first line a
 * reader (or an AI engine quoting the page) meets. See lib/entity.ts for why.
 * The name links to /about; the rest of the sentence is plain text so the
 * whole thing is one quotable unit in the raw HTML.
 */
export default function EntityLine({ className = "" }: { className?: string }) {
  const rest = ENTITY_SENTENCE.slice(COACH_NAME.length);
  return (
    <p
      data-entity-line=""
      className={`reader-scale-exempt text-[13px] leading-[1.6] text-mute2 ${className}`.trim()}
    >
      <Link href="/about" className="underline decoration-mute2/40 underline-offset-2 hover:text-bone">
        {COACH_NAME}
      </Link>
      {rest}
    </p>
  );
}

import Link from "next/link";

/**
 * Accountability line for a page: who stands behind it, and when it was last
 * maintained if the page tracks that.
 *
 * WHY THIS EXISTS. The 2026-09-23 GEO audit measured the credential "NASM-CPT" on
 * 15 of 23 sampled pages but on ZERO of the money pages — `/`, `/geebs-method`,
 * `/results`, `/packages`. The informational pages (guides, blog, /for, /faq) all
 * carry a byline; the pages that actually sell carried none, so the surfaces with
 * the most commercial intent had the least author authority. Content E-E-A-T scored
 * 71/100 almost entirely because of that split.
 *
 * WHY `updated` IS OPTIONAL, AND WHY THAT MATTERS. A "last updated" date the page
 * does not really maintain is a FALSE freshness signal and is worse than no date —
 * it degrades the trust it is supposed to build. So this renders a date only where
 * the page already owns one as a maintained constant (`/packages` tracks
 * DATE_MODIFIED, `/geebs-method` tracks dateModified in its schema). Pages with no
 * maintained date get the credential alone rather than a manufactured timestamp.
 * Deriving one from the last git commit was considered and rejected: a commit that
 * changed a button label is not a content review.
 */
export default function PageByline({
  updated,
  note,
  className = "",
}: {
  /** ISO date the page's own content actually tracks. Omit if the page has none. */
  updated?: string;
  /** Optional scope caveat, e.g. that prices are quoted rather than listed. */
  note?: string;
  className?: string;
}) {
  return (
    <p className={`text-[13px] leading-[1.6] text-mute2 ${className}`.trim()}>
      Reviewed by{" "}
      <Link href="/about" className="underline hover:text-bone">
        Kris Oddo, NASM-CPT
      </Link>
      , founder and head coach of Gains From Geebs
      {updated ? <> &middot; last updated {updated}</> : null}
      {note ? <> &middot; {note}</> : null}
    </p>
  );
}

import PromoSweep from "@/components/PromoSweep";
import {
  scholarshipHref,
  SCHOLARSHIP_ANALYTICS_EVENT,
  SCHOLARSHIP_TERMS,
} from "@/lib/scholarshipAnchors";

/**
 * Slim top-of-page callout for the ranked money pages.
 *
 * Deliberately one line of offer, one line of cost, one link: it sits above the
 * article and must not push the H1 or the answer the visitor searched for below
 * the fold. A server component on purpose — the delegated click handler in
 * GoogleAnalytics reads `data-analytics-event`, so this needs no client JS.
 */
export default function ScholarshipCallout({
  sourcePath,
}: {
  sourcePath: string;
}) {
  return (
    <PromoSweep className="mb-6">
      <aside
        aria-label="Coaching scholarship"
        /* Red, and it shimmers. It was a faint bone-tinted outline that read
           as a disclaimer rather than as the strongest free offer on the
           page. The sweep was already wired through PromoSweep; the shimmer
           just had nothing warm to move across. */
        data-scholarship-callout
        className="scholarship-callout rounded-[6px] border border-cloudText/70 px-4 py-3.5 md:px-5 md:py-4"
      >
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between md:gap-4">
          <p className="text-[16px] leading-[1.55] text-mute md:text-[16.5px]">
            <span className="font-semibold text-bone">
              Coaching scholarship &middot;{" "}
              {SCHOLARSHIP_TERMS.spots.toLowerCase()}:
            </span>{" "}
            {SCHOLARSHIP_TERMS.duration} with Kris.{" "}
            {SCHOLARSHIP_TERMS.applyCost}
          </p>
          <a
            href={scholarshipHref("top_callout", sourcePath)}
            data-analytics-event={SCHOLARSHIP_ANALYTICS_EVENT}
            data-analytics-link-kind="titanforge_intensive_referral"
            className="btn btn-secondary shrink-0 whitespace-nowrap"
          >
            See if you qualify <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </aside>
    </PromoSweep>
  );
}

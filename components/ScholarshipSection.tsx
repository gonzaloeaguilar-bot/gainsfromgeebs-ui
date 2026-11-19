import Link from "next/link";
import PromoSweep from "@/components/PromoSweep";
import {
  scholarshipHref,
  SCHOLARSHIP_ANALYTICS_EVENT,
  SCHOLARSHIP_TERMS,
} from "@/lib/scholarshipAnchors";

/**
 * The full scholarship section for ranked money pages.
 *
 * Placed before each page's existing "apply for 1:1 coaching" CTA so it reads as
 * the lower-commitment first rung rather than a competing offer. The internal
 * link to /scholarship is deliberate: that page is indexable and new, and these
 * are the only Geebs pages with enough authority to pass it anything.
 */
export default function ScholarshipSection({
  sourcePath,
}: {
  sourcePath: string;
}) {
  // mb-12 as well as mt-12: on /vs/* and the cost guide the next block is
  // MoneyPageProof with no top margin, so the folded scholarship heading sat
  // flush on its eyebrow (0px at 390px, 2026-09-29).
  return (
    <PromoSweep className="mt-12 mb-12 max-w-[760px]">
      <section
        aria-labelledby="scholarship-section-title"
        className="border-t border-line2 pt-10"
      >
        <p className="eyebrow text-cloudText">Coaching scholarship</p>
        <h2
          id="scholarship-section-title"
          className="display mt-3 text-[30px] leading-[1.05] text-bone md:text-[38px]"
        >
          30 days of free 1:1 coaching with Kris.
        </h2>
        <p className="mt-3 max-w-[60ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
          {SCHOLARSHIP_TERMS.spots} are open. Titan Forge runs a 30-day coaching
          intensive and Kris is one of the two coaches, alongside Steve
          Ginevan, PhD. You get{" "}
          {SCHOLARSHIP_TERMS.cadence} and a plan shaped around your progress.
        </p>
        <ul className="mt-4 max-w-[60ch] space-y-2 text-[15px] leading-[1.6] text-mute">
          <li>
            &middot; {SCHOLARSHIP_TERMS.applyCost} It takes{" "}
            {SCHOLARSHIP_TERMS.timeToApply}.
          </li>
        </ul>
        <p className="mt-3 max-w-[60ch] text-[13px] leading-[1.6] text-mute2">
          If you are selected, a $50 deposit holds your spot. No payment is
          collected in the application form.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={scholarshipHref("section", sourcePath)}
            data-analytics-event={SCHOLARSHIP_ANALYTICS_EVENT}
            data-analytics-link-kind="titanforge_intensive_referral"
            className="btn btn-primary"
          >
            Apply for the scholarship <span aria-hidden="true">&rarr;</span>
          </a>
          <Link href="/scholarship" className="btn btn-secondary">
            How the scholarship works
          </Link>
        </div>
        {/*
          The scholarship is one option among several, and somebody reading a pricing
          page may need the cheaper ones instead. This link is also the only internal
          route into the affordability guide: without it that page is an orphan reachable
          only from the sitemap, and a new page with no internal links does not rank.
          This section renders on the money pages that already receive search traffic,
          including /guides/how-much-does-an-online-fitness-coach-cost.
        */}
        <p className="mt-5 max-w-[60ch] text-[14.5px] leading-[1.65] text-mute2">
          Not sure the scholarship is the right route?{" "}
          <Link
            href="/guides/cant-afford-a-personal-trainer"
            className="underline hover:text-bone"
          >
            Five ways to get coached when you cannot afford a trainer
          </Link>{" "}
          compares every option, including the free ones.
        </p>
      </section>
    </PromoSweep>
  );
}

import Link from "next/link";

type HubRetentionCTAProps = {
  /** Audience-hub slug, e.g. "men-over-40". Used for attribution + UTM. */
  hub: string;
};

/**
 * Retention / daily-return CTA for the /for/* audience-hub landing pages.
 *
 * These hub pages pull real search traffic for high-intent audience queries
 * ("online fitness coach for men over 40", "coaching for busy professionals")
 * but are one-and-done: a visitor reads the pitch and either applies or
 * leaves, so retention is ~0. This block converts that one-time reach into a
 * returning audience — a link to the daily "Daily Finding" habit surface
 * (/free/daily) plus weekly email capture — mirroring the pattern already
 * shipped on the free calculators (ToolRetentionCTA), blog posts
 * (RelatedGuides), and standalone guides (GuideRetentionCTA).
 *
 * Copy is site/marketing voice only (no coaching prose), so the Kris-voice
 * hard-stop is respected.
 */
export default function HubRetentionCTA({ hub }: HubRetentionCTAProps) {
  const dailyHref = `/free/daily?utm_source=site&utm_medium=hub&utm_campaign=hub_retention&utm_content=${hub}`;

  return (
    <>
      <div className="hair my-10" />

      <section aria-labelledby={`keep-going-${hub}`}>
        <p className="eyebrow text-cloudText">Come back tomorrow</p>
        <h2
          id={`keep-going-${hub}`}
          className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
        >
          Coaching is the plan. The habit is what changes your body.
        </h2>
        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-mute max-w-[60ch]">
          Staying on track is the daily part, so we publish one
          evidence-based finding every day.
        </p>

        <div className="mt-6 divide-y divide-line2 border-y border-line2 text-[15px]">
          <Link
            href={dailyHref}
            className="group grid min-h-20 gap-1 py-4 no-underline"
          >
            <span className="font-semibold text-bone group-hover:text-cloudText">
              The Daily Finding →
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">
              A new, already-vetted study broken down in plain language — a
              fresh one every day. Bookmark it and check back.
            </span>
          </Link>
        </div>

        {/* No second email capture here (removed 2026-10-07). Every /for hub
            already carries the "Free coaching tip" capture in the numbers
            section above, so this was the same ask twice on one page: across
            all /for pages, 2026-08-01 -> 10-07, 2 tip opens and 0 signups.
            The 235px it cost pays for the entity line (#826) inside the
            10-screen budget in tests/e2e/page-folds.spec.ts. */}
      </section>
    </>
  );
}

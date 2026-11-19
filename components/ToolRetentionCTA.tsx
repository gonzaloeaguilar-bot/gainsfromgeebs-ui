import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

type ToolRetentionCTAProps = {
  /** Tool slug, e.g. "macro-calculator". Used for attribution + UTM. */
  tool: string;
};

/**
 * Retention / daily-return CTA for the free calculator pages.
 *
 * The calculators pull real search traffic but are one-and-done: a visitor
 * computes a number and leaves, so retention is ~0. This block converts that
 * one-time reach into a returning audience — a link to the daily
 * "Daily Finding" habit surface (/free/daily) plus weekly email capture —
 * WITHOUT gating the tool itself (the calculators stay free, no-signup).
 *
 * Copy is site/marketing voice only (no coaching prose), so the Kris-voice
 * hard-stop is respected.
 */
export default function ToolRetentionCTA({ tool }: ToolRetentionCTAProps) {
  const dailyHref = `/free/daily?utm_source=site&utm_medium=tool&utm_campaign=tool_retention&utm_content=${tool}`;

  return (
    <>
      <div className="hair my-10" />

      <section aria-labelledby={`keep-going-${tool}`}>
        <p className="eyebrow text-cloudText">Come back tomorrow</p>
        <h2
          id={`keep-going-${tool}`}
          className="mt-3 display text-bone text-[22px] md:text-[26px] leading-[1.15]"
        >
          One number today. The habit is what changes your body.
        </h2>
        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-mute max-w-[60ch]">
          A calculator gives you a target once. Staying on track is the daily
          part — so we publish one evidence-based training and nutrition finding
          every day, plus a weekly email that keeps the useful stuff in front of
          you.
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

        <div className="mt-8">
          <NewsletterSignup source={`tool:${tool}`} />
        </div>
      </section>
    </>
  );
}

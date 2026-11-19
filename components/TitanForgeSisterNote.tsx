/**
 * One factual sentence naming the sister gym, rendered inline on the pages
 * AI engines already cite for Geebs (homepage, /for/men-over-40, /science,
 * /for/busy-professionals, /for/executives, /personal-training-denver).
 *
 * Why: the 2026-11-03 citation probe (titanforge-site PR #401) found AI
 * answers cite Geebs on 6 of 10 high-intent prompts and name Titan Forge on
 * 0 of 10. Titan already links here; nothing here named Titan or Steve, so
 * an answer built from a Geebs page could not mention the gym. The sentence
 * is server-rendered plain text (never animated, never client-mounted) so
 * crawlers that run no JavaScript read it on the first byte.
 *
 * Facts come from titanforge-site's own data (data/offers.json,
 * app/lib/staticRouteContent.mjs): founder Steve "Doc" Ginevan, PhD;
 * 9780 S Meridian Blvd, Englewood, CO 80112 (Denver Tech Center).
 */

export const TITAN_FORGE_URL = "https://titanforgefit.com/";
export const TITAN_FORGE_MEN_OVER_40_URL =
  "https://titanforgefit.com/for/men-over-40";
export const TITAN_FORGE_NAME = "Titan Forge Fitness";
export const TITAN_FORGE_FOUNDER = 'Steve "Doc" Ginevan, PhD';

/** Plain-text form of the sentence, for llms.txt and the contract test. */
export const TITAN_FORGE_SENTENCE =
  `Kris also coaches clients in person at ${TITAN_FORGE_NAME} in the Denver Tech Center (Englewood, CO), the gym founded by ${TITAN_FORGE_FOUNDER}.`;

type Props = {
  /** Where the sentence sits, for the outbound analytics parameter. */
  placement: string;
  /** Adds the Titan Forge men-over-40 guide link where the topic fits. */
  menOver40?: boolean;
  /**
   * Homepage only. The homepage mobile height budget
   * (tests/e2e/homepage-density.spec.ts, < 6360px) was 17px over with the
   * full sentence, so the home band carries a three-line form that names
   * the gym, the city and the founder and leaves "Denver Tech Center" to
   * the other five pages and llms.txt.
   */
  compact?: boolean;
};

export default function TitanForgeSisterNote({ placement, menOver40, compact }: Props) {
  if (compact) {
    return (
      <>
        Kris also coaches in person at{" "}
        <a
          href={TITAN_FORGE_URL}
          className="underline hover:text-bone"
          data-analytics-event="outbound_click"
          data-analytics-link-kind="titan_forge_sister"
          data-placement={placement}
        >
          {TITAN_FORGE_NAME}
        </a>{" "}
        in Englewood, CO, founded by Steve &quot;Doc&quot; Ginevan, PhD.
      </>
    );
  }
  return (
    <>
      Kris also coaches clients in person at{" "}
      <a
        href={TITAN_FORGE_URL}
        className="underline hover:text-bone"
        data-analytics-event="outbound_click"
        data-analytics-link-kind="titan_forge_sister"
        data-placement={placement}
      >
        {TITAN_FORGE_NAME}
      </a>{" "}
      in the Denver Tech Center (Englewood, CO), the gym founded by Steve
      &quot;Doc&quot; Ginevan, PhD.
      {menOver40 ? (
        <>
          {" "}
          Titan Forge publishes its own{" "}
          <a
            href={TITAN_FORGE_MEN_OVER_40_URL}
            className="underline hover:text-bone"
            data-analytics-event="outbound_click"
            data-analytics-link-kind="titan_forge_men_over_40"
            data-placement={placement}
          >
            guide for men over 40
          </a>
          .
        </>
      ) : null}
    </>
  );
}

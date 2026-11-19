// ============================================================
//  StudyAtAGlance
//
//  The four facts a reader needs before they read a word of a study:
//  what kind of study it is, how much weight that design carries, when
//  it was published, and where.
//
//  All four were already on the page, set in 14px inside a definition
//  list under a heading called "Source details". Nobody scanning a
//  study page reads a definition list. Same facts, sized so the eye
//  lands on them.
//
//  Server-rendered on purpose. These are the page's credibility
//  signals, so they belong in the HTML that a crawler and an answer
//  engine receive, not in something a client effect fills in later.
// ============================================================

import SectionView from "@/components/SectionView";
import { evidenceTier } from "@/lib/evidenceTier";

export default function StudyAtAGlance({
  evidenceType,
  year,
  journal,
  pubmedId,
  doi,
}: {
  evidenceType: string;
  year: string;
  journal: string;
  pubmedId?: string;
  doi?: string;
}) {
  const tier = evidenceTier(evidenceType);

  return (
    <SectionView sectionId="study_at_a_glance">
      <section data-no-fold aria-labelledby="at-a-glance-heading">
        <p className="eyebrow text-cloudText">At a glance</p>
        <h2
          id="at-a-glance-heading"
          className="display mt-3 text-bone text-[23px] md:text-[29px] leading-[1.12]"
        >
          What kind of study this is
        </h2>

        <div className="mt-6 rounded-[10px] border border-cloudText/30 bg-cloudText/[0.06] p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {tier.label}
            </p>
            {/* Four rungs, filled to the tier. A reader should be able to
                place this study on the ladder without knowing the words. */}
            <div
              className="flex items-end gap-1.5"
              role="img"
              aria-label={`Evidence strength: tier ${tier.tier} of 4, where 1 is strongest`}
            >
              {[1, 2, 3, 4].map((rung) => (
                <span
                  key={rung}
                  className={[
                    "w-4 rounded-[2px]",
                    // Ascending left to right, filled from the left: the
                    // signal-strength metaphor everyone already reads without
                    // being taught it. Descending bars put the single lit bar
                    // of the weakest tier at the far right and the shortest
                    // height, which reads as an error rather than as "less".
                    rung === 1 ? "h-2" : rung === 2 ? "h-3" : rung === 3 ? "h-4" : "h-5",
                    rung <= 5 - tier.tier ? "bg-cloud" : "bg-line",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-[15px] leading-[1.65] text-bone/85 max-w-[62ch]">
            {tier.meaning}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">
              Design
            </dt>
            <dd className="mt-2 text-[16px] leading-[1.3] text-bone">
              {evidenceType}
            </dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">
              Published
            </dt>
            <dd className="display mt-2 text-[26px] leading-none text-bone">
              {year}
            </dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">
              Journal
            </dt>
            <dd className="mt-2 text-[16px] leading-[1.3] text-bone">{journal}</dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">
              Reference
            </dt>
            <dd className="mt-2 text-[16px] leading-[1.3] text-bone break-words">
              {pubmedId ? `PMID ${pubmedId}` : doi ? `DOI ${doi}` : "PubMed linked"}
            </dd>
          </div>
        </dl>
      </section>
    </SectionView>
  );
}

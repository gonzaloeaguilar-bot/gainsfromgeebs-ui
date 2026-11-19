// ============================================================
//  EvidenceVerdict
//
//  The answer a supplement page is actually asked: how good is the
//  evidence that this works.
//
//  Every page under /nutrition already grades each of its findings A
//  to D and writes a label for it. All 88 of those grades across the
//  section render as the last column of a six-column table, in the
//  smallest type on the page, behind a horizontal scroll on a phone.
//  Same data, read first instead of last.
//
//  Server-rendered: it is the page's headline claim, so it belongs in
//  the HTML a crawler and an answer engine receive.
// ============================================================

import SectionView from "@/components/SectionView";
import { RailProgress } from "@/vendor/rail-kit";
import { summariseGrades } from "@/lib/evidenceGrade";

export default function EvidenceVerdict({
  rows,
  subject,
}: {
  rows: { grade: string; gradeLabel?: string }[];
  /** What was graded, for the label: "creatine", "ashwagandha". */
  subject: string;
}) {
  const s = summariseGrades(rows);
  if (!s) return null;

  return (
    <SectionView sectionId="evidence_verdict">
      {/* Not folded: this is the answer, not a supporting section. */}
      <section data-no-fold aria-labelledby="evidence-verdict-heading">
        <p className="eyebrow text-cloudText">The verdict</p>
        <h2
          id="evidence-verdict-heading"
          className="display mt-3 text-bone text-[23px] md:text-[29px] leading-[1.12]"
        >
          How good is the evidence?
        </h2>

        <div className="mt-6 rounded-[10px] border border-cloudText/30 bg-cloudText/[0.06] p-5 md:p-6">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="display text-bone text-[44px] leading-none">
              {s.headline}
            </p>
            <p className="display text-bone text-[22px] leading-tight">
              {s.headlineLabel}
            </p>
          </div>
          <p className="mt-3 text-[15px] leading-[1.65] text-bone/85 max-w-[62ch]">
            {s.meaning}
          </p>

          {/* No format callback is passed: this component is server-rendered
              on purpose, and a function cannot cross into a client component.
              Typecheck and 1,054 unit tests passed on the version that did
              pass one; only the production build caught it. */}
          <div className="mt-5">
            <RailProgress
              label={`Findings on ${subject} at grade ${s.headline}`}
              value={s.counts[s.headline]}
              target={s.total}
              note={s.spread ?? undefined}
              source="nutrition-evidence"
            />
          </div>
        </div>

        <p className="mt-4 text-[13.5px] leading-[1.6] text-mute2 max-w-[64ch]">
          The grade follows the study design, not how plausible the mechanism
          sounds. Every finding is graded separately in the table below.
        </p>
      </section>
    </SectionView>
  );
}

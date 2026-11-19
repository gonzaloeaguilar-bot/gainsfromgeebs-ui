// ============================================================
//  Evidence grade, summarised
//
//  The 23 supplement pages under /nutrition each carry an
//  EVIDENCE_ROWS array where every row already has a grade, A to D,
//  and a written label. That is 88 graded findings across the section,
//  and all of it renders as the last column of a six-column table, in
//  the smallest text on the page, behind a horizontal scroll on a
//  phone.
//
//  It is the one fact a reader actually needs: how good is the
//  evidence that this works. This turns the rows into a summary,
//  without inventing anything.
// ============================================================

export type Grade = "A" | "B" | "C" | "D";

export type GradeSummary = {
  /** The grade shown big. The MODE, not the best: a page with one A and
   *  four Ds is a D page, and leading with the A would be the exact
   *  overclaim these pages exist to avoid. */
  headline: Grade;
  /** The label the page itself wrote for that grade. */
  headlineLabel: string;
  counts: Record<Grade, number>;
  total: number;
  /** Best and worst present, so a mixed page can say it is mixed. */
  best: Grade;
  worst: Grade;
  /** One sentence a non-specialist can act on. */
  meaning: string;
  /** Renders under the grade when the page is not uniform. */
  spread: string | null;
  /** Findings the page itself declined to grade, usually written
   *  "Insufficient". Counted in `total` on purpose: hiding them would let a
   *  page with one B and one ungradable finding read as "1 of 1 at grade B". */
  ungraded: number;
};

const ORDER: Grade[] = ["A", "B", "C", "D"];

/** Used when a page grades a row but writes no label for it. Some do. */
const DEFAULT_LABEL: Record<Grade, string> = {
  A: "Strong",
  B: "Moderate",
  C: "Mixed",
  D: "Weak",
};

const MEANING: Record<Grade, string> = {
  A: "Consistent evidence from strong study designs. About as settled as nutrition research gets.",
  B: "Reasonable evidence, with real limits. Worth acting on, not worth betting the plan on.",
  C: "Mixed or indirect evidence. Plausible, and not established.",
  D: "Early or weak evidence. Interesting, and not a reason to change what you are doing.",
};

/** /nutrition carries two conventions, and both are live:
 *
 *   { grade: "B", gradeLabel: "Moderate" }
 *   { grade: "B \u2014 Moderate" }
 *
 * and a third value that is not a grade at all, "Insufficient \u2014 ...",
 * which means the page declined to grade that finding. Parsing the leading
 * letter handles the first two; the third correctly yields nothing. */
function parseGrade(raw: string): { grade: Grade; label?: string } | null {
  const m = /^\s*([ABCD])\b\s*(?:[\u2014\u2013-]\s*(.+))?$/.exec(raw);
  if (!m) return null;
  return { grade: m[1] as Grade, label: m[2]?.trim() || undefined };
}

export function summariseGrades(
  rows: { grade: string; gradeLabel?: string }[],
): GradeSummary | null {
  const graded = rows
    .map((r) => {
      const p = parseGrade(r.grade);
      return p ? { grade: p.grade, gradeLabel: r.gradeLabel ?? p.label } : null;
    })
    .filter((r): r is { grade: Grade; gradeLabel: string | undefined } => r !== null);
  const ungraded = rows.length - graded.length;
  if (graded.length === 0) return null;

  const counts: Record<Grade, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of graded) counts[r.grade] += 1;

  // Mode, and on a tie the WEAKER grade wins. A page split evenly
  // between B and D is not a B page.
  let headline: Grade = ORDER[0];
  let bestCount = -1;
  for (const g of ORDER) {
    if (counts[g] >= bestCount) {
      bestCount = counts[g];
      headline = g;
    }
  }

  const present = ORDER.filter((g) => counts[g] > 0);
  const best = present[0];
  const worst = present[present.length - 1];

  const label =
    graded.find((r) => r.grade === headline && r.gradeLabel)?.gradeLabel ??
    DEFAULT_LABEL[headline];

  const rangeNote =
    present.length > 1
      ? `Findings on this page range from ${best} to ${worst}.`
      : null;
  const ungradedNote =
    ungraded > 0
      ? `${ungraded} further finding${ungraded === 1 ? " was" : "s were"} judged insufficient to grade.`
      : null;
  const spread =
    [rangeNote, ungradedNote].filter(Boolean).join(" ") || null;

  return {
    headline,
    headlineLabel: label,
    counts,
    total: graded.length + ungraded,
    best,
    worst,
    meaning: MEANING[headline],
    spread,
    ungraded,
  };
}

// ============================================================
//  StatCards
//
//  Big numbers with the sentence that makes them mean something.
//
//  For the case where a page already contains the decisive figures and
//  has them buried in a paragraph. A reader deciding whether to spend
//  money should not have to parse a sixty-word sentence to find three
//  price bands that are the whole answer.
//
//  Server-rendered. The figures are the part an answer engine quotes,
//  so they belong in the HTML.
// ============================================================

import SectionView from "@/components/SectionView";

export type Stat = {
  /** The figure itself. A string, because ranges and "+" are figures too. */
  value: string;
  /** Unit or qualifier, set smaller next to the value. */
  unit?: string;
  /** What the figure is. */
  label: string;
  /** One sentence on what it buys, or why it differs. */
  detail?: string;
  /** Draws the eye to the band the page is actually arguing for. */
  emphasis?: boolean;
};

export default function StatCards({
  stats,
  eyebrow,
  heading,
  sectionId,
  footnote,
  columns = 3,
}: {
  stats: Stat[];
  /** How many across on a wide screen. A four-item set wrapping 3 + 1 reads
   *  as a mistake rather than as a set. */
  columns?: 2 | 3 | 4;
  /** Optional. Pages whose shell hoists h2 into a collapsible fold move the
   *  heading above its siblings on the client, which strands an eyebrow
   *  underneath the title it was introducing. Omit it on those pages. */
  eyebrow?: string;
  heading: string;
  sectionId: string;
  footnote?: string;
}) {
  if (!stats.length) return null;

  return (
    <SectionView sectionId={sectionId}>
      <section data-no-fold aria-labelledby={`${sectionId}-heading`}>
        {eyebrow && <p className="eyebrow text-cloudText">{eyebrow}</p>}
        <h2
          id={`${sectionId}-heading`}
          className="display mt-3 text-bone text-[23px] md:text-[29px] leading-[1.12]"
        >
          {heading}
        </h2>

        <div
          className={[
            "mt-6 grid gap-3",
            columns === 2
              ? "sm:grid-cols-2"
              : columns === 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-3",
          ].join(" ")}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className={[
                "rounded-[10px] border p-5",
                s.emphasis
                  ? "border-cloudText/40 bg-cloudText/[0.07]"
                  : "border-line bg-bone/[0.025]",
              ].join(" ")}
            >
              <p className="text-[11.5px] uppercase tracking-[0.13em] text-mute2">
                {s.label}
              </p>
              <p className="display mt-2.5 text-bone text-[27px] leading-[1.05]">
                {s.value}
                {s.unit && (
                  <span className="text-mute2 text-[15px]"> {s.unit}</span>
                )}
              </p>
              {s.detail && (
                <p className="mt-3 text-[16px] leading-[1.6] text-mute">
                  {s.detail}
                </p>
              )}
            </div>
          ))}
        </div>

        {footnote && (
          <p className="mt-5 text-[16px] leading-[1.65] text-mute2 max-w-[64ch]">
            {footnote}
          </p>
        )}
      </section>
    </SectionView>
  );
}

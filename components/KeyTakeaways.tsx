// ============================================================
//  KeyTakeaways
//
//  The three or four things a reader should leave with, as numbered
//  cards at a size the eye stops on, before the prose starts.
//
//  Global on purpose. Study pages, guides and long posts all had the
//  same problem: the conclusions existed, spread through the body in
//  paragraphs, and a reader scanning on a phone met a wall of text and
//  left. Same words, hoisted and sized.
//
//  Server-rendered, so the takeaways sit in the HTML. That matters
//  twice over: it is the part a crawler should see, and it is the part
//  an answer engine is most likely to quote.
// ============================================================

import SectionView from "@/components/SectionView";

export type Takeaway = {
  /** A short, declarative claim. This is the part people read. */
  title: string;
  /** One or two sentences of support. Optional. */
  detail?: string;
};

export default function KeyTakeaways({
  takeaways,
  heading = "Key takeaways",
  sectionId = "key_takeaways",
}: {
  takeaways: Takeaway[];
  heading?: string;
  sectionId?: string;
}) {
  if (!takeaways.length) return null;

  return (
    <SectionView sectionId={sectionId}>
      <section data-no-fold aria-labelledby={`${sectionId}-heading`}>
        <p className="eyebrow text-cloudText">The short version</p>
        <h2
          id={`${sectionId}-heading`}
          className="display mt-3 text-bone text-[23px] md:text-[29px] leading-[1.12]"
        >
          {heading}
        </h2>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {takeaways.map((t, i) => (
            <li
              key={t.title}
              className="rounded-[10px] border border-line bg-bone/[0.025] p-5"
            >
              <span
                aria-hidden="true"
                className="display block text-[22px] leading-none text-cloudText"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[16.5px] leading-[1.4] text-bone">
                {t.title}
              </p>
              {t.detail && (
                <p className="mt-2.5 text-[16px] leading-[1.6] text-mute">
                  {t.detail}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </SectionView>
  );
}

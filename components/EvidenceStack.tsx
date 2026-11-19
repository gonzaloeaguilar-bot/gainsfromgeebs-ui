import { bucketForEvidenceType, evidenceBuckets } from "@/data/scienceEvidenceBuckets";

/**
 * The weight stack: where this study sits on the evidence ladder.
 *
 * Gonzalo's idea, from a photograph of a selectorized machine — plates 2.5 to
 * 97.5 and a pin through one of them. It survives the vault's own test for
 * gamification (busqueda-mecanicas-juego-2026-09-20: only a visible progress
 * meter and a personalised output have measured backing) because it is not a
 * third mechanic — it is the progress meter's honest sibling, a POSITION, and
 * the position is a real fact about the paper rather than a score the reader
 * earned.
 *
 * IT NEEDS A REAL AXIS OR IT IS DECORATION. Here it has one: study design is a
 * genuine ladder — a meta-analysis of many trials is not the same evidence as
 * one narrative review, and a reader who does not know that is exactly who
 * these pages are for. Measured across the library: 45 reviews, 20 controlled
 * trials, 7 narrative reviews, 6 observational.
 *
 * NOT ON THE RESOURCE SHELVES. A guide is not "heavier" than a calculator, so
 * plates there would be a picture of a machine rather than information.
 *
 * FOUR PLATES, NOT TWENTY. The photograph has twenty-one and a column that
 * tall fights a phone. Four is what the data supports and what reads at 390px.
 *
 * THE SIX UNCLASSIFIED STUDIES GET NO PLATE. A stack that invents a rung for a
 * paper whose design it could not read is the same defect as a count that
 * overstates a library — so those render the ladder with nothing pinned and
 * say so.
 */
export default function EvidenceStack({
  evidenceType,
  className,
}: {
  evidenceType: string;
  className?: string;
}) {
  const here = bucketForEvidenceType(evidenceType);
  /* Heaviest at the top, the way a stack is read and the way the plates in the
     photograph are numbered: you pin a weight and everything below it comes
     with you. */
  const plates = evidenceBuckets;
  const index = plates.findIndex((plate) => plate.id === here);

  return (
    <section
      className={["evidence-stack", className].filter(Boolean).join(" ")}
      aria-label="How strong this kind of study is"
      data-evidence-stack={here}
    >
      <p className="evidence-stack__eyebrow">How strong is this kind of study?</p>
      <ol className="evidence-stack__plates">
        {plates.map((plate, i) => {
          const pinned = i === index;
          const below = index >= 0 && i > index;
          return (
            <li
              key={plate.id}
              className="evidence-stack__plate"
              data-pinned={pinned ? "" : undefined}
              data-below={below ? "" : undefined}
              style={{ ["--plate-inset" as string]: `${i * 7}px` }}
            >
              <span className="evidence-stack__label">{plate.label}</span>
              {pinned ? (
                <span className="evidence-stack__pin">This study</span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="evidence-stack__foot">
        {index >= 0 ? (
          <>
            <strong>{evidenceType}.</strong> Heavier plates are built from more
            studies, so they move less when the next one lands.
          </>
        ) : (
          <>
            <strong>{evidenceType}.</strong> This design does not sit cleanly on
            the ladder, so nothing is pinned — read the limits below.
          </>
        )}
      </p>
    </section>
  );
}

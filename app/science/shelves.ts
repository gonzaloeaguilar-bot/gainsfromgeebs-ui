import type { ScienceStudy } from "@/data/scienceLibrary";
import { scienceLibraryTopics } from "@/data/scienceLibrary";
import { scienceLeadMagnets } from "@/data/scienceLeadMagnets";
import type { ShelfTheme } from "@/components/ScienceShelf";

const leadMagnetByTopic = new Map(
  scienceLeadMagnets.map((page) => [page.topic, page]),
);

/** One shelf per theme, books in the order the library holds them, with the
 *  theme's research page as the display copy at the end of the row. */
export function shelvesFor(studies: ScienceStudy[]): ShelfTheme[] {
  const known = new Set(
    scienceLibraryTopics.filter((topic) => topic !== "All") as string[],
  );
  // A promoted study arrives from the science inbox at runtime and can carry a
  // topic this list has never seen. Before this, such a study was filtered out
  // and appeared nowhere on the page — no shelf, no record, no PubMed link.
  // Anything unrecognised gets its own shelf instead of being dropped.
  const strays = studies.filter((study) => !known.has(study.topic));
  const strayShelf: ShelfTheme[] = strays.length
    ? [{ topic: "More research", studies: strays }]
    : [];

  const named: ShelfTheme[] = scienceLibraryTopics
    .filter((topic) => topic !== "All")
    .map((topic) => {
      const leadMagnet = leadMagnetByTopic.get(topic);
      return {
        topic,
        studies: studies.filter((study) => study.topic === topic),
        featured: leadMagnet
          ? {
              href: `/science/${leadMagnet.slug}`,
              label: leadMagnet.title.split("|")[0].trim(),
            }
          : undefined,
      };
    })
    .filter((shelf) => shelf.studies.length > 0);

  return [...named, ...strayShelf];
}

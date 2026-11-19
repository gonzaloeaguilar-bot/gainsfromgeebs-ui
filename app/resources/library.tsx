import { Shelf, type ShelfSection } from "@/components/ScienceShelf";
import { hubShelves } from "./hubShelves";

/**
 * The library: one front door, one shelf per kind of page.
 *
 * The site had five competing discovery surfaces — the homepage ResourceHub,
 * /science's shelves, /science/studies' browser, /science/questions, and this
 * page as seven flat cards linked from nowhere while the nav item called
 * "Resources" pointed at /blog. A third metaphor would have made that worse,
 * so this is the shelf that already works: measured in the 239-page audit,
 * /science draws 154 onward reads, the highest number on the site.
 *
 * Science is ONE SHELF here and keeps its own page as the room behind it. A
 * hub that listed the studies too would be the second front door this exists
 * to remove.
 */
export default function ResourceLibrary({ shelfIds }: { shelfIds?: string[] } = {}) {
  const shelves = hubShelves().filter(shelf => !shelfIds || shelfIds.includes(shelf.id));

  return (
    <div>
      {shelves.map((shelf) => {
        const section: ShelfSection = {
          topic: shelf.title,
          noun: shelf.noun,
          /* The face-out leaves the spines when it is one of them. A book
             cannot be on the shelf and stood out in front of it at once. */
          volumes: shelf.items
            .filter((item) => item.href !== shelf.featured?.href)
            .map((item) => ({
              id: item.href,
              title: item.title,
              /* No foot line. A year differs book to book and says how current
                 the work is; "Guide" stamped down a whole shelf of guides is
                 filler, which is what the first pass shipped. */
              foot: "",
              href: item.href,
            })),
          featured: shelf.featured ?? {
            href: shelf.items[0].href,
            label: shelf.items[0].title,
          },
          featuredLinkLabel: shelf.featured
            ? `Open ${shelf.featured.label.toLowerCase()}`
            : `Every ${shelf.noun.one}`,
          featuredGoLabel: shelf.featured?.go ?? "Start with this one",
        };

        return (
          <Shelf key={shelf.id} theme={section}>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
              {shelf.blurb}
            </p>
          </Shelf>
        );
      })}
    </div>
  );
}

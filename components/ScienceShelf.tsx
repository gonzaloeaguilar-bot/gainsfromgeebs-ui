import Link from "next/link";
import type { ScienceStudy } from "@/data/scienceLibrary";
import styles from "./scienceShelf.module.css";

/**
 * One shelf per theme. Every study is a book standing spine-out, and the
 * theme's research page is the display copy stood face-out at the end of the
 * row, the way a librarian leaves the one they want you to take.
 *
 * Server component: this ships zero JavaScript. The lift is CSS hover, the
 * browsing is native horizontal scroll.
 */

export interface ShelfTheme {
  topic: string;
  studies: ScienceStudy[];
  /** The theme's research page, when one exists. */
  featured?: { href: string; label: string };
}

/**
 * A book on a shelf, with nothing about it that is specific to a study.
 *
 * The shelf was written for the science library and coupled to `ScienceStudy`
 * through four things: an id, a short title, a year, and the
 * `/science/studies/<id>` href. That is all. Widening it to this shape is what
 * lets the resource centre be the same library rather than a second metaphor —
 * a site that browses two different ways in two places is the problem, not the
 * fix.
 */
export interface ShelfVolume {
  id: string;
  /** Goes on the spine, clipped at a word boundary. */
  title: string;
  /**
   * The small line at the foot of the spine: a year, "Tool", "vs". Empty when
   * there is nothing that varies — the first pass stamped "Read" on every
   * spine of a shelf, which is filler, not information.
   */
  foot: string;
  href: string;
}

export interface ShelfSection {
  topic: string;
  volumes: ShelfVolume[];
  featured?: { href: string; label: string };
  /** "volumes" by default; "studies, one page" reads wrong for a tool. */
  noun?: { one: string; many: string };
  /** Overrides "Open the <topic> research page", which is science wording. */
  featuredLinkLabel?: string;
  /** The line under the face-out title. Defaults to the science phrasing. */
  featuredGoLabel?: string;
}

export function volumesFromStudies(studies: ScienceStudy[]): ShelfVolume[] {
  return studies.map((study) => ({
    id: study.id,
    title: study.shortTitle,
    foot: study.year,
    href: `/science/studies/${study.id}`,
  }));
}

/* Muted library-cloth colours, one per theme, all dark enough to carry bone
   text at the contrast the rest of the site holds. */
export const themeColors: Record<string, string> = {
  /* The resource centre's five shelves, in the same muted library cloth. A
     second palette would be a second library. */
  /* Matched to the science cloths in value, not just in hue. The first pass
     used #3b2326 and #24333a, which read as shadows on a black page — a shelf
     you cannot see is not a shelf. */
  Guides: "#4a1f22",
  "The science library": "#27392f",
  "Who it is for": "#2f3a44",
  "Calculators and trackers": "#332a44",
  "How coaching compares": "#43321d",
  /* "Nutrition" is already below as a science theme and shares this shelf's
     name deliberately: one cloth per subject, wherever the subject appears. */
  "Anti-aging": "#2f3a44",
  Cardio: "#4a1f22",
  Cravings: "#43321d",
  Fitness: "#27392f",
  Nutrition: "#35301f",
  Peptides: "#332a44",
  Sleep: "#1f2c3d",
  Supplements: "#3d2a33",
};

const fallbackColor = "#33272a";

/** Deterministic hash: the shelf has to look identical on the server and in
 *  the browser, so book sizes come from the id, never from Math.random. */
function hashOf(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Roughly how many characters of spine text fit in a given spine height at
 *  the type size set in scienceShelf.module.css, leaving room for the foil
 *  bands and the year at the foot. */
export function spineCapacity(height: number) {
  return Math.floor((height - 46) / 6.6);
}

/** Cuts the title at a word boundary. A spine that ends mid-word ("Lifting con
 *  support hea...") reads as a rendering bug, not as a book. */
export function spineTitle(title: string, capacity: number) {
  if (title.length <= capacity) return title;
  const clipped = title.slice(0, capacity);
  const lastSpace = clipped.lastIndexOf(" ");
  /* Cut at the last whole word whenever there is one. An earlier version only
     did this past the halfway mark, which is what let "HIIT is not
     automaticall..." through. */
  const base = lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped;
  return `${base.replace(/[),.:;-]+$/, "")}\u2026`;
}

/**
 * What actually goes on a spine, given every title on the same shelf.
 *
 * THE SHELF WAS DESIGNED FOR STUDY TITLES and degrades on page titles. A study
 * is a distinctive sentence — "Human muscle keeps cellular traces of past
 * training" — and reads fine truncated. An SEO page title shares its opening
 * with its neighbours by design, so the visible part of six spines on the
 * "Who it is for" shelf was identical: "Online Fitness Coaching for…" six
 * times. A row of books you cannot tell apart is the one thing a shelf must
 * not be.
 *
 * Two rules, both derived from the real titles on 2026-09-25:
 *
 * 1. CUT AT THE FIRST SEPARATOR. Page titles carry an SEO subtitle after a
 *    colon, dash, pipe or bracket — "Apple Cider Vinegar and Weight Loss: An
 *    Honest Verdict", "Geebs Coaching vs Caliber — 1:1 Coach vs Fitness App".
 *    The head is the title; the tail is for the SERP.
 *
 * 2. STRIP WHAT THE SHELF REPEATS. On "Who it is for", several titles begin
 *    "Online Fitness Coaching for" or "Fitness Coaching for"; removing the
 *    shared opening leaves "Busy Professionals", "Executives", "Former
 *    Athletes" — which is the information the reader came for. Only when at
 *    least two books share it, and only when it is long enough to be worth
 *    removing.
 *
 * The full title stays in the link's `title` attribute either way, so nothing
 * is hidden from a reader who hovers or from a crawler.
 */
const SEPARATOR = /\s*[:|—–]\s|\s\(/;

export function shelfLabels(titles: string[]): string[] {
  const heads = titles.map((title) => title.split(SEPARATOR)[0].trim());

  // Candidate openings: the first two to six words of each title.
  const counts = new Map<string, number>();
  for (const head of heads) {
    const words = head.split(/\s+/);
    /* Up to the WHOLE title, not words.length - 1. The cap was there to stop a
       title being consumed entirely, but it also meant the longest shared
       opening could never be found when one book's full title IS that opening:
       ["Online Fitness Coaching", "Online Fitness Coaching for Men"] only ever
       proposed "Online Fitness", and stripping that left "Coaching" and
       "Coaching for Men" — still indistinguishable at a glance. The
       leave-something-behind rule below is what protects the short title. */
    for (let n = 2; n <= Math.min(6, words.length); n += 1) {
      const prefix = words.slice(0, n).join(" ");
      if (prefix.length < 12) continue;
      counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    }
  }
  /* ENOUGH OF THE SHELF HAS TO SHARE IT, not merely two books.
     With a threshold of two, "Online fitness coaching" was stripped from the
     only two Guides titles that carry it, and those two came out as "cost FAQ"
     and "fit check" — fragments, sitting beside twenty neighbours that still
     read as whole titles. The shared words are only noise when they are the
     SHELF; on a shelf of twenty-two they were just two books that happen to
     rhyme. On /for, "Fitness Coaching for" spans five of twenty-one and
     removing it is what turns the row into Executives, Founders, Former
     Athletes. */
  const floor = Math.max(3, Math.ceil(titles.length * 0.15));
  const shared = [...counts.entries()]
    .filter(([, count]) => count >= floor)
    .map(([prefix]) => prefix)
    .sort((a, b) => b.length - a.length);

  return heads.map((head) => {
    /* NEAR the start, not only AT it. "Fitness Coaching for" is a substring of
       "Online Fitness Coaching for" rather than a prefix of it, so a
       startsWith test stripped three titles on the /for shelf and left two —
       a row reading "Executives", "Founders", and then "Online Fitness
       Coaching for Busy Professionals". Allowing a short run-up catches the
       longer variant without matching a phrase buried mid-title. */
    const hit = shared.find((prefix) => {
      const at = head.indexOf(prefix);
      return at >= 0 && at <= 12;
    });
    if (!hit) return head;
    const rest = head
      .slice(head.indexOf(hit) + hit.length)
      .replace(/^[\s:,-]+/, "")
      // "for Men" is the shelf's grammar leaking through; the book is "Men".
      .replace(/^(for|vs\.?|and)\s+/i, "");
    // Never strip a title down to nothing: the book whose whole title IS the
    // shared opening keeps it.
    return rest.length >= 3 ? rest : head;
  });
}

function spineMetrics(volume: ShelfVolume) {
  const hash = hashOf(volume.id);
  /* A long title gets a wider, taller spine so more of it stays readable; the
     hash just keeps neighbouring books from matching. */
  const titleWidth = Math.min(46, 28 + Math.floor(volume.title.length / 6));
  const width = titleWidth + (hash % 5);
  const lengthBonus = Math.min(76, Math.floor(volume.title.length * 0.9));
  const height = 198 + lengthBonus + (hash % 7) * 4;
  const shade = (hash % 9) - 4;
  return { width, height, shade };
}

/** Nudges the theme colour a few points lighter or darker per book. */
function shadeColor(hex: string, amount: number) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(value.slice(offset, offset + 2), 16);
    return Math.max(0, Math.min(255, channel + amount * 4));
  });
  return `rgb(${channels.join(", ")})`;
}

/**
 * `children` hangs the theme's full study records under its own shelf. The
 * page used to render the library twice: once as shelves, then again as a
 * second full list of every study. One shelf now owns its topic.
 */
export function Shelf({
  theme,
  children,
}: {
  theme: ShelfSection;
  children?: React.ReactNode;
}) {
  const noun = theme.noun ?? { one: "volume", many: "volumes" };
  /* Computed per shelf, because what is worth removing depends on the
     neighbours: "Online Fitness Coaching for" is noise on the /for shelf and
     would be the whole title somewhere else. */
  const labels = shelfLabels(theme.volumes.map((volume) => volume.title));
  const base = themeColors[theme.topic] ?? fallbackColor;
  const slug = theme.topic.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      id={`topic-${slug}`}
      className={styles.shelf}
      aria-labelledby={`shelf-${theme.topic.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className={styles.shelfHead}>
        <h3
          id={`shelf-${theme.topic.toLowerCase().replace(/\s+/g, "-")}`}
          className={styles.shelfLabel}
        >
          {theme.topic}
          <span className={styles.shelfCount}>
            {"  ·  "}
            {theme.volumes.length}
            {" "}
            {theme.volumes.length === 1 ? noun.one : noun.many}
          </span>
        </h3>
        {theme.featured ? (
          <Link href={theme.featured.href} className={styles.shelfLink}>
            {theme.featuredLinkLabel ??
              `Open the ${theme.topic.toLowerCase()} research page`}
          </Link>
        ) : null}
      </div>

      <div className={styles.board}>
        <ul className={styles.row}>
          {theme.volumes.map((volume, volumeIndex) => {
            const { width, height, shade } = spineMetrics(volume);
            const label = labels[volumeIndex];
            return (
              <li key={volume.id} className="contents">
                <Link
                  href={volume.href}
                  className={styles.book}
                  data-book-open=""
                  style={
                    {
                      "--spine-width": `${width}px`,
                      "--spine-height": `${height}px`,
                      "--spine-color": shadeColor(base, shade),
                    } as React.CSSProperties
                  }
                  title={`${volume.title} (${volume.foot})`}
                >
                  <span className={styles.band} aria-hidden="true" />
                  <span className={styles.spineText}>
                    {spineTitle(label, spineCapacity(height))}
                  </span>
                  {volume.foot ? (
                    <span className={styles.spineYear}>{volume.foot}</span>
                  ) : null}
                  <span className={styles.band} aria-hidden="true" />
                </Link>
              </li>
            );
          })}

          {theme.featured ? (
            <li className="contents">
              <Link
                href={theme.featured.href}
                className={styles.faceOut}
                data-book-open=""
                style={
                  { "--spine-color": shadeColor(base, 3) } as React.CSSProperties
                }
              >
                <span className={styles.faceOutKicker}>Start here</span>
                <span className={styles.faceOutTitle}>
                  {theme.featured.label}
                </span>
                <span className={styles.faceOutGo}>
                  {theme.featuredGoLabel ??
                    `${theme.volumes.length} ${noun.many}, one page`}
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>

      {children}
    </section>
  );
}

export default function ScienceShelves({ themes }: { themes: ShelfTheme[] }) {
  return (
    <div>
      {themes.map((theme) => (
        <Shelf
          key={theme.topic}
          theme={{
            topic: theme.topic,
            volumes: volumesFromStudies(theme.studies),
            featured: theme.featured,
            noun: { one: "study", many: "studies" },
          }}
        />
      ))}
    </div>
  );
}


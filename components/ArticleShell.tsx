import type { ReactNode } from "react";
import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingProgress from "@/components/ReadingProgress";
import { offerRailItems } from "@/lib/offerRail";
import TextSizeControl from "@/components/TextSizeControl";
import ArticleScopeInit from "@/components/ArticleScopeInit";
import KeepGoing from "@/components/KeepGoing";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import EntityLine from "@/components/EntityLine";

/**
 * The frame, without the header scaffold.
 *
 * ArticleLayout is this plus a standard breadcrumb/eyebrow/h1 header, and is
 * the right choice where the header is data-driven. The 71 hand-written pages
 * under /nutrition, /for and /guides each carry a bespoke header written as
 * literal JSX; rewriting those by script is exactly where a migration breaks
 * quietly, and the reader gains nothing from it.
 *
 * So those pages keep their own header and take the frame only: the
 * .article-scope that reader text size scales from, the progress bar and the
 * size control. That is the whole user-visible benefit, at a two-line diff per
 * page instead of a generated header.
 *
 * It also carries the shared foot of the page. 65 pages use this shell and
 * until now 2 of them ended on anything other than a paragraph; the rest simply
 * stopped, with no way to act on what had just been read. Putting the rail here
 * rather than in 63 page files means it cannot drift between them and nobody
 * has to remember it. Pages that already place their own rail pass
 * `offerRail={false}` so the /packages mistake is not repeated 63 times.
 */
export default function ArticleShell({
  as: Container = "article",
  className = "",
  controlClassName = "mb-6",
  offerRail = true,
  textSizeControl = true,
  exit = false,
  scholarship = true,
  compactExit = false,
  children,
}: {
  as?: "article" | "section";
  className?: string;
  /** Spacing under the control row. */
  controlClassName?: string;
  /**
   * Set false on a page that already places its own rail. Two do today, and a
   * second copy of the same six offers on one page duplicates every price.
   */
  offerRail?: boolean;
  /**
   * Set false on a page that places <TextSizeControl /> itself, after its
   * own h1. Here it renders BEFORE the page's heading in DOM order, so a
   * crawler that reads top-down meets "Text size / Normal / Large /
   * Larger" before the answer. Measured on the cost guide 2026-09-23.
   */
  textSizeControl?: boolean;
  /**
   * THE EXIT, OFF BY DEFAULT.
   *
   * It has to live here and not only in MoneyPageKit, because the two pages
   * that most needed it — /guides/how-much-does-an-online-fitness-coach-cost
   * (34,381 impressions) and /for/skinny-fat-men (3,643) — pass
   * offerRail={false} and so never render that foot at all. Putting the exit
   * only in the rail left exactly those two at zero, which rendering caught
   * and reading the code did not.
   *
   * And off by default, because 52 pages already place their own: with it on,
   * /vs/chatgpt, /resources and the study pages each drew two "Keep going"
   * sections. A default that doubles content on a third of the site is not a
   * default.
   *
   * Original measurement, on prod 2026-09-25 across the site's top twenty pages
   * by clicks: `KeepGoing` was on 0 of the 79 pages under /blog, /guides,
   * /tools, /for and /nutrition. /tools/macro-calculator and
   * /guides/body-recomposition-for-beginners had ZERO onward reads below the
   * fold — a reader who finished them had nowhere to go but the footer, on a
   * site whose whole purpose is that they read one more thing and then decide
   * they want a coach.
   *
   * It lives here rather than in 68 page files for the same reason
   * MoneyPageKit does: it cannot drift, and nobody has to remember it.
   */
  exit?: boolean;
  /** Off where the page already places its own, or it renders twice. */
  scholarship?: boolean;
  /** For pages with a height gate. See KeepGoing's `compact`. */
  compactExit?: boolean;
  children: ReactNode;
}) {
  return (
    <main className="bg-grain relative min-h-screen">
      <ReadingProgress />
      <Container className={`article-scope ${className}`}>
        {/* First in DOM order, ahead of the size control and the page's own
            header, so the first sentence an AI engine reads names the coach
            and the brand. See lib/entity.ts. */}
        <EntityLine className="mb-3" />
        {/* Above the page's own header: a reader picks a text size before
            reading, not after. Right-aligned so it reads as a tool rather
            than competing with the h1. */}
        {textSizeControl ? (
          <div className={`flex justify-end ${controlClassName}`}>
            <TextSizeControl />
          </div>
        ) : null}
        <ArticleScopeInit />
        {children}

        {exit ? (
          <>
            {scholarship ? (
              <div className="mt-14">
                <ScholarshipCallout sourcePath="/article" />
              </div>
            ) : null}
            <div className="mt-12">
              <KeepGoing position="article" compact={compactExit} />
            </div>
          </>
        ) : null}
      </Container>

      {/* Outside the Container on purpose: the rail is not part of the article,
          and nesting it inside <article> would put a shop window inside the
          prose for anything reading the document structure. */}
      {offerRail ? (
        <MoneyPageKit items={offerRailItems("article")} />
      ) : null}
    </main>
  );
}

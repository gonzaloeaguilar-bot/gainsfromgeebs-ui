import MoneyPageKit from "@/components/MoneyPageKit";
import KeepGoing from "@/components/KeepGoing";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import { offerRailItems } from "@/lib/offerRail";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import TextSizeControl from "@/components/TextSizeControl";
import EntityLine from "@/components/EntityLine";
import ArticleScopeInit from "@/components/ArticleScopeInit";
import ArticleToc from "@/components/ArticleToc";
import type { BlogHeading } from "@/lib/blogPostPresentation";

export type Crumb = { label: string; href?: string };

type Props = {
  /** Breadcrumb trail. The last entry renders as the current page, unlinked.
      Omit it entirely on surfaces that have no breadcrumb, like /vs. */
  crumbs?: Crumb[];
  eyebrow: string;
  title: string;
  /** Standfirst under the h1. */
  intro?: ReactNode;
  /** Small meta line (reading time, section count, updated date). */
  meta?: ReactNode;
  /** Buttons under the header. Each surface keeps its own CTAs. */
  actions?: ReactNode;
  /** Contents rail entries. Fewer than 4 renders nothing. */
  headings?: BlogHeading[];
  /** Container width differs per surface: blog 980, science 1120. */
  containerClassName?: string;
  headerClassName?: string;
  /** h1 size override. weekly-digest runs 58px where the others run 56px;
      silently normalising it would be a visual change on 8 pages. */
  titleClassName?: string;
  /** Extra classes on the container. */
  sectionClassName?: string;
  /** Container element. /vs and /locations wrap their body in <article>,
      which is the correct semantics there and should not be forced to
      <section> just to share a shell. */
  containerAs?: "section" | "article";
  /** Set false on a page that already places its own rail. */
  offerRail?: boolean;
  /**
   * THE EXIT, for the 63 /science/questions pages.
   *
   * Measured on prod 2026-09-25: /science/questions/can-pre-workout-at-night-
   * hurt-sleep carries 3,934 impressions and had no KeepGoing at all. This
   * layout is the science family's frame — the same job ArticleShell does for
   * /guides and /for — and it was the one of the two that never got wired.
   *
   * Off by default for the same reason it is off in ArticleShell: the study
   * and topic templates place their own, and a default that doubles is not a
   * default.
   */
  exit?: boolean;
  /** Off where the page already places its own, or it renders twice. */
  scholarship?: boolean;
  children: ReactNode;
};

/**
 * The shared shell for long-form pages.
 *
 * Owns only the frame: the grain background, the container, breadcrumb, header
 * scaffold, the .article-scope that reader text size scales from, the reading
 * progress bar and the contents rail. Page content stays with the page.
 *
 * It exists because /blog, /science and its three sibling routes each carried
 * their own copy of this frame, so a change to reading typography meant editing
 * five files and 285 pages went without a contents rail or a text size control
 * simply because nobody retrofitted them.
 */
export default function ArticleLayout({
  exit = false,
  scholarship = true,
  crumbs,
  eyebrow,
  title,
  intro,
  meta,
  actions,
  headings = [],
  containerClassName = "max-w-[980px]",
  headerClassName = "max-w-[760px]",
  titleClassName = "display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]",
  sectionClassName = "",
  containerAs: Container = "section",
  offerRail = true,
  children,
}: Props) {
  return (
    <main className="bg-grain relative min-h-screen">
      <ReadingProgress />
      <Container
        className={`article-scope mx-auto px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24 ${containerClassName} ${sectionClassName}`}
      >
        {crumbs?.length ? (
        <nav aria-label="Breadcrumb" className="reader-scale-exempt mb-7 text-[13px] text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            {/* Fragment, not a wrapper <li>: an <li> inside an <li> is invalid
                and the separators have to be siblings in the same <ol>. */}
            {crumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                <li className={crumb.href ? undefined : "text-cloudText"}>
                  {crumb.href ? (
                    <Link className="hover:text-bone" href={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    crumb.label
                  )}
                </li>
                {index < crumbs.length - 1 ? <li aria-hidden="true">/</li> : null}
              </Fragment>
            ))}
          </ol>
        </nav>
        ) : null}

        <header className={headerClassName}>
          <p className="eyebrow text-cloudText">{eyebrow}</p>
          <h1 className={titleClassName}>{title}</h1>
          {intro}
          {meta}
          <div className="mt-5">
            <TextSizeControl />
          </div>
          <ArticleScopeInit />
          {actions}
          {/* After the page's own next step, still inside the header and
              ahead of the body in the raw HTML (see lib/entity.ts). Placed
              under the h1 (#826) it pushed the header's apply CTA below the
              fold, under the mobile dock, on /blog/body-recomposition-for-men. */}
          <EntityLine className="mt-4" />
        </header>

        {headings.length ? <ArticleToc headings={headings} /> : null}
        {children}
      </Container>

      {/* Same shared foot as ArticleShell, and outside the Container for the
          same reason: the rail is not part of the article. */}
      {exit ? (
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          {scholarship ? (
            <div className="mt-14">
              <ScholarshipCallout sourcePath="/science-question" />
            </div>
          ) : null}
          <div className="mt-12">
            <KeepGoing position="science_question" />
          </div>
        </div>
      ) : null}

      {offerRail ? <MoneyPageKit items={offerRailItems("article")} /> : null}
    </main>
  );
}

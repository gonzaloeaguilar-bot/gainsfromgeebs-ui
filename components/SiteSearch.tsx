"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RailSheet } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import type { SearchIndexEntry } from "@/app/search-index.json/route";

/**
 * Search the whole site from the header.
 *
 * The site is 123 pages. Before this the only ways in were the nav, which
 * names five of them, and the footer link tree, which named 144 and cost the
 * desktop page five screens to do it. Neither is a way to find something you
 * can already describe.
 *
 * The index is fetched once, on first open, from a statically built JSON —
 * 33KB that nobody downloads unless they search. It is the page registry
 * itself, so a new page is searchable the moment it is registered and there is
 * no second list to keep in step.
 *
 * Results are instant and local; Enter hands off to /blog?q=, which is the
 * full result page that already existed. This is a way in, not a second
 * search engine.
 */

const MAX_RESULTS = 7;

function scoreEntry(entry: SearchIndexEntry, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const title = entry.title.toLowerCase();

  // Ranked, not filtered. A word that starts the title is a better answer than
  // one buried in a description, and an unranked list of 40 matches is the
  // same problem as the footer.
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (entry.terms.some((t) => t.toLowerCase().includes(q))) return 40;
  if (entry.category.toLowerCase().includes(q)) return 30;
  return 0;
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loadedRef = useRef(false);
  const router = useRouter();

  /**
   * Used by the form submit only, which has no anchor to do it.
   *
   * The result rows are plain Links and navigate on their own — I briefly had
   * them routed through here too, on the strength of a probe that read the URL
   * before a client-side navigation had landed and reported "/". Re-measured
   * with a proper wait, closing the dialog does not eat the click, and the
   * version without this was identical. Removed rather than kept as insurance.
   */
  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const load = useCallback(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchIndexEntry[]) => setIndex(data))
      // A failed index is a search box that finds nothing, not a broken page.
      .catch(() => setIndex([]));
  }, []);

  useEffect(() => {
    // Cmd/Ctrl-K, the shortcut people already try.
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        load();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [load]);

  const results = query.trim()
    ? (index ?? [])
        .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
        .slice(0, MAX_RESULTS)
    : [];

  // /blog, not /resources. The full browser lives at /blog — there is no
  // /resources route, and the first version of this handed every "see every
  // match" press to a 404. Caught by probing the URL rather than reading it
  // back off the component that writes it.
  const allHref = `/blog?q=${encodeURIComponent(query.trim())}`;

  return (
    <>
      <button
        type="button"
        className="site-search__trigger"
        aria-label="Search the site"
        onClick={() => {
          load();
          setOpen(true);
          trackClientEvent("site_search_open", { search_source: "header" });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="site-search__trigger-label">Search</span>
      </button>

      <RailSheet
        open={open}
        onClose={() => setOpen(false)}
        source="site_search"
        title="Search"
        closeLabel="Close search"
        className="site-search__sheet rail-sheet--search"
      >
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (!query.trim()) return;
            trackClientEvent("site_search_submit", {
              search_source: "header",
              query_length: query.trim().length,
              result_count: results.length,
            });
            goTo(allHref);
          }}
        >
          <label className="rail-sr-only" htmlFor="site-search-input">
            Search guides, tools and coaching pages
          </label>
          <input
            id="site-search-input"
            ref={inputRef}
            type="search"
            autoComplete="off"
            className="site-search__input"
            placeholder="Macros, sleep, skinny fat, pricing…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
        </form>

        {query.trim() === "" ? (
          <p className="site-search__hint">
            123 pages. Type what you are trying to figure out.
          </p>
        ) : results.length === 0 ? (
          <p className="site-search__hint">
            {index === null
              ? "Loading…"
              : `Nothing for “${query.trim()}”. Try a shorter word.`}
          </p>
        ) : (
          <>
            <ul className="site-search__results">
              {results.map(({ entry }) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="site-search__result"
                    onClick={() => {
                      trackClientEvent("site_search_result_click", {
                        search_source: "header",
                        result_href: entry.href,
                      });
                      setOpen(false);
                    }}
                  >
                    <span className="site-search__result-title">{entry.title}</span>
                    <span className="site-search__result-meta">{entry.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={allHref}
              className="site-search__all"
              onClick={() => setOpen(false)}
            >
              See every match for “{query.trim()}” →
            </Link>
          </>
        )}
      </RailSheet>
    </>
  );
}

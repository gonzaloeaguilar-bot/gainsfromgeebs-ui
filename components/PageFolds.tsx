"use client";

// The long pages, made scannable without rewriting seventy of them.
//
// /for, /vs and the guide pages are built the same way: a header, then a run
// of <section class="prose-section">, each one an h2 followed by prose. On a
// phone that is 16 to 20 screens of unbroken reading (measured 2026-09-19:
// /vs/hiring-a-personal-trainer 20.1 screens, /for/busy-professionals 17.6),
// with no way to see what the page covers or to skip to the part that matters.
//
// This adds the two things that fixes: a chip index of what is on the page,
// and a fold per section. It is progressive enhancement on purpose — the
// server sends the whole page, every word is in the HTML, and the folding
// happens after load. It also only engages on pages long enough to need it.

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { trackClientEvent } from "@/lib/clientAnalytics";

/** Below this the page is already scannable and folding it is noise. */
const MIN_SECTIONS = 4;
const MIN_SCREENS = 6;
/** The sticky header is 69px; this is what a jump has to clear. */
const HEADER_CLEARANCE = 92;

type Entry = { id: string; label: string };

function slug(text: string, index: number) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base ? `s-${base}` : `s-${index}`;
}

export default function PageFolds({ source }: { source: string }) {
  // The root layout does not remount between pages, so without the pathname
  // this effect ran exactly once per session: a reader who arrived on the
  // homepage and followed any internal link got the unfolded 17-screen page
  // with no index, because next/link swaps {children} and leaves the layout —
  // and the layout is where this is mounted. Caught in review, not by the
  // page tests, every one of which used a hard load.
    const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  // Which run owns the state. Without it, a run's deferred frame could land
  // after a later run had already replaced the page, and the index would
  // show the previous page's sections — or, when the cleanup cleared state
  // instead, nothing at all. CI caught exactly that: chips = 0 on a page
  // that folds fine locally, because the ordering only loses on a slower
  // machine.
  const runIdRef = useRef(0);
  const [mount, setMount] = useState<HTMLElement | null>(null);

  const openSection = useCallback((id: string) => {
    const heading = document.getElementById(id);
    const section = heading?.closest("[data-fold]") as HTMLElement | null;
    if (!heading || !section) return;
    const toggle = section.querySelector<HTMLButtonElement>("[data-fold-toggle]");
    if (toggle && toggle.getAttribute("aria-expanded") === "false") toggle.click();

    // Opening the section changes the layout under the scroll, so the target
    // is computed AFTER that reflow and the offset is applied by hand.
    // scrollIntoView with a smooth behaviour lands short here: the fold grows
    // while the scroll is still animating, and scroll-margin alone does not
    // survive it. Measured 2026-09-19 — a chip jump left 72px of the heading
    // behind the sticky header.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      const top = heading.getBoundingClientRect().top + window.scrollY - HEADER_CLEARANCE;
      window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
    });
  }, []);

  useEffect(() => {
    runIdRef.current += 1;
    const runId = runIdRef.current;
    // Mounted once, globally: every page is a candidate, and the thresholds
    // below decide. The reading container is the article scope where a page
    // has one, and <main> otherwise — the bespoke money pages have no shell.
    const scope =
      document.querySelector<HTMLElement>(".article-scope") ??
      document.querySelector<HTMLElement>("main");
    if (!scope) return;
    // /coaching is a paid decision page, not a reading path. Its first phone
    // screen needs the offer and Kris's video—not an article-style chip index.
    if (pathname === "/coaching") return;
    // A layout that folds its own sections (lib/articleLayouts.ts) already
    // renders native <details> rows, so a second index above its lead and a
    // second fold on its FAQ and related-guides blocks would only fight it.
    if (scope.hasAttribute("data-own-folds")) return;
    // A page that already carries its own contents rail does not need a
    // second index of the same headings.
    const hasOwnIndex = Boolean(document.querySelector(".article-toc"));

    const sections = [...scope.querySelectorAll<HTMLElement>("section")].filter(
      (section) => {
        if (section.dataset.noFold === "true") return false;
        const heading = section.querySelector("h2");
        // Only a section whose h2 is its own first heading, with prose under it.
        if (!heading || section.querySelectorAll("h2").length !== 1) return false;

        // Never fold a wrapper around another foldable section. The cost
        // guide wrapped RailFaq in a bare <section>, so both qualified: two
        // toggles on one heading, a duplicated chip, and an outer
        // aria-expanded that stayed "false" over 4,785px of open content.
        // :scope matters — el.querySelector("section h2") matches the
        // element's OWN h2, because the combinator is resolved against the
        // document and the element itself is a section. Without it this
        // guard disqualified every section on every page.
        if (section.querySelector(":scope section h2")) return false;

        // [data-fold-lead] marks the page's answer-first block: it always
        // folds, so it is the first fold and the one that starts open. Left to
        // the word count below, /for/busy-professionals' quick answer dropped
        // out at 66 words when a duplicated sentence was cut (2026-10-13), and
        // the next section down, 789px of it, became the open one instead.
        // It skips the disqualifiers below, so it belongs only on a prose
        // answer: never on a block with a form, a rail or study caveats.
        if (section.dataset.foldLead === "true") return true;

        // Fold prose, and only prose. A section that carries its own
        // disclosure, a form, a table, a rail or an embed is already
        // structured, and folding it hides something a reader was meant to
        // see at rest — the science study cards keep their honest limits
        // visible exactly this way.
        // .article-details carries the study caveats, which a reader has to
        // see without a click (tests/e2e/article-readability.spec.ts). Forms,
        // rails, embeds and the capture are interactive surfaces, not reading.
        // A comparison table is reading, so it folds with its section.
        if (
          section.querySelector(
            // A section carrying a CONTEXTUAL apply CTA — one with its own
            // analytics source, i.e. deliberately placed for this page — is
            // never folded; /science/diet-muscle-retention-studies had
            // exactly that CTA sitting inside a closed section. Plain apply
            // links are not enough to disqualify a section: nearly every
            // section on these pages has one, and excluding all of them took
            // the page count under the threshold and switched folding off
            // entirely (measured: /for/busy-professionals back to 17.4
            // screens, 0 chips).
            // [data-no-fold] is the explicit opt-out for a summary block:
            // key takeaways, an at-a-glance card, a big-number stat row. Those
            // exist precisely to be read at rest, and folding one hides the
            // scannable version of the page behind a click while leaving the
            // prose it was summarising open below it.
            "[data-no-fold], .article-details, form, iframe, [data-rail], [data-rail-card], [data-rail-faq], [data-tip-capture], .fit-card, a[href^='/apply'][data-analytics-source]",
          )
        ) {
          return false;
        }

        // Long enough to be worth folding. Height, not word count: the /vs
        // sections run 300-650px on a phone off 75-90 words because they are
        // lists and cards, and a word threshold alone left them all open.
        const words = (section.textContent ?? "").trim().split(/\s+/).length;
        return words >= 90 || section.offsetHeight >= window.innerHeight * 0.7;
      },
    );

    const tallEnough =
      document.documentElement.scrollHeight > window.innerHeight * MIN_SCREENS;
    if (sections.length < MIN_SECTIONS || !tallEnough) return;

    const found: Entry[] = [];
    const cleanups: (() => void)[] = [];

    sections.forEach((section, index) => {
      const heading = section.querySelector("h2");
      if (!heading) return;
      if (!heading.id) heading.id = slug(heading.textContent ?? "", index);
      // The chip label may differ from the heading. On the cost guide the first
      // five h2s are deliberate GSC query variants and all of them read "how
      // much does it cost", so as an index they were unusable: five chips a
      // reader cannot choose between. The h2 text is load-bearing for search
      // and must not change, so a section may carry data-fold-label with a
      // short distinct name for the index only.
      const overrideLabel = (section.dataset.foldLabel ?? "").trim();
      found.push({
        id: heading.id,
        label: overrideLabel || (heading.textContent ?? "").trim(),
      });

      // A second run must not wrap the same section twice. Skipping it is not
      // enough either: the previous run's cleanup has already pulled the click
      // listeners off the toggle, so a skipped section keeps a button that
      // looks live and does nothing. The teardown below unwraps instead, so
      // every run starts from the page as the server sent it.
      if (section.dataset.fold !== undefined) return;
      section.dataset.fold = "";
      const body = [...section.children].filter(
        (child) => child !== heading && !child.contains(heading),
      ) as HTMLElement[];
      // The first section is the answer someone came for; it stays open.
      const startOpen = index === 0;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "fold-toggle";
      toggle.dataset.foldToggle = "";
      toggle.setAttribute("aria-expanded", String(startOpen));
      toggle.setAttribute("aria-controls", `${heading.id}-body`);
      toggle.innerHTML = `<span class="sr-only">Show or hide this section</span><span aria-hidden="true">+</span>`;

      const bar = document.createElement("div");
      bar.className = "fold-bar";
      heading.parentElement?.insertBefore(bar, heading);
      bar.appendChild(heading);
      bar.appendChild(toggle);

      const wrap = document.createElement("div");
      wrap.className = "fold-body";
      wrap.id = `${heading.id}-body`;
      bar.after(wrap);
      body.forEach((child) => wrap.appendChild(child));
      wrap.hidden = !startOpen;
      section.dataset.foldOpen = String(startOpen);

      function apply(next: boolean) {
        wrap.hidden = !next;
        toggle.setAttribute("aria-expanded", String(next));
        section.dataset.foldOpen = String(next);
      }

      function onToggle() {
        const next = toggle.getAttribute("aria-expanded") === "false";
        apply(next);
        if (next) {
          trackClientEvent("page_fold_open", {
            source,
            section_id: heading?.id ?? "",
          });
        }
      }

      toggle.addEventListener("click", onToggle);
      // The heading itself is the obvious tap target on a phone.
      heading.addEventListener("click", onToggle);
      heading.classList.add("fold-heading");
      cleanups.push(() => {
        toggle.removeEventListener("click", onToggle);
        heading?.removeEventListener("click", onToggle);
        heading?.classList.remove("fold-heading");
        // Put the section back exactly as the server rendered it.
        if (!bar.isConnected) return;
        const parent = bar.parentElement;
        if (!parent) return;
        parent.insertBefore(heading, bar);
        while (wrap.firstChild) parent.insertBefore(wrap.firstChild, bar);
        wrap.remove();
        bar.remove();
        delete section.dataset.fold;
        delete section.dataset.foldOpen;
      });
    });

    // Where the index goes: a node of our own at the top of the reading
    // container, so the chips sit above the first section on every page,
    // shell or no shell.
    let host = scope.querySelector<HTMLElement>(":scope > [data-page-map-host]");
    if (host) cleanups.push(() => host?.remove());
    if (!host && !hasOwnIndex) {
      host = document.createElement("div");
      host.dataset.pageMapHost = "";
      const header = scope.querySelector(":scope > header");
      if (header) header.after(host);
      else scope.prepend(host);
      const created = host;
      cleanups.push(() => created.remove());
    }
    if (host) {
      const element = host;
      const frame = requestAnimationFrame(() => {
        if (runIdRef.current !== runId) return;
        setMount(element);
      });
      cleanups.push(() => cancelAnimationFrame(frame));
    } else {
      const frame = requestAnimationFrame(() => {
        if (runIdRef.current !== runId) return;
        setMount(null);
      });
      cleanups.push(() => cancelAnimationFrame(frame));
    }

    // Not synchronously: the DOM work above is the effect's job, and the chip
    // index is a render that follows it. The frame is owned by this run, so a
    // remount cannot leave the page folded with no index above it (measured
    // on the cost guide, 2026-09-19) and a stale run cannot overwrite a newer
    // one's index.
    const entriesFrame = requestAnimationFrame(() => {
      if (runIdRef.current !== runId) return;
      setEntries(found);
    });
    cleanups.push(() => cancelAnimationFrame(entriesFrame));

    // An anchor into a folded section has to open it, on load and on every
    // in-page jump afterwards.
    function openFromHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      const section = target?.closest("[data-fold]") as HTMLElement | null;
      const toggle = section?.querySelector<HTMLButtonElement>("[data-fold-toggle]");
      if (toggle && toggle.getAttribute("aria-expanded") === "false") toggle.click();
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_CLEARANCE;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    cleanups.push(() => window.removeEventListener("hashchange", openFromHash));

    // Printing, and find-in-page, need everything open.
    function openAll() {
      scope
        ?.querySelectorAll<HTMLButtonElement>("[data-fold-toggle]")
        .forEach((toggle) => {
          if (toggle.getAttribute("aria-expanded") === "false") toggle.click();
        });
    }
    window.addEventListener("beforeprint", openAll);
    cleanups.push(() => window.removeEventListener("beforeprint", openAll));

    return () => cleanups.forEach((fn) => fn());
  }, [source, pathname]);

  if (!entries.length || !mount) return null;

  return createPortal(
    <nav className="page-map" aria-label="What is on this page">
      <p className="page-map__label">On this page</p>
      <div className="page-map__chips">
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className="page-map__chip"
            onClick={() => {
              openSection(entry.id);
              trackClientEvent("page_map_jump", { source, section_id: entry.id });
            }}
          >
            {entry.label}
          </button>
        ))}
      </div>
    </nav>,
    mount,
  );
}

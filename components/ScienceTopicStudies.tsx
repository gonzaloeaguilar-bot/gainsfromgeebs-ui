"use client";

/**
 * The studies on a /science/*-studies topic page: first, findable, and built
 * out of the shared kit rather than beside it.
 *
 * WHY IT EXISTS. Measured on prod 2026-09-25 at 390px, the studies heading on
 * /science/muscle-training-studies sat 5.0 phone screens down — behind a quick
 * answer, an email form, a grid of raw search queries labelled "Reader
 * question", a proof grid and question cards restating the same three answers.
 * The thirteen studies then rendered as one flat list: no search, no filter, no
 * count, nothing that closes.
 *
 * WHY IT USES THE KIT AND NOT ITS OWN CONTROLS. The first cut of this file
 * hand-rolled a search input and a row of filter chips. `RailSearch` and
 * `RailFilters` were already vendored in this repo — 98 files, lock-verified by
 * `npm run rail-kit:check`. That is the failure the kit exists to stop, and it
 * is cheaper to build the next chip row than to adopt the last one, which is
 * exactly why it keeps happening.
 *
 * THE TWO MECHANICS, AND ONLY THOSE TWO. The vault's own scout
 * (busqueda-mecanicas-juego-2026-09-20) went looking for reusable game
 * mechanics and concluded that of all gamification only two have measured
 * backing: a visible progress meter, and input turned into a personalised
 * output. Everything else on offer was a game engine, not a brand-site part.
 * So this page gets a progress meter that closes as studies are read, and a
 * goal picker that re-ranks the studies and says something back about the
 * reader's week. No points, no badges, no streak to lose — the same line
 * `RailProgress` draws in its own source, and the right line for a page that
 * ends in a decision about paying a coach.
 *
 * WHAT THE FILTERING DOES NOT DO. It never removes a study from the document.
 * Every study, its finding and its honest limit are in the server HTML on first
 * paint; narrowing hides cards client-side. That is what keeps the page
 * citable when the JavaScript never runs.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RailSearch from "@/vendor/rail-kit/RailSearch";
import RailFilters, { type RailFilter } from "@/vendor/rail-kit/RailFilters";
import RailProgress from "@/vendor/rail-kit/RailProgress";
import { filterScienceStudyItems } from "@/lib/scienceSearch";
import type { ScienceStudySearchItem } from "@/lib/scienceSearch";
import { scienceGoals, scoreStudyForGoal } from "@/data/scienceGoals";
import { evidenceBuckets, bucketForEvidenceType } from "@/data/scienceEvidenceBuckets";
import { trackClientEvent } from "@/lib/clientAnalytics";

const ALL = "all";

/* The cards arrive already rendered, keyed by study id, rather than as a render
   function: this is a client component and a server component cannot hand a
   function across the boundary ("Functions cannot be passed directly to Client
   Components"). Rendered elements serialise fine, which is also what keeps
   every study's text in the server HTML. */
export default function ScienceTopicStudies({
  studies,
  slug,
  cards,
}: {
  studies: ScienceStudySearchItem[];
  slug: string;
  cards: Record<string, React.ReactNode>;
}) {
  const [query, setQuery] = useState("");
  const [evidence, setEvidence] = useState<string>(ALL);
  const [goal, setGoal] = useState<string | null>(null);
  const [read, setRead] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  /* Counted against what the search has already narrowed to, not against the
     whole library. The first version counted `studies`, so a search with no
     hits still showed "Reviews of many studies 6" directly above "Showing 0 of
     12" — a count that answers a question nobody asked any more. */
  const textMatched = useMemo(
    () => filterScienceStudyItems(studies, query, "All"),
    [studies, query],
  );

  const evidenceFilters = useMemo<RailFilter[]>(() => {
    const counts = new Map<string, number>();
    textMatched.forEach((study) => {
      const bucket = bucketForEvidenceType(study.evidenceType);
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
    });
    return [
      { id: ALL, label: "All evidence", count: textMatched.length },
      ...evidenceBuckets
        .filter((bucket) => (counts.get(bucket.id) ?? 0) > 0)
        .map((bucket) => ({
          id: bucket.id,
          label: bucket.label,
          count: counts.get(bucket.id) ?? 0,
        })),
    ];
  }, [textMatched]);

  const goalFilters = useMemo<RailFilter[]>(
    () =>
      scienceGoals
        // A goal with nothing behind it is a chip that promises studies and
        // then shows an empty list.
        .filter((item) => studies.some((study) => scoreStudyForGoal(study, item) > 0))
        .map((item) => ({ id: item.id, label: item.label })),
    [studies],
  );

  const activeGoal = scienceGoals.find((item) => item.id === goal) ?? null;

  const visible = useMemo(() => {
    let matched = textMatched;
    if (evidence !== ALL) {
      matched = matched.filter(
        (study) => bucketForEvidenceType(study.evidenceType) === evidence,
      );
    }
    if (activeGoal) {
      const scored = matched
        .map((study) => ({ study, score: scoreStudyForGoal(study, activeGoal) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score);
      matched = scored.map((entry) => entry.study);
    }
    return matched;
  }, [textMatched, evidence, activeGoal]);

  const visibleIds = useMemo(
    () => new Set(visible.map((study) => study.id)),
    [visible],
  );

  /* Read-tracking observes the cards in the DOM, and the DOM changes every time
     a filter does — so the observer is rebuilt per visible set rather than
     attached once. Without that dependency a card filtered back in was never
     observed and the counter froze. */
  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const arrived = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => (entry.target as HTMLElement).dataset.studyId)
          .filter((id): id is string => Boolean(id));
        if (!arrived.length) return;
        setRead((previous) => {
          const next = new Set(previous);
          arrived.forEach((id) => next.add(id));
          return next.size === previous.length ? previous : [...next];
        });
      },
      { threshold: 0.4 },
    );

    root
      .querySelectorAll<HTMLElement>("[data-study-id]")
      .forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [visibleIds]);

  const onSearch = useCallback(
    (value: string) => {
      setQuery(value);
      const trimmed = value.trim();
      if (trimmed.length < 3) return;
      trackClientEvent("search", {
        search_term: trimmed.slice(0, 80),
        source: `science_topic_studies:${slug}`,
        result_count: filterScienceStudyItems(studies, trimmed, "All").length,
      });
    },
    [slug, studies],
  );

  const onEvidence = useCallback(
    (id: string) => {
      setEvidence(id);
      trackClientEvent("filter_apply", {
        filter_name: "evidence_type",
        filter_value: id,
        source: `science_topic_studies:${slug}`,
      });
    },
    [slug],
  );

  const onGoal = useCallback(
    (id: string) => {
      // Second press clears it. A picker you cannot un-pick is a trap on a page
      // whose default view — every study — is a legitimate thing to want back.
      const next = goal === id ? null : id;
      setGoal(next);
      trackClientEvent("filter_apply", {
        filter_name: "reader_goal",
        filter_value: next ?? "cleared",
        source: `science_topic_studies:${slug}`,
      });
    },
    [goal, slug],
  );

  const readInView = read.filter((id) => visibleIds.has(id)).length;
  const complete = visible.length > 0 && readInView >= visible.length;

  return (
    <section aria-labelledby="sources-heading" className="mt-10">
      <p className="eyebrow text-cloudText">Peer-reviewed sources</p>
      <h2
        id="sources-heading"
        className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
      >
        {studies.length} studies, and what each one does not show.
      </h2>

      {/* data-no-fold: PageFolds collapses a section by its single h2, and a
          collapsed control panel is a page with no way to reach its own list. */}
      <div className="mt-5" data-no-fold>
        {/* The one interactive thing on the page that asks the reader for
            something. The kit's border light marks it, and motion.css guards
            itself behind prefers-reduced-motion. */}
        {/* NEUTRAL, NOT CHERRY. This card was a red-tinted panel with a red
            border light, sitting on a page that also carries the cherry
            scholarship ribbon and the cherry Apply button in the dock — three
            reds each claiming to be the offer, which means none of them reads
            as one. The steal from the Robinhood teardown is that colour is
            reserved for data and for a single offer; the scholarship is the
            offer here, so this asks its question in bone and keeps only the
            border light to mark it as the one thing on the page to touch. */}
        <div
          data-rail-spotlight="science_topic_goal"
          style={{ ["--rail-spotlight-color" as string]: "rgb(214 211 205 / 0.55)" }}
          className="rounded-[6px] border border-line2 bg-bone/[0.03] px-4 py-4 md:px-5"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-bone/70">
            What are you training for?
          </p>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
            Pick one and these studies reorder to the ones that decide your week.
          </p>
          <RailFilters
            className="mt-3"
            label="Filter these studies by what you are training for"
            filters={goalFilters}
            activeId={goal ?? undefined}
            source={`science_topic_goal:${slug}`}
            wrap
            onSelect={({ id }) => onGoal(id)}
          />
          {/* Cleared the moment the result set empties. With a goal picked and
              a search that matches nothing, this block went on confidently
              telling the reader what to change while "Showing 0 of 12" sat
              underneath it — two live regions saying opposite things, and the
              leftovers of a state that had already ended. */}
          {activeGoal && visible.length > 0 ? (
            <p
              data-goal-readout=""
              className="mt-4 border-t border-line2 pt-3 text-[15px] leading-[1.65] text-bone/90"
              role="status"
            >
              {activeGoal.readout}
            </p>
          ) : null}
        </div>

        <RailSearch
          className="mt-4"
          label="Search these studies"
          placeholder="volume, sleep, detraining…"
          source={`science_topic_studies:${slug}`}
          onSubmit={onSearch}
        />

        {/* Gone entirely when the search matched nothing, rather than left as a
            lone "All evidence 0" offering to filter an empty set. */}
        {textMatched.length > 0 ? (
        <RailFilters
          className="mt-3"
          label="Filter these studies by evidence type"
          filters={evidenceFilters}
          activeId={evidence}
          source={`science_topic_evidence:${slug}`}
          wrap
          onSelect={({ id }) => onEvidence(id)}
        />
        ) : null}

        <p className="mt-3 text-[13.5px] tabular-nums text-mute" role="status">
          {visible.length === studies.length
            ? `Showing all ${studies.length} studies`
            : `Showing ${visible.length} of ${studies.length} studies`}
        </p>

        {/* Appears once a second study has been seen. On first paint it would be
            a scoreboard for someone who has not read anything yet. */}
        {readInView >= 2 ? (
          <div
            className="mt-3"
            data-rail-glow={complete ? "soft" : undefined}
          >
            <RailProgress
              label="Studies read on this page"
              value={readInView}
              target={visible.length}
              source={`science_topic_studies:${slug}`}
              note={
                complete
                  ? "That is the whole set. Your own numbers are ten questions away."
                  : undefined
              }
            />
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4" ref={listRef}>
        {visible.map((study) => (
          <div key={study.id} data-study-id={study.id}>
            {cards[study.id]}
          </div>
        ))}
        {visible.length === 0 ? (
          <p className="rounded-lg border border-line2 bg-bone/[0.025] p-5 text-[15px] text-mute">
            Nothing here matches that. Clear the search to see all{" "}
            {studies.length} studies on this page.
          </p>
        ) : null}
      </div>
    </section>
  );
}

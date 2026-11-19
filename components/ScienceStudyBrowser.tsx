"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  filterScienceStudyItems,
  type ScienceStudySearchItem,
  type ScienceStudySearchTopic,
} from "@/lib/scienceSearch";

type Props = {
  studies: ScienceStudySearchItem[];
  topics: readonly ScienceStudySearchTopic[];
  initialQuery?: string;
  initialTopic?: ScienceStudySearchTopic;
  initialLimit?: number;
  analyticsSource: "science_hub" | "study_index";
};

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function cleanAnalyticsQuery(value: string) {
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 80);
  const mayContainPrivateInformation =
    /@|https?:\/\/|www\.|\+?\d[\d\s().-]{7,}/i.test(cleaned);

  return mayContainPrivateInformation ? "[redacted]" : cleaned;
}

export default function ScienceStudyBrowser({
  studies,
  topics,
  initialQuery = "",
  initialTopic = "All",
  initialLimit = 8,
  analyticsSource,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] =
    useState<ScienceStudySearchTopic>(initialTopic);
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const topicKey = topics.join("|");

  useEffect(() => {
    const validTopics = topicKey.split("|");

    function syncFromLocation() {
      const params = new URLSearchParams(window.location.search);
      const nextQuery = params.get("q") ?? "";
      const requestedTopic = params.get("topic") ?? "All";
      const nextTopic = validTopics.includes(requestedTopic)
        ? (requestedTopic as ScienceStudySearchTopic)
        : "All";

      setQuery(nextQuery);
      setTopic(nextTopic);
      setExpanded(nextQuery.trim().length > 0 || nextTopic !== "All");
      setReady(true);
    }

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [topicKey]);

  const filteredStudies = useMemo(
    () => filterScienceStudyItems(studies, query, topic),
    [query, studies, topic],
  );
  const hasActiveFilter = query.trim().length > 0 || topic !== "All";
  const visibleStudies =
    hasActiveFilter || expanded
      ? filteredStudies
      : filteredStudies.slice(0, initialLimit);

  const topicCounts = useMemo(
    () =>
      topics
        .map((item) => ({
          topic: item,
          count:
            item === "All"
              ? studies.length
              : studies.filter((study) => study.topic === item).length,
        }))
        .filter(({ topic: item, count }) => item === "All" || count > 0),
    [studies, topics],
  );

  function routeFor(nextQuery: string, nextTopic: ScienceStudySearchTopic) {
    const params = new URLSearchParams(
      typeof window === "undefined" ? "" : window.location.search,
    );
    params.delete("q");
    params.delete("topic");
    if (nextQuery) params.set("q", nextQuery);
    if (nextTopic !== "All") params.set("topic", nextTopic);
    const nextSearch = params.toString();

    return nextSearch ? `${pathname}?${nextSearch}` : pathname;
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    const nextResults = filterScienceStudyItems(studies, trimmed, topic);

    trackClientEvent("science_study_search_submit", {
      search_source: analyticsSource,
      search_query: cleanAnalyticsQuery(trimmed),
      study_topic: topic,
      result_count: nextResults.length,
    });

    setQuery(trimmed);
    setExpanded(true);
    router.push(routeFor(trimmed, topic), { scroll: false });
  }

  function updateQuery(value: string) {
    setQuery(value);
    setExpanded(false);
  }

  function chooseTopic(nextTopic: ScienceStudySearchTopic) {
    const trimmed = query.trim();
    const nextResults = filterScienceStudyItems(studies, trimmed, nextTopic);

    trackClientEvent("science_study_topic_select", {
      search_source: analyticsSource,
      study_topic: nextTopic,
      result_count: nextResults.length,
    });

    setTopic(nextTopic);
    setQuery(trimmed);
    setExpanded(trimmed.length > 0 || nextTopic !== "All");
    router.push(routeFor(trimmed, nextTopic), { scroll: false });
  }

  function resetSearch() {
    trackClientEvent("science_study_search_clear", {
      search_source: analyticsSource,
      search_query: cleanAnalyticsQuery(query),
      study_topic: topic,
      result_count: studies.length,
    });

    setQuery("");
    setTopic("All");
    setExpanded(false);
    router.push(routeFor("", "All"), { scroll: false });
  }

  function trackStudyClick(study: ScienceStudySearchItem, index: number) {
    trackClientEvent("science_study_result_click", {
      search_source: analyticsSource,
      search_query: cleanAnalyticsQuery(query),
      study_topic: topic,
      study_id: study.id,
      result_count: filteredStudies.length,
      result_position: index + 1,
    });
  }

  function trackStudySourceClick(
    study: ScienceStudySearchItem,
    index: number,
    sourceType: "pubmed" | "doi",
  ) {
    trackClientEvent("science_study_source_click", {
      search_source: analyticsSource,
      search_query: cleanAnalyticsQuery(query),
      study_topic: topic,
      study_id: study.id,
      source_type: sourceType,
      result_count: filteredStudies.length,
      result_position: index + 1,
    });
  }

  return (
    <section
      aria-labelledby="science-study-search-heading"
      data-ready={ready ? "true" : undefined}
      className="mt-12"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-cloudText">Search the library</p>
          <h2
            id="science-study-search-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Find the study behind the advice.
          </h2>
          <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.65] text-mute">
            Search by topic, supplement, question, author, or finding. Every
            result opens a plain-English takeaway and the original source.
          </p>
        </div>
        <p className="text-[14px] leading-[1.55] text-mute" aria-live="polite">
          {hasActiveFilter
            ? `${filteredStudies.length} ${filteredStudies.length === 1 ? "study" : "studies"} found`
            : `Showing ${visibleStudies.length} of ${studies.length} studies`}
        </p>
      </div>

      <form
        role="search"
        aria-label="Search Geebs studies"
        onSubmit={submitSearch}
        className="mt-5 flex min-h-12 w-full items-center gap-2 rounded-lg border border-line2 bg-bone/[0.04] p-2 focus-within:border-cloudText"
      >
        <label htmlFor="science-study-search" className="sr-only">
          Search studies
        </label>
        <span className="ml-2 text-mute2" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          id="science-study-search"
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Try omega-3, fish oil, sleep, protein, creatine..."
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] leading-[1.5] text-bone outline-none placeholder:text-mute2"
        />
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={resetSearch}
            className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-[14px] font-medium text-bone/72 transition-colors hover:text-bone"
          >
            Clear
          </button>
        ) : null}
        <button
          type="submit"
          aria-label="Search studies"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cloud text-bone transition-colors hover:bg-cloud2"
        >
          <SearchIcon />
        </button>
      </form>

      <div
        className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        aria-label="Study topics"
      >
        {topicCounts.map(({ topic: item, count }) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            onClick={() => chooseTopic(item)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3.5 text-[14px] font-medium tracking-normal transition-colors ${
              topic === item
                ? "border-cloudText bg-cloudText/15 text-bone"
                : "border-line2 bg-bone/[0.03] text-bone/72 hover:border-bone/30 hover:text-bone"
            }`}
          >
            <span>{item}</span>
            <span className="text-[12px] text-mute">{count}</span>
          </button>
        ))}
      </div>

      {visibleStudies.length ? (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {visibleStudies.map((study, index) => (
            <article
              key={study.id}
              data-study-id={study.id}
              className="pathcard rounded-lg border border-line2 bg-bone/[0.025] transition-colors hover:border-bone/30"
            >
              <Link
                href={`/science/studies/${study.id}`}
                onClick={() => trackStudyClick(study, index)}
                className="block rounded-t-lg p-5 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cloudText"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-cloudText/35 bg-cloudText/10 px-2.5 py-1 text-[12px] font-medium text-cloudText">
                    {study.topic}
                  </span>
                  <span className="rounded-md border border-line2 px-2.5 py-1 text-[12px] text-mute">
                    {study.evidenceType}
                  </span>
                </div>
                <h3 className="mt-4 text-[20px] font-semibold leading-[1.2] tracking-normal text-bone">
                  {study.shortTitle}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.62] text-bone/82">
                  {study.coachTakeaway}
                </p>
                <p className="mt-4 text-[13.5px] leading-[1.55] text-mute">
                  {study.authors}. {study.journal}. {study.year}.
                  {study.pubmedId ? ` PMID ${study.pubmedId}.` : ""}
                  {study.doi ? ` DOI ${study.doi}.` : ""}
                </p>
                <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.14em] text-cloudText">
                  Honest limits
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-mute">
                  {study.claimGuardrail}
                </p>
                <p className="mt-3 text-[13.5px] font-medium text-bone underline decoration-cloudText/60 underline-offset-4">
                  Read the plain-English study breakdown
                </p>
              </Link>

              <div className="mx-5 border-t border-line2 pb-5 pt-4">
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-mute">
                  Original study links
                </p>
                <div
                  role="group"
                  className="mt-3 flex flex-wrap gap-2"
                  aria-label={`Original links for ${study.shortTitle}`}
                >
                  {study.pubmedId ? (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${study.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${study.shortTitle} on PubMed (opens in a new tab)`}
                      onClick={() =>
                        trackStudySourceClick(study, index, "pubmed")
                      }
                      className="inline-flex min-h-11 items-center gap-1 rounded-md border border-cloudText/40 bg-cloudText/10 px-3.5 text-[13.5px] font-semibold text-bone transition-colors hover:border-cloudText hover:bg-cloudText/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloudText"
                    >
                      PubMed citation <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {study.doi ? (
                    <a
                      href={`https://doi.org/${study.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open the DOI citation for ${study.shortTitle} (opens in a new tab)`}
                      onClick={() =>
                        trackStudySourceClick(study, index, "doi")
                      }
                      className="inline-flex min-h-11 items-center gap-1 rounded-md border border-line2 px-3.5 text-[13.5px] font-semibold text-bone/82 transition-colors hover:border-bone/30 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloudText"
                    >
                      DOI citation <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-lg border border-line2 bg-bone/[0.025] p-5">
          <h3 className="text-[18px] font-semibold tracking-normal text-bone">
            No exact match yet.
          </h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-mute">
            Try a broader term like recovery, fat loss, sleep, protein, cardio,
            or supplements.
          </p>
          <button
            type="button"
            onClick={resetSearch}
            className="mt-4 inline-flex min-h-11 items-center rounded-md border border-line2 px-4 text-[14px] font-semibold text-bone/80 transition-colors hover:border-bone/30 hover:text-bone"
          >
            Reset study search
          </button>
        </div>
      )}

      {!hasActiveFilter && !expanded && filteredStudies.length > initialLimit ? (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            trackClientEvent("science_study_show_all", {
              search_source: analyticsSource,
              result_count: filteredStudies.length,
            });
          }}
          className="mt-6 inline-flex min-h-11 items-center rounded-md border border-line2 px-4 text-[14px] font-semibold text-bone/80 transition-colors hover:border-bone/30 hover:text-bone"
        >
          Show all {filteredStudies.length} studies
        </button>
      ) : null}
    </section>
  );
}

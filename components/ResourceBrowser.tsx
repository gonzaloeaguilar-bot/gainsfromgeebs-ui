"use client";

import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState, Suspense } from "react";
import {
  filterResourceItems,
  freeTools,
  type ResourceItem,
  resourceItems,
  resourceTopics,
  type ResourceTopic,
} from "@/data/resources";

interface ResourceFilterContextType {
  hasActiveFilter: boolean;
  setHasActiveFilter: (active: boolean) => void;
}

const ResourceFilterContext = createContext<ResourceFilterContextType>({
  hasActiveFilter: false,
  setHasActiveFilter: () => {},
});

function SearchParamsSync({
  onFilterChange,
}: {
  onFilterChange: (active: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const active = q.trim().length > 0;

  useEffect(() => {
    onFilterChange(active);
  }, [active, onFilterChange]);

  return null;
}

export function ResourceFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasActiveFilter, setHasActiveFilter] = useState(false);

  return (
    <ResourceFilterContext.Provider
      value={{
        hasActiveFilter,
        setHasActiveFilter,
      }}
    >
      <Suspense fallback={null}>
        <SearchParamsSync onFilterChange={setHasActiveFilter} />
      </Suspense>
      {children}
    </ResourceFilterContext.Provider>
  );
}

export function useResourceFilter() {
  return useContext(ResourceFilterContext);
}

export function ResourceFilterContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasActiveFilter } = useResourceFilter();
  return (
    <div
      className={hasActiveFilter ? "hidden" : undefined}
      hidden={hasActiveFilter}
    >
      {children}
    </div>
  );
}

type ResourceAnalyticsParams = {
  resource_category?: string;
  resource_href?: string;
  resource_query?: string;
  resource_title?: string;
  resource_topic?: ResourceTopic;
  resource_type?: ResourceItem["type"];
  result_count?: number;
  result_position?: number;
  result_surface?: "featured_free_resources" | "resource_results";
  search_source?: "resource_center";
  has_query?: boolean;
  query_length?: number;
  previous_query?: string;
};

declare global {
  interface Window {
    geebsTrackEvent?: (
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

function normalizedAnalyticsQuery(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 80);
}

function trackResourceEvent(
  eventName: string,
  params: ResourceAnalyticsParams = {},
) {
  if (typeof window === "undefined" || !window.geebsTrackEvent) return;

  const cleanParams = Object.fromEntries(
    Object.entries({
      search_source: "resource_center",
      ...params,
    }).filter(([, value]) => value !== undefined),
  ) as Record<string, unknown>;

  // Through the shared wrapper so a controlled test run stamps these too; the
  // e2e spy reads what the caller passed, not what the writer adds.
  trackClientEvent(eventName, cleanParams as Record<string, boolean | number | string | undefined>);
}

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function TopicButton({
  topic,
  active,
  onClick,
}: {
  topic: ResourceTopic;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-md border px-3.5 text-[14px] font-medium tracking-normal transition-colors ${
        active
          ? "border-cloudText bg-cloudText/15 text-bone"
          : "border-line2 bg-bone/[0.03] text-bone/72 hover:border-bone/30 hover:text-bone"
      }`}
    >
      {topic}
    </button>
  );
}

function ResourceBrowserPanel({
  initialQuery,
  extraItems,
}: {
  initialQuery: string;
  extraItems?: ResourceItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState<ResourceTopic>("All");
  const { setHasActiveFilter } = useResourceFilter();

  // Keep the box in step with ?q= on external navigation. #255 did this by
  // remounting via key={urlQuery}, which also reset `topic` every time an
  // internal handler called router.replace() to clear the query — clicking a
  // topic chip left it visually unselected (aria-pressed stayed "false").
  // Adjusting state during render is React's documented pattern for "a prop
  // changed"; an effect would fire after paint and trips
  // react-hooks/set-state-in-effect.
  const [syncedQuery, setSyncedQuery] = useState(initialQuery);
  if (initialQuery !== syncedQuery) {
    setSyncedQuery(initialQuery);
    setQuery(initialQuery);
  }
  const hasActiveFilter = query.trim().length > 0 || topic !== "All";

  useEffect(() => {
    setHasActiveFilter(hasActiveFilter);
  }, [hasActiveFilter, setHasActiveFilter]);

  const allItems = useMemo(() => {
    if (!extraItems || extraItems.length === 0) return resourceItems;
    const existingHrefs = new Set(resourceItems.map((item) => item.href));
    const newItems = extraItems.filter((item) => !existingHrefs.has(item.href));
    return [...resourceItems, ...newItems];
  }, [extraItems]);

  const matchingResources = useMemo(
    () => filterResourceItems(allItems, query, topic),
    [allItems, query, topic],
  );

  const visibleResources = matchingResources;

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = query.trim();
    const trackedQuery = normalizedAnalyticsQuery(trimmed);
    const nextResults = filterResourceItems(allItems, trimmed, topic);
    const nextPath = trimmed
      ? `${pathname}?q=${encodeURIComponent(trimmed)}`
      : pathname;

    trackResourceEvent("resource_search_submit", {
      resource_query: trackedQuery,
      resource_topic: topic,
      result_count: nextResults.length,
      has_query: trackedQuery.length > 0,
      query_length: trackedQuery.length,
    });

    setQuery(trimmed);
    router.replace(nextPath, { scroll: false });
  }

  function clearSearch() {
    const trackedQuery = normalizedAnalyticsQuery(query);

    trackResourceEvent("resource_search_clear", {
      resource_query: trackedQuery,
      resource_topic: topic,
      result_count: allItems.length,
      has_query: trackedQuery.length > 0,
      query_length: trackedQuery.length,
    });

    setQuery("");
    setTopic("All");
    router.replace(pathname, { scroll: false });
  }

  function updateQuery(value: string) {
    setQuery(value);
    if (topic !== "All") {
      setTopic("All");
    }
  }

  function chooseTopic(nextTopic: ResourceTopic) {
    const trackedQuery = normalizedAnalyticsQuery(query);
    const nextResults = filterResourceItems(allItems, "", nextTopic);

    trackResourceEvent("resource_topic_select", {
      resource_topic: nextTopic,
      previous_query: trackedQuery,
      result_count: nextResults.length,
      has_query: false,
      query_length: 0,
    });

    setQuery("");
    setTopic(nextTopic);
    router.replace(pathname, { scroll: false });
  }

  function trackResourceClick({
    resource,
    index,
    surface,
  }: {
    resource: ResourceItem;
    index: number;
    surface: ResourceAnalyticsParams["result_surface"];
  }) {
    const trackedQuery = normalizedAnalyticsQuery(query);

    trackResourceEvent("resource_result_click", {
      resource_title: resource.title,
      resource_href: resource.href,
      resource_category: resource.category,
      resource_type: resource.type,
      resource_topic: topic,
      resource_query: trackedQuery,
      result_count:
        surface === "featured_free_resources"
          ? freeTools.length
          : visibleResources.length,
      result_position: index + 1,
      result_surface: surface,
      has_query: trackedQuery.length > 0,
      query_length: trackedQuery.length,
    });
  }

  return (
    <>
      <section aria-labelledby="resource-search-heading" className="mt-8">
        <h2 id="resource-search-heading" className="sr-only">Search resources</h2>

        <form
          role="search"
          aria-label="Search Geebs resources"
          onSubmit={submitSearch}
          className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-line2 bg-bone/[0.04] p-2 focus-within:border-cloudText"
        >
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <span className="ml-2 text-mute2" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            id="resource-search"
            name="q"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Try protein, belly fat, desk work, travel..."
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] leading-[1.5] text-bone outline-none placeholder:text-mute2"
          />
          {query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-[14px] font-medium text-bone/72 transition-colors hover:text-bone"
            >
              Clear
            </button>
          ) : null}
          <button
            type="submit"
            aria-label="Search resources"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cloud text-bone transition-colors hover:bg-cloud2"
          >
            <SearchIcon />
          </button>
        </form>
        {hasActiveFilter && <p aria-live="polite" className="mt-2 text-mute">{visibleResources.length} results</p>}

        <details className="mt-3"><summary className="cursor-pointer text-sm text-mute">Filter by topic</summary>
        <div
          className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          aria-label="Resource topics"
        >
          {resourceTopics.map((item) => (
            <TopicButton
              key={item}
              topic={item}
              active={topic === item}
              onClick={() => chooseTopic(item)}
            />
          ))}
        </div>
        </details>
      </section>

      {hasActiveFilter && <section aria-label="Resource results" className="mt-8">
        {visibleResources.length ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
            {visibleResources.map((resource, index) => (
              <Link
                key={resource.href}
                href={resource.href}
                onClick={() =>
                  trackResourceClick({
                    resource,
                    index,
                    surface: "resource_results",
                  })
                }
                className="pathcard block border-y border-line2 py-5 transition-colors hover:border-bone/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow text-cloudText">{resource.category}</p>
                  <span className="rounded-md border border-line2 px-2 py-1 text-[12px] font-medium capitalize leading-none text-mute">
                    {resource.type === "tool" ? "Free tool" : "Guide"}
                  </span>
                </div>
                <h3 className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[28px]">
                  {resource.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-mute md:text-[15px]">
                  {resource.description}
                </p>
              </Link>
            ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-lg border border-line2 bg-bone/[0.025] p-5">
            <h3 className="text-[18px] font-semibold tracking-normal text-bone">
              No exact match yet.
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-mute">
              Try a broader term like fat loss, protein, desk work, travel, or
              training.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 inline-flex min-h-11 items-center rounded-md border border-line2 px-4 text-[14px] font-semibold text-bone/80 transition-colors hover:border-bone/30 hover:text-bone"
            >
              Reset resources
            </button>
          </div>
        )}
      </section>}
    </>
  );
}

export default function ResourceBrowser({
  extraItems,
}: {
  extraItems?: ResourceItem[];
}) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  return (
    <ResourceBrowserPanel initialQuery={urlQuery} extraItems={extraItems} />
  );
}

"use client";

import { useEffect } from "react";
import {
  APPLY_CLICK_SOURCE_KEY,
  LANDING_PATH_KEY,
  LAST_NON_APPLY_PATH_KEY,
  rememberCampaignAttribution,
  safeApplySourcePath,
} from "@/lib/applySourceAttribution";

function currentPath(): string {
  return (
    safeApplySourcePath(`${window.location.pathname}${window.location.search}`) ||
    window.location.pathname ||
    "/"
  );
}

function analyticsSourceFor(element: Element): string {
  const explicit = element.closest("[data-analytics-source]");
  if (explicit) return explicit.getAttribute("data-analytics-source") || "";

  const section = element.closest("section, header, footer, main");
  if (!section) return "unknown";

  return (
    section.getAttribute("aria-labelledby") ||
    section.getAttribute("id") ||
    section.tagName.toLowerCase()
  );
}

function analyticsLinkKindFor(element: Element): string {
  const explicit = element.closest("[data-analytics-link-kind]");
  return explicit?.getAttribute("data-analytics-link-kind") || "unspecified";
}

export default function ApplySourceTracker() {
  useEffect(() => {
    const applyAttributionToUrl = (anchor: HTMLAnchorElement) => {
      let url: URL;
      try {
        url = new URL(anchor.getAttribute("href") || "", window.location.href);
      } catch {
        return null;
      }

      if (url.origin !== window.location.origin || url.pathname !== "/apply") {
        return null;
      }

      const path = currentPath();
      if (window.location.pathname === "/apply") {
        return url;
      }

      const clickSource = analyticsSourceFor(anchor);
      const linkKind = analyticsLinkKindFor(anchor);

      if (!url.searchParams.has("entry_path")) {
        url.searchParams.set("entry_path", path);
      }
      if (clickSource && !url.searchParams.has("entry_source")) {
        url.searchParams.set("entry_source", clickSource);
      }
      if (linkKind && !url.searchParams.has("entry_link_kind")) {
        url.searchParams.set("entry_link_kind", linkKind);
      }

      try {
        const landingPath = window.sessionStorage.getItem(LANDING_PATH_KEY);
        if (
          landingPath &&
          landingPath !== path &&
          !url.searchParams.has("landing_path")
        ) {
          url.searchParams.set("landing_path", landingPath);
        }
      } catch {
        // Storage can be blocked; query attribution still carries the source.
      }

      anchor.setAttribute("href", `${url.pathname}${url.search}`);
      return url;
    };

    const decorateApplyLinks = () => {
      document.querySelectorAll("a[href]").forEach((link) => {
        if (link instanceof HTMLAnchorElement) {
          applyAttributionToUrl(link);
        }
      });
    };

    const rememberCurrentPage = () => {
      try {
        const path = currentPath();
        const { firstTouch } = rememberCampaignAttribution({
          pathname: window.location.pathname,
          search: window.location.search,
          referrer: document.referrer,
          currentOrigin: window.location.origin,
          storage: window.sessionStorage,
        });
        window.sessionStorage.setItem(
          LANDING_PATH_KEY,
          window.sessionStorage.getItem(LANDING_PATH_KEY) ||
            firstTouch.landing_path ||
            path,
        );
        if (window.location.pathname !== "/apply") {
          window.sessionStorage.setItem(LAST_NON_APPLY_PATH_KEY, path);
        }
      } catch {
        // Storage can be blocked in privacy modes. Attribution degrades safely.
      }
    };

    const handleClick = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = applyAttributionToUrl(anchor);
      if (!url || url.pathname !== "/apply" || window.location.pathname === "/apply") return;
      const path = currentPath();
      const clickSource = analyticsSourceFor(anchor);
      const linkKind = analyticsLinkKindFor(anchor);

      // Only a real click is a click. This ran on focusin and pointerdown
      // too, so tabbing past an Apply link — or pressing and dragging away
      // without releasing on it — overwrote the attribution record as though
      // the visitor had clicked it.
      if (event.type !== "click") return;

      try {
        window.sessionStorage.setItem(
          APPLY_CLICK_SOURCE_KEY,
          JSON.stringify({
            entry_path: path,
            click_source: clickSource,
            link_kind: linkKind,
            target_path: `${url.pathname}${url.search}`,
            ts: Date.now(),
          }),
        );
      } catch {
        // Best-effort attribution only.
      }

      if (
        event.type === "click" &&
        event instanceof MouseEvent &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !anchor.target
      ) {
        event.preventDefault();
        // The sheet gets first refusal. It cancels this event when it opens
        // over the current page; if nothing is listening (no JS sheet mounted
        // yet, or we are already on /apply) the navigation happens as before.
        const openedInSheet =
          window.dispatchEvent(
            new CustomEvent("geebs:open-apply", {
              cancelable: true,
              detail: { search: url.search, source: clickSource },
            }),
          ) === false;
        if (!openedInSheet) {
          window.location.assign(`${url.pathname}${url.search}`);
        }
      }
    };

    rememberCurrentPage();
    decorateApplyLinks();
    document.addEventListener("click", handleClick, true);
    document.addEventListener("focusin", handleClick, true);
    document.addEventListener("pointerdown", handleClick, true);
    window.addEventListener("popstate", rememberCurrentPage);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("focusin", handleClick, true);
      document.removeEventListener("pointerdown", handleClick, true);
      window.removeEventListener("popstate", rememberCurrentPage);
    };
  }, []);

  return null;
}

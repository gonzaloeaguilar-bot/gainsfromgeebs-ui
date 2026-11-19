"use client";

// Apply where you are.
//
// Pressing Apply used to move the reader to another page, which asks them to
// read a header, a proof strip and an intro before the first field. Someone who
// pressed Apply has already decided; the form should start there and then.
//
// So any link to /apply opens this sheet over the page instead, with the form
// at the top of it. /apply stays a real page for direct arrivals, for anyone
// with JavaScript off, and for the browser's own back button: opening the sheet
// pushes a history entry, so Back closes it.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ApplyForm from "@/app/apply/ApplyForm";
import { trackClientEvent } from "@/lib/clientAnalytics";

const OPEN_EVENT = "geebs:open-apply";

export default function ApplySheet() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pushedRef = useRef(false);
  const openRef = useRef(false);

  const close = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      // Undo our own history entry; popstate does the rest.
      window.history.back();
      return;
    }
    openRef.current = false;
    setOpen(false);
  }, []);

  /** Open with the query the link carried, so the form sees the package. */
  const openWith = useCallback((search: string, source: string) => {
    if (window.location.pathname === "/apply") return false;
    // A second click before the sheet has painted used to push a second
    // history entry for the same sheet, so the first Back press closed
    // nothing. The click is still swallowed — returning true — because the
    // sheet is open and navigating away would be worse.
    if (openRef.current) return true;
    const params = new URLSearchParams(search);
    params.set("apply", "sheet");
    window.history.pushState(
      { geebsApply: true },
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
    pushedRef.current = true;
    openRef.current = true;
    setOpen(true);
    try {
      // Telemetry must never decide whether the sheet opened: an throw here
      // once left the sheet open AND let the click navigate away, because the
      // caller never reached its preventDefault.
      trackClientEvent("apply_sheet_open", { source });
    } catch {
      // Attribution is best effort.
    }
    return true;
  }, []);

  // Apply links are already intercepted by ApplySourceTracker, which runs on
  // the capture phase to stamp attribution. Rather than race it with a second
  // listener, it asks first: it dispatches a cancelable geebs:open-apply, and
  // cancelling it means "the sheet took this one".
  useEffect(() => {
    function onOpenEvent(event: Event) {
      const custom = event as CustomEvent<{ search?: string; source?: string }>;
      if (openWith(custom.detail?.search ?? "", custom.detail?.source ?? "event")) {
        custom.preventDefault();
      }
    }
    window.addEventListener(OPEN_EVENT, onOpenEvent);
    return () => window.removeEventListener(OPEN_EVENT, onOpenEvent);
  }, [openWith]);

  // Back closes the sheet rather than leaving the page.
  useEffect(() => {
    function onPop() {
      pushedRef.current = false;
      openRef.current = false;
      setOpen(false);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("has-open-sheet");
      return;
    }
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    // The dock and the ribbon step aside while a sheet is up.
    document.body.classList.add("has-open-sheet");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("has-open-sheet");
      returnFocusRef.current?.focus?.();
    };
  }, [open, close]);

  // Only ever rendered from a client event, so there is nothing to hydrate.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="apply-sheet" role="presentation" onClick={close}>
      <div
        className="apply-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-sheet-heading"
        ref={panelRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="apply-sheet__bar">
          <p className="eyebrow text-cloudText">Apply for 1:1 coaching</p>
          <button
            type="button"
            className="apply-sheet__close"
            onClick={close}
            aria-label="Close the application"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {/* One line, not two. A sheet is not a page: everything above the
            first question is height the questions and the button do not get,
            and measured at 390px the button sat 72px below the fold with the
            two-line reassurance in place. The full version still runs on
            /apply, where there is room for it. */}
        <h2 id="apply-sheet-heading" className="apply-sheet__title">
          Two minutes, no payment.
        </h2>
        <p className="apply-sheet__sub">Kris reads every application himself.</p>
        <div className="apply-sheet__form">
          <ApplyForm />
        </div>
      </div>
    </div>,
    document.body,
  );
}

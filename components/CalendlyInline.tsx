"use client";

import { useEffect, useRef, useState } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_ORIGIN = "https://calendly.com";
/* If the third-party script has not run by then, the reader gets the link
   rather than a box that never fills. Measured against nothing — it is a
   patience budget, not a performance claim. */
const FALLBACK_MS = 6000;

type Props = {
  /** utm-only. No name, no email, no ga_client_id: this string is serialised
   *  into the page's own HTML as an RSC prop, where any script can read it. */
  calendlyUrl: string;
  /** Identity goes here instead. The widget writes it into the iframe without
   *  it ever entering our document. */
  prefill: Record<string, unknown>;
  /** The server route that still owns the outbound redirect, for anyone whose
   *  browser refuses the third-party embed. */
  fallbackUrl: string;
  applicationId: string;
  receipt: string;
  selectedPackage: string;
  /** First-touch attribution of the application (no identity). Written onto
   *  the calendar host as data attributes; the booking listener in
   *  GoogleAnalytics.tsx reads them into the booking lead. */
  attribution?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    landingPath?: string;
  };
  isTest: boolean;
  shouldTrackBookingStarted: boolean;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

/**
 * The calendar, inside the page.
 *
 * Before this, a completed application redirected to calendly.com and that was
 * the last thing we ever knew about the person: `outbound_calendly` fired five
 * times in 90 days and `booking_scheduled_at` was null on all 35 real rows.
 * The competitor this was modelled against embeds the calendar as the final
 * question of his own form, so booking and completing are one sitting.
 *
 * Two things had to be true and both were already true: Calendly's inline
 * embed is available on every plan with no API key, and this repo has listened
 * for `calendly.event_scheduled` since before it had anything to listen to —
 * that listener in GoogleAnalytics.tsx has been dead code waiting for an
 * embed. It now has one.
 */
export default function CalendlyInline({
  calendlyUrl,
  prefill,
  fallbackUrl,
  applicationId,
  receipt,
  selectedPackage,
  attribution,
  isTest,
  shouldTrackBookingStarted,
}: Props) {
  const host = useRef<HTMLDivElement | null>(null);
  const [booked, setBooked] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const recorded = useRef(false);
  const startedSent = useRef(false);

  /* booking_started used to mean "we sent them to Calendly". It now means the
     calendar is on their screen, which is the same step and one fewer hop.
     The server already deduped the claim; this only refuses to send twice
     within a mount. */
  useEffect(() => {
    if (!shouldTrackBookingStarted || startedSent.current) return;
    startedSent.current = true;
    trackClientEvent("booking_started", {
      selected_package: selectedPackage,
      booking_transition: "embedded",
      outbound: false,
    });
  }, [shouldTrackBookingStarted, selectedPackage]);

  useEffect(() => {
    if (isTest) return; // never contact a third party for a test record
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    const mount = () => {
      if (cancelled || !window.Calendly || el.childElementCount > 0) return;
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: el,
        prefill,
      });
    };

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SRC}"]`,
    );
    /* The load listener goes on BOTH branches. The first version only attached
       it when it created the tag, so a client-side navigation back here found
       an existing but not-yet-loaded script, called mount() into a missing
       window.Calendly, and never tried again — a permanently empty box. */
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", mount);
    mount();

    /* Measure the rendered thing, not the node. Calendly's own wrapper div
       satisfies childElementCount even when the iframe inside is blocked by a
       tracking blocker or a frame-src CSP, which would leave a blank 680px box
       and a fallback link that never appears. */
    const patience = window.setTimeout(() => {
      if (cancelled) return;
      const frame = el.querySelector("iframe");
      if (!frame || frame.getBoundingClientRect().height < 40)
        setShowFallback(true);
    }, FALLBACK_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(patience);
      script?.removeEventListener("load", mount);
    };
  }, [calendlyUrl, prefill, isTest]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== CALENDLY_ORIGIN) return;
      const data = event.data as
        | { event?: string; payload?: Record<string, { uri?: string }> }
        | undefined;
      if (!data || data.event !== "calendly.event_scheduled") return;
      if (isTest) return; // before any side effect, not after two of them
      if (recorded.current) return;
      recorded.current = true;

      setBooked(true);

      /* book_appointment is NOT fired here. GoogleAnalytics.tsx has listened for
         calendly.event_scheduled since before an embed existed and fires it on
         the same GA pipe; emitting a second one counted every embedded booking
         twice. One emitter, and it is the older one. */

      void fetch("/api/calendly/scheduled", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          application_id: applicationId,
          receipt,
          event_uri: data.payload?.event?.uri,
          invitee_uri: data.payload?.invitee?.uri,
        }),
      }).catch(() => {
        /* The row is reconciled from Calendly's side too. A failed write here
           costs us the immediate record, never the booking. */
      });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applicationId, receipt, isTest]);

  /* A classified test application stops here. No widget script, no iframe, no
     network call to calendly.com, and the same wording the redirect client used
     — tests/e2e/apply-funnel.spec.ts asserts both the heading and an empty list
     of calendly requests. */
  if (isTest) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="eyebrow text-cloudText">Application received</p>
        <h1 className="mt-4 text-bone text-[34px] md:text-[48px] leading-tight">
          Test application verified.
        </h1>
        <p className="mt-4 text-mute">
          The saved test record passed the booking gate. No calendar was opened.
        </p>
      </div>
    );
  }

  if (booked) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-16 text-center">
        <p className="eyebrow text-cloudText">
          You are on Kris&apos;s calendar
        </p>
        <h1 className="display mt-3 text-bone text-[30px] leading-[1.1] md:text-[40px]">
          That time is yours.
        </h1>
        <p className="mt-4 text-[15.5px] leading-[1.65] text-mute">
          Calendly has emailed the invite. Kris blocks that half hour for one
          person, so if the day turns on you, move it from the email rather than
          leaving it.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[760px] px-4 pb-16 pt-8 md:px-6">
      <header className="px-2 text-center">
        <p className="eyebrow text-cloudText">Last step</p>
        <h1 className="display mt-3 text-bone text-[26px] leading-[1.12] md:text-[34px]">
          Pick your time.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-mute">
          Your answers are already with Kris. Nothing left to retype.
        </p>
      </header>

      <div
        ref={host}
        data-calendly-inline
        data-selected-package={selectedPackage || undefined}
        data-utm-source={attribution?.utmSource || undefined}
        data-utm-medium={attribution?.utmMedium || undefined}
        data-utm-campaign={attribution?.utmCampaign || undefined}
        data-landing-path={attribution?.landingPath || undefined}
        className="mt-6 min-h-[680px] w-full overflow-hidden rounded-xl border border-line2 bg-ink3"
      />

      {/* Rendered ALWAYS, not behind the JS timer that used to gate it: an
          anchor that works without JS is worthless if a setTimeout decides
          whether it exists. The timer only promotes it from quiet to stated. */}
      <p
        className={`mt-4 text-center text-[14px] ${
          showFallback ? "text-mute" : "text-mute2"
        }`}
      >
        {showFallback ? "The calendar is slow to load. " : "Prefer a new tab? "}
        <a
          className="text-cloudText underline underline-offset-4"
          href={fallbackUrl}
          data-analytics-event="outbound_calendly"
          data-analytics-link-kind="calendly_fallback"
        >
          Open the calendar
        </a>
        .
      </p>
    </section>
  );
}

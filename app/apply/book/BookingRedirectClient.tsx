"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

const SAFE_CALENDLY_EVENT_URL = "https://calendly.com/kristitan/assessment";

type Props = {
  targetUrl: string;
  applicationId: string;
  selectedPackage: string;
  isTest: boolean;
  shouldTrackBookingStarted: boolean;
};

export function BookingRedirectClient({
  targetUrl,
  applicationId,
  selectedPackage,
  isTest,
  shouldTrackBookingStarted,
}: Props) {
  const timerRef = useRef<number | null>(null);
  const redirectingRef = useRef(false);

  const startBooking = useCallback(
    (transition: "automatic" | "button") => {
      if (redirectingRef.current || isTest) return;
      redirectingRef.current = true;

      const eventKey = `geebs_booking_started:${applicationId}`;
      let alreadyTracked = false;
      if (shouldTrackBookingStarted) {
        try {
          alreadyTracked = window.sessionStorage.getItem(eventKey) === "1";
          if (!alreadyTracked) window.sessionStorage.setItem(eventKey, "1");
        } catch {
          // The durable server claim remains authoritative when storage is blocked.
        }
      }

      if (shouldTrackBookingStarted && !alreadyTracked) {
        trackClientEvent("booking_started", {
          selected_package: selectedPackage,
          booking_transition: transition,
          link_url: SAFE_CALENDLY_EVENT_URL,
          outbound: true,
        });
      }

      // Canonical funnel event (GA4 event spec): the outbound handoff to
      // Calendly from the apply flow. Fires on the actual redirect/click (auto
      // or the "Open calendar" button), guarded once-per-mount by
      // redirectingRef. Complements the deduped booking_started conversion so
      // the apply->booked step is measurable. Emits only the public Calendly
      // URL — no PII (booking PII stays server-side in /apply/book/go).
      trackClientEvent("outbound_calendly", {
        selected_package: selectedPackage,
        booking_transition: transition,
        link_url: SAFE_CALENDLY_EVENT_URL,
        outbound: true,
      });

      timerRef.current = window.setTimeout(() => {
        window.location.assign(targetUrl);
      }, 250);
    },
    [
      applicationId,
      isTest,
      selectedPackage,
      shouldTrackBookingStarted,
      targetUrl,
    ],
  );

  useEffect(() => {
    if (isTest) return;
    timerRef.current = window.setTimeout(() => startBooking("automatic"), 350);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isTest, startBooking]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="eyebrow text-cloudText">Application received</p>
      <h1 className="mt-4 text-bone text-[34px] md:text-[48px] leading-tight">
        {isTest ? "Test application verified." : "Pick a time with Kris."}
      </h1>
      <p className="mt-4 text-mute">
        {isTest
          ? "The saved test record passed the booking gate. No calendar was opened."
          : "Your application is saved. We're opening the calendar now."}
      </p>
      {!isTest ? (
        <div className="mt-8 flex justify-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => startBooking("button")}
          >
            Open calendar
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

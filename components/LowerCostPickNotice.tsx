"use client";

import { useEffect, useState } from "react";
import { CALENDAR_PICK_SESSION_KEY } from "@/components/CalendarStrip";

export function LowerCostPickNotice() {
  const [hadPick, setHadPick] = useState(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(CALENDAR_PICK_SESSION_KEY);
      if (stored) {
        window.sessionStorage.removeItem(CALENDAR_PICK_SESSION_KEY);
        // A read-and-consume of sessionStorage: it cannot move into render,
        // because render must not have side effects and the server has no
        // sessionStorage to read. useSyncExternalStore does not fit either --
        // the key is deleted on read, so the next snapshot would be empty and
        // the notice would disappear immediately.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHadPick(true);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  if (!hadPick) return null;

  return (
    <div
      data-lower-cost-pick-notice
      className="mb-6 rounded-xl border border-line2 bg-ink3/60 px-4 py-3 text-[14px] text-bone/90"
    >
      That time is back on the calendar. Start here instead.
    </div>
  );
}

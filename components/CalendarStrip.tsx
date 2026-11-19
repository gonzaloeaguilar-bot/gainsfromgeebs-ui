"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  CALENDAR_FIRST_EXPERIMENT_ID,
  calendarFirstVariant,
  type CalendarFirstVariant,
} from "@/lib/calendarExperiment";

export type CalendarPick = {
  date: string;
  start_time: string;
};

export const CALENDAR_PICK_SESSION_KEY = "geebs_calendar_pick";

type AvailabilityDay = {
  date: string;
  spots: string[];
};

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatTimeChip(isoString: string): string {
  try {
    const d = new Date(isoString);
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  } catch {
    return isoString;
  }
}

function formatDateDisplay(isoDate: string): string {
  try {
    const [y, m, d] = isoDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    const month = MONTH_NAMES[dateObj.getMonth()];
    return `${weekday} ${month} ${d}`;
  } catch {
    return isoDate;
  }
}

export default function CalendarStrip({
  source = "hero",
  className = "",
}: {
  source?: string;
  className?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<CalendarFirstVariant>("a");
  const [availableDays, setAvailableDays] = useState<AvailabilityDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const arm = calendarFirstVariant();
    // calendarFirstVariant() ASSIGNS and persists the experiment arm, so it
    // cannot be called during render. Reading it there would bucket a visitor
    // as a side effect of rendering and would differ between server and client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(arm);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    if (arm === "b") {
      trackClientEvent("experiment_exposure", {
        experiment_id: CALENDAR_FIRST_EXPERIMENT_ID,
        variant: "b",
      });

      fetch("/api/availability")
        .then((res) => res.json())
        .then((data: { days?: AvailabilityDay[] }) => {
          if (data && Array.isArray(data.days)) {
            setAvailableDays(data.days);
            // Collapsed by default: the strip must fit the first screen.
            // Times open only when the visitor taps an open day.
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      trackClientEvent("experiment_exposure", {
        experiment_id: CALENDAR_FIRST_EXPERIMENT_ID,
        variant: "a",
      });
      setLoading(false);
    }
  }, []);

  // Build the continuous 7-day strip starting today
  const weekDays = useMemo(() => {
    const now = new Date();
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const weekdayShort = WEEKDAY_NAMES[d.getDay()];
      const dayNumber = String(d.getDate());
      result.push({
        date: dateStr,
        weekday: weekdayShort,
        dayNumber,
        isToday: i === 0,
      });
    }
    return result;
  }, []);

  if (!mounted || variant !== "b" || loading) {
    return null;
  }

  // If 0 open days returned, render nothing (current hero stays)
  if (availableDays.length === 0) {
    return null;
  }

  const spotsByDate = new Map<string, string[]>();
  for (const item of availableDays) {
    spotsByDate.set(item.date, item.spots);
  }

  const handleSelectDay = (date: string, isOpen: boolean) => {
    if (!isOpen) return;
    setSelectedDate(date);
    trackClientEvent("cta_click", {
      cta_id: "calendar_day_select",
      cta_text: `Select date ${date}`,
      cta_position: source,
      interaction_type: "calendar_day",
      selected_date: date,
    });
  };

  const handleSelectTime = (date: string, startTime: string) => {
    const pick: CalendarPick = { date, start_time: startTime };
    try {
      window.sessionStorage.setItem(
        CALENDAR_PICK_SESSION_KEY,
        JSON.stringify(pick),
      );
    } catch {
      // Storage unavailable fallback
    }

    trackClientEvent("cta_click", {
      cta_id: "calendar_time_select",
      cta_text: `Select time ${formatTimeChip(startTime)}`,
      cta_position: source,
      interaction_type: "calendar_time",
      selected_date: date,
      selected_time: startTime,
    });

    const encodedIso = encodeURIComponent(startTime);
    router.push(`/apply?pick=${encodedIso}`);
  };

  const selectedSpots = selectedDate ? spotsByDate.get(selectedDate) ?? [] : [];

  return (
    <section
      className={`calendar-strip mt-0 mb-4 w-full rounded-2xl border border-line2 bg-ink2/80 p-4 backdrop-blur-md shadow-xl ${className}`}
      aria-label="Kris's Availability Calendar"
      data-calendar-strip
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3.5">
        <div>
          <h2 className="mt-1 text-[16px] sm:text-[18px] font-semibold text-bone">
            Kris opens three days at a time. Pick yours.
          </h2>
        </div>
      </div>

      {/* 7-day strip */}
      <div
        className="grid grid-cols-7 gap-1.5 sm:gap-2 pb-2"
        role="group"
        aria-label="Next 7 days availability"
      >
        {weekDays.map((day) => {
          const spots = spotsByDate.get(day.date);
          const isOpen = Boolean(spots && spots.length > 0);
          const isSelected = selectedDate === day.date;

          return (
            <button
              key={day.date}
              type="button"
              disabled={!isOpen}
              onClick={() => handleSelectDay(day.date, isOpen)}
              className={[
                "cal-day flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 rounded-xl transition-all relative border min-h-[58px]",
                isOpen ? "open cursor-pointer" : "opacity-35 cursor-not-allowed border-transparent bg-ink3/30",
                isOpen && !isSelected ? "border-line bg-ink3/60 hover:border-amber-400/50" : "",
                isOpen && isSelected ? "border-amber-400 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isSelected}
              aria-label={`${day.weekday} ${day.dayNumber}${day.isToday ? ", today" : ""}${
                isOpen ? `, ${spots?.length} spots available` : ", unavailable"
              }`}
            >
              <span className="text-[11px] sm:text-[12px] font-medium tracking-wide text-mute uppercase">
                {day.weekday}
              </span>
              <span
                className={`text-[15px] sm:text-[17px] font-bold mt-0.5 ${
                  isOpen ? "text-amber-300" : "text-bone/50"
                }`}
              >
                {day.dayNumber}
              </span>
              {day.isToday && (
                <span className="mt-1 inline-block h-1 w-1 rounded-full bg-cloudText" />
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded time chips for selected open day */}
      {selectedDate && selectedSpots.length > 0 && (
        <div className="mt-3.5 pt-3.5 border-t border-line">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-bone">
              Available times for {formatDateDisplay(selectedDate)}
            </span>
            <span className="text-[11.5px] text-mute2">15-min strategy call</span>
          </div>
          <div
            id={listId}
            className="flex flex-wrap gap-2 py-1"
          >
            {selectedSpots.map((spot) => (
              <button
                key={spot}
                type="button"
                onClick={() => handleSelectTime(selectedDate, spot)}
                className="cal-time-chip rounded-lg border border-amber-400/40 bg-amber-400/10 px-2.5 py-1.5 text-[13px] font-medium text-amber-200 transition-colors hover:bg-amber-400 hover:text-ink focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              >
                {formatTimeChip(spot)}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

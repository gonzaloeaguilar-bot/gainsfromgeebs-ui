export const CALENDAR_FIRST_EXPERIMENT_ID = "calendar_first_v1";

export type CalendarFirstVariant = "a" | "b";

const KEY = "geebs_calendar_first_variant";

export type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

/**
 * The visitor's arm for calendar_first_v1:
 * arm "a" = control (current hero / no calendar strip)
 * arm "b" = calendar strip (calendar first)
 *
 * Query param: ?geebs_exp=calendar_first_v1:a|b or ?calendar_variant=a|b forces an arm.
 */
export function calendarFirstVariant(options?: {
  search?: string;
  storage?: StorageLike | null;
}): CalendarFirstVariant {
  const isArm = (v: string | null | undefined): v is CalendarFirstVariant =>
    v === "a" || v === "b";
  try {
    const search =
      options?.search ??
      (typeof window !== "undefined" ? window.location.search : "");
    const storage =
      options?.storage !== undefined
        ? options.storage
        : typeof window !== "undefined"
          ? window.localStorage
          : null;

    const params = new URLSearchParams(search);
    const expParam = params.get("geebs_exp");
    if (expParam) {
      const match = expParam.match(/^calendar_first_v1:(a|b)$/);
      if (match && isArm(match[1])) {
        storage?.setItem(KEY, match[1]);
        return match[1];
      }
    }

    const forced = params.get("calendar_variant");
    if (isArm(forced)) {
      storage?.setItem(KEY, forced);
      return forced;
    }

    const stored = storage?.getItem(KEY);
    if (isArm(stored)) return stored;

    if (!storage) return "a";

    const picked: CalendarFirstVariant = Math.random() < 0.5 ? "a" : "b";
    storage.setItem(KEY, picked);
    return picked;
  } catch {
    return "a";
  }
}

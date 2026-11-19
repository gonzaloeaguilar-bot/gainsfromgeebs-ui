export const PACKAGES_APPLY_PATH_EXPERIMENT_ID = "packages_apply_path_v1";

export type PackagesApplyPathVariant = "a" | "b";

const KEY = "geebs_packages_apply_path_variant";

export type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

/**
 * The visitor's arm for packages_apply_path_v1 on /packages:
 * arm "a" = control (the page as it was)
 * arm "b" = the apply-path block under the price table: what happens after
 *           Apply, real client results beside the prices, and the price
 *           objections DM leads actually send.
 *
 * Why it exists, measured 2026-10-07 (GA4 538698079, 09-09 -> 10-06): 45
 * users on /packages, 10 clicked an apply link, 7 reached /apply, 2 started
 * the form, 0 submitted. In the DM bot since 07-01, 38 messages ask the
 * price and 23 say they cannot afford it.
 *
 * Forcing an arm: ?geebs_exp=packages_apply_path_v1:a|b or
 * ?packages_path=a|b. Same storage rules as calendar_first_v1, which runs
 * on the same page with its own key, so the two split independently.
 */
export function packagesApplyPathVariant(options?: {
  search?: string;
  storage?: StorageLike | null;
  random?: () => number;
}): PackagesApplyPathVariant {
  const isArm = (v: string | null | undefined): v is PackagesApplyPathVariant =>
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
      const match = expParam.match(/^packages_apply_path_v1:(a|b)$/);
      if (match && isArm(match[1])) {
        storage?.setItem(KEY, match[1]);
        return match[1];
      }
    }

    const forced = params.get("packages_path");
    if (isArm(forced)) {
      storage?.setItem(KEY, forced);
      return forced;
    }

    const stored = storage?.getItem(KEY);
    if (isArm(stored)) return stored;

    // No storage, no stable arm: show the control rather than a coin flip
    // that changes on every page view and pollutes both arms.
    if (!storage) return "a";

    const picked: PackagesApplyPathVariant =
      (options?.random ?? Math.random)() < 0.5 ? "a" : "b";
    storage.setItem(KEY, picked);
    return picked;
  } catch {
    return "a";
  }
}

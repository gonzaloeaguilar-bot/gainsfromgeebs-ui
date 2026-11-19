import { SCHOLARSHIP_VARIANTS, type ScholarshipVariant } from "@/lib/scholarship";

const KEY = "geebs_scholarship_sheet_variant";

/**
 * The visitor's arm, assigned once and kept, so the same person always sees
 * the same version and a conversion can be credited to what they saw.
 * `?sheet_variant=a|b` forces an arm, for QA and for sending a link to one.
 * Storage blocked: a fresh coin flip per page, which still splits traffic.
 */
export function scholarshipVariant(): ScholarshipVariant {
  const arms = Object.keys(SCHOLARSHIP_VARIANTS) as ScholarshipVariant[];
  const isArm = (v: string | null): v is ScholarshipVariant => !!v && (arms as string[]).includes(v);
  try {
    const forced = new URLSearchParams(window.location.search).get("sheet_variant");
    if (isArm(forced)) {
      window.localStorage.setItem(KEY, forced);
      return forced;
    }
    const stored = window.localStorage.getItem(KEY);
    if (isArm(stored)) return stored;
    const picked = arms[Math.floor(Math.random() * arms.length)];
    window.localStorage.setItem(KEY, picked);
    return picked;
  } catch {
    return arms[Math.floor(Math.random() * arms.length)];
  }
}

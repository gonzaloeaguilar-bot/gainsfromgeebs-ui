/*
 * Supplement backup lines, kept apart so they can be reviewed on their own.
 * Food comes first in the plan; these only ever render as the backup.
 *
 * SOURCES: app/science/vitamin-d (600-2,000 IU/day common range, blood test to
 * dose a deficiency), app/science/magnesium (100-350 mg elemental, pill part
 * 350 mg or less), app/science/omega-3-and-hormones (1-3 g/day EPA+DHA, mild
 * blood-thinning caution), app/nutrition/plant-based-muscle-growth (B12 only
 * "deserves attention", no dose), app/nutrition/red-meat-iron (no iron dose).
 */
import type { NutrientId } from "./plan";

export const SUPPLEMENT_BACKUP: Record<NutrientId, string | null> = {
  protein:
    "A protein shake is a fine backup when food falls short. It is a convenience, not a requirement.",
  vitamin_d:
    "If you supplement, the common range is 600 to 2,000 IU a day. A blood test is the better way to dose a real deficiency.",
  magnesium:
    "A pill is usually 100 to 350 mg once a day. Keep the pill part at 350 mg or less.",
  omega_3:
    "If fish is not happening, fish oil is the fallback. Most research uses 1 to 3 g a day of EPA and DHA combined. High doses can thin the blood, so ask your doctor first if you take blood thinners or have surgery coming.",
  iron:
    null,
  b12:
    "Worth considering a B12 supplement. Follow the label, and ask your doctor or a blood test what you need.",
};

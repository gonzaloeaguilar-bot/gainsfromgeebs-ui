// ============================================================
//  subscribe-constants — shared between the "use server" action
//  and client-side code (tests, email templates).
//
//  This file must NOT carry "use server" — only pure constants.
// ============================================================

/** Absolute URL for the 5-Day Reset PDF (served from public/resources/) */
export const FREE_GUIDE_PDF_URL =
  "https://gainsfromgeebs.com/resources/5-day-reset.pdf";

/** Site-relative path for the downloadable HTML goal-weight forecast. */
export const GOAL_TRACKER_HTML_PATH =
  "/resources/geebs-90-day-goal-tracker.html";

/** Absolute URL for the downloadable HTML goal-weight forecast. */
export const GOAL_TRACKER_HTML_URL =
  `https://gainsfromgeebs.com${GOAL_TRACKER_HTML_PATH}`;

/** Sources that trigger the 5-Day Reset delivery email rather than the
 *  standard newsletter welcome. */
export const FREE_GUIDE_SOURCES = new Set(["free-guide", "dm_bot"]);

/** Sources that trigger the downloadable HTML forecast email. */
export const GOAL_TRACKER_SOURCES = new Set(["goal-tracker"]);

/** Prefix used by the peer-reviewed science lead-magnet lane. */
export const SCIENCE_DROP_SOURCE_PREFIX = "science-drop";

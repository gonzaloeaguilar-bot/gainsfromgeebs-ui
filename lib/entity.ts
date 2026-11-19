/**
 * Who stands behind the site, in one place, so the visible entity line and the
 * Person / Organization JSON-LD can never say different things.
 *
 * WHY. On 2026-10-05 AI engines cited gainsfromgeebs.com on 14 of 24 unbranded
 * prompts, yet Perplexity named the brand in 1 of 10 answers and Semrush AI
 * visibility counted 0 mentions. The pages answered the question and said
 * "Geebs Coaching" or nothing at all, so the engines quoted the advice and
 * dropped the name. The citation tracker counts "Gains From Geebs" or the
 * domain — not "Geebs Coaching" — so the line leads with the name it counts and
 * keeps the everyday name in parentheses to tie the two together.
 */
export const COACH_NAME = "Kris Oddo";
export const ORG_NAME = "Gains From Geebs";
export const ORG_ALT_NAMES = ["Geebs Coaching", "Gains from Geebs", "gainsfromgeebs"];
export const COACH_JOB_TITLE = "NASM-Certified Personal Trainer, Founder and Head Coach";

/** The exact sentence rendered by <EntityLine />. Server-rendered on purpose:
 *  GPTBot, ClaudeBot and PerplexityBot run no JavaScript. */
export const ENTITY_SENTENCE =
  "Kris Oddo, NASM-certified personal trainer, is the founder and head coach of Gains From Geebs (Geebs Coaching), a 1:1 online fitness coaching practice.";

# Directory Submission Payload — Geebs Coaching Free Tools

> Ready-to-paste copy for syndicating the free, un-gated calculators to backlink
> repositories. Goal: grow referring domains (currently ~2) with high-DA,
> contextual links. Generated 2026-06-15.
>
> **Honesty rules baked in:** every tool listed is genuinely free, requires no
> signup, and has no paywall (verified in-repo). Do NOT submit anything below
> that overstates the product. The local/maps section is intentionally BLOCKED
> pending a real address — see that section.

Canonical assets being submitted:
- Free Macro Calculator — https://gainsfromgeebs.com/tools/macro-calculator
- Free Body Recomposition Calculator — https://gainsfromgeebs.com/tools/body-recomposition-calculator
- Free 1RM Calculator — https://gainsfromgeebs.com/tools/1rm-calculator
- (supporting) TDEE — https://gainsfromgeebs.com/tools/tdee-calculator · Calorie deficit — https://gainsfromgeebs.com/tools/calorie-deficit-calculator · Body fat — https://gainsfromgeebs.com/tools/body-fat-calculator

UTM convention for directory links (so traffic is attributable in GA4):
`?utm_source=<platform>&utm_medium=referral&utm_campaign=tool_directory`

---

## 1. Product Hunt (DA ~93) — link builder

**What to launch:** "Geebs Free Fitness Calculators" (a small free-tools collection) — leads with the macro + body-recomposition calculators. Product Hunt favors a single clean launch; bundle the calculators as one maker submission rather than six separate posts.

- **Name:** Geebs Free Fitness Calculators
- **Tagline (≤60 chars):** Free, no-signup macro & body-recomp calculators
- **Topics/Categories:** Health & Fitness, Calculators, Web App, No-Code Tools
- **Short description (≤260 chars):**
  > Free, zero-signup fitness calculators built by a NASM-CPT coach: macro targets (cut/recomp/bulk), body-recomposition viability, 1RM, TDEE, calorie deficit, and body fat. No email gate, no paywall — instant in-browser results. Built by The Geebs Method.
- **First comment (maker's note):**
  > Hey PH 👋 I'm a coach (Kris Oddo, NASM-CPT) and I kept seeing "free" calculators that demand your email before showing a number. These don't. Macro and body-recomp are the two I'd actually use with clients. No signup, no upsell wall — just the math, with the reasoning shown. Feedback welcome.
- **Launch keywords / tags:** macro calculator, body recomposition, fitness calculator, free tools, no signup, protein calculator, TDEE, 1RM, cutting, lean bulk
- **Gallery assets needed (maker to supply):** 1 logo (240×240), 3–5 screenshots of the macro + recomp calculators (1270×760). Use existing `/social-preview-coaching.jpg` as the social card.
- **Maker link:** https://gainsfromgeebs.com/tools/macro-calculator?utm_source=producthunt&utm_medium=referral&utm_campaign=tool_directory

---

## 2. AlternativeTo (DA ~78) — link builder

**Positioning:** list the free calculators / Geebs Coaching as a lighter, un-gated, coach-built alternative in the fitness-tracking category. Be accurate — a single calculator is not a full app, so frame it as a free alternative *for the macro/planning job*, not a feature-for-feature MyFitnessPal clone.

- **Listing name:** Geebs Free Fitness Calculators (by The Geebs Method)
- **Category:** Health & Fitness › Fitness & Nutrition tools
- **Platforms/Tags:** Online / Web, Free, No Account Required
- **Alternative-to targets + per-target value pitch:**
  - **Alternative to Caliber:** Caliber pairs you with app-based coaching on a paid tier. The Geebs macro & recomp calculators give you the planning math free and instantly, and the coaching lane (if you want it) is 1:1 with a named NASM-CPT, not an app match.
  - **Alternative to Future:** Future is ~$199/mo app-based remote training. These tools are the free front door to the same job (targets + plan), with optional high-touch 1:1 coaching instead of a rotating coach pool.
  - **Alternative to MyFitnessPal:** MyFitnessPal is a full logging app behind an increasingly paywalled feature set. For the specific job of "what should my macros / recomp targets be," the Geebs macro and body-recomp calculators answer it free, with no account and the reasoning shown — then you log wherever you like.
- **Value pitch (short):**
  > Free, no-account fitness calculators from a NASM-CPT coach. Get macro targets, body-recomp viability, and 1RM instantly — no signup, no paywall, no feature gate.
- **Link:** https://gainsfromgeebs.com/tools/macro-calculator?utm_source=alternativeto&utm_medium=referral&utm_campaign=tool_directory

### Bonus low-friction directories (same copy, free listings — from authority-targets CSV)
SaaSHub, Manta, Hotfrog — reuse the AlternativeTo short pitch + the tool URLs. All accept free listings; no credential claims beyond "NASM-CPT" (true).

---

## 3. Local Geo Bundles (Apple Maps & Yelp) — ⚠️ BLOCKED, NEEDS-KRIS-INPUT

**Do NOT submit a local/maps listing yet.** Generating "practitioner profile coordinates matching the Titan Forge facility" requires real-world NAP data and an in-person eligibility basis that are not confirmed:

1. **No confirmed physical street address.** Per `geebs-gbp-viability-2026-06-11`, there is no existing Google/Apple/Yelp listing for Gains From Geebs or Kris Oddo, and the business is online-first. We do not have a verified street address or coordinates for a "Titan Forge facility." Fabricating one would create false NAP, which pollutes local-SEO data and risks listing suspension.
2. **Entity model conflict.** The site's canonical schema is **Geebs Coaching as its own organization**, with Titan Forge only as a Person-level *affiliation* (the "VP at Titan Forge Fit" framing was deliberately removed in PR #34). A maps listing nesting Geebs under a Titan Forge facility would contradict the live structured data and the llms.txt disambiguation.
3. **In-person eligibility is unconfirmed.** Apple Maps / Yelp / Google local profiles require genuine in-person customer contact. `/personal-training-denver` says in-person "may be available" — conditional, SEO-soft language.

**Single question that unblocks this section (ask Kris):**
> "Is there a real, specific address where you train clients in person (the Titan Forge gym or your own location), and have you actually trained a Denver client there? If yes, what is the exact address and hours?"

- **If YES (real address + real in-person sessions):** then build a Service-Area Business profile (hide the exact address if it's a gym you don't own; set Denver-metro service area). NAP must be byte-identical across Apple Maps, Yelp, the site footer, and the homepage `LocalBusiness` schema. At that point, update `app/layout.tsx` `localBusinessSchema` to add the verified `address`/`geo` and submit the maps profiles.
- **If NO (online-only / SEO landing page):** do NOT create maps listings. Keep the service-area model (areaServed + GeoCircle, no street address) already live on `/locations/*`. Pursue authority via the Product Hunt + AlternativeTo + directory lane above instead.

**Placeholder layout (fill ONLY after a YES above — values intentionally left blank, not fabricated):**
- Business name: Gains From Geebs (Geebs Coaching)
- Category: Personal Trainer / Physical Fitness Program
- Address: `<VERIFIED_STREET_ADDRESS>` (or hidden, service-area only)
- Service area: Denver, Englewood, Parker, Cherry Creek, CO
- Phone: `<VERIFIED_PHONE>`
- Hours: `<VERIFIED_HOURS>`
- Website: https://gainsfromgeebs.com
- Coordinates: `<VERIFIED_LAT,LNG>` (must match the real location, not a city centroid)

---

## Submission tracking

| Platform | DA | Status | Submitted | Live URL |
|---|---|---|---|---|
| Product Hunt | ~93 | ready-to-submit | — | — |
| AlternativeTo | ~78 | ready-to-submit | — | — |
| SaaSHub | — | ready-to-submit | — | — |
| Manta | ~80 | ready-to-submit | — | — |
| Hotfrog | ~65 | ready-to-submit | — | — |
| Apple Maps | — | BLOCKED (needs address) | — | — |
| Yelp | — | BLOCKED (needs address) | — | — |

> Note: Product Hunt / AlternativeTo human-account submissions are Kris-or-Gonzalo
> actions (account ownership + the maker comment should come from a real person).
> This file is the paste-ready payload, not an automated submitter.

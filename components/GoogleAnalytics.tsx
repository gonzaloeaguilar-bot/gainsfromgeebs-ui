import Script from "next/script";
import {
  BRAND,
  CONTRACT_MAP,
  SHARED_MODULE_DISABLE,
} from "@/lib/analyticsContract";

import { BAND_AT_OR_ABOVE_FLOOR } from "@/lib/investmentBands";

/**
 * The qualifying band is injected into the inline script from the same
 * constant the server uses, rather than listed inside it.
 *
 * The script used to branch on the retired values 0_100 and 100_200 — two
 * bands the form has never sent — so its disqualification was driven by
 * readiness alone. It reported "Ready, but I'd want the lower end" as
 * QUALIFIED while the server routed that answer to a downsell, and GA4's
 * qualified count came out as the server's count plus everyone under the
 * floor. That number is read as a funnel result.
 *
 * Kept out of the template literal on purpose: whatever goes in there is
 * downloaded by every visitor.
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function buildGoogleAnalyticsInlineScript(measurementId: string) {
  const contractMapJson = JSON.stringify(CONTRACT_MAP);
  const disableJson = JSON.stringify(SHARED_MODULE_DISABLE);
  const brandJson = JSON.stringify(BRAND);
  return `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            // Respect browser-level privacy signals before initializing GA.
            // The site does not transmit form values or visitor identifiers.
            var geebsAnalyticsOptedOut = !!(
              navigator.doNotTrack === "1" ||
              window.doNotTrack === "1" ||
              navigator.globalPrivacyControl === true
            );
            // Automated browsers (webdriver, crawlers, AI agents) never configure
            // GA4, so gtag.js has no destination and sends nothing. Events still
            // reach dataLayer, which is what the e2e telemetry specs observe.
            // Real-browser bots were 16% of 28d sessions (0% engaged, identical
            // fingerprints across unrelated brand sites, 2026-09-23).
            var geebsUserAgent = navigator.userAgent || "";
            var geebsAutomatedBrowser = !!(
              navigator.webdriver === true ||
              /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexity|bytespider|petalbot|semrush|ahrefs|dataforseo|facebookexternalhit|bingpreview|googleother|google-inspectiontool|google-pagerenderer|google-read-aloud|google web preview|storebot-google|mediapartners-google|adsbot/i.test(geebsUserAgent)
            );
            // Stealth fleets hide navigator.webdriver and send a normal Chrome UA,
            // so they are caught by what no person's device looks like. Measured in
            // GA4 538698079, 2026-09-26..10-06, AFTER the webdriver check shipped:
            // Windows 10 Chrome at 1280x1200 from Singapore = 161 sessions, 0 engaged,
            // 1.3s; square desktop screens (1366x1366, 1280x1280, 2000x2000) and
            // 800x600 Macs only from data-centre cities (The Dalles, Groningen,
            // Boardman, Hangzhou); 412x732 with an unparseable UA (Google's renderer
            // default). Desktop-only rules never touch a phone, so the live
            // analytics gate (iPhone UA, headless) still sees GA4.
            var geebsBotFleet = (function () {
              try {
                var sw = typeof screen !== "undefined" && screen ? screen.width : 0;
                var sh = typeof screen !== "undefined" && screen ? screen.height : 0;
                if (sw === 412 && sh === 732) return true;
                var desktopUa = /Windows NT|Macintosh|X11|CrOS/.test(geebsUserAgent) &&
                  !/Mobi|Android|iPhone|iPad|iPod/i.test(geebsUserAgent);
                if (!desktopUa) return false;
                if (sw > 0 && sw === sh) return true;
                if ((sw === 800 && sh === 600) || (sw === 1280 && sh === 1200)) return true;
                // Headless windows have no outer frame.
                if (window.outerWidth === 0 && window.outerHeight === 0) return true;
                // A Windows or Mac UA running on a Linux host is a spoofed UA.
                if (/Windows NT|Macintosh/.test(geebsUserAgent) && /Linux/.test(navigator.platform || "")) return true;
                // Software-rendered WebGL (no GPU) is a server, not a laptop.
                if (typeof document.createElement === "function") {
                  var glCanvas = document.createElement("canvas");
                  var gl = glCanvas && glCanvas.getContext && (glCanvas.getContext("webgl") || glCanvas.getContext("experimental-webgl"));
                  if (gl) {
                    var glInfo = gl.getExtension("WEBGL_debug_renderer_info");
                    var glRenderer = String(gl.getParameter(glInfo ? glInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || "");
                    var glLose = gl.getExtension("WEBGL_lose_context");
                    if (glLose) glLose.loseContext();
                    if (/swiftshader|llvmpipe|softpipe|mesa offscreen/i.test(glRenderer)) return true;
                  }
                }
              } catch (geebsBotCheckError) {}
              return false;
            })();
            if (!geebsAnalyticsOptedOut && !geebsAutomatedBrowser && !geebsBotFleet) {
              gtag("js", new Date());
              gtag("config", ${measurementId}, { send_page_view: false });
              // gtag.js is loaded only here: without it nothing can leave the
              // page, even events that name send_to directly. It waits until the
              // page is actually shown, so a prerender, link preview or hidden
              // webview that no person ever sees sends nothing; dataLayer keeps
              // every queued call in order and gtag.js replays it on load.
              var geebsLoadGtag = function () {
                if (geebsLoadGtag.done || document.visibilityState === "hidden") return;
                geebsLoadGtag.done = true;
                if (typeof document.createElement === "function" && document.head) {
                  var geebsGtagScript = document.createElement("script");
                  geebsGtagScript.async = true;
                  geebsGtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(${measurementId});
                  document.head.appendChild(geebsGtagScript);
                }
              };
              geebsLoadGtag();
              if (!geebsLoadGtag.done) document.addEventListener("visibilitychange", geebsLoadGtag);
            }

            (function () {
              function safeAnalyticsLocation(rawUrl) {
                try {
                  var url = new URL(rawUrl, window.location.origin);
                  var safeParams = new URLSearchParams();
                  [
                    "package",
                    "utm_source",
                    "utm_medium",
                    "utm_campaign",
                    "utm_content",
                    "creative_id",
                    "source_creative_id"
                  ].forEach(function (key) {
                    var value = (url.searchParams.get(key) || "")
                      .toLowerCase()
                      .replace(/[^a-z0-9_\/-]+/g, "_")
                      .replace(/^_+|_+$/g, "")
                      .slice(0, 120);
                    if (value) safeParams.set(key, value);
                  });
                  var query = safeParams.toString();
                  return {
                    location: url.origin + url.pathname + (query ? "?" + query : ""),
                    path: url.pathname + (query ? "?" + query : "")
                  };
                } catch (_) {
                  return { location: window.location.origin + "/", path: "/" };
                }
              }

              function sendPageView() {
                var safePage = safeAnalyticsLocation(window.location.href);
                trackEvent("page_view", {
                  page_title: document.title,
                  page_location: safePage.location,
                  page_path: safePage.path
                });
                maybeTrackCalculatorView();
              }

              // Calculator instrumentation — the funnel needs to see tool usage
              // as a first-class step, not just a generic page_view. Fires
              // view_calculator on entry to any /tools/* page (SPA-safe, once
              // per calculator view) and calculator_engagement on the first
              // input/change inside that page's form.
              var lastCalculatorViewPath = null;
              var calculatorEngagedPath = null;

              function calculatorNameForPath(pathname) {
                var path = normalizedPath(pathname);
                if (path.indexOf("/tools/") !== 0) {
                  return null;
                }
                return slugFromPath(path).replace(/-/g, "_");
              }

              function maybeTrackCalculatorView() {
                var path = normalizedPath(window.location.pathname);
                var name = calculatorNameForPath(path);
                if (!name || lastCalculatorViewPath === path) {
                  return;
                }
                lastCalculatorViewPath = path;
                trackEvent("view_calculator", {
                  calculator_name: name,
                  calculator_path: path
                });
              }

              function maybeTrackCalculatorEngagement(event) {
                var path = normalizedPath(window.location.pathname);
                var name = calculatorNameForPath(path);
                if (!name || calculatorEngagedPath === path) {
                  return;
                }
                var target = event.target;
                if (!target || !target.closest || !target.closest("form")) {
                  return;
                }
                calculatorEngagedPath = path;
                trackEvent("calculator_engagement", {
                  calculator_name: name,
                  calculator_path: path,
                  field_name: target.name || target.id || "unknown"
                });
              }

              /* ─────────────────────────────────────────────────────────
                 Cross-brand analytics contract.
                 ~/.claude/durable/ANALYTICS_CONTRACT.md

                 DUAL EMIT. GA4 key events on property 538698079 are keyed to
                 this site's LEGACY names (apply_form_qualified_submit_attempt,
                 booking_started, application_submitted, calendar_booking_click,
                 qualify_lead, close_convert_lead, site_application_submitted,
                 purchase — read live from the Admin API 2026-09-19). Renaming
                 one in place would silently zero a configured conversion, so
                 the legacy leg is sent EXACTLY as before and the contract leg
                 is sent alongside it under a DIFFERENT name. Nothing is
                 double-counted: a mapping marked "mirror" is a legacy name
                 whose contract event another name already emitted for the very
                 same interaction.
                 ───────────────────────────────────────────────────────── */
              var CONTRACT_MAP = ${contractMapJson};
              var CONTRACT_BRAND = ${brandJson};
              var CLICKISH = {
                cta_click: 1, outbound_click: 1, contact_click: 1,
                item_click: 1, share_click: 1
              };
              var CONTRACT_EVENT_NAMES = {
                page_view: 1, section_view: 1, scroll_depth: 1, page_dwell: 1,
                cta_click: 1, outbound_click: 1, contact_click: 1, form_start: 1,
                form_step: 1, form_error: 1, form_submit: 1, lead: 1,
                media_play: 1, search: 1, filter_apply: 1, item_view: 1,
                item_click: 1, share_click: 1, experiment_exposure: 1,
                error_shown: 1
              };

              /* The closed page_type set of the contract. Deliberately NOT the
                 site's own page_type (application_form, standard_page…), which
                 keeps flowing on the legacy leg so existing reports hold. */
              function contractPageType(pathname) {
                var path = normalizedPath(pathname);
                if (path === "/") return "home";
                if (startsWithSegment(path, "/privacy") || startsWithSegment(path, "/terms") ||
                    startsWithSegment(path, "/legal") || startsWithSegment(path, "/disclaimer") ||
                    startsWithSegment(path, "/accessibility")) return "legal";
                if (startsWithSegment(path, "/apply") || startsWithSegment(path, "/contact")) return "form";
                var hubs = ["/blog", "/science", "/guides", "/resources", "/vs", "/for", "/nutrition", "/tools"];
                if (hubs.indexOf(path) !== -1) return "listing";
                if (path.indexOf("/blog/") === 0 || path.indexOf("/science/") === 0 ||
                    path.indexOf("/guides/") === 0 || path.indexOf("/resources/") === 0) return "blog";
                if (startsWithSegment(path, "/locations")) return "location";
                if (path.split("/").filter(Boolean).length >= 1 &&
                    (path.indexOf("/vs/") === 0 || path.indexOf("/for/") === 0 ||
                     path.indexOf("/nutrition/") === 0 || path.indexOf("/tools/") === 0)) return "service";
                if (path.split("/").filter(Boolean).length === 1) return "service";
                return "other";
              }

              function startsWithSegment(path, prefix) {
                return path === prefix || path.indexOf(prefix + "/") === 0;
              }

              /* The shared parameter block, injected from ONE place. */
              function contractSharedBlock() {
                return {
                  brand: CONTRACT_BRAND,
                  locale: (document.documentElement.lang || "en").slice(0, 5).toLowerCase(),
                  variant: "control"
                };
              }

              /* Tell the shared delegated layer this click is already measured.
                 Seven of this site's legacy names normalise to cta_click, so
                 without a claim the delegated layer would emit a SECOND
                 cta_click for the very same click. */
              function claimInteraction() {
                try {
                  if (window.Analytics && typeof window.Analytics.claim === "function") {
                    window.Analytics.claim(400);
                  }
                } catch (_) { /* analytics must never break the page */ }
              }

              function contractPayloadFor(mapping, basePayload) {
                var out = Object.assign({}, basePayload);
                if (mapping.rename) {
                  Object.keys(mapping.rename).forEach(function (from) {
                    if (out[from] !== undefined) out[mapping.rename[from]] = out[from];
                  });
                }
                Object.assign(out, mapping.params || {});
                // The contract page_type overrides the site's own value on the
                // contract leg only.
                out.page_type = contractPageType(window.location.pathname);
                return out;
              }

              // A controlled test run must not leave a single event that looks
              // live. The stamp used to be applied per call inside the apply
              // form, so anything emitted from anywhere else — the brand
              // moment, a section view, a button — arrived unmarked, and one
              // unmarked event is indistinguishable from a real submission in
              // the reports. It goes on every event, from the one writer, and
              // survives the navigation to /apply/book where the URL no longer
              // carries the parameter.
              function testRunStamp() {
                try {
                  var fromUrl = new URLSearchParams(window.location.search).get("test_run_id");
                  if (fromUrl) { window.sessionStorage.setItem("geebs:test_run_id", fromUrl); }
                  var runId = fromUrl || window.sessionStorage.getItem("geebs:test_run_id");
                  return runId ? { submission_mode: "test", test_run_id: runId } : {};
                } catch (e) {
                  return {};   // blocked storage must never break measurement
                }
              }

              function trackEvent(eventName, params) {
                if (geebsAnalyticsOptedOut) {
                  return;
                }
                var safePage = safeAnalyticsLocation(window.location.href);
                var payload = Object.assign({
                  send_to: ${measurementId},
                  transport_type: "beacon",
                  page_title: document.title,
                  page_location: safePage.location,
                  page_path: safePage.path
                }, pageContextForPath(window.location.pathname), contractSharedBlock(), params || {}, testRunStamp());

                var mapping = CONTRACT_MAP[eventName];
                if (mapping && CLICKISH[mapping.event]) claimInteraction();

                // An event that ALREADY carries a contract name (page_view) has
                // no second leg to carry the contract page_type, so it takes it
                // directly. The site's own richer value is preserved beside it
                // rather than dropped, so existing reports keep their dimension.
                if (!mapping && CONTRACT_EVENT_NAMES[eventName]) {
                  payload.site_page_type = payload.page_type;
                  payload.page_type = contractPageType(window.location.pathname);
                }

                // Legacy leg — byte-for-byte the event GA4's key events count.
                gtag("event", eventName, payload);

                // Contract leg — a DIFFERENT name, so no counter is written twice.
                if (mapping && !mapping.mirror && mapping.event !== eventName) {
                  gtag("event", mapping.event, contractPayloadFor(mapping, payload));
                }
              }

              window.geebsTrackEvent = trackEvent;

              // Calendly booking listener -> book_appointment, whose contract leg
              // is lead (form_id=calendly, lead_type=booking). Registered here,
              // straight after the writer exists, not at the bottom of this
              // ~1,200-line block: anything that throws between here and there
              // would silently take the only booking signal with it.
              // The booking page's calendar host carries the application's
              // first-touch attribution (utm + entry path, no identity) so the
              // booking lead can be split by where the person came from, not
              // only by the session GA4 happened to stitch it to.
              var geebsBookingTracked = false;
              window.addEventListener("message", function (e) {
                if (e.origin !== "https://calendly.com") return;
                if (!e.data || e.data.event !== "calendly.event_scheduled") return;
                if (geebsBookingTracked) return;
                geebsBookingTracked = true;
                var bookingParams = { appointment_type: "strategy_call" };
                try {
                  var bookingHost = document.querySelector("[data-calendly-inline]");
                  var bookingData = (bookingHost && bookingHost.dataset) || {};
                  [
                    ["selectedPackage", "selected_package"],
                    ["utmSource", "utm_source"],
                    ["utmMedium", "utm_medium"],
                    ["utmCampaign", "utm_campaign"],
                    ["landingPath", "landing_path"]
                  ].forEach(function (pair) {
                    var value = String(bookingData[pair[0]] || "").slice(0, 120);
                    if (value) bookingParams[pair[1]] = value;
                  });
                } catch (bookingContextError) { /* the booking still counts */ }
                trackEvent("book_appointment", bookingParams);
              });

              // Flush anything emitted before this point — the intro fires on
              // mount, ahead of this afterInteractive script, and those events
              // were being dropped (0 brand_moment_shown vs 337 complete over
              // 28 days, measured 2026-09-27). The queue is drained once and
              // replaced with a direct passthrough so nothing double-fires.
              try {
                var queued = window.__geebsEventQueue || [];
                window.__geebsEventQueue = { push: function (item) { trackEvent(item[0], item[1]); } };
                for (var qi = 0; qi < queued.length; qi++) {
                  trackEvent(queued[qi][0], queued[qi][1]);
                }
              } catch (e) { /* never break the page for a flush */ }

              function normalizedPath(pathname) {
                var path = pathname || "/";
                path = path.replace(/\\/+$/, "");
                return path || "/";
              }

              function surfaceForPath(pathname) {
                var path = normalizedPath(pathname);
                if (path === "/blog" || path.indexOf("/blog/") === 0) return "blog";
                if (path === "/science/questions" || path.indexOf("/science/questions/") === 0) return "science-question";
                if (path === "/science/studies" || path.indexOf("/science/studies/") === 0) return "science-study";
                if (path === "/science/weekly-digest" || path.indexOf("/science/weekly-digest/") === 0) return "science-digest";
                if (path === "/science" || path.indexOf("/science/") === 0) return "science-topic";
                if (path === "/vs" || path.indexOf("/vs/") === 0) return "vs";
                if (path === "/locations" || path.indexOf("/locations/") === 0) return "locations";
                if (path === "/nutrition" || path.indexOf("/nutrition/") === 0) return "nutrition";
                if (path === "/for" || path.indexOf("/for/") === 0) return "for";
                if (path === "/guides" || path.indexOf("/guides/") === 0) return "guides";
                if (path === "/resources" || path.indexOf("/resources/") === 0) return "resources";
                return "other";
              }

              function slugFromPath(pathname) {
                var path = normalizedPath(pathname);
                var parts = path.split("/").filter(Boolean);
                return parts[parts.length - 1] || "home";
              }

              function audienceSegmentForPath(pathname) {
                var path = normalizedPath(pathname);
                var slug = slugFromPath(path);

                if (path.indexOf("/for/") === 0) {
                  return slug.replace(/-/g, "_");
                }

                if (path.indexOf("software-engineer") !== -1 || path.indexOf("desk") !== -1 || path.indexOf("sitting") !== -1) {
                  return "desk_workers";
                }

                if (path.indexOf("executive") !== -1 || path.indexOf("founder") !== -1 || path.indexOf("work-week") !== -1 || path.indexOf("client-dinners") !== -1) {
                  return "busy_professionals";
                }

                if (path.indexOf("remote-workers") !== -1 || path.indexOf("working-from-home") !== -1) {
                  return "remote_workers";
                }

                if (path.indexOf("denver") !== -1 || path.indexOf("personal-training") !== -1) {
                  return "local_denver";
                }

                return "men_25_40";
              }

              function contentTopicForPath(pathname) {
                var path = normalizedPath(pathname);
                var slug = slugFromPath(path);

                if (path === "/apply") return "application";
                if (path === "/results") return "client_results";
                if (path === "/about") return "coach_trust";
                if (path === "/faq") return "objection_handling";
                if (path === "/methodology") return "coaching_process";
                if (path === "/personal-training-denver") return "local_personal_training";
                if (path.indexOf("/vs/") === 0) return "comparison_" + slug.replace(/-/g, "_");
                if (path.indexOf("/for/") === 0) return "audience_" + slug.replace(/-/g, "_");
                if (path.indexOf("/tools/") === 0) return "calculator_" + slug.replace(/-/g, "_");
                if (path.indexOf("/resources/") === 0) return "resource_" + slug.replace(/-/g, "_");

                if (path.indexOf("/blog/") === 0) {
                  if (slug.indexOf("protein") !== -1 || slug.indexOf("client-dinners") !== -1 || slug.indexOf("calorie") !== -1) return "nutrition";
                  if (slug.indexOf("belly-fat") !== -1 || slug.indexOf("dad-bod") !== -1 || slug.indexOf("skinny-fat") !== -1 || slug.indexOf("body-recomposition") !== -1) return "fat_loss_recomposition";
                  if (slug.indexOf("muscle") !== -1 || slug.indexOf("progressive-overload") !== -1 || slug.indexOf("training-hard") !== -1 || slug.indexOf("strength") !== -1) return "strength_muscle";
                  if (slug.indexOf("consistent") !== -1 || slug.indexOf("consistency") !== -1 || slug.indexOf("morning-routine") !== -1 || slug.indexOf("getting-back") !== -1 || slug.indexOf("stay-fit") !== -1) return "consistency";
                  if (slug.indexOf("software-engineer") !== -1 || slug.indexOf("desk") !== -1 || slug.indexOf("sitting") !== -1 || slug.indexOf("standing-desk") !== -1) return "desk_worker_fitness";
                  if (slug.indexOf("travel") !== -1) return "travel_fitness";
                  if (slug.indexOf("gym-anxiety") !== -1) return "gym_confidence";
                  if (slug.indexOf("online-fitness-coaching-worth") !== -1) return "coaching_evaluation";
                  return "fitness_education";
                }

                if (path === "/blog") return "resources";
                if (path === "/") return "online_coaching";
                return "general";
              }

              function pageContextForPath(pathname) {
                var path = normalizedPath(pathname);
                var context = {
                  route_group: "other",
                  page_type: "standard_page",
                  page_intent: "general_browsing",
                  funnel_stage: "awareness",
                  content_topic: contentTopicForPath(path),
                  audience_segment: audienceSegmentForPath(path)
                };

                if (path === "/") {
                  context.route_group = "home";
                  context.page_type = "home";
                  context.page_intent = "core_offer_evaluation";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/apply") {
                  context.route_group = "apply";
                  context.page_type = "application_form";
                  context.page_intent = "apply_for_coaching";
                  context.funnel_stage = "conversion";
                  return context;
                }

                if (path === "/results") {
                  context.route_group = "proof";
                  context.page_type = "results_page";
                  context.page_intent = "validate_results";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/about") {
                  context.route_group = "trust";
                  context.page_type = "coach_about";
                  context.page_intent = "evaluate_coach_fit";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/faq") {
                  context.route_group = "trust";
                  context.page_type = "faq";
                  context.page_intent = "resolve_objections";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/methodology") {
                  context.route_group = "trust";
                  context.page_type = "methodology";
                  context.page_intent = "evaluate_process";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/personal-training-denver") {
                  context.route_group = "local";
                  context.page_type = "local_service_page";
                  context.page_intent = "find_local_training";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path === "/blog") {
                  context.route_group = "resources";
                  context.page_type = "resource_index";
                  context.page_intent = "browse_resources";
                  context.funnel_stage = "awareness";
                  return context;
                }

                if (path.indexOf("/blog/") === 0) {
                  context.route_group = "resources";
                  context.page_type = "education_article";
                  context.page_intent = "solve_fitness_problem";
                  context.funnel_stage = "awareness";
                  return context;
                }

                if (path.indexOf("/tools/") === 0) {
                  context.route_group = "tools";
                  context.page_type = "calculator";
                  context.page_intent = "self_assess";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path.indexOf("/resources/") === 0) {
                  context.route_group = "resources";
                  context.page_type = "resource_guide";
                  context.page_intent = "solve_fitness_problem";
                  context.funnel_stage = "awareness";
                  return context;
                }

                if (path.indexOf("/guides/") === 0) {
                  context.route_group = "resources";
                  context.page_type = "decision_guide";
                  context.page_intent = "evaluate_coach_fit";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path.indexOf("/for/") === 0) {
                  context.route_group = "audience";
                  context.page_type = "audience_landing_page";
                  context.page_intent = "evaluate_persona_fit";
                  context.funnel_stage = "consideration";
                  return context;
                }

                if (path.indexOf("/vs/") === 0) {
                  context.route_group = "comparison";
                  context.page_type = "comparison_page";
                  context.page_intent = "compare_alternatives";
                  context.funnel_stage = "consideration";
                  return context;
                }

                return context;
              }

              function externalTargetIntent(url) {
                if (url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com")) {
                  return { target_route_group: "calendar", target_page_intent: "book_call" };
                }

                if (isOneTimeConsultShopifyCart(url)) {
                  return { target_route_group: "checkout", target_page_intent: "buy_one_time_consult" };
                }

                if (url.hostname === "youtube.com" || url.hostname === "www.youtube.com" || url.hostname === "youtu.be") {
                  return { target_route_group: "video", target_page_intent: "watch_training_video" };
                }

                if (url.hostname === "open.spotify.com") {
                  return { target_route_group: "playlist", target_page_intent: "open_playlist" };
                }

                return { target_route_group: "external", target_page_intent: "external_navigation" };
              }

              function targetIntentForUrl(url) {
                if (url.origin !== window.location.origin) {
                  return externalTargetIntent(url);
                }

                var targetContext = pageContextForPath(url.pathname);
                return {
                  target_route_group: targetContext.route_group,
                  target_page_intent: targetContext.page_intent
                };
              }

              function ctaIntentForUrl(url) {
                if (url.origin === window.location.origin && url.pathname === "/apply") {
                  return "apply_1on1";
                }

                if (isOneTimeConsultShopifyCart(url)) {
                  return "checkout_one_time_consult";
                }

                if (url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com")) {
                  return "book_call";
                }

                if (url.hostname === "youtube.com" || url.hostname === "www.youtube.com" || url.hostname === "youtu.be") {
                  return "watch_training_video";
                }

                if (url.hostname === "open.spotify.com") {
                  return "open_playlist";
                }

                if (url.hostname === "instagram.com" || url.hostname.endsWith(".instagram.com") || url.hostname === "ig.me") {
                  return "dm_instagram";
                }

                return url.origin === window.location.origin ? "internal_navigation" : "external_navigation";
              }

              function textFor(element) {
                return (element.innerText || element.textContent || element.getAttribute("aria-label") || "")
                  .replace(/\\s+/g, " ")
                  .trim()
                  .slice(0, 120);
              }

              function sourceFor(element) {
                var explicit = element.closest("[data-analytics-source]");
                if (explicit) {
                  return explicit.getAttribute("data-analytics-source");
                }

                var section = element.closest("section, header, footer, main");
                if (!section) {
                  return "unknown";
                }

                return section.getAttribute("aria-labelledby") ||
                  section.getAttribute("id") ||
                  section.tagName.toLowerCase();
              }

              function analyticsEventFor(element) {
                var explicit = element.closest("[data-analytics-event]");
                if (!explicit) {
                  return null;
                }

                return explicit.getAttribute("data-analytics-event");
              }

              function analyticsLinkKindFor(element) {
                var explicit = element.closest("[data-analytics-link-kind]");
                if (!explicit) {
                  return "unspecified";
                }

                return explicit.getAttribute("data-analytics-link-kind") || "unspecified";
              }

              function hrefDetails(anchor) {
                var rawHref = anchor.getAttribute("href");
                if (!rawHref) {
                  return null;
                }

                try {
                  return new URL(rawHref, window.location.href);
                } catch (_error) {
                  return null;
                }
              }

              function isOneTimeConsultShopifyCart(url) {
                return url.hostname === "titanforgefit.com" &&
                  url.pathname.indexOf("/cart/54275205234972:1") === 0;
              }

              function oneTimeConsultCheckoutParams(url, params) {
                return Object.assign({
                  product_intent: "consultation_call",
                  item_id: "geebs_one_time_consult",
                  item_name: "Geebs One-Time Consultation",
                  value: 100,
                  currency: "USD"
                }, params);
              }

              function membershipProduct(url) {
                if (url.hostname !== "shop.titanforgefit.com") return null;
                if (url.pathname === "/products/geebs-science-based-community") {
                  return { intent: "science_community_24_99", itemId: "10889353036060", itemName: "Titan Forge Science-Based Community", value: 24.99 };
                }
                return null;
              }

              function communityInterestFormFromEvent(event) {
                var target = event.target;
                if (!target || !target.matches) {
                  return null;
                }

                if (target.matches('form[action="/api/community-interest"]')) {
                  return target;
                }

                return null;
              }

              sendPageView();

              var originalPushState = history.pushState;
              var originalReplaceState = history.replaceState;
              var lastUrl = window.location.href;
              var startedApplyForm = false;
              var startedApplicationFields = new Set();
              var completedApplicationFields = new Set();
              var applicationFieldNames = [
                "name",
                "email",
                "phone",
                "ig_handle",
                "age_18_plus",
                "goal",
                "consistency",
                "monthly_investment",
                "ready_to_commit",
                "context"
              ];
              var requiredApplicationFields = [
                "name",
                "email",
                "phone",
                "age_18_plus",
                "goal",
                "consistency",
                "monthly_investment",
                "ready_to_commit"
              ];

              function handleRouteChange() {
                if (window.location.href === lastUrl) {
                  return;
                }
                lastUrl = window.location.href;
                window.setTimeout(sendPageView, 0);
              }

              history.pushState = function () {
                originalPushState.apply(history, arguments);
                handleRouteChange();
              };

              history.replaceState = function () {
                originalReplaceState.apply(history, arguments);
                handleRouteChange();
              };

              window.addEventListener("popstate", handleRouteChange);

              document.addEventListener("click", function (event) {
                var anchor = event.target && event.target.closest
                  ? event.target.closest("a[href]")
                  : null;

                if (!anchor) {
                  return;
                }

                var url = hrefDetails(anchor);
                if (!url) {
                  return;
                }

                var params = {
                  link_text: textFor(anchor),
                  link_url: safeAnalyticsLocation(url.href).location,
                  click_source: sourceFor(anchor),
                  link_kind: analyticsLinkKindFor(anchor),
                  outbound: url.origin !== window.location.origin,
                  cta_intent: ctaIntentForUrl(url)
                };
                params = Object.assign(params, targetIntentForUrl(url));
                // A button that declares its identity (data-cta) keeps it on
                // the mirrored contract event; without this every /apply click
                // arrived with cta_id "(not set)".
                var ctaHost = anchor.closest("[data-cta]");
                if (ctaHost) {
                  params.cta_id = ctaHost.getAttribute("data-cta");
                  params.cta_text = params.link_text;
                  var ctaHostPosition = ctaHost.getAttribute("data-cta-position");
                  if (ctaHostPosition) params.cta_position = ctaHostPosition;
                }
                // A click inside an A/B surface carries its arm, so the
                // conversion can be split by what the visitor actually saw.
                // Both parameters are registered GA4 custom dimensions.
                var experiment = anchor.closest("[data-analytics-experiment]");
                if (experiment) {
                  params.experiment_id = experiment.getAttribute("data-analytics-experiment");
                  params.variant = experiment.getAttribute("data-analytics-variant") || "unknown";
                }

                var analyticsEvent = analyticsEventFor(anchor);
                if (analyticsEvent === "toc_link_clicked") {
                  var rawPos = anchor.getAttribute("data-analytics-position");
                  var parsedPos = rawPos ? parseInt(rawPos, 10) : undefined;
                  var sectionId = anchor.getAttribute("data-analytics-section-id") ||
                    (url.hash ? url.hash.replace(/^#/, "") : "") ||
                    (anchor.getAttribute("href") || "").replace(/^#/, "");
                  var tocParams = Object.assign({}, params, {
                    section_id: sectionId,
                    position: parsedPos !== undefined && !isNaN(parsedPos) ? parsedPos : (rawPos || 0),
                    surface: surfaceForPath(window.location.pathname)
                  });
                  trackEvent("toc_link_clicked", tocParams);
                } else if (analyticsEvent && analyticsEvent !== "article_cta_click") {
                  trackEvent(analyticsEvent, params);
                }

                var articleScope = anchor.closest(".article-scope");
                var isExplicitArticleCta = anchor.closest("[data-analytics-article-cta]") !== null ||
                                          analyticsEvent === "article_cta_click";
                var isButtonCta = Boolean(anchor.classList && (
                  anchor.classList.contains("btn") ||
                  anchor.classList.contains("btn-primary") ||
                  anchor.classList.contains("btn-secondary")
                ));

                if (articleScope && (isExplicitArticleCta || isButtonCta)) {
                  var headerEl = anchor.closest("header");
                  var explicitCta = anchor.closest("[data-analytics-article-cta]");
                  var ctaPos = explicitCta
                    ? explicitCta.getAttribute("data-analytics-article-cta")
                    : (headerEl ? "header" : "footer");
                  var rawHref = anchor.getAttribute("href") || "";
                  var articleCtaParams = Object.assign({}, params, {
                    surface: surfaceForPath(window.location.pathname),
                    position: ctaPos,
                    href: rawHref
                  });
                  trackEvent("article_cta_click", articleCtaParams);
                }

                if (url.origin === window.location.origin && url.pathname === "/apply") {
                  trackEvent("apply_cta_clicked", params);
                }

                if (isOneTimeConsultShopifyCart(url)) {
                  var consultParams = oneTimeConsultCheckoutParams(url, params);
                  trackEvent("consult_checkout_click", consultParams);
                  trackEvent("begin_checkout", {
                    currency: "USD",
                    value: 100,
                    items: [{
                      item_id: "geebs_one_time_consult",
                      item_name: "Geebs One-Time Consultation",
                      price: 100,
                      quantity: 1
                    }],
                    product_intent: "consultation_call"
                  });
                  return;
                }

                var membership = membershipProduct(url);
                if (membership) {
                  var membershipParams = Object.assign({
                    product_intent: membership.intent,
                    item_id: membership.itemId,
                    item_name: membership.itemName,
                    value: membership.value,
                    currency: "USD"
                  }, params);
                  trackEvent("membership_checkout_click", membershipParams);
                  trackEvent("begin_checkout", {
                    currency: "USD",
                    value: membership.value,
                    items: [{
                      item_id: membership.itemId,
                      item_name: membership.itemName,
                      price: membership.value,
                      quantity: 1
                    }],
                    product_intent: membership.intent
                  });
                  return;
                }

                if (url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com")) {
                  trackEvent("calendly_link_clicked", params);
                  // Canonical funnel event (GA4 event spec): outbound click to
                  // Calendly. Mirrors calendly_link_clicked under the spec name.
                  trackEvent("outbound_calendly", params);
                  return;
                }

                if (url.hostname === "youtube.com" || url.hostname === "www.youtube.com" || url.hostname === "youtu.be") {
                  trackEvent("training_video_click", params);
                }

                if (url.hostname === "open.spotify.com") {
                  trackEvent("spotify_playlist_click", params);
                }

                if (params.cta_intent === "dm_instagram") {
                  // form_id is REQUIRED on the contract lead event; this lead
                  // arrives through the Instagram DM keyword, not a page form.
                  trackEvent("generate_lead", Object.assign({
                    form_id: "instagram_dm",
                    lead_type: "dm_keyword"
                  }, params));
                }
              }, true);

              function formFromEvent(event) {
                var target = event.target;
                if (!target || !target.closest) {
                  return null;
                }

                return target.closest('form[data-analytics-form="apply"]');
              }

              function selectedValue(form, name) {
                var checked = form.querySelector('[name="' + name + '"]:checked');
                if (checked) {
                  return checked.value;
                }

                var field = form.elements[name];
                if (!field) {
                  return "";
                }

                if (field instanceof RadioNodeList) {
                  return field.value || "";
                }

                if (field.type === "checkbox" || field.type === "radio") {
                  return field.checked ? field.value : "";
                }

                return field.value ? field.value : "";
              }

              function applicationParams(form) {
                var monthlyInvestment = selectedValue(form, "monthly_investment");
                var readyToCommit = selectedValue(form, "ready_to_commit");
                var age18Plus = selectedValue(form, "age_18_plus");
                var isDisqualified = age18Plus !== "yes" ||
                  monthlyInvestment !== ${JSON.stringify(BAND_AT_OR_ABOVE_FLOOR)} ||
                  readyToCommit !== "yes";

                return {
                  form_id: "apply",
                  form_name: "1:1 coaching application",
                  apply_step: form.getAttribute("data-apply-step") || "",
                  apply_step_content: form.getAttribute("data-apply-step-content") || "",
                  application_outcome: isDisqualified ? "downsell" : "qualified"
                };
              }

              function hasRequiredApplicationFields(form) {
                return form.checkValidity() && missingRequiredApplicationFields(form).length === 0;
              }

              function missingRequiredApplicationFields(form) {
                return requiredApplicationFields.filter(function (name) {
                  return !isApplicationFieldComplete(form, name);
                });
              }

              function missingStepRequiredFields(form) {
                var required = Array.prototype.slice.call(
                  form.querySelectorAll("[required]")
                );
                return required
                  .map(function (field) {
                    return field.name || field.id || "unknown";
                  })
                  .filter(function (name, index, names) {
                    return names.indexOf(name) === index && !isApplicationFieldComplete(form, name);
                  });
              }

              function isFinalApplyStep(form) {
                return form.getAttribute("data-apply-final-step") === "true" ||
                  form.getAttribute("data-apply-step-content") === "investment";
              }

              function isApplicationFieldComplete(form, name) {
                var value = selectedValue(form, name).trim();

                if (!value) {
                  return false;
                }

                if (name === "email") {
                  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
                }

                if (name === "phone") {
                  return value.replace(/\\D/g, "").length >= 7;
                }

                if (name === "age_18_plus") {
                  return value === "yes";
                }

                if (name === "name") {
                  return value.length >= 2;
                }

                return true;
              }

              function applicationFieldFromEvent(event) {
                var form = formFromEvent(event);
                var target = event.target;
                if (!form || !target || !target.name) {
                  return null;
                }

                if (applicationFieldNames.indexOf(target.name) === -1) {
                  return null;
                }

                return {
                  form: form,
                  name: target.name
                };
              }

              function applicationFieldParams(name) {
                return {
                  form_id: "apply",
                  form_name: "1:1 coaching application",
                  field_name: name,
                  field_order: String(applicationFieldNames.indexOf(name) + 1),
                  field_required: requiredApplicationFields.indexOf(name) !== -1 ? "yes" : "no"
                };
              }

              function handleFormStart(event) {
                var form = formFromEvent(event);
                if (!form || startedApplyForm) {
                  return;
                }

                var hasCalendarPick = false;
                try {
                  hasCalendarPick = Boolean(
                    window.sessionStorage.getItem("geebs_calendar_pick") ||
                    new URLSearchParams(window.location.search).get("pick")
                  );
                } catch (e) {}

                var startParams = {
                  form_id: "apply",
                  form_name: "1:1 coaching application"
                };
                if (hasCalendarPick) {
                  startParams.calendar_pick = "true";
                }

                startedApplyForm = true;
                trackEvent("application_started", startParams);
                // Canonical funnel event (GA4 event spec): first apply-form
                // interaction. Mirrors application_started under the spec name.
                trackEvent("start_apply", startParams);
              }

              function handleApplicationFieldProgress(event) {
                var field = applicationFieldFromEvent(event);
                if (!field) {
                  return;
                }

                if (!startedApplicationFields.has(field.name)) {
                  startedApplicationFields.add(field.name);
                  trackEvent("form_field_started", applicationFieldParams(field.name));
                }

                if (
                  !completedApplicationFields.has(field.name) &&
                  isApplicationFieldComplete(field.form, field.name)
                ) {
                  completedApplicationFields.add(field.name);
                  trackEvent("form_field_completed", applicationFieldParams(field.name));
                }
              }

              function handleApplicationFieldInvalid(event) {
                var field = applicationFieldFromEvent(event);
                if (!field) {
                  return;
                }
                trackEvent("form_field_invalid", applicationFieldParams(field.name));
              }

              document.addEventListener("input", handleFormStart, true);
              document.addEventListener("change", handleFormStart, true);
              document.addEventListener("input", handleApplicationFieldProgress, true);
              document.addEventListener("change", handleApplicationFieldProgress, true);
              document.addEventListener("invalid", handleApplicationFieldInvalid, true);
              document.addEventListener("input", maybeTrackCalculatorEngagement, true);
              document.addEventListener("change", maybeTrackCalculatorEngagement, true);

              document.addEventListener("submit", function (event) {
                var communityForm = communityInterestFormFromEvent(event);
                if (communityForm) {
                  trackEvent("community_interest_submit", {
                    product_intent: "app_community",
                    value: 25,
                    currency: "USD",
                    form_id: "community_interest",
                    form_name: "Science-Based Community interest"
                  });
                  return;
                }

                var form = event.target && event.target.matches && event.target.matches('form[data-analytics-form="apply"]')
                  ? event.target
                  : null;

                if (!form) {
                  return;
                }

                var params = applicationParams(form);
                var stepMissingFields = missingStepRequiredFields(form);
                var stepHasRequiredFields = stepMissingFields.length === 0 && form.checkValidity();

                if (!isFinalApplyStep(form)) {
                  trackEvent("apply_step_continue", Object.assign({
                    has_step_required_fields: stepHasRequiredFields ? "yes" : "no",
                    missing_step_fields: stepMissingFields.join(",")
                  }, params));

                  if (!stepHasRequiredFields) {
                    trackEvent("apply_step_continue_incomplete", Object.assign({
                      missing_step_fields: stepMissingFields.join(",")
                    }, params));
                  }
                  return;
                }

                var missingRequiredFields = missingRequiredApplicationFields(form);
                var hasRequiredFields = hasRequiredApplicationFields(form);
                trackEvent("apply_form_submit_attempt", Object.assign({
                  has_required_fields: hasRequiredFields ? "yes" : "no",
                  missing_required_fields: missingRequiredFields.join(",")
                }, params));

                if (!hasRequiredFields) {
                  trackEvent("apply_form_submit_incomplete", Object.assign({
                    missing_required_fields: missingRequiredFields.join(",")
                  }, params));
                  return;
                }

                if (params.application_outcome === "qualified") {
                  // No lead here. This is a client-side ATTEMPT; the lead is the
                  // server-confirmed application_submitted (contract leg: lead,
                  // lead_type=apply). Emitting generate_lead here as well wrote
                  // two leads for every qualified application — GA4 538698079,
                  // 2026-09-09..10-07: 8 lead events, 4 real applications.
                  trackEvent("apply_form_qualified_submit_attempt", params);
                  return;
                }

                trackEvent("apply_form_downsell_submit_attempt", params);
              }, true);

              // Fires once when the /apply form first enters the viewport.
              // This separates "reached /apply but never saw the form" from
              // "saw the form but did not start it."
              (function () {
                var impressionFired = false;

                function fireApplyFormImpression() {
                  if (impressionFired) {
                    return;
                  }
                  impressionFired = true;
                  trackEvent("apply_form_impression", {
                    form_id: "apply",
                    form_name: "1:1 coaching application"
                  });
                }

                function observeForm(form) {
                  if (!("IntersectionObserver" in window)) {
                    fireApplyFormImpression();
                    return;
                  }

                  var observer = new IntersectionObserver(function (entries) {
                    for (var i = 0; i < entries.length; i++) {
                      if (entries[i].isIntersecting) {
                        fireApplyFormImpression();
                        observer.disconnect();
                        return;
                      }
                    }
                  }, { threshold: 0 });

                  observer.observe(form);
                }

                function findApplyForm() {
                  return document.querySelector('form[data-analytics-form="apply"]');
                }

                function initApplyFormImpression() {
                  if (impressionFired) {
                    return;
                  }

                  var form = findApplyForm();
                  if (form) {
                    observeForm(form);
                    return;
                  }

                  if (!("MutationObserver" in window)) {
                    return;
                  }

                  var mutationObserver = new MutationObserver(function () {
                    var found = findApplyForm();
                    if (found) {
                      mutationObserver.disconnect();
                      observeForm(found);
                    }
                  });

                  mutationObserver.observe(document.documentElement, {
                    childList: true,
                    subtree: true
                  });
                }

                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", initApplyFormImpression);
                } else {
                  initApplyFormImpression();
                }
              })();

              /* ─────────────────────────────────────────────────────────
                 ONE SCROLL MECHANISM, and it is the shared delegated layer.

                 Retired here: apply_page_scroll (/apply), blog_page_scroll
                 (/blog/*) and the scroll half of the commercial block
                 (commercial_scroll_depth). Three emitters, three vocabularies,
                 one visitor action. Measured on property 538698079 on
                 2026-10-13: /apply reported apply_page_scroll(25) = 3 events /
                 3 users AND commercial_scroll_depth(25) = 3 events / 3 users —
                 identical counts, so one scroll was being written twice under
                 two names, while /packages (63 events), /results (16) and
                 /geebs-method (22) had no readable depth at all.

                 Safe to retire: the Admin API keyEvents list on 2026-10-13 is
                 application_submitted, apply_form_qualified_submit_attempt,
                 booking_started, calendar_booking_click, generate_lead, lead,
                 purchase, site_application_submitted. No scroll event is a
                 configured key event, so removing these emitters zeroes no
                 conversion. A key event is configured BY NAME — check this list
                 again before retiring any other emitter.

                 The shared layer (public/analytics/track.js) already fires on
                 EVERY route, which is why /packages and /results had
                 scroll_depth rows at all; it just carried the number as
                 "percent", a dimension this property never registered. It now
                 carries percent_scrolled too, so the single mechanism covers
                 /packages, /results, /geebs-method and /apply with the same
                 25/50/75/90 buckets the commercial curve used.
                 ───────────────────────────────────────────────────────── */

              // Commercial-route telemetry is deliberately aggregate: active
              // time, scroll milestones, and named DOM sections. It never reads
              // text inputs, query strings, or a visitor identifier.
              (function () {
                // Scroll milestones are NOT here any more — the shared
                // delegated layer owns scroll_depth on every route. Dwell and
                // named sections stay, because nothing else emits them.
                var activeMilestones = [15, 30, 60, 120, 180];
                var routePath = null;
                var seenSections = {};
                var seenDwell = {};
                var activeSeconds = 0;
                var formAbandoned = false;
                var lastInteractedForm = null;

                function isCommercialPath(path) {
                  // A live GA4 read found /tools/body-recomposition-calculator taking
                  // 145 views at 57.8s average engagement with no scroll signal at
                  // all — the page holding attention longest was the one we could
                  // say least about. Guides, audience pages, comparisons and the
                  // homepage had the same hole, so every route a visitor can land
                  // on now reports depth and dwell.
                  return path === "/" || path === "/apply" || path === "/apply/book" ||
                    path === "/supplements" || path === "/science" ||
                    path.indexOf("/science/") === 0 || path.indexOf("/resources/") === 0 ||
                    path.indexOf("/tools/") === 0 || path.indexOf("/guides/") === 0 ||
                    path.indexOf("/for/") === 0 || path.indexOf("/vs/") === 0 ||
                    path.indexOf("/blog/") === 0 || path === "/blog";
                }

                function resetForRoute(path) {
                  if (routePath === path) return;
                  routePath = path;
                  seenSections = {};
                  seenDwell = {};
                  activeSeconds = 0;
                  formAbandoned = false;
                  lastInteractedForm = null;
                  observeSections();
                }

                function safeSectionName(section, index) {
                  var raw = section.getAttribute("data-analytics-section") ||
                    section.getAttribute("id") || section.getAttribute("aria-labelledby") ||
                    "section_" + String(index + 1);
                  return String(raw).toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "section";
                }

                function observeSections() {
                  if (!isCommercialPath(window.location.pathname) || !("IntersectionObserver" in window)) return;
                  var sections = document.querySelectorAll("main section, main article");
                  var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                      if (!entry.isIntersecting) return;
                      var name = entry.target.getAttribute("data-geebs-section-name");
                      if (!name || seenSections[name]) return;
                      seenSections[name] = true;
                      trackEvent("commercial_section_view", { section_name: name });
                    });
                  }, { threshold: 0.35 });
                  Array.prototype.forEach.call(sections, function (section, index) {
                    var name = safeSectionName(section, index);
                    section.setAttribute("data-geebs-section-name", name);
                    observer.observe(section);
                  });
                }

                // Route bookkeeping only. This used to also emit
                // commercial_scroll_depth; scroll_depth from the shared layer
                // replaced it. Kept as a listener target so a client-side
                // route change still re-observes sections without waiting for
                // the next dwell tick.
                function evaluateRoute() {
                  var path = window.location.pathname;
                  if (!isCommercialPath(path)) return;
                  resetForRoute(path);
                }

                function trackActiveDwell() {
                  var path = window.location.pathname;
                  if (!isCommercialPath(path)) return;
                  resetForRoute(path);
                  if (document.visibilityState !== "visible" || !document.hasFocus()) return;
                  activeSeconds += 1;
                  activeMilestones.forEach(function (milestone) {
                    if (activeSeconds >= milestone && !seenDwell[milestone]) {
                      seenDwell[milestone] = true;
                      trackEvent("commercial_active_dwell", { active_seconds: milestone });
                    }
                  });
                }

                function rememberForm(event) {
                  var target = event.target;
                  var form = target && target.closest ? target.closest("form[data-analytics-form]") : null;
                  if (form) lastInteractedForm = form;
                }

                function emitAbandon() {
                  if (formAbandoned || !lastInteractedForm || document.visibilityState === "visible") return;
                  formAbandoned = true;
                  trackEvent("form_abandoned", {
                    form_id: lastInteractedForm.getAttribute("data-analytics-form") || "unknown",
                    form_name: lastInteractedForm.getAttribute("data-analytics-form-name") || "unknown"
                  });
                }

                window.addEventListener("popstate", function () { window.setTimeout(evaluateRoute, 0); });
                document.addEventListener("input", rememberForm, true);
                document.addEventListener("change", rememberForm, true);
                document.addEventListener("visibilitychange", emitAbandon);
                window.addEventListener("pagehide", emitAbandon);
                window.setInterval(trackActiveDwell, 1000);
                if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", evaluateRoute);
                else evaluateRoute();
              })();

              /* ─────────────────────────────────────────────────────────
                 The shared delegated layer (public/analytics/track.js, vendored
                 from ~/.claude/durable/analytics/track.js). It is what makes
                 section_view, scroll_depth, page_dwell, generic cta_click,
                 outbound_click and contact_click exist on EVERY page instead of
                 only on the handful of routes this file happens to special-case.

                 It writes through trackEvent, so it inherits the DNT opt-out,
                 the URL scrubbing, send_to and the shared block — one emit path
                 for the whole site. Its "disable" list names every event this
                 file already writes, so no counter has two writers.
                 ───────────────────────────────────────────────────────── */
              (function () {
                var attempts = 0;
                function boot() {
                  if (geebsAnalyticsOptedOut) return;
                  if (!window.Analytics || typeof window.Analytics.init !== "function") {
                    if (attempts++ > 100) return;
                    window.setTimeout(boot, 100);
                    return;
                  }
                  window.Analytics.init({
                    brand: CONTRACT_BRAND,
                    locale: (document.documentElement.lang || "en").slice(0, 5).toLowerCase(),
                    variant: "control",
                    pageType: function () { return contractPageType(window.location.pathname); },
                    disable: ${disableJson},
                    sink: function (event, payload) { trackEvent(event, payload); }
                  });
                }
                boot();
              })();

            })();
          `;
}

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  const measurementId = JSON.stringify(GA_MEASUREMENT_ID);

  return (
    <>
      {/* Shared cross-brand delegated layer, vendored by
          `bash ~/.claude/durable/analytics-sync.sh <repo> public/analytics`.
          Do not hand-edit public/analytics/track.js — re-run the sync. */}
      <Script
        id="shared-analytics-track"
        src="/analytics/track.js"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: buildGoogleAnalyticsInlineScript(measurementId),
        }}
      />
    </>
  );
}

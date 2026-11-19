"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import {
  INSTAGRAM_DM_SESSION_KEY,
  isInstagramDmAttribution,
} from "@/lib/companionAttribution";

export type CoachCompanionProps = {
  slug: string;
  title: string;
  shortAnswer?: string;
  takeoverAnswer?: string;
  faqs?: Array<{ q: string; a: string }>;
  topic?: string;
  pageType?: "blog" | "tool" | "site";
};

type CompanionVariant = "control" | "dock" | "takeover";
type SheetTab = "short" | "ask" | "intake";

const HOLDOUT_KEY = "geebs_companion_holdout";
const DM_SEEN_KEY = "geebs_companion_dm_seen";
const BUBBLE_SEEN_KEY = "geebs_companion_bubble_seen";

export default function CoachCompanion({
  slug,
  title,
  shortAnswer = "",
  takeoverAnswer,
  faqs = [],
  topic = "protein",
  pageType = "blog",
}: CoachCompanionProps) {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<CompanionVariant>("dock");
  const [isOpen, setIsOpen] = useState(false);

  // Tell the MobileDock whether the sheet is open, so its first-visit bubble
  // never draws over an open sheet (the DM takeover opens it on its own).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("geebs:companion-state", { detail: { open: isOpen } }),
    );
  }, [isOpen]);
  const [isTakeover, setIsTakeover] = useState(false);
  const dmTopic = topic || "this";
  const firstAnswerSentence =
    shortAnswer.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || shortAnswer;
  const conciseTakeoverAnswer =
    takeoverAnswer ||
    (firstAnswerSentence.split(/\s+/).length <= 24
      ? firstAnswerSentence
      : "Start with the answer on this page, then ask me what fits your goal.");
  const [showBubble, setShowBubble] = useState(false);
  const [activeTab, setActiveTab] = useState<SheetTab>(
    shortAnswer ? "short" : "ask",
  );

  // Protein calculator state
  const isProtein =
    slug.includes("protein") ||
    title.toLowerCase().includes("protein") ||
    dmTopic.toLowerCase().includes("protein");
  const [weightInput, setWeightInput] = useState("");
  const [weightResult, setWeightResult] = useState<number | null>(null);
  const [weightError, setWeightError] = useState("");

  // FAQ state
  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number | null>(null);

  // Intake state (3-tap)
  const [intakeStep, setIntakeStep] = useState<1 | 2 | 3 | 4>(1);
  const [intakeStarted, setIntakeStarted] = useState(false);
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState("");
  const [barrier, setBarrier] = useState("");

  const [, startTransition] = useTransition();

  const handleOpen = useCallback(() => {
    setShowBubble(false);
    setIsOpen(true);
    trackClientEvent("cta_click", {
      cta_id: "companion_dock_open",
      cta_text: "Want the short version?",
      cta_position: "companion_dock",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  }, [pageType, variant]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    trackClientEvent("cta_click", {
      cta_id: "companion_sheet_close",
      cta_text: "Close",
      cta_position: "companion_sheet",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  }, [pageType, variant]);

  useEffect(() => {
    let assignedVariant: CompanionVariant = "dock";
    let isDmFirstTime = false;

    try {
      const isExplicitDm = isInstagramDmAttribution(window.location.search);
      const isDm =
        isExplicitDm ||
        sessionStorage.getItem(INSTAGRAM_DM_SESSION_KEY) === "true";

      // The experiment measures ordinary site discovery. A person who clicked
      // a link Kris sent in Instagram already started a conversation, so the
      // companion is part of the promised handoff and never enters holdout.
      let bucket = localStorage.getItem(HOLDOUT_KEY);
      if (!isDm && !bucket) {
        const isAutomated =
          typeof navigator !== "undefined" && Boolean(navigator.webdriver);
        bucket = !isAutomated && Math.random() < 0.2 ? "control" : "treatment";
        localStorage.setItem(HOLDOUT_KEY, bucket);
      }

      if (!isDm && bucket === "control") {
        assignedVariant = "control";
        // Bucketing reads and writes localStorage, which the server does not
        // have, so it cannot run during render without a hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVariant("control");
        setMounted(true);
        trackClientEvent("experiment_exposure", {
          experiment_id: "coach_companion",
          variant: "control",
          brand: "geebs",
          page_type: pageType,
          locale: "en",
        });
        return;
      }

      // 2. An explicit Instagram DM link always opens the promised handoff.
      // Session-carried attribution opens only once so internal navigation does
      // not keep interrupting the visitor.
      // The DM line names the ARTICLE's topic, never utm_content: the bot's
      // real links carry campaign codes there (e.g. utm_content=booking_decline),
      // which would read "You came from my DMs about booking_decline".

      const dmSeen = sessionStorage.getItem(DM_SEEN_KEY);
      if (isDm && (isExplicitDm || !dmSeen)) {
        isDmFirstTime = true;
        assignedVariant = "takeover";
        sessionStorage.setItem(DM_SEEN_KEY, "true");
        setIsTakeover(true);
        setIsOpen(true);
      } else {
        assignedVariant = "dock";
      }

      setVariant(assignedVariant);

      // 3. Speech bubble check (first view per session)
      const bubbleSeen = sessionStorage.getItem(BUBBLE_SEEN_KEY);
      if (!bubbleSeen && !isDmFirstTime) {
        setShowBubble(true);
        sessionStorage.setItem(BUBBLE_SEEN_KEY, "true");
      }
    } catch {
      assignedVariant = "dock";
      setVariant("dock");
    }

    startTransition(() => {
      setMounted(true);
    });

    trackClientEvent("experiment_exposure", {
      experiment_id: "coach_companion",
      variant: assignedVariant,
      brand: "geebs",
      page_type: pageType,
      locale: "en",
    });
  }, [pageType, topic]);

  // Bubble dismiss timer (~6s)
  useEffect(() => {
    if (!showBubble) return;
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [showBubble]);

  // Listen for mobile dock open-companion event
  useEffect(() => {
    const handleCustomOpen = () => {
      handleOpen();
    };
    window.addEventListener("geebs:open-companion", handleCustomOpen);
    return () =>
      window.removeEventListener("geebs:open-companion", handleCustomOpen);
  }, [handleOpen]);

  // Any control labeled Ask Kris enters conversation mode and dismisses this sheet.
  useEffect(() => {
    const closeForConversation = () => setIsOpen(false);
    window.addEventListener("geebs:close-companion", closeForConversation);
    return () => window.removeEventListener("geebs:close-companion", closeForConversation);
  }, []);

  // Escape key handler to close sheet
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSwitchTab = (tab: SheetTab) => {
    setActiveTab(tab);
    if (tab === "intake" && !intakeStarted) {
      setIntakeStarted(true);
      trackClientEvent("form_start", {
        form_id: "companion_intake",
        brand: "geebs",
        page_type: pageType,
        locale: "en",
        variant,
      });
    }
  };

  const handleConversationOpen = () => {
    handleClose();
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("geebs:open-chat"));
    });
  };

  const handleProteinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput.trim());
    if (isNaN(val) || val < 80 || val > 500) {
      setWeightError("Enter a weight between 80 and 500 lb.");
      setWeightResult(null);
      return;
    }
    setWeightError("");
    setWeightResult(Math.round(0.8 * val));
    trackClientEvent("cta_click", {
      cta_id: "companion_protein_calc",
      cta_text: "Calculate protein",
      cta_position: "companion_sheet",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  };

  const handleFaqClick = (index: number, faqQuestion: string) => {
    setSelectedFaqIndex(selectedFaqIndex === index ? null : index);
    trackClientEvent("cta_click", {
      cta_id: "companion_faq_select",
      cta_text: faqQuestion,
      cta_position: "companion_sheet",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  };

  const handleIntakeChoice = (
    step: 1 | 2 | 3,
    value: string,
    nextStep: 2 | 3 | 4,
  ) => {
    if (!intakeStarted) {
      setIntakeStarted(true);
      trackClientEvent("form_start", {
        form_id: "companion_intake",
        brand: "geebs",
        page_type: pageType,
        locale: "en",
        variant,
      });
    }

    if (step === 1) setGoal(value);
    if (step === 2) setDays(value);
    if (step === 3) setBarrier(value);

    trackClientEvent("form_step", {
      form_id: "companion_intake",
      step: String(step),
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });

    if (nextStep === 4) {
      trackClientEvent("form_submit", {
        form_id: "companion_intake",
        brand: "geebs",
        page_type: pageType,
        locale: "en",
        variant,
      });
    }

    setIntakeStep(nextStep);
  };

  const handleGetCoachedClick = () => {
    trackClientEvent("cta_click", {
      cta_id: "companion_get_coached",
      cta_text: "Get coached",
      cta_position: "companion_intake",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  };

  const handleOpenCalculatorClick = () => {
    trackClientEvent("cta_click", {
      cta_id: "companion_open_calculator",
      cta_text: "Open the macro calculator",
      cta_position: "companion_intake",
      brand: "geebs",
      page_type: pageType,
      locale: "en",
      variant,
    });
  };

  const handleResetIntake = () => {
    setIntakeStep(1);
    setGoal("");
    setDays("");
    setBarrier("");
  };

  // If control holdout or not mounted on client yet, do not render UI
  if (!mounted || variant === "control") {
    return null;
  }

  const applyQueryParams = new URLSearchParams();
  if (goal) applyQueryParams.set("goal", goal);
  if (days) applyQueryParams.set("days", days);
  if (barrier) applyQueryParams.set("barrier", barrier);
  const applyHref = `/apply${applyQueryParams.toString() ? `?${applyQueryParams.toString()}` : ""}`;

  return (
    <>
      {/* 1. DOCK (Desktop Bottom-Right Floating Sprite Button - Hidden on Mobile) */}
      <aside
        data-companion-dock
        aria-label="Coach Companion Dock"
        className="hidden md:flex fixed bottom-5 right-4 md:right-6 lg:right-8 z-40 flex-col items-end pointer-events-auto [padding-right:env(safe-area-inset-right,0px)]"
      >
        {/* Speech Bubble (peeks for ~6s on first visit per session) */}
        {showBubble && !isOpen && (
          <div
            onClick={handleOpen}
            role="status"
            aria-live="polite"
            className="companion-bubble-anim mb-2 mr-1 cursor-pointer rounded-xl border-2 border-[#ea1d2c] bg-[#0b0b0c] px-3.5 py-2 text-[14px] font-semibold text-[#f5f1eb] shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-transform hover:scale-105 active:scale-95"
          >
            <span>Want the short version?</span>
            <span className="ml-1 text-[#ea1d2c]" aria-hidden="true">
              →
            </span>
          </div>
        )}

        {/* Dock Button with 2x Scaled Pixel Sprite */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open coach companion"
          className="group relative flex items-center justify-center rounded-2xl border-[3px] border-[#ea1d2c] bg-[#0b0b0c] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.9)] outline outline-2 outline-black transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ea1d2c] cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/companion/kris-72.png"
            alt="Pixel-art Kris"
            width={38}
            height={72}
            className="companion-sprite-anim h-[72px] w-[38px] object-contain sm:h-[84px] sm:w-[44px] [image-rendering:pixelated] [image-rendering:crisp-edges]"
          />
        </button>
      </aside>

      {/* 2. SHEET (RPG Dialog Box / Bottom Sheet) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 pb-[calc(78px+env(safe-area-inset-bottom,0px))] md:p-6 md:pb-6 md:justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <section
            data-companion-sheet
            role="dialog"
            aria-label="Kris - Coach Companion"
            className="companion-sheet-anim relative z-50 flex max-h-[calc(100dvh-92px-env(safe-area-inset-bottom,0px))] md:max-h-[85vh] w-full max-w-[480px] flex-col rounded-2xl border-[3px] border-[#ea1d2c] bg-[#0b0b0c] text-[#f5f1eb] shadow-[0_20px_50px_rgba(0,0,0,0.95)] outline outline-3 outline-black overflow-hidden"
          >
            {/* Header / RPG Title Bar */}
            <header className="flex items-center justify-between gap-3 border-b border-[#ea1d2c]/30 bg-[#141416] px-3 py-2 sm:px-4">
              <div className="flex min-w-0 items-center gap-3">
                {!isTakeover && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/companion/kris-72.png"
                      alt="2D Kris coach character"
                      width={42}
                      height={80}
                      data-companion-character
                      className="companion-sprite-anim h-[72px] w-[38px] shrink-0 object-contain [image-rendering:pixelated] [image-rendering:crisp-edges] sm:h-[80px] sm:w-[42px]"
                    />
                  </>
                )}
                <div className="flex min-w-0 flex-col gap-0.5 font-mono font-bold uppercase">
                  <span className="text-[15px] tracking-[0.16em] text-[#ffe27a]">
                    KRIS
                  </span>
                  {isTakeover ? (
                    <span className="text-[11px] tracking-wider text-[#ea1d2c] sm:text-[12px]">
                      DIRECT MESSAGE
                    </span>
                  ) : activeTab === "intake" ? (
                    <span className="text-[11px] tracking-wider text-[#ea1d2c] sm:text-[12px]">
                      INTAKE {intakeStep <= 3 ? `(${intakeStep}/3)` : "RESULT"}
                    </span>
                  ) : activeTab === "ask" ? (
                    <span className="text-[11px] tracking-wider text-[#ea1d2c] sm:text-[12px]">
                      ASK ME
                    </span>
                  ) : (
                    <span className="text-[11px] tracking-wider text-mute sm:text-[12px]">
                      SHORT VERSION
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    window.dispatchEvent(new CustomEvent("geebs:open-chat"));
                  }}
                  className="text-[12px] font-mono font-medium text-mute hover:text-[#f5f1eb] underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Message Kris
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-[#1c1c20] font-mono text-[13px] font-bold text-[#f5f1eb] hover:border-[#ea1d2c] hover:text-[#ea1d2c] active:scale-95 cursor-pointer"
                >
                  X
                </button>
              </div>
            </header>

            {/* A DM arrival introduces the actual character before the text.
                The source sprite is deliberately scaled with hard pixels, like
                an RPG reveal, instead of being reduced to a navigation icon. */}
            {isTakeover && (
              <div
                data-companion-character-stage
                className="relative flex min-h-[258px] shrink-0 items-end justify-center overflow-hidden border-b border-[#ea1d2c]/30 bg-[#05060a]"
              >
                <p
                  data-companion-introduction
                  className="companion-bubble-anim absolute left-4 top-4 z-20 max-w-[132px] rounded-xl rounded-bl-sm border border-[#ffe27a]/50 bg-[#141416] px-3 py-2 text-[14px] font-semibold leading-snug text-[#ffe27a] shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
                >
                  I&apos;m Kris. I have your answer.
                </p>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[18%] top-0 h-[225px] bg-[linear-gradient(180deg,rgba(101,139,211,0.62),rgba(33,50,91,0.32)_72%,transparent)] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-5 h-16 w-52 rounded-[50%] bg-[#8ca8dd]/45 shadow-[0_0_55px_rgba(112,150,220,0.45)]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/companion/kris-72.png"
                  alt="2D Kris coach character"
                  width={108}
                  height={204}
                  data-companion-character
                  className="companion-sprite-anim relative z-10 mb-8 h-[192px] w-[101px] object-contain brightness-[1.45] saturate-[1.2] drop-shadow-[0_12px_5px_rgba(0,0,0,0.65)] [image-rendering:pixelated] [image-rendering:crisp-edges] sm:h-[204px] sm:w-[108px]"
                />
                <span className="absolute bottom-2 z-20 rounded-full border border-white/20 bg-[#17181d] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#f5f1eb]">
                  Coach Kris
                </span>
              </div>
            )}

            {/* Navigation Tabs */}
            <nav
              aria-label="Companion sections"
              className="flex border-b border-line bg-[#0e0e11] px-2 pt-2 gap-1 text-[13px] font-semibold"
            >
              {shortAnswer ? (
                <button
                  type="button"
                  onClick={() => handleSwitchTab("short")}
                  className={`flex-1 py-2 px-2 text-center rounded-t-lg transition-colors cursor-pointer ${
                    activeTab === "short"
                      ? "border-t-2 border-x-2 border-[#ea1d2c] bg-[#0b0b0c] text-[#f5f1eb]"
                      : "text-mute hover:text-[#f5f1eb] hover:bg-[#16161a]"
                  }`}
                >
                  Short version
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleConversationOpen}
                className={`flex-1 py-2 px-2 text-center rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === "ask"
                    ? "border-t-2 border-x-2 border-[#ea1d2c] bg-[#0b0b0c] text-[#f5f1eb]"
                    : "text-mute hover:text-[#f5f1eb] hover:bg-[#16161a]"
                }`}
              >
                Ask me
              </button>
              <button
                type="button"
                onClick={() => handleSwitchTab("intake")}
                className={`flex-1 py-2 px-2 text-center rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === "intake"
                    ? "border-t-2 border-x-2 border-[#ea1d2c] bg-[#0b0b0c] text-[#f5f1eb]"
                    : "text-mute hover:text-[#f5f1eb] hover:bg-[#16161a]"
                }`}
              >
                Is coaching for you?
              </button>
            </nav>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-[16px] leading-[1.55] flex flex-col gap-4">
              {/* TAB 1: SHORT VERSION */}
              {activeTab === "short" && (
                <div className="flex flex-col gap-4">
                  {shortAnswer ? (
                    <div className="space-y-3 text-bone/90 text-[16px] leading-relaxed">
                      <p data-companion-short-answer>
                        {isTakeover
                          ? conciseTakeoverAnswer
                          : shortAnswer.split(/\n\s*\n/)[0]}
                      </p>
                      <div>
                        <a
                          href="#quick-answer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                            const target =
                              document.getElementById("quick-answer");
                            if (target) {
                              target.scrollIntoView({ behavior: "smooth" });
                            } else {
                              window.location.hash = "#quick-answer";
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#ea1d2c] hover:underline underline-offset-4 cursor-pointer"
                        >
                          <span>Read the full answer</span>
                          <span aria-hidden="true">↓</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-mute text-[15px]">
                      Read the guide above for the complete breakdown.
                    </p>
                  )}

                  {/* Secondary choices */}
                  <div className="mt-3 pt-4 border-t border-line2 flex flex-col gap-2">
                    <p className="text-[13px] font-mono text-mute uppercase tracking-wider">
                      Next actions
                    </p>
                    <button
                      type="button"
                      onClick={handleConversationOpen}
                      className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3 text-[15px] font-semibold text-[#f5f1eb] hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>Ask me about it</span>
                      <span className="text-[#ea1d2c]" aria-hidden="true">
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchTab("intake")}
                      className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3 text-[15px] font-semibold text-[#f5f1eb] hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>Is coaching for you? (3 questions)</span>
                      <span className="text-[#ea1d2c]" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ASK ME */}
              {activeTab === "ask" && (
                <div className="flex flex-col gap-4">
                  {/* Protein calculator (for protein articles) */}
                  {isProtein && (
                    <div className="rounded-xl border border-[#ea1d2c]/50 bg-[#141418] p-4">
                      <p className="text-[15px] font-semibold text-bone">
                        Want your own number? Tell me what you weigh.
                      </p>
                      <form
                        onSubmit={handleProteinSubmit}
                        className="mt-3 flex gap-2"
                        noValidate
                      >
                        <label htmlFor="companion-lbs" className="sr-only">
                          Weight in pounds
                        </label>
                        <input
                          id="companion-lbs"
                          type="text"
                          inputMode="decimal"
                          value={weightInput}
                          onChange={(e) => {
                            setWeightInput(e.target.value);
                            setWeightError("");
                          }}
                          placeholder="185 lb"
                          className="flex-1 min-w-0 rounded-lg border border-line bg-black px-3 py-2 text-[15px] text-bone placeholder:text-mute focus:border-[#ea1d2c] focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="btn bg-[#ea1d2c] hover:bg-[#d01725] text-white px-4 py-2 font-bold text-[14px] rounded-lg cursor-pointer"
                        >
                          OK
                        </button>
                      </form>
                      {weightError && (
                        <p
                          className="mt-2 text-[13px] text-[#ff8a8a]"
                          role="alert"
                        >
                          {weightError}
                        </p>
                      )}
                      {weightResult !== null && (
                        <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3 text-[15px] text-emerald-200">
                          <p className="font-bold">
                            About {weightResult} g a day.
                          </p>
                          <p className="mt-1 text-[13.5px] text-emerald-300/90">
                            Aim high when you&apos;re in a deficit. It&apos;s
                            what keeps your muscle.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* FAQ List */}
                  {faqs.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-[13px] font-mono text-mute uppercase tracking-wider">
                        Common questions
                      </p>
                      {faqs.map((faq, idx) => {
                        const isExpanded = selectedFaqIndex === idx;
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-line2 bg-[#121215] overflow-hidden transition-colors"
                          >
                            <button
                              type="button"
                              onClick={() => handleFaqClick(idx, faq.q)}
                              className="w-full text-left p-3.5 text-[15px] font-semibold text-bone hover:text-[#ea1d2c] flex items-center justify-between gap-2 cursor-pointer"
                            >
                              <span>{faq.q}</span>
                              <span
                                className="text-mute text-[14px]"
                                aria-hidden="true"
                              >
                                {isExpanded ? "−" : "+"}
                              </span>
                            </button>
                            {isExpanded && (
                              <div className="px-3.5 pb-3.5 pt-1 text-[14.5px] leading-relaxed text-bone/85 border-t border-line">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-mute text-[15px]">
                      No FAQs available for this guide.
                    </p>
                  )}

                  <div className="mt-1 pt-3 border-t border-line2 flex items-center justify-between text-[13.5px] text-mute">
                    <span>Have a direct question?</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleClose();
                        window.dispatchEvent(
                          new CustomEvent("geebs:open-chat"),
                        );
                      }}
                      className="text-[#f5f1eb] font-semibold underline underline-offset-2 hover:text-[#ea1d2c] cursor-pointer transition-colors"
                    >
                      Message Kris →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: INTAKE (3-TAP) */}
              {activeTab === "intake" && (
                <div className="flex flex-col gap-4">
                  {/* STEP 1: GOAL */}
                  {intakeStep === 1 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[16px] font-semibold text-bone">
                        What&apos;s your primary goal for the next 90 days?
                      </p>
                      <div className="flex flex-col gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(1, "fat_loss", 2)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Lose fat
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Drop fat while protecting muscle mass
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleIntakeChoice(1, "muscle_gain", 2)
                          }
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Build muscle
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Add strength and lean muscle
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleIntakeChoice(1, "performance", 2)
                          }
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Recomp / stay lean
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Improve definition without drastic scale changes
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DAYS PER WEEK */}
                  {intakeStep === 2 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[16px] font-semibold text-bone">
                        How many days a week can you train?
                      </p>
                      <div className="flex flex-col gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(2, "2-3", 3)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            2–3 days / week
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            High-efficiency workouts that fit a busy schedule
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(2, "4-5", 3)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            4–5 days / week
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Dedicated training routine
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(2, "6+", 3)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            6+ days / week
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            High-frequency training split
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: WHAT GETS IN THE WAY */}
                  {intakeStep === 3 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[16px] font-semibold text-bone">
                        What usually gets in the way?
                      </p>
                      <div className="flex flex-col gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(3, "time", 4)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Time & busy schedule
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Work, travel, and demanding commitments
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(3, "nutrition", 4)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Consistency & nutrition
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Hitting macros and staying disciplined
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntakeChoice(3, "injuries", 4)}
                          className="w-full text-left rounded-xl border border-[#ea1d2c]/40 bg-[#161619] p-3.5 hover:border-[#ea1d2c] hover:bg-[#202026] transition-colors cursor-pointer"
                        >
                          <p className="font-bold text-bone text-[15px]">
                            Injuries or plateaus
                          </p>
                          <p className="text-[13px] text-mute mt-0.5">
                            Stalled progress or joint aches
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: HONEST RESULT */}
                  {intakeStep === 4 && (
                    <div className="flex flex-col gap-4">
                      <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-950/20 p-4">
                        <p className="font-mono text-[12px] font-bold text-emerald-400 uppercase tracking-wider">
                          Honest recommendation
                        </p>
                        <p className="mt-1 text-[16px] font-bold text-bone">
                          Coaching fits your goals.
                        </p>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-bone/85">
                          1:1 online coaching is built specifically for busy
                          people balancing training with real life. Kris builds
                          your custom plan and does weekly check-ins.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <Link
                          href={applyHref}
                          onClick={handleGetCoachedClick}
                          data-cta="companion_get_coached"
                          className="btn bg-[#ea1d2c] hover:bg-[#d01725] text-white font-bold py-3 px-5 rounded-xl w-full text-center block text-[16px] shadow-lg"
                        >
                          Get coached <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                          href="/tools/macro-calculator"
                          onClick={handleOpenCalculatorClick}
                          data-cta="companion_open_calculator"
                          className="text-center text-[14px] text-mute hover:text-bone underline underline-offset-4 py-2"
                        >
                          Open the macro calculator
                        </Link>

                        <button
                          type="button"
                          onClick={handleResetIntake}
                          className="text-center text-[13px] text-mute2 hover:text-mute font-mono uppercase mt-1 cursor-pointer"
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackClientEvent } from "@/lib/clientAnalytics";
import SeasonalGymBackground, {
  MONTH_SCENES,
  monthScene,
  type SceneMonth,
} from "@/components/SeasonalGymBackground";
import {
  RailConversationScene,
  type RailConversationMessage,
} from "@/vendor/rail-kit";
import {
  hasDedicatedCoachCompanion,
  INSTAGRAM_DM_SESSION_KEY,
  isInstagramDmAttribution,
} from "@/lib/companionAttribution";

// Routes where the page has exactly one job and the launcher competes with it.
// Measured 28d to 2026-09-15 on /apply: 26 chat opens against 8 people starting
// the application, on the one page whose entire purpose IS the application.
// The panel is also a full-height fixed overlay, so opening it hides the form.
const CHAT_SUPPRESSED_PATHS = new Set(["/apply", "/coaching", "/week-plan"]);

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  ctaUrl?: string;
  ctaText?: string;
  quickReplies?: string[];
  sources?: Array<{ title: string; href: string }>;
  groupId?: string;
  isFinalChunk?: boolean;
}

type CharacterMode =
  "idle" | "listening" | "thinking" | "talking" | "celebrating" | "flexing";
type CharacterPose =
  | CharacterMode
  | "flex-double"
  | "flex-side"
  | "flex-most-muscular"
  | "flex-victory"
  | "confident"
  | "excited"
  | "surprised"
  | "concerned"
  | "determined"
  | "proud";

const CHARACTER_POSES: Record<CharacterPose, string> = {
  idle: "/companion/kris-idle-v2.png",
  listening: "/companion/kris-listening-v2.png",
  thinking: "/companion/kris-thinking-v2.png",
  talking: "/companion/kris-talking-v2.png",
  celebrating: "/companion/kris-celebrating-v2.png",
  flexing: "/companion/kris-flexing-v2.png",
  "flex-double": "/companion/kris-flex-double-v3.png",
  "flex-side": "/companion/kris-flex-side-v3.png",
  "flex-most-muscular": "/companion/kris-flex-most-muscular-v3.png",
  "flex-victory": "/companion/kris-flex-victory-v3.png",
  confident: "/companion/kris-confident-v3.png",
  excited: "/companion/kris-excited-v3.png",
  surprised: "/companion/kris-surprised-v3.png",
  concerned: "/companion/kris-concerned-v3.png",
  determined: "/companion/kris-determined-v3.png",
  proud: "/companion/kris-proud-v3.png",
};

type CharacterOutfit =
  | "classic"
  | "tank"
  | "tankRed"
  | "stringerGray"
  | "shirtless";

const CHARACTER_OUTFITS: Array<{
  id: CharacterOutfit;
  label: string;
  shortLabel: string;
}> = [
  { id: "classic", label: "Red shirt", shortLabel: "Shirt" },
  { id: "tank", label: "Black tank", shortLabel: "Tank" },
  { id: "tankRed", label: "Black tank and red shorts", shortLabel: "Red" },
  { id: "stringerGray", label: "Gray stringer", shortLabel: "Gray" },
  { id: "shirtless", label: "Shirtless", shortLabel: "Physique" },
];

const CHARACTER_OUTFIT_STORAGE_KEY = "geebs_chat_character_outfit";

const CHARACTER_POSES_BY_OUTFIT: Record<
  CharacterOutfit,
  Record<CharacterPose, string>
> = {
  classic: CHARACTER_POSES,
  tank: Object.fromEntries(
    (Object.keys(CHARACTER_POSES) as CharacterPose[]).map((pose) => [
      pose,
      `/companion/attires/kris-tank-${pose}.png`,
    ]),
  ) as Record<CharacterPose, string>,
  tankRed: Object.fromEntries(
    (Object.keys(CHARACTER_POSES) as CharacterPose[]).map((pose) => [
      pose,
      `/companion/attires/kris-tank-red-${pose}.png`,
    ]),
  ) as Record<CharacterPose, string>,
  stringerGray: Object.fromEntries(
    (Object.keys(CHARACTER_POSES) as CharacterPose[]).map((pose) => [
      pose,
      `/companion/attires/kris-stringer-gray-${pose}.png`,
    ]),
  ) as Record<CharacterPose, string>,
  shirtless: Object.fromEntries(
    (Object.keys(CHARACTER_POSES) as CharacterPose[]).map((pose) => [
      pose,
      `/companion/attires/kris-shirtless-${pose}.png`,
    ]),
  ) as Record<CharacterPose, string>,
};

function isCharacterOutfit(value: string | null): value is CharacterOutfit {
  return CHARACTER_OUTFITS.some((outfit) => outfit.id === value);
}

function shouldAutofocusMobileChat(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

const FLEX_POSES: CharacterPose[] = [
  "flex-double",
  "flex-side",
  "flex-most-muscular",
  "flex-victory",
];

function poseForReply(message: string, hasCta: boolean): CharacterPose {
  const reply = message.toLowerCase();
  if (/sorry|struggl|hard|pain|injur|setback|rough|worr|stress/.test(reply))
    return "concerned";
  if (/wow|surpris|didn't expect|did not expect|no way/.test(reply))
    return "surprised";
  if (/proud|progress|win|crushed|great work|well done/.test(reply))
    return "proud";
  if (hasCta || /excited|let's go|ready|celebrat/.test(reply)) return "excited";
  if (/start|focus|plan|target|next step|do this|commit/.test(reply))
    return "determined";
  return "confident";
}

function makeMessageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

const BOT_BUBBLE_MAX_CHARS = 92;
const BOT_BUBBLE_REVEAL_MS = 760;

function splitBotReplyIntoBubbles(text: string): string[] {
  const normalized = text
    .replace(/\s+/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .trim();

  if (!normalized) return [];

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const sourceParts =
    sentences.length > 1 ? sentences : normalized.split(/\s*[—;]\s+/);
  const bubbles: string[] = [];
  let current = "";

  for (const part of sourceParts) {
    if (!current) {
      current = part;
    } else if (`${current} ${part}`.length <= BOT_BUBBLE_MAX_CHARS) {
      current = `${current} ${part}`;
    } else {
      bubbles.push(current);
      current = part;
    }
  }
  if (current) bubbles.push(current);

  const tightened = bubbles.flatMap((bubble) => {
    if (bubble.length <= BOT_BUBBLE_MAX_CHARS + 20) return [bubble];
    const words = bubble.split(" ");
    const chunks: string[] = [];
    let chunk = "";
    for (const word of words) {
      if (!chunk) {
        chunk = word;
      } else if (`${chunk} ${word}`.length <= BOT_BUBBLE_MAX_CHARS) {
        chunk = `${chunk} ${word}`;
      } else {
        chunks.push(chunk);
        chunk = word;
      }
    }
    if (chunk) chunks.push(chunk);
    return chunks;
  });

  return tightened.slice(0, 4);
}

function analyticsSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

export default function GeebsChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [characterMode, setCharacterMode] = useState<CharacterMode>("idle");
  const [characterPose, setCharacterPose] = useState<CharacterPose>("idle");
  const [characterOutfit, setCharacterOutfit] =
    useState<CharacterOutfit>("classic");
  const flexPoseIndexRef = useRef(0);
  const [hasUnread, setHasUnread] = useState(true);
  const [streamingGroupId, setStreamingGroupId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const streamTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isNearLatestRef = useRef(true);
  const chatOpenedAtRef = useRef(0);
  const chatOpenSourceRef = useRef("site_control");
  const inputStartedRef = useRef(false);
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const lockedScrollYRef = useRef(0);
  const viewportReadingRef = useRef({ atEnd: true, top: 0 });
  const lastScrollTopRef = useRef(0);
  const stickToLatestRef = useRef(true);
  const scrollDistanceRef = useRef(0);
  const scrollThresholdsRef = useRef(new Set<number>());
  const [showLatestButton, setShowLatestButton] = useState(false);
  const [autofocusComposer, setAutofocusComposer] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [sceneMonth, setSceneMonth] = useState(() =>
    monthScene(new Date().getUTCMonth()),
  );
  // The launcher used to sit on the page at full width for the entire scroll:
  // a white pill two lines tall, parked over the hero photograph and then over
  // every rail card beneath it. Discoverability is worth one screen, not
  // thirty-four. Past the first screen it shrinks to its icon and re-opens on
  // hover or keyboard focus, so nothing is lost and nothing is covered.
  const [isCompact, setIsCompact] = useState(false);
  const [companionPresent, setCompanionPresent] = useState(false);
  const [chatViewport, setChatViewport] = useState<{
    height: number;
    top: number;
    width: number;
    left: number;
    keyboard: boolean;
  } | null>(null);
  useEffect(() => {
    const field = replyInputRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(112, field.scrollHeight)}px`;
  }, [input, isOpen]);
  useEffect(() => {
    const storedOutfit = localStorage.getItem(CHARACTER_OUTFIT_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage/URL once on mount; cannot run during SSR render
    if (isCharacterOutfit(storedOutfit)) setCharacterOutfit(storedOutfit);

    const params = new URLSearchParams(window.location.search);
    const legacySeason = params.get("chat_season");
    const preview = (params.get("chat_month") ||
      (legacySeason === "spooky" ? "october" : null)) as SceneMonth | null;
    setSceneMonth(
      MONTH_SCENES.find((scene) => scene.slug === preview) ||
        monthScene(new Date().getMonth()),
    );
  }, []);

  const selectCharacterOutfit = (outfit: CharacterOutfit) => {
    setCharacterOutfit(outfit);
    localStorage.setItem(CHARACTER_OUTFIT_STORAGE_KEY, outfit);
    trackClientEvent("chat_widget_outfit_selected", {
      session_id: sessionId,
      outfit,
      cta_id: `chat_outfit_${outfit}`,
    });
  };
  useEffect(() => {
    let raf = 0;
    let next = hasDedicatedCoachCompanion(pathname);
    try {
      next ||=
        isInstagramDmAttribution(window.location.search) ||
        sessionStorage.getItem(INSTAGRAM_DM_SESSION_KEY) === "true";
    } catch {
      // Dedicated companion pages still suppress the duplicate launcher.
    }
    raf = requestAnimationFrame(() => setCompanionPresent(next));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  // Generate or restore a unique web session ID. Lazy initializer instead of an
  // effect: sessionId is never rendered, so the server's "" placeholder cannot
  // cause a hydration mismatch.
  const [sessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    let stored = localStorage.getItem("geebs_chat_session_id");
    if (!stored) {
      stored = makeMessageId("web-session");
      localStorage.setItem("geebs_chat_session_id", stored);
    }
    return stored;
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: "hey, i'm kris. what are we fixing first?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      quickReplies: [
        "What is on this page?",
        "Find a free tool",
        "Browse fitness science",
        "How 1:1 coaching works",
      ],
    },
  ]);

  const scrollToBottom = () => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    messageList.scrollTo({
      top: messageList.scrollHeight,
      behavior: "smooth",
    });
    stickToLatestRef.current = true;
    isNearLatestRef.current = true;
    setShowLatestButton(false);
  };

  const pinToLatest = () => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    messageList.scrollTop = messageList.scrollHeight;
    lastScrollTopRef.current = messageList.scrollTop;
    isNearLatestRef.current = true;
    setShowLatestButton(false);
  };

  useLayoutEffect(() => {
    if (!isOpen || !stickToLatestRef.current) return;
    pinToLatest();
  }, [isOpen, messages.length, loading, streamingGroupId, chatViewport]);

  const closeChat = (reason: "button" | "escape" | "source" | "cta") => {
    const userMessageCount = messages.filter(
      (message) => message.sender === "user",
    ).length;
    trackClientEvent("chat_widget_closed", {
      session_id: sessionId,
      close_reason: reason,
      cta_id: `chat_close_${reason}`,
      chat_duration_seconds: chatOpenedAtRef.current
        // eslint-disable-next-line react-hooks/purity -- runs in the close handler, not during render
        ? Math.max(0, Math.round((Date.now() - chatOpenedAtRef.current) / 1000))
        : 0,
      chat_user_message_count: userMessageCount,
      total_message_count: messages.length,
      chat_scroll_distance_px: Math.round(scrollDistanceRef.current),
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        if (isNearLatestRef.current) scrollToBottom();
        else setShowLatestButton(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen, messages, sessionId]);

  useEffect(() => {
    if (!isOpen) return;
    // eslint-disable-next-line react-hooks/purity -- runs inside an effect when the chat opens
    chatOpenedAtRef.current = Date.now();
    inputStartedRef.current = false;
    scrollDistanceRef.current = 0;
    scrollThresholdsRef.current.clear();
    lastScrollTopRef.current = messageListRef.current?.scrollTop || 0;
    trackClientEvent("chat_widget_opened", {
      session_id: sessionId,
      open_source: chatOpenSourceRef.current,
      cta_id: `chat_open_${chatOpenSourceRef.current}`,
    });
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (!isOpen) return;
    const messageList = messageListRef.current;
    if (!messageList) return;
    const syncLatestState = (event?: Event) => {
      const remaining =
        messageList.scrollHeight -
        messageList.scrollTop -
        messageList.clientHeight;
      const isNearLatest = remaining < 56;
      isNearLatestRef.current = isNearLatest;
      if (event?.isTrusted && !isNearLatest) stickToLatestRef.current = false;
      setShowLatestButton(!isNearLatest);

      if (event?.isTrusted) {
        const delta = messageList.scrollTop - lastScrollTopRef.current;
        scrollDistanceRef.current += Math.abs(delta);
        lastScrollTopRef.current = messageList.scrollTop;
        for (const threshold of [100, 300, 600]) {
          if (
            scrollDistanceRef.current >= threshold &&
            !scrollThresholdsRef.current.has(threshold)
          ) {
            scrollThresholdsRef.current.add(threshold);
            trackClientEvent("chat_widget_scrolled", {
              session_id: sessionId,
              distance_px: threshold,
              cta_id: `chat_scroll_${threshold}`,
              direction: delta < 0 ? "older" : "newer",
              chat_user_message_count: messages.filter(
                (message) => message.sender === "user",
              ).length,
            });
          }
        }
      } else {
        lastScrollTopRef.current = messageList.scrollTop;
      }
    };
    messageList.addEventListener("scroll", syncLatestState, { passive: true });
    syncLatestState();
    return () => messageList.removeEventListener("scroll", syncLatestState);
  }, [isOpen, messages, sessionId]);

  useEffect(() => {
    if (
      characterMode !== "talking" &&
      characterMode !== "celebrating" &&
      characterMode !== "flexing"
    )
      return;
    const timer = window.setTimeout(
      () => {
        setCharacterMode("idle");
        setCharacterPose("idle");
      },
      characterMode === "flexing" ? 1800 : 2200,
    );
    return () => window.clearTimeout(timer);
  }, [characterMode]);

  useEffect(() => {
    return () => {
      streamTimersRef.current.forEach(clearTimeout);
      streamTimersRef.current = [];
    };
  }, []);

  const appendBotReply = (
    reply: Omit<
      Message,
      "id" | "sender" | "timestamp" | "text" | "groupId" | "isFinalChunk"
    > & { text: string },
  ) => {
    const bubbles = splitBotReplyIntoBubbles(reply.text);
    const groupId = makeMessageId("botgrp");
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    streamTimersRef.current.forEach(clearTimeout);
    streamTimersRef.current = [];

    if (bubbles.length === 0) {
      setLoading(false);
      setStreamingGroupId(null);
      setCharacterMode("idle");
      setCharacterPose("idle");
      return;
    }

    setStreamingGroupId(groupId);
    bubbles.forEach((bubble, index) => {
      const timer = setTimeout(
        () => {
          const isFinalChunk = index === bubbles.length - 1;
          stickToLatestRef.current = true;
          setMessages((prev) => [
            ...prev,
            {
              id: `${groupId}-${index}`,
              sender: "bot",
              text: bubble,
              timestamp,
              groupId,
              isFinalChunk,
              ctaUrl: isFinalChunk ? reply.ctaUrl : undefined,
              ctaText: isFinalChunk ? reply.ctaText : undefined,
              quickReplies: isFinalChunk ? reply.quickReplies : undefined,
              sources: isFinalChunk ? reply.sources : undefined,
            },
          ]);

          if (isFinalChunk) {
            setLoading(false);
            setStreamingGroupId(null);
            setCharacterMode(reply.ctaUrl ? "celebrating" : "talking");
            setCharacterPose(poseForReply(reply.text, Boolean(reply.ctaUrl)));
          }
        },
        420 + index * BOT_BUBBLE_REVEAL_MS,
      );
      streamTimersRef.current.push(timer);
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;
    isNearLatestRef.current = true;
    stickToLatestRef.current = true;

    const userMsg: Message = {
      id: makeMessageId("usr"),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);
    setCharacterMode("thinking");
    setCharacterPose("thinking");
    // eslint-disable-next-line react-hooks/purity -- runs inside the async send handler, not during render
    const requestStartedAt = performance.now();

    trackClientEvent("chat_widget_message_sent", {
      session_id: sessionId,
      message_length: query.length,
      is_chip: !!textToSend,
      cta_id: textToSend ? "chat_send_quick_reply" : "chat_send_typed",
      message_number:
        messages.filter((message) => message.sender === "user").length + 1,
    });

    try {
      const historyPayload = [...messages, userMsg].map((m) => ({
        sender: m.sender,
        text: m.text,
      }));
      const main = document.querySelector("main");
      const pageContext = {
        title: document.title,
        url: `${window.location.pathname}${window.location.search}`,
        summary:
          document.querySelector<HTMLMetaElement>('meta[name="description"]')
            ?.content || "",
        visibleContent: (main?.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 8_000),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          conversationId: sessionId,
          pageContext,
        }),
      });

      const data = await res.json();

      if (data.ok && data.message) {
        trackClientEvent("chat_widget_response_received", {
          session_id: sessionId,
          chat_response_time_ms: Math.round(
            // eslint-disable-next-line react-hooks/purity -- runs inside the async send handler, not during render
            performance.now() - requestStartedAt,
          ),
          reply_length: data.message.length,
          source_count: Array.isArray(data.sources) ? data.sources.length : 0,
          has_cta: Boolean(data.ctaUrl),
          cta_id: data.ctaUrl ? "chat_response_with_cta" : "chat_response",
        });
        appendBotReply({
          text: data.message,
          ctaUrl: data.ctaUrl,
          ctaText: data.ctaText,
          quickReplies: data.quickReplies,
          sources: data.sources,
        });

        if (data.ctaUrl?.includes("calendly.com")) {
          trackClientEvent("chat_widget_qualified", {
            session_id: sessionId,
            calendly_url: data.ctaUrl,
          });
        } else if (data.ctaUrl === "/packages") {
          trackClientEvent("chat_widget_disqualified", {
            session_id: sessionId,
          });
        }
      } else {
        trackClientEvent("chat_widget_error", {
          session_id: sessionId,
          error_code: "invalid_response",
        });
        setCharacterMode("talking");
        setCharacterPose("concerned");
        appendBotReply({
          text: "my bad man, connection glitch. hit me up on IG @gainsfromgeebs or grab a call spot below",
          ctaUrl: "/apply",
          ctaText: "Book 15-Min Discovery Call →",
        });
      }
    } catch (err) {
      console.error("[GeebsChatWidget] Error:", err);
      trackClientEvent("chat_widget_error", {
        session_id: sessionId,
        error_code: "network_error",
      });
      appendBotReply({
        text: "my bad bro, connection dropped. reach out on IG @gainsfromgeebs",
        ctaUrl: "/apply",
        ctaText: "Book 15-Min Call →",
      });
    }
  };

  const openChatWithMobileKeyboard = useCallback(
    (source: "site_control" | "floating_launcher") => {
      chatOpenSourceRef.current = source;

      flushSync(() => {
        setIsOpen(true);
        setHasUnread(false);
        setAutofocusComposer(false);
        setShowIntro(messages.every((message) => message.sender !== "user"));
        setCharacterMode("idle");
        setCharacterPose("idle");
      });
    },
    [messages],
  );

  const beginChat = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization -- existing deps kept on purpose; refactor tracked separately
    (source: string) => {
      const autofocus = shouldAutofocusMobileChat();
      trackClientEvent("chat_widget_intro_started", {
        session_id: sessionId,
        outfit: characterOutfit,
        cta_id: `chat_intro_${source}`,
      });
      flushSync(() => {
        setShowIntro(false);
        setCharacterMode("listening");
        setCharacterPose("listening");
        setAutofocusComposer(autofocus);
      });
      if (!autofocus) return;
      requestAnimationFrame(() => {
        const field = replyInputRef.current;
        field?.focus({ preventScroll: true });
        field?.setSelectionRange(field.value.length, field.value.length);
      });
    },
    // eslint-disable-next-line react-hooks/preserve-manual-memoization -- existing deps kept on purpose; refactor tracked separately
    [characterOutfit, sessionId],
  );

  useEffect(() => {
    if (!isOpen || !autofocusComposer) return;
    const frame = requestAnimationFrame(() => {
      const field = replyInputRef.current;
      field?.focus({ preventScroll: true });
      field?.setSelectionRange(field.value.length, field.value.length);
    });
    return () => cancelAnimationFrame(frame);
  }, [autofocusComposer, isOpen]);

  // The mobile dock renders its own chat button (MobileDock)
  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // and opens the drawer through this event, so the two controls share one bar
  // instead of stacking over the article.
  useEffect(() => {
    const openFromBar = () => {
      window.dispatchEvent(new CustomEvent("geebs:close-companion"));
      openChatWithMobileKeyboard("site_control");
    };
    window.addEventListener("geebs:open-chat", openFromBar);
    return () => window.removeEventListener("geebs:open-chat", openFromBar);
  }, [openChatWithMobileKeyboard]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat("escape");
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, messages, sessionId]);

  // iOS can keep 100dvh tied to the layout viewport while its keyboard shrinks
  // the visual viewport. Follow the visible rectangle so the composer and send
  // button remain above the keyboard instead of being clipped off-screen.
  useEffect(() => {
    if (!isOpen) return;
    const visualViewport = window.visualViewport;
    let viewportFrame = 0;
    const syncViewport = () => {
      cancelAnimationFrame(viewportFrame);
      viewportFrame = requestAnimationFrame(() => {
        const viewport = window.visualViewport;
        const typing = document.activeElement === replyInputRef.current;
        const isZoomed = viewport ? Math.abs(viewport.scale - 1) > 0.05 : false;
        const viewportHeight = viewport?.height ?? window.innerHeight;
        const viewportTop = viewport?.offsetTop ?? 0;
        const viewportWidth = viewport?.width ?? window.innerWidth;
        const viewportLeft = viewport?.offsetLeft ?? 0;
        viewportReadingRef.current = {
          atEnd: isNearLatestRef.current,
          top: messageListRef.current?.scrollTop ?? 0,
        };
        setChatViewport((previous) =>
          isZoomed && previous
            ? previous
            : {
                height: Math.round(viewportHeight),
                top: Math.round(viewportTop),
                width: Math.round(viewportWidth),
                left: Math.round(viewportLeft),
                keyboard:
                  typing &&
                  !isZoomed &&
                  (window.innerHeight - viewportHeight > 120 ||
                    viewportHeight < 500),
              },
        );
      });
    };
    syncViewport();
    visualViewport?.addEventListener("resize", syncViewport);
    visualViewport?.addEventListener("scroll", syncViewport);
    window.addEventListener("resize", syncViewport);
    document.addEventListener("focusin", syncViewport);
    document.addEventListener("focusout", syncViewport);
    return () => {
      cancelAnimationFrame(viewportFrame);
      visualViewport?.removeEventListener("resize", syncViewport);
      visualViewport?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
      document.removeEventListener("focusin", syncViewport);
      document.removeEventListener("focusout", syncViewport);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !chatViewport) return;
    const anchor = viewportReadingRef.current;
    const frame = requestAnimationFrame(() => {
      const list = messageListRef.current;
      if (list) {
        list.scrollTo({
          top: anchor.atEnd ? list.scrollHeight : anchor.top,
          behavior: "instant",
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [chatViewport, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const preventGesture = (event: Event) => event.preventDefault();
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);
    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, [isOpen]);

  // While the drawer is open, globals.css slides the sticky apply bar away so
  // it cannot sit under the conversation.
  useEffect(() => {
    document.body.classList.toggle("geebs-chat-open", isOpen);
    if (!isOpen) return;

    const scrollY = window.scrollY;
    lockedScrollYRef.current = scrollY;
    const previousBody = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtml = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior: document.documentElement.style.overscrollBehavior,
    };

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const keepPageStill = () => {
      if (window.scrollY !== lockedScrollYRef.current) {
        window.scrollTo(0, lockedScrollYRef.current);
      }
    };
    window.addEventListener("scroll", keepPageStill, { passive: true });
    window.visualViewport?.addEventListener("scroll", keepPageStill);

    return () => {
      document.body.classList.remove("geebs-chat-open");
      window.removeEventListener("scroll", keepPageStill);
      window.visualViewport?.removeEventListener("scroll", keepPageStill);
      Object.assign(document.body.style, previousBody);
      Object.assign(document.documentElement.style, previousHtml);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const latestBotMessageId = [...messages]
    .reverse()
    .find((m) => m.sender === "bot" && m.isFinalChunk !== false)?.id;

  // Placed AFTER every hook so the rules of hooks still hold — this returns
  // null, it does not skip any hook above it.
  if (CHAT_SUPPRESSED_PATHS.has(pathname)) {
    return null;
  }

  const hasCoachCompanion =
    pathname.startsWith("/blog/") || pathname === "/tools/macro-calculator";
  const keyboardLift =
    typeof window !== "undefined" && chatViewport?.keyboard
      ? Math.max(0, window.innerHeight - chatViewport.height - chatViewport.top)
      : 0;
  const chatShellStyle =
    isOpen
      ? ({
          "--geebs-keyboard-lift": `${keyboardLift}px`,
          "--geebs-viewport-top": `${chatViewport?.top ?? 0}px`,
          "--geebs-viewport-height": `${
            chatViewport?.height ??
            (typeof window !== "undefined" ? window.innerHeight : 0)
          }px`,
          "--geebs-viewport-left": `${chatViewport?.left ?? 0}px`,
          "--geebs-viewport-width": `${
            chatViewport?.width ??
            (typeof window !== "undefined" ? window.innerWidth : 0)
          }px`,
          top: "var(--geebs-viewport-top)",
          left: "var(--geebs-viewport-left)",
          right: "auto",
          bottom: "auto",
          width: "var(--geebs-viewport-width)",
          height: "var(--geebs-viewport-height)",
        } as React.CSSProperties)
      : undefined;

  // /geebs-method has one offer on its first screen (the apply button). The
  // launcher stays reachable but is an icon-only dark circle there from the
  // first paint: no "free audit" label, no ping dot, no second red/white object.
  const quietLauncher = pathname === "/geebs-method";
  const launcherCompact = isCompact || quietLauncher;

  return (
    // geebs-chat-launcher: on mobile, globals.css HIDES this floating pill
    // while the mobile dock is up (body.has-mobile-dock) — the dock
    // renders the chat button itself. Previously both were fixed bottom-right
    // at z-50 and the pill was merely lifted, which left it floating over the
    // article text.
    // On pages with CoachCompanion, 2D Kris owns the bottom-right floating dock,
    // so the legacy launcher is suppressed while its drawer stays available
    // through the companion's "Message Kris" action.
    <div
      className={`geebs-chat-launcher pointer-events-auto font-sans ${
        isOpen
          ? "fixed z-[70] flex items-stretch"
          : "fixed bottom-5 right-5 z-50 flex flex-col items-end"
      }`}
      style={chatShellStyle}
    >
      {/* Homepage keeps the hero action clear; its dock can still open chat. */}
      {!isOpen &&
        pathname !== "/" &&
        !hasCoachCompanion &&
        !companionPresent && (
          <button
            onClick={() => {
              openChatWithMobileKeyboard("floating_launcher");
            }}
            aria-label="Ask Coach Kris Anything"
            className={`group relative flex items-center ${quietLauncher ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-white/20" : "bg-white hover:bg-zinc-100 text-zinc-950 border-2 border-red-600"} px-4 py-3 rounded-full ${quietLauncher ? "shadow-[0_6px_20px_rgba(0,0,0,0.5)]" : "shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(220,38,38,0.25)]"} transition-all duration-300 transform hover:scale-105 ${launcherCompact ? "gap-0 group-hover:gap-3.5" : "gap-3.5"}`}
          >
            {hasUnread && !quietLauncher && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white"></span>
              </span>
            )}
            <div className={`w-8.5 h-8.5 rounded-full ${quietLauncher ? "bg-zinc-700" : "bg-red-600"} text-white flex items-center justify-center shrink-0 shadow-sm`}>
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div
              className={`hidden flex-col items-start overflow-hidden text-left transition-all duration-300 sm:flex ${
                launcherCompact
                  ? "max-w-0 opacity-0 group-hover:max-w-[260px] group-hover:opacity-100 group-focus-visible:max-w-[260px] group-focus-visible:opacity-100"
                  : "max-w-[260px] opacity-100"
              }`}
            >
              <span className={`whitespace-nowrap text-[10px] font-black uppercase tracking-wider ${quietLauncher ? "text-zinc-400" : "text-red-600"} flex items-center gap-1`}>
                Free 1:1 Macro &amp; Training Audit
              </span>
              <span className={`whitespace-nowrap text-xs font-extrabold ${quietLauncher ? "text-zinc-100" : "text-zinc-950"} tracking-tight`}>
                Ask Coach Kris Anything
              </span>
            </div>
            <span
              className={`geebs-chat-launcher-label overflow-hidden whitespace-nowrap text-xs font-extrabold text-zinc-950 transition-all duration-300 sm:hidden ${
                launcherCompact ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"
              }`}
            >
              Ask Kris
            </span>
          </button>
        )}

      {/* Main Chat Drawer */}
      {isOpen && (
        <div
          data-geebs-chat-drawer
          data-character-conversation="true"
          data-chat-intro={showIntro ? "true" : "false"}
          data-chat-keyboard-open={chatViewport?.keyboard ? "true" : "false"}
          className="relative flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden rounded-none border-0 border-red-900/40 bg-zinc-950/95 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(220, 38, 38, 0.15)",
          }}
        >
          <button
            onClick={() => closeChat("button")}
            aria-label="Close Chat"
            className="absolute right-3 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <RailConversationScene
            source="geebs-coach-chat"
            label="Conversation with Coach Kris"
            characterLabel={`Kris is ${characterMode}`}
            keyboardState={chatViewport?.keyboard ? "open" : "closed"}
            className="geebs-conversation-scene min-h-0 flex-1"
            background={
              <>
                <SeasonalGymBackground scene={sceneMonth} />
              </>
            }
            messageListRef={messageListRef}
            character={
              <section
                data-character-stage
                data-character-mode={characterMode}
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute bottom-0 left-1/2 h-11 w-[210px] -translate-x-1/2 rounded-[50%] bg-[#b9d8d0]/25 shadow-[0_0_48px_rgba(125,211,205,0.3)]" />
                <div className="companion-stage-fx" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <button
                  type="button"
                  data-conversation-character
                  aria-label="Tap Kris to flex"
                  onClick={() => {
                    const nextPose =
                      FLEX_POSES[flexPoseIndexRef.current % FLEX_POSES.length];
                    trackClientEvent("chat_widget_character_tapped", {
                      session_id: sessionId,
                      pose: nextPose,
                      cta_id: `chat_pose_${nextPose}`,
                      tap_number: flexPoseIndexRef.current + 1,
                    });
                    setCharacterMode("flexing");
                    setCharacterPose(nextPose);
                    flexPoseIndexRef.current += 1;
                  }}
                  className="companion-character-hitbox pointer-events-auto absolute bottom-2 left-1/2 z-10 -translate-x-1/2 border-0 bg-transparent p-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      CHARACTER_POSES_BY_OUTFIT[characterOutfit][characterPose]
                    }
                    alt=""
                    data-character-pose={characterPose}
                    data-character-outfit={characterOutfit}
                    className={`companion-character-pose companion-character-pose--${characterMode}`}
                  />
                </button>
                <div
                  data-companion-outfit-switcher
                  className="companion-outfit-switcher pointer-events-auto"
                  role="group"
                  aria-label="Kris outfit"
                >
                  {CHARACTER_OUTFITS.map((outfit) => (
                    <button
                      key={outfit.id}
                      type="button"
                      aria-pressed={characterOutfit === outfit.id}
                      aria-label={`Show Kris in ${outfit.label}`}
                      data-companion-outfit-option={outfit.id}
                      onPointerDown={(event) => {
                        if (document.activeElement === replyInputRef.current) {
                          event.preventDefault();
                        }
                      }}
                      onClick={() => selectCharacterOutfit(outfit.id)}
                    >
                      {outfit.shortLabel}
                    </button>
                  ))}
                </div>
              </section>
            }
            status={
              <p className="companion-bubble-anim w-max max-w-[145px] rounded-xl rounded-bl-sm border border-white/25 bg-white/95 px-3 py-2 text-[12px] font-semibold leading-snug text-zinc-900 shadow-lg">
                {characterMode === "listening" && "I'm listening."}
                {characterMode === "thinking" && "Let me think."}
                {characterMode === "talking" && "Here's what I'd do."}
                {characterMode === "celebrating" && "That's your next move."}
                {characterMode === "flexing" && "Built for this."}
                {characterMode === "idle" && "Ask me anything."}
              </p>
            }
            messages={messages.map((msg): RailConversationMessage => ({
              id: msg.id,
              side: msg.sender === "user" ? "visitor" : "character",
              body: (
                <>
                  <p className="whitespace-pre-line text-sm leading-relaxed lowercase">
                    {msg.text}
                  </p>
                  {msg.ctaUrl && (
                    <div className="mt-3 border-t border-black/10 pt-2.5">
                      <Link
                        href={msg.ctaUrl}
                        onClick={() => {
                          trackClientEvent("chat_widget_cta_clicked", {
                            cta_url: msg.ctaUrl,
                            cta_text: msg.ctaText,
                            session_id: sessionId,
                          });
                          closeChat("cta");
                        }}
                        className="group flex items-center justify-between gap-2 rounded-xl border border-red-600/40 bg-red-600/10 px-3 py-2 text-xs font-semibold text-red-700 transition-all duration-200 hover:bg-red-600/20"
                      >
                        <span>{msg.ctaText || "Take action"}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                  {msg.sources?.length ? (
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold">
                      <span className="text-zinc-500">Sources</span>
                      {msg.sources.slice(0, 3).map((source) => (
                        <Link
                          key={source.href}
                          href={source.href}
                          onClick={() => {
                            trackClientEvent("chat_widget_source_clicked", {
                              session_id: sessionId,
                              destination_path: source.href,
                              cta_id: `chat_source_${analyticsSlug(source.href)}`,
                              source_position:
                                msg.sources!.findIndex(
                                  (candidate) => candidate.href === source.href,
                                ) + 1,
                            });
                            closeChat("source");
                          }}
                          className="text-red-700 underline decoration-red-300 underline-offset-2"
                        >
                          {source.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </>
              ),
              meta:
                !msg.groupId || msg.isFinalChunk ? (
                  <span className="px-1 text-[10px]">{msg.timestamp}</span>
                ) : undefined,
              actions:
                msg.sender === "bot" &&
                msg.id === latestBotMessageId &&
                msg.quickReplies?.length ? (
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {msg.quickReplies.map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          trackClientEvent("chat_widget_quick_reply_clicked", {
                            session_id: sessionId,
                            quick_reply: analyticsSlug(pill),
                            cta_id: `chat_reply_${analyticsSlug(pill)}`,
                            cta_position: idx + 1,
                            reply_position: idx + 1,
                          });
                          handleSendMessage(pill);
                        }}
                        className="rounded-full border border-white/35 bg-[#10262b]/85 px-3 py-1.5 text-left text-xs text-white transition-all duration-200 hover:border-[#ffe27a]/70 hover:text-[#ffe27a]"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                ) : undefined,
            }))}
            typing={
              loading ? (
                <div className="flex w-fit items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs text-zinc-500 shadow-lg">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-red-600" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-red-600 [animation-delay:0.2s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-red-600 [animation-delay:0.4s]" />
                  <span className="ml-1 lowercase">
                    {streamingGroupId
                      ? "kris is replying..."
                      : "kris is thinking..."}
                  </span>
                </div>
              ) : undefined
            }
            endMarker={<div ref={messagesEndRef} />}
            composer={
              <>
                {showLatestButton && (
                  <button
                    type="button"
                    onClick={() => {
                      trackClientEvent("chat_widget_jump_latest_clicked", {
                        session_id: sessionId,
                        cta_id: "chat_jump_latest",
                        chat_user_message_count: messages.filter(
                          (message) => message.sender === "user",
                        ).length,
                      });
                      scrollToBottom();
                    }}
                    aria-label="Jump to newest message"
                    className="geebs-jump-latest absolute -top-12 z-20 -translate-x-1/2 rounded-full border border-white/25 bg-[#101719]/95 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur"
                  >
                    New message <span aria-hidden="true">↓</span>
                  </button>
                )}
                <form
                  data-chat-composer
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_2.75rem] items-end gap-2 overflow-hidden border-t border-white/10 bg-[#081311]/70 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-18px_36px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                >
                  <textarea
                    ref={replyInputRef}
                    autoFocus={autofocusComposer}
                    rows={1}
                    aria-label="Message Kris"
                    enterKeyHint="send"
                    value={input}
                    onChange={(e) => {
                      if (e.target.value && !inputStartedRef.current) {
                        inputStartedRef.current = true;
                        trackClientEvent("chat_widget_input_started", {
                          session_id: sessionId,
                          cta_id: "chat_input_started",
                        });
                      }
                      setInput(e.target.value);
                      if (!loading) {
                        const nextMode = e.target.value ? "listening" : "idle";
                        setCharacterMode(nextMode);
                        setCharacterPose(nextMode);
                      }
                    }}
                    placeholder="message kris..."
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing &&
                        !window.matchMedia("(pointer: coarse)").matches
                      ) {
                        event.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="geebs-reply-input min-w-0 flex-1 rounded-[1.375rem] border border-white/18 bg-white/10 px-4 py-2.5 text-base text-white outline-none transition-colors placeholder:text-white/45 focus:border-white/35 focus:bg-white/14 focus:ring-2 focus:ring-white/15"
                  />
                  <button
                    data-chat-send
                    type="submit"
                    onPointerDown={(event) => {
                      if (
                        event.pointerType === "touch" &&
                        document.activeElement === replyInputRef.current
                      ) {
                        event.preventDefault();
                      }
                    }}
                    disabled={!input.trim() || loading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 p-2.5 font-bold text-white transition-all hover:bg-red-500 disabled:bg-white/12 disabled:text-white/45"
                    aria-label="Send message"
                  >
                    <svg
                      className="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </form>
              </>
            }
          />
          {showIntro && (
            <section
              data-chat-outfit-intro
              className="geebs-chat-intro"
              aria-label="Choose Kris outfit"
            >
              <div className="geebs-chat-intro__copy">
                <p className="geebs-chat-intro__eyebrow">Talk to Kris</p>
                <h2>Choose his look first.</h2>
                <p>
                  Pick the version you want in the gym, then tell him what you
                  want to fix.
                </p>
              </div>
              <div className="geebs-chat-intro__outfits" aria-label="Kris outfits">
                {CHARACTER_OUTFITS.map((outfit) => (
                  <button
                    key={outfit.id}
                    type="button"
                    data-chat-intro-outfit={outfit.id}
                    aria-pressed={characterOutfit === outfit.id}
                    aria-label={`Show Kris in ${outfit.label}`}
                    onClick={() => selectCharacterOutfit(outfit.id)}
                    className="geebs-chat-intro__outfit"
                  >
                    <span className="geebs-chat-intro__sprite">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={CHARACTER_POSES_BY_OUTFIT[outfit.id].idle}
                        alt=""
                      />
                    </span>
                    <span>{outfit.shortLabel}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="geebs-chat-intro__start"
                onClick={() => beginChat("start")}
              >
                Start chat
              </button>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

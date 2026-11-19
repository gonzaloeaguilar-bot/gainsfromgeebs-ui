"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Takeover({ children }: { children: React.ReactNode }) {
  const [viewport, setViewport] = useState({ height: 0, coverHeight: 0, keyboard: false });
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The site chrome stays in the DOM under the overlay; keep it out of the
    // tab order and the accessibility tree while the takeover is up.
    const root = document.getElementById("assessment-takeover");
    const hidden = new Set<HTMLElement>();
    const sweep = () => {
      for (const el of Array.from(document.body.children)) {
        if (!(el instanceof HTMLElement) || el.contains(root) || el.tagName === "SCRIPT") continue;
        if (el.hasAttribute("inert")) continue;
        el.setAttribute("inert", "");
        hidden.add(el);
      }
    };
    sweep();
    // Dock and ribbon mount after hydration, so sweep again as they arrive.
    const observer = new MutationObserver(sweep);
    observer.observe(document.body, { childList: true });
    return () => {
      observer.disconnect();
      document.body.style.overflow = prev;
      hidden.forEach((el) => el.removeAttribute("inert"));
    };
  }, []);

  // iOS Safari can leave 100dvh at its pre-keyboard height. Follow the real
  // visible viewport so an assessment field and its action cannot sit behind
  // the number keyboard.
  useEffect(() => {
    const sync = () => {
      const visual = window.visualViewport;
      const height = Math.round(visual?.height ?? window.innerHeight);
      // Keep the fixed backdrop as tall as Safari's layout viewport. The
      // visual viewport is shorter only while a keyboard is present; using it
      // as the backdrop height reveals the site footer beneath the assessment.
      const coverHeight = Math.max(height, Math.round(window.innerHeight), document.documentElement.clientHeight);
      const keyboard = Boolean(document.activeElement?.matches("input, textarea"))
        && (window.innerHeight - height > 120 || height < 520);
      setViewport({ height, coverHeight, keyboard });
    };
    sync();
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    document.addEventListener("focusin", sync);
    document.addEventListener("focusout", sync);
    return () => {
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("focusin", sync);
      document.removeEventListener("focusout", sync);
    };
  }, []);

  return (
    <>
    <style>{".recomp-ribbon,.geebs-dock,.geebs-chat-launcher{display:none!important}"}</style>
    <div
      id="assessment-takeover"
      data-assessment-keyboard-open={viewport.keyboard ? "true" : "false"}
      style={{ height: viewport.coverHeight ? `${viewport.coverHeight}px` : "100dvh", bottom: "auto", ["--assessment-visible-height" as string]: viewport.height ? `${viewport.height}px` : "100dvh" }}
      className="fixed inset-x-0 top-0 z-[300] overflow-x-hidden overflow-y-auto overscroll-contain bg-ink"
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[560px] flex-col px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="display text-[15px] tracking-[0.12em] text-bone/80"
          >
            GEEBS
          </Link>
          <Link
            href="/"
            aria-label="Leave the assessment"
            className="grid h-11 w-11 place-items-center text-[22px] leading-none text-mute hover:text-bone"
          >
            <span aria-hidden="true">×</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
    </>
  );
}

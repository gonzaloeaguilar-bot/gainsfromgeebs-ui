"use client";

// ============================================================
//  ToolEmailCapture — optional email capture below free tool results
//
//  Appears BELOW the free result, never gates it.
//  Props:
//   toolName — 'tdee' | 'macro' | '1rm' | 'body-fat' | 'calorie-deficit'
//              Generates source='tool:<toolName>'
// ============================================================

import { useState, useRef } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { trackClientEvent } from "@/lib/clientAnalytics";

type ToolEmailCaptureProps = {
  toolName: string;
};

function getGaClientId(): string {
  if (typeof window === "undefined") return "";
  try {
    const ga = document.cookie
      .split("; ")
      .find((c) => c.startsWith("_ga="))
      ?.split("=")?.[1];
    if (!ga) return "";
    const parts = ga.split(".");
    return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : "";
  } catch {
    return "";
  }
}

function getUtmParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export default function ToolEmailCapture({ toolName }: ToolEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "ok" | "already" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const source = `tool:${toolName}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const honeypot =
      (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";
    if (honeypot) return;

    setStatus("loading");
    setErrorMsg("");

    trackClientEvent("tool_email_capture_attempt", {
      source,
      tool_name: toolName,
    });

    const result = await subscribeEmail({
      email,
      source,
      website: honeypot,
      utmSource: getUtmParam("utm_source"),
      utmMedium: getUtmParam("utm_medium"),
      utmCampaign: getUtmParam("utm_campaign"),
      gaClientId: getGaClientId(),
    });

    if (result.status === "ok") {
      setStatus("ok");
      trackClientEvent("tool_email_capture", {
        source,
        tool_name: toolName,
      });
    } else if (result.status === "already_subscribed") {
      setStatus("already");
    } else if (result.status === "invalid_email") {
      setStatus("error");
      setErrorMsg(result.message);
    } else if (result.status === "honeypot") {
      setStatus("ok");
    } else {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="mt-6 flex items-center gap-3 text-[14px] text-bone/70 border-t border-line pt-5"
        role="status"
        aria-live="polite"
      >
        <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cloud" />
        <span>
          Done — check your inbox for the results + weekly insights from Kris.
        </span>
      </div>
    );
  }

  if (status === "already") {
    return (
      <div
        className="mt-6 flex items-center gap-3 text-[14px] text-bone/70 border-t border-line pt-5"
        role="status"
        aria-live="polite"
      >
        <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cloud" />
        <span>You&apos;re already on the list.</span>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="text-[13.5px] text-mute leading-[1.55]">
        Want these results emailed + weekly insights on training and
        recomposition?
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-3 flex gap-2"
        noValidate
      >
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
          defaultValue=""
        />
        <label htmlFor={`tool-email-${toolName}`} className="sr-only">
          Email address
        </label>
        <input
          id={`tool-email-${toolName}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="apply-input flex-1 min-w-0 !py-2.5 !text-[14px]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary whitespace-nowrap text-[13px] px-4 py-2.5"
        >
          {status === "loading" ? "..." : "Get it"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-[12.5px] text-cloudText" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

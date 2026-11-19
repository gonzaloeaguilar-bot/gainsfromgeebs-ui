"use client";

// Earn-first email capture. Nowhere on the site should a bare email field sit
// waiting: the visitor presses one question, gets a real coaching tip, and only
// then sees the fields. Name, email and phone are asked together, once, after
// the value has already been handed over.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RailDisclosure } from "@/vendor/rail-kit";
import { TIP_THEMES, todaysTip, type TipThemeId } from "@/lib/dailyTips";

type Props = {
  source: string;
  /** Which card to hand over. Defaults to the training pack. */
  theme?: TipThemeId;
  /** The invitation on the closed state. */
  question?: string;
  /** Smaller type and spacing, for footers and sidebars. */
  compact?: boolean;
  /** When set, a successful subscribe also counts as a lead of this kind. */
  leadType?: string;
};

function utm(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

function gaClientId(): string {
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

export default function TipCapture({
  source,
  theme = "training",
  question = "Want a free coaching tip?",
  compact = false,
  leadType,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const pack = TIP_THEMES.find((item) => item.id === theme) ?? TIP_THEMES[0];
  const tip = todaysTip(pack.id);

  useEffect(() => {
    // Reading starts at the tip, not at the input: the keyboard should never
    // open on its own. preventScroll matters here — the closed and open
    // states render at the same spot, so the browser's default
    // scroll-into-view on focus() yanked the reader past the tip they just
    // asked for (reported inside the pack overlay, where this sits at the
    // bottom of a short scroll container and the default scroll overshot).
    if (open) headingRef.current?.focus({ preventScroll: true });
  }, [open]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const website =
      (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus("loading");
    setMessage("");
    trackClientEvent("newsletter_signup_attempt", { source });
    const result = await subscribeEmail({
      name,
      email,
      phone,
      smsConsent,
      source,
      website,
      utmSource: utm("utm_source"),
      utmMedium: utm("utm_medium"),
      utmCampaign: utm("utm_campaign"),
      gaClientId: gaClientId(),
    });
    if (["ok", "already_subscribed", "honeypot"].includes(result.status)) {
      setStatus("ok");
      trackClientEvent("newsletter_signup", { source });
      if (leadType) trackClientEvent("generate_lead", { lead_type: leadType });
    } else {
      setStatus("error");
      setMessage(
        "message" in result ? result.message : "Something went wrong. Try again in a moment.",
      );
    }
  }

  if (!open) {
    return (
      <div className={`tip-capture${compact ? " tip-capture--compact" : ""}`} data-tip-capture>
        <p className="eyebrow text-cloudText">Free coaching tip</p>
        <p className="tip-capture__question">{question}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setOpen(true);
            trackClientEvent("tip_capture_open", { source, theme: pack.id });
          }}
        >
          Show me today&apos;s tip
        </button>
      </div>
    );
  }

  return (
    <div
      className={`tip-capture tip-capture--open${compact ? " tip-capture--compact" : ""}`}
      data-tip-capture
    >
      <p className="eyebrow text-cloudText">
        {pack.label} / today&apos;s card
      </p>
      <h3 className="tip-capture__title" ref={headingRef} tabIndex={-1}>
        {tip.title}
      </h3>
      <p className="tip-capture__body">{tip.body}</p>
      <div className="tip-capture__action">
        <span>Try this today</span>
        <strong>{tip.action}</strong>
      </div>

      {status === "ok" ? (
        <p className="tip-capture__done" role="status">
          <strong>You&apos;re in.</strong> The next card lands in your inbox.
        </p>
      ) : (
        <RailDisclosure
          summary="Want one of these every week?"
          tone="footer"
          source="tip-capture"
          labels={{
            closed: "Want one of these every week?",
            open: "Not now, just the tip",
          }}
          onToggle={({ open }) =>
            // Contract event, not a new name: opening this IS a form start.
            open && trackClientEvent("form_start", { form_id: "tip_capture", source })
          }
        >
        <form ref={formRef} onSubmit={submit} className="tip-capture__form" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            defaultValue=""
          />
          <div className="tip-capture__fields">
            <label>
              Name
              <input
                className="apply-input"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                className="apply-input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
              />
            </label>
            <label>
              Phone <span>optional</span>
              <input
                className="apply-input"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(555) 555-5555"
              />
            </label>
          </div>
          {phone ? (
            <label className="tip-capture__consent">
              <input
                type="checkbox"
                required
                checked={smsConsent}
                onChange={(event) => setSmsConsent(event.target.checked)}
              />
              <span>
                I agree to receive occasional automated texts from Geebs Coaching. Consent is not
                required to buy. Message and data rates may apply. Reply STOP to opt out.
              </span>
            </label>
          ) : null}
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send me the next one"}
          </button>
          {status === "error" ? (
            <p className="tip-capture__error" role="alert">
              {message}
            </p>
          ) : null}
        </form>
        </RailDisclosure>
      )}

      <p className="tip-capture__links">
        <Link href={tip.href}>
          Read the full guide <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}

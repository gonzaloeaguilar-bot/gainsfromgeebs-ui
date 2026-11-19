"use client";

import { useRef, useState } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { trackClientEvent } from "@/lib/clientAnalytics";

export default function PackageLeadCapture() {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus("loading");
    setMessage("");
    const result = await subscribeEmail({
      email,
      phone,
      smsConsent,
      source: "packages_keep_in_touch",
      website,
    });

    if (result.status === "ok" || result.status === "already_subscribed") {
      setStatus("ok");
      trackClientEvent("generate_lead", { lead_type: "packages_keep_in_touch" });
      return;
    }
    setStatus("error");
    setMessage("message" in result ? result.message : "Try again in a moment.");
  }

  return (
    <section data-package-lead-capture className="mt-8 border-y border-line2 bg-bone/[0.025] px-5 py-7 md:px-7" aria-labelledby="packages-keep-in-touch">
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow text-cloudText">No pressure</p>
          <h2 id="packages-keep-in-touch" className="display mt-3 text-[26px] leading-[1.08] text-bone md:text-[32px]">
            Want to keep in touch?
          </h2>
          <p className="mt-3 max-w-[38ch] text-[14.5px] leading-[1.6] text-mute">
            Leave your details and Kris will send useful training updates. You can still apply whenever the timing feels right.
          </p>
        </div>

        {status === "ok" ? (
          <p className="rounded-md border border-line2 bg-ink3/60 p-5 text-[15px] text-bone" role="status">
            You&apos;re in. Kris will keep the useful stuff coming.
          </p>
        ) : (
          <form ref={formRef} onSubmit={submit} className="grid gap-3" data-analytics-form="packages_keep_in_touch">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[13px] text-bone/80">
                Email
                <input className="apply-input" type="email" name="email" required autoComplete="email" placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="grid gap-1.5 text-[13px] text-bone/80">
                Phone <span className="text-mute2">optional</span>
                <input className="apply-input" type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-5555" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
            </div>
            {phone ? (
              <label className="flex items-start gap-3 text-[12px] leading-[1.5] text-mute">
                <input className="mt-1" type="checkbox" required checked={smsConsent} onChange={(event) => setSmsConsent(event.target.checked)} />
                <span>I agree to receive occasional automated texts from Geebs Coaching. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.</span>
              </label>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Keep me in the loop"}
              </button>
              <p className="text-[12px] text-mute2">Email updates can be unsubscribed from anytime.</p>
            </div>
            {status === "error" ? <p className="text-[13px] text-cloudText" role="alert">{message}</p> : null}
          </form>
        )}
      </div>
    </section>
  );
}

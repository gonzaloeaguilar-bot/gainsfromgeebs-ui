"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { trackClientEvent } from "@/lib/clientAnalytics";
import type { PhotoFocus } from "./assessmentPlan";

type Basics = { age: string; heightFt: string; heightIn: string };
type PhotoRead = { estimate: string; confidence: "low" | "medium"; observation: string; nextFocus: PhotoFocus };
const inputClass = "apply-input min-h-[64px] w-full border-2 border-bone/45 bg-ink2 px-5 text-[24px] font-semibold text-bone placeholder:text-mute focus:border-cloud";
const buttonClass = "min-h-[58px] w-full rounded-[10px] bg-cloud2 px-5 text-[17px] font-semibold text-white";

export default function PhotoFirstAssessment({ onUseQuestions }: { onUseQuestions: (basics: Basics, photoObservation?: string) => void }) {
  const [screen, setScreen] = useState<"landing" | "age" | "height" | "photo">("landing");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [heightError, setHeightError] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const basics = { age, heightFt, heightIn };

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(selected); setPreview(URL.createObjectURL(selected)); setError("");
  }
  async function analyze() {
    if (!photo) return;
    setStatus("loading"); setError("");
    const form = new FormData(); form.set("photo", photo); form.set("adult", "true"); form.set("consent", "true");
    try {
      const response = await fetch("/api/assessment-photo", { method: "POST", body: form });
      const body = await response.json() as { ok: boolean; message?: string; result?: PhotoRead };
      if (!response.ok || !body.ok || !body.result) throw new Error(body.message || "We could not analyze that photo.");
      setStatus("idle");
      trackClientEvent("calculator_completed", { calculator_name: "photo_first_assessment", assessment_focus: body.result.nextFocus });
      // The visitor came here for an assessment, not another explanation
      // screen. Keep the visual read, then move straight into question one.
      onUseQuestions(basics, body.result.observation);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "We could not analyze that photo."); setStatus("error"); }
  }

  function handleAgeContinue() {
    const num = Number(age);
    if (!age || age.trim() === "") {
      setAgeError("Please enter your age to continue.");
      return;
    }
    if (num < 18 || num > 90) {
      setAgeError("Please enter an age between 18 and 90.");
      return;
    }
    setAgeError("");
    setScreen("height");
  }

  function handleHeightContinue() {
    const totalInches = Number(heightFt) * 12 + Number(heightIn);
    if (!heightFt && !heightIn) {
      setHeightError("Please enter your height to continue.");
      return;
    }
    if (totalInches < 48 || totalInches > 84) {
      setHeightError("Please enter a height between 4'0\" and 7'0\".");
      return;
    }
    setHeightError("");
    setScreen("photo");
  }

  const picker = <input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />;

  if (screen === "landing") return <section aria-labelledby="assessment-landing-title" className="space-y-5"><div><p className="eyebrow text-cloudText">Free first-week assessment</p><h1 id="assessment-landing-title" className="display mt-3 text-[38px] leading-[0.96] text-bone sm:text-[50px]">A practical first week, built around you.</h1><p className="mt-4 text-[17px] leading-[1.5] text-bone/90">Answer a few easy questions. Add a photo only if you want. Get a clear starting plan for food, lifting, cardio, steps and sleep.</p></div><button type="button" onClick={() => setScreen("age")} className={buttonClass}>Start my free assessment</button><figure className="overflow-hidden rounded-[14px] border border-line bg-[#151515]"><Image src="/assessment-ai-scan-hero.png" alt="An anonymous adult body with a visual fitness scan effect" width={768} height={960} className="h-[220px] w-full object-cover object-top sm:h-[280px]" priority /><figcaption className="p-4 text-[14px] leading-[1.5] text-bone/85">No tape measurements. No diagnosis. Just a simple starting point you can act on this week.</figcaption></figure></section>;
  if (screen === "age") return <section aria-labelledby="assessment-age-title" className="assessment-basic-step flex min-h-[calc(var(--assessment-visible-height,100dvh)-150px)] flex-col justify-center"><div className="flex items-center justify-between gap-4"><p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">Step 1 of 3</p><button type="button" onClick={() => { setAgeError(""); setScreen("landing"); }} className="text-[13px] text-mute underline underline-offset-4 hover:text-bone">Back</button></div><h1 id="assessment-age-title" className="display mt-3 text-[36px] leading-[0.98] text-bone">How old are you?</h1><p className="mt-4 text-[17px] leading-[1.5] text-bone/90">This helps us keep your first-week recommendation realistic.</p><form onSubmit={(e) => { e.preventDefault(); handleAgeContinue(); }} className="mt-8"><label className="block"><span className="sr-only">Age</span><input autoFocus enterKeyHint="next" value={age} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })} onChange={(event) => { setAge(event.target.value.replace(/\D/g, "")); if (ageError) setAgeError(""); }} inputMode="numeric" className={`${inputClass} ${ageError ? "border-cloudText focus:border-cloudText" : ""}`} placeholder="e.g. 38" aria-invalid={!!ageError} aria-describedby={ageError ? "age-error" : undefined} /></label>{ageError && <p id="age-error" role="alert" className="mt-2 text-[14px] font-medium text-cloudText">{ageError}</p>}<button type="submit" className={`${buttonClass} mt-5`}>Continue</button></form></section>;
  if (screen === "height") return <section aria-labelledby="assessment-height-title" className="assessment-basic-step flex min-h-[calc(var(--assessment-visible-height,100dvh)-150px)] flex-col justify-center"><div className="flex items-center justify-between gap-4"><p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">Step 2 of 3</p><button type="button" onClick={() => { setHeightError(""); setScreen("age"); }} className="text-[13px] text-mute underline underline-offset-4 hover:text-bone">Back</button></div><h1 id="assessment-height-title" className="display mt-3 text-[36px] leading-[0.98] text-bone">How tall are you?</h1><p className="mt-4 text-[17px] leading-[1.5] text-bone/90">A quick height check gives your starting point better context.</p><form onSubmit={(e) => { e.preventDefault(); handleHeightContinue(); }} className="mt-8"><div className="grid grid-cols-2 gap-4"><label className="text-[18px] font-semibold text-bone">Feet<input autoFocus enterKeyHint="next" value={heightFt} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })} onChange={(event) => { setHeightFt(event.target.value.replace(/\D/g, "")); if (heightError) setHeightError(""); }} inputMode="numeric" className={`${inputClass} mt-2 ${heightError ? "border-cloudText focus:border-cloudText" : ""}`} placeholder="5" /></label><label className="text-[18px] font-semibold text-bone">Inches<input enterKeyHint="done" value={heightIn} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })} onChange={(event) => { setHeightIn(event.target.value.replace(/\D/g, "")); if (heightError) setHeightError(""); }} inputMode="numeric" className={`${inputClass} mt-2 ${heightError ? "border-cloudText focus:border-cloudText" : ""}`} placeholder="10" /></label></div>{heightError && <p role="alert" className="mt-2 text-[14px] font-medium text-cloudText">{heightError}</p>}<button type="submit" className={`${buttonClass} mt-5`}>Continue</button></form></section>;
  if (photo) return <section aria-labelledby="assessment-photo-preview-title" className="space-y-5"><div className="flex items-center justify-between gap-4"><p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">Step 3 of 3</p><button type="button" onClick={() => { setPhoto(null); setPreview(""); setError(""); }} className="text-[13px] text-mute underline underline-offset-4 hover:text-bone">Back</button></div><div><h1 id="assessment-photo-preview-title" className="display mt-3 text-[36px] leading-[0.98] text-bone">{status === "loading" ? "Looking at your starting point." : "Ready for your read?"}</h1><p className="mt-4 text-[17px] leading-[1.5] text-bone/90">{status === "loading" ? "We are using this one photo to build a visual starting estimate." : "This is the photo we will use. Check it, then start your analysis when you are ready."}</p></div><div className="relative overflow-hidden rounded-[14px] border border-line bg-[#151515]"><img src={preview} alt="Your selected assessment photo" className={`h-[420px] w-full object-cover ${status === "loading" ? "opacity-45" : ""}`} />{status === "loading" && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center bg-ink/55 px-6 text-center"><span className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/30 border-t-white" /><p className="mt-5 text-[19px] font-semibold text-white">Analyzing your photo…</p><p className="mt-2 text-[14px] leading-[1.5] text-white/80">Finding a practical place to start.</p></div>}</div>{error && <p role="alert" className="rounded-[10px] border border-red-300/40 bg-red-950/20 p-4 text-[15px] leading-[1.5] text-red-100">{error}</p>}{status !== "loading" && <div className="space-y-3"><button type="button" onClick={analyze} className={buttonClass}>{status === "error" ? "Try my photo again" : "Analyze my photo"}</button><button type="button" onClick={() => inputRef.current?.click()} className="min-h-[48px] w-full text-[15px] text-mute underline underline-offset-4">Choose a different photo</button>{status === "error" && <button type="button" onClick={() => onUseQuestions(basics)} className="min-h-[56px] w-full rounded-[10px] border-2 border-cloud px-5 text-[16px] font-semibold text-bone">Continue with questions instead</button>}</div>}{picker}</section>;
  return <section aria-labelledby="photo-assessment-title" data-assessment-photo-choice className="space-y-4"><div className="flex items-center justify-between gap-4"><p className="text-[12.5px] uppercase tracking-[0.14em] text-mute2">Step 3 of 3</p><button type="button" onClick={() => setScreen("height")} className="text-[13px] text-mute underline underline-offset-4 hover:text-bone">Back</button></div><div><h1 id="photo-assessment-title" className="display mt-3 text-[36px] leading-[0.98] text-bone">Want to add a photo?</h1><p className="mt-4 text-[17px] leading-[1.45] text-bone/90">Optional. A photo gives a visual starting point. Face optional; fitted clothes work. Skip it and we will still build your full profile.</p></div><figure className="overflow-hidden rounded-[14px] border border-line bg-[#151515]"><Image src="/assessment-ai-scan-hero.png" alt="An anonymous adult body with a visual fitness scan effect" width={768} height={960} className="h-[180px] w-full object-cover object-top sm:h-[260px]" priority /></figure>{picker}<div data-assessment-photo-actions className="space-y-3"><button type="button" onClick={() => inputRef.current?.click()} className={buttonClass}>Choose a photo</button><button type="button" onClick={() => onUseQuestions(basics)} className="min-h-[54px] w-full rounded-[10px] border-2 border-cloud px-5 text-center text-[17px] font-semibold text-bone">Continue without a photo</button></div></section>;
}

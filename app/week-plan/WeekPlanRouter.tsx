"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { subscribeEmail } from "@/app/lib/subscribe";
import { FREE_GUIDE_PDF_URL } from "@/app/lib/subscribe-constants";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RailSheet } from "@/vendor/rail-kit";

type SituationKey = "travel" | "dinners" | "schedule" | "restart";

type Situation = {
  title: string;
  choiceLabel: string;
  image: { src: string; alt: string };
  prompt: string;
  steps: { title: string; bullets: [string, string]; detail: string }[];
  guide: { href: string; label: string };
};

const SITUATIONS: Record<SituationKey, Situation> = {
  travel: {
    title: "Travel is disrupting the week",
    choiceLabel: "Travel",
    image: {
      src: "/images/week-plan/travel-week-plan.png",
      alt: "Traveler packing a carry-on beside training shoes",
    },
    prompt: "Choose the smallest training window before the trip starts.",
    steps: [
      { title: "Calendar it first", bullets: ["Book two short sessions", "Choose the times before you leave"], detail: "A travel week does not need the perfect training split. Two sessions you can actually protect beat a plan that waits for the week to calm down." },
      { title: "Keep food simple", bullets: ["Pick one reliable protein choice", "Repeat it on travel days"], detail: "Decide your reliable order before you are hungry or in an airport. The goal is a familiar choice you can repeat, not a perfect meal." },
      { title: "Restart at home", bullets: ["Train on your first normal day back", "Do not make up missed sessions"], detail: "The fastest way back is one normal session at home. Skipping food or adding punishment workouts usually makes the next week harder." },
    ],
    guide: { href: "/nutrition/nutrition-for-frequent-business-travelers", label: "Read the travel nutrition guide" },
  },
  dinners: {
    title: "Client dinners or restaurant meals are disrupting the week",
    choiceLabel: "Meals out",
    image: { src: "/images/fast-food-guide/protein-fast-food-hero.png", alt: "Protein-focused fast food meal" },
    prompt: "Make the next meal easier, then return to the normal plan at the next meal.",
    steps: [
      { title: "Use a photo when you need help", bullets: ["Take a photo of the menu", "Ask AI for two protein-first choices"], detail: "A menu photo can turn an awkward decision into two clear options. Use AI to read what is in front of you, then pick the choice you can enjoy and repeat." },
      { title: "Decide drinks early", bullets: ["Choose before you arrive", "Do not negotiate at the table"], detail: "A simple decision before the restaurant removes the in-the-moment pressure. Pick what feels realistic for this dinner and move on." },
      { title: "Return at the next meal", bullets: ["Eat normally tomorrow", "Skip the punishment workout"], detail: "One restaurant meal does not need a reset. Returning to your normal next meal is more useful than trying to erase dinner." },
    ],
    guide: { href: "/resources/high-protein-fast-food-guide", label: "See practical restaurant-order ideas" },
  },
  schedule: {
    title: "Work is pushing training to the side",
    choiceLabel: "Work got too busy",
    image: {
      src: "/images/week-plan/busy-work-week-plan.png",
      alt: "Busy professional working at a standing desk with training shoes nearby",
    },
    prompt: "Protect the minimum version of the plan before chasing the ideal version.",
    steps: [
      { title: "Choose two sessions", bullets: ["Keep them short", "Make them realistic this week"], detail: "Two shorter sessions protect the habit when work gets intense. The target is the minimum plan that still makes you feel like yourself." },
      { title: "Put them on the calendar", bullets: ["Attach them to an existing block", "Treat that time as spoken for"], detail: "A plan becomes easier to keep when it has a home in your calendar. Use a time that already has structure instead of hoping motivation appears later." },
      { title: "Use the fallback", bullets: ["Walk or train at home", "Keep the week alive"], detail: "Your fallback is not failure. A walk, quick home session, or short gym visit keeps one busy day from becoming a lost week." },
    ],
    guide: { href: "/for/remote-workers", label: "See the remote-worker training reset" },
  },
  restart: {
    title: "You fell off and need a restart",
    choiceLabel: "I fell off",
    image: { src: "/coaching/kris-client-training-session.jpg", alt: "Client training with Kris" },
    prompt: "Restart from the next decision, not from a promise to be perfect Monday.",
    steps: [
      { title: "Do one session", bullets: ["Choose the next 48 hours", "Make it easy to start"], detail: "The restart begins with one real session, not a promise about a future Monday. Choose a time you can honestly keep in the next two days." },
      { title: "Repeat one meal", bullets: ["Pick an easy familiar meal", "Use it on a hard day"], detail: "A repeat meal reduces decisions when energy is low. It does not need to be exciting; it needs to be there when your day gets messy." },
      { title: "Learn before adding rules", bullets: ["Name what actually broke", "Change one thing at a time"], detail: "Before adding restrictions, identify the moment the old plan stopped fitting your real life. One useful adjustment is better than ten new rules." },
    ],
    guide: { href: "/for/accountability", label: "See how accountability works" },
  },
};

const choices = Object.entries(SITUATIONS) as [SituationKey, Situation][];

const RESTAURANT_AI_PHOTO_PROMPT = "I’m at a restaurant. Based only on this photo, give me the two simplest protein-first choices that fit a normal week. Name any easy swap. Do not guess portions or macros that are not shown.";

export default function WeekPlanRouter() {
  const [showChoices, setShowChoices] = useState(false);
  const [selected, setSelected] = useState<SituationKey | null>(null);
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(null);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [copiedPhotoPrompt, setCopiedPhotoPrompt] = useState(false);
  const situation = started && selected ? SITUATIONS[selected] : null;

  function choose(key: SituationKey) {
    setSelected(key);
    trackClientEvent("content_interaction", {
      interaction_id: `week_plan_${key}`,
      content_type: "week_plan_router",
      interaction_type: "situation_selected",
      situation: key,
    });
  }

  function continueToPlan() {
    if (!selected) return;
    setIsLoading(true);
    window.setTimeout(() => {
      setStarted(true);
      setIsLoading(false);
    }, 650);
  }

  function chooseDifferentSituation() {
    setSelected(null);
  }

  function openStep(index: number) {
    setOpenStepIndex(index);
    setShowDetailForm(false);
    trackClientEvent("content_interaction", {
      interaction_id: `week_plan_step_${selected}_${index + 1}`,
      content_type: "week_plan_router",
      interaction_type: "step_detail_opened",
      situation: selected ?? "unknown",
      step_number: index + 1,
    });
  }

  async function copyRestaurantPhotoPrompt() {
    try {
      await navigator.clipboard.writeText(RESTAURANT_AI_PHOTO_PROMPT);
      setCopiedPhotoPrompt(true);
      trackClientEvent("content_interaction", {
        interaction_id: "week_plan_dinners_photo_prompt_copy",
        content_type: "week_plan_router",
        interaction_type: "restaurant_photo_prompt_copied",
        situation: "dinners",
      });
    } catch {
      // Clipboard permission can be unavailable in an embedded browser. Keep
      // this sheet open so the free advice and optional next step remain usable.
      setCopiedPhotoPrompt(false);
    }
  }

  async function saveDetailedPlan(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setContactStatus("loading");
    const result = await subscribeEmail({ name, email, source: `week-plan-reset:${selected}:${(openStepIndex ?? 0) + 1}` });
    if (result.status === "ok" || result.status === "already_subscribed") {
      setContactStatus("sent");
      trackClientEvent("lead", { form_id: "week_plan_detailed", lead_type: "week_plan" });
      return;
    }
    setContactStatus("error");
  }

  if (!showChoices) {
    return (
      <section aria-labelledby="week-plan-intro-title" className="relative min-h-[590px] overflow-hidden rounded-[20px] border border-line bg-ink3 sm:min-h-[620px]">
        <Image
          src="/coaching/kris-weekly-review-coach.jpg"
          alt="Kris Oddo ready to help build a practical weekly plan"
          fill
          priority
          sizes="(max-width: 760px) calc(100vw - 3rem), 760px"
          className="object-cover object-[center_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/12" aria-hidden="true" />
        <div className="relative flex min-h-[590px] flex-col justify-end p-6 sm:min-h-[620px] sm:p-8">
          <p className="eyebrow text-cloudText">Your real week</p>
          <h1 id="week-plan-intro-title" className="display mt-3 max-w-[11ch] text-[46px] leading-[0.94] text-bone sm:text-[58px]">A plan that fits your life.</h1>
          <p className="mt-4 max-w-[31ch] text-[18px] leading-[1.45] text-bone/90">One question. Three clear moves. No perfect week required.</p>
          <button type="button" onClick={() => setShowChoices(true)} className="mt-6 min-h-[60px] w-full rounded-[10px] bg-cloud2 px-5 text-[18px] font-semibold text-white">Start my plan</button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="flex min-h-[340px] flex-col justify-center" aria-live="polite" data-week-plan-loader>
        <p className="eyebrow text-cloudText">Your week, simplified</p>
        <h1 className="display mt-3 text-[42px] leading-[0.98] text-bone sm:text-[52px]">
          Building your plan.
        </h1>
        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full w-2/3 rounded-full bg-cloud motion-safe:animate-pulse" />
        </div>
      </section>
    );
  }

  if (situation && selected) {
    const openedStep = openStepIndex === null ? null : situation.steps[openStepIndex];
    return (
      <section aria-live="polite" data-week-plan-result>
        <p className="eyebrow text-cloudText">Your next three moves</p>
        <h2 className="mt-2 text-[25px] font-semibold leading-[1.15] text-bone md:text-[31px]">
          {situation.title}
        </h2>
        <p className="mt-3 max-w-[42ch] text-[19px] leading-[1.45] text-bone/85">
          {situation.prompt}
        </p>
        <p className="mt-7 text-[16px] font-semibold text-mute">Swipe, then tap a card when you want the why.</p>
        <ol className="-mx-6 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none]" aria-label="Three next steps">
          {situation.steps.map((step, index) => (
            <li key={step.title} className="min-w-[82vw] snap-center sm:min-w-[430px]">
              <button type="button" onClick={() => openStep(index)} aria-haspopup="dialog" className="flex min-h-[300px] w-full flex-col justify-between rounded-[16px] border border-line2 bg-ink3/45 p-6 text-left transition hover:border-cloud focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud">
                <span className="text-[18px] font-semibold tracking-[0.08em] text-cloudText" aria-hidden="true">0{index + 1}</span>
                <div className="mt-8">
                  <h3 className="text-[29px] font-semibold leading-[1.08] text-bone">{step.title}</h3>
                  <ul className="mt-5 space-y-3 text-[19px] leading-[1.32] text-bone/90">
                    {step.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-[0.42em] h-2.5 w-2.5 shrink-0 rounded-full bg-cloud" aria-hidden="true" />{bullet}</li>)}
                  </ul>
                </div>
                <span className="mt-8 text-[16px] font-semibold text-cloudText">Tap for the simple why</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[17px] text-mute">
          <Link href={situation.guide.href} className="underline underline-offset-4 hover:text-bone" data-cta="week_plan_guide" data-cta-position="week_plan_result">
            {situation.guide.label}
          </Link>
        </p>
        <RailSheet
          open={openedStep !== null}
          onClose={() => setOpenStepIndex(null)}
          title={openedStep?.title ?? "Your next move"}
          badge={openStepIndex === null ? undefined : `Move ${openStepIndex + 1} of 3`}
          description={openedStep ? <p className="text-[18px] leading-[1.5]">{openedStep.detail}</p> : null}
          /* The choice already carries the situation's image. Keeping the
              detail sheet text-first leaves the prompt and the optional
              email step inside the phone viewport instead of below it. */
          layout="takeover"
          source="week-plan-step-detail"
          className="rail-sheet--week-plan"
          finePrint="No phone number. No pressure to book a call."
        >
          {selected === "dinners" && openStepIndex === 0 ? (
            <div className="mt-6 rounded-[12px] border border-cloud/50 bg-cloud/[0.06] p-4" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
              <p className="text-[18px] font-semibold text-bone">Take a photo. Ask for two simple choices.</p>
              <p className="mt-2 text-[16px] leading-[1.45] text-bone/85">Take a photo of the menu or plate, then paste this into the AI you use.</p>
              <button type="button" onClick={(event) => { event.stopPropagation(); void copyRestaurantPhotoPrompt(); }} className="mt-4 min-h-[54px] w-full rounded-[9px] border border-cloud/65 px-4 text-[16px] font-semibold text-bone transition hover:bg-cloud/[0.12]">
                {copiedPhotoPrompt ? "AI photo prompt copied" : "Copy the AI photo prompt"}
              </button>
              <p className="mt-3 text-[14px] leading-[1.4] text-mute">AI can help you read the menu. Confirm ingredients with the restaurant for allergies or medical needs.</p>
            </div>
          ) : null}
          {contactStatus === "sent" ? (
            <div className="mt-6 rounded-[12px] border border-cloud/50 bg-cloud/[0.08] p-5">
              <p className="text-[19px] font-semibold text-bone">Your 5-Day Reset is ready.</p>
              <p className="mt-2 text-[16px] leading-[1.45] text-bone/85">Open it now, save it for the next hard week, and use the three moves above today.</p>
              <a href={FREE_GUIDE_PDF_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-[54px] w-full items-center justify-center rounded-[9px] bg-cloud2 px-4 text-[16px] font-semibold text-white">Open the 5-Day Reset</a>
            </div>
          ) : showDetailForm ? (
            <form onSubmit={saveDetailedPlan} className="mt-6 space-y-3" aria-label="Get the detailed weekly plan">
              <p className="text-[17px] leading-[1.45] text-bone/85">Get the free 5-Day Reset: a simple day-by-day plan for training, food, sleep, and one habit. No phone number. No call.</p>
              <input required value={name} onChange={(event) => setName(event.target.value)} className="apply-input w-full" placeholder="First name" aria-label="First name" />
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="apply-input w-full" placeholder="Email" aria-label="Email" />
              <button disabled={contactStatus === "loading"} className="min-h-[58px] w-full rounded-[10px] bg-cloud2 px-5 text-[17px] font-semibold text-white disabled:opacity-50">{contactStatus === "loading" ? "Getting your Reset…" : "Get the 5-Day Reset"}</button>
              {contactStatus === "error" ? <p role="alert" className="text-[15px] text-red-200">We could not save that. Please try again.</p> : null}
            </form>
          ) : (
            <div className="mt-6 rounded-[12px] border border-cloud/50 bg-cloud/[0.06] p-4">
              <p className="text-[18px] font-semibold text-bone">Want a simple reset you can keep?</p>
              <p className="mt-2 text-[16px] leading-[1.45] text-bone/85">Get the free 5-Day Reset. It is a clear day-by-day version for a week that went sideways.</p>
              <button type="button" onClick={() => setShowDetailForm(true)} className="mt-4 min-h-[54px] w-full rounded-[9px] bg-cloud2 px-4 text-[16px] font-semibold text-white">Get the 5-Day Reset</button>
            </div>
          )}
        </RailSheet>
      </section>
    );
  }

  return (
    <section aria-labelledby="week-plan-question" data-week-plan-router>
      <p className="eyebrow text-cloudText">One quick question</p>
      <h1 id="week-plan-question" className="display mt-3 text-[40px] leading-[0.98] text-bone sm:text-[48px] md:text-[56px]">
        What got in the way?
      </h1>
      {selected ? (
        <div className="overflow-hidden rounded-[16px] border border-cloud bg-cloud/[0.06]" aria-live="polite">
          <div className="relative h-[230px]">
            <Image src={SITUATIONS[selected].image.src} alt={SITUATIONS[selected].image.alt} fill className="object-cover" sizes="(max-width: 560px) 100vw, 560px" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/65 to-transparent p-5 pt-16"><p className="text-[25px] font-semibold text-bone">{SITUATIONS[selected].choiceLabel}</p></div>
          </div>
          <div className="p-3">
            <button type="button" onClick={continueToPlan} className="min-h-[60px] w-full rounded-[9px] bg-cloud2 px-5 text-[18px] font-semibold text-white">Show my 3-step plan</button>
            <button type="button" onClick={chooseDifferentSituation} className="mx-auto mt-3 block min-h-[40px] px-3 text-[15px] text-mute underline underline-offset-4">Pick a different situation</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Choose what got in the way">
          {choices.map(([key, choice]) => (
            <button key={key} type="button" onClick={() => choose(key)} data-cta={`week_plan_${key}`} data-cta-position="week_plan_router" className="group relative min-h-[152px] overflow-hidden rounded-[14px] border border-line text-left">
              <Image src={choice.image.src} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width: 560px) 50vw, 280px" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
              <span className="absolute inset-x-3 bottom-3 text-[19px] font-semibold leading-[1.05] text-white">{choice.choiceLabel}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

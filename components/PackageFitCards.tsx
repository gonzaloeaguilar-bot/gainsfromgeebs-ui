"use client";
import { ctaForPath } from "@/lib/ctaCopy";

// Three cards that answer the questions the package list cannot: what the
// 30-day intensive is, whether online coaching suits you at all, and how it
// compares with an app, a local trainer, or ChatGPT. Each one opens a sheet
// so the page stays short and the reading is voluntary.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { SCHOLARSHIP_TERMS } from "@/lib/scholarshipAnchors";

/** Sole call site is app/packages/page.tsx. Copy from lib/ctaCopy.ts. */
const PACKAGES_CTA = ctaForPath("/packages");

const INTENSIVE_HREF =
  "https://titanforgefit.com/coaching-intensive?utm_source=gainsfromgeebs&utm_medium=referral&utm_campaign=geebs_titanforge_intensive_bridge&utm_content=packages_fit_card";

type CardId = "intensive" | "fit" | "compare";

const CARDS: {
  id: CardId;
  eyebrow: string;
  title: string;
  teaser: string;
  feature?: boolean;
}[] = [
  {
    id: "intensive",
    eyebrow: "Start in 30 days, not 6 months",
    title: "The 30-Day Coaching Intensive",
    teaser:
      "Thirty days of 1:1 coaching with two coaches, weekly check-ins, and a free application. The short way to find out what coaching actually feels like.",
    feature: true,
  },
  {
    id: "fit",
    eyebrow: "Before you choose a package",
    title: "Is online coaching for you?",
    teaser: "Who it works for, and who should save their money. Both lists, honestly.",
  },
  {
    id: "compare",
    eyebrow: "The other options",
    title: "Coach, app, trainer, or ChatGPT?",
    teaser: "What each one actually gives you, and what it cannot do.",
  },
];

export default function PackageFitCards() {
  const [openCard, setOpenCard] = useState<CardId | null>(null);
  const triggerRefs = useRef<Partial<Record<CardId, HTMLButtonElement | null>>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  const close = useCallback(() => {
    const previous = openCard;
    setOpenCard(null);
    // A card closed with a thumb must not stay looking selected, and keyboard
    // users have to land back where they were.
    if (previous) triggerRefs.current[previous]?.focus();
  }, [openCard]);

  useEffect(() => {
    if (!openCard) return;
    headingRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.body.classList.add("has-open-sheet");
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.classList.remove("has-open-sheet");
    };
  }, [openCard, close]);

  function open(id: CardId) {
    setOpenCard(id);
    trackClientEvent("fit_card_open", { card: id, page_type: "packages" });
  }

  const active = CARDS.find((card) => card.id === openCard);

  return (
    <section className="fit-cards" aria-labelledby="packages-fit-cards-heading">
      <p className="eyebrow text-cloudText">Make the call with real information</p>
      <h2 id="packages-fit-cards-heading" className="display fit-cards__heading">
        Three things worth knowing first.
      </h2>

      <div className="fit-cards__grid">
        {CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            ref={(node) => {
              triggerRefs.current[card.id] = node;
            }}
            className={`fit-card${card.feature ? " fit-card--feature" : ""}`}
            onClick={() => open(card.id)}
            aria-haspopup="dialog"
          >
            <span className="fit-card__eyebrow">{card.eyebrow}</span>
            <span className="fit-card__title">{card.title}</span>
            <span className="fit-card__teaser">{card.teaser}</span>
            <span className="fit-card__more">
              Open <span aria-hidden="true">→</span>
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fit-sheet" role="presentation" onClick={close}>
          <div
            className="fit-sheet__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fit-sheet-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fit-sheet__bar">
              <p className="eyebrow text-cloudText">{active.eyebrow}</p>
              <button type="button" className="fit-sheet__close" onClick={close} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h3 id="fit-sheet-heading" ref={headingRef} tabIndex={-1} className="fit-sheet__title">
              {active.title}
            </h3>
            <div className="fit-sheet__body">
              {active.id === "intensive" ? <IntensiveBody /> : null}
              {active.id === "fit" ? <FitBody /> : null}
              {active.id === "compare" ? <CompareBody /> : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function IntensiveBody() {
  return (
    <>
      <p>
        Run with Titan Forge: {SCHOLARSHIP_TERMS.duration}, coached by{" "}
        {SCHOLARSHIP_TERMS.coaches}, with {SCHOLARSHIP_TERMS.cadence}.
      </p>
      <ul className="fit-sheet__list">
        <li>{SCHOLARSHIP_TERMS.spots} are available.</li>
        <li>{SCHOLARSHIP_TERMS.applyCost}</li>
        <li>{SCHOLARSHIP_TERMS.selectedCost}</li>
        <li>The application takes {SCHOLARSHIP_TERMS.timeToApply}.</li>
      </ul>
      <p>
        It suits someone who wants a short, coached block before committing to
        months of 1:1 work, or who wants to see how the coaching runs first.
      </p>
      <div className="fit-sheet__actions">
        <a
          className="btn btn-primary"
          href={INTENSIVE_HREF}
          data-analytics-event="titanforge_intensive_referral_click"
          data-analytics-link-kind="titanforge_intensive_referral"
        >
          See the 30-day intensive
          <span aria-hidden="true">→</span>
        </a>
        <Link href="/scholarship" className="fit-sheet__secondary">
          How the scholarship works
        </Link>
      </div>
    </>
  );
}

function FitBody() {
  return (
    <>
      <p>
        Coaching works when someone wants a coach, not another file to download.
        The application exists so nobody wastes a call.
      </p>
      <div className="fit-sheet__cols">
        <div>
          <h4>Strong fit</h4>
          <ul className="fit-sheet__list">
            <li>You can train 3-5 days most weeks, even if the schedule is messy.</li>
            <li>You want a coach looking at your food, training, sleep, and follow-through.</li>
            <li>You are ready for a 3-6 month block, not another two-week reset.</li>
          </ul>
        </div>
        <div>
          <h4>Not the fit</h4>
          <ul className="fit-sheet__list fit-sheet__list--muted">
            <li>You only want a cheap template or a plan to ignore privately.</li>
            <li>
              You will not answer check-ins, send context, or tell the truth when the week breaks.
            </li>
            <li>
              You need a quick fix before you are ready to change the routine that caused the
              problem.
            </li>
          </ul>
        </div>
      </div>
      <div className="fit-sheet__actions">
        <Link className="btn btn-primary" href="/apply" data-cta={PACKAGES_CTA.id}>
          {PACKAGES_CTA.label}
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/geebs-method" className="fit-sheet__secondary">
          How the coaching runs
        </Link>
      </div>
    </>
  );
}

function CompareBody() {
  return (
    <>
      <p>
        Every option below can help someone. The difference is who adjusts the
        plan when your week does not go to plan.
      </p>
      <dl className="fit-sheet__compare">
        <div>
          <dt>An app or template</dt>
          <dd>
            Gives you a plan and tracking. It cannot see your form, your week, or why you stopped,
            and it never changes the plan for you.
          </dd>
        </div>
        <div>
          <dt>ChatGPT</dt>
          <dd>
            Answers questions well and costs almost nothing. It has no view of your history, your
            data, or your last four weeks unless you keep feeding it, and nobody is accountable for
            the result.
          </dd>
        </div>
        <div>
          <dt>A local personal trainer</dt>
          <dd>
            Hands-on for the hour you are in the gym, and usually priced per session. The other
            166 hours, including the food, are still on you.
          </dd>
        </div>
        <div>
          <dt>1:1 online coaching with Kris</dt>
          <dd>
            A plan built for your schedule, daily accountability, form review, and a weekly call
            where the last seven days get reviewed and the next week gets adjusted.
          </dd>
        </div>
      </dl>
      <div className="fit-sheet__actions">
        <Link className="btn btn-primary" href="/apply" data-cta={PACKAGES_CTA.id}>
          {PACKAGES_CTA.label}
          <span aria-hidden="true">→</span>
        </Link>
        <span className="fit-sheet__links">
          <Link href="/vs/chatgpt">vs ChatGPT</Link>
          <Link href="/vs/fitness-apps">vs fitness apps</Link>
          <Link href="/vs/hiring-a-personal-trainer">vs a personal trainer</Link>
        </span>
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function FAQ() {
  useEffect(() => {
    // Make accordion summaries keyboard-accessible with aria-expanded
    document.querySelectorAll("details").forEach((d) => {
      const s = d.querySelector("summary");
      if (!s) return;
      s.setAttribute("role", "button");
      s.setAttribute("aria-expanded", d.open ? "true" : "false");
      d.addEventListener("toggle", () =>
        s.setAttribute("aria-expanded", d.open ? "true" : "false")
      );
    });
  }, []);

  return (
    <section aria-labelledby="faq-title" className="relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 section-y">

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          <div className="md:col-span-5 reveal md:sticky md:top-10">
            <p className="eyebrow text-mute2">FAQ</p>
            <h2
              id="faq-title"
              className="display mt-4 text-[34px] sm:text-[44px] md:text-[56px] text-bone leading-[1] max-w-[14ch]"
            >
              Common <span className="display-accent">questions</span>.
            </h2>
            <p className="mt-6 text-[15.5px] text-mute leading-[1.65] max-w-[34ch]">
              Anything not here? The strategy call is where everything specific gets answered.
            </p>
            <a
              href="/faq"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[14px] text-cloudText hover:text-bone transition-colors"
            >
              See all FAQs
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="md:col-span-7 reveal">
            <div className="border-t border-line2">

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">How does the 1:1 work?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  Application → strategy call → if it&apos;s a fit, we start. Custom programming, daily accountability, weekly check-in calls, direct access. Application-based so you know it&apos;s a fit before you commit.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">What is The Geebs Method?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  The Geebs Method is Kris Oddo&apos;s coaching system: hard individualized training, nutrition that supports training, recovery habits, and daily accountability for imperfect weeks.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">Who is the best online fitness coach for busy men?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  For busy men, the best online fitness coach is the one built around a real schedule: individualized programming, asynchronous daily accountability, and weekly check-ins instead of a generic app. That&apos;s how Kris Oddo (NASM-CPT) coaches busy men through The Geebs Method. For an honest, criteria-first comparison, read{" "}
                  <Link href="/blog/best-online-fitness-coaches-for-busy-men" className="underline hover:text-bone">
                    our guide to the best online fitness coaches for busy men
                  </Link>
                  .
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">What happens if my week is not perfect?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  The method assumes real weeks are messy. Missed workouts get moved or adjusted when possible, nutrition is managed across the full week, and daily accountability helps correct the plan before one bad day becomes a reset.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">What&apos;s actually included?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  Training, nutrition guidance, daily accountability, weekly check-ins, direct messaging. Full breakdown happens on the strategy call once we know your situation.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">How much does it cost?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  Exact package options are covered on the strategy call once
                  Kris knows your goals and situation. It&apos;s a real investment
                  in a coach-led process, not an app subscription. If budget is
                  the constraint, the $100 one-time consultation call and the $24.99 community are the lower-cost options.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">How often will I talk to Kris?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  Throughout the week. Kris uses daily messages to help map the day: meals, training window, sleep, recovery. The weekly call reviews the data workout by workout so the next week gets adjusted from there.
                </div>
              </details>

              <details>
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">How long does coaching last?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  Most clients work with Kris for 4-9 months. Some stay longer for maintenance; many graduate to self-sufficient once they&apos;ve built the habits and knowledge.
                </div>
              </details>

              <details className="border-b border-line2">
                <summary className="flex items-start justify-between gap-8 py-6 group">
                  <span className="text-bone text-[18px] md:text-[20px] font-medium tracking-[-0.01em] pr-2">What if it&apos;s not for me?</span>
                  <span className="chev shrink-0 mt-1 inline-block text-mute2 group-hover:text-bone transition-colors" aria-hidden="true">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 pr-10 text-[15.5px] text-mute leading-[1.65] max-w-[58ch]">
                  That&apos;s what the application and strategy call are for. You find out if it&apos;s a fit before you commit to anything. If 1:1 isn&apos;t the right path, Kris will point you at the one-time consultation call or the community instead.
                </div>
              </details>

            </div>

            {/* Final inline CTA */}
            <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* NOTE: this component is not imported anywhere (verified 2026-09-23)
                  — unrendered. The label is kept current anyway so that reviving
                  the file cannot quietly reintroduce the retired CTA copy. */}
              <a href="/apply" className="btn btn-primary" data-cta="faq_primary">
                Get coached by Kris
                <span aria-hidden="true">→</span>
              </a>
              <a href="/packages" className="btn btn-secondary">
                Compare packages
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Named-author byline */}
            <p className="mt-10 text-[12.5px] text-mute2 tracking-[0.04em]">
              Coaching by Kris Oddo, NASM-CPT.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

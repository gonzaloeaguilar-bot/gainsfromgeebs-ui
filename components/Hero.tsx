"use client";

import { useEffect } from "react";
import Image from "next/image";
import ProofStrip from "./ProofStrip";
import CalendarStrip from "./CalendarStrip";

export default function Hero() {
  useEffect(() => {
    // Scroll-reveal: progressive enhancement.
    // Default CSS leaves .reveal visible; only hide+animate elements below the fold.
    const all = document.querySelectorAll(".reveal");
    if (!all.length) return;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || prefersReduced) return;

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const pending: Element[] = [];
    all.forEach((el) => {
      const r = el.getBoundingClientRect();
      const inViewport = r.top < vh && r.bottom > 0;
      if (!inViewport) {
        el.classList.add("reveal-pending");
        pending.push(el);
      }
    });
    if (!pending.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-pending");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    pending.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // The singular CTA sweeps a shine the first time the reader scrolls it into
    // view — a one-shot cue that this is the action, not decoration. Gated on
    // reduced-motion, and it fires once (the class stays, the animation is a
    // single run) so it never loops or distracts.
    const cta = document.getElementById("hero-primary-cta");
    if (!cta) return;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shine", "on");
            io.unobserve(e.target);
          }
        }
      },
      // Fire when the button is comfortably in view — i.e. the reader has
      // scrolled down to it, which is the "scroll past it" moment.
      { threshold: 0.9 },
    );
    io.observe(cta);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-grain relative overflow-hidden">
      <svg
        className="cloud-tiny"
        viewBox="0 0 200 130"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ top: "15%", right: "8%", ["--cloud-size" as string]: "90px" }}
      >
        <path
          fill="currentColor"
          d="M30 110 Q10 100 15 80 Q5 60 25 50 Q30 25 60 30 Q75 10 100 25 Q125 5 145 30 Q175 25 180 55 Q195 75 175 95 Q180 115 150 115 L30 110 Z"
        />
      </svg>

      {/* pb-8 on a phone, not pb-16. With the proof band's own top padding this
          boundary cost 128px of nothing between the hero's last line and
          "WHY IT HOLDS" — the largest single gap on the page after the packs.
          Desktop keeps pb-32. */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-0 md:pt-16 pb-8 md:pb-32">
        <div className="hero-stage flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-12 items-stretch md:items-center">

          {/* Left column — copy */}
          <div className="hero-copy flex flex-col md:block md:col-span-7">
            <p className="eyebrow text-cloudText reveal order-2 md:order-none">
              Gains from Geebs · 1:1 Coaching by Kris Oddo
            </p>

            <h1 className="display reveal order-3 md:order-none mt-3 md:mt-7 text-bone text-[36px] sm:text-[50px] md:text-[68px] lg:text-[76px] md:max-w-[16ch] pb-1 leading-[1.02]">
              1:1 online fitness coaching by Kris Oddo.
            </h1>

            {/* Calendar-first hook (experiment calendar_first_v1 arm b): sits
                right under the H1 so the open days are in the first screen. */}
            <div className="reveal order-4 md:order-none mt-4 md:mt-4">
              <CalendarStrip source="homepage_hero" />
            </div>

            <p className="reveal order-8 md:order-none mt-6 md:mt-5 max-w-[56ch] text-[16px] md:text-[19px] leading-[1.55] text-mute">
              Training, nutrition, and accountability built around your real
              week. No assistants, no copy-paste plan, no starting over every
              Monday.
            </p>

            <div className="reveal order-5 md:order-none mt-4 md:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* One CTA. "Compare packages" sat beside this and split the
                  intent of the only screen everyone sees — and it carried no
                  analytics attribute, so there has never been a way to know
                  whether anyone used it. Comparing still happens, on
                  /packages, which the header and the footer both reach. */}
              <a
                id="hero-primary-cta"
                href="/apply?utm_source=site&utm_medium=hero&utm_campaign=contextual_cta&utm_content=home_primary_hero"
                className="btn btn-primary hero-cta w-full sm:w-auto"
                data-analytics-event="cta_click"
                data-analytics-link-kind="hero_apply"
                data-cta="home_primary"
                data-cta-position="hero"
              >
                Get coached by Kris
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="reveal order-6 md:order-none mt-3 md:mt-5 text-[14px] leading-relaxed text-bone/75">
              The application takes under two minutes. There is no payment. If it
              looks like a fit, Kris&apos;s calendar is next.
            </p>

            {/* Supporting credentials follow the primary action. */}
            <ProofStrip className="reveal order-7 md:order-none mt-4 md:mt-8" />

          </div>

          {/* Right column — hero photo of Kris */}
          <div className="hero-photo hero-photo--bleed order-first w-full -mx-6 -mt-[env(safe-area-inset-top)] md:mx-0 md:mt-0 md:order-none md:col-span-5 reveal">
            <figure className="hero-photo__frame relative w-full aspect-[3/2] md:aspect-[4/5] overflow-hidden md:rounded-2xl md:border md:border-line2">
              <Image
                src="/kris-hero-2026.jpg"
                alt="Kris Oddo, NASM-CPT, online fitness coach, in headphones"
                fill
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-[50%_20%] md:object-[50%_22%]"
              />
              <div className="hero-photo__scrim md:hidden" aria-hidden="true" />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}

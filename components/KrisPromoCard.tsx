"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trackClientEvent } from "@/lib/clientAnalytics";

type KrisPromoCardProps = {
  surface: "home" | "money";
  source: string;
};

export default function KrisPromoCard({ surface, source }: KrisPromoCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const isHome = surface === "home";
  const title = isHome
    ? "Ask Kris what to do next."
    : "Not sure which option fits? Ask Kris.";
  const copy = isHome
    ? "Tap the card and tell him what you want to fix first."
    : "He can help you sort training, macros, pricing, and the next step.";

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    let tracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || tracked) return;
        tracked = true;
        trackClientEvent("kris_chat_card_impression", {
          source,
          surface,
        });
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [source, surface]);

  function openChat() {
    trackClientEvent("kris_chat_card_clicked", {
      source,
      surface,
    });
    window.dispatchEvent(new CustomEvent("geebs:open-chat"));
  }

  return (
    <button
      ref={cardRef}
      type="button"
      aria-labelledby={`kris-promo-${surface}-title`}
      className={[
        "kris-promo-card",
        isHome ? "kris-promo-card--home" : "kris-promo-card--money",
      ].join(" ")}
      data-kris-promo-card={surface}
      data-kris-chat-card
      onClick={openChat}
    >
      <span className="kris-promo-card__stage" aria-hidden="true">
        <span className="kris-promo-card__floor" />
        <Image
          src="/companion/kris-listening-v2.png"
          alt=""
          width={256}
          height={320}
          sizes={isHome ? "96px" : "(max-width: 768px) 116px, 158px"}
          className="kris-promo-card__sprite"
          priority={isHome}
        />
        <span className="kris-promo-card__bubble">Ask me anything.</span>
      </span>

      <span className="kris-promo-card__body">
        <span className="eyebrow text-cloudText">Talk to Kris</span>
        <span
          id={`kris-promo-${surface}-title`}
          className="kris-promo-card__title"
        >
          {title}
        </span>
        <span className="kris-promo-card__copy">{copy}</span>

        <span className="kris-promo-card__chips" aria-label="Kris can help with">
          <span>Training</span>
          <span>Macros</span>
          <span>Pricing</span>
        </span>

        <span className="kris-promo-card__action">
          Talk to Kris
          <span aria-hidden="true">-&gt;</span>
        </span>
      </span>
    </button>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./personal-training-deck.module.css";

type SlideKind =
  | "cover"
  | "duo"
  | "system"
  | "phone"
  | "community"
  | "proof"
  | "pricing"
  | "close";

type Media = {
  src: string;
  alt: string;
  label?: string;
  shape?: "portrait" | "phone" | "wide" | "proofShot";
};

type Offer = {
  name: string;
  price: string;
  tag: string;
  bullets: string[];
};

type Slide = {
  kind: SlideKind;
  eyebrow: string;
  title: string;
  subtitle?: string;
  background?: Media;
  media?: Media[];
  pillars?: Array<{ label: string; detail: string }>;
  bullets?: string[];
  stats?: Array<{ value: string; label: string }>;
  offers?: Offer[];
  contact?: string[];
};

const assetBase = "/presentations/personal-training-2026";

const kindClass: Record<SlideKind, string> = {
  cover: styles.cover,
  duo: styles.duo,
  system: styles.system,
  phone: styles.phoneSlide,
  community: styles.community,
  proof: styles.proof,
  pricing: styles.pricing,
  close: styles.close,
};

const slides: Slide[] = [
  {
    kind: "cover",
    eyebrow: "Titan Forge x Gains From Geebs",
    title: "Training that stays alive.",
    subtitle:
      "One coach-led system for training, nutrition, accountability, and the community that keeps clients moving.",
    background: {
      src: "/coaching/kris-client-training-session.jpg",
      alt: "Kris coaching a client during a training session",
    },
    stats: [
      { value: "1:1", label: "coach access" },
      { value: "24/7", label: "support lane" },
      { value: "4", label: "offer levels" },
    ],
  },
  {
    kind: "duo",
    eyebrow: "Meet The Coaches",
    title: "Two coaches. One standard.",
    subtitle:
      "Kris and Steve both coach weight loss, bodybuilding, recomposition, and better habits. Clients are matched by fit, capacity, and the support style they need.",
    background: {
      src: "/coaching/kris-client-form-cues.jpg",
      alt: "Kris coaching form cues",
    },
    media: [
      {
        src: "/coaching/kris-client-training-session.jpg",
        alt: "Coach-led personal training session",
        label: "Training floor coaching",
        shape: "portrait",
      },
      {
        src: "/coaching/kris-client-form-cues.jpg",
        alt: "Kris coaching a client through form cues",
        label: "Form + accountability",
        shape: "portrait",
      },
    ],
  },
  {
    kind: "system",
    eyebrow: "The Coaching System",
    title: "How coaching works.",
    subtitle:
      "The client gets more than workouts. They get a weekly feedback loop built to survive real life.",
    pillars: [
      {
        label: "Accountability",
        detail: "Direct support, check-ins, video feedback, and coach attention between sessions.",
      },
      {
        label: "Custom plans",
        detail: "Training and nutrition shaped around goals, schedule, equipment, and adherence.",
      },
      {
        label: "Community",
        detail: "A private room for research, wins, questions, debate, and performance culture.",
      },
    ],
  },
  {
    kind: "phone",
    eyebrow: "Pillar 01 / Accountability",
    title: "Accountability between workouts.",
    subtitle:
      "Clients have a place to ask, upload, check in, and get corrected before a small miss turns into a lost week.",
    background: {
      src: "/coaching/kris-client-coaching-close.jpg",
      alt: "Kris coaching a client at close range",
    },
    media: [
      {
        src: `${assetBase}/app-dashboard.png`,
        alt: "Coaching app check-in dashboard",
        label: "Check-in loop",
        shape: "phone",
      },
    ],
    bullets: [
      "24/7 access for questions and support.",
      "Daily text accountability from the coach.",
      "Weekly or bi-weekly video feedback.",
    ],
  },
  {
    kind: "phone",
    eyebrow: "Pillar 02 / Training",
    title: "Programming for the real week.",
    subtitle:
      "Workouts, demos, tracking, and form review live in the app so the plan is always clear.",
    background: {
      src: "/coaching/kris-client-training-session.jpg",
      alt: "Kris coaching a client through training",
    },
    media: [
      {
        src: `${assetBase}/app-dashboard.png`,
        alt: "Check-in dashboard in the coaching app",
        label: "Check-in",
        shape: "phone",
      },
      {
        src: `${assetBase}/app-workout-2.png`,
        alt: "Workout tracking screen in the coaching app",
        label: "Tracking",
        shape: "phone",
      },
    ],
    bullets: [
      "Built around goals, fitness level, equipment, and availability.",
      "Demo videos and progress tracking stay in one place.",
      "Clients can send form videos so technique improves with the program.",
    ],
  },
  {
    kind: "phone",
    eyebrow: "Pillar 03 / Nutrition",
    title: "Food structure without the spreadsheet.",
    subtitle:
      "Nutrition is evidence-based, practical, and matched to the client instead of forcing one rigid playbook.",
    media: [
      {
        src: `${assetBase}/app-nutrition-1.png`,
        alt: "Nutrition coaching targets in the coaching app",
        label: "Targets",
        shape: "phone",
      },
      {
        src: `${assetBase}/app-nutrition-2.png`,
        alt: "Nutrition plan in the coaching app",
        label: "Plan",
        shape: "phone",
      },
    ],
    bullets: [
      "Macro-based or detailed plans, depending on the client.",
      "Preferences, schedule, needs, and goals shape the plan.",
      "The target is a stronger relationship with food, not another reset cycle.",
    ],
  },
  {
    kind: "community",
    eyebrow: "Pillar 04 / Community",
    title: "A research room for serious lifters.",
    subtitle:
      "Private Telegram channels keep the work active: studies, Q&A, daily wins, mobility, recovery, longevity, fat loss, supplements, and debate.",
    background: {
      src: `${assetBase}/nutrition-community-preview.png`,
      alt: "Nutrition and community offer preview",
    },
    stats: [
      { value: "Studies", label: "shared and discussed" },
      { value: "Wins", label: "posted daily" },
      { value: "Q&A", label: "keeps momentum" },
    ],
  },
  {
    kind: "proof",
    eyebrow: "Timeline / Results",
    title: "Visible early. Different later.",
    subtitle:
      "The system is built around compounding: better decisions, cleaner feedback, and more consistency over time.",
    media: [
      {
        src: `${assetBase}/result-month-1.png`,
        alt: "Month one result preview",
        label: "Month 1",
        shape: "proofShot",
      },
      {
        src: `${assetBase}/result-year-2.png`,
        alt: "Year two result preview",
        label: "Year 2",
        shape: "proofShot",
      },
      {
        src: `${assetBase}/result-client-1.jpg`,
        alt: "Client progress image",
        label: "Client progress",
        shape: "portrait",
      },
      {
        src: `${assetBase}/result-client-2.jpg`,
        alt: "Second client progress image",
        label: "Follow-up",
        shape: "portrait",
      },
    ],
  },
  {
    kind: "pricing",
    eyebrow: "Packages",
    title: "Coaching offers.",
    subtitle:
      "Clients choose the support level that fits their goals, schedule, and desired accountability.",
    offers: [
      {
        name: "VIP",
        price: "$750/mo",
        tag: "highest-touch",
        bullets: [
          "Priority daily accountability",
          "FaceTime meal prep",
          "Full grocery and food list",
          "Weekly 30-min Zoom",
        ],
      },
      {
        name: "Standard",
        price: "$400/mo",
        tag: "core coaching",
        bullets: [
          "Macro-based nutrition",
          "Daily accountability",
          "Custom app training",
          "Weekly 15-min phone check-ins",
        ],
      },
    ],
  },
  {
    kind: "pricing",
    eyebrow: "Add-ons",
    title: "Standalone add-ons.",
    subtitle:
      "Nutrition and community can stand alone for clients who need a specific layer of structure.",
    offers: [
      {
        name: "Full Nutrition",
        price: "$200/mo",
        tag: "food structure",
        bullets: [
          "FaceTime meal prep",
          "Full grocery list",
          "Detailed food guidance",
          "No daily support included",
        ],
      },
      {
        name: "Telegram Room",
        price: "$25/mo",
        tag: "research + accountability",
        bullets: [
          "Private Telegram community",
          "Research, Q&A, wins, and debate",
          "Fitness, nutrition, mobility, recovery",
        ],
      },
    ],
  },
  {
    kind: "close",
    eyebrow: "Next Step",
    title: "Choose support. Start the feedback loop.",
    subtitle:
      "A polished training, nutrition, and accountability system Kris can present from the web anytime.",
    background: {
      src: "/coaching/kris-client-coaching-close.jpg",
      alt: "Kris coaching a client at close range",
    },
    contact: ["TitanForgeFit.com", "Kris@TitanForgeFit.com", "@gainsfromgeebs"],
  },
];

function clampSlide(index: number) {
  return Math.max(0, Math.min(index, slides.length - 1));
}

export default function PersonalTrainingDeck() {
  const [active, setActive] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [canFullScreen, setCanFullScreen] = useState(false);
  const [loadedMediaCount, setLoadedMediaCount] = useState(0);
  const loadedMediaRef = useRef(new Set<string>());
  const stageRef = useRef<HTMLElement>(null);
  const slide = slides[active];
  const progress = useMemo(() => (active + 1) / slides.length, [active]);
  const preloadSources = useMemo(() => {
    const sources = new Set<string>();

    for (const deckSlide of slides) {
      if (deckSlide.background) sources.add(deckSlide.background.src);
      for (const item of deckSlide.media ?? []) sources.add(item.src);
    }

    return [...sources];
  }, []);
  const isMediaReady = loadedMediaCount >= preloadSources.length;
  const markMediaLoaded = useCallback((source: string) => {
    if (loadedMediaRef.current.has(source)) return;

    loadedMediaRef.current.add(source);
    setLoadedMediaCount(loadedMediaRef.current.size);
  }, []);

  useEffect(() => {
    document.body.classList.add("presentation-mode");
    return () => document.body.classList.remove("presentation-mode");
  }, []);

  useEffect(() => {
    setCanFullScreen(Boolean(document.fullscreenEnabled && stageRef.current?.requestFullscreen));

    const onFullScreenChange = () => setIsFullScreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isMediaReady) {
        return;
      }

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        setActive((current) => clampSlide(current + 1));
      }
      if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) {
        event.preventDefault();
        setActive((current) => clampSlide(current - 1));
      }
      if (event.key === "Home") setActive(0);
      if (event.key === "End") setActive(slides.length - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMediaReady]);

  async function enterFullScreen() {
    if (!canFullScreen) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }

    const target = stageRef.current ?? document.documentElement;
    await target.requestFullscreen?.().catch(() => undefined);
  }

  return (
    <main className={styles.deckShell}>
      <section
        ref={stageRef}
        className={`${styles.stage} ${kindClass[slide.kind]}`}
        data-slide={active + 1}
        aria-roledescription="carousel"
        aria-label="Titan Forge personal training presentation"
      >
        <SceneBackdrop slide={slide} />

        <div className={styles.deckMark} aria-hidden="true">
          <span>Titan Forge</span>
          <span>Personal Training</span>
        </div>

        <article key={active} className={styles.slide} aria-live="polite">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            {slide.subtitle ? <p className={styles.subtitle}>{slide.subtitle}</p> : null}
            {slide.bullets ? <BulletList bullets={slide.bullets} /> : null}
            {slide.stats ? <StatList stats={slide.stats} /> : null}
            {slide.contact ? <ContactList contact={slide.contact} /> : null}
          </div>

          <div className={styles.visual}>
            {slide.media ? <MediaCluster media={slide.media} kind={slide.kind} /> : null}
            {slide.pillars ? <PillarGrid pillars={slide.pillars} /> : null}
            {slide.offers ? <OfferGrid offers={slide.offers} /> : null}
          </div>
        </article>

        <div className={styles.progressTrack} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>

        {isMediaReady ? (
          <>
            <div className={styles.controls}>
              <button
                type="button"
                onClick={() => setActive((current) => clampSlide(current - 1))}
                disabled={active === 0}
                aria-label="Previous slide"
              >
                Prev
              </button>
              {canFullScreen ? (
                <button
                  type="button"
                  className={styles.fullScreenButton}
                  onClick={enterFullScreen}
                  aria-pressed={isFullScreen}
                >
                  {isFullScreen ? "Exit" : "Full screen"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setActive((current) => clampSlide(current + 1))}
                disabled={active === slides.length - 1}
                aria-label="Next slide"
              >
                Next
              </button>
            </div>

            <nav className={styles.dots} aria-label="Slide selector">
              {slides.map((deckSlide, index) => (
                <button
                  key={deckSlide.title}
                  type="button"
                  className={index === active ? styles.dotActive : undefined}
                  onClick={() => setActive(index)}
                  aria-label={`Go to slide ${index + 1}: ${deckSlide.title}`}
                >
                  <span />
                </button>
              ))}
            </nav>
          </>
        ) : null}

        <div className={styles.slideNumber} aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        <DeckPreloader sources={preloadSources} onSourceReady={markMediaLoaded} />
      </section>
    </main>
  );
}

function DeckPreloader({
  sources,
  onSourceReady,
}: {
  sources: string[];
  onSourceReady: (source: string) => void;
}) {
  return (
    <div className={styles.preloadRack} aria-hidden="true">
      {sources.map((source) => (
        <Image
          key={source}
          src={source}
          alt=""
          width={16}
          height={16}
          loading="eager"
          unoptimized
          sizes="16px"
          onLoad={() => onSourceReady(source)}
          onError={() => onSourceReady(source)}
        />
      ))}
    </div>
  );
}

function SceneBackdrop({ slide }: { slide: Slide }) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      {slide.background ? (
        <Image
          key={slide.background.src}
          src={slide.background.src}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.backdropImage}
        />
      ) : null}
      <div className={styles.backdropScrim} />
      <div className={styles.texture} />
    </div>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className={styles.bullets}>
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}

function StatList({ stats }: { stats: Array<{ value: string; label: string }> }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function ContactList({ contact }: { contact: string[] }) {
  return (
    <div className={styles.contact}>
      {contact.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function MediaCluster({ media, kind }: { media: Media[]; kind: SlideKind }) {
  return (
    <div className={styles.mediaCluster} data-kind={kind} data-count={media.length}>
      {media.map((item) => (
        <figure
          key={`${item.src}-${item.label ?? item.alt}`}
          className={`${styles.mediaFrame} ${item.shape ? styles[item.shape] : ""}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            loading="eager"
            unoptimized
            sizes="(max-width: 900px) 88vw, 46vw"
            style={{
              objectFit: item.shape === "phone" || item.src.endsWith("/logo.png") ? "contain" : "cover",
            }}
          />
          {item.label ? <figcaption>{item.label}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function PillarGrid({ pillars }: { pillars: NonNullable<Slide["pillars"]> }) {
  return (
    <div className={styles.pillars}>
      {pillars.map((pillar, index) => (
        <section key={pillar.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{pillar.label}</h2>
          <p>{pillar.detail}</p>
        </section>
      ))}
    </div>
  );
}

function OfferGrid({ offers }: { offers: Offer[] }) {
  return (
    <div className={styles.offers}>
      {offers.map((offer) => (
        <section key={offer.name}>
          <p>{offer.tag}</p>
          <h2>{offer.name}</h2>
          <strong>{offer.price}</strong>
          <ul>
            {offer.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

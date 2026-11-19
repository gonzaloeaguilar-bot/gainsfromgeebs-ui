"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import TipCapture from "@/components/TipCapture";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { attachPackTilt } from "@/components/packTilt";
import RailSparkle from "@/vendor/rail-kit/RailSparkle";
import {
  getCollectionServerSnapshot,
  getCollectionSnapshot,
  saveCollection,
  subscribeToCollection,
} from "@/lib/packCollection";
import {
  rarityLabels,
  type CardRarity,
  type TopicPack,
} from "@/data/topicPacks";
import styles from "./topicPacks.module.css";

const PACK_PHOTO_ALT: Record<string, string> = {
  recomp: "Close-up of Kris Oddo facing the camera in a grey tank top, with gym machines and a TV behind him",
  "fat-loss": "Kris Oddo in a grey tank top with his hand on his hip, looking to the side against a blue gym wall",
  busy: "Kris Oddo in a grey tank top with a slight smile, standing in front of a gym floor",
  desk: "Kris Oddo smiling with his arms folded on a rail, in front of a gym wall banner",
  nutrition: "Kris Oddo leaning on his folded arms next to a squat rack, looking at the camera",
  coaching: "Head and shoulders portrait of Kris Oddo smiling in an olive polo shirt against a dark grey background",
};

/** How long the tear runs before the cards deal in. Mirrors the keyframe
 *  timings in topicPacks.module.css; the two have to agree or the cards land
 *  before the foil is off. */
const TEAR_MS = 1180;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const rarityClass: Record<CardRarity, string> = {
  common: "",
  rare: styles.rarityRare,
  epic: styles.rarityEpic,
  legendary: styles.rarityLegendary,
};

export default function TopicPackRail({
  packs,
  captureSource,
}: {
  packs: TopicPack[];
  /** When set, the opened pack also carries the tip-first email ask. */
  captureSource?: string;
}) {
  const state = useSyncExternalStore(
    subscribeToCollection,
    getCollectionSnapshot,
    getCollectionServerSnapshot,
  );
  const [activePackId, setActivePackId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const totalCards = useMemo(
    () => packs.reduce((sum, pack) => sum + pack.cards.length, 0),
    [packs],
  );

  const activePack = packs.find((pack) => pack.id === activePackId) ?? null;


  const closeOverlay = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setActivePackId(null);
    setRevealed(false);
    returnFocusRef.current?.focus();
  }, []);

  const openPack = useCallback(
    (pack: TopicPack, trigger: HTMLElement) => {
      returnFocusRef.current = trigger;
      setActivePackId(pack.id);

      const alreadyOpened = state.opened.includes(pack.id);
      const instant = prefersReducedMotion();
      setRevealed(instant);

      if (!instant) {
        timerRef.current = window.setTimeout(() => setRevealed(true), TEAR_MS);
      }

      if (!alreadyOpened) {
        saveCollection({ ...state, opened: [...state.opened, pack.id] });
      }

      trackClientEvent("article_pack_open", {
        pack_id: pack.id,
        pack_name: pack.name,
        repeat_open: alreadyOpened,
        packs_opened: alreadyOpened
          ? state.opened.length
          : state.opened.length + 1,
      });
    },
    [state],
  );

  const markRead = useCallback(
    (pack: TopicPack, href: string, rarity: CardRarity) => {
      const nextRead = state.read.includes(href)
        ? state.read
        : [...state.read, href];
      saveCollection({ ...state, read: nextRead });
      trackClientEvent("article_pack_card_click", {
        pack_id: pack.id,
        card_href: href,
        rarity,
        cards_collected: nextRead.length,
      });
    },
    [state],
  );

  /* Skip the animation on any tap or key while the foil is tearing: a reveal
     you cannot skip is a reveal you resent the second time. */
  const skipTear = useCallback(() => {
    if (revealed) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setRevealed(true);
  }, [revealed]);

  useEffect(() => {
    if (!activePackId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
        return;
      }
      if (!revealed) skipTear();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activePackId, closeOverlay, revealed, skipTear]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const collected = state.read.length;
  const nextUnopened = packs.find((pack) => !state.opened.includes(pack.id));

  /* Attached after paint over whatever cards are in the DOM, rather than one
     handler per card in JSX: the rail re-orders itself as packs are opened
     (unopened first), so binding in render would rebind on every state change
     for no reason. */
  const railRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const root = railRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>("[data-rail-tilt]")];
    const detach = cards.map(attachPackTilt);
    return () => detach.forEach((off) => off());
  }, [state.opened.length, state.read.length]);

  return (
    <section
      data-rail-packs=""
      aria-labelledby="article-packs-heading"
      /* mt-0 on a phone: the homepage band around this already pays its own
         padding, and the two together put 129px of nothing above the eyebrow.
         Measured 2026-09-21 on a 390x664 Safari viewport. Desktop keeps the
         looser rhythm; the border-top still separates it from what came
         before. */
      /* Never folded. PageFolds collapsed this the moment it was dropped into
         a blog article: a retention mechanic shipped closed, behind a "+", is
         the same mistake as folding a summary. Set on the component rather
         than at each call site so it cannot recur wherever this is used. */
      data-no-fold
      className="mt-0 border-t border-line2 pt-7 md:mt-16 md:pt-10"
    >
      <div className="max-w-[720px]">
        <p className="eyebrow text-cloudText">Article packs</p>
        <h2
          id="article-packs-heading"
          className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
        >
          Open a pack instead of scrolling a list.
        </h2>
        <p className="mt-3 text-[15px] leading-[1.65] text-mute">
          Each pack holds five hand-picked reads for one problem. Open it, see
          what is inside, and keep the ones you want. Your progress saves on
          this device.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className={`${styles.progressTrack} w-full max-w-[280px]`}>
          <div
            className={styles.progressFill}
            style={{
              width: `${totalCards ? (collected / totalCards) * 100 : 0}%`,
            }}
          />
        </div>
        <p className="text-[13px] text-mute2" aria-live="polite">
          {`${collected} of ${totalCards} read`}
        </p>
      </div>

      <ul className={styles.rail} ref={railRef} data-rail-tilt-scene="">
        {/* Unopened first, opened pushed to the right.
 
            Gonzalo, looking at the rail after opening two packs: the ones he
            had already been through sat at the FRONT, so reaching a new one
            meant scrolling past dead-looking opened tiles first — the exact
            opposite of what a rail is for. Array.prototype.sort is a stable
            sort (guaranteed since ES2019), so this reorders by opened-status
            alone and never reshuffles two packs that share one. */}
        {[...packs]
          .sort(
            (a, b) =>
              Number(state.opened.includes(a.id)) -
              Number(state.opened.includes(b.id)),
          )
          .map((pack) => {
          const opened = state.opened.includes(pack.id);
          const readInPack = pack.cards.filter((card) =>
            state.read.includes(card.href),
          ).length;
          const finished = opened && readInPack >= pack.cards.length;

          return (
            <li key={pack.id} className="contents">
              <button
                type="button"
                data-rail-tilt=""
                data-rail-tilt-sheen=""
                className={`${styles.pack} ${styles.packHasPhoto} ${
                  opened ? styles.packOpened : "rail-glint"
                }`}
                data-pack-id={pack.id}
                onClick={(event) => openPack(pack, event.currentTarget)}
              >
                <span className={styles.packTop}>
                  {/* "Opened" told the reader a fact about the SYSTEM (a
                      status flag) rather than about the five things they
                      actually care about: did I finish, or am I partway
                      through. Gonzalo: "it needs the user value for this,
                      not internal language." */}
                  <span className={styles.packSeal}>
                    {!opened ? "Sealed" : finished ? "Finished" : "In progress"}
                  </span>
                  <span className={styles.packCount}>
                    {opened
                      ? `${readInPack}/${pack.cards.length} read`
                      : `${pack.cards.length} cards`}
                  </span>
                </span>
                {/* Fills the dead middle of the card — a 3:4 box with two
                    short lines of text top and bottom used to leave a solid
                    black rectangle between them. A closed pack for a sealed
                    one, its lid off once it has been torn — the same shape
                    doing double duty as the pack's only imagery and as a
                    second, wordless signal of its state.

                    Was a padlock (shackle + body in one <path>). At this
                    size the shackle arc alone read as a glowing red "6" —
                    Gonzalo: "still looks ugly" — because a thin open hook is
                    illegible small and has nothing to do with what this
                    thing actually is. A box reads as a box at any size, and
                    it matches what a "pack" is. */}
                {/* FOIL, ON THE SEALED ONES ONLY.
                    Gonzalo asked for photos of Kris or motion here. I looked
                    at the coaching photo set first: they are package portraits
                    shot for a large hero slot — a wide gym scene where his face
                    is a few pixels at this size, one where he is back-turned
                    (which fails the brand's own content QC), one shirtless on a
                    porch that illustrates a coaching call and not "Desk Job
                    Control". A photo that does not read at 200px and does not
                    illustrate the pack is decoration with a face on it.

                    So: motion, and the kit's own. rail-glint is finite by
                    design — "three passes, then it stops. Finite is the whole
                    point: a shimmer that loops is read as a loading state, and
                    a visitor waits for it instead of pressing it." Which is
                    exactly the signal a sealed pack wants: there is something
                    in here, and it has not been opened.

                    Opened packs get none. The glint says unopened; putting it
                    on every card would say nothing. */}
                {/* THE STAMP, and it is a RECORD rather than a reward.
                    The kit draws a hard line here and the vault's own scout
                    landed in the same place: of all gamification only a
                    visible progress meter and a personalised output have
                    measured backing, and RailProgress's source says why —
                    "no points, no badges, no streak a visitor can lose: those
                    turn a decision about paying a coach into a slot machine."

                    So this is not a badge with a score behind it. It is the
                    mark a library card gets: it says you read this pack, it is
                    derived from the five hrefs actually opened, it cannot be
                    farmed and it cannot be taken away. The sparkle fires once
                    when the fifth card lands and then stops — the kit's own
                    note calls a looping glint "un adorno que corre siempre",
                    and twenty cards competing for one thread. */}
                {finished ? (
                  <span className={styles.packStamp} data-rail-tilt-lift="">
                    <RailSparkle source={`pack_complete:${pack.id}`} glints={5} />
                    <span className={styles.packStampMark} aria-hidden="true">✓</span>
                    <span className={styles.packStampWord}>Read</span>
                  </span>
                ) : null}

                {/* Each photo gets its own plain description. The gate and
                    screen readers both treat a missing description as a
                    gap, and six different descriptions are not six identical
                    announcements. */}
                <img
                  data-rail-tilt-lift=""
                  className={styles.packPhoto}
                  src={`/packs/${pack.id}.jpg`}
                  alt={PACK_PHOTO_ALT[pack.id] ?? "Kris Oddo, the coach behind this pack, in the gym"}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={480}
                />
                <span className={styles.packFoil} aria-hidden="true" />
                <span className={styles.packGlyphBacking} aria-hidden="true" />
                <svg
                  className={styles.packGlyph}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  {opened ? (
                    <>
                      <path
                        d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L2.9 12.51a2.12 2.12 0 0 1 .1-3.67Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.09 8.84v8a2 2 0 0 0 1.05 1.76l6.68 3.93a2 2 0 0 0 1.94 0l6.68-3.93A2 2 0 0 0 20.5 16.84v-8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22V12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m7.5 4.27 9 5.15"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m3.3 7 8.7 5 8.7-5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22V12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  )}
                </svg>
                <span className={styles.packName}>{pack.name}</span>
                <span className={styles.packPromise}>{pack.promise}</span>
                <span className={styles.packAction}>
                  {opened ? "Open again →" : "Tear it open →"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {activePack ? (
        <div
          className={styles.overlay}
          data-pack-overlay
          role="dialog"
          aria-modal="true"
          aria-label={`${activePack.name} pack`}
          onClick={skipTear}
        >
          <div className={styles.overlayInner}>
            <div className={styles.overlayBar}>
              <p className="eyebrow text-cloudText">{activePack.name}</p>
              <button
                ref={closeRef}
                type="button"
                className={styles.closeButton}
                onClick={(event) => {
                  event.stopPropagation();
                  closeOverlay();
                }}
              >
                Close
              </button>
            </div>

            {revealed ? (
              <>
                <h3 className="display mt-6 text-[26px] leading-[1.14] text-bone md:text-[32px]">
                  Five reads for: {activePack.promise.replace(/^For /, "")}
                </h3>
                <p className="sr-only" aria-live="polite">
                  {activePack.cards.length} cards revealed.
                </p>

                <div className={styles.cardGrid}>
                  {activePack.cards.map((card, index) => {
                    const isRead = state.read.includes(card.href);
                    return (
                      <Link
                        key={card.href}
                        href={card.href}
                        className={`${styles.card} ${
                          card.rarity === "legendary"
                            ? styles.cardLegendary
                            : ""
                        }`}
                        style={
                          {
                            "--deal-delay": `${index * 130}ms`,
                          } as React.CSSProperties
                        }
                        onClick={() =>
                          markRead(activePack, card.href, card.rarity)
                        }
                      >
                        <span className={styles.cardHead}>
                          <span
                            className={`${styles.rarity} ${
                              rarityClass[card.rarity]
                            }`}
                          >
                            {rarityLabels[card.rarity]}
                          </span>
                          <span
                            className={isRead ? styles.readMark : styles.newMark}
                          >
                            {isRead ? "✓ Read" : "New"}
                          </span>
                        </span>
                        <span className={styles.cardTitle}>{card.title}</span>
                        <span className={styles.cardHook}>{card.hook}</span>
                        <span className={styles.cardGo}>Read it →</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line2 pt-5">
                  <p className="text-[14px] text-mute">
                    {collected} of {totalCards} cards read.
                  </p>
                  {nextUnopened ? (
                    <button
                      type="button"
                      className="min-h-11 rounded-full border border-line2 px-4 text-[13.5px] font-semibold text-bone hover:border-cloudText/60"
                      onClick={(event) => {
                        event.stopPropagation();
                        openPack(nextUnopened, event.currentTarget);
                      }}
                    >
                      Open the {nextUnopened.name} pack
                    </button>
                  ) : (
                    <Link
                      href="/apply"
                      className="min-h-11 rounded-full border border-line2 px-4 py-2.5 text-[13.5px] font-semibold text-bone hover:border-cloudText/60"
                      onClick={(event) => {
                        event.stopPropagation();
                        // Close the modal ourselves instead of waiting for
                        // the route change to unmount it: Next.js keeps this
                        // page rendered (and this overlay's position:fixed,
                        // z-index:80 on top of it) until the new route
                        // finishes loading, so without this the apply page
                        // loaded behind the pack overlay instead of on it.
                        closeOverlay();
                      }}
                    >
                      Every pack opened. Talk to Kris
                    </Link>
                  )}
                </div>

                {captureSource ? (
                  /* The ask lands where the value just did: inside the opened
                     pack, after the cards, still closed until it is pressed. */
                  <div className="mt-5" onClick={(event) => event.stopPropagation()}>
                    <TipCapture
                      source={captureSource}
                      compact
                      question="Want a coaching tip every week too?"
                    />
                  </div>
                ) : null}
              </>
            ) : (
              <div className={styles.tearStage}>
                <div className={styles.burst} aria-hidden="true" />
                <div className={styles.tearPack} aria-hidden="true">
                  <div className={styles.tearLid} />
                </div>
                <p className="sr-only" aria-live="polite">
                  Opening the {activePack.name} pack.
                </p>
                <p className="absolute bottom-3 text-[12.5px] text-mute2">
                  Tap to skip
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

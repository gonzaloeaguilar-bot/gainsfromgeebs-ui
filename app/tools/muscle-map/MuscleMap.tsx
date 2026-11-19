"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { muscles, organs } from "@/data/muscleMap";
import type { BodyPart, MuscleId, OrganId } from "@/data/muscleMap";
import idManifest from "@/data/muscleMapIds.json";
import { trackClientEvent } from "@/lib/clientAnalytics";
import styles from "./MuscleMap.module.css";

export type PostLookup = Record<string, { title: string; href: string }>;

type Mode = "muscles" | "inside";
type PartId = MuscleId | OrganId;
type Face = "front" | "back";
type Intro = "photo" | "scanning" | "done";

const shared = { brand: "geebs", page_type: "service", locale: "en", variant: "control" };
const DRAG_THRESHOLD = 6;
const DEG_PER_PX = 0.6;
const ART = "/tools/muscle-map";
/** The renders are 1000 x 2200; the ID maps are the same frame at half size. */
const FRAME_W = 1000;
const FRAME_H = 2200;
/** A muscle "shows" on a side when it covers at least this many ID-map pixels there. */
const VISIBLE_PX = 1000;

const groups = idManifest.groups as Record<MuscleId, number>;
const ID_TO_MUSCLE = Object.fromEntries(Object.entries(groups).map(([id, n]) => [n, id])) as Record<number, MuscleId>;
const pixelsOn = (id: MuscleId, face: Face) => (idManifest.pixels[face] as Record<string, number>)[id] ?? 0;

/** Organ drawings on the front render, in its 1000 x 2200 frame. */
const organShapes: { id: OrganId; d: string }[] = [
  { id: "belly", d: "M395 905 C395 830 605 830 605 905 C605 985 395 985 395 905 Z" },
  { id: "brain", d: "M430 150 C430 95 570 95 570 150 C570 195 430 195 430 150 Z" },
  { id: "liver", d: "M395 690 C415 655 500 650 520 680 C525 715 480 750 430 752 C398 748 385 720 395 690 Z" },
  { id: "stomach", d: "M530 690 C555 660 610 668 612 712 C614 762 565 785 532 770 C552 742 556 718 530 690 Z" },
  { id: "heart", d: "M548 610 C492 574 496 520 527 520 C540 520 548 531 548 539 C548 531 556 520 569 520 C600 520 604 574 548 610 Z" },
];

function faceOf(ry: number): Face {
  return (((Math.round(ry / 180) % 2) + 2) % 2) === 0 ? "front" : "back";
}

type IdMap = { w: number; h: number; data: Uint8ClampedArray };

function loadIdMap(src: string): Promise<IdMap> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject(new Error("no 2d context"));
      ctx.drawImage(img, 0, 0);
      resolve({ w: c.width, h: c.height, data: ctx.getImageData(0, 0, c.width, c.height).data });
    };
    img.onerror = reject;
    img.src = src;
  });
}

function idAt(map: IdMap, fx: number, fy: number): MuscleId | null {
  const x = Math.floor(fx * map.w);
  const y = Math.floor(fy * map.h);
  // Widen the search in rings so a fingertip just off a thin muscle still lands.
  for (const r of [0, 3, 6]) {
    const step = Math.max(1, r);
    for (let dy = -r; dy <= r; dy += step) {
      for (let dx = -r; dx <= r; dx += step) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= map.w || yy >= map.h) continue;
        const id = ID_TO_MUSCLE[Math.round(map.data[(yy * map.w + xx) * 4] / 16)];
        if (id) return id;
      }
    }
  }
  return null;
}

function paintMask(canvas: HTMLCanvasElement | null, map: IdMap | undefined, id: MuscleId | null, rgba: [number, number, number, number]): string | null {
  if (!canvas || !map) return null;
  if (canvas.width !== map.w) canvas.width = map.w;
  if (canvas.height !== map.h) canvas.height = map.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, map.w, map.h);
  if (!id) return null;
  const target = groups[id];
  const out = ctx.createImageData(map.w, map.h);
  for (let i = 0; i < map.data.length; i += 4) {
    if (Math.round(map.data[i] / 16) === target) {
      out.data[i] = rgba[0]; out.data[i + 1] = rgba[1]; out.data[i + 2] = rgba[2]; out.data[i + 3] = rgba[3];
    }
  }
  ctx.putImageData(out, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function MuscleMap({ posts }: { posts: PostLookup }) {
  const [mode, setMode] = useState<Mode>("muscles");
  const [selected, setSelected] = useState<PartId>("chest");
  const [hover, setHover] = useState<MuscleId | null>(null);
  const [ry, setRy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [intro, setIntro] = useState<Intro>("photo");
  const [maps, setMaps] = useState<Partial<Record<Face, IdMap>>>({});
  const drag = useRef<{ x: number; startRy: number; moved: boolean; lastX: number; lastT: number; v: number; downX: number; downY: number } | null>(null);
  // One mutable bag for the life of the component, so unmount cleanup sees the latest timers.
  const introTimers = useRef({ ids: [] as number[] });
  const lastTurnAt = useRef(0);
  const hoverMasks = useRef<Record<Face, HTMLCanvasElement | null>>({ front: null, back: null });
  const faceEls = useRef<Record<Face, HTMLDivElement | null>>({ front: null, back: null });
  const face = faceOf(ry);

  const parts: BodyPart<PartId>[] = mode === "muscles" ? muscles : organs;
  const part = useMemo(() => [...muscles, ...organs].find((p) => p.id === selected) ?? muscles[0], [selected]);

  useEffect(() => {
    let live = true;
    Promise.all([loadIdMap(`${ART}/front-ids.png`), loadIdMap(`${ART}/back-ids.png`)])
      .then(([front, back]) => { if (live) setMaps({ front, back }); })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  // ---- intro: Kris's photo, then a scan line that reveals the muscle under it ----
  const endIntro = useCallback(() => {
    introTimers.current.ids.forEach((t) => window.clearTimeout(t));
    introTimers.current.ids = [];
    setIntro("done");
  }, []);
  const playIntro = useCallback(() => {
    introTimers.current.ids.forEach((t) => window.clearTimeout(t));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntro("done");
      return;
    }
    setRy(0);
    setIntro("photo");
    introTimers.current.ids = [
      window.setTimeout(() => setIntro("scanning"), 1000),
      window.setTimeout(() => setIntro("done"), 1000 + 2600),
    ];
  }, []);
  useEffect(() => {
    // Deferred a tick so the first paint is Kris's photo, not a state flip.
    const t = window.setTimeout(playIntro, 0);
    const bag = introTimers.current;
    return () => { window.clearTimeout(t); bag.ids.forEach((x) => window.clearTimeout(x)); };
  }, [playIntro]);

  // ---- highlight painted from the ID map, so it matches the render exactly ----
  const muscleSelected = mode === "muscles" && muscles.some((m) => m.id === selected) ? (selected as MuscleId) : null;
  const selMask = useMemo(() => {
    const out = { front: null, back: null } as Record<Face, string | null>;
    if (typeof document === "undefined" || intro !== "done") return out;
    for (const f of ["front", "back"] as const) {
      out[f] = paintMask(document.createElement("canvas"), maps[f], muscleSelected, [255, 255, 255, 255]);
    }
    return out;
  }, [maps, muscleSelected, intro]);
  useEffect(() => {
    const h = hover && hover !== muscleSelected && mode === "muscles" ? hover : null;
    for (const f of ["front", "back"] as const) paintMask(hoverMasks.current[f], maps[f], f === face ? h : null, [255, 225, 210, 255]);
  }, [maps, hover, muscleSelected, mode, face]);

  // The turn animates for 700ms; the face's box is a perspective trapezoid until it lands.
  useEffect(() => { lastTurnAt.current = performance.now(); }, [face]);
  const turning = () => performance.now() - lastTurnAt.current < 720;

  const rotateTo = useCallback((target: Face) => {
    setRy((cur) => (faceOf(cur) === target ? Math.round(cur / 180) * 180 : Math.round(cur / 180) * 180 + 180));
  }, []);

  const select = useCallback(
    (id: PartId, how: "tap" | "chip" | "keyboard") => {
      endIntro();
      setSelected(id);
      const isOrgan = organs.some((o) => o.id === id);
      if (how !== "tap") {
        if (isOrgan) rotateTo("front");
        else {
          const here = pixelsOn(id as MuscleId, face);
          const there = pixelsOn(id as MuscleId, face === "front" ? "back" : "front");
          // Turn when the other side shows clearly more of it (lats peek round the front, but live on the back).
          if (here < VISIBLE_PX || there > here * 2) rotateTo(face === "front" ? "back" : "front");
        }
      }
      trackClientEvent("item_view", { ...shared, list_name: "muscle_map", item_id: id, item_category: isOrgan ? "organ" : "muscle" });
    },
    [face, rotateTo, endIntro],
  );

  function switchMode(next: Mode) {
    if (next === mode) return;
    endIntro();
    setMode(next);
    setHover(null);
    setSelected(next === "muscles" ? "chest" : "heart");
    if (next === "inside") rotateTo("front");
    trackClientEvent("filter_apply", { ...shared, filter_name: "muscle_map_layer", filter_value: next, list_name: "muscle_map" });
  }

  function muscleAt(clientX: number, clientY: number): MuscleId | null {
    if (turning()) return null;
    const el = faceEls.current[face];
    const map = maps[face];
    if (!el || !map) return null;
    const r = el.getBoundingClientRect();
    // The render sits object-fit: contain inside the face box.
    const scale = Math.min(r.width / FRAME_W, r.height / FRAME_H);
    const w = FRAME_W * scale, h = FRAME_H * scale;
    const fx = (clientX - (r.left + (r.width - w) / 2)) / w;
    const fy = (clientY - (r.top + (r.height - h) / 2)) / h;
    return idAt(map, fx, fy);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, startRy: ry, moved: false, lastX: e.clientX, lastT: e.timeStamp, v: 0, downX: e.clientX, downY: e.clientY };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) {
      if (e.pointerType === "mouse" && intro === "done" && mode === "muscles") setHover(muscleAt(e.clientX, e.clientY));
      return;
    }
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      endIntro();
      setHover(null);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    setRy(d.startRy + dx * DEG_PER_PX);
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      if (intro !== "done") { endIntro(); return; }
      const organ = (e.target as Element).closest("[data-organ]")?.getAttribute("data-organ") as OrganId | null;
      if (organ) { select(organ, "tap"); return; }
      if (mode === "muscles") {
        const id = muscleAt(d.downX, d.downY);
        if (id) select(id, "tap");
      }
      return;
    }
    setDragging(false);
    // A flick nudges toward the next side; it never adds a whole extra spin.
    const carry = Math.max(-60, Math.min(60, d.v * 160));
    setRy((cur) => Math.round((cur + carry) / 180) * 180);
  }

  function onStageKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      endIntro();
      setRy((cur) => Math.round(cur / 180) * 180 + (e.key === "ArrowRight" ? 180 : -180));
    }
  }

  function onOrganKey(e: KeyboardEvent<SVGGElement>, id: OrganId) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(id, "keyboard"); }
  }

  function renderExtrude() {
    const DEPTH = 34;           // matches --mm-depth in the module CSS
    const SLICES = 7;
    const src = `${ART}/${face}.webp`;
    return (
      <div className={styles.extrude} aria-hidden="true">
        {Array.from({ length: SLICES }, (_, i) => {
          const z = DEPTH - (i / (SLICES - 1)) * (DEPTH * 2);
          return (
            <div key={i} className={styles.extrudeSlice} style={{ transform: `translateZ(${z}px)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- silhouette copy, shares the render frame */}
              <img src={src} alt="" draggable={false} />
            </div>
          );
        })}
      </div>
    );
  }

  function renderFace(which: Face) {
    const facing = face === which;
    const inside = mode === "inside";
    return (
      <div ref={(el) => { faceEls.current[which] = el; }} className={`${styles.face} ${which === "back" ? styles.faceBack : ""}`} aria-hidden={!facing}>
        <div className={`${styles.anatomy} ${which === "front" ? styles[`anatomy_${intro}`] : ""} ${inside ? styles.anatomyFaded : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-frame render; the ID map depends on its exact box */}
          <img src={`${ART}/${which}.webp`} alt="" className={`${styles.render} ${selMask[which] ? styles.renderDim : ""}`} draggable={false} />
          {selMask[which] && (
            <div className={styles.lit} key={`${which}-${muscleSelected}`} aria-hidden="true">
              {/* The same render, cut to the selected muscle's outline and left at full brightness. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- must share the render's exact frame */}
              <img
                src={`${ART}/${which}.webp`}
                alt=""
                className={styles.render}
                draggable={false}
                style={{ maskImage: `url(${selMask[which]})`, WebkitMaskImage: `url(${selMask[which]})` }}
              />
            </div>
          )}
          <canvas ref={(el) => { hoverMasks.current[which] = el; }} className={`${styles.mask} ${styles.maskHover}`} aria-hidden="true" />
        </div>
        {which === "front" && intro !== "done" && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- must share the render's exact frame */}
            <img src={`${ART}/kris-front.webp`} alt="Kris Oddo" className={`${styles.photo} ${styles[`photo_${intro}`]}`} draggable={false} />
            <div className={`${styles.scanGrid} ${styles[`grid_${intro}`]}`} aria-hidden="true" />
            {intro === "scanning" && <div className={styles.scanLine} aria-hidden="true" />}
          </>
        )}
        {which === "front" && inside && (
          <svg viewBox={`0 0 ${FRAME_W} ${FRAME_H}`} className={styles.organs} role="group" aria-label="Inside the body">
            <defs>
              <filter id="mm-organ-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="14" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {organShapes.map(({ id, d }) => {
              const on = selected === id;
              return (
                <g
                  key={id}
                  data-organ={facing ? id : undefined}
                  role="button"
                  tabIndex={facing ? 0 : -1}
                  aria-label={organs.find((o) => o.id === id)?.name}
                  aria-pressed={on}
                  className={`${styles.organ} ${id === "belly" ? styles.belly : ""} ${on ? styles.on : ""}`}
                  filter={on ? "url(#mm-organ-glow)" : undefined}
                  onKeyDown={(e) => onOrganKey(e, id)}
                >
                  <path d={d} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
    );
  }

  const cueSource = posts[part.cue.source];
  const hoverName = hover ? muscles.find((m) => m.id === hover)?.name : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.figureCol}>
        <div className={styles.toolbar}>
          <div className={styles.segment} role="group" aria-label="What to show">
            {(["muscles", "inside"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} className={styles.segmentBtn} onClick={() => switchMode(m)}>
                {m === "muscles" ? "Muscles" : "Inside"}
              </button>
            ))}
          </div>
          <button type="button" className={styles.turn} onClick={() => { endIntro(); rotateTo(face === "front" ? "back" : "front"); }}>
            <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.turnIcon}><path d="M4 10a6 6 0 0 1 10.5-4M16 10a6 6 0 0 1-10.5 4M14.5 2.5v3.5H11M5.5 17.5V14H9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {face === "front" ? "See the back" : "See the front"}
          </button>
        </div>

        <div
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { drag.current = null; setDragging(false); }}
          onPointerLeave={() => setHover(null)}
          onKeyDown={onStageKey}
          tabIndex={0}
          aria-label="Muscle body. Drag or use the arrow keys to turn it around. Use the buttons below to pick a muscle."
          data-dragging={dragging || undefined}
          data-hovering={hover ? true : undefined}
        >
          <div className={styles.turntable} style={{ transform: `rotateY(${ry}deg)`, transition: dragging ? "none" : undefined }}>
            {renderExtrude()}
            {renderFace("front")}
            {renderFace("back")}
          </div>
          <div
            className={styles.sheen}
            aria-hidden="true"
            style={{ ["--mm-sheen" as string]: `${50 + Math.sin((ry * Math.PI) / 180) * 42}%` }}
          />
          <div className={styles.floor} aria-hidden="true" />
          {intro === "done" ? (
            <p className={styles.hint} aria-hidden="true">
              {hoverName ?? `Drag to turn · tap a ${mode === "muscles" ? "muscle" : "spot"}`}
            </p>
          ) : (
            <p className={styles.scanLabel}>{intro === "photo" ? "Kris Oddo, NASM-CPT" : "Scanning"}</p>
          )}
          {intro === "done" && (
            <button
              type="button"
              className={styles.replay}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={playIntro}
            >
              Replay scan
            </button>
          )}
        </div>

        <div className={styles.chips} role="group" aria-label={mode === "muscles" ? "Pick a muscle" : "Pick a spot"}>
          {parts.map((p) => (
            <button key={p.id} type="button" aria-pressed={selected === p.id} className={styles.chip} onClick={() => select(p.id, "chip")}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.panel} aria-live="polite" aria-labelledby="mm-panel-title">
        <div key={part.id} className={styles.panelInner}>
          <p className={styles.plain}>{part.plain}</p>
          <h2 id="mm-panel-title" className={`display ${styles.title}`}>{part.name}</h2>

          <figure className={styles.cue}>
            <blockquote>&ldquo;{part.cue.text}&rdquo;</blockquote>
            {cueSource && (
              <figcaption>
                Kris, in{" "}
                <Link href={cueSource.href} onClick={() => trackClientEvent("item_click", { ...shared, list_name: "muscle_map_reads", item_id: cueSource.href, item_position: 0 })}>
                  {cueSource.title}
                </Link>
              </figcaption>
            )}
          </figure>

          {part.exercises.length > 0 && (
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Kris&rsquo;s picks</h3>
              <ol className={styles.exercises}>
                {part.exercises.map((ex, i) => {
                  const src = posts[ex.source];
                  return (
                    <li key={ex.name + i}>
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.exName}>
                        {ex.name}
                        {ex.prescription && <span className={styles.rx}>{ex.prescription}</span>}
                      </span>
                      {src && (
                        <Link href={src.href} className={styles.why} aria-label={`Where Kris recommends ${ex.name}: ${src.title}`} onClick={() => trackClientEvent("item_click", { ...shared, list_name: "muscle_map_reads", item_id: src.href, item_position: i + 1 })}>
                          Why
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {part.reels && part.reels.length > 0 && (
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Watch Kris coach it</h3>
              <ul className={styles.reads}>
                {part.reels.map((r) => (
                  <li key={r.id}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" onClick={() => trackClientEvent("outbound_click", { ...shared, link_url: r.url, destination_domain: "instagram.com", link_context: "muscle_map_reel" })}>
                      {r.title}
                      <span aria-hidden="true" className={styles.arrow}>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Read next</h3>
            <ul className={styles.reads}>
              {part.articles.map((slug, i) => {
                const post = posts[slug];
                if (!post) return null;
                return (
                  <li key={slug}>
                    <Link href={post.href} onClick={() => trackClientEvent("item_click", { ...shared, list_name: "muscle_map_reads", item_id: post.href, item_position: i + 1 })}>
                      {post.title}
                      <span aria-hidden="true" className={styles.arrow}>→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BODY_GROUPS, type BodyGroup } from "@/data/bodyMap";
import { backfilledScienceStudies } from "@/data/scienceLibrary";
import { trackClientEvent } from "@/lib/clientAnalytics";

const shared = { brand: "geebs", page_type: "tool", locale: "en", variant: "control" };
const MODEL_SRC = "/tools/body-3d/muscles.glb";

function studiesFor(group: BodyGroup) {
  const kw = group.scienceKeywords.map((k) => k.toLowerCase());
  return backfilledScienceStudies
    .filter((s) =>
      (s.keywords ?? []).some((k) => kw.includes(k.toLowerCase())) ||
      kw.includes(s.topic.toLowerCase()),
    )
    .slice(0, 3);
}

export default function Body3D() {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<BodyGroup | null>(null);

  // The web component is client-only and heavy; load it after mount so it never
  // blocks first paint and never ships in the server HTML.
  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        /* graphics unavailable — the fallback below stays visible */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function open(group: BodyGroup) {
    setActive(group);
    const v = viewerRef.current as (HTMLElement & {
      cameraTarget?: string;
      cameraOrbit?: string;
    }) | null;
    if (v) {
      // Zoom the camera to the group. model-viewer animates between these.
      v.setAttribute("camera-target", group.target);
      v.setAttribute("camera-orbit", group.orbit);
    }
    trackClientEvent("item_view", {
      ...shared,
      list_name: "body_3d",
      item_id: group.id,
      item_category: "muscle_group",
    });
  }

  function resetView() {
    setActive(null);
    const v = viewerRef.current;
    if (v) {
      v.setAttribute("camera-target", "auto auto auto");
      v.setAttribute("camera-orbit", "0deg 85deg auto");
    }
  }

  const studies = useMemo(() => (active ? studiesFor(active) : []), [active]);

  return (
    <div className="body3d">
      <div className="body3d__stage">
        <model-viewer
          ref={viewerRef}
          src={MODEL_SRC}
          alt="Interactive 3D body. Rotate it, zoom in, and tap a muscle group."
          camera-controls
          touch-action="pan-y"
          interaction-prompt="none"
          camera-orbit="0deg 85deg auto"
          min-camera-orbit="auto auto 25%"
          max-camera-orbit="auto auto 180%"
          environment-image="neutral"
          tone-mapping="aces"
          exposure="1.05"
          shadow-intensity="0.9"
          shadow-softness="0.85"
          style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        >
          {BODY_GROUPS.map((g) => (
            <button
              // model-viewer positions a slotted element at a 3D point via these.
              key={g.id}
              slot={`hotspot-${g.id}`}
               
              data-position={g.target.replace(/m/g, "")}
               
              data-normal="0 0 1"
              className={`body3d__dot ${active?.id === g.id ? "is-active" : ""}`}
              onClick={() => open(g)}
              aria-label={g.name}
              type="button"
            >
              <span className="body3d__dotpulse" aria-hidden="true" />
            </button>
          ))}
        </model-viewer>

        {!ready ? (
          <p className="body3d__loading" aria-live="polite">
            Loading the 3D body…
          </p>
        ) : null}
      </div>

      {/* The list is the accessible, no-WebGL path to the same content: every
          group is reachable and openable without the canvas. */}
      <div className="body3d__groups" role="list" aria-label="Muscle groups">
        {BODY_GROUPS.map((g) => (
          <button
            key={g.id}
            role="listitem"
            type="button"
            className={`body3d__chip ${active?.id === g.id ? "is-active" : ""}`}
            onClick={() => open(g)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {active ? (
        <section className="body3d__panel" aria-live="polite">
          <div className="body3d__panelhead">
            <h2>{active.name}</h2>
            <button type="button" className="body3d__close" onClick={resetView}>
              Reset view
            </button>
          </div>
          <p className="body3d__tip">{active.tip}</p>

          {active.hrefs.length ? (
            <>
              <p className="body3d__label">How Kris trains it</p>
              <ul className="body3d__links">
                {active.hrefs.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      data-analytics-event="item_click"
                      data-analytics-link-kind="body_3d_tip"
                    >
                      {h.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {studies.length ? (
            <>
              <p className="body3d__label">The evidence</p>
              <ul className="body3d__studies">
                {studies.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.doiUrl ?? s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics-event="science_study_source_click"
                    >
                      {s.shortTitle}
                    </a>
                    <span className="body3d__studymeta">
                      {" "}
                      {s.journal}, {s.year}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

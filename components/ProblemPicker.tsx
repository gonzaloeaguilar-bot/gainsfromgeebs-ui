"use client";

import Image from "next/image";
import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import type { ProblemPack } from "@/lib/problemPacks";
import { getCollectionSnapshot, getCollectionServerSnapshot, subscribeToCollection, saveCollection } from "@/lib/packCollection";
import { isPackComplete } from "@/lib/packProgress";
import { trackClientEvent } from "@/lib/clientAnalytics";
import styles from "./ProblemPicker.module.css";
import { revealHubSection } from "@/lib/revealHubSection";

const shared = { brand: "geebs", page_type: "blog", locale: "en", variant: "control" };
export default function ProblemPicker({ packs }: { packs: ProblemPack[] }) {
  const [selected, setSelected] = useState("recomp");
  const [revealRequest, setRevealRequest] = useState(0);
  useLayoutEffect(() => {
    if (!revealRequest) return;
    const path = document.getElementById("problem-path");
    const heading = document.getElementById(`problem-heading-${selected}`);
    if (path && heading) revealHubSection(path, heading);
  }, [selected, revealRequest]);
  const collection = useSyncExternalStore(subscribeToCollection, getCollectionSnapshot, getCollectionServerSnapshot);
  const pack = packs.find(p => p.id === selected) ?? packs[0];
  if (!pack) return null;
  const stamps = packs.filter(p => isPackComplete(p, collection.read)).length;

  function markRead(href: string, position: number) {
    const current = getCollectionSnapshot();
    const read = Array.from(new Set([...current.read, href]));
    saveCollection({ opened: Array.from(new Set([...current.opened, pack.id])), read });
    trackClientEvent("item_click", { ...shared, list_name: "blog_problem_path", item_id: href, item_position: position, pack_id: pack.id });
    for (const candidate of packs) {
      if (!isPackComplete(candidate, current.read) && isPackComplete(candidate, read)) {
        trackClientEvent("item_view", { ...shared, list_name: "blog_pack_stamp", item_id: candidate.id, item_category: "pack" });
      }
    }
  }

  return <section className={styles.picker} aria-label="Choose what is holding you back">
    <div className={styles.grid}>
      {packs.map(p => <button key={p.id} type="button" aria-pressed={p.id === selected} aria-controls="problem-path" className={styles.card} onClick={() => {
        setSelected(p.id);
        // Reveal after React commits the active panel, including repeat taps.
        setRevealRequest(request => request + 1);
        trackClientEvent("filter_apply", { ...shared, filter_name: "problem", filter_value: p.id, list_name: "blog_problem_picker" });
      }}>
        <Image src={p.image} alt="" fill sizes="(min-width: 980px) 285px, (min-width: 768px) 30vw, 45vw" className={styles.photo} />
        {p.id === "recomp" && <span className={styles.badge}>Start here</span>}
        <span className={styles.caption}><strong className="display">{p.problem}</strong><span>{p.label} · {p.cards.length} reads</span></span>
      </button>)}
    </div>
    <div id="problem-path" className={styles.path}>
      {packs.map(pathPack => {
        const count = pathPack.cards.filter(card => collection.read.includes(card.href)).length;
        const next = pathPack.cards.findIndex(card => !collection.read.includes(card.href));
        return <div key={pathPack.id} className={styles.pathContent} data-active={pathPack.id === pack.id} aria-hidden={pathPack.id !== pack.id} inert={pathPack.id !== pack.id}>
        <div className={styles.heading}><h2 id={`problem-heading-${pathPack.id}`} tabIndex={-1} className="display">{pathPack.name}</h2><span aria-live="polite">{count} of {pathPack.cards.length}</span></div>
        <progress className={styles.progress} value={count} max={pathPack.cards.length} aria-label={`${pathPack.name} reading progress`} />
        <ol className={styles.steps}>{pathPack.cards.map((card, index) => <li key={card.href}>
          <a href={card.href} onClick={() => markRead(card.href, index + 1)} className={styles.step} aria-current={index === next ? "step" : undefined}>
            <span className={styles.circle} data-read={collection.read.includes(card.href)} aria-hidden="true">{collection.read.includes(card.href) ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : index + 1}</span>
            <span className={styles.copy}><strong>{card.title}</strong><span>{card.hook}</span>{collection.read.includes(card.href) && <span className="sr-only">Read</span>}</span>
            <span className={styles.minutes}>{card.href.startsWith("/tools/") ? "Tool" : `${card.minutes} min`}</span>
          </a>
        </li>)}</ol>
      </div>;
      })}
    </div>
    <div className={styles.stamps}>
      <div className={styles.stampRow}>{packs.map(p => <span key={p.id} className={`${styles.stamp} ${isPackComplete(p, collection.read) ? styles.stamped : ""}`} title={p.name} aria-label={`${p.name}: ${isPackComplete(p, collection.read) ? "stamped" : "not finished"}`}>{p.name[0]}</span>)}</div>
      <p aria-live="polite"><strong>{stamps} of {packs.length} packs stamped.</strong> Finish a path, keep the stamp.</p>
    </div>
  </section>;
}

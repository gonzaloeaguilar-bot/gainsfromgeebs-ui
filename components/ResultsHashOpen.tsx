"use client";

// A proof card links to its own story, which lives inside a closed fold. The
// browser will not open a <details> to reach an anchor inside it, so the hash
// has to do it explicitly — otherwise the link lands on a collapsed row and
// looks broken.

import { useEffect } from "react";

export default function ResultsHashOpen() {
  useEffect(() => {
    function openForHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      let node: HTMLElement | null = target;
      while (node) {
        if (node instanceof HTMLDetailsElement) node.open = true;
        node = node.parentElement;
      }
      target.scrollIntoView({ block: "start" });
    }
    openForHash();
    window.addEventListener("hashchange", openForHash);
    return () => window.removeEventListener("hashchange", openForHash);
  }, []);

  return null;
}

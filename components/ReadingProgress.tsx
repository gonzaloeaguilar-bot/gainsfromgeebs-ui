"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress bar pinned under the header. Turns "how long is this going to
 * be" into visible progress on guides that run 2,000-3,000 words.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div
        className="reading-progress-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

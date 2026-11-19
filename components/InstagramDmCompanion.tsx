"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CoachCompanion from "@/components/CoachCompanion";
import {
  hasDedicatedCoachCompanion,
  INSTAGRAM_DM_SESSION_KEY,
  isCompanionConversionPath,
  isInstagramDmAttribution,
} from "@/lib/companionAttribution";

function pageLabel(pathname: string): string {
  if (pathname === "/") return "Gains from Geebs";
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "this page";
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Carries Kris across an Instagram DM visit even after the tracked landing
 * URL is left. Pages with tailored companion copy keep their own instance.
 */
export default function InstagramDmCompanion() {
  const pathname = usePathname();
  const [isDmSession, setIsDmSession] = useState(false);

  useEffect(() => {
    let raf = 0;
    let next = false;
    try {
      const attributed = isInstagramDmAttribution(window.location.search);
      if (attributed) sessionStorage.setItem(INSTAGRAM_DM_SESSION_KEY, "true");
      next = attributed || sessionStorage.getItem(INSTAGRAM_DM_SESSION_KEY) === "true";
    } catch {
      next = isInstagramDmAttribution(window.location.search);
    }
    raf = requestAnimationFrame(() => setIsDmSession(next));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  if (
    !isDmSession ||
    isCompanionConversionPath(pathname) ||
    hasDedicatedCoachCompanion(pathname)
  ) {
    return null;
  }

  const title = pageLabel(pathname);
  return (
    <CoachCompanion
      slug={`instagram-dm-${pathname}`}
      title={title}
      topic={title}
      pageType="site"
      shortAnswer="You came from Kris's Instagram DMs. Use this page for the full details, or ask Kris what applies to your goal."
      takeoverAnswer="Start with this page's answer, then ask me what fits your goal."
    />
  );
}

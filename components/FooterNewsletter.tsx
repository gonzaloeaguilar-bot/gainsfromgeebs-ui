"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

/**
 * The footer newsletter, but only when it is the page's only newsletter.
 *
 * The homepage asked for an email three times: the Weekly Science Drop at 18.5
 * screens, the free recomposition guide at 22.1, and this one at 26.2. The
 * guide is a different offer and earns its ask. The other two are the same
 * offer twice, and the second one is this — "Weekly training insights" — which
 * is the field that got reported.
 *
 * The rule is computed, not configured: if something above already asks for an
 * email for the newsletter, this one stands down. A hard-coded list of pages to
 * suppress it on would be right today and stale the first time a page gains or
 * loses a signup, and the failure would be invisible — nobody notices a third
 * ask at the bottom of a 26-screen page except the person it annoys.
 *
 * It renders on the server and stands down on mount, so a page where it is the
 * only signup never waits for JavaScript to show one.
 */
export default function FooterNewsletter() {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [redundant, setRedundant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const all = [
      ...document.querySelectorAll("input[type=email]"),
    ];
    // "Above" rather than "elsewhere": if this were the first one on the page
    // it should stay and the later one should be the one to stand down.
    setRedundant(all.some((node) => !el.contains(node) && node.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
  }, []);

  /* NOT ON THE HOMEPAGE. The pack rail there carries the same ask inside an
     opened pack, which is where the value just landed, so this one is the
     third time a single page asks for an email address. The `redundant` check
     below cannot catch it: that looks for an email INPUT above, and the pack's
     ask stays closed until it is pressed, so there is no input to find. */
  /* Normalised, not compared raw. A reviewer flagged `path === "/"` as fragile:
     a trailing-slash config, a rewrite or a locale prefix would give the
     homepage a different pathname and quietly restore the duplicate ask. The
     site has no locale routes today, so this only has to survive the slash —
     but the failure mode is silent, and that is the kind worth spending a line
     on. */
  if ((path ?? "").replace(/\/+$/, "") === "") return null;

  if (redundant) return null;

  return (
    <div ref={ref} className="pb-8 max-w-[340px]">
      <NewsletterSignup
        source="footer"
        variant="compact"
        heading="Weekly training insights"
        subheading="Training and recomposition tips from Kris, once a week. No spam."
        ctaLabel="Subscribe"
      />
    </div>
  );
}

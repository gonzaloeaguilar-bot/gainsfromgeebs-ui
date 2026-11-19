"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { RailSheet } from "@/vendor/rail-kit";
import {
  SCHOLARSHIP,
  SCHOLARSHIP_EXPERIMENT_ID,
  SCHOLARSHIP_VARIANTS,
  type ScholarshipVariant,
} from "@/lib/scholarship";
import { scholarshipVariant } from "@/lib/scholarshipVariant";

// Assigned once per page load and cached, so every render (and both copies of
// the sheet, the ribbon's and the deep link's) agrees on the arm.
let assigned: ScholarshipVariant | null = null;
const variantStore = {
  subscribe: () => () => {},
  getSnapshot: (): ScholarshipVariant => (assigned ??= scholarshipVariant()),
  // The server has no visitor. Arm "a" is rendered there and React swaps in
  // the visitor's arm after hydration, which useSyncExternalStore does
  // without a mismatch warning. The picture is only mounted once the sheet
  // is open, so nobody sees the swap.
  getServerSnapshot: (): ScholarshipVariant => "a",
};

/**
 * One experiment_exposure per open. The tag may not have booted yet on a
 * deep-link arrival, so wait for it briefly rather than lose the exposure
 * (and never fall back to raw gtag: see ApplyForm's note on second writers).
 */
function useExposure(open: boolean, variant: ScholarshipVariant) {
  useEffect(() => {
    if (!open) return;
    let done = false;
    const fire = () => {
      if (done || typeof window.geebsTrackEvent !== "function") return done;
      done = true;
      window.geebsTrackEvent("experiment_exposure", {
        experiment_id: SCHOLARSHIP_EXPERIMENT_ID,
        variant,
      });
      return true;
    };
    if (fire()) return;
    const poll = setInterval(() => fire() && clearInterval(poll), 300);
    const stop = setTimeout(() => clearInterval(poll), 8000);
    return () => {
      clearInterval(poll);
      clearTimeout(stop);
    };
  }, [open, variant]);
}

/**
 * The scholarship, as a full-screen promo: Kris first, then the offer.
 *
 * The first version of this sheet was text only, and Gonzalo called it out:
 * the scholarship is the strongest reason a first-time visitor has to act and
 * it was the one sheet on the site with no picture. The reference he gave was
 * the YouTube TV sign-in promo: photograph across the top, a big line, one
 * button you cannot miss, the small print under it.
 *
 * Built on the kit's RailSheet with layout="takeover" instead of a hand-rolled
 * overlay. The native <dialog> brings Escape, the focus trap, focus return and
 * an inert page behind it, and the dialog renders in the top layer, so the
 * ribbon's backdrop-filter can no longer clip it (the reason the old version
 * had to portal itself to <body>).
 *
 * The apply link keeps its data-analytics-event: GoogleAnalytics listens for it
 * on any clicked element, so passing it through RailAction.data is enough.
 */
export default function ScholarshipSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const variant = useSyncExternalStore(
    variantStore.subscribe,
    variantStore.getSnapshot,
    variantStore.getServerSnapshot,
  );
  const arm = SCHOLARSHIP_VARIANTS[variant];
  useExposure(open, variant);

  // The arm also rides on the apply link's utm_content, so the application
  // on titanforgefit.com can be credited to the version that sent it.
  const applyUrl = new URL(SCHOLARSHIP.applyUrl);
  applyUrl.searchParams.set(
    "utm_content",
    `${applyUrl.searchParams.get("utm_content") ?? "scholarship"}_sheet_${variant}`,
  );

  return (
    // display: contents, so the wrapper adds no box. It carries the arm to
    // every click inside the sheet: GoogleAnalytics reads the closest
    // data-analytics-experiment / data-analytics-variant.
    <div
      data-analytics-experiment={SCHOLARSHIP_EXPERIMENT_ID}
      data-analytics-variant={variant}
      style={{ display: "contents" }}
    >
    <RailSheet
      layout="takeover"
      open={open}
      onClose={onClose}
      source="scholarship_sheet"
      className="rail-sheet--scholarship"
      badge={SCHOLARSHIP.eyebrow}
      title={arm.heading}
      description={<p>{arm.short}</p>}
      media={
        <Image
          className="rail-sheet__image"
          key={arm.image.src}
          src={arm.image.src}
          alt={arm.image.alt}
          style={{ ["--rail-sheet-takeover-focus" as string]: arm.focus }}
          width={1200}
          height={1500}
          sizes="(max-width: 767px) 100vw, 560px"
          priority
        />
      }
      actions={[
        {
          id: "scholarship_apply",
          label: SCHOLARSHIP.applyLabel,
          href: applyUrl.toString(),
          data: {
            "analytics-event": "titanforge_intensive_referral_click",
            "analytics-link-kind": "titanforge_intensive_referral",
            // The kit's shine sweep (motion.css), so the one button reads as
            // the thing to press.
            "rail-shimmer": "",
          },
        },
      ]}
      // One button, like the reference. The coaching route and the details
      // stay one tap away in the small print; as a second full-width button
      // the coaching link pushed the details off the bottom of a 390x844
      // screen (actions ended at 860px).
      finePrint={
        <>
          <Link href={SCHOLARSHIP.secondaryHref} onClick={onClose}>
            {SCHOLARSHIP.secondaryLabel}
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href={SCHOLARSHIP.detailsHref} onClick={onClose}>
            {SCHOLARSHIP.detailsShortLabel}
          </Link>
        </>
      }
      closeLabel="Close the scholarship offer"
    />
    </div>
  );
}

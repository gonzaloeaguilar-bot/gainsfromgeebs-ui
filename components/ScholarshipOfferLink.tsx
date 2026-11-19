"use client";

import { useSyncExternalStore } from "react";
import ScholarshipSheet from "@/components/ScholarshipSheet";

const PARAM = "offer";
const VALUE = "scholarship";
const CHANGE = "geebs:offer-param";

/**
 * `?offer=scholarship` on any page opens the scholarship sheet on arrival.
 *
 * For links in Instagram bios, stories and emails: the person lands on the
 * page they were sent to with the offer already in front of them. It is the
 * only way the sheet opens by itself; without the parameter nothing shows
 * until the ribbon is tapped.
 *
 * Mounted in the layout, not inside the ribbon, because the ribbon hides
 * itself on the homepage's first screen on a phone and on /apply, and a link
 * that promises the offer has to show it wherever it lands.
 *
 * The URL is an external store, read with useSyncExternalStore; the server
 * snapshot is "closed", so nothing opens before hydration.
 */
const store = {
  subscribe(onChange: () => void) {
    window.addEventListener("popstate", onChange);
    window.addEventListener(CHANGE, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(CHANGE, onChange);
    };
  },
  getSnapshot() {
    return new URLSearchParams(window.location.search).get(PARAM) === VALUE;
  },
  getServerSnapshot() {
    return false;
  },
};

export default function ScholarshipOfferLink() {
  const open = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  function close() {
    const url = new URL(window.location.href);
    url.searchParams.delete(PARAM);
    // Replace, not push: Back should leave the page, not reopen the offer.
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(CHANGE));
  }

  // The ribbon's copy of the sheet sits inside the ribbon's
  // data-analytics-source; this one would report no source at all, so clicks
  // from a shared link say where they came from. `display: contents` so the
  // wrapper adds no box.
  return (
    <div data-analytics-source="scholarship_link" style={{ display: "contents" }}>
      <ScholarshipSheet open={open} onClose={close} />
    </div>
  );
}

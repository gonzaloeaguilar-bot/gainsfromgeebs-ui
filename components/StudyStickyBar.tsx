"use client";

/**
 * The bar that keeps the loop going from anywhere on a study page.
 *
 * WHY IT EXISTS. The audit measured a median of 4 onward links per study page
 * and all of them at the foot — 9.5 phone screens down. The goal for these
 * pages is that a reader takes one insight and then reads another, and another;
 * a next step that only exists at the bottom is a next step almost nobody
 * reaches. This is the kit's own `RailStickyBar`, whose docs say the same
 * thing: "the bar exists because the real call to action is twenty screens
 * down and nobody arrives".
 *
 * IT WATCHES THE HEADER. While the study's own title is on screen there is no
 * bar — a reader who has just arrived does not need to be sent somewhere else.
 */


import RailStickyBar from "@/vendor/rail-kit/RailStickyBar";
import { trackClientEvent } from "@/lib/clientAnalytics";

export default function StudyStickyBar({
  topic,
  nextStudy,
  topicHref,
}: {
  topic: string;
  nextStudy: { id: string; shortTitle: string } | null;
  topicHref: string;
}) {
  /* NO `watch`, AFTER TWO REJECTED ATTEMPTS, and the kit already said so.
     RailStickyBar's docs: "Without a ref the bar is simply always visible,
     which is the right fallback: a call to action that never appears is worse
     than one that appears too early."

     The first attempt found the h1 in a useEffect and flipped a `ready` state
     to pass the ref down; CI's lint rejected it as a cascading render. The
     second read the ref during render; lint rejected that too. And an effect
     could not have worked regardless: RailStickyBar is this component's CHILD,
     and child effects run before parent effects, so its observer would have
     read the ref while it was still null no matter which hook assigned it.

     Passing the watch target would take a ref created by the page, and the
     page is a server component. Always visible is the honest trade. */
  if (!nextStudy) return null;

  const actions = [
    { id: "next_study", label: "Next study", href: `/science/studies/${nextStudy.id}` },
    { id: "topic", label: `All ${topic.toLowerCase()}`, href: topicHref },
  ];

  return (
    <RailStickyBar
      label={
        <span>
          <span className="block text-[11.5px] uppercase tracking-[0.14em] text-mute">
            Next in {topic.toLowerCase()}
          </span>
          <span className="block text-[14px] leading-[1.25] text-bone">
            {nextStudy.shortTitle}
          </span>
        </span>
      }
      actions={actions}
      source="science_study"
      onSelect={({ actionId, index }) =>
        trackClientEvent("item_click", {
          item_id: actionId,
          list_name: "science_study_sticky_bar",
          item_index: index,
          source: "science_study_sticky_bar",
        })
      }
    />
  );
}

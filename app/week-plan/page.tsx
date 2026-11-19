import type { Metadata } from "next";
import WeekPlanRouter from "./WeekPlanRouter";

const SITE_URL = "https://gainsfromgeebs.com";
const PATH = "/week-plan";

export const metadata: Metadata = {
  title: "Make a Plan for Your Real Week | Geebs Coaching",
  description:
    "Pick the thing disrupting your training this week. Get three practical next steps, a useful guide, and an optional coaching handoff—no email required.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  robots: { index: true, follow: true },
};

export default function WeekPlanPage() {
  return (
    <main className="bg-grain min-h-screen" data-week-plan-page>
      {/* This is a focused one-question flow. Its own Continue and result
          actions are the only next moves, so the global mobile dock must not
          cover the final choice or create a competing action. */}
      <style>{`
        .geebs-dock,.recomp-ribbon,.geebs-chat-launcher{display:none!important}
        /* The plan owns the next action until its free value has been delivered.
           Do not let the global application shortcut compete with Start/Continue. */
        body:has(main[data-week-plan-page]) [data-cta="nav_primary"]{display:none!important}
      `}</style>
      <article className="mx-auto max-w-[760px] px-6 pb-[calc(10rem+env(safe-area-inset-bottom))] pt-8 md:px-10 md:pb-32 md:pt-24">
        <WeekPlanRouter />
      </article>
    </main>
  );
}

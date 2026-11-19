import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Link from "next/link";
import GoalTrackerLeadMagnet from "@/components/GoalTrackerLeadMagnet";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/free/goal-tracker";

export const metadata: Metadata = {
  title: "Free Goal Weight Forecast | Geebs Coaching",
  description:
    "Use a free browser-based goal weight forecast to estimate calories, macros, weeks to target, and when to adjust if progress stalls.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Free Goal Weight Forecast | Geebs Coaching",
    description:
      "A no-login calorie, macro, and goal-weight ETA tool that saves locally and generates a Reddit-safe check-in.",
    siteName: "Geebs Coaching",
    images: ["/social-preview-coaching.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Goal Weight Forecast | Geebs Coaching",
    description:
      "Estimate calories, macros, weeks to goal, and weekly adjustment timing without creating an account.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function GoalTrackerPage() {
  return (
    <main className="bg-grain min-h-screen">
      <GoalTrackerLeadMagnet />

      <section className="mx-auto max-w-[1120px] px-6 pb-20 md:px-10">
        <div className="hair mb-10" />
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="eyebrow text-cloudText">Why this exists</p>
            <h2 className="display mt-3 text-[26px] leading-[1.12] text-bone md:text-[34px]">
              The forecast is supposed to make the goal weight feel concrete.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "No perfect-week fantasy",
                "The file estimates time to goal, calories, and macros from the week you actually logged.",
              ],
              [
                "No app account",
                "The download is a normal HTML file. Open it in a browser, save locally, and keep the data on your device.",
              ],
              [
                "No fake transformation promise",
                "Current weight, goal weight, sex, age, height, steps, training, sleep, and protein drive the ETA together.",
              ],
              [
                "No hard pitch inside",
                "The generated Reddit check-in has no link or pitch. It is built so the user can ask whether the goal-weight ETA looks realistic.",
              ],
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-lg border border-line2 bg-bone/[0.025] p-5"
              >
                <h3 className="text-[18px] font-semibold tracking-normal text-bone">
                  {title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-line2 bg-black/20 p-5 md:p-6">
          <p className="eyebrow text-cloudText">Next step</p>
          <h2 className="display mt-3 text-[26px] leading-[1.12] text-bone md:text-[34px]">
            Want Kris to build the actual plan behind the numbers?
          </h2>
          <p className="mt-4 max-w-[68ch] text-[15.5px] leading-[1.65] text-mute">
            Use the forecast first. If the same misses keep showing up, that is
            where coaching helps: training structure, nutrition that fits your
            week, recovery habits, and accountability when things are not clean.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?utm_source=site&utm_medium=free_tool&utm_campaign=goal_tracker&utm_content=goal_tracker_apply"
              className="btn btn-primary"
            >
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Browse guides
            </Link>
          </div>
        </div>
      </section>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

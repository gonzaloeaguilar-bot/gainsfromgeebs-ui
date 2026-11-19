import Link from "next/link";

/**
 * ApplyBridge — soft off-ramp shown ABOVE the /apply wizard for warm but
 * undecided visitors. Three lower-friction paths so we don't lose people who
 * aren't ready to hand over phone+email+IG yet. No offer/pricing changes —
 * every target already exists on the site.
 *
 * Tracked via the global GA click listener (GoogleAnalytics.tsx):
 *   - `data-analytics-event="apply_bridge_click"` fires explicit event
 *   - `data-analytics-link-kind="apply_bridge"` tags the click_source
 *   - `data-analytics-source` on the wrapper section names the bridge
 *
 * Compared to the wizard, these are read-only / soft-CTA paths so we can
 * see which warm-traffic intent is *actually* in the room without forcing
 * the application form.
 */

type Bridge = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const BRIDGES: Bridge[] = [
  {
    href: "/memberships/science-based-community",
    eyebrow: "Lower commitment",
    title: "Not ready for a call?",
    body:
      "The science-based Telegram community is training, nutrition and recovery discussion with people working on the same thing. Cleaner first step if a strategy call is too big a jump right now.",
    cta: "See the community",
  },
  {
    href: "/methodology",
    eyebrow: "How Kris coaches",
    title: "Want to see how the coaching actually works first?",
    body:
      "Two-minute read on Kris's method, what a week looks like, and who it's for. No form, no email.",
    cta: "Read the methodology",
  },
  {
    href: "/free/goal-tracker",
    eyebrow: "Free tool",
    title: "Want to see how long the goal weight may take?",
    body:
      "The Goal Weight Forecast runs in your browser. No account, no email needed to use it.",
    cta: "Open the free forecast",
  },
];

export default function ApplyBridge() {
  return (
    <section
      aria-labelledby="apply-bridge-title"
      data-analytics-source="apply_bridge"
      className="mt-10 md:mt-12 rounded-2xl border border-line2 bg-bone/[0.02] p-5 md:p-7"
    >
      <p className="eyebrow text-cloudText">Not ready for the call yet?</p>
      <h2
        id="apply-bridge-title"
        className="mt-2 text-bone text-[20px] md:text-[24px] leading-[1.15] font-semibold"
      >
        Three lighter ways to start.
      </h2>
      <p className="mt-2 text-[14.5px] md:text-[15.5px] leading-[1.6] text-mute max-w-[58ch]">
        1:1 is real money and a strategy call. If you&apos;re still deciding,
        these are the same paths Kris would point you to. The application is
        right above when you&apos;re ready.
      </p>

      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {BRIDGES.map((b) => (
          <li
            key={b.href}
            className="rounded-xl border border-line2 bg-[#0a0a0a]/40 p-4 flex flex-col"
          >
            <p className="eyebrow text-cloudText/80 text-[11px]">{b.eyebrow}</p>
            <h3 className="mt-1.5 text-bone text-[15.5px] md:text-[16px] leading-[1.25] font-semibold">
              {b.title}
            </h3>
            <p className="mt-2 text-[13.5px] md:text-[14px] leading-[1.55] text-mute flex-1">
              {b.body}
            </p>
            <Link
              href={b.href}
              prefetch={false}
              data-analytics-event="apply_bridge_click"
              data-analytics-link-kind="apply_bridge"
              className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-bone underline-offset-4 hover:underline"
            >
              {b.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[12.5px] text-mute2">
        Pick one — or scroll back up to the application when you&apos;re ready.
      </p>
    </section>
  );
}

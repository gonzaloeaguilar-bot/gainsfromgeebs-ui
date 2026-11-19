"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteSearch from "@/components/SiteSearch";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { href: "/geebs-method", label: "Method" },
  { href: "/blog", label: "Learning hub" },
  { href: "/packages", label: "Packages" },
  { href: "/supplements", label: "Supplements" },
  { href: "/referral", label: "Referral" },
  { href: "/results", label: "Results" },
  { href: "/faq", label: "FAQ" },
];

function HeaderLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex min-h-11 items-center rounded-md px-3 text-[14px] font-medium tracking-normal text-bone/72 transition-colors hover:text-bone"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isWeekPlan = pathname === "/week-plan";

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (!mobileMenuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function resetResourceRoute(event: React.MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/blog") return;

    event.preventDefault();
    setMenuOpen(false);
    window.location.assign("/blog");
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-ink/70 border-b border-line">
      {/* max-[360px]: shrinks only the narrowest phones (iPhone SE 1st gen /
          small Androids), where the brand + search + Start + Menu row overran
          the viewport and shoved the whole document sideways (issue #651). The
          fix is scoped below 360px so 375/390/414 keep their current padding,
          and it touches spacing only — the wordmark stays one line, uncut. */}
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-3 max-[360px]:gap-2 max-[360px]:px-3 md:px-10 md:py-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-[14px] font-semibold tracking-normal text-bone/88 transition-colors hover:text-bone md:text-[15px]"
          aria-label="Geebs Coaching home"
        >
          {/* The wordmark is two words and must stay on one line. Between the
              lg nav appearing and the viewport being wide enough to hold it,
              the flex row squeezed the brand and it broke into "Geebs" over
              "Coaching" — measured at 800px on 2026-09-18. */}
          <span className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cloud" />
            Geebs Coaching
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1.5">
          {/* Before Apply, because it is the control for people who do not yet
              know which of the 123 pages they want. The nav names five of
              them. */}
          <SiteSearch />

          <div className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => (
              <HeaderLink
                key={link.href}
                href={link.href}
                onClick={link.href === "/blog" ? resetResourceRoute : undefined}
              >
                {link.label}
              </HeaderLink>
            ))}
          </div>

          {/* The only CTA on every page, so it carries the site's highest
              impression count — and it read "Apply", the most administrative word
              available.

              WHY "Start" AND NOT "Get coached". Measured 2026-09-23 with the row
              released from BOTH its width and its max-width, which is the only way
              to see remaining slack: `scrollWidth <= clientWidth` proves a row
              fits but never by how much, and `width:max-content` alone is still
              clamped by max-w-[1100px], which made desktop report "needs 1100 in
              1100" whether it needed 1100 or 1400.

                                mobile(390)   desktop(1100)
                Apply           16px slack     6px slack
                Start           21px          11px
                Get coached     OVERFLOWS 32  OVERFLOWS 42
                Get started     overflows 24  overflows 33
                Coaching        overflows 10  overflows 20

              This header has no room for a longer CTA at EITHER breakpoint, and
              note that today's "Apply" clears desktop by only 6px — the row was
              already over-subscribed before this change. "Start" is less formal
              than "Apply" and improves the margin at both sizes, so it is strictly
              better than the status quo on both axes. Richer wording needs an item
              REMOVED from the header (the search trigger, or a primary link);
              that is a product decision, not a copy one.

              The arrow is gone deliberately: it costs ~24px, no other nav item has
              one, and it was the difference between fitting and not.

              CI renders ~15px WIDER than macOS — it measured 405px where this
              machine measured 390px for the same DOM. That delta is why an earlier
              attempt tuned to exactly 390px locally and then failed every mobile
              test in CI, and it is what the slack floor in
              tests/e2e/header-fits.spec.ts exists to absorb.

              data-cta is explicit because the delegated layer otherwise slugs
              cta_id from the label (public/analytics/track.js:316), which is the
              coupling lib/ctaCopy.ts exists to remove. */}
          {!isWeekPlan ? (
            <Link
              href="/apply?utm_source=site&utm_medium=nav&utm_campaign=contextual_cta&utm_content=nav_primary"
              className="inline-flex min-h-11 min-w-0 items-center gap-2 whitespace-nowrap rounded-md px-3 max-[360px]:px-2 text-[14px] font-semibold tracking-normal text-bone/80 transition-colors hover:text-bone"
              data-cta="nav_primary"
              data-cta-position="nav"
            >
              Start
            </Link>
          ) : null}

          <div className="relative lg:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="primary-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex min-h-11 items-center rounded-md px-3 max-[360px]:px-2 text-[14px] font-semibold tracking-normal text-bone/80 transition-colors hover:text-bone"
            >
              Menu
            </button>

            {menuOpen ? (
              <div
                id="primary-mobile-menu"
                className="absolute right-0 top-[calc(100%+0.5rem)] w-[min(82vw,16rem)] rounded-lg border border-line2 bg-ink2/98 p-2 shadow-2xl shadow-black/40"
              >
                <div className="mb-1 flex items-center justify-end">
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMenu}
                    className="inline-flex shrink-0 items-center justify-center text-mute2 transition-colors hover:text-bone"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(245,241,235,0.10)",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                  </button>
                </div>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-3 text-[14px] font-medium tracking-normal text-bone/88 hover:bg-bone/5"
                >
                  Home
                </Link>
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href === "/blog" ? resetResourceRoute : closeMenu}
                    className="block rounded-md px-3 py-3 text-[14px] font-medium tracking-normal text-bone/80 hover:bg-bone/5 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                ))}

              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production deploys use webpack until Vercel's Next 16 Turbopack font loader
  // resolves next/font/google reliably. Webpack also enforces route-module
  // helper exports that Turbopack accepted on the existing production app, so
  // keep deploy behavior aligned while tests cover the helper paths directly.
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2026-11-04: in CI, `next start` served every page in ms but two /results
  // next/image requests never answered, four runs in a row, three retries each
  // (Playwright trace: 55 of 57 requests done in <20 ms, the two optimizer
  // calls pending at the 30 s budget). next start's optimizer fetches the
  // source file through a mock response tied to the first caller's socket and
  // de-duplicates in-flight work per cache key, so a request the browser drops
  // mid-fetch can leave that key pending for the life of the test server.
  // Production images are optimized by Vercel, not by next start, so the e2e
  // build serves the raw files instead. Only the CI e2e build sets this flag.
  images: {
    unoptimized: process.env.GEEBS_E2E_UNOPTIMIZED_IMAGES === "1",
  },
  // Missing on every response before 2026-09-23 (GEO audit). Both are pure
  // defence-in-depth with no rendering or caching effect.
  //
  // NOT changed, deliberately, though the audit suggested both:
  //   - Cache-Control. Production returns `public, max-age=0, must-revalidate`
  //     alongside `x-vercel-cache: HIT` and `age: 37016`. That is Vercel's normal
  //     pattern, not an over-aggressive setting: the CDN serves the page instantly
  //     while browsers revalidate. Overriding it globally risks serving stale HTML,
  //     which has already bitten this repo once.
  //   - 301 instead of 308. Next emits 308 for `permanent: true` and Google treats
  //     301 and 308 identically as permanent redirects, so there is nothing to fix.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 2026-10-13: the men's plateau post was merged into the calorie-deficit
      // guide (niche #5). Same causes, same advice; the guide now carries the
      // protein-in-a-deficit trial the post had, so one URL competes for
      // "calorie deficit but not losing weight" instead of two.
      {
        source: "/blog/fat-loss-plateau-men",
        destination: "/guides/why-am-i-not-losing-weight-in-a-calorie-deficit",
        permanent: true,
      },
      // 2026-10-12: the full lever-by-lever breakdown that lived at this blog
      // slug was folded into /geebs-method itself (same content, same page)
      // so the Method is explained once instead of split across two URLs.
      {
        source: "/blog/what-is-the-geebs-method",
        destination: "/geebs-method",
        permanent: true,
      },
      // Instagram still sends readers to three posts that were WITHDRAWN on
      // 2026-08-10 because their citations were fabricated — one PMID cited as
      // a cortisol study resolves to a rodent spinal-microglia paper. The 404
      // was correct and protective, but measured 2026-09-24 those three URLs
      // took 4 Instagram sessions and 22 views, so the reader got nothing
      // instead of the nearest properly sourced page. Do NOT resolve these by
      // republishing; the drafts stay drafts until their sourcing is rebuilt.
      {
        source: "/blog/2026-08-09-does-fasted-weight-training-burn-more-fat",
        destination: "/blog/how-much-cardio-for-fat-loss-men",
        permanent: true,
      },
      {
        source: "/blog/2026-08-09-8-exercises-to-build-a-complete-physique",
        destination: "/blog/beginner-strength-training-for-men",
        permanent: true,
      },
      {
        source: "/blog/2026-08-09-coffee-with-butter-the-bulletproof-coffee-science-review",
        destination: "/science/caffeine-and-growth-hormone",
        permanent: true,
      },
      // Same deck, older name. /presentations/personal-training is the "Titan
      // Forge Personal Training Deck"; the intro-call URL took 13 views and a
      // live Instagram session while 404ing.
      {
        source: "/presentations/titan-forge-intro-call",
        destination: "/presentations/personal-training",
        permanent: true,
      },
      // Niche #3 (2026-10-13): the after-30 post merged into the restart hub,
      // so one URL carries "getting back in shape" instead of two that split it.
      {
        source: "/blog/getting-back-in-shape-after-30",
        destination: "/guides/getting-back-in-shape-after-a-long-break",
        permanent: true,
      },
      // Withdrawn 2026-08-10 for fabricated citations and never served (URL
      // Inspection 2026-10-08: unknown to Google). Its topic now lives on the
      // over-40 recomp hub, whose figures were checked against each abstract.
      {
        source: "/blog/2026-08-09-the-complete-guide-to-anti-aging-fitness-for-men-over-40",
        destination: "/body-recomposition-over-40",
        permanent: true,
      },
      {
        source: "/blog/best-online-fitness-coaches-for-men",
        destination: "/blog/best-online-fitness-coaches-for-busy-men",
        permanent: true,
      },
      {
        source: "/prog90",
        destination: "/apply",
        permanent: true,
      },
      {
        source: "/fitbudd",
        destination: "/apply",
        permanent: true,
      },
      {
        source: "/memberships/community-app",
        destination: "/memberships/science-based-community",
        permanent: true,
      },
      {
        source: "/programs/90-day-transformation",
        destination: "/packages",
        permanent: true,
      },
      // The calculator lives at /tools/body-recomposition-calculator. Search
      // Console showed Google holding a root-level copy of the URL
      // (2026-09-06..10-04, 404 when fetched), and the short "recomp" slugs
      // are what people type. Send them all to the one canonical page so the
      // "body recomp calculator" queries consolidate on a single URL.
      ...[
        "/body-recomposition-calculator",
        "/body-recomp-calculator",
        "/recomp-calculator",
        "/tools/body-recomp-calculator",
        "/tools/recomp-calculator",
      ].map((source) => ({
        source,
        destination: "/tools/body-recomposition-calculator",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

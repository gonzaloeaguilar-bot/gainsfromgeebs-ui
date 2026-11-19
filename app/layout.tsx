import type { Metadata, Viewport } from "next";
import { COACH_JOB_TITLE, ORG_ALT_NAMES, ORG_NAME, ENTITY_SENTENCE } from "@/lib/entity";
import { Lexend, Newsreader } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Metricool } from "@/components/Metricool";
import { Heatmap } from "@/components/Heatmap";
import ApplySourceTracker from "@/components/ApplySourceTracker";
import ApplySheet from "@/components/ApplySheet";
import PageFolds from "@/components/PageFolds";
import BookOpen from "@/components/BookOpen";
import RecompRibbon from "@/components/RecompRibbon";
import ScholarshipOfferLink from "@/components/ScholarshipOfferLink";
import GeebsChatWidget from "@/components/GeebsChatWidget";
import DayOneBoot from "@/components/DayOneBoot";
import DayOneLoader from "@/components/DayOneLoader";
import InstagramDmCompanion from "@/components/InstagramDmCompanion";
import DockBar from "@/components/DockBar";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const iconVersion = "20260605";

export const metadata: Metadata = {
  title: "Gains from Geebs | 1:1 Online Fitness & Transformation Coach | Kris Oddo",
  description:
    "Transform your body with Gains from Geebs (gainsfromgeebs) coaching by NASM-CPT Kris Oddo. Custom 1:1 training, nutrition, and daily accountability built around your real lifestyle.",
  metadataBase: new URL("https://gainsfromgeebs.com"),
  openGraph: {
    type: "website",
    url: "https://gainsfromgeebs.com",
    title: "Gains from Geebs | 1:1 Online Fitness & Transformation Coach | Kris Oddo",
    description:
      "Transform your body with Gains from Geebs (gainsfromgeebs) coaching by NASM-CPT Kris Oddo. Custom 1:1 training, nutrition, and daily accountability built around your real lifestyle.",
    siteName: "Gains from Geebs",
    locale: "en_US",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Gains from Geebs — 1:1 Online Fitness Coaching by Kris Oddo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gains from Geebs | 1:1 Online Fitness & Transformation Coach | Kris Oddo",
    description:
      "Transform your body with Gains from Geebs (gainsfromgeebs) coaching by NASM-CPT Kris Oddo. Custom 1:1 training, nutrition, and daily accountability built around your real lifestyle.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: `/favicon.ico?v=${iconVersion}`, sizes: "any" },
      { url: `/icon.svg?v=${iconVersion}`, type: "image/svg+xml" },
    ],
    apple: [{ url: `/apple-touch-icon.png?v=${iconVersion}`, sizes: "180x180", type: "image/png" }],
    shortcut: `/favicon.ico?v=${iconVersion}`,
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-TileImage": `/apple-touch-icon.png?v=${iconVersion}`,
  },
  alternates: {
    // No trailing slash: Next (trailingSlash: false) strips it at render, so the
    // emitted canonical is slash-less. Sitemap homepage must match (see sitemap.ts).
    canonical: "https://gainsfromgeebs.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://gainsfromgeebs.com/#website",
  url: "https://gainsfromgeebs.com",
  name: ORG_NAME,
  alternateName: ORG_ALT_NAMES,
  description:
    "Gains From Geebs (gainsfromgeebs) is a 1:1 online fitness coaching practice for men and women, delivered by Kris Oddo, NASM-CPT. Hard individualized training, nutrition coaching, daily accountability, and weekly check-ins.",
  publisher: {
    "@id": "https://gainsfromgeebs.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://gainsfromgeebs.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Online Body Transformation Coaching",
  description:
    "Coach-led 1:1 online fitness coaching for men and women. The Geebs Method combines hard individualized training, nutrition guidance that supports the training, recovery habits, daily accountability, and weekly check-ins. Programming and methodology by Kris Oddo, NASM-CPT.",
  provider: {
    "@id": "https://gainsfromgeebs.com/#organization",
  },
  areaServed: "Worldwide (fully remote)",
  serviceType: "Personal Training and Nutrition Coaching",
  audience: {
    "@type": "Audience",
    audienceType: "Adults seeking 1:1 online fitness coaching",
  },
  url: "https://gainsfromgeebs.com/apply",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://gainsfromgeebs.com/#kris-oddo",
  name: "Kris Oddo",
  alternateName: "Kristopher Oddo",
  // Same words as the visible <EntityLine />, so the markup and the page agree.
  jobTitle: COACH_JOB_TITLE,
  description: `${ENTITY_SENTENCE} The coaching focuses on body recomposition, nutrition, and sustainable habit building for men and women.`,
  url: "https://gainsfromgeebs.com/about",
  image: "https://gainsfromgeebs.com/kris-hero.jpg",
  worksFor: {
    "@id": "https://gainsfromgeebs.com/#organization",
  },
  // PR #34 over-corrected by removing all Titan Forge references. Kris genuinely
  // coached clients at Titan Forge as a partner/coach — that is what the public
  // Google reviews on /results are from. "affiliation" (not worksFor) is the
  // accurate framing. The wrongly-attributed title "VP at Titan Forge Fit" that
  // PR #34 targeted is NOT used here.
  affiliation: {
    "@type": "Organization",
    name: "Titan Forge",
    url: "https://titanforgefit.com",
  },
  knowsAbout: [
    "body recomposition",
    "fitness coaching for men and women",
    "nutrition coaching",
    "strength training",
    "online personal training",
    "fat loss coaching",
    "accountability coaching",
    "The Geebs Method",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "NASM-CPT",
    credentialCategory: "certification",
  },
  // SAFE: IG/TikTok/YouTube from a business site is standard practice.
  // DO NOT add OnlyFans or Beacons/Linktree — banned per cross-platform safety model.
  sameAs: [
    "https://gainsfromgeebs.com/about",
    "https://instagram.com/gainsfromgeebs",
    "https://tiktok.com/@gainsfromgeebs",
    "https://youtube.com/@gainsfromgeebs",
    "https://www.linkedin.com/in/kristopher-oddo/",
    // Sister gym where Kris also coaches in person (cross-citation, 2026-11-04).
    "https://titanforgefit.com/",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://gainsfromgeebs.com/#organization",
  name: ORG_NAME,
  alternateName: ORG_ALT_NAMES,
  description:
    "Gains From Geebs (gainsfromgeebs) is a 1:1 online fitness coaching practice for men and women, founded and run by Kris Oddo, NASM-certified personal trainer. The practice is built around The Geebs Method: hard individualized training, nutrition that supports training, recovery habits, and daily accountability for imperfect weeks.",
  url: "https://gainsfromgeebs.com",
  foundingDate: "2024",
  founder: {
    "@id": "https://gainsfromgeebs.com/#kris-oddo",
  },
  logo: {
    "@type": "ImageObject",
    url: "https://gainsfromgeebs.com/social-preview-coaching.jpg",
    width: 1200,
    height: 630,
  },
  contactPoint: {
    "@type": "ContactPoint",
    url: "https://gainsfromgeebs.com/apply",
    contactType: "customer service",
  },
  sameAs: [
    "https://gainsfromgeebs.com",
    "https://instagram.com/gainsfromgeebs",
    "https://tiktok.com/@gainsfromgeebs",
    "https://youtube.com/@gainsfromgeebs",
    "https://www.linkedin.com/in/kristopher-oddo/",
    // Sister gym where Kris also coaches in person (cross-citation, 2026-11-04).
    "https://titanforgefit.com/",
  ],
};

// Local entity — establishes Denver, CO as the primary service hub and ties
// the brand (#organization) and coach (#kris-oddo, whose sameAs includes the
// LinkedIn profile) to a geographic location for local coaching context.
// answers. NAP is kept consistent with /personal-training-denver: Denver-based,
// primarily online (no street address — service-area business), in-person
// available for qualified local clients.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://gainsfromgeebs.com/#localbusiness",
  name: "Gains from Geebs",
  alternateName: ["Geebs Coaching", "gainsfromgeebs", "Gains From Geebs"],
  description:
    "Gains from Geebs Denver-based 1:1 online fitness coaching by Kris Oddo, NASM-CPT. Body recomposition, strength training, and nutrition coaching for busy professionals — fully remote worldwide, with limited in-person personal training in Denver for qualified clients.",
  url: "https://gainsfromgeebs.com",
  image: "https://gainsfromgeebs.com/kris-hero.jpg",
  priceRange: "$$$",
  parentOrganization: { "@id": "https://gainsfromgeebs.com/#organization" },
  brand: { "@id": "https://gainsfromgeebs.com/#organization" },
  founder: { "@id": "https://gainsfromgeebs.com/#kris-oddo" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  areaServed: [
    { "@type": "City", name: "Denver" },
    { "@type": "AdministrativeArea", name: "Colorado" },
    "Worldwide (online coaching)",
  ],
  knowsAbout: [
    "body recomposition",
    "online fitness coaching",
    "personal training Denver",
    "nutrition coaching",
    "strength training",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@id": "https://gainsfromgeebs.com/#organization" },
    url: "https://gainsfromgeebs.com/apply",
  },
  sameAs: [
    "https://instagram.com/gainsfromgeebs",
    "https://tiktok.com/@gainsfromgeebs",
    "https://youtube.com/@gainsfromgeebs",
    "https://www.linkedin.com/in/kristopher-oddo/",
    // Sister gym where Kris also coaches in person (cross-citation, 2026-11-04).
    "https://titanforgefit.com/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${lexend.variable} ${newsreader.variable} min-h-screen antialiased`}
      >
        {/* First child of <body>: it runs while the document is still parsing,
            so the decision is taken before anything paints. */}
        <DayOneBoot />
        <DayOneLoader />
        <GoogleAnalytics />
        <Metricool />
        <Heatmap />
        <ApplySourceTracker />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <RecompRibbon />
        <ScholarshipOfferLink />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <DockBar />
        <InstagramDmCompanion />
        <ApplySheet />
        {/* Global: every long page gets its index and folds, wherever it was
            written and whichever shell it uses. */}
        <PageFolds source="global" />
        <BookOpen />
        <GeebsChatWidget />
      </body>
    </html>
  );
}

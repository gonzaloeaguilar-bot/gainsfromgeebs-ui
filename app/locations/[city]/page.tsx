import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/ArticleLayout";
import ProofStrip from "@/components/ProofStrip";
import {
  CITY_SLUGS,
  getCityLocation,
  serviceRadiusMeters,
  type CityLocation,
} from "@/data/locations";

const SITE_URL = "https://gainsfromgeebs.com";

// Prerender every known market at build time; reject anything else.
export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityLocation(slug);
  if (!city) {
    return {};
  }

  const title = `Online Fitness Coaching in ${city.name}, CO | Geebs Coaching`;
  const description = `1:1 online fitness coaching for ${city.name}, Colorado with NASM-CPT Kris Oddo. Custom training, nutrition, and accountability for busy professionals — body recomposition without living in a gym.`;
  // Denver consolidates to the established money page.
  const canonical = city.canonicalTo
    ? `${SITE_URL}${city.canonicalTo}`
    : `${SITE_URL}/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/locations/${city.slug}`,
      title: `Online Fitness Coaching in ${city.name}, CO`,
      description,
      siteName: "Geebs Coaching",
      images: [
        {
          url: "/social-preview-coaching.jpg",
          width: 1200,
          height: 630,
          alt: `Online fitness coaching in ${city.name}, Colorado`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Online Fitness Coaching in ${city.name}, CO`,
      description,
      images: ["/social-preview-coaching.jpg"],
    },
    robots: city.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

function localBusinessSchema(city: CityLocation) {
  // Service, not LocalBusiness: there is no office in this market, and Google
  // requires a postal address on every LocalBusiness. The business itself is
  // the Denver #localbusiness node; this page describes the service it
  // delivers to the named area.
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/locations/${city.slug}#service`,
    name: `Geebs Coaching — Online Fitness Coaching serving ${city.name}, CO`,
    description: `Denver-based online 1:1 fitness coaching by Kris Oddo, NASM-CPT, serving ${city.name}, Colorado. Body recomposition, strength training, and nutrition coaching delivered online to the ${city.name} area.`,
    url: `${SITE_URL}/locations/${city.slug}`,
    image: `${SITE_URL}/kris-hero.jpg`,
    serviceType: "Online fitness coaching",
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    brand: { "@id": `${SITE_URL}/#organization` },
    // Service boundary — a GeoCircle around the market plus the named market
    // and its postal codes. A service area, not a postal address.
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: city.lat,
          longitude: city.lng,
        },
        geoRadius: serviceRadiusMeters(city),
      },
      `${city.name}, Colorado, US`,
      ...city.postalCodes.map((code) => `${code}, Colorado, US`),
    ],
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/apply`,
    },
  };
}

function faqSchema(city: CityLocation) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer fitness coaching in ${city.name}, CO?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Geebs Coaching delivers 1:1 online fitness coaching to ${city.name}, Colorado and the surrounding ${city.region === "CO" ? "Denver metro" : ""} area. Coaching is online-first — training, nutrition, weekly check-ins, and daily accountability — so you do not need to be near a specific gym. Kris is based in Denver; limited in-person sessions may be available for qualified Denver-metro clients.`,
        },
      },
      {
        "@type": "Question",
        name: `Is this in-person personal training or online coaching in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The core offer is online 1:1 coaching, which is what serves ${city.name} clients. Because Kris is Denver-based, limited premium in-person training may be available for qualified clients in the Denver metro — confirmed after the application.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does coaching cost for ${city.name} clients?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Geebs Coaching is a real investment, not a low-cost app subscription. Exact package options are covered on the strategy call after the application. The $24.99/month Science-Based Community and the $100 one-time consultation call are available as lower-cost entry points.`,
        },
      },
    ],
  };
}

export default async function CityLocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityLocation(slug);
  if (!city) {
    notFound();
  }
  const locationFaqSchema = faqSchema(city);

  return (
    <>
      <JsonLd id={`loc-${city.slug}-localbusiness`} data={localBusinessSchema(city)} />
      <JsonLd id={`loc-${city.slug}-faq`} data={locationFaqSchema} />
      <ArticleLayout
        eyebrow={`${city.name}, Colorado`}
        title={`Online Fitness Coaching in ${city.name}, CO`}
        containerAs="article"
        containerClassName="max-w-[760px]"
        headerClassName=""
        titleClassName="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]"
        intro={
          <>
            <p className="prose-lead mt-6 max-w-[60ch] text-bone/85">
              Premium 1:1 online coaching with Kris Oddo, NASM-CPT, for {city.name}{" "}
              professionals — custom training, nutrition, and daily accountability,{" "}
              {city.proximity}.
            </p>
            <ProofStrip className="mt-6" />
          </>
        }
      >


        <div className="hair my-10 md:my-14" />

        {/* Map placeholder — service area, not a storefront pin. */}
        <section
          aria-label={`${city.name} service area`}
          className="rounded-2xl border border-line2 bg-ink3/40 p-6 md:p-8"
        >
          <p className="eyebrow text-cloudText">Service area</p>
          <div
            role="img"
            aria-label={`Map placeholder for the ${city.name}, CO service area`}
            className="mt-4 flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-line2 bg-black/20 text-center"
          >
            <div className="px-6 py-8">
              <p className="text-bone text-[16px] font-semibold">
                {city.name}, CO &middot; online coaching
              </p>
              <p className="mt-2 text-[13.5px] text-mute leading-[1.6]">
                Serving {city.landmarks.slice(0, 3).join(", ")} and the wider{" "}
                {city.name} area &middot; {city.proximity}.
              </p>
              <p className="mt-2 text-[12px] text-mute2">
                Approx. center {city.lat.toFixed(4)}, {city.lng.toFixed(4)} &middot;{" "}
                ZIPs {city.postalCodes.join(", ")}
              </p>
            </div>
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <FAQSection
          faqs={locationFaqSchema.mainEntity}
          id={`location-${city.slug}-faq-heading`}
        />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Coaching built for {city.name}
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            {city.intro}
          </p>
          <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]">
            {city.audience}
          </p>
        </section>

        <div className="hair my-10" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Online-first, Denver-based
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Geebs Coaching is delivered online: custom programming, nutrition
            targets, weekly check-ins, and daily accountability. That is what
            serves {city.name} clients — you do not need to be near a particular
            gym for it to work. Kris Oddo is based in Denver, so for qualified
            Denver-metro clients, limited premium in-person sessions may be
            available on top of the online relationship.
          </p>
          <p className="mt-4 text-[15px] text-mute max-w-[64ch] leading-[1.65]">
            Near {city.landmarks[city.landmarks.length - 1]}? Distance is not the
            constraint — the method travels with you, on the road, at home, or in
            whatever gym you already use.
          </p>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Start with the application
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The application takes under two minutes. It tells Kris whether online
            1:1 coaching, a lower-cost option like the $100 consultation call, or —
            for qualified Denver-metro clients — premium in-person training is
            the right next step.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/personal-training-denver" className="btn btn-secondary">
              Denver in-person training
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Online coaching by Kris Oddo, NASM-CPT, serving {city.name}, Colorado
            and the Denver metro.
          </p>
        </footer>
      </ArticleLayout>
    </>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import KrisTrainingBroll from "@/components/KrisTrainingBroll";
import ProofStrip from "@/components/ProofStrip";
import Link from "next/link";
import TitanForgeSisterNote from "@/components/TitanForgeSisterNote";
import { krisTrainingVideoSchema } from "@/data/krisMedia";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/personal-training-denver";

export const metadata: Metadata = {
  title: "Personal Training Denver | 1:1 Online + In-Person Coaching",
  description:
    "Personal training in Denver with NASM-CPT Kris Oddo: custom programming, nutrition coaching, weekly calls. In-person sessions available for qualified clients.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Private Personal Training in Denver",
    description:
      "Premium in-person coaching in Denver with Kris Oddo for qualified clients.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Private personal training in Denver by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Personal Training in Denver",
    description:
      "Premium private personal training in Denver with Kris Oddo, NASM-CPT.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "Premium in-person coaching in Denver",
    paras: [
      "Kris Oddo is based in Denver, Colorado. Geebs Coaching is primarily an online 1:1 coaching business, but limited in-person personal training may be available locally at a premium for qualified clients.",
      "The in-person lane is intentionally separate from the online offer. Online coaching handles programming, nutrition, check-ins, and messaging. In-person coaching adds live session time with Kris when location, schedule, and fit all make sense.",
      "Exact availability and package options are covered after the application. The point is to protect fit, not sell a public price sheet.",
    ],
  },
  {
    h2: "Who the Denver offer fits",
    paras: [
      "This is best for qualified clients in the Denver area who want direct coaching, higher-touch support, and live session feedback instead of a template or crowded group class.",
      "It can fit executives, founders, tech workers, and high-income professionals who want private coaching and are willing to invest in the extra access.",
      "If in-person is not the right fit, the online 1:1 path is still the core offer and can support clients without being tied to Denver.",
    ],
  },
  {
    h2: "What stays the same",
    paras: [
      "The method is the same: progressive resistance training, nutrition guidance, daily accountability, weekly review, and adjustments based on the real week.",
      "The difference is delivery. Some clients need the convenience of online coaching. Some local clients want the premium layer of live coaching. The application decides which path makes sense.",
    ],
  },
];

const faqs = [
  {
    q: "Does Kris offer personal training in Denver?",
    a: "Yes, limited premium in-person personal training may be available in Denver for qualified clients. Availability, location, and package options are confirmed after the application.",
  },
  {
    q: "Is Denver personal training more expensive than online coaching?",
    a: "In-person coaching is positioned as a premium option because it includes live session time with Kris. Exact options are covered after the application and strategy call.",
  },
  {
    q: "Can I still work with Kris if I am not in Denver?",
    a: "Yes. Geebs Coaching is primarily delivered online through the 1:1 coaching tiers, with the $24.99/month community and the $100 one-time consultation call as lower-cost options.",
  },
  {
    q: "Who is Denver in-person training for?",
    a: "It is for qualified local clients who want a higher-touch, private coaching relationship and are ready to invest in live coaching support.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const localServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Personal Training in Denver",
  description:
    "Premium private personal training in Denver with Kris Oddo, NASM-CPT, for qualified local clients.",
  provider: {
    "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach and Personal Trainer",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "NASM-CPT",
      credentialCategory: "certification",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Denver",
  },
  serviceType: "Private Personal Training",
  url: `${SITE_URL}${SLUG}`,
};

export default function PersonalTrainingDenverPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="denver-faq-schema" data={faqSchema} />
      <JsonLd id="denver-service-schema" data={localServiceSchema} />
      <JsonLd id="denver-training-video-schema" data={krisTrainingVideoSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Denver, Colorado</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Private personal training in Denver
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Premium in-person coaching with Kris Oddo, NASM-CPT, for qualified
            local clients in Denver. Limited availability, application required.{" "}
            <TitanForgeSisterNote placement="personal_training_denver_intro" />
          </p>
          <ProofStrip className="mt-6" />
        </header>

        <div className="hair my-10 md:my-14" />

        <KrisTrainingBroll />

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <FAQSection faqs={faqSchema.mainEntity} />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Apply for the right coaching path
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            The application tells Kris whether online 1:1, premium Denver
            in-person coaching, or a lower-cost option like the $100 consultation
            call is the right next step. If you want the online-first local lane, read the{" "}
            <Link
              href="/blog/online-fitness-coach-denver"
              className="underline hover:text-bone"
            >
              online fitness coach in Denver guide
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary">
              Apply for coaching
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/methodology" className="btn btn-secondary">
              See the methodology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Coaching by Kris Oddo, NASM-CPT. Last updated 2026-05-22.</p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

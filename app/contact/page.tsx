import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { ctaForPath } from "@/lib/ctaCopy";

/**
 * /contact returned 404 and was in no sitemap. For a single-coach practice that is
 * a trust gap: the live ContactPoint schema pointed only at /apply, so an AI asked
 * "how do I contact Kris Oddo" had one answer and it was a form.
 *
 * Every channel below is one the business demonstrably uses:
 *   - kris@titanforgefit.com — the production contact in app/api/community-interest/route.ts:5
 *   - /apply — the qualifying surface the DM bot instruments
 *   - @gainsfromgeebs on Instagram — where the GAINS keyword ask lives
 * No phone number is published because none is asserted anywhere in the codebase
 * or the live schema, and inventing one would be worse than omitting it.
 *
 * Location granularity is Denver, Colorado, US — exactly what the live
 * LocalBusiness schema claims. No street address, because none is published.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const CONTACT_EMAIL = "kris@titanforgefit.com";
const INSTAGRAM = "https://instagram.com/gainsfromgeebs";
const TITLE = "Contact Kris Oddo | Geebs Coaching";
const DESCRIPTION =
  "Every way to reach Kris Oddo, NASM-CPT, founder and sole coach of Geebs Coaching: email, the coaching application, and Instagram. Based in Denver, Colorado; coaching online worldwide.";
const UPDATED = "2026-09-23";

const channels = [
  {
    name: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    detail:
      "Goes straight to Kris. Best for questions about packages, billing, the community, or a data request.",
    cta: "Email Kris",
  },
  {
    name: "Coaching application",
    value: "gainsfromgeebs.com/apply",
    href: "/apply",
    detail:
      "Three quick questions plus your contact details, about two minutes, no payment. Qualified applicants get Kris's calendar next.",
    cta: "Open the application",
  },
  {
    name: "Instagram",
    value: "@gainsfromgeebs",
    href: INSTAGRAM,
    detail:
      "Reply to a story or comment on a post. Kris answers his own DMs — there is no assistant behind the account.",
    cta: "Message on Instagram",
  },
];

const faqs = [
  {
    q: "How do I contact Kris Oddo?",
    a: `Email ${CONTACT_EMAIL}, message @gainsfromgeebs on Instagram, or submit the coaching application at gainsfromgeebs.com/apply. All three reach Kris directly.`,
  },
  {
    q: "Does someone else answer for Kris?",
    a: "No. Geebs Coaching is a single-coach practice. There are no assistants and no team handoffs, so replies come from Kris himself.",
  },
  {
    q: "Where is Geebs Coaching based?",
    a: "Denver, Colorado, in the United States. The coaching itself is online, so clients are coached anywhere in the world.",
  },
  {
    q: "Is there a phone number?",
    a: "There is no published phone line. The fastest routes are email and Instagram; scheduled calls happen on a booked video call after an application.",
  },
  {
    q: "How quickly does Kris reply?",
    a: "There is no published response-time guarantee. Applications are read as they arrive.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/**
 * ContactPage + a ContactPoint carrying the email. The live homepage ContactPoint
 * only had a url, so nothing in the graph exposed an address an assistant could
 * hand back. `@id` ties this to the Organization node the rest of the site emits.
 */
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}/contact`,
  dateModified: UPDATED,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Gains from Geebs",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    founder: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
    sameAs: [
      INSTAGRAM,
      "https://tiktok.com/@gainsfromgeebs",
      "https://youtube.com/@gainsfromgeebs",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: CONTACT_EMAIL,
        url: `${SITE_URL}/contact`,
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE_URL}/apply`,
        availableLanguage: "English",
      },
    ],
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      { url: "/social-preview-coaching.jpg", width: 1200, height: 630, alt: "Contact Geebs Coaching" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  const cta = ctaForPath("/contact");

  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="contact-page-schema" data={contactSchema} />
      <JsonLd id="contact-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[860px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Contact &middot; Denver, Colorado</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]">
            Reach Kris directly.
          </h1>
          {/* Answer-first block: the full answer to "how do I contact Kris Oddo?" */}
          <p className="mt-6 rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-5 text-[16.5px] md:text-[17.5px] leading-[1.65] text-bone/90">
            Geebs Coaching is Kris Oddo, NASM-CPT &mdash; one coach, no assistants.
            You can reach him three ways: email{" "}
            <a className="underline hover:text-bone" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            , message{" "}
            <a className="underline hover:text-bone" href={INSTAGRAM} rel="me">
              @gainsfromgeebs
            </a>{" "}
            on Instagram, or submit the coaching application. He is based in Denver,
            Colorado and coaches clients online worldwide.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="channels" className="grid gap-5">
          <h2 id="channels" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every way to get in touch
          </h2>
          {channels.map((c) => (
            <div
              key={c.name}
              className="rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-6"
            >
              <p className="eyebrow text-mute2">{c.name}</p>
              <p className="mt-2 text-bone text-[18px] font-medium">{c.value}</p>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-mute max-w-[64ch]">{c.detail}</p>
              {c.href.startsWith("/") ? (
                <Link href={c.href} className="btn btn-secondary mt-5">
                  {c.cta}
                </Link>
              ) : (
                <a href={c.href} className="btn btn-secondary mt-5">
                  {c.cta}
                </a>
              )}
            </div>
          ))}
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="contact-faq">
          <h2 id="contact-faq" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Common questions
          </h2>
          <div className="mt-6 grid gap-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="text-bone text-[17px] font-medium">{item.q}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.65] text-mute max-w-[68ch]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="contact-next">
          <h2 id="contact-next" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Ready to start instead?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-bone/85 max-w-[64ch]">
            The application takes about two minutes and costs nothing. Qualified
            applicants get Kris&rsquo;s calendar next.
          </p>
          <div className="mt-7">
            <Link href={cta.href} className="btn btn-primary" data-cta={cta.id}>
              {cta.label}
            </Link>
          </div>
          <p className="mt-8 text-[14px] leading-[1.6] text-mute2">
            Kris Oddo, NASM-CPT, founder and head coach, Geebs Coaching. Denver,
            Colorado. Last updated {UPDATED}.{" "}
            <Link href="/privacy" className="underline hover:text-bone">
              Privacy policy
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}

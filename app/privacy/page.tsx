import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

/**
 * There was no privacy policy on this site, and nothing in git history suggests
 * there ever was one — while the site runs GA4, stores applications in Supabase,
 * and collects a name, email and phone number through /apply. That is a legal and
 * trust gap before it is a GEO one, which is why this page exists.
 *
 * EVERY statement below was read out of the code on 2026-09-23, not drafted from a
 * template:
 *   - collected fields: the submitted payload shape in app/apply/ApplyForm.tsx and
 *     the persisted column list in app/apply/application.ts. An independent review
 *     TWO separate reviews APPROVED drafts of this page that OMITTED collected
 *     fields. The first missed ig_handle and both marketing-consent fields. The
 *     second missed the SERVER-captured request metadata — IP address, user agent
 *     and referrer — which app/apply/actions.ts getRequestMetadata() reads and
 *     app/apply/application.ts:680-682 persists on EVERY application row. That
 *     second omission also made the "Analytics identifiers" wording materially
 *     false: it claimed nothing was joined to an application unless one was
 *     submitted, while an IP and a browser string sit on the row itself.
 *     The lesson is structural, not a reminder to be careful: the field list must be
 *     derived from the PERSISTED COLUMNS in application.ts, not from the form's
 *     inputs, because the server adds fields the form never shows.
 *   - processors: the integrations actually present in app/ and lib/ (Supabase,
 *     Resend, Calendly, Shopify, Telegram, ManyChat) plus GA4, verified live
 *   - contact address: kris@titanforgefit.com, already the production contact in
 *     app/api/community-interest/route.ts:5
 *   - location: Denver, CO, US — the only granularity the live LocalBusiness
 *     schema asserts. No street address is claimed because none is published.
 *
 * It deliberately makes NO commitment the business does not demonstrably keep —
 * no retention window, no deletion SLA, no "we never share" absolute. Adding an
 * unkept promise would be worse than the gap it closes.
 *
 * OWNER SIGN-OFF STILL OWED: this is an accurate factual disclosure of the data
 * flows, not lawyer-reviewed copy. Kris should confirm the retention and
 * deletion-request lines before anyone treats it as a legal representation.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const CONTACT_EMAIL = "kris@titanforgefit.com";
const TITLE = "Privacy Policy | Geebs Coaching";
const DESCRIPTION =
  "What Geebs Coaching collects when you apply, which services process it, and how to ask for your data to be removed. Written from the site's actual data flows.";
const UPDATED = "2026-09-23";

const collected = [
  {
    what: "Application details",
    detail:
      "Your name, email address and phone number, your Instagram handle if you give one, and the answers you choose on the application: your main goal, how consistent you have been, the monthly investment band you select, whether you are ready to start, the package you picked if you came from a package card, anything you add in the free-text box, and which next step you choose at the end.",
  },
  {
    what: "Marketing permissions, and the exact wording you agreed to",
    detail:
      "Whether you ticked the email and text-message boxes on the application, the time you ticked them, which step you were on, and a copy of the consent wording that was on screen when you did. Keeping the wording means there is a record of what you actually agreed to rather than only that you agreed. If you tick neither box, you still get the replies about your own application.",
  },
  {
    what: "How you arrived",
    detail:
      "The page you applied from, and campaign parameters in the link you followed (for example utm_source and utm_medium). This is how we tell whether an application came from Instagram, a guide, or a calculator.",
  },
  {
    what: "Technical details of the device you applied from",
    detail:
      "When you submit an application, the server also records your IP address, your browser and device description, and the web address you arrived from. These are stored on the application itself, so they are connected to your name and email rather than anonymous. They exist so a submission can be traced if something goes wrong with it and to tell a real application from an automated one.",
  },
  {
    what: "Age confirmation",
    detail:
      "Whether you confirmed you are 18 or over. Coaching is not offered to under-18s.",
  },
  {
    what: "Analytics identifiers",
    detail:
      "A Google Analytics client and session identifier, whether you consented to analytics, and the pages you view and buttons you press. On their own these describe a browser and a session rather than a named person. If you submit an application, the analytics identifier is stored alongside it so the application can be matched to the visit it came from.",
  },
  {
    what: "Messages you send",
    detail:
      "If you use the chat on the site, or reply to a story or comment on Instagram, the content of those messages.",
  },
];

const processors = [
  {
    name: "Google Analytics 4",
    role: "Measures page views, button presses and traffic sources so we know which pages are useful.",
  },
  {
    name: "Supabase",
    role: "Stores submitted applications.",
  },
  {
    name: "Resend",
    role: "Sends the notification and confirmation emails that follow an application.",
  },
  {
    name: "Calendly",
    role: "Books the call with Kris after a qualified application.",
  },
  {
    name: "Shopify",
    role: "Takes payment for the one-time consultation call and the community membership. Card details are handled by Shopify and never reach this site.",
  },
  {
    name: "Telegram",
    role: "Runs the Science-Based Community. Joining means creating a Telegram account under Telegram's own terms.",
  },
  {
    name: "ManyChat",
    role: "Handles Instagram direct messages and comment replies for @gainsfromgeebs.",
  },
  {
    name: "Vercel",
    role: "Hosts the site and serves every page.",
  },
];

const faqs = [
  {
    q: "Does Geebs Coaching sell personal data?",
    a: "No. Application details are used to decide whether coaching is a fit and to contact you about it. They are not sold, and they are not passed to advertisers.",
  },
  {
    q: "How do I ask for my data to be deleted?",
    a: `Email ${CONTACT_EMAIL} from the address you applied with and ask for your application to be removed. You do not need to give a reason.`,
  },
  {
    q: "How do I stop marketing emails?",
    a: `Reply to any of them and say so — every one of those emails ends with "Reply to unsubscribe anytime", and the reply reaches Kris directly. You can also email ${CONTACT_EMAIL}. Withdrawing marketing permission does not affect replies about an application you already sent.`,
  },
  {
    q: "Does this site text me?",
    a: "No. The application has a box for text-message permission and records your answer, but no text message is sent from this site today — there is no text-sending system connected to it. If that ever changes, the wording you agreed to is on file, and this page will say how to stop them before any are sent.",
  },
  {
    q: "Do I have to accept analytics cookies?",
    a: "Analytics respects your browser's Do Not Track setting. If Do Not Track is on, the site does not send analytics events for your visit.",
  },
  {
    q: "Who can see my application?",
    a: "Kris Oddo reads and answers applications. A finished one is sent to his private Telegram notification channel and to a coaching inbox he reads, you are emailed a confirmation at the address you applied with, and the stored records sit in a database reached with a server-side key rather than a public login, so an application is not browsable by visiting the site.",
  },
  {
    q: "Is payment information stored on this site?",
    a: "No. Payments for the consultation call and the community go through Shopify checkout. Card details never reach gainsfromgeebs.com.",
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

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}/privacy`,
  dateModified: UPDATED,
  publisher: {
    "@type": "Organization",
    name: "Gains from Geebs",
    url: SITE_URL,
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="privacy-page-schema" data={pageSchema} />
      <JsonLd id="privacy-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[860px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Privacy &middot; last updated {UPDATED}</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04]">
            What we collect, and what happens to it.
          </h1>
          {/* Answer-first block: the whole policy in one quotable paragraph. */}
          <p className="mt-6 rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-5 text-[16.5px] md:text-[17.5px] leading-[1.65] text-bone/90">
            Geebs Coaching is run by Kris Oddo (NASM-CPT) from Denver, Colorado, and
            coaches clients online worldwide. If you apply, we collect your name,
            email, phone number, your answers to the application questions, and
            technical details of the device you applied from including your IP
            address, and
            use them to decide whether coaching is a fit and to contact you about
            it. If you tick the email or text boxes we also keep a record of the
            wording you agreed to and when. We do not sell personal data. Analytics measure how pages are used
            and honour your browser&rsquo;s Do Not Track setting. To have your
            application deleted, email{" "}
            <a className="underline hover:text-bone" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="collected">
          <h2 id="collected" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            What information is collected?
          </h2>
          <dl className="mt-6 grid gap-5">
            {collected.map((item) => (
              <div
                key={item.what}
                className="rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-5"
              >
                <dt className="text-bone text-[17px] font-medium">{item.what}</dt>
                <dd className="mt-2 text-[15.5px] leading-[1.65] text-mute">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="processors">
          <h2 id="processors" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Which services process it?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-bone/85 max-w-[64ch]">
            These are the services this site actually uses. Each one handles data
            under its own privacy terms.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {processors.map((p) => (
              <div
                key={p.name}
                className="rounded-[4px] border border-cloudText/40 bg-bone/[0.03] px-5 py-5"
              >
                <dt className="text-bone text-[16px] font-medium">{p.name}</dt>
                <dd className="mt-2 text-[15px] leading-[1.6] text-mute">{p.role}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="privacy-faq">
          <h2 id="privacy-faq" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
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

        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Questions about your data
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-bone/85 max-w-[64ch]">
            Email{" "}
            <a className="underline hover:text-bone" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            and Kris will answer directly. The{" "}
            <Link href="/contact" className="underline hover:text-bone">
              contact page
            </Link>{" "}
            lists every way to reach him.
          </p>
          <p className="mt-6 text-[14px] leading-[1.6] text-mute2">
            Written by Kris Oddo, NASM-CPT, founder of Geebs Coaching. Last updated {UPDATED}.
          </p>
        </section>
      </article>
    </main>
  );
}

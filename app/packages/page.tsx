import { offerPriceSchema, priceLabel } from "@/lib/offerCatalog";
import KeepGoing from "@/components/KeepGoing";
import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import MoneyPageProof from "@/components/MoneyPageProof";
import OfferRail from "@/components/OfferRail";
import Testimonials from "@/components/Testimonials";
import SupplementRail from "@/components/SupplementRail";
import PackageFitCards from "@/components/PackageFitCards";
import TipCapture from "@/components/TipCapture";
import { offerRailItems } from "@/lib/offerRail";
import { getTitanSupplements } from "@/lib/titanSupplements";
import { applyPackageHref, type PackageIntent } from "@/lib/packageIntent";
import PageByline from "@/components/PageByline";
import CalendarStrip from "@/components/CalendarStrip";
import {
  PackagesApplyPathScope,
  PackagesApplyPathSlot,
  PackagesDecisionBlock,
} from "@/components/PackagesApplyPath";

// Same catalog items as the cards; the table repeats nothing by hand.
const COMPARE_ROWS = offerRailItems("packages");
const packagesCompareTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about: `Geebs Coaching packages compared: ${COMPARE_ROWS.map((r) => `${r.title} ${r.price}`).join(", ")}.`,
};

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/packages";
const PAGE_URL = `${SITE_URL}${SLUG}`;
const TITLE = "Coaching Packages | Geebs Coaching";
const DESCRIPTION =
  "Compare every Geebs online fitness coaching package: VIP 1:1 coaching, standard check-in coaching, weekly review coaching, $24.99 community access, and a $100 one-time consultation call.";
const DATE_PUBLISHED = "2026-06-19";
const DATE_MODIFIED = "2026-10-19";

const packages = [
  {
    eyebrow: "Most hands-on",
    title: "VIP 1:1 Coaching",
    offerId: "vip-1on1",
    description:
      "Your own coach in your corner every day. Prioritized communication, hands-on FaceTime meal prep, a fully custom training plan with his own demo videos, and active form review.",
    details: [
      "Prioritized daily communication, usually a reply right away or within the hour (Kris also trains clients in person)",
      "Full grocery list, then hands-on FaceTime meal prep together: cook, portion, freeze, and store the week, so you just reheat and eat",
      "Fully custom training plan in Kris's coaching app",
      "Demo videos from Kris with verbal cues and visual walkthroughs",
      "Form review plus a weekly 30-minute Zoom check-in",
    ],
    href: applyPackageHref("premium_1on1_video"),
    schemaPath: "/apply",
    packageIntent: "premium_1on1_video" satisfies PackageIntent,
    cta: "Apply for VIP coaching",
    primary: true,
  },
  {
    eyebrow: "Core 1:1",
    title: "Standard Check-In Coaching",
    offerId: "standard-check-in",
    description:
      "Custom 1:1 coaching with daily accountability and macros-based nutrition guidance. You tell Kris where your macros are, he steers you to meals that fit, and the week closes on a 15-minute call.",
    details: [
      "Custom training program in Kris's coaching app",
      "Demo videos with verbal cues and visual walkthroughs",
      "Macros-based nutrition guidance. Tell Kris your macros and he steers you to meals that fit, with no rigid meal plan",
      "Daily accountability at standard response priority",
      "Form review plus a weekly 15-minute phone check-in",
    ],
    href: applyPackageHref("standard_check_in"),
    schemaPath: "/apply",
    packageIntent: "standard_check_in" satisfies PackageIntent,
    cta: "Apply for standard coaching",
    primary: false,
  },
  {
    eyebrow: "New, self-driven",
    title: "Weekly Review Coaching",
    offerId: "weekly-review",
    description:
      "Custom training and nutrition without the daily back-and-forth. You run your own week, and once a week Kris records a walkthrough of your numbers and where you stand.",
    details: [
      "Custom training program in Kris's coaching app",
      "Nutrition guidance built alongside the training plan",
      "One recorded Loom review each week walking through your training and nutrition data",
      "Goal tracking and plan adjustments based on what the week actually showed",
      "No daily texting and no daily access. This tier has no accountability layer by design",
    ],
    href: applyPackageHref("weekly_review"),
    schemaPath: "/apply",
    packageIntent: "weekly_review" satisfies PackageIntent,
    cta: "Apply for weekly review coaching",
    primary: false,
  },
  {
    eyebrow: "$24.99/month",
    title: "Science-Based Community",
    offerId: "science-based-community",
    description:
      "A practical Telegram room for lifters who want real discussion, shared accountability, and a research-minded place to keep learning. No private coaching contract.",
    details: [
      "Access to the Titan Forge Science-Based Telegram community",
      "Training, nutrition, recovery, and research discussion",
      "Shared accountability with like-minded lifters",
      "Monthly access that continues until canceled",
    ],
    href: "/memberships/science-based-community",
    schemaPath: "/memberships/science-based-community",
    cta: "See the $24.99 community",
    primary: false,
  },
  {
    eyebrow: "One-time guidance",
    title: "One-Time Consultation Call",
    offerId: "one-time-consultation",
    description:
      "A standalone $100 consult for people who are not ready for monthly coaching yet. Leave with a clear training, nutrition, and next-step direction instead of guessing for another month.",
    details: [
      "A focused 45-minute Zoom with Kris",
      "A real diagnosis of what is holding back progress right now",
      "Guidance on training, nutrition, accountability, or schedule bottlenecks",
      "A practical next-step plan even if monthly coaching is not the move yet",
      "If coaching does make sense, Kris will recommend the right lane without pressure",
    ],
    href: applyPackageHref("consultation_call"),
    schemaPath: "/apply",
    packageIntent: "consultation_call" satisfies PackageIntent,
    cta: "Book one-time guidance",
    primary: false,
  },
];

const faqItems = [
  {
    q: "What coaching packages does Geebs offer?",
    a: "Geebs offers five options: VIP 1:1 Coaching, Standard Check-In Coaching, Weekly Review Coaching, the $24.99/month Science-Based Community, and a $100 One-Time Consultation Call. VIP and Standard are the main coach-led options.",
  },
  {
    q: "What is the one-time consultation call?",
    a: "The consultation call is a standalone $100, 45-minute guidance product with Kris. It is for someone who is not ready to commit monthly but wants expert direction on what is holding them back, what to adjust next, and whether coaching, nutrition support, community, or self-guided structure makes sense later.",
  },
  {
    q: "What is included in VIP 1:1 Coaching?",
    a: "VIP is the closest support option: prioritized daily communication, FaceTime grocery and meal-prep help, custom app-based training with Kris's demo videos and cues, form review, and a weekly 30-minute Zoom check-in.",
  },
  {
    q: "What is the difference between VIP and Standard coaching?",
    a: "Both include custom training, accountability, form review, and nutrition guidance. VIP adds the highest-touch support: prioritized communication, FaceTime meal prep/grocery support, and a weekly 30-minute Zoom. Standard uses standard response priority, macros-based nutrition guidance, and a weekly 15-minute phone check-in.",
  },
  {
    q: "What is Weekly Review Coaching?",
    a: "Weekly Review Coaching gives you a custom training program and nutrition guidance, but no daily accountability. Instead of daily texting, Kris records one Loom video each week walking through your logged training and nutrition data, your progress, and where you stand against your goals, then adjusts the plan from there.",
  },
  {
    q: "What is the difference between Standard and Weekly Review coaching?",
    a: "Both include a custom training program and nutrition guidance. Standard adds daily accountability and a weekly 15-minute phone call with Kris. Weekly Review deliberately removes the daily layer: no daily texting and no daily access, just one recorded weekly Loom review of your data. Choose Weekly Review if you are self-driven and do not want a daily text thread.",
  },
  {
    q: "How does the FaceTime meal prep work?",
    a: "On VIP coaching, Kris sends a full grocery list of exactly what to buy. After you shop, you hop on FaceTime and he walks you through cooking, portioning, freezing, and what to keep in the fridge for the week. From there your only job is to reheat and eat.",
  },
  {
    q: "Who should choose the Science-Based Community?",
    a: "The $24.99/month community is for people who want research-minded fitness discussion and shared accountability without private coaching. It is a Telegram room, not a coaching contract. If you want a plan built for you, compare the coach-led packages instead.",
  },
  {
    q: "How much does Geebs coaching cost?",
    a: `VIP 1:1 Coaching is ${priceLabel("vip-1on1")}, Standard Check-In Coaching is ${priceLabel("standard-check-in")}, Weekly Review Coaching is ${priceLabel("weekly-review")}, the One-Time Consultation Call is ${priceLabel("one-time-consultation")}, and the Science-Based Community is ${priceLabel("science-based-community")}. The application and the 15-minute call with Kris are free; on the call he confirms which plan fits before you pay anything. For 2026 market-wide price ranges, see the guide: how much does an online fitness coach cost.`,
  },
  {
    q: "Can I apply if I am not sure which package fits?",
    a: "Yes. You do not need to choose a package first. The application asks which next step feels closest right now. Lower-cost-first applicants see the $24.99 membership and the $100 one-time consultation; $300-$500 interest points to Standard, $500+ points to VIP, and people who are not sure yet can use the fit conversation to decide.",
  },
  {
    q: "Does Geebs Coaching work outside Denver?",
    a: "Yes. Geebs Coaching is online, so clients can work with Kris from anywhere. Denver pages help local searchers understand the brand, but these package options are built for remote coaching.",
  },
  {
    q: "How does the referral program fit in?",
    a: "Referral credit can lower what an active client pays by earning free coaching months after referred clients start. The package page explains the coaching options; the referral page explains the credit structure.",
  },
  {
    q: "Can someone start lower-cost and apply later?",
    a: "Yes. The $24.99/month Science-Based Community and the $100 one-time consultation call are both starting points for someone who wants direction now and may apply for direct coaching later.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coaching Packages",
      item: PAGE_URL,
    },
  ],
};

const packageListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#package-list`,
  name: "Geebs Coaching package options",
  itemListElement: packages.map((option, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: option.title,
    url: `${SITE_URL}${option.schemaPath}`,
    description: option.description,
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  url: PAGE_URL,
  name: "Geebs Coaching Packages",
  description: DESCRIPTION,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  serviceType: "Online Fitness Coaching and Nutrition Coaching",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Geebs Coaching Options",
    // Prices come from the vendored catalog via offerPriceSchema(), never typed
    // here. Quoted 1:1 tiers contribute no price field by design; the two publicly
    // priced offers (community, consult call) now do.
    itemListElement: packages.map((option) => ({
      "@type": "Offer",
      name: option.title,
      url: `${SITE_URL}${option.schemaPath}`,
      description: option.description,
      ...offerPriceSchema(option.offerId),
    })),
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  headline: "Geebs Coaching package options",
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#kris-oddo`,
    name: "Kris Oddo",
    jobTitle: "Online Fitness Coach",
    url: `${SITE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  about: [
    { "@type": "Thing", name: "online fitness coaching packages" },
    { "@type": "Thing", name: "1:1 online fitness coaching" },
    { "@type": "Thing", name: "nutrition coaching" },
    { "@type": "Thing", name: "FitBudd coaching" },
  ],
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
  mainEntity: {
    "@id": `${PAGE_URL}#service`,
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching packages",
      },
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

export default async function PackagesPage() {
  // Live from the Shopify storefront, the same source /supplements reads.
  const supplements = await getTitanSupplements();

  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="packages-webpage-schema" data={webPageSchema} />
      <JsonLd id="packages-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="packages-list-schema" data={packageListSchema} />
      <JsonLd id="packages-faq-schema" data={faqSchema} />
      <JsonLd id="packages-service-schema" data={serviceSchema} />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pt-6 sm:pt-10 md:pt-16 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-mute2">
          <Link href="/" className="hover:text-bone">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-bone/80">Coaching packages</span>
        </nav>

        <PackagesApplyPathScope>
        <header className="max-w-[760px]" data-packages-intro>
          <p className="eyebrow text-cloudText">Coaching packages</p>
          <h1 className="display mt-1 sm:mt-2 text-bone text-[30px] sm:text-[42px] md:text-[52px] leading-[1.04]">
            Choose how you want Kris in your corner.
          </h1>
          <p className="mt-2 sm:mt-3 text-[15.5px] md:text-[17px] leading-[1.55] text-bone/82 max-w-[58ch]">
            Compare five options, from hands-on 1:1 coaching to a one-time call
            or community access. Open any card for the full details.
          </p>
        </header>

        {/* mt-3 / mb-0, not mt-4 / mb-2: in the calendar_first_v1 arm that
            renders this strip, the first package card sat at 721.7px against
            the 80%-of-900 line in tests/e2e/homepage-density.spec.ts (the
            other arm reads 533.8). The strip keeps its own mb-4 below it. */}
        <div className="mt-3 mb-0 max-w-[760px]">
          <CalendarStrip source="packages" />
        </div>

        <div data-packages-grid>
          <OfferRail
            items={offerRailItems("packages")}
            source="packages"
            heading="Every way to work with Kris."
            subheading="Choose the level of coaching you want. The application carries your pick forward."
            compact
            showHeader={false}
          />
        </div>

        {/* The Kris chat card came off /packages 2026-10-07: it put the page
            at 13.03 screens against the 12.75 budget in
            tests/e2e/homepage-density.spec.ts, whose note asks for the next
            addition to be paired with a reduction. GA4 10-02 -> 10-07: 1 user
            saw it here, 0 clicked. Chat stays one tap away in the dock. */}

        {/* A real table, under a question. This is the page whose whole job is
            comparing, and measured 2026-09-23 it had 0 <table> and 0 question
            headings — the two shapes AI engines lift for comparative answers.
            Rows are the same catalog items as the cards above. */}
        <section aria-labelledby="packages-compare-heading" className="mt-10">
          <JsonLd id="packages-compare-table-schema" data={packagesCompareTableSchema} />
          <h2
            id="packages-compare-heading"
            className="display text-[24px] leading-[1.1] text-bone md:text-[30px]"
          >
            Which Geebs package fits you?
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-[14.5px] leading-[1.5]">
              <thead>
                <tr>
                  <th scope="col" className="pb-3 pr-4 font-semibold text-bone">Option</th>
                  <th scope="col" className="pb-3 pr-4 font-semibold text-bone">Best for</th>
                  <th scope="col" className="pb-3 font-semibold text-bone">Price</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.id} className="border-t border-line2 align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-bone">{row.title}</th>
                    <td className="py-3 pr-4 text-mute">{row.whyThis}</td>
                    <td className="py-3 text-bone">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Proof, directly under the decision it supports. The homepage moved
            client results up beside the offer for the same reason; this page
            had none at all above the fold or below the cards, and it is the
            page where someone is choosing what to pay for. */}
        {/* packages_apply_path_v1: arm "b" puts the apply-path block (who it
            worked for, what happens after Apply, the price questions) right
            under the prices, in place of the three fit cards below the
            proof — the swap pays for its own height (12.75-screen budget in
            tests/e2e/homepage-density.spec.ts). Arm "a" is the page as it was. */}
        <PackagesApplyPathSlot a={null} b={<PackagesDecisionBlock />} />

        <div className="mt-12 md:mt-16">
          <Testimonials source="packages_proof" />
        </div>

        <PackagesApplyPathSlot a={<PackageFitCards />} b={null} />

        <div className="mt-10">
          {/* The ask sits behind a question: the tip lands first, then the
              fields. Replaces the always-open email form that used to sit here. */}
          <TipCapture
            source="packages_keep_in_touch"
            leadType="packages_keep_in_touch"
            question="Not ready to apply? Take one useful coaching tip instead."
          />
        </div>

        {/* The supplement shelf lives here, with the rest of what Kris sells,
            rather than on the homepage. It is the only thing on this page
            somebody can buy without an application, which is a reason to keep
            it beside the plans and not a reason to put it in front of someone
            who has not decided anything yet. */}
        <div className="mt-12">
          <SupplementRail items={supplements} source="packages_supplements" />
        </div>

        {/* Arm "b" answers this in its own steps and price questions. */}
        <PackagesApplyPathSlot
          a={
            <aside className="mt-8 border-y border-line py-6 text-[14.5px] leading-[1.6] text-bone/78">
              <p className="max-w-[62ch]">
                Not sure which one fits? Apply with “not sure” selected. Kris will
                confirm the closest option before you book anything.
              </p>
            </aside>
          }
          b={null}
        />

        <div className="mt-10 divide-y divide-line2 border-y border-line2">
          <details className="group py-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 marker:content-none">
              <span>
                <span className="eyebrow text-mute2">Full details</span>
                <span className="mt-2 block text-[18px] font-semibold text-bone">Everything included in each option</span>
              </span>
              <span aria-hidden="true" className="text-2xl text-mute transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="grid gap-7 pb-10 md:grid-cols-2">
              {packages.map((option) => (
                <article key={option.offerId}>
                  <p className="eyebrow text-cloudText">{option.eyebrow}</p>
                  <h3 className="mt-2 text-[18px] font-semibold text-bone">{option.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-mute">{option.description}</p>
                  <ul className="mt-4 space-y-2 text-[14px] leading-[1.55] text-bone/82">
                    {option.details.map((detail) => <li key={detail}>• {detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </details>
          <details className="group py-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 marker:content-none">
              <span>
                <span className="eyebrow text-mute2">Proof</span>
                <span className="mt-2 block text-[18px] font-semibold text-bone">Results behind the packages</span>
              </span>
              <span aria-hidden="true" className="text-2xl text-mute transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-10">
              <MoneyPageProof
                eyebrow="Proof before you choose"
                title="See the results and coaching history behind the packages"
                intro="Package names only tell you how support is delivered. The proof below comes from the existing Geebs results archive, named client stories, and public reviews that mention Kris directly."
              />
            </div>
          </details>

          <details className="group py-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 marker:content-none">
              <span>
                <span className="eyebrow text-mute2">Fit guide</span>
                <span className="mt-2 block text-[18px] font-semibold text-bone">Help me choose</span>
              </span>
              <span aria-hidden="true" className="text-2xl text-mute transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="max-w-[760px] space-y-5 pb-10 text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">
            <p>
              Choose VIP if you want the most direct daily support from Kris:
              prioritized communication, meal-prep help, form review, and a
              weekly 30-minute Zoom. Choose Standard if you want custom training,
              macros-based nutrition guidance, daily accountability, and a
              weekly 15-minute phone check-in without the full VIP layer.
            </p>
            <p>
              Choose Weekly Review if you want a custom training and nutrition
              plan but no daily check-ins, just one recorded Loom review of your
              week. Choose the Science-Based Community if you want the
              $24.99/month research-minded group instead of private coaching. Choose the
              $100 One-Time Consultation Call if monthly coaching is not the right
              move yet, but you still want expert guidance and a clear next
              step from Kris.
            </p>
            <p>
              Active clients may also be able to use prepaid options or referral
              credits. Kris can explain those details once he understands which
              path fits you best.
            </p>
            <p>
              If you want to see the coaching process first, read{" "}
              <Link href="/methodology" className="text-bone underline underline-offset-4">
                the methodology
              </Link>{" "}
              or review{" "}
              <Link href="/results" className="text-bone underline underline-offset-4">
                client results
              </Link>
              . If you already know you want direct help, start with the
              application and Kris will confirm the best-fit path.
            </p>
            {/* "How the application sorts the options" was its own closed row
                until 2026-10-13. It answers the same question as this one, and
                the row cost /packages ~130px on a page over its height budget
                (homepage-density.spec.ts). Same words, one disclosure. */}
            <p>
              You do not need to pick a package from these cards. The
              application asks which next step feels closest right now.
              Lower-cost-first applicants see the $100 one-time consultation
              and the $24.99 membership. $300-$500
              interest points to Standard, $500+ points to VIP, and people who
              are not sure yet can use the fit conversation to decide.
            </p>
            <p>
              Referral credits are separate from package fit. Compare the
              package options here, then use the{" "}
              <Link href="/referral" className="text-bone underline underline-offset-4">
                referral page
              </Link>{" "}
              if you are an active client sharing Geebs with a friend.
            </p>
            <p>
              Want the coaching process and permissioned client proof before you
              compare options? Start with the{" "}
              <Link href="/coaching" className="text-bone underline underline-offset-4">
                1:1 coaching overview
              </Link>
              {" "}and come back here when you are ready to compare the details.
            </p>
            <p>
              Comparing against the wider market first? The{" "}
              <Link
                href="/guides/how-much-does-an-online-fitness-coach-cost"
                className="text-bone underline underline-offset-4"
              >
                2026 cost guide
              </Link>{" "}
              breaks down what online fitness coaching costs at every tier,
              and which Geebs prices are public.
            </p>
            </div>
          </details>
        </div>

        <FAQSection
          faqs={faqSchema.mainEntity}
          heading="Questions, when you need them"
        />

        {/* One ask to close the page. "See referral credits" sat here as a
            second full-width button until 2026-10-13: referral credit is for
            active clients, the footer and "Help me choose" both link it, and
            the button cost /packages a row on a page over its height budget
            (homepage-density.spec.ts). */}
        <div className="mt-10">
          <Link
            href={applyPackageHref("undecided_1on1")}
            className="btn btn-primary"
           data-cta="packages_primary">
            Get started with Kris
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        </PackagesApplyPathScope>
      </section>
      {/* /packages already tracks DATE_MODIFIED for its CollectionPage schema, so the
          byline reads the SAME constant — visible date and structured date cannot
          drift. No wrapper: see the note on the homepage byline. */}
      <PageByline
        updated={DATE_MODIFIED}
        note="Prices are in the table above; the call with Kris is free"
        className="mx-auto max-w-[1100px] px-6 md:px-10 pb-10"
      />
      {/* Someone who does not buy today left with only an email ask.
          Two free interactive surfaces are a reason to come back. */}
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pb-16">
        <KeepGoing position="packages" />
      </div>

    </main>
  );
}

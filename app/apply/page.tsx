import type { Metadata } from "next";
import Image from "next/image";
import ApplyForm from "./ApplyForm";
import ApplyBridge from "@/components/ApplyBridge";
import ApplyNextSteps from "@/components/ApplyNextSteps";
import ApplyVslCallout from "@/components/ApplyVslCallout";
import ContinuationGuarantee from "@/components/ContinuationGuarantee";
import ProofStrip from "@/components/ProofStrip";

const SITE_URL = "https://gainsfromgeebs.com";
const TITLE = "Apply for 1:1 Coaching | Geebs Coaching";
const DESCRIPTION =
  "Apply for 1:1 online coaching with Kris. Three quick fit choices plus your contact info. Qualified applicants get Kris's calendar next.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/apply` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/apply`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Apply for Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      {/* A flex column so the reassurance line can sit UNDER the form on a
          phone and above it from md up. Measured at 375x812: with that line
          above, the first step's Continue button ended at y=816 — past the
          viewport and behind the dock — so the only visible instruction was
          to scroll. It is reassurance, not instruction; the questions come
          first on the screen that has no room for both. */}
      <section
        data-apply-page
        className="mx-auto flex max-w-[720px] flex-col px-6 pb-20 pt-3 md:px-10 md:pb-28 md:pt-16 sm:pt-8"
      >
        {/* The form is the page. The old header ran a display headline, a
            portrait, a paragraph from Kris and a proof strip before the first
            field; someone who pressed Apply has already decided. Everything
            that used to sit above and below the form is now one line of
            reassurance and three folds underneath it. */}
        <header className="order-1">
          <p className="eyebrow text-cloudText">Apply for 1:1 coaching</p>
          <h1 className="display mt-2 text-[26px] leading-[1.05] text-bone sm:text-[36px] md:mt-3 md:text-[44px]">
            Two minutes, no payment.
          </h1>
        </header>

        <div id="apply-form" className="order-2 mt-5 scroll-mt-24 md:order-3 md:mt-8">
          <ApplyForm />
        </div>

        <div className="order-3 md:order-2">
          <div className="mt-8 flex items-start gap-3 md:mt-4">
            <figure className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line2">
              <Image
                src="/kris-hero.jpg"
                alt="Kris Oddo, NASM-CPT"
                fill
                sizes="44px"
                className="object-cover object-[50%_20%]"
              />
            </figure>
            <p className="max-w-[54ch] text-[15.5px] leading-[1.55] text-bone/85">
              Kris reads every application himself. Be honest in the answers: if
              it is a fit, his calendar is next.
            </p>
          </div>
        </div>

        {/* The guarantee was published on /methodology and nowhere near the ask.
            Measured 2026-09-26: "Continuation Guarantee" appeared zero times on
            / and zero times on /apply — the one page where someone is deciding
            whether to hand over a form. Same component, so the wording stays
            single-source. */}
        <div className="order-4">
          <ContinuationGuarantee />
        </div>

        {/* The video came OUT of the folds. It was the middle of three closed
            <details>, so the only way to reach it was to guess it was worth a
            tap. Both competitors running paid traffic at this ICP gate the ask
            behind their video ("Watch this first."). It stays UNDER the form
            rather than above it: the form-first order on this page is a
            measured decision (375x812, the Continue button ended at y=816 with
            anything above it), and this video is 9/16, so putting it first
            would push the ask off every viewport. Visible beats first. */}
        <div className="order-5">
          <ApplyVslCallout />
        </div>

        <div className="apply-folds order-6">
          <details>
            <summary>What happens after you submit</summary>
            <div>
              <ApplyNextSteps />
            </div>
          </details>
          <details>
            <summary>Not ready for monthly coaching?</summary>
            <div>
              <ApplyBridge />
            </div>
          </details>
        </div>

        <ProofStrip className="order-7 mt-10" />
      </section>
    </main>
  );
}

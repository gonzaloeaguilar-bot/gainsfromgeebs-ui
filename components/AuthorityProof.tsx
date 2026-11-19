import Link from "next/link";
import CountUp from "@/components/CountUp";
import {
  clientResults,
  publicReviews,
} from "@/data/clientResults";

const authorityLinks = [
  {
    href: "/results",
    kind: "results",
    title: "Client results and public reviews",
    body:
      "Named client stories, message screenshots, transformation photos, and Google review context are separated so proof is easy to verify.",
  },
  {
    href: "/methodology",
    kind: "methodology",
    title: "Cited coaching methodology",
    body:
      "Training frequency, protein, recovery, and accountability are explained with research references and practical coaching rules.",
  },
  {
    href: "/about",
    kind: "about_kris",
    title: "Kris Oddo, NASM-CPT",
    body:
      "The founder page ties the coach, credential, origin story, and Geebs entity together for readers and AI search systems.",
  },
  {
    href: "/for/online-fitness-coach-for-men",
    kind: "service_page",
    title: "Primary service page",
    body:
      "The core online-coaching page explains who Geebs is for, how the 1:1 process works, and when another option is better.",
  },
];

export default function AuthorityProof({
  compact = false,
}: {
  compact?: boolean;
}) {
  const publicReviewCount = publicReviews.length;
  const namedResultCount = clientResults.filter(
    (result) => result.permission === "explicit",
  ).length;

  return (
    <section
      aria-labelledby="authority-proof"
      className={compact ? "" : "relative"}
      data-analytics-source="authority_proof"
    >
      <div
        className={
          compact ? "" : "mx-auto max-w-[1100px] px-6 md:px-10 py-20 md:py-28"
        }
      >
        <p className="eyebrow text-cloudText">Proof and authority</p>
        <h2
          id="authority-proof"
          className="display mt-4 text-bone text-[28px] sm:text-[36px] md:text-[44px] leading-[1.08] max-w-[18ch]"
        >
          The trust trail is built into the site.
        </h2>
        <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[66ch]">
          Geebs should be easy for a skeptical buyer, Google, and AI assistants
          to understand: one coach, one credentialed methodology, real client
          proof, clear public profiles, and pages that link the story together.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border-y border-line2 py-5">
            <p className="eyebrow text-cloudText">Credential</p>
            <p className="display mt-3 text-bone text-[28px] leading-none">
              NASM-CPT
            </p>
            <p className="mt-3 text-[14px] leading-[1.55] text-mute">
              Kris Oddo is presented consistently as founder and coach of Geebs
              Coaching.
            </p>
          </div>
          <div className="border-y border-line2 py-5">
            <p className="eyebrow text-cloudText">Public reviews</p>
            <p className="display mt-3 text-bone text-[28px] leading-none">
              <CountUp value={publicReviewCount} />
            </p>
            <p className="mt-3 text-[14px] leading-[1.55] text-mute">
              Published Google reviews from the Titan Forge training context are
              disclosed on the results page.
            </p>
          </div>
          <div className="border-y border-line2 py-5">
            <p className="eyebrow text-cloudText">Client proof</p>
            <p className="display mt-3 text-bone text-[28px] leading-none">
              <CountUp value={namedResultCount} suffix=" named" />
            </p>
            <p className="mt-3 text-[14px] leading-[1.55] text-mute">
              Clients who gave explicit permission to be named, with their own
              photos and messages on the results page. Anonymized proof is kept
              separate from these.
            </p>
          </div>
        </div>

        <div className="mt-8 divide-y divide-line2 border-y border-line2">
          {authorityLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid gap-1 py-4 text-left no-underline"
              data-analytics-event="proof_authority_click"
              data-analytics-link-kind={item.kind}
            >
              <span className="text-[15.5px] md:text-[16px] font-semibold text-bone group-hover:text-cloudText transition-colors">
                {item.title}
              </span>
              <span className="text-[13.5px] md:text-[14px] leading-[1.55] text-mute">
                {item.body}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

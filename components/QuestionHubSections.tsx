import Link from "next/link";
import SendKrisStep from "@/components/SendKrisStep";
import { applyHrefForHub, type QuestionHub } from "@/data/scienceQuestionHubs";

/**
 * The hub block on a niche-leading science question page
 * (data/scienceQuestionHubs.ts says which pages, and why).
 *
 * Every answer is visible at rest and every "more" is inside a native
 * <details>, so all of it is in the server HTML: GPTBot, ClaudeBot and
 * PerplexityBot run no JavaScript, and Google weights collapsed HTML fully.
 * The send-it-to-Kris step is the #830 component, so its clicks are measured
 * by the site's existing apply layer (data-cta on the wrapper) and nothing
 * here emits a second event.
 */
export default function QuestionHubSections({ hub }: { hub: QuestionHub }) {
  const updated = new Date(`${hub.updated}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section aria-labelledby="hub-heading" className="mt-12" data-question-hub={hub.slug}>
      <h2
        id="hub-heading"
        className="display text-[25px] leading-[1.12] text-bone md:text-[32px]"
      >
        {hub.heading}
      </h2>
      <p className="mt-3 text-[13px] text-mute2">
        By Kris Oddo, NASM-CPT · Updated <time dateTime={hub.updated}>{updated}</time>
      </p>

      {hub.facts.map((fact, index) => (
        <section key={fact.id} id={fact.id} className="mt-10" data-no-fold="true">
          <h3 className="text-[21px] font-semibold leading-[1.2] tracking-normal text-bone md:text-[24px]">
            {fact.q}
          </h3>
          <p className="mt-3 max-w-[66ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
            {fact.answer}
          </p>
          <details className="article-details" open={index === 0}>
            <summary>More on this</summary>
            <div className="article-details-body">
              {fact.more.map((para, pi) => (
                <p
                  key={pi}
                  className="mt-3 first:mt-0 max-w-[66ch] text-[15px] leading-[1.7] text-mute md:text-[16px]"
                >
                  {para}
                </p>
              ))}
              <p className="mt-3 text-[13px] leading-[1.6] text-mute2">
                Source:{" "}
                <a
                  href={fact.source.href}
                  className="underline hover:text-bone"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fact.source.label}
                </a>
              </p>
              <p className="mt-4">
                <Link
                  href={fact.next.href}
                  className="text-[15px] font-semibold text-bone underline hover:text-cloudText"
                >
                  {fact.next.label} →
                </Link>
              </p>
            </div>
          </details>
        </section>
      ))}

      <SendKrisStep
        className="mt-12"
        ctaId={hub.sendKris.ctaId}
        position="question_hub"
        eyebrow={hub.sendKris.eyebrow}
        title={hub.sendKris.title}
        body={hub.sendKris.body}
        label={hub.sendKris.label}
        href={applyHrefForHub(hub)}
      />

      <div className="mt-10 divide-y divide-line2 border-y border-line2" data-no-fold="true">
        {hub.links.map((link) => (
          <Link key={link.href} href={link.href} className="group grid min-h-20 gap-1 py-4 no-underline">
            <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
              {link.label}
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">{link.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

import MoneyPageKit from "@/components/MoneyPageKit";
import EntityLine from "@/components/EntityLine";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ProofRail from "@/components/ProofRail";
import { clientMetaLabel, clientOutcomeLine } from "@/lib/clientMeta";
import ResultsHashOpen from "@/components/ResultsHashOpen";
import PageByline from "@/components/PageByline";
import TransformationGallery from "@/components/TransformationGallery";
import {
  aggregateProof,
  clientMessageProof,
  clientResults,
  clientTransformationProof,
  hasClientResults,
  publicReviews,
} from "@/data/clientResults";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/results";
const faqs = [
  { q: "Are the client results on this page guaranteed?", a: "No, these client results are individual examples, not promised outcomes. A person's starting point, consistency, fit, and follow-through all affect what happens. The page shows permissioned stories, reviews, messages, and transformation photos so you can inspect the proof without treating one client's experience as a guarantee." },
  { q: "What kind of proof does Geebs Coaching publish?", a: "Geebs Coaching publishes client proof only when it is real and permissioned. That can include written stories, public reviews, message screenshots, and before-and-after photos. The material is presented as the client shared it, with privacy handled where needed and no result framed as something every person will repeat." },
  { q: "Where can I learn about the process behind these results?", a: "Start with the Geebs Coaching methodology or the body recomposition guides to understand the process behind these examples. Those pages explain the training, nutrition, and accountability structure. If you are comparing support levels, the coaching guide and 90-day program page show the difference between 1:1 help and self-guided structure." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export const metadata: Metadata = {
  title: "Client Results | Geebs Coaching",
  description:
    "Permissioned client results, body recomposition before-and-after examples, testimonials, screenshots, and transformation stories from Geebs Coaching.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: "Client Results | Geebs Coaching",
    description:
      "Permissioned client results and transformation stories from Geebs Coaching.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Geebs Coaching client results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Results | Geebs Coaching",
    description:
      "Permissioned client results and transformation stories from Geebs Coaching.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: hasClientResults
    ? { index: true, follow: true }
    : { index: false, follow: true },
};

export const resultsSchema = hasClientResults
  ? {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}${SLUG}#webpage`,
      name: "Geebs Coaching client results",
      description:
        "Permissioned client stories, screenshots, and transformation proof from Geebs Coaching.",
      url: `${SITE_URL}${SLUG}`,
      // The transformation photos are the page's primary evidence, so they are
      // declared as images of the page rather than left as bare <img> tags an
      // answer engine has to infer.
      image: clientTransformationProof.flatMap((item) =>
        item.photos.map((photo) => ({
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${photo.src}`,
          caption: `${item.headline} ${photo.label}`,
          representativeOfPage: true,
        })),
      ),
      mainEntity: {
        "@type": "ItemList",
        name: "Permissioned Geebs Coaching client proof",
        itemListElement: clientResults.map((result, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: result.headline,
            text: result.quote,
            author: {
              "@type": "Person",
              name: result.name,
            },
            about: {
              "@type": "Service",
              name: "Geebs Coaching 1:1 Online Coaching",
              url: SITE_URL,
            },
          },
        })),
      },
    }
  : {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Geebs Coaching client results",
      description:
        "Client results page prepared for permissioned testimonials and transformation stories.",
      url: `${SITE_URL}${SLUG}`,
    };

export default function ResultsPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <ResultsHashOpen />
      <JsonLd id="results-schema" data={resultsSchema} />
      <JsonLd id="results-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[860px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">Client proof</p>
          <h1 className="display mt-4 text-bone text-[34px] sm:text-[44px] md:text-[56px] leading-[1.04] max-w-[13ch]">
            {hasClientResults ? "Client results" : "Results library"}
          </h1>
          <EntityLine className="mt-3" />
          <p className="mt-5 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[52ch]">
            {hasClientResults
              ? "Real people who worked with Kris."
              : "This page is wired for permissioned client screenshots, testimonials, and transformation stories. It stays out of search until real proof is added."}
          </p>
        </header>

        {hasClientResults && clientTransformationProof.length ? (
          <section
            aria-labelledby="client-transformation-proof"
            className="mt-9 md:mt-12"
          >
            <h2
              id="client-transformation-proof"
              className="sr-only"
            >
              Transformation photos
            </h2>

            {/* Mobile swipes one photo at a time, desktop lays them out. The
                photos lead: they are what a visitor came to see, so nothing
                sits between the headline and the first one. */}
            <TransformationGallery priority columns={2} />

            <p className="mt-4 text-[13px] leading-[1.6] text-mute2 max-w-[62ch]">
              Photos are shown exactly as shared by the client, nothing is
              added. These are individual client examples, not promised
              outcomes: results depend on starting point, consistency, fit and
              follow-through.
            </p>

            <details className="results-fold mt-5">
              <summary>Read the story behind each photo</summary>
              <div className="mt-5 grid gap-5">
                {clientTransformationProof.map((item) => (
                  <article key={item.id} className="border-t border-line2 pt-5">
                    <p className="eyebrow text-cloudText">{item.label}</p>
                    <h3 className="display mt-2 text-bone text-[20px] md:text-[24px] leading-[1.15]">
                      {item.headline}
                    </h3>
                    <p className="mt-3 text-[15px] md:text-[16px] leading-[1.65] text-bone/85 max-w-[64ch]">
                      {item.context}
                    </p>
                    <p className="mt-3 text-[13px] text-mute2">{item.name}</p>
                  </article>
                ))}
              </div>
            </details>
          </section>
        ) : null}

        {hasClientResults ? (
          <section className="mt-10 border-y border-line2 py-7">
            <h2 className="display text-bone text-[23px] md:text-[28px] leading-[1.12]">
              How to read these results
            </h2>
            <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
              Real clients, in their own words. Stories, public reviews,
              message screenshots and transformation photos.
            </p>
            <details className="results-fold mt-5">
              <summary>Where to start if you are comparing coaches</summary>
              <p className="mt-5 text-[15px] leading-[1.65] text-mute max-w-[64ch]">
                If you want the system behind the outcomes, start with the{" "}
                <Link href="/methodology" className="text-bone underline">
                  Geebs Coaching methodology
                </Link>
                , the{" "}
                <Link
                  href="/blog/body-recomposition-for-men"
                  className="text-bone underline"
                >
                  body recomposition guide
                </Link>
                , or the{" "}
                <Link href="/packages" className="text-bone underline">
                  coaching packages
                </Link>
                . If you are deciding whether the fit is right, go straight to{" "}
                <Link
                  href="/guides/what-does-an-online-fitness-coach-do"
                  className="text-bone underline"
                >
                  what an online fitness coach actually does
                </Link>{" "}
                and{" "}
                <Link
                  href="/guides/how-much-does-an-online-fitness-coach-cost"
                  className="text-bone underline"
                >
                  how much online coaching costs
                </Link>
                .
              </p>
            </details>
          </section>
        ) : null}

        <div className="hair my-10 md:my-14" />

        {hasClientResults ? (
          <>
            <section aria-labelledby="body-recomposition-before-after">
              <h2
                id="body-recomposition-before-after"
                className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
              >
                Body recomposition before and after
              </h2>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
                Photos are shown exactly as shared by clients. Body recomposition
                before-and-after results depend on training history, nutrition,
                sleep, starting point, and how consistently you execute the plan.
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] text-mute max-w-[64ch]">
                If you want the process behind the examples, start with the{" "}
                <Link
                  href="/blog/body-recomposition-for-men"
                  className="text-bone underline"
                >
                  body recomposition guide
                </Link>{" "}
                and the{" "}
                <Link
                  href="/guides/body-recomposition-for-beginners"
                  className="text-bone underline"
                >
                  body recomposition for beginners guide
                </Link>
                , the{" "}
                <Link
                  href="/tools/body-recomposition-calculator"
                  className="text-bone underline"
                >
                  body recomposition calculator
                </Link>
                , the{" "}
                <Link href="/for/skinny-fat-men" className="text-bone underline">
                  skinny-fat coaching page
                </Link>
                , and the{" "}
                <Link
                  href="/blog/how-to-fix-skinny-fat"
                  className="text-bone underline"
                >
                  skinny fat fix guide
                </Link>
                .
              </p>
            </section>

            <div className="hair my-10 md:my-14" />

            {aggregateProof.length ? (
              <section aria-labelledby="aggregate-proof">
                <h2
                  id="aggregate-proof"
                  className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
                >
                  At a glance
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {aggregateProof.map((item) => (
                    <div key={item.label} className="border-y border-line2 py-5">
                      <p className="eyebrow text-cloudText">{item.label}</p>
                      <p className="display mt-3 text-bone text-[30px] leading-none">
                        {item.value}
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.55] text-mute">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* The stories as a carousel first: this page was 20,787px on a
                phone (25.6 screens) because every story, screenshot and
                review was stacked full size. The rail is the same proof in
                the shape the homepage already uses, and the full versions
                stay underneath, one fold each. */}
            <section
              aria-labelledby="client-stories"
              className={aggregateProof.length ? "mt-12 md:mt-14" : ""}
            >
              <h2
                id="client-stories"
                className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
              >
                Client stories
              </h2>
              <div className="mt-6">
                <ProofRail
                  results={clientResults}
                  aggregate={[]}
                  source="results_page"
                />
              </div>
              <details className="results-fold mt-8">
                <summary>Read every story in full</summary>
              <div className="mt-6 grid gap-5">
                {clientResults.map((result) => (
                  <article
                    key={result.id}
                    id={result.id}
                    className="scroll-mt-24 border-y border-line2 py-6"
                  >
                    <p className="eyebrow text-cloudText">{clientOutcomeLine(result)}</p>
                    <h3 className="display mt-3 text-bone text-[23px] md:text-[28px] leading-[1.15]">
                      {result.headline}
                    </h3>
                    <blockquote className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
                      <span className="block text-[13.5px] leading-[1.45] text-bone/90 break-words">
                        “{result.quote}”
                      </span>
                    </blockquote>
                    <p className="mt-4 text-[13px] text-mute2">
                      {clientMetaLabel(result)}
                    </p>
                    {result.screenshot ? (
                      <figure className="mt-6 overflow-hidden rounded-lg border border-line2 bg-black/20">
                        <Image
                          src={result.screenshot}
                          alt={`${result.name} Geebs Coaching testimonial screenshot about ${result.outcome}`}
                          width={result.screenshotWidth ?? 1320}
                          height={result.screenshotHeight ?? 2060}
                          sizes="(max-width: 768px) calc(100vw - 48px), 780px"
                          className="h-auto w-full"
                        />
                      </figure>
                    ) : null}
                  </article>
                ))}
              </div>
              </details>
            </section>

            {publicReviews.length ? (
              <section
                aria-labelledby="public-reviews"
                className="mt-12 md:mt-14"
              >
                <h2
                  id="public-reviews"
                  className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
                >
                  Public reviews
                </h2>
                <details className="results-fold mt-5">
                  <summary>Read the public reviews</summary>
                  <div className="mt-5">
                <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-mute max-w-[64ch]">
                  Reviews from the gym floor where Kris coached clients in person.
                </p>
                <div className="mt-6 grid gap-5">
                  {publicReviews.map((item) => (
                    <article
                      key={item.id}
                      className="border-y border-line2 py-6"
                    >
                      <p className="eyebrow text-cloudText">
                        {item.rating}-star {item.source}
                      </p>
                      <blockquote className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
                        “{item.quote}”
                      </blockquote>
                      <p className="mt-4 text-[13px] text-mute2">
                        {item.name} · {item.dateLabel}
                      </p>
                      {item.context ? (
                        <p className="mt-3 text-[13px] leading-[1.6] text-mute2 max-w-[62ch]">
                          {item.context}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
                </details>
              </section>
            ) : null}

            {clientMessageProof.length ? (
              <section
                aria-labelledby="client-message-proof"
                className="mt-12 md:mt-14"
              >
                <h2
                  id="client-message-proof"
                  className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
                >
                  More client messages
                </h2>
                <details className="results-fold mt-5">
                  <summary>See the message screenshots</summary>
                  <div className="mt-5">
                <p className="mt-4 text-[14px] md:text-[15px] leading-[1.65] text-mute max-w-[64ch]">
                  Real coaching-context screenshots showing accountability, training
                  reactions, and day-to-day communication.
                </p>
                <div className="mt-6 grid gap-5">
                  {clientMessageProof.map((item) => (
                    <article
                      key={item.id}
                      className="border-y border-line2 py-6"
                    >
                      <p className="eyebrow text-cloudText">{item.label}</p>
                      <h3 className="display mt-3 text-bone text-[23px] md:text-[28px] leading-[1.15]">
                        {item.headline}
                      </h3>
                      <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
                        {item.context}
                      </p>
                      <p className="mt-4 text-[13px] text-mute2">
                        {item.name}
                      </p>
                      <figure className="mt-6 overflow-hidden rounded-lg border border-line2 bg-black/20">
                        <Image
                          src={item.screenshot}
                          alt={`${item.name} Geebs Coaching client message screenshot about ${item.label.toLowerCase()}`}
                          width={item.screenshotWidth}
                          height={item.screenshotHeight}
                          sizes="(max-width: 768px) calc(100vw - 48px), 780px"
                          className="h-auto w-full"
                        />
                      </figure>
                    </article>
                  ))}
                </div>
              </div>
                </details>
              </section>
            ) : null}
          </>
        ) : (
          <section>
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              What belongs here
            </h2>
            <div className="mt-5 divide-y divide-line2 border-y border-line2">
              {[
                "Permissioned written testimonials with name, age, coaching length, and result.",
                "Client win screenshots from iMessage or Instagram, with handles cropped if needed.",
                "Before/after photos only when the client gives clear permission.",
                "One honest aggregate result once Kris confirms the number.",
              ].map((item) => (
                <p
                  key={item}
                  className="py-4 text-[15.5px] md:text-[16.5px] leading-[1.65] text-mute"
                >
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-6 text-[14px] leading-[1.65] text-mute2 max-w-[62ch]">
              Until that proof lands, this page stays in a quiet proof-building
              state. That keeps the launch honest while making the proof drop
              fast once Kris sends assets.
            </p>
          </section>
        )}

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="results-faq-heading">
          <h2 id="results-faq-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Questions about these results</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">{faqs.map((faq) => <div key={faq.q} className="py-5"><h3 className="text-[17px] font-semibold text-bone">{faq.q}</h3><p className="mt-3 text-[15.5px] leading-[1.7] text-mute">{faq.a}</p></div>)}</div>
        </section>

        <div className="hair my-10 md:my-14" />

        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Ready to see if 1:1 fits?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A few questions so Kris knows if 1:1 is the right fit. If 1:1 is
            not the right path, the $100 one-time consultation call is a great
            start.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/apply?utm_source=site&utm_medium=results&utm_campaign=results_apply_cta&utm_content=apply_for_1:1_coaching"
              className="btn btn-primary"
              data-analytics-event="results_apply_cta_click"
              data-analytics-link-kind="apply"
             data-cta="results_primary">
              Get results like these
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        <div className="mt-12">
          <PageByline note="client results are individual and not typical outcomes" />
        </div>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

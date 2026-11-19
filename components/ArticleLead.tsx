import Image from "next/image";
import Link from "next/link";
import type { ArticleLayout } from "@/lib/articleLayouts";

/**
 * The first screen of an answer-first article: what it is, the fix in one
 * sentence, a real photo, and the next step. Server-rendered, so the answer is
 * in the HTML an answer engine fetches.
 *
 * The answer is the post's own first paragraph, passed in verbatim. The photos
 * are Kris's own before and after from /about, with that page's wording.
 */
export default function ArticleLead({
  slug,
  title,
  answer,
  layout,
  meta,
}: {
  slug: string;
  title: string;
  answer: string;
  layout: ArticleLayout;
  meta: string;
}) {
  const calcHref =
    `/tools/body-recomposition-calculator?utm_source=site&utm_medium=article_lead` +
    `&utm_campaign=article_lead&utm_content=${encodeURIComponent(slug)}`;
  const { before, after, caption } = layout.figure;

  return (
    <div className="article-lead max-w-[760px]">
      <p className="eyebrow text-cloudText">Geebs coaching guide</p>
      <h1 className="display mt-3 text-[32px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">
        {title}
      </h1>
      <p className="mt-4 text-[17px] leading-[1.5] text-bone/90 md:text-[20px] md:leading-[1.55]">{answer}</p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
        <Link
          href={calcHref}
          className="btn btn-primary !px-2 text-center !text-[15px] whitespace-nowrap sm:!px-6 sm:!text-base"
          data-cta={layout.calculator.ctaId}
        >
          {layout.calculator.label} <span aria-hidden="true">→</span>
        </Link>
        <Link href="/apply" className="btn btn-secondary !px-2 text-center !text-[15px] whitespace-nowrap sm:!px-6 sm:!text-base" data-cta="blog_primary">
          Get coached by Kris
        </Link>
      </div>
      <figure className="mt-5">
        <div className="grid grid-cols-2 gap-2">
          {[before, after].map((photo, i) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line2 bg-black/20"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 46vw, 370px"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-bone">
                {photo.label}
              </span>
            </div>
          ))}
        </div>
        <figcaption className="mt-2 text-[13px] leading-[1.5] text-mute2">
          {caption}{" "}
          <Link href="/about" className="inline-block py-1.5 underline decoration-line2 underline-offset-4">
            Read Kris&apos;s story
          </Link>
        </figcaption>
      </figure>
      <p className="reader-scale-exempt mt-4 text-[13px] text-mute2">{meta}</p>
    </div>
  );
}

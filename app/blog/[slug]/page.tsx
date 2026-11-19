import { Fragment } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { jpegSize } from "@/lib/jpegSize";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Link from "next/link";
import EntityLine from "@/components/EntityLine";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MoneyPageKit from "@/components/MoneyPageKit";
import ReadingPath from "@/components/ReadingPath";
import { offerRailItems } from "@/lib/offerRail";
import { readingPathForHref } from "@/lib/readingPaths";
import TitanProductInline from "@/components/TitanProductInline";
import { productContextForBlogSlug } from "@/lib/productContext";
import RelatedScienceQuestions from "@/components/RelatedScienceQuestions";
import ArticleToc from "@/components/ArticleToc";
import ReadingProgress from "@/components/ReadingProgress";
import TextSizeControl from "@/components/TextSizeControl";
import ArticleScopeInit from "@/components/ArticleScopeInit";
import { buildBlogBreadcrumbSchema } from "@/lib/blogBreadcrumbSchema";
import { buildBlogArticleAuthorSchema } from "@/lib/blogArticleAuthorSchema";
import KeyTakeaways from "@/components/KeyTakeaways";
import TopicPackRail from "@/components/TopicPackRail";
import { getTopicPacks } from "@/data/topicPacks";
import StatCards from "@/components/StatCards";
import FAQSection from "@/components/FAQSection";
import ArticleEarlyCapture from "@/components/ArticleEarlyCapture";
import ScholarshipCallout from "@/components/ScholarshipCallout";
import ScholarshipSection from "@/components/ScholarshipSection";
import CoachCompanion from "@/components/CoachCompanion";
import { isScholarshipMoneyPage } from "@/lib/scholarshipAnchors";
import {
  type BlogFaq,
  extractBlogPresentation,
  extractShortAnswer,
  readingTime,
  slugifyHeading,
  splitBodyAfterHeading,
  splitBodySections,
} from "@/lib/blogPostPresentation";
import { midArticleApplyCtaForSlug } from "@/lib/midArticleApplyCta";
import ArticleApplyCallout from "@/components/ArticleApplyCallout";
import BusyProCluster from "@/components/BusyProCluster";
import { inBusyProCluster } from "@/lib/busyProCluster";
import ArticleLead from "@/components/ArticleLead";
import CoachingCostFold from "@/components/CoachingCostFold";
import OpenFoldOnAnchor from "@/components/OpenFoldOnAnchor";
import { ARTICLE_LAYOUT_BY_SLUG } from "@/lib/articleLayouts";

const SITE_URL = "https://gainsfromgeebs.com";
const BLOG_DIR = path.join(process.cwd(), "content/blog");

type RelatedPost = { href: string; label: string; description: string };

function publishedPostFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file) && !file.includes("template.mdx"))
    .filter((file) => matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")).data.draft !== true);
}

export async function generateStaticParams() {
  return publishedPostFiles().map((file) => ({ slug: file.replace(/\.mdx?$/, "") }));
}

function getPost(slug: string) {
  const file = [path.join(BLOG_DIR, `${slug}.md`), path.join(BLOG_DIR, `${slug}.mdx`)]
    .find((candidate) => fs.existsSync(candidate));
  if (!file) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return data.draft === true ? null : { frontmatter: data, content };
}

function relatedPosts(slug: string, title: string): RelatedPost[] {
  const titleTokens = new Set(title.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  return publishedPostFiles()
    .map((file) => {
      const candidateSlug = file.replace(/\.mdx?$/, "");
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
      const candidateTitle = String(data.title ?? candidateSlug);
      const tokens = new Set(candidateTitle.toLowerCase().match(/[a-z0-9]+/g) ?? []);
      const score = [...tokens].filter((token) => titleTokens.has(token)).length;
      return {
        slug: candidateSlug,
        score,
        date: String(data.lastModified ?? data.date ?? ""),
        item: {
          href: `/blog/${candidateSlug}`,
          label: candidateTitle,
          description: String(data.description ?? data.seo_description ?? "Read the full guide."),
        },
      };
    })
    .filter((candidate) => candidate.slug !== slug)
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .slice(0, 3)
    .map(({ item }) => item);
}

/**
 * Per-post social card, when one exists at public/blog/<slug>/hero.jpg.
 *
 * Every post has been sharing one generic card, /social-preview-coaching.jpg,
 * while three posts had a bespoke hero sitting in public/ that nothing
 * referenced. Only landscape images are used: a portrait crop in a 1200x630
 * slot is letterboxed by every social and chat preview that renders it.
 */
function postSocialImage(slug: string) {
  const file = path.join(process.cwd(), "public", "blog", slug, "hero.jpg");
  if (!fs.existsSync(file)) return null;
  const size = jpegSize(file);
  if (!size || size.width < size.height) return null;
  return { url: `/blog/${slug}/hero.jpg`, ...size };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  const { title, description } = post.frontmatter;
  const url = `${SITE_URL}/blog/${slug}`;
  // A post that duplicates a stronger page names it in `canonical:` (a site
  // path). Google then consolidates the two instead of splitting the query.
  const canonicalPath =
    typeof post.frontmatter.canonical === "string" && post.frontmatter.canonical.startsWith("/")
      ? post.frontmatter.canonical
      : null;
  const social = postSocialImage(slug) ?? {
    url: "/social-preview-coaching.jpg",
    width: 1200,
    height: 630,
  };
  return {
    title, description, alternates: { canonical: canonicalPath ? `${SITE_URL}${canonicalPath}` : url },
    openGraph: { type: "article", url, title, description, siteName: "Geebs Coaching", images: [{ url: social.url, width: social.width, height: social.height, alt: `${title} by Geebs Coaching` }] },
    twitter: { card: "summary_large_image", title, description, images: [social.url] },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = getPost(slug);
  if (!post) notFound();
  const { frontmatter, content } = post;
  // Posts written before the FAQ convention put their questions in H2 sections
  // instead of an FAQ block. Reuse those words verbatim rather than leaving the
  // post without an FAQ. Only applies when the post has no explicit FAQ section.
  const presentation = extractBlogPresentation(content, {
    questionFaqFallback: true,
  });
  const frontmatterFaqs: BlogFaq[] = Array.isArray(frontmatter.faqs)
    ? frontmatter.faqs.filter((faq: unknown): faq is BlogFaq => Boolean(faq && typeof faq === "object" && "q" in faq && "a" in faq))
    : [];
  const faqs = frontmatterFaqs.length ? frontmatterFaqs : presentation.bodyFaqs;
  const suppliedRelated: RelatedPost[] = Array.isArray(frontmatter.related) ? frontmatter.related : [];
  const related = suppliedRelated.length ? suppliedRelated.slice(0, 3) : relatedPosts(slug, frontmatter.title);
  const articleSchema = buildBlogArticleAuthorSchema({
    siteUrl: SITE_URL, slug: `/blog/${slug}`, headline: frontmatter.title,
    description: frontmatter.description || "", datePublished: frontmatter.date || new Date().toISOString(),
    dateModified: frontmatter.lastModified || frontmatter.date || new Date().toISOString(), aboutTopics: [],
  });
  const breadcrumbSchema = buildBlogBreadcrumbSchema({ siteUrl: SITE_URL, slug: `/blog/${slug}`, title: frontmatter.title });
  const faqSchema = faqs.length ? {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/blog/${slug}#faq`,
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  } : null;
  const shortAnswer = extractShortAnswer(content, frontmatter.quickAnswer);
  const topic = slug.includes("protein")
    ? "protein"
    : (Array.isArray(frontmatter.tags) && frontmatter.tags[0]) || "this topic";
  let headingIndex = 0;
  // Only the ranked money pages carry the scholarship placements; see
  // lib/scholarshipAnchors.ts for why the list is explicit.
  const blogPath = `/blog/${slug}`;
  const showScholarship = isScholarshipMoneyPage(blogPath);
  const readingPath = readingPathForHref(blogPath);

  // Mid-article apply CTA at the reader's highest-intent moment (see
  // lib/midArticleApplyCta.ts). Falls back to the whole body in one block
  // when the post isn't configured, or when the configured heading isn't
  // found (so a copy edit that renames the heading fails safe, not silently).
  const midArticleCta = midArticleApplyCtaForSlug(slug);
  const bodySplit = midArticleCta
    ? splitBodyAfterHeading(presentation.body, midArticleCta.afterHeading)
    : null;

  // Answer-first layout (lib/articleLayouts.ts): same words and headings, a
  // one-screen lead, and the sections as native <details> rows.
  const layout = ARTICLE_LAYOUT_BY_SLUG[slug];
  const folded = layout ? splitBodySections(presentation.body) : null;
  const introParagraphs = folded ? folded.intro.split(/\n\s*\n/) : [];
  const leadAnswer = introParagraphs[0] ?? "";
  const leadIn = introParagraphs.slice(1).join("\n\n");
  const quickAnswerParas: string[] = Array.isArray(frontmatter.quickAnswer)
    ? frontmatter.quickAnswer
    : frontmatter.quickAnswer
      ? [String(frontmatter.quickAnswer)]
      : [];
  const metaLine = `${readingTime(content)} min read · ${presentation.headings.length} sections · Updated ${frontmatter.lastModified || frontmatter.date}`;

  // Shared across both markdown passes when the body is split for the
  // mid-article callout, so `headingIndex` (closed over below) stays in
  // sync with `presentation.headings` regardless of how many Markdown
  // instances actually render.
  const mdComponents = {
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
      const heading = presentation.headings[headingIndex++];
      return <h2 {...props} id={heading?.id ?? slugifyHeading(String(children))} className="display mt-12 border-t border-line2 pt-8 text-[25px] leading-[1.12] text-bone md:text-[32px]">{children}</h2>;
    },
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => <h3 {...props} className="prose-h3 mt-8 mb-4 font-semibold text-bone" />,
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => <h4 {...props} className="mt-6 mb-3 text-[16px] font-semibold text-bone" />,
    p: (props: React.ComponentPropsWithoutRef<"p">) => <p {...props} className="prose-body mt-5 text-bone/85" />,
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
      if (href?.includes("youtube.com/watch") || href?.includes("youtu.be/")) {
        const url = new URL(href); let videoId = url.searchParams.get("v");
        if (!videoId && href.includes("youtu.be/")) videoId = url.pathname.slice(1);
        if (videoId) return <div className="relative my-8 aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink"><iframe src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" /></div>;
      }
      const isTitanForgeIntensiveReferral = href?.startsWith("https://titanforgefit.com/coaching-intensive");
      return <a href={href} {...props} data-analytics-event={isTitanForgeIntensiveReferral ? "titanforge_intensive_referral_click" : undefined} data-analytics-link-kind={isTitanForgeIntensiveReferral ? "titanforge_intensive_referral" : undefined} className="text-bone underline decoration-line2 underline-offset-4 transition-colors hover:text-cloudText">{children}</a>;
    },
    blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => <blockquote {...props} className="article-pullquote">{children}</blockquote>,
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul {...props} className="prose-list my-6 ml-6 list-disc space-y-2 text-bone/85" />,
    ol: (props: React.ComponentPropsWithoutRef<"ol">) => <ol {...props} className="prose-list my-6 ml-6 list-decimal space-y-2 text-bone/85" />,
    li: (props: React.ComponentPropsWithoutRef<"li">) => <li {...props} className="pl-1 marker:text-cloudText" />,
    table: (props: React.ComponentPropsWithoutRef<"table">) => <div role="region" aria-label="Comparison table, scrolls sideways on small screens" tabIndex={0} className="my-8 overflow-x-auto rounded-xl border border-line2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><table {...props} className="w-full min-w-[560px] text-left text-[14.5px]" /></div>,
    th: (props: React.ComponentPropsWithoutRef<"th">) => <th {...props} className="border-b border-line2 bg-ink px-4 py-3 font-semibold text-bone" />,
    td: (props: React.ComponentPropsWithoutRef<"td">) => <td {...props} className="border-b border-line2 px-4 py-3 text-bone/80" />,
    strong: (props: React.ComponentPropsWithoutRef<"strong">) => <strong {...props} className="font-semibold text-bone" />,
    code: (props: React.ComponentPropsWithoutRef<"code">) => <code {...props} className="rounded border border-line2 bg-ink px-1.5 py-0.5 font-mono text-[14px] text-bone" />,
    img: ({ alt = "", ...props }: React.ComponentPropsWithoutRef<"img">) => (
      // Markdown authors control these source URLs, so keep the existing
      // unoptimized rendering contract rather than requiring a host list.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} {...props} className="my-8 max-w-full rounded-xl border border-line2 bg-ink object-cover" />
    ),
    hr: (props: React.ComponentPropsWithoutRef<"hr">) => <hr {...props} className="hair my-10" />,
  };

  return (
    <main className="bg-grain relative min-h-screen">
      <ReadingProgress />
      <JsonLd id={`article-schema-${slug}`} data={articleSchema} />
      <JsonLd id={`breadcrumb-schema-${slug}`} data={breadcrumbSchema} />
      {faqSchema ? <JsonLd id={`faq-schema-${slug}`} data={faqSchema} /> : null}
      <section data-own-folds={layout ? "" : undefined} className={`article-scope blog-article-section mx-auto max-w-[980px] px-6 pb-20 md:px-10 md:pb-28 md:pt-24 ${layout ? "pt-8" : "pt-14"}`}>
        <nav aria-label="Breadcrumb" className={`text-[13px] text-mute ${layout ? "mb-5 hidden md:block" : "mb-7"}`}>
          <ol className="flex flex-wrap items-center gap-2"><li><Link className="hover:text-bone" href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link className="hover:text-bone" href="/blog">Resources</Link></li>{layout ? null : <><li aria-hidden="true">/</li><li className="text-cloudText">{frontmatter.title}</li></>}</ol>
        </nav>
        {layout ? (
          <>
            <ArticleLead slug={slug} title={frontmatter.title} answer={leadAnswer} layout={layout} meta={metaLine} />
            <ArticleScopeInit />
            <OpenFoldOnAnchor />
            <div className="mt-4"><TextSizeControl /></div>
            <EntityLine className="mt-4" />
            {showScholarship ? <div className="mt-8 max-w-[760px]"><ScholarshipCallout sourcePath={blogPath} /></div> : null}
            <div className="hair my-10 md:my-14" />
          </>
        ) : null}
        {!layout && showScholarship ? <div className="max-w-[760px]"><ScholarshipCallout sourcePath={blogPath} /></div> : null}
        {layout ? null : <header className="max-w-[760px]">
          <p className="eyebrow text-cloudText">Geebs coaching guide</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">{frontmatter.title}</h1>
          <p className="prose-lead mt-6 text-bone/85">{frontmatter.description}</p>
          <p className="reader-scale-exempt mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-mute2">
            <span>{readingTime(content)} min read</span>
            <span aria-hidden="true">·</span>
            <span>{presentation.headings.length} sections</span>
            <span aria-hidden="true">·</span>
            <span>Updated {frontmatter.lastModified || frontmatter.date}</span>
          </p>
          <div className="mt-5">
            <TextSizeControl />
          </div>
          <ArticleScopeInit />
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/apply" className="btn btn-primary" data-cta="blog_primary">Get this mapped to you <span aria-hidden="true">→</span></Link><Link href="/blog" className="btn btn-secondary">Browse more guides</Link></div>
          {/* After the header CTA, still ahead of the body in the raw HTML
              (lib/entity.ts). Under the h1 (#826) it pushed that CTA under the
              mobile dock on first paint. */}
          <EntityLine className="mt-5" />
        </header>}
        {layout ? null : <div className="hair my-10 md:my-14" />}
        {layout && quickAnswerParas.length ? (
          <>
            <details className="article-fold !mt-0 !border-t-0" data-quick-answer>
              <summary>
                <h2 id="quick-answer" className="display text-[23px] leading-[1.12] text-bone md:text-[29px]">
                  {frontmatter.quickAnswerHeading || "Quick answer"}
                </h2>
              </summary>
              <div className="article-fold-body">
                {quickAnswerParas.map((para, idx) => (
                  <p key={idx} className="prose-body mt-3 text-bone/90">{para}</p>
                ))}
              </div>
            </details>
            {layout.costFold ? <CoachingCostFold /> : null}
            <div className="hair my-10 md:my-14" />
          </>
        ) : null}
        {!layout && frontmatter.quickAnswer ? (
          <>
            <section
              className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
              aria-labelledby="quick-answer"
            >
              <p className="eyebrow text-cloudText">Quick answer</p>
              <h2
                id="quick-answer"
                className="display mt-3 text-[23px] leading-[1.12] text-bone md:text-[29px]"
              >
                {frontmatter.quickAnswerHeading || "Quick answer"}
              </h2>
              {Array.isArray(frontmatter.quickAnswer) ? (
                frontmatter.quickAnswer.map((para: string, idx: number) => (
                  <p
                    key={idx}
                    className="prose-body mt-4 text-bone/90"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p className="prose-body mt-4 text-bone/90">
                  {frontmatter.quickAnswer}
                </p>
              )}
            </section>
            <div className="hair my-10 md:my-14" />
          </>
        ) : null}
        {Array.isArray(frontmatter.keyTakeaways) && frontmatter.keyTakeaways.length ? (
          <>
            {/* Numbered cards, not a bulleted list. These are the three
                things the post exists to say, and as list items of
                40-plus words each they read as the wall of text a
                scanning reader leaves. Same sentences, sized so the eye
                stops. Server-rendered, so they stay in the HTML that
                crawlers and answer engines receive. */}
            <KeyTakeaways
              heading="What to remember"
              sectionId="blog_key_takeaways"
              takeaways={frontmatter.keyTakeaways.map((item: string) => ({
                title: item,
              }))}
            />
            <div className="hair my-10 md:my-14" />
          </>
        ) : null}
        {/* Optional per-post figures, from frontmatter. The benchmarks that
            answer a post's central question are usually correct and usually
            buried in a bulleted paragraph. This renders them at a size the eye
            stops on, without touching the body copy that carries the section
            anchor Google links to. */}
        {Array.isArray(frontmatter.benchmarks) &&
        frontmatter.benchmarks.length ? (
          <>
            <StatCards
              sectionId="blog_benchmarks"
              heading={
                typeof frontmatter.benchmarksHeading === "string"
                  ? frontmatter.benchmarksHeading
                  : "The numbers"
              }
              columns={frontmatter.benchmarks.length === 4 ? 4 : 3}
              stats={frontmatter.benchmarks.map(
                (b: {
                  label: string;
                  value: string;
                  unit?: string;
                  detail?: string;
                  emphasis?: boolean;
                }) => ({
                  label: b.label,
                  value: b.value,
                  unit: b.unit,
                  detail: b.detail,
                  emphasis: b.emphasis === true,
                }),
              )}
              footnote={
                typeof frontmatter.benchmarksFootnote === "string"
                  ? frontmatter.benchmarksFootnote
                  : undefined
              }
            />
            <div className="hair my-10 md:my-14" />
          </>
        ) : null}
        {/* The packs sit HERE, straight after the summary, not at the end.
            Measured 2026-09-24 over a year of blog traffic: every reader
            reaches 25% depth, 53% reach 50%, and only 14% reach 75%. The rail
            used to render at 79% depth on a 25-screen post, which is the one
            place almost nobody arrives. A reader who came for the summary has
            just finished it — that is the moment they will open another thing,
            and equally the moment they would otherwise leave. */}
        {layout ? null : (
          <>
            <TopicPackRail packs={getTopicPacks()} captureSource="blog_post_packs" />
            <ArticleEarlyCapture slug={slug} />
          </>
        )}
        <div className="article-shell">
          <ArticleToc headings={presentation.headings} />
          <article className="max-w-[760px]">
          {layout && folded ? (
            <>
              {leadIn ? (
                <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {leadIn}
                </Markdown>
              ) : null}
              {folded.sections.map((section) => {
                const id = presentation.headings.find((h) => h.text === section.heading)?.id ?? slugifyHeading(section.heading);
                const text = layout.omitListUnder.includes(section.heading)
                  ? section.text.replace(/^[-*] .*\n?/gm, "").trim()
                  : section.text;
                return (
                  <Fragment key={id}>
                    <details className="article-fold" open={!layout.closedSections.includes(section.heading)}>
                      <summary>
                        <h2 id={id} className="display text-[25px] leading-[1.12] text-bone md:text-[32px]">{section.heading}</h2>
                      </summary>
                      <div className="article-fold-body">
                        <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>{text}</Markdown>
                      </div>
                    </details>
                    {midArticleCta && section.heading === midArticleCta.afterHeading ? (
                      <ArticleApplyCallout cta={midArticleCta} />
                    ) : null}
                  </Fragment>
                );
              })}
            </>
          ) : (
            <>
              <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {bodySplit ? bodySplit.before : presentation.body}
              </Markdown>
              {bodySplit && midArticleCta ? (
                <ArticleApplyCallout cta={midArticleCta} />
              ) : null}
              {bodySplit ? (
                <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {bodySplit.after}
                </Markdown>
              ) : null}
            </>
          )}
          </article>
        </div>
        <TitanProductInline context={productContextForBlogSlug(slug)} source={`geebs_blog_${slug}`} className="mt-12" />
        {/* Closed cards, not an open wall. Measured 2026-09-24: on blog posts
            only 14% of readers reach 75% depth, and this block sits at 61% on a
            25-screen post, so every question it asks costs the reader scroll
            before anything else can. FAQSection is the same markup 66 other
            pages already use; the hand-rolled copy here was the holdout. */}
        {layout ? <div className="mt-12"><ArticleEarlyCapture slug={slug} /></div> : null}
        <FAQSection faqs={faqs} id="blog-faq-heading" />
        {frontmatter.relatedScienceQuestions && Array.isArray(frontmatter.relatedScienceQuestions) && frontmatter.relatedScienceQuestions.length > 0 ? <div className="max-w-[760px]"><RelatedScienceQuestions slugs={frontmatter.relatedScienceQuestions} /></div> : null}
        {readingPath ? (
          <ReadingPath path={readingPath} currentHref={blogPath} source="blog_post" />
        ) : null}
        {inBusyProCluster(blogPath) ? <BusyProCluster currentHref={blogPath} /> : null}
        {/* The packs, at the end of the article. They were live on the
            homepage and the blog index only, while every post ended on a
            static three-card list, which is precisely what the pack UI exists
            to replace: "open a pack instead of scrolling a list".
            The related-guides grid stays below it because those are the
            internal links the post needs; this is the part a reader wants to
            touch. */}
        <section aria-labelledby="related-posts-heading" className="mt-12 border-t border-line2 pt-8"><p className="eyebrow text-cloudText">Keep going</p><h2 id="related-posts-heading" className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]">Related guides</h2><div className="mt-5 grid gap-3 md:grid-cols-3">{related.map((item) => <Link key={item.href} href={item.href} className="block rounded-lg border border-line2 bg-bone/[0.025] p-4"><h3 className="text-[17px] font-semibold leading-[1.25] text-bone">{item.label}</h3><p className="mt-2 text-[14px] leading-[1.55] text-mute">{item.description}</p></Link>)}</div></section>
        {layout ? <TopicPackRail packs={getTopicPacks()} captureSource="blog_post_packs" /> : null}
        {showScholarship ? <ScholarshipSection sourcePath={blogPath} /> : null}
        <section className="mt-12 max-w-[760px] border-t border-line2 pt-10"><h2 className="display text-[24px] leading-[1.1] text-bone md:text-[30px]">Ready to build your custom plan?</h2><p className="mt-3 max-w-[60ch] text-[15.5px] leading-[1.7] text-mute md:text-[16.5px]">Apply for 1:1 online coaching with Kris. Qualified applicants get direct access to Kris&apos;s calendar.</p><div className="mt-6"><Link href="/apply" className="btn btn-primary" data-cta="blog_primary">Get this mapped to you <span aria-hidden="true">→</span></Link></div></section>
        <footer className="mt-14 text-[13px] leading-[1.6] text-mute2"><p>Written by {frontmatter.author || "Kris Oddo"}, NASM-CPT. Last updated {frontmatter.lastModified || frontmatter.date}. {readingTime(content)} min read.</p></footer>
      </section>

      {/* The shared foot, same as every article page. These 70 posts carry the
          most search traffic on the site, including the single highest page at
          14,916 impressions, and they ended on a text CTA with nothing to look
          at. Outside the <section> because the rail is not part of the post. */}
      <MoneyPageKit items={offerRailItems("article")} exit scholarship={false} />

      {/* Geebs coach companion — 16-bit Kris on every article */}
      <CoachCompanion
        slug={slug}
        title={frontmatter.title}
        shortAnswer={shortAnswer}
        faqs={faqs}
        topic={topic}
      />
    </main>
  );
}

import JsonLd from "@/components/JsonLd";
import ArticleShell from "@/components/ArticleShell";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type TextSection = {
  id: string;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
};

type Faq = {
  q: string;
  a: string;
};

type ResourcePageProps = {
  slug: string;
  keyword: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: string[];
  quickAnswer?: TextSection;
  contentSections?: TextSection[];
  faqs?: Faq[];
  datePublished?: string;
  dateModified?: string;
  lastUpdated?: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
  related: RelatedLink[];
  sources?: RelatedLink[];
};

export function ResourceLandingPage({
  slug,
  keyword,
  eyebrow,
  title,
  intro,
  steps,
  quickAnswer,
  contentSections = [],
  faqs = [],
  datePublished,
  dateModified,
  lastUpdated,
  primaryCta,
  secondaryCta,
  related,
  sources = [],
}: ResourcePageProps) {
  const canonicalUrl = `${SITE_URL}${slug}`;
  const resourceTopic = [
    { "@type": "Thing", name: keyword },
    { "@type": "Thing", name: "Online fitness coaching" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: title,
    description: intro,
    url: canonicalUrl,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    breadcrumb: {
      "@id": `${canonicalUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${canonicalUrl}#article`,
    },
    publisher: {
      "@type": "Organization",
      name: "Geebs Coaching",
      url: SITE_URL,
    },
  image: [
    {
      "@type": "ImageObject",
      url: `${SITE_URL}/social-preview-coaching.jpg`
    }
  ],
    author: {
      "@type": "Person",
      name: "Kris Oddo",
      url: `${SITE_URL}/about`,
    },
    about: resourceTopic,
    ...(dateModified ? { dateModified } : {}),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    description: intro,
    mainEntityOfPage: canonicalUrl,
        articleSection: "Free fitness resources",
    keywords: [keyword, "Geebs Coaching", "online fitness coaching"],
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#kris-oddo`,
      name: "Kris Oddo",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Geebs Coaching",
      url: SITE_URL,
    },
    about: resourceTopic,
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
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
        name: "Resources",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd id={`${keyword.toLowerCase()}-resource-schema`} data={jsonLd} />
      <JsonLd
        id={`${keyword.toLowerCase()}-resource-article-schema`}
        data={articleSchema}
      />
      <JsonLd
        id={`${keyword.toLowerCase()}-resource-breadcrumb-schema`}
        data={breadcrumbSchema}
      />
      {faqSchema ? (
        <JsonLd id={`${keyword.toLowerCase()}-resource-faq-schema`} data={faqSchema} />
      ) : null}

      <ArticleShell as="section" className={"mx-auto max-w-[980px] px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-24"}>
        <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-bone" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-bone" href="/blog">
                Resources
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-cloudText">{keyword}</li>
          </ol>
        </nav>

        <header className="max-w-[760px]">
          <p className="eyebrow text-cloudText">{eyebrow}</p>
          <h1 className="display mt-4 text-[34px] leading-[1.04] text-bone sm:text-[44px] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[16.5px] leading-[1.6] text-bone/85 md:text-[18px]">
            {intro}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn btn-secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </header>

        <div className="hair my-10 md:my-14" />

        {quickAnswer ? (
          <>
            <section
              className="rounded-[6px] border border-cloudText/35 bg-cloudText/[0.07] px-5 py-5 md:px-6 md:py-6"
              aria-labelledby={quickAnswer.id}
            >
              {quickAnswer.eyebrow ? (
                <p className="eyebrow text-cloudText">{quickAnswer.eyebrow}</p>
              ) : null}
              <h2
                id={quickAnswer.id}
                className="display mt-3 text-[23px] leading-[1.12] text-bone md:text-[29px]"
              >
                {quickAnswer.heading}
              </h2>
              {quickAnswer.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`max-w-[64ch] leading-[1.7] ${
                    index === 0
                      ? "mt-4 text-[15.5px] text-bone/90 md:text-[16.5px]"
                      : "mt-4 text-[14.5px] text-mute md:text-[15.5px]"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <div className="hair my-10 md:my-14" />
          </>
        ) : null}

        <section aria-labelledby="resource-steps-heading">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-cloudText">Use this today</p>
              <h2
                id="resource-steps-heading"
                className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
              >
                The simple version beats the perfect one.
              </h2>
            </div>

            <ol className="grid gap-3">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg border border-line2 bg-bone/[0.03] p-4"
                >
                  <p className="text-[13px] font-medium text-cloudText">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-[15.5px] leading-[1.6] text-bone/85">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {contentSections.map((section) => (
          <section
            key={section.id}
            aria-labelledby={section.id}
            className="mt-12 border-t border-line2 pt-8"
          >
            {section.eyebrow ? (
              <p className="eyebrow text-cloudText">{section.eyebrow}</p>
            ) : null}
            <h2
              id={section.id}
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              {section.heading}
            </h2>
            <div className="mt-5 grid gap-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[66ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {faqs.length ? (
          <section
            aria-labelledby="resource-faq-heading"
            className="mt-12 border-t border-line2 pt-8"
          >
            <p className="eyebrow text-cloudText">FAQ</p>
            <h2
              id="resource-faq-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Quick questions
            </h2>
            <div className="mt-5 divide-y divide-line2 border-y border-line2">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-4">
                  <h3 className="text-[16.5px] font-semibold leading-[1.3] tracking-normal text-bone md:text-[17px]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.65] text-mute md:text-[15.5px]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {sources.length ? (
          <section
            aria-labelledby="resource-sources-heading"
            className="mt-12 border-t border-line2 pt-8"
          >
            <p className="eyebrow text-cloudText">Sources checked October 27, 2026</p>
            <h2
              id="resource-sources-heading"
              className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
            >
              Menu facts, not guesses
            </h2>
            <p className="mt-4 max-w-[66ch] text-[15.5px] leading-[1.7] text-bone/85 md:text-[16.5px]">
              Restaurant nutrition can change and serving sizes vary. These links show the standard U.S. menu information used here; check the restaurant before ordering if an allergy, medical condition, or strict limit matters to you.
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    className="block rounded-lg border border-line2 bg-bone/[0.025] p-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <h3 className="text-[17px] font-semibold leading-[1.25] tracking-normal text-bone">
                      {source.label}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-mute">
                      {source.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          aria-labelledby="related-guides-heading"
          className="mt-12 border-t border-line2 pt-8"
        >
          <p className="eyebrow text-cloudText">Keep going</p>
          <h2
            id="related-guides-heading"
            className="display mt-3 text-[25px] leading-[1.12] text-bone md:text-[32px]"
          >
            Related guides and tools
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-line2 bg-bone/[0.025] p-4"
              >
                <h3 className="text-[17px] font-semibold leading-[1.25] tracking-normal text-bone">
                  {item.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-mute">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {lastUpdated ? (
          <footer className="mt-14 text-[13px] leading-[1.6] text-mute2">
            <p>Written by Kris Oddo, NASM-CPT. Last updated {lastUpdated}.</p>
          </footer>
        ) : null}
      </ArticleShell>
    </>
  );
}

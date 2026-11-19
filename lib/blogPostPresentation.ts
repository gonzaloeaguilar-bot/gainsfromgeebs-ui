export type BlogFaq = { q: string; a: string };
export type BlogHeading = { text: string; id: string };

const FAQ_HEADING = /^(faqs?|frequently asked questions(?:\s*\(faq\))?)\s*$/i;

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function markdownToText(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractBlogPresentation(
  content: string,
  options: { questionFaqFallback?: boolean } = {},
) {
  const headingMatches = [...content.matchAll(/^##\s+(.+)$/gm)];
  const seen = new Map<string, number>();
  const headings: BlogHeading[] = headingMatches.map((match) => {
    const text = markdownToText(match[1]);
    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return { text, id: count === 1 ? base : `${base}-${count}` };
  });

  const faqHeadingIndex = headingMatches.findIndex((match) =>
    FAQ_HEADING.test(markdownToText(match[1])),
  );
  let body = content;
  let bodyFaqs: BlogFaq[] = [];

  if (faqHeadingIndex >= 0) {
    const start = headingMatches[faqHeadingIndex].index ?? 0;
    const end = headingMatches[faqHeadingIndex + 1]?.index ?? content.length;
    const faqBlock = content.slice(start, end);
    const questionMatches = [...faqBlock.matchAll(/^###\s+(.+)\n+([\s\S]*?)(?=^###\s+|(?![\s\S]))/gm)];
    bodyFaqs = questionMatches
      .map((match) => ({
        q: markdownToText(match[1]),
        a: markdownToText(match[2]),
      }))
      .filter((faq) => faq.q && faq.a);
    body = `${content.slice(0, start)}${content.slice(end)}`.trim();
  }

  // Some older posts are already written as questions and answers without an
  // FAQ wrapper. Their words are reused verbatim rather than generated.
  if (!bodyFaqs.length && options.questionFaqFallback) {
    bodyFaqs = headingMatches
      .map((match, index) => {
        const question = markdownToText(match[1]);
        if (!question.endsWith("?")) return null;
        const start = (match.index ?? 0) + match[0].length;
        const end = headingMatches[index + 1]?.index ?? content.length;
        const answer = content
          .slice(start, end)
          .trim()
          .split(/\n\s*\n/)
          .map(markdownToText)
          .filter((paragraph) => paragraph.length >= 20 && /[a-z]{3}/i.test(paragraph))
          .at(0) ?? "";
        if (!answer) return null;
        return { q: question, a: answer };
      })
      .filter((faq): faq is BlogFaq => faq !== null);
  }

  return {
    body,
    headings: headings.filter((heading) => !FAQ_HEADING.test(heading.text)),
    bodyFaqs,
  };
}

export function readingTime(content: string) {
  const words = markdownToText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/**
 * Splits a post's body right after a named `##` section, so a component can
 * be rendered between two halves of the same markdown without a second
 * rendering pipeline. Used to place a CTA at the reader's highest-intent
 * moment (immediately after they learn what to do) instead of only at the
 * top or bottom of the article.
 *
 * Matches on the heading's rendered TEXT (post-markdown-strip), the same
 * comparison `extractBlogPresentation` uses to build `headings`, so a bold
 * word or an inline link inside the heading does not break the match.
 *
 * Returns null when the heading is not found, so a caller can fall back to
 * rendering the untouched body rather than silently dropping content.
 */
export function splitBodyAfterHeading(
  body: string,
  headingText: string,
): { before: string; after: string } | null {
  const headingMatches = [...body.matchAll(/^##\s+(.+)$/gm)];
  const target = headingMatches.find(
    (match) => markdownToText(match[1]) === headingText,
  );
  if (!target || target.index === undefined) return null;

  const next = headingMatches.find(
    (match) => (match.index ?? 0) > (target.index ?? -1),
  );
  const cutPoint = next?.index ?? body.length;

  return {
    before: body.slice(0, cutPoint).trimEnd(),
    after: body.slice(cutPoint).trimStart(),
  };
}

/**
 * Extracts "The short answer" section from post markdown content.
 * Falls back to quickAnswer frontmatter if available, or returns empty string.
 */
export function extractShortAnswer(
  content: string,
  quickAnswer?: string | string[],
): string {
  const headingMatches = [...content.matchAll(/^##\s+(.+)$/gm)];
  const targetIndex = headingMatches.findIndex((m) =>
    /short answer/i.test(markdownToText(m[1])),
  );
  if (targetIndex >= 0) {
    const start =
      (headingMatches[targetIndex].index ?? 0) +
      headingMatches[targetIndex][0].length;
    const end = headingMatches[targetIndex + 1]?.index ?? content.length;
    const raw = content.slice(start, end).trim();
    const text = raw
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_~>#]/g, "")
      .trim();
    if (text) return text;
  }
  if (quickAnswer) {
    if (Array.isArray(quickAnswer)) return quickAnswer.join("\n\n");
    return String(quickAnswer);
  }
  return "";
}


export type BodySection = {
  /** Heading as rendered text, the same comparison `extractBlogPresentation` uses. */
  heading: string;
  /** Everything under the heading, up to the next `##`, heading line removed. */
  text: string;
};

/**
 * Cuts a post body into its lead-in and its `##` sections, losing no text:
 * `intro` plus every `## heading` + `text` joined back is the original body.
 *
 * Used by layouts that fold a long post into native <details> rows, so each
 * section can be a row while the words stay in the server-rendered HTML.
 */
export function splitBodySections(body: string): {
  intro: string;
  sections: BodySection[];
} {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  if (!matches.length) return { intro: body.trim(), sections: [] };
  const intro = body.slice(0, matches[0].index ?? 0).trim();
  const sections = matches.map((match, i) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[i + 1]?.index ?? body.length;
    return { heading: markdownToText(match[1]), text: body.slice(start, end).trim() };
  });
  return { intro, sections };
}

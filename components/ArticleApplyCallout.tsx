import type { MidArticleApplyCta } from "@/lib/midArticleApplyCta";
import SendKrisStep from "@/components/SendKrisStep";

/**
 * Inline apply step dropped mid-article at the reader's highest-intent
 * moment (see lib/midArticleApplyCta.ts for why the placement matters).
 *
 * 2026-10-07: rebuilt on SendKrisStep. The previous plain `.btn` aside drew 0
 * attributable clicks from 129 skinny-fat readers in 28 days (GA4 538698079);
 * its clicks also reached the contract `cta_click` as cta_id "(not set)",
 * because the site's own layer measured it as `article_cta_click`. The
 * measurement id is unchanged so the series stays comparable.
 */
export default function ArticleApplyCallout({
  cta,
}: {
  cta: MidArticleApplyCta;
}) {
  const href = `/apply?utm_source=site&utm_medium=blog_body&utm_campaign=contextual_cta&utm_content=${encodeURIComponent(cta.ctaId)}`;

  return (
    <SendKrisStep
      className="my-10"
      ctaId={cta.ctaId}
      position="mid_article"
      eyebrow={cta.eyebrow}
      title={cta.title}
      body={cta.body}
      label={cta.label}
      href={href}
      secondary={cta.secondary}
    />
  );
}

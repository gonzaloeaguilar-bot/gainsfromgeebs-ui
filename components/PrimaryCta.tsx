import Link from "next/link";
import { ctaForPath, type CtaSurface } from "@/lib/ctaCopy";

type Props = {
  /** The page this CTA sits on. Drives both the copy and the measurement id. */
  path: string;
  /** Override the resolved label. The id still comes from the surface. */
  label?: string;
  className?: string;
  /** utm_content / analytics slot, e.g. "bottom" or "hero". */
  position?: string;
};

/**
 * The primary call-to-action on a money page.
 *
 * `data-cta` is the load-bearing attribute: without it the delegated analytics
 * layer falls back to slugging the LABEL into cta_id (public/analytics/track.js:316),
 * so every copy edit renames the metric and no before/after comparison survives.
 * The id comes from lib/ctaCopy.ts and stays fixed while the words change.
 */
export default function PrimaryCta({ path, label, className, position = "bottom" }: Props) {
  const surface: CtaSurface = ctaForPath(path);
  const text = label ?? surface.label;
  const href = `${surface.href}?utm_source=site&utm_medium=money_page&utm_campaign=contextual_cta&utm_content=${encodeURIComponent(`${surface.id}_${position}`)}`;

  return (
    <Link
      href={href}
      className={className ?? "btn btn-primary"}
      data-cta={surface.id}
      data-cta-position={position}
    >
      {text}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

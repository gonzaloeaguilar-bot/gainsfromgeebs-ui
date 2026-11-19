import Link from "next/link";
import { BUSY_PRO_GUIDES, BUSY_PRO_HUBS, type ClusterLink } from "@/lib/busyProCluster";

/**
 * Server-rendered links across the busy-professional pages plus the apply
 * step. Plain anchors in the HTML so crawlers that run no JavaScript still see
 * the cluster; clicks are counted by the site-wide `data-cta` listener.
 */
export default function BusyProCluster({ currentHref }: { currentHref: string }) {
  const row = (l: ClusterLink) =>
    l.href === currentHref ? null : (
      <li key={l.href}>
        <Link
          href={l.href}
          className="group grid gap-1 py-3 no-underline"
          data-cta="busy_pro_cluster_link"
          data-cta-position="busy_pro_cluster"
        >
          <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">{l.label}</span>
          <span className="text-[13.5px] leading-[1.55] text-mute">{l.detail}</span>
        </Link>
      </li>
    );

  return (
    <section aria-labelledby="busy-pro-cluster-heading" className="mt-12 max-w-[760px] border-t border-line2 pt-8">
      <p className="eyebrow text-cloudText">When work is the constraint</p>
      <h2 id="busy-pro-cluster-heading" className="display mt-3 text-[24px] leading-[1.12] text-bone md:text-[30px]">
        Fitness for long hours, desk jobs and shift work
      </h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-[13px] uppercase tracking-[0.08em] text-mute2">Coaching by situation</h3>
          <ul className="mt-2 divide-y divide-line2 border-y border-line2">{BUSY_PRO_HUBS.map(row)}</ul>
        </div>
        <div>
          <h3 className="text-[13px] uppercase tracking-[0.08em] text-mute2">Free guides</h3>
          <ul className="mt-2 divide-y divide-line2 border-y border-line2">{BUSY_PRO_GUIDES.map(row)}</ul>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/apply" className="btn btn-primary" data-cta="busy_pro_cluster_apply" data-cta-position="busy_pro_cluster">
          Apply for a plan built around your hours <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

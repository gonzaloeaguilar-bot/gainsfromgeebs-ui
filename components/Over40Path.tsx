import Link from "next/link";
import Over40Proof from "@/components/Over40Proof";
import SendKrisStep from "@/components/SendKrisStep";
import { OVER40_HUB_HREF } from "@/data/over40Hub";

/**
 * The block the two over-40 audience pages share (/for/men-over-40 and
 * /for/new-dads): a real client over 40, the guides that answer the
 * questions these readers search, and one step to send it to Kris.
 *
 * GSC 2026-07-08 to 10-06: both pages were indexed but drew 22 and 3
 * impressions, while the dad-bod guide drew 1,624. These links tie the
 * audience pages to the pages Google already shows and to the hub.
 */
const PATH_LINKS = [
  {
    href: OVER40_HUB_HREF,
    label: "Body recomposition over 40",
    description: "Muscle, belly fat, testosterone, protein and sleep after 40, one study each.",
  },
  {
    href: "/blog/how-to-lose-the-dad-bod",
    label: "How to lose the dad bod",
    description: "Why it creeps on, the belly specifically, and the three-day plan.",
  },
  {
    href: "/skinny-fat",
    label: "Skinny fat, explained",
    description: "Normal weight, soft middle: the waist test and the recomp fix.",
  },
  {
    href: "/tools/body-recomposition-calculator",
    label: "Body recomposition calculator",
    description: "Your protein target and calorie starting point in under a minute.",
  },
];

export default function Over40Path({
  ctaId,
  entryContent,
  eyebrow,
  title,
  body,
}: {
  ctaId: string;
  entryContent: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const applyHref = `/apply?entry_source=qualified_content&entry_content=${entryContent}&utm_source=site&utm_medium=money_page&utm_campaign=men_over_40`;
  return (
    <section data-no-fold="true" aria-labelledby={`${ctaId}-heading`}>
      <Over40Proof />
      <h2
        id={`${ctaId}-heading`}
        className="display mt-10 text-bone text-[24px] md:text-[30px] leading-[1.1]"
      >
        Start with the guides
      </h2>
      <div className="mt-4 divide-y divide-line2 border-y border-line2">
        {PATH_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="group grid min-h-20 gap-1 py-4 no-underline">
            <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
              {link.label}
            </span>
            <span className="text-[13.5px] leading-[1.55] text-mute">{link.description}</span>
          </Link>
        ))}
      </div>
      <SendKrisStep
        className="mt-10"
        ctaId={ctaId}
        position="mid"
        eyebrow={eyebrow}
        title={title}
        body={body}
        label="Send it to Kris"
        href={applyHref}
      />
    </section>
  );
}

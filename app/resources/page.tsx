import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SectionView from "@/components/SectionView";
import KeepGoing from "@/components/KeepGoing";
import ResourceLibrary from "./library";

const SITE_URL = "https://gainsfromgeebs.com";
const TITLE = "Free Fitness Resources for Busy Men";
const DESCRIPTION =
  "Eight free guides: protein targets, fast-food choices, a training plan that survives long hours, macro maths for recomposition, a bad-week reset, diet soda while cutting, coaching costs, and a fit check.";

export const metadata: Metadata = {
  title: `${TITLE} | Geebs Coaching`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: `${TITLE} | Geebs Coaching`,
    description: DESCRIPTION,
    url: `${SITE_URL}/resources`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Geebs Coaching`,
    description: DESCRIPTION,
  },
};

/* Seven resource pages existed and the index did not, so /resources returned
   404 while still taking Instagram traffic (measured 2026-09-24). Kept as a
   real hub rather than a redirect: the pages are the reason someone arrives,
   and a list of seven is the one shape that does not need folding. */
const RESOURCES: { href: string; title: string; blurb: string; tag: string }[] = [
  {
    href: "/resources/high-protein-fast-food-guide",
    title: "High-Protein Fast Food Guide",
    blurb:
      "Two current U.S. menu examples, the tradeoffs that matter, and a simple rule for busy days.",
    tag: "Nutrition",
  },
  {
    href: "/resources/protein-guide",
    title: "Simple Protein Guide",
    blurb:
      "A protein target you can hit on a normal week, and what to do when you miss it.",
    tag: "Nutrition",
  },
  {
    href: "/resources/how-to-calculate-macros-for-body-recomposition",
    title: "How to Calculate Macros for Body Recomposition",
    blurb:
      "The actual arithmetic for losing fat and building muscle at once, with your own numbers.",
    tag: "Nutrition",
  },
  {
    href: "/resources/busy-guy-training-plan",
    title: "Busy Guy Training Plan",
    blurb:
      "A training structure for men working long hours that survives a real week.",
    tag: "Training",
  },
  {
    href: "/resources/bad-week-adjustment-loop",
    title: "Bad Week Adjustment Loop",
    blurb:
      "Shrink the plan, protect protein, recover the next window, and stop restarting.",
    tag: "Consistency",
  },
  {
    href: "/resources/diet-soda-cutting",
    title: "Diet Soda and Cutting",
    blurb: "Whether it matters for cravings, calories and staying consistent.",
    tag: "Nutrition",
  },
  {
    href: "/resources/online-fitness-coaching-cost-faq",
    title: "Online Coaching Cost FAQ",
    blurb:
      "Typical price ranges, what moves the price, and the cheaper alternatives.",
    tag: "Coaching",
  },
  {
    href: "/resources/online-fitness-coaching-fit-check",
    title: "Coaching Fit Check",
    blurb:
      "Whether 1:1 coaching, a self-guided plan, or a simple reset is your next step.",
    tag: "Coaching",
  },
];

export default function ResourcesIndexPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/resources#list`,
    name: TITLE,
    itemListElement: RESOURCES.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}${item.href}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${SITE_URL}/resources`,
      },
    ],
  };

  return (
    <>
      <JsonLd id="resources-list-schema" data={itemListSchema} />
      <JsonLd id="resources-breadcrumb-schema" data={breadcrumbSchema} />
      <main id="main" className="mx-auto max-w-[1120px] px-6 py-14 md:px-10 md:py-20">
        <p className="eyebrow text-cloudText">Free resources</p>
        <h1 className="display mt-3 text-[32px] leading-[1.06] text-bone sm:text-[40px] md:text-[48px]">
          {TITLE}
        </h1>
        <p
          data-no-fold
          className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.7] text-mute md:text-[17.5px]"
        >
          Eight guides, all free and all readable in a few minutes. No email
          needed to open any of them.
        </p>

        <SectionView sectionId="resources_index">
          <section data-no-fold aria-labelledby="resources-list-heading" className="mt-10">
            <h2 id="resources-list-heading" className="sr-only">
              All resources
            </h2>

        <p className="eyebrow mt-12 text-cloudText">The library</p>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-bone/85">
          Pull a page off a shelf, or open the one stood face-out at the end of a row.
        </p>
        <div className="mt-6">
          <ResourceLibrary />
        </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {RESOURCES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cta={`resource_${item.href.split("/").pop()}`}
                    className="group block h-full rounded-[10px] border border-line bg-bone/[0.025] p-5 transition-colors hover:border-bone/40"
                  >
                    <span className="eyebrow text-cloudText">{item.tag}</span>
                    <h3 className="mt-2 text-[17px] font-semibold leading-[1.25] text-bone md:text-[18px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-mute">
                      {item.blurb}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </SectionView>

        <KeepGoing position="resources" />
      </main>
    </>
  );
}

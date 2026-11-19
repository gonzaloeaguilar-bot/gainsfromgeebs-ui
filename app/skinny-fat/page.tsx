import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";

/**
 * The skinny-fat hub.
 *
 * Skinny-fat men are the client Kris coaches best, and the site already ranks
 * for the topic (Semrush 2026-10-06: 24 skinny-fat keywords, 6,310 searches a
 * month, #1 for "skinny fat men"). Those rankings were spread across a blog
 * post, a /for/ page, a Denver page and a skinny-guy post with no page tying
 * them together. This is that page: answer first, one fact per question,
 * depth behind native <details> so every word is in the server HTML for
 * crawlers that run no JavaScript, and a link to every skinny-fat page.
 *
 * No new thin pages hang off it — it only points at pages that already exist.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/skinny-fat";
const UPDATED = "2026-10-27";
const APPLY_HREF =
  "/apply?entry_source=qualified_content&entry_content=skinny_fat_hub&utm_source=site&utm_medium=hub&utm_campaign=skinny_fat";

type Fact = {
  id: string;
  q: string;
  /** Visible at rest: the answer, carrying the fact. */
  answer: string;
  /** Behind the fold: the depth, and the link to the page that goes further. */
  more: string[];
  source?: { label: string; href: string };
  next: { href: string; label: string };
};

const FACTS: Fact[] = [
  {
    id: "what-is-skinny-fat",
    q: "What is skinny fat?",
    answer:
      "Skinny fat means a normal weight on the scale with too little muscle and too much body fat for your frame. Skinny-fat men typically measure 20–26% body fat, against roughly 12–16% for a lean man, while BMI still reads normal.",
    more: [
      "In a shirt you look slim. Without one, the waist is soft, the chest and shoulders are flat, and the belly is the first thing you notice. The scale cannot show any of this, because it cannot tell fat from muscle.",
      "That is why the fix is not \"lose weight.\" Most skinny-fat men do not have much weight to lose. They have muscle to build, and a waist that comes down as that muscle goes on.",
    ],
    next: { href: "/blog/how-to-fix-skinny-fat", label: "The full skinny-fat plan" },
  },
  {
    id: "how-do-i-know",
    q: "How do I know if I am skinny fat?",
    answer:
      "Measure your waist and compare it with your height. A waist more than half your height is the clearest sign, and a review of studies covering more than 300,000 adults found waist-to-height beat both BMI and waist size alone at spotting health risk.",
    more: [
      "Measure at the navel, relaxed, first thing in the morning. A 70-inch man with a waist over 35 inches is past the line. Add a front and side photo and your best lifts, and you have a starting point the scale cannot give you.",
      "If you want a number for body fat, the calculator below gives an estimate from a few tape measurements. Treat it as a trend line, not a verdict.",
    ],
    source: {
      label: "Ashwell et al., 2012, Obesity Reviews (PMID 22106927)",
      href: "https://pubmed.ncbi.nlm.nih.gov/22106927/",
    },
    next: { href: "/tools/body-fat-calculator", label: "Estimate your body fat" },
  },
  {
    id: "bulk-cut-or-recomp",
    q: "Should a skinny-fat man bulk, cut or recomp?",
    answer:
      "Recomp first, for most men: build muscle and lose fat at the same time. In a trial of 40 young men eating about 40% below their needs, the high-protein group still gained 1.2 kg of lean mass and lost 4.8 kg of fat.",
    more: [
      "The low-protein group in the same trial gained almost no muscle (0.1 kg) and lost less fat (3.5 kg). These were young men lifting and doing intervals six days a week, so your numbers will differ, but the direction holds: protein and hard lifting, not a bigger deficit.",
      "A hard bulk adds fat to a frame that already carries too much of it. A crash diet strips the little muscle you have and leaves you smaller and just as soft. Recomp avoids both. The exception is a man who is genuinely lean and under-muscled; he needs a small surplus instead.",
    ],
    source: {
      label: "Longland et al., 2016, American Journal of Clinical Nutrition (PMID 26817506)",
      href: "https://pubmed.ncbi.nlm.nih.gov/26817506/",
    },
    next: { href: "/blog/cut-vs-recomp-vs-bulk", label: "Cut vs recomp vs bulk, compared" },
  },
  {
    id: "how-much-protein",
    q: "How much protein does a skinny-fat man need?",
    answer:
      "Eat 0.8–1 gram of protein per pound of bodyweight every day. A review of 49 trials and 1,863 people found muscle gains from lifting stopped improving at about 1.6 g per kg (roughly 0.73 g per pound), so this target clears it with room to spare.",
    more: [
      "For a 170-pound man that is 136–170 grams a day: four meals of 35–45 grams each, from meat, fish, eggs, Greek yogurt or a shake. Hitting the number most days matters far more than timing it perfectly.",
      "Calories sit at maintenance or a small deficit of 250–400 a day. That is enough for the waist to come down without taking the energy you need to train well.",
    ],
    source: {
      label: "Morton et al., 2018, British Journal of Sports Medicine (PMID 28698222)",
      href: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
    },
    next: {
      href: "/tools/body-recomposition-calculator",
      label: "Get your protein and calorie numbers",
    },
  },
  {
    id: "what-workout",
    q: "What workout fixes skinny fat?",
    answer:
      "Lift your whole body three days a week and keep cardio easy. A review of 21 studies found running, but not cycling, cut into the muscle and strength gained from lifting, so walking and easy cycling are the cardio that fits.",
    more: [
      "Each session: a squat or leg press, a press, a row or pulldown, and a hip hinge. Stop each set with one or two clean reps left, and add a rep or a little weight when your form holds. Monday, Wednesday, Friday is enough.",
      "For cardio, aim for 8,000–10,000 steps a day and one or two easy 20–30 minute rides or walks a week. That supports fat loss without competing with the lifting that builds the shape.",
    ],
    source: {
      label: "Wilson et al., 2012, Journal of Strength and Conditioning Research (PMID 22002517)",
      href: "https://pubmed.ncbi.nlm.nih.gov/22002517/",
    },
    next: {
      href: "/guides/body-recomposition-for-beginners",
      label: "Body recomposition for beginners",
    },
  },
  {
    id: "skinny-vs-skinny-fat",
    q: "Is skinny fat the same as being skinny?",
    answer:
      "No, and they need opposite plans. A skinny man is lean and needs a 300–500 calorie surplus to grow. A skinny-fat man already carries fat, so he eats at maintenance or slightly below and lets the lifting do the building.",
    more: [
      "The quick test: pinch the skin beside your navel. If there is very little there and your ribs show, you are skinny, and eating more is the hard part of your training. If there is a real pinch and a soft lower belly, you are skinny fat, and a big surplus will only make that worse.",
      "Both men lift the same way. The difference is entirely in the food.",
    ],
    next: {
      href: "/blog/how-to-build-muscle-for-skinny-guys",
      label: "The plan for genuinely skinny guys",
    },
  },
  {
    id: "how-long",
    q: "How long does it take to fix skinny fat?",
    answer:
      "Expect noticeable change in 8–16 weeks of steady lifting and eating. Strength and a smaller waist usually show up first, in weeks 2–4; visible chest, shoulder and stomach definition takes three to six months.",
    more: [
      "The scale often barely moves during a recomp, because muscle is going on while fat comes off. That is the point where most men quit, and the reason to track your waist, photos and lifts every two to four weeks instead.",
      "If those three are moving in the right direction, the plan is working, whatever the scale says. If they stall for a month, adjust one thing, usually calories or protein consistency, not everything at once.",
    ],
    next: { href: "/for/skinny-fat-men", label: "Coaching for skinny-fat men" },
  },
];

type HubLink = { href: string; label: string; description: string };

const GROUPS: { id: string; heading: string; links: HubLink[] }[] = [
  {
    id: "plans",
    heading: "The plans",
    links: [
      {
        href: "/blog/how-to-fix-skinny-fat",
        label: "Skinny fat men: how to fix it",
        description:
          "The complete plan: the 3-day workout, protein and calorie targets, and a month-by-month timeline.",
      },
      {
        href: "/blog/cut-vs-recomp-vs-bulk",
        label: "Cut vs recomp vs bulk",
        description: "Which phase to start with, decided by where you are starting from.",
      },
      {
        href: "/blog/how-to-build-muscle-for-skinny-guys",
        label: "How to build muscle for skinny guys",
        description: "If you are lean rather than soft, this is your plan instead.",
      },
      {
        href: "/guides/body-recomposition-for-beginners",
        label: "Body recomposition for beginners",
        description: "How building muscle and losing fat at the same time actually works.",
      },
      {
        href: "/blog/body-recomposition-for-men",
        label: "Body recomposition for men",
        description: "The full recomp method, step by step.",
      },
    ],
  },
  {
    id: "tools",
    heading: "Check your numbers",
    links: [
      {
        href: "/tools/body-recomposition-calculator",
        label: "Body recomposition calculator",
        description: "Your protein target and calorie starting point in under a minute.",
      },
      {
        href: "/tools/body-fat-calculator",
        label: "Body fat calculator",
        description: "An estimate from a few tape measurements, to track as a trend.",
      },
    ],
  },
  {
    id: "research",
    heading: "The research behind it",
    links: [
      {
        href: "/science/questions/can-you-build-muscle-and-lose-fat-at-the-same-time",
        label: "Can you build muscle and lose fat at the same time?",
        description: "What the trials show, and who it works best for.",
      },
      {
        href: "/science/questions/should-you-cut-or-recomp-first",
        label: "Should you cut or recomp first?",
        description: "The evidence on which phase to begin with.",
      },
      {
        href: "/science/questions/how-much-protein-for-body-recomposition",
        label: "How much protein for body recomposition?",
        description: "Where the protein research plateaus, and why.",
      },
      {
        href: "/science/questions/how-do-you-avoid-losing-muscle-while-dieting",
        label: "How do you avoid losing muscle while dieting?",
        description: "Keeping the muscle you have while the waist comes down.",
      },
    ],
  },
  {
    id: "coaching",
    heading: "Coaching for skinny-fat men",
    links: [
      {
        href: "/for/skinny-fat-men",
        label: "1:1 coaching for skinny-fat men",
        description: "How Kris builds a recomp plan around your body, schedule and appetite.",
      },
      {
        href: "/skinny-fat-transformation-coach-denver",
        label: "Skinny-fat transformation coaching in Denver",
        description: "Stop guessing whether to bulk or cut, with a recomp plan for Denver clients.",
      },
      {
        href: "/body-recomposition-coach-denver",
        label: "Body recomposition coach in Denver",
        description: "Build muscle and lose fat without starting over, for Denver clients.",
      },
    ],
  },
];

const ALL_LINKS = GROUPS.flatMap((g) => g.links);

export const metadata: Metadata = {
  title: "Skinny Fat: Symptoms, Waist Test, and What to Do First",
  description:
    "Not sure if you are skinny fat? Use the waist test, learn whether recomp fits your starting point, then choose the right plan or calculator.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Skinny Fat: Symptoms, Waist Test, and What to Do First",
    description:
      "Use the waist test, choose your starting point, and find the right next step.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Skinny-fat guide for men by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinny Fat: Symptoms, Waist Test, and What to Do First",
    description: "Use the waist test, choose your starting point, and find the right next step.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}${SLUG}#page`,
      url: `${SITE_URL}${SLUG}`,
      name: "Skinny Fat: Symptoms, Waist Test, and What to Do First",
      dateModified: UPDATED,
      about: { "@type": "Thing", name: "Skinny fat" },
      author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: `${SITE_URL}/about` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ALL_LINKS.map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.label,
          url: `${SITE_URL}${link.href}`,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}${SLUG}#faq`,
      mainEntity: FACTS.map((fact) => ({
        "@type": "Question",
        name: fact.q,
        acceptedAnswer: { "@type": "Answer", text: fact.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Skinny fat", item: `${SITE_URL}${SLUG}` },
      ],
    },
  ],
};

export default function SkinnyFatHubPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="skinny-fat-hub-schema" data={pageSchema} />
      <article
        className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"
        data-analytics-source="skinny_fat_hub"
      >
        <header>
          <p className="eyebrow text-cloudText">Skinny fat, for men</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Skinny fat: what it is and how to fix it
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Skinny fat is a normal weight with too little muscle and a soft
            middle. Most men fix it with a recomp: lift your whole body three
            days a week, eat 0.8–1 gram of protein per pound, and keep calories
            near maintenance.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/blog/how-to-fix-skinny-fat"
              className="btn btn-primary"
              data-cta="skinny_fat_hub_plan"
              data-cta-position="hero"
            >
              Read the full plan
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={APPLY_HREF}
              className="btn btn-secondary"
              data-cta="skinny_fat_hub_apply"
              data-cta-position="hero"
            >
              Get a plan built for you
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-mute2">
            By Kris Oddo, NASM-CPT · Updated{" "}
            <time dateTime={UPDATED}>{new Date(`${UPDATED}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {FACTS.map((fact, index) => (
          <section
            key={fact.id}
            id={fact.id}
            className="prose-section mt-10 first-of-type:mt-0"
            data-no-fold="true"
          >
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {fact.q}
            </h2>
            <p className="mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]">
              {fact.answer}
            </p>
            <details className="article-details" open={index === 0}>
              <summary>More on this</summary>
              <div className="article-details-body">
                {fact.more.map((para, pi) => (
                  <p
                    key={pi}
                    className="mt-3 first:mt-0 text-[15px] md:text-[16px] leading-[1.7] text-mute max-w-[64ch]"
                  >
                    {para}
                  </p>
                ))}
                {fact.source ? (
                  <p className="mt-3 text-[13px] leading-[1.6] text-mute2">
                    Source:{" "}
                    <a
                      href={fact.source.href}
                      className="underline hover:text-bone"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fact.source.label}
                    </a>
                  </p>
                ) : null}
                <p className="mt-4">
                  <Link
                    href={fact.next.href}
                    className="text-[15px] font-semibold text-bone underline hover:text-cloudText"
                  >
                    {fact.next.label} →
                  </Link>
                </p>
              </div>
            </details>
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <section id="every-guide" data-no-fold="true">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Every skinny-fat guide on this site
          </h2>
          {GROUPS.map((group) => (
            <div key={group.id} className="mt-8">
              <h3 className="eyebrow text-cloudText">{group.heading}</h3>
              <div className="mt-2 divide-y divide-line2 border-y border-line2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group grid min-h-20 gap-1 py-4 no-underline"
                  >
                    <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                      {link.label}
                    </span>
                    <span className="text-[13.5px] leading-[1.55] text-mute">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="hair my-10 md:my-14" />

        <section data-no-fold="true">
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Want the plan built around you?
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            A skinny-fat recomp is exactly what Kris coaches. 1:1 coaching
            sets your calories, protein and training from your actual starting
            point, then adjusts every week. It starts with a short application:
            three questions, under two minutes.
          </p>
          <div className="mt-7">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-cta="skinny_fat_hub_apply"
              data-cta-position="bottom"
            >
              Get this mapped to you
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

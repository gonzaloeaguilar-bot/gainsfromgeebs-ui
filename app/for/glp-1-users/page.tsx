import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import MoneyPageKit from "@/components/MoneyPageKit";
import ProofStrip from "@/components/ProofStrip";
import SendKrisStep from "@/components/SendKrisStep";
import { offerRailItems } from "@/lib/offerRail";
import {
  FAT_LOSS_HUB_HREF,
  RECOMP_CALCULATOR_HREF,
  SOURCES,
  type HubFact,
} from "@/data/scienceQuestionHubs";

/**
 * Keep your muscle while you're on a GLP-1.
 *
 * Niche #1 of geebs-next-niches-2026-10 ("losing fat without losing muscle")
 * names this page as the gap: the site had four GLP-1 science answers and
 * several GLP-1 study pages pulling research traffic, and no page speaking to
 * a person who is on the medication and wants to keep their muscle. 2 of 56
 * booked DM leads raised GLP-1s or peptides (n is tiny, so it is a page, not
 * a niche of its own).
 *
 * WHAT THIS PAGE MUST NEVER SAY: anything about dosing, starting, stopping,
 * side effects or whether the medication is right for someone. Coaching here
 * is lifting and protein that works alongside the prescriber. Every number is
 * from the PubMed abstract of the cited paper, read 2026-10-08.
 */

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/for/glp-1-users";
const UPDATED = "2026-10-08";
const ENTRY_CONTENT = "glp1_users_page";
const APPLY_HREF = `/apply?entry_source=qualified_content&entry_content=${ENTRY_CONTENT}&utm_source=site&utm_medium=money_page&utm_campaign=fat_loss_keep_muscle`;

const FACTS: HubFact[] = [
  {
    id: "do-glp-1s-take-muscle",
    q: "Do GLP-1 medications take muscle as well as fat?",
    answer:
      "Some, yes. A review of 22 trials and 2,258 people found that lean mass made up about 25% of the weight lost on GLP-1 medications. The other 75% was fat, which is why the scale alone cannot tell you how it is going.",
    more: [
      "The same review found that lean mass as a share of the body did not get worse, so the medication is not singling out muscle. It is producing a lot of weight loss, and a quarter of a large number is still a real amount of tissue.",
      "That quarter is the part you can influence. Lifting tells the body which tissue to keep, and protein gives it the material to keep it with.",
    ],
    source: SOURCES.karakasis,
    next: { href: "/science/questions/do-glp-1s-cause-muscle-loss", label: "Do GLP-1s cause muscle loss?" },
  },
  {
    id: "tirzepatide-body-scan",
    q: "What did the tirzepatide body scans show?",
    answer:
      "In the SURMOUNT-1 body-scan substudy, 160 people had full scans before and after 72 weeks. Those on tirzepatide lost 21.3% of their bodyweight, 33.9% of their fat and 10.9% of their lean mass.",
    more: [
      "Of everything they lost, about 75% was fat and 25% lean mass, the same split as the placebo group, who lost far less. Most of the people scanned (73%) were women.",
      "Lean mass on a scan also counts water and organs, not only muscle, so it is a rough measure. Strength is the better day-to-day signal: if your lifts hold while the weight comes down, you are keeping what matters.",
    ],
    source: SOURCES.look,
    next: {
      href: "/science/studies/tirzepatide-body-composition-surmount1-2025",
      label: "The SURMOUNT-1 study, broken down",
    },
  },
  {
    id: "does-lifting-help",
    q: "Does lifting actually help while you are on a GLP-1?",
    answer:
      "It is the best tool available, and the trials testing it directly are still running. A 2024 review in Diabetes Care put lean-mass loss on these medications at about 10%, or 6 kg, and found supervised lifting for over 10 weeks adds about 3 kg of lean mass.",
    more: [
      "The review also found strength gains of about 25% from that training, in men and women, and its authors recommend tailored resistance training alongside these medications.",
      "A trial of protein plus lifting during semaglutide and tirzepatide treatment (LEAN-PREP) has published its plan but not its results. Until it does, nobody can promise you an exact number. Lifting is still the safe bet, because the downside is small and the upside is your strength.",
    ],
    source: SOURCES.locatelli,
    next: { href: "/science/questions/should-you-lift-while-on-glp-1", label: "Should you lift while on a GLP-1?" },
  },
  {
    id: "protein-without-appetite",
    q: "How do you eat enough protein when you are not hungry?",
    answer:
      "Make protein the first thing on the plate, every time. Muscle gains from lifting top out at about 1.6 g of protein per kg of bodyweight a day, according to a review of 49 trials and 1,863 people, so that is the number to work toward.",
    more: [
      "With a smaller appetite, the trick is order, not volume: eat the protein first, use foods that go down easily (Greek yogurt, eggs, fish, a shake), and spread it over three or four smaller meals.",
      "If you cannot get close to the target for more than a week or two, or eating at all is hard, tell your prescriber. Low intake on these medications is a medical conversation, not a willpower problem.",
    ],
    source: SOURCES.morton,
    next: { href: RECOMP_CALCULATOR_HREF, label: "Get your protein target" },
  },
  {
    id: "coach-or-prescriber",
    q: "What does a coach do, and what stays with your prescriber?",
    answer:
      "Your prescriber owns the medication. A coach owns the training and the food around it. A 2025 joint advisory from four obesity and nutrition societies lists muscle and bone loss as a main problem on GLP-1s, and resistance training and diet as the way to protect them.",
    more: [
      "The same advisory notes these medications cut weight by 5% to 18% in trials, and that many people stop taking them and regain weight. Muscle and habits you build now are what you keep if that happens.",
      "So Kris will never tell you what dose to take, whether to start, or whether to stop. He will build your lifting around your energy, set your protein around your appetite, and adjust both every week.",
    ],
    source: SOURCES.mozaffarian,
    next: { href: "/science/questions/should-you-use-protein-and-lifting-on-glp-1", label: "Protein and lifting on a GLP-1" },
  },
  {
    id: "how-to-track",
    q: "How do you know you are keeping your muscle?",
    answer:
      "Track your lifts, not just the scale. Across 25 trials of people dieting to lose weight, adding resistance training barely changed scale weight (0.32 kg) but protected fat-free mass and increased fat loss.",
    more: [
      "Two people can lose the same weight with very different results in the mirror. The scale cannot see the difference; your lifts and a tape measure can.",
      "Coaching tracks three things each week: strength on a few repeatable lifts, how many days you hit your protein, and your waist. If strength holds while the weight drops, the plan is working.",
    ],
    source: SOURCES.binmahfoz,
    next: { href: FAT_LOSS_HUB_HREF, label: "How to lose fat without losing muscle" },
  },
];

const FAQS = [
  {
    q: "Will Kris tell me what dose to take?",
    a: "No. Dosing, side effects, and whether to start or stop belong with your prescriber. Coaching covers lifting, protein and your weekly routine.",
  },
  {
    q: "I have never lifted. Can I still start?",
    a: "Yes. The plan starts with a few basic movements at a weight you can control, two or three times a week, and builds from there as your energy allows.",
  },
  {
    q: "Is this only for men?",
    a: "No. Kris coaches men and women. Most people in the tirzepatide body-scan study above were women, and the lifting and protein advice applies to both.",
  },
];

const LINKS = [
  {
    href: FAT_LOSS_HUB_HREF,
    label: "How to lose fat without losing muscle",
    description: "Six questions, one study each, for anyone in a calorie deficit.",
  },
  {
    href: RECOMP_CALCULATOR_HREF,
    label: "Body recomposition calculator",
    description: "Your protein target and calorie starting point in under a minute.",
  },
  {
    href: "/science/glp-1-muscle-preservation-studies",
    label: "GLP-1 and muscle studies",
    description: "Every GLP-1 study on this site, with the honest limits of each.",
  },
  {
    href: "/skinny-fat",
    label: "Skinny fat: the full guide",
    description: "If the weight is off but you still look soft, this is the next step.",
  },
];

export const metadata: Metadata = {
  title: "Keep Your Muscle on a GLP-1: Lifting and Protein Coaching",
  description:
    "About 25% of the weight lost on GLP-1s is lean mass. Lifting and protein decide the rest. Coaching that works alongside your prescriber, never on the medication.",
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${SLUG}`,
    title: "Keep Your Muscle While You're on a GLP-1",
    description:
      "About 25% of the weight lost on GLP-1s is lean mass. Lifting and protein decide the rest.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Lifting and protein coaching for people on a GLP-1, by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keep Your Muscle While You're on a GLP-1",
    description: "Lifting and protein coaching that works alongside your prescriber.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${SLUG}#page`,
      url: `${SITE_URL}${SLUG}`,
      name: "Keep Your Muscle While You're on a GLP-1",
      dateModified: UPDATED,
      about: [
        { "@type": "Thing", name: "GLP-1 receptor agonists" },
        { "@type": "Thing", name: "Muscle preservation during weight loss" },
      ],
      author: { "@type": "Person", "@id": `${SITE_URL}/#kris-oddo`, name: "Kris Oddo", url: `${SITE_URL}/about` },
      citation: FACTS.map((fact) => fact.source.href),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}${SLUG}#faq`,
      mainEntity: [
        ...FACTS.map((fact) => ({ q: fact.q, a: fact.answer })),
        ...FAQS,
      ].map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "GLP-1 users", item: `${SITE_URL}${SLUG}` },
      ],
    },
  ],
};

export default function Glp1UsersPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="glp1-users-schema" data={pageSchema} />
      <article
        className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28"
        data-analytics-source="glp1_users_page"
      >
        <header>
          <p className="eyebrow text-cloudText">For people on a GLP-1</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            Keep your muscle while you&apos;re on a{" "}
            <span className="whitespace-nowrap">GLP-1</span>
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            About a quarter of the weight lost on GLP-1 medications is lean
            mass. Lifting two to four times a week and eating enough protein is
            how you make the rest of it fat. Your prescriber handles the
            medication; Kris coaches the lifting and the food.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href={APPLY_HREF}
              className="btn btn-primary"
              data-cta="glp1_users_apply"
              data-cta-position="hero"
            >
              Get a plan built for you
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={RECOMP_CALCULATOR_HREF}
              className="btn btn-secondary"
              data-cta="glp1_users_calculator"
              data-cta-position="hero"
            >
              Get your protein target
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProofStrip className="mt-6" />
          <p className="mt-5 text-[13px] text-mute2">
            By Kris Oddo, NASM-CPT · Updated{" "}
            <time dateTime={UPDATED}>
              {new Date(`${UPDATED}T12:00:00Z`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
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

        <SendKrisStep
          className="mt-14"
          ctaId="glp1_users_send_kris"
          position="bottom"
          eyebrow="On a GLP-1 now?"
          title="Send Kris your training and your week."
          body="Tell him what you lift now, how your appetite is, and how many days you can train. He builds the plan around that and adjusts it every week."
          label="Send it to Kris"
          href={APPLY_HREF}
        />

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="glp1-faq-heading" data-no-fold="true">
          <h2
            id="glp1-faq-heading"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            A few more questions
          </h2>
          {FAQS.map((faq) => (
            <div key={faq.q} className="mt-6">
              <h3 className="text-[17px] font-semibold leading-[1.3] text-bone">{faq.q}</h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-mute max-w-[64ch]">{faq.a}</p>
            </div>
          ))}
        </section>

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="glp1-more-heading" data-no-fold="true">
          <h2
            id="glp1-more-heading"
            className="display text-bone text-[24px] md:text-[30px] leading-[1.1]"
          >
            Keep reading
          </h2>
          <div className="mt-4 divide-y divide-line2 border-y border-line2">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group grid min-h-20 gap-1 py-4 no-underline">
                <span className="text-[15.5px] font-semibold text-bone group-hover:text-cloudText">
                  {link.label}
                </span>
                <span className="text-[13.5px] leading-[1.55] text-mute">{link.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

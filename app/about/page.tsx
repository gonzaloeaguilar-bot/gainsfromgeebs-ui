import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://gainsfromgeebs.com";
const faqs = [
  { q: "Who runs Geebs Coaching?", a: "Kris Oddo runs Geebs Coaching himself. He builds each program, reads each weekly check-in, handles daily accountability, and makes every adjustment. There is no team, assistant, or handoff, because the coaching is built around one coach knowing the client and the shape of their actual week." },
  { q: "What is Kris Oddo's coaching background?", a: "Kris Oddo is a NASM Certified Personal Trainer who turned years of his own training into a 1:1 coaching practice. He began by helping friends with training and food, then earned his NASM-CPT and made coaching the work. His approach centers on resistance training, protein, nutrition, and consistent follow-through." },
  { q: "Who does Kris coach?", a: "Kris coaches men and women who want a plan built around real life. Many are business owners or people carrying demanding responsibilities who have already tried apps or generic plans. The common need is direct guidance, honest accountability, and adjustments from a coach who knows the client instead of a copy-paste program." },
];
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export const metadata: Metadata = {
  title: "About Kris Oddo — Online Fitness Coach (NASM-CPT) | Geebs Coaching",
  description:
    "Who Kris Oddo is, how Geebs Coaching started, his own transformation, and why he coaches 1:1 — no team, no copy-paste.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: "About Kris Oddo — Online Fitness Coach",
    description:
      "How Geebs Coaching started, Kris's own transformation, and why he coaches 1:1 with no team handoffs.",
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "About Kris Oddo and Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kris Oddo — Online Fitness Coach",
    description:
      "How Geebs Coaching started and why Kris coaches 1:1 with no team handoffs.",
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

// Person schema — the entity-authority surface for "who is Kris Oddo".
//
// @id is load-bearing, not decoration. The shared site-wide schema already emits a
// Person for Kris carrying @id "<site>/#kris-oddo"; this page-local node had none,
// so a parser read TWO Kris Oddos with two different sameAs sets. Measured
// 2026-09-23: on the identity query an engine spent 4-5 of 20 citation slots on
// the wrong person. Two nodes sharing one @id merge into a single entity, which is
// why this is an addition rather than a deletion — the richer properties below
// stay, they just attach to the canonical node.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#kris-oddo`,
  name: "Kris Oddo",
  jobTitle: "Online Fitness Coach",
  description:
    "Kris Oddo is a NASM-certified online fitness coach and the founder of Geebs Coaching, a 1:1 coaching practice for men and women.",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/media/kris/kris-oddo-gym-headshot.jpg`,
  // Same profile list as the site-wide node, so the merged entity does not carry
  // two competing sameAs sets for the same social accounts.
  sameAs: [
    `${SITE_URL}/about`,
    "https://instagram.com/gainsfromgeebs",
    "https://tiktok.com/@gainsfromgeebs",
    "https://youtube.com/@gainsfromgeebs",
    "https://www.linkedin.com/in/kristopher-oddo/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Geebs Coaching",
    url: SITE_URL,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "NASM Certified Personal Trainer (NASM-CPT)",
  },
  knowsAbout: [
    "Body recomposition",
    "Strength training",
    "Nutrition coaching",
    "Fat loss",
    "Online fitness coaching",
  ],
};

const SECTIONS: { h2: string; paras: string[] }[] = [
  {
    h2: "How it started",
    paras: [
      "Kris has been in the weight room more than half his life. It started at twelve, when his dad bought him a weight set. His dad was his hero and his first picture of what strength looked like. Kris wanted to get stronger for sports, but there was a deeper pull too: he wanted to become more like the man he looked up to most.",
      "After his dad passed away, that influence stayed at the center of why fitness matters to him. Training was never just about looking better. It was a way to build discipline, confidence, and a standard he could carry forward.",
      "Through school and into college it was mostly sports and instinct. He had decent genetics — abs and forearm veins he never had to work for — but he was a lean 130 pounds and wanted real size. There was no influencer playbook to copy yet; he learned by paying attention and putting in years.",
    ],
  },
  {
    h2: "The lock-in",
    paras: [
      "The real turning point was 2020. Gyms closed, and Kris and a cousin started training in a garage every single day. The cousin drilled his form, the consistency stopped being optional, and for the first time Kris paired the training with actual attention to nutrition. That was the stretch where it clicked — and it still took a few years of steady work before he had a physique that genuinely stood out.",
      "It wasn't a straight line. There were stretches in college — freshman and sophomore year — where the gym got skipped, the drinking won, and the eating fell apart. He always came back. That matters, because it's the same thing he now tells clients: falling off isn't the disqualifier. The restart is the skill.",
    ],
  },
  {
    h2: "Kris's own transformation",
    paras: [
      "Kris did not start as the finished-product version people see now. He started lean, under-muscled, and trying to figure out how to turn effort into actual size.",
      "The difference came from the same boring levers he coaches now: consistent resistance training, better food decisions, enough protein, progressive overload, and staying with the process long enough for it to show.",
      "That is why his coaching is practical. He knows what it is like to want the change before you fully know how to build it, and he knows how much the plan has to survive normal life if the result is going to last.",
    ],
  },
  {
    h2: "From training himself to coaching others",
    paras: [
      "Kris didn't set out to be a coach. Friends started asking him for help — how to train, what to eat — and he gave it. The difference was that it worked for them. Watching other people get real results off his guidance was the moment it shifted from a hobby to a direction: he actually knew what he was doing, and he could hand it to someone else.",
      "He earned his NASM-CPT and started coaching for real. An early stretch as a sponsored brand athlete didn't pay the bills, so coaching — the part that was already working — became the whole thing. Geebs Coaching grew out of that: not a business plan, a track record.",
    ],
  },
  {
    h2: "Why 1:1 only",
    paras: [
      "Kris coaches men and women — many of them business owners and people carrying real responsibility. The common thread is not gender. It is a demanding week, previous attempts with apps or influencer plans, and the need for a program built around real life with a coach who knows them.",
      "That's why Geebs is 1:1 only — no team, no assistants, no copy-paste plans. Every program, every daily accountability message, every weekly check-in call, every adjustment comes directly from Kris. He keeps the roster small on purpose, because the coaching only works if the coach actually knows the client.",
      "The coaching style is direct. If something in your training or your week isn't working, Kris will tell you plainly — not to be harsh, but because you can't fix what nobody names. Messaging access has no cap; he would rather you ask a question than guess. The goal isn't to keep you dependent. It's to coach you until you can run it yourself.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="about-person-schema" data={personSchema} />
      <JsonLd id="about-faq-schema" data={faqSchema} />

      <article className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 md:pt-24 pb-20 md:pb-28">
        <header>
          <p className="eyebrow text-cloudText">About</p>
          <h1 className="display mt-4 text-bone text-[32px] sm:text-[40px] md:text-[52px] leading-[1.05]">
            About Kris Oddo
          </h1>

          <figure className="mt-8 flex items-center gap-5">
            <span className="photo-slot photo-slot--round relative w-[110px] h-[110px] md:w-[132px] md:h-[132px] shrink-0 border border-line2 overflow-hidden rounded-full">
              <Image
                src="/media/kris/kris-oddo-gym-headshot.jpg"
                alt="Kris Oddo, NASM-CPT — founder of Geebs Coaching"
                fill
                sizes="(max-width: 768px) 110px, 132px"
                className="object-cover object-[50%_32%]"
              />
            </span>
            <figcaption className="text-[14px] md:text-[15px] text-mute leading-[1.6]">
              Kris Oddo, NASM-CPT
              <span className="block text-mute2">
                Founder and head coach, Geebs Coaching
              </span>
            </figcaption>
          </figure>

          <p className="mt-8 text-[16.5px] md:text-[18px] leading-[1.6] text-bone/85 max-w-[60ch]">
            Geebs Coaching is a 1:1 online coaching practice for men and women, run
            entirely by Kris Oddo. No team, no assistants, no copy-paste plans.
            Here&apos;s the honest version of how that came to be.
          </p>
        </header>

        <div className="hair my-10 md:my-14" />

        {SECTIONS.map((section, si) => (
          <section key={section.h2} className="prose-section">
            {si > 0 && <div className="hair my-10" />}
            <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
              {section.h2}
            </h2>
            {si === 0 ? (
              <figure className="mt-6 max-w-[520px] overflow-hidden rounded-lg border border-line2 bg-black/20">
                <Image
                  src="/about/kris-with-dad.jpg"
                  alt="Kris Oddo with his dad outdoors"
                  width={900}
                  height={1600}
                  sizes="(max-width: 768px) calc(100vw - 48px), 520px"
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-line2 px-4 py-3 text-[13px] leading-[1.55] text-mute2">
                  Kris with his dad, his hero and the reason fitness became
                  personal before it became a profession.
                </figcaption>
              </figure>
            ) : null}
            {section.h2 === "Kris's own transformation" ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-lg border border-line2 bg-black/20">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/about/kris-before.jpg"
                      alt="Kris Oddo before building significant muscle"
                      fill
                      sizes="(max-width: 640px) calc(100vw - 48px), 370px"
                      className="object-cover object-[50%_36%]"
                    />
                  </div>
                  <figcaption className="border-t border-line2 px-4 py-3 text-[13px] leading-[1.55] text-mute2">
                    Before: lean, under-muscled, and still learning the process.
                  </figcaption>
                </figure>

                <figure className="overflow-hidden rounded-lg border border-line2 bg-black/20">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/about/kris-after-shredded.jpg"
                      alt="Kris Oddo after years of structured strength training and nutrition"
                      fill
                      sizes="(max-width: 640px) calc(100vw - 48px), 370px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-line2 px-4 py-3 text-[13px] leading-[1.55] text-mute2">
                    After: years of training, nutrition, and consistency stacked.
                  </figcaption>
                </figure>
              </div>
            ) : null}
            {section.paras.map((p, pi) => (
              <p
                key={pi}
                className={
                  pi === 0
                    ? "mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[64ch]"
                    : "mt-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-mute max-w-[64ch]"
                }
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="hair my-10 md:my-14" />

        <SpotifyPlaylist />

        <div className="hair my-10 md:my-14" />

        <section aria-labelledby="about-faq-heading">
          <h2 id="about-faq-heading" className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">Questions about Kris and Geebs Coaching</h2>
          <div className="mt-6 divide-y divide-line2 border-y border-line2">{faqs.map((faq) => <div key={faq.q} className="py-5"><h3 className="text-[17px] font-semibold text-bone">{faq.q}</h3><p className="mt-3 text-[15.5px] leading-[1.7] text-mute">{faq.a}</p></div>)}</div>
        </section>

        <div className="hair my-10 md:my-14" />

        {/* CTA */}
        <section>
          <h2 className="display text-bone text-[24px] md:text-[30px] leading-[1.1]">
            Work with Kris
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.7] text-bone/85 max-w-[60ch]">
            1:1 coaching is application-based, and the roster is kept small on
            purpose. If you want a closer look first, read{" "}
            <Link href="/methodology" className="underline hover:text-bone">
              the methodology
            </Link>
            ,{" "}
            <Link href="/faq" className="underline hover:text-bone">
              the FAQ
            </Link>
            , or browse the{" "}
            <Link href="/blog" className="underline hover:text-bone">
              free training and nutrition guides
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/apply" className="btn btn-primary" data-cta="about_primary">
              Get coached by Kris
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/packages"
              className="btn btn-secondary"
            >
              See coaching packages
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>Geebs Coaching — Kris Oddo, NASM-CPT. Last updated 2026-05-22.</p>
        </footer>
      </article>
      {/* Shared foot of every page: the same rail the article shells carry. */}
      <MoneyPageKit items={offerRailItems("article")} />
    </main>
  );
}

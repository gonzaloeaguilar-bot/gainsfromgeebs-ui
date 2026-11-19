import Link from "next/link";
import MoneyPageKit from "@/components/MoneyPageKit";
import { offerRailItems } from "@/lib/offerRail";
import type { Metadata } from "next";
import ToolRetentionCTA from "@/components/ToolRetentionCTA";
import JsonLd from "@/components/JsonLd";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import { getAllBlogPosts } from "@/lib/blog";
import { muscles, organs } from "@/data/muscleMap";
import MuscleMap from "./MuscleMap";
import type { PostLookup } from "./MuscleMap";

const SITE_URL = "https://gainsfromgeebs.com";
const PATH = "/tools/muscle-map";
const TITLE = "Muscle Map: What Kris Recommends for Every Muscle | Geebs Coaching";
const DESCRIPTION =
  "Tap any muscle on an interactive 3D body to see the exercises Kris Oddo, NASM-CPT, programs for it, with sets and reps, and the guides to read next. Free, no signup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    title: "Muscle Map: What Kris Recommends for Every Muscle",
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
    images: [
      {
        url: "/social-preview-coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive muscle map by Geebs Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muscle Map: What Kris Recommends for Every Muscle",
    description: DESCRIPTION,
    images: ["/social-preview-coaching.jpg"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: PATH,
  title: "Muscle map",
});

/** Short, reader-facing title: the SEO suffix after "|" is for search results. */
function readableTitle(title: string) {
  return title.split(" | ")[0].trim();
}

function buildLookup(): PostLookup {
  const wanted = new Set<string>();
  for (const part of [...muscles, ...organs]) {
    wanted.add(part.cue.source);
    part.articles.forEach((s) => wanted.add(s));
    part.exercises.forEach((e) => wanted.add(e.source));
  }
  const lookup: PostLookup = {};
  for (const post of getAllBlogPosts()) {
    if (!wanted.has(post.slug)) continue;
    lookup[post.slug] = {
      title: readableTitle(post.shortTitle ?? post.title),
      href: `/blog/${post.slug}`,
    };
  }
  return lookup;
}

export default function MuscleMapPage() {
  const posts = buildLookup();
  return (
    <main className="bg-grain relative min-h-screen">
      <JsonLd id="muscle-map-breadcrumb-schema" data={breadcrumbSchema} />
      <section className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-10 pt-10 md:pt-20 pb-20 md:pb-28">
        <header className="max-w-[640px]">
          <p className="eyebrow text-cloudText">Free tool</p>
          <h1 className="display mt-4 text-bone text-[30px] sm:text-[38px] md:text-[48px] leading-[1.05]">
            Muscle map
          </h1>
          <p className="mt-3 text-bone text-[19px] md:text-[22px] leading-[1.3]">
            Tap a muscle. See what Kris would have you do.
          </p>
          <p className="mt-3 text-[15.5px] md:text-[17px] leading-[1.6] text-mute max-w-[56ch]">
            Every exercise here comes from a plan Kris has published, with the
            sets and reps he gives it. Switch to Inside for sleep, cardio,
            hunger and belly fat. To turn the whole body around and zoom into
            each muscle, open the{" "}
            <Link href="/tools/body-3d" className="underline hover:text-bone">
              3D body explorer
            </Link>
            .
          </p>
        </header>

        <div className="mt-8 md:mt-12">
          <MuscleMap posts={posts} />
        </div>

        <ToolRetentionCTA tool="muscle-map" />

        <footer className="mt-14 text-[13px] text-mute2 leading-[1.6]">
          <p>
            Written by Kris Oddo, NASM-CPT. Last updated 2026-09-27. Anatomy
            rendered from BodyParts3D, &copy; The Database Center for Life
            Science (CC BY-SA 2.1 JP), and Z-Anatomy by Gauthier Kervyn (CC
            BY-SA 4.0).
          </p>
        </footer>
      </section>
      <MoneyPageKit items={offerRailItems("article")} exit />
    </main>
  );
}

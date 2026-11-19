"use client";

import Image from "next/image";
import { Rail, type RailItem } from "@/vendor/rail-kit";
import { trackClientEvent } from "@/lib/clientAnalytics";
import { RAIL_LABELS } from "@/lib/railConfig";

export type BlogLanePost = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  /** Present only where public/blog/<slug>/hero.jpg exists. */
  hero?: string;
};

export type BlogLane = { category: string; posts: BlogLanePost[] };

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Format a post date WITHOUT a timezone-sensitive Date method.
 *
 * `new Date(d).toLocaleDateString(...)` was rendering the day-before for readers
 * west of UTC: post.date is a date-only value (and YAML frontmatter can hand it
 * over as a Date object, not the declared string), so it parses as UTC midnight
 * and then formats in the runtime's local zone. During prerender Vercel runs in
 * UTC while the browser hydrates in the reader's zone, so the day disagreed and
 * React threw #418 on /blog. Reading the Y-M-D straight off the ISO prefix and
 * building the label by hand is identical on the server and every client, and
 * shows the authored date. Accepts a string ("2026-08-09" or full ISO) or a
 * Date, because frontmatter parsing decides which we get.
 */
export function formatLaneDate(d: string | Date): string {
  const iso = typeof d === "string" ? d : new Date(d).toISOString();
  const [y, m, day] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !day) return typeof d === "string" ? d : "";
  return `${MONTHS[m - 1]} ${day}, ${y}`;
}

/**
 * The posts that have a photograph, as posters.
 *
 * Kept as its own lane rather than folded into the topic lanes on purpose. Only
 * 13 of the 70 posts carry a hero, so mixing them into the topic lanes would put
 * photographs beside blank boxes, and a shared card with an empty slot reads as
 * half finished. A lane where EVERY card has art breaks no such rule.
 *
 * It is not a ranking and does not claim to be. These are simply the posts that
 * have been given art, which so far has tracked the ones people actually land on.
 */
function FeaturedLane({ posts }: { posts: BlogLanePost[] }) {
  if (posts.length < 3) return null;

  const items: RailItem[] = posts.map((post) => ({
    kind: "media",
    id: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    titleOverlay: true,
    image: { src: post.hero as string, alt: post.title },
    media: (
      <Image
        className="rail-card__image"
        src={post.hero as string}
        alt={post.title}
        width={600}
        height={450}
        sizes="(max-width: 700px) 86vw, 340px"
      />
    ),
    description: post.description,
    cta: "Read it",
  }));

  return (
    <Rail
      className="not-prose"
      items={items}
      source="blog_lane_featured"
      heading="Start here."
      subheading="The guides people land on most, and the ones with the most in them."
      labels={RAIL_LABELS}
      cta="link"
      titleAs="h3"
      descriptionLines={3}
      onSelect={({ id, index }) =>
        trackClientEvent("blog_lane_select", {
          lane: "featured",
          post_slug: id,
          card_index: index + 1,
        })
      }
    />
  );
}

/**
 * The blog library as themed lanes instead of one vertical column.
 *
 * /blog was 126,271px on a phone: one hundred and fifty screens of stacked
 * links with no picture and no lane in any of it. Nobody scrolls a hundred and
 * fifty screens, so in practice everything past the first few was unreachable
 * even though it was all technically on the page.
 *
 * Every post is still rendered and still a plain crawlable link. The change is
 * that they now sit in five horizontal lanes by topic, so the whole library is
 * reachable with a swipe instead of a scroll.
 *
 * TEXT cards, not posters, and deliberately: only 13 of the 70 posts have a
 * hero image, and a lane that mixes photographs with blank boxes reads as half
 * finished. One card language per lane. When the remaining heroes exist these
 * become media cards with no other change.
 */
export default function BlogLanes({ lanes }: { lanes: BlogLane[] }) {
  if (!lanes.length) return null;

  const featured = lanes.flatMap((lane) => lane.posts).filter((post) => post.hero);

  return (
    <div className="mt-8 space-y-4">
      <FeaturedLane posts={featured} />
      {lanes.map((lane) => {
        const items: RailItem[] = lane.posts.map((post) => ({
          kind: "text",
          id: post.slug,
          href: `/blog/${post.slug}`,
          title: post.title,
          description: post.description,
          subtitle: formatLaneDate(post.date),
          // Not a ranked sequence, so a number over these would be noise.
          glyph: null,
          cta: "Read it",
        }));

        return (
          <Rail
            key={lane.category}
            className="not-prose"
            items={items}
            source={`blog_lane_${lane.category.toLowerCase().replace(/\s+/g, "_")}`}
            heading={lane.category}
            labels={RAIL_LABELS}
            cta="link"
            titleAs="h3"
            descriptionLines={3}
            headerAction={{ label: "All articles", href: "#all-articles-heading" }}
            onSelect={({ id, index }) =>
              trackClientEvent("blog_lane_select", {
                lane: lane.category,
                post_slug: id,
                card_index: index + 1,
              })
            }
          />
        );
      })}
    </div>
  );
}

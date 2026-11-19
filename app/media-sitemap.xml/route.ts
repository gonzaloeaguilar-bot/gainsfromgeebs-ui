const SITE_URL = "https://gainsfromgeebs.com";

type ImageEntry = {
  loc: string;
  title: string;
  caption: string;
};

type VideoEntry = {
  thumbnailLoc: string;
  title: string;
  description: string;
  contentLoc: string;
  publicationDate: string;
  tags: string[];
};

type MediaPage = {
  path: string;
  images?: ImageEntry[];
  videos?: VideoEntry[];
};

const mediaPages: MediaPage[] = [
  {
    path: "",
    images: [
      {
        loc: "/kris-hero.jpg",
        title: "Kris Oddo, Geebs Coaching founder",
        caption:
          "Kris Oddo, online fitness coach and founder of Geebs Coaching.",
      },
      {
        loc: "/coaching/kris-client-coaching-close.jpg",
        title: "Kris Oddo coaching a client through machine work",
        caption:
          "Kris Oddo watching client form and cueing a training set in real time.",
      },
      {
        loc: "/coaching/kris-client-form-cues.jpg",
        title: "Kris Oddo giving client form cues",
        caption:
          "Kris Oddo giving close form guidance during a gym coaching session.",
      },
      {
        loc: "/coaching/kris-client-training-session.jpg",
        title: "Kris Oddo with a coaching client",
        caption:
          "Kris Oddo smiling with a client in a real coaching environment.",
      },
    ],
  },
  {
    path: "/about",
    images: [
      {
        loc: "/media/kris/kris-oddo-gym-headshot.jpg",
        title: "Kris Oddo NASM-CPT gym headshot",
        caption:
          "Kris Oddo, NASM-CPT and founder of Geebs Coaching, in a gym setting.",
      },
      {
        loc: "/about/kris-with-dad.jpg",
        title: "Kris Oddo with his dad",
        caption:
          "Kris Oddo with his dad, the personal reason fitness became important to him.",
      },
      {
        loc: "/about/kris-before.jpg",
        title: "Kris Oddo before building significant muscle",
        caption:
          "Kris Oddo before years of structured training, nutrition, and consistency.",
      },
      {
        loc: "/about/kris-after-shredded.jpg",
        title: "Kris Oddo after years of strength training",
        caption:
          "Kris Oddo after years of resistance training, nutrition, and consistency.",
      },
    ],
  },
  {
    path: "/methodology",
    images: [
      {
        loc: "/media/kris/kris-oddo-back-training-physique.jpg",
        title: "Kris Oddo back training physique",
        caption:
          "Kris Oddo's own training context behind the Geebs Coaching methodology.",
      },
    ],
  },
  {
    path: "/for/online-fitness-coach-for-men",
    images: [
      {
        loc: "/media/kris/kris-oddo-gym-headshot.jpg",
        title: "Kris Oddo online fitness coach for men",
        caption:
          "Kris Oddo in a gym setting for remote online fitness coaching.",
      },
    ],
  },
  {
    path: "/blog/how-to-build-muscle-for-skinny-guys",
    images: [
      {
        loc: "/media/kris/kris-oddo-training-physique-side.jpg",
        title: "Kris Oddo training physique side view",
        caption:
          "Kris Oddo's own muscle-building result from years of eating enough, training hard, and progressing the work.",
      },
    ],
  },
  {
    path: "/blog/how-long-to-see-results-working-out",
    images: [
      {
        loc: "/blog/how-long-to-see-results-working-out/hero.jpg",
        title: "Workout results timeline guide hero image",
        caption:
          "Hero image for Geebs Coaching's guide to how long workout results take.",
      },
    ],
  },
  {
    path: "/results",
    images: [
      {
        loc: "/results/anonymous-transformation-before-front.jpg",
        title: "Anonymous Geebs client before body recomposition transformation front view",
        caption:
          "Anonymous Geebs Coaching client before body recomposition transformation, front view.",
      },
      {
        loc: "/results/anonymous-transformation-before-side.jpg",
        title: "Anonymous Geebs client before body recomposition transformation side view",
        caption:
          "Anonymous Geebs Coaching client before body recomposition transformation, side view.",
      },
      {
        loc: "/results/anonymous-transformation-after-front.jpg",
        title: "Anonymous Geebs client after body recomposition transformation front view",
        caption:
          "Anonymous Geebs Coaching client after body recomposition transformation, front view.",
      },
      {
        loc: "/results/anonymous-transformation-after-mirror.jpg",
        title: "Anonymous Geebs client after body recomposition transformation mirror view",
        caption:
          "Anonymous Geebs Coaching client after body recomposition transformation, mirror view.",
      },
      {
        loc: "/results/anthony-online-accountability.jpg",
        title: "Anthony Geebs Coaching accountability and nutrition text",
        caption:
          "Client accountability text showing nutrition tracking, workout updates, and day-to-day coaching support.",
      },
      {
        loc: "/results/jordan-miller-training-reaction.jpg",
        title: "Jordan Miller Geebs Coaching workout reaction text",
        caption:
          "Client text reaction after Kris Oddo pushed workout intensity and the session landed well.",
      },
      {
        loc: "/results/janica-winn-gymrat-prayer.jpg",
        title: "Janica Winn Geebs Coaching client culture message",
        caption:
          "Client-side training culture message from the Geebs Coaching proof library, used as relationship and accountability context rather than a transformation claim.",
      },
    ],
  },
  {
    path: "/geebs-method",
    images: [
      {
        loc: "/media/kris/kris-oddo-training-physique-side.jpg",
        title: "Kris Oddo training standard behind the Geebs Method",
        caption:
          "The Geebs Method is built from Kris Oddo's own training standard and adapted client by client.",
      },
    ],
    videos: [
      {
        thumbnailLoc:
          "/media/kris/videos/kris-oddo-lat-pulldown-broll.jpg",
        title: "Kris Oddo machine pull-down training",
        description:
          "Kris Oddo performing machine pull-down work in a gym training session.",
        contentLoc:
          "/media/kris/videos/kris-oddo-lat-pulldown-broll.mp4",
        publicationDate: "2026-06-01",
        tags: ["Kris Oddo", "Geebs Method", "lat pulldown", "gym training"],
      },
      {
        thumbnailLoc:
          "/media/kris/videos/kris-oddo-seated-row-broll.jpg",
        title: "Kris Oddo seated cable training",
        description:
          "Kris Oddo performing seated cable training in a gym setting.",
        contentLoc: "/media/kris/videos/kris-oddo-seated-row-broll.mp4",
        publicationDate: "2026-06-01",
        tags: ["Kris Oddo", "Geebs Coaching", "seated row", "back training"],
      },
      {
        thumbnailLoc:
          "/media/kris/videos/kris-oddo-dumbbell-training-broll.jpg",
        title: "Kris Oddo dumbbell accessory training",
        description:
          "Kris Oddo performing dumbbell accessory work during a gym training session.",
        contentLoc:
          "/media/kris/videos/kris-oddo-dumbbell-training-broll.mp4",
        publicationDate: "2026-06-01",
        tags: ["Kris Oddo", "online fitness coach", "dumbbell training"],
      },
    ],
  },
];

function absoluteUrl(path: string) {
  if (path === "") return SITE_URL;
  return `${SITE_URL}${path}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageXml(image: ImageEntry) {
  return [
    "    <image:image>",
    `      <image:loc>${escapeXml(absoluteUrl(image.loc))}</image:loc>`,
    `      <image:title>${escapeXml(image.title)}</image:title>`,
    `      <image:caption>${escapeXml(image.caption)}</image:caption>`,
    "    </image:image>",
  ].join("\n");
}

function videoXml(video: VideoEntry) {
  return [
    "    <video:video>",
    `      <video:thumbnail_loc>${escapeXml(
      absoluteUrl(video.thumbnailLoc),
    )}</video:thumbnail_loc>`,
    `      <video:title>${escapeXml(video.title)}</video:title>`,
    `      <video:description>${escapeXml(
      video.description,
    )}</video:description>`,
    `      <video:content_loc>${escapeXml(
      absoluteUrl(video.contentLoc),
    )}</video:content_loc>`,
    `      <video:publication_date>${escapeXml(
      video.publicationDate,
    )}</video:publication_date>`,
    "      <video:family_friendly>yes</video:family_friendly>",
    ...video.tags.map((tag) => `      <video:tag>${escapeXml(tag)}</video:tag>`),
    "    </video:video>",
  ].join("\n");
}

export function buildMediaSitemap() {
  const urls = mediaPages.map((page) => {
    const media = [
      ...(page.images ?? []).map(imageXml),
      ...(page.videos ?? []).map(videoXml),
    ].join("\n");

    return [
      "  <url>",
      `    <loc>${escapeXml(absoluteUrl(page.path))}</loc>`,
      media,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

export function GET() {
  return new Response(buildMediaSitemap(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

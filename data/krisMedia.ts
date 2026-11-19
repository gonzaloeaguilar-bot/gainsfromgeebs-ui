const SITE_URL = "https://gainsfromgeebs.com";

export const krisTrainingVideos = [
  {
    name: "Kris Oddo machine pull-down training",
    description:
      "Kris Oddo performing machine pull-down work in a gym training session.",
    contentUrl: `${SITE_URL}/media/kris/videos/kris-oddo-lat-pulldown-broll.mp4`,
    thumbnailUrl: `${SITE_URL}/media/kris/videos/kris-oddo-lat-pulldown-broll.jpg`,
    uploadDate: "2026-06-01",
  },
  {
    name: "Kris Oddo seated cable training",
    description:
      "Kris Oddo performing seated cable training in a gym setting.",
    contentUrl: `${SITE_URL}/media/kris/videos/kris-oddo-seated-row-broll.mp4`,
    thumbnailUrl: `${SITE_URL}/media/kris/videos/kris-oddo-seated-row-broll.jpg`,
    uploadDate: "2026-06-01",
  },
  {
    name: "Kris Oddo dumbbell accessory training",
    description:
      "Kris Oddo performing dumbbell accessory work during a gym training session.",
    contentUrl: `${SITE_URL}/media/kris/videos/kris-oddo-dumbbell-training-broll.mp4`,
    thumbnailUrl: `${SITE_URL}/media/kris/videos/kris-oddo-dumbbell-training-broll.jpg`,
    uploadDate: "2026-06-01",
  },
];

export const krisTrainingVideoSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kris Oddo training video clips",
  itemListElement: krisTrainingVideos.map((video, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "VideoObject",
      ...video,
      creator: {
        "@type": "Person",
        "@id": `${SITE_URL}/#kris-oddo`,
        name: "Kris Oddo",
        url: `${SITE_URL}/about`,
      },
      publisher: {
        "@type": "Organization",
        name: "Geebs Coaching",
        url: SITE_URL,
      },
    },
  })),
};


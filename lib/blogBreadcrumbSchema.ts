type BlogBreadcrumbSchemaInput = {
  siteUrl: string;
  slug: string;
  title: string;
};

export function buildBlogBreadcrumbSchema({
  siteUrl,
  slug,
  title,
}: BlogBreadcrumbSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}${slug}`,
      },
    ],
  };
}

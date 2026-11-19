import { COACH_JOB_TITLE, ORG_NAME } from "@/lib/entity";

/**
 * Builds an Article schema with author credentials for blog posts.
 * Improves E-E-A-T signals by exposing author expertise (NASM-CPT certification)
 * directly in the structured data, enabling better entity recognition and
 * content quality evaluation by search engines.
 */

type BlogArticleAuthorSchemaInput = {
  siteUrl: string;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  aboutTopics?: { "@type": string; name: string }[];
};

export function buildBlogArticleAuthorSchema({
  siteUrl,
  slug,
  headline,
  description,
  datePublished,
  dateModified,
  aboutTopics = [],
}: BlogArticleAuthorSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      // Same canonical entity as every other Kris node on the site. Without it a
      // parser reads the blog author as a separate person from the coach.
      "@type": "Person",
      "@id": `${siteUrl}/#kris-oddo`,
      name: "Kris Oddo",
      url: `${siteUrl}/about`,
      // E-E-A-T credential signals
      jobTitle: COACH_JOB_TITLE,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Certification",
        name: "NASM-CPT (National Academy of Sports Medicine - Certified Personal Trainer)",
        url: "https://www.nasm.org/",
        recognizedBy: {
          "@type": "Organization",
          name: "National Academy of Sports Medicine",
          url: "https://www.nasm.org/",
        },
      },
      worksFor: { "@id": `${siteUrl}/#organization` },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: ORG_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    image: [
      {
        "@type": "ImageObject",
        url: `${siteUrl}/social-preview-coaching.jpg`
      }
    ],
    datePublished,
    dateModified,
    mainEntityOfPage: `${siteUrl}${slug}`,
    // No articleBody: an empty string is invalid markup, and the body is on the page.
    ...(aboutTopics.length > 0 && { about: aboutTopics }),
  };
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BODY_GROUPS } from "@/data/bodyMap";
import { buildSectionBreadcrumbSchema } from "@/lib/sectionBreadcrumbSchema";
import Body3D from "./Body3D";

const SITE_URL = "https://gainsfromgeebs.com";
const SLUG = "/tools/body-3d";
const TITLE = "Interactive 3D body | Zoom into every muscle | Gains from Geebs";
const DESCRIPTION =
  "Rotate a 3D body, zoom into each muscle group, and get Kris's coaching tip plus the research behind training it. Free, no account.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${SLUG}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Geebs Coaching",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  // WebPage + about, not ItemList: the muscle groups are not separate pages,
  // and a ListItem with no url or item is invalid markup.
  "@type": "WebPage",
  name: "Muscle groups in the interactive 3D body",
  url: `${SITE_URL}${SLUG}`,
  about: BODY_GROUPS.map((g) => ({ "@type": "AnatomicalStructure", name: g.name })),
};

const breadcrumbSchema = buildSectionBreadcrumbSchema({
  siteUrl: SITE_URL,
  path: SLUG,
  title: "Interactive 3D body",
});

export default function Body3DPage() {
  return (
    <main className="bg-grain min-h-screen">
      <JsonLd id="body-3d-schema" data={schema} />
      <JsonLd id="body-3d-breadcrumb-schema" data={breadcrumbSchema} />

      <section className="mx-auto max-w-[760px] px-6 pb-4 pt-10 md:px-10 md:pt-16">
        <p className="eyebrow text-cloudText">Free · no account</p>
        <h1 className="display mt-3 text-[30px] leading-[1.06] tracking-[-0.02em] text-bone md:text-[44px]">
          Interactive 3D body
        </h1>
        <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.5] text-bone/85 md:text-[17px]">
          Turn the body, zoom into the muscle, see what to do.
        </p>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-mute">
          Rotate it with a drag, pinch to zoom, and tap a muscle group for
          Kris&apos;s coaching cue and the research behind training it.
        </p>
      </section>

      <section className="mx-auto max-w-[900px] px-4 pb-16 md:px-6">
        <Body3D />
      </section>

      <p className="mx-auto max-w-[760px] px-6 pb-16 text-[12.5px] leading-[1.6] text-mute2 md:px-10">
        Muscular anatomy derived from BodyParts3D, © DBCLS, licensed CC-BY-SA
        2.1 Japan. 411 muscle meshes merged, oriented, and web-optimized.
      </p>
    </main>
  );
}

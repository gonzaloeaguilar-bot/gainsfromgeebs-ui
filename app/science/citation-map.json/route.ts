import { buildScienceCitationMapManifest } from "@/data/scienceCitationMap";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(buildScienceCitationMapManifest(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

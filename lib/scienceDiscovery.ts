import { revalidatePath } from "next/cache";
import { submitIndexNowUrls, type IndexNowSubmitResult } from "@/lib/indexNow";

export const SCIENCE_DISCOVERY_PATHS = [
  "/science",
  "/science/fresh-research",
  "/science/questions",
  "/science/studies",
  "/science/weekly-science-drop",
  "/science/weekly-digest",
  "/feed.xml",
  "/sitemap.xml",
  "/science/sitemap.xml",
  "/science/feed.xml",
  "/science/feed.json",
  "/science/citation-map.json",
  "/llms.txt",
  "/llms-full.txt",
];

export function revalidateScienceDiscoveryPaths() {
  for (const path of SCIENCE_DISCOVERY_PATHS) {
    revalidatePath(path);
  }
}

export async function submitScienceDiscoveryToIndexNow(): Promise<
  IndexNowSubmitResult | { ok: false; skipped: true; error: string }
> {
  try {
    return await submitIndexNowUrls(SCIENCE_DISCOVERY_PATHS);
  } catch (error) {
    return {
      ok: false,
      skipped: true,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}

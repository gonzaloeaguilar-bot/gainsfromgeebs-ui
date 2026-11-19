const SHOPIFY_PRODUCTS_URL = "https://shop.titanforgefit.com/products.json?limit=250";

/** Long enough for a healthy shop, short enough that a sick one cannot hang a build. */
const SHOPIFY_TIMEOUT_MS = 8000;
const HELD_HANDLES = new Set([
  "bone-heart-support",
  "testosterone-booster",
  "resveratrol-50-600mg",
  "ashwagandha",
  "multivitamin-bear-gummies-adult",
  "sleep-well-gummies-adult",
  "l-glutamine-powder",
  "probiotic-40-billion-with-prebiotics",
  "ultra-cleanse-smoothie-greens",
]);
/**
 * Exported so tests build fixtures from the REAL values. A test that invents a
 * product_type silently yields zero products and then asserts nothing, which is how
 * the happy-path case in tests/titanSupplementsBuildSafety.test.ts first "passed".
 * Typed ReadonlySet so exporting it cannot let a consumer mutate the filter the
 * whole app shares.
 */
export const SUPPLEMENT_TYPES: ReadonlySet<string> = new Set([
  "Proteins & Blends",
  "Amino Acids & Blends",
  "Vitamins & Minerals",
  "Natural Extracts",
  "Specialty Supplements",
]);

type ShopifyProduct = {
  id: number;
  handle: string;
  title: string;
  product_type: string;
  body_html?: string;
  images?: { src?: string }[];
  variants?: { id: number; price: string; available: boolean }[];
};

export type TitanSupplement = {
  id: number;
  handle: string;
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl?: string;
  productUrl: string;
};

function cleanText(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanUrl(value?: string) {
  return value?.replace(/[\u0000-\u001F\u007F-\u009F]/g, "") || undefined;
}

export async function getTitanSupplements(): Promise<TitanSupplement[]> {
  // WHY THIS IS WRAPPED. `if (!response.ok) return []` below guarded the RESPONSE
  // and not the REQUEST. A fetch that never answers does not return a non-ok
  // response, it THROWS — and this runs during prerender, so the throw killed the
  // whole build. Measured 2026-09-24: an unrelated privacy-copy PR failed to deploy
  // with "Error occurred prerendering page /supplements ... code: 'ETIMEDOUT' ...
  // exiting the build". One slow third party took down every page on the site.
  //
  // Shopify being unreachable should degrade THIS page, never block the deploy.
  let payload: { products?: ShopifyProduct[] };
  try {
    const response = await fetch(SHOPIFY_PRODUCTS_URL, {
      next: { revalidate: 1800 },
      // Without this the request can hang until the platform's own limit, which
      // is what turns a slow shop into a failed build rather than a slow build.
      signal: AbortSignal.timeout(SHOPIFY_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(
        `titanSupplements: shop returned ${response.status}; rendering no products`,
      );
      return [];
    }
    payload = (await response.json()) as { products?: ShopifyProduct[] };
  } catch (err) {
    // Loud on purpose. A silently empty catalogue looks identical to a shop with
    // nothing in stock, and that is the reading we must not leave available.
    console.error(
      `titanSupplements: could not reach the shop (${
        err instanceof Error ? err.message : String(err)
      }); rendering no products rather than failing the build`,
    );
    return [];
  }

  return (payload.products ?? [])
    .filter((product) => SUPPLEMENT_TYPES.has(product.product_type))
    .filter((product) => !HELD_HANDLES.has(product.handle))
    .filter((product) => product.variants?.some((variant) => variant.available))
    .map((product) => {
      const prices = (product.variants ?? [])
        .filter((variant) => variant.available)
        .map((variant) => Number(variant.price))
        .filter(Number.isFinite);
      const url = new URL(`https://shop.titanforgefit.com/products/${product.handle}`);
      url.searchParams.set("utm_source", "gainsfromgeebs");
      url.searchParams.set("utm_medium", "supplement_catalog");
      url.searchParams.set("utm_campaign", "titan_supplements");
      url.searchParams.set("utm_content", product.handle);
      return {
        id: product.id,
        handle: product.handle,
        title: cleanText(product.title),
        category: cleanText(product.product_type),
        description: cleanText(product.body_html).slice(0, 170),
        price: Math.min(...prices),
        imageUrl: cleanUrl(product.images?.[0]?.src),
        productUrl: url.href,
      };
    });
}

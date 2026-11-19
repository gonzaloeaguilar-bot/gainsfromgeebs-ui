import Link from "next/link";
import { getTitanSupplements } from "@/lib/titanSupplements";
import type { ProductContext } from "@/lib/productContext";

/**
 * Contextual product block: shows ONLY the products the surrounding page is
 * already about, with live Shopify price and availability. Renders nothing if
 * the catalog is unreachable or every mapped product is out of stock.
 */
export default async function TitanProductInline({
  context,
  source,
  className = "",
}: {
  context: ProductContext | null;
  source: string;
  className?: string;
}) {
  if (!context) return null;

  const catalog = await getTitanSupplements();
  const byHandle = new Map(catalog.map((product) => [product.handle, product]));
  const products = context.handles
    .map((handle) => byHandle.get(handle))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (!products.length) return null;

  return (
    <section
      className={`rounded-2xl border border-line bg-ink3/30 p-6 md:p-8 ${className}`}
      aria-label="Related Titan Forge products"
    >
      <p className="eyebrow text-mute2">From the Titan Forge store</p>
      <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.7] text-bone/82">{context.note}</p>

      <div className={`mt-6 grid gap-4 ${products.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {products.map((product) => (
          <article
            key={product.id}
            className="flex items-center gap-4 rounded-xl border border-line2 bg-ink2/40 p-4"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <h3 className="text-[15.5px] font-medium leading-[1.25] text-bone">{product.title}</h3>
              <p className="mt-1 text-[14px] text-mute2">${product.price.toFixed(2)}</p>
              <a
                href={product.productUrl}
                className="mt-1 inline-flex min-h-[44px] items-center text-[16px] text-bone underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                data-analytics-event="shopify_product_click"
                data-analytics-source={source}
                data-analytics-link-kind="shop"
                data-product-handle={product.handle}
              >
                View product <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 text-[13px] leading-[1.6] text-mute2">
        Supplements are optional and do not replace training, food, protein, sleep, or medical
        guidance. Check the current label and your medication context before buying.{" "}
        <Link href="/supplements" className="text-bone underline underline-offset-4">
          Full catalog
        </Link>
        .
      </p>
    </section>
  );
}

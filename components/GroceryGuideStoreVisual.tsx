import Image from "next/image";

type GroceryGuideStoreVisualProps = {
  retailerName: string;
  tagline: string;
  variant?: "hub" | "guide" | "card";
};

const cropByRetailer: Record<string, string> = {
  "Costco Wholesale": "50% 78%",
  Walmart: "46% 42%",
  "BJ's Wholesale Club": "54% 88%",
  Publix: "44% 27%",
  ALDI: "56% 59%",
  Kroger: "48% 70%",
  Target: "42% 50%",
  "Trader Joe's": "58% 36%",
  "Whole Foods Market": "50% 64%",
  "Sam's Club": "45% 82%",
};

/**
 * A real coach-owned shopping image with an intentionally retailer-specific crop.
 * The store name is copy, not a claim that Kris was at that specific retailer.
 */
export function GroceryGuideStoreVisual({
  retailerName,
  tagline,
  variant = "guide",
}: GroceryGuideStoreVisualProps) {
  const isHub = variant === "hub";
  const isCard = variant === "card";
  // The wide guide treatment must keep Kris's face in frame. Retailer-specific
  // crops are only used for the small card strip, where they add rhythm without
  // implying the photo was taken at that store.
  const objectPosition = isCard ? (cropByRetailer[retailerName] ?? "50% 58%") : "50% 40%";

  return (
    <figure
      className={`relative isolate overflow-hidden bg-[#191919] ${
        isCard
          ? "h-full min-h-0"
          : `rounded-2xl border border-line2 ${isHub ? "min-h-[360px] md:min-h-[430px]" : "min-h-[270px] md:min-h-[330px]"}`
      }`}
    >
      <Image
        src="/images/grocery-guides/kris-shopping-cart-v3.webp"
        alt="Kris sitting behind a shopping cart before a grocery run"
        fill
        priority={isHub}
        sizes={isHub ? "(max-width: 768px) 100vw, 1180px" : "(max-width: 768px) 100vw, 980px"}
        className="object-cover opacity-90"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
      {!isCard && (
        <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="eyebrow text-cloudText">Shop with Kris</p>
          <p className={`display mt-2 text-bone ${isHub ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"}`}>
            {isHub ? "Build a cart you will actually use." : `${retailerName} grocery guide`}
          </p>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-bone/85 md:text-base">
            {isHub
              ? "Pick a store, keep the protein simple, and leave with food that makes your next week easier."
              : tagline}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

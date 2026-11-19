import type { Metadata } from "next";
import MembershipSalesPage from "@/components/MembershipSalesPage";
import { membershipOffers } from "@/lib/membershipOffers";

export const metadata: Metadata = {
  title: "Science-Based Fitness Community | $24.99/Month",
  description: "Join the Titan Forge Science-Based Telegram community for practical fitness discussion and accountability at $24.99 per month.",
  alternates: { canonical: "https://gainsfromgeebs.com/memberships/science-based-community" },
  openGraph: { title: "Science-Based Fitness Community | $24.99/Month", description: "Join the Titan Forge Science-Based Telegram community for $24.99 per month.", url: "https://gainsfromgeebs.com/memberships/science-based-community" },
};

export default function Page() {
  return <MembershipSalesPage offer={membershipOffers["science-based-community"]} />;
}

import type { Metadata } from "next";
import Link from "next/link";

const CONTACT_EMAIL = "kris@titanforgefit.com";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Community Request Sent | Geebs Coaching",
  description:
    "Confirmation for a Geebs Science-Based Community access request.",
  robots: { index: false, follow: false },
};

function getSingleParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function communityEmailHref(applicationId: string): string {
  const body = [
    "I requested the $25/month Science-Based Community.",
    "Please send the recurring payment link. After payment, add me to the Telegram community.",
    applicationId ? `Application ID: ${applicationId}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const params = new URLSearchParams({
    subject: "Science-Based Community Access - $25/month",
    body,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export default async function CommunityInterestPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const applicationId = getSingleParam(params.application_id);

  return (
    <main className="bg-grain min-h-screen">
      <section className="mx-auto max-w-[760px] px-6 md:px-10 pt-16 md:pt-24 pb-20">
        <p className="eyebrow text-cloudText">Community request</p>
        <h1 className="display mt-4 text-bone text-[36px] sm:text-[48px] md:text-[60px] leading-[1.04]">
          Kris got your community request.
        </h1>
        <p className="mt-6 text-[16.5px] md:text-[18px] leading-[1.7] text-bone/85 max-w-[60ch]">
          He will send the recurring payment link. After payment is confirmed,
          you will be added to the Titan Forge Science Community on Telegram.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/apply/lower-cost" className="btn btn-secondary">
            Back to options
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href={communityEmailHref(applicationId)}
            className="btn btn-secondary"
          >
            Email Kris
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}

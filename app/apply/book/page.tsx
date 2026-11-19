import type { Metadata } from "next";
import Link from "next/link";
import {
  buildCalendlyEmbed,
  claimApplicationBookingStart,
  getCompletedApplicationForBooking,
  isValidApplicationId,
} from "../application";
import { verifyApplicationReceipt } from "../applicationReceipt";
import CalendlyInline from "@/components/CalendlyInline";

export const metadata: Metadata = {
  title: "Book Your Strategy Call | Gains from Geebs",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function UnverifiedBooking() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="eyebrow text-cloudText">Booking unavailable</p>
      <h1 className="mt-4 text-bone text-[34px] md:text-[48px] leading-tight">
        We couldn’t verify a completed application.
      </h1>
      <p className="mt-4 text-mute">
        Your calendar link only opens after the application is safely stored.
      </p>
      <div className="mt-8 flex justify-center">
        <Link className="btn btn-primary" href="/apply">
          Return to application
        </Link>
      </div>
    </main>
  );
}

export default async function ApplyBookingRedirectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const applicationId = single(params.application_id);
  const receipt = single(params.receipt);
  if (
    !isValidApplicationId(applicationId) ||
    !verifyApplicationReceipt(applicationId, receipt)
  ) {
    return <UnverifiedBooking />;
  }

  const application = await getCompletedApplicationForBooking(applicationId);
  if (!application) return <UnverifiedBooking />;
  const date = single(params.date);
  const month = single(params.month);
  const bookingStart = application.isTest
    ? { claimed: false }
    : await claimApplicationBookingStart(applicationId);

  const handoffParams = new URLSearchParams({
    application_id: applicationId,
    receipt,
  });
  if (date) handoffParams.set("date", date);
  if (month) handoffParams.set("month", month);

  /* The calendar renders here instead of bouncing the reader to calendly.com.
     BookingRedirectClient is deliberately NOT mounted: it starts an automatic
     redirect 350ms after mount, which would race the embed and always win.
     Its outbound path survives as the fallback link below, so the /apply/book/go
     route and its server-side receipt check are unchanged. */
  const embed =
    date || month
      ? buildCalendlyEmbed(application, {
          date: date || undefined,
          month: month || undefined,
        })
      : buildCalendlyEmbed(application);

  return (
    <CalendlyInline
      calendlyUrl={embed.url}
      prefill={embed.prefill}
      fallbackUrl={`/apply/book/go?${handoffParams.toString()}`}
      applicationId={applicationId}
      receipt={receipt}
      selectedPackage={application.selectedPackage}
      attribution={{
        utmSource: application.utmSource,
        utmMedium: application.utmMedium,
        utmCampaign: application.utmCampaign,
        landingPath: application.landingPath,
      }}
      isTest={application.isTest}
      shouldTrackBookingStarted={bookingStart.claimed}
    />
  );
}

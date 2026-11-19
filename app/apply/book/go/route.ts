import { NextResponse, type NextRequest } from "next/server";
import {
  buildCalendlyBookingUrl,
  getCompletedApplicationForBooking,
  isValidApplicationId,
} from "../../application";
import { verifyApplicationReceipt } from "../../applicationReceipt";

export async function GET(request: NextRequest) {
  const applicationId = request.nextUrl.searchParams.get("application_id") || "";
  const receipt = request.nextUrl.searchParams.get("receipt") || "";
  if (
    !isValidApplicationId(applicationId) ||
    !verifyApplicationReceipt(applicationId, receipt)
  ) {
    return new NextResponse("Verified application required.", { status: 403 });
  }

  const application = await getCompletedApplicationForBooking(applicationId);
  if (!application || application.isTest) {
    return new NextResponse("Verified live application required.", {
      status: 403,
    });
  }

  const date = request.nextUrl.searchParams.get("date") || "";
  const month = request.nextUrl.searchParams.get("month") || "";

  const response = NextResponse.redirect(
    date || month
      ? buildCalendlyBookingUrl(application, {
          date: date || undefined,
          month: month || undefined,
        })
      : buildCalendlyBookingUrl(application),
    303,
  );
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const ONE_TIME_CONSULT_CONTACT_EMAIL = "kris@titanforgefit.com";

const CALENDLY_SCHEDULING_LINKS_URL =
  "https://api.calendly.com/scheduling_links";

type CalendlySchedulingLinkResponse = {
  resource?: {
    booking_url?: unknown;
  };
};

export type CreateOneTimeConsultSchedulingLinkResult =
  | { created: true; bookingHref: string }
  | {
      created: false;
      reason: "missing_env" | "request_failed" | "missing_booking_url";
      status?: number;
    };

export function oneTimeConsultEmailHref(applicationId: string): string {
  const body = [
    "I want the $100 one-time consultation call.",
    "Please send the upfront payment link and booking details.",
    applicationId ? `Application ID: ${applicationId}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const params = new URLSearchParams({
    subject: "One-Time Consultation Call - $100",
    body,
  });

  return `mailto:${ONE_TIME_CONSULT_CONTACT_EMAIL}?${params.toString()}`;
}

export function oneTimeConsultFallbackHref(applicationId: string): string {
  const configuredFallback =
    process.env.CALENDLY_ONE_TIME_CONSULT_FALLBACK_URL?.trim();

  if (!configuredFallback) {
    return oneTimeConsultEmailHref(applicationId);
  }

  try {
    const url = new URL(configuredFallback);

    if (url.protocol === "http:" || url.protocol === "https:") {
      url.searchParams.set("utm_source", "site");
      url.searchParams.set("utm_medium", "apply_lower_cost");
      url.searchParams.set("utm_campaign", "one_time_consult_paid");
      url.searchParams.set("utm_content", "one_time_consult_fallback");
      url.searchParams.set("utm_term", "consultation_call");
      if (applicationId) url.searchParams.set("application_id", applicationId);
      return url.href;
    }

    if (url.protocol === "mailto:") {
      return configuredFallback;
    }
  } catch {
    return oneTimeConsultEmailHref(applicationId);
  }

  return oneTimeConsultEmailHref(applicationId);
}

export function calendlyBookingHref(
  bookingUrl: unknown,
  applicationId: string,
  orderName = "",
): string | null {
  if (typeof bookingUrl !== "string") return null;

  try {
    const url = new URL(bookingUrl);
    const calendlyHost =
      url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com");

    if (!calendlyHost) return null;

    url.searchParams.set("utm_source", "site");
    url.searchParams.set("utm_medium", "apply_lower_cost");
    url.searchParams.set("utm_campaign", "one_time_consult_paid");
    url.searchParams.set("utm_content", "one_time_consult");
    url.searchParams.set("utm_term", "consultation_call");
    url.searchParams.set(
      "a1",
      "One-time paid consultation call - $100 upfront before booking",
    );

    if (applicationId) {
      url.searchParams.set("application_id", applicationId);
      url.searchParams.set("a2", `Application ID: ${applicationId}`);
    }

    if (orderName) {
      url.searchParams.set("a3", `Shopify order: ${orderName}`);
    }

    return url.href;
  } catch {
    return null;
  }
}

export async function createOneTimeConsultSchedulingLink({
  applicationId,
  orderName = "",
}: {
  applicationId: string;
  orderName?: string;
}): Promise<CreateOneTimeConsultSchedulingLinkResult> {
  const token = process.env.CALENDLY_API_TOKEN?.trim();
  const eventTypeUri =
    process.env.CALENDLY_ONE_TIME_CONSULT_EVENT_TYPE_URI?.trim();

  if (!token || !eventTypeUri) {
    return { created: false, reason: "missing_env" };
  }

  try {
    const response = await fetch(CALENDLY_SCHEDULING_LINKS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_event_count: 1,
        owner: eventTypeUri,
        owner_type: "EventType",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        created: false,
        reason: "request_failed",
        status: response.status,
      };
    }

    const data = (await response.json()) as CalendlySchedulingLinkResponse;
    const bookingHref = calendlyBookingHref(
      data.resource?.booking_url,
      applicationId,
      orderName,
    );

    if (!bookingHref) {
      return { created: false, reason: "missing_booking_url" };
    }

    return { created: true, bookingHref };
  } catch {
    return { created: false, reason: "request_failed" };
  }
}

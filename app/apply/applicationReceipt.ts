import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

const RECEIPT_VERSION = "v1";
const RECEIPT_MAX_AGE_SECONDS = 60 * 60 * 24;

function receiptSecret(): string {
  const configured =
    process.env.APPLICATION_RECEIPT_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    "";

  if (configured) return configured;
  if (
    process.env.GEEBS_E2E_TEST_MODE === "1" &&
    process.env.VERCEL_ENV !== "production"
  ) {
    return "geebs-e2e-receipt-secret";
  }

  return "";
}

function signatureFor(applicationId: string, issuedAt: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`${RECEIPT_VERSION}.${applicationId}.${issuedAt}`)
    .digest("base64url");
}

export function createApplicationReceipt(
  applicationId: string,
  now = Date.now(),
): string {
  const secret = receiptSecret();
  if (!secret) return "";
  const issuedAt = Math.floor(now / 1000).toString(36);
  return `${RECEIPT_VERSION}.${issuedAt}.${signatureFor(
    applicationId,
    issuedAt,
    secret,
  )}`;
}

export function verifyApplicationReceipt(
  applicationId: string,
  receipt: string,
  now = Date.now(),
): boolean {
  const secret = receiptSecret();
  if (!secret) return false;

  const [version, issuedAt, suppliedSignature, ...rest] = receipt.split(".");
  if (
    version !== RECEIPT_VERSION ||
    !issuedAt ||
    !suppliedSignature ||
    rest.length > 0
  ) {
    return false;
  }

  const issuedAtSeconds = Number.parseInt(issuedAt, 36);
  const nowSeconds = Math.floor(now / 1000);
  if (
    !Number.isFinite(issuedAtSeconds) ||
    issuedAtSeconds > nowSeconds + 60 ||
    nowSeconds - issuedAtSeconds > RECEIPT_MAX_AGE_SECONDS
  ) {
    return false;
  }

  const expectedSignature = signatureFor(applicationId, issuedAt, secret);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

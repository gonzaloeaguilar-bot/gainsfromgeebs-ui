import { NextResponse } from "next/server";

const APPLY_URL =
  "/apply?utm_source=instagram&utm_medium=bio&utm_campaign=ig_profile&utm_content=start";

export function GET() {
  return NextResponse.redirect(
    new URL(APPLY_URL, "https://gainsfromgeebs.com"),
    308,
  );
}


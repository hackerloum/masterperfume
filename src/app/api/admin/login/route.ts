import { NextResponse } from "next/server";

/**
 * Simple admin password gate.
 * The password is compared server-side against the ADMIN_PASSWORD env var so it
 * is never shipped to the browser. This is intentionally lightweight (no full
 * auth system) per the project requirements.
 */
export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // ignore malformed body -> treated as wrong password
  }

  if (password && password === expected) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "Incorrect password." },
    { status: 401 }
  );
}

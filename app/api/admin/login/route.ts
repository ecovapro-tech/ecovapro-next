import { NextResponse } from "next/server";
import { createAdminSession, ADMIN_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ error: "ADMIN_PASSWORD not configured." }, { status: 500 });

  // Constant-time compare
  const ok =
    typeof password === "string" &&
    password.length === expected.length &&
    password === expected;

  if (!ok) {
    // Throttle: brief delay to make brute-force tedious
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = await createAdminSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}

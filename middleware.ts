import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminSession, ADMIN_COOKIE_NAME } from "@/lib/auth";

// Protect /admin (except /admin/login).
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const ok = await verifyAdminSession(token);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };

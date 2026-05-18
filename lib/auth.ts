import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "ecova_admin";
const ALG = "HS256";
const ISS = "ecovapro";

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("SESSION_SECRET must be set to a 32+ char string. See .env.example.");
  }
  return new TextEncoder().encode(s);
}

export async function createAdminSession(): Promise<string> {
  const jwt = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setIssuer(ISS)
    .setExpirationTime("7d")
    .sign(secret());
  return jwt;
}

export async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer: ISS });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdminRequest(): Promise<boolean> {
  const c = cookies().get(COOKIE)?.value;
  return verifyAdminSession(c);
}

export const ADMIN_COOKIE_NAME = COOKIE;

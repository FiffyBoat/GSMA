import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

function getJWTSecret(): Uint8Array {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY environment variable is not set. Cannot initialize JWT authentication."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
}

export async function createSession(admin: AdminSession): Promise<string> {
  const jwtSecret = getJWTSecret();
  const token = await new SignJWT({ ...admin })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(jwtSecret);

  return token;
}

export async function verifySession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) return null;

  try {
    const jwtSecret = getJWTSecret();
    const { payload } = await jwtVerify(token, jwtSecret);
    return payload as unknown as AdminSession;
  } catch (error) {
    console.error("Session verification failed:", error instanceof Error ? error.message : String(error));
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

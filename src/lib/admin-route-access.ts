import { NextResponse } from "next/server";
import { verifySession, type AdminSession } from "@/lib/auth";
import { hasAdminPermission, type AdminPermission } from "@/lib/admin-roles";

type AdminAccessResult =
  | { session: AdminSession; response?: never }
  | { session?: never; response: NextResponse };

export async function requireAdminSession(): Promise<AdminAccessResult> {
  const session = await verifySession();

  if (!session) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session };
}

export async function requireAdminPermission(
  permission: AdminPermission
): Promise<AdminAccessResult> {
  const auth = await requireAdminSession();

  if ("response" in auth) {
    return auth;
  }

  if (!hasAdminPermission(auth.session.role, permission)) {
    return {
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return auth;
}

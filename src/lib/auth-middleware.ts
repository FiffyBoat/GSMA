import { verifySession } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware wrapper for admin API routes
 * Ensures the user is authenticated before processing the request
 * 
 * Usage:
 * export async function GET(request: NextRequest) {
 *   return withAdminAuth(async (session) => {
 *     // Your protected route logic here
 *     return NextResponse.json({ data: "..." });
 *   });
 * }
 */
export async function withAdminAuth(
  handler: (session: any) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in first" },
        { status: 401 }
      );
    }

    return await handler(session);
  } catch (error) {
    console.error("Auth middleware error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Type-safe wrapper for handlers that need session info
 * Usage in route handlers with proper typing
 */
export type AuthenticatedHandler = (
  session: { id: string; email: string; name: string }
) => Promise<NextResponse>;

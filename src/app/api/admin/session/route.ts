import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.id,
      email: session.email,
      name: session.name,
    },
  });
}

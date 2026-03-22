import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { createSession, verifySession } from "@/lib/auth";
import { normalizeAdminRole } from "@/lib/admin-roles";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // Verify no existing session
    const existingSession = await verifySession();
    if (existingSession) {
      return NextResponse.json(
        { error: "Already logged in" },
        { status: 400 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    const { data: admin, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: normalizeAdminRole(admin.role),
    });

    const response = NextResponse.json({
      success: true,
      name: admin.name,
      role: normalizeAdminRole(admin.role),
    });
    
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}

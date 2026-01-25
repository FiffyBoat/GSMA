import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in first" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate password length
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check password confirmation
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          error: "New password must be different from current password",
        },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Get current user
    const { data: admin, error: fetchError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", session.id)
      .single();

    if (fetchError || !admin) {
      console.error("Failed to fetch admin user:", fetchError);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password
    const newHash = bcrypt.hashSync(newPassword, 10);

    // Update password
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_hash: newHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.id);

    if (updateError) {
      console.error("Failed to update password:", updateError);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "An error occurred while changing password" },
      { status: 500 }
    );
  }
}

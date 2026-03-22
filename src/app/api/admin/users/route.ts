import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { normalizeAdminRole } from "@/lib/admin-roles";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * Admin User Management API
 * GET - List all admin users
 * POST - Create new admin user
 * PUT - Update admin user
 * DELETE - Delete admin user
 */

export async function GET() {
  try {
    const access = await requireAdminPermission("manage_admin_users");
    if ("response" in access) {
      return access.response;
    }

    const supabase = await createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, email, name, role, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: (data || []).map((admin) => ({
        ...admin,
        role: normalizeAdminRole(admin.role),
      })),
    });
  } catch (error) {
    console.error("Get admins error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const access = await requireAdminPermission("manage_admin_users");
    if ("response" in access) {
      return access.response;
    }

    const { email, password, name, role } = await request.json();
    const normalizedRole =
      typeof role === "string" ? normalizeAdminRole(role) : "editor";

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 10);

    // Create admin user
    const { data, error } = await supabase
      .from("admin_users")
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name,
        role: normalizedRole,
      })
      .select("id, email, name, role, created_at")
      .single();

    if (error) {
      console.error("Create admin error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data: {
          ...data,
          role: normalizeAdminRole(data?.role),
        },
        message: "Admin user created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const access = await requireAdminPermission("manage_admin_users");
    if ("response" in access) {
      return access.response;
    }

    const session = access.session;
    const { id, name, email, role } = await request.json();
    const normalizedRole = role ? normalizeAdminRole(role) : undefined;

    if (!id) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    if (id === session.id && normalizedRole && normalizedRole !== session.role) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 400 }
      );
    }

    // Check if email is being changed and if new email exists
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      const { data: existing } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email.toLowerCase())
        .neq("id", id)
        .single();

      if (existing) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    if (normalizedRole) {
      const { data: targetAdmin } = await supabase
        .from("admin_users")
        .select("id, role")
        .eq("id", id)
        .single();

      if (
        targetAdmin &&
        normalizeAdminRole(targetAdmin.role) === "super_admin" &&
        normalizedRole !== "super_admin"
      ) {
        const { count } = await supabase
          .from("admin_users")
          .select("id", { count: "exact", head: true })
          .eq("role", "super_admin");

        if ((count || 0) <= 1) {
          return NextResponse.json(
            { error: "At least one super admin must remain" },
            { status: 400 }
          );
        }
      }
    }

    // Update admin user
    const { data, error } = await supabase
      .from("admin_users")
      .update({
        ...(name && { name }),
        ...(email && { email: email.toLowerCase() }),
        ...(normalizedRole && { role: normalizedRole }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, email, name, role, created_at, updated_at")
      .single();

    if (error) {
      console.error("Update admin error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        ...data,
        role: normalizeAdminRole(data?.role),
      },
      message: "Admin user updated successfully",
    });
  } catch (error) {
    console.error("Update admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const access = await requireAdminPermission("manage_admin_users");
    if ("response" in access) {
      return access.response;
    }
    const session = access.session;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    if (id === session.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Check if this is the last admin
    const { data: admins } = await supabase
      .from("admin_users")
      .select("id, role");

    if (admins && admins.length <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last admin user" },
        { status: 400 }
      );
    }

    const currentAdmins = admins || [];
    const targetAdmin = currentAdmins.find((admin) => admin.id === id);
    if (targetAdmin && normalizeAdminRole(targetAdmin.role) === "super_admin") {
      const superAdminCount = currentAdmins.filter(
        (admin) => normalizeAdminRole(admin.role) === "super_admin"
      ).length;

      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the last super admin" },
          { status: 400 }
        );
      }
    }

    // Delete admin user
    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete admin error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

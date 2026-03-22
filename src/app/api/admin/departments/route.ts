import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const access = await requireAdminPermission("manage_departments");
  if ("response" in access) {
    return access.response;
  }

  try {
    const supabase = await createAdminSupabaseClient();
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");

    if (departmentId) {
      // Get single department with its units
      const { data: department, error: deptError } = await supabase
        .from("departments")
        .select("*")
        .eq("id", departmentId)
        .single();

      if (deptError) throw deptError;

      const { data: units, error: unitsError } = await supabase
        .from("department_units")
        .select("*")
        .eq("department_id", departmentId)
        .order("order", { ascending: true });

      if (unitsError) throw unitsError;

      return NextResponse.json({ department, units });
    }

    // Get all departments with their units
    const { data: departments, error: deptError } = await supabase
      .from("departments")
      .select("*")
      .order("order", { ascending: true });

    if (deptError) throw deptError;

    const departmentsWithUnits = await Promise.all(
      departments.map(async (dept) => {
        const { data: units } = await supabase
          .from("department_units")
          .select("*")
          .eq("department_id", dept.id)
          .order("order", { ascending: true });

        return { ...dept, units: units || [] };
      })
    );

    return NextResponse.json(departmentsWithUnits);
  } catch (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const access = await requireAdminPermission("manage_departments");
  if ("response" in access) {
    return access.response;
  }

  try {
    const supabase = await createAdminSupabaseClient();
    const body = await req.json();

    // Check if it's a department or unit creation
    if (body.department_id) {
      // Creating a unit
      const { data, error } = await supabase
        .from("department_units")
        .insert({
          department_id: body.department_id,
          name: body.name,
          title: body.title,
          description: body.description,
          order: body.order || 0,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return NextResponse.json(data, { status: 201 });
    } else {
      // Creating a department
      const slug = body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const { data, error } = await supabase
        .from("departments")
        .insert({
          name: body.name,
          slug: body.slug || slug,
          head_name: body.head_name,
          head_title: body.head_title,
          head_image_url: body.head_image_url,
          description: body.description,
          tagline: body.tagline || null,
          overview: body.overview || null,
          sections: body.sections || [],
          contact_info: body.contact_info || null,
          order: body.order || 0,
          is_published: body.is_published || false,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return NextResponse.json(data, { status: 201 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create department or unit" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const access = await requireAdminPermission("manage_departments");
    if ("response" in access) {
      return access.response;
    }

    const supabase = await createAdminSupabaseClient();
    const body = await req.json();

    if (body.department_id) {
      // Updating a unit
      const { data, error } = await supabase
        .from("department_units")
        .update({
          name: body.name,
          title: body.title,
          description: body.description,
          order: body.order || 0,
        })
        .eq("id", body.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return NextResponse.json(data);
    } else {
      // Updating a department
      const { data, error } = await supabase
        .from("departments")
        .update({
          name: body.name,
          head_name: body.head_name,
          head_title: body.head_title,
          head_image_url: body.head_image_url,
          description: body.description,
          tagline: body.tagline || null,
          overview: body.overview || null,
          sections: body.sections || [],
          contact_info: body.contact_info || null,
          order: body.order || 0,
          is_published: body.is_published || false,
        })
        .eq("id", body.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update department or unit" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const access = await requireAdminPermission("manage_departments");
    if ("response" in access) {
      return access.response;
    }

    const supabase = await createAdminSupabaseClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const isUnit = searchParams.get("isUnit") === "true";

    if (isUnit) {
      const { error } = await supabase
        .from("department_units")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
    } else {
      const { error } = await supabase
        .from("departments")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete department or unit" },
      { status: 500 }
    );
  }
}

import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface DepartmentUnitNavItem {
  id: string;
  department_id: string;
  name: string;
  title: string;
  head_name?: string | null;
  head_image_url?: string | null;
  order: number;
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    let query = supabase
      .from("departments")
      .select("id, name, slug, head_name, head_title, head_image_url, description, contact_info, order")
      .eq("is_published", true)
      .order("order", { ascending: true });

    // If limit is specified, apply it (for home page preview)
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: departments, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch departments" },
        { status: 500 }
      );
    }

    if (!departments || departments.length === 0) {
      return NextResponse.json([]);
    }

    const departmentIds = departments.map((department) => department.id);
    const { data: units, error: unitsError } = await supabase
      .from("department_units")
      .select("id, department_id, name, title, head_name, head_image_url, order")
      .in("department_id", departmentIds)
      .order("order", { ascending: true });

    if (unitsError) {
      console.error("Supabase units error:", unitsError);
      return NextResponse.json(
        { error: "Failed to fetch departments" },
        { status: 500 }
      );
    }

    const unitsByDepartment = new Map<string, DepartmentUnitNavItem[]>();

    for (const unit of units || []) {
      const departmentUnits = unitsByDepartment.get(unit.department_id) || [];
      departmentUnits.push(unit);
      unitsByDepartment.set(unit.department_id, departmentUnits);
    }

    return NextResponse.json(
      departments.map((department) => ({
        ...department,
        units: unitsByDepartment.get(department.id) || [],
      }))
    );
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

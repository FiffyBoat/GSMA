import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  database: {
    connected: boolean;
    message: string;
  };
  storage: {
    accessible: boolean;
    message: string;
  };
  timestamp: string;
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const timestamp = new Date().toISOString();
  let overall: "healthy" | "degraded" | "unhealthy" = "healthy";

  // Check database connection
  let databaseStatus = {
    connected: false,
    message: "Database not connected",
  };

  try {
    const supabase = await createAdminSupabaseClient();

    // Try to query a simple table
    const { error } = await supabase
      .from("admin_users")
      .select("id")
      .limit(1);

    if (!error) {
      databaseStatus = {
        connected: true,
        message: "Database connected successfully",
      };
    } else {
      databaseStatus = {
        connected: false,
        message: error.message || "Database query failed",
      };
      overall = "degraded";
    }
  } catch (error) {
    databaseStatus = {
      connected: false,
      message: error instanceof Error ? error.message : "Database connection failed",
    };
    overall = "unhealthy";
  }

  // Check storage accessibility
  let storageStatus = {
    accessible: false,
    message: "Storage not accessible",
  };

  try {
    const supabase = await createAdminSupabaseClient();

    // Try to list storage buckets
    const { data, error } = await supabase.storage.listBuckets();

    if (!error && data) {
      const hasImagesBucket = data.some((bucket) => bucket.name === "website-images");
      if (hasImagesBucket) {
        storageStatus = {
          accessible: true,
          message: "Storage bucket 'website-images' is accessible",
        };
      } else {
        storageStatus = {
          accessible: false,
          message: "Storage bucket 'website-images' not found",
        };
        overall = "degraded";
      }
    } else {
      storageStatus = {
        accessible: false,
        message: error?.message || "Failed to list storage buckets",
      };
      overall = "degraded";
    }
  } catch (error) {
    storageStatus = {
      accessible: false,
      message: error instanceof Error ? error.message : "Storage check failed",
    };
    overall = "degraded";
  }

  const response: HealthStatus = {
    status: overall,
    database: databaseStatus,
    storage: storageStatus,
    timestamp,
  };

  // Return 200 for healthy/degraded, 503 for unhealthy
  const statusCode = overall === "unhealthy" ? 503 : 200;
  return NextResponse.json(response, { status: statusCode });
}

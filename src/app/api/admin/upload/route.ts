import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/auth";
import { NextResponse } from "next/server";

async function ensureWebsiteImagesBucket(supabase: Awaited<ReturnType<typeof createAdminSupabaseClient>>) {
  // Try to create the bucket if it's missing. If it already exists, Supabase will return an error
  // like "Bucket already exists", which we can safely ignore.
  const { error } = await supabase.storage.createBucket("website-images", {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
  });

  if (error) {
    const msg = (error as any)?.message || String(error);
    if (!/already exists/i.test(msg)) {
      // Not an "already exists" error → surface it so the caller knows bucket creation failed.
      throw error;
    }
  }
}

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    let { data, error } = await supabase.storage
      .from("website-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      const msg = (error as any)?.message || String(error);
      // Self-heal: if the bucket isn't found (common when env points to a fresh/local Supabase),
      // create it and retry once.
      if (/bucket not found/i.test(msg)) {
        try {
          await ensureWebsiteImagesBucket(supabase);
          const retry = await supabase.storage
            .from("website-images")
            .upload(fileName, buffer, {
              contentType: file.type,
              upsert: false,
            });
          data = retry.data;
          error = retry.error;
        } catch (e) {
          console.error("Bucket create/retry failed:", e);
          return NextResponse.json(
            {
              error:
                "Storage bucket 'website-images' was not found and could not be created. " +
                "If you're using local Supabase, run `npx supabase stop` then `npx supabase start` (or `npm run supabase:reset`). " +
                "If you're using cloud Supabase, create a public bucket named 'website-images' in Storage.",
            },
            { status: 500 }
          );
        }
      }

      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
          {
            error:
              (error as any)?.message ||
              "Failed to upload image. Confirm `.env.local` points to the same Supabase instance where the bucket exists.",
          },
          { status: 500 }
        );
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "An error occurred while uploading the image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    let path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // If path is a full URL, extract the path part
    if (path.includes("/storage/v1/object/public/website-images/")) {
      const urlParts = path.split("/website-images/");
      path = urlParts[1] || path;
    }

    const supabase = await createAdminSupabaseClient();
    // If the bucket is missing in this Supabase instance, create it so future uploads work.
    // Deleting a non-existent object will still fail gracefully if it doesn't exist.
    try {
      await ensureWebsiteImagesBucket(supabase);
    } catch {
      // ignore – delete will report its own error if needed
    }
    const { error } = await supabase.storage
      .from("website-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the image" },
      { status: 500 }
    );
  }
}

import { createAdminSupabaseClient } from "@/lib/supabase/server";

/**
 * Storage utilities for managing images and files
 */

/**
 * Delete an image from Supabase Storage
 * @param imagePath - Full path to image (e.g., "hero-slides/timestamp-random.jpg")
 */
export async function deleteImage(imagePath: string): Promise<boolean> {
  if (!imagePath) return true; // Skip if no image

  try {
    const supabase = await createAdminSupabaseClient();
    const { error } = await supabase.storage
      .from("website-images")
      .remove([imagePath]);

    if (error) {
      console.error(`Failed to delete image ${imagePath}:`, error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

/**
 * Extract image path from full URL
 * @param imageUrl - Full URL (e.g., "https://...supabase.co/storage/v1/object/public/website-images/...")
 * @returns Image path relative to bucket (e.g., "hero-slides/timestamp.jpg")
 */
export function extractImagePath(imageUrl: string): string | null {
  if (!imageUrl) return null;

  try {
    // Match the path after /website-images/
    const match = imageUrl.match(/website-images\/(.+?)($|\?)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Delete multiple images at once
 * @param imageUrls - Array of full image URLs
 */
export async function deleteImages(imageUrls: string[]): Promise<number> {
  let deletedCount = 0;

  for (const url of imageUrls) {
    const path = extractImagePath(url);
    if (path && (await deleteImage(path))) {
      deletedCount++;
    }
  }

  return deletedCount;
}

/**
 * Generate public URL for an image stored in Supabase
 * @param imagePath - Image path (e.g., "hero-slides/timestamp.jpg")
 * @param baseUrl - Supabase base URL
 */
export function getPublicImageUrl(
  imagePath: string,
  baseUrl: string
): string {
  if (!imagePath) return "";

  return `${baseUrl}/storage/v1/object/public/website-images/${imagePath}`;
}

/**
 * Check if URL is from Supabase storage
 */
export function isSupabaseImageUrl(url: string): boolean {
  return (
    typeof url === "string" &&
    url.includes("supabase.co") &&
    url.includes("website-images")
  );
}

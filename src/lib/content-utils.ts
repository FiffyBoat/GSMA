/**
 * Utility functions for content management
 */

/**
 * Generate a URL-friendly slug from text
 * @example generateSlug("Hello World") => "hello-world"
 * @example generateSlug("News: New Updates!") => "news-new-updates"
 */
export function generateSlug(text: string): string {
  if (!text) return "";
  
  return text
    .toLowerCase()                           // Convert to lowercase
    .trim()                                  // Remove whitespace
    .replace(/[^\w\s-]/g, "")               // Remove special characters
    .replace(/[\s_]+/g, "-")                // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, "")                // Remove leading/trailing hyphens
    .replace(/-+/g, "-");                   // Replace multiple hyphens with single
}

/**
 * Validate slug format
 * Returns true if slug is valid (lowercase letters, numbers, hyphens only)
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Convert a title to a slug, validating the result
 * If an existing slug is provided and valid, returns it
 * Otherwise generates a new one from the title
 */
export function getSlug(title: string, existingSlug?: string): string {
  // If existing slug is valid, use it
  if (existingSlug && isValidSlug(existingSlug)) {
    return existingSlug;
  }
  
  // Generate new slug from title
  return generateSlug(title);
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Format date for display (e.g., "Jan 22, 2026")
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date and time (e.g., "Jan 22, 2026 at 3:30 PM")
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

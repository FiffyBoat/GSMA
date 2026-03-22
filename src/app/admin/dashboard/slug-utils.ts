import { generateSlug, isValidSlug } from "@/lib/content-utils";

export function syncSlugWithTitle(
  currentTitle: string,
  nextTitle: string,
  currentSlug: string
): string {
  const currentGenerated = generateSlug(currentTitle);

  if (!currentSlug || currentSlug === currentGenerated) {
    return generateSlug(nextTitle);
  }

  return currentSlug;
}

export function normalizeSlugInput(value: string): string {
  return generateSlug(value);
}

export function getSlugValidation(slug: string, basePath: string) {
  if (!slug) {
    return {
      tone: "warning" as const,
      message: "A URL slug will be generated from the title.",
    };
  }

  if (!isValidSlug(slug)) {
    return {
      tone: "error" as const,
      message: "Use lowercase letters, numbers, and hyphens only.",
    };
  }

  return {
    tone: "success" as const,
    message: `Public URL: ${basePath}/${slug}`,
  };
}

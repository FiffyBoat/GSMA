import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type"); // 'all', 'news', 'projects', 'events', 'gallery'

  if (!query || query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  const searchTerm = `%${query}%`;
  const results: any[] = [];

  try {
    // Search news posts
    if (!type || type === "news" || type === "all") {
      const { data: news } = await supabase
        .from("news_posts")
        .select("id, title, excerpt, slug, image_url, published_date")
        .eq("is_published", true)
        .or(
          `title.ilike.${searchTerm},excerpt.ilike.${searchTerm},content.ilike.${searchTerm}`
        )
        .limit(5);

      if (news) {
        results.push(
          ...news.map((item) => ({
            ...item,
            type: "news",
            url: `/news/${item.slug}`,
            displayTitle: item.title,
          }))
        );
      }
    }

    // Search projects
    if (!type || type === "projects" || type === "all") {
      const { data: projects } = await supabase
        .from("projects")
        .select("id, title, description, slug, image_url, status")
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5);

      if (projects) {
        results.push(
          ...projects.map((item) => ({
            ...item,
            type: "projects",
            url: `/projects/${item.slug}`,
            displayTitle: item.title,
            excerpt: item.description,
          }))
        );
      }
    }

    // Search events
    if (!type || type === "events" || type === "all") {
      const { data: events } = await supabase
        .from("events")
        .select("id, title, description, slug, image_url, start_date")
        .eq("is_published", true)
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5);

      if (events) {
        results.push(
          ...events.map((item) => ({
            ...item,
            type: "events",
            url: `/events/${item.slug}`,
            displayTitle: item.title,
            excerpt: item.description,
          }))
        );
      }
    }

    // Search gallery
    if (!type || type === "gallery" || type === "all") {
      const { data: gallery } = await supabase
        .from("gallery")
        .select("id, title, description, category, image_url")
        .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5);

      if (gallery) {
        results.push(
          ...gallery.map((item) => ({
            ...item,
            type: "gallery",
            url: `/gallery`,
            displayTitle: item.title,
            excerpt: item.description,
          }))
        );
      }
    }

    // Sort by relevance (exact matches first, then partial)
    const sortedResults = results.sort((a, b) => {
      const aExact =
        a.displayTitle?.toLowerCase() === query.toLowerCase() ? 0 : 1;
      const bExact =
        b.displayTitle?.toLowerCase() === query.toLowerCase() ? 0 : 1;
      return aExact - bExact;
    });

    return NextResponse.json({ data: sortedResults });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}

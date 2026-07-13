import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import GalleryLightbox from "@/components/GalleryLightbox";
import PaginationNav from "@/components/shared/PaginationNav";
import PageHeader from "@/components/shared/PageHeader";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export const dynamic = "force-dynamic";

const GALLERY_ITEMS_PER_PAGE = 12;

interface GalleryPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const from = (currentPage - 1) * GALLERY_ITEMS_PER_PAGE;
  const to = from + GALLERY_ITEMS_PER_PAGE - 1;
  const supabase = createPublicServerSupabaseClient();

  const [{ count }, { data: items, error }] = await Promise.all([
    supabase
      .from("gallery_items")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: true })
      .range(from, to),
  ]);

  const gallery = items || [];
  const totalPages = Math.max(1, Math.ceil((count || 0) / GALLERY_ITEMS_PER_PAGE));

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Navbar />
      <PageHeader title="Gallery" breadcrumbs={[{ label: "Gallery" }]} />

      <section className="relative overflow-hidden bg-[#f7f8fa] py-[40px] sm:py-[60px] md:py-[84px]">
        <div className="container relative mx-auto max-w-7xl px-[15px]">
          <div className="mb-[24px] text-center sm:mb-[28px] md:mb-[36px]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B0000] sm:text-[12px]">
              Media Archive
            </p>
            <h2 className="mx-auto max-w-4xl text-[24px] font-bold leading-tight text-gray-900 sm:text-[32px] md:text-[38px]">
              Photo and video albums from Assembly work across the municipality
            </h2>
            <div className="mx-auto mb-4 mt-4 h-1 w-20 rounded-[4px] bg-[#8B0000]" />
            <p className="text-readable mx-auto max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px] md:text-[16px]">
              Explore published albums from projects, official events, outreach,
              and community activity. Move page by page through the gallery archive
              and open any album for a full-screen view.
            </p>
          </div>

          {error ? (
            <div className="mb-[20px] rounded-lg border border-red-200 bg-red-50 p-[14px] text-[12px] text-red-700 sm:mb-[24px] sm:p-[16px] sm:text-[13px] md:mb-[30px] md:p-[18px] md:text-[14px]">
              Failed to load gallery: {error.message}
            </div>
          ) : null}

          {gallery.length === 0 ? (
            <div className="rounded-[8px] border border-gray-200 bg-white py-[40px] text-center text-[14px] text-gray-600 shadow-sm sm:py-[50px] sm:text-[15px] md:py-[60px] md:text-[16px] lg:py-[80px]">
              No gallery albums have been added yet.
            </div>
          ) : (
            <>
              <GalleryLightbox items={gallery} />
              <PaginationNav
                basePath="/gallery"
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

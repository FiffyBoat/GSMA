import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Images } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient();

  const { data: items, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });

  const gallery = items || [];

  const categories = ["All", "Photo", "Video", "Project", "Event"];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Gallery" breadcrumbs={[{ label: "Gallery" }]} />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px] max-w-6xl">
          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px]">Photo & Video Gallery</h2>
            <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px]">
              Highlights from projects, events, and activities of the Assembly.
            </p>
          </div>

          {error && (
            <div className="mb-[20px] sm:mb-[24px] md:mb-[30px] p-[14px] sm:p-[16px] md:p-[18px] rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12px] sm:text-[13px] md:text-[14px]">
              Failed to load gallery: {error.message}
            </div>
          )}

          {gallery.length === 0 ? (
            <div className="text-center text-gray-600 py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px] text-[14px] sm:text-[15px] md:text-[16px]">
              No gallery items have been added yet.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-[10px] sm:gap-[12px] md:gap-[14px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="px-[14px] sm:px-[16px] md:px-[18px] py-[8px] sm:py-[10px] md:py-[12px] rounded-full bg-gray-100 text-gray-700 text-[11px] sm:text-[12px] md:text-[13px] font-medium cursor-default"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] w-full overflow-hidden">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center text-white">
                          <Images className="w-[36px] sm:w-[40px] md:w-[44px] h-[36px] sm:h-[40px] md:h-[44px] text-white/80" />
                        </div>
                      )}
                    </div>
                    <div className="p-[16px] sm:p-[18px] md:p-[20px]">
                      <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-gray-900 mb-[6px] sm:mb-[8px] line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}


import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import NewsSearch from "@/components/NewsSearch";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: articles, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_date", { ascending: false });

  const news = articles || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="News & Updates" breadcrumbs={[{ label: "News" }]} />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">Latest News</h2>
            <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px]">
              Stay updated with the latest happenings in Ga South Municipality
            </p>
          </div>

          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px] flex justify-end">
            <NewsSearch news={news} />
          </div>

          {error && (
            <div className="mb-[20px] sm:mb-[24px] md:mb-[30px] p-[14px] sm:p-[16px] md:p-[18px] rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12px] sm:text-[13px] md:text-[14px]">
              Failed to load news: {error.message}
            </div>
          )}

          {news.length === 0 ? (
            <div className="text-center text-gray-600 py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px] text-[14px] sm:text-[15px] md:text-[16px]">
              No news articles have been published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[24px] md:gap-[28px] lg:gap-[32px]">
              {news.map((article) => (
                <a
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
                        <svg className="w-[40px] sm:w-[48px] md:w-[56px] h-[40px] sm:h-[48px] md:h-[56px] text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m3-7h-3v3m3-3l-3 3" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 mb-[12px] sm:mb-[14px] line-clamp-2 group-hover:text-[#8B0000] transition-colors leading-[1.3] sm:leading-[1.4]">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] mb-[14px] sm:mb-[16px] line-clamp-2 leading-[1.5] sm:leading-[1.6]">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-[8px] sm:gap-[10px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-500">
                      <svg className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(article.published_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import PaginationNav from "@/components/shared/PaginationNav";
import NewsSearch from "@/components/NewsSearch";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import Link from "next/link";
import { getSlug } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

const NEWS_PER_PAGE = 9;

interface NewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const from = (currentPage - 1) * NEWS_PER_PAGE;
  const to = from + NEWS_PER_PAGE - 1;
  const supabase = createPublicServerSupabaseClient();

  const [{ count }, { data: articles, error }] = await Promise.all([
    supabase
      .from("news_posts")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("news_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_date", { ascending: false })
      .range(from, to),
  ]);

  const news = articles || [];
  const totalPages = Math.max(1, Math.ceil((count || 0) / NEWS_PER_PAGE));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="News & Updates" breadcrumbs={[{ label: "News" }]} />

      <section className="py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto px-[15px]">
          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px] rounded-[28px] border border-gray-100 bg-[linear-gradient(180deg,#ffffff,#faf7f1)] px-5 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:px-7">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">
              Latest News
            </h2>
            <p className="text-readable text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] max-w-3xl">
              Stay updated with the latest happenings in Ga South Municipality.
            </p>
          </div>

          <div className="mb-[24px] sm:mb-[28px] md:mb-[32px] flex justify-end">
            <NewsSearch news={news} />
          </div>

          {error ? (
            <div className="mb-[20px] rounded-lg border border-red-200 bg-red-50 p-[14px] text-[12px] text-red-700 sm:mb-[24px] sm:p-[16px] sm:text-[13px] md:mb-[30px] md:p-[18px] md:text-[14px]">
              Failed to load news: {error.message}
            </div>
          ) : null}

          {news.length === 0 ? (
            <div className="py-[40px] text-center text-[14px] text-gray-600 sm:py-[50px] sm:text-[15px] md:py-[60px] md:text-[16px] lg:py-[80px]">
              No news articles have been published yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[24px] md:gap-[28px] lg:grid-cols-3 lg:gap-[32px]">
                {news.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${getSlug(article.title, article.slug) || article.id}`}
                    className="surface-card group overflow-hidden rounded-2xl transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)]"
                  >
                    <div className="relative h-[150px] overflow-hidden sm:h-[180px] md:h-[200px] lg:h-[240px]">
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B0000] to-[#6B0000]">
                          <svg
                            className="h-[40px] w-[40px] text-white/50 sm:h-[48px] sm:w-[48px] md:h-[56px] md:w-[56px]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m3-7h-3v3m3-3l-3 3"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                      <h3 className="mb-[12px] line-clamp-2 text-[16px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-[#8B0000] sm:mb-[14px] sm:text-[17px] sm:leading-[1.4] md:text-[18px] lg:text-[20px]">
                        {article.title}
                      </h3>
                      <p className="text-readable mb-[14px] line-clamp-3 text-[13px] leading-[1.65] text-gray-600 sm:mb-[16px] sm:text-[14px] md:text-[15px]">
                        {article.excerpt}
                      </p>
                      {article.tags && article.tags.length > 0 ? (
                        <div className="mb-[12px] flex flex-wrap gap-[6px] sm:mb-[14px] sm:gap-[8px]">
                          {article.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-block rounded-full bg-[#8B0000]/10 px-[8px] py-[4px] text-[11px] font-medium text-[#8B0000] sm:px-[10px] sm:text-[12px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className="flex items-center gap-[8px] text-[12px] text-gray-500 sm:gap-[10px] sm:text-[13px] md:text-[14px]">
                        <svg
                          className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {new Date(article.published_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <PaginationNav
                basePath="/news"
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

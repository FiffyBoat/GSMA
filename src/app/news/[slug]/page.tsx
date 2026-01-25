import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient();

  const { data: article, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single();

  if (error || !article) {
    notFound();
  }

  const { data: relatedArticles } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", article.id)
    .order("published_date", { ascending: false })
    .limit(2);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="News & Updates"
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />

      <article className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center gap-[8px] text-[#8B0000] font-medium mb-[20px] sm:mb-[24px] md:mb-[30px] hover:underline text-[13px] sm:text-[14px] md:text-[15px]"
            >
              <ArrowLeft className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
              Back to News
            </Link>

            <div className="mb-[24px] sm:mb-[28px] md:mb-[32px]">
              <span className="inline-block bg-[#8B0000] text-white text-[11px] sm:text-[12px] md:text-[13px] font-semibold px-[14px] sm:px-[16px] md:px-[18px] py-[8px] sm:py-[10px] md:py-[12px] rounded mb-[14px] sm:mb-[16px] md:mb-[18px]">
                {article.category}
              </span>
              <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-bold text-gray-900 mb-[14px] sm:mb-[16px] md:mb-[20px] leading-[1.2] sm:leading-[1.3] md:leading-[1.3]">
                {article.title}
              </h1>
              <div className="flex items-center gap-[14px] sm:gap-[16px] md:gap-[20px] text-gray-500 text-[12px] sm:text-[13px] md:text-[14px] md:text-[15px]">
                <div className="flex items-center gap-[6px] sm:gap-[8px]">
                  <Calendar className="w-[16px] sm:w-[17px] md:w-[18px] md:w-[20px] h-[16px] sm:h-[17px] md:h-[18px] md:h-[20px]" />
                  <span>{article.date}</span>
                </div>
                {/* Category can be added later when the schema supports it */}
              </div>
            </div>

            {article.image_url && (
              <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-[20px] sm:mb-[25px] md:mb-[30px] lg:mb-[40px]">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {article.content
                ?.split("\n\n")
                .map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                    {paragraph}
                  </p>
                ))}
            </div>

            <div className="mt-[30px] sm:mt-[36px] md:mt-[48px] lg:mt-[64px] pt-[20px] sm:pt-[24px] md:pt-[32px] border-t border-gray-200">
              <div className="flex flex-wrap gap-[10px] sm:gap-[12px] md:gap-[14px]">
                <span className="text-gray-600 font-medium text-[13px] sm:text-[14px] md:text-[15px]">Tags:</span>
                <span className="bg-gray-100 text-gray-700 px-[12px] sm:px-[14px] md:px-[16px] py-[6px] sm:py-[8px] md:py-[10px] rounded-full text-[11px] sm:text-[12px] md:text-[13px]">
                  Ga South
                </span>
                <span className="bg-gray-100 text-gray-700 px-[12px] sm:px-[14px] md:px-[16px] py-[6px] sm:py-[8px] md:py-[10px] rounded-full text-[11px] sm:text-[12px] md:text-[13px]">
                  Municipal Assembly
                </span>
              </div>
            </div>
          </div>

          {relatedArticles && relatedArticles.length > 0 && (
            <div className="max-w-4xl mx-auto mt-[40px] sm:mt-[50px] md:mt-[64px]">
              <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[24px] sm:mb-[28px] md:mb-[32px]">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[24px] md:gap-[32px]">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden bg-gray-100">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center text-white font-bold text-[14px] sm:text-[16px] md:text-lg">
                          GSMA News
                        </div>
                      )}
                    </div>
                    <div className="p-[16px] sm:p-[18px] md:p-[20px]">
                      <div className="flex items-center gap-[6px] sm:gap-[8px] text-gray-500 text-[11px] sm:text-[12px] md:text-[13px] mb-[8px] sm:mb-[10px]">
                        <Calendar className="w-[14px] sm:w-[15px] md:w-[16px] h-[14px] sm:h-[15px] md:h-[16px]" />
                        <span>{related.published_date ? new Date(related.published_date).toLocaleDateString() : ""}</span>
                      </div>
                      <h3 className="font-bold text-[14px] sm:text-[15px] md:text-[16px] text-gray-900 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { getSlug } from "@/lib/content-utils";
import { formatLooseLabel } from "@/lib/text-match";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createPublicServerSupabaseClient();

  const { data: directMatch, error: directMatchError } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true);

  const article =
    directMatch?.[0] ||
    (
      await supabase
        .from("news_posts")
        .select("*")
        .eq("is_published", true)
    ).data?.find(
      (item) => item.id === slug || getSlug(item.title, item.slug) === slug
    );

  if ((directMatchError && !directMatch) || !article) {
    notFound();
  }

  // Fetch author information separately if posted_by exists
  let author = null;
  if (article.posted_by) {
    const { data: authorData } = await supabase
      .from("admin_users")
      .select("name, email")
      .eq("id", article.posted_by)
      .single();
    author = authorData;
  }

  const { data: relatedArticles } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", article.id)
    .lt("published_date", article.published_date)
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

      <article className="bg-[#f7f8fa] py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center gap-[8px] text-[#8B0000] font-bold uppercase tracking-wide mb-[20px] sm:mb-[24px] md:mb-[30px] hover:underline text-[13px] sm:text-[14px]"
            >
              <ArrowLeft className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
              Back to News
            </Link>

            <div className="mb-[24px] rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:mb-[28px] sm:p-7 md:mb-[32px] md:p-8">
              <span className="inline-block bg-[#8B0000] text-white text-[11px] sm:text-[12px] md:text-[13px] font-bold px-[14px] sm:px-[16px] md:px-[18px] py-[8px] sm:py-[10px] rounded-[4px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                {formatLooseLabel(article.category, "News")}
              </span>
              <h1 className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold text-gray-950 mb-[14px] sm:mb-[16px] md:mb-[20px] leading-[1.2] sm:leading-[1.25]">
                {article.title}
              </h1>
              
              {/* Admin Details Section */}
              <div className="mb-[20px] sm:mb-[24px] md:mb-[28px] pb-[20px] sm:pb-[24px] md:pb-[28px] border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-[16px] sm:gap-[20px] md:gap-[24px] text-gray-600 text-[12px] sm:text-[13px] md:text-[14px]">
                  {/* Published Date */}
                  <div className="flex items-center gap-[6px] sm:gap-[8px]">
                    <Calendar className="w-[16px] sm:w-[17px] md:w-[18px] md:w-[20px] h-[16px] sm:h-[17px] md:h-[18px] md:h-[20px]" />
                    <span>Published on {new Date(article.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  
                  {/* Author Information */}
                  {author && (
                    <div className="flex items-center gap-[6px] sm:gap-[8px]">
                      <svg className="w-[16px] sm:w-[17px] md:w-[18px] md:w-[20px] h-[16px] sm:h-[17px] md:h-[18px] md:h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Posted by <strong>{author.name}</strong></span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Excerpt if available */}
              {article.excerpt && (
                <p className="text-gray-700 text-[15px] sm:text-[16px] md:text-[17px] italic font-semibold leading-[1.7]">
                  {article.excerpt}
                </p>
              )}
            </div>

            {article.image_url && (
              <>
                <div className="relative h-[220px] sm:h-[320px] md:h-[440px] lg:h-[520px] rounded-[8px] overflow-hidden mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[22px] bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {article.image_caption ? (
                  <p className="text-center text-sm text-gray-500 mb-[20px] sm:mb-[24px] md:mb-[28px] italic">
                    {article.image_caption}
                  </p>
                ) : null}
              </>
            )}

            <div className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
              {article.content
                ?.split("\n\n")
                .map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-[1.7] md:leading-[1.85] mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px] text-[14px] sm:text-[15px] md:text-[16px]">
                    {paragraph}
                  </p>
                ))}
            </div>

            {article.credit_note ? (
              <div className="mt-[24px] sm:mt-[28px] md:mt-[32px] pt-[20px] border-t border-gray-200">
                <p className="text-sm text-gray-500 italic">Credit: {article.credit_note}</p>
              </div>
            ) : null}

            {article.tags && article.tags.length > 0 && (
              <div className="mt-[18px] sm:mt-[20px] md:mt-[24px] pt-[16px] sm:pt-[18px] md:pt-[20px] border-t border-gray-200">
                <div className="flex flex-wrap gap-[10px] sm:gap-[12px] md:gap-[14px]">
                  <span className="text-gray-600 font-medium text-[13px] sm:text-[14px] md:text-[15px]">Tags:</span>
                  {article.tags.map((tag: string) => (
                    <span key={tag} className="bg-[#8B0000]/10 text-[#8B0000] px-[12px] sm:px-[14px] md:px-[16px] py-[6px] sm:py-[8px] md:py-[10px] rounded-full text-[11px] sm:text-[12px] md:text-[13px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
                    href={`/news/${getSlug(related.title, related.slug) || related.id}`}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden bg-gray-100">
                      {related.image_url ? (
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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

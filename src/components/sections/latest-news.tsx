"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ImgHTMLAttributes } from 'react';
import { getSlug } from "@/lib/content-utils";

interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_date: string;
}

const LatestNews = () => {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const handleImageError = (postId: string) => {
    setImageErrors(prev => new Set([...prev, postId]));
  };

  useEffect(() => {
    fetch("/api/content/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setNewsPosts(data.data.slice(0, 3));
          // Reset image errors when new posts are loaded
          setImageErrors(new Set());
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-[44px] sm:py-[64px] md:py-[88px] bg-white">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="mb-[30px] sm:mb-[40px] md:mb-[50px]">
          <h2 className="text-[#8B0000] text-[24px] sm:text-[28px] md:text-[32px] font-bold relative pb-[10px] mb-[1rem] sm:mb-[1.2rem] md:mb-[1.5rem] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[#8B0000]">
            Latest News
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-[40px]">
            <div className="text-[#666666] text-[16px]">Loading news...</div>
          </div>
        ) : newsPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[25px] md:gap-[30px]">
              {newsPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="surface-card flex flex-col overflow-hidden rounded-2xl transition-standard hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)] group"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    {post.image_url && !imageErrors.has(post.id) ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => handleImageError(post.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center text-white font-bold text-[14px] sm:text-[16px] md:text-lg">
                        GSMA News
                      </div>
                    )}
                  </div>

                  <div className="p-[20px] sm:p-[24px] md:p-[25px] flex flex-col flex-grow">
                    <div className="flex items-center text-[#666666] text-[11px] sm:text-[12px] md:text-[13px] mb-[10px] sm:mb-[12px]">
                      <svg 
                        className="w-[14px] sm:w-[15px] md:w-[16px] h-[14px] sm:h-[15px] md:h-[16px] mr-[6px] sm:mr-[8px] text-[#8B0000] flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      {formatDate(post.published_date)}
                    </div>

                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] leading-[1.3] sm:leading-[1.4] font-semibold text-[#333333] mb-[12px] sm:mb-[14px] md:mb-[15px] line-clamp-2 hover:text-[#8B0000] transition-colors">
                      <Link href={`/news/${getSlug(post.title, post.slug) || post.id}`}>{post.title}</Link>
                    </h3>

                    <p className="text-readable text-[#666666] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] mb-[15px] sm:mb-[18px] md:mb-[20px] line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/news/${getSlug(post.title, post.slug) || post.id}`}
                        className="inline-flex items-center text-[#8B0000] font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wider gap-[6px] sm:gap-[8px] group/link hover:text-[#ffcc00] transition-colors"
                      >
                        Read More
                        <svg
                          className="w-[14px] sm:w-[15px] md:w-[16px] h-[14px] sm:h-[15px] md:h-[16px] transition-transform flex-shrink-0 group-hover/link:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-[40px] sm:mt-[45px] md:mt-[50px] text-center">
              <Link 
                href="/news" 
                className="inline-block bg-[#8B0000] text-white px-[28px] sm:px-[32px] md:px-[35px] py-[12px] sm:py-[13px] md:py-[14px] rounded-[4px] font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wide hover:bg-[#ffcc00] hover:text-[#333333] transition-standard"
              >
                View All News
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-[40px]">
            <div className="text-[#666666] text-[16px] mb-[20px]">No news articles available at the moment.</div>
            <Link 
              href="/news" 
              className="inline-block bg-[#8B0000] text-white px-[28px] sm:px-[32px] md:px-[35px] py-[12px] sm:py-[13px] md:py-[14px] rounded-[4px] font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wide hover:bg-[#ffcc00] hover:text-[#333333] transition-standard"
            >
              Visit News Page
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;

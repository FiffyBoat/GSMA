"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_date: string;
  is_published: boolean;
}

interface SearchResult {
  id: string;
  type: "news" | "projects" | "events" | "gallery";
  displayTitle: string;
  excerpt?: string;
  image_url?: string;
  url: string;
}

interface NewsSearchProps {
  news: NewsArticle[];
}

export default function NewsSearch({ news }: NewsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);

    if (!value || value.length < 2) {
      setShowResults(false);
      return;
    }

    setShowResults(true);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(value)}&type=news`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <>
      <div ref={searchRef} className="relative w-full sm:w-[280px] md:w-[300px] lg:w-[320px]">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-[14px] sm:pl-[16px] pr-[14px] sm:pr-[16px] py-[10px] sm:py-[12px] md:py-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-[13px] sm:text-[14px] md:text-[15px]"
          />
          <button
            type="submit"
            className="absolute left-[12px] sm:left-[14px] top-1/2 -translate-y-1/2"
          >
            <Search className="w-[18px] sm:w-[19px] md:w-[20px] h-[18px] sm:h-[19px] md:h-[20px] text-gray-400 hover:text-[#8B0000] transition-colors" />
          </button>
        </form>

        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-[8px] sm:mt-[10px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="p-[16px] sm:p-[18px] md:p-[20px] text-center text-gray-500 text-[13px] sm:text-[14px]">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {searchResults.map((result) => (
                  <Link key={`${result.type}-${result.id}`} href={result.url}>
                    <div className="p-[12px] sm:p-[14px] md:p-[16px] hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-[10px] sm:gap-[12px]">
                        {result.image_url && (
                          <img
                            src={result.image_url}
                            alt={result.displayTitle}
                            className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] object-cover rounded flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 line-clamp-1 text-[12px] sm:text-[13px] md:text-[14px]">
                            {result.displayTitle}
                          </p>
                          {result.excerpt && (
                            <p className="text-gray-600 text-[11px] sm:text-[12px] line-clamp-1">
                              {result.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="p-[12px] sm:p-[14px] md:p-[16px] text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[#8B0000] text-[12px] sm:text-[13px] md:text-[14px] font-semibold hover:underline"
                  >
                    View all results
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-[16px] sm:p-[18px] md:p-[20px] text-center text-gray-500 text-[13px] sm:text-[14px]">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

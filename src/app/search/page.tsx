"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import { Calendar, FileText, Briefcase, Image as ImageIcon, ArrowRight } from "lucide-react";

interface SearchResult {
  id: string;
  type: "news" | "projects" | "events" | "gallery";
  displayTitle: string;
  excerpt?: string;
  image_url?: string;
  url: string;
  published_date?: string;
  start_date?: string;
  category?: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setLoading(false);
      return;
    }

    setSearched(true);
    setLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case "news":
        return <FileText className="w-5 h-5" />;
      case "projects":
        return <Briefcase className="w-5 h-5" />;
      case "events":
        return <Calendar className="w-5 h-5" />;
      case "gallery":
        return <ImageIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-blue-100 text-blue-700";
      case "projects":
        return "bg-green-100 text-green-700";
      case "events":
        return "bg-purple-100 text-purple-700";
      case "gallery":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Search Results"
        breadcrumbs={[{ label: "Search Results" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <p className="text-gray-600">
              {searched ? (
                <>
                  {results.length > 0
                    ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                    : `No results found for "${query}"`}
                </>
              ) : (
                "Enter a search term to find content"
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin">
                <div className="w-8 h-8 border-4 border-[#8B0000]/20 border-t-[#8B0000] rounded-full"></div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <Link key={`${result.type}-${result.id}`} href={result.url}>
                  <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow hover:border-[#8B0000]/30">
                    <div className="flex items-start gap-4">
                      {result.image_url && (
                        <img
                          src={result.image_url}
                          alt={result.displayTitle}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                              result.type
                            )}`}
                          >
                            {getIcon(result.type)}
                            {result.type.charAt(0).toUpperCase() +
                              result.type.slice(1)}
                          </span>
                          {result.published_date && (
                            <span className="text-xs text-gray-500">
                              {new Date(
                                result.published_date
                              ).toLocaleDateString()}
                            </span>
                          )}
                          {result.start_date && (
                            <span className="text-xs text-gray-500">
                              {new Date(result.start_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {result.displayTitle}
                        </h3>
                        {result.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {result.excerpt}
                          </p>
                        )}
                        <div className="inline-flex items-center gap-2 text-[#8B0000] font-semibold text-sm hover:gap-3 transition-all">
                          View More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : searched ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Try searching for:</p>
              <ul className="text-gray-500 text-sm space-y-1">
                <li>News articles</li>
                <li>Projects</li>
                <li>Events</li>
                <li>Gallery items</li>
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <Navbar />
          <PageHeader
            title="Search"
            breadcrumbs={[{ label: "Search" }]}
          />
          <section className="py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          </section>
          <Footer />
        </main>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

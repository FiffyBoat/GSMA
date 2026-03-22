import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, string | undefined>;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}

export default function PaginationNav({
  basePath,
  currentPage,
  totalPages,
  query = {},
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const buildHref = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    if (page > 1) {
      params.set("page", String(page));
    }

    const search = params.toString();
    return search ? `${basePath}?${search}` : basePath;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href={buildHref(Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            currentPage === 1
              ? "pointer-events-none border-gray-200 text-gray-300"
              : "border-gray-200 text-gray-700 hover:border-[#8B0000]/20 hover:bg-[#fff8f5] hover:text-[#8B0000]"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showGap = previousPage && page - previousPage > 1;

          return (
            <div key={page} className="flex items-center gap-2">
              {showGap ? <span className="px-1 text-gray-400">...</span> : null}
              <Link
                href={buildHref(page)}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-[#8B0000] text-white shadow-sm"
                    : "border border-gray-200 text-gray-700 hover:border-[#8B0000]/20 hover:bg-[#fff8f5] hover:text-[#8B0000]"
                }`}
              >
                {page}
              </Link>
            </div>
          );
        })}

        <Link
          href={buildHref(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            currentPage === totalPages
              ? "pointer-events-none border-gray-200 text-gray-300"
              : "border-gray-200 text-gray-700 hover:border-[#8B0000]/20 hover:bg-[#fff8f5] hover:text-[#8B0000]"
          }`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

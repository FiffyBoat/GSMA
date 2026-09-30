import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import PaginationNav from "@/components/shared/PaginationNav";
import Link from "next/link";
import { FileText, Download, Calendar, BarChart3, FolderOpen } from "lucide-react";
import { formatLooseLabel, normalizeLooseText } from "@/lib/text-match";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export const dynamic = "force-dynamic";

const DOCUMENTS_PER_PAGE = 9;

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  category: string;
  uploaded_date: string;
  file_size: number;
  is_published: boolean;
}

interface DocumentsPageProps {
  searchParams: Promise<{ page?: string; doc?: string }>;
}

export default async function DocumentsPage({
  searchParams,
}: DocumentsPageProps) {
  const { page, doc: highlightedDocId } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const from = (currentPage - 1) * DOCUMENTS_PER_PAGE;
  const to = from + DOCUMENTS_PER_PAGE - 1;
  const supabase = createPublicServerSupabaseClient();

  const [{ count }, { data: documents, error }] = await Promise.all([
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("documents")
      .select("*")
      .eq("is_published", true)
      .order("uploaded_date", { ascending: false })
      .range(from, to),
  ]);

  const docs = documents as Document[] | null;
  const totalPages = Math.max(1, Math.ceil((count || 0) / DOCUMENTS_PER_PAGE));

  const groupedEntries =
    docs?.reduce((accumulator, document) => {
      const normalizedCategory =
        normalizeLooseText(document.category) || "general";

      if (!accumulator[normalizedCategory]) {
        accumulator[normalizedCategory] = {
          label: formatLooseLabel(normalizedCategory),
          documents: [],
        };
      }

      accumulator[normalizedCategory].documents.push(document);
      return accumulator;
    }, {} as Record<string, { label: string; documents: Document[] }>) || {};

  const categories = Object.entries(groupedEntries).sort(([, left], [, right]) =>
    left.label.localeCompare(right.label)
  );
  const totalDocumentsOnPage = docs?.length || 0;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Documents" breadcrumbs={[{ label: "Documents" }]} />

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-7xl px-[15px]">
          <div className="mb-[24px] grid gap-6 rounded-[8px] border border-gray-200 bg-white px-5 py-6 shadow-sm sm:mb-[28px] sm:px-7 md:mb-[32px] md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                Public Records
              </p>
              <h2 className="mb-[8px] text-[26px] font-bold text-gray-950 sm:text-[32px] md:text-[38px]">
                Document Archive
              </h2>
              <p className="text-readable max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
                Browse official Assembly documents page by page so you can reach
                forms, reports, and public files faster.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <div className="rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                <p className="text-[24px] font-bold text-gray-950">{count || 0}</p>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-500">
                  Published Files
                </p>
              </div>
              <div className="rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                <p className="text-[24px] font-bold text-gray-950">{categories.length}</p>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-500">
                  Categories
                </p>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mb-[20px] rounded-lg border border-red-200 bg-red-50 p-[14px] text-[12px] text-red-700 sm:mb-[24px] sm:p-[16px] sm:text-[13px] md:mb-[30px] md:p-[18px] md:text-[14px]">
              Failed to load documents: {error.message}
            </div>
          ) : null}

          {!docs || docs.length === 0 ? (
            <div className="py-[40px] text-center sm:py-[50px] md:py-[60px] lg:py-[80px]">
              <FileText className="mx-auto mb-[20px] h-[56px] w-[56px] text-gray-300 sm:mb-[24px] sm:h-[64px] sm:w-[64px] md:mb-[28px] md:h-[72px] md:w-[72px]" />
              <p className="text-[14px] text-gray-600 sm:text-[15px] md:text-[16px]">
                No documents available at the moment.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[12px] font-bold uppercase tracking-wide text-gray-500">
                    Browse:
                  </span>
                  {categories.map(([categoryKey, category]) => (
                    <Link
                      key={categoryKey}
                      href={`#documents-${categoryKey}`}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] font-semibold text-gray-700 transition hover:border-[#8B0000]/30 hover:text-[#8B0000]"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mb-5 flex items-center justify-between text-[13px] text-gray-600">
                <span>
                  Showing {totalDocumentsOnPage} document{totalDocumentsOnPage === 1 ? "" : "s"} on this page
                </span>
              </div>

              <div className="space-y-[26px] sm:space-y-[32px] md:space-y-[40px]">
                {categories.map(([categoryKey, category]) => (
                  <div
                    key={categoryKey}
                    id={`documents-${categoryKey}`}
                    className="rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:p-6"
                  >
                    <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-gray-200 pb-[14px] sm:mb-[20px] md:mb-[24px]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#8B0000]/10">
                          <FolderOpen className="h-5 w-5 text-[#8B0000]" />
                        </div>
                        <div>
                          <h2 className="text-[20px] font-bold text-gray-950 sm:text-[24px] md:text-[26px]">
                            {category.label}
                          </h2>
                          <p className="text-[12px] font-semibold text-gray-500">
                            {category.documents.length} document{category.documents.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 sm:gap-[18px] md:gap-[20px] lg:grid-cols-3 lg:gap-[24px]">
                      {category.documents.map((doc) => (
                        <div
                          key={doc.id}
                          id={`document-${doc.id}`}
                          className={`flex flex-col rounded-[8px] border border-gray-200 bg-gray-50 p-[16px] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)] sm:p-[18px] md:p-[20px] ${
                            highlightedDocId === doc.id
                              ? "ring-2 ring-[#8B0000] ring-offset-2"
                              : ""
                          }`}
                        >
                          <div className="mb-[14px] flex items-start gap-[12px] sm:mb-[16px] sm:gap-[14px]">
                            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[6px] bg-[#8B0000]/10 sm:h-[48px] sm:w-[48px]">
                              <FileText className="h-[22px] w-[22px] text-[#8B0000] sm:h-[24px] sm:w-[24px] md:h-[26px] md:w-[26px]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="line-clamp-2 text-[14px] font-bold text-gray-900 sm:text-[15px] md:text-[16px]">
                                {doc.title}
                              </h3>
                              <p className="mt-[4px] text-[10px] text-gray-500 sm:mt-[6px] sm:text-[11px] md:text-[12px]">
                                {doc.file_type.toUpperCase()}
                              </p>
                            </div>
                          </div>

                          {doc.description ? (
                            <p className="text-readable mb-[14px] line-clamp-3 text-[12px] text-gray-600 sm:mb-[16px] sm:text-[13px] md:text-[14px]">
                              {doc.description}
                            </p>
                          ) : null}

                          <div className="mb-[14px] space-y-[6px] text-[10px] text-gray-500 sm:mb-[16px] sm:space-y-[8px] sm:text-[11px] md:text-[12px]">
                            <div className="flex items-center gap-[8px] sm:gap-[10px]">
                              <Calendar className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                              Uploaded: {new Date(doc.uploaded_date).toLocaleDateString()}
                            </div>
                            {doc.file_size ? (
                              <div className="flex items-center gap-[8px] sm:gap-[10px]">
                                <BarChart3 className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                                {formatFileSize(doc.file_size)}
                              </div>
                            ) : null}
                          </div>

                          <a
                            href={doc.file_url}
                            download={doc.title}
                            className="mt-auto inline-flex w-full items-center justify-center gap-[8px] rounded-[4px] bg-[#8B0000] px-[14px] py-[10px] text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6B0000] sm:gap-[10px] sm:px-[16px] sm:py-[12px] sm:text-[13px]"
                          >
                            <Download className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <PaginationNav
                basePath="/documents"
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

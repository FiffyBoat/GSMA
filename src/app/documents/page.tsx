import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import PaginationNav from "@/components/shared/PaginationNav";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";
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
  searchParams: Promise<{ page?: string }>;
}

export default async function DocumentsPage({
  searchParams,
}: DocumentsPageProps) {
  const { page } = await searchParams;
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

  const grouped =
    docs?.reduce(
      (accumulator, document) => {
        if (!accumulator[document.category]) {
          accumulator[document.category] = [];
        }
        accumulator[document.category].push(document);
        return accumulator;
      },
      {} as Record<string, Document[]>
    ) || {};

  const categories = Object.keys(grouped).sort();

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

      <section className="py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto px-[15px]">
          <div className="mb-[24px] rounded-[28px] border border-gray-100 bg-[linear-gradient(180deg,#ffffff,#faf7f1)] px-5 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:mb-[28px] sm:px-7 md:mb-[32px]">
            <h2 className="mb-[8px] text-[22px] font-bold text-gray-900 sm:text-[26px] md:text-[28px] lg:text-[32px]">
              Document Archive
            </h2>
            <p className="text-readable max-w-3xl text-[13px] text-gray-600 sm:text-[14px] md:text-[15px]">
              Browse official Assembly documents page by page so you can reach the
              files you need without scrolling through the full archive at once.
            </p>
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
              <div className="space-y-[30px] sm:space-y-[36px] md:space-y-[48px]">
                {categories.map((category) => (
                  <div key={category}>
                    <h2 className="mb-[18px] border-b-2 border-[#8B0000] pb-[12px] text-[22px] font-bold text-gray-900 sm:mb-[20px] sm:pb-[14px] sm:text-[26px] md:mb-[24px] md:pb-[16px] md:text-[28px] lg:text-[32px]">
                      {category}
                    </h2>

                    <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 sm:gap-[18px] md:gap-[20px] lg:grid-cols-3 lg:gap-[24px]">
                      {grouped[category].map((doc) => (
                        <div
                          key={doc.id}
                          className="surface-card flex flex-col rounded-2xl p-[16px] transition-all hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)] sm:p-[18px] md:p-[20px] lg:p-[24px]"
                        >
                          <div className="mb-[14px] flex items-start gap-[12px] sm:mb-[16px] sm:gap-[14px]">
                            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg bg-[#8B0000]/10 sm:h-[48px] sm:w-[48px]">
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
                              {new Date(doc.uploaded_date).toLocaleDateString()}
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
                            className="mt-auto inline-flex w-full items-center justify-center gap-[8px] rounded-lg bg-[#8B0000] px-[14px] py-[10px] text-[12px] font-semibold text-white transition-colors hover:bg-[#6B0000] sm:gap-[10px] sm:px-[16px] sm:py-[12px] sm:text-[13px] md:px-[18px] md:py-[14px] md:text-[14px]"
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

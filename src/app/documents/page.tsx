import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

export default async function DocumentsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("is_published", true)
    .order("uploaded_date", { ascending: false });

  const docs = documents as Document[] | null;

  // Group documents by category
  const grouped = docs?.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = [];
      }
      acc[doc.category].push(doc);
      return acc;
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

  const getFileIcon = (fileType: string) => {
    return <FileText className="w-5 h-5" />;
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Documents"
        breadcrumbs={[{ label: "Documents" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          {error && (
            <div className="mb-[20px] sm:mb-[24px] md:mb-[30px] p-[14px] sm:p-[16px] md:p-[18px] rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12px] sm:text-[13px] md:text-[14px]">
              Failed to load documents: {error.message}
            </div>
          )}

          {!docs || docs.length === 0 ? (
            <div className="text-center py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px]">
              <FileText className="w-[56px] sm:w-[64px] md:w-[72px] h-[56px] sm:h-[64px] md:h-[72px] text-gray-300 mx-auto mb-[20px] sm:mb-[24px] md:mb-[28px]" />
              <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px]">No documents available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-[30px] sm:space-y-[36px] md:space-y-[48px]">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[18px] sm:mb-[20px] md:mb-[24px] pb-[12px] sm:pb-[14px] md:pb-[16px] border-b-2 border-[#8B0000]">
                    {category}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
                    {grouped[category].map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white border border-gray-200 rounded-lg p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] hover:shadow-lg transition-shadow flex flex-col"
                      >
                        <div className="flex items-start gap-[12px] sm:gap-[14px] mb-[14px] sm:mb-[16px]">
                          <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000]/10 rounded-lg flex items-center justify-center shrink-0">
                            <FileText className="w-[22px] sm:w-[24px] md:w-[26px] h-[22px] sm:h-[24px] md:h-[26px] text-[#8B0000]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[14px] sm:text-[15px] md:text-[16px] text-gray-900 line-clamp-2">
                              {doc.title}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] md:text-[12px] text-gray-500 mt-[4px] sm:mt-[6px]">
                              {doc.file_type.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {doc.description && (
                          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[14px] sm:mb-[16px] line-clamp-2">
                            {doc.description}
                          </p>
                        )}

                        <div className="space-y-[6px] sm:space-y-[8px] mb-[14px] sm:mb-[16px] text-[10px] sm:text-[11px] md:text-[12px] text-gray-500">
                          <div className="flex items-center gap-[8px] sm:gap-[10px]">
                            <Calendar className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
                            {new Date(doc.uploaded_date).toLocaleDateString()}
                          </div>
                          {doc.file_size && (
                            <div className="flex items-center gap-[8px] sm:gap-[10px]">
                              <BarChart3 className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
                              {formatFileSize(doc.file_size)}
                            </div>
                          )}
                        </div>

                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center justify-center gap-[8px] sm:gap-[10px] w-full px-[14px] sm:px-[16px] md:px-[18px] py-[10px] sm:py-[12px] md:py-[14px] bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#6B0000] transition-colors text-[12px] sm:text-[13px] md:text-[14px]"
                        >
                          <Download className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

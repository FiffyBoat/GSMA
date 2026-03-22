import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import PaginationNav from "@/components/shared/PaginationNav";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import { getSlug } from "@/lib/content-utils";
import { formatLooseLabel } from "@/lib/text-match";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

export const dynamic = "force-dynamic";

const PROJECTS_PER_PAGE = 9;

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  status: string;
  start_date: string;
  budget: number;
  location: string;
  progress_percentage: number;
}

interface ProjectsPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

const categories = [
  { id: "all", label: "All Projects" },
  { id: "Educational Projects", label: "Educational Projects" },
  { id: "Health Projects", label: "Health Projects" },
  { id: "Roads and Drains", label: "Roads and Drains" },
  { id: "Industrial Projects", label: "Industrial Projects" },
];

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "ongoing":
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "proposed":
    case "planning":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatCurrency(amount: number) {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const { page, category } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const activeCategory = category || "all";
  const from = (currentPage - 1) * PROJECTS_PER_PAGE;
  const to = from + PROJECTS_PER_PAGE - 1;
  const supabase = createPublicServerSupabaseClient();

  let countQuery = supabase
    .from("projects")
    .select("id", { count: "exact", head: true });
  let dataQuery = supabase
    .from("projects")
    .select("*")
    .order("start_date", { ascending: false });

  if (activeCategory !== "all") {
    countQuery = countQuery.eq("category", activeCategory);
    dataQuery = dataQuery.eq("category", activeCategory);
  }

  const [{ count }, { data, error }] = await Promise.all([
    countQuery,
    dataQuery.range(from, to),
  ]);

  const projects = (data as Project[] | null) || [];
  const totalPages = Math.max(1, Math.ceil((count || 0) / PROJECTS_PER_PAGE));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Projects" breadcrumbs={[{ label: "Projects" }]} />

      <section className="py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-7xl px-[15px]">
          <div className="mb-[24px] rounded-[28px] border border-gray-100 bg-[linear-gradient(180deg,#ffffff,#faf7f1)] px-5 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:mb-[28px] sm:px-7 md:mb-[32px]">
            <h2 className="mb-[8px] text-[22px] font-bold text-gray-900 sm:text-[26px] md:text-[28px] lg:text-[32px]">
              Projects Archive
            </h2>
            <p className="text-readable max-w-3xl text-[13px] text-gray-600 sm:text-[14px] md:text-[15px]">
              Browse completed, ongoing, and planned Assembly projects one page at
              a time so you can reach the project information you need faster.
            </p>
          </div>

          <div className="mb-[24px] flex flex-wrap justify-center gap-[12px] sm:mb-[28px] sm:gap-[14px] md:mb-[32px] md:gap-[16px]">
            {categories.map((item) => {
              const isActive = activeCategory === item.id;
              const query = new URLSearchParams();

              if (item.id !== "all") {
                query.set("category", item.id);
              }

              const href = query.toString() ? `/projects?${query.toString()}` : "/projects";

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`rounded-lg px-[16px] py-[10px] text-[12px] font-semibold transition-colors sm:px-[18px] sm:py-[12px] sm:text-[13px] md:px-[20px] md:py-[14px] md:text-[14px] ${
                    isActive
                      ? "bg-[#8B0000] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {error ? (
            <div className="mb-[20px] rounded-lg border border-red-200 bg-red-50 p-[14px] text-[12px] text-red-700 sm:mb-[24px] sm:p-[16px] sm:text-[13px] md:mb-[30px] md:p-[18px] md:text-[14px]">
              Failed to load projects: {error.message}
            </div>
          ) : null}

          {projects.length === 0 ? (
            <div className="py-[40px] text-center sm:py-[50px] md:py-[60px] lg:py-[80px]">
              <FileText className="mx-auto mb-[20px] h-[48px] w-[48px] text-gray-400 sm:mb-[24px] sm:h-[56px] sm:w-[56px] md:mb-[28px] md:h-[64px] md:w-[64px]" />
              <p className="text-[14px] text-gray-600 sm:text-[15px] md:text-[16px] lg:text-lg">
                No projects found in this section.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:gap-[24px] md:gap-[28px] lg:grid-cols-3 lg:gap-[32px]">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${getSlug(project.title, project.slug) || project.id}`}
                    className="surface-card group overflow-hidden rounded-2xl transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)]"
                  >
                    <div className="relative flex h-[150px] items-center justify-center overflow-hidden bg-gray-100 sm:h-[180px] md:h-[200px] lg:h-[240px]">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B0000] to-[#6B0000]">
                          <FileText className="h-[40px] w-[40px] text-white/50 sm:h-[48px] sm:w-[48px] md:h-[56px] md:w-[56px]" />
                        </div>
                      )}
                      <div className="absolute left-[12px] top-[12px] sm:left-[14px] sm:top-[14px] md:left-[16px] md:top-[16px]">
                        <span className={`rounded-full px-[10px] py-[6px] text-[10px] font-semibold sm:px-[12px] sm:py-[8px] sm:text-[11px] md:px-[14px] md:py-[10px] md:text-[12px] ${getStatusColor(project.status)}`}>
                          {formatLooseLabel(project.status || project.category, "Project")}
                        </span>
                      </div>
                    </div>

                    <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                      <h3 className="mb-[12px] line-clamp-2 text-[16px] font-bold leading-[1.3] text-gray-900 transition-colors group-hover:text-[#8B0000] sm:mb-[14px] sm:text-[17px] sm:leading-[1.4] md:text-[18px] lg:text-[20px]">
                        {project.title}
                      </h3>
                      <p className="text-readable mb-[14px] line-clamp-3 text-[13px] leading-[1.65] text-gray-600 sm:mb-[16px] sm:text-[14px] md:text-[15px]">
                        {project.description}
                      </p>

                      {project.progress_percentage > 0 ? (
                        <div className="mb-[14px] sm:mb-[16px] md:mb-[18px]">
                          <div className="mb-[6px] flex justify-between text-[11px] text-gray-600 sm:mb-[8px] sm:text-[12px] md:text-[13px]">
                            <span>Progress</span>
                            <span>{project.progress_percentage}%</span>
                          </div>
                          <div className="h-[6px] w-full rounded-full bg-gray-200 sm:h-[8px]">
                            <div
                              className="h-[6px] rounded-full bg-[#8B0000] transition-all sm:h-[8px]"
                              style={{ width: `${project.progress_percentage}%` }}
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="space-y-[8px] text-[12px] text-gray-600 sm:space-y-[10px] sm:text-[13px] md:space-y-[12px] md:text-[14px]">
                        {project.location ? (
                          <div className="flex items-center gap-[8px] sm:gap-[10px]">
                            <MapPin className="h-[16px] w-[16px] flex-shrink-0 sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                            <span className="line-clamp-1">{project.location}</span>
                          </div>
                        ) : null}
                        {project.start_date ? (
                          <div className="flex items-center gap-[8px] sm:gap-[10px]">
                            <Calendar className="h-[16px] w-[16px] flex-shrink-0 sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                            <span>{new Date(project.start_date).toLocaleDateString()}</span>
                          </div>
                        ) : null}
                        {project.budget ? (
                          <div className="flex items-center gap-[8px] sm:gap-[10px]">
                            <DollarSign className="h-[16px] w-[16px] flex-shrink-0 sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                            <span>{formatCurrency(project.budget)}</span>
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-[16px] text-sm font-semibold text-[#8B0000] transition-colors group-hover:text-[#6B0000]">
                        View project details
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <PaginationNav
                basePath="/projects"
                currentPage={currentPage}
                totalPages={totalPages}
                query={{ category: activeCategory !== "all" ? activeCategory : undefined }}
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

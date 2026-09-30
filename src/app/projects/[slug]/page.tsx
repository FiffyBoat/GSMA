import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign, Landmark, MapPin, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { getSlug } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createPublicServerSupabaseClient();

  const { data: directMatch, error: directMatchError } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug);

  const project =
    directMatch?.[0] ||
    (await supabase.from("projects").select("*")).data?.find(
      (item) => item.id === slug || getSlug(item.title, item.slug) === slug
    );

  if ((directMatchError && !directMatch) || !project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Projects"
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-6xl px-[15px]">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm">
            {project.image_url && (
              <>
                <div className="relative flex h-[240px] w-full items-center justify-center bg-gray-100 sm:h-[320px] md:h-[430px]">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                </div>
                {project.image_caption ? (
                  <p className="px-6 pt-4 text-center text-sm text-gray-500 italic md:px-8">
                    {project.image_caption}
                  </p>
                ) : null}
              </>
            )}
            <div className="p-5 sm:p-7 md:p-8">
              <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
                <div>
                  {project.category ? (
                    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                      {project.category}
                    </p>
                  ) : null}
                  <h1 className="text-[26px] font-bold leading-tight text-gray-950 sm:text-[34px] md:text-[42px]">
                    {project.title}
                  </h1>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-[6px] border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold uppercase tracking-wide text-gray-700">
                    {project.project_source === "individual" ? (
                      <UserRound className="h-4 w-4 text-[#8B0000]" />
                    ) : (
                      <Landmark className="h-4 w-4 text-[#8B0000]" />
                    )}
                    {project.project_source === "individual"
                      ? "Project by an Individual"
                      : "Project by the Assembly"}
                  </div>
                </div>
                {project.status ? (
                  <span className="w-fit rounded-full bg-[#8B0000]/10 px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-[#8B0000]">
                    {project.status}
                  </span>
                ) : null}
              </div>

              {project.progress_percentage > 0 ? (
                <div className="mb-6 rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex justify-between text-[13px] font-semibold text-gray-700">
                    <span>Project Progress</span>
                    <span>{project.progress_percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-[#8B0000]"
                      style={{ width: `${project.progress_percentage}%` }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="mb-6 grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2">
                {project.location && (
                  <div className="flex items-center gap-3 rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                    <MapPin className="w-4 h-4 text-[#8B0000]" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.start_date && (
                  <div className="flex items-center gap-3 rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                    <Calendar className="w-4 h-4 text-[#8B0000]" />
                    <span>
                      Start:{" "}
                      {new Date(project.start_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.end_date && (
                  <div className="flex items-center gap-3 rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                    <Calendar className="w-4 h-4 text-[#8B0000]" />
                    <span>
                      End: {new Date(project.end_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center gap-3 rounded-[6px] border border-gray-200 bg-gray-50 p-4">
                    <DollarSign className="w-4 h-4 text-[#8B0000]" />
                    <span>
                      {new Intl.NumberFormat("en-GH", {
                        style: "currency",
                        currency: "GHS",
                        minimumFractionDigits: 0,
                      }).format(project.budget)}
                    </span>
                  </div>
                )}
              </div>

              {project.description && (
                <div className="mb-6 rounded-[6px] border-l-4 border-[#8B0000] bg-gray-50 p-5">
                  <p className="text-[15px] font-semibold leading-7 text-gray-800">
                    {project.description}
                  </p>
                </div>
              )}

              {project.content && (
                <div className="prose max-w-none">
                  {project.content
                    .split("\n\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="text-[15px] leading-8 text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}

              {project.credit_note ? (
                <div className="mt-6 px-0 md:px-0">
                  <p className="text-center text-sm text-gray-500 italic">Credit: {project.credit_note}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

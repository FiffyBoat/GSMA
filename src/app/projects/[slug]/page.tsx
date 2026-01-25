import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !project) {
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

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#8B0000] font-medium mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {project.image_url && (
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.start_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Start:{" "}
                      {new Date(project.start_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.end_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      End: {new Date(project.end_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
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
                <p className="text-gray-700 mb-6">{project.description}</p>
              )}

              {project.content && (
                <div className="prose max-w-none">
                  {project.content
                    .split("\n\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
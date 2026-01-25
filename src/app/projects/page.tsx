"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, TrendingUp, CheckCircle, Clock, FileText } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  location: string;
  progress_percentage: number;
  is_featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
    { id: "proposed", label: "Proposed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "planning":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Projects"
        breadcrumbs={[{ label: "Projects" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px] max-w-7xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[24px] sm:mb-[28px] md:mb-[32px] justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-[16px] sm:px-[18px] md:px-[20px] py-[10px] sm:py-[12px] md:py-[14px] rounded-lg font-semibold text-[12px] sm:text-[13px] md:text-[14px] transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#8B0000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px]">
              <div className="inline-block animate-spin rounded-full h-[40px] sm:h-[48px] md:h-[56px] w-[40px] sm:w-[48px] md:w-[56px] border-b-2 border-[#8B0000]"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px]">
              <FileText className="w-[48px] sm:w-[56px] md:w-[64px] h-[48px] sm:h-[56px] md:h-[64px] text-gray-400 mx-auto mb-[20px] sm:mb-[24px] md:mb-[28px]" />
              <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] lg:text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[24px] md:gap-[28px] lg:gap-[32px]">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-[150px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
                        <FileText className="w-[40px] sm:w-[48px] md:w-[56px] h-[40px] sm:h-[48px] md:h-[56px] text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-[12px] sm:top-[14px] md:top-[16px] left-[12px] sm:left-[14px] md:left-[16px]">
                      <span className={`px-[10px] sm:px-[12px] md:px-[14px] py-[6px] sm:py-[8px] md:py-[10px] rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold ${getStatusColor(project.status)}`}>
                        {project.status || project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px]">
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 mb-[12px] sm:mb-[14px] line-clamp-2 group-hover:text-[#8B0000] transition-colors leading-[1.3] sm:leading-[1.4]">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] mb-[14px] sm:mb-[16px] line-clamp-3 leading-[1.5] sm:leading-[1.6]">{project.description}</p>
                    
                    {project.progress_percentage !== undefined && project.progress_percentage > 0 && (
                      <div className="mb-[14px] sm:mb-[16px] md:mb-[18px]">
                        <div className="flex justify-between text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 mb-[6px] sm:mb-[8px]">
                          <span>Progress</span>
                          <span>{project.progress_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-[6px] sm:h-[8px]">
                          <div
                            className="bg-[#8B0000] h-[6px] sm:h-[8px] rounded-full transition-all"
                            style={{ width: `${project.progress_percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-[8px] sm:space-y-[10px] md:space-y-[12px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">
                      {project.location && (
                        <div className="flex items-center gap-[8px] sm:gap-[10px]">
                          <MapPin className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] flex-shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>
                      )}
                      {project.start_date && (
                        <div className="flex items-center gap-[8px] sm:gap-[10px]">
                          <Calendar className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] flex-shrink-0" />
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.budget && (
                        <div className="flex items-center gap-[8px] sm:gap-[10px]">
                          <DollarSign className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] flex-shrink-0" />
                          <span>{formatCurrency(project.budget)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

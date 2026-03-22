import React from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createPublicServerSupabaseClient();

  const { data: department, error } = await supabase
    .from("departments")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !department) {
    notFound();
  }

  // Fetch units for this department
  const { data: units } = await supabase
    .from("department_units")
    .select("*")
    .eq("department_id", department.id)
    .order("order", { ascending: true });

  const departmentWithUnits = { ...department, units: units || [] };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title={department.name}
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          { label: department.name },
        ]}
      />

      <article className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/departments"
              className="inline-flex items-center gap-[8px] text-[#8B0000] font-medium mb-[24px] sm:mb-[28px] md:mb-[32px] hover:underline text-[13px] sm:text-[14px] md:text-[15px]"
            >
              <ArrowLeft className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
              Back to Departments
            </Link>

            {/* Head Information Section */}
            <div className="mb-[30px] sm:mb-[36px] md:mb-[48px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[32px] items-start">
                {/* Head Image */}
                {departmentWithUnits.head_image_url && (
                  <div className="md:col-span-1">
                    <div className="relative h-[250px] sm:h-[300px] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={departmentWithUnits.head_image_url}
                        alt={departmentWithUnits.head_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Head Details */}
                <div className={departmentWithUnits.head_image_url ? "md:col-span-2" : "md:col-span-3"}>
                  <span className="inline-block bg-[#8B0000] text-white text-[11px] sm:text-[12px] md:text-[13px] font-semibold px-[14px] sm:px-[16px] md:px-[18px] py-[8px] sm:py-[10px] md:py-[12px] rounded mb-[14px] sm:mb-[16px] md:mb-[20px]">
                    Department Head
                  </span>
                  <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-[8px] sm:mb-[10px] md:mb-[12px]">
                    {departmentWithUnits.head_name}
                  </h1>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] text-[#8B0000] font-semibold mb-[20px] sm:mb-[24px] md:mb-[28px]">
                    {departmentWithUnits.head_title}
                  </p>
                  <div className="border-l-4 border-[#8B0000] pl-[16px] sm:pl-[18px] md:pl-[20px]">
                    {/* Tagline */}
                    {departmentWithUnits.tagline && (
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#8B0000] font-semibold italic mb-[12px] sm:mb-[14px]">
                        {departmentWithUnits.tagline}
                      </p>
                    )}
                    
                    {/* Overview or Description */}
                    <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] sm:leading-[1.7]">
                      {departmentWithUnits.overview || departmentWithUnits.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Sections */}
            {departmentWithUnits.sections && departmentWithUnits.sections.length > 0 && (
              <div className="mt-[40px] sm:mt-[50px] md:mt-[64px] pt-[30px] sm:pt-[36px] md:pt-[48px] border-t-2 border-gray-200 space-y-[32px] sm:space-y-[40px] md:space-y-[48px]">
                {departmentWithUnits.sections.map((section: { title: string; content: string }, idx: number): React.ReactNode => (
                  <div key={idx}>
                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      {section.title}
                    </h2>
                    <div className="prose prose-sm md:prose-base max-w-none text-[13px] sm:text-[14px] md:text-[15px] text-gray-700 leading-[1.6] sm:leading-[1.7]">
                      {section.content
                        .split("\n")
                        .map((line: string, lineIdx: number): React.ReactNode => {
                          if (line.startsWith("•") || line.startsWith("-")) {
                            return (
                              <p key={lineIdx} className="ml-[20px] mb-[8px]">
                                {line}
                              </p>
                            );
                          }
                          return line.trim() ? <p key={lineIdx}>{line}</p> : null;
                        })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Units/Sections */}
            {departmentWithUnits.units && departmentWithUnits.units.length > 0 && (
              <div className="mt-[40px] sm:mt-[50px] md:mt-[64px] pt-[30px] sm:pt-[36px] md:pt-[48px] border-t-2 border-gray-200">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  Units & Sections
                </h2>

                <div className="space-y-[20px] sm:space-y-[24px] md:space-y-[28px]">
                  {departmentWithUnits.units.map((unit: any): React.ReactNode => (
                    <div
                      key={unit.id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-[20px] sm:p-[24px] md:p-[28px] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-[16px] sm:gap-[18px] md:gap-[20px]">
                        <div className="flex-shrink-0 w-[4px] h-[4px] rounded-full bg-[#8B0000] mt-[6px] sm:mt-[7px] md:mt-[8px]"></div>
                        <div className="flex-1">
                          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-bold text-gray-900 mb-[4px] sm:mb-[6px]">
                            {unit.name}
                          </h3>
                          <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#8B0000] font-semibold mb-[12px] sm:mb-[14px]">
                            {unit.title}
                          </p>
                          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8]">
                            {unit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {departmentWithUnits.contact_info && (
              <div className="mt-[40px] sm:mt-[50px] md:mt-[64px] pt-[30px] sm:pt-[36px] md:pt-[48px] border-t-2 border-gray-200">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  Contact Information
                </h2>
                <div className="bg-[#8B0000] bg-opacity-5 border border-[#8B0000] border-opacity-20 rounded-lg p-[20px] sm:p-[24px] md:p-[28px]">
                  <div className="prose prose-sm max-w-none text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 font-medium leading-[1.6] sm:leading-[1.7] md:leading-[1.8] whitespace-pre-wrap">
                    {departmentWithUnits.contact_info}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

import React from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { getDepartmentUnitHref } from "@/lib/department-unit-links";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

      <article className="bg-[#f7f8fa] py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto max-w-6xl px-[15px]">
          <div>
            <Link
              href="/departments"
              className="inline-flex items-center gap-[8px] text-[#8B0000] font-bold uppercase tracking-wide mb-[24px] sm:mb-[28px] md:mb-[32px] hover:underline text-[13px] sm:text-[14px]"
            >
              <ArrowLeft className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
              Back to Departments
            </Link>

            {/* Head Information Section */}
            <div className="mb-[30px] overflow-hidden rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:mb-[36px] sm:p-7 md:mb-[48px] md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[32px] items-start">
                {/* Head Image */}
                {departmentWithUnits.head_image_url && (
                  <div className="md:col-span-1">
                    <div className="relative h-[250px] sm:h-[300px] rounded-[8px] overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
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
                  <span className="inline-block bg-[#8B0000] text-white text-[11px] sm:text-[12px] md:text-[13px] font-bold px-[14px] sm:px-[16px] md:px-[18px] py-[8px] sm:py-[10px] rounded-[4px] mb-[14px] sm:mb-[16px] md:mb-[20px]">
                    Department Head
                  </span>
                  <h1 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-gray-950 mb-[8px] sm:mb-[10px] md:mb-[12px]">
                    {departmentWithUnits.head_name}
                  </h1>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] text-[#8B0000] font-semibold mb-[20px] sm:mb-[24px] md:mb-[28px]">
                    {departmentWithUnits.head_title}
                  </p>
                  <div className="rounded-[6px] border-l-4 border-[#8B0000] bg-gray-50 p-5">
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
              <div className="mt-[32px] space-y-[20px] sm:mt-[40px] md:mt-[48px]">
                {departmentWithUnits.sections.map((section: { title: string; content: string }, idx: number): React.ReactNode => (
                  <div key={idx} className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:p-7">
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
              <div className="mt-[40px] sm:mt-[50px] md:mt-[64px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  Units & Sections
                </h2>

                <div className="space-y-[20px] sm:space-y-[24px] md:space-y-[28px]">
                  {departmentWithUnits.units.map((unit: any): React.ReactNode => (
                    <Link
                      key={unit.id}
                      href={getDepartmentUnitHref(
                        departmentWithUnits.slug,
                        unit.name,
                        unit.id
                      )}
                      className="block bg-white border border-gray-200 rounded-[8px] p-[20px] sm:p-[24px] md:p-[28px] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)] transition-all"
                    >
                      <div className="flex items-start gap-[16px] sm:gap-[18px] md:gap-[20px]">
                        {unit.head_image_url ? (
                          <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[8px] border border-gray-200 bg-gray-50 p-[6px] sm:h-[104px] sm:w-[104px] md:h-[112px] md:w-[112px]">
                            <Image
                              src={unit.head_image_url}
                              alt={`${unit.name} head`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-[4px] h-[4px] rounded-full bg-[#8B0000] mt-[6px] sm:mt-[7px] md:mt-[8px]"></div>
                        )}
                        <div className="flex flex-1 flex-col">
                          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-bold text-gray-900 mb-[4px] sm:mb-[6px]">
                            {unit.name}
                          </h3>
                          <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#8B0000] font-semibold mb-[12px] sm:mb-[14px]">
                            {unit.title}
                          </p>
                          {unit.head_name ? (
                            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-900 font-semibold mb-[8px] sm:mb-[10px]">
                              Head: {unit.head_name}
                            </p>
                          ) : null}
                          <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8]">
                            {unit.description}
                          </p>
                          <div className="mt-[14px] inline-flex items-center gap-[8px] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8B0000]">
                            View Unit Details
                            <ArrowRight className="h-[14px] w-[14px]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            {departmentWithUnits.contact_info && (
              <div className="mt-[40px] sm:mt-[50px] md:mt-[64px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  Contact Information
                </h2>
                <div className="bg-white border border-gray-200 rounded-[8px] p-[20px] sm:p-[24px] md:p-[28px] shadow-sm">
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

import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { generateSlug } from "@/lib/content-utils";
import {
  extractUnitIdFromSegment,
  getDepartmentUnitHref,
} from "@/lib/department-unit-links";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string; unitSlug: string }>;
}

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview?: string | null;
  contact_info?: string | null;
}

interface DepartmentUnit {
  id: string;
  name: string;
  title: string;
  description: string;
  head_name?: string | null;
  head_image_url?: string | null;
}

export default async function DepartmentUnitPage({ params }: PageProps) {
  const { slug, unitSlug } = await params;
  const supabase = createPublicServerSupabaseClient();

  const { data: department, error: departmentError } = await supabase
    .from("departments")
    .select("id, name, slug, description, overview, contact_info")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (departmentError || !department) {
    notFound();
  }

  const { data: units, error: unitsError } = await supabase
    .from("department_units")
    .select("id, name, title, description, head_name, head_image_url")
    .eq("department_id", department.id)
    .order("order", { ascending: true });

  if (unitsError || !units) {
    notFound();
  }

  const unitId = extractUnitIdFromSegment(unitSlug);
  const unit = units.find((candidate) =>
    unitId
      ? candidate.id === unitId
      : generateSlug(candidate.name) === unitSlug
  );

  if (!unit) {
    notFound();
  }

  const relatedUnits = units
    .filter((candidate) => candidate.id !== unit.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title={unit.name}
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          { label: department.name, href: `/departments/${department.slug}` },
          { label: unit.name },
        ]}
      />

      <article className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-[24px] flex flex-wrap items-center gap-[12px] sm:mb-[28px] md:mb-[32px]">
              <Link
                href={`/departments/${department.slug}`}
                className="inline-flex items-center gap-[8px] text-[#8B0000] font-medium hover:underline text-[13px] sm:text-[14px] md:text-[15px]"
              >
                <ArrowLeft className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
                Back to {department.name}
              </Link>
              <Link
                href="/units-committees"
                className="inline-flex items-center gap-[8px] text-gray-600 font-medium hover:text-[#8B0000] text-[13px] sm:text-[14px] md:text-[15px]"
              >
                View All Units
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3 md:gap-[32px]">
              {unit.head_image_url ? (
                <div className="md:col-span-1">
                  <div className="relative flex h-[260px] sm:h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-[#faf7f2] p-[18px]">
                    <Image
                      src={unit.head_image_url}
                      alt={unit.head_name || unit.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : null}

              <div
                className={
                  unit.head_image_url ? "md:col-span-2" : "md:col-span-3"
                }
              >
                <span className="mb-[16px] inline-block rounded-full bg-[#8B0000] px-[16px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[12px]">
                  Unit / Section
                </span>
                <h1 className="mb-[10px] text-[28px] font-bold text-gray-900 sm:text-[32px] md:text-[36px]">
                  {unit.name}
                </h1>
                <p className="mb-[14px] text-[15px] font-semibold uppercase tracking-[0.16em] text-[#8B0000] sm:text-[16px]">
                  {unit.title}
                </p>
                {unit.head_name ? (
                  <p className="mb-[22px] text-[15px] font-semibold text-gray-900 sm:text-[16px]">
                    Unit Head: {unit.head_name}
                  </p>
                ) : null}
                <div className="border-l-4 border-[#8B0000] pl-[16px] sm:pl-[18px] md:pl-[20px]">
                  <p className="text-[14px] leading-[1.75] text-gray-700 sm:text-[15px] md:text-[16px]">
                    {unit.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-[40px] grid grid-cols-1 gap-[20px] border-t-2 border-gray-200 pt-[30px] sm:mt-[50px] sm:gap-[24px] sm:pt-[36px] md:mt-[64px] md:grid-cols-2 md:pt-[48px]">
              <div className="rounded-[24px] border border-[#eadfce] bg-[linear-gradient(135deg,#fffaf4,#f5efe5)] p-[22px] shadow-[0_18px_40px_rgba(16,24,40,0.08)] sm:p-[26px]">
                <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B0000]">
                  Parent Department
                </p>
                <h2 className="mb-[10px] text-[22px] font-bold text-[#1f2937] sm:text-[24px]">
                  {department.name}
                </h2>
                <p className="mb-[18px] text-[14px] leading-[1.75] text-[#5f6368] sm:text-[15px]">
                  {department.overview || department.description}
                </p>
                <Link
                  href={`/departments/${department.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#8B0000]"
                >
                  Visit Department
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {department.contact_info ? (
                <div className="rounded-[24px] border border-gray-200 bg-white p-[22px] shadow-[0_18px_40px_rgba(16,24,40,0.06)] sm:p-[26px]">
                  <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B0000]">
                    Contact Information
                  </p>
                  <div className="whitespace-pre-wrap text-[14px] leading-[1.75] text-gray-700 sm:text-[15px]">
                    {department.contact_info}
                  </div>
                </div>
              ) : null}
            </div>

            {relatedUnits.length > 0 ? (
              <div className="mt-[40px] border-t-2 border-gray-200 pt-[30px] sm:mt-[50px] sm:pt-[36px] md:mt-[64px] md:pt-[48px]">
                <h2 className="mb-[24px] text-[22px] font-bold text-gray-900 sm:text-[26px] md:text-[30px]">
                  More Units in {department.name}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedUnits.map((relatedUnit) => (
                    <Link
                      key={relatedUnit.id}
                      href={getDepartmentUnitHref(
                        department.slug,
                        relatedUnit.name,
                        relatedUnit.id
                      )}
                      className="group rounded-[22px] border border-gray-200 bg-white p-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(16,24,40,0.08)]"
                    >
                      <p className="mb-[6px] text-[16px] font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#8B0000]">
                        {relatedUnit.name}
                      </p>
                      <p className="mb-[10px] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8B0000]/80">
                        {relatedUnit.title}
                      </p>
                      <p className="text-[13px] leading-[1.7] text-gray-600">
                        {relatedUnit.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

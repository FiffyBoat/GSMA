import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { getDepartmentUnitHref } from "@/lib/department-unit-links";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  FileCheck,
  Gavel,
  Landmark,
  Scale,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

// const committeeIcons = [Briefcase, Building2, Users, Scale, FileCheck, Gavel];

const unitIcons = [Building2, Briefcase, Users, FileCheck, Scale, Landmark, Gavel];

interface Department {
  id: string;
  name: string;
  slug: string;
  order: number;
}

interface DepartmentUnit {
  id: string;
  department_id: string;
  name: string;
  title: string;
  description: string;
  head_name?: string | null;
  head_image_url?: string | null;
  order: number;
}

interface PublicUnit extends DepartmentUnit {
  departmentName: string;
  departmentSlug: string;
}

const getUnitIcon = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("business") || lowerName.includes("trade")) {
    return Briefcase;
  }
  if (lowerName.includes("works") || lowerName.includes("building")) {
    return Building2;
  }
  if (lowerName.includes("social") || lowerName.includes("community")) {
    return Users;
  }
  if (lowerName.includes("audit") || lowerName.includes("procurement")) {
    return FileCheck;
  }
  if (lowerName.includes("legal") || lowerName.includes("justice")) {
    return Scale;
  }

  return null;
};

export default async function UnitsCommitteesPage() {
  const settings = await loadPublicSiteSettings();
  const supabase = createPublicServerSupabaseClient();

  /*
  const committees = splitSettingRows(settings.units_committee_items).map(
    ([name, description, members, responsibilities]) => ({
      name,
      description,
      members,
      responsibilities: splitSemicolonValues(responsibilities),
    })
  );
  */
  const { data: departments } = await supabase
    .from("departments")
    .select("id, name, slug, order")
    .eq("is_published", true)
    .order("order", { ascending: true });

  const departmentList = (departments || []) as Department[];
  const departmentIds = departmentList.map((department) => department.id);
  const { data: departmentUnits } = departmentIds.length
    ? await supabase
        .from("department_units")
        .select("*")
        .in("department_id", departmentIds)
        .order("order", { ascending: true })
    : { data: [] };

  const departmentMap = new Map(
    departmentList.map((department) => [department.id, department])
  );
  const units = ((departmentUnits || []) as DepartmentUnit[])
    .map((unit) => {
      const department = departmentMap.get(unit.department_id);

      if (!department) {
        return null;
      }

      return {
        ...unit,
        departmentName: department.name,
        departmentSlug: department.slug,
      };
    })
    .filter((unit): unit is PublicUnit => Boolean(unit));

  const defaultUnitsIntro =
    "Browse the Assembly's operational units and offices, each supporting the delivery of essential municipal services.";
  const legacyUnitsIntro =
    "The Ga South Municipal Assembly operates through various sub-committees that are responsible for specific areas of governance and development. These committees ensure effective deliberation and implementation of programmes across all sectors.";
  const unitsIntro =
    settings.units_intro && settings.units_intro !== legacyUnitsIntro
      ? settings.units_intro
      : defaultUnitsIntro;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="All Units"
        breadcrumbs={[{ label: "All Units" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          {/*
          <div className="max-w-3xl mb-[36px] sm:mb-[44px] md:mb-[52px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
              Sub-Committees of the Assembly
            </h2>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
              {settings.units_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
            {committees.map((committee, index) => {
              const Icon = committeeIcons[index] ?? Users;
              return (
                <div
                  key={committee.name}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#8B0000] px-[16px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px] lg:py-[18px] flex items-center gap-[12px] sm:gap-[14px]">
                    <Icon className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-white shrink-0" />
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white">
                      {committee.name}
                    </h3>
                  </div>
                  <div className="p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px]">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] md:mb-[16px]">
                      {committee.description}
                    </p>
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] mb-[12px] sm:mb-[14px] md:mb-[16px]">
                      <span className="font-semibold text-gray-900">
                        Composition:{" "}
                      </span>
                      <span className="text-gray-600">{committee.members}</span>
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 text-[12px] sm:text-[13px] md:text-[14px] mb-[8px] sm:mb-[10px]">
                        Key Responsibilities:
                      </p>
                      <ul className="space-y-[6px] sm:space-y-[8px]">
                        {committee.responsibilities.map((responsibility) => (
                          <li
                            key={responsibility}
                            className="flex items-start gap-[8px] sm:gap-[10px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-600"
                          >
                            <span className="w-[5px] h-[5px] bg-[#8B0000] rounded-full mt-[4px] sm:mt-[5px] shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          */}

          <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#eadfce] bg-[linear-gradient(135deg,#fffaf4,#f5efe5)] px-6 py-6 shadow-[0_18px_40px_rgba(16,24,40,0.08)] sm:mb-10 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[720px]">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B0000] sm:text-[12px]">
                Assembly Structure
              </p>
              <h2 className="mb-3 border-none pb-0 text-[24px] font-bold text-[#1f2937] after:hidden sm:text-[30px] md:text-[34px]">
                All Units
              </h2>
              <p className="text-readable mb-0 text-[14px] leading-[1.75] text-[#5f6368] sm:text-[15px] md:text-[16px]">
                {unitsIntro}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#8B0000] px-5 py-3 text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#6f0000] sm:px-6"
            >
              Need Help?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {units.length === 0 ? (
            <div className="py-[40px] text-center">
              <p className="text-gray-600">No units available.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit, index) => {
                const Icon = getUnitIcon(unit.name) ?? unitIcons[index] ?? Landmark;

                return (
                  <li key={unit.id}>
                    <Link
                      href={getDepartmentUnitHref(
                        unit.departmentSlug,
                        unit.name,
                        unit.id
                      )}
                      className="group surface-card flex h-full flex-col rounded-[26px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)] focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 sm:p-7"
                    >
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-2xl bg-white p-[6px] text-white transition-transform duration-300 group-hover:scale-105 sm:h-[96px] sm:w-[96px]">
                          {unit.head_image_url ? (
                            <Image
                              src={unit.head_image_url}
                              alt={`${unit.name} head`}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-[#8B0000] transition-colors duration-300 group-hover:bg-[#6f0000]">
                              <Icon className="h-9 w-9" />
                            </div>
                          )}
                        </div>
                        <span className="rounded-full bg-[#fff3e6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B0000]">
                          Unit
                        </span>
                      </div>
                      <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#1f2937] transition-colors duration-200 group-hover:text-[#8B0000] sm:text-[20px]">
                        {unit.name}
                      </h3>
                      {unit.title ? (
                        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8B0000]/80">
                          {unit.title}
                        </p>
                      ) : null}
                      {unit.head_name ? (
                        <p className="mb-3 text-[13px] font-semibold text-[#1f2937]">
                          Head: {unit.head_name}
                        </p>
                      ) : null}
                      <p className="text-readable mb-5 line-clamp-4 text-[14px] leading-[1.75] text-[#5f6368]">
                        {unit.description}
                      </p>
                      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7b6254]">
                        Under {unit.departmentName}
                      </p>
                      <div className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#8B0000]">
                        Explore Unit
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

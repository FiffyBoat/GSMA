import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Heart,
  Home,
  Landmark,
  Shield,
  Truck,
  Users,
  Wallet,
  Wheat,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface DepartmentUnit {
  id: string;
  department_id: string;
  name: string;
  title: string;
  description: string;
  order: number;
}

interface DepartmentSection {
  title: string;
  content: string;
}

interface Department {
  id: string;
  name: string;
  slug: string;
  head_name: string;
  head_title: string;
  head_image_url: string;
  description: string;
  tagline?: string;
  overview?: string;
  sections?: DepartmentSection[];
  contact_info?: string;
  order: number;
  is_published: boolean;
  units?: DepartmentUnit[];
  created_at: string;
  updated_at: string;
}

const getDepartmentIcon = (name: string) => {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("central") ||
    lowerName.includes("administration") ||
    lowerName.includes("executive")
  ) {
    return Building2;
  }
  if (
    lowerName.includes("finance") ||
    lowerName.includes("budget") ||
    lowerName.includes("treasury") ||
    lowerName.includes("revenue")
  ) {
    return Wallet;
  }
  if (
    lowerName.includes("education") ||
    lowerName.includes("youth") ||
    lowerName.includes("sports") ||
    lowerName.includes("training")
  ) {
    return GraduationCap;
  }
  if (
    lowerName.includes("health") ||
    lowerName.includes("medical") ||
    lowerName.includes("sanitation") ||
    lowerName.includes("hygiene")
  ) {
    return Heart;
  }
  if (
    lowerName.includes("agriculture") ||
    lowerName.includes("farming") ||
    lowerName.includes("works") ||
    lowerName.includes("infrastructure")
  ) {
    return Wheat;
  }
  if (
    lowerName.includes("social") ||
    lowerName.includes("welfare") ||
    lowerName.includes("community") ||
    lowerName.includes("gender")
  ) {
    return Users;
  }
  if (
    lowerName.includes("security") ||
    lowerName.includes("safety") ||
    lowerName.includes("police") ||
    lowerName.includes("defense")
  ) {
    return Shield;
  }
  if (
    lowerName.includes("transport") ||
    lowerName.includes("roads") ||
    lowerName.includes("mobility")
  ) {
    return Truck;
  }
  if (
    lowerName.includes("housing") ||
    lowerName.includes("development") ||
    lowerName.includes("urban") ||
    lowerName.includes("planning")
  ) {
    return Home;
  }
  if (
    lowerName.includes("business") ||
    lowerName.includes("trade") ||
    lowerName.includes("commerce") ||
    lowerName.includes("industry")
  ) {
    return Briefcase;
  }

  return Landmark;
};

export default async function DepartmentsPage() {
  const supabase = createPublicServerSupabaseClient();

  const { data: departments } = await supabase
    .from("departments")
    .select("*")
    .eq("is_published", true)
    .order("order", { ascending: true });

  // Fetch units for each department
  const departmentsWithUnits = await Promise.all(
    (departments || []).map(async (dept) => {
      const { data: units } = await supabase
        .from("department_units")
        .select("*")
        .eq("department_id", dept.id)
        .order("order", { ascending: true });

      return { ...dept, units: units || [] };
    })
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Departments"
        breadcrumbs={[{ label: "Departments" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="container mx-auto px-[15px]">
          <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#eadfce] bg-[linear-gradient(135deg,#fffaf4,#f5efe5)] px-6 py-6 shadow-[0_18px_40px_rgba(16,24,40,0.08)] sm:mb-10 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[720px]">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B0000] sm:text-[12px]">
                Departments & Offices
              </p>
              <h2 className="mb-3 border-none pb-0 text-[24px] font-bold text-[#1f2937] after:hidden sm:text-[30px] md:text-[34px]">
                Find the Right Office Faster
              </h2>
              <p className="text-readable mb-0 text-[14px] leading-[1.75] text-[#5f6368] sm:text-[15px] md:text-[16px]">
                Explore the departments that drive service delivery across the
                Assembly, and go straight to the office responsible for the
                information or support you need.
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

          {departmentsWithUnits.length === 0 ? (
            <div className="text-center py-[40px]">
              <p className="text-gray-600">No departments available.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departmentsWithUnits.map((dept) => (
                <li key={dept.id}>
                  {(() => {
                    const Icon = getDepartmentIcon(dept.name);

                    return (
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="group surface-card flex h-full flex-col rounded-[26px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)] focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 sm:p-7"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B0000] text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#6f0000]">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-[#fff3e6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B0000]">
                        Department
                      </span>
                    </div>
                    <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#1f2937] transition-colors duration-200 group-hover:text-[#8B0000] sm:text-[20px]">
                      {dept.name}
                    </h3>
                    {dept.tagline ? (
                      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8B0000]/80">
                        {dept.tagline}
                      </p>
                    ) : null}
                    <p className="text-readable mb-5 line-clamp-3 text-[14px] leading-[1.75] text-[#5f6368]">
                      {dept.overview || dept.description}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#8B0000]">
                      Explore Department
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                    );
                  })()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

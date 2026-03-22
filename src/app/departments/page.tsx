import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";

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
          {departmentsWithUnits.length === 0 ? (
            <div className="text-center py-[40px]">
              <p className="text-gray-600">No departments available.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {departmentsWithUnits.map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="group block p-4 bg-white rounded-lg border transform transition-shadow transition-transform duration-200 ease-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-white">
                      {dept.name}
                    </h3>
                  </Link>
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

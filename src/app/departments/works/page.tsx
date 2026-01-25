import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Hammer, HardHat, Ruler, Target } from "lucide-react";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const deptLinks = [
  { label: "Central Administration", href: "/departments/central-administration" },
  { label: "Finance", href: "/departments/finance" },
  { label: "Education, Youth & Sports", href: "/departments/education" },
  { label: "Health", href: "/departments/health" },
  { label: "Agriculture", href: "/departments/agriculture" },
  { label: "Social Welfare", href: "/departments/social-welfare" },
  { label: "Works", href: "/departments/works" },
];

export default async function WorksPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "works")
    .eq("is_active", true)
    .single();
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Works Department"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Works" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Sidebar title="Departments" links={deptLinks} />
            </div>

            <div className="lg:col-span-3">              {hod && (
                <div className="mb-8 p-6 bg-gradient-to-r from-[#8B0000]/5 to-transparent rounded-lg border border-[#8B0000]/20">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Department Head</h3>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {hod.image_url && (
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-[#8B0000]">
                          <Image
                            src={hod.image_url}
                            alt={hod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">
                        {hod.title && <span>{hod.title} </span>}
                        {hod.name}
                      </h4>
                      <p className="text-[#8B0000] font-semibold mb-2">{hod.position}</p>
                      {hod.bio && <p className="text-gray-700 leading-relaxed">{hod.bio}</p>}
                    </div>
                  </div>
                </div>
              )}              <div className="prose max-w-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center">
                    <Hammer className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Works Department</h2>
                    <p className="text-[#8B0000] font-medium">Building Infrastructure for Development</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Works Department is responsible for the planning, construction, and maintenance of physical infrastructure within the Ga South Municipality. This includes roads, drains, public buildings, and other civil works.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Core Functions</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Road construction and maintenance</li>
                      <li>• Drainage system development</li>
                      <li>• Public building construction</li>
                      <li>• Project supervision</li>
                      <li>• Equipment maintenance</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <HardHat className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Project Types</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Feeder roads construction</li>
                      <li>• Storm drains and culverts</li>
                      <li>• School buildings</li>
                      <li>• Health facilities</li>
                      <li>• Market structures</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8B0000]/5 p-6 rounded-lg border-l-4 border-[#8B0000] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Ruler className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Ongoing Projects</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900">Road Rehabilitation Programme</h4>
                      <p className="text-gray-600 text-sm mt-1">Rehabilitation of major roads within the municipality including surfacing and drainage works.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#8B0000] h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm text-[#8B0000] font-medium">65%</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900">Drainage Improvement Project</h4>
                      <p className="text-gray-600 text-sm mt-1">Construction of primary and secondary drains to address flooding in key areas.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#8B0000] h-2 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <span className="text-sm text-[#8B0000] font-medium">40%</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900">School Infrastructure Development</h4>
                      <p className="text-gray-600 text-sm mt-1">Construction and renovation of school buildings across the municipality.</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#8B0000] h-2 rounded-full" style={{width: '80%'}}></div>
                        </div>
                        <span className="text-sm text-[#8B0000] font-medium">80%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> Works Department, GSMA Head Office</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 147</p>
                  <p className="text-gray-600"><strong>Email:</strong> works@gsma.gov.gh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

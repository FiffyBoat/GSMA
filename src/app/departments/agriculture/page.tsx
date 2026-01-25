import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Wheat, Tractor, Leaf, Target } from "lucide-react";
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

export default async function AgriculturePage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "agriculture")
    .eq("is_active", true)
    .single();

  const { data: departmentStaff } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "agriculture")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Agriculture Department"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Agriculture" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Sidebar title="Departments" links={deptLinks} />
            </div>

            <div className="lg:col-span-3">
              {hod && (
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
              )}
              <div className="prose max-w-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center">
                    <Wheat className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Agriculture Department</h2>
                    <p className="text-[#8B0000] font-medium">Supporting Agricultural Development</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Department of Agriculture provides extension services, technical advice, and support to farmers and agribusinesses in the Ga South Municipality. We promote sustainable agricultural practices and food security initiatives.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Core Functions</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Agricultural extension services</li>
                      <li>• Farmer training and education</li>
                      <li>• Input supply coordination</li>
                      <li>• Livestock development</li>
                      <li>• Fisheries management</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Tractor className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Support Services</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Subsidized fertilizer distribution</li>
                      <li>• Improved seed supply</li>
                      <li>• Mechanization services</li>
                      <li>• Marketing support</li>
                      <li>• Irrigation development</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8B0000]/5 p-6 rounded-lg border-l-4 border-[#8B0000] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Leaf className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Agricultural Programmes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Planting for Food and Jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Rearing for Food and Jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>One Village One Dam</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Youth in Agriculture Programme</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Main Agricultural Activities</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The municipality's agricultural sector includes crop farming (vegetables, cassava, maize), livestock rearing (poultry, piggery, small ruminants), and fishing activities along the coastal areas. Urban and peri-urban agriculture is also significant due to the municipality's proximity to Accra.
                </p>

                {departmentStaff && departmentStaff.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Department Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {departmentStaff.map((staff) => (
                        <div key={staff.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                          {staff.image_url && (
                            <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                              <Image
                                src={staff.image_url}
                                alt={staff.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {staff.title && <span>{staff.title} </span>}
                            {staff.name}
                          </h4>
                          <p className="text-[#8B0000] text-xs font-semibold">{staff.position}</p>
                          {staff.bio && (
                            <p className="text-gray-600 text-xs mt-2 leading-relaxed">{staff.bio}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> Municipal Agriculture Office, Weija</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 145</p>
                  <p className="text-gray-600"><strong>Email:</strong> agriculture@gsma.gov.gh</p>
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

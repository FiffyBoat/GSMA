import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Heart, Stethoscope, Building2, Target } from "lucide-react";
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

export default async function HealthPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "health")
    .eq("is_active", true)
    .single();
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Health Department"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Health" },
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
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Health Department</h2>
                    <p className="text-[#8B0000] font-medium">Promoting Health and Well-being</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Municipal Health Directorate is responsible for the planning, implementation, and monitoring of health services in the Ga South Municipality. Our goal is to ensure access to quality healthcare for all residents.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#8B0000] p-5 rounded-lg text-center text-white">
                    <p className="text-2xl font-bold mb-1">2</p>
                    <p className="text-xs opacity-90">Municipal Hospitals</p>
                  </div>
                  <div className="bg-[#8B0000] p-5 rounded-lg text-center text-white">
                    <p className="text-2xl font-bold mb-1">8</p>
                    <p className="text-xs opacity-90">Health Centers</p>
                  </div>
                  <div className="bg-[#8B0000] p-5 rounded-lg text-center text-white">
                    <p className="text-2xl font-bold mb-1">23</p>
                    <p className="text-xs opacity-90">CHPS Compounds</p>
                  </div>
                  <div className="bg-[#8B0000] p-5 rounded-lg text-center text-white">
                    <p className="text-2xl font-bold mb-1">45</p>
                    <p className="text-xs opacity-90">Private Clinics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Key Services</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Maternal and child health</li>
                      <li>• Immunization programmes</li>
                      <li>• Disease prevention and control</li>
                      <li>• Family planning services</li>
                      <li>• Health education and promotion</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Stethoscope className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Programmes</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• National Health Insurance Scheme</li>
                      <li>• Expanded Programme on Immunization</li>
                      <li>• Malaria Control Programme</li>
                      <li>• HIV/AIDS Prevention</li>
                      <li>• TB Control Programme</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#ffcc00]/10 p-6 rounded-lg border-l-4 border-[#ffcc00] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Health Facilities</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Weija-Gbawe Municipal Hospital</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Mallam Health Centre</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Bortianor Health Centre</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Kokrobite Health Centre</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> Municipal Health Directorate, Weija</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 144</p>
                  <p className="text-gray-600"><strong>Email:</strong> health@gsma.gov.gh</p>
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
